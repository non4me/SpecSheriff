// Check 10.1.35: the owner objected that a JSON Schema does not contain members; it describes the model of what may stand
// there (2026-11-13: «Как может JSON-схема содержать те же члены? Она может содержать описание форматов … или модель
// членов»). The sentence on the schema now says what values the schema allows; the sentence on the value list says what
// values it holds.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.35");
r.proposals = [
  {
    en:
      "At the place that `TextRule.list.declaredIn.jsonSchema` points to, the JSON Schema allows exactly the values listed in `TextRule.list`. " +
      "The value list that `TextRule.list.declaredIn.valueList` points to holds exactly the values listed in `TextRule.list` | refused",
    ru:
      "В месте, на которое указывает `TextRule.list.declaredIn.jsonSchema`, JSON-схема допускает ровно те значения, что перечислены в `TextRule.list`. " +
      "Перечень значений, на который указывает `TextRule.list.declaredIn.valueList`, содержит ровно те значения, что перечислены в `TextRule.list` | отклоняется",
    why:
      "По вашему замечанию: JSON-схема не содержит членов, она описывает модель — какие значения допустимы. Поэтому для схемы — «допускает ровно те значения», для перечня в коде — «содержит ровно те значения». " +
      "Источник — список правила: схема и перечень следуют за ним.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
