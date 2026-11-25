// Node 6.6, the second part of finding 11 of sections 6 to 10, under the owner's ruling of 2026-11-17: a ratio may give
// any multiplicity that UML allows, a whole number or a range of whole numbers whose upper bound may be `*`. The reason
// says why an exact count is allowed; a second example shows one.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-456.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["6.6"];
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "A ratio gives the multiplicity of each end in UML notation: `1`, `0..1`, `1..*` or `0..*`.", "A ratio gives the multiplicity of each end in UML notation: a whole number, such as `1` or `2`, or a range of whole numbers, such as `0..1` or `1..3`, whose upper bound may be `*`, meaning no upper bound. In a range, the lower bound is not greater than the upper one.", "text");
const ruText = swap(n.ruText, "Соотношение — это кратность каждого конца в нотации UML: `1`, `0..1`, `1..*` или `0..*`.", "Соотношение — это кратность каждого конца в нотации UML: целое число, например `1` или `2`, или диапазон целых чисел, например `0..1` или `1..3`, верхней границей которого может быть `*`, то есть отсутствие верхней границы. В диапазоне нижняя граница не больше верхней.", "ruText");
const reason = `${n.reason}\n\nAny multiplicity that UML allows can be written, since an exact count, such as the two teams of a match, is as much a part of the relation as "one" or "many".`;
const ruReason = `${n.ruReason}\n\nЗаписать можно любую кратность, которую допускает UML, потому что точное число, например две команды в матче, — такая же часть отношения, как «один» или «много».`;
const examples = [...(n.examples ?? []), "`match 0..*:2 team` says that a match has exactly two teams and that a team plays any number of matches."];
const ruExamples = [...(n.ruExamples ?? []), "`match 0..*:2 team` означает, что в матче ровно две команды, а команда играет в любом числе матчей."];
n.proposals = [{
  where: "первое предложение текста, новое предложение о диапазоне, новый абзац обоснования, новый пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 11 разделов 6–10, вторая часть, по вашему решению 17 ноября: любая кратность UML вместо четырёх.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
const t = JSON.parse(fs.readFileSync(new URL("table-10-1.json", here), "utf8"));
for (const r of t.tables.flatMap((g) => g.rows)) if (/0\.\.1|1\.\.\*|multiplicit|ratio/i.test(r.en) && r.fate !== "deleted") console.log("ROW", r.num, r.fate, "|", r.en.slice(0, 200));
console.log("ok");
