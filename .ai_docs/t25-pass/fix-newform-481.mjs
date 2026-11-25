// A proposal for the agreed 12.5 "Guaranteed fields", carrying out the owner's ruling of 2026-11-16 in the words of the
// agreed 12.1, 12.4 and 12.12: "the domain" becomes "the part of the system that outputs the data", and the citation of
// 11.1.1, a node of the Domains extension, goes, since 1.7.4 lets a rule of an extension cite only the guidelines and its
// own extension. Both examples keep their agreed text and open by placing the domain in a base specification divided
// into domains.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-481.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.5"];
if (n.proposals) throw new Error("12.5 already holds a proposal");
const RT = "s-7vm323mhry2enx3";
const RC = "s-e877bnfa559tvk9";
const text = `A RecordType (§${RT}) marks a field as guaranteed only where at least one of these holds:\n\n- the part of the system that outputs the data sets the field's value when it creates a data record, and the field keeps a value from then on;\n- that part of the system itself computes or observes the field's value whenever it outputs or stores a data record;\n- that part of the system outputs or stores a data record only once it has the field's value, such as an identifier from an external system.`;
const ruText = `RecordType (§${RT}) отмечает поле как гарантированное, только если верно хотя бы одно из следующего:\n\n- часть системы, которая выдаёт эти данные, задаёт значение поля, когда создаёт запись данных, и с тех пор у поля всегда есть значение;\n- эта часть системы сама вычисляет или наблюдает значение поля всякий раз, когда выдаёт или сохраняет запись данных;\n- эта часть системы выдаёт или сохраняет запись данных, только когда значение поля у неё уже есть, например идентификатор от внешней системы.`;
const reason = `A guaranteed field tells the parts of the system that read the data what they can rely on. Where a field whose value may be missing is marked as guaranteed, the part of the system that outputs the data has to invent a value for it. If that part does not invent a value, the RuntimeCheck (§${RC}) generated from the RecordType refuses a correct data record.`;
const ruReason = `Гарантированное поле сообщает частям системы, которые читают данные, на что они могут полагаться. Если поле, значения которого может не быть, отмечено как гарантированное, части системы, которая выдаёт данные, приходится выдумывать для него значение. Если эта часть значения не выдумывает, RuntimeCheck (§${RC}), сгенерированный из RecordType, отклоняет правильную запись данных.`;
const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const examples = n.examples.map((e) => `In a base specification divided into domains, ${lower(e)}`);
const ruExamples = n.ruExamples.map((e) => `В базовой спецификации, разделённой на домены, ${lower(e)}`);
n.proposals = [{
  where: "текст, обоснование и оба примера",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет ваше решение от 16 ноября теми же словами, что и принятые 12.1, 12.4 и 12.12: «домен» — «часть системы, которая выдаёт эти данные». Ссылка на 11.1.1 (определение домена) убрана: по 1.7.4 правило расширения ссылается только на guidelines и на своё расширение. Оба примера те же, что вы согласовали, с тем же началом.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const fixes = [
  ["\"a domain\" becomes \"a part of the system\", in the same words as in 12.1,", "the word \"domain\" becomes \"a part of the system\", with the same wording as in 12.1,"],
  ["fix-newform-480.mjs then wrote the proposal for 12.12, now shown to the owner, in the same words:", "fix-newform-480.mjs then wrote the proposal for 12.12, then shown to the owner. It is worded as 12.1 and 12.4 are:"],
];
for (const [a, b] of fixes) {
  if (!t.includes(a)) { console.log("MISSING: " + a.slice(0, 60)); continue; }
  t = t.split(a).join(b);
}
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner accepted the proposal for 12.12 on 2026-11-18 («ок»), and accept-proposal.mjs wrote it into the draft. fix-newform-481.mjs then wrote the proposal for 12.5, now shown to the owner: "the domain" becomes "the part of the system that outputs the data", and the citation of 11.1.1, a node of the Domains extension, goes, as 1.7.4 requires. 12.6 comes next.

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);

const q = "D:/SpecSheriff/.ai_docs/t25-pass/queue-outline.md";
let o = fs.readFileSync(q, "utf8");
const a2 = "- сейчас: принимаете 12.12 «На что может ссылаться RecordType» без доменов?\n";
const b2 = "- ✓ 12.12 без доменов — принят\n- сейчас: принимаете 12.5 «Гарантированные поля» без доменов?\n";
if (!o.includes(a2)) throw new Error("outline");
o = o.split(a2).join(b2);
o = o.split("12.1 ✓, 12.4 ✓, 12.12 ●, 12.5, 12.6 — по одному").join("12.1 ✓, 12.4 ✓, 12.12 ✓, 12.5 ●, 12.6 — по одному");
fs.writeFileSync(q, o);
console.log("ok");
