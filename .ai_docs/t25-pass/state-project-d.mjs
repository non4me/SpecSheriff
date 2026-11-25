// Records that the draft of "What the SpecSheriff tools read in the project's own guidelines" passed its third review
// and is shown to the owner together with the reviewer's doubt; updates INDEX.md and the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(url, s);
};

edit("../t25-one-thought.md", [
  ["specsheriff-rule-reviewer found its first draft not ready, and it is now reviewing the rewritten draft before the node is shown to the owner.",
    "specsheriff-rule-reviewer passed its draft on the third review, and the node is now shown to the owner, together with the reviewer's doubt about where the list of the project's own tools that rewrite files is kept. The owner's answer is to be acted on first."],
  ["specsheriff-rule-reviewer is reviewing the draft a third time before the node is shown to the owner.\n",
    `The third review passed the draft once propose-project-d.mjs had applied its fixes:
  - the closing paragraph is now a list, and it covers only the items that find a rule by its \`refines\` link;
  - the item on the project's own checks and generators no longer restates rules 10.8 and 10.9;
  - the item on kinds cites only rule 8.3, and the item on \`exempts\` links names the nodes of \`project.json\`;
  - a member of the list of tools that rewrite files is the tool's path relative to \`.githooks/\`.
- The third review left a doubt for the owner. On 2026-11-05 the owner ruled, in "The project's own tools in a git hook" (s-n4m5zvh96yb299p), that a project registers its own tools for a hook in a way that the hook reads without the SpecSheriff tools. A list in \`project.json\` cannot be read that way, yet the agreed rule 10.12 says that the project's own guidelines list the tools that rewrite files. The agent recommends keeping the list in \`project.json\`, as rule 10.12 says. Where the SpecSheriff tools cannot run, the hook would then run all the project's own tools in the byte order of their names, as it does now. No check of the SpecSheriff guidelines runs in that case anyway.
- tools-drafts.before-project-d.json keeps the drafts as they were before propose-project-d.mjs ran. The page tools-page-project/index.html is published at https://claude.ai/artifact/6AnwnKnofPY9RXcmijJfPN, and the node was shown to the owner on 2026-11-21.
`]
]);

edit("../INDEX.md", [
  ["fix-batch-22.mjs applies the corrections", "propose-project-d.mjs applies the fixes of the third review of that draft, and tools-drafts.before-project-d.json is tools-drafts.json as it was before that script ran. tools-page-project/ holds the page showing that node, published as the artifact 6AnwnKnofPY9RXcmijJfPN. state-project-d.mjs records in the continuation file that the node was shown to the owner. fix-batch-22.mjs applies the corrections"]
]);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const line = "- ● «Что инструменты читают в собственных guidelines проекта»: черновик переписан по замечаниям рецензента, рецензент проверяет его снова";
if (!o.includes(line) || !o.includes("## ○ Затем:")) throw new Error("outline: not found");
o = o.replace(line, "- ● «Что инструменты читают в собственных guidelines проекта»: прошёл рецензента с третьего раза, показан вам");
o = o.replace("## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Что инструменты читают в собственных guidelines проекта» — новый узел\n- перечень инструментов, переписывающих файлы: в project.json, как требует 10.12\n- без инструментов SpecSheriff hook не прочтёт перечень и запустит всё по порядку имён\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log("continuation file, INDEX.md and outline updated");
