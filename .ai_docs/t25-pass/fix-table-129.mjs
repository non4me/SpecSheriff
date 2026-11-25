// Check 10.1.43 is agreed unchanged (the owner, 2026-11-13, «ок»). The owner preferred the existing wording, which states
// what is checked, to the proposal of fix-table-128.mjs, which followed how the tool does it. How the tool does it is
// already in the appendix of the tools (s-vp24dqydygztqbt). Since "code" there includes the tests, a todo records that the
// reviewer is to be given the changed tests too.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.43");
delete a.proposals;
a.change =
  "Вы согласились с проверкой без изменений (2026-11-13): она говорит, что проверяется, а как это делает инструмент, сказано в описании инструментов (s-vp24dqydygztqbt).";
a.agreed = "2026-11-13";
a.todos = [
  "На шаге инструментов: передавать ревьюеру и изменённые тесты кода системы, а не только символы вне тестов, поскольку «код» в этой проверке включает тесты; тест, который проверяет то, чего правило не говорит, — тоже дефект.",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
const i = rows.findIndex((x) => x.num === "10.1.43");
for (const r of rows.slice(i + 1)) console.log(r.num, r.fate, "|", r.ru, "|", r.ruCost);
