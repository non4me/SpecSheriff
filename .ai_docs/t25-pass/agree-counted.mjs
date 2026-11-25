// Records the owner's agreement of 2026-11-22 («ок») to "Duplicate sids, terms and names of RecordTypes"
// (s-vke5hakwf3uyrjs) and writes english-counted.md for EngStickler's reader. The node "Term nodes outside the
// contracts section" (s-yauyedny2yzvs4c) is shown next. Applies EngStickler's sixty-fifth batch of corrections to the
// continuation file. Every file is written only after every change has been prepared.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const a = drafts["s-vke5hakwf3uyrjs"];
a.agreed = "2026-11-22";
a.rulings = [{ date: "2026-11-22", problem: "Whether the owner agrees to the new wording of the node on duplicate sids, terms and names of RecordTypes.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const p = a.proposal;
const english = ["# \"Duplicate sids, terms and names of RecordTypes\", a node of the appendix of the tools, agreed on 2026-11-22", "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", "## Example", "", p.examples[0].en, ""].join("\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["Its check of term nodes outside the contracts section moved to a new node,", "The check of term nodes outside the contracts section moved from that node to a new node,"],
  ["Of the nodes in the cells of a `TableRule`, it covers only their sids,", "For the nodes in the cells of a `TableRule`, it covers only their sids,"],
  ["It no longer checks locations for repetition:", "It no longer checks locations for duplicates:"],
  ["It has an example that the reviewer proposed. It is being shown to the owner now.",
    "It has an example that specsheriff-rule-reviewer proposed. On 2026-11-22 the owner agreed to the node («ок»). agree-counted.mjs marked its draft as agreed and wrote english-counted.md for EngStickler's reader; tools-drafts.before-agree-counted.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/9wuAjDP58HiA9RDdq7DmWb shows the node."],
  ["It carries a todo: the owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain, yet rule 1.7.2 lets no extension contradict rules 3.2 and 10.1.6 of the SpecSheriff guidelines, so those two rules are to be reworded first, a question to put to the owner when they are next revised. It is to be shown to the owner after the first node.",
    "It has a todo. The owner decided on 2026-11-12 that a term needed by only one domain is defined in that domain. Rules 3.2 and 10.1.6 of the SpecSheriff guidelines place every term node in the contracts section, and rule 1.7.2 lets no extension contradict them, so those two rules must be reworded before that decision can be carried out; the agent is to put this to the owner when the review reaches those rules. The second node is being shown to the owner now."],
  ["Node 8.6 of the SpecSheriff guidelines allows a term in a cell,", "Node 8.6 of the SpecSheriff guidelines allows a term node in a cell,"],
  ["In stage 3 the code is to stop counting the sids in the archive, to stop checking locations for repetition,", "In stage 3 the code of this check is to stop counting the sids in the archive, to stop checking locations for duplicates,"]
]) t = swap(t, from, to);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-counted-c.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-counted-c.json is a copy of tools-drafts.json made before that script ran). agree-counted.mjs records the owner's agreement to \"Duplicate sids, terms and names of RecordTypes\" and writes english-counted.md (tools-drafts.before-agree-counted.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Повторяющиеся sid, термины и имена RecordType» — согласован\n- только узлы спецификации; ячейки — только по sid; файл и расположение в отказе\n\n## ● В работе:");
o = swap(o, "- ● «Повторяющиеся sid, термины и имена RecordType» (строки 10.1.3, 10.1.7, 12.12.1): показан вам\n- ○ «Узлы-термины вне раздела контрактов» (строка 10.1.6)",
  "- ✓ «Повторяющиеся sid, термины и имена RecordType» (строки 10.1.3, 10.1.7, 12.12.1) — согласован\n- ● «Узлы-термины вне раздела контрактов» (строка 10.1.6): показан вам");
o = swap(o, "### ◐ Согласие с узлом о повторяющихся sid, терминах и именах\n- что отвергается и что называет отказ", "### ◐ Согласие с узлом об узлах-терминах вне раздела контрактов\n- узел-термин вне specs/contracts/ отвергается");

fs.writeFileSync(new URL("tools-drafts.before-agree-counted.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-counted.md", here), english);
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
const b = drafts["new:tools-7-1-term-contracts"].proposal;
console.log(b.ruText + "\nREASON: " + b.ruReason + "\nTODO: " + b.todos[0].text + `\n\nupdated at ${now}`);
