// Applies the corrections to the English of the continuation file and .ai_docs/INDEX.md that EngStickler's reader
// confirmed in batch 7.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const edit = (path, pairs) => {
  let s = fs.readFileSync(path, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`not found in ${String(path).split("/").pop()}: ${a.slice(0, 70)}`);
    s = s.replace(a, b);
  }
  fs.writeFileSync(path, s);
};

edit(new URL("../t25-one-thought.md", here), [
  ["The owner's view of how work on a project is done, given on 2026-11-19 when the owner was asked", "Below is the owner's view of how work on a project is done, given on 2026-11-19, when the owner was asked"],
  ["The agent is now examining it with the owner by the skill `grilling`:", "The agent is now examining it with the owner using the skill `grilling`:"],
  ["- The owner proposes an RFC (Request for Change):", "- The owner proposes an RFC (request for change; not the IETF's \"request for comments\"):"],
  ["The checks also read it, possibly in a fixed format that lists the checks to run.", "The checks also read it, possibly in a fixed format, one that would list the checks to run."],
  ["The agent recommends against a separate document.", "The agent recommends not having a separate document."],
  ["and how a deterministic check would see the agent's decision. The agent's answer, now with the owner:", "and how a deterministic check could detect the agent's decision. The agent's answer, which now awaits the owner's response:"],
  ["- The mark is kept in a file of the commit, not in the session.", "- The mark is kept in a file in the commit, not in the session."],
  ["- The record gains one more field,", "- The record will gain one more field,"],
  ["- At a commit, for each approved rule whose wording the commit changes,", "- When a commit is made, for each approved rule whose wording the commit changes,"],
  ["Where none of them changed, it looks", "Where none of them has changed, it looks"],
  ["The agent put the first question again after the answer.", "After the answer, the agent asked the owner the first question again."],
  ["The owner's answer to the first question of the grilling: whether a change needs a document of its own. The cost of a failure of the check in row 10.1.40 will be settled once the grilling has established how it is recorded that a change leaves a rule's meaning unchanged.", "The agent is waiting for the owner's answer to the first question of the grilling, which is whether a change needs a document of its own. The cost of a failure of the check in row 10.1.40 will be settled once the owner's answers in the grilling have shown how it is recorded that a change leaves a rule's meaning unchanged."],
]);

const indexPath = new URL("../INDEX.md", here);
edit(indexPath, [
  ["including the owner's proposal of a change document,", "including the owner's proposal for a change document,"],
  ["grill-change-2.mjs records where the mark that a change keeps a rule's meaning would be kept for a deterministic check.", "grill-change-2.mjs records where the mark stating that a change keeps a rule's meaning would be stored, so that a deterministic check can read it. fix-english-b7.mjs applies the corrections to the English that EngStickler's reader confirmed in batch 7."],
]);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
fs.writeFileSync(indexPath, s);
console.log("batch 7 corrections applied at", now);
