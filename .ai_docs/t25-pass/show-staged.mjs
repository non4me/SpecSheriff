// Prints the nodes of the staged new form (moved/specs/) with the given sids or locations: location, kind, title, text,
// reason, list and outgoing links. Usage: node show-staged.mjs <sid or location>...
import fs from "node:fs";
import path from "node:path";

const root = new URL("moved/specs/", import.meta.url);
const files = [];
const walkDir = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (e.name.endsWith(".json") && !p.includes("_schema")) files.push(p);
  }
};
walkDir(new URL(root).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const all = [];
const walk = (nodes, file) => {
  for (const n of nodes ?? []) {
    all.push({ n, file });
    walk(n.children, file);
    for (const row of n.rows ?? []) for (const cell of Object.values(row.cells ?? row)) if (cell && typeof cell === "object" && cell.sid) all.push({ n: cell, file });
  }
};
for (const f of files) walk(JSON.parse(fs.readFileSync(f, "utf8")).nodes, path.basename(path.dirname(f)) + "/" + path.basename(f));
for (const want of process.argv.slice(2)) {
  const hit = all.filter(({ n }) => n.sid === want || n.location === want || n.location?.endsWith("/" + want));
  if (!hit.length) console.log(`== ${want}: not found`);
  for (const { n, file } of hit) {
    console.log(`== ${n.sid} ${n.location} [${n.kind}] ${n.title ?? ""} (${file})`);
    if (n.text) console.log("TEXT:", n.text);
    if (n.reason) console.log("REASON:", n.reason);
    if (n.list) console.log("LIST:", JSON.stringify(n.list));
    const out = (n.refs ?? []).filter((r) => r.to).map((r) => `${r.type}->${r.to}`);
    if (out.length) console.log("REFS:", out.join(", "));
  }
}
