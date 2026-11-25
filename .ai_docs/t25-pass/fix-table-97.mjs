// Check 10.1.28a is agreed (the owner, 2026-11-13: «согласую»), in the wording of fix-table-96.mjs.
// Check 10.1.29 in the new form: its approved words as the text, with their Russian, what it affects, its test, and one
// whole proposed wording, checked against node 7.17. "The symbol it binds" is the symbol the SpecTag stands on, so the
// approved words go round in a circle; what is checked is only that a SpecTag stands on a symbol. "Outside the tests"
// follows agreed 10.1.26: "except in a test", and "the code" is the system's code.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

rows.find((x) => x.num === "10.1.28a").agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.29");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "Каждый SpecTag на коде вне тестов стоит на символе, который он связывает";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый SpecTag в коде системы вне тестов. " +
  "SpecTag, который не стоит ни на одном символе, ничего не связывает: например, он остался в комментарии после того, как символ удалили. " +
  "Тесты несут SpecTag в названии, поэтому здесь не проверяются.";
r.tests = ["unit/binding.test.ts: refuses a tag that stands on no symbol"];
r.proposals = [
  {
    en: "Every SpecTag in the system's code, except in a test, is attached to a symbol | refused",
    ru: "Каждый SpecTag в коде системы, кроме тестов, стоит на символе | отклоняется",
    why:
      "1) «На том символе, который он связывает» — круг: символ, который SpecTag связывает, и есть тот, на котором он стоит. Проверяется только то, что SpecTag стоит на каком-нибудь символе. " +
      "2) «Вне тестов» → «кроме тестов», как в согласованном 10.1.26; «код» → «код системы».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.28a agreed |", r.num, "|", r.proposals[0].en);
