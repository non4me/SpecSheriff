// Records that the revised wording of "Where the files are" passed the reviewer and was shown to the owner on
// its page, and updates the queue outline to match.
import fs from "node:fs";

const url = new URL("../t25-one-thought.md", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const from = "- The reviewer is re-checking the revised node. Once it passes, the page tools-page/index.html is published and the node is shown to the owner.";
if (!s.includes(from)) throw new Error("paragraph not found");
s = s.replace(from, `- The reviewer's second report found the revised node ready after a few fixes, and propose-tools-1-c.mjs applied them: the names of the files of the extensions and of the other sections of the technical appendix, the archive as every JSON file in \`specs/_archive/\`, each named after the part of the specification its nodes were removed from, the names a domain may take, the paragraph on a part divided into files cut, and the node's links rebuilt from its text. The agent decided on its own that \`tools.json\` stays in \`specs/_guidelines/\`: rule 2.1 settles what the appendix of the tools is, not the directory its file is kept in.
- The page of the node is published at https://claude.ai/artifact/23mDBvMBBHcZBibh22RjxJ from tools-page/index.html, and the node was shown to the owner on 2026-11-21. The owner's answer is awaited.`);
s = s.replace('Its proposed new wording, described in the paragraph "The first node of the appendix under review" below, is shown to the owner once the findings of specsheriff-rule-reviewer are applied.',
  'Its proposed new wording, described in the paragraph "The first node of the appendix under review" below, has been shown to the owner, whose answer is to be dealt with first.');
fs.writeFileSync(url, s);

const outlineUrl = new URL("queue-outline.md", import.meta.url);
let o = fs.readFileSync(outlineUrl, "utf8");
const line = "- ● «Где лежат файлы»: новая формулировка — один узел с таблицей «что хранится — где»; её проверяет рецензент";
if (!o.includes(line)) throw new Error("outline line not found");
o = o.replace(line, "- ● «Где лежат файлы»: новая формулировка прошла рецензента и показана вам\n- ○ два новых узла после него: настройки проекта и что инструменты читают в project.json");
o = o.replace("## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Где лежат файлы» — новая формулировка\n- таблица «что хранится — где», без инструкций и без повторов других узлов\n- перечни содержимого sheriff.config.json и project.json — в двух новых узлах\n\n## ○ Затем:");
fs.writeFileSync(outlineUrl, o);
console.log("continuation file and outline updated");
