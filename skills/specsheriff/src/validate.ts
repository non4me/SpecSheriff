import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.ts";
import { everConfirmed, holds, readConfirmations } from "./confirmations.ts";
import { keysTwice } from "./json-text.ts";
import { addresses, citations, incoming, LEVELS_RULE, levelsOf, ownerOf, partOf } from "./model.ts";
import { headIndex, judgedHere } from "./reindex.ts";
import { loadSchema } from "./schema.ts";
import { canonical, specificationOf, specPaths, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface Finding {
  /** The file, and the node where there is one. */
  where: string;
  message: string;
}

export interface ValidateOptions {
  /** The directory holding the SpecSheriff guidelines the installed SpecSheriff tools carry. */
  guidelinesDir: string;
  /** The specification as the commit before this one holds it, for what the commit removes. */
  before?: Specification;
}

const REQUIRING = new Set(["rule", "record", "term"]);
const isBase = (path: string) => !["_guidelines", "tech"].includes(partOf(path).part);

export function validate(root: string, { guidelinesDir, before }: ValidateOptions): Finding[] {
  const findings: Finding[] = [];
  const config = loadConfig(root);
  const paths = specPaths(root);

  // Files read as text and against the schema; a file that does not read stops the checks of the nodes.
  const schema = loadSchema(root);
  const files: SpecFile[] = [];
  for (const path of [...paths, ...schemaPaths(root)]) {
    const text = readFileSync(join(root, path), "utf8");
    try {
      for (const k of keysTwice(text)) findings.push({ where: path, message: `"${k.key}" at ${k.path || "/"} is written twice, lines ${k.lines.join(", ")}` });
    } catch (error) {
      findings.push({ where: path, message: (error as Error).message });
      continue;
    }
    if (!paths.includes(path)) continue;
    const data = JSON.parse(text);
    for (const e of schema.check(data)) findings.push({ where: path, message: e });
    files.push({ path, data });
  }
  if (findings.length) return findings;

  const spec = specificationOf(files);
  const at = (sid: string) => {
    const n = spec.nodes.get(sid)!;
    return `${n.file.path}: ${sid} (${n.node.id})`;
  };
  const refuse = (sid: string, message: string) => findings.push({ where: at(sid), message });

  // Sids and ids held once, terms and records named once.
  const count = (values: Array<[string, string]>, what: (v: string) => string) => {
    const seen = new Map<string, string[]>();
    for (const [v, where] of values) seen.set(v, [...(seen.get(v) ?? []), where]);
    for (const [v, wheres] of seen) if (wheres.length > 1) findings.push({ where: wheres.join(", "), message: what(v) });
  };
  const all: Array<{ node: SpecNode; path: string }> = [];
  for (const f of [...spec.files, ...spec.archive]) walk(f.data.nodes, (node) => all.push({ node, path: f.path }));
  count(all.map(({ node, path }) => [node.sid, path]), (v) => `sid ${v} is held by more than one node`);
  const live = all.filter(({ path }) => !path.startsWith("specs/_archive/"));
  count(live.map(({ node, path }) => [node.id, path]), (v) => `id ${v} is held by more than one node`);
  count(live.filter(({ node }) => node.kind === "term").map(({ node, path }) => [node.title, path]), (v) => `term "${v}" is named by more than one term node`);
  count(live.filter(({ node }) => node.kind === "record").map(({ node, path }) => [node.title, path]), (v) => `record "${v}" is the name of more than one record node`);

  const ids = addresses(spec);
  for (const [sid, { node }] of spec.nodes) {
    if (ids.has(sid) && ids.get(sid) !== node.id) refuse(sid, `id ${node.id} is not the address its place gives, ${ids.get(sid)}`);
  }

  // Confirmations and the archive.
  const lines = readConfirmations(root);
  for (const [sid, { node, file }] of spec.nodes) {
    if (node.status === "checked" && judgedHere(file.path, config.writesSpecSheriffGuidelines) && !holds(spec, lines, sid)) {
      refuse(sid, `checked, but no confirmation by its owner ${ownerOf(spec, sid) ?? "(none named)"} holds its wording`);
    }
    if (node.archived) refuse(sid, "carries the reason of its removal, but is not in the archive");
  }
  const archived = new Map<string, { node: SpecNode; path: string }>();
  for (const f of spec.archive) {
    walk(f.data.nodes, (node) => {
      archived.set(node.sid, { node, path: f.path });
      if (!node.archived) findings.push({ where: `${f.path}: ${node.sid}`, message: "stands in the archive without the reason for its removal" });
      if (!everConfirmed(lines, node.sid)) findings.push({ where: `${f.path}: ${node.sid}`, message: "stands in the archive, but was never confirmed" });
    });
  }
  for (const [sid, was] of before?.nodes ?? []) {
    if (spec.nodes.has(sid) || !judgedHere(was.file.path, config.writesSpecSheriffGuidelines)) continue;
    if (everConfirmed(lines, sid) && !archived.has(sid)) {
      findings.push({ where: `${was.file.path}: ${sid} (${was.node.id})`, message: "removed after a confirmation was given for it, but not in the archive with the reason for its removal" });
    }
  }

  // Links and citations.
  const built = incoming(spec);
  const isTerm = (sid: string) => spec.nodes.get(sid)?.node.kind === "term";
  for (const [sid, { node }] of spec.nodes) {
    const out = node.refs.filter((r) => r.to);
    for (const r of out) {
      const named = spec.nodes.has(r.to!) || (r.type === "supersedes" && archived.has(r.to!));
      if (!named) refuse(sid, `its ${r.type} link to ${r.to} names no node`);
    }
    const cited = citations(node);
    for (const c of cited.sids) if (!out.some((r) => r.to === c)) refuse(sid, `cites ${c} but holds no link to it`);
    for (const a of cited.addresses) refuse(sid, `cites ${a} by its address, not its sid`);
    for (const r of out.filter((r) => r.type === "cites")) {
      if (!cited.sids.includes(r.to!)) refuse(sid, `holds a cites link to ${r.to} but does not cite it`);
      if (out.some((o) => o.to === r.to && o.type !== "cites")) refuse(sid, `holds a cites link to ${r.to} beside a link of another type to it`);
    }
    for (const r of out) {
      const twoTerms = isTerm(sid) && isTerm(r.to!);
      if ((r.type === "term-relation" || r.type === "uses") && !twoTerms) refuse(sid, `its ${r.type} link to ${r.to} does not bind two terms; settle it with the specification's owner`);
      if (r.type !== "term-relation" && r.type !== "uses" && twoTerms) refuse(sid, `a ${r.type} link binds two terms; settle it with the specification's owner`);
    }
    const key = (r: { type: string; from?: string; ratio?: string }) => `${r.type} ${r.from} ${r.ratio ?? ""}`;
    const stored = node.refs.filter((r) => r.from).map(key).sort();
    const want = (built.get(sid) ?? []).map(key).sort();
    if (stored.join("|") !== want.join("|")) refuse(sid, "its incoming links are not what the outgoing ones produce");
  }

  // Wording of checked nodes, and sections.
  for (const [sid, { node }] of spec.nodes) {
    if (node.status !== "checked") continue;
    for (const field of ["title", "text", "rationale"] as const) {
      const value = node[field];
      if (typeof value !== "string") continue;
      const bare = value.replace(/`[^`]*`/g, "").replace(/"[^"]*"|“[^”]*”/g, "");
      for (const m of bare.matchAll(/\b[A-Z][A-Z0-9-]*[A-Z0-9]\b(?:[ \t]+\b[A-Z][A-Z0-9-]*[A-Z0-9]\b)+/g)) {
        refuse(sid, `checked, but its ${field} sets "${m[0]}" in capitals`);
      }
    }
    if (node.kind === "section" && !holdsRule(node)) refuse(sid, "a checked section that holds no rule");
  }

  domains(spec, built, refuse, findings);
  variants(spec, refuse);
  appendices(spec, refuse);

  if (!config.writesSpecSheriffGuidelines) {
    for (const name of ["spec.json", "tools.json"]) {
      const path = `specs/_guidelines/${name}`;
      const ours = spec.files.find((f) => f.path === path);
      const theirs = join(guidelinesDir, name);
      if (!ours || !existsSync(theirs) || canonical(ours.data) !== canonical(JSON.parse(readFileSync(theirs, "utf8")))) {
        findings.push({ where: path, message: "does not hold the SpecSheriff guidelines the installed sheriff carries, file for file" });
      }
    }
  }
  return findings;
}

function schemaPaths(root: string): string[] {
  const dir = join(root, "specs", "_schema");
  return existsSync(dir) ? ["node.schema.json", "section-file.schema.json"].filter((n) => existsSync(join(dir, n))).map((n) => `specs/_schema/${n}`) : [];
}

function walk(nodes: SpecNode[] | undefined, visit: (n: SpecNode) => void): void {
  for (const n of nodes ?? []) visit(n), walk(n.children, visit);
}

function holdsRule(section: SpecNode): boolean {
  return (section.children ?? []).some((c) => REQUIRING.has(c.kind) || (c.kind === "section" && holdsRule(c)));
}

type Refuse = (sid: string, message: string) => void;

function domains(spec: Specification, built: ReturnType<typeof incoming>, refuse: Refuse, findings: Finding[]): void {
  const parts = new Map<string, { head?: SpecNode; sections: SpecNode[] }>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isBase(f.path) || part === "contracts") continue;
    if (!parts.has(part)) parts.set(part, { sections: [] });
    const entry = parts.get(part)!;
    for (const n of f.data.nodes) {
      if (n.kind === "domain") (entry.head = n), entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
      else if (n.kind === "section") entry.sections.push(n);
    }
  }
  const levels = levelsOf(spec);
  const domainOf = new Map<string, string>();
  for (const [part, { sections }] of parts) for (const s of sections) walk([s], (n) => domainOf.set(n.sid, part));
  const uses = new Map<string, Set<string>>();
  for (const [part, { head, sections }] of parts) {
    if (!head) {
      findings.push({ where: `specs/${part}/`, message: `domain ${part} has no head` });
      continue;
    }
    domainOf.set(head.sid, part);
    if (JSON.stringify(head.sections) !== JSON.stringify(headIndex(spec, sections, built))) {
      refuse(head.sid, "the index in its head is not what the domain's sections produce");
    }
    const level = head.level as string;
    if (!levels?.includes(level)) refuse(head.sid, `level "${level}" is not listed in the project's own guidelines`);
  }
  for (const [sid, { node }] of spec.nodes) {
    for (const r of node.refs.filter((r) => r.type === "consumes" && r.to)) {
      const from = node.kind === "domain" ? domainOf.get(sid) : undefined;
      const to = spec.nodes.get(r.to!)?.node.kind === "section" ? domainOf.get(r.to!) : undefined;
      if (!from || !to || from === to) {
        refuse(sid, "a consumes link must go from a domain's head to a section of another domain");
        continue;
      }
      if (!uses.has(from)) uses.set(from, new Set());
      uses.get(from)!.add(to);
    }
  }
  const cycle = findCycle(uses);
  if (cycle) findings.push({ where: "specs/", message: `the domains use one another in a cycle: ${cycle.join(" → ")}` });
}

function findCycle(uses: Map<string, Set<string>>): string[] | null {
  const state = new Map<string, "open" | "done">();
  const path: string[] = [];
  const visit = (d: string): string[] | null => {
    if (state.get(d) === "done") return null;
    if (state.get(d) === "open") return [...path.slice(path.indexOf(d)), d];
    state.set(d, "open");
    path.push(d);
    for (const next of [...(uses.get(d) ?? [])].sort()) {
      const found = visit(next);
      if (found) return found;
    }
    path.pop();
    state.set(d, "done");
    return null;
  };
  for (const d of [...uses.keys()].sort()) {
    const found = visit(d);
    if (found) return found;
  }
  return null;
}

type Field = { name: string; type: { is: string; values?: string[] } };

function variants(spec: Specification, refuse: Refuse): void {
  const record = (sid: string | undefined) => (sid ? spec.nodes.get(sid)?.node : undefined);
  const refined = (n: SpecNode) => record(n.refs.find((r) => r.type === "refines" && record(r.to)?.kind === "record")?.to);
  const fieldsUpChain = (n: SpecNode | undefined): Field[] => (n ? [...((n.fields as Field[]) ?? []), ...fieldsUpChain(refined(n))] : []);
  const answers = new Map<string, string[]>();
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "record" || !node.answersTo) continue;
    const parent = refined(node);
    if (!parent) {
      refuse(sid, "a record variant that refines no record");
      continue;
    }
    let chooser: SpecNode | undefined = parent;
    while (chooser && !chooser.chosenBy) chooser = refined(chooser);
    const chosenBy = (chooser?.chosenBy as string[]) ?? [];
    const answersTo = node.answersTo as Record<string, string>;
    if (JSON.stringify(Object.keys(answersTo).sort()) !== JSON.stringify([...chosenBy].sort())) {
      refuse(sid, `answers to ${Object.keys(answersTo).join(", ")}, not to the fields its record names as choosing it, ${chosenBy.join(", ") || "none"}`);
    }
    const inherited = fieldsUpChain(parent);
    for (const [name, value] of Object.entries(answersTo)) {
      const field = inherited.find((f) => f.name === name);
      if (field?.type.is === "one of" && !field.type.values!.includes(value)) refuse(sid, `answers to "${value}" for ${name}, which is not declared among its values`);
    }
    const own = ((node.fields as Field[]) ?? []).filter((f) => !inherited.some((i) => i.name === f.name));
    if (own.length === 0) refuse(sid, "a record variant that declares no field of its own");
    const key = `${chooser?.sid} ${JSON.stringify(Object.entries(answersTo).sort())}`;
    answers.set(key, [...(answers.get(key) ?? []), sid]);
  }
  for (const sids of answers.values()) if (sids.length > 1) for (const sid of sids) refuse(sid, "answers to values another variant of its record answers to");
}

