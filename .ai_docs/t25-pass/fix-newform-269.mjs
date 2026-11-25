// Node 9.1: the reviewer's findings on the proposal of fix-newform-268.mjs, applied before the owner sees it.
// - "also includes" set the generated code apart from the implementing code, which already contains it, and "the tests
//   verifying the system's code" was circular: the tests now follow the first sentence as "the tests of that code", and
//   the generated code is said to be implementing code like any other.
// - The reason gave two grounds for one conclusion, and stated a requirement without citing it: the owner's ground stays,
//   cited to s-rah8b37kytb682y (1.4.1, "The test comes before the code"), in place of the one cited to s-6fw72j65jkqrfpf.
// - `why` now says which of the owner's proposals the wording does not take, and why.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["9.1"];

const text = [
  "The system's code is the code implementing every part of the specification except its guidelines. The tests of that code are part of the system's code too. Code generated from the specification's nodes is considered implementing code like any other.",
  "",
  "The repository's configuration, its own tools and the tests of those tools are not part of the system's code. A project's own checks (§s-2fau85dfyyeq66m) and generators are among those tools. Whether a file is part of the system's code is decided by where it lives.",
].join("\n");
const ruText = [
  "Код системы — это код, реализующий все части спецификации, кроме её guidelines. Тесты этого кода тоже входят в код системы. Код, сгенерированный из узлов спецификации, считается реализующим наравне с остальным кодом.",
  "",
  "Конфигурация репозитория, его собственные инструменты и тесты этих инструментов кодом системы не являются. Собственные проверки проекта (§s-2fau85dfyyeq66m) и его генераторы входят в число этих инструментов. Относится ли файл к коду системы, решает то, где он лежит.",
].join("\n");
const reason =
  "The rules binding code to the specification need a line between the system's code and whatever supports the work on the system. Tests are written before the code, and the code must conform to them (§s-rah8b37kytb682y). So the tests cannot be separated from the code and fall on its side of that line. A file's location is the same for every check, so the location draws that line.";
const ruReason =
  "Правилам, связывающим код со спецификацией, нужна граница между кодом системы и тем, что обслуживает работу над системой. Тесты пишут раньше кода, и код должен им соответствовать (§s-rah8b37kytb682y). Поэтому тесты неотделимы от кода и находятся на его стороне этой границы. Место файла одинаково для каждой проверки, поэтому оно и проводит эту границу.";

n.proposals = [
  {
    where: "текст и обоснование целиком",
    en: "Text: " + text + "\n\nReason: " + reason,
    ru: "Текст: " + ruText + "\n\nОбоснование: " + ruReason,
    why: [
      "Первое предложение: «все части спецификации, кроме её guidelines» вместо «спецификацию вне её guidelines» — в русском пропали слова «части спецификации», которые есть в английском.",
      "Тесты вынесены в отдельное предложение, чтобы не читались как исключённые вместе с guidelines.",
      "Убраны слова «код, написанный вручную»: они противопоставляли код, который пишут, коду, который генерируют из узлов, но читались как код, который пишет человек. Теперь сказано только, что сгенерированный код — такой же реализующий код.",
      "Второй абзац: убрана ссылка на узел о генераторах проекта, который уходит в расширение как 12.5.2.",
      "Обоснование: ваше «тесты пишут раньше кода, и код должен им соответствовать», со ссылкой на узел 1.4.1 «Тест пишется до кода», заменило довод о том, что правило реализовано только кодом вместе с проходящим тестом.",
      "Не взята ваша формулировка «спецификацию, созданную по guidelines»: собственные guidelines проекта тоже пишутся по SpecSheriff guidelines, и код собственных проверок проекта по первому предложению попал бы в код системы.",
      "Не предложено отдельное правило о коде, который пишет человек: проверки одинаково применяются к любому изменению, кто бы его ни сделал, и ни одна проверка не может определить, кто написал строку. Код, написанный раньше своего правила, допускается только в расширении 12.6 «Адоптация существующего проекта».",
    ].join(" "),
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("9.1 proposal revised after review");
