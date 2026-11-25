// The owner of 2026-11-10 on 9.4: "a reference rewritten into another form" read unclear; a test does not change where only its name changes and its SpecTag
// still names the same node. The reason's last sentence follows. Owed to the tools step: the check forgives today only a rewritten reference, not a new name.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.4"];
if (b.sidValue !== "s-8ykvuqhvtjh66hj" || b.agreed) throw new Error("unexpected draft");

const swap = (field, from, to) => {
  if (b[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};
swap("text", "Rewriting a test's reference to its node into another form that names the same node changes no test.", "A test does not change where only its name changes and its SpecTag still names the same node.");
swap("ruText", "Переписать ссылку теста на его узел в другую форму, называющую тот же узел, — не значит изменить тест.", "Тест не меняется, если меняется только его название, а его SpecTag по-прежнему называет тот же узел.");
swap("reason", "A reference rewritten into another form names the same node, so it holds the test to nothing new.", "A test whose name alone changes still names the same node, so it is held to nothing new.");
swap("ruReason", "Ссылка, переписанная в другую форму, называет тот же узел, поэтому не предъявляет к тесту ничего нового.", "Тест, у которого изменилось только название, называет тот же узел, поэтому к нему не предъявляется ничего нового.");
b.changes = [...b.changes, "По вашим словам: тест не меняется, если меняется только его название, а SpecTag по-прежнему называет тот же узел. Обоснование вслед за этим."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text);
console.log(b.ruText);
console.log(b.ruReason);
