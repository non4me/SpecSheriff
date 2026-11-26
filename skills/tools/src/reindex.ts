import { randomInt } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { readCode } from "./code.ts";
import { loadConfig, ownerSettings, readsAs, strictDefault } from "./config.ts";
import { trackedFiles } from "./diff.ts";
import { migrateApprovals, readApprovals, stands } from "./approvals.ts";
import { mergeKeys, type KeyTwice } from "./json-text.ts";
import { APPROVAL_RULE, builtStatuses, fingerprint, incoming, isContainer, locations, partOf, PROJECT, SID, statusNow, TESTS_PASS_RULE, testsRunRule } from "./model.ts";
import { EXTENSION, isArchive, missingExtensions, schemaRefusals, type Extension } from "./schema.ts";
import { fieldKey, gather, schemasWithin, sourcedFields } from "./values.ts";
import { boundLists, readBound } from "./lists.ts";
import { canonical, cellNodes, specPaths, withTaken, writesGuidelines, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface ReindexReport {
  /** Every key whose values were merged, with the file it is in. */
  merged: Array<KeyTwice & { file: string }>;
  /** The sids of the nodes, sections and domains' headers left out, the reindex made a draft. */
  drafted: string[];
  /** The files written, because something in them changed. */
  written: string[];
  /** The sids of the draft rules added to the project's own guidelines: rules that the SpecSheriff tools read only after they are approved. */
  added: string[];
  /** The files of the specification rewritten because an earlier release wrote them differently (s-gb8s9657a65hqmv). */
  rewritten: string[];
}

/**
 * An earlier release recorded the specification's approval through a rule of `project.json`. Where `sheriff.config.json`
 * holds no entry for the approval status, this function replaces that rule with an entry (s-gb8s9657a65hqmv). If that rule
 * is approved, the entry names the owner who last approved it, and the rule is moved to the archive. If that rule is a draft,
 * it is moved to the archive if it has ever been approved, and is deleted otherwise. If the rule is removed and no rule of
 * `project.json` refines the rule on when the tests must pass, the draft rule on when the tests run is added, and the
 * function returns true.
 */
function replaceApprovingRule(root: string, files: SpecFile[], report: ReindexReport): boolean {
  const project = files.find((f) => f.path === PROJECT);
  const settingsPath = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(settingsPath, "utf8")) as Record<string, unknown>;
  if (!project || (Array.isArray(settings.approvalStatus) && settings.approvalStatus.length)) return false;
  const removed: SpecNode[] = [];
  const refining = (n: SpecNode, to: string) => n.refs?.some((r) => r.type === "refines" && r.to === to);
  const strip = (ns: SpecNode[]): SpecNode[] =>
    ns.filter((n) => {
      if (refining(n, APPROVAL_RULE)) return removed.push(n), false;
      if (n.children) n.children = strip(n.children);
      return true;
    });
  project.data.nodes = strip(project.data.nodes ?? []);
  if (!removed.length) return false;
  const lines = readApprovals(root);
  const archivePath = "specs/_archive/guidelines.json";
  const archive = () => {
    let f = files.find((x) => x.path === archivePath);
    if (!f) files.push((f = { path: archivePath, data: { schemaVersion: 1, scope: "_guidelines", section: "guidelines", nodes: [] } }));
    return f;
  };
  const date = new Date().toISOString().slice(0, 10);
  for (const rule of removed) {
    const approvals = lines.filter((l) => l.sid === rule.sid && !l.withdrawn);
    const { sid: _, refs, ...rest } = rule;
    const entry = (reason: string) => archive().data.nodes.push({ ...rest, refs: (refs ?? []).filter((r) => !r.from), archived: { date, reason } } as unknown as SpecNode);
    if (statusNow(rule.status) === "approved" && approvals.length) {
      settings.approvalStatus = [{ status: "approved", by: approvals.at(-1)!.by }];
      entry("Replaced by the entry in `sheriff.config.json` that records the specification's approval status");
    } else if (approvals.length) entry("The specification's approval status is recorded in `sheriff.config.json`");
  }
  if (settings.approvalStatus) {
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
    report.written.push("sheriff.config.json");
  }
  const all: SpecNode[] = [];
  const walk = (ns: SpecNode[] = []) => ns.forEach((n) => (all.push(n), walk(n.children)));
  walk(project.data.nodes);
  const top = project.data.nodes[0];
  if (!top || all.some((n) => refining(n, TESTS_PASS_RULE))) return false;
  top.children = [...(top.children ?? []), { location: "", ...testsRunRule() } as SpecNode];
  return true;
}

