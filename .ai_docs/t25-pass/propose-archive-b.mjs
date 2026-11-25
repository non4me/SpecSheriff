// Applies the first review of the draft of "A removed node and the archive" (s-j4webte36gkraju) and the owner's
// agreement of 2026-11-21 to the new wording of rule 2.6, under which an archived node may name its replacement and
// nothing keeps that replacement current. The node is split in two, as rule 7.3.3 calls for: the node keeps its sid for
// the check that a commit archives exactly the removed nodes that must be archived, and the new node "Validation of a
// file of the archive" says how a file of the archive is validated. Nothing passes a replacement on any longer.
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

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-archive-b.json", here), JSON.stringify(drafts, null, 2) + "\n");

// The node that keeps the sid: the check made when a commit removes a node.
const removalParts = [
  { kind: "p",
    en: "`sheriff validate` checks that a commit adds to the archive (§s-f2b5zvc565s242f) exactly the nodes it removes from the specification that must be archived (§s-qb79dcw694x2h63). It checks only the nodes of the files that the repository keeps.",
    ru: "`sheriff validate` проверяет, что коммит добавляет в архив (§s-f2b5zvc565s242f) ровно те удаляемые им из спецификации узлы, которые должны попасть в архив (§s-qb79dcw694x2h63). Он проверяет только узлы файлов, которые хранит репозиторий.",
    change: "Было: «`sheriff validate` ищет в одобрениях каждый sid, который коммит удаляет из спецификации». Теперь узел открывается тем, что проверяется. Только файлы, которые хранит репозиторий: так узлы SpecSheriff guidelines, которые проект берёт из плагина, не проверяются, как и требует строка 10.1.11." },
  { kind: "p",
    en: "A node is removed by the commit if the commit before holds a node with its sid and the specification after the commit holds none. A removed node must be archived where both of the following hold:",
    ru: "Узел удалён коммитом, если в коммите до него есть узел с его sid, а в спецификации после коммита такого нет. Удалённый узел должен попасть в архив, если выполнено и то и другое:",
    change: "Новое: узел, перенесённый в другой файл, сохраняет sid, поэтому удалённым не считается." },
  { kind: "li",
    en: "it has ever been approved, which `sheriff validate` finds by the sid that the node has in the commit before (§s-67vekyup7y8smap);",
    ru: "его когда-либо одобряли — `sheriff validate` находит это по sid, который у узла в коммите до удаления (§s-67vekyup7y8smap);",
    change: "Было: «Узел, которому когда-либо давалось одобрение, ищется в архиве…». Теперь одобрения ищутся по sid из коммита до удаления: у узла в архиве sid нет." },
  { kind: "li",
    en: "its approval status is set by approvals rather than derived from the nodes under it, as a section's is (§s-9kfdycuq34beqvs).",
    ru: "его статус одобрения задают одобрения, а не выводится из узлов под ним, как у раздела (§s-9kfdycuq34beqvs).",
    change: "Было: «…если это не раздел и не заголовок домена». Теперь сказано утвердительно и с причиной. Заголовок домена убран: правило 1.3.8 говорит только о разделе." },
  { kind: "p",
    en: "A node of the archive is added by the commit where its location, kind and wording (§s-5ah25f6gy99panq) are new to the archive. The entry of a removed node is the node that the commit adds to the archive with the location (§s-kag2m9tzdnduxdx), the kind and the wording that the removed node had in the commit before.",
    ru: "Узел архива добавлен коммитом, если его расположение, тип и формулировка (§s-5ah25f6gy99panq) для архива новые. Запись удалённого узла — это узел, который коммит добавляет в архив с тем расположением (§s-kag2m9tzdnduxdx), тем типом и той формулировкой, которые были у удалённого узла в коммите до удаления.",
    change: "Новое: у узла в архиве нет sid, поэтому сказано, какой узел архива считается добавленным и какой — записью удалённого узла. Формулировка входит в запись, потому что строка 10.1.11 требует поместить в архив сам узел." },
  { kind: "p",
    en: "`sheriff validate` accepts the commit only if both of the following hold:",
    ru: "`sheriff validate` принимает коммит, только если выполнено и то и другое:",
    change: "Новое: что нужно, чтобы коммит приняли." },
  { kind: "li",
    en: "each removed node that must be archived has its entry in the archive, and the `archived` field of that entry gives the date and the reason for the removal;",
    ru: "у каждого удалённого узла, который должен попасть в архив, там есть запись, и поле `archived` этой записи указывает дату и причину удаления;",
    change: "Было: «…ищется в архиве вместе с причиной удаления». Теперь сказано, где записаны дата и причина." },
  { kind: "li",
    en: "each node that the commit adds to the archive is the entry of a removed node that must be archived.",
    ru: "каждый узел, который коммит добавляет в архив, — запись удалённого узла, который должен попасть в архив.",
    change: "Было: «Любой другой узел отвергается, если он стоит в архиве». Теперь это проверяется в коммите, который добавляет узел в архив: без sid узел архива позже не сопоставить с одобрениями." },
  { kind: "p",
    en: "It refuses any other commit. When it refuses a commit, it names each removed node concerned by its sid, and each node of the archive concerned by its file and its location.",
    ru: "Любой другой коммит он отвергает. Отвергая коммит, он называет каждый удалённый узел, о котором идёт речь, по его sid, а каждый узел архива, о котором идёт речь, — по его файлу и расположению.",
    change: "Новое: как назван узел архива, у которого нет sid." }
];
const removalReason = "The archive keeps each removed rule that the code may have implemented, and nothing else (§s-f2b5zvc565s242f). An archived node has no sid, so its entry can be checked only in the commit that removes the node, and only by the location, the kind and the wording that the node had.";
const removalRuReason = "Архив хранит каждое удалённое правило, которое код мог реализовать, и ничего больше (§s-f2b5zvc565s242f). У архивного узла нет sid, поэтому его запись можно проверить только в коммите, который удаляет узел, и только по расположению, типу и формулировке, которые были у узла.";

