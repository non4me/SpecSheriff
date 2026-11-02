import { createHash } from "node:crypto";
import { posix } from "node:path";
/** The sid of the base's rule on levels, which the rule of a project's own guidelines listing them refines. */
export const LEVELS_RULE = "s-nkyty4dy9x2v2a4";
export const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
/** The file of a project's own guidelines. */
export const PROJECT = "specs/_guidelines/project.json";
export function partOf(path) {
    const [, part = "", ...rest] = path.split("/");
    const file = posix.basename(rest.join("/"), ".json");
    return { part, file, specSheriffGuidelines: part === "_guidelines" && (file === "spec" || file === "tools") };
}
/** A part whose files are numbered one by one under addresses of their own, rather than straight through. */
const numberedByFile = (part) => part === "_guidelines" || part === "tech";
const numbered = new Set(["section", "rule", "record"]);
/** Every node's address, computed from where it stands. */
export function addresses(spec) {
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
            const address = `${part}/${file}`;
            const [top, ...more] = f.data.nodes;
            if (!top)
                continue;
            ids.set(top.sid, address);
            number(top.children ?? [], address, "");
            number(more, address, "", { n: top.children?.filter((c) => numbered.has(c.kind)).length ?? 0 });
            continue;
        }
        if (!straight.has(part))
            straight.set(part, { n: 0 });
        if (part === "contracts") {
            // The node at the top of a file of contracts is addressed by the file; the rest are numbered straight through.
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
const NOT_CITING = new Set(["refs", "children", "sections"]);
const CITATION = /§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])|§([^\s,;)]+)/g;
/** The sids a node cites, and any node it cites by an address instead, each once, in the order written. */
export function citations(node) {
    const sids = new Set();
    const found = new Set();
    const read = (value) => {
        if (typeof value === "string") {
            for (const m of value.replace(/`[^`]*`/g, "").matchAll(CITATION)) {
                if (m[1])
                    sids.add(m[1]);
                else
                    found.add("§" + m[2].replace(/\.+$/, ""));
            }
        }
        else if (Array.isArray(value))
            value.forEach(read);
        else if (value && typeof value === "object")
            Object.values(value).forEach(read);
    };
    for (const [key, value] of Object.entries(node))
        if (!NOT_CITING.has(key))
            read(value);
    return { sids: [...sids].filter((s) => s !== node.sid), addresses: [...found] };
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
/** The node's owner: named by the nearest section or header above it or by itself, else by its domain's header, else the specification's. */
export function ownerOf(spec, sid) {
    const at = spec.nodes.get(sid);
    if (!at)
        return null;
    for (let n = at.node; n; n = spec.nodes.get(n.sid).parent) {
        if ((n.kind === "section" || n.kind === "domain") && typeof n.owner === "string")
            return n.owner;
    }
    const { part } = partOf(at.file.path);
    if (!["_guidelines", "tech", "contracts"].includes(part)) {
        for (const f of spec.files) {
            if (partOf(f.path).part !== part)
                continue;
            const header = f.data.nodes.find((n) => n.kind === "domain");
            if (header && typeof header.owner === "string")
                return header.owner;
        }
    }
    const owner = spec.files.find((f) => f.path === PROJECT)?.data.nodes[0]?.owner;
    return typeof owner === "string" ? owner : null;
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
/** What a node holds beside its wording: its place, status, links, metadata, owner, and what the reindex builds. */
const NOT_WORDING = new Set(["id", "sid", "kind", "status", "refs", "meta", "children", "owner", "sections", "archived"]);
function sorted(value) {
    if (Array.isArray(value))
        return value.map(sorted);
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sorted(value[k])]));
    }
    return value;
}
/** The SHA-256 of one canonical string of the node's wording: title, text, reason and the values its kind carries. */
export function fingerprint(node) {
    const wording = Object.fromEntries(Object.entries(node).filter(([k]) => !NOT_WORDING.has(k)));
    return createHash("sha256").update(JSON.stringify(sorted(wording))).digest("hex");
}
