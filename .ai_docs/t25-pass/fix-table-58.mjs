// Check 10.1.14, at the owner's word (2026-11-13: «я бы разделил - первое предложение: Ни один узел не ссылается на другой
// по его расположению. После может быть уточнение для исключения ... Нужно его лучше сформулировать»): the proposal is
// replaced by two sentences, the rule first and the exception apart, and the purpose of the exception moves to an
// optional reason.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.14");
r.proposals = [
  {
    en: "No node of the specification cites another by its location. A § followed by a location and formatted as code is not considered a citation",
    ru: "Ни один узел спецификации не ссылается на другой по его расположению. Знак § с расположением, оформленный как код, ссылкой не считается",
    why:
      "По вашему замечанию: правило отдельно, исключение отдельно. Исключение сказано через то, что видно в тексте: знак § с расположением, оформленный как код. " +
      "«Узел спецификации» — как в согласованных 10.1.3–10.1.13: архивный узел хранит свою последнюю формулировку как есть.",
  },
  {
    en: "Reason: This lets a node show what a refused citation looks like.",
    ru: "Обоснование: Так узел может показать, как выглядит запрещённая ссылка.",
    why: "Необязательное обоснование: зачем нужно исключение.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.14 proposals:", r.proposals.length);
