import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { CARRIED, takesGuidelines } from "./spec-files.ts";

export interface Schema {
  /** The errors of a file of the specification against the schema, each naming the field that is wrong; none where it matches. */
  check(data: unknown): string[];
  /** The errors of the project's extension of the schema; where there are any, the schema is used without it. */
  extension: string[];
}

/** The files of the schema of the SpecSheriff guidelines, which the plugin carries to every project. */
export const SCHEMA_FILES = ["node.schema.json", "section-file.schema.json", "extension.schema.json"];
/** Where a project keeps its extension of the schema (s-eferktypcj7njt5). */
export const EXTENSION = "specs/_schema/project.schema.json";

/** What a project's extension holds, as the schema of an extension describes it. */
export interface Extension {
  kinds?: Record<string, { needsCode: boolean; schema: Record<string, unknown> }>;
  fields?: Record<string, Record<string, unknown>>;
  file?: Record<string, unknown>;
  link?: Record<string, unknown>;
}

type Json = Record<string, any>;

/** The project's extension of the schema, where it keeps one. */
export function readExtension(root: string): Extension | null {
  const path = join(root, EXTENSION);
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Extension) : null;
}

/** Whether the nodes of a kind need code: every kind does but one the extension declares as needing none (s-vsh384ybt4w25a2). */
export function needsCode(root: string): (kind: string) => boolean {
  const kinds = readExtension(root)?.kinds ?? {};
  return (kind) => kinds[kind]?.needsCode !== false;
}

const propertiesOf = (schema: unknown): string[] => Object.keys(((schema ?? {}) as Json).properties ?? {});

/**
 * Composes the extension with the schema, each addition a condition beside those the schema sets: its kinds
 * join the kinds a node may have, each kind's schema and each kind's added fields hold where the node is of that
 * kind, and the properties of a file and of a link join theirs. Returns the names the schema already defines.
 */
function compose(node: Json, file: Json, ext: Extension): string[] {
  const base = node.$defs.base.properties as Json;
  const redefined: string[] = [];
  const onKind = (kind: string, schema: Record<string, unknown>) => ({ if: { properties: { kind: { const: kind } }, required: ["kind"] }, then: schema });
  for (const [kind, { schema }] of Object.entries(ext.kinds ?? {})) {
    redefined.push(...propertiesOf(schema).filter((p) => p in base).map((p) => `kinds/${kind}: ${p}`));
    base.kind.enum.push(kind);
    node.allOf.push(onKind(kind, schema));
  }
  for (const [kind, schema] of Object.entries(ext.fields ?? {})) {
    redefined.push(...propertiesOf(schema).filter((p) => p in base).map((p) => `fields/${kind}: ${p}`));
    node.allOf.push(onKind(kind, schema));
  }
  // A file and a link refuse what they do not declare, so their added properties join their own.
  for (const [at, target, added] of [["file", file, ext.file], ["link", node.$defs.ref, ext.link]] as const) {
    for (const [name, schema] of Object.entries(((added ?? {}) as Json).properties ?? {})) {
      if (name in target.properties) redefined.push(`${at}: ${name}`);
      else target.properties[name] = schema;
    }
  }
  return redefined;
}

/**
 * What the schema refuses before a command works on the files (s-xzcw3hv4hmxz7h7), each with where it is: the
 * project's extension alone where the schema of an extension refuses it, since nothing is then composed to validate
 * the files against, else every refusal in each file.
 */
export function schemaRefusals(root: string, files: Array<{ path: string; data: unknown }>, extension?: Extension): Array<{ where: string; message: string }> {
  const schema = loadSchema(root, extension);
  if (schema.extension.length) return schema.extension.map((message) => ({ where: EXTENSION, message }));
  return files.flatMap((f) => schema.check(f.data).map((message) => ({ where: f.path, message })));
}

/**
 * The schema of the repository's specification: its own where it writes the SpecSheriff guidelines, else the one the
 * tools carry, composed with the project's extension, or with the one given where the reindex has renamed what an
 * earlier release wrote in it and not yet written it.
 */
export function loadSchema(root: string, given?: Extension): Schema {
  const dir = takesGuidelines(root) ? join(CARRIED, "_schema") : join(root, "specs", "_schema");
  const read = (name: string): Json => JSON.parse(readFileSync(join(dir, name), "utf8"));
  const errorsOf = (validate: { errors?: Array<{ instancePath: string; message?: string; params: unknown }> | null }) => {
    // The field a message is about, where Ajv keeps it in the error's parameters rather than its path.
    const field = (p: Record<string, unknown>) => p.unevaluatedProperty ?? p.additionalProperty ?? p.missingProperty;
    return (validate.errors ?? []).map((e) => {
      const named = field(e.params as Record<string, unknown>);
      return `${e.instancePath || "/"}: ${e.message}${named === undefined ? "" : `: "${named}"`}`;
    });
  };
  const build = (ext: Extension | null) => {
    const [node, file] = [read("node.schema.json"), read("section-file.schema.json")];
    const redefined = ext ? compose(node, file, ext) : [];
    const ajv = new Ajv2020({ strict: false, allErrors: true });
    ajv.addSchema(node).addSchema(file);
    return { ajv, redefined };
  };

  // An extension that is no JSON, or composes into no JSON Schema, is refused as any other, never failed on (s-xzcw3hv4hmxz7h7).
  let extension: string[] = [];
  let ext: Extension | null = null;
  try {
    ext = given ?? readExtension(root);
  } catch (error) {
    extension = [`cannot be read: ${(error as Error).message}`];
  }
  if (ext) {
    const meta = new Ajv2020({ strict: false }).compile(read("extension.schema.json"));
    if (!meta(ext)) extension = errorsOf(meta);
    else {
      try {
        const { redefined } = build(ext);
        extension = redefined.map((r) => `${r} is already defined by the schema of the SpecSheriff guidelines`);
      } catch (error) {
        extension = [`composes into no valid schema: ${(error as Error).message}`];
      }
    }
  }
  const compiled = (with_: Extension | null) => build(with_).ajv.getSchema("section-file.schema.json");
  let validate: ReturnType<typeof compiled>;
  try {
    validate = compiled(ext && !extension.length ? ext : null);
  } catch (error) {
    extension = [`composes into no valid schema: ${(error as Error).message}`];
    validate = compiled(null);
  }
  if (!validate) throw new Error("specs/_schema/section-file.schema.json: not found");
  return {
    extension,
    check(data) {
      return validate(data) ? [] : errorsOf(validate);
    },
  };
}
