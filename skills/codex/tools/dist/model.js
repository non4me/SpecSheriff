import { createHash } from "node:crypto";
import { posix } from "node:path";
/** The sid of the base's rule on levels, which the rule of a project's own guidelines listing them refines. */
export const LEVELS_RULE = "s-nkyty4dy9x2v2a4";
export const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
/** The file of a project's own guidelines. */
export const PROJECT = "specs/_guidelines/project.json";
/** The sid of the base's rule on the specification's status, which the rule of a project's own guidelines approving it refines. */
export const APPROVAL_RULE = "s-qzthyh7yqvfhsa2";
/** The rule of a project's own guidelines that approves its specification, where its file holds one (s-qzthyh7yqvfhsa2). */
export function approvalRule(nodes) {
    for (const n of nodes)
        if (n.refs?.some((r) => r.type === "refines" && r.to === APPROVAL_RULE))
            return n;
    return undefined;
}
/** The rule approving the specification as `sheriff init` writes it and the reindex adds it where it is missing, a draft (s-7unxytshhc4md54). */
export function approvalRuleNode() {
    return {
        location: "", sid: "", kind: "rule", title: "The specification is approved", status: "draft",
        text: "This project's specification is approved.", refs: [{ type: "refines", to: APPROVAL_RULE }],
    };
}
/** A node's status as this release writes it: an earlier release wrote "" for draft and "checked" for approved. */
export const statusNow = (status) => (status === "checked" || status === "approved" ? "approved" : "draft");
/** Whether the specification is approved: its rule stands in the project's own guidelines and is approved (s-qzthyh7yqvfhsa2). */
export function specificationApproved(nodes) {
    const rule = approvalRule(nodes);
    return rule !== undefined && statusNow(rule.status) === "approved";
}
/** Whether a node is a section or a domain's header, whose status is built from the nodes under it (s-9kfdycuq34beqvs). */
export const isContainer = (kind) => kind === "section" || kind === "domain";
/** The sid of the base's rule on the fixtures of tests, which the rule of a project's own guidelines listing them refines. */
export const FIXTURES_RULE = "s-6hha5en226aj8hu";
/** The glob patterns naming the fixtures of tests: the members of each list a node refining the rule on fixtures holds. */
export function fixtureGlobs(spec) {
    return [...spec.nodes.values()]
        .filter(({ node }) => node.refs?.some((r) => r.type === "refines" && r.to === FIXTURES_RULE))
        .flatMap(({ node }) => (node.list?.members ?? []));
}
/** Whether a path is one of the fixtures of tests the globs name. */
export const isFixture = (globs, path) => globs.some((glob) => posix.matchesGlob(path, glob));
export function partOf(path) {
    const [, part = "", ...rest] = path.split("/");
    const file = posix.basename(rest.join("/"), ".json");
    return { part, file, specSheriffGuidelines: part === "_guidelines" && (file === "spec" || file === "tools") };
}
/** A part whose files are numbered one by one under locations of their own, rather than straight through. */
const numberedByFile = (part) => part === "_guidelines" || part === "tech";
/** The kinds of the SpecSheriff guidelines; any other is a kind a project's extension declares (s-vsh384ybt4w25a2). */
export const BASE_KINDS = new Set(["domain", "section", "rule", "term", "recordType"]);
export const isProjectKind = (kind) => !BASE_KINDS.has(kind);
/** Every kind but a term, located by its name, and a domain's header, by its domain's, is numbered as a rule is. */
const numbered = { has: (kind) => kind !== "term" && kind !== "domain" };
/** Every node's location, computed from where it is. */
export function locations(spec) {
    const ids = new Map();
    const number = (nodes, base, path, counter = { n: 0 }) => {
        for (const n of nodes) {
            if (n.kind === "term") {
                ids.set(n.sid, `${base}/${n.title}`);
            }
            else if (numbered.has(n.kind)) {
                const place = path ? `${path}.${++counter.n}` : `${++counter.n}`;
                ids.set(n.sid, `${base}/${place}`);
                number(n.children ?? [], base, place);
            }
        }
    };
    const straight = new Map();
    for (const f of spec.files) {
        const { part, file } = partOf(f.path);
        if (numberedByFile(part)) {
            const location = `${part}/${file}`;
            const [top, ...more] = f.data.nodes;
            if (!top)
                continue;
            ids.set(top.sid, location);
            number(top.children ?? [], location, "");
            number(more, location, "", { n: top.children?.filter((c) => numbered.has(c.kind)).length ?? 0 });
            continue;
        }
        if (!straight.has(part))
            straight.set(part, { n: 0 });
        if (part === "contracts") {
            // The node at the top of a file of contracts is located by the file; the rest are numbered straight through.
            const [top, ...more] = f.data.nodes;
            if (!top)
                continue;
            ids.set(top.sid, `${part}/${file}`);
            number(top.children ?? [], part, "", straight.get(part));
            number(more, part, "", straight.get(part));
            continue;
        }
        for (const n of f.data.nodes) {
            if (n.kind === "domain") {
                ids.set(n.sid, part);
                number(n.children ?? [], part, "", straight.get(part));
            }
            else
                number([n], part, "", straight.get(part));
        }
    }
    return ids;
}
const NOT_CITING = new Set(["refs", "children", "sections", "gathered"]);
const SID_CITED = /§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g;
const LOCATION_CITED = /§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g;
/**
 * The sids a node cites, text quoted as code included, and any node it cites by a location instead, outside text
 * quoted as code, where the notation is shown; each once, in the order written.
 */
