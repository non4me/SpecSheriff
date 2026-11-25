// Check 10.1.31 is agreed: the owner accepted the wording of fix-table-105.mjs (2026-11-13, «ок»).
// Check 10.1.26a, agreed the same day: the one reading of its English after the agreement. "Puts it" carried the Russian
// «ставит» over; the appendix prescribes the place. The English alone changes.
// Check 10.1.32 in the new form, with one whole proposed wording: its second sentence goes, since agreed 10.1.28a now
// forbids every test of a draft rule to be added or changed; generators went to the extension 12.5, and the cost while the
// specification is a draft to 12.6.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.31");
{
  const [en, cost] = a.proposals[0].en.split(" | ");
  const [ru, ruCost] = a.proposals[0].ru.split(" | ");
  Object.assign(a, { en, cost, ru, ruCost });
  a.change = "Вы приняли эту формулировку (2026-11-13): «узел собственного NodeKind» → «правило»; коммит не действующее лицо; короче по 7.17.";
  delete a.proposals;
  a.agreed = "2026-11-13";
}

const b = rows.find((x) => x.num === "10.1.26a");
const from = "The SpecTag is where the appendix of the tools puts it for the test's language";
if (!b.en.includes(from)) throw new Error("10.1.26a wording changed");
b.en = b.en.replace(from, "The SpecTag is placed where the appendix of the tools prescribes for the test's language");

const r = rows.find((x) => x.num === "10.1.32");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "Каждый тест собственной проверки или генератора проекта несёт SpecTag правила, которое его перечисляет, а тест, который коммит добавляет или меняет, — SpecTag одобренного";
r.ruCost = "отклоняется, а пока спецификация — черновик, по тесту без SpecTag, который коммит не меняет, — сообщается";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый тест собственной проверки проекта. Собственные проверки — не код системы (9.1), поэтому 10.1.26a их тесты не охватывает. " +
  "Тест связывают с правилом, которое перечисляет проверку: так видно, какое требование проверка выполняет.";
r.tests = [];
r.todos = ["Тестов у этой проверки в таблице не названо; на шаге инструментов найти или написать тест для 7.2.4 о тестах собственных проверок."];
r.proposals = [
  {
    en: "Every test of a project's own check carries the SpecTag of the rule that lists the check | refused",
    ru: "Каждый тест собственной проверки проекта несёт SpecTag правила, которое перечисляет эту проверку | отклоняется",
    why:
      "1) Второе предложение ушло: запрет добавлять или менять тест правила-черновика для любого теста уже держит согласованная 10.1.28a. " +
      "2) Генераторы ушли в расширение 12.5, цена в черновике — в 12.6, как решено раньше. 3) Коммит больше не действующее лицо.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.31 agreed | 10.1.26a:", b.en, "\n10.1.32:", r.proposals[0].ru);