/** The sid of the draft rule on when the tests run, which `sheriff reindex` added to the project's own guidelines. */
function addedTestsRule(files: SpecFile[]): string[] {
  const top = files.find((f) => f.path === PROJECT)?.data.nodes[0];
  return (top?.children ?? []).filter((n) => n.title === "When the tests run" && n.refs?.some((r) => r.type === "refines" && r.to === TESTS_PASS_RULE)).map((n) => n.sid).slice(-1);
}

const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export function newSid(taken: Set<string>): string {
  for (;;) {
    let sid = "s-";
    for (let i = 0; i < 15; i++) sid += ALPHABET[randomInt(ALPHABET.length)];
    if (!taken.has(sid)) return taken.add(sid), sid;
  }
}

/** The keys earlier releases of the tools wrote under another name, each with its name now. */
const RENAMED_KEYS: Record<string, string> = { id: "location", rationale: "reason" };
/** The kinds earlier releases wrote under another name. */
const RENAMED_KINDS: Record<string, string> = { record: "RecordType", recordType: "RecordType", rule: "TextRule", domain: "header" };

/** A field of a RecordType, and the neutral type of a field, as earlier releases wrote them. */
type EarlierType = { is: string; values?: string[]; from?: string; kind?: string; of?: EarlierType; record?: string } & Record<string, unknown>;
type EarlierField = { name: string; type: EarlierType; required: unknown; text?: string };

/** The bounds that earlier releases allowed on a number and on a list, each kept under the same name in JSON Schema. */
const NUMBER_BOUNDS = ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"];
const LIST_BOUNDS = ["minItems", "maxItems"];

/**
 * The JSON Schema of a neutral type that an earlier release wrote (s-gb8s9657a65hqmv), as the table of s-4npdup7mjkva69y
 * gives it. It is null for the type of a field that has no such form: a field of type `variant`, a field whose values the
 * domains add, and a field whose own list of values is empty.
 */
function neutralSchema(t: EarlierType | undefined): Record<string, unknown> | null {
  if (!t || typeof t !== "object") return null;
  const bounds = (keys: string[]) => Object.fromEntries(keys.filter((k) => k in t).map((k) => [k, t[k]]));
  switch (t.is) {
    case "text":
      return { type: "string" };
    case "email address":
      return { type: "string", format: "email" };
    case "instant":
      return { type: "string", format: "date-time" };
    case "date":
      return { type: "string", format: "date" };
    case "duration":
      return { type: "string", format: "duration" };
    case "whole number":
      return { type: "integer", ...bounds(NUMBER_BOUNDS) };
    case "number":
      return { type: "number", ...bounds(NUMBER_BOUNDS) };
    case "yes/no":
      return { type: "boolean" };
    case "any value":
      return {};
    case "record":
      return { $ref: `#${t.record}` };
    case "identifier of":
      return { identifierOf: t.record };
    case "one of":
      if (Array.isArray(t.values) && t.values.length) return { enum: t.values };
      if (t.from === "domainNames") return { enumSource: { from: "parts" } };
      if (t.from === "kindSids" && typeof t.kind === "string") return { enumSource: { from: "kind", kind: RENAMED_KINDS[t.kind] ?? t.kind } };
      return null;
    case "list of": {
      const of = neutralSchema(t.of);
      return of && { type: "array", items: of, ...bounds(LIST_BOUNDS) };
    }
    case "map of": {
      const of = neutralSchema(t.of);
      return of && { type: "object", additionalProperties: of };
    }
    default:
      return null;
  }
}

/**
 * The list as this release writes it, with each key kept in the position it had (s-gb8s9657a65hqmv). Earlier releases recorded,
 * in `declaredIn` under the key `declaration`, where a list is declared. Such a `declaredIn` is:
 * - removed, where it points to the field `kinds` of the project's extension of the schema;
 * - replaced by a `jsonSchema` entry with the key `pointer`, where the file that it names is a JSON file;
 * - replaced by a `valueList` entry with the key `symbol`, where it names a declaration in code.
 * In a `jsonSchema` or a `valueList` that an earlier release wrote, the key `declaration` becomes `pointer` or `symbol` respectively.
 */
