import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, posix } from "node:path";
import { approvedWordings, type ApprovedWordings } from "./approved-wording.ts";
import { loadConfig, ownerSettings } from "./config.ts";
import { clashes, runGenerators } from "./generators.ts";
import { SID } from "./model.ts";
import { cellNodes, loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";

/** The base's rule on data structures, which the rule of the stack listing the files of the types implements. */
export const DATA_STRUCTURES = "s-e877bnfa559tvk9";
const STACK = "specs/tech/stack.json";
const SCHEMA = "https://json-schema.org/draft/2020-12/schema";
/** The name by which a project chooses the RecordType extension of the guidelines. */
const RECORDTYPE_EXTENSION = "recordtype";

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);

/** The keywords of JSON Schema 2020-12 whose value is a schema. */
const ONE_SCHEMA = new Set(["items", "additionalProperties", "unevaluatedProperties", "unevaluatedItems", "contains", "propertyNames", "if", "then", "else", "not", "contentSchema"]);
/** The keywords whose value is a list of schemas. */
const LIST_OF_SCHEMAS = new Set(["allOf", "anyOf", "oneOf", "prefixItems"]);
/** The keywords whose value is an object with a schema under each of its keys. */
const SCHEMAS_BY_NAME = new Set(["properties", "patternProperties", "dependentSchemas", "$defs"]);

/** A place in a RecordType's `schema`: the RecordType, the JSON Pointer to the place, and the parts that name a TypedDict written for it. */
type Place = { holder: string; pointer: string[]; parts: string[] };
type At = Place & { schema: unknown };
/** A field of a type, with the schema that each RecordType declaring it declares for it, in the order in which the RecordTypes are taken. */
type Field = { name: string; schemas: At[]; guaranteed: boolean };

/** A type as every language is written from it. */
type T =
  | { t: "ref"; sid: string; name: string }
  | { t: "literal"; values: unknown[] }
  | { t: "union"; of: T[] }
  /** An allOf, with the TypedDict of its own that it gives in Python, if it gives one. */
  | { t: "intersection"; of: T[]; dict: Dict | null }
  | { t: "null" | "string" | "integer" | "number" | "boolean" | "unknown" }
  | { t: "array" | "map"; of: T }
  /** An object written inline, with the TypedDict of its own that it gives in Python. */
  | { t: "object"; props: Prop[]; dict: Dict };
type Prop = { name: string; type: T; required: boolean };
/** A TypedDict of its own in Python. Its key tells apart two TypedDicts declared at different places. */
type Dict = { key: string; name: string; holder: string; props: Prop[] };
type Decl = { name: string; sid: string } & ({ kind: "union"; members: string[] } | { kind: "object"; props: Prop[] });
/** What is written for one RecordType: its types, and its definition in the RuntimeChecks. */
type Block = { sid: string; name: string; decls: Decl[]; definition: Json };

export interface GeneratedFile {
  /** From the root of the repository. */
  path: string;
  text: string;
}

const where = (spec: Specification, sid: string) => {
  const at = spec.nodes.get(sid)!;
  return `${at.file.path}: ${sid} (${at.node.location})`;
};
const byPath = (a: { path: string }, b: { path: string }) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
const pointerText = (tokens: string[]) => (tokens.length ? tokens.map((t) => `/${t.replace(/~/g, "~0").replace(/\//g, "~1")}`).join("") : "its top level");
const memo = <V>(f: (sid: string) => V) => {
  const cache = new Map<string, V>();
  return (sid: string): V => {
    if (!cache.has(sid)) cache.set(sid, f(sid));
    return cache.get(sid)!;
  };
};

/** Calls `visit` on a schema and on each schema within it, at any depth. */
function visitSchemas(schema: unknown, visit: (s: Json, pointer: string[]) => void, pointer: string[] = []): void {
  if (!isObject(schema)) return;
  visit(schema, pointer);
  for (const [k, v] of Object.entries(schema)) {
    if (SCHEMAS_BY_NAME.has(k) && isObject(v)) for (const [name, sub] of Object.entries(v)) visitSchemas(sub, visit, [...pointer, k, name]);
    else if (LIST_OF_SCHEMAS.has(k) && Array.isArray(v)) v.forEach((sub, i) => visitSchemas(sub, visit, [...pointer, k, String(i)]));
    else if (ONE_SCHEMA.has(k)) visitSchemas(v, visit, [...pointer, k]);
  }
}