export function citations(node) {
    const sids = new Set();
    const found = new Set();
    const read = (value) => {
        if (typeof value === "string") {
            for (const m of value.matchAll(SID_CITED))
                sids.add(m[1]);
            for (const m of value.replace(/`[^`]*`/g, "").matchAll(LOCATION_CITED))
                found.add("§" + m[1].replace(/\.+$/, ""));
        }
        else if (Array.isArray(value))
            value.forEach(read);
        else if (value && typeof value === "object")
            Object.values(value).forEach(read);
    };
    for (const [key, value] of Object.entries(node))
        if (!NOT_CITING.has(key))
            read(value);
    return { sids: [...sids].filter((s) => s !== node.sid), locations: [...found] };
}
/**
 * The incoming links the outgoing ones produce, by the sid of the node they point at, in the order
 * the specification reads; a term-relation's ratio read from the other end, so reversed.
 */
export function incoming(spec) {
    const built = new Map();
    const guidelines = (sid) => partOf(spec.nodes.get(sid).file.path).specSheriffGuidelines;
    for (const [from, { node }] of spec.nodes) {
        for (const ref of node.refs) {
            if (!ref.to || !spec.nodes.has(ref.to))
                continue;
            // The SpecSheriff guidelines hold only the links they make to themselves.
            if (guidelines(ref.to) && !guidelines(from))
                continue;
            if (!built.has(ref.to))
                built.set(ref.to, []);
            const ratio = ref.ratio?.split(":").reverse().join(":");
            built.get(ref.to).push({ type: ref.type, from, ...(ratio ? { ratio } : {}) });
        }
    }
    return built;
}
/** The model of the specification: every node as its file holds it, with its part, its file, the node above it and its owners (s-f5rz6b7dhxejjts). */
export function modelOf(spec) {
    const nodes = [...spec.nodes].map(([sid, { node, file, parent }]) => {
        const { children: _, ...own } = node;
        return { ...own, part: partOf(file.path).part, file: file.path, parent: parent?.sid ?? null, owners: ownersOf(spec, sid) };
    });
    return { nodes };
}
/** A node's own owners: the list it names, or, as an earlier release wrote it, its one owner. */
const named = (n) => {
    if (!n)
        return null;
    if (Array.isArray(n.owners) && n.owners.length)
        return n.owners;
    return typeof n.owner === "string" ? [n.owner] : null;
};
/** The specification's owners, those the top node of the project's own guidelines names (s-zefk589ykh37b8u). */
export function specificationOwners(spec) {
    return named(spec.files.find((f) => f.path === PROJECT)?.data.nodes[0]) ?? [];
}
/**
 * A node's owners, any of whom approves it (s-67vekyup7y8smap): those named by the nearest section or header above it
 * or by itself, else by its domain's header, else the specification's.
 */
export function ownersOf(spec, sid) {
    const at = spec.nodes.get(sid);
    if (!at)
        return [];
    for (let n = at.node; n; n = spec.nodes.get(n.sid).parent) {
        if (isContainer(n.kind) && named(n))
            return named(n);
    }
    const { part } = partOf(at.file.path);
    if (!["_guidelines", "tech", "contracts"].includes(part)) {
        for (const f of spec.files) {
            if (partOf(f.path).part !== part)
                continue;
            const header = named(f.data.nodes.find((n) => n.kind === "domain"));
            if (header)
                return header;
        }
    }
    return specificationOwners(spec);
}
/**
 * The status each section and domain's header is built to (s-9kfdycuq34beqvs): approved where every node under it that
 * is no section is approved, every node of the domain but its header for a header, and draft otherwise.
 */
export function builtStatuses(spec) {
    const out = new Map();
    const approved = (n) => statusNow(n.status) === "approved";
    const allUnder = (n) => (n.children ?? []).every((c) => (isContainer(c.kind) ? allUnder(c) : approved(c) && allUnder(c)));
    const byDomain = new Map();
    for (const f of spec.files) {
        const { part } = partOf(f.path);
        const walk = (nodes) => nodes.forEach((n) => {
            if (n.kind === "section")
                out.set(n.sid, allUnder(n) ? "approved" : "draft");
            walk(n.children ?? []);
        });
        walk(f.data.nodes);
        if (isDomain(part)) {
            const every = f.data.nodes.every((n) => n.kind === "domain" || (isContainer(n.kind) ? allUnder(n) : approved(n) && allUnder(n)));
            byDomain.set(part, (byDomain.get(part) ?? true) && every);
        }
    }
    for (const f of spec.files) {
        const { part } = partOf(f.path);
        if (!isDomain(part))
            continue;
        for (const n of f.data.nodes)
            if (n.kind === "domain")
                out.set(n.sid, byDomain.get(part) ? "approved" : "draft");
    }
    return out;
}
/** The levels the domains stand at, from the top: the list of the rule of the project's own guidelines refining the base's rule on levels. */
export function levelsOf(spec) {
    let levels = null;
    const walk = (nodes) => {
        for (const n of nodes) {
            if (n.list && n.refs.some((r) => r.type === "refines" && r.to === LEVELS_RULE))
                levels = n.list.members;
            walk(n.children ?? []);
        }
    };
    walk(spec.files.find((f) => f.path === PROJECT)?.data.nodes ?? []);
    return levels;
}
/** Whether a file's part is a domain: neither the guidelines, nor contracts, nor the technical appendix, nor the archive. */
export const isDomain = (part) => !["_guidelines", "contracts", "tech", "_archive"].includes(part);
/**
 * The domains, each after every domain it uses and as close as possible before the first that uses
 * it: the domains nobody uses in the order of their names, each preceded by the domains it uses,
 * taken in the same way; the order of their names decides wherever the links leave a choice.
 */
export function domainOrder(spec) {
    const domainOf = new Map();
    for (const f of spec.files) {
        const { part } = partOf(f.path);
        if (!isDomain(part))
            continue;
        const walk = (nodes) => nodes.forEach((n) => (domainOf.set(n.sid, part), walk(n.children ?? [])));
        walk(f.data.nodes);
    }
    const domains = [...new Set(domainOf.values())].sort();
    const uses = new Map(domains.map((d) => [d, new Set()]));
    for (const [sid, part] of domainOf) {
        for (const r of spec.nodes.get(sid).node.refs) {
            const to = r.type === "consumes" && r.to ? domainOf.get(r.to) : undefined;
            if (to && to !== part)
                uses.get(part).add(to);
        }
    }
    const order = [];
    const seen = new Set();
    const take = (d) => {
        if (seen.has(d))
            return;
        seen.add(d);
        [...uses.get(d)].sort().forEach(take);
        order.push(d);
    };
    const used = new Set([...uses.values()].flatMap((s) => [...s]));
    domains.filter((d) => !used.has(d)).forEach(take);
    domains.forEach(take); // what a cycle leaves, which the check of the specification refuses anyway
    return order;
}
/** What a node holds beside its wording: its place, status, links, metadata, owners, and what the reindex builds. */
const NOT_WORDING = new Set(["location", "sid", "kind", "status", "refs", "meta", "children", "owner", "owners", "sections", "archived"]);
function sorted(value) {
    if (Array.isArray(value))
        return value.map(sorted);
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sorted(value[k])]));
    }
    return value;
}
/**
 * The SHA-256 of one canonical string of the node's wording: title, text, reason and the values its kind adds.
 * The reason stands there under `rationale`, the key earlier releases wrote, so that renaming the key changed no
 * fingerprint and no approval given before it.
 */
export function fingerprint(node) {
    const wording = Object.fromEntries(Object.entries(node).filter(([k]) => !NOT_WORDING.has(k)).map(([k, v]) => [k === "reason" ? "rationale" : k, v]));
    // What the reindex builds beside a field, the values gathered for it, is no one's wording. A field taking the values
    // the domains add stands as earlier releases wrote it, with an empty list of its own (s-v4qus7raqnwzneb).
    const earlier = (v) => {
        if (!v || typeof v !== "object" || Array.isArray(v))
            return v;
        const { from, ...rest } = v;
        return rest.is === "one of" && from === "domains" && !("values" in rest) ? { ...rest, values: [] } : v;
    };
    const built = JSON.parse(JSON.stringify(wording, (k, v) => (k === "gathered" ? undefined : earlier(v))));
    return createHash("sha256").update(JSON.stringify(sorted(built))).digest("hex");
}
