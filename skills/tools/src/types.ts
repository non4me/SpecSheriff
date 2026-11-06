import { loadConfig } from "./config.ts";
import { runGenerators } from "./generators.ts";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, posix } from "node:path";
import { loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";

/** The base's rule on data structures, which the rule of the stack listing the files of the types implements. */
export const DATA_STRUCTURES = "s-e877bnfa559tvk9";
const STACK = "specs/tech/stack.json";
const SCHEMA = "https://json-schema.org/draft/2020-12/schema";

type Bounds = { minimum?: number; exclusiveMinimum?: number; maximum?: number; exclusiveMaximum?: number };
/** The bounds on how many members a list holds. */
type ListBounds = { minItems?: number; maxItems?: number };
type NeutralType = Bounds & ListBounds & { is: string; values?: string[]; from?: string; kind?: string; of?: NeutralType; record?: string; fields?: Field[] };
type Field = { name: string; type: NeutralType; required: boolean | string };

/** A type as every language is written from it. */
type T =
  | { t: "string"; format?: string }
  | { t: "integer" | "number"; bounds: Bounds }
  | { t: "boolean" | "any" }
  /** The values of a field of type one of; a type in TypeScript or Python names only those in narrowed, where given. */
  | { t: "enum"; values: string[]; narrowed?: string[] }
  | { t: "const"; value: string }
  | { t: "array"; of: T; bounds: ListBounds }
  | { t: "map"; of: T }
  | { t: "ref"; name: string }
  /** The object of a field of type variant, named for the type of its own Python gives it. */
  | { t: "object"; props: Prop[]; closed: boolean; name: string };
type Prop = { name: string; type: T; required: boolean };
type Decl = { name: string; sid: string } & (
  | { kind: "union"; members: string[] }
  | { kind: "object"; props: Prop[]; closed: boolean; refused?: Array<Array<[string, string]>> }
);

export interface GeneratedFile {
  /** From the root of the repository. */
  path: string;
  text: string;
}

const where = (spec: Specification, sid: string) => {
  const at = spec.nodes.get(sid)!;
  return `${at.file.path}: ${sid} (${at.node.location})`;
};

/** The files the rule of the stack lists for the generated types and runtime checks, and what is refused in that list. */
export function typeFiles(spec: Specification): { paths: string[]; refusals: Finding[] } {
  const rules: SpecNode[] = [];
  const walk = (nodes: SpecNode[]) => {
    for (const n of nodes) {
      if (n.list && n.refs.some((r) => r.type === "implements" && r.to === DATA_STRUCTURES)) rules.push(n);
      walk(n.children ?? []);
    }
  };
  walk(spec.files.find((f) => f.path === STACK)?.data.nodes ?? []);
  const [first, ...more] = rules;
  if (!first) return { paths: [], refusals: [] };
  const refusals: Finding[] = more.map((n) => ({ where: where(spec, n.sid), message: `a second list of the files of the generated types and runtime checks, beside the one ${first.sid} defines` }));
  const paths = (first.list as { members: string[] }).members;
  for (const path of paths) {
    if (![".ts", ".py", ".json"].includes(extname(path))) refusals.push({ where: where(spec, first.sid), message: `lists ${path}, a file of neither .ts, .py nor .json` });
    else if (posix.isAbsolute(path) || posix.normalize(path).startsWith("../")) refusals.push({ where: where(spec, first.sid), message: `lists ${path}, which is no path inside the repository` });
  }
  return { paths, refusals };
}

/** The name of a RecordType's type: the first letter of each word of its name raised, and the spaces dropped. */
const typeName = (title: string) => title.split(/\s+/).filter(Boolean).map(raise).join("");
function raise(word: string): string {
  const [first = "", ...rest] = [...word];
  return first.toUpperCase() + rest.join("");
}

/** What the RecordTypes declare, in the order the specification reads, as the declarations each file is written from. */
function declarations(spec: Specification): { decls: Decl[]; refusals: Finding[] } {
  const refusals: Finding[] = [];
  const refuse = (sid: string, message: string) => refusals.push({ where: where(spec, sid), message });
  const reading: SpecNode[] = [];
  const walk = (nodes: SpecNode[]) => nodes.forEach((n) => (reading.push(n), walk(n.children ?? [])));
  for (const f of [...spec.files].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))) walk(f.data.nodes);

  const record = (sid: string | undefined) => {
    const n = sid ? spec.nodes.get(sid)?.node : undefined;
    return n?.kind === "recordType" ? n : undefined;
  };
  const refined = (n: SpecNode) => record(n.refs.find((r) => r.type === "refines" && record(r.to))?.to);
  const chain = (n: SpecNode | undefined): SpecNode[] => {
    const up: SpecNode[] = [];
    for (let c = n; c && !up.includes(c); c = refined(c)) up.push(c);
    return up;
  };
  const fieldsOf = (n: SpecNode) => (n.fields as Field[] | undefined) ?? [];
  const holding = (n: SpecNode, name: string) => chain(n).find((c) => fieldsOf(c).some((f) => f.name === name));

  // The values of each field of type one of a RecordType holds: its own list, or the values gathered beside it,
  // in the order the specification reads them (s-4npdup7mjkva69y).
  const declared = new Map<string, string[]>();
  const declare = (holder: SpecNode, name: string, values: string[]) => {
    const key = `${holder.sid} ${name}`;
    const known = declared.get(key) ?? [];
    declared.set(key, [...known, ...values.filter((v, i) => !known.includes(v) && values.indexOf(v) === i)]);
  };
  for (const n of reading) {
    if (n.kind !== "recordType") continue;
    for (const f of fieldsOf(n) as Array<Field & { gathered?: Array<{ value: string }> }>) {
      if (f.type.is !== "one of") continue;
      declare(n, f.name, f.type.from ? (f.gathered ?? []).map((g) => g.value) : (f.type.values ?? []));
    }
  }
  const valuesOf = (holder: SpecNode | null, name: string, type: NeutralType) => (holder ? declared.get(`${holder.sid} ${name}`) : undefined) ?? [...new Set(type.values ?? [])];

  const resolve = (sid: string, type: NeutralType, holder: SpecNode | null, name: string, seen: string[] = []): T => {
    const bounds = (keys: Array<keyof Bounds | keyof ListBounds> = ["minimum", "exclusiveMinimum", "maximum", "exclusiveMaximum"]) =>
      Object.fromEntries(keys.filter((k) => type[k] !== undefined).map((k) => [k, type[k]]));
    switch (type.is) {
      case "email address": return { t: "string", format: "email" };
      case "instant": return { t: "string", format: "date-time" };
      case "date": return { t: "string", format: "date" };
      case "duration": return { t: "string", format: "duration" };
      case "whole number": return { t: "integer", bounds: bounds() };
      case "number": return { t: "number", bounds: bounds() };
      case "yes/no": return { t: "boolean" };
      case "any value": return { t: "any" };
      case "one of": return { t: "enum", values: valuesOf(holder, name, type) };
      case "list of": return { t: "array", of: resolve(sid, type.of!, null, name, seen), bounds: bounds(["minItems", "maxItems"]) };
      case "map of": return { t: "map", of: resolve(sid, type.of!, null, name, seen) };
      case "record": {
        const named = record(type.record);
        if (!named) refuse(sid, `${name} is a record of ${type.record}, which names no RecordType`);
        return { t: "ref", name: named ? typeName(named.title) : "" };
      }
      case "identifier of": {
        const named = record(type.record);
        const by = named?.identifiedBy as string | undefined;
        let found: { holder: SpecNode | null; field: Field } | undefined;
        for (const c of chain(named)) {
          const own = fieldsOf(c).find((f) => f.name === by);
          const held = fieldsOf(c).flatMap((f) => (f.type.is === "variant" ? (f.type.fields ?? []) : [])).find((f) => f.name === by);
          found ??= own ? { holder: c, field: own } : held ? { holder: null, field: held } : undefined;
        }
        if (!named || !found) {
          refuse(sid, `${name} is an identifier of ${type.record}, which names no field identifying it`);
          return { t: "any" };
        }
        if (seen.includes(named.sid)) {
          refuse(sid, `${name} is an identifier the identifying fields of ${seen.join(", ")} lead back to`);
          return { t: "any" };
        }
        return resolve(sid, found.field.type, found.holder, found.field.name, [...seen, named.sid]);
      }
      default: return { t: "string" };
    }
  };

  /** A field as a property of a type; a field of type variant holds what its object declares, and is left out where that is nothing. */
  const prop = (owner: SpecNode, typeOf: string, holder: SpecNode | null, f: Field, closed: boolean, inside: Array<{ holder: SpecNode | null; field: Field }> = []): Prop | null => {
    if (f.type.is !== "variant") return { name: f.name, type: resolve(owner.sid, f.type, holder, f.name), required: f.required === true };
    const held = [...(f.type.fields ?? []).map((field) => ({ holder: null, field })), ...inside];
    if (!held.length) return null;
    const props = held.map((h) => prop(owner, typeOf, h.holder, h.field, closed)).filter((p): p is Prop => p !== null);
    return { name: f.name, type: { t: "object", props, closed, name: `${typeOf}${raise(f.name)}` }, required: true };
  };
  const inherited = (n: SpecNode) => chain(n).reverse().flatMap((c) => fieldsOf(c).map((field) => ({ holder: c, field })));

  const decls: Decl[] = [];
  const records = reading.filter((n) => n.kind === "recordType");
  for (const n of records) {
    const variantFields = chain(n).flatMap((c) => fieldsOf(c).filter((f) => f.type.is === "variant"));
    if (variantFields.length > 1) refuse(n.sid, `holds two fields of type variant, its inherited ones counted: ${variantFields.map((f) => f.name).join(", ")}`);
  }
  for (const n of records) {
    const name = typeName(n.title);
    const closed = n.unknown === "refused";
    const parent = n.answersTo ? refined(n) : undefined;
    if (parent) {
      // A variant: each choosing field fixed to the value it answers to, its own fields inside the field of
      // type variant, or beside the RecordType's where there is none.
      const answersTo = n.answersTo as Record<string, string>;
      const fields = inherited(parent);
      const mine = fieldsOf(n).map((field) => ({ holder: n, field }));
      const holdsVariant = fields.some((h) => h.field.type.is === "variant");
      const props = fields.map((h) =>
        h.field.name in answersTo
          ? { name: h.field.name, type: { t: "const", value: answersTo[h.field.name]! } as T, required: true }
          : prop(n, name, h.holder, h.field, closed, mine),
      );
      if (!holdsVariant) props.push(...mine.map((h) => prop(n, name, h.holder, h.field, closed)));
      decls.push({ name, sid: n.sid, kind: "object", props: props.filter((p): p is Prop => p !== null), closed });
      continue;
    }
    const variants = records.filter((v) => v.answersTo && refined(v) === n);
    const props = (other: string) => inherited(n).map((h) => prop(n, other, h.holder, h.field, closed)).filter((p): p is Prop => p !== null);
    if (!variants.length) {
      decls.push({ name, sid: n.sid, kind: "object", props: props(name), closed });
      continue;
    }
    // A RecordType its variants refine: the union of each variant, and of a member for the
    // combinations of the choosing fields' values no variant answers to.
    const choosing = (chain(n).find((c) => c.chosenBy)?.chosenBy as string[] | undefined) ?? [];
    const values = choosing.map((k) => {
      const holder = holding(n, k);
      const f = holder && fieldsOf(holder).find((x) => x.name === k);
      return holder && f ? valuesOf(holder, k, f.type) : [];
    });
    const combinations = values.reduce<string[][]>((all, vs) => all.flatMap((c) => vs.map((v) => [...c, v])), [[]]);
    const answered = variants.map((v) => choosing.map((k) => (v.answersTo as Record<string, string>)[k] ?? ""));
    const key = (c: string[]) => JSON.stringify(c);
    const other = combinations.some((c) => !answered.some((a) => key(a) === key(c))) ? `${name}Other` : null;
    decls.push({ name, sid: n.sid, kind: "union", members: [...variants.map((v) => typeName(v.title)), ...(other ? [other] : [])] });
    if (!other) continue;
    const otherProps = props(other).map((p) => {
      const i = choosing.indexOf(p.name);
      if (i < 0 || choosing.length > 1 || p.type.t !== "enum") return p;
      return { ...p, type: { ...p.type, narrowed: p.type.values.filter((v) => !answered.some((a) => a[i] === v)) } };
    });
    const refused = answered.map((a) => choosing.map((k, i) => [k, a[i]!] as [string, string]));
    decls.push({ name: other, sid: n.sid, kind: "object", props: otherProps, closed, refused });
  }
  return { decls, refusals };
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

