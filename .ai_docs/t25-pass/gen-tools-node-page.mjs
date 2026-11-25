// Builds the page that shows the owner a proposed new wording of a node of the appendix of the tools, from
// its draft in tools-drafts.json: each part in English and in Russian, what changed in it, the nodes it
// cites; the node's links, its tests and its approved wording. Usage: node gen-tools-node-page.mjs <sid> [<directory>]
// Writes <directory>/index.html, tools-page/index.html by default.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const sid = process.argv[2];
if (!sid) throw new Error("usage: node gen-tools-node-page.mjs <sid>");
const draft = JSON.parse(fs.readFileSync(new URL("tools-drafts.json", here), "utf8"))[sid];
if (!draft?.proposal) throw new Error(`no proposal for ${sid}`);
const p = draft.proposal;

// Titles of every node a part may cite: the new form of the guidelines first, then the appendix of the tools.
const info = new Map();
function walk(nodes, f) {
  for (const n of nodes) {
    f(n);
    if (n.children) walk(n.children, f);
    // A TableRule keeps its rows in groups, and a node in a cell has no title: its text stands in for one.
    const rows = [...(n.rows || []), ...(n.groups || []).flatMap((g) => g.rows || [])];
    for (const r of rows) for (const c of Object.values(r.cells || {})) if (c && c.node) f({ ...c.node, title: c.node.title ?? c.node.text });
  }
}
const read = (u) => JSON.parse(fs.readFileSync(new URL(u, here), "utf8"));
for (const f of ["moved/specs/_guidelines/spec.json", "moved/specs/_guidelines/extensions/domains.json",
  "moved/specs/_guidelines/extensions/recordtype.json", "moved/specs/_guidelines/extensions/views.json"]) {
  const doc = f.includes("extensions/") ? "extension " + f.match(/extensions\/(\w+)/)[1] : "guidelines";
  walk(read(f).nodes, (n) => n.sid && info.set(n.sid, { title: n.title, location: n.location.replace(/^_guidelines\/(spec|extensions\/\w+)\//, ""), doc }));
}
const tools = read("../../specs/_guidelines/tools.json");
// A new node has no approved wording of its own: the page shows that of the node it is carved from, `draft.from`.
const drafts = read("tools-drafts.json");
let current, source;
walk(tools.nodes, (n) => {
  if (n.sid === sid) current = n;
  if (draft.from && n.sid === draft.from) source = n;
  if (n.sid && !info.has(n.sid)) info.set(n.sid, { title: n.title, location: "tools " + n.location.replace(/^_guidelines\/tools\/?/, ""), doc: "appendix of the tools" });
});
const ru = new Map();
for (const v of Object.values(read("newform.json"))) if (v.sidValue && v.ruTitle) ru.set(v.sidValue, v.ruTitle);
// A new node of the appendix that is still a draft is known by the sid kept in its draft, and shown with its proposed title.
for (const d of Object.values(drafts)) if (d && d.sidValue && d.proposal) {
  info.set(d.sidValue, { title: d.proposal.title, location: d.location ?? "", doc: "draft of the appendix of the tools" });
  if (d.proposal.ruTitle) ru.set(d.sidValue, d.proposal.ruTitle);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const SID = /§?(s-[2-9a-hjkmnp-z]{15})/g;
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(SID, (m, id) => {
      const i = info.get(id);
      return `<span class="cite" data-sid="${id}" title="${i ? esc(i.title) : "unknown node"}">§${i ? esc(i.location) : id}</span>`;
    });
}
const cites = (s) => [...new Set([...(Array.isArray(s) ? s.join(" ") : s).matchAll(SID)].map((m) => m[1]))];

function cell(kind, v) {
  if (kind === "th") return `<div class="row th c${v.length}">${v.map((x) => `<span>${inline(x)}</span>`).join("")}</div>`;
  if (kind === "tr") return `<div class="row c${v.length}">${v.map((x) => `<span>${inline(x)}</span>`).join("")}</div>`;
  if (kind === "li") return `<div class="li">• ${inline(v)}</div>`;
  return `<p>${inline(v)}</p>`;
}
const partRows = p.parts.map((part, i) => {
  const ids = cites(part.en);
  return `<tr class="part" id="part-${i}" data-cites="${ids.join(" ")}">
  <td class="en">${cell(part.kind, part.en)}</td>
  <td class="ru">${cell(part.kind, part.ru)}</td>
  <td class="change${/^Без изменений/.test(part.change) ? " same" : ""}">${inline(part.change)}</td>
  <td class="links">${ids.map((id) => `<span class="cite" data-sid="${id}">${esc(info.get(id)?.title ?? id)}</span>`).join("")}</td>
</tr>`;
}).join("\n");

const allCited = cites(p.text);
const links = p.refs ?? allCited.map((to) => ({ type: "cites", to }));
const typeRu = { implements: "реализует", cites: "ссылается" };
const nodeList = links.map(({ type, to: id }) => {
  const i = info.get(id) ?? { title: "?", location: "?", doc: "?" };
  return `<li class="node" data-sid="${id}"><span class="loc">${esc(typeRu[type] ?? type)} · ${esc(i.location)}</span> <b>${esc(i.title)}</b>${ru.get(id) ? `<br><span class="rut">${esc(ru.get(id))}</span>` : ""}<br><span class="meta">${esc(i.doc)} · ${id}</span></li>`;
}).join("\n");

const base = current ?? source;
if (!base) throw new Error(`${sid}: neither an approved node nor a node it is carved from`);
// `testsFrom` names the test files, one or several, whose tests the page shows; without it the page shows them all.
// A filter matches a test where it occurs in the test's entry, its file and its name together.
const testsOf = (base.meta?.tests || []).filter((t) => !draft.testsFrom || [].concat(draft.testsFrom).some((f) => t.includes(f)));
const tests = testsOf.map((t) => `<li><code>${esc(t.replace(/^.*::@spec s-\w+ /, ""))}</code><br><span class="meta">${esc(t.split("::")[0])}</span></li>`).join("\n");
const removed = (p.removed || []).map((r) => `<li>${inline(r)}</li>`).join("\n");
const approvedText = esc(base.text);
const approvedRu = current ? draft.approvedRu : drafts[draft.from]?.approvedRu;
const outDir = process.argv[3] ?? "tools-page";

const page = `<title>Узел описания инструментов: ${esc(p.ruTitle)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header naming the node, its reason, then the parts in four columns over the lists of links, tests and removals. */
  :root {
    --bg: #0f171c; --panel: #17232b; --raised: #1e2d37; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --new: #e2a23b; --same: #6f7f8a; --link: #5cb8d8; --mark: #3b5566;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  html, body { background: var(--bg); color: var(--fg); }
  body { font-family: var(--body); font-size: 15px; line-height: 1.45; padding-block: 16px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  h1 { font-family: var(--display); font-size: 1.5rem; margin: 0; text-wrap: balance; }
  h2 { font-family: var(--display); font-size: 1.1rem; margin: 28px 0 8px; }
  .sub { color: var(--muted); font-family: var(--mono); font-size: 0.85rem; margin-top: 4px; }
  .reason { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 12px 14px; margin-top: 14px; }
  .reason > div { min-width: 0; }
  .label { color: var(--muted); font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 4px; }
  .wrap { overflow-x: auto; }
  table.parts { border-collapse: collapse; width: 100%; min-width: 980px; }
  table.parts th { text-align: left; color: var(--muted); font-weight: 400; font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase; padding: 6px 8px; border-bottom: 1px solid var(--rule); }
  table.parts td { vertical-align: top; padding: 8px; border-bottom: 1px solid var(--rule); }
  td.en, td.ru { width: 31%; } td.change { width: 24%; color: var(--new); font-size: 0.9rem; } td.change.same { color: var(--same); } td.links { width: 14%; }
  tr.part { cursor: pointer; } tr.part.on { background: var(--raised); } tr.part.hit { background: var(--mark); }
  .row { display: grid; grid-template-columns: 1fr 1.4fr; gap: 10px; } .row.th { color: var(--muted); font-weight: 700; }
  .row.c3 { grid-template-columns: 1.3fr 1fr 1fr; }
  .row span { min-width: 0; overflow-wrap: anywhere; }
  p { margin: 0; }
  code { font-family: var(--mono); font-size: 0.88em; background: var(--panel); padding: 0 3px; border-radius: 3px; overflow-wrap: anywhere; }
  .cite { color: var(--link); cursor: pointer; }
  td.links .cite { display: block; font-size: 0.85rem; margin-bottom: 4px; }
  ul.nodes, ul.plain { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  li.node { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 10px; cursor: pointer; }
  li.node.on { border-color: var(--link); } li.node.hit { background: var(--mark); }
  .loc { font-family: var(--mono); color: var(--muted); } .rut { color: var(--muted); } .meta { font-family: var(--mono); font-size: 0.78rem; color: var(--muted); }
  ul.plain li { background: var(--panel); border-radius: 6px; padding: 8px 10px; }
  details { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px 12px; margin-top: 10px; }
  summary { cursor: pointer; color: var(--muted); }
  pre { white-space: pre-wrap; font-family: var(--mono); font-size: 0.85rem; margin: 8px 0 0; }
  button { font: inherit; color: var(--fg); background: var(--raised); border: 1px solid var(--rule); border-radius: 4px; padding: 4px 10px; cursor: pointer; }
  button:focus-visible, tr.part:focus-visible, li.node:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
  .hint { color: var(--muted); font-size: 0.85rem; }
  @media (max-width: 700px) { .reason { grid-template-columns: 1fr; } }
</style>

<h1>${esc(p.ruTitle)} <span style="color:var(--muted);font-weight:400">· ${esc(p.title)}</span></h1>
<div class="sub">${esc(draft.location)} · ${sid} · предложение от ${esc(p.date)} · ждёт вашего согласия</div>

<div class="reason">
  <div><div class="label">Обоснование</div>${inline(p.ruReason)}</div>
  <div><div class="label">Reason</div>${inline(p.reason)}</div>
</div>
<p class="hint" style="margin-top:8px">${inline(p.reasonChange || "")}</p>
${(p.examples || []).map((x) => `
<div class="reason">
  <div><div class="label">Пример</div>${inline(x.ru)}</div>
  <div><div class="label">Example</div>${inline(x.en)}</div>
</div>
<p class="hint" style="margin-top:8px">${inline(x.change || "")}</p>`).join("\n")}

<h2>Формулировка по частям</h2>
<p class="hint">Щелчок по части выделяет узлы, на которые она ссылается; щелчок по узлу внизу выделяет части, которые на него ссылаются.</p>
<div class="wrap"><table class="parts">
<thead><tr><th>English</th><th>Русский</th><th>Что изменилось</th><th>Ссылается на</th></tr></thead>
<tbody>
${partRows}
</tbody></table></div>

<h2>Что убрано из узла</h2>
<ul class="plain">
${removed}
</ul>

<h2>Связи узла: что он реализует и на что ссылается</h2>
<ul class="nodes">
${nodeList}
</ul>

<h2>${current ? "Тесты, привязанные к узлу сейчас" : `Тесты, которые перейдут к узлу от «${esc(source.title)}»`}</h2>
<ul class="plain">
${tests}
</ul>

<h2>${current ? "Одобренная формулировка" : `Одобренная формулировка узла «${esc(source.title)}», из которого выделен этот узел`}</h2>
<p class="hint">${current ? "Пока вы не согласились с предложением, текстом узла остаётся одобренная формулировка." : "Этого узла ещё нет: то, что он говорит, сейчас говорит одобренная формулировка узла, из которого он выделен."}</p>
<button id="open-all" type="button">Раскрыть всё</button>
<details id="approved-ru"><summary>Текущий текст узла по-русски</summary><pre>${esc(approvedRu ?? "")}</pre></details>
<details id="approved"><summary>Текущий текст узла (English)</summary><pre>${approvedText}</pre></details>

<script>
  // Selecting a part marks the nodes it cites; selecting a node marks the parts citing it.
  const parts = [...document.querySelectorAll("tr.part")];
  const nodes = [...document.querySelectorAll("li.node")];
  const clear = () => document.querySelectorAll(".on, .hit").forEach((e) => e.classList.remove("on", "hit"));
  parts.forEach((tr) => { tr.tabIndex = 0; tr.addEventListener("click", () => {
    clear(); tr.classList.add("on");
    const ids = tr.dataset.cites.split(" ").filter(Boolean);
    nodes.forEach((n) => ids.includes(n.dataset.sid) && n.classList.add("hit"));
  }); });
  nodes.forEach((li) => { li.tabIndex = 0; li.addEventListener("click", () => {
    clear(); li.classList.add("on");
    parts.forEach((tr) => tr.dataset.cites.split(" ").includes(li.dataset.sid) && tr.classList.add("hit"));
  }); });
  // An opened block stays open across reloads and republishes.
  const details = [...document.querySelectorAll("details")];
  const key = "open:" + location.pathname;
  try { const open = JSON.parse(localStorage.getItem(key) || "[]"); details.forEach((d) => { if (open.includes(d.id)) d.open = true; }); } catch {}
  const save = () => { try { localStorage.setItem(key, JSON.stringify(details.filter((d) => d.open).map((d) => d.id))); } catch {} };
  details.forEach((d) => d.addEventListener("toggle", save));
  document.getElementById("open-all").addEventListener("click", () => { details.forEach((d) => { d.open = true; }); save(); });
</script>
`;
fs.mkdirSync(new URL(`${outDir}/`, here), { recursive: true });
fs.writeFileSync(new URL(`${outDir}/index.html`, here), page);
console.log(`${outDir}/index.html written:`, p.parts.length, "parts,", allCited.length, "nodes cited");
