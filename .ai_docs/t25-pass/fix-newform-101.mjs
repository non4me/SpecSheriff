// The reviewer's wording of 7.12. "Was added" is a past fact that cannot stop holding, while a rule is removed when its reason no
// longer holds, so the text says "exists". "Comment" is a defined thing a node holds, so the second paragraph says what a reason does.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.12"];
if (n.sidValue !== "s-ydzyh9nqm3x64h4") throw new Error("7.12 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "A reason answers why the rule was added: what it solves and what it is for.", "A reason answers why the rule exists: what it solves and what it is for.");
swap("text", "A reason is not a comment on the rule's text. It does not go", "A reason speaks of the rule as a whole. It does not go");
swap("ruText", "Обоснование отвечает на вопрос, зачем добавлено правило: что оно решает и в чём его смысл.", "Обоснование отвечает на вопрос, зачем существует правило: что оно решает и в чём его смысл.");
swap("ruText", "Обоснование — не комментарий к тексту правила. Оно не разбирает", "Обоснование говорит о правиле в целом. Оно не разбирает");
swap("reason", "A comment on its paragraphs does not say that.", "A walk through its paragraphs does not say that.");
swap("ruReason", "Комментарий к его абзацам этого не говорит.", "Разбор его абзацев этого не говорит.");
n.changes = [
  "По вашему замечанию заголовок, текст и обоснование написаны заново: обоснование отвечает, зачем существует правило.",
  "Вместо вашего «добавлено» стоит «существует»: правило удаляют, когда его обоснование перестаёт держаться, а то, что его когда-то добавили, перестать держаться не может.",
  "Убраны перечень того, что ещё можно добавить в обоснование, и запрет говорить о цене ошибки: то, что правило решает, часто и есть беда, которую оно предотвращает.",
  "Сохраняет sid 6.7.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
