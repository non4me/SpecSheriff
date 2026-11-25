// Node 1.3.5: the owner accepted the proposal of fix-newform-260.mjs (2026-11-14, «ок»): an approval covers a node's
// examples too. Node 10.4 follows node 1.3.5 in its list of a node's wording, so it gains the examples as well; that carries
// out what the owner agreed to, so node 10.4 keeps the owner's agreement. Draft 8.6 is new: the kind `TableRule`, as the
// owner designed it on 2026-11-11 (table-kind-design.html): a cell holds text or a node, the kind TableRow is withdrawn,
// rows may be grouped, and a TableRule is used only where it is needed.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const a = d["1.3.5"];
const p = a.proposals[0];
a.text = p.en.replace(/^Text: /, "");
a.ruText = p.ru.replace(/^Текст: /, "");
delete a.proposals;
a.changes.push("Вы приняли предложение (2026-11-14): одобрение покрывает и примеры узла, по согласованному 7.16.");

const n = d["10.4"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`10.4.${field}: missing ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "is its title, its text, its reason and the fields its kind adds", "is its title, its text, its reason, its examples and the fields its kind adds");
swap("ruText", "его заголовок, текст, обоснование и поля, которые добавляет его тип", "его заголовок, текст, обоснование, примеры и поля, которые добавляет его тип");
n.changes.push("В список формулировки добавлены примеры, вслед за согласованным 1.3.5 (2026-11-14). Смысл вашего решения не менялся.");

if (d["8.6"]) throw new Error("draft 8.6 exists");
d["8.6"] = {
  from: "",
  sid: "new",
  title: "A rule may be a table",
  ruTitle: "Правило может быть таблицей",
  text:
    "A rule whose requirements are set out as a table is a node of the kind `TableRule`. Its head has a title, a text and a reason, as a `TextRule` has, and names the table's columns. " +
    "Each cell of the table holds either text or a node of an existing kind, such as a rule or a term. A node in a cell has no title of its own: its column and its row name it. " +
    "The rows may be grouped under headings, and a group's heading is part of the wording of the nodes under it.\n\n" +
    "A table may also be written in a node's text. A `TableRule` is used only where it is needed:\n" +
    "- a column is to be checked against the code;\n" +
    "- the head requires something of every row;\n" +
    "- the rows need to be nodes.",
  ruText:
    "Правило, требования которого изложены таблицей, — это узел типа `TableRule`. Его шапка, как у `TextRule`, состоит из заголовка, текста и обоснования и называет столбцы таблицы. " +
    "Каждая ячейка таблицы содержит либо текст, либо узел существующего типа, например правило или термин. У узла в ячейке нет своего заголовка: его называют столбец и строка. " +
    "Строки можно сгруппировать под заголовками групп; заголовок группы входит в формулировку узлов под ним.\n\n" +
    "Таблицу можно написать и в тексте узла. `TableRule` используют, только если это нужно:\n" +
    "- столбец сверяется с кодом;\n" +
    "- шапка требует чего-то от каждой строки;\n" +
    "- строки должны быть узлами.",
  reason:
    "A table shows at a glance what many requirements share and where they differ. Made a node, each requirement in a cell can be approved, cited and bound to code on its own.",
  ruReason:
    "Таблица сразу показывает, что общего у многих требований и чем они различаются. Став узлом, каждое требование в ячейке можно одобрять, цитировать и связывать с кодом отдельно.",
  changes: [
    "Новый узел, по вашей схеме от 11 ноября (table-kind-design.html): ячейка содержит текст или узел, тип TableRow снят, строки можно группировать, TableRule — только по необходимости. По нему устроена таблица проверок 10.1.",
  ],
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("1.3.5 agreed; 10.4 follows; draft 8.6 written");
