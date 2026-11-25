// The subsection "Naming": the owner's ruling of 2026-11-16 («то что ты называешь в 7.2.4 вещь — это сущность
// (entity)»). "thing" becomes "entity" («сущность»), as node 3.3 uses the word: a term introduces an entity.
// - 7.2.4.1: a name refers to an entity, citing 3.3, or to a field used apart from its object, since a field is not
//   what a term introduces and the rules on names must still reach field names.
// - 7.2.4.2: its first condition listed "a procedure, an entity, a constant or a variable" as kinds of the thing; with
//   the thing now an entity, the condition says nothing more, so one condition is left and the list goes.
// - 7.2.4.3: the first sentence speaks of the name of an entity; the sentence on general words covers any name, a
//   field's included. The reason no longer speaks of things.
// - 7.2.4.5: the thing and its position become the entity and its position.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-390.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const entity = "s-khqsmy6mhejkrhg";
const gw = "s-me9k7g34jqb4rzn";
const note = "Слово «вещь» заменено на «сущность» (entity), по вашему решению от 16 ноября.";

// 7.2.4.1, the proposal.
const aEn = [
  `A name is the word or phrase by which the specification refers to an entity (§${entity}), or to a field used apart from its object. A name says by itself what it names, in whatever rule it is read.`,
  "The rules of this section apply to a name where the specification defines it, and to a node's text, reason, list members and table cells.",
].join("\n\n");
const aRu = [
  `Имя — это слово или выражение, которым спецификация называет сущность (§${entity}) или поле, используемое отдельно от своего объекта. Имя само говорит, что оно называет, в каком бы правиле его ни читали.`,
  "Правила этого раздела распространяются на имя там, где его определяет спецификация, а также на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const a = d["7.2.4.1"], p = a.proposals[0];
const reasonEn = p.en.split("Reason: ")[1];
const reasonRu = p.ru.split("Обоснование: ")[1];
p.en = ["Title: What a name is", "", `Text: ${aEn}`, "", `Reason: ${reasonEn}`].join("\n");
p.ru = ["Заголовок: Что такое имя", "", `Текст: ${aRu}`, "", `Обоснование: ${reasonRu}`].join("\n");
const was = "Стало: «Имя — это слово или выражение, которым спецификация называет то, что она определяет, например термин или поле, используемое отдельно от своего объекта.";
if (!p.why.includes(was)) throw new Error("why of 7.2.4.1");
p.why = p.why.replace(was, `Стало: «Имя — это слово или выражение, которым спецификация называет сущность (§${entity}) или поле, используемое отдельно от своего объекта.`);
p.why += ` Сущность — это то, что вводит термин (узел 3.3); поле названо отдельно, потому что его вводит не термин, а правила об именах должны действовать и на имена полей.`;
const t = d["7.2.4.1~"];
if (t) Object.assign(t, { text: aEn, ruText: aRu });

// 7.2.4.2.
const b = d["7.2.4.2"];
b.title = "When an entity gets a special name";
b.ruTitle = "Когда сущность получает особое имя";
b.text = "An entity gets a special name, made for the specification rather than taken from ordinary language, only where the ordinary word for the entity also appears in the specification in its ordinary sense.";
b.ruText = "Сущность получает особое имя, созданное для спецификации, а не взятое из обычной речи, только если обычное слово для этой сущности встречается в спецификации и в своём обычном смысле.";
b.changes.push(note + " Первое условие, «эта вещь — процедура, сущность, константа или переменная», отпало: особое имя теперь получает сущность, и условие ничего к этому не добавляет.");

// 7.2.4.3.
const c = d["7.2.4.3"];
c.text = `The name of an entity says what the entity is, by how the entity is used or by what it holds. A general word (§${gw}) serves as a name only together with what it applies to.`;
c.ruText = `Имя сущности говорит, что это за сущность: как её используют или что она содержит. Общее слово (§${gw}) служит именем только вместе с тем, к чему оно относится.`;
c.reason = "A name that does not say what it names fits many meanings, and the context of each rule picks a different one. A field called type, for example, held the kind of request in one log, the user's action in another and the kind of error in a third.";
c.ruReason = "Имя, которое не говорит, что оно называет, подходит под многие значения, и контекст каждого правила выбирает своё. Например, поле с именем type содержало вид запроса в одном журнале, действие пользователя в другом и вид ошибки в третьем.";
c.changes.push(note + " Первое предложение говорит об имени сущности; предложение об общем слове относится к любому имени, в том числе к имени поля.");

// 7.2.4.5.
const e = d["7.2.4.5"];
e.ruTitle = "Положение сущности";
e.text = "An entity that has a name keeps that name in every position. A node states the entity's position in words next to the name, such as \"the owner of a section\".";
e.ruText = "Сущность, у которой есть имя, сохраняет это имя в любом положении. Узел называет положение сущности словами рядом с её именем, например «ответственный за раздел».";
e.reason = "A new compound name for a position reads as a new entity, and the reader looks for its definition. Called by its own name, the entity stays one entity in every position.";
e.ruReason = "Новое составное имя для положения читается как новая сущность, и читатель ищет её определение. Названная своим именем, сущность остаётся одной и той же в любом положении.";
e.changes.push(note);

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
for (const [x, y] of [
  ['"When a thing gets a special name","Когда вещь получает особое имя"', '"When an entity gets a special name","Когда сущность получает особое имя"'],
  ['"Positions","Положение вещи"', '"Positions","Положение сущности"'],
]) {
  if (!h.includes(x)) throw new Error("page: " + x);
  h = h.replace(x, y);
}
fs.writeFileSync(page, h);
console.log("ok");
