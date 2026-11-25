// Node 1.7.2, agreed: a proposal under the owner's ruling of 2026-11-16 that an extension of the guidelines only adds
// rules and refines rules of the SpecSheriff guidelines, never changing them, since a change is unsafe. It replaces the
// earlier proposal, which kept the change and limited it to one extension for each rule. The node mirrors 2.3, which
// holds a project's own guidelines to the same limit. The temporary key "1.7.2~" holds the proposal for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-404.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.7.2"];
const EXT = "s-mbmnsnxenmavu3z", LINKS = "s-sn6au3vcr9uy5pm", OWN = "s-u7tw6m8npxmv5tu";
const title = "How an extension relates to the rules of the guidelines";
const ruTitle = "Как расширение соотносится с правилами guidelines";
const text = `A rule of an extension of the guidelines (§${EXT}) either adds a rule to the SpecSheriff guidelines or refines one of their rules (§${LINKS}). It agrees with every rule of the SpecSheriff guidelines.`;
const ruText = `Правило расширения guidelines (§${EXT}) либо добавляет к SpecSheriff guidelines новое правило, либо уточняет одно из их правил (§${LINKS}). Оно согласуется с каждым правилом SpecSheriff guidelines.`;
const reason = `A rule of the SpecSheriff guidelines then holds in every project that uses it, whatever extensions the project has chosen. A project's own guidelines are held to the same limit (§${OWN}), so a reader, an agent or a tool can rely on a rule of the SpecSheriff guidelines without reading the extensions a project uses.`;
const ruReason = `Тогда правило SpecSheriff guidelines действует в каждом проекте, который его использует, какие бы расширения проект ни выбрал. Собственные guidelines проекта подчиняются тому же ограничению (§${OWN}), поэтому читатель, агент или инструмент может полагаться на правило SpecSheriff guidelines, не читая расширений, которые использует проект.`;
const examples = ["An extension that divides the base specification into parts refines the rule on links: a link may cross the boundary of a part. The most likely mistake: an extension says that a check of the guidelines does not run in a project that uses that extension."];
const ruExamples = ["Расширение, которое делит базовую спецификацию на части, уточняет правило о связях: связь может пересекать границу части. Самая вероятная ошибка: расширение говорит, что в проекте, который его использует, какая-то проверка guidelines не выполняется."];
n.proposals = [
  {
    where: "заголовок, текст, обоснование и пример",
    en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
    why: [
      "Смысл. Было: расширение может изменить правило SpecSheriff guidelines связью `overrides`. Стало: расширение только добавляет правила и уточняет правила guidelines и согласуется с каждым из них. Так вы решили 16 ноября: изменение правила небезопасно, а добавлений и уточнений хватает всем расширениям и вашему первому боевому проекту.",
      "Узел построен так же, как 2.3, который держит в тех же границах собственные guidelines проекта. Прежнее предложение с ограничением «одно правило меняет не больше одного расширения» отозвано: без изменений ограничивать нечего.",
      "Следствия, которые покажу отдельно: из 6.1 уходит тип связи `overrides`, а из таблицы проверок — его проверка; 10.12 и 13.1 решим у раздела 13, ослабления «Адоптации» — у раздела 14.",
    ].join(" "),
  },
];
d["1.7.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.7.2~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
