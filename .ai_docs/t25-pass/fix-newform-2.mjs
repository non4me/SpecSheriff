// The owner's comment on 1.1.1 (2026-11-07): the nodes are linked by a structure and by links of
// several types, a graph rather than a list; nothing about rules yet, they have the group 1.2.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.1"];

n.text = "The specification is the set of its nodes. The nodes are linked to one another by a structure. Where it needs to, a node also links to other nodes, by links of several types.";
n.ruText = "Спецификация — это совокупность её узлов. Узлы связаны между собой структурой. Где нужно, узел ещё и ссылается на другие узлы связями разных типов.";
n.reason = "The specification is held in its nodes and nowhere else, so it exists in one version. The nodes form a graph, not a list. What a node means depends on the section it stands in and on the nodes it links to. Through the links, everything a change touches is found.";
n.ruReason = "Спецификация хранится в своих узлах и больше нигде, поэтому существует в одной версии. Узлы образуют граф, а не список. Смысл узла зависит от раздела, в котором он стоит, и от узлов, на которые он ссылается. По связям находится всё, чего касается изменение.";
n.changes = [
  "Заголовок — ваш, из комментария.",
  "Текст: первая фраза — первая фраза нынешнего 1.1, дословно. Вторая и третья новые, по вашему комментарию: узлы связаны структурой и ссылаются друг на друга связями разных типов.",
  "Обоснование новое: нынешнее обоснование 1.1 целиком о сгенерированных копиях и уходит с ними в 11.1 и 11.2. О правилах в нём ничего нет, по вашему комментарию: о них говорит группа 1.2.",
];

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
const before = `"При разделении текст о генерации уходит в 11.1 и 11.2 вместе с нынешним sid. Заголовок — ваш, из комментария. Добавить ли, что узлы связаны, решим при показе узла.",["11.1","11.2","5.1","6.1","6.2"]`;
const after = `"При разделении текст о генерации уходит в 11.1 и 11.2 вместе с нынешним sid. Заголовок — ваш, из комментария. Что узлы связаны структурой и связями разных типов, сказано в тексте, по вашему комментарию.",["11.1","11.2","5.1","6.1","6.2","6.3"]`;
if (!h.includes(before)) throw new Error("1.1.1 row not found");
h = h.replace(before, after);
fs.writeFileSync(page, h);
console.log("1.1.1 rewritten");
