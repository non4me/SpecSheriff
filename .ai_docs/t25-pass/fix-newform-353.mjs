// Node 7.1, after the fourth pass of the wording checker: the defined name "the reader of a node" keeps its object
// wherever the node uses it, as node 7.2.4 asks of a name the specification defines.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-353.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.1"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text,
  "The reader learns what a node means only from the specification. The reader sees the whole node and the nodes it links to, but knows",
  "The reader of a node learns what it means only from the specification. The reader of a node sees the whole node and the nodes it links to, but knows");
n.text = swap(n.text, "Every reader is given the definitions of the core vocabulary", "The reader of every node is given the definitions of the core vocabulary");
n.reason = swap(n.reason, "only when they share one goal, one reader and one scope.", "only when they share the same goal, the same reader of a node and the same scope.");
n.ruText = swap(n.ruText,
  "Что значит узел, читатель узнаёт только из спецификации. Читатель видит весь узел",
  "Что значит узел, его читатель узнаёт только из спецификации. Читатель узла видит весь узел");
n.ruText = swap(n.ruText, "Каждому читателю даны определения базового словаря", "Читателю любого узла даны определения базового словаря");
n.ruReason = swap(n.ruReason, "только когда у них одна цель, один читатель и одна область действия.", "только когда у них одна и та же цель, один и тот же читатель узла и одна и та же область действия.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
