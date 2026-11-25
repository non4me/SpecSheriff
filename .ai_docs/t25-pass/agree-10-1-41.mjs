// Writes the wording of row 10.1.41 that the owner accepted on 2026-11-20 into the row of table-10-1.json, with its
// reason and example, and its English into english-10-1-41.md for EngStickler's reader. Teaches gen-table-10-1.mjs to
// show a row's examples. Applies the corrections that EngStickler's reader confirmed in batch 26, and brings the
// continuation file, the index and the outline of the queue map up to date: the next item is the owner's question
// whether checks of tests and code are needed while the specification is a draft.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

// The row.
const d = JSON.parse(fs.readFileSync(new URL("draft-10-1-41.json", here), "utf8")).proposed;
const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-agree-10-1-41.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
if (!r.proposals) throw new Error("row 10.1.41 holds no proposal");
r.was = `${r.en} | ${r.cost}`;
r.en = d.en; r.cost = d.cost; r.ru = d.ru; r.ruCost = d.ruCost;
r.reason = d.reason; r.ruReason = d.ruReason;
r.examples = [d.example]; r.ruExamples = [d.ruExample];
r.rests = [...new Set([...(r.rests || []), "s-sn6au3vcr9uy5pm", "s-hheus6f395ynqvc"])];
delete r.proposals;
r.agreed = "2026-11-20";
r.change += " Вы приняли новую формулировку строки 20 ноября («ок»): первое предложение — с «или как ожидаемо падающий» и без «вне его тестов»; второе — со связью implements, засчёт в одну сторону; охват — только правила, которые входят в коммит, списком; отклоняется, пока спецификация одобрена; проходит, пока черновик; обоснование объясняет оговорку о пропускаемом тесте; пример новый.";
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(new URL("english-10-1-41.md", here), [
  "# Row 10.1.41 of the main table of checks", "", `What is checked: ${r.en}`, "", `On failure: ${r.cost}`, "", `Example: ${d.example}`, "", `Reason: ${r.reason}`, "",
].join("\n"));

// The page builder: a row's examples.
const genPath = new URL("gen-table-10-1.mjs", here);
let g = fs.readFileSync(genPath, "utf8");
if (!g.includes("const rowExamples =")) {
  g = swap(g, "  const list = r.proposals ?? (r.proposal ? [r.proposal] : []);\n",
    "  const rowExamples = r.examples ? `<div class=\"pair\"><div><div class=\"lab\">EN · пример</div><p>${r.examples.map(code).join(\"<br>\")}</p></div><div><div class=\"lab\">RU · пример</div><p>${(r.ruExamples ?? []).map(code).join(\"<br>\")}</p></div></div>` : \"\";\n  const list = r.proposals ?? (r.proposal ? [r.proposal] : []);\n", "gen");
  g = swap(g, "      ${proposal}\n      ${reason}\n", "      ${proposal}\n      ${rowExamples}\n      ${reason}\n", "gen");
  fs.writeFileSync(genPath, g);
}

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session continues with\*\* row 10\.1\.41[^\n]*/m, () =>
  "**The next session starts by** answering the owner's question of 2026-11-20 whether any check of tests and code is needed while the specification is a draft. The agent's answer, put to the owner on 2026-11-20, is in the paragraph that opens \"On 2026-11-20 the owner raised a question\" below. After it come, one at a time, the follow-ups that the rule reviewer found for row 10.1.41, listed in the paragraph that opens \"Follow-ups that the rule reviewer found\".\n\nThe owner accepted the new wording of row 10.1.41 of the main table of checks on 2026-11-20 («ок»), after going through the row sentence by sentence. agree-10-1-41.mjs wrote it into the row in table-10-1.json, with its reason and its example, and an EngStickler reader agent is reading its English, kept in english-10-1-41.md. The owner's rulings on the row: the clause on skipped tests stays and the reason explains it; no wording says \"outside its tests\"; the second sentence names the `implements` link, since a rule implements nothing, and counts in one direction only; the check applies only to the approved rules that a commit includes; a failure is refused while the specification is approved and passes while it is a draft.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "Follow-ups the rule reviewer found for after row 10.1.41, one at a time: node 10.6 (s-qzthyh7yqvfhsa2) shows the owner, before the specification is approved, reports such as \"an approved rule that has no code\", which no check now issues for rules outside a commit, so the approval procedure is to run this check over every approved rule;",
  "Follow-ups that the rule reviewer found and that are to be taken up after row 10.1.41, one at a time: node 10.6 (s-qzthyh7yqvfhsa2) says that, before the specification is approved, the owner is shown reports such as \"an approved rule that has no code\"; no check now issues such a report for rules outside a commit, so the agent will propose that the approval procedure run the check of row 10.1.41 over every approved rule;", "follow-ups");
c = swap(c, "the definition of counting code and tests through a chain of `implements` links is stated in 9.2, in row 10.1.41 and partly in 10.4 and 10.1.43a, and is to get one home, in 1.5.2 (s-kgbzk2ph9e6jfb4);",
  "the definition of how code and tests are counted through a chain of `implements` links is stated in 9.2 and in row 10.1.41, and in part in 10.4 and in 10.1.43a; it is to be moved to one place, 1.5.2 (s-kgbzk2ph9e6jfb4);", "follow-ups");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and propose-10-1-41.mjs proposes it to the owner.",
  "and propose-10-1-41.mjs proposes it to the owner; agree-10-1-41.mjs writes the accepted wording into the row and teaches gen-table-10-1.mjs to show a row's examples.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = o.replace(/### ◐ строка 10\.1\.41 — разбор по предложениям\n(?:- [^\n]*\n)+/, () =>
  "### ◐ нужны ли проверки тестов и кода, пока спецификация — черновик (ваш вопрос)\n- проверки привязки кода к правилам — нужны: код для одобренных правил пишется и в черновике\n- проверки полноты и отставания — не нужны: предлагаю, чтобы 10.1.40 и 10.1.43a в черновике проходили, как 10.1.41\n");
o = swap(o, "### ✓ строка 10.1.25a основной таблицы проверок — согласована\n",
  "### ✓ строка 10.1.41 — согласована после разбора по предложениям\n- привязано к тесту, не помеченному как пропускаемый или ожидаемо падающий, и к коду системы помимо тестов\n- засчёт через связь implements — в одну сторону\n- только правила, которые входят в коммит; отклоняется, пока спецификация одобрена; в черновике проходит\n\n### ✓ строка 10.1.25a основной таблицы проверок — согласована\n", "outline done");
o = swap(o, "- ● строка 10.1.41: смысл, затем новая формулировка\n", "- ✓ строка 10.1.41\n- ● проверки тестов и кода в черновике (ваш вопрос)\n- ○ 10.6, 9.2, одно место для засчёта по цепочке implements (1.5.2)\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log("row 10.1.41 agreed at", now);
