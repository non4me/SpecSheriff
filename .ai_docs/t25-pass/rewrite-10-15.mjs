// Node 10.15 (s-qyjw8xez6t6adc3, formerly 13.1) rewritten under the owner's ruling of 2026-11-17 on finding 7 about the
// extensions: code generated from the nodes is generated from the last approved wording of each node, and a node never
// approved is left out, instead of the code waiting until every node it is generated from is approved. The citation of
// 12.3 is replaced by general wording, since the SpecSheriff guidelines name no concept of an extension (1.7.4).
// The script also fixes the English of the agreed 10.10 as EngStickler's readers found, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-rewrite-10-15.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const n = d["10.15"];
n.title = "Code generated from approved wordings";
n.ruTitle = "Код, сгенерированный из одобренных формулировок";
n.text = "What is generated as part of the system's code, by the SpecSheriff tools or by a project's own generators (§s-km4x4s26kv7pjze), is generated from the last approved wording of each node it is generated from. A node that has never been approved is left out.\n\nWhile a node's wording differs from its last approved wording, the code generated from that node lags behind it. The lag is reported (§s-jau82aq9juv9zzh), so that nobody takes that code to be current.";
n.ruText = "То, что генерируется как часть кода системы, инструментами SpecSheriff или собственными генераторами проекта (§s-km4x4s26kv7pjze), генерируется из последней одобренной формулировки каждого узла, из которого оно генерируется. Узел, который ни разу не одобряли, в генерацию не входит.\n\nПока формулировка узла отличается от последней одобренной, код, сгенерированный из этого узла, отстаёт от него. Об отставании сообщается (§s-jau82aq9juv9zzh), чтобы никто не принял этот код за актуальный.";
n.reason = "Code generated from a node is part of the system. Generated from a draft wording, it would implement what none of the node's owners has approved (§s-utvqbypzhmgndug). Generated from the last approved wording of each node, it takes in every approval as soon as it is given, and a draft of one node holds back no other node's code.\n\nA change to a node can therefore be committed before its approval, like a change to any rule. Meanwhile the code keeps implementing the approved wording.";
n.ruReason = "Код, сгенерированный из узла, — часть системы. Сгенерированный из черновой формулировки, он реализовал бы то, чего не одобрил ни один из ответственных за узел (§s-utvqbypzhmgndug). Сгенерированный из последней одобренной формулировки каждого узла, он отражает каждое одобрение сразу, как только оно дано, и черновик одного узла не задерживает код других узлов.\n\nПоэтому изменение узла можно закоммитить до его одобрения, как изменение любого правила. Тем временем код по-прежнему реализует одобренную формулировку.";
n.examples = ["Two data formats are generated into one file of types. An owner approves a change to the first format while the second is a draft under discussion. The types of the first format are regenerated from its new wording at once, and the types of the second stay as its last approved wording describes them."];
n.ruExamples = ["Два формата данных генерируются в один файл типов. Ответственный одобряет изменение первого формата, пока второй обсуждается в черновике. Типы первого формата сразу генерируются заново из его новой формулировки, а типы второго остаются такими, какими их описывает его последняя одобренная формулировка."];
n.changes.push(
  "Переписан по вашему решению 17 ноября по находке 7: код генерируется из последней одобренной формулировки каждого узла, а узел, который ни разу не одобряли, в генерацию не входит. Прежнее «генерируется заново только тогда, когда одобрен каждый узел; до тех пор ни один коммит его не меняет» убрано: из-за него один черновик держал на месте весь файл типов.",
  "Заголовок новый: правило теперь говорит, из чего генерируется код, а не что код ждёт.",
  "«её типы и RuntimeChecks (§12.3)» заменено общими словами «инструментами SpecSheriff или собственными генераторами проекта»: guidelines не называют понятий расширения (1.7.4).",
  "Обоснование: добавлено, почему код генерируется из последней одобренной формулировки; фраза «он по-прежнему никогда не редактируется (§10.14)» убрана — код теперь генерируется заново, как и всё сгенерированное.",
  "Пример новый: два формата данных в одном файле типов.",
);

const t = d["10.10"];
const swap = (field, from, to) => {
  if (!t[field].includes(from)) throw new Error(`10.10 ${field}: not found: ${from}`);
  t[field] = t[field].replace(from, to);
};
swap("text", "never counts toward implementing a rule", "never counts as implementing a rule");
swap("reason", "written for it", "written from it");
swap("reason", "from rules of the guidelines", "from the rules of the guidelines");
swap("reason", "the test first", "with the test first");
t.changes.push("Только английский текст, по замечаниям читателей: «counts as implementing», «written from it», «the rules of the guidelines», «with the test first». Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(t.reason);
