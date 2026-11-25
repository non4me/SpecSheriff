// Draft 10.8: the owner rejected the wording of fix-newform-242.mjs (2026-11-13: «плохо сформулировано. Нужно просто
// сказать, что SpecTag используется только в коде и тестах, реализующих систему. И опять там понамешано всего»). The
// text is the owner's sentence. A project's own checks are among the repository's tools, which are not the system's code
// (9.1), so they have no SpecTag, and their tests none either.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.8"];
n.title = "A SpecTag is used only in the system's code and tests";
n.ruTitle = "SpecTag есть только в коде и тестах системы";
n.text = "A SpecTag is used only in the code and the tests that implement the system.";
n.ruText = "SpecTag используется только в коде и тестах, реализующих систему.";
n.reason =
  "A SpecTag binds a rule to the code that implements it and to the tests written for it (§s-8xw4mgvpexyvw5q). " +
  "The repository's own tools, a project's own checks among them, are not the system's code (§s-hheus6f395ynqvc).";
n.ruReason =
  "SpecTag связывает правило с кодом, который его реализует, и с тестами, написанными для него (§s-8xw4mgvpexyvw5q). " +
  "Собственные инструменты репозитория, в том числе собственные проверки проекта, не относятся к коду системы (§s-hheus6f395ynqvc).";
delete n.examples;
delete n.ruExamples;
n.changes = [
  "Текст — ваши слова (2026-11-13): SpecTag используется только в коде и тестах, реализующих систему.",
  "Прежние требования 5.7 к тестам собственных проверок проекта уходят: у собственных проверок и их тестов SpecTag нет, и SpecSheriff их не проверяет. Генераторы ушли в расширение 12.5.",
  "Следствие: в проверку 10.1.26a возвращаются слова «кода системы» — «У каждого теста кода системы есть SpecTag…». Сохраняет sid 5.7.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruTitle, "|", n.ruText);
