// Records in the continuation file, the queue outline and the index that table 12.12 is agreed in full and renumbered,
// and that row 11.3.7, the missing check for 11.1.2, is with the reviewer; applies the corrections EngStickler's readers
// confirmed in batch 14.
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
const start = s.indexOf("**Now (2026-11-19, 15:50 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 16:20 UTC):** row 11.3.7 of table 11.3, the table of checks of the Domains extension, is with specsheriff-rule-reviewer and is then presented to the owner.",
  "The row is the missing check for 11.1.2: where a domain is kept in several documents, every document except the one with the domain's header holds one section of the domain (draft-11-3-7.mjs).",
  "The owner agreed to the whole of table 12.12 on 2026-11-19.",
  "finish-12-12.mjs then renumbered its rows in the order of the table, a mechanical change: the old rows 12.12.5 to 12.12.11 became 12.12.4 to 12.12.12 with the new rows among them, and the old rows 12.12.14 to 12.12.16 became 12.12.13 to 12.12.15; the new row on fragments of a format is 12.12.16.",
  "The table before the renumbering is kept in table-12-12.before-renumber.json.",
  "Row 12.12.15, the old 12.12.16, now checks the first sentence of 12.10, and row 12.12.16 checks its second sentence; the old row checked the `consumes` links of a domain's header, which belong to the Domains extension.",
  "english-12-12.md contains the English text of the rows agreed on 2026-11-19, for EngStickler's thorough reader; the English text of row 12.12.13 now names a kind of node as 12.8 does, in place of the old name NodeKind.",
].join(" ") + s.slice(end);
s = fix(s, [["After table 12.12, the row for 11.1.2 (one section per document) comes next.", "After row 11.3.7 come the step of T25 that changes the SpecSheriff tools, the move of the drafts into the specification files, and the step that changes the skills."]], "continuation");
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 12.12.16 по 12.10: на что ссылается RecordType; фрагмент формата ссылается только на фрагменты\n- ○ после согласования всех строк — перенумеровать таблицу 12.12 (механически)\n", "- ✓ 12.12.16 по 12.10: на что ссылается RecordType; фрагмент формата ссылается только на фрагменты\n- ✓ таблица 12.12 согласована целиком и перенумерована: 16 строк\n"],
  ["- ○ строка для 11.1.2: один раздел на документ\n", "- ● 11.3.7: домен в нескольких документах — в каждом, кроме документа с заголовком, один раздел; у рецензента\n"],
  ["### ◐ строка 12.12.16 — спрашиваю сейчас\n- одобренная проверяла связи `consumes` доменов — это правило расширения «Домены»\n- предлагаю две строки по согласованному 12.10\n", "### ◐ строка 11.3.7 — покажу после рецензента\n- недостающая проверка для 11.1.2: один раздел на документ\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [[
  "step-12-12-16.mjs records row 12.12.15 as agreed and proposes row 12.12.16 anew from 12.10, split into two rows.",
  "step-12-12-16.mjs records row 12.12.15 as agreed and proposes a new version of row 12.12.16, based on 12.10 and split into two rows. finish-12-12.mjs records the last rows of table 12.12 as agreed, renumbers the table and collects in english-12-12.md the English text of the rows agreed on 2026-11-19; fix-12-12-13-english.mjs replaces the old name NodeKind in the English text of row 12.12.13. draft-11-3-7.mjs drafts row 11.3.7 of table 11.3, the missing check for 11.1.2; state-11-3-7.mjs records this state in the continuation file, the queue outline and this index.",
]], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
