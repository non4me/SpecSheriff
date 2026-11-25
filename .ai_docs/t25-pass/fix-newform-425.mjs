// Node 10.7: the findings of specsheriff-rule-reviewer and of the wording checker, as the agent judged them. The first
// paragraph says what the flag decides instead of "how far the check reaches"; the third excludes the tests from "the
// system's code" so that helper symbols in test files do not block the flag; the reason says why the rule exists instead
// of going through the text paragraph by paragraph. The reviewer's two doubts (the approval procedure while the flag is
// on, and the name `strict`) go to the owner before the node is shown.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-425.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const T95 = "s-kkbqcb9xrpaepwn";
const TAG = "s-8xw4mgvpexyvw5q";
const n = d["10.7"];
const p = n.text.split("\n\n");
const rp = n.ruText.split("\n\n");
p[0] = `The specification has a \`strict\` flag. While the specification is approved, the flag decides whether code that is outside a commit and carries no SpecTag makes the checks refuse that commit or only warn about it (§${T95}).`;
rp[0] = `У спецификации есть флаг \`strict\`. Пока спецификация одобрена, флаг решает, отклоняют ли проверки коммит из-за кода без SpecTag за пределами этого коммита или только предупреждают о нём (§${T95}).`;
p[2] = `The procedure that turns the flag on refuses to do so while any symbol of the system's code other than tests, or any test, carries no SpecTag (§${TAG}). Its refusal names the command of the SpecSheriff tools that lists that code by file and symbol.`;
rp[2] = `Процедура, которая включает флаг, отказывается это делать, пока у какого-либо символа кода системы вне тестов или у какого-либо теста нет SpecTag (§${TAG}). Отказ называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.`;
n.text = p.join("\n\n");
n.ruText = rp.join("\n\n");
n.reason = "A project whose code is all bound to its rules may want to keep it so. A warning does not make anyone bind code without a SpecTag that a commit made with the hooks bypassed brought in. Once all the code is bound, the flag lets the owners have the checks refuse every commit that leaves such code in place.";
n.ruReason = "Проект, весь код которого связан с правилами, может захотеть сохранить его таким. Предупреждение не заставляет связать с правилами код без SpecTag, который принёс коммит в обход хуков. Когда весь код связан с правилами, флаг позволяет ответственным сделать так, чтобы проверки отклоняли каждый коммит, оставляющий такой код на месте.";
n.changes.push("После рецензии и проверки формулировок: первый абзац говорит, что именно решает флаг; в третьем из «кода системы» исключены тесты, чтобы вспомогательные символы в файлах тестов не мешали включить флаг; обоснование говорит, зачем узел нужен, а не идёт по абзацам текста.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
