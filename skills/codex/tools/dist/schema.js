import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { CARRIED, takesGuidelines } from "./spec-files.js";
/** The files of the schema of the SpecSheriff guidelines, which the plugin carries to every project. */
export const SCHEMA_FILES = ["node.schema.json", "section-file.schema.json", "extension.schema.json"];
/** Where a project keeps its extension of the schema (s-eferktypcj7njt5). */
export const EXTENSION = "specs/_schema/project.schema.json";
/** The project's extension of the schema, where it keeps one. */
export function readExtension(root) {
    const path = join(root, EXTENSION);
    return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
}
/** Whether the nodes of a kind need code: every kind does but one the extension declares as needing none (s-vsh384ybt4w25a2). */
export function needsCode(root) {
    const kinds = readExtension(root)?.kinds ?? {};
    return (kind) => kinds[kind]?.needsCode !== false;
}
const propertiesOf = (schema) => Object.keys((schema ?? {}).properties ?? {});
/**
 * Composes the extension with the schema, each addition a condition beside those the schema sets: its kinds
 * join the kinds a node may have, each kind's schema and each kind's added fields hold where the node is of that
 * kind, and the properties of a file and of a link join theirs. Returns the names the schema already defines.
 */
function compose(node, file, ext) {
    const base = node.$defs.base.properties;
    const redefined = [];
    const onKind = (kind, schema) => ({ if: { properties: { kind: { const: kind } }, required: ["kind"] }, then: schema });
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
    for (const [at, target, added] of [["file", file, ext.file], ["link", node.$defs.ref, ext.link]]) {
        for (const [name, schema] of Object.entries((added ?? {}).properties ?? {})) {
            if (name in target.properties)
                redefined.push(`${at}: ${name}`);
            else
                target.properties[name] = schema;
        }
    }
    return redefined;
}
/**
 * What the schema refuses before a command works on the files (s-xzcw3hv4hmxz7h7), each with where it is: the
 * project's extension alone where the schema of an extension refuses it, since nothing is then composed to validate
 * the files against, else every refusal in each file.
 */
export function schemaRefusals(root, files) {
    const schema = loadSchema(root);
    if (schema.extension.length)
        return schema.extension.map((message) => ({ where: EXTENSION, message }));
    return files.flatMap((f) => schema.check(f.data).map((message) => ({ where: f.path, message })));
}
/** The schema of the repository's specification: its own where it writes the SpecSheriff guidelines, else the one the tools carry, composed with the project's extension. */
export function loadSchema(root) {
    const dir = takesGuidelines(root) ? join(CARRIED, "_schema") : join(root, "specs", "_schema");
    const read = (name) => JSON.parse(readFileSync(join(dir, name), "utf8"));
    const errorsOf = (validate) => {
        // The field a message is about, where Ajv keeps it in the error's parameters rather than its path.
        const field = (p) => p.unevaluatedProperty ?? p.additionalProperty ?? p.missingProperty;
        return (validate.errors ?? []).map((e) => {
            const named = field(e.params);
            return `${e.instancePath || "/"}: ${e.message}${named === undefined ? "" : `: "${named}"`}`;
        });
    };
    const build = (ext) => {
        const [node, file] = [read("node.schema.json"), read("section-file.schema.json")];
        const redefined = ext ? compose(node, file, ext) : [];
        const ajv = new Ajv2020({ strict: false, allErrors: true });
        ajv.addSchema(node).addSchema(file);
        return { ajv, redefined };
    };
    // An extension that is no JSON, or composes into no JSON Schema, is refused as any other, never failed on (s-xzcw3hv4hmxz7h7).
    let extension = [];
    let ext = null;
    try {
        ext = readExtension(root);
    }
    catch (error) {
        extension = [`cannot be read: ${error.message}`];
    }
    if (ext) {
        const meta = new Ajv2020({ strict: false }).compile(read("extension.schema.json"));
        if (!meta(ext))
            extension = errorsOf(meta);
        else {
            try {
                const { redefined } = build(ext);
                extension = redefined.map((r) => `${r} is already defined by the schema of the SpecSheriff guidelines`);
            }
            catch (error) {
                extension = [`composes into no valid schema: ${error.message}`];
            }
        }
    }
    const compiled = (with_) => build(with_).ajv.getSchema("section-file.schema.json");
    let validate;
    try {
        validate = compiled(ext && !extension.length ? ext : null);
    }
    catch (error) {
        extension = [`composes into no valid schema: ${error.message}`];
        validate = compiled(null);
    }
    if (!validate)
        throw new Error("specs/_schema/section-file.schema.json: not found");
    return {
        extension,
        check(data) {
            return validate(data) ? [] : errorsOf(validate);
        },
    };
}
