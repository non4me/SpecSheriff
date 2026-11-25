// Builds the owner's page for group 5 of stage 2 of T25 from tools-drafts.json, into group5-page/index.html. Group 5 is
// items 41 to 47, the nodes of the appendix of the tools that implement the rows of the tables of checks of the
// Domains extension (table 11.3) and of the RecordType extension (table 12.12). It is gen-group4-page.mjs adapted to group 5.
// Each key of the group is one collapsible section. The section shows the key's wording in English and in Russian, the
// approved wording that it replaces, what changed, the «Оценка» (from group5-assessments.json) and what is bound to the
// node. After the nodes come the nodes changed only to carry out a decision, and then the one question that only the
// owner can answer, taken from group5-notes.md. The Russian of what the drafts hold only in English is in group5-ru.json,
// which build-group5-ru.mjs writes.
// Usage: node gen-group5-page.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
// The Russian of what the drafts hold only in English and the page shows in its Russian parts: the stage-3 notes, the
// removed passages and the notes in a location. Each entry keeps the English it renders, so a changed draft is caught.
const RU = read("group5-ru.json");
const ASSESS = read("group5-assessments.json");
const ruOf = (section, key, en, i) => {
  const entry = i === undefined ? RU[section]?.[key] : RU[section]?.[key]?.[i];
  if (!entry || entry.en !== en) throw new Error(`group5-ru.json: ${section} of ${key}${i === undefined ? "" : ` [${i}]`} is missing or out of date`);
  return entry.ru;
};
const locationRu = (k) => (/\([^)]*[A-Za-z]{3}/.test(drafts[k].location) ? ruOf("location", k, drafts[k].location) : drafts[k].location);
const DOC_RU = {
  guidelines: "SpecSheriff guidelines", "appendix of the tools": "описание инструментов",
  "draft of the appendix of the tools": "черновик описания инструментов", "agreed draft of the appendix of the tools": "согласованный черновик описания инструментов",
  "proposal of group 5": "предложение группы 5", "agreed proposal": "согласованное предложение", "proposal of an earlier group": "предложение одной из прежних групп", draft: "черновик",
};
const docRu = (doc) => DOC_RU[doc] ?? (doc.startsWith("extension ") ? `расширение ${doc.slice(10)}` : doc);

// The keys in the order of the review: the drafts of items 41 to 47, with the new node of item 46 right after the node
// that it is split out of. No key of group 5 serves another item, so SERVES is empty.
const ORDER = [
  ["Пункт 41", ["s-vuujweu57sxsa58"]],
  ["Пункт 42", ["s-gvafe6bnstwab8b"]],
  ["Пункт 43", ["s-uxmkwbnpgtjzkgv"]],
  ["Пункт 44", ["s-3anv9qcmx8pwp2w"]],
  ["Пункт 45", ["s-c2r9jndrjbtbsv6"]],
  ["Пункт 46", ["s-5nf87c3e3jg9v7c", "new:tools-7-1-enum-values"]],
  ["Пункт 47", ["s-ezq8csd433vj6fj"]],
];
const SERVES = {};
// Two parts of one key depend on the owner's answer to the question at the end of the page: its paragraph on a project
// without the Domains extension and its second example.
const DEPENDS = new Set(["s-5nf87c3e3jg9v7c"]);
const KEYS = ORDER.flatMap(([, ks]) => ks);
const itemOf = new Map(ORDER.flatMap(([label, ks]) => ks.map((k) => [k, SERVES[k] ?? Number(label.replace(/\D/g, ""))])));
// The keys of the group are those that group5-assessments.json assesses, and each of them is on the page once.
for (const k of Object.keys(ASSESS)) if (!KEYS.includes(k)) throw new Error(`${k} is in group 4 but not in the order of the page`);
for (const k of KEYS) if (!ASSESS[k]) throw new Error(`${k} is in the order of the page but has no «Оценка»`);
if (new Set(KEYS).size !== KEYS.length) throw new Error("a key is twice in the order of the page");
for (const k of KEYS) if (!drafts[k]?.proposal) throw new Error(`no draft ${k}`);

