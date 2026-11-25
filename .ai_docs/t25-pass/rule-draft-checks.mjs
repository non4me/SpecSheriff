// Carries out the owner's decision of 2026-11-20 on the checks of code and tests while the specification is a draft:
// the checks that bind new code and tests to rules still run, and every check of whether the implementation is complete
// stays silent. Rows 10.1.40 and 10.1.43a, which still reported while the specification was a draft, now pass then, in
// the words that the agreed row 10.1.41 uses; 10.1.40's reason follows. Applies the corrections that EngStickler's reader
// confirmed in batch 28, and brings the continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-draft-checks.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const rows = t.tables.flatMap(g => g.rows);
const note = " 20 ноября вы решили: пока спецификация — черновик, проверки связи нового кода с правилами работают, а все проверки законченности молчат. Поэтому в черновике строка теперь проходит, а не сообщает, теми же словами, что согласованная 10.1.41.";
for (const num of ["10.1.40", "10.1.43a"]) {
  const r = rows.find(x => x.num === num);
  r.cost = swap(r.cost, "; reported, naming the rule, while it is a draft", "; passes while it is a draft", `${num} cost`);
  r.ruCost = swap(r.ruCost, "; сообщается с названием правила, пока она черновик", "; проходит, пока она черновик", `${num} ruCost`);
  r.change += note;
}
const r40 = rows.find(x => x.num === "10.1.40");
r40.reason = swap(r40.reason, "so a rule whose tests and code lag behind its wording is only reported.", "so a rule whose tests and code lag behind its wording passes.", "40 reason");
r40.ruReason = swap(r40.ruReason, "поэтому о правиле, тесты и код которого отстают от его формулировки, только сообщается.", "поэтому правило, тесты и код которого отстают от его формулировки, проходит проверку.", "40 ruReason");
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the agent's answer to the owner's question[^\n]*/m, () =>
  "**The next session starts by** proposing to the owner the new wording of node 10.6 (s-qzthyh7yqvfhsa2), the first of the follow-ups that the rule reviewer found for row 10.1.41, listed in the paragraph that begins \"Follow-ups that the rule reviewer found\". Its draft is in draft-10-6.json and goes to the rule reviewer before it is shown.\n\nOn 2026-11-20 the owner decided («ок»), in answer to the owner's own question of whether any check of tests and code is needed while the specification is a draft: the checks that require new code and tests to be bound to rules still run while the specification is a draft, since the code that implements approved rules is also written then; every check of whether the implementation is complete stays silent while the specification is a draft. rule-draft-checks.mjs carried this out in rows 10.1.40 and 10.1.43a, which now pass while the specification is a draft, in the words of the agreed row 10.1.41, and in the reason of 10.1.40. This reverses the owner's ruling of 2026-11-19 that row 10.1.40 reports while the specification is a draft.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "and fix-english-10-1-41-b27.mjs corrected the phrases that the reader had found, without changing the meaning.", "and fix-english-10-1-41-b27.mjs corrected the phrases that the reader had flagged, without changing their meaning.", "b28");
c = swap(c, "the clause on skipped tests stays and the reason explains it; no wording says \"outside its tests\";", "the clause on skipped tests stays in the row and the reason explains it; no wording contains the phrase \"outside its tests\";", "b28");
c = swap(c, "a commit that fails the check is refused while the specification is approved, and passes while the specification is a draft.", "a commit that fails the check is refused while the specification is approved, and is accepted while the specification is a draft.", "b28");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-english-10-1-41-b27.mjs corrects the English of that row.", "fix-english-10-1-41-b27.mjs corrects the English of that row. rule-draft-checks.mjs carries out the owner's decision that the checks of whether the implementation is complete stay silent while the specification is a draft.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = o.replace(/### ◐ нужны ли проверки тестов и кода, пока спецификация — черновик \(ваш вопрос\)\n(?:- [^\n]*\n)+/, () =>
  "### ◐ 10.6 «Статус одобрения спецификации»\n- перед одобрением спецификации процедура показывает, что найдут проверки во всей спецификации и во всём коде\n- черновик формулировки — у рецензента правил\n");
o = swap(o, "### ✓ строка 10.1.41 — согласована после разбора по предложениям\n",
  "### ✓ проверки кода и тестов в черновике спецификации (ваше решение)\n- связь нового кода с правилами проверяется и в черновике\n- проверки законченности в черновике молчат все: 10.1.40 и 10.1.43a теперь проходят\n\n### ✓ строка 10.1.41 — согласована после разбора по предложениям\n", "outline done");
o = swap(o, "- ● проверки тестов и кода в черновике (ваш вопрос)\n- ○ 10.6, 9.2, одно место для засчёта по цепочке implements (1.5.2)\n",
  "- ✓ проверки тестов и кода в черновике (ваш вопрос)\n- ● 10.6: что показывают перед одобрением спецификации\n- ○ 9.2; одно место для засчёта по цепочке implements (1.5.2)\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("carried out at", now);
