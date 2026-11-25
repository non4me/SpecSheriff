// Applies to the continuation file and the index the corrections that EngStickler's reader confirmed in batch 23.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "while the specification is approved, a commit is refused, naming the rule, if it includes an approved rule that the system's code must implement and that rule is not bound to",
  "while the specification is approved, a commit is refused, and the refusal names the rule, if the commit includes an approved rule that the system's code must implement, and the rule is not bound to", "scope");
c = swap(c, "and gave it to the rule reviewer; it shows the row to the owner once the reviewer has reported.",
  "and gave it to the rule reviewer; the agent will show the row to the owner once the reviewer has reported.", "draft");
c = swap(c, "The owner added on 2026-11-20 a doubt to take up once row 10.1.41 is settled: whether",
  "On 2026-11-20 the owner raised a question to take up once row 10.1.41 is settled: whether", "doubt");
c = swap(c, "The checks that bind each piece of code that a commit adds or changes to an approved rule (10.1.26, 10.1.26a, 10.1.28, 10.1.28a, 10.1.31, 10.1.42, 10.1.43) keep the code traceable while the code for approved rules is written, which the owner's description of 2026-11-19 places in the draft phase too.",
  "The checks that bind to an approved rule each piece of code that a commit adds or changes (10.1.26, 10.1.26a, 10.1.28, 10.1.28a, 10.1.31, 10.1.42, 10.1.43) keep that code traceable to its rule. By the owner's description of 2026-11-19, the code for approved rules is written while the specification is still a draft, too.", "kinds");
c = swap(c, "The checks of completeness and lag (10.1.40, 10.1.41, 10.1.43a, 10.1.44) are the ones a draft can do without;",
  "The checks of the completeness of the tests and code and of their lag behind a rule's wording (10.1.40, 10.1.41, 10.1.43a, 10.1.44) are the ones a draft specification can do without;", "kinds");
fs.writeFileSync(contPath, c);
const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = swap(s, "records the owner's confirmation of that row's cost and scope;", "records the owner's confirmation of what a failure of that row's check costs and which rules the row covers;", "index");
fs.writeFileSync(indexPath, s);
console.log("notes corrected");
