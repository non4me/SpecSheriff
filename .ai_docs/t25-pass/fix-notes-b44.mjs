// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 44.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["The build found contradictions between agreed drafts. Two needed the owner: the reason of 1.6.1 cited", "Running the build revealed contradictions between agreed drafts. Two needed a ruling from the owner: the reason for rule 1.6.1 cited"],
  ["7.2.7, a rule of the SpecSheriff guidelines, cited RecordType of the RecordType extension, which 1.7.3 forbids,", "7.2.7, a rule of the SpecSheriff guidelines, cited the name RecordType from the RecordType extension, a citation that 1.7.3 forbids,"],
  ["In 1.3.2 and 1.3.3 the citation of 5.3 became a citation of 1.6.1, a technical replacement.", "In 1.3.2 and 1.3.3 the citation of 5.3 was replaced by a citation of 1.6.1, a technical replacement."],
  ["it drops the links from the base to the extensions, merges the decisions, sets the section texts, writes the archive, translates the Russian todos and checks the build again.", "it removes the links from the base to the extensions, merges the decisions into `meta.decisions`, sets the section texts, writes the archive files, translates the Russian todos into English and checks the build's output again."],
  ["are reported for the agent to decide.", "are reported so that the agent can decide whether to restore them."],
];
for (const [a, b] of pairs) c = swap(c, a, b, "progress");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
