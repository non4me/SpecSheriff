// Check 10.1.27 is agreed (the owner, 2026-11-13, «ок»), in the wording of fix-table-91.mjs.
// Check 10.1.28 in the new form: its approved words as the text, with their Russian, what it affects, its tests, the
// Russian of tools 7.2.1, and one whole proposed wording, checked against node 7.17:
// - "rule" for "node": code implements rules (agreed 9.3 and 10.1.26);
// - only a SpecTag that names a rule must name one that exists: under agreed 10.1.26 a SpecTag may say that the symbol
//   implements no rule, and the approved words would refuse it;
// - a test changed in a commit is held as a symbol is: under agreed 1.3.2 no code or test is written or changed for a
//   draft rule, and the tools already refuse such a test;
// - one thought to a sentence (7.5), and the commit is no longer an actor.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);

const a = rows.find((x) => x.num === "10.1.27");
a.agreed = "2026-11-13";

const r = rows.find((x) => x.num === "10.1.28");
r.en = r.was.split(" | ")[0];
r.cost = r.was.split(" | ")[1];
r.ru = "Каждый SpecTag называет существующий узел, а SpecTag на символе, код которого меняет коммит, — одобренный";
r.ruCost = "отклоняется";
r.change = "Одобренная формулировка не менялась. Изменение — в предложенной формулировке.";
r.about =
  "Затрагивает каждый SpecTag на коде системы и в названиях тестов. " +
  "SpecTag, который называет несуществующее правило, не связывает код ни с каким правилом. " +
  "Черновик не реализуют (1.3.2), поэтому изменённый символ или тест не может ссылаться на неодобренное правило. " +
  "Символ, который коммит не меняет, может сохранить SpecTag правила, вернувшегося в черновик. Что считается изменением, говорит 9.4.";
r.tests = [
  "unit/binding.test.ts: refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes",
  "unit/binding.test.ts: lets a symbol the commit leaves unchanged keep a tag naming a draft node",
  "unit/binding.test.ts: refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid",
  "unit/binding.test.ts: counts a change to a tag as a change to the symbol's code",
];
t.toolsRu["s-2x58az67bm6cxq2"] = {
  title: "Символы, которые меняет коммит",
  text:
    "`sheriff binding` находит, какие символы кода системы вне его тестов меняет коммит.\n\n" +
    "- Изменённая строка засчитывается символу, в котором она стоит. Изменение в любом месте символа — изменение всего символа.\n" +
    "- Строка с SpecTag, до коммита или после него, засчитывается символу, который этот SpecTag помечает, даже если она стоит вне тела символа.\n\n" +
    "Символ не считается изменённым, если каждая его изменённая строка:\n\n" +
    "- не является строкой с SpecTag;\n" +
    "- отличается от строки, которую заменяет, только комментарием, sid в ссылке или идентификатором, который коммит переименовывает везде.",
};
r.proposals = [
  {
    en:
      "Every SpecTag that names a rule names one that exists. " +
      "A SpecTag on a symbol or a test changed in a commit names an approved rule | refused",
    ru:
      "Каждый SpecTag, который называет правило, называет существующее правило. " +
      "SpecTag на символе или тесте, изменённом в коммите, называет одобренное правило | отклоняется",
    why:
      "1) «Узел» → «правило»: код реализует правила (согласованные 9.3 и 10.1.26). " +
      "2) «Каждый SpecTag, который называет правило»: по согласованному 10.1.26 SpecTag может говорить, что символ не реализует никакого правила; такой SpecTag правила не называет, и прежние слова отклоняли бы его. " +
      "3) Добавлен тест: по согласованному 1.3.2 для черновика не пишут и не меняют ни кода, ни теста; инструменты и сейчас отклоняют изменённый тест с sid черновика. " +
      "4) Две мысли — два предложения (7.5); коммит больше не действующее лицо. Что считается изменением — согласованный 9.4.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(a.num, "agreed |", r.num, "|", r.proposals[0].en);
