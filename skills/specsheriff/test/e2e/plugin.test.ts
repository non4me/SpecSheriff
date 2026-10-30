import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { REPO } from "../repo.ts";
import { PLUGIN, pluginHook, plugins } from "../plugin.ts";

const read = (path: string) => readFileSync(path, "utf8");
const json = (path: string) => JSON.parse(read(path));
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

function gitRepo(config: boolean): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-project-"));
  git(root, "init", "-q");
  git(root, "config", "user.name", "Owner");
  if (config) writeFileSync(join(root, "sheriff.config.json"), '{ "code": [], "tests": [] }\n');
  return root;
}

test("s-zh2vcr3xjumppg5 the plugin carries the skills, the SpecSheriff guidelines and their schema, and the SpecSheriff tools", () => {
  assert.equal(json(`${PLUGIN}/.claude-plugin/plugin.json`).name, "specsheriff");
  assert.deepEqual(readdirSync(`${PLUGIN}/skills`).sort(), ["spec", "spec-adopt", "spec-init", "spec-review"]);
  for (const skill of readdirSync(`${PLUGIN}/skills`)) assert.ok(existsSync(`${PLUGIN}/skills/${skill}/SKILL.md`), skill);
  for (const name of ["spec.json", "tools.json"]) assert.equal(read(`${PLUGIN}/tools/guidelines/${name}`), read(join(REPO, "specs", "_guidelines", name)), name);
  for (const name of readdirSync(join(REPO, "specs", "_schema"))) assert.equal(read(`${PLUGIN}/tools/guidelines/_schema/${name}`), read(join(REPO, "specs", "_schema", name)), name);
  const version = spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "--version"], { encoding: "utf8" });
  assert.equal(version.stdout.trim(), json(join(REPO, "skills", "specsheriff", "package.json")).version, version.stderr);
});

test("s-zh2vcr3xjumppg5 the plugin declares the agent's hooks and the one run when a session starts", () => {
  const { hooks } = json(`${PLUGIN}/hooks/hooks.json`);
  const command = (event: string, tool?: string) =>
    hooks[event].filter((e: any) => !tool || new RegExp(`^(${e.matcher})$`).test(tool)).flatMap((e: any) => e.hooks.map((h: any) => h.command)).join("\n");
  for (const tool of ["Edit", "MultiEdit", "Write"]) assert.match(command("PreToolUse", tool), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/guard\.sh/, tool);
  for (const tool of ["Edit", "MultiEdit", "Write", "Bash"]) assert.match(command("PostToolUse", tool), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/after-edit\.sh/, tool);
  assert.equal(command("PreToolUse", "Bash"), "");
  assert.match(command("SessionStart"), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/session-start\.sh/);
});

test("s-zh2vcr3xjumppg5 in a repository holding no sheriff.config.json the plugin's hooks do nothing but keep its copy of the tools", () => {
  const root = gitRepo(false);
  const p = plugins();
  const edit = JSON.stringify({ tool_name: "Write", tool_input: { file_path: join(root, "a.ts"), content: "export const a = 1;\n" } });
  assert.equal(pluginHook("guard.sh", p, root, edit).status, 0);
  const after = pluginHook("after-edit.sh", p, root);
  assert.equal(after.status, 0, after.stderr);
  const start = pluginHook("session-start.sh", p, root);
  assert.equal(start.status, 0, start.stderr);
  assert.equal(start.stdout, "");
  assert.ok(existsSync(`${p.data}/hooks/pre-commit`));
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "");
  assert.deepEqual(readdirSync(root), [".git"]);
});

test("s-zh2vcr3xjumppg5 the marketplace lists the plugin by the relative path of its directory", () => {
  const marketplace = json(join(REPO, ".claude-plugin", "marketplace.json"));
  assert.equal(marketplace.name, "specsheriff-marketplace");
  assert.deepEqual(marketplace.plugins.map((p: any) => [p.name, p.source]), [["specsheriff", "./skills/claude-code"]]);
});

test("s-zh2vcr3xjumppg5 the skill spec-init runs sheriff init with the tools the plugin carries", () => {
  const skill = read(`${PLUGIN}/skills/spec-init/SKILL.md`);
  assert.match(skill, /node "\$\{CLAUDE_PLUGIN_ROOT\}\/tools\/dist\/cli\.js"/);
  assert.match(skill, /sheriff init/);
});

