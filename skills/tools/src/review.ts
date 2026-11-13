import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { changedTags, readCommit } from "./binding.ts";
import { isProjectKind } from "./model.ts";
import { loadConfig, readsAs, type ReviewSettings } from "./config.ts";
import { base, changes, codeChanges, commitTexts, git } from "./diff.ts";
import { messageText } from "./message.ts";
import { loadSpecification } from "./spec-files.ts";
import { typeFiles } from "./types.ts";
import type { Finding } from "./validate.ts";

export type RunResult = { status: "ok"; out: string } | { status: "missing" | "timeout" | "failed"; detail: string };
/** What a runner is run at: the settings of its runner the user's git configuration gives, or their defaults, and the time limit. */
export interface RunSettings {
  minutes: number;
  values: Record<string, string>;
}
export type Runner = (input: string, settings: RunSettings) => RunResult;

/** Each runner's settings in the user's git configuration, under `specsheriff.review`, with the default taken where one is lacking. */
export const RUNNER_DEFAULTS: Record<ReviewSettings["runner"], Record<string, string>> = {
  claude: { claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" },
  codex: { codexModel: "", codexEffort: "high" },
};

/** The settings of a runner as the git configuration of the user who commits holds them, an empty one confirmed, and each it lacks at its default. */
export function runnerSettings(root: string, runner: ReviewSettings["runner"]): { values: Record<string, string>; defaulted: string[] } {
  const values: Record<string, string> = {};
  const defaulted: string[] = [];
  for (const [key, otherwise] of Object.entries(RUNNER_DEFAULTS[runner])) {
    const held = git(root, "config", "--get", `specsheriff.review.${key}`);
    if (held.ok) values[key] = held.out.replace(/\r?\n$/, "");
    else (values[key] = otherwise), defaulted.push(key);
  }
  return { values, defaulted };
}

/** What is said with a review held at a default: each setting taken so, and how the user confirms it. */
function defaultsNotice(runner: ReviewSettings["runner"], defaulted: string[]): string {
  const commands = defaulted.map((key) => {
    const value = RUNNER_DEFAULTS[runner][key]!;
    return `  git config --global specsheriff.review.${key} ${value === "" ? '""' : value}${value === "" ? "   (the model Codex chooses for your account)" : ""}`;
  });
  const where = runner === "claude" ? "as the plugin's options in /config of Claude Code, or " : "";
  return `sheriff review: the reviewer ran, at your cost, at settings you have not confirmed on this machine: ${defaulted.map((k) => `specsheriff.review.${k}`).join(", ")}. Confirm them, or name others, ${where}by:\n${commands.join("\n")}\n`;
}

const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;

export const SYSTEM_PROMPT = `You are the independent reviewer of one commit. You are given the commit's message, the text and the reason of the nodes of the specification it names, each symbol of the code the commit changes, whole, with the SpecTags that bind it, and the commit's change, and nothing else: judge the code against those nodes, not against what its author may have meant.

Refuse the commit where the code does something no named node states in its text, or leaves out something a named node requires. A node's reason says what its rule protects: read a case its text leaves open by it.

Judge each changed symbol whole, not only its changed lines, against the nodes its SpecTags name. Refuse the commit where a changed symbol:
- does something no node its SpecTags name states in its text;
- carries a SpecTag naming a node the symbol does not implement;
- carries the SpecTag that names no node while it implements the system's logic. Such a finding names s-kgbzk2ph9e6jfb4, the rule that every symbol carries a SpecTag, as its node.

The files generated from the specification are left out of the change, and the input names them: they hold the types and runtime checks generated from the RecordTypes, or what a project's generator wrote, which another check compares with what the nodes produce. Count what a RecordType requires as carried out by the types and runtime checks generated from it, and never refuse a commit because those files are not in the change.

Answer with one JSON object and nothing around it:
{"verdict": "pass" | "refuse", "findings": [{"rule": "<the sid of the node>", "file": "<path>", "line": <line in the new file>, "problem": "<what the code does or leaves out>"}]}
A refusal names at least one finding; a pass names none.`;

/** Whether the commit changes any line of the system's code. */
async function changesCode(root: string): Promise<boolean> {
  const config = loadConfig(root);
  const commit = changes(root).filter((c) => readsAs(config, c.path) === "code");
  const lines = await codeChanges(commit, await commitTexts(root, (p) => readsAs(config, p) !== null));
  return [...lines.values()].some((l) => l.added.size + l.removed.size > 0);
}

/** What the reviewer is given: the commit's message, the text of the nodes its message and SpecTags name, and its change. */
export async function reviewInput(root: string, text: string): Promise<string> {
  const spec = loadSpecification(root);
  const config = loadConfig(root);
  const commit = await readCommit(root, config);
  const named = new Set([...(messageText(text).match(SIDS) ?? []), ...changedTags(commit)]);
  // Each symbol of the system's code outside its tests the commit changes, whole as the commit leaves it, with its
  // file, its lines and its SpecTags (s-vp24dqydygztqbt).
  const symbols = [...commit.changedSymbols].filter(([path]) => readsAs(config, path) === "code").flatMap(([path, changed]) => {
    const lines = readFileSync(join(root, path), "utf8").split("\n");
    return [...changed].map((sym) => {
      // A SpecTag naming no node is told from no SpecTag at all, since the reviewer judges the reason the one gives.
      const tags = sym.tags.map((t) => t.sid ?? `none: ${t.none ?? ""}`).join(", ") || "no SpecTag";
      return `## ${path}:${sym.start}-${sym.end} ${sym.name} (SpecTags: ${tags})\n\n\`\`\`\n${lines.slice(sym.start - 1, sym.end).join("\n")}\n\`\`\``;
    });
  });
  const nodes = [...named].flatMap((sid) => {
    const node = spec.nodes.get(sid)?.node;
    if (!node) return [];
    const parts = [`## ${node.location} ${node.title} (${sid})`, "", node.text];
    if (node.reason) parts.push("", `Why: ${node.reason}`);
    if (node.kind === "RecordType") parts.push("", "Fields:", JSON.stringify({ fields: node.fields, unknown: node.unknown }, null, 2));
    else if (isProjectKind(node.kind)) {
      // A node of a project's own kind with the values its kind declares (s-nyh9yk22ba6g77q).
      const { location: _l, sid: _s, kind: _k, title: _t, status: _st, text: _x, reason: _r, refs: _f, meta: _m, children: _c, ...values } = node;
      if (Object.keys(values).length) parts.push("", "Values:", JSON.stringify(values, null, 2));
    }
    return [parts.join("\n")];
  });
  // The whole change, less the files generated from the specification: the binding check compares them with what the nodes produce,
  // and each is named to the reviewer as such, so that their absence does not read to it as something the commit leaves out.
  const paths = typeFiles(spec).paths;
  const generated = paths.map((p) => `:(exclude)${p}`);
  const diff = changes(root).length ? git(root, "diff", base(root), "--no-color", "--no-ext-diff", "--", ".", ...generated).out : "";
  const sections = [
    `# The commit's message\n\n${messageText(text).trim()}`,
    `# The nodes it names\n\n${nodes.join("\n\n") || "(none)"}`,
    `# The symbols the commit changes\n\n${symbols.join("\n\n") || "(none)"}`,
    `# The change\n\n\`\`\`diff\n${diff}\`\`\``,
  ];
  if (paths.length) {
    const named = paths.map((p) => `- ${p}`).join("\n");
    sections.push(`# The files left out of the change\n\nThese files hold the types and runtime checks generated from the RecordTypes, and another check compares them with what the nodes produce; they are left out of the change whether the commit changes them or not:\n\n${named}`);
  }
  return sections.join("\n\n") + "\n";
}

export function claudeArgs(values: Record<string, string>, promptFile: string): string[] {
  return [
    "-p",
    "--model", values.claudeModel!,
    "--fallback-model", values.claudeFallbackModel!,
    "--effort", values.claudeEffort!,
    "--tools", "",
    "--setting-sources", "",
    "--strict-mcp-config",
    "--disable-slash-commands",
    "--no-session-persistence",
    "--output-format", "json",
    "--json-schema", VERDICT_SCHEMA,
    "--system-prompt-file", promptFile,
  ];
}

/** The variables of the environment a runner is handed: the system's paths and folders, the user's name, the locale, a proxy and the certificates to trust, and those by which its CLI finds its sign-in and chooses its provider; none an agent sets for its session, and none of git's. */
const ALLOWED = [
  "PATH", "PATHEXT", "SYSTEMROOT", "SYSTEMDRIVE", "WINDIR", "COMSPEC", "PROGRAMDATA", "PROGRAMFILES", "PROGRAMFILES(X86)", "PROGRAMW6432",
  "HOME", "USERPROFILE", "HOMEDRIVE", "HOMEPATH", "APPDATA", "LOCALAPPDATA", "TMP", "TEMP", "TMPDIR", "USER", "USERNAME", "LOGNAME",
  "LANG", "LC_*", "HTTP_PROXY", "HTTPS_PROXY", "NO_PROXY", "NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "SSL_CERT_DIR",
  "CLAUDE_CONFIG_DIR", "CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_GIT_BASH_PATH",
  "ANTHROPIC_*", "AWS_*", "CLOUD_ML_REGION", "GOOGLE_APPLICATION_CREDENTIALS", "OPENAI_*",
];

/** The variables of an environment a runner is handed, the allowed ones alone. */
export function runnerEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const allowed = (name: string) => ALLOWED.some((a) => (a.endsWith("*") ? name.toUpperCase().startsWith(a.slice(0, -1)) : name.toUpperCase() === a));
  return Object.fromEntries(Object.entries(env).filter(([k]) => allowed(k)));
}