interface Language {
  name: string;
  identifier?: RegExp;
  reserved?: { words: Set<string>; why: string };
  /** The file's text, and the names it uses from outside itself. */
  write(decls: Decl[]): { text: string; uses: string[] };
  /** The names the file declares, each with the sid it is tagged with. */
  names(decls: Decl[]): Array<{ name: string; sid: string }>;
}

const narrowedOf = (t: Extract<T, { t: "enum" }>) => t.narrowed ?? t.values;
const objects = (props: Prop[]) => props.flatMap((p) => (p.type.t === "object" ? [p.type] : []));

const typescript: Language = {
  name: "TypeScript",
  identifier: /^[\p{ID_Start}$_][\p{ID_Continue}$‌‍]*$/u,
  reserved: { words: TS_RESERVED, why: "a word TypeScript reserves" },
  names: (decls) => decls.map(({ name, sid }) => ({ name, sid })),
  write(decls) {
    const uses = new Set<string>();
    const type = (t: T, indent: string): string => {
      switch (t.t) {
        case "string": return "string";
        case "integer": case "number": return "number";
        case "boolean": return "boolean";
        case "any": return "unknown";
        case "enum": return narrowedOf(t).map((v) => JSON.stringify(v)).join(" | ") || "never";
        case "const": return JSON.stringify(t.value);
        case "array": return t.of.t === "enum" && narrowedOf(t.of).length > 1 ? `(${type(t.of, indent)})[]` : `${type(t.of, indent)}[]`;
        case "map": return uses.add("Record"), `Record<string, ${type(t.of, indent)}>`;
        case "ref": return t.name;
        case "object": return object(t.props, indent);
      }
    };
    const object = (props: Prop[], indent: string) =>
      props.length ? `{\n${props.map((p) => `${indent}  ${p.name}${p.required ? "" : "?"}: ${type(p.type, `${indent}  `)};`).join("\n")}\n${indent}}` : "{}";
    const text = decls.map((d) => `/** @spec ${d.sid} */\nexport type ${d.name} = ${d.kind === "union" ? d.members.join(" | ") : object(d.props, "")};\n`).join("\n");
    return { text, uses: [...uses] };
  },
};

