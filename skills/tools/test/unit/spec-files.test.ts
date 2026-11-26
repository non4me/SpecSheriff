import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { canonical, loadSpecification, writeSpecFile } from "../../src/spec-files.ts";
import { LEVELS_RULE } from "../../src/model.ts";
import { reindex } from "../../src/reindex.ts";
import { validate } from "../../src/validate.ts";
import { REPO } from "../repo.ts";
import { file, node, repo, sid, taking } from "../fixture.ts";

test("@spec s-zefk589ykh37b8u outside the repository the SpecSheriff guidelines are written in, reads them and their schema from the SpecSheriff tools", () => {
  const root = taking();
  const at = loadSpecification(root).nodes.get(LEVELS_RULE)!;
  assert.equal(at.file.path, "specs/_guidelines/extensions/domains.json");
  assert.deepEqual(validate(root), []);
  reindex(root);
  assert.ok(!existsSync(join(root, "specs", "_guidelines", "spec.json")), "and never written into the project");
});

function copyOfSpecs(): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(join(REPO, "specs"), join(root, "specs"), { recursive: true });
  return root;
}

test("@spec s-zefk589ykh37b8u reads every file of the specification under specs/, and neither the schema nor the archive as a part", () => {
  const root = copyOfSpecs();
  mkdirSync(join(root, "specs", "_archive"), { recursive: true });
  writeFileSync(join(root, "specs", "_archive", "x.json"), JSON.stringify({ schemaVersion: 1, scope: "x", section: "x", nodes: [] }));
  const spec = loadSpecification(root);
  assert.deepEqual(spec.files.map((f) => f.path).sort(), [
    "specs/_guidelines/extensions/domains.json",
    "specs/_guidelines/extensions/recordtype.json",
    "specs/_guidelines/extensions/views.json",
    "specs/_guidelines/project.json",
    "specs/_guidelines/spec.json",
    "specs/_guidelines/tools.json",
  ]);
  assert.deepEqual(spec.archive.map((f) => f.path).sort(), ["specs/_archive/guidelines.json", "specs/_archive/x.json"]);
  assert.ok(spec.nodes.size > 0);
  for (const [sid, at] of spec.nodes) assert.equal(at.node.sid, sid);
});

test("@spec s-5fewsp22mmdz7y6 reads each node in a cell of a TableRule as a node of the specification, under the table, with its column, its group and the text cells of its row", () => {
  const cell = (name: string) => {
    const { title: _, ...rest } = node(name);
    return rest;
  };
  const table = node("checks", {
    kind: "TableRule",
    columns: [{ key: "check", heading: "What is checked", holds: "node" }, { key: "cost", heading: "On failure", holds: "text" }],
    groups: [{ heading: "Alone", rows: [{ cells: { check: { node: cell("first check") }, cost: { text: "refused" } } }] }, { heading: null, rows: [{ cells: { check: { node: cell("second check") }, cost: { text: "reported" } } }] }],
  });
  const root = repo({ "specs/contracts/c.json": file("contracts", "c", node("shared", { kind: "section", children: [table] })) });
  const spec = loadSpecification(root);
  const first = spec.nodes.get(sid("first check"))!;
  assert.equal(first.parent?.sid, sid("checks"));
  assert.equal(first.file.path, "specs/contracts/c.json");
  assert.deepEqual(first.cell, { column: "What is checked", group: "Alone", row: { cost: "refused" } });
  assert.deepEqual(spec.nodes.get(sid("second check"))!.cell, { column: "What is checked", group: null, row: { cost: "reported" } });
  assert.equal(spec.nodes.get(sid("checks"))!.cell, undefined);
});

test("@spec s-zefk589ykh37b8u finds each node with the file it stands in and its parent", () => {
  const spec = loadSpecification(REPO);
  const part = spec.files.find((f) => f.path === "specs/_guidelines/spec.json")!;
  const top = part.data.nodes[0]!;
  const first = top.children![0]!;
  assert.equal(spec.nodes.get(top.sid)!.parent, null);
  assert.equal(spec.nodes.get(first.sid)!.parent, top);
  assert.equal(spec.nodes.get(first.sid)!.file, part);
});

test("@spec s-jsqxdx47wkkj7gp writes a file in the canonical formatting, so that writing what was read changes nothing", () => {
  const root = copyOfSpecs();
  const spec = loadSpecification(root);
  for (const file of spec.files) {
    const before = readFileSync(join(root, file.path), "utf8");
    assert.equal(canonical(file.data), before);
    writeSpecFile(root, file);
    writeSpecFile(root, file);
    assert.equal(readFileSync(join(root, file.path), "utf8"), before);
  }
});

test("@spec s-jsqxdx47wkkj7gp keeps the order of keys, non-ASCII text as it is, and LF line endings", () => {
  const text = canonical({ b: 1, a: "§ — «x»", list: [] });
  assert.equal(text, '{\n  "b": 1,\n  "a": "§ — «x»",\n  "list": []\n}\n');
});

test("@spec s-zefk589ykh37b8u refuses a file of the specification that is not JSON, naming the file", () => {
  const root = copyOfSpecs();
  writeFileSync(join(root, "specs", "_guidelines", "broken.json"), "{ nope");
  assert.throws(() => loadSpecification(root), /specs\/_guidelines\/broken\.json/);
});
