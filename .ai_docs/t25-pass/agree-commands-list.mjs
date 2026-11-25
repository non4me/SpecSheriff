// Records the owner's agreement of 2026-11-21 («ок») to "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts), with
// the purpose of each command and the new names, and writes english-commands-list.md for EngStickler's reader. Applies
// EngStickler's forty-fourth batch of corrections to the continuation file, and updates INDEX.md and the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-commands-list.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["s-f5rz6b7dhxejjts"];
node.agreed = "2026-11-21";
node.rulings.push({ date: "2026-11-21", problem: "Whether the owner agrees to the node, which lists each command with what it is for, under the new names of four commands.", ruling: "The owner agreed to the node («ок»).", type: "textual" });
const p = node.proposal;
fs.writeFileSync(new URL("english-commands-list.md", here), [
  "# \"The commands that `sheriff` accepts\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["fix-commands-list-purpose.mjs did so, listing each command that runs a check separately,", "fix-commands-list-purpose.mjs did so, listing separately each command that runs a check,"],
  ["not a JSON Schema, that is, the schema in specs/_schema/; so the agent proposed `sheriff json`.", "not a JSON Schema (the schema in specs/_schema/). So the agent proposed `sheriff json`."],
  ["On 2026-11-21 the owner agreed («ок»): the commands are renamed `sheriff commit-message`, `sheriff json`, `sheriff markdown` and `sheriff map`. agree-command-names.mjs wrote the new names into the list node and recorded the ruling in its draft; tools-drafts.before-command-names.json keeps",
    "On 2026-11-21 the owner agreed («ок»): the commands are to be renamed `sheriff commit-message`, `sheriff json`, `sheriff markdown` and `sheriff map`. agree-command-names.mjs wrote the new names into the list node and recorded the ruling in its draft. tools-drafts.before-command-names.json keeps"],
  ["among them nodes 4, 5, 6 and 7.1.23 of tools.json; all of that is done in stage 3, and each node of tools.json is changed by a technical replacement when the review reaches it. The list node with the new names has now been shown to the owner again, and the owner's answer is to be acted on first.",
    "among them nodes 4, 5, 6 and 7.1.23 of tools.json. The code, the hooks, the skills and the tests are to be changed in stage 3, and each node of tools.json is to be changed by a technical replacement when the review reaches it.\n- On 2026-11-21 the owner agreed to the list node with the new names («ок»). agree-commands-list.mjs marked the draft as agreed, recorded the agreement in it, and wrote english-commands-list.md, the English text of the agreed node, for EngStickler's reader; tools-drafts.before-agree-commands-list.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/PHyr91rvcQUwzKSSqgzsEh shows the node. The next node, \"What `sheriff reindex` writes\", has now been shown to the owner, and the owner's answer is to be acted on first."]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and tools-drafts.before-command-names.json is tools-drafts.json as it was before that script ran.",
  "and tools-drafts.before-command-names.json is tools-drafts.json as it was before that script ran. agree-commands-list.mjs records the owner's agreement to the list node and writes english-commands-list.md, its English text, for EngStickler's reader; tools-drafts.before-agree-commands-list.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Команды, которые принимает sheriff» — согласован\n- у каждой команды — её назначение и узлы, которые её описывают\n\n## ● В работе:");
o = swap(o, "- ● «Команды»: «Команды, которые принимает sheriff» — с назначением каждой команды и новыми именами; показан вам снова",
  "- ✓ «Команды, которые принимает sheriff» — согласован\n- ● «Что пишет sheriff reindex»: прошёл рецензента, показан вам");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