/**
 * The files that the rule of the stack lists for the generated types and RuntimeChecks, and what is refused in that list
 * (s-pvzms7d8kxb8dk2). The rule is read in its last approved wording. Its `implements` links are taken from the commit that
 * added its last approval. A rule that has never been approved lists no file. Nothing is listed where the project has not chosen the
 * RecordType extension.
 */
export function typeFiles(root: string, spec: Specification = loadSpecification(root), wordings: ApprovedWordings = approvedWordings(root, spec)): { paths: string[]; refusals: Finding[] } {
  if (!ownerSettings(loadConfig(root), false).extensions.has(RECORDTYPE_EXTENSION)) return { paths: [], refusals: [] };
  const rules: Array<{ sid: string; members: unknown[] }> = [];
  const walk = (nodes: SpecNode[]) => {
    for (const n of nodes) {
      const list = wordings.wording(n.sid)?.list;
      if (isObject(list) && wordings.links(n.sid).some((r) => r.type === "implements" && r.to === DATA_STRUCTURES)) {
        rules.push({ sid: n.sid, members: Array.isArray(list.members) ? list.members : [] });
      }
      walk(n.children ?? []);
    }
  };
  walk(spec.files.find((f) => f.path === STACK)?.data.nodes ?? []);
  const [first, ...more] = rules;
  if (!first) return { paths: [], refusals: [] };
  const refusals: Finding[] = more.map((n) => ({ where: where(spec, n.sid), message: `a second list of the files of the generated types and runtime checks, beside the one ${first.sid} defines` }));
  const paths = first.members.map(String);
  for (const path of paths) {
    if (![".ts", ".py", ".json"].includes(extname(path))) refusals.push({ where: where(spec, first.sid), message: `lists ${path}, a file of neither .ts, .py nor .json` });
    else if (posix.isAbsolute(path) || posix.normalize(path).startsWith("../")) refusals.push({ where: where(spec, first.sid), message: `lists ${path}, which is no path inside the repository` });
  }
  return { paths, refusals };
}

/** The name of a RecordType's type: its title, with the first letter of each word changed to uppercase and the spaces removed. */
const typeName = (title: string) => title.split(/\s+/).filter(Boolean).map(raise).join("");
function raise(word: string): string {
  const [first = "", ...rest] = [...word];
  return first.toUpperCase() + rest.join("");
}

/**
 * What the RecordTypes generate, each in its last approved wording (s-a8fn72xa782wvbk), in the order in which they appear
 * in the specification (s-suv42g8r3ra2h6b). A RecordType that has never been approved generates nothing, and neither does a
 * RecordType that relies on one that has never been approved. `leftOut` names each RecordType of the second kind.
 */
