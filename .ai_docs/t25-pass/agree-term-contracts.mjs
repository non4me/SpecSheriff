// Records the owner's agreement of 2026-11-22 («ок») to "Term nodes outside the contracts section"
// (s-yauyedny2yzvs4c) and writes english-term-contracts.md for EngStickler's reader. The review moves on to
// "Locations computed anew" (s-stxmhq3hgfndvn6), row 10.1.5. Every file is written only after every change is prepared.
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
const b = drafts["new:tools-7-1-term-contracts"];
b.agreed = "2026-11-22";
b.rulings = [{ date: "2026-11-22", problem: "Whether the owner agrees to the new node on term nodes outside the contracts section, with its todo.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const p = b.proposal;
const english = ["# \"Term nodes outside the contracts section\", a new node of the appendix of the tools, agreed on 2026-11-22", "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", "## Todo", "", p.todos[0].text, ""].join("\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The second node is being shown to the owner now.",
  "On 2026-11-22 the owner agreed to the second node («ок»). agree-term-contracts.mjs marked its draft as agreed and wrote english-term-contracts.md for EngStickler's reader; tools-drafts.before-agree-term-contracts.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/F8UFZC8ybeccaR7qV4BeN4 shows the node.");
const tail = "  fix-counted-b.mjs also corrected the English of the agreed node \"A key written more than once in one object\" as EngStickler's reader proposed, without changing its meaning.";
t = swap(t, tail, tail + "\n- The next node to be reviewed is \"Locations computed anew\" (s-stxmhq3hgfndvn6), item 9 of the order in stage2-inventory.md, which implements row 10.1.5. It touches open problem P2 of the inventory: which locations the check computes, including those of a domain's header, of the files of contracts and of a node in a cell of a `TableRule`. On 2026-11-22, items 1 to 8 of the 63 in that order had been reviewed: 11 of the 62 nodes of the appendix of the tools and 15 new nodes had been agreed, and 51 nodes of the appendix remained, in items 9 to 63, some of which also call for new nodes.");

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-counted.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-counted.json is a copy of tools-drafts.json made before that script ran). agree-term-contracts.mjs records the owner's agreement to \"Term nodes outside the contracts section\" and writes english-term-contracts.md (tools-drafts.before-agree-term-contracts.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Узлы-термины вне раздела контрактов» — согласован\n- узел-термин вне specs/contracts/ отвергается; todo о терминах домена\n\n## ● В работе:");
o = swap(o, "- ● «Узлы-термины вне раздела контрактов» (строка 10.1.6): показан вам",
  "- ✓ «Узлы-термины вне раздела контрактов» (строка 10.1.6) — согласован\n- ● «Расположения, вычисленные заново» (строка 10.1.5): следующий, пункт 9 из 63\n- ○ ещё 51 узел описания инструментов в пунктах 9–63, и новые узлы при них");
o = swap(o, "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Согласие с узлом об узлах-терминах вне раздела контрактов\n- узел-термин вне specs/contracts/ отвергается", "");

fs.writeFileSync(new URL("tools-drafts.before-agree-term-contracts.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-term-contracts.md", here), english);
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
