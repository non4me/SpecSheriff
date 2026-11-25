// Node 1.3.4, finding 8 of strictness-audit.md: a team in a regulated industry needs two approvals, while 1.3.4 reads as one
// approval exactly. Under the agreed 2.4, whose own example is this case, the shared rule requires at least one approval
// and a project's own guidelines may require more. The proposal says "at least one" and adds an example of the third kind
// that 7.6.3 allows. It carries out a decision already made (2.4), so it is shown without the reviewer.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-433.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.3.4"];
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "A node is approved by one of its owners,", "A node is approved by at least one of its owners,");
const ruText = swap(n.ruText, "Узел одобряет один из его ответственных", "Узел одобряет хотя бы один из его ответственных");
const examples = [...(n.examples ?? []), "A project's own guidelines may require a node to be approved by two of its owners, as a team in a regulated industry needs."];
const ruExamples = [...(n.ruExamples ?? []), "Собственные guidelines проекта могут требовать, чтобы узел одобрили двое его ответственных, как нужно команде в регулируемой отрасли."];
n.proposals = [{
  where: "первое предложение текста и новый пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "Находка 8 проверки на излишнюю строгость: команде в регулируемой отрасли нужны два одобрения, а «один из его ответственных» читается как ровно одно. По согласованному 2.4 общее правило требует минимума — хотя бы одного одобрения, — а собственные guidelines проекта могут требовать больше; пример в самом 2.4 говорит именно об этом. Поэтому «один из» → «хотя бы один из», и добавлен пример третьего вида из 7.6.3. Остальное не меняется.",
}];
d["1.3.4~"] = { ...n, text, ruText, examples, ruExamples };
delete d["1.3.4~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
