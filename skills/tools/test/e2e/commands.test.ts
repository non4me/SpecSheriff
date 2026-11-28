import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { approve } from "../../src/approvals.ts";
import { BASE, file, loc, node, OWN, OWNER, repo, sid, taking } from "../fixture.ts";
import { codeProject, editSpec, nodeIn, put } from "../code-project.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8" });
const git = (root: string, ...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

function project(): string {
  const root = repo({
    "specs/_guidelines/spec.json": BASE,
    "specs/_guidelines/project.json": OWN,
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
  assert.equal(c.nodes[0].location, loc("contracts", "1"));
  assert.deepEqual(c.nodes[0].refs, [{ type: "cites", from: sid("ours") }]);
  assert.match(run.stdout, /written: specs\/contracts\/c\.json/);
});

test("@spec s-w5wg69pvvhedsws sheriff reindex names the merge of a key written twice in a file whose lists of tests it rewrites", () => {
  const root = codeProject();
  const open = sid("open");
  put(root, "test/open.test.ts", `test("${open} opens an account", () => {});\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${open} opens an account`]));
  const path = join(root, "specs", "contracts", "c.json");
  const todo = (text: string) => `{ "todos": [{ "date": "2026-11-26", "by": "owner", "text": "${text}" }] }`;
  writeFileSync(path, readFileSync(path, "utf8").replace('"title": "draft",', `"title": "draft", "meta": ${todo("First.")}, "meta": ${todo("Second.")},`));
  const run = sheriff(root, "reindex");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /merged: specs\/contracts\/c\.json: "meta"/);
  assert.match(run.stdout, /rewritten: specs\/contracts\/c\.json/);
  const draft = JSON.parse(readFileSync(path, "utf8")).nodes[0].children[1];
  assert.deepEqual(draft.meta.todos.map((x: { text: string }) => x.text), ["First.", "Second."]);
});

