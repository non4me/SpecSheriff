// Records the owner's question of 2026-11-19 on why two places were named for the mark (the approval entry and the
// commit message), the agent's clarification and the fourth question as now put to the owner; applies the corrections
// EngStickler's reader confirmed in batch 11. Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const swap = (a, b) => {
  if (!c.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  c = c.replace(a, b);
};
const replaceLine = (start, text) => {
  const lines = c.split("\n");
  const at = lines.findIndex((l) => l.startsWith(start));
  if (at < 0) throw new Error("line not found: " + start);
  lines[at] = text;
  c = lines.join("\n");
};

swap("the mark \"the meaning is unchanged\" is a field of the approval entry,", "the mark \"the meaning is unchanged\" is recorded in a field of the approval entry,");
swap("or to let only an owner set the mark in person.", "or to let only an owner set the mark personally.");
swap("The owner chose the independent reviewer on 2026-11-19 (\"1\").", "The owner chose the independent reviewer on 2026-11-19 (option 1).");
swap("is also to cover a commit that changes the wording of a rule bound to code.", "is also to be extended to cover a commit that changes the wording of a rule bound to code.");
swap("by the dates of their changes, the part \"nor its code behind its tests\" of row 10.1.40.", "by the dates of their changes, that is, the part of row 10.1.40 that reads \"nor its code behind its tests\".");
swap("judged by the reviewer, say so.", "judged by the reviewer, settle the case.");
swap("to keep the comparison, made precise:", "to keep the comparison, made more precise:");
swap("so that the check follows the logic of the implementation, not the files. The agent takes this as the second option:", "so that the check follows the logic of the implementation rather than the files. The agent takes this to be the second option:");
replaceLine("The fourth question of the grilling", [
  "The fourth question of the grilling was first put as where the mark \"the code needs no change\" is kept when only a rule's tests change, since such a commit changes no wording and so has no approval entry. The agent recommended a git trailer in the commit message, naming the rule.",
  "",
  "The owner then asked (2026-11-19) why two places were named, the approval entry and the commit message. The agent's clarification: the agent had named two places for two cases. Where a rule's wording changes, the change is always approved, so the mark could be a field of the approval entry. Where only a rule's tests change, nothing is approved, so the mark has to go elsewhere. One place is simpler: a trailer saying that the implementation of the named rule needs no change in this commit covers both cases, and the approval entry then stays as it is. The commit-msg hook reads the trailer, since the commit message exists only at that hook.",
  "",
  "The fourth question, now being put to the owner, is whether the mark is kept in one place, a trailer in the commit message for both cases, or in two places, a field of the approval entry where the wording changes and a trailer where only the tests change. The agent recommends one place.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the fourth question of the grilling, namely whether the mark that the implementation needs no change is kept in one place, a trailer in the commit message, or in two places. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the remaining questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: где хранится пометка «код менять не нужно», когда менялся только тест; рекомендую трейлер в сообщении коммита\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- сейчас: одно место для пометки «реализацию менять не нужно» или два; рекомендую одно — трейлер в сообщении коммита для обоих случаев\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "for the second and third questions and for the third and fourth.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, a + " grill-change-6.mjs records why two places were named for the mark and the fourth question as it is now put to the owner.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
