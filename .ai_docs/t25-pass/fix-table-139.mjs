// Table 10.1, after the owner agreed to 1.6.1 on 2026-11-17: row 10.1.44 refuses a push only where the project's own
// guidelines name a push as the place where the tests run.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-139.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.44");
if (!r || r.cost !== "the push is refused while the specification is approved") throw new Error("row 10.1.44 not as expected");
r.proposals = [{
  en: `${r.en}\n\nOn failure: the push is refused while the specification is approved, where the project's own guidelines name a push as the place where the tests run`,
  ru: `${r.ru}\n\nПри нарушении: push отклоняется, пока спецификация одобрена, если собственные guidelines проекта называют push местом запуска тестов`,
  why: "Выполняет согласованный 1.6.1: где запускать тесты, называют собственные guidelines проекта, поэтому push отклоняется, только если тесты запускаются при push. Текст проверки не меняется.",
}];
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("ok");
