// The owner of 2026-11-10: a section of one node looks odd, so 9.1 (a todo is kept on a node it concerns) moves into 1.2 "The rule", right after agreed 1.2.4,
// which names a node's todos among what it holds; it becomes 1.2.5, and 1.2.5 and 1.2.6 become 1.2.6 and 1.2.7. Section 9 goes, and sections 10 to 13 become
// 9 to 12: page rows, section headings, highlights and draft keys. Notes in prose keep their numbers, as at fix-newform-143.mjs, except the one on 8.3 brought
// to the page's numbers there. A move leaves 9.1's agreement standing (agreed 1.3.5).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const moved = { "9.1": "1.2.5", "1.2.5": "1.2.6", "1.2.6": "1.2.7" };
const map = (num) => {
  if (moved[num]) return moved[num];
  const m = num.match(/^(1[0-3])((?:\.\d+)*)$/);
  return m ? `${Number(m[1]) - 1}${m[2]}` : num;
};
if (!d["9.1"] || d["9.1"].sidValue !== "s-t28j22vbdmmeqnh" || d["9.2"] || d["1.2.7"] || !d["1.2.4"]) throw new Error("unexpected drafts");

const t = d["9.1"];
t.changes = ["Перенесён из раздела 9 в раздел 1.2 по вашему решению 2026-11-10, сразу за 1.2.4: раздел из одного узла убран.", ...t.changes];
// Prose mentions of 1.2.5 and 1.2.6 move with them, the higher first.
const prose = (s) => s.replace(/(?<![0-9.])1\.2\.6(?![0-9]|\.[0-9])/g, "1.2.7").replace(/(?<![0-9.])1\.2\.5(?![0-9]|\.[0-9])/g, "1.2.6");
for (const v of Object.values(d)) v.changes = v.changes.map(prose);
const e = d["8.3"];
e.changes = e.changes.map((c) => c.replace("в 10.4, 10.5, 12.12", "в 9.4, 9.5, 11.12"));

// The drafts under their new keys, 9.1 after 1.2.4.
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "9.1") continue;
  out[map(k)] = v;
  if (k === "1.2.4") out["1.2.5"] = t;
}
if (Object.keys(out).length !== Object.keys(d).length) throw new Error("a draft was lost");
fs.writeFileSync(draftsPath, JSON.stringify(out, null, 2) + "\n");

// The page: section 9 goes, its row joins 1.2 after 1.2.4 as a commandment like its neighbours.
const isRow = (s) => /^\["[0-9.]+","(split|part|move|same|new)"/.test(s);
let lines = fs.readFileSync(pagePath, "utf8").split("\n");
const start = lines.findIndex((l) => l.trim().startsWith('{ n: "9", en: "Todos"'));
if (start < 0 || !lines[start + 1].trim().startsWith('["9.1",') || lines[start + 2].trim() !== "]},") throw new Error("unexpected section 9 on the page");
const row91 = JSON.parse(lines[start + 1].trim().replace(/,$/, ""));
lines.splice(start, 3);
const at = lines.findIndex((l) => l.trim().startsWith('["1.2.4",'));
if (at < 0 || !lines[at + 1].trim().startsWith('["1.2.5",')) throw new Error("unexpected section 1.2 on the page");
const indent = lines[at].slice(0, lines[at].indexOf("["));
row91[2] = 1;
lines.splice(at + 1, 0, indent + JSON.stringify(row91) + ",");
let placed = false;
for (let i = 0; i < lines.length; i++) {
  const s = lines[i].trim();
  if (isRow(s)) {
    const comma = s.endsWith(",");
    const row = JSON.parse(comma ? s.slice(0, -1) : s);
    if (i === at + 1) { row[0] = "1.2.5"; placed = true; }
    else row[0] = map(row[0]);
    if (Array.isArray(row[8])) row[8] = row[8].map(map);
    for (const k of [6, 7]) if (typeof row[k] === "string") row[k] = prose(row[k]);
    lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (comma ? "," : "");
  } else {
    const m = s.match(/^\{ n: "([0-9.]+)"/);
    if (m && map(m[1]) !== m[1] && !moved[m[1]]) lines[i] = lines[i].replace(`{ n: "${m[1]}"`, `{ n: "${map(m[1])}"`);
  }
}
if (!placed) throw new Error("9.1 not placed");
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("1.2 now:", ["1.2.4", "1.2.5", "1.2.6", "1.2.7"].map((k) => k + " " + out[k].title).join(" | "));
console.log("sections now:", [...lines.join("\n").matchAll(/\{ n: "(\d+)", en: "([^"]+)"/g)].map((m) => m[1] + " " + m[2]).join("; "));
