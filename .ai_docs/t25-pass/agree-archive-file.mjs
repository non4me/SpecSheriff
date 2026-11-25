// Records the owner's agreement of 2026-11-21 («ок») to the new node "Validation of a file of the archive"
// (new:tools-7-1-archive-file), with the validation of a file of the archive taken as part of row 10.1.11's check, and
// writes english-archive-file.md, its English text, for EngStickler's reader. Updates the continuation file, INDEX.md
// and the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-archive-file.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["new:tools-7-1-archive-file"];
node.agreed = "2026-11-21";
node.rulings = [
  { date: "2026-11-21",
    problem: node.doubt,
    ruling: "The owner agreed to the node, with the validation of a file of the archive taken as part of the check of row 10.1.11 of the main table of checks, which therefore stays as agreed («ок»).",
    type: "textual" }
];
delete node.doubt;
const p = node.proposal;
fs.writeFileSync(new URL("english-archive-file.md", here), [
  "# \"Validation of a file of the archive\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const contUrl = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(contUrl, "utf8");
t = swap(t, "The second, \"Validation of a file of the archive\", has now been shown to the owner, and the owner's answer is to be acted on first.",
  "On the same day the owner agreed to the second, \"Validation of a file of the archive\" («ок»), which treats the validation of a file of the archive as part of row 10.1.11's check. The next node in the order of stage2-inventory.md is \"The commands\" (s-f5rz6b7dhxejjts, tools 2), whose draft the agent writes and sends to specsheriff-rule-reviewer before the node is shown to the owner.");
t = swap(t, "The page at https://claude.ai/artifact/6XFoxqdor7xwP6yBZ8a349 shows the node.\n",
  "The page at https://claude.ai/artifact/6XFoxqdor7xwP6yBZ8a349 shows the node.\n- On 2026-11-21 the owner agreed to \"Validation of a file of the archive\" too («ок»). agree-archive-file.mjs marked the draft as agreed, recorded the ruling on row 10.1.11 in it, and wrote english-archive-file.md, the English text of the agreed node, for EngStickler's reader. tools-drafts.before-agree-archive-file.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/VGUAq3CVYkHemuo5MGn21B shows the node.\n");
fs.writeFileSync(contUrl, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "tools-drafts.before-agree-archive.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-agree-archive.json is tools-drafts.json as it was before that script ran. agree-archive-file.mjs records the owner's agreement to \"Validation of a file of the archive\" and writes english-archive-file.md, its English text, for EngStickler's reader; tools-drafts.before-agree-archive-file.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ «Проверка файла архива» — новый узел\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Проверка файла архива» — согласован\n- файл архива проверяется только по своей схеме; это часть проверки строки 10.1.11\n\n## ● В работе:");
o = swap(o, "- ● «Проверка файла архива»: прошёл рецензента со второго раза, показан вам",
  "- ✓ «Проверка файла архива» — согласован\n- ● «Команды»: черновик пишется и пойдёт рецензенту");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
