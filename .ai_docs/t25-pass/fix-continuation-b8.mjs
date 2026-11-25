// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 8.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "- the main table of checks, where no row yet set what a failure costs for either of the reviewer's two new judgements:",
  "- the main table of checks, which had no row that set the cost of a failure for either of the reviewer's two new judgements:", "table item");
c = swap(c, "An EngStickler reader agent read its English, kept in english-10-1-43a.md,", "An EngStickler reader agent read the English text of the row, kept in english-10-1-43a.md,", "table item");
c = swap(c, "Row 10.1.25a is proposed once the third item of the principle, the next item of this list, is settled, since the row's scope depends on that item.",
  "Row 10.1.25a was proposed after the third item of the principle, the next item of this list, was settled, since the row's scope depends on that item.", "table item");
c = swap(c, "requires a commit to be refused for lack of a readable answer from the reviewer only where the commit changes code; this finding is the item on node 10.5 below;",
  "requires a commit to be refused when the reviewer gives no readable answer only where the commit changes code; the item on node 10.5 below covers this finding;", "table item");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
