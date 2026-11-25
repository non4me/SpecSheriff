// Node 1.1.4, agreed: a proposal under node 2.4, agreed by the owner on 2026-11-16, and finding 2 of
// strictness-audit.md. The rule kept the base free of every technology, so a library, an SDK or the implementation of a
// protocol, for which a technology is part of what the system does, could not state it. Its reason asks only that the
// base not go stale when the stack changes; so the minimum is that the base names no technology the system is built
// with, while a technology that is part of what the system does is named like any other part of a rule. An example
// shows a typical case, the most likely mistake and a refinement a project's own guidelines may add (7.6.3). The
// temporary key "1.1.4~" holds the proposal for the wording checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-407.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.1.4"];
const text = [
  "A rule of the base specification states what the system does. It describes the business logic to be implemented, and leaves out how the system is built. It may also contain any further business information needed to understand the rule precisely, with all its nuances and edge cases.",
  "A technology that the system is built with is named in the base specification only as an example, in brackets, where the rule does not depend on it. A technology that is part of what the system does, such as a protocol it speaks or a format it accepts, is named like any other part of the rule.",
].join("\n\n");
const ruText = [
  "Правило базовой спецификации говорит, что делает система. Оно описывает бизнес-логику, которую требуется реализовать, и не говорит, как система построена. Здесь же может быть любая дополнительная бизнес-информация, необходимая для точного понимания правила со всеми нюансами и крайними случаями.",
  "Технологию, на которой система построена, базовая спецификация называет только как пример, в скобках, там, где правило от неё не зависит. Технологию, которая входит в то, что делает система, например протокол, на котором она общается, или формат, который она принимает, называют так же, как любую другую часть правила.",
].join("\n\n");
const reason = `${n.reason} A technology that is part of what the system does stays the same on every stack, so naming it makes no rule go stale.`;
const ruReason = `${n.ruReason} Технология, которая входит в то, что делает система, одна и та же на любом стеке, поэтому её название не делает правило устаревшим.`;
const examples = ["A service accepts payment orders as XML messages in a format a standard fixes, so its base specification names that format: every implementation of the service must accept it. The database the service keeps its records in is named only in the technical appendix. The most likely mistake is a rule that says the service stores each order in a particular database. A project's own guidelines may refine this rule by listing the technologies that its base specification names."];
const ruExamples = ["Сервис принимает платёжные поручения в виде XML-сообщений в формате, который задаёт стандарт, поэтому его базовая спецификация называет этот формат: любая реализация сервиса должна его принимать. Базу данных, в которой сервис хранит записи, называет только техническое приложение. Самая вероятная ошибка — правило, которое говорит, что сервис хранит каждое поручение в определённой базе данных. Собственные guidelines проекта могут уточнить это правило, перечислив технологии, которые называет его базовая спецификация."];
n.proposals = [
  {
    where: "текст, обоснование и пример",
    en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
    why: [
      "Смысл. Было: база опускает технические подробности, а технологию можно назвать только как пример. Стало: база не называет технологий, на которых система построена, а технологию, которая входит в то, что делает система, называет как любую часть правила. Так требует 2.4: минимум правила — то, что нужно его цели, а цель 1.1.4 — чтобы правило не устаревало при смене стека. У библиотеки, SDK или реализации протокола технология и есть продукт, и прежнее правило не давало её описать.",
      "«Опуская технические подробности» заменено на «не говорит, как система построена»: у библиотеки сигнатуры — техническая подробность, но они входят в то, что она делает.",
      "Обоснование дополнено фразой о том, почему такая технология не делает правило устаревшим. Пример новый: обычный случай, самая вероятная ошибка и уточнение, которое может добавить проект (7.6.3).",
    ].join(" "),
  },
];
d["1.1.4~"] = { ...n, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.1.4~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
