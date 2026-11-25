// Applies to the continuation file the corrections EngStickler's reader confirmed in batch 16 that still apply to its
// current text; the other findings of that batch were corrected in later batches.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["The owner chose the independent reviewer on 2026-11-19 (option 1). So the principle", "On 2026-11-19 the owner chose to have the independent reviewer verify the mark (option 1). So the principle"],
  ["to let the agent approve such nodes on the owner's behalf and report them (option 2).", "to let the agent approve such nodes on the owner's behalf and report them to the owner (option 2)."],
  ["so no extra run is needed.", "so no extra run of the reviewer is needed."],
  ["was that the report to the owner is the only check on such a node, and the owner withdraws an approval where necessary.", "was that the report to the owner be the only check on such a node, and that the owner withdraw an approval where necessary."],
  ["was that the agent marks each approval it makes on the owner's behalf with a trailer in the commit message, and that only the nodes whose approvals are so marked are reviewed and reported.", "was that the agent mark each approval it makes on the owner's behalf with a trailer in the commit message, and that only the nodes whose approvals are so marked be reviewed and reported."],
];
let applied = 0;
for (const [a, b] of pairs) {
  if (c.includes(a)) { c = c.replace(a, b); applied++; } else console.log("not present: " + a.slice(0, 60));
}
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "fix-english-b28.mjs and fix-english-b30.mjs apply";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "fix-english-b16.mjs, fix-english-b28.mjs and fix-english-b30.mjs apply");
s = s.replace("confirmed in batches 28 and 30.", "confirmed in batches 16, 28 and 30.");
fs.writeFileSync(indexPath, s);
console.log("applied", applied, "at", now);
