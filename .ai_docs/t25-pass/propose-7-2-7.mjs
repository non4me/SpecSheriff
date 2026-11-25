// The build of 2026-11-20 found that the agreed 7.2.7 (s-qjkx3zs8r8kj69t), a rule of the SpecSheriff guidelines, cites
// 12.1 (s-7vm323mhry2enx3) of the RecordType extension as its example of a name, which the agreed 1.7.3
// (s-chk5hnzmcpeqj25) forbids. Proposes SpecTag (s-8xw4mgvpexyvw5q), a name of the guidelines themselves, which the
// node's own first example already uses. Also applies the corrections that EngStickler's reader confirmed in batch 42.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const swap = (s, from, to, what) => {
  if (s.split(from).length !== 2) throw new Error(`${what}: the passage must occur once: ${from.slice(0, 70)}`);
  return s.replace(from, () => to);
};
const nfPath = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nfPath, "utf8"));
fs.copyFileSync(nfPath, new URL("newform.before-propose-7-2-7.json", here));
const n = nf["7.2.7"];
if (n.proposals?.length) throw new Error("7.2.7 already holds a proposal");
const enText = swap(n.text, "such as RecordType (§s-7vm323mhry2enx3);", "such as SpecTag (§s-8xw4mgvpexyvw5q);", "7.2.7 text");
const ruText = swap(n.ruText, "например RecordType (§s-7vm323mhry2enx3);", "например SpecTag (§s-8xw4mgvpexyvw5q);", "7.2.7 ruText");
const ruExamples = n.ruExamples.map(e => e.replace("Правило требует, чтобы каждый тест нёс SpecTag,", "Правило требует, чтобы у каждого теста был SpecTag,"));
if (ruExamples[0] === n.ruExamples[0]) throw new Error("the Russian example was not found");
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, ...n.examples.map(e => `Example: ${e}`), `Reason: ${n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map(e => `Пример: ${e}`), `Обоснование: ${n.ruReason}`].join("\n\n"),
  why: "Согласованный 1.7.3 запрещает правилу SpecSheriff guidelines называть конкретное расширение и ссылаться на его узлы, а 7.2.7 приводит в пример имя RecordType со ссылкой на узел расширения «RecordType». Пример заменён на SpecTag — имя самих guidelines, которое уже стоит в первом примере узла. В русском тексте примера «тест нёс SpecTag» → «у теста был SpecTag», по вашей поправке к слову «несёт». Смысл правила не меняется.",
}];
fs.writeFileSync(nfPath, JSON.stringify(nf, null, 2) + "\n");

const indexPath = new URL("../INDEX.md", here);
let s = fs.readFileSync(indexPath, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "fix-cites-5-3.mjs replaces, in the drafts of 1.3.2 and 1.3.3, the citations of the current rule 5.3, which the new form drops, and proposes a new sentence for the reason of 1.6.1.",
  "fix-cites-5-3.mjs replaces, in the drafts of rules 1.3.2 and 1.3.3, the citations of the current rule 5.3, since the new form of the SpecSheriff guidelines drops that rule, and proposes a new sentence for the reason field of rule 1.6.1. propose-7-2-7.mjs proposes a new example name for rule 7.2.7.", "index");
s = s.replace("It is stage 1 of the step that writes the new files.", "It carries out stage 1 of the step that writes the new files.");
s = s.replace(/lists the decisions it made and the problems it found/, "lists the decisions that build-moved.mjs made and the problems it found");
fs.writeFileSync(indexPath, s);
console.log("proposed at", now);
