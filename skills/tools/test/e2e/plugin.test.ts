import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { gitConfig, REPO } from "../repo.ts";
import { codexCache, codexHome, PLUGIN, pluginHook, plugins } from "../plugin.ts";

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

test("@spec s-zh2vcr3xjumppg5 the plugin carries the SpecSheriff guidelines, each extension of them, the appendix of the tools, their schemas, and the SpecSheriff tools", () => {
  assert.equal(json(`${PLUGIN}/.claude-plugin/plugin.json`).name, "specsheriff");
  for (const name of ["spec.json", "tools.json"]) assert.equal(read(`${PLUGIN}/tools/guidelines/${name}`), read(join(REPO, "specs", "_guidelines", name)), name);
  for (const name of readdirSync(join(REPO, "specs", "_guidelines", "extensions"))) {
    assert.equal(read(`${PLUGIN}/tools/guidelines/extensions/${name}`), read(join(REPO, "specs", "_guidelines", "extensions", name)), name);
  }
  const schemaFiles = readdirSync(join(REPO, "specs", "_schema"), { recursive: true, encoding: "utf8" }).filter((n) => statSync(join(REPO, "specs", "_schema", n)).isFile());
  for (const name of schemaFiles) assert.equal(read(`${PLUGIN}/tools/guidelines/_schema/${name}`), read(join(REPO, "specs", "_schema", name)), name);
  const version = spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "--version"], { encoding: "utf8" });
  assert.equal(version.stdout.trim(), json(join(REPO, "skills", "tools", "package.json")).version, version.stderr);
});

test("@spec s-zh2vcr3xjumppg5 the plugin declares the agent's hooks and the one run when a session starts", () => {
  const { hooks } = json(`${PLUGIN}/hooks/hooks.json`);
  const command = (event: string, tool?: string) =>
    hooks[event].filter((e: any) => !tool || new RegExp(`^(${e.matcher})$`).test(tool)).flatMap((e: any) => e.hooks.map((h: any) => h.command)).join("\n");
  for (const tool of ["Edit", "MultiEdit", "Write"]) assert.match(command("PreToolUse", tool), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/guard\.sh/, tool);
  for (const tool of ["Edit", "MultiEdit", "Write", "Bash", "PowerShell"]) assert.match(command("PostToolUse", tool), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/after-edit\.sh/, tool);
  assert.equal(command("PreToolUse", "Bash"), "");
  assert.match(command("SessionStart"), /\$\{CLAUDE_PLUGIN_ROOT\}\/hooks\/session-start\.sh/);
});

