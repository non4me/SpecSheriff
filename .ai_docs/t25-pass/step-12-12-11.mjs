// Records row 12.12.10 as agreed in its approved wording, corrects the English of row 12.12.9 after EngStickler's
// reader, and writes the state reached, with row 12.12.11 presented to the owner next.
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
r9.en = "Each variant of one RecordType corresponds to its own combination of values";
const r10 = rows.find((x) => x.num === "12.12.10");
r10.agreed = "2026-11-19";
r10.change += " Вы согласовали её 19 ноября («ок») в одобренной формулировке, с механической заменой «поля типа `one of`» на «поле с `enum`». Строка опирается теперь только на 12.7.";
const r11 = rows.find((x) => x.num === "12.12.11");
r11.about = "Затрагивает каждое поле с `enum`. Пустому `enum` в JSON Schema не соответствует ни одно значение, поэтому ни одна запись данных с таким полем не была бы верной.";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 14:40 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 15:25 UTC):** row 12.12.11 is being presented to the owner.",
  "The agent proposes keeping its approved wording, with the mechanical change from \"a field of type `one of`\" to \"a field with `enum`\".",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6, 12.12.8, 12.12.9 and 12.12.10, and to a new row after 12.12.8.",
  "Row 12.12.8 was split into two rows, just as one approved row was split earlier into rows 12.12.2 and 12.12.3.",
  "Row 12.12.9 now says that each variant of one RecordType corresponds to its own combination of values.",
  "Row 12.12.10 keeps its approved wording and now rests on 12.7 alone, since 1.32 has no draft in the new form of the base specification.",
].join(" ") + s.slice(end);
s = fix(s, [["Rows 12.12.11 to 12.12.16 come after 12.12.10 and are agreed one at a time.", "Rows 12.12.12 to 12.12.16 come after 12.12.11 and are agreed one at a time."]], "continuation");
fs.writeFileSync(cont, s);

const outFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(outFile, "utf8");
o = fix(o, [
  ["- ● 12.12.10: каждое значение поля с `enum` объявлено один раз — оставить как есть\n", "- ✓ 12.12.10: каждое значение поля с `enum` объявлено один раз — оставлена как есть\n- ● 12.12.11: каждое поле с `enum` содержит хотя бы одно значение — оставить как есть\n"],
  ["### ◐ строка 12.12.10 — спрашиваю сейчас\n- предлагаю оставить как есть: «Каждое значение поля с `enum` объявлено один раз, не считая значений, собранных рядом с ним»\n", "### ◐ строка 12.12.11 — спрашиваю сейчас\n- предлагаю оставить как есть: «Каждое поле с `enum` содержит хотя бы одно значение из своего источника»\n"],
], "outline");
fs.writeFileSync(outFile, o);

const idxFile = docs + "INDEX.md";
let x = fs.readFileSync(idxFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["makes row 12.12.10 rest on 12.7 alone.", "makes row 12.12.10 rest on 12.7 alone. step-12-12-11.mjs records row 12.12.10 as agreed."]], "index");
fs.writeFileSync(idxFile, x);
console.log("ok", ts);
