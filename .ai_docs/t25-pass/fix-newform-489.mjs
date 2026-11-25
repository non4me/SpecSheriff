// After the owner agreed on 2026-11-18 to remove the row 12.10 (what the reviewer is given about a RecordType):
// - the note in the changes of 10.4 that sent that part to "the extension for domains (12.3.15)" now says that the general
//   wording of 10.4 covers it;
// - in the English of 10.4, "considers what a rule requires of generated code to be carried out by that code" becomes
//   "treats what a rule requires of generated code as carried out by that code": EngStickler's reader found the long
//   object of "considers" hard to parse. The meaning and the Russian are unchanged.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-489.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.4"];
const swap = (s, a, b) => { if (!s.includes(a)) throw new Error("not found: " + a); return s.split(a).join(b); };
n.text = swap(n.text, "The reviewer considers what a rule requires of generated code to be carried out by that code.", "The reviewer treats what a rule requires of generated code as carried out by that code.");
n.changes[0] = swap(n.changes[0], "Что получает рецензент для RecordType, уходит в расширение для доменов (12.3.15);", "Что получает рецензент для RecordType, покрывает общая формулировка этого узла: поля, которые добавляет тип узла, входят в формулировку по 1.3.5, а файлы, сгенерированные из RecordType, — это файлы, сгенерированные из спецификации (строка 12.10 убрана по вашему решению 18 ноября);");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
