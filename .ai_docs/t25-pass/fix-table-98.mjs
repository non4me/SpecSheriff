// Check 10.1.29: the owner asked whether "stands on a symbol" could become "stands before a symbol" (2026-11-13: «на
// символе - может поменять на - перед символом?»). "Before" names where the SpecTag is, but alone it would also accept
// a SpecTag far above its symbol, with other code between them. The appendix of the tools puts it in the comment directly
// above the symbol, so the final wording says "immediately precedes".
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.29");
r.proposals = [
  {
    en: "Every SpecTag in the system's code, except in a test, immediately precedes a symbol | refused",
    ru: "Каждый SpecTag в коде системы, кроме тестов, стоит непосредственно перед символом | отклоняется",
    why:
      "1) «Перед символом» вместо «на символе» — по вашему предложению: так видно, где стоит SpecTag. «Непосредственно» нужно, иначе подошёл бы и SpecTag далеко выше символа, с другим кодом между ними; описание инструментов ставит его в комментарий прямо над символом. " +
      "2) «На том символе, который он связывает» было кругом: символ, который SpecTag связывает, и есть тот, перед которым он стоит. " +
      "3) «Вне тестов» → «кроме тестов», как в согласованном 10.1.26; «код» → «код системы».",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
