// The owner chose on 2026-11-18 («1») to add, in each rule that treats the nodes of the SpecSheriff guidelines as a
// special case, that the nodes of the extensions a project has chosen are treated the same way. This script writes the
// seven proposals, shown together on one page under the owner's rule on many proposals of the same kind:
// 1.3.7, 2.5, 5.2, 6.4, 9.2 and 9.7 in newform.json, and row 10.1.8 in table-10-1.json.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-476.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const CONF = "s-9ttvcwpqkehm58g"; // 1.7.5 Configuring extensions
const EXT = "s-mbmnsnxenmavu3z"; // 1.7.1 What an extension of the guidelines is
const USES = "s-bsya3febm6u64ab"; // 2.5
const build = (n, f, where, why) => ({
  where,
  en: [`Title: ${f.title ?? n.title}`, `Text: ${f.text ?? n.text}`, ...(n.examples ?? []).map((e) => `Example: ${e}`), `Reason: ${f.reason ?? n.reason}`].join("\n\n"),
  ru: [`Заголовок: ${f.ruTitle ?? n.ruTitle}`, `Текст: ${f.ruText ?? n.ruText}`, ...(n.ruExamples ?? []).map((e) => `Пример: ${e}`), `Обоснование: ${f.ruReason ?? n.ruReason}`].join("\n\n"),
  why,
});
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  return s.split(from).join(to);
};
const out = {};
const propose = (key, f, where, why) => {
  const n = d[key];
  if (n.proposals) throw new Error(key + " already holds a proposal");
  n.proposals = [build(n, f, where, why)];
  out[key] = { n, f, where, why };
};

propose("1.3.7", {
  text: swap(d["1.3.7"].text, `except the approval of a node of the SpecSheriff guidelines a project uses (§${USES}).`, `except the approval of a node of the SpecSheriff guidelines a project uses (§${USES}) or of an extension that the project has chosen (§${CONF}).`),
  ruText: swap(d["1.3.7"].ruText, `кроме одобрения узла SpecSheriff guidelines, которые использует проект (§${USES}).`, `кроме одобрения узла SpecSheriff guidelines, которые использует проект (§${USES}), или выбранного проектом расширения (§${CONF}).`),
  reason: swap(d["1.3.7"].reason, `The SpecSheriff guidelines are approved where they are written (§${USES}), so not just anyone may withdraw their approval.`, `The SpecSheriff guidelines and their extensions are approved where they are written (§${USES}), so not just anyone may withdraw their approval.`),
  ruReason: swap(d["1.3.7"].ruReason, `SpecSheriff guidelines одобрены там, где написаны (§${USES}), поэтому их одобрение не может отозвать кто угодно.`, `SpecSheriff guidelines и их расширения одобрены там, где написаны (§${USES}), поэтому их одобрение не может отозвать кто угодно.`),
}, "первая фраза текста и последняя фраза обоснования", "Узлы выбранного расширения одобрены там, где написаны, как и узлы SpecSheriff guidelines, поэтому в проекте их одобрение не отзывают.");

propose("2.5", {
  title: "How a project uses the SpecSheriff guidelines and their extensions",
  ruTitle: "Как проект использует SpecSheriff guidelines и их расширения",
  text: `A project uses the SpecSheriff guidelines and the extensions of the guidelines it has chosen (§${CONF}) as the SpecSheriff plugin holds them, and makes no copy of them, unless the project is SpecSheriff itself, where they are written.`,
  ruText: `Проект использует SpecSheriff guidelines и выбранные им расширения guidelines (§${CONF}), находящиеся в плагине SpecSheriff, и не создаёт их копий, кроме самого SpecSheriff, в котором они написаны.`,
  reason: swap(d["2.5"].reason, "Because they come in full with the plugin, the SpecSheriff guidelines read the same in every project on the same release.", "Because they come in full with the plugin, the SpecSheriff guidelines and their extensions read the same in every project on the same release."),
  ruReason: swap(d["2.5"].ruReason, "Поскольку SpecSheriff guidelines приходят целиком вместе с плагином, они читаются одинаково в каждом проекте, работающем на одном релизе.", "Поскольку SpecSheriff guidelines и их расширения приходят целиком вместе с плагином, они читаются одинаково в каждом проекте, работающем на одном релизе."),
}, "заголовок, текст и первая фраза обоснования", "Выбранные расширения приходят с плагином так же, как SpecSheriff guidelines, и их копия в проекте была бы второй версией.");