function rewrittenList(list: Record<string, unknown>): Record<string, unknown> {
  const isObject = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === "object" && !Array.isArray(v);
  const renamed = (v: Record<string, unknown>, to: string) => Object.fromEntries(Object.entries(v).map(([k, x]) => [k === "declaration" ? to : k, x]));
  return Object.fromEntries(
    Object.entries(list).flatMap(([k, v]): Array<[string, unknown]> => {
      if (k === "declaredIn" && isObject(v)) {
        if (v.file === EXTENSION && typeof v.declaration === "string" && /^#?\/kinds$/.test(v.declaration)) return [];
        return String(v.file).endsWith(".json") ? [["jsonSchema", renamed(v, "pointer")]] : [["valueList", renamed(v, "symbol")]];
      }
      if (k === "jsonSchema" && isObject(v)) return [[k, renamed(v, "pointer")]];
      if (k === "valueList" && isObject(v)) return [[k, renamed(v, "symbol")]];
      return [[k, v]];
    }),
  );
}

/**
 * Rewrites a RecordType's `fields` and `unknown`, as an earlier release wrote them, as its `schema`, in place of
 * `fields` (s-gb8s9657a65hqmv). The schema begins with `"type": "object"`, unless the RecordType is a RecordType variant.
 * `unknown: "refused"` becomes `unevaluatedProperties: false`, and a RecordType variant loses its `unknown`. A RecordType
 * holding a field that has no form in JSON Schema is left unchanged, and the function returns the names of such fields.
 */
function rewriteFields(node: SpecNode): string[] {
  const fields = node.fields as EarlierField[];
  const unconverted = fields.filter((f) => neutralSchema(f.type) === null).map((f) => f.name);
  if (unconverted.length) return unconverted;
  const variant = "answersTo" in node;
  const properties = Object.fromEntries(fields.map((f) => [f.name, { ...neutralSchema(f.type), ...(f.text ? { description: f.text } : {}) }]));
  const required = fields.filter((f) => f.required === true).map((f) => f.name);
  const schema = {
    ...(variant ? {} : { type: "object" }),
    ...(fields.length ? { properties } : {}),
    ...(required.length ? { required } : {}),
    ...(node.unknown === "refused" && !variant ? { unevaluatedProperties: false } : {}),
  };
  const entries = Object.entries(node).flatMap(([k, v]): Array<[string, unknown]> => (k === "fields" ? [["schema", schema]] : k === "unknown" ? [] : [[k, v]]));
  for (const k of Object.keys(node)) delete (node as Record<string, unknown>)[k];
  Object.assign(node, Object.fromEntries(entries));
  return [];
}

/**
 * The project's extension with each kind it adds fields to under its name now, where an earlier release wrote another,
 * the order of its keys kept; null where it keeps no extension, cannot be read or renames nothing.
 */
function renamedExtension(root: string): Extension | null {
  const path = join(root, EXTENSION);
  if (!existsSync(path)) return null;
  let ext: Extension;
  try {
    ext = JSON.parse(readFileSync(path, "utf8")) as Extension;
  } catch {
    // An extension that is no JSON is refused by the validation, which reads it itself.
    return null;
  }
  const fields = ext?.fields;
  if (!fields || typeof fields !== "object" || !Object.keys(fields).some((k) => RENAMED_KINDS[k])) return null;
  return { ...ext, fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [RENAMED_KINDS[k] ?? k, v])) };
}

/**
 * Renames, in every node of every file, including the archive, what an earlier release wrote under another name, each
 * key keeping its position. An old key is dropped if the node already has a key under its new name. Returns a line for each
 * RecordType that the function leaves as an earlier release wrote it, naming the fields that keep it in that form
 * (s-gb8s9657a65hqmv).
 */
