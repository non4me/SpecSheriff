// Applies the corrections that EngStickler's reader found in the English of the agreed node "A removed node and the
// archive" (s-j4webte36gkraju), none of which changes its meaning: "the commit it follows" becomes "the parent of the
// commit", and several references are made unambiguous. Keeps the Russian rendering in step and rewrites
// english-archive.md. "The closest mistake" is kept, as the guidelines name that column of rule 7.2.4 so.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-archive-english.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const node = drafts["s-j4webte36gkraju"];
const p = node.proposal;
const set = (start, en, ru) => {
  const x = p.parts.find((y) => y.en.startsWith(start));
  if (!x) throw new Error(`no part starts with: ${start}`);
  x.en = en;
  x.ru = ru;
};
set("`sheriff validate` checks that a commit adds",
  "`sheriff validate` checks that a commit adds to the archive (§s-f2b5zvc565s242f) exactly the nodes that it removes from the specification and that must be archived (§s-qb79dcw694x2h63). It checks only the nodes of the files that the repository keeps.",
  "`sheriff validate` проверяет, что коммит добавляет в архив (§s-f2b5zvc565s242f) ровно те узлы, которые он удаляет из спецификации и которые должны попасть в архив (§s-qb79dcw694x2h63). Он проверяет только узлы файлов, которые хранит репозиторий.");
set("A node is removed by a commit",
  "A node is removed by a commit if the parent of the commit holds a node with its sid, and that sid is gone from the specification after the commit. For a merge commit, the parent is its first parent. A removed node must be archived where both of the following hold:",
  "Узел удалён коммитом, если в родительском коммите есть узел с его sid, а после коммита этого sid в спецификации нет. Для коммита слияния родитель — его первый родитель. Удалённый узел должен попасть в архив, если выполнено и то и другое:");
set("its approval status is set by approvals",
  "its approval status is set by approvals, unlike a section's, which is derived from the nodes under it (§s-9kfdycuq34beqvs).",
  "его статус одобрения задаётся одобрениями, в отличие от статуса раздела, который выводится из узлов под ним (§s-9kfdycuq34beqvs).");
set("`sheriff validate` finds the approvals",
  "`sheriff validate` looks up the approvals of a removed node by the sid that the node has in the parent of the removing commit.",
  "Одобрения удалённого узла `sheriff validate` ищет по sid, который у узла в родительском коммите удаляющего коммита.");
set("A node of the archive is added by the commit",
  "A node of the archive is added by a commit in which the archive after the commit holds more nodes with that node's location (§s-kag2m9tzdnduxdx), kind and wording (§s-5ah25f6gy99panq) than the archive of the commit's parent. `sheriff validate` reads the parent's archive in the form to which `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts). For a node in a cell of a `TableRule`, the wording compared is the node's own wording.",
  "Узел архива добавлен коммитом, если узлов с его расположением (§s-kag2m9tzdnduxdx), типом и формулировкой (§s-5ah25f6gy99panq) в архиве после коммита больше, чем в архиве родительского коммита. Архив родительского коммита `sheriff validate` читает в том виде, в какой его переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts). Для узла в ячейке `TableRule` сравнивается собственная формулировка узла.");
set("The entry of a removed node",
  "The entry of a removed node is a node that the commit adds to the archive with the location, the kind and the wording that the removed node had in the commit's parent. `sheriff validate` accepts the commit only if all of the following hold:",
  "Запись удалённого узла — это узел, который коммит добавляет в архив с тем же расположением, тем же типом и той же формулировкой, какие были у удалённого узла в родительском коммите. `sheriff validate` принимает коммит, только если выполнено всё следующее:");
set("the `archived` field of each such entry",
  "the `archived` field of each such entry gives the date of the removal and the reason for it;",
  "поле `archived` каждой такой записи указывает дату удаления и его причину;");
set("When `sheriff validate` refuses a commit",
  "When `sheriff validate` refuses a commit, it names the sid of each removed node that the refusal concerns, and the file and the location of each node of the archive that it concerns.",
  "Отвергая коммит, `sheriff validate` называет sid каждого удалённого узла, которого касается отказ, а также файл и расположение каждого узла архива, которого он касается.");
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.reason = p.reason.replace("An archived node has no sid, so its entry can be checked only in the commit that removes the node.",
  "An archived node has no sid, so the entry of a removed node can be checked only in the commit that removes the node.");
p.ruReason = p.ruReason.replace("поэтому его запись можно проверить только в коммите, который удаляет узел.", "поэтому запись удалённого узла можно проверить только в коммите, который удаляет узел.");
const ex = p.examples[0];
ex.en = ex.en.replace("A commit removes the approved rule `base/3.2` and the section `base/5`, left empty. It adds to `specs/_archive/base.json` a `TextRule` with the location `base/3.2` and the rule's wording, whose `archived` field gives the date and the reason.",
  "A commit removes the approved rule `base/3.2` and the empty section `base/5`. It adds to `specs/_archive/base.json` a `TextRule` that has the location `base/3.2` and the rule's wording, and whose `archived` field gives the date and the reason.");
ex.ru = ex.ru.replace("Коммит удаляет одобренное правило `base/3.2` и опустевший раздел `base/5`.", "Коммит удаляет одобренное правило `base/3.2` и пустой раздел `base/5`.");
node.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-archive-english.mjs; \"the files that the repository keeps\", \"holds\" and \"The closest mistake\" kept, since the agreed nodes and rule 7.2.4 use them";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-archive.md", here), [
  "# \"A removed node and the archive\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, "", "## Example", "", ex.en, ""
].join("\n"));

const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace("fix-batch-35.mjs applies EngStickler's thirty-fifth batch", "fix-archive-english.mjs corrects the English of \"A removed node and the archive\" as EngStickler's reader proposed, and tools-drafts.before-archive-english.json is tools-drafts.json as it was before that script ran. fix-batch-35.mjs applies EngStickler's thirty-fifth batch");
fs.writeFileSync(index, s);
console.log(p.text);
