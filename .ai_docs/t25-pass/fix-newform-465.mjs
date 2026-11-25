// Drafts 10.9 and 10.15 after the reviewer's report on 10.9 and the wording checker's report on 10.15, and after the
// owner's ruling of 2026-11-17 on finding 7 (code is generated from the last approved wording of each node).
// 10.9: "code generators", "generators that write code from the nodes", "refining this one" restored as in the agreed
// 10.8, the reviewer's reason, the example about a project rather than a service, and the code a generator wrote stays
// as it is while the rule listing the generator is a draft. 10.15: the main thought first, the reason cut to what it needs.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-465.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const g = d["10.9"];
g.title = "A project's own code generators";
g.ruTitle = "Собственные генераторы кода проекта";
g.text = "A project's own guidelines may add generators that write code from the nodes, alongside those of the SpecSheriff tools. A rule of the project's own guidelines refining this one lists these generators, with what each writes and from which nodes.\n\nEach such generator always writes the same code from the same nodes. Its code is generated from the approved wordings of its nodes, as §s-qyjw8xez6t6adc3 says. While the rule that lists the generator is a draft, the code the generator wrote stays as it is.";
g.ruText = "Собственные guidelines проекта могут добавить генераторы, которые пишут код из узлов, наряду с генераторами инструментов SpecSheriff. Правило собственных guidelines проекта, уточняющее это правило, перечисляет эти генераторы и говорит, что пишет каждый и из каких узлов.\n\nКаждый такой генератор из одних и тех же узлов всегда пишет один и тот же код. Этот код генерируется из одобренных формулировок своих узлов, как сказано в §s-qyjw8xez6t6adc3. Пока правило, которое перечисляет генератор, остаётся черновиком, код, который генератор написал, не меняется.";
g.reason = "A project may need generated code that the SpecSheriff tools do not write, such as code in another language or from nodes of its own kinds. This rule holds such code to the same conditions as the code those tools generate: it can be checked against its nodes, and it stays bound to approved nodes (§s-utvqbypzhmgndug).";
g.ruReason = "Проекту может понадобиться сгенерированный код, который инструменты SpecSheriff не пишут, например код на другом языке или из узлов собственных типов. Это правило ставит такой код в те же условия, что и код, который генерируют эти инструменты: его можно сверить с узлами, и он остаётся привязан к одобренным узлам (§s-utvqbypzhmgndug).";
g.examples = ["A project whose system is written in Go lists, in its own guidelines, a generator that writes Go types from the nodes describing its data formats."];
g.ruExamples = ["Проект, система которого написана на Go, перечисляет в собственных guidelines генератор типов Go из узлов, описывающих форматы её данных."];
g.changes = [
  g.changes[0],
  "Заголовок — несколько слов о предмете узла, как у узлов раздела 10 в новой форме: «Собственные генераторы кода проекта».",
  "Текст написан по образцу согласованного 10.8: «наряду с генераторами инструментов SpecSheriff», «правило собственных guidelines проекта, уточняющее это правило, перечисляет их». Добавлено, что генераторы пишут код из узлов: этим они отличаются от других собственных инструментов проекта, которые переписывают файлы.",
  "«Что он пишет, ждёт этого правила, как и узлов (§1.1)» — теперь по вашему решению по находке 7: код генерируется из одобренных формулировок своих узлов (§10.15), а пока правило, которое перечисляет генератор, остаётся черновиком, написанный генератором код не меняется.",
  "Обоснование переписано: зачем проекту собственный генератор (другой язык, собственные типы узлов) и что правило ставит его код в те же условия, что и код инструментов SpecSheriff.",
  "Пример новый: проект на Go.",
];

const c = d["10.15"];
c.text = "Code that is generated as part of the system's code is generated from the approved wordings of its nodes. Each node contributes its last approved wording, and a node that has never been approved contributes nothing. This holds both for the SpecSheriff tools and for a project's own generators (§s-km4x4s26kv7pjze).\n\nWhile a node's wording differs from its last approved wording, the code generated from that node lags behind the node. That lag is reported (§s-jau82aq9juv9zzh), so that everyone knows the code is out of date.";
c.ruText = "Код, который генерируется как часть кода системы, генерируется из одобренных формулировок своих узлов. Каждый узел даёт свою последнюю одобренную формулировку, а узел, который ни разу не одобряли, не даёт ничего. Это относится и к инструментам SpecSheriff, и к собственным генераторам проекта (§s-km4x4s26kv7pjze).\n\nПока формулировка узла отличается от последней одобренной, код, сгенерированный из этого узла, отстаёт от узла. Об этом отставании сообщается (§s-jau82aq9juv9zzh), чтобы все знали, что код устарел.";
c.reason = "Generated from a draft wording, code would implement what none of the node's owners has approved (§s-utvqbypzhmgndug). Generated from each node's last approved wording, it takes in every approval as soon as it is given, and a draft of one node holds back no other node's code.\n\nA change to a node can therefore be committed before the node is approved.";
c.ruReason = "Сгенерированный из черновой формулировки, код реализовал бы то, чего не одобрил ни один из ответственных за узел (§s-utvqbypzhmgndug). Сгенерированный из последней одобренной формулировки каждого узла, он отражает каждое одобрение сразу, как только оно дано, и черновик одного узла не задерживает код других узлов.\n\nПоэтому изменение узла можно закоммитить до того, как узел одобрен.";
c.changes.push("По замечаниям проверки формулировок: главная мысль — первой фразой; «узел, который ни разу не одобряли, не даёт ничего» вместо «в генерацию не входит»; из обоснования убраны фразы, которые повторяли текст.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
