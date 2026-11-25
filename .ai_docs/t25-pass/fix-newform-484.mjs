// Corrects the English of the agreed 12.1, 12.4, 12.12, 12.5 and 12.6 after EngStickler's reader read it (2026-11-18).
// Only the English changes; each change keeps the meaning of the agreed Russian. "refuses" stays, as the guidelines use it
// for every refusal.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-484.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const r = [
  ["12.1", "text", "Other parts of the system may use that data, whole or in part.", "Other parts of the system may use that data in whole or in part."],
  ["12.4", "reason", "the parts that read the data lose the field's value without notice.", "the parts that read the data silently lose the field's value."],
  ["12.12", "reason", "would tie to that part every RecordType that uses the fragment.", "would tie every RecordType that uses the fragment to that part."],
  ["12.5", "examples", "That service's answer may leave out", "That service's response may leave out"],
  ["12.6", "text", "are the fields that select the RecordType variant.", "are the fields that select a RecordType variant."],
  ["12.6", "text", "one value of each field that selects the RecordType variant.", "one value of each field that selects a RecordType variant."],
];
const log = [];
for (const [k, field, a, b] of r) {
  const v = JSON.stringify(d[k][field]);
  const ja = JSON.stringify(a).slice(1, -1);
  if (!v.includes(ja)) { console.log(`MISSING in ${k}.${field}: ${a.slice(0, 50)}`); continue; }
  d[k][field] = JSON.parse(v.split(ja).join(JSON.stringify(b).slice(1, -1)));
  log.push({ phrase: a, correction: b, kind: "collocation", file: ".ai_docs/t25-pass/newform.json", check: "fast" });
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
fs.writeFileSync("C:/Users/PC/AppData/Local/Temp/claude/a0dc34c442b04427/8f0be46b-7277-4ad8-b267-fd1304189f4b/scratchpad/log-12.json", JSON.stringify(log));
console.log("ok " + log.length);
