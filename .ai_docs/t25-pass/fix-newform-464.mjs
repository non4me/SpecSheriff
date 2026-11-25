// The draft of 10.9 brought into line with what the wording checker found: a title of a few words, no "refining this
// one", two paragraphs, "always", "just as", and in the reason "the fields those kinds add" and "a copy of generated code".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-464.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.9"];
n.title = "A project's own generators of code";
n.ruTitle = "Собственные генераторы кода проекта";
n.text = "A project's own guidelines may add generators of code to those of the SpecSheriff tools. A rule of the project's own guidelines lists these generators, with what each writes and from which nodes.\n\nEach such generator always writes the same code from the same nodes. What it writes waits for the approval of the rule that lists the generator, just as it waits for the approval of the nodes it is written from (§s-qyjw8xez6t6adc3).";
n.ruText = "Собственные guidelines проекта могут добавить генераторы кода к генераторам инструментов SpecSheriff. Правило собственных guidelines проекта перечисляет эти генераторы и говорит, что пишет каждый и из каких узлов.\n\nКаждый такой генератор из одних и тех же узлов всегда пишет один и тот же код. То, что он пишет, ждёт одобрения правила, которое перечисляет генератор, так же как ждёт одобрения узлов, из которых оно написано (§s-qyjw8xez6t6adc3).";
n.reason = "No generator of the SpecSheriff tools knows a project's own kinds of node and the fields those kinds add, or a language in which the SpecSheriff tools write no code. A copy of generated code kept in the repository can be checked against what its nodes produce only where the same nodes always produce the same code.\n\nCode from a generator whose rule is a draft would implement what nobody has approved (§s-utvqbypzhmgndug).";
n.ruReason = "Ни один генератор инструментов SpecSheriff не знает собственных видов узлов проекта и полей, которые эти виды добавляют, и языка, на котором инструменты SpecSheriff кода не пишут. Копию сгенерированного кода, хранимую в репозитории, можно сверить с тем, что дают её узлы, только если одни и те же узлы всегда дают один и тот же код.\n\nКод от генератора, чьё правило — черновик, реализовал бы то, чего никто не одобрил (§s-utvqbypzhmgndug).";
n.changes[1] = "Заголовок — несколько слов о предмете узла, как у узлов раздела 10 в новой форме. Текст написан по образцу согласованного 10.8: «к генераторам инструментов SpecSheriff»; «уточняющее это» убрано — уточнение задаёт связь `refines`, а не текст.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
