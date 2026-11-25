// The owner of 2026-11-12 on check 10.1.2: the archive may hold a node in a format an earlier release wrote, which the
// present schema refuses, so the check does not reach the archive; the link to 2.5 and its reason go with it. What the
// tools read from the archive — a node's sid and the reason for its removal — stays checked by 10.1.3 and 10.1.11.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.en = "Every file of the specification matches the schema of the specification. A project's extension of the schema changes no definition the schema of the SpecSheriff guidelines holds";
r.ru = "Каждый файл спецификации соответствует схеме спецификации. Расширение схемы, которое делает проект, не меняет ни одного определения схемы SpecSheriff guidelines";
r.rests = r.rests.filter((s) => s !== "s-f2b5zvc565s242f");
delete r.reason;
delete r.ruReason;
r.noReason = "Своего обоснования нет: зачем эта проверка, говорит обоснование согласованного 5.1, которое она охраняет, — оно показано ниже.";
r.change =
  "Было «Every file matches its schema». Теперь сказано, чья схема: «the schema of the specification», то есть схема SpecSheriff guidelines вместе с расширением проекта (5.1). " +
  "Добавлено предложение о расширении: проверка охраняет и 5.2, а текст о нём молчал. " +
  "Архив не упоминается, по вашему решению: в нём может лежать узел в формате прежнего выпуска, который нынешняя схема отклонит. То, что инструменты читают из архива, — sid узла и причину удаления — проверяют 10.1.3 и 10.1.11.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.en);
