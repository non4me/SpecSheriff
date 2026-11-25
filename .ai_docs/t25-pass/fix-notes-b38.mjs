// Applies to the continuation file and the index the corrections that EngStickler's reader confirmed in batch 38.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const pairs = [
  ["and leaves the files under specs/ untouched until the SpecSheriff tools accept the new form (stage 3).", "and leaves the files under specs/ untouched until the SpecSheriff tools accept the new form of the guidelines (stage 3)."],
  ["1. [ ] The schema in moved/specs/_schema/: a node of kind", "1. [ ] The schema in moved/specs/_schema/ describes: a node of kind"],
  ["the `schema` property of a RecordType; an extension file of the guidelines.", "the `schema` property of a RecordType; a file for an extension of the guidelines."],
  ["each rule's title, text, reason, examples and list come word for word from newform.json; the three tables come from table-10-1.json, table-11-3.json and table-12-12.json, their live rows as cell nodes with new sids; every node keeps the sid in its draft's `sidValue`;",
    "each rule's title, text, reason, examples and list are copied word for word from newform.json; the three tables come from table-10-1.json, table-11-3.json and table-12-12.json, and each of their rows that is still in use becomes a cell node with a new sid; every node that has a draft keeps the sid in its draft's `sidValue`;"],
  ["the typed links that the drafts' lists of changes promise for the move, such as `refines` from 1.7.7 to 10.1.", "the typed links that the drafts' lists of changes call for when the drafts are moved, such as a `refines` link from 1.7.7 to 10.1."],
  ["4. [ ] The archive: the present rules that the new form drops go to specs/_archive/", "4. [ ] The archive: the current rules that the new form drops are moved to specs/_archive/"],
  ["6.5 and 6.6 in the present numbering).", "6.5 and 6.6 in the current numbering)."],
  ["the decisions of the present node with the same sid, and the owner's rulings that the draft's list of changes records, written in English. Reader agents of EngStickler read them.",
    "the decisions of the current node with the same sid, and the owner's rulings recorded in the draft's list of changes, all of them written in English. EngStickler's reader agents read them."],
  ["7. [ ] The check of the build: each sid occurs once; each citation and each link leads to an existing node; each agreed text is copied word for word;",
    "7. [ ] The check of the build covers: each sid occurs once; each citation and each link leads to an existing node; each agreed text is copied word for word from its draft or its row;"],
];
for (const [a, b] of pairs) c = swap(c, a, b, "plan");
fs.writeFileSync(contPath, c);
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = swap(s, "decisions-batches.mjs writes decisions-in-1.json to decisions-in-4.json, from which reader agents write the owner's rulings in English to decisions-out-1.json to decisions-out-4.json. section-purposes.json holds the English purpose of each section of the new form.",
  "decisions-batches.mjs writes the files decisions-in-1.json through decisions-in-4.json, from which reader agents write the owner's rulings in English to the files decisions-out-1.json through decisions-out-4.json. section-purposes.json holds the English purpose of each section of the new form of the SpecSheriff guidelines.", "index");
fs.writeFileSync(indexPath, s);
console.log("notes corrected");
