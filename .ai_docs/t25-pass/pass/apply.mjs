// Applies the accepted rewrites to the guidelines: for each changed node, its title, text and reason as the
// output gives them, its status draft, and a decision recording the rewrite in the owner's name. Writes
// applied.json: the sids changed, for `sheriff approve`, with their old and new wording for the report.
// Usage: node apply.mjs <group> [<group>...]   Skips any sid listed in skip.json (held back for the owner).
import fs from "node:fs";
const dir = "D:/SpecSheriff/.ai_docs/t25-pass/pass";
const root = "D:/SpecSheriff/specs/_guidelines";
const skip = new Set(fs.existsSync(`${dir}/skip.json`) ? JSON.parse(fs.readFileSync(`${dir}/skip.json`, "utf8")) : []);
const rewrites = new Map();
for (const g of process.argv.slice(2)) {
  const output = JSON.parse(fs.readFileSync(`${dir}/${g}.out.json`, "utf8"));
  for (const [sid, o] of Object.entries(output)) if (o.changed && !skip.has(sid)) rewrites.set(sid, o);
}
const date = new Date().toISOString().slice(0, 10);
const decision = {
  date,
  problem: "The node was written before the rules of one thought to a sentence (s-juucyammgq4shq8) and of what is applied together (s-6j8ystpj2yzcchq), and before the names of the method were settled.",
  ruling: "In the owner's name, carrying out those rules and the names the owner settled on 2026-11-07: the wording rewritten, its meaning unchanged.",
  type: "textual",
};
const applied = fs.existsSync(`${dir}/applied.json`) ? JSON.parse(fs.readFileSync(`${dir}/applied.json`, "utf8")) : {};
for (const file of ["spec.json", "tools.json", "project.json"]) {
  const path = `${root}/${file}`;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  let touched = false;
  const walk = (n) => {
    const o = rewrites.get(n.sid);
    if (o) {
      applied[n.sid] = { location: n.location, old: { title: n.title, text: n.text, reason: n.reason }, new: { title: o.title, text: o.text, reason: o.reason } };
      n.title = o.title;
      n.text = o.text;
      if (o.reason !== undefined) n.reason = o.reason;
      n.status = "draft";
      n.meta ??= {};
      n.meta.decisions ??= [];
      n.meta.decisions.push(decision);
      touched = true;
    }
    (n.children || []).forEach(walk);
  };
  data.nodes.forEach(walk);
  if (touched) fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}
fs.writeFileSync(`${dir}/applied.json`, JSON.stringify(applied, null, 2) + "\n");
console.log(`applied ${rewrites.size} rewrites; ${Object.keys(applied).length} in applied.json`);
