// Draft 8.6: the specification reviewer's fixes (2026-11-14). The kind alone stays in 8.6: a TableRule's title, text and
// reason, its columns, its cells, and grouped rows. The choice to make a rule a TableRule only where it is needed binds
// whoever writes a rule and is applied apart from the kind (7.7), so it becomes a draft of its own, 7.18, beside 7.16.
// That a group's heading belongs to the wording of the nodes under it is applied at approval, so it goes to node 1.3.5,
// together with the owner's ruling of 2026-11-11 that a row's text cells and a column's heading belong to that wording.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const n = d["8.6"];
n.text =
  "A rule may be set out as a table, as a node of the kind `TableRule`. A `TableRule` has a title, a text and a reason, as a `TextRule` has. It also names its table's columns. " +
  "Each cell of the table holds either text or a node of a kind that the specification's schema declares, such as a rule or a term. " +
  "A node in a cell has no title of its own. Its column and its row name it. The rows may be grouped under headings.";
n.ruText =
  "Правило можно изложить таблицей — узлом типа `TableRule`. У `TableRule`, как у `TextRule`, есть заголовок, текст и обоснование. Ещё он называет столбцы таблицы. " +
  "Каждая ячейка таблицы содержит либо текст, либо узел типа, который объявляет схема спецификации, например правило или термин. " +
  "У узла в ячейке нет своего заголовка. Его называют его столбец и его строка. Строки можно сгруппировать под заголовками.";
n.reason =
  "A table shows at a glance what many requirements share and where they differ. A requirement in a cell that is a node can be approved, cited and bound to code on its own.";
n.ruReason =
  "Таблица сразу показывает, что общего у многих требований и чем они различаются. Требование в ячейке, ставшее узлом, можно одобрять, цитировать и связывать с кодом отдельно.";
n.changes.push(
  "По рецензенту: одна мысль в предложении (7.5); «узел существующего типа» стал «узлом типа, который объявляет схема спецификации» (7.8); слово «шапка» ушло.",
  "По рецензенту (7.7): «TableRule — только по необходимости» обязывает автора правила и применяется отдельно — это новый черновик 7.18 рядом с 7.16. Что заголовок группы входит в формулировку узлов под ним, применяется при одобрении — это уходит в 1.3.5 вместе с вашим решением от 11 ноября о текстовых ячейках строки и заголовке столбца.",
);

if (d["7.18"]) throw new Error("draft 7.18 exists");
d["7.18"] = {
  from: "",
  sid: "new",
  title: "A rule is made a table only where it is needed",
  ruTitle: "Правило делают таблицей только там, где это нужно",
  text:
    "Whoever writes a rule makes it a `TableRule` only where at least one of these holds:\n" +
    "- the values in a column are to be checked against those that the code declares;\n" +
    "- the rule's text requires something of every row;\n" +
    "- a requirement in a cell needs to be a node of its own.\n\n" +
    "Elsewhere, a table is written in the node's text.",
  ruText:
    "Автор правила делает его `TableRule`, только если выполняется хотя бы одно из условий:\n" +
    "- значения столбца сверяются с теми, что объявлены в коде;\n" +
    "- текст правила требует чего-то от каждой строки;\n" +
    "- требование в ячейке должно быть отдельным узлом.\n\n" +
    "В остальных случаях таблицу пишут в тексте узла.",
  reason: "A `TableRule` costs more to write, read and keep than a table in a node's text, so it is used only where a check or a node needs it.",
  ruReason: "`TableRule` труднее писать, читать и поддерживать, чем таблицу в тексте узла, поэтому его используют только там, где он нужен проверке или узлу.",
  changes: ["Новый узел, выделен рецензентом из черновика 8.6 (7.7), по вашему решению от 11 ноября: TableRule и узел в ячейке — только по необходимости."],
};

const a = d["1.3.5"];
const sentence =
  "The wording of a node in a cell of a `TableRule` also includes the text cells of its row and the headings of its column and of its group.";
const ruSentence =
  "Формулировка узла в ячейке `TableRule` включает также текстовые ячейки его строки и заголовки его столбца и его группы.";
const [first, ...rest] = a.text.split("\n\n");
const [ruFirst, ...ruRest] = a.ruText.split("\n\n");
a.proposals = [
  {
    where: "новое предложение в конце первого абзаца",
    en: "Text: " + [first + " " + sentence, ...rest].join("\n\n"),
    ru: "Текст: " + [ruFirst + " " + ruSentence, ...ruRest].join("\n\n"),
    why:
      "По вашему решению от 11 ноября: текстовые ячейки строки и заголовок столбца входят в формулировку узла в этой строке; заголовок группы — текст строк под ним. " +
      "Без этого предложения изменение такой ячейки или заголовка не делало бы узел черновиком, и одобренное требование читалось бы иначе.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("8.6 rewritten; 7.18 drafted; 1.3.5 proposal set");
