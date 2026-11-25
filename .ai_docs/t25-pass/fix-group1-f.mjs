// T25, stage 2, group 1, round f: applies the fixes that the confirming review (review-g1e.md) and the final assessment
// (review-g1f-a.md, review-g1f-b.md, review-g1f-c.md) mark as the author's, in the reports' own words. Copies
// tools-drafts.json to tools-drafts.before-group1-f.json first. Run again, it rebuilds the keys of this group from that
// copy, keeps each key's `assessment`, and leaves every other key as tools-drafts.json holds it. It checks every draft
// before it writes, then writes english-group1.md and english-group1-changed-f.md (each sentence this round changed).
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group1-f.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-24";

const DRAFTS = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w",
  "s-qvgzubkrafadqgf", "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf"];
const PROPOSALS = Object.keys(before).filter((k) => k.startsWith("proposal:"));
const GROUP = [...DRAFTS, ...PROPOSALS];
for (const k of GROUP) { const a = drafts[k]?.assessment; drafts[k] = structuredClone(before[k]); if (a) drafts[k].assessment = a; }

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const R = (type, to) => ({ type, to });
const E = (key) => { if (!drafts[key]) throw new Error(`no draft ${key}`); return drafts[key]; };
const at = (key, prefix) => {
  const i = E(key).proposal.parts.findIndex((p) => p.en.startsWith(prefix));
  if (i < 0) throw new Error(`${key}: no part opening with "${prefix}"`);
  return i;
};
const part = (key, prefix) => E(key).proposal.parts[at(key, prefix)];
const swap = (s, from, to) => { if (!s.includes(from)) throw new Error(`not found: "${from.slice(0, 80)}"`); return s.replace(from, to); };
const fields = (key, where) => {
  const p = E(key).proposal;
  if (where === "reason") return [p, "reason", p, "ruReason"];
  const x = part(key, where);
  return [x, "en", x, "ru"];
};
const sw = (key, where, enFrom, enTo, ruFrom, ruTo) => {
  const [a, ka, b, kb] = fields(key, where);
  if (enFrom !== null) a[ka] = swap(a[ka], enFrom, enTo);
  if (ruFrom) b[kb] = swap(b[kb], ruFrom, ruTo);
};
const note = (key, prefix, more) => { const x = part(key, prefix); x.change = `${x.change} ${more}`; };
const addRefs = (key, ...list) => { E(key).proposal.refs.push(...list); };
const stage3 = (key, more) => { E(key).stage3 = `${E(key).stage3} ${more}`; };
const reviewed = (key, report) => { E(key).review = `${E(key).review ? E(key).review + "; " : ""}${DATE}, round f: ${report}; fix-group1-f.mjs applied the author's fixes`; };
const ENGLISH_ONLY = " Английский текст поправлен, смысл тот же (чтецы EngStickler).";

// ---------------------------------------------------------------------------------------------------------------
// review-g1e.md: the confirming review
// ---------------------------------------------------------------------------------------------------------------
{ // A, "A location that differs from the computed one": both DOUBTs
  const k = "s-stxmhq3hgfndvn6";
  sw(k, "`sheriff validate` refuses each node whose location", "whose location (§s-kag2m9tzdnduxdx) differs from the one computed for it", "whose location (§s-kag2m9tzdnduxdx) is missing or differs from the one computed for it",
    "расположение которого (§s-kag2m9tzdnduxdx) отличается от вычисленного для него", "расположение которого (§s-kag2m9tzdnduxdx) отсутствует или отличается от вычисленного для него");
  sw(k, "reason",
    "So a location that differs from the computed one was written by hand, or was left behind when the node was moved and `sheriff reindex` did not run afterwards.",
    "So a location that differs from the computed one was left behind by a change that no run of `sheriff reindex` has followed yet, such as an edit made without an agent.",
    "Поэтому расположение, которое отличается от вычисленного, написано вручную или осталось после переноса узла, за которым не последовал `sheriff reindex`.",
    "Поэтому расположение, которое отличается от вычисленного, осталось от изменения, после которого `sheriff reindex` ещё не запускался, например от правки без агента.");
  reviewed(k, "review-g1e.md (both DOUBTs)");
}
{ // K, rule 6.1
  const k = "proposal:s-sn6au3vcr9uy5pm";
  sw(k, "`refines` —",
    "A node extends another when it adds a requirement on a question that the other leaves open within its own subject, such as a value that the other leaves to each project.",
    "A node extends another when it adds a requirement on something that the other leaves open within its own subject, such as a value that the other leaves to each project.",
    "Узел расширяет другой, если добавляет требование по вопросу, который другой оставляет открытым в своём предмете, например по значению, которое тот оставляет каждому проекту.",
    "Узел расширяет другой, если добавляет требование к тому, что другой оставляет открытым в своём предмете, например к значению, которое тот оставляет каждому проекту.");
  reviewed(k, "review-g1e.md");
}
{ // X, "What `sheriff reindex` writes"
  const k = "proposal:s-ztseyetus7np6br";
  sw(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm)", "including those in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);", "including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);");
  reviewed(k, "review-g1e.md");
}

