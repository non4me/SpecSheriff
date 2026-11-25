// Node 4.4: the owner's reason of 2026-11-09, one sentence, word for word, and their agreement. Node 5.1: the reviewer's
// addition to its reason (review-4-5.md).
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const n = d["4.4"];
n.reason = "Technical debt needs a place of its own, or it is forgotten.";
n.ruReason = "Техническому долгу нужно своё место, иначе о нём забудут.";
n.changes.push("Обоснование — ваше, одной фразой.");
n.agreed = "2026-11-09";

const m = d["5.1"];
m.reason = m.reason + " Named, the property tells the file's author what to correct.";
m.ruReason = m.ruReason + " Названное свойство говорит автору файла, что исправить.";
m.changes.push("К обоснованию добавлена фраза о том, зачем отказ называет свойство. Правка рецензента.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason, "|", m.reason.slice(-70));