test("@spec s-f5rz6b7dhxejjts sheriff validate passes what holds together and refuses what does not, naming where", () => {
  const root = project();
  sheriff(root, "reindex");
  const ok = sheriff(root, "validate");
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  const path = join(root, "specs", "contracts", "c.json");
  writeFileSync(path, readFileSync(path, "utf8").replace(`"location": "${loc("contracts", "1")}"`, `"location": "${loc("contracts", "9")}"`));
  const refused = sheriff(root, "validate");
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /specs\/contracts\/c\.json: .*contracts\/9 differs from the location computed for it/);
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

test("@spec s-upkur92ry6332y5 sheriff approve approves as the email git is configured with, and refuses where that is none of the node's owners", () => {
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
});

test("@spec s-xybjqp2rxh8gszf sheriff approve --withdraw records the withdrawal under the email address configured in git", () => {
  const root = project();
  sheriff(root, "reindex");
  assert.equal(sheriff(root, "approve", sid("ours")).status, 0);
  git(root, "config", "user.email", "someone@example.org");
  const withdrawn = sheriff(root, "approve", "--withdraw", sid("ours"));
  assert.equal(withdrawn.status, 0, withdrawn.stderr);
  assert.match(readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8"), /"withdrawn":true,"by":"someone@example\.org"/);
});

test("@spec s-f5rz6b7dhxejjts sheriff refuses the confirm command, which an earlier release accepted", () => {
  const root = project();
  sheriff(root, "reindex");
  assert.notEqual(sheriff(root, "confirm", sid("ours")).status, 0);
});

/** A project in which no Views extension is chosen. */
function withoutViews(): string {
  const root = project();
  sheriff(root, "reindex");
  const path = join(root, "sheriff.config.json");
  const settings = JSON.parse(readFileSync(path, "utf8"));
  settings.extensions = settings.extensions.filter((e: { name: string }) => e.name !== "views");
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
  return root;
}

test("@spec s-rpv4fkdqqguptqd sheriff map refuses to run where the project has not chosen the Views extension, naming it", () => {
  const refused = sheriff(withoutViews(), "map");
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /Views extension/);
});

test("@spec s-e3495enbc5h75c3 sheriff markdown refuses to run where the project has not chosen the Views extension, naming it", () => {
  const root = withoutViews();
  for (const command of ["markdown"]) {
    const refused = sheriff(root, command);
    assert.notEqual(refused.status, 0, command);
    assert.match(refused.stderr, /Views extension/, command);
  }
});

test("@spec s-f5rz6b7dhxejjts sheriff markdown, sheriff map and sheriff guide write the export, write the map and print the guidelines", () => {
  const root = project();
  sheriff(root, "reindex");
  const exported = sheriff(root, "markdown");
  assert.equal(exported.status, 0, exported.stderr);
  assert.match(exported.stdout, /written: md-version\/contracts\/c\.md/);
  const rendered = sheriff(root, "map");
  assert.equal(rendered.status, 0, rendered.stderr);
  assert.match(readFileSync(join(root, "specs", "_map", "index.html"), "utf8"), /markmap/);
  const guided = sheriff(root, "guide");
  assert.equal(guided.status, 0, guided.stderr);
  assert.match(guided.stdout, /contracts: 4 nodes, 0 approved/);
  assert.match(guided.stdout, /The specification is a draft\./);
  assert.ok(guided.stdout.includes(sid("project")));
});

test("@spec s-f5rz6b7dhxejjts sheriff types writes the types where the technical appendix lists them, and refuses what cannot be generated", () => {
  const customer = (title: string) => node("customer", { kind: "RecordType", title, schema: { type: "object", properties: { number: { type: "string" } }, required: ["number"], unevaluatedProperties: false } });
  const files = (title: string) => ({
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "Shared.", children: [customer(title)] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", text: "The stack.", children: [
      node("generated types", { refs: [{ type: "implements", to: "s-e877bnfa559tvk9" }], list: { of: "the files of the generated types", members: ["src/types.ts"] } }),
    ] })),
  });
  const root = taking(files("customer"));
  // Neither the RecordType nor the rule that lists the files has ever been approved, so nothing is written.
  const none = sheriff(root, "types");
  assert.equal(none.status, 0, none.stdout + none.stderr);
  assert.doesNotMatch(none.stdout, /written:/);
  approve(root, [sid("customer"), sid("generated types")], { me: OWNER });
  const run = sheriff(root, "types");
  assert.equal(run.status, 0, run.stdout + run.stderr);
  assert.match(run.stdout, /written: src\/types\.ts/);
  assert.match(readFileSync(join(root, "src", "types.ts"), "utf8"), /^export type Customer = \{$/m);
  const named = taking(files("3d customer"));
  approve(named, [sid("customer"), sid("generated types")], { me: OWNER });
  const refused = sheriff(named, "types");
  assert.equal(refused.status, 1);
  assert.match(refused.stdout, /3dCustomer cannot be generated in src\/types\.ts: not an identifier in TypeScript/);
});

test("@spec s-f5rz6b7dhxejjts sheriff show prints a node by its sid or its location", () => {
  const root = project();
  sheriff(root, "reindex");
  const run = sheriff(root, "show", loc("contracts", "1"));
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, new RegExp(`^# ${loc("contracts", "1")} shared\n\n\`${sid("shared")}\``));
  assert.match(run.stdout, /cites ← s-\w{15} contracts\/2\.1 ours/);
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
  assert.equal(run.stdout, `2026-11-02 · ${OWNER}\nDefine the user.\n${sid("shared")} · ${loc("contracts", "1")} · shared\n`);
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

test("@spec s-chsfpkgpmfk4fft sheriff settings prints the settings when no terminal is attached, and, given arguments, records the change that they name as an entry that names the owner", () => {
  const root = project();
  sheriff(root, "reindex");
  const shown = sheriff(root, "settings");
  assert.equal(shown.status, 0, shown.stderr);
  assert.match(shown.stdout, /^status: draft$/m);
  assert.match(shown.stdout, /^strict: off$/m);
  assert.match(shown.stdout, /^extension views: chosen$/m);
  const done = sheriff(root, "settings", "strict", "on");
  assert.equal(done.status, 0, done.stdout + done.stderr);
  assert.match(done.stdout, /recorded/);
  assert.deepEqual(JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8")).strict, [{ on: true, by: OWNER }]);
  const refused = sheriff(root, "settings", "status");
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /sheriff settings/);
});
