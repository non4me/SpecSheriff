import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { approve, lastApproval, readApprovals, stands } from "../../src/approvals.ts";
import { loadSpecification } from "../../src/spec-files.ts";
import { APPROVAL_RULE, fingerprint, FIXTURES_RULE, LEVELS_RULE } from "../../src/model.ts";
import { file, node, NONE, OWNER, repo, sid, table, taking } from "../fixture.ts";

const OTHER = "other@example.org";

test("@spec s-upkur92ry6332y5 refuses a node of the SpecSheriff guidelines or of a chosen extension outside the repository where they are written, and writes nothing", () => {
  const root = taking();
  assert.throws(() => approve(root, [LEVELS_RULE], { me: OWNER }), /no node in the files that the repository keeps holds this sid: .*SpecSheriff guidelines or of a chosen extension/);
  assert.throws(() => approve(root, [FIXTURES_RULE], { me: OWNER }), /SpecSheriff guidelines/);
  assert.ok(!existsSync(join(root, "specs", "_approvals.jsonl")));
  assert.ok(!existsSync(join(root, "specs", "_guidelines", "spec.json")));
});

test("@spec s-xybjqp2rxh8gszf refuses to withdraw the approval of a node of the SpecSheriff guidelines or of a chosen extension outside the repository where they are written", () => {
  const root = taking();
  assert.throws(() => approve(root, [LEVELS_RULE], { me: OWNER, withdraw: true }), /SpecSheriff guidelines or of a chosen extension/);
  assert.ok(!existsSync(join(root, "specs", "_approvals.jsonl")));
});

function project() {
  return repo({
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER, OTHER], children: [node("levels")] })),
    "specs/bank/00-bank.json": file("bank", "00-bank", node("header", { kind: "header", owners: ["bank@example.org"], level: "core", sections: [] })),
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

test("@spec s-upkur92ry6332y5 appends nothing where the latest line for the node and that wording is already an approval, and only sets the status", () => {
  const root = project();
  approve(root, [sid("levels")], { me: OWNER });
  const path = join(root, "specs", "_guidelines", "project.json");
  writeFileSync(path, readFileSync(path, "utf8").replace('"status": "approved"', '"status": "draft"'));
  approve(root, [sid("levels")], { me: OTHER });
  assert.equal(readApprovals(root).length, 1);
  assert.equal(statusOf(root, "levels"), "approved");
});

test("@spec s-upkur92ry6332y5 refuses to approve a section and a domain's header, whose approval status is derived", () => {
  const root = project();
  assert.throws(() => approve(root, [sid("project")], { me: OWNER }), /section/);
  assert.throws(() => approve(root, [sid("header")], { me: "bank@example.org" }), /header/);
  assert.deepEqual(readApprovals(root), []);
});

test("@spec s-xybjqp2rxh8gszf refuses to withdraw the approval of a section and of a domain's header, whose approval status is derived", () => {
  const root = project();
  assert.throws(() => approve(root, [sid("project")], { me: OWNER, withdraw: true }), /section/);
  assert.throws(() => approve(root, [sid("header")], { me: "bank@example.org", withdraw: true }), /header/);
  assert.deepEqual(readApprovals(root), []);
});

test("@spec s-67vekyup7y8smap refuses a node none of whose owners is the one approving, naming its owners, and approves none of those named", () => {
  const root = project();
  assert.throws(() => approve(root, [sid("levels"), sid("open")], { me: OWNER }), /bank@example\.org/);
  assert.equal(statusOf(root, "levels"), "draft");
  assert.deepEqual(readApprovals(root), []);
});

test("@spec s-upkur92ry6332y5 refuses a sid no node holds, and a node no owner is named for", () => {
  assert.throws(() => approve(project(), [NONE], { me: OWNER }), new RegExp(NONE));
  const lone = repo({ "specs/contracts/c.json": file("contracts", "c", node("lone")) });
  assert.throws(() => approve(lone, [sid("lone")], { me: OWNER }), /no owner/);
});



test("@spec s-xybjqp2rxh8gszf lets anyone withdraw an approval by a line of its own naming them as by, makes the node a draft, and the latest line decides", () => {
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

test("@spec s-xybjqp2rxh8gszf withdraws the approval of each wording of the node for which one stands, whether the node holds that wording or not, a line for each, and appends nothing where none stands", () => {
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

test("@spec s-gb8s9657a65hqmv reads the confirmations an earlier release wrote, each owner as by, after the lines of the approvals file", () => {
  const root = project();
  const print = fingerprint(nodeOf(root, "levels"));
  writeFileSync(join(root, "specs", "_confirmations.jsonl"), JSON.stringify({ sid: sid("levels"), fingerprint: print, owner: OWNER }) + "\n");
  assert.deepEqual(readApprovals(root), [{ sid: sid("levels"), fingerprint: print, by: OWNER }]);
  writeFileSync(join(root, "specs", "_approvals.jsonl"), JSON.stringify({ sid: sid("open"), fingerprint: "0", by: OWNER }) + "\n");
  assert.deepEqual(readApprovals(root).map((a) => a.sid), [sid("open"), sid("levels")]);
});

test("@spec s-v4qus7raqnwzneb gives a node's last approval: the approval in force of its current wording, else the latest approval of any of its wordings, even one withdrawn since", () => {
  const by = OWNER;
  const A = sid("a");
  const lines = [{ sid: A, fingerprint: "p1", by }, { sid: A, fingerprint: "p2", by }, { sid: A, fingerprint: "p2", withdrawn: true as const, by }];
  assert.equal(lastApproval(lines, A, "p1")?.fingerprint, "p1", "an edit that restores an earlier wording whose approval is in force");
  assert.equal(lastApproval(lines, A, "p3")?.fingerprint, "p2");
  assert.equal(lastApproval(lines, A, "p2")?.fingerprint, "p2");
  assert.equal(lastApproval(lines, sid("b"), "p1"), undefined);
});

/** A project with one TableRule that has two rows, each with a node in its first cell. */
const tableProject = () => repo({
  "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], children: [node("levels")] })),
  "specs/contracts/c.json": file("contracts", "c", node("rules", { kind: "section", children: [table("checks", [["first check", "refused"], ["second check", "reported"]])] })),
});

test("@spec s-upkur92ry6332y5 approves each node in the cells of a TableRule together with the table, after it, in the order of the rows and the columns", () => {
  const root = tableProject();
  approve(root, [sid("checks")], { me: OWNER });
  assert.deepEqual(readApprovals(root).map((a) => a.sid), [sid("checks"), sid("first check"), sid("second check")]);
  assert.deepEqual(["checks", "first check", "second check"].map((n) => statusOf(root, n)), ["approved", "approved", "approved"]);
});

test("@spec s-xybjqp2rxh8gszf withdraws only the approvals of a TableRule's own wordings and leaves the nodes in its cells approved", () => {
  const root = tableProject();
  approve(root, [sid("checks")], { me: OWNER });
  approve(root, [sid("checks")], { me: OWNER, withdraw: true });
  assert.deepEqual(["checks", "first check", "second check"].map((n) => statusOf(root, n)), ["draft", "approved", "approved"]);
  assert.equal(readApprovals(root).filter((a) => a.withdrawn).map((a) => a.sid).join(), sid("checks"));
});
