// T25, stage 1: builds in moved/ the new files of the SpecSheriff guidelines from the drafts the owner agreed to.
// Reads newform.json, base-structure.html, the three tables of checks and the present specs/; writes only under moved/.
// Second pass: merges decisions-out-1..4.json, sets the sections' texts from section-purposes.json, writes the archive,
// translates the Russian todos from todos-en.json, and keeps every link of the base inside the base (rule 1.7.3).
// Re-running it keeps every sid it assigned before (moved/new-sids.json), so the output is stable.
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const T = 'D:/SpecSheriff/.ai_docs/t25-pass/';
const OUT = T + 'moved/';
const SPECS = 'D:/SpecSheriff/specs/';
const TODAY = '2026-11-20';
const ALPHABET = '23456789abcdefghjkmnpqrstuvwxyz';
const SID_RE = /s-[2-9a-hjkmnp-z]{15}(?![0-9a-z])/g;
const SID_CITED = /§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g;
const LOOSE_CITED = /§(s-[0-9a-z]{15})(?![0-9a-z])/g;
const NOT_CITING = new Set(['refs', 'children', 'sections', 'gathered']);
const CYRILLIC = /[А-Яа-яЁё]/;
const EXT = { 11: 'domains', 12: 'recordtype', 13: 'views' };
const TABLE_FILES = { '10.1': 'table-10-1.json', '11.3': 'table-11-3.json', '12.12': 'table-12-12.json' };
const COLUMN_KEYS_7_2_4 = {
  Principle: 'principle',
  Rule: 'rule',
  'A typical case': 'typicalCase',
  'The mistake closest to that case': 'closestMistake',
};

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, data) => {
  fs.mkdirSync(f.replace(/\/[^/]*$/, ''), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(data, null, 2) + '\n');
};

// ---------- the report ----------
const R = {};
const note = (cat, line) => (R[cat] ??= []).push(line);

// ---------- inputs ----------
const nf = readJson(T + 'newform.json');
const parts = loadParts(T + 'base-structure.html');
const tables = Object.fromEntries(Object.entries(TABLE_FILES).map(([k, f]) => [k, readJson(T + f)]));
const spec = readJson(SPECS + '_guidelines/spec.json');
const tools = readJson(SPECS + '_guidelines/tools.json');
const project = readJson(SPECS + '_guidelines/project.json');
const decisionsOut = {};
for (let i = 1; i <= 5; i++) {
  for (const [k, v] of Object.entries(readJson(T + `decisions-out-${i}.json`))) {
    if (decisionsOut[k]) note('lacking', `decisions-out-${i}.json: the key "${k}" occurs in two files; both lists are merged`);
    decisionsOut[k] = [...(decisionsOut[k] || []), ...v];
  }
}
const sectionPurposes = readJson(T + 'section-purposes.json');
const todosEn = readJson(T + 'todos-en.json');

// The present rules the new specification drops: why, the node replacing each where the evidence names one, and the evidence.
const ARCHIVE = {
  '1.10': {
    replacedBy: 's-x4zcbk5ekebd9ua',
    reason: 'The owner removed the rule, since it repeated the rule that everything bearing on a node is kept in that node, and the schema.',
    evidence: [
      't25-one-thought.md: "9.1, "A decision lives on the rule it settled" (current 1.10, s-gqbj8849rf224qa), is deleted on the owner\'s instruction since it repeated 1.2.4 and the schema … the reason of tools 5 (s-k4nqjr96ux7a5m7, with its citations) are retargeted to s-x4zcbk5ekebd9ua on the owner\'s behalf".',
      'Draft 1.2.4 (s-x4zcbk5ekebd9ua) states the content: the decisions taken on a node are kept in that node, and none of it is kept in a separate document.',
    ],
  },
  '1.15': {
    replacedBy: 's-eferktypcj7njt5',
    reason: 'The owner removed the rule, since it only restated the schema.',
    evidence: ['t25-one-thought.md: "Former 8.6, A member of `TextRule.list` may be an object (current 1.15, s-v7vd4ydrwexsgsj), is deleted on the owner\'s instruction, since "it only restates the schema" …; at the move it goes to the archive with that reason, replaced by 5.1 (s-eferktypcj7njt5)".'],
  },
  '1.18': {
    replacedBy: 's-5x737t9nee4zgaa',
    reason: 'The owner removed the rule as a duplicate of the rules on what the base specification states and on what the technical appendix describes.',
    evidence: ['t25-one-thought.md: "The former 4.4 (current 1.18, "no figure of one instance") is deleted by the owner as a duplicate of 1.1.4 and 1.1.5; at the move it goes to the archive, with s-5x737t9nee4zgaa as its replacement."'],
  },
  '1.28': {
    reason: 'The owner removed the values that the domains add to a field as a source of the field\'s values, since the contracts section now holds only fragments of a format, which refer only to other fragments.',
    evidence: [
      'Changes of draft 12.7: the source "values that the domains add" is removed by the owner\'s decision of 16 November, since the contracts section holds only fragments of a format; "with it go 12.14 and 12.15 (the present 1.28 and 1.29)".',
      't25-one-thought.md: "The owner\'s agreement to 12.7 covered the removal of 12.14 and 12.15 (the existing 1.28 and 1.29)". No replacement is named.',
    ],
  },
  '1.29': {
    reason: 'The owner removed the values that the domains add to a field as a source of the field\'s values, since the contracts section now holds only fragments of a format, which refer only to other fragments.',
    evidence: ['The same evidence as for 1.28: the changes of draft 12.7 and t25-one-thought.md remove 1.28 and 1.29 together. No replacement is named.'],
  },
  '1.32': {
    replacedBy: 's-xfu2gpzddjnmgks',
    reason: 'The owner removed the rule, since the values of a field now come from the field\'s own list, declared with the field, or are read from the specification.',
    evidence: [
      'The coordinator\'s instruction of the third pass names 12.7 (s-xfu2gpzddjnmgks).',
      't25-one-thought.md: "The owner agreed on 2026-11-18 («ок») to remove 12.9 (the existing 1.32)", after the agent noted that "under the agreed 12.7 the values come from the field\'s own list, which is declared with the field, or from the names of the parts … or the sids of the nodes of a project\'s own kind, which are read from the specification".',
    ],
  },
  '1.37': {
    replacedBy: 's-7vm323mhry2enx3',
    reason: 'The owner found the rule a duplicate of the rules on terms. Its two remaining statements and its reason moved to the rule on RecordType.',
    evidence: [
      't25-one-thought.md: "the owner found the node on entities (current 1.37, sid s-ce9wbaut6edfuy8) a duplicate of 3.2 and 3.3; its two statements and its reason were moved here. At the move into spec.json: 1.37 goes to the archive, with s-7vm323mhry2enx3 as its replacement, joined to it by a supersedes link".',
      'Changes of draft 12.1: "the node «An entity is declared once» (the present 1.37) duplicated 3.2 and 3.3 and is removed; its two sentences … and its reason are moved here"; "the present 1.37 goes to the archive, naming this node as its replacement".',
    ],
  },
  '1.39': {
    replacedBy: 's-8ht2hn88cu2qwz9',
    reason: 'The owner ruled that a RecordType of one domain does not name a RecordType of another domain, so the rule on naming such RecordTypes through the sections a domain\'s header declares was removed.',
    evidence: [
      't25-one-thought.md: "node 1.39 is moved to the archive with the reason for its removal and with node 12.3.5 as its replacement … Node 12.3.5 takes the place of 1.39"; 12.3.5 was then the node now numbered 12.10, "What a RecordType may refer to".',
      'Changes of draft 12.10 (s-8ht2hn88cu2qwz9): "It stands in the place of the present 1.39, which goes to the archive. At the move, the archive entry of 1.39 names this node as its replacement." The structure page says the same of row 12.10.',
      'Against it: an older note in the changes of draft 12.1 says that 1.39 goes to the archive naming 12.1 as its replacement, when 12.1 held 1.39\'s paragraphs. The agreed 12.1 no longer holds them.',
    ],
  },
  '5.3': {
    replacedBy: 's-m4h279nbaqkpa3t',
    reason: 'The rule moved into the rule on what the checks enforce and when they run, which now says that no test has to pass while the specification is a draft.',
    evidence: [
      'The coordinator\'s instruction names 1.6.1 (s-m4h279nbaqkpa3t).',
      'Changes of drafts 1.3.2 and 1.3.3: the citation of the former 5.3 "is replaced by a citation of 1.6.1, where the same is now said"; changes of 1.6.1: its reason now states the ground "instead of a citation of the former 5.3, which goes to the archive".',
      'An older note in t25-one-thought.md names s-utvqbypzhmgndug (1.3.2) as the replacement instead.',
    ],
  },
  '6.5': {
    reason: 'The owner removed the rule, since other rules cover what it said about names.',
    evidence: ['t25-one-thought.md: "the node on names and descriptions was removed on the owner\'s instruction, covered by 1.2.2, 6.3, 7.7, 3.2, 10.4; at the move current 6.5 (s-ybq7wbhkrh5pjqs) goes to the archive". Those numbers belong to an earlier numbering of the drafts, and several nodes cover it, so no replacement is named.'],
  },
  '6.6': {
    reason: 'The owner removed the rule, since it led to reasons written paragraph by paragraph.',
    evidence: ['t25-one-thought.md: "Current 6.6 (s-hwnzhgw5b683fc7, "no narrower than the rule") is removed on the owner\'s instruction, since it led to reasons written paragraph by paragraph; at the move it goes to the archive". No replacement is named.'],
  },
};

function loadParts(file) {
  const html = fs.readFileSync(file, 'utf8');
  const start = html.indexOf('const parts = ') + 'const parts = '.length;
  let depth = 0, i = start, inStr = null, esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[') depth++;
    if (c === ']' && --depth === 0) break;
  }
  return vm.runInNewContext('(' + html.slice(start, i + 1) + ')');
}

const flatten = (nodes) => {
  const all = [];
  const walk = (n) => { all.push(n); for (const c of n.children || []) walk(c); };
  for (const n of nodes) walk(n);
  return all;
};
const presentAll = flatten(spec.nodes);
const presentBySid = new Map(presentAll.map((n) => [n.sid, n]));
const presentByNum = new Map(presentAll.map((n) => [n.location.replace(/^_guidelines\/spec\/?/, ''), n]));
const numOfPresent = (n) => n.location.replace(/^_guidelines\/spec\/?/, '') || '(root)';
const toolsAll = flatten(tools.nodes);
const toolsSids = new Set(toolsAll.map((n) => n.sid));
const projectSids = new Set(flatten(project.nodes).map((n) => n.sid));

