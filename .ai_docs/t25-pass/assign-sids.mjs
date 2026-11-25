// Gives every draft of newform.json the sid it will stand under (`sidValue`): a kept sid is the
// present node's, a new one is drawn now as `sheriff reindex` draws it (s- and 15 characters of the
// alphabet), unique against every sid under specs/, the archive included. A sid once drawn is kept,
// so citations by it stay valid; at the move, each node is written with its sid and the reindex
// keeps it.
import fs from "node:fs";
import path from "node:path";
import { randomInt } from "node:crypto";

const here = new URL(".", import.meta.url);
const root = decodeURIComponent(new URL("../../specs/", here).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const SID = /^s-[23456789abcdefghjkmnpqrstuvwxyz]{15}$/;

const taken = new Set();
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (e.name.endsWith(".json")) for (const m of fs.readFileSync(p, "utf8").matchAll(/"sid":\s*"(s-[a-z0-9]{15})"/g)) taken.add(m[1]);
  }
})(root);

const spec = JSON.parse(fs.readFileSync(path.join(root, "_guidelines/spec.json"), "utf8"));
const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);

const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
for (const v of Object.values(d)) if (v.sidValue) taken.add(v.sidValue);
const draw = () => {
  for (;;) {
    let s = "s-";
    for (let i = 0; i < 15; i++) s += ALPHABET[randomInt(ALPHABET.length)];
    if (!taken.has(s)) return taken.add(s), s;
  }
};
let drawn = 0;
for (const [n, v] of Object.entries(d)) {
  if (v.sid === "kept") {
    const p = present[v.from];
    if (!p) throw new Error(`${n}: no present node ${v.from}`);
    v.sidValue = p.sid;
  } else if (v.sid === "new") {
    if (!v.sidValue || !SID.test(v.sidValue)) (v.sidValue = draw()), drawn++;
  } else throw new Error(`${n}: sid is "${v.sid}"`);
}
const kept = Object.values(d).filter(v => v.sid === "kept").map(v => v.sidValue);
if (new Set(kept).size !== kept.length) throw new Error("two drafts keep one sid");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(`sids: ${Object.keys(d).length} drafts, ${drawn} drawn now, ${kept.length} kept`);
