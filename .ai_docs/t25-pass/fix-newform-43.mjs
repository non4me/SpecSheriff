// The owner's ruling of 2026-11-09 on node 3.4 "RecordType": a RecordType may have a common part, shared by
// all the domains using it, and that part stands in contracts; the example of a store goes. Reviewed wording.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "An example is the format of a store several domains write to.", "It is the format of the part common to the data of all the domains using it (§s-96df5fcfqsvex9d).");
n.ruText = swap(n.ruText, "Пример — формат хранилища, в которое пишут несколько доменов.", "Это формат общей части данных всех доменов, которые его используют (§s-96df5fcfqsvex9d).");
const after = "A RecordType described away from its provider falls out of step when the provider changes what it gives.";
n.reason = swap(n.reason, after, after + " Where no domain provides a format, the part common to the domains using it belongs to none of them, so it is agreed in contracts.");
const ruAfter = "RecordType, описанный вдали от поставщика, отстаёт, когда поставщик меняет то, что отдаёт.";
n.ruReason = swap(n.ruReason, ruAfter, ruAfter + " Если ни один домен не предоставляет формат, его часть, общая для доменов, которые его используют, не принадлежит ни одному из них, поэтому её согласуют в контрактах.");
n.changes.push("По вашему решению пример с хранилищем в абзаце 3 убран. Вместо него сказано, что такой RecordType — формат общей части данных всех доменов, которые его используют. Формулировка прошла рецензента.");
n.changes.push("Абзац 2 обоснования: добавлена фраза о том, почему общая часть согласуется в контрактах. Формулировка прошла рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
console.log("---");
console.log(n.reason);
console.log("---");
console.log(n.ruText);
console.log("---");
console.log(n.ruReason);
