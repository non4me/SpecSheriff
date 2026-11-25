// T25, stage 2, group 1, round e: applies the fourth review (review-g1d.md) and the findings of EngStickler's readers on
// english-group1.md (english-g1-{a,b,c}-{fast,thorough}.md), with the coordinator's rulings on recurring phrases. Copies
// tools-drafts.json to tools-drafts.before-group1-e.json first. Run again, it rebuilds the keys of this group from that
// copy and leaves every other key as tools-drafts.json holds it. It checks every draft before it writes, then writes
// english-group1.md (the English of every node of the group) and english-group1-changed.md (each sentence this round
// changed, as it now reads).
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group1-e.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-23";

const DRAFTS = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "new:tools-7-1-link-target", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w",
  "s-qvgzubkrafadqgf", "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf"];
const PROPOSALS = Object.keys(before).filter((k) => k.startsWith("proposal:"));
const GROUP = [...DRAFTS, ...PROPOSALS];
// The reviewer's «Оценка», which assess-group1.mjs records, is kept across a rerun.
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
// Replaces one exact passage of a string, and fails where the passage is missing.
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: "${from.slice(0, 80)}"`);
  return s.replace(from, to);
};
// The English and Russian fields of a node that a passage may sit in: "title", "reason", "ex0", "ex1", or the opening
// words of a part.
const fields = (key, where) => {
  const p = E(key).proposal;
  if (where === "title") return [p, "title", p, "ruTitle"];
  if (where === "reason") return [p, "reason", p, "ruReason"];
  if (/^ex\d$/.test(where)) { const x = p.examples[Number(where[2])]; return [x, "en", x, "ru"]; }
  const x = part(key, where);
  return [x, "en", x, "ru"];
};
// Replaces one passage in the English and, where given, one in the Russian.
const sw = (key, where, enFrom, enTo, ruFrom, ruTo) => {
  const [a, ka, b, kb] = fields(key, where);
  if (enFrom !== null) a[ka] = swap(a[ka], enFrom, enTo);
  if (ruFrom) b[kb] = swap(b[kb], ruFrom, ruTo);
};
const setAll = (key, where, en, ru) => {
  const [a, ka, b, kb] = fields(key, where);
  a[ka] = en;
  if (ru) b[kb] = ru;
};
const note = (key, prefix, more) => { const x = part(key, prefix); x.change = `${x.change} ${more}`; };
const addRefs = (key, ...list) => { E(key).proposal.refs.push(...list); };
const ENGLISH_ONLY = "Английский текст поправлен, смысл тот же (чтецы EngStickler).";
const reviewed = (key, what) => { E(key).review = `${E(key).review ? E(key).review + "; " : ""}${DATE}, round e: ${what}; fix-group1-e.mjs applied the findings`; };
const READERS = "EngStickler's readers, english-g1-a/b/c-fast/thorough.md";

// ---------------------------------------------------------------------------------------------------------------
// The coordinator's rulings on recurring phrases, applied to every node of the group.
// ---------------------------------------------------------------------------------------------------------------
let closest = 0;
for (const k of GROUP) for (const x of E(k).proposal.examples || []) {
  if (x.en.includes("The closest mistake")) { x.en = x.en.replace("The closest mistake", "The most likely mistake"); closest++; }
  if (x.ru.includes("Ближайшая ошибка")) x.ru = x.ru.replace("Ближайшая ошибка", "Самая вероятная ошибка");
}
if (closest !== 11) throw new Error(`only ${closest} examples named the closest mistake`);
const CELL = "a node in a cell of a `TableRule` included";
const INCLUDING_CELL = "including a node in a cell of a `TableRule`";
for (const k of ["s-stxmhq3hgfndvn6", "s-95w92rnjuv3sst8", "s-agc6fb3vx46pc23"]) sw(k, "`sheriff validate` checks each node", CELL, INCLUDING_CELL);

// ---------------------------------------------------------------------------------------------------------------
// review-g1d.md and the readers, draft by draft
// ---------------------------------------------------------------------------------------------------------------
{ // A, "A location that differs from the computed one"
  const k = "s-stxmhq3hgfndvn6";
  sw(k, "`sheriff validate` refuses each node whose location", "and the location computed.", "and the computed location.");
  setAll(k, "reason",
    "A location tells a reader where a node is only while it is the computed one. `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw). So a location that differs from the computed one was written by hand, or was left behind when the node was moved and `sheriff reindex` did not run afterwards.",
    "Расположение говорит читателю, где находится узел, только пока оно совпадает с вычисленным. `sheriff reindex` пишет каждое расположение после каждой правки, которую делает агент (§s-477gtdrkw34dzxw). Поэтому расположение, которое отличается от вычисленного, написано вручную или осталось после переноса узла, за которым не последовал `sheriff reindex`.");
  reviewed(k, `review-g1d.md (the reason split at "so") and ${READERS}`);
}
{ // L, "How a node's location is computed"
  const k = "new:tools-7-1-location";
  sw(k, "The SpecSheriff tools compute a node's location", "from the path of its file and its place in the specification.", "from the path of its file and where the node is in the specification.",
    "по пути к его файлу и по его месту в спецификации.", "по пути к его файлу и по тому, где узел находится в спецификации.");
  sw(k, "The first node at the top of a file",
    "The first node at the top of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5) takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u).",
    "In a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), the first top-level node of the file takes as its location the file's path under `specs/`, without `.json` (§s-zefk589ykh37b8u).",
    "Первый узел на вершине файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5) получает расположением путь к этому файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u).",
    "В файле guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5) первый узел на вершине файла получает расположением путь к файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u).");
  sw(k, "in a file of the guidelines, of the appendix of the tools or of the technical appendix, the location", "the first node at the top of that file", "the first top-level node of that file");
  sw(k, "the first node at the top of a file of the guidelines", "the first node at the top of a file", "the first top-level node of a file");
  sw(k, "The SpecSheriff tools take the numbered nodes", "The SpecSheriff tools take the numbered nodes", "The SpecSheriff tools go through the numbered nodes",
    "инструменты SpecSheriff берут в порядке", "инструменты SpecSheriff обходят в порядке");
  const p10 = "In a folder of the base specification";
  sw(k, p10, "the nodes at the top of its files and the children of a domain's header are considered nodes under one parent",
    "the top-level nodes of its files and the children of a domain's header are treated as nodes under one parent");
  sw(k, p10, "The SpecSheriff tools take them file by file", "The SpecSheriff tools go through them file by file",
    "Инструменты SpecSheriff берут их файл за файлом", "Инструменты SpecSheriff обходят их файл за файлом");
  sw(k, p10, "The nodes at the top of one file are taken in the order in which the file lists them.", "The top-level nodes of one file come in the order in which the file lists them.",
    "Узлы на вершине одного файла берутся в том порядке", "Узлы на вершине одного файла идут в том порядке");
  sw(k, p10, "The children of a domain's header take the header's place in that order.", "The children of a domain's header take the header's position in that order.",
    "занимают в этом порядке место заголовка.", "занимают в этом порядке позицию заголовка.");
  sw(k, "In a file of the guidelines, of the appendix of the tools or of the technical appendix, each further node", "each further node at the top of the file", "each further top-level node of the file");
  sw(k, "reason", "Both therefore need one computation that gives every node a location of its own, the same on every machine.",
    "Both commands therefore need one computation that gives every node a location of its own that is the same on every machine.",
    "Поэтому обоим нужно", "Поэтому обеим командам нужно");
  sw(k, "ex0", "A domain `requests` is kept", "A domain named `requests` is kept");
  sw(k, "ex0", "and the sections are `requests/1` and `requests/2`.", "and the sections' locations are `requests/1` and `requests/2`.");
  reviewed(k, `review-g1d.md (ready once the owner answers Q1 with A; its optional readability fix applied) and ${READERS}`);
}
{ // "An approved node without a standing approval"
  const k = "s-95w92rnjuv3sst8";
  setAll(k, "title", "An approved node with no approval in force");
  sw(k, "`sheriff validate` refuses each approved node", "for which no approval of its current wording stands", "for which no approval of its current wording is in force");
  sw(k, "each domain's header", "each domain's header,", "the header of each domain,");
  sw(k, "reason", "is recorded apart from the node", "is recorded separately from the node");
  sw(k, "reason", "Comparing the two finds", "Comparing the two reveals", "Сравнение того и другого находит", "Сравнение того и другого выявляет");
  sw(k, "ex0", "since no approval stands for its new wording.", "since no approval of its new wording is in force.");
  reviewed(k, READERS);
}
{ // "Who an added approval names"
  const k = "new:tools-7-1-approval-by";
  sw(k, "`sheriff validate` refuses any other approval", "Where the files that the repository keeps hold the node,", "Where the node is in the files that the repository keeps,");
  sw(k, "An approval is added by a commit", "holds more lines equal to that approval after the commit than in the commit's parent.",
    "holds more lines identical to that approval after the commit than it held in the commit's parent.");
  sw(k, "`sheriff validate` finds a node's owners", "`sheriff validate` finds a node's owners as the model of the specification gives them", "`sheriff validate` takes a node's owners from the model of the specification",
    "Ответственных за узел `sheriff validate` находит так, как их даёт модель спецификации", "Ответственных за узел `sheriff validate` берёт из модели спецификации");
  sw(k, "reason", "so each approval is judged in the commit that adds it.", "so each approval is judged against the owners as of the commit that adds it.",
    "поэтому каждое одобрение оценивается в том коммите, который его добавляет.", "поэтому каждое одобрение оценивается по ответственным на момент того коммита, который его добавляет.");
  sw(k, "ex0", "A commit that also makes `b@example.com` an owner of that section is accepted.", "A commit that adds the same approval and also makes `b@example.com` an owner of that section is accepted.",
    "Коммит, который к тому же делает", "Коммит, который добавляет то же одобрение и к тому же делает");
  sw(k, "ex0", "against the owners that the commit's parent holds,", "against the owners named in the commit's parent,");
  reviewed(k, READERS);
}
{ // V, "Values built from other nodes"
  const k = "s-agc6fb3vx46pc23";
  sw(k, "`sheriff validate` refuses each node in which", "It computes the following values:", "`sheriff validate` computes the following values:",
    "Он вычисляет следующие значения:", "`sheriff validate` вычисляет следующие значения:");
  sw(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm)", "the approval status of each domain's header", "the approval status of the header of each domain");
  sw(k, "where the project has chosen the Domains extension, the index", "the index of sections in each domain's header", "the index of the sections in the header of each domain");
  sw(k, "where the project has chosen the RecordType extension", "the values gathered beside each field with `enum`", "the values gathered for each field that has an `enum`",
    "значения, собранные рядом с каждым полем с `enum`", "значения, собранные для каждого поля с `enum`");
  sw(k, "reason", "Computing every such value anew finds a commit that holds an out-of-date value, or one written by hand.",
    "Computing every such value again reveals a commit that holds an out-of-date value or a value written by hand.",
    "Вычисление каждого такого значения заново находит", "Вычисление каждого такого значения заново выявляет");
  reviewed(k, READERS);
}
{ // "One header for each domain"
  const k = "new:tools-7-1-one-header";
  sw(k, "reason", "So only a reading of all of them shows a missing header or a second one.", "So only reading all of them reveals that a header is missing or that there is a second one.");
  reviewed(k, READERS);
}
{ // G, "The target of a link"
  const k = "new:tools-7-1-link-target";
  sw(k, "`sheriff validate` accepts a link only where",
    "It refuses any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6).",
    "It refuses any other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).");
  sw(k, "reason", "Only such a link is built into that node, among the links pointing at it (§s-bpdqd9v72wg7vsz).", "Only such a link appears among the links pointing at its target (§s-bpdqd9v72wg7vsz).",
    "Только такая связь строится в этом узле среди связей, указывающих на него (§s-bpdqd9v72wg7vsz).", "Только такая связь попадает в число связей, указывающих на её цель (§s-bpdqd9v72wg7vsz).");
  sw(k, "ex0", "A rule keeps a `refines` link", "A rule still has a `refines` link", "Правило сохраняет связь `refines`", "В правиле по-прежнему есть связь `refines`");
  sw(k, "ex0", "only among the nodes of the files that the repository keeps.", "only among the nodes in the files that the repository keeps.",
    "среди узлов файлов, которые хранит репозиторий.", "среди узлов в файлах, которые хранит репозиторий.");
  sw(k, "ex0", "A rule of a project's own guidelines refines a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin, and `sheriff validate` accepts that link.",
    "That mistake would refuse a `refines` link from a rule of a project's own guidelines to a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin. `sheriff validate` accepts that link.",
    "Правило собственных guidelines проекта уточняет правило SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff, и `sheriff validate` принимает эту связь.",
    "Такая ошибка отвергла бы связь `refines` от правила собственных guidelines проекта к правилу SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff. `sheriff validate` эту связь принимает.");
  reviewed(k, READERS);
}
{ // "Citations and the links that match them"
  const k = "s-qzyacnqwvaeaps4";
  sw(k, "`sheriff validate` refuses each of the following", CELL, INCLUDING_CELL);
  sw(k, "A `§` followed by a sid", "A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9).",
    "A `§` followed by a sid cites that sid, in text in backticks too, where no lower-case letter or digit follows the sid (§s-cxtt6jvhqcey2k9).");
  sw(k, "`sheriff validate` reads every property", "reads every property of the node for citations", "reads every property of a node for citations");
  sw(k, "the nodes under it", "the nodes under it, the nodes in its cells included;", "the nodes under it, including the nodes in its cells;");
  sw(k, "reason", "in whatever property of a node it stands,", "in whatever property of a node it appears,");
  setAll(k, "ex0",
    "A node's reason shows `§base/3.2`, a citation by location, in backticks, and `sheriff validate` accepts it. The same characters without backticks are refused as a citation by location. In backticks, a `§` followed by a sid still counts as a citation, so the node must declare a link to the node with that sid.",
    "Обоснование узла показывает `§base/3.2`, ссылку по расположению, в обратных кавычках, и `sheriff validate` это принимает. Те же символы без обратных кавычек отвергаются как ссылка по расположению. В обратных кавычках `§` с sid всё равно считается ссылкой, поэтому узел должен объявить связь с узлом, у которого этот sid.");
  reviewed(k, READERS);
}
{ // T, "Link types reserved for terms"
  const k = "s-pvnnr844f3y964m";
  const p0 = "`sheriff validate` accepts a link of type";
  sw(k, p0, "a link of any other type, `cites` included,", "a link of any other type, including `cites`,");
  sw(k, p0, "`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6).",
    "`sheriff validate` refuses every other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).");
  sw(k, p0, "It says that the link is to be settled with the specification's owners.", "It says that the link is to be agreed with the specification's owners.",
    "Он говорит, что связь нужно решить с ответственными за спецификацию.", "Он говорит, что связь нужно согласовать с ответственными за спецификацию.");
  sw(k, "reason", "says how the entities (§s-9w3u3wn37wksyxd) that they name relate.", "shows how the entities (§s-9w3u3wn37wksyxd) that they name relate to one another.",
    "говорит о том, как соотносятся сущности (§s-9w3u3wn37wksyxd), которые они называют.", "показывает, как соотносятся друг с другом сущности (§s-9w3u3wn37wksyxd), которые они называют.");
  reviewed(k, READERS);
}
{ // C, "A run of words in capitals"
  const k = "s-e2vdhfsndy5stq9";
  sw(k, "`sheriff validate` refuses each run",
    "The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the property that holds the run, and the run.",
    "The refusal names the run, the property that holds it, and the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
    "Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx), свойство, в котором стоят эти слова, и сами слова.",
    "Отказ называет эти слова, свойство, в котором они стоят, и файл, sid и расположение узла (§s-kag2m9tzdnduxdx).");
  sw(k, "`sheriff validate` checks each node", "whatever its status.", "whatever its approval status.", "каким бы ни был его статус.", "каким бы ни был его статус одобрения.");
  sw(k, "In what `sheriff validate` reads", "is two or more characters that meet", "is a sequence of two or more consecutive characters that meet",
    "это два или более знака, которые", "это два или более знака подряд, которые");
  sw(k, "no letter, digit or underscore", "no letter, digit or underscore stands immediately", "no letter, digit or underscore comes immediately");
  sw(k, "A run is three or more", "is left out.", "is not read.", "не учитывается.", "не читается.");
  sw(k, "ex0", "written as part of its sentence,", "written as part of a sentence,");
  reviewed(k, READERS);
}
{ // "A section with a rule in it"
  const k = "s-zhen42p6mnaxu7w";
  sw(k, "reason", "still reads as a part of the specification.", "still looks like a part of the specification.");
  reviewed(k, READERS);
}
{ // "`exempts` links"
  const k = "s-qvgzubkrafadqgf";
  setAll(k, "ex0",
    "The section on the stack holds a rule that chooses the programming language. A rule of `project.json` exempts that rule, since no symbol in the code can implement that choice. The exempting rule's text gives that reason and cites the rule that it exempts. The exempting rule also declares an `exempts` link to that rule, and `sheriff validate` accepts the link. The most likely mistake is to cite the exempted rule only in the reason, in which case `sheriff validate` refuses the link.",
    "Раздел стека содержит правило, которое выбирает язык программирования. Правило `project.json` освобождает это правило от имплементации, потому что ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила приводит эту причину и ссылается на правило, которое оно освобождает. Освобождающее правило также объявляет с этим правилом связь `exempts`, и `sheriff validate` эту связь принимает. Самая вероятная ошибка — сослаться на освобождаемое правило только в обосновании: тогда `sheriff validate` связь отвергает.");
  reviewed(k, READERS);
}
{ // "`consumes` links"
  const k = "new:tools-7-1-consumes";
  sw(k, "reason", "both learn from the `consumes` links which domain uses which section", "both read from the `consumes` links which domain uses which section",
    "узнают из связей `consumes`", "берут из связей `consumes`");
  sw(k, "reason", "would make the index or the cycle check wrong.", "would make the index wrong or the cycle check give a wrong result.",
    "сделала бы неверным указатель или проверку цикла.", "сделала бы неверным указатель или результат проверки цикла.");
  sw(k, "ex0", "that the domain relies on,", "that the domain `requests` relies on,", "на которое опирается домен:", "на которое опирается домен `requests`:");
  sw(k, "ex0", "and `sheriff validate` then refuses the link.", "in which case `sheriff validate` refuses the link.");
  reviewed(k, READERS);
}
{ // E, "A link from the SpecSheriff guidelines to an extension"
  const k = "new:tools-7-1-guidelines-to-extension";
  sw(k, "title", "to an extension", "to an extension of the guidelines", "с расширением", "с расширением guidelines");
  const p0 = "`sheriff validate` refuses each link";
  sw(k, p0, "`sheriff validate` makes this check only", "`sheriff validate` runs this check only", "Эту проверку `sheriff validate` делает только", "Эту проверку `sheriff validate` выполняет только");
  sw(k, p0, "other than a section, a node in a cell of a `TableRule` included", "other than a section, including a node in a cell of a `TableRule`");
  sw(k, "reason", "the extensions are kept beside them.", "the extensions of the guidelines are kept beside them.", "расширения хранятся рядом с ними.", "расширения guidelines хранятся рядом с ними.");
  reviewed(k, READERS);
}
{ // "`implements` and `refines` links of the appendices and of a project's own guidelines"
  const k = "s-yprj7d6tnvauggr";
  sw(k, "title", "links of the appendices and of a project's own guidelines", "links in the appendices and in a project's own guidelines",
    "приложений и собственных guidelines проекта", "в приложениях и в собственных guidelines проекта");
  sw(k, "In the files that the repository keeps", "where the node lacks the link named for it:", "where the node lacks the link listed for it:",
    "если у узла нет названной для него связи:", "если у узла нет указанной для него связи:");
  sw(k, "`sheriff validate` tells which part", "`sheriff validate` tells which part of the specification a node belongs to by the path of its file",
    "`sheriff validate` determines which part of the specification a node belongs to from the path of its file");
  sw(k, "reason", "is found whenever that rule changes.", "can be found whenever that rule changes.", "находят при каждом изменении этого правила.", "можно найти при каждом изменении этого правила.");
  sw(k, "ex0", "`sheriff validate` refuses the rule, since it declares", "`sheriff validate` refuses the rule of `project.json`, since it declares",
    "`sheriff validate` отвергает правило: у него нет", "`sheriff validate` отвергает правило `project.json`: у него нет");
  reviewed(k, READERS);
}
{ // K, "Copies of the files that the SpecSheriff plugin delivers"
  const k = "s-6bmnsbskg6en4nf";
  sw(k, "`sheriff validate` refuses each copy", "refuses each copy of the files that are common to every project and come with", "refuses each copy of a file that is common to every project and comes with",
    "отвергает каждую копию файлов, которые общие для всех проектов и поставляются", "отвергает каждую копию файла, который общий для всех проектов и поставляется");
  sw(k, "The refusal names each copy.", "While the repository keeps a copy, `sheriff validate` makes only the check for copies.", "As long as the repository keeps a copy, `sheriff validate` runs only the check for copies.",
    "`sheriff validate` делает только проверку на копии.", "`sheriff validate` выполняет только проверку на копии.");
  sw(k, "reason", "but by none of the SpecSheriff tools. So it falls behind the files in force unnoticed.", "but not by any of the SpecSheriff tools. So it falls behind the plugin's files unnoticed.",
    "Поэтому она незаметно отстаёт от действующих файлов.", "Поэтому она незаметно отстаёт от файлов плагина.");
  reviewed(k, READERS);
}

