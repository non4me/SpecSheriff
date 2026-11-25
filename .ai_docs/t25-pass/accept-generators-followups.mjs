// The owner accepted on 2026-11-18 («ок») the follow-up proposals of propose-generators-followups.mjs: 10.12, 10.2 and
// 1.6.1 are accepted with accept-proposal.mjs; this script accepts the proposal for row 66 of table 10.1 (10.1.44) and
// fixes the English of the agreed 10.9 as EngStickler's readers reported, without changing its meaning.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const tableFile = new URL("table-10-1.json", here);
fs.copyFileSync(tableFile, new URL("table-10-1.before-accept-66.json", here));
const t = JSON.parse(fs.readFileSync(tableFile, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.n === 66);
if (!r || !r.proposal) throw new Error("row 66 has no proposal");
r.en = r.proposal.en;
r.ru = r.proposal.ru;
delete r.proposal;
r.change = `${r.change ?? ""} 18 ноября вы приняли правку («ок»): «и генераторов» возвращено, потому что генераторы проекта снова в guidelines (10.9).`.trim();
r.agreed = "2026-11-18";
fs.writeFileSync(tableFile, JSON.stringify(t, null, 2) + "\n");

const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-10-9-en.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.9"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", "the code the generator wrote stays as it is.", "the code the generator has written stays as it is.");
swap("reason", "such as code in another language or from nodes of its own kinds.", "such as code in another language, or code generated from nodes of the project's own kinds.");
n.changes.push("Только английский текст, по замечаниям читателей: «has written», «or code generated from nodes of the project's own kinds». Смысл и русский текст не изменились.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
