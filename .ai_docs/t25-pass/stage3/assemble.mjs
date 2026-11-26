// T25, stage 3, step A1: builds the new files of the specification into stage3/specs/ and writes stage3/report.md.
// Sources: moved/specs/ (the base built on 2026-11-20), the present specs/_guidelines/tools.json and project.json, and
// every draft in tools-drafts.json, the last draft of each node winning. Nothing under specs/ is changed.
// Usage: node assemble.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = 'D:/SpecSheriff/';
const T = ROOT + '.ai_docs/t25-pass/';
const HERE = T + 'stage3/';
const OUT = HERE + 'specs/';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const notes = [];
const problems = [];
const note = (s) => notes.push(s);
const problem = (s) => problems.push(s);
// The present files are read as the last commit holds them, since step A writes over specs/.
const atHead = (rel) => JSON.parse(execFileSync('git', ['-C', ROOT, 'show', 'HEAD:' + rel], { encoding: 'utf8', maxBuffer: 64 << 20 }));
const SID = /^s-[23456789abcdefghjkmnpqrstuvwxyz]{15}$/;

// ---------- the files ----------
const files = {
  spec: { rel: '_guidelines/spec.json', data: read(T + 'moved/specs/_guidelines/spec.json') },
  domains: { rel: '_guidelines/extensions/domains.json', data: read(T + 'moved/specs/_guidelines/extensions/domains.json') },
  recordtype: { rel: '_guidelines/extensions/recordtype.json', data: read(T + 'moved/specs/_guidelines/extensions/recordtype.json') },
  views: { rel: '_guidelines/extensions/views.json', data: read(T + 'moved/specs/_guidelines/extensions/views.json') },
  tools: { rel: '_guidelines/tools.json', data: atHead('specs/_guidelines/tools.json') },
  project: { rel: '_guidelines/project.json', data: atHead('specs/_guidelines/project.json') },
};
const archive = read(T + 'moved/specs/_archive/guidelines.json');

// Every node of every file, the nodes in the cells of a TableRule included, with where it is held.
function walk(list, fn, ctx) {
  list.forEach((n, i) => {
    fn(n, { list, i, parent: ctx.parent, file: ctx.file });
    if (n.children) walk(n.children, fn, { parent: n, file: ctx.file });
    for (const g of n.groups || []) {
      g.rows.forEach((r, ri) => {
        for (const [key, c] of Object.entries(r.cells)) {
          if (!c.node) continue;
          fn(c.node, { cell: c, table: n, group: g, row: r, ri, key, file: ctx.file });
          if (c.node.children) walk(c.node.children, fn, { parent: c.node, file: ctx.file });
        }
      });
    }
  });
}
function index() {
  const m = new Map();
  for (const [name, f] of Object.entries(files)) {
    walk(f.data.nodes, (n, at) => {
      if (!n.sid) return;
      if (m.has(n.sid)) problem(`${n.sid} is held twice: in ${m.get(n.sid).file} and in ${name}`);
      m.set(n.sid, { node: n, at, file: name });
    }, { parent: null, file: name });
  }
  return m;
}
const before = index();
const presentTools = new Map();
walk(files.tools.data.nodes, (n) => presentTools.set(n.sid, { title: n.title }), { parent: null, file: 'tools' });

