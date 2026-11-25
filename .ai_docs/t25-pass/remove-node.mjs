// Takes a node out of the new structure: node remove-node.mjs <n>, e.g. 4.4. Its page row and its draft
// go, every highlight naming it goes, and every node of the same section numbered above it moves
// down by one: page row, draft, highlights, and mentions in the notes and the lists of changes. The
// reverse of insert-node.mjs.
import fs from "node:fs";

const at = process.argv[2];
const m = at.match(/^(.*\.)(\d+)$/);
if (!m) throw new Error("give a number such as 4.4");
const [prefix, gone] = [m[1], Number(m[2])];
const here = new URL(".", import.meta.url);

const page = new URL("base-structure.html", here);
let lines = fs.readFileSync(page, "utf8").split("\n");
let max = 0;
for (const l of lines) {
  const r = l.trim().match(/^\["([0-9.]+)",/);
  if (r && r[1].startsWith(prefix) && /^\d+$/.test(r[1].slice(prefix.length))) max = Math.max(max, Number(r[1].slice(prefix.length)));
}
const shift = s => {
  if (!s.startsWith(prefix)) return s;
  const tail = s.slice(prefix.length);
  if (!/^\d+$/.test(tail) || Number(tail) <= gone) return s;
  return prefix + (Number(tail) - 1);
};
const esc = prefix.replace(/\./g, "\\.");
// Lowest first, so that no number is moved twice; a number followed by ".digit" is another node's.
const prose = s => {
  for (let k = gone + 1; k <= max; k++) s = s.replace(new RegExp(`(?<![0-9.])${esc}${k}(?![0-9]|\\.[0-9])`, "g"), prefix + (k - 1));
  return s;
};

lines = lines.filter(l => !l.trim().startsWith(`["${at}",`));
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (!/^\["[0-9.]+","(split|part|move|same|new)"/.test(t)) continue;
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  row[0] = shift(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].filter(x => x !== at).map(shift);
  for (const k of [6, 7]) if (typeof row[k] === "string") row[k] = prose(row[k]);
  lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
}
fs.writeFileSync(page, lines.join("\n"));

const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === at) continue;
  v.changes = v.changes.map(prose);
  out[shift(k)] = v;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log(`removed ${at}; ${prefix}${gone + 1}..${prefix}${max} moved down by one`);
