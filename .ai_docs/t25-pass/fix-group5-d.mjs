// T25, stage 2, group 5, round d: applies the final review's reports (review-g5c-a.md to review-g5c-d.md,
// english-g5c-fast.md, english-g5c-thorough.md) as the corrected fix-brief-group5-d.md says: answer A stays in item 46a and
// remains the recommendation, and the question for the owner gains review c-d's findings 1 and 2 (group5-notes.md).
// Copies tools-drafts.json to tools-drafts.before-group5-d.json on its first run and rebuilds from that copy on every
// run, so that it is idempotent. Each patch fails where it does not find the text it replaces. Runs the checks of the
// earlier rounds and writes english-group5d.md, every English sentence that round d changes, under its key.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group5-d.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const before = JSON.parse(backupText);
const DATE = "2026-11-24";
const REVIEW_D = "; specsheriff-rule-reviewer, 2026-11-24, final review: review-g5c-a.md to review-g5c-d.md; EngStickler's readers: english-g5c-fast.md and english-g5c-thorough.md; fix-group5-d.mjs applied the findings, as group5-notes.md, round d, says";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const R = (type, to) => ({ type, to });
const problems = [];

const GROUP = ["s-vuujweu57sxsa58", "s-gvafe6bnstwab8b", "s-uxmkwbnpgtjzkgv", "s-3anv9qcmx8pwp2w", "s-c2r9jndrjbtbsv6", "s-5nf87c3e3jg9v7c", "new:tools-7-1-enum-values", "s-ezq8csd433vj6fj"];
const changed = new Set();
const entry = (key) => {
  changed.add(key);
  const e = drafts[key];
  e.review = (e.review || "") + REVIEW_D;
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
const indexOfPart = (key, start) => {
  const i = drafts[key].proposal.parts.findIndex((p) => p.en.startsWith(start));
  if (i < 0) problems.push(`${key}: no part starts with "${start.slice(0, 50)}…"`);
  return i;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 41: s-vuujweu57sxsa58 (review c-a's nit; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-vuujweu57sxsa58";
  const p = entry(k).proposal;
  rep(k, p, "reason", "A node that relies on what another domain states links to the node of that domain that states it, by a link of any type (§s-hr7j7scmfkkjnws). So a check that followed links of every type would refuse domains that do not use one another.", "A node that relies on what another domain states has a link, of whatever type, to the node of that domain that states it (§s-hr7j7scmfkkjnws). So a check that followed links of every type would refuse changes in which domains do not use one another.");
  rep(k, p, "ruReason", "отвергала бы домены, которые друг друга не используют.", "отвергала бы изменения, в которых домены друг друга не используют.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 42: s-gvafe6bnstwab8b (review c-a's WORDING FIX; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-gvafe6bnstwab8b";
  const p = entry(k).proposal;
  const p2 = part(k, "`sheriff validate` refuses any other file of the technical appendix");
  p2.en = "`sheriff validate` refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), naming the file.";
  p2.ru = "Любой другой файл JSON в `specs/tech/`, где хранится техническое приложение (§s-tj38pvm38nepaf5), `sheriff validate` отвергает и называет этот файл.";
  const p3 = part(k, "In a file named after a domain,");
  rep(k, p3, "en", "`sheriff validate` refuses any other section of the file, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title.", "`sheriff validate` refuses any other section below the file's first top-level node, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and giving its title.");
  rep(k, p3, "ru", "Любой другой раздел этого файла `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) раздела, а также его название.", "Любой другой раздел под первым узлом верхнего уровня файла `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) раздела, а также его название.");
  rep(k, p, "reason", "holds an implementation that such a reader does not find.", "holds an implementation that such a reader will not find.");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 43: s-uxmkwbnpgtjzkgv (ready; a reader's finding in the example).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-uxmkwbnpgtjzkgv";
  const p = entry(k).proposal;
  rep(k, p.examples[0], "en", "An approved rule of `project.json` refines", "An approved rule in `project.json` refines");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 44: s-3anv9qcmx8pwp2w (ready; review c-b's nit 1; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-3anv9qcmx8pwp2w";
  const e = entry(k);
  const p = e.proposal;
  const p3 = part(k, "The chain of identifiers that starts at a field");
  rep(k, p3, "en", "A chain that goes to the identifying field of the same RecordType a second time never ends.", "A chain that reaches the identifying field of one RecordType a second time never ends.");
  const ex = p.examples[0];
  rep(k, ex, "en", "whose `identifierOf` names the other, so", "whose `identifierOf` names the other RecordType, so");
  rep(k, ex, "ru", "`identifierOf` которого называет другой, поэтому", "`identifierOf` которого называет другой RecordType, поэтому");
  rep(k, e, "stage3", "validate.ts:419 refuses an identifiedBy", "validate.ts:423 refuses only where the named RecordType has no identifiedBy; it is also to refuse the field where identifiedBy names none of that RecordType's fields. validate.ts:419 refuses an identifiedBy");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 45: s-c2r9jndrjbtbsv6 (review c-c's finding 1; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-c2r9jndrjbtbsv6";
  const e = entry(k);
  const p = e.proposal;
  const l2 = part(k, "it is declared in the same section of the base specification");
  rep(k, l2, "en", "in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz)", "in the same section of the base specification (§s-5x737t9nee4zgaa) as its RecordType (§s-vtpxwqe7ncmn5bz)");
  rep(k, l2, "ru", "в том же разделе базовой спецификации, что и его RecordType (§s-vtpxwqe7ncmn5bz)", "в том же разделе базовой спецификации (§s-5x737t9nee4zgaa), что и его RecordType (§s-vtpxwqe7ncmn5bz)");
  p.refs.push(R("cites", "s-5x737t9nee4zgaa"));
  const pr = part(k, "`sheriff validate` refuses any other RecordType variant");
  rep(k, pr, "en", "For the last condition, it also names each other RecordType variant with the same `answersTo`.", "For the last condition, the refusal names each other RecordType variant with the same `answersTo` as well.");
  const pf = part(k, "Where a RecordType variant fails the first condition");
  rep(k, pf, "en", "checks it further only against the third, since", "checks it further only against the third condition, since");
  const pt = part(k, "Where a RecordType has no `chosenBy`");
  pt.en = "Where a RecordType has no `chosenBy`, and the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in their `chosenBy`, `sheriff validate` refuses each RecordType variant that refines it for failing the first condition. The refusal names each of those RecordTypes.";
  pt.ru = "Если у RecordType нет `chosenBy`, а RecordType с `chosenBy`, к которым от него ведёт наименьшее число связей `refines`, называют в своих `chosenBy` разные поля, `sheriff validate` отвергает каждый вариант RecordType, который его уточняет, как не выполняющий первого условия. Отказ называет каждый из этих RecordType.";
  rep(k, pt, "change", "а здесь таких наборов полей два.", "а здесь таких наборов полей несколько. Если таких RecordType больше двух, правило то же, и отказ называет каждый.");
  const ex = p.examples[0];
  rep(k, ex, "en", "Another RecordType variant of `notification` names `sms` for `channel` and declares `text`.", "Another RecordType variant of `notification` names `sms` for `channel` in its `answersTo` and declares `text`.");
  rep(k, ex, "ru", "Другой вариант RecordType `notification` называет для `channel` значение `sms` и объявляет `text`.", "Другой вариант RecordType `notification` называет в своём `answersTo` для `channel` значение `sms` и объявляет `text`.");
  rep(k, e, "stage3", "and the RecordTypes with a chosenBy that it reaches through the fewest refines links are two that name different fields, each variant that refines it is to be refused under the first condition, naming both;", "and the RecordTypes with a chosenBy that it reaches through the fewest refines links name different fields, each variant that refines it is to be refused under the first condition, naming each of those RecordTypes;");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46a: s-5nf87c3e3jg9v7c (answer A stays, by the corrected brief; review c-d's findings 3 to 5; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-5nf87c3e3jg9v7c";
  const e = entry(k);
  const p = e.proposal;
  rep(k, p.examples[0], "ru", "`sheriff reindex` записывает в `x-enumSource.gathered` поля `contracts`, `requests` и `users`.", "`sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` этого поля.");
  rep(k, p.examples[1], "en", "The field `part` of the RecordType of an audit log entry, whose `x-enumSource.from` is `parts`, gets the title of each of those sections, each with the sid of its section.", "The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. That field is given the title of each of those sections, together with the sid of that section.");
  rep(k, p.examples[1], "ru", "Поле `part` RecordType записи журнала аудита, `x-enumSource.from` которого — `parts`, получает название каждого из этих разделов вместе с sid этого раздела.", "У RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Это поле получает название каждого из этих разделов вместе с sid этого раздела.");
  p.removed = p.removed.map((r) => r.replaceAll("“The values and the source of a field with `enum`”", "“Fields with `enum` that `sheriff validate` accepts”"));
  if (p.removed.some((r) => r.includes("The values and the source"))) problems.push(`${k}: a removed item still gives 46b its round-a title`);
}

// ---------------------------------------------------------------------------------------------------------------
// Item 46b: new:tools-7-1-enum-values (ready; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-7-1-enum-values";
  const p = entry(k).proposal;
  rep(k, p, "reason", "A field with no value, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass its mistake on to the generated code.", "A field with no values, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass the mistake on to the generated code.");
  rep(k, p, "ruReason", "перенесло бы свою ошибку в сгенерированный код.", "перенесло бы ошибку в сгенерированный код.");
  rep(k, p.examples[0], "en", "The RecordType of an entry of the job log", "The RecordType of a job log entry");
}

// ---------------------------------------------------------------------------------------------------------------
// Item 47: s-ezq8csd433vj6fj (ready; review c-b's nit 3; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-ezq8csd433vj6fj";
  const p = entry(k).proposal;
  const p1 = part(k, "Where the project has chosen the RecordType extension");
  rep(k, p1, "en", "`sheriff validate` leaves a reference from one RecordType (§s-7vm323mhry2enx3) to another unreported only in the following cases", "`sheriff validate` leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases");
  rep(k, part(k, "A fragment of a format is a RecordType in the contracts section."), "change", "(правило 12.1, ваши решения от 2026-11-19).", "(правило 12.1, ваши решения от 2026-11-19). Новое: RecordType в `specs/base/`, которые не содержит ни один такой раздел, считаются одной частью системы, так же как согласованный узел s-4bwa4zepd4nwcv8 считает правила вне разделов.");
  const ex = p.examples[0];
  rep(k, ex, "en", "has a field `address` with a `$ref` to `address`, a fragment of a format.", "has a field `deliveryAddress` with a `$ref` to `address`, a fragment of a format.");
  rep(k, ex, "ru", "есть поле `address` с `$ref` на `address` — фрагмент формата.", "есть поле `deliveryAddress` с `$ref` на `address` — фрагмент формата.");
  rep(k, ex, "en", "`sheriff validate` reports the RecordType of a request, naming it and the RecordType of a user, each by its sid, and lets the change pass.", "`sheriff validate` reports that RecordType, naming it and the RecordType of a user, each by its sid, and lets the change pass.");
  rep(k, ex, "ru", "`sheriff validate` сообщает о RecordType заявки, называя", "`sheriff validate` сообщает об этом RecordType, называя");
  rep(k, ex, "en", "To store a user's identifier without such a reference, the field `user` would have the type `string` and no `identifierOf`.", "A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`.");
  rep(k, ex, "ru", "Чтобы хранить идентификатор пользователя без такой ссылки, у поля `user` был бы тип `string` и не было бы `identifierOf`.", "У поля `user`, которое хранит идентификатор пользователя без такой ссылки, тип `string` и нет `identifierOf`.");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes (as in the earlier rounds).
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

// english-group5d.md: every English sentence that round d changes, under its key and field.
const sentences = (s) => (s || "").split(/(?<=[.;:])\s+|\n+/).map((x) => x.replace(/^- /, "").trim()).filter(Boolean);
const md = [
  "# T25, group 5, round d: the English sentences that changed",
  "",
  "This file holds every English sentence of group 5 that round d changed, as `tools-drafts.json` holds it after fix-group5-d.mjs has run, under the key and the field of its node, for EngStickler's readers.",
  "fix-group5-d.mjs writes this file; edit the script, not this file.",
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
fs.writeFileSync(new URL("english-group5d.md", here), md.join("\n"));

console.log(`changed ${changed.size} keys: ${[...changed].join(", ")}`);