function declarations(spec: Specification, wordings: ApprovedWordings): { blocks: Block[]; refusals: Finding[]; leftOut: string[] } {
  const refusals: Finding[] = [];
  const refuse = (sid: string, message: string) => {
    if (!refusals.some((r) => r.where === where(spec, sid) && r.message === message)) refusals.push({ where: where(spec, sid), message });
  };

  const reading: string[] = [];
  const walk = (nodes: SpecNode[]) => {
    for (const n of nodes) {
      if (n.kind === "RecordType") reading.push(n.sid);
      walk(n.children ?? []);
      walk(cellNodes(n).map((c) => c.node));
    }
  };
  for (const f of [...spec.files].sort(byPath)) walk(f.data.nodes ?? []);

  const isRecordType = (sid: unknown): sid is string => typeof sid === "string" && spec.nodes.get(sid)?.node.kind === "RecordType";
  /** A RecordType's last approved wording, or nothing where it has never been approved. */
  const wording = memo((sid: string): SpecNode | undefined => {
    const w = isRecordType(sid) ? wordings.wording(sid) : undefined;
    return w?.kind === "RecordType" ? w : undefined;
  });
  const schemaOf = (sid: string): Json => {
    const s = wording(sid)?.schema;
    return isObject(s) ? s : {};
  };
  const nameOf = (sid: string) => typeName(wording(sid)?.title ?? "");
  const links = memo((sid: string) => wordings.links(sid));
  /** The RecordTypes that a RecordType refines, in the order of its links. */
  const refined = (sid: string) => links(sid).flatMap((r) => (r.type === "refines" && isRecordType(r.to) ? [r.to] : []));

  // A RecordType relies on each RecordType that it refines and on each that its schema names (s-a8fn72xa782wvbk).
  const relied = (sid: string): string[] => {
    const named: string[] = [];
    visitSchemas(schemaOf(sid), (s) => {
      if (typeof s.$ref === "string" && s.$ref.startsWith("#") && isRecordType(s.$ref.slice(1))) named.push(s.$ref.slice(1));
      if (isRecordType(s.identifierOf)) named.push(s.identifierOf);
    });
    return [...refined(sid), ...named];
  };
  const generated = new Set<string>();
  const leftOut: string[] = [];
  for (const sid of reading) {
    if (!wording(sid)) continue;
    const seen = new Set([sid]);
    const pending = [sid];
    let never = false;
    while (pending.length && !never) {
      for (const to of relied(pending.pop()!)) {
        if (seen.has(to)) continue;
        seen.add(to);
        if (!wording(to)) never = true;
        else pending.push(to);
      }
    }
    if (never) leftOut.push(sid);
    else generated.add(sid);
  }

  /** The RecordTypes that a RecordType reaches through refines links: for each link, those the linked RecordType reaches, then that RecordType, each once. */
  const reach = memo((sid: string): string[] => {
    const out: string[] = [];
    const visit = (s: string, path: string[]) => {
      for (const to of refined(s)) {
        if (out.includes(to) || path.includes(to)) continue;
        visit(to, [...path, to]);
        if (!out.includes(to)) out.push(to);
      }
    };
    visit(sid, [sid]);
    return out;
  });
  /** The fields that the schemas of the given RecordTypes declare, each where it first appears, and the other names that their `required` lists contain. */
  const fieldsOf = (sids: string[]): { fields: Field[]; others: string[] } => {
    const fields: Field[] = [];
    const listed: string[] = [];
    for (const sid of sids) {
      const schema = schemaOf(sid);
      for (const [name, s] of Object.entries(isObject(schema.properties) ? schema.properties : {})) {
        let field = fields.find((f) => f.name === name);
        if (!field) fields.push((field = { name, schemas: [], guaranteed: false }));
        field.schemas.push({ schema: s, holder: sid, pointer: ["properties", name], parts: [raise(name)] });
      }
      if (Array.isArray(schema.required)) listed.push(...schema.required.filter((r): r is string => typeof r === "string"));
    }
    for (const f of fields) f.guaranteed = listed.includes(f.name);
    return { fields, others: [...new Set(listed.filter((n) => !fields.some((f) => f.name === n)))] };
  };
  const allFields = memo((sid: string) => fieldsOf([...reach(sid), sid]));

  const chosenBy = (sid: string) => {
    const c = wording(sid)?.chosenBy;
    return Array.isArray(c) ? c.filter((k): k is string => typeof k === "string") : [];
  };
  /**
   * The fields that select a variant of a RecordType: those that its `chosenBy` names (s-c2r9jndrjbtbsv6). A RecordType
   * without a `chosenBy` takes those of the nearest RecordType that has one and that it reaches through `refines` links.
   */
  const selecting = memo((sid: string): string[] => {
    const seen = new Set([sid]);
    for (let level = [sid]; level.length; level = level.flatMap(refined).filter((s) => !seen.has(s) && Boolean(seen.add(s)))) {
      const chooser = level.find((s) => chosenBy(s).length);
      if (chooser) return chosenBy(chooser);
    }
    return [];
  });
  const answersTo = (sid: string): Json => {
    const a = wording(sid)?.answersTo;
    return isObject(a) ? a : {};
  };
  // The generated variants of each RecordType, in the order in which the RecordTypes are taken (s-nk8td3ez58gahc4).
  // A variant's RecordType is the first RecordType that it refines and that has fields that select a variant (s-c2r9jndrjbtbsv6).
  const recordOf = new Map<string, string>();
  const variantsOf = new Map<string, string[]>();
  for (const sid of reading) {
    if (!generated.has(sid) || !isObject(wording(sid)!.answersTo)) continue;
    const record = refined(sid).find((to) => selecting(to).length);
    if (!record) continue;
    recordOf.set(sid, record);
    variantsOf.set(record, [...(variantsOf.get(record) ?? []), sid]);
  }

  /** The values gathered beside the field at a place in a RecordType's `schema`, each once, as the files contain them when the command runs (s-a8fn72xa782wvbk). */
  const gatheredAt = (at: Place): unknown[] => {
    let s: unknown = spec.nodes.get(at.holder)?.node.schema;
    for (const k of at.pointer) s = isObject(s) ? s[k] : Array.isArray(s) ? s[Number(k)] : undefined;
    const source = isObject(s) ? s.enumSource : undefined;
    const gathered = isObject(source) && Array.isArray(source.gathered) ? source.gathered : [];
    return [...new Set(gathered.filter((g) => isObject(g) && "value" in g).map((g) => (g as Json).value))];
  };
  /** The values that the SpecSheriff tools collect for a field: those of its own enum, or those gathered beside it (s-5nf87c3e3jg9v7c). */
  const valuesOf = (field: Field | undefined): unknown[] => {
    const at = field?.schemas.at(-1);
    if (!at || !isObject(at.schema)) return [];
    if (Array.isArray(at.schema.enum)) return at.schema.enum;
    return isObject(at.schema.enumSource) ? gatheredAt(at) : [];
  };
  /** The field at the end of the chain of identifiers that starts with `identifierOf` naming the given sid, or nothing where the chain has no such end (s-3anv9qcmx8pwp2w). */
  const chainEnd = (sid: unknown, seen: string[] = []): Field | undefined => {
    if (!isRecordType(sid) || !wording(sid) || seen.includes(sid)) return undefined;
    const field = allFields(sid).fields.find((f) => f.name === wording(sid)!.identifiedBy);
    const last = field?.schemas.at(-1)?.schema;
    if (!field || !isObject(last) || !("identifierOf" in last)) return field;
    return chainEnd(last.identifierOf, [...seen, sid]);
  };

  // ---- The types (s-4npdup7mjkva69y).

  const dictAt = (at: Place, props: Prop[]): Dict => ({ key: `${at.holder} ${pointerText(at.pointer)}`, name: nameOf(at.holder) + at.parts.join(""), holder: at.holder, props });
  /** The type that a schema gives: that of the first row of the table whose keywords the schema contains, `{}` last. */
  const typeOf = (at: At, seen: string[] = []): T => {
    const s = at.schema;
    if (!isObject(s)) return { t: "unknown" };
    const down = (key: string[], part: string | null, schema: unknown): At =>
      ({ schema, holder: at.holder, pointer: [...at.pointer, ...key], parts: part === null ? at.parts : [...at.parts, part] });
    const members = (key: "oneOf" | "anyOf" | "allOf") => (s[key] as unknown[]).map((m, i) => typeOf(down([key, String(i)], String(i + 1), m), seen));
    if (typeof s.$ref === "string" && s.$ref.startsWith("#") && SID.test(s.$ref.slice(1))) {
      const to = s.$ref.slice(1);
      return isRecordType(to) ? { t: "ref", sid: to, name: nameOf(to) } : { t: "unknown" };
    }
    if ("identifierOf" in s) {
      // A field whose chain of identifiers fails its check gets the same type as the empty schema {}, and so does a field whose `identifierOf` is not a sid.
      const target = s.identifierOf;
      const end = typeof target === "string" && SID.test(target) && !seen.includes(target) ? chainEnd(target) : undefined;
      return end ? typeOf(end.schemas.at(-1)!, [...seen, target as string]) : { t: "unknown" };
    }
    if ("const" in s) return { t: "literal", values: [s.const] };
    if (Array.isArray(s.enum)) return { t: "literal", values: s.enum };
    if (isObject(s.enumSource)) return { t: "literal", values: gatheredAt(at) };
    if (Array.isArray(s.oneOf)) return { t: "union", of: members("oneOf") };
    if (Array.isArray(s.anyOf)) return { t: "union", of: members("anyOf") };
    if (Array.isArray(s.allOf)) {
      const of = members("allOf");
      const each = of.map(dictProps);
      if (each.some((p) => p === null)) return { t: "intersection", of, dict: null };
      // The fields of every member of the intersection: each where it first appears, with the type that the last member gives it, and listed in `required` if any member lists it there.
      const props: Prop[] = [];
      for (const p of each.flatMap((e) => e!)) {
        const i = props.findIndex((x) => x.name === p.name);
        if (i < 0) props.push(p);
        else props[i] = { name: p.name, type: p.type, required: props[i]!.required || p.required };
      }
      return { t: "intersection", of, dict: dictAt(at, props) };
    }
    if (Array.isArray(s.type)) return { t: "union", of: s.type.map((type) => typeOf({ ...at, schema: { ...s, type } }, seen)) };
    if (s.type === "null" || s.type === "string" || s.type === "integer" || s.type === "number" || s.type === "boolean") return { t: s.type };
    if (s.type === "array" && "items" in s) return { t: "array", of: typeOf(down(["items"], "Item", s.items), seen) };
    if (isObject(s.properties)) {
      const required = Array.isArray(s.required) ? s.required : [];
      const props = Object.entries(s.properties).map(([name, sub]) => ({ name, type: typeOf(down(["properties", name], raise(name), sub), seen), required: required.includes(name) }));
      return { t: "object", props, dict: dictAt(at, props) };
    }
    if (s.type === "object" && "additionalProperties" in s) return { t: "map", of: typeOf(down(["additionalProperties"], "Value", s.additionalProperties), seen) };
    return { t: "unknown" };
  };
  /** The fields of the TypedDict that a type gives in Python, or nothing where it gives none. */
  const dictProps = (t: T): Prop[] | null =>
    t.t === "object" ? t.props : t.t === "intersection" ? (t.dict?.props ?? null) : t.t === "ref" ? recordProps(t.sid) : null;
  /**
   * The fields of a RecordType's type: those of every RecordType that it reaches, then its own. In a variant's type, each
   * field that selects a variant takes only the value to which the variant corresponds.
   */
  const typeProps = (sid: string): Prop[] => {
    const record = recordOf.get(sid);
    const fixed = record ? selecting(record).filter((k) => k in answersTo(sid)) : [];
    return allFields(sid).fields.map((f) =>
      fixed.includes(f.name)
        ? { name: f.name, type: { t: "literal", values: [answersTo(sid)[f.name]] }, required: true }
        : { name: f.name, type: typeOf(f.schemas.at(-1)!), required: f.guaranteed },
    );
  };
  const computed = new Map<string, Prop[] | null>();
  const computing = new Set<string>();
  /** The fields of the TypedDict that is the RecordType's type in Python, or nothing where its type is a union of its variants. */
  const recordProps = (sid: string): Prop[] | null => {
    if (variantsOf.has(sid) || computing.has(sid)) return null;
    if (!computed.has(sid)) {
      computing.add(sid);
      computed.set(sid, typeProps(sid));
      computing.delete(sid);
    }
    return computed.get(sid)!;
  };

  // ---- The RuntimeChecks (s-4npdup7mjkva69y).

  /** A schema as it is written into a file of RuntimeChecks, with enumSource and identifierOf replaced at any depth. */
  const check = (schema: unknown, at: Place, seen: string[] = []): unknown => {
    if (!isObject(schema)) return schema;
    const out: Json = {};
    for (const [k, v] of Object.entries(schema)) {
      const inner = (sub: unknown, ...key: string[]) => check(sub, { ...at, pointer: [...at.pointer, k, ...key] }, seen);
      if (k === "enumSource") out.enum = gatheredAt(at);
      else if (k === "identifierOf") {
        // The keywords of the schema of the field at the end of the chain take the place of identifierOf.
        // Where the field has a keyword of its own with the same name, its own keyword stays.
        const end = typeof v === "string" && !seen.includes(v) ? chainEnd(v) : undefined;
        const kept = end ? fieldCheck(end, [...seen, v as string]) : undefined;
        for (const [key, value] of Object.entries(isObject(kept) ? kept : {})) if (key !== "description" && !(key in schema)) out[key] = value;
      } else if (SCHEMAS_BY_NAME.has(k) && isObject(v)) out[k] = Object.fromEntries(Object.entries(v).map(([name, sub]) => [name, inner(sub, name)]));
      else if (LIST_OF_SCHEMAS.has(k) && Array.isArray(v)) out[k] = v.map((sub, i) => inner(sub, String(i)));
      else if (ONE_SCHEMA.has(k)) out[k] = inner(v);
      else out[k] = v;
    }
    return out;
  };
  /** A field's schema in a definition: the one schema declared for it, or an allOf of every schema declared for it. */
  const fieldCheck = (f: Field, seen: string[] = []): unknown =>
    f.schemas.length === 1 ? check(f.schemas[0]!.schema, f.schemas[0]!, seen) : { allOf: f.schemas.map((at) => check(at.schema, at, seen)) };
  /**
   * A RecordType's definition, built from its own schema. It has the given fields, the SpecTag in its $comment, its sid as
   * its $anchor, and the `if` and `then` pair of each of its variants.
   */
  const definition = (sid: string, fields: Field[], others: string[], pairs: Json[]): Json => {
    const own = schemaOf(sid);
    const required = [...fields.filter((f) => f.guaranteed).map((f) => f.name), ...others];
    const properties = Object.fromEntries(fields.map((f) => [f.name, fieldCheck(f)]));
    const out: Json = { $comment: typeof own.$comment === "string" ? `@spec ${sid}\n${own.$comment}` : `@spec ${sid}`, $anchor: sid };
    for (const [k, v] of Object.entries(check(own, { holder: sid, pointer: [], parts: [] }) as Json)) {
      if (k === "$comment" || k === "$anchor") continue;
      if (k === "properties") out.properties = properties;
      else if (k === "required") {
        if (required.length) out.required = required;
      } else out[k] = v;
    }
    if (!("properties" in out) && fields.length) out.properties = properties;
    if (!("required" in out) && required.length) out.required = required;
    if (pairs.length) out.allOf = [...(Array.isArray(out.allOf) ? out.allOf : []), ...pairs];
    return out;
  };

  const blocks: Block[] = [];
  for (const sid of reading.filter((s) => generated.has(s))) {
    visitSchemas(schemaOf(sid), (s, pointer) => {
      if (typeof s.$ref === "string" && s.$ref.startsWith("#") && SID.test(s.$ref.slice(1)) && !isRecordType(s.$ref.slice(1))) {
        refuse(sid, `its schema contains the $ref ${s.$ref} at ${pointerText(pointer)}, which names a sid that no RecordType has, so the type that it refers to has no name`);
      }
    });
    const name = nameOf(sid);
    const variants = variantsOf.get(sid) ?? [];
    const decls: Decl[] = [];
    if (!variants.length) decls.push({ name, sid, kind: "object", props: typeProps(sid) });
    else {
      // The union of the type of each RecordType variant and the type for the combinations of values of the fields that select a variant that no variant matches.
      const choosing = selecting(sid);
      const values = choosing.map((k) => valuesOf(allFields(sid).fields.find((f) => f.name === k)));
      const combinations = values.reduce<unknown[][]>((all, vs) => all.flatMap((c) => vs.map((v) => [...c, v])), [[]]);
      const answered = variants.map((v) => choosing.map((k) => answersTo(v)[k]));
      const open = combinations.some((c) => !answered.some((a) => a.every((v, i) => v === c[i])));
      const other = `${name}Other`;
      decls.push({ name, sid, kind: "union", members: [...variants.map(nameOf), ...(open ? [other] : [])] });
      if (open) {
        // Where one field selects a variant, it takes in this type only the values to which no variant corresponds.
        const narrowed = (p: Prop): Prop => ({ ...p, type: { t: "literal", values: values[0]!.filter((v) => !answered.some((a) => a[0] === v)) } });
        decls.push({ name: other, sid, kind: "object", props: typeProps(sid).map((p) => (choosing.length === 1 && p.name === choosing[0] ? narrowed(p) : p)) });
      }
    }
    // A variant's definition contains only the fields that it adds to its RecordType (s-nk8td3ez58gahc4).
    const record = recordOf.get(sid);
    const beyond = new Set(record ? [record, ...reach(record)] : []);
    const { fields, others } = record ? fieldsOf([...reach(sid).filter((s) => !beyond.has(s)), sid]) : allFields(sid);
    const pairs = variants.map((v) => ({
      if: { properties: Object.fromEntries(Object.entries(answersTo(v)).map(([k, value]) => [k, { const: value }])), required: Object.keys(answersTo(v)) },
      then: { $ref: `#${v}` },
    }));
    blocks.push({ sid, name, decls, definition: definition(sid, fields, others, pairs) });
  }
  return { blocks, refusals, leftOut };
}

