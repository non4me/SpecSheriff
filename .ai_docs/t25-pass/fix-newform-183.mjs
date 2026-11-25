// The fresh reviewer of 9.5 (2026-11-11): the text split in two and said from the SpecTag's side,
// since "carries a SpecTag" retold 1.5.2; the reason rewritten, since it retold 1.2.7 and 1.5.2's
// reason and did not say why the SpecTag states anything. Doubt D2 ("gives its reason") is not
// entered: it waits on the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ezq67wu75updp98" || b.agreed) throw new Error("unexpected draft");

b.text = "The SpecTag on a symbol of technical code (§s-2jcmb9xe9d64t2t) names no node. It gives its reason.";
b.ruText = "SpecTag на символе технического кода (§s-2jcmb9xe9d64t2t) не называет никакого узла. Он даёт свою причину.";
b.reason = "A SpecTag naming a node would bind technical code to a rule it does not implement. What the SpecTag states instead lets whoever reviews the code check that the symbol implements none of the system's logic.";
b.ruReason = "SpecTag, называющий узел, связал бы технический код с правилом, которого тот не реализует. То, что SpecTag говорит вместо этого, позволяет проверяющему код убедиться, что символ не реализует логику системы.";
b.changes = [
  "Узел новый: он выделен из нынешнего 3.5 (s-kgbzk2ph9e6jfb4), и в нём осталась только форма SpecTag технического кода. Определение технического кода с примерами есть в согласованном 1.2.7, а требование такого SpecTag есть в согласованном 1.5.2.",
  "Заголовок — вторая половина нынешнего заголовка 3.5.",
  "Текст. В нынешнем 3.5 было: «Such a symbol carries instead a SpecTag that names no node and gives its reason.» Теперь две фразы, сказанные со стороны SpecTag: «The SpecTag on a symbol of technical code (§…) names no node. It gives its reason.» Слова «carries» и «instead» ушли: они пересказывали 1.5.2.",
  "Обоснование новое. Прежнее, абзац 2 обоснования 3.5, пересказывало 1.2.7 и обоснование 1.5.2. Оно не говорило, зачем SpecTag что-то сообщает, и называло только людей, хотя метод пишется прежде всего для агентов.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(JSON.stringify(b, null, 2));
