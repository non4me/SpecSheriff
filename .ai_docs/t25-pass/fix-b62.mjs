// Applies the corrections that the agent accepted from EngStickler's readers in batch 62, and records in the continuation
// file and the index the owner's ruling of 2026-11-21 that a RecordType is a rule, with the draft that carries it out.
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
  ["explains how a RecordType is kept and how it is tied to its tests and its code, and compares three variants. |",
    "explains where a RecordType is kept and how it is tied to its tests and its code, and compares three ways of settling whether a RecordType is a rule. propose-12-3a.mjs carries out the owner's choice of the first way: it adds the draft of node 12.3a, \"A RecordType is a rule\", with its row on the structure page and its ruling in decisions-out-5.json. |"],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["The owner then asked how the agent sees the whole chain from a RecordType to its tests and its code. The page recordtype-rule/index.html (https://claude.ai/artifact/EMKvRer7iZo1UKBwLkLeku) answers that and compares three variants: a RecordType is a rule; a separate rule states what the format is for, and the RecordType holds only the format; a RecordType is not a rule. The agent recommends the first variant and will write the wording once the owner agrees to it.",
    "The owner then asked how the agent understands the whole chain of links from a RecordType to its tests and its code. The page recordtype-rule/index.html (https://claude.ai/artifact/EMKvRer7iZo1UKBwLkLeku) answers the owner's question about the chain and compares three ways of settling question (4): a RecordType is a rule; a separate rule states what the data is for, and the RecordType holds only the format of the data; a RecordType is not a rule. The owner chose the first way on 2026-11-21 («Согласен с вариантом А»). propose-12-3a.mjs drafts the new node 12.3a, \"A RecordType is a rule\", and specsheriff-rule-reviewer checks the draft before it is shown to the owner. The step that changes the SpecSheriff tools then allows a test to carry the SpecTag of a RecordType, and requires such a test for every approved RecordType; the tools now refuse such a test."],
]);
console.log(report.join("\n") || "every pair found");
