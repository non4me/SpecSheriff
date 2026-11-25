// The rule reviewer on check 10.1.3 as changed: the reason's first sentence grounds the archive only for an archived node
// some node replaces, while 2.5 also archives nodes nothing replaces, and a citation outside the specification may name
// any archived node (binding.ts citationsOutside). Proposed apart, its "like ..." clause made a plain list of subjects.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.proposals = [
  {
    en: "Reason, its first sentence: A `supersedes` link and a citation in the code, the tests or the documents may name an archived node by its sid.",
    ru: "Обоснование, его первое предложение: Связь `supersedes` и ссылка в коде, тестах или документах могут называть архивный узел по его sid.",
    why:
      "Рецензент: нынешнее первое предложение обосновывает архив только для узла, который чем-то заменён. По 2.5 в архив попадают и узлы, которые ничем не заменены, а проверка охраняет и их. " +
      "Ссылка в коде, тестах и документах может называть любой архивный узел: `sheriff citations` принимает sid архива (binding.ts, citationsOutside). Второе предложение остаётся как есть.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 proposals:", r.proposals.length);
