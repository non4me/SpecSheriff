// Check 10.1.12 of the table of checks, in the new form: its approved words as the text, what it touches, its tests, the
// Russian of tools 7.1.7, and one proposal that follows the archive ruling: an archived node has no sid, and the type
// `supersedes`, the one link that could name an archived node, is gone, so a link names a node of the specification.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.12");
r.about =
  "Затрагивает каждую связь, которую узел пишет сам (исходящую): sid, на который она указывает, должен быть у какого-то узла. Связь на sid, которого нет ни у одного узла, отклоняется. " +
  "Входящие связи строит `sheriff reindex`; что они совпадают с исходящими, проверяет другая строка таблицы.";
r.tests = [
  "unit/validate.test.ts: refuses a link to no node, and a citation without a link or a cites link without a citation",
  "unit/validate.test.ts: refuses a node of the archive holding a link pointing at it",
];
t.toolsRu["s-qzyacnqwvaeaps4"] = {
  title: "Исходящие связи и ссылки",
  text:
    "`sheriff validate` ищет цель каждой исходящей связи среди существующих sid.\n\n" +
    "Он читает ссылки в каждом узле и сопоставляет их со связями, которые узел делает:\n\n" +
    "- `§`, за которым идёт sid, а после него не строчная буква и не цифра, — ссылка на этот sid.\n" +
    "- `§`, за которым идёт что-то другое, до пробела, запятой, точки с запятой или закрывающей скобки, — ссылка по расположению.\n" +
    "- Текст в обратных кавычках проверка читает как любой другой текст, кроме ссылки по расположению (§s-bpdqd9v72wg7vsz).\n" +
    "- Указатель заголовка и значения, собранные рядом с полем, не читаются.",
  reason: "Узел может показать в обратных кавычках, как выглядит отклоняемая ссылка.",
};
r.proposals = [
  {
    en: "Every link names a node of the specification",
    ru: "Каждая связь называет узел спецификации",
    why:
      "Ваше решение по архиву: у архивного узла нет sid (2.5), и тип supersedes, единственная связь, которая могла называть архивный узел, ушёл (6.1). " +
      "Как в согласованных 10.1.3–10.1.8. Инструменты на шаге инструментов перестанут искать цель связи в архиве.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.12 proposals:", r.proposals.length);
