// Draft of node 10.9, "A project's own generators join those of the SpecSheriff tools" (s-km4x4s26kv7pjze, present 5.6),
// which the owner's ruling of 2026-11-17 on finding 5 about the extensions returns from the extension to section 10,
// right after 10.8 on a project's own checks. Its wording follows the agreed 10.8.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-draft-10-9.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["10.9"]) throw new Error("10.9 already drafted");
d["10.9"] = {
  from: "5.6",
  sid: "kept",
  title: "A project's own generators join those of the SpecSheriff tools",
  ruTitle: "Собственные генераторы проекта присоединяются к генераторам инструментов SpecSheriff",
  text: "A project's own guidelines may add generators of code to those of the SpecSheriff tools. A rule of the project's own guidelines refining this one lists them, with what each writes and from which nodes. Each such generator writes the same code from the same nodes. What it writes waits for the approval of the rule that lists it, as it waits for the approval of the nodes it is written from (§s-qyjw8xez6t6adc3).",
  ruText: "Собственные guidelines проекта могут добавить генераторы кода к генераторам инструментов SpecSheriff. Правило собственных guidelines проекта, уточняющее это правило, перечисляет их и говорит, что пишет каждый и из каких узлов. Каждый такой генератор из одних и тех же узлов пишет один и тот же код. То, что он пишет, ждёт одобрения правила, которое его перечисляет, так же как ждёт одобрения узлов, из которых оно написано (§s-qyjw8xez6t6adc3).",
  reason: "No generator of the SpecSheriff tools knows a project's own kinds of node and the fields they add, or a language in which the SpecSheriff tools write no code. A generated copy can be checked against what its nodes produce only where the same nodes always produce the same code.\n\nCode from a generator whose rule is a draft would implement what nobody has approved (§s-utvqbypzhmgndug).",
  ruReason: "Ни один генератор инструментов SpecSheriff не знает собственных видов узлов проекта и полей, которые они добавляют, и языка, на котором инструменты SpecSheriff кода не пишут. Сгенерированную копию можно сверить с тем, что дают её узлы, только если одни и те же узлы всегда дают один и тот же код.\n\nКод от генератора, чьё правило — черновик, реализовал бы то, чего никто не одобрил (§s-utvqbypzhmgndug).",
  examples: ["A service written in Go lists, in the project's own guidelines, a generator that writes Go types from the nodes that describe the formats of its data."],
  ruExamples: ["Сервис, написанный на Go, перечисляет в собственных guidelines проекта генератор, который пишет типы Go из узлов, описывающих форматы его данных."],
  changes: [
    "Перенесён из расширения «Генерация кода из узлов» в раздел 10, сразу после 10.8 о собственных проверках проекта (вы, 17 ноября: генерация кода остаётся в guidelines).",
    "Заголовок и текст написаны по образцу согласованного 10.8: «к генераторам инструментов SpecSheriff», «правило собственных guidelines проекта, уточняющее это правило, перечисляет их».",
    "«What it writes waits for that rule as for the nodes (§1.1)» — теперь ссылка на 10.15, где сказано, что сгенерированный код ждёт одобрения своих узлов.",
    "Обоснование: «NodeKinds and properties» заменено нынешними словами «kinds of node and the fields they add»; добавлен язык, на котором инструменты SpecSheriff кода не пишут (находка 5).",
    "Пример новый: сервис на Go.",
  ],
  sidValue: "s-km4x4s26kv7pjze",
};
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
