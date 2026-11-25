// Node 4.1: the owner's wording of 2026-11-09 for the last item of its list, «технический долг»; the English follows.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.1"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
swap("text", "while any problem is set aside, a section for its technical debt", "technical debt");
swap("ruText", "пока какая-либо проблема отложена, раздел её технического долга", "технический долг");
n.changes.push("Последний пункт списка — ваша формулировка, «технический долг».");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log(n.ruText);
