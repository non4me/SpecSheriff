// Check 10.1.20 is agreed with the proposal (the owner, 2026-11-13: «принимаю и согласовано»): its second sentence
// requires the text of a node declaring an `overrides` link to cite the link's target, as 10.1.19 requires for `exempts`.
// 12.1.2 gains the same requirement when part 12 is reviewed. Check 10.1.21 is then put to the owner for deletion, since
// 10.1.20 refuses every link 10.1.21 refuses.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const r = rows.find((x) => x.num === "10.1.20");
r.en =
  "An `overrides` link goes from a node of an extension of the guidelines to a main rule. " +
  "The text of a node that declares an `overrides` link cites the node the link names";
r.ru =
  "Связь `overrides` идёт от узла расширения guidelines к основному правилу. " +
  "Текст узла, который объявляет связь `overrides`, ссылается на узел, который эта связь называет";
r.change =
  "Новая строка, по согласованным 6.1 и 12.1.2. Вы приняли предложение рецензента (2026-11-13): второе предложение о ссылке в тексте, как в 10.1.19. " +
  "То же требование добавится в 12.1.2, когда дойдём до части 12.";
r.about =
  "Затрагивает каждую связь `overrides`, то есть каждое изменение основного правила расширением guidelines (правила 12.1.2 и 6.1). " +
  "Такую связь может объявить только узел расширения guidelines, и вести она может только к основному правилу — правилу SpecSheriff guidelines вне расширений. " +
  "Текст узла расширения ссылается на правило, которое он изменяет, поэтому связь сверена с одобренной формулировкой. " +
  "По этой связи тот, кто читает основное правило, видит, что в проекте с расширением оно действует иначе. " +
  "Инструменты этого пока не проверяют: ни один узел описания инструментов эту проверку не реализует, тестов нет. Добавим на шаге инструментов.";
delete r.proposals;
r.agreed = "2026-11-13";

const s = rows.find((x) => x.num === "10.1.21");
s.about =
  "Затрагивает каждый узел собственных guidelines проекта: такой узел не объявляет связь `overrides` (правило 12.1.2). " +
  "Проверка 10.1.20 уже отклоняет такую связь: она допускает связь `overrides` только от узла расширения guidelines, а узел собственных guidelines проекта узлом расширения не бывает (12.1.1). " +
  "Ни один узел описания инструментов эту проверку не реализует, тестов нет.";
s.tests = [];
s.proposals = [
  {
    en: "Check 10.1.21 is deleted.",
    ru: "Проверка 10.1.21 удаляется.",
    why:
      "Она отклоняет только то, что уже отклоняет согласованная 10.1.20: связь `overrides` допустима лишь от узла расширения guidelines, а расширение — часть SpecSheriff guidelines, а не собственных guidelines проекта (12.1.1). " +
      "Так же 10.1.4 была удалена, потому что её покрывала 10.1.5. Строка новая и никогда не одобрялась, поэтому она удаляется, а не уходит в архив.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| agreed |", r.en);
console.log(s.num, "| proposals", s.proposals.length);
