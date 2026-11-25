// Records in the continuation file, the queue outline and the index that the new wording of 11.1.2 is being presented
// to the owner, and that the draft row 11.3.7 is deleted.
import fs from "node:fs";

const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (s, pairs, where) => {
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  return s;
};

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 16:35 UTC):**");
const end = s.indexOf("The reviewer also found a terminology clash:", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 17:00 UTC):** a new wording of 11.1.2 is being presented to the owner (propose-11-1-2.mjs).",
  "Its second paragraph says that the owners of a domain whose document is too large may divide it into several documents, each section of the domain kept whole in one document.",
  "Its reason says that domains are separated by meaning and a domain's document is divided by size alone, a section being the smallest part of such a division.",
  "It follows the owner's rulings of 2026-11-19, recorded in the `decisions` field of the draft of 11.1.2: the permission to divide a large domain stays, a section is the smallest unit of the division, and how to divide is the owners' choice.",
  "The header of a split domain may have a document of its own or share the first document with sections; 11.1.3 already requires a domain's specification to open with its header.",
  "The owner explained two principles of division, the logical one into domains and the physical one into documents, so that the agent would understand the model; on 2026-11-19 the owner ruled that they are not to be written into the specification as rules, and only the existing rules are to be worded better from them.",
  "The draft row 11.3.7, never agreed, was deleted, since a section cannot span several files.",
  "The check that matters now is that a domain has one header: the SpecSheriff tools check only that a domain has a header, and they silently take the last of two. After 11.1.2, the agent proposes to make row 11.3.1, \"Every domain has a header\", say one header.",
  "",
  "",
].join(" ").trim() + "\n\n" + s.slice(end);
fs.writeFileSync(cont, s);

const oFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(oFile, "utf8");
o = fix(o, [
  ["- ● 11.3.7: один раздел на документ; вопрос — где лежит заголовок разделённого домена\n", "- ✓ 11.1.2: разрешение делить большой домен на документы остаётся; раздел — наименьшая единица деления (ваше решение)\n- ✓ черновик строки 11.3.7 убран: раздел и так не может лежать в двух файлах\n- ● 11.1.2: новая формулировка — несколько документов, каждый раздел целиком в одном\n- ○ 11.3.1: у домена один заголовок\n"],
  ["### ◐ строка 11.3.7 — спрашиваю сейчас\n- разделённый на документы домен: заголовок в своём документе? рекомендую да\n- тогда сначала дополняется 11.1.2\n", "### ◐ 11.1.2 в новой формулировке — спрашиваю сейчас\n- документ домена можно разделить на несколько документов; каждый раздел — целиком в одном\n"],
], "outline");
fs.writeFileSync(oFile, o);

const iFile = docs + "INDEX.md";
let x = fs.readFileSync(iFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [["grill-11-1-2-q2.mjs records the owner's ruling that a section is the smallest unit into which a document is divided.", "grill-11-1-2-q2.mjs records the owner's ruling that a section is the smallest unit into which a document is divided. propose-11-1-2.mjs proposes the new wording of 11.1.2 and deletes the draft row 11.3.7; state-11-1-2.mjs records that state."]], "index");
fs.writeFileSync(iFile, x);
console.log("ok", ts);
