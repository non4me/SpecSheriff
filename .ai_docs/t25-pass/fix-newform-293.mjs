// Node 12.3.1 rewritten in short sentences at the owner's request (2026-11-14): «твои формулировки слишком многословные
// и не понятные. Попробуй это описать через несколько коротких предложений». The owner also objected that a format cannot be
// part of a record, since a record is the data itself and not its structure. So the exception now speaks of a format
// whose data appears only inside the records of several domains; the first paragraph is the owner's, unchanged.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.1"];

const en = [
  "Title: RecordType",
  "",
  "Text: A RecordType (§s-6eb92ddch7shuvu) is a data format that forms part of a domain's API. A domain's RecordTypes describe the data that the domain outputs and keeps in its store. Other domains may use that data, whole or in part.",
  "",
  "Data in one format has one RecordType. It is declared in the only domain where data in that format first appears. The exception is a format whose data appears only inside the records of several domains. An address is an example. Such a format is declared in the contracts section (§s-z6tq6a3btnvvwx7).",
  "",
  "A domain may offer data it has taken from another domain in the same format. It may change the values in that data, but not its structure. The RecordType then keeps its name. A domain that changes the structure declares a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "",
  "Reason: Other domains see a domain only through the data it outputs. So the RecordTypes of that data are the domain's API.",
  "",
  "Two descriptions of one format drift apart over time. So a format is described once, under one name, by the domain that changes it. A format whose data appears in several domains belongs to none of them. So it is kept in the contracts section.",
  "",
  "Examples: The domain of orders declares the RecordType of an order. The domain of invoices takes orders and declares the RecordType of an invoice. Both formats contain a sum of money. The format of a sum of money is declared once, in the contracts section.",
].join("\n");
const ru = [
  "Заголовок: RecordType",
  "",
  "Текст: RecordType (§s-6eb92ddch7shuvu) — это формат данных, относящийся к API домена. RecordType домена описывают данные, которые домен выдаёт и хранит в своём хранилище. Другие домены могут использовать эти данные целиком или частично.",
  "",
  "У данных одного формата один RecordType. Он объявляется в том единственном домене, где данные этого формата появляются впервые. Исключение — формат данных, которые встречаются только внутри записей нескольких доменов. Например, адрес. Такой формат объявляется в контрактах (§s-z6tq6a3btnvvwx7).",
  "",
  "Домен может предлагать дальше данные, взятые у другого домена, в том же формате. Он может менять в них значения, но не структуру. Имя RecordType при этом не меняется. Домен, который меняет структуру, объявляет свой RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "",
  "Обоснование: Другие домены видят домен только через данные, которые он выдаёт. Поэтому RecordType этих данных — это API домена.",
  "",
  "Два описания одного формата со временем расходятся. Поэтому формат описывается один раз, под одним именем, тем доменом, который его меняет. Формат, данные которого появляются в нескольких доменах, не принадлежит ни одному из них. Поэтому он хранится в контрактах.",
  "",
  "Примеры: Домен заказов объявляет RecordType заказа. Домен счетов берёт заказы и объявляет RecordType счёта. Оба формата содержат денежную сумму. Формат денежной суммы объявлен один раз — в контрактах.",
].join("\n");

n.proposals[0].en = en;
n.proposals[0].ru = ru;
n.proposals[0].why = "See fix-newform-282.mjs to fix-newform-293.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1 rewritten in short sentences");
