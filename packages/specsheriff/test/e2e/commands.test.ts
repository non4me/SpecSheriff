import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { file, node, OWNER, repo, sid } from "../fixture.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8" });
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

function project(): string {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours." })),
    "specs/contracts/c.json": file("contracts", "c",
      node("shared", { kind: "section", text: "Shared.", children: [node("term", { kind: "term", title: "user" })] }),
      node("more", { kind: "section", text: "More.", children: [node("ours", { text: "See §" + sid("shared") + ".", refs: [{ type: "cites", to: sid("shared") }] })] }),
    ),
  });
  git(root, "init", "-q");
  git(root, "config", "user.email", OWNER);
  git(root, "config", "user.name", "Owner");
  return root;
}

test("s-f5rz6b7dhxejjts sheriff reindex rewrites the files it changed and reports it", () => {
  const root = project();
  const run = sheriff(root, "reindex");
  assert.equal(run.status, 0, run.stderr);
  const c = JSON.parse(readFileSync(join(root, "specs", "contracts", "c.json"), "utf8"));
  assert.equal(c.nodes[0].id, "contracts/1");
  assert.deepEqual(c.nodes[0].refs, [{ type: "cites", from: sid("ours") }]);
  assert.match(run.stdout, /written: specs\/contracts\/c\.json/);
});

test("s-f5rz6b7dhxejjts sheriff validate passes what holds together and refuses what does not, naming where", () => {
  const root = project();
  sheriff(root, "reindex");
  const ok = sheriff(root, "validate");
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"id": "contracts/1"', '"id": "contracts/9"'));
  const refused = sheriff(root, "validate");
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /specs\/contracts\/c\.json: .*contracts\/9 is not the address/);
});

test("s-jau82aq9juv9zzh sheriff validate refuses a removed node a confirmation was given for, read against the last commit", () => {
  const root = project();
  sheriff(root, "reindex");
  assert.equal(sheriff(root, "confirm", sid("term")).status, 0);
  git(root, "add", "-A");
  git(root, "commit", "-qm", "first");
  const path = join(root, "specs", "contracts", "c.json");
  const c = JSON.parse(readFileSync(path, "utf8"));
  c.nodes[0].children = [node("other")];
  writeFileSync(path, JSON.stringify(c, null, 2) + "\n");
  sheriff(root, "reindex");
  const run = sheriff(root, "validate");
  assert.equal(run.status, 1);
  assert.match(run.stdout, new RegExp(`${sid("term")}.*not in the archive`));
});

test("s-v4qus7raqnwzneb sheriff confirm confirms as the email git is configured with, and refuses where that is not the owner", () => {
  const root = project();
  sheriff(root, "reindex");
  const ok = sheriff(root, "confirm", sid("ours"));
  assert.equal(ok.status, 0, ok.stderr);
  assert.match(readFileSync(join(root, "specs", "_confirmations.jsonl"), "utf8"), new RegExp(OWNER));
  git(root, "config", "user.email", "someone@example.org");
  const refused = sheriff(root, "confirm", sid("term"));
  assert.equal(refused.status, 1);
  assert.match(refused.stderr, new RegExp(`its owner is ${OWNER}`));
});

test("s-f5rz6b7dhxejjts sheriff export, render and guide write the export and the map and print the guidelines", () => {
  const root = project();
  sheriff(root, "reindex");
  const exported = sheriff(root, "export");
  assert.equal(exported.status, 0, exported.stderr);
  assert.match(exported.stdout, /written: md-version\/contracts\/c\.md/);
  const rendered = sheriff(root, "render");
  assert.equal(rendered.status, 0, rendered.stderr);
  assert.match(readFileSync(join(root, "specs", "_viewer", "index.html"), "utf8"), /markmap/);
  const guided = sheriff(root, "guide");
  assert.equal(guided.status, 0, guided.stderr);
  assert.match(guided.stdout, /contracts: 4 nodes, 0 checked/);
  assert.ok(guided.stdout.includes(sid("project")));
});

test("s-f5rz6b7dhxejjts sheriff show prints a node by its sid or its address", () => {
  const root = project();
  sheriff(root, "reindex");
  const run = sheriff(root, "show", "contracts/1");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, new RegExp(`contracts/1 · ${sid("shared")}`));
  assert.match(run.stdout, /cites ← contracts\/2\.1 ours/);
});
