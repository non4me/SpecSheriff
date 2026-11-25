// Node 6.1, agreed: a proposal that carries out the owner's agreement to 1.7.2 of 2026-11-16, by which an extension only
// adds rules and refines rules of the SpecSheriff guidelines, so the link type `overrides` goes from the list of the
// types of link. Nothing else in the node changes.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-405.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["6.1"];
const en = "- `overrides` — the linking node, which belongs to an extension, changes the linked rule of the SpecSheriff guidelines in a project using that extension (§s-e6stjaxkn44ys4m).\n";
const ru = "- `overrides` — связывающий узел расширения изменяет связанное правило SpecSheriff guidelines в проекте, который использует это расширение (§s-e6stjaxkn44ys4m).\n";
if (!n.text.includes(en) || !n.ruText.includes(ru)) throw new Error("the overrides item not found in 6.1");
const text = n.text.replace(en, ""), ruText = n.ruText.replace(ru, "");
n.proposals = [
  {
    where: "текст",
    en: [`Title: ${n.title}`, `Text: ${text}`, `Reason: ${n.reason}`].join("\n\n"),
    ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${n.ruReason}`].join("\n\n"),
    why: "Из списка типов связей убран `overrides`. Это следует из 1.7.2, который вы согласовали 16 ноября: расширение только добавляет правила и уточняет правила guidelines, поэтому связи, которой расширение меняет правило, больше нет. При переносе в файлы спецификации у 6.1 уйдёт и ссылка на 1.7.2 (s-e6stjaxkn44ys4m), которую давал этот пункт. Проверка этой связи уйдёт из таблицы проверок 10.1. Остальной текст узла не меняется.",
  },
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
