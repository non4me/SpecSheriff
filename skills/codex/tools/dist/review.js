import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { changedTags, readCommit } from "./binding.js";
import { loadConfig, readsAs } from "./config.js";
import { base, changes, codeChanges, commitTexts, git } from "./diff.js";
import { messageText } from "./message.js";
import { loadSpecification } from "./spec-files.js";
import { typeFiles } from "./types.js";
/** Each runner's settings in the user's git configuration, under `specsheriff.review`, with the default taken where one is lacking. */
export const RUNNER_DEFAULTS = {
    claude: { claudeModel: "opus", claudeFallbackModel: "sonnet", claudeEffort: "high" },
    codex: { codexModel: "", codexEffort: "high" },
};
/** The settings of a runner as the git configuration of the user who commits holds them, an empty one confirmed, and each it lacks at its default. */
export function runnerSettings(root, runner) {
    const values = {};
    const defaulted = [];
    for (const [key, otherwise] of Object.entries(RUNNER_DEFAULTS[runner])) {
        const held = git(root, "config", "--get", `specsheriff.review.${key}`);
        if (held.ok)
            values[key] = held.out.replace(/\r?\n$/, "");
        else
            (values[key] = otherwise), defaulted.push(key);
    }
    return { values, defaulted };
}
/** What is said with a review held at a default: each setting taken so, and how the user confirms it. */
function defaultsNotice(runner, defaulted) {
    const commands = defaulted.map((key) => {
        const value = RUNNER_DEFAULTS[runner][key];
        return `  git config --global specsheriff.review.${key} ${value === "" ? '""' : value}${value === "" ? "   (the model Codex chooses for your account)" : ""}`;
    });
    const where = runner === "claude" ? "as the plugin's options in /config of Claude Code, or " : "";
    return `sheriff review: the reviewer ran, at your cost, at settings you have not confirmed on this machine: ${defaulted.map((k) => `specsheriff.review.${k}`).join(", ")}. Confirm them, or name others, ${where}by:\n${commands.join("\n")}\n`;
}
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
export function claudeArgs(values, promptFile) {
    return [
        "-p",
        "--model", values.claudeModel,
        "--fallback-model", values.claudeFallbackModel,
        "--effort", values.claudeEffort,
        "--tools", "",
        "--setting-sources", "",
        "--strict-mcp-config",
        "--disable-slash-commands",
        "--no-session-persistence",
        "--output-format", "json",
        "--system-prompt-file", promptFile,
    ];
}
/**
 * Runs a CLI in `cwd` with the input on standard input, ended after the settings' minutes. On Windows a CLI
 * installed by npm is a command script, which only a shell starts; the shell is given the empty argument
 * and each holding a space, as a path under a profile named with one does, quoted.
 */
function runCli(command, args, name, input, settings, cwd, env) {
    const windows = process.platform === "win32";
    const options = { input, cwd, env, encoding: "utf8", timeout: settings.minutes * 60_000, maxBuffer: 1 << 26 };
    const quoted = (a) => (a === "" || /\s/.test(a) ? `"${a}"` : a);
    const run = windows ? spawnSync([command, ...args.map(quoted)].join(" "), { ...options, shell: true }) : spawnSync(command, args, options);
    if (run.error?.code === "ENOENT" || (windows && run.status !== 0 && /not recognized|not found/i.test(run.stderr))) {
        return { status: "missing", detail: `the ${name}, ${command}, is not installed` };
    }
    if (run.error?.code === "ETIMEDOUT" || run.signal)
        return { status: "timeout", detail: `${settings.minutes} minutes` };
    if (run.status !== 0)
        return { status: "failed", detail: (run.stderr || run.stdout).trim().slice(0, 500) };
    return { status: "ok", out: run.stdout };
}
/** The Claude Code CLI in print mode, started in an empty directory with no tools, settings, memory or session of its own. */
export const claudeRunner = (input, settings) => {
    const promptDir = mkdtempSync(join(tmpdir(), "sheriff-prompt-"));
    const workDir = mkdtempSync(join(tmpdir(), "sheriff-review-"));
    try {
        const promptFile = join(promptDir, "reviewer.md");
        writeFileSync(promptFile, SYSTEM_PROMPT);
        return runCli("claude", claudeArgs(settings.values, promptFile), "Claude Code CLI", input, settings, workDir);
    }
    finally {
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
export function codexArgs(values, files) {
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
export const codexRunner = (input, settings) => {
    const runDir = mkdtempSync(join(tmpdir(), "sheriff-codex-run-"));
    try {
        const home = join(runDir, "home");
        const workDir = join(runDir, "work");
        mkdirSync(home);
        mkdirSync(workDir);
        const auth = join(process.env.CODEX_HOME || join(homedir(), ".codex"), "auth.json");
        if (existsSync(auth))
            copyFileSync(auth, join(home, "auth.json"));
        const files = { prompt: join(runDir, "reviewer.md"), schema: join(runDir, "verdict.schema.json"), out: join(runDir, "verdict.json") };
        writeFileSync(files.prompt, SYSTEM_PROMPT);
        writeFileSync(files.schema, VERDICT_SCHEMA);
        const run = runCli("codex", codexArgs(settings.values, files), "Codex CLI", input, settings, workDir, { ...process.env, CODEX_HOME: home });
        if (run.status !== "ok")
            return run;
        if (!existsSync(files.out))
            return { status: "failed", detail: `the Codex CLI wrote no answer: ${run.out.trim().slice(0, 300)}` };
        return { status: "ok", out: readFileSync(files.out, "utf8") };
    }
    finally {
        rmSync(runDir, { recursive: true, force: true });
    }
};
const RUN = { claude: claudeRunner, codex: codexRunner };
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
export async function review(root, text, { run, notice } = {}) {
    if (!(await changesCode(root)))
        return [];
    const where = "the review";
    const { runner, minutes } = loadConfig(root).review;
    const { values, defaulted } = runnerSettings(root, runner);
    const result = (run ?? RUN[runner])(await reviewInput(root, text), { minutes, values });
    if (defaulted.length)
        notice?.(defaultsNotice(runner, defaulted));
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
