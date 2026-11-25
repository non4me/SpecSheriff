// The owner, 2026-11-10, on 7.12: most reasons read as comments on the paragraphs of the rule's text. A reason answers why the rule
// was added, what it solves and what it is for, as briefly as possible.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.12"];
if (n.sidValue !== "s-ydzyh9nqm3x64h4") throw new Error("7.12 is another node");
n.title = "A reason says why the rule exists";
n.ruTitle = "Обоснование говорит, зачем существует правило";
n.text = "A reason answers why the rule was added: what it solves and what it is for. It is as short as that answer allows.\n\nA reason is not a comment on the rule's text. It does not go through the text's paragraphs one by one and does not restate them.";
n.ruText = "Обоснование отвечает на вопрос, зачем добавлено правило: что оно решает и в чём его смысл. Оно настолько коротко, насколько позволяет этот ответ.\n\nОбоснование — не комментарий к тексту правила. Оно не разбирает абзацы текста по одному и не пересказывает их.";
n.reason = "Whoever revises or approves a rule needs to know why it exists. A comment on its paragraphs does not say that.";
n.ruReason = "Тот, кто пересматривает или одобряет правило, должен знать, зачем оно существует. Комментарий к его абзацам этого не говорит.";
n.changes = [
  "По вашему замечанию заголовок, текст и обоснование написаны заново: обоснование отвечает, зачем добавлено правило.",
  "Убраны перечень того, что ещё можно добавить в обоснование, и запрет говорить о цене ошибки: то, что правило решает, часто и есть беда, которую оно предотвращает.",
  "Сохраняет sid 6.7.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.title);
