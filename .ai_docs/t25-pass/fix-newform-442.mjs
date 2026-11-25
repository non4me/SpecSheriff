// Node 1.5.2, under the owner's rulings of 2026-11-17: the rules speak of binding code to rules, and 1.5.2 describes the
// ways of binding: a SpecTag before a symbol, the main way; SpecTags in the first comment of a file; an entry in one file
// of bindings at the root of the repository, for a format that allows no comment. The guidelines name JSON as such a
// format, and a project may name others. Every entry in the file of bindings names a file that exists.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-442.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const SYSCODE = "s-hheus6f395ynqvc";
const SPECTAG = "s-8xw4mgvpexyvw5q";
const CHECKS = "s-jau82aq9juv9zzh";
const OWN = "s-u7tw6m8npxmv5tu";
const TECH = "s-2jcmb9xe9d64t2t";
const n = d["1.5.2"];
const title = "How code is bound to its rules";
const ruTitle = "Как код привязывается к своим правилам";
const text = [
  `The system's code (§${SYSCODE}) outside its tests is bound to the rules it implements by SpecTags (§${SPECTAG}). Code that implements no rule has the SpecTag that says so.`,
  [
    "Whoever writes code binds it to its rules in one of these ways:",
    `- by a SpecTag directly before each symbol, where the checks (§${CHECKS}) can tell the file's symbols apart;`,
    "- by SpecTags in the file's first comment, where the checks cannot tell them apart;",
    "- by an entry in the file of bindings at the root of the repository, where the file's format allows no comment.",
  ].join("\n"),
  "A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags in a file's first comment, and an entry in the file of bindings, bind the whole file.",
  `JSON allows no comment. A project's own guidelines (§${OWN}) may name other such formats.`,
  "Each entry in the file of bindings names a file that exists.",
].join("\n\n");
const ruText = [
  `Код системы (§${SYSCODE}) вне его тестов привязан к правилам, которые он реализует, с помощью SpecTag (§${SPECTAG}). У кода, который не реализует никакого правила, есть SpecTag, который говорит об этом.`,
  [
    "Тот, кто пишет код, привязывает его к правилам одним из способов:",
    `- SpecTag непосредственно перед каждым символом, если проверки (§${CHECKS}) могут различить символы файла;`,
    "- SpecTag в первом комментарии файла, если проверки не могут их различить;",
    "- записью в файле привязок в корне репозитория, если формат файла не допускает комментариев.",
  ].join("\n"),
  "Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. SpecTag перед символом привязывает этот символ и все вложенные в него символы. SpecTag в первом комментарии файла и запись в файле привязок привязывают весь файл.",
  `JSON не допускает комментариев. Собственные guidelines проекта (§${OWN}) могут назвать и другие такие форматы.`,
  "Каждая запись в файле привязок называет существующий файл.",
].join("\n\n");
const reason = [
  "Binding makes it possible to monitor which rules the code implements and to find gaps immediately: code that has lost its link to the specification.",
  `A SpecTag on technical code (§${TECH}), marking the exception made for it, keeps technical code in view.`,
  "Whoever writes code writes it from the rules, so any file of the system's code, in any format, can be bound to the rules it implements.",
  "A SpecTag before a symbol binds the code most precisely: it shows which part of a file implements which rule.",
  "One file of bindings at one place leaves the project's own folders free of service files. An entry for a file that was moved or renamed would bind nothing.",
].join("\n\n");
const ruReason = [
  "Привязка позволяет контролировать, какие правила реализованы в коде, и сразу находить пропуски — код, потерявший связь со спецификацией.",
  `SpecTag на техническом коде (§${TECH}) с пометкой о сделанном для него исключении держит технический код на виду.`,
  "Код пишут по правилам, поэтому любой файл кода системы, в любом формате, можно связать с правилами, которые он реализует.",
  "SpecTag перед символом привязывает код точнее всего: он показывает, какая часть файла реализует какое правило.",
  "Один файл привязок в одном месте не засоряет папки проекта служебными файлами. Запись о файле, который перенесли или переименовали, ничего бы не привязывала.",
].join("\n\n");
const examples = [
  "A file of styles whose symbols the checks cannot tell apart has its SpecTag in its first comment.",
  "A JSON file of the texts that a user interface shows has an entry in the file of bindings. The entry names the file and the rules it implements.",
];
const ruExamples = [
  "У файла стилей, символы которого проверки не различают, SpecTag стоит в первом комментарии.",
  "У файла JSON с текстами, которые показывает пользовательский интерфейс, есть запись в файле привязок. Запись называет этот файл и правила, которые он реализует.",
];
d["1.5.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.5.2~"].proposals;
n.proposals = [{
  where: "заголовок, текст, обоснование и примеры",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3, по вашим решениям 17 ноября: правила говорят о привязке кода к правилам, а 1.5.2 описывает три способа привязки — SpecTag перед символом (основной), SpecTag в первом комментарии файла, запись в общем файле привязок в корне репозитория для форматов без комментариев; JSON назван, проект может назвать другие форматы; каждая запись называет существующий файл.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
