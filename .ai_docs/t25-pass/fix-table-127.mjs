// Check 10.1.41 is agreed: the owner accepted the wording of fix-table-126.mjs (2026-11-13, «ок»).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const a = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.41");
const [en, cost] = a.proposals[0].en.split(" | ");
const [ru, ruCost] = a.proposals[0].ru.split(" | ");
Object.assign(a, { en, cost, ru, ruCost });
a.change =
  "Вы приняли эту формулировку (2026-11-13): вернулось то, что засчитываются символ и тест правила, которое реализует данное правило, как в его одобренном тексте и в узле 9.2.";
delete a.proposals;
a.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.41 agreed |", a.ru);
