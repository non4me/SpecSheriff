// Writes the state after row 12.12.5 was agreed into the continuation file, the queue outline and the index, with
// row 12.12.6 put to the owner next.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const now = fs.readFileSync(process.argv[2], "utf8").replace(/\n$/, "");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 14:15 UTC):**");
const endMark = "- row 12.12.16 mentions domains, while 12.10 now states, without mentioning domains, what a RecordType may refer to.";
const end = s.indexOf(endMark, start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + now + s.slice(end + endMark.length);
fs.writeFileSync(cont, s);

const outFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(outFile, "utf8");
const rep = (a, b) => {
  if (!o.includes(a)) throw new Error(`outline: missing ${a.slice(0, 60)}`);
  o = o.replace(a, b);
};
rep(
  "- ● 12.12.5: вариант RecordType ссылается через `refines` на RecordType, поля которого он дополняет\n- ○ 12.12.6: вариант объявлен там же, где его RecordType (по новому 12.6)\n",
  "- ✓ 12.12.5: вариант RecordType ссылается через `refines` на RecordType, поля которого он дополняет\n- ● 12.12.6: вариант объявлен в том же разделе базовой спецификации, что и его RecordType\n",
);
rep(
  "### ◐ строка 12.12.5 — спрашиваю сейчас\n- одобренная: «Вариант RecordType уточняет RecordType, вариантом которого он является»\n- предлагаю: «Вариант RecordType ссылается через `refines` на RecordType, поля которого он дополняет»\n",
  "### ◐ строка 12.12.6 — спрашиваю сейчас\n- одобренная: «Вариант RecordType стоит в той части спецификации, которая объявляет значение, на которое он отвечает»\n- предлагаю: «Вариант RecordType объявлен в том же разделе базовой спецификации, что и его RecordType»\n",
);
fs.writeFileSync(outFile, o);

const idxFile = docs + "INDEX.md";
let x = fs.readFileSync(idxFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = x.replace(
  "fix-12-2-english.mjs corrects the English of 12.2 to match its agreed Russian and gathers in english-12-6.md the English that the owner agreed on 2026-11-19, for the readers of EngStickler.",
  "fix-12-2-english.mjs corrects the English text of 12.2 to match its agreed Russian wording, and collects in english-12-6.md the English text of what the owner agreed on 2026-11-19, for EngStickler's readers. fix-12-6-english.mjs corrects the English text of the agreed 12.6 after EngStickler's thorough reader has read it. step-12-12-6.mjs writes the state after row 12.12.5 was agreed into the continuation file, the queue outline and this index.",
);
fs.writeFileSync(idxFile, x);
console.log("ok", ts);
