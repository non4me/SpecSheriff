// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 50.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (s.split(from).length !== 2) throw new Error(`the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const p = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(p, "utf8");
c = swap(c, "After the third pass, EngStickler's readers read the English text of the decisions and of the section texts. Sub-steps 4 and 5 are then marked as done, and stage 1 is complete.",
  "After the third pass, EngStickler's readers will read the English text of the decisions and of the section texts. Sub-steps 4 and 5 will then be marked as done, and stage 1 will be complete.");
c = swap(c, "- `ratio` uses the notation of rule 6.6 in the new numbering;", "- `ratio` uses the notation that the new rule 6.6 (s-bckzdwd35d2nefa) defines;");
fs.writeFileSync(p, c);
console.log("continuation corrected");
