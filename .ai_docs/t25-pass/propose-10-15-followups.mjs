// The owner agreed to 10.15 on 2026-11-18 («ок»). This script marks it agreed and writes the follow-up proposals that
// depend on it: the sentence of 10.14 on what is generated as part of the system's code, and rows 60 and 61 of table
// 10.1, under the ruling on finding 7 (code is generated from the approved wordings of its nodes).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-10-15-followups.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
d["10.15"].agreed = "2026-11-18";
d["10.15"].changes.push("Вы согласовали 18 ноября («ок»).");

const n = d["10.14"];
if (n.proposals?.length) throw new Error("10.14 already holds a proposal");
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "What is generated as part of the system's code is the exception: it waits for the approval of its nodes (§s-qyjw8xez6t6adc3).", "What is generated as part of the system's code is generated from the approved wordings of the nodes (§s-qyjw8xez6t6adc3).");
const ruText = swap(n.ruText, "Исключение — то, что генерируется в код системы: оно ждёт одобрения своих узлов (§s-qyjw8xez6t6adc3).", "То, что генерируется как часть кода системы, генерируется из одобренных формулировок узлов (§s-qyjw8xez6t6adc3).");
n.proposals = [{
  where: "Текст",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "По 10.15: код, который генерируется как часть кода системы, больше не ждёт одобрения узлов, а генерируется заново, как всё сгенерированное, но из одобренных формулировок. Поэтому это уже не исключение из первой фразы, а уточнение к ней.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const tableFile = new URL("table-10-1.json", here);
fs.copyFileSync(tableFile, new URL("table-10-1.before-10-15-followups.json", here));
const t = JSON.parse(fs.readFileSync(tableFile, "utf8"));
const rows = t.tables.flatMap((g) => g.rows);
const r60 = rows.find((x) => x.n === 60);
const r61 = rows.find((x) => x.n === 61);
if (!r60 || !r61 || r60.proposal || r61.proposal) throw new Error("rows 60 and 61 not ready for a proposal");
r60.proposal = {
  en: "Every copy of the system's code generated from the nodes and kept in the repository is exactly what the approved wordings of its nodes produce",
  ru: "Каждая копия кода системы, сгенерированная из узлов и хранимая в репозитории, — ровно то, что дают одобренные формулировки её узлов",
  why: "По 10.15: копия больше не ждёт черновика, а генерируется из последних одобренных формулировок своих узлов. Цена не меняется: коммит отклоняется.",
};
r61.proposal = {
  en: "A node from which nothing is generated, because its approved wording relies on a node that has never been approved",
  ru: "Узел, из которого ничего не генерируется, потому что его одобренная формулировка опирается на узел, который ни разу не одобряли",
  why: "По 10.15: копия, которая ждёт черновика, больше не бывает, а о таком узле 10.15 велит сообщать. Цена не меняется: сообщается по sid узла.",
};
fs.writeFileSync(tableFile, JSON.stringify(t, null, 2) + "\n");
console.log("ok", r60.num, r61.num, r60.ruCost, "|", r61.ruCost);
