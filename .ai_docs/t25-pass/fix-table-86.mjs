// Check 10.1.26: the owner dictated a wording (2026-11-13): «У каждого символа в коде системы и в названии теста есть
// SpecTag который ссылается на реализуемое правило. Вложенный символ покрыт SpecTag того символа, внутри которого он
// стоит.» Two gaps against agreed nodes are put to the owner in one final wording that keeps the owner's sentences:
// - a symbol that implements no rule carries the SpecTag that says so (agreed 1.5.2); the dictated wording would refuse it;
// - the system's code includes its tests (agreed 9.1), so "every symbol in the system's code" would require a SpecTag on
//   every helper symbol in a test file, which carries none; the test itself carries its SpecTag in its name.
// The first sentence of check 10.1.30 then repeats the test part; that is taken up when the review reaches 10.1.30.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.26");
r.dictated = {
  ru: "У каждого символа в коде системы и в названии теста есть SpecTag, который ссылается на реализуемое правило. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит.",
  date: "2026-11-13",
};
r.proposals = [
  {
    en:
      "Every symbol of the system's code, except a symbol in a test, carries a SpecTag that names the rule the symbol implements or says that it implements no rule. " +
      "Every test carries in its name a SpecTag that names the rule being implemented. A nested symbol is covered by the SpecTag of the symbol that encloses it | refused",
    ru:
      "У каждого символа кода системы, кроме символов в тестах, есть SpecTag, который ссылается на реализуемое правило или говорит, что символ не реализует никакого правила. " +
      "У каждого теста в названии есть SpecTag, который ссылается на реализуемое правило. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит | отклоняется",
    why:
      "Ваша формулировка (2026-11-13), с двумя дополнениями. 1) «или говорит, что символ не реализует никакого правила» — так по согласованному 1.5.2: технический код несёт SpecTag без правила; без этого проверка отклоняла бы его. " +
      "2) «кроме символов в тестах»: по согласованному 9.1 тесты входят в код системы, и без исключения SpecTag требовался бы у каждой вспомогательной функции в файле теста; у самого теста SpecTag стоит в названии. " +
      "Тесты разнесены во второе предложение. Первое предложение 10.1.30 тогда повторяет его — поправим, когда дойдём до 10.1.30.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].ru);
