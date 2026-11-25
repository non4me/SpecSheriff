// The owner, 2026-11-09: the title of 6.5 is "Links between terms", answering their own comment on that word.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const n = d["6.5"];
if (n.sidValue !== "s-76dutms9uv6uha2") throw new Error("6.5 is another node");
n.title = "Links between terms";
n.ruTitle = "Связи между терминами";
n.changes = n.changes.map(c => c.startsWith("Заголовок и обоснование новые") ? "Заголовок — ваш. Обоснование новое, в формулировке рецензента." : c);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const pagePath = new URL("base-structure.html", here);
const page = fs.readFileSync(pagePath, "utf8");
const from = "уходит сюда: Какие связи соединяют два термина";
if (!page.includes(from)) throw new Error("the row of 6.5 is not as expected");
fs.writeFileSync(pagePath, page.replace(from, "уходит сюда: Связи между терминами"));
console.log("6.5:", n.title, "|", n.ruTitle);
