// Applies the corrections that EngStickler's readers confirmed in batch 60, to the index of .ai_docs and the
// continuation file.
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
  ["applies to the inventory and the continuation file the corrections that the readers confirmed, and puts the titles of nodes in the inventory in quotation marks.",
    "applies the corrections that EngStickler's readers confirmed to the inventory and the continuation file, and puts the titles of the nodes listed in the inventory in quotation marks."],
  ["agreement to \"documentation\" in row 10", "agreement to the word \"documentation\" in row 10"],
  ["the late rulings of 2026-11-20", "the rulings made later on 2026-11-20"],
]);
apply(new URL("../t25-one-thought.md", here), [
  ["The agent settled question (3) without the owner:", "The agent settled question (3) without asking the owner:"],
  ["three words or more", "three or more words"],
  ["as a question of meaning: whether the RecordType extension states that a RecordType is a rule. The agent recommends that it does, and writes the wording once the owner agrees.",
    "as a question about what the extension means: whether the RecordType extension states that a RecordType is a rule. The agent recommends that the extension state this, and writes the wording once the owner agrees to the recommendation."],
]);
console.log(report.join("\n") || "every pair found");
