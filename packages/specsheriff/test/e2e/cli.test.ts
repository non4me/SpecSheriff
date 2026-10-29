import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { REPO } from "../repo.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: REPO, encoding: "utf8" });
const version = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8")).version;

test("s-f5rz6b7dhxejjts sheriff --version prints the version of the SpecSheriff tools", () => {
  const run = sheriff("--version");
  assert.equal(run.status, 0);
  assert.equal(run.stdout.trim(), version);
});

test("s-f5rz6b7dhxejjts sheriff with no command lists the commands", () => {
  const run = sheriff();
  assert.equal(run.status, 0);
  assert.match(run.stdout, /Usage: sheriff <command>/);
});

test("s-f5rz6b7dhxejjts an unknown command is refused, naming it", () => {
  const run = sheriff("nonsense");
  assert.equal(run.status, 2);
  assert.match(run.stderr, /unknown command: nonsense/);
});
