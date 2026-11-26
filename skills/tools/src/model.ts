import { createHash } from "node:crypto";
import { posix } from "node:path";
import { cellNodes, type CellPlace, type SpecNode, type Specification } from "./spec-files.ts";

/** The sid of the base's rule on levels, which the rule of a project's own guidelines listing them refines. */
export const LEVELS_RULE = "s-nkyty4dy9x2v2a4";
export const SID = /^s-[2-9a-hjkmnp-z]{15}$/;
/** The file of a project's own guidelines. */
export const PROJECT = "specs/_guidelines/project.json";
/**
 * The sid of the base's rule on the specification's approval status. An earlier release recorded the specification's
 * approval through a rule of a project's own guidelines that refines the base's rule. `sheriff reindex` replaces that
 * rule with an entry (s-gb8s9657a65hqmv).
 */
export const APPROVAL_RULE = "s-qzthyh7yqvfhsa2";

/** The sid of the base's rule on when the tests must pass; that rule is refined by the rule of a project's own guidelines on when the tests run. */
export const TESTS_PASS_RULE = "s-x8uzc8z44pwtd3h";

/** The draft rule on when the tests run, as `sheriff init` writes it (s-7unxytshhc4md54), without a sid or a location. */
export function testsRunRule(): Omit<SpecNode, "sid" | "location"> {
  return {
    kind: "TextRule", title: "When the tests run", status: "draft", text: "The tests run before every push.",
    refs: [{ type: "refines", to: TESTS_PASS_RULE }],
    reason: "Running the tests before every push keeps a change whose tests fail from reaching the project's shared branch.",
    list: { of: "the moments at which the tests run", members: ["push"] },
  };
}

/** A node's status as this release writes it: an earlier release wrote "" for draft and "checked" for approved. */
export const statusNow = (status: string | undefined) => (status === "checked" || status === "approved" ? "approved" : "draft");

/** Whether a node is a section or a domain's header, whose status is built from the nodes under it (s-9kfdycuq34beqvs). */
export const isContainer = (kind: string | undefined) => kind === "section" || kind === "header";

/** The sid of the base's rule on the fixtures of tests, which the rule of a project's own guidelines listing them refines. */
export const FIXTURES_RULE = "s-6hha5en226aj8hu";

/** The glob patterns naming the fixtures of tests: the members of each list a node refining the rule on fixtures holds. */
export function fixtureGlobs(spec: Specification): string[] {
  return [...spec.nodes.values()]
    .filter(({ node }) => node.refs?.some((r) => r.type === "refines" && r.to === FIXTURES_RULE))
    .flatMap(({ node }) => ((node.list as { members?: string[] } | undefined)?.members ?? []));
}

/** Whether a path is one of the fixtures of tests the globs name. */
export const isFixture = (globs: string[], path: string) => globs.some((glob) => posix.matchesGlob(path, glob));

/**
 * The part of the specification that a file belongs to, which is the folder under specs/ that holds the file, and the file's path
 * within that folder without the `.json` extension. The SpecSheriff guidelines consist of the base, the appendix of the tools and the extensions of the guidelines (s-zefk589ykh37b8u).
 */
export function partOf(path: string): { part: string; file: string; specSheriffGuidelines: boolean } {
  const [, part = "", ...rest] = path.split("/");
  const file = rest.join("/").replace(/\.json$/, "");
  return { part, file, specSheriffGuidelines: part === "_guidelines" && (file === "spec" || file === "tools" || file.startsWith("extensions/")) };
}

/** A part whose files are numbered one by one under locations of their own, rather than straight through. */
const numberedByFile = (part: string) => part === "_guidelines" || part === "tech";
/** The kinds of the SpecSheriff guidelines; any other is a kind a project's extension declares (s-vsh384ybt4w25a2). */
export const BASE_KINDS = new Set(["header", "section", "TextRule", "term", "RecordType"]);
export const isProjectKind = (kind: string) => !BASE_KINDS.has(kind);
/** Every kind but a term, located by its name, and a domain's header, by its domain's, is numbered as a rule is. */
const numbered = { has: (kind: string) => kind !== "term" && kind !== "header" };

/** The nodes under a node: its children, then the nodes in its cells, row by row and column by column (s-ygg5kpcxgzq3m7w). */
const under = (n: SpecNode) => [...(n.children ?? []), ...cellNodes(n).map((c) => c.node)];

