// The owner named the two kinds of table on 2026-11-19: "the main table of checks" («основная таблица
// проверок») for 10.1 and "the table of checks of an extension" («таблица проверок расширения») for the
// table in which an extension lists its checks. Renames the term in every agreed node that uses it, which
// remain agreed, and in the draft of 1.7.7, which now defines the name of an extension's table.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");
const swap = (s, a, b, where) => { if (!s.includes(a)) throw new Error(where + ": not found: " + a.slice(0, 80)); return s.split(a).join(b); };
const note = "19 ноября, по вашим названиям: «основная таблица проверок» и «таблица проверок расширения». Смысл не меняется, согласование сохраняется.";

const nf = read("newform.json");
const edit = (k, pairs, addNote = true) => {
  const n = nf[k];
  for (const [field, a, b] of pairs) n[field] = swap(n[field], a, b, k + "." + field);
  if (addNote) n.changes.push(note);
};
edit("1.6.1", [
  ["text", "that the table of checks, or a table refining it, lists;", "that the main table of checks, or the table of checks of an extension, lists;"],
  ["ruText", "которые перечислены в таблице проверок или в уточняющей её таблице;", "которые перечислены в основной таблице проверок или в таблице проверок расширения;"],
]);
edit("10.2", [
  ["text", "every check in the table of checks (§s-jau82aq9juv9zzh) or in a table refining it that needs neither", "every check in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension that needs neither"],
  ["ruText", "каждая проверка из таблицы проверок (§s-jau82aq9juv9zzh) или из уточняющей её таблицы, которой не нужны", "каждая проверка из основной таблицы проверок (§s-jau82aq9juv9zzh) или из таблицы проверок расширения, которой не нужны"],
]);
edit("10.6", [
  ["text", "the checks listed in the table of checks (§s-jau82aq9juv9zzh) or in a table refining it report", "the checks listed in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension report"],
  ["ruText", "проверки из таблицы проверок (§s-jau82aq9juv9zzh) или из уточняющей её таблицы сообщают", "проверки из основной таблицы проверок (§s-jau82aq9juv9zzh) или из таблицы проверок расширения сообщают"],
]);
edit("10.8", [
  ["text", "to those of the table of checks (§s-jau82aq9juv9zzh)", "to those of the main table of checks (§s-jau82aq9juv9zzh)"],
  ["ruText", "в таблице проверок (§s-jau82aq9juv9zzh)", "в основной таблице проверок (§s-jau82aq9juv9zzh)"],
]);
const d = nf["1.7.7"];
d.title = "The table of checks of an extension";
d.ruTitle = "Таблица проверок расширения";
d.text = "An extension of the guidelines (§s-mbmnsnxenmavu3z) that adds checks lists all of them in its table of checks, one `TableRule` (§s-5fewsp22mmdz7y6) of its own. The table of checks of an extension refines the main table of checks (§s-jau82aq9juv9zzh). It has the same columns as the main table of checks.";
d.ruText = "Расширение guidelines (§s-mbmnsnxenmavu3z), которое добавляет проверки, перечисляет их все в своей таблице проверок — одном собственном `TableRule` (§s-5fewsp22mmdz7y6). Таблица проверок расширения уточняет основную таблицу проверок (§s-jau82aq9juv9zzh). У неё те же столбцы, что у основной таблицы проверок.";
d.reason = "The main table of checks names no particular extension (§s-chk5hnzmcpeqj25), so the checks of an extension cannot be listed in it. In one table, every check of an extension can be seen at a glance, together with what its failure costs.";
d.ruReason = "Основная таблица проверок не называет ни одного конкретного расширения (§s-chk5hnzmcpeqj25), поэтому проверки расширения в ней перечислить нельзя. В одной таблице все проверки расширения видны сразу, вместе с ценой непрохождения каждой.";
d.examples = "An extension that divides the base specification into parts has a check that every part has a header. It lists that check in the table of checks of the extension, not in the main table of checks. The most likely mistake is a row in the main table of checks that applies only where a project has chosen that extension.";
d.ruExamples = "Расширение, которое делит базовую спецификацию на части, проверяет, что у каждой части есть заголовок. Эту проверку оно перечисляет в таблице проверок расширения, а не в основной таблице проверок. Самая вероятная ошибка — строка в основной таблице проверок, которая действует только там, где проект выбрал это расширение.";
d.changes.push("19 ноября, по вашим названиям: заголовок «Таблица проверок расширения»; узел вводит это название; «основная таблица проверок» вместо «таблица проверок».");
write("newform.json", nf);

const t10 = read("table-10-1.json");
t10.title = swap(t10.title, "The table of checks", "The main table of checks", "10.1 page title");
t10.ruTitle = swap(t10.ruTitle, "Таблица проверок", "Основная таблица проверок", "10.1 page ruTitle");
t10.head.title = "The main table of checks";
t10.head.ruTitle = "Основная таблица проверок";
t10.head.changes.push("19 ноября, по вашему названию: заголовок «Основная таблица проверок». Смысл не меняется, согласование сохраняется.");
write("table-10-1.json", t10);

for (const [f, name, ruName] of [["table-11-3.json", "Domains", "«Домены»"], ["table-12-12.json", "RecordType", "«RecordType»"]]) {
  const t = read(f);
  const h = t.head;
  h.title = `The table of checks of the ${name} extension`;
  h.ruTitle = `Таблица проверок расширения ${ruName}`;
  t.title = `The table of checks of the ${name} extension, with what each failure costs`;
  t.ruTitle = `Таблица проверок расширения ${ruName} и цена непрохождения каждой из них`;
  h.reason = swap(h.reason, "The table of checks of the SpecSheriff guidelines names no particular extension", "The main table of checks names no particular extension", f);
  h.ruReason = swap(h.ruReason, "Таблица проверок SpecSheriff guidelines не называет ни одного конкретного расширения", "Основная таблица проверок не называет ни одного конкретного расширения", f);
  h.changes.push("19 ноября, по вашим названиям: заголовок «Таблица проверок расширения», в обосновании — «основная таблица проверок». Смысл не меняется, согласование сохраняется.");
  write(f, t);
}

const page = new URL("base-structure.html", here);
let html = fs.readFileSync(page, "utf8");
html = swap(html, '["1.7.7","new",0,"","The checks of an extension","Проверки расширения"', '["1.7.7","new",0,"","The table of checks of an extension","Таблица проверок расширения"', "page 1.7.7");
html = swap(html, '"The checks of the Domains extension","Проверки расширения «Домены»"', '"The table of checks of the Domains extension","Таблица проверок расширения «Домены»"', "page 11.3");
html = swap(html, '"The checks of the RecordType extension","Проверки расширения «RecordType»"', '"The table of checks of the RecordType extension","Таблица проверок расширения «RecordType»"', "page 12.12");
fs.writeFileSync(page, html);

const g = new URL("gen-table-10-1.mjs", here);
let gs = fs.readFileSync(g, "utf8");
gs = swap(gs, "уходит в 11.3 «Проверки расширения «Домены»»", "уходит в 11.3 «Таблица проверок расширения «Домены»»", "gen 11.3");
gs = swap(gs, "уходит в 12.12 «Проверки расширения «RecordType»»", "уходит в 12.12 «Таблица проверок расширения «RecordType»»", "gen 12.12");
fs.writeFileSync(g, gs);
console.log("renamed in 1.6.1, 10.2, 10.6, 10.8, 1.7.7, 10.1, 11.3, 12.12");
