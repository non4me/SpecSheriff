// Check 10.1.26a: the owner accepted the return of "of the system's code" (2026-11-13: «вопросов нет … Давай дальше»),
// which follows from agreed node 10.8. The check stays agreed.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.26a");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.rests = a.rests.filter((s) => s !== "s-sfjka4zc4rhfu67");
a.change += " По согласованному 10.8 «кода системы» возвращено: SpecTag есть только в коде и тестах системы.";
delete a.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "|", a.ru);
const r = rows.find((x) => x.num === "10.1.34");
console.log(JSON.stringify(r, null, 1));
