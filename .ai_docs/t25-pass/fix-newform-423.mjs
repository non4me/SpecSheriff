// The specification's strict flag, settled with the owner on 2026-11-17 in a questioning with the skill `grilling` («все
// верно»): the flag stands beside the approval status, only an owner turns it on or off in an entry naming that owner,
// its default is in the schema only, while the specification is approved it sets whether code outside the commit without
// a SpecTag refuses the commit or only raises the single warning, it cannot be turned on while such code is left, and
// every message names the command that lists the code. This script, run after insert-node.mjs 10.7, writes:
// - the new draft 10.7, "The specification's strict flag", with the sid s-q3pfzyaxvpr2zj2, and its row on the page;
// - a proposal for the agreed 9.5, which takes the flag into account, with the temporary key "9.5~" for the checker.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-423.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["10.7"] && d["10.7"].sidValue !== "s-q3pfzyaxvpr2zj2") {
  // insert-node.mjs has moved the former 10.7 up; the key is free only if the former draft was renumbered.
}
const TAG = "s-8xw4mgvpexyvw5q";
const T95 = "s-kkbqcb9xrpaepwn";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const FLAG = "s-q3pfzyaxvpr2zj2";

const flag = {
  from: "",
  sid: "new",
  sidValue: FLAG,
  title: "The specification's strict flag",
  ruTitle: "Флаг strict спецификации",
  text: [
    `The specification has a \`strict\` flag. While the specification is approved, the flag sets how far the check for SpecTags reaches (§${T95}).`,
    "Only an owner of the specification turns the flag on or off. That owner records each such act in a separate entry, which names that owner. Only the latest such entry sets the flag.",
    `The procedure that turns the flag on refuses to do so while any symbol of the system's code, or any test, carries no SpecTag (§${TAG}). Its refusal names the command of the SpecSheriff tools that lists that code by file and symbol.`,
  ].join("\n\n"),
  ruText: [
    `У спецификации есть флаг \`strict\`. Пока спецификация одобрена, флаг задаёт, как далеко простирается проверка SpecTag (§${T95}).`,
    "Включает или выключает флаг только ответственный за спецификацию. Каждое такое действие этот ответственный фиксирует отдельной записью, в которой назван он сам. Флаг задаёт только последняя такая запись.",
    `Процедура, которая включает флаг, отказывается это делать, пока у какого-либо символа кода системы или теста нет SpecTag (§${TAG}). Отказ называет команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.`,
  ].join("\n\n"),
  examples: ["The specification is approved, and its strict flag is on. A commit made with the hooks bypassed has added a file without SpecTags. The next commit, which changes another file whose symbols all carry SpecTags, is refused, and the refusal names the command that lists the symbols of the added file. But not: that commit passes with a warning, as it would with the flag off."],
  ruExamples: ["Спецификация одобрена, и её флаг strict включён. Коммит, сделанный в обход хуков, добавил файл без SpecTag. Следующий коммит, который меняет другой файл, где у всех символов есть SpecTag, отклоняется, и отказ называет команду, которая выводит символы добавленного файла. Но не так: этот коммит проходит с предупреждением, как прошёл бы при выключенном флаге."],
  reason: [
    "A project whose code is all bound to its rules may want to keep it so. With the flag on, code without a SpecTag that reached the repository through a commit made with the hooks bypassed stops the next commit, where otherwise it would only raise a warning.",
    `The flag decides how strictly the checks treat the whole repository, so the owners set it by an act of their own, as they set the specification's approval status (§${APPROVAL}).`,
    "If the flag were turned on while code without a SpecTag is left, every commit would be refused except one that gave SpecTags to all that code at once. So the flag is turned on only in a repository where no such code is left.",
  ].join("\n\n"),
  ruReason: [
    "Проект, весь код которого связан с правилами, может хотеть таким и остаться. При включённом флаге код без SpecTag, попавший в репозиторий через коммит в обход хуков, останавливает следующий коммит, а иначе вызвал бы только предупреждение.",
    `Флаг решает, насколько строго проверки относятся ко всему репозиторию, поэтому его задают ответственные своим отдельным действием, как и статус одобрения спецификации (§${APPROVAL}).`,
    "Если бы флаг включили, пока остаётся код без SpecTag, отклонялся бы каждый коммит, кроме того, который сразу даст SpecTag всему этому коду. Поэтому флаг включают только в репозитории, где такого кода не осталось.",
  ].join("\n\n"),
  changes: [
    "Новый узел, по итогу расспроса 17 ноября, который вы подтвердили («все верно»): флаг стоит на том же уровне, что и статус одобрения спецификации; меняет его только ответственный, отдельной записью; значение по умолчанию (false) задаёт только схема; флаг не включается, пока есть код без SpecTag; отказ называет команду, а не перечисляет код.",
    "Как флаг меняет проверку, говорит 9.5: при включённом флаге код без SpecTag за пределами коммита отклоняет коммит, а не вызывает предупреждение.",
  ],
};

