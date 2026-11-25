// Applies the second review of the two drafts split from "A removed node and the archive": a node of the archive counts
// as added by counting the nodes with its location, kind and wording, read from the archive of the commit that the
// commit follows as `sheriff reindex` would rewrite it; the second node drops `sheriff binding`, which reads nothing
// from the archive, and its schema requires only a location, a kind, the `archived` field and the absence of a sid, of
// nodes under it and of links pointing at it. Applies the English corrections that EngStickler's reader found in rule
// 2.6, without a change of meaning, and records the owner's decision of 2026-11-21 in 2.6's decisions. Applies
// EngStickler's thirty-third batch of corrections to the continuation file and INDEX.md, and updates the outline.
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
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};

// Rule 2.6: the English that EngStickler's reader read, and the decision of 2026-11-21.
const nfUrl = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfUrl, "utf8"));
const r = nf["2.6"];
r.text = swap(r.text, "Such a node goes there together with the reason for its removal.", "Such a node is placed there together with the reason for its removal.");
r.text = swap(r.text, "is deleted outright, whatever cites it.", "is deleted outright, regardless of what cites it.");
r.reason = swap(r.reason, "The sid of a replacement shows a reader where the rule went at the time of its removal.", "The sid of a replacement shows a reader which node replaced the rule at the time of its removal.");
r.ruReason = swap(r.ruReason, "sid замены показывает читателю, куда перешло правило на момент удаления.", "sid замены показывает читателю, какой узел заменил правило на момент его удаления.");
r.changes.push("После согласования чтец EngStickler прочитал английский; поправлено без изменения смысла: «is placed there», «regardless of what cites it», «which node replaced the rule».");
fs.writeFileSync(nfUrl, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(new URL("english-2-6.md", here), [
  "# Rule 2.6 \"The archive\" of the SpecSheriff guidelines, as the owner agreed to it again on 2026-11-21", "",
  "## Title", "", r.title, "", "## Text", "", r.text, "", "## Reason", "", r.reason, ""
].join("\n"));
const decUrl = new URL("decisions-out-5.json", here);
const dec = JSON.parse(fs.readFileSync(decUrl, "utf8"));
dec["2.6"] = [...(dec["2.6"] || []), {
  date: "2026-11-21",
  problem: "The rule required an archived node to name as its replacement only a node of the specification, and each archived node naming a replacement to name the replacement's own replacement once that was removed in turn. No check could hold every participant to it, since the git hooks do not run `sheriff reindex`, which was to pass the replacement on.",
  ruling: "The owner: that requirement is dropped («я бы вообще убрал это требование или сделал не обязательным - не вижу в нем особого профита»). An archived node may name, by its sid, the node that replaces it, and nothing keeps that sid current. Row 10.1.11 of the main table of checks stays as agreed.",
  type: "textual"
}];
fs.writeFileSync(decUrl, JSON.stringify(dec, null, 2) + "\n");

// The drafts.
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-archive-c.json", here), JSON.stringify(drafts, null, 2) + "\n");

const removalParts = [
  { kind: "p",
    en: "`sheriff validate` checks that a commit adds to the archive (§s-f2b5zvc565s242f) exactly the nodes it removes from the specification that must be archived (§s-qb79dcw694x2h63). It checks only the nodes of the files that the repository keeps.",
    ru: "`sheriff validate` проверяет, что коммит добавляет в архив (§s-f2b5zvc565s242f) ровно те удаляемые им из спецификации узлы, которые должны попасть в архив (§s-qb79dcw694x2h63). Он проверяет только узлы файлов, которые хранит репозиторий.",
    change: "Было: «`sheriff validate` ищет в одобрениях каждый sid, который коммит удаляет из спецификации». Теперь узел открывается тем, что проверяется. Только файлы, которые хранит репозиторий: так узлы SpecSheriff guidelines, которые проект берёт из плагина, не проверяются, как и требует строка 10.1.11." },
  { kind: "p",
    en: "A node is removed by a commit if the commit it follows holds a node with its sid, and that sid is gone from the specification after the commit. For a merge, the commit it follows is its first parent. A removed node must be archived where both of the following hold:",
    ru: "Узел удалён коммитом, если в коммите, за которым он следует, есть узел с его sid, а после коммита этого sid в спецификации нет. Для слияния коммит, за которым оно следует, — его первый родитель. Удалённый узел должен попасть в архив, если выполнено и то и другое:",
    change: "Новое: узел, перенесённый в другой файл, сохраняет sid, поэтому удалённым не считается. Для слияния сказано, с каким коммитом сравнивать." },
  { kind: "li",
    en: "it has ever been approved (§s-67vekyup7y8smap);",
    ru: "ему когда-либо давали одобрение (§s-67vekyup7y8smap);",
    change: "Было: «Узел, которому когда-либо давалось одобрение, ищется в архиве…»." },
  { kind: "li",
    en: "its approval status is set by approvals rather than derived from the nodes under it, as a section's is (§s-9kfdycuq34beqvs).",
    ru: "его статус одобрения задаётся одобрениями, а не выводится из узлов под ним, как у раздела (§s-9kfdycuq34beqvs).",
    change: "Было: «…если это не раздел и не заголовок домена». Теперь сказано утвердительно и с причиной. Заголовок домена убран: правило 1.3.8 говорит только о разделе." },
  { kind: "p",
    en: "`sheriff validate` finds the approvals of a removed node by the sid that the node has in the commit that the commit follows.",
    ru: "Одобрения удалённого узла `sheriff validate` находит по sid, который у узла в коммите, за которым следует коммит.",
    change: "Новое: у узла в архиве sid нет, поэтому одобрения ищутся по sid из предыдущего коммита." },
  { kind: "p",
    en: "A node of the archive is added by the commit where the archive after the commit holds more nodes with its location (§s-kag2m9tzdnduxdx), kind and wording (§s-5ah25f6gy99panq) than the archive of the commit it follows. `sheriff validate` reads that earlier archive as `sheriff reindex` would rewrite it (§s-f5rz6b7dhxejjts). For a node in a cell of a `TableRule`, the wording compared is the wording that the node itself holds.",
    ru: "Узел архива добавлен коммитом, если узлов с его расположением (§s-kag2m9tzdnduxdx), типом и формулировкой (§s-5ah25f6gy99panq) в архиве после коммита больше, чем в архиве коммита, за которым он следует. Этот прежний архив `sheriff validate` читает так, как его переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts). Для узла в ячейке `TableRule` сравнивается формулировка, которую хранит сам узел.",
    change: "Новое: у узла в архиве нет sid, поэтому узлы считаются по расположению, типу и формулировке. Счёт покрывает узел, удалённый второй раз после восстановления. Прежний архив читается после переименований, которые делает `sheriff reindex`, чтобы переименованный тип узла не выглядел добавленным. Следствие: коммит, который меняет формулировку узла в архиве, будет отвергнут." },
  { kind: "p",
    en: "The entry of a removed node is a node that the commit adds to the archive with the location, the kind and the wording that the removed node had in the commit it follows. `sheriff validate` accepts the commit only if all of the following hold:",
    ru: "Запись удалённого узла — это узел, который коммит добавляет в архив с тем же расположением, тем же типом и той же формулировкой, какие были у удалённого узла в коммите, за которым следует коммит. `sheriff validate` принимает коммит, только если выполнено всё следующее:",
    change: "Новое: формулировка входит в запись, потому что строка 10.1.11 требует поместить в архив сам узел." },
  { kind: "li",
    en: "each removed node that must be archived has its entry in the archive;",
    ru: "у каждого удалённого узла, который должен попасть в архив, там есть запись;",
    change: "Было: «…ищется в архиве вместе с причиной удаления»." },
  { kind: "li",
    en: "the `archived` field of each such entry gives the date and the reason for the removal;",
    ru: "поле `archived` каждой такой записи указывает дату и причину удаления;",
    change: "Новое: сказано, где записаны дата и причина." },
  { kind: "li",
    en: "each node that the commit adds to the archive is the entry of a removed node that must be archived.",
    ru: "каждый узел, который коммит добавляет в архив, — запись удалённого узла, который должен попасть в архив.",
    change: "Было: «Любой другой узел отвергается, если он стоит в архиве». Теперь это проверяется в коммите, который добавляет узел в архив: без sid узел архива позже не сопоставить с одобрениями." },
  { kind: "p",
    en: "When `sheriff validate` refuses a commit, it names each removed node concerned by its sid, and each node of the archive concerned by its file and its location.",
    ru: "Отвергая коммит, `sheriff validate` называет каждый удалённый узел, о котором идёт речь, по его sid, а каждый узел архива, о котором идёт речь, — по его файлу и расположению.",
    change: "Новое: как назван узел архива, у которого нет sid." }
];
const removal = drafts["s-j4webte36gkraju"];
Object.assign(removal.proposal, {
  parts: removalParts,
  text: render(removalParts, "en"),
  ruText: render(removalParts, "ru"),
  reason: "The archive keeps each removed rule that the code may have implemented, and nothing else (§s-f2b5zvc565s242f). An archived node has no sid, so its entry can be checked only in the commit that removes the node.",
  ruReason: "Архив хранит каждое удалённое правило, которое код мог реализовать, и ничего больше (§s-f2b5zvc565s242f). У архивного узла нет sid, поэтому его запись можно проверить только в коммите, который удаляет узел.",
  reasonChange: "Новое: у узла не было обоснования. Оно говорит, зачем архив и почему запись проверяется только в коммите удаления.",
  examples: [{
    en: "A commit removes the approved rule `base/3.2` and the section `base/5`, left empty. It adds to `specs/_archive/base.json` a `TextRule` with the location `base/3.2` and the rule's wording, whose `archived` field gives the date and the reason. The closest mistake is to archive the empty section as well: `sheriff validate` then refuses the commit, naming `specs/_archive/base.json` and `base/5`.",
    ru: "Коммит удаляет одобренное правило `base/3.2` и опустевший раздел `base/5`. Он добавляет в `specs/_archive/base.json` узел типа `TextRule` с расположением `base/3.2` и формулировкой правила; его поле `archived` указывает дату и причину. Ближайшая ошибка — отправить в архив и пустой раздел: тогда `sheriff validate` отвергает коммит и называет `specs/_archive/base.json` и `base/5`.",
    change: "Предложил рецензент. Пример показывает правильную запись в архиве и ближайшую ошибку."
  }],
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: the second report found the draft ready once the definition of a node added to the archive was fixed; fix-archive-c.mjs applied that definition and the other fixes",
  refs: [
    { type: "implements", to: "s-qb79dcw694x2h63" },
    { type: "implements", to: "s-f2b5zvc565s242f" },
    { type: "cites", to: "s-67vekyup7y8smap" },
    { type: "cites", to: "s-9kfdycuq34beqvs" },
    { type: "cites", to: "s-kag2m9tzdnduxdx" },
    { type: "cites", to: "s-5ah25f6gy99panq" },
    { type: "cites", to: "s-f5rz6b7dhxejjts" }
  ]
});

const fileParts = [
  { kind: "p",
    en: "`sheriff validate` and `sheriff reindex` validate each file of the archive against `archive-file.schema.json` alone (§s-zefk589ykh37b8u). They do so at the points at which they validate the files of the specification. `sheriff reindex` does so once it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts).",
    ru: "`sheriff validate` и `sheriff reindex` проверяют каждый файл архива только по `archive-file.schema.json` (§s-zefk589ykh37b8u). Они делают это в те же моменты, в какие проверяют файлы спецификации. `sheriff reindex` делает это после того, как изменил то, что записал прежний выпуск (§s-f5rz6b7dhxejjts).",
    change: "Новое, по вашему решению от 12 ноября: строка 10.1.2 не распространяется на архив, потому что архив может хранить узел в формате прежнего выпуска. Поэтому файл архива проверяется по своей схеме, без расширений схемы. `sheriff binding` архива не читает." },
  { kind: "p",
    en: "That schema requires only the following of a node of the archive:",
    ru: "Эта схема требует от узла архива только следующего:",
    change: "Новое." },
  { kind: "li",
    en: "a location (§s-kag2m9tzdnduxdx) and a kind;",
    ru: "расположения (§s-kag2m9tzdnduxdx) и типа узла;",
    change: "Новое: по ним инструменты узнают запись удалённого узла." },
  { kind: "li",
    en: "an `archived` field that gives the date and the reason for the removal, and may also give the sid of the node that replaced it (§s-f2b5zvc565s242f);",
    ru: "поля `archived`, которое указывает дату и причину удаления и может также указывать sid узла, который его заменил (§s-f2b5zvc565s242f);",
    change: "Новое: замена необязательна, по вашему решению от 21 ноября." },
  { kind: "li",
    en: "that it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz).",
    ru: "чтобы у него не было sid, узлов под ним и связей, указывающих на него (§s-bpdqd9v72wg7vsz).",
    change: "Новое: это запреты правил 2.6 и 6.4. Раздел не попадает в архив, поэтому у узла архива нет узлов под ним." },
  { kind: "p",
    en: "The schema admits every other property of the node in any form.",
    ru: "Любое другое свойство узла схема допускает в любом виде.",
    change: "Новое: так узел, отправленный в архив прежним выпуском, проходит проверку." },
  { kind: "p",
    en: "Where the schema refuses a file of the archive, `sheriff validate` and `sheriff reindex` name that file, with every refusal in it. Each of these commands then stops, and `sheriff reindex` leaves every file unchanged.",
    ru: "Если схема отвергает файл архива, `sheriff validate` и `sheriff reindex` называют этот файл и каждый отказ в нём. После этого каждая из этих команд останавливается, а `sheriff reindex` оставляет каждый файл без изменений.",
    change: "Новое: так же, как с файлом спецификации в согласованном узле «Validation against the schema before a command works on the files»." }
];
const file = drafts["new:tools-7-1-archive-file"];
Object.assign(file.proposal, {
  parts: fileParts,
  text: render(fileParts, "en"),
  ruText: render(fileParts, "ru"),
  reason: "Each SpecSheriff tool that reads the archive relies on the form of what it reads. A schema limited to that form checks it and still admits a node that an earlier release archived.",
  ruReason: "Каждый инструмент SpecSheriff, который читает архив, опирается на форму того, что читает. Схема, ограниченная этой формой, проверяет её и при этом допускает узел, который отправил в архив прежний выпуск.",
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: passed on its second report, once fix-archive-c.mjs applied its fixes",
  refs: [
    { type: "implements", to: "s-qb79dcw694x2h63" },
    { type: "implements", to: "s-f2b5zvc565s242f" },
    { type: "implements", to: "s-bpdqd9v72wg7vsz" },
    { type: "cites", to: "s-zefk589ykh37b8u" },
    { type: "cites", to: "s-f5rz6b7dhxejjts" },
    { type: "cites", to: "s-kag2m9tzdnduxdx" }
  ]
});
file.doubt = "No row of the main table of checks names the check that a node of the archive holds no sid: row 10.1.3 now covers only the nodes of the specification. The agent takes the validation of a file of the archive as part of row 10.1.11's check that a node is placed in the archive, as the owner's ruling of 2026-11-12 gave what the tools read from the archive to rows 10.1.3 and 10.1.11.";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["propose-archive-b.mjs has rewritten the draft of \"A removed node and the archive\" as two nodes, and specsheriff-rule-reviewer is reviewing both before they are shown to the owner.",
    "propose-archive-b.mjs rewrote the draft of \"A removed node and the archive\" as two nodes, and specsheriff-rule-reviewer's second review found both ready once the fixes it asked for were made, which fix-archive-c.mjs made. The first, \"A removed node and the archive\", has now been shown to the owner together with an example that the reviewer proposed, and the owner's answer is to be acted on first. The second, \"Validation of a file of the archive\", is shown after it."],
  ["the validation of a file of the archive against its schema, and passing a replacement on.", "the validation of a file of the archive against its schema, and updating the reference to a replacement that was itself removed."],
  ["  - the second paragraph, which ensured that the replacement stayed a node of the specification and passed it on, is removed;",
    "  - the second paragraph, which required that the replacement stay a node of the specification and that the reference to it be updated when it was removed, is removed;"],
  ["  - the reason drops \"For the same reason, it names as its replacement only a node of the specification.\" and adds \"The sid of a replacement shows a reader where the rule went at the time of its removal.\"",
    "  - the sentence \"For the same reason, it names as its replacement only a node of the specification.\" is removed from the reason, and the sentence \"The sid of a replacement shows a reader where the rule went at the time of its removal.\" is added to it."],
  ["Once the owner agrees, the node \"A removed node and the archive\" is split into two:", "Once the owner agrees, the node \"A removed node and the archive\" will be split into two:"],
  ["Nothing passes a replacement on, and `archive-file.schema.json` drops the comment saying that `sheriff validate` checks that the replacement exists.",
    "No tool updates the reference to a replacement, and the comment saying that `sheriff validate` checks that the replacement exists is removed from `archive-file.schema.json`."],
  ["and changed the comment of `archived` in moved/specs/_schema/archive-file.schema.json.", "and changed the comment on `archived` in moved/specs/_schema/archive-file.schema.json."],
  ["and moved.before-2-6-replacement/ keeps the staged files as they were before build-moved.mjs rebuilt them.", "and moved.before-2-6-replacement/ keeps the files in the staging folder moved/ as they were before build-moved.mjs rebuilt them."],
  ["into two nodes, as the reviewer advised, and applied the rest of the reviewer's first report.",
    "into two nodes, and applied the other findings of the reviewer's first report. The reviewer had proposed three nodes, but the third, on updating a replacement, fell away once the owner made the replacement optional."],
  ["  - The node keeps its sid for the check that a commit adds", "  - The node keeps its sid and now covers the check that a commit adds"],
  ["A node counts as removed if the commit before holds a node with its sid and the specification after the commit holds none, so a node moved to another file does not count. A node of the archive counts as added where its location, kind and wording are new to the archive, and the entry of a removed node holds the location, the kind and the wording that the node had in the commit before. A domain's header is no longer named.",
    "A node counts as removed if the previous commit holds a node with its sid and the specification after the commit holds no node with that sid, so a node moved to another file does not count. The entry of a removed node holds the location, the kind and the wording that the node had in the previous commit. The node no longer mentions a domain's header."],
  ["  - Nothing passes a replacement on any longer.",
    `  - No tool updates the reference to a replacement any more.
- specsheriff-rule-reviewer's second review asked for these fixes, which fix-archive-c.mjs made, and tools-drafts.before-archive-c.json keeps the drafts as they were before that script ran:
  - in "A removed node and the archive", a node of the archive counts as added by a commit where the archive after the commit holds more nodes with its location, kind and wording than the archive of the commit it follows, read as \`sheriff reindex\` would rewrite it. So a node removed again after it was restored counts, a node whose kind \`sheriff reindex\` renames does not, and a commit that changes an archived node's wording is refused. For a merge, the commit it follows is its first parent, and for a node in a cell only the wording the node holds itself is compared. The reviewer proposed an example, which is shown to the owner with the node;
  - in "Validation of a file of the archive", \`sheriff binding\` is dropped, since it reads nothing from the archive in the new form. The schema of the archive requires only a location, a kind, the \`archived\` field, and that a node of the archive holds no sid, no node under it and no link pointing at it. It admits every other property in any form, since \`sheriff reindex\` changes what an earlier release wrote in the archive too;
  - no row of the main table of checks names the check that a node of the archive holds no sid. The agent takes the validation of a file of the archive as part of row 10.1.11's check, and says so when the node is shown to the owner.
- fix-archive-c.mjs also corrected the English of rule 2.6 as EngStickler's reader proposed, without a change of meaning, and added the owner's decision of 2026-11-21 to decisions-out-5.json for 2.6's \`meta.decisions\`. build-moved.mjs, apply-newform.mjs and split-base-page.mjs then rebuilt the staged files and the page of the base specification.
- Still to be done for these nodes in stage 3: the test of s-j4webte36gkraju that refuses a node standing in the archive is to be rewritten; archive-file.schema.json is to be reduced to what the node "Validation of a file of the archive" says, and its root comment, which says that a node of the archive is checked as an extension describes its kind, is to change with it; "The commands" (s-f5rz6b7dhxejjts) is to say that \`sheriff reindex\` removes the sid of a node that an earlier release archived with one.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and changes the comment of `archived` in the staged schema of the archive;", "and changes the comment on `archived` in the schema of the archive in the staging folder moved/;");
s = swap(s, "tools-page-archive-file/ holds the page showing the new node.",
  "tools-page-archive-file/ holds the page showing the new node. fix-archive-c.mjs applies the reviewer's second report on both drafts, corrects the English of rule 2.6 and adds the owner's decision of 2026-11-21 to 2.6's decisions in decisions-out-5.json; tools-drafts.before-archive-c.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Удалённый узел и архив» разделён на два: проверка при удалении и «Проверка файла архива»; оба у рецензента",
  "- ● «Удалённый узел и архив»: прошёл рецензента со второго раза, показан вам с примером\n- ○ «Проверка файла архива»: после него");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ «Удалённый узел и архив» — узел и пример\n- узел архива считается добавленным по расположению, типу и формулировке\n- следствие: коммит, меняющий формулировку узла в архиве, будет отвергнут\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(render(removalParts, "en") + `\n\nupdated at ${now}`);
