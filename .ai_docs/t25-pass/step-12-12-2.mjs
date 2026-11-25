// Row 12.12.1 and the change to 12.1 are agreed (the owner, 2026-11-18, «ок»). Their English says
// "regardless of letter case", as EngStickler's reader recommended, since "whatever the case" also reads
// as the idiom "in any event"; the Russian is unchanged. Row 12.12.2, on fields of type `identifier of`,
// gets its proposal: the approved row holds two requirements, each of which can be met without the
// other, so it becomes two rows, and the rows after it are renumbered.
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
const write = (p, d) => fs.writeFileSync(new URL(p, here), JSON.stringify(d, null, 2) + "\n");

const t = read("table-12-12.json");
const rows = t.tables[0].rows;
const r1 = rows.find((r) => r.num === "12.12.1");
r1.en = "RecordType names are unique across the specification, regardless of letter case";
r1.ru = r1.proposals[0].ru;
r1.agreed = "2026-11-18";
r1.change = `Переходит сюда из таблицы 10.1 по вашему решению от 18 ноября. Вы согласовали её 18 ноября вместе с правкой 12.1: ${r1.proposals[0].why} В английском — «regardless of letter case» по замечанию читателя: «whatever the case» читается и как «в любом случае».`;
delete r1.proposals;

const i2 = rows.findIndex((r) => r.num === "12.12.2");
const r2 = rows[i2];
r2.rests = ["s-7vm323mhry2enx3"];
r2.impl = ["s-3anv9qcmx8pwp2w"];
r2.about = "Затрагивает каждое поле типа `identifier of`. Тип идентификатора берётся из поля, которое идентифицирует записи данных того RecordType, на который он ссылается. Без такого поля тип не из чего взять.";
r2.proposals = [{
  en: "Row 12.12.2: A field of type `identifier of` refers to a RecordType that names one of its own fields as the field identifying its data records\nRow 12.12.3, new: Identifiers, followed from each identifying field to the next, end in a field of another type",
  ru: "Строка 12.12.2: Поле типа `identifier of` ссылается на RecordType, который называет одно из своих полей полем, идентифицирующим его записи данных\nСтрока 12.12.3, новая: Идентификаторы, если идти от одного идентифицирующего поля к следующему, заканчиваются полем другого типа",
  why: "Смысл тот же. В одобренной строке два требования, и каждое выполнимо без другого (7.3.3), поэтому они становятся двумя строками, как 11.3.1. Первое — ваше решение от 31 октября: идентификатор имеет тип поля, которое идентифицирует записи данных, а это поле называет RecordType этих данных (согласованный 12.2). Второе — тоже от 31 октября: цепочка идентификаторов, вернувшаяся к уже пройденному RecordType, не даёт типа, который можно задать в реализации.",
}];
const r3 = { n: 38.5, num: "", was: "", en: "Identifiers, followed from each identifying field to the next, end in a field of another type", cost: "refused",
  ru: "Идентификаторы, если идти от одного идентифицирующего поля к следующему, заканчиваются полем другого типа", ruCost: "отклоняется", fate: "from 10.1",
  change: "Вторая половина одобренной строки об `identifier of`; показывается вместе с 12.12.2.", rests: ["s-7vm323mhry2enx3"], impl: ["s-3anv9qcmx8pwp2w"], proposals: [],
  about: "Затрагивает цепочки идентификаторов. Цепочка, которая возвращается к уже пройденному RecordType, не даёт идентификатору типа." };
if (!rows.some((r) => r.n === 38.5)) rows.splice(i2 + 1, 0, r3);
rows.forEach((r, k) => (r.num = `12.12.${k + 1}`));
write("table-12-12.json", t);

const nf = read("newform.json");
const n = nf["12.1"];
const pr = n.proposals[0].pairs[0];
const toEn = "RecordType names are unique across the specification, regardless of letter case.";
if (!n.text.includes(pr.en.from) || !n.ruText.includes(pr.ru.from)) throw new Error("12.1 sentence not found");
n.text = n.text.split(pr.en.from).join(toEn);
n.ruText = n.ruText.split(pr.ru.from).join(pr.ru.to);
n.changes.push("Вы приняли 18 ноября («ок») оговорку по вашему решению от 30 октября: имена RecordType уникальны без учёта регистра букв. В английском — «regardless of letter case». Согласование сохраняется.");
delete n.proposals;
write("newform.json", nf);
console.log(rows.map((r) => r.num + (r.agreed ? "✓" : "")).join(" "));
