// Records row 12.12.6 as agreed and proposes row 12.12.8 split into two rows, one requirement each: the fields a
// variant names values of, and where each of those values must be.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
const row = (num) => {
  const r = rows.find((x) => x.num === num);
  if (!r) throw new Error(`no row ${num}`);
  return r;
};

const r6 = row("12.12.6");
const p6 = r6.proposals[0];
r6.en = p6.en;
r6.ru = p6.ru;
delete r6.proposals;
r6.rests = ["s-z3dnru6qqdf9m6j"];
r6.agreed = "2026-11-19";
r6.change += " Вы согласовали её 19 ноября («ок»): по согласованному 12.6 вариант объявлен в том же разделе базовой спецификации, что и его RecordType; строка больше не опирается на 1.32.";

const r8 = row("12.12.8");
r8.impl = ["s-c2r9jndrjbtbsv6"];
r8.about = "Затрагивает каждый вариант RecordType. Из значений, которые называет вариант, генерируется условие `if`, при котором запись получает его поля.";
r8.proposals = [{
  en: "A RecordType variant names values only of the fields that select a variant of its RecordType, one value for each of them",
  ru: "Вариант RecordType называет значения только тех полей, которые выбирают вариант его RecordType, по одному значению каждого из них",
  why: "В одобренной строке два требования, и каждое выполнимо без другого (7.3.3), поэтому они становятся двумя строками, как 12.12.2 и 12.12.3. Эта строка проверяет третий пункт списка 12.6. «Отвечает на значения» заменено на «называет значения», как в 12.6.",
}];
rows.splice(rows.indexOf(r8) + 1, 0, {
  n: 30.5,
  num: null,
  was: "",
  en: "",
  cost: "refused",
  ru: "",
  ruCost: "отклоняется",
  fate: "new",
  change: "Новая строка: вторая половина одобренной строки 12.12.8. «Одно из объявленных источником выбирающего поля» заменено на «есть в `enum` этого поля»: по вашему решению привести RecordType к JSON Schema значения поля из любого источника стоят в его `enum` (12.7, 12.9).",
  rests: ["s-z3dnru6qqdf9m6j", "s-xfu2gpzddjnmgks"],
  impl: ["s-c2r9jndrjbtbsv6"],
  about: "Затрагивает каждый вариант RecordType. Вариант для значения, которого у поля нет, не соответствует ни одной записи данных.",
  proposals: [{
    en: "Each value that a RecordType variant names for a field is in the `enum` of that field",
    ru: "Каждое значение, которое вариант RecordType называет для поля, есть в `enum` этого поля",
    why: "Вторая половина одобренной строки 12.12.8, отдельной строкой.",
  }],
});

fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");
console.log("12.12.6 agreed; 12.12.8 split proposed");
