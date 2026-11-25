// Check 10.1.20, a new row: what it affects, and the gap it leaves at the tools step. Its text is the draft written when
// table 10.1 was drafted, from agreed 6.1 and 12.1.2; it is new, so it goes to the reviewer before it is shown.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.20");
r.about =
  "Затрагивает каждую связь `overrides`, то есть каждое изменение основного правила расширением guidelines (правила 12.1.2 и 6.1). " +
  "Такую связь может объявить только узел расширения guidelines, и вести она может только к основному правилу — правилу guidelines вне расширений. " +
  "По этой связи тот, кто читает основное правило, видит, что в проекте с расширением оно действует иначе. " +
  "Инструменты этого пока не проверяют: ни один узел описания инструментов эту проверку не реализует, тестов нет. Добавим на шаге инструментов.";
r.tests = [];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.en);
