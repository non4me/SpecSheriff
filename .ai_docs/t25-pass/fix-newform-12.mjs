// The owner's comments of 2026-11-07 on 1.1.3: the guidelines belong to the specification of the
// system too; the SpecSheriff guidelines are never changed, but a project extends them with rules
// of its own as far as it needs. The first paragraph of the text and of the reason are rewritten.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.3"];
if (n.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
const swapFirst = (s, first) => [first, ...s.split("\n\n").slice(1)].join("\n\n");

n.text = swapFirst(n.text, "SpecSheriff describes the guidelines and provides the tools that carry them out. A project never changes the SpecSheriff guidelines (§[2.6]). It may extend them with rules of its own where it needs to (§[2.5]). The base specification and the technical appendix are written with the help of SpecSheriff. Together with the guidelines, they form the specification of the system being built.");
n.ruText = swapFirst(n.ruText, "Guidelines описывает SpecSheriff, и он же обеспечивает их инструментами. Проект никогда не меняет SpecSheriff guidelines (§[2.6]). Он может расширить их собственными правилами, если ему это нужно (§[2.5]). Базовую спецификацию и техническое приложение пишут с помощью SpecSheriff. Вместе с guidelines они образуют спецификацию реализуемой системы.");
n.reason = swapFirst(n.reason, "The SpecSheriff guidelines are the same in every project that works by SpecSheriff, so its tools can hold them. A project's own rules, its base specification and its technical appendix differ from one project to the next.");
n.ruReason = swapFirst(n.ruReason, "SpecSheriff guidelines одинаковы в каждом проекте, который работает по SpecSheriff, поэтому их могут держать его инструменты. Собственные правила проекта, его базовая спецификация и техническое приложение у каждого проекта свои.");
n.changes[2] = "Первый абзац текста новый, по вашим комментариям: guidelines описывает SpecSheriff и обеспечивает инструментами; SpecSheriff guidelines проект не меняет, но может расширить собственными правилами, если ему это нужно; база и приложение пишутся с помощью SpecSheriff и вместе с guidelines образуют спецификацию реализуемой системы. Подробности — в 2.5 и 2.6, на них ведут ссылки.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");

// The page: 1.1.3 highlights 2.5 and 2.6.
const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
const i = lines.findIndex(l => l.trim().startsWith('["1.1.3",'));
const t = lines[i].trim();
const row = JSON.parse(t.endsWith(",") ? t.slice(0, -1) : t);
row[8] = ["2.5", "2.6"];
lines[i] = lines[i].slice(0, lines[i].indexOf("[")) + JSON.stringify(row) + (t.endsWith(",") ? "," : "");
fs.writeFileSync(page, lines.join("\n"));
console.log(n.text.split("\n\n")[0], "\n---\n", n.reason.split("\n\n")[0]);
