// The subsection "Naming", after the wording checker.
// - 7.2.4.1: its title promises a definition, so the text now opens with what a name is, as the owner asked, and then
//   states what a name must do; "such a name" in the scope paragraph pointed back into the paragraph before, and the
//   defined word "name" now carries the scope by itself; the reason's "Only" could attach to two phrases.
// - 7.2.4.2: the sentence after the list, "Any other thing is called by its ordinary word", named no actor and only
//   restated the "only" of the lead, which the owner's rule on lists forbids; "the thing" in the reason pointed into
//   the text.
// - 7.2.4.4: "general word" now cites node 7.2.3 at its first use (node 7.2.7).
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-389.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (o, f, a, b) => {
  if (!o[f].includes(a)) throw new Error(`not found in ${f}: ${a.slice(0, 50)}`);
  o[f] = o[f].replace(a, b);
};

const aEn = [
  "A name is the word or phrase by which the specification refers to a thing that it defines, such as a term, or a field used apart from its object. A name says by itself what it names, in whatever rule it is read.",
  "The rules of this section apply to a name where the specification defines it, and to a node's text, reason, list members and table cells.",
].join("\n\n");
const aRu = [
  "Имя — это слово или выражение, которым спецификация называет то, что она определяет, например термин или поле, используемое отдельно от своего объекта. Имя само говорит, что оно называет, в каком бы правиле его ни читали.",
  "Правила этого раздела распространяются на имя там, где его определяет спецификация, а также на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const aReason = "A name is read in every rule that uses it, far from its definition. It means the same thing in each of those rules only if it says by itself what it names.";
const aRuReason = "Имя читают в каждом правиле, которое его использует, вдали от его определения. Оно значит одно и то же в каждом из этих правил, только если само говорит, что оно называет.";
const p = d["7.2.4.1"].proposals[0];
p.en = ["Title: What a name is", "", `Text: ${aEn}`, "", `Reason: ${aReason}`].join("\n");
p.ru = ["Заголовок: Что такое имя", "", `Текст: ${aRu}`, "", `Обоснование: ${aRuReason}`].join("\n");
const oldNew = "Стало: «Имя, которое определяет спецификация, само говорит, что оно называет, в каком бы правиле его ни читали. Таким именем может быть, например, термин или поле, используемое отдельно от своего объекта.» и абзац об области действия.";
if (!p.why.includes(oldNew)) throw new Error("why: text");
p.why = p.why.replace(oldNew, "Стало: «Имя — это слово или выражение, которым спецификация называет то, что она определяет, например термин или поле, используемое отдельно от своего объекта. Имя само говорит, что оно называет, в каком бы правиле его ни читали.» и абзац об области действия. Узел начинается с того, что такое имя, а затем говорит, чего от имени требуют.");
const oldReason = "Стало: «Имя, которое определяет спецификация, читают в каждом правиле, которое его использует, вдали от его определения. Только имя, которое само говорит, что оно называет, значит одно и то же в каждом из этих правил.»";
if (!p.why.includes(oldReason)) throw new Error("why: reason");
p.why = p.why.replace(oldReason, `Стало: «${aRuReason}»`);
const t = d["7.2.4.1~"];
if (t) Object.assign(t, { text: aEn, reason: aReason, ruText: aRu, ruReason: aRuReason });

const b = d["7.2.4.2"];
swap(b, "text", "\n\nAny other thing is called by its ordinary word.", "");
swap(b, "ruText", "\n\nЛюбую другую вещь называют её обычным словом.", "");
b.reason = "An unneeded special name suggests to the reader a special meaning that is not there. It is also one more name that every reader has to learn.";
b.ruReason = "Ненужное особое имя внушает читателю особый смысл, которого нет. Кроме того, это ещё одно имя, которое приходится выучить каждому читателю.";

const dd = d["7.2.4.4"];
swap(dd, "text", "So a property's key may be a general word.", "So a property's key may be a general word (§s-me9k7g34jqb4rzn).");
swap(dd, "ruText", "Поэтому ключ свойства может быть общим словом.", "Поэтому ключ свойства может быть общим словом (§s-me9k7g34jqb4rzn).");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
