// The owner, 2026-11-10, on 8.2: the count is limited to the requirement of 8.1 that a section holds at least one rule, so that a term
// and a node of a project's own kind do not become rules for what requires a rule to be implemented. The line is the one the reviewer
// checked. The ruling goes into the node's meta.decisions at the move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.2"];
if (b.sidValue !== "s-pctqj9wqaq8762t") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (!b[field].startsWith(from)) throw new Error(`${field} does not open with "${from}"`);
  b[field] = to + b[field].slice(from.length);
};
swap("text", "Each of these nodes counts as a rule of a section:", "Each of these nodes counts as a rule of a section, for the requirement that the section holds at least one rule:");
swap("ruText", "Правилом раздела считается каждый из этих узлов:", "Каждый из этих узлов считается правилом раздела для требования, чтобы раздел содержал как минимум одно правило:");
b.changes.push("Первая строка ограничена по вашему решению: подсчёт действует только для требования 8.1, что раздел содержит как минимум одно правило.");
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
