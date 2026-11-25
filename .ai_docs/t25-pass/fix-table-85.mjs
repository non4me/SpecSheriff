// Check 10.1.26: the owner found «вне его тестов» awkward (2026-11-13: «опять кривая формулировка - вне его тестов»). The
// final wording now names the exception plainly: a symbol in a test. Agreed 1.5.2 has the same phrase; it is noted for the
// next time 1.5.2 changes.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.26");
r.proposals = [
  {
    en:
      "Every symbol of the system's code carries a SpecTag, except a symbol in a test. A nested symbol is covered by the SpecTag of the symbol that encloses it. " +
      "The SpecTag names the rule the symbol implements, including a rule of a project's own kind, or says that the symbol implements no rule | refused",
    ru:
      "У каждого символа кода системы есть SpecTag, кроме символов в тестах. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит. " +
      "SpecTag называет правило, которое символ реализует, в том числе правило собственного типа в проекте, или говорит, что символ не реализует никакого правила | отклоняется",
    why:
      "1) Цена «а пока спецификация — черновик… сообщается» ушла в расширение «Адоптация существующего проекта» (12.6), по вашему решению от 2026-11-11. " +
      "2) «вне его тестов» → «кроме символов в тестах», по вашему замечанию. " +
      "3) «узел» → «правило», «если он не реализует логики системы… и называет причину» → «говорит, что символ не реализует никакого правила» — слова согласованного 1.5.2; синтаксис такого SpecTag и его причина — в описании инструментов. " +
      "4) Добавлено, что вложенный символ покрыт SpecTag внешнего, как в 1.5.2: без этого проверка требовала бы SpecTag у каждого вложенного символа. " +
      "5) Добавлено «в том числе правило собственного типа в проекте», как в согласованных 9.7 и 10.1.19.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].en);
