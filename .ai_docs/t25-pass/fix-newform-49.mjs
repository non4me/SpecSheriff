// Node 3.4 "RecordType": the reviewer's wording fix of the English of the owner's second paragraph. The Russian,
// the owner's own, stays as it is.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["3.4"];

const from = "changing only the values and not the structure.";
if (!n.text.includes(from)) throw new Error("not found: " + from);
n.text = n.text.replace(from, "changing only the values of those data and not their structure.");
n.changes.push("Абзац 2, только английский текст: уточнено, что меняются значения этих данных, а не их структура. Правка рецензента.");
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text.split("\n\n")[1]);
