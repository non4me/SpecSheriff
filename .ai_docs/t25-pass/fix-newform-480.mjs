// A proposal for the agreed 12.12 "What a RecordType may refer to", carrying out the owner's ruling of 2026-11-16 in the
// words of the agreed 12.1 and 12.4: "its own domain" becomes "the part of the system that outputs its data", "the rules
// of a domain" become "the rules that describe one part of the system". The example keeps its agreed text and opens by
// placing the consuming domain in a base specification divided into domains.
// It also corrects the continuation file's English after EngStickler's reader read it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-480.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.12"];
if (n.proposals) throw new Error("12.12 already holds a proposal");
const RT = "s-7vm323mhry2enx3";
const text = `In the types of its fields, at any depth, and through \`refines\`, a RecordType refers only to the RecordTypes of the part of the system that outputs its data and to fragments of a format declared in the contracts section (§${RT}). A fragment of a format refers only to other fragments. The rules that describe one part of the system may cite a RecordType of another part.`;
const ruText = `В любом месте типов своих полей и через \`refines\` RecordType ссылается только на RecordType той части системы, которая выдаёт его данные, и на фрагменты формата, объявленные в контрактах (§${RT}). Фрагмент формата ссылается только на другие фрагменты. Правила, которые описывают одну часть системы, могут ссылаться на RecordType другой части.`;
const reason = "A RecordType describes the data that its own part of the system outputs and stores, not what that part takes in from other parts or from outside the system. If it referred to another part's RecordType, it would change whenever that part changed that RecordType, though nothing in its own part had changed. A fragment that referred to a RecordType of a part of the system would tie to that part every RecordType that uses the fragment.";
const ruReason = "RecordType описывает данные, которые его часть системы выдаёт и хранит, а не то, что она берёт у других частей или извне системы. Ссылающийся на RecordType другой части, он менялся бы при каждом изменении этого RecordType той частью, хотя в его собственной части ничего не менялось. Фрагмент, ссылающийся на RecordType какой-то части системы, привязал бы к этой части каждый RecordType, который этот фрагмент использует.";
const example = `In a base specification divided into domains, ${n.examples[0].charAt(0).toLowerCase()}${n.examples[0].slice(1)}`;
const ruExample = `В базовой спецификации, разделённой на домены, ${n.ruExamples[0].charAt(0).toLowerCase()}${n.ruExamples[0].slice(1)}`;
n.proposals = [{
  where: "текст, обоснование и пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, `Example: ${example}`, `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Пример: ${ruExample}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет ваше решение от 16 ноября теми же словами, что и принятые 12.1 и 12.4: «свой домен» — «та часть системы, которая выдаёт его данные», «правила домена» — «правила, которые описывают одну часть системы». Пример тот же, что вы согласовали, с тем же началом, что в 12.1 и 12.4.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const fixes = [
  ["the rewording of section 12 (RecordType) in general wording, so that its rules name no domain,", "the rewording of section 12 (RecordType) in domain-neutral wording, so that its rules name no domain,"],
  ["It replaces \"domain\" with \"a part of the system\", the plain words that the agreed 7.2.1 and 1.1.5 already use, and with \"the section of the base specification that describes where data in that format first appears\", the phrase used in the agreed example in 1.7.4.", "It replaces \"domain\" with \"a part of the system\" in some places, the plain words that the agreed 7.2.1 and 1.1.5 already use, and with \"the section of the base specification that describes where data in that format first appears\" in others, the phrase used in the agreed example in 1.7.4."],
  ["\"a domain\" becomes \"a part of the system\", in the same words as 12.1, and the example keeps its agreed text with the same opening.", "\"a domain\" becomes \"a part of the system\", in the same words as in 12.1, and the example keeps its agreed text and opens with the same words as the example in 12.1."],
];
for (const [a, b] of fixes) {
  if (!t.includes(a)) { console.log("MISSING: " + a.slice(0, 60)); continue; }
  t = t.split(a).join(b);
}
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner accepted the proposal for 12.4 on 2026-11-18 («ок»), and accept-proposal.mjs wrote it into the draft. fix-newform-480.mjs then wrote the proposal for 12.12, now shown to the owner, in the same words: a RecordType refers only to the RecordTypes of the part of the system that outputs its data, and the rules that describe one part of the system may cite a RecordType of another part.

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);

const q = "D:/SpecSheriff/.ai_docs/t25-pass/queue-outline.md";
let o = fs.readFileSync(q, "utf8");
const a2 = "- сейчас: принимаете 12.4 «Записи данных соответствуют своему RecordType» без доменов?\n";
const b2 = "- ✓ 12.4 без доменов — принят\n- сейчас: принимаете 12.12 «На что может ссылаться RecordType» без доменов?\n";
if (!o.includes(a2)) throw new Error("outline");
o = o.split(a2).join(b2);
o = o.split("12.1 ✓, 12.4 ●, 12.12, 12.5, 12.6 — по одному").join("12.1 ✓, 12.4 ✓, 12.12 ●, 12.5, 12.6 — по одному");
fs.writeFileSync(q, o);
console.log("ok");
