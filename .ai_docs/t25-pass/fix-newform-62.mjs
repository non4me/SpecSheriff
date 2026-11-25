// Node 4.2: the owner's title of 2026-11-09, «Как техническое приложение связано с базовой спецификацией»; the appendix
// describes the implementation, and the code implements.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.2"];

const oldTitle = n.title;
const oldRuTitle = n.ruTitle;
n.title = "How the technical appendix relates to the base specification";
n.ruTitle = "Как техническое приложение связано с базовой спецификацией";
n.changes.push("Заголовок — ваш: приложение описывает реализацию, а реализует её код.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pagePath = new URL("base-structure.html", here);
let page = fs.readFileSync(pagePath, "utf8");
const row = `"${oldTitle}","${oldRuTitle}"`;
if (!page.includes(row)) throw new Error("no row title");
page = page.replace(row, `"${n.title}","${n.ruTitle}"`);
fs.writeFileSync(pagePath, page);
console.log(n.title, "|", n.ruTitle);
