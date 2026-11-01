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

test("s-f5rz6b7dhxejjts sheriff init writes the git hooks and turns them on, declares the marketplace and the plugin, and starts the settings and the project's guidelines", () => {
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

test("s-f5rz6b7dhxejjts sheriff init stages each hook it holds with the executable mode, naming each, where files keep no such bit, and stages nothing else", () => {
  const root = fresh();
  git(root, "config", "core.fileMode", "false");
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(modes(root), ["100755 .githooks/commit-msg", "100755 .githooks/pre-commit", "100755 .githooks/pre-push"]);
  assert.deepEqual(git(root, "diff", "--cached", "--name-only").stdout.trim().split("\n"), [".githooks/commit-msg", ".githooks/pre-commit", ".githooks/pre-push"]);
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) assert.match(run.stdout, new RegExp(`staged executable: \\.githooks/${hook}`));
});

test("s-f5rz6b7dhxejjts sheriff init stages again with the executable mode a hook git's index holds without it", () => {
  const root = fresh();
  git(root, "config", "core.fileMode", "false");
  sheriff(root, "init");
  git(root, "update-index", "--chmod=-x", ".githooks/pre-push");
  const run = sheriff(root, "init");
  assert.match(run.stdout, /staged executable: \.githooks\/pre-push/);
  assert.doesNotMatch(run.stdout, /staged executable: \.githooks\/pre-commit/);
  assert.ok(modes(root).includes("100755 .githooks/pre-push"), modes(root).join("\n"));
});

test("s-f5rz6b7dhxejjts sheriff init, where it cannot stage a hook, names it and says how to stage it executable", () => {
  const root = mkdtempSync(join(tmpdir(), "sheriff-init-plain-"));
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) {
    assert.match(run.stdout, new RegExp(`\\.githooks/${hook} is not staged executable: git add --chmod=\\+x \\.githooks/${hook}`));
  }
});

test("s-jsqxdx47wkkj7gp run again, sheriff init changes nothing", () => {
  const root = fresh();
  sheriff(root, "init");
  const again = sheriff(root, "init");
  assert.equal(again.status, 0);
  assert.doesNotMatch(again.stdout, /written|staged/);
});

test("s-f5rz6b7dhxejjts sheriff init replaces no file that differs from what it would write, and names it", () => {
  const root = fresh();
  mkdirSync(join(root, ".githooks"));
  writeFileSync(join(root, ".githooks", "pre-commit"), "ours\n");
  const run = sheriff(root, "init");
  assert.equal(readFileSync(join(root, ".githooks", "pre-commit"), "utf8"), "ours\n");
  assert.match(run.stdout, /left as it is: \.githooks\/pre-commit/);
});

test("s-f5rz6b7dhxejjts sheriff init declares the marketplace and the plugin beside every other key of the agent's settings", () => {
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

test("s-f5rz6b7dhxejjts this repository holds what sheriff init writes, so that running it here writes nothing", () => {
  const run = sheriff(REPO, "init");
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /written|left as it is/, run.stdout);
});
