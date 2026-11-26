// T25, stage 3, step A7 (its first half): copies the files that assemble.mjs built into specs/ of the repository and
// re-points the citations in the documentation, as rehearse.mjs does in the scratch worktree. It resets nothing.
// Usage: node move.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'D:/SpecSheriff/';
const HERE = ROOT + '.ai_docs/t25-pass/stage3/';
fs.cpSync(HERE + 'specs', ROOT + 'specs', { recursive: true });
const replaced = JSON.parse(fs.readFileSync(HERE + 'replaced-sids.json', 'utf8'));
const removedRules = { 's-ybq7wbhkrh5pjqs': 'removed on 2026-11-20', 's-hwnzhgw5b683fc7': 'removed on 2026-11-20' };
for (const rel of ['CLAUDE.md', 'docs/README.md', '_promo/images/README.md']) {
  const p = path.join(ROOT, rel);
  let s = fs.readFileSync(p, 'utf8');
  const was = s;
  for (const [from, to] of Object.entries(replaced)) s = s.split(from).join(to);
  for (const [sid, why] of Object.entries(removedRules)) s = s.split('§' + sid).join(`the rule, ${why}`);
  if (s !== was) { fs.writeFileSync(p, s); console.log('re-pointed: ' + rel); }
}
console.log('specs/ written from stage3/specs/');
