import { randomInt } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { readCode } from "./code.js";
import { loadConfig, readsAs } from "./config.js";
import { trackedFiles } from "./diff.js";
import { migrateApprovals, readApprovals, stands } from "./approvals.js";
import { mergeKeys } from "./json-text.js";
import { APPROVAL_RULE, approvalRule, approvalRuleNode, builtStatuses, fingerprint, incoming, isContainer, locations, partOf, PROJECT, SID } from "./model.js";
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
        // Earlier releases wrote a draft as "" and an approval as "checked", and one owner where a list stands now.
        if (node.status === "")
            node.status = "draft";
        if (node.status === "checked")
            node.status = "approved";
        if (typeof node.owner === "string") {
            const renamed = Object.entries(node).map(([k, v]) => (k === "owner" ? ["owners", [v]] : [k, v]));
            for (const k of Object.keys(node))
                delete node[k];
            Object.assign(node, Object.fromEntries(renamed));
        }
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
 * every location, a header's index of its sections, the values gathered beside a field and the status of a section and
 * of a domain's header.
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
            if (isContainer(n.kind))
                n.status = "draft";
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
/** Whether a node's status is judged by the approvals here, rather than taken with the SpecSheriff guidelines at their version. */
export function judgedHere(path, writesSpecSheriffGuidelines) {
    return writesSpecSheriffGuidelines || !partOf(path).specSheriffGuidelines;
}
export function reindex(root) {
    const { writesSpecSheriffGuidelines } = loadConfig(root);
    const report = { merged: [], drafted: [], written: [] };
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
    // A specification without the rule approving it gets the rule as `sheriff init` writes it, a draft (s-f5rz6b7dhxejjts).
    const project = files.find((f) => f.path === PROJECT);
    const top = project?.data.nodes?.[0];
    // The base's rule it refines is the SpecSheriff guidelines', which a project takes and their repository holds.
    const holdsBase = (ns = []) => ns.some((n) => n.sid === APPROVAL_RULE || holdsBase(n.children));
    if (top && (!writesSpecSheriffGuidelines || files.some((f) => holdsBase(f.data.nodes)))) {
        const all = [];
        const walk = (ns = []) => ns.forEach((n) => (all.push(n), walk(n.children)));
        walk(project.data.nodes);
        if (!approvalRule(all))
            top.children = [...(top.children ?? []), approvalRuleNode()];
    }
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
    // An approved node whose wording no approval stands for is a draft (s-5ah25f6gy99panq); a section's and a domain's
    // header's status is then built from the nodes under it (s-9kfdycuq34beqvs).
    const lines = readApprovals(root);
    for (const [sid, { node, file }] of spec.nodes) {
        if (isContainer(node.kind) || !judgedHere(file.path, writesSpecSheriffGuidelines))
            continue;
        if (node.status === "approved" && !stands(lines, sid, fingerprint(node))) {
            node.status = "draft";
            report.drafted.push(sid);
        }
    }
    for (const [sid, status] of builtStatuses(spec)) {
        const at = spec.nodes.get(sid);
        if (judgedHere(at.file.path, writesSpecSheriffGuidelines))
            at.node.status = status;
    }
    // The confirmations an earlier release kept move into the approvals, read above from either file.
    if (migrateApprovals(root))
        report.written.push("specs/_approvals.jsonl");
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
const escaped = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/**
 * Rewrites each test naming its node by a bare sid, as an earlier release of the SpecSheriff tools read it, opening its
 * name or standing alone as the argument of its mark: `@spec ` is put before that sid, in the files the settings name as
 * the tests of the system's code or of a project's own check or generator, and each node's list of tests names the test
 * by its new name. Returns each file it rewrote (s-f5rz6b7dhxejjts).
 */
export async function rewriteTests(root) {
    const config = loadConfig(root);
    const own = [...config.checks, ...config.generators].flatMap((t) => t.tests);
    const isTests = (p) => readsAs(config, p) === "tests" || own.some((g) => posix.matchesGlob(p, g));
    const renamed = new Map();
    const rewritten = [];
    for (const path of trackedFiles(root).filter((p) => isTests(p) && existsSync(join(root, p)))) {
        const text = readFileSync(join(root, path), "utf8");
        const file = await readCode(path, text);
        const bare = (file?.tests ?? []).filter((t) => t.bare);
        if (!bare.length)
            continue;
        const lines = text.split("\n");
        for (const t of bare) {
            const at = t.at - 1;
            const sid = new RegExp(`(["'\`])${escaped(t.bare)}(?=[\\s"'\`])`);
            if (!sid.test(lines[at] ?? ""))
                continue;
            lines[at] = lines[at].replace(sid, `$1@spec ${t.bare}`);
            if (t.name.startsWith(t.bare))
                renamed.set(`${path}::${t.name}`, `${path}::@spec ${t.name}`);
        }
        const now = lines.join("\n");
        if (now === text)
            continue;
        writeFileSync(join(root, path), now);
        rewritten.push(path);
    }
    if (renamed.size) {
        for (const path of specPaths(root)) {
            const data = JSON.parse(readFileSync(join(root, path), "utf8"));
            let changed = false;
            const walk = (nodes = []) => nodes.forEach((n) => {
                const meta = n.meta;
                if (Array.isArray(meta?.tests)) {
                    meta.tests = meta.tests.map((t) => {
                        const to = renamed.get(t);
                        if (to)
                            changed = true;
                        return to ?? t;
                    });
                }
                walk(n.children);
            });
            walk(data.nodes);
            if (changed)
                writeFileSync(join(root, path), canonical(data));
        }
    }
    return rewritten.sort();
}
