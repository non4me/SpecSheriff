// Check 10.1.23: the owner asked what «вне этого описания» means (2026-11-13). It meant the part of the guidelines that is
// not the appendix of the tools, but it named that part by negation. Agreed 2.1 names the part: "the rules for keeping the
// specification". The one final wording now uses that name.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.23");
r.proposals = [
  {
    en: "Every rule of the appendix of the tools implements a rule for keeping the specification",
    ru: "Каждое правило описания инструментов реализует правило ведения спецификации",
    why:
      "1) Убрана ссылка (§s-a4rbry4hsu34hy8). Она вела на прежний узел 1.21, теперь 2.1 «Структура guidelines», а требование стоит в 2.2. Проверка и так связана с 2.2 связью `checks`, и в других согласованных проверках ссылок в тексте нет. " +
      "2) «узел базы guidelines» → «правило ведения спецификации». Базы guidelines больше нет (ваше решение от 2026-11-08). По согласованному 2.1 guidelines состоят из правил ведения спецификации и описания инструментов, поэтому вторую часть названо её именем из 2.1. " +
      "Прежний вариант «правило guidelines вне этого описания» называл ту же часть через отрицание.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].en);
