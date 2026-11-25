// Node 9.5: the wording checker's findings on fix-newform-413.mjs, as the agent judged them. The text now opens with its
// main thought in a short sentence, then says what code outside the commit is; the reason names again what it refers to
// and no longer restates the text. "carries" stays, the agreed word of 1.5.2 and of row 10.1.26.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-414.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const TAG = "s-8xw4mgvpexyvw5q";
const n = d["9.5"];
n.text = [
  `A commit passes the checks even while some code outside the commit carries no SpecTag (§${TAG}). Code outside the commit is a symbol of the system's code outside the tests, or a test, that the commit leaves unchanged.`,
  "For all code outside the commit that carries no SpecTag, the checks give a single warning saying that such code exists. The warning names the command of the SpecSheriff tools that lists that code by file and symbol.",
].join("\n\n");
n.ruText = [
  `Коммит проходит проверки, даже если у части кода за пределами коммита нет SpecTag (§${TAG}). Код за пределами коммита — это символы кода системы вне тестов и тесты, которые коммит не меняет.`,
  "Обо всём коде за пределами коммита, у которого нет SpecTag, проверки выдают одно предупреждение: что такой код есть. Предупреждение называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.",
].join("\n\n");
n.reason = [
  "Code and tests written before their rules may carry no SpecTag and still work correctly. Refusing every commit while such code exists would stop all work until all of it had its rules.",
  "A commit that changes code is held to the method, so only code outside the commit escapes a refusal. A single warning about code outside the commit keeps that code in view at every commit without burying the commit's own findings.",
].join("\n\n");
n.ruReason = [
  "Код и тесты, написанные раньше своих правил, могут не иметь SpecTag и при этом работать правильно. Если отклонять каждый коммит, пока такой код есть, вся работа остановится, пока у всего этого кода не появятся правила.",
  "Коммит, который меняет код, целиком подчиняется методу, поэтому отказа избегает только код за пределами коммита. Одно предупреждение о коде за пределами коммита напоминает о нём при каждом коммите и не заслоняет собственные находки коммита.",
].join("\n\n");
n.changes.push("После проверки формулировок: текст открывается главной мыслью в коротком предложении, затем сказано, что такое код за пределами коммита; обоснование заново называет то, о чём говорит, и не повторяет текст.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
