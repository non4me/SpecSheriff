// The owner's scheme of 2026-11-09: the nodes that prescribe how a system is organised leave the main rules for the
// extension of the guidelines on domains. Moves page rows and drafts in one mapping, so that no number moves twice,
// and changes no wording. Mentions of the old numbers in notes are listed, not rewritten: a number may be a present
// location there.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);

const toExtension = {
  "2.1": "13.1.1", "2.2": "13.1.2", "3.5": "13.1.3", "3.6": "13.1.4", "6.4": "13.1.5",
  "3.4": "13.2.1", "8.1": "13.2.2", "11.3": "13.2.3",
  "8.2": "13.2.4", "8.3": "13.2.5", "8.4": "13.2.6", "8.5": "13.2.7", "8.6": "13.2.8", "8.7": "13.2.9", "8.8": "13.2.10", "8.9": "13.2.11", "8.10": "13.2.12",
  "3.7": "13.3.1",
};
const shifted = { "2.3": "2.1", "2.4": "2.2", "2.5": "2.3", "2.6": "2.4", "11.4": "11.3", "11.5": "11.4" };
const map = { ...toExtension, ...shifted };
const renum = s => map[s] ?? s;

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const moved = {};
const out = [];
const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
for (const line of lines) {
  const t = line.trim();
  if (!isRow(t)) { out.push(line); continue; }
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  const from = row[0];
  row[0] = renum(from);
  if (Array.isArray(row[8])) row[8] = row[8].map(renum);
  if (toExtension[from]) { moved[row[0]] = row; continue; }
  out.push(line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : ""));
}

// Section 8 is left with no rows, so it goes; section 3 now holds only contracts and terms.
const headAt = n => out.findIndex(l => l.trim().startsWith(`{ n: "${n}",`));
const at8 = headAt("8");
if (at8 < 0) throw new Error("no part 8");
let end8 = at8 + 1;
while (!/^\s*\]\},?\s*$/.test(out[end8])) end8++;
out.splice(at8, end8 - at8 + 1);

const at3 = headAt("3");
out[at3] = out[at3].replace('en: "Contracts and the domains", ru: "Contracts и домены", purpose: "Что домены разделяют между собой и как устроен каждый домен."', 'en: "Contracts", ru: "Контракты", purpose: "Что части спецификации разделяют между собой."');
if (!out[at3].includes('"Контракты"')) throw new Error("part 3 not renamed");

const rowsIn = (prefix, count) => Array.from({ length: count }, (_, i) => {
  const key = `${prefix}.${i + 1}`;
  if (!moved[key]) throw new Error("no moved row " + key);
  return "      " + JSON.stringify(moved[key]) + (i + 1 < count ? "," : "");
});
const block = [
  `    { n: "13", en: "Extension: domains", ru: "Расширение «Домены»", purpose: "Как устроена система, разделённая на домены, которые обмениваются данными. Проект использует это расширение только по своему выбору.", groups: [`,
  `     { n: "13.1", en: "Division into domains", ru: "Деление на домены", purpose: "Что такое домен и как он описывает себя.", rows: [`,
  ...rowsIn("13.1", 5),
  `     ]},`,
  `     { n: "13.2", en: "RecordType", ru: "RecordType", purpose: "Формат данных, которыми домены обмениваются между собой.", rows: [`,
  ...rowsIn("13.2", 12),
  `     ]},`,
  `     { n: "13.3", en: "Levels", ru: "Уровни", purpose: "Как домены показываются на схеме.", rows: [`,
  ...rowsIn("13.3", 1),
  `     ]},`,
  `    ]},`,
];
const at12 = headAt("12");
let close = at12 + 1;
while (!/^\s*\];\s*$/.test(out[close])) close++;
out.splice(close, 0, ...block);
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");

const names = Object.keys(map).map(k => k.replace(".", "\\.")).join("|");
const re = new RegExp(`(?<![0-9.])(${names})(?![0-9]|\\.[0-9])`, "g");
let n = 0;
for (const [k, v] of Object.entries(next)) for (const c of v.changes || []) for (const m of c.match(re) || []) { n++; console.log(`changes of ${k}: ${m} | ${c.slice(0, 110)}`); }
console.log("moved rows:", Object.keys(moved).length, "| drafts:", Object.keys(next).length, "| mentions in the lists of changes:", n);
