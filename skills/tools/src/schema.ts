import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { loadConfig, ownerSettings, strictDefault } from "./config.ts";
import { extensionDelivered, schemaDir, toolsVersion } from "./spec-files.ts";

/** A refusal, with the file it is about. */
export interface Refusal {
  where: string;
  message: string;
}

export interface Schema {
  /** The errors of a file of the specification against the schema, each naming the field that is wrong; none where it matches. */
  check(data: unknown): string[];
  /** The errors found when a file of the archive is checked against the schema of a file of the archive and against no other schema (s-hw84ynkvhgzcnpr). */
  checkArchive(data: unknown): string[];
  /** The refusal of the first extension of the schema that is refused; the schema is composed from the extensions that precede it. */
  extension: Refusal[];
  /** Each chosen extension of the guidelines that the plugin does not deliver; where there is one, no command runs (s-mhsb6fjsq5xn6c9). */
  missing: Refusal[];
}

/** Whether a path is a file of the archive (s-f2b5zvc565s242f). */
export const isArchive = (path: string) => path.startsWith("specs/_archive/");
/** Where a project keeps its extension of the schema (s-eferktypcj7njt5). */
export const EXTENSION = "specs/_schema/project.schema.json";
/** Where the settings that choose the extensions of the guidelines are kept. */
const SETTINGS = "sheriff.config.json";

/** What an extension of the schema holds, as the schema of an extension describes it. */
export interface Extension {
  kinds?: Record<string, { needsCode: boolean; schema: Record<string, unknown> }>;
  linkTypes?: string[];
  fields?: Record<string, Record<string, unknown>>;
  file?: Record<string, unknown>;
  link?: Record<string, unknown>;
  $defs?: Record<string, unknown>;
}

type Json = Record<string, any>;

/** The project's extension of the schema, where it keeps one. */
export function readExtension(root: string): Extension | null {
  const path = join(root, EXTENSION);
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Extension) : null;
}

/** The extensions of the guidelines that the project has chosen, in the bytewise order of their names; none where its settings cannot be read. */
function chosenExtensions(root: string): string[] {
  try {
    return [...ownerSettings(loadConfig(root), strictDefault(root)).extensions].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  } catch {
    return [];
  }
}

/**
 * The extensions of the schema, in the order in which they are composed (s-xzcw3hv4hmxz7h7):
 * - the schema of each chosen extension of the guidelines that has one;
 * - the project's own extension, last.
 * Each is read only when its turn comes, so that an extension that is not valid JSON is refused at that point.
 */
function extensionsOf(root: string, given?: Extension): Array<{ where: string; read: () => Extension }> {
  const dir = schemaDir(root);
  const out: Array<{ where: string; read: () => Extension }> = [];
  for (const name of chosenExtensions(root)) {
    const path = join(dir, "extensions", `${name}.schema.json`);
    if (existsSync(path)) out.push({ where: `specs/_schema/extensions/${name}.schema.json`, read: () => JSON.parse(readFileSync(path, "utf8")) as Extension });
  }
  if (given) out.push({ where: EXTENSION, read: () => given });
  else if (existsSync(join(root, EXTENSION))) out.push({ where: EXTENSION, read: () => readExtension(root)! });
  return out;
}

/**
 * The JSON Schema documents in the folder that holds the schemas of the extensions: each file there that has the keyword
 * `$schema`. A file that is not valid JSON is left out here, since the check of the files of the schema refuses it (s-7zqsstgnuc772ba).
 */
function schemaDocuments(dir: string): Json[] {
  const folder = join(dir, "extensions");
  if (!existsSync(folder)) return [];
  const parsed = (name: string): Json | null => {
    try {
      return JSON.parse(readFileSync(join(folder, name), "utf8")) as Json;
    } catch {
      return null;
    }
  };
  return readdirSync(folder)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map(parsed)
    .filter((document): document is Json => document !== null && typeof document.$schema === "string");
}

/** Whether the nodes of a kind need code: every kind does, except a kind that an extension of the schema declares as needing none (s-vsh384ybt4w25a2). */
export function needsCode(root: string): (kind: string) => boolean {
  const kinds: Extension["kinds"] = {};
  for (const { read } of extensionsOf(root)) {
    try {
      Object.assign(kinds, read().kinds ?? {});
    } catch {
      // An extension that cannot be read declares nothing; the schema refuses it.
    }
  }
  return (kind) => kinds[kind]?.needsCode !== false;
}

const propertiesOf = (schema: unknown): string[] => Object.keys(((schema ?? {}) as Json).properties ?? {});

