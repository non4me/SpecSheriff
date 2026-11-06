import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { APPROVALS } from "./approvals.js";
import { git } from "./diff.js";
import { approvalRuleNode } from "./model.js";
import { newSid } from "./reindex.js";
import { canonical } from "./spec-files.js";
/** The agents a repository is set up for: Claude Code and Codex CLI. */
export const AGENTS = ["claude", "codex"];
const ASSETS = new URL("../assets/", import.meta.url);
const HOOKS = ["pre-commit", "commit-msg", "pre-push"];
/** Every git hook init writes: the lookup of the tools a plugin keeps on the machine and a call to the script for that hook. */
const HOOK = readFileSync(new URL("githook", ASSETS), "utf8");
/** The texts earlier releases of sheriff init wrote of one kind, kept as `earlier/<kind>-<the release that first wrote it>`. */
function earlier(kind) {
    const dir = new URL("earlier/", ASSETS);
    if (!existsSync(dir))
        return [];
    return readdirSync(dir).filter((f) => f.startsWith(`${kind}-`)).map((f) => readFileSync(new URL(f, dir), "utf8"));
}
const lf = (text) => text.replaceAll("\r\n", "\n");
/** Whether a text is one an earlier release wrote, line endings aside. */
const writtenBefore = (kind, text) => earlier(kind).some((e) => lf(e) === lf(text));
/** What a project declares to Claude Code: the marketplace, read from the branch release, and the plugin. */
const DECLARED = {
    extraKnownMarketplaces: {
        "specsheriff-marketplace": { source: { source: "github", repo: "non4me/SpecSheriff", ref: "release" }, autoUpdate: true },
    },
    enabledPlugins: { "specsheriff@specsheriff-marketplace": true },
};
/**
 * The command of each agent's hook for Codex: the lookup of the plugin for Codex CLI in Codex's cache and
 * a call to its script for the hook, nothing where there is no plugin. Codex hands the command to a shell
 * whole, so it is one call of sh, whatever shell Codex runs it with.
 */
const codexCommand = (script) => "sh -c 'h=${CODEX_HOME:-$HOME/.codex}; case $h in *\\\\*) h=$(printf %s \"$h\" | tr \"\\\\\\\\\" /) ;; esac; " +
    "for p in \"$h\"/plugins/cache/specsheriff-marketplace/specsheriff/*/; do :; done; " +
    `if [ -f "\${p}hooks/${script}" ]; then exec sh "\${p}hooks/${script}"; fi'`;
/** The agent's hooks for Codex, by event: the matcher of the tools each is run for, and the script it calls. */
const CODEX_HOOKS = {
    SessionStart: { script: "session-start.sh" },
    PreToolUse: { matcher: "Edit|Write", script: "guard.sh" },
    PostToolUse: { matcher: "Edit|Write|Bash", script: "after-edit.sh" },
};
const codexEntry = (event) => {
    const { matcher, script } = CODEX_HOOKS[event];
    return { ...(matcher ? { matcher } : {}), hooks: [{ type: "command", command: codexCommand(script) }] };
};
/** Whether an entry of `.codex/hooks.json` is one an earlier release of sheriff init wrote for the event. */
const codexEntryBefore = (event, entry) => writtenBefore(`codex-${event}`, JSON.stringify(entry));
/** Whether an entry of `.codex/hooks.json` calls the plugin for Codex CLI, as every entry sheriff init writes does. */
const callsPlugin = (entry) => JSON.stringify(entry).includes("plugins/cache/specsheriff-marketplace/specsheriff/");
/** Reads a JSON file of settings: its object, none where it is missing, or null where it is not JSON, noted. */
function readSettings(root, path, notes, left) {
    const full = join(root, path);
    if (!existsSync(full))
        return {};
    try {
        return JSON.parse(readFileSync(full, "utf8"));
    }
    catch {
        left.push(path);
        notes.push(`${path} is not JSON: left as it is`);
        return null;
    }
}
const writeSettings = (root, path, settings) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), JSON.stringify(settings, null, 2) + "\n");
};
/** The line of `.gitattributes` that has git merge the approvals by union (s-7unxytshhc4md54). */
const UNION = `${APPROVALS} merge=union`;
const ATTRIBUTES = ".gitattributes";
/** Whether a line of `.gitattributes` is the line init appends, spacing and line endings aside. */
const isUnion = (line) => line.trim().split(/\s+/).join(" ") === UNION;
/**
 * Has git merge the approvals by union: appends the line where git leaves their merge attribute unspecified, and names
 * any other state of it, appending nothing; outside a git repository, appends it unless the file holds it already.
 */
