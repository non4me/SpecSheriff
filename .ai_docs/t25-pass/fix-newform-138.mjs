// The owner's ruling of 2026-11-10 on 8.4: the check also compares each kind's `needsCode`. Their sentence goes in, with "by name and `needsCode`" saying what is compared.
// Owed to the tools step, test first: the check of lists in binding.ts compares only names today. The ruling goes into 8.4's meta.decisions at the move.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["8.4"];
if (b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("ruText", "При каждом коммите проверка сравнивает имена в этом списке с именами в `kinds` расширения (§s-jau82aq9juv9zzh).", "При каждом коммите проверка сверяет согласованность новых типов узлов по имени и `needsCode` между JSON-схемой и guidelines проекта (§s-jau82aq9juv9zzh).");
swap("text", "At each commit, a check compares the names in that list with the names under the extension's `kinds` (§s-jau82aq9juv9zzh).", "At each commit, a check verifies that the new kinds of node agree in name and `needsCode` between the JSON Schema and the project's own guidelines (§s-jau82aq9juv9zzh).");
const before = b.changes.length;
b.changes = b.changes.filter((c) => !c.startsWith("Сверка описана как она работает сейчас"));
if (b.changes.length !== before - 1) throw new Error("the change line on the check was not found");
b.changes = [...b.changes, "По вашему решению проверка сверяет и имя, и `needsCode`. Фраза ваша, добавлено «по имени и `needsCode`». Сейчас инструменты сравнивают только имена, они изменятся на шаге инструментов."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.ruText.split("\n\n")[2]);
console.log(b.text.split("\n\n")[2]);
