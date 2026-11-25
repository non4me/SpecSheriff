// Rows 12.12.2 and 12.12.3 are agreed (the owner, 2026-11-19, «ок»). Then 1.7.7 is shown to the owner,
// with the example the second reviewer proposed, reworded so that each sentence states one thought.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-12-12.json");
const rows = t.tables[0].rows;
const r2 = rows.find((r) => r.num === "12.12.2");
r2.en = "A field of type `identifier of` refers to a RecordType that names one of its own fields as the field identifying its data records";
r2.ru = "Поле типа `identifier of` ссылается на RecordType, который называет одно из своих полей полем, идентифицирующим его записи данных";
r2.agreed = "2026-11-19";
r2.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 19 ноября: ${r2.proposals[0].why}`;
delete r2.proposals;
const r3 = rows.find((r) => r.num === "12.12.3");
r3.agreed = "2026-11-19";
r3.change = "Вторая половина одобренной строки об `identifier of`. Вы согласовали её 19 ноября вместе с 12.12.2.";
delete r3.proposals;
write("table-12-12.json", t);

const nf = read("newform.json");
const n = nf["1.7.7"];
n.examples = "An extension that divides the base specification into parts has a check that every part has a header. It lists that check in a `TableRule` of its own, not in the table of checks. The most likely mistake is a row in the table of checks that applies only where a project has chosen that extension.";
n.ruExamples = "Расширение, которое делит базовую спецификацию на части, проверяет, что у каждой части есть заголовок. Эту проверку оно перечисляет в собственном `TableRule`, а не в таблице проверок. Самая вероятная ошибка — строка в таблице проверок, которая действует только там, где проект выбрал это расширение.";
n.changes.push("Пример предложил второй рецензент; фразы разделены, чтобы в каждой была одна мысль.");
write("newform.json", nf);
console.log("12.12.2 and 12.12.3 agreed; 1.7.7 has its example");
