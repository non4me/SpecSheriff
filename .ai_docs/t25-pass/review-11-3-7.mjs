// Records what specsheriff-rule-reviewer found in the draft of row 11.3.7: the row checks less than 11.1.2 requires,
// since nothing limits the document with the domain's header; the doubt goes to the owner. Applies the corrections
// EngStickler's readers confirmed in batch 15.
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

const tFile = new URL("table-11-3.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const r = t.tables[0].rows.find((x) => x.num === "11.3.7");
r.proposals = [
  {
    en: "Where a domain is kept in several documents, each of them holds either the domain's header alone or one of its top-level sections",
    ru: "Если домен хранится в нескольких документах, каждый из них содержит либо только заголовок домена, либо один его раздел верхнего уровня",
    why: "Рекомендую. Заголовок загружают отдельно от остального (обоснование 11.1.3), и инструменты уже держат его в своём файле. Требует сначала дополнить 11.1.2: заголовок домена — в своём документе.",
  },
  {
    en: "Where a domain is kept in several documents, each of them holds at most one of the domain's top-level sections",
    ru: "Если домен хранится в нескольких документах, каждый из них содержит не больше одного раздела верхнего уровня домена",
    why: "11.1.2 не меняется, но где стоит заголовок, не сказано: он может лежать в документе вместе с разделом.",
  },
];
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 16:20 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 16:35 UTC):** a question on row 11.3.7 of table 11.3, the missing check for 11.1.2, is put to the owner: once a domain is split into several documents, is its header kept in a document of its own?",
  "specsheriff-rule-reviewer found that the draft checked less than 11.1.2 requires, since nothing limited the document with the domain's header.",
  "The agent recommends that the header stand alone in its document: 11.1.3's reason has the header loaded without the rest, and the SpecSheriff tools already keep it in `specs/<domain>/00-<domain>.json`.",
  "If the owner agrees, 11.1.2 is first given a clause saying so, and the row then says that each document of a split domain holds either the domain's header alone or one of its top-level sections.",
  "The other option leaves 11.1.2 unchanged: each document holds at most one top-level section of the domain.",
  "The reviewer also found a clash of terms: 11.1.2 calls the files of a domain documents, while the appendix of the tools (s-zefk589ykh37b8u, s-m8nmfsxkcfu7cjp) and row 10.1.39 call the markdown files outside `specs/` documents. The agent proposes renaming the appendix's term to \"the documentation\" in the step that changes the SpecSheriff tools.",
  "The owner agreed to the whole of table 12.12 on 2026-11-19.",
  "finish-12-12.mjs then renumbered its rows in the order in which they stand in the table, a mechanical change: the old rows 12.12.5 to 12.12.11 became 12.12.4 to 12.12.12 with the new rows among them, and the old rows 12.12.14 to 12.12.16 became 12.12.13 to 12.12.15; the new row on fragments of a format is 12.12.16.",
  "The table before the renumbering is kept in table-12-12.before-renumber.json.",
  "EngStickler's thorough reader read the English text of the agreed rows, and fix-12-12-english.mjs corrected it, together with the same phrases in 12.6 and 12.10.",
].join(" ") + s.slice(end);
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 11.3.7: домен в нескольких документах — в каждом, кроме документа с заголовком, один раздел; у рецензента\n", "- ● 11.3.7: один раздел на документ; вопрос — где лежит заголовок разделённого домена\n"],
  ["### ◐ строка 11.3.7 — покажу после рецензента\n- недостающая проверка для 11.1.2: один раздел на документ\n", "### ◐ строка 11.3.7 — спрашиваю сейчас\n- разделённый на документы домен: заголовок в своём документе? рекомендую да\n- тогда сначала дополняется 11.1.2\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [
  ["collects in english-12-12.md the English text of the rows agreed on 2026-11-19;", "collects the English text of the rows agreed on 2026-11-19 in english-12-12.md;"],
  ["state-11-3-7.mjs records this state in the continuation file, the queue outline and this index.", "state-11-3-7.mjs records, in the continuation file, the queue outline and this index, the state reached once row 11.3.7 was drafted. review-11-3-7.mjs records the two wordings of row 11.3.7 that follow from the reviewer's findings."],
], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
