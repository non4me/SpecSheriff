import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { changedTags, readCommit } from "./binding.ts";
import { loadConfig, readsAs, type ReviewSettings } from "./config.ts";
import { base, changes, codeChanges, git } from "./diff.ts";
import { messageText } from "./message.ts";
import { loadSpecification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";

export type RunResult = { status: "ok"; out: string } | { status: "missing" | "timeout" | "failed"; detail: string };
export type Runner = (input: string, settings: ReviewSettings) => RunResult;

const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;

export const SYSTEM_PROMPT = `You are the independent reviewer of one commit. You are given the commit's message, the text of the nodes of the specification it names, and its change, and nothing else: judge the code against those nodes, not against what its author may have meant.

Refuse the commit where the code does something no named node states, or leaves out something a named node requires. Pass it otherwise. Judge only what the change adds or changes.

Answer with one JSON object and nothing around it:
{"verdict": "pass" | "refuse", "findings": [{"rule": "<the sid of the node>", "file": "<path>", "line": <line in the new file>, "problem": "<what the code does or leaves out>"}]}
A refusal names at least one finding; a pass names none.`;

/** Whether the commit changes any line of the system's code. */
function changesCode(root: string): boolean {
  const config = loadConfig(root);
  const commit = changes(root).filter((c) => readsAs(config, c.path) === "code");
  return [...codeChanges(commit).values()].some((l) => l.added.size + l.removed.size > 0);
}

/** What the reviewer is given: the commit's message, the text of the nodes its message and tags name, and its change. */
export async function reviewInput(root: string, text: string): Promise<string> {
  const spec = loadSpecification(root);
  const config = loadConfig(root);
  const named = new Set([...(messageText(text).match(SIDS) ?? []), ...changedTags(await readCommit(root, config))]);
  const nodes = [...named].flatMap((sid) => {
    const node = spec.nodes.get(sid)?.node;
    if (!node) return [];
    const parts = [`## ${node.id} ${node.title} (${sid})`, "", node.text];
    if (node.kind === "record") parts.push("", "Fields:", JSON.stringify({ fields: node.fields, unknown: node.unknown }, null, 2));
    return [parts.join("\n")];
  });
  const paths = changes(root).filter((c) => readsAs(config, c.path) !== null).map((c) => c.path);
  const diff = paths.length ? git(root, "diff", base(root), "--no-color", "--no-ext-diff", "--", ...paths).out : "";
  return [`# The commit's message\n\n${messageText(text).trim()}`, `# The nodes it names\n\n${nodes.join("\n\n") || "(none)"}`, `# The change\n\n\`\`\`diff\n${diff}\`\`\``].join("\n\n") + "\n";
}

export function claudeArgs(settings: ReviewSettings, promptFile: string): string[] {
  return [
    "-p",
    "--model", settings.model,
    "--fallback-model", settings.fallbackModel,
    "--tools", "",
    "--setting-sources", "",
    "--strict-mcp-config",
    "--disable-slash-commands",
    "--no-session-persistence",
    "--output-format", "json",
    "--system-prompt-file", promptFile,
  ];
}

/** The Claude Code CLI in print mode, started in an empty directory with no tools, settings, memory or session of its own. */
export const claudeRunner: Runner = (input, settings) => {
  const promptDir = mkdtempSync(join(tmpdir(), "sheriff-prompt-"));
  const workDir = mkdtempSync(join(tmpdir(), "sheriff-review-"));
  try {
    const promptFile = join(promptDir, "reviewer.md");
    writeFileSync(promptFile, SYSTEM_PROMPT);
    const args = claudeArgs(settings, promptFile);
    // On Windows the CLI is a command script, which only a shell starts; its arguments carry no spaces but the empty one.
    const windows = process.platform === "win32";
    const run = windows
      ? spawnSync(["claude", ...args.map((a) => (a === "" ? '""' : a))].join(" "), { shell: true, input, cwd: workDir, encoding: "utf8", timeout: settings.minutes * 60_000, maxBuffer: 1 << 26 })
      : spawnSync("claude", args, { input, cwd: workDir, encoding: "utf8", timeout: settings.minutes * 60_000, maxBuffer: 1 << 26 });
    if ((run.error as NodeJS.ErrnoException | undefined)?.code === "ENOENT" || (windows && run.status !== 0 && /not recognized|not found/i.test(run.stderr))) {
      return { status: "missing", detail: "the Claude Code CLI, claude, is not installed" };
    }
    if ((run.error as NodeJS.ErrnoException | undefined)?.code === "ETIMEDOUT" || run.signal) return { status: "timeout", detail: `${settings.minutes} minutes` };
    if (run.status !== 0) return { status: "failed", detail: (run.stderr || run.stdout).trim().slice(0, 500) };
    return { status: "ok", out: run.stdout };
  } finally {
    rmSync(promptDir, { recursive: true, force: true });
    rmSync(workDir, { recursive: true, force: true });
  }
};

interface Verdict {
  verdict: "pass" | "refuse";
  findings: Array<{ rule: string; file: string; line: number; problem: string }>;
}

/** The verdict in a runner's answer: the object itself, or the text of a CLI's JSON envelope holding it. */
function readVerdict(out: string): Verdict | null {
  const parse = (s: string): unknown => {
    try {
      return JSON.parse(s.trim().replace(/^```(?:json)?\s*|\s*```$/g, ""));
    } catch {
      return null;
    }
  };
  let value = parse(out) as { result?: unknown } | null;
  if (value && typeof value.result === "string") value = parse(value.result) as { result?: unknown } | null;
  const v = value as Verdict | null;
  if (!v || (v.verdict !== "pass" && v.verdict !== "refuse") || !Array.isArray(v.findings)) return null;
  const sound = v.findings.every((f) => typeof f.rule === "string" && typeof f.file === "string" && Number.isInteger(f.line) && typeof f.problem === "string");
  return sound ? v : null;
}

/** The review of the commit being made: none where it changes no code; a refusal where the reviewer refuses or no review can be held. */
export async function review(root: string, text: string, { run = claudeRunner }: { run?: Runner } = {}): Promise<Finding[]> {
  if (!changesCode(root)) return [];
  const where = "the review";
  const result = run(await reviewInput(root, text), loadConfig(root).review);
  if (result.status !== "ok") {
    const why = { missing: "no reviewer to run", timeout: "the review did not end within", failed: "the reviewer failed:" }[result.status];
    return [{ where, message: `${why} ${result.detail}` }];
  }
  const verdict = readVerdict(result.out);
  if (!verdict) return [{ where, message: `the reviewer's answer cannot be read: ${result.out.trim().slice(0, 300)}` }];
  if (verdict.verdict === "pass") return [];
  if (!verdict.findings.length) return [{ where, message: "the reviewer refused the commit and named no finding" }];
  return verdict.findings.map((f) => ({ where: `${f.file}:${f.line}`, message: `${f.rule}: ${f.problem}` }));
}
