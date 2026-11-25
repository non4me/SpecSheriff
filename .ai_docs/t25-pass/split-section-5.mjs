// The owner, 2026-11-09: the first three rules of section 5 form a section of their own named JSON Schema; the rest of the
// section, whose title "Nodes" says too little, takes the free number 8 until it is named. No wording changes, but the
// title the owner settled for 5.2.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);

const map = { "5.4": "8.1", "5.5": "8.2", "5.6": "8.3", "5.7": "8.4", "5.8": "8.5", "5.9": "8.6", "5.10": "8.7" };
const renum = s => map[s] ?? s;

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const moved = [];
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
  if (map[from]) { moved.push(row); continue; }
  out.push(line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : ""));
}
if (moved.length !== 7) throw new Error("moved " + moved.length);

const at = n => out.findIndex(l => l.trim().startsWith(`{ n: "${n}",`));
const five = at("5");
if (five < 0 || !out[five].includes('en: "Nodes"')) throw new Error("no part 5");
out[five] = '    { n: "5", en: "JSON Schema", ru: "JSON-схема", purpose: "Чем задана структура спецификации и что проект может к ней добавить.", rows: [';
// The last row kept in part 5 now ends the list: no trailing comma is needed, but the page tolerates none of two forms, so strip it.
let last = five + 1;
while (isRow(out[last + 1]?.trim() ?? "")) last++;
out[last] = out[last].replace(/,\s*$/, "");

const nine = at("9");
if (nine < 0) throw new Error("no part 9");
const block = [
  '    { n: "8", en: "Nodes", ru: "Узлы", purpose: "Из чего состоит узел и что он хранит рядом со своим правилом.", rows: [',
  ...moved.map((r, i) => "      " + JSON.stringify(r) + (i + 1 < moved.length ? "," : "")),
  "    ]},",
];
out.splice(nine, 0, ...block);
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[renum(k)] = v;
next["5.2"].title = "How a project may extend the schema";
next["5.2"].ruTitle = "Как проект может расширить схему";
next["5.2"].changes.push("Заголовок — по вашему решению.");
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");
console.log("moved", moved.map(r => r[0]).join(" "), "| drafts in 8:", Object.keys(next).filter(k => k.startsWith("8.")).join(" "));
