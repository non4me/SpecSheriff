// Writes into the head of 10.1 the wording the owner accepted on 2026-11-18: the table lists the
// checks of the SpecSheriff guidelines, since each extension keeps its checks in a table of its own.
import fs from "node:fs";
const file = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const p = t.head.proposal;
if (!p) throw new Error("no proposal on the head of 10.1");
t.head.text = p.en;
t.head.ruText = p.ru;
t.head.changes.push("Вы приняли 18 ноября («ок») правку по решению о таблицах проверок расширений: «полный список проверок SpecSheriff guidelines». " + p.why + " Согласование сохраняется.");
delete t.head.proposal;
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("head of 10.1:", t.head.text);
