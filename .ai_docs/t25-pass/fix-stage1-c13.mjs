// Applies the corrections that EngStickler's reader confirmed in chunk 13 of the stage 1 English (the todos translated
// from Russian and the `of` of a restored list) and in batch 54 (the index of .ai_docs).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swapAll = (s, from, to, min = 1) => {
  const n = s.split(from).length - 1;
  if (n < min) throw new Error(`not found: ${from.slice(0, 70)}`);
  return s.split(from).join(to);
};

const tp = new URL("todos-en.json", here);
const todos = JSON.parse(fs.readFileSync(tp, "utf8"));
const pairs = [
  ["At the step that changes the SpecSheriff tools", "In the step that changes the SpecSheriff tools", 5],
  ["the following is done, by the owner's rulings of 2026-11-13:", "the following changes are made, following the owner's rulings of 2026-11-13:"],
  ["at the place that `pointer` names", "at the location in the schema that `pointer` points to"],
  ["holds no value missing from the list", "contains no value that is absent from the list"],
  ["are moved to the new properties", "are switched to the new properties"],
  ["among the nodes of the archive. A node in the archive has no sid of its own (s-f2b5zvc565s242f).", "among the archived nodes, since an archived node has no sid of its own, as s-f2b5zvc565s242f states."],
  ["the check (s-txbwsthdqhvyzd2) is changed as follows:", "the check that reports a node whose tests or code lag behind it (s-txbwsthdqhvyzd2) is changed as follows:"],
  ["It compares the tests and the symbols of the code that are bound to the rule, not whole files.", "It looks at the changes to the tests and to the symbols in the code that are bound to the rule, not at changes to whole files."],
  ["It refuses the commit while the specification is approved.", "It refuses the commit only while the specification is approved."],
  ["the changed tests of the system's code", "the changed tests that are part of the system's code"],
  ["is a defect as well", "is also a defect"],
];
let all = JSON.stringify(todos);
for (const [a, b, min] of pairs) all = swapAll(all, a, b, min);
fs.writeFileSync(tp, JSON.stringify(JSON.parse(all), null, 2) + "\n");

const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
nf["6.1"].list.of = "the types that a link between nodes of the specification can have";
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const ip = new URL("../INDEX.md", here);
let s = fs.readFileSync(ip, "utf8");
s = swapAll(s, "english-stage1.mjs writes the English text that stage 1 of the move added to the new files of the SpecSheriff guidelines, and that no reader has read yet, into english-stage1.md,",
  "english-stage1.mjs writes into english-stage1.md the English text that stage 1 of the move added to the new files of the SpecSheriff guidelines and that no reader has read yet,");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
fs.writeFileSync(ip, s);
console.log("corrected");
