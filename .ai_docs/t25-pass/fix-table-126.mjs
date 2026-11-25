// Check 10.1.40 is agreed (the owner, 2026-11-13, «ок»): it now concerns an approved rule, since the owner pointed out that
// a draft's tests and code must lag behind its text, a draft rule not being implemented (node 1.3.2). Check 10.1.41 gets a
// proposal: its wording had dropped what its approved text and node 9.2 say, that a symbol or a test bound to a rule
// implementing the rule counts.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.40");
Object.assign(a, {
  en: "The tests and the code of an approved rule do not lag behind its text, nor its code behind its tests, as the history of the repository shows",
  ru: "Тесты и код одобренного правила не отстают от его текста, а код — от его тестов, как показывает история репозитория",
  change:
    "Вы приняли эту формулировку (2026-11-13): добавлено «одобренного», поскольку у черновика тесты и код обязаны отставать от текста — черновик не реализуют (1.3.2).",
  agreed: "2026-11-13",
  todos: ["На шаге инструментов: `sheriff binding` не сообщает об отставании правила-черновика (функция `drift` сейчас проверяет и черновики)."],
});

const b = rows.find((x) => x.num === "10.1.41");
b.proposals = [
  {
    en:
      "An approved rule that the system's code must implement (§s-6fw72j65jkqrfpf) is bound to a symbol of the system's code outside its tests and to a test not marked as skipped. " +
      "A symbol or a test bound to a rule that implements it, directly or through a chain of `implements` links, also counts as bound to it | reported under the rule's sid while the specification is approved",
    ru:
      "Одобренное правило, которое код системы должен реализовывать (§s-6fw72j65jkqrfpf), связано с символом кода системы вне его тестов и с тестом, не помеченным как пропускаемый. " +
      "Символ или тест, связанный с правилом, которое его реализует напрямую или через цепочку связей `implements`, тоже считается связанным с ним | сообщается по sid правила, пока спецификация одобрена",
    why:
      "Одобренная формулировка засчитывала SpecTag «правила, которое его реализует», и согласованный узел 9.2 говорит то же. Нынешняя формулировка это потеряла: правило, реализованное через другое правило, сообщалось бы как нереализованное.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.40 agreed; 10.1.41:", b.proposals[0].ru);
