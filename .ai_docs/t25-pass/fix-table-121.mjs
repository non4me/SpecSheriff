// Check 10.1.36: the proposal names the field that names the property, `TextRule.list.property`, instead of saying that
// the list names it.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.36");
r.proposals = [
  {
    en: "Each member of `TextRule.list` that is an object has the property that `TextRule.list.property` names | refused",
    ru: "У каждого члена `TextRule.list`, который является объектом, есть свойство, которое называет `TextRule.list.property` | отклоняется",
    why: "«Свойство, которое называет список» не говорит, где список его называет. Его называет поле `TextRule.list.property`.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
