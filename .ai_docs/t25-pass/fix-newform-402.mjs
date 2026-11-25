// Node 12.3.7, the current 1.26: a proposal that carries out the owner's ruling of 2026-11-16 that a RecordType variant
// is always declared where its RecordType is declared, since 1.26 placed it where its value is declared, which under
// 1.30 to 1.32 can be another domain, against 12.3.5. It also carries out the reviewers' findings: "variant" is always
// "RecordType variant"; the `refines` link cites 6.1; a combination of values, one of each field that chooses the
// variant, has one RecordType variant; the fields that choose the variant may be named by a RecordType that the
// RecordType refines; the reason says what problem variants solve; two examples are added.
// The temporary key "12.3.7~" holds the proposal for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-402.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.7"];
const RT = "s-7vm323mhry2enx3", REFINES = "s-sn6au3vcr9uy5pm", DOMAIN = "s-h6h25ctd3yryudh";
const title = "RecordType variants", ruTitle = "Варианты RecordType";
const text = [
  `A RecordType variant declares the fields that a data record of a RecordType (§${RT}) holds because of the values of some fields of that RecordType. Those fields are the fields that choose the RecordType's variant. They are named by the RecordType itself or by a RecordType that it refines. Each combination of their values, one value of each field, has its own RecordType variant if the combination brings fields of its own, and only then.`,
  `A RecordType variant is a RecordType that:\n- is declared where the RecordType it is a variant of is declared: in the same domain or in the contracts section (§${DOMAIN});\n- refers through a \`refines\` link (§${REFINES}) to that RecordType;\n- names the values it corresponds to, one value of each field that chooses the variant.`,
].join("\n\n");
const ruText = [
  `Вариант RecordType объявляет поля, которые запись данных RecordType (§${RT}) содержит из-за значений некоторых полей этого RecordType. Эти поля — поля, которые выбирают вариант RecordType. Их называет сам RecordType или RecordType, который он уточняет. Каждое сочетание их значений, по одному значению каждого поля, имеет свой вариант RecordType, если это сочетание приносит собственные поля, и только тогда.`,
  `Вариант RecordType — это RecordType, который:\n- объявлен там же, где RecordType, вариантом которого он является: в том же домене или в контрактах (§${DOMAIN});\n- ссылается через связь \`refines\` (§${REFINES}) на этот RecordType;\n- называет значения, которым он соответствует, по одному значению каждого поля, которое выбирает вариант.`,
].join("\n\n");
const reason = `Where the values of some fields decide which other fields a data record holds, a RecordType alone does not describe every field that the domains reading its data records can expect. Its RecordType variants describe the rest. Since they are declared where the RecordType is declared, those domains find the whole description of the data records where they look for the RecordType (§${RT}).`;
const ruReason = `Когда значения одних полей определяют, какие ещё поля содержит запись данных, сам RecordType описывает не все поля, которых могут ожидать домены, читающие его записи данных. Остальное описывают его варианты RecordType. Поскольку варианты объявлены там же, где RecordType, эти домены находят полное описание записей данных там, где ищут сам RecordType (§${RT}).`;
const examples = [
  "The RecordType of a notification names its field `channel` as the field that chooses its variant. The value `email` brings the field `address`, so the RecordType variant for `email` declares `address`. The value `app` brings no field, so it has no RecordType variant.",
  "The audit domain keeps the RecordType of an audit log entry, whose field `domain` takes the names of the domains as its values. Entries about orders also hold the number of the order. The value `orders` comes from the domain of orders, but its RecordType variant is declared in the audit domain.",
];
const ruExamples = [
  "RecordType уведомления называет своё поле `channel` полем, которое выбирает его вариант. Значение `email` приносит поле `address`, поэтому вариант RecordType для `email` объявляет `address`. Значение `app` не приносит полей, поэтому варианта RecordType у него нет.",
  "Домен аудита хранит RecordType записи журнала аудита. Значения его поля `domain` — имена доменов. Записи о заказах содержат ещё номер заказа. Значение `orders` приходит из домена заказов, а его вариант RecordType объявлен в домене аудита.",
];
const block = (label, items) => items.map((x) => `${label}: ${x}`).join("\n\n");
n.changes = ["Нынешний 1.26 переносится в раздел 12 и переписывается: вариант RecordType объявляется там же, где RecordType, вариантом которого он является (ваше решение 16 ноября)."];
n.proposals = [
  {
    where: "заголовок, текст, обоснование и примеры",
    en: [`Title: ${title}`, `Text: ${text}`, block("Example", examples), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, block("Пример", ruExamples), `Обоснование: ${ruReason}`].join("\n\n"),
    why: [
      "Смысл. Было: вариант стоит в той части спецификации, которая объявляет его значение. Стало: вариант объявлен там же, где его RecordType, — в том же домене или в контрактах. Так вы решили 16 ноября: по 1.30–1.32 значение может объявить другой домен, и прежнее правило уводило вариант в чужой домен, вопреки 12.3.5.",
      "Заголовок. Было: «Вариант RecordType есть только у значения, которое приносит свои поля». Стало: «Варианты RecordType». Прежний заголовок излагал правило (7.3.1).",
      "Текст. Первым идёт то, что объявляет вариант RecordType, а не длинное условие (7.2.2). Предложения «У значения, которое не приносит полей, варианта нет» и «Запись, содержащая такое значение, содержит только собственные поля своего RecordType» заменены одним: у сочетания значений есть свой вариант, если оно приносит собственные поля, и только тогда. Второе из прежних предложений следовало из первого абзаца и из 12.3.4.",
      "Добавлено то, что уже проверяют инструменты, но не говорил 1.26: вариант соответствует сочетанию значений, по одному на каждое поле, которое выбирает вариант, и у сочетания один вариант; поля, которые выбирают вариант, может назвать и RecordType, который этот RecordType уточняет, например фрагмент формата из контрактов.",
      "Слово «вариант» везде — «вариант RecordType». RecordType и связь `refines` ссылаются на свои узлы (7.2.7).",
      "Обоснование. Было: два предложения, которые разбирали текст по частям (7.4.2). Стало: какую задачу решают варианты и почему они объявляются там же, где RecordType.",
      "Примеры новые: уведомление с полем `channel` показывает, что такое вариант, а запись журнала аудита — где он объявлен.",
    ].join(" "),
  },
];
d["12.3.7~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["12.3.7~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
