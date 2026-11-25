// Node 1.5.2: the second report of specsheriff-rule-reviewer applied. Bullet 3 names the file it speaks of; an entry in
// the file of bindings holds the SpecTags of the file it names; the formats that allow no comment are JSON and those a
// project's own guidelines name, a closed list, as the owner ruled; a change anywhere in a file bound as a whole is a
// change to the code its SpecTags bind; the reason becomes one sentence, since its paragraphs walked the text and the one
// on technical code repeated the reason of 1.2.7.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-444.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const SYSCODE = "s-hheus6f395ynqvc";
const SPECTAG = "s-8xw4mgvpexyvw5q";
const CHECKS = "s-jau82aq9juv9zzh";
const OWN = "s-u7tw6m8npxmv5tu";
const t = d["1.5.2~"];
t.text = [
  `The system's code (§${SYSCODE}) outside its tests is bound to the rules it implements by SpecTags (§${SPECTAG}). Code that implements no rule has the SpecTag that says so.`,
  [
    "A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:",
    `- by a SpecTag directly before each symbol, where the checks (§${CHECKS}) can tell the file's symbols apart;`,
    "- by SpecTags in the file's first comment, where the checks cannot tell them apart;",
    "- by an entry in the file of bindings at the root of the repository, for a file whose format allows no comment.",
  ].join("\n"),
  "A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags in a file's first comment, and an entry in the file of bindings, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind.",
  `The formats that allow no comment are JSON and those that a project's own guidelines (§${OWN}) name.`,
  "Each entry in the file of bindings names a file that exists and holds that file's SpecTags.",
].join("\n\n");
t.ruText = [
  `Код системы (§${SYSCODE}) вне его тестов привязан к правилам, которые он реализует, с помощью SpecTag (§${SPECTAG}). У кода, который не реализует никакого правила, есть SpecTag, который говорит об этом.`,
  [
    "Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. Тот, кто пишет код, привязывает его к правилам одним из следующих способов:",
    `- SpecTag непосредственно перед каждым символом, если проверки (§${CHECKS}) могут различить символы файла;`,
    "- SpecTag в первом комментарии файла, если проверки не могут их различить;",
    "- записью в файле привязок в корне репозитория — для файла, формат которого не допускает комментариев.",
  ].join("\n"),
  "SpecTag перед символом привязывает этот символ и все вложенные в него символы. SpecTag в первом комментарии файла и запись в файле привязок привязывают весь файл. Изменение в любом месте файла, привязанного целиком, — это изменение кода, который привязывают его SpecTag.",
  `Форматы, не допускающие комментариев, — это JSON и те, которые называют собственные guidelines проекта (§${OWN}).`,
  "Каждая запись в файле привязок называет существующий файл и содержит его SpecTag.",
].join("\n\n");
t.reason = "Binding each file of the system's code as precisely as its format allows lets the checks find at once code that has lost its link to the specification.";
t.ruReason = "Привязка каждого файла кода системы с той точностью, какую допускает его формат, позволяет проверкам сразу находить код, потерявший связь со спецификацией.";
t.examples = [
  "A file of styles whose symbols the checks cannot tell apart has its SpecTag in its first comment.",
  "A JSON file of the texts that a user interface shows has an entry in the file of bindings. The entry names the JSON file and holds its SpecTags.",
];
t.ruExamples = [
  "У файла стилей, символы которого проверки не различают, SpecTag стоит в первом комментарии.",
  "У файла JSON с текстами, которые показывает пользовательский интерфейс, есть запись в файле привязок. Запись называет этот файл JSON и содержит его SpecTag.",
];
const prop = d["1.5.2"].proposals[0];
prop.en = [`Title: ${t.title}`, `Text: ${t.text}`, ...t.examples.map((e) => `Example: ${e}`), `Reason: ${t.reason}`].join("\n\n");
prop.ru = [`Заголовок: ${t.ruTitle}`, `Текст: ${t.ruText}`, ...t.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${t.ruReason}`].join("\n\n");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
