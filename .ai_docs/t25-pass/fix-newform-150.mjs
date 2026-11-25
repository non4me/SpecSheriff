// The owner of 2026-11-10 on agreed 7.8: "carries" and "object" read badly; the rule is titled «Употребление общих слов», and its main thought, opening the text,
// is «Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится», the examples of the former second paragraph joining it.
// Preferring the concrete thing follows as the second paragraph. The reason is unchanged. The node is a draft again until the owner agrees.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["7.8"];
if (b.sidValue !== "s-me9k7g34jqb4rzn" || !b.agreed) throw new Error("unexpected draft");

b.title = "The use of general words";
b.ruTitle = "Употребление общих слов";
b.text = "A word of general meaning is always used with what it applies to: the structure of which record, the check at which moment comparing what with what, the model of what.\n\nWhere it can, a rule names the concrete thing it means rather than a general word for it. So not “a limit on how many records a listing shows”, which also let an export drop records, but “a limit on how many records a user interface shows”.";
b.ruText = "Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится: структура какой записи, проверка в какой момент и что с чем сравнивает, модель чего.\n\nГде можно, правило называет конкретную вещь, которую имеет в виду, а не общее слово для неё. Поэтому не «ограничение на то, сколько записей показывает список», из-за которого экспорт тоже мог отбрасывать записи, а «ограничение на то, сколько записей показывает пользовательский интерфейс».";
delete b.agreed;
b.changes = [...b.changes, "По вашему решению 2026-11-10: заголовок «Употребление общих слов», главная мысль первым абзацем: «Слово с общим смыслом всегда употребляется вместе с тем, к чему оно относится». «Несёт» и «объект» ушли: «объект» в спецификации читается и как объект JSON."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.title, "|", b.ruTitle);
