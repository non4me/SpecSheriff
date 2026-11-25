// 9.5 "The nodes a commit's message names": the commit is no longer the actor that changes code or adds and
// changes an implementation (the owner's ruling: a commit is never the actor that adds or changes anything);
// the reason speaks of the rule as a whole, since its three sentences grounded the text's three paragraphs one
// by one (agreed 7.14 and the pairing test, the owner's ruling of 2026-11-11).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ef93u6cnbs2sevr" || b.agreed) throw new Error("unexpected 9.5");

b.text = "The message of a commit holding a change to code names, by its sid, each approved node whose implementation is added or changed in that commit. This covers:\n- a node whose text has just changed;\n- an existing node the code contradicted.\n\nOutside the tests, every SpecTag on a symbol added or changed in the commit is one of these:\n- a SpecTag naming a node the commit's message names;\n- the SpecTag that names no node (§s-kgbzk2ph9e6jfb4).\n\nThe message names no section.";
b.ruText = "Сообщение коммита, содержащего изменение кода, называет по sid каждый одобренный узел, реализация которого добавлена или изменена в этом коммите. Сюда входят:\n- узел, текст которого только что изменился;\n- существующий узел, которому код противоречил.\n\nВне тестов каждый SpecTag на символе, добавленном или изменённом в коммите, — одно из следующего:\n- SpecTag, называющий узел, который называет сообщение коммита;\n- SpecTag, не называющий никакого узла (§s-kgbzk2ph9e6jfb4).\n\nСообщение не называет ни одного раздела.";
b.reason = "The message records which approved nodes a change to the code carries out, for the reader of the history and for the reviewer of the commit (§s-nyh9yk22ba6g77q). Held to the SpecTags on the changed code, it can leave none of them out.";
b.ruReason = "Сообщение фиксирует, какие одобренные узлы выполняет изменение кода, — для читающего историю и для рецензента коммита (§s-nyh9yk22ba6g77q). Сверенное со SpecTag на изменённом коде, оно не может пропустить ни одного из них.";
b.changes.push(
  "По вашему решению коммит больше не действующее лицо. Было «The message of every commit that changes code names … each approved node whose implementation the commit adds or changes» и «every SpecTag on a symbol the commit adds or changes». Стало «The message of a commit holding a change to code names … each approved node whose implementation is added or changed in that commit» и «every SpecTag on a symbol added or changed in the commit».",
  "Обоснование говорит о правиле в целом. Прежнее разбирало три абзаца текста по одному, что запрещает согласованный 7.14. Фраза о разделах из него ушла.",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
