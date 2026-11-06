import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { REPO } from "../repo.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8" });
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });
const settingsOf = (root: string) => JSON.parse(readFileSync(join(root, ".claude", "settings.json"), "utf8"));

const MARKETPLACE = { source: { source: "github", repo: "non4me/SpecSheriff", ref: "release" }, autoUpdate: true };

function fresh(): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-init-"));
  git(root, "init", "-q");
  git(root, "config", "user.email", "owner@example.org");
  return root;
}

test("@spec s-7unxytshhc4md54 sheriff init writes the git hooks and turns them on, declares the marketplace and the plugin, and starts the settings and the project's guidelines", () => {
  const root = fresh();
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  for (const path of [".githooks/pre-commit", ".githooks/commit-msg", ".githooks/pre-push", "sheriff.config.json", "specs/_guidelines/project.json"]) {
    assert.ok(existsSync(join(root, path)), path);
  }
  for (const path of [".githooks/staged.sh", ".claude/hooks", ".claude/skills", "specs/_guidelines/spec.json", "specs/_guidelines/tools.json", "specs/_schema"]) {
    assert.ok(!existsSync(join(root, path)), path);
  }
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  assert.equal(JSON.parse(readFileSync(join(root, "specs", "_guidelines", "project.json"), "utf8")).nodes[0].owner, "owner@example.org");
  assert.deepEqual(settingsOf(root), {
    extraKnownMarketplaces: { "specsheriff-marketplace": MARKETPLACE },
    enabledPlugins: { "specsheriff@specsheriff-marketplace": true },
  });
  const validate = sheriff(root, "validate");
  assert.equal(validate.status, 0, validate.stdout);
});

const modes = (root: string) => git(root, "ls-files", "-s", "--", ".githooks").stdout.trim().split("\n").map((l) => `${l.split(/\s+/)[0]} ${l.split("\t")[1]}`);

test("@spec s-7unxytshhc4md54 sheriff init stages each hook it holds with the executable mode, naming each, where files keep no such bit, and stages nothing else", () => {
  const root = fresh();
  git(root, "config", "core.fileMode", "false");
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(modes(root), ["100755 .githooks/commit-msg", "100755 .githooks/pre-commit", "100755 .githooks/pre-push"]);
  assert.deepEqual(git(root, "diff", "--cached", "--name-only").stdout.trim().split("\n"), [".githooks/commit-msg", ".githooks/pre-commit", ".githooks/pre-push"]);
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) assert.match(run.stdout, new RegExp(`staged executable: \\.githooks/${hook}`));
});

test("@spec s-7unxytshhc4md54 sheriff init stages again with the executable mode a hook git's index holds without it", () => {
  const root = fresh();
  git(root, "config", "core.fileMode", "false");
  sheriff(root, "init");
  git(root, "update-index", "--chmod=-x", ".githooks/pre-push");
  const run = sheriff(root, "init");
  assert.match(run.stdout, /staged executable: \.githooks\/pre-push/);
  assert.doesNotMatch(run.stdout, /staged executable: \.githooks\/pre-commit/);
  assert.ok(modes(root).includes("100755 .githooks/pre-push"), modes(root).join("\n"));
});

test("@spec s-7unxytshhc4md54 sheriff init, where it cannot stage a hook, names it and says how to stage it executable", () => {
  const root = mkdtempSync(join(tmpdir(), "sheriff-init-plain-"));
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) {
    assert.match(run.stdout, new RegExp(`\\.githooks/${hook} is not staged executable: git add --chmod=\\+x \\.githooks/${hook}`));
  }
});

test("@spec s-jsqxdx47wkkj7gp run again, sheriff init changes nothing", () => {
  const root = fresh();
  sheriff(root, "init");
  const again = sheriff(root, "init");
  assert.equal(again.status, 0);
  assert.doesNotMatch(again.stdout, /written|staged|replaced/);
  sheriff(root, "init", "--agent", "codex");
  const codex = sheriff(root, "init", "--agent", "codex");
  assert.equal(codex.status, 0);
  assert.doesNotMatch(codex.stdout, /written|staged|replaced/);
});

const codexHooksOf = (root: string) => JSON.parse(readFileSync(join(root, ".codex", "hooks.json"), "utf8"));
const commandsOf = (entries: Array<{ hooks: Array<{ command: string }> }>) => entries.flatMap((e) => e.hooks.map((h) => h.command));

