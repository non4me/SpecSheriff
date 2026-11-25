// Node 7.3.1, agreed on 2026-11-15: a proposal. It called a title "a short name", while the agreed TableRule 7.2.4 now
// defines a name as the word by which the specification refers to an entity, so one word had two senses. The title
// now says in a few words what the node is about, and "names only what distinguishes" becomes "states only what
// distinguishes", for the same reason. The rest does not change. The owner agreed to take up this node on 2026-11-16
// («да только эти три»). The temporary key "7.3.1~" holds the proposed wording for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-395.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.3.1"];
const text = "A node's title says in a few words what the node is about, such as \"Guaranteed fields\". The text of the node states its rule. The title states only what distinguishes the node from the other nodes of its section.";
const ruText = "Заголовок узла в нескольких словах говорит, о чём узел, например «Гарантированные поля». Правило узла излагает его текст. Заголовок говорит только о том, что отличает узел от других узлов его раздела.";
n.proposals = [
  {
    where: "текст",
    en: [`Title: ${n.title}`, "", `Text: ${text}`, "", `Reason: ${n.reason}`].join("\n"),
    ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${ruText}`, "", `Обоснование: ${n.ruReason}`].join("\n"),
    why: "Первое предложение. Было: «Заголовок узла — краткое имя того, о чём узел, например «Гарантированные поля»». Стало: «Заголовок узла в нескольких словах говорит, о чём узел, например «Гарантированные поля»». Третье предложение. Было: «Заголовок называет только то, что отличает узел от других узлов его раздела». Стало: «Заголовок говорит только о том, что отличает узел от других узлов его раздела». Согласованная таблица 7.2.4 определяет имя как слово, которым спецификация называет сущность; заголовок правила сущность не называет, и слово «имя» здесь получало второе значение. Обоснование не меняется.",
  },
];
d["7.3.1~"] = { ...n, text, ruText };
delete d["7.3.1~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
