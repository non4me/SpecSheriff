// T25, stage 2, group 1, round b: applies the findings of specsheriff-rule-reviewer's four reports (review-g1-a.md to
// review-g1-d.md) to the drafts that propose-group1.mjs wrote, adds the new node for row 10.1.12 that report C asks for,
// and writes, under keys beginning "proposal:", the new wordings that only the owner can agree to. Copies
// tools-drafts.json to tools-drafts.before-group1-b.json first. Run again, it rebuilds the keys of this group from that
// copy and leaves every other key as tools-drafts.json holds it. It checks every draft before it writes.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group1-b.json", here);
const firstRun = !fs.existsSync(beforeUrl);
const before = JSON.parse(fs.readFileSync(firstRun ? url : beforeUrl, "utf8"));
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-23";

const GROUP = ["s-stxmhq3hgfndvn6", "new:tools-7-1-location", "s-95w92rnjuv3sst8", "new:tools-7-1-approval-by", "s-agc6fb3vx46pc23",
  "new:tools-7-1-one-header", "s-qzyacnqwvaeaps4", "s-pvnnr844f3y964m", "s-e2vdhfsndy5stq9", "s-zhen42p6mnaxu7w", "s-qvgzubkrafadqgf",
  "new:tools-7-1-consumes", "new:tools-7-1-guidelines-to-extension", "s-yprj7d6tnvauggr", "s-6bmnsbskg6en4nf"];
// On a re-run, this group's keys start again from the copy; the keys this script adds are removed first.
for (const k of GROUP) drafts[k] = structuredClone(before[k]);
for (const k of Object.keys(drafts)) if ((k.startsWith("proposal:") || k === "new:tools-7-1-link-target") && !(k in before)) delete drafts[k];

const SID = {
  linkTarget: "s-c4rn9fj4czk768b",
  headerStatus: "s-yccuyqbypzzx2gu",
  headerStatusRow: "s-bn8rvk6du2jkf2d",
};

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
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
const setPart = (key, prefix, part) => { E(key).proposal.parts[at(key, prefix)] = part; };
const cutPart = (key, prefix) => { E(key).proposal.parts.splice(at(key, prefix), 1); };
const insertAfter = (key, prefix, ...parts) => { E(key).proposal.parts.splice(at(key, prefix) + 1, 0, ...parts); };
const reason = (key, en, ru, change) => Object.assign(E(key).proposal, { reason: en, ruReason: ru, ...(change ? { reasonChange: change } : {}) });
const refs = (key, list) => { E(key).proposal.refs = list; };
const examples = (key, list) => { E(key).proposal.examples = list; };
const removed = (key, ...lines) => { E(key).proposal.removed = [...(E(key).proposal.removed || []), ...lines]; };
const stage3 = (key, text) => { E(key).stage3 = text; };
const reviewed = (key, report) => { E(key).review = `specsheriff-rule-reviewer, ${DATE}: ${report}; fix-group1-b.mjs applied its findings`; };

