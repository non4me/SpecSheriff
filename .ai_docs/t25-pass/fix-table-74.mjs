// Check 10.1.21 is deleted (the owner, 2026-11-13: «ок»): the agreed check 10.1.20 refuses every link it refused. It was
// never approved, so it is deleted, not archived, and loses its number as 10.1.4 did.
// Check 10.1.22 in the new form: its approved words as the text, with their Russian, what it affects, its test, the
// Russian of tools 7.1.21, and one proposal that carries out agreed 4.4 (a description of technical debt may refine the
// nodes it concerns, but need not).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const d = rows.find((x) => x.num === "10.1.21");
d.fate = "deleted";
d.change = "Удаляется (вы, 2026-11-13): согласованная 10.1.20 уже отклоняет каждую связь `overrides`, которую отклоняла эта строка. Строка новая и ни разу не одобрялась, поэтому удаляется, а не уходит в архив.";
delete d.proposals;
d.num = null;

const r = rows.find((x) => x.num === "10.1.22");
r.en = r.was.split(" | ")[0];
r.ru =
  "Каждый узел технического приложения, кроме раздела, вне разделов стека и технического долга, реализует узел базовой спецификации, " +
  "и каждое правило технического долга уточняет такой узел";
r.change = "Одобренная формулировка не менялась. Изменение — в предложении.";
r.about =
  "Затрагивает каждый узел технического приложения проекта. Каждый такой узел реализует хотя бы один узел базовой спецификации (правило 4.2): " +
  "так узел приложения находят и читают рядом с правилом, когда это правило меняется. " +
  "Исключения — раздел, который ничего не требует, узлы раздела стека, где описаны выборы на всю систему, и описания недостатков в разделе технического долга (4.4). " +
  "Сейчас инструменты ещё требуют, чтобы каждое описание технического долга уточняло узел базы. По согласованному 4.4 это не обязательно; на шаге инструментов это требование уйдёт.";
r.tests = ["unit/validate.test.ts: refuses a node of the technical appendix outside the stack implementing no node of the base"];
t.toolsRu["s-yprj7d6tnvauggr"] = {
  title: "Связи `implements` и `refines` приложений и собственных guidelines проекта",
  text:
    "`sheriff validate` находит цель каждой исходящей связи `implements` и `refines` каждого узла, кроме раздела, и смотрит, в какой части спецификации эта цель находится.",
  reason: "У этого узла нет обоснования — пробел, допишем на шаге инструментов.",
};
r.proposals = [
  {
    en: "\", and every rule of the technical debt refines one\" is removed",
    ru: "Убирается «, и каждое правило технического долга уточняет такой узел»",
    why:
      "По согласованному 4.4 описание недостатка может уточнять узлы, которых касается, но не обязано. Эта часть проверки требует того, чего 4.4 не требует. " +
      "На шаге инструментов `sheriff validate` перестанет отклонять описание технического долга без связи `refines`.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.21 deleted;", r.num, "| proposals", r.proposals.length);
