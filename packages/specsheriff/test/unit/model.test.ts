import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { addresses, citations, fingerprint, incoming, ownerOf, partOf } from "../../src/model.ts";
import { REPO } from "../repo.ts";
import { file, node, OWNER, repo, sid } from "../fixture.ts";

test("s-kag2m9tzdnduxdx computes for every node of the core the address it stands at", () => {
  const spec = loadSpecification(REPO);
  const computed = addresses(spec);
  for (const [s, at] of spec.nodes) assert.equal(computed.get(s), at.node.id, s);
});

test("s-kag2m9tzdnduxdx addresses a domain's head by its name and numbers its sections straight through its files", () => {
  const root = repo({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("head", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/bank/accounts.json": file("bank", "accounts", node("accounts", { kind: "section", children: [node("open"), node("term", { kind: "term", title: "account" }), node("close")] })),
    "specs/bank/loans.json": file("bank", "loans", node("loans", { kind: "section", children: [node("lend")] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", children: [node("node")] })),
  });
  const ids = addresses(loadSpecification(root));
  assert.equal(ids.get(sid("head")), "bank");
  assert.equal(ids.get(sid("accounts")), "bank/1");
  assert.equal(ids.get(sid("open")), "bank/1.1");
  assert.equal(ids.get(sid("term")), "bank/account");
  assert.equal(ids.get(sid("close")), "bank/1.2");
  assert.equal(ids.get(sid("lend")), "bank/2.1");
  assert.equal(ids.get(sid("stack")), "tech/stack");
  assert.equal(ids.get(sid("node")), "tech/stack/1");
});

test("s-bpdqd9v72wg7vsz reads the citations of a node outside its links, the nodes under it and spans quoted as code", () => {
  const n = node("n", { text: "See §s-aaaaaaaaaaaaaab and `§s-aaaaaaaaaaaaaac`.", rationale: "§s-aaaaaaaaaaaaaad, and §1.4.", children: [node("c", { text: "§s-aaaaaaaaaaaaaae" })] });
  assert.deepEqual(citations(n), { sids: ["s-aaaaaaaaaaaaaab", "s-aaaaaaaaaaaaaad"], addresses: ["§1.4"] });
});

test("s-bpdqd9v72wg7vsz builds the incoming links of the core as they stand", () => {
  const spec = loadSpecification(REPO);
  const built = incoming(spec);
  const key = (r: { type: string; from?: string }) => `${r.type} ${r.from}`;
  for (const [s, at] of spec.nodes) {
    const stored = at.node.refs.filter((r) => r.from).map(key).sort();
    assert.deepEqual((built.get(s) ?? []).map(key).sort(), stored, s);
  }
});

test("s-67vekyup7y8smap takes a node's owner from the nearest section or head naming one, else the specification's", () => {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("head", { kind: "domain", owner: "bank@example.org", level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("a", { kind: "section", children: [node("r1"), node("inner", { kind: "section", owner: "inner@example.org", children: [node("r2")] })] })),
    "specs/contracts/c.json": file("contracts", "c", node("c", { kind: "section", children: [node("r3")] })),
  });
  const spec = loadSpecification(root);
  assert.equal(ownerOf(spec, sid("r1")), "bank@example.org");
  assert.equal(ownerOf(spec, sid("r2")), "inner@example.org");
  assert.equal(ownerOf(spec, sid("inner")), "inner@example.org");
  assert.equal(ownerOf(spec, sid("r3")), OWNER);
  assert.equal(ownerOf(spec, sid("levels")), OWNER);
});

test("s-67vekyup7y8smap names no owner where the specification names none", () => {
  const spec = loadSpecification(repo({ "specs/contracts/c.json": file("contracts", "c", node("lone")) }));
  assert.equal(ownerOf(spec, sid("lone")), null);
});

test("s-v4qus7raqnwzneb fingerprints a node's wording and the values its kind carries, not its owner or what the reindex builds", () => {
  const base = node("f", { kind: "section", rationale: "why" });
  const same = fingerprint(base);
  assert.match(same, /^[0-9a-f]{64}$/);
  assert.equal(fingerprint({ ...base, status: "checked", id: "x/9", refs: [{ type: "cites", to: "s-aaaaaaaaaaaaaab" }], meta: { todos: [] }, owner: "x@y.z" }), same);
  assert.notEqual(fingerprint({ ...base, title: "other" }), same);
  assert.notEqual(fingerprint({ ...base, rationale: "other" }), same);
  const head = node("h", { kind: "domain", level: "core", code: null, sections: [] });
  assert.equal(fingerprint({ ...head, sections: [{ sid: "s-aaaaaaaaaaaaaab", title: "t", text: "" }] }), fingerprint(head));
  assert.notEqual(fingerprint({ ...head, level: "auxiliary" }), fingerprint(head));
  const listed = node("l", { list: { of: "x", members: ["a", "b"] } });
  assert.notEqual(fingerprint({ ...listed, list: { of: "x", members: ["b", "a"] } }), fingerprint(listed));
  assert.equal(fingerprint({ ...listed, list: { members: ["a", "b"], of: "x" } }), fingerprint(listed));
});

test("s-zefk589ykh37b8u tells a file's part and whether it holds the core", () => {
  assert.deepEqual(partOf("specs/_guidelines/spec.json"), { part: "_guidelines", file: "spec", core: true });
  assert.deepEqual(partOf("specs/_guidelines/project.json"), { part: "_guidelines", file: "project", core: false });
  assert.deepEqual(partOf("specs/bank/00-bank.json"), { part: "bank", file: "00-bank", core: false });
});