// ---------------------------------------------------------------------------------------------------------------
// The proposals
// ---------------------------------------------------------------------------------------------------------------
{ // rule 8.5
  const k = "proposal:s-kag2m9tzdnduxdx";
  sw(k, "the node at the top of a file", "the node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name and the file's;",
    "the top-level node of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;");
  note(k, "the top-level node of a file", ENGLISH_ONLY);
  setAll(k, "where an extension of the guidelines",
    "a node of a kind that an extension of the guidelines (§s-mbmnsnxenmavu3z) defines and that a part of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the part's name alone as its location.");
  sw(k, "In each file of the guidelines", "under the location of the file's top node.", "under the location of the file's top-level node.");
  sw(k, "In each file of the guidelines", "together with the other nodes at the top of the part.", "together with the other top-level nodes of the part.");
  note(k, "In each file of the guidelines", ENGLISH_ONLY);
  sw(k, "ex0", "as the fifth node of its eighth section", "as the fifth node of the file's eighth section", "пятым узлом его восьмого раздела", "пятым узлом восьмого раздела этого файла");
  reviewed(k, READERS);
}
{ // the approval status of a domain's header
  const k = "proposal:domains-header-status";
  sw(k, "The SpecSheriff tools derive", "of a domain's header (§s-yggv9myedprnaa7) as they derive a section's", "of a domain's header (§s-yggv9myedprnaa7) in the same way as they derive a section's");
  sw(k, "ex0", "to derive the header's status only", "to derive the header's approval status only", "выводить статус заголовка", "выводить статус одобрения заголовка");
  sw(k, "ex0", "to show the header approved while", "to show the header as approved while");
  reviewed(k, READERS);
}
{ // row 10.1.8
  const k = "proposal:row-10-1-8";
  sw(k, "Every node of the specification", "outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen,",
    "outside both the SpecSheriff guidelines that a project uses and the extensions that the project has chosen,");
  note(k, "Every node of the specification", ENGLISH_ONLY);
  reviewed(k, READERS);
}
{ // row 10.1.17
  const k = "proposal:row-10-1-17";
  sw(k, "No sentence of the specification", "where there are one or two of them in a row.", "where there are no more than two of them in a row.");
  sw(k, "ex0", "two abbreviations in a row.", "two consecutive abbreviations.");
  sw(k, "ex0", "three words in capitals in a row.", "three consecutive words in capitals.");
  reviewed(k, READERS);
}
{ // rule 6.1: review-g1d.md, then the readers
  const k = "proposal:s-sn6au3vcr9uy5pm";
  sw(k, "`term-relation` —", "in the ratio the link carries.", "in the ratio the link carries (§s-bckzdwd35d2nefa).",
    "в соотношении, которое указывает связь.", "в соотношении, которое указывает связь (§s-bckzdwd35d2nefa).");
  note(k, "`term-relation` —", "Добавлена ссылка на правило о том, как записывается соотношение (рецензент).");
  sw(k, "An extension of the guidelines", "An extension of the guidelines or a project's own guidelines", "An extension of the guidelines (§s-mbmnsnxenmavu3z) or a project's own guidelines",
    "Расширение guidelines или собственные guidelines проекта", "Расширение guidelines (§s-mbmnsnxenmavu3z) или собственные guidelines проекта");
  part(k, "An extension of the guidelines").change = "Как в согласованной формулировке; добавлена ссылка на правило о том, что такое расширение guidelines, как требует правило 7.2.7 (рецензент).";
  addRefs(k, R("cites", "s-bckzdwd35d2nefa"), R("cites", "s-mbmnsnxenmavu3z"));
  const dec = E(k).proposal.meta.decisions[0];
  dec.problem = "The rule on a project's own guidelines (§s-u7tw6m8npxmv5tu) and the row of the main table of checks that checks it say that a rule of a project's own guidelines refines or extends a rule. This rule gave `refines` only the meaning of refining, and no type of link expressed extending.";
  dec.ruling = "The owner: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart. The meaning of `refines` in this rule is widened to cover extending.";
  E(k).decisionSources = "t25-one-thought.md line 1274 and line 10 of fix-table-4.mjs, the Russian change note of row 10.1.24, both in the agent's wording; neither records the owner's own words, so the ruling is stated in the form of the node's other decisions, without quotation marks (review-g1d.md).";
  const refines = part(k, "`refines` —");
  refines.change = swap(refines.change, refines.change.slice(refines.change.indexOf("Фраза «связывающий узел")),
    "Фраза «связывающий узел оставляет в силе каждое требование связанного» — новая для связей, которых не касаются правила 2.3, 1.7.2 и 4.2, например 4.1 → 1.1.4 или 9.5 → 1.5.2: эти правила требуют её только от собственных guidelines проекта, от расширения guidelines и от технического приложения. Ни одна существующая связь `refines` её не нарушает. Где подходят и `implements`, и `refines`, тип задают строки 10.1.22–10.1.24: для технического приложения, описания инструментов и собственных guidelines проекта.");
  E(k).question = swap(E(k).question, "covers both refining and extending;", "covers both refining and extending, and adds that the linking node leaves every requirement of the linked node in force;");
  sw(k, "`refines` —", "the linking node states the linked node more precisely, states it for a narrower case, or extends it.",
    "the linking node states more precisely what the linked node states, states it for a narrower case, or extends the linked node.");
  sw(k, "`refines` —", "A node extends another when it adds a requirement on the other node's subject that the other leaves open, such as a value that the other leaves to each project.",
    "A node extends another when it adds a requirement on a question that the other leaves open within its own subject, such as a value that the other leaves to each project.",
    "Узел расширяет другой, если добавляет требование о предмете другого узла, которое тот оставляет открытым, например значение, которое тот оставляет каждому проекту.",
    "Узел расширяет другой, если добавляет требование по вопросу, который другой оставляет открытым в своём предмете, например по значению, которое тот оставляет каждому проекту.");
  note(k, "`refines` —", "Английский текст первой фразы поправлен, смысл тот же. Во фразе о расширении сказано, что требование добавляется по вопросу, который другой узел оставляет открытым (чтецы EngStickler).");
  sw(k, "reason", "No diagram can draw it.", "No diagram can show it.");
  E(k).proposal.reasonChange = `${E(k).proposal.reasonChange} ${ENGLISH_ONLY}`;
  sw(k, "ex1", "The most likely mistake is an `implements` link from that rule: the rule does not state how the rule it builds on is implemented.",
    "The most likely mistake is an `implements` link from the project's rule: that rule does not state how the rule it refines is implemented.",
    "Самая вероятная ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается.",
    "Самая вероятная ошибка — связь `implements` от правила проекта: оно не показывает, как выполняется правило, которое оно уточняет.");
  reviewed(k, `review-g1d.md (its wording fixes applied word for word) and ${READERS}`);
}
{ // "What `sheriff reindex` writes"
  const k = "proposal:s-ztseyetus7np6br";
  sw(k, "the approval status of each section", "the nodes in the cells of a `TableRule` included (§s-9kfdycuq34beqvs);", "including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);");
  sw(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm)", "the approval status of each domain's header, derived from the domain's nodes, those in the cells of a `TableRule` included (§s-yccuyqbypzzx2gu);",
    "the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including those in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);",
    "выведенный из узлов домена, в том числе из узлов в ячейках", "выведенный из каждого узла домена, кроме его разделов и самого заголовка, в том числе из узлов в ячейках");
  // The coordinator's instruction of round e: the item says what the proposed header-status rule of the same group says.
  note(k, "where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm)", "Сказано, из каких узлов выводится статус заголовка: из каждого узла домена, кроме его разделов и самого заголовка, как в предлагаемом правиле о статусе одобрения заголовка домена. Прежде пункт читался как «из всех узлов домена», то есть вместе с разделами и самим заголовком. Это меняет смысл пункта, но только так, чтобы он говорил то же, что правило о статусе заголовка из той же группы; вы соглашаетесь с обоими предложениями вместе.");
  sw(k, "`sheriff reindex` writes each file as", "in the order that the file already has them.", "in the order in which the file already has them.");
  note(k, "`sheriff reindex` writes each file as", ENGLISH_ONLY);
  sw(k, "reason", "What the SpecSheriff tools can compute from the specification, the code and the tests, the tools write themselves, so that",
    "The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that");
  E(k).proposal.reasonChange = `${E(k).proposal.reasonChange} ${ENGLISH_ONLY}`;
  reviewed(k, READERS);
}
{ // rule 10.3
  const k = "proposal:s-83ev4wwesbwnhnp";
  sw(k, "change the approvals", "change the approvals, the entries that set", "change the approvals, or the entries that set");
  note(k, "change the approvals", ENGLISH_ONLY);
  sw(k, "reason", "a commit that contains a test together with its code.", "a commit that contains a test together with the code it tests.",
    "коммит, где тест лежит вместе со своим кодом.", "коммит, где тест лежит вместе с кодом, который он проверяет.");
  sw(k, "reason", "a decision that only the owners make,", "a decision that only the owners may make,",
    "принять решение, которое принимают только ответственные,", "принять решение, которое вправе принимать только ответственные,");
  reviewed(k, READERS);
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
  if (/оглавлени|Ближайшая ошибка/.test(ru)) problems.push(`${key}: the Russian still says «оглавление» or «Ближайшая ошибка»`);
  if (/closest mistake| included\b|at the top of|top node|standing approval|stands for/.test(en)) problems.push(`${key}: a phrase that a ruling of round e replaces is left: ${en.match(/closest mistake| included\b|at the top of|top node|standing approval|stands for/)[0]}`);
  for (const sentence of [p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

// The English of every node of the group, and the sentences that this round changed.
const md = [
  "# T25, group 1: the English of every node",
  "",
  "This file holds the final English of every node of group 1 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group1-e.mjs: the drafts of the appendix of the tools and the proposals for nodes outside it.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "A node in a cell of a table has no title of its own, so a row is headed by its location.",
  "fix-group1-e.mjs writes this file; edit the drafts, not this file.",
  "",
];
const changed = [
  "# T25, group 1: the sentences that round e changed",
  "",
  "This file holds each sentence of group 1 that fix-group1-e.mjs changed, as it now reads, under the key of its node in `tools-drafts.json`.",
  "A sentence is listed when the node's English held no identical sentence before round e. The whole English of each node is in `english-group1.md`.",
  "fix-group1-e.mjs writes this file; edit the drafts, not this file.",
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
fs.writeFileSync(new URL("english-group1-changed.md", here), changed.join("\n"));
console.log(`rewrote ${GROUP.length} keys, english-group1.md and english-group1-changed.md; ${closest} examples now name the most likely mistake`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
