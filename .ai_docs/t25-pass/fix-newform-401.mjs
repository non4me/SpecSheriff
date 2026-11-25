// Node 12.3.7, the present 1.26, approved in the owner's name by the pass of 2026-11-07 and not yet reviewed by the
// owner: a proposal, from the wording checker's findings against the agreed rules of section 7. The title stated the
// rule (7.3.1); the text opened with a long condition (7.2.2); "A value that brings none has no variant" stated what
// does not hold, and its "none" pointed into another paragraph; RecordType was not cited (7.2.7); the reason went through
// the text one part at a time (7.4.2). The meaning does not change. The temporary key "12.3.7~" holds it for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-401.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.7"];
const RT = "s-7vm323mhry2enx3", VAL = "s-xfwuvd3funutmsw";
const title = "RecordType variants", ruTitle = "Варианты RecordType";
const text = [
  `A RecordType (§${RT}) has a variant only for a value of its choosing fields that brings fields of its own. Its choosing fields are those whose values decide which other fields the RecordType holds, and the RecordType names them.`,
  `Each variant is a RecordType in the part of the specification that declares its value (§${VAL}). It:\n- refines the RecordType;\n- names the values it answers to;\n- declares the fields that those values bring.`,
  "A data record holding a value that brings no fields of its own holds only its RecordType's own fields.",
].join("\n\n");
const ruText = [
  `RecordType (§${RT}) имеет вариант только для такого значения своих выбирающих полей, которое приносит собственные поля. Выбирающие поля — это поля, от значений которых зависит, какие ещё поля содержит RecordType, и RecordType их называет.`,
  `Каждый вариант — это RecordType в той части спецификации, которая объявляет его значение (§${VAL}). Он:\n- уточняет RecordType;\n- называет значения, которым он соответствует;\n- объявляет поля, которые эти значения приносят.`,
  "Запись данных со значением, которое не приносит собственных полей, содержит только собственные поля своего RecordType.",
].join("\n\n");
const reason = "A variant keeps the fields that a value brings in the part of the specification that declares the value, so each part adds its values with their fields without changing the RecordType or another part. A variant for a value that brings no fields would only repeat the value's declaration.";
const ruReason = "Вариант держит поля, которые приносит значение, в той части спецификации, которая это значение объявляет, поэтому каждая часть добавляет свои значения с их полями, не меняя ни RecordType, ни другую часть. Вариант для значения, которое полей не приносит, только повторял бы объявление этого значения.";
n.proposals = [
  {
    where: "заголовок, текст и обоснование",
    en: [`Title: ${title}`, "", `Text: ${text}`, "", `Reason: ${reason}`].join("\n"),
    ru: [`Заголовок: ${ruTitle}`, "", `Текст: ${ruText}`, "", `Обоснование: ${ruReason}`].join("\n"),
    why: [
      "Заголовок. Было: «Вариант RecordType есть только у значения, которое приносит свои поля». Стало: «Варианты RecordType». Прежний заголовок излагал правило (7.3.1).",
      "Первый абзац. Было: «Если поля RecordType зависят от значений некоторых его собственных полей, RecordType называет эти поля полями, выбирающими его вариант.» и во втором абзаце «У значения, которое приносит собственные поля, есть вариант RecordType». Стало: главная мысль первой — «RecordType имеет вариант только для такого значения своих выбирающих полей, которое приносит собственные поля», затем что такое выбирающие поля. Прежний текст начинался с длинного условия (7.2.2). RecordType теперь ссылается на свой узел (7.2.7).",
      "Последний абзац. Было: «У значения, которое не приносит полей, варианта нет. Запись, содержащая такое значение, содержит только собственные поля своего RecordType.» Стало: «Запись данных со значением, которое не приносит собственных полей, содержит только собственные поля своего RecordType». Первое предложение говорило, чего нет, и это уже сказано словом «только» в первом абзаце.",
      "Обоснование. Было два предложения, которые разбирали текст по частям (7.4.2). Стало: зачем вариант держит поля в части, объявляющей значение, и почему вариант без полей не нужен — одной мыслью о правиле в целом. Смысл узла не меняется.",
    ].join(" "),
  },
];
d["12.3.7~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason };
delete d["12.3.7~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
