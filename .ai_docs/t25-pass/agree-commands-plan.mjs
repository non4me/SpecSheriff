// Records the owner's agreement of 2026-11-21 («ок», typed as «jr») to the plan that replaces "The commands" with a
// section of nine nodes, and applies EngStickler's thirty-seventh batch of corrections to the continuation file and
// INDEX.md. Updates the queue outline.
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
  ["The next node in the order that stage2-inventory.md gives is", "The next node in the order given in stage2-inventory.md is"],
  ["Several gaps the fact sheet found are decisions for the owner, and they are put to the owner one at a time first. The agent has now put to the owner a plan that splits the node into a section \"The commands\" of these nodes, and the owner's answer is to be acted on first:",
    "Several gaps that the fact sheet found are for the owner to decide, and they are put to the owner first, one at a time. On 2026-11-21 the owner agreed («ок») to the agent's plan, which replaces the node with a section \"The commands\" made up of the following nodes. The agent drafts them in two groups, the first four nodes and then the other five, and sends each group to specsheriff-rule-reviewer before the nodes are shown to the owner one at a time:"],
  ["  1. the list of the commands, each with the node that describes it, together with the call without a command, `--version` and an unknown command;",
    "  1. the list of the commands, each with the node that describes it, together with a call with no command, a call with `--version` and a call with an unknown command;"],
  ["  2. what `sheriff reindex` writes: sids, including those of the nodes in cells, locations,", "  2. what `sheriff reindex` writes: sids (including those of the nodes in cells), locations,"],
  ["the gathered values, the approval statuses of sections and headers, a node made a draft by its fingerprint,",
    "the values gathered beside a field, the approval statuses of sections and headers, an approved node set to draft because its wording no longer has the fingerprint that its approval records,"],
  ["  3. what `sheriff reindex` changes from an earlier release: the present renames, and the new ones (the sid of an archived node, a RecordType's fields as its JSON Schema, `supersedes` links, `TextRule.list.declaredIn`, the rule approving the specification as an entry in `sheriff.config.json`,",
    "  3. what `sheriff reindex` changes of what an earlier release wrote: the renames it already makes, and the new changes (the sid of an archived node, a RecordType's fields rewritten as its JSON Schema, `supersedes` links, `TextRule.list.declaredIn`, the rule that set the specification's approval status rewritten as an entry in `sheriff.config.json`,"],
  ["  6. `sheriff model` and how a project's own check or generator is handed the model;", "  6. `sheriff model` and how a project's own check or generator is handed the model of the specification;"],
  ["  9. `sheriff settings`, the terminal program the owner chose on 2026-11-18: it approves the specification or returns it to draft after running the checks (s-qzthyh7yqvfhsa2), turns the `strict` flag on and off (s-q3pfzyaxvpr2zj2), and chooses or withdraws an extension (s-9ttvcwpqkehm58g); a command that lists the code without a SpecTag (s-kkbqcb9xrpaepwn).",
    "  9. `sheriff settings`, the terminal program the owner chose on 2026-11-18: it runs the checks and then approves the specification or returns it to draft (s-qzthyh7yqvfhsa2), turns the `strict` flag on and off (s-q3pfzyaxvpr2zj2), and chooses or withdraws an extension (s-9ttvcwpqkehm58g). The same node describes a separate command that lists by file and symbol the code without a SpecTag (s-kkbqcb9xrpaepwn)."],
  ["so it can drop the first of two values; and it does not name the files of the specification that it rewrites.",
    "so it can drop the first of the two values of a key written twice; and it does not report which files of the specification it rewrites."]
];
for (const [from, to] of pairs) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "every `sheriff` command with file and line,", "every `sheriff` command with the file and line of its code,");
s = swap(s, "the node's tests and the agreed drafts it must agree with.", "the node's tests and the agreed drafts that the rewritten node must be consistent with. agree-commands-plan.mjs records the owner's agreement to the plan for splitting that node.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ «Команды» — разделить на девять узлов\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Команды» — делится на девять узлов, согласовано\n- список команд, три узла о sheriff reindex, sheriff types, model, todos, guide и settings\n\n## ● В работе:");
o = swap(o, "- ● «Команды»: план разделения на девять узлов показан вам", "- ● «Команды»: пишутся черновики первых четырёх узлов — список команд и sheriff reindex");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
