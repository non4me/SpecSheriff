// 9.4 follows two of the owner's rulings of 2026-11-10: «для которого он написан» / "written for", as their comment made 9.3 say; and a commit is no actor
// that adds or changes anything, as they said of the deleted node on a test for changed code, so "a test a commit adds or changes" is "a test that is added or
// changed", in the text and the reason.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "A test a commit adds or changes carries the SpecTag of an approved node it is written from (§s-8xw4mgvpexyvw5q).", "A test that is added or changed carries the SpecTag of an approved node it is written for (§s-8xw4mgvpexyvw5q).");
swap("ruText", "Тест, который коммит добавляет или меняет, связан SpecTag с одобренным узлом, из которого он написан (§s-8xw4mgvpexyvw5q).", "Тест, который добавляют или меняют, связан SpecTag с одобренным узлом, для которого он написан (§s-8xw4mgvpexyvw5q).");
swap("reason", "So only a test a commit adds or changes must name an approved node.", "So only a test that is added or changed must name an approved node.");
swap("ruReason", "Поэтому называть одобренный узел обязан только тест, который коммит добавляет или меняет.", "Поэтому называть одобренный узел обязан только тест, который добавляют или меняют.");
b.changes = [...b.changes, "«Для которого он написан», как вы сказали в 9.3.", "Коммит больше не действующее лицо, как вы сказали об удалённом узле: «тест, который добавляют или меняют», в тексте и в обосновании."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
