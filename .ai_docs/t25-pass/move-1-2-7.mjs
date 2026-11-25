// The owner of 2026-11-11: 1.2.7 (generated copies regenerated and never edited) governs how generation works, not
// what a rule is, so it leaves 1.2 "The rule" for section 10 "The checks and the procedures", right after 10.10
// (a procedure that writes the specification is idempotent), as their ruling of 2026-11-07 put generation towards
// the end. 1.2.8 becomes 1.2.7 again; 10.11 and 10.12 become 10.12 and 10.13. Rows, highlights and draft keys move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const table = { "1.2.7": "10.11", "1.2.8": "1.2.7", "10.11": "10.12", "10.12": "10.13" };
const remap = (n) => table[n] ?? n;

let lines = fs.readFileSync(pagePath, "utf8").split("\n");
const isRow = (l) => /^\s*\["[0-9.]+",/.test(l);
const parse = (l) => JSON.parse(l.trim().replace(/,$/, ""));
const render = (indent, row, comma) => indent + JSON.stringify(row) + (comma ? "," : "");

const at = lines.findIndex((l) => l.trim().startsWith('["1.2.7",'));
if (at < 0) throw new Error("row 1.2.7 not found");
const moved = parse(lines[at]);
lines.splice(at, 1);

lines = lines.map((l) => {
  if (!isRow(l)) return l;
  const indent = l.match(/^\s*/)[0];
  const comma = l.trim().endsWith(",");
  const row = parse(l);
  row[0] = remap(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].map(remap);
  return render(indent, row, comma);
});

moved[0] = "10.11";
moved[2] = 0;
if (Array.isArray(moved[8])) moved[8] = moved[8].map(remap);
const after = lines.findIndex((l) => l.trim().startsWith('["10.10",'));
if (after < 0) throw new Error("row 10.10 not found");
lines.splice(after + 1, 0, render("      ", moved, true));
fs.writeFileSync(pagePath, lines.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  const to = remap(k);
  if (out[to]) throw new Error(`two drafts for ${to}`);
  out[to] = v;
}
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");
console.log(["1.2.7", "10.10", "10.11", "10.12", "10.13"].map((k) => `${k} ${out[k]?.sidValue ?? "(no draft)"}`).join(" | "));
