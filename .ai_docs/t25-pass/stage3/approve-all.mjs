// T25, stage 3, step A7: approves on the owner's behalf every node of the SpecSheriff guidelines and of the project's own
// guidelines that is a draft after the move, once each is found among the nodes the owner agreed to or the changes
// approved on the owner's behalf. Prints any draft it cannot account for and approves nothing then.
// Usage: node approve-all.mjs [--dry]
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const ROOT = 'D:/SpecSheriff/';
const T = ROOT + '.ai_docs/t25-pass/';
const dry = process.argv.includes('--dry');
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// What the owner agreed to: the base and its extensions as stage 1 built them, every agreed draft, and the sids
// stage 3 gave to new drafts. A technical replacement approved on the owner's behalf is named here with its reason.
const agreed = new Set(Object.keys(read(T + 'moved/agreed.json')));
const drafts = read(T + 'tools-drafts.json');
for (const [k, v] of Object.entries(drafts)) {
  if (!v.agreed) continue;
  if (v.sidValue) agreed.add(v.sidValue);
  if (/^s-[a-z0-9]{15}$/.test(k)) agreed.add(k);
}
for (const sid of Object.values(read(T + 'stage3/assigned-sids.json'))) agreed.add(sid);
const technical = { 's-p92k6vfe3ju27at': 'its reason cites the node to which the archived 5.3 moved' };

const files = ['spec.json', 'tools.json', 'project.json', 'extensions/domains.json', 'extensions/recordtype.json', 'extensions/views.json'];
const draft = [];
const walk = (nodes, fn) => {
  for (const n of nodes ?? []) {
    fn(n);
    walk(n.children, fn);
    for (const g of n.groups ?? []) for (const r of g.rows) for (const c of Object.values(r.cells)) if (c.node) walk([c.node], fn);
  }
};
for (const f of files) {
  walk(read(ROOT + 'specs/_guidelines/' + f).nodes, (n) => {
    if (n.kind === 'section' || n.kind === 'header' || n.status !== 'draft') return;
    draft.push({ sid: n.sid, file: f, title: n.title ?? '(in a cell)' });
  });
}
const unknown = draft.filter((d) => !agreed.has(d.sid) && !technical[d.sid]);
console.log(`drafts ${draft.length}, accounted for ${draft.length - unknown.length}`);
for (const d of unknown) console.log(`not accounted for: ${d.sid} ${d.file} ${d.title}`);
if (unknown.length || dry) process.exit(unknown.length ? 1 : 0);
const out = spawnSync('node', [ROOT + 'skills/tools/dist/cli.js', 'approve', ...draft.map((d) => d.sid)], { cwd: ROOT, encoding: 'utf8' });
console.log((out.stdout + out.stderr).trim().split('\n').slice(-5).join('\n'));
process.exit(out.status ?? 1);
