// Node 12.4.3, the proposal of fix-newform-334.mjs, after the reviewer's report. The list says where each domain goes
// ("add to the sequence") and what is repeated ("before adding any domain"), and keeps the agreed verb "compute". The first
// property the owner agreed to today is kept after the list, as a consequence: each domain comes after every domain it uses.
// The Russian example now says what the English example says: «куда его поставил бы один лишь порядок имён».
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
const p = n.proposals[0];
p.en = [
  "Title: " + n.title,
  "",
  "Text: The domains at the same level are placed in the order given by a single sequence of all the domains. The SpecSheriff tools compute that sequence from the `consumes` links of the domains' headers:",
  "",
  "- they add to the sequence the domains that no domain uses, in the order of their names;",
  "- before adding any domain, they add the domains it uses that are not yet in the sequence, in the order of their names.",
  "",
  "So each domain comes after every domain it uses.",
  "",
  "Reason: " + n.reason,
  "",
  "Examples: Accounts, billing and requests are domains at the same level. Requests uses accounts, and billing uses no domain and is used by none. In their row, the order is billing, accounts, requests: accounts comes right before requests, not first, as the order of names alone would put it.",
].join("\n");
p.ru = [
  "Заголовок: " + n.ruTitle,
  "",
  "Текст: Домены одного уровня располагаются в порядке единой последовательности всех доменов. Инструменты SpecSheriff вычисляют эту последовательность по связям `consumes` заголовков доменов:",
  "",
  "- они добавляют в последовательность домены, которыми не пользуется ни один домен, в порядке их имён;",
  "- прежде чем добавить любой домен, они добавляют домены, которыми он пользуется и которых ещё нет в последовательности, в порядке их имён.",
  "",
  "Поэтому каждый домен идёт после всех доменов, которыми пользуется.",
  "",
  "Обоснование: " + n.ruReason,
  "",
  "Примеры: " + n.ruExamples[0].replace("а не первым по имени.", "а не первым, куда его поставил бы один лишь порядок имён."),
].join("\n");
if (!p.ru.includes("один лишь порядок имён")) throw new Error("Russian example not changed");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
