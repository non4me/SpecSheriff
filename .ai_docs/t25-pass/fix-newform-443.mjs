// Node 1.5.2: the wording checker's findings on fix-newform-442.mjs. A symbol is defined before the list that uses it;
// the list is introduced as "the following ways"; the reason names what the file of bindings keeps out of the project's
// folders, and gives the why of the last sentence in fewer words.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-443.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const CHECKS = "s-jau82aq9juv9zzh";
const t = d["1.5.2~"];
const p = t.text.split("\n\n");
const rp = t.ruText.split("\n\n");
p[1] = [
  "A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:",
  `- by a SpecTag directly before each symbol, where the checks (§${CHECKS}) can tell the file's symbols apart;`,
  "- by SpecTags in the file's first comment, where the checks cannot tell them apart;",
  "- by an entry in the file of bindings at the root of the repository, where the file's format allows no comment.",
].join("\n");
rp[1] = [
  "Символ — это именованная единица кода, например функция, класс или его член, тип, константа или компонент. Тот, кто пишет код, привязывает его к правилам одним из следующих способов:",
  `- SpecTag непосредственно перед каждым символом, если проверки (§${CHECKS}) могут различить символы файла;`,
  "- SpecTag в первом комментарии файла, если проверки не могут их различить;",
  "- записью в файле привязок в корне репозитория, если формат файла не допускает комментариев.",
].join("\n");
p[2] = "A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags in a file's first comment, and an entry in the file of bindings, bind the whole file.";
rp[2] = "SpecTag перед символом привязывает этот символ и все вложенные в него символы. SpecTag в первом комментарии файла и запись в файле привязок привязывают весь файл.";
t.text = p.join("\n\n");
t.ruText = rp.join("\n\n");
const r = t.reason.split("\n\n");
const rr = t.ruReason.split("\n\n");
r[3] = "A SpecTag before a symbol is the most precise binding: it shows which part of a file implements which rule.";
rr[3] = "SpecTag перед символом — самая точная привязка: он показывает, какая часть файла реализует какое правило.";
r[4] = "One file of bindings keeps files that hold nothing but bindings out of the project's own folders. An entry that names no file binds nothing.";
rr[4] = "Один файл привязок избавляет папки проекта от файлов, в которых нет ничего, кроме привязок. Запись, которая не называет существующего файла, ничего не привязывает.";
t.reason = r.join("\n\n");
t.ruReason = rr.join("\n\n");
const prop = d["1.5.2"].proposals[0];
prop.en = [`Title: ${t.title}`, `Text: ${t.text}`, ...t.examples.map((e) => `Example: ${e}`), `Reason: ${t.reason}`].join("\n\n");
prop.ru = [`Заголовок: ${t.ruTitle}`, `Текст: ${t.ruText}`, ...t.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${t.ruReason}`].join("\n\n");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
