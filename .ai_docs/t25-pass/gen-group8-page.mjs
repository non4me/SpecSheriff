// Builds the owner's page for group 8 of stage 2 of T25 from tools-drafts.json, into group8-page/index.html. Group 8 is
// items 57 to 63: the hooks, split into a list of the hooks and a node for each procedure; an edit judged before it is
// made; the agent's hooks for Codex CLI; how a git hook finds the SpecSheriff tools on the machine; the project's own
// tools in a git hook, with the new row 10.1.37b of the main table of checks; the two plugins and the four nodes on
// their skills. It is gen-group7-page.mjs adapted to group 8.
// Each key of the group is one collapsible section. The section shows the key's wording in English and in Russian, the
// approved wording that it replaces or is split from, what changed, the «Оценка» (from group8-assessments.json) and what
// is bound to the node. After the nodes come the changes that only carry out a decision already made, and then the three
// questions for the owner. The Russian of what the drafts hold only in English is in group8-ru.json, which
// build-group8-ru.mjs writes.
// Usage: node gen-group8-page.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const drafts = read("tools-drafts.json");
// The Russian of what the drafts hold only in English and the page shows in its Russian parts: the stage-3 notes, the
// removed passages, the notes in a location, the todos, the approved nodes and the note on the refusal where Node.js is
// missing. Each entry keeps the English it renders, so a changed draft is caught.
const RU = read("group8-ru.json");
const ASSESS = read("group8-assessments.json");
const ruOf = (section, key, en, i) => {
  const entry = i === undefined ? RU[section]?.[key] : RU[section]?.[key]?.[i];
  if (!entry || entry.en !== en) throw new Error(`group8-ru.json: ${section} of ${key}${i === undefined ? "" : ` [${i}]`} is missing or out of date`);
  return entry.ru;
};
const locationRu = (k) => (/\([^)]*[A-Za-z]{3}/.test(drafts[k].location) ? ruOf("location", k, drafts[k].location) : drafts[k].location);
const DOC_RU = {
  guidelines: "SpecSheriff guidelines", "appendix of the tools": "описание инструментов",
  "draft of the appendix of the tools": "черновик описания инструментов", "agreed draft of the appendix of the tools": "согласованный черновик описания инструментов",
  "proposal of group 8": "предложение группы 8", "agreed proposal": "согласованное предложение", "proposal of an earlier group": "предложение одной из прежних групп", draft: "черновик",
};
const docRu = (doc) => DOC_RU[doc] ?? (doc.startsWith("extension ") ? `расширение ${doc.slice(10)}` : doc);

// The keys in the order of the review: items 57 to 63, each rewritten node before the nodes split from it.
const ORDER = [
  ["Пункт 57", "пункт 57", ["s-477gtdrkw34dzxw", "new:tools-6-pre-commit", "new:tools-6-push-compare", "new:tools-6-hooks-on", "new:tools-6-reviewer-settings", "new:tools-6-after-edit"]],
  ["Пункт 58", "пункт 58", ["s-st6td4mua9uqt9z"]],
  ["Пункт 59", "пункт 59", ["s-n76wt2bkqdmh78x"]],
  ["Пункт 60", "пункт 60", ["s-4mej6ccn7xu3d3p"]],
  ["Пункт 61", "пункт 61", ["s-n4m5zvh96yb299p", "proposal:row-10-1-37b"]],
  ["Пункты 62 и 63", "пункты 62 и 63", ["s-zh2vcr3xjumppg5", "s-2pdy9gw2jrjvfb4", "new:tools-15-skills", "new:tools-15-spec-init", "new:tools-15-spec-remove", "new:tools-15-spec-settings"]],
];
const KEYS = ORDER.flatMap(([, , ks]) => ks);
const itemOf = new Map(ORDER.flatMap(([, item, ks]) => ks.map((k) => [k, item])));
// The keys of the group are those that group8-assessments.json assesses, and each of them is on the page once.
for (const k of Object.keys(ASSESS)) if (!KEYS.includes(k)) throw new Error(`${k} is in group 8 but not in the order of the page`);
for (const k of KEYS) if (!ASSESS[k]) throw new Error(`${k} is in the order of the page but has no «Оценка»`);
if (new Set(KEYS).size !== KEYS.length) throw new Error("a key is twice in the order of the page");
for (const k of KEYS) if (!drafts[k]?.proposal) throw new Error(`no draft ${k}`);
const isRow = (k) => drafts[k].kind === "cell";

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
// Every test bound to an approved node, in the specification and in the appendix of the tools.
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
  // A draft's location may carry an English note in parentheses on where the node goes; the location alone is kept. A
  // node of the guidelines is cited by its location alone, as the new form cites it, without the prefix "spec".
  const location = (d.location ?? "").replace(/\s*\(.*\)\s*$/, "").replace(/^spec /, "");
  const cell = !d.proposal.title;
  const doc = k.startsWith("proposal:")
    ? (KEYS.includes(k) ? "proposal of group 8" : d.agreed ? "agreed proposal" : "proposal of an earlier group")
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

