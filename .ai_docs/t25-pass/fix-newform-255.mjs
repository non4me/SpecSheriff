// Draft 10.7: the reviewer's fixes (2026-11-14). The opening no longer says that a project's check is held to all that the
// checks of the table are held to, which was untrue: the table also holds the review and the tests. The item on when the
// check runs goes, since node 10.2 already runs check 10.1.37 at those moments. "Refining this one" comes back from the
// approved node. "What its failure costs" goes, since the default is to refuse. The reason names the fields a kind adds
// (8.4) and no longer restates the list.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.7"];
n.text =
  "A project's own guidelines may add checks to those of the table of checks (§s-jau82aq9juv9zzh). " +
  "A rule of the project's own guidelines refining this one lists them, with what each checks. Each such check:\n" +
  "- gives the same answer for the same change;\n" +
  "- refuses the change where it fails, unless the rule listing it says that its failure is only reported.";
n.ruText =
  "Собственные guidelines проекта могут добавлять проверки к тем, что перечислены в таблице проверок (§s-jau82aq9juv9zzh). " +
  "Правило собственных guidelines проекта, уточняющее это правило, перечисляет их вместе с тем, что проверяет каждая. Каждая такая проверка:\n" +
  "- на одно и то же изменение даёт один и тот же ответ;\n" +
  "- не пройдя, отклоняет изменение, если правило, которое её перечисляет, не говорит, что о её непрохождении только сообщается.";
n.reason =
  "A project's own kinds of node, and the fields they add, set requirements that no check of the SpecSheriff guidelines knows. " +
  "Run with the shared checks, a project's check binds every participant, rather than depending on whoever remembers to run it.";
n.ruReason =
  "Собственные типы узлов проекта и поля, которые они добавляют, задают требования, которых не знает ни одна проверка SpecSheriff guidelines. " +
  "Запущенная вместе с общими проверками, проверка проекта действует на каждого участника, а не зависит от того, кто не забудет её запустить.";
n.changes.push(
  "По рецензенту: начало больше не говорит, что к проверке проекта предъявляется всё, что к проверкам таблицы, — это было неверно, в таблице есть и рецензия, и тесты. Пункт о моментах запуска ушёл: их задаёт 10.2 через проверку 10.1.37.",
  "По рецензенту: вернулось «уточняющее это правило» из одобренного 5.5; ушло «цена непрохождения», потому что по умолчанию проверка отклоняет. В обосновании — поля, которые добавляет тип узла (8.4); пересказ списка и третье предложение ушли.",
);
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.7 updated");
