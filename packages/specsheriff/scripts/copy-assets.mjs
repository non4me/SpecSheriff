// Copies into the package what it carries beside its code: the core of the guidelines, as the core
// the installed sheriff carries, and the grammars it reads code with, so that installing it builds nothing.
import { cpSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { basename } from "node:path";

const require = createRequire(import.meta.url);
const core = new URL("../core/", import.meta.url);
mkdirSync(core, { recursive: true });
for (const name of ["spec.json", "tools.json"]) cpSync(new URL(`../../../specs/_guidelines/${name}`, import.meta.url), new URL(name, core));
cpSync(new URL("../../../specs/_schema/", import.meta.url), new URL("_schema/", core), { recursive: true });

const grammars = new URL("../grammars/", import.meta.url);
mkdirSync(grammars, { recursive: true });
for (const wasm of [
  "tree-sitter-typescript/tree-sitter-typescript.wasm",
  "tree-sitter-typescript/tree-sitter-tsx.wasm",
  "tree-sitter-javascript/tree-sitter-javascript.wasm",
  "tree-sitter-python/tree-sitter-python.wasm",
]) {
  cpSync(require.resolve(wasm), new URL(basename(wasm), grammars));
}