// Every sid-like string any input holds is taken; a new sid avoids them all.
const taken = new Set();
for (const f of [T + 'newform.json', T + 'base-structure.html', ...Object.values(TABLE_FILES).map((f) => T + f),
  SPECS + '_guidelines/spec.json', SPECS + '_guidelines/tools.json', SPECS + '_guidelines/project.json', SPECS + '_approvals.jsonl']) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(SID_RE)) taken.add(m[0]);
}
const previousNew = fs.existsSync(OUT + 'new-sids.json') ? readJson(OUT + 'new-sids.json') : {};
const newSids = {};
const assigned = new Set();
function assignSid(location) {
  let sid = previousNew[location];
  if (!sid || taken.has(sid) || assigned.has(sid)) {
    do sid = 's-' + Array.from({ length: 15 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join('');
    while (taken.has(sid) || assigned.has(sid));
  }
  assigned.add(sid);
  newSids[location] = sid;
  return sid;
}

// ---------- numbers and locations ----------
const fileOf = (num) => EXT[num.split('.')[0]] || 'spec';
const locOf = (num) => (fileOf(num) === 'spec' ? `_guidelines/spec/${num}` : `_guidelines/extensions/${fileOf(num)}/${num}`);
const parentNum = (num) => num.split('.').slice(0, -1).join('.');
function cmpNum(a, b) {
  const A = a.split('.'), B = b.split('.');
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    if (A[i] === undefined) return -1;
    if (B[i] === undefined) return 1;
    const [, an, as] = A[i].match(/^(\d+)(.*)$/), [, bn, bs] = B[i].match(/^(\d+)(.*)$/);
    if (+an !== +bn) return +an - +bn;
    if (as !== bs) return as < bs ? -1 : 1;
  }
  return 0;
}

// ---------- side information on each built node ----------
const info = new Map(); // node -> { src, key, present, rests, extraLinks, expected, agreed, impl, num }
const bindings = {};
const agreedBy = new Map();

function keptMeta(present, extraDecisions, extraTodos) {
  const meta = {};
  const pm = present?.meta || {};
  if (pm.code || pm.tests) {
    bindings[present.sid] = {};
    if (pm.code) bindings[present.sid].code = pm.code;
    if (pm.tests) bindings[present.sid].tests = pm.tests;
  }
  for (const k of Object.keys(pm)) if (!['decisions', 'todos', 'comments', 'code', 'tests'].includes(k)) note('meta', `${present.sid}: present meta key \`${k}\` dropped`);
  const decisions = [...(pm.decisions || []), ...extraDecisions];
  const todos = [...(pm.todos || []), ...extraTodos];
  if (decisions.length) meta.decisions = decisions;
  if (todos.length) meta.todos = todos;
  if (pm.comments?.length) meta.comments = pm.comments;
  return Object.keys(meta).length ? meta : undefined;
}

const decisionTypes = {};
const newDecisions = new WeakSet(); // decisions written in this pass, whose locations are replaced by titles and sids
function mapDecisions(list, where) {
  return (list || []).map((d) => {
    const t = d.type === undefined ? '(none)' : d.type;
    decisionTypes[t] = (decisionTypes[t] || 0) + 1;
    const extra = Object.keys(d).filter((k) => !['date', 'problem', 'ruling', 'type'].includes(k));
    if (extra.length) note('lacking', `${where}: a decision has fields ${extra.join(', ')}, left out`);
    if (!d.date || !d.problem || !d.ruling) note('lacking', `${where}: a decision lacks its date, problem or ruling`);
    const out = { date: d.date, problem: d.problem, ruling: d.ruling, type: 'textual' };
    newDecisions.add(out);
    return out;
  });
}

const untranslated = {};
function mapTodos(list, where, location) {
  const out = [];
  const russian = (text) => {
    if (todosEn[text]) {
      out.push({ date: TODAY, by: 'agent', text: todosEn[text] });
      note('todosEn', `${where}: «${text}» → "${todosEn[text]}"`);
    } else {
      (untranslated[location] ??= []).push(text);
      note('todosRu', `${where}: «${text}»`);
    }
  };
  for (const t of list || []) {
    if (typeof t === 'string') {
      if (CYRILLIC.test(t)) { russian(t); continue; }
      out.push({ date: TODAY, by: 'agent', text: t });
    } else {
      if (CYRILLIC.test(t.text)) { russian(t.text); continue; }
      out.push({ date: t.date || TODAY, by: t.by || 'agent', text: t.text });
      if (t.date && t.by) note('decisions', `${where}: its todo already carries date ${t.date} and by "${t.by}", which are kept rather than replaced by ${TODAY} and "agent".`);
    }
  }
  return out;
}

function resolve(d, field, key) {
  const v = d[field];
  if (typeof v === 'string' && v.startsWith('=')) {
    const p = presentByNum.get(v.slice(1));
    if (!p || p[field] === undefined) { note('lacking', `${key}: \`${field}\` is ${v}, which names no present field`); return undefined; }
    note('equals', `${key}: \`${field}\` taken from present ${v.slice(1)} (${JSON.stringify(p[field]).slice(0, 90)})`);
    return p[field];
  }
  return v;
}

// ---------- rules from drafts ----------
const cellOf = new Map(); // draft key of a node in a cell -> key of the draft holding the table
for (const [k, d] of Object.entries(nf)) {
  if (!d.table) continue;
  for (const row of d.table.rows) for (const c of row) if (c.node) cellOf.set(c.node, k);
}
const used = new Set();

function draftSid(key, location) {
  const d = nf[key];
  let sid = d.sidValue;
  if (!sid) {
    if (d.sid === 'kept' && d.from && presentByNum.get(d.from)) {
      sid = presentByNum.get(d.from).sid;
      note('lacking', `${key}: no \`sidValue\`; keeps ${sid}, the sid of present ${d.from}, its \`from\``);
    } else {
      sid = assignSid(location);
      note('lacking', `${key}: no \`sidValue\` and \`sid\` is "${d.sid}"; given the new sid ${sid}`);
    }
  }
  const present = presentBySid.get(sid);
  if (d.sid === 'kept' && !present) note('lacking', `${key}: \`sid\` is "kept" but ${sid} is no present node`);
  if (d.sid === 'new' && present) note('lacking', `${key}: \`sid\` is "new" but ${sid} is present ${numOfPresent(present)}; treated as kept`);
  if (present && d.from && presentByNum.get(d.from)?.sid !== sid) note('equals', `${key}: keeps the sid of present ${numOfPresent(present)}, though its \`from\` is ${d.from}`);
  return { sid, present };
}

function fromDraft(key, inCell = false) {
  const d = nf[key];
  used.add(key);
  const location = locOf(key);
  const { sid, present } = draftSid(key, location);
  const title = resolve(d, 'title', key);
  const text = resolve(d, 'text', key);
  const reason = resolve(d, 'reason', key);
  let examples = resolve(d, 'examples', key);
  if (typeof examples === 'string') {
    note('lacking', `${key}: \`examples\` is a string, not an array; written as an array holding that one string`);
    examples = [examples];
  }
  const list = d.list !== undefined ? resolve(d, 'list', key) : undefined;
  const node = { location, sid, kind: d.table ? 'TableRule' : 'TextRule' };
  if (!inCell) node.title = title;
  node.status = 'draft';
  node.text = text;
  node.refs = [];
  if (reason !== undefined) node.reason = reason;
  if (examples !== undefined) node.examples = examples;
  if (list !== undefined) node.list = list;
  if (d.table) {
    node.columns = d.table.columns.map((c) => {
      if (!COLUMN_KEYS_7_2_4[c.en]) note('lacking', `${key}: no key chosen for the column "${c.en}"`);
      return { key: COLUMN_KEYS_7_2_4[c.en], heading: c.en, holds: c.holds };
    });
    const rows = d.table.rows.map((row, ri) => {
      const cells = {};
      row.forEach((c, ci) => {
        const col = node.columns[ci];
        if (c.node) {
          if (col.holds !== 'node') note('lacking', `${key}: row ${ri + 1}, column "${col.heading}" holds a node though the column holds text`);
          const cell = fromDraft(c.node, true);
          cells[col.key] = { node: cell };
          const titleCell = node.columns[0].holds === 'text' ? row[0] : null;
          const draftTitle = nf[c.node].title;
          if (titleCell && titleCell.en === draftTitle) note('cellTitles', `${c.node}: its title "${draftTitle}" is left out; the "${node.columns[0].heading}" cell of its row reads the same`);
          else note('words', `${c.node}: its draft title "${draftTitle}" is left out, and no cell of its row reads the same`);
        } else {
          if (col.holds !== 'text') note('lacking', `${key}: row ${ri + 1}, column "${col.heading}" holds text though the column holds nodes`);
          cells[col.key] = { text: c.en };
        }
      });
      return { cells };
    });
    node.groups = [{ heading: null, rows }];
  }
  const meta = keptMeta(present, mapDecisions(d.decisions, key), []);
  if (meta) node.meta = meta;
  info.set(node, {
    src: 'draft', key, present, num: key, extraCites: d.cites || [], extraLinks: d.links || [],
    expected: { title, text, reason, examples, list }, agreed: d.agreed,
  });
  if (!d.agreed) note('agreed', `${key}: no \`agreed\` date`);
  return node;
}

// ---------- the three tables of checks ----------
function fromTable(num) {
  const t = tables[num];
  const h = t.head;
  const present = presentBySid.get(h.sid);
  if (h.kind !== 'TableRule') note('lacking', `table ${num}: head kind is ${h.kind}`);
  const location = locOf(num);
  const node = { location, sid: h.sid, kind: 'TableRule', title: h.title, status: 'draft', text: h.text, refs: [] };
  if (h.reason !== undefined) node.reason = h.reason;
  if (h.examples !== undefined) node.examples = h.examples;
  if (h.columns.length !== 2 || !/^a node/.test(h.columns[0].holds) || !/^text/.test(h.columns[1].holds)) note('lacking', `table ${num}: its head's columns are not a node column followed by a text column`);
  node.columns = [
    { key: 'check', heading: h.columns[0].en, holds: 'node' },
    { key: 'cost', heading: h.columns[1].en, holds: 'text' },
  ];
  const single = t.tables.length === 1;
  if (!single && h.groups) {
    t.tables.forEach((g, i) => { if (h.groups[i]?.en !== g.heading) note('lacking', `table ${num}: group ${i + 1} is headed "${g.heading}" but the head names "${h.groups[i]?.en}"`); });
  }
  if (single && t.tables[0].heading) note('decisions', `table ${num}: its single group is headed "${t.tables[0].heading}", written as null`);
  let last = null, suffix = 0;
  const nums = new Set(t.tables.flatMap((g) => g.rows.map((r) => r.num)).filter(Boolean));
  node.groups = t.tables.map((g) => ({
    heading: single ? null : g.heading,
    rows: g.rows.filter((r) => !(r.fate === 'deleted' || (typeof r.fate === 'string' && r.fate.startsWith('to ')))).map((r) => {
      let rnum = r.num;
      const unnumbered = rnum == null;
      if (rnum == null) {
        rnum = last + String.fromCharCode(97 + suffix++);
        if (nums.has(rnum)) note('lacking', `table ${num}: the number ${rnum} given to a row without one is taken`);
        note('numbered', `table ${num}: the row after ${last} without a number (\`n\` ${r.n}: "${r.en.slice(0, 80)}…") numbered ${rnum}`);
      } else { last = rnum; suffix = 0; }
      const cl = locOf(rnum);
      const cell = { location: cl, sid: assignSid(cl), kind: 'TextRule', status: 'draft', text: r.en, refs: [] };
      if (r.reason !== undefined) cell.reason = r.reason;
      if (r.examples !== undefined) cell.examples = r.examples;
      const meta = {};
      const dec = mapDecisions(r.decisions, `row ${rnum}`);
      const todos = mapTodos(r.todos, `row ${rnum}`, cl);
      if (dec.length) meta.decisions = dec;
      if (todos.length) meta.todos = todos;
      if (Object.keys(meta).length) cell.meta = meta;
      info.set(cell, {
        src: 'row', key: rnum, rests: r.rests || [], num: rnum, table: TABLE_FILES[num].replace('.json', ''), unnumbered,
        expected: { text: r.en, reason: r.reason, examples: r.examples }, agreed: r.agreed, impl: r.impl,
      });
      if (!r.agreed) note('agreed', `row ${rnum}: no \`agreed\` date`);
      if (!r.rests?.length) note('lacking', `row ${rnum}: no \`rests\`, so its check has no \`checks\` link`);
      if (!r.reason) R.noReason = (R.noReason || 0) + 1;
      return { cells: { check: { node: cell }, cost: { text: r.cost } } };
    }),
  }));
  const meta = keptMeta(present, [], []);
  if (meta) node.meta = meta;
  info.set(node, {
    src: 'head', key: `table ${num}`, present, num, extraLinks: h.refs || [], table: TABLE_FILES[num].replace('.json', ''),
    expected: { title: h.title, text: h.text, reason: h.reason, examples: h.examples }, agreed: h.agreed,
  });
  if (!h.agreed) note('agreed', `table ${num}: its head has no \`agreed\` date`);
  return node;
}

// ---------- the tree ----------
const presentRoot = spec.nodes[0];
const root = { ...presentRoot, status: 'draft', children: [] };
if (presentRoot.status !== 'draft') note('decisions', `The root section ${presentRoot.sid} keeps its sid, title, text and refs; its status is written "draft", as the reindex derives it from the draft nodes under it.`);
const files = { spec: [root], domains: [], recordtype: [], views: [] };
const sections = new Map();

function sectionNode(num, title) {
  const location = locOf(num);
  const p = presentByNum.get(num);
  let sid, present = null;
  if (p && p.kind === 'section' && p.title === title) {
    sid = p.sid;
    present = p;
    note('decisions', `Section ${num} "${title}" keeps the sid ${sid} of present section ${num}, which has the same number and title, and its \`meta\`; its text is written "" for now.`);
  } else sid = assignSid(location);
  const node = { location, sid, kind: 'section', title, status: 'draft', text: '', refs: [] };
  const meta = keptMeta(present, [], []);
  if (meta) node.meta = meta;
  node.children = [];
  info.set(node, { src: 'section', key: num, present, num });
  return node;
}

function place(num, node) {
  const pn = parentNum(num);
  if (pn === '') {
    if (fileOf(num) === 'spec') root.children.push(node);
    else files[fileOf(num)].push(node);
    return;
  }
  const parent = sections.get(pn);
  if (!parent) { note('lacking', `${num}: no section ${pn} to stand in`); return; }
  parent.children.push(node);
}

function handleRow(num) {
  if (tables[num]) { place(num, fromTable(num)); if (nf[num]) { used.add(num); note('decisions', `Draft ${num} (an old text form of the main table of checks) is not used; the TableRule comes from ${TABLE_FILES[num]}.`); } return; }
  if (cellOf.has(num)) return; // written as a node in a cell of its table
  if (!nf[num]) { note('lacking', `row ${num} of the structure has no draft and is not a table; left out`); return; }
  if (used.has(num)) { note('lacking', `row ${num} occurs twice in the structure`); return; }
  place(num, fromDraft(num));
}

function visit(g) {
  if (g.n !== undefined) {
    const num = String(g.n);
    const s = sectionNode(num, g.en);
    sections.set(num, s);
    place(num, s);
  }
  for (const r of g.rows || []) handleRow(String(r[0]));
  for (const sub of g.groups || []) visit(sub);
}
for (const p of parts) visit(p);

for (const key of Object.keys(nf).sort(cmpNum)) {
  if (used.has(key)) continue;
  if (cellOf.has(key)) { note('lacking', `${key}: named as a cell of ${cellOf.get(key)} but not written there`); continue; }
  const parent = sections.get(parentNum(key));
  if (!parent) { note('lacking', `draft ${key}: listed by no row, and no section ${parentNum(key)} exists; left out`); continue; }
  const node = fromDraft(key);
  const at = parent.children.findIndex((c) => cmpNum(info.get(c).num, key) > 0);
  parent.children.splice(at < 0 ? parent.children.length : at, 0, node);
  note('decisions', `Draft ${key}, which no row of the structure lists, is placed in section ${parentNum(key)} in number order${at < 0 ? ', last' : ''}.`);
}

// ---------- every output node ----------
const out = []; // { node, file, cell }
const walkOut = (n, file, cell = false) => {
  out.push({ node: n, file, cell });
  for (const g of n.groups || []) for (const r of g.rows) for (const c of Object.values(r.cells)) if (c.node) walkOut(c.node, file, true);
  for (const c of n.children || []) walkOut(c, file);
};
for (const [file, nodes] of Object.entries(files)) for (const n of nodes) walkOut(n, file);
const outBySid = new Map();
for (const o of out) {
  if (outBySid.has(o.node.sid)) note('dups', `${o.node.sid} is held by ${outBySid.get(o.node.sid).node.location} and ${o.node.location}`);
  else outBySid.set(o.node.sid, o);
  if (toolsSids.has(o.node.sid)) note('dups', `${o.node.sid} (${o.node.location}) is also a sid of tools.json`);
  if (projectSids.has(o.node.sid)) note('dups', `${o.node.sid} (${o.node.location}) is also a sid of project.json`);
}

// ---------- second pass: decisions, section texts, citations in meta ----------
const presentDesc = (sid) => (presentBySid.has(sid) ? ` (present ${numOfPresent(presentBySid.get(sid))} "${presentBySid.get(sid).title}")` : '');
const presentNums = new Set(presentAll.map(numOfPresent));
const byNum = new Map();
const byDraft = new Map();
const byRow = new Map();
const byHead = new Map();
const unnumberedRows = {};
for (const o of out) {
  const inf = info.get(o.node);
  if (!inf) continue;
  if (inf.num) byNum.set(inf.num, o.node);
  if (inf.src === 'draft') byDraft.set(inf.key, o.node);
  if (inf.src === 'row') {
    byRow.set(`${inf.table}:${inf.num}`, o.node);
    if (inf.unnumbered) (unnumberedRows[inf.table] ??= []).push(o.node);
  }
  if (inf.src === 'head') byHead.set(inf.table, o.node);
}

// Writes a node's meta in its place among the keys, before the nodes under it.
function setMeta(node, meta) {
  const children = node.children;
  delete node.children;
  delete node.meta;
  if (meta && Object.keys(meta).length) node.meta = meta;
  if (children) node.children = children;
}

let merged = 0;
const mergedNodes = new Set();
for (const [key, list] of Object.entries(decisionsOut)) {
  const row = key.match(/^row (.+) of (table-[\d-]+)$/);
  const head = key.match(/^head of (table-[\d-]+)$/);
  let targets;
  if (row) targets = row[1] === '(unnumbered)' ? unnumberedRows[row[2]] || [] : [byRow.get(`${row[2]}:${row[1]}`)].filter(Boolean);
  else if (head) targets = [byHead.get(head[1])].filter(Boolean);
  else targets = [byDraft.get(key)].filter(Boolean);
  if (!targets.length) { note('lacking', `decisions-out: the key "${key}" names no node of the output; its ${list.length} decisions are left out`); continue; }
  if (row?.[1] === '(unnumbered)') note('decisions2', `The ${list.length} decisions under "${key}" are written on both rows without a number of their own, ${targets.map((t) => info.get(t).num).join(' and ')}, since the key holds the decisions for both.`);
  if (!list.length) continue;
  for (const t of targets) {
    const held = t.meta?.decisions || [];
    const words = (s) => new Set(s.toLowerCase().match(/[a-z]{4,}/g) || []);
    const shared = (a, b) => { const A = words(a), B = words(b); let k = 0; for (const w of A) if (B.has(w)) k++; return k / Math.max(1, Math.min(A.size, B.size)); };
    for (const d of list) {
      for (const e of held) {
        if (e.date === d.date && e.problem === d.problem && e.ruling === d.ruling) note('dupDecisions', `"${key}", ${d.date}: "${d.problem}"`);
        else if (e.date === d.date && shared(e.problem + ' ' + e.ruling, d.problem + ' ' + d.ruling) > 0.5) note('nearDecisions', `"${key}", ${d.date}: the node holds "${e.problem}"; the file adds "${d.problem}"`);
      }
    }
    const decs = list.map((d) => {
      if (!['textual', 'procedural'].includes(d.type)) note('lacking', `decisions-out "${key}": a decision of ${d.date} has the type "${d.type}"`);
      const x = { date: d.date, problem: d.problem, ruling: d.ruling, type: d.type };
      newDecisions.add(x);
      return x;
    });
    setMeta(t, { ...t.meta, decisions: [...(t.meta?.decisions || []), ...decs] });
    const { decisions, todos, comments } = t.meta;
    setMeta(t, { decisions, ...(todos ? { todos } : {}), ...(comments ? { comments } : {}) });
    merged += decs.length;
    mergedNodes.add(t);
  }
}

// A location in a decision written in this pass becomes the node's title and its bare sid.
const LOCATION = /(?<![\w.\/§-])(\d{1,2}(?:\.\d{1,2}){1,3}[a-z]?)(?![\w]|\.\d)/g;
const CONTEXT = { '3.2': /rules on terms/, '3.3': /rules on terms/ }; // numbers in both numberings, told apart by the words around them
const firstWords = (t) => t.replace(/§(?=s-)/g, '').split(/\s+/).slice(0, 8).join(' ').replace(/[,;:.]+$/, '') + '…';
const label = (n) => `"${n.title ?? firstWords(n.text)}" (${n.sid})`;
function relocate(text, node, d, field) {
  return text.replace(LOCATION, (all, num, idx) => {
    const before = text.slice(Math.max(0, idx - 40), idx);
    const around = before + text.slice(idx, idx + 40);
    const where = `${node.location}, the decision of ${d.date}, its ${field}`;
    if (/tools[\/ ]$|appendix of the tools,? $/i.test(before)) { note('relocLeft', `${where}: "${num}" is a number of the appendix of the tools; left as it is`); return all; }
    const target = byNum.get(num);
    if (!target) { note('relocLeft', `${where}: "${num}" is ${presentNums.has(num) ? `a location of the present spec.json only (${presentByNum.get(num).title})` : 'no location of the output'}; left as it is`); return all; }
    if (presentNums.has(num)) {
      if (!CONTEXT[num]?.test(around)) { note('relocLeft', `${where}: "${num}" is a location both of the output (${label(target)}) and of the present spec.json ("${presentByNum.get(num).title}"); left as it is`); return all; }
      note('relocContext', `${where}: "${num}" is a location both of the output and of the present spec.json ("${presentByNum.get(num).title}"). The words around it, "…${around.replace(/\s+/g, ' ')}…", match only the output's node, so it is replaced.`);
    }
    note('reloc', `${where}: "${num}" → ${label(target)}`);
    return label(target);
  });
}
for (const o of out) {
  for (const d of o.node.meta?.decisions || []) {
    if (!newDecisions.has(d)) continue;
    d.problem = relocate(d.problem, o.node, d, 'problem');
    d.ruling = relocate(d.ruling, o.node, d, 'ruling');
  }
}

// Section texts.
for (const [num, s] of sections) {
  if (sectionPurposes[num] === undefined) { note('lacking', `section ${num}: section-purposes.json gives it no text; it stays ""`); continue; }
  s.text = sectionPurposes[num];
}
for (const k of Object.keys(sectionPurposes)) if (!sections.has(k)) note('lacking', `section-purposes.json: "${k}" names no section of the output`);

// A citation in meta that would make a link the base may not hold, or a link to a node that is gone, is written bare.
for (const o of out) {
  if (!o.node.meta) continue;
  const fix = (s, path) => s.replace(SID_CITED, (all, sid) => {
    const t = outBySid.get(sid);
    let why = null;
    if (!t && !toolsSids.has(sid) && !projectSids.has(sid)) why = `names a node no longer in the output${presentDesc(sid)}`;
    else if (t && o.file === 'spec' && t.file !== 'spec') why = `names ${t.node.location}, a node of the ${t.file} extension, from the base of the guidelines`;
    else if (t && o.file !== 'spec' && t.file !== 'spec' && t.file !== o.file) why = `names ${t.node.location}, a node of the ${t.file} extension, from the ${o.file} extension`;
    if (!why) return all;
    note('bare', `${o.node.location}: §${sid} in its ${path} ${why}; written bare, as ${sid}`);
    return sid;
  });
  const walk = (v, path) => (typeof v === 'string' ? fix(v, path)
    : Array.isArray(v) ? v.map((x) => walk(x, path))
      : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, `${path}.${k}`)])) : v);
  o.node.meta = walk(o.node.meta, 'meta');
}