/**
 * The program an npm command script starts and the arguments it gives it: the executable it names, or Node with the
 * script it names. Null where the script names neither.
 */
export function programOfShim(text: string, dir: string): { program: string; args: string[] } | null {
  const target = [...text.matchAll(/"%(?:~dp0|dp0%)([^"]+?\.(exe|js|cjs|mjs))"/gi)].at(-1);
  if (!target) return null;
  const path = `${dir.replace(/[\\/]+$/, "")}\\${target[1]!.replace(/^[\\/]+/, "")}`;
  return target[2]!.toLowerCase() === "exe" ? { program: path, args: [] } : { program: process.execPath, args: [path] };
}

/** Where a command is a program on the search path, or a command script npm installed, the program and the arguments to start it with. */
function resolveProgram(command: string): { program: string; args: string[] } | null {
  for (const dir of (process.env.PATH ?? process.env.Path ?? "").split(delimiter).filter(Boolean)) {
    if (existsSync(join(dir, `${command}.exe`))) return { program: join(dir, `${command}.exe`), args: [] };
    if (existsSync(join(dir, `${command}.cmd`))) return programOfShim(readFileSync(join(dir, `${command}.cmd`), "utf8"), dir);
  }
  return null;
}

/**
 * Runs a CLI in `cwd` with the input on standard input, ended after the settings' minutes. On Windows a CLI
 * installed by npm is a command script, which only a shell starts; the shell is given the empty argument
 * and each holding a space, as a path under a profile named with one does, quoted.
 */
