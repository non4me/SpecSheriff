// Node 12.3.1: the owner's remarks of 2026-11-14.
// - "It is declared in the domain where data in its format first appears" and "Records in one format originate in one
//   domain only" stated one thought from two ends: they become one sentence, "the only domain where…".
// - The sentence on a RecordType variant read as a second statement of where a RecordType is declared. It is an
//   exception to that rule, as the shared data structure is, so the paragraph names both as the two exceptions.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

const enOld2 =
  "Data in one format has one RecordType. That RecordType is declared in the domain where data in its format originates. Records in one format originate in one domain only. A RecordType variant is declared where the value it answers to is declared (§s-z3dnru6qqdf9m6j).";
const enNew2 = [
  "Data in one format has one RecordType. It is declared in the only domain where data in its format first appears, with two exceptions:",
  "- a data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address, is declared once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7);",
  "- a RecordType variant is declared where the value that selects it is declared (§s-z3dnru6qqdf9m6j).",
].join("\n");
const enOld4 =
  "\n\nA data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address, is declared not in a domain but once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7).";
p.en = swap(p.en, enOld2, enNew2);
p.en = swap(p.en, enOld4, "");

const ruOld2 =
  "У данных одного формата один RecordType. Он объявляется в домене, в котором впервые появляются данные в его формате. Записи данных одного формата впервые появляются только в одном домене. Вариант RecordType объявляется там, где объявлено значение, которому он соответствует (§s-z3dnru6qqdf9m6j).";
const ruNew2 = [
  "У данных одного формата один RecordType. Он объявляется в том единственном домене, в котором впервые появляются данные в его формате, кроме двух случаев:",
  "- структура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес, объявляется один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7);",
  "- вариант RecordType объявляется там, где объявлено значение, которое его выбирает (§s-z3dnru6qqdf9m6j).",
].join("\n");
const ruOld4 =
  "\n\nСтруктура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес, объявляется не в домене, а один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7).";
p.ru = swap(p.ru, ruOld2, ruNew2);
p.ru = swap(p.ru, ruOld4, "");
p.why = "See fix-newform-282.mjs to fix-newform-287.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru.split("\n\nОбоснование:")[0]);
