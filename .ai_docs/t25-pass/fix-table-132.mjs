// Check 10.1.20a is agreed: the owner accepted the wording of fix-table-130.mjs and fix-table-131.mjs (2026-11-13, «ок»).
// Every check of the table that stays is now agreed.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.20a");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change =
  "Новая проверка, вы приняли её (2026-11-13): второе предложение согласованного 12.1.3, за которым раньше не следила ни одна проверка. Номер временный.";
delete a.proposals;
a.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
const st = rows.filter((r) => r.fate === "stays");
console.log("10.1.20a agreed; stays", st.length, "agreed", st.filter((r) => r.agreed).length);