/** The conditions that apply only to a node of the given kind. */
const onKind = (kind: string, schema: unknown) => ({ if: { properties: { kind: { const: kind } }, required: ["kind"] }, then: schema });

/** The properties that a node of the given kind may hold in the composed schema: those of every node, and those set for its kind. */
function heldBy(node: Json, kind: string): Set<string> {
  const held = new Set(Object.keys(node.$defs.base.properties));
  for (const c of node.$defs.node.allOf as Json[]) if (c.if?.properties?.kind?.const === kind) propertiesOf(c.then).forEach((p) => held.add(p));
  return held;
}

/**
 * Adds an extension to the composed schema (s-xzcw3hv4hmxz7h7):
 * - its kinds join the kinds that a node may have, each with the conditions of its schema;
 * - its fields set conditions for a kind that is already composed;
 * - its types of link join the types that a link may have;
 * - its definitions join those of the node schema;
 * - the properties that it defines for a file and for a link join theirs.
 * The conditions go into the definition of a node, so that they also hold for a node in a cell of a TableRule.
 * The function returns each name that the extension would add and the composed schema already holds. It also returns
 * each kind that the extension's fields name and the composed schema does not hold.
 */
function compose(node: Json, file: Json, ext: Extension): string[] {
  const kinds = node.$defs.base.properties.kind.enum as string[];
  const linkTypes = node.$defs.ref.properties.type.enum as string[];
  const conditions = node.$defs.node.allOf as Json[];
  const refused: string[] = [];
  for (const [kind, { schema }] of Object.entries(ext.kinds ?? {})) {
    if (kinds.includes(kind)) refused.push(`kinds/${kind}: the kind is already defined`);
    refused.push(...propertiesOf(schema).filter((p) => p in node.$defs.base.properties).map((p) => `kinds/${kind}: ${p} is already defined`));
    kinds.push(kind);
    conditions.push(onKind(kind, schema));
  }
  for (const [kind, schema] of Object.entries(ext.fields ?? {})) {
    if (!kinds.includes(kind)) refused.push(`fields/${kind}: no kind of that name is defined`);
    const held = heldBy(node, kind);
    refused.push(...propertiesOf(schema).filter((p) => held.has(p)).map((p) => `fields/${kind}: ${p} is already defined`));
    conditions.push(onKind(kind, schema));
  }
  for (const type of ext.linkTypes ?? []) {
    if (linkTypes.includes(type)) refused.push(`linkTypes: ${type} is already defined`);
    else linkTypes.push(type);
  }
  for (const [name, schema] of Object.entries(ext.$defs ?? {})) {
    if (name in node.$defs) refused.push(`$defs: ${name} is already defined`);
    else node.$defs[name] = schema;
  }
  // A file and a link refuse what they do not declare, so their added properties join their own.
  for (const [at, target, added] of [["file", file, ext.file], ["link", node.$defs.ref, ext.link]] as const) {
    for (const [name, schema] of Object.entries(((added ?? {}) as Json).properties ?? {})) {
      if (name in target.properties) refused.push(`${at}: ${name} is already defined`);
      else target.properties[name] = schema;
    }
  }
  return refused;
}

/**
 * What the schema refuses before a command works on the files (s-xzcw3hv4hmxz7h7), each refusal naming its file. The
 * first of these that applies is returned:
 * - each chosen extension that the plugin does not deliver (s-mhsb6fjsq5xn6c9);
 * - the first extension of the schema that is refused, since the files are then not validated;
 * - every refusal in each file.
 */
export function schemaRefusals(root: string, files: Array<{ path: string; data: unknown }>, extension?: Extension): Refusal[] {
  const schema = loadSchema(root, extension);
  if (schema.missing.length) return schema.missing;
  if (schema.extension.length) return schema.extension;
  return files.flatMap((f) => (isArchive(f.path) ? schema.checkArchive(f.data) : schema.check(f.data)).map((message) => ({ where: f.path, message })));
}

/** Each chosen extension of the guidelines whose file the installed plugin does not deliver (s-mhsb6fjsq5xn6c9). */
export function missingExtensions(root: string): Refusal[] {
  return chosenExtensions(root)
    .filter((name) => !extensionDelivered(root, name))
    .map((name) => ({ where: SETTINGS, message: `the chosen extension "${name}" is not delivered by the installed SpecSheriff plugin, whose SpecSheriff tools are version ${toolsVersion()}` }));
}

