import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { readCode } from "./code.js";
import { loadConfig, readsAs } from "./config.js";
import { holds, readConfirmations } from "./confirmations.js";
import { codeChanges, spelledIn, trackedFiles } from "./diff.js";
import { fingerprint, ownerOf } from "./model.js";
import { judgedHere } from "./reindex.js";
import { loadSpecification, specificationOf } from "./spec-files.js";
function apply(text, edit) {
    if (!text.includes(edit.old_string))
        return null;
    return edit.replace_all ? text.split(edit.old_string).join(edit.new_string) : text.replace(edit.old_string, () => edit.new_string);
}
/** The file as the edit would leave it, or null where the edit would not apply and the tool refuses it itself. */
function afterEdit(tool, input, current) {
    if (tool === "Write")
        return input.content ?? "";
    if (tool === "Edit")
        return apply(current, input);
    if (tool === "MultiEdit") {
        let text = current;
        for (const e of input.edits ?? [])
            text = text === null ? null : apply(text, e);
        return text;
    }
    return null;
}
/** The lines an edit changes, both sides: what lies between the lines the two texts share at their start and at their end. */
function changedLines(before, after) {
    const a = before.split("\n");
    const b = after.split("\n");
    let start = 0;
    while (start < a.length && start < b.length && a[start] === b[start])
        start++;
    let end = 0;
    while (end < a.length - start && end < b.length - start && a[a.length - 1 - end] === b[b.length - 1 - end])
        end++;
    const lines = (all) => all.slice(start, all.length - end).map((text, i) => ({ line: start + i + 1, text }));
    return { removed: lines(a), added: lines(b) };
}
/**
 * Judges an edit an agent is about to make: the reason it is refused, or null where it may be made.
 * It refuses an edit that would leave a node checked over a wording its owner never confirmed, or
 * change the code of a rule no test carries the sid of.
 */
export async function guard(root, input) {
    const tool = input.tool_name ?? "";
    const given = input.tool_input;
    if (!given?.file_path || !["Write", "Edit", "MultiEdit"].includes(tool))
        return null;
    const path = relative(root, isAbsolute(given.file_path) ? given.file_path : join(root, given.file_path)).split(sep).join("/");
    if (path.startsWith(".."))
        return null;
    // Only the procedure that records a confirmation or withdraws one writes the confirmations.
    if (path === "specs/_confirmations.jsonl") {
        return "specs/_confirmations.jsonl is written by sheriff confirm alone, which records a confirmation or its withdrawal on its owner's word: leave the node's status empty for its owner to confirm";
    }
    const current = existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : "";
    const next = afterEdit(tool, given, current);
    if (next === null)
        return null;
    const config = loadConfig(root);
    const reasons = [];
    if (path.startsWith("specs/") && path.endsWith(".json") && !path.startsWith("specs/_schema/")) {
        let data;
        try {
            data = JSON.parse(next);
        }
        catch {
            return null;
        }
        const spec = loadSpecification(root);
        const was = new Map();
        for (const [sid, at] of spec.nodes)
            if (at.file.path === path)
                was.set(sid, at.node);
        const edited = specificationOf([...spec.files.filter((f) => f.path !== path), ...spec.archive, { path, data }]);
        const lines = readConfirmations(root);
        for (const [sid, { node, file }] of edited.nodes) {
            if (node.status !== "checked" || !judgedHere(file.path, config.writesSpecSheriffGuidelines) || holds(edited, lines, sid))
                continue;
            const old = was.get(sid);
            const touched = file.path === path && (!old || old.status !== "checked" || fingerprint(old) !== fingerprint(node));
            // A node the edit leaves as it was still turns unconfirmed where the edit gives it another owner.
            if (touched || holds(spec, lines, sid)) {
                reasons.push(`${sid} (${node.id}) would stand checked over a wording its owner ${ownerOf(edited, sid) ?? "(none named)"} has not confirmed: leave its status empty for its owner to confirm`);
            }
        }
    }
    if (readsAs(config, path) === "code") {
        const now = await readCode(path, next);
        const old = await readCode(path, current);
        if (now) {
            const spelled = await spelledIn(root, (p) => readsAs(config, p) !== null, { path, text: next });
            const real = (await codeChanges([{ path, ...changedLines(current, next) }], { before: () => current, after: () => next, spelled })).get(path);
            const all = (symbols) => symbols.flatMap((s) => [s, ...all(s.inner)]);
            const at = (symbols, line) => all(symbols).filter((s) => (s.start <= line && line <= s.end) || s.tags.some((t) => t.line === line));
            const touched = new Set();
            for (const line of real.added)
                at(now.symbols, line).forEach((s) => touched.add(s));
            for (const line of real.removed) {
                for (const s of at(old?.symbols ?? [], line))
                    all(now.symbols).filter((n) => n.name === s.name).forEach((n) => touched.add(n));
            }
            const spec = loadSpecification(root);
            const rules = new Set();
            for (const s of touched)
                for (const t of s.tags)
                    if (t.sid && spec.nodes.get(t.sid)?.node.kind === "rule")
                        rules.add(t.sid);
            if (rules.size) {
                const tested = new Set();
                for (const p of trackedFiles(root).filter((p) => readsAs(config, p) === "tests" && existsSync(join(root, p)))) {
                    const read = await readCode(p, readFileSync(join(root, p), "utf8"));
                    for (const t of read?.tests ?? [])
                        if (t.sid)
                            tested.add(t.sid);
                }
                for (const sid of rules) {
                    if (!tested.has(sid))
                        reasons.push(`no test carries ${sid} (${spec.nodes.get(sid).node.id}), a rule whose code this edit changes: write its test first`);
                }
            }
        }
    }
    return reasons.length ? reasons.join("\n") : null;
}
