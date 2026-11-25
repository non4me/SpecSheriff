// Builds table-10-1.html, the page the owner reads node 10.1 "The table of checks" on: every row in English and
// Russian with its cost, what it was, what changed and where it goes, and the nodes each row checks, cross-lit both
// ways. A large node is shown as a page (.claude/vt/rules.md "A large or tangled node is shown as a page").
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = (p) => JSON.parse(fs.readFileSync(new URL(p, here), "utf8"));
// node gen-table-10-1.mjs [<table>.json <page>.html <number>] builds the page of another TableRule of checks.
const [src = "table-10-1.json", out = "table-10-1.html", at = "10.1"] = process.argv.slice(2);
const t = read(src);
const h = t.head;
const drafts = read("newform.json");
const spec = read("../../specs/_guidelines/spec.json");
const tools = read("../../specs/_guidelines/tools.json");

// What each sid is called: the agreed or drafted new form first, then the present files.
const names = {};
const present = {};
for (const doc of [spec, tools]) (function walk(ns) { for (const n of ns) { present[n.sid] = n; if (n.location.startsWith("_guidelines/spec/")) present[n.location.replace("_guidelines/spec/", "=")] = n; if (n.children) walk(n.children); } })(doc.nodes);
for (const [num, d] of Object.entries(drafts)) {
  const title = typeof d.title === "string" && d.title.startsWith("=") ? present[d.title]?.title : d.title;
  if (d.sidValue) names[d.sidValue] = { at: num, title, ru: d.ruTitle ?? "", agreed: !!d.agreed };
}
for (const [sid, n] of Object.entries(present)) if (sid.startsWith("s-") && !names[sid]) names[sid] = { at: n.location.replace("_guidelines/", ""), title: n.title, ru: "", agreed: n.status === "approved" };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/§(s-[2-9a-z]{15})/g, (m, sid) => `<span class="cite" title="${esc(names[sid] ? names[sid].at + " " + names[sid].title : sid)}">§${sid}</span>`);
const fates = {
  "stays": ["stays", `остаётся в ${at}`],
  "from 10.1": ["stays", "переходит сюда из таблицы 10.1"],
  "to 11.3 Domains checks": ["dom", "уходит в 11.3 «Таблица проверок расширения «Домены»»"],
  "to 12.12 RecordType checks": ["dom", "уходит в 12.12 «Таблица проверок расширения «RecordType»»"],
  "to 11.1 Domains": ["dom", "уходит в 11.1 «Домены: декомпозиция»"],
  "to 12 RecordType": ["dom", "уходит в 12 «RecordType»"],
  "to 11.2 Domains": ["dom", "уходит в 11.2 «Домены: иерархия»"],
  "new": ["stays", `новая строка в ${at}`],
  "deleted": ["del", "удаляется"],
};
const count = {};
const allRows = t.tables.flatMap((g) => g.rows);
for (const r of allRows) count[r.fate] = (count[r.fate] ?? 0) + 1;
const used = [...new Set(allRows.flatMap((r) => r.rests ?? []))].sort((a, b) => (names[a]?.at ?? a).localeCompare(names[b]?.at ?? b, "en", { numeric: true }));

// Each base rule a check guards, whole: its text and reason in English and Russian, from the new form's drafts, an
// "=X.Y" value read from the present spec.json.
const draftBySid = {};
for (const [num, d] of Object.entries(drafts)) if (d.sidValue) draftBySid[d.sidValue] = { num, ...d };
const field = (d, k) => (typeof d[k] === "string" && d[k].startsWith("=") ? present[d[k]]?.[k] : d[k]) ?? "";
const guarded = (sid) => {
  const d = draftBySid[sid];
  if (!d) return "";
  return `<div class="impl base"><div class="at">${esc(d.num)} · ${sid}${d.agreed ? " · согласован" : ""}</div>
        <div class="pair"><div><p><b>${code(field(d, "title"))}</b></p><p class="pre">${code(field(d, "text"))}</p><p class="why">${code(field(d, "reason"))}</p></div>
        <div><p><b>${code(d.ruTitle ?? "")}</b></p><p class="pre">${code(d.ruText ?? "")}</p><p class="why">${code(d.ruReason ?? "")}</p></div></div></div>`;
};