// ---- The languages.

const TS_RESERVED = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends",
  "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw",
  "true", "try", "typeof", "var", "void", "while", "with", "implements", "interface", "let", "package", "private", "protected", "public",
  "static", "yield", "await", "any", "unknown", "number", "bigint", "boolean", "string", "symbol", "never", "object", "undefined",
]);
const PY_KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except",
  "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try",
  "while", "with", "yield",
]);
const TS_IDENTIFIER = /^[\p{ID_Start}$_][\p{ID_Continue}$‌‍]*$/u;

interface Language {
  name: string;
  identifier?: RegExp;
  reserved?: { words: Set<string>; why: string };
  /** The file's text, the names it uses from outside itself, and the names it declares, each with the sid it is tagged with. */
  write(blocks: Block[]): { text: string; uses: string[]; names: Array<{ name: string; sid: string }> };
}

const typescript: Language = {
  name: "TypeScript",
  identifier: TS_IDENTIFIER,
  reserved: { words: TS_RESERVED, why: "a word TypeScript reserves" },
  write(blocks) {
    const uses = new Set<string>();
    /** The texts joined, each once, as a type that binds as tightly as `binds` says, or `empty` where there are none. */
    const join = (parts: Array<[string, number]>, separator: string, binds: number, empty: string): [string, number] => {
      const texts = [...new Set(parts.map(([text]) => text))];
      if (texts.length === 1) return parts[0]!;
      return texts.length ? [texts.join(separator), binds] : [empty, 2];
    };
    const paren = ([text, binds]: [string, number], least: number): string => (binds < least ? `(${text})` : text);
    /** A type's text, and how tightly it binds: 0 for a union, 1 for an intersection, 2 for any other type. */
    const type = (t: T, indent: string): [string, number] => {
      switch (t.t) {
        case "ref": return [t.name, 2];
        case "literal": return join(t.values.map((v) => [JSON.stringify(v), 2]), " | ", 0, "never");
        case "union": return join(t.of.map((m) => type(m, indent)), " | ", 0, "never");
        case "intersection": {
          const of = t.of.map((m) => type(m, indent));
          return new Set(of.map(([text]) => text)).size === 1 ? of[0]! : join(of.map((m) => [paren(m, 1), 1]), " & ", 1, "unknown");
        }
        case "null": return ["null", 2];
        case "string": return ["string", 2];
        case "integer": case "number": return ["number", 2];
        case "boolean": return ["boolean", 2];
        case "unknown": return ["unknown", 2];
        case "array": return [`${paren(type(t.of, indent), 2)}[]`, 2];
        case "map": return uses.add("Record"), [`Record<string, ${type(t.of, indent)[0]}>`, 2];
        case "object": return [object(t.props, indent), 2];
      }
    };
    const key = (name: string) => (TS_IDENTIFIER.test(name) ? name : JSON.stringify(name));
    const object = (props: Prop[], indent: string) =>
      props.length ? `{\n${props.map((p) => `${indent}  ${key(p.name)}${p.required ? "" : "?"}: ${type(p.type, `${indent}  `)[0]};`).join("\n")}\n${indent}}` : "{}";
    const decls = blocks.flatMap((b) => b.decls);
    const text = decls.map((d) => `/** @spec ${d.sid} */\nexport type ${d.name} = ${d.kind === "union" ? d.members.join(" | ") : object(d.props, "")};\n`).join("\n");
    return { text, uses: [...uses], names: decls.map(({ name, sid }) => ({ name, sid })) };
  },
};

