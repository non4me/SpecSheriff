// The rule reviewer on check 10.1.2: "its schema" said not whose; no rule it guarded required the archive to match the
// schema, so it guards the rule on removal too, with a reason; it guards 5.2 but said nothing of the extension.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.2");
r.en = "Every file of the specification and of its archive matches the schema of the specification. A project's extension of the schema changes no definition the schema of the SpecSheriff guidelines holds";
r.ru = "Каждый файл спецификации и её архива соответствует схеме спецификации. Расширение схемы, которое делает проект, не меняет ни одного определения схемы SpecSheriff guidelines";
if (!r.rests.includes("s-f2b5zvc565s242f")) r.rests.push("s-f2b5zvc565s242f");
delete r.noReason;
r.reason = "The SpecSheriff tools read an archived node wherever a link names it, as every `supersedes` link does.";
r.ruReason = "Инструменты SpecSheriff читают архивный узел везде, где его называет связь, как его называет каждая связь `supersedes`.";
r.change =
  "Было «Every file matches its schema». Теперь: назван файл чего и схема чего — «the schema of the specification», то есть схема SpecSheriff guidelines вместе с расширением проекта (5.1); " +
  "добавлено предложение о расширении — проверка охраняет и 5.2, а текст о нём молчал; " +
  "добавлена связь checks на правило об удалении и архиве (§s-f2b5zvc565s242f) и обоснование, зачем архив тоже сверяется со схемой: ни одно правило, которое проверка охраняла, этого не требовало.";
const ru = t.toolsRu["s-xzcw3hv4hmxz7h7"];
const swap = (k, a, b) => { if (ru[k].split(a).length < 2) throw new Error(`${k}: ${a}`); ru[k] = ru[k].split(a).join(b); };
swap("text", "его NodeKind — в типы, которые может иметь узел", "его NodeKind — в NodeKind, которые может иметь узел");
swap("reason", "из всех остальных", "из всех файлов");
swap("reason", "отвергает", "отклоняет");
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.en);
