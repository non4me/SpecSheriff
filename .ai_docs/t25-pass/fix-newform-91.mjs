// The reviewer's report on the present 6.10: its paragraph on defined names is carried out apart, so it becomes a node of its own;
// a main rule names no concept of an extension, so RecordType leaves its list; the exception for `type` and `kind` stood only in a
// decision and goes into the text. Run after `node insert-node.mjs 7.8`, which made room.
import fs from "node:fs";
import crypto from "node:crypto";

const here = new URL(".", import.meta.url);
const pagePath = new URL("base-structure.html", here);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["7.8"]) throw new Error("no room at 7.8");

const everything = JSON.stringify(d) + fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8") + fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8");
const A = "23456789abcdefghjkmnpqrstuvwxyz";
let SID;
do { SID = "s-" + Array.from(crypto.randomBytes(15), b => A[b % A.length]).join(""); } while (everything.includes(SID));

d["7.7"] = {
  from: "6.10", sid: "kept", title: "=6.10", ruTitle: "Общее слово несёт свой объект",
  text: "A rule names the concrete thing it means rather than a general word for it. So not “a limit on how many records a listing shows”, which also let an export drop records, but “a limit on how many records a user interface shows”.\n\nWhere a general word cannot be avoided — a model, a structure, a check — it carries its object in the same phrase: the structure of which record, the check at which moment comparing what with what, the model of what.",
  reason: "A rule has no conversation around it to supply a missing object. A general rule has the least context of all, so every reader supplies an object of their own, and the rule binds whatever each of them chose. Nothing about the word itself looks wrong, which is why the ambiguity survives every reading.",
  ruText: "Правило называет конкретную вещь, которую имеет в виду, а не общее слово для неё. Поэтому не «ограничение на то, сколько записей показывает список», из-за которого экспорт тоже мог отбрасывать записи, а «ограничение на то, сколько записей показывает пользовательский интерфейс».\n\nГде без общего слова не обойтись — модель, структура, проверка, — оно несёт свой объект в той же фразе: структура какой записи, проверка в какой момент и что с чем сравнивает, модель чего.",
  ruReason: "У правила нет разговора вокруг, который подсказал бы пропущенный объект. У общего правила контекста меньше всего, поэтому каждый читатель подставляет свой объект, и правило обязывает к тому, что выбрал каждый из них. В самом слове ничего не выглядит неправильным, поэтому неоднозначность переживает любое прочтение.",
  changes: [
    "Заголовок и абзацы 1–2 текста нынешнего 6.10 дословно, обоснование — его первый абзац.",
    "Абзац об именах, определённых спецификацией, выполняется отдельно и вынесен в 7.8.",
    "Сохраняет sid 6.10. Здесь остаются решения от 2026-10-27, 2026-11-05 и 2026-11-07.",
  ],
  sidValue: "s-me9k7g34jqb4rzn",
};
d["7.8"] = {
  from: "6.10", sid: "new", title: "A name the specification defines carries its object", ruTitle: "Имя, определённое спецификацией, несёт свой объект",
  text: "A name the specification defines — a term, a field — is never a general word alone, such as type, action or item. It carries its object: userAction, not action. The fields `type` and `kind` of the node schema are excepted: they are read within the object that holds them.",
  reason: "A defined name is read in every rule that uses it, far from its definition. A general one there means whatever each rule's context suggests: a field called type held a sort of request in one log, a user's action in another and a sort of error in a third.",
  ruText: "Имя, определённое спецификацией, — термин, поле — никогда не бывает одним общим словом, таким как type, action или item. Оно несёт свой объект: userAction, а не action. Исключение составляют поля `type` и `kind` схемы узла: они читаются внутри объекта, который их содержит.",
  ruReason: "Определённое имя читают в каждом правиле, которое его использует, вдали от его определения. Общее имя значит там то, что подскажет контекст правила: поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем.",
  changes: [
    "Новый узел: абзац 3 нынешнего 6.10, обоснование — его второй абзац. Заголовок новый.",
    "Из примеров убран RecordType: основные правила не называют понятий расширений.",
    "Добавлена последняя фраза. Исключение для полей `type` и `kind` было записано только в решении от 2026-10-28, а исключение пишется в тексте правила. Это решение при переносе перейдёт сюда.",
  ],
  sidValue: SID,
};
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const lines = fs.readFileSync(pagePath, "utf8").split("\n");
const at = lines.findIndex(l => l.trim().startsWith('["7.7",'));
if (at < 0) throw new Error("no row 7.7");
const indent = lines[at].slice(0, lines[at].indexOf("["));
const row = JSON.parse(lines[at].trim().replace(/,$/, ""));
row[1] = "split";
lines[at] = indent + JSON.stringify(row) + ",";
lines.splice(at + 1, 0, indent + JSON.stringify(["7.8", "part", 0, "6.10", "part of 6.10: A general word carries its object", "уходит сюда: Имя, определённое спецификацией, несёт свой объект"]) + ",");
fs.writeFileSync(pagePath, lines.join("\n"));
console.log("7.8 sid", SID);
