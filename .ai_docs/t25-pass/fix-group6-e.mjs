// T25, stage 2, group 6, round e: applies the readers' last findings on the drafts of group 6 (english-g6d-fast.md,
// english-g6d-thorough.md) as fix-brief-group6-e.md lists them. Copies tools-drafts.json to
// tools-drafts.before-group6-e.json on its first run and rebuilds from that copy on every run, so that it is idempotent.
// Each patch fails where it does not find the text it replaces. Runs the checks of fix-group6-d.mjs before it writes.
// Writes english-group6e.md, which holds only the English sentences that this round changed, each under its key. It
// touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group6-e.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const REVIEW = "specsheriff-rule-reviewer, 2026-11-25: review-g6-a.md to review-g6-d.md, review-g6b-a.md to review-g6b-d.md, then review-g6c-a.md to review-g6c-d.md; EngStickler's readers: english-g6-fast.md, english-g6-thorough.md, english-g6b-fast.md, english-g6b-thorough.md, english-g6c-fast.md, english-g6c-thorough.md, english-g6d-fast.md and english-g6d-thorough.md; fix-group6-b.mjs to fix-group6-e.mjs applied the findings as group6-notes.md, rounds b to e, says";

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
const X = (en, ru) => ({ en, ru });
const problems = [];

const GROUP = [
  "new:tools-11-section", "s-v4qus7raqnwzneb", "new:tools-11-fingerprint", "new:tools-11-approve", "new:tools-11-withdraw",
  "new:tools-2-entries", "new:tools-2-approve-spec", "new:tools-2-strict", "new:tools-2-extension-off", "s-7unxytshhc4md54",
  "proposal:s-gb8s9657a65hqmv-g6", "proposal:s-7pk89t8z6wymmj9-g6",
];
const changed = new Set();
const prop = (key) => {
  changed.add(key);
  return drafts[key].proposal;
};
// The part of a draft whose English starts with `start`, as the copy holds it.
const find = (key, start) => {
  const x = drafts[key].proposal.parts.find((p) => p.en.startsWith(start));
  if (!x) problems.push(`${key}: no part starts with "${start.slice(0, 60)}…"`);
  return x ?? { kind: "p", en: "", ru: "", change: "" };
};
// The same part, unchanged.
const keep = (key, start) => ({ ...find(key, start) });
// The same part with new English and Russian; its `change` stays unless a new one is given.
const mod = (key, start, en, ru, change) => {
  const x = find(key, start);
  return { kind: x.kind, en, ru, change: change ?? x.change };
};
// Replaces `from` by `to` once in a string field, failing where `from` is not there.
const rep = (where, obj, field, from, to) => {
  if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) {
    problems.push(`${where}: "${from.slice(0, 60)}…" not found in ${field}`);
    return;
  }
  obj[field] = obj[field].replace(from, to);
};
const at = (parts, start) => {
  const i = parts.findIndex((x) => x.en.startsWith(start));
  if (i < 0) problems.push(`no part starts with "${start.slice(0, 60)}…"`);
  return i;
};
const addRef = (p, type, to) => {
  if (!p.refs.some((r) => r.to === to)) p.refs.push(R(type, to));
};
const dropRef = (p, to) => {
  p.refs = p.refs.filter((r) => r.to !== to);
};
// The text of a node of tools.json as approved, by its sid; undefined where tools.json contains no such node.
const toolsFile = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsText = (sid) => {
  let found;
  const walk = (n) => {
    if (!n || typeof n !== "object" || found) return;
    if (n.sid === sid) found = n.text;
    (n.children || []).forEach(walk);
  };
  toolsFile.nodes.forEach(walk);
  return found;
};
const UNCHANGED = /^(Без изменений\.?|Как в согласованной формулировке\.?)$/;

