// Builds extensions-design.html, the drawing of the extensions of the guidelines: how they depend on the base
// rules, how their rules reach an agent, and which nodes go where. The titles are read off the drafts and the
// specification, so that the page shows each node under its full title.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const read = p => fs.readFileSync(new URL(p, here), "utf8");
const d = JSON.parse(read("newform.json"));
const spec = JSON.parse(read("../../specs/_guidelines/spec.json"));
const tools = JSON.parse(read("../../specs/_guidelines/tools.json"));

const present = {};
(function walk(ns) { for (const n of ns) { present[n.location.replace("_guidelines/spec/", "")] = n; if (n.children) walk(n.children); } })(spec.nodes);
const toolNodes = {};
(function walk(ns) { for (const n of ns) { toolNodes[n.location.replace("_guidelines/tools/", "")] = n; if (n.children) walk(n.children); } })(tools.nodes);

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const val = (v, f) => typeof v === "string" && v.startsWith("=") ? present[v.slice(1)][f] : v;
const draft = (k, note) => {
  const n = d[k];
  if (!n) throw new Error("no draft " + k);
  const ru = typeof n.ruTitle === "string" && !n.ruTitle.startsWith("=") ? n.ruTitle : "";
  return { num: k, title: val(n.title, "title"), ru, agreed: !!n.agreed, note };
};
const now = (p, note) => {
  if (!present[p]) throw new Error("no node " + p);
  return { num: "сейчас " + p, title: present[p].title, ru: "", agreed: false, note };
};
const tool = (p, note) => {
  if (!toolNodes[p]) throw new Error("no tools node " + p);
  return { num: "инстр. " + p, title: toolNodes[p].title, ru: "", agreed: false, note };
};

const division = [
  draft("2.1", "кроме фразы об одном домене, которая уходит"),
  draft("2.2", "часть о доменах"),
  draft("3.5"), draft("3.6"), now("2.3"),
];
const recordType = [
  draft("3.4", "делится на правила по одной мысли"),
  draft("8.1"), draft("11.3"),
  now("1.25"), now("1.26"), now("1.27"), now("1.28"), now("1.29"), now("1.30"), now("1.31"), now("1.32"), now("1.33"),
];
const levels = [draft("3.7")];
const toolsMoved = [tool("7.1.13"), tool("7.1.14", "проверки сейчас нет, это дефект"), tool("7.1.16"), tool("7.1.17"), tool("7.1.18"), tool("7.1.22"), tool("17"), tool("18"), tool("19"), tool("20")];

const reworded = [
  draft("1.1.2"), draft("1.1.5"), draft("1.1.6"), draft("1.3.1"), draft("1.3.2"), draft("1.3.3"),
  draft("2.5", "и «правила, общие для всех проектов»"), draft("2.6", "и «приходят целиком»"),
  draft("3.1", "соглашения об API домена уходят в расширение"), draft("3.2"),
  draft("4.1"), draft("5.4"), draft("5.5"), draft("9.1"), draft("9.2"), draft("10.2"), draft("10.4"), draft("10.5"), draft("10.8"), draft("12.1"), draft("12.12"),
  now("1.6"), now("1.9"), now("2.2", "связь consumes уходит, появляется связь изменения"), now("4.1"), now("5.10"),
];
const toolsReworded = ["1", "2", "6", "7.1.2", "7.1.3", "7.1.5", "7.1.6", "7.1.9", "7.1.10", "7.1.12", "7.2.8", "7.3.2", "7.3.3", "7.3.4", "11"].map(p => tool(p));

