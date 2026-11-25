// The owner rejected the proposal for row 11.3.5 and gave its meaning (2026-11-18): the technical appendix
// says how the rules of the base specification are implemented, so it repeats the structure of the base,
// its domains and their sections, as far as needed. A base rule that needs no refinement has no pair in
// the appendix; the stack and the technical debt have no pair in the base. Replaces the proposal with one
// in that meaning and keeps the owner's account with the row for the `meta.decisions` of its node.
import fs from "node:fs";
const file = new URL("table-11-3.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const r = t.tables[0].rows.find((x) => x.num === "11.3.5");
r.proposals = [{
  en: "Every section of the technical appendix other than the stack section and the technical debt section matches a domain or a section of the base specification in its name and in its place in the structure",
  ru: "Каждый раздел технического приложения, кроме раздела стека и раздела технического долга, совпадает с доменом или разделом базовой спецификации по имени и по месту в структуре",
  why: "Ваш смысл (18 ноября): приложение отвечает на вопрос «как» для правил базы, поэтому повторяет её структуру — домены и разделы, — но только по мере необходимости. Правило базы, которое не нужно уточнять, пары в приложении не получает, поэтому строка проверяет только одно направление: у каждого раздела приложения есть пара в базе. Стек и технический долг пары в базе не имеют. Названия двух исключений — как в согласованной 10.1.22.",
}];
r.decisions = [{ date: "2026-11-18", problem: "What the check on the sections of the technical appendix requires.", ruling: "The owner: the technical appendix refines how the rules of the base specification are implemented, so its structure matches that of the base specification, its domains and their sections included, as far as needed. A base rule that needs no refinement has no counterpart in the appendix, and the stack and the technical debt have no counterpart in the base. The check has nothing to do with the contracts section." }];
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("11.3.5:", r.proposals[0].en);
