// Swaps two nodes of the new structure, by the owner's ruling: node swap-nodes.mjs <a> <b>. The page
// rows change places and numbers, every highlight naming either is renamed, and the drafts in
// newform.json, their citations §[n] included, follow.
import fs from "node:fs";

const [a, b] = process.argv.slice(2);
const here = new URL(".", import.meta.url);
const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
const rowAt = n => lines.findIndex(l => l.trim().startsWith(`["${n}",`));
const ia = rowAt(a), ib = rowAt(b);
if (ia < 0 || ib < 0) throw new Error("row not found");
const swap = s => s === a ? b : s === b ? a : s;
const fix = line => {
  const t = line.trim();
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  row[0] = swap(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].map(swap);
  return line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
};
// Every row's highlights: rename a and b.
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) {
    const row = JSON.parse(t.endsWith(",") ? t.slice(0, -1) : t);
    if (row[0] === a || row[0] === b || (Array.isArray(row[8]) && (row[8].includes(a) || row[8].includes(b)))) lines[i] = fix(lines[i]);
  }
}
// The two rows change places: each now carries the other's number, so swap the lines back into order.
[lines[ia], lines[ib]] = [lines[ib], lines[ia]];
fs.writeFileSync(page, lines.join("\n"));

const path = new URL("newform.json", here);
let raw = fs.readFileSync(path, "utf8");
raw = raw.split(`§[${a}]`).join("§[@@]").split(`§[${b}]`).join(`§[${a}]`).split("§[@@]").join(`§[${b}]`);
const d = JSON.parse(raw);
const out = {};
for (const [k, v] of Object.entries(d)) out[swap(k)] = v;
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
console.log(`swapped ${a} and ${b}`);
