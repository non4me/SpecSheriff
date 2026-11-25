// Node 10.9, finding 4 of sections 6 to 10, under the owner's ruling of 2026-11-17: outside the system's code a SpecTag may
// appear only in the repository's own tools and their tests, and names only a rule of the guidelines; such a SpecTag never
// counts toward implementing a rule of the base specification or of the technical appendix. Written as a proposal; the
// script also lists the rows of table 10.1 that speak of where a SpecTag may appear.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-457.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const SYSCODE = "s-hheus6f395ynqvc";
const OWNCHECKS = "s-2fau85dfyyeq66m";
const n = d["10.9"];
const title = "Where a SpecTag may appear";
const ruTitle = "Где может стоять SpecTag";
const text = [
  `A SpecTag in the system's code (§${SYSCODE}) or in its tests names a rule that the code implements or that the test is written from.`,
  `Outside the system's code, a SpecTag may appear only in the repository's own tools and their tests, such as a project's own checks (§${OWNCHECKS}), and names only a rule of the guidelines. Such a SpecTag never counts toward implementing a rule of the base specification or of the technical appendix.`,
].join("\n\n");
const ruText = [
  `SpecTag в коде системы (§${SYSCODE}) или в его тестах называет правило, которое реализует код или из которого написан тест.`,
  `Вне кода системы SpecTag может стоять только в собственных инструментах репозитория и в их тестах, например в собственных проверках проекта (§${OWNCHECKS}), и называет только правило guidelines. Такой SpecTag никогда не засчитывается в реализацию правила базовой спецификации или технического приложения.`,
].join("\n\n");
const reason = `${n.reason}\n\nThe repository's own tools can be written from rules of the guidelines in the same order, test first, so a SpecTag binds them to those rules too. Counted toward a rule of the system, such a SpecTag would let a tool stand in for the system's code.`;
const ruReason = `${n.ruReason}\n\nСобственные инструменты репозитория можно писать по правилам guidelines в том же порядке, сначала тест, поэтому SpecTag связывает с этими правилами и их. Засчитанный в реализацию правила системы, такой SpecTag позволил бы инструменту подменить код системы.`;
const examples = ["A project's own check refuses a commit that holds a secret. Its test has the SpecTag of the rule of the project's own guidelines that the check carries out."];
const ruExamples = ["Собственная проверка проекта отклоняет коммит, в котором есть секрет. У её теста есть SpecTag правила собственных guidelines проекта, которое эта проверка выполняет."];
n.proposals = [{
  where: "заголовок, текст, новый абзац обоснования, новый пример",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 4 разделов 6–10, по вашему решению 17 ноября: вне кода системы SpecTag допустим в собственных инструментах репозитория и их тестах, называет только правило guidelines и в реализацию правил системы не засчитывается. Снимает противоречие с вашим решением от 28 октября о SpecTag в тестах инструментов этого репозитория.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const t = JSON.parse(fs.readFileSync(new URL("table-10-1.json", here), "utf8"));
for (const r of t.tables.flatMap((g) => g.rows)) if (/SpecTag/.test(r.en) && /tool|outside|only in|configuration/i.test(r.en) && r.fate !== "deleted") console.log("ROW", r.num, "|", r.en.slice(0, 240));
console.log("ok");
