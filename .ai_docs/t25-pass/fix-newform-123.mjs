// The owner's comment of 2026-11-10 on 8.3: the first sentence of paragraph 2 duplicates paragraph 1, so it goes.
// Only that sentence: the two after it lean on it ("That rule's", "that list"), and their rewording is proposed to the owner separately.
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
swap("text", "A rule of the project's own guidelines, refining this one, lists each of the project's own kinds of node with whether its nodes need code. That rule's", "That rule's");
swap("ruText", "Правило собственных guidelines проекта, уточняющее это правило, перечисляет каждый собственный тип узлов и указывает, нужен ли его узлам код. `TextRule", "`TextRule");
b.changes = [...b.changes, "Первое предложение второго абзаца убрано по вашему комментарию: оно дублировало первый абзац."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
