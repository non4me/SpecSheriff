// 9.7 "Exempting a rule from being implemented", by the author's checklist (2026-11-11): "gives the reason in its
// own text" collided with a node's reason, the field `reason` (one name, one thing; 7.9): it now says why the
// exemption is made, and the node's reason says "grounds".
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
swap("text", "The exempting node gives the reason in its own text.", "The exempting node says in its own text why the exemption is made.");
swap("ruText", "Освобождающий узел приводит причину в своём собственном тексте.", "Освобождающий узел говорит в собственном тексте, почему сделано освобождение.");
swap("reason", "the exemption and its reason are approved", "the exemption and its grounds are approved");
swap("ruReason", "освобождение вместе с причиной одобряется", "освобождение вместе с его основанием одобряется");
b.changes.push("Было «gives the reason in its own text», стало «says in its own text why the exemption is made»: слово reason уже называет обоснование узла, его поле `reason`. В обосновании «its reason» стало «its grounds».");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n---\n" + b.reason + "\n" + b.ruText + "\n" + b.ruReason);
