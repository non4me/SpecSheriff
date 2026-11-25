// Applies to the index of .ai_docs the corrections that EngStickler's reader confirmed in batch 49.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to) => {
  if (s.split(from).length !== 2) throw new Error(`the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const p = new URL("../INDEX.md", here);
let s = fs.readFileSync(p, "utf8");
s = swap(s, "add-lists.mjs adds to the drafts 1.3.1 and 6.1 the `TextRule.list` that the current nodes 1.5 and 2.2 hold.",
  "add-lists.mjs copies the `TextRule.list` of the current node 1.5 into draft 1.3.1, and that of the current node 2.2 into draft 6.1.");
s = swap(s, "writes the archive in moved/specs/_archive/. build-moved.mjs takes the English text of the todos written in Russian from todos-en.json.",
  "writes the archive to moved/specs/_archive/. For the todos that were written in Russian, build-moved.mjs takes their English text from todos-en.json.");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
fs.writeFileSync(p, s);
console.log("index corrected");
