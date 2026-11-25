// Check 10.1.17 is agreed in the owner's words (2026-11-13: «да, оставляем и согласовано»), with "three or more", as in
// agreed 7.13, and "product codes" read for «артиклей». The check now speaks of the whole specification, drafts included,
// which the tools are to follow at the tools step.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.17");
r.en =
  "No sentence of the specification is written in capitals. The only exceptions are abbreviations, constants and special notations, such as product codes. " +
  "The deterministic check applies this rule: no sentence has three or more consecutive words in capitals";
r.ru =
  "В спецификации запрещено писать предложения заглавными буквами. Исключение только для аббревиатур, констант и специальных обозначений (например, артикулов). " +
  "Для детерминированной проверки используется правило: в предложении не может быть трёх и более слов подряд, написанных заглавными буквами";
r.change =
  "Ваша формулировка (2026-11-13). «Трёх и более», как в согласованном 7.13 (вы писали «более трёх»); «артикулов» вместо «артиклей». " +
  "Проверка теперь охватывает всю спецификацию, черновики тоже; инструменты изменятся на шаге инструментов.";
delete r.proposals;
r.agreed = "2026-11-13";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| agreed", r.agreed);
