// Node 9.1, agreed on 2026-11-14: fixes to the English alone, from an EngStickler reader; the Russian text is unchanged.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["9.1"];
const swap = (from, to) => {
  if (!n.text.includes(from)) throw new Error("not found: " + from);
  n.text = n.text.replace(from, to);
};
swap(
  "Code generated from the specification's nodes is considered implementing code like any other.",
  "Code generated from the specification's nodes is considered code implementing the specification, like any other code.",
);
swap("is decided by where it lives.", "is decided by where it is kept.");
n.changes.push(
  "Только английский, после согласования, по замечаниям читателя EngStickler: «is considered code implementing the specification, like any other code» вместо «is considered implementing code like any other», «where it is kept» вместо «where it lives»; русский текст не изменился.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("9.1 English fixed");
