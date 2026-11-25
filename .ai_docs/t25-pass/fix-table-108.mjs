// Check 10.1.32 is agreed: the owner accepted the wording of fix-table-107.mjs (2026-11-13, «ок»).
// Check 10.1.33 in the new form, with one whole proposed wording checked against node 7.17: generators went to the
// extension 12.5, the commit is no longer an actor, and the Russian says «есть ... SpecTag», as the owner asked.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.32");
{
  const [en, cost] = a.proposals[0].en.split(" | ");
  const [ru, ruCost] = a.proposals[0].ru.split(" | ");
  Object.assign(a, { en, cost, ru, ruCost });
  a.change =
    "Вы приняли эту формулировку (2026-11-13): второе предложение ушло — запрет на тест черновика держит согласованная 10.1.28a; генераторы ушли в 12.5, цена в черновике — в 12.6.";
  delete a.proposals;
  a.agreed = "2026-11-13";
}

const r = rows.find((x) => x.num === "10.1.33");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "У каждой собственной проверки или генератора проекта, код которых коммит добавляет или меняет, есть тест с SpecTag правила, которое их перечисляет";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый коммит, который добавляет или меняет код собственной проверки проекта. " +
  "Это та же часть «тест первым» (1.4.1), что 10.1.31 для кода системы: код собственной проверки не связан SpecTag (9.1), поэтому тест ищут по правилу, которое перечисляет проверку.";
r.tests = [];
r.todos = ["Тестов у этой проверки в таблице не названо; на шаге инструментов найти или написать тест."];
r.proposals = [
  {
    en: "Every own check of a project whose code is added or changed in a commit has a test that carries the SpecTag of the rule listing the check | refused",
    ru: "У каждой собственной проверки проекта, код которой добавлен или изменён в коммите, есть тест с SpecTag правила, которое её перечисляет | отклоняется",
    why: "1) Генераторы ушли в расширение 12.5. 2) Коммит больше не действующее лицо. 3) Короче по 7.17: «тест, связанный SpecTag с правилом» → «тест с SpecTag правила».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.32 agreed |", r.num, "|", r.proposals[0].ru);