function runCli(command: string, args: string[], name: string, input: string, settings: RunSettings, cwd: string, env: NodeJS.ProcessEnv = {}): RunResult {
  const options = { input, cwd, env: { ...runnerEnv(process.env), ...env }, encoding: "utf8" as const, timeout: settings.minutes * 60_000, maxBuffer: 1 << 26 };
  // Started as a program, never through a shell, so that the time limit ends the CLI itself and no argument is read by a shell.
  const found = process.platform === "win32" ? resolveProgram(command) : { program: command, args: [] };
  if (!found) return { status: "missing", detail: `the ${name}, ${command}, is not installed` };
  const run = spawnSync(found.program, [...found.args, ...args], options);
  if ((run.error as NodeJS.ErrnoException | undefined)?.code === "ENOENT") {
    return { status: "missing", detail: `the ${name}, ${command}, is not installed` };
  }
  if ((run.error as NodeJS.ErrnoException | undefined)?.code === "ETIMEDOUT" || run.signal) return { status: "timeout", detail: `${settings.minutes} minutes` };
  if (run.status !== 0) return { status: "failed", detail: (run.stderr || run.stdout).trim().slice(0, 500) };
  return { status: "ok", out: run.stdout };
}

/** The Claude Code CLI in print mode, started in an empty directory with no tools, settings, memory or session of its own. */
export const claudeRunner: Runner = (input, settings) => {
  const promptDir = mkdtempSync(join(tmpdir(), "sheriff-prompt-"));
  const workDir = mkdtempSync(join(tmpdir(), "sheriff-review-"));
  try {
    const promptFile = join(promptDir, "reviewer.md");
    writeFileSync(promptFile, SYSTEM_PROMPT);
    return runCli("claude", claudeArgs(settings.values, promptFile), "Claude Code CLI", input, settings, workDir);
  } finally {
    rmSync(promptDir, { recursive: true, force: true });
    rmSync(workDir, { recursive: true, force: true });
  }
};

/** The shape the Codex CLI holds its answer to: the verdict and the findings, each naming the rule, the file, the line and the problem. */
export const VERDICT_SCHEMA = JSON.stringify({
  type: "object",
  properties: {
    verdict: { type: "string", enum: ["pass", "refuse"] },
    findings: {
      type: "array",
      items: {
        type: "object",
        properties: { rule: { type: "string" }, file: { type: "string" }, line: { type: "integer" }, problem: { type: "string" } },
        required: ["rule", "file", "line", "problem"],
        additionalProperties: false,
      },
    },
  },
  required: ["verdict", "findings"],
  additionalProperties: false,
});

