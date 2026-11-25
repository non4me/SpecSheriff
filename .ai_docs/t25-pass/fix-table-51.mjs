// Check 10.1.11 takes a simpler wording (the owner, 2026-11-13: «ок - хотя последнее предложение возможно избыточно»): the
// main case first, the exceptions apart, the nodes of the guidelines left out in a sentence of their own. The agreement
// of the check is asked for separately.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.11");
r.en =
  "A removed node that was ever approved is in the archive with the reason for its removal. A section, and a node that was never approved, are deleted outright and do not go to the archive. The check leaves out the nodes of the SpecSheriff guidelines that a project uses";
r.ru =
  "Удалённый узел, которому когда-либо давали одобрение, находится в архиве вместе с причиной удаления. Раздел и узел, которому одобрения не давали, удаляются окончательно и в архив не попадают. Узлы SpecSheriff guidelines, которые использует проект, эта проверка не затрагивает";
r.change =
  "Проще, по вашему вопросу (2026-11-13): главное первым, исключения отдельно. Коммит не действующее лицо; заголовок домена ушёл в расширение «Домены». " +
  "Смысл согласованного 2.5 сохранён: в архив идёт узел, которому одобрение давали хоть раз, а не только одобренный в момент удаления.";
delete r.proposals;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.ru);
