import { test } from "node:test";
import assert from "node:assert/strict";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { builtStatuses, citations, fingerprint, incoming, locations, modelOf, LEVELS_RULE, ownersOf, partOf } from "../../src/model.ts";
import { loadConfig, modelFlags } from "../../src/config.ts";
import { REPO } from "../repo.ts";
import { BY_NUMBER, file, loc, node, OWNER, repo, sid, table, taking } from "../fixture.ts";

test("@spec s-ygg5kpcxgzq3m7w computes the location of every node of the SpecSheriff guidelines", () => {
  const spec = loadSpecification(REPO);
  const computed = locations(spec);
  for (const [s, at] of spec.nodes) assert.equal(computed.get(s), at.node.location, s);
});

test("@spec s-ygg5kpcxgzq3m7w gives a domain's header the domain's name as its location, and numbers its sections consecutively across its files", () => {
  const root = repo({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", code: null, sections: [] })),
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

test("@spec s-ygg5kpcxgzq3m7w numbers the node at the top of a file of contracts like any other node of the base specification, consecutively across the files of contracts", () => {
  const root = repo({
    "specs/contracts/a.json": file("contracts", "a", node("shared", { kind: "section", children: [node("agree"), node("user", { kind: "term", title: "user" }), node("settle", { kind: "section", children: [node("pay")] })] })),
    "specs/contracts/b.json": file("contracts", "b", node("more", { kind: "section", children: [node("bind")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("shared")), loc("contracts", "1"));
  assert.equal(ids.get(sid("agree")), loc("contracts", "1.1"));
  assert.equal(ids.get(sid("user")), "contracts/user");
  assert.equal(ids.get(sid("settle")), loc("contracts", "1.2"));
  assert.equal(ids.get(sid("pay")), loc("contracts", "1.2.1"));
  assert.equal(ids.get(sid("more")), loc("contracts", "2"));
  assert.equal(ids.get(sid("bind")), loc("contracts", "2.1"));
});

/** A TableRule with two columns: a node in the first cell of each row, and text in the second. */
test("@spec s-ygg5kpcxgzq3m7w gives the top node of a file of an extension of the guidelines the file's path as its location, and numbers the nodes in the cells of a TableRule after its children, row by row", () => {
  const root = repo({
    "specs/_guidelines/extensions/views.json": file("_guidelines/extensions", "views", node("views", { kind: "section", children: [node("map"), table("view checks", [["first row", "refused"], ["second row", "reported"]], { children: [node("under the table")] })] })),
  });
  const ids = locations(loadSpecification(root));
  const views = loc("_guidelines", "extensions", "views");
  assert.equal(ids.get(sid("views")), views);
  assert.equal(ids.get(sid("map")), loc(views, "1"));
  assert.equal(ids.get(sid("view checks")), loc(views, "2"));
  assert.equal(ids.get(sid("under the table")), loc(views, "2.1"));
  assert.equal(ids.get(sid("first row")), loc(views, "2.2"));
  assert.equal(ids.get(sid("second row")), loc(views, "2.3"));
});

test("@spec s-ygg5kpcxgzq3m7w goes through the files of a part in the code-point order of their paths", () => {
  const root = repo({
    "specs/contracts/a.json": file("contracts", "a", node("lower", { kind: "section", children: [node("in lower")] })),
    "specs/contracts/B.json": file("contracts", "B", node("upper", { kind: "section", children: [node("in upper")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("upper")), loc("contracts", "1"));
  assert.equal(ids.get(sid("lower")), loc("contracts", "2"));
});

test("@spec s-qzyacnqwvaeaps4 reads the citations of a TableRule from its text and its text cells, and leaves out what the nodes in its cells cite", () => {
  const [inText, inCell, inNode] = ["in text", "in a text cell", "in a node"].map((x) => sid(`cited ${x}`));
  const t = table("cited checks", [["checked", `refused (§${inCell})`]], { text: `See §${inText}.` });
  (t.groups as Array<{ rows: Array<{ cells: { check: { node: { text: string } } } }> }>)[0]!.rows[0]!.cells.check.node.text = `§${inNode}`;
  assert.deepEqual(citations(t).sids, [inText, inCell]);
});

test("@spec s-f5brvuuu6xmkj6t includes a node's kind in its fingerprint, except a TextRule's, and reads a kind that an earlier release wrote under its earlier name as the same kind", () => {
  const rule = node("kinds");
  assert.equal(fingerprint(rule), fingerprint({ ...rule, kind: "rule" }));
  assert.notEqual(fingerprint({ ...rule, kind: "TableRule" }), fingerprint(rule));
  const record = node("a record", { kind: "RecordType" });
  assert.equal(fingerprint(record), fingerprint({ ...record, kind: "recordType" }));
});

test("@spec s-f5brvuuu6xmkj6t leaves each cell holding a node out of a TableRule's fingerprint, and gives a node in a cell its column, its group and the text cells of its row", () => {
  const t = table("printed checks", [["printed", "refused"]]);
  const rows = (x: typeof t) => (x.groups as Array<{ rows: Array<{ cells: Record<string, { node?: { text: string }; text?: string }> }> }>)[0]!.rows;
  const changedNode = structuredClone(t);
  rows(changedNode)[0]!.cells.check!.node!.text = "Another check.";
  assert.equal(fingerprint(changedNode), fingerprint(t));
  const changedText = structuredClone(t);
  rows(changedText)[0]!.cells.cost!.text = "reported";
  assert.notEqual(fingerprint(changedText), fingerprint(t));
  const cellNode = rows(t)[0]!.cells.check!.node as never;
  const at = { column: "What is checked", group: null, row: { cost: "refused" } };
  assert.notEqual(fingerprint(cellNode, at), fingerprint(cellNode));
  assert.notEqual(fingerprint(cellNode, { ...at, row: { cost: "reported" } }), fingerprint(cellNode, at));
});

test("@spec s-f5brvuuu6xmkj6t gives a list's jsonSchema or valueList the fingerprint that it had when an earlier release wrote it under declaredIn, and includes the examples in the wording", () => {
  const listed = (list: object) => node("listed", { list: { of: "x", members: ["a"], ...list } });
  assert.equal(fingerprint(listed({ valueList: { file: "src/a.ts", symbol: "A" } })), fingerprint(listed({ declaredIn: { file: "src/a.ts", declaration: "A" } })));
  assert.equal(fingerprint(listed({ jsonSchema: { file: "s.json", pointer: "/a" } })), fingerprint(listed({ declaredIn: { file: "s.json", declaration: "/a" } })));
  const plain = node("with examples");
  assert.notEqual(fingerprint({ ...plain, examples: ["A case."] }), fingerprint(plain));
});

test("@spec s-agc6fb3vx46pc23 builds a section's status from the nodes in the cells of its TableRules too", () => {
  const t = table("status checks", [["a draft row", "refused"]], { status: "approved" });
  const root = repo({ "specs/contracts/c.json": file("contracts", "c", node("with a table", { kind: "section", children: [t] })) });
  assert.equal(builtStatuses(loadSpecification(root)).get(sid("with a table")), "draft");
});

test("@spec s-qzyacnqwvaeaps4 reads the citations of a node everywhere except in its links, the nodes under it and the values gathered beside a field, including text quoted as code", () => {
  const [b, c, d, e, f, g] = ["b", "c", "d", "e", "f", "g"].map((x) => sid(`cited ${x}`));
  const n = node("n", {
    text: `See §${b} and \`§${c}\`, and \`§<sid>\` and \`§s-…\` as notation.\n\n\`\`\`\nopen --> §${f}\n\`\`\``,
    reason: `§${d}, and ${BY_NUMBER}.`,
    gathered: [{ value: `§${g}`, sid: g }],
    children: [node("c", { text: `§${e}` })],
  });
  assert.deepEqual(citations(n), { sids: [b, c, f, d], locations: [BY_NUMBER] });
});

test("@spec s-bpdqd9v72wg7vsz builds the incoming links of the SpecSheriff guidelines as they stand", () => {
  const spec = loadSpecification(REPO);
  const built = incoming(spec);
  const key = (r: { type: string; from?: string }) => `${r.type} ${r.from}`;
  for (const [s, at] of spec.nodes) {
    const stored = at.node.refs.filter((r) => r.from).map(key).sort();
    assert.deepEqual((built.get(s) ?? []).map(key).sort(), stored, s);
  }
});

test("@spec s-bpdqd9v72wg7vsz builds into a node of the SpecSheriff guidelines only the links the SpecSheriff guidelines make to it", () => {
  const root = repo({
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", children: [node("base rule")] })),
    "specs/_guidelines/tools.json": file("_guidelines", "tools", node("tools", { kind: "section", children: [node("tool", { refs: [{ type: "implements", to: sid("base rule") }] })] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], children: [node("ours", { refs: [{ type: "refines", to: sid("base rule") }] })] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", children: [node("cited", { refs: [{ type: "cites", to: sid("base rule") }] })] })),
  });
  assert.deepEqual(incoming(loadSpecification(root)).get(sid("base rule")), [{ type: "implements", from: sid("tool") }]);
});

test("@spec s-bpdqd9v72wg7vsz builds no link of a project into the SpecSheriff guidelines it takes, and links within the project both ways", () => {
  const spec = loadSpecification(taking());
  assert.ok(!spec.nodes.get(LEVELS_RULE)!.node.refs.some((r) => r.from === sid("our levels")));
  assert.ok(!(incoming(spec).get(LEVELS_RULE) ?? []).some((r) => r.from === sid("our levels")));
  assert.ok(spec.nodes.get(sid("our levels"))!.node.refs.some((r) => r.type === "refines" && r.to === LEVELS_RULE));
});

test("@spec s-67vekyup7y8smap takes a node's owners from the nearest section or header naming them, else the specification's", () => {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", owners: ["bank@example.org"], level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("a", { kind: "section", children: [node("r1"), node("inner", { kind: "section", owners: ["inner@example.org", "second@example.org"], children: [node("r2")] })] })),
    "specs/contracts/c.json": file("contracts", "c", node("c", { kind: "section", children: [node("r3")] })),
  });
  const spec = loadSpecification(root);
  assert.deepEqual(ownersOf(spec, sid("r1")), ["bank@example.org"]);
  assert.deepEqual(ownersOf(spec, sid("r2")), ["inner@example.org", "second@example.org"]);
  assert.deepEqual(ownersOf(spec, sid("inner")), ["inner@example.org", "second@example.org"]);
  assert.deepEqual(ownersOf(spec, sid("r3")), [OWNER]);
  assert.deepEqual(ownersOf(spec, sid("levels")), [OWNER]);
});

test("@spec s-67vekyup7y8smap names no owner where the specification names none", () => {
  const spec = loadSpecification(repo({ "specs/contracts/c.json": file("contracts", "c", node("lone")) }));
  assert.deepEqual(ownersOf(spec, sid("lone")), []);
});

test("@spec s-9kfdycuq34beqvs builds a section's status from the nodes under it that are no section, and a domain's header's from every node of the domain", () => {
  const approved = { status: "approved" };
  const root = repo({
    "specs/bank/00-bank.json": file("bank", "00-bank", node("bank", { kind: "header", level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("all approved", { kind: "section", children: [node("a1", approved), node("inner", { kind: "section", children: [node("a2", approved)] })] })),
    "specs/bank/b.json": file("bank", "b", node("one draft", { kind: "section", children: [node("b1", approved), node("deep", { kind: "section", children: [node("b2")] })] })),
    "specs/contracts/c.json": file("contracts", "c", node("terms", { kind: "section", children: [node("t1", { kind: "term", ...approved })] })),
  });
  const built = builtStatuses(loadSpecification(root));
  assert.equal(built.get(sid("all approved")), "approved");
  assert.equal(built.get(sid("inner")), "approved");
  assert.equal(built.get(sid("one draft")), "draft");
  assert.equal(built.get(sid("deep")), "draft");
  assert.equal(built.get(sid("terms")), "approved");
  assert.equal(built.get(sid("bank")), "draft");
});

test("@spec s-d3nkw9b6mn98vuw gives the model the approval status that the last entry of approvalStatus sets, whatever the rules of project.json say", () => {
  const root = taking();
  const spec = loadSpecification(root);
  const flags = (approvalStatus: Array<{ status: "approved" | "draft"; by: string }>) => modelFlags(root, { ...loadConfig(root), approvalStatus }, spec);
  assert.equal(flags([]).approved, false);
  assert.equal(flags([{ status: "approved", by: OWNER }]).approved, true);
  assert.equal(flags([{ status: "approved", by: OWNER }, { status: "draft", by: OWNER }]).approved, false);
});

test("@spec s-f5brvuuu6xmkj6t fingerprints a node's wording and the values its kind adds, not its owners or what the reindex builds", () => {
  const base = node("f", { kind: "section", reason: "why" });
  const same = fingerprint(base);
  assert.match(same, /^[0-9a-f]{64}$/);
  assert.equal(fingerprint({ ...base, status: "approved", location: "x/9", refs: [{ type: "cites", to: sid("cited") }], meta: { todos: [] }, owners: ["x@y.z"], owner: "x@y.z" }), same);
  assert.notEqual(fingerprint({ ...base, title: "other" }), same);
  assert.notEqual(fingerprint({ ...base, reason: "other" }), same);
  const header = node("h", { kind: "header", level: "core", code: null, sections: [] });
  assert.equal(fingerprint({ ...header, sections: [{ sid: sid("section"), title: "t", text: "" }] }), fingerprint(header));
  assert.notEqual(fingerprint({ ...header, level: "auxiliary" }), fingerprint(header));
  const listed = node("l", { list: { of: "x", members: ["a", "b"] } });
  assert.notEqual(fingerprint({ ...listed, list: { of: "x", members: ["b", "a"] } }), fingerprint(listed));
  assert.equal(fingerprint({ ...listed, list: { members: ["a", "b"], of: "x" } }), fingerprint(listed));
});

test("@spec s-f5brvuuu6xmkj6t keeps the reason under its earlier name in the fingerprint, so an approval given before the rename stands", () => {
  const renamed = { location: "x/1", sid: sid("pinned"), kind: "TextRule", title: "t", status: "draft", text: "x", reason: "y", refs: [] };
  // The fingerprint the release before the rename gave this wording, with the reason under the key `rationale`.
  assert.equal(fingerprint(renamed as never), "d97a5bc9b8d7cd0b5e1a2e191f26f46d87b8c62e3b8a020269a747dc3b5562ff");
});

test("@spec s-zefk589ykh37b8u tells a file's part and whether it holds the SpecSheriff guidelines", () => {
  assert.deepEqual(partOf("specs/_guidelines/spec.json"), { part: "_guidelines", file: "spec", specSheriffGuidelines: true });
  assert.deepEqual(partOf("specs/_guidelines/project.json"), { part: "_guidelines", file: "project", specSheriffGuidelines: false });
  assert.deepEqual(partOf("specs/bank/00-bank.json"), { part: "bank", file: "00-bank", specSheriffGuidelines: false });
  assert.deepEqual(partOf("specs/_guidelines/extensions/domains.json"), { part: "_guidelines", file: "extensions/domains", specSheriffGuidelines: true });
});

test("@spec s-vsh384ybt4w25a2 numbers the nodes of a project's own kind among the rules of their section", () => {
  const root = repo({
    "specs/_schema/project.schema.json": { kinds: { job: { needsCode: true, schema: {} } } },
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", code: null, sections: [] })),
    "specs/bank/accounts.json": file("bank", "accounts", node("accounts", { kind: "section", children: [node("open"), node("nightly", { kind: "job" }), node("close")] })),
  });
  const ids = locations(loadSpecification(root));
  assert.equal(ids.get(sid("nightly")), loc("bank", "1.2"));
  assert.equal(ids.get(sid("close")), loc("bank", "1.3"));
});

test("@spec s-f5brvuuu6xmkj6t leaves out of the fingerprint only the values gathered in a field's x-enumSource, keeps a property named gathered, and hashes the kind of node that x-enumSource names under that kind's earlier name", () => {
  const record = (gathered: object, kind = "TextRule") => node("a record", { kind: "RecordType", schema: { type: "object", properties: {
    gathered: { type: "string", ...gathered },
    part: { "x-enumSource": { from: "kind", kind, gathered: [{ value: "a", sid: sid("a record") }] } },
  } } });
  assert.notEqual(fingerprint(record({ minLength: 1 })), fingerprint(record({})));
  const other = record({});
  ((other.schema as any).properties.part["x-enumSource"].gathered as unknown[]).push({ value: "b", sid: sid("a record") });
  assert.equal(fingerprint(other), fingerprint(record({})));
  assert.equal(fingerprint(record({}, "TextRule")), fingerprint(record({}, "rule")));
  assert.notEqual(fingerprint(record({}, "TextRule")), fingerprint(record({}, "section")));
});

test("@spec s-f5brvuuu6xmkj6t leaves the values gathered beside a field out of the fingerprint", () => {
  const field = (gathered?: object[]) => ({ name: "kind", type: { is: "one of", from: "domains" }, required: true, text: "", ...(gathered ? { gathered } : {}) });
  const record = (gathered?: object[]) => node("event", { kind: "RecordType", unknown: "refused", fields: [field(gathered)] });
  assert.equal(fingerprint(record([{ value: "paid", sid: sid("bank events") }])), fingerprint(record()));
});

test("@spec s-f5rz6b7dhxejjts sheriff model gives every node as its file holds it, with its part, its file, the node above it and the owners named nearest above it", () => {
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours." })),
    "specs/contracts/c.json": file("contracts", "c", node("accounts", { kind: "section", text: "Accounts.", children: [node("open", { reason: "Why." })] })),
  });
  reindex(root);
  const model = modelOf(loadSpecification(root), { approved: false, strict: true });
  assert.deepEqual([model.approvalStatus, model.strict], ["draft", true]);
  const open = model.nodes.find((n) => n.sid === sid("open"))!;
  assert.equal(open.location, loc("contracts", "1.1"));
  assert.equal(open.reason, "Why.");
  assert.deepEqual([open.part, open.file, open.parent, open.owners], ["contracts", "specs/contracts/c.json", sid("accounts"), [OWNER]]);
  assert.equal(open.children, undefined);
});

test("@spec s-f5brvuuu6xmkj6t fingerprints a field taking the values the domains add as earlier releases wrote it, so an approval given before the reindex rewrote it stands", () => {
  const field = (type: object) => ({ name: "kind", type, required: true, text: "" });
  const record = (type: object) => node("event", { kind: "RecordType", unknown: "refused", fields: [field({ is: "list of", of: type })] });
  assert.equal(fingerprint(record({ is: "one of", from: "domains" })), fingerprint(record({ is: "one of", values: [] })));
  assert.notEqual(fingerprint(record({ is: "one of", from: "domainNames" })), fingerprint(record({ is: "one of", values: [] })));
});