test("@spec s-7unxytshhc4md54 sheriff init --agent codex writes the agent's hooks for Codex beside every other hook there, and declares nothing to Claude Code", () => {
  const root = fresh();
  mkdirSync(join(root, ".codex"));
  const theirs = { hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "echo theirs" }] }] } };
  writeFileSync(join(root, ".codex", "hooks.json"), JSON.stringify(theirs, null, 2) + "\n");
  const run = sheriff(root, "init", "--agent", "codex");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /written: \.codex\/hooks\.json/);
  const { hooks } = codexHooksOf(root);
  assert.deepEqual(Object.keys(hooks).sort(), ["PostToolUse", "PreToolUse", "SessionStart"]);
  assert.ok(commandsOf(hooks.PreToolUse).includes("echo theirs"));
  assert.ok(commandsOf(hooks.SessionStart).some((c) => c.includes("hooks/session-start.sh")));
  assert.ok(commandsOf(hooks.PreToolUse).some((c) => c.includes("hooks/guard.sh")));
  assert.ok(commandsOf(hooks.PostToolUse).some((c) => c.includes("hooks/after-edit.sh")));
  for (const path of [".githooks/pre-commit", ".githooks/commit-msg", ".githooks/pre-push", "sheriff.config.json", "specs/_guidelines/project.json"]) {
    assert.ok(existsSync(join(root, path)), path);
  }
  assert.ok(!existsSync(join(root, ".claude")));
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
});

test("@spec s-7unxytshhc4md54 sheriff init refuses an agent it does not know, naming the two it takes", () => {
  const root = fresh();
  const run = sheriff(root, "init", "--agent", "gemini");
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /gemini/);
  assert.match(run.stderr, /claude/);
  assert.match(run.stderr, /codex/);
  assert.ok(!existsSync(join(root, ".githooks")));
});

/** The git hook the releases before Codex was taken up wrote, 0.1.0 to 0.2.2, as git holds it. */
const EARLIER_HOOK = git(REPO, "show", "v0.2.2:skills/tools/assets/githook").stdout;

test("@spec s-7unxytshhc4md54 sheriff init replaces a hook an earlier release of it wrote, line endings aside, naming each", () => {
  assert.match(EARLIER_HOOK, /^#!\/bin\/sh\n/);
  const root = fresh();
  mkdirSync(join(root, ".githooks"));
  writeFileSync(join(root, ".githooks", "pre-commit"), EARLIER_HOOK);
  writeFileSync(join(root, ".githooks", "pre-push"), EARLIER_HOOK.replaceAll("\n", "\r\n"));
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  const now = readFileSync(join(root, ".githooks", "commit-msg"), "utf8");
  assert.notEqual(now, EARLIER_HOOK);
  for (const hook of ["pre-commit", "pre-push"]) {
    assert.equal(readFileSync(join(root, ".githooks", hook), "utf8"), now, hook);
    assert.match(run.stdout, new RegExp(`replaced: \\.githooks/${hook}`));
  }
  assert.doesNotMatch(run.stdout, /left as it is/);
});

/** A repository set up by sheriff init for both agents, beside settings and hooks of its own, and committed. */
function setUpForBoth(): { root: string; claude: object; codex: object } {
  const root = fresh();
  git(root, "config", "user.name", "Owner");
  mkdirSync(join(root, ".claude"));
  mkdirSync(join(root, ".codex"));
  const claude = { permissions: { allow: ["Bash(ls)"] }, enabledPlugins: { "other@other": true } };
  const codex = { hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "echo theirs" }] }] } };
  writeFileSync(join(root, ".claude", "settings.json"), JSON.stringify(claude, null, 2) + "\n");
  writeFileSync(join(root, ".codex", "hooks.json"), JSON.stringify(codex, null, 2) + "\n");
  sheriff(root, "init");
  sheriff(root, "init", "--agent", "codex");
  git(root, "add", "-A");
  git(root, "-c", "core.hooksPath=/dev/null", "commit", "-qm", "Set up");
  return { root, claude, codex };
}

