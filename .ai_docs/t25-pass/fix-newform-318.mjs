// Node 12.4.1, the proposal of fix-newform-316.mjs: its opening is the owner's definition of 2026-11-14 («Уровень это
// опциональное свойство домена показывающие как в ирерархии он расоположен по отношению к другим»). The text now opens with
// what a level is, as the owner asked; the separate sentence "A level is optional" goes, since the definition says it.
// The other paragraphs and the reason do not change.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.4.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(p.en, "Text: A domain's level is its place in the hierarchy of the domains. A level is optional. A domain's header",
  "Text: A domain's level is an optional property of the domain that shows its position in the hierarchy relative to the other domains. A domain's header");
p.ru = swap(p.ru, "Текст: Уровень домена — это его место в иерархии доменов. Уровень опционален. Заголовок домена",
  "Текст: Уровень — это опциональное свойство домена, показывающее, как в иерархии он расположен по отношению к другим доменам. Заголовок домена");
p.why = "По вашей просьбе от 14 ноября: узел согласуется заново под новое название раздела 12.4 «Домены: иерархия». Текст начинается с вашего определения уровня.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
