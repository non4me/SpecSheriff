// Check 10.1.26 is split, as the owner decided (2026-11-13): «давай, два правила, одно для кода, другое для теста, и в
// каждом правиле просто описаны все нюансы». The agreed 10.1.26 mixed code and tests in one check.
// - 10.1.26 becomes the check for code only. It names "the code implementing the specification", the term of agreed 9.1
//   for the system's code other than its tests, so it needs no exception for tests. It takes in agreed 10.1.29: every
//   SpecTag in that code immediately precedes a symbol.
// - The new check 10.1.26a is for tests only. Where a test carries its SpecTag is stated once, in node 9 of the appendix
//   of the tools (its name, or a pytest mark in Python), so the check names both places and cites that node.
// - Check 10.1.29 is then deleted: the check for code holds it whole.
// Both wordings go to the reviewer before the owner sees them.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const group = t.tables.find((g) => g.rows.some((x) => x.num === "10.1.26"));
const at = group.rows.findIndex((x) => x.num === "10.1.26");
const r = group.rows[at];
if (group.rows.some((x) => x.num === "10.1.26a")) throw new Error("10.1.26a exists");

r.proposals = [
  {
    en:
      "Every symbol of the code implementing the specification carries a SpecTag. Every SpecTag in that code immediately precedes a symbol. " +
      "The SpecTag names the rule the symbol implements or says that the symbol implements none. A nested symbol is covered by the SpecTag of the enclosing symbol | refused",
    ru:
      "У каждого символа кода, реализующего спецификацию, есть SpecTag. Каждый SpecTag в этом коде стоит непосредственно перед символом. " +
      "SpecTag ссылается на правило, которое символ реализует, или говорит, что символ не реализует никакого правила. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит | отклоняется",
    why:
      "По вашему решению (2026-11-13) проверка делится: эта — только о коде, без упоминания тестов. «Код, реализующий спецификацию» — слова согласованного 9.1 для кода системы без его тестов, поэтому исключение для тестов не нужно. " +
      "Сюда вошла согласованная 10.1.29: каждый SpecTag стоит непосредственно перед символом. Предложение о тестах ушло в новую 10.1.26a.",
  },
];

const n = Math.max(...t.tables.flatMap((g) => g.rows).map((x) => x.n)) + 1;
group.rows.splice(at + 1, 0, {
  n,
  num: "10.1.26a",
  fate: "stays",
  rests: ["s-8xw4mgvpexyvw5q", "s-nrjxfvpkq3m8hzm"],
  impl: ["s-utf4mbt7ref8g9c", "s-zrsc6asgmhv8tnc"],
  change: "Новая проверка, по вашему решению от 13 ноября: проверка 10.1.26 делится на проверку для кода и проверку для тестов. Номер временный.",
  about:
    "Затрагивает каждый тест кода системы. Тест связан с правилом, которое проверяет, через SpecTag. " +
    "Где тест несёт SpecTag, сказано один раз, в узле 9 описания инструментов: в TypeScript и JavaScript — в начале названия теста, в Python — в метке pytest на тесте. " +
    "Вспомогательные символы в файлах тестов SpecTag не несут.",
  tests: [
    "unit/binding.test.ts: refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid (первая часть)",
  ],
  proposals: [
    {
      en: "Every test carries a SpecTag that names the rule it tests. The SpecTag is in the test's name or in a mark on the test, as the appendix of the tools says for each language | refused",
      ru: "У каждого теста есть SpecTag, который ссылается на правило, которое тест проверяет. SpecTag стоит в названии теста или в метке на нём, как для каждого языка говорит описание инструментов | отклоняется",
      why:
        "Новая проверка — только о тестах, без упоминания кода, по вашему решению. Место SpecTag названо: название теста или метка на нём (в Python тест несёт SpecTag в метке pytest). " +
        "Какое из двух — для каждого языка говорит узел 9 описания инструментов; чтобы правило не жило в двух местах, проверка ссылается на него, а не повторяет.",
    },
  ],
});

const z = group.rows.find((x) => x.num === "10.1.29");
z.proposals = [
  {
    en: "The check is deleted",
    ru: "Проверка удаляется",
    why: "Её целиком держит новая проверка для кода 10.1.26: «Каждый SpecTag в этом коде стоит непосредственно перед символом».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.26 code | 10.1.26a tests | 10.1.29 deletion proposed");