test("@spec s-7unxytshhc4md54 sheriff remove takes out what sheriff init writes for both agents, keeps specs/ naming it, stages nothing, and run again changes nothing", () => {
  const root = fresh();
  sheriff(root, "init");
  sheriff(root, "init", "--agent", "codex");
  writeFileSync(join(root, "sheriff.config.json"), '{ "code": ["src/**/*.ts"], "tests": [], "testCommand": "npm test" }\n');
  git(root, "config", "user.name", "Owner");
  git(root, "add", "-A");
  git(root, "-c", "core.hooksPath=/dev/null", "commit", "-qm", "Set up");
  const run = sheriff(root, "remove");
  assert.equal(run.status, 0, run.stderr);
  for (const path of [".githooks", ".claude", ".codex", "sheriff.config.json"]) assert.ok(!existsSync(join(root, path)), path);
  assert.ok(existsSync(join(root, "specs", "_guidelines", "project.json")));
  assert.match(run.stdout, /left as it is: specs\//);
  for (const path of [".githooks/pre-commit", ".githooks/commit-msg", ".githooks/pre-push", ".claude/settings.json", ".codex/hooks.json", "sheriff.config.json"]) {
    assert.match(run.stdout, new RegExp(`removed: ${path.replaceAll(".", "\\.")}`), path);
  }
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "");
  assert.equal(git(root, "diff", "--cached", "--name-only").stdout, "");
  const again = sheriff(root, "remove");
  assert.equal(again.status, 0, again.stderr);
  assert.doesNotMatch(again.stdout, /removed|unset/);
});

test("@spec s-7unxytshhc4md54 sheriff remove keeps every other key and hook, and each hook and declaration that differs, naming it", () => {
  const { root, claude, codex } = setUpForBoth();
  writeFileSync(join(root, ".githooks", "pre-push"), "ours\n");
  const settings = JSON.parse(readFileSync(join(root, ".claude", "settings.json"), "utf8"));
  settings.enabledPlugins["specsheriff@specsheriff-marketplace"] = false;
  writeFileSync(join(root, ".claude", "settings.json"), JSON.stringify(settings, null, 2) + "\n");
  git(root, "config", "core.hooksPath", "elsewhere");
  const run = sheriff(root, "remove");
  assert.equal(run.status, 0, run.stderr);
  assert.equal(readFileSync(join(root, ".githooks", "pre-push"), "utf8"), "ours\n");
  assert.ok(!existsSync(join(root, ".githooks", "pre-commit")));
  assert.match(run.stdout, /left as it is: \.githooks\/pre-push/);
  assert.match(run.stdout, /left as it is: \.claude\/settings\.json/);
  assert.deepEqual(JSON.parse(readFileSync(join(root, ".claude", "settings.json"), "utf8")), {
    ...claude,
    enabledPlugins: { "other@other": true, "specsheriff@specsheriff-marketplace": false },
  });
  assert.deepEqual(codexHooksOf(root), codex);
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), "elsewhere");
});

test("@spec s-7unxytshhc4md54 sheriff remove takes out a hook an earlier release of sheriff init wrote", () => {
  const root = fresh();
  mkdirSync(join(root, ".githooks"));
  writeFileSync(join(root, ".githooks", "pre-commit"), EARLIER_HOOK.replaceAll("\n", "\r\n"));
  writeFileSync(join(root, "sheriff.config.json"), '{ "code": [], "tests": [] }\n');
  const run = sheriff(root, "remove");
  assert.equal(run.status, 0, run.stderr);
  assert.ok(!existsSync(join(root, ".githooks")));
  assert.match(run.stdout, /removed: \.githooks\/pre-commit/);
});

test("@spec s-7unxytshhc4md54 sheriff init replaces no file that differs from what it would write, and names it", () => {
  const root = fresh();
  mkdirSync(join(root, ".githooks"));
  writeFileSync(join(root, ".githooks", "pre-commit"), "ours\n");
  const run = sheriff(root, "init");
  assert.equal(readFileSync(join(root, ".githooks", "pre-commit"), "utf8"), "ours\n");
  assert.match(run.stdout, /left as it is: \.githooks\/pre-commit/);
});

