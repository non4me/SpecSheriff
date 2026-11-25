// Node 1.7.2, agreed: a proposal that adds the limit first drafted as 1.7.5, since that limit narrows the permission of
// 1.7.2, and under the owner's rule an exception is written into the rule it narrows, never made into a separate rule.
// The limit follows the owner's ruling of 2026-11-16 that any combination of extensions works. Since the node changes
// anyway, the proposal also fixes what the wording checker found in its agreed wording, keeping its meaning: the title
// says what the node is about; the `overrides` link cites the node on links; the last sentence says what holds; "the
// link" in the reason names its type. The draft 1.7.5, never agreed, is deleted, with its row on the page. The temporary
// key "1.7.2~" holds the proposal for the wording checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const backup = new URL("newform.before-403.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(fs.existsSync(backup) ? backup : file, "utf8"));
if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
const n = d["1.7.2"];
const EXT = "s-mbmnsnxenmavu3z", LINKS = "s-sn6au3vcr9uy5pm";
const title = "Changes to a rule of the guidelines by an extension";
const ruTitle = "Изменение правила guidelines расширением";
const text = [
  `An extension of the guidelines (§${EXT}) may change a rule of the SpecSheriff guidelines. Each rule of the SpecSheriff guidelines is changed by at most one extension of the guidelines.`,
  `The extension's node that states the change contains a link (§${LINKS}) of type \`overrides\` to that rule. The text of that node cites the rule it changes. The SpecSheriff tools show that link among the rule's incoming links.`,
  "The change applies only in a project using that extension. Only a node of an extension of the guidelines contains a link of type `overrides`.",
].join("\n\n");
const ruText = [
  `Расширение guidelines (§${EXT}) может изменить правило SpecSheriff guidelines. Каждое правило SpecSheriff guidelines изменяется не более чем одним расширением guidelines.`,
  `Узел расширения, задающий изменение, содержит связь (§${LINKS}) типа \`overrides\` к этому правилу. Текст этого узла ссылается на правило, которое он изменяет. Инструменты SpecSheriff показывают эту связь среди входящих связей правила.`,
  "Изменение действует только в проекте, который использует это расширение. Связь типа `overrides` содержит только узел расширения guidelines.",
].join("\n\n");
const reason = `${n.reason.replace("The link lets whoever reads", "The `overrides` link lets whoever reads")} Two extensions that changed the same rule would make it apply in two different ways in a project that used both.`;
const ruReason = `${n.ruReason.replace("Связь позволяет тому, кто читает", "Связь `overrides` позволяет тому, кто читает")} Если бы два расширения меняли одно и то же правило, в проекте, который использует оба, оно действовало бы двумя разными способами.`;
if (reason.includes("The link lets") || ruReason.includes("Связь позволяет")) throw new Error("reason not reworded");
const examples = ["Two nodes of one extension change the same rule: the rule is still changed by one extension. The most likely mistake in that case: a second extension also changes that rule, even in the same way."];
const ruExamples = ["Два узла одного расширения меняют одно и то же правило: правило по-прежнему изменяется одним расширением. Самая вероятная ошибка: это правило изменяется и вторым расширением, пусть даже так же."];
n.proposals = [
  {
    where: "заголовок, текст, обоснование и пример",
    en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
    why: [
      "Смысл. Добавлено ограничение: каждое правило SpecSheriff guidelines меняет не больше одного расширения. Его нашёл рецензент 1.7.4: два расширения, которые меняют одно правило, противоречили бы друг другу, а вы решили 16 ноября, что любая комбинация расширений работает. Сначала оно было отдельным узлом 1.7.5, но оно сужает разрешение этого узла, а по вашему правилу исключение пишется в само правило. Поэтому 1.7.5 убран.",
      "Форма, без изменения смысла. Заголовок называет предмет узла, а не излагает правило (7.3.1). Расширение и связь ссылаются на свои узлы (7.2.7). Фраза «Собственные guidelines проекта такой связи не содержат» стала утвердительной: связь `overrides` содержит только узел расширения guidelines. В обосновании «связь» названа по типу, потому что в его абзаце она не названа (указательные слова). Текст разбит на три абзаца по смыслу.",
      "Обоснование дополнено фразой о том, зачем ограничение. Пример показывает, что считаются расширения, а не узлы.",
      "Одноимённые типы связей не ограничиваются: все расширения пишутся в одной спецификации, где 7.2.4 уже запрещает одно имя с двумя значениями.",
    ].join(" "),
  },
];
d["1.7.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.7.2~"].proposals;
delete d["1.7.5"];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const page = new URL("base-structure.html", import.meta.url);
let h = fs.readFileSync(page, "utf8");
const at = h.indexOf('      ["1.7.5",');
if (at >= 0) {
  const end = h.indexOf("\n", at);
  h = h.slice(0, at - 1).replace(/,$/, "") + h.slice(end);
  fs.writeFileSync(page, h);
}
console.log("ok");
