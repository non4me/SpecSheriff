import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { confirm } from "../../src/confirmations.ts";
import { reindex, rewriteTests } from "../../src/reindex.ts";
import { loadSpecification, specPaths } from "../../src/spec-files.ts";
import { LEVELS_RULE, SID } from "../../src/model.ts";
import { file, loc, node, OWNER, repo, sid, taking } from "../fixture.ts";
import { codeProject, editSpec, nodeIn, put } from "../code-project.ts";

const read = (root: string) => Object.fromEntries(specPaths(root).map((p) => [p, readFileSync(join(root, p), "utf8")]));
const at = (root: string, name: string) => loadSpecification(root).nodes.get(sid(name))!.node;

function bank(extra: Record<string, unknown> = {}) {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("shared") }] })),
    "specs/bank/a.json": file("bank", "a", node("accounts", { kind: "section", text: "Accounts.", children: [node("open", { refs: [{ type: "cites", to: sid("close") }, { type: "cites", from: sid("lend") }] }), node("close")] })),
    "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", text: "What is shared.", children: [node("term", { kind: "term", title: "account" })] })),
    ...extra,
  });
}

test("@spec s-kag2m9tzdnduxdx computes every node's location from where it is", () => {
  const root = bank();
  reindex(root);
  assert.equal(at(root, "header").location, "bank");
  assert.equal(at(root, "close").location, "bank/1.2");
  assert.equal(at(root, "term").location, "contracts/account");
});

test("@spec s-bpdqd9v72wg7vsz empties every incoming list and rebuilds it from the outgoing links", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "open").refs, [{ type: "cites", to: sid("close") }]);
  assert.deepEqual(at(root, "close").refs, [{ type: "cites", from: sid("open") }]);
  assert.deepEqual(at(root, "shared").refs, [{ type: "consumes", from: sid("header") }]);
});

test("@spec s-bpdqd9v72wg7vsz empties the incoming lists of the nodes of the archive, and builds none of their links into another node", () => {
  const root = bank({
    "specs/_archive/bank.json": file("bank", "bank", { ...node("gone", { refs: [{ type: "cites", from: sid("open") }, { type: "cites", to: sid("close") }] }), location: "bank/1.3", archived: { date: "2026-10-28", reason: "Gone." } }),
  });
  reindex(root);
  const archived = JSON.parse(readFileSync(join(root, "specs", "_archive", "bank.json"), "utf8")).nodes[0];
  assert.deepEqual(archived.refs, [{ type: "cites", to: sid("close") }]);
  assert.deepEqual(at(root, "close").refs, [{ type: "cites", from: sid("open") }]);
});

