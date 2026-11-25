// Records the owner's answer to the second question about the decomposition of a specification: a section is the
// smallest unit into which a document is divided physically, and how to divide it is the owners' choice; the logical
// division into domains follows meaning, the physical division into documents follows only size. Applies the
// corrections EngStickler's readers confirmed in batch 19.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${f}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  fs.writeFileSync(f, s);
};

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
nf["11.1.2"].decisions.push({
  date: "2026-11-19",
  problem: "How a domain's document may be divided into several documents: one per section, or otherwise.",
  ruling: "The owner: the rule sets only the lower bound. A section is the smallest unit of the division, so no document holds less than a whole section; how to divide is the owners' choice. They may give the domain's header a document of its own, or split the domain in two, the header and the first half of its sections in one document and the rest in the other. Two principles of division are distinct: the logical one, into domains, follows the meaning of the rules; the physical one, into documents, follows only how much is stored and loaded into the context window.",
});
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

fix(docs + "t25-one-thought.md", [
  ["the ruling is recorded in the `decisions` of the draft of 11.1.2.", "the ruling is recorded in the `decisions` field of the draft of 11.1.2."],
  ["with the skill called `grilling`, one question at a time. To the first question, where the header of a split domain goes, the owner answered on 2026-11-19 that", "with the `grilling` skill, the agent asking one question at a time. In answer to the first question, where the header of a split domain is placed, the owner said on 2026-11-19 that"],
  ["the second three sections and the third two. The agent's recommendation of a header alone in its document is therefore dropped.", "the second three sections, and the third two. The agent's recommendation that the header be alone in its document is therefore dropped."],
  ["The next question is whether 11.1.2's \"one per section\" becomes \"several documents, each holding whole sections\"; if so, row 11.3.7 is no longer needed, since a section cannot span files, and the check that matters is that a domain has one header, which only row 11.3.1 can carry.", "In answer to the second question, the owner ruled on 2026-11-19 that 11.1.2 sets only the lower bound: a section is the smallest unit of the division, and how to divide is the owners' choice. The logical division into domains follows meaning; the physical division into documents follows only size. The ruling is recorded in the `decisions` field of the draft of 11.1.2. Row 11.3.7 is therefore no longer needed, since a section cannot span several files. The check that matters is that a domain has one header, which row 11.3.1 can make. The next question is whether contracts and the technical appendix may be divided by size in the same way."],
]);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
const a = "grill-11-1-2-q1.mjs records the owner's answer on where the header of a split domain is kept.";
if (!x.includes(a)) throw new Error("index: missing");
x = x.replace(a, "grill-11-1-2-q1.mjs records the owner's answer to the question of where the header of a split domain is kept. grill-11-1-2-q2.mjs records the owner's ruling that a section is the smallest unit into which a document is divided.");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
