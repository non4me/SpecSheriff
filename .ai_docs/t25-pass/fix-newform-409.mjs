// Node 1.2.6, agreed: a proposal under node 2.4 and finding 6 of strictness-audit.md, in the form the owner chose on
// 2026-11-17 («Думаю, можно ослабить, но для технического приложения»): a node of the technical appendix, and only such
// a node, may name an artifact outside the specification as the place where part of that node's content is kept, such as an interface
// contract another team owns; the node names the artifact's version, the code is checked against that version, and a
// new version is a change to the node, which its owners approve. The base specification still holds everything the
// system does. The temporary key "1.2.6~" holds the proposal for the wording checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-409.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.2.6"];
const APP = "s-vj7ercem526zd6v";
const addEn = `A node of the technical appendix (§${APP}) may name an artifact outside the specification as the holder of part of its content, such as an interface contract that another team owns. That node names the artifact's version, and the code is checked against that version. A new version of the artifact is a change to the node.`;
const addRu = `Узел технического приложения (§${APP}) может назвать артефакт вне спецификации, который держит часть его содержания, например контракт интерфейса, которым владеет другая команда. Этот узел называет версию артефакта, и код сверяется с этой версией. Новая версия артефакта — это изменение узла.`;
const text = [n.text, addEn].join("\n\n");
const ruText = [n.ruText, addRu].join("\n\n");
const reasonAdd = "An artifact that another team or another tool keeps could be copied into the specification only as a second copy, which would drift from it. Named with its version by a node of the technical appendix, it stays the one source and is checked against the code, and a new version waits for the node's owners, while the base specification still holds everything the system does.";
const ruReasonAdd = "Артефакт, который ведёт другая команда или другой инструмент, можно было бы перенести в спецификацию только второй копией, которая разойдётся с ним. Названный с версией в узле технического приложения, он остаётся одним источником и сверяется с кодом, а новая версия ждёт ответственных за узел, и при этом базовая спецификация по-прежнему держит всё, что делает система.";
const reason = [n.reason, reasonAdd].join("\n\n");
const ruReason = [n.ruReason, ruReasonAdd].join("\n\n");
const examples = ["A service implements a payment interface whose OpenAPI description another team owns. A node of the service's technical appendix names that description and its version 3.2, and the code is checked against version 3.2. The most likely mistake is a rule of the base specification that names the description as its content, since the base specification would then depend on a document that changes outside it. A project's own guidelines may refine this rule by naming the kinds of outside artifact that its technical appendix may name."];
const ruExamples = ["Сервис реализует платёжный интерфейс, OpenAPI-описанием которого владеет другая команда. Узел технического приложения сервиса называет это описание и его версию 3.2, и код сверяется с версией 3.2. Самая вероятная ошибка — правило базовой спецификации, которое называет это описание своим содержанием: тогда базовая спецификация зависела бы от документа, который меняется вне её. Собственные guidelines проекта могут уточнить это правило, назвав виды внешних артефактов, которые может называть их техническое приложение."];
n.proposals = [
  {
    where: "текст, обоснование и пример",
    en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
    ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
    why: "Добавлен абзац, по вашему решению от 17 ноября: узел технического приложения, и только он, может назвать артефакт вне спецификации, который держит часть его содержания, например контракт интерфейса другой команды. Узел называет версию артефакта, код сверяется с ней, а новая версия — это изменение узла, которое снова одобряют ответственные. Базовая спецификация остаётся самодостаточной. Обоснование дополнено абзацем о том, почему так; пример новый: обычный случай, самая вероятная ошибка и уточнение, которое может добавить проект (7.6.3). Остальное не меняется.",
  },
];
d["1.2.6~"] = { ...n, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.2.6~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
