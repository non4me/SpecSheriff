// Applies to the index of .ai_docs the corrections that EngStickler's reader confirmed in batch 47.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to) => {
  if (s.split(from).length !== 2) throw new Error(`the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const p = new URL("../INDEX.md", here);
let s = fs.readFileSync(p, "utf8");
s = swap(s, "add-lists.mjs gives the drafts 1.3.1 and 6.1 the `TextRule.list` that the current nodes with their content hold.",
  "add-lists.mjs adds to the drafts 1.3.1 and 6.1 the `TextRule.list` that the current nodes 1.5 and 2.2 hold.");
s = swap(s, "records in the continuation file how far stage 1 has come.", "records in the continuation file how far stage 1 has progressed.");
s = swap(s, "Its second pass also merges decisions-out-1.json to decisions-out-4.json, sets the section texts from section-purposes.json and writes the archive. It takes the English of the Russian todos from todos-en.json.",
  "The second pass of build-moved.mjs also merges decisions-out-1.json through decisions-out-4.json into the decisions of the nodes, sets the text of each section from section-purposes.json and writes the archive in moved/specs/_archive/. build-moved.mjs takes the English text of the todos written in Russian from todos-en.json.");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
fs.writeFileSync(p, s);
console.log("index corrected");
