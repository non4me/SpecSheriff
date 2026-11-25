// Table 10.1, after the owner agreed on 2026-11-17 to 9.5, 10.6 and 10.7:
// - row 45 (a commit that approves the specification holds no code without a SpecTag) is deleted without asking, since
//   the owner's decision removed that ban; it was never approved in the new form, so it is deleted, not archived;
// - rows 10.1.26 and 10.1.26a get a proposal for their cost: refused, and for code the commit leaves unchanged, as 9.5 says;
// - a new row 10.1.27a checks the entries that set the strict flag, as 10.1.27 checks those on the approval status;
// - the note on 10.1.27 says what the specification's approval status now determines.
// The page generator learns the fate "new" and the new names of the sections the rows move to.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-10-1.json", here);
fs.copyFileSync(file, new URL("table-10-1.before-133.json", here));
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const T95 = "s-kkbqcb9xrpaepwn";
const FLAG = "s-q3pfzyaxvpr2zj2";
const rows = t.tables.flatMap((g) => g.rows);
const byNum = (num) => {
  const r = rows.find((x) => x.num === num);
  if (!r) throw new Error(`row ${num} not found`);
  return r;
};

const r45 = rows.find((x) => x.n === 45);
if (!r45 || r45.fate !== "to 14 Adoption") throw new Error("row 45 not as expected");
r45.fate = "deleted";
r45.change = "Удаляется (17 ноября), по вашему решению: запрет одобрять спецификацию, пока у кода нет SpecTag, снят. Вместо него процедура одобрения показывает сообщения проверок и просит подтверждения (10.6), а при включённом флаге strict отказывает (10.7). Строка ни разу не одобрялась в новой форме, поэтому удаляется, а не уходит в архив.";

for (const [num, what, ruWhat] of [["10.1.26", "a symbol", "символа"], ["10.1.26a", "a test", "теста"]]) {
  const r = byNum(num);
  r.proposals = [{
    en: `${r.en}\n\nOn failure: refused; for ${what} that the commit leaves unchanged, as §${T95} says`,
    ru: `${r.ru}\n\nПри нарушении: отклоняется; для ${ruWhat}, который коммит не меняет, — как говорит §${T95}`,
    why: "Выполняет согласованные 9.5 и 10.7: код и тесты без SpecTag, которых коммит не меняет, в черновике не отклоняют коммит и не вызывают предупреждения, в одобренной спецификации с выключенным флагом strict вызывают одно предупреждение, с включённым — отклоняют коммит. Меняется только столбец «при нарушении»: вместо «отклоняется» — «отклоняется; для кода, который коммит не меняет, — как говорит 9.5». Текст проверки не меняется.",
  }];
}

const r27 = byNum("10.1.27");
const fromNote = "От этого статуса зависит, насколько строго проверки применяются к коду и тестам (10.6).";
if (!r27.about.includes(fromNote)) throw new Error("note on 10.1.27 not as expected");
r27.about = r27.about.replace(fromNote, "От этого статуса зависит, запускаются ли тесты при push и учитывают ли проверки код за пределами коммита без SpecTag (10.6, 9.5).");

const group = t.tables.find((g) => g.rows.includes(r27));
const at = group.rows.indexOf(r27);
if (rows.some((x) => x.num === "10.1.27a")) throw new Error("row 10.1.27a is already there");
const n = Math.max(...rows.map((x) => x.n)) + 1;
group.rows.splice(at + 1, 0, {
  n,
  num: "10.1.27a",
  fate: "new",
  en: "Each new entry that sets the specification's `strict` flag names one of the specification's owners as of the commit that adds it. No commit removes or changes such an entry",
  cost: "refused",
  ru: "Каждая новая запись, которая задаёт флаг `strict` спецификации, называет одного из ответственных за спецификацию, какими их указывает добавивший её коммит. Ни один коммит не удаляет и не меняет такую запись",
  ruCost: "отклоняется",
  change: "Новая строка, по согласованному 10.7: записи флага strict проверяются так же, как записи о статусе одобрения спецификации (10.1.27).",
  rests: [FLAG],
  impl: [],
  about: "Затрагивает каждый коммит, который добавляет, удаляет или меняет запись флага strict. Включить или выключить флаг может только ответственный за спецификацию; запись называет его. Без запрета удалять или менять записи любой изменил бы флаг, удалив или поправив последнюю запись.",
  tests: [],
});
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const gen = new URL("gen-table-10-1.mjs", here);
let g = fs.readFileSync(gen, "utf8");
if (!g.includes('"new": [')) {
  g = g.replace('  "deleted": ["del", "удаляется"],', '  "to 11.1 Domains": ["dom", "уходит в 11.1 «Домены: декомпозиция»"],\n  "to 12 RecordType": ["dom", "уходит в 12 «RecordType»"],\n  "to 11.2 Domains": ["dom", "уходит в 11.2 «Домены: иерархия»"],\n  "to 13 Generation": ["gen", "уходит в 13 «Генерация кода»"],\n  "to 14 Adoption": ["ado", "уходит в 14 «Адоптация»"],\n  "new": ["stays", "новая строка в 10.1"],\n  "deleted": ["del", "удаляется"],');
  fs.writeFileSync(gen, g);
}
console.log("ok, new row n =", n);
