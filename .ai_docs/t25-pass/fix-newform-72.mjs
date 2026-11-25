// The owner, 2026-11-09: the two last paragraphs of 6.1, on the links between terms and on writing a ratio, become a node of
// their own right after it, word for word, and 6.1 as it then stands is agreed. Numbers in the lists of changes of the two nodes
// that move are brought to the new order; numbers elsewhere name the present nodes and stay.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const SID = "s-76dutms9uv6uha2";

const shift = s => ({ "6.2": "6.3", "6.3": "6.4" }[s] ?? s);
const isRow = t => /^\["[0-9.]+","(split|part|move|same|new)"/.test(t);

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const out = [];
for (const line of lines) {
  const t = line.trim();
  if (!isRow(t)) { out.push(line); continue; }
  const comma = t.endsWith(",");
  const row = JSON.parse(comma ? t.slice(0, -1) : t);
  row[0] = shift(row[0]);
  if (Array.isArray(row[8])) row[8] = row[8].map(shift);
  if (row[0] === "6.1") row[1] = "split";
  out.push(line.slice(0, line.indexOf("[")) + JSON.stringify(row) + (comma ? "," : ""));
  if (row[0] === "6.1") {
    if (!comma) throw new Error("6.1 closes its section");
    out.push("      " + JSON.stringify(["6.2", "part", 0, "2.2", "part of 2.2: A link carries its type", "уходит сюда: Связи между терминами"]) + ",");
  }
}
fs.writeFileSync(pagePath, out.join("\n"));

const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const next = {};
for (const [k, v] of Object.entries(d)) next[shift(k)] = v;

// The list of changes of the two moved nodes still counts by the order before section 6 was redrawn.
const former = { "6.1": "6.3", "6.2": "6.4", "6.3": "6.1" };
for (const k of ["6.3", "6.4"]) {
  next[k].changes = next[k].changes.map(c => c.replace(/(?<![0-9.])6\.[123](?![0-9]|\.[0-9])/g, m => former[m]));
}

const link = next["6.1"];
const enCut = link.text.indexOf("\n\nA `term-relation` link and a `uses` link bind");
const ruCut = link.ruText.indexOf("\n\nСвязи `term-relation` и `uses` соединяют");
if (enCut < 0 || ruCut < 0) throw new Error("the paragraphs moved are not where they were");
const enMoved = link.text.slice(enCut + 2);
const ruMoved = link.ruText.slice(ruCut + 2);
link.text = link.text.slice(0, enCut);
link.ruText = link.ruText.slice(0, ruCut);
link.changes = [...link.changes, "По вашему решению абзацы о связях между терминами и о записи соотношения вынесены в 6.2."];
link.agreed = "2026-11-09";

next["6.2"] = {
  from: "2.2", sid: "new", title: "Links between terms", ruTitle: "Связи между терминами",
  text: enMoved,
  reason: "A link between two terms has to say how the things they name stand to each other. Only these two types say that. The ends of a ratio are in a fixed order because, swapped, the same figures state a different relation.",
  ruText: ruMoved,
  ruReason: "Связь между двумя терминами должна говорить, как соотносится то, что они называют. Это говорят только эти два типа. Концы соотношения идут в заданном порядке, потому что при перестановке те же значения означают другое соотношение.",
  changes: ["По вашему решению вынесен из 6.1. Текст — два его последних абзаца, дословно. Заголовок и обоснование новые, потому что у прежнего узла их для этой мысли не было."],
  sidValue: SID,
};
fs.writeFileSync(draftsPath, JSON.stringify(next, null, 2) + "\n");
console.log("section 6:", Object.keys(next).filter(k => k.startsWith("6.")).sort().map(k => `${k} ${next[k].title}`).join(" | "));
