// Node 7.2.2, the proposal of fix-newform-375.mjs and fix-newform-376.mjs, after specsheriff-rule-reviewer. The list
// after the colon in the reason restated the text's parts in its order and called the main thought alone "the
// requirement", which node 7.3.3 counts together with its qualifications; it goes. The Russian «связи» is the owner's
// word for a link, so the Russian says «соотносятся». Three fixes to the agreed text join the proposal, since the node is
// checked as a whole when it changes: "main thought" cites node 7.3.2, which defines a thought since the old 6.3 was
// split (node 7.2.7); the sentence on lists is shorter with the same meaning (node 7.5.2); "one thing" is "one statement"
// (node 7.2.3).
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-377.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.2"];
const thought = "s-jrw6dhuthu4t8eq";
const text = `A node's text opens with its main thought (§${thought}) in a short sentence. Its qualifications follow. Two or more qualifications of the same kind, such as conditions, exceptions or steps, are set out as a bulleted list in the text. Reasoning, in which one statement follows from another, is written in sentences.`;
const ruText = `Текст узла начинается с главной мысли (§${thought}) в коротком предложении. Уточнения идут после неё. Два и более уточнения одного рода, например условия, исключения или шаги, стоят в тексте маркированным списком. Рассуждение, где одно утверждение следует из другого, пишется предложениями.`;
const reason = "The order and layout of a node's text show how its statements relate to one another. Readers who have to work this out for themselves apply the node in different ways.";
const ruReason = "Порядок и оформление текста узла показывают, как его утверждения соотносятся друг с другом. Читатели, которым приходится выяснять это самим, применяют узел по-разному.";
n.proposals = [
  {
    where: "текст и обоснование",
    en: [`Title: ${n.title}`, "", `Text: ${text}`, "", `Example: ${n.examples[0]}`, "", `Reason: ${reason}`].join("\n"),
    ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${ruText}`, "", `Пример: ${n.ruExamples[0]}`, "", `Обоснование: ${ruReason}`].join("\n"),
    why: [
      "Обоснование. Было: «Главная мысль, сказанная первой в коротком предложении, сразу говорит читателю, чего требует узел. Всё дальнейшее читается как её сужение, а не как новые требования. В списке уточнения одного рода читаются одинаково, и ни одно не теряется среди оборотов. Рассуждение держится только как цепочка, где каждый шаг следует из предыдущего, а список разорвал бы связи между ними.» Стало: «Порядок и оформление текста узла показывают, как его утверждения соотносятся друг с другом. Читатели, которым приходится выяснять это самим, применяют узел по-разному.» Старое обоснование разбирало текст по предложениям, а принятый вами узел 7.4.2 это запрещает.",
      "Первое предложение текста. Было: «с главной мысли в коротком предложении». Стало: «с главной мысли (§s-jrw6dhuthu4t8eq) в коротком предложении». После разделения прежнего 6.3 определение мысли осталось в 7.3.2, а узел 7.2.7 требует при первом употреблении такого слова объяснить его или сослаться на определение.",
      "Третье предложение текста. Было: «Если уточнений одного рода больше одного, например условий, исключений или шагов, они стоят в тексте маркированным списком». Стало: «Два и более уточнения одного рода, например условия, исключения или шаги, стоят в тексте маркированным списком». Смысл тот же, предложение короче (узел 7.5.2).",
      "Четвёртое предложение текста. Было: «где одно следует из другого». Стало: «где одно утверждение следует из другого». Узел 7.2.3 требует, чтобы общее слово стояло вместе с тем, к чему оно относится.",
    ].join(" "),
  },
];
d["7.2.2~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.2.2~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
