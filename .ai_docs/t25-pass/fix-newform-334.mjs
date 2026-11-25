// Node 12.4.3, agreed on 2026-11-14: a proposal for its list, after an EngStickler reader found that the list does not
// explain the order in the node's own example. The list stated properties of the sequence, and its last item only said
// that names decide where the links put two domains in the same place; it did not say why billing comes before accounts.
// The proposal states the rule the SpecSheriff tools apply (`domainOrder` in skills/tools/src/model.ts): they take the
// domains that no domain uses in the order of their names, and before each domain they take, they place the domains it
// uses that are not yet in the sequence, in the order of their names and in the same way. The example's English is fixed
// as the reader proposed. It goes to the reviewer before the owner sees it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
n.proposals = [
  {
    where: "список в тексте; английский текст примера",
    en: [
      "Title: " + n.title,
      "",
      "Text: The domains at the same level are placed in the order given by a single sequence of all the domains. The SpecSheriff tools build that sequence from the `consumes` links of the domains' headers:",
      "",
      "- they take the domains that no domain uses, in the order of their names;",
      "- before each domain they take, they place the domains it uses that are not yet in the sequence, in the order of their names and in the same way.",
      "",
      "Reason: " + n.reason,
      "",
      "Examples: Accounts, billing and requests are domains at the same level. Requests uses accounts, and billing uses no domain and is used by none. In their row, the order is billing, accounts, requests: accounts comes right before requests, not first, as the order of names alone would put it.",
    ].join("\n"),
    ru: [
      "Заголовок: " + n.ruTitle,
      "",
      "Текст: Домены одного уровня располагаются в порядке единой последовательности всех доменов. Инструменты SpecSheriff строят эту последовательность по связям `consumes` заголовков доменов:",
      "",
      "- они берут домены, которыми не пользуется ни один домен, в порядке их имён;",
      "- перед каждым взятым доменом они ставят домены, которыми он пользуется и которых ещё нет в последовательности, — в порядке их имён и тем же способом.",
      "",
      "Обоснование: " + n.ruReason,
      "",
      "Примеры: " + n.ruExamples[0],
    ].join("\n"),
    why: "Читатель нашёл, что список не объясняет порядок в примере: почему billing идёт перед accounts. Предложение говорит, как инструменты на самом деле строят последовательность.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.4.3 proposal written");
