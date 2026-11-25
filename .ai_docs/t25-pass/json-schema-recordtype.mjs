// Carries out the owner's ruling of 2026-11-19 that everything about RecordType follows JSON Schema 2020-12. The
// changes that only rename a field type to its JSON Schema keyword, or remove what the ruling removes, are written as
// agreed, since the owner accepted every purely mechanical change at once. 12.6, whose change is one of principle, gets
// a proposal; rows 12.12.7 and the new row after it, which follow from that proposal, get proposals too.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const DATE = "2026-11-19";
const RULING = "По вашему решению от 19 ноября: всё, что касается RecordType, приводится к JSON Schema 2020-12; механические правки вы приняли сразу.";

const nfFile = new URL("newform.json", here);
const ttFile = new URL("table-12-12.json", here);
fs.copyFileSync(nfFile, new URL("newform.before-json-schema.json", here));
fs.copyFileSync(ttFile, new URL("table-12-12.before-json-schema.json", here));
const nf = JSON.parse(fs.readFileSync(nfFile, "utf8"));
const tt = JSON.parse(fs.readFileSync(ttFile, "utf8"));

const swap = (s, pairs, where) => {
  let out = s;
  for (const [a, b] of pairs) out = out.split(a).join(b);
  if (out === s) throw new Error(`nothing to rename in ${where}`);
  return out;
};
const ONE_OF_EN = [["a field of type `one of`", "a field with `enum`"], ["Every field of type `one of`", "Every field with `enum`"], ["Each value of a field of type `one of`", "Each value of a field with `enum`"]];
const ONE_OF_RU = [["поля типа `one of`", "поля с `enum`"], ["Каждое поле типа `one of`", "Каждое поле с `enum`"]];

// 12.7, 12.8, 12.9 and 12.11: a field of type `one of` is a field with `enum`.
for (const key of ["12.7", "12.8", "12.9", "12.11"]) {
  const n = nf[key];
  n.text = swap(n.text, ONE_OF_EN, `${key} text`);
  n.ruText = swap(n.ruText, ONE_OF_RU, `${key} ruText`);
  if (n.title.includes("`one of`")) n.title = swap(n.title, ONE_OF_EN, `${key} title`);
  if (n.ruTitle.includes("`one of`")) n.ruTitle = swap(n.ruTitle, ONE_OF_RU, `${key} ruTitle`);
  n.changes.push(`${RULING} «Поле типа \`one of\`» стало «полем с \`enum\`»: так JSON Schema называет список допустимых значений. Смысл не изменился.`);
}

// 12.6: the fields of a variant stand beside the fields of its RecordType.
const n6 = nf["12.6"];
const oldLastEn = "A data record holds the fields of its RecordType variant in the single field of type `variant` of its RecordType.";
const oldLastRu = "Поля своего варианта запись данных содержит в единственном поле типа `variant` своего RecordType.";
if (!n6.text.endsWith(oldLastEn) || !n6.ruText.endsWith(oldLastRu)) throw new Error("12.6 does not end as expected");
const text6 = n6.text.slice(0, -oldLastEn.length) + "A data record holds the fields of its RecordType variant beside the fields of its RecordType. The name of each field of a RecordType variant differs from the names of the fields of its RecordType, including inherited ones.";
const ruText6 = n6.ruText.slice(0, -oldLastRu.length) + "Запись данных содержит поля своего варианта рядом с полями своего RecordType. Имя каждого поля варианта отличается от имён полей его RecordType, считая унаследованные.";
const ex6 = [n6.examples[0].replace("so the RecordType variant for `email` declares `address`.", "so the RecordType variant for `email` declares `address`. A data record of a notification by email holds `address` beside `channel` and `text`."), n6.examples[1]];
const ruEx6 = [n6.ruExamples[0].replace("поэтому вариант RecordType для `email` объявляет `address`.", "поэтому вариант RecordType для `email` объявляет `address`. Запись данных уведомления по email содержит `address` рядом с `channel` и `text`."), n6.ruExamples[1]];
if (ex6[0] === n6.examples[0] || ruEx6[0] === n6.ruExamples[0]) throw new Error("12.6 example not changed");
n6.proposals = [{
  en: [`Title: ${n6.title}`, `Text: ${text6}`, ...ex6.map((e) => `Example: ${e}`), `Reason: ${n6.reason}`].join("\n\n"),
  ru: [`Заголовок: ${n6.ruTitle}`, `Текст: ${ruText6}`, ...ruEx6.map((e) => `Пример: ${e}`), `Обоснование: ${n6.ruReason}`].join("\n\n"),
  why: `${RULING} В JSON Schema поля, которые зависят от значения другого поля, стоят в том же объекте: их добавляет пара if/then. Поэтому последний абзац говорит, что поля варианта стоят рядом с полями RecordType, а не в поле типа \`variant\`. Новое предложение об именах нужно, потому что запись не может содержать два поля с одним именем. В первый пример добавлено, как выглядит такая запись.`,
}];

