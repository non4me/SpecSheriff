// Records in the continuation file and the queue outline the plan for splitting "The commands" (s-f5rz6b7dhxejjts),
// which the agent has put to the owner before drafting the nodes.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "Several gaps the fact sheet found are decisions for the owner, and they are put to the owner one at a time first.",
  `Several gaps the fact sheet found are decisions for the owner, and they are put to the owner one at a time first. The agent has now put to the owner a plan that splits the node into a section "The commands" of these nodes, and the owner's answer is to be acted on first:
  1. the list of the commands, each with the node that describes it, together with the call without a command, \`--version\` and an unknown command; this node keeps the sid s-f5rz6b7dhxejjts;
  2. what \`sheriff reindex\` writes: sids, including those of the nodes in cells, locations, incoming links, the index of a domain's header where the Domains extension is chosen, the gathered values, the approval statuses of sections and headers, a node made a draft by its fingerprint, and the lists \`meta.code\` and \`meta.tests\` (s-rwqzepmrt77rv35);
  3. what \`sheriff reindex\` changes from an earlier release: the present renames, and the new ones (the sid of an archived node, a RecordType's fields as its JSON Schema, \`supersedes\` links, \`TextRule.list.declaredIn\`, the rule approving the specification as an entry in \`sheriff.config.json\`, the key \`writesSpecSheriffGuidelines\`, and tests that name a node by a bare sid);
  4. the merge of keys written twice;
  5. \`sheriff types\`: code generated from the last approved wordings, which the tools find in git history (s-qyjw8xez6t6adc3);
  6. \`sheriff model\` and how a project's own check or generator is handed the model;
  7. \`sheriff todos\`;
  8. \`sheriff guide\`, which prints the SpecSheriff guidelines, the chosen extensions and the project's own guidelines, and no longer the appendix of the tools (s-a4rbry4hsu34hy8);
  9. \`sheriff settings\`, the terminal program the owner chose on 2026-11-18: it approves the specification or returns it to draft after running the checks (s-qzthyh7yqvfhsa2), turns the \`strict\` flag on and off (s-q3pfzyaxvpr2zj2), and chooses or withdraws an extension (s-9ttvcwpqkehm58g); a command that lists the code without a SpecTag (s-kkbqcb9xrpaepwn).
  The fact sheet also found two defects in the code of \`sheriff reindex\`, to be fixed in stage 3: the rewriting of tests that name a node by a bare sid reads the files of the specification before the merge of keys written twice, so it can drop the first of two values; and it does not name the files of the specification that it rewrites.`);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and fix-batch-36.mjs the thirty-sixth.", "and fix-batch-36.mjs the thirty-sixth. state-commands-plan.mjs records the plan for splitting \"The commands\" that was put to the owner.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Команды»: черновик пишется и пойдёт рецензенту", "- ● «Команды»: план разделения на девять узлов показан вам");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Команды» — разделить на девять узлов\n- список команд; что пишет reindex; что он меняет от прежних выпусков; слияние дважды записанных ключей\n- sheriff types из одобренных формулировок; sheriff model; sheriff todos; sheriff guide; sheriff settings\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
