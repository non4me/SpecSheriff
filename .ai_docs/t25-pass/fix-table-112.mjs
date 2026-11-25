// Check 10.1.34 in the new form, with one whole proposed wording checked against node 7.17. Under agreed node 9.6 the
// SpecSheriff tools build a node's lists of its code and its tests, so the check catches lists that fell behind the
// SpecTags or were edited by hand.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.34");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "`meta.code` и `meta.tests` узла — то, что дают SpecTag на коде и на тестах";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый узел, к которому SpecTag привязывают код или тесты. По согласованному 9.6 списки `meta.code` и `meta.tests` строят инструменты SpecSheriff, вручную их не пишут. " +
  "Проверка ловит списки, которые отстали от SpecTag или которые поправили вручную.";
r.tests = [
  "unit/binding.test.ts: refuses a node's lists of code and tests that the tags and the tests' sids do not produce",
  "unit/binding.test.ts: holds a node naming the symbols in a file to them",
  "unit/binding.test.ts: refuses a node naming the symbols in a file that leaves out one its tag stands on",
];
r.proposals = [
  {
    en: "A node's `meta.code` and `meta.tests` match the SpecTags in the code and in the tests | refused",
    ru: "`meta.code` и `meta.tests` узла соответствуют SpecTag в коде и в тестах | отклоняется",
    why: "Короче по 7.17: «то, что дают SpecTag» → «соответствуют SpecTag». По согласованному 9.6 списки строят инструменты; проверка ловит списки, отставшие от SpecTag или поправленные вручную. Смысл прежний.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
