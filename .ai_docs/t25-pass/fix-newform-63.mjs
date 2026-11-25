// Node 4.3: the reviewer's fixes of 2026-11-09 (review-4-5.md): a title that does not repeat the text, and the word
// "instance" said what it is at its first use.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.3"];

const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error("not found: " + from);
  n[field] = n[field].replace(from, to);
};
n.title = "The technical appendix of an instance";
n.ruTitle = "Техническое приложение инстанса";
swap("text", "An instance changes the technical appendix for itself.", "An instance, one running copy of the system, changes the technical appendix for itself.");
swap("ruText", "Инстанс меняет техническое приложение для себя.", "Инстанс, одна работающая копия системы, меняет техническое приложение для себя.");
n.changes.push("Правки рецензента: заголовок больше не повторяет текст, в первой фразе сказано, что такое инстанс.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.title, "|", n.text);