propose("5.2", {
  text: swap(d["5.2"].text, "A project neither changes a definition in the schema of the SpecSheriff guidelines nor contradicts that schema.", `A project neither changes a definition in the schema of the SpecSheriff guidelines or of an extension that the project has chosen (§${CONF}), nor contradicts those schemas.`),
  ruText: swap(d["5.2"].ruText, "Проект не меняет определений, которые содержит схема SpecSheriff guidelines, и не может ей противоречить.", `Проект не меняет определений, которые содержит схема SpecSheriff guidelines или выбранного проектом расширения (§${CONF}), и не может этим схемам противоречить.`),
  reason: swap(d["5.2"].reason, "An extension of the schema that changes no definition in the schema of the SpecSheriff guidelines keeps every structure they define the same in every project.", "An extension of the schema that changes no definition in the schema of the SpecSheriff guidelines or of a chosen extension keeps every structure they define the same in every project."),
  ruReason: swap(d["5.2"].ruReason, "Расширение схемы, которое не меняет ни одного определения схемы SpecSheriff guidelines, оставляет каждую структуру, которую они задают, одинаковой во всех проектах.", "Расширение схемы, которое не меняет ни одного определения схемы SpecSheriff guidelines или выбранного расширения, оставляет каждую структуру, которую они задают, одинаковой во всех проектах."),
}, "второй абзац текста и вторая фраза обоснования", "Схема выбранного расширения входит в схему спецификации (5.1), и проект не должен её менять так же, как схему SpecSheriff guidelines.");

propose("6.4", {
  text: swap(d["6.4"].text, "A node of the SpecSheriff guidelines holds only the links pointing at it from the SpecSheriff guidelines.", `A node of the SpecSheriff guidelines holds only the links pointing at it from the SpecSheriff guidelines. A node of an extension that the project has chosen (§${CONF}) holds only the links pointing at it from that extension.`),
  ruText: swap(d["6.4"].ruText, "Узел SpecSheriff guidelines содержит только те связи, которые указывают на него из SpecSheriff guidelines.", `Узел SpecSheriff guidelines содержит только те связи, которые указывают на него из SpecSheriff guidelines. Узел выбранного проектом расширения (§${CONF}) содержит только те связи, которые указывают на него из этого расширения.`),
  reason: swap(d["6.4"].reason, "The SpecSheriff guidelines read the same in every project on the same release (§s-bsya3febm6u64ab).", "The SpecSheriff guidelines and their extensions read the same in every project on the same release (§s-bsya3febm6u64ab)."),
  ruReason: swap(d["6.4"].ruReason, "SpecSheriff guidelines читаются одинаково в каждом проекте, работающем на одном релизе (§s-bsya3febm6u64ab).", "SpecSheriff guidelines и их расширения читаются одинаково в каждом проекте, работающем на одном релизе (§s-bsya3febm6u64ab)."),
}, "последний абзац текста и последний абзац обоснования", "Связи от узлов проекта не записываются в узлы выбранного расширения, как не записываются в узлы SpecSheriff guidelines. Из SpecSheriff guidelines и из других расширений на узел расширения связей нет (1.7.3, 1.7.4), поэтому остаются только связи из самого расширения.");

propose("9.2", {
  text: swap(d["9.2"].text, "- the rules of the SpecSheriff guidelines;", `- the rules of the SpecSheriff guidelines and of the extensions that the project has chosen (§${CONF});`),
  ruText: swap(d["9.2"].ruText, "- правила SpecSheriff guidelines;", `- правила SpecSheriff guidelines и выбранных проектом расширений (§${CONF});`),
}, "первый пункт последнего списка", "Правила выбранного расширения выполняют инструменты SpecSheriff (1.7.1), а не код системы проекта, как и правила SpecSheriff guidelines.");

propose("9.7", {
  text: swap(d["9.7"].text, "In a node of the SpecSheriff guidelines, the SpecSheriff tools list only", `In a node of the SpecSheriff guidelines or of an extension of the guidelines (§${EXT}), the SpecSheriff tools list only`),
  ruText: swap(d["9.7"].ruText, "В узле SpecSheriff guidelines инструменты SpecSheriff перечисляют только", `В узле SpecSheriff guidelines или расширения guidelines (§${EXT}) инструменты SpecSheriff перечисляют только`),
}, "второй абзац текста", "Здесь сказано «расширения guidelines», а не «выбранного проектом расширения»: каждое расширение пишется там же, где SpecSheriff guidelines, и его код и тесты лежат в том же репозитории, выбрал его проект или нет.");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

const tfile = new URL("table-10-1.json", here);
fs.copyFileSync(tfile, new URL("table-10-1.before-143.json", here));
const t = JSON.parse(fs.readFileSync(tfile, "utf8"));
const r8 = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.8");
if (r8.proposals) throw new Error("row 10.1.8 already holds a proposal");
const en8 = swap(r8.en, "outside the SpecSheriff guidelines that a project uses, except a section,", "outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen, except a section,");
const ru8 = swap(r8.ru, "вне SpecSheriff guidelines, которые использует проект, кроме раздела,", "вне SpecSheriff guidelines, которые использует проект, и вне выбранных им расширений, кроме раздела,");
r8.proposals = [{
  en: `${en8}\n\nOn failure: refused`,
  ru: `${ru8}\n\nПри нарушении: отклоняется`,
  why: "Узлы выбранного расширения одобрены там, где написаны, и в проекте у них нет одобрений, как и у узлов SpecSheriff guidelines.",
}];
fs.writeFileSync(tfile, JSON.stringify(t, null, 2) + "\n");

