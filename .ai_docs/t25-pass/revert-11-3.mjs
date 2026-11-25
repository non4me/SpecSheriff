// The owner rejected table 11.3 as revise-11-3.mjs had changed it (2026-11-18): some proposals did not
// keep the meaning of the approved rows, and the rows are to be agreed one at a time. Restores the five
// approved rows as the rows of 11.3, each with its approved wording and no proposal of the agent's.
// Row 22 keeps the change the owner decided on 2026-11-08 (a level is optional), as a proposal. Row 40
// goes back to 11.3, as the owner ruled on 2026-11-11; the general wording proposed for table 10.1 is dropped.
// The head keeps the reviewer's fixes.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const before = read("table-10-1.before-revise-11-3.json").tables.flatMap((g) => g.rows);
const t10 = read("table-10-1.json");
for (const g of t10.tables) g.rows = g.rows.map((r) => (r.n === 40 ? before.find((x) => x.n === 40) : r));
write("table-10-1.json", t10);

const draft = read("table-11-3.before-revise.json");
const t = read("table-11-3.json");
const byN = Object.fromEntries(draft.tables[0].rows.map((r) => [r.n, r]));
const approvedRu = {
  20: "У каждого домена есть заголовок, и указатель в нём — тот, что дают разделы домена",
  23: "Связь `consumes` идёт от заголовка домена к разделу другого домена",
  25: "Домены не используют друг друга по кругу",
  40: "Каждый раздел технического приложения, кроме разделов стека и технического долга, находится под именем домена",
  22: "Заголовок каждого домена называет уровень из перечисленных в собственных guidelines проекта",
};
const moved = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября.";
t.tables[0].rows = [20, 23, 25, 40, 22].map((n, i) => {
  const r = { ...byN[n], num: `11.3.${i + 1}` };
  const [en] = r.was.split(" | ");
  if (n === 22) r.proposals = [{ en: r.en, ru: r.ru, why: "По вашему решению от 8 ноября уровень домена необязателен (согласованный 11.2.1), поэтому строка проверяет только названный уровень." }];
  r.en = en;
  r.ru = approvedRu[n];
  r.change = `${moved} Показывается одобренная формулировка. Её смысл и предложение, если оно нужно, — когда дойдёт её очередь.`;
  return r;
});
write("table-11-3.json", t);
console.log("11.3 rows:", t.tables[0].rows.map((r) => `${r.num}←n${r.n}`).join(" "));
