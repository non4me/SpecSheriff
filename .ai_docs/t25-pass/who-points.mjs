// For each present location named on the command line: the sentences of the guidelines that cite its
// sid, the links pointing at it, and the files outside specs/ that name the sid (tests, code, docs).
import fs from "node:fs";
import path from "node:path";

const root = new URL("../../", import.meta.url);
const rootDir = decodeURIComponent(root.pathname).replace(/^\/([A-Za-z]:)/, "$1");
const files = ["spec", "tools", "project"];
const all = {};
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(path.join(rootDir, "specs/_guidelines", f + ".json"), "utf8"));
  (function walk(ns) {
    for (const n of ns) {
      all[n.sid] = { ...n, file: f };
      if (n.children) walk(n.children);
    }
  })(data.nodes);
}
const bySpecLoc = {};
for (const n of Object.values(all)) if (n.file === "spec") bySpecLoc[n.location.replace("_guidelines/spec/", "")] = n;

const outside = [];
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "specs", ".ai_docs", "dist", "_promo"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (/\.(ts|js|mjs|py|md|json)$/.test(e.name)) outside.push(p);
  }
})(rootDir);
const texts = Object.fromEntries(outside.map(p => [p, fs.readFileSync(p, "utf8")]));

const loc = n => `${n.file}/${n.location.split("/").pop()}`;
for (const l of process.argv.slice(2)) {
  const node = bySpecLoc[l];
  const sid = node.sid;
  console.log(`\n=== ${l} ${sid} ${node.title}`);
  for (const r of (node.refs || []).filter(r => r.from)) console.log(`  in  ${r.type} from ${loc(all[r.from])} ${all[r.from].title}`);
  for (const n of Object.values(all)) {
    if (n.sid === sid) continue;
    for (const field of ["title", "text", "reason"]) {
      const v = n[field] || "";
      for (const s of v.split(/(?<=[.:;])\s+|\n/)) if (s.includes("§" + sid)) console.log(`  cite ${loc(n)}.${field}: ${s.trim()}`);
    }
  }
  for (const [p, t] of Object.entries(texts)) {
    const c = t.split(sid).length - 1;
    if (c) console.log(`  file ${path.relative(rootDir, p)} x${c}`);
  }
}
