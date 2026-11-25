// T25, stage 2, group 5, round g, as fix-brief-group5-g.md says.
// Applies the readers' last findings (english-g5f-fast.md and english-g5f-thorough.md) in the brief's words. Each fix
// changes the English, or brings the Russian into line with an English sentence whose meaning stays the same.
// Copies tools-drafts.json to tools-drafts.before-group5-g.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails if it does not find the text it replaces.
// Runs the checks of the earlier rounds and writes english-group5g.md, which lists every English sentence that round g
// changes, under its key and field.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-g.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW_G = "; EngStickler's readers, 2026-11-24, on round f: english-g5f-fast.md and english-g5f-thorough.md; fix-group5-g.mjs applied the findings, as group5-notes.md, round g, says";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const problems = [];

const GROUP = ["s-vuujweu57sxsa58", "s-gvafe6bnstwab8b", "s-uxmkwbnpgtjzkgv", "s-3anv9qcmx8pwp2w", "s-c2r9jndrjbtbsv6", "s-5nf87c3e3jg9v7c", "new:tools-7-1-enum-values", "s-ezq8csd433vj6fj"];
const changed = new Set();
const entry = (key) => {
  changed.add(key);
  const e = drafts[key];
  e.review = (e.review || "") + REVIEW_G;
  return e;
};
const rep = (where, obj, field, from, to) => {
  if (typeof obj?.[field] !== "string" || !obj[field].includes(from)) {
    problems.push(`${where}: "${from.slice(0, 70)}…" not found in ${field}`);
    return;
  }
  obj[field] = obj[field].replace(from, to);
};
const part = (key, start) => {
  const x = drafts[key].proposal.parts.find((p) => p.en.startsWith(start));
  if (!x) problems.push(`${key}: no part starts with "${start.slice(0, 50)}…"`);
  return x ?? {};
};

// Item 42: s-gvafe6bnstwab8b ("every other" reads as "every second").
{
  const k = "s-gvafe6bnstwab8b";
  entry(k);
  rep(k, part(k, "`sheriff validate` refuses every other JSON file"), "en", "`sheriff validate` refuses every other JSON file of the technical appendix", "`sheriff validate` refuses any other JSON file of the technical appendix");
}

// Item 44: s-3anv9qcmx8pwp2w (a chain that comes back to the field where it starts).
{
  const k = "s-3anv9qcmx8pwp2w";
  entry(k);
  const p3 = part(k, "The chain of identifiers that starts at a field");
  rep(k, p3, "en", "A chain never ends if it comes back to an identifying field that it has already reached.", "A chain never ends if it comes back to a field that is already in it.");
  rep(k, p3, "ru", "Цепочка никогда не заканчивается, если возвращается к идентифицирующему полю, до которого уже доходила.", "Цепочка никогда не заканчивается, если возвращается к полю, которое в ней уже есть.");
}

// Item 45: s-c2r9jndrjbtbsv6 (the other variants are those of the same RecordType; the refusal depends on the fields
// being different).
{
  const k = "s-c2r9jndrjbtbsv6";
  entry(k);
  const pr = part(k, "`sheriff validate` refuses any other RecordType variant");
  rep(k, pr, "en", "the refusal also names every other RecordType variant that has the same `answersTo`.", "the refusal also names each of the other RecordType variants of its RecordType that have the same `answersTo`.");
  rep(k, pr, "ru", "отказ называет также каждый другой вариант RecordType с тем же `answersTo`.", "отказ называет также каждый из других вариантов его RecordType с тем же `answersTo`.");
  const pt = part(k, "Where a RecordType has no `chosenBy`");
  rep(k, pt, "en", "In that case, `sheriff validate` refuses every RecordType variant", "Where they do, `sheriff validate` refuses every RecordType variant");
  rep(k, pt, "ru", "В таком случае `sheriff validate` отвергает каждый вариант RecordType", "Если называют, `sheriff validate` отвергает каждый вариант RecordType");
}

// Item 46a: s-5nf87c3e3jg9v7c (the name of the other parts; the Russian stays).
{
  const k = "s-5nf87c3e3jg9v7c";
  entry(k);
  rep(k, part(k, "Otherwise, the parts of the base specification are the contracts section"), "en", "Each of the other parts is named by its title.", "The name of each of the other parts is its title.");
}

// Item 46b: new:tools-7-1-enum-values (the condition of the reason is stated).
{
  const k = "new:tools-7-1-enum-values";
  const p = entry(k).proposal;
  rep(k, p, "reason", "So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).", "So, if `sheriff validate` accepted a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), the code generated from that field would inherit the field's defect.");
  rep(k, p, "ruReason", "Поэтому сгенерированный код унаследовал бы изъян поля, у которого нет значений или значения которого нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).", "Поэтому, если бы `sheriff validate` принимал поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), код, сгенерированный из этого поля, унаследовал бы его изъян.");
}

// Checks, then the writes (as in rounds d to f).
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

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  p.date = DATE;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(key)?.meta?.decisions ?? [])));
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
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  for (const x of p.parts) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (/`sheriff validate` (refuses|accepts|reports|checks|leaves)/.test(p.text) && !/regardless of whether the specification is approved or a draft/.test(p.text)) problems.push(`${key}: a check that does not say whether it runs while the specification is a draft`);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/each value only once/g, "EVOO");
  for (const b of [/stands for/, /outside its tests/, /NodeKind/, / included\b/, /\bstands?\b/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts?\b/, /\bcounted\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bruns this check\b/, /equally near/, /\bin theirs\b/]) {
    if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  }
  if (key === "s-c2r9jndrjbtbsv6") {
    const left = [p.text, p.reason, ...p.examples.map((x) => x.en)].join(" ").replace(/RecordType variants?/g, "").replace(/select a variant/g, "");
    if (/\bvariants?\b/.test(left)) problems.push(`${key}: a bare "variant" remains`);
  }
  if (/несёт|несут|несущ|владел|NodeKind/.test(ru)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + p.reasonChange;
  if (/[Рр]аунд|рецензент|review-g|\bround\b/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (GROUP.includes(key)) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group5g.md: every English sentence that round g changes, under its key and field.
const sentences = (s) => (s || "").split(/(?<=[.;:])\s+|\n+/).map((x) => x.replace(/^- /, "").trim()).filter(Boolean);
const md = [
  "# T25, group 5, round g: the English sentences that changed",
  "",
  "This file holds every English sentence of group 5 that round g changed, as `tools-drafts.json` holds it after fix-group5-g.mjs has run, under the key and the field of its node, for EngStickler's readers.",
  "fix-group5-g.mjs writes this file; edit the script, not this file.",
  "",
];
for (const key of GROUP) {
  const was = before[key].proposal;
  const now = drafts[key].proposal;
  const fields = [["Title", was.title, now.title], ["Text", was.text, now.text], ["Reason", was.reason, now.reason]];
  (now.examples || []).forEach((x, i) => fields.push([`Example${now.examples.length > 1 ? ` ${i + 1}` : ""}`, was.examples?.[i]?.en, x.en]));
  const out = [];
  for (const [name, a, b] of fields) {
    const old = new Set(sentences(a));
    const fresh = sentences(b).filter((s) => !old.has(s));
    if (fresh.length) out.push(`**${name}:**`, "", ...fresh.map((s) => `- ${s}`), "");
  }
  if (out.length) md.push(`## ${key} — ${now.title}`, "", ...out);
}
fs.writeFileSync(new URL("english-group5g.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
