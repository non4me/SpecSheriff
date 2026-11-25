// The owner's comment of 2026-11-07 on 1.1.3: say that the guidelines are the part SpecSheriff
// describes and supplies with tools, while the base and the appendix are written with its help and
// form the specification of the system being built. A project's own guidelines (2.5) are named as
// the exception they are.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.3"];
if (n.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
const opening = "SpecSheriff describes the guidelines and provides the tools that carry them out. A project may add guidelines of its own (§[2.5]). The base specification and the technical appendix are written with the help of SpecSheriff and form the specification of the system being built.\n\n";
const ruOpening = "Guidelines описывает SpecSheriff, и он же обеспечивает их инструментами. Проект может добавить к ним собственные guidelines (§[2.5]). Базовую спецификацию и техническое приложение пишут с помощью SpecSheriff, и вместе они образуют спецификацию реализуемой системы.\n\n";
if (!n.text.startsWith("SpecSheriff")) n.text = opening + n.text;
if (!n.ruText.startsWith("Guidelines описывает")) n.ruText = ruOpening + n.ruText;
const ground = "The SpecSheriff guidelines are the same in every project that works by SpecSheriff, so its tools can hold them. The specification of a system is that project's own.\n\n";
const ruGround = "SpecSheriff guidelines одинаковы в каждом проекте, который работает по SpecSheriff, поэтому их могут держать его инструменты. Спецификация системы у каждого проекта своя.\n\n";
if (typeof n.reason === "string" && n.reason.startsWith("=")) n.reason = null;
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", import.meta.url), "utf8"));
let p13;
(function walk(ns) {
  for (const x of ns) {
    if (x.location.endsWith("/1.13")) p13 = x;
    if (x.children) walk(x.children);
  }
})(spec.nodes);
const ru13 = JSON.parse(fs.readFileSync(new URL("full-ru.json", import.meta.url), "utf8"))["1.13"];
n.reason = ground + p13.reason;
n.ruReason = ruGround + ru13.reason;
n.changes = [
  "Заголовок — по вашему комментарию: речь здесь не о всей спецификации, а только о guidelines.",
  "Стоит перед узлом о базе, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
  "Первый абзац текста новый, по вашему комментарию: guidelines описывает SpecSheriff и обеспечивает инструментами, а база и приложение пишутся с его помощью и образуют спецификацию реализуемой системы. Фраза о собственных guidelines проекта со ссылкой на 2.5 добавлена мной: без неё «guidelines описывает SpecSheriff» было бы неточно.",
  "Второй абзац текста — абзац 2 нынешнего 1.13. Абзац 1 убран: что guidelines регулируют только то, как ведётся спецификация, уже говорит 1.1.2, а что спецификация описывает систему, — 1.1.4 и 1.1.5. Поэтому «anything else» в первом пункте раскрыто: «anything but how the specification is kept, changed and implemented».",
  "Обоснование — первый абзац новый, он обосновывает первый абзац текста. Остальное — нынешнее обоснование 1.13, дословно.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n---\n", n.reason);
