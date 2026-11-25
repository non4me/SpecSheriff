// Writes into the continuation file, the queue outline and the index the state reached once row 12.12.6 was agreed,
// with row 12.12.8 presented to the owner next, and applies the corrections EngStickler's readers confirmed in batch 7.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (s, pairs, where) => {
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  return s;
};

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 14:25 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 14:30 UTC):** row 12.12.8 is being presented to the owner.",
  "The owner agreed to row 12.12.5 on 2026-11-19, in the wording \"A RecordType variant has a `refines` link to the RecordType whose fields it extends\".",
  "The owner then agreed to row 12.12.6 in the wording \"A RecordType variant is declared in the same section of the base specification as its RecordType\". The row no longer rests on 1.32, \"Where a value is declared\".",
  "The approved row 12.12.8 holds two requirements, each of which can be met without the other, so the proposal splits it into two rows, as rows 12.12.2 and 12.12.3 were split.",
  "The first row says that a RecordType variant names values only of the fields that select a variant of its RecordType, one value for each of them.",
  "The second row, a new one after 12.12.8, says that each value that a RecordType variant names for a field is in the `enum` of that field.",
].join(" ") + s.slice(end);
s = fix(s, [
  ["Done to put this ruling into effect:", "To put this ruling into effect, the following was done:"],
  ["contains the English text of 12.6, of rows 12.12.7 and the new row, and of the changed item of 12.2.", "contains the English text of 12.6, of row 12.12.7, of the new row after it and of the changed item of 12.2."],
  ["The owner's ruling of 2026-10-26 already uses the names that JSON Schema gives to the bounds of a field.", "The owner's ruling of 2026-10-26 uses the names that JSON Schema gives to the bounds of a field."],
  ["- Node tools/7.1.16 states that a variant is declared in the same section as its RecordType, in place of the part that declares its value (row 12.12.6).", "- Node tools/7.1.16 states that a RecordType variant is declared in the same section as its RecordType, instead of in the part that declares its value (row 12.12.6)."],
  ["Rows 12.12.8 to 12.12.16 come after 12.12.6 and are agreed one at a time. Three of them already need changes:", "Rows 12.12.9 to 12.12.16 come after 12.12.8 and are agreed one at a time. Three of them already need changes:"],
], "continuation");
fs.writeFileSync(cont, s);

const outFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(outFile, "utf8");
o = fix(o, [
  ["- ● 12.12.6: вариант объявлен в том же разделе базовой спецификации, что и его RecordType\n", "- ✓ 12.12.6: вариант объявлен в том же разделе базовой спецификации, что и его RecordType\n- ● 12.12.8: делится на две строки — значения только выбирающих полей; каждое значение есть в `enum` поля\n"],
  ["- ○ 12.12.8–12.12.9: значения варианта, неповтор значений\n", "- ○ 12.12.9: никакие два варианта не соответствуют одним и тем же значениям\n"],
  ["### ◐ строка 12.12.6 — спрашиваю сейчас\n- одобренная: «Вариант RecordType стоит в той части спецификации, которая объявляет значение, на которое он отвечает»\n- предлагаю: «Вариант RecordType объявлен в том же разделе базовой спецификации, что и его RecordType»\n", "### ◐ строка 12.12.8 — спрашиваю сейчас\n- одобренная: два требования в одной строке\n- предлагаю две строки: значения только выбирающих полей, по одному на поле; каждое значение есть в `enum` поля\n"],
], "outline");
fs.writeFileSync(outFile, o);

const idxFile = docs + "INDEX.md";
let x = fs.readFileSync(idxFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [
  ["fix-12-6-english.mjs corrects the English text of the agreed 12.6 after", "fix-12-6-english.mjs corrects the English text of 12.6, as agreed, after"],
  ["step-12-12-6.mjs writes the state after row 12.12.5 was agreed into the continuation file, the queue outline and this index.", "step-12-12-6.mjs and state-12-12-8.mjs write into the continuation file, the queue outline and this index the state reached once rows 12.12.5 and 12.12.6 were agreed. step-12-12-8.mjs records row 12.12.6 as agreed and proposes splitting row 12.12.8 into two rows."],
], "index");
fs.writeFileSync(idxFile, x);
console.log("ok", ts);
