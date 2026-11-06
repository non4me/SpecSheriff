import { randomInt } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.js";
import { holds, readConfirmations } from "./confirmations.js";
import { mergeKeys } from "./json-text.js";
import { incoming, locations, partOf, SID } from "./model.js";
import { schemaRefusals } from "./schema.js";
import { fieldKey, fieldsOf, gather } from "./values.js";
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
/** The keys earlier releases of the tools wrote under another name, each with its name now. */
const RENAMED_KEYS = { id: "location", rationale: "reason" };
/** The kinds earlier releases wrote under another name. */
const RENAMED_KINDS = { record: "recordType" };
/**
 * Renames, in every node of every file, the archive's included, what an earlier release wrote under another name,
 * each key where it stood; an old key whose new name the node already holds is dropped.
 */
function renameEarlier(files) {
    const rename = (n) => {
        // The files are validated only after this, so what is not a node is left for the validation to name.
        if (!n || typeof n !== "object" || Array.isArray(n))
            return n;
        const entries = Object.entries(n).flatMap(([k, v]) => {
            const now = RENAMED_KEYS[k];
            if (!now)
                return [[k, v]];
            return now in n ? [] : [[now, v]];
        });
        const node = Object.fromEntries(entries);
        if (RENAMED_KINDS[node.kind])
            node.kind = RENAMED_KINDS[node.kind];
        // An empty own list was how earlier releases said a field takes the values the domains add.
        if (node.kind === "recordType")
            for (const f of fieldsOf(node)) {
                if (f.type.is === "one of" && Array.isArray(f.type.values) && !f.type.values.length && !f.type.from) {
                    const { values: _, ...rest } = f.type;
                    f.type = { ...rest, from: "domains" };
                }
            }
        if (Array.isArray(node.children))
            node.children = node.children.map(rename);
        return node;
    };
    for (const f of files)
        if (Array.isArray(f.data.nodes))
            f.data.nodes = f.data.nodes.map(rename);
}
const A_SID = "s-222222222222222";
/**
 * A copy of a file in which what the reindex writes itself holds a value the schema takes, so that the validation
 * leaves it out (s-xzcw3hv4hmxz7h7): the links pointing at a node everywhere; outside the archive, a sid a node lacks,
 * every location, a header's index of its sections and the values gathered beside a field.
 */
function asValidated(f) {
    const archived = partOf(f.path).part.startsWith("_archive");
    const copy = structuredClone(f.data);
    const isObject = (v) => Boolean(v) && typeof v === "object" && !Array.isArray(v);
    const ungathered = (fields) => {
        if (!Array.isArray(fields))
            return;
        for (const field of fields.filter(isObject)) {
            delete field.gathered;
            if (isObject(field.type))
                ungathered(field.type.fields);
        }
    };
    const visit = (n) => {
        if (!isObject(n))
            return;
        if (Array.isArray(n.refs))
            n.refs = n.refs.filter((r) => !(isObject(r) && "from" in r));
        if (!archived) {
            if (!("sid" in n))
                n.sid = A_SID;
            n.location = "x";
            if (n.kind === "domain")
                n.sections = [];
            ungathered(n.fields);
        }
        if (Array.isArray(n.children))
            n.children.forEach(visit);
    };
    if (Array.isArray(copy.nodes))
        copy.nodes.forEach(visit);
    return copy;
}
/** Gives a sid to every node without one, and puts every node's location and sid first. */
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
        const { location = "", sid: _, ...rest } = n;
        const settled = { location, sid, ...rest };
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
    renameEarlier(files);
    // Validated once what an earlier release wrote is changed, and before anything is computed (s-xzcw3hv4hmxz7h7).
    const refused = schemaRefusals(root, files.map((f) => ({ path: f.path, data: asValidated(f) })));
    if (refused.length)
        throw new Error(`the schema refuses what the reindex reads, so it writes no file:\n${refused.map((r) => `${r.where}: ${r.message}`).join("\n")}`);
    giveSids(files);
    const spec = withTaken(root, files);
    const ids = locations(spec);
    const built = incoming(spec);
    for (const [sid, { node }] of spec.nodes) {
        if (ids.has(sid))
            node.location = ids.get(sid);
        node.refs = [...(node.refs ?? []).filter((r) => !r.from), ...(built.get(sid) ?? [])];
    }
    // A node of the archive holds no link pointing at it.
    const unlinked = (nodes) => nodes.forEach((n) => ((n.refs = (n.refs ?? []).filter((r) => !r.from)), unlinked(n.children ?? [])));
    for (const f of spec.archive)
        unlinked(f.data.nodes ?? []);
    for (const { header, sections } of headers(spec))
        header.sections = headerIndex(spec, sections, built);
    // Beside each field whose values come from elsewhere than its own list, the values gathered for it (s-ju5vcanbjph7mgh).
    const gathered = gather(spec);
    for (const [, { node }] of spec.nodes) {
        if (node.kind !== "recordType")
            continue;
        for (const f of fieldsOf(node)) {
            if (f.type.is === "one of" && f.type.from)
                f.gathered = gathered.get(fieldKey(node, f.name)) ?? [];
            else
                delete f.gathered;
        }
    }
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
