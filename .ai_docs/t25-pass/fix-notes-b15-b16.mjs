// Applies the corrections that EngStickler's readers confirmed in batch 15 (the owner's rules for this repository) and
// batch 16 (the continuation file), and records in the continuation file that the owner is going through row 10.1.41
// sentence by sentence.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const rulesPath = new URL("../../.claude/vt/rules.md", here);
let r = fs.readFileSync(rulesPath, "utf8");
r = swap(r, "A wording carried over from an earlier text, such as a sentence moved from another node, is checked as a new wording is. It is checked against every ruling made since the earlier text was written, and against what the node it moves into now means. Each node it cites is read before it is proposed.",
  "A wording carried over from an earlier text, such as a sentence moved from another node, is checked in the same way as a new wording. It is checked against every ruling made since the earlier text was written, and against what the node it is moved into means now. Each node that the wording cites is read before the wording is proposed.", "rules");
r = swap(r, "*Why:* On 2026-11-20 the agent proposed a sentence as the reason for row 10.1.41. The sentence had been moved word for word from the former reason for 10.1, which was written before the rulings of 2026-11-19.",
  "*Why:* On 2026-11-20 the agent proposed a sentence as row 10.1.41's reason. The sentence had been moved word for word from node 10.1's former reason, which had been written before the rulings of 2026-11-19.", "rules why");
r = swap(r, "It cited a node that says something else.", "It cited a node that does not say what the sentence claimed.", "rules why");
fs.writeFileSync(rulesPath, r);

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "while the specification is a draft, such a rule having no code or tests is the normal state, and nothing is reported.",
  "while the specification is a draft, it is normal for such a rule to have no code or tests, and nothing is reported.", "b16");
c = swap(c, "The same defect is also in the agreed row itself:", "The same defect is also present in the agreed row itself:", "b16");
c = swap(c, "unless the rule is bound to code of the system other than test code and to a test that is not marked as skipped; a commit includes a rule when it changes the rule's wording, the rule's approval, the rule's tests or the code bound to the rule;",
  "unless the rule is bound to non-test code of the system and to a test that is not marked as skipped; a commit includes a rule when it changes the rule's wording, adds or withdraws the rule's approval, or changes the rule's tests or the code bound to the rule;", "b16");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's confirmation of what row 10\.1\.41[^\n]*/m, () =>
  "**The next session starts by** going on with row 10.1.41 of the main table of checks, which the owner is going through sentence by sentence (the owner, 2026-11-20). The first sentence binds an approved rule to code of the system outside its tests and to a test not marked as skipped; the owner asked where the clause on skipped tests came from, since the owner does not recall deciding that any test may be skipped. The second sentence counts code or a test bound to a rule that implements the rule, directly or through a chain of `implements` links; the owner restated its purpose, and the agent takes it up once the first sentence is settled. The cost and the scope of the row, restated in the item on row 10.1.41 below, come after both sentences.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-notes-b14.mjs corrects the English text of the continuation file.",
  "fix-notes-b14.mjs corrects the English text of the continuation file. fix-notes-b15-b16.mjs corrects the English text of the project's rules and of the continuation file.", "index");
fs.writeFileSync(indexPath, s);
console.log("corrected at", now);
