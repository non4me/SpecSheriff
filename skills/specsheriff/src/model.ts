import { createHash } from "node:crypto";
import { posix } from "node:path";
import type { SpecNode, Specification } from "./spec-files.ts";

/** The sid of the base's rule on levels, which the rule of a project's own guidelines listing them refines. */
export const LEVELS_RULE = "s-nkyty4dy9x2v2a4";
export const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
const PROJECT = "specs/_guidelines/project.json";

export function partOf(path: string): { part: string; file: string; specSheriffGuidelines: boolean } {
  const [, part = "", ...rest] = path.split("/");
  const file = posix.basename(rest.join("/"), ".json");
  return { part, file, specSheriffGuidelines: part === "_guidelines" && (file === "spec" || file === "tools") };
}

/** A part whose files are numbered one by one under addresses of their own, rather than straight through. */
const numberedByFile = (part: string) => part === "_guidelines" || part === "tech";
const numbered = new Set(["section", "rule", "record"]);

/** Every node's address, computed from where it stands. */
export function addresses(spec: Specification): Map<string, string> {
  const ids = new Map<string, string>();
  const number = (nodes: SpecNode[], base: string, path: string, counter = { n: 0 }) => {
    for (const n of nodes) {
      if (n.kind === "term") {
        ids.set(n.sid, `${base}/${n.title}`);
      } else if (numbered.has(n.kind)) {
        const place = path ? `${path}.${++counter.n}` : `${++counter.n}`;
        ids.set(n.sid, `${base}/${place}`);
        number(n.children ?? [], base, place);
      }
    }
  };
  const straight = new Map<string, { n: number }>();
  for (const f of spec.files) {
    const { part, file } = partOf(f.path);
    if (numberedByFile(part)) {
      const address = `${part}/${file}`;
      const [top, ...more] = f.data.nodes;
      if (!top) continue;
      ids.set(top.sid, address);
      number(top.children ?? [], address, "");
      number(more, address, "", { n: top.children?.filter((c) => numbered.has(c.kind)).length ?? 0 });
      continue;
    }
    if (!straight.has(part)) straight.set(part, { n: 0 });
    for (const n of f.data.nodes) {
      if (n.kind === "domain") {
        ids.set(n.sid, part);
        number(n.children ?? [], part, "", straight.get(part));
      } else number([n], part, "", straight.get(part));
    }
  }
  return ids;
}

const NOT_CITING = new Set(["refs", "children", "sections"]);
const CITATION = /§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])|§([^\s,;)]+)/g;

/** The sids a node cites, and any node it cites by an address instead, each once, in the order written. */
export function citations(node: SpecNode): { sids: string[]; addresses: string[] } {
  const sids = new Set<string>();
  const found = new Set<string>();
  const read = (value: unknown) => {
    if (typeof value === "string") {
      for (const m of value.replace(/`[^`]*`/g, "").matchAll(CITATION)) {
        if (m[1]) sids.add(m[1]);
        else found.add("§" + m[2]!.replace(/\.+$/, ""));
      }
    } else if (Array.isArray(value)) value.forEach(read);
    else if (value && typeof value === "object") Object.values(value).forEach(read);
  };
  for (const [key, value] of Object.entries(node)) if (!NOT_CITING.has(key)) read(value);
  return { sids: [...sids].filter((s) => s !== node.sid), addresses: [...found] };
}

export type Incoming = { type: string; from: string; ratio?: string };

/**
 * The incoming links the outgoing ones produce, by the sid of the node they point at, in the order
 * the specification reads; a term-relation's ratio read from the other end, so reversed.
 */
export function incoming(spec: Specification): Map<string, Incoming[]> {
  const built = new Map<string, Incoming[]>();
  for (const [from, { node }] of spec.nodes) {
    for (const ref of node.refs) {
      if (!ref.to || !spec.nodes.has(ref.to)) continue;
      if (!built.has(ref.to)) built.set(ref.to, []);
      const ratio = ref.ratio?.split(":").reverse().join(":");
      built.get(ref.to)!.push({ type: ref.type, from, ...(ratio ? { ratio } : {}) });
    }
  }
  return built;
}

/** The node's owner: named by the nearest section or head above it or by itself, else by its domain's head, else the specification's. */
export function ownerOf(spec: Specification, sid: string): string | null {
  const at = spec.nodes.get(sid);
  if (!at) return null;
  for (let n: SpecNode | null = at.node; n; n = spec.nodes.get(n.sid)!.parent) {
    if ((n.kind === "section" || n.kind === "domain") && typeof n.owner === "string") return n.owner;
  }
  const { part } = partOf(at.file.path);
  if (!["_guidelines", "tech", "contracts"].includes(part)) {
    for (const f of spec.files) {
      if (partOf(f.path).part !== part) continue;
      const head = f.data.nodes.find((n) => n.kind === "domain");
      if (head && typeof head.owner === "string") return head.owner;
    }
  }
  const owner = spec.files.find((f) => f.path === PROJECT)?.data.nodes[0]?.owner;
  return typeof owner === "string" ? owner : null;
}

/** The levels the domains stand at, from the top: the list of the rule of the project's own guidelines refining the base's rule on levels. */
export function levelsOf(spec: Specification): string[] | null {
  let levels: string[] | null = null;
  const walk = (nodes: SpecNode[]) => {
    for (const n of nodes) {
      if (n.list && n.refs.some((r) => r.type === "refines" && r.to === LEVELS_RULE)) levels = (n.list as { members: string[] }).members;
      walk(n.children ?? []);
    }
  };
  walk(spec.files.find((f) => f.path === PROJECT)?.data.nodes ?? []);
  return levels;
}

/** Whether a file's part is a domain: neither the guidelines, nor contracts, nor the technical appendix, nor the archive. */
export const isDomain = (part: string) => !["_guidelines", "contracts", "tech", "_archive"].includes(part);

/** The domains, each after every domain it uses, the order of their names deciding where the links leave a choice. */
export function domainOrder(spec: Specification): string[] {
  const domainOf = new Map<string, string>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isDomain(part)) continue;
    const walk = (nodes: SpecNode[]) => nodes.forEach((n) => (domainOf.set(n.sid, part), walk(n.children ?? [])));
    walk(f.data.nodes);
  }
  const domains = [...new Set(domainOf.values())].sort();
  const uses = new Map(domains.map((d) => [d, new Set<string>()]));
  for (const [sid, part] of domainOf) {
    for (const r of spec.nodes.get(sid)!.node.refs) {
      const to = r.type === "consumes" && r.to ? domainOf.get(r.to) : undefined;
      if (to && to !== part) uses.get(part)!.add(to);
    }
  }
  const order: string[] = [];
  const left = new Set(domains);
  while (left.size) {
    const next = [...left].find((d) => [...uses.get(d)!].every((u) => !left.has(u))) ?? [...left][0]!;
    order.push(next);
    left.delete(next);
  }
  return order;
}

/** What a node holds beside its wording: its place, status, links, metadata, owner, and what the reindex builds. */
const NOT_WORDING = new Set(["id", "sid", "kind", "status", "refs", "meta", "children", "owner", "sections", "archived"]);

function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sorted((value as Record<string, unknown>)[k])]));
  }
  return value;
}

/** The SHA-256 of one canonical string of the node's wording: title, text, reason and the values its kind carries. */
export function fingerprint(node: SpecNode): string {
  const wording = Object.fromEntries(Object.entries(node).filter(([k]) => !NOT_WORDING.has(k)));
  return createHash("sha256").update(JSON.stringify(sorted(wording))).digest("hex");
}
