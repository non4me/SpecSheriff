// The owner, 2026-11-09: section 8 divides into "Kinds of node and their location" and "Decisions and work put off". The new
// section takes the number 9, and the sections from 9 on move up by one. No wording changes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);

const toNew = { "8.5": "9.1", "8.6": "9.2", "8.7": "9.3" };
const bump = s => {
  const m = String(s).match(/^(\d+)((?:\.\d+)*)$/);
  return m && Number(m[1]) >= 9 ? `${Number(m[1]) + 1}${m[2]}` : s;
};
const renum = s => toNew[s] ?? bump(s);

const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);
const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const moved = [];
const out = [];
for (const line of lines) {
  const t = line.trim();
  if (isRow(t)) {
    const comma = t.endsWith(",");
    const row = JSON.parse(comma ? t.slice(0, -1) : t);
    const from = row[0];
    row[0] = renum(from);
    if (Array.isArray(row[8])) row[8] = row[8].map(renum);
    if (toNew[from]) { moved.push(row); continue; }
    out.push(line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : ""));
    continue;
  }
  const head = line.match(/^(\s*\{ n: ")(\d+(?:\.\d+)*)(",.*)$/);
  out.push(head ? head[1] + bump(head[2]) + head[3] : line);
}
if (moved.length !== 3) throw new Error("moved " + moved.length);

const at = n => out.findIndex(l => l.trim().startsWith(`{ n: "${n}",`));
const eight = at("8");
out[eight] = '    { n: "8", en: "Kinds of node and their location", ru: "Виды узлов и их расположение", purpose: "Какие бывают узлы и где они находятся.", rows: [';
let last = eight + 1;
while (isRow(out[last + 1]?.trim() ?? "")) last++;
out[last] = out[last].replace(/,\s*$/, "");

const ten = at("10");
if (ten < 0) throw new Error("no part 10");
out.splice(ten, 0,
  '    { n: "9", en: "Decisions and work put off", ru: "Решения и отложенная работа", purpose: "Что хранится на узле рядом с его правилом: принятые решения и работа на потом.", rows: [',
  ...moved.map((r, i) => "      " + JSON.stringify(r) + (i + 1 < moved.length ? "," : "")),
  "    ]},");
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");
console.log(Object.keys(next).filter(k => /^(9|10)\./.test(k)).join(" "));
