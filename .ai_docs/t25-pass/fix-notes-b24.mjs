// Applies to the continuation file the corrections that EngStickler's reader confirmed in batch 24.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "the owner raised a question to take up once row 10.1.41 is settled:", "the owner raised a question to be taken up once row 10.1.41 is settled:", "b24");
c = swap(c, "The checks that bind to an approved rule each piece of code that a commit adds or changes (10.1.26, 10.1.26a, 10.1.28, 10.1.28a, 10.1.31, 10.1.42, 10.1.43) keep that code traceable to its rule. By the owner's description of 2026-11-19,",
  "The checks that require each piece of code that a commit adds or changes to be bound to an approved rule (rows 10.1.26, 10.1.26a, 10.1.28, 10.1.28a, 10.1.31, 10.1.42 and 10.1.43) keep that code traceable to its rule. According to the owner's description of 2026-11-19,", "b24");
c = swap(c, "The checks of the completeness of the tests and code and of their lag behind a rule's wording (10.1.40, 10.1.41, 10.1.43a, 10.1.44) are the ones a draft specification can do without;",
  "The checks of whether the tests and code are complete and whether they lag behind a rule's wording (rows 10.1.40, 10.1.41, 10.1.43a and 10.1.44) are the ones that are not needed while the specification is a draft;", "b24");
fs.writeFileSync(contPath, c);
console.log("continuation corrected");
