// The fresh reviewer of the rewritten 9.5 (2026-11-11): the reason's clause on the reviewer did not hold, since
// the reviewer is given the nodes of the changed symbols' SpecTags whatever the message names; it goes, with its
// citation. The list of changes is written anew against the present 3.2, the notes on earlier drafts gone.
// Its doubt on a removed SpecTag is not taken: a rule left without its code is reported by the check of
// implementation (9.2), and behaviour removed fails the rule's tests, so no guard is added at the message.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.5"];
if (b.sidValue !== "s-ef93u6cnbs2sevr" || b.agreed) throw new Error("unexpected 9.5");

b.reason = "The code's behaviour changes only as a consequence of the specification (§s-4gk82vt7zhzp4jt). The message of a commit records which nodes the changed code implements, for whoever reads the history.";
b.ruReason = "Поведение кода меняется только вслед за спецификацией (§s-4gk82vt7zhzp4jt). Сообщение коммита фиксирует, какие узлы реализует изменённый код, — для читающего историю.";
b.changes = [
  "Узел выделен из нынешнего 3.2 «Code changes only as a consequence of the specification» и сохраняет его sid. Первый абзац 3.2 уже стоит в согласованном 1.5.1.",
  "Текст. В нынешнем 3.2 было: «Every commit that changes code names, by its sid, each approved node whose implementation it adds or changes. This covers: a node whose text has just changed; an existing node the code contradicted. Outside the tests, every SpecTag on a symbol the commit adds or changes names a node the commit's message names, or is the SpecTag that names none. The message names no domain's header and no section.» Стало одной фразой со стороны сообщения: «The message of a commit names, by its sid, each node that a SpecTag binds to a symbol added or changed in that commit. A symbol in the tests does not count.»",
  "Ушло по вашим решениям: коммит как действующее лицо; повтор одного требования в двух абзацах с разными границами; «одобренный» (это следует из 1.3.2); список «сюда входят» (он пересказывал 1.5.1 и пропускал узел, реализуемый впервые); запрет называть раздел (его проблема больше не возникает).",
  "Заголовок новый: «The nodes a commit's message names» / «Узлы, которые называет сообщение коммита».",
  "Обоснование новое и говорит о правиле в целом: поведение кода меняется только вслед за спецификацией (согласованный 1.5.1), и сообщение фиксирует для читающего историю, какие узлы реализует изменённый код. При переносе узел получит связь cites на s-4gk82vt7zhzp4jt.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.reason);
