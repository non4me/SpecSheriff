// Check 10.1.35 is agreed (2026-11-13). The owner pointed out that a JSON Schema describes a format and may name no
// values at all, as `{"type": "string"}` does, so the check runs from the list to the schema: each listed value is valid
// against the schema, and an `enum` at that place contains nothing the list does not list. The owner agreed to the
// sentence on the code symbol first, then accepted the whole wording.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.35");
Object.assign(r, {
  en:
    "Each value listed in `TextRule.list` is valid against the JSON Schema at the place that `TextRule.list.jsonSchema` points to. " +
    "Where the schema at that place gives an exact enumeration (`enum`), the enumeration contains nothing that `TextRule.list` does not list. " +
    "The code symbol that `TextRule.list.valueList` points to declares exactly the values listed in `TextRule.list`",
  cost: "refused",
  ru:
    "Каждое значение, перечисленное в `TextRule.list`, соответствует JSON-схеме в месте, на которое указывает `TextRule.list.jsonSchema`. " +
    "Если схема в этом месте задаёт точное перечисление (`enum`), в нём нет ничего сверх перечисленного в `TextRule.list`. " +
    "Символ кода, на который указывает `TextRule.list.valueList`, объявляет ровно те значения, что перечислены в `TextRule.list`",
  ruCost: "отклоняется",
  change:
    "Вы приняли эту формулировку (2026-11-13). `declaredIn` заменён двумя свойствами списка, `jsonSchema` и `valueList`. " +
    "Схема описывает формат, а не значения, поэтому проверка идёт от списка к схеме; точное перечисление (`enum`) не шире списка правила.",
  agreed: "2026-11-13",
});
delete r.proposals;
r.todos = [
  "На шаге инструментов, по вашим решениям от 2026-11-13: в node.schema.json заменить `TextRule.list.declaredIn` двумя свойствами `TextRule.list` — `jsonSchema` ({file, pointer}) и `valueList` ({file, symbol}); " +
    "в `binding.ts` проверять каждое значение списка по схеме в месте `pointer` (через ajv, который инструменты уже используют), а если там `enum` — ещё и отсутствие в нём лишних значений; " +
    "убрать сравнение с ключами произвольного JSON-объекта (функция `declaration`); перевести на новые свойства узлы 1.5 и 2.2 spec.json и узел 10 tools.json; записать решение в `meta.decisions` правила о списках.",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.35 agreed |", r.ru);
