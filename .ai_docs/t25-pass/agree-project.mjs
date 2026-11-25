// Records the owner's agreement of 2026-11-21 («ок») to the new node "What the SpecSheriff tools read in the project's
// own guidelines", with the list of the project's own tools that rewrite files kept in `project.json`, and writes
// english-project.md, the English text of that node, for EngStickler's reader. Applies EngStickler's twenty-fourth batch
// of corrections to the continuation file, and updates INDEX.md and the queue outline.
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

const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-project.json", here), JSON.stringify(drafts, null, 2) + "\n");

const node = drafts["new:tools-1-project"];
node.agreed = "2026-11-21";
node.rulings = [{
  date: "2026-11-21",
  problem: "On 2026-11-05 the owner ruled, in \"The project's own tools in a git hook\" (s-n4m5zvh96yb299p), that a project registers its own tools for a hook in a form that the hook can read without the SpecSheriff tools. A list in `project.json` cannot be read without the SpecSheriff tools, yet the agreed rule on the order in which tools and checks run (s-pcnyfp7gev7syax) says that the project's own guidelines list the project's own tools that rewrite files.",
  ruling: "The owner agreed to the node with that list kept in `project.json` («ок»). If the SpecSheriff tools cannot run, a git hook runs all the project's own tools in the bytewise order of their names, as it does now; no check required by the SpecSheriff guidelines runs in that case anyway.",
  type: "textual"
}];
delete node.doubt;
const p = node.proposal;
fs.writeFileSync(new URL("english-project.md", here), [
  "# \"What the SpecSheriff tools read in the project's own guidelines\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["The owner agreed on 2026-11-21 to the first two nodes under review.", "The owner agreed on 2026-11-21 to the first three nodes under review."],
  ["The second is the new node \"Project-wide settings\". The paragraph \"The first node of the appendix under review\" below describes both. The next node is the new node \"What the SpecSheriff tools read in the project's own guidelines\". specsheriff-rule-reviewer passed its draft on the third review, and the node is now shown to the owner, together with the reviewer's doubt about where the list of the project's own tools that rewrite files is kept. The owner's answer is to be acted on first.",
    "The second is the new node \"Project-wide settings\". The third is the new node \"What the SpecSheriff tools read in the project's own guidelines\", which keeps the list of the project's own tools that rewrite files in `project.json`. The paragraph \"The first node of the appendix under review\" below describes all three nodes. The next node is \"The schema and a project's extension\" (s-xzcw3hv4hmxz7h7), and specsheriff-rule-reviewer reviews its rewritten draft before the node is shown to the owner."],
  ["  - the closing paragraph is now a list, and it covers only the items that find a rule by its `refines` link;",
    "  - the closing paragraph now ends in a list, and it applies only to the items for which the tools find a rule by its `refines` link;"],
  ["  - the item on kinds cites only rule 8.3, and the item on `exempts` links names the nodes of `project.json`;",
    "  - the item on kinds of node cites only rule 8.3, and the item on `exempts` links names the nodes of `project.json` that hold such links;"],
  ["- The third review left a doubt for the owner. On 2026-11-05 the owner ruled, in \"The project's own tools in a git hook\" (s-n4m5zvh96yb299p), that a project registers its own tools for a hook in a way that the hook reads without the SpecSheriff tools. A list in `project.json` cannot be read that way, yet the agreed rule 10.12 says that the project's own guidelines list the tools that rewrite files. The agent recommends keeping the list in `project.json`, as rule 10.12 says. Where the SpecSheriff tools cannot run, the hook would then run all the project's own tools in the byte order of their names, as it does now. No check of the SpecSheriff guidelines runs in that case anyway.",
    "- The third review left a question for the owner. On 2026-11-05 the owner ruled, in \"The project's own tools in a git hook\" (s-n4m5zvh96yb299p), that a project registers its own tools for a hook in a form that the hook can read without the SpecSheriff tools. A list in `project.json` cannot be read without the SpecSheriff tools, yet the agreed rule 10.12 says that the project's own guidelines list the tools that rewrite files. The agent recommended keeping the list in `project.json`, as rule 10.12 says. If the SpecSheriff tools cannot run, the hook then runs all the project's own tools in the bytewise order of their names, as it does now. No check required by the SpecSheriff guidelines runs in that case anyway.\n- The owner agreed to the node on 2026-11-21 on those terms («ок»). agree-project.mjs marked the draft as agreed, recorded the owner's ruling in it, and wrote english-project.md, the English text of the agreed node, for EngStickler's reader. tools-drafts.before-agree-project.json keeps the drafts as they were before that script ran."],
  ["Rule 10.12 (s-pcnyfp7gev7syax) requires the tools that rewrite files to run first, and the list described in \"What the SpecSheriff tools read in the project's own guidelines\" names those tools.",
    "Rule 10.12 (s-pcnyfp7gev7syax) requires the tools that rewrite files to run first, and the list described in \"What the SpecSheriff tools read in the project's own guidelines\" names those tools. By the owner's ruling of 2026-11-21 on that node, if the SpecSheriff tools cannot run, the hook runs all the project's own tools in the bytewise order of their names."]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "state-project-d.mjs records in the continuation file that the node was shown to the owner.",
  "state-project-d.mjs records in the continuation file that the node was shown to the owner. agree-project.mjs records the owner's agreement to that node and writes english-project.md, its English text, for EngStickler's reader, and tools-drafts.before-agree-project.json is tools-drafts.json as it was before agree-project.mjs ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "## ● В работе:",
  "### ✓ «Что инструменты читают в собственных guidelines проекта» — согласован\n- перечень собственных инструментов, переписывающих файлы, — в project.json, как требует 10.12\n- без инструментов SpecSheriff hook запускает собственные инструменты проекта по порядку имён\n\n## ● В работе:");
o = swap(o, "- ● «Что инструменты читают в собственных guidelines проекта»: прошёл рецензента с третьего раза, показан вам",
  "- ✓ «Что инструменты читают в собственных guidelines проекта» — согласован\n- ● «Схема и расширение схемы проектом»: черновик пишется и пойдёт рецензенту");
o = swap(o, "## ◐ Ждёт вашего решения\n\n### ◐ «Что инструменты читают в собственных guidelines проекта» — новый узел\n- перечень инструментов, переписывающих файлы: в project.json, как требует 10.12\n- без инструментов SpecSheriff hook не прочтёт перечень и запустит всё по порядку имён\n\n", "");
fs.writeFileSync(outline, o);
console.log(`agreement recorded; INDEX stamped ${now}`);
