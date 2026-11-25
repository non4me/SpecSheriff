// The reviewer of 2026-11-10 on the rewritten 7.8: the owner's main sentence stands alone, its examples follow as "So never just a structure, a check or a model…";
// the reason drops "object", as the owner ruled for the title; the change notes no longer say the text is carried over word for word.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.8"];
if (b.sidValue !== "s-me9k7g34jqb4rzn" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "A word of general meaning is always used with what it applies to: the structure of which record,", "A word of general meaning is always used with what it applies to. So never just a structure, a check or a model, but the structure of which record,");
swap("ruText", "Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится: структура какой записи,", "Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится. Поэтому никогда не просто структура, проверка или модель, а структура какой записи,");
swap("reason", "A rule has no conversation around it to supply a missing object. A general rule has the least context of all, so every reader supplies an object of their own, and the rule binds whatever each of them chose.", "A rule has no conversation around it to say what a general word applies to. A general rule has the least context of all, so each reader fills it in for themselves, and the rule binds whatever each of them chose.");
swap("ruReason", "У правила нет разговора вокруг, который подсказал бы пропущенный объект. У общего правила контекста меньше всего, поэтому каждый читатель подставляет свой объект, и правило обязывает к тому, что выбрал каждый из них.", "У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. У общего правила контекста меньше всего, поэтому каждый читатель додумывает это сам, и правило обязывает к тому, что выбрал каждый из них.");
const sidLines = b.changes.filter((c) => /sid/.test(c));
b.changes = [
  "Заголовок ваш: «Употребление общих слов».",
  "Главная мысль ваша и стоит первой: «Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится». За ней примеры: никогда не просто структура, проверка или модель.",
  "Предпочтение конкретного слова с примером про список идёт вторым абзацем.",
  "«Несёт» и «объект» ушли из заголовка, текста и обоснования: «объект» в спецификации читается и как объект JSON.",
  ...sidLines,
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
console.log(b.ruReason);
