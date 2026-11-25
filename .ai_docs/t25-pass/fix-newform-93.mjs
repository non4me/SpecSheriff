// The reviewer's wording of 7.8: "object" was used in two senses and "key" stood where the agreed nodes say "property". The form with
// a dot holds for an object with a name of its own; a node and a link have none, so they are named in the same phrase.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.8"];
if (n.sidValue !== "s-9w3u3wn37wksyxd") throw new Error("7.8 is another node");
const swap = (field, a, b) => { if (!n[field].includes(a)) throw new Error("missing: " + a); n[field] = n[field].replace(a, b); };
swap("text", "A key of an object carries its object by being written after it, with a dot, in code font: `TextRule.list`, `meta.comments`. So the key itself may be a general word.", "A property of an object that has a name of its own is written as that name, a dot and the property's key, in code font: `TextRule.list`, `meta.comments`. Written so, the key may be a general word.\n\nA property of an object with no name of its own is written with that object named in the same phrase: a node's `kind`, a link's `type`.");
swap("ruText", "Ключ объекта несёт свой объект тем, что пишется после него через точку, шрифтом кода: `TextRule.list`, `meta.comments`. Поэтому сам ключ может быть общим словом.", "Свойство объекта, у которого есть собственное имя, записывают как это имя, точку и ключ свойства, шрифтом кода: `TextRule.list`, `meta.comments`. При такой записи ключ может быть общим словом.\n\nСвойство объекта без собственного имени записывают, называя этот объект в той же фразе: `kind` узла, `type` связи.");
swap("reason", "Written after its object, a key is unique: the reader sees which object it belongs to.", "Written with its object, a key is unique: the reader sees which object it belongs to. Code font tells it from an ordinary word.");
swap("ruReason", "Записанный после своего объекта, ключ однозначен: читатель видит, какому объекту он принадлежит.", "Записанный вместе со своим объектом, ключ уникален: читатель видит, какому объекту он принадлежит. Шрифт кода отличает его от обычного слова.");
n.changes = n.changes.map(c => c.startsWith("Второй абзац новый") ? "Абзацы 2 и 3 новые, по вашему замечанию. Запись свойства через точку была только в skill spec-review, а в решении от 2026-10-28 осталось непонятное исключение для `type` и `kind`. Это решение при переносе перейдёт сюда, а пункт skill будет ссылаться на этот узел." : c);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
