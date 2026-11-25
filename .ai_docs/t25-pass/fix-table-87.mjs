// Check 10.1.26: the proposal of fix-table-86.mjs checked against the new step "Shorten" and node 7.17, agreed by the
// owner on 2026-11-13, before the owner sees it again.
// - The test sentence: a test implements no rule, it tests one; "the rule being implemented" could be read as the rule
//   the test implements. It names the rule the test tests, which is also shorter.
// - English only: "says that the symbol implements none" and "the enclosing symbol" are shorter and keep the meaning.
// The owner's dictated sentences are kept otherwise.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.26");
r.proposals = [
  {
    en:
      "Every symbol of the system's code, except a symbol in a test, carries a SpecTag that names the rule the symbol implements or says that the symbol implements none. " +
      "Every test carries in its name a SpecTag that names the rule it tests. A nested symbol is covered by the SpecTag of the enclosing symbol | refused",
    ru:
      "У каждого символа кода системы, кроме символов в тестах, есть SpecTag, который ссылается на реализуемое правило или говорит, что символ не реализует никакого правила. " +
      "У каждого теста в названии есть SpecTag, который ссылается на правило, которое тест проверяет. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит | отклоняется",
    why:
      "Ваша формулировка (2026-11-13) с двумя дополнениями. 1) «или говорит, что символ не реализует никакого правила» — так по согласованному 1.5.2: технический код несёт SpecTag без правила; без этого проверка отклоняла бы его. " +
      "2) «кроме символов в тестах»: по согласованному 9.1 тесты входят в код системы, и без исключения SpecTag требовался бы у каждой вспомогательной функции в файле теста; у самого теста SpecTag стоит в названии. " +
      "Проверено по новому шагу «Сократи» и узлу 7.17: в предложении о тесте «реализуемое правило» заменено на «правило, которое тест проверяет» — тест не реализует правило, а проверяет его. " +
      "Первое предложение 10.1.30 повторяет предложение о тесте — поправим, когда дойдём до 10.1.30.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].en);
