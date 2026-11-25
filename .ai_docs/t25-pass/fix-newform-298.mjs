// Node 12.3.1: the owner noticed (2026-11-14) that paragraph 3 repeated the first sentence of paragraph 2: data in one format
// has one RecordType, so a domain that changes only the values keeps the RecordType, and one that changes the format has
// data in another format, with a RecordType of its own. Paragraph 2 also places that RecordType in the domain where the
// data first appears. So paragraph 3 goes, and its one statement that nothing else makes, that RecordType names are unique
// across the specification, moves to the end of paragraph 2.
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
  "and any domain may reuse them.\n\nA domain may offer data it has taken from another domain. If it changes only the values in that data, the data keeps its RecordType. If it changes the format, the domain declares a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "and any domain may reuse them. RecordType names are unique across the specification.",
);
p.ru = swap(
  p.ru,
  "и их может переиспользовать любой домен.\n\nДомен может предлагать дальше данные, взятые у другого домена. Если он меняет в них только значения, у данных остаётся их RecordType. Если он меняет формат, он объявляет свой RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "и их может переиспользовать любой домен. Имена RecordType уникальны во всей спецификации.",
);
p.why = "See fix-newform-282.mjs to fix-newform-298.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.ru);
