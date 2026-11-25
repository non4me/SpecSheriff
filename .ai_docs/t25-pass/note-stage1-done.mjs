// Records in the continuation file, the index and the queue map's outline that stage 1 of the move is complete.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to) => {
  if (s.split(from).length !== 2) throw new Error(`the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};

const cp = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(cp, "utf8");
c = swap(c, "4. [ ] The archive:", "4. [x] The archive:");
c = swap(c, "5. [ ] `meta.decisions` of each node:", "5. [x] `meta.decisions` of each node:");
c = swap(c, "After the third pass, EngStickler's readers will read the English text of the decisions and of the section texts. Sub-steps 4 and 5 will then be marked as done, and stage 1 will be complete.",
  "Stage 1 was completed at " + now + ". Thirteen EngStickler readers read the 18,000 words of English that stage 1 added: the decisions, the section texts, the translated todos and the `of` of the two restored lists. fix-stage1-english.mjs applied the 130 corrections confirmed from their reports, and build-moved.mjs was run again. The outputs still pass Ajv, and every agreed wording is still copied word for word.\n\n" +
  "**Stage 2 starts** with an inventory of the appendix of the tools, which an agent writes into stage2-inventory.md. For each node of tools.json, it lists the base rules that the node implements and how the new form changed them. It also lists the todos addressed to the step that changes the SpecSheriff tools, and the problems that moved/report.md leaves to stage 2. The agent then proposes the nodes of the appendix to the owner one at a time, in the order of the inventory.");
fs.writeFileSync(cp, c);

const op = new URL("queue-outline.md", here);
let o = fs.readFileSync(op, "utf8");
o = swap(o, "### ● этап 1: черновики — в файлы спецификации, пока в промежуточной папке", "### ✓ этап 1: черновики — в файлы спецификации, пока в промежуточной папке");
o = swap(o, "- ● схема по согласованным правилам: архив без sid, схема для каждого расширения, ratio, заголовок домена\n- ○ проверка английского в решениях и текстах разделов",
  "- ✓ схема по согласованным правилам: архив без sid, схема для каждого расширения, ratio, заголовок домена\n- ✓ английский в решениях и текстах разделов прочитан и поправлен");
o = swap(o, "### ○ этап 2: описание инструментов — по одному узлу с вами", "### ● этап 2: описание инструментов — по одному узлу с вами\n- ● перечень узлов описания, которые затрагивает новая форма\n- ○ затем узлы по одному");
fs.writeFileSync(op, o);

const ip = new URL("../INDEX.md", here);
let s = fs.readFileSync(ip, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
const anchor = "update-outline-stage1.mjs brings";
s = swap(s, anchor, "fix-stage1-english.mjs applies the corrections that the readers confirmed in those chunks, and note-stage1-done.mjs records that stage 1 is complete. " + anchor);
fs.writeFileSync(ip, s);
console.log("stage 1 recorded as complete at", now);
