// Applies EngStickler's thirty-sixth batch of corrections to the continuation file, and records commands-facts.md, the
// fact sheet for the rewrite of "The commands", in INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The next node in the order of stage2-inventory.md is \"The commands\" (s-f5rz6b7dhxejjts, tools 2), whose draft the agent writes and sends to specsheriff-rule-reviewer before the node is shown to the owner.",
  "The next node in the order that stage2-inventory.md gives is \"The commands\" (s-f5rz6b7dhxejjts, tools 2). An agent wrote t25-pass/commands-facts.md, a fact sheet on every command, on what the new form requires of each, and on the gaps between them. From it the agent drafts the node, most likely split into several nodes, and sends the drafts to specsheriff-rule-reviewer before they are shown to the owner. Several gaps the fact sheet found are decisions for the owner, and they are put to the owner one at a time first.");
t = swap(t, "For a merge, the commit it follows is that merge's first parent,", "For a merge, the commit it follows is the merge's first parent,");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-archive-file-english.mjs does the same for \"Validation of a file of the archive\",",
  "fix-archive-file-english.mjs corrects the English of \"Validation of a file of the archive\" as EngStickler's reader proposed,");
s = swap(s, "fix-batch-35.mjs applies EngStickler's thirty-fifth batch of corrections to the continuation file and this index.",
  "fix-batch-35.mjs applies EngStickler's thirty-fifth batch of corrections to the continuation file and this index, and fix-batch-36.mjs the thirty-sixth. commands-facts.md is the fact sheet for the rewrite of \"The commands\" (s-f5rz6b7dhxejjts): every `sheriff` command with file and line, what the new form requires of each, the migrations from earlier releases, the node's tests and the agreed drafts it must agree with.");
fs.writeFileSync(index, s);
console.log(`updated at ${now}`);
