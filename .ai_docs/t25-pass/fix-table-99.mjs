// Check 10.1.29: the owner accepted the wording of fix-table-98.mjs (2026-11-13, «ок»). It becomes the row's wording;
// the owner is asked to agree to the check separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.29");
const [en, cost] = r.proposals[0].en.split(" | ");
const [ru, ruCost] = r.proposals[0].ru.split(" | ");
Object.assign(r, { en, cost, ru, ruCost });
r.change =
  "Вы приняли эту формулировку (2026-11-13). «На символе» → «непосредственно перед символом», по вашему предложению; убран круг «на том символе, который он связывает»; " +
  "«вне тестов» → «кроме тестов», «код» → «код системы», как в согласованном 10.1.26.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
