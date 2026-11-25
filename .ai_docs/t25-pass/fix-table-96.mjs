// New check 10.1.28a: the owner accepted the wording of fix-table-93.mjs (2026-11-13, «ок»). It becomes the row's
// wording; the owner is asked to agree to the check separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.28a");
const [en, cost] = r.proposals[0].en.split(" | ");
const [ru, ruCost] = r.proposals[0].ru.split(" | ");
Object.assign(r, { en, cost, ru, ruCost });
r.change =
  "Новая проверка, по вашему решению от 13 ноября; вы приняли её формулировку в тот же день. Черновик не реализуют — со стороны правила (согласованный 1.3.2). " +
  "Других проверок с этим требованием нет; 10.1.30 и 10.1.32 повторяют его кусками и потеряют эти куски, когда дойдём до них. Номер временный.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
