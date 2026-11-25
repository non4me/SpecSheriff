// Applies the wording checker's findings to the draft 12.9 (2026-11-18): the field of type `one of` cites 12.7 at its first
// use; "gathered anew ... and never written by hand" becomes two sentences, the second stated positively, as the owner
// prefers (only the SpecSheriff tools write them); the reason no longer walks through the text sentence by sentence but
// says why the rule exists.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-487.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.9"];
const ONEOF = "s-xfu2gpzddjnmgks"; // 12.7
const GEN = "s-kh8qcd5kxgh9z3j"; // 10.14
Object.assign(n, {
  text: `Where the values of a field of type \`one of\` (§${ONEOF}) are gathered from elsewhere in the specification, all of them are written beside the field. Each is written with the node it comes from. The SpecSheriff tools gather them anew after every change to the specification. Only the SpecSheriff tools write them.`,
  ruText: `Если значения поля типа \`one of\` (§${ONEOF}) собираются из других мест спецификации, все они записываются рядом с полем. Каждое записывается вместе с узлом, из которого оно приходит. Инструменты SpecSheriff собирают их заново после каждого изменения спецификации. Записывают их только инструменты SpecSheriff.`,
  reason: `A reader of the field finds all its values where the field is described, each with the node to ask about it, instead of searching the parts of the specification they come from. A list kept by hand would fall behind those parts (§${GEN}).`,
  ruReason: `Читатель поля находит все его значения там, где поле описано, каждое — с узлом, которого о нём спросить, и не ищет их по частям спецификации, из которых они приходят. Список, который ведут вручную, отставал бы от этих частей (§${GEN}).`,
});
n.changes.push("По проверке формулировок: при первом упоминании поля типа `one of` добавлена ссылка на 12.7; «их собирают заново… и никогда не пишут вручную» → две фразы: «Инструменты SpecSheriff собирают их заново после каждого изменения спецификации. Записывают их только инструменты SpecSheriff» — утверждение вместо запрета; обоснование переписано: оно говорит, зачем правило, а не идёт по фразам текста.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
