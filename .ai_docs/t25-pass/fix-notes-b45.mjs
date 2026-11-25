// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 45.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["Two needed a ruling from the owner:", "Two of them needed a ruling from the owner:"],
  ["cited the name RecordType from the RecordType extension, a citation that 1.7.3 forbids,", "cited the node that defines the name RecordType in the RecordType extension, a citation that 1.7.3 forbids,"],
  ["In 1.3.2 and 1.3.3 the citation of 5.3 was replaced", "In rules 1.3.2 and 1.3.3 the citation of 5.3 was replaced"],
  ["sets the section texts, writes the archive files, translates the Russian todos into English", "writes the section texts, writes the archive files for the dropped rules, translates the todos written in Russian into English"],
  ["The lists that the current nodes with the sids of 1.3.5 and 6.1 hold, and that their drafts lack, are reported so that the agent can decide whether to restore them.", "The lists that the current nodes with the same sids as the drafts 1.3.5 and 6.1 hold, and that those drafts lack, are listed in moved/report.md so that the agent running this session can decide whether to restore them."],
];
for (const [a, b] of pairs) c = swap(c, a, b, "progress");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
