// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 48.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (s.split(from).length !== 2) throw new Error(`the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const p = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(p, "utf8");
const pairs = [
  ["The owner accepted a sentence that states the reason itself.", "The owner accepted a sentence that states the reason directly."],
  ["a citation that 1.7.3 forbids. The owner accepted SpecTag as the example name.", "a citation that rule 1.7.3 forbids. The owner accepted SpecTag as the example name in place of RecordType."],
  ["In rules 1.3.2 and 1.3.3, the citation of 5.3 was replaced by a citation of 1.6.1, a technical replacement.", "In rules 1.3.2 and 1.3.3, the citation of rule 5.3 was replaced by a citation of rule 1.6.1, a technical replacement."],
  ["The third pass, running at ", "The third pass, started at "],
  ["makes the schema say what the agreed drafts say:", "makes the schema match the agreed drafts:"],
  ["- `ratio` takes the notation of 6.6;", "- `ratio` uses the notation of rule 6.6 in the new numbering;"],
  ["- the types of link are those of 6.1's list, and `consumes` belongs to the Domains extension;", "- the link types are those in the list of rule 6.1, which does not hold `consumes`; `consumes` is added by the schema of the Domains extension;"],
  ["- a domain's header has no required level.\nWhat remains of stage 1 after the third pass: EngStickler's readers read the English of the decisions and of the section texts, and sub-steps 4 and 5 are marked as done.",
    "- the `level` of a domain's header is optional.\n\nAfter the third pass, EngStickler's readers read the English text of the decisions and of the section texts. Sub-steps 4 and 5 are then marked as done, and stage 1 is complete."],
  ["Fifteen such rules were found on 2026-11-20 (1.10, 1.15, 1.18, 1.27 to 1.33, 1.37, 1.39, 5.3, 6.5 and 6.6 in the current numbering).", "Eleven such rules were found on 2026-11-20: 1.10, 1.15, 1.18, 1.28, 1.29, 1.32, 1.37, 1.39, 5.3, 6.5 and 6.6 in the current numbering."],
];
for (const [a, b] of pairs) c = swap(c, a, b);
fs.writeFileSync(p, c);
console.log("continuation corrected");
