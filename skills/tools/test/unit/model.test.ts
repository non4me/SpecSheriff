import { test } from "node:test";
import assert from "node:assert/strict";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { citations, fingerprint, incoming, locations, modelOf, LEVELS_RULE, ownerOf, partOf } from "../../src/model.ts";
import { REPO } from "../repo.ts";
import { BY_NUMBER, file, loc, node, OWNER, repo, sid, taking } from "../fixture.ts";

test("s-kag2m9tzdnduxdx computes for every node of the SpecSheriff guidelines the location it is at", () => {
  const spec = loadSpecification(REPO);
  const computed = locations(spec);
  for (const [s, at] of spec.nodes) assert.equal(computed.get(s), at.node.location, s);
});

test("s-kag2m9tzdnduxdx locates a domain's header by its name and numbers its sections straight through its files", () => {
  const root = repo({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/bank/accounts.json": file("bank", "accounts", node("accounts", { kind: "section", children: [node("open"), node("term", { kind: "term", title: "account" }), node("close")] })),
    "specs/bank/loans.json": file("bank", "loans", node("loans", { kind: "section", children: [node("lend")] })),
    "specs/tech/stack.json": file("tech", "stack", node("stack", { kind: "section", children: [node("node")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("header")), "bank");
  assert.equal(ids.get(sid("accounts")), "bank/1");
  assert.equal(ids.get(sid("open")), "bank/1.1");
  assert.equal(ids.get(sid("term")), "bank/account");
  assert.equal(ids.get(sid("close")), "bank/1.2");
  assert.equal(ids.get(sid("lend")), "bank/2.1");
  assert.equal(ids.get(sid("stack")), "tech/stack");
  assert.equal(ids.get(sid("node")), "tech/stack/1");
});

test("s-kag2m9tzdnduxdx locates the node at the top of a file of contracts by the part's name and the file's, and numbers the rest of contracts straight through its files", () => {
  const root = repo({
    "specs/contracts/a.json": file("contracts", "a", node("shared", { kind: "section", children: [node("agree"), node("user", { kind: "term", title: "user" }), node("settle", { kind: "section", children: [node("pay")] })] })),
    "specs/contracts/b.json": file("contracts", "b", node("more", { kind: "section", children: [node("bind")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("shared")), "contracts/a");
  assert.equal(ids.get(sid("agree")), loc("contracts", "1"));
  assert.equal(ids.get(sid("user")), "contracts/user");
  assert.equal(ids.get(sid("settle")), loc("contracts", "2"));
  assert.equal(ids.get(sid("pay")), loc("contracts", "2.1"));
  assert.equal(ids.get(sid("more")), "contracts/b");
  assert.equal(ids.get(sid("bind")), loc("contracts", "3"));
});

test("s-bpdqd9v72wg7vsz reads the citations of a node outside its links, the nodes under it and the values gathered beside a field, text quoted as code included", () => {
  const [b, c, d, e, f, g] = ["b", "c", "d", "e", "f", "g"].map((x) => sid(`cited ${x}`));
  const n = node("n", {
    text: `See §${b} and \`§${c}\`, and \`§<sid>\` and \`§s-…\` as notation.\n\n\`\`\`\nopen --> §${f}\n\`\`\``,
    reason: `§${d}, and ${BY_NUMBER}.`,
    gathered: [{ value: `§${g}`, sid: g }],
    children: [node("c", { text: `§${e}` })],
  });
  assert.deepEqual(citations(n), { sids: [b, c, f, d], locations: [BY_NUMBER] });
});

test("s-bpdqd9v72wg7vsz builds the incoming links of the SpecSheriff guidelines as they stand", () => {
  const spec = loadSpecification(REPO);
  const built = incoming(spec);
  const key = (r: { type: string; from?: string }) => `${r.type} ${r.from}`;
  for (const [s, at] of spec.nodes) {
    const stored = at.node.refs.filter((r) => r.from).map(key).sort();
    assert.deepEqual((built.get(s) ?? []).map(key).sort(), stored, s);
  }
});

test("s-bpdqd9v72wg7vsz builds into a node of the SpecSheriff guidelines only the links the SpecSheriff guidelines make to it", () => {
  const root = repo({
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", children: [node("base rule")] })),
    "specs/_guidelines/tools.json": file("_guidelines", "tools", node("tools", { kind: "section", children: [node("tool", { refs: [{ type: "implements", to: sid("base rule") }] })] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("ours", { refs: [{ type: "refines", to: sid("base rule") }] })] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", children: [node("cited", { refs: [{ type: "cites", to: sid("base rule") }] })] })),
  });
  assert.deepEqual(incoming(loadSpecification(root)).get(sid("base rule")), [{ type: "implements", from: sid("tool") }]);
});

test("s-bpdqd9v72wg7vsz builds no link of a project into the SpecSheriff guidelines it takes, and links within the project both ways", () => {
  const spec = loadSpecification(taking());
  assert.ok(!spec.nodes.get(LEVELS_RULE)!.node.refs.some((r) => r.from === sid("our levels")));
  assert.ok(!(incoming(spec).get(LEVELS_RULE) ?? []).some((r) => r.from === sid("our levels")));
  assert.ok(spec.nodes.get(sid("our levels"))!.node.refs.some((r) => r.type === "refines" && r.to === LEVELS_RULE));
});

test("s-67vekyup7y8smap takes a node's owner from the nearest section or header naming one, else the specification's", () => {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "domain", owner: "bank@example.org", level: "core", code: null, sections: [] })),
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
  const base = node("f", { kind: "section", reason: "why" });
  const same = fingerprint(base);
  assert.match(same, /^[0-9a-f]{64}$/);
  assert.equal(fingerprint({ ...base, status: "checked", location: "x/9", refs: [{ type: "cites", to: sid("cited") }], meta: { todos: [] }, owner: "x@y.z" }), same);
  assert.notEqual(fingerprint({ ...base, title: "other" }), same);
  assert.notEqual(fingerprint({ ...base, reason: "other" }), same);
  const header = node("h", { kind: "domain", level: "core", code: null, sections: [] });
  assert.equal(fingerprint({ ...header, sections: [{ sid: sid("section"), title: "t", text: "" }] }), fingerprint(header));
  assert.notEqual(fingerprint({ ...header, level: "auxiliary" }), fingerprint(header));
  const listed = node("l", { list: { of: "x", members: ["a", "b"] } });
  assert.notEqual(fingerprint({ ...listed, list: { of: "x", members: ["b", "a"] } }), fingerprint(listed));
  assert.equal(fingerprint({ ...listed, list: { members: ["a", "b"], of: "x" } }), fingerprint(listed));
});

test("s-v4qus7raqnwzneb keeps the reason under its earlier name in the fingerprint, so a confirmation given before the rename stands", () => {
  const renamed = { location: "x/1", sid: sid("pinned"), kind: "rule", title: "t", status: "", text: "x", reason: "y", refs: [] };
  // The fingerprint the release before the rename gave this wording, with the reason under the key `rationale`.
  assert.equal(fingerprint(renamed as never), "d97a5bc9b8d7cd0b5e1a2e191f26f46d87b8c62e3b8a020269a747dc3b5562ff");
});

test("s-zefk589ykh37b8u tells a file's part and whether it holds the SpecSheriff guidelines", () => {
  assert.deepEqual(partOf("specs/_guidelines/spec.json"), { part: "_guidelines", file: "spec", specSheriffGuidelines: true });
  assert.deepEqual(partOf("specs/_guidelines/project.json"), { part: "_guidelines", file: "project", specSheriffGuidelines: false });
  assert.deepEqual(partOf("specs/bank/00-bank.json"), { part: "bank", file: "00-bank", specSheriffGuidelines: false });
});

test("s-vsh384ybt4w25a2 numbers the nodes of a project's own kind among the rules of their section", () => {
  const root = repo({
    "specs/_schema/project.schema.json": { kinds: { job: { needsCode: true, schema: {} } } },
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "domain", level: "core", code: null, sections: [] })),
    "specs/bank/accounts.json": file("bank", "accounts", node("accounts", { kind: "section", children: [node("open"), node("nightly", { kind: "job" }), node("close")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("nightly")), loc("bank", "1.2"));
  assert.equal(ids.get(sid("close")), loc("bank", "1.3"));
});

test("s-v4qus7raqnwzneb leaves the values gathered beside a field out of the fingerprint", () => {
  const field = (gathered?: object[]) => ({ name: "kind", type: { is: "one of", from: "domains" }, required: true, text: "", ...(gathered ? { gathered } : {}) });
  const record = (gathered?: object[]) => node("event", { kind: "recordType", unknown: "refused", fields: [field(gathered)] });
  assert.equal(fingerprint(record([{ value: "paid", sid: sid("bank events") }])), fingerprint(record()));
});

test("s-f5rz6b7dhxejjts sheriff model gives every node as its file holds it, with its part, its file, the node above it and the owner named nearest above it", () => {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, text: "Ours." })),
    "specs/contracts/c.json": file("contracts", "c", node("accounts", { kind: "section", text: "Accounts.", children: [node("open", { reason: "Why." })] })),
  });
  reindex(root);
  const model = modelOf(loadSpecification(root));
  const open = model.nodes.find((n) => n.sid === sid("open"))!;
  assert.equal(open.location, loc("contracts", "1"));
  assert.equal(open.reason, "Why.");
  assert.deepEqual([open.part, open.file, open.parent, open.owner], ["contracts", "specs/contracts/c.json", sid("accounts"), OWNER]);
  assert.equal(open.children, undefined);
});

test("s-v4qus7raqnwzneb fingerprints a field taking the values the domains add as earlier releases wrote it, so a confirmation given before the reindex rewrote it stands", () => {
  const field = (type: object) => ({ name: "kind", type, required: true, text: "" });
  const record = (type: object) => node("event", { kind: "recordType", unknown: "refused", fields: [field({ is: "list of", of: type })] });
  assert.equal(fingerprint(record({ is: "one of", from: "domains" })), fingerprint(record({ is: "one of", values: [] })));
  assert.notEqual(fingerprint(record({ is: "one of", from: "domainNames" })), fingerprint(record({ is: "one of", values: [] })));
});
