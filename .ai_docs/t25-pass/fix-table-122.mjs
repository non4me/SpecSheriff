// Check 10.1.36 is agreed: the owner accepted the wording of fix-table-121.mjs (2026-11-13, «ок»). In check 10.1.35, the
// English phrase the readers of batch 102 flagged is reworded; its meaning does not change.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.36");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change = "Вы приняли эту формулировку (2026-11-13): свойство называет ключ `TextRule.list.property`, а не «список».";
delete a.proposals;
a.agreed = "2026-11-13";

const b = rows.find((x) => x.num === "10.1.35");
const from = "the enumeration contains nothing that `TextRule.list` does not list";
if (!b.en.includes(from)) throw new Error("10.1.35: phrase not found");
b.en = b.en.replace(from, "the enumeration contains nothing beyond what `TextRule.list` lists");
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.36 agreed; 10.1.35:", b.en);