test("@spec s-yggv9myedprnaa7 rebuilds the index in a domain's header from the domain's sections", () => {
  const root = bank();
  reindex(root);
  assert.deepEqual(at(root, "header").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts." }]);
});

test("@spec s-yggv9myedprnaa7 names in a header's index the headers of the domains using a section", () => {
  const root = bank({
    "specs/loans/00-loans.json": file("loans", "00-loans", node("loans", { kind: "domain", level: "core", code: null, sections: [], refs: [{ type: "consumes", to: sid("accounts") }] })),
  });
  reindex(root);
  assert.deepEqual(at(root, "header").sections, [{ sid: sid("accounts"), title: "accounts", text: "Accounts.", usedBy: [sid("loans")] }]);
});

test("@spec s-f5rz6b7dhxejjts gives a sid to a node that has none, its location and sid first", () => {
  const root = bank();
  const path = join(root, "specs", "contracts", "c.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children.push({ kind: "rule", title: "new", status: "", text: "New.", refs: [] });
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  const added = JSON.parse(readFileSync(path, "utf8")).nodes[0].children[1];
  assert.match(added.sid, SID);
  assert.equal(added.location, loc("contracts", "1"));
  assert.deepEqual(Object.keys(added).slice(0, 3), ["location", "sid", "kind"]);
});

test("@spec s-5ah25f6gy99panq empties the status of a checked node whose wording its owner has not confirmed", () => {
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

test("@spec s-5ah25f6gy99panq empties the status of a node confirmed by someone who is not its owner", () => {
  const root = bank();
  confirm(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].owner = "new@example.org";
  writeFileSync(path, JSON.stringify(data));
  reindex(root);
  assert.equal(at(root, "levels").status, "");
});

test("@spec s-bsya3febm6u64ab leaves the status of the SpecSheriff guidelines a project takes as it stands, and judges it where they are written", () => {
  const project = taking();
  reindex(project);
  assert.equal(loadSpecification(project).nodes.get(LEVELS_RULE)!.node.status, "checked");
  const core = file("_guidelines", "spec", node("core", { kind: "section", status: "checked", children: [node("core rule", { status: "checked" })] }));
  const writing = bank({ "specs/_guidelines/spec.json": core });
  reindex(writing);
  assert.equal(at(writing, "core rule").status, "");
});

test("@spec s-f5rz6b7dhxejjts renames what an earlier release wrote under another name, each key keeping its place", () => {
  const old = (name: string, fields: Record<string, unknown>) => {
    const { location: _, ...rest } = node(name, fields);
    return { id: "bank/9", ...rest };
  };
  const root = bank({
    "specs/bank/b.json": file("bank", "b", old("loans", { kind: "section", text: "Loans.", children: [old("lend", { rationale: "Why lend." }), old("loan", { kind: "record", title: "loan", fields: [], unknown: "refused" })] })),
    "specs/_archive/bank.json": file("bank", "bank", { ...old("gone", { rationale: "Why it went." }), archived: { date: "2026-10-28", reason: "Gone." } }),
  });
  reindex(root);
  const lend = JSON.parse(readFileSync(join(root, "specs", "bank", "b.json"), "utf8")).nodes[0].children[0];
  assert.deepEqual(Object.keys(lend), ["location", "sid", "kind", "title", "status", "text", "refs", "reason"]);
  assert.equal(lend.location, "bank/2.1");
  assert.equal(lend.reason, "Why lend.");
  assert.equal(at(root, "loan").kind, "recordType");
  const gone = JSON.parse(readFileSync(join(root, "specs", "_archive", "bank.json"), "utf8")).nodes[0];
  assert.equal(gone.reason, "Why it went.");
  assert.equal(gone.rationale, undefined);
  assert.equal(gone.id, undefined);
  assert.equal(gone.location, "bank/9");
});

test("@spec s-f5rz6b7dhxejjts merges the values an object holds under one key and names every merge", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  const text = readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "refs": [{"type": "cites", "to": "' + sid("term") + '"}],');
  writeFileSync(path, text);
  const report = reindex(root);
  assert.deepEqual(report.merged.map((m) => `${m.file} ${m.key}`), ["specs/bank/a.json refs"]);
  assert.deepEqual(at(root, "accounts").refs, [{ type: "cites", to: sid("term") }]);
});

test("@spec s-f5rz6b7dhxejjts refuses two values it cannot merge and then writes no file", () => {
  const root = bank();
  const path = join(root, "specs", "bank", "a.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"text": "Accounts.",', '"text": "Accounts.",\n      "text": "Other.",'));
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/bank\/a\.json.*"text"/s);
  assert.deepEqual(read(root), before);
});

test("@spec s-jsqxdx47wkkj7gp run again on what it left, the reindex changes nothing", () => {
  const root = bank();
  reindex(root);
  const once = read(root);
  const again = reindex(root);
  assert.deepEqual(read(root), once);
  assert.deepEqual(again.written, []);
});

test("@spec s-ju5vcanbjph7mgh writes beside a field the values gathered from its source, each with the node it comes from, and none beside a field holding its own list", () => {
  const root = bank({
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "recordType", title: "event", unknown: "refused", fields: [
        { name: "kind", type: { is: "one of", from: "domains" }, required: true, text: "" },
        { name: "domain", type: { is: "one of", from: "domainNames" }, required: true, text: "" },
        { name: "rule", type: { is: "one of", from: "kindSids", kind: "rule" }, required: true, text: "" },
        { name: "colour", type: { is: "one of", values: ["red"] }, required: true, text: "" },
      ] }),
    ] })),
    "specs/bank/e.json": file("bank", "e", node("events", { kind: "section", text: "Events.", children: [
      node("bank events", { list: { of: "the kinds of event", members: ["opened", "paid"], field: "kind" }, refs: [{ type: "refines", to: sid("event") }] }),
    ] })),
  });
  reindex(root);
  const fields = at(root, "event").fields as Array<{ name: string; gathered?: Array<{ value: string; sid: string }> }>;
  const of = (name: string) => fields.find((f) => f.name === name)!.gathered;
  assert.deepEqual(of("kind"), [{ value: "opened", sid: sid("bank events") }, { value: "paid", sid: sid("bank events") }]);
  assert.deepEqual(of("domain"), [{ value: "bank", sid: sid("header") }]);
  assert.ok(of("rule")!.some((g) => g.value === sid("open") && g.sid === sid("open")), JSON.stringify(of("rule")));
  assert.equal(of("colour"), undefined);
});

