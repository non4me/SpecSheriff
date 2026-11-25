// A proposal for the reason of the agreed 11.1.1 "Decomposition of the specification" (Domains extension): its sentence
// "A domain describes its API in the form of RecordTypes (§12.1)" cites a node of the RecordType extension, which 1.7.4,
// agreed on 2026-11-16, forbids. The sentence goes; the paragraph keeps what bears on domains alone: the `consumes`
// links, and a change outside the sections that other domains use leaving them unaffected.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-483.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["11.1.1"];
if (n.proposals) throw new Error("11.1.1 already holds a proposal");
const swap = (s, from, to) => { if (!s.includes(from)) throw new Error("not found: " + from); return s.split(from).join(to); };
const reason = swap(n.reason, "A domain describes its API in the form of RecordTypes (§s-7vm323mhry2enx3). Its header's `consumes` links name the sections of other domains it uses (§s-yggv9myedprnaa7). A change to a domain's rules outside its API and the sections others use then leaves the other domains unaffected.", "A domain's header names, in its `consumes` links, the sections of other domains that the domain uses (§s-yggv9myedprnaa7). A change to a domain's rules outside the sections that other domains use then leaves those domains unaffected.");
const ruReason = swap(n.ruReason, "Домен описывает API в формате RecordType (§s-7vm323mhry2enx3). Связи `consumes` в его заголовке называют разделы других доменов, которые он использует (§s-yggv9myedprnaa7). Тогда изменение правил домена вне его API и разделов, которыми пользуются другие, оставляет другие домены как есть.", "Связи `consumes` в заголовке домена называют разделы других доменов, которые он использует (§s-yggv9myedprnaa7). Тогда изменение правил домена вне разделов, которыми пользуются другие домены, оставляет эти домены как есть.");
n.proposals = [{
  where: "третий абзац обоснования",
  en: [`Title: ${n.title}`, `Text: ${n.text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${n.ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет согласованный 1.7.4: правило расширения «Домены» не ссылается на узлы расширения RecordType. Фраза «Домен описывает API в формате RecordType (§12.1)» убрана; вместе с ней из следующей фразы ушло «вне его API». Остальное обоснование не меняется.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const p = "D:/SpecSheriff/.ai_docs/t25-one-thought.md";
let t = fs.readFileSync(p, "utf8");
const anchor = "Once the owner agrees to the procedure, the agent drafts the change";
const add = `The owner accepted the proposal for 12.6 on 2026-11-18 («ок»), and accept-proposal.mjs wrote it into the draft. No node of section 12 now names a domain in its text or reason, or cites a node of the Domains extension. An EngStickler reader agent is reading the English of the five reworded nodes (agreed-12-en.md in the scratchpad).

The reason of 11.1.1 (Domains extension) cited 12.1, a node of the RecordType extension, which 1.7.4 forbids. fix-newform-483.mjs wrote a proposal, now shown to the owner: the sentence "A domain describes its API in the form of RecordTypes" goes, and the next sentence no longer says "outside its API". The example of 7.2.7, listed in the queue, names neither domains nor RecordTypes and needs no change.

`;
if (!t.includes(anchor)) throw new Error("anchor");
t = t.split(anchor).join(add + anchor);
fs.writeFileSync(p, t);

const q = "D:/SpecSheriff/.ai_docs/t25-pass/queue-outline.md";
let o = fs.readFileSync(q, "utf8");
const a2 = "- сейчас: принимаете 12.6 «Варианты RecordType» без доменов?\n";
const b2 = "- ✓ 12.6 без доменов — принят; раздел 12 больше не называет домены\n- сейчас: принимаете правку обоснования 11.1.1 — без ссылки на RecordType?\n";
if (!o.includes(a2)) throw new Error("outline");
o = o.split(a2).join(b2);
o = o.split("- ● переписать раздел 12 в общих терминах (решение 16 ноября): 12.1 ✓, 12.4 ✓, 12.12 ✓, 12.5 ✓, 12.6 ● — по одному\n").join("- ✓ раздел 12 без доменов (решение 16 ноября): 12.1, 12.4, 12.12, 12.5, 12.6 — приняты\n");
o = o.split("- ○ переписать общими словами согласованные 12.1, 12.4, 12.5, 12.6, обоснование 11.1.1 и пример в 7.2.7\n").join("- ● обоснование 11.1.1 без ссылки на RecordType — показываю; пример в 7.2.7 менять не нужно\n");
fs.writeFileSync(q, o);
console.log("ok");
