// After the owner agreed to the narrower third item of the principle's list of the reviewer's judgements (written into
// docs/principles.md): corrects the English of the agreed row 10.1.43a as EngStickler's reader found, without changing
// its meaning; puts row 10.1.25a, the check of the reviewer's judgement on an approved node of the technical appendix,
// at the end of the group "The specification alone" of the main table of checks, as a new row that waits for the
// owner's decision; and brings the continuation file, the index and the outline of the queue map up to date.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tablePath = new URL("table-10-1.json", here);
fs.copyFileSync(tablePath, new URL("table-10-1.before-10-1-25a.json", here));
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const rows = t.tables.flatMap(g => g.rows);

// Row 10.1.43a: the English alone.
const a = rows.find(r => r.num === "10.1.43a");
a.en = swap(a.en, "Where a commit's message states", "Where a commit message states", "43a en");
a.reason = swap(a.reason, "could leave a rule's tests and code behind its new wording, and escape the cost of that lag,",
  "could leave a rule's tests and code lagging behind its new wording, and avoid the cost of that lag,", "43a reason");
a.change += " После согласования поправлен английский по отчёту читателя EngStickler; смысл и русский текст не менялись.";

// Row 10.1.25a, from the draft with the rule reviewer's fixes.
const draftPath = new URL("draft-10-1-43ab.json", here);
const d = JSON.parse(fs.readFileSync(draftPath, "utf8"));
const b = structuredClone(d.rows.find(r => r.num === "10.1.25a"));
if (!b) throw new Error("the draft of row 10.1.25a is missing");
if (rows.some(r => r.num === "10.1.25a")) throw new Error("row 10.1.25a is already in the table");
b.change += " Предложена после того, как вы согласовали третий пункт принципа о суждениях рецензента (20 ноября): он, как и эта строка, говорит только об узле, реализующем правило базовой спецификации.";
const group = t.tables[0];
if (group.heading !== "The specification alone") throw new Error("group 1 is not 'The specification alone'");
const at = group.rows.findIndex(r => r.num === "10.1.25");
if (at < 0) throw new Error("row 10.1.25 not found");
group.rows.splice(at + 1, 0, b);
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");
fs.writeFileSync(new URL("english-10-1-43a.md", here), [
  "# Row 10.1.43a of the main table of checks", "", `What is checked: ${a.en}`, "", `On failure: ${a.cost}`, "", `Reason: ${a.reason}`, "",
].join("\n"));

// The continuation file.
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* getting the owner's decision on the proposed new wording of the third item[^\n]*/m, () =>
  "**The next session starts by** getting the owner's decision on the new row 10.1.25a of the main table of checks, at the end of the group \"The specification alone\" in table-10-1.json and on the page of the main table of checks. It is the check in which the reviewer judges whether a node of the technical appendix that is approved in a commit and has an `implements` link to a rule of the base specification refines the rules it implements and contradicts no rule of the base specification. The list of wordings in the section \"Waiting for the owner\" names the proposals that come next, to be made one at a time.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
c = c.replace(/^- the wording of the third item in the list of the reviewer's judgements in the principle[^\n]*\n/m, () =>
  "- the third item in the list of the reviewer's judgements in the principle \"Deterministic checks hold every participant to the contract\": the owner agreed on 2026-11-20 («ок») that it applies only to a node of the technical appendix that implements a rule of the base specification, as nodes 1.3.6, 1.6.1 and 10.4 do. The agent wrote the new wording into docs/principles.md. The commit made at the end of the session states the owner's decision in its message, since a decision on a principle is kept only in the commit message. Row 10.1.25a has been proposed to the owner since then;\n");
c = swap(c, "An EngStickler reader agent is reading its English, kept in english-10-1-43a.md.",
  "An EngStickler reader agent read its English, kept in english-10-1-43a.md, and add-10-1-25a.mjs corrected the phrases that the reader had found, without changing the meaning.", "43a reader");
fs.writeFileSync(contPath, c);

// The index.
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and agree-10-1-43a.mjs records the owner's agreement to that row.",
  "and agree-10-1-43a.mjs records the owner's agreement to that row. add-10-1-25a.mjs puts row 10.1.25a into table-10-1.json.", "index");
fs.writeFileSync(indexPath, s);

// The outline of the queue map.
const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "### ◐ третий пункт принципа о суждениях рецензента\n- только узел приложения, который реализует правило базовой спецификации, как в 1.3.6, 1.6.1 и 10.4\n",
  "### ◐ новая строка 10.1.25a основной таблицы проверок\n- одобренный в коммите узел приложения со связью implements уточняет реализуемые правила базы и не противоречит базе\n- группа «Только спецификация»: проверка не читает код; отклоняется всегда\n", "outline waiting");
o = swap(o, "### ✓ строка 10.1.43a основной таблицы проверок — согласована\n",
  "### ✓ третий пункт принципа о суждениях рецензента — согласован\n- только узел приложения, который реализует правило базовой спецификации, как в 1.3.6, 1.6.1 и 10.4\n\n### ✓ строка 10.1.43a основной таблицы проверок — согласована\n", "outline done");
o = swap(o, "- ● третий пункт принципа о суждениях рецензента\n- ○ строка 10.1.25a:",
  "- ✓ третий пункт принципа о суждениях рецензента\n- ● строка 10.1.25a:", "outline steps");
fs.writeFileSync(outPath, o);
console.log("row 10.1.25a added at", now);
