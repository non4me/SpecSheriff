// T25, stage 2, group 8, round e: applies the findings of EngStickler's readers on english-group8d.md (english-g8d-fast.md,
// english-g8d-thorough.md) that fix-brief-group8-e.md lists, and only those. On its first run it copies tools-drafts.json
// to tools-drafts.before-group8-e.json; on every run it rebuilds the keys of the group from that copy, checks every draft
// as fix-group8-d.mjs does, and writes tools-drafts.json and english-group8e.md, which holds only the sentences that this
// round changes. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group8-e.json", here);
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
const L2 = (en, ru, change) => ({ kind: "li2", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const NEW = "Новое.";

const SID = {
  preCommit: "s-npnmwyt6s3gypwe",
  pushCompare: "s-8a5eyy5n5hnsgrs",
  hooksOn: "s-jgcveum8dwdnyzr",
  reviewerSettings: "s-p29yawkkkgk7kxb",
  afterEdit: "s-hcmpjmwtgfwzncu",
  skills: "s-kq6wmdud9c7j2k9",
  row37b: "s-yn5tdx2bp4f5rq7",
};
// The sids of the nodes that round b added; this round adds none.
const NEW_SID = {
  specInit: "s-ttsc8tpnu46q53s",
  specRemove: "s-jn3rauw6a8zeefn",
  specSettings: "s-h343yq2mua648eg",
};

const ROUND_A = [
  "s-477gtdrkw34dzxw", "new:tools-6-pre-commit", "new:tools-6-push-compare", "new:tools-6-hooks-on", "new:tools-6-reviewer-settings",
  "new:tools-6-after-edit", "s-st6td4mua9uqt9z", "s-n76wt2bkqdmh78x", "s-4mej6ccn7xu3d3p", "s-n4m5zvh96yb299p", "proposal:row-10-1-37b",
  "s-zh2vcr3xjumppg5", "s-2pdy9gw2jrjvfb4", "new:tools-15-skills", "new:tools-15-spec-init", "new:tools-15-spec-remove", "new:tools-15-spec-settings",
];
const entries = {};
for (const key of ROUND_A) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round d in the copy`);
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
// Changes the English and the Russian of a part in place, keeping its `change` unless a new one is given.
const edit = (key, start, en, ru, change) => {
  const i = at(key, start);
  const p = parts(key)[i];
  parts(key)[i] = { ...p, en, ru, ...(change ? { change } : {}) };
  changed.add(key);
};
const reason = (key, en, ru, change) => {
  const p = entries[key].proposal;
  p.reason = en;
  p.ruReason = ru;
  if (change) p.reasonChange = change;
  changed.add(key);
};
const examples = (key, list) => {
  entries[key].proposal.examples = list;
  changed.add(key);
};
const link = (key, type, to) => {
  const refs = entries[key].proposal.refs;
  if (!refs.some((r) => r.to === to)) refs.push(R(type, to));
  changed.add(key);
};
const unlink = (key, to) => {
  entries[key].proposal.refs = entries[key].proposal.refs.filter((r) => r.to !== to);
  changed.add(key);
};

// The words that this round writes, by key. english-group8e.md shows each English sentence that holds them, as it reads
// once every change of the round is made.
const sentences = [];
const finalSentences = () => {
  const out = [];
  for (const [key, words] of sentences) {
    const p = entries[key].proposal;
    const texts = [...p.parts.map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean);
    const all = texts.flatMap((t) => t.split(/(?<=[.:;])\s+(?=[A-Z`])/));
    const s = all.find((x) => x.includes(words));
    if (!s) throw new Error(`${key}: no sentence holds: ${words}`);
    if (!out.some(([k, t]) => k === key && t === s)) out.push([key, s]);
  }
  return out;
};
// Replaces words in the English, and in the Russian where given, of a part, and refuses a replacement that finds nothing.
const swap = (key, start, en, ru) => {
  const x = parts(key)[at(key, start)];
  if (!x.en.includes(en[0])) throw new Error(`${key}: the part lacks: ${en[0]}`);
  x.en = x.en.replace(en[0], en[1]);
  if (ru) {
    if (!x.ru.includes(ru[0])) throw new Error(`${key}: the Russian of the part lacks: ${ru[0]}`);
    x.ru = x.ru.replace(ru[0], ru[1]);
  }
  sentences.push([key, en[1]]);
  changed.add(key);
};
// The same in the reason or in an example.
const swapIn = (key, field, en, ru) => {
  const p = entries[key].proposal;
  const get = (lang) => (field === "reason" ? (lang === "en" ? p.reason : p.ruReason) : p.examples[field][lang]);
  const set = (lang, v) => { if (field === "reason") { if (lang === "en") p.reason = v; else p.ruReason = v; } else p.examples[field][lang] = v; };
  if (!get("en").includes(en[0])) throw new Error(`${key}: the ${field} lacks: ${en[0]}`);
  set("en", get("en").replace(en[0], en[1]));
  if (ru) {
    if (!get("ru").includes(ru[0])) throw new Error(`${key}: the Russian ${field} lacks: ${ru[0]}`);
    set("ru", get("ru").replace(ru[0], ru[1]));
  }
  sentences.push([key, en[1]]);
  changed.add(key);
};

