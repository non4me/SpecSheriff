// Applies to the continuation file the corrections EngStickler's reader confirmed in batch 30.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["The list at the end of the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time.", "The list of wordings in the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time."],
  ["For any commit, the reviewer is now given what each of its judgements needs.", "For any commit it reviews, the reviewer is now given everything that each of its judgements requires."],
  ["would cost the person who commits more tokens.", "would cost the person who makes the commit more tokens."],
];
for (const [a, b] of pairs) {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
}
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const b = "fix-english-b28.mjs applies the corrections of EngStickler's batch 28 to the continuation file.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, "fix-english-b28.mjs and fix-english-b30.mjs apply the corrections of EngStickler's batches 28 and 30 to the continuation file.");
fs.writeFileSync(indexPath, s);
console.log("fixed at", now);
