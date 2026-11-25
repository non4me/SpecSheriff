// The owner's ruling of 2026-11-16: every extension relies only on the SpecSheriff guidelines and names no other
// extension, so RecordType is written in general terms and its section 12.2, "RecordType in a specification divided
// into domains", is removed. Section 12 then has one subsection, so its rows become rows of the section itself:
// 12.1.N becomes 12.N. The four rules that still speak of domains stand at the end of the section, each to be settled
// on its own when the review reaches it. The planned row 12.2.1, a part of 12.1.1 about domains, is dropped.
// The wording of no node changes here.
import fs from "node:fs";

const map = { "12.2.2": "12.12", "12.2.3": "12.13", "12.2.4": "12.14", "12.2.5": "12.15" };
for (let i = 1; i <= 11; i++) map[`12.1.${i}`] = `12.${i}`;
const notes = {
  "12.2.2": "Говорит о границе домена. RecordType теперь пишется общими словами (ваше решение от 16 ноября), поэтому это ограничение либо переходит в «Домены» общими словами, без RecordType, либо уходит. Решим, когда дойдём до него.",
  "12.2.3": "Говорит об именах доменов. Возможно, его покрывает 12.8, sid узлов одного NodeKind, если заголовок домена — такой узел. Решим, когда дойдём до него.",
  "12.2.4": "Говорит о значениях, которые добавляют домены. Вопрос об архиве — когда дойдём до него.",
  "12.2.5": "Говорит о значениях, которые добавляют домены. Вопрос об архиве — когда дойдём до него.",
};

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-flatten.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (v.table) for (const row of v.table.rows) for (const cell of row) if (cell.node && map[cell.node]) cell.node = map[cell.node];
  out[map[k] ?? k] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
fs.copyFileSync(page, new URL("base-structure.before-flatten.html", import.meta.url));
let h = fs.readFileSync(page, "utf8");
const start = h.indexOf('    { n: "12", en: "RecordType"');
const end = h.indexOf('    { n: "13", en:', start);
if (start < 0 || end < 0) throw new Error("section 12 not found");
const rows = {};
for (const line of h.slice(start, end).split("\n")) {
  const m = line.match(/^      \["(12\.[12]\.\d+)",(.*?),?\s*$/);
  if (m) rows[m[1]] = m[2].replace(/\]$/, "");
}
const order = ["12.1.1", "12.1.2", "12.1.3", "12.1.4", "12.1.5", "12.1.6", "12.1.7", "12.1.8", "12.1.9", "12.1.10", "12.1.11", "12.2.2", "12.2.3", "12.2.4", "12.2.5"];
const body = order.map((old) => {
  if (!rows[old]) throw new Error(`no row ${old}`);
  let rest = rows[old];
  if (notes[old]) {
    const cells = JSON.parse(`[${rest}]`);
    // The cells after the key: change, commandment or not, old location, titles, gist, note, the rows it lights up.
    while (cells.length < 9) cells.push(cells.length === 7 ? [] : "");
    cells[6] = (cells[6] ? cells[6] + " " : "") + notes[old];
    rest = cells.map((c) => JSON.stringify(c)).join(",");
  }
  return `      ["${map[old]}",${rest}]`;
});
const section = [
  `    { n: "12", en: "RecordType", ru: "RecordType", purpose: "Расширение: формат данных, которые одна часть системы передаёт другой или хранит. Не требует доменов и не называет их.", rows: [`,
  body.join(",\n"),
  "    ]},",
  "",
].join("\n");
h = h.slice(0, start) + section + h.slice(end);
fs.writeFileSync(page, h);
console.log("renamed", Object.keys(map).filter((k) => d[k]).length, "drafts; section 12 rewritten");
