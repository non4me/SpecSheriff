// Node 1.6.1, finding 4 of strictness-audit.md, under the owner's ruling of 2026-11-17: while the specification is
// approved, the tests must pass before a change reaches the branch the project shares; the project's own guidelines name
// where they run. The reason says why the tests are not run at a commit and why the place is the project's choice; while
// the specification is a draft no test has to pass, which also answers finding 1. Written as a proposal, and under the
// temporary key "1.6.1~" for the wording checker.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-450.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const DRAFT = "s-xhcmchcngykvn2k";
const n = d["1.6.1"];
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};
const text = swap(n.text, "The tests of the system's code and of a project's own checks run on a push if the specification has the status `approved`.", `While the specification has the status \`approved\`, the tests of the system's code and of a project's own checks must pass before a change reaches the branch that the project shares. The project's own guidelines (§${OWN}) name where the tests run, such as at every push or on a shared server before a merge.`, "text");
const ruText = swap(n.ruText, "Тесты кода системы и собственных проверок проекта запускаются при push, если спецификация имеет статус `approved`.", `Пока спецификация имеет статус \`approved\`, тесты кода системы и собственных проверок проекта должны пройти до того, как изменение попадёт в общую ветку проекта. Где запускаются тесты, например при каждом push или на общем сервере перед слиянием, называют собственные guidelines проекта (§${OWN}).`, "ruText");
const reason = swap(n.reason, `The tests run on a push rather than on a commit, since a suite takes longer than a commit should wait and a commit not yet pushed misleads nobody. No test runs on a push while the specification is a draft, for the reason §${DRAFT} gives.`, `The tests are not run at a commit, since a suite takes longer than a commit should wait, and a change not yet shared misleads nobody. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, no test has to pass, for the reason §${DRAFT} gives.`, "reason");
const ruReason = swap(n.ruReason, `Тесты запускаются при push, а не при коммите, поскольку набор тестов идёт дольше, чем стоит ждать коммиту, а ещё не отправленный коммит никого не вводит в заблуждение. Пока спецификация — черновик, при push не запускается ни один тест, по причине, которую даёт §${DRAFT}.`, `Тесты не запускаются при коммите: набор тестов идёт дольше, чем стоит ждать коммиту, а изменение, которое ещё не попало в общую ветку, никого не вводит в заблуждение. Где их запускать, выбирает проект, потому что некоторые наборы тестов идут часами или требуют того, чего нет на машине разработчика. Пока спецификация — черновик, ни один тест не обязан проходить, по причине, которую даёт §${DRAFT}.`, "ruReason");
const examples = [...(n.examples ?? []), "A project whose tests need a database names in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no test, and the merge waits until the tests pass."];
const ruExamples = [...(n.ruExamples ?? []), "Проект, тестам которого нужна база данных, называет в собственных guidelines, что тесты запускаются на общем сервере перед слиянием. Тогда push с машины разработчика тестов не запускает, а слияние ждёт, пока тесты пройдут."];
d["1.6.1~"] = { ...n, text, ruText, reason, ruReason, examples, ruExamples };
delete d["1.6.1~"].proposals;
n.proposals = [{
  where: "последнее предложение четвёртого абзаца текста, третий абзац обоснования, новый пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 4, по вашему решению 17 ноября: пока спецификация одобрена, тесты должны пройти до попадания изменения в общую ветку; где их запускать, называют собственные guidelines проекта. Пока спецификация — черновик, ни один тест не обязан проходить (это закрывает и находку 1).",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
