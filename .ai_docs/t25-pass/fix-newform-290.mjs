// Node 12.3.1: the owner sees a shared data structure as a mixin, a common template that each domain reuses when it needs
// to: the template is in the contracts section and the formats reusing it are in the domains (2026-11-14). The node's
// schema already allows two kinds of reuse: a field whose type is the shared structure, and an extension, a RecordType
// that refines another without being its variant, inheriting all its fields and adding its own. The exception named only
// the first ("contain"), so it now names both. A domain's format that extends the template is a RecordType of that domain,
// which the main rule already places in the domain.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["12.3.1"].proposals[0];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
p.en = swap(
  p.en,
  "a data structure that is only ever part of a record and that the RecordTypes of several domains contain, such as an address:",
  "a data structure that is only ever part of a record and that the RecordTypes of several domains reuse, as a field's type or by extending it, such as an address:",
);
p.ru = swap(
  p.ru,
  "структура данных, которая бывает только частью записи данных и входит в RecordType нескольких доменов, например адрес:",
  "структура данных, которая бывает только частью записи данных и которую переиспользуют RecordType нескольких доменов — как тип поля или расширяя её, — например адрес:",
);
p.why = "See fix-newform-282.mjs to fix-newform-290.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru.split("\n\n")[2]);
