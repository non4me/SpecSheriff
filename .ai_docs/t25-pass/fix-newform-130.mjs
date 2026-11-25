// The owner's comment of 2026-11-10 on 8.4, on the fragment «в `kinds` этой схемы»: «в поле `kinds`».
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
swap("ruText", "в `kinds` этой схемы (§s-xm8rz4uupb73gu5).", "в поле `kinds` (§s-xm8rz4uupb73gu5).");
swap("text", "under that schema's `kinds` (§s-xm8rz4uupb73gu5).", "in the field `kinds` (§s-xm8rz4uupb73gu5).");
b.changes = b.changes.map((c) => c === "По вашему комментарию: «в свою JSON-схему». Ключ сохранён: «в `kinds` этой схемы»." ? "По вашим комментариям: «в свою JSON-схему, в поле `kinds`»." : c);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text.split("\n")[0]);
console.log(b.ruText.split("\n")[0]);
