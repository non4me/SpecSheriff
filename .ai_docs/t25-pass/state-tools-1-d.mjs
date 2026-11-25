// Records the owner's three remarks on the proposed wording of "Where the files are" and the question put to the owner,
// applies EngStickler's fifth batch of corrections to the continuation file, and updates the queue outline.
import fs from "node:fs";

const url = new URL("../t25-one-thought.md", import.meta.url);
let s = fs.readFileSync(url, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from.slice(0, 80));
  s = s.replace(from, to);
};

swap("has been shown to the owner, whose answer is to be dealt with first.",
  "was shown to the owner. The owner answered with three remarks, and the agent then asked the owner whether the node keeps the row for `specs/_approvals.jsonl` until T28. The owner's answer to that question is to be dealt with first.");

swap("The node now holds only the table that says where each file is kept, with the documentation as a row of the table.",
  "The node now holds only the table that says where each file is kept, and the documentation is one of its rows.");
swap("each of them is sent to the reviewer and then to the owner, one at a time.",
  "each of them will be sent to the reviewer and then to the owner, one at a time.");

swap("and propose-tools-1-c.mjs applied them: the names of the files of the extensions and of the other sections of the technical appendix, the archive as every JSON file in `specs/_archive/`, each named after the part of the specification its nodes were removed from, the names a domain may take, the paragraph on a part divided into files cut, and the node's links rebuilt from its text. The agent decided on its own that",
  "and propose-tools-1-c.mjs applied them: it named the files of the extensions and of the other sections of the technical appendix, defined the archive as every JSON file in `specs/_archive/`, each file named after the part of the specification that its nodes were removed from, set the names that a domain itself may be given, cut the paragraph on a part divided into files, and rebuilt the node's links from its text. The agent decided without asking the owner that");

swap("and the node was shown to the owner on 2026-11-21. The owner's answer is awaited.",
  `and the node was shown to the owner on 2026-11-21.
- The owner answered with three remarks (2026-11-21):
  - The schema of the SpecSheriff guidelines is kept in the plugin's folder, whose location differs from one installation to another. Only the repository where the schema is written keeps it in \`specs/_schema/\`. A copy of it in any other project would duplicate the plugin's. The table gave the paths under \`specs/\` as if every project kept these files, and only its last paragraph said otherwise. So the node is to get a second table for what the plugin carries: each file's path relative to the folder of the SpecSheriff tools in the plugin, and its path in the repository where the SpecSheriff guidelines are written.
  - The entries that set the specification's approval status and its \`strict\` flag are kept in \`sheriff.config.json\`, as the chosen extensions are. The program \`sheriff settings\`, agreed on 2026-11-18, shows and changes all three. \`specs/_status.jsonl\` is dropped. The schema of \`sheriff.config.json\`, \`config.schema.json\`, sets the default value of the \`strict\` flag in place of \`status.schema.json\`. The owner recalled the file as being in the plugin's folder. The agent told the owner that \`sheriff.config.json\` stays at the root of the repository, as agreed for the extensions on 2026-11-18, since the plugin's folder is outside git.
  - Under T28, a node's approval is to be kept in the node itself, a point the owner marked as open to discussion. The agent recommended that this node keep the row for \`specs/_approvals.jsonl\` until T28, which then removes it, and asked the owner whether to do so.
- Once the owner answers, the agent revises the draft, sends it to specsheriff-rule-reviewer and shows the node to the owner again.`);

swap("they are to say that it is read from the entries in `specs/_status.jsonl`.",
  "they are to say that it is read from the entries in `sheriff.config.json`.");
swap("- The schema of the entries in `specs/_status.jsonl`, `status.schema.json`, which sets the default value of the `strict` flag, is to be added to moved/specs/_schema/ before stage 3.",
  "- The schema of `sheriff.config.json`, `config.schema.json`, which sets the default value of the `strict` flag, is to be added to moved/specs/_schema/ before stage 3.");
swap("The proposal shows these choices, which the agent made on its own: the entries of the specification's approval status and of its `strict` flag are kept in `specs/_status.jsonl`; the bindings file",
  "The proposal shows these choices, which the agent made on its own: the bindings file");
swap("is kept in `specs/tech/base.json`.",
  "is kept in `specs/tech/base.json`. The agent had also chosen `specs/_status.jsonl` for the entries of the specification's approval status and of its `strict` flag; the owner moved them to `sheriff.config.json` on 2026-11-21.");
fs.writeFileSync(url, s);

const outlineUrl = new URL("queue-outline.md", import.meta.url);
let o = fs.readFileSync(outlineUrl, "utf8");
const oswap = (from, to) => {
  if (!o.includes(from)) throw new Error("outline: not found: " + from.slice(0, 80));
  o = o.replace(from, to);
};
oswap("- запуск sheriff в терминале и установка плагина для pytest описаны только в руководстве\n",
  "- запуск sheriff в терминале и установка плагина для pytest описаны только в руководстве\n\n### ✓ «Где лежат файлы»: ваши замечания\n- схема guidelines — в папке плагина; в specs/_schema/ она лежит только в репозитории SpecSheriff\n- статус спецификации и флаг strict — в sheriff.config.json, рядом с выбранными расширениями\n");
oswap("- ● «Где лежат файлы»: новая формулировка прошла рецензента и показана вам",
  "- ● «Где лежат файлы»: переделываю по вашим замечаниям, затем рецензент и снова вам");
oswap("### ◐ «Где лежат файлы» — новая формулировка\n- таблица «что хранится — где», без инструкций и без повторов других узлов\n- перечни содержимого sheriff.config.json и project.json — в двух новых узлах",
  "### ◐ Строка о specs/_approvals.jsonl — оставить до T28?\n- T28 перенесёт одобрения в сами узлы и уберёт эту строку\n- рекомендую оставить: T25 одобрения не меняет");
fs.writeFileSync(outlineUrl, o);
console.log("continuation file and outline updated");
