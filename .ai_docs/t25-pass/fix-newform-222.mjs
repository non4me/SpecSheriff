// The owner of 2026-11-12: «считается» is rendered by its meaning, "is considered", never "counts" — that word is for
// counting. A rendering fixed at the owner's word in agreed nodes, which changes no meaning; their Russian stays.
// Kept: "counts for" in 9.2 («засчитываются», counted toward), "does not count" in 9.5 («не учитывается»), and every
// "count" that is counting (7.12, the tools).
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swaps = [
  ["8.2", "title", "What counts as a rule of a section", "What is considered a rule of a section"],
  ["8.2", "text", "Each of these nodes counts as a rule of a section", "Each of these nodes is considered a rule of a section"],
  ["8.2", "reason", "would count as holding no rule", "would be considered to hold no rule"],
  ["9.1", "reason", "A rule counts as implemented only by its code and a passing test together", "A rule is considered implemented only by its code and a passing test together"],
  ["9.2", "text", "Such a rule counts as implemented when both hold", "Such a rule is considered implemented when both hold"],
  ["9.4", "text", "A change to a SpecTag counts as a change to", "A change to a SpecTag is considered a change to"],
  ["12.2.1", "text", "counts as one domain", "is considered one domain"],
  ["6.3", "text", "These properties do not count:", "These properties are not considered:"],
  ["7.7", "text", "count as one requirement", "are considered one requirement"],
];
for (const [num, field, from, to] of swaps) {
  const x = d[num];
  if (!x || typeof x[field] !== "string" || x[field].split(from).length !== 2) throw new Error(`${num}.${field}: ${from}`);
  x[field] = x[field].replace(from, to);
  console.log(`${num} ${field}: ${to}`);
}
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
