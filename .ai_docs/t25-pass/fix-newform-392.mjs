// The subsection "Naming", after the wording checker's third run and the second review of 7.2.4.1.
// - 7.2.4.1: a property is an entity, so its key would have been a name; a name now refers to an entity on its own.
//   "every rule" left out term nodes, so "every node". The method's concept in the list of examples is a node or a
//   link, which every reader is given; the example uses a request, which every system has.
// - 7.2.4.2: the specification does not coin names, whoever writes a node does; "only where" could read as a place.
// - 7.2.4.4: with "node" and "link" now names, "a node's `kind`" fell under the first form; the forms now differ by
//   how the object's name is written. The reason no longer opens with "its" before the property is named.
// - 7.2.4.5: the text opens with its main thought rather than with a condition; the reason's "in one relation" could
//   attach to two words, and "its definition" to two nouns.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-392.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const A = "s-9w3u3wn37wksyxd";
const GW = "s-me9k7g34jqb4rzn";
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 60));
  return s.replace(a, b);
};

// 7.2.4.1, the proposal.
const p = d["7.2.4.1"].proposals[0];
for (const [a, b] of [
  ["A name is the word or phrase that the specification gives to an entity.", "A name is the word or phrase by which the specification refers to an entity on its own."],
  ["- a concept of the method itself, such as SpecTag;", "- a concept of the guidelines, such as a node or a link;"],
  ["A name means the same thing in every rule that uses it.", "A name means the same thing in every node that uses it."],
  ["A term node titled \"refund\" gives a name to an entity", "A term node titled \"request\" gives a name to an entity"],
  ["A name is read in every rule that uses it, far from its definition. A reader applies those rules correctly only where the name means the same thing in all of them.", "A name is read in every node that uses it, far from its definition. A reader applies those nodes correctly only where the name means the same thing in all of them."],
]) p.en = swap(p.en, a, b);
for (const [a, b] of [
  ["Имя — это слово или выражение, которое спецификация даёт сущности.", "Имя — это слово или выражение, которым спецификация называет сущность саму по себе."],
  ["- понятие самого метода, такое как SpecTag;", "- понятие guidelines, такое как узел или связь;"],
  ["Имя значит одно и то же в каждом правиле, которое его использует.", "Имя значит одно и то же в каждом узле, который его использует."],
  ["Узел-термин с заголовком «refund» даёт имя сущности", "Узел-термин с заголовком «request» даёт имя сущности"],
  ["Имя читают в каждом правиле, которое его использует, вдали от его определения. Читатель правильно применяет эти правила, только если имя значит одно и то же во всех них.", "Имя читают в каждом узле, который его использует, вдали от его определения. Читатель правильно применяет эти узлы, только если имя значит одно и то же во всех них."],
]) p.ru = swap(p.ru, a, b);
p.why += " По замечаниям второго рецензента: имя называет сущность саму по себе, поэтому ключ свойства, записанный вместе с объектом, не имя (7.2.4.4); «в каждом узле», а не «в каждом правиле», потому что узел-термин не правило; в списке примеров — понятие guidelines, такое как узел или связь, а в примере — запрос, который есть в любой системе.";
delete d["7.2.4.1~"];

// 7.2.4.2.
const b = d["7.2.4.2"];
b.text = `Whoever writes a node coins a name (§${A}) for an entity only if the ordinary word for that entity also appears in the specification in another sense.`;
b.ruText = `Тот, кто пишет узел, придумывает имя (§${A}) для сущности, только если обычное слово для этой сущности встречается в спецификации также в другом смысле.`;

// 7.2.4.4.
const q = d["7.2.4.4"];
q.text = swap(q.text, "- where the object has a name (§" + A + ") of its own: that name, a dot and the key, all in code font, such as `TextRule.list`;\n- where the object has no name of its own: the key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.",
  "- where the object's name (§" + A + ") is written in code font: that name, a dot and the key, all in code font, such as `TextRule.list`;\n- where the object is named in ordinary words: the key in code font, with the object named in the same phrase, such as a node's `kind` or a link's `type`.");
q.ruText = swap(q.ruText, "- если у объекта есть собственное имя (§" + A + "): это имя, точка и ключ, всё шрифтом кода, например `TextRule.list`;\n- если у объекта нет собственного имени: ключ шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.",
  "- если имя (§" + A + ") объекта пишется шрифтом кода: это имя, точка и ключ, всё шрифтом кода, например `TextRule.list`;\n- если объект назван обычными словами: ключ шрифтом кода, а объект назван в той же фразе, например `kind` узла или `type` связи.");
q.reason = "A property's key written next to the property's object means the same thing in every node, even where the key is a general word. Code font sets the key apart from the ordinary word it may be.";
q.ruReason = "Ключ свойства, записанный рядом с объектом этого свойства, значит одно и то же в каждом узле, даже если сам ключ — общее слово. Шрифт кода отличает ключ от обычного слова, которым он может быть.";
q.changes.push("По замечанию рецензента 7.2.4.1: «узел» и «связь» теперь имена, поэтому формы различаются тем, как записано имя объекта: шрифтом кода или обычными словами.");

// 7.2.4.5.
const e = d["7.2.4.5"];
e.text = `A node that says how one entity (§${A}) relates to another keeps the name of each and states the relation in words.`;
e.ruText = `Узел, который говорит, как одна сущность (§${A}) относится к другой, сохраняет имя каждой из них, а отношение выражает словами.`;
e.reason = "A name coined to express one relation of an entity reads as the name of a new entity, and the reader looks for the definition of that new entity.";
e.ruReason = "Имя, придуманное, чтобы выразить одно отношение сущности, читается как имя новой сущности, и читатель ищет определение этой новой сущности.";

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
