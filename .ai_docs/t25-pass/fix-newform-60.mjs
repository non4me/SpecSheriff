// Node 4.1: the owner, 2026-11-09, took out the definition of the base specification by exclusion; the positive one stands
// in 1.1.2 and 1.1.4. They then agreed the node.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.1"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("text", "\n\nEvery part but the appendix and the guidelines is the base specification.", "");
swap("ruText", "\n\nВсякая часть, кроме приложения и guidelines, — базовая спецификация.", "");
n.changes.push("По вашему решению убрана фраза, определявшая базовую спецификацию от противного.");
n.agreed = "2026-11-09";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log(n.ruText);
