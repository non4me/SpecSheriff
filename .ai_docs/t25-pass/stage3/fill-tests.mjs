// T25, stage 3, step A5: writes each node's `meta.tests` as the SpecTags of the tests produce it, from what
// `sheriff binding` reports, until the reindex builds the lists itself (s-ztseyetus7np6br, a note of step B).
// Usage: node fill-tests.mjs
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const ROOT = 'D:/SpecSheriff/';
const out = spawnSync('node', [ROOT + 'skills/tools/dist/cli.js', 'binding'], { cwd: ROOT, encoding: 'utf8' });
const want = new Map();
for (const line of (out.stdout + out.stderr).split('\n')) {
  const m = line.match(/^(specs\/[^:]+): (s-[a-z0-9]{15}) \([^)]*\): its list of tests is not what the tests' SpecTags produce: (.*)$/);
  if (!m) continue;
  const [, file, sid, list] = m;
  want.set(sid, { file, tests: list === 'none' ? [] : list.split(/, (?=skills\/|test\/)/) });
}
const byFile = new Map();
for (const [sid, w] of want) byFile.set(w.file, [...(byFile.get(w.file) ?? []), sid]);
const walk = (nodes, fn) => {
  for (const n of nodes ?? []) {
    fn(n);
    walk(n.children, fn);
    for (const g of n.groups ?? []) for (const r of g.rows) for (const c of Object.values(r.cells)) if (c.node) walk([c.node], fn);
  }
};
let changed = 0;
for (const [file, sids] of byFile) {
  const path = ROOT + file;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  walk(data.nodes, (n) => {
    if (!sids.includes(n.sid)) return;
    const { tests } = want.get(n.sid);
    n.meta = n.meta ?? {};
    if (tests.length) n.meta.tests = tests;
    else delete n.meta.tests;
    if (!Object.keys(n.meta).length) delete n.meta;
    changed++;
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
console.log(`meta.tests written for ${changed} nodes in ${byFile.size} files`);
