// Check 10.1.5 of the table of checks, in the new form: its approved words stay as the text, with what it touches, its
// tests, the Russian of the tools node 7.1.4 that implements it, and one proposal beside them. Like the agreed 10.1.3 and
// 10.1.4, the proposal speaks of the nodes of the specification: an archived node keeps the location it had when it was
// removed, which no longer names where it is.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.5");
r.about =
  "Затрагивает расположение каждого узла спецификации: совпадает ли расположение, записанное в файле, с тем, которое даёт место узла в дереве. " +
  "Расположение пишет `sheriff reindex`, вручную его не пишет никто; проверка ловит файл, который правили в обход reindex.";
r.tests = [
  "unit/validate.test.ts: refuses a location other than the one its place gives",
  "e2e/commands.test.ts: sheriff validate passes what holds together and refuses what does not, naming where",
  "e2e/hooks.test.ts: the pre-commit hook refuses a commit whose specification does not hold together",
];
t.toolsRu["s-stxmhq3hgfndvn6"] = {
  title: "Расположения вычисляются заново",
  text: "`sheriff validate` вычисляет в памяти расположение каждого узла по его месту и сравнивает его с расположением, записанным в его файле.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "The location of each node of the specification names where that node is in the specification",
    ru: "Расположение каждого узла спецификации называет, где этот узел находится в спецификации",
    why:
      "Как в согласованных 10.1.3 и 10.1.4. Архивный узел хранит расположение, которое у него было при удалении, и оно уже не называет, где он находится. " +
      "Инструменты и сейчас сравнивают расположения только у узлов спецификации (validate.ts, locations).",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.5 proposals:", r.proposals.length);
