import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gitConfig, REPO } from "../repo.ts";
import { CODEX_PLUGIN, codexHome, codexHook, PLUGIN } from "../plugin.ts";

const read = (path: string) => readFileSync(path, "utf8");
const json = (path: string) => JSON.parse(read(path));
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

/** A repository set up by the sheriff init the plugin for Codex CLI carries, for Codex, holding `sheriff.config.json` where `taking`. */
function setUpForCodex(taking = true): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-codex-project-"));
  git(root, "init", "-q");
  git(root, "config", "user.email", "owner@example.org");
  git(root, "config", "user.name", "Owner");
  const run = spawnSync(process.execPath, [`${CODEX_PLUGIN}/tools/dist/cli.js`, "init", "--agent", "codex"], { cwd: root, encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  git(root, "config", "--unset", "core.hooksPath");
  if (!taking) rmSync(join(root, "sheriff.config.json"));
  return root;
}

const patch = (...lines: string[]) => JSON.stringify({ tool_name: "apply_patch", tool_input: { command: ["*** Begin Patch", ...lines, "*** End Patch"].join("\n") } });

test("@spec s-2pdy9gw2jrjvfb4 the plugin for Codex CLI carries the skills, the SpecSheriff guidelines, each extension of them, the appendix of the tools, their schemas, and the SpecSheriff tools, and declares no hooks", () => {
  const manifest = json(`${CODEX_PLUGIN}/.codex-plugin/plugin.json`);
  assert.equal(manifest.name, "specsheriff");
  assert.equal(manifest.version, json(`${PLUGIN}/.claude-plugin/plugin.json`).version);
  assert.equal(manifest.skills, "./skills/");
  assert.deepEqual(manifest.hooks, {});
  assert.ok(!existsSync(`${CODEX_PLUGIN}/hooks/hooks.json`));
  // The scripts the agent's hooks for Codex call, each as the plugin for Claude Code holds it.
  assert.deepEqual(readdirSync(`${CODEX_PLUGIN}/hooks`).sort(), ["after-edit.sh", "changed.mjs", "guard.sh", "session-start.sh"]);
  for (const script of readdirSync(`${CODEX_PLUGIN}/hooks`)) assert.equal(read(`${CODEX_PLUGIN}/hooks/${script}`), read(`${PLUGIN}/hooks/${script}`), script);
  for (const name of ["spec.json", "tools.json"]) assert.equal(read(`${CODEX_PLUGIN}/tools/guidelines/${name}`), read(join(REPO, "specs", "_guidelines", name)), name);
  for (const name of readdirSync(join(REPO, "specs", "_guidelines", "extensions"))) {
    assert.equal(read(`${CODEX_PLUGIN}/tools/guidelines/extensions/${name}`), read(join(REPO, "specs", "_guidelines", "extensions", name)), name);
  }
  const schemaFiles = readdirSync(join(REPO, "specs", "_schema"), { recursive: true, encoding: "utf8" }).filter((n) => statSync(join(REPO, "specs", "_schema", n)).isFile());
  for (const name of schemaFiles) assert.equal(read(`${CODEX_PLUGIN}/tools/guidelines/_schema/${name}`), read(join(REPO, "specs", "_schema", name)), name);
  const version = spawnSync(process.execPath, [`${CODEX_PLUGIN}/tools/dist/cli.js`, "--version"], { encoding: "utf8" });
  assert.equal(version.stdout.trim(), json(join(REPO, "skills", "tools", "package.json")).version, version.stderr);
});

test("@spec s-2pdy9gw2jrjvfb4 the marketplace lists the plugin for Codex CLI by the relative path of its directory, beside the file listing the plugin for Claude Code", () => {
  const marketplace = json(join(REPO, ".agents", "plugins", "marketplace.json"));
  assert.equal(marketplace.name, "specsheriff-marketplace");
  assert.deepEqual(marketplace.plugins.map((p: any) => [p.name, p.source]), [["specsheriff", { source: "local", path: "./skills/codex" }]]);
  assert.ok(existsSync(join(REPO, ".claude-plugin", "marketplace.json")));
});

test("@spec s-2pdy9gw2jrjvfb4 the guide of the plugin for Codex CLI gives the commands that install it on a machine", () => {
  const guide = read(`${CODEX_PLUGIN}/README.md`);
  assert.ok(guide.includes("codex plugin marketplace add non4me/SpecSheriff@release"));
  assert.ok(guide.includes("codex plugin add specsheriff@specsheriff-marketplace"));
});

test("@spec s-2pdy9gw2jrjvfb4 the skills run sheriff from the tools beside them, which they locate from the path of their SKILL.md", () => {
  for (const skill of readdirSync(`${CODEX_PLUGIN}/skills`)) {
    const text = read(`${CODEX_PLUGIN}/skills/${skill}/SKILL.md`);
    assert.match(text, /node "<plugin>\/tools\/dist\/cli\.js"/, skill);
    assert.match(text, /<plugin>\/skills\/<skill>\/SKILL\.md/, skill);
    assert.doesNotMatch(text, /CLAUDE_PLUGIN_ROOT|Claude Code/, skill);
  }
});

test("@spec s-kq6wmdud9c7j2k9 each SpecSheriff plugin holds the skills spec, spec-review, spec-adopt, spec-init, spec-remove and spec-settings, none of which sets a model or a reasoning effort", () => {
  for (const plugin of [PLUGIN, CODEX_PLUGIN]) {
    const skills = readdirSync(`${plugin}/skills`);
    for (const skill of ["spec", "spec-review", "spec-adopt", "spec-init", "spec-remove", "spec-settings"]) {
      assert.ok(skills.includes(skill) && existsSync(`${plugin}/skills/${skill}/SKILL.md`), `${plugin}: ${skill}`);
    }
    for (const skill of skills) {
      const text = read(`${plugin}/skills/${skill}/SKILL.md`);
      assert.doesNotMatch(text.split("---")[1] ?? "", /^(model|effort):/m, skill);
      assert.doesNotMatch(text, /--model|--effort/, skill);
    }
  }
});

test("@spec s-ttsc8tpnu46q53s spec-init runs sheriff init, for Codex with --agent codex, and asks only for what sheriff.config.json lacks", () => {
  assert.match(read(`${PLUGIN}/skills/spec-init/SKILL.md`), /Run `sheriff init`/);
  assert.match(read(`${CODEX_PLUGIN}/skills/spec-init/SKILL.md`), /Run `sheriff init --agent codex`/);
  for (const plugin of [PLUGIN, CODEX_PLUGIN]) assert.match(read(`${plugin}/skills/spec-init/SKILL.md`), /that `sheriff\.config\.json` lacks/, plugin);
});

test("@spec s-jn3rauw6a8zeefn spec-remove runs sheriff remove and then offers to remove its own plugin from the machine", () => {
  const claude = read(`${PLUGIN}/skills/spec-remove/SKILL.md`);
  assert.match(claude, /Run `sheriff remove`/);
  assert.match(claude, /claude plugin uninstall specsheriff@specsheriff-marketplace/);
  const codex = read(`${CODEX_PLUGIN}/skills/spec-remove/SKILL.md`);
  assert.match(codex, /Run `sheriff remove`/);
  assert.match(codex, /codex plugin remove specsheriff@specsheriff-marketplace/);
});

test("@spec s-h343yq2mua648eg spec-settings shows the settings as sheriff settings prints them, offers a terminal window only where it finds a graphical desktop, and otherwise changes them through questions in the chat", () => {
  for (const plugin of [PLUGIN, CODEX_PLUGIN]) {
    const text = read(`${plugin}/skills/spec-settings/SKILL.md`);
    assert.match(text, /sheriff settings/, plugin);
    assert.match(text, /graphical desktop/, plugin);
    assert.match(text, /questions in the chat/, plugin);
    assert.match(text, /once the window closes/, plugin);
  }
});

test("@spec s-xr5xxa9cxf2mq5u the build writes beside each plugin's release the agent whose runner its tools take", () => {
  assert.equal(read(`${PLUGIN}/tools/agent`), "claude\n");
  assert.equal(read(`${CODEX_PLUGIN}/tools/agent`), "codex\n");
  const agent = (tools: string) =>
    spawnSync(process.execPath, ["--input-type=module", "-e", `const m = await import(${JSON.stringify(`file:///${tools}/dist/config.js`)}); console.log(m.AGENT)`], { encoding: "utf8" }).stdout.trim();
  assert.equal(agent(`${PLUGIN}/tools`), "claude");
  assert.equal(agent(`${CODEX_PLUGIN}/tools`), "codex");
});

test("@spec s-n76wt2bkqdmh78x each of the agent's hooks for Codex holds only the lookup of the plugin in Codex's cache and a call to its script, and does nothing where it finds no plugin", () => {
  const root = setUpForCodex();
  const { hooks } = json(join(root, ".codex", "hooks.json"));
  const entry = (event: string) => hooks[event].find((e: any) => e.hooks.some((h: any) => h.command.includes("specsheriff")));
  const matches = (event: string, tool: string) => new RegExp(`^(${entry(event).matcher})$`).test(tool);
  for (const tool of ["Edit", "Write"]) assert.ok(matches("PreToolUse", tool), tool);
  for (const tool of ["Edit", "Write", "Bash"]) assert.ok(matches("PostToolUse", tool), tool);
  assert.ok(!matches("PreToolUse", "Bash"));
  for (const [event, script] of [["SessionStart", "session-start.sh"], ["PreToolUse", "guard.sh"], ["PostToolUse", "after-edit.sh"]] as const) {
    const [hook] = entry(event).hooks;
    assert.match(hook.command, /\$\{CODEX_HOME:-\$HOME\/\.codex\}/, event);
    assert.match(hook.command, /\/plugins\/cache\/specsheriff-marketplace\/specsheriff\/\*\//, event);
    assert.ok(hook.command.includes(`hooks/${script}`), event);
    assert.doesNotMatch(hook.command, /sheriff (guard|reindex|validate)/, event);
  }
  const none = codexHome(false);
  const refused = patch("*** Add File: specs/_approvals.jsonl", "+forged");
  for (const [event, input] of [["SessionStart", "{}"], ["PreToolUse", refused], ["PostToolUse", refused]] as const) {
    const run = codexHook(event, none, root, input);
    assert.equal(run.status, 0, `${event}: ${run.stderr}`);
    assert.equal(run.stdout + run.stderr, "", event);
  }
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "");
});

test("@spec s-n76wt2bkqdmh78x the scripts the agent's hooks for Codex call do nothing in a repository holding no sheriff.config.json", () => {
  const root = setUpForCodex(false);
  const codex = codexHome();
  const refused = patch("*** Add File: specs/_approvals.jsonl", "+forged");
  for (const [event, input] of [["SessionStart", "{}"], ["PreToolUse", refused], ["PostToolUse", refused]] as const) {
    const run = codexHook(event, codex, root, input);
    assert.equal(run.status, 0, `${event}: ${run.stderr}`);
    assert.equal(run.stdout, "", event);
  }
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "");
});

test("@spec s-n76wt2bkqdmh78x before an edit made with apply_patch, the hook refuses the whole patch where sheriff guard refuses one of its files", () => {
  const root = setUpForCodex();
  const codex = codexHome();
  const allowed = patch("*** Add File: notes.txt", "+one");
  assert.equal(codexHook("PreToolUse", codex, root, allowed).status, 0);
  assert.equal(codexHook("PreToolUse", codex, root, allowed).stdout, "");
  const refused = codexHook("PreToolUse", codex, root, patch("*** Add File: notes.txt", "+one", "*** Add File: specs/_approvals.jsonl", "+forged"));
  // Codex blocks a tool call on the denial a hook writes as JSON; exit code 2 it reports as a failed hook and lets the call go on.
  assert.equal(refused.status, 0, refused.stderr);
  const { hookSpecificOutput } = JSON.parse(refused.stdout);
  assert.equal(hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(hookSpecificOutput.permissionDecision, "deny");
  assert.match(hookSpecificOutput.permissionDecisionReason, /_approvals\.jsonl is written by sheriff approve alone/);
});

test("@spec s-n76wt2bkqdmh78x after an edit, the hook runs the checks over the working tree and reports to the agent what they refuse", () => {
  const root = setUpForCodex();
  const codex = codexHome();
  writeFileSync(join(root, "specs", "_guidelines", "project.json"), "{ not json\n");
  const run = codexHook("PostToolUse", codex, root, patch("*** Update File: specs/_guidelines/project.json", "@@", "-{", "+{ not json"));
  assert.equal(run.status, 0, run.stderr);
  const answer = JSON.parse(run.stdout);
  assert.equal(answer.decision, "block");
  assert.match(answer.reason, /project\.json/);
});

test("@spec s-jgcveum8dwdnyzr the session start of the agent's hooks for Codex turns the git hooks on where core.hooksPath is unset, saying so", () => {
  const root = setUpForCodex();
  const run = codexHook("SessionStart", codexHome(), root, "{}");
  assert.equal(run.status, 0, run.stderr);
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  assert.match(run.stdout, /core\.hooksPath/);
});

test("@spec s-4mej6ccn7xu3d3p the session start of the agent's hooks for Codex names each git hook an earlier release of sheriff init wrote", () => {
  const root = setUpForCodex();
  writeFileSync(join(root, ".githooks", "pre-push"), git(REPO, "show", "v0.2.2:skills/tools/assets/githook").stdout);
  const run = codexHook("SessionStart", codexHome(), root, "{}");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /\.githooks\/pre-push.*earlier release.*sheriff init replaces it/);
});

test("@spec s-p29yawkkkgk7kxb the session start of the agent's hooks for Codex names each setting of the codex runner that the user's configuration lacks, with its default, and has the agent ask the user about them once on each machine", () => {
  const root = setUpForCodex();
  const codex = codexHome();
  const file = gitConfig();
  codex.env.GIT_CONFIG_GLOBAL = file;
  const setting = (key: string) => {
    const read = spawnSync("git", ["config", "--file", file, "--get", `specsheriff.review.${key}`], { encoding: "utf8" });
    return read.status === 0 ? read.stdout.replace(/\n$/, "") : null;
  };
  const first = codexHook("SessionStart", codex, root, "{}");
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /specsheriff\.review\.codexModel.*the model Codex chooses/);
  assert.match(first.stdout, /specsheriff\.review\.codexEffort.*high/);
  assert.doesNotMatch(first.stdout, /specsheriff\.review\.claude/);
  assert.equal(setting("codexAsked"), "true");
  const second = codexHook("SessionStart", codex, root, "{}");
  assert.doesNotMatch(second.stdout, /specsheriff\.review/);
});

test("@spec s-ttsc8tpnu46q53s spec-init offers each setting of the codex runner that the configuration lacks and that has not been asked about yet, writing what the user answers and marking the setting as asked about", () => {
  const init = read(`${CODEX_PLUGIN}/skills/spec-init/SKILL.md`);
  for (const key of ["codexModel", "codexEffort", "codexAsked"]) assert.match(init, new RegExp(`specsheriff\\.review\\.${key}`), key);
  assert.doesNotMatch(init, /specsheriff\.review\.claude/);
  assert.match(init, /git config --global/);
});
