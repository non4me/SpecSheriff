// The owner of 2026-11-10 reopened agreed 7.9 to follow 7.8: "carries its object" / «несёт свой объект», the wording they rejected in 7.8, goes from its title
// and its first paragraph, replaced by "includes what it applies to" / «включает то, к чему оно относится». "Object" stays where it means what a field or property
// belongs to. The node is a draft again until the owner agrees.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.9"];
if (b.sidValue !== "s-9w3u3wn37wksyxd" || !b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("title", "A name the specification defines carries its object", "A name the specification defines includes what it applies to");
swap("ruTitle", "Имя, определённое спецификацией, несёт свой объект", "Имя, определённое спецификацией, включает то, к чему оно относится");
swap("text", "It carries its object: userAction, not action.", "It includes what it applies to: userAction, not action.");
swap("ruText", "Оно несёт свой объект: userAction, а не action.", "Оно включает то, к чему относится: userAction, а не action.");
delete b.agreed;
b.changes = [...b.changes, "По вашему решению 2026-11-10, вслед за 7.8: «несёт свой объект» ушло из заголовка и первого абзаца, теперь «включает то, к чему оно относится». «Объект» остался там, где это объект, которому принадлежит поле или свойство."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
console.log(b.text.split("\n")[0]);
