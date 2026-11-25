// Check 10.1.42 is agreed unchanged (the owner, 2026-11-13, «ок»). Check 10.1.43 gets a proposal: it said "the code changed
// in a commit", while the reviewer is given only the symbols of the system's code outside its tests (s-vp24dqydygztqbt),
// and check 10.1.42 leaves out the symbols in the tests in the same way.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.42");
a.change = "Вы согласились с проверкой без изменений (2026-11-13).";
a.agreed = "2026-11-13";

const b = rows.find((x) => x.num === "10.1.43");
b.proposals = [
  {
    en:
      "Each symbol of the system's code outside its tests that a commit adds or changes does what the rules it names say, and nothing they do not | refused, naming the rule and the line",
    ru:
      "Каждый символ кода системы вне его тестов, добавленный или изменённый в коммите, делает то, что говорят названные им правила, и ничего сверх этого | отклоняется с указанием правила и строки",
    why:
      "«Код, изменённый в коммите» включал и тесты. Ревьюер получает только символы кода системы вне тестов (s-vp24dqydygztqbt); проверка 10.1.42 так же не считает символов в тестах.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.42 agreed; 10.1.43:", b.proposals[0].ru);
