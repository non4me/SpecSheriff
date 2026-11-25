// Writes 11.1.2 in the wording the owner dictated on 2026-11-19 and marks it agreed: a domain's document that is too
// large may be divided into several smaller documents, and a section is the smallest recommended part moved into a
// separate document. Then proposes that row 11.3.1 require exactly one header per domain, and writes the state reached
// into the continuation file, the queue outline and the index, with the corrections EngStickler's readers confirmed in
// batch 21.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (s, pairs, where) => {
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  return s;
};

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
const n = nf["11.1.2"];
n.text = [
  "If the specification is divided into domains, each domain, the contracts section, the technical appendix and the guidelines are kept in separate documents.",
  "",
  "If a domain's document is too large, it may be divided into several smaller documents. The smallest recommended part of the domain to move into a separate document is a section.",
].join("\n");
n.ruText = [
  "Если спецификация разделена по доменам, то каждый домен, контракты, техническое приложение и guidelines хранятся в отдельных документах.",
  "",
  "Если документ домена слишком велик, он может быть разделён на несколько документов меньшего размера. Наименьшая рекомендованная часть домена, которую выносят в отдельный документ, — раздел.",
].join("\n");
n.reason = "A large document is hard to read and edit, and hard for a model to load into its context window. Its owners decide how to divide it. A section is the smallest recommended part of the division, since the rules of a section are read together.";
n.ruReason = "Большой документ неудобно читать и править, а модели — загружать в контекстное окно. Как его разделить, ответственные решают сами. Раздел — наименьшая рекомендованная часть деления, потому что правила раздела читают вместе.";
delete n.proposals;
n.changes.push("Вы продиктовали 19 ноября второй абзац: «Если документ домена слишком велик, он может быть разделён на несколько документов меньшего размера. Наименьшая рекомендованная часть домена, которую выносят в отдельный документ, — раздел». Обоснование переписано по вашему объяснению; в нём «наименьшая часть» стала «наименьшей рекомендованной частью», как в тексте.");
n.agreed = "2026-11-19";
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(new URL("english-11-1-2.md", here), [
  "# The English of 11.1.2, agreed by the owner on 2026-11-19",
  "",
  `## ${n.title}`,
  "",
  n.text,
  "",
  `Reason: ${n.reason}`,
  "",
].join("\n"));

const tFile = new URL("table-11-3.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const r1 = t.tables[0].rows.find((r) => r.num === "11.3.1");
r1.proposals = [{
  en: "Every domain has exactly one header",
  ru: "У каждого домена ровно один заголовок",
  why: "Спецификация домена открывается его заголовком (11.1.3), и в разделённом на документы домене заголовок не повторяется (ваше объяснение 19 ноября). Сейчас инструменты SpecSheriff проверяют только, что заголовок есть, а из двух заголовков молча берут последний.",
}];
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 17:10 UTC):**");
const end = s.indexOf("The reviewer also found a terminology clash:", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 17:20 UTC):** row 11.3.1 of table 11.3 is being presented to the owner, in the proposed wording \"Every domain has exactly one header\" («У каждого домена ровно один заголовок»).",
  "The SpecSheriff tools check only that a domain has a header; if a domain has two headers, they silently use the later one.",
  "On 2026-11-19 the owner dictated the second paragraph of 11.1.2, and 11.1.2 was written and marked agreed (agree-11-1-2.mjs): if a domain's document is too large, it may be divided into several smaller documents, and the smallest recommended part of the domain to move into a separate document is a section.",
  "The text does not mention the context window, since the owner explained it as one reason among others, and owners may have reasons of their own; the reason mentions it.",
  "english-11-1-2.md contains the English text of 11.1.2 for EngStickler's thorough reader.",
  "The owner's rulings of 2026-11-19 are recorded in the `decisions` field of the draft of 11.1.2: the permission to divide a large domain stays, a section is the smallest unit of the division, and the owners of the domain choose how to divide it.",
  "The header of a split domain may have a document of its own or share the first document with sections; 11.1.3 already requires a domain's specification to open with its header.",
  "The owner explained two principles of division, the logical one into domains and the physical one into documents, so that the agent would understand how the specification is divided; on 2026-11-19 the owner ruled that they are not to be written into the specification as rules, and that the existing rules are to be reworded in light of them.",
  "The draft row 11.3.7, never agreed, was deleted, since a section cannot span several files.",
].join(" ") + "\n\n" + s.slice(end);
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 11.1.2: новая формулировка — несколько документов, каждый раздел целиком в одном\n- ○ 11.3.1: у домена один заголовок\n", "- ✓ 11.1.2 в вашей формулировке: большой документ домена можно разделить; наименьшая рекомендованная часть — раздел\n- ● 11.3.1: у каждого домена ровно один заголовок\n"],
  ["### ◐ 11.1.2 в новой формулировке — спрашиваю сейчас\n- документ домена можно разделить на несколько документов; каждый раздел — целиком в одном\n", "### ◐ строка 11.3.1 — спрашиваю сейчас\n- одобренная: «У каждого домена есть заголовок»\n- предлагаю: «У каждого домена ровно один заголовок»\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [
  ["state-11-1-2.mjs records that state in the continuation file, the queue outline and this index.", "state-11-1-2.mjs records the resulting state in the continuation file, the queue outline and this index."],
  ["propose-11-1-2-b.mjs rewrites the proposal for 11.1.2 so that its text names no context window.", "propose-11-1-2-b.mjs rewrites the proposal for 11.1.2 so that the proposed text does not mention the context window. agree-11-1-2.mjs writes 11.1.2 in the wording the owner dictated, marks it agreed, and proposes that row 11.3.1 require exactly one header per domain."],
], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
