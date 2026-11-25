// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 39.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["describes: a node of kind `TableRule`", "describes the following: a node of the kind `TableRule`"],
  ["and each of their rows that is still in use becomes a cell node with a new sid;", "and each of their rows that remains in force becomes a node in a cell, with a new sid;"],
  ["every node is written as a draft, and agreed.json lists each node the owner agreed to, with the date, for the approvals of stage 3.", "every node is written with the approval status `draft`, and agreed.json lists each node that the owner has agreed to, with the date of the agreement, for the approvals to be recorded in stage 3."],
  ["with the date, the reason and the sid of the node that replaces each, since the specification of this repository is approved.", "with the date, the reason and the sid of the node that replaces that rule, because these rules were approved."],
  ["7. [ ] The check of the build covers: each sid occurs once;", "7. [ ] The check of the build's output checks that: each sid occurs once;"],
  ["the links from tools.json to the dropped rules are listed for stage 2.", "the links from tools.json to the dropped rules are listed so that stage 2 can handle them."],
];
for (const [a, b] of pairs) c = swap(c, a, b, "plan");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