const python: Language = {
  name: "Python",
  identifier: /^[\p{XID_Start}_]\p{XID_Continue}*$/u,
  reserved: { words: PY_KEYWORDS, why: "a keyword of Python" },
  names: (decls) => decls.flatMap((d) => [{ name: d.name, sid: d.sid }, ...(d.kind === "object" ? objects(d.props).map((o) => ({ name: o.name, sid: d.sid })) : [])]),
  write(decls) {
    const typing = new Set<string>();
    const builtins = new Set<string>();
    const literal = (values: string[]) => (typing.add("Literal"), `Literal[${values.map((v) => JSON.stringify(v)).join(", ")}]`);
    const type = (t: T): string => {
      switch (t.t) {
        case "string": return builtins.add("str"), "str";
        case "integer": return builtins.add("int"), "int";
        case "number": return builtins.add("float"), "float";
        case "boolean": return builtins.add("bool"), "bool";
        case "any": return typing.add("Any"), "Any";
        case "enum": return literal(narrowedOf(t));
        case "const": return literal([t.value]);
        case "array": return builtins.add("list"), `list[${type(t.of)}]`;
        case "map": return builtins.add("dict").add("str"), `dict[str, ${type(t.of)}]`;
        case "ref": return JSON.stringify(t.name);
        case "object": return JSON.stringify(t.name);
      }
    };
    const field = (p: Prop) => (p.required ? type(p.type) : (typing.add("NotRequired"), `NotRequired[${type(p.type)}]`));
    const typedDict = (sid: string, name: string, props: Prop[]): string => {
      typing.add("TypedDict");
      const body = props.length ? `{\n${props.map((p) => `    ${JSON.stringify(p.name)}: ${field(p)},`).join("\n")}\n}` : "{}";
      return [`# @spec ${sid}\n${name} = TypedDict(${JSON.stringify(name)}, ${body})\n`, ...objects(props).map((o) => typedDict(sid, o.name, o.props))].join("\n");
    };
    const body = decls.map((d) => (d.kind === "union" ? (typing.add("Union"), `# @spec ${d.sid}\n${d.name} = Union[${d.members.map((m) => JSON.stringify(m)).join(", ")}]\n`) : typedDict(d.sid, d.name, d.props))).join("\n");
    const text = typing.size ? `from typing import ${[...typing].sort().join(", ")}\n\n${body}` : body;
    return { text, uses: [...typing, ...builtins] };
  },
};

