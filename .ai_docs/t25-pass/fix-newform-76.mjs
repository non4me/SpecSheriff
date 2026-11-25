// The owner, 2026-11-09, on the node on citations: it is not clear what the rule governs, and the wording is murky. Title, text
// and reason are written anew, opening with what the rule requires. The meaning does not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const node = d["6.3"];
if (node.sidValue !== "s-cxtt6jvhqcey2k9") throw new Error("6.3 is another node");
node.title = "A node's links name every node it cites";
node.ruTitle = "Связи узла называют каждый узел, на который он ссылается";
node.text = "A node's links name every other node it cites. A node cites another node by writing `§` followed by that node's sid.\n\nThis rule covers every property of the node, text quoted as code included. It does not cover:\n- the node's links;\n- the nodes under it;\n- values built from other nodes.\n\nA node of the archive is not held to this rule.";
node.ruText = "Связи узла называют каждый другой узел, на который он ссылается. Узел ссылается на другой узел, когда пишет `§` и sid этого узла.\n\nЭто правило действует во всех свойствах узла, включая текст, оформленный как код. Оно не действует:\n- в связях узла;\n- в узлах под ним;\n- в значениях, построенных из других узлов.\n\nНа узел архива это правило не распространяется.";
node.reason = "The links pointing at a node are built only from links, never from citations. A citation its node's links do not name is seen only where it is written. Whoever changes the cited node then does not learn that another node relies on it.\n\nA node's links already name the nodes they point at. A node under it has links of its own. The nodes a built value is copied from hold the links themselves.\n\nA node of the archive is no longer part of the specification, so a change to a node it cites breaks nothing.";
node.ruReason = "Связи, указывающие на узел, строятся только из связей и никогда из ссылок. Ссылку, которую связи узла не называют, видно только там, где она написана. Тогда тот, кто меняет узел, на который она указывает, не узнаёт, что на него опирается другой узел.\n\nСвязи узла и так называют узлы, на которые указывают. У узла под ним свои связи. Связи хранятся у тех узлов, из которых скопировано построенное значение.\n\nУзел архива больше не часть спецификации, поэтому изменение узла, на который он ссылается, ничего не ломает.";
node.changes = [
  "По вашему замечанию заголовок, текст и обоснование написаны заново: узел начинается с того, что он требует. Смысл нынешнего 2.1 в этой части не изменён.",
  "В исключениях вместо указателя разделов и собранных значений, которые относятся к расширению, сказано «values built from other nodes».",
  "Фраза об узле архива новая. В 2.1 об архиве говорили слова «is held to neither», относившиеся к обоим правилам.",
  "Этот узел получает `s-cxtt6jvhqcey2k9`, нынешний sid 2.1 остаётся у 6.4. Сюда при переносе перейдут ссылки на правило о ссылке: из 6.1 о типе `cites`, из проверки связей в tools.json, из решений в tools.json 2 и 6 и из CLAUDE.md, а также тест чтения ссылок. Таблица проверок и узел tools.json «Outgoing links and citations» получат связь `implements` с ним.",
  "Сюда перейдут решения нынешнего 2.1 от 2026-10-26 и 2026-11-04.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("6.3 rewritten:", node.title);
