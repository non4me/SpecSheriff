// Records row 11.3.1 as agreed in the wording "Every domain has exactly one header", corrects the English text of the
// agreed 11.1.2 after EngStickler's thorough reader, and writes the state reached, with the question on the rule about
// sections put to the owner next; applies the corrections EngStickler's readers confirmed in batch 22.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
  return s.split(a).join(b);
};

const tFile = new URL("table-11-3.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const r1 = t.tables[0].rows.find((r) => r.num === "11.3.1");
r1.en = r1.proposals[0].en;
r1.ru = r1.proposals[0].ru;
delete r1.proposals;
r1.agreed = "2026-11-19";
r1.change += " Вы согласовали 19 ноября («ок») уточнённую формулировку: у каждого домена ровно один заголовок. Заголовок, скопированный в другой документ разделённого домена, инструменты раньше пропускали.";
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const nFile = new URL("newform.json", here);
const nf = JSON.parse(fs.readFileSync(nFile, "utf8"));
const n = nf["11.1.2"];
n.text = swap(n.text, "the technical appendix and the guidelines are kept in separate documents.", "the technical appendix and the guidelines are each kept in a document of their own.", "11.1.2 text");
n.text = swap(n.text, "The smallest recommended part of the domain to move into a separate document is a section.", "The smallest part of the domain that is recommended for a separate document is a section.", "11.1.2 text");
n.reason = swap(n.reason, "and hard for a model to load into its context window. Its owners decide how to divide it. A section is the smallest recommended part of the division,", "and hard for a language model to load into its context window. The owners of the domain decide how to divide its document. A section is the smallest part recommended for a separate document,", "11.1.2 reason");
n.changes.push("Только английский текст, по замечаниям вдумчивого читателя EngStickler. Смысл не изменился.");
fs.writeFileSync(nFile, JSON.stringify(nf, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 17:20 UTC):**");
const end = s.indexOf("The reviewer also found a terminology clash:", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 17:30 UTC):** the question on the rule about sections is put to the owner; it is the first item under \"Waits on the owner\" below.",
  "The stress test of how a specification is divided is closed: on 2026-11-19 the owner agreed to 11.1.2 in the wording the owner dictated, and to row 11.3.1 in the wording \"Every domain has exactly one header\".",
  "11.1.2 now says that a domain's document that is too large may be divided into several smaller documents, and that the smallest part of the domain recommended for a separate document is a section.",
  "The `text` field of 11.1.2 does not mention the context window, since the owner gave it as one of several reasons and the owners of a domain may have reasons of their own; the `reason` field mentions it.",
  "EngStickler's thorough reader read the English text of 11.1.2 (english-11-1-2.md), and agree-11-3-1.mjs corrected it without changing its meaning.",
  "The owner's rulings of 2026-11-19 are recorded in the `decisions` field of the draft of 11.1.2: the permission to divide a large domain stays, a section is the smallest unit of the division, and the owners of the domain choose how to divide it.",
  "The header of a split domain may have a document of its own or share the first document with sections; 11.1.3 already requires a domain's specification to open with its header.",
  "The owner explained two principles of division, the logical one into domains and the physical one into documents, so that the agent would understand how the specification is divided; on 2026-11-19 the owner ruled that they are not to be written into the specification as rules, and that the existing rules are to be reworded in light of them.",
  "The draft row 11.3.7, never agreed, was deleted, since a section cannot span several files.",
  "In the step that changes the SpecSheriff tools, `sheriff validate` is to refuse a domain with two headers.",
].join(" ") + "\n\n" + s.slice(end);
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = swap(o, "- ● 11.3.1: у каждого домена ровно один заголовок\n", "- ✓ 11.3.1: у каждого домена ровно один заголовок\n", "outline");
o = swap(o, "### ◐ строка 11.3.1 — спрашиваю сейчас\n- одобренная: «У каждого домена есть заголовок»\n- предлагаю: «У каждого домена ровно один заголовок»\n\n### ◐ правило о разделах: в базу или в skill spec-review\n- спрошу после ревью базы\n", "### ◐ правило о разделах: в базу или в skill spec-review — спрашиваю сейчас\n- рекомендую указание в spec-review, а не правило базы\n", "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = swap(x, "agree-11-1-2.mjs writes 11.1.2 in the wording the owner dictated, marks it agreed, and proposes", "agree-11-1-2.mjs writes 11.1.2 in the wording the owner dictated, marks it as agreed, and proposes", "index");
x = swap(x, "require exactly one header per domain.", "require exactly one header per domain. agree-11-3-1-b.mjs marks row 11.3.1 as agreed and corrects the English text of 11.1.2.", "index");
x = swap(x, "agree-11-3-1.mjs records row 11.3.1 as agreed and adds row 11.3.2,", "agree-11-3-1.mjs, overwritten by mistake on 2026-11-19 and then deleted, recorded row 11.3.1 as agreed and added row 11.3.2,", "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
