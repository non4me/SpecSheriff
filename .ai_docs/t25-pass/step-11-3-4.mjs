// Row 11.3.3 is agreed unchanged (the owner, 2026-11-18, «ок»). Row 11.3.4 gets its proposal: the
// approved wording with the precision of the owner's ruling of 2026-10-30, under which a cycle of
// domains is determined from the `consumes` links of their headers alone.
import fs from "node:fs";
const file = new URL("table-11-3.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
const r3 = rows.find((r) => r.num === "11.3.3");
r3.agreed = "2026-11-18";
r3.change = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её без изменений 18 ноября.";
const r4 = rows.find((r) => r.num === "11.3.4");
r4.rests = ["s-yggv9myedprnaa7"];
r4.proposals = [{
  en: "The domains do not use one another in a cycle through the `consumes` links of their headers",
  ru: "Домены не используют друг друга по кругу через связи `consumes` своих заголовков",
  why: "Смысл тот же. Добавлено, по каким связям определяется круг: по вашему решению от 30 октября (одобренный 1.41) — только по связям `consumes` заголовков, а не по связям между правилами, которые свободно пересекают границы доменов. Отрицание оставлено, как в согласованном 11.1.3.",
}];
r4.change = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября.";
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("11.3.3 agreed; 11.3.4 proposed");