test("@spec s-zh2vcr3xjumppg5 in a repository holding no sheriff.config.json the plugin's hooks do nothing but keep its copy of the tools", () => {
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

test("@spec s-zh2vcr3xjumppg5 the marketplace lists the plugin by the relative path of its directory", () => {
  const marketplace = json(join(REPO, ".claude-plugin", "marketplace.json"));
  assert.equal(marketplace.name, "specsheriff-marketplace");
  assert.deepEqual(marketplace.plugins.map((p: any) => [p.name, p.source]), [["specsheriff", "./skills/claude-code"]]);
});

test("@spec s-zh2vcr3xjumppg5 the plugin's skills and the agent's hooks run sheriff from the tools the plugin carries", () => {
  for (const skill of readdirSync(`${PLUGIN}/skills`)) assert.match(read(`${PLUGIN}/skills/${skill}/SKILL.md`), /node "\$\{CLAUDE_PLUGIN_ROOT\}\/tools\/dist\/cli\.js"/, skill);
  for (const hook of ["guard.sh", "after-edit.sh"]) {
    assert.match(read(`${PLUGIN}/hooks/${hook}`), /plugin="\$\{CLAUDE_PLUGIN_ROOT:-/, hook);
    assert.match(read(`${PLUGIN}/hooks/${hook}`), /node "\$plugin\/tools\/dist\/cli\.js"/, hook);
  }
});

test("@spec s-4mej6ccn7xu3d3p when a session starts, the plugin copies its tools into its data directory where the copy there is of another release or missing", () => {
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

/** A repository taking the method, set up by the sheriff init the plugin for Claude Code carries. */
function initialised(): string {
  const root = gitRepo(true);
  git(root, "config", "user.email", "owner@example.org");
  spawnSync(process.execPath, [`${PLUGIN}/tools/dist/cli.js`, "init"], { cwd: root, encoding: "utf8" });
  return root;
}

test("@spec s-4mej6ccn7xu3d3p each git hook that sheriff init writes contains the code that finds the tools of both plugins, a call to the script for that hook, and a call that runs the project's own tools where the SpecSheriff tools cannot run", () => {
  const root = initialised();
  const hooks = ["pre-commit", "commit-msg", "pre-push"].map((h) => read(join(root, ".githooks", h)));
  assert.equal(new Set(hooks).size, 1, "one call, naming its script by the hook's own name");
  assert.match(hooks[0]!, /CLAUDE_CODE_PLUGIN_CACHE_DIR:-\$HOME\/\.claude\/plugins\}\/data\/specsheriff-specsheriff-marketplace/);
  assert.match(hooks[0]!, /CODEX_HOME:-\$HOME\/\.codex\}/);
  assert.match(hooks[0]!, /\/plugins\/cache\/specsheriff-marketplace\/specsheriff\/\*\/tools/);
  assert.doesNotMatch(hooks[0]!, /sheriff (validate|binding|commit-message|review)/);
  assert.match(hooks[0]!, /engines field of their package\.json/);
  assert.match(hooks[0]!, /\$hook\.d/);
});

/** Tools as a plugin keeps them at `dir`, of the release `version`, whose script for each git hook says whose it is. */
function toolsAt(dir: string, version: string, whose: string): void {
  mkdirSync(join(dir, "hooks"), { recursive: true });
  writeFileSync(join(dir, "release"), `${version} built 2026-11-02T00:00:00.000Z\n`);
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) writeFileSync(join(dir, "hooks", hook), `echo "${whose} $(basename "$0")"\n`);
}

test("@spec s-4mej6ccn7xu3d3p a git hook that finds both plugins runs the tools of the higher release, or of either plugin where the two releases are equal, and one that finds a single plugin runs its tools", () => {
  const root = initialised();
  const p = plugins();
  const codex = codexHome(false);
  const env = { ...p.env, CODEX_HOME: codex.home };
  const ran = () => spawnSync("sh", [join(root, ".githooks", "pre-push")], { cwd: root, encoding: "utf8", input: "", env }).stdout.trim();
  toolsAt(p.data, "0.9.0", "claude");
  assert.equal(ran(), "claude pre-push");
  toolsAt(`${codexCache(codex.home)}/0.10.0/tools`, "0.10.0", "codex");
  assert.equal(ran(), "codex pre-push", "compared as semantic versions");
  toolsAt(p.data, "0.10.0", "claude");
  assert.equal(ran(), "claude pre-push");
  toolsAt(p.data, "0.10.1", "claude");
  assert.equal(ran(), "claude pre-push");
  rmSync(p.data, { recursive: true });
  assert.equal(ran(), "codex pre-push");
});

test("@spec s-4mej6ccn7xu3d3p a git hook that finds the tools of neither plugin lets the commit through, keeps the git hooks on, and says at every commit that no check of SpecSheriff ran", () => {
  const root = initialised();
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  git(root, "add", "-A");
  const env = { ...plugins().env, CODEX_HOME: codexHome(false).home };
  const run = spawnSync("git", ["commit", "-qm", "first"], { cwd: root, encoding: "utf8", env });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stderr, /no check of SpecSheriff ran/);
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  const again = spawnSync("git", ["commit", "-q", "--allow-empty", "-m", "second"], { cwd: root, encoding: "utf8", env });
  assert.equal(again.status, 0, again.stderr);
  assert.match(again.stderr, /no check of SpecSheriff ran/);
  assert.equal(git(root, "log", "--oneline").stdout.trim().split("\n").length, 2);
});

test("@spec s-4mej6ccn7xu3d3p the session start names each git hook an earlier release of sheriff init wrote, saying that sheriff init replaces it", () => {
  const root = initialised();
  writeFileSync(join(root, ".githooks", "pre-commit"), git(REPO, "show", "v0.2.2:skills/tools/assets/githook").stdout.replaceAll("\n", "\r\n"));
  const start = pluginHook("session-start.sh", plugins(), root);
  assert.equal(start.status, 0, start.stderr);
  assert.match(start.stdout, /\.githooks\/pre-commit.*earlier release.*sheriff init replaces it/);
  assert.doesNotMatch(start.stdout, /\.githooks\/(commit-msg|pre-push).*earlier/);
});

test("@spec s-4mej6ccn7xu3d3p a git hook that finds Node.js missing or older than the version the tools need runs the project's own tools, lets the commit through unless one of them fails, and says why no SpecSheriff check ran", () => {
  const root = initialised();
  const p = plugins();
  pluginHook("session-start.sh", p, root);
  const need = json(`${PLUGIN}/tools/package.json`).engines.node.replace(/^>=\s*/, "");
  mkdirSync(join(root, ".githooks", "pre-commit.d"));
  writeFileSync(join(root, ".githooks", "pre-commit.d", "10-ok.sh"), "#!/bin/sh\necho ran >> ran.txt\n");
  git(root, "add", "-A");
  const fake = mkdtempSync(join(tmpdir(), "sheriff-node-"));
  writeFileSync(join(fake, "node"), "#!/bin/sh\necho 18.0.0\n", { mode: 0o755 });
  const withoutNode = (process.env.PATH ?? "").split(delimiter).filter((d) => !existsSync(join(d, "node")) && !existsSync(join(d, "node.exe")));
  const cases: Array<[string, RegExp]> = [
    [[fake, process.env.PATH].join(delimiter), new RegExp(`no check of SpecSheriff ran: the SpecSheriff tools need Node\\.js ${need.replaceAll(".", "\\.")} or later, and this machine runs Node\\.js 18\\.0\\.0`)],
    [withoutNode.join(delimiter), new RegExp(`no check of SpecSheriff ran: Node\\.js is missing, and the SpecSheriff tools need Node\\.js ${need.replaceAll(".", "\\.")} or later`)],
  ];
  for (const [path, why] of cases) {
    const run = spawnSync("git", ["commit", "-q", "--allow-empty", "-m", "a commit"], { cwd: root, encoding: "utf8", env: { ...p.env, PATH: path } });
    assert.equal(run.status, 0, run.stderr);
    assert.match(run.stderr, why);
  }
  assert.equal(readFileSync(join(root, "ran.txt"), "utf8").trim().split(/\r?\n/).length, 2, "the project's own tool ran at each commit");
  writeFileSync(join(root, ".githooks", "pre-commit.d", "20-fail.sh"), "#!/bin/sh\nexit 1\n");
  const failed = spawnSync("git", ["commit", "-q", "--allow-empty", "-m", "a failing tool"], { cwd: root, encoding: "utf8", env: { ...p.env, PATH: cases[0]![0] } });
  assert.notEqual(failed.status, 0);
  assert.match(failed.stderr, /20-fail\.sh failed/);
});

test("@spec s-jgcveum8dwdnyzr the plugin's session start names each git hook that is not executable, says how to make it executable, and changes neither the file nor the index", () => {
  const root = gitRepo(true);
  mkdirSync(join(root, ".githooks"));
  for (const hook of ["pre-commit", "commit-msg"]) writeFileSync(join(root, ".githooks", hook), "#!/bin/sh\nexit 0\n");
  git(root, "add", "--chmod=-x", ".githooks/pre-commit");
  git(root, "add", "--chmod=+x", ".githooks/commit-msg");
  const p = plugins();
  const start = pluginHook("session-start.sh", p, root);
  const index = () => git(root, "ls-files", "-s", "--", ".githooks").stdout;
  assert.match(start.stdout, /\.githooks\/pre-commit/);
  assert.match(start.stdout, /chmod \+x \.githooks\/pre-commit/);
  assert.match(start.stdout, /git update-index --chmod=\+x \.githooks\/pre-commit/);
  assert.match(index(), /^100644 \S+ 0\t\.githooks\/pre-commit$/m);
  if (git(root, "config", "core.fileMode").stdout.trim() !== "false") {
    // Where files keep the bit, a hook the index records executable is still named while its file lacks it.
    assert.match(start.stdout, /\.githooks\/commit-msg/);
  } else {
    assert.doesNotMatch(start.stdout, /\.githooks\/commit-msg/);
  }
});

test("@spec s-jgcveum8dwdnyzr the plugin's session start turns the git hooks on where core.hooksPath is unset, saying so, and reports a different directory that core.hooksPath names", () => {
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

/** A machine whose user's global git configuration is a file of its own, holding `settings` of the reviewer. */
function userMachine(settings: Record<string, string> = {}): ReturnType<typeof plugins> & { setting: (key: string) => string | null } {
  const p = plugins();
  const file = gitConfig();
  for (const [key, value] of Object.entries(settings)) spawnSync("git", ["config", "--file", file, `specsheriff.review.${key}`, value]);
  p.env.GIT_CONFIG_GLOBAL = file;
  const setting = (key: string) => {
    const read = spawnSync("git", ["config", "--file", file, "--get", `specsheriff.review.${key}`], { encoding: "utf8" });
    return read.status === 0 ? read.stdout.replace(/\n$/, "") : null;
  };
  return { ...p, setting };
}

test("@spec s-zh2vcr3xjumppg5 the plugin declares each setting of the runner claude as an option naming its default and taking no default value", () => {
  const { userConfig } = json(`${PLUGIN}/.claude-plugin/plugin.json`);
  assert.deepEqual(Object.keys(userConfig).sort(), ["claudeEffort", "claudeFallbackModel", "claudeModel"]);
  for (const [key, named] of [["claudeModel", "opus"], ["claudeFallbackModel", "sonnet"], ["claudeEffort", "high"]] as const) {
    const option = userConfig[key];
    assert.equal(option.type, "string", key);
    assert.ok(option.title, key);
    assert.match(option.description, new RegExp(`\\b${named}\\b`), key);
    assert.ok(!("default" in option), `${key} takes no default value`);
    assert.equal(option.required, true, key);
  }
  assert.deepEqual(userConfig.claudeEffort.options, ["low", "medium", "high", "xhigh", "max"]);
});

test("@spec s-p29yawkkkgk7kxb the session start of the plugin for Claude Code writes each setting the user set as an option, in any repository, whenever the configuration lacks it or holds a different value", () => {
  const root = gitRepo(false);
  const m = userMachine({ claudeModel: "sonnet" });
  m.env.CLAUDE_PLUGIN_OPTION_CLAUDEMODEL = "opus";
  m.env.CLAUDE_PLUGIN_OPTION_CLAUDEEFFORT = "max";
  const start = pluginHook("session-start.sh", m, root);
  assert.equal(start.status, 0, start.stderr);
  assert.equal(m.setting("claudeModel"), "opus");
  assert.equal(m.setting("claudeEffort"), "max");
  assert.equal(m.setting("claudeFallbackModel"), null, "an option the user did not give is not written");
  assert.equal(start.stdout, "");
});

test("@spec s-p29yawkkkgk7kxb in a repository that uses the method, the session start names each setting that the user's configuration lacks, with its default, and has the agent ask the user about them once on each machine", () => {
  const root = gitRepo(true);
  const m = userMachine({ claudeModel: "opus" });
  const first = pluginHook("session-start.sh", m, root);
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /specsheriff\.review\.claudeFallbackModel.*sonnet/);
  assert.match(first.stdout, /specsheriff\.review\.claudeEffort.*high/);
  assert.doesNotMatch(first.stdout, /specsheriff\.review\.claudeModel\b/);
  assert.match(first.stdout, /git config --global/);
  assert.equal(m.setting("claudeAsked"), "true");
  assert.equal(m.setting("claudeFallbackModel"), null, "the hook writes no setting itself");
  const second = pluginHook("session-start.sh", m, root);
  assert.doesNotMatch(second.stdout, /specsheriff\.review/);
});

test("@spec s-ttsc8tpnu46q53s spec-init offers each setting of the claude runner that the configuration lacks and that has not been asked about yet, writing what the user answers and marking the setting as asked about", () => {
  const init = read(`${PLUGIN}/skills/spec-init/SKILL.md`);
  for (const key of ["claudeModel", "claudeFallbackModel", "claudeEffort", "claudeAsked"]) assert.match(init, new RegExp(`specsheriff\\.review\\.${key}`), key);
  assert.match(init, /git config --global/);
});

test("@spec s-jgcveum8dwdnyzr the plugin's session start names no file of the project's own tools, which run with the interpreter that their first line names", () => {
  const root = gitRepo(true);
  mkdirSync(join(root, ".githooks", "pre-commit.d"), { recursive: true });
  writeFileSync(join(root, ".githooks", "pre-commit"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(root, ".githooks", "pre-commit.d", "10-scan.sh"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(root, ".githooks", "pre-commit.d", "README"), "what these tools are for\n");
  git(root, "add", "--chmod=+x", ".githooks/pre-commit");
  git(root, "add", "--chmod=-x", ".githooks/pre-commit.d");
  const start = pluginHook("session-start.sh", plugins(), root);
  assert.doesNotMatch(start.stdout, /pre-commit\.d/);
});
