// Check 10.1.18 in the new form: what it touches, its tests, the Russian of tools 7.1.11. It needs no proposal; its
// English says "contains" in place of "holds", as agreed 8.1 does and as the Russian «содержит» means.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.18");
r.en = "Every section contains at least one rule";
r.about =
  "Затрагивает каждый раздел. Раздел ничего не требует сам, он собирает правила (правило 8.1), поэтому раздел без единого правила — пустая рамка, и проверка его отклоняет. " +
  "Правилом раздела считаются и термин в нём, и узел собственного вида проекта, и правило вложенного раздела (8.2). Статус раздела значения не имеет.";
r.tests = [
  "unit/validate.test.ts: refuses every section holding no rule, whatever its status",
  "unit/validate.test.ts: counts a node of a project's own kind as a rule of its section, and lets an exempts link reach it",
];
t.toolsRu["s-zhen42p6mnaxu7w"] = {
  title: "Раздел, в котором есть правило",
  text: "`sheriff validate` читает узлы под каждым разделом и под каждым вложенным в него разделом и ищет узел, который считается правилом (§s-7445ahgjck2aefg).",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.18 prepared:", r.en);
