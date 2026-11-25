// Node 12.3.1: the owner asked whether the value selecting a RecordType variant can stand outside the domain the paragraph
// opens with (2026-11-14). Under the approved nodes it can in one real case: a shared data structure in the contracts
// section whose field of type `one of` takes the values the domains add (current 1.28); each domain declares its value and
// the variant that value selects (1.26, 1.32). Where the field's values are listed in a domain's own RecordType, the
// variant stays in that domain and the exception added nothing. So the exception now names that one case. The rarer case
// of 1.32, values that are the names of domains or the sids of nodes, lets other domains extend one domain's format, which
// goes against the owner's ruling that a format has one owner; it is to be narrowed when 1.32 is reviewed.
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
  "- a RecordType variant is declared where the value that selects it is declared (§s-z3dnru6qqdf9m6j).",
  "- a variant of a shared data structure, selected by a value that a domain adds, is declared in that domain (§s-z3dnru6qqdf9m6j).",
);
p.ru = swap(
  p.ru,
  "- вариант RecordType объявляется там, где объявлено значение, которое его выбирает (§s-z3dnru6qqdf9m6j).",
  "- вариант общей структуры данных, который выбирает значение, добавленное доменом, объявляется в этом домене (§s-z3dnru6qqdf9m6j).",
);
p.why = "See fix-newform-282.mjs to fix-newform-288.mjs.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("12.3.1: the variant exception narrowed");
