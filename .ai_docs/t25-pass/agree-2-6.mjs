// Carries out the owner's agreement of 2026-11-21 («ок») to the new wording of rule 2.6, "The archive"
// (s-f2b5zvc565s242f): an archived node may name its replacement, and nothing keeps that replacement current. Writes the
// wording into the draft in newform.json, which stays agreed, changes the comment of `archived` in the staged schema of
// the archive, and writes english-2-6.md for EngStickler's reader. Applies EngStickler's thirty-second batch of
// corrections to the continuation file, and updates INDEX.md and the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) s = swap(s, from, to);
  fs.writeFileSync(url, s);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const nfUrl = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfUrl, "utf8"));
fs.writeFileSync(new URL("newform.before-2-6-replacement.json", here), JSON.stringify(nf, null, 2) + "\n");
const n = nf["2.6"];
n.text = swap(n.text, "Such a node goes there together with the reason for its removal and the sid of the node that replaces it, if one does. An archived node has no sid of its own.\n\nAn archived node names as its replacement only a node of the specification. When that replacement is removed from the specification in turn, each archived node that names it then names the replacement's own replacement instead, or none if the replacement has none.\n\n",
  "Such a node goes there together with the reason for its removal. It may also name, by its sid, the node that replaces it. An archived node has no sid of its own.\n\n");
n.ruText = swap(n.ruText, "Такой узел попадает туда вместе с причиной удаления и sid узла, который его заменяет, если такой есть. У архивного узла нет собственного sid.\n\nАрхивный узел называет своей заменой только узел спецификации. Когда из спецификации удаляется и эта замена, каждый архивный узел, который её называет, называет вместо неё её собственную замену, а если у неё замены нет — не называет никакой.\n\n",
  "Такой узел попадает туда вместе с причиной удаления. Он может также назвать по sid узел, который его заменяет. У архивного узла нет собственного sid.\n\n");
n.reason = swap(n.reason, "For that reason, an archived node has no sid by which anything could name it. For the same reason, it names as its replacement only a node of the specification. A sid kept in the archive could also come back into the specification in a copy of its node, and would then name two nodes.",
  "For that reason, an archived node has no sid by which anything could name it. A sid kept in the archive could also come back into the specification in a copy of its node, and would then name two nodes. The sid of a replacement shows a reader where the rule went at the time of its removal.");
n.ruReason = swap(n.ruReason, "Из-за этого у архивного узла нет sid, по которому что-либо могло бы его назвать. По той же причине он называет своей заменой только узел спецификации. К тому же sid, оставленный в архиве, мог бы вернуться в спецификацию в копии своего узла и тогда называл бы два узла.",
  "Из-за этого у архивного узла нет sid, по которому что-либо могло бы его назвать. К тому же sid, оставленный в архиве, мог бы вернуться в спецификацию в копии своего узла и тогда называл бы два узла. sid замены показывает читателю, куда перешло правило на момент удаления.");
