// Records the owner's stylistic correction of 2026-11-20 to the first sentence of row 10.1.41 (never "outside its
// tests"), the agent's answer, and the agreed nodes that use the same phrase; applies the corrections that EngStickler's
// reader confirmed in batch 20.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "The agent recommended keeping only one direction:", "The agent recommended counting in one direction only:", "b20");
c = swap(c, "would leave nothing to show which code carries out the technical details,", "would leave nothing to show which code implements the technical details,", "b20");
c = swap(c, "The owner's decision on this wording is awaited.",
  "The owner's decision on this wording is awaited. On 2026-11-20 the owner also corrected the first sentence: a wording never says that a rule is bound to the system's code \"outside its tests\" («вне его тестов»), since the system's code includes its tests (the rule \"Code other than tests is named plainly\" in .claude/vt/rules.md). The agent answered that the clause is not a tautology: it requires code that is not a test, so that a rule bound only to its test does not pass. The agent proposed the wording «привязано к тесту, не помеченному как пропускаемый, и к коду системы помимо тестов» (\"is bound to a test that is not marked as skipped and to code of the system other than tests\"). The agreed nodes 1.5.2 (s-kgbzk2ph9e6jfb4) and 9.2 (s-6fw72j65jkqrfpf) use the same phrase and are brought into line when they change for another reason.", "first sentence");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "step-10-1-41-second.mjs records the owner's objection",
  "step-10-1-41-first-style.mjs records the owner's correction of the wording \"outside its tests\". step-10-1-41-second.mjs records the owner's objection", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: второе предложение — правило ничего не реализует; называем связь implements; засчитывается в одну сторону\n",
  "- второе предложение: правило ничего не реализует; называем связь implements; засчитывается в одну сторону\n- сейчас: первое предложение без «вне его тестов» (ваша поправка; записана в правила проекта)\n", "outline");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