// Each tools node implementing a check, whole: where it is, its title, text and reason, and its Russian where written.
const toolsNode = (sid) => {
  const n = present[sid];
  if (!n) return `<div class="impl gap">${esc(sid)}: нет такого узла</div>`;
  const ru = (t.toolsRu ?? {})[sid];
  const at = n.location.replace("_guidelines/tools/", "описание инструментов ");
  return `<div class="impl"><div class="at">${esc(at)} · ${sid}</div>
        <div class="pair"><div><p><b>${code(n.title)}</b></p><p class="pre">${code(n.text)}</p><p class="why">${code(n.reason ?? "")}</p></div>
        <div>${ru ? `<p><b>${code(ru.title)}</b></p><p class="pre">${code(ru.text)}</p><p class="why">${code(ru.reason)}</p>` : "<p class=\"none\">перевод — когда дойдём до этой проверки</p>"}</div></div></div>`;
};

const row = (r) => {
  const [cls, label] = fates[r.fate] ?? ["stays", r.fate];
  const rests = (r.rests ?? []).map((s) => `<button type="button" class="chip" data-sid="${s}" title="${esc(names[s]?.title ?? s)}">${esc(names[s]?.at ?? s)} · ${esc(names[s]?.title ?? s)}${names[s]?.ru ? ` · ${esc(names[s].ru)}` : ""}</button>`).join("");
  const impl = r.impl === undefined ? "" : `<div class="lab">Реализуют (узлы описания инструментов)</div>${r.impl.length ? r.impl.map(toolsNode).join("") : "<div class=\"impl gap\">Ни один узел описания инструментов эту проверку не реализует — пробел</div>"}`;
  const about = r.about ? `<div class="lab">Что затрагивает</div><p class="about">${code(r.about)}</p>` : "";
  const reason = r.reason ? `<div class="pair"><div><div class="lab">EN · обоснование (необязательное)</div><p>${code(r.reason)}</p></div><div><div class="lab">RU · обоснование</div><p>${code(r.ruReason)}</p></div></div>` : r.noReason ? `<div class="lab">Обоснование</div><p class="change">${code(r.noReason)}</p>` : "";
  const rowExamples = r.examples ? `<div class="pair"><div><div class="lab">EN · пример</div><p>${r.examples.map(code).join("<br>")}</p></div><div><div class="lab">RU · пример</div><p>${(r.ruExamples ?? []).map(code).join("<br>")}</p></div></div>` : "";
  const list = r.proposals ?? (r.proposal ? [r.proposal] : []);
  const proposal = list.length ? `<div class="lab">Предложения — каждое отдельно, ждут вашего решения</div><ol class="doubts">${list.map((x) => `<li><div class="pair"><div><p>${code(x.en)}</p></div><div><p>${code(x.ru)}</p></div></div><p class="change">${code(x.why)}</p></li>`).join("")}</ol>` : "";
  const tests = r.tests ?`<div class="lab">Тесты</div><ul class="doubts">${r.tests.map((x) => `<li><code>${esc(x)}</code></li>`).join("")}</ul>` : "";
  return `<li class="row f-${cls}" id="r${r.n}" data-rests="${(r.rests ?? []).join(" ")}" data-fate="${cls}">
  <details class="fold" data-key="r${r.n}" open>
    <summary><span class="n">${r.num ?? "—"}</span><span class="fate ${cls}">${esc(label)}</span><span class="head">${code(r.en)}</span>${r.agreed ? `<span class="fate stays">согласована ${esc(r.agreed)}</span>` : ""}</summary>
    <div class="body">
      ${about}
      <div class="pair"><div><div class="lab">EN${r.proposals ? (!r.was ? " · новая формулировка" : r.en === r.was.split(" | ")[0] ? " · одобренная формулировка" : " · формулировка с принятыми вами предложениями") : ""}</div><p>${code(r.en)}</p><p class="cost">On failure: ${code(r.cost)}</p></div>
      <div><div class="lab">RU</div><p>${code(r.ru)}</p><p class="cost">При непрохождении: ${code(r.ruCost)}</p></div></div>
      ${proposal}
      ${rowExamples}
      ${reason}
      <div class="lab">Охраняет правила (связь checks)</div><div class="chips">${rests || "<span class=\"none\">—</span>"}</div>
      ${r.about ? (r.rests ?? []).map(guarded).join("") : ""}
      ${impl}
      ${tests}
      <div class="lab">Что изменилось</div><p class="change">${code(r.change)}</p>
      <div class="lab">Было</div><p class="was">${code(r.was)}</p>
    </div>
  </details>
</li>`;
};

