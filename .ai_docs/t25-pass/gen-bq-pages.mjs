// Builds the owner's pages for the questions about the base specification that stage 2 of T25 deferred, from
// bq-pages.json, into bq-pages/<page id>/index.html. Each page holds one group: the changes made without asking and
// the proposals that carry out a decision already made; the new proposals for agreement; the questions for the owner.
// Each item is one collapsible section. A section shows every node that the item changes or adds, in English and in
// Russian, with the agreed wording it replaces, what changed, the links, the «Оценка» and, for a question, the options
// with what a person sees, the cost and the risk. The page ends with the one question that the owner answers.
// Usage: node gen-bq-pages.mjs
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
const data = read("bq-pages.json");

// Titles and locations of every node that a wording may cite, so that each citation names what it cites.
const info = new Map();
function walk(nodes, f) {
  for (const n of nodes) {
    f(n);
    if (n.children) walk(n.children, f);
    const rows = [...(n.rows || []), ...(n.groups || []).flatMap((g) => g.rows || [])];
    for (const r of rows) for (const c of Object.values(r.cells || {})) if (c && c.node) f({ ...c.node, title: c.node.title ?? c.node.text });
  }
}
for (const f of ["moved/specs/_guidelines/spec.json", "moved/specs/_guidelines/extensions/domains.json",
  "moved/specs/_guidelines/extensions/recordtype.json", "moved/specs/_guidelines/extensions/views.json", "../../specs/_guidelines/tools.json"]) {
  walk(read(f).nodes, (n) => {
    if (!n.sid || info.has(n.sid)) return;
    info.set(n.sid, { title: n.title || "", location: (n.location || "").replace(/^_guidelines\//, "") });
  });
}
const drafts = read("tools-drafts.json");
for (const [k, d] of Object.entries(drafts)) {
  const sid = d.proposal?.sid || d.sidValue || (k.startsWith("s-") ? k : null);
  if (sid && !info.has(sid)) info.set(sid, { title: d.proposal?.title || "", location: d.location || "" });
}
const unknown = new Set();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Inline marks: `code`, **bold**, and a citation §<sid>, which shows the cited node's location and title on hover.
function inline(s) {
  const parts = String(s).split(/(`[^`]*`)/);
  return parts.map((p) => {
    if (p.startsWith("`") && p.endsWith("`") && p.length > 1) return `<code>${esc(p.slice(1, -1))}</code>`;
    return esc(p)
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/§(s-[23456789abcdefghjkmnpqrstuvwxyz]{15})/g, (m, sid) => {
        const i = info.get(sid);
        if (!i) { unknown.add(sid); return `<span class="cite">${m}</span>`; }
        return `<span class="cite" title="${esc(`${i.location} — ${i.title}`)}">${m}</span>`;
      });
  }).join("");
}
// A text: paragraphs separated by a blank line; lines that start with "- " or "1. " form a list.
function block(s) {
  if (s === undefined || s === null || s === "") return "";
  return String(s).split(/\n\s*\n/).map((para) => {
    const lines = para.split("\n");
    const out = [];
    let list = null;
    for (const ln of lines) {
      const m = ln.match(/^(\s*)(- |\d+\. )(.*)$/);
      if (m) {
        const tag = m[2] === "- " ? "ul" : "ol";
        if (!list || list.tag !== tag) { if (list) out.push(`</${list.tag}>`); list = { tag }; out.push(`<${tag} class="txt">`); }
        out.push(`<li${m[1].length ? ' class="li2"' : ""}>${inline(m[3])}</li>`);
      } else {
        if (list) { out.push(`</${list.tag}>`); list = null; }
        out.push(`<p>${inline(ln)}</p>`);
      }
    }
    if (list) out.push(`</${list.tag}>`);
    return out.join("\n");
  }).join("\n");
}

const FIELDS_EN = [["title", "Title"], ["text", "Text"], ["whatChecked", "What is checked"], ["onFailure", "On failure"], ["reason", "Reason"], ["examples", "Examples"]];
const FIELDS_RU = [["title", "Заголовок"], ["text", "Текст"], ["whatChecked", "Что проверяется"], ["onFailure", "При нарушении"], ["reason", "Обоснование"], ["examples", "Примеры"]];
function wording(w, fields, lang) {
  if (!w) return "";
  const rows = fields.filter(([k]) => w[k] !== undefined && w[k] !== null && w[k] !== "" && !(Array.isArray(w[k]) && !w[k].length)).map(([k, label]) => {
    const v = w[k];
    const body = Array.isArray(v) ? v.map((e) => `<div class="ex">${block(e)}</div>`).join("") : k === "title" ? `<p class="wt">${inline(v)}</p>` : block(v);
    return `<div class="label">${label}</div><div class="field">${body}</div>`;
  });
  return `<div class="lang" lang="${lang}"><!--W-->${rows.join("\n")}<!--/W--></div>`;
}
const STATUS = { changed: "изменённый узел", new: "новый узел", "new-row": "новая строка таблицы", "changed-row": "изменённая строка таблицы", removed: "удаляемая часть" };
function node(n, itemId, i) {
  for (const k of ["label", "status", "en", "ru"]) if (n[k] === undefined) throw new Error(`item ${itemId}, node ${i}: no ${k}`);
  if (!STATUS[n.status]) throw new Error(`item ${itemId}, node ${i}: unknown status ${n.status}`);
  if (n.status.startsWith("changed") && !n.agreed) throw new Error(`item ${itemId}, node ${i}: a changed node shows the agreed wording it replaces`);
  if (n.status !== "removed" && (!n.changes || !n.changes.length)) throw new Error(`item ${itemId}, node ${i}: no list of what changed`);
  const sid = n.sid ? `<span class="loc">${esc(n.sid)}${n.location ? " · " + esc(n.location) : ""}</span>` : `<span class="loc">${n.location ? esc(n.location) + " · " : ""}sid выдаст sheriff reindex</span>`;
  return `<div class="nodebox">
<div class="nodehead"><span class="h2n">${inline(n.label)}</span> <span class="tag">${STATUS[n.status]}</span><br>${sid}</div>
<div class="two">${wording(n.en, FIELDS_EN, "en")}${wording(n.ru, FIELDS_RU, "ru")}</div>
${n.agreed ? `<details class="inner" id="agreed-${esc(itemId)}-${i}"><summary>Согласованная формулировка, которую узел заменяет</summary><div class="two">${wording(n.agreed.en, FIELDS_EN, "en")}${wording(n.agreed.ru, FIELDS_RU, "ru")}</div></details>` : ""}
${n.changes?.length ? `<div class="label big">Что изменилось</div><ul class="changes">${n.changes.map((c) => `<li>${inline(c)}</li>`).join("")}</ul>` : ""}
${n.links ? `<div class="label">Связи</div><div class="field">${block(n.links)}</div>` : ""}
</div>`;
}
function item(it) {
  for (const k of ["id", "title"]) if (!it[k]) throw new Error(`an item has no ${k}`);
  const body = [];
  if (it.report) body.push(`<div class="why">${block(it.report)}</div>`);
  if (it.why?.length) body.push(`<div class="why">${it.why.map(block).join("")}</div>`);
  if (it.recommendation) {
    body.push(`<div class="why decide"><p><b>Рекомендую: ${inline(it.recommendation)}</b></p>${it.basis?.length ? `<ul class="txt">${it.basis.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>` : ""}</div>`);
    if (!it.options?.length) throw new Error(`item ${it.id}: a question has no options`);
    body.push(`<div class="label big">Варианты</div><ul class="options">${it.options.map((o) => {
      for (const k of ["label", "title", "sees", "cost", "risk"]) if (!o[k]) throw new Error(`item ${it.id}, option ${o.label}: no ${k}`);
      return `<li><p><b>${esc(o.label)}${o.recommended ? " (рекомендую)" : ""}. ${inline(o.title)}</b></p><p><span class="cost">Что видит человек:</span> ${inline(o.sees)}</p><p><span class="cost">Цена:</span> ${inline(o.cost)}</p><p><span class="cost">Риск:</span> ${inline(o.risk)}</p></li>`;
    }).join("")}</ul>`);
    if (it.options.filter((o) => o.recommended).length !== 1) throw new Error(`item ${it.id}: exactly one option is recommended`);
  }
  if (it.nodes?.length) {
    if (it.recommendation) body.push(`<div class="label big">Формулировки при рекомендуемом варианте</div>`);
    body.push(it.nodes.map((n, i) => node(n, it.id, i)).join("\n"));
  }
  if (it.assessment?.length) {
    if (it.assessment.length !== 5) throw new Error(`item ${it.id}: the «Оценка» has one line per criterion, five in all`);
    body.push(`<div class="label big">Оценка</div><ul class="assess">${it.assessment.map((a) => `<li>${inline(a)}</li>`).join("")}</ul>`);
  }
  return `<details class="node-section" id="item-${esc(it.id)}">
<summary><span class="h">${esc(it.id)}. ${inline(it.title)}</span>${it.summary ? `<br><span class="hen">${inline(it.summary)}</span>` : ""}</summary>
${body.join("\n")}
</details>`;
}

const CSS = `
  :root {
    --bg: #0f171c; --panel: #17232b; --raised: #1e2d37; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --new: #e2a23b; --link: #5cb8d8; --mark: #3b5566; --warn: #e07a5f;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  html, body { background: var(--bg); color: var(--fg); }
  body { font-family: var(--body); font-size: 15px; line-height: 1.45; margin: 0; padding-block: 16px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); max-width: 1200px; margin-inline: auto; }
  h1 { font-family: var(--display); font-size: 1.5rem; margin: 0 0 8px; text-wrap: balance; }
  h2 { font-family: var(--display); font-size: 1.15rem; margin: 32px 0 8px; }
  p { margin: 0 0 6px; }
  .label { color: var(--muted); font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; margin: 8px 0 2px; }
  .label.big { color: var(--new); font-size: 0.82rem; margin-top: 12px; }
  .field { margin-bottom: 4px; }
  .wt { font-weight: 700; }
  /* As the owner's rule on showing a node says, the English comes first and the Russian below it. */
  .two { display: block; }
  .lang { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 12px; margin-top: 10px; min-width: 0; overflow-wrap: anywhere; }
  .lang[lang="en"] { color: #d5dbe0; }
  .ex { border-left: 2px solid var(--mark); padding-left: 8px; margin-bottom: 6px; }
  ul.txt, ol.txt { margin: 2px 0 6px; padding-left: 22px; }
  ul.txt li, ol.txt li { margin-bottom: 3px; } li.li2 { margin-left: 18px; }
  code { font-family: var(--mono); font-size: 0.88em; background: var(--raised); padding: 0 3px; border-radius: 3px; overflow-wrap: anywhere; }
  .cite { color: var(--link); cursor: help; }
  ul.assess, ul.changes, ul.options, ul.reports { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
  ul.options li { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 10px; overflow-wrap: anywhere; }
  ul.changes li { border-left: 3px solid var(--new); padding: 2px 0 2px 10px; overflow-wrap: anywhere; }
  ul.assess li { padding: 2px 0; overflow-wrap: anywhere; }
  .why { background: var(--panel); border: 1px solid var(--rule); border-left: 3px solid var(--new); border-radius: 6px; padding: 8px 12px; margin: 8px 0; overflow-wrap: anywhere; }
  .why.decide { border-left-color: var(--warn); }
  .cost { color: var(--muted); }
  .loc { font-family: var(--mono); color: var(--muted); font-size: 0.8rem; overflow-wrap: anywhere; }
  .tag { font-size: 0.75rem; color: var(--new); border: 1px solid var(--new); border-radius: 10px; padding: 0 6px; }
  .nodebox { border: 1px solid var(--rule); border-radius: 8px; padding: 8px 10px; margin-top: 12px; background: #131e25; }
  .nodehead .h2n { font-family: var(--display); font-weight: 700; }
  details.node-section { border: 1px solid var(--rule); border-radius: 8px; padding: 8px 12px; margin-top: 10px; min-width: 0; }
  details.node-section[open] { background: #121c22; }
  details.node-section > summary { cursor: pointer; overflow-wrap: anywhere; }
  details.node-section > summary .h { font-family: var(--display); font-weight: 700; font-size: 1.05rem; }
  details.node-section > summary .hen { color: var(--muted); }
  details.inner { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 10px; margin-top: 10px; }
  details.inner > summary { cursor: pointer; color: var(--muted); }
  .hint { color: var(--muted); font-size: 0.9rem; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 4px; }
  button { font: inherit; color: var(--fg); background: var(--raised); border: 1px solid var(--rule); border-radius: 4px; padding: 6px 12px; cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
  .intro, .question { background: var(--panel); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 14px; margin-top: 10px; overflow-wrap: anywhere; }
  .question { border-left: 3px solid var(--warn); }
`;
const SCRIPT = `<script>
  // An opened section stays open across reloads and republishes; one control opens every section.
  const details = [...document.querySelectorAll("details")];
  const key = "open:" + location.pathname + ":" + document.title;
  try { const open = JSON.parse(localStorage.getItem(key) || "[]"); details.forEach((d) => { if (open.includes(d.id)) d.open = true; }); } catch {}
  const save = () => { try { localStorage.setItem(key, JSON.stringify(details.filter((d) => d.open).map((d) => d.id))); } catch {} };
  details.forEach((d) => d.addEventListener("toggle", save));
  document.getElementById("open-all").addEventListener("click", () => { details.forEach((d) => { d.open = true; }); save(); });
  document.getElementById("close-all").addEventListener("click", () => { details.forEach((d) => { d.open = false; }); save(); });
  const openTarget = () => { const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t && t.tagName === "DETAILS") { t.open = true; save(); } };
  window.addEventListener("hashchange", openTarget); openTarget();
</script>`;

const ids = new Set();
for (const pg of data.pages) {
  for (const k of ["id", "title", "h1", "intro", "sections", "question"]) if (!pg[k]) throw new Error(`page ${pg.id}: no ${k}`);
  for (const s of pg.sections) for (const it of s.items) { if (ids.has(it.id)) throw new Error(`item ${it.id} is on two pages`); ids.add(it.id); }
  const html = `<title>${esc(pg.title)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>${CSS}</style>

<h1>${inline(pg.h1)}</h1>
<div class="intro">${pg.intro.map(block).join("")}</div>
<div class="bar"><button id="open-all" type="button">Раскрыть всё</button><button id="close-all" type="button">Свернуть всё</button></div>

${pg.sections.map((s) => `<h2>${inline(s.heading)}</h2>${s.hint ? `<p class="hint">${inline(s.hint)}</p>` : ""}\n${s.items.map(item).join("\n")}`).join("\n\n")}

<div class="question"><p><b>${inline(pg.question)}</b></p></div>
${SCRIPT}
`;
  // The page names no round of the work, no reviewer of the drafts and no report, and calls the owner «ответственный».
  // The wordings of nodes are left out of this check: a node may name the reviewer of a commit as its subject.
  const shown = html.replace(/<script>[\s\S]*<\/script>/, "").replace(/<!--W-->[\s\S]*?<!--\/W-->/g, "");
  for (const bad of [/раунд/i, /рецензент[а-яё]* [AB]\b/, /review[23]?-/i, /english-b/i, /fix-brief/i, /base-questions/i, /владел/i, /\bround [a-e]\b/i, /undefined/, /\[object/]) {
    const m = shown.match(new RegExp(`.{0,80}${bad.source}.{0,80}`, bad.flags));
    if (m) throw new Error(`page ${pg.id} holds ${bad}: ${m[0]}`);
  }
  if (/undefined|\[object /.test(html)) throw new Error(`page ${pg.id} holds undefined or [object`);
  fs.mkdirSync(new URL(`bq-pages/${pg.id}/`, here), { recursive: true });
  fs.writeFileSync(new URL(`bq-pages/${pg.id}/index.html`, here), html);
  console.log(`bq-pages/${pg.id}/index.html written: ${pg.sections.reduce((n, s) => n + s.items.length, 0)} items`);
}
if (unknown.size) throw new Error(`the pages cite sids that name no node: ${[...unknown].join(", ")}`);
