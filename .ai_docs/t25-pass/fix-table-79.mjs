// Check 10.1.22 is agreed in the reworded form (the owner, 2026-11-13: «подходит согласовано»). Its English was read once;
// one fix to the English alone: "are exempt from this requirement", since the Russian says «от этого освобождены».
// Check 10.1.23 in the new form: its approved words as the text, with their Russian, what it affects, its test, and two
// proposals that carry out decisions already made: the owner's ruling of 2026-11-08 that there is no "base of the
// guidelines", and the agreed node 2.2, which now states what the cited node 2.1 used to state.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.22");
a.en =
  "Every node of the technical appendix other than a section implements a node of the base specification. " +
  "Nodes in the section on the stack and in the technical debt section are exempt from this requirement";
a.ru =
  "Каждый узел технического приложения, кроме раздела, реализует узел базовой спецификации. " +
  "Узлы в разделе стека и в разделе технического долга от этого освобождены";
a.change =
  "Вы приняли предложение (2026-11-13): ушло «, и каждое правило технического долга уточняет такой узел», потому что по согласованному 4.4 описание недостатка может уточнять узел, но не обязано. " +
  "По вашей просьбе формулировка переписана: раздел исключён по типу узла в первом предложении, узлы двух разделов освобождены по месту во втором.";
delete a.proposals;
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.23");
r.en = r.was.split(" | ")[0];
r.ru = "Каждое правило описания инструментов (§s-a4rbry4hsu34hy8) реализует узел базы guidelines";
r.change = "Одобренная формулировка не менялась. Изменения — в предложениях.";
r.about =
  "Затрагивает каждое правило описания инструментов SpecSheriff. Каждое такое правило реализует хотя бы одно правило guidelines вне описания инструментов (правило 2.2): " +
  "так правило описания инструментов находят и читают рядом с правилом, которое оно реализует, когда то меняется.";
r.tests = ["unit/validate.test.ts: refuses a rule of the appendix of the tools implementing no node of the base of the guidelines"];
r.proposals = [
  {
    en: "\"(§s-a4rbry4hsu34hy8)\" becomes \"(§s-uxtyyen92jygth4)\"",
    ru: "«(§s-a4rbry4hsu34hy8)» становится «(§s-uxtyyen92jygth4)»",
    why:
      "Ссылка ведёт на прежний узел 1.21, теперь согласованный 2.1 «Структура guidelines». Требование, что каждое правило описания инструментов реализует правило guidelines, теперь стоит в согласованном 2.2 «Описание инструментов реализует guidelines».",
  },
  {
    en: "\"implements a node of the base of the guidelines\" becomes \"implements a rule of the guidelines outside that appendix\"",
    ru: "«реализует узел базы guidelines» становится «реализует правило guidelines вне этого описания»",
    why:
      "«Базы guidelines» больше нет: по вашему решению от 2026-11-08 guidelines состоят из правил и описания инструментов (согласованный 2.1). «Правило», а не «узел» — как в согласованном 2.2.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "| agreed |", a.en);
console.log(r.num, "| proposals", r.proposals.length);