// ---------------------------------------------------------------------------------------------------------------
// The readers' last findings, as fix-brief-group6-e.md lists them. Each changes only the English, except where the
// brief gives a Russian wording.
// ---------------------------------------------------------------------------------------------------------------
{
  const K = "s-v4qus7raqnwzneb";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const last = parts[at(parts, "A node's last approval is")];
  rep(K, last, "en", ", where that line is an approval.", ", if that line is an approval.");
  rep(K, last, "en", "a node's last approval is the last line for the node's sid that is an approval,", "a node's last approval is the latest line for the node's sid that is an approval,");
  p.parts = parts;
}
{
  const K = "new:tools-11-withdraw";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const first = parts[at(parts, "`sheriff approve --withdraw <sid>...` withdraws")];
  rep(K, first, "en", "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, where that approval is in force and whether or not the node holds that wording now,", "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, if that approval is in force, whether or not the node still holds that wording,");
  p.parts = parts;
}
{
  const K = "new:tools-2-strict";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const untagged = parts[at(parts, "the check for code and tests outside the commit")];
  rep(K, untagged, "en", "and the refusal names `sheriff untagged`;", "and the refusal to turn the flag on names `sheriff untagged`;");
  rep(K, untagged, "ru", "и отказ называет `sheriff untagged`;", "и отказ включить флаг называет `sheriff untagged`;");
  const own = parts[at(parts, "each of the project's own checks")];
  rep(K, own, "en", "and the refusal names `sheriff validate --strict`.", "and the refusal to turn the flag on names `sheriff validate --strict`.");
  rep(K, own, "ru", "и отказ называет `sheriff validate --strict`.", "и отказ включить флаг называет `sheriff validate --strict`.");
  p.parts = parts;
}
{
  const K = "new:tools-2-approve-spec";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const strict = parts[at(parts, "While the `strict` flag is on, `sheriff settings` first runs")];
  rep(K, strict, "en", "The refusal is the same as the refusal to turn the flag on in that case.", "The refusal names what the refusal to turn the flag on names in that case.");
  rep(K, strict, "ru", "Этот отказ — такой же, как отказ включить флаг в том же случае.", "Этот отказ называет то же, что называет в этом случае отказ включить флаг.");
  p.parts = parts;
}
{
  const K = "new:tools-2-entries";
  const p = prop(K);
  rep(K, p, "reason", "every change that an owner has made to these settings,", "every change that an owner has made to the settings that only an owner of the specification changes,");
}
{
  const K = "new:tools-2-extension-off";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const reference = parts[at(parts, "A reference in the project's extension of the schema")];
  rep(K, reference, "en", "the `$defs` of that extension's schema add", "the `$defs` of the schema of that extension of the guidelines add");
  rep(K, reference, "en", "the `kinds` of that extension's schema add.", "the `kinds` of the schema of that extension of the guidelines add.");
  p.parts = parts;
}
{
  const K = "s-7unxytshhc4md54";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const elsewhere = parts[at(parts, "Where the repository's hooks previously ran from elsewhere")];
  rep(K, elsewhere, "en", "from elsewhere, from `.git/hooks/` or from another folder that `core.hooksPath` named,", "from elsewhere, that is, from `.git/hooks/` or from another folder that `core.hooksPath` pointed to,");
  rep(K, elsewhere, "en", "apart from git's samples.", "apart from git's sample hooks.");
  const leaves = parts[at(parts, "`sheriff remove` leaves each hook and declaration")];
  rep(K, leaves, "en", "each folder `.githooks/<hook>.d/` that it leaves,", "each folder `.githooks/<hook>.d/` that it leaves in place,");
  p.parts = parts;
  rep(K, p.examples[1], "en", "git reports a conflict in that file.", "git would report a conflict in that file.");
}
{
  const K = "proposal:s-gb8s9657a65hqmv-g6";
  const p = prop(K);
  const parts = p.parts.map((x) => ({ ...x }));
  const tests = parts[at(parts, "in the run that archives or deletes a rule of `project.json`")];
  rep(K, tests, "en", "whether that rule is approved or a draft,", "whether the archived or deleted rule is approved or a draft,");
  p.parts = parts;
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes. The checks are those of propose-group6.mjs.
// ---------------------------------------------------------------------------------------------------------------
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
const movedDecisionsCite = { "new:tools-11-fingerprint": ["s-5ah25f6gy99panq"], "new:tools-11-withdraw": ["s-5ah25f6gy99panq"] };

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
for (const key of changed) {
  const e = drafts[key];
  const p = e.proposal;
  const isSection = e.kind === "section";
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = "2026-11-25";
  e.review = REVIEW;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const decisions = JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? []);
  const citedByDecisions = new Set([...citedIn(decisions), ...(movedDecisionsCite[key] || [])]);
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
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change: ${String(x.en).slice(0, 50)}`);
  const agreedText = e.base ? (drafts[e.base].proposal?.text ?? drafts[e.base].text) : toolsText(key);
  if (agreedText) for (const x of p.parts) if (UNCHANGED.test(x.change.trim()) && !agreedText.includes(x.en)) problems.push(`${key}: a part marked unchanged differs from its agreed wording: ${x.en.slice(0, 70)}…`);
  if (!isSection && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, / included\b/, /\bstands?\b/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two it\b/, /\bthe same (refusal|text)\b/];
  if (key !== "new:tools-11-fingerprint" && key !== "proposal:s-gb8s9657a65hqmv-g6") bad.push(/\bdeclaredIn\b/);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group6e.md: only the English sentences that this round changed, each under its key.
const units = (p) => [p.title, ...p.parts.map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean);
const sentences = (s) => s.split(/(?<=[.;:])\s+(?=[`"“A-Z(])/);
const md = [
  "# T25, group 6, round e: the English sentences that changed",
  "",
  "This file holds only the English sentences of group 6 that round e changed, as `tools-drafts.json` holds them after fix-group6-e.mjs. Each sentence is given under the key of its node in `tools-drafts.json`, with the node's title.",
  "fix-group6-e.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP.filter((k) => changed.has(k))) {
  const now = drafts[key].proposal;
  const old = before[key].proposal;
  const oldText = units(old).join("\n");
  const fresh = units(now).flatMap(sentences).filter((s) => !oldText.includes(s));
  if (!fresh.length) continue;
  md.push(`## ${key} — ${now.title}`, "");
  for (const s of fresh) md.push(`- ${s}`);
  md.push("");
}
fs.writeFileSync(new URL("english-group6e.md", here), md.join("\n"));

console.log(`changed ${changed.size} drafts: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
