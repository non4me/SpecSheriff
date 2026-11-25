// The owner's comment of 2026-11-07 on 1.1.3's first sentence: the guidelines say how the
// specification is built and by which rules it is written; a project extends them but never
// changes the SpecSheriff guidelines, since the tools that check them would then work wrongly.
// The selected sentence gives way to the owner's; the tools stay named, since the reason speaks of
// them; the owner's ground opens the reason.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.3"];
if (n.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
const rest = s => s.split("\n\n").slice(1);

n.text = [
  "The guidelines say how the specification is built and by which rules it is written. SpecSheriff describes them and provides the tools that check they are kept.",
  "A project never changes the SpecSheriff guidelines (§[2.6]). It may extend them with rules of its own where it needs to (§[2.5]).",
  "The base specification and the technical appendix are written with the help of SpecSheriff. Together with the guidelines, they form the specification of the system being built.",
  ...rest(n.text),
].join("\n\n");
n.ruText = [
  "Guidelines говорят, как устроена спецификация и по каким правилам она создаётся. Их описывает SpecSheriff, и он же даёт инструменты, которые следят за их соблюдением.",
  "Проект никогда не меняет SpecSheriff guidelines (§[2.6]). Он может расширить их собственными правилами, если ему это нужно (§[2.5]).",
  "Базовую спецификацию и техническое приложение пишут с помощью SpecSheriff. Вместе с guidelines они образуют спецификацию реализуемой системы.",
  ...rest(n.ruText),
].join("\n\n");
n.reason = ["If a project changed a rule of the SpecSheriff guidelines, the tools that check the guidelines are kept would stop working correctly. A project's own rules, its base specification and its technical appendix differ from one project to the next.", ...rest(n.reason)].join("\n\n");
n.ruReason = ["Если проект поменяет правило SpecSheriff guidelines, инструменты, которые следят за соблюдением guidelines, перестанут работать корректно. Собственные правила проекта, его базовая спецификация и техническое приложение у каждого проекта свои.", ...rest(n.ruReason)].join("\n\n");
n.changes[2] = "Первые три абзаца текста новые, по вашим комментариям: что говорят guidelines и кто их описывает; что проект не меняет SpecSheriff guidelines, но может расширить их собственными правилами; что база и приложение пишутся с помощью SpecSheriff и вместе с guidelines образуют спецификацию реализуемой системы. Подробности — в 2.5 и 2.6, на них ведут ссылки.";
n.changes[3] = "Четвёртый абзац текста — абзац 2 нынешнего 1.13. Абзац 1 убран: что спецификация описывает систему, говорят 1.1.4 и 1.1.5. Поэтому «anything else» в первом пункте раскрыто: «anything but how the specification is kept, changed and implemented».";
n.changes[4] = "Обоснование — первый абзац новый, ваш довод: изменённое правило SpecSheriff guidelines сломало бы инструменты. Остальное — нынешнее обоснование 1.13, дословно.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "\n---\n", n.reason.split("\n\n")[0]);
