// Node 9.5, after the owner's refinement of 2026-11-17 («если спецификация имеет статус черновика то эту проверку можно
// так же не запускать и значит и предупреждения не будет. Проверка имеет смысл только если мы перевели спецификацию в
// статус аппрув несмотря на предупреждение о неполном соответствии. Она будет напоминать что остался код который нужно
// довести до ума - перегенерировать из правил или добавить теги»): the warning about code outside the commit without a
// SpecTag is given only while the specification is approved; the reason says what the warning reminds of.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-415.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const TAG = "s-8xw4mgvpexyvw5q";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const n = d["9.5"];
n.text = [
  `A commit passes the checks even while some code outside the commit carries no SpecTag (§${TAG}). Code outside the commit is a symbol of the system's code outside the tests, or a test, that the commit leaves unchanged.`,
  "The checks warn about such code only while the specification is approved. They give a single warning for all code outside the commit that carries no SpecTag, saying that such code exists. The warning names the command of the SpecSheriff tools that lists that code by file and symbol.",
].join("\n\n");
n.ruText = [
  `Коммит проходит проверки, даже если у части кода за пределами коммита нет SpecTag (§${TAG}). Код за пределами коммита — это символы кода системы вне тестов и тесты, которые коммит не меняет.`,
  "О таком коде проверки предупреждают, только пока спецификация одобрена. Предупреждение одно на весь код за пределами коммита без SpecTag: оно говорит, что такой код есть. Предупреждение называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.",
].join("\n\n");
n.examples = ["The specification is approved. A commit changes one file, whose symbols all carry SpecTags, while two old files elsewhere carry none. The commit passes, and the checks warn once that code outside the commit carries no SpecTag, naming the command that lists that code. Were the specification a draft, the same commit would pass with no warning. But not: the commit is refused because of the two old files, or the warning lists their symbols."];
n.ruExamples = ["Спецификация одобрена. Коммит меняет один файл, у всех символов которого есть SpecTag, а в двух старых файлах в другом месте SpecTag нет. Коммит проходит, и проверки один раз предупреждают, что за пределами коммита есть код без SpecTag, и называют команду, которая выводит этот код. Будь спецификация черновиком, тот же коммит прошёл бы без предупреждения. Но не так: коммит отклоняется из-за двух старых файлов, или предупреждение перечисляет их символы."];
n.reason = [
  "Code and tests written before their rules may carry no SpecTag and still work correctly. Refusing every commit while such code exists would stop all work until all of it had its rules.",
  "A commit that changes code is held to the method, so only code outside the commit escapes a refusal.",
  `While the specification is a draft, the work is above all on the specification, and a warning about old code would only distract from it. Once the owners have approved the specification despite the reports shown to them (§${APPROVAL}), a warning at every commit reminds them that code outside the commit is still to be finished: generated again from the rules, or given the SpecTags that bind it to them. The warning is a single short one, so that it does not bury the commit's own findings.`,
].join("\n\n");
n.ruReason = [
  "Код и тесты, написанные раньше своих правил, могут не иметь SpecTag и при этом работать правильно. Если отклонять каждый коммит, пока такой код есть, вся работа остановится, пока у всего этого кода не появятся правила.",
  "Коммит, который меняет код, целиком подчиняется методу, поэтому отказа избегает только код за пределами коммита.",
  `Пока спецификация — черновик, работа идёт прежде всего над ней, и предупреждение о старом коде только отвлекало бы. Когда ответственные одобрили спецификацию, несмотря на показанные им сообщения (§${APPROVAL}), предупреждение при каждом коммите напоминает, что код за пределами коммита ещё нужно довести до ума: заново сгенерировать из правил или добавить SpecTag, которые свяжут его с правилами. Предупреждение одно и короткое, чтобы не заслонять собственные находки коммита.`,
].join("\n\n");
n.changes = n.changes.filter((c) => !c.startsWith("После проверки формулировок") && !c.startsWith("Пример новый") && !c.startsWith("Обоснование переписано"));
n.changes.push(
  "По вашему уточнению от 17 ноября: о коде за пределами коммита проверки предупреждают, только пока спецификация одобрена; пока она черновик, предупреждения нет.",
  "Пример новый: обычный случай в одобренной спецификации, тот же коммит в черновике и ближайшая ошибка.",
  "Обоснование переписано: убраны рассуждения о переходе проекта на метод; сказано, почему код за пределами коммита не отклоняет коммит, почему в черновике нет предупреждения и о чём оно напоминает после одобрения: код нужно заново сгенерировать из правил или добавить ему SpecTag.",
);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