/**
 * The schema of the repository's specification. Its base is the repository's own schema where the repository writes the
 * SpecSheriff guidelines, and otherwise the schema that the tools carry. The base is composed with the schema of each
 * chosen extension of the guidelines and then with the project's extension. Where `sheriff reindex` has renamed what an
 * earlier release wrote in the project's extension and has not yet written the file, it passes the renamed extension here.
 */
export function loadSchema(root: string, given?: Extension): Schema {
  const dir = schemaDir(root);
  const read = (name: string): Json => JSON.parse(readFileSync(join(dir, name), "utf8"));
  // Every property that the schema of a node declares, for every node or for one kind of node.
  const declared = new Set<string>();
  const collect = (s: unknown): void => {
    if (!s || typeof s !== "object") return;
    if (Array.isArray(s)) return s.forEach(collect);
    for (const [k, v] of Object.entries(s as Json)) {
      if (k === "properties" && v && typeof v === "object") Object.keys(v).forEach((p) => declared.add(p));
      collect(v);
    }
  };
  collect(read("node.schema.json"));
  const errorsOf = (validate: { errors?: Array<{ instancePath: string; message?: string; params: unknown }> | null }) => {
    // The field a message is about, where Ajv keeps it in the error's parameters rather than its path.
    const field = (p: Record<string, unknown>) => p.unevaluatedProperty ?? p.additionalProperty ?? p.missingProperty;
    // A failed condition declares no property. So where a node fails a condition, Ajv also reports each property of the
    // node that the schema does declare as an undeclared property. Such an error names no field that is wrong,
    // and it is dropped. A property that the schema declares nowhere is still refused.
    const errors = (validate.errors ?? []) as Array<{ keyword?: string; instancePath: string; message?: string; params: unknown }>;
    const real = errors.filter((e) => e.keyword !== "unevaluatedProperties").map((e) => e.instancePath);
    const echo = (e: { keyword?: string; instancePath: string; params: unknown }) =>
      e.keyword === "unevaluatedProperties" &&
      declared.has(String((e.params as Record<string, unknown>).unevaluatedProperty)) &&
      real.some((p) => p === e.instancePath || p.startsWith(e.instancePath + "/"));
    return errors.filter((e) => !echo(e)).map((e) => {
      const named = field(e.params as Record<string, unknown>);
      return `${e.instancePath || "/"}: ${e.message}${named === undefined ? "" : `: "${named}"`}`;
    });
  };
  const build = (exts: Extension[]) => {
    const [node, file] = [read("node.schema.json"), read("section-file.schema.json")];
    const refused = exts.flatMap((ext) => compose(node, file, ext));
    const ajv = new Ajv2020({ strict: false, allErrors: true });
    ajv.addSchema(node).addSchema(file);
    // Each JSON Schema document kept beside the schemas of the extensions, such as the meta-schema of a RecordType's schema
    // (s-j4t9vusnsajmqdw), is added, since an extension's schema refers to it by its $id.
    for (const document of schemaDocuments(dir)) ajv.addSchema(document);
    if (existsSync(join(dir, "archive-file.schema.json"))) ajv.addSchema(read("archive-file.schema.json"));
    return { ajv, refused };
  };

  // The extensions are added one at a time, and composing stops at the first that is refused (s-xzcw3hv4hmxz7h7). An
  // extension that is not valid JSON, or that does not compose into a valid JSON Schema, is refused like any other and causes no failure.
  const meta = new Ajv2020({ strict: false }).compile(read("extension.schema.json"));
  const composed: Extension[] = [];
  let extension: Refusal[] = [];
  for (const { where, read: readExt } of extensionsOf(root, given)) {
    let messages: string[];
    try {
      const ext = readExt();
      if (!meta(ext)) messages = errorsOf(meta);
      else {
        const { refused } = build([...composed, ext]);
        messages = refused;
        if (!refused.length) composed.push(ext);
      }
    } catch (error) {
      messages = [`${error instanceof SyntaxError ? "cannot be read" : "composes into no valid schema"}: ${(error as Error).message}`];
    }
    if (messages.length) {
      extension = messages.map((message) => ({ where, message }));
      break;
    }
  }
  const { ajv } = build(composed);
  const validate = ajv.getSchema("section-file.schema.json");
  if (!validate) throw new Error("specs/_schema/section-file.schema.json: not found");
  const archive = ajv.getSchema("archive-file.schema.json");
  return {
    extension,
    missing: missingExtensions(root),
    check(data) {
      return validate(data) ? [] : errorsOf(validate);
    },
    checkArchive(data) {
      if (!archive) return ["specs/_schema/archive-file.schema.json: not found"];
      return archive(data) ? [] : errorsOf(archive);
    },
  };
}
