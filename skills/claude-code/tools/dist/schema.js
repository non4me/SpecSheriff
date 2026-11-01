import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";
import { CARRIED, takesGuidelines } from "./spec-files.js";
/** The schema of the repository's specification: its own where it writes the SpecSheriff guidelines, else the one the tools carry. */
export function loadSchema(root) {
    const ajv = new Ajv2020({ strict: false });
    const dir = takesGuidelines(root) ? join(CARRIED, "_schema") : join(root, "specs", "_schema");
    for (const name of readdirSync(dir).filter((n) => n.endsWith(".schema.json"))) {
        ajv.addSchema(JSON.parse(readFileSync(join(dir, name), "utf8")));
    }
    const validate = ajv.getSchema("section-file.schema.json");
    if (!validate)
        throw new Error("specs/_schema/section-file.schema.json: not found");
    return {
        check(data) {
            if (validate(data))
                return [];
            // The field a message is about, where Ajv keeps it in the error's parameters rather than its path.
            const field = (p) => p.unevaluatedProperty ?? p.additionalProperty ?? p.missingProperty;
            return (validate.errors ?? []).map((e) => {
                const named = field(e.params);
                return `${e.instancePath || "/"}: ${e.message}${named === undefined ? "" : `: "${named}"`}`;
            });
        },
    };
}