const merged = new Set(["1.37", "1.39", "1.41"]);
const placedDrafts = new Set([...division, ...recordType, ...levels, ...reworded].map(i => i.num));
const placedNow = new Set([...division, ...recordType, ...levels, ...reworded].filter(i => i.num.startsWith("сейчас")).map(i => i.num.replace("сейчас ", "")));
const fromDrafts = new Set();
for (const n of Object.values(d)) for (const m of String(n.from || "").match(/\d+\.\d+/g) || []) fromDrafts.add(m);
const untouchedDrafts = Object.keys(d).filter(k => !placedDrafts.has(k)).length;
const untouchedNow = Object.entries(present).filter(([p, n]) => n.kind !== "section" && !fromDrafts.has(p) && !placedNow.has(p) && !merged.has(p)).length;
const untouchedTools = Object.values(toolNodes).filter(n => n.kind !== "section").length - toolsMoved.length - toolsReworded.length;

const row = i => `<li><span class="num">${esc(i.num)}</span><span class="name"><span class="en">${esc(i.title)}</span>${i.ru ? `<span class="ru">${esc(i.ru)}</span>` : ""}${i.note ? `<span class="note">${esc(i.note)}</span>` : ""}</span>${i.agreed ? `<span class="chip">согласован</span>` : ""}</li>`;
const list = items => `<ul class="nodes">${items.map(row).join("")}</ul>`;
const agreedReworded = reworded.filter(i => i.agreed).length;

