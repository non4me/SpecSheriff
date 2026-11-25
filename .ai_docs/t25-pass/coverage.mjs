// For each present node named on the command line: every sentence of its text and reason, and how many
// times it appears verbatim in the drafts of newform.json that come from it. A sentence found zero or
// more than one times is printed; so is every sentence of a draft not found in its present node.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const drafts = JSON.parse(fs.readFileSync(new URL("newform.json", here), "utf8"));
const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);

const field = (v, f) => (typeof v === "string" && v.startsWith("=") ? present[v.slice(1)][f] : v);
const sentences = s => s.split(/\n+|(?<=[.:;])\s+(?=[A-Z-])/).map(x => x.trim()).filter(Boolean);

for (const o of process.argv.slice(2)) {
  const parts = Object.entries(drafts).filter(([, d]) => d.from === o);
  const body = parts.map(([, d]) => [field(d.text, "text"), field(d.reason, "reason")].join("\n")).join("\n");
  const own = [present[o].text, present[o].reason].join("\n");
  const lines = [];
  for (const s of sentences(own)) {
    const c = body.split(s).length - 1;
    if (c !== 1) lines.push(`  ${c}x old: ${s}`);
  }
  for (const [n, d] of parts)
    for (const s of sentences([field(d.text, "text"), field(d.reason, "reason")].join("\n")))
      if (!own.includes(s)) lines.push(`  new in ${n}: ${s}`);
  console.log(`${o} -> ${parts.map(([n]) => n).join(", ")}${lines.length ? "\n" + lines.join("\n") : "  ok"}`);
}
