// Records the owner's agreement of 2026-11-21 («ок») to "A removed node and the archive" (s-j4webte36gkraju), with the
// example the reviewer proposed and with the consequence that a commit changing an archived node's wording is refused,
// and writes english-archive.md, its English text, for EngStickler's reader. Applies EngStickler's thirty-fourth batch
// of corrections to the continuation file and INDEX.md, and updates the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) s = swap(s, from, to);
  fs.writeFileSync(url, s);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-archive.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["s-j4webte36gkraju"];
node.agreed = "2026-11-21";
node.rulings = [
  { date: "2026-11-21",
    problem: "An archived node has no sid (s-f2b5zvc565s242f), so a node of the archive counts as added by a commit where the archive after the commit holds more nodes with its location, kind and wording than the archive of the commit it follows. A commit that changes the wording of an archived node is therefore refused.",
    ruling: "The owner agreed to the node with that consequence, and with the example that specsheriff-rule-reviewer proposed («ок»).",
    type: "textual" }
];
const p = node.proposal;
fs.writeFileSync(new URL("english-archive.md", here), [
  "# \"A removed node and the archive\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", "## Example", "", p.examples[0].en, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["and specsheriff-rule-reviewer's second review found both ready once the fixes it asked for were made, which fix-archive-c.mjs made. The first, \"A removed node and the archive\", has now been shown to the owner together with an example that the reviewer proposed, and the owner's answer is to be acted on first. The second, \"Validation of a file of the archive\", is shown after it.",
    "and specsheriff-rule-reviewer's second review found both ready once fix-archive-c.mjs had made the fixes it asked for. On 2026-11-21 the owner agreed to the first, \"A removed node and the archive\", together with the example that the reviewer proposed, and accepted that a commit which changes the wording of an archived node is refused. The second, \"Validation of a file of the archive\", has now been shown to the owner, and the owner's answer is to be acted on first."],
  ["in newform.json, which stays agreed, and changed the comment on `archived`", "in newform.json, which remains marked as agreed, and changed the comment on `archived`"],
  ["but the third, on updating a replacement, fell away once the owner made the replacement optional.", "but the third, on updating the reference to a replacement, was dropped once the owner made the replacement optional."],
  ["now covers the check that a commit adds to the archive exactly the nodes it removes that must be archived.", "now covers the check that a commit adds to the archive exactly those of the nodes it removes that must be archived."],
  ["- specsheriff-rule-reviewer's second review asked for these fixes, which fix-archive-c.mjs made, and tools-drafts.before-archive-c.json keeps the drafts as they were before that script ran:",
    "- specsheriff-rule-reviewer's second review asked for the following fixes, which fix-archive-c.mjs made:"],
  ["a node of the archive counts as added by a commit where the archive after the commit holds more nodes with its location, kind and wording than the archive of the commit it follows,",
    "a node of the archive counts as added by a commit after which the archive holds more nodes with its location, kind and wording than the archive of the commit it follows,"],
  ["and for a node in a cell only the wording the node holds itself is compared.", "and for a node in a cell only the wording in the node's own fields is compared."],
  ["The schema of the archive requires only a location, a kind, the `archived` field, and that a node of the archive holds no sid, no node under it and no link pointing at it.",
    "The schema of the archive requires only that a node of the archive have a location, a kind and the `archived` field, and hold no sid, no node under it and no link pointing at it."],
  ["  - no row of the main table of checks names the check that a node of the archive holds no sid. The agent takes the validation of a file of the archive as part of row 10.1.11's check,",
    "  - no row of the main table of checks states the check that a node of the archive holds no sid. The agent treats the validation of a file of the archive as part of row 10.1.11's check,"],
  ["- fix-archive-c.mjs also corrected the English of rule 2.6 as EngStickler's reader proposed, without a change of meaning,", "- fix-archive-c.mjs also corrected the English of rule 2.6 as EngStickler's reader proposed, without changing its meaning,"],
  ["then rebuilt the staged files and the page of the base specification.", "then rebuilt the files in the staging folder moved/ and the page of the base specification. tools-drafts.before-archive-c.json keeps the drafts as they were before fix-archive-c.mjs ran."],
  ["the test of s-j4webte36gkraju that refuses a node standing in the archive is to be rewritten;", "the test of s-j4webte36gkraju that checks that a node in the archive is refused is to be rewritten;"],
  ["removes the sid of a node that an earlier release archived with one.\n",
    "removes the sid of a node that an earlier release archived with one.\n- On 2026-11-21 the owner agreed to \"A removed node and the archive\" («ок»). agree-archive.mjs marked the draft as agreed, recorded the agreement and its consequence in the draft, and wrote english-archive.md, the English text of the agreed node, for EngStickler's reader. tools-drafts.before-agree-archive.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/6XFoxqdor7xwP6yBZ8a349 shows the node.\n"]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-archive-c.mjs applies the reviewer's second report on both drafts,", "fix-archive-c.mjs applies the findings of the reviewer's second report on both drafts,");
s = swap(s, "tools-drafts.before-archive-c.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-archive-c.json is tools-drafts.json as it was before that script ran. agree-archive.mjs records the owner's agreement to \"A removed node and the archive\" and writes english-archive.md, its English text, for EngStickler's reader; tools-drafts.before-agree-archive.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/### ◐ «Удалённый узел и архив» — узел и пример\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "### ◐ «Проверка файла архива» — новый узел\n- файл архива проверяется только по своей схеме; sheriff binding архив не читает\n- проверку, что у узла архива нет sid, считаю частью строки 10.1.11\n\n");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Удалённый узел и архив» — согласован\n- запись в архиве узнаётся по расположению, типу и формулировке; пример — с правилом и пустым разделом\n- узел в архиве править нельзя, удалять можно\n\n## ● В работе:");
o = swap(o, "- ● «Удалённый узел и архив»: прошёл рецензента со второго раза, показан вам с примером\n- ○ «Проверка файла архива»: после него",
  "- ✓ «Удалённый узел и архив» — согласован\n- ● «Проверка файла архива»: прошёл рецензента со второго раза, показан вам");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
