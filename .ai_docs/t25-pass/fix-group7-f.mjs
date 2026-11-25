// T25, stage 2, group 7, round f: replaces the sentence of item 53 on what the check of generated copies refuses, as
// the coordinator gave it after EngStickler's readers read english-group7e.md, with its Russian.
// On its first run it copies tools-drafts.json to tools-drafts.before-group7-f.json; on every run it rebuilds the keys of
// the group from that copy, checks every draft as fix-group7-c.mjs does, and writes tools-drafts.json and
// english-group7f.md, which holds only the English that this round changes. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group7-f.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const R = (type, to) => ({ type, to });
const NEW = "Новое.";
const AS_AGREED = "Как в согласованной формулировке.";

// This round adds no sid.
const SID = {};
const GROUP = [
  "s-k4nqjr96ux7a5m7", "new:tools-5-export", "new:tools-5-show", "s-rpv4fkdqqguptqd", "new:tools-4-diagram", "s-pvzms7d8kxb8dk2",
  "s-suv42g8r3ra2h6b", "s-nk8td3ez58gahc4", "s-4npdup7mjkva69y", "proposal:s-f5rz6b7dhxejjts-g7", "proposal:s-3anv9qcmx8pwp2w-g7",
  "proposal:s-ezq8csd433vj6fj-g7", "proposal:s-gb8s9657a65hqmv-g7", "proposal:s-dbk2vyeg8z5jxna-g7", "new:tools-17-bindings-entry",
  "proposal:new-tools-1-settings-g7", "proposal:s-vp24dqydygztqbt-g7", "new:tools-17-validator",
];
const entries = {};
for (const key of GROUP) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round e in the copy`);
  entries[key] = structuredClone(drafts[key]);
}
const changed = new Set();
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with: ${start}`);
  return i;
};
const rep = (key, start, ...replacement) => {
  parts(key).splice(at(key, start), 1, ...replacement);
  changed.add(key);
};
const ins = (key, afterStart, ...added) => {
  parts(key).splice(at(key, afterStart) + 1, 0, ...added);
  changed.add(key);
};
const del = (key, start) => {
  parts(key).splice(at(key, start), 1);
  changed.add(key);
};
const set = (key, fields) => {
  Object.assign(entries[key].proposal, fields);
  changed.add(key);
};
const refsAdd = (key, ...refs) => {
  for (const r of refs) if (!entries[key].proposal.refs.some((x) => x.to === r.to)) entries[key].proposal.refs.push(r);
  changed.add(key);
};
// Replaces words in a string that must hold them, so that a draft changed since this script was written is caught.
const swap = (s, from, to, where) => {
  if (!s.includes(from)) throw new Error(`${where}: does not hold: ${from}`);
  return s.split(from).join(to);
};
// Replaces words in one language of a part, keeping the part's other fields.
const swapPart = (key, start, lang, from, to) => {
  const x = parts(key)[at(key, start)];
  x[lang] = swap(x[lang], from, to, `${key}, the part “${start}”, ${lang}`);
  changed.add(key);
};
const swapExample = (key, i, lang, from, to) => {
  const x = entries[key].proposal.examples[i];
  x[lang] = swap(x[lang], from, to, `${key}, example ${i + 1}, ${lang}`);
  changed.add(key);
};
const swapField = (key, field, from, to) => {
  entries[key][field] = swap(entries[key][field], from, to, `${key}, ${field}`);
  changed.add(key);
};


