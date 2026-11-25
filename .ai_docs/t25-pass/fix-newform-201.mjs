// The owner of 2026-11-11 on 9.6: a node's `meta.code` and `meta.tests` are built by the SpecSheriff tools from
// the SpecTags, no longer written by hand («если мы можем что автоматизировать и перенести на детериминированые
// процессы это предпочтительный путь»). Worded as agreed 1.3.8 and 6.4 word what the tools build; the limit for
// the SpecSheriff guidelines' nodes as 6.4 states it for incoming links (the reviewer's second doubt); "the tests
// written for it" as 9.3 says (the reviewer's TERM).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.6"];
if (b.sidValue !== "s-rwqzepmrt77rv35" || b.agreed) throw new Error("unexpected 9.6");

b.text = "The SpecSheriff tools build a node's `meta.code` and `meta.tests` from the SpecTags that bind code and tests to it. They build them anew whenever the code, the tests or the specification change. Nobody writes them by hand.\n\nA node of the SpecSheriff guidelines lists only the code and the tests of the repository where the guidelines are written.";
b.ruText = "Инструменты SpecSheriff строят `meta.code` и `meta.tests` узла из SpecTag, которые связывают с ним код и тесты. Они строят их заново при каждом изменении кода, тестов или спецификации. Вручную их никто не пишет.\n\nУзел SpecSheriff guidelines перечисляет только код и тесты того репозитория, в котором пишутся guidelines.";
b.reason = "A node's lists show a reader who has it open what implements it and the tests written for it. Built from the SpecTags, they cannot drift from the code as a list kept by hand does.";
b.ruReason = "Списки узла показывают читателю, открывшему его, что его реализует и какие тесты написаны для него. Построенные из SpecTag, они не расходятся с кодом, как расходится список, который ведут вручную.";
b.changes = [
  "Узел выделен из нынешнего 3.3 «Three records, each answering a different question» и сохраняет его sid. Заголовок новый: говорит, о чём узел.",
  "Текст. В нынешнем 3.3 было: «A rule is bound to its implementation by three records: …; the node's `meta.code` and `meta.tests`, the lists of that code and those tests. All three are written by hand. They must agree.» Стало по вашему решению от 11 ноября: списки строят инструменты SpecSheriff из SpecTag, заново при каждом изменении кода, тестов или спецификации, и вручную их никто не пишет. Так же согласованные 1.3.8 и 6.4 говорят о статусе раздела и о входящих связях.",
  "Новое: узел SpecSheriff guidelines перечисляет только код и тесты репозитория, в котором пишутся guidelines. Так согласованный 6.4 говорит о входящих связях: в проекте эти узлы перечисляли бы тесты самих инструментов, которых там нет.",
  "Ушло как пересказ: SpecTag на коде (это 1.5.2), SpecTag на тесте и назначение SpecTag (это 9.3), описание списков, которое держит схема, и «три» (в тексте нет количеств, 7.12).",
  "Обоснование новое и говорит о правиле в целом: что списки дают читателю узла и почему они строятся, а не ведутся вручную.",
];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(b.text + "\n---\n" + b.reason);
