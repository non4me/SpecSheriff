// The reviewer's wording of the reason of 6.2, Links between terms: its grounds are the definition of an entity
// (s-ce9wbaut6edfuy8) and the schema's comment on a ratio. The text stays word for word.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const node = d["6.2"];
node.reason = "A link between two terms says how the entities they name relate. The other types say how two nodes relate. Only a term names an entity, so these two types link terms alone.\n\nA ratio gives both ends because one end cannot say whether the other may be absent. Swapped, the same multiplicities say something else, so the order is fixed.";
node.ruReason = "Связь между двумя терминами говорит, как соотносятся сущности, которые они называют. Остальные типы говорят, как соотносятся два узла. Сущность называет только термин, поэтому эти типы связывают только термины.\n\nСоотношение указывает оба конца, потому что один конец не скажет, может ли отсутствовать другой. При перестановке те же кратности означают другое, поэтому порядок задан.";
node.changes = [
  "По вашему решению вынесен из 6.1. Текст — два его последних абзаца, дословно.",
  "Заголовок и обоснование новые, обоснование — в формулировке рецензента.",
  "При переносе в файлы узел получит исходящую связь `refines` к 6.1, а строка таблицы проверок о двух терминах — связь `implements` с ним.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("6.2 reason set");
