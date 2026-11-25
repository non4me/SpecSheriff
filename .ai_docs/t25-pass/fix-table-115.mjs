// Check 10.1.35 in the new form, with one whole proposed wording. The owner objected to "match" for a list that holds
// references (10.1.34); here the list must hold the same members as the declaration it names, so the wording says that.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.35");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "Список, который есть у узла, соответствует объявлению в коде, схеме или настройках, которое он называет";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждое правило, чей список (`TextRule.list`) повторяет перечисление, объявленное в коде, в схеме или в настройках. " +
  "Без проверки список в спецификации и объявление расходятся незаметно: в коде добавили значение, а правило о нём молчит.";
r.tests = ["unit/binding.test.ts: compares a list whose members are objects by the property it names, and a JSON object by its keys"];
r.proposals = [
  {
    en: "Where `TextRule.list.declaredIn` names a declaration in the code, the schema or the settings, `TextRule.list` has the same members as that declaration | refused",
    ru: "Если `TextRule.list.declaredIn` называет объявление в коде, схеме или настройках, у `TextRule.list` те же члены, что у этого объявления | отклоняется",
    why: "«Соответствует» → «те же члены, что у этого объявления»: так видно, что именно сравнивается. Список назван через свойство своего объекта (7.9).",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