export function renameEarlier(files: SpecFile[]): string[] {
  const left: string[] = [];
  const rename = (n: SpecNode): SpecNode => {
    // The files are validated only after this, so what is not a node is left for the validation to name.
    if (!n || typeof n !== "object" || Array.isArray(n)) return n;
    const entries = Object.entries(n).flatMap(([k, v]): Array<[string, unknown]> => {
      const now = RENAMED_KEYS[k];
      if (!now) return [[k, v]];
      return now in n ? [] : [[now, v]];
    });
    const node = Object.fromEntries(entries) as SpecNode;
    if (RENAMED_KINDS[node.kind]) node.kind = RENAMED_KINDS[node.kind]!;
    // Earlier releases wrote a draft as "" and an approval as "checked", and one owner where a list stands now.
    if (node.status === "") node.status = "draft";
    if (node.status === "checked") node.status = "approved";
    if (typeof node.owner === "string") {
      const renamed = Object.entries(node).map(([k, v]): [string, unknown] => (k === "owner" ? ["owners", [v]] : [k, v]));
      for (const k of Object.keys(node)) delete (node as Record<string, unknown>)[k];
      Object.assign(node, Object.fromEntries(renamed));
    }
    // A list declared in a JSON file or in the code is rewritten in the form that this release writes (s-gb8s9657a65hqmv).
    if (node.list && typeof node.list === "object" && !Array.isArray(node.list)) node.list = rewrittenList(node.list as Record<string, unknown>);
    // A link of type `supersedes`, which earlier releases wrote, is removed (s-gb8s9657a65hqmv).
    if (Array.isArray(node.refs)) node.refs = node.refs.filter((r) => !(r && r.type === "supersedes"));
    // A domain's header no longer says where the domain's code is, and a ratio ends in * where earlier releases wrote N (s-gb8s9657a65hqmv).
    if (node.kind === "header") delete (node as Record<string, unknown>).code;
    if (Array.isArray(node.refs)) for (const r of node.refs) if (r && typeof r.ratio === "string") r.ratio = r.ratio.replaceAll("N", "*");
    // A RecordType's fields, as earlier releases wrote them, become its schema in JSON Schema form.
    if (node.kind === "RecordType" && Array.isArray(node.fields)) {
      const unconverted = rewriteFields(node);
      if (unconverted.length) {
        left.push(
          `${node.sid ?? node.title}: the RecordType "${node.title}" is left as an earlier release wrote it, since these of its fields have no form in JSON Schema: ${unconverted.map((f) => `"${f}"`).join(", ")}. A field of type variant, a field whose values the domains add and a field whose own list of values is empty are rewritten by hand.`,
        );
      }
    }
    if (Array.isArray(node.children)) node.children = node.children.map(rename);
    return node;
  };
  for (const f of files) if (Array.isArray(f.data.nodes)) f.data.nodes = f.data.nodes.map(rename);
  // A node of the archive, as an earlier release wrote it, loses its sid and every link pointing at it (s-gb8s9657a65hqmv).
  for (const f of files.filter((f) => isArchive(f.path))) {
    for (const n of f.data.nodes ?? []) {
      if (!n || typeof n !== "object") continue;
      delete (n as Partial<SpecNode>).sid;
      if (Array.isArray(n.refs)) n.refs = n.refs.filter((r) => !r.from);
    }
  }
  return left;
}

// Written in two pieces, so that the check of citations does not read it as a sid that names no node (s-m8nmfsxkcfu7cjp).
const A_SID = ["s", "222222222222222"].join("-");

/**
 * A copy of a file in which what the reindex writes itself holds a value the schema takes, so that the validation
 * leaves it out (s-xzcw3hv4hmxz7h7): the links pointing at a node everywhere; outside the archive, a sid a node lacks,
 * every location, a header's index of its sections, the values gathered beside a field and the status of a section and
 * of a domain's header.
 */
function asValidated(f: SpecFile): unknown {
  const archived = partOf(f.path).part.startsWith("_archive");
  const copy = structuredClone(f.data) as { nodes?: unknown };
  const isObject = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === "object" && !Array.isArray(v);
  const ungathered = (schema: unknown): void => {
    for (const { schema: s } of schemasWithin(schema)) if (isObject(s.enumSource)) delete s.enumSource.gathered;
  };
  const visit = (n: unknown): void => {
    if (!isObject(n)) return;
    if (Array.isArray(n.refs)) n.refs = n.refs.filter((r) => !(isObject(r) && "from" in r));
    if (!archived) {
      if (!("sid" in n)) n.sid = A_SID;
      n.location = "x";
      if (n.kind === "header") n.sections = [];
      if (isContainer(n.kind as string)) n.status = "draft";
      if (n.kind === "RecordType") ungathered(n.schema);
      // A node's `meta.code` and `meta.tests` lists are left out of the validation: `writeLists` rewrites them from the SpecTags in
      // the code and the tests (s-ztseyetus7np6br).
      if (isObject(n.meta)) {
        delete n.meta.code;
        delete n.meta.tests;
      }
    }
    if (Array.isArray(n.children)) n.children.forEach(visit);
    if (Array.isArray(n.groups)) for (const g of n.groups.filter(isObject)) for (const r of (Array.isArray(g.rows) ? g.rows : []).filter(isObject)) {
      for (const c of Object.values(isObject(r.cells) ? r.cells : {})) if (isObject(c)) visit(c.node);
    }
  };
  if (Array.isArray(copy.nodes)) copy.nodes.forEach(visit);
  return copy;
}

