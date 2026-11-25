// Applies to the continuation file the corrections EngStickler's readers confirmed in batch 28.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["proposing to the owner the new wording of nodes 1.6.1 and 10.2, which have the independent reviewer judge only a commit that changes code. The list at the end of the section \"Waiting for the owner\" gives the proposals that follow, one at a time.", "proposing to the owner new wordings for nodes 1.6.1 and 10.2, under which the independent reviewer judges only commits that change code. The list at the end of the section \"Waiting for the owner\" names the proposals that follow, to be made one at a time."],
  ["The reviewer of any commit it reviews is now given what each of its judgements needs.", "For any commit, the reviewer is now given what each of its judgements needs."],
  ["since the choice costs tokens for the person who commits.", "since giving the reviewer the whole base specification would cost the person who commits more tokens."],
  ["An EngStickler reader agent reads the agreed English text of 10.4 before the session closes.", "An EngStickler reader agent read the agreed English text of 10.4 before the session closed, and fix-10-4-english.mjs corrected the one phrase it found."],
  ["where no row yet sets what it costs when either of the two new judgements finds a defect: the agent proposes either new rows or a broader row 10.1.43;", "where no row yet sets what a failure costs when either of the two new judgements finds a defect: the agent will propose either new rows or a broadened row 10.1.43;"],
  ["while 1.3.6 and 10.4 apply only to a node", "while nodes 1.3.6 and 10.4 apply only to a node"],
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
const b = "fix-10-4-english.mjs corrects a phrase in the agreed English text of 10.4.";
if (!s.includes(b)) throw new Error("index text not found");
s = s.replace(b, b + " fix-english-b28.mjs applies the corrections of EngStickler's batch 28 to the continuation file.");
fs.writeFileSync(indexPath, s);
console.log("fixed at", now);
