// Node 12.13, the current 1.30 "Domain names as a field's values" (s-gqavjzcmubg5pvk), generalized as the owner chose on
// 2026-11-18 («1»): the values of a field of type `one of` may be the names of the parts into which the base specification
// is divided (1.1.2), so the RecordType extension names no domain (1.7.4). An example shows the case with domains.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-12-13.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.13"]) throw new Error("12.13 already drafted");
const PARTS = "s-qmmzf9nksfsa3qp"; // 1.1.2 The basic structure of the specification
d["12.13"] = {
  from: "1.30",
  sid: "kept",
  title: "Names of the parts of the base specification as a field's values",
  ruTitle: "Имена частей базовой спецификации как значения поля",
  text: `The values of a field of type \`one of\` may be the names of the parts into which the base specification is divided (§${PARTS}), read from the specification. A part added or removed adds or removes a value.`,
  ruText: `Значениями поля типа \`one of\` могут быть имена частей, на которые разделена базовая спецификация (§${PARTS}), прочитанные из спецификации. Часть, добавленная или удалённая, добавляет или удаляет значение.`,
  reason: "The names of the parts are already held by the specification, so a field whose values they are declares none of them again and cannot fall behind it.",
  ruReason: "Имена частей уже есть в спецификации, поэтому поле, значения которого — эти имена, не объявляет ни одного из них заново и не может от спецификации отстать.",
  examples: ["In a base specification divided into domains, the field `domain` of the RecordType of an audit log entry takes as its values the names of the domains and of the contracts section. A domain added to the specification adds its name to those values."],
  ruExamples: ["В базовой спецификации, разделённой на домены, поле `domain` RecordType записи журнала аудита принимает как значения имена доменов и контрактов. Домен, добавленный в спецификацию, добавляет своё имя к этим значениям."],
  changes: [
    "Нынешний 1.30 «Имена доменов как значения поля», обобщённый по вашему выбору 18 ноября: «имена доменов» → «имена частей, на которые разделена базовая спецификация (§1.1.2)». Так расширение RecordType не называет доменов (1.7.4).",
    "«Домен, добавленный или удалённый» → «Часть, добавленная или удалённая»; в обосновании «имена доменов» → «имена частей».",
    "Добавлен пример: случай с доменами, на котором стоит второй пример 12.6.",
  ],
};
// Keep the order of the keys: 12.13 after 12.7, where the section's drafts stand.
const out = {};
for (const [k, v] of Object.entries(d)) { if (k !== "12.13") out[k] = v; if (k === "12.7") out["12.13"] = d["12.13"]; }
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const a = '["12.13","move",0,"1.30","Domain names as a field\'s values"';
if (!h.includes(a)) throw new Error("row 12.13");
h = h.split(a).join('["12.13","move",0,"1.30","Names of the parts of the base specification as a field\'s values"');
fs.writeFileSync(page, h);
console.log("ok");
