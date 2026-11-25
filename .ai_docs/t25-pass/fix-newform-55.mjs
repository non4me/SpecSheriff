// Node 13.1.2: the owner's wording of 2026-11-09 for its title and first sentence, «Расширение guidelines может изменить
// базовое правило»; the English follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["13.1.2"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
n.title = "An extension of the guidelines may change a base rule";
n.ruTitle = "Расширение guidelines может изменить базовое правило";
swap("text", "An extension of the guidelines may change a rule outside the extensions.", "An extension of the guidelines may change a base rule.");
swap("ruText", "Расширение guidelines может изменить правило вне расширений.", "Расширение guidelines может изменить базовое правило.");
n.changes.push("Заголовок и первая фраза — ваша формулировка, английский текст следует за ней.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.title, "|", n.ruTitle);
console.log(n.text.split("\n\n")[0]);
