// The proposal for 9.5: the wording checker's findings, as the agent judged them. Each case of the list now states one
// outcome for the commit; "code outside the commit that carries no SpecTag" is written so that the clause attaches to the
// code; the second paragraph names the warning and the refusal by their cases; the sentence added to the reason, which
// restated the third case, is dropped.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-424.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const TAG = "s-8xw4mgvpexyvw5q";
const FLAG = "s-q3pfzyaxvpr2zj2";
const n = d["9.5"];
const t = d["9.5~"];
t.text = [
  `The checks treat code that is outside the commit and carries no SpecTag (§${TAG}) as follows:\n- while the specification is a draft, the commit passes without a warning;\n- while the specification is approved and its \`strict\` flag (§${FLAG}) is off, the commit passes with a single warning for all such code, which says that such code exists;\n- while the specification is approved and its \`strict\` flag is on, the commit is refused.`,
  "Code outside the commit means every symbol of the system's code other than tests, and every test, that the commit leaves unchanged. The warning of the second case and the refusal of the third each name the command of the SpecSheriff tools that lists that code by file and symbol.",
].join("\n\n");
t.ruText = [
  `Код за пределами коммита без SpecTag (§${TAG}) проверки обрабатывают так:\n- пока спецификация — черновик, коммит проходит без предупреждения;\n- пока спецификация одобрена, а её флаг \`strict\` (§${FLAG}) выключен, коммит проходит с одним предупреждением на весь такой код: что такой код есть;\n- пока спецификация одобрена, а её флаг \`strict\` включён, коммит отклоняется.`,
  "Код за пределами коммита — это символы кода системы вне тестов и тесты, которые коммит не меняет. И предупреждение во втором случае, и отказ в третьем называют команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.",
].join("\n\n");
t.reason = n.reason;
t.ruReason = n.ruReason;
const p = n.proposals[0];
p.where = "текст и пример";
p.en = [`Title: ${t.title}`, `Text: ${t.text}`, ...t.examples.map((e) => `Example: ${e}`), `Reason: ${t.reason}`].join("\n\n");
p.ru = [`Заголовок: ${t.ruTitle}`, `Текст: ${t.ruText}`, ...t.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${t.ruReason}`].join("\n\n");
p.why = "По итогу расспроса о флаге strict, который вы подтвердили 17 ноября. Текст теперь перечисляет три случая для кода за пределами коммита без SpecTag: черновик — коммит проходит без предупреждения; спецификация одобрена, флаг выключен — коммит проходит с одним предупреждением; спецификация одобрена, флаг включён — коммит отклоняется. Определение кода за пределами коммита и команда, которую называют и предупреждение, и отказ, — во втором абзаце. В пример добавлено, что флаг выключен. Обоснование не меняется. После проверки формулировок каждый случай называет один исход для коммита.";
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
