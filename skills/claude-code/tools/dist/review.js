import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { changedTags, readCommit } from "./binding.js";
import { loadConfig, readsAs } from "./config.js";
import { base, changes, codeChanges, commitTexts, git } from "./diff.js";
import { messageText } from "./message.js";
import { loadSpecification } from "./spec-files.js";
import { typeFiles } from "./types.js";
const SIDS = /\bs-[2-9a-hjkmnp-z]{15}\b/g;
export const SYSTEM_PROMPT = `You are the independent reviewer of one commit. You are given the commit's message, the text of the nodes of the specification it names, and its change, and nothing else: judge the code against those nodes, not against what its author may have meant.

Refuse the commit where the code does something no named node states, or leaves out something a named node requires. Pass it otherwise. Judge only what the change adds or changes.

The files generated from the specification are left out of the change, and the input names them: they hold the types and runtime checks generated from the data records, which another check compares with what the nodes produce. Count what a data record requires as carried out by the types and runtime checks generated from it, and never refuse a commit because those files are not in the change.

Answer with one JSON object and nothing around it:
{"verdict": "pass" | "refuse", "findings": [{"rule": "<the sid of the node>", "file": "<path>", "line": <line in the new file>, "problem": "<what the code does or leaves out>"}]}
A refusal names at least one finding; a pass names none.`;
/** Whether the commit changes any line of the system's code. */
async function changesCode(root) {
    const config = loadConfig(root);
    const commit = changes(root).filter((c) => readsAs(config, c.path) === "code");
    const lines = await codeChanges(commit, await commitTexts(root, (p) => readsAs(config, p) !== null));
    return [...lines.values()].some((l) => l.added.size + l.removed.size > 0);
}
/** What the reviewer is given: the commit's message, the text of the nodes its message and tags name, and its change. */
export async function reviewInput(root, text) {
    const spec = loadSpecification(root);
    const config = loadConfig(root);
    const named = new Set([...(messageText(text).match(SIDS) ?? []), ...changedTags(await readCommit(root, config))]);
    const nodes = [...named].flatMap((sid) => {
        const node = spec.nodes.get(sid)?.node;
        if (!node)
            return [];
        const parts = [`## ${node.id} ${node.title} (${sid})`, "", node.text];
        if (node.kind === "record")
            parts.push("", "Fields:", JSON.stringify({ fields: node.fields, unknown: node.unknown }, null, 2));
        return [parts.join("\n")];
    });
    // The whole change, less the files generated from the specification: the binding check compares them with what the nodes produce,
    // and each is named to the reviewer as such, so that their absence does not read to it as something the commit leaves out.
    const paths = typeFiles(spec).paths;
    const generated = paths.map((p) => `:(exclude)${p}`);
    const diff = changes(root).length ? git(root, "diff", base(root), "--no-color", "--no-ext-diff", "--", ".", ...generated).out : "";
    const sections = [`# The commit's message\n\n${messageText(text).trim()}`, `# The nodes it names\n\n${nodes.join("\n\n") || "(none)"}`, `# The change\n\n\`\`\`diff\n${diff}\`\`\``];
    if (paths.length) {
        const named = paths.map((p) => `- ${p}`).join("\n");
        sections.push(`# The files left out of the change\n\nThese files hold the types and runtime checks generated from the data records, and another check compares them with what the nodes produce; they are left out of the change whether the commit changes them or not:\n\n${named}`);
    }
    return sections.join("\n\n") + "\n";
}
export function claudeArgs(settings, promptFile) {
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
export const claudeRunner = (input, settings) => {
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
        if (run.error?.code === "ENOENT" || (windows && run.status !== 0 && /not recognized|not found/i.test(run.stderr))) {
            return { status: "missing", detail: "the Claude Code CLI, claude, is not installed" };
        }
        if (run.error?.code === "ETIMEDOUT" || run.signal)
            return { status: "timeout", detail: `${settings.minutes} minutes` };
        if (run.status !== 0)
            return { status: "failed", detail: (run.stderr || run.stdout).trim().slice(0, 500) };
        return { status: "ok", out: run.stdout };
    }
    finally {
        rmSync(promptDir, { recursive: true, force: true });
        rmSync(workDir, { recursive: true, force: true });
    }
};
/** The verdict in a runner's answer: the object itself, or the text of a CLI's JSON envelope holding it. */
function readVerdict(out) {
    const parse = (s) => {
        try {
            return JSON.parse(s.trim().replace(/^```(?:json)?\s*|\s*```$/g, ""));
        }
        catch {
            return null;
        }
    };
    let value = parse(out);
    if (value && typeof value.result === "string")
        value = parse(value.result);
    const v = value;
    if (!v || (v.verdict !== "pass" && v.verdict !== "refuse") || !Array.isArray(v.findings))
        return null;
    const sound = v.findings.every((f) => typeof f.rule === "string" && typeof f.file === "string" && Number.isInteger(f.line) && typeof f.problem === "string");
    return sound ? v : null;
}
/** The review of the commit being made: none where it changes no code; a refusal where the reviewer refuses or no review can be held. */
export async function review(root, text, { run = claudeRunner } = {}) {
    if (!(await changesCode(root)))
        return [];
    const where = "the review";
    const result = run(await reviewInput(root, text), loadConfig(root).review);
    if (result.status !== "ok") {
        const why = { missing: "no reviewer to run", timeout: "the review did not end within", failed: "the reviewer failed:" }[result.status];
        return [{ where, message: `${why} ${result.detail}` }];
    }
    const verdict = readVerdict(result.out);
    if (!verdict)
        return [{ where, message: `the reviewer's answer cannot be read: ${result.out.trim().slice(0, 300)}` }];
    if (verdict.verdict === "pass")
        return [];
    if (!verdict.findings.length)
        return [{ where, message: "the reviewer refused the commit and named no finding" }];
    return verdict.findings.map((f) => ({ where: `${f.file}:${f.line}`, message: `${f.rule}: ${f.problem}` }));
}
