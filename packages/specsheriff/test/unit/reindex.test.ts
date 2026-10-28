import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { confirm } from "../../src/confirmations.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification, specPaths } from "../../src/spec-files.ts";
import { SID } from "../../src/model.ts";
import { file, node, OWNER, repo, sid } from "../fixture.ts";

const read = (root: string) => Object.fromEntries(specPaths(root).map((p) => [p, readFileSync(join(root, p), "utf8")]));
const at = (root: string, name: string) => loadSpecification(root).nodes.get(sid(name))!.node;

function bank(extra: Record<string, unknown> = {}) {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("head", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("shared") }] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open", { refs: [{ type: "cites", to: sid("close") }, { type: "cites", from: sid("lend") }] }), node("close")] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "What is shared.", children: [node("term", { kind: "term", title: "account" })] })),
    ...extra,
  });
}

test("s-kag2m9tzdnduxdx computes every node's address from where it stands", () => {
  const root = bank();
  reindex(root);
  assert.equal(at(root, "head").id, "bank");
  assert.equal(at(root, "close").id, "bank/1.2");
  assert.equal(at(root, "term").id, "contracts/account");
});

test("s-bpdqd9v72wg7vsz empties every incoming list and rebuilds it from the outgoing links", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "open").refs, [{ type: "cites", to: sid("close") }]);
  assert.deepEqual(at(root, "close").refs, [{ type: "cites", from: sid("open") }]);
  assert.deepEqual(at(root, "shared").refs, [{ type: "consumes", from: sid("head") }]);
});

test("s-yggv9myedprnaa7 rebuilds the index in a domain's head from the domain's sections", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "head").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts." }]);
});

test("s-yggv9myedprnaa7 names in a head's index the heads of the domains using a section", () => {
  const root = bank({
    "specs/loans/00-loans.json": file("loans", "00-loans", node("loans", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("accounts") }] })),
  });
  reindex(root);
  assert.deepEqual(at(root, "head").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts.", usedBy: [sid("loans")] }]);
});

test("s-f5rz6b7dhxejjts gives a sid to a node that has none, its address and sid first", () => {
  const root = bank();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.push({ kind: "rule", title: "new", status: "", text: "New.", refs: [] });
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  const added = JSON.parse(readFileSync(path, "utf8")).nodes[0].children[1];
  assert.match(added.sid, SID);
  assert.equal(added.id, "contracts/1.1");
  assert.deepEqual(Object.keys(added).slice(0, 3), ["id", "sid", "kind"]);
});

test("s-5ah25f6gy99panq empties the status of a checked node whose wording its owner has not confirmed", () => {
  const root = bank();
  confirm(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].status = "checked";
  writeFileSync(path, JSON.stringify(data));
  const report = reindex(root);
  assert.equal(at(root, "shared").status, "");
  assert.equal(at(root, "levels").status, "checked");
  assert.deepEqual(report.emptied, [sid("shared")]);
});

test("s-5ah25f6gy99panq empties the status of a node confirmed by someone who is not its owner", () => {
  const root = bank();
  confirm(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].owner = "new@example.org";
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  assert.equal(at(root, "levels").status, "");
});

test("s-bsya3febm6u64ab leaves the status of the core a project takes as it stands, and judges it where the core is written", () => {
  const core = file("_guidelines", "spec", node("core", { kind: "section", status: "checked", children: [node("core rule", { status: "checked" })] }));
  const taking = bank({ "specs/_guidelines/spec.json": core, "sheriff.config.json": { code: [], tests: [], writesCore: false } });
  reindex(taking);
  assert.equal(at(taking, "core rule").status, "checked");
  const writing = bank({ "specs/_guidelines/spec.json": core });
  reindex(writing);
  assert.equal(at(writing, "core rule").status, "");
});

test("s-f5rz6b7dhxejjts merges the values an object holds under one key and names every merge", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  const text = readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "refs": [{"type": "cites", "to": "' + sid("term") + '"}],');
  writeFileSync(path, text);
  const report = reindex(root);
  assert.deepEqual(report.merged.map((m) => `${m.file} ${m.key}`), ["specs/bank/a.json refs"]);
  assert.deepEqual(at(root, "accounts").refs, [{ type: "cites", to: sid("term") }]);
});

test("s-f5rz6b7dhxejjts refuses two values it cannot merge and then writes no file", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Other.",'));
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/bank\/a\.json.*"text"/s);
  assert.deepEqual(read(root), before);
});

test("s-jsqxdx47wkkj7gp run again on what it left, the reindex changes nothing", () => {
  const root = bank();
  reindex(root);
  const once = read(root);
  const again = reindex(root);
  assert.deepEqual(read(root), once);
  assert.deepEqual(again.written, []);
});
