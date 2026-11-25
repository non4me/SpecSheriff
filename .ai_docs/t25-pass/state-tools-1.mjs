// Records in the continuation file the state of the review of "Where the files are" (s-zefk589ykh37b8u):
// the owner's ruling of 2026-11-21 and the proposal of one node holding a table, in place of the section of
// eight rules proposed earlier.
import fs from "node:fs";

const url = new URL("../t25-one-thought.md", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const start = s.indexOf("**The first node of the appendix under review**");
const end = s.indexOf("The owner agreed to the new wording of node 9.2");
if (start < 0 || end < start) throw new Error("paragraph not found");
const now = `**The first node of the appendix under review** is "Where the files are" (s-zefk589ykh37b8u). Its drafts and those of the later nodes of the appendix are kept in t25-pass/tools-drafts.json, and gen-tools-node-page.mjs builds the page that shows a proposed node, tools-page/index.html. The state of the review of this node:
- On 2026-11-21 the owner asked what the node is for and for whom, and whether it is service information rather than a rule. The agent answered that the code of the SpecSheriff tools that finds the files is written from it, and that the code depends on these paths. The owner agreed («ок») to keep the node in the appendix of the tools and to remove the two paragraphs that instruct a user: how \`sheriff\` is run in a terminal and how the plugin for pytest is installed by pip. The practitioner's guide already gives both. agree-tools-1-instructions.mjs recorded the ruling and the removal in the draft.
- The agent then decided, on its own, against the section of eight rules it had proposed earlier: a list of where each file is kept states one thing, so the node stays one node holding a table of what is kept where. propose-tools-1.mjs wrote the proposed wording, part by part, with what changed in each part. The proposal also drops what other nodes of the appendix already state and the paragraph on the files of the tools in a project.
- specsheriff-rule-reviewer is checking the proposal. Its findings are applied before the page is published and the node is shown to the owner.

The choices the agent made on its own, which the proposal shows: the entries of the specification's approval status and of its \`strict\` flag are kept in \`specs/_status.jsonl\`; the bindings file is \`sheriff.bindings.json\`, next to \`sheriff.config.json\`; the chosen extensions are listed in \`sheriff.config.json\`; if the project has not chosen the Domains extension, the base specification is kept under \`specs/base/\`, and the section of the technical appendix that implements it in \`specs/tech/base.json\`.

To be taken up when the node of the Views extension is next changed: its section text calls the views "further documentation generated from the nodes", while row 10.1.39 calls the Markdown files that the repository keeps outside \`specs/\` "the documentation".

`;
s = s.slice(0, start) + now + s.slice(end);
s = s.replace(/The owner's answer to the proposal for it, described in the paragraph "The first node of the appendix under review" below, is to be dealt with first\./,
  'Its proposed new wording, described in the paragraph "The first node of the appendix under review" below, is shown to the owner once the reviewer\'s findings are applied.');
fs.writeFileSync(url, s);
console.log("continuation file updated");
