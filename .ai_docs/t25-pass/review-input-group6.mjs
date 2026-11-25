// Writes, for each key given, the draft of group 6 as it would stand, beside the current node of tools.json, for specsheriff-rule-reviewer.
// A proposal that changes a wording the owner agreed to in an earlier group names that draft in `base`, and is shown beside that agreed wording.
// Usage: node review-input-group6.mjs <output.md> <draft key>...
import fs from "node:fs";

const [out, ...keys] = process.argv.slice(2);
const drafts = JSON.parse(fs.readFileSync(new URL("tools-drafts.json", import.meta.url), "utf8"));
// The current wording of a node is looked up in the appendix of the tools and in the new form of the guidelines and their extensions.
const sources = [
  "D:/SpecSheriff/specs/_guidelines/tools.json",
  "D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json",
  "D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json",
  "D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/recordtype.json",
  "D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/views.json",
];

const bySid = new Map();
const walk = (nodes) => nodes.forEach((n) => { if (!bySid.has(n.sid)) bySid.set(n.sid, n); walk(n.children || []); });
for (const file of sources) walk(JSON.parse(fs.readFileSync(file, "utf8")).nodes);

const wording = (p) => [`Title: ${p.title}`, "", ...p.parts.map((x) => x.en + "\n"), `Reason: ${p.reason || "(none)"}`, ""];
const lines = [`# Group 6 drafts for the review (generated ${new Date().toISOString()})`, ""];
for (const key of keys) {
  const d = drafts[key];
  if (!d) throw new Error(`no draft ${key}`);
  const p = d.proposal;
  lines.push(`## ${p.title} | key ${key} | sid ${d.sidValue} | ${d.location || "new"}`, "");
  lines.push("### Text", "", ...p.parts.map((x) => x.en + "\n"));
  lines.push("### Reason", "", p.reason || "(none)", "");
  if (p.examples?.length) lines.push("### Examples", "", "```json", JSON.stringify(p.examples, null, 2), "```", "");
  lines.push("### Outgoing links", "", "```json", JSON.stringify(p.refs || [], null, 2), "```", "");
  if (d.base) {
    const b = drafts[d.base]?.proposal;
    if (!b) throw new Error(`no draft ${d.base}`);
    lines.push(`### The wording the owner agreed to (${d.base})`, "", ...wording(b));
    continue;
  }
  const cur = bySid.get(d.sidValue);
  if (cur) lines.push("### The current node", "", `Title: ${cur.title}`, "", cur.text || "", "", `Reason: ${cur.reason || "(none)"}`, "");
  else lines.push("### The current node", "", "(none: this node is new)", "");
}
fs.writeFileSync(out, lines.join("\n"));
console.log(`${keys.length} drafts written to ${out}`);
