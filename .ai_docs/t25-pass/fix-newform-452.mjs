// After the owner agreed to 1.6.1 on 2026-11-17: proposals for 10.2, 1.3.2 and the reasons in 1.3.3 and 10.6, which spoke
// of the tests running on a push. The English of the agreed 1.6.1 says "on" a push and a commit, as 10.2 does.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-452.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const DRAFT = "s-xhcmchcngykvn2k";
const replaceIn = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: not found: ${from}`);
  return s.replace(from, to);
};
const n161 = d["1.6.1"];
n161.text = replaceIn(n161.text, "such as at every push or on a shared server before a merge", "such as on every push or on a shared server before a merge", "1.6.1.text");
n161.reason = replaceIn(n161.reason, "The tests are not run at a commit,", "The tests are not run on a commit,", "1.6.1.reason");
n161.examples = n161.examples.map((e) => e);

const propose = (key, edits, why) => {
  const n = d[key];
  const v = { title: n.title, text: n.text, reason: n.reason, examples: [...(n.examples ?? [])], ruTitle: n.ruTitle, ruText: n.ruText, ruReason: n.ruReason, ruExamples: [...(n.ruExamples ?? [])] };
  for (const [field, from, to] of edits) v[field] = replaceIn(v[field], from, to, `${key}.${field}`);
  n.proposals = [{
    where: "только слова о тестах при push",
    en: [`Title: ${v.title}`, `Text: ${v.text}`, ...v.examples.map((e) => `Example: ${e}`), `Reason: ${v.reason}`].join("\n\n"),
    ru: [`Заголовок: ${v.ruTitle}`, `Текст: ${v.ruText}`, ...v.ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${v.ruReason}`].join("\n\n"),
    why,
  }];
};
const WHY = "Выполняет согласованный 1.6.1: пока спецификация одобрена, тесты должны пройти до попадания изменения в общую ветку, а где их запускать, называют собственные guidelines проекта.";
propose("10.2", [
  ["text", "- on a push: the tests of the system's code and of a project's own checks, if the specification has the status `approved`.", `- on a push, where the project's own guidelines (§${OWN}) name a push as the place where the tests run: the tests of the system's code and of a project's own checks, while the specification has the status \`approved\`.`],
  ["ruText", "- при push — тесты кода системы и собственных проверок проекта, если спецификация имеет статус `approved`.", `- при push, если собственные guidelines проекта (§${OWN}) называют push местом запуска тестов, — тесты кода системы и собственных проверок проекта, пока спецификация имеет статус \`approved\`.`],
], WHY);
propose("1.3.2", [
  ["text", `- While the specification as a whole is a draft, a push goes through without running the tests (§${DRAFT}),`, `- While the specification as a whole is a draft, no test has to pass before a change reaches the branch that the project shares (§${DRAFT}),`],
  ["ruText", `- Пока вся спецификация — черновик, push проходит без запуска тестов (§${DRAFT}),`, `- Пока вся спецификация — черновик, ни один тест не обязан проходить до того, как изменение попадёт в общую ветку проекта (§${DRAFT}),`],
], `${WHY} Это и находка 1: «push проходит без запуска тестов» → «ни один тест не обязан проходить».`);
propose("1.3.3", [
  ["reason", `decides whether the tests of the system's code run on a push (§${DRAFT})`, `decides whether the tests of the system's code must pass before a change reaches the branch that the project shares (§${DRAFT})`],
  ["ruReason", `зависит, запускаются ли при push тесты кода системы (§${DRAFT})`, `зависит, должны ли тесты кода системы пройти до того, как изменение попадёт в общую ветку проекта (§${DRAFT}),`],
], WHY);
propose("10.6", [
  ["reason", `determines whether the tests run on a push (§${DRAFT})`, `determines whether the tests must pass before a change reaches the branch that the project shares (§${DRAFT})`],
  ["ruReason", `зависит, запускаются ли тесты при push (§${DRAFT})`, `зависит, должны ли тесты пройти до того, как изменение попадёт в общую ветку проекта (§${DRAFT})`],
], WHY);
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
