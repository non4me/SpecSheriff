// Drafts the new wording of "A removed node and the archive" (s-j4webte36gkraju, tools 7.1.6) for the new form of the
// guidelines: an archived node has no sid (s-f2b5zvc565s242f), so the removed node is read from the commit before its
// removal and its entry in the archive is recognized by its location and kind; a file of the archive is validated
// against its own schema alone, which holds only what the tools read, by the owner's ruling of 2026-11-12; the tools
// pass a replacement on when the replacement is removed in turn. Writes the draft into tools-drafts.json for
// specsheriff-rule-reviewer, and updates the continuation file, INDEX.md and the queue outline.
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

const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-archive.json", here), JSON.stringify(drafts, null, 2) + "\n");
const tools = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8"));
const find = (nodes, sid) => {
  for (const n of nodes ?? []) {
    if (n.sid === sid) return n;
    const hit = find(n.children, sid);
    if (hit) return hit;
  }
};
const current = find(tools.nodes, "s-j4webte36gkraju");

const parts = [
  { kind: "p",
    en: "`sheriff validate` checks each node that a commit removes from a file of the specification, if the repository keeps that file (§s-qb79dcw694x2h63). It reads the removed node, with its sid, from the commit before the removal. By that sid it finds whether an approval was ever given for the node (§s-67vekyup7y8smap).",
    ru: "`sheriff validate` проверяет каждый узел, который коммит удаляет из файла спецификации, если этот файл хранит репозиторий (§s-qb79dcw694x2h63). Удалённый узел вместе с его sid он читает из коммита до удаления. По этому sid он находит, давалось ли узлу когда-либо одобрение (§s-67vekyup7y8smap).",
    change: "Было: «`sheriff validate` ищет в одобрениях каждый sid, который коммит удаляет из спецификации». Новое: удалённый узел читается из коммита до удаления, потому что у узла в архиве sid нет. Проверяются только файлы, которые хранит репозиторий: так узлы SpecSheriff guidelines, которые проект берёт из плагина, не проверяются, как и требует строка 10.1.11." },
  { kind: "p",
    en: "The removed node is to go to the archive (§s-f2b5zvc565s242f) where both of the following hold:",
    ru: "Удалённый узел должен попасть в архив (§s-f2b5zvc565s242f), если выполнено и то и другое:",
    change: "Было: «Узел, которому когда-либо давалось одобрение, ищется в архиве вместе с причиной удаления, если это не раздел и не заголовок домена»." },
  { kind: "li",
    en: "an approval was ever given for it;",
    ru: "ему когда-либо давалось одобрение;",
    change: "Как было." },
  { kind: "li",
    en: "its approval status is set by approvals rather than derived from the nodes under it, as the approval status of a section and of a domain's header is (§s-9kfdycuq34beqvs).",
    ru: "его статус одобрения задают одобрения, а не выводится из узлов под ним, как статус одобрения раздела и заголовка домена (§s-9kfdycuq34beqvs).",
    change: "Было: «если это не раздел и не заголовок домена». Теперь сказано утвердительно и с причиной: статус раздела и заголовка домена выводится, а не задаётся одобрением, поэтому одобрение, данное им по прежнему выпуску, не отправляет их в архив." },
  { kind: "p",
    en: "The removed node's entry in the archive is the node that the same commit adds to the archive with the location and the kind that the removed node had. `sheriff validate` accepts the commit only if all of the following hold:",
    ru: "Запись удалённого узла в архиве — это узел, который тот же коммит добавляет в архив с тем расположением и тем типом, которые были у удалённого узла. `sheriff validate` принимает коммит, только если выполнено всё следующее:",
    change: "Новое: у узла в архиве нет sid, поэтому его запись узнаётся по расположению и типу, которые были у удалённого узла." },
  { kind: "li",
    en: "each removed node that is to go to the archive has its entry there;",
    ru: "у каждого удалённого узла, который должен попасть в архив, там есть запись;",
    change: "Как было, другими словами." },
  { kind: "li",
    en: "the `archived` field of each such entry gives the date and the reason for the removal;",
    ru: "поле `archived` каждой такой записи указывает дату и причину удаления;",
    change: "Было: «…вместе с причиной удаления». Теперь сказано, где записаны дата и причина." },
  { kind: "li",
    en: "each node that the commit adds to the archive is the entry of a removed node that is to go there.",
    ru: "каждый узел, который коммит добавляет в архив, — запись удалённого узла, который должен туда попасть.",
    change: "Было: «Любой другой узел отвергается, если он стоит в архиве». Теперь это проверяется в коммите, который добавляет узел в архив: без sid узел архива позже не сопоставить с одобрениями." },
  { kind: "p",
    en: "It refuses any other commit, naming each removed node and each node of the archive concerned.",
    ru: "Любой другой коммит он отвергает, называя каждый удалённый узел и каждый узел архива, о которых идёт речь.",
    change: "Новое в тексте: что команда называет при отказе." },
  { kind: "p",
    en: "`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of the archive against `archive-file.schema.json` alone (§s-zefk589ykh37b8u), before they work on the files. That schema describes only what the SpecSheriff tools read from a node of the archive or require of it:",
    ru: "`sheriff validate`, `sheriff binding` и `sheriff reindex` проверяют каждый файл архива только по `archive-file.schema.json` (§s-zefk589ykh37b8u), прежде чем работать с файлами. Эта схема описывает только то, что инструменты SpecSheriff читают из узла архива или требуют от него:",
    change: "Новое, по вашему решению от 12 ноября: строка 10.1.2 не распространяется на архив, потому что архив может хранить узел в формате прежнего выпуска. Поэтому файл архива проверяется по своей схеме, без расширений схемы, а эта схема требует только то, что читают инструменты." },
  { kind: "li",
    en: "its location, its kind and its `archived` field;",
    ru: "его расположение, его тип и его поле `archived`;",
    change: "Новое: по расположению и типу инструменты узнают запись, а поле `archived` хранит дату, причину и замену." },
  { kind: "li",
    en: "that it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz).",
    ru: "что у него нет sid, нет узлов под ним и нет связей, указывающих на него (§s-bpdqd9v72wg7vsz).",
    change: "Новое: это запреты правил 2.6 и 6.4. Раздел не попадает в архив, поэтому у узла архива нет узлов под ним." },
  { kind: "p",
    en: "The schema admits every other property of the node in the form that the release which archived the node gave it.",
    ru: "Любое другое свойство узла схема допускает в том виде, какой ему дал выпуск, отправивший узел в архив.",
    change: "Новое: так узел, отправленный в архив прежним выпуском, проходит проверку." },
  { kind: "p",
    en: "Where the `archived` field of a node of the archive names as its replacement a node that has been removed from the specification since the last commit, `sheriff reindex` passes the replacement on (§s-f2b5zvc565s242f):",
    ru: "Если поле `archived` узла архива называет заменой узел, удалённый из спецификации после последнего коммита, `sheriff reindex` передаёт замену дальше (§s-f2b5zvc565s242f):",
    change: "Новое: правило 2.6 требует, чтобы узел архива называл заменой только узел спецификации, а когда замену удаляют, — её собственную замену. Кто удаляет узел, не видит, какие узлы архива называют его заменой, поэтому это делает `sheriff reindex`." },
  { kind: "li",
    en: "it names instead the replacement that the removed node's entry in the archive names;",
    ru: "он называет вместо него замену, которую называет запись удалённого узла в архиве;",
    change: "Новое." },
  { kind: "li",
    en: "it removes the replacement from the field where that entry names none, or where the removed node was deleted outright.",
    ru: "он убирает замену из поля, если эта запись замены не называет или если удалённый узел был удалён без архива.",
    change: "Новое." }
];
const render = (key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const reason = [
  "An archived node has no sid (§s-f2b5zvc565s242f), so the tools read the removed node with its sid from the commit before the removal, and recognize its entry in the archive by its location and kind. A section and a domain's header state no requirement of their own, so an approval that an earlier release gave them is no reason to archive them.",
  "The archive may hold a node in the format that an earlier release used, so the archive's schema holds only what the tools read from it. Whoever removes a node may not know which archived nodes name it as their replacement, so `sheriff reindex` passes the replacement on."
].join("\n\n");
const ruReason = [
  "У узла в архиве нет sid (§s-f2b5zvc565s242f), поэтому инструменты читают удалённый узел вместе с его sid из коммита до удаления, а его запись в архиве узнают по расположению и типу. Раздел и заголовок домена сами ничего не требуют, поэтому одобрение, которое им дал прежний выпуск, — не причина отправлять их в архив.",
  "Архив может хранить узел в формате прежнего выпуска, поэтому схема архива содержит только то, что инструменты из него читают. Кто удаляет узел, может не знать, какие узлы архива называют его заменой, поэтому замену дальше передаёт `sheriff reindex`."
].join("\n\n");

drafts["s-j4webte36gkraju"] = {
  location: "tools 7.1.6",
  title: current.title,
  text: current.text,
  reason: current.reason ?? "",
  refs: current.refs.filter((r) => r.to),
  agreed: false,
  proposal: {
    title: current.title,
    ruTitle: "Удалённый узел и архив",
    parts,
    text: render("en"),
    ruText: render("ru"),
    reason,
    ruReason,
    reasonChange: "Новое: у узла не было обоснования.",
    removed: ["«ищет в одобрениях каждый sid»: у узла в архиве sid нет, поэтому одобрения ищутся по sid удалённого узла, прочитанного из коммита до удаления."],
    date: "2026-11-21",
    refs: [
      { type: "implements", to: "s-qb79dcw694x2h63" },
      { type: "implements", to: "s-f2b5zvc565s242f" },
      { type: "cites", to: "s-67vekyup7y8smap" },
      { type: "cites", to: "s-9kfdycuq34beqvs" },
      { type: "cites", to: "s-zefk589ykh37b8u" },
      { type: "cites", to: "s-bpdqd9v72wg7vsz" }
    ]
  },
  approvedRu: [
    "`sheriff validate` ищет в одобрениях каждый sid, который коммит удаляет из спецификации.",
    "",
    "- Узел, которому когда-либо давалось одобрение, ищется в архиве вместе с причиной удаления, если это не раздел и не заголовок домена.",
    "- Любой другой узел отвергается, если он стоит в архиве.",
    "",
    "Обоснования у узла нет."
  ].join("\n")
};
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

edit("../t25-one-thought.md", [
  ["The next node is \"A removed node and the archive\" (s-j4webte36gkraju), and specsheriff-rule-reviewer reviews its rewritten draft before the node is shown to the owner.",
    "The next node is \"A removed node and the archive\" (s-j4webte36gkraju). propose-archive.mjs has drafted its new wording, and specsheriff-rule-reviewer is reviewing the draft before the node is shown to the owner."],
  ["The page at https://claude.ai/artifact/YSg6dL4e94MAj7au1ZyHsS shows the second node.",
    `The page at https://claude.ai/artifact/YSg6dL4e94MAj7au1ZyHsS shows the second node. fix-validate-english.mjs then corrected that node's English as EngStickler's reader proposed, without a change of meaning, and tools-drafts.before-validate-english.json keeps the drafts as they were before that script ran.
- The fifth node is "A removed node and the archive" (s-j4webte36gkraju, tools 7.1.6). propose-archive.mjs drafted its new wording, and tools-drafts.before-archive.json keeps the drafts as they were before that script ran. The draft does the following:
  - \`sheriff validate\` reads each removed node, with its sid, from the commit before the removal, and recognizes the node's entry in the archive by the location and the kind that the removed node had;
  - a node goes to the archive only if an approval was ever given for it and its approval status is set by approvals, which leaves out a section and a domain's header;
  - each node that a commit adds to the archive must be the entry of such a removed node, since a node of the archive has no sid by which its approvals could be found later;
  - a file of the archive is validated against \`archive-file.schema.json\` alone, and that schema holds only what the tools read from a node of the archive or require of it, as the owner ruled on 2026-11-12;
  - \`sheriff reindex\` passes a replacement on when the replacement is removed in turn, as rule 2.6 requires.
- The agent asked the reviewer to judge four choices in that draft: recognizing an entry by its location and kind rather than by its wording; passing a replacement on in \`sheriff reindex\`, since no row of the main table of checks checks that a replacement is a node of the specification; whether \`sheriff reindex\` is to remove the sid of a node that an earlier release archived with one; and refusing a node that was never approved only in the commit that adds it to the archive.`]
]);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "tools-drafts.before-agree-validate.json is tools-drafts.json as it was before agree-validate.mjs ran.",
  "tools-drafts.before-agree-validate.json is tools-drafts.json as it was before agree-validate.mjs ran. fix-validate-english.mjs corrects the English of that node as EngStickler's reader proposed, and tools-drafts.before-validate-english.json is tools-drafts.json as it was before that script ran. propose-archive.mjs drafts the new wording of \"A removed node and the archive\" (s-j4webte36gkraju), and tools-drafts.before-archive.json is tools-drafts.json as it was before that script ran; tools-page-archive/ holds the page showing the draft.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Удалённый узел и архив»: черновик пишется и пойдёт рецензенту", "- ● «Удалённый узел и архив»: черновик у рецензента");
fs.writeFileSync(outline, o);
console.log(render("en"));
console.log("\n" + reason);
console.log(`\nupdated at ${now}`);
