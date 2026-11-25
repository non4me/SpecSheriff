// Node 6.5, agreed on 2026-11-09: a proposal for its reason. The owner ruled on 2026-11-16 that the gap a reviewer
// found in 6.5 is not one («Пока не вижу чем бы эта связь была обоснована»): a word used in its ordinary sense is no
// term and needs no citation, a term used in its special sense in another term's definition is related to it by a
// `term-relation` or a `uses` link, and a `cites` link between terms would link any nouns and break easily. The text
// therefore stays. Its reason said "Only a term names an entity", which the broad meaning of "entity" that the owner
// chose for the TableRule 7.2.4 makes untrue, since an entity is anything the specification defines; the reason now
// argues from what the other types of link state. The temporary key "6.5~" holds the wording for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-398.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["6.5"];
const reason = "A link between two terms says how the entities that the terms name relate. The other types say how two nodes relate, so none of them fits two terms.";
const ruReason = "Связь между двумя терминами говорит, как соотносятся сущности, которые эти термины называют. Остальные типы говорят, как соотносятся два узла, поэтому ни один из них не подходит для двух терминов.";
n.proposals = [
  {
    where: "обоснование",
    en: [`Title: ${n.title}`, "", `Text: ${n.text}`, "", `Reason: ${reason}`].join("\n"),
    ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${n.ruText}`, "", `Обоснование: ${ruReason}`].join("\n"),
    why: "Обоснование. Было: «Связь между двумя терминами говорит, как соотносятся сущности, которые они называют. Остальные типы говорят, как соотносятся два узла. Сущность называет только термин, поэтому `term-relation` и `uses` связывают только термины.» Стало: «Связь между двумя терминами говорит, как соотносятся сущности, которые эти термины называют. Остальные типы говорят, как соотносятся два узла, поэтому ни один из них не подходит для двух терминов.» По вашему решению о широком значении сущность — всё, что определяет спецификация, поэтому «Сущность называет только термин» стало неверным. Текст не меняется.",
  },
];
d["6.5~"] = { ...n, reason, ruReason };
delete d["6.5~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
