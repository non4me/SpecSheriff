// Drafts 11.3, "The checks of the Domains extension": a TableRule refining 10.1, whose rows are the five
// checks of table 10.1 that leave it for the Domains extension (the owner, 2026-11-18). Writes
// table-11-3.json, marks the five rows of table-10-1.json as moved there, and adds the row 11.3 to the
// page of the base. The head is kept only in table-11-3.json, so that the node has one record.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t10 = read("table-10-1.json");
const rows10 = t10.tables.flatMap((g) => g.rows);
const pick = (n) => { const r = rows10.find((x) => x.n === n); if (!r) throw new Error("no row " + n); return r; };

const moved = [
  { n: 20, num: "11.3.1", impl: ["s-agc6fb3vx46pc23"],
    tests: ["unit/validate.test.ts: refuses a domain without a header, and a header whose index its sections do not produce", "unit/reindex.test.ts: rebuilds the index in a domain's header from the domain's sections"],
    about: "Затрагивает заголовок каждого домена. Без заголовка тот, кто работает над доменом, не узнает из одного узла, за что домен отвечает и что он использует. Указатель, который не совпадает с разделами домена, сообщает о нём неверное." },
  { n: 23, num: "11.3.2", impl: ["s-qvgzubkrafadqgf"],
    tests: ["unit/validate.test.ts: refuses a consumes link that does not go from a header to a section of another domain"],
    about: "Затрагивает каждую связь `consumes`. Связь, которая идёт не от заголовка домена или не к разделу другого домена, не говорит, какие разделы домен использует." },
  { n: 25, num: "11.3.3", impl: ["s-vuujweu57sxsa58"],
    tests: ["unit/validate.test.ts: refuses domains using one another in a cycle"],
    about: "Затрагивает связи `consumes` всех доменов вместе. Домены, которые используют друг друга по кругу, нельзя построить один за другим." },
  { n: 40, num: "11.3.4", impl: ["s-gvafe6bnstwab8b"],
    tests: ["unit/validate.test.ts: refuses a section of the technical appendix standing under a name no domain has, the stack's and the technical debt's aside"],
    about: "Затрагивает каждый раздел технического приложения. Раздел под именем, которого нет ни у одного домена, не относится ни к одной части базовой спецификации. Разделы стека и технического долга — исключение." },
  { n: 22, num: "11.3.5", impl: ["s-uxmkwbnpgtjzkgv"],
    tests: ["unit/validate.test.ts: refuses a level the project's own guidelines do not list"],
    about: "Затрагивает заголовок домена, который называет уровень. Уровень, которого нет в списке собственных guidelines проекта, не даёт домену места на схеме доменов." },
];

const rows = moved.map((m) => {
  const r = pick(m.n);
  return { n: m.n, num: m.num, was: r.was, en: r.en, cost: r.cost, ru: r.ru, ruCost: r.ruCost, fate: "from 10.1",
    change: `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября: у каждого расширения свои проверки, в его собственном правиле-таблице, уточняющем 10.1. Формулировка — одобренная, без изменений.`,
    rests: r.rests, impl: m.impl, about: m.about, tests: m.tests };
});

const toolsRu = {};
for (const m of moved) for (const s of m.impl) if (t10.toolsRu?.[s]) toolsRu[s] = t10.toolsRu[s];

const t = {
  title: "The checks of the Domains extension, with what each failure costs",
  ruTitle: "Проверки расширения «Домены» и цена непрохождения каждой из них",
  head: {
    sid: "s-rp2nxe3cga2p26x",
    kind: "TableRule",
    title: "The checks of the Domains extension",
    ruTitle: "Проверки расширения «Домены»",
    text: "This table contains the complete list of the checks of the Domains extension that run after an edit to the specification or to the code, including its tests. These checks run together with those listed in the table of checks (§s-jau82aq9juv9zzh).",
    ruText: "Эта таблица содержит полный список проверок расширения «Домены», которые запускаются после правок как самой спецификации, так и кода, включая тесты. Эти проверки запускаются вместе с проверками из таблицы проверок (§s-jau82aq9juv9zzh).",
    reason: "The checks of the Domains extension bind only a project that has chosen the extension (§s-9ttvcwpqkehm58g). The table of checks of the SpecSheriff guidelines names no extension (§s-chk5hnzmcpeqj25), so these checks are listed here, beside the rules they enforce. In one table, every check of the extension can be seen at a glance, together with what its failure costs.",
    ruReason: "Проверки расширения «Домены» обязывают только проект, который выбрал это расширение (§s-9ttvcwpqkehm58g). Таблица проверок SpecSheriff guidelines не называет ни одного расширения (§s-chk5hnzmcpeqj25), поэтому эти проверки перечислены здесь, рядом с правилами, которые они обеспечивают. В одной таблице все проверки расширения видны сразу, вместе с ценой непрохождения каждой.",
    refs: [{ type: "refines", to: "s-jau82aq9juv9zzh" }, { type: "cites", to: "s-9ttvcwpqkehm58g" }, { type: "cites", to: "s-chk5hnzmcpeqj25" }],
    columns: t10.head.columns,
    changes: [
      "Новый узел, по вашему решению от 18 ноября: у каждого расширения свои проверки, в его собственном правиле-таблице с теми же столбцами, что в 10.1. Связь refines к 10.1.",
      "Текст повторяет вашу шапку 10.1, с «проверок расширения «Домены»» вместо «проверок SpecSheriff guidelines», и добавляет, что эти проверки запускаются вместе с проверками из 10.1.",
      "Строки — пять проверок, уходящих из таблицы 10.1: сначала четыре по декомпозиции (11.1), затем одна по иерархии (11.2).",
    ],
  },
  tables: [{ heading: "", ruHeading: "", rows }],
  doubts: [],
  toolsRu,
};
write("table-11-3.json", t);

for (const m of moved) pick(m.n).fate = "to 11.3 Domains checks";
write("table-10-1.json", t10);

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const anchor = `      ["11.2.3","move",0,"1.41","The order of the domains at the same level","Порядок доменов одного уровня"]\n     ]},\n`;
if (!h.includes(anchor)) throw new Error("anchor of 11.2 not found");
if (!h.includes(`["11.3",`)) h = h.split(anchor).join(anchor + `     { rows: [\n      ["11.3","new",0,"","The checks of the Domains extension","Проверки расширения «Домены»","","Таблица проверок расширения, уточняющая 10.1; строки — пять проверок из таблицы 10.1. Показана на отдельной странице.",[],""]\n     ]},\n`);
fs.writeFileSync(page, h);
console.log("11.3 drafted:", rows.map((r) => r.num + "←n" + r.n).join(" "));
