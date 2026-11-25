// T25, stage 2, group 5, round e, as fix-brief-group5-e.md says.
// Applies the findings of the check of round d (review-g5d-a.md to review-g5d-d.md) and of the readers' reports
// (english-g5d-fast.md and english-g5d-thorough.md). Item 46a keeps answer A, with review d-d's findings 1 and 2 applied.
// Copies tools-drafts.json to tools-drafts.before-group5-e.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails if it does not find the text it replaces.
// Runs the checks of the earlier rounds and writes english-group5e.md, which lists every English sentence that round e
// changes, under its key and field.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-e.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW_E = "; specsheriff-rule-reviewer, 2026-11-24, check of round d: review-g5d-a.md to review-g5d-d.md; EngStickler's readers: english-g5d-fast.md and english-g5d-thorough.md; fix-group5-e.mjs applied the findings, as group5-notes.md, round e, says";

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
  e.review = (e.review || "") + REVIEW_E;
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

// ---------------------------------------------------------------------------------------------------------------
// Item 41: s-vuujweu57sxsa58 (review d-a's nit).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-vuujweu57sxsa58";
  const p = entry(k).proposal;
  rep(k, p, "reason", "would refuse changes in which domains do not use one another.", "would refuse changes after which no domains use one another in a cycle.");
  rep(k, p, "ruReason", "отвергала бы изменения, в которых домены друг друга не используют.", "отвергала бы изменения, после которых никакие домены не используют друг друга по кругу.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 42: s-gvafe6bnstwab8b (review d-a's nit; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-gvafe6bnstwab8b";
  const p = entry(k).proposal;
  rep(k, part(k, "`sheriff validate` refuses any other JSON file"), "en", "which holds the technical appendix (§s-tj38pvm38nepaf5), naming the file.", "which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file.");
  rep(k, p, "reason", "holds an implementation that such a reader will not find.", "holds an implementation which that reader will not find.");
  rep(k, p, "ruReason", "содержит реализацию, которую такой читатель не находит.", "содержит реализацию, которую этот читатель не найдёт.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 43: s-uxmkwbnpgtjzkgv (the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-uxmkwbnpgtjzkgv";
  const ex = entry(k).proposal.examples[0];
  rep(k, ex, "en", "refines the rule on a domain's level and lists `core` and `edge`.", "refines the rule about a domain's level and lists the levels `core` and `edge`.");
  rep(k, ex, "ru", "уточняет правило об уровне домена и перечисляет `core` и `edge`.", "уточняет правило об уровне домена и перечисляет уровни `core` и `edge`.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 44: s-3anv9qcmx8pwp2w (review d-b's nit 1; the readers, in the brief's words).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-3anv9qcmx8pwp2w";
  const e = entry(k);
  const p3 = part(k, "The chain of identifiers that starts at a field");
  rep(k, p3, "en", "A chain that reaches the identifying field of one RecordType a second time never ends.", "A chain that comes back to an identifying field that it has already reached never ends.");
  rep(k, p3, "ru", "Цепочка, которая во второй раз ведёт к идентифицирующему полю одного и того же RecordType, не кончается никогда.", "Цепочка, которая возвращается к идентифицирующему полю, до которого уже доходила, никогда не заканчивается.");
  rep(k, e, "stage3", "validate.ts:423 refuses only where the named RecordType has no identifiedBy; it is also to refuse the field where identifiedBy names none of that RecordType's fields.", "validate.ts:423 refuses where identifierOf names no RecordType or the named RecordType has no identifiedBy; it is also to refuse the field where identifiedBy names none of that RecordType's fields.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 45: s-c2r9jndrjbtbsv6 (review d-c's nits 1 and 2; the readers, as the brief says).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-c2r9jndrjbtbsv6";
  const p = entry(k).proposal;
  const pr = part(k, "`sheriff validate` refuses any other RecordType variant");
  rep(k, pr, "en", "For the last condition, the refusal names each other RecordType variant with the same `answersTo` as well.", "For the last condition, the refusal also names every other RecordType variant that has the same `answersTo`.");
  rep(k, pr, "ru", "Для последнего условия он называет также каждый другой вариант RecordType с тем же `answersTo`.", "Для последнего условия отказ называет также каждый другой вариант RecordType с тем же `answersTo`.");
  const pf = part(k, "Where a RecordType variant fails the first condition");
  rep(k, pf, "en", "since each of the remaining conditions compares", "since each of the other conditions compares");
  rep(k, pf, "ru", "потому что каждое из остальных условий сравнивает", "потому что каждое из других условий сравнивает");
  const pt = part(k, "Where a RecordType has no `chosenBy`");
  pt.en = "Where a RecordType has no `chosenBy`, the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links may disagree on the fields that their `chosenBy` names. In that case, `sheriff validate` refuses every RecordType variant that refines the RecordType without a `chosenBy`, since each such RecordType variant fails the first condition. The refusal names each of those RecordTypes with a `chosenBy`.";
  pt.ru = "Если у RecordType нет `chosenBy`, RecordType с `chosenBy`, к которым от него ведёт наименьшее число связей `refines`, могут расходиться в том, какие поля называют их `chosenBy`. В таком случае `sheriff validate` отвергает каждый вариант RecordType, который уточняет RecordType без `chosenBy`, потому что каждый такой вариант не выполняет первого условия. Отказ называет каждый из этих RecordType с `chosenBy`.";
  rep(k, pt, "change", " Если таких RecordType больше двух, правило то же, и отказ называет каждый.", "");
  const ex = p.examples[0];
  rep(k, ex, "en", "names `email` for `channel` in its `answersTo`", "names `email` as the value of `channel` in its `answersTo`");
  rep(k, ex, "en", "names `sms` for `channel` in its `answersTo`", "names `sms` as the value of `channel` in its `answersTo`");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46a: s-5nf87c3e3jg9v7c (answer A stays; review d-d's finding 1; the brief's example 2).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5nf87c3e3jg9v7c";
  const e = entry(k);
  const p = e.proposal;
  const p3 = part(k, "Otherwise, the parts of the base specification are the sections");
  p3.en = "Otherwise, the parts of the base specification are the contracts section and the sections whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The contracts section is named `contracts`, after its folder, and each other part by its title.";
  p3.ru = "Иначе части базовой спецификации — это контракты и разделы, расположение которых (§s-kag2m9tzdnduxdx) — `base/` и одно число. Контракты называются `contracts`, по имени их папки, а каждая из остальных частей — по своему названию.";
  p3.change = "Новое — рекомендованный ответ на вопрос, который задан вам вместе с группой: без расширения Domains базовая спецификация делится на разделы (правило 1.1.2, на которое ссылается правило 12.11), поэтому части — контракты, по имени их папки, и разделы верхнего уровня `specs/base/`, каждый под своим названием. Контракты остаются одним разделом, как в правиле 3.1 и в согласованном узле «Where the files are». Так же пункт 47 этой группы считает частью системы раздел верхнего уровня `specs/base/`.";
  const ex2 = p.examples[1];
  ex2.en = "In a project without the Domains extension, `specs/base/` holds the top-level sections titled “Requests” and “Users”, and `specs/contracts/` holds the section titled “Contracts”. The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The values of that field are “Requests”, “Users” and `contracts`, each with the sid of the node that it comes from. The most likely mistake is to take the title “Contracts” as a value in place of `contracts`.";
  ex2.ru = "В проекте без расширения Domains в `specs/base/` находятся разделы верхнего уровня «Requests» и «Users», а в `specs/contracts/` — раздел «Contracts». У RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Значения этого поля — «Requests», «Users» и `contracts`, каждое вместе с sid узла, из которого оно приходит. Самая вероятная ошибка — взять значением название «Contracts» вместо `contracts`.";
  rep(k, e, "stage3", "Without the Domains extension, it is to give the title of each section whose location is base/ or contracts/ followed by a single number, each with that section's sid; this follows the recommended answer to the owner's question in group5-notes.md, and the code follows the owner's answer.", "Without the Domains extension, it is to give `contracts`, with the sid of the first top-level node of the first file of specs/contracts/, and the title of each section whose location is base/ followed by a single number, with that section's sid; this follows answer A, the recommended answer to the owner's question in group5-notes.md, and the code follows the owner's answer.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46b: new:tools-7-1-enum-values (the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-enum-values";
  const p = entry(k).proposal;
  rep(k, p, "reason", "with values that break the rules on their source", "with values that break the rules about their source");
  rep(k, p, "reason", "would therefore pass the mistake on to the generated code.", "would therefore pass that mistake on to the generated code.");
  rep(k, p, "ruReason", "перенесло бы ошибку в сгенерированный код.", "перенесло бы эту ошибку в сгенерированный код.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 47: s-ezq8csd433vj6fj (review d-b's nit 2; the brief's wording of the opening and of the example).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-ezq8csd433vj6fj";
  const p = entry(k).proposal;
  rep(k, part(k, "Where the project has chosen the RecordType extension"), "en", "`sheriff validate` leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases", "`sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases");
  rep(k, part(k, "A fragment of a format is a RecordType in the contracts section."), "change", "(правило 12.1, ваши решения от 2026-11-19). Новое: RecordType", "(правило 12.1, ваши решения от 2026-11-19). RecordType");
  const ex = p.examples[0];
  rep(k, ex, "en", "A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`.", "A field `user` that holds only a user's identifier, with no reference to the RecordType of a user, has the type `string` and no `identifierOf`.");
  rep(k, ex, "ru", "У поля `user`, которое хранит идентификатор пользователя без такой ссылки, тип `string` и нет `identifierOf`.", "У поля `user`, которое хранит только идентификатор пользователя, без ссылки на RecordType пользователя, тип `string` и нет `identifierOf`.");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes (as in round d).
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

// english-group5e.md: every English sentence that round e changes, under its key and field.
const sentences = (s) => (s || "").split(/(?<=[.;:])\s+|\n+/).map((x) => x.replace(/^- /, "").trim()).filter(Boolean);
const md = [
  "# T25, group 5, round e: the English sentences that changed",
  "",
  "This file holds every English sentence of group 5 that round e changed, as `tools-drafts.json` holds it after fix-group5-e.mjs has run, under the key and the field of its node, for EngStickler's readers.",
  "fix-group5-e.mjs writes this file; edit the script, not this file.",
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
fs.writeFileSync(new URL("english-group5e.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
