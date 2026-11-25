// Records the owner's objection of 2026-11-20 to the second sentence of row 10.1.41 ("a rule does not implement
// anything; code and tests implement it, and a rule of the technical appendix and its rule of the base specification are
// one rule in two parts"), and the wording the agent proposed in answer. Applies the corrections that EngStickler's reader
// confirmed in batch 18 to the top of the continuation file.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = c.replace(/^\*\*The next session starts by\*\* continuing with row 10\.1\.41[^\n]*/m, () =>
  "**The next session continues with** row 10.1.41 of the main table of checks, which the owner is going through sentence by sentence (the owner, 2026-11-20). The row's first sentence requires an approved rule to be bound to the system's code other than its tests and to a test not marked as skipped. The owner ruled on 2026-11-20 that the clause on skipped tests stays and that the row's reason is to explain it: a test run does not count a skipped test as failed, so without the clause a rule whose only test is skipped would pass both this check and the check that runs the tests on a push. The row's second sentence counts code or a test bound to a rule that implements the approved rule, directly or through a chain of `implements` links, as bound to the approved rule. The owner objected on 2026-11-20 that a rule does not implement anything: code and tests implement it. A node of the technical appendix refines the technical details of its rule of the base specification, so the two are one rule in two parts, and code and tests belong to both parts equally. The agent agreed about the wording and proposed that the second sentence name the link instead: code or a test bound to a node that has an `implements` link to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule. The agent recommended keeping one direction only: a SpecTag binds code to the more precise part, the node of the technical appendix, and the link carries that binding to the rule of the base specification. Counting the other direction would leave nothing to show which code carries out the technical details, and the node of the technical appendix would never be reported as unimplemented. The owner's decision on this wording is awaited. What a failure of the check costs and which rules the row covers, restated in the list item on row 10.1.41 below, are taken up after both sentences are settled.");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
if (!c.includes("**The next session continues with** row 10.1.41")) throw new Error("the top of the continuation file was not rewritten");
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "rule-10-1-41-skipped.mjs records the owner's ruling that row 10.1.41 keeps its clause on skipped tests.",
  "rule-10-1-41-skipped.mjs records the owner's ruling that row 10.1.41 keeps its clause on skipped tests. step-10-1-41-second.mjs records the owner's objection to the row's second sentence and the wording proposed in answer.", "index");
fs.writeFileSync(indexPath, s);

const outPath = new URL("queue-outline.md", here);
let o = fs.readFileSync(outPath, "utf8");
o = swap(o, "- сейчас: второе предложение — цепочка implements\n",
  "- сейчас: второе предложение — правило ничего не реализует; называем связь implements; засчитывается в одну сторону\n", "outline");
fs.writeFileSync(outPath, o);
console.log("recorded at", now);
