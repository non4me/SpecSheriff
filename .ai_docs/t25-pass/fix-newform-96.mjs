// The node on names and descriptions is removed at the owner's word; the present 6.9 takes its number. Its title says what the node
// decides; its text and reason stand as they are. Run after `node remove-node.mjs 7.9`.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.9"]) throw new Error("7.9 still holds a draft");
d["7.9"] = {
  from: "6.9", sid: "kept",
  title: "Whether a restricting list names what is allowed or what is forbidden",
  ruTitle: "Что называет ограничивающий список: разрешённое или запрещённое",
  text: "=6.9",
  reason: "=6.9",
  ruText: "Если правило ограничивает что-либо списком, оно говорит, называет ли список разрешённое или запрещённое. Выбор зависит от того, какая ошибка осталась бы незамеченной:\n- если незамеченным осталось бы то, что пропущено, список называет запрещённое, как записи, которые резервная копия не включает;\n- если незамеченным осталось бы то, что попало лишним, список называет разрешённое, как поля, которые возвращает публичный API.",
  ruReason: "Список ошибается на том, о чём никто не подумал, когда его писали. Список разрешённого не пропускает ничего нового. Список запрещённого пропускает всё новое. Для данного ограничения заметна только одна из этих двух ошибок.",
  changes: [
    "Заголовок новый: прежний, «A restriction by list is chosen by which mistake would go unnoticed», не говорил, что выбирают.",
    "Текст и обоснование нынешнего 6.9, дословно.",
    "Сохраняет sid 6.9.",
  ],
  sidValue: "s-hgdc2543ms5spwj",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(d["7.9"].title);
