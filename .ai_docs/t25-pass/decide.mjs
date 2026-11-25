// Appends a decision to the meta.decisions of the node with the given sid, in whichever guidelines file
// holds it, writing the file in the canonical form (JSON.stringify with two spaces and a final newline).
// Usage: node decide.mjs <sid> <type> <problem> <ruling>
import fs from "node:fs";
const [sid, type, problem, ruling] = process.argv.slice(2);
const files = ["spec.json", "tools.json", "project.json"].map((f) => `D:/SpecSheriff/specs/_guidelines/${f}`);
const date = new Date().toISOString().slice(0, 10);
let done = false;
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const walk = (n) => {
    if (n.sid === sid) {
      n.meta ??= {};
      n.meta.decisions ??= [];
      n.meta.decisions.push({ date, problem, ruling, type });
      done = true;
      return;
    }
    (n.children || []).forEach(walk);
  };
  data.nodes.forEach(walk);
  if (done) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    console.log(`decision added to ${sid} in ${file}`);
    break;
  }
}
if (!done) { console.error(`no node ${sid}`); process.exit(1); }
