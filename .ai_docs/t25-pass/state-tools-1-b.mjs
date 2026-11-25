// Records in the continuation file the state reached once specsheriff-rule-reviewer's findings on
// "Where the files are" were applied, and the follow-ups for other nodes of the appendix of the tools.
import fs from "node:fs";

const url = new URL("../t25-one-thought.md", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const from = "- specsheriff-rule-reviewer is checking the proposal. Its findings are applied before the page is published and the node is shown to the owner.";
if (!s.includes(from)) throw new Error("paragraph not found");
const to = `- specsheriff-rule-reviewer found the first proposal not ready. propose-tools-1-b.mjs applied its findings. The node now keeps only the table of what is kept where, with the documentation as a row of the table. Two new nodes after it hold what the node held besides: "The settings a project shares", the list of what \`sheriff.config.json\` holds together with the sentence on where the SpecSheriff tools look for SpecTags, and "What the SpecSheriff tools read in the project's own guidelines", the list of what \`project.json\` holds. Their drafts are kept in tools-drafts.json under the keys "new:tools-1-settings" and "new:tools-1-project". Each of them goes to the reviewer and then to the owner after "Where the files are", one at a time.
- The reviewer is re-checking the revised node. Once it passes, the page tools-page/index.html is published and the node is shown to the owner.

Follow-ups from the reviewer's report, each to be taken up when its node's turn comes:
- "No copy of the SpecSheriff guidelines" (s-6bmnsbskg6en4nf) is to count as copies the files of the extensions of the guidelines and their schemas too.
- "The schema and a project's extension" (s-xzcw3hv4hmxz7h7) is to say that \`extension.schema.json\` checks the schema of each extension of the guidelines, as well as the project's extension.
- The nodes of the two plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4) are to list the extensions of the guidelines, their schemas and the appendix of the tools among what each plugin carries.
- The nodes s-j9r8z4xdrfkfs47, s-v4qus7raqnwzneb and s-7unxytshhc4md54 still read the specification's approval from a rule of \`project.json\`; they are to read the entries in \`specs/_status.jsonl\`.
- "How an approval is recorded" (s-v4qus7raqnwzneb) and "Building the map" (s-rpv4fkdqqguptqd) are to cite "Where the files are" for the paths of the approvals and of the map, which that node now holds.
- A defect: the pre-push hook refuses a push when \`sheriff.config.json\` names no \`testCommand\` and the specification is approved, whatever the project's own guidelines say about where the tests run. Rule 1.6.1 (s-m4h279nbaqkpa3t) lets a project run its tests elsewhere, such as on a shared server before a merge. This is to be fixed when "The hooks" (s-477gtdrkw34dzxw) is reviewed, and then in the code.
- The schema of the entries in \`specs/_status.jsonl\`, \`status.schema.json\`, which sets the default of the \`strict\` flag, is to be added to moved/specs/_schema/ before stage 3.
- The tests that now carry the SpecTag of "Where the files are" are to be divided in stage 3: those of config.test.ts go to "The settings a project shares", and the others stay.`;
s = s.replace(from, to);
fs.writeFileSync(url, s);
console.log("continuation file updated");
