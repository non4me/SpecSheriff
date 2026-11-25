// Node 3.4 "RecordType": the owner agreed on 2026-11-09 to the example proposed for the reviewer's doubt that
// nothing tested "no such domain". It is the last sentence of the third paragraph of the text, in the reviewed wording.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

const en = "That RecordType is the format of the part common to the data of all the domains using it.";
n.text = swap(n.text, en, en + " No single domain first provides a RecordType where, for example, several domains each form the data it describes.");
const ru = "Такой RecordType — это формат общей части данных всех доменов, которые его используют.";
n.ruText = swap(n.ruText, ru, ru + " Отдельного домена, который первым предоставляет RecordType, нет, например, если каждый из нескольких доменов сам формирует данные, которые описывает этот RecordType.");
n.changes.push("Абзац 3 дополнен последней фразой, по вашему решению: пример случая, когда отдельного домена, который первым предоставляет RecordType, нет. Формулировка прошла рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[2]);
console.log("---");
console.log(n.ruText.split("\n\n")[2]);