// ---------- the drafts, the last of each node winning ----------
const drafts = read(T + 'tools-drafts.json');
const chainOf = new Map();
const chains = new Map();
for (const [k, v] of Object.entries(drafts)) {
  if (!v.proposal || typeof v.proposal !== 'object') { note(`draft ${k}: holds no proposal, left out`); continue; }
  const id = v.sidValue || (v.base ? chainOf.get(v.base) || v.base : null) || k;
  chainOf.set(k, id);
  if (!chains.has(id)) chains.set(id, []);
  chains.get(id).push(k);
}
// A new node whose drafts carry no sid is given one here, once; later runs read it back.
const ASSIGNED = HERE + 'assigned-sids.json';
const assigned = fs.existsSync(ASSIGNED) ? read(ASSIGNED) : {};
function sidFor(id) {
  if (assigned[id]) return assigned[id];
  const taken = new Set([...before.keys(), ...Object.values(assigned), ...Object.values(drafts).map((v) => v.sidValue).filter(Boolean)]);
  const alphabet = '23456789abcdefghjkmnpqrstuvwxyz';
  let sid;
  do { sid = 's-' + Array.from({ length: 15 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(''); } while (taken.has(sid));
  assigned[id] = sid;
  fs.writeFileSync(ASSIGNED, JSON.stringify(assigned, null, 2) + '\n');
  note(`${id}: given the new sid ${sid}`);
  return sid;
}
const DOCS = { tools: 'tools', spec: 'spec', domains: 'domains', recordtype: 'recordtype', views: 'views' };
const finals = [];
for (const [id, keys] of chains) {
  const last = keys[keys.length - 1];
  const d = drafts[last];
  if (!d.agreed) problem(`draft ${last} (${id}): no \`agreed\` date`);
  const doc = DOCS[(d.location || drafts[keys[0]].location || '').split(' ')[0]];
  if (!doc) problem(`draft ${last}: no document in its location "${d.location}"`);
  finals.push({ id, keys, last, d, p: d.proposal, doc, sid: SID.test(id) ? id : d.removal ? null : sidFor(id) });
}

// ---------- the owner's words in Russian, rendered in English ----------
const QUOTES = {
  '«ок»': '"ok"',
  '«ок, убирай»': '"ok, remove it"',
  '«старайся не писать через отрицание -> новое уникальное имя»': '"try not to write it as a negation -> a new, unique name"',
  '«Согласны с группой 1 и с вариантом А в обоих вопросах?»': '"Do you agree to group 1 and to option A in both questions?"',
  '«А»': '"A"',
  '«А.»': '"A."',
  '«согласен»': '"agreed"',
  '«Согласны с группой 2?»': '"Do you agree to group 2?"',
  '«Согласны с группой 3?»': '"Do you agree to group 3?"',
  '«Выбираете А? Если да и замечаний к узлам нет, этим же ответом вы согласуете всю группу 4.»': '"Do you choose A? If so, and you have no remarks on the nodes, the same answer agrees to the whole of group 4."',
  '«Выбираете А? Если да и замечаний к узлам нет, этим же ответом вы согласуете всю группу 5.»': '"Do you choose A? If so, and you have no remarks on the nodes, the same answer agrees to the whole of group 5."',
  '«Согласны с группой 6?»': '"Do you agree to group 6?"',
  '«Согласны с группой 7 и с вариантом А в обоих вопросах?»': '"Do you agree to group 7 and to option A in both questions?"',
  '«Согласны с группой 8 и с вариантом А во всех трёх вопросах?»': '"Do you agree to group 8 and to option A in all three questions?"',
  '«я же принимал уже решения по этим вопросам»': '"but I have already made decisions on these questions"',
  '«Согласны с рекомендованным вариантом во всех шести вопросах?»': '"Do you agree to the recommended option in all six questions?"',
  '«Согласны с формулировками 3.1 и 3.3–3.8?»': '"Do you agree to the wordings of 3.1 and 3.3–3.8?"',
  '«я бы вообще убрал это требование или сделал не обязательным - не вижу в нем особого профита»': '"I would drop this requirement altogether or make it optional; I see no particular benefit in it"',
};
const CYRILLIC = /[\u0400-\u04FF]/;
function english(s) {
  let out = s;
  for (const [ru, en] of Object.entries(QUOTES)) out = out.split(ru).join(en);
  return out;
}

// ---------- applying a draft to a node ----------
const LIST_KEYS = ['of', 'members', 'property', 'jsonSchema', 'valueList'];
// What "What `sheriff reindex` changes in what an earlier release wrote" (s-gb8s9657a65hqmv) says of a
// `TextRule.list.declaredIn`, done here once for every list the files hold.
function rewriteDeclaredIn(n) {
  const d = n.list?.declaredIn;
  if (!d) return;
  delete n.list.declaredIn;
  if (d.file === 'specs/_schema/project.schema.json' && /kinds/.test(d.declaration)) note(`${n.sid}: its list's declaredIn, pointing to the field kinds, removed`);
  else if (d.file.endsWith('.json')) { n.list.jsonSchema = { file: d.file, pointer: d.declaration }; note(`${n.sid}: its list's declaredIn becomes jsonSchema`); }
  else { n.list.valueList = { file: d.file, symbol: d.declaration }; note(`${n.sid}: its list's declaredIn becomes valueList`); }
}
const ORDER = ['location', 'sid', 'kind', 'title', 'status', 'text', 'refs', 'reason', 'examples', 'list', 'columns', 'groups', 'owners', 'meta', 'children'];
function canon(n) {
  const out = {};
  for (const k of ORDER) if (k in n) out[k] = n[k];
  for (const k of Object.keys(n)) if (!(k in out)) { out[k] = n[k]; note(`${n.sid || n.title}: key \`${k}\` kept after the known keys`); }
  return out;
}
function decisionsOf(keys) {
  const out = [];
  // A ruling recorded without a type changed the wording, unless it only records that the owner agreed.
  const typeOf = (r) => r.type || (/^Whether the owner agrees/.test(r.problem) ? 'procedural' : 'textual');
  for (const k of keys) for (const r of drafts[k].rulings || []) out.push({ date: r.date, problem: english(r.problem), ruling: english(r.ruling), type: typeOf(r) });
  return out;
}
function addDecisions(n, list) {
  if (!list.length) return;
  n.meta = n.meta || {};
  const have = new Set((n.meta.decisions || []).map((x) => x.date + '\u0000' + x.ruling));
  for (const x of list) {
    if (have.has(x.date + '\u0000' + x.ruling)) continue;
    (n.meta.decisions = n.meta.decisions || []).push(x);
    have.add(x.date + '\u0000' + x.ruling);
  }
}
function wording(n, f, inCell) {
  const { p } = f;
  if (!inCell && n.kind !== undefined) {
    if (p.title !== undefined && p.title !== null) n.title = p.title;
  }
  if (inCell) delete n.title;
  if (typeof p.text !== 'string') problem(`${f.id}: its proposal holds no text`);
  n.text = p.text;
  if (p.reason === null || p.reason === undefined || p.reason === '') delete n.reason;
  else n.reason = p.reason;
  if (Array.isArray(p.examples) && p.examples.length) n.examples = p.examples.map((e) => (typeof e === 'string' ? e : e.en));
  else if (p.examples !== undefined) delete n.examples;
  if (p.list !== undefined) n.list = Object.fromEntries(Object.entries(p.list).filter(([k]) => LIST_KEYS.includes(k)));
  if (Array.isArray(p.refs)) n.refs = p.refs.filter((r) => r.to);
  else n.refs = (n.refs || []).filter((r) => r.to);
  if (p.meta?.todos) { n.meta = n.meta || {}; n.meta.todos = [...(n.meta.todos || []), ...p.meta.todos]; }
  n.status = 'draft';
  addDecisions(n, decisionsOf(f.keys));
}
function newNode(f, inCell) {
  const kind = f.d.kind === 'section' ? 'section' : 'TextRule';
  // A placeholder the reindex replaces with the computed location.
  const n = { location: `_guidelines/${f.doc === 'tools' ? 'tools' : f.doc === 'spec' ? 'spec' : 'extensions/' + f.doc}/0`, kind, status: 'draft', text: '', refs: [] };
  if (f.sid) n.sid = f.sid;
  if (kind === 'section') {
    n.title = f.p.title;
    n.text = f.p.text;
    n.children = [];
    addDecisions(n, decisionsOf(f.keys));
    return n;
  }
  wording(n, f, inCell);
  return n;
}

// ---------- placing a new node ----------
const titleSid = new Map();
const labelSid = new Map();
function learnTitles() {
  for (const [sid, at] of index()) if (at.node.title) titleSid.set(at.node.title, sid);
  for (const [sid, t] of presentTools) if (t.title && !titleSid.has(t.title)) titleSid.set(t.title, sid);
  for (const f of finals) {
    if (f.p.title && f.sid && !titleSid.has(f.p.title)) titleSid.set(f.p.title, f.sid);
    const m = (f.d.location || '').match(/^\w+ (\d+(?:\.\d+)*[a-z]?)/);
    if (m && f.sid) labelSid.set(f.doc + ' ' + m[1], f.sid);
  }
  for (const [sid, at] of index()) {
    const m = at.node.location?.match(/\/(\d+(?:\.\d+)*[a-z]?)$/);
    const doc = at.file === 'spec' || at.file === 'tools' ? at.file : at.file;
    if (m && !labelSid.has(doc + ' ' + m[1])) labelSid.set(doc + ' ' + m[1], sid);
  }
}
// Placements the location strings leave open, settled here.
const PLACE = {
  's-x8uzc8z44pwtd3h': { after: 's-m4h279nbaqkpa3t' }, // spec 1.6.4, split from 1.6.1: last in 1.6
  's-5j9s5dstbawdd69': { before: 's-m4h279nbaqkpa3t' }, // spec 1.6.1, before the former 1.6.1
  'new:tools-1-settings': { after: 's-zefk589ykh37b8u' },
  's-t9j29hppag2nren': { after: 'new:tools-1-settings' },
  's-7gab4ptjt2khfr5': { after: 's-6c4hyyrnprekk32' }, // tools 9, after the new section 8
  'new:tools-7-1-validate': { after: 's-mhsb6fjsq5xn6c9' }, // after the chosen extensions, which come right after the composed schema
  'new:tools-7-1-archive-file': { after: 's-j4webte36gkraju' },
  's-yauyedny2yzvs4c': { after: 's-vke5hakwf3uyrjs' }, // tools 7.1.3a, after the duplicate sids
  's-axxezge5duzemgs': { after: 's-pvzms7d8kxb8dk2' }, // tools 17b; 17a, its anchor, was removed
  's-g7auhqvzzbkw644': { after: 's-gvafe6bnstwab8b' }, // tools 7.1.22a, split from 7.1.22, after it
};
function placementOf(f) {
  if (PLACE[f.id]) return PLACE[f.id];
  const loc = f.d.location || '';
  let m = loc.match(/(after|before) (?:row )?(\d+(?:\.\d+)*[a-z]?)\b/);
  if (m) {
    const sid = labelSid.get(f.doc + ' ' + m[2]);
    if (sid) return { [m[1]]: sid };
  }
  m = loc.match(/(after|before) (?:the node |the new section )?[“"](.+?)[”"]/);
  if (m) {
    const sid = titleSid.get(m[2]);
    if (sid) return { [m[1]]: sid };
    problem(`${f.id}: no node titled "${m[2]}" (${loc})`);
    return null;
  }
  return null;
}
function holderOf(sidOrId) {
  const sid = SID.test(sidOrId) ? sidOrId : finals.find((x) => x.id === sidOrId)?.sid;
  return (sid && index().get(sid)) || pendingAt(sidOrId);
}
const pending = new Map(); // id of a new node without a sid -> node
function pendingAt(id) {
  const n = pending.get(id);
  if (!n) return undefined;
  let found;
  for (const [name, f] of Object.entries(files)) walk(f.data.nodes, (x, at) => { if (x === n) found = { node: x, at, file: name }; }, { parent: null, file: name });
  return found;
}
function insert(node, where, f) {
  const anchorId = where.after || where.before;
  const at = holderOf(anchorId);
  if (!at) { problem(`${f.id}: its anchor ${anchorId} is in no file`); return false; }
  if (at.at.list) {
    const i = at.at.list.indexOf(at.node);
    at.at.list.splice(where.after ? i + 1 : i, 0, node);
    return true;
  }
  // The anchor is a node in a cell: the new node takes a new row of the same table, after the anchor's row.
  const rows = at.at.group.rows;
  const i = rows.indexOf(at.at.row);
  const cells = {};
  for (const c of at.at.table.columns) {
    if (c.holds === 'node') cells[c.key] = { node };
    else if (c.key === 'cost') cells[c.key] = { text: f.d.cost?.en };
    else problem(`${f.id}: the column "${c.key}" of ${at.at.table.sid} takes no value from the draft`);
  }
  if (typeof f.d.cost?.en !== 'string') problem(`${f.id}: a new row with no "On failure" text`);
  rows.splice(where.after ? i + 1 : i, 0, { cells });
  return true;
}
function detach(sid) {
  const at = holderOf(sid);
  if (!at || !at.at.list) { problem(`${sid}: cannot be moved, being in no list`); return null; }
  at.at.list.splice(at.at.list.indexOf(at.node), 1);
  return at.node;
}

// ---------- 1. the wordings of the nodes that exist ----------
const created = [];
for (const f of finals) {
  if (f.d.removal) continue;
  const at = f.sid && before.get(f.sid);
  if (at) {
    if (at.file !== f.doc && !(f.doc === 'tools' && at.file === 'tools')) problem(`${f.id}: its draft is for ${f.doc}, the node is in ${at.file}`);
    if (f.d.kind === 'section') {
      if (f.p.title) at.node.title = f.p.title;
      if (typeof f.p.text === 'string') at.node.text = f.p.text;
      addDecisions(at.node, decisionsOf(f.keys));
    } else {
      wording(at.node, f, !!at.at.cell);
      const cost = at.at.cell && at.at.row.cells.cost;
      if (cost && f.d.cost?.en && cost.text !== f.d.cost.en) {
        note(`${f.sid}: its row's "On failure" now reads "${f.d.cost.en}", where it read "${cost.text}"`);
        cost.text = f.d.cost.en;
      }
    }
  } else created.push(f);
}

// ---------- 2. the new sections, put in place of the node that becomes their first child ----------
learnTitles();
for (const f of created.filter((x) => x.d.kind === 'section')) {
  const n = newNode(f, false);
  const order = f.d.order || [];
  const m = (f.d.location || '').match(/in place of the node [“"](.+?)[”"]/);
  const first = m ? titleSid.get(m[1]) : order[0];
  if (!first || !holderOf(first)) { problem(`${f.id}: no node to put the section in place of`); continue; }
  const at = holderOf(first);
  at.at.list.splice(at.at.list.indexOf(at.node), 0, n);
  f.placed = true;
  f.node = n;
  note(`section ${f.p.title} (${f.sid}) put in place of ${first}`);
}

// ---------- 3. the new rules and rows ----------
const left = created.filter((x) => x.d.kind !== 'section' && !x.d.removal);
for (const f of left) { f.node = newNode(f, f.d.kind === 'cell'); if (!f.sid) pending.set(f.id, f.node); }
// Each new section takes its children in the order its draft gives, before the other new nodes are placed after them.
for (const f of created.filter((x) => x.d.kind === 'section' && x.placed)) {
  for (const sid of f.d.order || []) {
    const at = holderOf(sid);
    if (at && at.node === f.node) continue;
    const child = at ? (at.at.list ? detach(sid) : null) : null;
    const nf = left.find((x) => x.sid === sid);
    const n = child || nf?.node;
    if (!n) { problem(`${f.id}: its order names ${sid}, which no file and no draft holds`); continue; }
    if (nf) nf.placed = true;
    f.node.children.push(n);
  }
}
for (let round = 0; round < 6 && left.some((f) => !f.placed); round++) {
  learnTitles();
  for (const f of left) {
    if (f.placed) continue;
    const where = placementOf(f);
    if (!where) continue;
    const anchor = where.after || where.before;
    if (!holderOf(anchor)) continue;
    if (insert(f.node, where, f)) { f.placed = true; note(`new ${f.p.title || '(row)'} (${f.sid || f.id}) placed ${where.after ? 'after' : 'before'} ${anchor}`); }
  }
}
for (const f of left) if (!f.placed) problem(`new ${f.p.title || '(row)'} (${f.sid || f.id}): not placed; its location is "${f.d.location}"`);

// ---------- 4. moves the drafts name ----------
function moveAfter(sid, anchor) {
  const n = detach(sid);
  if (!n) return;
  const at = holderOf(anchor);
  at.at.list.splice(at.at.list.indexOf(at.node) + 1, 0, n);
  note(`${sid} moved after ${anchor}`);
}
moveAfter('s-txbwsthdqhvyzd2', 's-qqs2svksmjct753'); // tools 7.3.3a, moved from 7.2.9
for (const f of finals) if (f.d.removal) note(`removed, never approved: ${f.p.title} (${f.sid || f.id})`);

// ---------- 5. the archive, the project's guidelines and the citations outside the specification ----------
const replaced = { 's-xhcmchcngykvn2k': 's-x8uzc8z44pwtd3h', 's-gqbj8849rf224qa': 's-x4zcbk5ekebd9ua', 's-3w8puyqn2ramsre': 's-s5s83353kfzt2mf' };
for (const a of archive.nodes) {
  if (a.title === 'Tests at a push while the specification is a draft' && a.archived.replacedBy === 's-m4h279nbaqkpa3t') {
    a.archived.replacedBy = 's-x8uzc8z44pwtd3h';
    note('archive: 5.3 now names s-x8uzc8z44pwtd3h "When the tests must pass", to which its content moved when 1.6.1 was split');
  }
  if (a.meta?.decisions) for (const x of a.meta.decisions) { x.ruling = english(x.ruling); x.problem = english(x.problem); }
}
// A citation of an archived node is re-pointed to the node that replaces it, a technical replacement approved on the
// owner's behalf. The archive holds no sids, so the old sid is read from the present base by the archived location.
{
  const presentBase = atHead('specs/_guidelines/spec.json');
  const oldSid = new Map();
  walk(presentBase.nodes, (n) => oldSid.set(n.location, n.sid), { parent: null, file: 'present' });
  for (const a of archive.nodes) {
    const sid = oldSid.get(a.location);
    if (!sid) { problem(`archive: no present node at ${a.location}`); continue; }
    if (a.archived.replacedBy) replaced[sid] = replaced[sid] || a.archived.replacedBy;
    else replaced[sid] = replaced[sid] || null;
  }
  for (const [name, f] of Object.entries(files)) {
    walk(f.data.nodes, (n) => {
      for (const [from, to] of Object.entries(replaced)) {
        const s = JSON.stringify(n);
        if (!s.includes('§' + from) && !(n.refs || []).some((r) => r.to === from)) continue;
        if (!to) { problem(`${n.sid} cites ${from}, archived with no node replacing it`); continue; }
        for (const k of ['title', 'text', 'reason']) if (typeof n[k] === 'string') n[k] = n[k].split('§' + from).join('§' + to);
        if (n.examples) n.examples = n.examples.map((e) => e.split('§' + from).join('§' + to));
        if (n.meta?.decisions) for (const x of n.meta.decisions) { x.ruling = x.ruling.split('§' + from).join('§' + to); x.problem = x.problem.split('§' + from).join('§' + to); }
        if (n.refs) n.refs = n.refs.map((r) => (r.to === from ? { type: r.type, to } : r));
        note(`${n.sid}: cites ${to} in place of ${from}, which the archive holds; a technical replacement, approved on the owner's behalf`);
      }
    }, { parent: null, file: name });
  }
  for (const k of Object.keys(replaced)) if (replaced[k] === null) delete replaced[k];
}

// ---------- 6. checks of the result ----------
for (const [name, f] of Object.entries(files)) walk(f.data.nodes, (n) => rewriteDeclaredIn(n), { parent: null, file: name });
// A node's links follow its citations (§s-bpdqd9v72wg7vsz): every node it cites has a link, `cites` unless another type
// says how the two relate, and a `cites` link stands only where the node cites its target. Links are no wording, so
// this changes no approval. Citations are read as "Citations and the links that match them" (s-qzyacnqwvaeaps4) says:
// from every property but the links, the nodes under the node, `sections`, the gathered values and the nodes in cells.
const CITE = /§(s-[23456789abcdefghjkmnpqrstuvwxyz]{15})(?![0-9a-z])/g;
function citedBy(n) {
  const out = new Set();
  const read = (v, key) => {
    if (typeof v === 'string') { for (const m of v.matchAll(CITE)) out.add(m[1]); return; }
    if (Array.isArray(v)) { v.forEach((x) => read(x)); return; }
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!(key === 'cell' && k === 'node') && k !== 'gathered') read(x, k === 'cells' ? 'cells' : k);
  };
  for (const [k, v] of Object.entries(n)) {
    if (['refs', 'children', 'sections', 'gathered'].includes(k)) continue;
    if (k === 'groups') { for (const g of v) { read(g.heading); for (const r of g.rows) for (const c of Object.values(r.cells)) if (!c.node) read(c.text); } continue; }
    read(v, k);
  }
  out.delete(n.sid);
  return out;
}
for (const [name, f] of Object.entries(files)) {
  walk(f.data.nodes, (n) => {
    if (!n.sid) return;
    const cited = citedBy(n);
    const out = (n.refs || []).filter((r) => r.to);
    const typed = new Set(out.filter((r) => r.type !== 'cites').map((r) => r.to));
    const kept = out.filter((r) => {
      if (r.type !== 'cites') return true;
      if (!cited.has(r.to)) { note(`${n.sid}: cites link to ${r.to} dropped, since the node does not cite it`); return false; }
      if (typed.has(r.to)) { note(`${n.sid}: cites link to ${r.to} dropped beside a link of another type`); return false; }
      return true;
    });
    const linked = new Set(kept.map((r) => r.to));
    for (const sid of cited) if (!linked.has(sid)) { kept.push({ type: 'cites', to: sid }); note(`${n.sid}: cites link to ${sid} added for its citation`); }
    n.refs = [...kept, ...(n.refs || []).filter((r) => !r.to)];
  }, { parent: null, file: name });
}
const after = index();
for (const [name, f] of Object.entries(files)) {
  walk(f.data.nodes, (n) => {
    for (const k of ['title', 'text', 'reason']) if (typeof n[k] === 'string' && CYRILLIC.test(n[k])) problem(`${n.sid}: Russian in its ${k}`);
    if (n.meta?.decisions) for (const x of n.meta.decisions) {
      x.ruling = english(x.ruling); x.problem = english(x.problem);
      if (CYRILLIC.test(x.ruling + x.problem)) problem(`${n.sid}: Russian left in a decision of ${x.date}: ${(x.ruling.match(/«[^»]*»/) || [''])[0]}`);
    }
    if (n.meta?.todos) for (const t of n.meta.todos) if (CYRILLIC.test(t.text)) problem(`${n.sid}: Russian in a todo`);
  }, { parent: null, file: name });
}
for (const f of finals) {
  if (f.d.removal || !f.sid) continue;
  if (!after.has(f.sid)) problem(`${f.id}: agreed but in no file`);
}
const citedNowhere = [];
for (const [sid, at] of after) {
  const s = JSON.stringify({ t: at.node.title, x: at.node.text, r: at.node.reason, e: at.node.examples });
  for (const c of s.match(/§(s-[a-z0-9]{15})/g) || []) if (!after.has(c.slice(1))) citedNowhere.push(`${sid} cites ${c.slice(1)}, which no file holds`);
}
citedNowhere.forEach(problem);

// ---------- 7. writing ----------
function canonAll(list) { return list.map((n) => { const c = canon(n); if (c.children) c.children = canonAll(c.children); for (const g of c.groups || []) for (const r of g.rows) for (const cell of Object.values(r.cells)) if (cell.node) cell.node = canon(cell.node); return c; }); }
fs.rmSync(OUT, { recursive: true, force: true });
const writeJson = (rel, data) => { const p = OUT + rel; fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n'); };
for (const f of Object.values(files)) writeJson(f.rel, { ...f.data, nodes: canonAll(f.data.nodes) });
writeJson('_archive/guidelines.json', archive);
// The schema of step A: the present schema, with only what the moved files need added from the new form, the archive's
// own schema among it. The rest of the new form of the schema (moved/specs/_schema/) comes in step B with its code,
// since the tests build their fixtures against the repository's schema.
const present = (name) => atHead('specs/_schema/' + name);
const movedSchema = read(T + 'moved/specs/_schema/node.schema.json');
fs.mkdirSync(OUT + '_schema', { recursive: true });
for (const name of ['section-file.schema.json', 'extension.schema.json']) fs.writeFileSync(OUT + '_schema/' + name, JSON.stringify(present(name), null, 2) + '\n');
// The schema of a file of the archive, as "Validation of a file of the archive" (s-hw84ynkvhgzcnpr) says: a node has a
// location, a kind and the reason for its removal, holds no sid, no node under it and no link pointing at it, and
// may hold anything else in any form.
{
  const moved = read(T + 'moved/specs/_schema/archive-file.schema.json');
  const archived = moved.$defs.archivedNode.properties.archived;
  const schema = {
    $schema: moved.$schema, $id: moved.$id, title: moved.title,
    $comment: 'The archive holds the nodes that were ever approved and have since been removed (s-f2b5zvc565s242f). The schema requires of a node of the archive only what s-hw84ynkvhgzcnpr lists: a location and a kind, the reason for its removal, and no sid, no node under it and no link pointing at it (s-bpdqd9v72wg7vsz). It admits every other property of the node in any form, so that a node removed under an earlier release or of a kind no longer defined stays readable.',
    type: 'object',
    properties: moved.properties,
    required: moved.required,
    additionalProperties: false,
    $defs: {
      archivedNode: {
        $comment: 'A removed node as it last stood, with the reason for its removal. It has no sid, so that nothing names it: a node may be deleted from the archive at any time.',
        type: 'object',
        properties: {
          location: { type: 'string', minLength: 1 },
          kind: { type: 'string', minLength: 1 },
          refs: { $comment: 'Only the links the node made: none points at it.', type: 'array', items: { type: 'object', not: { required: ['from'] } } },
          archived,
        },
        required: ['location', 'kind', 'archived'],
        not: { anyOf: [{ required: ['sid'] }, { required: ['children'] }] },
      },
    },
  };
  fs.writeFileSync(OUT + '_schema/archive-file.schema.json', JSON.stringify(schema, null, 2) + '\n');
}
{
  const s = present('node.schema.json');
  const base = s.$defs.base;
  base.properties.kind.enum.push('TableRule');
  s.$defs.ref.properties.type.enum.splice(s.$defs.ref.properties.type.enum.indexOf('cites'), 0, 'checks');
  base.properties.kind.$comment = 'header is a domain\'s header; a term\'s title is the term it defines; a TableRule is a rule set out as a table.';
  base.properties = Object.fromEntries(Object.entries(base.properties).flatMap(([k, v]) => (k === 'reason' ? [[k, v], ['examples', movedSchema.$defs.base.properties.examples]] : [[k, v]])));
  base.required = base.required.filter((k) => k !== 'sid' && k !== 'title');
  const tableRule = movedSchema.$defs.node.allOf.find((c) => c.if?.properties?.kind?.const === 'TableRule');
  s.$defs = {
    node: { $comment: 'The fields and the conditions on kind shared by every node. Whether a sid and a title are required or refused is said by the schema that refers to this one, and so is the refusal of a field nobody declared.', allOf: [...s.allOf, tableRule] },
    cellNode: movedSchema.$defs.cellNode,
    ...s.$defs,
    columnKey: movedSchema.$defs.columnKey,
    row: movedSchema.$defs.row,
    cell: movedSchema.$defs.cell,
  };
  const out = { $schema: s.$schema, $id: s.$id, title: s.title, $comment: s.$comment, type: 'object', allOf: [{ $ref: '#/$defs/node' }], required: ['sid', 'title'], unevaluatedProperties: false, $defs: s.$defs };
  const list = out.$defs.list;
  const place = (key, comment) => ({ type: 'object', $comment: comment, properties: { file: { type: 'string', minLength: 1 }, [key]: { type: 'string', minLength: 1 } }, required: ['file', key], additionalProperties: false });
  list.properties.jsonSchema = place('pointer', 'The place in a JSON Schema whose values the list states: the file, and a JSON pointer within it.');
  list.properties.valueList = place('symbol', 'The symbol in code that declares the list\'s values: the file, and the name of the symbol.');
  fs.writeFileSync(OUT + '_schema/node.schema.json', JSON.stringify(out, null, 2) + '\n');
  note('node.schema.json: the present schema with TableRule, its cells, `examples`, and `TextRule.list.jsonSchema` and `valueList` added; `declaredIn` kept until the reindex rewrites it');
}
fs.writeFileSync(HERE + 'replaced-sids.json', JSON.stringify(replaced, null, 2) + '\n');
const count = (name) => { let n = 0; walk(files[name].data.nodes, () => n++, { parent: null, file: name }); return n; };
const report = [
  '# T25, stage 3, step A1: the report of assemble.mjs',
  '',
  `Written ${new Date().toISOString().slice(0, 19)}Z. Drafts read: ${Object.keys(drafts).length}; nodes they settle: ${finals.length}; new: ${created.length}.`,
  '',
  'Nodes by file: ' + Object.keys(files).map((k) => `${k} ${count(k)}`).join(', ') + `; archive ${archive.nodes.length}.`,
  '',
  `## Problems (${problems.length})`,
  '',
  ...problems.map((s) => '- ' + s),
  '',
  `## Notes (${notes.length})`,
  '',
  ...notes.map((s) => '- ' + s),
  '',
];
fs.writeFileSync(HERE + 'report.md', report.join('\n'));
console.log(`problems ${problems.length}, notes ${notes.length}; report in stage3/report.md`);
