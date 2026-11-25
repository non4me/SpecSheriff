// Records the owner's agreement of 2026-11-21 («ок») to node 12.3a, "A RecordType is a rule", and carries it out where it
// changes nothing else's meaning: the comment of the RecordType extension's schema says that a RecordType is a rule, and
// the inventory of stage 2 records that problem P6 is settled. Applies the corrections that the agent accepted from
// EngStickler's readers in batch 64. Writes english-12-3a.md, the English of the agreed node, for EngStickler's reader.
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

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["12.3a"];
n.agreed = "2026-11-21";
n.changes.push("21 ноября вы согласились с узлом («ок»).");
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const sid = JSON.parse(fs.readFileSync(new URL("moved/new-sids.json", here), "utf8"))["_guidelines/extensions/recordtype/12.3a"];
if (!sid) throw new Error("no sid for 12.3a in moved/new-sids.json");
apply(new URL("moved/specs/_schema/extensions/recordtype.schema.json", here), [
  ["A RecordType stands in a section as a rule does and is numbered among its rules;",
    `A RecordType is a rule of the section that declares it (${sid}), and is numbered among its rules;`],
]);

apply(new URL("stage2-inventory.md", here), [
  ["“What is considered a rule of a section” (s-pctqj9wqaq8762t) does not count a RecordType as a rule.",
    `“What is considered a rule of a section” (s-pctqj9wqaq8762t) does not count a RecordType as a rule. Settled on 2026-11-21: the owner agreed to the new node “A RecordType is a rule” (${sid}) of the RecordType extension.`],
]);

apply(new URL("../INDEX.md", here), [
  ["the links that a draft names itself.", "the links that a draft itself names."],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["the node says that a RecordType's fields state what it requires and that its description of what it is for serves as its reason, which refines rule 1.2.3; the code generated from it is bound to it; at least one test checks that a data record that violates it is neither output nor stored. The draft is now shown to the owner. The step that changes the SpecSheriff tools will allow a test to carry the SpecTag of a RecordType, and will require such a test for every approved RecordType.",
    "the node says that a RecordType's fields state what it requires, that its description of what it is for serves as its reason, which refines rule 1.2.3, that the code generated from it is bound to it, and that at least one test checks that a data record that violates it is neither output nor stored. The owner agreed to node 12.3a on 2026-11-21 («ок»). After the step that changes the SpecSheriff tools, the tools will allow a test to carry the SpecTag of a RecordType and will require such a test for every approved RecordType."],
]);

const out = [
  "# Node 12.3a of the RecordType extension, agreed on 2026-11-21",
  "",
  `## Title`, "", n.title, "",
  `## Text`, "", n.text, "",
  `## Reason`, "", n.reason, "",
  ...n.examples.flatMap((e) => ["## Example", "", e, ""]),
];
fs.writeFileSync(new URL("english-12-3a.md", here), out.join("\n"));
console.log(report.join("\n") || "every pair found", "| sid", sid);
