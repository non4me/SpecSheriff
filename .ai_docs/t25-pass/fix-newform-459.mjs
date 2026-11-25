// Node 10.11, finding 3 of sections 6 to 10, under the owner's ruling of 2026-11-17: the tools and the checks run from
// the particular to the general, in three steps: the tools that rewrite files (the project's own ones that its guidelines
// list, then the generators of the SpecSheriff tools); the project's own checks and its other own tools; the checks of
// the guidelines last. Nothing changes the commit after the first step. Replaces the proposal of fix-newform-458.mjs.
// Written as a proposal, and under the temporary key "10.11~" for the wording checker.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-459.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const OWNCHECKS = "s-2fau85dfyyeq66m";
const CHECKS = "s-jau82aq9juv9zzh";
const n = d["10.11"];
const title = "The order of the tools and the checks on a commit and on a push";
const ruTitle = "Порядок инструментов и проверок при коммите и при push";
const text = [
  [
    "On a commit and on a push, the tools and the checks run in three steps:",
    `1. the tools that rewrite files: first the project's own tools of that kind that the project's own guidelines (§${OWN}) list, such as formatters, and then the generators of the SpecSheriff tools;`,
    `2. the project's own checks (§${OWNCHECKS}) and the project's other own tools, which change no file;`,
    `3. the checks of the SpecSheriff guidelines (§${CHECKS}).`,
  ].join("\n"),
  "After the first step, nothing changes what the commit contains. Each step runs whatever the earlier steps found. The commit or the push goes through only where every check and every tool passes.",
  "Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes it is told that no check of SpecSheriff ran.",
].join("\n\n");
const ruText = [
  [
    "При коммите и при push инструменты и проверки запускаются в три шага:",
    `1. инструменты, которые переписывают файлы: сначала такие собственные инструменты проекта, которые перечисляют собственные guidelines проекта (§${OWN}), например форматтеры, а затем генераторы инструментов SpecSheriff;`,
    `2. собственные проверки проекта (§${OWNCHECKS}) и остальные собственные инструменты проекта, которые не меняют файлов;`,
    `3. проверки SpecSheriff guidelines (§${CHECKS}).`,
  ].join("\n"),
  "После первого шага ничто не меняет содержимого коммита. Каждый шаг запускается, что бы ни нашли предыдущие. Коммит или push проходит, только если проходят все проверки и все инструменты.",
  "Там, где инструменты SpecSheriff не могут запуститься, собственные инструменты проекта всё равно запускаются. Тогда коммит или push проходит, если ни один из них не отклонил его. Тот, кто его делает, получает сообщение, что ни одна проверка SpecSheriff не запускалась.",
].join("\n\n");
const reason = [
  "A project may run tools of its own on a commit or a push, such as a scan that nothing internal reaches a public repository, and taking up the method must not stop them.",
  "The order goes from the particular to the general. Whatever rewrites files runs first, so every check reads the commit in its final form. The checks of the guidelines run last, on what has already passed the checks of the project. A tool that changed the commit after the checks would let through what no check had read.",
  "The generators of the SpecSheriff tools run after the project's own tools that rewrite files, so that no formatter changes what they generate.",
  "Where the SpecSheriff tools cannot run, as on a machine without the plugin, the project's own guard still holds, and a team that needs the checks to hold for everyone runs them in CI.",
].join("\n\n");
const ruReason = [
  "Проект может запускать при коммите или push свои инструменты, например проверку того, что ничего внутреннего не попадает в публичный репозиторий, и переход на метод не должен их останавливать.",
  "Порядок идёт от частного к общему. Всё, что переписывает файлы, запускается первым, поэтому каждая проверка читает коммит в окончательном виде. Проверки guidelines запускаются последними, на том, что уже прошло проверки проекта. Инструмент, который менял бы коммит после проверок, пропустил бы то, чего не читала ни одна проверка.",
  "Генераторы инструментов SpecSheriff запускаются после собственных инструментов проекта, которые переписывают файлы, чтобы ни один форматтер не менял того, что они генерируют.",
  "Там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина, собственная защита проекта всё равно действует, а команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.",
].join("\n\n");
const examples = ["A project's own guidelines list a formatter. On a commit, the formatter rewrites the files of the commit first, and the generators of the SpecSheriff tools then write their files. A scan for secrets runs next, and the checks of the guidelines run last, on the final files."];
const ruExamples = ["Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. После этого запускается поиск секретов, а проверки guidelines запускаются последними, на окончательных файлах."];
d["10.11~"] = { ...n, title, ruTitle, text, ruText, reason, ruReason, examples, ruExamples };
delete d["10.11~"].proposals;
n.proposals = [{
  where: "заголовок, текст, обоснование и пример",
  en: [`Title: ${title}`, `Text: ${text}`, ...examples.map((e) => `Example: ${e}`), `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${ruTitle}`, `Текст: ${ruText}`, ...ruExamples.map((e) => `Пример: ${e}`), `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Находка 3 разделов 6–10, по вашему решению 17 ноября: порядок от частного к общему в три шага — инструменты, которые переписывают файлы; собственные проверки и инструменты проекта; проверки guidelines последними. После первого шага коммит никто не меняет.",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
