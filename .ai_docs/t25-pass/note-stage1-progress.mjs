// Rewrites the paragraph of the continuation file that says how far stage 1 has come, and marks the sub-steps that are done.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const p = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(p, "utf8");
for (const [a, b] of [["3. [ ] Links:", "3. [x] Links:"], ["7. [ ] The check of the build", "7. [x] The check of the build"]]) {
  if (!c.includes(a)) throw new Error("not found: " + a);
  c = c.replace(a, b);
}
const start = c.indexOf("Progress on 2026-11-20:");
const end = c.indexOf("\n", start);
if (start < 0) throw new Error("the progress paragraph was not found");
const para = `Progress on 2026-11-20: a build agent wrote build-moved.mjs and the files in moved/, with moved/report.md. Four reader agents wrote the owner's rulings in English into decisions-out-1.json through decisions-out-4.json. Running the build revealed contradictions between agreed drafts, and two of them needed a ruling from the owner:
- The reason for rule 1.6.1 cited the current rule 5.3, which the new form drops. The owner accepted a sentence that states the reason itself.
- Rule 7.2.7 cited the node that defines the name RecordType in the RecordType extension, a citation that 1.7.3 forbids. The owner accepted SpecTag as the example name.

The second pass of the build removed the links from the base to the extensions and merged 327 decisions into \`meta.decisions\`. It also wrote the section texts and the archive of the eleven dropped rules, and translated the todos written in Russian into English. In rules 1.3.2 and 1.3.3, the citation of 5.3 was replaced by a citation of 1.6.1, a technical replacement. The drafts 1.3.1 and 6.1 were given the \`TextRule.list\` of the current nodes 1.5 and 2.2, because the format of the drafts had no field for a list; each list only restates its agreed text. The third pass, running at ${now}, makes the schema say what the agreed drafts say:
- an archived node has no sid;
- each extension has a schema of its own;
- \`ratio\` takes the notation of 6.6;
- the types of link are those of 6.1's list, and \`consumes\` belongs to the Domains extension;
- a domain's header has no required level.
What remains of stage 1 after the third pass: EngStickler's readers read the English of the decisions and of the section texts, and sub-steps 4 and 5 are marked as done.`;
c = c.slice(0, start) + para + c.slice(end);
fs.writeFileSync(p, c);

const ip = new URL("../INDEX.md", here);
let s = fs.readFileSync(ip, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
const anchor = "add-lists.mjs gives the drafts 1.3.1 and 6.1 the `TextRule.list` that the current nodes with their content hold.";
if (!s.includes(anchor)) throw new Error("index anchor not found");
s = s.replace(anchor, anchor + " update-outline-stage1.mjs brings the queue map's outline up to date with stage 1, and note-stage1-progress.mjs records in the continuation file how far stage 1 has come.");
fs.writeFileSync(ip, s);
console.log("noted at", now);
