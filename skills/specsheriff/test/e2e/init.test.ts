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

function fresh(): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-init-"));
  git(root, "init", "-q");
  git(root, "config", "user.email", "owner@example.org");
  return root;
}

test("s-f5rz6b7dhxejjts sheriff init writes the hooks, the agent's hook, the skills, the SpecSheriff guidelines and a start of the settings and the project's guidelines", () => {
  const root = fresh();
  const run = sheriff(root, "init");
  assert.equal(run.status, 0, run.stderr);
  for (const path of [".githooks/pre-commit", ".githooks/commit-msg", ".githooks/pre-push", ".githooks/staged.sh", ".claude/hooks/sheriff-after-edit.sh", "specs/_schema/node.schema.json", "specs/_schema/section-file.schema.json",
    ".claude/skills/spec/SKILL.md", ".claude/skills/spec-review/SKILL.md", ".claude/skills/spec-adopt/SKILL.md",
    "specs/_guidelines/spec.json", "specs/_guidelines/tools.json", "sheriff.config.json", "specs/_guidelines/project.json"]) {
    assert.ok(existsSync(join(root, path)), path);
  }
  assert.equal(git(root, "config", "core.hooksPath").stdout.trim(), ".githooks");
  assert.equal(JSON.parse(readFileSync(join(root, "specs", "_guidelines", "project.json"), "utf8")).nodes[0].owner, "owner@example.org");
  const settings = JSON.parse(readFileSync(join(root, ".claude", "settings.json"), "utf8"));
  assert.match(JSON.stringify(settings.hooks.PreToolUse), /sheriff\\" guard/);
  assert.match(JSON.stringify(settings.hooks.PostToolUse), /sheriff-after-edit\.sh/);
  assert.equal(sheriff(root, "validate").status, 0, sheriff(root, "validate").stdout);
});

test("s-jsqxdx47wkkj7gp run again, sheriff init changes nothing", () => {
  const root = fresh();
  sheriff(root, "init");
  const again = sheriff(root, "init");
  assert.equal(again.status, 0);
  assert.doesNotMatch(again.stdout, /written/);
});

test("s-f5rz6b7dhxejjts sheriff init replaces no file that differs from what it would write, and names it", () => {
  const root = fresh();
  mkdirSync(join(root, ".claude", "skills", "spec"), { recursive: true });
  writeFileSync(join(root, ".claude", "skills", "spec", "SKILL.md"), "ours\n");
  const run = sheriff(root, "init");
  assert.equal(readFileSync(join(root, ".claude", "skills", "spec", "SKILL.md"), "utf8"), "ours\n");
  assert.match(run.stdout, /left as it is: \.claude\/skills\/spec\/SKILL\.md/);
});

test("s-f5rz6b7dhxejjts sheriff init adds its hooks to the agent's settings beside those already there", () => {
  const root = fresh();
  mkdirSync(join(root, ".claude"));
  const theirs = { permissions: { allow: ["Bash(ls)"] }, hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "echo theirs" }] }] } };
  writeFileSync(join(root, ".claude", "settings.json"), JSON.stringify(theirs, null, 2) + "\n");
  sheriff(root, "init");
  sheriff(root, "init");
  const settings = JSON.parse(readFileSync(join(root, ".claude", "settings.json"), "utf8"));
  assert.deepEqual(settings.permissions, theirs.permissions);
  const commands = settings.hooks.PreToolUse.flatMap((e: any) => e.hooks.map((h: any) => h.command));
  assert.equal(commands.filter((c: string) => c === "echo theirs").length, 1);
  assert.equal(commands.filter((c: string) => c.endsWith("guard")).length, 1);
});

test("s-f5rz6b7dhxejjts this repository holds what sheriff init writes, so that running it here writes nothing", () => {
  const run = sheriff(REPO, "init");
  assert.equal(run.status, 0, run.stderr);
  assert.doesNotMatch(run.stdout, /written|left as it is/, run.stdout);
});
