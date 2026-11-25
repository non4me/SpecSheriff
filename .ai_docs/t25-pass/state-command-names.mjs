// Records the owner's proposal of 2026-11-21 to rename four commands so that each name says what the command does
// («sheriff message -> sheriff commit, sheriff model -> sheriff json_schema, sheriff export -> sheriff markdown, sheriff
// render -> sheriff map»), and the agent's answer to it. Applies EngStickler's forty-second batch of corrections to the
// continuation file and INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["Stage 1 was part of the step that changes the SpecSheriff tools, which the owner told the agent to start on 2026-11-20 («начинай») after the owner saw the plan at https://claude.ai/artifact/9DDLzVwkHXMDzvQHaYpqcQ (move-plan.html).",
    "Stage 1 was part of the step that changes the SpecSheriff tools. On 2026-11-20, after seeing the plan at https://claude.ai/artifact/9DDLzVwkHXMDzvQHaYpqcQ (move-plan.html), the owner told the agent to start that step («начинай»)."],
  ["and it says that an unknown command exits with code 2.", "and it says that `sheriff` exits with code 2 when it is given an unknown command."],
  ["That export node is also to take over two statements from the old node:", "That export node is also to carry over two statements from the old node:"],
  ["reports each node that it sets to draft, does this only in the files that the repository keeps, and says how it writes a file;",
    "says that `sheriff reindex` reports each node that it sets to draft, sets nodes to draft only in the files that the repository keeps, and writes each file in a stated form;"],
  ["the nodes that a change of form sets to draft: rule 1.3.6 already says who approves them. It now maps a RecordType's fields to JSON Schema from tools 18 and 20. Four earlier cases have no target: a field of the type `variant`, a field required \"where it holds a value\", the source of values `domains`, and an empty list of a field's own values. They are to be put to the owner with the node.",
    "the nodes that a change of a node's form sets to draft: rule 1.3.6 already says who approves them. It now maps a RecordType's fields to JSON Schema as tools 18 and 20 describe. Four cases that earlier releases wrote have no counterpart in JSON Schema: a field of the type `variant`, a field required \"where it holds a value\", the source `domains` of a field's values, and an empty list of a field's own values. They are to be put to the owner together with the node."],
  ["fix-commands-list-purpose.mjs did so, listing each check command apart,", "fix-commands-list-purpose.mjs did so, listing each check command separately,"],
  ["The revised node has now been shown to the owner again, and the owner's answer is to be acted on first.",
    `The revised node was shown to the owner again.
- The owner then proposed to rename four commands so that each name says what the command does: \`sheriff message\` to \`sheriff commit\`, \`sheriff model\` to \`sheriff json_schema\`, \`sheriff export\` to \`sheriff markdown\` and \`sheriff render\` to \`sheriff map\`. The agent agreed to \`sheriff markdown\` and \`sheriff map\`, and proposed two changes. \`sheriff model\` prints the specification itself as JSON data, not a JSON Schema, which is the schema in specs/_schema/; so the agent proposed \`sheriff json\`. \`sheriff commit\` could be read as a command that makes a commit, while the command checks a commit's message against the code that the commit changes; so the agent proposed \`sheriff commit-message\`. The owner's answer is to be acted on first. The new names change the code, the hooks, the skills, the tests and the nodes that name these commands, among them tools 4, 5, 6 and 7.1.23; all of that is done in stage 3, and each node is changed by a technical replacement when its turn comes.`]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "against a test's file and name combined.", "against a test's file and name joined into one string.");
s = swap(s, "that is still a draft under the title proposed for it, which it finds through the sid stored in the node's draft.",
  "that is still a draft with the title proposed for it, which it finds through the sid stored in the node's entry in tools-drafts.json.");
s = swap(s, "fix-commands-list-purpose.mjs gives each command of the list node one sentence saying what it is for, as the owner asked,",
  "fix-commands-list-purpose.mjs adds to each command in the list node a sentence saying what the command is for, as the owner asked,");
s = swap(s, "and tools-drafts.before-list-purpose.json is tools-drafts.json as it was before that script ran.",
  "and tools-drafts.before-list-purpose.json is tools-drafts.json as it was before that script ran. state-command-names.mjs records the owner's proposal to rename four commands and the agent's answer.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ Новые имена команд\n- sheriff markdown и sheriff map — как вы предложили\n- предлагаю sheriff json вместо json_schema и sheriff commit-message вместо commit\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
