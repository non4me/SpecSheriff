// Records the owner's answer to the first question about the decomposition of a specification: the header of a split
// domain is kept once, in one of its documents, not necessarily alone; and applies the corrections EngStickler's readers
// confirmed in batch 18.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${f}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  fs.writeFileSync(f, s);
};

fix(docs + "t25-one-thought.md", [
  ["the answer is 11.1.2, which the owner agreed to on 2026-11-08. On 2026-11-19 the owner kept that permission in force and described how a specification is decomposed;", "the answer is given in 11.1.2, which the owner agreed to on 2026-11-08. On 2026-11-19 the owner left that permission in force and described how a specification is divided into domains, sections and documents;"],
  ["The owner then asked for the model to be stress-tested with the skill grilling, one question at a time, starting with where the header of a split domain goes.", "The owner then asked for that account to be stress-tested with the skill called `grilling`, one question at a time. To the first question, where the header of a split domain goes, the owner answered on 2026-11-19 that the header is kept once, in one of the domain's documents, though not necessarily alone: a domain may be divided into three parts, the first holding the header and three sections, the second three sections and the third two. The agent's recommendation of a header alone in its document is therefore dropped. The next question is whether 11.1.2's \"one per section\" becomes \"several documents, each holding whole sections\"; if so, row 11.3.7 is no longer needed, since a section cannot span files, and the check that matters is that a domain has one header, which only row 11.3.1 can carry."],
]);
fix(docs + "INDEX.md", [["decide-11-1-2.mjs records in the draft of 11.1.2 the owner's ruling that a large domain may still be divided into documents.", "decide-11-1-2.mjs records in the draft of 11.1.2 the owner's ruling that a large domain may still, as before, be divided into documents. grill-11-1-2-q1.mjs records the owner's answer on where the header of a split domain is kept."]]);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
fs.writeFileSync(iFile, x);
console.log("ok", ts);
