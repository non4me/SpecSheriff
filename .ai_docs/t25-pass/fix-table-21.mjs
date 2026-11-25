// The owner of 2026-11-12: no wording is changed by the agent; changes are proposed beside the approved words. Check
// 10.1.2 goes back to its approved wording, as spec.json holds it (5.1, committed in 0.6.0), and each change stands
// apart as a proposal for the owner to take or leave.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.en = "Every file matches its schema";
r.ru = "Каждый файл соответствует своей схеме";
r.cost = "refused";
r.ruCost = "отклоняется";
delete r.noReason;
r.change = "Одобренная формулировка, как она стоит в spec.json. Изменения ниже — только предложения.";
r.proposals = [
  {
    en: "Every file of the specification matches the schema of the specification",
    ru: "Каждый файл спецификации соответствует схеме спецификации",
    why: "«Every file» не говорит, файл чего, а «its schema» читается так, будто у каждого файла своя схема. Схема спецификации — это схема SpecSheriff guidelines вместе с расширением проекта (5.1).",
  },
  {
    en: "A project's extension of the schema changes no definition the schema of the SpecSheriff guidelines holds",
    ru: "Расширение схемы, которое делает проект, не меняет ни одного определения схемы SpecSheriff guidelines",
    why: "Добавить вторым предложением. Проверка охраняет и 5.2, и её реализация, узел 7.1.2, сначала сверяет расширение со схемой расширения, но текст строки о расширении молчит.",
  },
];
delete r.proposal;
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.en, "| proposals:", r.proposals.length);
