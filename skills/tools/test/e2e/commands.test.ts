import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { approve } from "../../src/approvals.ts";
import { BASE, file, loc, node, OWNER, repo, sid, taking } from "../fixture.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8" });
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

function project(): string {
  const root = repo({
    "specs/_guidelines/spec.json": BASE,
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours." })),
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

test("@spec s-f5rz6b7dhxejjts sheriff reindex rewrites the files it changed and reports it", () => {
  const root = project();
  const run = sheriff(root, "reindex");
  assert.equal(run.status, 0, run.stderr);
  const c = JSON.parse(readFileSync(join(root, "specs", "contracts", "c.json"), "utf8"));
  assert.equal(c.nodes[0].location, "contracts/c");
  assert.deepEqual(c.nodes[0].refs, [{ type: "cites", from: sid("ours") }]);
  assert.match(run.stdout, /written: specs\/contracts\/c\.json/);
});

test("@spec s-f5rz6b7dhxejjts sheriff validate passes what holds together and refuses what does not, naming where", () => {
  const root = project();
  sheriff(root, "reindex");
  const ok = sheriff(root, "validate");
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(`"location": "${loc("contracts", "c")}"`, `"location": "${loc("contracts", "9")}"`));
  const refused = sheriff(root, "validate");
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /specs\/contracts\/c\.json: .*contracts\/9 is not the one its place gives/);
});

test("@spec s-jau82aq9juv9zzh sheriff validate refuses a removed node an approval was given for, read against the last commit", () => {
  const root = project();
  sheriff(root, "reindex");
  assert.equal(sheriff(root, "approve", sid("term")).status, 0);
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

test("@spec s-v4qus7raqnwzneb sheriff approve approves as the email git is configured with, and refuses where that is none of the node's owners", () => {
  const root = project();
  sheriff(root, "reindex");
  const ok = sheriff(root, "approve", sid("ours"));
  assert.equal(ok.status, 0, ok.stderr);
  assert.match(readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8"), new RegExp(`"by":"${OWNER}"`));
  // The section holding the node is built approved at once, so the next commit finds its status current (s-9kfdycuq34beqvs).
  assert.equal(JSON.parse(readFileSync(join(root, "specs", "contracts", "c.json"), "utf8")).nodes[1].status, "approved");
  git(root, "config", "user.email", "someone@example.org");
  const refused = sheriff(root, "approve", sid("term"));
  assert.equal(refused.status, 1);
  assert.match(refused.stderr, new RegExp(`its owners are ${OWNER}, not someone@example\\.org`));
  const withdrawn = sheriff(root, "approve", "--withdraw", sid("ours"));
  assert.equal(withdrawn.status, 0, withdrawn.stderr);
  assert.match(readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8"), /"withdrawn":true,"by":"someone@example\.org"/);
  assert.notEqual(sheriff(root, "confirm", sid("ours")).status, 0);
});

test("@spec s-f5rz6b7dhxejjts sheriff export, render and guide write the export and the map and print the guidelines", () => {
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
  assert.match(guided.stdout, /contracts: 4 nodes, 0 approved/);
  assert.match(guided.stdout, /The specification is a draft\./);
  assert.ok(guided.stdout.includes(sid("project")));
});

test("@spec s-f5rz6b7dhxejjts sheriff types writes the types where the technical appendix lists them, and refuses what cannot be generated", () => {
  const customer = (title: string) => node("customer", { kind: "recordType", title, fields: [{ name: "number", type: { is: "text" }, required: true, text: "" }], unknown: "refused" });
  const files = (title: string) => ({
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [customer(title)] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [
      node("generated types", { refs: [{ type: "implements", to: "s-e877bnfa559tvk9" }], list: { of: "the files of the generated types", members: ["src/types.ts"] } }),
    ] })),
  });
  const root = taking(files("customer"));
  const waits = sheriff(root, "types");
  assert.equal(waits.status, 0, waits.stdout + waits.stderr);
  assert.match(waits.stdout, new RegExp(`${sid("customer")}: a draft node; the files generated from it wait for its approval`));
  assert.doesNotMatch(waits.stdout, /written:/);
  approve(root, [sid("customer")], { me: OWNER });
  const run = sheriff(root, "types");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /written: src\/types\.ts/);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^export type Customer = \{$/m);
  const refused = sheriff(taking(files("3d customer")), "types");
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /3dCustomer cannot be generated in src\/types\.ts: not an identifier in TypeScript/);
});

test("@spec s-f5rz6b7dhxejjts sheriff show prints a node by its sid or its location", () => {
  const root = project();
  sheriff(root, "reindex");
  const run = sheriff(root, "show", "contracts/c");
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, new RegExp(`^# contracts/c shared\n\n\`${sid("shared")}\``));
  assert.match(run.stdout, /cites ← s-\w{15} contracts\/1\.1 ours/);
});

test("@spec s-f5rz6b7dhxejjts sheriff todos prints every item of the todos with its node", () => {
  const root = project();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].meta = { todos: [{ date: "2026-11-02", by: OWNER, text: "Define the user." }] };
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  sheriff(root, "reindex");
  const run = sheriff(root, "todos");
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.stdout, `2026-11-02 · ${OWNER}\nDefine the user.\n${sid("shared")} · contracts/c · shared\n`);
});

test("@spec s-xzcw3hv4hmxz7h7 sheriff reindex and sheriff binding refuse a file the schema refuses, naming it, rather than fail on it", () => {
  const root = project();
  sheriff(root, "reindex");
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  delete data.nodes[0].children[0].refs;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  for (const command of ["reindex", "binding"]) {
    const run = sheriff(root, command);
    assert.equal(run.status, 1, command);
    assert.match(run.stdout + run.stderr, /specs\/contracts\/c\.json: \/nodes\/0\/children\/0: must have required property 'refs'/, command);
    assert.doesNotMatch(run.stdout + run.stderr, /is not iterable|is not a function/, command);
  }
});
