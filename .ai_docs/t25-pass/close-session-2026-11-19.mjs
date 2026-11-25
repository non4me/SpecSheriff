// Closes the session of 2026-11-19: puts the first step of the next session at the top of the continuation file in
// place of the stale paragraph about table 12.12, and applies the corrections EngStickler's readers confirmed in
// batch 24.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
  return s.split(a).join(b);
};

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const lines = s.split("\n");
const i = lines.findIndex((l) => l.startsWith("**NOW (2026-11-19, end of session):**"));
if (i < 0) throw new Error("stale paragraph not found");
lines[i] = [
  "**First step of the next session (written when the session of 2026-11-19 closed):** begin the step of T25 that changes the SpecSheriff tools.",
  "First put one question to the owner: in which order the remaining steps go.",
  "The agent recommends moving the drafts into the specification files first, with their `meta.decisions` and the two versions of 10.1 reconciled, since the nodes of the appendix of the tools cite the new nodes of the base by sid; then the appendix of the tools (`tools.json`), one node at a time; then the code with its tests; then the skills.",
  "The changes owed to the tools are listed in the paragraphs below, under the rulings of 2026-11-19: RecordType in JSON Schema 2020-12, the checks of table 12.12, exactly one header per domain, and the term \"documents\" in the appendix renamed to \"documentation\".",
  "Every node of the base and every row of tables 11.3 and 12.12 is agreed; nothing waits for the owner.",
  "The working tree was clean when the session closed: everything done on 2026-11-19 is in `.ai_docs/`, `.claude/vt/` and the skill vt, none of which git tracks, so there was nothing to commit.",
].join(" ");
s = lines.join("\n");

s = swap(s, "On 2026-11-19 the owner ruled that the rule about sections becomes guidance in the skill spec-review, not a rule of the base: a draft goes into the narrowest section whose text covers what it binds, and where several rules share a matter that no section's text names, a new section is proposed to the owners. It is written at the step that changes the skills.", "On 2026-11-19 the owner ruled that the rule about sections is to become guidance in the `spec-review` skill, not a rule of the base: a draft goes into the narrowest section whose text covers what it governs, and where several rules share a matter that no section's text names, a new section is proposed to the owners. The guidance is to be written in the step that changes the skills.", "continuation");
s = swap(s, "In the step that changes the SpecSheriff tools, `sheriff validate` is to refuse a domain with more than one header.", "The step that changes the SpecSheriff tools is to make `sheriff validate` refuse a domain with more than one header.", "continuation");
s = swap(s, "Nothing. The section rule (\"many linked rules become a section\", from T25's row) was settled on 2026-11-19: guidance in `spec-review`, written at the step that changes the skills — place a draft in the narrowest section whose text covers what it binds, and propose a new section to the owners where several rules share a matter that no section's text names. There is no base rule on paragraphs.", "Nothing. The rule about sections (\"many linked rules become a section\", from T25's row) was settled on 2026-11-19 as guidance in the `spec-review` skill, to be written in the step that changes the skills: place a draft in the narrowest section whose text covers what it governs, and propose a new section to the owners where several rules share a matter that no section's text names. The base has no rule about paragraphs.", "continuation");
fs.writeFileSync(cont, s);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = swap(x, "decide-sections.mjs records the owner's ruling that the rule about sections becomes guidance in the skill spec-review.", "decide-sections.mjs records the owner's ruling that the rule about sections is to become guidance in the `spec-review` skill. close-session-2026-11-19.mjs puts the first step of the next session at the top of the continuation file.", "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
