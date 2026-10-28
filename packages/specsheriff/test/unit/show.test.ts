import { test } from "node:test";
import assert from "node:assert/strict";
import { loadSpecification } from "../../src/spec-files.ts";
import { show } from "../../src/show.ts";
import { REPO } from "../repo.ts";

const spec = loadSpecification(REPO);

test("s-f5rz6b7dhxejjts shows a node found by its sid: its address, title, status, text and reason", () => {
  const out = show(spec, "s-kag2m9tzdnduxdx");
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  assert.match(out, new RegExp(`^${node.id.replace(/[./]/g, "\\$&")} · s-kag2m9tzdnduxdx · ${node.status || "unchecked"}\n`));
  assert.ok(out.includes(node.title));
  assert.ok(out.includes(node.text));
  assert.ok(out.includes(node.rationale!));
});

test("s-f5rz6b7dhxejjts shows a node found by its address the same as by its sid", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  assert.equal(show(spec, node.id), show(spec, "s-kag2m9tzdnduxdx"));
});

test("s-f5rz6b7dhxejjts names every link a node makes or receives by the address and title of the node at the other end", () => {
  const node = spec.nodes.get("s-kag2m9tzdnduxdx")!.node;
  const out = show(spec, "s-kag2m9tzdnduxdx");
  for (const r of node.refs) {
    const other = spec.nodes.get((r.to ?? r.from)!)!.node;
    assert.ok(out.includes(`${r.type} ${r.to ? "→" : "←"} ${other.id} ${other.title}`), `${r.type} ${other.id}`);
  }
});

test("s-f5rz6b7dhxejjts refuses a key no node holds", () => {
  assert.throws(() => show(spec, "s-aaaaaaaaaaaaaab"), /no node/);
});
