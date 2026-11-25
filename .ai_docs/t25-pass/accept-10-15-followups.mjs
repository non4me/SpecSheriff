// The owner accepted on 2026-11-18 («ок») the follow-up proposals of propose-10-15-followups.mjs. 10.14 is accepted with
// accept-proposal.mjs; this script accepts rows 60 and 61 of table 10.1 and fixes the English of the agreed 10.15 as
// EngStickler's readers reported, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const tableFile = new URL("table-10-1.json", here);
fs.copyFileSync(tableFile, new URL("table-10-1.before-accept-60-61.json", here));
const t = JSON.parse(fs.readFileSync(tableFile, "utf8"));
for (const r of t.tables.flatMap((g) => g.rows)) {
  if (r.n !== 60 && r.n !== 61) continue;
  if (!r.proposal) throw new Error(`row ${r.n} has no proposal`);
  r.en = r.proposal.en;
  r.ru = r.proposal.ru;
  delete r.proposal;
  r.change = `${r.change ?? ""} 18 ноября вы приняли правку по 10.15 («ок»).`.trim();
  r.agreed = "2026-11-18";
}
fs.writeFileSync(tableFile, JSON.stringify(t, null, 2) + "\n");

const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-10-15-en.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.15"];
const swap = (field, from, to) => {
  const v = n[field];
  if (Array.isArray(v)) {
    const i = v.findIndex((x) => x.includes(from));
    if (i < 0) throw new Error(`${field}: not found: ${from}`);
    v[i] = v[i].replace(from, to);
  } else {
    if (!v.includes(from)) throw new Error(`${field}: not found: ${from}`);
    n[field] = v.replace(from, to);
  }
};
swap("text", "nothing is generated from the first node either, and the SpecSheriff tools report it by its sid.", "nothing is generated from the dependent node either, and the SpecSheriff tools report the dependent node by its sid.");
swap("examples", "Two data formats are generated into one file of types.", "The types of two data formats are generated into one file.");
swap("examples", "regenerated from its new wording at once,", "regenerated from its new wording immediately,");
swap("reason", "A file of generated code often comes from many nodes, some of them drafts. The rule lets that file take in every approval at once,", "A generated file often comes from many nodes, some of them drafts. The rule lets that file be regenerated as soon as each approval is given,");
swap("reason", "Code generated from a node that relies on an unapproved node would implement that node as well.", "Code generated from a node that relies on a node that has never been approved would implement the latter as well.");
n.changes.push("Только английский текст, по замечаниям читателей: «the dependent node», «the types of two data formats», «immediately», «a generated file», «be regenerated as soon as each approval is given», «a node that has never been approved». Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
