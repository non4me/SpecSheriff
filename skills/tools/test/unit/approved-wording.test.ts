import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { approve } from "../../src/approvals.ts";
import { approvedWordings } from "../../src/approved-wording.ts";
import { reindex } from "../../src/reindex.ts";
import { loadSpecification, type SpecNode } from "../../src/spec-files.ts";
import { git } from "../code-project.ts";
import { file, node, OWNER, repo, sid } from "../fixture.ts";

/** A git repository in which the SpecSheriff guidelines are written, and whose own guidelines hold one rule listing two values. */
function listed(): string {
  const root = repo({
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("listed rule"), node("other rule")] })),
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [
      node("our list", { refs: [{ type: "refines", to: sid("listed rule") }], list: { of: "the values", members: ["one", "two"] } }),
    ] })),
  });
  reindex(root);
  git(root, "init", "-q");
  git(root, "config", "user.email", OWNER);
  git(root, "config", "user.name", "Owner");
  return root;
}
const commit = (root: string, message: string) => (git(root, "add", "-A"), git(root, "commit", "-qm", message));
const members = (n: SpecNode | undefined) => (n?.list as { members?: unknown[] } | undefined)?.members;
function setMembers(root: string, values: string[]): void {
  const path = join(root, "specs", "_guidelines", "project.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.nodes[0].children[0].list.members = values;
  data.nodes[0].children[0].status = "draft";
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  reindex(root);
}
const wordings = (root: string) => approvedWordings(root, loadSpecification(root));

test("@spec s-a8fn72xa782wvbk treats a node that has never been approved as having no approved wording", () => {
  const root = listed();
  commit(root, "first");
  assert.equal(wordings(root).wording(sid("our list")), undefined);
});

test("@spec s-a8fn72xa782wvbk takes a node's last approved wording from the files of the specification where they hold it", () => {
  const root = listed();
  approve(root, [sid("our list")], { me: OWNER });
  assert.deepEqual(members(wordings(root).wording(sid("our list"))), ["one", "two"]);
});

test("@spec s-a8fn72xa782wvbk takes a node's last approved wording from the latest commit on the current branch whose files hold it, where the files of the specification hold a different wording", () => {
  const root = listed();
  approve(root, [sid("our list")], { me: OWNER });
  commit(root, "approved");
  setMembers(root, ["one", "two", "three"]);
  commit(root, "a draft");
  const found = wordings(root);
  assert.deepEqual(members(found.wording(sid("our list"))), ["one", "two"]);
  assert.deepEqual(found.named, []);
});

test("@spec s-a8fn72xa782wvbk reports a node whose last approved wording is found neither in the files nor on the branch, and takes the latest wording that an earlier approval records", () => {
  const root = listed();
  approve(root, [sid("our list")], { me: OWNER });
  commit(root, "approved");
  setMembers(root, ["one", "two", "three"]);
  approve(root, [sid("our list")], { me: OWNER });
  setMembers(root, ["four"]);
  const found = wordings(root);
  assert.deepEqual(members(found.wording(sid("our list"))), ["one", "two"]);
  assert.deepEqual(found.named, [sid("our list")]);
});

test("@spec s-t9j29hppag2nren takes a rule's refines links from the commit that added its last approval, and from the files until that commit is made", () => {
  const root = listed();
  approve(root, [sid("our list")], { me: OWNER });
  const relink = (to: string) => {
    const path = join(root, "specs", "_guidelines", "project.json");
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.nodes[0].children[0].refs = [{ type: "refines", to }];
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    reindex(root);
  };
  const refined = () => wordings(root).links(sid("our list")).filter((r) => r.type === "refines").map((r) => r.to);
  relink(sid("other rule"));
  assert.deepEqual(refined(), [sid("other rule")]);
  commit(root, "approved, linked to the other rule");
  relink(sid("listed rule"));
  commit(root, "linked back");
  assert.deepEqual(refined(), [sid("other rule")]);
});
