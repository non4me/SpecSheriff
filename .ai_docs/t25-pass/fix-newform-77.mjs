// The reviewer's wording of the rewritten node on citations: "a node's links" also took in the incoming entries, which stand in
// the same list, so the requirement is on the links a node declares; the title says the action; the reason opens with its ground.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const node = d["6.3"];
if (node.sidValue !== "s-cxtt6jvhqcey2k9") throw new Error("6.3 is another node");
node.title = "A cited node is also linked";
node.ruTitle = "Узел, на который есть ссылка, указан и в связях";
node.text = "A node declares a link to every other node it cites. A node cites another node when any of its properties holds `§` followed by that node's sid, text quoted as code included. These properties do not count:\n- the node's links;\n- the nodes under it;\n- values built from other nodes.\n\nA node of the archive is not held to this rule.";
node.ruText = "Узел объявляет связь с каждым другим узлом, на который он ссылается. Узел ссылается на другой узел, когда любое его свойство, включая текст, оформленный как код, содержит `§` и sid этого узла. Эти свойства не считаются:\n- связи узла;\n- узлы под ним;\n- значения, построенные из других узлов.\n\nНа узел архива это правило не распространяется.";
node.reason = "Whoever changes a node learns what relies on it from the links pointing at it. Those links are built only from declared links, never from citations.\n\nA node's links already name the nodes they point at. A node under it has links of its own. The nodes a built value is copied from hold the links themselves.\n\nA node of the archive is no longer part of the specification, so a change to a node it cites breaks nothing.";
node.ruReason = "Тот, кто меняет узел, узнаёт, что на него опирается, из связей, указывающих на него. Эти связи строятся только из объявленных связей и никогда из ссылок.\n\nСвязи узла и так называют узлы, на которые указывают. У узла под ним свои связи. Связи хранятся у тех узлов, из которых скопировано построенное значение.\n\nУзел архива больше не часть спецификации, поэтому изменение узла, на который он ссылается, ничего не ломает.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("6.3:", node.title);
