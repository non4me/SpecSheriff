// Node 7.2.7, after the wording checker: the text opens with the requirement in a sentence of its own, then says what
// a word that the specification defines is, then states the exception for the terms that node 7.1 lets a node use
// as they stand. The reason names the word it speaks of instead of referring back to another paragraph.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-364.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.7"];
const goal = d["7.1"].sidValue;
n.text = [
  "A node explains each word or phrase that the specification defines, or cites the node that defines it, where the node first uses that word or phrase. This applies to the node's text, reason, list members and table cells.",
  "A word or phrase that the specification defines is either:\n- a name that means something only within the specification, such as RecordType;\n- a common word to which the specification gives a narrower meaning than its common sense.",
  `This rule excepts the terms whose definitions every reader is given (§${goal}).`,
].join("\n\n");
n.ruText = [
  "Узел объясняет каждое слово или выражение, смысл которого задаёт спецификация, или ссылается на узел, который его определяет, — там, где узел впервые употребляет это слово или выражение. Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла.",
  "Слово или выражение, смысл которого задаёт спецификация, — это:\n- имя, которое что-то значит только внутри спецификации, например RecordType;\n- обычное слово, которому спецификация придаёт более узкий смысл, чем обычный.",
  `Из этого правила исключены термины, определения которых даны каждому читателю (§${goal}).`,
].join("\n\n");
n.reason = "A reader who meets a word that the specification defines, and finds no explanation at that point, reads the rest of the node by a guess at its meaning. For a common word, that guess is its common sense.";
n.ruReason = "Читатель, который встречает слово, смысл которого задаёт спецификация, и не находит в этом месте объяснения, читает остальной узел, исходя из догадки о его смысле. Для обычного слова эта догадка — его обычный смысл.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
