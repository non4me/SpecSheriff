// The reviewer's report on the node now 7.4: the title no longer repeats the sentence, a property has its object, the reason
// gives its ground and leaves out what the mistake costs.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.4"];
if (n.sidValue !== "s-5wuv4sycvg6ase8") throw new Error("7.4 is another node");
n.title = "A rule does not depend on what is missing today";
n.ruTitle = "Правило не зависит от того, чего сегодня нет";
n.text = "A rule states a property of what the specification declares. It never makes that property depend on what happens not to exist yet. So not “a timestamp needs no time zone while every user is in one”, but “a timestamp carries its time zone”.";
n.ruText = "Правило утверждает свойство того, что объявляет спецификация. Оно никогда не ставит это свойство в зависимость от того, чего пока просто нет. Поэтому не «метке времени не нужен часовой пояс, пока все пользователи в одном», а «метка времени несёт свой часовой пояс».";
n.reason = "A property resting on what does not exist yet is true when it is written and silently false afterwards.";
n.ruReason = "Свойство, зависящее от того, чего пока нет, верно, когда его пишут, и незаметно становится ложным потом.";
n.changes = [
  "Новый узел: абзац 2 нынешнего 6.2 выполняется отдельно от требования назвать субъект.",
  "Заголовок новый, прежний повторял первую фразу.",
  "Первая фраза разделена на две, у слова «свойство» появился объект. Пример дословно из нынешнего 6.2.",
  "Обоснование сокращено до основания правила: убрано, чего стоит ошибка.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("7.4 done");
