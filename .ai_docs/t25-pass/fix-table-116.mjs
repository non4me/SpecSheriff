// Check 10.1.35 after the owner's ruling of 2026-11-13: `TextRule.list.declaredIn` mixed two formats in one field
// (a JSON pointer for any .json file, a symbol's name for code). It is split into two keys named for what they hold:
// `jsonSchema` ({file, pointer}: a place in a JSON Schema, an enum or an object's keys; the model) and `valueList`
// ({file, symbol}: the values a symbol of the system's code declares; the implementation). Support for any other JSON
// goes, since no rule needs it. The check's wording names both, and makes the declaration follow the rule.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.35");
r.todos = [
  "На шаге инструментов, по вашему решению от 2026-11-13: в node.schema.json разделить `TextRule.list.declaredIn` на `jsonSchema` ({file, pointer}) и `valueList` ({file, symbol}); убрать поддержку произвольного JSON в `binding.ts` (функция `declaration`); перевести на новые ключи узлы 1.5 и 2.2 spec.json и узел 10 tools.json; записать решение в `meta.decisions` правила о списках.",
];
r.proposals = [
  {
    en: "Where `TextRule.list.declaredIn` names a place in a JSON Schema or a value list in the code, that place or list holds the same members as `TextRule.list` | refused",
    ru: "Если `TextRule.list.declaredIn` называет место в JSON-схеме или перечень значений в коде, там те же члены, что у `TextRule.list` | отклоняется",
    why:
      "По вашему решению `declaredIn` делится на `jsonSchema` (место в JSON-схеме, то есть модель) и `valueList` (перечень значений в коде, то есть реализация); произвольный JSON больше не поддерживается. " +
      "Подлежащее — объявление: оно следует за списком правила, источник — спецификация.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
