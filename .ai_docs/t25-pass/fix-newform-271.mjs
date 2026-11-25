// Node 12.2.5, the present node 2.3 (s-hr7j7scmfkkjnws) moved unchanged into the extension for domains: put on the page
// with the full Russian rendering of its present wording, and with a proposal of a single new wording. The present wording
// breaches agreed rules on how a node is written: a node "carries" a statement (the rule "A reference backs a statement
// and never makes it"), "a later one uses what an earlier one provides" names no order the domains have, the reason
// comments on the text paragraph by paragraph and restates node 1.2.2 on moving a node, and "the same day" states nothing
// a check does.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["12.2.5"]) throw new Error("12.2.5 already drafted");

const ruText = [
  "Связь между узлами спецификации может пересекать границу домена. Правило одного домена может указывать на правило другого. У такой связи, как у любой другой, есть тип.",
  "",
  "Тот, кто хочет указать на утверждение другого домена, которого там не содержит ни один узел, сначала передаёт это утверждение узлу этого домена. Тогда связь указывает на этот узел, и это один из следующих узлов:",
  "- узел этого домена, который может нести это утверждение;",
  "- если такого нет — правило, написанное там, в `meta.todos` которого назван узел, ссылающийся на него.",
].join("\n");
const ruReason = [
  "Домены строятся друг на друге: более поздний использует то, что даёт более ранний. Спецификация должна уметь это выразить.",
  "",
  "Связь содержит sid узла, на который она указывает, поэтому перенос любого из двух узлов оставляет связь целой. Связь на узел, которого больше нет, проверка отклоняет в тот же день.",
  "",
  "Утверждение, названное словами, а не узлом, — это ссылка, по которой не может пройти ни одна проверка. Тогда узел, который имеется в виду, не показывает, что на него кто-то опирается.",
  "",
  "Переданное узлу своего домена, утверждение остаётся в одном месте. Правило, написанное ради связи, читают, когда читают его домен. Пункт его `meta.todos` объясняет, почему оно там стоит.",
].join("\n");

const title = "A link may go from one domain to another";
const ruTitle = "Связь может вести из одного домена в другой";
const text = [
  "A link of any type may go from a node of one domain to a node of another domain.",
  "",
  "Where the statement to be linked to is in no node of the other domain, whoever writes the link first adds the statement to that domain:",
  "- to an existing node of that domain that the statement fits;",
  "- where no such node exists, to a new rule of that domain, whose `meta.todos` names the node that links to it.",
].join("\n");
const ruNewText = [
  "Связь любого типа может вести от узла одного домена к узлу другого домена.",
  "",
  "Если утверждения, на которое нужно сослаться, нет ни в одном узле другого домена, тот, кто пишет связь, сначала добавляет это утверждение в этот домен:",
  "- в существующий узел этого домена, к которому утверждение подходит;",
  "- если такого узла нет — в новое правило этого домена, в `meta.todos` которого назван узел, ссылающийся на это правило.",
].join("\n");
const reason =
  "A rule of one domain often relies on what another domain provides. A link shows that reliance. A statement named only in words is a reference that no check can follow. The `meta.todos` item tells the owners of that domain which node the new rule was written for.";
const ruNewReason =
  "Правило одного домена часто опирается на то, что даёт другой домен. Связь показывает эту зависимость. Утверждение, названное только словами, — это ссылка, по которой не может пройти ни одна проверка. Пункт `meta.todos` сообщает ответственным за домен, для какого узла написано новое правило.";

d["12.2.5"] = {
  from: "2.3",
  sid: "kept",
  title: "=2.3",
  text: "=2.3",
  reason: "=2.3",
  ruTitle: "Связь может пересекать границу домена",
  ruText,
  ruReason,
  changes: ["Узел перенесён из 2.3 в расширение для доменов без изменений, sid сохранён."],
  sidValue: "s-hr7j7scmfkkjnws",
  proposals: [
    {
      where: "заголовок, текст и обоснование целиком",
      en: "Title: " + title + "\n\nText: " + text + "\n\nReason: " + reason,
      ru: "Заголовок: " + ruTitle + "\n\nТекст: " + ruNewText + "\n\nОбоснование: " + ruNewReason,
      why: "",
    },
  ],
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.2.5 drafted with a proposal");