// The page that shows the seven proposals side by side.
const rows = [];
const paragraphOf = (text, needle) => text.split("\n\n").find((p) => p.includes(needle)) ?? text;
const cells = [
  ["1.3.7", d["1.3.7"], "кроме одобрения узла SpecSheriff guidelines"],
  ["2.5", d["2.5"], "Проект использует SpecSheriff guidelines"],
  ["5.2", d["5.2"], "Проект не меняет определений"],
  ["6.4", d["6.4"], "Узел SpecSheriff guidelines содержит только"],
  ["9.2", d["9.2"], "Требование быть реализованным"],
  ["9.7", d["9.7"], "В узле SpecSheriff guidelines"],
];
for (const [key, n, needle] of cells) {
  const p = out[key];
  const ruNew = p.f.ruText ?? n.ruText;
  rows.push({ key, title: n.ruTitle + (p.f.ruTitle ? ` → ${p.f.ruTitle}` : ""), was: paragraphOf(n.ruText, needle), now: paragraphOf(ruNew, needle.replace("Проект использует SpecSheriff guidelines", "Проект использует SpecSheriff guidelines")), reasonWas: p.f.ruReason ? n.ruReason : "", reasonNow: p.f.ruReason ?? "", why: p.why, full: ruNew });
}
rows.push({ key: "строка 10.1.8", title: "Таблица проверок", was: r8.ru, now: ru8, reasonWas: "", reasonNow: "", why: r8.proposals[0].why, full: ru8 });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
const html = `<title>Узлы выбранных расширений</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Serif:wght@700&family=PT+Mono&display=swap">
<style>
  /* Layout: one table, a row per rule, the current wording beside the proposed one. One dark look for the owner. */
  :root { --bg:#0f171c; --panel:#17232b; --panel-2:#1d2c36; --fg:#eef1f3; --muted:#a3b0b9; --rule:#2c3a44; --was:#c98a8a; --now:#5fbf86; --display:"PT Serif",Georgia,serif; --body:"PT Sans","Segoe UI",Arial,sans-serif; --mono:"PT Mono",Consolas,monospace; color-scheme:dark; }
  body { background:var(--bg); color:var(--fg); font-family:var(--body); font-size:15px; line-height:1.45; padding-block:20px 40px; padding-left:max(16px, env(safe-area-inset-left, 0px)); padding-right:max(16px, env(safe-area-inset-right, 0px)); }
  main { max-width:1280px; margin:0 auto; display:grid; gap:16px; }
  h1 { font-family:var(--display); font-size:1.4rem; margin:0; text-wrap:balance; }
  .lede { color:var(--muted); margin:0; max-width:80ch; }
  .wrap { overflow-x:auto; }
  table { border-collapse:collapse; width:100%; min-width:900px; }
  th, td { border:1px solid var(--rule); padding:8px 10px; vertical-align:top; text-align:left; }
  th { background:var(--panel); font-size:0.85rem; color:var(--muted); letter-spacing:0.03em; }
  td.key { font-family:var(--mono); white-space:nowrap; }
  td.was { color:var(--was); }
  td.now { color:var(--now); }
  td .r { margin-top:6px; color:var(--muted); font-size:0.9rem; }
  details { margin-top:6px; color:var(--muted); font-size:0.9rem; }
  summary { cursor:pointer; }
</style>
<main>
  <h1>Узлы выбранных расширений — как узлы SpecSheriff guidelines</h1>
  <p class="lede">Ваше решение от 18 ноября: в каждое правило, которое выделяет узлы SpecSheriff guidelines, добавить узлы выбранных проектом расширений. Ниже — семь правок: слева нынешняя формулировка изменённого абзаца, справа предложенная. Под каждой правкой можно раскрыть весь текст узла в новой формулировке.</p>
  <div class="wrap"><table>
    <thead><tr><th>Узел</th><th>Сейчас</th><th>Предлагается</th><th>Почему</th></tr></thead>
    <tbody>
${rows.map((r) => `      <tr><td class="key">${esc(r.key)}<div class="r">${esc(r.title)}</div></td><td class="was">${esc(r.was)}${r.reasonWas ? `<div class="r">Обоснование: ${esc(r.reasonWas)}</div>` : ""}</td><td class="now">${esc(r.now)}${r.reasonNow ? `<div class="r">Обоснование: ${esc(r.reasonNow)}</div>` : ""}<details><summary>Весь текст узла</summary>${esc(r.full)}</details></td><td>${esc(r.why)}</td></tr>`).join("\n")}
    </tbody>
  </table></div>
</main>
`;
fs.writeFileSync(new URL("chosen-extensions-proposals.html", here), html);
console.log("ok");
