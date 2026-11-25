// Check 10.1.29 is agreed: the owner accepted its final wording, and accepting a node's final wording is agreeing to it
// (the owner, 2026-11-13: «если я принимаю значит с ней согласен и это значит что согласую»; .claude/vt/rules.md).
// Check 10.1.30: every part of it is now held by an agreed check, so its deletion is proposed:
// - a test carries a SpecTag naming the rule it tests: 10.1.26, second sentence;
// - the rule a SpecTag names exists: 10.1.28;
// - a test a commit adds or changes carries no SpecTag of a draft rule: 10.1.28a;
// - the cost while the specification is a draft went to the extension "Adoption of an existing project" (12.6).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

rows.find((x) => x.num === "10.1.29").agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.30");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru =
  "Каждый тест кода системы несёт SpecTag существующего правила, термина или узла собственного NodeKind проекта, а тест, который коммит добавляет или меняет, — SpecTag одобренного";
r.ruCost = "отклоняется, а пока спецификация — черновик, по тесту без SpecTag, который коммит не меняет, — сообщается";
r.change = "Одобренная формулировка не менялась. Предлагается удалить проверку.";
r.about =
  "Затрагивает каждый тест кода системы. Всё, что эта строка требует, теперь требуют согласованные проверки: " +
  "SpecTag в названии теста — 10.1.26, существование правила — 10.1.28, запрет на тест черновика — 10.1.28a. Цена в черновике ушла в расширение «Адоптация» (12.6).";
r.tests = [
  "unit/binding.test.ts: refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid",
  "unit/binding.test.ts: counts a test whose only change is its sid as a test the commit changes",
];
r.proposals = [
  {
    en: "The check is deleted",
    ru: "Проверка удаляется",
    why:
      "Каждую её часть уже держит согласованная проверка: SpecTag в названии теста — 10.1.26, существование правила — 10.1.28, запрет на тест черновика — 10.1.28a. " +
      "Цена «пока спецификация — черновик… сообщается» ушла в расширение «Адоптация существующего проекта» (12.6). Строка ни разу не одобрялась в новой форме, поэтому удаляется, а не уходит в архив, как 10.1.4 и 10.1.21.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.29 agreed | 10.1.30: deletion proposed");