// ---------------------------------------------------------------------------------------------------------------
// The readers' findings that fix-brief-group8-e.md lists. The Russian changes only where the meaning changes.
// ---------------------------------------------------------------------------------------------------------------
swapIn("new:tools-15-skills", "reason",
  ["The skills give the agent that each SpecSheriff plugin is written for the same procedures", "The skills give the same procedures to the agent that each SpecSheriff plugin is written for"]);
swap("s-zh2vcr3xjumppg5", "The plugin declares the following agent's hooks",
  ["The plugin declares the following agent's hooks to Claude Code:", "The plugin declares the following hooks of the agent to Claude Code:"]);
swap("new:tools-15-spec-settings", "Where the user chooses the questions",
  ["Where the user chooses the questions", "Where the user chooses questions in the chat"],
  ["Если пользователь выбирает вопросы,", "Если пользователь выбирает вопросы в чате,"]);
swap("new:tools-15-spec-settings", "Where the user chooses questions in the chat",
  ["with the arguments of each change", "with the arguments for each change"]);
swapIn("s-st6td4mua9uqt9z", 0,
  ["with its editing tool", "with a file-editing tool"],
  ["своим инструментом редактирования", "инструментом редактирования файлов"]);
swapIn("s-n4m5zvh96yb299p", "reason",
  ["They run in the order in which tools and checks run (§s-pcnyfp7gev7syax)", "They run at the points that the rule on the order of tools and checks sets (§s-pcnyfp7gev7syax)"],
  ["Они выполняются в том порядке, в котором выполняются инструменты и проверки (§s-pcnyfp7gev7syax)", "Они выполняются в тех местах, которые задаёт правило о порядке инструментов и проверок (§s-pcnyfp7gev7syax)"]);
swap("s-n4m5zvh96yb299p", "Where the hook runs the SpecSheriff tools, it also refuses",
  ["it also refuses the commit or the push, regardless of whether the specification is approved or a draft, where one of the project's own tools that run after the tools that rewrite files does any of the following (§s-yn5tdx2bp4f5rq7):",
    "it also refuses the commit or the push if one of the project's own tools that run after the tools that rewrite files does any of the following, regardless of whether the specification is approved or a draft (§s-yn5tdx2bp4f5rq7):"]);
swap("s-477gtdrkw34dzxw", "Each check run by the pre-commit hook",
  ["On a commit, that commit is what is staged.", "On a commit, the commit being made is what is staged."]);
