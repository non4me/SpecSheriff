// Rewrites the proposal for 11.1.2 after the owner's remark of 2026-11-19: the text names no context window, since the
// owners may have reasons of their own for dividing a large document; a section is the smallest part moved into a
// document of its own. Writes the state into the continuation file and the index, with the corrections EngStickler's
// readers confirmed in batch 20.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${f}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  fs.writeFileSync(f, s);
};

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
const n = nf["11.1.2"];
const enText = [
  "If the specification is divided into domains, each domain, the contracts section, the technical appendix and the guidelines are kept in separate documents.",
  "",
  "If a domain's document is too large, its owners may divide it into several smaller documents. A section is the smallest part of the domain that is moved into a separate document.",
].join("\n");
const ruText = [
  "Если спецификация разделена по доменам, то каждый домен, контракты, техническое приложение и guidelines хранятся в отдельных документах.",
  "",
  "Если документ домена слишком велик, ответственные за домен могут разделить его на несколько документов меньшего размера. Наименьшая часть домена, которую выносят в отдельный документ, — раздел.",
].join("\n");
const enReason = "A large document is hard to read and edit, and hard for a model to load into its context window. Its owners decide how to divide it. A section is the smallest part of the division, since the rules of a section are read together.";
const ruReason = "Большой документ неудобно читать и править, а модели — загружать в контекстное окно. Как его разделить, ответственные решают сами. Раздел — наименьшая часть деления, потому что правила раздела читают вместе.";
n.proposals = [{
  en: [`Title: ${n.title}`, `Text: ${enText}`, `Reason: ${enReason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "По вашим решениям от 19 ноября: раздел — наименьшая единица деления, как делить — решают ответственные; контекстное окно в тексте не называется, потому что у ответственных могут быть и свои причины разделить документ.",
}];
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 17:00 UTC):**");
const end = s.indexOf("The reviewer also found a terminology clash:", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 17:10 UTC):** a second wording of 11.1.2 is being presented to the owner (propose-11-1-2-b.mjs).",
  "Its second paragraph says that the owners of a domain whose document is too large may divide it into several smaller documents, and that a section is the smallest part of the domain moved into a separate document.",
  "The text names no context window: on 2026-11-19 the owner remarked that the context window was one reason, explained to the agent, and that owners may have reasons of their own.",
  "The reason says that a large document is hard to read, to edit and to load into a context window, that its owners decide how to divide it, and that a section is the smallest part of the division since its rules are read together.",
  "The wording follows the owner's rulings of 2026-11-19, recorded in the `decisions` field of the draft of 11.1.2: the permission to divide a large domain stays, a section is the smallest unit of the division, and the owners of the domain choose how to divide it.",
  "The header of a split domain may have a document of its own or share the first document with sections; 11.1.3 already requires a domain's specification to open with its header.",
  "The owner explained two principles of division, the logical one into domains and the physical one into documents, so that the agent would understand how the specification is divided; on 2026-11-19 the owner ruled that they are not to be written into the specification as rules, and that the existing rules are to be reworded in the light of them.",
  "The draft row 11.3.7, never agreed, was deleted, since a section cannot span several files.",
  "The check that matters now requires a domain to have exactly one header: the SpecSheriff tools check only that a domain has a header, and of two headers they silently take the later one. Once 11.1.2 is agreed, the agent proposes that row 11.3.1, \"Every domain has a header\", say that every domain has exactly one header.",
].join(" ") + "\n\n" + s.slice(end);
fs.writeFileSync(cont, s);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
fs.writeFileSync(iFile, x);
fix(iFile, [
  ["grill-11-1-2-q2.mjs records the owner's ruling that a section is the smallest unit into which a document is divided.", "grill-11-1-2-q2.mjs records the owner's ruling that, when a domain's document is divided into several documents, a section is the smallest unit of the division."],
  ["propose-11-1-2.mjs proposes the new wording of 11.1.2 and deletes the draft row 11.3.7; state-11-1-2.mjs records that state.", "propose-11-1-2.mjs proposes the new wording of 11.1.2 and deletes the draft row 11.3.7, which was never agreed; state-11-1-2.mjs records that state in the continuation file, the queue outline and this index. propose-11-1-2-b.mjs rewrites the proposal for 11.1.2 so that its text names no context window."],
]);
console.log("ok", ts);
