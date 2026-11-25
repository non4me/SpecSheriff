// Node 12.4.3, the proposal of fix-newform-334.mjs and fix-newform-335.mjs: the owner found «в порядке единой
// последовательности всех доменов» unclear (2026-11-14). The text now opens with what the node is about, said plainly:
// the domains at the same level come in their row in the same order as in the list of all the domains. "Sequence" becomes
// "list" throughout, in the text and the reason.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.4.3"];
const p = n.proposals[0];
p.en = [
  "Title: " + n.title,
  "",
  "Text: The domains at the same level come in their row in the same order as in the list of all the domains. The SpecSheriff tools build that list from the `consumes` links of the domains' headers:",
  "",
  "- they add to the list the domains that no domain uses, in the order of their names;",
  "- before adding any domain, they add the domains it uses that are not yet in the list, in the order of their names.",
  "",
  "So each domain comes in the list after every domain it uses.",
  "",
  "Reason: Computed from the links alone, the list cannot disagree with them. The diagram of the domains and the map of the specification therefore show the domains in the same order.",
  "",
  "Examples: Accounts, billing and requests are domains at the same level. Requests uses accounts, and billing uses no domain and is used by none. In their row, the order is billing, accounts, requests: accounts comes right before requests, not first, as the order of names alone would put it.",
].join("\n");
p.ru = [
  "Заголовок: " + n.ruTitle,
  "",
  "Текст: Домены одного уровня идут в своей линии в том же порядке, что и в общем списке всех доменов. Инструменты SpecSheriff строят этот список по связям `consumes` заголовков доменов:",
  "",
  "- они добавляют в список домены, которыми не пользуется ни один домен, в порядке их имён;",
  "- прежде чем добавить любой домен, они добавляют домены, которыми он пользуется и которых ещё нет в списке, в порядке их имён.",
  "",
  "Поэтому каждый домен стоит в списке после всех доменов, которыми пользуется.",
  "",
  "Обоснование: Список вычисляется только из связей, поэтому не расходится с ними. Поэтому схема доменов и карта спецификации показывают домены в одном порядке.",
  "",
  "Примеры: accounts, billing и requests — домены одного уровня. requests пользуется accounts, а billing ничем не пользуется, и им никто не пользуется. В своей линии они идут так: billing, accounts, requests — accounts идёт прямо перед requests, а не первым, куда его поставил бы один лишь порядок имён.",
].join("\n");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