const python: Language = {
  name: "Python",
  identifier: /^[\p{XID_Start}_]\p{XID_Continue}*$/u,
  reserved: { words: PY_KEYWORDS, why: "a keyword of Python" },
  write(blocks) {
    const typing = new Set<string>();
    const builtins = new Set<string>();
    const dicts = new Map<string, { holder: string; name: string; text: string }>();
    const any = () => (typing.add("Any"), "Any");
    /** A value that `Literal` can hold, written as Python writes it, or nothing where `Literal` cannot hold it. */
    const literal = (v: unknown): string | null =>
      typeof v === "string" ? JSON.stringify(v)
      : v === true ? "True" : v === false ? "False" : v === null ? "None"
      : typeof v === "number" && Number.isInteger(v) ? String(v)
      : null;
    /** The name of a TypedDict of its own, which is written once, after the types of the RecordType whose schema contains it. */
    const use = (d: Dict): string => {
      if (!dicts.has(d.key)) {
        const entry = { holder: d.holder, name: d.name, text: "" };
        dicts.set(d.key, entry);
        entry.text = `# @spec ${d.holder}\n${typedDict(d.name, d.props)}`;
      }
      return JSON.stringify(d.name);
    };
    const type = (t: T): string => {
      switch (t.t) {
        case "ref": return JSON.stringify(t.name);
        case "literal": {
          const values = t.values.map(literal);
          return values.length && values.every((v) => v !== null) ? (typing.add("Literal"), `Literal[${values.join(", ")}]`) : any();
        }
        case "union": {
          const of = [...new Set(t.of.map(type))];
          return of.length > 1 ? (typing.add("Union"), `Union[${of.join(", ")}]`) : (of[0] ?? any());
        }
        case "intersection": return t.dict ? use(t.dict) : any();
        case "null": return "None";
        case "string": return builtins.add("str"), "str";
        case "integer": return builtins.add("int"), "int";
        case "number": return builtins.add("float"), "float";
        case "boolean": return builtins.add("bool"), "bool";
        case "unknown": return any();
        case "array": return builtins.add("list"), `list[${type(t.of)}]`;
        case "map": return builtins.add("dict").add("str"), `dict[str, ${type(t.of)}]`;
        case "object": return use(t.dict);
      }
    };
    const field = (p: Prop) => (p.required ? type(p.type) : (typing.add("NotRequired"), `NotRequired[${type(p.type)}]`));
    function typedDict(name: string, props: Prop[]): string {
      typing.add("TypedDict");
      const body = props.length ? `{\n${props.map((p) => `    ${JSON.stringify(p.name)}: ${field(p)},`).join("\n")}\n}` : "{}";
      return `${name} = TypedDict(${JSON.stringify(name)}, ${body})\n`;
    }
    const decl = (d: Decl) =>
      d.kind === "union"
        ? (typing.add("Union"), `# @spec ${d.sid}\n${d.name} = Union[${d.members.map((m) => JSON.stringify(m)).join(", ")}]\n`)
        : `# @spec ${d.sid}\n${typedDict(d.name, d.props)}`;
    // Every type is written first, so that each TypedDict of its own is known before it is placed after its RecordType's types.
    const texts = blocks.map((b) => b.decls.map(decl));
    const parts: string[] = [];
    const names: Array<{ name: string; sid: string }> = [];
    blocks.forEach((b, i) => {
      const own = [...dicts.values()].filter((d) => d.holder === b.sid);
      parts.push(...texts[i]!, ...own.map((d) => d.text));
      names.push(...b.decls.map(({ name, sid }) => ({ name, sid })), ...own.map((d) => ({ name: d.name, sid: d.holder })));
    });
    const body = parts.join("\n");
    return { text: typing.size ? `from typing import ${[...typing].sort().join(", ")}\n\n${body}` : body, uses: [...typing, ...builtins], names };
  },
};

