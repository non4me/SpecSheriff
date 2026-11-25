// Records the owner's ruling of 2026-11-19 on the rule about sections: it becomes guidance in the skill spec-review,
// not a rule of the base, written at the step that changes the skills. Writes the state reached into the continuation
// file, the queue outline and the index, applying the corrections EngStickler's readers confirmed in batch 23.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
  return s.split(a).join(b);
};

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 17:30 UTC):**");
const end = s.indexOf("The reviewer also found a terminology clash:", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 17:40 UTC):** the review of the base and of the tables of checks of the extensions is complete.",
  "The next step of T25 is the step that changes the SpecSheriff tools; the agent recommends starting it in a fresh session, after the work so far is committed and pushed.",
  "On 2026-11-19 the owner ruled that the rule about sections becomes guidance in the skill spec-review, not a rule of the base: a draft goes into the narrowest section whose text covers what it binds, and where several rules share a matter that no section's text names, a new section is proposed to the owners. It is written at the step that changes the skills.",
  "The stress test of how a specification is divided is closed: on 2026-11-19 the owner approved 11.1.2 in the wording the owner dictated, and row 11.3.1 in the wording \"Every domain has exactly one header\".",
  "11.1.2 now says that a domain's document that is too large may be divided into several smaller documents, and that the smallest part of the domain that is recommended as a separate document is a section.",
  "The `text` field of 11.1.2 does not mention the context window, since the owner named it as one of several reasons and the owners of a domain may have reasons of their own; the `reason` field mentions it.",
  "The owner's rulings of 2026-11-19 are recorded in the `decisions` field of the draft of 11.1.2: the permission to divide a large domain stays, a section is the smallest unit of the division, and the owners of the domain choose how to divide it.",
  "The header of a split domain may have a document of its own or share the first document with sections; 11.1.3 already requires a domain's specification to open with its header.",
  "The owner explained two principles of division, the logical one into domains and the physical one into documents, so that the agent would understand how the specification is divided; on 2026-11-19 the owner ruled that they are not to be written into the specification as rules, and that the existing rules are to be reworded in light of them.",
  "The draft row 11.3.7, never agreed, was deleted, since a section cannot span several files.",
  "In the step that changes the SpecSheriff tools, `sheriff validate` is to refuse a domain with more than one header.",
].join(" ") + "\n\n" + s.slice(end);
s = swap(s, "## Waits on the owner\n\n1. The section rule (\"many linked rules become a section\", from T25's row). A reviewer found no exact\n   base wording; recommended: guidance in `spec-review` — place a draft in the narrowest section whose\n   text covers what it binds, and propose a new section to the owners where several rules share a\n   matter no section's text names. Report with it, in one line: no base rule on paragraphs. Asked\n   after the review of the base, where section 6 is read.\n", "## Waiting for the owner\n\nNothing. The section rule (\"many linked rules become a section\", from T25's row) was settled on 2026-11-19: guidance in `spec-review`, written at the step that changes the skills — place a draft in the narrowest section whose text covers what it binds, and propose a new section to the owners where several rules share a matter that no section's text names. There is no base rule on paragraphs.\n", "continuation");
s = swap(s, "2. The section question to the owner (below), and its result in `spec-review` if agreed.", "2. The guidance on sections in `spec-review`, as the owner ruled on 2026-11-19 (under \"Waiting for the owner\" below).", "continuation");
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = swap(o, "### ◐ правило о разделах: в базу или в skill spec-review — спрашиваю сейчас\n- рекомендую указание в spec-review, а не правило базы\n", "", "outline");
o = swap(o, "- ✓ 11.3.1: у каждого домена ровно один заголовок\n", "- ✓ 11.3.1: у каждого домена ровно один заголовок\n- ✓ правило о разделах — указание в skill spec-review, не правило базы (ваше решение)\n", "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = swap(x, "agree-11-3-1-b.mjs marks row 11.3.1 as agreed and corrects the English text of 11.1.2.", "agree-11-3-1-b.mjs marks row 11.3.1 as agreed and corrects the English text of 11.1.2. decide-sections.mjs records the owner's ruling that the rule about sections becomes guidance in the skill spec-review.", "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
