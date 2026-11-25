// Records the owner's agreement to row 10.1.25a of the main table of checks and writes its English to
// english-10-1-25a.md for EngStickler's reader; applies the corrections confirmed in EngStickler's batch 9; proposes the
// new wording of node 10.5 (s-94k7b6r5kf65udf), under which a commit is refused without a readable answer from the
// reviewer whenever the reviewer must judge it, not only when it changes code; and brings the continuation file, the
// index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

// Row 10.1.25a: agreed.
const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.25a");
if (!r || r.agreed) throw new Error("row 10.1.25a is missing or already agreed");
r.agreed = "2026-11-20";
r.change += " Вы согласовали строку 20 ноября («ок»).";
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(new URL("english-10-1-25a.md", here), [
  "# Row 10.1.25a of the main table of checks", "", `What is checked: ${r.en}`, "", `On failure: ${r.cost}`, "", `Reason: ${r.reason}`, "",
].join("\n"));

// Node 10.5: the proposal.
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
const n = nf["10.5"];
if (n.sidValue !== "s-94k7b6r5kf65udf") throw new Error("10.5 is not s-94k7b6r5kf65udf");
if (n.proposals?.length) throw new Error("10.5 already holds a proposal");
const enText = swap(n.text, "The SpecSheriff tools refuse a commit that changes code unless",
  "The SpecSheriff tools refuse a commit on which the reviewer must make at least one judgement (§s-m4h279nbaqkpa3t) unless", "10.5 text");
const ruText = swap(n.ruText, "Инструменты SpecSheriff отклоняют коммит, меняющий код, если",
  "Инструменты SpecSheriff отклоняют коммит, по которому рецензент должен вынести хотя бы одно суждение (§s-m4h279nbaqkpa3t), если", "10.5 ruText");
fs.copyFileSync(nfPath, new URL("newform.before-propose-10-5.json", here));
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, ...n.examples.map(e => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...n.ruExamples.map(e => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "Следует из согласованных 1.6.1 и 10.2: ревью идёт не только при коммите, меняющем код. «коммит, меняющий код» → «коммит, по которому рецензент должен вынести хотя бы одно суждение», со ссылкой на перечень суждений в 1.6.1. Остальное без изменений.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the new row 10\.1\.25a[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the proposed new wording of node 10.5 (s-94k7b6r5kf65udf), held as the proposal in the draft of 10.5 in newform.json and written by propose-10-5.mjs. In the proposed wording, the SpecSheriff tools refuse a commit on which the reviewer must make at least one judgement, not only a commit that changes code, unless the reviewer gives an answer that the tools can read. Once the owner accepts the wording, accept-proposal.mjs writes it into the draft. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = swap(c, "An EngStickler reader agent read the English text of the row, kept in english-10-1-43a.md,", "An EngStickler reader agent read the English text of row 10.1.43a, kept in english-10-1-43a.md,", "43a reader");
c = swap(c, "Row 10.1.25a was proposed after the third item of the principle, the next item of this list, was settled, since the row's scope depends on that item.",
  "Row 10.1.25a was proposed after the third item in the principle's list of the reviewer's judgements, which is the next item of this list, was settled, since the row's scope depends on that item. The owner agreed to row 10.1.25a on 2026-11-20 («ок»); an EngStickler reader agent is reading its English text, kept in english-10-1-25a.md.", "25a");
c = swap(c, "kept only in the commit message. Row 10.1.25a has been proposed to the owner since then;\n", "kept only in the commit message;\n", "principle item");
c = c.replace(/^- node 10\.5, under which a commit that approves a node of the technical appendix and changes no code would go unreviewed;$/m, () =>
  "- node 10.5, under which a commit that approves a node of the technical appendix and changes no code would go unreviewed. Its new wording is proposed to the owner and waits for the owner's decision: the SpecSheriff tools refuse a commit on which the reviewer must make at least one judgement unless the reviewer gives an answer that the tools can read;");
fs.writeFileSync(contPath, c);
if (!c.includes("Its new wording is proposed to the owner and waits for the owner's decision: the SpecSheriff tools refuse a commit on which")) throw new Error("the item on node 10.5 was not found");

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "add-10-1-25a.mjs puts row 10.1.25a into table-10-1.json.",
  "add-10-1-25a.mjs puts row 10.1.25a into table-10-1.json. propose-10-5.mjs records the owner's agreement to that row and proposes the new wording of node 10.5.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ новая строка 10.1.25a основной таблицы проверок\n- одобренный в коммите узел приложения со связью implements уточняет реализуемые правила базы и не противоречит базе\n- группа «Только спецификация»: проверка не читает код; отклоняется всегда\n",
  "### ◐ новая формулировка 10.5 «Коммит, рецензию которого нельзя провести, отклоняется»\n- отклоняется любой коммит, по которому рецензент должен вынести суждение, а не только коммит с кодом\n", "outline waiting");
o = swap(o, "### ✓ третий пункт принципа о суждениях рецензента — согласован\n",
  "### ✓ строка 10.1.25a основной таблицы проверок — согласована\n- одобренный в коммите узел приложения со связью implements уточняет реализуемые правила базы и не противоречит базе\n\n### ✓ третий пункт принципа о суждениях рецензента — согласован\n", "outline done");
o = swap(o, "- ● строка 10.1.25a:", "- ✓ строка 10.1.25a:", "outline steps");
o = swap(o, "- ○ 10.5: ответ рецензента нужен и для коммита без кода\n", "- ● 10.5: ответ рецензента нужен и для коммита без кода\n", "outline steps");
fs.writeFileSync(outPath, o);
console.log(n.proposals[0].en);
