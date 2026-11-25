// Records that the owner confirmed on 2026-11-20 what a failure of row 10.1.41 costs and which rules the row covers, and
// the owner's doubt, raised the same day, whether any check of tests and code is worth running while the specification
// is a draft. Applies the corrections that EngStickler's reader confirmed in batch 22.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "use the phrase \"outside its tests\" and are reworded when they change for another reason. The second sentence is shown again in the row's whole new wording, whose acceptance covers it. The agent has put to the owner, for confirmation, what a failure of the check costs and which rules the row covers.",
  "use the phrase \"outside its tests\" and will be reworded when they are changed for another reason. The second sentence is shown again in the new wording of the whole row, whose acceptance covers it. The owner confirmed on 2026-11-20 («Да, все так») what a failure of the check costs and which rules the row covers: while the specification is approved, a commit is refused, naming the rule, if it includes an approved rule that the system's code must implement and that rule is not bound to a test not marked as skipped and to code of the system other than tests; a commit includes a rule when it changes the rule's wording, adds its approval, or changes its tests or the code bound to it, including through a node with an `implements` link; rules outside the commit are not read; while the specification is a draft, nothing is reported. The agent drafted the new wording of the whole row in draft-10-1-41.json and gave it to the rule reviewer; it shows the row to the owner once the reviewer has reported.\n\nThe owner added on 2026-11-20 a doubt to take up once row 10.1.41 is settled: whether any check of tests and code is worth running while the specification is a draft («по большому счету это вроде как избыточная операция»). The checks of the group \"The specification and the code\" fall into two kinds. The checks that bind each piece of code that a commit adds or changes to an approved rule (10.1.26, 10.1.26a, 10.1.28, 10.1.28a, 10.1.31, 10.1.42, 10.1.43) keep the code traceable while the code for approved rules is written, which the owner's description of 2026-11-19 places in the draft phase too. The checks of completeness and lag (10.1.40, 10.1.41, 10.1.43a, 10.1.44) are the ones a draft can do without; 10.1.40 and 10.1.43a still report a lag while the specification is a draft.", "scope");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and step-10-1-41-first-agreed.mjs records the owner's acceptance of the reworded first sentence.",
  "and step-10-1-41-first-agreed.mjs records the owner's acceptance of the reworded first sentence of row 10.1.41. step-10-1-41-scope-agreed.mjs records the owner's confirmation of that row's cost and scope; draft-10-1-41.json holds the row's new wording, as the rule reviewer checks it.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: цена и какие правила охватывает строка\n",
  "- ✓ цена и охват: отклоняется, пока спецификация одобрена; читаются только правила из коммита; в черновике — ничего (подтверждено)\n- сейчас: строка целиком у рецензента правил\n- ○ затем: нужны ли в черновике вообще проверки тестов и кода (ваш вопрос)\n", "outline");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
