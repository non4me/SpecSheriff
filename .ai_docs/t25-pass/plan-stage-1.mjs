// Writes the plan of stage 1 (the move of the agreed new form into the specification files) at the top of the
// continuation file, so that an interrupted session resumes from it, and records the owner's go-ahead of 2026-11-20.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const contPath = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(contPath, "utf8");
const plan = `**The next session continues** stage 1 of the step that changes the SpecSheriff tools, which the owner told the agent to start on 2026-11-20 («начинай») after seeing the plan at https://claude.ai/artifact/9DDLzVwkHXMDzvQHaYpqcQ (move-plan.html). Stage 1 builds the new specification files in a staging folder, .ai_docs/t25-pass/moved/, and leaves the files under specs/ untouched until the SpecSheriff tools accept the new form (stage 3). Its sub-steps, in order, each marked when done:

1. [ ] The schema in moved/specs/_schema/: a node of kind \`TableRule\` with its columns, its groups and its rows, each cell holding text or a node without a title (node 8.6, s-5fewsp22mmdz7y6, and node 1.3.5, s-5ah25f6gy99panq); a node's \`examples\`; the \`schema\` property of a RecordType; an extension file of the guidelines.
2. [ ] build-moved.mjs writes moved/specs/_guidelines/spec.json (sections 1 to 10) and one file for each extension in moved/specs/_guidelines/extensions/ (Domains, section 11; RecordType, section 12; Views of the specification, section 13). The structure and the order come from \`parts\` in base-structure.html; each rule's title, text, reason, examples and list come word for word from newform.json; the three tables come from table-10-1.json, table-11-3.json and table-12-12.json, their live rows as cell nodes with new sids; every node keeps the sid in its draft's \`sidValue\`; every node is written as a draft, and agreed.json lists each node the owner agreed to, with the date, for the approvals of stage 3.
3. [ ] Links: each \`cites\` link from the citations in a node's text, reason, examples and list; the other typed links of a node that keeps its sid, from specs/_guidelines/spec.json; each row's \`checks\` links from its \`rests\`; the typed links that the drafts' lists of changes promise for the move, such as \`refines\` from 1.7.7 to 10.1.
4. [ ] The archive: the present rules that the new form drops go to specs/_archive/ with the date, the reason and the sid of the node that replaces each, since the specification of this repository is approved. Fifteen such rules were found on 2026-11-20 (1.10, 1.15, 1.18, 1.27 to 1.33, 1.37, 1.39, 5.3, 6.5 and 6.6 in the present numbering).
5. [ ] \`meta.decisions\` of each node: the decisions its draft already holds, the decisions of the present node with the same sid, and the owner's rulings that the draft's list of changes records, written in English. Reader agents of EngStickler read them.
6. [ ] The text of each section: its purpose, from \`parts\`, written in English.
7. [ ] The check of the build: each sid occurs once; each citation and each link leads to an existing node; each agreed text is copied word for word; the links from tools.json to the dropped rules are listed for stage 2.`;
c = c.replace(/^\*\*The next session starts with\*\* stage 1 of the step that changes the SpecSheriff tools[^\n]*/m, () => plan);
if (!c.includes("Stage 1 builds the new specification files in a staging folder")) throw new Error("the top of the continuation file was not rewritten");
c = c.replace(/^\*\*Now \(\d{4}-\d{2}-\d{2}, \d{2}:\d{2} UTC\):\*\*/m, `**Now (${now.slice(0, 10)}, ${now.slice(11, 16)} UTC):**`);
fs.writeFileSync(contPath, c);

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
fs.writeFileSync(indexPath, s);
console.log("plan written at", now);
