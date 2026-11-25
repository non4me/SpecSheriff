// The owner of 2026-11-10 on 9.1: a todo that concerns several nodes is kept on one of them and names the others by their sids (the reviewer's doubt of review-8-10.md).
// The definition said "concerns one node", which the new sentence would contradict, so it says "one node or several", and "that node's" becomes "the node it concerns".
// The reason says why such a todo is kept once.
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
swap("text", "A todo is work put off that concerns one node. It is kept as an item of that node's `meta.todos`.", "A todo is work put off that concerns one node or several. It is kept as an item of the `meta.todos` of the node it concerns.");
swap("text", "A todo is removed once it is done or given up.\n\n", "A todo is removed once it is done or given up.\n\nA todo that concerns several nodes is kept on one of them and names the others by their sids.\n\n");
swap("ruText", "Todo — это отложенная работа, касающаяся одного узла. Оно хранится как элемент `meta.todos` этого узла.", "Todo — это отложенная работа, касающаяся одного узла или нескольких. Оно хранится как элемент `meta.todos` узла, которого касается.");
swap("ruText", "Todo удаляется, когда оно выполнено или от него отказались.\n\n", "Todo удаляется, когда оно выполнено или от него отказались.\n\nTodo, касающееся нескольких узлов, хранится в одном из них и называет остальные по sid.\n\n");
swap("reason", "Left once done or given up, it shows work waiting that no longer waits.", "Left once done or given up, it shows work waiting that no longer waits. Kept once where it concerns several nodes, it is removed once.");
swap("ruReason", "Оставленное после того, как оно выполнено или от него отказались, оно показывает ждущей работу, которая больше не ждёт.", "Оставленное после того, как оно выполнено или от него отказались, оно показывает ждущей работу, которая больше не ждёт. Хранимое один раз, когда касается нескольких узлов, оно и удаляется один раз.");
b.changes = [...b.changes, "По вашему решению 2026-11-10: todo, касающееся нескольких узлов, хранится в одном из них и называет остальные по sid. Поэтому первая фраза говорит «одного узла или нескольких», а обоснование — зачем такое todo хранится один раз."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log("---");
console.log(b.ruText);
console.log("---");
console.log(b.reason);
