// Row 11.3.4 is agreed with the precision the agent proposed (the owner, 2026-11-18, «ок»). Row 11.3.5
// gets its proposal. The approved row keeps the appendix divided as the base is, a section per domain
// under that domain's name (the approved 1.19, the owner's ruling of 2026-11-11). The proposal names the
// two excepted sections as 10.1.22 does. It also admits a section under the name of the contracts
// section, as the agreed 4.1 does: that is a change of meaning and is put to the owner as such.
import fs from "node:fs";
const file = new URL("table-11-3.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
const r4 = rows.find((r) => r.num === "11.3.4");
const p4 = r4.proposals[0];
r4.en = p4.en;
r4.ru = p4.ru;
r4.agreed = "2026-11-18";
r4.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 18 ноября с уточнением: ${p4.why}`;
delete r4.proposals;
const r5 = rows.find((r) => r.num === "11.3.5");
r5.rests = ["s-vj7ercem526zd6v", "s-qmmzf9nksfsa3qp", "s-h6h25ctd3yryudh"];
r5.proposals = [{
  en: "Every section of the technical appendix other than the section on the stack and the technical debt section bears the name of a domain or of the contracts section",
  ru: "Каждый раздел технического приложения, кроме раздела стека и раздела технического долга, носит имя домена или раздела контрактов",
  why: "Смысл одобренной строки сохраняется: приложение разделено так же, как база, и раздел приложения для домена носит имя этого домена (одобренный 1.19, ваше решение от 11 ноября). Названия двух исключений — как в согласованной 10.1.22. Изменение смысла: добавлен раздел контрактов. Согласованный 4.1 (17 ноября) даёт приложению раздел для каждого раздела верхнего уровня базы, а у базы с доменами это домены и раздел контрактов (11.1.1).",
}];
r5.change = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября; 11 ноября вы вернули строке прежний смысл: инструменты сверяют имя файла приложения с именами доменов.";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("11.3.4 agreed; 11.3.5 proposed");