const jsonSchema: Language = {
  name: "JSON Schema",
  write(blocks) {
    const defs = Object.fromEntries(blocks.map((b) => [b.name, b.definition]));
    return { text: JSON.stringify({ $schema: SCHEMA, $defs: defs }, null, 2) + "\n", uses: [], names: blocks.map(({ name, sid }) => ({ name, sid })) };
  },
};

const LANGUAGES: Record<string, Language> = { ".ts": typescript, ".py": python, ".json": jsonSchema };

/**
 * The files that the RecordTypes generate, or the refusals that keep them from being generated. Nothing is generated where
 * the technical appendix lists no files. `leftOut` names each RecordType left out because it relies on a RecordType never
 * approved. `named` names each node whose last approved wording is found neither in the files nor on the current branch
 * (s-a8fn72xa782wvbk).
 */
export function generateTypes(root: string, spec: Specification = loadSpecification(root)): { files: GeneratedFile[]; refusals: Finding[]; leftOut: string[]; named: string[] } {
  const wordings = approvedWordings(root, spec);
  const { paths, refusals } = typeFiles(root, spec, wordings);
  if (!paths.length) return { files: [], refusals, leftOut: [], named: [...new Set(wordings.named)] };
  const { blocks, refusals: found, leftOut } = declarations(spec, wordings);
  refusals.push(...found);
  const files: GeneratedFile[] = [];
  for (const path of paths) {
    const language = LANGUAGES[extname(path)];
    if (!language) continue;
    const { text, uses, names } = language.write(blocks);
    const used = new Set(uses);
    for (const { name, sid } of names) {
      const why = language.identifier && !language.identifier.test(name) ? `not an identifier in ${language.name}`
        : language.reserved?.words.has(name) ? language.reserved.why
        : used.has(name) ? "a name the file already uses"
        : null;
      if (why) refusals.push({ where: where(spec, sid), message: `its type ${name} cannot be generated in ${path}: ${why}` });
      used.add(name);
    }
    files.push({ path, text });
  }
  const named = [...new Set(wordings.named)];
  return refusals.length ? { files: [], refusals, leftOut, named } : { files, refusals, leftOut, named };
}

