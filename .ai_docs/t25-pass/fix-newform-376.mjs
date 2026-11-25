// Node 7.2.2, the proposal of fix-newform-375.mjs, after the wording checker. "the same rule" pointed back at a rule the
// reason's paragraph never named, so the reason now speaks of applying the node. "from the clauses" named no clauses of
// anything, and "themselves" carries the point: readers who are not shown the relations work them out on their own.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-376.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
const en = ["Readers who have to work out these relations from the clauses apply the same rule in different ways.", "Readers who have to work out these relations themselves apply the node in different ways."];
const ru = ["Читатели, которым приходится выводить эти связи из оборотов речи, применяют одно и то же правило по-разному.", "Читатели, которым приходится выводить эти связи самостоятельно, применяют узел по-разному."];
const p = d["7.2.2"].proposals[0];
p.en = swap(p.en, ...en);
p.ru = swap(p.ru, ...ru);
const t = d["7.2.2~"];
if (t) {
  t.reason = swap(t.reason, ...en);
  t.ruReason = swap(t.ruReason, ...ru);
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(p.en.split("Reason: ")[1]);
