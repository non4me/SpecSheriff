// The owner, 2026-11-09: "основное правило" / "main rule" over "base rule" in 13.1.2, agreed so; 13.1.3 follows the same
// term, its title and text saying "main rule" where they said "a rule outside the extensions".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const swap = (n, field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
const a = d["13.1.2"];
a.title = "An extension of the guidelines may change a main rule";
a.ruTitle = "Расширение guidelines может изменить основное правило";
swap(a, "text", "may change a base rule.", "may change a main rule.");
swap(a, "ruText", "может изменить базовое правило.", "может изменить основное правило.");
a.changes.push("По вашему решению «основное правило» вместо «базовое правило».");
a.agreed = "2026-11-09";

const b = d["13.1.3"];
b.title = "A main rule names no particular extension";
b.ruTitle = "Основное правило не называет конкретных расширений";
swap(b, "text", "The text and the reason of a rule outside the extensions name", "The text and the reason of a main rule name");
swap(b, "ruText", "Текст и обоснование правила вне расширений не называют", "Текст и обоснование основного правила не называют");
b.changes.push("«Основное правило» вместо «правило вне расширений», вслед за вашим решением об узле 13.1.2.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pagePath = new URL("base-structure.html", here);
let page = fs.readFileSync(pagePath, "utf8");
for (const [from, to] of [
  ["An extension of the guidelines may change a base rule", a.title],
  ["Расширение guidelines может изменить базовое правило", a.ruTitle],
  ["A rule outside the extensions names no particular extension", b.title],
  ["Правило вне расширений не называет конкретных расширений", b.ruTitle],
]) {
  if (!page.includes(`"${from}"`)) throw new Error("no row title: " + from);
  page = page.replace(`"${from}"`, `"${to}"`);
}
fs.writeFileSync(pagePath, page);
console.log(a.title, "|", b.title);
console.log(b.text);
console.log(b.ruText);