const removal = drafts["s-j4webte36gkraju"];
Object.assign(removal.proposal, {
  parts: removalParts,
  text: render(removalParts, "en"),
  ruText: render(removalParts, "ru"),
  reason: removalReason,
  ruReason: removalRuReason,
  reasonChange: "Новое: у узла не было обоснования. Оно говорит, зачем архив, и почему запись проверяется только в коммите удаления и только по расположению, типу и формулировке.",
  removed: [
    "«ищет в одобрениях каждый sid»: у узла в архиве sid нет, поэтому одобрения ищутся по sid удалённого узла, прочитанного из коммита до удаления.",
    "Проверка файла архива по его схеме перешла в новый узел «Validation of a file of the archive», который идёт сразу после этого.",
    "Передача замены дальше: по вашему решению от 21 ноября архивный узел только может назвать замену, и никто её не обновляет."
  ],
  reviewed: "specsheriff-rule-reviewer, 2026-11-21: the first report found the draft not ready; propose-archive-b.mjs split the node and applied the report",
  refs: [
    { type: "implements", to: "s-qb79dcw694x2h63" },
    { type: "implements", to: "s-f2b5zvc565s242f" },
    { type: "cites", to: "s-67vekyup7y8smap" },
    { type: "cites", to: "s-9kfdycuq34beqvs" },
    { type: "cites", to: "s-5ah25f6gy99panq" },
    { type: "cites", to: "s-kag2m9tzdnduxdx" }
  ]
});

