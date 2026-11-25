// T25, stage 2, group 4, round e: applies the nits of review-g4d-a.md to review-g4d-d.md and the findings of EngStickler's
// readers (english-g4d-fast.md, english-g4d-thorough.md) to the twelve keys of group 4, as fix-brief-group4-e.md says.
// The patches themselves are in fix-group4-e-patches.mjs.
// It copies tools-drafts.json to tools-drafts.before-group4-e.json on its first run and rebuilds from that copy on every
// run, so two runs give the same file. It checks every draft before it writes: citations against links, the Russian
// citing the same sids, no citation by location outside backticks, link targets existing, the sid of row 10.1.37a
// unique, the patches having taken effect, and no key outside the group changed. It also writes english-group4e.md, the
// English of every changed node.
import fs from "node:fs";
import path from "node:path";
import { applyPatches, SAME } from "./fix-group4-e-patches.mjs";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group4-e.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);

const render = (parts, key) => {
  const out = [];
  let n = 0;
  for (const x of parts) {
    if (x.kind === "p") {
      out.push((out.length ? "\n" : "") + x[key]);
      n = 0;
    } else if (x.kind === "ol") out.push(`${++n}. ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });

const GROUP = [
  "s-7pk89t8z6wymmj9",
  "proposal:row-10-1-37a",
  "proposal:s-pcnyfp7gev7syax-g4",
  "s-nh8b2hjvzasdxmd",
  "s-m8nmfsxkcfu7cjp",
  "s-dbk2vyeg8z5jxna",
  "s-txbwsthdqhvyzd2",
  "s-jgejd5rpd9d43pd",
  "proposal:row-10-1-41-g4",
  "s-qqs2svksmjct753",
  "s-b6qdtghnyha3fhk",
  "proposal:new-tools-1-project-g4",
];
const NEW_ROW = "s-vj67ztqkuhxbv7s";

applyPatches(drafts);
for (const key of GROUP) {
  const p = drafts[key].proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// The sid of row 10.1.37a is used nowhere in specs/ or moved/, and in the drafts only by the group's keys.
const sidRe = /s-[2-9a-hjkmnp-z]{15}/g;
const walkDir = (dir, found) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p, found);
    else if (e.name.endsWith(".json") || e.name.endsWith(".jsonl")) for (const m of fs.readFileSync(p, "utf8").matchAll(sidRe)) found.add(m[0]);
  }
};
const inSpecs = new Set();
walkDir(path.join(root, "specs"), inSpecs);
walkDir(path.join(root, ".ai_docs/t25-pass/moved"), inSpecs);
if (inSpecs.has(NEW_ROW)) problems.push(`the sid ${NEW_ROW} of row 10.1.37a is already used in specs/ or moved/`);
for (const [key, d] of Object.entries(drafts)) if (!GROUP.includes(key) && JSON.stringify(d).includes(NEW_ROW)) problems.push(`the sid ${NEW_ROW} is used by ${key}, outside the group`);

const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const collect = (data) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
targets.add(NEW_ROW);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  const isRow = e.kind === "cell";
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!isRow && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  // The example of rule 10.12 shows the order and names no mistake; every other example names its most likely one.
  if (key !== "proposal:s-pcnyfp7gev7syax-g4" && !(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const x of p.parts) {
    const ticks = (s) => [...s.matchAll(/`[^`]*`/g)].map((m) => m[0]).sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  }
  // What this draft writes itself: for a proposal, the parts that differ from the agreed wording, and the reason and
  // the examples where they changed; for a node of the group, all of it.
  const ownParts = key.startsWith("proposal:") ? p.parts.filter((x) => x.change !== SAME) : p.parts;
  const ownReason = !p.reasonChange || p.reasonChange !== SAME;
  const own = [p.title, ...ownParts.map((x) => x.en), ownReason ? p.reason : "", ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ruOwn = [p.ruTitle, ...ownParts.map((x) => x.ru), ownReason ? p.ruReason : "", ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  for (const sentence of own.replace(/`[^`]*`/g, "code").replace(/ \(§[^)]*\)/g, "").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  // The phrases the agreed drafts avoid. A test "carries" a SpecTag, as other nodes say (fix-brief-group4-c.md).
  const plain = own
    .replace(/SpecSheriff tools/g, "SST")
    .replace(/appendix of the tools/g, "AOT")
    .replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS")
    .replace(/stands alone/g, "ALONE")
    .replace(/by hand/g, "MANUALLY")
    .replace(/test that carries R's SpecTag/g, "TEST_WITH_TAG");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bhands?\b/, /\bwrites it anew\b/, /\bruns no test\b/, /only once (the|these|they)\b/, /\bso run\b/, /ref (that )?names\b/, /the ref names\b/, /becomes one that the system's code must implement/, /makes the rule one that/, /lacks such a file, it also/, /it shows the check's exit status/, /whatever the (entries|project's own checks)/, /It runs them with/, /is missing\b/, /the text refused/, /or its tests, which/, /A commit edits/, /its message contains no sid/, /what it generates/, /printed on its/, /point at another/, /\(§s-tj38pvm38nepaf5\) for the stack/, /the test's language/, /if such a test counted/, /approved lists nothing/, /approval of that wording/, /the case of its letters/, /give a `testCommand`/, /`testCommand` is given/, /the merge changes a rule's approved wording/, /\bdeclares R's SpecTag\b/, /But not:/, /whatever the case/, /\bpasses (each of )?(the project's own checks|them)\b/, /none of which/, /which therefore run first/, /hold for everyone/, /no longer reaches/, /stops being exempted/]) {
    if (bad.test(plain)) problems.push(`${key}: the English holds ${bad}`);
  }
  if (/несёт|несут|несущ|владел/.test(ruOwn)) problems.push(`${key}: the Russian says «несёт» or «владелец»`);
  if (/больше до него не доходит|ожидающий неудачи|не может не пройти|реализовывать не должен|который называет (этот )?ref|Он говорит, что собственные/.test(ruOwn + JSON.stringify(p.parts.map((x) => x.change)))) problems.push(`${key}: the Russian keeps a wording that review b-c corrected`);
  if (["s-nh8b2hjvzasdxmd", "s-m8nmfsxkcfu7cjp"].includes(key) && /цит/i.test(ruOwn)) problems.push(`${key}: the Russian says «цитата» or «цитировать», not «ссылка» or «ссылаться»`);
  if (/[Рр]аунд|рецензент сказал|review-g|основн(ая|ой) сесси/.test(JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || ""))) problems.push(`${key}: a change field tells the history of the rounds`);
  if (/агре/.test(JSON.stringify(p.parts.map((x) => x.change)) + (e.change || ""))) problems.push(`${key}: a typo in a change field`);
}

// The patches that edit a string in place must have found it.
const partEn = (key, start) => drafts[key].proposal.parts.find((x) => x.en.startsWith(start));
const expect = [
  ["proposal:row-10-1-41-g4", drafts["proposal:row-10-1-41-g4"].proposal.ruText, "привязано к тесту, не помеченному как пропускаемый или как ожидаемо падающий, и к коду системы помимо тестов"],
  ["s-dbk2vyeg8z5jxna", drafts["s-dbk2vyeg8z5jxna"].proposal.text, "also counts as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run"],
  ["s-b6qdtghnyha3fhk", drafts["s-b6qdtghnyha3fhk"].stage3, "taken from the commit that added that approval (s-5ah25f6gy99panq)"],
  ["s-qqs2svksmjct753", drafts["s-qqs2svksmjct753"].stage3, "core.commentString"],
  ["s-jgejd5rpd9d43pd", drafts["s-jgejd5rpd9d43pd"].stage3, "Approving the specification takes no rule out of those exceptions"],
  ["s-7pk89t8z6wymmj9", drafts["s-7pk89t8z6wymmj9"].proposal.text, "A check passes only if its process exits with status zero."],
  ["s-nh8b2hjvzasdxmd", partEn("s-nh8b2hjvzasdxmd", "`sheriff binding` refuses each location").ru, "на узел ссылаются по его sid"],
  ["s-nh8b2hjvzasdxmd", partEn("s-nh8b2hjvzasdxmd", "`sheriff binding` leaves out each file").ru, "которая читает ссылки или расположения"],
  ["s-nh8b2hjvzasdxmd", drafts["s-nh8b2hjvzasdxmd"].stage3, "fixtureGlobs (model.ts:43)"],
  ["s-m8nmfsxkcfu7cjp", drafts["s-m8nmfsxkcfu7cjp"].stage3, "the files that git treats as binary"],
  ["s-m8nmfsxkcfu7cjp", drafts["s-m8nmfsxkcfu7cjp"].stage3, "fixtureGlobs (model.ts:43)"],
  ["s-dbk2vyeg8z5jxna", drafts["s-dbk2vyeg8z5jxna"].stage3, "and to refuse the generator where sheriff types would refuse it so run;"],
  ["s-jgejd5rpd9d43pd", drafts["s-jgejd5rpd9d43pd"].proposal.text, "checks the approved rules of the specification in the files"],
  ["s-jgejd5rpd9d43pd", drafts["s-jgejd5rpd9d43pd"].proposal.ruText, "проверяет одобренные правила спецификации в файлах"],
  ["s-jgejd5rpd9d43pd", drafts["s-jgejd5rpd9d43pd"].stage3, "they are moved out of debt.json"],
  ["proposal:row-10-1-41-g4", drafts["proposal:row-10-1-41-g4"].proposal.reason, "counts neither a skipped test nor a failing test that is expected to fail as failed"],
  ["s-b6qdtghnyha3fhk", drafts["s-b6qdtghnyha3fhk"].stage3, "looked up in that commit and its ancestors"],
  ["s-7pk89t8z6wymmj9", drafts["s-7pk89t8z6wymmj9"].stage3, "The refusal of a check that the rule's last approved wording does not list says so."],
];
for (const [key, s, want] of expect) if (!s || !s.includes(want)) problems.push(`${key}: a patch did not take effect: ${want}`);

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
for (const key of GROUP) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
}
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group4e.md: only the English sentences that round e changed, each under its key, for EngStickler's readers.
const sentences = (p) => [p.title, ...p.parts.map((x) => x.en), p.reason, ...(p.examples || []).map((x) => x.en)]
  .filter(Boolean)
  .flatMap((t) => t.split(/(?<=[.;:])\s+|\n+/))
  .filter((t) => t.trim());
const md = [
  "# T25, group 4, round e: the English sentences that round e changed",
  "",
  "This file holds only the sentences of the nodes of group 4 that fix-group4-e.mjs changed, each under the node's key in `tools-drafts.json`.",
  "fix-group4-e.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP) {
  const old = new Set(sentences(before[key].proposal));
  const changed = sentences(drafts[key].proposal).filter((t) => !old.has(t));
  if (!changed.length) continue;
  md.push(`## ${key} — ${drafts[key].proposal.title || "a row of the main table of checks"}`, "");
  for (const t of changed) md.push(t, "");
}
fs.writeFileSync(new URL("english-group4e.md", here), md.join("\n"));

console.log(`wrote ${GROUP.length} keys: ${GROUP.join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, citations left out, to look at:\n${longSentences.join("\n")}`);
