// Applies specsheriff-rule-reviewer's findings of 2026-11-19 to the proposal for 12.6 and to the new row of 12.12 that
// follows from it: the sentence on the names of a variant's fields names the fields the variant declares, and no longer
// uses the undefined word "inherited"; example 2 in Russian says that the audit domain declares its RecordType; the
// ruling goes into the draft's decisions; row 12.12.7 names the node of the appendix of the tools that implements it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const nfFile = new URL("newform.json", here);
const ttFile = new URL("table-12-12.json", here);
const nf = JSON.parse(fs.readFileSync(nfFile, "utf8"));
const tt = JSON.parse(fs.readFileSync(ttFile, "utf8"));
const swap = (s, a, b, where) => {
  if (!s.includes(a)) throw new Error(`not found in ${where}: ${a}`);
  return s.split(a).join(b);
};

const OLD_EN = "The name of each field of a RecordType variant differs from the names of the fields of its RecordType, including inherited ones";
const NEW_EN = "The name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from a RecordType that it refines";
const OLD_RU = "Имя каждого поля варианта отличается от имён полей его RecordType, считая унаследованные";
const NEW_RU = "Имя каждого поля, которое объявляет вариант RecordType, отличается от имени любого поля, которое его RecordType объявляет сам или берёт из RecordType, который он уточняет";

const p = nf["12.6"].proposals[0];
p.en = swap(p.en, OLD_EN, NEW_EN, "12.6 en");
p.ru = swap(p.ru, OLD_RU, NEW_RU, "12.6 ru");
p.ru = swap(p.ru, "домен аудита хранит RecordType записи журнала аудита", "домен аудита объявляет RecordType записи журнала аудита", "12.6 ru example 2");
p.why += " Предложение об именах — отступление от JSON Schema: там `then` может сузить поле, которое RecordType уже объявляет. В SpecSheriff поле RecordType есть в записи при любом варианте, поэтому вариант его не объявляет (первый абзац). Условие, которое связывает такое поле с другим полем, 12.2 записывает отдельным правилом. Во втором примере «хранит RecordType» заменено на «объявляет RecordType», как в английском.";

nf["12.6"].decisions = [...(nf["12.6"].decisions ?? []), {
  date: "2026-11-19",
  problem: "The fields of a RecordType variant were held in a nested field of type `variant`, a structure that JSON Schema does not have, although the SpecSheriff tools check both the nodes and the data records against schemas written in JSON Schema.",
  ruling: "The owner: everything about RecordType follows JSON Schema 2020-12. A data record holds the fields of its RecordType variant beside the fields of its RecordType, as a pair of `if` and `then` adds them in JSON Schema. The type `variant` is dropped, and with it the ruling of 2026-10-31 that a data record holds at most one field of that type. The other half of that ruling, that two independent choices are two data records, stands.",
}];

const rows = tt.tables[0].rows;
const added = rows.find((r) => r.n === 29.5);
const q = added.proposals[0];
q.en = swap(q.en, OLD_EN, NEW_EN, "new row en");
q.ru = swap(q.ru, "Имя каждого поля варианта RecordType отличается от имён полей его RecordType, считая унаследованные", NEW_RU, "new row ru");
added.about = "Затрагивает каждый вариант RecordType. Поля варианта стоят в записи данных рядом с полями RecordType. Поле, которое объявляет RecordType, есть в записи при любом варианте, поэтому вариант его не объявляет. Условие, которое связывает такое поле с другим полем, 12.2 записывает отдельным правилом.";
const r7 = rows.find((r) => r.num === "12.12.7");
r7.impl = ["s-c2r9jndrjbtbsv6"];

fs.writeFileSync(nfFile, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(ttFile, JSON.stringify(tt, null, 2) + "\n");
console.log(p.ru);
