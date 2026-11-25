// Node 12.4.3, not yet agreed: the owner's ruling of 2026-11-14 that the node describes the order of the domains of one
// level («речь именно о доменах одного уровня»): vertically, the domains are placed by their levels, and this rule covers
// domains that share a level. The title follows the owner's words. The text says that the domains of one level keep the order
// of a single sequence of all the domains, which the tools compute from the `consumes` links; the map of the specification
// can still cite this node for that sequence. The example names three domains of one level.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.4.3"];
n.title = "The order of the domains of one level";
n.ruTitle = "Порядок доменов одного уровня";
n.text = "The domains of one level are placed in the order of a single sequence of all the domains. The SpecSheriff tools compute that sequence from the `consumes` links of the domains' headers:\n\n- each domain comes after every domain it uses;\n- it comes as close as possible before the first domain that uses it;\n- where the links put two domains in the same place, they come in the order of their names.";
n.ruText = "Домены одного уровня располагаются в порядке единой последовательности всех доменов. Инструменты SpecSheriff вычисляют эту последовательность по связям `consumes` заголовков доменов:\n\n- каждый домен идёт после всех доменов, которыми пользуется;\n- он идёт как можно ближе перед первым доменом, который им пользуется;\n- если связи ставят два домена на одно место, они идут в порядке своих имён.";
n.reason = "Computed from the links alone, the sequence cannot disagree with them. The diagram of the domains and the map of the specification therefore show the domains in the same order.";
n.ruReason = "Последовательность вычисляется только из связей, поэтому не расходится с ними. Поэтому схема доменов и карта спецификации показывают домены в одном порядке.";
n.examples = ["Accounts, billing and requests are domains of one level. Requests uses accounts, and billing uses no domain and is used by none. In their row, the order is billing, accounts, requests: accounts comes right before requests, not first by its name."];
n.ruExamples = ["accounts, billing и requests — домены одного уровня. requests пользуется accounts, а billing ничем не пользуется, и им никто не пользуется. В своей линии они идут так: billing, accounts, requests — accounts идёт прямо перед requests, а не первым по имени."];
n.changes.push("По вашему решению от 14 ноября узел говорит о доменах одного уровня: по вертикали домены расставляет уровень, а это правило — для доменов, у которых уровень один. Заголовок — ваш. Первая фраза: домены одного уровня идут в порядке единой последовательности всех доменов; её по-прежнему может цитировать карта спецификации. Пример — о трёх доменах одного уровня.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const row = `["12.4.3","move",0,"1.41","The order of the domains","Порядок доменов"]`;
if (!page.includes(row)) throw new Error("row 12.4.3 not found");
page = page.replace(row, `["12.4.3","move",0,"1.41","The order of the domains of one level","Порядок доменов одного уровня"]`);
fs.writeFileSync(pageFile, page);
console.log(n.text);
