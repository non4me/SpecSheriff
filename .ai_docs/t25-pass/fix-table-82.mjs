// Check 10.1.23 is agreed in the proposed wording (the owner, 2026-11-13: «принято и согласовано»). Its English was read
// once in that wording and needs no fix.
// Check 10.1.24 in the new form: its approved words as the text, with their Russian, what it affects, its test, and one
// whole proposed wording that carries out the owner's rulings of 2026-11-08 (a project's own guidelines never implement
// the SpecSheriff guidelines) and 2026-11-11 ("refines or extends", as agreed 2.3 says, both by one `refines` link).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.23");
a.en = "Every rule of the appendix of the tools implements a rule for keeping the specification";
a.ru = "Каждое правило описания инструментов реализует правило ведения спецификации";
a.change =
  "Вы приняли формулировку (2026-11-13). Убрана ссылка: требование теперь стоит в 2.2, с которым проверка связана связью `checks`. " +
  "«узел базы guidelines» → «правило ведения спецификации»: базы guidelines больше нет (ваше решение от 2026-11-08), а «правила ведения спецификации» — имя этой части guidelines в 2.1.";
delete a.proposals;
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.24");
r.en = r.was.split(" | ")[0];
r.ru = "Каждое правило собственных guidelines проекта уточняет или реализует правило SpecSheriff guidelines";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждое правило собственных guidelines проекта. Каждое такое правило уточняет или расширяет правило SpecSheriff guidelines и связано с ним связью `refines` (правило 2.3). " +
  "Так на правило SpecSheriff guidelines можно положиться в любом проекте, а собственное правило проекта находят рядом с правилом, которое оно уточняет. " +
  "Это касается любого правила собственных guidelines, в том числе узла, который освобождает правило от реализации (9.7). " +
  "Сейчас инструменты принимают и связь `implements`; на шаге инструментов они перестанут её принимать.";
r.tests = ["unit/validate.test.ts: refuses a rule of a project's own guidelines that neither refines nor implements a rule of the SpecSheriff guidelines"];
r.proposals = [
  {
    en: "Every rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines",
    ru: "Каждое правило собственных guidelines проекта уточняет или расширяет правило SpecSheriff guidelines",
    why:
      "«реализует» → «расширяет». По вашему решению от 2026-11-08 собственные guidelines проекта никогда не реализуют SpecSheriff guidelines: реализует их только описание инструментов. " +
      "«Уточняет или расширяет» — слова согласованного 2.3. По вашему решению от 2026-11-11 оба случая обозначает одна связь `refines`; её значение в согласованном 6.1 расширим, когда закончим таблицу проверок.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "| agreed |", a.en);
console.log(r.num, "| proposal:", r.proposals[0].en);