// The new node: the validation of a file of the archive.
const fileParts = [
  { kind: "p",
    en: "`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of the archive, if the repository keeps that file, against `archive-file.schema.json` alone (§s-zefk589ykh37b8u). They do so at the points at which they validate the files of the specification, and `sheriff reindex` does so once it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts).",
    ru: "`sheriff validate`, `sheriff binding` и `sheriff reindex` проверяют каждый файл архива, если этот файл хранит репозиторий, только по `archive-file.schema.json` (§s-zefk589ykh37b8u). Они делают это в те же моменты, в какие проверяют файлы спецификации, а `sheriff reindex` — после того как изменил то, что записал более ранний выпуск (§s-f5rz6b7dhxejjts).",
    change: "Новое, по вашему решению от 12 ноября: строка 10.1.2 не распространяется на архив, потому что архив может хранить узел в формате прежнего выпуска. Поэтому файл архива проверяется по своей схеме, без расширений схемы." },
  { kind: "p",
    en: "That schema describes only what the SpecSheriff tools read from a node of the archive or require of it:",
    ru: "Эта схема описывает только то, что инструменты SpecSheriff читают из узла архива или требуют от него:",
    change: "Новое." },
  { kind: "li",
    en: "its location, its kind and its wording;",
    ru: "его расположение, его тип и его формулировку;",
    change: "Новое: по ним инструменты узнают запись удалённого узла." },
  { kind: "li",
    en: "its `archived` field, which gives the date and the reason for the removal, and which may also give the sid of the node that replaced it (§s-f2b5zvc565s242f);",
    ru: "его поле `archived`, которое указывает дату и причину удаления и может также указывать sid узла, который его заменил (§s-f2b5zvc565s242f);",
    change: "Новое: замена необязательна, по вашему решению от 21 ноября." },
  { kind: "li",
    en: "that it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz).",
    ru: "что у него нет sid, нет узлов под ним и нет связей, указывающих на него (§s-bpdqd9v72wg7vsz).",
    change: "Новое: это запреты правил 2.6 и 6.4. Раздел не попадает в архив, поэтому у узла архива нет узлов под ним." },
  { kind: "p",
    en: "The schema admits every other property of the node in the form that the release which archived the node gave it.",
    ru: "Любое другое свойство узла схема допускает в том виде, какой ему дал выпуск, отправивший узел в архив.",
    change: "Новое: так узел, отправленный в архив прежним выпуском, проходит проверку." },
  { kind: "p",
    en: "Where the schema refuses a file of the archive, `sheriff validate`, `sheriff binding` and `sheriff reindex` name that file, with every refusal in it. Each of these commands then stops, and `sheriff reindex` leaves every file unchanged.",
    ru: "Если схема отвергает файл архива, `sheriff validate`, `sheriff binding` и `sheriff reindex` называют этот файл и каждый отказ в нём. После этого каждая из этих команд останавливается, а `sheriff reindex` оставляет каждый файл без изменений.",
    change: "Новое: так же, как с файлом спецификации в согласованном узле «Validation against the schema before a command works on the files»." }
];
const fileReason = "The archive may hold a node in the format that an earlier release used. Its schema therefore describes only what the SpecSheriff tools read from the archive or require of it, so that such a node passes.";
const fileRuReason = "Архив может хранить узел в формате прежнего выпуска. Поэтому его схема описывает только то, что инструменты SpecSheriff читают из архива или требуют от него, чтобы такой узел проходил проверку.";
drafts["new:tools-7-1-archive-file"] = {
  location: "tools 7.1.7 (new, after \"A removed node and the archive\")",
  agreed: false,
  proposal: {
    title: "Validation of a file of the archive",
    ruTitle: "Проверка файла архива",
    parts: fileParts,
    text: render(fileParts, "en"),
    ruText: render(fileParts, "ru"),
    reason: fileReason,
    ruReason: fileRuReason,
    reasonChange: "Новое.",
    removed: [],
    date: "2026-11-21",
    reviewed: "not yet reviewed as a node of its own",
    refs: [
      { type: "implements", to: "s-qb79dcw694x2h63" },
      { type: "implements", to: "s-f2b5zvc565s242f" },
      { type: "cites", to: "s-zefk589ykh37b8u" },
      { type: "cites", to: "s-f5rz6b7dhxejjts" },
      { type: "cites", to: "s-bpdqd9v72wg7vsz" }
    ]
  },
  from: "s-j4webte36gkraju",
  testsFrom: ["match no test"]
};
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["The agent is now rewriting the draft of \"A removed node and the archive\" as two nodes, which specsheriff-rule-reviewer reviews before they are shown to the owner.",
    "propose-archive-b.mjs has rewritten the draft of \"A removed node and the archive\" as two nodes, and specsheriff-rule-reviewer is reviewing both before they are shown to the owner."],
  ["newform.before-2-6-replacement.json keeps the drafts as they were before that script ran, and build-moved.mjs then rebuilt the staged files.",
    `newform.before-2-6-replacement.json keeps the drafts as they were before that script ran, and moved.before-2-6-replacement/ keeps the staged files as they were before build-moved.mjs rebuilt them. apply-newform.mjs and split-base-page.mjs then rebuilt the page of the base specification, published again at https://claude.ai/artifact/5wK7HgU4higmsDkgSZtdX3.
- propose-archive-b.mjs split the draft of "A removed node and the archive" into two nodes, as the reviewer advised, and applied the rest of the reviewer's first report. tools-drafts.before-archive-b.json keeps the drafts as they were before that script ran.
  - The node keeps its sid for the check that a commit adds to the archive exactly the nodes it removes that must be archived. A node counts as removed if the commit before holds a node with its sid and the specification after the commit holds none, so a node moved to another file does not count. A node of the archive counts as added where its location, kind and wording are new to the archive, and the entry of a removed node holds the location, the kind and the wording that the node had in the commit before. A domain's header is no longer named.
  - The new node "Validation of a file of the archive" (the draft "new:tools-7-1-archive-file", tools 7.1.7) says that a file of the archive is validated against \`archive-file.schema.json\` alone, and that this schema describes only what the tools read from a node of the archive or require of it.
  - Nothing passes a replacement on any longer.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "newform.before-2-6-replacement.json is newform.json as it was before that script ran.",
  "newform.before-2-6-replacement.json is newform.json as it was before that script ran, and moved.before-2-6-replacement/ is moved/ as it was before build-moved.mjs rebuilt it with that wording. propose-archive-b.mjs splits the draft of \"A removed node and the archive\" into that node and the new node \"Validation of a file of the archive\", and tools-drafts.before-archive-b.json is tools-drafts.json as it was before that script ran; tools-page-archive-file/ holds the page showing the new node.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Удалённый узел и архив»: делится на два узла — проверка при удалении и проверка файла архива; черновики пойдут рецензенту",
  "- ● «Удалённый узел и архив» разделён на два: проверка при удалении и «Проверка файла архива»; оба у рецензента");
fs.writeFileSync(outline, o);
console.log(render(removalParts, "en") + "\n\n" + removalReason + "\n\n=====\n\n" + render(fileParts, "en") + "\n\n" + fileReason + `\n\nupdated at ${now}`);