test("s-4mej6ccn7xu3d3p when a session starts, the plugin copies its tools into its data directory where the copy there is of another release or missing", () => {
  const root = gitRepo(false);
  const p = plugins();
  pluginHook("session-start.sh", p, root);
  assert.equal(read(`${p.data}/release`), read(`${PLUGIN}/tools/release`));
  for (const path of ["hooks/pre-commit", "hooks/commit-msg", "hooks/pre-push", "dist/cli.js", "guidelines/spec.json"]) assert.ok(existsSync(`${p.data}/${path}`), path);
  writeFileSync(`${p.data}/kept`, "");
  pluginHook("session-start.sh", p, root);
  assert.ok(existsSync(`${p.data}/kept`), "the same release is not copied again");
  writeFileSync(`${p.data}/release`, "0.0.0 an older release\n");
  pluginHook("session-start.sh", p, root);
  assert.ok(!existsSync(`${p.data}/kept`), "another release is replaced whole");
  assert.equal(read(`${p.data}/release`), read(`${PLUGIN}/tools/release`));
});

test("s-4mej6ccn7xu3d3p each git hook sheriff init writes holds nothing but a call to its script in the plugin's data directory", () => {
  const root = gitRepo(false);
  git(root, "config", "user.email", "owner@example.org");
  spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "init"], { cwd: root, encoding: "utf8" });
  const hooks = ["pre-commit", "commit-msg", "pre-push"].map((h) => read(join(root, ".githooks", h)));
  assert.equal(new Set(hooks).size, 1, "one call, naming its script by the hook's own name");
  assert.match(hooks[0]!, /plugins\}?\/data\/specsheriff-specsheriff-marketplace\/hooks\//);
  assert.doesNotMatch(hooks[0]!, /sheriff (validate|binding|message|review)/);
});

test("s-4mej6ccn7xu3d3p a git hook refuses where its script is missing, saying that a session of Claude Code puts it there", () => {
  const root = gitRepo(true);
  git(root, "config", "user.email", "owner@example.org");
  spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "init"], { cwd: root, encoding: "utf8" });
  git(root, "add", "-A");
  const run = spawnSync("git", ["commit", "-qm", "first"], { cwd: root, encoding: "utf8", env: plugins().env });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /session of Claude Code/);
});

test("s-4mej6ccn7xu3d3p a hook's script refuses where Node is missing or older than the tools need, naming the version they need", () => {
  const root = gitRepo(true);
  const p = plugins();
  pluginHook("session-start.sh", p, root);
  const need = json(`${PLUGIN}/tools/package.json`).engines.node.replace(/\D/g, "");
  const fake = mkdtempSync(join(tmpdir(), "sheriff-node-"));
  writeFileSync(join(fake, "node"), "#!/bin/sh\necho 18.0.0\n", { mode: 0o755 });
  const withoutNode = (process.env.PATH ?? "").split(delimiter).filter((d) => !existsSync(join(d, "node")) && !existsSync(join(d, "node.exe")));
  for (const path of [[fake, process.env.PATH].join(delimiter), withoutNode.join(delimiter)]) {
    const run = spawnSync("sh", [`${p.data}/hooks/pre-push`], { cwd: root, encoding: "utf8", env: { ...process.env, PATH: path } });
    assert.notEqual(run.status, 0);
    assert.match(run.stderr, new RegExp(`Node ${need}`));
  }
});

test("s-477gtdrkw34dzxw the plugin's session start turns the git hooks on where core.hooksPath is unset, saying so, and reports another directory", () => {
  const root = gitRepo(true);
  const p = plugins();
  const first = pluginHook("session-start.sh", p, root);
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  assert.match(first.stdout, /core\.hooksPath/);
  assert.equal(pluginHook("session-start.sh", p, root).stdout, "");
  git(root, "config", "core.hooksPath", "elsewhere");
  const other = pluginHook("session-start.sh", p, root);
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "elsewhere");
  assert.match(other.stdout, /elsewhere/);
});
