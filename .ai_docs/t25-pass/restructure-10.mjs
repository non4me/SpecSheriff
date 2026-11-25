// The owner of 2026-11-11: section 10 "What is generated from the nodes" is taken apart. 10.1 (a generated copy is
// regenerated and never edited) joins 1.2 "The rule" right after 1.2.6 (the one source of truth), as 1.2.7, the
// former 1.2.7 becoming 1.2.8; 10.2 (code generated from the nodes waits) and 10.3 (a project's own generators) go
// to a new extension, 12.5 "Generation of code from the nodes", as 12.5.1 and 12.5.2; 10.4 (the map) leaves the base
// for the appendix of the tools, its order of domains by level for 12.4; section 11 becomes section 10.
// Rows, highlights and draft keys move together; a row's number in prose is left as written.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);

const remap = (n) => {
  if (n === "10.1") return "1.2.7";
  if (n === "1.2.7") return "1.2.8";
  if (n === "10.2") return "12.5.1";
  if (n === "10.3") return "12.5.2";
  if (n === "10.4") return null;
  const m = n.match(/^11\.(\d+)$/);
  if (m) return `10.${m[1]}`;
  return n;
};

let lines = fs.readFileSync(pagePath, "utf8").split("\n");
const isRow = (l) => /^\s*\["[0-9.]+",/.test(l);
const parse = (l) => JSON.parse(l.trim().replace(/,$/, ""));
const render = (indent, row, comma) => indent + JSON.stringify(row) + (comma ? "," : "");

// Take section 10 out whole, keeping its rows.
const h10 = lines.findIndex((l) => l.trim().startsWith('{ n: "10", en: "What is generated from the nodes"'));
if (h10 < 0) throw new Error("section 10 not found");
let end10 = h10 + 1;
while (!lines[end10].trim().startsWith("]},")) end10++;
const rows10 = lines.slice(h10 + 1, end10).map(parse);
if (rows10.length !== 4) throw new Error(`section 10 holds ${rows10.length} rows`);
lines.splice(h10, end10 - h10 + 1);

// Renumber every remaining row and its highlights.
lines = lines.flatMap((l) => {
  if (!isRow(l)) return [l];
  const indent = l.match(/^\s*/)[0];
  const comma = l.trim().endsWith(",");
  const row = parse(l);
  const to = remap(row[0]);
  if (to === null) return [];
  row[0] = to;
  if (Array.isArray(row[8])) row[8] = row[8].map(remap).filter(Boolean);
  return [render(indent, row, comma)];
});

// Section 11 becomes section 10.
const h11 = lines.findIndex((l) => l.trim().startsWith('{ n: "11", en: "The checks and the procedures"'));
if (h11 < 0) throw new Error("section 11 not found");
lines[h11] = lines[h11].replace('{ n: "11",', '{ n: "10",');

const fix = (row, to, law) => {
  row = [...row];
  row[0] = to;
  row[2] = law;
  if (Array.isArray(row[8])) row[8] = row[8].map(remap).filter(Boolean);
  return row;
};

// 10.1 joins 1.2 right after 1.2.6.
const at126 = lines.findIndex((l) => l.trim().startsWith('["1.2.6",'));
if (at126 < 0) throw new Error("row 1.2.6 not found");
lines.splice(at126 + 1, 0, render("      ", fix(rows10[0], "1.2.7", 1), true));

// 10.2 and 10.3 open the extension 12.5, after 12.4's group.
const h124 = lines.findIndex((l) => l.trim().startsWith('{ n: "12.4",'));
let end124 = h124 + 1;
while (!lines[end124].trim().startsWith("]},")) end124++;
lines.splice(end124 + 1, 0,
  '     { n: "12.5", en: "Generation of code from the nodes", ru: "Генерация кода из узлов", purpose: "Код, который генерируется из узлов, и собственные генераторы проекта.", rows: [',
  render("      ", fix(rows10[1], "12.5.1", 0), true),
  render("      ", fix(rows10[2], "12.5.2", 0), false),
  "     ]},");
fs.writeFileSync(pagePath, lines.join("\n"));

// The drafts follow their rows.
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  const to = remap(k);
  if (to === null) continue;
  if (out[to]) throw new Error(`two drafts for ${to}`);
  out[to] = v;
}
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");
console.log("rows moved:", rows10.map((r) => r[0]).join(" "), "| drafts:", Object.keys(out).filter((k) => /^1\.2\.[78]$|^10\.|^12\.5/.test(k)).join(" "));
