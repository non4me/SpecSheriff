// The owner's comment of 2026-11-10 on 8.3, on the fragment «объявляют для каждого собственного типа узлов, требуется ли его имплементация.»:
// «могут объявить для собственный тип узла и указать требуется ли его имплементация.» Their words go in, only the stray «для», left from the wording it replaced, gone and a comma added.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "объявляют для каждого собственного типа узлов, требуется ли его имплементация.", "могут объявить собственный тип узла и указать, требуется ли его имплементация.");
swap("text", "declare, for each of the project's own kinds of node, whether its implementation is required.", "may declare a kind of node of the project's own and state whether its implementation is required.");
b.changes = [...b.changes, "Конец первого абзаца заменён вашими словами: «могут объявить собственный тип узла и указать, требуется ли его имплементация». Убрано только лишнее «для», добавлена запятая."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
