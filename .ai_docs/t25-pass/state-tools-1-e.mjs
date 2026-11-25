// Records the owner's ruling on the row for `specs/_approvals.jsonl`, the revision of "Where the files are" and its
// review, applies EngStickler's sixth batch of corrections to the continuation file and updates the queue outline.
import fs from "node:fs";

const url = new URL("../t25-one-thought.md", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from.slice(0, 80));
  s = s.replace(from, to);
};

swap("was shown to the owner. The owner answered with three remarks, and the agent then asked the owner whether the node keeps the row for `specs/_approvals.jsonl` until T28. The owner's answer to that question is to be dealt with first.",
  "was shown to the owner, who made three remarks on it. The draft has been revised to carry them out, and specsheriff-rule-reviewer is checking it. Once the reviewer's findings are applied, the node is shown to the owner again.");

swap("and propose-tools-1-c.mjs applied them: it named the files of the extensions and of the other sections of the technical appendix, defined the archive as every JSON file in `specs/_archive/`, each file named after the part of the specification that its nodes were removed from, set the names that a domain itself may be given, cut the paragraph on a part divided into files, and rebuilt the node's links from its text.",
  "and propose-tools-1-c.mjs applied them. After that script ran, the node named the files of the extensions and of the other sections of the technical appendix, and defined the archive as every JSON file in `specs/_archive/`, each file named after the part of the specification that its nodes were removed from. It also set the names that a domain may have, no longer held the paragraph about a part divided into files, and had its links rebuilt from its text.");

const start = s.indexOf("- The page of the node is published at https://claude.ai/artifact/23mDBvMBBHcZBibh22RjxJ");
const endMark = "- Once the owner answers, the agent revises the draft, sends it to specsheriff-rule-reviewer and shows the node to the owner again.";
const end = s.indexOf(endMark);
if (start < 0 || end < 0) throw new Error("state paragraph not found");
s = s.slice(0, start) + `- The page that shows the node is published at https://claude.ai/artifact/23mDBvMBBHcZBibh22RjxJ from tools-page/index.html, and the node was shown to the owner on 2026-11-21.
- The owner answered with three remarks on 2026-11-21, and the agent accepted two of them:
  - The schema of the SpecSheriff guidelines is kept in the plugin's folder, whose location differs from one installation to another. Only the repository where the schema is written keeps it in \`specs/_schema/\`, and a copy of it in any other project would duplicate the plugin's. The node's table gave the paths under \`specs/\` as if every project kept these files, and only the node's last paragraph said otherwise. So "Where the files are" now has a second table for the files that the plugin carries. It gives each file's path relative to the folder of the SpecSheriff tools in the plugin, and its path in the repository where the SpecSheriff guidelines are written.
  - The entries that set the specification's approval status and its \`strict\` flag are kept in \`sheriff.config.json\`, as the chosen extensions are. The program \`sheriff settings\`, which the owner agreed to on 2026-11-18, shows and changes the approval status, the \`strict\` flag and the chosen extensions. The proposal no longer uses \`specs/_status.jsonl\`. The schema of \`sheriff.config.json\`, \`config.schema.json\`, sets the default value of the \`strict\` flag, which \`status.schema.json\` was to set. The owner remembered \`sheriff.config.json\` as being in the plugin's folder. The agent told the owner that the file stays at the root of the repository, as agreed for the extensions on 2026-11-18, since the plugin's folder is outside git.
- In task T28, a node's approval is to be kept in the node itself, a point the owner marked as open to discussion. The agent recommended that "Where the files are" keep the row for \`specs/_approvals.jsonl\` until T28, which then removes the row. The owner agreed on 2026-11-21 («ок пока оставь»), and the row of T28 in tasks.md now names this node.
- propose-tools-1-d.mjs revised the draft accordingly, and tools-drafts.before-tools-1-d.json keeps the draft as it was before. specsheriff-rule-reviewer is checking the revised draft. Once its findings are applied, the page is rebuilt and the node is shown to the owner again.` + s.slice(end + endMark.length);
fs.writeFileSync(url, s);

const tasksUrl = new URL("../tasks.md", import.meta.url);
let t = fs.readFileSync(tasksUrl, "utf8");
const tFrom = "The appendix of the tools (tools/3, tools/11, tools/7.1.5) is rewritten first,";
if (!t.includes(tFrom)) throw new Error("T28 row not found");
t = t.replace(tFrom, "The appendix of the tools (tools/3, tools/11, tools/7.1.5, and the row for `specs/_approvals.jsonl` in \"Where the files are\", s-zefk589ykh37b8u, kept there until T28 by the owner's ruling of 2026-11-21) is rewritten first,");
fs.writeFileSync(tasksUrl, t);

const outlineUrl = new URL("queue-outline.md", import.meta.url);
let o = fs.readFileSync(outlineUrl, "utf8");
const oswap = (from, to) => {
  if (!o.includes(from)) throw new Error("outline: not found: " + from.slice(0, 80));
  o = o.replace(from, to);
};
oswap("- статус спецификации и флаг strict — в sheriff.config.json, рядом с выбранными расширениями\n",
  "- статус спецификации и флаг strict — в sheriff.config.json, рядом с выбранными расширениями\n- строка о specs/_approvals.jsonl остаётся до T28\n");
oswap("- ● «Где лежат файлы»: переделываю по вашим замечаниям, затем рецензент и снова вам",
  "- ● «Где лежат файлы»: переделан по вашим замечаниям, его проверяет рецензент");
oswap("### ◐ Строка о specs/_approvals.jsonl — оставить до T28?\n- T28 перенесёт одобрения в сами узлы и уберёт эту строку\n- рекомендую оставить: T25 одобрения не меняет\n\n", "");
fs.writeFileSync(outlineUrl, o);
console.log("continuation file, tasks.md and outline updated");
