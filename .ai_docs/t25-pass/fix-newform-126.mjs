// The reviewer of 2026-11-10 on the split of 8.3. 8.3 opens with the thought the owner gave it, which its sentence only presupposed.
// 8.4: a permitted value of `kind`; `TextRule.list.property`, which validate.ts requires of a list of objects; the last paragraph made true against the rule on implementation.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const a = d["8.3"], b = d["8.4"];
if (a.sidValue !== "s-vsh384ybt4w25a2" || b.sidValue !== "s-hhnahzmhahf8jht") throw new Error("unexpected drafts");

const swap = (node, field, from, to) => {
  if (node[field].split(from).length !== 2) throw new Error(`${field}: "${from}" is not there exactly once`);
  node[field] = node[field].replace(from, to);
};
a.text = "A project can create nodes of any kind it needs. " + a.text;
a.ruText = "Проект может создавать узлы любого нужного ему типа. " + a.ruText;
a.changes = [...a.changes, "Добавлено первое предложение, ваша мысль: проект может создавать узлы любого нужного ему типа. Рецензент отметил, что прежнее предложение её только подразумевало, и обоснованию было не к чему относиться."];

swap(b, "text", "becomes a value of a node's `kind`.", "becomes a permitted value of a node's `kind`.");
swap(b, "ruText", "становится значением `kind` узла.", "становится допустимым значением `kind` узла.");
swap(b, "text", "with its `needsCode`. That rule's `TextRule.list.declaredIn`", "with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name. That rule's `TextRule.list.declaredIn`");
swap(b, "ruText", "с его `needsCode`. `TextRule.list.declaredIn`", "с его `needsCode`. `TextRule.list.property` этого правила называет ключ с именем типа узла. `TextRule.list.declaredIn`");
swap(b, "text", "A node of a kind whose `needsCode` is true requires code and a test, each carrying that node's SpecTag.", "An approved node of a kind whose `needsCode` is true requires code and a test, each carrying its SpecTag, unless it is exempted (§s-6fw72j65jkqrfpf). An implementing rule's SpecTag counts for it.");
swap(b, "ruText", "Узлу типа, у которого `needsCode` равен true, нужны код и тест, каждый с SpecTag этого узла.", "Одобренному узлу типа, у которого `needsCode` равен true, нужны код и тест, каждый с его SpecTag, если узел не выведен из-под этого требования (§s-6fw72j65jkqrfpf). SpecTag реализующего его правила засчитывается ему.");
b.changes = [...b.changes, "Рецензент сверил текст с инструментами. Последний абзац уточнён по правилу о реализации: только одобренные узлы, кроме выведенных из-под требования, и SpecTag реализующего правила засчитывается. Добавлен `TextRule.list.property`: без него проверка отклоняет список, члены которого объекты."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(a.text, "\n\n" + b.text);
