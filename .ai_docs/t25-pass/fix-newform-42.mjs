// The owner's comment of 2026-11-09 on node 3.4 "RecordType": the sentence on contracts could not be followed.
// Reviewed wording. Also drops the page's note on the node that came to point at the node itself after the merge.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const pageFile = new URL("base-structure.html", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};

n.text = swap(n.text, "Contracts holds only those that no single domain provides, such as a store several domains write to.", "A RecordType with no such domain is declared in contracts. An example is the format of a store several domains write to.");
n.ruText = swap(n.ruText, "В контрактах стоят только те, которые не предоставляет ни один отдельный домен, например хранилище, в которое пишут несколько доменов.", "RecordType, у которого такого домена нет, объявляется в контрактах. Пример — формат хранилища, в которое пишут несколько доменов.");
n.changes.push("Фраза о контрактах в абзаце 3 переписана яснее, по вашему комментарию; формулировка прошла рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = swap(fs.readFileSync(pageFile, "utf8"), '"Пересекается с 3.4. У этого утверждения будет одно место, его выберу при показе."', '""');
fs.writeFileSync(pageFile, page);
console.log(n.text);
console.log("---");
console.log(n.ruText);
