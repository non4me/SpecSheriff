// After the owner agreed to 1.5.2 on 2026-11-17: the rules that spoke of a symbol as what a SpecTag binds now speak of the
// code that a SpecTag binds, as the owner ruled. Proposals for 9.2, 9.4, 9.5, 9.6, 10.4 and the reason in 10.1. The
// English of the agreed 1.5.2 says "the bindings file" and "allows no comments", as a native writer would.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-447.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const BIND = "s-kgbzk2ph9e6jfb4";

const n152 = d["1.5.2"];
for (const f of ["text", "reason"]) n152[f] = n152[f].split("the file of bindings").join("the bindings file").split("allows no comment").join("allows no comments").split("allow no comment").join("allow no comments");
n152.examples = n152.examples.map((e) => e.split("the file of bindings").join("the bindings file"));

const replaceIn = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};
const propose = (key, edits, why) => {
  const n = d[key];
  const v = { title: n.title, text: n.text, reason: n.reason, examples: [...(n.examples ?? [])], ruTitle: n.ruTitle, ruText: n.ruText, ruReason: n.ruReason, ruExamples: [...(n.ruExamples ?? [])] };
  for (const [field, from, to] of edits) v[field] = replaceIn(v[field], from, to, `${key}.${field}`);
  n.proposals = [{
    where: "только слова о символе",
    en: [`Title: ${v.title}`, `Text: ${v.text}`, ...v.examples.map((e) => `Example: ${e}`), `Reason: ${v.reason}`].join("\n\n"),
    ru: [`Заголовок: ${v.ruTitle}`, `Текст: ${v.ruText}`, ...v.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${v.ruReason}`].join("\n\n"),
    why,
  }];
};
const WHY = "Выполняет согласованный 1.5.2 и ваше решение 17 ноября: правила говорят о коде, который привязывает SpecTag, а не о символе.";
propose("9.2", [
  ["text", "- a symbol of the system's code outside its tests is bound to it;", `- code of the system outside its tests is bound to it (§${BIND});`],
  ["ruText", "- символ кода системы вне его тестов связан с ним;", `- код системы вне его тестов привязан к нему (§${BIND});`],
], WHY);
propose("9.4", [
  ["text", "A change to a SpecTag is considered a change to the test or the symbol of code that carries it.", "A change to a SpecTag is considered a change to the test or the code that the SpecTag binds."],
  ["ruText", "Изменение SpecTag считается изменением самого теста или символа кода, в котором он присутствует.", "Изменение SpecTag считается изменением теста или кода, который этот SpecTag привязывает."],
], WHY);
propose("9.5", [
  ["text", "Code outside the commit means every symbol of the system's code other than tests, and every test, that the commit leaves unchanged.", "Code outside the commit means the system's code other than tests, and every test, that the commit leaves unchanged."],
  ["ruText", "Код за пределами коммита — это символы кода системы вне тестов и тесты, которые коммит не меняет.", "Код за пределами коммита — это код системы вне тестов и тесты, которые коммит не меняет."],
], WHY);
propose("9.6", [
  ["text", "A commit message names, by its sid, each node that a SpecTag binds to a symbol added or changed in that commit. A symbol in the tests does not count.", "A commit message names, by its sid, each node to which a SpecTag binds code added or changed in that commit. The tests do not count."],
  ["ruText", "Сообщение коммита называет по sid каждый узел, который SpecTag связывает с символом, добавленным или изменённым в этом коммите. Символ в тестах не учитывается.", "Сообщение коммита называет по sid каждый узел, к которому SpecTag привязывает код, добавленный или изменённый в этом коммите. Тесты не учитываются."],
], WHY);
propose("10.4", [
  ["text", "- the wording of each rule named by the SpecTag of a symbol that the commit adds or changes, not counting the tests.", "- the wording of each rule to which a SpecTag binds code that the commit adds or changes, not counting the tests."],
  ["ruText", "- формулировку каждого правила, которое называет SpecTag символа, добавленного или изменённого коммитом, не считая тестов.", "- формулировку каждого правила, к которому SpecTag привязывает код, добавленный или изменённый коммитом, не считая тестов."],
], WHY);
propose("10.1", [
  ["reason", "A symbol or a test without a SpecTag that a commit leaves unchanged is reported.", "Code or a test without a SpecTag that a commit leaves unchanged is reported."],
  ["ruReason", "Символ или тест без SpecTag, которые коммит не трогает, сообщаются,", "Код или тест без SpecTag, которые коммит не меняет, сообщаются,"],
], WHY);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