const kindRu = (k) => isRow(k) ? "новая строка основной таблицы проверок"
  : k.startsWith("new:") ? (drafts[k].from ? "новый узел описания инструментов, выделенный из одобренного узла" : "новый узел описания инструментов")
    : k.startsWith("proposal:") ? "предложение к согласованному узлу" : "переписанный узел описания инструментов";
// A row of a table has no title: it is named by its number.
const headingOf = (k) => {
  const p = drafts[k].proposal;
  if (p.title) return { en: p.title, ru: p.ruTitle };
  const num = drafts[k].location.replace(/^spec /, "").replace(/\s*\(.*\)\s*$/, "");
  return { en: `Row ${num} of the main table of checks`, ru: `Строка ${num} основной таблицы проверок` };
};

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const SID = /§?(s-[2-9a-hjkmnp-z]{15})/g;
// Every sid that the page cites must name a node of the specification, of the appendix of the tools or of a draft.
const unknown = new Set();
function inlineText(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(SID, (m, id) => {
      const i = info.get(id);
      if (!i) unknown.add(id);
      return `<span class="cite" title="${i ? esc(i.title) : "узел убран из спецификации"}">§${i ? esc(i.location) : id}</span>`;
    });
}
// A key of this page, such as new:tools-6-pre-commit, is shown as a link to its section, named by its Russian heading.
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
// A table written in Markdown is shown as a table.
function mdTable(lines) {
  const cells = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => c.trim());
  const [head, , ...rows] = lines;
  return `<div class="tablewrap"><table class="md"><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("\n")}</tbody></table></div>`;
}
const isTable = (v) => /^\|.*\n\|[-| ]+\|/.test(String(v));
function cell(kind, v) {
  if (isTable(v)) return mdTable(String(v).split("\n").filter((l) => l.trim()));
  if (kind === "li") return `<div class="li">• ${inline(v)}</div>`;
  if (kind === "li2") return `<div class="li li2">◦ ${inline(v)}</div>`;
  return `<p>${inline(v)}</p>`;
}
// A plain text, as a file holds it: paragraphs split at blank lines, list items at "- ", nested items at "  - ", and the
// lines of a Markdown table taken together.
function textBlock(s) {
  const lines = String(s ?? "").split("\n").filter((l) => l.trim());
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("|")) {
      const run = [];
      while (i < lines.length && lines[i].startsWith("|")) run.push(lines[i++]);
      i--;
      out.push(mdTable(run));
    } else if (/^\s+- /.test(lines[i])) out.push(cell("li2", lines[i].replace(/^\s+- /, "")));
    else if (lines[i].startsWith("- ")) out.push(cell("li", lines[i].slice(2)));
    else out.push(cell("p", lines[i]));
  }
  return out.join("\n");
}
// The opening words of a part, which name the part on the page; a backtick left open is closed.
const opening = (s) => { const w = String(s).split(/\s+/).slice(0, 8).join(" "); return inline((w.match(/`/g) || []).length % 2 ? w + "`" : w); };
const field = (label, html) => (html ? `<div class="field"><div class="label">${label}</div>${html}</div>` : "");

// One wording in one language: title, text, the cost of a row, reason, examples, todos. The markers let the page's own
// check skip the wordings, which may name the reviewer of a commit as their subject.
function wording(w, lang) {
  const L = lang === "ru" ? { title: "Заголовок", text: "Текст", cost: "Цена", reason: "Обоснование", ex: "Пример", todo: "Отложено (todo)" } : { title: "Title", text: "Text", cost: "Cost", reason: "Reason", ex: "Example", todo: "Todo" };
  return "<!--W-->" + [
    w.title ? field(L.title, `<p class="wt">${inline(w.title)}</p>`) : "",
    field(L.text, w.parts ? w.parts.map((x) => cell(x.kind, x[lang])).join("\n") : textBlock(w.text)),
    w.cost ? field(L.cost, `<p>${inline(w.cost)}</p>`) : "",
    w.reason ? field(L.reason, textBlock(w.reason)) : "",
    ...(w.examples || []).map((x, i, all) => field(all.length > 1 ? `${L.ex} ${i + 1}` : L.ex, textBlock(x))),
    ...(w.todos || []).map((t) => field(L.todo, `<p>${inline(t)}</p>`)),
  ].join("\n") + "<!--/W-->";
}
const fromProposal = (k, p, lang) => ({
  title: lang === "ru" ? p.ruTitle : p.title, parts: p.parts, cost: drafts[k].cost?.[lang],
  reason: lang === "ru" ? p.ruReason : p.reason, examples: (p.examples || []).map((x) => x[lang]),
  todos: (p.todos || []).map((t, i) => (lang === "ru" ? ruOf("todos", k, t.text, i) : t.text)),
});
const proposed = (k, lang) => wording(fromProposal(k, drafts[k].proposal, lang), lang);

// The approved wording that a draft replaces, where there is one: the approved node of tools.json, or the approved node
// that a new node is split from. A row of the main table is new and replaces nothing.
function approved(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  if (e.base) throw new Error(`${k}: group 8 holds no proposal on an agreed draft, but this key names the base ${e.base}`);
  if (k.startsWith("proposal:")) return null;
  // The Russian of an approved node of tools.json is kept in group8-ru.json, with the English it renders.
  const approvedRu = (n) => {
    const a = RU.approved?.[n.sid];
    if (!a || a.en !== n.text || a.title !== n.title) throw new Error(`group8-ru.json: the Russian of the approved node ${n.sid} is missing or out of date`);
    return { title: a.ruTitle, text: a.ru };
  };
  const current = !k.startsWith("new:") && nodeOf.get(sid);
  if (current) return { what: "одобрено, в specs/_guidelines/tools.json", en: { title: current.title, text: current.text }, ru: approvedRu(current) };
  const source = e.from && nodeOf.get(e.from);
  if (source) return { what: `узла «${source.title}», из которого выделен этот новый узел`, en: { title: source.title, text: source.text }, ru: approvedRu(source), carved: true };
  return null;
}

// What changed: the key's own account of why it changed, the parts' change fields, then what was added to a todo and what
// was removed. A part that keeps the approved words is left out.
const SAME = /^(Как в согласованной формулировке|Без изменений|Шаг вложенного списка)/;
function changes(k) {
  const e = drafts[k];
  const p = e.proposal;
  const isNew = k.startsWith("new:");
  const items = [];
  if (p.titleChange) items.push(`<li><span class="quote">Заголовок.</span> ${inline(p.titleChange)}</li>`);
  p.parts.forEach((x) => { if (x.change && !SAME.test(x.change.trim())) items.push(`<li><span class="quote"><!--W-->«${opening(x.ru)}…»<!--/W--></span> ${inline(x.change)}</li>`); });
  if (p.reasonChange && !SAME.test(p.reasonChange.trim())) items.push(`<li><span class="quote">Обоснование.</span> ${inline(p.reasonChange)}</li>`);
  (p.examples || []).forEach((x, i, all) => {
    const label = all.length > 1 ? `Пример ${i + 1}.` : "Пример.";
    if (x.change) { if (!SAME.test(x.change.trim())) items.push(`<li><span class="quote">${label}</span> ${inline(x.change)}</li>`); }
    else if (!isNew) items.push(`<li><span class="quote">${label}</span> Новое: у одобренного узла примеров не было.</li>`);
  });
  (p.todos || []).forEach((t, i) => items.push(`<li><span class="quote">Отложено.</span> Новое: ${inline(ruOf("todos", k, t.text, i))}</li>`));
  (p.removed || []).forEach((r, i) => items.push(`<li><span class="quote">Убрано.</span> ${inline(ruOf("removed", k, r, i))}</li>`));
  const parent = e.from && KEYS.find((x) => sidOf(x) === e.from);
  const head = isNew ? `<p class="new">${parent ? `Новый узел. Он выделен из узла <a href="#${esc(parent)}">«${inlineText(headingOf(parent).ru)}»</a>, который тоже есть на этой странице.` : "Новый узел."}</p>`
    : isRow(k) ? `<p class="new">Новая строка таблицы.</p>` : "";
  const why = e.change ? `<div class="why">${textBlock(e.change)}</div>` : "";
  // The note that the owner's agreement to the group settles: the refusal that an approved node had and the draft drops.
  const sid = sidOf(k);
  const note = RU.notes?.[sid];
  if (note && !nodeOf.get(sid)?.text.includes(note.en)) throw new Error(`group8-ru.json: the note on ${sid} renders a sentence that its approved text no longer holds`);
  const noteHtml = note ? `<div class="why decide"><p class="label">Отказ там, где нет Node.js: что было и почему его нет</p>${textBlock(note.ru)}</div>` : "";
  const list = items.length ? `${why || noteHtml ? `<p class="label">По частям</p>` : ""}<ul class="changes">${items.join("\n")}</ul>` : "";
  return head + why + noteHtml + (list || (isNew || why ? "" : `<p class="hint">Формулировка не менялась.</p>`));
}

// The assessment of the final wording, from group8-assessments.json: its five lines only.
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
  if (!info.has(id)) unknown.add(id);
  // A row of a table has no title: it is named by its number, with its Russian text where the page has one, else its English wording.
  const rowNum = i.location.replace(/^spec /, "");
  const rowRu = i.cell ? (table101.find((r) => r.num === rowNum)?.ru ?? Object.values(drafts).find((d) => d?.sidValue === id && d.proposal?.ruText)?.proposal.ruText) : null;
  const name = i.cell ? `строка ${esc(rowNum)}` : inline(i.title);
  const second = i.cell ? (rowRu ? inline(rowRu) : inline(i.title)) : ru.get(id) ? inline(ru.get(id)) : "";
  return `<!--W--><li class="node"><span class="loc">${esc(dir === "in" ? `${typeRu[type] ?? type} этот узел` : typeRu[type] ?? type)} · ${esc(i.location)}</span> <b>${name}</b>${second ? `<br><span class="rut">${second}</span>` : ""}<br><span class="meta">${esc(docRu(i.doc))} · ${id}${inGroup.has(id) ? " · на этой странице" : ""}</span></li><!--/W-->`;
};
function bound(k) {
  const e = drafts[k];
  const sid = sidOf(k);
  const out = (e.proposal.refs || []).filter((r) => r.to).map((r) => nodeLine(r.to, r.type, "out")).join("\n");
  const inc = sid ? (incoming.get(sid) || []).filter((r) => r.from !== sid).map((r) => nodeLine(r.from, r.type, "in")).join("\n") : "";
  const base = nodeOf.get(sid) ?? (e.from && nodeOf.get(e.from));
  // A key's tests are those whose names hold a name that its testsFrom gives, wherever they are bound; a testsFrom that
  // matches no test means that the node has no test yet. A test that carries another node's SpecTag says so.
  const from = [].concat(e.testsFrom ?? []);
  const testsOf = e.testsFrom ? ALL_TESTS.filter((t) => from.some((f) => t.includes(f))) : isRow(k) ? [] : base?.meta?.tests || [];
  const tests = testsOf.map((t) => {
    const tag = /::@spec (s-\w+) /.exec(t)?.[1];
    const other = tag && tag !== sid ? ` · SpecTag сейчас называет ${inline(tag)}` : "";
    return `<li><code>${esc(t.replace(/^.*::@spec s-\w+ /, ""))}</code><br><span class="meta">${esc(t.split("::")[0])}${other}</span></li>`;
  }).join("\n");
  const stage3 = e.stage3 ? `<li>${inline(ruOf("stage3", k, e.stage3))}</li>` : "";
  const noTests = isRow(k) ? "Своих тестов у строки нет: её проверку выполняет узел, который её реализует, и тесты пишутся для него." : "Тестов пока нет: их пишут на стадии 3, до кода.";
  return [
    field("На что ссылается и что реализует", out ? `<ul class="nodes">${out}</ul>` : `<p class="hint">Ни на что.</p>`),
    field("Что ссылается на узел", inc ? `<ul class="nodes">${inc}</ul>` : `<p class="hint">${sid ? "Ничто." : "Ничто: у узла ещё нет sid, его даст sheriff reindex."}</p>`),
    field("Тесты", tests ? `<ul class="plain">${tests}</ul>` : `<p class="hint">${noTests}</p>`),
    field("Что изменится в коде (стадия 3)", stage3 ? `<ul class="plain">${stage3}</ul>` : `<p class="hint">Код не меняется.</p>`),
  ].join("\n");
}

const sections = new Map(KEYS.map((k) => {
  const h = headingOf(k);
  const a = approved(k);
  const now = `<div class="lang"><div class="label big">English</div>${proposed(k, "en")}</div>
<div class="lang"><div class="label big">Русский</div>${proposed(k, "ru")}</div>`;
  const before = a ? `<div class="lang"><div class="label big">English</div>${wording(a.en, "en")}</div><div class="lang"><div class="label big">Русский</div>${wording(a.ru, "ru")}</div>` : "";
  const body = `${now}${a ? `<details class="inner" id="old-${esc(k)}"><summary>${a.carved ? "Одобренная формулировка " + esc(a.what) : "Одобренная формулировка, которую заменяет черновик"}</summary>${before}</details>` : ""}`;
  const sid = sidOf(k);
  return `<details class="node-section" id="${esc(k)}">
<summary><span class="h">${inline(h.ru)}</span> <span class="hen">· ${inline(h.en)}</span></summary>
<div class="sub">${inline(locationRu(k))} · ${sid ? esc(sid) : "sid даст sheriff reindex"} · ${kindRu(k)} · ${itemOf.get(k)}</div>
${body}
<h3>Что изменилось</h3>
${changes(k)}
<h3>Оценка</h3>
${assessment(k)}
<h3>Что связано с узлом</h3>
${bound(k)}
</details>`;
}).map((html, i) => [KEYS[i], html]));

// The changes inside the drafts that only carry out a decision already made. Each is shown in full above; this list says
// that it asks for no judgement of its own. A node of the group is named by a link to its section.
const links = [];
const L = (k) => { if (!KEYS.includes(k)) throw new Error(`${k} is not a key of the page`); links.push(k); return `⟦${links.length - 1}⟧`; };
const decisionOnly = [
  `Команды названы \`sheriff markdown\`, \`sheriff map\` и \`sheriff commit-message\` вместо \`sheriff export\`, \`sheriff render\` и \`sheriff message\` — по вашему решению от 2026-11-21 и по согласованному списку команд (s-f5rz6b7dhxejjts).`,
  `Хуки запускают \`sheriff markdown\` и \`sheriff map\` только там, где проект выбрал расширение Views (${L("new:tools-6-pre-commit")}, ${L("new:tools-6-after-edit")}), — по вашему ответу А на второй вопрос группы 7.`,
  `${L("s-st6td4mua9uqt9z")}: \`sheriff guard\` отвергает правку записи в списках \`approvalStatus\`, \`strict\` и \`extensions\` файла \`sheriff.config.json\` и называет \`sheriff settings\` — как решено при согласовании группы 6.`,
  `${L("s-st6td4mua9uqt9z")}: \`sheriff guard\` отвергает любую правку, пока в установленном плагине нет расширения, которое выбрал проект (s-mhsb6fjsq5xn6c9), — по решению от 2026-11-18 о строке 10.1.27c, принятому при согласовании группы 3.`,
  `${L("s-st6td4mua9uqt9z")}: отказ для кода собственной проверки или генератора проекта без теста убран — по вашему решению от 2026-11-13 убрать эти требования из правила 10.10.`,
  `${L("new:tools-15-spec-settings")} описан в новом узле — по вашему решению от 2026-11-18 («да скилл делаем»).`,
  `${L("s-n76wt2bkqdmh78x")}: скрипты отвечают Codex в JSON — по вашему решению от 2026-11-02.`,
  `${L("proposal:row-10-1-37b")} — проверка, которой требует второй шаг согласованного правила 10.12 (s-pcnyfp7gev7syax); эту строку обещал список изменений согласованной строки 10.1.37a.`,
  `Узлы о плагинах и о skills ссылаются на настройки каждого runner (s-tnz9zgqx8c629a7) и на отметку о том, что о runner спрашивали (s-p29yawkkkgk7kxb), вместо s-xr5xxa9cxf2mq5u — как решено при согласовании группы 2.`,
].map((x) => `<li>${inline(x).replace(/⟦(\d+)⟧/g, (m, i) => `<a href="#${esc(links[i])}">«${inlineText(headingOf(links[i]).ru)}»</a>`)}</li>`);

const QUESTIONS = `<div class="question" id="q1">
<h3>Вопрос 1. Порядок хука pre-commit и слова «right after the first step» в правиле 10.12</h3>
<p>Правило 10.12 говорит, что при коммите проверка ключа, записанного больше одного раза, и проверка по JSON Schema выполняются сразу после первого шага («right after the first step»), то есть раньше остальных собственных инструментов проекта. Но эти две проверки делает <code>sheriff validate</code>, и той же командой он затем делает собственные проверки проекта и остальные свои проверки (согласованный узел «${inlineText(info.get("s-7pk89t8z6wymmj9")?.title)}»). Поэтому остальные инструменты проекта, которые не меняют файлов, хук может запустить только до <code>sheriff validate</code> или после него, а после него их запускать нельзя: тогда проверки SpecSheriff guidelines шли бы раньше второго шага. Черновик <a href="#new:tools-6-pre-commit">«Хук pre-commit»</a> запускает их до <code>sheriff validate</code>.</p>
<p><b>Рекомендую вариант А.</b> Он опирается на цель исключения в правиле 10.12, которую называет его обоснование: проверка, которая читает узлы, выполняется только на файлах, прошедших проверки их структуры. При варианте А это так и остаётся.</p>
<ul class="options">
<li><b>А. Хук запускает остальные инструменты проекта до <code>sheriff validate</code>.</b> После стадии 2 правило 10.12 говорит «эти проверки выполняются раньше любой другой проверки» вместо «сразу после первого шага».<br><span class="cost">Что видит человек: хук отвергает те же коммиты, что и при варианте Б, и каждая проверка SpecSheriff guidelines и проекта по-прежнему выполняется после проверок структуры.</span><br><span class="cost">Цена: после стадии 2 меняется одно предложение правила 10.12.</span><br><span class="cost">Риск: не найден. Инструмент, который этот порядок ставит перед проверками структуры, не меняет файлов, а строка 10.1.37b отвергает инструмент, который их меняет.</span></li>
<li><b>Б. Правило 10.12 остаётся, а у <code>sheriff validate</code> появляется параметр, с которым он делает только две проверки структуры.</b> Хук запускает <code>sheriff validate</code> с этим параметром сразу после первого шага, затем остальные инструменты проекта, затем <code>sheriff validate</code> снова.<br><span class="cost">Что видит человек: те же отказы, что при варианте А, а коммит длится дольше, потому что проверки структуры выполняются дважды. Насколько дольше, не измерялось.</span><br><span class="cost">Цена: новый параметр в согласованном списке команд (${inline("s-f5rz6b7dhxejjts")}) и в согласованном узле о собственных проверках проекта (${inline("s-7pk89t8z6wymmj9")}), с тестами.</span><br><span class="cost">Риск: не найден.</span></li>
</ul>
<p class="note">При варианте Б в узле «Хук pre-commit» перед пунктом об остальных инструментах проекта появляется пункт «<code>sheriff validate</code> с этим параметром», а пункт о <code>sheriff validate</code> говорит, что тот делает остальные свои проверки.</p>
</div>
<div class="question" id="q2">
<h3>Вопрос 2. Какие узлы оценивает <code>sheriff guard</code></h3>
<p>Согласованное правило 10.3 отвергает правку, которая «оставила бы узел одобренным при формулировке, на которую нет одобрения в силе». Буквально это относится к любому узлу спецификации, даже к узлу, которого правка не касается. Черновик <a href="#s-st6td4mua9uqt9z">«Оценка правки до того, как она сделана»</a> оценивает только узел, который правка добавляет или у которого меняет формулировку либо статус одобрения, как уже делает код <code>sheriff guard</code>.</p>
<p><b>Рекомендую вариант А.</b> Он опирается на обоснование правила 10.3: агент, который мог бы сам выставить статус одобрения, принимал бы решение, которое принимают только ответственные. Правка, которая оставляет узел как был, такого решения не принимает.</p>
<ul class="options">
<li><b>А. <code>sheriff guard</code> оценивает только узел, который правка добавляет или у которого меняет формулировку либо статус одобрения.</b> После стадии 2 правило 10.3 говорит так же: «оставила бы одобренным узел, который правка добавляет или меняет».<br><span class="cost">Что видит человек: правка файла, в котором есть нетронутый одобренный узел с формулировкой без одобрения в силе, проходит. После правки <code>sheriff reindex</code> делает этот узел черновиком и называет его агенту (${inline("s-hcmpjmwtgfwzncu")}).</span><br><span class="cost">Цена: после стадии 2 меняются слова правила 10.3.</span><br><span class="cost">Риск: не найден.</span></li>
<li><b>Б. Буквальные слова правила 10.3.</b> <code>sheriff guard</code> отвергает любую правку, после которой такой узел остаётся одобренным, где бы этот узел ни был, и называет его.<br><span class="cost">Что видит человек: правка отвергается, пока агент не сделает тот узел черновиком, даже если правка касается другого узла или файла.</span><br><span class="cost">Цена: перед каждой правкой <code>sheriff guard</code> читает все файлы спецификации. На большой спецификации это, по оценке, замедляет каждую правку; замедление не измерялось.</span><br><span class="cost">Риск: чтобы сделать свою правку, агент меняет статус узла, которого его задача не касается.</span></li>
</ul>
<p class="note">При варианте Б в узле «Оценка правки до того, как она сделана» первый пункт становится таким: «правку, после которой узел спецификации имеет статус <code>approved</code>, тогда как ни одно одобрение его формулировки не действует», а второе предложение обоснования уходит.</p>
</div>
<div class="question" id="q3">
<h3>Вопрос 3. Skills, которых не описывает ни один узел</h3>
<p>Плагины содержат skills <code>spec</code>, <code>spec-review</code> и <code>spec-adopt</code>, но их не описывают ни одобренные узлы, ни черновики группы. Узел <a href="#new:tools-15-skills">«Skills плагинов SpecSheriff»</a> называет их, не объясняя, вопреки правилу 7.2.7, и принцип «Nothing unapproved is implemented» для них не выполнен.</p>
<p><b>Рекомендую вариант А.</b> Описать три skills — отдельная задача. Вариант Б добавляет три или больше узлов и ещё один круг проверки до того, как вы увидите группу 8. Пробел не новый: одобренные узлы тоже не описывают эти skills.</p>
<ul class="options">
<li><b>А. Узел о <code>spec-init</code> описывает каждый шаг, которого требует согласованный узел, а остальные три skills описывает отдельная задача после T25.</b> Узел о skills записывает их описание как отложенную работу. Узел о <code>spec-init</code> просит задать <code>code</code>, <code>tests</code> и <code>testCommand</code>, которые согласованный узел ${inline("s-7unxytshhc4md54")} оставляет задать позже. Изменения кода убирают из SKILL.md skill <code>spec-init</code> предложение одобрить спецификацию, которое больше не соответствует этому узлу, и коммит, которого не требует ни один согласованный узел.<br><span class="cost">Что видит человек: плагины этого выпуска по-прежнему содержат эти три skills без узла, как и прежние выпуски, а узел о skills называет их без объяснения. <code>spec-init</code> и <code>spec-remove</code> больше не делают коммит, не просят подтверждения и не показывают, чем отличается файл, который они оставили как был.</span><br><span class="cost">Цена: ещё одна задача после T25, со своей оценкой. В этом выпуске принцип «Nothing unapproved is implemented» для этих трёх skills остаётся невыполненным.</span><br><span class="cost">Риск: пока эта задача не сделана, три skills меняются без одобренного узла, и ни одна проверка этого не замечает.</span></li>
<li><b>Б. Группа 8 описывает эти три skills сейчас.</b><br><span class="cost">Что видит человек: у каждого skill выпуска есть одобренный узел.</span><br><span class="cost">Цена: три или больше новых узла и как минимум ещё один круг проверки до того, как вы увидите группу 8.</span><br><span class="cost">Риск: не найден.</span></li>
</ul>
<p class="note">При варианте Б в группу добавляются три новых узла, а отложенная работа на узле о skills уходит.</p>
</div>
<div class="question"><p><b>Согласны с группой 8 и с вариантом А во всех трёх вопросах?</b></p></div>`;

const nNew = KEYS.filter((k) => k.startsWith("new:")).length;
const nRewritten = KEYS.filter((k) => !k.startsWith("new:") && !k.startsWith("proposal:")).length;
const nRows = KEYS.filter(isRow).length;
if (nRows !== 1) throw new Error(`the intro speaks of one new row, but the group holds ${nRows}`);

const page = `<title>Группа 8 T25 — хуки и плагины</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header, one collapsible section per node in the order of the review, then the changes that only carry
     out a decision and the questions. Dark only. */
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
  .lang { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 12px; margin-top: 10px; min-width: 0; overflow-wrap: anywhere; }
  .li { margin: 0 0 4px 4px; }
  .li2 { margin-left: 24px; }
  code { font-family: var(--mono); font-size: 0.88em; background: var(--raised); color: var(--fg); padding: 0 3px; border-radius: 3px; overflow-wrap: anywhere; }
  .cite { color: var(--link); }
  .tablewrap { overflow-x: auto; margin: 6px 0; }
  /* A table keeps a readable width and scrolls within its frame on a narrow screen; the page itself never scrolls sideways. */
  table.md { border-collapse: collapse; font-size: 0.86rem; width: 100%; min-width: 640px; }
  table.md th, table.md td { border: 1px solid var(--rule); padding: 4px 6px; text-align: left; vertical-align: top; overflow-wrap: break-word; }
  table.md code { overflow-wrap: normal; }
  table.md th { background: var(--raised); color: var(--fg); }
  ul.nodes, ul.plain, ul.assess, ul.changes, ul.options, ul.fixes { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
  li.node, ul.plain li, ul.options li, ul.fixes li { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 10px; overflow-wrap: anywhere; }
  ul.changes li { border-left: 3px solid var(--new); padding: 2px 0 2px 10px; overflow-wrap: anywhere; }
  ul.assess li { padding: 2px 0; overflow-wrap: anywhere; }
  .why { background: var(--panel); border: 1px solid var(--rule); border-left: 3px solid var(--new); border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; overflow-wrap: anywhere; }
  .why.decide { border-left-color: var(--warn); }
  .quote { color: var(--muted); }
  .new { color: var(--new); font-weight: 700; }
  .note { color: var(--muted); border-left: 3px solid var(--mark); padding-left: 10px; margin-top: 6px; }
  .cost { color: var(--muted); }
  .loc { font-family: var(--mono); color: var(--muted); } .rut { color: var(--muted); } .meta { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); }
  details.node-section { background: var(--bg); border: 1px solid var(--rule); border-radius: 8px; padding: 8px 12px; margin-top: 10px; min-width: 0; }
  details.node-section[open] { background: #121c22; }
  details.node-section > summary { cursor: pointer; list-style-position: outside; overflow-wrap: anywhere; }
  details.node-section > summary .h { font-family: var(--display); font-weight: 700; font-size: 1.05rem; color: var(--fg); }
  details.node-section > summary .hen { color: var(--muted); }
  details.inner { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 10px; margin-top: 10px; }
  details.inner > summary { cursor: pointer; color: var(--muted); }
  .item { font-family: var(--mono); color: var(--muted); font-size: 0.82rem; margin: 18px 0 0; }
  .hint { color: var(--muted); font-size: 0.88rem; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  button { font: inherit; color: var(--fg); background: var(--raised); border: 1px solid var(--rule); border-radius: 4px; padding: 6px 12px; cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
  .intro, .question { background: var(--panel); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 14px; margin-top: 10px; overflow-wrap: anywhere; }
  .question h3 { margin-top: 4px; }
  ul.options { margin: 8px 0; }
</style>

<h1>Группа 8: хуки, оценка правки и плагины</h1>
<div class="intro">
<p>Это пункты 57–63 порядка проверки на стадии 2 задачи T25. Это узлы описания инструментов о git-хуках и хуках агента, об оценке правки агента до того, как она сделана, о хуках агента для Codex CLI, о том, как git-хук находит инструменты SpecSheriff на машине, о собственных инструментах проекта в git-хуке и о двух плагинах с их skills. Сюда же входит новая строка основной таблицы проверок.</p>
<p>На странице ${KEYS.length} разделов: ${nRewritten} переписанных узлов, ${nNew} новых и одна новая строка таблицы. Узел «Хуки» разделён: он остаётся списком хуков, а каждая процедура стала отдельным узлом. Узел о skills плагина для Claude Code разделён на узел о skills обоих плагинов и узлы о каждом описанном skill. Под каждым переписанным узлом можно раскрыть одобренную формулировку, которую он заменяет, а под каждым выделенным — одобренный узел, из которого он выделен. Изменения, которые только выполняют уже принятые решения, перечислены после узлов.</p>
<p>В узле <a href="#s-4mej6ccn7xu3d3p">«${inlineText(drafts["s-4mej6ccn7xu3d3p"].proposal.ruTitle)}»</a> убран отказ там, где нет Node.js. Что было и почему его нет, сказано в этом узле в разделе «Что изменилось»; ваше согласие с группой решает и это.</p>
<p>Вы отвечаете на всю группу одним сообщением: согласие или замечания к отдельным узлам. В конце страницы три вопроса к вам; черновики следуют рекомендованному ответу на каждый.</p>
</div>
<div class="bar"><button id="open-all" type="button">Раскрыть всё</button><button id="close-all" type="button">Свернуть всё</button></div>

<h2>Узлы группы</h2>
${ORDER.map(([label, , ks]) => `<p class="item">${esc(label)}</p>\n` + ks.map((k) => sections.get(k)).join("\n\n")).join("\n")}

<h2>Изменения, которые только выполняют уже принятые решения</h2>
<p class="hint">Каждое из них видно выше, в тексте узлов; своего решения оно не требует.</p>
<ul class="fixes">
${decisionOnly.join("\n")}
</ul>

<h2>Вопросы к вам</h2>
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
if (unknown.size) throw new Error(`the page cites sids that name no node: ${[...unknown].join(", ")}`);
// The page names no round, no reviewer of the drafts and no report, and calls the owner of a node «ответственный». The
// wordings and the lines of linked nodes are left out of this check: a node may name the reviewer of a commit as its
// subject. The independent reviewer is that same subject wherever the page names it.
const shown = page.replace(/<script>[\s\S]*<\/script>/, "").replace(/<!--W-->[\s\S]*?<!--\/W-->/g, "").replace(/независим\S* рецензент\S*/g, "");
for (const bad of [/раунд/i, /рецензент/i, /review-g/i, /english-g/i, /замечани\S* читател/i, /владел/i, /\bround [a-h]\b/i, /первой версии/i, /group8-notes/i, /fix-brief/i, /undefined/, /\[object/]) if (bad.test(shown)) throw new Error(`the page holds ${bad}: ${shown.match(new RegExp(`.{0,80}${bad.source}.{0,80}`, "i"))?.[0]}`);
if (/undefined|\[object /.test(page)) throw new Error("the page holds undefined or [object");
fs.mkdirSync(new URL("group8-page/", here), { recursive: true });
fs.writeFileSync(new URL("group8-page/index.html", here), page);
console.log(`group8-page/index.html written: ${KEYS.length} sections, ${decisionOnly.length} changes that only carry out a decision, three questions for the owner`);
