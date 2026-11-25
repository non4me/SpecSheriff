// T25, stage 2, group 1, round d: applies the findings of the third review (review-g1c-a.md on the proposals,
// review-g1c-b.md on seven drafts), records the owner's ruling of 2026-11-11 in the proposal for rule 6.1, and writes
// english-group1.md, the English of every node of the group, for EngStickler's readers. Copies tools-drafts.json to
// tools-drafts.before-group1-d.json first. Run again, it rebuilds the keys of this group from that copy and leaves every
// other key as tools-drafts.json holds it. It checks every draft before it writes.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group1-d.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-23";

const DRAFTS = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w",
  "s-qvgzubkrafadqgf", "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf"];
const PROPOSALS = Object.keys(before).filter((k) => k.startsWith("proposal:"));
const GROUP = [...DRAFTS, ...PROPOSALS];
for (const k of GROUP) drafts[k] = structuredClone(before[k]);

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const E = (key) => {
  if (!drafts[key]) throw new Error(`no draft ${key}`);
  return drafts[key];
};
const at = (key, prefix) => {
  const i = E(key).proposal.parts.findIndex((p) => p.en.startsWith(prefix));
  if (i < 0) throw new Error(`${key}: no part opening with "${prefix}"`);
  return i;
};
const part = (key, prefix) => E(key).proposal.parts[at(key, prefix)];
const reword = (key, prefix, en, ru, more) => {
  const old = part(key, prefix);
  E(key).proposal.parts[at(key, prefix)] = { ...old, en, ru, change: more ? `${old.change} ${more}` : old.change };
};
// Replaces one exact passage of a string, and fails where the passage is missing.
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: "${from.slice(0, 70)}"`);
  return s.replace(from, to);
};
// Replaces one exact passage in the English and one in the Russian of a part.
const swapPart = (key, prefix, enFrom, enTo, ruFrom, ruTo, more) => {
  const p = part(key, prefix);
  reword(key, prefix, swap(p.en, enFrom, enTo), ruFrom ? swap(p.ru, ruFrom, ruTo) : p.ru, more);
};
// Joins a paragraph to the paragraph before it.
const joinToPrevious = (key, prefix, more) => {
  const parts = E(key).proposal.parts;
  const i = at(key, prefix);
  if (i === 0 || parts[i - 1].kind !== "p" || parts[i].kind !== "p") throw new Error(`${key}: cannot join "${prefix}"`);
  parts[i - 1] = { ...parts[i - 1], en: `${parts[i - 1].en} ${parts[i].en}`, ru: `${parts[i - 1].ru} ${parts[i].ru}`, change: more ? `${parts[i - 1].change} ${more}` : parts[i - 1].change };
  parts.splice(i, 1);
};
const reason = (key, en, ru, change) => Object.assign(E(key).proposal, { reason: en, ruReason: ru, ...(change ? { reasonChange: change } : {}) });
const setRef = (key, to, type) => {
  const r = E(key).proposal.refs.find((x) => x.to === to);
  if (!r) throw new Error(`${key}: no link to ${to}`);
  r.type = type;
};
const swapRef = (key, from, to) => {
  const r = E(key).proposal.refs.find((x) => x.to === from);
  if (!r) throw new Error(`${key}: no link to ${from}`);
  r.to = to;
};
const addRefs = (key, ...list) => { E(key).proposal.refs.push(...list); };
const examples = (key, list) => { E(key).proposal.examples = list; };
const reviewed = (key, report) => { E(key).review = `${E(key).review ? E(key).review + "; " : ""}specsheriff-rule-reviewer, ${DATE}, third review: ${report}; fix-group1-d.mjs applied its findings`; };

// ---------------------------------------------------------------------------------------------------------------
// review-g1c-a.md: the proposals
// ---------------------------------------------------------------------------------------------------------------
{ // rule 8.5
  const k = "proposal:s-kag2m9tzdnduxdx";
  swapPart(k, "a term (§s-ypa92gpcj3f5zj8)", "a term (§s-ypa92gpcj3f5zj8)", "a term (§s-khqsmy6mhejkrhg)", "термин (§s-ypa92gpcj3f5zj8)", "термин (§s-khqsmy6mhejkrhg)",
    "Ссылка ведёт на правило 3.3, которое говорит, что такое термин; правило 3.2 говорит только, где термин определяется (рецензент).");
  swapRef(k, "s-ypa92gpcj3f5zj8", "s-khqsmy6mhejkrhg");
  swapPart(k, "In each file of the guidelines",
    "The nodes under a node that a part opens with are numbered together with the other nodes at the top of the part.",
    "The nodes under a node whose location is the part's name alone are numbered together with the other nodes at the top of the part.",
    "Узлы под узлом, которым открывается часть, нумеруются вместе с остальными узлами на вершине части.",
    "Узлы под узлом, расположение которого — одно имя части, нумеруются вместе с остальными узлами на вершине части.",
    "Вторая фраза названа по расположению узла, а не по тому, что им открывается часть: иначе она захватывала бы и первый раздел `base` или `contracts`, который третий пункт списка не захватывает (рецензент).");
  reason(k,
    "A location is computed from where a node is, so it always shows a reader where to find the node.",
    "Расположение вычисляется из того, где находится узел, поэтому всегда показывает читателю, где узел найти.",
    "Было: «Расположение говорит читателю, где находится узел. Вычисляемое, оно никогда не расходится с тем, где узел находится». Согласованное обоснование не проходило проверку пар: первая фраза пересказывала первую фразу текста, а вторая — последний абзац. Новое обоснование — предложенное рецензентом. Почему узел, которым открывается часть, располагается по её имени, записано в предлагаемом решении.");
  reviewed(k, "review-g1c-a.md");
}
{ // rule 10.3
  const k = "proposal:s-83ev4wwesbwnhnp";
  swapPart(k, "leave a node approved",
    "unless the node is a section or another node whose approval status is derived from other nodes;",
    "unless the node is a section or any other node whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes;",
    "кроме раздела и другого узла, статус одобрения которого выводится из других узлов;",
    "кроме раздела и любого другого узла, статус одобрения (§s-tgrnpagrb58tya7) которого выводится из других узлов;",
    "«Любого другого узла», как в строке 10.1.8: «другого узла» читалось как один определённый узел. Статус одобрения, который здесь упомянут впервые, ссылается на правило 1.3.1 (рецензент).");
  addRefs(k, R("cites", "s-tgrnpagrb58tya7"));
  reason(k,
    "A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with its code. So only a check made before an edit can keep an agent from making a decision that only the owners make, or from writing code before its test.",
    "Проверка, которая выполняется позже, видит только результат: одобрения, которые она принимает как данность, и коммит, где тест лежит вместе со своим кодом. Поэтому только проверка до правки может не дать агенту принять решение, которое принимают только ответственные, или написать код раньше его теста.",
    "Было два абзаца: об агенте, который сам принимает решение ответственных, и о коммите, где тест лежит вместе с кодом, с фразой о командах оболочки. Согласованное обоснование не проходило проверку пар: его абзацы обосновывали пункты списка по отдельности и не по порядку. Новое обоснование — предложенное рецензентом. Почему команда оболочки не проверяется, записано в решении от 2026-11-13.");
  reviewed(k, "review-g1c-a.md");
}
{ // rule 6.1
  const k = "proposal:s-sn6au3vcr9uy5pm";
  const refines = part(k, "`refines` —");
  reword(k, "`refines` —",
    swap(refines.en, " Where the linking node states how the linked node is implemented, the link is of type `implements` instead.", ""),
    swap(refines.ru, " Если связывающий узел показывает, как выполняется связанный, связь имеет тип `implements`, а не `refines`.", ""));
  part(k, "`refines` —").change = "Было: «связывающий узел говорит о связанном точнее или для более узкого случая». Добавлено расширение, по вашему решению от 2026-11-11: одна связь `refines` выражает и уточнение, и расширение. Слово «расширяет» определено здесь же. Фраза «связывающий узел оставляет в силе каждое требование связанного» — новая для связи `refines` внутри одной части спецификации, например 4.1 → 1.1.4 или 9.5 → 1.5.2: для связей из одной части в другую её уже требуют правила 2.3, 1.7.2 и 4.2. Ни одна существующая связь `refines` её не нарушает. Фраза о том, что узел, который показывает, как выполняется другой, связан с ним связью `implements`, убрана (рецензент, вариант A): описание технического долга по правилу 4.4 может уточнять узел, о реализации которого говорит, а тип связи узлов каждой части уже задают определение `implements` выше и строки 10.1.22–10.1.24.";
  swapPart(k, "`term-relation` —", "the linking term and the linked term", "the linking term (§s-khqsmy6mhejkrhg) and the linked term",
    "связывающий термин и связанный термин", "связывающий термин (§s-khqsmy6mhejkrhg) и связанный термин");
  part(k, "`term-relation` —").change = "Как в согласованной формулировке; добавлена ссылка на правило о том, что такое термин, как требует правило 7.2.7 (рецензент).";
  addRefs(k, R("cites", "s-khqsmy6mhejkrhg"));
  reason(k,
    "A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.",
    "Связь без типа лишь фиксирует, что кто-то подумал о двух узлах вместе. Ни одна проверка не может её оценить. Ни одна диаграмма не может её нарисовать. Тип, названный без значения, — та же догадка на шаг дальше.",
    "Первый абзац — как в согласованной формулировке. Второй абзац убран (рецензент): он пересказывал последний абзац текста и не проходил проверку пар, а почему проект может добавить тип связи, записано в решении от 2026-11-17.");
  delete E(k).proposedDecisions;
  E(k).proposal.meta = {
    decisions: [{
      date: "2026-11-11",
      problem: "Rule 2.3 and the row of the main table of checks on the rules of a project's own guidelines say that such a rule refines or extends a rule, while this rule gave `refines` only the meaning of refining, and no type of link expressed extending.",
      ruling: "The owner chose one link, `refines`, for both refining and extending: \"the line between refining and extending is thin, and no check could tell them apart\". The meaning of `refines` in this rule is widened to cover extending.",
      type: "textual",
    }],
  };
  E(k).decisionSources = "t25-one-thought.md line 1274 (\"Then the owner chose, 2026-11-11, one link `refines` for both (the line between refining and extending is thin, and no check could tell them apart; fix-table-4.mjs)\") and the comment of fix-table-4.mjs (\"The owner of 2026-11-11: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart\"). Neither file keeps the owner's words in Russian.";
  reviewed(k, "review-g1c-a.md");
}
{ // the approval status of a domain's header
  const k = "proposal:domains-header-status";
  swapPart(k, "The SpecSheriff tools derive the approval status",
    "every node of the domain other than a section and other than the header itself is approved",
    "every node of the domain other than its sections and the header itself is approved",
    null, null,
    "«Кроме его разделов и самого заголовка» вместо «кроме раздела и кроме самого заголовка» (рецензент); русский текст уже так и говорил. Какие узлы считаются, взято из одобренного прежнего правила 1.6, которое исполняло то же решение: статус заголовка домена строится «так же из каждого узла домена, кроме самого заголовка».");
  setRef(k, "s-tgrnpagrb58tya7", "refines");
  addRefs(k, R("refines", "s-9g7jj8z4yf9kq93"));
  examples(k, [X(
    "A domain is kept in two documents: the first holds its header and a section under it, and the second holds another section, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The closest mistake is to derive the header's status only from the nodes under the header, and so to show the header approved while a rule in the second document is still a draft.",
    "Домен хранится в двух документах: в первом — его заголовок и раздел под ним, во втором — ещё один раздел, и одно правило в нём — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял. Ближайшая ошибка — выводить статус заголовка только из узлов под заголовком и тем самым показывать заголовок одобренным, пока правило во втором документе ещё черновик.")]);
  reviewed(k, "review-g1c-a.md");
}

// ---------------------------------------------------------------------------------------------------------------
// review-g1c-b.md: the drafts
// ---------------------------------------------------------------------------------------------------------------
{ // L, "How a node's location is computed"
  const k = "new:tools-7-1-location";
  swapPart(k, "The first node at the top of a file",
    "a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5)",
    "a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5)",
    "файла guidelines или технического приложения (§s-tj38pvm38nepaf5)",
    "файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5)",
    "Названо и описание инструментов: оно не входит в guidelines (правило 2.1), а его узлам тоже нужно расположение (рецензент). Правилу 8.5 это не нужно: `tools.json` хранит только этот репозиторий.");
  addRefs(k, R("cites", "s-a4rbry4hsu34hy8"));
  joinToPrevious(k, "Every other node's location", "Абзац «Расположение любого другого узла…» присоединён к этому, чтобы «другого» указывало на узлы того же абзаца (рецензент).");
  swapPart(k, "in a file of the guidelines or of the technical appendix, the location",
    "in a file of the guidelines or of the technical appendix,", "in a file of the guidelines, of the appendix of the tools or of the technical appendix,",
    "в файле guidelines или технического приложения", "в файле guidelines, описания инструментов или технического приложения");
  swapPart(k, "a term (§s-ypa92gpcj3f5zj8)", "a term (§s-ypa92gpcj3f5zj8);", "a term (§s-khqsmy6mhejkrhg), whose place is the term's name;",
    "термина (§s-ypa92gpcj3f5zj8);", "термина (§s-khqsmy6mhejkrhg), место которого — имя термина;",
    "Сказано, каково место термина (рецензент); ссылка ведёт на правило 3.3, как в предлагаемом правиле 8.5.");
  swapRef(k, "s-ypa92gpcj3f5zj8", "s-khqsmy6mhejkrhg");
  swapPart(k, "the first node at the top of a file of the guidelines or of the technical appendix;",
    "a file of the guidelines or of the technical appendix;", "a file of the guidelines, of the appendix of the tools or of the technical appendix;",
    "файла guidelines или технического приложения;", "файла guidelines, описания инструментов или технического приложения;");
  swapPart(k, "In a file of the guidelines or of the technical appendix, each further node",
    "In a file of the guidelines or of the technical appendix,", "In a file of the guidelines, of the appendix of the tools or of the technical appendix,",
    "В файле guidelines или технического приложения", "В файле guidelines, описания инструментов или технического приложения");
  reviewed(k, "review-g1c-b.md");
}
{ // V, "Values built from other nodes"
  const k = "s-agc6fb3vx46pc23";
  swapPart(k, "`sheriff validate` checks each node", "and says which of these values differs.", "and names the value that differs.",
    "и говорит, какое из этих значений отличается.", "и называет значение, которое отличается.",
    "«Называет значение, которое отличается» вместо «говорит, какое из этих значений отличается»: «этих» указывало на другой абзац (рецензент).");
  const r = E(k).proposal;
  reason(k,
    swap(r.reason, "Each of these values is built from other nodes, so an edit to one node leaves another node's value out of date until `sheriff reindex` runs.",
      "After an edit to one node, a value built from it stays out of date until `sheriff reindex` runs."),
    swap(r.ruReason, "Каждое из этих значений построено из других узлов, поэтому правка одного узла оставляет значение другого устаревшим, пока не запущен `sheriff reindex`.",
      "После правки узла значение, построенное из него, остаётся устаревшим, пока не запущен `sheriff reindex`."));
  const ex = r.examples[0];
  examples(k, [X(ex.en, swap(ex.ru, "ячеек которой", "ячеек которого"))]);
  reviewed(k, "review-g1c-b.md");
}
{ // C, "A run of words in capitals"
  const k = "s-e2vdhfsndy5stq9";
  swapPart(k, "In what it reads", "In what it reads,", "In what `sheriff validate` reads,", "В том, что он читает,", "В том, что читает `sheriff validate`,",
    "«Читает `sheriff validate`» вместо «он читает», и «слова, набранные заглавными» вместо «такие слова»: иначе фразы указывали на другой абзац (рецензент).");
  reword(k, "A run is three or more",
    "A run is three or more words set in capitals with only spaces or tabs between them. Text in backticks, in straight double quotation marks or in curly double quotation marks (“…”) is left out.",
    "Слова подряд — это три или более слова, набранных заглавными, между которыми только пробелы или табуляции. Текст в обратных кавычках, в прямых двойных кавычках или в английских двойных кавычках (“…”) не учитывается.",
    "Кавычки названы точно, как в коде: «…» и „…“ не пропускаются (рецензент).");
  const r = E(k).proposal;
  reason(k, swap(r.reason, "That form is drawn exactly", "That form is defined exactly"), r.ruReason);
  const ex = r.examples[0];
  examples(k, [X(
    swap(ex.en, "written as part of its sentence.", "written as part of its sentence, outside backticks and quotation marks."),
    swap(ex.ru, "написанными как часть предложения.", "написанными как часть предложения, вне обратных кавычек и кавычек."))]);
  reviewed(k, "review-g1c-b.md");
}
{ // T, "Link types reserved for terms"
  const k = "s-pvnnr844f3y964m";
  joinToPrevious(k, "`sheriff validate` refuses every other link", "Два абзаца соединены: «любую другую связь» указывало на предыдущий абзац (рецензент).");
  reviewed(k, "review-g1c-b.md");
}
{ // G, "The target of a link"
  const k = "new:tools-7-1-link-target";
  const ex = E(k).proposal.examples[0];
  examples(k, [X(
    swap(ex.en, "the files that the repository keeps: a rule of a project's own guidelines", "the files that the repository keeps. A rule of a project's own guidelines"),
    swap(ex.ru, "которые хранит репозиторий: правило собственных guidelines проекта", "которые хранит репозиторий. Правило собственных guidelines проекта"))]);
  reviewed(k, "review-g1c-b.md");
}
{ // K, "Copies of the files that the SpecSheriff plugin delivers"
  const k = "s-6bmnsbskg6en4nf";
  const r = E(k).proposal;
  reason(k,
    swap(r.reason, "A copy in the project's repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed.",
      "A copy in the project's repository is read by people and agents, but by none of the SpecSheriff tools. So it falls behind the files in force unnoticed."),
    swap(r.ruReason, "Копию в репозитории проекта читают люди и агенты, но не читает ни один инструмент SpecSheriff, поэтому она незаметно отстаёт от действующих файлов.",
      "Копию в репозитории проекта читают люди и агенты, но не читает ни один инструмент SpecSheriff. Поэтому она незаметно отстаёт от действующих файлов."));
  reviewed(k, "review-g1c-b.md");
}
{ // E, "A link from the SpecSheriff guidelines to an extension"
  const k = "new:tools-7-1-guidelines-to-extension";
  examples(k, [X(
    "A rule of `spec.json` cites a rule of an extension and declares the `cites` link that the citation requires. `sheriff validate` refuses that link.",
    "Правило `spec.json` цитирует правило расширения и объявляет связь `cites`, которой требует цитата. `sheriff validate` отвергает эту связь.")]);
  reviewed(k, "review-g1c-b.md");
}

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
const longSentences = [];

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
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !(p.citedInDecisions || []).includes(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru, decisions]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (/оглавлени/.test(ru)) problems.push(`${key}: the Russian still says «оглавление»`);
  for (const sentence of [p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

// The English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 1: the English of every node",
  "",
  "This file holds the final English of every node of group 1 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group1-d.mjs: the drafts of the appendix of the tools and the proposals for nodes outside it.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "A node in a cell of a table has no title of its own, so a row is headed by its location.",
  "fix-group1-d.mjs writes this file; edit the drafts, not this file.",
  "",
];
for (const key of GROUP) {
  const e = drafts[key];
  const p = e.proposal;
  md.push(`## ${key} — ${p.title ? p.title.replace(/`/g, "") : `a row of a table, ${e.location}`}`, "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (e.cost) md.push(`**On failure:** ${e.cost.en}`, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example ${i + 1}:** ${x.en}`, "");
}

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
fs.writeFileSync(new URL("english-group1.md", here), md.join("\n"));
console.log(`rewrote ${GROUP.length} keys and english-group1.md`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
