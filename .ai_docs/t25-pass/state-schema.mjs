// Records in the continuation file, INDEX.md and the queue outline that the draft of "The schema and a project's
// extension" (s-xzcw3hv4hmxz7h7) is written and is with specsheriff-rule-reviewer.
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

edit("../t25-one-thought.md", [
  ["\nFollow-ups from the reviewer's report, each to be taken up when its node's turn comes:",
    `- The fourth node is "The schema and a project's extension" (s-xzcw3hv4hmxz7h7, tools 7.1.2). propose-schema.mjs drafted its new wording, under the new title "The schema and its extensions", and fix-schema-page-data.mjs added what the page tools-page-schema/index.html needs: the Russian rendering of the approved wording and the list of what the draft removes. The draft does the following:
  - it composes the schema from the schema of the SpecSheriff guidelines, then the schema of each extension of the guidelines that the project has chosen, then the project's own extension of the schema;
  - it has a file of the archive validated against \`archive-file.schema.json\`;
  - it lets an extension of the schema add types of link and definitions, and has the tools refuse an extension that adds a name that the schema already holds;
  - it holds a node in a cell and a node of the archive to the conditions of its kind;
  - it implements row 10.1.2 of the main table of checks rather than the whole table, as the agent decided for every check of the appendix.
- In stage 3, \`sheriff validate\` is to stop validating the files against a schema composed without the project's extension once it has refused that extension, as \`sheriff binding\` and \`sheriff reindex\` already do. tools-drafts.before-schema.json keeps the drafts as they were before propose-schema.mjs ran. specsheriff-rule-reviewer is reviewing the draft.

Follow-ups from the reviewer's report, each to be taken up when its node's turn comes:`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and tools-drafts.before-project-english.json is tools-drafts.json as it was before that script ran.",
  "and tools-drafts.before-project-english.json is tools-drafts.json as it was before that script ran. propose-schema.mjs drafts the new wording of \"The schema and a project's extension\" (s-xzcw3hv4hmxz7h7), and tools-drafts.before-schema.json is tools-drafts.json as it was before that script ran. fix-schema-page-data.mjs adds to that draft the Russian rendering of the approved wording and the list of what the draft removes, and tools-page-schema/ holds the page showing the draft. state-schema.mjs records in the continuation file that the draft is with the reviewer.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Схема и расширение схемы проектом»: черновик пишется и пойдёт рецензенту",
  "- ● «Схема и расширение проекта» → «Схема и её расширения»: черновик у рецензента");
fs.writeFileSync(outline, o);
console.log(`continuation file, INDEX.md and outline updated at ${now}`);
