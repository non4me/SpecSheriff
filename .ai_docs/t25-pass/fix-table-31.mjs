// Check 10.1.3 of the table of checks, not yet agreed: two proposals that carry out the owner's ruling on the archive
// (2026-11-12). An archived node has no sid (node 2.5), so the archive leaves the check, and the reason, which spoke of
// `supersedes` links and of archived sids, no longer holds.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.proposals = [
  {
    en: "No two nodes of the specification share a sid",
    ru: "Никакие два узла спецификации не имеют одного sid",
    why:
      "Ваше решение по архиву: у архивного узла нет sid (узел 2.5), поэтому архив из проверки уходит. «Узел спецификации» — те же слова, что в согласованных 1.2.2 и 2.5.",
  },
  {
    en: "Reason: A node is cited by its sid, so a sid that two nodes shared would name both of them.",
    ru: "Обоснование: На узел ссылаются по его sid, поэтому sid, общий для двух узлов, называл бы сразу оба.",
    why:
      "Нынешнее обоснование говорит о связи supersedes и о sid архивного узла. Ни того ни другого больше нет. Новое говорит, зачем нужна проверка, словами согласованного 1.2.2, на котором она стоит.",
  },
];
r.about =
  "Затрагивает sid каждого узла спецификации. sid — единственный способ сослаться на узел, поэтому два узла с одним sid сделали бы двусмысленной каждую ссылку на него: в связях, в коде, в тестах и в коммитах.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 proposals:", r.proposals.length);