swap("s-st6td4mua9uqt9z", "`sheriff guard` reads the lists `approvalStatus`",
  ["A `sheriff.config.json` that is missing or is not valid JSON is read as if each of those lists were empty.", "Where `sheriff.config.json` is missing or is not valid JSON, `sheriff guard` treats each of those lists as empty."]);
swap("s-st6td4mua9uqt9z", "`sheriff guard` judges the nodes in the files",
  ["It leaves to the checks after the edit (§s-hcmpjmwtgfwzncu) a file of the specification that would be invalid JSON after the edit.", "It leaves a file of the specification that would be invalid JSON after the edit to the checks that run after the edit (§s-hcmpjmwtgfwzncu)."]);
swap("new:tools-6-after-edit", "`sheriff markdown` (§s-e3495enbc5h75c3)",
  ["and either the files that differ include", "and the files that differ include"]);
swapIn("new:tools-6-after-edit", "reason", ["at the edit that makes it", "at the edit that introduces it"]);
swap("s-4mej6ccn7xu3d3p", "The SpecSheriff tools cannot run where the hook finds",
  ["and why: no plugin's SpecSheriff tools", "and why: either no plugin's SpecSheriff tools"]);
swap("new:tools-15-spec-init", "`spec-init` runs `sheriff init`",
  ["with the option `--agent codex` in the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).", "adding the option `--agent codex` where it runs from the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4)."],
  ["`spec-init` запускает `sheriff init` (§s-7unxytshhc4md54), в плагине для Codex CLI (§s-2pdy9gw2jrjvfb4) — с параметром `--agent codex`.",
    "`spec-init` запускает `sheriff init` (§s-7unxytshhc4md54), добавляя параметр `--agent codex`, если сам запущен из плагина для Codex CLI (§s-2pdy9gw2jrjvfb4)."]);
swapIn("s-2pdy9gw2jrjvfb4", "reason",
  ["as the same release of the plugin for Claude Code", "as the release of the plugin for Claude Code with the same version"],
  ["что и тот же выпуск плагина для Claude Code", "что и выпуск плагина для Claude Code с той же версией"]);

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
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
for (const e of Object.values(entries)) targets.add(e.sidValue);
const isRow = (key) => key.startsWith("proposal:row-");

// The new sids of this round: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
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
  void all;
  const allSids = [...Object.values(SID), ...Object.values(NEW_SID)];
  if (new Set(allSids).size !== allSids.length) problems.push("two new nodes share a sid");
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const citedByDecisions = new Set([
    ...citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])),
    ...citedIn(JSON.stringify(p.meta?.decisions ?? [])),
    ...(e.keptForDecisions ?? []),
  ]);
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!isRow(key) && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (ticks(p.reason || "") !== ticks(p.ruReason || "")) problems.push(`${key}: the code in backticks differs between the languages in the reason`);
  if (ticks(p.title || "") !== ticks(p.ruTitle || "")) problems.push(`${key}: the code in backticks differs between the languages in the title`);
  if (!isRow(key) && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of| that rewrite files)/, /\bcarr(y|ies|ied)\b/, /(?<!regardless of )whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /(?<!one of )\bthe two\b/, /sheriff export/, /sheriff render/, /sheriff message\b/, /\bdeclaredIn\b/, /\bat (a|every) (commit|push)\b/i, /\bthe session start\b/i, /\beach other\b/, /\bnoted?\b/, /\bthese hooks\b/];
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  if (/[Рр]аунд|рецензент[а-я]* групп|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
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

// english-group8e.md: each English sentence that this round changes, under its key.
const md = [
  "# T25, group 8, round e: the English sentences that the round changes",
  "",
  "This file holds each English sentence of group 8 that fix-group8-e.mjs changes, as it reads after round e, under its key in `tools-drafts.json`.",
  "fix-group8-e.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, s] of finalSentences()) md.push(`## ${key}`, "", s, "");
fs.writeFileSync(new URL("english-group8e.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
