import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadConfig, type Config } from "./config.ts";
import { everConfirmed, holds, readConfirmations } from "./confirmations.ts";
import { keysTwice } from "./json-text.ts";
import { BASE_KINDS, citations, isProjectKind, locations, modelOf, incoming, isDomain, LEVELS_RULE, levelsOf, ownerOf, partOf, PROJECT } from "./model.ts";
import { headerIndex, judgedHere } from "./reindex.ts";
import { EXTENSION, loadSchema, readExtension, SCHEMA_FILES } from "./schema.ts";
import { fieldKey, gather } from "./values.ts";
import { specPaths, withTaken, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface Finding {
  /** The file, and the node where there is one. */
  where: string;
  message: string;
  /** Reported rather than refused. */
  reported?: true;
}

export interface ValidateOptions {
  /** The specification as the commit before this one holds it, for what the commit removes. */
  before?: Specification;
}

/** Every kind but a section and a domain's header requires something, a project's own kinds included (s-vsh384ybt4w25a2). */
const REQUIRING = { has: (kind: string) => kind !== "section" && kind !== "domain" };
const isBase = (path: string) => !["_guidelines", "tech"].includes(partOf(path).part);

export function validate(root: string, { before }: ValidateOptions = {}): Finding[] {
  const findings: Finding[] = [];
  const config = loadConfig(root);
  const paths = specPaths(root);

  // A project taking the SpecSheriff guidelines holds no copy of them or of their schema.
  if (!config.writesSpecSheriffGuidelines) {
    const schemaDir = join(root, "specs", "_schema");
    const schemaFiles = existsSync(schemaDir)
      ? readdirSync(schemaDir, { recursive: true, encoding: "utf8" }).filter((p) => statSync(join(schemaDir, p)).isFile()).map((p) => `specs/_schema/${p.replaceAll("\\", "/")}`).filter((p) => p !== EXTENSION)
      : [];
    for (const path of [...paths.filter((p) => partOf(p).specSheriffGuidelines), ...schemaFiles]) {
      findings.push({ where: path, message: "a copy of the SpecSheriff guidelines or of their schema, which a project reads from the SpecSheriff tools" });
    }
    if (findings.length) return findings;
  }

  // Files read as text and against the schema; a file that does not read stops the checks of the nodes.
  const schema = loadSchema(root);
  for (const e of schema.extension) findings.push({ where: EXTENSION, message: e });
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

  const spec = withTaken(root, files);
  const at = (sid: string) => {
    const n = spec.nodes.get(sid)!;
    return `${n.file.path}: ${sid} (${n.node.location})`;
  };
  const refuse = (sid: string, message: string) => findings.push({ where: at(sid), message });

  // Sids and locations held once, terms and RecordTypes named once.
  const count = (values: Array<[string, string]>, what: (v: string) => string) => {
    const seen = new Map<string, string[]>();
    for (const [v, where] of values) seen.set(v, [...(seen.get(v) ?? []), where]);
    for (const [v, wheres] of seen) if (wheres.length > 1) findings.push({ where: wheres.join(", "), message: what(v) });
  };
  const all: Array<{ node: SpecNode; path: string }> = [];
  for (const f of [...spec.files, ...spec.archive]) walk(f.data.nodes, (node) => all.push({ node, path: f.path }));
  count(all.map(({ node, path }) => [node.sid, path]), (v) => `sid ${v} is held by more than one node`);
  const live = all.filter(({ path }) => !path.startsWith("specs/_archive/"));
  count(live.map(({ node, path }) => [node.location, path]), (v) => `location ${v} is held by more than one node`);
  count(live.filter(({ node }) => node.kind === "term").map(({ node, path }) => [node.title.toLowerCase(), path]), (v) => `term "${v}" is named by more than one term node`);
  count(live.filter(({ node }) => node.kind === "recordType").map(({ node, path }) => [node.title.toLowerCase(), path]), (v) => `RecordType "${v}" is the name of more than one RecordType`);
  for (const { node, path } of live) if (node.kind === "term" && partOf(path).part !== "contracts") refuse(node.sid, "a term node outside contracts, where alone a term is declared");

  const ids = locations(spec);
  for (const [sid, { node }] of spec.nodes) {
    if (ids.has(sid) && ids.get(sid) !== node.location) refuse(sid, `location ${node.location} is not the one its place gives, ${ids.get(sid)}`);
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
      if (node.refs?.some((r) => r.from)) findings.push({ where: `${f.path}: ${node.sid}`, message: "stands in the archive holding a link pointing at it" });
      if (!everConfirmed(lines, node.sid)) findings.push({ where: `${f.path}: ${node.sid}`, message: "stands in the archive, but was never confirmed" });
    });
  }
  for (const [sid, was] of before?.nodes ?? []) {
    if (spec.nodes.has(sid) || !judgedHere(was.file.path, config.writesSpecSheriffGuidelines)) continue;
    if (everConfirmed(lines, sid) && !archived.has(sid)) {
      findings.push({ where: `${was.file.path}: ${sid} (${was.node.location})`, message: "removed after a confirmation was given for it, but not in the archive with the reason for its removal" });
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
    for (const a of cited.locations) refuse(sid, `cites ${a} by its location, not its sid`);
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
    for (const field of ["title", "text", "reason"] as const) {
      const value = node[field];
      if (typeof value !== "string") continue;
      const bare = value.replace(/`[^`]*`/g, "").replace(/"[^"]*"|“[^”]*”/g, "");
      // A word in capitals of any script, two characters or more; three or more of them running.
      const word = String.raw`(?<![\p{L}\p{N}_])\p{Lu}[\p{Lu}\p{N}-]*[\p{Lu}\p{N}](?![\p{L}\p{N}_])`;
      for (const m of bare.matchAll(new RegExp(`${word}(?:[ \\t]+${word}){2,}`, "gu"))) {
        refuse(sid, `checked, but its ${field} sets "${m[0]}" in capitals`);
      }
    }
    if (node.kind === "section" && !holdsRule(node)) refuse(sid, "a checked section that holds no rule");
  }

  domains(spec, built, refuse, findings);
  objectsInLists(spec, refuse);
  variants(spec, refuse, new Set([...BASE_KINDS, ...Object.keys(readExtension(root)?.kinds ?? {})]));
  appendices(spec, refuse);
  findings.push(...projectChecks(root, config, spec));
  return findings;
}

/**
 * Runs each check a project's own guidelines add (s-2fau85dfyyeq66m) by the command the settings name, in the directory
 * the other checks read, the model on its standard input. An exit status other than zero refuses, or is reported where
 * the rule listing the check says so; what it printed is shown with it.
 */
function projectChecks(root: string, config: Config, spec: Specification): Finding[] {
  const found: Finding[] = [];
  if (!config.checks.length) return found;
  const model = JSON.stringify(modelOf(spec));
  for (const check of config.checks) {
    const where = `check "${check.name}"`;
    const list = spec.nodes.get(check.rule)?.node.list as { members?: unknown[]; property?: string } | undefined;
    const member = list?.members?.find((m) => Boolean(m) && typeof m === "object" && (m as Record<string, unknown>)[list.property ?? "name"] === check.name) as Record<string, unknown> | undefined;
    if (!member) {
      found.push({ where, message: `the settings name a check the rule ${check.rule} does not list` });
      continue;
    }
    const run = spawnSync(check.command, { cwd: root, input: model, shell: true, encoding: "utf8", maxBuffer: 1 << 26 });
    if (run.status === 0) continue;
    const output = `${run.stdout ?? ""}${run.stderr ?? ""}`.trim();
    found.push({ where, message: output || `ended with exit status ${run.status}`, ...(member.onFailure === "reported" ? { reported: true as const } : {}) });
  }
  return found;
}

function schemaPaths(root: string): string[] {
  const dir = join(root, "specs", "_schema");
  return existsSync(dir) ? [...SCHEMA_FILES, "project.schema.json"].filter((n) => existsSync(join(dir, n))).map((n) => `specs/_schema/${n}`) : [];
}

function walk(nodes: SpecNode[] | undefined, visit: (n: SpecNode) => void): void {
  for (const n of nodes ?? []) visit(n), walk(n.children, visit);
}

function holdsRule(section: SpecNode): boolean {
  return (section.children ?? []).some((c) => REQUIRING.has(c.kind) || (c.kind === "section" && holdsRule(c)));
}

type Refuse = (sid: string, message: string) => void;

function domains(spec: Specification, built: ReturnType<typeof incoming>, refuse: Refuse, findings: Finding[]): void {
  const parts = new Map<string, { header?: SpecNode; sections: SpecNode[] }>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (!isBase(f.path) || part === "contracts") continue;
    if (!parts.has(part)) parts.set(part, { sections: [] });
    const entry = parts.get(part)!;
    for (const n of f.data.nodes) {
      if (n.kind === "domain") (entry.header = n), entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
      else if (n.kind === "section") entry.sections.push(n);
    }
  }
  const levels = levelsOf(spec);
  const domainOf = new Map<string, string>();
  for (const [part, { sections }] of parts) for (const s of sections) walk([s], (n) => domainOf.set(n.sid, part));
  const uses = new Map<string, Set<string>>();
  for (const [part, { header, sections }] of parts) {
    if (!header) {
      findings.push({ where: `specs/${part}/`, message: `domain ${part} has no header` });
      continue;
    }
    domainOf.set(header.sid, part);
    if (JSON.stringify(header.sections) !== JSON.stringify(headerIndex(spec, sections, built))) {
      refuse(header.sid, "the index in its header is not what the domain's sections produce");
    }
    const level = header.level as string;
    if (!levels?.includes(level)) refuse(header.sid, `level "${level}" is not listed in the project's own guidelines`);
  }
  for (const [sid, { node, file }] of spec.nodes) {
    for (const r of node.refs.filter((r) => r.type === "exempts" && r.to)) {
      const target = spec.nodes.get(r.to!)?.node.kind;
      if (file.path !== PROJECT || !target || (target !== "rule" && target !== "section" && !isProjectKind(target))) {
        refuse(sid, "an exempts link must go from a node of the project's own guidelines to a rule, a node of a project's own kind or a section");
      }
    }
    for (const r of node.refs.filter((r) => r.type === "consumes" && r.to)) {
      const from = node.kind === "domain" ? domainOf.get(sid) : undefined;
      const to = spec.nodes.get(r.to!)?.node.kind === "section" ? domainOf.get(r.to!) : undefined;
      if (!from || !to || from === to) {
        refuse(sid, "a consumes link must go from a domain's header to a section of another domain");
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

type NeutralType = { is: string; values?: string[]; from?: string; kind?: string; fields?: Field[]; of?: NeutralType; record?: string };
type Field = { name: string; type: NeutralType; gathered?: Array<{ value: string; sid: string }> };

/** Each member of a list that is an object holds the property the list names (s-v7vd4ydrwexsgsj). */
function objectsInLists(spec: Specification, refuse: Refuse): void {
  for (const [sid, { node }] of spec.nodes) {
    const list = node.list as { members?: unknown[]; property?: string } | undefined;
    (list?.members ?? []).forEach((m, i) => {
      if (!m || typeof m !== "object" || Array.isArray(m)) return;
      if (!list!.property) refuse(sid, `member ${i + 1} of its list is an object, and the list names no property holding its value`);
      else if (!(list!.property in m)) refuse(sid, `member ${i + 1} of its list lacks the property "${list!.property}" the list names`);
    });
  }
}

function variants(spec: Specification, refuse: Refuse, kinds: Set<string>): void {
  const record = (sid: string | undefined) => (sid ? spec.nodes.get(sid)?.node : undefined);
  const refined = (n: SpecNode) => record(n.refs.find((r) => r.type === "refines" && record(r.to)?.kind === "recordType")?.to);
  const chain = (n: SpecNode | undefined): SpecNode[] => (n ? [n, ...chain(refined(n))] : []);
  // A RecordType's fields, the fields every variant holds in its field of type variant included.
  const fieldsOf = (n: SpecNode) => ((n.fields as Field[]) ?? []).flatMap((f) => [f, ...(f.type.is === "variant" ? (f.type.fields ?? []) : [])]);
  const fieldsUpChain = (n: SpecNode | undefined): Field[] => chain(n).flatMap(fieldsOf);
  const holding = (n: SpecNode | undefined, name: string): SpecNode | undefined =>
    !n || ((n.fields as Field[]) ?? []).some((f) => f.name === name) ? n : holding(refined(n), name);
  const part = (n: SpecNode) => partOf(spec.nodes.get(n.sid)!.file.path).part;

  // Where each value of a field choosing a variant is declared: its own list, then the lists rules of
  // domains define for it, each list found by its rule's refines link to a RecordType of contracts.
  const declared = new Map<string, Map<string, SpecNode[]>>();
  const declare = (holder: SpecNode, name: string, value: string, by: SpecNode) => {
    const key = `${holder.sid} ${name}`;
    if (!declared.has(key)) declared.set(key, new Map());
    declared.get(key)!.set(value, [...(declared.get(key)!.get(value) ?? []), by]);
  };
  // Each value comes from the field's one source: its own list, or the values gathered for it (s-xfu2gpzddjnmgks).
  const gathered = gather(spec);
  for (const [, { node }] of spec.nodes) {
    if (node.kind !== "recordType") continue;
    for (const f of (node.fields as Field[]) ?? []) {
      if (f.type.is !== "one of") continue;
      if (f.type.from) for (const g of gathered.get(fieldKey(node, f.name)) ?? []) declare(node, f.name, g.value, spec.nodes.get(g.sid)?.node ?? node);
      else for (const v of f.type.values ?? []) declare(node, f.name, v, node);
    }
    const variantFields = chain(node).flatMap((n) => ((n.fields as Field[]) ?? []).filter((f) => f.type.is === "variant"));
    if (variantFields.length > 1) refuse(node.sid, `holds two fields of type variant, its inherited ones counted: ${variantFields.map((f) => f.name).join(", ")}`);
  }
  for (const [sid, { node }] of spec.nodes) {
    const list = node.list as { field?: string; members: string[] } | undefined;
    if (!list?.field) continue;
    const target = record(node.refs.find((r) => r.type === "refines" && record(r.to)?.kind === "recordType")?.to);
    if (!isDomain(part(node))) refuse(sid, `a list of the values of ${list.field} standing in ${part(node)}, not in a domain`);
    if (!target || part(target) !== "contracts") {
      refuse(sid, `a list of the values of ${list.field} that refines no RecordType described in contracts`);
      continue;
    }
    const holder = holding(target, list.field);
    const field = ((holder?.fields as Field[]) ?? []).find((f) => f.name === list.field);
    if (!holder || field?.type.is !== "one of" || field.type.from !== "domains") refuse(sid, `declares values of ${list.field}, whose values the domains do not add`);
  }
  for (const values of declared.values()) {
    for (const [value, by] of values) if (by.length > 1) for (const n of by) refuse(n.sid, `"${value}" is declared more than once: ${by.map((b) => b.sid).join(", ")}`);
  }
  // A field of type one of holds at least one value: a RecordType's own field in its list or in a
  // domain's list for it, one standing inside another type in its own list.
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "recordType") continue;
    const empty = (name: string, type: NeutralType, own: boolean) => {
      if (type.is === "one of" && !(own ? declared.get(`${sid} ${name}`)?.size : type.values?.length)) refuse(sid, `${name} is of type one of with no value, in its own list or in a list of a domain`);
      if (type.of) empty(name, type.of, false);
      for (const f of type.fields ?? []) empty(f.name, f.type, false);
    };
    for (const f of (node.fields as Field[]) ?? []) empty(f.name, f.type, true);
  }

  // The values gathered beside each field are what its source produces, and a kind it names is one the schema holds.
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "recordType") continue;
    for (const f of fieldsOf(node)) {
      if (f.type.is !== "one of") continue;
      if (f.type.from === "kindSids" && !kinds.has(f.type.kind ?? "")) refuse(sid, `${f.name} names the kind ${f.type.kind}, which the schema does not hold`);
      const want = f.type.from ? (gathered.get(fieldKey(node, f.name)) ?? []) : undefined;
      if (JSON.stringify(f.gathered) !== JSON.stringify(want)) refuse(sid, `the values gathered beside ${f.name} are not what their source produces; sheriff reindex writes them`);
    }
  }

  const answers = new Map<string, string[]>();
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "recordType" || !node.answersTo) continue;
    const parent = refined(node);
    if (!parent) {
      refuse(sid, "a RecordType variant that refines no RecordType");
      continue;
    }
    let chooser: SpecNode | undefined = parent;
    while (chooser && !chooser.chosenBy) chooser = refined(chooser);
    const chosenBy = (chooser?.chosenBy as string[]) ?? [];
    const answersTo = node.answersTo as Record<string, string>;
    if (JSON.stringify(Object.keys(answersTo).sort()) !== JSON.stringify([...chosenBy].sort())) {
      refuse(sid, `answers to ${Object.keys(answersTo).join(", ")}, not to the fields its RecordType names as choosing it, ${chosenBy.join(", ") || "none"}`);
    }
    const inherited = fieldsUpChain(parent);
    // A value is declared in its choosing field's own list or in a domain's list for it, and the
    // variant stands in the part of the node declaring it.
    for (const [name, value] of Object.entries(answersTo)) {
      const holder = holding(parent, name);
      const field = ((holder?.fields as Field[]) ?? []).find((f) => f.name === name);
      const by = holder ? declared.get(`${holder.sid} ${name}`)?.get(value) : undefined;
      if (field?.type.is !== "one of") refuse(sid, `answers to "${value}" for ${name}, a field with no list of values to declare it in`);
      else if (!by?.length) refuse(sid, `answers to "${value}" for ${name}, which is not declared among its values`);
      else if (by.length === 1 && part(node) !== part(by[0]!)) refuse(sid, `stands in ${part(node)}, while the value "${value}" it answers to for ${name} is declared in ${part(by[0]!)}`);
    }
    const own = ((node.fields as Field[]) ?? []).filter((f) => !inherited.some((i) => i.name === f.name));
    if (own.length === 0) refuse(sid, "a RecordType variant that declares no field of its own");
    const key = `${chooser?.sid} ${JSON.stringify(Object.entries(answersTo).sort())}`;
    answers.set(key, [...(answers.get(key) ?? []), sid]);
  }
  for (const sids of answers.values()) if (sids.length > 1) for (const sid of sids) refuse(sid, "answers to values another variant of its record answers to");

  // An identifier takes the type of the field identifying the RecordType it names, so that field,
  // followed from one identifier to the next, ends in a field of another type.
  const identifying = (n: SpecNode) => fieldsUpChain(n).find((f) => f.name === n.identifiedBy);
  for (const [sid, { node }] of spec.nodes) {
    if (node.kind !== "recordType") continue;
    const by = node.identifiedBy as string | undefined;
    if (by && !fieldsUpChain(node).some((f) => f.name === by)) refuse(sid, `identified by ${by}, which is none of its fields`);
    const visit = (field: string, type: NeutralType) => {
      if (type.is === "identifier of") {
        const named = record(type.record);
        if (!named?.identifiedBy) refuse(sid, `${field} is an identifier of ${type.record}, which names no field identifying it`);
        const passed = named ? [named.sid] : [];
        for (let at = named && identifying(named); at?.type.is === "identifier of"; ) {
          const next = record(at.type.record);
          if (!next) break;
          if (passed.includes(next.sid)) {
            refuse(sid, `${field} leads, from one identifying field to the next, back to ${next.sid}`);
            break;
          }
          passed.push(next.sid);
          at = identifying(next);
        }
      }
      if (type.of) visit(field, type.of);
      for (const f of type.fields ?? []) visit(f.name, f.type);
    };
    for (const f of (node.fields as Field[]) ?? []) visit(f.name, f.type);
  }
}

function appendices(spec: Specification, refuse: Refuse): void {
  const linksTo = (n: SpecNode, types: string[], ok: (path: string) => boolean) =>
    n.refs.some((r) => r.to && types.includes(r.type) && spec.nodes.has(r.to) && ok(spec.nodes.get(r.to)!.file.path));
  // A section of the technical appendix stands under the name of the domain it implements.
  const domains = new Set(spec.files.map((f) => partOf(f.path).part).filter(isDomain));
  for (const f of spec.files) {
    const { part, file: name } = partOf(f.path);
    if (part !== "tech" || name === "stack" || name === "debt" || domains.has(name)) continue;
    for (const top of f.data.nodes) refuse(top.sid, `a section of the technical appendix stands under the name ${name}, which no domain has`);
  }
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
