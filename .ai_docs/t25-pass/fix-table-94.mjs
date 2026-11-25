// Check 10.1.28: the owner accepted the wording of fix-table-93.mjs (2026-11-13, «ок»). It becomes the row's wording;
// the owner is asked to agree to the check separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.28");
const [en, cost] = r.proposals[0].en.split(" | ");
const [ru, ruCost] = r.proposals[0].ru.split(" | ");
Object.assign(r, { en, cost, ru, ruCost });
r.change =
  "Вы приняли эту формулировку (2026-11-13). Проверка разделена по вашему решению: здесь только существование правила, запрет реализовывать черновик — в новой 10.1.28a. " +
  "«Узел» → «правило»; «который называет правило» — по согласованному 10.1.26 SpecTag может говорить, что символ не реализует никакого правила.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