/** Every node's location, computed from where it is. */
export function locations(spec: Specification): Map<string, string> {
  const ids = new Map<string, string>();
  const number = (nodes: SpecNode[], base: string, path: string, counter = { n: 0 }) => {
    for (const n of nodes) {
      if (n.kind === "term") {
        ids.set(n.sid, `${base}/${n.title}`);
      } else if (numbered.has(n.kind)) {
        const place = path ? `${path}.${++counter.n}` : `${++counter.n}`;
        ids.set(n.sid, `${base}/${place}`);
        number(under(n), base, place);
      }
    }
  };
  const straight = new Map<string, { n: number }>();
  for (const f of spec.files) {
    const { part, file } = partOf(f.path);
    if (numberedByFile(part)) {
      const location = `${part}/${file}`;
      const [top, ...more] = f.data.nodes;
      if (!top) continue;
      ids.set(top.sid, location);
      const counter = { n: 0 };
      number(under(top), location, "", counter);
      number(more, location, "", counter);
      continue;
    }
    if (!straight.has(part)) straight.set(part, { n: 0 });
    for (const n of f.data.nodes) {
      if (n.kind === "header") {
        ids.set(n.sid, part);
        number(n.children ?? [], part, "", straight.get(part));
      } else number([n], part, "", straight.get(part));
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
export function citations(node: SpecNode): { sids: string[]; locations: string[] } {
  const sids = new Set<string>();
  const found = new Set<string>();
  const read = (value: unknown) => {
    if (typeof value === "string") {
      for (const m of value.matchAll(SID_CITED)) sids.add(m[1]!);
      for (const m of value.replace(/`[^`]*`/g, "").matchAll(LOCATION_CITED)) found.add("§" + m[1]!.replace(/\.+$/, ""));
    } else if (Array.isArray(value)) value.forEach(read);
    else if (value && typeof value === "object") Object.values(value).forEach(read);
  };
  for (const [key, value] of Object.entries(node)) {
    if (NOT_CITING.has(key)) continue;
    // A TableRule's citations are those in its headings and its text cells; a node in a cell has citations of its own (s-qzyacnqwvaeaps4).
    if (key === "groups" && Array.isArray(value)) {
      for (const g of value as Array<{ heading?: unknown; rows?: Array<{ cells?: Record<string, { text?: unknown }> }> }>) {
        read(g.heading);
        for (const r of g.rows ?? []) for (const c of Object.values(r.cells ?? {})) read(c.text);
      }
      continue;
    }
    read(value);
  }
  return { sids: [...sids].filter((s) => s !== node.sid), locations: [...found] };
}

export type Incoming = { type: string; from: string; ratio?: string };

/**
 * The incoming links the outgoing ones produce, by the sid of the node they point at, in the order
 * the specification reads; a term-relation's ratio read from the other end, so reversed.
 */
export function incoming(spec: Specification): Map<string, Incoming[]> {
  const built = new Map<string, Incoming[]>();
  const guidelines = (sid: string) => partOf(spec.nodes.get(sid)!.file.path).specSheriffGuidelines;
  for (const [from, { node }] of spec.nodes) {
    for (const ref of node.refs) {
      if (!ref.to || !spec.nodes.has(ref.to)) continue;
      // The SpecSheriff guidelines hold only the links they make to themselves.
      if (guidelines(ref.to) && !guidelines(from)) continue;
      if (!built.has(ref.to)) built.set(ref.to, []);
      const ratio = ref.ratio?.split(":").reverse().join(":");
      built.get(ref.to)!.push({ type: ref.type, from, ...(ratio ? { ratio } : {}) });
    }
  }
  return built;
}

/** One node of the model `sheriff model` prints: as its file holds it, without the nodes under it, with where it stands and its owners. */
export type ModelNode = Omit<SpecNode, "children"> & { part: string; file: string; parent: string | null; owners: string[]; children?: undefined };

/**
 * The model of the specification (s-w6gybeqn2ttydqx): the specification's approval status and its `strict` flag, and every
 * node as its file holds it, with its part, its file, the node above it and its owners.
 */
export function modelOf(spec: Specification, flags: { approved: boolean; strict: boolean }): { approvalStatus: "approved" | "draft"; strict: boolean; nodes: ModelNode[] } {
  const nodes = [...spec.nodes].map(([sid, { node, file, parent }]) => {
    const { children: _, ...own } = node;
    return { ...own, part: partOf(file.path).part, file: file.path, parent: parent?.sid ?? null, owners: ownersOf(spec, sid) };
  });
  return { approvalStatus: flags.approved ? "approved" : "draft", strict: flags.strict, nodes };
}

/** A node's own owners: the list it names, or, as an earlier release wrote it, its one owner. */
const named = (n: SpecNode | undefined): string[] | null => {
  if (!n) return null;
  if (Array.isArray(n.owners) && n.owners.length) return n.owners as string[];
  return typeof n.owner === "string" ? [n.owner] : null;
};

/** The specification's owners, those the top node of the project's own guidelines names (s-zefk589ykh37b8u). */
export function specificationOwners(spec: Specification): string[] {
  return named(spec.files.find((f) => f.path === PROJECT)?.data.nodes[0]) ?? [];
}

/**
 * A node's owners, any of whom approves it (s-67vekyup7y8smap): those named by the nearest section or header above it
 * or by itself, else by its domain's header, else the specification's.
 */
export function ownersOf(spec: Specification, sid: string): string[] {
  const at = spec.nodes.get(sid);
  if (!at) return [];
  for (let n: SpecNode | null = at.node; n; n = spec.nodes.get(n.sid)!.parent) {
    if (isContainer(n.kind) && named(n)) return named(n)!;
  }
  const { part } = partOf(at.file.path);
  if (!["_guidelines", "tech", "contracts"].includes(part)) {
    for (const f of spec.files) {
      if (partOf(f.path).part !== part) continue;
      const header = named(f.data.nodes.find((n) => n.kind === "header"));
      if (header) return header;
    }
  }
  return specificationOwners(spec);
}

/**
 * The status each section and domain's header is built to (s-9kfdycuq34beqvs): approved where every node under it that
 * is no section is approved, every node of the domain but its header for a header, and draft otherwise.
 */
export function builtStatuses(spec: Specification): Map<string, "draft" | "approved"> {
  const out = new Map<string, "draft" | "approved">();
  const approved = (n: SpecNode) => statusNow(n.status) === "approved";
  const allUnder = (n: SpecNode): boolean => under(n).every((c) => (isContainer(c.kind) ? allUnder(c) : approved(c) && allUnder(c)));
  const byDomain = new Map<string, boolean>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    const walk = (nodes: SpecNode[]) => nodes.forEach((n) => {
      if (n.kind === "section") out.set(n.sid, allUnder(n) ? "approved" : "draft");
      walk(n.children ?? []);
    });
    walk(f.data.nodes);
    if (isDomain(part)) {
      // A header's approval status is built from every node of its domain's files, including the header's own children and the nodes in the cells of TableRules.
      const every = f.data.nodes.every((n) => (isContainer(n.kind) ? allUnder(n) : approved(n) && allUnder(n)));
      byDomain.set(part, (byDomain.get(part) ?? true) && every);
    }
  }
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isDomain(part)) continue;
    for (const n of f.data.nodes) if (n.kind === "header") out.set(n.sid, byDomain.get(part) ? "approved" : "draft");
  }
  return out;
}

/** What a reader of the project's own guidelines takes from the last approved wordings of their rules (s-t9j29hppag2nren). */
export type Wordings = { wording(sid: string): SpecNode | undefined; links(sid: string): SpecNode["refs"] };

/**
 * The members of the lists of every rule of the project's own guidelines that refines the given rule, in the order in
 * which those rules appear, each rule read in its last approved wording. A rule that was never approved contributes no members (s-t9j29hppag2nren).
 */
export function listedBy(spec: Specification, wordings: Wordings, refined: string): unknown[] {
  const out: unknown[] = [];
  const walk = (nodes: SpecNode[]) => {
    for (const n of nodes) {
      if (wordings.links(n.sid).some((r) => r.type === "refines" && r.to === refined)) {
        out.push(...(((wordings.wording(n.sid)?.list as { members?: unknown[] } | undefined)?.members) ?? []));
      }
      walk(n.children ?? []);
    }
  };
  walk(spec.files.find((f) => f.path === PROJECT)?.data.nodes ?? []);
  return out;
}

/** The levels at which the domains are placed, from the top: the list members of every rule of the project's own guidelines that refines the rule on levels. */
export function levelsOf(spec: Specification, wordings: Wordings): string[] {
  return listedBy(spec, wordings, LEVELS_RULE).filter((m): m is string => typeof m === "string");
}

/**
 * Whether a file's part is a domain. It is not one if it is the guidelines, the contracts section, the technical appendix,
 * the archive, or `base`, which is the folder of the base specification of a project that has not chosen the Domains extension
 * (s-zefk589ykh37b8u).
 */
export const isDomain = (part: string) => !["_guidelines", "contracts", "tech", "_archive", "base"].includes(part);

/**
 * The domains, each after every domain it uses and as close as possible before the first that uses
 * it: the domains nobody uses in the order of their names, each preceded by the domains it uses,
 * taken in the same way; the order of their names decides wherever the links leave a choice.
 */
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
  const seen = new Set<string>();
  const take = (d: string) => {
    if (seen.has(d)) return;
    seen.add(d);
    [...uses.get(d)!].sort().forEach(take);
    order.push(d);
  };
  const used = new Set([...uses.values()].flatMap((s) => [...s]));
  domains.filter((d) => !used.has(d)).forEach(take);
  domains.forEach(take); // what a cycle leaves, which the check of the specification refuses anyway
  return order;
}

/** What a node holds beside its wording: its place, status, links, metadata, owners, and what the reindex builds. */
/** The name earlier releases wrote for each kind they wrote otherwise, which a fingerprint keeps (s-v4qus7raqnwzneb). */
const EARLIER_KINDS: Record<string, string> = { TextRule: "rule", RecordType: "recordType", header: "domain" };

const NOT_WORDING = new Set(["location", "sid", "status", "refs", "meta", "children", "owner", "owners", "sections", "archived"]);

/** Puts a list's `jsonSchema` or `valueList`, where the list holds only one of the two, under `declaredIn`, the key under which earlier releases wrote them. */
function earlierList(list: unknown): unknown {
  if (!list || typeof list !== "object") return list;
  const { jsonSchema, valueList, ...rest } = list as Record<string, { file: string; pointer?: string; symbol?: string } | undefined>;
  if (jsonSchema && !valueList) return { ...rest, declaredIn: { file: jsonSchema.file, declaration: jsonSchema.pointer } };
  if (valueList && !jsonSchema) return { ...rest, declaredIn: { file: valueList.file, declaration: valueList.symbol } };
  return list;
}

/** A TableRule's groups without the cells that contain a node, since each such node has a fingerprint of its own. */
function textCells(groups: unknown): unknown {
  if (!Array.isArray(groups)) return groups;
  return groups.map((g: { rows?: Array<{ cells: Record<string, { node?: unknown }> }> }) => ({
    ...g,
    rows: (g.rows ?? []).map((r) => ({ ...r, cells: Object.fromEntries(Object.entries(r.cells).filter(([, c]) => !c.node)) })),
  }));
}

function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sorted((value as Record<string, unknown>)[k])]));
  }
  return value;
}

/**
 * The SHA-256 hash of a single canonical string of the node's wording (s-f5brvuuu6xmkj6t). The wording is every property except
 * the node's location, status, links, metadata and the nodes under it. The kind is part of it, except for a TextRule. For a
 * node in a cell, its place in the table is part of it too. A key or a kind that earlier releases wrote under another
 * name is hashed under the earlier name, for example the reason under `rationale`. So renaming a key or a kind changes no fingerprint
 * and no approval.
 */
export function fingerprint(node: SpecNode, cell?: CellPlace): string {
  const kept = Object.entries(node).filter(([k, v]) => !NOT_WORDING.has(k) && !(k === "kind" && (v === "TextRule" || v === "rule")));
  const wording: Record<string, unknown> = Object.fromEntries(kept.map(([k, v]) => {
    if (k === "reason") return ["rationale", v];
    if (k === "kind") return [k, EARLIER_KINDS[v as string] ?? v];
    if (k === "list") return [k, earlierList(v)];
    if (k === "groups") return [k, textCells(v)];
    return [k, v];
  }));
  if (cell) wording.cell = cell;
  return createHash("sha256").update(JSON.stringify(sorted(asEarlier(JSON.parse(JSON.stringify(wording)))))).digest("hex");
}

/**
 * A node's wording as earlier releases wrote it, used to compute the node's fingerprint (s-f5brvuuu6xmkj6t). The values gathered for a
 * field, in its `x-enumSource` or, as earlier releases wrote them, in a member of `fields`, are left out, since
 * `sheriff reindex` builds them. The kind of node that a field's values come from is named as earlier releases named it. A
 * field that takes the values that the domains add is kept as earlier releases wrote it, with an empty list of values of its own
 * (s-v4qus7raqnwzneb). In this function, `under` is the key that holds `value`, and `field` marks a member of `fields`.
 */
function asEarlier(value: unknown, under?: string): unknown {
  if (Array.isArray(value)) return value.map((v) => asEarlier(v, under === "fields" ? "field" : undefined));
  if (!value || typeof value !== "object") return value;
  let o = value as Record<string, unknown>;
  const { from, ...rest } = o;
  if (from === "kindSids" && typeof rest.kind === "string" && EARLIER_KINDS[rest.kind]) o = { ...rest, from, kind: EARLIER_KINDS[rest.kind] };
  else if (rest.is === "one of" && from === "domains" && !("values" in rest)) o = { ...rest, values: [] };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) {
    if (k === "gathered" && (under === "x-enumSource" || under === "field")) continue;
    out[k] = k === "kind" && under === "x-enumSource" && typeof v === "string" ? (EARLIER_KINDS[v] ?? v) : asEarlier(v, k);
  }
  return out;
}
