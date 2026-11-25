// Node 10.7: the owner accepted the wording of fix-newform-255.mjs (2026-11-14, «ок»). Draft 10.9 is written from current
// node 5.9 (s-6hha5en226aj8hu), the fixtures of a check's tests, and keeps its sid. The consolidated review of 11 November
// cut its reason to the first sentence; the text names the rule that lists the fixtures before saying it refines this one.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["10.7"];
a.agreed = "2026-11-14";
a.changes.push("Вы приняли эту формулировку (2026-11-14).");

if (d["10.9"]) throw new Error("draft 10.9 exists");
d["10.9"] = {
  from: "5.9",
  sid: "kept",
  title: "The fixtures of a check's tests are left out of the checks of citations and locations",
  ruTitle: "Fixtures тестов проверки не участвуют в проверках ссылок и расположений",
  text:
    "The checks of citations and of locations outside the specification leave out the files that a rule of the project's own guidelines lists as fixtures of tests. " +
    "That rule refines this one. It lists only the fixtures of the tests of a check that reads citations or locations.",
  ruText:
    "Проверки ссылок и расположений вне спецификации не читают файлы, которые правило собственных guidelines проекта перечисляет как fixtures тестов. " +
    "Это правило уточняет данное. Оно перечисляет только fixtures тестов проверки, которая читает ссылки или расположения.",
  reason: "Such a test feeds its check a file that holds a sid or a location as data, not as a citation of a node.",
  ruReason: "Такой тест подаёт своей проверке файл, в котором sid или расположение — это данные, а не ссылка на узел.",
  changes: [
    "Из нынешнего 5.9, sid сохраняется. Обоснование сокращено до первого предложения, как предложил сводный отчёт рецензента от 11 ноября (7.14).",
    "Текст сначала называет правило, которое перечисляет fixtures, а потом говорит, что оно уточняет это правило.",
  ],
  sidValue: "s-6hha5en226aj8hu",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.7 agreed; draft 10.9 written");
