// Applies the findings of specsheriff-rule-reviewer on draft 11.3 (2026-11-18). The head cites the
// extension, its reason says "no particular extension", and its second sentence goes, since 10.2 is to
// name the tables that refine 10.1. The rows that change are proposals beside their approved wordings:
// 11.3.1 is split in two, the cycle is stated positively, and the level follows 11.2.1. The row on the
// sections of the technical appendix leaves 11.3 and is proposed for table 10.1 in a general form.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-11-3.json");
const h = t.head;
h.text = "This table contains the complete list of the checks of the Domains extension (§s-h6h25ctd3yryudh) that run after an edit to the specification or to the code, including its tests.";
h.ruText = "Эта таблица содержит полный список проверок расширения «Домены» (§s-h6h25ctd3yryudh), которые запускаются после правок как самой спецификации, так и кода, включая тесты.";
h.reason = h.reason.replace("names no extension (§s-chk5hnzmcpeqj25)", "names no particular extension (§s-chk5hnzmcpeqj25)");
h.ruReason = h.ruReason.replace("не называет ни одного расширения (§s-chk5hnzmcpeqj25)", "не называет ни одного конкретного расширения (§s-chk5hnzmcpeqj25)");
if (!h.reason.includes("particular") || !h.ruReason.includes("конкретного")) throw new Error("reason not changed");
h.refs = [{ type: "refines", to: "s-jau82aq9juv9zzh" }, { type: "cites", to: "s-h6h25ctd3yryudh" }, { type: "cites", to: "s-9ttvcwpqkehm58g" }, { type: "cites", to: "s-chk5hnzmcpeqj25" }];
h.changes = [
  "Новый узел, по вашему решению от 18 ноября: у каждого расширения свои проверки, в его собственном правиле-таблице с теми же столбцами, что в 10.1. Связь refines к 10.1.",
  "Текст повторяет вашу шапку 10.1, с «проверок расширения «Домены»» вместо «проверок SpecSheriff guidelines». Ссылка на 11.1.1 объясняет, о каком расширении речь.",
  "По рецензенту: убрана фраза «Эти проверки запускаются вместе с проверками из таблицы проверок». Когда запускаются проверки, говорит 10.2; правка 10.2, которая назовёт и таблицы, уточняющие 10.1, — следующим вопросом.",
  "По рецензенту: в обосновании «ни одного конкретного расширения», как в 1.7.3.",
];

