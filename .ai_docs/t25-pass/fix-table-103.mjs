// The split of check 10.1.26: the reviewer's report of 2026-11-13, taken into one final wording for each row.
// - 10.1.26, for code: the main thought first, as agreed; the sentence on where a SpecTag stands moves to the end (7.6).
//   "The code implementing the specification" was not 9.1's term: 9.1 says "the implementing code", and without its
//   qualifier the phrase also covers the SpecSheriff tools. So the row says "the system's implementing code" and cites
//   9.1. "A rule the symbol implements": node 8 of the appendix lets a symbol carry several SpecTags.
// - 10.1.26a, for tests: "a test of the system's code" (7.8); where the SpecTag stands is cited, not repeated, since node 9
//   of the appendix states it for each language and lets a further language choose its own place (7.5).
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const r = rows.find((x) => x.num === "10.1.26");
if (!r.rests.includes("s-hheus6f395ynqvc")) r.rests.push("s-hheus6f395ynqvc");
r.proposals = [
  {
    en:
      "Every symbol of the system's implementing code (§s-hheus6f395ynqvc) carries a SpecTag that names a rule the symbol implements or says that the symbol implements none. " +
      "A nested symbol is covered by the SpecTag of the enclosing symbol. Every SpecTag in that code immediately precedes a symbol | refused",
    ru:
      "У каждого символа реализующего кода системы (§s-hheus6f395ynqvc) есть SpecTag, который ссылается на правило, реализуемое символом, или говорит, что символ не реализует никакого правила. " +
      "Вложенный символ покрыт SpecTag того символа, внутри которого он стоит. Каждый SpecTag в этом коде стоит непосредственно перед символом | отклоняется",
    why:
      "По вашему решению проверка только о коде, без упоминания тестов: «реализующий код системы» — так согласованный 9.1 называет код системы без тестов. " +
      "Главная мысль первой, как в согласованной формулировке; сюда вошла согласованная 10.1.29 — последним предложением. " +
      "«На правило, реализуемое символом»: символ может реализовать несколько правил и нести несколько SpecTag (описание инструментов, узел 8).",
  },
];

const a = rows.find((x) => x.num === "10.1.26a");
a.proposals = [
  {
    en: "Every test of the system's code carries a SpecTag that names the rule it tests. The SpecTag is where the appendix of the tools puts it for the test's language | refused",
    ru: "У каждого теста кода системы есть SpecTag, который ссылается на правило, которое тест проверяет. SpecTag стоит там, где его ставит описание инструментов для языка теста | отклоняется",
    why:
      "Новая проверка — только о тестах. Где стоит SpecTag теста, для каждого языка говорит описание инструментов (узел 9): в TypeScript и JavaScript — в начале названия теста, в Python — в метке pytest на тесте; для другого языка — как скажет его описание. " +
      "Проверка ссылается на это место, а не повторяет его, чтобы правило жило в одном месте.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.26:", r.proposals[0].ru, "\n10.1.26a:", a.proposals[0].ru);
