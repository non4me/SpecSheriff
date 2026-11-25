// The owner's comment of 2026-11-10 on 8.4: «`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON схемы.»
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
swap("ruText", "`TextRule.list.declaredIn` этого правила называет `kinds` расширения.", "`TextRule.list.declaredIn` этого правила ссылается на поле `kinds` JSON-схемы.");
swap("text", "That rule's `TextRule.list.declaredIn` names the extension's `kinds`.", "That rule's `TextRule.list.declaredIn` refers to the field `kinds` of the JSON Schema.");
b.changes = [...b.changes, "По вашему комментарию: `TextRule.list.declaredIn` «ссылается на поле `kinds` JSON-схемы»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n")[1]);
console.log(b.text.split("\n\n")[1]);
