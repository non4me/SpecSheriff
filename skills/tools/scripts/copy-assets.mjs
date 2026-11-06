// Copies into the package what it carries beside its code — the SpecSheriff guidelines and their
// schema, and the grammars it reads code with — and then lays the built tools out in the two plugins,
// with the packages they need at runtime, so that installing a plugin builds nothing. The plugin for
// Claude Code is the source of the skills and the agent hooks' scripts; the plugin for Codex CLI takes
// them from it, each skill with what Codex needs of its own.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const guidelines = new URL("../guidelines/", import.meta.url);
mkdirSync(guidelines, { recursive: true });
for (const name of ["spec.json", "tools.json"]) cpSync(new URL(`../../../specs/_guidelines/${name}`, import.meta.url), new URL(name, guidelines));
// The schema's own files only, so that this repository's extension of it, were it to keep one, reaches no project.
mkdirSync(new URL("_schema/", guidelines), { recursive: true });
for (const name of ["node.schema.json", "section-file.schema.json", "extension.schema.json"]) {
  cpSync(new URL(`../../../specs/_schema/${name}`, import.meta.url), new URL(`_schema/${name}`, guidelines));
}

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

/** The directory a package is installed in, found as Node finds it, since a package's exports may hide its own files. */
function installedAt(name) {
  for (let at = fileURLToPath(new URL("..", import.meta.url)); ; at = dirname(at)) {
    if (existsSync(join(at, "node_modules", name, "package.json"))) return join(at, "node_modules", name);
    if (dirname(at) === at) throw new Error(`${name}: not installed; run npm install`);
  }
}

// The libraries the map's web page carries, so that it loads nothing from the network: each file starts with the
// licence notice of every library it holds. markmap-view's file holds two libraries no package installs, whose
// notices are kept beside this script; the build stops where the file holds another release of them.
const map = new URL("../map/", import.meta.url);
rmSync(map, { recursive: true, force: true });
mkdirSync(map, { recursive: true });
const installed = (name) => {
  const dir = installedAt(name);
  return { name, version: JSON.parse(readFileSync(join(dir, "package.json"), "utf8")).version, licence: readFileSync(join(dir, "LICENSE"), "utf8") };
};
const kept = (name, version) => ({ name, version, licence: readFileSync(new URL(`bundled-licences/${name.replace("/", "-")}-${version}`, import.meta.url), "utf8") });
const notices = (libraries) =>
  `/*!\n${libraries.map((l) => [` * ${l.name} ${l.version}`, " *", ...l.licence.trimEnd().split(/\r?\n/).map((line) => ` * ${line}`.trimEnd())].join("\n")).join("\n *\n")}\n */\n`;
