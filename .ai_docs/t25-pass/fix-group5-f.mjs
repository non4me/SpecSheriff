// T25, stage 2, group 5, round f, as fix-brief-group5-f.md says.
// Applies findings 1 and 5 of the check of round e (review-g5e.md) and the readers' findings that the brief lists
// (english-g5e-fast.md and english-g5e-thorough.md). Findings 2 to 4 concern the question and the notes, which
// group5-notes.md holds.
// Copies tools-drafts.json to tools-drafts.before-group5-f.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails if it does not find the text it replaces.
// Runs the checks of the earlier rounds and writes english-group5f.md, which lists every English sentence that round f
// changes, under its key and field.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-f.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW_F = "; specsheriff-rule-reviewer, 2026-11-24, check of round e: review-g5e.md; EngStickler's readers: english-g5e-fast.md and english-g5e-thorough.md; fix-group5-f.mjs applied the findings, as group5-notes.md, round f, says";

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
  e.review = (e.review || "") + REVIEW_F;
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

// Item 42: s-gvafe6bnstwab8b (the readers, in the brief's words).
{
  const k = "s-gvafe6bnstwab8b";
  const p = entry(k).proposal;
  const pf = part(k, "`sheriff validate` refuses any other JSON file");
  rep(k, pf, "en", "`sheriff validate` refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file.", "`sheriff validate` refuses every other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`, and names that file.");
  rep(k, pf, "ru", "Любой другой файл JSON в `specs/tech/`, где хранится техническое приложение (§s-tj38pvm38nepaf5), `sheriff validate` отвергает и называет этот файл.", "Любой другой файл JSON технического приложения (§s-tj38pvm38nepaf5) в `specs/tech/` `sheriff validate` отвергает и называет этот файл.");
  rep(k, p, "reason", "holds an implementation which that reader will not find.", "holds an implementation that the reader will not find.");
  rep(k, p, "ruReason", "содержит реализацию, которую этот читатель не найдёт.", "содержит реализацию, которую читатель не найдёт.");
}

// Item 44: s-3anv9qcmx8pwp2w (the thorough reader, in the brief's words).
{
  const k = "s-3anv9qcmx8pwp2w";
  entry(k);
  const p3 = part(k, "The chain of identifiers that starts at a field");
  rep(k, p3, "en", "A chain that comes back to an identifying field that it has already reached never ends.", "A chain never ends if it comes back to an identifying field that it has already reached.");
  rep(k, p3, "ru", "Цепочка, которая возвращается к идентифицирующему полю, до которого уже доходила, никогда не заканчивается.", "Цепочка никогда не заканчивается, если возвращается к идентифицирующему полю, до которого уже доходила.");
}

// Item 45: s-c2r9jndrjbtbsv6 (review e's finding 5; the thorough reader).
{
  const k = "s-c2r9jndrjbtbsv6";
  entry(k);
  const pr = part(k, "`sheriff validate` refuses any other RecordType variant");
  rep(k, pr, "en", "For the last condition, the refusal also names", "Where the RecordType variant fails the last condition, the refusal also names");
  rep(k, pr, "ru", "Для последнего условия отказ называет также", "Если вариант RecordType не выполняет последнего условия, отказ называет также");
  const pt = part(k, "Where a RecordType has no `chosenBy`");
  rep(k, pt, "en", "the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links may disagree on the fields that their `chosenBy` names.", "the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links can name different fields in their `chosenBy`.");
  rep(k, pt, "ru", "RecordType с `chosenBy`, к которым от него ведёт наименьшее число связей `refines`, могут расходиться в том, какие поля называют их `chosenBy`.", "RecordType, у которых есть `chosenBy` и к которым от него ведёт наименьшее число связей `refines`, могут называть в своих `chosenBy` разные поля.");
  rep(k, pt, "en", "that refines the RecordType without a `chosenBy`,", "that refines the RecordType that has no `chosenBy`,");
  rep(k, pt, "ru", "который уточняет RecordType без `chosenBy`,", "который уточняет RecordType, у которого нет `chosenBy`,");
}

// Item 46a: s-5nf87c3e3jg9v7c (review e's finding 1; the fast reader on example 2; the Cyrillic letter А for the answer).
{
  const k = "s-5nf87c3e3jg9v7c";
  const p = entry(k).proposal;
  const p3 = part(k, "Otherwise, the parts of the base specification are the contracts section");
  rep(k, p3, "en", "The contracts section is named `contracts`, after its folder, and each other part by its title.", "The contracts section is named `contracts`, after its folder. Each of the other parts is named by its title.");
  rep(k, p3, "ru", "Контракты называются `contracts`, по имени их папки, а каждая из остальных частей — по своему названию.", "Контракты называются `contracts`, по имени их папки. Каждая из остальных частей называется по своему названию.");
  rep(k, part(k, "for the title of a section, that section;"), "change", "Новое — по рекомендованному ответу A на вопрос", "Новое — по рекомендованному ответу А на вопрос");
  const ex2 = p.examples[1];
  rep(k, ex2, "en", "The most likely mistake is to take the title “Contracts” as a value in place of `contracts`.", "The most likely mistake is to use the title “Contracts” as a value in place of `contracts`.");
  rep(k, ex2, "ru", "Самая вероятная ошибка — взять значением название «Contracts» вместо `contracts`.", "Самая вероятная ошибка — использовать как значение название «Contracts» вместо `contracts`.");
}

// Item 46b: new:tools-7-1-enum-values (both readers, in the brief's words).
{
  const k = "new:tools-7-1-enum-values";
  const p = entry(k).proposal;
  rep(k, p, "reason", "A field with no values, or with values that break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass that mistake on to the generated code.", "So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).");
  rep(k, p, "ruReason", "Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), перенесло бы эту ошибку в сгенерированный код.", "Поэтому сгенерированный код унаследовал бы изъян поля, у которого нет значений или значения которого нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).");
}

// Item 47: s-ezq8csd433vj6fj (the thorough reader, in the brief's words).
{
  const k = "s-ezq8csd433vj6fj";
  entry(k);
  const p0 = part(k, "Where the project has chosen the RecordType extension");
  rep(k, p0, "en", "`sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases", "`sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases");
  rep(k, p0, "ru", "`sheriff validate` пропускает без сообщения ссылку одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях", "`sheriff validate` не сообщает о ссылке одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях");
}

// Checks, then the writes (as in rounds d and e).
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

// english-group5f.md: every English sentence that round f changes, under its key and field.
const sentences = (s) => (s || "").split(/(?<=[.;:])\s+|\n+/).map((x) => x.replace(/^- /, "").trim()).filter(Boolean);
const md = [
  "# T25, group 5, round f: the English sentences that changed",
  "",
  "This file holds every English sentence of group 5 that round f changed, as `tools-drafts.json` holds it after fix-group5-f.mjs has run, under the key and the field of its node, for EngStickler's readers.",
  "fix-group5-f.mjs writes this file; edit the script, not this file.",
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
fs.writeFileSync(new URL("english-group5f.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
