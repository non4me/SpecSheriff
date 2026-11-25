// The owner, 2026-11-10: two rules the reviewer found stated nowhere in the guidelines are added to section 7. The ban on a title
// repeating the first sentence is left out, since agreed titles do so word for word, some of them the owner's own. Run after
// `node insert-node.mjs 7.4` and `node insert-node.mjs 7.10`, which made room.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["7.4"] || d["7.10"]) throw new Error("no room");

const everything = JSON.stringify(d) + fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8");
const A = "23456789abcdefghjkmnpqrstuvwxyz";
const fresh = () => { let s; do { s = "s-" + Array.from(crypto.randomBytes(15), b => A[b % A.length]).join(""); } while (everything.includes(s)); return s; };

d["7.4"] = {
  from: "", sid: "new", title: "A title says what the node governs", ruTitle: "Заголовок говорит, что регулирует узел",
  text: "A node's title says in a few words what the node governs. A reader who sees only the title can tell what the node is about.",
  reason: "Links, indexes and maps show a node by its title alone, so a reader chooses what to open by it.",
  ruText: "Заголовок узла в нескольких словах говорит, что регулирует узел. Читатель, видящий только заголовок, понимает, о чём этот узел.",
  ruReason: "Связи, указатели и карты показывают узел только заголовком, и по нему читатель решает, что открыть.",
  changes: [
    "Новый узел, по вашему решению. До сих пор это было только в правилах работы с вами.",
  ],
  sidValue: fresh(),
};
d["7.10"] = {
  from: "", sid: "new", title: "A definition says what a thing is", ruTitle: "Определение говорит, что вещь собой представляет",
  text: "A definition states what the defined thing is, never only what it is not. So not “an operator is whoever is not a customer”, but “an operator is a person who runs the system for its customers”.",
  reason: "Whatever is merely not the things named is a class nobody has looked at, so a definition by negation takes in what its author never meant.",
  ruText: "Определение говорит, что представляет собой определяемая вещь, а не только чем она не является. Поэтому не «оператор — это тот, кто не клиент», а «оператор — это человек, который обслуживает систему для её клиентов».",
  ruReason: "То, что просто не входит в названное, — множество, которое никто не рассматривал, поэтому определение от противного захватывает то, чего автор не имел в виду.",
  changes: [
    "Новый узел, по вашему решению от 2026-11-09: определение от противного недопустимо.",
  ],
  sidValue: fresh(),
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const addAfter = (before, row) => {
  const at = lines.findIndex(l => l.trim().startsWith(`["${before}",`));
  if (at < 0) throw new Error("no row " + before);
  const indent = lines[at].slice(0, lines[at].indexOf("["));
  if (!lines[at].trim().endsWith(",")) lines[at] += ",";
  lines.splice(at + 1, 0, indent + JSON.stringify(row) + ",");
};
addAfter("7.3", ["7.4", "new", 0, "", d["7.4"].title, d["7.4"].ruTitle, "", "Новый узел, по вашему решению.", []]);
addAfter("7.9", ["7.10", "new", 0, "", d["7.10"].title, d["7.10"].ruTitle, "", "Новый узел, по вашему решению.", []]);
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("7.4", d["7.4"].sidValue, "7.10", d["7.10"].sidValue);