const page = `<title>Расширения guidelines</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: one reading column, two drawings at full width, the lists of nodes in folded groups under them. */
  /* One dark look, whatever the viewer's theme: the owner reads it on a dark ground. */
  :root {
    --bg: #0f171c; --panel: #17232b; --fg: #eef1f3; --muted: #a3b0b9; --rule: #2c3a44;
    --accent: #e2a23b; --keep: #5fbf86; --plan: #8fb0cf;
    --display: "PT Serif", Georgia, serif; --body: "PT Sans", "Segoe UI", Arial, sans-serif; --mono: "PT Mono", Consolas, monospace;
    color-scheme: dark;
  }
  body { background: var(--bg); color: var(--fg); font-family: var(--body); font-size: 16px; line-height: 1.5; }
  .page { max-width: 980px; margin-inline: auto; padding-block: 28px 56px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: grid; gap: 34px; }
  h1 { font-family: var(--display); font-size: 1.9rem; line-height: 1.2; margin: 0 0 6px; text-wrap: balance; }
  h2 { font-family: var(--display); font-size: 1.25rem; margin: 0 0 12px; text-wrap: balance; }
  h3 { font-size: 1rem; margin: 0; }
  p { margin: 0; max-width: 68ch; }
  .lead { color: var(--muted); }
  figure { margin: 0; display: grid; gap: 10px; }
  .scroll { overflow-x: auto; background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 8px; }
  svg { display: block; width: 100%; min-width: 760px; height: auto; color: var(--fg); }
  figcaption { color: var(--muted); max-width: 68ch; }
  .box { fill: var(--bg); stroke: var(--rule); stroke-width: 1.2; }
  .box.key { stroke: var(--accent); stroke-width: 1.6; }
  .box.dash { stroke-dasharray: 5 4; }
  .box.in { fill: var(--panel); }
  .t { fill: var(--fg); font: 400 13px var(--body); }
  .t.m { fill: var(--muted); }
  .t.h { font: 700 15px var(--body); }
  .t.code { font: 400 13px var(--mono); }
  .t.a { fill: var(--accent); }
  .ln { stroke: currentColor; stroke-width: 1.3; fill: none; }
  .ln.a { stroke: var(--accent); color: var(--accent); stroke-width: 1.7; }
  .ln.dash { stroke-dasharray: 5 4; }
  .settled { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; }
  .settled li { display: grid; grid-template-columns: 1.2em minmax(0, 1fr); gap: 6px; max-width: 72ch; }
  .settled li::before { content: "✓"; color: var(--keep); }
  .open li::before { content: "◐"; color: var(--accent); }
  .groups { display: grid; gap: 10px; }
  details { background: var(--panel); border: 1px solid var(--rule); border-radius: 6px; padding: 10px 14px; }
  summary { cursor: pointer; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; font-weight: 700; }
  summary .count { font: 400 0.85rem var(--mono); color: var(--muted); }
  .nodes { margin: 10px 0 2px; padding: 0; list-style: none; display: grid; gap: 8px; }
  .nodes li { display: grid; grid-template-columns: 7.2em minmax(0, 1fr) auto; gap: 4px 10px; align-items: baseline; }
  .num { font: 400 0.8rem var(--mono); color: var(--muted); font-variant-numeric: tabular-nums; }
  .name { display: grid; min-width: 0; }
  .ru { color: var(--muted); font-size: 0.92rem; }
  .note { color: var(--accent); font-size: 0.9rem; }
  .chip { font: 400 0.72rem var(--mono); color: var(--keep); border: 1px solid var(--keep); border-radius: 3px; padding: 0 5px; white-space: nowrap; }
  code { font-family: var(--mono); font-size: 0.92em; }
  @media (max-width: 560px) { .nodes li { grid-template-columns: minmax(0, 1fr); } }
</style>

<main class="page">
<header>
  <h1>Расширения guidelines</h1>
  <p class="lead">Рисунок того, о чём мы договорились сегодня. Ничего из этого ещё не перенесено и нигде не записано.</p>
</header>

<section>
  <h2>Что решено</h2>
  <ul class="settled">
    <li><span>Основные правила говорят только о том, как вести и реализовывать спецификацию. Как устроена система, решает проект.</span></li>
    <li><span>Текст и обоснование основного правила не упоминают расширения, в том числе домены. В метаданных основного правила инструмент сам строит входящие ссылки из расширений, поэтому правило знает, кто его использует.</span></li>
    <li><span>Контракты остаются в основных правилах: раздел спецификации, а при нескольких доменах отдельный документ. Термин определяется один раз, в контрактах.</span></li>
    <li><span>Домены, RecordType и уровни составляют одно расширение. RecordType служит обмену между доменами и получает свой подраздел.</span></li>
    <li><span>Расширение из плагина может менять основное правило через связь своего типа. Проект может только уточнять и расширять.</span></li>
    <li><span>Как это устроено в плагине, который подключает проект: загружая skill <code>spec</code>, агент запускает команду <code>sheriff guide</code>. Она печатает правила о доменах, если домены есть, и индекс расширений со skill для каждого.</span></li>
  </ul>
</section>

<section>
  <h2>Кто от кого зависит</h2>
  <figure>
    <div class="scroll">
    <svg viewBox="0 0 940 392" role="img" aria-label="Расширения и guidelines проекта ссылаются на основные правила, основные правила ни на что из них не ссылаются.">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
      </defs>
      <rect class="box key" x="40" y="16" width="420" height="112" rx="5"/>
      <text class="t h" x="60" y="44">Расширение «Домены»</text>
      <text class="t" x="60" y="68">деление на домены, заголовок и указатель домена</text>
      <text class="t" x="60" y="88">RecordType, отдельным подразделом</text>
      <text class="t m" x="60" y="110">уровни · правила инструментов · свой skill</text>

      <rect class="box dash" x="500" y="16" width="190" height="112" rx="5"/>
      <text class="t h" x="518" y="44">Другое расширение</text>
      <text class="t m" x="518" y="68">появится, когда</text>
      <text class="t m" x="518" y="88">понадобится</text>

      <rect class="box" x="720" y="16" width="200" height="112" rx="5"/>
      <text class="t h" x="738" y="44">Guidelines проекта</text>
      <text class="t m" x="738" y="68">пишет сам проект,</text>
      <text class="t m" x="738" y="88">за работу инструментов</text>
      <text class="t m" x="738" y="108">поручиться не может</text>

      <rect class="box" x="40" y="256" width="880" height="120" rx="5"/>
      <rect class="box in key" x="60" y="272" width="250" height="90" rx="4"/>
      <text class="t h" x="78" y="300">Контракты</text>
      <text class="t" x="78" y="324">общие термины,</text>
      <text class="t" x="78" y="344">раздел спецификации</text>
      <text class="t h" x="340" y="290">Основные правила guidelines</text>
      <text class="t" x="340" y="316">узлы · связи · одобрение · тесты · код · проверки</text>
      <text class="t m" x="340" y="340">техническое приложение · собственные виды узлов проекта</text>
      <text class="t m" x="340" y="362">текст расширений не называет, входящие ссылки строит инструмент</text>

      <path class="ln a" d="M120 128V268" marker-end="url(#ah)"/>
      <text class="t a" x="130" y="176">меняет правило</text>
      <text class="t a" x="130" y="194">связью своего типа:</text>
      <text class="t a" x="130" y="212">контракты становятся</text>
      <text class="t a" x="130" y="230">отдельным документом</text>

      <path class="ln" d="M400 128V252" marker-end="url(#ah)"/>
      <text class="t" x="410" y="194">добавляет правила</text>

      <path class="ln dash" d="M595 128V252" marker-end="url(#ah)"/>
      <text class="t m" x="605" y="194">добавляет или меняет</text>

      <path class="ln" d="M820 128V252" marker-end="url(#ah)"/>
      <text class="t" x="830" y="186">только уточняет</text>
      <text class="t" x="830" y="204">и расширяет</text>
    </svg>
    </div>
    <figcaption>Авторские ссылки идут только к основным правилам. Входящие ссылки в метаданных основного правила инструмент строит сам. Расширение может исчезнуть или быть черновиком, и текст основных правил от этого не изменится. Рядом с изменённым правилом инструмент покажет, какое расширение его изменило.</figcaption>
  </figure>
</section>

<section>
  <h2>Как правила доходят до агента</h2>
  <figure>
    <div class="scroll">
    <svg viewBox="0 0 940 400" role="img" aria-label="Команда sheriff guide смотрит, есть ли в спецификации домены, и печатает их правила только в этом случае; индекс расширений она печатает всегда.">
      <defs>
        <marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
      </defs>
      <rect class="box" x="10" y="130" width="140" height="64" rx="5"/>
      <text class="t" x="80" y="157" text-anchor="middle">Агент загружает</text>
      <text class="t code" x="80" y="178" text-anchor="middle">skill spec</text>

      <rect class="box key" x="235" y="130" width="140" height="64" rx="5"/>
      <text class="t code" x="305" y="157" text-anchor="middle">sheriff guide</text>
      <text class="t m" x="305" y="178" text-anchor="middle">это скрипт</text>

      <path class="box key" d="M430 162L510 112L590 162L510 212Z"/>
      <text class="t" x="510" y="158" text-anchor="middle">домены</text>
      <text class="t" x="510" y="177" text-anchor="middle">есть?</text>

      <rect class="box" x="640" y="40" width="290" height="76" rx="5"/>
      <text class="t" x="656" y="64">Основные правила</text>
      <text class="t a" x="656" y="84">+ правила расширения «Домены»</text>
      <text class="t" x="656" y="104">+ индекс расширений</text>

      <rect class="box" x="640" y="180" width="290" height="76" rx="5"/>
      <text class="t" x="656" y="212">Основные правила</text>
      <text class="t" x="656" y="236">+ индекс расширений</text>

      <rect class="box" x="640" y="310" width="290" height="76" rx="5"/>
      <text class="t h" x="656" y="338">Skill расширения «Домены»</text>
      <text class="t m" x="656" y="362">печатает его правила, даёт процедуру</text>

      <path class="ln" d="M150 162H233" marker-end="url(#ah2)"/>
      <text class="t m" x="192" y="152" text-anchor="middle">запускает</text>
      <path class="ln" d="M375 162H428" marker-end="url(#ah2)"/>
      <text class="t m" x="402" y="152" text-anchor="middle">читает</text>
      <path class="ln a" d="M510 112V78H638" marker-end="url(#ah2)"/>
      <text class="t a" x="524" y="70">да</text>
      <path class="ln" d="M590 162H612V218H638" marker-end="url(#ah2)"/>
      <text class="t" x="618" y="192">нет</text>
      <path class="ln dash" d="M785 256V308" marker-end="url(#ah2)"/>
      <text class="t m" x="775" y="288" text-anchor="end">проект решил ввести домены</text>
      <path class="ln dash" d="M640 348H305V196" marker-end="url(#ah2)"/>
      <text class="t m" x="318" y="340">следующий запуск напечатает их правила</text>
    </svg>
    </div>
    <figcaption>Скрипт решает то, что можно проверить: есть ли домены. Индекс закрывает то, чего скрипт не видит: проект без доменов, который хочет их ввести. Сейчас <code>sheriff guide</code> печатает 283 КБ, и около трети guidelines посвящено доменам и RecordType. Сам skill правил не содержит.</figcaption>
  </figure>
</section>

<section>
  <h2>Что куда уходит</h2>
  <div class="groups">
    <details open>
      <summary>Расширение «Домены»: деление на домены<span class="count">${division.length}</span></summary>
      ${list(division)}
    </details>
    <details open>
      <summary>Расширение «Домены»: RecordType<span class="count">${recordType.length}</span></summary>
      ${list(recordType)}
    </details>
    <details open>
      <summary>Расширение «Домены»: уровни<span class="count">${levels.length}</span></summary>
      ${list(levels)}
    </details>
    <details>
      <summary>Расширение «Домены»: описание инструментов<span class="count">${toolsMoved.length}</span></summary>
      ${list(toolsMoved)}
    </details>
    <details open>
      <summary>Остаются в основных правилах, но перестают называть домены или RecordType<span class="count">${reworded.length}, из них согласованных ${agreedReworded}</span></summary>
      ${list(reworded)}
    </details>
    <details>
      <summary>Описание инструментов: остаются, но меняются<span class="count">${toolsReworded.length}</span></summary>
      ${list(toolsReworded)}
    </details>
  </div>
  <p class="lead" style="margin-top:12px">Без изменений остаются ещё ${untouchedDrafts + untouchedNow} узлов базы и ${untouchedTools} узлов описания инструментов. Распределение моё, по принятой границе, его можно поправить комментарием.</p>
</section>

<section>
  <h2>Что меняется в инструментах SpecSheriff</h2>
  <ul class="settled open">
    <li><span><code>sheriff guide</code> печатает основные правила, правила используемых расширений и индекс.</span></li>
    <li><span>Новый тип связи для изменения правила. В собственных guidelines проекта инструмент её отклоняет.</span></li>
    <li><span>Виды узлов и связи доменов становятся частью расширения, а не основной схемы.</span></li>
    <li><span>Контракты могут быть разделом внутри файла. Сейчас термин вне папки контрактов отклоняется.</span></li>
    <li><span>Спецификация без доменов получает своё место в файлах. Сейчас доменом считается любая папка.</span></li>
    <li><span>Появляется проверка RecordType другого домена по разделам из <code>consumes</code>. Её обещает одобренное правило, но кода нет.</span></li>
    <li><span>Skill расширения «Домены». Программа <code>sheriff</code> одна, проверки доменов срабатывают только там, где домены есть.</span></li>
  </ul>
</section>

<section>
  <h2>Что ещё предстоит</h2>
  <ul class="settled open">
    <li><span>Узел, определяющий расширение, и название нового типа связи: черновик, рецензент, показ вам.</span></li>
    <li><span>Фраза о границе в принципах метода, без названий конкретных расширений.</span></li>
    <li><span>Обоснование RecordType по вашему тексту, слово «контракт» в нём и то, что RecordType не весь API.</span></li>
    <li><span>План работ с оценкой: основные правила согласуем первыми, расширение после них.</span></li>
  </ul>
</section>
</main>
`;
fs.writeFileSync(new URL("extensions-design.html", here), page);
console.log("division", division.length, "recordType", recordType.length, "levels", levels.length, "toolsMoved", toolsMoved.length, "reworded", reworded.length, "agreed among them", agreedReworded, "toolsReworded", toolsReworded.length, "untouched base", untouchedDrafts + untouchedNow, "untouched tools", untouchedTools);
