// Withdraws the proposed reason of row 10.1.41, which the owner rejected on 2026-11-20: the sentence moved from the former
// reason of 10.1 says that an unimplemented approved rule is only reported, while the owner means that a commit that
// includes such a rule is refused while the specification is approved, and that nothing is reported while it is a draft.
// Records the owner's objection in the continuation file, applies the corrections confirmed in EngStickler's batch 13,
// and brings the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const replaceAll = (s, from, to, what) => {
  if (!s.includes(from)) throw new Error(`${what}: not found: ${from.slice(0, 70)}`);
  return s.split(from).join(to);
};

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
if (!r) throw new Error("row 10.1.41 not found");
delete r.proposals;
if (!r.change.includes("20 ноября вы отклонили предложенное обоснование")) r.change +=" 20 ноября вы отклонили предложенное обоснование: фраза из прежнего обоснования 10.1 говорит, что неисполненное одобренное правило только сообщается, а по вашему смыслу коммит с таким правилом отклоняется, пока спецификация одобрена, и ничего не сообщается, пока она черновик. Строка будет предложена заново.";
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed reason of row 10\.1\.41[^\n]*/m, () =>
  "**The next session starts by** getting the owner's confirmation of what row 10.1.41 of the main table of checks is to mean, as the agent restated it to the owner on 2026-11-20 and as the item on row 10.1.41 below describes. Once the owner confirms it, the agent drafts the new wording of the row, has the rule reviewer check it, and shows it to the owner.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "- the reason of row 10.1.41, proposed to the owner and waiting for the owner's decision: the sentence moved word for word from the former reason of 10.1;",
  "- row 10.1.41. On 2026-11-20 the owner rejected the proposed reason, the sentence moved word for word from the former reason for 10.1, which says that an approved rule that is not implemented is reported rather than refused. The owner pointed out that the reason speaks of approval while the row's text speaks of binding a rule to code, and that the intended meaning is the opposite: while the specification is approved, a commit that includes an approved rule without code and tests is refused; while the specification is a draft, such a rule is the normal state and nothing is reported. The agent agreed and withdrew the reason. The same defect is in the agreed row itself: its cost is \"reported under the rule's sid while the specification is approved\", and it covers every approved rule rather than the rules that the commit includes, which contradicts the owner's ruling of 2026-11-19 that a check reads only what the commit contains. The sentence also cited 1.4.1 (s-rah8b37kytb682y), which says only that a rule's test is written before its code. The agent restated the meaning to the owner for confirmation: while the specification is approved, a commit that includes an approved rule that the system's code must implement is refused, naming the rule, unless the rule is bound to code of the system outside its tests and to a test not marked as skipped; a commit includes a rule when it changes the rule's wording or approval, its tests or the code bound to it; while the specification is a draft, the check reports nothing; rules outside the commit are not read;", "10.1.41 item");
c = swap(c, "- 10.5 (s-94k7b6r5kf65udf), agreed: its text lets through a commit whenever",
  "- 10.5 (s-94k7b6r5kf65udf), which the owner has agreed to: its text lets a commit through whenever", "batch 13");
c = swap(c, "describes a readable answer on which the commit is refused.", "describes a readable answer that leads to the commit being refused.", "batch 13");
c = swap(c, "Its title and the sentence on the refusal refer to", "Its title and the sentence about the refusal refer to", "batch 13");
c = swap(c, "which say that an approval means that an owner has agreed, but no longer hold", "which say that an approval means that an owner has agreed to the rule, but no longer hold", "batch 13");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "propose-10-1-41-reason.mjs records the owner's agreement to the reason of 1.3.4 and proposes the reason of row 10.1.41.",
  "propose-10-1-41-reason.mjs records the owner's agreement with the reason for 1.3.4 and proposes a reason for row 10.1.41; withdraw-10-1-41-reason.mjs withdraws that reason after the owner rejected it.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ обоснование строки 10.1.41 основной таблицы проверок\n- фраза из прежнего обоснования 10.1, дословно: неисполненное одобренное правило сообщается, а не отклоняется\n",
  "### ◐ смысл строки 10.1.41 основной таблицы проверок\n- пока спецификация одобрена: коммит с одобренным правилом без кода и теста отклоняется\n- пока черновик: ничего не сообщается\n- предложенное обоснование снято: оно говорило обратное\n", "outline waiting");
o = swap(o, "- ● обоснование строки 10.1.41\n", "- ● строка 10.1.41: смысл, затем новая формулировка\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("withdrawn at", now);
