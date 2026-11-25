// Compares each group's output with its input mechanically: every citation and backticked span kept (the
// renamed kind values allowed), the fields complete, and the sentences' lengths before and after.
// Usage: node verify.mjs <group> [<group>...]   (a group is the file name without .in.json / .out.json)
import fs from "node:fs";
const dir = "D:/SpecSheriff/.ai_docs/t25-pass/pass";
const RENAMED = { "`rule`": "`TextRule`", "`domain`": "`header`", "`recordType`": "`RecordType`" };
const sids = (t) => new Set(t.match(/§s-[a-z0-9]{15}/g) ?? []);
const ticks = (t) => new Set((t.match(/`[^`\n]+`/g) ?? []).map((x) => RENAMED[x] ?? x));
const sentences = (t) => t.replace(/`[^`]*`/g, "X").replace(/^\|.*$/gm, "").split(/(?<=[.:;])\s+(?=[A-Z`§*"“-])|\n+/).map((s) => s.trim()).filter(Boolean);
const long = (t) => sentences(t).filter((s) => s.split(/\s+/).length > 25).length;
let problems = 0;
for (const g of process.argv.slice(2)) {
  const input = JSON.parse(fs.readFileSync(`${dir}/${g}.in.json`, "utf8"));
  const output = JSON.parse(fs.readFileSync(`${dir}/${g}.out.json`, "utf8"));
  let changed = 0, before = 0, after = 0;
  for (const n of input) {
    const o = output[n.sid];
    if (!o) { console.log(`${g} ${n.sid} ${n.location}: missing from the output`); problems++; continue; }
    if (o.changed) changed++;
    const oldAll = `${n.title}\n${n.text}\n${n.reason ?? ""}`;
    const newAll = `${o.title}\n${o.text}\n${o.reason ?? ""}`;
    for (const s of sids(oldAll)) if (!newAll.includes(s)) { console.log(`${g} ${n.sid} ${n.location}: lost citation ${s}`); problems++; }
    for (const s of sids(newAll)) if (!oldAll.includes(s)) { console.log(`${g} ${n.sid} ${n.location}: new citation ${s}`); problems++; }
    const newTicks = ticks(newAll);
    for (const t of ticks(oldAll)) if (!newTicks.has(t) && !newAll.includes(t.slice(1, -1))) { console.log(`${g} ${n.sid} ${n.location}: lost code ${t}`); problems++; }
    if (!o.text) { console.log(`${g} ${n.sid}: no text`); problems++; }
    if (n.reason && !o.reason) { console.log(`${g} ${n.sid}: reason dropped`); problems++; }
    if (/;(?!\s*$)/m.test(o.text.replace(/`[^`]*`/g, ""))) console.log(`${g} ${n.sid} ${n.location}: a semicolon left in the text`);
    before += long(n.text) + long(n.reason ?? "");
    after += long(o.text) + long(o.reason ?? "");
  }
  const doubts = Object.values(output).reduce((a, o) => a + (o.doubts?.length ?? 0), 0);
  const splits = Object.values(output).filter((o) => o.split).length;
  console.log(`${g}: ${input.length} nodes, ${changed} changed, sentences over 25 words ${before} -> ${after}, doubts ${doubts}, splits ${splits}`);
}
console.log(problems ? `${problems} problems` : "no mechanical problem");