// ---------- links ----------
const citedIn = new Map(); // node -> Map(sid -> Set of the fields citing it)
function citations(node) {
  const sids = [];
  const fields = new Map();
  const read = (v, field, inGroups) => {
    if (typeof v === 'string') {
      for (const m of v.matchAll(SID_CITED)) {
        if (!sids.includes(m[1])) sids.push(m[1]);
        if (!fields.has(m[1])) fields.set(m[1], new Set());
        fields.get(m[1]).add(field);
      }
      for (const m of v.matchAll(LOOSE_CITED)) if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(m[1])) note('missing', `${node.location}: \`§${m[1]}\` is not a well-formed sid`);
    } else if (Array.isArray(v)) v.forEach((x) => read(x, field, inGroups));
    else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) if (!(inGroups && k === 'node')) read(x, field === 'meta' ? 'meta.' + k : field, inGroups);
    }
  };
  for (const [k, v] of Object.entries(node)) if (!NOT_CITING.has(k)) read(v, k === 'groups' ? 'a text cell' : k, k === 'groups');
  if (sids.includes(node.sid)) note('self', `${node.location} cites itself; no link is written for that citation`);
  citedIn.set(node, fields);
  return sids.filter((s) => s !== node.sid);
}
const inFields = (node, sid) => {
  const f = citedIn.get(node)?.get(sid);
  return f ? ` (cited in ${[...f].join(', ')})` : '';
};
const where = (sid) => {
  if (outBySid.has(sid)) return outBySid.get(sid).node.location;
  if (toolsSids.has(sid)) return 'tools.json';
  if (projectSids.has(sid)) return 'project.json';
  return null;
};
const wordingFields = ['title', 'text', 'reason', 'examples', 'list', 'columns', 'groups'];

