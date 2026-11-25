// The owner, 2026-11-10: node 8.3 is titled «Собственные типы узлов в проекте», and the Russian word for kind is «тип», over «вид».
// The English keeps "kind", the schema's key, so only the Russian readings change and an agreement stays as it was.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const pagePath = new URL("base-structure.html", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const swap = (k, field, from, to) => {
  if (!d[k][field].includes(from)) throw new Error(`${k}.${field}: no "${from}"`);
  d[k][field] = d[k][field].replaceAll(from, to);
};

const b = d["8.3"];
if (b.sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");
b.title = "A project's own kinds of node";
b.ruTitle = "Собственные типы узлов в проекте";
swap("8.3", "ruText", "для каждого собственного вида узлов, нужен ли узлам этого вида код", "для каждого собственного типа узлов, нужен ли узлам этого типа код");
swap("8.3", "ruText", "перечисляет каждый собственный вид узлов", "перечисляет каждый собственный тип узлов");
swap("8.3", "ruReason", "выполняются ли узлы вида, который он добавляет", "выполняются ли узлы типа, который он добавляет");
swap("8.3", "ruReason", "Вид узлов, которому код не нужен", "Тип узлов, которому код не нужен");

const OWN = ["собственного вида в проекте", "собственного типа в проекте"];
for (const k of ["6.1", "8.2", "11.4", "11.5", "13.12"]) swap(k, "ruText", ...OWN);
swap("8.2", "ruReason", ...OWN);
swap("5.2", "ruText", "собственные виды узлов", "собственные типы узлов");
swap("5.2", "ruReason", "Проекту нужны виды узлов", "Проекту нужны типы узлов");
swap("10.1", "ruText", "которые его вид добавляет к ним", "которые его тип добавляет к ним");

for (const n of Object.values(d))
  if (Array.isArray(n.changes))
    n.changes = n.changes.map((c) =>
      c
        .replaceAll("собственный вид в проекте", "собственный тип в проекте")
        .replaceAll("собственного вида в проекте", "собственного типа в проекте")
        .replaceAll("исключённого вида узла", "исключённого типа узла"),
    );
b.changes = [...b.changes, "Заголовок ваш. Было «Нужен ли код узлам собственного вида в проекте», \"Whether a project's own kind of node needs code\". В русском чтении `kind` теперь «тип»."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const page = fs.readFileSync(pagePath, "utf8");
const from = 'ru: "Виды узлов и их расположение"';
if (!page.includes(from)) throw new Error("no section title on the page");
fs.writeFileSync(pagePath, page.replace(from, 'ru: "Типы узлов и их расположение"'));
console.log(JSON.stringify({ title: b.title, ruTitle: b.ruTitle, ruText: b.ruText, ruReason: b.ruReason }, null, 2));
