// Applies the corrections that the agent accepted from EngStickler's readers in batch 61, to the index of .ai_docs and the
// continuation file, and records in the continuation file the page that explains how a RecordType is tied to its tests
// and its code.
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
  ["fix-b57-b58.mjs applies the corrections that EngStickler's readers confirmed to the inventory",
    "fix-b57-b58.mjs applies the corrections that the agent accepted from EngStickler's readers to the inventory"],
  ["writes the rulings made later on 2026-11-20 into decisions-out-5.json.",
    "writes into decisions-out-5.json the rulings of 2026-11-20 that were made after the decisions had been extracted."],
  ["fix-b60.mjs applies the corrections that EngStickler's readers confirmed in batch 60 to this index and the continuation file. |",
    "fix-b60.mjs and fix-b61.mjs apply the corrections that the agent accepted from EngStickler's readers in batches 60 and 61 to this index and the continuation file. recordtype-rule/index.html, published as the artifact EMKvRer7iZo1UKBwLkLeku, explains how a RecordType is kept and how it is tied to its tests and its code, and compares three variants. |"],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["set in capital letters", "written in capital letters"],
  ["Question (4) was put to the owner on 2026-11-20 as a question about what the extension means: whether the RecordType extension states that a RecordType is a rule. The agent recommends that the extension state this, and writes the wording once the owner agrees to the recommendation.",
    "Question (4) was put to the owner on 2026-11-20: should the RecordType extension state that a RecordType is a rule? The owner then asked how the agent sees the whole chain from a RecordType to its tests and its code. The page recordtype-rule/index.html (https://claude.ai/artifact/EMKvRer7iZo1UKBwLkLeku) answers that and compares three variants: a RecordType is a rule; a separate rule states what the format is for, and the RecordType holds only the format; a RecordType is not a rule. The agent recommends the first variant and will write the wording once the owner agrees to it."],
]);
console.log(report.join("\n") || "every pair found");
