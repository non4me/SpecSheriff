import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { confirm, readConfirmations } from "../../src/confirmations.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { fingerprint, LEVELS_RULE } from "../../src/model.ts";
import { file, node, OWNER, repo, sid, taking } from "../fixture.ts";

test("s-v4qus7raqnwzneb refuses a node of the SpecSheriff guidelines outside the repository they are written in, and writes nothing", () => {
  const root = taking();
  assert.throws(() => confirm(root, [LEVELS_RULE], { me: OWNER }), /SpecSheriff guidelines/);
  assert.ok(!existsSync(join(root, "specs", "_confirmations.jsonl")));
  assert.ok(!existsSync(join(root, "specs", "_guidelines", "spec.json")));
});

function project() {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owner: OWNER, children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("head", { kind: "domain", owner: "bank@example.org", level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("a", { kind: "section", children: [node("open")] })),
  });
}
const statusOf = (root: string, name: string) => loadSpecification(root).nodes.get(sid(name))!.node.status;

test("s-v4qus7raqnwzneb appends one line per node, naming its sid, its fingerprint and the owner confirming it, and sets it checked", () => {
  const root = project();
  confirm(root, [sid("levels"), sid("project")], { me: OWNER });
  const at = loadSpecification(root).nodes.get(sid("levels"))!;
  assert.equal(at.node.status, "checked");
  assert.deepEqual(readConfirmations(root), [
    { sid: sid("levels"), fingerprint: fingerprint(at.node), owner: OWNER },
    { sid: sid("project"), fingerprint: fingerprint(loadSpecification(root).nodes.get(sid("project"))!.node), owner: OWNER },
  ]);
});

test("s-v4qus7raqnwzneb appends nothing where the latest line for that wording is already its owner's confirmation", () => {
  const root = project();
  confirm(root, [sid("levels")], { me: OWNER });
  confirm(root, [sid("levels")], { me: OWNER });
  assert.equal(readConfirmations(root).length, 1);
});

test("s-67vekyup7y8smap refuses a node whose owner is someone else, naming that owner, and confirms none of those named", () => {
  const root = project();
  assert.throws(() => confirm(root, [sid("levels"), sid("open")], { me: OWNER }), /bank@example\.org/);
  assert.equal(statusOf(root, "levels"), "");
  assert.deepEqual(readConfirmations(root), []);
});

test("s-v4qus7raqnwzneb refuses a sid no node holds, and a node no owner is named for", () => {
  assert.throws(() => confirm(project(), ["s-aaaaaaaaaaaaaab"], { me: OWNER }), /s-aaaaaaaaaaaaaab/);
  const lone = repo({ "specs/contracts/c.json": file("contracts", "c", node("lone")) });
  assert.throws(() => confirm(lone, [sid("lone")], { me: OWNER }), /no owner/);
});

test("s-v4qus7raqnwzneb withdraws a confirmation by a line of its own and empties the status, and the latest line decides", () => {
  const root = project();
  confirm(root, [sid("levels")], { me: OWNER });
  confirm(root, [sid("levels")], { me: OWNER, withdraw: true });
  assert.equal(statusOf(root, "levels"), "");
  assert.equal(readConfirmations(root).at(-1)!.withdrawn, true);
  confirm(root, [sid("levels")], { me: OWNER });
  assert.equal(readConfirmations(root).length, 3);
  assert.equal(statusOf(root, "levels"), "checked");
});

test("s-v4qus7raqnwzneb keeps the confirmations one JSON object to a line, appended", () => {
  const root = project();
  confirm(root, [sid("levels")], { me: OWNER });
  confirm(root, [sid("project")], { me: OWNER });
  const lines = readFileSync(join(root, "specs", "_confirmations.jsonl"), "utf8").split("\n");
  assert.equal(lines.length, 3);
  assert.equal(lines[2], "");
  for (const line of lines.slice(0, 2)) JSON.parse(line);
});
