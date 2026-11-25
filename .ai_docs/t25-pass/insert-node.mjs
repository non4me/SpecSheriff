// Makes room for a new node at a number of the new structure: node insert-node.mjs <n>, e.g. 7.4.
// Every node of the same section numbered n or higher moves up by one: its page row, its draft in
// newform.json, every highlight naming it, and every mention of its number in the notes and the
// lists of changes. The new row and draft are added by the caller.
import fs from "node:fs";

const at = process.argv[2];
const m = at.match(/^(.*\.)(\d+)$/);
if (!m) throw new Error("give a number such as 7.4");
const [prefix, from] = [m[1], Number(m[2])];
const here = new URL(".", import.meta.url);

const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
let max = 0;
for (const l of lines) {
  const r = l.trim().match(/^\["([0-9.]+)",/);
  if (r && r[1].startsWith(prefix) && /^\d+$/.test(r[1].slice(prefix.length))) max = Math.max(max, Number(r[1].slice(prefix.length)));
}
const shift = s => {
  if (!s.startsWith(prefix)) return s;
  const tail = s.slice(prefix.length);
  if (!/^\d+$/.test(tail) || Number(tail) < from) return s;
  return prefix + (Number(tail) + 1);
};
// Mentions in prose: highest first, so that no number is moved twice; a number followed by a further
// ".digit" is another node's (7.1.22 of tools.json) and stays.
const esc = prefix.replace(/\./g, "\\.");
const prose = s => {
  for (let k = max; k >= from; k--) s = s.replace(new RegExp(`(?<![0-9.])${esc}${k}(?![0-9]|\\.[0-9])`, "g"), prefix + (k + 1));
  return s;
};

for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  row[0] = shift(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].map(shift);
  for (const k of [6, 7]) if (typeof row[k] === "string") row[k] = prose(row[k]);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
fs.writeFileSync(page, lines.join("\n"));

const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  v.changes = v.changes.map(prose);
  out[shift(k)] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log(`room made at ${at}: ${prefix}${from}..${prefix}${max} moved up by one`);