function mergeByUnion(root, report) {
    const full = join(root, ATTRIBUTES);
    const held = existsSync(full) ? readFileSync(full, "utf8") : null;
    const asked = git(root, "check-attr", "merge", "--", APPROVALS);
    const state = asked.ok ? asked.out.trim().split(": ").at(-1) : held?.split("\n").some(isUnion) ? "union" : "unspecified";
    if (state === "union")
        return;
    if (state !== "unspecified") {
        report.notes.push(`git merges ${APPROVALS} by the setting merge: ${state}, which sheriff init leaves as the project's; its approvals conflict where two branches are merged`);
        return;
    }
    const eol = held?.includes("\r\n") ? "\r\n" : "\n";
    const lead = held && !held.endsWith("\n") ? eol : "";
    writeFileSync(full, `${held ?? ""}${lead}${UNION}${eol}`);
    report.written.push(ATTRIBUTES);
}
/**
 * Sets a repository up for the SpecSheriff tools and the agent named: replaces a hook or a declaration an
 * earlier release of it wrote, and no other file that differs from what it would write.
 */
export function init(root, agent = "claude") {
    if (!AGENTS.includes(agent))
        throw new Error(`sheriff init sets a repository up for the agent claude or codex, not ${agent}`);
    const report = { written: [], replaced: [], left: [], notes: [] };
    const write = (path, text, executable = false, kind) => {
        const full = join(root, path);
        if (existsSync(full)) {
            const held = readFileSync(full, "utf8");
            if (lf(held) === lf(text))
                return;
            if (!kind || !writtenBefore(kind, held))
                return void report.left.push(path);
            report.replaced.push(path);
        }
        else
            report.written.push(path);
        mkdirSync(dirname(full), { recursive: true });
        writeFileSync(full, text);
        if (executable)
            chmodSync(full, 0o755);
    };
    for (const hook of HOOKS)
        write(`.githooks/${hook}`, HOOK, true, "githook");
    // A hook's mode reaches the clones only through git's index, which on Windows takes no mode from the
    // file: each hook holding what init writes is staged executable where the index does not hold it so.
    for (const hook of HOOKS) {
        const path = `.githooks/${hook}`;
        if (lf(readFileSync(join(root, path), "utf8")) !== lf(HOOK))
            continue;
        if (git(root, "ls-files", "-s", "--", path).out.startsWith("100755 "))
            continue;
        if (git(root, "add", "--chmod=+x", "--", path).ok)
            report.notes.push(`staged executable: ${path}`);
        else
            report.notes.push(`${path} is not staged executable: git add --chmod=+x ${path} once git can stage it`);
    }
    if (agent === "claude")
        declareToClaude(root, report);
    else
        writeCodexHooks(root, report);
    mergeByUnion(root, report);
    // Taking up the method moves where git looks for hooks, so a hook the repository ran before stops running: each is
    // named, with where to move it to keep it running (s-n4m5zvh96yb299p).
    const hooksPath = git(root, "config", "core.hooksPath").out.trim();
    if (hooksPath !== ".githooks") {
        // Where git looked: core.hooksPath, absolute or from the root, else the hooks of the repository's git directory,
        // which a linked worktree shares with the clone it was added to.
        const dir = (hooksPath || git(root, "rev-parse", "--git-path", "hooks").out.trim() || ".git/hooks").replaceAll("\\", "/");
        const full = isAbsolute(dir) ? dir : join(root, dir);
        if (existsSync(full)) {
            for (const name of readdirSync(full).filter((n) => !n.endsWith(".sample")).sort()) {
                report.notes.push(`${dir}/${name} no longer runs, since the git hooks now run from .githooks; move it into .githooks/${name}.d/ to keep it running`);
            }
        }
    }
    if (git(root, "config", "core.hooksPath").out.trim() !== ".githooks") {
        if (git(root, "config", "core.hooksPath", ".githooks").ok)
            report.notes.push("the git hooks are turned on: core.hooksPath is .githooks");
        else
            report.notes.push("not a git repository: turn the hooks on with git config core.hooksPath .githooks");
    }
    if (!existsSync(join(root, "sheriff.config.json"))) {
        write("sheriff.config.json", JSON.stringify({ code: [], tests: [] }, null, 2) + "\n");
        report.notes.push("name in sheriff.config.json where the system's code and its tests live, and the testCommand");
    }
    if (!existsSync(join(root, "specs", "_guidelines", "project.json"))) {
        const owner = git(root, "config", "user.email").out.trim();
        if (!owner)
            report.notes.push("git names no email: specs/_guidelines/project.json was not written; set git config user.email and run sheriff init again");
        else {
            const project = { schemaVersion: 1, scope: "_guidelines", section: "project", nodes: [{
                        location: ["_guidelines", "project"].join("/"), sid: newSid(new Set()), kind: "section", title: "The project's own guidelines", status: "draft",
                        text: "What only this project's specification needs beyond the SpecSheriff guidelines.", owners: [owner], refs: [],
                        // Every project holds the rule approving its specification, a draft until its owners approve it (s-7unxytshhc4md54).
                        children: [{ ...approvalRuleNode(), location: ["_guidelines", "project", "1"].join("/"), sid: newSid(new Set()) }],
                    }] };
            write("specs/_guidelines/project.json", canonical(project));
        }
    }
    return report;
}
/** The marketplace and the plugin added to `.claude/settings.json` beside every other key; one an earlier release declared is replaced. */
function declareToClaude(root, report) {
    const path = ".claude/settings.json";
    const settings = readSettings(root, path, report.notes, report.left);
    if (!settings)
        return;
    let changed = false;
    let replaced = false;
    let differs = false;
    for (const [key, entries] of Object.entries(DECLARED)) {
        const held = (settings[key] ??= {});
        for (const [name, value] of Object.entries(entries)) {
            if (!(name in held))
                (held[name] = value), (changed = true);
            else if (JSON.stringify(held[name]) === JSON.stringify(value))
                continue;
            else if (writtenBefore(`claude-${key}`, JSON.stringify(held[name])))
                (held[name] = value), (replaced = true);
            else
                differs = true;
        }
    }
    if (differs)
        report.left.push(path);
    if (replaced)
        report.replaced.push(path);
    else if (changed)
        report.written.push(path);
    if (changed || replaced)
        writeSettings(root, path, settings);
}
/** The agent's hooks for Codex added to `.codex/hooks.json` beside every other hook; one an earlier release wrote is replaced. */
function writeCodexHooks(root, report) {
    const path = ".codex/hooks.json";
    const settings = readSettings(root, path, report.notes, report.left);
    if (!settings)
        return;
    const hooks = (settings.hooks ??= {});
    let changed = false;
    let replaced = false;
    let differs = false;
    for (const event of Object.keys(CODEX_HOOKS)) {
        const entries = (hooks[event] ??= []);
        const ours = codexEntry(event);
        if (entries.some((e) => JSON.stringify(e) === JSON.stringify(ours)))
            continue;
        const before = entries.findIndex((e) => codexEntryBefore(event, e));
        if (before >= 0)
            (entries[before] = ours), (replaced = true);
        else if (entries.some(callsPlugin))
            differs = true;
        else
            entries.push(ours), (changed = true);
    }
    if (differs)
        report.left.push(path);
    if (replaced)
        report.replaced.push(path);
    else if (changed)
        report.written.push(path);
    if (changed || replaced)
        writeSettings(root, path, settings);
}
/**
 * Takes out of a repository what sheriff init writes outside `specs/`, for both agents, where each holds
 * what it writes now or wrote in an earlier release; leaves what differs and the specification, naming
 * each, and stages nothing.
 */