/** Gives a sid to every node without one, and puts every node's location and sid first. */
function giveSids(files: SpecFile[]): void {
  const taken = new Set<string>();
  const each = (nodes: SpecNode[], visit: (n: SpecNode) => void) => {
    for (const n of nodes) visit(n), each(n.children ?? [], visit), each(cellNodes(n).map((c) => c.node), visit);
  };
  for (const f of files) each(f.data.nodes ?? [], (n) => typeof n.sid === "string" && taken.add(n.sid));
  const settle = (nodes: SpecNode[]): SpecNode[] =>
    nodes.map((n) => {
      const sid = typeof n.sid === "string" && SID.test(n.sid) ? n.sid : newSid(taken);
      const { location = "", sid: _, ...rest } = n;
      const settled = { location, sid, ...rest } as SpecNode;
      if (settled.children) settled.children = settle(settled.children);
      // A node in a cell of a TableRule gets its location and sid in its cell.
      for (const g of (settled.groups as Array<{ rows: Array<{ cells: Record<string, { node?: SpecNode }> }> }> | undefined) ?? []) {
        for (const r of g.rows) for (const c of Object.values(r.cells)) if (c.node) c.node = settle([c.node])[0]!;
      }
      return settled;
    });
  for (const f of files) if (!partOf(f.path).part.startsWith("_archive")) f.data.nodes = settle(f.data.nodes ?? []);
}

/** Each domain's header and the sections its index lists. */
function headers(spec: Specification): Array<{ header: SpecNode; sections: SpecNode[] }> {
  const parts = new Map<string, { header?: SpecNode; sections: SpecNode[] }>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (["_guidelines", "tech", "contracts"].includes(part)) continue;
    if (!parts.has(part)) parts.set(part, { sections: [] });
    const entry = parts.get(part)!;
    for (const n of f.data.nodes) {
      if (n.kind === "header") {
        entry.header = n;
        entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
      } else if (n.kind === "section") entry.sections.push(n);
    }
  }
  return [...parts.values()].filter((e) => e.header).map((e) => ({ header: e.header!, sections: e.sections }));
}

/** The index a header carries, as the domain's sections produce it. */
/** The index of a domain's sections that its header holds; none for a domain without sections (s-agc6fb3vx46pc23). */
export function headerIndex(spec: Specification, sections: SpecNode[], built: ReturnType<typeof incoming>) {
  if (!sections.length) return undefined;
  return sections.map((s) => {
    const usedBy = (built.get(s.sid) ?? []).filter((r) => r.type === "consumes" && spec.nodes.get(r.from)?.node.kind === "header").map((r) => r.from);
    return { sid: s.sid, title: s.title, text: s.text, ...(usedBy.length ? { usedBy } : {}) };
  });
}

/** Whether a node's status is judged by the approvals here, rather than taken with the SpecSheriff guidelines at their version. */
export function judgedHere(path: string, writesSpecSheriffGuidelines: boolean): boolean {
  return writesSpecSheriffGuidelines || !partOf(path).specSheriffGuidelines;
}

