// Check 10.1.27: the owner did not see what the rule guards or how it is checked (2026-11-13: «Я не до конца понимаю
// смысл данного правила. Как именно оно проверяется… или правила очень мутно сформулировано»). The proposal of
// fix-table-88.mjs still spoke of what a commit contains. The final wording now makes the specification its subject and
// says the one way it goes back to draft; every other way, an edit of that rule's wording or its removal, is refused.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.27");
r.proposals = [
  {
    en: "The specification goes back to draft only when one of its owners withdraws the approval of the rule stating that the specification is approved | refused",
    ru: "Спецификация возвращается в черновик, только когда один из её ответственных отзывает одобрение правила, утверждающего, что спецификация одобрена | отклоняется",
    why:
      "1) Подлежащее — спецификация, а не коммит: правило говорит, каким единственным путём она возвращается в черновик. Так видно, что запрещено: любой другой путь, то есть правка формулировки этого правила или его удаление. " +
      "2) «Правило, которое её одобряет» → «правило, утверждающее, что спецификация одобрена»: правило ничего не одобряет, одобряют ответственные; это слова согласованного 1.3.7. " +
      "3) Коммит больше не действующее лицо. Смысл прежний.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].en);
