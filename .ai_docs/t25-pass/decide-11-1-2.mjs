// Records in the draft of 11.1.2 the owner's ruling of 2026-11-19 that a large domain may still be divided into
// documents, one per section, with the owner's account of how a specification is decomposed; writes the state into the
// continuation file and applies the corrections EngStickler's readers confirmed in batch 17.
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
const n = nf["11.1.2"];
n.decisions = [...(n.decisions ?? []), {
  date: "2026-11-19",
  problem: "Whether a domain may still be divided into several documents, and why it would be.",
  ruling: "The owner: the permission stays. A small specification fits in one document, whose rules are grouped into sections, each with its own service information. As the system grows, the specification is divided into domains: a domain is a document of the same structure with a header of its own, usually a group of sections, sometimes a single group. A domain that grows too large, and has no logical division into smaller domains, is divided physically into files, each holding one section of the domain, so that working with it stays easy and what is loaded into the context window stays small.",
}];
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
fix(cont, [
  ["a question on row 11.3.7 of table 11.3, the missing check for 11.1.2, is put to the owner:", "a question about row 11.3.7 of table 11.3, the missing check for 11.1.2, is put to the owner:"],
  ["the answer is 11.1.2, which the owner agreed on 2026-11-08, and the owner is asked whether that permission stays.", "the answer is 11.1.2, which the owner agreed to on 2026-11-08. On 2026-11-19 the owner kept that permission in force and described how a specification is decomposed; the ruling is recorded in the `decisions` of the draft of 11.1.2. The owner then asked for the model to be stress-tested with the skill grilling, one question at a time, starting with where the header of a split domain goes."],
  ["specsheriff-rule-reviewer found that the draft checked less than 11.1.2 requires,", "specsheriff-rule-reviewer found that the drafted check covered less than 11.1.2 requires,"],
  ["The agent recommends that the header stand alone in its document: the reason for 11.1.3 says", "The agent recommends that the header be alone in its document: the `reason` of 11.1.3 says"],
  ["The agent proposes renaming the term \"documents\" in the appendix to \"the documentation\" in the step that changes the SpecSheriff tools.", "The agent proposes renaming the term \"documents\" to \"documentation\" in the appendix, as part of the step that changes the SpecSheriff tools."],
]);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
const a = "review-11-3-7.mjs records the two wordings of row 11.3.7 that follow from the reviewer's findings.";
if (!x.includes(a)) throw new Error("index: missing");
x = x.replace(a, `${a} decide-11-1-2.mjs records in the draft of 11.1.2 the owner's ruling that a large domain may still be divided into documents.`);
fs.writeFileSync(iFile, x);
console.log("ok", ts);