// Table 12.12.
const rows = tt.tables[0].rows;
const row = (num) => {
  const r = rows.find((x) => x.num === num);
  if (!r) throw new Error(`no row ${num}`);
  return r;
};
const rename = (num, en, ru, note) => {
  const r = row(num);
  r.en = swap(r.en, en, `${num} en`);
  r.ru = swap(r.ru, ru, `${num} ru`);
  r.change += ` ${RULING} ${note}`;
};
rename("12.12.2", [["A field of type `identifier of`", "A field with `identifierOf`"]], [["Поле типа `identifier of`", "Поле с `identifierOf`"]], "«Поле типа `identifier of`» стало «полем с `identifierOf`»: в JSON Schema нет ссылок между записями, поэтому это слово SpecSheriff. Смысл не изменился.");
rename("12.12.3", [["a field of a type other than `identifier of`", "a field without `identifierOf`"]], [["полем типа, отличного от `identifier of`", "полем без `identifierOf`"]], "«Полем типа, отличного от `identifier of`» стало «полем без `identifierOf`». Смысл не изменился.");
rename("12.12.10", ONE_OF_EN, ONE_OF_RU, "«Поле типа `one of`» стало «полем с `enum`». Смысл не изменился.");
rename("12.12.11", ONE_OF_EN, ONE_OF_RU, "«Поле типа `one of`» стало «полем с `enum`». Смысл не изменился.");

// 12.12.4 is removed: there is no field of type `variant` any longer.
const r4 = row("12.12.4");
r4.fate = "deleted";
r4.en = "";
r4.ru = "";
r4.num = null;
r4.change = `Удаляется. ${RULING} Типа \`variant\` больше нет: поля варианта стоят рядом с полями RecordType, поэтому проверять нечего. Номера остальных строк пока не сдвигаются, чтобы не путать их во время согласования.`;
r4.agreed = DATE;

// 12.12.7 and the new row after it follow from the proposal for 12.6.
const r7 = row("12.12.7");
r7.proposals = [{
  en: "A RecordType variant declares at least one field",
  ru: "Вариант RecordType объявляет хотя бы одно поле",
  why: "Следует из предложения для 12.6: поля варианта стоят рядом с полями RecordType, а поля типа `variant` больше нет. Что каждое поле варианта новое, проверяет следующая строка, поэтому здесь остаётся только «хотя бы одно поле».",
}];
const at = rows.indexOf(r7);
rows.splice(at + 1, 0, {
  n: 29.5,
  num: null,
  was: "",
  en: "",
  cost: "refused",
  ru: "",
  ruCost: "отклоняется",
  fate: "new",
  change: "Новая строка. Следует из предложения для 12.6: имя каждого поля варианта отличается от имён полей его RecordType.",
  rests: ["s-z3dnru6qqdf9m6j"],
  impl: ["s-c2r9jndrjbtbsv6"],
  about: "Затрагивает каждый вариант RecordType. Поля варианта стоят в записи данных рядом с полями RecordType, а запись не может содержать два поля с одним именем.",
  proposals: [{
    en: "The name of each field of a RecordType variant differs from the names of the fields of its RecordType, including inherited ones",
    ru: "Имя каждого поля варианта RecordType отличается от имён полей его RecordType, считая унаследованные",
    why: "Проверяет новое предложение 12.6.",
  }],
});

fs.writeFileSync(nfFile, JSON.stringify(nf, null, 2) + "\n");
fs.writeFileSync(ttFile, JSON.stringify(tt, null, 2) + "\n");
console.log("12.7, 12.8, 12.9, 12.11 renamed; 12.6 proposal written; 12.12.2, 12.12.3, 12.12.10, 12.12.11 renamed; 12.12.4 removed; 12.12.7 proposal and a new row added");
