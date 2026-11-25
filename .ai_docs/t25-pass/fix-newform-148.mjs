// Section 9 by the reviewer of 2026-11-10, who consolidated review-8-10.md with the day's rulings. 9.2: the technical debt worded as agreed 4.4,
// the item's fields left to the schema, the reason keeping why a finished todo goes. 9.3: a named subject, the SpecSheriff tools. 9.1 goes to the owner as a question.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const [t, l] = [d["9.2"], d["9.3"]];
if (t.sidValue !== "s-t28j22vbdmmeqnh" || l.sidValue !== "s-5z7d52ykd6bzctg") throw new Error("unexpected drafts");

Object.assign(t, {
  text: "A todo is work put off that concerns one node. It is kept as an item of that node's `meta.todos`. It is never kept in a comment on the node. A todo is removed once it is done or given up.\n\nAn accepted shortcoming in the internal quality of the system's implementation is described in the technical debt (§s-2r7k2aeyusgy6fw), not in a todo.",
  ruText: "Todo — это отложенная работа, касающаяся одного узла. Оно хранится как элемент `meta.todos` этого узла. Оно никогда не хранится в комментарии к узлу. Todo удаляется, когда оно выполнено или от него отказались.\n\nОсознанно принятый недостаток внутреннего качества реализации системы описывается в техническом долге (§s-2r7k2aeyusgy6fw), а не в todo.",
  reason: "Kept on its node, a todo shows whoever reads the node what still waits on it. Kept in a comment, it is missed by the listing of every todo (§s-5z7d52ykd6bzctg). Left once done or given up, it shows work waiting that no longer waits.",
  ruReason: "Хранимое в своём узле, todo показывает тому, кто читает узел, что в нём ещё ждёт. Хранимое в комментарии, оно выпадает из списка всех todo (§s-5z7d52ykd6bzctg). Оставленное после того, как оно выполнено или от него отказались, оно показывает ждущей работу, которая больше не ждёт.",
  changes: [
    "Первая фраза говорит, что такое todo, раз оно названо в заголовке.",
    "Технический долг назван так, как в согласованном 4.4: осознанно принятый недостаток внутреннего качества реализации.",
    "Убрано, что хранит элемент todo (дату, автора, что сделать): это описывает схема, а по согласованному 5.1 описание структуры одно, в схеме.",
    "Обоснование сокращено, но сохраняет, зачем todo хранится в узле и зачем удаляется сделанное.",
    "Сохраняет sid нынешнего 1.11.",
  ],
});
Object.assign(l, {
  title: "The listing of every todo",
  ruTitle: "Список всех todo",
  text: "The SpecSheriff tools list every todo of the specification in one listing, the newest first, each with its node.",
  ruText: "Инструменты SpecSheriff выводят все todo спецификации одним списком, новые первыми, каждый со своим узлом.",
  reason: "Listed together, the todos show what waits across the specification. The newest come first because nobody has weighed them yet.",
  ruReason: "Собранные вместе, todo показывают, что ждёт по всей спецификации. Новые идут первыми, потому что их ещё никто не взвешивал.",
  changes: [
    "У правила появилось подлежащее: инструменты SpecSheriff.",
    "Заголовок новый.",
    "Взято из нынешнего 1.11. Новый sid. При переносе описание `sheriff todos` в приложении инструментов получит связь implements с этим узлом.",
  ],
});
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");

const n = d["9.1"];
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
let present;
const walk = (x) => { if (x.sid === n.sidValue) present = x; (x.children ?? []).forEach(walk); };
spec.nodes.forEach(walk);
const show = (f) => (typeof n[f] === "string" && n[f].startsWith("=") ? present?.[f] : n[f]);
for (const f of ["title", "ruTitle", "text", "ruText", "reason", "ruReason"]) console.log(`--- 9.1 ${f}\n${show(f)}`);
console.log("--- changes\n" + (n.changes ?? []).join("\n"));
