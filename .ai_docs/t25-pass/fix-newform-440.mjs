// Node 1.5.2, after specsheriff-rule-reviewer and the owner's ruling of 2026-11-17 («храним»): a file whose format allows
// no comment has its SpecTags kept outside it, in a place that the appendix of the tools names, so the link stays two-way.
// The reviewer's findings applied: the three places form the list, and a sentence after it says which files count as one
// symbol; the SpecTags go into the file's first comment; the reason's last two paragraphs become the owner's argument;
// the agreed sentences cite 9.1 and 1.2.7, and "monitor coverage" says what is monitored; the examples name no format.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-440.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const SYSCODE = "s-hheus6f395ynqvc";
const SPECTAG = "s-8xw4mgvpexyvw5q";
const CHECKS = "s-jau82aq9juv9zzh";
const APPENDIX = "s-a4rbry4hsu34hy8";
const TECH = "s-2jcmb9xe9d64t2t";
const n = d["1.5.2"];
const title = "The SpecTags of the system's code";
const ruTitle = "SpecTag в коде системы";
const text = [
  `Every symbol of the system's code (§${SYSCODE}) outside its tests has a SpecTag (§${SPECTAG}) that names the rule the symbol implements. A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. A symbol that implements no rule has the SpecTag that says so. A nested symbol is covered by the SpecTag of the symbol that encloses it.`,
  [
    "Where a file's SpecTags are placed depends on the file:",
    `- where the checks (§${CHECKS}) can tell the file's symbols apart, each SpecTag is placed directly before its symbol;`,
    "- where they cannot, the file's SpecTags are placed in its first comment;",
    `- where the file's format allows no comment, the file's SpecTags are kept outside the file, in the place that the appendix of the tools (§${APPENDIX}) names.`,
  ].join("\n"),
  "A file whose SpecTags are placed in its first comment or kept outside it counts as one symbol.",
].join("\n\n");
const ruText = [
  `У каждого символа кода системы (§${SYSCODE}) вне его тестов есть SpecTag (§${SPECTAG}), который называет правило, реализуемое символом. Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. Если символ не реализует никакого правила, у него есть SpecTag, который говорит об этом. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит.`,
  [
    "Где стоят SpecTag файла, зависит от файла:",
    `- если проверки (§${CHECKS}) могут различить символы файла, каждый SpecTag стоит непосредственно перед своим символом;`,
    "- если не могут, SpecTag файла стоят в его первом комментарии;",
    `- если формат файла не допускает комментариев, SpecTag файла хранятся вне файла, в месте, которое называет описание инструментов (§${APPENDIX}).`,
  ].join("\n"),
  "Файл, SpecTag которого стоят в его первом комментарии или хранятся вне его, считается одним символом.",
].join("\n\n");
const reason = [
  "A SpecTag binds the code to the rules of the specification it implements.",
  `Technical code (§${TECH}) has a SpecTag too: one that says an exception has been made for it. That keeps technical code in view.`,
  "The SpecTags make it possible to monitor which rules the code implements and to find gaps immediately: code that has lost its link to the specification.",
  "Whoever writes code writes it from the rules, so any file of the system's code, in any format, can be bound to the rules it implements.",
].join("\n\n");
const ruReason = [
  "SpecTag обеспечивает связь кода с правилами спецификации, которые он реализует.",
  `У технического кода (§${TECH}) тоже есть SpecTag — с пометкой, что для этого кода сделано исключение. Так технический код остаётся на виду.`,
  "SpecTag позволяют контролировать, какие правила реализованы в коде, и сразу находить пропуски — код, потерявший связь со спецификацией.",
  "Код пишут по правилам, поэтому любой файл кода системы, в любом формате, можно связать с правилами, которые он реализует.",
].join("\n\n");
const examples = [
  "A file of styles whose symbols the checks cannot tell apart has its SpecTag in its first comment.",
  "A file that holds the texts a user interface shows is in a format that allows no comment. Its SpecTags are kept outside it, in the place that the appendix of the tools names.",
];
const ruExamples = [
  "У файла стилей, символы которого проверки не различают, SpecTag стоит в первом комментарии.",
  "Файл с текстами, которые показывает пользовательский интерфейс, записан в формате, который не допускает комментариев. Его SpecTag хранятся вне его, в месте, которое называет описание инструментов.",
];
d["1.5.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.5.2~"].proposals;
n.proposals = [{
  where: "заголовок, текст, обоснование и примеры",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3, по вашим решениям 17 ноября: список видов символов стал примерами, языки не названы; SpecTag стоит перед символом, если проверки различают символы; иначе — в первом комментарии файла; если формат не допускает комментариев, SpecTag хранятся вне файла, там, где называет описание инструментов. Замечания рецензента учтены.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
