// Records the owner's agreement of 2026-11-21 («ок») to the revised "Where the files are" (s-zefk589ykh37b8u), writes
// english-tools-1.md, the English of the agreed node, for EngStickler's reader, applies the corrections that the agent
// accepted from EngStickler's eighth batch, and updates the continuation file and the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${rel}: not found: ${from.slice(0, 80)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(url, s);
};

const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const draft = drafts["s-zefk589ykh37b8u"];
if (!draft.proposal.reviewed.includes("third report")) throw new Error("unexpected state");
draft.agreed = "2026-11-21";
draft.rulings.push({ date: "2026-11-21", problem: "Whether the owner agrees to the revised wording of the node.", ruling: "The owner agreed to it («ок»)." });
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");

const p = draft.proposal;
fs.writeFileSync(new URL("english-tools-1.md", here), [
  "# \"Where the files are\" (s-zefk589ykh37b8u), the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));

edit("../t25-one-thought.md", [
  ["The first node under review is \"Where the files are\" (s-zefk589ykh37b8u). Its proposed new wording, described in the paragraph \"The first node of the appendix under review\" below, was shown to the owner, who made three remarks on it. The draft has been revised to address them, and specsheriff-rule-reviewer passed it once its findings were applied. The revised node is now shown to the owner again, and the owner's answer is to be acted on first.",
    "The owner agreed on 2026-11-21 to the first node under review, \"Where the files are\" (s-zefk589ykh37b8u), as the paragraph \"The first node of the appendix under review\" below describes. The next node is the new \"The settings a project shares\", which specsheriff-rule-reviewer is checking before it is shown to the owner."],
  ["The reviewer's second report found the revised node ready once a few fixes were made,", "The reviewer's second report found the revised node ready provided a few fixes were made,"],
  ["After that script ran, the node named the files of the extensions", "After that script ran, the node listed the files of the extensions"],
  ["no longer held the paragraph about a part divided into files,", "no longer held the paragraph about a part of the specification divided into files,"],
  ["and tools-drafts.before-tools-1-d.json keeps the draft as it was before. specsheriff-rule-reviewer found the revised draft ready once a few fixes were made,",
    "and tools-drafts.before-tools-1-d.json keeps the draft as it was before that script ran. specsheriff-rule-reviewer found the revised draft ready provided a few fixes were made,"],
  ["- the paths in the second table are counted from the folder of the tools, the one that holds their `dist/`, as the code counts them;",
    "- the paths in the second table are given relative to the folder of the tools, the one that holds their `dist/`, as the code resolves them;"],
  ["- \"The approvals\" became \"The approvals of nodes\",", "- the row \"The approvals\" was renamed \"The approvals of nodes\","],
  ["- the reason now explains both tables;", "- the node's reason now covers both tables;"],
  ["- the files of the technical appendix are restored as the approved wording and the code have them: a domain's section in `<domain>.json`, the stack in `stack.json`, the debt in `debt.json`,",
    "- the node again names the files of the technical appendix as the approved wording and the code do: a domain's section in `<domain>.json`, the stack in `stack.json`, the technical debt in `debt.json`,"],
  ["- The revised node was shown to the owner again on 2026-11-21, as the second version of the same page.",
    "- The revised node was shown to the owner again on 2026-11-21, in the second version of the same page, and the owner agreed to it («ок»). agree-tools-1.mjs marked the draft as agreed and wrote english-tools-1.md, the English of the agreed node, for EngStickler's reader. The node is approved with `sheriff approve` in stage 3, when the drafts are moved into the files under `specs/`.\n- The next node is the new \"The settings a project shares\" (the draft \"new:tools-1-settings\"). propose-settings-a.mjs added to it the entries that set the specification's approval status, its `strict` flag and the extensions that the project has chosen, each naming the owner who made it. specsheriff-rule-reviewer is checking the draft before it is shown to the owner."],
  ["\n- \"The settings a project shares\" (the draft \"new:tools-1-settings\") is to list the entries of the specification's approval status and of its `strict` flag among what `sheriff.config.json` holds.", ""]
]);

edit("../tasks.md", [["where the owner kept it until this task (2026-11-21);", "where the owner agreed to keep it until this task (2026-11-21);"]]);

edit("../INDEX.md", [
  ["so that it has a second table for the files that the plugin carries and keeps the entries of the specification's approval status and of its `strict` flag in `sheriff.config.json`;",
    "so that the node has a second table for the files that the plugin carries and places in `sheriff.config.json` the entries that set the specification's approval status and its `strict` flag;"],
  ["to keep the row for `specs/_approvals.jsonl` until T28,", "to keep the row for `specs/_approvals.jsonl` until T28 removes it,"],
  ["propose-tools-1-e.mjs applies the findings of the reviewer's third report on that proposal.",
    "propose-tools-1-e.mjs applies the findings of the third report of specsheriff-rule-reviewer on the proposal for \"Where the files are\"."],
  ["state-tools-1-f.mjs records that the node was shown to the owner again", "state-tools-1-f.mjs records that \"Where the files are\" was shown to the owner again"],
  ["and this index. |", "and this index. agree-tools-1.mjs records the owner's agreement to \"Where the files are\" and writes english-tools-1.md, the English of the agreed node, for EngStickler's reader. propose-settings-a.mjs adds to the draft of \"The settings a project shares\" the entries that set the specification's approval status, its `strict` flag and the chosen extensions. |"]
]);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const oswap = (from, to) => {
  if (!o.includes(from)) throw new Error("outline: not found: " + from.slice(0, 80));
  o = o.replace(from, to);
};
oswap("- строка о specs/_approvals.jsonl остаётся до T28\n",
  "- строка о specs/_approvals.jsonl остаётся до T28\n\n### ✓ «Где лежат файлы» — согласован\n- две таблицы: файлы проекта и файлы, которые несёт плагин\n- статус спецификации, strict и выбранные расширения — в sheriff.config.json\n");
oswap("- ● «Где лежат файлы»: новая редакция прошла рецензента и показана вам", "- ✓ «Где лежат файлы» — согласован");
oswap("- ○ два новых узла после него: настройки проекта и что инструменты читают в project.json",
  "- ● «Настройки, общие для проекта»: черновик проверяет рецензент\n- ○ «Что инструменты читают в project.json»");
oswap("## ◐ Ждёт вашего решения\n\n### ◐ «Где лежат файлы» — новая редакция\n- вторая таблица: что несёт плагин — путь в папке инструментов и в репозитории SpecSheriff\n- статус и strict — в sheriff.config.json; файлы технического приложения — как в согласованной редакции\n\n", "");
fs.writeFileSync(outline, o);
console.log("agreed; english-tools-1.md written; notes and outline updated");
