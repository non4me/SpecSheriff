// Corrects the English of the agreed row 10.1.41 as EngStickler's reader found, without changing its meaning or its
// Russian, and applies to the continuation file the corrections confirmed in batch 27.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const tablePath = new URL("table-10-1.json", here);
const t = JSON.parse(fs.readFileSync(tablePath, "utf8"));
const r = t.tables.flatMap(g => g.rows).find(x => x.num === "10.1.41");
r.en = swap(r.en, "A commit includes an approved rule where any of the following happens in that commit:", "A commit includes an approved rule if any of the following happens in that commit:", "en");
r.en = swap(r.en, "- a test or code bound to the rule before or after the commit changes;", "- a test or code changes that is bound to the rule before the commit or after it;", "en");
r.examples = r.examples.map(e => swap(swap(e, "so the commit includes R, and R passes.", "so the commit includes R, and the commit passes."), "But not: R is refused because no SpecTag names R itself.", "But not: the commit is refused because no SpecTag names R itself."));
r.reason = swap(r.reason, "So a rule whose only test is marked in either way would pass this check and the run of the tests while nothing checks the rule.",
  "So, if such a test counted, a rule whose only test is marked in either of these ways would pass this check and the test run while nothing checks the rule.", "reason");
r.change += " После согласования поправлен английский по отчёту читателя EngStickler; смысл и русский текст не менялись.";
fs.writeFileSync(tablePath, JSON.stringify(t, null, 2) + "\n");

const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
c = swap(c, "**The next session starts by** answering the owner's question of 2026-11-20 whether any check of tests and code is needed while the specification is a draft. The agent's answer, put to the owner on 2026-11-20, is in the paragraph that opens \"On 2026-11-20 the owner raised a question\" below. After it come, one at a time, the follow-ups that the rule reviewer found for row 10.1.41, listed in the paragraph that opens \"Follow-ups that the rule reviewer found\".",
  "**The next session starts by** getting the owner's decision on the agent's answer to the owner's question, asked on 2026-11-20, of whether any check of tests and code is needed while the specification is a draft. The answer is in the paragraph that begins \"On 2026-11-20 the owner raised a question\" below; the owner asked on 2026-11-20 to have it in plain words, without the numbers of rows. After that question come, one at a time, the follow-ups that the rule reviewer found for row 10.1.41, listed in the paragraph that begins \"Follow-ups that the rule reviewer found\".", "top");
c = swap(c, "an EngStickler reader agent is reading its English, kept in english-10-1-41.md.", "an EngStickler reader agent read its English text, kept in english-10-1-41.md, and fix-english-10-1-41-b27.mjs corrected the phrases that the reader had found, without changing the meaning.", "41");
c = swap(c, "a failure is refused while the specification is approved and passes while it is a draft.", "a commit that fails the check is refused while the specification is approved, and passes while the specification is a draft.", "41");
c = swap(c, "run the check of row 10.1.41 over every approved rule;", "run the check of row 10.1.41 on every approved rule;", "follow-ups");
fs.writeFileSync(contPath, c);
console.log("corrected");
