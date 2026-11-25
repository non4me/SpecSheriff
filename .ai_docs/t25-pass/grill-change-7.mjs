// Records the owner's answer of 2026-11-19 to the fourth question of the grilling (one place: a trailer in the commit
// message) and the fifth question put to the owner; applies the corrections EngStickler's reader confirmed in batch 12.
// Updates the continuation file, the queue outline and .ai_docs/INDEX.md.
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

swap("to keep the comparison, made more precise:", "to keep the comparison in a more precise form:");
swap("so that the check follows the logic of the implementation rather than the files.", "so that the check follows how each rule is implemented rather than which files changed.");
swap("the commit carries a mark that the code needs no change, and the reviewer judges it.", "the commit contains a mark stating that the code needs no change, and the reviewer judges that mark.");
swap("The fourth question of the grilling was first put as where the mark", "The fourth question of the grilling was first put in this form: where the mark");
swap("The owner then asked (2026-11-19) why two places were named,", "The owner then asked (2026-11-19) why two places were proposed,");
swap("the agent had named two places for two cases.", "the agent had proposed two places for two cases.");
swap("so the mark has to go elsewhere.", "so the mark has to be kept elsewhere.");
swap("The commit-msg hook reads the trailer, since the commit message exists only at that hook.", "The commit-msg hook reads the trailer, since of the hooks that check a commit, only that hook sees the commit message.");
replaceLine("The fourth question, now being put to the owner,", [
  "The fourth question, as it was then put to the owner, was whether the mark is kept in one place, a trailer in the commit message for both cases, or in two places, a field of the approval entry where the wording changes and a trailer where only the tests change. The agent recommended one place.",
  "",
  "The owner chose one place on 2026-11-19 (option 1). So the mark that the implementation of a named rule needs no change is a trailer in the commit message, in both cases, and the approval entry gains no field. The commit-msg hook reads the trailer, and the reviewer judges it. The names of the trailer and of its values are a technical choice, which the agent makes when the appendix of the tools is changed.",
  "",
  "The fifth question of the grilling, now being put to the owner, is what happens while the specification is a draft to a commit that changes an approved rule's wording without changing its tests or code and without the trailer. The owner's exception lets the commit pass; the question is whether it passes silently or with a report naming the rule. The agent recommends a report. The check reads only the commit, so a lag left while the specification is a draft is never seen again by a later commit that does not include the rule; the report at that commit is the moment it becomes visible. Before the specification is approved, the approval procedure already shows its owner what the checks report (10.6). The other option put to the owner is to let the commit pass silently, as node 9.5 does for code without a SpecTag while the specification is a draft.",
].join("\n"));
const head = "## Waiting for the owner\n\n";
const from = c.indexOf(head);
const to = c.indexOf("\n", from + head.length);
c = c.slice(0, from) + head + "The agent is waiting for the owner's answer to the fifth question of the grilling, namely whether, while the specification is a draft, a commit that leaves an approved rule's implementation lagging behind its new wording passes silently or with a report. The consequence of a failure of the check in row 10.1.40 will be settled once the owner has answered the remaining questions of the grilling." + c.slice(to);
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const outlinePath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlinePath, "utf8");
const from1 = "- сейчас: одно место для пометки «реализацию менять не нужно» или два; рекомендую одно — трейлер в сообщении коммита для обоих случаев\n";
if (!o.includes(from1)) throw new Error("outline line not found");
o = o.replace(from1, "- ✓ пометка «реализацию менять не нужно» — одна, трейлер в сообщении коммита (ваш выбор)\n- сейчас: пока спецификация черновик, коммит с отставшим правилом проходит молча или с сообщением; рекомендую с сообщением\n");
fs.writeFileSync(outlinePath, o);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
const a = "grill-change-6.mjs records why two places were named for the mark and the fourth question as it is now put to the owner.";
if (!s.includes(a)) throw new Error("index text not found");
s = s.replace(a, "grill-change-6.mjs records why two places were proposed for keeping the mark that the implementation needs no change, and the fourth question as it was then put to the owner; grill-change-7.mjs records the owner's answer to the fourth question and the fifth question.");
fs.writeFileSync(indexPath, s);
console.log("recorded at", now);
