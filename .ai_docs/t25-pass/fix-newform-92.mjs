// The owner, 2026-11-10, on 7.8: `type` and `kind` are no exception. A key inside an object is written after its object with a dot,
// which makes the name unique, since it shows which object the property belongs to. The rule stood only in the skill spec-review
// (Naming, item 4), and in the guidelines only the unclear exception was left.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.8"];
if (n.sidValue !== "s-9w3u3wn37wksyxd") throw new Error("7.8 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", " The fields `type` and `kind` of the node schema are excepted: they are read within the object that holds them.", "\n\nA key of an object carries its object by being written after it, with a dot, in code font: `TextRule.list`, `meta.comments`. So the key itself may be a general word.");
swap("ruText", " Исключение составляют поля `type` и `kind` схемы узла: они читаются внутри объекта, который их содержит.", "\n\nКлюч объекта несёт свой объект тем, что пишется после него через точку, шрифтом кода: `TextRule.list`, `meta.comments`. Поэтому сам ключ может быть общим словом.");
n.reason += "\n\nWritten after its object, a key is unique: the reader sees which object it belongs to.";
n.ruReason += "\n\nЗаписанный после своего объекта, ключ однозначен: читатель видит, какому объекту он принадлежит.";
n.changes = [
  "Новый узел: абзац 3 нынешнего 6.10, обоснование — его второй абзац. Заголовок новый.",
  "Из примеров убран RecordType: основные правила не называют понятий расширений.",
  "Второй абзац новый, по вашему замечанию. Запись ключа через точку была только в skill spec-review, а в решении от 2026-10-28 осталось непонятное исключение для `type` и `kind`. Это решение при переносе перейдёт сюда, а пункт skill будет ссылаться на этот узел.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
