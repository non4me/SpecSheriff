// Node 7.3.1 states the owner's ruling of 2026-11-15 on titles: a title is a short name for what the node is about,
// not a statement of the rule, and it relies on the node's section for the subject that the section names. The
// node's own title becomes such a name. The change only carries out the ruling, so the node goes to the owner as a
// proposal, without the reviewer; the owner's earlier agreement covered the earlier wording only.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-356.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.3.1"];
if (!n) throw new Error("no draft 7.3.1");
n.title = "The title";
n.ruTitle = "Заголовок";
n.text = "A node's title is a short name for what the node is about, such as \"Guaranteed fields\". The rule itself is stated by the text. The title names only what sets the node apart within its section, since the reader sees the node inside that section.";
n.ruText = "Заголовок узла — краткое имя того, о чём узел, например «Гарантированные поля». Само правило излагает текст. Заголовок называет только то, что отличает узел внутри его раздела, поскольку читатель видит узел внутри этого раздела.";
n.reason = "The reader sees a title first, often in a tree or in a list beside the other titles of its section, and decides from it what to open. A title that stated the rule would repeat the main thought that the text opens with.";
n.ruReason = "Читатель видит заголовок первым, часто в дереве или в списке рядом с другими заголовками своего раздела, и по нему решает, что открыть. Заголовок, который излагал бы правило, повторял бы главную мысль, с которой начинается текст.";
n.changes = [
  ...n.changes,
  "По вашему решению от 15 ноября: заголовок — краткое имя того, о чём узел, а не формулировка правила; раздел уже задаёт тему, поэтому заголовок называет только то, что отличает узел внутри раздела. Прежний текст говорил о читателе, «который больше ничего не видит», и спорил с этим решением. Заголовок самого узла сокращён до «The title» по тому же решению.",
];
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