/** The features of the Codex CLI that give its model a tool, each turned off for the reviewer. */
const CODEX_FEATURES_OFF = [
  "shell_tool", "unified_exec", "unified_exec_tty", "write_stdin_approval", "shell_snapshot", "code_mode_host", "code_mode_interrupt",
  "apps", "browser_use", "browser_use_external", "computer_use", "goals", "hooks", "image_generation", "multi_agent", "plugins",
  "remote_plugin", "skill_search", "sleep_tool", "tool_suggest", "view_image", "skill_mcp_dependency_install", "mentions_v2",
  "in_app_browser", "in_app_local_automation",
];

export function codexArgs(values: Record<string, string>, files: { prompt: string; schema: string; out: string }): string[] {
  return [
    "exec",
    "--ephemeral",
    "--skip-git-repo-check",
    "-s", "read-only",
    "-c", `model_reasoning_effort='${values.codexEffort}'`,
    "-c", `model_instructions_file='${files.prompt}'`,
    "-c", "skills.include_instructions=false",
    "-c", "skills.bundled.enabled=false",
    "-c", "web_search='disabled'",
    ...CODEX_FEATURES_OFF.flatMap((f) => ["--disable", f]),
    ...(values.codexModel ? ["-m", values.codexModel] : []),
    "--output-schema", files.schema,
    "-o", files.out,
    "-",
  ];
}

/**
 * The Codex CLI in `codex exec`, started in an empty directory with a Codex home of its own, made for the
 * run and deleted after it, holding a copy of the user's sign-in and nothing else.
 */
export const codexRunner: Runner = (input, settings) => {
  const runDir = mkdtempSync(join(tmpdir(), "sheriff-codex-run-"));
  try {
    const home = join(runDir, "home");
    const workDir = join(runDir, "work");
    mkdirSync(home);
    mkdirSync(workDir);
    const auth = join(process.env.CODEX_HOME || join(homedir(), ".codex"), "auth.json");
    if (existsSync(auth)) copyFileSync(auth, join(home, "auth.json"));
    const files = { prompt: join(runDir, "reviewer.md"), schema: join(runDir, "verdict.schema.json"), out: join(runDir, "verdict.json") };
    writeFileSync(files.prompt, SYSTEM_PROMPT);
    writeFileSync(files.schema, VERDICT_SCHEMA);
    const run = runCli("codex", codexArgs(settings.values, files), "Codex CLI", input, settings, workDir, { CODEX_HOME: home });
    if (run.status !== "ok") return run;
    if (!existsSync(files.out)) return { status: "failed", detail: `the Codex CLI wrote no answer: ${run.out.trim().slice(0, 300)}` };
    return { status: "ok", out: readFileSync(files.out, "utf8") };
  } finally {
    rmSync(runDir, { recursive: true, force: true });
  }
};

const RUN: Record<ReviewSettings["runner"], Runner> = { claude: claudeRunner, codex: codexRunner };

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
  // A pass naming a finding, or a refusal naming none, contradicts itself, and is read as an answer that cannot be read.
  const consistent = (v.verdict === "pass") === (v.findings.length === 0);
  return sound && consistent ? v : null;
}

/** The review of the commit being made: none where it changes no code; a refusal where the reviewer refuses or no review can be held. */
export async function review(root: string, text: string, { run, notice }: { run?: Runner; notice?: (message: string) => void } = {}): Promise<Finding[]> {
  if (!(await changesCode(root))) return [];
  const where = "the review";
  const { runner, minutes } = loadConfig(root).review;
  const { values, defaulted } = runnerSettings(root, runner);
  const result = (run ?? RUN[runner])(await reviewInput(root, text), { minutes, values });
  if (defaulted.length) notice?.(defaultsNotice(runner, defaulted));
  if (result.status !== "ok") {
    const why = { missing: "no reviewer to run", timeout: "the review did not end within", failed: "the reviewer failed:" }[result.status];
    return [{ where, message: `${why} ${result.detail}` }];
  }
  const verdict = readVerdict(result.out);
  if (!verdict) return [{ where, message: `the reviewer's answer cannot be read: ${result.out.trim().slice(0, 300)}` }];
  if (verdict.verdict === "pass") return [];
  return verdict.findings.map((f) => ({ where: `${f.file}:${f.line}`, message: `${f.rule}: ${f.problem}` }));
}