// ---------------------------------------------------------------------------------------------------------------
// Report A
// ---------------------------------------------------------------------------------------------------------------
{ // s-stxmhq3hgfndvn6
  const k = "s-stxmhq3hgfndvn6";
  setPart(k, "`sheriff validate` checks each node", P(
    "`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6).",
    "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).",
    "Новое в тексте. «Каждый узел спецификации» — как требует заметка в файле продолжения. Архив — не часть спецификации, поэтому он не проверяется, по вашему решению по строке 10.1.5 от 2026-11-12. Узлы в ячейках — новое: у них тоже есть расположения. В проекте SpecSheriff guidelines и выбранные расширения приходят из плагина, поэтому проверяются только файлы, которые хранит репозиторий."));
  reason(k,
    "A location tells a reader where a node is only while it is the computed one. `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw), so a location that differs was written by hand, or left by a move of the node that no `sheriff reindex` followed.",
    "Расположение говорит читателю, где находится узел, только пока оно совпадает с вычисленным. `sheriff reindex` пишет каждое расположение после каждой правки, которую делает агент (§s-477gtdrkw34dzxw), поэтому расположение, которое отличается от вычисленного, написано вручную или осталось после переноса узла, за которым не последовал `sheriff reindex`.");
  refs(k, [R("implements", "s-tvxhtjbj7mmpmnx"), R("cites", "s-ygg5kpcxgzq3m7w"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-477gtdrkw34dzxw")]);
  reviewed(k, "review-g1-a.md");
}
{ // s-ygg5kpcxgzq3m7w, rewritten to rest on the proposed general sentence of rule 8.5
  const k = "new:tools-7-1-location";
  E(k).proposal.parts = [
    P("The SpecSheriff tools compute the location of each node of the specification in the files that the repository keeps (§s-kag2m9tzdnduxdx) from the path of the node's file and from the node's place in the specification.",
      "Инструменты SpecSheriff вычисляют расположение каждого узла спецификации в файлах, которые хранит репозиторий (§s-kag2m9tzdnduxdx), по пути к файлу узла и по месту узла в спецификации.",
      "Новое: вынесено из узла «Locations computed anew», который теперь только сверяет расположения. Вычисление нужно и `sheriff reindex`, который пишет расположения, поэтому оно стоит в своём узле. Вычисляются расположения только узлов в файлах, которые хранит репозиторий: у файлов из плагина нет пути внутри `specs/`."),
    P("The node at the top of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5) takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations are `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header is the node that its part opens with (§s-yggv9myedprnaa7), so it takes the domain's name as its location.",
      "Узел на вершине файла guidelines или технического приложения (§s-tj38pvm38nepaf5) получает расположением путь к этому файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u). Таковы расположения `_guidelines/spec`, `_guidelines/extensions/domains` и `tech/stack`. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена — узел, которым открывается его часть (§s-yggv9myedprnaa7), поэтому он получает расположением имя домена.",
      "Новое в тексте; так делает код. Первая фраза — как в правиле 8.5; путь назван целиком, потому что файлы расширений guidelines лежат во вложенной папке. Последняя фраза опирается на предлагаемое общее предложение правила 8.5 об узле, которым открывается часть (вопрос 1): заголовок домена — такой узел по правилу 11.1.3."),
    P("Every other node's location is one of the following, followed by a slash and the node's place:",
      "Расположение любого другого узла — одно из следующего, затем косая черта и место узла:",
      "Новое в тексте; так делает код."),
    L("in a file of the guidelines or of the technical appendix, the location of the node at the top of that file, as in `_guidelines/spec/1.3.4`;",
      "в файле guidelines или технического приложения — расположение узла на вершине этого файла, как в `_guidelines/spec/1.3.4`;",
      "Как в правиле 8.5."),
    L("in the base specification (§s-5x737t9nee4zgaa), the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.",
      "в базовой спецификации (§s-5x737t9nee4zgaa) — имя папки внутри `specs/`, в которой лежит файл узла, как в `base/3.2`, `contracts/1` или `requests/2`.",
      "Как в правиле 8.5. Узел на вершине файла раздела контрактов теперь нумеруется, как любой другой узел базовой спецификации. Раньше код давал ему расположение `contracts/<файл>`, а узлы под ним нумеровал подряд под `contracts`, как говорило прежнее правило 1.4; согласованное правило 8.5 этого больше не говорит. При первом `sheriff reindex` нового выпуска расположения в разделе контрактов каждого проекта сменятся; по расположению ничто не ссылается. См. вопрос 1."),
    P("Every node is numbered except the following:",
      "Нумеруется каждый узел, кроме следующих:",
      "Новое в тексте; так делает код. Исключения — списком, по замечанию рецензента."),
    L("a term (§s-ypa92gpcj3f5zj8);", "термина (§s-ypa92gpcj3f5zj8);", "Как в правиле 8.5."),
    L("the node at the top of a file of the guidelines or of the technical appendix;", "узла на вершине файла guidelines или технического приложения;", "Как в правиле 8.5."),
    L("a domain's header.", "заголовка домена.", "По предлагаемому общему предложению правила 8.5 (вопрос 1)."),
    P("A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`.",
      "Место пронумерованного узла — его порядковый номер среди пронумерованных узлов под его родителем, считая с единицы. Если родитель тоже пронумерован, перед этим номером стоят место родителя и точка, как в `3.2`.",
      "Новое в тексте; так делает код. Правило 8.5 не говорит, как записывается место вложенного узла; на этот пробел рецензент указывал при согласовании правила 8.5."),
    P("The SpecSheriff tools take the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.",
      "Пронумерованные узлы под узлом инструменты SpecSheriff берут в порядке его дочерних узлов. Под `TableRule` (§s-5fewsp22mmdz7y6) после его дочерних узлов идут узлы в его ячейках: строка за строкой по всем его группам, а внутри строки — столбец за столбцом.",
      "Новое. Правило 8.5 не говорит, как нумеруется узел в ячейке `TableRule` (открытая проблема P2 в stage2-inventory.md). Узел следует правилу 8.5: узел в ячейке находится под своим `TableRule`, поэтому его место — номер среди узлов под ним. Строки нумеруются подряд через все группы, поэтому временные номера вроде 10.1.20a при первом `sheriff reindex` станут целыми."),
    P("In a folder of the base specification, the nodes at the top of its files and the children of a domain's header are considered nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths. The nodes at the top of one file are taken in the order in which the file lists them.",
      "В папке базовой спецификации узлы на вершине её файлов и дочерние узлы заголовка домена считаются узлами под одним родителем. Инструменты SpecSheriff берут их файл за файлом, в порядке кодовых точек путей к файлам. Узлы на вершине одного файла берутся в том порядке, в каком их перечисляет файл.",
      "Новое в тексте; так делает код. Порядок кодовых точек путей — новое: код сравнивает имена файлов с учётом локали, и порядок может зависеть от машины."),
    P("In a file of the guidelines or of the technical appendix, a further node at the top of the file is numbered under the location of the first node, after that node's children.",
      "В файле guidelines или технического приложения следующий узел на вершине файла нумеруется под расположением первого узла, после его дочерних узлов.",
      "Новое в тексте; так делает код (model.ts:89). Рецензент попросил сказать, что бывает с таким узлом."),
  ];
  reason(k,
    "`sheriff reindex` writes each node's location, and `sheriff validate` compares the location in each file with the one computed (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Both therefore need one computation that gives every node a location of its own, the same on every machine.",
    "`sheriff reindex` записывает расположение каждого узла, а `sheriff validate` сверяет расположение в каждом файле с вычисленным (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Поэтому обоим нужно одно вычисление, которое даёт каждому узлу собственное расположение, одно и то же на любой машине.",
    "Новое.");
  examples(k, [X(
    "A domain `requests` is kept in three files: `specs/requests/00-requests.json` holds its header, `specs/requests/intake.json` holds one section, and `specs/requests/review.json` holds another. The header's location is `requests`, and the sections are `requests/1` and `requests/2`. The fourth node of the second section is a `TableRule`, `requests/2.4`, each of whose rows holds one node, so the node in its third row is `requests/2.4.3`. A term `request` in `specs/contracts/terms.json` is `contracts/request`. The closest mistake is to number each file from one, which gives both sections the location `requests/1`.",
    "Домен `requests` хранится в трёх файлах: в `specs/requests/00-requests.json` — его заголовок, в `specs/requests/intake.json` — один раздел, в `specs/requests/review.json` — другой. Расположение заголовка — `requests`, разделов — `requests/1` и `requests/2`. Четвёртый узел второго раздела — `TableRule` `requests/2.4`, в каждой строке которого по одному узлу, поэтому узел в его третьей строке — `requests/2.4.3`. Термин `request` в `specs/contracts/terms.json` — `contracts/request`. Ближайшая ошибка — нумеровать каждый файл с единицы: тогда оба раздела получают расположение `requests/1`.")]);
  refs(k, [R("implements", "s-kag2m9tzdnduxdx"), R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-5x737t9nee4zgaa"), R("cites", "s-ypa92gpcj3f5zj8"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ztseyetus7np6br"), R("cites", "s-stxmhq3hgfndvn6")]);
  E(k).dependsOn = ["proposal:s-kag2m9tzdnduxdx"];
  reviewed(k, "review-g1-a.md");
}
{ // s-95w92rnjuv3sst8
  const k = "s-95w92rnjuv3sst8";
  setPart(k, "`sheriff validate` refuses each approved node", P(
    "`sheriff validate` refuses each approved node for which no approval of its current wording stands (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
    "`sheriff validate` отвергает каждый одобренный узел, для нынешней формулировки которого нет действующего одобрения (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx).",
    "Было: «`sheriff validate` ищет каждый одобренный узел в одобрениях. Последняя строка для sid узла и отпечатка его формулировки должна быть одобрением». Теперь узел начинается с того, что отвергается и что называет отказ. Что значит «одобрение действует», говорит узел «How an approval is recorded»."));
  setPart(k, "`sheriff validate` checks each node", P(
    "`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It leaves out the following nodes, whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br):",
    "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он не проверяет следующие узлы, статус одобрения которых `sheriff reindex` выводит из других узлов (§s-ztseyetus7np6br):",
    "Было: «Не проверяются: узлы SpecSheriff guidelines, которые берёт проект; раздел и заголовок домена». Узлы SpecSheriff guidelines и выбранных расширений проект берёт из плагина, поэтому достаточно сказать «в файлах, которые хранит репозиторий»: так исключаются и выбранные расширения, как требует строка 10.1.8 по вашему решению от 2026-11-18. Узлы в ячейках — новое."));
  insertAfter(k, "`sheriff validate` checks each node",
    L("each section;", "разделы;", "Как было; строка 10.1.8."),
    L("each domain's header, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu).",
      "заголовки доменов, если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu).",
      "Как было. Опирается на предлагаемое правило расширения Domains о статусе одобрения заголовка домена, которое исполняет ваше решение от 2026-11-06, и на предлагаемую формулировку строки 10.1.8."));
  reason(k,
    "A node's approval status is written in its file, where anyone can set it to `approved` by hand. The approval itself is recorded apart from the node, in `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb). Comparing the two finds an approval status typed by hand and one left `approved` after the wording changed.",
    "Статус одобрения узла записан в его файле, где кто угодно может вручную поставить `approved`. Само одобрение записывается отдельно от узла, в `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb). Сравнение того и другого находит статус одобрения, напечатанный вручную, и статус `approved`, оставшийся после изменения формулировки.");
  examples(k, [X(
    "A person edits the text of an approved rule by hand and commits the change without running `sheriff reindex`. `sheriff validate` refuses the rule, since no approval stands for its new wording. Had `sheriff reindex` run, it would have made the rule a draft, and the check would have passed.",
    "Человек вручную правит текст одобренного правила и коммитит изменение, не запустив `sheriff reindex`. `sheriff validate` отвергает правило: для его новой формулировки нет действующего одобрения. Если бы `sheriff reindex` был запущен, он сделал бы правило черновиком, и проверка прошла бы.")]);
  refs(k, [R("implements", "s-cey3k9xxjvkpyqz"), R("cites", "s-v4qus7raqnwzneb"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ztseyetus7np6br"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", SID.headerStatus)]);
  E(k).dependsOn = ["proposal:domains-header-status", "proposal:row-10-1-8"];
  reviewed(k, "review-g1-a.md");
}
{ // s-75ue25v6r23jkk8
  const k = "new:tools-7-1-approval-by";
  setPart(k, "`sheriff validate` accepts an approval", P(
    "`sheriff validate` accepts an approval (§s-v4qus7raqnwzneb) that a commit adds to `specs/_approvals.jsonl` only where both of the following hold:",
    "`sheriff validate` принимает одобрение (§s-v4qus7raqnwzneb), которое коммит добавляет в `specs/_approvals.jsonl`, только если выполнено и то и другое:",
    "Из узла «An approved node's approval». Было: «`sheriff validate` ищет того, кого называет строка одобрения, среди ответственных за её узел в том виде, в каком их содержит коммит; так он делает для каждого одобрения, которое коммит добавляет к одобрениям родителя». Теперь сказано, что принимается и что называет отказ. Это отдельное требование, строка 10.1.9, поэтому оно стоит в своём узле."));
  insertAfter(k, "`sheriff validate` accepts an approval",
    L("its node is in the files that the repository keeps;", "его узел находится в файлах, которые хранит репозиторий;",
      "Новое, по замечанию рецензента: строка 10.1.9 говорит «каждое одобрение», а одобрение sid, которого нет в файлах репозитория, начало бы действовать, когда появится узел с этим sid и этой формулировкой."),
    L("it names an owner of that node (§s-6sk8uet75dmq5qz) as of that commit (§s-acacahc8c9estmr).",
      "оно называет ответственного за этот узел (§s-6sk8uet75dmq5qz) на момент этого коммита (§s-acacahc8c9estmr).",
      "Строка 10.1.9."),
    P("`sheriff validate` refuses any other approval that the commit adds. The refusal names the approval's sid and the email address that the approval names. Where the files that the repository keeps hold the node, the refusal also names the node's file, its location (§s-kag2m9tzdnduxdx) and its owners.",
      "Любое другое одобрение, которое добавляет коммит, `sheriff validate` отвергает. Отказ называет sid одобрения и адрес электронной почты, который называет одобрение. Если узел находится в файлах, которые хранит репозиторий, отказ называет также файл, расположение (§s-kag2m9tzdnduxdx) и ответственных за узел.",
      "Новое: что называет отказ. Sid одобрения назван, потому что узла может не быть."));
  setPart(k, "`sheriff validate` checks only the approvals", P(
    "`sheriff validate` finds a node's owners as the model of the specification gives them (§s-w6gybeqn2ttydqx). Of the lines that a commit adds, it checks only approvals.",
    "Ответственных за узел `sheriff validate` находит так, как их даёт модель спецификации (§s-w6gybeqn2ttydqx). Из строк, которые добавляет коммит, он проверяет только одобрения.",
    "Новое в тексте; так делает код. Особый случай правила, которое одобряло спецификацию, убран: статус одобрения спецификации теперь задают записи в `sheriff.config.json` (правило 10.6), а их проверяет строка 10.1.27."));
  reason(k,
    "Only a node's owners may approve it, while anyone may withdraw an approval (§s-67vekyup7y8smap, §s-fpq35tf3pehgk64). A node's owners may change from one commit to the next, so each approval is judged in the commit that adds it. A later change of owners then leaves in force the approvals given before it.",
    "Одобрить узел могут только ответственные за него, а отозвать одобрение может кто угодно (§s-67vekyup7y8smap, §s-fpq35tf3pehgk64). Ответственные за узел могут меняться от коммита к коммиту, поэтому каждое одобрение оценивается в том коммите, который его добавляет. Тогда последующая смена ответственных оставляет в силе одобрения, данные до неё.");
  refs(k, [R("implements", "s-acacahc8c9estmr"), R("cites", "s-v4qus7raqnwzneb"), R("cites", "s-6sk8uet75dmq5qz"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-gb8s9657a65hqmv"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-67vekyup7y8smap"), R("cites", "s-fpq35tf3pehgk64")]);
  stage3(k, E(k).stage3 + " validate.ts:109 is to stop skipping an approval whose sid no node of the repository's files holds, and to refuse it.");
  reviewed(k, "review-g1-a.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report B
// ---------------------------------------------------------------------------------------------------------------
{ // s-agc6fb3vx46pc23
  const k = "s-agc6fb3vx46pc23";
  E(k).proposal.parts = [
    P("`sheriff validate` computes the following values as `sheriff reindex` writes them (§s-ztseyetus7np6br):",
      "`sheriff validate` вычисляет следующие значения так, как их пишет `sheriff reindex` (§s-ztseyetus7np6br):",
      "Было: «`sheriff validate` заново строит в памяти следующее и сравнивает с тем, что закоммичено». Теперь сказано, что значения вычисляются так, как их пишет `sheriff reindex` по согласованному узлу «What `sheriff reindex` writes». Как вычисляется каждое значение, говорит только тот узел, поэтому его оговорки об узлах в ячейках и об указателе перенесены туда (предложение)."),
    L("the links pointing at each node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;",
      "связи, указывающие на каждый узел (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), сравниваемые без учёта их порядка;",
      "Строка 10.1.16. Порядок не сравнивается: так делает код."),
    L("the approval status of each section (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);",
      "статус одобрения каждого раздела (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);",
      "Строка 10.1.10. Что в статус раздела входят и узлы в ячейках `TableRule`, теперь говорит узел «What `sheriff reindex` writes» (предложение)."),
    L("where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);",
      "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — статус одобрения заголовка каждого домена (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);",
      "Новое, по предложению о статусе одобрения заголовка домена: правило расширения Domains и строка таблицы 11.3, которые исполняют ваше решение от 2026-11-06. Код это уже сравнивает."),
    L("where the project has chosen the Domains extension, the index of sections in each domain's header (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);",
      "если проект выбрал расширение Domains, — указатель разделов в заголовке каждого домена (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);",
      "Строка 11.3.2. Оговорка «только если у домена есть разделы» перенесена в узел «What `sheriff reindex` writes» (предложение); она — по вашему решению по строке 11.3.2 от 2026-11-18."),
    L("where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside each field with `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).",
      "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — значения, собранные рядом с каждым полем с `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).",
      "Строка 12.12.14 таблицы проверок расширения RecordType. Поле «с `enum`» вместо поля «типа `one of`» — по вашему решению от 2026-11-19."),
    P("`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It refuses each node whose value in its file differs from the one computed. The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and says which of these values differs.",
      "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он отвергает каждый узел, значение которого в его файле отличается от вычисленного. Отказ называет файл, sid и расположение узла в спецификации (§s-kag2m9tzdnduxdx) и говорит, какое из этих значений отличается.",
      "Новое в тексте: какие узлы проверяются, что отвергается и что называет отказ."),
  ];
  examples(k, [X(
    "A section holds a `TableRule`, one cell of which holds a draft node, and every other node under the section is approved. `sheriff validate` computes the section's approval status as draft, and refuses the section if its file marks it approved. The closest mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell.",
    "Раздел содержит `TableRule`, в одной из ячеек которой — узел-черновик, а все остальные узлы под разделом одобрены. `sheriff validate` вычисляет статус одобрения раздела как «черновик» и отвергает раздел, если его файл отмечает раздел одобренным. Ближайшая ошибка — считать только узлы из `children` узла: так узел в ячейке пропускается.")]);
  refs(k, [R("implements", "s-xdk44dt9uxdeb2b"), R("implements", "s-k3hrk8u9uz9mpz7"), R("implements", SID.headerStatusRow), R("implements", "s-6n2ab7escdtspwe"), R("implements", "s-93jpnb4c96qhwbu"),
    R("cites", "s-ztseyetus7np6br"), R("cites", "s-bpdqd9v72wg7vsz"), R("cites", "s-9kfdycuq34beqvs"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", SID.headerStatus), R("cites", "s-2r59txnms5serdr"),
    R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-ju5vcanbjph7mgh"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-kag2m9tzdnduxdx")]);
  E(k).proposal.removed = E(k).proposal.removed.filter((r) => !r.startsWith("The comparison of the approval status of a domain's header"));
  E(k).dependsOn = ["proposal:domains-header-status", "proposal:11-3-header-status-row", "proposal:s-ztseyetus7np6br"];
  stage3(k, "validate.ts: a section's status is to count the nodes in the cells of a TableRule (builtStatuses in model.ts walks only children); the status of a domain's header keeps being compared (line 99), as the proposed row of table 11.3 asks; a header of a domain without sections is to hold no index, where reindex.ts:176-181 writes an empty one; the gathered values are to be read from `x-enumSource.gathered` (validate.ts:370-377); in a project, spec.nodes include the SpecSheriff guidelines taken from the plugin, and only the nodes of the files that the repository keeps are to be compared. The test \"refuses values gathered beside a field...\" (validate.test.ts:508) keeps s-agc6fb3vx46pc23; the tests at validate.test.ts:154, :245 and :279 are to carry it as well.");
  reviewed(k, "review-g1-b.md");
}
{ // s-8esbyvaj2yx5eqf
  const k = "new:tools-7-1-one-header";
  reason(k,
    "A domain may be kept in several files (§s-k73czmpkazcx7mu). So only a reading of all of them shows a missing header or a second one.",
    "Домен может храниться в нескольких файлах (§s-k73czmpkazcx7mu). Поэтому недостающий или второй заголовок видно, только если прочитать их все.");
  examples(k, [X(
    "The domain `requests` is kept in `specs/requests/00-requests.json` and `specs/requests/intake.json`, and whoever split it opened the second file with a new header as well. `sheriff validate` refuses the domain and names both headers. Once the second file holds only sections, the domain passes.",
    "Домен `requests` хранится в `specs/requests/00-requests.json` и `specs/requests/intake.json`, и тот, кто его разделил, открыл второй файл ещё одним, новым заголовком. `sheriff validate` отвергает домен и называет оба заголовка. Когда во втором файле остаются только разделы, домен проходит проверку.")]);
  reviewed(k, "review-g1-b.md");
}
{ // s-p3n666zfjdrrw6a
  const k = "new:tools-7-1-consumes";
  E(k).proposal.parts = [
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает связь `consumes`, только если она идёт от заголовка домена к разделу в файлах другого домена (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). Файлы домена — это файлы в его папке `specs/<domain>/` (§s-zefk589ykh37b8u).",
      "Из узла «`consumes` and `exempts` links». Было: «связь `consumes` — на заголовок домена в её начале и раздел другого домена в её конце». Теперь это отдельный узел, потому что строка 11.3.3 принадлежит таблице проверок расширения Domains, а не основной таблице проверок. Что такое файлы домена, сказано теперь в тексте, как в узле «One header for each domain»: раздел в `specs/tech/<domain>.json` к домену не относится."),
    P("`sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.",
      "Любую другую связь `consumes` `sheriff validate` отвергает, называя файл, sid и расположение в спецификации (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи.",
      "Новое в тексте: что называет отказ."),
  ];
  reason(k,
    "The index in a domain's header, and the check for a cycle in which domains use one another, both learn from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would show a use that no domain makes.",
    "Указатель в заголовке домена и проверка цикла, в котором домены пользуются друг другом, узнают из связей `consumes`, какой домен каким разделом пользуется (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Любая другая связь `consumes` показала бы использование, которого нет ни у одного домена.");
  examples(k, [X(
    "The header of the domain `requests` declares a `consumes` link to the section of the domain `users` that describes how a user signs in, and `sheriff validate` accepts the link. The closest mistake is to point the link at the rule in that section that the domain relies on, and `sheriff validate` then refuses the link.",
    "Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, который описывает, как пользователь входит в систему, и `sheriff validate` эту связь принимает. Ближайшая ошибка — направить связь на то правило этого раздела, на которое опирается домен: тогда `sheriff validate` связь отвергает.")]);
  refs(k, [R("implements", "s-rdavpdea67hsntf"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-2r59txnms5serdr"), R("cites", "s-bncp7gtyaukur8e")]);
  reviewed(k, "review-g1-b.md");
}
{ // s-qvgzubkrafadqgf
  const k = "s-qvgzubkrafadqgf";
  setPart(k, "the link's target is a section or a rule", L(
    "the link's target is a section or a rule, a rule being a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);",
    "цель связи — раздел или правило; правилом здесь считается узел типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp) либо узел собственного типа в проекте (§s-vsh384ybt4w25a2);",
    "Было: «правило, узел собственного NodeKind проекта или раздел». Имя NodeKind вы убрали 2026-11-10. `TableRule` и RecordType — тоже правила: по правилу 8.6 и по правилу 12.3a, которое вы согласовали 2026-11-21."));
  setPart(k, "`sheriff validate` looks for that citation", P(
    "`sheriff validate` refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and naming the link's target.",
    "Любую другую связь `exempts` `sheriff validate` отвергает, называя файл, sid и расположение в спецификации (§s-kag2m9tzdnduxdx) узла, который её объявляет, и цель связи.",
    "Новое: что называет отказ. Что ссылка в заголовке или в обосновании не считается, как вы указали в todo строки 10.1.19, говорит третий пункт списка: он называет текст узла."));
  reason(k,
    "A node states what it requires in its text, while its reason requires nothing (§s-dpe5kcz4eamv39g). So only a citation in the text of the exempting node shows that its approved wording names what it exempts (§s-gf6n8ge4mke3pr2).",
    "Узел формулирует, чего он требует, в своём тексте, а его обоснование ничего не требует (§s-dpe5kcz4eamv39g). Поэтому только ссылка в тексте освобождающего узла показывает, что его одобренная формулировка называет то, что он освобождает (§s-gf6n8ge4mke3pr2).");
  examples(k, [X(
    "A rule of `project.json` exempts the rule of the stack that chooses the programming language, since no symbol of the code can implement that choice. The exempting rule's text says so and cites that rule of the stack. The exempting rule also declares an `exempts` link to it, so `sheriff validate` accepts the link. The closest mistake is to cite the rule of the stack only in the reason, and `sheriff validate` then refuses the link.",
    "Правило `project.json` освобождает от имплементации правило стека, выбирающее язык программирования, потому что ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила говорит это и ссылается на правило стека. Освобождающее правило также объявляет с ним связь `exempts`, поэтому `sheriff validate` связь принимает. Ближайшая ошибка — сослаться на правило стека только в обосновании: тогда `sheriff validate` связь отвергает.")]);
  refs(k, [R("implements", "s-6u54kfn4ze29r6h"), R("cites", "s-gf6n8ge4mke3pr2"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-cxtt6jvhqcey2k9"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-dpe5kcz4eamv39g")]);
  reviewed(k, "review-g1-b.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report C
// ---------------------------------------------------------------------------------------------------------------
{ // s-qzyacnqwvaeaps4, with row 10.1.12 moved into the new node below
  const k = "s-qzyacnqwvaeaps4";
  E(k).proposal.parts = [
    P("`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6):",
      "`sheriff validate` отвергает каждое из следующего в узле спецификации в файлах, которые хранит репозиторий, в том числе в узле в ячейке `TableRule` (§s-5fewsp22mmdz7y6):",
      "Было: «`sheriff validate` читает ссылки в каждом узле и сопоставляет их со связями узла». Теперь узел начинается с того, что отвергается, по строкам 10.1.13 и 10.1.14. Строка 10.1.12 о цели связи вынесена в новый узел «The target of a link», по замечанию рецензента: её можно проверить без определения ссылки."),
    L("a sid other than its own that the node cites without declaring a link whose target is that sid (§s-vwyke96ggxx79je);",
      "sid, кроме собственного, на который узел ссылается, не объявляя связи, цель которой — этот sid (§s-vwyke96ggxx79je);",
      "Строка 10.1.13, первая фраза. Что ссылка на собственный sid связи не требует, теперь стоит в этом пункте: правило 6.3 требует связи с каждым другим узлом."),
    L("a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);",
      "связь `cites` с узлом, на который узел не ссылается, или с узлом, с которым узел объявляет и связь другого типа (§s-vwyke96ggxx79je);",
      "Строка 10.1.13, вторая фраза."),
    L("a citation by location (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).",
      "ссылка по расположению (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).",
      "Строка 10.1.14."),
    P("The refusal names the node by its file, its sid and its location, and names the link or the citation.",
      "Отказ называет файл, sid и расположение узла, а также связь или ссылку.",
      "Новое в тексте; так делает код."),
    P("A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9). A `§` followed by one or more other characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.",
      "`§`, за которым следует sid, а за ним нет строчной буквы или цифры, — ссылка на этот sid, в том числе в тексте в обратных кавычках (§s-cxtt6jvhqcey2k9). `§`, за которым следует один или более других знаков, до пробельного символа, запятой, точки с запятой или закрывающей скобки, — ссылка по расположению, если только он не стоит в тексте в обратных кавычках.",
      "Как было, сказано точнее, как читает код (model.ts:114): ссылка по расположению — один или более знаков до пробельного символа. В тексте в обратных кавычках sid считается ссылкой, а расположение — нет, как в строке 10.1.14."),
    P("`sheriff validate` reads every property of the node for citations except the following (§s-cxtt6jvhqcey2k9):",
      "При поиске ссылок `sheriff validate` читает все свойства узла, кроме следующих (§s-cxtt6jvhqcey2k9):",
      "Было: «Оглавление заголовка и значения, собранные рядом с полем, не читаются». Теперь перечислено всё, что исключает правило 6.3, вместе с узлами в ячейках `TableRule`. Абзац о текстовых ячейках `TableRule` убран по замечанию рецензента: он следует из «все свойства»."),
    L("its links;", "его связей;", "Из правила 6.3."),
    L("the nodes under it, the nodes in its cells included;", "узлов под ним, в том числе узлов в его ячейках;", "Из правила 6.3; узлы в ячейках — новое."),
    L("the index of the sections in a domain's header (§s-2r59txnms5serdr) and the values gathered in a field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh), which are built from other nodes.",
      "указателя разделов в заголовке домена (§s-2r59txnms5serdr) и значений, собранных в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh): они построены из других узлов.",
      "Как было; названо, где лежат собранные значения."),
  ];
  reason(k,
    "Whoever changes a node learns from the links pointing at it which nodes rely on it (§s-cxtt6jvhqcey2k9). Those links are complete only where every citation, in whatever property of a node it stands, names a node by its sid and is matched by a declared link.",
    "Тот, кто меняет узел, узнаёт, какие узлы на него опираются, по связям, указывающим на него (§s-cxtt6jvhqcey2k9). Эти связи полны, только если каждая ссылка, в каком бы свойстве узла она ни стояла, называет узел по его sid и ей соответствует объявленная связь.",
    "Было: «Узел может показать в обратных кавычках, как выглядит отвергнутая ссылка». Теперь обоснование говорит, зачем нужна проверка.");
  refs(k, [R("implements", "s-vwyke96ggxx79je"), R("implements", "s-whftqmshzc5wzhw"), R("implements", "s-cxtt6jvhqcey2k9"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-2r59txnms5serdr"), R("cites", "s-ju5vcanbjph7mgh")]);
  E(k).proposal.removed = [
    "The `implements` links to the main table of checks (s-jau82aq9juv9zzh) and to “Incoming links are built” (s-bpdqd9v72wg7vsz): the node implements rows 10.1.13 and 10.1.14 and “A cited node is also linked” (s-cxtt6jvhqcey2k9), which says what a citation is.",
    "Resolving a link's target: it moved to the new node “The target of a link” (s-c4rn9fj4czk768b), which implements row 10.1.12.",
  ];
  E(k).testsFrom = ["s-qzyacnqwvaeaps4", "a citation without a link", "a cites link beside a link of another type", "a node citing another by its location", "reads the citations of a node"];
  stage3(k, "model.ts:112 (NOT_CITING) is to set aside the nodes in the cells of a TableRule and `x-enumSource.gathered`, and to read the text cells and the headings of a TableRule. The checks are to read only the nodes of the files that the repository keeps and the nodes in their cells. The tests at validate.test.ts:211 (its second half), :223 and :230 and model.test.ts:48 are to carry s-qzyacnqwvaeaps4.");
  reviewed(k, "review-g1-c.md");
}
drafts["new:tools-7-1-link-target"] = {
  from: "s-qzyacnqwvaeaps4",
  location: "tools 7.1.7a (new, before \"Outgoing links and citations\")",
  sidValue: SID.linkTarget,
  testsFrom: ["a link to no node"],
  proposal: {
    title: "The target of a link",
    ruTitle: "Цель связи",
    parts: [
      P("`sheriff validate` refuses each link whose target is a sid that no node of the model of the specification holds (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It checks each link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.",
        "`sheriff validate` отвергает каждую связь, цель которой — sid, которого нет ни у одного узла модели спецификации (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). Он проверяет каждую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Отказ называет файл, sid и расположение в спецификации (§s-kag2m9tzdnduxdx) узла, который объявляет связь, а также тип связи и её цель.",
        "Из узла «Outgoing links and citations», по замечанию рецензента: строку 10.1.12 можно проверить без определения ссылки, поэтому она стоит в своём узле. Было: «`sheriff validate` разрешает цель каждой исходящей связи среди существующих sid». Цель ищется только среди узлов модели спецификации: у архивного узла нет sid, а тип связи `supersedes` убран, по вашему решению по строке 10.1.12 от 2026-11-13. Модель названа ссылкой на согласованный узел о ней, чтобы не перечислять снова, какие узлы она содержит."),
    ],
    reason: "Only a link whose target is a node of the specification can be followed, and only such a link is built into the node that it points at (§s-bpdqd9v72wg7vsz).",
    ruReason: "По связи можно перейти и она строится в узле, на который указывает (§s-bpdqd9v72wg7vsz), только если её цель — узел спецификации.",
    reasonChange: "Новое.",
    examples: [X(
      "A rule keeps a `refines` link to a rule that a later commit removed and archived. `sheriff validate` refuses the link, since no node of the specification holds the removed rule's sid any longer.",
      "Правило сохраняет связь `refines` с правилом, которое более поздний коммит удалил и отправил в архив. `sheriff validate` отвергает эту связь: ни у одного узла спецификации больше нет sid удалённого правила.")],
    refs: [R("implements", "s-x8usyy38qa56k6a"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-bpdqd9v72wg7vsz")],
    removed: [],
    date: DATE,
  },
  stage3: "validate.ts:136-139 resolves a `supersedes` link among the sids of the archive; the type is gone, and a link's target is to be looked for only among the nodes of the model, the nodes in cells included. The first half of the test at validate.test.ts:211 is to carry s-c4rn9fj4czk768b.",
  review: `specsheriff-rule-reviewer, ${DATE}: review-g1-c.md asked for this node; fix-group1-b.mjs wrote it`,
};
{ // s-pvnnr844f3y964m
  const k = "s-pvnnr844f3y964m";
  E(k).proposal.title = "Link types reserved for terms";
  E(k).proposal.ruTitle = "Типы связей, закреплённые за терминами";
  setPart(k, "`sheriff validate` accepts a link of type", P(
    "`sheriff validate` accepts a link of type `term-relation` or `uses` only where it goes from a term node (§s-ypa92gpcj3f5zj8) to another term node (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.",
    "`sheriff validate` принимает связь типа `term-relation` или `uses`, только если она идёт от узла-термина (§s-ypa92gpcj3f5zj8) к другому узлу-термину (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). Связь любого другого типа, в том числе `cites`, он принимает, только если хотя бы на одном её конце узел, который не является узлом-термином.",
    "Было: «`sheriff validate` находит NodeKind узла на каждом конце каждой исходящей связи и сопоставляет его с типом связи». Теперь сказано, какие связи принимаются, по строке 10.1.15. Имя NodeKind вы убрали 2026-11-10."));
  setPart(k, "`sheriff validate` refuses every other link", P(
    "`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be settled with the specification's owners.",
    "Любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6), `sheriff validate` отвергает. Отказ называет файл, sid и расположение (§s-kag2m9tzdnduxdx) узла, который объявляет связь, а также тип связи и её цель. Он говорит, что связь нужно решить с ответственными за спецификацию.",
    "Новое в тексте; так делает код. Что отказ отсылает к ответственным, — из стоимости строки 10.1.15: «отвергается и решается с ответственными за спецификацию»."));
  reason(k,
    "Whether two terms are bound, and how, says how the entities (§s-9w3u3wn37wksyxd) that they name relate, which is for the specification's owners to decide. So the refusal sends whoever wrote the link to them, rather than suggesting a type.",
    "Связаны ли два термина и как, говорит о том, как соотносятся сущности (§s-9w3u3wn37wksyxd), которые они называют, а решать это ответственным за спецификацию. Поэтому отказ отсылает автора связи к ним, а не подсказывает тип.");
  examples(k, [X(
    "A term cites another term and declares a `cites` link to it. `sheriff validate` refuses that link and sends the author to the owners. They decide whether the terms are bound by a `term-relation` link, and with which `ratio`, or by a `uses` link.",
    "Термин ссылается на другой термин и объявляет с ним связь `cites`. `sheriff validate` отвергает эту связь и отсылает автора к ответственным. Те решают, связаны ли термины связью `term-relation`, и с каким `ratio`, или связью `uses`.")]);
  refs(k, [R("implements", "s-s79v9mmyw56hgpx"), R("cites", "s-ypa92gpcj3f5zj8"), R("cites", "s-76dutms9uv6uha2"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-9w3u3wn37wksyxd")]);
  stage3(k, E(k).stage3 + " The second message at validate.ts:150 does not name the link's target and is to name it.");
  reviewed(k, "review-g1-c.md");
}
{ // s-e2vdhfsndy5stq9
  const k = "s-e2vdhfsndy5stq9";
  setPart(k, "`sheriff validate` refuses each run", P(
    "`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the property that holds the run, and the run.",
    "`sheriff validate` отвергает каждые три и более слова подряд, набранные заглавными буквами (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx), свойство, в котором стоят эти слова, и сами слова.",
    E(k).proposal.parts[at(k, "`sheriff validate` refuses each run")].change + " Три аббревиатуры подряд по-прежнему отвергаются; предлагаемая формулировка строки 10.1.17 говорит это и в самой строке (вопрос о строке 10.1.17)."));
  setPart(k, "`sheriff validate` checks each node", P(
    "`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm). It reads a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) as it reads any other node.",
    "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, каким бы ни был его статус. Он читает заголовок, текст и обоснование узла, каждую строку в каждом элементе его `TextRule.list` и каждую текстовую ячейку `TableRule` (§s-qeensty237e6mmm). Узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6) он читает так же, как любой другой узел.",
    E(k).proposal.parts[at(k, "`sheriff validate` checks each node")].change + " В элементе-объекте списка читается каждая строка."));
  setPart(k, "a word set in capitals", L(
    "a word set in capitals is two or more characters long, starts with a capital letter, ends with a capital letter or a digit, holds only capital letters, digits and hyphens, of any script, and has no letter, digit or underscore immediately before or after it;",
    "слово, набранное заглавными, — это слово из двух или более знаков, которое начинается с заглавной буквы, заканчивается заглавной буквой или цифрой, состоит только из заглавных букв, цифр и дефисов, в любой письменности, и непосредственно перед ним и после него нет буквы, цифры или подчёркивания;",
    "Было: «каждое такое слово — из двух или более знаков». Теперь сказано, из чего состоит слово и что его отделяет, как его определяет код (validate.ts:167), в том числе для любой письменности."));
  setPart(k, "a run is three or more", L(
    "a run is three or more such words with only spaces or tabs between them;",
    "слова подряд — это три или более таких слова, между которыми только пробелы или табуляции;",
    "Как было."));
  setPart(k, "text in backticks", L(
    "text in backticks or in straight or typographic double quotation marks is left out.",
    "текст в обратных кавычках или в прямых или типографских двойных кавычках не учитывается.",
    "Как было; сказано, какие двойные кавычки, как в коде. Почему цитата не учитывается, говорит теперь обоснование."));
  reason(k,
    "The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is drawn exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused.",
    "Проверка не понимает текста, поэтому распознаёт фразу, набранную заглавными, только по её форме. Эта форма определена точно, чтобы обычное написание с заглавной и цитаты, которые сохраняют написание того, что цитируют (§s-7anvune6h4f6mbr), никогда не отвергались.");
  examples(k, [X(
    "A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of its sentence. `sheriff validate` refuses the node and names that run. The closest mistake is to let three abbreviations in a row, such as HTTP REST API, pass: `sheriff validate` refuses them too.",
    "Текст правила заканчивается словами «WITHOUT ANY EXCEPTION», написанными как часть предложения. `sheriff validate` отвергает узел и называет эти слова. Ближайшая ошибка — пропустить три аббревиатуры подряд, например HTTP REST API: `sheriff validate` отвергает и их.")]);
  refs(k, [R("implements", "s-83natrftdsmttsu"), R("cites", "s-m6upmfq64kw5h4r"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-qeensty237e6mmm"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-7anvune6h4f6mbr")]);
  E(k).dependsOn = ["proposal:row-10-1-17"];
  reviewed(k, "review-g1-c.md");
}
{ // s-zhen42p6mnaxu7w
  const k = "s-zhen42p6mnaxu7w";
  setPart(k, "`sheriff validate` accepts a section", P(
    "`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp). It refuses any other section, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
    "`sheriff validate` принимает раздел спецификации в файлах, которые хранит репозиторий, только если в разделе есть правило (§s-exxuckgakfxkycp). Любой другой раздел он отвергает, называя его файл, sid и расположение (§s-kag2m9tzdnduxdx).",
    "Было: «`sheriff validate` читает дочерние узлы каждого раздела и каждого раздела внутри него, ища узел, который считается правилом». Теперь узел начинается с того, что принимается и что отвергается. Проверяется каждый раздел, каким бы ни был его статус, как делает код."));
  setPart(k, "a node of the kind `TextRule` or `TableRule`", L(
    "a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), of the kind `RecordType` (§s-ktfstpv8rurznrp);",
    "узел типа `TextRule` или `TableRule` (§s-5fewsp22mmdz7y6), а если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — типа `RecordType` (§s-ktfstpv8rurznrp);",
    "`TableRule` и RecordType названы впервые."));
  reason(k,
    "A section whose rules have all been moved or removed still reads as a part of the specification. Its derived status gives no sign of it.",
    "Раздел, все правила которого перенесены или удалены, по-прежнему выглядит частью спецификации. Его выведенный статус этого не показывает.");
  examples(k, [X(
    "A section holds only a nested section, whose last rule was moved to another file. `sheriff validate` refuses both sections, since neither contains a rule. The closest mistake is to refuse only the nested section.",
    "Раздел содержит только вложенный раздел, последнее правило которого перенесено в другой файл. `sheriff validate` отвергает оба раздела, потому что ни в одном из них нет правила. Ближайшая ошибка — отвергнуть только вложенный раздел.")]);
  refs(k, [R("implements", "s-exxuckgakfxkycp"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-pctqj9wqaq8762t")]);
  reviewed(k, "review-g1-c.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Report D
// ---------------------------------------------------------------------------------------------------------------
{ // s-75r4pg4wdqu3gw5
  const k = "new:tools-7-1-guidelines-to-extension";
  E(k).proposal.parts = [
    P("`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) declares to a node of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. `sheriff validate` makes this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u). There it reads every node of `specs/_guidelines/spec.json` other than a section, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). A node of an extension is a node of a file in `specs/_guidelines/extensions/`.",
      "`sheriff validate` отвергает каждую связь, которую правило SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) объявляет с узлом расширения guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx), а также тип связи и её цель. Эту проверку `sheriff validate` делает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u). Там он читает каждый узел `specs/_guidelines/spec.json`, кроме раздела, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Узел расширения — это узел файла в `specs/_guidelines/extensions/`.",
      "Новый узел для строки 10.1.20a, которую вы приняли 2026-11-13. Её todo требует узла описания инструментов, который её реализует, с тестом, написанным первым. Репозиторий guidelines назван так, как его узнают инструменты по согласованному узлу «Where the files are»; в проекте SpecSheriff guidelines и расширения приходят из плагина, уже проверенными там, где они написаны."),
  ];
  reason(k,
    "In the repository where the SpecSheriff guidelines are written, the extensions are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check.",
    "В репозитории, где пишутся SpecSheriff guidelines, расширения хранятся рядом с ними. Поэтому связь правила guidelines с узлом расширения разрешается и проходит все остальные проверки.");
  refs(k, [R("implements", "s-zyaf34chxugtjyn"), R("cites", "s-u7tw6m8npxmv5tu"), R("cites", "s-mbmnsnxenmavu3z"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6")]);
  removed(k, "The sentence that a citation of a node of an extension is refused through the link it requires: “Outgoing links and citations” (s-qzyacnqwvaeaps4) already says that every citation requires a link.");
  reviewed(k, "review-g1-d.md");
}
{ // s-yprj7d6tnvauggr
  const k = "s-yprj7d6tnvauggr";
  E(k).proposal.parts = [
    P("In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, that lacks the link named for it:",
      "В файлах, которые хранит репозиторий, `sheriff validate` отвергает каждый из следующих узлов, кроме раздела, у которого нет названной для него связи:",
      "Было: «`sheriff validate` разрешает исходящие связи `implements` и `refines` каждого узла, кроме раздела, и читает, к какой части относится узел, который называет каждая из них». Теперь сказано, какой узел какую связь и с чем должен объявить, как требует запись к строке 10.1.22 в файле продолжения."),
    L("a node of the technical appendix (§s-tj38pvm38nepaf5) outside the section on the stack (§s-vj7ercem526zd6v) and the technical debt section (§s-2r7k2aeyusgy6fw): an `implements` link to a node of the base specification (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);",
      "узел технического приложения (§s-tj38pvm38nepaf5) вне раздела стека (§s-vj7ercem526zd6v) и раздела технического долга (§s-2r7k2aeyusgy6fw) — связь `implements` с узлом базовой спецификации (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);",
      "Строка 10.1.22. Описание недостатка в техническом долге больше не обязано уточнять узел базовой спецификации, по вашему решению по этой строке от 2026-11-13."),
    L("a node of the appendix of the tools (§s-a4rbry4hsu34hy8): an `implements` link to a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) or of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);",
      "узел описания инструментов (§s-a4rbry4hsu34hy8) — связь `implements` с правилом SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) или расширения guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);",
      "Строка 10.1.23. Цель может быть и правилом расширения guidelines: его правила — тоже правила ведения спецификации, и описание инструментов реализует проверки из их таблиц. Цель — правило, а не раздел, как говорит строка."),
    L("a node of the project's own guidelines (§s-u7tw6m8npxmv5tu): a `refines` link (§s-sn6au3vcr9uy5pm) to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).",
      "узел собственных guidelines проекта (§s-u7tw6m8npxmv5tu) — связь `refines` (§s-sn6au3vcr9uy5pm) с правилом SpecSheriff guidelines или выбранного проектом расширения (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).",
      "Строка 10.1.24. Принимается только `refines`: по вашему решению от 2026-11-11 одна связь `refines` выражает и уточнение, и расширение, а собственные guidelines проекта никогда не реализуют SpecSheriff guidelines (решение от 2026-11-08). Что `refines` означает и расширение, скажет правило 6.1 в предлагаемой формулировке. Правило об уровнях доменов больше не особый случай: это узел расширения Domains."),
    P("The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
      "Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx).",
      "Новое в тексте: что называет отказ."),
    P("`sheriff validate` tells which part of the specification a node belongs to by the path of its file (§s-zefk589ykh37b8u). It reads a node in a cell of a `TableRule` as it reads any other node (§s-5fewsp22mmdz7y6).",
      "К какой части спецификации относится узел, `sheriff validate` определяет по пути к его файлу (§s-zefk589ykh37b8u). Узел в ячейке `TableRule` он читает так же, как любой другой узел (§s-5fewsp22mmdz7y6).",
      "Новое в тексте."),
  ];
  reason(k,
    "A node linked to the rule it builds on is found whenever that rule changes. Only a reader can judge whether the two still agree.",
    "Узел, связанный с правилом, на которое он опирается, находят при каждом изменении этого правила. Согласуются ли они, решает только читатель.");
  examples(k, [X(
    "A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses the rule, since it declares no `refines` link. With a `refines` link in its place, the rule passes.",
    "Правило `project.json` перечисляет фикстуры тестов проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` отвергает правило: у него нет связи `refines`. Со связью `refines` вместо неё правило проходит.")]);
  refs(k, [R("implements", "s-694brc6fytwxc5v"), R("implements", "s-9c8t99cz34p28sg"), R("implements", "s-3dashdedvu4xgfb"), R("cites", "s-tj38pvm38nepaf5"), R("cites", "s-vj7ercem526zd6v"), R("cites", "s-2r7k2aeyusgy6fw"), R("cites", "s-5x737t9nee4zgaa"), R("cites", "s-a4rbry4hsu34hy8"), R("cites", "s-u7tw6m8npxmv5tu"), R("cites", "s-mbmnsnxenmavu3z"), R("cites", "s-sn6au3vcr9uy5pm"), R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6")]);
  E(k).dependsOn = ["proposal:s-sn6au3vcr9uy5pm"];
  stage3(k, "validate.ts:443-468 (appendices): a description of the technical debt is no longer refused for refining no node of the base specification (line 457); a rule of the appendix of the tools may also implement a node of an extension of the guidelines (line 461); a rule of the project's own guidelines must refine, not implement, a rule of spec.json or of a chosen extension, tools.json no longer counting and the rule on levels no longer a special case (line 463); for the appendix of the tools and the project's own guidelines, a section is no target, while a node of the technical appendix may implement any node of the base specification, as row 10.1.22 says; the nodes in cells are read; the messages drop \"the base of the guidelines\". The check that a file of the technical appendix is named after a domain (lines 446-452) belongs to row 11.3.5 and another node. The tests at validate.test.ts:451, :458 and :465 are to carry s-yprj7d6tnvauggr, and the last is to expect a rule with only an `implements` link refused.");
  reviewed(k, "review-g1-d.md");
}
{ // s-6bmnsbskg6en4nf
  const k = "s-6bmnsbskg6en4nf";
  E(k).proposal.parts = [
    P("`sheriff validate` refuses each copy of the files that are common to every project and come with the SpecSheriff tools in the plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).",
      "`sheriff validate` отвергает каждую копию файлов, которые общие для всех проектов и поставляются вместе с инструментами SpecSheriff в плагине (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). Такой файл он принимает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).",
      "Было: «`sheriff validate` отвергает копию SpecSheriff guidelines или их схемы вне репозитория, в котором они написаны». Теперь копией названа копия любого файла, общего для всех проектов, как их перечисляет согласованный узел «Where the files are». Как инструменты узнают репозиторий guidelines, говорит тот же узел: по переменной окружения `SPECSHERIFF_GUIDELINES_REPO`, по вашему решению от 2026-11-21, а не по ключу `writesSpecSheriffGuidelines`."),
    P("A copy is any of the following files that the repository keeps:",
      "Копия — любой из следующих файлов, которые хранит репозиторий:",
      "Как было."),
    L("`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;", "`specs/_guidelines/spec.json` и `specs/_guidelines/tools.json`;", "Как было."),
    L("each file in `specs/_guidelines/extensions/`;", "каждый файл в `specs/_guidelines/extensions/`;", "Новое: расширения guidelines тоже приходят из плагина, и копии их проект не делает (правило 2.5)."),
    L("each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.",
      "каждый файл в `specs/_schema/` или в папке внутри неё, кроме `specs/_schema/project.schema.json`.",
      "Как было; добавлены вложенные папки, где лежат схемы расширений."),
    P("The refusal names each such file. While the repository keeps a copy, `sheriff validate` makes this check alone.",
      "Отказ называет каждый такой файл. Пока репозиторий хранит копию, `sheriff validate` делает только эту проверку.",
      "Новое в тексте; так делает код (validate.ts:44). Без этой остановки проверка повторяющихся sid отвергла бы каждый sid копии."),
  ];
  reason(k,
    "A project reads these files from the plugin (§s-zefk589ykh37b8u). A copy in its repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed.",
    "Проект читает эти файлы из плагина (§s-zefk589ykh37b8u). Копию в его репозитории читают люди и агенты, но не читает ни один инструмент SpecSheriff, поэтому она незаметно отстаёт от действующих файлов.");
  stage3(k, "validate.ts:35-45 recognises the repository where the SpecSheriff guidelines are written by `writesSpecSheriffGuidelines` in sheriff.config.json, which `sheriff reindex` now removes (s-gb8s9657a65hqmv); it is to read SPECSHERIFF_GUIDELINES_REPO (s-zefk589ykh37b8u). It is to refuse the files in specs/_guidelines/extensions/ too, and its message is to name the files that the plugin delivers. It keeps stopping the other checks while a copy is kept (line 44). The test at validate.test.ts:472 is to carry s-6bmnsbskg6en4nf.");
  reviewed(k, "review-g1-d.md");
}

// ---------------------------------------------------------------------------------------------------------------
// Proposals that only the owner can agree to
// ---------------------------------------------------------------------------------------------------------------
const SAME = "Как в согласованной формулировке.";

drafts["proposal:s-kag2m9tzdnduxdx"] = {
  question: "Q1: where a node that a part of the base specification opens with, such as a domain's header, is located",
  location: "spec 8.5",
  sidValue: "s-kag2m9tzdnduxdx",
  proposal: {
    title: "A node's location",
    ruTitle: "Расположение узла",
    parts: [
      P("A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.",
        "Расположение узла называет, где он находится в спецификации: часть, в которой он находится, а за ней его место в ней. Место узла — его номер среди узлов того же родителя. Термин номера не получает. Его место — имя термина.",
        SAME),
      P("The node at the top of a file of the guidelines or of the technical appendix takes as its location the part's name and the file's. In each such file, the nodes are numbered under the location of the file's top node.",
        "Узел на вершине файла guidelines или технического приложения располагается по имени части и имени файла. Каждый такой файл нумерует свои узлы под расположением своего верхнего узла.",
        SAME),
      P("An extension of the guidelines (§s-mbmnsnxenmavu3z) may define a kind of node that a part of the base specification opens with. A node of such a kind takes the part's name alone as its location, with no number. The nodes under it are numbered together with the other nodes at the top of the part.",
        "Расширение guidelines (§s-mbmnsnxenmavu3z) может определить тип узла, которым открывается часть базовой спецификации. Узел такого типа получает расположением одно имя части, без номера. Узлы под ним нумеруются вместе с остальными узлами на вершине части.",
        "Новое (вопрос 1). Прежнее правило 1.4 располагало заголовок домена по имени домена. При согласовании 8.5 это «переходило в часть 14» и нигде не было записано. Предложение не называет ни одного расширения, как требует правило 1.7.3. Заголовок домена — такой узел, потому что правило 11.1.3 говорит, что спецификация домена открывается заголовком. Раздел, который просто стоит первым в `base` или `contracts`, под предложение не попадает: тип раздела определяют guidelines, а не расширение."),
      P("The location is computed from where the node is and is never written by hand.",
        "Расположение вычисляется из того, где узел находится, и никогда не пишется вручную.",
        SAME),
    ],
    reason: "A location tells a reader where a node is. Because it is computed, it can never disagree with where the node is.\n\nA node that a part opens with describes the part as a whole, so the part's name locates it. The nodes under it are numbered with the part's other nodes, so that their locations do not depend on which of the part's files holds them.",
    ruReason: "Расположение говорит читателю, где находится узел. Вычисляемое, оно никогда не расходится с тем, где узел находится.\n\nУзел, которым открывается часть, описывает часть целиком, поэтому его расположение — имя части. Узлы под ним нумеруются вместе с остальными узлами части, чтобы их расположения не зависели от того, в каком из файлов части они лежат.",
    reasonChange: "Первый абзац — как в согласованной формулировке. Второй — новый: обоснование нового абзаца текста.",
    refs: [R("cites", "s-rwqzepmrt77rv35"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-mbmnsnxenmavu3z")],
    // The node's decisions cite these two; a proposal restates only the wording.
    citedInDecisions: ["s-rwqzepmrt77rv35", "s-vsh384ybt4w25a2"],
    removed: [],
    date: DATE,
  },
};

drafts["proposal:domains-header-status"] = {
  question: "The approval status of a domain's header",
  location: "domains 11.1.4a (new, after \"A domain's header carries the index built from its sections\")",
  sidValue: SID.headerStatus,
  proposal: {
    title: "The approval status of a domain's header",
    ruTitle: "Статус одобрения заголовка домена",
    parts: [
      P("A domain's header (§s-yggv9myedprnaa7) has an approval status (§s-tgrnpagrb58tya7), which the SpecSheriff tools derive as they derive a section's (§s-9kfdycuq34beqvs). They derive it from every node of the domain other than a section and other than the header itself, in whichever of the domain's documents the node is kept. Nobody approves a header.",
        "У заголовка домена (§s-yggv9myedprnaa7) есть статус одобрения (§s-tgrnpagrb58tya7), который инструменты SpecSheriff выводят так же, как статус раздела (§s-9kfdycuq34beqvs). Они выводят его из каждого узла домена, кроме раздела и самого заголовка, в каком бы из документов домена этот узел ни хранился. Заголовок никто не одобряет.",
        "Новое правило расширения Domains. Оно исполняет ваше решение от 2026-11-06, записанное на правиле 1.3.8: статус раздела и заголовка домена — состояние того, что в них входит, он строится и только показывается, а их собственную формулировку никто не одобряет. Новая форма правила 1.3.8 о заголовке больше не говорит, а правило SpecSheriff guidelines и не может его назвать (правило 1.7.3). Статус выводится из всех узлов домена, а не только из узлов под заголовком: разделы домена часто лежат в других его файлах, а под заголовком нет ни одного узла. Так делает код."),
    ],
    reason: "A header, like a section, requires nothing, so it leaves an owner nothing to agree to. Its approval status shows at a glance whether the whole domain is approved, which helps where only the headers are visible.",
    ruReason: "Заголовок, как и раздел, ничего не требует, поэтому ответственному не с чем в нём соглашаться. Его статус одобрения сразу показывает, одобрен ли весь домен, а это полезно там, где видны только заголовки.",
    reasonChange: "Новое.",
    examples: [X(
      "A domain holds two sections, and one rule in one of them is a draft. The header's approval status is draft. Once that rule is approved, the header is approved too, though nobody approved the header.",
      "В домене два раздела, и одно правило в одном из них — черновик. Статус одобрения заголовка — черновик. Когда это правило одобрят, заголовок тоже станет одобренным, хотя заголовок никто не одобрял.")],
    refs: [R("refines", "s-9kfdycuq34beqvs"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-tgrnpagrb58tya7")],
    removed: [],
    date: DATE,
  },
};

drafts["proposal:11-3-header-status-row"] = {
  question: "The approval status of a domain's header",
  location: "domains 11.3.2a (new row of the table of checks of the Domains extension, after row 11.3.2)",
  sidValue: SID.headerStatusRow,
  kind: "cell",
  cost: { en: "refused", ru: "отвергается" },
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("The approval status of a domain's header is derived from the approval statuses of all the other nodes of the domain",
        "Статус одобрения заголовка домена консолидирует статус всех остальных узлов домена",
        "Новая строка таблицы 11.3, по образцу строки 10.1.10, которую вы продиктовали для раздела. Без неё статус заголовка, который пишет `sheriff reindex`, не сравнивала бы ни одна проверка, а код сейчас его сравнивает."),
    ],
    reason: null,
    ruReason: null,
    refs: [R("checks", SID.headerStatus)],
    removed: [],
    date: DATE,
  },
};

drafts["proposal:row-10-1-8"] = {
  question: "The approval status of a domain's header",
  location: "spec 10.1.8 (row of the main table of checks)",
  sidValue: "s-cey3k9xxjvkpyqz",
  kind: "cell",
  cost: { en: "refused", ru: "отвергается" },
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("Every node of the specification outside the SpecSheriff guidelines that a project uses and the extensions that it has chosen, except a section and any other node that nobody approves, is approved only while an approval of its current wording is in force",
        "Каждый узел спецификации вне SpecSheriff guidelines, которые использует проект, и вне выбранных им расширений, кроме раздела и любого другого узла, который никто не одобряет, одобрен, только пока в силе одобрение его нынешней формулировки",
        "Было: «…кроме раздела, одобрен, только пока…». Добавлено «и любого другого узла, который никто не одобряет». Иначе строка требовала бы одобрения для одобренного заголовка домена, которого по предлагаемому правилу расширения Domains никто не одобряет; правило расширения не может отменить строку основной таблицы (правило 1.7.2). Строка по-прежнему не называет ни одного расширения (правило 1.7.3)."),
    ],
    reason: null,
    ruReason: null,
    refs: [R("checks", "s-9g7jj8z4yf9kq93"), R("checks", "s-5ah25f6gy99panq")],
    removed: [],
    date: DATE,
  },
};

drafts["proposal:s-sn6au3vcr9uy5pm"] = {
  question: "Rule 6.1: `refines` also covers extending a rule",
  location: "spec 6.1",
  sidValue: "s-sn6au3vcr9uy5pm",
  proposal: {
    title: "What a link is",
    ruTitle: "Что такое связь",
    parts: [
      P("A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:",
        "Связь — это направленное отношение одного узла к другому. Каждая связь называет, что она означает, своим типом. Типы связей такие:",
        SAME),
      L("`implements` — the linking node states how the linked one is implemented.",
        "`implements` — связывающий узел показывает, как выполняется связанный.",
        SAME),
      L("`refines` — the linking node states the linked node more precisely, states it for a narrower case, or extends it. A node extends another when it adds a requirement on the other node's subject that the other leaves open, such as a value that the other leaves to each project. The linking node leaves every requirement of the linked node in force. Where the linking node states how the linked node is implemented, the link is of type `implements` instead.",
        "`refines` — связывающий узел говорит о связанном точнее, говорит о нём для более узкого случая или расширяет его. Узел расширяет другой, если добавляет требование о предмете другого узла, которое тот оставляет открытым, например значение, которое тот оставляет каждому проекту. Связывающий узел оставляет в силе каждое требование связанного. Если связывающий узел показывает, как выполняется связанный, связь имеет тип `implements`.",
        "Было: «связывающий узел говорит о связанном точнее или для более узкого случая». Добавлено расширение, по вашему решению от 2026-11-11: одна связь `refines` выражает и уточнение, и расширение, потому что никакая проверка не различит их. Слово «расширяет» определено здесь же, как просил рецензент. Две последние фразы — его ограничения: связь не ослабляет правило (правило 2.4) и не заменяет `implements`. Техническое приложение «расширяет и уточняет» базу (правило 4.2), но показывает, как она выполняется, и потому связано с ней связью `implements`."),
      L("`constrains` — the linking node states a condition the linked rule depends on.",
        "`constrains` — связывающий узел содержит условие, от которого зависит связанное правило.",
        SAME),
      L("`exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).",
        "`exempts` — связывающий узел освобождает от реализации связанное правило или каждое правило под связанным разделом (§s-gf6n8ge4mke3pr2).",
        SAME),
      L("`checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.",
        "`checks` — связывающий узел — это проверка, и она следит за тем, чтобы связанное правило выполнялось. Такую связь записывают вручную.",
        SAME),
      L("`cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.",
        "`cites` — связывающий узел ссылается на связанный (§s-cxtt6jvhqcey2k9), и никакой другой тип связи не говорит, как эти два узла соотносятся. Поэтому у него нет связи другого типа с этим узлом.",
        SAME),
      L("`term-relation` — the linking term and the linked term are bound, for as long as both exist, in the ratio the link carries.",
        "`term-relation` — связывающий термин и связанный термин соединены, пока существуют оба, в соотношении, которое указывает связь.",
        SAME),
      L("`uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.",
        "`uses` — то, что называет связывающий термин, пользуется тем, что называет связанный термин, участвуя в процессе. У связи нет соотношения. Термин, который только запускает процесс, как оператор, запускающий экспорт, не использует ничего из того, что использует процесс.",
        SAME),
      P("An extension of the guidelines or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.",
        "Расширение guidelines или собственные guidelines проекта (§s-u7tw6m8npxmv5tu) могут определять дополнительные типы связей. У каждого такого типа есть значение, и он не противоречит ни одному правилу SpecSheriff guidelines.",
        SAME),
    ],
    reason: "A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can draw it. A type named without its meaning is the same guess, one step removed.\n\nA project may need a relation that the guidelines do not provide for, so its own guidelines may add a type of link, as they may add a kind of node.\n\nOne type records both refining and extending a node, since the line between the two is thin and no check can tell them apart. A node that weakened the node it refines would make that node untrue wherever the weaker node applies.",
    ruReason: "Связь без типа лишь фиксирует, что кто-то подумал о двух узлах вместе. Ни одна проверка не может её оценить. Ни одна диаграмма не может её нарисовать. Тип, названный без значения, — та же догадка на шаг дальше.\n\nПроекту может понадобиться отношение, которого guidelines не предусматривают, поэтому его собственные guidelines могут добавить тип связи, как могут добавить вид узла.\n\nОдин тип выражает и уточнение, и расширение узла, потому что граница между ними тонка и никакая проверка не может их различить. Узел, который ослаблял бы уточняемый узел, сделал бы тот неверным везде, где действует более слабый.",
    reasonChange: "Первые два абзаца — как в согласованной формулировке. Третий — новый: почему один тип и почему без ослабления.",
    examples: [
      X("`uses`: a user fills in a form while signing up.", "`uses`: пользователь заполняет форму при регистрации."),
      X("`refines`, extending a rule: a rule of a project's own guidelines lists the files that the project's tests use as fixtures, which the rule it refines leaves to each project. The closest mistake is an `implements` link from that rule, which does not state how the rule it builds on is implemented.",
        "`refines`, расширение правила: правило собственных guidelines проекта перечисляет файлы, которые тесты проекта используют как фикстуры, — это уточняемое правило оставляет каждому проекту. Ближайшая ошибка — связь `implements` от этого правила: оно не показывает, как выполняется правило, на которое опирается."),
    ],
    refs: [R("cites", "s-gf6n8ge4mke3pr2"), R("cites", "s-cxtt6jvhqcey2k9"), R("cites", "s-u7tw6m8npxmv5tu"), R("cites", "s-vsh384ybt4w25a2")],
    citedInDecisions: ["s-vsh384ybt4w25a2"],
    removed: [],
    listUnchanged: true,
    date: DATE,
  },
};

drafts["proposal:row-10-1-17"] = {
  question: "Row 10.1.17: abbreviations are an exception only one or two in a row",
  location: "spec 10.1.17 (row of the main table of checks)",
  sidValue: "s-83natrftdsmttsu",
  kind: "cell",
  cost: { en: "refused", ru: "отвергается" },
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("No sentence of the specification is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers, one or two in a row. The deterministic check uses this criterion: no sentence contains three or more consecutive words written in capital letters",
        "В спецификации запрещено писать предложения заглавными буквами. Исключение только для аббревиатур, констант и специальных обозначений (например, артикулов), если их одно или два подряд. Для детерминированной проверки используется правило: в предложении не может быть трёх и более слов подряд, написанных заглавными буквами",
        "Ваша формулировка от 2026-11-13; добавлено только «одно или два подряд». Без этого вторая фраза обещает, что аббревиатуры проходят, а третья и правило 7.6.2 отвергают три аббревиатуры подряд. Так строка согласуется с правилом 7.6.2 и со своим критерием."),
    ],
    reason: null,
    ruReason: null,
    examples: [X(
      "“REST API” in a sentence passes: two abbreviations in a row. “HTTP REST API” is refused, though each of its words is an abbreviation: three words in capitals in a row.",
      "«REST API» в предложении проходит: две аббревиатуры подряд. «HTTP REST API» отвергается, хотя каждое его слово — аббревиатура: три слова заглавными подряд.")],
    refs: [R("checks", "s-m6upmfq64kw5h4r")],
    removed: [],
    date: DATE,
  },
};

{ // the agreed "What `sheriff reindex` writes", changed for the moves that report B asks for
  const agreed = before["new:tools-2-reindex-writes"];
  if (!agreed?.agreed) throw new Error("the agreed draft of s-ztseyetus7np6br is missing");
  const parts = structuredClone(agreed.proposal.parts).map((p) => ({ ...p, ru: p.ru.replaceAll("оглавление", "указатель"), change: SAME }));
  const find = (prefix) => {
    const i = parts.findIndex((p) => p.en.startsWith(prefix));
    if (i < 0) throw new Error(`s-ztseyetus7np6br: no part opening with "${prefix}"`);
    return i;
  };
  parts[find("the location of each node")] = L(
    "the location of each node, as the SpecSheriff tools compute it (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);",
    "расположение каждого узла так, как его вычисляют инструменты SpecSheriff (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);",
    "Было: «расположение каждого узла (§s-kag2m9tzdnduxdx)». Добавлена ссылка на новый узел о том, как вычисляется расположение.");
  parts[find("the approval status of each section")] = L(
    "the approval status of each section, derived from every node under it other than a section, the nodes in the cells of a `TableRule` included (§s-9kfdycuq34beqvs);",
    "статус одобрения каждого раздела, выведенный из каждого узла под ним, кроме раздела, в том числе из узлов в ячейках `TableRule` (§s-9kfdycuq34beqvs);",
    "Было: «статус одобрения каждого раздела и каждого заголовка домена, выведенный из узлов под этим разделом или заголовком». Оговорка об узлах в ячейках перенесена сюда из узла «Values built from other nodes», по замечанию рецензента: так `sheriff reindex` и `sheriff validate` вычисляют одно и то же. Заголовок домена теперь в следующем пункте.");
  const domains = find("where the project has chosen the Domains extension");
  parts.splice(domains, 1,
    L("where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of each domain's header (§s-yccuyqbypzzx2gu);",
      "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — статус одобрения заголовка каждого домена (§s-yccuyqbypzzx2gu);",
      "Было в предыдущем пункте: «выведенный из узлов под… заголовком». Под заголовком часто нет ни одного узла, потому что разделы домена лежат в других его файлах. Теперь пункт ссылается на предлагаемое правило расширения Domains, которое говорит, из чего выводится этот статус."),
    L("where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);",
      "если проект выбрал расширение Domains, — указатель разделов в заголовке каждого домена, у которого есть разделы (§s-2r59txnms5serdr);",
      "Было: «оглавление разделов в каждом заголовке домена». Оговорка «у которого есть разделы» перенесена сюда из узла «Values built from other nodes», по замечанию рецензента; она — по вашему решению по строке 11.3.2 от 2026-11-18. «Указатель» — как в строке 11.3.2."));
  drafts["proposal:s-ztseyetus7np6br"] = {
    question: "The changed wording of the agreed \"What `sheriff reindex` writes\"",
    location: agreed.location,
    sidValue: "s-ztseyetus7np6br",
    proposal: {
      ...structuredClone(agreed.proposal),
      parts,
      ruReason: agreed.proposal.ruReason,
      reasonChange: SAME,
      refs: [...agreed.proposal.refs.filter((r) => r.to !== "s-yggv9myedprnaa7"), R("implements", SID.headerStatus), R("cites", "s-ygg5kpcxgzq3m7w")],
      removed: [],
      date: DATE,
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
const known = new Set();
const sidRe = /s-[2-9a-hjkmnp-z]{15}/g;
const walkDir = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(p);
    else if (e.name.endsWith(".json") || e.name.endsWith(".jsonl")) for (const m of fs.readFileSync(p, "utf8").matchAll(sidRe)) known.add(m[0]);
  }
};
walkDir(path.join(root, "specs"));
walkDir(path.join(root, ".ai_docs/t25-pass/moved"));
for (const m of JSON.stringify(before).matchAll(sidRe)) known.add(m[0]);
for (const [name, sid] of Object.entries(SID)) if (known.has(sid)) problems.push(`new sid ${sid} (${name}) is already in use`);

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
const KEYS = [...GROUP, "new:tools-7-1-link-target", ...Object.keys(drafts).filter((k) => k.startsWith("proposal:"))];

for (const key of KEYS) {
  const e = drafts[key];
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title || "", p.text, p.reason || "", ...(p.examples || []).map((x) => x.en)].join("\n");
  const ru = [p.ruTitle || "", p.ruText, p.ruReason || "", ...(p.examples || []).map((x) => x.ru)].join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !(p.citedInDecisions || []).includes(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
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

if (firstRun) fs.writeFileSync(beforeUrl, JSON.stringify(before, null, 2) + "\n");
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`rewrote ${KEYS.length} keys:\n${KEYS.join("\n")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
