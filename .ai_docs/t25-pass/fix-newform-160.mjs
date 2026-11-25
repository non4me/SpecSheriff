// The owner of 2026-11-10 on 9.1: a todo concerning several nodes "cites the others" / «ссылается на остальные» rather than naming them by their sids, since a bare
// sid is no citation and the other nodes would show nothing of it, while citing (agreed 6.3) gives each of them an incoming link (6.4).
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
swap("text", "is kept on one of them and names the others by their sids.", "is kept on one of them and cites the others.");
swap("ruText", "хранится в одном из них и называет остальные по sid.", "хранится в одном из них и ссылается на остальные.");
const at = b.changes.findIndex((c) => c.startsWith("По вашему решению 2026-11-10: todo, касающееся нескольких узлов"));
if (at < 0) throw new Error("no change line on several nodes");
b.changes[at] = "По вашему решению 2026-11-10: todo, касающееся нескольких узлов, хранится в одном из них и ссылается на остальные, так что каждый из них показывает входящую связь. Поэтому первая фраза говорит «одного узла или нескольких», а обоснование — зачем такое todo хранится в одном узле.";
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n\n")[1]);
console.log(b.ruText.split("\n\n")[1]);
