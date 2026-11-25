// The owner's comment of 2026-11-10 on 8.4, on the fragment «добавляет тип»: «добавляет новый тип».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.4"];
if (b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "Проект добавляет тип узлов", "Проект добавляет новый тип узлов");
swap("text", "A project adds a kind of node", "A project adds a new kind of node");
b.changes = [...b.changes, "По вашему комментарию: «добавляет новый тип узлов»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
