// The reviewer of 2026-11-10 on 9.1 after the owner's sentence on several nodes: "the node it concerns" assumed one node, so "a node" in the text and the title,
// the title saying "kept" as the text does; the two cases of removal joined by "or" become a list, as agreed 7.6 asks; the reason's last sentence names the problem
// it solves rather than a consequence; the Russian reason says «по нему», as "waits on it". The reason's first sentence stays: it grounds where a todo is kept.
// The owner's sentence "names the others by their sids" stays until they rule on "cites".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.1"];
if (b.sidValue !== "s-t28j22vbdmmeqnh" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("title", "A todo lives on the node it concerns", "A todo is kept on a node it concerns");
swap("text", "It is kept as an item of the `meta.todos` of the node it concerns.", "It is kept as an item of the `meta.todos` of a node it concerns.");
swap("text", "A todo is removed once it is done or given up.", "A todo is removed in each of these cases:\n- it is done;\n- it is given up.");
swap("ruText", "Todo удаляется, когда оно выполнено или от него отказались.", "Todo удаляется в каждом из этих случаев:\n- оно выполнено;\n- от него отказались.");
swap("reason", "Kept once where it concerns several nodes, it is removed once.", "Kept on one node where it concerns several, it leaves no copy behind to show work that no longer waits.");
swap("ruReason", "Хранимое один раз, когда касается нескольких узлов, оно и удаляется один раз.", "Хранимое в одном узле, когда касается нескольких, оно не оставляет копий, показывающих работу, которая больше не ждёт.");
swap("ruReason", "что в нём ещё ждёт", "что по нему ещё ждёт");
b.changes[b.changes.length - 1] = "По вашему решению 2026-11-10: todo, касающееся нескольких узлов, хранится в одном из них и называет остальные по sid. Поэтому первая фраза говорит «одного узла или нескольких», а обоснование — зачем такое todo хранится в одном узле.";
b.changes.push("По рецензенту: заголовок говорит «хранится», как текст; два случая удаления — списком, как требует согласованный 7.6.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify({ title: b.title, ruTitle: b.ruTitle, text: b.text, ruText: b.ruText, reason: b.reason, ruReason: b.ruReason, changes: b.changes }, null, 2));
