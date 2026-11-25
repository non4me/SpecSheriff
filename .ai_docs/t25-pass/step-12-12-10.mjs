// Records row 12.12.9 as agreed and makes row 12.12.10 rest on 12.7 alone, since 1.32 has no draft in the new form;
// writes the state reached into the continuation file, the queue outline and the index, with the corrections
// EngStickler's readers confirmed in batch 9.
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

const file = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
const r9 = rows.find((x) => x.num === "12.12.9");
r9.en = "The variants of one RecordType each correspond to a different combination of values";
r9.ru = r9.proposals[0].ru;
delete r9.proposals;
r9.agreed = "2026-11-19";
r9.change += " Вы согласовали её 19 ноября («ок»): утверждение вместо отрицания; «отвечают на значения» заменено на «соответствуют сочетаниям значений», как в 12.6.";
const r10 = rows.find((x) => x.num === "12.12.10");
r10.rests = ["s-xfu2gpzddjnmgks"];
r10.about = "Затрагивает каждое поле с `enum`. Каждое значение записывается вместе с узлом, из которого оно приходит (12.9); значение, объявленное дважды, пришло бы из двух узлов.";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 14:35 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 14:40 UTC):** row 12.12.10 is being presented to the owner.",
  "The agent proposes keeping its approved wording, with the mechanical change of \"a field of type `one of`\" to \"a field with `enum`\".",
  "The row now rests on 12.7 alone, since 1.32 has no draft in the new form.",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6, 12.12.8 and 12.12.9, and to a new row after 12.12.8.",
  "Row 12.12.8 was split into two rows, just as one approved row had been split earlier into rows 12.12.2 and 12.12.3.",
  "Row 12.12.8 now says that a RecordType variant names values only for the fields that select a variant of its RecordType, one value for each of them.",
  "The new row after it says that each value that a RecordType variant names for a field is one of the values in the `enum` of that field.",
  "Row 12.12.9 now says that the variants of one RecordType each correspond to a different combination of values.",
].join(" ") + s.slice(end);
s = fix(s, [["Rows 12.12.10 to 12.12.16 come after 12.12.9 and are agreed one at a time.", "Rows 12.12.11 to 12.12.16 come after 12.12.10 and are agreed one at a time."]], "continuation");
fs.writeFileSync(cont, s);

const outFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(outFile, "utf8");
o = fix(o, [
  ["- ● 12.12.9: варианты одного RecordType соответствуют разным сочетаниям значений\n", "- ✓ 12.12.9: варианты одного RecordType соответствуют разным сочетаниям значений\n- ● 12.12.10: каждое значение поля с `enum` объявлено один раз — оставить как есть\n"],
  ["### ◐ строка 12.12.9 — спрашиваю сейчас\n- одобренная: «Никакие два варианта одного RecordType не отвечают на одни и те же значения»\n- предлагаю: «Варианты одного RecordType соответствуют разным сочетаниям значений»\n", "### ◐ строка 12.12.10 — спрашиваю сейчас\n- предлагаю оставить как есть: «Каждое значение поля с `enum` объявлено один раз, не считая значений, собранных рядом с ним»\n"],
], "outline");
fs.writeFileSync(outFile, o);

const idxFile = docs + "INDEX.md";
let x = fs.readFileSync(idxFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["proposes a positive wording for row 12.12.9.", "proposes a positive wording for row 12.12.9. step-12-12-10.mjs records row 12.12.9 as agreed and makes row 12.12.10 rest on 12.7 alone."]], "index");
fs.writeFileSync(idxFile, x);
console.log("ok", ts);
