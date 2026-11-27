import { partOf } from "./model.ts";
import { cellNodes, type SpecNode, type Specification } from "./spec-files.ts";

/** A value of a field with `enum` gathered from elsewhere in the specification, with the node it comes from (s-ju5vcanbjph7mgh). */
export interface Gathered {
  value: string;
  sid: string;
}

/** Where a field's values come from when they are not its own `enum` (s-5nf87c3e3jg9v7c). */
export interface EnumSource {
  from: "parts" | "kind";
  kind?: string;
  gathered?: Gathered[];
}

type Json = Record<string, unknown>;

/** The keywords of JSON Schema 2020-12 whose value is a schema, an array of schemas, or an object of schemas. */
const ONE = ["additionalProperties", "unevaluatedProperties", "propertyNames", "items", "contains", "unevaluatedItems", "not", "if", "then", "else"];
const MANY = ["prefixItems", "allOf", "anyOf", "oneOf"];
const NAMED = ["properties", "patternProperties", "dependentSchemas", "$defs"];

const isObject = (v: unknown): v is Json => Boolean(v) && typeof v === "object" && !Array.isArray(v);
const escape = (key: string) => key.replaceAll("~", "~0").replaceAll("/", "~1");

/**
 * Every schema within a RecordType's `schema`, at any depth, the `schema` itself first, each with the JSON Pointer to it
 * within the `schema`, such as `/properties/accounts/items`.
 */
export function schemasWithin(schema: unknown, pointer = ""): Array<{ pointer: string; schema: Json }> {
  if (!isObject(schema)) return [];
  const out = [{ pointer, schema }];
  for (const key of ONE) out.push(...schemasWithin(schema[key], `${pointer}/${key}`));
  for (const key of MANY) {
    const list = schema[key];
    if (Array.isArray(list)) list.forEach((s, i) => out.push(...schemasWithin(s, `${pointer}/${key}/${i}`)));
  }
  for (const key of NAMED) {
    const named = schema[key];
    if (isObject(named)) for (const [name, s] of Object.entries(named)) out.push(...schemasWithin(s, `${pointer}/${key}/${escape(name)}`));
  }
  return out;
}

/** The key under which a field's gathered values are kept: the RecordType holding it and the JSON Pointer to its schema. */
export const fieldKey = (holder: SpecNode, pointer: string) => `${holder.sid} ${pointer}`;

/** Each field with `enumSource` within a RecordType's `schema`, at any depth, with the JSON Pointer to its schema. */
export function sourcedFields(record: SpecNode): Array<{ pointer: string; source: EnumSource }> {
  return schemasWithin(record.schema)
    .filter(({ schema }) => isObject(schema.enumSource))
    .map(({ pointer, schema }) => ({ pointer, source: schema.enumSource as EnumSource }));
}

/**
 * The nodes of the specification in order. The files come in the code-point order of their paths. Within a file, the nodes
 * come in the order in which the computation of locations visits them.
 */
function inOrder(spec: Specification): Array<{ node: SpecNode; path: string; top: boolean }> {
  const out: Array<{ node: SpecNode; path: string; top: boolean }> = [];
  const visit = (node: SpecNode, path: string, top: boolean): void => {
    out.push({ node, path, top });
    for (const child of node.children ?? []) visit(child, path, false);
    for (const { node: inCell } of cellNodes(node)) visit(inCell, path, false);
  };
  const files = [...spec.files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  for (const f of files) for (const node of f.data.nodes ?? []) visit(node, f.path, true);
  return out;
}

/** Whether a file is a file of the base specification, rather than of the guidelines or of the technical appendix (s-qmmzf9nksfsa3qp). */
const inBase = (path: string) => !["_guidelines", "tech"].includes(partOf(path).part);

/**
 * The names of the parts of the base specification, each with the node it comes from, in the order of those nodes
 * (s-5nf87c3e3jg9v7c). Where the project has chosen the Domains extension, the parts are the domains, each named after
 * its folder and coming from its header, and the contracts section. Otherwise they are the contracts section and each
 * section of `specs/base/` at the top of its file, named by its title. The contracts section is named `contracts` and comes
 * from the first top-level node of the first file of `specs/contracts/`.
 */
function partNames(spec: Specification, domains: boolean): Gathered[] {
  const out: Gathered[] = [];
  let contracts = false;
  for (const { node, path, top } of inOrder(spec)) {
    if (!top) continue;
    const { part } = partOf(path);
    if (part === "contracts") {
      if (!contracts) out.push({ value: "contracts", sid: node.sid });
      contracts = true;
    } else if (domains && node.kind === "header" && inBase(path)) out.push({ value: part, sid: node.sid });
    else if (!domains && part === "base" && node.kind === "section") out.push({ value: node.title, sid: node.sid });
  }
  return out;
}

/**
 * The values of every field with `enumSource` within the `schema` of each RecordType, at any depth (s-5nf87c3e3jg9v7c).
 * Each value comes with the node it comes from, in the order of those nodes. A source gives one of these:
 * - the names of the parts of the base specification;
 * - the sids of the nodes of the base specification whose kind the source names, including the nodes in the cells of a TableRule.
 */
export function gather(spec: Specification, { domains }: { domains: boolean }): Map<string, Gathered[]> {
  const out = new Map<string, Gathered[]>();
  const ordered = inOrder(spec);
  const parts = partNames(spec, domains);
  for (const { node } of ordered) {
    if (node.kind !== "RecordType") continue;
    for (const { pointer, source } of sourcedFields(node)) {
      const found =
        source.from === "parts"
          ? parts
          : ordered.filter(({ node: n, path }) => inBase(path) && n.kind === source.kind).map(({ node: n }) => ({ value: n.sid, sid: n.sid }));
      out.set(fieldKey(node, pointer), found);
    }
  }
  return out;
}
