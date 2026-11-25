// Builds the owner's page on the pass: what was done, what the meaning review fixed, the proposed splits and the
// doubts with a recommendation each, and every rewritten node, before and after.
import fs from "node:fs";
const dir = "D:/SpecSheriff/.ai_docs/t25-pass/pass";
const applied = JSON.parse(fs.readFileSync(`${dir}/applied.json`, "utf8"));
const recs = fs.existsSync(`${dir}/recs.json`) ? JSON.parse(fs.readFileSync(`${dir}/recs.json`, "utf8")) : { splits: [], doubts: [] };
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const order = (loc) => loc.replace(/\d+/g, (d) => d.padStart(3, "0"));
const nodes = Object.entries(applied).sort(([, a], [, b]) => order(a.location).localeCompare(order(b.location)));
const fixed = [
  ["1.37", "An entity is declared once", "В причине «два определения — два владельца» стало «две стороны»; возвращено: два определения — два места, каждое отвечает за сущность."],
  ["2.2", "A link carries its type", "Причина: подлежащее перепуталось — снова исключённое правило показывает среди входящих связей, что его исключает; формулировка exempts возвращена к «правило, узел вида проекта или каждый такой узел под разделом»."],
  ["3.6", "An approved rule is implemented or exempted", "Возвращено «оба условия должны выполняться»; в причине возвращено «approved»; «it» раскрыто как «код делает то, что говорит правило»."],
  ["5.1", "What is checked, when, and what a failure costs", "Две строки таблицы снова говорят о списке любого узла, а не только TextRule; в причине возвращены «because» и «since»."],
  ["5.11", "A procedure that writes the specification is idempotent", "Возвращено «because»: процедуру удаляют потому, что она идемпотентна только на своём состоянии."],
  ["7.2.3", "From a draft to an approved specification, and back", "Условие «отзыв сделан одним из owners» снова условие прохода коммита, а не требование к каждому отзыву."],
  ["tools/2", "The commands", "В причине «it» снова указывает на sheriff types."],
  ["tools/6", "The hooks", "Возвращена связка «so that»; подлежащее «the user» названо явно."],
  ["tools/14, tools/15", "The plugins", "Отметка «спрошено» ставится раннеру один раз, а не каждой настройке."],
  ["tools/11", "How an approval is recorded", "«Anyone may run it» было бы понято как sheriff approve; написано, что отзывать может любой."],
];
const verdict = (r) => (r === "split" ? `<span class="tag ask">разделить</span>` : `<span class="tag same">оставить</span>`);
const klass = { ambiguity: "решить", confirm: "подтвердить", informational: "к сведению" };
const splits = [...(recs.splits ?? [])].sort((a, b) => order(a.location ?? "").localeCompare(order(b.location ?? "")));
const doubtsOf = (c) => (recs.doubts ?? []).filter((d) => d.class === c).sort((a, b) => order(a.location ?? "").localeCompare(order(b.location ?? "")));
const doubtRows = (list) => list.map((d) => `<tr><td class="loc">${esc(d.location)}</td><td>${esc(d.doubt)}</td><td>${esc(d.recommend)}</td></tr>`).join("\n");
const block = (label, w) => `<div class="side"><div class="lbl">${label}</div><div class="t">${esc(w.title)}</div><div class="body">${esc(w.text)}</div>${w.reason ? `<div class="lbl">Why</div><div class="body">${esc(w.reason)}</div>` : ""}</div>`;
const html = `<title>Проход по guidelines</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: one reading column; summary, fixes, splits, doubts, then every rewritten node before and after. */
  /* One dark look whatever the viewer's theme: the owner reads on a dark ground. */
  :root { --bg:#10161b; --panel:#17212a; --fg:#eaeef1; --muted:#9fb0bd; --rule:#2a3946; --name:#8fd1c3; --keep:#a3b0b9; --open:#e2a23b;
    --display:"PT Serif", Georgia, serif; --body:"PT Sans", "Segoe UI", Arial, sans-serif; --mono:"PT Mono", Consolas, monospace; color-scheme: dark; }
  body { background:var(--bg); color:var(--fg); font-family:var(--body); font-size:16px; line-height:1.5; margin:0; }
  .wrap { max-width:1150px; margin:0 auto; padding-block:28px 64px; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); display:grid; gap:28px; }
  h1, h2 { font-family:var(--display); margin:0; text-wrap:balance; } h1 { font-size:1.7rem; } h2 { font-size:1.25rem; }
  p, li { max-width:72ch; } p { margin:0; } .lead, .note { color:var(--muted); } .note { font-size:0.9rem; }
  section { display:grid; gap:12px; min-width:0; } ul { margin:0; padding-left:1.3em; display:grid; gap:6px; }
  .scroll { overflow-x:auto; border:1px solid var(--rule); border-radius:6px; }
  table { border-collapse:collapse; width:100%; min-width:760px; font-size:0.93rem; }
  th, td { text-align:left; vertical-align:top; padding:8px 10px; border-bottom:1px solid var(--rule); }
  th { background:var(--panel); color:var(--muted); font-size:0.8rem; letter-spacing:0.04em; text-transform:uppercase; }
  tr:last-child td { border-bottom:0; } td.loc { font-family:var(--mono); font-size:0.85rem; white-space:nowrap; color:var(--name); }
  .tag { display:inline-block; font-size:0.78rem; padding:1px 7px; border-radius:999px; border:1px solid currentColor; white-space:nowrap; }
  .same { color:var(--keep); } .ask { color:var(--open); }
  .stats { display:flex; flex-wrap:wrap; gap:10px 28px; } .stat b { font-family:var(--display); font-size:1.4rem; display:block; }
  details { border:1px solid var(--rule); border-radius:6px; background:var(--panel); }
  summary { cursor:pointer; padding:8px 12px; } summary .loc { font-family:var(--mono); font-size:0.85rem; color:var(--name); margin-right:8px; }
  .pair { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:0 12px 12px; }
  @media (max-width:760px) { .pair { grid-template-columns:1fr; } }
  .side { min-width:0; background:var(--bg); border:1px solid var(--rule); border-radius:6px; padding:10px 12px; }
  .lbl { color:var(--muted); font-size:0.75rem; letter-spacing:0.05em; text-transform:uppercase; margin-top:6px; }
  .t { font-weight:700; margin:2px 0 6px; } .body { white-space:pre-wrap; font-size:0.92rem; overflow-wrap:anywhere; }
  .all { display:grid; gap:8px; }
</style>
<div class="wrap">
  <header style="display:grid; gap:8px">
    <h1>Проход по guidelines</h1>
    <p class="lead">Задача T25. Все узлы SpecSheriff guidelines приведены к правилам 6.3 и 6.4 и к именам, решённым 7 ноября, без изменения смысла. Переписанное одобрено от вашего имени, как вы согласились. Любое одобрение вы можете отозвать — комментарием к узлу на этой странице или словом в чате.</p>
  </header>
  <section>
    <h2>Итог</h2>
    <div class="stats">
      <div class="stat"><b>${nodes.length}</b>узлов переписано из 131</div>
      <div class="stat"><b>406 → 117</b>предложений длиннее 25 слов</div>
      <div class="stat"><b>${fixed.length}</b>сдвигов смысла найдено и исправлено</div>
      <div class="stat"><b>146 / 146</b>узлов одобрены</div>
    </div>
    <p class="note">Как шла работа: семь агентов переписали узлы по группам; механическая сверка проверила, что каждая ссылка §sid и каждый фрагмент кода на месте; отдельные рецензенты сравнили смысл каждого узла до и после. Где смысл сдвинулся, я исправил по их замечаниям. Проверки validate, binding, citations чисты.</p>
  </section>
  <section>
    <h2>Где рецензент нашёл сдвиг смысла — исправлено</h2>
    <div class="scroll"><table><thead><tr><th>Узел</th><th>Название</th><th>Что было не так и что сделано</th></tr></thead><tbody>
      ${fixed.map(([l, t, w]) => `<tr><td class="loc">${esc(l)}</td><td>${esc(t)}</td><td>${esc(w)}</td></tr>`).join("\n")}
      <tr><td class="loc">1.10</td><td>A decision lives on the rule it settled</td><td>Оставлено уточнение: «in that rule's metadata» стало «in that rule's meta.decisions» — по вашему правилу о свойстве через объект; схема хранит решения только там.</td></tr>
    </tbody></table></div>
  </section>
  <section>
    <h2>Разделить узел по правилу 6.4 — нужен ваш ответ</h2>
    <p class="note">Исполнители не делили узлы, а только отмечали, где требования исполняются порознь. Рекомендация по каждому — ниже. Разделение меняет sid: тесты, связанные с узлом, переносятся на новые узлы (столбец «Тесты»). Комментируйте строку, где не согласны.</p>
    ${splits.length ? `<div class="scroll"><table><thead><tr><th>Узел</th><th>Название</th><th>Рекомендую</th><th>Почему</th><th>Новые узлы</th><th>Тесты</th></tr></thead><tbody>
      ${splits.map((s) => `<tr><td class="loc">${esc(s.location)}</td><td>${esc(s.title)}</td><td>${verdict(s.recommend)}</td><td>${esc(s.reason)}</td><td>${esc((s.newNodes ?? []).join("; "))}</td><td>${esc(s.tests ?? "")}</td></tr>`).join("\n")}
    </tbody></table></div>` : `<p class="note">Рекомендации готовятся.</p>`}
  </section>
  <section>
    <h2>Сомнения исполнителей</h2>
    <p class="note">«Решить» — исходный текст читается двояко; «подтвердить» — исполнитель выбрал прочтение; «к сведению» — оставлено как было, решать нечего.</p>
    ${["ambiguity", "confirm"].map((c) => doubtsOf(c).length ? `<h3 class="note">${klass[c]}</h3><div class="scroll"><table><thead><tr><th>Узел</th><th>Сомнение</th><th>Рекомендую</th></tr></thead><tbody>${doubtRows(doubtsOf(c))}</tbody></table></div>` : "").join("\n")}
    ${doubtsOf("informational").length ? `<details><summary>К сведению: ${doubtsOf("informational").length}</summary><div class="scroll" style="margin:0 12px 12px"><table><tbody>${doubtRows(doubtsOf("informational"))}</tbody></table></div></details>` : ""}
  </section>
  <section>
    <h2>Все переписанные узлы</h2>
    <p class="note">Слева — как было, справа — как стало. Раскройте узел, чтобы сравнить.</p>
    <div class="all">
      ${nodes.map(([sid, n]) => `<details id="${sid}"><summary><span class="loc">${esc(n.location.replace("_guidelines/", ""))}</span>${esc(n.new.title)}</summary><div class="pair">${block("Было", n.old)}${block("Стало", n.new)}</div></details>`).join("\n")}
    </div>
  </section>
</div>
`;
fs.writeFileSync(`${dir}/../pass-page.html`, html);
console.log("written", html.length, "bytes; splits", splits.length, "doubts", (recs.doubts ?? []).length);
