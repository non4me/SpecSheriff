// Node 12.3.1: the owner dictated a shorter exception (2026-11-14): «Исключение — формат данных общий для нескольких
// доменов. Такой формат храниться в контрактах. Например - адрес.» The agent assessed it and proposes two fixes, shown to
// the owner with their reasons:
// - «формат данных общий для нескольких доменов» also fits a domain's own record that other domains read, such as an
//   order that the invoicing domain takes, which the main rule keeps in its domain; «формат части записи данных» keeps
//   the exception to what is only ever part of a record.
// - «хранится» → «объявляется», the verb of the rule it is an exception to.
// The example now says that the format of the sum of money is declared in the contracts section, since the text no
// longer names the shared data structures.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(
  p.en,
  "The exception is a data structure that is only ever part of a record and that the RecordTypes of several domains reuse, as a field's type or by extending it, such as an address: it is declared once, together with its variants, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7).",
  "The exception is a format that several domains share for a part of a record. Such a format is declared in the contracts section (§s-z6tq6a3btnvvwx7). An address is an example.",
);
p.en = swap(p.en, "Both RecordTypes contain a sum of money, which is declared once, among the shared data structures.", "Both RecordTypes contain a sum of money, whose format is declared once, in the contracts section.");
p.ru = swap(
  p.ru,
  "Исключение — структура данных, которая бывает только частью записи данных и которую переиспользуют RecordType нескольких доменов — как тип поля или расширяя её, — например адрес: она объявляется один раз вместе со своими вариантами — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7).",
  "Исключение — формат части записи данных, общий для нескольких доменов. Такой формат объявляется в контрактах (§s-z6tq6a3btnvvwx7). Например, адрес.",
);
p.ru = swap(p.ru, "Оба RecordType содержат денежную сумму, а она объявлена один раз — среди общих структур данных.", "Оба RecordType содержат денежную сумму, а её формат объявлен один раз — в контрактах.");
p.why = "See fix-newform-282.mjs to fix-newform-292.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1: the owner's exception, with two fixes");
