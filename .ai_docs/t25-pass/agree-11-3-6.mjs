// Row 11.3.6 is agreed in the owner's wording (2026-11-18, «ок»), so every row of 11.3 is agreed. Row
// 11.3.5 gets the English that EngStickler's reader recommended; its Russian and its meaning stay. Then
// records the follow-up proposals for the agreed 1.6.1, 10.2 and 10.6, which spoke only of the table of
// checks: the checks of an extension are now listed in a table that refines it.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-11-3.json");
const rows = t.tables[0].rows;
const r6 = rows.find((r) => r.num === "11.3.6");
const p6 = r6.proposals[0];
r6.en = p6.en;
r6.ru = p6.ru;
r6.agreed = "2026-11-18";
r6.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 18 ноября в вашей формулировке: ${p6.why}`;
delete r6.proposals;
const r5 = rows.find((r) => r.num === "11.3.5");
r5.en = "Every section of the technical appendix other than the stack section and the technical debt section has the same name and the same place in the structure as a domain or a section of the base specification";
r5.change += " Только английский, после согласования, по замечанию читателя: «has the same name and the same place in the structure as» вместо «matches … in its name and in its place in the structure». Смысл и русский текст не менялись.";
write("table-11-3.json", t);

const nf = read("newform.json");
const why = "По вашему решению от 18 ноября проверки расширения перечислены в его собственной таблице, уточняющей таблицу проверок. Без правки узел говорил бы только о таблице проверок.";
const propose = (k, pairs) => {
  const n = nf[k];
  for (const [en, ru] of pairs) {
    if (!n.text.includes(en[0])) throw new Error(k + " EN not found: " + en[0]);
    if (!n.ruText.includes(ru[0])) throw new Error(k + " RU not found: " + ru[0]);
  }
  n.proposals = [{ pairs: pairs.map(([en, ru]) => ({ en: { from: en[0], to: en[1] }, ru: { from: ru[0], to: ru[1] } })), why }];
};
propose("1.6.1", [
  [["that the table of checks lists;", "that the table of checks, or a table refining it, lists;"], ["которые перечислены в таблице проверок;", "которые перечислены в таблице проверок или в уточняющей её таблице;"]],
  [["unless the table of checks says otherwise (§s-jau82aq9juv9zzh).", "unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh)."], ["если таблица проверок не говорит иного (§s-jau82aq9juv9zzh).", "если таблица, в которой она перечислена, не говорит иного (§s-jau82aq9juv9zzh)."]],
]);
propose("10.2", [
  [["every check in the table of checks (§s-jau82aq9juv9zzh) that needs neither", "every check in the table of checks (§s-jau82aq9juv9zzh) or in a table refining it that needs neither"], ["каждая проверка из таблицы проверок (§s-jau82aq9juv9zzh), которой не нужны", "каждая проверка из таблицы проверок (§s-jau82aq9juv9zzh) или из уточняющей её таблицы, которой не нужны"]],
  [["every check in that table except", "every check in those tables except"], ["каждая проверка из этой таблицы, кроме", "каждая проверка из этих таблиц, кроме"]],
]);
propose("10.6", [
  [["the checks listed in the table of checks (§s-jau82aq9juv9zzh) report", "the checks listed in the table of checks (§s-jau82aq9juv9zzh) or in a table refining it report"], ["проверки из таблицы проверок (§s-jau82aq9juv9zzh) сообщают", "проверки из таблицы проверок (§s-jau82aq9juv9zzh) или из уточняющей её таблицы сообщают"]],
]);
write("newform.json", nf);
console.log("11.3 agreed in full; proposals on 1.6.1, 10.2, 10.6");
