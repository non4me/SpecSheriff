// Records that the revised "Where the files are" passed the reviewer and was shown to the owner again, applies
// EngStickler's seventh batch of corrections to the continuation file, tasks.md and INDEX.md, and updates the outline.
import fs from "node:fs";

const edit = (rel, pairs) => {
  const url = new URL(rel, import.meta.url);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(url, s);
};

edit("../t25-one-thought.md", [
  ["The draft has been revised to carry them out, and specsheriff-rule-reviewer is checking it. Once the reviewer's findings are applied, the node is shown to the owner again.",
    "The draft has been revised to address them, and specsheriff-rule-reviewer passed it once its findings were applied. The revised node is now shown to the owner again, and the owner's answer is to be acted on first."],
  ["The reviewer's second report found the revised node ready after a few fixes,", "The reviewer's second report found the revised node ready once a few fixes were made,"],
  ["the node named the files of the extensions and of the other sections", "the node named the files of the extensions of the guidelines and of the other sections"],
  ["It also set the names that a domain may have,", "It also stated which names a domain may have,"],
  ["would duplicate the plugin's. ", "would duplicate the plugin's copy. "],
  ["The program `sheriff settings`, which the owner agreed to", "The command `sheriff settings`, which the owner agreed to"],
  ["The proposal no longer uses `specs/_status.jsonl`.", "The proposal for the node no longer names `specs/_status.jsonl`."],
  ["The owner remembered `sheriff.config.json` as being in the plugin's folder.", "The owner thought that `sheriff.config.json` was in the plugin's folder."],
  ["a point the owner marked as open to discussion", "a point that the owner considers still open to discussion"],
  ["- propose-tools-1-d.mjs revised the draft accordingly, and tools-drafts.before-tools-1-d.json keeps the draft as it was before. specsheriff-rule-reviewer is checking the revised draft. Once its findings are applied, the page is rebuilt and the node is shown to the owner again.",
    `- propose-tools-1-d.mjs revised the draft to address the owner's remarks, and tools-drafts.before-tools-1-d.json keeps the draft as it was before. specsheriff-rule-reviewer found the revised draft ready once a few fixes were made, and propose-tools-1-e.mjs applied them:
  - the paths in the second table are counted from the folder of the tools, the one that holds their \`dist/\`, as the code counts them;
  - a citation of "No copy of the SpecSheriff guidelines" replaces the closing sentence that repeated that node;
  - "The approvals" became "The approvals of nodes", and the row for the project's extension of the schema cites rule 5.2;
  - the reason now explains both tables;
  - the files of the technical appendix are restored as the approved wording and the code have them: a domain's section in \`<domain>.json\`, the stack in \`stack.json\`, the debt in \`debt.json\`, and, without the Domains extension, the section for the base specification in \`base.json\`. The agent's earlier wording, which allowed any other name for any other section, contradicted rule 4.1 and the check that matches a file of the technical appendix to its domain;
  - \`config.schema.json\` has a row of its own, since rule 5.1 limits the schema of the guidelines to the specification's nodes and files.
- The revised node was shown to the owner again on 2026-11-21, as the second version of the same page.`],
  ["- The schema of `sheriff.config.json`, `config.schema.json`, which sets the default value of the `strict` flag, is to be added to moved/specs/_schema/ before stage 3.",
    "- The schema of `sheriff.config.json`, `config.schema.json`, which sets the default value of the `strict` flag, is to be added to moved/specs/_schema/ before stage 3.\n- \"The settings a project shares\" (the draft \"new:tools-1-settings\") is to list the entries of the specification's approval status and of its `strict` flag among what `sheriff.config.json` holds."]
]);

edit("../tasks.md", [
  ["The appendix of the tools (tools/3, tools/11, tools/7.1.5, and the row for `specs/_approvals.jsonl` in \"Where the files are\", s-zefk589ykh37b8u, kept there until T28 by the owner's ruling of 2026-11-21) is rewritten first,",
    "The appendix of the tools (tools/3, tools/11, tools/7.1.5) is rewritten first, and the row for `specs/_approvals.jsonl` is removed from \"Where the files are\" (s-zefk589ykh37b8u), where the owner kept it until this task (2026-11-21);"]
]);

edit("../INDEX.md", [
  ["with estimates and working time |", "with estimates and the time spent |"],
  [". The page is published as the artifact 23mDBvMBBHcZBibh22RjxJ.", ". The page that shows the node is published as the artifact 23mDBvMBBHcZBibh22RjxJ."],
  ["propose-tools-1-d.mjs revises the proposal for \"Where the files are\" after the owner's three remarks: a second table for the files that the plugin carries, and the entries of the specification's approval status and of its `strict` flag kept in `sheriff.config.json`;",
    "propose-tools-1-d.mjs revises the proposal for \"Where the files are\" in response to the owner's three remarks, so that it has a second table for the files that the plugin carries and keeps the entries of the specification's approval status and of its `strict` flag in `sheriff.config.json`;"],
  ["gen-tools-node-page.mjs lays out a table of three columns as well as one of two.", "gen-tools-node-page.mjs lays out tables of either two or three columns."],
  ["names that row in the row of T28 in tasks.md, and applies EngStickler's corrections to the continuation file. |",
    "mentions that row in T28's row in tasks.md, and applies EngStickler's corrections to the continuation file. propose-tools-1-e.mjs applies the findings of the reviewer's third report on that proposal. state-tools-1-f.mjs records that the node was shown to the owner again and applies EngStickler's corrections to the continuation file, tasks.md and this index. |"]
]);

const outline = new URL("queue-outline.md", import.meta.url);
let o = fs.readFileSync(outline, "utf8");
const line = "- ● «Где лежат файлы»: переделан по вашим замечаниям, его проверяет рецензент";
if (!o.includes(line) || !o.includes("## ○ Затем:")) throw new Error("outline: not found");
o = o.replace(line, "- ● «Где лежат файлы»: новая редакция прошла рецензента и показана вам");
o = o.replace("## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Где лежат файлы» — новая редакция\n- вторая таблица: что несёт плагин — путь в папке инструментов и в репозитории SpecSheriff\n- статус и strict — в sheriff.config.json; файлы технического приложения — как в согласованной редакции\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log("continuation file, tasks.md, INDEX.md and outline updated");
