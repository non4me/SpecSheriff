// Copies into the package what it carries beside its code — the SpecSheriff guidelines and their
// schema, and the grammars it reads code with — and then lays the built tools out in the plugin for
// Claude Code, with the packages they need at runtime, so that installing the plugin builds nothing.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const guidelines = new URL("../guidelines/", import.meta.url);
mkdirSync(guidelines, { recursive: true });
for (const name of ["spec.json", "tools.json"]) cpSync(new URL(`../../../specs/_guidelines/${name}`, import.meta.url), new URL(name, guidelines));
cpSync(new URL("../../../specs/_schema/", import.meta.url), new URL("_schema/", guidelines), { recursive: true });

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

const pkg = fileURLToPath(new URL("..", import.meta.url));
const tools = fileURLToPath(new URL("../../claude-code/tools/", import.meta.url));
rmSync(tools, { recursive: true, force: true });
for (const part of ["package.json", "dist", "grammars", "languages", "guidelines", "assets", "hooks"]) cpSync(join(pkg, part), join(tools, part), { recursive: true });

// ponytail: the dependencies are laid flat, one version of each; nest them if two ever need different versions.
const copied = new Set();
const copyDependencies = (dir) => {
  for (const name of Object.keys(JSON.parse(readFileSync(join(dir, "package.json"), "utf8")).dependencies ?? {})) {
    if (copied.has(name)) continue;
    copied.add(name);
    let at = dir;
    while (!existsSync(join(at, "node_modules", name, "package.json"))) {
      if (dirname(at) === at) throw new Error(`${name}: not installed; run npm install`);
      at = dirname(at);
    }
    cpSync(join(at, "node_modules", name), join(tools, "node_modules", name), { recursive: true });
    copyDependencies(join(at, "node_modules", name));
  }
};
copyDependencies(pkg);

// The release the session start compares the copy in the plugin's data directory with.
const { version } = JSON.parse(readFileSync(join(pkg, "package.json"), "utf8"));
writeFileSync(join(tools, "release"), `${version} built ${new Date().toISOString()}\n`);
