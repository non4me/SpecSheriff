// Records row 12.12.11 as agreed; removes rows 12.12.12 and 12.12.13, which check the values the domains add, a source
// the agreed 12.7 no longer has (the owner's decision of 2026-11-16); renames the field type in the list of 12.7,
// which the mechanical renaming missed; and writes the state reached, with row 12.12.14 presented to the owner next.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (s, pairs, where) => {
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  return s;
};

const tFile = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const rows = t.tables[0].rows;
const row = (num) => rows.find((x) => x.num === num);
const r11 = row("12.12.11");
r11.agreed = "2026-11-19";
r11.change += " Вы согласовали её 19 ноября в одобренной формулировке, с механической заменой «поля типа `one of`» на «поле с `enum`».";
for (const num of ["12.12.12", "12.12.13"]) {
  const r = row(num);
  r.fate = "deleted";
  r.en = "";
  r.ru = "";
  r.num = null;
  r.agreed = "2026-11-19";
  r.change = "Удаляется. Строка проверяла значения, которые добавляют домены. По вашему решению от 16 ноября этого источника в согласованном 12.7 больше нет: в контрактах лежат только фрагменты формата, и RecordType, который собирает значения разных доменов, больше не бывает.";
}
const r14 = row("12.12.14");
r14.about = "Затрагивает каждое поле, значения которого — sid узлов одного собственного типа проекта. Из узлов несуществующего типа инструментам SpecSheriff нечего собрать в `enum` поля.";
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
const n7 = nf["12.7"];
n7.list.of = fix(n7.list.of, [["the values of a field of type one of come from", "the values of a field with `enum` come from"]], "12.7 list");
n7.ruList.of = fix(n7.ruList.of, [["значения поля типа `one of`", "значения поля с `enum`"]], "12.7 ruList");
n7.changes.push("Та же механическая замена в названии списка источников: «поле типа `one of`» стало «полем с `enum`».");
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 15:25 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 15:35 UTC):** row 12.12.14 is being presented to the owner.",
  "The agent proposes keeping the approved wording of the row.",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6, 12.12.8, 12.12.9, 12.12.10 and 12.12.11, and to a new row after 12.12.8.",
  "Row 12.12.8 was split into two rows, just as one approved row was split earlier into rows 12.12.2 and 12.12.3.",
  "Row 12.12.9 now says that each variant of one RecordType corresponds to its own combination of values.",
  "Rows 12.12.10 and 12.12.11 keep their approved wording, with only the mechanical change from \"a field of type `one of`\" to \"a field with `enum`\".",
  "Row 12.12.10 now rests on 12.7 alone, since 1.32 was not carried into the new form of the base specification.",
  "Rows 12.12.12 and 12.12.13 were removed without a question: they checked the values that the domains add, a source that the owner removed from 12.7 on 2026-11-16.",
].join(" ") + s.slice(end);
s = fix(s, [
  ["Rows 12.12.12 and 12.12.13 keep \"a field of type `one of`\". They are expected to be removed when their turn comes.\n\n", ""],
  ["Rows 12.12.12 to 12.12.16 come after 12.12.11 and are agreed one at a time. Three of them already need changes:\n- rows 12.12.12 and 12.12.13 check the values that domains add, which no agreed rule requires any longer;\n- row 12.12.16", "Rows 12.12.15 and 12.12.16 come after 12.12.14 and are agreed one at a time. One of them already needs a change:\n- row 12.12.16"],
], "continuation");
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 12.12.11: каждое поле с `enum` содержит хотя бы одно значение — оставить как есть\n", "- ✓ 12.12.11: каждое поле с `enum` содержит хотя бы одно значение — оставлена как есть\n- ✓ 12.12.12 и 12.12.13 убраны: источника «значения, которые добавляют домены» в 12.7 больше нет\n- ● 12.12.14: поле со значениями из sid узлов собственного типа называет существующий тип — оставить как есть\n"],
  ["- ○ 12.12.12 и 12.12.13 проверяют значения, которые добавляли домены, — правила этого больше не требуют\n", ""],
  ["### ◐ строка 12.12.11 — спрашиваю сейчас\n- предлагаю оставить как есть: «Каждое поле с `enum` содержит хотя бы одно значение из своего источника»\n", "### ◐ строка 12.12.14 — спрашиваю сейчас\n- предлагаю оставить как есть: «Поле, значения которого — sid узлов собственного типа в проекте, называет существующий тип»\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["step-12-12-11.mjs records row 12.12.10 as agreed.", "step-12-12-11.mjs records row 12.12.10 as agreed. step-12-12-14.mjs records row 12.12.11 as agreed and removes rows 12.12.12 and 12.12.13, which checked the values that the domains add."]], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
