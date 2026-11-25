// Writes the nodes of the guidelines that hold wording (not sections) into group files for the pass:
// each entry is sid, location, kind, title, text, reason. Sections are left out: their title and text
// say what the section is for and are rewritten only where a group's agent is told so.
import fs from "node:fs";
const root = "D:/SpecSheriff/specs/_guidelines";
const out = "D:/SpecSheriff/.ai_docs/t25-pass/pass";
const SKIP = new Set(["s-juucyammgq4shq8", "s-6j8ystpj2yzcchq"]); // 6.3 and 6.4, written by these rules today
const groups = {};
const add = (g, n) => (groups[g] ??= []).push({ sid: n.sid, location: n.location, kind: n.kind, title: n.title, text: n.text, ...(n.reason ? { reason: n.reason } : {}) });
const groupOf = (file, loc) => {
  if (file === "project.json") return "g6-tools-8-20-project";
  if (file === "spec.json") {
    const m = loc.match(/spec\/(\d+)(?:\.(\d+))?/);
    if (!m) return "g5a-spec-2-4";
    const [s, r] = [Number(m[1]), Number(m[2] ?? 0)];
    if (s === 1) return r <= 20 ? "g1-spec-1a" : "g2-spec-1b";
    return s <= 4 ? "g5a-spec-2-4" : "g5b-spec-5-6";
  }
  const m = loc.match(/tools\/(\d+)/);
  const s = m ? Number(m[1]) : 0;
  if (s <= 6) return "g3-tools-1-6";
  if (s === 7) return "g4-tools-7";
  return "g6-tools-8-20-project";
};
for (const file of ["spec.json", "tools.json", "project.json"]) {
  const data = JSON.parse(fs.readFileSync(`${root}/${file}`, "utf8"));
  const walk = (n) => {
    if (n.kind !== "section" && n.kind !== "header" && !SKIP.has(n.sid)) add(groupOf(file, n.location), n);
    (n.children || []).forEach(walk);
  };
  data.nodes.forEach(walk);
}
for (const [g, nodes] of Object.entries(groups)) {
  fs.writeFileSync(`${out}/${g}.in.json`, JSON.stringify(nodes, null, 2) + "\n");
  const words = nodes.reduce((a, n) => a + `${n.text} ${n.reason ?? ""}`.split(/\s+/).length, 0);
  console.log(g, nodes.length, "nodes,", words, "words");
}
