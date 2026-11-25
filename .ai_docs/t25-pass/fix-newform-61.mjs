// Node 4.2: the reviewer's fixes of 2026-11-09 (review-4-5.md).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.2"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
const oldTitle = n.title;
const oldRuTitle = n.ruTitle;
n.title = "The technical appendix carries out the base specification";
n.ruTitle = "Техническое приложение реализует базовую спецификацию";
swap("ruText", "крайние случаи", "эйджкейсы");
swap("reason", "Read beside the nodes it implements,", "Described less exactly, a node would leave a choice to whoever implements it (§s-tj38pvm38nepaf5). Read beside the nodes it implements,");
swap("ruReason", "Узел приложения, который читают рядом с узлами,", "Описанный менее точно, узел оставил бы выбор тому, кто его реализует (§s-tj38pvm38nepaf5). Узел приложения, который читают рядом с узлами,");
n.changes.push("Правки рецензента: заголовок, «эйджкейсы» вместо «крайние случаи», основание подробности описания в обосновании.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pagePath = new URL("base-structure.html", here);
let page = fs.readFileSync(pagePath, "utf8");
const row = `"${oldTitle}","${oldRuTitle}"`;
if (page.includes(row)) page = page.replace(row, `"${n.title}","${n.ruTitle}"`);
fs.writeFileSync(pagePath, page);
console.log(n.title);
