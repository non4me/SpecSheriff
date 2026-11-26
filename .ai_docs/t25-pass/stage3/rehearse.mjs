// T25, stage 3, step A2: copies stage3/specs/ over a scratch worktree of HEAD, re-points the citations in the
// documentation, runs the given build of the SpecSheriff tools on it, and writes stage3/rehearsal.md with the
// refusals grouped by kind. Usage: node rehearse.mjs <worktree> [<cli.js>]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const HERE = 'D:/SpecSheriff/.ai_docs/t25-pass/stage3/';
const [wt, cli = 'D:/SpecSheriff/skills/tools/dist/cli.js'] = process.argv.slice(2);
if (!wt) throw new Error('usage: node rehearse.mjs <worktree> [<cli.js>]');
const git = (...a) => execFileSync('git', ['-C', wt, ...a], { encoding: 'utf8' });

git('checkout', '--', '.');
git('clean', '-fdq', 'specs');
fs.cpSync(HERE + 'specs', path.join(wt, 'specs'), { recursive: true });

// The citations in the documentation, re-pointed to the node that replaces each archived or renumbered one.
const replaced = JSON.parse(fs.readFileSync(HERE + 'replaced-sids.json', 'utf8'));
const removedRules = { 's-ybq7wbhkrh5pjqs': 'removed on 2026-11-20', 's-hwnzhgw5b683fc7': 'removed on 2026-11-20' };
for (const rel of ['CLAUDE.md', 'docs/README.md', '_promo/images/README.md']) {
  const p = path.join(wt, rel);
  let s = fs.readFileSync(p, 'utf8');
  for (const [from, to] of Object.entries(replaced)) s = s.split(from).join(to);
  for (const [sid, why] of Object.entries(removedRules)) s = s.split('§' + sid).join(`the rule, ${why}`);
  fs.writeFileSync(p, s);
}

const run = (cmd) => {
  const r = spawnSync('node', [cli, cmd], { cwd: wt, encoding: 'utf8' });
  return { cmd, status: r.status, out: (r.stdout + r.stderr).trim() };
};
const results = ['reindex', 'validate', 'binding', 'citations'].map(run);
const group = (out) => {
  const m = new Map();
  for (const line of out.split('\n').filter(Boolean)) {
    const k = line.replace(/s-[a-z0-9]{15}/g, 'SID').replace(/\([^)]*\)/, '()').replace(/^specs\/[^:]+: /, '').replace(/\d+(\.\d+)*[a-z]?/g, 'N').slice(0, 160);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(line);
  }
  return [...m].sort((a, b) => b[1].length - a[1].length);
};
const lines = [`# T25, stage 3: the rehearsal, ${new Date().toISOString().slice(0, 19)}Z`, '', `Tools: ${cli}. Worktree: ${wt}.`, ''];
for (const r of results) {
  lines.push(`## sheriff ${r.cmd}: exit ${r.status}`, '');
  if (r.cmd === 'reindex') { lines.push('```', r.out.split('\n').slice(-12).join('\n'), '```', ''); continue; }
  for (const [k, l] of group(r.out)) {
    lines.push(`- ${l.length} × ${k}`);
    for (const x of l.slice(0, 3)) lines.push(`  - ${x.slice(0, 300)}`);
  }
  lines.push('');
}
fs.writeFileSync(HERE + 'rehearsal.md', lines.join('\n'));
console.log(results.map((r) => `${r.cmd}: exit ${r.status}, ${r.out.split('\n').filter(Boolean).length} lines`).join('\n'));
