// Check 10.1.35: the owner asked why they should agree to a wording in the old format, since `declaredIn` is to be split
// (2026-11-13). The final wording names the two new keys, one sentence each.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.35");
r.proposals = [
  {
    en:
      "The place in a JSON Schema that `TextRule.list.declaredIn.jsonSchema` points to holds the same members as `TextRule.list`. " +
      "The value list that `TextRule.list.declaredIn.valueList` points to holds the same members as `TextRule.list` | refused",
    ru:
      "Место в JSON-схеме, на которое указывает `TextRule.list.declaredIn.jsonSchema`, содержит те же члены, что `TextRule.list`. " +
      "Перечень значений, на который указывает `TextRule.list.declaredIn.valueList`, содержит те же члены, что `TextRule.list` | отклоняется",
    why:
      "В новом формате, по вашему решению: `declaredIn` делится на `jsonSchema` (место в JSON-схеме, модель) и `valueList` (перечень значений в коде, реализация). " +
      "По предложению на каждый ключ. Подлежащее — объявление: оно следует за списком правила.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
