// Node 9.1: the owner's remarks of 2026-11-14 on the proposal of fix-newform-267.mjs:
// - the tests stood after "except its guidelines" and read as excluded too, so they go into a sentence of their own;
// - the tests cannot be separated from the code, since they are written before it and the code must conform to them;
// - the owner read "code written by hand" as code a person writes, which the method does not make the norm.
// The single new wording: the tests and the generated code in a list of their own, "written by hand" dropped, and the
// owner's reason for the tests added to the node's reason. The change of fix-newform-266.mjs (the citation of the node on
// generators removed) stays.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["9.1"];

const text = [
  "The system's code is the code implementing every part of the specification except its guidelines. The system's code also includes:",
  "",
  "- the code generated from the specification's nodes;",
  "- the tests verifying the system's code.",
  "",
  "The repository's configuration, its own tools and the tests of those tools are not part of the system's code. A project's own checks (§s-2fau85dfyyeq66m) and generators are among those tools. Whether a file is part of the system's code is decided by where it lives.",
].join("\n");
const ruText = [
  "Код системы — это код, реализующий все части спецификации, кроме её guidelines. В код системы входят также:",
  "",
  "- код, сгенерированный из узлов спецификации;",
  "- тесты, проверяющие код системы.",
  "",
  "Конфигурация репозитория, его собственные инструменты и тесты этих инструментов кодом системы не являются. Собственные проверки проекта (§s-2fau85dfyyeq66m) и его генераторы входят в число этих инструментов. Относится ли файл к коду системы, решает то, где он лежит.",
].join("\n");
const reason =
  "The rules binding code to the specification need a line between the system's code and whatever supports the work on the system. Tests are written before the code, and the code must conform to them. A rule is considered implemented only when its code and a passing test are both present (§s-6fw72j65jkqrfpf). So the tests cannot be separated from the code and fall on its side of that line. A file's location is the same for every check, so the location draws that line.";
const ruReason =
  "Правилам, связывающим код со спецификацией, нужна граница между кодом системы и тем, что обслуживает работу над системой. Тесты пишут раньше кода, и код должен им соответствовать. Правило считается реализованным только своим кодом вместе с проходящим тестом (§s-6fw72j65jkqrfpf). Поэтому тесты неотделимы от кода и находятся на его стороне этой границы. Место файла одинаково для каждой проверки, поэтому оно и проводит эту границу.";

n.proposals = [
  {
    where: "текст и обоснование целиком",
    en: "Text: " + text + "\n\nReason: " + reason,
    ru: "Текст: " + ruText + "\n\nОбоснование: " + ruReason,
    why:
      "Первое предложение: «все части спецификации, кроме её guidelines» вместо «спецификацию вне её guidelines» — в русском пропали слова «части спецификации», которые есть в английском. Тесты и сгенерированный код вынесены из первого предложения в список, чтобы тесты не читались как исключённые вместе с guidelines. Убраны слова «код, написанный вручную»: они противопоставляли код, который пишут, коду, который генерируют из узлов, но читались как код, который пишет человек. Второй абзац: убрана ссылка на узел о генераторах проекта, который уходит в расширение как 12.5.2. Обоснование: добавлено ваше «тесты пишут раньше кода, и код должен им соответствовать», и тесты названы неотделимыми от кода.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("9.1 proposal rewritten");