test("@spec s-7unxytshhc4md54 sheriff init declares the marketplace and the plugin beside every other key of the agent's settings", () => {
  const root = fresh();
  mkdirSync(join(root, ".claude"));
  const theirs = {
    permissions: { allow: ["Bash(ls)"] },
    hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "echo theirs" }] }] },
    extraKnownMarketplaces: { other: { source: { source: "github", repo: "someone/else" } } },
    enabledPlugins: { "other@other": true },
  };
  writeFileSync(join(root, ".claude", "settings.json"), JSON.stringify(theirs, null, 2) + "\n");
  sheriff(root, "init");
  sheriff(root, "init");
  assert.deepEqual(settingsOf(root), {
    ...theirs,
    extraKnownMarketplaces: { ...theirs.extraKnownMarketplaces, "specsheriff-marketplace": MARKETPLACE },
    enabledPlugins: { ...theirs.enabledPlugins, "specsheriff@specsheriff-marketplace": true },
  });
});

test("@spec s-7unxytshhc4md54 this repository holds what sheriff init writes, so that running it here writes nothing", () => {
  const run = sheriff(REPO, "init");
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /written|replaced|left as it is/, run.stdout);
});

test("@spec s-7unxytshhc4md54 sheriff init writes, unchecked, the rule that puts the specification live where the repository keeps no code the tools read, and not where it keeps some", () => {
  const live = (root: string) => JSON.parse(readFileSync(join(root, "specs", "_guidelines", "project.json"), "utf8")).nodes[0].children?.find((n: { text: string }) => n.text === "This project's specification is live.");
  const empty = fresh();
  sheriff(empty, "init");
  const rule = live(empty);
  assert.ok(rule, "the live rule");
  assert.equal(rule.status, "");
  assert.deepEqual(rule.refs, [{ type: "refines", to: "s-qzthyh7yqvfhsa2" }]);
  const coded = fresh();
  writeFileSync(join(coded, "app.ts"), "export const a = 1;\n");
  sheriff(coded, "init");
  assert.equal(live(coded), undefined);
});

test("@spec s-7unxytshhc4md54 sheriff init names each hook the repository ran from elsewhere before, and sheriff remove each folder of the project's own tools it leaves", () => {
  const root = fresh();
  mkdirSync(join(root, ".git", "hooks"), { recursive: true });
  writeFileSync(join(root, ".git", "hooks", "pre-push"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(root, ".git", "hooks", "pre-commit.sample"), "#!/bin/sh\nexit 0\n");
  const init = sheriff(root, "init");
  assert.match(init.stdout, /\.git\/hooks\/pre-push no longer runs.*\.githooks\/pre-push\.d\//);
  assert.doesNotMatch(init.stdout, /pre-commit\.sample/);
  mkdirSync(join(root, ".githooks", "pre-push.d"));
  writeFileSync(join(root, ".githooks", "pre-push.d", "scan.sh"), "#!/bin/sh\nexit 0\n");
  const removed = sheriff(root, "remove");
  assert.match(removed.stdout, /\.githooks\/pre-push\.d.*no longer run/);
});

test("@spec s-7unxytshhc4md54 sheriff init names each hook of a hooks folder core.hooksPath names by an absolute path, and of a linked worktree's repository", () => {
  const root = fresh();
  const elsewhere = mkdtempSync(join(tmpdir(), "sheriff-hooks-"));
  writeFileSync(join(elsewhere, "pre-commit"), "#!/bin/sh\nexit 0\n");
  spawnSync("git", ["config", "core.hooksPath", elsewhere], { cwd: root });
  const absolute = sheriff(root, "init");
  assert.ok(absolute.stdout.includes(`${elsewhere.replaceAll("\\", "/")}/pre-commit no longer runs`) || absolute.stdout.includes(`${elsewhere}/pre-commit no longer runs`), absolute.stdout);

  const main = fresh();
  mkdirSync(join(main, ".git", "hooks"), { recursive: true });
  writeFileSync(join(main, ".git", "hooks", "pre-push"), "#!/bin/sh\nexit 0\n");
  writeFileSync(join(main, "README.md"), "A project.\n");
  spawnSync("git", ["add", "-A"], { cwd: main });
  spawnSync("git", ["-c", "user.email=o@example.org", "-c", "user.name=O", "commit", "-qm", "first"], { cwd: main });
  const tree = join(mkdtempSync(join(tmpdir(), "sheriff-worktree-")), "w");
  spawnSync("git", ["worktree", "add", "-q", tree], { cwd: main });
  const linked = sheriff(tree, "init");
  assert.match(linked.stdout, /hooks\/pre-push no longer runs/);
});
