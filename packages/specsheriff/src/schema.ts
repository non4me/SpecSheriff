import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Ajv2020 } from "ajv/dist/2020.js";

export interface Schema {
  /** The errors of a file of the specification against the schema, each naming the field that is wrong; none where it matches. */
  check(data: unknown): string[];
}

export function loadSchema(root: string): Schema {
  const ajv = new Ajv2020({ strict: false });
  const dir = join(root, "specs", "_schema");
  for (const name of readdirSync(dir).filter((n) => n.endsWith(".schema.json"))) {
    ajv.addSchema(JSON.parse(readFileSync(join(dir, name), "utf8")));
  }
  const validate = ajv.getSchema("section-file.schema.json");
  if (!validate) throw new Error("specs/_schema/section-file.schema.json: not found");
  return {
    check(data) {
      if (validate(data)) return [];
      return (validate.errors ?? []).map((e) => `${e.instancePath || "/"}: ${e.message}`);
    },
  };
}
