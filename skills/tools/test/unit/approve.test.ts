import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { approve, readApprovals, stands } from "../../src/approvals.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { APPROVAL_RULE, fingerprint, LEVELS_RULE } from "../../src/model.ts";
import { file, node, NONE, OWNER, repo, sid, taking } from "../fixture.ts";

const OTHER = "other@example.org";

test("@spec s-v4qus7raqnwzneb refuses a node of the SpecSheriff guidelines outside the repository they are written in, approving or withdrawing, and writes nothing", () => {
  const root = taking();
  assert.throws(() => approve(root, [LEVELS_RULE], { me: OWNER }), /SpecSheriff guidelines/);
  assert.throws(() => approve(root, [LEVELS_RULE], { me: OWNER, withdraw: true }), /SpecSheriff guidelines/);
  assert.ok(!existsSync(join(root, "specs", "_approvals.jsonl")));
  assert.ok(!existsSync(join(root, "specs", "_guidelines", "spec.json")));
});

function project() {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER, OTHER], children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", owners: ["bank@example.org"], level: "core", code: null, sections: [] })),
    "specs/bank/a.json": file("bank", "a", node("a", { kind: "section", children: [node("open")] })),
  });
}
const nodeOf = (root: string, name: string) => loadSpecification(root).nodes.get(sid(name))!.node;
const statusOf = (root: string, name: string) => nodeOf(root, name).status;

test("@spec s-v4qus7raqnwzneb appends one line per node, naming its sid, its fingerprint and, as by, who approves it, and sets it approved", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  const at = nodeOf(root, "levels");
  assert.equal(at.status, "approved");
  assert.deepEqual(readApprovals(root), [{ sid: sid("levels"), fingerprint: fingerprint(at), by: OWNER }]);
});

test("@spec s-67vekyup7y8smap lets any one of a node's owners approve it, the line naming which", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OTHER });
  assert.equal(statusOf(root, "levels"), "approved");
  assert.equal(readApprovals(root).at(-1)!.by, OTHER);
});

test("@spec s-v4qus7raqnwzneb appends nothing where the latest line for the node and that wording is already an approval, and only sets the status", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "_guidelines", "project.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"status": "approved"', '"status": "draft"'));
  approve(root, [sid("levels")], { me: OTHER });
  assert.equal(readApprovals(root).length, 1);
  assert.equal(statusOf(root, "levels"), "approved");
});

test("@spec s-v4qus7raqnwzneb refuses a section and a domain's header, whose status is built, approving or withdrawing", () => {
  const root = project();
  for (const withdraw of [false, true]) {
    assert.throws(() => approve(root, [sid("project")], { me: OWNER, withdraw }), /section/);
    assert.throws(() => approve(root, [sid("header")], { me: "bank@example.org", withdraw }), /header/);
  }
  assert.deepEqual(readApprovals(root), []);
});

test("@spec s-67vekyup7y8smap refuses a node none of whose owners is the one approving, naming its owners, and approves none of those named", () => {
  const root = project();
  assert.throws(() => approve(root, [sid("levels"), sid("open")], { me: OWNER }), /bank@example\.org/);
  assert.equal(statusOf(root, "levels"), "draft");
  assert.deepEqual(readApprovals(root), []);
});

test("@spec s-v4qus7raqnwzneb refuses a sid no node holds, and a node no owner is named for", () => {
  assert.throws(() => approve(project(), [NONE], { me: OWNER }), new RegExp(NONE));
  const lone = repo({ "specs/contracts/c.json": file("contracts", "c", node("lone")) });
  assert.throws(() => approve(lone, [sid("lone")], { me: OWNER }), /no owner/);
});

function withApprovalRule() {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], children: [
      node("ours", { kind: "section", owners: [OTHER], children: [
        node("approved spec", { title: "The specification is approved", text: "This project's specification is approved.", refs: [{ type: "refines", to: APPROVAL_RULE }] }),
      ] }),
    ] })),
  });
}

