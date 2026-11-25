// Node 4.4: the owner's comment of 2026-11-09, «Может уточнять узлы» over «Каждое уточняет узлы»; the English follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.4"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("text", "Each refines the nodes the implementation falls short of there", "It may refine the nodes the implementation falls short of there");
swap("ruText", "Каждое уточняет узлы, которым", "Может уточнять узлы, которым");
n.changes.push("«Может уточнять узлы» — ваша формулировка, по комментарию на странице.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[0]);
console.log(n.ruText.split("\n\n")[0]);
