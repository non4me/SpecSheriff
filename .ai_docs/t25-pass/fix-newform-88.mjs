// The reviewer's report on the node now 7.3: the agreed 4.4 speaks of the description of a shortcoming, no longer of a rule of the
// debt or of a problem; the reason gives its ground without the word "gradeable"; in Russian the verb no longer reads as "link".
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.3"];
if (n.sidValue !== "s-3dgt5c94jr55j3z") throw new Error("7.3 is another node");
n.text = "A rule names the subject it binds and states what that subject must do. So not “credentials are kept encrypted”, which binds nobody, but “the store of secrets keeps every credential encrypted”.\n\nThe description of a shortcoming in the technical debt names its subject the same way and states what that subject does while the shortcoming stands (§s-2r7k2aeyusgy6fw).";
n.ruText = "Правило называет субъект, который оно обязывает, и говорит, что этот субъект должен делать. Поэтому не «учётные данные хранятся зашифрованными», что никого ни к чему не обязывает, а «хранилище секретов хранит все учётные данные зашифрованными».\n\nОписание недостатка в техническом долге называет свой субъект так же и говорит, что этот субъект делает, пока недостаток существует (§s-2r7k2aeyusgy6fw).";
n.reason = "A requirement with nobody to hold it is one nobody can be found to have broken.\n\nA description of a shortcoming states on purpose what is, not what must be (§s-2r7k2aeyusgy6fw).";
n.ruReason = "Требование, которое некому соблюдать, никому нельзя вменить в нарушение.\n\nОписание недостатка намеренно говорит о том, что есть, а не о том, что должно быть (§s-2r7k2aeyusgy6fw).";
n.changes = [
  "Заголовок и первый абзац текста — нынешнего 6.2, дословно. Абзац о свойствах ушёл в 7.4.",
  "Второй абзац говорит об описании недостатка вместо «правила технического долга», как теперь говорит согласованный узел 4.4.",
  "Обоснование сокращено до основания правила, слово «gradeable» убрано.",
  "Сохраняет sid 6.2: из спецификации на узел ничто не ссылается.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("7.3 done");