// Titles and locations of every node a wording may cite: the new form of the guidelines and its extensions, the
// appendix of the tools, then the drafts, whose proposed titles replace those of the nodes they rewrite.
const info = new Map();
const nodeOf = new Map();
function walk(nodes, f) {
  for (const n of nodes) {
    f(n);
    if (n.children) walk(n.children, f);
    // A TableRule keeps its rows in groups, and a node in a cell has no title: its text is shown in place of one.
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
// Every test bound to an approved node. Most tests of group 5 still carry the SpecTag of the main table of checks, so
// the node in specs/_guidelines/spec.json that holds them is not the node that the test is written from.
const ALL_TESTS = [...new Set([read("../../specs/_guidelines/spec.json"), tools].flatMap((doc) => {
  const found = [];
  walk(doc.nodes, (n) => found.push(...(n.meta?.tests || [])));
  return found;
}))];
const ru = new Map();
const newform = read("newform.json");
for (const v of Object.values(newform)) if (v.sidValue && v.ruTitle) ru.set(v.sidValue, v.ruTitle);
const sidOf = (k) => drafts[k].sidValue ?? (k.startsWith("s-") ? k : null);
// The outgoing links of every node: those of the files, replaced by a draft's where a draft rewrites the node, and by a
// proposal's where a proposal gives a new wording. The keys of this group come last, so their links prevail.
const outgoing = new Map();
for (const [sid, n] of nodeOf) outgoing.set(sid, (n.refs || []).filter((r) => r.to));
const rank = ([k]) => (KEYS.includes(k) ? 2 : k.startsWith("proposal:") ? 1 : 0);
const ranked = Object.entries(drafts).filter(([, d]) => d?.proposal && d.sidValue).sort((a, b) => rank(a) - rank(b));
for (const [k, d] of ranked) {
  // A draft's location may carry an English note in parentheses on where the node goes; the location alone is kept.
  const location = (d.location ?? "").replace(/\s*\(.*\)\s*$/, "");
  const cell = !d.proposal.title;
  const doc = k.startsWith("proposal:")
    ? (KEYS.includes(k) ? "proposal of group 5" : d.agreed ? "agreed proposal" : "proposal of an earlier group")
    : d.agreed ? "agreed draft of the appendix of the tools" : "draft of the appendix of the tools";
  info.set(d.sidValue, { title: d.proposal.title || location, location, doc, cell });
  if (d.proposal.ruTitle) ru.set(d.sidValue, d.proposal.ruTitle);
  outgoing.set(d.sidValue, (d.proposal.refs || []).filter((r) => r.to));
}
const incoming = new Map();
for (const [from, refs] of outgoing) for (const r of refs) {
  if (!incoming.has(r.to)) incoming.set(r.to, []);
  if (!incoming.get(r.to).some((x) => x.from === from && x.type === r.type)) incoming.get(r.to).push({ from, type: r.type });
}

const kindRu = (k) => drafts[k].kind === "cell" ? (/\(new row/.test(drafts[k].location) ? "предложение: новая строка основной таблицы проверок" : "предложение к строке основной таблицы проверок")
  : k.startsWith("proposal:new-spec-") ? "предложение: новый узел базовой спецификации, выделенный из правила 1.6.1"
  : k.startsWith("new:") ? (drafts[k].from ? "новый узел описания инструментов, выделенный из одобренного узла" : "новый узел описания инструментов")
  : k.startsWith("proposal:") ? "предложение к согласованному узлу" : "переписанный узел описания инструментов";
const headingOf = (k) => {
  const p = drafts[k].proposal;
  if (p.title) return { en: p.title, ru: p.ruTitle };
  const loc = /(\d+\.\d+\.\d+[a-z]?)/.exec(drafts[k].location)?.[1] ?? "";
  return { en: `Row ${loc}`, ru: `Строка ${loc} таблицы проверок` };
};

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const SID = /§?(s-[2-9a-hjkmnp-z]{15})/g;
function inlineText(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(SID, (m, id) => {
      const i = info.get(id);
      return `<span class="cite" title="${i ? esc(i.title) : "узел убран из спецификации"}">§${i ? esc(i.location) : id}</span>`;
    });
}
// A key of this page, such as proposal:row-10-1-35a, is shown as a link to its section, named by its Russian heading.
const KEYREF = /\b((?:proposal|new):[a-z0-9-]*[a-z0-9])/g;
function inline(s) {
  const str = String(s ?? "");
  let html = "";
  let last = 0;
  for (const m of str.matchAll(KEYREF)) {
    if (!KEYS.includes(m[1])) continue;
    html += inlineText(str.slice(last, m.index)) + `<a href="#${esc(m[1])}">«${inlineText(headingOf(m[1]).ru)}»</a>`;
    last = m.index + m[1].length;
  }
  return html + inlineText(str.slice(last));
}
function cell(kind, v) {
  if (kind === "li") return `<div class="li">• ${inline(v)}</div>`;
  if (kind === "li2") return `<div class="li li2">◦ ${inline(v)}</div>`;
  return `<p>${inline(v)}</p>`;
}
// A plain text, as a file holds it: paragraphs split at blank lines, list items at "- ", nested items at "  - ".
const textBlock = (s) => String(s ?? "").split("\n").filter((l) => l.trim())
  .map((l) => (/^\s+- /.test(l) ? cell("li2", l.replace(/^\s+- /, "")) : l.startsWith("- ") ? cell("li", l.slice(2)) : cell("p", l))).join("\n");
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
    ...(w.examples || []).map((x, i, all) => field(all.length > 1 ? `${L.ex} ${i + 1}` : L.ex, textBlock(x))),
  ].join("\n");
}
const fromProposal = (e, p, lang) => ({
  title: lang === "ru" ? p.ruTitle : p.title, parts: p.parts, cost: e.cost?.[lang],
  reason: lang === "ru" ? p.ruReason : p.reason, examples: (p.examples || []).map((x) => x[lang]),
});
const proposed = (e, lang) => wording(fromProposal(e, e.proposal, lang), lang);

// The agreed or approved wording that a proposal or a draft replaces, where there is one: the agreed draft that a
// proposal names as its base, the agreed wording of the new form of the guidelines, the approved node of tools.json, or
// the approved node that a new node is carved from.
function approved(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  const row = e.kind === "cell" && /^spec (10\.1\.\d+[a-z]?)$/.exec(e.location ?? "");
  if (row) {
    const r = read("table-10-1.json").tables.flatMap((g) => g.rows).find((x) => x.num === row[1]);
    if (r) return { what: `строка ${row[1]}, согласовано ${r.agreed}`, en: { text: r.en, cost: r.cost }, ru: { text: r.ru, cost: r.ruCost } };
  }
  if (e.base) {
    const b = drafts[e.base];
    if (!b?.agreed) throw new Error(`${k}: its base ${e.base} is not an agreed draft`);
    return { what: `согласовано ${b.agreed}`, en: fromProposal(b, b.proposal, "en"), ru: fromProposal(b, b.proposal, "ru") };
  }
  const nf = sid && Object.values(newform).find((v) => v.sidValue === sid && v.agreed);
  if (k.startsWith("proposal:") && nf) return { what: `согласовано ${nf.agreed}`, en: { title: nf.title, text: nf.text, reason: nf.reason, examples: nf.examples }, ru: { title: nf.ruTitle, text: nf.ruText, reason: nf.ruReason, examples: nf.ruExamples } };
  if (k.startsWith("proposal:")) return null;
  // The Russian of an approved node of tools.json is kept in group5-ru.json, with the English it renders.
  const approvedRu = (n) => {
    const a = RU.approved?.[n.sid];
    if (!a || a.en !== n.text || a.title !== n.title) throw new Error(`group5-ru.json: the Russian of the approved node ${n.sid} is missing or out of date`);
    return { title: a.ruTitle, text: a.ru };
  };
  const current = !k.startsWith("new:") && nodeOf.get(sid);
  if (current) return { what: "одобрено, в specs/_guidelines/tools.json", en: { title: current.title, text: current.text }, ru: approvedRu(current) };
  const source = e.from && nodeOf.get(e.from);
  if (source) return { what: `узла «${source.title}», из которого выделен этот новый узел`, en: { title: source.title, text: source.text }, ru: approvedRu(source), carved: true };
  return null;
}

// What changed: for a proposal, its Russian list of what changed and why; then the parts' change fields. A part that
// keeps the agreed words is left out, since the proposal's list already says so.
const SAME = /^(Как в согласованной формулировке|Без изменений|Шаг вложенного списка)/;
function changes(k) {
  const e = drafts[k];
  const p = e.proposal;
  const isNew = k.startsWith("new:") || k.startsWith("proposal:new-spec-") || (e.kind === "cell" && /\(new row/.test(e.location));
  const items = [];
  if (p.titleChange) items.push(`<li><span class="quote">Заголовок.</span> ${inline(p.titleChange)}</li>`);
  p.parts.forEach((x) => { if (x.change && !SAME.test(x.change.trim())) items.push(`<li><span class="quote">«${opening(x.ru)}…»</span> ${inline(x.change)}</li>`); });
  if (p.reasonChange && !SAME.test(p.reasonChange.trim())) items.push(`<li><span class="quote">Обоснование.</span> ${inline(p.reasonChange)}</li>`);
  (p.examples || []).forEach((x, i, all) => {
    const label = all.length > 1 ? `Пример ${i + 1}.` : "Пример.";
    if (x.change) items.push(`<li><span class="quote">${label}</span> ${inline(x.change)}</li>`);
    else if (!isNew) items.push(`<li><span class="quote">${label}</span> Новое: у одобренного узла примеров не было.</li>`);
  });
  (p.removed || []).forEach((r, i) => items.push(`<li><span class="quote">Убрано.</span> ${inline(ruOf("removed", k, r, i))}</li>`));
  const parent = e.from && KEYS.find((x) => sidOf(x) === e.from);
  const head = isNew ? `<p class="new">${e.kind === "cell" ? "Новая строка." : parent ? `Новый узел. Он выделен из узла <a href="#${esc(parent)}">«${inlineText(headingOf(parent).ru)}»</a>, который тоже есть на этой странице.` : "Новый узел."}</p>` : "";
  const why = e.change ? `<div class="why">${textBlock(e.change)}</div>` : "";
  const list = items.length ? `${why ? `<p class="label">По частям</p>` : ""}<ul class="changes">${items.join("\n")}</ul>` : "";
  return head + why + (list || (isNew || why ? "" : `<p class="hint">Формулировка не менялась.</p>`));
}

// The assessment of the final wording, from group5-assessments.json: its five lines only, as on group 2's page.
const CRITERIA = ["согласованность", "целостность", "целесообразность", "избыточность", "недостаточность"];
function assessment(k) {
  const a = ASSESS[k];
  for (const c of CRITERIA) if (!a.lines?.[c]) throw new Error(`${k}: the «Оценка» lacks the line ${c}`);
  return `<ul class="assess">${CRITERIA.map((c) => `<li><b>${c}:</b> ${inline(a.lines[c])}</li>`).join("\n")}</ul>`;
}

// What is bound to the node: the nodes it links to, the nodes linking to it, its tests, the stage-3 changes to the code.
const typeRu = { implements: "реализует", cites: "ссылается", refines: "уточняет", checks: "проверяет", exempts: "освобождает", constrains: "ограничивает", "term-relation": "отношение терминов", uses: "использует", consumes: "использует раздел" };
const inGroup = new Set(KEYS.map(sidOf).filter(Boolean));
const table101 = read("table-10-1.json").tables.flatMap((g) => g.rows);
const nodeLine = (id, type, dir) => {
  const i = info.get(id) ?? { title: "?", location: "?", doc: "?" };
  // A row of a table has no title: it is named by its number, with its Russian text where the page has one, else its English wording.
  const rowNum = i.location.replace(/^spec /, "");
  const rowRu = i.cell ? (table101.find((r) => r.num === rowNum)?.ru ?? Object.values(drafts).find((d) => d?.sidValue === id && d.proposal?.ruText)?.proposal.ruText) : null;
  const name = i.cell ? `строка ${esc(rowNum)}` : inline(i.title);
  const second = i.cell ? (rowRu ? inline(rowRu) : inline(i.title)) : ru.get(id) ? inline(ru.get(id)) : "";
  return `<li class="node"><span class="loc">${esc(dir === "in" ? `${typeRu[type] ?? type} этот узел` : typeRu[type] ?? type)} · ${esc(i.location)}</span> <b>${name}</b>${second ? `<br><span class="rut">${second}</span>` : ""}<br><span class="meta">${esc(docRu(i.doc))} · ${id}${inGroup.has(id) ? " · на этой странице" : ""}</span></li>`;
};
function bound(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  const out = (e.proposal.refs || []).filter((r) => r.to).map((r) => nodeLine(r.to, r.type, "out")).join("\n");
  const inc = sid ? (incoming.get(sid) || []).filter((r) => r.from !== sid).map((r) => nodeLine(r.from, r.type, "in")).join("\n") : "";
  const base = nodeOf.get(sid) ?? (e.from && nodeOf.get(e.from));
  // A key's tests are those whose names hold a name that its testsFrom gives, wherever they are bound; an empty testsFrom
  // means that the node has no test yet. A test that carries another node's SpecTag says so.
  const from = [].concat(e.testsFrom ?? []);
  const testsOf = e.testsFrom ? ALL_TESTS.filter((t) => from.some((f) => t.includes(f))) : base?.meta?.tests || [];
  const tests = testsOf.map((t) => {
    const tag = /::@spec (s-\w+) /.exec(t)?.[1];
    const other = tag && tag !== sid ? ` · SpecTag сейчас называет ${inline(tag)}` : "";
    return `<li><code>${esc(t.replace(/^.*::@spec s-\w+ /, ""))}</code><br><span class="meta">${esc(t.split("::")[0])}${other}</span></li>`;
  }).join("\n");
  const stage3 = e.stage3 ? `<li>${inline(ruOf("stage3", k, e.stage3))}</li>` : "";
  return [
    field("На что ссылается и что реализует", out ? `<ul class="nodes">${out}</ul>` : `<p class="hint">Ни на что.</p>`),
    field("Что ссылается на узел", inc ? `<ul class="nodes">${inc}</ul>` : `<p class="hint">${sid ? "Ничто." : "Ничто: у узла ещё нет sid, его даст sheriff reindex."}</p>`),
    field("Тесты", tests ? `<ul class="plain">${tests}</ul>` : `<p class="hint">Тестов пока нет: их пишут на стадии 3, до кода.</p>`),
    field("Что изменится в коде (стадия 3)", stage3 ? `<ul class="plain">${stage3}</ul>` : `<p class="hint">Код не меняется.</p>`),
  ].join("\n");
}

const sections = new Map(KEYS.map((k) => {
  const e = drafts[k];
  const h = headingOf(k);
  const a = approved(k);
  const isProposal = k.startsWith("proposal:") && a && !a.carved;
  const now = `<div class="lang"><div class="label big">English</div>${proposed(e, "en")}</div>
<div class="lang"><div class="label big">Русский</div>${proposed(e, "ru")}</div>`;
  const before = a ? `<div class="lang"><div class="label big">English</div>${wording(a.en, "en")}</div>${a.ru ? `<div class="lang"><div class="label big">Русский</div>${wording(a.ru, "ru")}</div>` : `<p class="hint">Русского текста этой формулировки нет.</p>`}` : "";
  const body = isProposal
    ? `<div class="compare"><div class="col"><h3>Предлагаемая формулировка</h3>${now}</div><div class="col old"><h3>Согласованная формулировка <span class="meta">(${esc(a.what)})</span></h3>${before}</div></div>`
    : `${now}${a ? `<details class="inner" id="old-${esc(k)}"><summary>${a.carved ? "Одобренная формулировка " + esc(a.what) : "Одобренная формулировка, которую заменяет черновик"}</summary>${before}</details>` : ""}`;
  const sid = sidOf(k);
  const depends = DEPENDS.has(k) ? ` · <a href="#q1">абзац о проекте без расширения Domains и второй пример зависят от вашего ответа на вопрос</a>` : "";
  return `<details class="node-section" id="${esc(k)}">
<summary><span class="h">${inline(h.ru)}</span> <span class="hen">· ${inline(h.en)}</span></summary>
<div class="sub">${inline(locationRu(k))} · ${sid ? esc(sid) : "sid даст sheriff reindex"} · ${kindRu(k)} · ${SERVES[k] ? `нужно пункту ${itemOf.get(k)}` : `пункт ${itemOf.get(k)}`}${depends}</div>
${body}
<h3>Что изменилось</h3>
${changes(k)}
<h3>Оценка</h3>
${assessment(k)}
<h3>Что связано с узлом</h3>
${bound(k)}
</details>`;
}).map((html, i) => [KEYS[i], html]));

// Nodes outside the group changed only to carry out a decision already made, one line each (group5-notes.md, the list of
// changes still needed outside the group). What is deferred to a later group or to stage 3 is left out.
const decisionOnly = [
  "Перечень того, какие узлы реализуют строки таблиц проверок расширений (`moved/impl.json`): строки 12.12.11, 12.12.12 и 12.12.13 реализует новый узел «Поля с `enum`, которые принимает `sheriff validate`» (s-dk3zfkbhc3v6xbp), а строки 12.12.15 и 12.12.16 — s-ezq8csd433vj6fj. Сейчас у этих строк нет ни одного узла. Строки 11.3.4–11.3.6 и 12.12.2–12.12.10 остаются за прежними узлами.",
  "Согласованный черновик «What the SpecSheriff tools read in the project's own guidelines» (s-t9j29hppag2nren) получает свой sid, чтобы узел «Уровень в заголовке домена» мог на него сослаться. Формулировка черновика не меняется, а sid вписывается в узел, когда черновики переносятся в specs/.",
  "Только если вы выберете ответ А на вопрос ниже: в согласованном предложении к правилу 8.5 «A node's location» (s-kag2m9tzdnduxdx) и в согласованном узле «The judgement on a node of the technical appendix that a commit approves» (s-4bwa4zepd4nwcv8) слова «a part of the base specification» станут словами «a folder of the base specification», как в согласованном узле «How a node's location is computed» (s-ygg5kpcxgzq3m7w). В правиле 8.5 так же меняются «the part's name alone» на «the folder's name alone» и «the other top-level nodes of the part» на «the other top-level nodes of the folder», а в русском тексте «одно имя части» и «на вершине части» — на «одно имя папки» и «на вершине папки». Смысл обоих узлов не меняется. Если вы выберете ответ Б, ничего не переименовывается.",
].map((x) => `<li>${inline(x)}</li>`);

// The one question for the owner, as group5-notes.md holds it under «Вопрос ответственному» in the section on the latest
// round, which comes first: a bold title, paragraphs, and a list nested by two spaces per level. It ends at the next
// heading of that section.
const notes = fs.readFileSync(new URL("group5-notes.md", here), "utf8");
const q0 = notes.indexOf("### Вопрос ответственному");
const q1 = notes.indexOf("\n### ", q0 + 1);
if (q0 < 0 || q1 < 0 || /Superseded/.test(notes.slice(q0, q1))) throw new Error("group5-notes.md: the question is not where the page looks for it");
const qLines = notes.slice(q0, q1).split("\n").slice(1).filter((l) => l.trim());
const md = (t) => inline(t).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
let qHtml = "";
let depth = -1;
for (const l of qLines) {
  const m = /^( *)- (.*)$/.exec(l);
  if (!m) {
    while (depth >= 0) { qHtml += "</li></ul>"; depth--; }
    qHtml += /^\*\*[^*]+\*\*$/.test(l.trim()) ? `<h3>${md(l.trim().slice(2, -2))}</h3>` : `<p>${md(l.trim())}</p>`;
    continue;
  }
  const d = m[1].length / 2;
  if (d > depth) { while (depth < d) { qHtml += "<ul class=\"qlist\"><li>"; depth++; } }
  else { while (depth > d) { qHtml += "</li></ul>"; depth--; } qHtml += "</li><li>"; }
  qHtml += md(m[2]);
}
while (depth >= 0) { qHtml += "</li></ul>"; depth--; }
const QUESTIONS = `<div class="question" id="q1">${qHtml}</div>`;

const nAppendix = KEYS.filter((k) => !k.startsWith("proposal:")).length;
const nNewAppendix = KEYS.filter((k) => k.startsWith("new:")).length;
const nProposals = KEYS.filter((k) => k.startsWith("proposal:") && drafts[k].kind !== "cell" && !k.startsWith("proposal:new-spec-")).length;
const nRows = KEYS.filter((k) => drafts[k].kind === "cell").length;
const nSplit = KEYS.filter((k) => k.startsWith("proposal:new-spec-")).length;

const page = `<title>Группа 5 T25 — проверки расширений</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header, one collapsible section per node in the order of the review, then the nodes changed only to carry
     out a decision and the question. Dark only. */
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
  .li { margin: 0 0 4px 4px; }
  .li2 { margin-left: 24px; }
  code { font-family: var(--mono); font-size: 0.88em; background: var(--raised); color: var(--fg); padding: 0 3px; border-radius: 3px; overflow-wrap: anywhere; }
  .cite { color: var(--link); }
  ul.nodes, ul.plain, ul.assess, ul.changes, ul.options, ul.fixes { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
  li.node, ul.plain li, ul.options li, ul.fixes li { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 10px; overflow-wrap: anywhere; }
  ul.changes li { border-left: 3px solid var(--new); padding: 2px 0 2px 10px; }
  ul.assess li { padding: 2px 0; }
  .why { background: var(--panel); border: 1px solid var(--rule); border-left: 3px solid var(--new); border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; }
  .quote { color: var(--muted); }
  .new { color: var(--new); font-weight: 700; }
  .warn { color: var(--warn); font-weight: 700; }
  .note { color: var(--muted); border-left: 3px solid var(--mark); padding-left: 10px; margin-top: 6px; }
  .cost { color: var(--muted); }
  .loc { font-family: var(--mono); color: var(--muted); } .rut { color: var(--muted); } .meta { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); }
  details.node-section { background: var(--bg); border: 1px solid var(--rule); border-radius: 8px; padding: 8px 12px; margin-top: 10px; }
  details.node-section[open] { background: #121c22; }
  details.node-section > summary { cursor: pointer; list-style-position: outside; }
  details.node-section > summary .h { font-family: var(--display); font-weight: 700; font-size: 1.05rem; color: var(--fg); }
  details.node-section > summary .hen { color: var(--muted); }
  details.inner { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 10px; margin-top: 10px; }
  details.inner > summary { cursor: pointer; color: var(--muted); }
  .item { font-family: var(--mono); color: var(--muted); font-size: 0.82rem; margin: 18px 0 0; }
  .hint { color: var(--muted); font-size: 0.88rem; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  button { font: inherit; color: var(--fg); background: var(--raised); border: 1px solid var(--rule); border-radius: 4px; padding: 6px 12px; cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
  .intro, .question { background: var(--panel); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 14px; }
  .question h3 { margin-top: 4px; }
  ul.qlist { margin: 4px 0 8px; padding-left: 20px; }
  ul.qlist li { margin: 4px 0; }
  @media (max-width: 760px) { .compare { grid-template-columns: 1fr; } }
</style>

<h1>Группа 5: проверки расширений Domains и RecordType</h1>
<div class="intro">
<p>Это пункты 41–47 порядка проверки на стадии 2 задачи T25: узлы описания инструментов, которые описывают проверки расширения Domains (таблица 11.3) и расширения RecordType (таблица 12.12). Три узла проверяют домены: круг доменов, которые используют друг друга, разделы технического приложения, сопоставленные с доменами, и уровень в заголовке домена. Пять узлов проверяют RecordType: идентификатор, прослеженный до конца, вариант RecordType, значения поля с <code>enum</code> и ссылки RecordType вне своей части системы.</p>
<p>На странице ${KEYS.length} разделов. ${nAppendix - nNewAppendix} из них — переписанные узлы описания инструментов; под каждым можно раскрыть одобренную формулировку, которую он заменяет. ${nNewAppendix === 1 ? "Ещё один" : `Ещё ${nNewAppendix}`} — новый узел «Поля с <code>enum</code>, которые принимает <code>sheriff validate</code>». Он выделен из узла «Откуда собираются значения поля с <code>enum</code>» и стоит сразу после него.</p>
<p>Вы отвечаете на всю группу одним сообщением: согласие или замечания к отдельным узлам и ответ на <a href="#q1">вопрос о значениях поля из имён частей базовой спецификации</a> в конце страницы. От ответа зависят абзац о проекте без расширения Domains и второй пример в узле «Откуда собираются значения поля с <code>enum</code>».</p>
</div>
<div class="bar"><button id="open-all" type="button">Раскрыть всё</button><button id="close-all" type="button">Свернуть всё</button></div>

<h2>Узлы группы</h2>
${ORDER.map(([label, ks]) => `<p class="item">${esc(label)}</p>\n` + ks.map((k) => sections.get(k)).join("\n\n")).join("\n")}

<h2>Узлы, изменённые только во исполнение уже принятого решения</h2>
<ul class="fixes">
${decisionOnly.join("\n")}
</ul>

<h2>Вопрос к вам</h2>
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
  // A link to a section opens it.
  const openTarget = () => { const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t && t.tagName === "DETAILS") { t.open = true; save(); } };
  window.addEventListener("hashchange", openTarget); openTarget();
</script>
`;
// The page names no round, no reviewer and no report, and calls the owner of a node «ответственный».
const shown = page.replace(/<script>[\s\S]*<\/script>/, "").replace(/суждени[а-я]* рецензента/g, "").replace(/the reviewer's judgement/gi, "");
for (const bad of [/раунд/i, /рецензент/i, /review-g/i, /english-g/i, /замечани\S* читател/i, /владел/i, /\bround [a-h]\b/i, /первой версии/i, /group5-notes/i, /fix-brief/i]) if (bad.test(shown)) throw new Error(`the page holds ${bad}: ${shown.match(new RegExp(`.{0,80}${bad.source}.{0,80}`, "i"))?.[0]}`);
fs.mkdirSync(new URL("group5-page/", here), { recursive: true });
fs.writeFileSync(new URL("group5-page/index.html", here), page);
console.log(`group5-page/index.html written: ${KEYS.length} sections, ${decisionOnly.length} nodes changed only to carry out a decision, one question for the owner`);
