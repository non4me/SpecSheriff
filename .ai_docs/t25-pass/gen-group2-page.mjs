// Builds the owner's page for group 2 of stage 2 of T25 (items 20 to 26: the review of a commit, who runs the reviewer,
// the SpecTag and the bindings file) from tools-drafts.json, into group2-page/index.html. It is gen-group1-page.mjs adapted
// to group 2. Each node of the group is one collapsible section: its wording in English and in Russian, the approved wording
// beside a proposal, what changed, the reviewer's «Оценка» (from group2-assessments.json), and what is bound to the node.
// After the nodes come the English fixes to agreed sentences, the nodes changed only to carry out a decision, and the
// question only the owner can answer. The Russian of what the drafts hold only in English is in group2-ru.json, which
// build-group2-ru.mjs writes. Usage: node gen-group2-page.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
// The Russian of what the drafts hold only in English and the page shows in its Russian parts: the stage-3 notes, the
// removed passages and the notes in a location. Each entry keeps the English it renders, so a changed draft is caught.
const RU = read("group2-ru.json");
const ASSESS = read("group2-assessments.json");
const ruOf = (section, key, en, i) => {
  const entry = i === undefined ? RU[section]?.[key] : RU[section]?.[key]?.[i];
  if (!entry || entry.en !== en) throw new Error(`group2-ru.json: ${section} of ${key}${i === undefined ? "" : ` [${i}]`} is missing or out of date`);
  return entry.ru;
};
const locationRu = (k) => (/\([^)]*[A-Za-z]{3}/.test(drafts[k].location) ? ruOf("location", k, drafts[k].location) : drafts[k].location);
const DOC_RU = { guidelines: "SpecSheriff guidelines", "appendix of the tools": "описание инструментов", "draft of the appendix of the tools": "черновик описания инструментов", "proposal of group 2": "предложение группы 2", draft: "черновик" };
const docRu = (doc) => DOC_RU[doc] ?? (doc.startsWith("extension ") ? `расширение ${doc.slice(10)}` : doc);
// The reviewer's verdict and the source of the «Оценка», as the page shows them under it: a source that is not the file of a
// report has its Russian in group2-ru.json.
const verdictRu = (k, v) => ruOf("verdict", k, v);
const sourceRu = (k, s) => (/^review-[\w-]+\.md$/.test(s) ? `по отчёту ${s}` : ruOf("source", k, s));

// The nodes in the order of the review: each item of the order, with the proposals that its drafts rest on.
const ORDER = [
  [20, ["s-vp24dqydygztqbt", "new:tools-7-3-review-code", "new:tools-7-3-review-statement", "new:tools-7-3-review-appendix", "new:tools-9-no-change-trailer", "proposal:s-nyh9yk22ba6g77q"]],
  [21, ["new:tools-10-section", "s-xr5xxa9cxf2mq5u", "new:tools-10-verdict", "new:tools-10-start", "new:tools-10-limit", "new:tools-10-claude", "new:tools-10-codex", "new:tools-10-settings"]],
  [22, ["new:tools-8-section", "s-5z5gnu7pahr82xp", "new:tools-8-symbol", "new:tools-8-file-start"]],
  [23, ["s-9rtrj24myzjvshu", "new:tools-7-2-no-node", "new:tools-7-2-outside", "proposal:s-weuyx98r7c923ab"]],
  [24, ["s-zrsc6asgmhv8tnc"]],
  [25, ["s-utf4mbt7ref8g9c", "new:tools-7-2-rule-test"]],
  [26, ["new:tools-8-bindings"]],
];
const KEYS = ORDER.flatMap(([, ks]) => ks);
const itemOf = new Map(ORDER.flatMap(([n, ks]) => ks.map((k) => [k, n])));
// The keys of the group are those that group2-assessments.json assesses.
for (const k of Object.keys(ASSESS)) if (!KEYS.includes(k)) throw new Error(`${k} is in group 2 but not in the order of the page`);
for (const k of KEYS) if (!drafts[k]?.proposal) throw new Error(`no draft ${k}`);

