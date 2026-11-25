// Node 12.3.1: the reviewer's second report passes the proposal of fix-newform-283.mjs after its wording fixes, which are
// applied here, and leaves doubts that the agent settles as follows, to be shown to the owner.
// - 7.7: the paragraph on `consumes` is applied apart from the rest, so it goes back to node 1.39 (s-5yvpn4zhuqmv5bq),
//   which stays an approved node of its own instead of being archived. The title narrows to where a RecordType is declared.
// - "Data in one format has one RecordType" carries out the owner's answer to question 4.
// - Nodes 1.26 and 1.32, both approved, declare a RecordType variant where its value is declared, so the text says so.
// - "Only ever part of a record" replaces "whose data no domain creates on its own" (7.8, 7.10).
// - The reason is the reviewer's: why a data structure has one definition and one name.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.1"];

const title = "Where a RecordType is declared";
const ruTitle = "Где объявляется RecordType";
const text = [
  "Data in one format has one RecordType. That RecordType is declared in the domain where data in its format originates. Data in the format of one RecordType originates in one domain only. A RecordType variant is declared where the value it answers to is declared (§s-z3dnru6qqdf9m6j).",
  "",
  "A domain that takes data in the format of a RecordType may offer that data to other domains in the same format, changing only the values in the data, not its structure. The name of the RecordType then does not change. A domain that changes the structure offers the data under a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "",
  "A data structure that is only ever part of a record, such as an address, may be contained in the RecordTypes of several domains. Such a structure is declared once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7). A data structure that the RecordTypes of only one domain contain is declared in that domain.",
].join("\n");
const ruText = [
  "У данных одного формата один RecordType. Он объявляется в домене, в котором впервые появляются данные в его формате. Данные в формате одного RecordType впервые появляются только в одном домене. Вариант RecordType объявляется там, где объявлено значение, которому он соответствует (§s-z3dnru6qqdf9m6j).",
  "",
  "Домен, который берёт данные в формате RecordType, может предлагать их другим доменам в том же формате, меняя только значения, но не структуру. Имя RecordType при этом не меняется. Домен, который меняет структуру, предлагает данные под своим RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "",
  "Структура данных, которая бывает только частью записи, например адрес, может входить в RecordType нескольких доменов. Такая структура объявляется один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7). Структура данных, которая входит в RecordType только одного домена, объявляется в этом домене.",
].join("\n");
const reason =
  "Two definitions of one data structure drift apart, since each changes on its own. Declared once, in the only domain that changes it or, where none does, with what the domains share, a data structure has one name that every domain uses.";
const ruReason =
  "Два определения одной структуры данных расходятся, потому что каждое меняется само по себе. Объявленная один раз — в единственном домене, который её меняет, или, если такого нет, вместе с тем, что домены делят между собой, — структура данных имеет одно имя, которым пользуются все домены.";
const example =
  "A domain that accepts orders declares the RecordType of an order. A domain that issues invoices takes the orders it needs and declares the RecordType of an invoice. Both RecordTypes contain a sum of money, which is declared once, among the shared data structures.";
const ruExample =
  "Домен, который принимает заказы, объявляет RecordType заказа. Домен, который выставляет счета, берёт нужные ему заказы и объявляет RecordType счёта. Оба RecordType содержат денежную сумму, а она объявлена один раз — среди общих структур данных.";

n.proposals = [
  {
    where: "заголовок, текст и обоснование целиком; новый пример; абзац о связях consumes возвращается в узел 1.39",
    en: "Title: " + title + "\n\nText: " + text + "\n\nReason: " + reason + "\n\nExamples: " + example,
    ru: "Заголовок: " + ruTitle + "\n\nТекст: " + ruText + "\n\nОбоснование: " + ruReason + "\n\nПримеры: " + ruExample,
    why: "See fix-newform-282.mjs, fix-newform-283.mjs and fix-newform-284.mjs.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1 proposal final");
