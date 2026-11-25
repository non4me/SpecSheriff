// Check 10.1.25 is agreed in the owner's own words (2026-11-13: «Ни один проект, кроме самого SpecSheriff, не хранит
// копию guidelines включая его json схему»), punctuation corrected and "JSON-схему" spelt as agreed 10.1.2 spells it; the
// English says what the Russian means.
// Check 10.1.26 in the new form: its approved words as the text, with their Russian, what it affects, its tests, the
// Russian of tools 7.2.2, and one whole proposed wording in the words of agreed 1.5.2: the draft-time cost moved to the
// Adoption extension (12.6), "node" is "rule", the SpecTag of a symbol implementing no rule says only that, a nested
// symbol is covered by the symbol enclosing it, and a rule of a project's own kind is named, as in agreed 10.1.19.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.25");
a.en = "No project other than SpecSheriff itself keeps a copy of the guidelines, including their JSON Schema";
a.ru = "Ни один проект, кроме самого SpecSheriff, не хранит копию guidelines, включая его JSON-схему";
a.change =
  "Ваша формулировка (2026-11-13). Смысл прежний: копию SpecSheriff guidelines и их JSON-схемы хранит только SpecSheriff, где они пишутся (2.4).";
delete a.proposals;
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.26");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru =
  "Каждый символ кода системы вне его тестов связан SpecTag с узлом, который он реализует, или, если он не реализует логики системы, помечен SpecTag, который говорит об этом и называет причину";
r.ruCost = "отклоняется, а пока спецификация — черновик, по символу, который коммит не меняет, — сообщается";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый символ кода системы вне тестов: функцию, класс или его член, тип, константу, компонент (правило 1.5.2). " +
  "По SpecTag видно, какое правило символ реализует; по ним же находят код, потерявший связь со спецификацией. " +
  "Тесты несут SpecTag в имени или в метке и здесь не читаются. Конфигурация репозитория и его собственные инструменты кодом системы не являются.";
r.tests = [
  "unit/binding.test.ts: refuses a symbol of the system's code carrying no tag",
  "unit/binding.test.ts: refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes",
  "unit/binding.test.ts: refuses a tag that stands on no symbol",
];
t.toolsRu["s-9rtrj24myzjvshu"] = {
  title: "SpecTag на коде системы",
  text:
    "`sheriff binding` читает SpecTag каждого символа кода системы. SpecTag связывает символ с узлом, который символ реализует. Код системы — это код, реализующий спецификацию, вместе с его тестами.\n\n" +
    "- Тест несёт SpecTag в своём имени или в метке на нём (§s-zrsc6asgmhv8tnc), поэтому символы тестов не читаются.\n" +
    "- Конфигурация репозитория, его собственные инструменты и их тесты не код системы (§s-hheus6f395ynqvc) и не читаются.\n" +
    "- Вложенный символ покрыт SpecTag символа, внутри которого он стоит.\n" +
    "- sid в SpecTag ищется среди узлов. sid в SpecTag на изменённом символе ищется среди одобренных узлов. Символ изменён, если строка, которую меняет коммит, относится к нему (§s-2x58az67bm6cxq2).\n" +
    "- Пока коммит оставляет спецификацию черновиком (§s-j9r8z4xdrfkfs47), о символе без SpecTag, который коммит не меняет, сообщается по символу, а не отказывается (§s-kkbqcb9xrpaepwn).",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en:
      "Every symbol of the system's code outside its tests carries a SpecTag. A nested symbol is covered by the SpecTag of the symbol that encloses it. " +
      "The SpecTag names the rule the symbol implements, including a rule of a project's own kind, or says that the symbol implements no rule | refused",
    ru:
      "У каждого символа кода системы вне его тестов есть SpecTag. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит. " +
      "SpecTag называет правило, которое символ реализует, в том числе правило собственного типа в проекте, или говорит, что символ не реализует никакого правила | отклоняется",
    why:
      "1) Цена «а пока спецификация — черновик… сообщается» ушла в расширение «Адоптация существующего проекта» (12.6), по вашему решению от 2026-11-11. " +
      "2) «узел» → «правило», «если он не реализует логики системы… и называет причину» → «говорит, что символ не реализует никакого правила» — слова согласованного 1.5.2; форма такого SpecTag и его причина — в описании инструментов. " +
      "3) Добавлено, что вложенный символ покрыт SpecTag внешнего, как в 1.5.2: без этого проверка требовала бы SpecTag у каждого вложенного символа. " +
      "4) «в том числе правило собственного типа в проекте» — как в согласованных 9.7 и 10.1.19.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "| agreed |", a.en);
console.log(r.num, "| proposal:", r.proposals[0].en);