// ---------------------------------------------------------------------------------------------------------------
// review-g1f-a.md
// ---------------------------------------------------------------------------------------------------------------
{ // "Who an added approval names": the Russian of paragraph 2
  const k = "new:tools-7-1-approval-by";
  sw(k, "`sheriff validate` refuses any other approval", null, null,
    "Если узел находится в файлах, которые хранит репозиторий, отказ называет также файл, расположение (§s-kag2m9tzdnduxdx) и ответственных за узел.",
    "Если узел находится в файлах, которые хранит репозиторий, отказ называет также файл узла, его расположение (§s-kag2m9tzdnduxdx) и ответственных за него.");
  reviewed(k, "review-g1f-a.md");
}
{ // T, "Link types reserved for terms": stage 3
  const k = "s-pvnnr844f3y964m";
  stage3(k, "validate.ts:149 is to skip a link whose target is no node of the model, which only s-c4rn9fj4czk768b refuses.");
  reviewed(k, "review-g1f-a.md");
}
for (const k of ["s-agc6fb3vx46pc23", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-e2vdhfsndy5stq9"]) reviewed(k, "review-g1f-a.md");

// ---------------------------------------------------------------------------------------------------------------
// review-g1f-b.md
// ---------------------------------------------------------------------------------------------------------------
{ // "A section with a rule in it"
  const k = "s-zhen42p6mnaxu7w";
  const x = part(k, "a term or a node of a project's own kind");
  x.en = "a term (§s-khqsmy6mhejkrhg) or a node of a project's own kind (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);";
  x.ru = "термин (§s-khqsmy6mhejkrhg) или узел собственного типа в проекте (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);";
  x.change = `${x.change} Добавлены ссылки на правила о том, что такое термин (3.3) и собственный тип узла (8.3), как требует правило 7.2.7 (рецензент).`;
  addRefs(k, R("cites", "s-khqsmy6mhejkrhg"), R("cites", "s-vsh384ybt4w25a2"));
  reviewed(k, "review-g1f-b.md");
}
{ // "`exempts` links": the new opening
  const k = "s-qvgzubkrafadqgf";
  const parts = E(k).proposal.parts;
  const [p0, p4] = [parts[0], parts[4]];
  if (p4.kind !== "p" || !p4.en.startsWith("`sheriff validate` refuses any other `exempts` link")) throw new Error(`${k}: unexpected paragraph 2`);
  E(k).proposal.parts = [
    { kind: "p", en: "`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where the link is allowed. It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only an `exempts` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).",
      ru: "`sheriff validate` принимает связь `exempts` (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h), только если она допустима. Любую другую связь `exempts` он отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи. Он проверяет только связь `exempts`, цель которой — узел модели спецификации (§s-w6gybeqn2ttydqx).",
      change: `${p0.change} ${p4.change} Абзац переписан (рецензент): «любая другая связь `+"`exempts`"+`» теперь стоит в том же абзаце, что и условие, а связь к sid без узла отвергает только узел «The target of a link».` },
    { kind: "p", en: "An `exempts` link is allowed where all of the following hold:", ru: "Связь `exempts` допустима, если выполнено всё следующее:", change: "Новое: вводит список условий (рецензент)." },
    ...parts.slice(1, 4),
  ];
  addRefs(k, R("cites", "s-w6gybeqn2ttydqx"));
  stage3(k, "validate.ts:253 is to leave a link whose target is no node of the model to the check of the link's target.");
  reviewed(k, "review-g1f-b.md");
}
{ // "`consumes` links": the paragraphs joined
  const k = "new:tools-7-1-consumes";
  const parts = E(k).proposal.parts;
  if (parts.length !== 2) throw new Error(`${k}: expected two paragraphs`);
  E(k).proposal.parts = [{
    kind: "p",
    en: "Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u). `sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only a `consumes` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).",
    ru: "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает связь `consumes`, только если она идёт от заголовка домена к разделу в файлах другого домена (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). Файлы домена — это файлы в его папке `specs/<domain>/` (§s-zefk589ykh37b8u). Любую другую связь `consumes` `sheriff validate` отвергает, называя файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи. Он проверяет только связь `consumes`, цель которой — узел модели спецификации (§s-w6gybeqn2ttydqx).",
    change: `${parts[0].change} ${parts[1].change} Абзацы соединены, и добавлена фраза о том, что узел проверяет только связь, цель которой — узел модели: связь к sid без узла отвергает только узел «The target of a link» (рецензент).`,
  }];
  addRefs(k, R("cites", "s-w6gybeqn2ttydqx"));
  stage3(k, "validate.ts:259–260 is to leave a link whose target is no node of the model to the check of the link's target.");
  reviewed(k, "review-g1f-b.md");
}
for (const k of ["new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf"]) reviewed(k, "review-g1f-b.md");

// ---------------------------------------------------------------------------------------------------------------
// review-g1f-c.md
// ---------------------------------------------------------------------------------------------------------------
{ // L, rule 8.5
  const k = "proposal:s-kag2m9tzdnduxdx";
  const x = part(k, "the top-level node of a file");
  x.en = "the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;";
  x.ru = "первый узел на вершине файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5), расположение которого — имя части, а за ним имя файла;";
  x.change = swap(x.change, ENGLISH_ONLY, "") + " Добавлены «первый» и описание инструментов (рецензент). Имя части и имя файла получает только первый узел на вершине файла. Описание инструментов по правилу 2.1 не входит в guidelines, поэтому без него по 8.5 узел на вершине `tools.json` получил бы номер. Так 8.5 говорит то же, что узел «How a node's location is computed» и код (model.ts:85–89).";
  const y = part(k, "In each file of the guidelines");
  y.en = swap(y.en, "In each file of the guidelines or of the technical appendix, the nodes are numbered under the location of the file's top-level node.",
    "In each file of the guidelines, of the appendix of the tools or of the technical appendix, the nodes are numbered under the location of the file's first top-level node.");
  y.ru = swap(y.ru, "Каждый файл guidelines или технического приложения нумерует свои узлы под расположением своего верхнего узла.",
    "Каждый файл guidelines, описания инструментов или технического приложения нумерует свои узлы под расположением своего первого узла на вершине.");
  y.change = swap(y.change, ENGLISH_ONLY, "") + " В первой фразе добавлены описание инструментов и «первого», по той же причине, что во втором пункте списка (рецензент).";
  addRefs(k, R("cites", "s-a4rbry4hsu34hy8"));
  reviewed(k, "review-g1f-c.md");
}
{ // R8, row 10.1.8: the form of row 10.1.11
  const k = "proposal:row-10-1-8";
  const old = E(k).proposal.parts;
  if (old.length !== 1) throw new Error(`${k}: expected one part`);
  E(k).proposal.parts = [
    { kind: "p", en: "Every node of the specification is approved only while an approval of its current wording is in force. The check leaves out the following nodes:",
      ru: "Каждый узел спецификации одобрен, только пока в силе одобрение его нынешней формулировки. Проверка пропускает следующие узлы:",
      change: "Было: «Каждый узел спецификации вне SpecSheriff guidelines, которые использует проект, и вне выбранных им расширений, кроме раздела, одобрен, только пока в силе одобрение его нынешней формулировки». Добавлены «любые другие узлы, статус одобрения которых выводится из других узлов». Иначе строка требовала бы одобрения для одобренного заголовка домена, которого по вашему решению от 2026-11-06 никто не одобряет; правило расширения не может отменить строку основной таблицы (правило 1.7.2). Строка по-прежнему не называет ни одного расширения (правило 1.7.3). Она записана в форме строки 10.1.11, о которой вы приняли решение 2026-11-13: сначала требование, затем узлы, которые проверка пропускает. Добавлены ссылки на правила о выбранных расширениях и о статусе одобрения (рецензент)." },
    { kind: "li", en: "the nodes of the SpecSheriff guidelines that a project uses and of the extensions that the project has chosen (§s-9ttvcwpqkehm58g);",
      ru: "узлы SpecSheriff guidelines, которые использует проект, и узлы выбранных им расширений (§s-9ttvcwpqkehm58g);", change: "Пункт списка узлов, которые проверка пропускает; см. первый абзац строки." },
    { kind: "li", en: "sections and any other nodes whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes",
      ru: "разделы и любые другие узлы, статус одобрения (§s-tgrnpagrb58tya7) которых выводится из других узлов", change: "Пункт списка узлов, которые проверка пропускает; см. первый абзац строки." },
  ];
  addRefs(k, R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-tgrnpagrb58tya7"));
  reviewed(k, "review-g1f-c.md");
}
{ // C, row 10.1.17: the Russian of the addition, which the page quotes, and the question
  const k = "proposal:row-10-1-17";
  sw(k, "No sentence of the specification", null, null, "если их одно или два подряд.", "если их не больше двух подряд.");
  note(k, "No sentence of the specification", "Русский текст добавления — «если их не больше двух подряд», как в английском; смысл тот же, что у прежнего «если их одно или два подряд».");
  part(k, "No sentence of the specification").change = swap(part(k, "No sentence of the specification").change, "добавлено только «одно или два подряд».", "добавлено только «если их не больше двух подряд».");
  E(k).question = swap(E(k).question, "only one or two in a row", "only where there are no more than two of them in a row");
  reviewed(k, "review-g1f-c.md");
}
{ // A, rule 10.3
  const k = "proposal:s-83ev4wwesbwnhnp";
  sw(k, "change the code written for a rule", "while no test has that rule's SpecTag (§s-rah8b37kytb682y);", "while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);",
    "пока ни у одного теста нет SpecTag этого правила (§s-rah8b37kytb682y);", "пока ни у одного теста нет SpecTag этого правила (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);");
  part(k, "change the code written for a rule").change = "Как в согласованной формулировке; добавлена ссылка на правило 9.3, которое определяет SpecTag, как требует правило 7.2.7 (рецензент).";
  addRefs(k, R("cites", "s-8xw4mgvpexyvw5q"));
  const x = part(k, "change the approvals");
  x.ru = "изменила бы одобрения, или записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) или её флаг `strict` (§s-q3pfzyaxvpr2zj2), или запись о выбранных проектом расширениях (§s-9ttvcwpqkehm58g), иначе чем через процедуры, которые их записывают или отзывают.";
  x.change = `${x.change} Русский текст тоже поправлен: «или» перед «записи», как в английском, смысл тот же (рецензент).`;
  reviewed(k, "review-g1f-c.md");
}
reviewed("proposal:domains-header-status", "review-g1f-c.md");

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
const targets = new Set();
const collect = (file) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c.node) walk(c.node);
  };
  JSON.parse(fs.readFileSync(file, "utf8")).nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(path.join(moved, "spec.json"));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(path.join(moved, "extensions", f));
collect(path.join(root, "specs/_guidelines/tools.json"));
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const englishOf = (e) => {
  const p = e.proposal;
  return [p.title || "", p.text, e.cost ? e.cost.en : "", p.reason || "", ...(p.examples || []).map((x) => x.en),
    ...(p.meta?.decisions || []).flatMap((d) => [d.problem, d.ruling])].join("\n");
};
const sentences = (s) => s.replace(/\n- /g, "\n").split(/(?<=[.;])\s+|\n/).map((x) => x.trim()).filter(Boolean);

for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title || "", p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join("\n");
  const ru = [p.ruTitle || "", p.ruText, p.ruReason || "", ...(p.examples || []).map((x) => x.ru)].join("\n");
  const decisions = JSON.stringify(p.meta?.decisions || []);
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    linked.set(r.to, r.type);
  }
  for (const s of [...cited, ...citedIn(decisions)]) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !(p.citedInDecisions || []).includes(to) && !citedIn(decisions).includes(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru, decisions]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
}
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

