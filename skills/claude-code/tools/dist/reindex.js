import { randomInt } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.js";
import { holds, readConfirmations } from "./confirmations.js";
import { mergeKeys } from "./json-text.js";
import { addresses, incoming, partOf, SID } from "./model.js";
import { canonical, specPaths, withTaken } from "./spec-files.js";
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
export function newSid(taken) {
    for (;;) {
        let sid = "s-";
        for (let i = 0; i < 15; i++)
            sid += ALPHABET[randomInt(ALPHABET.length)];
        if (!taken.has(sid))
            return taken.add(sid), sid;
    }
}
/** Gives a sid to every node without one, and puts every node's address and sid first. */
function giveSids(files) {
    const taken = new Set();
    const each = (nodes, visit) => {
        for (const n of nodes)
            visit(n), each(n.children ?? [], visit);
    };
    for (const f of files)
        each(f.data.nodes ?? [], (n) => typeof n.sid === "string" && taken.add(n.sid));
    const settle = (nodes) => nodes.map((n) => {
        const sid = typeof n.sid === "string" && SID.test(n.sid) ? n.sid : newSid(taken);
        const { id = "", sid: _, ...rest } = n;
        const settled = { id, sid, ...rest };
        if (settled.children)
            settled.children = settle(settled.children);
        return settled;
    });
    for (const f of files)
        if (!partOf(f.path).part.startsWith("_archive"))
            f.data.nodes = settle(f.data.nodes ?? []);
}
/** Each domain's header and the sections its index lists. */
function headers(spec) {
    const parts = new Map();
    for (const f of spec.files) {
        const { part } = partOf(f.path);
        if (["_guidelines", "tech", "contracts"].includes(part))
            continue;
        if (!parts.has(part))
            parts.set(part, { sections: [] });
        const entry = parts.get(part);
        for (const n of f.data.nodes) {
            if (n.kind === "domain") {
                entry.header = n;
                entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
            }
            else if (n.kind === "section")
                entry.sections.push(n);
        }
    }
    return [...parts.values()].filter((e) => e.header).map((e) => ({ header: e.header, sections: e.sections }));
}
/** The index a header carries, as the domain's sections produce it. */
export function headerIndex(spec, sections, built) {
    return sections.map((s) => {
        const usedBy = (built.get(s.sid) ?? []).filter((r) => r.type === "consumes" && spec.nodes.get(r.from)?.node.kind === "domain").map((r) => r.from);
        return { sid: s.sid, title: s.title, text: s.text, ...(usedBy.length ? { usedBy } : {}) };
    });
}
/** Whether a node's status is judged by the confirmations here, rather than taken with the SpecSheriff guidelines at their version. */
export function judgedHere(path, writesSpecSheriffGuidelines) {
    return writesSpecSheriffGuidelines || !partOf(path).specSheriffGuidelines;
}
export function reindex(root) {
    const { writesSpecSheriffGuidelines } = loadConfig(root);
    const report = { merged: [], emptied: [], written: [] };
    const texts = new Map();
    const files = specPaths(root).map((path) => {
        const text = readFileSync(join(root, path), "utf8");
        texts.set(path, text);
        try {
            const { value, merged } = mergeKeys(text);
            report.merged.push(...merged.map((m) => ({ file: path, ...m })));
            return { path, data: value };
        }
        catch (error) {
            throw new Error(`${path}: ${error.message}`);
        }
    });
    giveSids(files);
    const spec = withTaken(root, files);
    const ids = addresses(spec);
    const built = incoming(spec);
    for (const [sid, { node }] of spec.nodes) {
        if (ids.has(sid))
            node.id = ids.get(sid);
        node.refs = [...(node.refs ?? []).filter((r) => !r.from), ...(built.get(sid) ?? [])];
    }
    // A node of the archive holds no link pointing at it.
    const unlinked = (nodes) => nodes.forEach((n) => ((n.refs = (n.refs ?? []).filter((r) => !r.from)), unlinked(n.children ?? [])));
    for (const f of spec.archive)
        unlinked(f.data.nodes ?? []);
    for (const { header, sections } of headers(spec))
        header.sections = headerIndex(spec, sections, built);
    const lines = readConfirmations(root);
    for (const [sid, { node, file }] of spec.nodes) {
        if (node.status === "checked" && judgedHere(file.path, writesSpecSheriffGuidelines) && !holds(spec, lines, sid)) {
            node.status = "";
            report.emptied.push(sid);
        }
    }
    // Only the repository's own files are written, never the SpecSheriff guidelines it takes from the tools.
    for (const f of [...spec.files, ...spec.archive]) {
        if (!files.includes(f))
            continue;
        const text = canonical(f.data);
        if (text !== texts.get(f.path)) {
            writeFileSync(join(root, f.path), text);
            report.written.push(f.path);
        }
    }
    return report;
}
