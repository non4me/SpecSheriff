// Node 1.5.2, finding 3, under the owner's ruling of 2026-11-17: a SpecTag stands before a symbol where the symbol can be
// told apart; otherwise in a comment at the start of the file, in the file's own comment syntax; a file whose format
// allows no comment carries none, and only the rule it was written from links to it. The wording names no language.
// Written as a proposal on the agreed node, and as the temporary key "1.5.2~" for the wording checker.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-437.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const LISTS = "s-rwqzepmrt77rv35";
const n = d["1.5.2"];
const title = "The SpecTags of the system's code";
const ruTitle = "SpecTag в коде системы";
const text = [
  "Every symbol of the system's code outside its tests carries a SpecTag that names the rule the symbol implements. A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. A symbol that implements no rule carries the SpecTag that says so. A nested symbol is covered by the SpecTag of the symbol that encloses it.",
  "A file whose symbols the checks cannot tell apart carries its SpecTags in a comment at the start of the file, written in the comment syntax of the file's format. The whole file then counts as one symbol.",
  `A file whose format allows no comment carries no SpecTag. Each rule that such a file implements names the file in its list of code (§${LISTS}), so the link runs only from the rule to the file.`,
].join("\n\n");
const ruText = [
  "У каждого символа кода системы вне его тестов есть SpecTag, который называет правило, реализуемое символом. Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. Если символ не реализует никакого правила, на нём стоит SpecTag, который говорит об этом. Вложенный символ покрыт SpecTag того символа, внутри которого он стоит.",
  "Если проверки не могут различить символы файла, файл несёт свои SpecTag в комментарии в начале файла, записанном так, как комментарии записываются в формате этого файла. Тогда весь файл считается одним символом.",
  `Файл, формат которого не допускает комментариев, SpecTag не несёт. Каждое правило, которое реализует такой файл, называет его в своём списке кода (§${LISTS}), так что связь идёт только от правила к файлу.`,
].join("\n\n");
const reason = [
  n.reason,
  "A SpecTag on a symbol shows which part of a file implements which rule. Where the checks cannot tell a file's symbols apart, a SpecTag at the start of the file still binds every line of it to a rule, so no file of the system's code escapes the checks.",
  "A file that holds no comment can be bound to a rule only from the rule's side. The checks cannot see that link from the file, but it is the only link such a file can have.",
].join("\n\n");
const ruReason = [
  n.ruReason,
  "SpecTag на символе показывает, какая часть файла реализует какое правило. Если проверки не различают символы файла, SpecTag в начале файла всё равно связывает с правилом каждую его строку, так что ни один файл кода системы не выпадает из проверок.",
  "Файл без комментариев можно связать с правилом только со стороны правила. Из файла проверки эту связь не видят, но другой связи у такого файла быть не может.",
].join("\n\n");
const examples = [
  "A file of styles carries `/* @spec s-… */` on its first line, where the checks cannot tell its symbols apart.",
  "A JSON file that holds the texts a user interface shows allows no comment, so it carries no SpecTag. The rule on those texts lists the file among its code.",
];
const ruExamples = [
  "Файл стилей несёт `/* @spec s-… */` в первой строке, если проверки не различают его символы.",
  "Файл JSON с текстами, которые показывает пользовательский интерфейс, не допускает комментариев, поэтому SpecTag не несёт. Правило об этих текстах называет этот файл в списке своего кода.",
];
d["1.5.2~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.5.2~"].proposals;
n.proposals = [{
  where: "заголовок, текст, обоснование и примеры",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3, по вашему решению 17 ноября: SpecTag ставится перед символом, если символ можно определить; иначе — комментарием в начале файла, в формате этого файла; файл без комментариев связан только со стороны правила. Список видов символов стал примерами, языки не названы.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
