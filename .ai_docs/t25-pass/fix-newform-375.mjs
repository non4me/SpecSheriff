// Node 7.2.2, agreed on 2026-11-16: a proposal of a new reason. The agreed reason went through the text sentence by
// sentence (why the main thought comes first, why its qualifications follow, why they form a list, why reasoning is
// written in sentences), which node 7.4.2 forbids. The new reason speaks of the rule as a whole: the order and layout
// of the text show how its statements relate, and readers left to work that out apply the rule in different ways.
// The title, the text and the example do not change; the agreed wording stands until the owner accepts the proposal.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-375.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.2"];
export const reason = "The order and layout of a node's text show the relations between its statements: which one is the requirement, which ones narrow it and which ones follow from others. Readers who have to work out these relations from the clauses apply the same rule in different ways.";
export const ruReason = "Порядок и оформление текста узла показывают связи между его утверждениями: какое из них — требование, какие его сужают, а какие следуют из других. Читатели, которым приходится выводить эти связи из оборотов речи, применяют одно и то же правило по-разному.";
if (process.argv[2] !== "--dry") {
  n.proposals = [
    {
      where: "обоснование",
      en: [`Title: ${n.title}`, "", `Text: ${n.text}`, "", `Example: ${n.examples[0]}`, "", `Reason: ${reason}`].join("\n"),
      ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${n.ruText}`, "", `Пример: ${n.ruExamples[0]}`, "", `Обоснование: ${ruReason}`].join("\n"),
      why: "Обоснование разбирало текст по предложениям: почему главная мысль идёт первой, почему уточнения следуют за ней и стоят списком, почему рассуждение пишется предложениями. Узел 7.4.2, который вы приняли, требует, чтобы обоснование говорило о правиле в целом. Новое обоснование говорит, зачем правило нужно целиком. Заголовок, текст и пример не меняются.",
    },
  ];
  fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
}
console.log("ok");