export function reindex(root: string): ReindexReport {
  loadConfig(root);
  // Nothing is written while a chosen extension of the guidelines is missing from the plugin (s-mhsb6fjsq5xn6c9).
  const missing = missingExtensions(root);
  if (missing.length) throw new Error(`the installed plugin lacks a chosen extension, so the reindex writes no file:\n${missing.map((m) => `${m.where}: ${m.message}`).join("\n")}`);
  const writesSpecSheriffGuidelines = writesGuidelines(root);
  const report: ReindexReport = { merged: [], drafted: [], written: [], added: [], rewritten: [] };
  const texts = new Map<string, string>();
  const files: SpecFile[] = specPaths(root).map((path) => {
    const text = readFileSync(join(root, path), "utf8");
    texts.set(path, text);
    try {
      const { value, merged } = mergeKeys(text);
      report.merged.push(...merged.map((m) => ({ file: path, ...m })));
      return { path, data: value as SpecFile["data"] };
    } catch (error) {
      throw new Error(`${path}: ${(error as Error).message}`);
    }
  });
  const earlier = files.map((f) => JSON.stringify(f.data));
  const left = renameEarlier(files);
  files.forEach((f, i) => JSON.stringify(f.data) !== earlier[i] && report.rewritten.push(f.path));
  const extension = renamedExtension(root);
  // Validated once what an earlier release wrote is changed, and before anything is computed (s-xzcw3hv4hmxz7h7).
  const refused = schemaRefusals(root, files.map((f) => ({ path: f.path, data: asValidated(f) })), extension ?? undefined);
  if (refused.length) throw new Error(`the schema refuses what the reindex reads, so it writes no file:\n${[...left, ...refused.map((r) => `${r.where}: ${r.message}`)].join("\n")}`);
  const testsRun = replaceApprovingRule(root, files, report);
  giveSids(files);
  if (testsRun) report.added.push(...addedTestsRule(files));
  const spec = withTaken(root, files);

  const ids = locations(spec);
  const built = incoming(spec);
  for (const [sid, { node }] of spec.nodes) {
    if (ids.has(sid)) node.location = ids.get(sid)!;
    node.refs = [...(node.refs ?? []).filter((r) => !r.from), ...(built.get(sid) ?? [])];
  }
  // A node of the archive holds no link pointing at it.
  const unlinked = (nodes: SpecNode[]) => nodes.forEach((n) => ((n.refs = (n.refs ?? []).filter((r) => !r.from)), unlinked(n.children ?? [])));
  for (const f of spec.archive) unlinked(f.data.nodes ?? []);
  for (const { header, sections } of headers(spec)) {
    const index = headerIndex(spec, sections, built);
    if (index) header.sections = index;
    else delete header.sections;
  }
  // Where the RecordType extension is chosen, the values gathered from the source of each field with enumSource are written beside the field (s-ju5vcanbjph7mgh, s-5nf87c3e3jg9v7c).
  const chosen = ownerSettings(loadConfig(root), strictDefault(root)).extensions;
  if (chosen.has("recordtype")) {
    const gathered = gather(spec, { domains: chosen.has("domains") });
    for (const [, { node }] of spec.nodes) {
      if (node.kind !== "RecordType") continue;
      for (const { pointer, source } of sourcedFields(node)) source.gathered = gathered.get(fieldKey(node, pointer)) ?? [];
    }
  }

  // An approved node whose wording no approval stands for is a draft (s-5ah25f6gy99panq); a section's and a domain's
  // header's status is then built from the nodes under it (s-9kfdycuq34beqvs).
  const lines = readApprovals(root);
  for (const [sid, { node, file, cell }] of spec.nodes) {
    if (isContainer(node.kind) || !judgedHere(file.path, writesSpecSheriffGuidelines)) continue;
    if (node.status === "approved" && !stands(lines, sid, fingerprint(node, cell))) {
      node.status = "draft";
      report.drafted.push(sid);
    }
  }
  for (const [sid, status] of builtStatuses(spec)) {
    const at = spec.nodes.get(sid)!;
    if (judgedHere(at.file.path, writesSpecSheriffGuidelines)) at.node.status = status;
  }
  // The confirmations an earlier release kept move into the approvals, read above from either file.
  if (migrateApprovals(root)) report.written.push("specs/_approvals.jsonl");

  // Only the repository's own files are written, never the SpecSheriff guidelines it takes from the tools.
  for (const f of [...spec.files, ...spec.archive]) {
    if (!files.includes(f)) continue;
    const text = canonical(f.data);
    if (text !== texts.get(f.path)) {
      mkdirSync(dirname(join(root, f.path)), { recursive: true });
      writeFileSync(join(root, f.path), text);
      report.written.push(f.path);
    }
  }
  if (extension) {
    writeFileSync(join(root, EXTENSION), canonical(extension));
    report.written.push(EXTENSION);
  }
  // An earlier release recognized the repository where the SpecSheriff guidelines are written by means of a setting, which `sheriff reindex` removes (s-gb8s9657a65hqmv).
  const settings = join(root, "sheriff.config.json");
  const raw = JSON.parse(readFileSync(settings, "utf8")) as Record<string, unknown>;
  if ("writesSpecSheriffGuidelines" in raw) {
    delete raw.writesSpecSheriffGuidelines;
    writeFileSync(settings, JSON.stringify(raw, null, 2) + "\n");
    report.written.push("sheriff.config.json");
  }
  return report;
}