for (const o of out) {
  const n = o.node;
  const inf = info.get(n);
  if (!inf) { // the root
    const c = citations(n);
    if (c.length) note('missing', `root cites ${c.join(', ')} and keeps its refs as they were`);
    continue;
  }
  const cited = citations(n);
  if (inf.src === 'section') {
    if (cited.length) note('missing', `section ${n.location} cites ${cited.join(', ')} but its refs are written []`);
    continue;
  }
  const typed = [];
  const addTyped = (l, why) => { if (!typed.some((t) => t.type === l.type && t.to === l.to)) typed.push(l); else if (why) note('dupLinks', `${n.location}: ${why} ${l.type} → ${l.to} given twice, written once`); };
  for (const r of inf.present?.refs || []) {
    if (!r.to || r.type === 'cites') continue;
    const tf = outBySid.get(r.to)?.file;
    if (tf && o.file === 'spec' && tf !== 'spec') {
      note('droppedCrossing', `${n.location} (${n.sid}, "${n.title ?? firstWords(n.text)}"): the present \`${r.type}\` link to ${r.to}, ${outBySid.get(r.to).node.location} "${outBySid.get(r.to).node.title}", in the ${tf} extension`);
      continue;
    }
    if (outBySid.has(r.to)) addTyped({ type: r.type, to: r.to, ...(r.ratio ? { ratio: r.ratio } : {}) }, 'the present link');
    else note('dropped', `${n.location} (${n.sid}): the present \`${r.type}\` link to ${r.to}${presentDesc(r.to)} is dropped, its target not being in the output`);
  }
  for (const r of inf.extraLinks || []) if (r.to && r.type !== 'cites') addTyped({ type: r.type, to: r.to }, 'the link from the table head');
  for (const s of inf.rests || []) addTyped({ type: 'checks', to: s }, 'the row\'s `rests`');
  const extra = [...(inf.extraCites || []), ...(inf.extraLinks || []).filter((r) => r.type === 'cites').map((r) => r.to)];
  const cites = [...cited];
  for (const s of extra) {
    // A cites link is allowed only where the node cites its target (rule 6.1), so an entry the node no longer cites is not written.
    if (!cited.includes(s)) { note('uncited', `${n.location}: its draft's \`cites\` names ${s}${presentDesc(s)}, which the node does not cite; no \`cites\` link is written for it`); continue; }
    if (!cites.includes(s)) cites.push(s);
  }
  const kept = [];
  for (const s of cites) {
    const t = typed.find((l) => l.to === s);
    if (t) note('typedOverCites', `${n.location}: cites ${s}${inFields(n, s)} and also has a \`${t.type}\` link to it; only the \`${t.type}\` link is written`);
    else kept.push(s);
  }
  n.refs = [...typed, ...kept.map((to) => ({ type: 'cites', to }))];
  for (const l of n.refs) {
    const w = where(l.to);
    const src = l.type === 'cites' ? inFields(n, l.to) : inf.rests?.includes(l.to) && l.type === 'checks' ? ' (from its row\'s `rests`)' : inf.present?.refs.some((r) => r.to === l.to && r.type === l.type) ? ` (a link of present ${numOfPresent(inf.present)})` : ' (from its table head)';
    if (w === null) note('missing', `${n.location} (${n.sid}): its \`${l.type}\` link to ${l.to}${presentDesc(l.to)}${src}: no such node in the output, tools.json or project.json`);
    else if (w === 'tools.json' || w === 'project.json') note('outside', `${n.location}: its \`${l.type}\` link to ${l.to}${src} leads to ${w}`);
    else {
      const tf = outBySid.get(l.to).file;
      if (o.file === 'spec' && tf !== 'spec') note('crossing', `${n.location} (base of the guidelines): its \`${l.type}\` link${src} leads to ${l.to}, ${outBySid.get(l.to).node.location}, in the ${tf} extension`);
      if (o.file !== 'spec' && tf !== 'spec' && tf !== o.file) note('crossing', `${n.location} (the ${o.file} extension): its \`${l.type}\` link${src} leads to ${l.to}, ${outBySid.get(l.to).node.location}, in the ${tf} extension`);
    }
  }
}

// ---------- checks of the output against its sources ----------
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
for (const o of out) {
  const inf = info.get(o.node);
  if (!inf || !inf.expected) continue;
  for (const f of ['title', 'text', 'reason', 'examples', 'list']) {
    const want = inf.expected[f];
    const got = o.node[f];
    if (f === 'title' && o.cell) continue; // reported under cellTitles
    if (same(want, got)) continue;
    if (f === 'examples' && typeof nf[inf.key]?.examples === 'string' && same([nf[inf.key].examples], got)) continue; // reported under lacking
    note('words', `${o.node.location}: \`${f}\` differs from its ${inf.src === 'row' ? 'row' : inf.src === 'head' ? 'table head' : 'draft'}: ${JSON.stringify(want)?.slice(0, 80)} → ${JSON.stringify(got)?.slice(0, 80)}`);
  }
  for (const f of wordingFields) {
    const v = o.node[f];
    if (v !== undefined && CYRILLIC.test(JSON.stringify(v))) note('words', `${o.node.location}: \`${f}\` holds Cyrillic letters`);
  }
}

// ---------- side files ----------
const agreed = {};
const impl = {};
for (const o of out) {
  const inf = info.get(o.node);
  if (!inf || inf.src === 'section') continue;
  if (inf.agreed) agreed[o.node.sid] = inf.agreed;
  if (inf.src === 'row') {
    impl[o.node.sid] = inf.impl || [];
    if (!inf.impl?.length) note('noImpl', `${o.node.location} (row ${inf.key}): its row names no node of the appendix of the tools that implements it`);
  }
}

