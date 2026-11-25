// Check 10.1.31 in the new form: its approved words as the text, with their Russian, what it affects, its test, and one
// whole proposed wording, checked against node 7.17. The draft's English already said what is needed; the Russian is
// shortened, and "carrying" becomes "that carries".
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.31");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "У каждого правила или узла собственного NodeKind проекта, которому нужен код, если коммит добавляет или меняет написанный для него код, есть тест с его SpecTag";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый коммит, который добавляет или меняет код, реализующий правило. " +
  "Это детерминированная часть согласованного 1.4.1: тест пишется первым, код — вторым. Проверить порядок написания нельзя, но можно проверить, что у правила, чей код меняется, тест уже есть.";
r.tests = ["unit/binding.test.ts: refuses a rule whose code a commit adds or changes with no test carrying its sid"];
r.proposals = [
  {
    en: "Every rule whose code is added or changed in a commit has a test that carries its SpecTag | refused",
    ru: "У каждого правила, код которого добавлен или изменён в коммите, есть тест с его SpecTag | отклоняется",
    why:
      "1) «Узел собственного NodeKind, которому нужен код» → «правило»: правило собственного типа — тоже правило (согласованные 9.7 и 10.1.19). " +
      "2) Коммит больше не действующее лицо. 3) Короче по 7.17: «связанный с ним SpecTag» → «с его SpecTag».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
