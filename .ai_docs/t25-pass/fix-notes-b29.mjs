// Applies to the continuation file and the index the corrections that EngStickler's reader confirmed in batch 29.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "the first of the follow-ups that the rule reviewer found for row 10.1.41, listed in", "the first of the follow-ups that the rule reviewer raised while checking row 10.1.41, listed in", "top");
c = swap(c, "On 2026-11-20 the owner decided («ок»), in answer to the owner's own question of whether any check of tests and code is needed while the specification is a draft:",
  "On 2026-11-20 the owner agreed («ок») to the agent's answer to a question that the owner had raised, of whether any check on the tests and the code is needed while the specification is a draft:", "decision");
c = swap(c, "every check of whether the implementation is complete stays silent while the specification is a draft. rule-draft-checks.mjs carried this out in rows 10.1.40 and 10.1.43a, which now pass while the specification is a draft, in the words of the agreed row 10.1.41, and in the reason of 10.1.40. This reverses the owner's ruling of 2026-11-19 that row 10.1.40 reports while the specification is a draft.",
  "every check that verifies whether the implementation is complete reports no failure while the specification is a draft. rule-draft-checks.mjs implemented this in rows 10.1.40 and 10.1.43a, whose checks now pass while the specification is a draft, using the wording of the agreed row 10.1.41, and in the reason for row 10.1.40. This reverses the owner's ruling of 2026-11-19 that the check in row 10.1.40 reports a lag while the specification is a draft.", "decision");
fs.writeFileSync(contPath, c);
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = swap(s, "the checks of whether the implementation is complete stay silent while the specification is a draft.", "the checks that verify whether the implementation is complete report no failure while the specification is a draft.", "index");
fs.writeFileSync(indexPath, s);
console.log("notes corrected");
