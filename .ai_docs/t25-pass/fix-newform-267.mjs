// Node 12.1.2, agreed on 2026-11-14: fixes to the English alone, from an EngStickler reader; the Russian text is unchanged.
// Node 9.1: the owner found «реализующий спецификацию вне её guidelines» unclear (2026-11-14) and proposed «реализующий
// спецификацию, созданную по guidelines». The Russian had dropped "the parts" that the English says. The single new
// wording proposed restores them and keeps the change made by fix-newform-266.mjs.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const swap = (node, field, from, to) => {
  if (!node[field].includes(from)) throw new Error(`not found in ${field}: ${from}`);
  node[field] = node[field].replace(from, to);
};

const a = d["12.1.2"];
swap(a, "text", "Its node stating the change holds a link of type `overrides` to that rule.", "The extension's node that states the change contains a link of type `overrides` to that rule.");
swap(a, "text", "A project's own guidelines hold no such link.", "A project's own guidelines contain no such link.");
swap(a, "reason", "An extension brings the tools adapted to the change, so they keep working.", "An extension comes with tools adapted to the change, so they keep working.");
a.changes.push(
  "Только английский, после согласования, по замечаниям читателя EngStickler: «The extension's node that states the change contains» вместо «Its node stating the change holds», «contain no such link» вместо «hold no such link», «comes with tools adapted» вместо «brings the tools adapted»; русский текст не изменился.",
);

const n = d["9.1"];
const enOld = "The system's code is the code implementing the parts of the specification outside its guidelines, and the tests verifying that code.";
const ruOld = "Код системы — это код, реализующий спецификацию вне её guidelines, и тесты, проверяющие этот код.";
const enNew = "The system's code is the code implementing every part of the specification except its guidelines, and the tests verifying that code.";
const ruNew = "Код системы — это код, реализующий все части спецификации, кроме её guidelines, и тесты, проверяющие этот код.";
const p = n.proposals[0];
if (!p.en.includes(enOld) || !p.ru.includes(ruOld)) throw new Error("9.1 first sentence not found");
p.where = "первое предложение и второй абзац";
p.en = p.en.replace(enOld, enNew);
p.ru = p.ru.replace(ruOld, ruNew);
p.why =
  "Первое предложение: в русском тексте пропали слова «части спецификации», которые есть в английском (the parts of the specification), и «реализующий спецификацию вне её guidelines» читалось как код, нарушающий guidelines. Теперь сказано, какие части реализует код системы: все, кроме guidelines. Второй абзац: убрана ссылка на узел о собственных генераторах проекта (§s-km4x4s26kv7pjze), который переходит в расширение «Генерация кода» как 12.5.2, потому что согласованный узел 12.1.3 запрещает правилу SpecSheriff guidelines ссылаться на узлы расширения; оставшаяся ссылка стоит сразу после слова «проверки», потому что ведёт только на узел о проверках.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.1.2 English fixed; 9.1 proposal reworded");
