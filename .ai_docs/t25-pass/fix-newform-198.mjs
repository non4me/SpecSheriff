// The owner of 2026-11-11 on 9.5: "The message names no section" goes. Its problem of 2026-10-07, a domain's
// header named in place of the rule, cannot arise once the message names each node a SpecTag binds to a changed
// symbol, and a section named beside them does no harm.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ef93u6cnbs2sevr" || b.agreed) throw new Error("unexpected 9.5");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "\n\nThe message names no section.", "");
swap("ruText", "\n\nСообщение не называет ни одного раздела.", "");
b.changes.push("По вашему выбору ушёл абзац «The message names no section». Его проблема 7 октября, заголовок домена вместо правила, больше не возникает: сообщение обязано назвать каждый узел, с которым SpecTag связывает изменённый символ. Раздел, названный рядом, вреда не несёт.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n" + b.ruText);
