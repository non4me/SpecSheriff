// 9.6 "A node's lists of its code and its tests", by the author's checklist (2026-11-11): its main thought, what
// the lists hold, goes first (7.6); the reason grounds the rule as a whole, why "by hand" included, which the
// former reason left unsaid (agreed 1.2.6: nothing is written into the specification from the code).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.6"];
if (b.sidValue !== "s-rwqzepmrt77rv35" || b.agreed) throw new Error("unexpected 9.6");

b.text = "A node's `meta.code` and `meta.tests` list exactly the code and the tests that carry the node's SpecTag. Both lists are written by hand.";
b.ruText = "`meta.code` и `meta.tests` узла перечисляют ровно тот код и те тесты, которые связаны SpecTag с этим узлом. Оба списка пишутся вручную.";
b.reason = "The lists show a reader who has a node open what implements it and what verifies it, while nothing is carried into the specification from the code (§s-xqs2e24mx5253ye).";
b.ruReason = "Списки показывают читателю, открывшему узел, что его реализует и что его проверяет, и при этом ничего не переносится в спецификацию из кода (§s-xqs2e24mx5253ye).";
b.changes = [
  "Узел выделен из нынешнего 3.3 «Three records, each answering a different question» и сохраняет его sid. Заголовок новый: говорит, о чём узел.",
  "Текст. В нынешнем 3.3 было: «A rule is bound to its implementation by three records: …; the node's `meta.code` and `meta.tests`, the lists of that code and those tests. All three are written by hand. They must agree.» Стало: «A node's `meta.code` and `meta.tests` list exactly the code and the tests that carry the node's SpecTag. Both lists are written by hand.» Главная мысль — что держат списки — стоит первой.",
  "Ушло как пересказ: SpecTag на коде (это 1.5.2), SpecTag на тесте и назначение SpecTag (это 9.3), описание списков, которое держит схема, и «три» (в тексте нет количеств, 7.12).",
  "Обоснование новое и говорит о правиле в целом: списки показывают читателю узла, что его реализует и проверяет, и при этом ничего не переносится в спецификацию из кода (согласованный 1.2.6). Прежнее не объясняло, почему списки пишутся вручную. При переносе узел получит связь cites на s-xqs2e24mx5253ye.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n" + b.reason);
