// A proposal for the agreed 12.6 "RecordType variants", carrying out the owner's ruling of 2026-11-16 in the words of the
// agreed 12.1, 12.4, 12.5 and 12.12: "in the same domain" becomes "in the same section of the base specification", and
// the citation of 11.1.1, a node of the Domains extension, is replaced by the citation of 3.1, which defines the contracts
// section in the SpecSheriff guidelines; "the domains reading its data records" becomes "the parts of the system that
// read its data records". The second example is about domains and opens as the examples of 12.1 to 12.5 do.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-482.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.6"];
if (n.proposals) throw new Error("12.6 already holds a proposal");
const swap = (s, from, to) => { if (!s.includes(from)) throw new Error("not found: " + from); return s.split(from).join(to); };
const CONTRACTS = "s-z6tq6a3btnvvwx7";
const text = swap(n.text, "- is declared where the RecordType that it is a variant of is declared: in the same domain or in the contracts section (§s-h6h25ctd3yryudh);", `- is declared where the RecordType that it is a variant of is declared: in the same section of the base specification or in the contracts section (§${CONTRACTS});`);
const ruText = swap(n.ruText, "- объявлен там же, где RecordType, вариантом которого он является: в том же домене или в контрактах (§s-h6h25ctd3yryudh);", `- объявлен там же, где RecordType, вариантом которого он является: в том же разделе базовой спецификации или в контрактах (§${CONTRACTS});`);
const reason = swap(swap(n.reason, "a RecordType alone does not describe every field that the domains reading its data records can expect.", "a RecordType alone does not describe every field that the parts of the system that read its data records can expect."), "those domains find the whole description", "those parts of the system find the whole description");
const ruReason = swap(swap(n.ruReason, "сам RecordType описывает не все поля, которых могут ожидать домены, читающие его записи данных.", "сам RecordType описывает не все поля, которых могут ожидать части системы, читающие его записи данных."), "эти домены находят полное описание", "эти части системы находят полное описание");
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const examples = [n.examples[0], `In a base specification divided into domains, ${lower(n.examples[1])}`];
const ruExamples = [n.ruExamples[0], `В базовой спецификации, разделённой на домены, ${lower(n.ruExamples[1])}`];
n.proposals = [{
  where: "второй абзац текста, обоснование и второй пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет ваше решение от 16 ноября теми же словами, что и принятые 12.1–12.12: «в том же домене» — «в том же разделе базовой спецификации», «домены, читающие его записи» — «части системы, читающие его записи». Ссылка на 11.1.1 заменена ссылкой на 3.1: контракты определяет SpecSheriff guidelines. Второй пример — о доменах, он получил то же начало, что в 12.1–12.5; первый пример доменов не называет и не меняется.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner accepted the proposal for 12.5 on 2026-11-18 («ок»), and accept-proposal.mjs wrote it into the draft. fix-newform-482.mjs then wrote the proposal for 12.6, now shown to the owner: a RecordType variant is declared in the same section of the base specification as its RecordType, or in the contracts section, now cited by 3.1 instead of 11.1.1.

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);

const q = "D:/SpecSheriff/.ai_docs/t25-pass/queue-outline.md";
let o = fs.readFileSync(q, "utf8");
const a2 = "- сейчас: принимаете 12.5 «Гарантированные поля» без доменов?\n";
const b2 = "- ✓ 12.5 без доменов — принят\n- сейчас: принимаете 12.6 «Варианты RecordType» без доменов?\n";
if (!o.includes(a2)) throw new Error("outline");
o = o.split(a2).join(b2);
o = o.split("12.1 ✓, 12.4 ✓, 12.12 ✓, 12.5 ●, 12.6 — по одному").join("12.1 ✓, 12.4 ✓, 12.12 ✓, 12.5 ✓, 12.6 ● — по одному");
fs.writeFileSync(q, o);
console.log("ok");
