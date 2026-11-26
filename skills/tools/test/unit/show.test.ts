import { test } from "node:test";
import assert from "node:assert/strict";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification, type SpecNode } from "../../src/spec-files.ts";
import { nodeMarkdown, show, todos } from "../../src/show.ts";
import { file, NONE, node, OWNER, repo, sid } from "../fixture.ts";
import { REPO } from "../repo.ts";

const spec = loadSpecification(REPO);

/** A section holding a RecordType, a term linked to it and a rule with a list and metadata. */
function fixture() {
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("billing", { kind: "section", text: "Billing.", children: [
      node("Bill", { kind: "RecordType", text: "A bill.", fields: [{ name: "total", type: { is: "whole number" }, required: true, text: "The sum owed." }], unknown: "refused" }),
      node("payer", { kind: "term", text: "Whoever pays.", refs: [{ type: "term-relation", to: sid("Bill"), ratio: "1:0..*" }] }),
      node("billed rule", { reason: "Because.", list: { of: "the currencies", members: ["EUR"] }, meta: { todos: [{ date: "2026-11-02", by: "owner@example.org", text: "Add USD." }] } }),
    ] })),
  });
  reindex(root);
  return loadSpecification(root);
}

test("@spec s-k4nqjr96ux7a5m7 shows a node found by its sid with every value its file holds, each that is not text under its key as JSON", () => {
  const spec = fixture();
  for (const name of ["Bill", "payer", "billed rule"]) {
    const { location, sid: s, kind, title, status, text, reason, refs, children, ...rest } = spec.nodes.get(sid(name))!.node as SpecNode;
    const out = show(spec, s);
    assert.ok(out.startsWith(`# ${location} ${title}\n\n\`${s}\` · ${kind} · draft\n\n${text}\n`), name);
    if (reason) assert.ok(out.includes(reason), name);
    for (const [k, v] of Object.entries(rest)) assert.ok(out.includes(`**${k}:**`) && out.includes(typeof v === "string" ? v : JSON.stringify(v, null, 2)), `${name}: ${k}`);
  }
});

/** A section holding a TableRule with two groups, a node in each row's first cell, and a line break in a text cell. */
function tabled() {
  const cell = (n: string) => {
    const { title: _, ...rest } = node(n);
    return rest;
  };
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("checks", { kind: "section", text: "Checks.", children: [
      node("checks table", {
        kind: "TableRule",
        text: "What is checked, and what a failure costs.",
        columns: [{ key: "check", heading: "What is checked", holds: "node" }, { key: "cost", heading: "On failure", holds: "text" }],
        groups: [
          { heading: "On a commit", rows: [{ cells: { check: { node: cell("first check") }, cost: { text: "refused\nand named" } } }] },
          { heading: "On a push", rows: [{ cells: { check: { node: cell("second check") }, cost: { text: "reported" } } }] },
        ],
      }),
    ] })),
  });
  reindex(root);
  return loadSpecification(root);
}

test("@spec s-2dhbqy43tcm6qj2 shows a node in a cell of a TableRule, found by its sid or by its location", () => {
  const spec = tabled();
  const at = spec.nodes.get(sid("first check"))!.node.location;
  assert.equal(show(spec, sid("first check")), show(spec, at));
  assert.ok(show(spec, at).includes("What first check requires."));
});

test("@spec s-k4nqjr96ux7a5m7 writes a node in a cell with its location alone as its heading, and its column, its group and the text cells of its row before its text", () => {
  const spec = tabled();
  const at = spec.nodes.get(sid("first check"))!.node.location;
  const out = show(spec, sid("first check"));
  assert.equal(out.split("\n")[0], `# ${at}`);
  const place = "- column: What is checked\n- group: On a commit\n- On failure: refused<br>and named";
  assert.ok(out.includes(place), out);
  assert.ok(out.indexOf(place) < out.indexOf("What first check requires."), out);
});

test("@spec s-k4nqjr96ux7a5m7 writes the columns and groups of a TableRule as a table for each group, each node's cell holding its location and its text, and the nodes in its cells after it", () => {
  const spec = tabled();
  const at = (name: string) => spec.nodes.get(sid(name))!.node.location;
  const table = spec.nodes.get(sid("checks table"))!.node;
  const out = nodeMarkdown(spec, table, 1);
  assert.ok(out.includes(`**On a commit**\n\n| What is checked | On failure |\n|---|---|\n| ${at("first check")} What first check requires. | refused<br>and named |`), out);
  assert.ok(out.includes(`**On a push**\n\n| What is checked | On failure |\n|---|---|\n| ${at("second check")} What second check requires. | reported |`), out);
  assert.ok(!out.includes('"groups"') && !out.includes('"columns"'), out);
  assert.ok(out.indexOf(`## ${at("first check")}\n`) > out.indexOf("**On a push**"), out);
  assert.ok(out.indexOf(`## ${at("first check")}\n`) < out.indexOf(`## ${at("second check")}\n`), out);
  assert.ok(!show(spec, sid("checks table")).includes(`## ${at("first check")}`), "sheriff show leaves the nodes in the cells out");
});

