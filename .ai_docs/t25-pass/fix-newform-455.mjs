// Node 6.1, finding 11 of sections 6 to 10, under the owner's ruling of 2026-11-17: a project's own guidelines may define
// further types of link too, as long as they contradict none of the guidelines. Each such type states its meaning. The
// reason gains a sentence on why a project may add a type, as it may add a kind of node.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-455.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const n = d["6.1"];
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "An extension of the guidelines may define further types of link.", `An extension of the guidelines or a project's own guidelines (§${OWN}) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.`, "text");
const ruText = swap(n.ruText, "Расширение guidelines может определять дополнительные типы связей.", `Расширение guidelines или собственные guidelines проекта (§${OWN}) могут определять дополнительные типы связей. У каждого такого типа есть значение, и он не противоречит ни одному правилу SpecSheriff guidelines.`, "ruText");
const reason = `${n.reason}\n\nA project may need a relation that the guidelines do not foresee, so its own guidelines may add a type of link, as they may add a kind of node.`;
const ruReason = `${n.ruReason}\n\nПроекту может понадобиться отношение, которого guidelines не предусматривают, поэтому его собственные guidelines могут добавить тип связи, как могут добавить вид узла.`;
n.proposals = [{
  where: "последняя фраза текста и новый абзац обоснования",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 11 разделов 6–10, по вашему решению 17 ноября: собственные guidelines проекта тоже могут определять типы связей, но такие, которые не противоречат guidelines.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
