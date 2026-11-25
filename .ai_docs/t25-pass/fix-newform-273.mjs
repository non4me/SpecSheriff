// Node 12.2.5: the reviewer's findings on the proposal of fix-newform-271.mjs, applied before the owner sees it.
// - The node held two requirements applied apart (7.7): the reviewer recast it as one, that a node relying on what another
//   domain states has a link to the node stating it, the link of any type and to any section of that domain.
// - The `meta.todos` item naming the linking node is dropped: naming a node is not work put off, and the new rule's
//   incoming link already names the node that links to it. This changes what the rule states, so the owner is told.
// - The reason is the reviewer's: why reliance is shown by a link, not one sentence per paragraph of the text.
// - `why` corrected: node 12.4.1 does order the domains, by level, and a check does refuse a link to a removed node.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.2.5"];

const title = "Links between domains";
const ruTitle = "Связи между доменами";
const text = [
  "A node that relies on what another domain states has a link to the node of that domain that states it. The link may be of any type. It may go to any section of that domain.",
  "",
  "Where no node of that domain states what is relied on, whoever writes the link first adds that statement to that domain:",
  "- to an existing node that the statement fits;",
  "- otherwise, to a new rule.",
].join("\n");
const ruText = [
  "Узел, который опирается на то, что утверждает другой домен, содержит связь с узлом этого домена, который это утверждает. Связь может быть любого типа. Она может вести в любой раздел этого домена.",
  "",
  "Если ни один узел этого домена не утверждает того, на что нужно опереться, тот, кто пишет связь, сначала добавляет это утверждение в этот домен:",
  "- в существующий узел, к которому утверждение подходит;",
  "- иначе — в новое правило.",
].join("\n");
const reason =
  "A rule of one domain often relies on what another domain states. A link to the node stating it shows that reliance on both nodes. A reliance described only in words is seen by no reader of the other domain and by no check.";
const ruReason =
  "Правило одного домена часто опирается на то, что утверждает другой домен. Связь с узлом, который это утверждает, показывает эту зависимость в обоих узлах. Зависимость, описанную только словами, не видят ни читатели другого домена, ни проверки.";

n.proposals = [
  {
    where: "заголовок, текст и обоснование целиком",
    en: "Title: " + title + "\n\nText: " + text + "\n\nReason: " + reason,
    ru: "Заголовок: " + ruTitle + "\n\nТекст: " + ruText + "\n\nОбоснование: " + ruReason,
    why: [
      "Заголовок: «Связи между доменами» вместо «Связь может пересекать границу домена».",
      "Текст: вместо разрешения пересекать границу домена — требование: узел, который опирается на утверждение другого домена, содержит связь с узлом, который это утверждает. Разрешение осталось: связь любого типа, в любой раздел этого домена, а не только в разделы, перечисленные в заголовке домена.",
      "«Узел, который может нести это утверждение» заменён на «существующий узел, к которому утверждение подходит»: узел ничего не «несёт».",
      "Убрано требование назвать в `meta.todos` нового правила узел, который на него ссылается: todo — это отложенная работа, а узел, связь которого ведёт к новому правилу, и так виден среди входящих связей этого правила. Это меняет то, что правило требует.",
      "Обоснование: фразы о «позднем» и «раннем» домене и о переносе узла не объясняли, зачем связь пересекает границу домена. Обоснование больше не идёт по абзацам текста.",
    ].join(" "),
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.5 proposal revised after review");
