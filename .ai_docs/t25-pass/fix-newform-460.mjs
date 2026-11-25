// Node 10.11: the wording checker's findings and EngStickler's readers' findings on the wording of fix-newform-459.mjs.
// The title and the list name which tools run; "regardless of what" and "only if" replace "whatever" and "only where";
// "the most specific to the most general"; "the files in the commit". The temporary key "10.11~" is removed.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-460.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["10.11"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].split(from).join(to);
};
swap("en", "Title: The order of the tools and the checks on a commit and on a push", "Title: The order in which tools and checks run on a commit and on a push");
swap("en", "On a commit and on a push, the tools and the checks run in three steps:", "On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in three steps:");
swap("en", "Each step runs whatever the earlier steps found. The commit or the push goes through only where every check and every tool passes.", "Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check and every tool passes.");
swap("en", "The order goes from the particular to the general.", "The order goes from the most specific to the most general.");
swap("en", "the project's own guard still holds,", "the project's own tools still guard the commit,");
swap("en", "the formatter rewrites the files of the commit first,", "the formatter rewrites the files in the commit first,");
swap("ru", "Заголовок: Порядок инструментов и проверок при коммите и при push", "Заголовок: В каком порядке запускаются инструменты и проверки при коммите и при push");
swap("ru", "При коммите и при push инструменты и проверки запускаются в три шага:", "При коммите и при push собственные инструменты проекта, инструменты SpecSheriff и проверки запускаются в три шага:");
swap("ru", "собственная защита проекта всё равно действует,", "собственные инструменты проекта всё равно защищают коммит,");
delete d["10.11~"];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
