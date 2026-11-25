// Builds english-review.html, the page the owner reads the proposed English fixes on: every place where the English of
// the new form's drafts or of the table of checks reads as a calque or is unidiomatic, with the sentence as it stands,
// the sentence as proposed, and why, node by node. Nothing is applied: the owner takes or leaves each proposal.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const review = JSON.parse(fs.readFileSync(new URL("english-review.json", here), "utf8"));
const findings = review.findings;
const single = findings.filter((f) => !f.group);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
const kinds = { calque: "подстрочник", collocation: "сочетание слов", grammar: "грамматика", ambiguity: "двусмысленность" };
const order = (a, b) => a.num.localeCompare(b.num, "en", { numeric: true });
const groups = new Map();
for (const f of [...single].sort(order)) {
  if (!groups.has(f.num)) groups.set(f.num, []);
  groups.get(f.num).push(f);
}
const counts = {};
for (const f of findings) counts[f.kind] = (counts[f.kind] ?? 0) + 1;

const note = (f) => (f.note ? `<p class="note">${f.verdict === "drop" ? "Моё мнение: не ошибка, оставить. " : "Я поправил предложение рецензента. "}${code(f.note)}</p>` : "");
const groupCard = (g) => `<details class="card"><summary><b>${code(g.text)}</b> <span class="field">мест: ${g.count}</span></summary><ol>${findings.filter((f) => f.group === g.id).sort(order).map((f) => `<li class="f"><div class="meta"><span class="field">${esc(f.num)} · ${esc(f.field)}</span>${f.agreed ? '<span class="field">согласован</span>' : ""}</div><div class="pair"><div><p class="was">${code(f.was)}</p></div><div><p class="now">${code(f.proposed)}</p></div></div></li>`).join("")}</ol></details>`;
const item = (f) => `<li class="f${f.verdict === "drop" ? " dropped" : ""}">
      <div class="meta"><span class="kind k-${esc(f.kind)}">${esc(kinds[f.kind] ?? f.kind)}</span><span class="field">${esc(f.field)}</span></div>
      <div class="pair"><div><div class="lab">Сейчас</div><p class="was">${code(f.was)}</p></div><div><div class="lab">Предлагается</div><p class="now">${code(f.proposed)}</p></div></div>
      <p class="why">${code(f.why)}</p>${note(f)}
    </li>`;

const html = `<title>Английский: правки</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: a header with the counts, then one card per node holding its proposals, each the sentence as it stands
     beside the sentence proposed, and why. One dark look, as every page the owner reads. */
  :root {
    --bg: #0f171c; --panel: #17232b; --panel-2: #1d2b35; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --was: #e07a6a; --now: #5fbf86; --accent: #e8b75a;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  body { background: var(--bg); color: var(--fg); font-family: var(--body); font-size: 15px; line-height: 1.45; }
  .wrap { max-width: 1120px; margin: 0 auto; padding-block: 18px 48px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: grid; gap: 16px; }
  h1 { font-family: var(--display); font-size: 1.45rem; margin: 0; text-wrap: balance; }
  h2 { font-family: var(--display); font-size: 1.05rem; margin: 0; }
  p { margin: 0; }
  .muted { color: var(--muted); max-width: 80ch; }
  .card { background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: 12px 14px; display: grid; gap: 10px; min-width: 0; }
  .card .num { font-family: var(--mono); color: var(--muted); font-size: 0.85rem; }
  ol { margin: 0; padding-left: 20px; display: grid; gap: 12px; }
  .meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
  .kind, .field { font-family: var(--mono); font-size: 0.75rem; padding: 1px 6px; border-radius: 3px; border: 1px solid var(--rule); }
  .k-calque { color: var(--was); border-color: var(--was); }
  .k-collocation { color: var(--accent); border-color: var(--accent); }
  .field { color: var(--muted); }
  .pair { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
  .pair > div { min-width: 0; }
  .lab { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .was { border-left: 3px solid var(--was); padding-left: 8px; }
  .now { border-left: 3px solid var(--now); padding-left: 8px; }
  .why { color: var(--muted); font-size: 0.92rem; }
  code { font-family: var(--mono); font-size: 0.86em; }
  .note { font-size: 0.9rem; color: var(--accent); }
  .dropped .now { text-decoration: line-through; opacity: 0.6; }
  details.card > summary { cursor: pointer; display: flex; gap: 8px; flex-wrap: wrap; align-items: baseline; }
</style>
<div class="wrap">
  <header style="display:grid; gap:8px">
    <h1>Английский: подстрочники и неидиоматичные места</h1>
    <p class="muted">Предложения по английскому текстам черновиков новой формы и таблицы проверок 10.1. <b>Применены 12 ноября по вашему решению все, кроме зачёркнутых</b>; статусы узлов не менялись, русский не менялся. Затем по всей спецификации выровнены «the contracts section» и «on a commit / on a push».</p>
    <p class="muted">Всего: ${findings.length}; из них в повторяющихся группах ${findings.length - single.length}, остальные ${single.length} в ${groups.size} узлах — ${Object.entries(counts).map(([k, n]) => `${esc(kinds[k] ?? k)} ${n}`).join(", ")}.</p>
  </header>
  <h2 style="margin-top:8px">Решения на всю спецификацию — повторяющиеся места</h2>
  <p class="muted">Каждая группа решается один раз: принять для всех её мест или нет. Раскройте группу, чтобы увидеть места.</p>
  ${review.meta.groups.filter((g) => g.count).map(groupCard).join("\n  ")}
  <h2 style="margin-top:8px">Остальные места — по узлам</h2>
  ${[...groups].map(([num, fs]) => `<section class="card" aria-label="${esc(num)}"><h2><span class="num">${esc(num)}</span> ${esc(fs[0].title ?? "")}${fs[0].agreed ? ' <span class="field">согласован</span>' : ""}</h2><ol>${fs.map(item).join("")}</ol></section>`).join("\n  ")}
</div>
`;
fs.writeFileSync(new URL("english-review.html", here), html);
console.log("findings", findings.length, "nodes", groups.size);