const html = `<title>Таблица проверок ${at}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header with the counts and the controls, the intro, the two tables as foldable rows beside a column of
     the nodes they check, then the reason and the open questions. One dark look, as the owner reads every page. */
  :root {
    --bg: #0f171c; --panel: #17232b; --panel-2: #1d2b35; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --stays: #5fbf86; --dom: #9fb6cf; --gen: #5cb8d8; --ado: #e2a23b; --del: #e07a6a; --lit: #e8b75a;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  body { background: var(--bg); color: var(--fg); font-family: var(--body); font-size: 15px; line-height: 1.45; }
  .wrap { max-width: 1240px; margin: 0 auto; padding-block: 18px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: grid; gap: 20px; }
  header { display: grid; gap: 10px; border-bottom: 1px solid var(--rule); padding-bottom: 14px; }
  h1 { font-family: var(--display); font-size: 1.45rem; margin: 0; text-wrap: balance; }
  h2 { font-family: var(--display); font-size: 1.1rem; margin: 0; text-wrap: balance; }
  .sub { color: var(--muted); font-family: var(--mono); font-size: 0.8rem; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px 14px; align-items: center; }
  .filter, #open-all, #close-all { font: inherit; font-size: 0.85rem; color: var(--fg); background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: 4px 10px; cursor: pointer; }
  .filter[aria-pressed="true"] { border-color: var(--fg); background: var(--panel-2); }
  .filter:focus-visible, #open-all:focus-visible, #close-all:focus-visible, .chip:focus-visible, summary:focus-visible { outline: 2px solid var(--gen); outline-offset: 2px; }
  .hint { color: var(--muted); font-size: 0.85rem; margin: 0; max-width: 80ch; }
  .note { background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: 12px 14px; display: grid; gap: 8px; min-width: 0; }
  .grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; align-items: start; }
  @media (max-width: 900px) { .grid { grid-template-columns: minmax(0, 1fr); } }
  ol.rows { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
  li.row { background: var(--panel); border: 1px solid transparent; border-left: 3px solid var(--stays); border-radius: 4px; min-width: 0; }
  li.row.f-dom { border-left-color: var(--dom); } li.row.f-gen { border-left-color: var(--gen); } li.row.f-ado { border-left-color: var(--ado); } li.row.f-del { border-left-color: var(--del); }
  li.row.lit { border-color: var(--lit); background: var(--panel-2); }
  li.row.sel { border-color: var(--fg); background: var(--panel-2); }
  details.fold > summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: 4.2rem auto 1fr; gap: 4px 10px; align-items: baseline; padding: 8px 10px; }
  details.fold > summary::-webkit-details-marker { display: none; }
  .n { font-family: var(--mono); color: var(--muted); font-variant-numeric: tabular-nums; }
  .fate { font-family: var(--mono); font-size: 0.72rem; padding: 1px 7px; border: 1px solid currentColor; border-radius: 3px; white-space: nowrap; }
  .fate.stays { color: var(--stays); } .fate.dom { color: var(--dom); } .fate.gen { color: var(--gen); } .fate.ado { color: var(--ado); } .fate.del { color: var(--del); }
  .head { min-width: 0; overflow-wrap: anywhere; }
  @media (max-width: 560px) { details.fold > summary { grid-template-columns: 2rem 1fr; } .head { grid-column: 1 / -1; } }
  .body { padding: 0 12px 12px; display: grid; gap: 6px; }
  .pair { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
  .pair > div { min-width: 0; }
  .lab { font-family: var(--mono); font-size: 0.72rem; color: var(--lit); letter-spacing: 0.04em; }
  p { margin: 0; overflow-wrap: anywhere; }
  .cost { color: var(--muted); font-size: 0.9rem; }
  .change { font-size: 0.92rem; } .was { color: var(--muted); font-size: 0.88rem; }
  code { font-family: var(--mono); font-size: 0.86em; }
  .cite { font-family: var(--mono); font-size: 0.85em; border-bottom: 1px dotted currentColor; cursor: help; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip { font: inherit; font-family: var(--mono); font-size: 0.78rem; color: var(--fg); background: var(--panel-2); border: 1px solid var(--rule); border-radius: 3px; padding: 2px 7px; cursor: pointer; }
  .chip.lit { border-color: var(--lit); color: var(--lit); }
  aside { position: sticky; top: env(safe-area-inset-top, 0px); max-height: 100vh; overflow-y: auto; display: grid; gap: 6px; align-content: start; }
  @media (max-width: 900px) { aside { position: static; max-height: none; } }
  .node { text-align: left; font: inherit; font-size: 0.86rem; color: var(--fg); background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: 6px 8px; cursor: pointer; display: grid; gap: 2px; }
  .node .at { font-family: var(--mono); font-size: 0.75rem; color: var(--muted); }
  .node.lit { border-color: var(--lit); } .node.sel { border-color: var(--fg); background: var(--panel-2); }
  .node .cnt { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }
  ul.doubts { margin: 0; padding-left: 18px; display: grid; gap: 6px; }
  .none { color: var(--muted); }
  .pre { white-space: pre-line; }
  .impl { border: 1px solid var(--rule); border-left: 3px solid #5cb8d8; border-radius: 4px; padding: 8px 10px; display: grid; gap: 4px; background: var(--panel-2); }
  .impl .at { font-family: var(--mono); font-size: 0.75rem; color: var(--muted); }
  .impl .why { color: var(--muted); font-style: italic; }
  .impl.gap { border-left-color: #e07a6a; color: #e07a6a; }
  .impl.base { border-left-color: #e8b75a; }
  .about { border-left: 3px solid #e8b75a; padding-left: 10px; }
  .thead { display: grid; grid-template-columns: 3fr 1fr; gap: 12px; padding: 8px 12px; border: 1px solid var(--rule); border-radius: 4px; background: var(--panel-2); font-size: 0.9rem; }
  @media (prefers-reduced-motion: no-preference) { li.row, .node { transition: background-color .15s, border-color .15s; } }
</style>
<div class="wrap">
  <header>
    <h1>${esc(h.title)}</h1>
    <div class="sub">${at} · ${h.sid} · TableRule · ${esc(h.ruTitle)}</div>
    <p class="hint">Каждая строка: текст по-английски и по-русски с ценой отказа, что изменилось, какой она была и какие узлы она проверяет. Цвет полосы слева — судьба строки. Щелчок по узлу справа подсвечивает строки, которые его проверяют; щелчок по узлу в строке подсвечивает его справа. Свёрнутые строки остаются свёрнутыми после обновления страницы.</p>
    <div class="bar" role="group" aria-label="Показать строки">
      ${Object.entries(fates).map(([k, [cls, label]]) => `<button type="button" class="filter" data-fate="${cls}" aria-pressed="true" id="f-${cls}"><span class="fate ${cls}">${esc(label)}</span> ${count[k] ?? 0}</button>`).join("\n      ")}
      <button type="button" id="open-all">Раскрыть все строки</button>
      <button type="button" id="close-all">Свернуть все строки</button>
    </div>
  </header>

  <section class="note" aria-labelledby="intro-h">
    <h2 id="intro-h">Шапка таблицы — сам узел, ${h.agreed ? `согласована ${esc(h.agreed)}` : "на согласовании"}</h2>
    <div class="pair"><div><div class="lab">EN · текст</div><p class="pre">${code(h.text)}</p></div><div><div class="lab">RU · текст</div><p class="pre">${code(h.ruText)}</p></div></div>
    ${h.examples ? `<div class="pair"><div><div class="lab">EN · пример</div><p>${h.examples.map(code).join("<br>")}</p></div><div><div class="lab">RU · пример</div><p>${h.ruExamples.map(code).join("<br>")}</p></div></div>` : ""}
    <div class="pair"><div><div class="lab">EN · обоснование</div><p>${code(h.reason)}</p></div><div><div class="lab">RU · обоснование</div><p>${code(h.ruReason)}</p></div></div>
    <div class="lab">Что изменилось</div>
    <ul class="doubts">${h.changes.map((c) => `<li>${code(c)}</li>`).join("")}</ul>
    <p class="hint">Ниже — строки таблицы в прежнем виде. Каждую проверку вместе с её ценой покажем и согласуем отдельно, по одной.</p>
  </section>

  <div class="grid">
    <div style="display:grid; gap:18px; min-width:0">
      <div class="thead" role="row" aria-label="Заголовок таблицы">${h.columns.map((c) => `<span role="columnheader"><b>${esc(c.en)}</b> · ${esc(c.ru)}</span>`).join("")}</div>
      ${t.tables.map((g) => `<section aria-label="${esc(g.heading)}" style="display:grid; gap:8px"><h2>${esc(g.heading)} · <span style="color:var(--muted)">${esc(g.ruHeading)}</span></h2><ol class="rows">${g.rows.map(row).join("\n")}</ol></section>`).join("\n      ")}
    </div>
    <aside aria-label="Узлы, которые проверяют строки">
      <h2>Проверяемые узлы</h2>
      ${used.map((s) => { const k = names[s]; const n = allRows.filter((r) => (r.rests ?? []).includes(s)).length; return `<button type="button" class="node" data-sid="${s}"><span class="at">${esc(k?.at ?? "")} · ${s}${k?.agreed ? " · согласован" : ""}</span><span>${esc(k?.title ?? s)}</span><span class="cnt">строк: ${n}</span></button>`; }).join("\n      ")}
    </aside>
  </div>

  <section class="note" aria-labelledby="doubts-h">
    <h2 id="doubts-h">Открытые вопросы</h2>
    <ul class="doubts">${t.doubts.map((d) => `<li>${code(d)}</li>`).join("")}</ul>
  </section>
</div>
<script>
  // Folding is kept per viewer; the page reads right without it.
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const folds = [...document.querySelectorAll("details.fold")];
  for (const d of folds) {
    if (store.get("fold:" + d.dataset.key) === "closed") d.open = false;
    d.addEventListener("toggle", () => store.set("fold:" + d.dataset.key, d.open ? "open" : "closed"));
  }
  document.getElementById("open-all").addEventListener("click", () => folds.forEach((d) => (d.open = true)));
  document.getElementById("close-all").addEventListener("click", () => folds.forEach((d) => (d.open = false)));

  // Filters by a row's fate.
  for (const b of document.querySelectorAll(".filter")) b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", String(on));
    document.querySelectorAll("li.row[data-fate='" + b.dataset.fate + "']").forEach((r) => (r.hidden = !on));
  });

  // Cross-lighting: a node lights the rows checking it, a row lights the nodes it checks.
  const clear = () => document.querySelectorAll(".lit, .sel").forEach((e) => e.classList.remove("lit", "sel"));
  const lightNode = (sid) => {
    clear();
    document.querySelectorAll(".node[data-sid='" + sid + "']").forEach((e) => e.classList.add("sel"));
    document.querySelectorAll("li.row").forEach((r) => { if (r.dataset.rests.split(" ").includes(sid)) r.classList.add("lit"); });
    document.querySelectorAll(".chip[data-sid='" + sid + "']").forEach((e) => e.classList.add("lit"));
  };
  for (const n of document.querySelectorAll(".node")) n.addEventListener("click", () => lightNode(n.dataset.sid));
  for (const c of document.querySelectorAll(".chip")) c.addEventListener("click", (e) => {
    e.stopPropagation();
    lightNode(c.dataset.sid);
    document.querySelector(".node[data-sid='" + c.dataset.sid + "']")?.scrollIntoView({ block: "nearest" });
  });
</script>
`;
fs.writeFileSync(new URL(out, here), html);
console.log("rows", allRows.length, "nodes", used.length, Object.entries(count).map(([k, v]) => `${k}:${v}`).join(" "));
