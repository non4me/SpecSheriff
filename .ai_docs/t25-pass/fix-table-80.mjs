// Check 10.1.23: the owner asked to be shown one final wording, the one the agent believes correct, instead of separate
// proposals (2026-11-13: «предлагай финальный вариант правила с правильной по твоему мнению формулировкой, а не
// отдельные предложения списком»). The single proposal drops the citation, as the other agreed rows carry none and the
// row's `checks` link names 2.2, and says "a rule of the guidelines outside that appendix" for "a node of the base of
// the guidelines", by the owner's ruling of 2026-11-08 and in the words of agreed 2.2.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.23");
r.proposals = [
  {
    en: "Every rule of the appendix of the tools implements a rule of the guidelines outside that appendix",
    ru: "Каждое правило описания инструментов реализует правило guidelines вне этого описания",
    why:
      "1) Убрана ссылка (§s-a4rbry4hsu34hy8). Она вела на прежний узел 1.21, теперь 2.1 «Структура guidelines», а требование стоит в 2.2. Проверка и так связана с 2.2 связью `checks`, и в других согласованных проверках ссылок в тексте нет. " +
      "2) «узел базы guidelines» → «правило guidelines вне этого описания»: базы guidelines больше нет (ваше решение от 2026-11-08), а «правило» — слово согласованного 2.2.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| proposal:", r.proposals[0].en);
