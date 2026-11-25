// Node 10.5: the owner accepted the wording of fix-newform-253.mjs (2026-11-14, «ок»). Draft 10.7 is written from current
// node 5.5 (s-2fau85dfyyeq66m), a project's own checks, and keeps its sid. Following the owner's rule "A reference backs a
// statement and never makes it", the items say in plain words what a project's check is held to, instead of "all that
// §s-jau82aq9juv9zzh says of a check". "NodeKinds" becomes "kinds of node", as the owner decided on 10 November.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["10.5"];
a.agreed = "2026-11-14";
a.changes.push("Вы приняли эту формулировку (2026-11-14).");

if (d["10.7"]) throw new Error("draft 10.7 exists");
d["10.7"] = {
  from: "5.5",
  sid: "kept",
  title: "A project's own checks join the shared ones",
  ruTitle: "Собственные проверки проекта присоединяются к общим",
  text:
    "A project's own guidelines may add checks of their own. A rule of the project's own guidelines lists them, with what each checks and what its failure costs. " +
    "Each such check is held to what the checks of the table of checks (§s-jau82aq9juv9zzh) are held to:\n" +
    "- it gives the same answer for the same change;\n" +
    "- it runs at the same moments as those checks (§s-epaw9sgyaajzn8g);\n" +
    "- it refuses unless the rule listing it says that it only reports.",
  ruText:
    "Собственные guidelines проекта могут добавлять свои проверки. Правило собственных guidelines проекта перечисляет их вместе с тем, что проверяет каждая, и ценой её непрохождения. " +
    "К каждой такой проверке предъявляются те же требования, что и к проверкам таблицы проверок (§s-jau82aq9juv9zzh):\n" +
    "- на одно и то же изменение она даёт один и тот же ответ;\n" +
    "- она запускается в те же моменты, что и эти проверки (§s-epaw9sgyaajzn8g);\n" +
    "- она отклоняет, если правило, которое её перечисляет, не говорит, что она только сообщает.",
  reason:
    "A project's own kinds of node and properties set requirements that no check of the SpecSheriff guidelines knows. " +
    "Run with the shared checks and held to what they are held to, a project's check binds every participant, rather than depending on whoever remembers to run it. " +
    "Listed in one rule, everything the project adds to whether a commit goes through can be found in one place.",
  ruReason:
    "Собственные типы узлов и свойства проекта задают требования, которых не знает ни одна проверка SpecSheriff guidelines. " +
    "Запущенная вместе с общими проверками и подчинённая тем же требованиям, проверка проекта действует на каждого участника, а не зависит от того, кто не забудет её запустить. " +
    "Перечисленное в одном правиле, всё, что проект добавляет к тому, пройдёт ли коммит, видно в одном месте.",
  changes: [
    "Из нынешнего 5.5, sid сохраняется. Пункты своими словами говорят, каким требованиям подчиняется проверка проекта, вместо «всему, что §s-jau82aq9juv9zzh говорит о проверке» — по вашему правилу «ссылка подкрепляет утверждение, но не заменяет его».",
    "«NodeKind» стал «типом узла», по вашему решению от 10 ноября. Обоснование сокращено (7.14); ушла ссылка на то, кто одобряет цену, — это говорит правило, которое перечисляет проверки.",
  ],
  sidValue: "s-2fau85dfyyeq66m",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.5 agreed; draft 10.7 written");