test("@spec s-k4nqjr96ux7a5m7 writes the values gathered beside a field nested anywhere in a RecordType's schema under the field's JSON Pointer", () => {
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "RecordType", text: "An event.", schema: { type: "object", properties: { lines: { type: "array", items: { type: "object", properties: { part: { enumSource: { from: "parts" } } } } } } } }),
    ] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", sections: [] })),
    "specs/bank/e.json": file("bank", "e", node("events", { kind: "section", text: "Events.", children: [node("paid")] })),
  });
  reindex(root);
  const spec = loadSpecification(root);
  const out = show(spec, sid("event"));
  assert.ok(out.includes("**/properties/lines/items/properties/part:**\n\n- bank — "), out);
  assert.ok(!out.includes('"gathered"'), out);
});

test("@spec s-2dhbqy43tcm6qj2 shows a node alone, without the nodes under it", () => {
  const spec = fixture();
  const out = show(spec, sid("billing"));
  assert.ok(out.includes("Billing.") && !out.includes("A bill.") && !out.includes("# "+ spec.nodes.get(sid("Bill"))!.node.location));
});

test("@spec s-2dhbqy43tcm6qj2 shows a node found by its location the same as by its sid", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  assert.equal(show(spec, node.location), show(spec, "s-kag2m9tzdnduxdx"));
});

test("@spec s-k4nqjr96ux7a5m7 names every link a node makes or receives by its type, its direction, its ratio and the sid, location and title of the node at the other end", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  const out = show(spec, "s-kag2m9tzdnduxdx");
  for (const r of node.refs) {
    const other = spec.nodes.get((r.to ?? r.from)!)!.node;
    assert.ok(out.includes(`- ${r.type} ${r.to ? "→" : "←"} ${other.sid} ${other.location} ${other.title}\n`), `${r.type} ${other.location}`);
  }
  const terms = fixture();
  assert.ok(show(terms, sid("Bill")).includes(`- term-relation 0..*:1 ← ${sid("payer")} ${terms.nodes.get(sid("payer"))!.node.location} payer\n`));
});

test("@spec s-2dhbqy43tcm6qj2 refuses a key no node holds", () => {
  assert.throws(() => show(spec, NONE), /no node/);
});

test("@spec s-k4nqjr96ux7a5m7 writes a list whose members are objects as a table, the property it names first", () => {
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("levels", { kind: "section", text: "Levels.", children: [
      node("ranked", { list: { of: "the levels", property: "name", members: [{ name: "core", rank: 1 }, { rank: 2, name: "auxiliary", tags: ["a|b"] }, "edge"] } }),
    ] })),
  });
  reindex(root);
  const out = show(loadSpecification(root), sid("ranked"));
  assert.ok(out.includes("| name | rank | tags |"), out);
  assert.ok(out.includes("| core | 1 |  |"), out);
  assert.ok(out.includes(`| auxiliary | 2 | ["a\\|b"] |`), out);
  assert.ok(out.includes("| edge |  |  |"), out);
});

test("@spec s-k4nqjr96ux7a5m7 writes the values gathered beside a field after the schema's JSON, headed by the field's JSON Pointer, each with the sid, location and title of the node it comes from", () => {
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("kinds", { kind: "section", text: "Kinds.", children: [
      node("event", { kind: "RecordType", text: "An event.", schema: { type: "object", properties: { part: { enumSource: { from: "parts" } } } } }),
    ] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", level: "core", sections: [] })),
    "specs/bank/e.json": file("bank", "e", node("events", { kind: "section", text: "Events.", children: [node("paid")] })),
  });
  reindex(root);
  const spec = loadSpecification(root);
  const out = show(spec, sid("event"));
  assert.ok(!out.includes('"gathered"'), out);
  assert.ok(out.includes('"enumSource": {\n'), out);
  const at = (name: string) => spec.nodes.get(sid(name))!.node.location;
  assert.ok(out.includes(`**/properties/part:**\n\n- bank — ${sid("header")} ${at("header")} header\n- contracts — ${sid("kinds")} ${at("kinds")} kinds`), out);
});

test("@spec s-f5rz6b7dhxejjts lists every item of the todos, the newest first, those of one day in the order the specification reads, each with its date, author, text and node, the archive left out", () => {
  const item = (date: string, text: string) => ({ date, by: OWNER, text });
  const root = repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", meta: { todos: [item("2026-11-01", "Name the levels.")] } })),
    "specs/zeta/z.json": file("zeta", "z", node("zeta section", { kind: "section", text: "Z.", children: [node("zeta rule", { meta: { todos: [item("2026-11-03", "Split it."), item("2026-11-01", "Word it.")] } })] })),
    "specs/alpha/a.json": file("alpha", "a", node("alpha section", { kind: "section", text: "A.", children: [node("alpha rule", { meta: { todos: [item("2026-11-03", "Test it.")] } })] })),
    "specs/_archive/alpha.json": file("alpha", "a", { ...node("gone rule", { meta: { todos: [item("2026-11-05", "Never listed.")] } }), location: "alpha/1.2", archived: { date: "2026-11-04", reason: "Gone." } }),
  });
  reindex(root);
  const spec = loadSpecification(root);
  const out = todos(spec);
  const at = (name: string) => `${sid(name)} · ${spec.nodes.get(sid(name))!.node.location} · ${name}`;
  assert.equal(out, [
    `2026-11-03 · ${OWNER}\nTest it.\n${at("alpha rule")}`,
    `2026-11-03 · ${OWNER}\nSplit it.\n${at("zeta rule")}`,
    `2026-11-01 · ${OWNER}\nName the levels.\n${at("project")}`,
    `2026-11-01 · ${OWNER}\nWord it.\n${at("zeta rule")}`,
  ].join("\n\n") + "\n");
});
