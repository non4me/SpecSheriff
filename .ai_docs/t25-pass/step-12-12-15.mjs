// Records row 12.12.14 as agreed in its approved wording and writes the state reached, with row 12.12.15 presented to
// the owner next, applying the corrections EngStickler's readers confirmed in batch 12.
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
const r14 = rows.find((x) => x.num === "12.12.14");
r14.agreed = "2026-11-19";
r14.change += " Вы согласовали её 19 ноября («ок») в одобренной формулировке.";
const r15 = rows.find((x) => x.num === "12.12.15");
r15.about = "Затрагивает каждое поле, значения которого приходят из других мест спецификации. Значение, исправленное вручную или оставшееся после того, как его узел убран, пропустил бы сгенерированный RuntimeCheck.";
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 15:35 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 15:45 UTC):** row 12.12.15 is being presented to the owner.",
  "The agent proposes keeping the approved wording of the row.",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6, 12.12.8, 12.12.9, 12.12.10, 12.12.11 and 12.12.14, and to a new row after 12.12.8.",
  "Row 12.12.8 was split into two rows, just as one approved row was split earlier into rows 12.12.2 and 12.12.3.",
  "Row 12.12.9 now says that each variant of one RecordType corresponds to its own combination of values.",
  "Rows 12.12.10, 12.12.11 and 12.12.14 keep their approved wording; rows 12.12.10 and 12.12.11 have only the mechanical change from \"a field of type `one of`\" to \"a field with `enum`\".",
  "Row 12.12.10 now rests on 12.7 alone, since 1.32 was not carried over into the new structure of the base specification.",
  "Rows 12.12.12 and 12.12.13 were removed without asking the owner. They checked values from a source that the owner removed from 12.7 on 2026-11-16: the values that the domains add.",
].join(" ") + s.slice(end);
s = fix(s, [["Rows 12.12.15 and 12.12.16 come after 12.12.14 and are agreed one at a time.", "Row 12.12.16 comes after 12.12.15."]], "continuation");
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 12.12.14: поле со значениями из sid узлов собственного типа называет существующий тип — оставить как есть\n", "- ✓ 12.12.14: поле со значениями из sid узлов собственного типа называет существующий тип — оставлена как есть\n- ● 12.12.15: собранные значения — те, что даёт их источник — оставить как есть\n"],
  ["### ◐ строка 12.12.14 — спрашиваю сейчас\n- предлагаю оставить как есть: «Поле, значения которого — sid узлов собственного типа в проекте, называет существующий тип»\n", "### ◐ строка 12.12.15 — спрашиваю сейчас\n- предлагаю оставить как есть: «Значения, собранные рядом с полем, — те, что даёт их источник»\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["which checked the values that the domains add.", "which checked the values that the domains add to the `enum` of a field. step-12-12-15.mjs records row 12.12.14 as agreed."]], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
