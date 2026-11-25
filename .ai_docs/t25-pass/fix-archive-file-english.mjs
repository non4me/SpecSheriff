// Applies the corrections that EngStickler's reader found in the English of the agreed node "Validation of a file of
// the archive", none of which changes its meaning, keeps the Russian rendering in step, and rewrites
// english-archive-file.md. "every other property", "in any form" and "leaves every file unchanged" are kept, as the
// agreed node on validation against the schema uses the last.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-archive-file-english.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const node = drafts["new:tools-7-1-archive-file"];
const p = node.proposal;
const set = (start, en, ru) => {
  const x = p.parts.find((y) => y.en.startsWith(start));
  if (!x) throw new Error(`no part starts with: ${start}`);
  x.en = en;
  x.ru = ru;
};
set("`sheriff validate` and `sheriff reindex` validate each file of the archive",
  "`sheriff validate` and `sheriff reindex` validate each file of the archive only against `archive-file.schema.json` (§s-zefk589ykh37b8u). They do so at the same points at which they validate the files of the specification. `sheriff reindex` does so after it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts).",
  "`sheriff validate` и `sheriff reindex` проверяют каждый файл архива только по `archive-file.schema.json` (§s-zefk589ykh37b8u). Они делают это в те же моменты, в какие проверяют файлы спецификации. `sheriff reindex` делает это после того, как изменил то, что записал прежний выпуск (§s-f5rz6b7dhxejjts).");
set("That schema requires only the following of a node of the archive:",
  "The only things that schema requires of a node of the archive are the following:",
  "Эта схема требует от узла архива только следующего:");
set("a location (§s-kag2m9tzdnduxdx) and a kind;",
  "it has a location (§s-kag2m9tzdnduxdx) and a kind;",
  "у него есть расположение (§s-kag2m9tzdnduxdx) и тип узла;");
set("an `archived` field that gives",
  "it has an `archived` field that holds the date of the removal and the reason for it, and may also hold the sid of the node that replaced it (§s-f2b5zvc565s242f);",
  "у него есть поле `archived`, которое хранит дату удаления и его причину и может также хранить sid узла, который его заменил (§s-f2b5zvc565s242f);");
set("that it holds no sid",
  "it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz).",
  "у него нет sid, нет узлов под ним и нет связей, указывающих на него (§s-bpdqd9v72wg7vsz).");
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.reason = "Each SpecSheriff tool that reads the archive relies on the structure of the nodes it reads. A schema limited to that structure checks it while admitting a node that an earlier release archived.";
p.ruReason = "Каждый инструмент SpecSheriff, который читает архив, опирается на структуру узлов, которые читает. Схема, ограниченная этой структурой, проверяет её и при этом допускает узел, который отправил в архив прежний выпуск.";
node.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by fix-archive-file-english.mjs; \"every other property\", \"in any form\" and \"leaves every file unchanged\" kept";
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-archive-file.md", here), [
  "# \"Validation of a file of the archive\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));

const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replace("fix-batch-35.mjs applies EngStickler's thirty-fifth batch", "fix-archive-file-english.mjs does the same for \"Validation of a file of the archive\", and tools-drafts.before-archive-file-english.json is tools-drafts.json as it was before that script ran. fix-batch-35.mjs applies EngStickler's thirty-fifth batch");
fs.writeFileSync(index, s);
console.log(p.text + "\n\n" + p.reason);
