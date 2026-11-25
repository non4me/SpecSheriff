// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 35.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "**The next session starts by** stage 1 of the step that changes the SpecSheriff tools:", "**The next session starts with** stage 1 of the step that changes the SpecSheriff tools:", "top");
c = swap(c, "Every wording that followed from the grilling session of 2026-11-19 is now agreed.", "All the wordings that followed from the grilling session of 2026-11-19 have now been agreed.", "top");
c = swap(c, "and the paragraphs of the former reason have found their places, as the last item of the head's list of changes records; the paragraph saying that a check reads the commit being made goes into the reason of the node \"The hooks\" of the appendix of the tools",
  "and the paragraphs of the former reason have been placed as the last item of the head's list of changes records; the paragraph saying that a check reads the commit being made will go into the reason of the node \"The hooks\" in the appendix of the tools", "top");
c = swap(c, "\"code of the system other than tests\", and the `implements` link named in place of \"a rule that implements such a rule\". The definition of how code and tests are counted through a chain of `implements` links stays in 9.2, its only place.",
  "it says \"code of the system other than tests\", and it names the `implements` link in place of \"a rule that implements such a rule\". The definition of how code and tests are counted through a chain of `implements` links stays in 9.2, the only place for it.", "9.2");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