/**
 * Writes each generated file that is missing or holds, line endings aside, content other than what the nodes generate, and
 * names it. If anything is refused, the function writes nothing (s-a8fn72xa782wvbk). A project's own generator runs only while
 * the rule that lists it is approved (s-y5yk7eu6h4zrjpr); `waiting` names each draft rule that lists a generator.
 */
export function writeTypes(root: string): { written: string[]; refusals: Finding[]; waiting: string[]; leftOut: string[]; named: string[] } {
  const spec = loadSpecification(root);
  const { files, refusals, leftOut, named } = generateTypes(root, spec);
  const own = runGenerators(root, spec, loadConfig(root));
  const clashing = clashes([...files.map((f) => ({ ...f, by: "sheriff types" })), ...own.files.map((f) => ({ ...f, by: `the generator "${f.generator}"` }))]);
  const refused = [...refusals, ...own.refusals, ...clashing];
  if (refused.length) return { written: [], refusals: refused, waiting: [], leftOut, named };
  const ready = [...files, ...own.files];
  const written: string[] = [];
  for (const f of ready) {
    const path = join(root, f.path);
    if (existsSync(path) && readFileSync(path, "utf8").replace(/\r\n/g, "\n") === f.text) continue;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, f.text);
    written.push(f.path);
  }
  return { written, refusals: [], waiting: own.waiting, leftOut, named };
}
