// Applies to the continuation file and the index the corrections that EngStickler's reader confirmed in batch 36.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "as the plan at https://claude.ai/artifact/9DDLzVwkHXMDzvQHaYpqcQ (move-plan.html) draws it:", "as the plan at https://claude.ai/artifact/9DDLzVwkHXMDzvQHaYpqcQ (move-plan.html) lays it out:", "top");
c = swap(c, "All the wordings that followed from the grilling session of 2026-11-19 have now been agreed.", "All the wordings that followed from the owner's answers in the session of questions of 2026-11-19, held with the `grilling` skill, have now been agreed by the owner.", "top");
c = swap(c, "The two versions of 10.1 are reconciled: the head of the table", "The two versions of 10.1 have been reconciled: the head of the table", "top");
c = swap(c, "and the paragraphs of the former reason have been placed as the last item of the head's list of changes records;", "and the paragraphs of the former reason have been placed where the last item in the head's list of changes says;", "top");
c = swap(c, "The owner agreed to the new wording of node 9.2 (s-6fw72j65jkqrfpf) on 2026-11-20 («ок»): it says", "The owner agreed to the new wording of node 9.2 (s-6fw72j65jkqrfpf) on 2026-11-20 («ок»). It says", "9.2");
c = swap(c, "stays in 9.2, the only place for it.", "stays in 9.2, the only place where it is defined.", "9.2");
c = swap(c, "and agree-9-2.mjs recorded the ruling and the nodes that 9.2 cites; an EngStickler reader agent is reading its English text, kept in english-9-2.md.", "and agree-9-2.mjs recorded the owner's ruling and the nodes that 9.2 cites. An EngStickler reader agent read the English text of 9.2, which is kept in english-9-2.md, and fix-9-2-english.mjs corrected the phrases that the reader had flagged, without changing their meaning.", "9.2");
fs.writeFileSync(contPath, c);
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = swap(s, "move-plan.html is the plan of moving the new form into the specification files,", "move-plan.html is the plan for moving the new form of the guidelines into the specification files,", "index");
fs.writeFileSync(indexPath, s);
console.log("notes corrected");
