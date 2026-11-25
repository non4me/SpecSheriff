// Node 9.5 (the current 5.2, s-kkbqcb9xrpaepwn), rewritten after the owner's answer of 2026-11-17 («Коммит проходит, а
// проверка выводит предупреждение - без списка. Просто что есть код за пределами коммита который не соответствует. И что
// подробности можно получить используя специальную комманду. Какой это код в виде списка файлов и символов должна
// показывать отдельная комманда/процедура»): a commit passes even where the repository holds code or tests without a
// SpecTag that the commit leaves unchanged, whatever the specification's approval status; the checks give one warning,
// with no list, that names the command listing that code by file and symbol. Code that a commit changes is refused
// without a SpecTag, as rows 10.1.26 and 10.1.26a say.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-413.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const TAG = "s-8xw4mgvpexyvw5q";
const n = d["9.5"];
n.text = `A commit passes the checks even where the repository holds a symbol of the system's code outside its tests, or a test, that carries no SpecTag (§${TAG}) and that the commit leaves unchanged. For all such code the checks give a single warning. The warning says that code outside the commit carries no SpecTag, and names the command of the SpecSheriff tools that lists that code by file and symbol.`;
n.ruText = `Коммит проходит проверки, даже если в репозитории есть символ кода системы вне тестов или тест без SpecTag (§${TAG}), который этот коммит не меняет. Обо всём таком коде проверки выдают одно предупреждение. Оно говорит, что за пределами коммита есть код без SpecTag, и называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.`;
n.examples = ["A commit changes one file, whose symbols all carry SpecTags, while two old files elsewhere carry none. The commit passes, and the checks warn once that code outside the commit carries no SpecTag, naming the command that lists that code. But not: the commit is refused because of the two old files, or the warning lists their symbols."];
n.ruExamples = ["Коммит меняет один файл, у всех символов которого есть SpecTag, а в двух старых файлах в другом месте SpecTag нет. Коммит проходит, и проверки один раз предупреждают, что за пределами коммита есть код без SpecTag, и называют команду, которая выводит этот код. Но не так: коммит отклоняется из-за двух старых файлов, или предупреждение перечисляет их символы."];
n.reason = "Code and tests written before their rules may carry no SpecTag and still work correctly. Refusing every commit while such code exists would stop all work until all of it had its rules.\n\nA commit that changes code is held to the method in full, so the relief covers only what the commit leaves unchanged. The warning keeps that code in view at every commit and is short, so that it does not bury the commit's own findings; the command gives the details when they are needed.";
n.ruReason = "Код и тесты, написанные раньше своих правил, могут не иметь SpecTag и при этом работать правильно. Если отклонять каждый коммит, пока такой код есть, вся работа остановится, пока у всего этого кода не появятся правила.\n\nКоммит, который меняет код, целиком подчиняется методу, поэтому послабление касается только того, чего коммит не меняет. Предупреждение напоминает о таком коде при каждом коммите и коротко, чтобы не заслонять собственные находки коммита; подробности, когда они нужны, даёт команда.";
n.changes = [
  "Узел — нынешний 5.2, с его sid. Он должен был уйти в расширение «Адоптация существующего проекта»; по вашему решению от 17 ноября он остаётся в базе, в разделе 9, рядом с узлами о SpecTag.",
  "Заголовок: убрано «while the specification is a draft» («пока спецификация — черновик»).",
  "Текст: убрано условие «спецификация проекта — черновик»; правило действует при любом статусе одобрения спецификации. Вместо сообщения о каждом символе — одно предупреждение без списка: что за пределами коммита есть код без SpecTag, и какая команда выводит его списком файлов и символов (ваше решение от 17 ноября). Код, который коммит меняет, без SpecTag по-прежнему отклоняется (10.1.26, 10.1.26a).",
  "Пример новый: обычный случай и ближайшая ошибка.",
  "Обоснование переписано: убраны рассуждения о переходе проекта на метод и о черновике; добавлено, почему предупреждение одно и короткое, а список выводит команда.",
];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