export function remove(root) {
    const report = { removed: [], left: [], notes: [] };
    const drop = (path) => {
        rmSync(join(root, path));
        report.removed.push(path);
    };
    for (const hook of HOOKS) {
        const path = `.githooks/${hook}`;
        if (!existsSync(join(root, path)))
            continue;
        const text = readFileSync(join(root, path), "utf8");
        if (lf(text) === lf(HOOK) || writtenBefore("githook", text))
            drop(path);
        else
            report.left.push(`${path}, which differs from what sheriff init writes`);
    }
    const claudePath = ".claude/settings.json";
    const claude = existsSync(join(root, claudePath)) ? readSettings(root, claudePath, report.notes, report.left) : null;
    if (claude) {
        let took = false;
        let differs = false;
        for (const [key, entries] of Object.entries(DECLARED)) {
            const held = claude[key];
            if (!held || typeof held !== "object")
                continue;
            for (const [name, value] of Object.entries(entries)) {
                if (!(name in held))
                    continue;
                const text = JSON.stringify(held[name]);
                if (text === JSON.stringify(value) || writtenBefore(`claude-${key}`, text))
                    delete held[name], (took = true);
                else
                    differs = true;
            }
            if (!Object.keys(held).length)
                delete claude[key];
        }
        if (differs)
            report.left.push(`${claudePath}, which differs from what sheriff init writes`);
        if (took)
            settle(root, claudePath, claude, report);
    }
    const codexPath = ".codex/hooks.json";
    const codex = existsSync(join(root, codexPath)) ? readSettings(root, codexPath, report.notes, report.left) : null;
    if (codex?.hooks && typeof codex.hooks === "object") {
        let took = false;
        let differs = false;
        for (const event of Object.keys(CODEX_HOOKS)) {
            const entries = codex.hooks[event];
            if (!Array.isArray(entries))
                continue;
            const kept = entries.filter((e) => JSON.stringify(e) !== JSON.stringify(codexEntry(event)) && !codexEntryBefore(event, e));
            if (kept.some(callsPlugin))
                differs = true;
            if (kept.length === entries.length)
                continue;
            took = true;
            if (kept.length)
                codex.hooks[event] = kept;
            else
                delete codex.hooks[event];
        }
        if (!Object.keys(codex.hooks).length)
            delete codex.hooks;
        if (differs)
            report.left.push(`${codexPath}, which differs from what sheriff init writes`);
        if (took)
            settle(root, codexPath, codex, report);
    }
    // The line that has git merge the approvals by union, whoever wrote it, and the file it leaves holding only blank lines.
    if (existsSync(join(root, ATTRIBUTES))) {
        const lines = readFileSync(join(root, ATTRIBUTES), "utf8").split(/(?<=\n)/);
        const kept = lines.filter((l) => !isUnion(l));
        if (kept.length !== lines.length) {
            if (kept.join("").trim()) {
                writeFileSync(join(root, ATTRIBUTES), kept.join(""));
                report.removed.push(`from ${ATTRIBUTES}, what sheriff init writes there`);
            }
            else
                drop(ATTRIBUTES);
        }
    }
    if (git(root, "config", "--local", "core.hooksPath").out.trim() === ".githooks" && git(root, "config", "--local", "--unset", "core.hooksPath").ok) {
        report.notes.push("unset: core.hooksPath, which named .githooks");
    }
    // The project's own tools are left with their folders, and stop running with the hooks.
    if (existsSync(join(root, ".githooks"))) {
        for (const name of readdirSync(join(root, ".githooks")).filter((n) => n.endsWith(".d")).sort()) {
            report.notes.push(`.githooks/${name} is left, and the project's own tools in it no longer run`);
        }
    }
    if (existsSync(join(root, "sheriff.config.json")))
        drop("sheriff.config.json");
    for (const dir of [".githooks", ".claude", ".codex"]) {
        if (existsSync(join(root, dir)) && !readdirSync(join(root, dir)).length)
            rmdirSync(join(root, dir));
    }
    if (existsSync(join(root, "specs")))
        report.left.push("specs/, the project's specification, which remains its own");
    return report;
}
/** Writes settings that remove took something out of, or removes their file where they are left holding no key. */
function settle(root, path, settings, report) {
    if (Object.keys(settings).length) {
        writeSettings(root, path, settings);
        report.removed.push(`from ${path}, what sheriff init writes there`);
    }
    else {
        rmSync(join(root, path));
        report.removed.push(path);
    }
}