const md = [
  "# T25, group 1: the English of every node",
  "",
  "This file holds the final English of every node of group 1 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group1-f.mjs: the drafts of the appendix of the tools and the proposals for nodes outside it.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "A node in a cell of a table has no title of its own, so a row is headed by its location.",
  "fix-group1-f.mjs writes this file; edit the drafts, not this file.",
  "",
];
const changed = [
  "# T25, group 1: the sentences that round f changed",
  "",
  "This file holds each sentence of group 1 that fix-group1-f.mjs changed, as it now reads, under the key of its node in `tools-drafts.json`.",
  "A sentence is listed when the node's English held no identical sentence before round f. The whole English of each node is in `english-group1.md`.",
  "fix-group1-f.mjs writes this file; edit the drafts, not this file.",
  "",
];
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  const heading = `## ${key} — ${p.title ? p.title.replace(/`/g, "") : `a row of a table, ${e.location}`}`;
  md.push(heading, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (e.cost) md.push(`**On failure:** ${e.cost.en}`, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example ${i + 1}:** ${x.en}`, "");
  for (const [i, x] of (p.meta?.decisions || []).entries()) md.push(`**Decision ${i + 1}, ${x.date}:** ${x.problem} ${x.ruling}`, "");
  const old = new Set(sentences(englishOf(before[key])));
  const now = sentences(englishOf(e)).filter((s) => !old.has(s));
  if (now.length) changed.push(heading, "", ...now.map((s) => `- ${s}`), "");
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-group1.md", here), md.join("\n"));
fs.writeFileSync(new URL("english-group1-changed-f.md", here), changed.join("\n"));
console.log(`rewrote ${GROUP.length} keys, english-group1.md and english-group1-changed-f.md`);
