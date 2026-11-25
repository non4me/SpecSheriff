// Check 10.1.27 after agreed node 10.6 (2026-11-13): the specification is approved, or returned to draft, by an entry
// of its own that one of its owners records; there is no intermediary rule any more. The final wording is the
// reviewer's (report on draft 10.6), shortened under node 7.17. Without its second sentence, anyone who deleted the latest
// entry would change the status. It now guards 10.6 alone: agreed 1.3.7 no longer names the intermediary rule.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.27");
r.rests = ["s-qzthyh7yqvfhsa2"];
r.about =
  "Затрагивает каждый коммит, который добавляет, удаляет или меняет запись о статусе одобрения спецификации. " +
  "От этого статуса зависит, насколько строго проверки применяются к коду и тестам (10.6). " +
  "Одобрить спецификацию или вернуть её в черновик может только её ответственный; запись называет его. " +
  "Без запрета удалять или менять записи любой изменил бы статус, удалив последнюю запись.";
r.todos = [
  "На шаге инструментов: тесты ниже проверяют прежний механизм — правило-посредник и его отзыв. Их переписать под запись о статусе одобрения спецификации, вместе с 7.2.3, approve.ts, binding.ts, approvals.ts и model.ts.",
];
r.proposals = [
  {
    en:
      "Each new entry about the specification's approval status names one of the specification's owners as the commit adding it lists them. " +
      "No commit removes or changes such an entry | refused",
    ru:
      "Каждая новая запись о статусе одобрения спецификации называет одного из ответственных за спецификацию, какими их указывает добавивший её коммит. " +
      "Ни один коммит не удаляет и не меняет такую запись | отклоняется",
    why:
      "По согласованному 10.6: спецификацию одобряет или возвращает в черновик отдельная запись её ответственного, правила-посредника нет. " +
      "Первое предложение проверяет, что запись сделал ответственный; второе не даёт изменить статус, удалив или поправив последнюю запись. " +
      "Формулировка ревьюера, укороченная по 7.17. Охраняет теперь только 10.6: в согласованном 1.3.7 правила-посредника больше нет.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].en);
