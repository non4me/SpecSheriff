// Node 7.6.3, agreed: a proposal that adds a third kind of example, by the owner's wish of 2026-11-16: in a rule of the
// SpecSheriff guidelines or of an extension, which requires only the minimum (2.4), an example may show how a
// project's own guidelines could make the rule stricter or more specific, as a hint for an agent that writes them.
// The temporary key "7.6.3~" holds the proposal for the wording checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-406.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.6.3"];
const EXT = "s-mbmnsnxenmavu3z", OWN = "s-u7tw6m8npxmv5tu";
const addEn = ` In a rule of the SpecSheriff guidelines (§${OWN}) or of an extension of the guidelines (§${EXT}), an example may also show how a project's own guidelines could make the rule stricter or more specific.`;
const addRu = ` В правиле SpecSheriff guidelines (§${OWN}) или расширения guidelines (§${EXT}) пример может также показывать, как собственные guidelines проекта могли бы сделать правило строже или конкретнее.`;
const anchorEn = n.text.match(/[^.]*the closest mistake[^.]*\./)?.[0] ?? n.text.match(/[^.]*mistake[^.]*\./)?.[0];
const anchorRu = "Пример показывает обычный случай применения правила и, где это помогает, ближайшую к нему ошибку.";
if (!anchorEn || !n.ruText.includes(anchorRu)) throw new Error("7.6.3 does not read as expected");
const text = n.text.replace(anchorEn, anchorEn + addEn);
const ruText = n.ruText.replace(anchorRu, anchorRu + addRu);
const reasonAdd = " A rule that requires only the minimum leaves a project room to add rules of its own, and such an example shows an agent that writes a project's own guidelines where that room is.";
const ruReasonAdd = " Правило, которое требует только минимума, оставляет проекту место для собственных правил, и такой пример показывает агенту, который пишет собственные guidelines проекта, где это место.";
const reason = n.reason + reasonAdd, ruReason = n.ruReason + ruReasonAdd;
n.proposals = [
  {
    where: "текст и обоснование",
    en: [`Title: ${n.title}`, `Text: ${text}`, `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Обоснование: ${ruReason}`].join("\n\n"),
    why: "Добавлен третий вид примера, по вашему предложению от 16 ноября: в правиле SpecSheriff guidelines или расширения пример может показывать, как собственные guidelines проекта могли бы сделать правило строже или конкретнее. Это подсказка агенту, который пишет guidelines проекта, а не требование: пример по-прежнему ничего не требует. Обоснование дополнено одной фразой о том, зачем такой пример. Остальное не меняется.",
  },
];
d["7.6.3~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.6.3~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(anchorEn);
