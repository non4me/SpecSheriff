// Check 10.1.34 is agreed: the owner accepted the wording of fix-table-113.mjs (2026-11-13, «ок»).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.34");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change = "Вы приняли эту формулировку (2026-11-13): списки содержат ссылки на все файлы кода и тестов с SpecTag узла и ни на какие другие.";
delete a.proposals;
a.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.34 agreed");
for (const n of ["10.1.35", "10.1.36"]) console.log(JSON.stringify(rows.find((x) => x.num === n), null, 1));
