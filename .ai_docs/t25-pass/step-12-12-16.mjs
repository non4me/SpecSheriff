// Records row 12.12.15 as agreed in its approved wording; proposes row 12.12.16 anew from the agreed 12.10, split into
// two rows, one requirement each; and writes the state reached, applying the corrections EngStickler's readers
// confirmed in batch 13.
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
const S1210 = "s-8ht2hn88cu2qwz9";

const tFile = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const rows = t.tables[0].rows;
const r15 = rows.find((x) => x.num === "12.12.15");
r15.agreed = "2026-11-19";
r15.change += " Вы согласовали её 19 ноября («ок») в одобренной формулировке.";
const r16 = rows.find((x) => x.num === "12.12.16");
r16.rests = [S1210];
r16.about = "Затрагивает каждый RecordType, который ссылается на другой RecordType в типах своих полей или через `refines`.";
r16.proposals = [{
  en: "In the types of its fields and through `refines`, a RecordType refers only to the RecordTypes of the part of the system that outputs its data and to fragments of a format declared in the contracts section",
  ru: "В типах своих полей и через `refines` RecordType ссылается только на RecordType той части системы, которая выдаёт его данные, и на фрагменты формата, объявленные в контрактах",
  why: "Одобренная строка проверяла связи `consumes` в заголовке домена, а это правило расширения «Домены». По вашему решению от 16 ноября правила расширения RecordType доменов не называют, и согласованный 12.10 говорит, на что может ссылаться RecordType. Строка проверяет первое предложение 12.10, следующая — второе.",
}];
rows.splice(rows.indexOf(r16) + 1, 0, {
  n: 26.5,
  num: null,
  was: "",
  en: "",
  cost: r16.cost,
  ru: "",
  ruCost: r16.ruCost,
  fate: "new",
  change: "Новая строка: проверяет второе предложение согласованного 12.10.",
  rests: [S1210],
  about: "Затрагивает каждый фрагмент формата в контрактах. Фрагмент не выдаёт данные никакая одна часть системы, поэтому первое предложение 12.10 к нему не применить.",
  proposals: [{
    en: "A fragment of a format refers only to other fragments of a format",
    ru: "Фрагмент формата ссылается только на другие фрагменты формата",
    why: "Второе предложение 12.10, отдельной строкой: оно выполнимо без первого.",
  }],
});
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 15:45 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 15:50 UTC):** row 12.12.16, the last row of table 12.12, is being presented to the owner.",
  "The approved row checked the `consumes` links of a domain's header, which belong to the Domains extension.",
  "The proposal checks the agreed 12.10 instead, in two rows: what a RecordType refers to, and that a fragment of a format refers only to other fragments.",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6, 12.12.8 to 12.12.11, 12.12.14 and 12.12.15, and to a new row after 12.12.8.",
  "Row 12.12.8 was split into two rows, just as one approved row was split earlier into rows 12.12.2 and 12.12.3.",
  "Row 12.12.9 now says that each variant of one RecordType corresponds to its own combination of values.",
  "Rows 12.12.10, 12.12.11, 12.12.14 and 12.12.15 keep their approved wording; rows 12.12.10 and 12.12.11 have only the mechanical change from \"a field of type `one of`\" to \"a field with `enum`\".",
  "Row 12.12.10 now rests on 12.7 alone, since 1.32 was not carried over into the new structure of the base specification.",
  "The agent removed rows 12.12.12 and 12.12.13 without asking the owner. They checked values from a source that the owner removed from 12.7 on 2026-11-16, namely the values that the domains add to the `enum` of a field.",
  "Once every row is agreed, the rows are numbered again in table order, which is a mechanical change.",
].join(" ") + s.slice(end);
s = fix(s, [["Row 12.12.16 comes after 12.12.15. One of them already needs a change:\n- row 12.12.16 mentions domains, while 12.10 now states, without mentioning domains, what a RecordType may refer to.", "After table 12.12, the row for 11.1.2 (one section per document) comes next."]], "continuation");
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 12.12.15: собранные значения — те, что даёт их источник — оставить как есть\n", "- ✓ 12.12.15: собранные значения — те, что даёт их источник — оставлена как есть\n- ● 12.12.16 по 12.10: на что ссылается RecordType; фрагмент формата ссылается только на фрагменты\n"],
  ["- ○ 12.12.16 называет домены; на что может ссылаться RecordType, теперь говорит 12.10\n", "- ○ после согласования всех строк — перенумеровать таблицу 12.12 (механически)\n"],
  ["### ◐ строка 12.12.15 — спрашиваю сейчас\n- предлагаю оставить как есть: «Значения, собранные рядом с полем, — те, что даёт их источник»\n", "### ◐ строка 12.12.16 — спрашиваю сейчас\n- одобренная проверяла связи `consumes` доменов — это правило расширения «Домены»\n- предлагаю две строки по согласованному 12.10\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["step-12-12-15.mjs records row 12.12.14 as agreed.", "step-12-12-15.mjs records row 12.12.14 as agreed. step-12-12-16.mjs records row 12.12.15 as agreed and proposes row 12.12.16 anew from 12.10, split into two rows."]], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
