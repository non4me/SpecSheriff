// Node 12.3.1: the owner noticed (2026-11-14) that the last sentence of the text repeated the first paragraph. It did:
// the data of a structure that only one domain's RecordTypes contain originates in that domain, so paragraph 1 already
// declares it there. Dropping it showed a contradiction: "data in the format of one RecordType originates in one domain
// only" did not hold for an address, whose data appears in several domains. So paragraph 1 speaks of records there, and
// paragraph 3 states the shared data structure as the exception to paragraph 1 in so many words.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};

p.en = swap(p.en, "Data in the format of one RecordType originates in one domain only.", "Records in one format originate in one domain only.");
p.en = swap(
  p.en,
  "A data structure that is only ever part of a record, such as an address, may be contained in the RecordTypes of several domains. Such a structure is declared once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7). A data structure that the RecordTypes of only one domain contain is declared in that domain.",
  "A data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address, is declared not in a domain but once, among the shared data structures of the contracts section (§s-z6tq6a3btnvvwx7).",
);
p.ru = swap(p.ru, "Данные в формате одного RecordType впервые появляются только в одном домене.", "Записи данных одного формата впервые появляются только в одном домене.");
p.ru = swap(
  p.ru,
  "Структура данных, которая бывает только частью записи, например адрес, может входить в RecordType нескольких доменов. Такая структура объявляется один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7). Структура данных, которая входит в RecordType только одного домена, объявляется в этом домене.",
  "Структура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес, объявляется не в домене, а один раз — среди общих структур данных в контрактах (§s-z6tq6a3btnvvwx7).",
);
p.why = "See fix-newform-282.mjs to fix-newform-285.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru.split("\n\nОбоснование:")[0]);
