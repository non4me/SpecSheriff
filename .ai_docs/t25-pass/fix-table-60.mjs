// Check 10.1.14 is agreed with its text and its reason (the owner, 2026-11-13). Check 10.1.15 in the new form: its approved
// words as the text, with their Russian, what it touches, its test, the Russian of tools 7.1.8, and one proposal: the
// sentence split in two (7.5), and "of the specification" as in agreed 6.5.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.15");
r.en = r.was.split(" | ")[0];
r.ru = "Связь `term-relation` или `uses` связывает два термина, и никакой другой тип связи, включая `cites`, не связывает двух терминов";
r.about =
  "Затрагивает связи между терминами. Только `term-relation` и `uses` связывают два термина, и каждая из них связывает именно термины. " +
  "Связь другого типа между двумя терминами, даже `cites`, отклоняется: термин, ссылающийся на другой термин, объявляет `term-relation` или `uses` (правило 6.5). " +
  "Какую из двух выбрать и с каким соотношением, решают с ответственными за спецификацию; поэтому цена — отказ и решение вместе с ними.";
r.tests = ["unit/validate.test.ts: refuses a term-relation not binding two terms, and a link of another type binding two"];
t.toolsRu["s-pvnnr844f3y964m"] = {
  title: "Типы узлов на концах связи",
  text: "`sheriff validate` определяет тип узла (NodeKind) на каждом конце каждой исходящей связи и сопоставляет его с типом связи.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "A `term-relation` or a `uses` link binds two terms. No other type of link, `cites` included, binds two terms of the specification",
    ru: "Связь `term-relation` или `uses` связывает два термина. Никакой другой тип связи, включая `cites`, не связывает двух терминов спецификации",
    why: "Одна мысль в предложении (7.5): две фразы вместо одной. «Терминов спецификации» — как в согласованном 6.5.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.15 proposals:", r.proposals.length);
