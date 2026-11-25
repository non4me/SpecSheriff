// Records in the continuation file and INDEX.md that the draft of "What the SpecSheriff tools read in the project's own
// guidelines" was rewritten after the first review and is being reviewed again, and adds the follow-ups that review
// found. Updates the queue outline.
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
  ["- gen-tools-node-page.mjs now also builds the page of a new node,",
    `- The third node is the new node "What the SpecSheriff tools read in the project's own guidelines" (the draft "new:tools-1-project"). specsheriff-rule-reviewer found its first draft not ready, and propose-project-b.mjs rewrote it:
  - every rule that the tools read is found by its \`refines\` link, as in the approved wording and in model.ts;
  - the list now also covers the project's own kinds of node, the rules listing the project's own checks and generators, and \`exempts\` links;
  - each item says what a member of its list holds. The agent chose that a member of the list of the project's own tools that rewrite files is the name of a file under \`.githooks/<hook>.d/\` (s-n4m5zvh96yb299p), and that a format that allows no comments is given by glob patterns;
  - a new paragraph says that the tools read no value where no rule refines a rule of the list. The agent chose that \`sheriff validate\` refuses a second rule refining the same rule, except for the rule on fixtures, whose rules are read together;
  - the item on the rule that approves the specification is removed, since the approval status is now kept in \`sheriff.config.json\`;
  - the reason now says what the node solves: a project titles and arranges its own rules freely, so the tools find each value by the place or the \`refines\` link of the rule that sets it.
- propose-project-b.mjs also made the agreed "Where the files are" cite the Domains extension by its section (s-tdm3rwsppnuh6dm) instead of its rule on decomposition (s-h6h25ctd3yryudh). This replacement changes no meaning, and the agent reports it to the owner. tools-drafts.before-project-b.json keeps the drafts as they were before that script ran. specsheriff-rule-reviewer is reviewing the rewritten draft before it is shown to the owner.
- gen-tools-node-page.mjs now also builds the page of a new node,`],
  ["- The nodes s-j9r8z4xdrfkfs47, s-v4qus7raqnwzneb and s-7unxytshhc4md54 still say that the specification's approval status is read from a rule in `project.json`;",
    "- The nodes s-f5rz6b7dhxejjts, s-j9r8z4xdrfkfs47, s-v4qus7raqnwzneb and s-7unxytshhc4md54 still say that the specification's approval status is read from a rule in `project.json`, and binding.ts, push-mode.ts, reindex.ts and generated.ts still read that rule;"],
  ["The next node is the new node \"What the SpecSheriff tools read in the project's own guidelines\", which specsheriff-rule-reviewer is checking before it is shown to the owner.",
    "The next node is the new node \"What the SpecSheriff tools read in the project's own guidelines\". specsheriff-rule-reviewer found its first draft not ready, and it is now reviewing the rewritten draft before the node is shown to the owner."]
]);

edit("../INDEX.md", [
  ["fix-batch-16.mjs applies the corrections that the agent accepted from the sixteenth batch to the continuation file and this index.",
    "fix-batch-16.mjs applies the corrections that the agent accepted from the sixteenth batch to the continuation file and this index. repair-drafts-json.mjs repairs tools-drafts.json, into which fix-batch-14.mjs had written unescaped quotes. show-staged.mjs prints nodes of the staged new form by sid or location. propose-project-b.mjs rewrites the draft of \"What the SpecSheriff tools read in the project's own guidelines\" after the first review found it not ready, and tools-drafts.before-project-b.json is tools-drafts.json as it was before that script ran. state-project-b.mjs records that rewrite in the continuation file."]
]);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const line = "- ● «Что инструменты читают в project.json»: черновик проверяет рецензент";
if (!o.includes(line)) throw new Error("outline: not found");
o = o.replace(line, "- ● «Что инструменты читают в собственных guidelines проекта»: черновик переписан по замечаниям рецензента, рецензент проверяет его снова");
fs.writeFileSync(outline, o);
console.log("continuation file, INDEX.md and outline updated");
