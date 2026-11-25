// Check 10.1.28 is split, as the owner decided (2026-11-13: «Да, делим»). The owner found that its second sentence ("a
// SpecTag on a symbol or a test changed in a commit names an approved rule") came at draft rules from the code, not from
// the rule. 10.1.28 keeps only the existence of the rule a SpecTag names. A new check right after it states, from the
// rule's side, that a draft rule is not implemented. It checks agreed node 1.3.2; no other check states it. Checks
// 10.1.30 and 10.1.32 repeat the clause for tests and lose it when they are reviewed. Its number is temporary.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const group = t.tables.find((g) => g.rows.some((x) => x.num === "10.1.28"));
const at = group.rows.findIndex((x) => x.num === "10.1.28");
const r = group.rows[at];
if (group.rows.some((x) => x.num === "10.1.28a")) throw new Error("10.1.28a exists");

r.rests = ["s-8xw4mgvpexyvw5q"];
r.impl = ["s-9rtrj24myzjvshu"];
r.about =
  "Затрагивает каждый SpecTag на коде системы и в названиях тестов. " +
  "SpecTag, который называет несуществующее правило, не связывает код ни с каким правилом. " +
  "SpecTag, который говорит, что символ не реализует никакого правила, правила не называет и здесь не проверяется.";
r.tests = [
  "unit/binding.test.ts: refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes (первая часть)",
  "unit/binding.test.ts: refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid (первая часть)",
];
r.proposals = [
  {
    en: "Every SpecTag that names a rule names one that exists | refused",
    ru: "Каждый SpecTag, который называет правило, называет существующее правило | отклоняется",
    why:
      "По вашему решению (2026-11-13) проверка делится. Здесь остаётся только существование правила. Запрет реализовывать черновик уходит в новую проверку сразу после этой, со стороны правила. " +
      "«Узел» → «правило»: код реализует правила. «Который называет правило»: по согласованному 10.1.26 SpecTag может говорить, что символ не реализует никакого правила.",
  },
];

const n = Math.max(...t.tables.flatMap((g) => g.rows).map((x) => x.n)) + 1;
group.rows.splice(at + 1, 0, {
  n,
  num: "10.1.28a",
  fate: "stays",
  rests: ["s-utvqbypzhmgndug"],
  impl: ["s-2x58az67bm6cxq2", "s-9rtrj24myzjvshu", "s-utf4mbt7ref8g9c"],
  change: "Новая проверка, по вашему решению от 13 ноября: черновик не реализуют, со стороны правила. Номер временный.",
  about:
    "Затрагивает каждый коммит, который добавляет или меняет символ кода системы или тест. " +
    "Проверяет согласованный 1.3.2 и принцип «Неодобренное не реализуется»: для правила-черновика не пишут и не меняют ни кода, ни теста. " +
    "Символ или тест, который коммит не трогает, сохраняет SpecTag правила, вернувшегося в черновик. Что считается изменением, говорит согласованный 9.4. " +
    "Ту же оговорку повторяют 10.1.30 и 10.1.32; оттуда её уберём, когда дойдём до них.",
  tests: [
    "unit/binding.test.ts: refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes (вторая часть)",
    "unit/binding.test.ts: lets a symbol the commit leaves unchanged keep a tag naming a draft node",
    "unit/binding.test.ts: refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid (вторая часть)",
    "unit/binding.test.ts: counts a change to a tag as a change to the symbol's code",
  ],
  proposals: [
    {
      en: "A draft rule is not implemented: no commit adds or changes a symbol or a test that carries its SpecTag | refused",
      ru: "Правило-черновик не реализуют: ни один коммит не добавляет и не меняет символ или тест с его SpecTag | отклоняется",
      why:
        "Главная мысль — о правиле: черновик не реализуют (согласованный 1.3.2). После двоеточия — как это видно в коммите: только так это и можно проверить детерминированно. " +
        "Других проверок с этим требованием нет; 10.1.28, 10.1.30 и 10.1.32 повторяли его кусками со стороны кода.",
    },
  ],
});
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].en, "\n10.1.28a |", group.rows[at + 1].proposals[0].en);
