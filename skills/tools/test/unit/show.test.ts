import { test } from "node:test";
import assert from "node:assert/strict";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification, type SpecNode } from "../../src/spec-files.ts";
import { show } from "../../src/show.ts";
import { file, NONE, node, repo, sid } from "../fixture.ts";
import { REPO } from "../repo.ts";

const spec = loadSpecification(REPO);

/** A section holding a data record node, a term linked to it and a rule with a list and metadata. */
function fixture() {
  const root = repo({
    "specs/contracts/c.json": file("contracts", "c", node("billing", { kind: "section", text: "Billing.", children: [
      node("Bill", { kind: "record", text: "A bill.", fields: [{ name: "total", type: { is: "whole number" }, required: true, text: "The sum owed." }], unknown: "refused" }),
      node("payer", { kind: "term", text: "Whoever pays.", refs: [{ type: "term-relation", to: sid("Bill"), ratio: "1:0..N" }] }),
      node("billed rule", { rationale: "Because.", list: { of: "the currencies", members: ["EUR"] }, meta: { todos: [{ date: "2026-11-02", by: "owner@example.org", text: "Add USD." }] } }),
    ] })),
  });
  reindex(root);
  return loadSpecification(root);
}

test("s-k4nqjr96ux7a5m7 shows a node found by its sid with every value its file holds, each that is not text under its key as JSON", () => {
  const spec = fixture();
  for (const name of ["Bill", "payer", "billed rule"]) {
    const { id, sid: s, kind, title, status, text, rationale, refs, children, ...rest } = spec.nodes.get(sid(name))!.node as SpecNode;
    const out = show(spec, s);
    assert.ok(out.startsWith(`# ${id} ${title}\n\n\`${s}\` · ${kind} · unchecked\n\n${text}\n`), name);
    if (rationale) assert.ok(out.includes(rationale), name);
    for (const [k, v] of Object.entries(rest)) assert.ok(out.includes(`**${k}:**`) && out.includes(typeof v === "string" ? v : JSON.stringify(v, null, 2)), `${name}: ${k}`);
  }
});

test("s-k4nqjr96ux7a5m7 shows a node alone, without the nodes under it", () => {
  const spec = fixture();
  const out = show(spec, sid("billing"));
  assert.ok(out.includes("Billing.") && !out.includes("A bill.") && !out.includes("# "+ spec.nodes.get(sid("Bill"))!.node.id));
});

test("s-f5rz6b7dhxejjts shows a node found by its address the same as by its sid", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  assert.equal(show(spec, node.id), show(spec, "s-kag2m9tzdnduxdx"));
});

test("s-k4nqjr96ux7a5m7 names every link a node makes or receives by its type, its direction, its ratio and the sid, address and title of the node at the other end", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  const out = show(spec, "s-kag2m9tzdnduxdx");
  for (const r of node.refs) {
    const other = spec.nodes.get((r.to ?? r.from)!)!.node;
    assert.ok(out.includes(`- ${r.type} ${r.to ? "→" : "←"} ${other.sid} ${other.id} ${other.title}\n`), `${r.type} ${other.id}`);
  }
  const terms = fixture();
  assert.ok(show(terms, sid("Bill")).includes(`- term-relation 0..N:1 ← ${sid("payer")} ${terms.nodes.get(sid("payer"))!.node.id} payer\n`));
});

test("s-f5rz6b7dhxejjts refuses a key no node holds", () => {
  assert.throws(() => show(spec, NONE), /no node/);
});
