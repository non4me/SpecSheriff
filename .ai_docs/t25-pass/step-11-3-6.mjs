// Row 11.3.5 is agreed in the meaning the owner gave (the owner, 2026-11-18, «ок»). Row 11.3.6, the last
// row of 11.3, gets its proposal: a level is optional (the owner, 2026-11-08; the agreed 11.2.1), so the
// row checks only a level that a header names. "That" is added before "the project's own guidelines list",
// so that "list" is read as a verb.
import fs from "node:fs";
const file = new URL("table-11-3.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
const r5 = rows.find((r) => r.num === "11.3.5");
const p5 = r5.proposals[0];
r5.en = p5.en;
r5.ru = p5.ru;
r5.agreed = "2026-11-18";
r5.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 18 ноября в вашем смысле: ${p5.why}`;
delete r5.proposals;
const r6 = rows.find((r) => r.num === "11.3.6");
r6.rests = ["s-nkyty4dy9x2v2a4"];
r6.proposals = [{
  en: "A domain's header that names a level names one of the levels that the project's own guidelines list",
  ru: "Заголовок домена, который называет уровень, называет один из уровней, перечисленных в собственных guidelines проекта",
  why: "По вашему решению от 8 ноября уровень домена необязателен (согласованный 11.2.1: заголовок «может называть» уровень). Поэтому строка проверяет только тот уровень, который заголовок называет: он должен быть в списке уровней собственных guidelines проекта. Заголовок без уровня проходит.",
}];
r6.change = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября.";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("11.3.5 agreed; 11.3.6 proposed");
