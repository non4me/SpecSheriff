// Records in the continuation file the first review of the first group of the nodes that replace "The commands" and
// what fix-commands-a2.mjs did, applies EngStickler's thirty-eighth batch of corrections, and updates INDEX.md and the
// queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const pairs = [
  ["together with a call with no command, a call with `--version` and a call with an unknown command;", "together with a run of `sheriff` with no command, a run with `--version` and a run with an unknown command;"],
  ["an approved node set to draft because its wording no longer has the fingerprint that its approval records,", "an approved node set to draft because its wording no longer matches the fingerprint that its approval records,"],
  ["the index of a domain's header where the Domains extension is chosen,", "the index in a domain's header where the Domains extension is chosen,"],
  ["  3. what `sheriff reindex` changes of what an earlier release wrote:", "  3. what `sheriff reindex` changes in what an earlier release wrote:"],
  ["and chooses or withdraws an extension (s-9ttvcwpqkehm58g). The same node describes a separate command that lists by file and symbol the code without a SpecTag (s-kkbqcb9xrpaepwn).",
    "and chooses an extension or withdraws the choice of an extension (s-9ttvcwpqkehm58g). The same node describes a separate command that lists, by file and symbol, the code that has no SpecTag (s-kkbqcb9xrpaepwn)."],
  ["  propose-commands-a.mjs has drafted the first group, nodes 1 to 4 and the section that holds them, and given every new node of the plan a sid; specsheriff-rule-reviewer is reviewing that group.",
    `  propose-commands-a.mjs drafted the first group, nodes 1 to 4 and the section that holds them, and gave every new node of the plan a sid, kept in tools-drafts.json under the key commands:sids. specsheriff-rule-reviewer's first report passed "Keys written twice" once its fixes were made, and found the other three not ready. fix-commands-a2.mjs applied the report, and tools-drafts.before-commands-a2.json keeps the drafts as they were before that script ran:
  - The list node, now titled "The commands of the SpecSheriff tools", implements rule 2.1 (s-a4rbry4hsu34hy8), and an unknown command ends with the exit code 2. Its paragraph saying that \`sheriff export\` and \`sheriff render\` write only where the Views extension is chosen was taken out. Whether they do so, and whether the hooks then run them only there, is to be settled with "The hooks" (s-477gtdrkw34dzxw) and the nodes on the export and the map (s-k4nqjr96ux7a5m7, s-rpv4fkdqqguptqd). That export node is also to take over two statements of the old node: \`sheriff show\` finds a node by its sid or its location, and the export writes one file for each file of the specification.
  - In "What \`sheriff reindex\` writes", an approved node stays approved while an approval stands for its current wording (s-v4qus7raqnwzneb), which keeps the meaning of the approved node. The node now says what an entry of \`meta.code\` and \`meta.tests\` names. "The hooks" and "A node's \`meta.code\` and \`meta.tests\`" (s-t383grkn3q68dpf) are to change with it, since an edit to code or tests alone must also rebuild those lists. The location of a node in a cell (rule 8.5) and what a domain header's status rests on are still open.
  - In the node on what an earlier release wrote, a renamed key or kind keeps a node's fingerprint. Any other change of form, such as a RecordType's \`fields\` becoming its \`schema\`, makes the node a draft: \`sheriff reindex\` names it, and an agent approves it on an owner's behalf as a change that alters no meaning (s-t5uw8zfxzhfdg86). This choice is to be put to the owner with the node. The rule approving the specification migrates only until \`sheriff.config.json\` holds an entry for the specification's approval status. Where a node needs an extension that is still to be chosen, \`sheriff reindex\` names that extension.
  - "Keys written twice" now has an example. Whether the merge also covers \`specs/_schema/project.schema.json\` is to be put to the owner with the node.
  - As a technical replacement, the citations of s-f5rz6b7dhxejjts in the agreed drafts "Validation against the schema before a command works on the files", "A removed node and the archive" and "Validation of a file of the archive" now point to the node on earlier releases. The current nodes s-95w92rnjuv3sst8, s-j9r8z4xdrfkfs47, s-utf4mbt7ref8g9c and s-dbk2vyeg8z5jxna are to be retargeted in the same way when they are reviewed.
  specsheriff-rule-reviewer is reviewing the three revised drafts again.`]
];
for (const [from, to] of pairs) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and the folders tools-page-cmd-* hold the pages of those drafts.",
  "and the folders tools-page-cmd-* hold the pages of those drafts. fix-commands-a2.mjs applies the reviewer's first report on that group and retargets the citations of \"The commands\" in three agreed drafts; tools-drafts.before-commands-a2.json is tools-drafts.json as it was before that script ran. state-commands-a2.mjs records that step in the continuation file. gen-tools-node-page.mjs matches each entry of a draft's `testsFrom` against a test's file and name together.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Команды»: пишутся черновики первых четырёх узлов — список команд и sheriff reindex",
  "- ● «Команды»: первые четыре узла переписаны по отчёту рецензента; «Ключи, записанные дважды» прошёл, три других — у рецензента снова");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
