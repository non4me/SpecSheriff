// Applies EngStickler's thirty-fifth batch of corrections to the continuation file and INDEX.md.
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
  ["and specsheriff-rule-reviewer's second review found both ready once fix-archive-c.mjs had made the fixes it asked for.",
    "and specsheriff-rule-reviewer's second review found both ready to be shown to the owner once the fixes it asked for were made; fix-archive-c.mjs made them."],
  ["after which the archive holds more nodes with its location, kind and wording than the archive of the commit it follows, read as `sheriff reindex` would rewrite it.",
    "after which the archive holds more nodes with that node's location, kind and wording than the archive of the commit it follows holds, each archive being read in the form in which `sheriff reindex` would write it."],
  ["For a merge, the commit it follows is its first parent,", "For a merge, the commit it follows is that merge's first parent,"],
  ["  - no row of the main table of checks states the check that a node of the archive holds no sid.", "  - no row of the main table of checks includes a check that a node of the archive holds no sid."],
  ["the test of s-j4webte36gkraju that checks that a node in the archive is refused is to be rewritten;", "the test of s-j4webte36gkraju that checks that a node of the archive is refused is to be rewritten;"],
  ["is checked as an extension describes its kind, is to change with it;", "is checked as an extension describes its kind, is to be changed together with it;"],
  ["removes the sid of a node that an earlier release archived with one.\n- On 2026-11-21 the owner agreed to \"A removed node",
    "removes the sid of a node that an earlier release archived with a sid.\n- On 2026-11-21 the owner agreed to \"A removed node"]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-archive-c.mjs applies the findings of the reviewer's second report on both drafts,", "fix-archive-c.mjs applies to both drafts the findings of the reviewer's second report,");
s = swap(s, "tools-drafts.before-agree-archive-file.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-agree-archive-file.json is tools-drafts.json as it was before that script ran. fix-batch-35.mjs applies EngStickler's thirty-fifth batch of corrections to the continuation file and this index.");
fs.writeFileSync(index, s);
console.log(`updated at ${now}`);
