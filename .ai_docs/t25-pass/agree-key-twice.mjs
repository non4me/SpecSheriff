// Records the owner's agreement of 2026-11-22 («ок») to "A key written more than once in one object"
// (s-7zqsstgnuc772ba) and writes english-key-twice.md for EngStickler's reader. The review moves on to "Sids,
// locations, terms and names of RecordTypes, counted" (s-vke5hakwf3uyrjs). Every file is written only after every
// change has been prepared.
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
const node = drafts["s-7zqsstgnuc772ba"];
node.agreed = "2026-11-22";
node.rulings = [{ date: "2026-11-22", problem: "Whether the owner agrees to the new wording of the node on row 10.1.1, with the reviewer's answers to its three doubts.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const p = node.proposal;
const english = ["# \"A key written more than once in one object\", a node of the appendix of the tools, agreed on 2026-11-22", "", "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""].join("\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The node will be shown to the owner now, and whatever the owner answers is to be acted on before the review continues.",
  "On 2026-11-22 the owner agreed to the node («ок»). agree-key-twice.mjs marked its draft as agreed and wrote english-key-twice.md for EngStickler's reader; tools-drafts.before-agree-key-twice.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/Q7rthcSx1twBDBAQmiVkJS shows the node.\n- The next node to review is \"Sids, locations, terms and names of RecordTypes, counted\" (s-vke5hakwf3uyrjs), which implements rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1. The agent reads it, its rows and its code, drafts its new wording, and sends the draft to specsheriff-rule-reviewer before the node is shown to the owner.");

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-key-twice-b.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-key-twice-b.json is a copy of tools-drafts.json made before that script ran). agree-key-twice.mjs records the owner's agreement to that node and writes english-key-twice.md (tools-drafts.before-agree-key-twice.json is a copy of tools-drafts.json made before that script ran).");

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1) — согласован\n- подсказка о sheriff reindex; файлы спецификации, архива и схемы\n\n## ● В работе:");
o = swap(o, "- ● «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1): показан вам",
  "- ✓ «Ключ, записанный больше одного раза в одном объекте» (строка 10.1.1) — согласован\n- ● «Sid, расположения, термины и имена RecordType, пересчитанные» (строки 10.1.3, 10.1.6, 10.1.7, 12.12.1): агент читает узел");
o = swap(o, "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Согласие с узлом о строке 10.1.1\n- что отвергает sheriff validate, какие файлы читает, подсказка о sheriff reindex", "");

fs.writeFileSync(new URL("tools-drafts.before-agree-key-twice.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-key-twice.md", here), english);
fs.writeFileSync(cont, t);
fs.writeFileSync(index, s);
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
