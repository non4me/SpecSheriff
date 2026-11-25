// Replaces the stale name NodeKind in the English of row 12.12.13 with the name the owner gave on 2026-11-10, as 12.8
// says it, and refreshes the gathered English for EngStickler's thorough reader.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const tFile = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(tFile, "utf8"));
const r = t.tables[0].rows.find((x) => x.num === "12.12.13");
r.en = "A field whose values are the sids of the nodes of one of the project's own kinds names a kind that exists";
r.change += " Только английский текст: «NodeKind» заменено на «one of the project's own kinds» — имя, которое вы дали 10 ноября вместо NodeKind, как в 12.8.";
fs.writeFileSync(tFile, JSON.stringify(t, null, 2) + "\n");

const mdFile = new URL("english-12-12.md", here);
const md = fs.readFileSync(mdFile, "utf8").replace(/- 12\.12\.13: .*/, `- 12.12.13: ${r.en}`);
fs.writeFileSync(mdFile, md);
console.log(r.en);