n.changes.push("21 ноября вы решили, что требование к замене не нужно («я бы вообще убрал это требование или сделал не обязательным - не вижу в нем особого профита»), и согласились с новой редакцией («ок»): архивный узел может назвать замену по sid; второй абзац, который требовал, чтобы замена была узлом спецификации и передавалась дальше, убран; в обосновании убрано «По той же причине он называет своей заменой только узел спецификации» и добавлено «sid замены показывает читателю, куда перешло правило на момент удаления». Строка 10.1.11 не меняется.");
fs.writeFileSync(nfUrl, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(new URL("english-2-6.md", here), [
  "# Rule 2.6 \"The archive\" of the SpecSheriff guidelines, as the owner agreed to it again on 2026-11-21", "",
  "## Title", "", n.title, "", "## Text", "", n.text, "", "## Reason", "", n.reason, ""
].join("\n"));

edit("moved/specs/_schema/archive-file.schema.json", [
  ["When and why the node was removed, and the sid of the node that replaces it, if one does. The replacement is a node of the specification, never one of the archive; validate checks that it exists.",
    "When and why the node was removed, and, where the entry names one, the sid of the node that replaced it at the time of the removal (s-f2b5zvc565s242f). Nothing keeps that sid current."]
]);

edit("../t25-one-thought.md", [
  ["whether row 10.1.11 of the main table of checks should require that a node of the archive name as its replacement only a node of the specification.",
    "whether row 10.1.11 of the main table of checks should require that a node of the archive name only a node of the specification as its replacement."],
  ["The agent has now proposed to the owner a new wording of rule 2.6 (s-f2b5zvc565s242f), in which an archived node may name its replacement and nothing keeps that replacement current. The owner's answer is to be acted on first.",
    "On the same day the owner agreed («ок») to the new wording of rule 2.6 (s-f2b5zvc565s242f) that the agent proposed: an archived node may name its replacement, and nothing updates the reference to that replacement. Row 10.1.11 stays as agreed. The agent is now rewriting the draft of \"A removed node and the archive\" as two nodes, which specsheriff-rule-reviewer reviews before they are shown to the owner."],
  ["the validation of a file of the archive against its schema, and carrying a replacement forward.", "the validation of a file of the archive against its schema, and passing a replacement on."],
  ["  - Having only `sheriff reindex` carry a replacement forward does not hold every participant to rule 2.6,", "  - Having only `sheriff reindex` pass a replacement on does not hold every participant to rule 2.6,"],
  ["also require that a node of the archive name as its replacement only a node of the specification,", "also require that a node of the archive name only a node of the specification as its replacement,"],
  ["that a commit adds to the archive exactly those of the nodes it removes that must go there.", "that a commit adds to the archive exactly the nodes it removes that must be archived."],
  ["  - the second paragraph, which kept the replacement a node of the specification and carried it forward, is removed;",
    "  - the second paragraph, which ensured that the replacement stayed a node of the specification and passed it on, is removed;"],
  ["  - the reason loses \"For the same reason, it names as its replacement only a node of the specification.\" and gains \"The sid of a replacement shows a reader where the rule went at the time of its removal.\"",
    "  - the reason drops \"For the same reason, it names as its replacement only a node of the specification.\" and adds \"The sid of a replacement shows a reader where the rule went at the time of its removal.\""],
  ["Nothing carries a replacement forward, and `archive-file.schema.json` loses the comment saying that `sheriff validate` checks that the replacement exists.",
    `Nothing passes a replacement on, and \`archive-file.schema.json\` drops the comment saying that \`sheriff validate\` checks that the replacement exists.
- On 2026-11-21 the owner agreed to that proposal («ок»). agree-2-6.mjs wrote the new wording into the draft of 2.6 in newform.json, which stays agreed, and changed the comment of \`archived\` in moved/specs/_schema/archive-file.schema.json. It also wrote english-2-6.md for EngStickler's reader. newform.before-2-6-replacement.json keeps the drafts as they were before that script ran, and build-moved.mjs then rebuilt the staged files.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and the agent's proposal for rule 2.6 that follows from it.",
  "and the agent's proposal for rule 2.6 that follows from it. agree-2-6.mjs writes the wording of rule 2.6 that the owner agreed to into newform.json and english-2-6.md, and changes the comment of `archived` in the staged schema of the archive; newform.before-2-6-replacement.json is newform.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
const waiting = o.match(/## ◐ Ждёт вашего решения\n\n### ◐ Правило 2\.6: замена в архиве — необязательна\n[\s\S]*?\n\n(?=## ○ Затем:)/);
if (!waiting) throw new Error("outline: the waiting branch not found");
o = swap(o, waiting[0], "");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ Правило 2.6 «Архив»: замена необязательна — согласовано\n- архивный узел может назвать замену; цепочку замен никто не поддерживает\n- строка 10.1.11 остаётся как была\n\n## ● В работе:");
o = swap(o, "- ● «Удалённый узел и архив»: рецензент советует разделить узел на три и проверять замену в архиве",
  "- ● «Удалённый узел и архив»: делится на два узла — проверка при удалении и проверка файла архива; черновики пойдут рецензенту");
fs.writeFileSync(outline, o);
console.log(n.text + "\n\n" + n.reason + `\n\nupdated at ${now}`);
