// Node 12.3.1: the reviewer found the proposal of fix-newform-282.mjs not ready. This rewrites it.
// - Paragraph 3 contradicted itself: any RecordType contained in the RecordTypes of several domains, an order's for one,
//   would have moved to the shared data structures. Only a structure whose data no domain creates on its own moves there,
//   and a structure only one domain's RecordTypes contain stays in that domain.
// - The owner's ruling that data in one format originates in one domain is stated in the text (questions 4 and 6).
// - The first paragraph restated 12.3.2, which defines a RecordType; the statement that a domain's RecordTypes are its API
//   goes to 12.3.2 when it is reviewed. The title says what the node is about.
// - "Kept in a document of their own" goes to 12.2.2, which lists the documents.
// - The last paragraph takes back the precise wording of the approved node 1.39 (s-5yvpn4zhuqmv5bq), which it replaces:
//   what names a RecordType of another domain, and that a name from an undeclared section is reported, not refused. The
//   reason had kept that requirement while the text had lost it.
// - The reason says once why a structure has one definition and one name, and where it is kept, and then why the
//   consumes links are checked; the index is cited as 12.2.4. "Accepts orders" in the example.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.1"];

const title = "Where a RecordType is declared, and which domains may name it";
const ruTitle = "Где объявляется RecordType и какие домены могут его называть";
const text = [
  "A RecordType is declared in the domain where data in its format originates. Data in the format of one RecordType originates in one domain only.",
  "",
  "A domain that takes data in the format of a RecordType may offer it on in the same format, changing only the values in the data, not its structure. The name of the RecordType then does not change. A domain that changes the structure offers the data under a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "",
  "A structure whose data no domain creates on its own, such as an address, may be contained in the RecordTypes of several domains. Such a structure is declared once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7). A structure that the RecordTypes of only one domain contain is declared in that domain.",
  "",
  "A RecordType of one domain may name a RecordType of another domain, as a field's type or as the RecordType it refines, only if the first domain's header names, in its `consumes` links, the section where the named RecordType is declared. A RecordType named from any other section is reported, not refused.",
].join("\n");
const ruText = [
  "RecordType объявляется в домене, в котором впервые появляются данные в его формате. Данные в формате одного RecordType впервые появляются только в одном домене.",
  "",
  "Домен, который берёт данные в формате RecordType, может предлагать их дальше в том же формате, меняя только значения, но не структуру. Имя RecordType при этом не меняется. Домен, который меняет структуру, предлагает данные под своим RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "",
  "Структура, данные которой ни один домен не создаёт сам по себе, например адрес, может входить в RecordType нескольких доменов. Такая структура объявляется один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7). Структура, которая входит в RecordType только одного домена, объявляется в этом домене.",
  "",
  "RecordType одного домена может называть RecordType другого домена — как тип поля или как RecordType, который он уточняет, — только если заголовок первого домена называет в связях `consumes` раздел, в котором объявлен названный RecordType. RecordType, названный из любого другого раздела, отмечается в отчёте, а не отклоняется.",
].join("\n");
const reason = [
  "Two definitions of one structure are a duplicate: each changes on its own, and the two drift apart. So a structure is defined once, under a name no other RecordType has, and is referred to by that name. The definition belongs to the domain where the data originates, since only that domain changes the structure. A structure whose data no domain creates on its own belongs to none of them, so it is kept with what the domains share.",
  "",
  "With the `consumes` links declared, whoever changes a RecordType sees in the index which domains the change reaches (§s-2r59txnms5serdr). A RecordType named from an undeclared section is reported rather than refused, since declaring that use might set the domains using one another in a cycle (§s-yggv9myedprnaa7). Only a different division into domains removes such a cycle. Until then the dependency stays in view.",
].join("\n");
const ruReason = [
  "Два определения одной структуры — это дубликат: каждое меняется само по себе, и они расходятся. Поэтому структура определяется один раз, под именем, которого нет у другого RecordType, и на неё ссылаются по этому имени. Определение принадлежит домену, в котором появляются данные, потому что структуру меняет только он. Структура, данные которой ни один домен не создаёт сам по себе, не принадлежит ни одному из них, поэтому её хранят вместе с тем, что домены делят между собой.",
  "",
  "Когда связи `consumes` объявлены, тот, кто меняет RecordType, видит в указателе, до каких доменов доходит изменение (§s-2r59txnms5serdr). RecordType, названный из необъявленного раздела, отмечается в отчёте, а не отклоняется, потому что объявление такого использования может замкнуть домены в круг (§s-yggv9myedprnaa7). Устранить такой круг может только иное деление на домены. До тех пор зависимость остаётся на виду.",
].join("\n");
const example =
  "A domain that accepts orders declares the RecordType of an order. A domain that issues invoices takes the orders it needs and declares the RecordType of an invoice. Both RecordTypes contain a sum of money, which is declared once, among the shared data structures.";
const ruExample =
  "Домен, который принимает заказы, объявляет RecordType заказа. Домен, который выставляет счета, берёт нужные ему заказы и объявляет RecordType счёта. Оба RecordType содержат денежную сумму, а она объявлена один раз — среди общих структур данных.";

n.proposals = [
  {
    where: "заголовок, текст и обоснование целиком; новый пример",
    en: "Title: " + title + "\n\nText: " + text + "\n\nReason: " + reason + "\n\nExamples: " + example,
    ru: "Заголовок: " + ruTitle + "\n\nТекст: " + ruText + "\n\nОбоснование: " + ruReason + "\n\nПримеры: " + ruExample,
    why: "See fix-newform-283.mjs.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1 proposal revised");
