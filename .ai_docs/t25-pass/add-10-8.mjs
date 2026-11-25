// The owner, 2026-11-13: the rules for code and tests are the same for every node, and all code goes through tests, so a
// project's own checks get no checks of their own («Объединяем так: 10.1.32 и 10.1.33 удаляем, а собственную проверку
// проекта считаем кодом правила, которое её перечисляет?» — «ок»). Drafts node 10.8, the present 5.7, which held a project's
// own checks to their rule by a requirement of its own. Its part on generators goes to the extension 12.5 (12.5.3), as the
// owner ruled earlier. The node keeps its sid.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["10.8"]) throw new Error("10.8 exists");

d["10.8"] = {
  from: "5.7",
  sid: "kept",
  sidValue: "s-sfjka4zc4rhfu67",
  title: "A project's own check is code of the rule listing it",
  ruTitle: "Собственная проверка проекта — код правила, которое её перечисляет",
  text:
    "The code of a project's own check is code of the rule that lists the check (§s-2fau85dfyyeq66m). " +
    "The check's tests are tests of that rule.",
  ruText:
    "Код собственной проверки проекта — это код правила, которое её перечисляет (§s-2fau85dfyyeq66m). " +
    "Тесты проверки — тесты этого правила.",
  reason:
    "The code of the repository's tools has no SpecTag (§s-hheus6f395ynqvc), so a project's own check is bound to its rule only through the rule that lists it. " +
    "Counted as code and tests of that rule, a check is held by every requirement on a rule's code and tests, and needs no requirement of its own.",
  ruReason:
    "У кода инструментов репозитория нет SpecTag (§s-hheus6f395ynqvc), поэтому собственная проверка проекта связана со своим правилом только через правило, которое её перечисляет. " +
    "Раз её код и тесты считаются кодом и тестами этого правила, к ней применяются все требования к коду и тестам правил, и своих требований ей не нужно.",
  changes: [
    "По вашему решению от 13 ноября: правила для кода и тестов одни для всех узлов, весь код — через тесты. Собственная проверка проекта считается кодом правила, которое её перечисляет.",
    "Прежний текст 5.7 — тесты с SpecTag перечисляющего правила, тест пишется первым, тест черновика не меняют, у изменённого кода есть тест — теперь покрывают общие правила 1.3.2 и 1.4.1 и проверки 10.1.26a, 10.1.28a и 10.1.31. Проверки 10.1.32 и 10.1.33 удалены.",
    "Генераторы ушли в расширение 12.5 (12.5.3), как решено раньше. Сохраняет sid 5.7.",
  ],
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const h = fs.readFileSync(pagePath, "utf8");
const a = '["10.8","same",0,"5.7",';
if (!h.includes(a)) throw new Error("row 10.8 not found");
fs.writeFileSync(pagePath, h.replace(a, '["10.8","split",0,"5.7",'));
console.log("10.8 drafted");
