// Check 10.1.38 is agreed unchanged (the owner, 2026-11-13, «ок»). Check 10.1.39 gets a proposal: it named the fixtures
// as "those fixtures", pointing back to check 10.1.38, and did not say that a cited sid must name a node. The archive is
// no longer mentioned, since under node 2.5, which the owner has agreed to, an archived node has no sid of its own.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const a = rows.find((x) => x.num === "10.1.38");
a.change = "Вы согласились с проверкой без изменений (2026-11-13); русский перевод выровнен по английскому.";
a.agreed = "2026-11-13";

const b = rows.find((x) => x.num === "10.1.39");
b.proposals = [
  {
    en:
      "Each citation in the code, the tests or the documents names a node of the specification by its sid. " +
      "The fixtures of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu) are not checked | refused",
    ru:
      "Каждая ссылка в коде, тестах или документах называет узел спецификации по его sid. " +
      "Fixtures тестов проверки, которая читает ссылки или расположения (§s-6hha5en226aj8hu), не проверяются | отклоняется",
    why:
      "«Кроме этих fixtures» ссылалось на проверку 10.1.38; теперь fixtures названы полностью, отдельным предложением. " +
      "«Узел спецификации»: проверка отклоняет и sid, который не называет ни одного узла. " +
      "Архив не упоминается: по узлу 2.5, с которым вы согласились, у узла в архиве нет своего sid.",
  },
];
b.todos = [
  "На шаге инструментов: `sheriff citations` перестаёт искать sid среди узлов архива, поскольку у узла в архиве нет своего sid (узел 2.5).",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.38 agreed; 10.1.39:", b.proposals[0].ru);
