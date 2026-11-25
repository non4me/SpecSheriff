// Applies the corrections that the agent accepted from EngStickler's readers in batch 63, and records in the continuation
// file and the index that draft 12.3a was revised after the reviewer's check and is shown to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const report = [];
const apply = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) report.push(`not found: ${from}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(path, s);
};

apply(new URL("../INDEX.md", here), [
  ["outline-12-3a.mjs starts the outline of the queue map for 21 November. |",
    "outline-12-3a.mjs writes the outline of the queue map for 21 November, which lists only what was done on that day. revise-12-3a.mjs applies the reviewer's findings to draft 12.3a and teaches build-moved.mjs to write the links that a draft names itself. |"],
  ["fix-b60.mjs, fix-b61.mjs and fix-b62.mjs apply", "fix-b60.mjs to fix-b63.mjs apply"],
  ["in batches 60 to 62 to", "in batches 60 to 63 to"],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["The owner then asked how the agent understands the whole chain of links from a RecordType to its tests and its code.",
    "The owner then asked the agent to explain how, in its view, a RecordType is tied to its tests and its code."],
  ["propose-12-3a.mjs drafts the new node 12.3a, \"A RecordType is a rule\", and specsheriff-rule-reviewer checks the draft before it is shown to the owner. The step that changes the SpecSheriff tools then allows a test to carry the SpecTag of a RecordType, and requires such a test for every approved RecordType; the tools now refuse such a test.",
    "propose-12-3a.mjs drafted the new node 12.3a, \"A RecordType is a rule\". specsheriff-rule-reviewer checked the draft, and revise-12-3a.mjs applied its findings: the node says that a RecordType's fields state what it requires and that its description of what it is for serves as its reason, which refines rule 1.2.3; the code generated from it is bound to it; at least one test checks that a data record that violates it is neither output nor stored. The draft is now shown to the owner. The step that changes the SpecSheriff tools will allow a test to carry the SpecTag of a RecordType, and will require such a test for every approved RecordType. The tools currently reject such a test."],
]);
console.log(report.join("\n") || "every pair found");
