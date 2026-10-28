// Copies the core of the guidelines into the package, as the core the installed sheriff carries.
import { cpSync, mkdirSync } from "node:fs";

const from = new URL("../../../specs/_guidelines/", import.meta.url);
const to = new URL("../core/", import.meta.url);
mkdirSync(to, { recursive: true });
for (const name of ["spec.json", "tools.json"]) cpSync(new URL(name, from), new URL(name, to));
