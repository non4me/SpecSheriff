// Node 12.3.5, not yet agreed: the text no longer defines by negation, after the owner's remark of 2026-11-14 («это
// описание через отрицание, мы такие не любим»; rule 7.10). It says what a RecordType may refer to: RecordTypes of its own
// domain and fragments of a format declared in the contracts section. It adds the owner's clarification that the rules of a
// domain may cite another domain's RecordType, and the owner's example of a consuming domain describing in its technical
// appendix what it does with the data it takes as input.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.5"];
n.title = "What a RecordType may refer to";
n.ruTitle = "На что может ссылаться RecordType";
n.text = "In the types of its fields and through `refines`, a RecordType refers only to RecordTypes of its own domain and to fragments of a format declared in the contracts section (§s-7vm323mhry2enx3). A field holds the identifier of another domain's data record as an ordinary value. The rules of a domain may cite a RecordType of another domain.";
n.ruText = "В типах своих полей и через `refines` RecordType ссылается только на RecordType своего домена и на фрагменты формата, объявленные в контрактах (§s-7vm323mhry2enx3). Идентификатор записи данных другого домена поле хранит как обычное значение. Правила домена могут ссылаться на RecordType другого домена.";
n.examples = [
  "The RecordType of a request holds the identifier of the user who made the request in a text field. That field does not refer to the RecordType of a user.",
  "The technical appendix of the domain of requests states what the domain does with a user's data record that it takes as input, and cites the RecordType of a user.",
];
n.ruExamples = [
  "RecordType запроса хранит идентификатор пользователя, сделавшего запрос, в текстовом поле. Это поле не ссылается на RecordType пользователя.",
  "Техническое приложение домена запросов описывает, что домен делает с записью данных о пользователе, которую берёт на вход, и ссылается на RecordType пользователя.",
];
n.changes.push("По вашему замечанию: текст больше не определяет через отрицание, а говорит, на что RecordType может ссылаться. Добавлено ваше уточнение: правила домена могут ссылаться на RecordType другого домена; второй пример — ваш.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
const old = `"RecordTypes of different domains are not linked","RecordType разных доменов не связаны между собой"`;
if (!page.includes(old)) throw new Error("row 12.3.5 not found");
page = page.replace(old, `"${n.title}","${n.ruTitle}"`);
fs.writeFileSync(pageFile, page);
console.log(n.ruText);
