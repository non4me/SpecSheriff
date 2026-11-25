// The owner of 2026-11-10 on 8.4: the sentence on the name becoming a value of a node's `kind` adds nothing to the first sentence of the paragraph, so it goes.
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
swap("text", " The name it is added under becomes a permitted value of a node's `kind`.", "");
swap("ruText", " Имя, под которым он добавлен, становится допустимым значением `kind` узла.", "");
b.changes = [...b.changes, "По вашему замечанию убрано предложение о том, что имя типа становится значением `kind` узла: оно ничего не добавляло к первому."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
