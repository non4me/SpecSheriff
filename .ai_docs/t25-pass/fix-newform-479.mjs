// A proposal for the agreed 12.4 "Data records conform to their RecordType", carrying out the owner's ruling of
// 2026-11-16 in the same words as the agreed 12.1: "a domain" becomes "a part of the system". The example keeps its
// agreed text and opens by placing the domain of users in a base specification divided into domains.
// It also corrects the continuation file's English after EngStickler's reader read it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-479.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.4"];
if (n.proposals) throw new Error("12.4 already holds a proposal");
const RC = "s-e877bnfa559tvk9";
const text = `A part of the system outputs and writes to its store only data records that conform to their RecordType. The RuntimeCheck generated from the RecordType (§${RC}) refuses a nonconforming data record before that part of the system outputs it or writes it to its store.`;
const ruText = `Часть системы выдаёт и записывает в своё хранилище только записи данных, которые соответствуют своему RecordType. RuntimeCheck, сгенерированный из RecordType (§${RC}), отклоняет запись данных, не соответствующую этому RecordType, до того, как эта часть системы её выдаст или запишет в своё хранилище.`;
const reason = "The parts of the system that read another part's data rely on the format of that data. Without this rule, when that part renames a field in its code, the parts that read the data lose the field's value without notice.";
const ruReason = "Части системы, которые читают данные другой части, полагаются на формат этих данных. Без этого правила, если та часть переименует поле в своём коде, читающие эти данные части незаметно потеряют значение этого поля.";
const example = `In a base specification divided into domains, ${n.examples[0].charAt(0).toLowerCase()}${n.examples[0].slice(1)}`;
const ruExample = `В базовой спецификации, разделённой на домены, ${n.ruExamples[0].charAt(0).toLowerCase()}${n.ruExamples[0].slice(1)}`;
n.proposals = [{
  where: "текст, обоснование и пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, `Example: ${example}`, `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Пример: ${ruExample}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет ваше решение от 16 ноября теми же словами, что и согласованный 12.1: «домен» заменён на «часть системы». Пример тот же, что вы согласовали, и начинается с «В базовой спецификации, разделённой на домены».",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const fixes = [
  ["(the file agreed-seven-en.md in the scratchpad); it found nothing to correct in the parts that changed.", "(the file agreed-seven-en.md in the scratchpad). It found nothing to correct in the parts that changed."],
  ["are likewise limited to the types that the guidelines or that extension define,", "are limited to the types defined by the guidelines or by that extension,"],
  ["Next: the rewording of section 12 (RecordType) in general terms, so that its rules name no domain,", "Next: the rewording of section 12 (RecordType) in general wording, so that its rules name no domain,"],
  ["The agreed drafts that name domains are 12.1, 12.4, 12.12, 12.5 and 12.6;", "The agreed nodes that name domains are 12.1, 12.4, 12.5, 12.6 and 12.12;"],
  ["the phrase of the agreed example of 1.7.4.", "the phrase used in the agreed example in 1.7.4."],
  ["defines it in the SpecSheriff guidelines; fragments may be reused by any section.", "defines it in the SpecSheriff guidelines. Fragments of a format may be reused by any section."],
  ["The example keeps its agreed Russian and opens with", "The example keeps its agreed Russian wording and opens with"],
  ["since an example may mention domains as an example of a part of the system (the ruling of 2026-11-16).", "since an example may name domains as one kind of part of the system (the ruling of 2026-11-16)."],
];
for (const [a, b] of fixes) {
  if (!t.includes(a)) { console.log("MISSING: " + a.slice(0, 60)); continue; }
  t = t.split(a).join(b);
}
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner accepted the proposal for 12.1 on 2026-11-18 («ок»), and accept-proposal.mjs wrote it into the draft. fix-newform-479.mjs then wrote the proposal for 12.4, now shown to the owner: "a domain" becomes "a part of the system", in the same words as 12.1, and the example keeps its agreed text with the same opening.

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);

const q = "D:/SpecSheriff/.ai_docs/t25-pass/queue-outline.md";
let o = fs.readFileSync(q, "utf8");
const a2 = "- сейчас: принимаете 12.1 «RecordType» без доменов — «часть системы» и «раздел базовой спецификации»?\n";
const b2 = "- ✓ 12.1 «RecordType» без доменов — принят\n- сейчас: принимаете 12.4 «Записи данных соответствуют своему RecordType» без доменов?\n";
if (!o.includes(a2)) throw new Error("outline");
o = o.split(a2).join(b2);
o = o.split("- ● переписать раздел 12 в общих терминах (решение 16 ноября): 12.1, 12.4, 12.12, 12.5, 12.6 — по одному\n").join("- ● переписать раздел 12 в общих терминах (решение 16 ноября): 12.1 ✓, 12.4 ●, 12.12, 12.5, 12.6 — по одному\n");
fs.writeFileSync(q, o);
console.log("ok");
