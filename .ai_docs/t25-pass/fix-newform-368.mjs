// Node 7.2.1, "The subject of a rule", after the wording checker. The second paragraph names what "the same way" stood
// for, cannot be read with "in the technical debt" attached to two words, and cites the technical debt where it first
// names it, as node 7.2.7 requires. The second paragraph of the reason grounded the second paragraph of the text, which
// node 7.4.2 forbids, and the text already says what a description of a shortcoming states, so it is removed.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-368.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.1"];
const debt = "s-2r7k2aeyusgy6fw";
n.text = [
  "A rule names the subject it binds and states what that subject must do.",
  `Where the technical debt (§${debt}) describes a shortcoming, the description names its subject as a rule does, and states what that subject does while the shortcoming persists.`,
].join("\n\n");
n.reason = "A requirement that nobody is bound to meet is one nobody can be found to have broken.";
n.ruText = [
  "Правило называет субъект, который оно обязывает, и говорит, что этот субъект должен делать.",
  `Там, где технический долг (§${debt}) описывает недостаток, описание называет свой субъект так же, как правило, и говорит, что этот субъект делает, пока недостаток существует.`,
].join("\n\n");
n.ruReason = "Требование, которое некому соблюдать, никому нельзя вменить в нарушение.";
n.changes = [
  ...(n.changes || []),
  "По замечаниям проверяющего формулировок: «the same way» («так же») отсылало к предыдущему абзацу и теперь сказано прямо — «так же, как правило»; «in the technical debt» можно было отнести к двум словам; ссылка на технический долг стоит при первом его упоминании, как требует 7.2.7. Второй абзац обоснования разбирал второй абзац текста, что запрещает 7.4.2, а сам текст уже говорит, что описание недостатка сообщает, что субъект делает, поэтому этот абзац убран.",
];
delete n.agreed;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
