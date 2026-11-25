// The owner of 2026-11-11: the head is rewritten whole, in their words — the table holds the complete list of the checks
// run after an edit of the specification or of the code, the tests included. What a check reads, the sentence on a
// project's own kind and the example go; the reason is brought back to why the list stands in one place.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const h = t.head;
h.text = "This table holds the complete list of the checks run after an edit of the specification or of the code, the tests included.";
h.ruText = "Эта таблица содержит полный список проверок, которые запускаются после правок как самой спецификации, так и кода, включая тесты.";
h.reason =
  "Whoever asks which checks an edit of the specification or of the code must pass must find the whole answer in one place. " +
  "Spread across several rules, the answer comes apart. " +
  "One rule then ends up contradicting another without anybody seeing it.";
h.ruReason =
  "Тот, кто спрашивает, какие проверки должна пройти правка спецификации или кода, должен найти весь ответ в одном месте. " +
  "Разнесённый по нескольким правилам, ответ распадается. " +
  "Тогда одно правило начинает противоречить другому, а никто этого не видит.";
delete h.examples;
delete h.ruExamples;
h.changes = [
  "Тип. Был обычный текстовый узел с двумя таблицами в тексте; теперь TableRule — одна таблица, строки в двух группах. Заголовки групп — бывшие заголовки двух таблиц.",
  "Заголовок. Был «What is checked, when, and what a failure costs»; теперь «The table of checks», по вашим словам.",
  "Текст. Весь прежний текст заменён одной фразой, вашими словами. Ушло: что проверяется механически и когда (это в согласованном 1.6.1); «A check refuses unless its row says otherwise» (тоже в 1.6.1, а цену каждая строка называет сама); «Each check reads the commit being made… It never reads what the commit does not hold» (что читает каждый хук, говорит описание инструментов, узел 6 «The hooks»; то, что проверка отвечает одинаково на одно и то же, — согласованный 1.6.1).",
  "Обоснование. Было пять абзацев; осталось, зачем полный список стоит в одном месте. Абзацы о двоичных проверках и о тестах при push — в обосновании согласованного 1.6.1. Почему некоторые проверки только сообщают (расхождение, неимплементированное правило и другие), перейдёт в обоснования этих проверок, когда до них дойдём.",
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(h.text + "\n" + h.reason);
