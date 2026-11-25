// The owner's comments of 2026-11-07 on the page: in 1.1.1's reason the two selected sentences go; in
// 1.1.2 the title moves into the text as its first sentence, and the title becomes "The basic
// structure of the specification".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const rep = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`not found: ${a}`);
  return s.replace(a, b);
};

const a = d["1.1.1"];
a.reason = rep(a.reason, " The nodes form a graph, not a list. What a node means depends on the section it stands in and on the nodes it links to.", "");
a.ruReason = rep(a.ruReason, " Узлы образуют граф, а не список. Смысл узла зависит от раздела, в котором он стоит, и от узлов, на которые он ссылается.", "");

const b = d["1.1.2"];
const oldTitle = b.title, oldRu = b.ruTitle;
b.text = oldTitle + ". " + b.text;
b.ruText = oldRu + ". " + b.ruText;
b.title = "The basic structure of the specification";
b.ruTitle = "Базовая структура спецификации";
b.changes = [
  "Новый узел. Заголовок — ваш, из комментария. Прежний заголовок, тоже ваш, стал первой фразой текста.",
  "Остальной текст и обоснование новые. Обоснование взято из вашего принципа «Три документа, меняющихся с тремя скоростями».",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
h = rep(h, `["1.1.2","new",1,"","${oldTitle}","${oldRu}"`, `["1.1.2","new",1,"","The basic structure of the specification","Базовая структура спецификации"`);
fs.writeFileSync(page, h);
console.log("1.1.1 reason:", a.reason, "\n1.1.2 text:", b.text.split("\n")[0]);