const jsonSchema: Language = {
  name: "JSON Schema",
  names: (decls) => decls.map(({ name, sid }) => ({ name, sid })),
  write(decls) {
    const type = (t: T): object => {
      switch (t.t) {
        case "string": return { type: "string", ...(t.format ? { format: t.format } : {}) };
        case "integer": case "number": return { type: t.t, ...t.bounds };
        case "boolean": return { type: "boolean" };
        case "any": return {};
        case "enum": return { enum: t.values };
        case "const": return { const: t.value };
        case "array": return { type: "array", items: type(t.of), ...t.bounds };
        case "map": return { type: "object", additionalProperties: type(t.of) };
        case "ref": return { $ref: `#/$defs/${t.name}` };
        case "object": return object(t.props, t.closed);
      }
    };
    const object = (props: Prop[], closed: boolean, refused?: Array<Array<[string, string]>>) => {
      const required = props.filter((p) => p.required).map((p) => p.name);
      return {
        type: "object",
        properties: Object.fromEntries(props.map((p) => [p.name, type(p.type)])),
        ...(required.length ? { required } : {}),
        ...(closed ? { additionalProperties: false } : {}),
        ...(refused?.length ? { not: { anyOf: refused.map((c) => ({ properties: Object.fromEntries(c.map(([k, v]) => [k, { const: v }])), required: c.map(([k]) => k) })) } } : {}),
      };
    };
    const defs = Object.fromEntries(decls.map((d) => [d.name, d.kind === "union" ? { oneOf: d.members.map((m) => ({ $ref: `#/$defs/${m}` })) } : object(d.props, d.closed, d.refused)]));
    return { text: JSON.stringify({ $schema: SCHEMA, $defs: defs }, null, 2) + "\n", uses: [] };
  },
};

