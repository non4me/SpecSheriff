// Records in tools-drafts.json, as the field `assessment` of each node of group 1, the reviewer's «Оценка» from the
// latest review that judged the node ready, as group1-assessments.json holds it: { source, verdict, lines, note }.
// `lines` is null where no review that judged the node ready gave an «Оценка»; `note` then says why. gen-group1-page.mjs
// reads the field. Run it again after a new review is added to group1-assessments.json. Usage: node assess-group1.mjs
import fs from "node:fs";

const url = new URL("tools-drafts.json", import.meta.url);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const assessments = JSON.parse(fs.readFileSync(new URL("group1-assessments.json", import.meta.url), "utf8"));
const CRITERIA = ["согласованность", "целостность", "целесообразность", "избыточность", "недостаточность"];
let missing = 0;
for (const [key, a] of Object.entries(assessments)) {
  if (!drafts[key]) throw new Error(`no draft ${key}`);
  if (a.lines) for (const c of CRITERIA) if (typeof a.lines[c] !== "string") throw new Error(`${key}: no line for ${c}`);
  drafts[key].assessment = { source: a.source ?? null, verdict: a.verdict ?? null, lines: a.lines ?? null, note: a.note ?? "" };
  if (!a.lines) missing++;
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`assessment recorded for ${Object.keys(assessments).length} keys; ${missing} without an «Оценка»`);
