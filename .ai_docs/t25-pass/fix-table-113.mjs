// Check 10.1.34: the owner rejected "match the SpecTags" (2026-11-13: «они не соответствуют, они содержат ссылки на файлы
// с кодом и тестами, которые реализуют данное правило … эти узлы должны содержать только те ссылки, которые имеют спецтег,
// использованный внутри файлов»). The new wording says what the lists hold: references to the files whose code or tests
// carry the node's SpecTag, all of them and no others.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.34");
r.proposals = [
  {
    en:
      "A node's `meta.code` refers to every file of code that holds the node's SpecTag, and to no other file. " +
      "Its `meta.tests` refers to every file of tests that holds a test with the node's SpecTag, and to no other file | refused",
    ru:
      "`meta.code` узла ссылается на все файлы кода, где есть SpecTag этого узла, и ни на какие другие. " +
      "`meta.tests` узла ссылается на все файлы тестов, где есть тест с его SpecTag, и ни на какие другие | отклоняется",
    why:
      "По вашему замечанию: списки не «соответствуют», а содержат ссылки на файлы кода и тестов, которые реализуют правило. " +
      "«На все … и ни на какие другие» — проверка ловит и пропущенный файл, и лишний.",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "|", r.proposals[0].ru);
