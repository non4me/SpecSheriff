// Records that the English of the agreed "Where the files are" was corrected and that the draft of "The settings common
// to a project" passed the reviewer's findings and was shown to the owner; applies EngStickler's ninth batch of
// corrections to the continuation file and INDEX.md; updates the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to, all] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = all ? s.split(from).join(to) : s.replace(from, to);
  }
  fs.writeFileSync(url, s);
};

edit("../t25-one-thought.md", [
  ["The next node is the new \"The settings a project shares\", which specsheriff-rule-reviewer is checking before it is shown to the owner.",
    "The next node is the new node \"The settings common to a project\", which is now shown to the owner. The owner's answer is to be acted on first."],
  ["ready provided a few fixes were made", "ready, provided that a few fixes were made", true],
  ["and the row for the project's extension of the schema cites rule 5.2;", "and the row for the project's extension of the schema now cites rule 5.2;"],
  ["as the approved wording and the code do:", "as the approved wording and the code name them:"],
  ["wrote english-tools-1.md, the English of the agreed node, for EngStickler's reader. The node is approved with `sheriff approve` in stage 3,",
    "wrote english-tools-1.md, the English text of the agreed node, for EngStickler's reader. The node is to be approved with `sheriff approve` in stage 3,"],
  ["\"The settings a project shares\"", "\"The settings common to a project\"", true],
  ["- The next node is the new \"The settings common to a project\" (the draft \"new:tools-1-settings\"). propose-settings-a.mjs added to it the entries that set the specification's approval status, its `strict` flag and the extensions that the project has chosen, each naming the owner who made it. specsheriff-rule-reviewer is checking the draft before it is shown to the owner.",
    `- EngStickler's reader then read the English text of the agreed node, and fix-tools-1-english.mjs corrected it without changing its meaning. The map and the export are each named with their directory, "common to every project" replaces "that every project shares", and the closing sentence and the reason are plainer. tools-drafts.before-settings-b.json keeps the drafts as they were before that script and propose-settings-b.mjs ran.
- The next node is the new node "The settings common to a project" (the draft "new:tools-1-settings"), first drafted as "The settings a project shares". propose-settings-a.mjs added the entries that set the specification's approval status and its \`strict\` flag, and those that record the chosen extensions, to that draft. specsheriff-rule-reviewer found the draft not ready, and propose-settings-b.mjs applied its findings:
  - the paragraph on where the tools look for SpecTags adds the files of types that \`sheriff types\` writes, which the approved node s-pvzms7d8kxb8dk2 has the tools read as the system's code, and says that a file that the patterns name both as code and as a test is read as a test, as config.ts does;
  - a new sentence says that the tools refuse a \`sheriff.config.json\` that is not JSON or does not conform to its schema, which the tests in config.test.ts check;
  - the list no longer repeats that each entry names the owner who made it, which rules 10.6 and 10.7 and row 10.1.27b already require;
  - the item on the test command says which tests the command runs, as "The hooks" does, and \`writesSpecSheriffGuidelines\` marks the repository where the guidelines are written, as the approved wording said;
  - the link to 9.1 (s-hheus6f395ynqvc) is an \`implements\` link, as in the approved "Where the files are".
- The agent decided, as a question of where a rule belongs, that other nodes state the form of an entry: how it names the owner, how the latest entry is found and how it names an extension. "How an approval is recorded" (s-v4qus7raqnwzneb) is to state it for the entries of the approval status and of the \`strict\` flag. The node of the appendix that implements 1.7.5 is to state it for the entries that record the chosen extensions.
- gen-tools-node-page.mjs now also builds the page of a new node, showing the approved wording and the tests of the node that the new node is carved from. The page tools-page-settings/index.html is published at https://claude.ai/artifact/5kBdVGiNrydJ2sAj2oBadx, and the draft was shown to the owner on 2026-11-21.`]
]);

edit("../INDEX.md", [
  ["the English of the agreed node, for EngStickler's reader.", "the English text of the agreed node, for EngStickler's reader."],
  ["propose-settings-a.mjs adds to the draft of \"The settings a project shares\" the entries that set the specification's approval status, its `strict` flag and the chosen extensions. |",
    "propose-settings-a.mjs adds the entries that set the specification's approval status and its `strict` flag, and those that record the chosen extensions, to the draft of \"The settings common to a project\". propose-settings-b.mjs applies the findings of specsheriff-rule-reviewer on that draft. fix-tools-1-english.mjs corrects the English text of the agreed \"Where the files are\" after EngStickler's reader read it. tools-drafts.before-settings-b.json is tools-drafts.json as it was before those two scripts ran. gen-tools-node-page.mjs also builds the page of a new node, into the directory given as its second argument. tools-page-settings/ holds the page of \"The settings common to a project\", published as the artifact 5kBdVGiNrydJ2sAj2oBadx. state-settings-b.mjs records that state in the continuation file. |"]
]);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const line = "- ● «Настройки, общие для проекта»: черновик проверяет рецензент";
if (!o.includes(line) || !o.includes("## ○ Затем:")) throw new Error("outline: not found");
o = o.replace(line, "- ● «Настройки, общие для проекта»: черновик прошёл рецензента и показан вам");
o = o.replace("## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Настройки, общие для проекта» — новый узел\n- что хранится в sheriff.config.json, среди прочего записи статуса, strict и выбора расширений\n- инструменты отвергают sheriff.config.json, который не соответствует своей схеме\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log("continuation file, INDEX.md and outline updated");
