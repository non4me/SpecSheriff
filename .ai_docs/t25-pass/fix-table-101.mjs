// Check 10.1.30 is deleted (the owner, 2026-11-13, «ок»): agreed checks 10.1.26, 10.1.28 and 10.1.28a hold every part of
// it, and its cost while the specification is a draft went to the extension "Adoption of an existing project". It was never
// approved in the new form, so it is deleted and loses its number, as 10.1.4 and 10.1.21 did.
// Agreed check 10.1.26: one whole new wording is proposed. Its second sentence put a test's SpecTag "in its name", but in
// Python a test carries its SpecTag in a pytest mark (the appendix of the tools, node 9). Where a test carries its
// SpecTag is for the appendix of the tools, so the words "in its name" go.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const d = rows.find((x) => x.num === "10.1.30");
d.fate = "deleted";
d.change =
  "Удаляется (вы, 2026-11-13): всё, что она требовала, держат согласованные 10.1.26 (SpecTag теста), 10.1.28 (правило существует) и 10.1.28a (не тест черновика); цена в черновике ушла в 12.6. " +
  "Строка ни разу не одобрялась в новой форме, поэтому удаляется, а не уходит в архив.";
delete d.proposals;
d.num = null;

const r = rows.find((x) => x.num === "10.1.26");
r.proposals = [
  {
    en:
      "Every symbol of the system's code, except a symbol in a test, carries a SpecTag that names the rule the symbol implements or says that the symbol implements none. " +
      "Every test carries a SpecTag that names the rule it tests. A nested symbol is covered by the SpecTag of the enclosing symbol | refused",
    ru:
      "У каждого символа кода системы, кроме символов в тестах, есть SpecTag, который ссылается на реализуемое правило или говорит, что символ не реализует никакого правила. " +
      "У каждого теста есть SpecTag, который ссылается на правило, которое тест проверяет. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит | отклоняется",
    why:
      "Убрано «в названии»: в Python тест несёт SpecTag в метке pytest, а не в названии (описание инструментов, узел 9). Где именно стоит SpecTag теста, говорит описание инструментов. Остальное без изменений.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.30 deleted | 10.1.26 proposal:", r.proposals[0].ru);