// Titles and locations of every node a wording may cite: the new form of the guidelines and its extensions, the
// appendix of the tools, then the drafts, whose proposed titles replace those of the nodes they rewrite.
const info = new Map();
const nodeOf = new Map();
function walk(nodes, f) {
  for (const n of nodes) {
    f(n);
    if (n.children) walk(n.children, f);
    // A TableRule keeps its rows in groups, and a node in a cell has no title: its text stands in for one.
    const rows = [...(n.rows || []), ...(n.groups || []).flatMap((g) => g.rows || [])];
    for (const r of rows) for (const c of Object.values(r.cells || {})) if (c && c.node) f({ ...c.node, title: c.node.title ?? c.node.text, cell: true });
  }
}
for (const f of ["moved/specs/_guidelines/spec.json", "moved/specs/_guidelines/extensions/domains.json",
  "moved/specs/_guidelines/extensions/recordtype.json", "moved/specs/_guidelines/extensions/views.json"]) {
  const doc = f.includes("extensions/") ? "extension " + f.match(/extensions\/(\w+)/)[1] : "guidelines";
  walk(read(f).nodes, (n) => {
    if (!n.sid) return;
    info.set(n.sid, { title: n.title, location: n.location.replace(/^_guidelines\/(spec|extensions\/\w+)\//, ""), doc, cell: !!n.cell });
    nodeOf.set(n.sid, n);
  });
}
const tools = read("../../specs/_guidelines/tools.json");
walk(tools.nodes, (n) => {
  if (!n.sid) return;
  if (!info.has(n.sid)) info.set(n.sid, { title: n.title, location: "tools " + n.location.replace(/^_guidelines\/tools\/?/, ""), doc: "appendix of the tools" });
  if (!nodeOf.has(n.sid)) nodeOf.set(n.sid, n);
});
const ru = new Map();
const newform = read("newform.json");
for (const v of Object.values(newform)) if (v.sidValue && v.ruTitle) ru.set(v.sidValue, v.ruTitle);
const sidOf = (k) => drafts[k].sidValue ?? (k.startsWith("s-") ? k : null);
// The outgoing links of every node: those of the files, replaced by a draft's where a draft rewrites the node, and by a
// proposal's where the group proposes a new wording.
const outgoing = new Map();
for (const [sid, n] of nodeOf) outgoing.set(sid, (n.refs || []).filter((r) => r.to));
const ranked = Object.entries(drafts).filter(([, d]) => d?.proposal && d.sidValue).sort(([a], [b]) => Number(a.startsWith("proposal:")) - Number(b.startsWith("proposal:")));
for (const [k, d] of ranked) {
  // A draft's location may carry an English note in parentheses on where the node goes; the location alone is kept.
  const location = (d.location ?? "").replace(/\s*\(.*\)\s*$/, "");
  const cell = !d.proposal.title;
  info.set(d.sidValue, { title: d.proposal.title || location, location, doc: k.startsWith("proposal:") ? "proposal of group 2" : "draft of the appendix of the tools", cell });
  if (d.proposal.ruTitle) ru.set(d.sidValue, d.proposal.ruTitle);
  outgoing.set(d.sidValue, (d.proposal.refs || []).filter((r) => r.to));
}
for (const k of KEYS) { const s = sidOf(k); if (s && !info.has(s)) info.set(s, { title: drafts[k].proposal.title, location: drafts[k].location, doc: "draft" }); }
const incoming = new Map();
for (const [from, refs] of outgoing) for (const r of refs) {
  if (!incoming.has(r.to)) incoming.set(r.to, []);
  if (!incoming.get(r.to).some((x) => x.from === from && x.type === r.type)) incoming.get(r.to).push({ from, type: r.type });
}

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const SID = /§?(s-[2-9a-hjkmnp-z]{15})/g;
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(SID, (m, id) => {
      const i = info.get(id);
      return `<span class="cite" title="${i ? esc(i.title) : "unknown node"}">§${i ? esc(i.location) : id}</span>`;
    });
}
function cell(kind, v) {
  if (kind === "th") return `<div class="row th c${v.length}">${v.map((x) => `<span>${inline(x)}</span>`).join("")}</div>`;
  if (kind === "tr") return `<div class="row c${v.length}">${v.map((x) => `<span>${inline(x)}</span>`).join("")}</div>`;
  if (kind === "li") return `<div class="li">• ${inline(v)}</div>`;
  return `<p>${inline(v)}</p>`;
}
// A plain text, as a file holds it: paragraphs split at blank lines, list items at "- ".
const textBlock = (s) => String(s ?? "").split("\n").filter((l) => l.trim()).map((l) => (l.startsWith("- ") ? cell("li", l.slice(2)) : cell("p", l))).join("\n");
// The opening words of a part, which name the part on the page; a backtick left open is closed.
const opening = (s) => { const w = String(s).split(/\s+/).slice(0, 8).join(" "); return inline((w.match(/`/g) || []).length % 2 ? w + "`" : w); };
const field = (label, html) => (html ? `<div class="field"><div class="label">${label}</div>${html}</div>` : "");

// One wording in one language: title, text, the cost of a row, reason, examples.
function wording(w, lang) {
  const L = lang === "ru" ? { title: "Заголовок", text: "Текст", cost: "При нарушении", reason: "Обоснование", ex: "Пример" } : { title: "Title", text: "Text", cost: "On failure", reason: "Reason", ex: "Example" };
  return [
    w.title ? field(L.title, `<p class="wt">${inline(w.title)}</p>`) : "",
    field(L.text, w.parts ? w.parts.map((x) => cell(x.kind, x[lang])).join("\n") : textBlock(w.text)),
    w.cost ? field(L.cost, `<p>${inline(w.cost)}</p>`) : "",
    w.reason ? field(L.reason, textBlock(w.reason)) : "",
    ...(w.examples || []).map((x, i, all) => field(all.length > 1 ? `${L.ex} ${i + 1}` : L.ex, `<p>${inline(x)}</p>`)),
  ].join("\n");
}
const proposed = (e, lang) => {
  const p = e.proposal;
  return wording({
    title: lang === "ru" ? p.ruTitle : p.title, parts: p.parts, cost: e.cost?.[lang],
    reason: lang === "ru" ? p.ruReason : p.reason, examples: (p.examples || []).map((x) => x[lang]),
  }, lang);
};

// The approved wording that a proposal or a draft replaces, where there is one.
const table101 = read("table-10-1.json").tables.flatMap((g) => g.rows);
function approved(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  const row = /^spec (10\.1\.\d+)/.exec(e.location ?? "");
  if (k.startsWith("proposal:row-") && row) {
    const r = table101.find((x) => x.num === row[1]);
    if (r) return { what: `строка ${row[1]} таблицы проверок`, en: { text: r.en, cost: r.cost }, ru: { text: r.ru, cost: r.ruCost } };
  }
  const nf = Object.values(newform).find((v) => v.sidValue === sid && v.agreed);
  if (k.startsWith("proposal:") && nf) return { what: `согласовано ${nf.agreed}`, en: { title: nf.title, text: nf.text, reason: nf.reason, examples: nf.examples }, ru: { title: nf.ruTitle, text: nf.ruText, reason: nf.ruReason, examples: nf.ruExamples } };
  const agreedDraft = Object.entries(drafts).find(([kk, d]) => !kk.startsWith("proposal:") && d?.sidValue === sid && d.agreed);
  if (k.startsWith("proposal:") && agreedDraft) {
    const p = agreedDraft[1].proposal;
    return { what: `согласовано ${agreedDraft[1].agreed}`, en: { title: p.title, text: p.text, reason: p.reason }, ru: { title: p.ruTitle, text: p.ruText, reason: p.ruReason } };
  }
  const current = nodeOf.get(sid);
  // The Russian of an approved node of tools.json is kept in group2-ru.json, with the English it renders.
  const approvedRu = (n) => {
    const a = RU.approved?.[n.sid];
    if (!a || a.en !== n.text || a.title !== n.title) throw new Error(`group2-ru.json: the Russian of the approved node ${n.sid} is missing or out of date`);
    return { title: a.ruTitle, text: a.ru };
  };
  if (!k.startsWith("proposal:") && current && !k.startsWith("new:")) return { what: "одобрено, в specs/_guidelines/tools.json", en: { title: current.title, text: current.text }, ru: approvedRu(current) };
  const source = e.from && nodeOf.get(e.from);
  if (source) return { what: `узла «${source.title}», из которого выделен этот новый узел`, en: { title: source.title, text: source.text }, ru: approvedRu(source), carved: true };
  return null;
}

// What changed, from the parts' change fields; a new node says so.
const SAME = /^(Как в согласованной формулировке\.|Без изменений\.?)$/;
function changes(k) {
  const e = drafts[k];
  const p = e.proposal;
  const isNew = k.startsWith("new:");
  const items = [];
  if (p.titleChange) items.push(`<li><span class="quote">Заголовок.</span> ${inline(p.titleChange)}</li>`);
  p.parts.forEach((x) => { if (x.change && !SAME.test(x.change.trim())) items.push(`<li><span class="quote">«${opening(x.ru)}…»</span> ${inline(x.change)}</li>`); });
  if (p.reasonChange && !SAME.test(p.reasonChange.trim())) items.push(`<li><span class="quote">Обоснование.</span> ${inline(p.reasonChange)}</li>`);
  for (const x of p.examples || []) if (x.change) items.push(`<li><span class="quote">Пример.</span> ${inline(x.change)}</li>`);
  (p.removed || []).forEach((r, i) => items.push(`<li><span class="quote">Убрано.</span> ${inline(ruOf("removed", k, r, i))}</li>`));
  const head = isNew ? `<p class="new">Новый узел.</p>` : "";
  return head + (items.length ? `<ul class="changes">${items.join("\n")}</ul>` : isNew ? "" : `<p class="hint">Формулировка не менялась.</p>`);
}

// The reviewer's assessment, as the field `assessment` records it.
const CRITERIA = ["согласованность", "целостность", "целесообразность", "избыточность", "недостаточность"];
const missingAssessment = [];
function assessment(k) {
  const a = ASSESS[k];
  if (!a?.lines) {
    missingAssessment.push(k);
    const why = !a ? "поле с оценкой ещё не заполнено" : a.source ? `отзыв ${a.source}, признавший узел готовым, оценки не дал` : "ни один отзыв ещё не признал узел готовым";
    return `<p class="warn">Оценки нет: ${esc(why)}.</p>`;
  }
  return `<ul class="assess">${CRITERIA.map((c) => `<li><b>${c}:</b> ${inline(a.lines[c] ?? "—")}</li>`).join("\n")}</ul><p class="meta">${esc(sourceRu(k, a.source))}${a.verdict ? `; ${esc(verdictRu(k, a.verdict))}` : ""}</p>`;
}

// What is bound to the node: the nodes it links to, the nodes linking to it, its tests, the stage-3 changes to the code.
const typeRu = { implements: "реализует", cites: "ссылается", refines: "уточняет", checks: "проверяет", exempts: "освобождает", constrains: "ограничивает", "term-relation": "отношение терминов", uses: "использует", consumes: "использует раздел" };
const inGroup = new Set(KEYS.map(sidOf));
const nodeLine = (id, type, dir) => {
  const i = info.get(id) ?? { title: "?", location: "?", doc: "?" };
  // A row of a table has no title: it is named by its number, with its Russian text where the page has one, else its English wording.
  const rowRu = i.cell ? (table101.find((r) => r.num === i.location.replace(/^spec /, ""))?.ru ?? Object.values(drafts).find((d) => d?.sidValue === id && d.proposal?.ruText)?.proposal.ruText) : null;
  const name = i.cell ? `строка ${esc(i.location.replace(/^spec /, ""))}` : inline(i.title);
  const second = i.cell ? (rowRu ? esc(rowRu) : inline(i.title)) : ru.get(id) ? esc(ru.get(id)) : "";
  return `<li class="node"><span class="loc">${esc(dir === "in" ? `${typeRu[type] ?? type} этот узел` : typeRu[type] ?? type)} · ${esc(i.location)}</span> <b>${name}</b>${second ? `<br><span class="rut">${second}</span>` : ""}<br><span class="meta">${esc(docRu(i.doc))} · ${id}${inGroup.has(id) ? " · на этой странице" : ""}</span></li>`;
};
function bound(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  const out = (e.proposal.refs || []).filter((r) => r.to).map((r) => nodeLine(r.to, r.type, "out")).join("\n");
  const inc = (incoming.get(sid) || []).filter((r) => r.from !== sid).map((r) => nodeLine(r.from, r.type, "in")).join("\n");
  const base = nodeOf.get(sid) ?? (e.from && nodeOf.get(e.from));
  const testsOf = (base?.meta?.tests || []).filter((t) => !e.testsFrom || [].concat(e.testsFrom).some((f) => t.includes(f)));
  const tests = testsOf.map((t) => `<li><code>${esc(t.replace(/^.*::@spec s-\w+ /, ""))}</code><br><span class="meta">${esc(t.split("::")[0])}</span></li>`).join("\n");
  const stage3 = e.stage3 ? `<li>${inline(ruOf("stage3", k, e.stage3))}</li>` : "";
  return [
    field("На что ссылается и что реализует", out ? `<ul class="nodes">${out}</ul>` : `<p class="hint">Ни на что.</p>`),
    field("Что ссылается на узел", inc ? `<ul class="nodes">${inc}</ul>` : `<p class="hint">Ничто.</p>`),
    field("Тесты", tests ? `<ul class="plain">${tests}</ul>` : `<p class="hint">Тестов пока нет: их пишут на стадии 3, до кода.</p>`),
    field("Что изменится в коде (стадия 3)", stage3 ? `<ul class="plain">${stage3}</ul>` : `<p class="hint">Код не меняется.</p>`),
  ].join("\n");
}

const kindRu = (k) => drafts[k].kind === "section" ? "новый раздел описания инструментов"
  : k.startsWith("new:") ? "новый узел описания инструментов"
  : k.startsWith("proposal:") ? "предложение к согласованному узлу" : "переписанный узел описания инструментов";
const headingOf = (k) => {
  const p = drafts[k].proposal;
  if (p.title) return { en: p.title, ru: p.ruTitle };
  const loc = /(\d+\.\d+\.\d+a?)/.exec(drafts[k].location)?.[1] ?? "";
  return { en: `Row ${loc}`, ru: `Строка ${loc} таблицы проверок${k.includes("11-3") ? " расширения Domains" : ""}` };
};

const sections = KEYS.map((k) => {
  const e = drafts[k];
  const h = headingOf(k);
  const a = approved(k);
  const isProposal = k.startsWith("proposal:") && a && !a.carved;
  const now = `<div class="lang"><div class="label big">English</div>${proposed(e, "en")}</div>
<div class="lang"><div class="label big">Русский</div>${proposed(e, "ru")}</div>`;
  const before = a ? `<div class="lang"><div class="label big">English</div>${wording(a.en, "en")}</div>${a.ru ? `<div class="lang"><div class="label big">Русский</div>${wording(a.ru, "ru")}</div>` : `<p class="hint">Русского текста этой формулировки нет.</p>`}` : "";
  const body = isProposal
    ? `<div class="compare"><div class="col"><h3>Предлагаемая формулировка</h3>${now}</div><div class="col old"><h3>Одобренная формулировка <span class="meta">(${esc(a.what)})</span></h3>${before}</div></div>`
    : `${now}${a ? `<details class="inner" id="old-${esc(k)}"><summary>${a.carved ? "Одобренная формулировка " + esc(a.what) : "Одобренная формулировка, которую заменяет черновик"}</summary>${before}</details>` : ""}`;
  return `<details class="node-section" id="${esc(k)}">
<summary><span class="h">${inline(h.ru)}</span> <span class="hen">· ${inline(h.en)}</span></summary>
<div class="sub">${inline(locationRu(k))} · ${esc(sidOf(k))} · ${kindRu(k)} · пункт ${itemOf.get(k)}</div>
${body}
<h3>Что изменилось</h3>
${changes(k)}
<h3>Оценка</h3>
${assessment(k)}
<h3>Что связано с узлом</h3>
${bound(k)}
</details>`;
}).join("\n\n");

// English fixes to agreed sentences: the parts and reasons whose change says that only the English was corrected.
const FIX = /[Аа]нглийский текст( первой фразы)? поправлен, смысл тот же/;
const fixes = [];
for (const k of KEYS) {
  const p = drafts[k].proposal;
  const name = headingOf(k).ru;
  for (const x of p.parts) if (FIX.test(x.change)) fixes.push(`<li><b>${inline(name)}</b>, часть «${opening(x.ru)}…»: исправлен только английский текст, смысл не изменился. Теперь: <span class="en-now">${inline(x.en)}</span></li>`);
  if (FIX.test(p.reasonChange || "")) fixes.push(`<li><b>${inline(name)}</b>, обоснование: исправлен только английский текст, смысл не изменился. Теперь: <span class="en-now">${inline(p.reason)}</span></li>`);
}
// Nodes changed only to carry out a decision already made: none in this group.
const decisionOnly = [];

// Group 2 has no question for the owner: the rulings already decide what a draft does with a statement that a rule's
// implementation needs no change. The page states the cost of those rulings in one line.
const QUESTIONS = `
<p>Вопросов к вам в этой группе нет. Что рецензент делает в черновике с утверждением, что реализацию правила менять не нужно, уже решают принцип «Deterministic checks hold every participant to the contract», правила 1.6.1 (решение от 2026-11-19), 10.2 и 10.5 и строка 10.1.43a (решения от 2026-11-20).</p>
<p class="cost">Цена этих решений: пока спецификация — черновик, коммит с trailer <code>Implementation-Needs-No-Change</code> оплачивает прогон рецензента, замечание которого об этом trailer не учитывается, и отклоняется, если рецензент не дал ответа, который можно прочитать.</p>`;

const nAppendix = KEYS.filter((k) => !k.startsWith("proposal:")).length;
const nNewAppendix = KEYS.filter((k) => k.startsWith("new:")).length;
const nSections = KEYS.filter((k) => kindRu(k) === "новый раздел описания инструментов").length;
const nProposals = KEYS.filter((k) => kindRu(k) === "предложение к согласованному узлу").length;

const page = `<title>Группа 2 T25 — проверка коммита и SpecTag</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header, one collapsible section per node in the order of the review, then the fixes and the questions. Dark only. */
  :root {
    --bg: #0f171c; --panel: #17232b; --raised: #1e2d37; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --new: #e2a23b; --same: #6f7f8a; --link: #5cb8d8; --mark: #3b5566; --warn: #e07a5f; --ok: #7fbf7f;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  html, body { background: var(--bg); color: var(--fg); }
  body { font-family: var(--body); font-size: 15px; line-height: 1.45; margin: 0; padding-block: 16px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); max-width: 1200px; margin-inline: auto; }
  h1 { font-family: var(--display); font-size: 1.5rem; margin: 0 0 8px; text-wrap: balance; color: var(--fg); }
  h2 { font-family: var(--display); font-size: 1.15rem; margin: 32px 0 8px; color: var(--fg); }
  h3 { font-family: var(--display); font-size: 1rem; margin: 18px 0 6px; color: var(--fg); }
  p { margin: 0 0 6px; }
  a { color: var(--link); }
  .sub { color: var(--muted); font-family: var(--mono); font-size: 0.82rem; margin: 6px 0 10px; overflow-wrap: anywhere; }
  .label { color: var(--muted); font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; margin: 8px 0 2px; }
  .label.big { color: var(--new); font-size: 0.82rem; margin-top: 10px; }
  .field { margin-bottom: 4px; }
  .wt { font-weight: 700; }
  .lang { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 12px; margin-top: 10px; }
  .compare { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .compare .col { min-width: 0; }
  .compare .old .lang { background: #131c22; }
  .row { display: grid; grid-template-columns: 1fr 1.4fr; gap: 10px; } .row.th { color: var(--muted); font-weight: 700; }
  .row span { min-width: 0; overflow-wrap: anywhere; }
  .li { margin: 0 0 4px 4px; }
  code { font-family: var(--mono); font-size: 0.88em; background: var(--raised); color: var(--fg); padding: 0 3px; border-radius: 3px; overflow-wrap: anywhere; }
  .cite { color: var(--link); }
  ul.nodes, ul.plain, ul.assess, ul.changes, ul.options, ul.fixes { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
  li.node, ul.plain li, ul.options li, ul.fixes li { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 10px; overflow-wrap: anywhere; }
  ul.changes li { border-left: 3px solid var(--new); padding: 2px 0 2px 10px; }
  ul.assess li { padding: 2px 0; }
  .quote { color: var(--muted); }
  .new { color: var(--new); font-weight: 700; }
  .warn { color: var(--warn); font-weight: 700; }
  .cost { color: var(--muted); }
  .en-now { color: var(--muted); }
  .loc { font-family: var(--mono); color: var(--muted); } .rut { color: var(--muted); } .meta { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); }
  details.node-section { background: var(--bg); border: 1px solid var(--rule); border-radius: 8px; padding: 8px 12px; margin-top: 10px; }
  details.node-section[open] { background: #121c22; }
  details.node-section > summary { cursor: pointer; list-style-position: outside; }
  details.node-section > summary .h { font-family: var(--display); font-weight: 700; font-size: 1.05rem; color: var(--fg); }
  details.node-section > summary .hen { color: var(--muted); }
  details.inner { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 10px; margin-top: 10px; }
  details.inner > summary { cursor: pointer; color: var(--muted); }
  .hint { color: var(--muted); font-size: 0.88rem; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  button { font: inherit; color: var(--fg); background: var(--raised); border: 1px solid var(--rule); border-radius: 4px; padding: 6px 12px; cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
  .intro { background: var(--panel); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 14px; }
  @media (max-width: 760px) { .compare { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
</style>

<h1>Группа 2: проверка коммита и SpecTag</h1>
<div class="intro">
<p>Это пункты 20–26 порядка проверки на стадии 2 задачи T25: узлы описания инструментов о ревью коммита, о том, кто запускает рецензента, о SpecTag в коде и в тестах и о файле привязок, а также предложения к согласованным узлам, которые для них нужно изменить.</p>
<p>На странице ${KEYS.length} узлов. ${nAppendix} из них — узлы описания инструментов: ${nAppendix - nNewAppendix} переписанных, ${nNewAppendix - nSections} новых и ${nSections} новых раздела. ${nProposals} — предложения к согласованным узлам: каждое показано целиком рядом с одобренной формулировкой.</p>
<p>Вы отвечаете на всю группу одним сообщением: согласие или замечания к отдельным узлам. Вопросов к вам в этой группе нет.</p>
</div>
<div class="bar"><button id="open-all" type="button">Раскрыть всё</button><button id="close-all" type="button">Свернуть всё</button></div>

<h2>Узлы группы</h2>
${sections}

<h2>Исправления английского текста в согласованных предложениях</h2>
<p class="hint">Смысл каждого предложения не изменился: поправлен только английский текст, чтобы он говорил ровно то, что говорит русский.</p>
<ul class="fixes">
${fixes.join("\n")}
</ul>

<h2>Узлы, изменённые только во исполнение уже принятого решения</h2>
${decisionOnly.length ? `<ul class="fixes">${decisionOnly.join("\n")}</ul>` : `<p class="hint">В этой группе таких узлов нет: каждый изменённый узел показан выше целиком.</p>`}

<h2>Вопросы, на которые можете ответить только вы</h2>
${QUESTIONS}

<script>
  // An opened section stays open across reloads and republishes; one control opens every section.
  const details = [...document.querySelectorAll("details")];
  const key = "open:" + location.pathname;
  try { const open = JSON.parse(localStorage.getItem(key) || "[]"); details.forEach((d) => { if (open.includes(d.id)) d.open = true; }); } catch {}
  const save = () => { try { localStorage.setItem(key, JSON.stringify(details.filter((d) => d.open).map((d) => d.id))); } catch {} };
  details.forEach((d) => d.addEventListener("toggle", save));
  document.getElementById("open-all").addEventListener("click", () => { details.forEach((d) => { d.open = true; }); save(); });
  document.getElementById("close-all").addEventListener("click", () => { details.forEach((d) => { d.open = false; }); save(); });
</script>
`;
fs.mkdirSync(new URL("group2-page/", here), { recursive: true });
fs.writeFileSync(new URL("group2-page/index.html", here), page);
console.log(`group2-page/index.html written: ${KEYS.length} nodes, ${fixes.length} English fixes to agreed sentences`);
console.log(missingAssessment.length ? `no «Оценка» for: ${missingAssessment.join(", ")}` : "every node has its «Оценка»");