function appendices(spec: Specification, refuse: Refuse): void {
  const linksTo = (n: SpecNode, types: string[], ok: (path: string) => boolean) =>
    n.refs.some((r) => r.to && types.includes(r.type) && spec.nodes.has(r.to) && ok(spec.nodes.get(r.to)!.file.path));
  for (const [sid, { node, file }] of spec.nodes) {
    const { part, file: name, specSheriffGuidelines } = partOf(file.path);
    if (node.kind === "section") continue;
    if (part === "tech" && name === "debt") {
      if (!linksTo(node, ["refines"], isBase)) refuse(sid, "a rule of the technical debt that refines no node of the base");
    } else if (part === "tech" && name !== "stack") {
      if (!linksTo(node, ["implements"], isBase)) refuse(sid, "a node of the technical appendix that implements no node of the base");
    } else if (part === "_guidelines" && name === "tools") {
      if (!linksTo(node, ["implements"], (p) => p === "specs/_guidelines/spec.json")) refuse(sid, "a rule of the appendix of the tools that implements no node of the base of the guidelines");
    } else if (part === "_guidelines" && !specSheriffGuidelines) {
      if (!linksTo(node, ["refines", "implements"], (p) => partOf(p).specSheriffGuidelines) && !node.refs.some((r) => r.type === "refines" && r.to === LEVELS_RULE)) {
        refuse(sid, "a rule of the project's own guidelines that neither refines nor implements a rule of the SpecSheriff guidelines");
      }
    }
  }
}
