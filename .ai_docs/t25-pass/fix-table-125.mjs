// Check 10.1.39 is agreed in the wording of fix-table-124.mjs (the owner, 2026-11-13: «оставим как есть»). The owner first
// thought it duplicated check 10.1.28, then judged that a node named by its sid covers both forms, a SpecTag and `§<sid>`.
// The decision the owner recalled, that tests carry a SpecTag as code does instead of a bare sid (s-rah8b37kytb682y,
// 2026-11-06), concerns binding code and tests to rules, not citations in comments or documents.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const a = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.39");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change =
  "Вы приняли эту формулировку (2026-11-13): fixtures названы полностью, ссылка называет узел спецификации; под «по его sid» подпадают обе формы, SpecTag и `§<sid>`.";
delete a.proposals;
a.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.39 agreed |", a.ru);
