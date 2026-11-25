// The owner's comment of 2026-11-10 on 8.4, on the word «собственных»: «в». The comment replaces the selected word, and only the first of its two places reads with it:
// «Правило в guidelines проекта уточняет…». The English keeps the name "the project's own guidelines".
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
swap("ruText", "Правило собственных guidelines проекта уточняет", "Правило в guidelines проекта уточняет");
swap("text", "A rule of the project's own guidelines refines", "A rule in the project's own guidelines refines");
b.changes = [...b.changes, "По вашему комментарию: «Правило в guidelines проекта»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n")[1]);
console.log(b.text.split("\n\n")[1]);
