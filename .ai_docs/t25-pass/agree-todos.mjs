// Records the owner's agreement of 2026-11-22 («ок») to "The list of the todos" (`sheriff todos`), and writes
// english-todos.md for EngStickler's reader. Updates the continuation file, INDEX.md and the outline: the node on
// `sheriff guide` is shown next, with the question whether it prints the appendix of the tools.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-todos.json", here), JSON.stringify(drafts, null, 2) + "\n");
const node = drafts["new:tools-2-todos"];
node.agreed = "2026-11-22";
node.rulings = [...(node.rulings ?? []), { date: "2026-11-22", problem: "Whether the owner agrees to the node on the list of the todos that `sheriff todos` prints.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const p = node.proposal;
fs.writeFileSync(new URL("english-todos.md", here), [
  "# \"The list of the todos\", a new node of the appendix of the tools, agreed on 2026-11-22", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "The node on `sheriff todos`, \"The list of the todos\", has now been shown to the owner, and the owner's answer is to be acted on first.",
  "On the same day the owner agreed to the wording of the node on `sheriff todos`, \"The list of the todos\" («ок»). agree-todos.mjs marked that node's draft as agreed and wrote english-todos.md for EngStickler's reader; tools-drafts.before-agree-todos.json is a copy of the drafts made before that script ran. The page at https://claude.ai/artifact/2gKYPpx8SQw6p65zcDwjUa shows the node. The node on `sheriff guide` has now been shown to the owner, with the question whether `sheriff guide` prints the appendix of the tools after the guidelines. The owner's answer is to be acted on first.");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-json.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-json.json is a copy of tools-drafts.json made before that script ran). agree-todos.mjs does the same for the node on `sheriff todos` and writes english-todos.md (tools-drafts.before-agree-todos.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Перечень todo» (sheriff todos) — согласован\n- только todo из файлов, которые хранит репозиторий; порядок внутри дня задан явно\n\n## ● В работе:");
o = swap(o, "- ● «Перечень todo» (sheriff todos): показан вам\n- ○ «Guidelines, напечатанные в одном месте» (sheriff guide)",
  "- ✓ «Перечень todo» (sheriff todos) — согласован\n- ● «Guidelines, напечатанные в одном месте» (sheriff guide): показан вам, с вопросом об описании инструментов");
o = swap(o, "### ◐ Согласие с узлом «Перечень todo»\n- что печатает sheriff todos и в каком порядке", "### ◐ Печатать ли описание инструментов в sheriff guide\n- после guidelines, под заголовком, что оно в них не входит");
o = swap(o, "- sheriff guide: печатать ли описание инструментов после guidelines\n", "");
fs.writeFileSync(outline, o);
const g = drafts["new:tools-2-guide"].proposal;
console.log(g.ruTitle + "\n" + g.ruText + "\n" + g.ruReason + `\n\nupdated at ${now}`);
