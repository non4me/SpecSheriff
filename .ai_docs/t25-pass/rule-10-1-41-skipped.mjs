// Records the owner's ruling of 2026-11-20 on row 10.1.41 of the main table of checks: the clause on a test not marked as
// skipped stays, and the row's reason explains it. Applies the corrections that EngStickler's reader confirmed in batch
// 17, and brings the continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
if (!r.change.includes("оговорка о тесте, не помеченном как пропускаемый, остаётся")) {
  r.change += " 20 ноября, при разборе строки по предложениям, вы решили: оговорка о тесте, не помеченном как пропускаемый, остаётся, а обоснование строки её объясняет. Тестовый прогон считает пропущенный тест не упавшим, поэтому без оговорки правило, у которого есть только пропущенный тест, прошло бы и эту проверку, и проверку тестов при push.";
}
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* going on with row 10\.1\.41[^\n]*/m, () =>
  "**The next session starts by** continuing with row 10.1.41 of the main table of checks, which the owner is going through sentence by sentence (the owner, 2026-11-20). The row's first sentence requires an approved rule to be bound to the system's code other than its tests and to a test not marked as skipped. The owner ruled on 2026-11-20 that the clause on skipped tests stays and that the row's reason explains it: a test run does not count a skipped test as failed, so without the clause a rule whose only test is skipped would pass both this check and the check of the tests on a push. The row's second sentence counts code or a test bound to a rule that implements the approved rule, directly or through a chain of `implements` links, as bound to the approved rule. The owner restated its purpose, and the agent has asked the owner to agree that its meaning stays and that its Russian «его» is replaced by «одобренное правило», since «его» can be read as the code. The cost and the scope of the row, restated in the item on row 10.1.41 below, are taken up after both sentences.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);
if (!c.includes("The owner ruled on 2026-11-20 that the clause on skipped tests stays")) throw new Error("the top of the continuation file was not rewritten");

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-notes-b15-b16.mjs corrects the English text of the project's rules and of the continuation file.",
  "fix-notes-b15-b16.mjs corrects the English text of the project's rules and of the continuation file. rule-10-1-41-skipped.mjs records the owner's ruling that row 10.1.41 keeps its clause on skipped tests.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: откуда оговорка о пропускаемом тесте\n",
  "- ✓ оговорка о пропускаемом тесте остаётся, обоснование её объяснит (ваше решение)\n- сейчас: второе предложение — цепочка implements\n", "outline");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
