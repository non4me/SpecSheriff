// Drafts 1.7.7, "The checks of an extension", the general rule behind the owner's decision of 2026-11-18
// that each extension lists its checks in a table of its own refining 10.1; the wording came from the
// reviewer of 11.3, so another reviewer checks it. Drafts 12.12, "The checks of the RecordType extension",
// in table-12-12.json: its head follows that decision as the head of 11.3 does, so it is marked agreed;
// its 15 rows are the rows of table 10.1 that leave for the RecordType extension, each in its approved
// wording, to be shown one at a time. Row 12.12.1 gets its proposal, with the matching one for 12.1.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

// 1.7.7
const nf = read("newform.json");
if (!nf["1.7.7"]) nf["1.7.7"] = {
  from: "", sid: "new", sidValue: "s-gpzs5fcxvp6jkrp",
  title: "The checks of an extension", ruTitle: "Проверки расширения",
  text: "An extension of the guidelines (§s-mbmnsnxenmavu3z) that adds checks lists all of them in one `TableRule` of its own. That table refines the table of checks (§s-jau82aq9juv9zzh) and has the same columns.",
  ruText: "Расширение guidelines (§s-mbmnsnxenmavu3z), которое добавляет проверки, перечисляет их все в одном собственном `TableRule`. Эта таблица уточняет таблицу проверок (§s-jau82aq9juv9zzh) и имеет те же столбцы.",
  reason: "The table of checks names no particular extension (§s-chk5hnzmcpeqj25), so the checks of an extension cannot be listed in it. Listed in one table of the extension, they are found in one place, beside the rules they enforce, and read in the same way as the checks of the SpecSheriff guidelines.",
  ruReason: "Таблица проверок не называет ни одного конкретного расширения (§s-chk5hnzmcpeqj25), поэтому проверки расширения в ней перечислить нельзя. Перечисленные в одной таблице расширения, они находятся в одном месте, рядом с правилами, которые обеспечивают, и читаются так же, как проверки SpecSheriff guidelines.",
  changes: ["Новый узел, по вашему решению от 18 ноября: у каждого расширения свои проверки, в его собственном правиле-таблице с теми же столбцами, что в 10.1. Формулировку предложил рецензент таблицы 11.3, поэтому её проверяет другой рецензент."],
  decisions: [{ date: "2026-11-18", problem: "Where an extension of the guidelines keeps its checks, since the table of checks names no particular extension.", ruling: "The owner: each extension keeps its checks in one rule of its own, a table with the same columns as the table of checks, which refines it." }],
};
// 12.1: the names of RecordTypes are compared whatever the case of their letters (the owner, 2026-10-30).
const r121 = nf["12.1"];
r121.proposals = [{
  pairs: [{ en: { from: "RecordType names are unique across the specification.", to: "RecordType names are unique across the specification, whatever the case of their letters." }, ru: { from: "Имена RecordType уникальны во всей спецификации.", to: "Имена RecordType уникальны во всей спецификации без учёта регистра букв." } }],
  why: "Ваше решение от 30 октября (одобренный 5.1): термины и RecordType называются один раз, без учёта регистра букв. Проверка 12.12.1 уже сравнивает имена без учёта регистра, а согласованный 12.1 этого не говорит.",
}];
for (const pr of r121.proposals[0].pairs) if (!r121.text.includes(pr.en.from) || !r121.ruText.includes(pr.ru.from)) throw new Error("12.1 sentence not found");
write("newform.json", nf);

