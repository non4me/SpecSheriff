// Records that the owner accepted on 2026-11-20 the new wording of the first sentence of row 10.1.41, and applies the
// corrections that EngStickler's readers confirmed in batch 21 to the owner's rules for this repository and to the
// continuation file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const rulesPath = new URL("../../.claude/vt/rules.md", here);
let r = fs.readFileSync(rulesPath, "utf8");
r = swap(r, "**Code other than tests is named plainly.** A wording never says that something is bound to the system's code \"outside its tests\" («вне его тестов»). The system's code includes its tests. Where a rule needs the code that is not a test, it says so in plain words, such as \"code of the system other than tests\" («код системы помимо тестов»). An agreed node that uses the old phrase is brought into line when it changes for another reason.",
  "**Code other than tests is referred to in plain words.** Nothing the agent writes says that something is bound to the system's code \"outside its tests\" («вне его тестов»). The system's code includes its tests. Where a rule has to refer to code that is not a test, it names that code in plain words, such as \"code of the system other than tests\" («код системы помимо тестов»). An agreed node that uses the phrase \"outside its tests\" is reworded when it changes for another reason.", "rules");
fs.writeFileSync(rulesPath, r);

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "On 2026-11-20 the owner also corrected the first sentence: a wording never says that a rule is bound to the system's code \"outside its tests\" («вне его тестов»), since the system's code includes its tests (the rule \"Code other than tests is named plainly\" in .claude/vt/rules.md). The agent answered that the clause is not a tautology: it requires code that is not a test, so that a rule bound only to its test does not pass. The agent proposed the wording «привязано к тесту, не помеченному как пропускаемый, и к коду системы помимо тестов» (\"is bound to a test that is not marked as skipped and to code of the system other than tests\"). The agreed nodes 1.5.2 (s-kgbzk2ph9e6jfb4) and 9.2 (s-6fw72j65jkqrfpf) use the same phrase and are brought into line when they change for another reason.",
  "On 2026-11-20 the owner also corrected the first sentence: no wording may say that a rule is bound to the system's code \"outside its tests\" («вне его тестов»), since the system's code includes its tests (the rule \"Code other than tests is referred to in plain words\" in .claude/vt/rules.md). The agent answered that the clause is not a tautology: it requires code that is not a test, so that a rule bound only to its test does not pass this check. The owner accepted on 2026-11-20 («ок») the first sentence in this wording: «Одобренное правило, которое код системы должен реализовывать, привязано к тесту, не помеченному как пропускаемый, и к коду системы помимо тестов» (\"An approved rule that the system's code must implement is bound to a test that is not marked as skipped and to code of the system other than tests\"). The agreed nodes 1.5.2 (s-kgbzk2ph9e6jfb4) and 9.2 (s-6fw72j65jkqrfpf) use the phrase \"outside its tests\" and are reworded when they change for another reason. The second sentence is shown again in the row's whole new wording, whose acceptance covers it. The agent has put to the owner, for confirmation, what a failure of the check costs and which rules the row covers.", "first sentence");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "step-10-1-41-first-style.mjs records the owner's correction of the wording \"outside its tests\".",
  "step-10-1-41-first-style.mjs records the owner's correction of the wording \"outside its tests\", and step-10-1-41-first-agreed.mjs records the owner's acceptance of the reworded first sentence.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: первое предложение без «вне его тестов» (ваша поправка; записана в правила проекта)\n",
  "- ✓ первое предложение: «привязано к тесту, не помеченному как пропускаемый, и к коду системы помимо тестов» (принято)\n- сейчас: цена и какие правила охватывает строка\n", "outline");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
