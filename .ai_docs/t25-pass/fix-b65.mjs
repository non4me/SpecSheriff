// Applies the corrections that the agent accepted from EngStickler's readers in batch 65, to the index of .ai_docs and
// the continuation file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const report = [];
const apply = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) report.push(`not found: ${from.slice(0, 80)}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(path, s);
};

apply(new URL("../INDEX.md", here), [
  ["teaches build-moved.mjs to write the links that a draft itself names.", "changes build-moved.mjs so that it writes the links that a draft names in its own fields."],
  ["corrects the English of that node.", "corrects the English text of that node."],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["The first node under review is \"Where the files are\" (s-zefk589ykh37b8u), and the owner's answer to the proposal for it, described there, comes first. Stage 1 belonged to that same step, which the owner told the agent to start on 2026-11-20 («начинай») after seeing the plan",
    "The first node under review is \"Where the files are\" (s-zefk589ykh37b8u). The owner's answer to the proposal for it, described in the paragraph \"The first node of the appendix under review\" below, is to be dealt with first. Stage 1 was part of that same step, which the owner told the agent to start on 2026-11-20 («начинай») after seeing the plan"],
  ["Stage 1 builds the new specification files in a staging folder, .ai_docs/t25-pass/moved/, and leaves the files under specs/ untouched until the SpecSheriff tools accept the new form of the guidelines (stage 3). Its sub-steps, in order, each marked when done:",
    "Stage 1 built the new specification files in a staging folder, .ai_docs/t25-pass/moved/. The files under specs/ stay untouched until the SpecSheriff tools accept the new form of the guidelines (stage 3). The sub-steps of stage 1 are listed in order, each marked when it was done:"],
  ["the node says that a RecordType's fields state what it requires, that its description of what it is for serves as its reason, which refines rule 1.2.3, that the code generated from it is bound to it, and that at least one test checks that a data record that violates it is neither output nor stored.",
    "the node says that a RecordType's fields state what it requires, that its description of what it is for serves as its reason, that the code generated from it is bound to it, and that at least one test checks that a data record that violates it is neither output nor stored. The statement about the reason refines rule 1.2.3."],
  ["including the schema of each extension and `archive-file.schema.json`, which every project except SpecSheriff itself reads from the plugin;",
    "including the schema of each extension and `archive-file.schema.json`; every project except SpecSheriff itself reads all of these from the plugin;"],
  ["3. the records kept beside the specification:", "3. the files kept beside the specification:"],
  ["now without the rule that approved the specification, and with where the tests run, the project's own tools that rewrite files and the formats that allow no comments;",
    "now without the rule whose approval status gave the specification its approval status, and with three new items: where the tests run, the project's own tools that rewrite files, and the formats that allow no comments;"],
  ["what is rebuilt after every change and is not kept in git, where the Views extension is chosen;", "what is rebuilt after every change and is not kept in git, if the project has chosen the Views extension;"],
  ["The agent made four choices of its own, since the new form requires these files and the current node names none of them:",
    "The agent made four choices on its own, since the new form requires these four things and the current node names none of them:"],
  ["without the Domains extension, the base specification is kept under `specs/base/`.", "if the project has not chosen the Domains extension, the base specification is kept under `specs/base/`."],
]);
console.log(report.join("\n") || "every pair found");
