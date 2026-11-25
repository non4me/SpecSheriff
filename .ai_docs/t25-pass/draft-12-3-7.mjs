// Node 12.3.7, the present node 1.26 (s-z3dnru6qqdf9m6j), moved unchanged into section 12 of the new form: a draft that
// holds its present wording, so that it can be checked and shown to the owner in the review of every rule. The English
// is read from spec.json ("=1.26"); the Russian is written here, since full-ru.json has none for 1.26.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-12-3-7.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["12.3.7"]) throw new Error("12.3.7 already drafted");
const draft = {
  from: "1.26",
  sid: "kept",
  title: "=1.26",
  text: "=1.26",
  reason: "=1.26",
  ruTitle: "Вариант RecordType есть только у значения, которое приносит свои поля",
  ruText: [
    "Если поля RecordType зависят от значений некоторых его собственных полей, RecordType называет эти поля полями, выбирающими его вариант.",
    "У значения, которое приносит собственные поля, есть вариант RecordType. Этот вариант — RecordType в той части спецификации, которая объявляет это значение (§s-xfwuvd3funutmsw). Он:\n- уточняет RecordType;\n- называет значения, которым он соответствует;\n- объявляет поля, которые эти значения приносят.",
    "У значения, которое не приносит полей, варианта нет. Запись, содержащая такое значение, содержит только собственные поля своего RecordType.",
  ].join("\n\n"),
  ruReason: [
    "Вариант, который ничего не содержит, не говорит ничего сверх объявления своего значения, поэтому он был бы второй копией этого объявления.",
    "Вариант хранится в той части спецификации, которая объявляет его значение, поэтому эта часть добавляет вариант, не меняя ни RecordType, ни варианты, которые хранит другая часть.",
  ].join(" "),
  changes: ["Нынешний 1.26 переносится в раздел 12 без изменений; русский текст — перевод нынешней формулировки."],
};
const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "12.3.6") out["12.3.7"] = draft;
}
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log("drafted 12.3.7");
