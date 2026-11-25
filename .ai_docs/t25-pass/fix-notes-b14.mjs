// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 14.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "while the specification is a draft, such a rule is the normal state and nothing is reported.",
  "while the specification is a draft, such a rule having no code or tests is the normal state, and nothing is reported.", "objection");
c = swap(c, "The same defect is in the agreed row itself: its cost is \"reported under the rule's sid",
  "The same defect is also in the agreed row itself: its cost on failure is \"reported under the rule's sid", "row defect");
c = swap(c, "is refused, naming the rule, unless the rule is bound to code of the system outside its tests and to a test not marked as skipped; a commit includes a rule when it changes the rule's wording or approval, its tests or the code bound to it;",
  "is refused, and the refusal names the rule, unless the rule is bound to code of the system other than test code and to a test that is not marked as skipped; a commit includes a rule when it changes the rule's wording, the rule's approval, the rule's tests or the code bound to the rule;", "restated meaning");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
