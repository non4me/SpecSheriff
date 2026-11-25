// Records the owner's agreement of 2026-11-21 («ок») to "Keys written twice", with the example and with the merge in the
// project's extension of the schema, and writes english-reindex-twice.md for EngStickler's reader. Updates the
// continuation file, INDEX.md and the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-reindex-twice.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["new:tools-2-reindex-twice"];
node.agreed = "2026-11-21";
node.rulings = [{
  date: "2026-11-21",
  problem: "Whether the merge of keys written twice also covers the project's extension of the schema, `specs/_schema/project.schema.json`, which is written by hand and which row 10.1.1 covers.",
  ruling: "The owner agreed to the node with the example that specsheriff-rule-reviewer proposed, and with the merge covering the project's extension of the schema («ок»).",
  type: "textual"
}];
delete node.doubt;
const p = node.proposal;
fs.writeFileSync(new URL("english-reindex-twice.md", here), [
  "# \"Keys written twice\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", "## Example", "", p.examples[0].en, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The node has now been shown to the owner, and the owner's answer is to be acted on first. After it, the agent drafts the second group:",
  "On 2026-11-21 the owner agreed to it («ок»), with the example and with the merge in the project's extension of the schema. agree-reindex-twice.mjs marked its draft as agreed and wrote english-reindex-twice.md for EngStickler's reader; tools-drafts.before-agree-reindex-twice.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/2rLyUA1gCdqNXRdXS9j8rz shows the node. The first group is thus agreed, and the agent is drafting the second group:");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "tools-drafts.before-agree-reindex-earlier.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-agree-reindex-earlier.json is tools-drafts.json as it was before that script ran. agree-reindex-twice.mjs records the owner's agreement to \"Keys written twice\" and writes english-reindex-twice.md for EngStickler's reader; tools-drafts.before-agree-reindex-twice.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Ключи, записанные дважды» — согласован\n- слияние и в расширении схемы проекта; пример с refs и title\n\n## ● В работе:");
o = swap(o, "- ● «Ключи, записанные дважды»: показан вам, с предложением объединять ключи и в расширении схемы проекта\n- ○ вторая группа: sheriff types, json, todos, guide, settings и untagged",
  "- ✓ «Ключи, записанные дважды» — согласован; первая группа «Команд» согласована целиком\n- ● вторая группа: пишутся черновики sheriff types, json, todos, guide, settings и untagged");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
