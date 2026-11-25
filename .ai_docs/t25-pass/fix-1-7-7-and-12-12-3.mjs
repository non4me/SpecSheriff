// Applies the findings of specsheriff-rule-reviewer on 1.7.7 (2026-11-18), which is not yet agreed: the
// text cites 8.6 for `TableRule` and states the columns in a sentence of its own; the reason's second
// sentence takes the agreed words of the reasons of 10.1 and 11.3. Keeps the reviewer's doubts with the
// draft. Also gives the proposed row 12.12.3 the subject "a chain of identifiers" and names the type it
// ends in, as EngStickler's reader recommended; the proposal is not yet agreed.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const nf = read("newform.json");
const n = nf["1.7.7"];
n.text = "An extension of the guidelines (§s-mbmnsnxenmavu3z) that adds checks lists all of them in one `TableRule` (§s-5fewsp22mmdz7y6) of its own. That table refines the table of checks (§s-jau82aq9juv9zzh). It has the same columns as the table of checks.";
n.ruText = "Расширение guidelines (§s-mbmnsnxenmavu3z), которое добавляет проверки, перечисляет их все в одном собственном `TableRule` (§s-5fewsp22mmdz7y6). Эта таблица уточняет таблицу проверок (§s-jau82aq9juv9zzh). У неё те же столбцы, что у таблицы проверок.";
n.reason = "The table of checks names no particular extension (§s-chk5hnzmcpeqj25), so the checks of an extension cannot be listed in it. In one table, every check of an extension can be seen at a glance, together with what its failure costs.";
n.ruReason = "Таблица проверок не называет ни одного конкретного расширения (§s-chk5hnzmcpeqj25), поэтому проверки расширения в ней перечислить нельзя. В одной таблице все проверки расширения видны сразу, вместе с ценой непрохождения каждой.";
n.changes.push("Правки второго рецензента: ссылка на 8.6 «Правило может быть таблицей» для `TableRule`; столбцы — отдельной фразой; вторая фраза обоснования — согласованные слова обоснований 10.1 и 11.3.");
n.doubts = [
  "Ни одна строка таблицы проверок не проверяет 1.7.7. Возможная строка: «Every `TableRule` that refines the table of checks has its columns | refused».",
  "Пример, предложенный рецензентом: расширение, которое делит базовую спецификацию на части, перечисляет свою проверку, что у каждой части есть заголовок, в собственном `TableRule`; самая вероятная ошибка — строка в таблице проверок, которая действует только там, где проект выбрал это расширение.",
];
write("newform.json", nf);

const t = read("table-12-12.json");
const rows = t.tables[0].rows;
const r2 = rows.find((r) => r.num === "12.12.2");
r2.proposals[0].en = r2.proposals[0].en.replace("Row 12.12.3, new: Identifiers, followed from each identifying field to the next, end in a field of another type", "Row 12.12.3, new: A chain of identifiers, followed from each identifying field to the next, ends in a field of a type other than `identifier of`");
r2.proposals[0].ru = r2.proposals[0].ru.replace("Строка 12.12.3, новая: Идентификаторы, если идти от одного идентифицирующего поля к следующему, заканчиваются полем другого типа", "Строка 12.12.3, новая: Цепочка идентификаторов, если идти от одного идентифицирующего поля к следующему, заканчивается полем типа, отличного от `identifier of`");
const r3 = rows.find((r) => r.n === 38.5);
r3.en = "A chain of identifiers, followed from each identifying field to the next, ends in a field of a type other than `identifier of`";
r3.ru = "Цепочка идентификаторов, если идти от одного идентифицирующего поля к следующему, заканчивается полем типа, отличного от `identifier of`";
if (!r2.proposals[0].en.includes("A chain of identifiers") || !r2.proposals[0].ru.includes("Цепочка идентификаторов")) throw new Error("12.12.3 proposal not changed");
write("table-12-12.json", t);
console.log("1.7.7 fixed; 12.12.3 reworded");
