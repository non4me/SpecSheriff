// 1.7.7 is agreed with its example (the owner, 2026-11-19, «ок»). Row 12.12.4, on fields of type `variant`,
// gets its proposal, together with a sentence for the agreed 12.6: no agreed rule says where a data record
// holds the fields of its RecordType variant, which the owner ruled on 2026-10-31 (the approved 1.26).
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const nf = read("newform.json");
nf["1.7.7"].agreed = "2026-11-19";
nf["1.7.7"].changes.push("Вы согласовали узел 19 ноября («ок») вместе с примером.");
nf["1.7.7"].doubts = ["Строку основной таблицы проверок для 1.7.7 не предлагаем: таблицы проверок расширений поставляются с плагином, проект их не правит, и такая проверка в проекте всегда проходила бы. Их форму проверяют тесты самих инструментов SpecSheriff."];
const n = nf["12.6"];
n.proposals = [{
  pairs: [{ en: { from: n.text, to: n.text + "\n\nA data record holds the fields of its RecordType variant in the one field of type `variant` of its RecordType." }, ru: { from: n.ruText, to: n.ruText + "\n\nПоля своего варианта запись данных содержит в единственном поле типа `variant` своего RecordType." } }],
  why: "Ваше решение от 31 октября (одобренный 1.26): запись данных содержит не более одного поля типа `variant`; иначе не сказано, в каком из них лежат поля выбранного варианта. Ни один согласованный узел раздела 12 этого пока не говорит.",
}];
write("newform.json", nf);

const t = read("table-12-12.json");
const r = t.tables[0].rows.find((x) => x.num === "12.12.4");
r.rests = ["s-z3dnru6qqdf9m6j"];
r.impl = ["s-c2r9jndrjbtbsv6"];
r.about = "Затрагивает каждый RecordType, у которого есть варианты. Поля выбранного варианта лежат в поле типа `variant`; будь таких полей два, было бы не сказано, в котором из них.";
r.proposals = [{
  en: "A RecordType holds at most one field of type `variant`, including the fields it inherits from the RecordTypes it refines",
  ru: "RecordType содержит не более одного поля типа `variant`, считая поля, унаследованные от RecordType, которые он уточняет",
  why: "Смысл тот же. «The ones it inherits counted» — неуклюжий оборот; теперь сказано, откуда поля унаследованы: от RecordType, которые он уточняет по связи `refines`.",
}];
write("table-12-12.json", t);
console.log("1.7.7 agreed; 12.12.4 and 12.6 proposed");
