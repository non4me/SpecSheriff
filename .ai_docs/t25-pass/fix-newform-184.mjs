// The owner of 2026-11-11: 9.3 and 9.5 become one node, "The SpecTag", stating only what a SpecTag is
// for: it binds a rule to the tests and the code that implement it. Which nodes are implemented is
// 9.2's (no kinds of node mixed in here); where a test's SpecTag stands and the form `@spec none` are
// in tools/8 (s-5z5gnu7pahr82xp); that technical code carries the SpecTag saying so is agreed 1.5.2.
// 9.5 is removed afterwards by remove-node.mjs 9.5. The citations of 9.5's sid in agreed 1.2.7 and
// 1.5.2 and in 9.7 are retargeted or dropped, a technical replacement changing no meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));

const swap = (key, field, from, to) => {
  const b = d[key];
  if (b[field].split(from).length !== 2) throw new Error(`${key}.${field}: "${from}" is not there exactly once`);
  b[field] = b[field].replace(from, to);
};

const t = d["9.3"];
if (t.sidValue !== "s-8xw4mgvpexyvw5q") throw new Error("unexpected 9.3");
if (d["9.5"].sidValue !== "s-ezq67wu75updp98") throw new Error("unexpected 9.5");
delete t.agreed;
t.title = "The SpecTag";
t.ruTitle = "SpecTag";
t.text = "A SpecTag binds a rule to the tests and the code that implement it.";
t.ruText = "SpecTag связывает правило с тестами и кодом, которые его реализуют.";
t.reason = "A test and the code it verifies implement a rule together (§s-6fw72j65jkqrfpf), so one form of reference binds both to it. One form is read by one check and recognised by a reader wherever it stands.";
t.ruReason = "Тест и код, который он проверяет, реализуют правило вместе (§s-6fw72j65jkqrfpf), поэтому к правилу их привязывает одна форма ссылки. Одну форму читает одна проверка, и читатель узнаёт её, где бы она ни стояла.";
t.changes = [
  "По вашему решению от 11 ноября узел объединяет прежние 9.3 «SpecTag теста» и 9.5 «SpecTag технического кода» и говорит только о назначении SpecTag. Узел 9.5 удалён, sid остался от 9.3.",
  "Заголовок. Было «A test's SpecTag» / «SpecTag теста». Стало «The SpecTag» / «SpecTag».",
  "Текст. Было: каждый тест кода системы связан SpecTag с узлом, для которого он написан, там, где о нём сообщает запуск тестов; этот узел — правило или узел собственного типа, которому требуется имплементация кода; для ссылки теста на правило (1.4.2) такой узел считается правилом. Стало одной фразой: «A SpecTag binds a rule to the tests and the code that implement it.»",
  "Ушло из текста: перечень узлов, которые может называть SpecTag (какие узлы реализуются, говорит 9.2); где стоит SpecTag теста (это говорит раздел 8 описания инструментов, s-5z5gnu7pahr82xp); фраза о 1.4.2. Из прежнего 9.5 ушло всё: требование SpecTag на техническом коде есть в согласованном 1.5.2, его форма `@spec none` — в разделе 8 описания инструментов, туда же переходит вопрос D2.",
  "Обоснование новое. Прежнее говорило о терминах и разделах и об отчёте запуска тестов, а это ушло из текста.",
];

// 1.2.7 (agreed): the text's citation backed the examples, which 1.2.7 now states itself; the reason's
// "It is marked as technical" is backed by 1.5.2, which requires that SpecTag.
swap("1.2.7", "text", " (§s-ezq67wu75updp98)", "");
swap("1.2.7", "ruText", " (§s-ezq67wu75updp98)", "");
swap("1.2.7", "reason", "§s-ezq67wu75updp98", "§s-kgbzk2ph9e6jfb4");
swap("1.2.7", "ruReason", "§s-ezq67wu75updp98", "§s-kgbzk2ph9e6jfb4");
d["1.2.7"].changes.push("Техническая замена 11 ноября, смысл не меняется: ссылка в тексте на удалённый 9.5 убрана, ссылка в обосновании ведёт на 1.5.2.");
// 1.5.2 (agreed): the sentence states the requirement in its own words.
swap("1.5.2", "text", " (§s-ezq67wu75updp98)", "");
swap("1.5.2", "ruText", " (§s-ezq67wu75updp98)", "");
d["1.5.2"].changes.push("Техническая замена 11 ноября, смысл не меняется: ссылка на удалённый 9.5 убрана.");
// 9.7 (draft): the SpecTag naming no node is 1.5.2's.
swap("9.7", "text", "§s-ezq67wu75updp98", "§s-kgbzk2ph9e6jfb4");
swap("9.7", "ruText", "§s-ezq67wu75updp98", "§s-kgbzk2ph9e6jfb4");

fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
const left = JSON.stringify(Object.fromEntries(Object.entries(d).filter(([k]) => k !== "9.5"))).match(/s-ezq67wu75updp98/g);
console.log("9.5's sid left outside 9.5:", left ? left.length : 0);
