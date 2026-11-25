// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 3.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "reading the rule reviewer's report on the drafts of rows 10.1.43a and 10.1.43b of the main table of checks, kept in draft-10-1-43ab.json, and then",
  "reading the report of the rule reviewer, the agent specsheriff-rule-reviewer, on the drafts of rows 10.1.43a and 10.1.43b of the main table of checks, which are kept in draft-10-1-43ab.json, and then", "top");
c = swap(c, "added the owner's rulings to the draft's `decisions` and the nodes that the draft's text and reason cite to the draft's `cites`. An EngStickler reader agent read the agreed English text of 1.6.1, kept in english-1-6-1.md, and agree-10-2.mjs corrected the phrases it found,",
  "added the owner's rulings to the draft's `decisions`, and added to the draft's `cites` the nodes that its text and reason cite. An EngStickler reader agent read the agreed English text of 1.6.1, kept in english-1-6-1.md, and agree-10-2.mjs corrected the phrases that the reader had found,", "1.6.1 paragraph");
c = swap(c, "added the owner's ruling to the draft's `decisions` and the nodes that the draft's text cites to the draft's `cites`.",
  "added the owner's ruling to the draft's `decisions`, and added to the draft's `cites` the nodes that its text cites.", "10.2 paragraph");
c = swap(c, "- the main table of checks, where no row yet sets what it costs when either of the two new judgements finds a defect.",
  "- the main table of checks, where no row yet sets what a failure costs for either of the reviewer's two new judgements: the one on a statement that a rule's implementation needs no change, and the one on an approved node of the technical appendix.", "table item");
c = swap(c, "since each judgement can be carried out without the others", "since each judgement can be made without the others", "table item");
c = swap(c, "the rule reviewer checks them before each is shown to the owner on its own;", "the rule reviewer checks them before each is shown to the owner separately;", "table item");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