const view = readFileSync(join(installedAt("markmap-view"), "dist", "browser", "index.js"), "utf8");
if (!view.includes("@gera2ld/jsx-dom v2.2.2")) throw new Error("markmap-view holds another release of @gera2ld/jsx-dom: keep its notice in scripts/bundled-licences/");
if (!/const version\$?\d* = "2\.1\.2";[^]{0,1000}?function flextree\(/.test(view)) throw new Error("markmap-view holds another release of d3-flextree: keep its notice in scripts/bundled-licences/");
const carried = {
  "d3.js": notices(["d3", "internmap", "delaunator", "robust-predicates"].map(installed)) + readFileSync(join(installedAt("d3"), "dist", "d3.min.js"), "utf8"),
  "markmap-view.js": notices([installed("markmap-view"), kept("@gera2ld/jsx-dom", "2.2.2"), kept("d3-flextree", "2.1.2")]) + view,
};
for (const [name, text] of Object.entries(carried)) {
  // A script ends at the first `</script` the page holds, whatever the script's own syntax.
  if (/<\/script/i.test(text)) throw new Error(`${name} holds </script and cannot be carried inside the map's web page`);
  writeFileSync(new URL(name, map), text);
}

const pkg = fileURLToPath(new URL("..", import.meta.url));
const claude = fileURLToPath(new URL("../../claude-code/", import.meta.url));
const codex = fileURLToPath(new URL("../../codex/", import.meta.url));
const { version } = JSON.parse(readFileSync(join(pkg, "package.json"), "utf8"));
const built = `${version} built ${new Date().toISOString()}\n`;

/** Lays the built tools out in a plugin's `tools/`, naming beside the release the agent whose runner they take. */
function layOut(plugin, agent) {
  const tools = join(plugin, "tools");
  rmSync(tools, { recursive: true, force: true });
  for (const part of ["package.json", "dist", "grammars", "languages", "guidelines", "assets", "hooks", "map"]) cpSync(join(pkg, part), join(tools, part), { recursive: true });

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

  // The release the session start and the git hooks compare, and the agent whose runner the tools take.
  writeFileSync(join(tools, "release"), built);
  writeFileSync(join(tools, "agent"), `${agent}\n`);
}
layOut(claude, "claude");
layOut(codex, "codex");

/**
 * What a skill of the plugin for Codex CLI holds in place of the plugin for Claude Code's: each text found
 * exactly once in the skills it names, so that a change to a skill that leaves an overlay behind stops the
 * build rather than slipping through.
 */
const SHERIFF = '`node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`';
const OVERLAYS = [
  {
    skills: ["spec", "spec-review", "spec-adopt", "spec-init", "spec-remove"],
    from: SHERIFF,
    to: '`node "<plugin>/tools/dist/cli.js"`, `<plugin>` being the directory\nof this plugin, which holds this skill as `<plugin>/skills/<skill>/SKILL.md`',
  },
  { skills: ["spec-init"], from: "its git hooks, the plugin declared for every clone,", to: "its git hooks, the agent's hooks for Codex," },
  { skills: ["spec-init"], from: "Run `sheriff init` at the root", to: "Run `sheriff init --agent codex` at the root" },
  {
    skills: ["spec-init"],
    from: "so that every clone takes the git hooks and the plugin with it.",
    to: "so that every clone takes the git hooks and the agent's hooks with\n   it; each person working on it installs the plugin for Codex CLI, as its guide says.",
  },
  {
    skills: ["spec-init"],
    from: "For this plugin's runner, `claude`, they\n   are `specsheriff.review.claudeModel` (default `opus`), `specsheriff.review.claudeFallbackModel`\n   (default `sonnet`) and `specsheriff.review.claudeEffort` (default `high`), and the mark that the\n   question was put is `specsheriff.review.claudeAsked`.",
    to: "For this plugin's runner, `codex`, they\n   are `specsheriff.review.codexModel` (default empty, the model Codex chooses for the signed-in\n   account) and `specsheriff.review.codexEffort` (default `high`), and the mark that the question\n   was put is `specsheriff.review.codexAsked`.",
  },
  {
    skills: ["spec-init"],
    from: " A setting the user gave as an option of this plugin is\n   changed in `/config`, since the session start writes the option over the git configuration.",
    to: "",
  },
  { skills: ["spec-adopt"], from: "the git hooks, the plugin declared for every\nclone,", to: "the git hooks, the agent's hooks for\nCodex," },
  { skills: ["spec-remove"], from: "its git hooks, the plugin declared for every clone", to: "its git hooks, the agent's hooks for Codex" },
  { skills: ["spec-remove"], from: "`claude plugin uninstall specsheriff@specsheriff-marketplace`", to: "`codex plugin remove specsheriff@specsheriff-marketplace`" },
];

rmSync(join(codex, "skills"), { recursive: true, force: true });
for (const skill of readdirSync(join(claude, "skills"))) {
  let text = readFileSync(join(claude, "skills", skill, "SKILL.md"), "utf8");
  for (const overlay of OVERLAYS.filter((o) => o.skills.includes(skill))) {
    const found = text.split(overlay.from).length - 1;
    if (found !== 1) throw new Error(`skills/${skill}/SKILL.md holds ${found} times what the plugin for Codex CLI replaces: ${overlay.from}`);
    text = text.replace(overlay.from, () => overlay.to);
  }
  mkdirSync(join(codex, "skills", skill), { recursive: true });
  writeFileSync(join(codex, "skills", skill, "SKILL.md"), text);
}

// The scripts the agent's hooks for Codex call; Codex reads its hooks from the project, never from the plugin.
rmSync(join(codex, "hooks"), { recursive: true, force: true });
mkdirSync(join(codex, "hooks"));
for (const script of ["session-start.sh", "guard.sh", "after-edit.sh", "changed.mjs"]) cpSync(join(claude, "hooks", script), join(codex, "hooks", script));
