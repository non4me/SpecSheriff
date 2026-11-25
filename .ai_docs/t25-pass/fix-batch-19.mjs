// Applies EngStickler's nineteenth batch of corrections to the continuation file and INDEX.md. The same reader's remark on
// "titles and arranges its own rules freely" also concerns the reason of the draft "new:tools-1-project"; that draft is
// corrected together with the findings of its second review, which is still running.
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

edit("../INDEX.md", [
  ["show-staged.mjs prints nodes of the staged new form by sid or location.",
    "show-staged.mjs prints the nodes of the new form of the guidelines, built in the staging folder moved/, that have the sids or locations given to it."]
]);
edit("../t25-one-thought.md", [
  ["The agent chose that", "The agent decided that", true],
  ["a format that allows no comments is given by glob patterns;", "a format that allows no comments is specified by glob patterns;"],
  ["except for the rule on fixtures, whose rules are read together;",
    "except for a rule that refines the rule on fixtures: the tools read all the rules that refine that rule together;"],
  ["- the item on the rule that approves the specification is removed, since the approval status is now kept in `sheriff.config.json`;",
    "- the item on the rule of `project.json` whose status set the specification's approval status is removed, since that status is now kept in `sheriff.config.json`;"],
  ["- the reason now says what the node solves: a project titles and arranges its own rules freely,",
    "- the reason now says what problem the node solves: a project gives its own rules any titles and arranges them as it likes,"],
  ["propose-project-b.mjs also made the agreed \"Where the files are\" cite the Domains extension by its section (s-tdm3rwsppnuh6dm) instead of its rule on decomposition (s-h6h25ctd3yryudh).",
    "propose-project-b.mjs also made the agreed node \"Where the files are\" cite the section of the Domains extension (s-tdm3rwsppnuh6dm) instead of the extension's rule on decomposition (s-h6h25ctd3yryudh)."],
  ["specsheriff-rule-reviewer is reviewing the rewritten draft before it is shown to the owner.\n",
    "specsheriff-rule-reviewer is reviewing the rewritten draft of the third node before that node is shown to the owner.\n"]
]);
console.log("batch 19 applied");
