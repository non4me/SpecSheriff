// Node 1.5.2: the draft of fix-newform-437.mjs after the wording checker. The three places a SpecTag can stand become one
// list, as the owner put them; "the checks" cites the table of checks; the reason's new paragraphs say why instead of
// restating the text; the sentence of the agreed reason that stated a requirement for technical code now gives a reason.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-438.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const LISTS = "s-rwqzepmrt77rv35";
const CHECKS = "s-jau82aq9juv9zzh";
const n = d["1.5.2"];
const title = "The SpecTags of the system's code";
const ruTitle = "SpecTag в коде системы";
const text = [
  "Every symbol of the system's code outside its tests has a SpecTag that names the rule the symbol implements. A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. A symbol that implements no rule has the SpecTag that says so. A nested symbol is covered by the SpecTag of the symbol that encloses it.",
  [
    "Where a file's SpecTags stand depends on the file:",
    `- where the checks (§${CHECKS}) can tell the file's symbols apart, each SpecTag stands directly before its symbol;`,
    "- where they cannot, the file's SpecTags stand in a comment at the start of the file, in the comment syntax of the file's format, and the whole file counts as one symbol;",
    `- where the file's format allows no comment, the file holds no SpecTag, and each rule that the file implements names the file in its list of code (§${LISTS}).`,
  ].join("\n"),
].join("\n\n");
const ruText = [
  "У каждого символа кода системы вне его тестов есть SpecTag, который называет правило, реализуемое символом. Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. Если символ не реализует никакого правила, у него есть SpecTag, который говорит об этом. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит.",
  [
    "Где стоят SpecTag файла, зависит от файла:",
    `- если проверки (§${CHECKS}) могут различить символы файла, каждый SpecTag стоит непосредственно перед своим символом;`,
    "- если не могут, SpecTag файла стоят в комментарии в начале файла, записанном так, как комментарии записываются в формате этого файла, и весь файл считается одним символом;",
    `- если формат файла не допускает комментариев, в файле нет SpecTag, и каждое правило, которое реализует файл, называет его в своём списке кода (§${LISTS}).`,
  ].join("\n"),
].join("\n\n");
const reason = [
  "A SpecTag binds the code to the rules of the specification it implements.",
  "Technical code contains no business logic, yet it too has a SpecTag, one that says an exception has been made for it, so that it stays in view.",
  "The SpecTags make it possible to monitor coverage and to find gaps immediately: code that has lost its link to the specification.",
  "A SpecTag on the whole file is coarser than one on each symbol, but it still leaves no line of the system's code without a rule.",
  "A format that allows no comment leaves no place in the file for a SpecTag. The system may still need such a file, so the rule that the file implements keeps the link instead.",
].join("\n\n");
const ruReason = [
  "SpecTag обеспечивает связь кода с правилами спецификации, которые он реализует.",
  "Технический код не содержит бизнес-логики, но и у него есть SpecTag — с пометкой, что для этого кода сделано исключение, — чтобы он оставался на виду.",
  "SpecTag позволяют контролировать покрытие и сразу находить пропуски — код, потерявший связь со спецификацией.",
  "SpecTag на весь файл грубее, чем SpecTag на каждом символе, но и он не оставляет ни одной строки кода системы без правила.",
  "Формат, который не допускает комментариев, не оставляет в файле места для SpecTag. Системе такой файл всё же может быть нужен, поэтому связь хранит правило, которое файл реализует.",
].join("\n\n");
const examples = [
  "A file of styles whose symbols the checks cannot tell apart has `/* @spec s-… */` on its first line.",
  "A JSON file that holds the texts a user interface shows allows no comment, so it holds no SpecTag. The rule on those texts names the file in its list of code.",
];
const ruExamples = [
  "Файл стилей, символы которого проверки не различают, содержит `/* @spec s-… */` в первой строке.",
  "Файл JSON с текстами, которые показывает пользовательский интерфейс, не допускает комментариев, поэтому SpecTag в нём нет. Правило об этих текстах называет этот файл в своём списке кода.",
];
d["1.5.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.5.2~"].proposals;
n.proposals = [{
  where: "заголовок, текст, обоснование и примеры",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3, по вашему решению 17 ноября: SpecTag ставится перед символом, если символ можно определить; иначе — комментарием в начале файла, в формате этого файла; если формат не допускает комментариев, связь идёт только от правила. Список видов символов стал примерами, языки не названы.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