// ---------------------------------------------------------------------------------------------------------------
// Item 53: the sentence on what the check of generated copies refuses (the coordinator's round f).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-pvzms7d8kxb8dk2";
  rep(k, "The check of generated copies refuses",
    P("The check of generated copies (§s-dbk2vyeg8z5jxna) refuses a list that names a file whose name has any other extension, as it refuses everything else that keeps `sheriff types` from writing any file at all.",
      "Проверка порождённых копий (§s-dbk2vyeg8z5jxna) отвергает список, в котором есть файл с любым другим расширением имени, как отвергает и всё остальное, из-за чего `sheriff types` не может записать вообще ни одного файла.",
      parts(k)[at(k, "The check of generated copies refuses")].change));
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const sidOf = (baseKey) => drafts[baseKey].sidValue ?? (/^s-[2-9a-hjkmnp-z]{15}$/.test(baseKey) ? baseKey : undefined);
const problems = [];
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const e of Object.values(entries)) if (e.sidValue) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (sidOf(e.base) !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  const all = texts.join("\n");
  for (const sid of Object.values(SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
}
const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  let citedByDecisions;
  if (key.startsWith("proposal:")) {
    const bp = drafts[e.base].proposal;
    const baseEn = [bp.title, render(bp.parts, "en"), bp.reason, ...(bp.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
    const baseCited = new Set(citedIn(baseEn));
    citedByDecisions = new Set(bp.refs.filter((r) => r.type === "cites" && !baseCited.has(r.to)).map((r) => r.to));
  } else {
    citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])));
  }
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s)) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const x of p.parts) if (x.change !== AS_AGREED && ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (!key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  if (changed.has(key)) {
    const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
    for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
      const words = sentence.split(/\s+/).filter(Boolean).length;
      if (words > 30) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
    }
  }
  // "In every other respect" (item 55) and "stands for any value" (item 56) are the readers' words, which the main
  // session chose.
  const bad = [/closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /\beach other\b/, /\bentry of the bindings file\b/];
  if (key !== "proposal:s-gb8s9657a65hqmv-g7") bad.push(/\bdeclaredIn\b/);
  const allowed = (s) => s.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/Appendix of the tools/g, "AOT")
    .replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/In every other respect/g, "IEOR").replace(/stands for any value/g, "SFAV");
  // The agreed sentences of a proposal's base are checked when the owner agreed to them.
  const own = key.startsWith("proposal:") ? p.parts.filter((x) => x.change !== AS_AGREED).map((x) => x.en).join("\n") : en;
  for (const b of bad) if (b.test(allowed(own))) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  // On the map, the outline is «план» throughout; «структура» renders only the reason's "structure".
  if (key === "s-rpv4fkdqqguptqd" && /структур/.test(ruAll.replace(/показывает структуру, которой у узлов уже нет/, ""))) problems.push(`${key}: the Russian calls the outline «структура»`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + JSON.stringify((p.examples || []).map((x) => x.change ?? "")) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  // The node on the review of a commit names its own subject, the reviewer of a commit, and the list of commands cites
  // the independent reviewer.
  const history = /[Рр]аунд|рецензент|review-g|\bround\b|групп[аыеу] [1-7]/;
  if (history.test(changes.replace(/независим\S* рецензент\S*/g, "").replace(key === "proposal:s-vp24dqydygztqbt-g7" ? /рецензент\S*/g : /^$/, ""))) problems.push(`${key}: a change field tells the history of the rounds or names a group`);
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group7f.md holds only the English that this round changes: each sentence, or row of a table, of a changed
// node's title, text, reason and examples that the node did not hold before this round.
const units = (p) => {
  const out = [];
  const add = (where, s) => {
    for (const line of String(s ?? "").split("\n").filter((l) => l.trim())) {
      if (line.startsWith("|")) out.push([where, line]);
      else for (const sentence of line.replace(/^- /, "").split(/(?<=[.;:])\s+(?=[A-Z`“(])/)) out.push([where, sentence]);
    }
  };
  add("Title", p.title);
  for (const x of p.parts || []) add("Text", x.en);
  add("Reason", p.reason);
  (p.examples || []).forEach((x, i, all) => add(all.length > 1 ? `Example ${i + 1}` : "Example", x.en));
  return out;
};
const md = [
  "# T25, group 7, round f: the English sentences that round f changes",
  "",
  "This file holds only the English sentences, and the rows of a table, that round f adds or changes in the drafts of group 7, as `tools-drafts.json` holds them after fix-group7-f.mjs. Each is given under the key of its draft in `tools-drafts.json` and the title of that draft, with the part of the node that holds it.",
  "fix-group7-f.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  if (!changed.has(key)) continue;
  const old = new Set(units(before[key].proposal).map(([, s]) => s));
  const fresh = units(e.proposal).filter(([, s]) => !old.has(s));
  if (!fresh.length) continue;
  md.push(`## ${key} — ${e.proposal.title}`, "");
  for (const [where, s] of fresh) md.push(`- ${where}: ${s}`);
  md.push("");
}
fs.writeFileSync(new URL("english-group7f.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts; changed in round f: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 30 words, to look at:\n${longSentences.join("\n")}`);
