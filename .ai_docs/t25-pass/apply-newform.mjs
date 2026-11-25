// Puts the drafts of newform.json on the structure page: each drafted node shows its new title, its
// new text in English and Russian, and, folded, its reason and what changed against the present node.
// "=X.Y" in a draft stands for the present node X.Y's field: English from spec.json, Russian from
// full-ru.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = p => fs.readFileSync(new URL(p, here), "utf8");
const spec = JSON.parse(read("../../specs/_guidelines/spec.json"));
const ru = JSON.parse(read("full-ru.json"));
const drafts = JSON.parse(read("newform.json"));

const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);

const resolve = (value, field, lang) => {
  if (typeof value !== "string" || !value.startsWith("=")) return value;
  const from = value.slice(1);
  if (lang === "en") return present[from][field];
  const r = ru[from];
  if (!r) throw new Error(`no Russian for ${from}.${field}`);
  return field === "text" ? r.text : r.reason;
};

const resolved = {};
for (const [n, d] of Object.entries(drafts)) {
  resolved[n] = {
    from: d.from,
    sid: d.sid,
    title: resolve(d.title, "title", "en"),
    text: resolve(d.text, "text", "en"),
    reason: resolve(d.reason, "reason", "en"),
    ruTitle: d.ruTitle,
    ruText: resolve(d.ruText, "text", "ru"),
    ruReason: resolve(d.ruReason, "reason", "ru"),
    examples: d.examples,
    ruExamples: d.ruExamples,
    proposals: d.proposals,
    table: d.table,
    // A `TextRule.list`: "=X.Y" stands for the present node's list, and the Russian one is written in the draft.
    list: typeof d.list === "string" && d.list.startsWith("=") ? present[d.list.slice(1)].list : d.list,
    ruList: d.ruList,
    changes: d.changes,
    agreed: d.agreed,
    sid: d.sid,
    sidValue: d.sidValue,
  };
}
// The sid of every present node by its location, so the page can name what a citation points at.
const presentSid = Object.fromEntries(Object.entries(present).map(([loc, n]) => [loc, n.sid]));

const path = new URL("base-structure.html", here);
let h = fs.readFileSync(path, "utf8");
const marker = "  const label = {";
h = h.replace(/\n  \/\/ The drafted nodes in their new form[^\n]*\n  const drafted = [^\n]*\n(  const presentSid = [^\n]*\n)?/, "\n");
h = h.replace(marker, "  // The drafted nodes in their new form, from newform.json.\n  const drafted = " + JSON.stringify(resolved) + ";\n  const presentSid = " + JSON.stringify(presentSid) + ";\n" + marker);
fs.writeFileSync(path, h);
console.log("drafted nodes on the page:", Object.keys(resolved).join(" "));
