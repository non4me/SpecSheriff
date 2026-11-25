// Node 2.5 "The archive": the owner accepted all five proposals (2026-11-12, «все»). The changes:
// - the first paragraph says that an archived node has no sid of its own;
// - the chain of replacements becomes the new second paragraph;
// - the last paragraph says that a restored node returns with a new sid;
// - the reason's second paragraph says why the archive keeps no sid;
// - an example shows the chain.
// The node's wording has changed, so its earlier agreement no longer covers it. The owner is asked to agree to the
// node as a whole.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
const [p1, p2, p3, p4, p5] = n.proposals;

const en = n.text.split("\n\n");
const ru = n.ruText.split("\n\n");
if (en.length !== 3 || ru.length !== 3) throw new Error("2.5: the text no longer has three paragraphs");
n.text = [en[0] + " " + p1.en, p2.en, en[1], en[2] + " " + p3.en].join("\n\n");
n.ruText = [ru[0] + " " + p1.ru, p2.ru, ru[1], ru[2] + " " + p3.ru].join("\n\n");

const reason = n.reason.split("\n\n");
const ruReason = n.ruReason.split("\n\n");
if (reason.length !== 2 || ruReason.length !== 2) throw new Error("2.5: the reason no longer has two paragraphs");
n.reason = [reason[0], p4.en].join("\n\n");
n.ruReason = [ruReason[0], p4.ru].join("\n\n");

n.examples = [p5.en];
n.ruExamples = [p5.ru];

n.changes.push(
  "Вы приняли все пять предложений (2026-11-12, «все»): у архивного узла нет собственного sid; новый второй абзац о цепочке замен; " +
    "восстановленный узел возвращается с новым sid; второй абзац обоснования теперь объясняет, зачем узел уходит в архив без sid; добавлен пример цепочки. " +
    "Прежний sid архивного узла нигде не хранится (вы, 2026-11-12). Формулировка изменилась, поэтому узел нужно согласовать заново."
);
delete n.proposals;
n.agreedBefore = n.agreed;
delete n.agreed;

fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text + "\n----\n" + n.reason + "\n----\n" + n.examples[0]);