const old = Object.fromEntries(t.tables[0].rows.map((r) => [r.n, r]));
const moved = "Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября.";
const rows = [
  { ...old[20], num: "11.3.1", en: "Every domain has a header", ru: "У каждого домена есть заголовок",
    change: `${moved} По рецензенту одобренная строка делится на две: в ней два требования, и каждое выполнимо без другого. Указатель — следующая строка, 11.3.2.`,
    tests: ["unit/validate.test.ts: refuses a domain without a header, and a header whose index its sections do not produce"],
    about: "Затрагивает каждый домен. Без заголовка тот, кто работает над доменом, не узнает из одного узла, за что домен отвечает и что он использует." },
  { n: 20.5, num: "11.3.2", was: "", en: "The index in each domain's header is the one built from the domain's sections", cost: "refused",
    ru: "Указатель в заголовке каждого домена — тот, что строится из разделов домена", ruCost: "отклоняется", fate: "from 10.1",
    change: `${moved} Вторая половина одобренной строки «Every domain has a header, and the index in it is what the domain's sections produce». «Built from» — слова согласованного 11.1.4 вместо «what … produce».`,
    rests: ["s-2r59txnms5serdr"], impl: ["s-agc6fb3vx46pc23"],
    tests: ["unit/validate.test.ts: refuses a domain without a header, and a header whose index its sections do not produce", "unit/reindex.test.ts: rebuilds the index in a domain's header from the domain's sections"],
    about: "Затрагивает указатель в заголовке каждого домена. Указатель, который не совпадает с разделами домена, сообщает о домене неверное." },
  { ...old[23], num: "11.3.3", change: `${moved} Формулировка — одобренная, без изменений.` },
  { ...old[25], num: "11.3.4", en: "The domains can be ordered by the `consumes` links of their headers so that each domain comes after every domain it uses",
    ru: "Домены можно упорядочить по связям `consumes` их заголовков так, чтобы каждый домен стоял после всех доменов, которые он использует",
    change: `${moved} По рецензенту и вашему правилу «правило говорит, что выполняется»: одобренная строка «The domains do not use one another in a cycle» — отрицание. Новая говорит то же самое: такой порядок есть ровно тогда, когда круга нет. Она называет связи \`consumes\`, потому что по вашему решению от 30 октября круг определяется только по ним.` },
  { ...old[22], num: "11.3.5", change: `${moved} Одобренная строка — «Every domain's header names a level the project's own guidelines list». По вашему решению от 8 ноября уровень домена необязателен (согласованный 11.2.1), поэтому строка проверяет только названный уровень.` },
];
const approved = {
  20: { en: "Every domain has a header, and the index in it is what the domain's sections produce", ru: "У каждого домена есть заголовок, и указатель в нём — тот, что дают разделы домена" },
  25: { en: "The domains do not use one another in a cycle", ru: "Домены не используют друг друга по кругу" },
  22: { en: "Every domain's header names a level the project's own guidelines list", ru: "Заголовок каждого домена называет уровень из перечисленных в собственных guidelines проекта" },
};
// The page shows the approved wording as a row's text and the new wording as its proposal.
for (const r of rows) {
  if (approved[r.n]) {
    r.proposals = [{ en: r.en, ru: r.ru, why: r.change.replace(moved + " ", "") }];
    r.en = approved[r.n].en;
    r.ru = approved[r.n].ru;
  } else if (!r.was) r.proposals = [];
}
t.tables[0].rows = rows;
write("table-11-3.json", t);

// Row 40 returns to table 10.1, with a general wording proposed beside its approved one.
const t10 = read("table-10-1.json");
const r40 = t10.tables.flatMap((g) => g.rows).find((r) => r.n === 40);
r40.fate = "stays";
r40.num = "10.1.22a";
r40.impl = ["s-gvafe6bnstwab8b"];
r40.tests = ["unit/validate.test.ts: refuses a section of the technical appendix standing under a name no domain has, the stack's and the technical debt's aside"];
r40.about = "Затрагивает каждый раздел технического приложения. Раздел, который не стоит под названием раздела верхнего уровня базовой спецификации, не говорит, что из базовой спецификации он реализует. Раздел стека и раздел технического долга — исключение.";
r40.rests = ["s-vj7ercem526zd6v"];
r40.proposals = [{
  en: "Every section of the technical appendix other than the section on the stack and the technical debt section stands under the title of a top-level section of the base specification",
  ru: "Каждый раздел технического приложения, кроме раздела стека и раздела технического долга, стоит под названием раздела верхнего уровня базовой спецификации",
  why: "Согласованный 4.1 (17 ноября) говорит «под названием этого раздела», а не «под именем домена», и это правило не требует доменов. Поэтому проверка остаётся в 10.1 в общем виде. В спецификации, разделённой на домены, разделы верхнего уровня — домены и раздел контрактов, так что раздел приложения, реализующий контракты, тоже проходит. Названия раздела стека и раздела технического долга — как в согласованной 10.1.22.",
}];
r40.change = "Вы решили 11 ноября, что строка вернулась к прежнему смыслу и уходит в расширение «Домены». Рецензент 11.3 нашёл, что после согласованного 4.1 ни одно правило «Доменов» её не требует: 4.1 говорит о названии раздела базовой спецификации. Предлагаю оставить её в 10.1 в общем виде.";
write("table-10-1.json", t10);
console.log("11.3:", rows.map((r) => r.num).join(" "), "| 10.1.22a proposed");