test("@spec s-qzthyh7yqvfhsa2 refuses to approve the rule that approves the specification, or to withdraw its approval, to anyone but the specification's owners", () => {
  const root = withApprovalRule();
  assert.throws(() => approve(root, [sid("approved spec")], { me: OTHER }), /specification's owners/);
  approve(root, [sid("approved spec")], { me: OWNER });
  assert.throws(() => approve(root, [sid("approved spec")], { me: OTHER, withdraw: true }), /specification's owners/);
  approve(root, [sid("approved spec")], { me: OWNER, withdraw: true });
  assert.equal(statusOf(root, "approved spec"), "draft");
});

test("@spec s-v4qus7raqnwzneb lets anyone withdraw an approval by a line of its own naming them as by, makes the node a draft, and the latest line decides", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  approve(root, [sid("levels")], { me: "someone@example.org", withdraw: true });
  assert.equal(statusOf(root, "levels"), "draft");
  const line = readApprovals(root).at(-1)!;
  assert.deepEqual(line, { sid: sid("levels"), fingerprint: fingerprint(nodeOf(root, "levels")), withdrawn: true, by: "someone@example.org" });
  approve(root, [sid("levels")], { me: OWNER });
  assert.equal(readApprovals(root).length, 3);
  assert.equal(statusOf(root, "levels"), "approved");
});

test("@spec s-v4qus7raqnwzneb withdraws the approval of each wording of the node for which one stands, whether the node holds that wording or not, a line for each, and appends nothing where none stands", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  const earlier = fingerprint(nodeOf(root, "levels"));
  const path = join(root, "specs", "_guidelines", "project.json");
  const restored = readFileSync(path, "utf8");
  writeFileSync(path, restored.replace("What levels requires.", "What levels requires now.").replace('"status": "approved"', '"status": "draft"'));
  approve(root, [sid("levels")], { me: OWNER });
  const present = fingerprint(nodeOf(root, "levels"));
  approve(root, [sid("levels")], { me: OTHER, withdraw: true });
  const withdrawn = readApprovals(root).slice(2);
  assert.deepEqual(withdrawn.map((l) => l.fingerprint).sort(), [earlier, present].sort());
  for (const l of withdrawn) assert.deepEqual(l, { sid: sid("levels"), fingerprint: l.fingerprint, withdrawn: true, by: OTHER });
  assert.equal(statusOf(root, "levels"), "draft");
  // An edit restoring the earlier wording, its status typed back, finds no approval standing for it.
  writeFileSync(path, restored);
  assert.equal(stands(readApprovals(root), sid("levels"), earlier), false);
  approve(root, [sid("levels")], { me: OWNER, withdraw: true });
  approve(root, [sid("open")], { me: OWNER, withdraw: true });
  assert.equal(readApprovals(root).length, 4);
  assert.equal(statusOf(root, "open"), "draft");
});

test("@spec s-v4qus7raqnwzneb keeps the approvals one JSON object to a line, appended", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  approve(root, [sid("levels")], { me: OWNER, withdraw: true });
  const lines = readFileSync(join(root, "specs", "_approvals.jsonl"), "utf8").split("\n");
  assert.equal(lines.length, 3);
  assert.equal(lines[2], "");
  for (const line of lines.slice(0, 2)) JSON.parse(line);
});

test("@spec s-v4qus7raqnwzneb reads the confirmations an earlier release wrote, each owner as by, where the approvals stand in no file of their own yet", () => {
  const root = project();
  const print = fingerprint(nodeOf(root, "levels"));
  writeFileSync(join(root, "specs", "_confirmations.jsonl"), JSON.stringify({ sid: sid("levels"), fingerprint: print, owner: OWNER }) + "\n");
  assert.deepEqual(readApprovals(root), [{ sid: sid("levels"), fingerprint: print, by: OWNER }]);
});
