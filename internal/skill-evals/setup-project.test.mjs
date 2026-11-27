// Tests setup-project.mjs, which sets up the neutral project in which the test cases of the SpecSheriff skills run. The
// script uses the SpecSheriff tools that the plugin for Claude Code delivers, so `npm run build -w specsheriff-tools`
// must have run first.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setupProject } from "./setup-project.mjs";

const TOOLS = fileURLToPath(new URL("../../skills/claude-code/tools", import.meta.url));
const git = (cwd, ...args) => spawnSync("git", args, { cwd, encoding: "utf8" }).stdout.trim();

test("sets up the neutral project: every rule approved, every SpecTag filled, the plugin not declared, one clean commit", (t) => {
  const target = join(mkdtempSync(join(tmpdir(), "skill-evals-")), "records");
  t.after(() => rmSync(join(target, ".."), { recursive: true, force: true }));
  const saved = process.env.SPECSHERIFF_GUIDELINES_REPO;
  delete process.env.SPECSHERIFF_GUIDELINES_REPO;
  t.after(() => { if (saved !== undefined) process.env.SPECSHERIFF_GUIDELINES_REPO = saved; });

  const { sids, rules } = setupProject(TOOLS, target);

  assert.equal(rules.length, 4);
  assert.equal(git(target, "rev-list", "--count", "HEAD"), "1");
  assert.equal(git(target, "status", "--porcelain"), "");
  for (const dir of ["src", "test"]) {
    for (const name of readdirSync(join(target, dir))) {
      const text = readFileSync(join(target, dir, name), "utf8");
      assert.doesNotMatch(text, /\{\{/, `${dir}/${name} keeps a SpecTag that names a title`);
    }
  }
  assert.match(readFileSync(join(target, "src", "records.mjs"), "utf8"), new RegExp(`@spec ${sids["The title of a record"]}`));
  const settings = JSON.parse(readFileSync(join(target, ".claude", "settings.json"), "utf8"));
  assert.equal(settings.enabledPlugins, undefined);
  assert.equal(settings.extraKnownMarketplaces, undefined);
  const approved = spawnSync(process.execPath, [join(TOOLS, "dist", "cli.js"), "settings"], { cwd: target, encoding: "utf8" }).stdout;
  assert.match(approved, /^status: approved$/m);
  assert.ok(existsSync(join(target, ".githooks", "pre-commit")));
});