const escaped = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Writes each node's `meta.code` and `meta.tests` as the lists that the SpecTags of the code and of the tests produce
 * (s-ztseyetus7np6br, s-rwqzepmrt77rv35). It writes them in the files of the specification that the repository keeps, for every
 * node, including the nodes in the cells of a TableRule. A list that no SpecTag produces is removed. Returns the path of each
 * file that it writes.
 */
export async function writeLists(root: string): Promise<string[]> {
  const config = loadConfig(root);
  const spec = withTaken(root, specPaths(root).map((path) => ({ path, data: JSON.parse(readFileSync(join(root, path), "utf8")) })));
  const { codeFiles, testFiles } = await readBound(root, config, spec);
  const lists = boundLists(codeFiles, testFiles);
  const written: string[] = [];
  for (const f of spec.files.filter((f) => !f.taken && !isArchive(f.path))) {
    const before = canonical(f.data);
    const visit = (n: SpecNode): void => {
      const meta = { ...((n.meta as Record<string, unknown> | undefined) ?? {}) };
      const code = [...(lists.code.get(n.sid) ?? [])].sort();
      const tests = [...(lists.tests.get(n.sid) ?? [])].sort();
      if (code.length) meta.code = code.map((file) => ({ file }));
      else delete meta.code;
      if (tests.length) meta.tests = tests;
      else delete meta.tests;
      if (Object.keys(meta).length) n.meta = meta;
      else delete n.meta;
      (n.children ?? []).forEach(visit);
      cellNodes(n).forEach(({ node }) => visit(node));
    };
    (f.data.nodes ?? []).forEach(visit);
    if (canonical(f.data) !== before) {
      writeFileSync(join(root, f.path), canonical(f.data));
      written.push(f.path);
    }
  }
  return written;
}

/**
 * Rewrites each test that names its node by a bare sid, which an earlier release of the SpecSheriff tools read. The sid opens
 * the test's name or stands alone as the argument of its mark. `@spec ` is put before that sid in the files that the settings
 * name as the tests of the system's code or of a project's own check or generator. Each node's list of tests then names the
 * test by its new name. Returns each file it rewrote, the files of the specification included (s-f5rz6b7dhxejjts). A file of
 * the specification is read with every value of a key written twice merged, so that rewriting it drops none (s-w5wg69pvvhedsws).
 */
export async function rewriteTests(root: string): Promise<string[]> {
  const config = loadConfig(root);
  const own = [...config.checks, ...config.generators].flatMap((t) => t.tests);
  const isTests = (p: string) => readsAs(config, p) === "tests" || own.some((g) => posix.matchesGlob(p, g));
  const renamed = new Map<string, string>();
  const rewritten: string[] = [];
  for (const path of trackedFiles(root).filter((p) => isTests(p) && existsSync(join(root, p)))) {
    const text = readFileSync(join(root, path), "utf8");
    const file = await readCode(path, text);
    const bare = (file?.tests ?? []).filter((t) => t.bare);
    if (!bare.length) continue;
    const lines = text.split("\n");
    for (const t of bare) {
      const at = t.at - 1;
      const sid = new RegExp(`(["'\`])${escaped(t.bare!)}(?=[\\s"'\`])`);
      if (!sid.test(lines[at] ?? "")) continue;
      lines[at] = lines[at]!.replace(sid, `$1@spec ${t.bare}`);
      if (t.name.startsWith(t.bare!)) renamed.set(`${path}::${t.name}`, `${path}::@spec ${t.name}`);
    }
    const now = lines.join("\n");
    if (now === text) continue;
    writeFileSync(join(root, path), now);
    rewritten.push(path);
  }
  if (renamed.size) {
    for (const path of specPaths(root)) {
      const data = mergeKeys(readFileSync(join(root, path), "utf8")).value as SpecFile["data"];
      let changed = false;
      const walk = (nodes: SpecNode[] = []) => nodes.forEach((n) => {
        const meta = n.meta as { tests?: string[] } | undefined;
        if (Array.isArray(meta?.tests)) {
          meta.tests = meta.tests.map((t) => {
            const to = renamed.get(t);
            if (to) changed = true;
            return to ?? t;
          });
        }
        walk(n.children);
      });
      walk(data.nodes);
      if (changed) {
        writeFileSync(join(root, path), canonical(data));
        rewritten.push(path);
      }
    }
  }
  return rewritten.sort();
}
