// The owner, 2026-11-12 («ок»): check 10.1.4 is removed, since 10.1.5 implies it. When every node of the specification has
// the location its place gives, two nodes can share a location only through a hand edit, and 10.1.5 refuses that edit.
// Check 10.1.5 takes its proposal; its agreement is asked for separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const four = rows.find((x) => x.num === "10.1.4");
four.fate = "deleted";
four.en = "";
four.ru = "";
four.num = null;
delete four.agreed;
four.change =
  "Удаляется (вы, 2026-11-12): требование следует из 10.1.5. Если у каждого узла спецификации расположение такое, какое даёт его место, два узла получают одно расположение только при ручной правке, и её отклоняет 10.1.5. " +
  "Одинаково названные термины отклоняет своя проверка. На шаге инструментов 7.1.3 перестаёт считать расположения.";

const five = rows.find((x) => x.num === "10.1.5");
const [text] = five.proposals;
five.en = text.en;
five.ru = text.ru;
five.change =
  "«Every node's location names where it is in the specification» стало «The location of each node of the specification names where that node is in the specification»: " +
  "архивный узел хранит расположение, которое у него было при удалении. Принято вами 2026-11-12; проверка 10.1.4 удалена как следствие этой.";
five.about +=
  " Отсюда же следует, что никакие два узла спецификации не имеют одного расположения: поэтому отдельная проверка 10.1.4 удалена.";
delete five.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.4 deleted; 10.1.5:", five.en);