test("@spec s-f5rz6b7dhxejjts gives a field of type one of whose own list an earlier release wrote empty the values the domains add", () => {
  const root = bank({
    "specs/contracts/k.json": file("contracts", "k", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "recordType", title: "event", unknown: "refused", fields: [{ name: "kind", type: { is: "one of", values: [] }, required: true, text: "" }] }),
    ] })),
  });
  reindex(root);
  assert.deepEqual((at(root, "event").fields as Array<{ type: unknown }>)[0]!.type, { is: "one of", from: "domains" });
});

/** Rewrites a file of the specification as `change` leaves its data. */
const rewrite = (root: string, path: string, change: (d: any) => void) => {
  const data = JSON.parse(readFileSync(join(root, path), "utf8"));
  change(data);
  writeFileSync(join(root, path), JSON.stringify(data, null, 2) + "\n");
};

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses a file the schema refuses, naming the file and every refusal in it, and then writes no file", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => {
    delete d.nodes[0].children[0].refs;
    d.nodes[0].children[1].children = "none";
  });
  rewrite(root, "specs/contracts/c.json", (d) => delete d.nodes[0].children[0].sid);
  const before = read(root);
  assert.throws(() => reindex(root), (error: Error) => {
    assert.match(error.message, /specs\/bank\/a\.json: \/nodes\/0\/children\/0: must have required property 'refs'/);
    assert.match(error.message, /specs\/bank\/a\.json: \/nodes\/0\/children\/1\/children: must be array/);
    assert.doesNotMatch(error.message, /specs\/contracts\/c\.json/);
    return true;
  });
  assert.deepEqual(read(root), before);
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses a sid that is not one, since only a sid a node lacks is left out of the validation", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => (d.nodes[0].children[1].sid = "s-not-a-sid"));
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/bank\/a\.json: \/nodes\/0\/children\/1\/sid: must match pattern/);
  assert.deepEqual(read(root), before);
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex validates once it has changed what an earlier release wrote, and leaves out what it writes itself", () => {
  const root = bank();
  rewrite(root, "specs/bank/a.json", (d) => {
    const close = d.nodes[0].children[1];
    delete close.sid;
    delete close.location;
    d.nodes[0].children[0].id = "an old address";
    delete d.nodes[0].children[0].location;
    d.nodes[0].children[0].rationale = "An old reason.";
    close.refs.push({ type: "cites", from: "not even a sid" });
  });
  rewrite(root, "specs/bank/00-bank.json", (d) => (d.nodes[0].sections = [{ title: "stale" }]));
  reindex(root);
  const open = at(root, "open");
  assert.equal(open.reason, "An old reason.");
  assert.equal(open.location, "bank/1.1");
  assert.ok(SID.test(loadSpecification(root).nodes.get(sid("accounts"))!.node.children![1]!.sid));
});

test("@spec s-xzcw3hv4hmxz7h7 the reindex refuses where the schema of an extension refuses the project's extension, naming it, and then writes no file", () => {
  const root = bank({ "specs/_schema/project.schema.json": { nodes: {} } });
  const before = read(root);
  assert.throws(() => reindex(root), /specs\/_schema\/project\.schema\.json: .*"nodes"/);
  assert.deepEqual(read(root), before);
});

test("@spec s-f5rz6b7dhxejjts rewrites each test naming its node by a bare sid, opening its name or as its mark, and the lists naming it, naming each file", async () => {
  const root = codeProject();
  const open = sid("open");
  const ts = `test("${open} opens an account", () => {});\ntest("${open}", () => {});\nconst fixture = 'test("${open} is no test")';\ntest("@spec ${open} already", () => {});\ntest("${open}x is no sid", () => {});\n`;
  put(root, "test/open.test.ts", ts);
  put(root, "test/test_open.py", `import pytest\n\n@pytest.mark.spec("${open}")\ndef test_open():\n    pass\n`);
  editSpec(root, (d) => (nodeIn(d, "open").meta.tests = [`test/open.test.ts::${open} opens an account`, `test/open.test.ts::${open}`, "test/test_open.py::test_open"]));
  assert.deepEqual(await rewriteTests(root), ["test/open.test.ts", "test/test_open.py"]);
  const want = ts.replace(`test("${open} opens`, `test("@spec ${open} opens`).replace(`test("${open}", `, `test("@spec ${open}", `);
  assert.equal(readFileSync(join(root, "test", "open.test.ts"), "utf8"), want);
  assert.equal(readFileSync(join(root, "test", "test_open.py"), "utf8"), `import pytest\n\n@pytest.mark.spec("@spec ${open}")\ndef test_open():\n    pass\n`);
  assert.deepEqual((at(root, "open").meta as { tests: string[] }).tests, [`test/open.test.ts::@spec ${open} opens an account`, `test/open.test.ts::@spec ${open}`, "test/test_open.py::test_open"]);
  assert.deepEqual(await rewriteTests(root), [], "run again, it rewrites nothing");
});
