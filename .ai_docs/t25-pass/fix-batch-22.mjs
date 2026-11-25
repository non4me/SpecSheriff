// Applies EngStickler's twenty-second batch of corrections to the continuation file and INDEX.md, and the two of them
// that also concern the draft "new:tools-1-project": "treat ... as empty" and "appear in".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(url, s);
};

edit("tools-drafts.json", [
  ["the SpecSheriff tools take that item's list as empty.", "the SpecSheriff tools treat that item's list as empty."],
  ["in the order in which those rules stand in `project.json`.", "in the order in which those rules appear in `project.json`."]
]);
edit("../INDEX.md", [
  ["propose-project-c.mjs revises that draft after its second review,", "propose-project-c.mjs revises the draft of that node after the draft's second review,"]
]);
edit("../t25-one-thought.md", [
  ["in the order in which those rules stand in `project.json`, and take an item's list as empty where they find no rule for it;",
    "in the order in which those rules appear in `project.json`, and treat an item's list as empty where they find no rule for that item;"],
  ["- the item on the project's own kinds of node no longer restates rule 8.4, which it now implements;",
    "- the item on the project's own kinds of node no longer restates rule 8.4, and the node now has an `implements` link to that rule;"],
  ["now says that the rule `sheriff.config.json` names refines", "now says that the rule that `sheriff.config.json` names refines"],
  ["and whether they should is decided with \"The tests, run before a push\" (s-b6qdtghnyha3fhk), as the follow-ups below say.",
    "and whether they should is to be decided when \"The tests, run before a push\" (s-b6qdtghnyha3fhk) is reviewed, as the follow-ups below say."],
  ["- \"The project's own tools in a git hook\" (s-n4m5zvh96yb299p) and the hook script `.githooks/pre-commit` run the project's own tools after the checks, and fail when a tool changes the staged files. Rule 10.12 (s-pcnyfp7gev7syax) requires the tools that rewrite files to run first, and the list that \"What the SpecSheriff tools read in the project's own guidelines\" describes names them.",
    "- \"The project's own tools in a git hook\" (s-n4m5zvh96yb299p) says that a git hook runs the project's own tools after the checks and fails when one of those tools changes the staged files, and the hook script `.githooks/pre-commit` does so. Rule 10.12 (s-pcnyfp7gev7syax) requires the tools that rewrite files to run first, and the list described in \"What the SpecSheriff tools read in the project's own guidelines\" names those tools."],
  ["- \"The tests, run before a push\" (s-b6qdtghnyha3fhk) is to decide whether the tools read where the tests run from the project's own guidelines, as rule 1.6.1 (s-m4h279nbaqkpa3t) lets a project say.",
    "- When \"The tests, run before a push\" (s-b6qdtghnyha3fhk) is reviewed, it is to be decided whether the tools read, from the project's own guidelines, where the tests run, which rule 1.6.1 (s-m4h279nbaqkpa3t) lets a project state."]
]);
console.log("batch 22 applied");