for (const [sid, date] of Object.entries(agreed)) if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) note('agreed', `${sid}: \`agreed\` is "${date}", not a date`);
// Present lists, and the node of the output that holds a list declared in the same place.
const members = (l) => l.members.map((m) => `\`${typeof m === 'string' ? m : JSON.stringify(m)}\``).join(', ');
for (const p of presentAll) {
  if (!p.list) continue;
  const kept = outBySid.get(p.sid)?.node;
  const same = p.list.declaredIn
    ? out.find((x) => x.node.list && JSON.stringify(x.node.list.declaredIn) === JSON.stringify(p.list.declaredIn))
    : kept?.list ? { node: kept } : null;
  const lines = [`- Present ${numOfPresent(p)} "${p.title}" (${p.sid}): of "${p.list.of}"; members ${members(p.list)}; ${p.list.declaredIn ? `declared at \`${p.list.declaredIn.declaration}\`` : 'declared nowhere yet, so it is matched by its sid'}.`];
  if (kept && kept !== same?.node) lines.push(`  The node keeping its sid, ${kept.location} "${kept.title}", holds ${kept.list ? 'another list' : 'no list'}.`);
  if (!same) lines.push('  No node of the output holds a list declared in the same place.');
  else {
    const was = p.list.members.map(String);
    const now = same.node.list.members.map(String);
    const gone = was.filter((m) => !now.includes(m));
    const added = now.filter((m) => !was.includes(m));
    lines.push(`  ${same.node.location} "${same.node.title}" (${same.node.sid}) now holds it: of "${same.node.list.of}"; members ${members(same.node.list)}.${gone.length ? ` It no longer holds ${gone.map((m) => `\`${m}\``).join(', ')}.` : ''}${added.length ? ` It adds ${added.map((m) => `\`${m}\``).join(', ')}.` : ''}${!gone.length && !added.length ? ' Its members are the same.' : ''}`);
  }
  note('listsDetail', lines.join('\n'));
}
// Each list of the output declared in the schema holds exactly the values of the enum it points to (rule 5.1 makes the schema part of the specification).
for (const o of out) {
  const d = o.node.list?.declaredIn;
  if (!d || !/^specs\/_schema\//.test(d.file)) continue;
  const path = OUT + d.file.replace(/^specs\//, 'specs/');
  if (!fs.existsSync(path)) { note('listsSchema', `${o.node.location}: its list is declared in ${d.file}, which the output does not hold`); continue; }
  const at = d.declaration.replace(/^#\//, '').split('/').reduce((v, k) => v?.[k.replace(/~1/g, '/').replace(/~0/g, '~')], readJson(path));
  const values = at?.enum;
  const listed = o.node.list.members;
  if (!values) note('listsSchema', `${o.node.location}: \`${d.declaration}\` in ${d.file} holds no enum`);
  else if (JSON.stringify(values) === JSON.stringify(listed)) note('listsSchema', `${o.node.location} "${o.node.title}": its list and the enum at \`${d.declaration}\` in moved/${d.file} hold the same values, in the same order (${values.join(', ')}).`);
  else note('listsSchema', `${o.node.location} "${o.node.title}": its list (${listed.join(', ')}) and the enum at \`${d.declaration}\` in moved/${d.file} (${values.join(', ')}) DIFFER`);
}

// present rules and sections not in the output; the rules go to the archive
const archive = [];
for (const p of presentAll) {
  if (outBySid.has(p.sid)) continue;
  if (p.kind === 'section') { note('goneSections', `present ${numOfPresent(p)} ${p.sid} "${p.title}"`); continue; }
  note('goneRules', `present ${numOfPresent(p)} ${p.sid} "${p.title}"`);
  if (p.meta?.code || p.meta?.tests) note('goneBindings', `present ${numOfPresent(p)} ${p.sid}: ${p.meta.tests?.length || 0} tests and ${p.meta.code?.length || 0} code entries bound to it`);
  const a = ARCHIVE[numOfPresent(p)];
  if (!a) { note('archive', `present ${numOfPresent(p)} ${p.sid}: no reason for its removal is known; it is not archived`); continue; }
  const node = structuredClone(p);
  delete node.children;
  delete node.sid; // an archived node has no sid of its own (rule 2.6)
  const incoming = node.refs.filter((r) => r.from).length;
  node.refs = node.refs.filter((r) => r.to);
  node.archived = { date: TODAY, reason: a.reason, ...(a.replacedBy ? { replacedBy: a.replacedBy } : {}) };
  archive.push(node);
  const rep = a.replacedBy ? outBySid.get(a.replacedBy)?.node : null;
  if (a.replacedBy && !rep) note('archiveProblems', `${numOfPresent(p)}: its replacement ${a.replacedBy} is not in the output`);
  if (rep && outBySid.get(a.replacedBy).file !== 'spec') note('archiveProblems', `${numOfPresent(p)} (${p.sid}), a rule of the base, names as its replacement ${rep.location} "${rep.title}" (${rep.sid}), a node of the ${outBySid.get(a.replacedBy).file} extension. \`replacedBy\` is not a link, so rule 1.7.3 does not forbid it, but a project without that extension finds no replacement.`);
  note('archive', [
    `#### Present ${numOfPresent(p)} "${p.title}" (${p.sid})`,
    '',
    `- Replaced by: ${rep ? `${rep.location} "${rep.title}" (${rep.sid})` : 'none named, so `replacedBy` is left out'}.`,
    `- Reason written: "${a.reason}"`,
    `- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): ${incoming}. Outgoing links kept: ${node.refs.length}.`,
    ...a.evidence.map((e) => `- Evidence: ${e}`),
  ].join('\n'));
}
for (const n of archive) if ('sid' in n) note('dups', `${n.location}: an archived node still holds a sid`);
for (const t of toolsAll) {
  for (const r of t.refs || []) {
    if (!r.to || toolsSids.has(r.to) || outBySid.has(r.to) || projectSids.has(r.to)) continue;
    note('toolsLinks', `tools ${t.location.replace('_guidelines/tools/', '')} ${t.sid} "${t.title}": \`${r.type}\` → ${r.to}${presentDesc(r.to)}`);
  }
}

// ---------- writing ----------
writeJson(OUT + 'specs/_guidelines/spec.json', { schemaVersion: 1, scope: '_guidelines', section: 'spec', nodes: files.spec });
for (const name of ['domains', 'recordtype', 'views']) {
  writeJson(OUT + `specs/_guidelines/extensions/${name}.json`, { schemaVersion: 1, scope: '_guidelines/extensions', section: name, nodes: files[name] });
}
writeJson(OUT + 'new-sids.json', newSids);
writeJson(OUT + 'agreed.json', agreed);
writeJson(OUT + 'impl.json', impl);
writeJson(OUT + 'present-bindings.json', bindings);
writeJson(OUT + 'specs/_archive/guidelines.json', { schemaVersion: 1, scope: '_guidelines', section: 'guidelines', nodes: archive });
if (Object.keys(untranslated).length) writeJson(OUT + 'untranslated-todos.json', untranslated);
else if (fs.existsSync(OUT + 'untranslated-todos.json')) fs.rmSync(OUT + 'untranslated-todos.json');

// ---------- validation ----------
// Each file is validated against the schema composed for it: the schema of the guidelines, then the schema of each
// extension of the guidelines the file needs, in the way stage 3 has the tools compose them (see the report).
const require = createRequire('D:/SpecSheriff/package.json');
const { Ajv2020 } = require('ajv/dist/2020.js');
const S = OUT + 'specs/_schema/';
const EXTENSION_SCHEMAS = { domains: 'extensions/domains.schema.json', recordtype: 'extensions/recordtype.schema.json' };
const validation = [];
function composeSchemas(names, opts = { strict: false }) {
  const node = readJson(S + 'node.schema.json');
  const file = readJson(S + 'section-file.schema.json');
  const archiveFile = readJson(S + 'archive-file.schema.json');
  const refused = [];
  const kinds = node.$defs.base.properties.kind.enum;
  const linkTypes = node.$defs.ref.properties.type.enum;
  const onKind = (kind, schema) => ({ if: { properties: { kind: { const: kind } }, required: ['kind'] }, then: schema });
  for (const name of names) {
    if (!EXTENSION_SCHEMAS[name]) continue; // an extension that adds nothing to the schema has no schema file
    const ext = readJson(S + EXTENSION_SCHEMAS[name]);
    for (const [kind, { schema }] of Object.entries(ext.kinds || {})) {
      if (kinds.includes(kind)) refused.push(`${name}: the kind ${kind} is already composed`);
      else { kinds.push(kind); node.$defs.node.allOf.push(onKind(kind, schema)); }
    }
    for (const t of ext.linkTypes || []) {
      if (linkTypes.includes(t)) refused.push(`${name}: the type of link ${t} is already composed`);
      else linkTypes.push(t);
    }
    for (const [k, v] of Object.entries(ext.$defs || {})) {
      if (k in node.$defs) refused.push(`${name}: the definition ${k} is already composed`);
      else node.$defs[k] = v;
    }
    for (const [kind, schema] of Object.entries(ext.fields || {})) {
      if (!kinds.includes(kind)) refused.push(`${name}: fields for ${kind}, a kind not composed`);
      else node.$defs.node.allOf.push(onKind(kind, schema));
    }
    for (const [targets, added] of [[[file.properties, archiveFile.properties], ext.file], [[node.$defs.ref.properties], ext.link]]) {
      for (const [p, s] of Object.entries(added?.properties || {})) {
        for (const target of targets) {
          if (p in target) refused.push(`${name}: the property ${p} is already composed`);
          else target[p] = s;
        }
      }
    }
  }
  const ajv = new Ajv2020({ allErrors: true, ...opts });
  ajv.addSchema(node).addSchema(file).addSchema(archiveFile);
  return { file: ajv.getSchema('section-file.schema.json'), archive: ajv.getSchema('archive-file.schema.json'), refused };
}
const errs = (v) => (v.errors || []).slice(0, 8).map((e) => `${e.instancePath || '/'} ${e.message}${e.params?.unevaluatedProperty ? ' ' + e.params.unevaluatedProperty : ''}`).join('; ');
const composed = {
  base: composeSchemas([]),
  domains: composeSchemas(['domains']),
  recordtype: composeSchemas(['recordtype']),
  all: composeSchemas(['domains', 'recordtype']),
};
for (const [k, c] of Object.entries(composed)) for (const r of c.refused) validation.push(`composing ${k}: REFUSED ${r}`);

// The extension files against the format of an extension.
{
  const meta = new Ajv2020({ strict: false, allErrors: true }).compile(readJson(S + 'extension.schema.json'));
  for (const f of Object.values(EXTENSION_SCHEMAS)) validation.push(`_schema/${f} against extension.schema.json: ${meta(readJson(S + f)) ? 'valid' : 'INVALID: ' + errs(meta)}`);
}
const formattedOk = (text) => text === JSON.stringify(JSON.parse(text), null, 2) + '\n' && !text.includes('\r');
const toValidate = [
  ['moved spec.json', OUT + 'specs/_guidelines/spec.json', 'base', 'file'],
  ['moved extensions/domains.json', OUT + 'specs/_guidelines/extensions/domains.json', 'domains', 'file'],
  ['moved extensions/recordtype.json', OUT + 'specs/_guidelines/extensions/recordtype.json', 'recordtype', 'file'],
  ['moved extensions/views.json', OUT + 'specs/_guidelines/extensions/views.json', 'base', 'file'],
  ['moved _archive/guidelines.json', OUT + 'specs/_archive/guidelines.json', 'base', 'archive'],
  ['present tools.json (unchanged)', SPECS + '_guidelines/tools.json', 'base', 'file'],
  ['present project.json (unchanged)', SPECS + '_guidelines/project.json', 'base', 'file'],
];
const composedName = { base: 'the schema of the guidelines alone', domains: 'the guidelines with Domains', recordtype: 'the guidelines with RecordType', all: 'the guidelines with every extension' };
for (const [label, f, schemaKey, which] of toValidate) {
  const text = fs.readFileSync(f, 'utf8');
  const data = JSON.parse(text);
  const v = composed[schemaKey][which];
  const ok = v(data);
  const vAll = composed.all[which];
  const okAll = vAll(data);
  validation.push(`${label}, against ${composedName[schemaKey]} (${which === 'archive' ? 'archive-file' : 'section-file'}.schema.json): ${ok ? 'valid' : 'INVALID: ' + errs(v)}; against ${composedName.all}: ${okAll ? 'valid' : 'INVALID: ' + errs(vAll)}; ${formattedOk(text) ? 'formatted as JSON.stringify(data, null, 2) + "\\n" with LF' : 'NOT formatted as required'}`);
}
for (const f of ['node.schema.json', 'section-file.schema.json', 'archive-file.schema.json', 'extension.schema.json', ...Object.values(EXTENSION_SCHEMAS)]) {
  validation.push(`_schema/${f}: ${formattedOk(fs.readFileSync(S + f, 'utf8')) ? 'formatted as required' : 'NOT formatted as required'}`);
}
// Warnings Ajv logs at its default strictness, for the composition with every extension, against the present schema's.
const warnings = [];
try { composeSchemas(['domains', 'recordtype'], { logger: { log: () => {}, warn: (...a) => warnings.push(a.join(' ')), error: (...a) => warnings.push('error: ' + a.join(' ')) } }).file; } catch (e) { warnings.push('default strictness: ' + e.message); }
const presentWarnings = [];
{
  const ajv = new Ajv2020({ allErrors: true, logger: { log: () => {}, warn: (...a) => presentWarnings.push(a.join(' ')), error: () => {} } });
  ajv.addSchema(readJson(SPECS + '_schema/node.schema.json'));
  ajv.compile(readJson(SPECS + '_schema/section-file.schema.json'));
}
const newWarnings = [...new Set(warnings)].filter((w) => !presentWarnings.includes(w));

// Cases each schema must admit or refuse.
const file = (nodes) => ({ schemaVersion: 1, scope: 'x', section: 'y', nodes });
const rule = (extra = {}) => ({ location: 'x/1', sid: 's-aaaaaaaaaaaaaaa', kind: 'TextRule', title: 'T', status: 'draft', text: 't', refs: [], ...extra });
const without = (o, ...keys) => { const c = { ...o }; for (const k of keys) delete c[k]; return c; };
const cellRule = (extra = {}) => without(rule(extra), 'title');
const table = (cell, extra = {}) => rule({ kind: 'TableRule', columns: [{ key: 'check', heading: 'H', holds: 'node' }, { key: 'cost', heading: 'C', holds: 'text' }], groups: [{ heading: null, rows: [{ cells: { check: { node: cell }, cost: { text: 'refused' } } }] }], ...extra });
const term = (ratio) => rule({ kind: 'term', refs: [{ type: 'term-relation', to: 's-bbbbbbbbbbbbbbb', ratio }] });
const header = (extra = {}) => rule({ kind: 'header', ...extra });
const recordType = (schema, extra = {}) => rule({ kind: 'RecordType', schema, ...extra });
const archived = (extra = {}) => without(rule({ status: 'approved', archived: { date: '2026-11-20', reason: 'Gone.' }, ...extra }), 'sid');
const cases = [
  ['base', 'file', 'a TableRule whose cell holds a node without a title', file([table(cellRule())]), true],
  ['base', 'file', 'a TableRule whose cell holds a node with a title', file([table(rule())]), false],
  ['base', 'file', 'a TableRule whose cell holds a node without a sid', file([table(without(cellRule(), 'sid'))]), false],
  ['base', 'file', 'an ordinary node without a title', file([cellRule()]), false],
  ['base', 'file', 'an ordinary node without a sid', file([without(rule(), 'sid')]), false],
  ['base', 'file', 'a node in a cell with a field nobody declared', file([table(cellRule({ foo: 1 }))]), false],
  ['base', 'file', 'a TextRule with `columns`', file([rule({ columns: [{ key: 'a', heading: 'A', holds: 'text' }] })]), false],
  ['base', 'file', 'a TableRule without `groups`', file([rule({ kind: 'TableRule', columns: [{ key: 'a', heading: 'A', holds: 'text' }] })]), false],
  ['base', 'file', 'a node with an empty example', file([rule({ examples: [''] })]), false],
  ['base', 'file', 'a list with `field`', file([rule({ list: { of: 'x', members: ['a'], field: 'kind' } })]), false],
  ['base', 'file', 'an ordinary node with `archived`', file([rule({ archived: { date: '2026-11-20', reason: 'Gone.' } })]), false],
  ['base', 'file', 'a `checks` link', file([rule({ refs: [{ type: 'checks', to: 's-bbbbbbbbbbbbbbb' }] })]), true],
  ['base', 'file', 'a `supersedes` link', file([rule({ refs: [{ type: 'supersedes', to: 's-bbbbbbbbbbbbbbb' }] })]), false],
  ['base', 'file', 'a `consumes` link, without Domains', file([rule({ refs: [{ type: 'consumes', to: 's-bbbbbbbbbbbbbbb' }] })]), false],
  ['domains', 'file', 'a `consumes` link, with Domains', file([rule({ refs: [{ type: 'consumes', to: 's-bbbbbbbbbbbbbbb' }] })]), true],
  ['base', 'file', 'a ratio 1:0..*', file([term('1:0..*')]), true],
  ['base', 'file', 'a ratio 0..*:2', file([term('0..*:2')]), true],
  ['base', 'file', 'a ratio 1..3:1', file([term('1..3:1')]), true],
  ['base', 'file', 'a ratio 1..N:1, the present notation', file([term('1..N:1')]), false],
  ['base', 'file', 'a ratio 01:1', file([term('01:1')]), false],
  ['base', 'file', 'a decision of type "scope"', file([rule({ meta: { decisions: [{ date: '2026-11-20', problem: 'p', ruling: 'r', type: 'scope' }] } })]), false],
  ['base', 'file', 'a header, without Domains', file([header()]), false],
  ['domains', 'file', 'a header without a level, with Domains', file([header()]), true],
  ['domains', 'file', 'a header with a level and an index, with Domains', file([header({ level: 'core', sections: [{ sid: 's-ccccccccccccccc', title: 'S', text: 't' }] })]), true],
  ['domains', 'file', 'a header with `code`, with Domains', file([header({ code: 'src/x' })]), false],
  ['all', 'file', 'a header with a level, with every extension', file([header({ level: 'core' })]), true],
  ['base', 'file', 'a RecordType, without RecordType', file([recordType({ type: 'object' })]), false],
  ['recordtype', 'file', 'a RecordType with a JSON Schema', file([recordType({ type: 'object', properties: { a: { type: 'string', enum: ['x', 'y'] } }, required: ['a'] }, { chosenBy: ['a'] })]), true],
  ['recordtype', 'file', 'a RecordType without `schema`', file([rule({ kind: 'RecordType' })]), false],
  ['recordtype', 'file', 'a RecordType whose `schema` is no JSON Schema', file([recordType({ type: 12 })]), false],
  ['recordtype', 'file', 'a RecordType with `fields`', file([recordType({}, { fields: [] })]), false],
  ['recordtype', 'file', 'a field whose enum repeats a value', file([recordType({ properties: { a: { enum: ['x', 'x'] } } })]), false],
  ['recordtype', 'file', 'a field with values from the parts and their gathered values', file([recordType({ properties: { domain: { type: 'string', 'x-enumSource': { from: 'parts', gathered: [{ value: 'orders', sid: 's-ddddddddddddddd' }] } } } })]), true],
  ['recordtype', 'file', 'a field with values from the nodes of a kind', file([recordType({ properties: { persona: { type: 'string', 'x-enumSource': { from: 'kind', kind: 'Persona' } } } })]), true],
  ['recordtype', 'file', 'a field with values from a kind that names none', file([recordType({ properties: { persona: { 'x-enumSource': { from: 'kind' } } } })]), false],
  ['recordtype', 'file', 'a field with both an enum and x-enumSource', file([recordType({ properties: { a: { enum: ['x'], 'x-enumSource': { from: 'parts' } } } })]), false],
  ['recordtype', 'file', 'a nested field with both, inside items', file([recordType({ properties: { a: { type: 'array', items: { enum: ['x'], 'x-enumSource': { from: 'parts' } } } } })]), false],
  ['recordtype', 'file', 'a gathered value without its sid', file([recordType({ properties: { a: { 'x-enumSource': { from: 'parts', gathered: [{ value: 'x' }] } } } })]), false],
  ['recordtype', 'file', 'a RecordType variant with answersTo', file([recordType({ properties: { address: { type: 'string' } } }, { answersTo: { channel: 'email' } })]), true],
  ['base', 'archive', 'an archived node without a sid', file([archived()]), true],
  ['base', 'archive', 'an archived node with a sid', file([{ ...archived(), sid: 's-aaaaaaaaaaaaaaa' }]), false],
  ['base', 'archive', 'an archived node without `archived`', file([without(archived(), 'archived')]), false],
  ['base', 'archive', 'an archived node with a link pointing at it', file([archived({ refs: [{ type: 'cites', from: 's-bbbbbbbbbbbbbbb' }] })]), false],
  ['base', 'archive', 'an archived node with a link of its own', file([archived({ refs: [{ type: 'cites', to: 's-bbbbbbbbbbbbbbb' }] })]), true],
  ['base', 'archive', 'an archived node with nodes under it', file([archived({ children: [] })]), false],
  ['base', 'archive', 'an archived node replaced by another', file([archived({ archived: { date: '2026-11-20', reason: 'Gone.', replacedBy: 's-bbbbbbbbbbbbbbb' } })]), true],
  ['recordtype', 'archive', 'an archived RecordType, with RecordType', file([without(recordType({ type: 'object' }, { status: 'approved', archived: { date: '2026-11-20', reason: 'Gone.' } }), 'sid')]), true],
];
for (const [schemaKey, which, label, data, expect] of cases) {
  const v = composed[schemaKey][which];
  const ok = v(data);
  validation.push(`case "${label}" (${composedName[schemaKey]}, ${which === 'archive' ? 'archive-file' : 'section-file'}): ${ok ? 'admitted' : 'refused'}${ok === expect ? ', as it should be' : ' — WRONG' + (ok ? '' : ': ' + errs(v))}`);
}

// ---------- report ----------
const wordingCites = (key) => {
  const n = byDraft.get(key);
  return n ? (JSON.stringify([n.title, n.text, n.reason, n.examples]).match(/§s-[2-9a-hjkmnp-z]{15}/g) || []).map((s) => s.slice(1)) : null;
};
const changedDrafts = [];
for (const key of ['1.3.2', '1.3.3', '1.6.1']) {
  const c = wordingCites(key);
  changedDrafts.push(`${key}: ${c === null ? 'not in the output' : c.includes('s-xhcmchcngykvn2k') ? 'still cites s-xhcmchcngykvn2k' : 'its wording no longer cites s-xhcmchcngykvn2k'}${c?.includes('s-m4h279nbaqkpa3t') ? '; it cites 1.6.1 (s-m4h279nbaqkpa3t)' : ''}.`);
}
{
  const c = wordingCites('7.2.7') || [];
  changedDrafts.push(`7.2.7: ${c.includes('s-8xw4mgvpexyvw5q') ? 'cites SpecTag (s-8xw4mgvpexyvw5q)' : 'does not cite s-8xw4mgvpexyvw5q'}, and ${c.includes('s-7vm323mhry2enx3') ? 'still cites' : 'no longer cites'} RecordType (s-7vm323mhry2enx3).`);
}
const count = (pred) => out.filter(pred).length;
const fileCounts = Object.keys(files).map((f) => `${f}: ${count((o) => o.file === f && o.node.kind === 'section')} sections, ${count((o) => o.file === f && !o.cell && o.node.kind === 'TextRule')} TextRules, ${count((o) => o.file === f && o.node.kind === 'TableRule')} TableRules, ${count((o) => o.file === f && o.cell)} nodes in cells`);
const list = (cat, empty = 'None.') => (R[cat]?.length ? R[cat].map((l) => `- ${l}`).join('\n') : empty);
const md = `# T25, stage 1: the new files of the SpecSheriff guidelines, built from the agreed drafts

Built by \`build-moved.mjs\` on ${TODAY}. Nothing under \`specs/\` or \`skills/\` was changed.

## What was built

- \`moved/specs/_guidelines/spec.json\`: the present root section ${presentRoot.sid} with sections 1 to 10 under it.
- \`moved/specs/_guidelines/extensions/domains.json\` (section 11), \`recordtype.json\` (section 12), \`views.json\` (section 13).
- \`moved/specs/_schema/\`: \`node.schema.json\` (the schema of the guidelines), \`section-file.schema.json\`, \`archive-file.schema.json\`, \`extension.schema.json\` (the format of an extension of the schema), and \`extensions/domains.schema.json\` and \`extensions/recordtype.schema.json\`. These files are written by hand; the build validates them and the files against them (see "Third pass").
- \`moved/new-sids.json\`: ${Object.keys(newSids).length} sids assigned (location → sid).
- \`moved/agreed.json\`: ${Object.keys(agreed).length} nodes (sid → date agreed).
- \`moved/impl.json\`: ${Object.keys(impl).length} nodes in cells (sid → sids of the appendix of the tools).
- \`moved/present-bindings.json\`: ${Object.keys(bindings).length} kept nodes whose present \`meta.code\` or \`meta.tests\` was dropped.
- \`moved/specs/_archive/guidelines.json\`: the ${archive.length} present rules the output drops, each with its \`archived\` field.
${Object.keys(untranslated).length ? '- `moved/untranslated-todos.json`: the todos of rows left out because they are in Russian (location → texts).' : '- `moved/untranslated-todos.json` is no longer written: every Russian todo now has its English translation, taken from `todos-en.json`.'}

Counts, by file:

${fileCounts.map((l) => `- ${l}`).join('\n')}

In all: ${out.length} nodes, the root included; ${count((o) => o.node.kind !== 'section' && !o.cell)} rules outside cells (${Object.keys(nf).length} drafts, of which draft 10.1 is not used); ${count((o) => o.cell)} nodes in cells (${count((o) => o.cell && info.get(o.node).src === 'row')} checks, ${count((o) => o.cell && info.get(o.node).src === 'draft')} rules of 7.2.4). ${R.noReason || 0} checks have no reason of their own, as their rows have none.

## Decisions

- Each node is written with its keys in the order the present files use: location, sid, kind, title, status, text, refs, reason, examples, list, columns, groups, meta, children.
- Rule 7.2.4 is written as a \`TableRule\`, as 8.6 (s-5fewsp22mmdz7y6) and 7.5.3 (s-8bf287g7xtvytjz) require of a rule with a node in a cell. Its draft's table becomes its \`columns\` and one group headed null. The column keys are chosen: Principle → \`principle\`, Rule → \`rule\` (holds nodes), A typical case → \`typicalCase\`, The mistake closest to that case → \`closestMistake\`; each heading is the English one. A text cell holds the English text of its draft cell, and a node cell holds the node built from draft 7.2.4.N, without its title.
- Sections are written with \`refs\` [] and status "draft", and with the text that \`section-purposes.json\` gives under the section's number. The root keeps its present text. Only section 1 keeps a present sid; every other section and subsection has a new one.
- A section's location follows the same pattern as a rule's: \`_guidelines/spec/7.2\`, \`_guidelines/extensions/domains/11\`, \`_guidelines/extensions/domains/11.1\`.
- Rows of the structure in groups without a number (the rows 7.2.5 to 7.2.7, the row 11.3) are placed by their number: each node stands in the section its number names, in the order the structure lists them.
- Citations are read, as 6.3 (s-cxtt6jvhqcey2k9) says and as the present tools do, from every property of a node except its links, the nodes under it, \`sections\` and \`gathered\`. So \`title\` and \`meta\` count as well as text, reason, examples and list. A citation in a text cell of a TableRule (the "On failure" cells and the text cells of 7.2.4) belongs to the TableRule, since the cell is a property of the TableRule, not of the node in the next cell. The column head's note says the cost is part of the check's wording, so the owner may want those links on the check instead.
- The present outgoing links that are not \`cites\` are carried over for every node that keeps a present sid, except those from the base to an extension (see "Second pass"). This gives table 10.1 (s-jau82aq9juv9zzh, present 5.1) the present 5.1's \`implements\` links to the rules of the base it checked, beside the \`checks\` links of its rows.
- A decision from a draft or a row is appended with \`type\` "textual". Types found: ${Object.entries(decisionTypes).map(([k, v]) => `${k} ${v}`).join(', ')}.
- A todo of a row that is a string becomes \`{date: "${TODAY}", by: "agent", text}\`. A todo that is already an object keeps its own date and \`by\`.
- The schema's choices are listed under "Third pass".
${list('decisions', '')}
${R.equals ? '\nFields taken from the present nodes ("=X.Y") and sids kept from another location:\n\n' + list('equals') : ''}
${R.cellTitles ? '\nTitles of the nodes in the cells of 7.2.4, left out as 8.6 requires:\n\n' + list('cellTitles') : ''}

## Second pass

### The drafts the owner changed

${changedDrafts.map((l) => `- ${l}`).join('\n')}

${R.uncited ? `The \`cites\` arrays of some changed drafts still list a sid that the node no longer cites (${R.uncited.length}, listed under Problems). Rule 6.1 (s-sn6au3vcr9uy5pm) allows a \`cites\` link only where the node cites its target, so from this pass on no \`cites\` link is written for such an entry.` : ''}

### Links from the base into an extension (rule 1.7.3, s-chk5hnzmcpeqj25)

Every link that a node of spec.json would carry over from its present node to a node of an extension file is dropped. Dropped (${R.droppedCrossing?.length || 0}):

${list('droppedCrossing')}

In \`meta\`, a citation \`§s-…\` is written bare, as \`s-…\`, where a node of spec.json cites a node of an extension, where a node of one extension cites a node of another (rule 1.7.4, s-kujguh6ceu8pfwq), or where the cited node is no longer in the output. A citation of a node of tools.json or project.json keeps its \`§\`, since those nodes stay. This was done in every text of \`meta\`: decisions, todos and comments (${R.bare?.length || 0}):

${list('bare')}

### Decisions merged from decisions-out-1.json to decisions-out-4.json

${merged} decisions are appended to ${mergedNodes.size} nodes, after the decisions each node already held (those of its present node, then those of its draft or row). Their \`type\` is kept as the files give it. A decision with the same date, problem and ruling as one the node already holds would be a repeat: ${R.dupDecisions ? '\n\n' + list('dupDecisions') + '\n' : 'there is none.'} Decisions of the same date that share more than half of their words with one the node already holds are kept, and listed here so that they can be compared: ${R.nearDecisions ? '\n\n' + list('nearDecisions') + '\n' : 'none.'}

${list('decisions2', '')}

Locations named in these decisions, and in the decisions of the drafts and the rows, are replaced by the node's title in double quotation marks and its bare sid in parentheses. A node in a cell has no title, so its first eight words stand in quotation marks, followed by "…", with any \`§\` before a sid in them left out. The same form is kept inside parentheses, as in \`("Independence of extensions" (s-…))\`. A number is replaced where it is a location of the output and not of the present spec.json. A number that is a location of both is replaced only where the words around it fit only the output's node; it is left otherwise.

Replaced (${R.reloc?.length || 0}):

${list('reloc')}

${R.relocContext ? 'Replaced by the words around them, though both numberings have the number:\n\n' + list('relocContext') + '\n' : ''}
Left as they are, and to be resolved by hand (${R.relocLeft?.length || 0}):

${list('relocLeft')}

### The archive

The archive is \`moved/specs/_archive/guidelines.json\`, \`{schemaVersion: 1, scope: "_guidelines", section: "guidelines", nodes}\`. The scope is the part the nodes come from; the section is the file's name, as in the tools' own tests of the archive. Each node is the present node with \`archived: {date: "${TODAY}", reason, replacedBy}\` added after its other keys, and with two things taken away. Its \`sid\` is dropped, since rule 2.6 (s-f2b5zvc565s242f) says that an archived node has no sid of its own. Its incoming links are dropped, since rule 6.4 (s-bpdqd9v72wg7vsz) says that an archived node holds no link pointing at it. Its outgoing links and its \`meta\` are kept. The archive file is validated against \`archive-file.schema.json\` (see "Third pass"). The sids in the headings below are the present nodes' sids, named here only so that each node can be found; the archive does not hold them.

The evidence comes from the drafts' \`from\` and \`changes\`, from the structure page and from the continuation file \`.ai_docs/t25-one-thought.md\`, which records the owner's rulings. No draft has a dropped rule as its \`from\`.

${(R.archive || []).join('\n\n')}

${R.archiveProblems ? 'To be decided:\n\n' + list('archiveProblems') + '\n- 1.37: the continuation file also says it is "joined to it by a supersedes link". No link of that type is written: 6.1 (s-sn6au3vcr9uy5pm) no longer lists `supersedes`.\n' : ''}
### Lists

The drafts of 1.3.1 and 6.1 now hold lists, which the build copies as wording. Each present list, and the node that now holds a list declared in the same place:

${(R.listsDetail || []).join('\n')}

Each list of the output that is declared in the schema, compared with the enum it points to:

${list('listsSchema')}

### Todos translated from Russian (${R.todosEn?.length || 0})

Each is added to its node's \`meta.todos\` as \`{date: "${TODAY}", by: "agent", text}\`. Where the Russian named a node by a number, the English names it by its sid, written bare: node 7.2.3 of the appendix of the tools is s-j9r8z4xdrfkfs47; "node 2.5" is the rule on the archive, s-f2b5zvc565s242f; the nodes of spec.json that hold the lists, 1.3.1 and 6.1, are s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm, and node 10 of tools.json is s-xr5xxa9cxf2mq5u. In the third pass, the todo of row 10.1.35 was changed to name 1.3.1 (s-tgrnpagrb58tya7) as the node that holds the statuses, in place of s-5ah25f6gy99panq. Its Russian in \`table-10-1.json\` now reads "узлы 1.3.1 и 6.1 spec.json" in place of "узлы 1.5 и 2.2 spec.json". Both numbers were changed, since 2.2 in the new numbering is a different node.

${list('todosEn')}

## Third pass: the schema

The schema in \`moved/specs/_schema/\` is part of the specification (5.1, s-eferktypcj7njt5), so it now says what the agreed drafts say. Each choice below gives the draft it implements and its reason.

### The files and how they compose

- \`node.schema.json\` is the schema of the guidelines. It holds only what the base defines: the kinds \`section\`, \`TextRule\`, \`TableRule\` and \`term\`, and the types of link of 6.1. *Implements 5.1 (s-eferktypcj7njt5)*, which composes the schema of the guidelines with the schema of each chosen extension and with the project's extension. *Reason:* a project that chooses no extension then validates against nothing that an extension defines (1.7.1, s-mbmnsnxenmavu3z: a project uses an extension only by its own choice).
- \`extensions/domains.schema.json\` adds the kind \`header\` and the type of link \`consumes\`, and \`extensions/recordtype.schema.json\` adds the kind \`RecordType\`. The Views extension adds nothing to the schema, so it has no schema file. *Implements 1.7.6 (s-j8y62pa9hzz6nwx)*, by which an extension adds kinds of node, properties and types of link, and 11.1.3 (s-yggv9myedprnaa7), which defines the header and its \`consumes\` links. *Reason:* each extension's schema holds what that extension defines and nothing else (1.7.4, s-kujguh6ceu8pfwq).
- An extension of the guidelines is written in the same format as a project's own extension of the schema, \`extension.schema.json\`: \`kinds\`, each with \`needsCode\` and \`schema\`, \`fields\`, \`file\` and \`link\`. Two fields are added to that format: \`linkTypes\` and \`$defs\`. *Implements 5.2 (s-xm8rz4uupb73gu5)*, by which an extension of the schema adds kinds and properties of nodes, files and links; 8.4 (s-hhnahzmhahf8jht), which declares a kind in \`kinds\` with its \`schema\` and \`needsCode\`; and 6.1 (s-sn6au3vcr9uy5pm), by which an extension or a project's own guidelines may define further types of link. *Reason:* one format and one composition then serve the extensions of the guidelines and a project's own extension alike. The present tools already compose a project's extension this way.
- \`header\` declares \`needsCode: false\` and \`RecordType\` \`needsCode: true\`. *Reason:* a header, like a section, is a container whose status is built from the nodes under it and which nothing implements. The code generated from a RecordType implements it (12.3, s-e877bnfa559tvk9).
- The static list of names that an extension cannot declare now holds only the kinds of the base and the names of earlier releases. A kind, a type of link, a definition or a property already composed is refused at the composition instead. \`fields\` may name any kind already composed. *Reason:* the Domains and RecordType extensions declare \`header\` and \`RecordType\` in the same format, so those names cannot be refused by the format itself. A project that has chosen an extension still cannot declare that extension's kinds again.
- **The composition, which a validator performs, and the tools in stage 3:**
  1. Read \`node.schema.json\`, \`section-file.schema.json\` and \`archive-file.schema.json\`.
  2. For each extension the project has chosen (1.7.5, s-9ttvcwpqkehm58g), read \`_schema/extensions/<name>.schema.json\` where it exists, then read \`specs/_schema/project.schema.json\`. Validate each against \`extension.schema.json\`, and apply its additions:
     - each kind joins \`$defs/base/properties/kind/enum\`, and \`{if: {properties: {kind: {const}}, required: ["kind"]}, then: schema}\` joins \`$defs/node/allOf\`;
     - each type of link joins \`$defs/ref/properties/type/enum\`;
     - each definition joins \`$defs\`;
     - each \`fields\` entry joins \`$defs/node/allOf\` as a condition on its kind;
     - \`file\` joins the properties of both file schemas, and \`link\` the properties of \`$defs/ref\`.
  3. Refuse a name already composed.
  4. Give Ajv the three composed schemas, and validate each file under \`specs/_archive/\` against \`archive-file.schema.json\` and every other file against \`section-file.schema.json\`.

  The present \`schema.ts\` does most of this. Stage 3 has to make these changes to it:
  - add conditions to \`$defs/node/allOf\` instead of the root's \`allOf\`, so that a node in a cell and a node of the archive get them too;
  - read the chosen extensions' schema files;
  - add \`linkTypes\` and \`$defs\`;
  - refuse a redefined kind, type of link or definition;
  - add the archive's schema.

  A reference \`#/$defs/<name>\` in an extension's schema names a definition of the composed \`node.schema.json\`, such as \`#/$defs/sid\` or \`#/$defs/owners\`.
- The build composes the schemas in exactly this way and validates each file against the schema composed for it, and again against the guidelines with every extension.

### The node

- An ordinary node requires a \`sid\` and a \`title\`; a node in a cell requires a \`sid\` and refuses a \`title\`; a node of the archive refuses a \`sid\` and holds no nodes under it. All three share \`$defs/node\`, which no longer requires a \`sid\`. *Implements 8.6 (s-5fewsp22mmdz7y6)* for the cell and 2.6 (s-f2b5zvc565s242f) for the archive.
- \`archived\` is no longer a property of every node. It is defined and required only in \`archive-file.schema.json\`, so a node of the specification that holds it is refused. *Implements 2.6.* *Reason:* the present schema could not tell the archive apart and left that check to \`validate\`; the archive's own schema can.
- A node of the archive refuses a link pointing at it. *Implements 6.4 (s-bpdqd9v72wg7vsz).* It keeps a \`title\` where it has one, but does not require it, since a node archived from a cell has none. It refuses \`children\`, since 2.6 deletes a section outright and archives only rules.
- \`TextRule.list.field\` is removed. No agreed draft or row names it. Draft 8.4 names \`TextRule.list.members\`, \`TextRule.list.property\` and \`TextRule.list.declaredIn\`, which are kept.

### Links

- The types of link of the base are exactly the members of 6.1's list (s-sn6au3vcr9uy5pm), in its order: implements, refines, constrains, exempts, checks, cites, term-relation, uses. \`supersedes\` is removed, which the owner ruled on 2026-11-12. \`consumes\` moves to the Domains extension (11.1.3, s-yggv9myedprnaa7). 6.1's \`declaredIn\` points at \`#/$defs/ref/properties/type\`, and the build compares the two (see "Lists").
- \`ratio\` takes the notation of 6.6 (s-bckzdwd35d2nefa): \`^(0|[1-9][0-9]*)(\\.\\.(0|[1-9][0-9]*|\\*))?:(0|[1-9][0-9]*)(\\.\\.(0|[1-9][0-9]*|\\*))?$\`. Each end is a whole number written without a leading zero, or a range of such numbers whose upper bound may be \`*\`. *Reason:* the pattern cannot compare the two bounds of a range, so \`validate\` has to check that the lower bound is not greater than the upper one (stage 3).

### The Domains extension

- \`level\` is optional. *Implements 11.1.3 (s-yggv9myedprnaa7)* ("its level (optional, used when the domains are visualized)"), 11.2.1 (s-nkyty4dy9x2v2a4) ("A domain's header may contain one of the levels that the specification's owners list in the project's own guidelines") and 11.2.2 (s-4azsb49pj6sech8) ("domains whose header contains no level are all placed in a single row of their own").
- \`code\` is dropped. No agreed draft or row requires a header to say where the domain's code is. A search of the English wording of every draft and every live row of the three tables, for "header" near "code" or "directory", for "a domain's code" and for "where its code", finds nothing.
- \`sections\`, the index, is optional. *Implements 11.1.3* ("Where the domain has sections, the header also carries their index") and 11.1.4 (s-2r59txnms5serdr). The present tools give a header an empty index for validation, which still validates.
- \`owners\` stays. *Implements 11.1.3* ("its owners, where it names them").

### The RecordType extension

- \`RecordType.schema\` is a JSON Schema 2020-12 object, as before. \`chosenBy\`, \`answersTo\` and \`identifiedBy\` stay. *Implements 12.2 (s-6eb92ddch7shuvu) and 12.6 (s-z3dnru6qqdf9m6j).*
- The source of a field's values that are not its own list is written in the keyword \`x-enumSource\`, beside the field's other keywords:
  - \`{"from": "parts"}\` for the names of the parts of the base specification (12.11, s-gqavjzcmubg5pvk);
  - \`{"from": "kind", "kind": "<kind>"}\` for the sids of the nodes of one of the project's own kinds (12.8, s-mt6auv3jz8m5gzh).

  The gathered values are written in the same keyword, as \`"gathered": [{"value", "sid"}]\`, each with the sid of the node it comes from (12.9, s-ju5vcanbjph7mgh). A field's own list stays its \`enum\`. *Implements 12.7 (s-xfu2gpzddjnmgks)*, whose list names the three sources.
  - *Reason for one keyword:* the source and the values gathered from it are read together, by the reader and by the generator, and the tools rewrite the gathered values whenever the source changes.
  - *Reason for the name:* the 2020-12 meta-schema admits an unknown keyword, and the prefix \`x-\` keeps it clear of any keyword a later release of JSON Schema defines.
- \`recordFormat\` checks every schema within a RecordType's schema, at any depth. A field holding both \`enum\` and \`x-enumSource\` is refused, since its values would come from two sources (12.7: "exactly one of the sources"). A field whose \`enum\` repeats a value is refused (12.7: "Each value is declared once"). The 2020-12 meta-schema does not require unique values in \`enum\`.
- **For stage 3:**
  - Generating types and runtime checks (12.3) must register \`x-enumSource\` with Ajv as a keyword of its own, or strip it, and must take the gathered values as the field's \`enum\`.
  - \`sheriff reindex\` must write the gathered values into \`x-enumSource.gathered\` (12.9), and \`validate\` must refuse gathered values that the source does not produce.
  - The check of table 12.12 that "a field whose values are the sids of the nodes of a project's own kind names a kind that exists" reads \`x-enumSource.kind\`.

### What the schema still leaves to the tools

- In a ratio, that the lower bound of a range is not greater than the upper one (6.6).
- That a node of the archive names as its replacement a node of the specification (2.6).
- How the tools recognise an archived node now that it has no sid. \`validate\` matches a removed node to its archive entry by sid, and so does the check that a node ever approved is archived when it is removed; both must change in stage 3. The todo of row 10.1.39 names one such change, to \`sheriff citations\`.
- That \`fields\` in an extension name a kind already composed, and that no name is composed twice.
- 12.7's list has no \`declaredIn\`. Its members correspond to \`enum\`, \`x-enumSource.from: "parts"\` and \`x-enumSource.from: "kind"\`, and the owner may give it a \`declaredIn\` that points at \`#/$defs/enumSource/properties/from\` in \`extensions/recordtype.schema.json\`.

## Problems

### Sids that occur twice

${list('dups')}

### Citations and links whose target is not in the output

${list('missing')}

Links that lead to tools.json or project.json, which exist but are not in the output:

${list('outside')}

### Links from the base of the guidelines to an extension, or between extensions

These may contradict 1.7.3 (s-chk5hnzmcpeqj25) and 1.7.4.

${list('crossing')}

### Present links dropped because their target is not in the output

${list('dropped')}

### Citations that are also typed links (only the typed link is written)

${list('typedOverCites')}

### Entries of a draft's \`cites\` that its wording does not cite

${list('uncited')}

### Self-citations

${list('self')}

### Present rules of spec.json not in the output (${R.goneRules?.length || 0})

The brief expected fifteen, but the list it gives (1.10, 1.15, 1.18, 1.27 to 1.33 except those kept by 12.7, 12.8, 12.9 and 12.11, 1.37, 1.39, 5.3, 6.5, 6.6) names eleven rules, and these are exactly the eleven below.

${list('goneRules')}

Present sections not in the output, deleted as sections are:

${list('goneSections')}

Tests and code bound to those rules, which lose their target:

${list('goneBindings')}

### Links in tools.json whose target is not in the output (${R.toolsLinks?.length || 0})

${list('toolsLinks')}

### Wording copied word for word?

Title, text, reason, examples and list of every output node were compared with its draft, row or table head.

${list('words', 'No difference.')}

### What the drafts and the rows lack

${list('lacking')}

The present lists that the drafts of 1.3.5 and 6.1 no longer hold are compared under "Second pass" above.

Rows numbered here because they had no number:

${list('numbered')}

Nodes in cells whose row names no implementing node of the appendix of the tools:

${list('noImpl')}

Todos of rows left out because they are written in Russian (kept in \`untranslated-todos.json\`):

${list('todosRu')}

Agreed dates missing:

${list('agreed')}

${R.dupLinks ? 'Links given twice:\n\n' + list('dupLinks') + '\n' : ''}
## Validation

Ajv 2020 with \`strict: false\` and \`allErrors\`, as the tools run it. Each file is validated against the schema composed for it, and again against the guidelines with every extension.

${validation.map((l) => `- ${l}`).join('\n')}

At Ajv's default strictness, the composition with every extension logs ${new Set(warnings).size} warnings, against ${new Set(presentWarnings).size} for the present schema. Warnings at a path where the present schema logs none:${newWarnings.length ? '\n\n' + newWarnings.map((w) => `- ${w}`).join('\n') : 'none.'}
`;
fs.writeFileSync(OUT + 'report.md', md.replace(/\n{3,}/g, '\n\n'));
console.log(md.split('\n').filter((l) => /^#|INVALID|WRONG|NOT formatted/.test(l)).join('\n'));
console.log('nodes', out.length, 'new sids', Object.keys(newSids).length);