const LANGUAGES: Record<string, Language> = { ".ts": typescript, ".py": python, ".json": jsonSchema };

/** The files the RecordTypes generate, or what refuses them; nothing where the technical appendix lists no files. */
export function generateTypes(spec: Specification): { files: GeneratedFile[]; refusals: Finding[] } {
  const { paths, refusals } = typeFiles(spec);
  if (!paths.length) return { files: [], refusals };
  const { decls, refusals: found } = declarations(spec);
  refusals.push(...found);
  const files: GeneratedFile[] = [];
  for (const path of paths) {
    const language = LANGUAGES[extname(path)];
    if (!language) continue;
    const { text, uses } = language.write(decls);
    const used = new Set(uses);
    for (const { name, sid } of language.names(decls)) {
      const why = language.identifier && !language.identifier.test(name) ? `not an identifier in ${language.name}`
        : language.reserved?.words.has(name) ? language.reserved.why
        : used.has(name) ? "a name the file already uses"
        : null;
      if (why) refusals.push({ where: where(spec, sid), message: `its type ${name} cannot be generated in ${path}: ${why}` });
      used.add(name);
    }
    files.push({ path, text });
  }
  return refusals.length ? { files: [], refusals } : { files, refusals };
}

/**
 * Writes each generated file that is missing or holds, line endings aside, anything else than what the
 * nodes generate, and names it; writes nothing where anything is refused.
 */
/** The RecordTypes not yet approved, which the code generated from the nodes waits for (s-kh8qcd5kxgh9z3j). */
export function waitingRecords(spec: Specification): string[] {
  return [...spec.nodes].filter(([, { node }]) => node.kind === "recordType" && node.status !== "approved").map(([sid]) => sid);
}

export function writeTypes(root: string): { written: string[]; refusals: Finding[]; waiting: string[] } {
  const spec = loadSpecification(root);
  const { files, refusals } = generateTypes(spec);
  const own = runGenerators(root, spec, loadConfig(root));
  if (refusals.length || own.refusals.length) return { written: [], refusals: [...refusals, ...own.refusals], waiting: [] };
  // Each file waits only for the nodes it is generated from (s-kh8qcd5kxgh9z3j): the types for the RecordTypes, a
  // generator's file for its own nodes and the rule listing its generator.
  const records = waitingRecords(spec);
  const ready = [...(records.length ? [] : files), ...own.files.filter((f) => !f.waiting.length)];
  const waiting = [...records, ...own.waiting.filter((s) => !records.includes(s))];
  const written: string[] = [];
  for (const f of ready) {
    const path = join(root, f.path);
    if (existsSync(path) && readFileSync(path, "utf8").replace(/\r\n/g, "\n") === f.text) continue;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, f.text);
    written.push(f.path);
  }
  return { written, refusals: [], waiting };
}