// 12.12
const t10 = read("table-10-1.json");
const rows10 = t10.tables.flatMap((g) => g.rows);
const order = [8, 38, 35, 27, 28, 29, 30, 31, 32, 36, 33, 34, 37, 21, 26];
const rows = order.map((n, i) => {
  const r = rows10.find((x) => x.n === n);
  const [en] = r.was.split(" | ");
  return { n, num: `12.12.${i + 1}`, was: r.was, en, cost: r.was.split(" | ")[1] ?? r.cost, ru: r.ru, ruCost: r.ruCost, fate: "from 10.1",
    change: "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Показывается одобренная формулировка; её смысл и предложение, если оно нужно, — когда дойдёт её очередь.",
    rests: r.rests ?? [] };
});
rows[0].ru = "Никакие два RecordType не имеют одного имени, без учёта регистра букв";
rows[0].rests = ["s-7vm323mhry2enx3"];
rows[0].impl = ["s-vke5hakwf3uyrjs"];
rows[0].about = "Затрагивает имя каждого RecordType. Два RecordType с одним именем, хотя бы и в разном регистре, дали бы в сгенерированном коде два типа с одним именем.";
rows[0].proposals = [{
  en: "RecordType names are unique across the specification, whatever the case of their letters",
  ru: "Имена RecordType уникальны во всей спецификации без учёта регистра букв",
  why: "Смысл тот же. Одобренная строка — отрицание («никакие два…»), а ваше правило требует говорить, что выполняется. Новая формулировка повторяет слова согласованного 12.1 «Имена RecordType уникальны во всей спецификации» и добавляет «без учёта регистра букв», как вы решили 30 октября.",
}];
const t = {
  title: "The checks of the RecordType extension, with what each failure costs",
  ruTitle: "Проверки расширения «RecordType» и цена непрохождения каждой из них",
  head: {
    sid: "s-3k8mvhq2xbn5wpz", kind: "TableRule",
    title: "The checks of the RecordType extension", ruTitle: "Проверки расширения «RecordType»",
    text: "This table contains the complete list of the checks of the RecordType extension (§s-7vm323mhry2enx3) that run after an edit to the specification or to the code, including its tests.",
    ruText: "Эта таблица содержит полный список проверок расширения «RecordType» (§s-7vm323mhry2enx3), которые запускаются после правок как самой спецификации, так и кода, включая тесты.",
    reason: "The checks of the RecordType extension bind only a project that has chosen the extension (§s-9ttvcwpqkehm58g). The table of checks of the SpecSheriff guidelines names no particular extension (§s-chk5hnzmcpeqj25), so these checks are listed here, beside the rules they enforce. In one table, every check of the extension can be seen at a glance, together with what its failure costs.",
    ruReason: "Проверки расширения «RecordType» обязывают только проект, который выбрал это расширение (§s-9ttvcwpqkehm58g). Таблица проверок SpecSheriff guidelines не называет ни одного конкретного расширения (§s-chk5hnzmcpeqj25), поэтому эти проверки перечислены здесь, рядом с правилами, которые они обеспечивают. В одной таблице все проверки расширения видны сразу, вместе с ценой непрохождения каждой.",
    refs: [{ type: "refines", to: "s-jau82aq9juv9zzh" }, { type: "cites", to: "s-7vm323mhry2enx3" }, { type: "cites", to: "s-9ttvcwpqkehm58g" }, { type: "cites", to: "s-chk5hnzmcpeqj25" }],
    columns: t10.head.columns, agreed: "2026-11-18",
    changes: ["Новый узел, по вашему решению от 18 ноября. Шапка повторяет согласованную шапку 11.3 для расширения «RecordType», поэтому отмечена согласованной по вашему правилу, без отдельного вопроса."],
  },
  tables: [{ heading: "", ruHeading: "", rows }], doubts: [], toolsRu: {},
};
write("table-12-12.json", t);
for (const n of order) rows10.find((x) => x.n === n).fate = "to 12.12 RecordType checks";
write("table-10-1.json", t10);

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const lines = h.split("\n");
const i176 = lines.findIndex((l) => l.trim().startsWith('["1.7.6",'));
if (!h.includes('["1.7.7",')) lines.splice(i176 + 1, 0, '      ["1.7.7","new",0,"","The checks of an extension","Проверки расширения","","Новый узел по вашему решению от 18 ноября: расширение перечисляет свои проверки в одной таблице, уточняющей таблицу проверок.",[],""],');
const i1211 = lines.findIndex((l) => l.trim().startsWith('["12.11",'));
if (!h.includes('["12.12",')) lines.splice(i1211 + 1, 0, '      ["12.12","new",0,"","The checks of the RecordType extension","Проверки расширения «RecordType»","","Таблица проверок расширения, уточняющая 10.1; строки — 15 проверок из таблицы 10.1. Показана на отдельной странице.",[],""],');
// keep the JSON-like list valid: the row before an inserted one must end with a comma
for (const k of [i176, i1211 + 1]) if (!lines[k].trimEnd().endsWith(",")) lines[k] = lines[k].trimEnd() + ",";
h = lines.join("\n").replace(/,\n(\s*)\]\}/g, "\n$1]}");
fs.writeFileSync(page, h);
console.log("1.7.7 and 12.12 drafted;", rows.map((r) => r.num + "←n" + r.n).join(" "));
