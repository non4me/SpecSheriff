// The reviewer's report on the present 6.5, now 7.9: the word "predicate" is no word a plain reader relies on, so the node says what
// it means and the title follows. The example stays word for word.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.9"]) throw new Error("7.9 already has a draft");
d["7.9"] = {
  from: "6.5", sid: "kept",
  title: "The name and the description of what a rule binds",
  ruTitle: "Имя и описание того, о чём говорит правило",
  text: "A rule that binds a named thing quotes the name where the reader must find the definition that owns it. It describes the thing by what it is where the rule must keep binding if that name changes. So not “`deleted_users` is never searched”, which binds nothing once the table is renamed, but “a table holding the users who deleted their accounts — today `deleted_users` — is never searched”.",
  reason: "A sentence written against a name stops binding when the name changes, and nothing reports it. A description keeps binding whatever the thing is called, but does not lead the reader to the definition.",
  ruText: "Правило, которое говорит об именованной вещи, приводит её имя там, где читателю нужно найти определение этого имени. Оно описывает вещь по тому, что она собой представляет, там, где правило должно действовать и после смены имени. Поэтому не «`deleted_users` никогда не просматривается», что ничего не значит после переименования таблицы, а «таблица с пользователями, удалившими свои учётные записи, — сегодня `deleted_users` — никогда не просматривается».",
  ruReason: "Предложение, написанное об имени, перестаёт действовать, когда имя меняется, и ничто об этом не сообщает. Описание действует, как бы вещь ни называлась, но не приводит читателя к определению.",
  changes: [
    "Заголовок новый: прежний говорил о «предикате», слове, которое читатель не обязан знать.",
    "Первая фраза названа прямо: правило приводит имя. Вторая вместо «predicate» говорит, что вещь описывают по тому, что она собой представляет. Пример дословно.",
    "Обоснование сокращено до двух фраз, та же мысль без повторов.",
    "Сохраняет sid 6.5.",
  ],
  sidValue: "s-ybq7wbhkrh5pjqs",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(d["7.9"].title);
