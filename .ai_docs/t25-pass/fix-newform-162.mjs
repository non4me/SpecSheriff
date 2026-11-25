// The owner deleted the node on the listing of every todo (s-5z7d52ykd6bzctg), 2026-11-10, which the reason of 1.2.5 cited. The sentence now says the same without
// the citation: "Kept in a comment, it is missed wherever the todos are collected." The reviewer's Russian, «выпадает везде», says every such place, as "wherever" does.
// The reason's other sentences, agreed today, stay. The node is a draft again until the owner agrees.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["1.2.5"];
if (b.sidValue !== "s-t28j22vbdmmeqnh" || !b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("reason", "Kept in a comment, it is missed by the listing of every todo (§s-5z7d52ykd6bzctg).", "Kept in a comment, it is missed wherever the todos are collected.");
swap("ruReason", "Хранимое в комментарии, оно выпадает из списка всех todo (§s-5z7d52ykd6bzctg).", "Хранимое в комментарии, оно выпадает везде, где собирают todo.");
delete b.agreed;
b.changes = [...b.changes, "Узел о списке всех todo удалён по вашему решению, поэтому обоснование больше на него не ссылается: «Хранимое в комментарии, оно выпадает везде, где собирают todo»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
console.log(b.ruReason);
