// Records in the continuation file the first review of the draft of "A removed node and the archive" and the question
// it raises for the owner: whether row 10.1.11 of the main table of checks is to require that a node of the archive
// names as its replacement only a node of the specification. Applies EngStickler's thirtieth batch of corrections to
// the continuation file and INDEX.md, puts back a line that an earlier script had displaced, and updates the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const fileUrl = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(fileUrl, "utf8");
const displaced = "  - tools-drafts.before-schema-c.json keeps the drafts as they were before propose-schema-c.mjs ran. tools-page-schema/index.html and tools-page-validate/index.html show the two drafts.\n";
t = swap(t, displaced, "");
const pairs = [
  ["since the validation leaves out what the command writes itself. The draft therefore keeps the paragraph, and the reviewer's objection is shown to the owner together with the node.\n",
    "since the validation leaves out what the command itself writes. The draft therefore keeps the paragraph, and the reviewer's objection is shown to the owner together with the node.\n" + displaced],
  ["The next node is \"A removed node and the archive\" (s-j4webte36gkraju). propose-archive.mjs has drafted its new wording, and specsheriff-rule-reviewer is reviewing the draft before the node is shown to the owner.",
    "The next node is \"A removed node and the archive\" (s-j4webte36gkraju). specsheriff-rule-reviewer found the first draft of the node's new wording not ready. Its report raises a question for the owner, which has now been put to the owner: whether row 10.1.11 of the main table of checks is to require that a node of the archive names as its replacement only a node of the specification. The owner's answer is to be acted on first."],
  ["- fix-schema-d.mjs acted on the owner's remark on negation in the first node,", "- fix-schema-d.mjs acted on the owner's remark that the conditions in the first of the two nodes be stated positively,"],
  ["the sentence on what the commands do when they refuse ends with \"each of them then stops\" and \"leaves every file as it was\",", "the sentence on what the commands do when they refuse now contains \"each of them then stops\" and \"leaves every file as it was\","],
  ["since the reader's alternative was a negation.", "since the reader's alternative was worded as a negation."],
  ["propose-archive.mjs drafted its new wording, and tools-drafts.before-archive.json keeps the drafts as they were before that script ran. The draft does the following:",
    "propose-archive.mjs drafted the node's new wording, and tools-drafts.before-archive.json keeps the drafts as they were before that script ran. The draft says the following:"],
  ["which leaves out a section and a domain's header;", "which excludes a section and a domain's header;"],
  ["  - each node that a commit adds to the archive must be the entry of such a removed node,", "  - each node that a commit adds to the archive must be the archive entry of such a removed node,"],
  ["and that schema holds only what the tools read from a node of the archive", "and that schema describes only what the tools read from a node of the archive"],
  ["  - `sheriff reindex` passes a replacement on when the replacement is removed in turn, as rule 2.6 requires.",
    "  - when a replacement is removed later, `sheriff reindex` names the replacement's own replacement in its place, as rule 2.6 requires."],
  ["passing a replacement on in `sheriff reindex`, since no row of the main table of checks checks that a replacement is a node of the specification; whether `sheriff reindex` is to remove the sid of a node that an earlier release archived with one;",
    "passing a replacement on in `sheriff reindex`, since no row of the main table of checks verifies that a replacement is a node of the specification; removing, in `sheriff reindex`, the sid of a node that an earlier release archived with a sid;"],
  ["and refusing a node that was never approved only in the commit that adds it to the archive.",
    `and refusing a node that was never approved only in the commit that adds it to the archive.
- specsheriff-rule-reviewer found that draft not ready. Its findings:
  - The node is to be split in three, as rule 7.3.3 calls for: the check made when a commit removes a node, the validation of a file of the archive against its schema, and the passing on of a replacement. The agent splits a node without asking, as .claude/vt/rules.md allows.
  - \`sheriff reindex\` alone passing a replacement on does not hold every participant to rule 2.6, since the git hooks do not run \`sheriff reindex\`. A commit made without an agent would leave in the archive a replacement that the specification no longer holds. The reviewer recommends that row 10.1.11 also require that a node of the archive names as its replacement only a node of the specification, checked by \`sheriff validate\`. That changes an agreed row, so the agent has put it to the owner.
  - "Adds to the archive" is to be defined for nodes without a sid, so that an entry that \`sheriff reindex\` has rewritten does not count as added.
  - An entry is to hold the removed node's wording too, since row 10.1.11 requires the node itself to be placed in the archive.
  - The opening sentence is to say what is checked: that a commit adds to the archive exactly those of the nodes it removes that are to go there. It is also not to catch a node moved to another file.
  - A domain's header is to go from the node, as the note of 2026-11-12 says, since rule 1.3.8 speaks only of a section. The Domains extension has no rule saying that a header's status is derived from the nodes under it; that gap is to be raised when the extension is next changed.
  - "The commands" (s-f5rz6b7dhxejjts) is to say that \`sheriff reindex\` removes the sid of a node that an earlier release archived with one, before it validates the archive. archive-file.schema.json and its comments are to change with this node.`]
];
for (const [from, to] of pairs) t = swap(t, from, to);
fs.writeFileSync(fileUrl, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and prepares the second draft for the owner", "and prepares the draft of the second node for the owner");
s = swap(s, "for EngStickler's reader, and corrects the English of the first node;", "for EngStickler's reader, and corrects the English of \"How the schema of the specification is composed\";");
s = swap(s, "tools-page-archive/ holds the page showing the draft.", "tools-page-archive/ holds the page showing the draft. state-archive-b.mjs records in the continuation file the reviewer's first report on that draft and the question it raises for the owner.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Удалённый узел и архив»: черновик у рецензента", "- ● «Удалённый узел и архив»: рецензент советует разделить узел на три и проверять замену в архиве");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ Строка 10.1.11: проверять ли замену в архиве\n- git-хуки не запускают sheriff reindex, и коммит без агента оставит в архиве замену, которой в спецификации уже нет\n- предлагаю добавить в строку: узел архива называет заменой только узел спецификации\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
