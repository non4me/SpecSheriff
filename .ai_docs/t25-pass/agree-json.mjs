// Records the owner's agreement of 2026-11-22 («ок») to "The model of the specification" (`sheriff json`), and writes
// english-json.md for EngStickler's reader. Updates the continuation file, INDEX.md and the outline: the node on
// `sheriff todos` is shown next.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-json.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["new:tools-2-json"];
node.agreed = "2026-11-22";
node.rulings = [...(node.rulings ?? []), { date: "2026-11-22", problem: "Whether the owner agrees to the node on the model of the specification that `sheriff json` prints.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const p = node.proposal;
fs.writeFileSync(new URL("english-json.md", here), [
  "# \"The model of the specification\", a new node of the appendix of the tools, agreed on 2026-11-22", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "Meanwhile the nodes that passed are shown to the owner one at a time, starting with the node on `sheriff json`.",
  "Meanwhile the nodes that passed are shown to the owner one at a time, starting with the node on `sheriff json`.\n- On 2026-11-22 the owner agreed to the wording of the node on `sheriff json`, \"The model of the specification\" («ок»). agree-json.mjs marked that node's draft as agreed and wrote english-json.md for EngStickler's reader; tools-drafts.before-agree-json.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/LnW1yMbBAouWzFGEmjdHMf shows the node. The node on `sheriff todos`, \"The list of the todos\", has now been shown to the owner, and the owner's answer is to be acted on first.");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-commands-b3.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-commands-b3.json is a copy of tools-drafts.json made before that script ran). agree-json.mjs records the owner's agreement to the node on `sheriff json` and writes english-json.md for EngStickler's reader (tools-drafts.before-agree-json.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Модель спецификации» (sheriff json) — согласован\n- узлы из репозитория и из плагина, узлы в ячейках, статус спецификации и флаг strict\n\n## ● В работе:");
o = swap(o, "- ● «Модель спецификации» (sheriff json): показан вам\n- ○ «Перечень todo» (sheriff todos), «Guidelines, напечатанные в одном месте» (sheriff guide)",
  "- ✓ «Модель спецификации» (sheriff json) — согласован\n- ● «Перечень todo» (sheriff todos): показан вам\n- ○ «Guidelines, напечатанные в одном месте» (sheriff guide)");
o = swap(o, "### ◐ Согласие с узлом «Модель спецификации»\n- что входит в модель, которую печатает sheriff json", "### ◐ Согласие с узлом «Перечень todo»\n- что печатает sheriff todos и в каком порядке");
fs.writeFileSync(outline, o);
const d = drafts["new:tools-2-todos"].proposal;
console.log(d.title + "\n" + d.text + "\nREASON: " + d.reason + "\nRU: " + d.ruText + "\n" + d.ruReason + `\n\nupdated at ${now}`);