const out = {};
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "10.6") out["10.7"] = flag;
}
if (!out["10.7"] || out["10.7"] !== flag) throw new Error("10.7 was not placed: run insert-node.mjs 10.7 first");

// 9.5: a proposal that takes the flag into account.
const n = out["9.5"];
const f = {
  title: n.title,
  ruTitle: n.ruTitle,
  text: [
    `The checks treat code outside the commit that carries no SpecTag (§${TAG}) as follows:\n- while the specification is a draft, the commit passes, and the checks give no warning;\n- while the specification is approved and its \`strict\` flag (§${FLAG}) is off, the commit passes, and the checks give a single warning for all such code, saying that it exists;\n- while the specification is approved and the flag is on, the checks refuse the commit.`,
    "Code outside the commit means every symbol of the system's code other than tests, and every test, that the commit leaves unchanged. The warning and the refusal each name the command of the SpecSheriff tools that lists that code by file and symbol.",
  ].join("\n\n"),
  ruText: [
    `Код за пределами коммита без SpecTag (§${TAG}) проверки обрабатывают так:\n- пока спецификация — черновик, коммит проходит, и проверки не предупреждают;\n- пока спецификация одобрена, а её флаг \`strict\` (§${FLAG}) выключен, коммит проходит, и проверки выдают одно предупреждение на весь такой код: что такой код есть;\n- пока спецификация одобрена и флаг включён, проверки отклоняют коммит.`,
    "Код за пределами коммита — это символы кода системы вне тестов и тесты, которые коммит не меняет. И предупреждение, и отказ называют команду инструментов SpecSheriff, которая выводит этот код списком файлов и символов.",
  ].join("\n\n"),
  examples: [n.examples[0].replace("The specification is approved.", "The specification is approved, and its strict flag is off.")],
  ruExamples: [n.ruExamples[0].replace("Спецификация одобрена.", "Спецификация одобрена, и её флаг strict выключен.")],
  reason: `${n.reason}\n\nA project that wants such code to refuse the commit turns on the specification's strict flag (§${FLAG}).`,
  ruReason: `${n.ruReason}\n\nПроект, которому нужно, чтобы такой код отклонял коммит, включает флаг strict спецификации (§${FLAG}).`,
};
if (f.examples[0] === n.examples[0] || f.ruExamples[0] === n.ruExamples[0]) throw new Error("9.5: the example was not found");
n.proposals = [{
  where: "текст, пример и обоснование",
  en: [`Title: ${f.title}`, `Text: ${f.text}`, ...f.examples.map((e) => `Example: ${e}`), `Reason: ${f.reason}`].join("\n\n"),
  ru: [`Заголовок: ${f.ruTitle}`, `Текст: ${f.ruText}`, ...f.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason}`].join("\n\n"),
  why: "По итогу расспроса о флаге strict, который вы подтвердили 17 ноября. Текст теперь перечисляет три случая: черновик — коммит проходит без предупреждения; спецификация одобрена, флаг выключен — коммит проходит с одним предупреждением; спецификация одобрена, флаг включён — коммит отклоняется. Определение кода за пределами коммита и команда, которую называют и предупреждение, и отказ, вынесены во второй абзац. В пример добавлено, что флаг выключен. В обоснование добавлено одно предложение: проект, которому нужен отказ, включает флаг (10.7).",
}];
const t = { ...n, ...f };
delete t.proposals;
out["9.5~"] = t;
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");

// The page row of 10.7, after 10.6.
const page = new URL("base-structure.html", here);
let h = fs.readFileSync(page, "utf8");
const row106 = h.split("\n").find((l) => l.trim().startsWith('["10.6",'));
if (!row106) throw new Error("row 10.6 not found");
if (h.includes('["10.7","new"')) throw new Error("row 10.7 is already there");
const indent = row106.match(/^\s*/)[0];
h = h.replace(row106, `${row106}\n${indent}["10.7","new",0,"",${JSON.stringify(flag.title)},${JSON.stringify(flag.ruTitle)},"",${JSON.stringify(flag.changes[0])},[],""],`);
fs.writeFileSync(page, h);
console.log("ok");
