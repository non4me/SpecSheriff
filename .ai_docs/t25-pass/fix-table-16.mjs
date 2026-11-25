// The rule reviewer on check 10.1.1: the reason held two thoughts and named "a parser" and "the tools" bare; the text's
// "one property" says not of which object (a proposal on a sentence once approved, put to the owner).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.1");
r.reason = "Where one property is given two values, a JSON parser keeps one of them without a word. The SpecSheriff tools then read something other than what the file says.";
r.ruReason = "Если одному свойству задано два значения, парсер JSON молча оставляет одно из них. Тогда инструменты SpecSheriff читают не то, что написано в файле.";
r.proposal = {
  en: "No object in a file of the specification, of its archive or of its schema gives one property two values",
  ru: "Ни один объект в файле спецификации, её архива или её схемы не задаёт одному свойству двух значений",
  why: "«Одному свойству» не говорит, какого объекта: `title` у многих узлов можно прочесть как одно свойство с многими значениями. Предложение рецензента; текст строки был одобрен в прежней таблице, поэтому меняется только с вашего согласия.",
};
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.reason);
