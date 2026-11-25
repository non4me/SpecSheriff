// The owner of 2026-11-11 on 9.7: the third paragraph's first sentence goes; it repeated the second, and read with
// a link to a section it asked to cite every rule under that section. The second sentence names the exempting
// node's text itself.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.7"];
if (b.sidValue !== "s-gf6n8ge4mke3pr2" || b.agreed) throw new Error("unexpected 9.7");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "The exempting node's text cites each rule or section it exempts. An `exempts` link stands only where that text cites its target.", "An `exempts` link stands only where the exempting node's text cites its target.");
swap("ruText", "Текст освобождающего узла ссылается на каждое правило или раздел, которые он освобождает. Связь `exempts` стоит только там, где этот текст ссылается на её цель.", "Связь `exempts` стоит только там, где текст освобождающего узла ссылается на её цель.");
b.changes.push("По вашему выбору ушла фраза «The exempting node's text cites each rule or section it exempts»: она повторяла следующую и при связи с разделом требовала ссылаться на каждое правило под ним.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
