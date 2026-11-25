// T25, stage 2, group 1: drafts the new wordings of the nodes of items 9 to 19 of the order in stage2-inventory.md,
// the checks that `sheriff validate` makes for rows 10.1.5 to 10.1.25 of the main table of checks and for rows
// 11.3.1 to 11.3.3 and 12.12.14 of the tables of the Domains and RecordType extensions, with a new node for row
// 10.1.20a. Copies tools-drafts.json to tools-drafts.before-group1.json first, checks every draft (citations against
// links, no citation by location outside backticks, new sids unique, link targets existing), and only then writes.
// It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
// Run again, the script replaces only the keys of this group and keeps the copy made before its first run.
const beforeUrl = new URL("tools-drafts.before-group1.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const DATE = "2026-11-23";

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

// The sids of the new nodes, checked below to be unique across specs/, moved/ and tools-drafts.json.
const SID = {
  location: "s-ygg5kpcxgzq3m7w",
  approvalBy: "s-75ue25v6r23jkk8",
  oneHeader: "s-8esbyvaj2yx5eqf",
  consumes: "s-p3n666zfjdrrw6a",
  toExtension: "s-75r4pg4wdqu3gw5",
};

const entries = {};

// ---------------------------------------------------------------------------------------------------------------
// Item 9: "Locations computed anew" (s-stxmhq3hgfndvn6), row 10.1.5, split into the computation and the check.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each node whose location differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the location computed.",
      "`sheriff validate` отвергает каждый узел, расположение которого отличается от вычисленного для него (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). Отказ называет файл и sid узла, расположение, которое хранит файл, и вычисленное расположение.",
      "Было: «`sheriff validate` вычисляет в памяти расположение каждого узла по тому, где он находится, и сравнивает его с расположением, которое хранит его файл». Теперь узел начинается с того, что отвергается и что называет отказ, как согласованные узлы. Как вычисляется расположение, теперь говорит новый узел «How a node's location is computed»: это вычисление нужно и `sheriff reindex`, который пишет расположения."),
    P("`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It leaves out the archive, whose nodes keep the locations they had when they were removed (§s-f2b5zvc565s242f).",
      "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Архив он не проверяет: его узлы сохраняют расположения, которые были у них при удалении (§s-f2b5zvc565s242f).",
      "Новое в тексте. «Каждый узел спецификации» — как требует заметка в файле продолжения. Исключение архива — по вашему решению по строке 10.1.5 от 2026-11-12. Узлы в ячейках — новое: у них тоже есть расположения. В проекте SpecSheriff guidelines и выбранные расширения приходят из плагина, поэтому проверяются только файлы, которые хранит репозиторий."),
  ];
  entries["s-stxmhq3hgfndvn6"] = {
    location: "tools 7.1.4",
    sidValue: "s-stxmhq3hgfndvn6",
    testsFrom: ["s-stxmhq3hgfndvn6"],
    proposal: {
      title: "A location that differs from the computed one",
      ruTitle: "Расположение, которое отличается от вычисленного",
      parts,
      reason: "`sheriff reindex` writes every location after each edit (§s-ztseyetus7np6br). A location that differs from the computed one was therefore written by hand, or left by a move that no `sheriff reindex` followed.",
      ruReason: "`sheriff reindex` пишет каждое расположение после каждой правки (§s-ztseyetus7np6br). Поэтому расположение, которое отличается от вычисленного, написано вручную или осталось после переноса, за которым не последовал `sheriff reindex`.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      refs: [R("implements", "s-tvxhtjbj7mmpmnx"), R("cites", SID.location), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-f2b5zvc565s242f"), R("cites", "s-ztseyetus7np6br")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.5 (s-tvxhtjbj7mmpmnx), as the agreed drafts of this stage implement their rows.",
        "How a location is computed: it moved to the new node “How a node's location is computed” (s-ygg5kpcxgzq3m7w), since `sheriff reindex` needs it as well.",
      ],
      date: DATE,
    },
    stage3: "validate.ts:88-91 compares the locations of every node of spec.nodes, which in a project include the SpecSheriff guidelines taken from the plugin; it is to compare only the nodes of the files that the repository keeps, the nodes in the cells of a TableRule included (specificationOf in spec-files.ts walks only `children`). Its message is to name the node's file and sid and both locations. The test \"refuses a location other than the one its place gives\" (validate.test.ts:105) is to carry s-stxmhq3hgfndvn6.",
  };
}
{
  const parts = [
    P("The SpecSheriff tools compute each node's location (§s-kag2m9tzdnduxdx) from the path of the node's file and from the node's place in the specification.",
      "Инструменты SpecSheriff вычисляют расположение каждого узла (§s-kag2m9tzdnduxdx) по пути к файлу узла и по месту узла в спецификации.",
      "Новое: вынесено из узла «Locations computed anew», который теперь только сверяет расположения. Вычисление нужно и `sheriff reindex`, который пишет расположения (согласованный узел «What `sheriff reindex` writes»), поэтому оно стоит в своём узле."),
    P("The node at the top of a file of the guidelines or of the technical appendix takes as its location the path of that file under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations are `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header takes the domain's name as its location (§s-yggv9myedprnaa7).",
      "Узел на вершине файла guidelines или технического приложения получает расположением путь к этому файлу внутри `specs/` без `.json` (§s-zefk589ykh37b8u). Таковы расположения `_guidelines/spec`, `_guidelines/extensions/domains` и `tech/stack`. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена получает расположением имя домена (§s-yggv9myedprnaa7).",
      "Новое в тексте; так делает код. Первая фраза — как в правиле 8.5; путь назван целиком, потому что файлы расширений guidelines лежат во вложенной папке. Расположение заголовка домена ни одно правило новой формы не называет: узел следует прежнему одобренному правилу 1.4 и коду — см. вопрос 1."),
    P("Every other node's location is one of the following, followed by a slash and the node's place:",
      "Расположение любого другого узла — одно из следующего, затем косая черта и место узла:",
      "Новое в тексте; так делает код."),
    L("in a file of the guidelines or of the technical appendix, the location of the node at the top of that file, as in `_guidelines/spec/1.3.4`;",
      "в файле guidelines или технического приложения — расположение узла на вершине этого файла, как в `_guidelines/spec/1.3.4`;",
      "Как в правиле 8.5."),
    L("in the base specification, the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.",
      "в базовой спецификации — имя папки внутри `specs/`, в которой лежит файл узла, как в `base/3.2`, `contracts/1` или `requests/2`.",
      "Как в правиле 8.5. Узел на вершине файла раздела контрактов теперь нумеруется, как любой другой узел базовой спецификации. Раньше код давал ему расположение `contracts/<файл>`, а узлы под ним нумеровал подряд под `contracts`, как говорило прежнее правило 1.4; согласованное правило 8.5 этого больше не говорит. При первом `sheriff reindex` нового выпуска расположения в разделе контрактов каждого проекта сменятся; по расположению ничто не ссылается. См. вопрос 1."),
    P("Every node is numbered except a term, the node at the top of a file of the guidelines or of the technical appendix, and a domain's header. A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`. A term's place is the term's name.",
      "Нумеруется каждый узел, кроме термина, узла на вершине файла guidelines или технического приложения и заголовка домена. Место пронумерованного узла — его порядковый номер среди пронумерованных узлов под его родителем, считая с единицы. Если родитель тоже пронумерован, перед этим номером стоят место родителя и точка, как в `3.2`. Место термина — имя термина.",
      "Новое в тексте; так делает код. Правило 8.5 не говорит, как записывается место вложенного узла; на этот пробел рецензент указывал при согласовании правила 8.5."),
    P("The SpecSheriff tools take the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.",
      "Пронумерованные узлы под узлом инструменты SpecSheriff берут в порядке его дочерних узлов. Под `TableRule` (§s-5fewsp22mmdz7y6) после его дочерних узлов идут узлы в его ячейках: строка за строкой по всем его группам, а внутри строки — столбец за столбцом.",
      "Новое. Правило 8.5 не говорит, как нумеруется узел в ячейке `TableRule` (открытая проблема P2 в stage2-inventory.md). Узел следует правилу 8.5: узел в ячейке находится под своим `TableRule`, поэтому его место — номер среди узлов под ним. Строки нумеруются подряд через все группы, поэтому временные номера вроде 10.1.20a при первом `sheriff reindex` станут целыми."),
    P("In a folder of the base specification, the nodes at the top of its files and the children of a domain's header count as nodes under one parent. The SpecSheriff tools take them file by file, in the code-point order of the files' paths.",
      "В папке базовой спецификации узлы на вершине её файлов и дочерние узлы заголовка домена считаются узлами под одним родителем. Инструменты SpecSheriff берут их файл за файлом, в порядке кодовых точек путей к файлам.",
      "Новое в тексте; так делает код. Порядок кодовых точек путей — новое: код сравнивает имена файлов с учётом локали, и порядок может зависеть от машины."),
  ];
  entries["new:tools-7-1-location"] = {
    from: "s-stxmhq3hgfndvn6",
    location: "tools 7.1.4a (new, after \"Locations computed anew\")",
    sidValue: SID.location,
    testsFrom: ["match no test"],
    proposal: {
      title: "How a node's location is computed",
      ruTitle: "Как вычисляется расположение узла",
      parts,
      reason: "A folder of the base specification may hold several files (§s-zefk589ykh37b8u). Its files are numbered as one sequence, so that no two of its nodes take the same location. The files are taken in the code-point order of their paths, so that every machine computes the same locations.",
      ruReason: "Папка базовой спецификации может содержать несколько файлов (§s-zefk589ykh37b8u). Её файлы нумеруются одной последовательностью, чтобы никакие два её узла не получали одно расположение. Файлы берутся в порядке кодовых точек путей, чтобы на любой машине вычислялись одни и те же расположения.",
      reasonChange: "Новое.",
      examples: [X(
        "A domain `requests` is kept in two files: `specs/requests/00-requests.json` holds its header, and `specs/requests/intake.json` holds two sections. The header's location is `requests`, and the sections are `requests/1` and `requests/2`. The fourth node of the second section is a `TableRule`, `requests/2.4`, and the node in the cell of its third row is `requests/2.4.3`. A term `request` in `specs/contracts/terms.json` is `contracts/request`. The closest mistake is to number each file from one, which gives the first section of every file the location `requests/1`.",
        "Домен `requests` хранится в двух файлах: в `specs/requests/00-requests.json` — его заголовок, в `specs/requests/intake.json` — два раздела. Расположение заголовка — `requests`, разделов — `requests/1` и `requests/2`. Четвёртый узел второго раздела — `TableRule` `requests/2.4`, а узел в ячейке его третьей строки — `requests/2.4.3`. Термин `request` в `specs/contracts/terms.json` — `contracts/request`. Ближайшая ошибка — нумеровать каждый файл с единицы: тогда первый раздел каждого файла получает расположение `requests/1`.")],
      refs: [R("implements", "s-kag2m9tzdnduxdx"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-5fewsp22mmdz7y6")],
      removed: [],
      date: DATE,
    },
    stage3: "model.ts:67-110 (locations): the node at the top of a file of the contracts section is to be numbered like any other node of the base specification, not located by its file; the nodes in the cells of a TableRule are to be numbered after its children; the top node of an extension's file is to take `_guidelines/extensions/<name>` (partOf gives `_guidelines/<name>`); a part whose files lie in a folder other than _guidelines and tech is a part of the base specification, `base` included. spec-files.ts:43 sorts names with localeCompare and is to sort paths by code point. The tests at model.test.ts:9-46 and reindex.test.ts:25 are to carry s-ygg5kpcxgzq3m7w, and the contracts test is to expect the new locations.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 10: "An approved node's approval" (s-95w92rnjuv3sst8), rows 10.1.8 and 10.1.9, split in two.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each approved node for which no approval of its current wording stands (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). The refusal names the node by its file, its sid and its location.",
      "`sheriff validate` отвергает каждый одобренный узел, для нынешней формулировки которого нет действующего одобрения (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). Отказ называет файл, sid и расположение узла.",
      "Было: «`sheriff validate` ищет каждый одобренный узел в одобрениях. Последняя строка для sid узла и отпечатка его формулировки должна быть одобрением». Теперь узел начинается с того, что отвергается и что называет отказ. Что значит «одобрение действует», говорит узел «How an approval is recorded»."),
    P("`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It leaves out each section and, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), each domain's header. `sheriff reindex` derives the status of these from the nodes under them (§s-ztseyetus7np6br).",
      "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он не проверяет разделы, а если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — и заголовки доменов. Их статус `sheriff reindex` выводит из узлов под ними (§s-ztseyetus7np6br).",
      "Было: «Не проверяются: узлы SpecSheriff guidelines, которые берёт проект; раздел и заголовок домена». Узлы SpecSheriff guidelines и выбранных расширений проект берёт из плагина, поэтому достаточно сказать «в файлах, которые хранит репозиторий»: так исключаются и выбранные расширения, как требует строка 10.1.8 по вашему решению от 2026-11-18. Заголовок домена назван через расширение Domains, потому что его статус выводит `sheriff reindex`. Узлы в ячейках — новое."),
  ];
  entries["s-95w92rnjuv3sst8"] = {
    location: "tools 7.1.5",
    sidValue: "s-95w92rnjuv3sst8",
    testsFrom: ["s-95w92rnjuv3sst8", "refuses an approved node no approval stands for", "leaves the approvals of the SpecSheriff guidelines"],
    proposal: {
      title: "An approved node without a standing approval",
      ruTitle: "Одобренный узел без действующего одобрения",
      parts,
      reason: "A node's status is written in its file, where anyone can type `approved`, while only `sheriff approve` records an approval (§s-v4qus7raqnwzneb). Comparing the two finds a status typed by hand, and a status left `approved` after the wording changed. The SpecSheriff guidelines and the extensions that a project takes from the plugin are approved where they are written (§s-bsya3febm6u64ab). So only the files that the repository keeps are checked.",
      ruReason: "Статус узла записан в его файле, где кто угодно может напечатать `approved`, а одобрение записывает только `sheriff approve` (§s-v4qus7raqnwzneb). Сравнение того и другого находит статус, напечатанный вручную, и статус `approved`, оставшийся после изменения формулировки. SpecSheriff guidelines и расширения, которые проект берёт из плагина, одобрены там, где написаны (§s-bsya3febm6u64ab). Поэтому проверяются только файлы, которые хранит репозиторий.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "An agent changes the text of an approved rule, and the change is committed without `sheriff reindex`. `sheriff validate` refuses the rule, since no approval stands for its new wording. Had `sheriff reindex` run, it would have made the rule a draft, and the check would have passed.",
        "Агент меняет текст одобренного правила, и изменение коммитят без `sheriff reindex`. `sheriff validate` отвергает правило: для его новой формулировки нет действующего одобрения. Если бы `sheriff reindex` был запущен, он сделал бы правило черновиком, и проверка прошла бы.")],
      refs: [R("implements", "s-cey3k9xxjvkpyqz"), R("cites", "s-v4qus7raqnwzneb"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-ztseyetus7np6br"), R("cites", "s-bsya3febm6u64ab")],
      removed: [
        "The `implements` links to the main table of checks (s-jau82aq9juv9zzh) and to “What an approval covers” (s-5ah25f6gy99panq): the node implements row 10.1.8 (s-cey3k9xxjvkpyqz), which checks that rule.",
        "The check of who an approval that a commit adds names, and the citation of the node on earlier releases that came with it: they moved to the new node “Who an added approval names” (s-75ue25v6r23jkk8), which implements row 10.1.9.",
      ],
      date: DATE,
    },
    stage3: "validate.ts:96-103 judges the nodes of spec.nodes through judgedHere, which leaves out only spec.json and tools.json; it is to judge only the nodes of the files that the repository keeps, so that the files of the extensions taken from the plugin are left out too, and to judge the nodes in the cells of a TableRule. The tests at validate.test.ts:134 and :160 are to carry s-95w92rnjuv3sst8.",
  };
}
{
  const parts = [
    P("`sheriff validate` accepts an approval that a commit adds to `specs/_approvals.jsonl` only where it names an owner of its node (§s-6sk8uet75dmq5qz) as of that commit (§s-acacahc8c9estmr). It refuses any other approval that the commit adds. The refusal names the node by its file, its sid and its location, the email address that the approval names, and the node's owners.",
      "`sheriff validate` принимает одобрение, которое коммит добавляет в `specs/_approvals.jsonl`, только если оно называет ответственного за его узел (§s-6sk8uet75dmq5qz) на момент этого коммита (§s-acacahc8c9estmr). Любое другое одобрение, которое добавляет коммит, он отвергает. Отказ называет файл, sid и расположение узла, адрес электронной почты, который называет одобрение, и ответственных за узел.",
      "Из узла «An approved node's approval». Было: «`sheriff validate` ищет того, кого называет строка одобрения, среди ответственных за её узел в том виде, в каком их содержит коммит; так он делает для каждого одобрения, которое коммит добавляет к одобрениям родителя». Теперь сказано, что принимается и что называет отказ. Это отдельное требование, строка 10.1.9, поэтому оно стоит в своём узле."),
    P("An approval is added by a commit where `specs/_approvals.jsonl` holds more lines equal to that approval after the commit than in the commit's parent. For a merge commit, the parent is its first parent. `sheriff validate` reads the parent's approvals in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).",
      "Одобрение добавлено коммитом, если после коммита в `specs/_approvals.jsonl` строк, равных ему, больше, чем в родительском коммите. Для коммита слияния родитель — его первый родитель. Одобрения родительского коммита `sheriff validate` читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).",
      "Как было, сказано точнее, как в согласованном узле «A removed node and the archive». Ссылка на прежний узел о командах заменена ссылкой на узел о том, что `sheriff reindex` меняет в записанном более ранним выпуском: эту техническую замену называет файл продолжения."),
    P("`sheriff validate` checks only the approvals of nodes in the files that the repository keeps. It finds a node's owners as the model of the specification gives them (§s-w6gybeqn2ttydqx). Of the lines that a commit adds, it checks only approvals, since anyone may withdraw an approval (§s-fpq35tf3pehgk64).",
      "`sheriff validate` проверяет только одобрения узлов в файлах, которые хранит репозиторий. Ответственных за узел он находит так, как их даёт модель спецификации (§s-w6gybeqn2ttydqx). Из строк, которые добавляет коммит, он проверяет только одобрения, потому что отозвать одобрение может кто угодно (§s-fpq35tf3pehgk64).",
      "Новое в тексте; так делает код. Особый случай правила, которое одобряло спецификацию, убран: статус одобрения спецификации теперь задают записи в `sheriff.config.json` (правило 10.6), а их проверяет строка 10.1.27."),
  ];
  entries["new:tools-7-1-approval-by"] = {
    from: "s-95w92rnjuv3sst8",
    location: "tools 7.1.5a (new, after \"An approved node's approval\")",
    sidValue: SID.approvalBy,
    testsFrom: ["by someone none of the node's owners"],
    proposal: {
      title: "Who an added approval names",
      ruTitle: "Кого называет добавленное одобрение",
      parts,
      reason: "A node's owners may change from one commit to the next. Each approval is judged once, against the owners in the commit that adds it. A later change of owners then leaves in force the approvals given before it.",
      ruReason: "Ответственные за узел могут меняться от коммита к коммиту. Каждое одобрение оценивается один раз — по ответственным в том коммите, который его добавляет. Тогда последующая смена ответственных оставляет в силе одобрения, данные до неё.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "The nearest section above a rule names `a@example.com` as its owner. A commit adds an approval of the rule by `b@example.com`, and `sheriff validate` refuses it, naming both addresses. A commit that also makes `b@example.com` an owner of that section is accepted. The closest mistake is to judge the approval against the owners that the commit's parent holds, which would refuse that second commit.",
        "Ближайший раздел над правилом называет ответственным `a@example.com`. Коммит добавляет одобрение правила от `b@example.com`, и `sheriff validate` его отвергает, называя оба адреса. Коммит, который к тому же делает `b@example.com` ответственным за этот раздел, принимается. Ближайшая ошибка — оценивать одобрение по ответственным в родительском коммите: тогда второй коммит был бы отвергнут.")],
      refs: [R("implements", "s-acacahc8c9estmr"), R("cites", "s-6sk8uet75dmq5qz"), R("cites", "s-gb8s9657a65hqmv"), R("cites", "s-w6gybeqn2ttydqx"), R("cites", "s-fpq35tf3pehgk64")],
      removed: [],
      date: DATE,
    },
    stage3: "validate.ts:106-113 judges the rule that approved the specification against the specification's owners; that rule is replaced by an entry in sheriff.config.json (s-qzthyh7yqvfhsa2), so the branch on APPROVAL_RULE goes, and the second half of the test at validate.test.ts:143 with it. The test is to carry s-75ue25v6r23jkk8, and the comment at approvals.ts:129 is to cite s-75ue25v6r23jkk8 instead of s-95w92rnjuv3sst8.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 11: "Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt"
// (s-agc6fb3vx46pc23), rows 10.1.10, 10.1.16, 11.3.2 and 12.12.14, with row 11.3.1 in a new node.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` computes each of the following values as `sheriff reindex` writes them (§s-ztseyetus7np6br), for each node of the specification in the files that the repository keeps:",
      "`sheriff validate` вычисляет каждое из следующих значений так, как их пишет `sheriff reindex` (§s-ztseyetus7np6br), для каждого узла спецификации в файлах, которые хранит репозиторий:",
      "Было: «`sheriff validate` заново строит в памяти следующее и сравнивает с тем, что закоммичено». Теперь сказано, что значения вычисляются так, как их пишет `sheriff reindex` по согласованному узлу «What `sheriff reindex` writes», и для каких узлов."),
    L("the links pointing at the node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;",
      "связи, указывающие на узел (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), сравниваемые без учёта их порядка;",
      "Строка 10.1.16. Порядок не сравнивается: так делает код."),
    L("the approval status of a section, with the nodes in the cells of a `TableRule` counted among the nodes under the section (§s-9kfdycuq34beqvs, §s-5fewsp22mmdz7y6, §s-k3hrk8u9uz9mpz7);",
      "статус одобрения раздела, причём узлы в ячейках `TableRule` считаются узлами под разделом (§s-9kfdycuq34beqvs, §s-5fewsp22mmdz7y6, §s-k3hrk8u9uz9mpz7);",
      "Строка 10.1.10. Узлы в ячейках — новое. Статус заголовка домена больше не сравнивается: ни одна строка таблиц проверок этого не требует, и расширение Domains его не определяет (см. изменения, нужные вне группы)."),
    L("where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the index of sections in a domain's header, which the header holds only where the domain has sections (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);",
      "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), — указатель разделов в заголовке домена; заголовок содержит его, только если у домена есть разделы (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);",
      "Строка 11.3.2 таблицы проверок расширения Domains. «Только если у домена есть разделы» — по вашему решению по этой строке от 2026-11-18."),
    L("where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered beside a field with `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).",
      "если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), — значения, собранные рядом с полем с `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).",
      "Строка 12.12.14 таблицы проверок расширения RecordType. Поле «с `enum`» вместо поля «типа `one of`» — по вашему решению от 2026-11-19."),
    P("`sheriff validate` refuses each node whose value differs from the one computed. The refusal names the node by its file, its sid and its location, and names the value.",
      "`sheriff validate` отвергает каждый узел, значение которого отличается от вычисленного. Отказ называет файл, sid и расположение узла, а также это значение.",
      "Новое в тексте: что отвергается и что называет отказ."),
  ];
  entries["s-agc6fb3vx46pc23"] = {
    location: "tools 7.1.9",
    sidValue: "s-agc6fb3vx46pc23",
    testsFrom: ["s-agc6fb3vx46pc23", "incoming links the outgoing ones do not produce", "whose status is not the one the nodes under it produce", "a header whose index its sections do not produce"],
    proposal: {
      title: "Values built from other nodes",
      ruTitle: "Значения, построенные из других узлов",
      parts,
      reason: "Each of these values is built from other nodes, so an edit to one node leaves another node's value out of date until `sheriff reindex` runs. Computing every such value anew finds a commit that holds an out-of-date value, or one written by hand.",
      ruReason: "Каждое из этих значений построено из других узлов, поэтому правка одного узла оставляет значение другого устаревшим, пока не запущен `sheriff reindex`. Вычисление каждого такого значения заново находит коммит, в котором есть устаревшее значение или значение, написанное вручную.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A node of `tools.json` gains an `implements` link to a row of the main table of checks, and the change is committed without `sheriff reindex`. `sheriff validate` refuses the row, since the links pointing at it lack the new link.",
        "Узел `tools.json` получает связь `implements` со строкой основной таблицы проверок, и изменение коммитят без `sheriff reindex`. `sheriff validate` отвергает эту строку: среди связей, указывающих на неё, нет новой связи.")],
      refs: [R("implements", "s-xdk44dt9uxdeb2b"), R("implements", "s-k3hrk8u9uz9mpz7"), R("implements", "s-6n2ab7escdtspwe"), R("implements", "s-93jpnb4c96qhwbu"), R("cites", "s-ztseyetus7np6br"), R("cites", "s-bpdqd9v72wg7vsz"), R("cites", "s-9kfdycuq34beqvs"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-2r59txnms5serdr"), R("cites", "s-hzuzn8hbq6q9q4s"), R("cites", "s-ju5vcanbjph7mgh")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rows 10.1.10, 10.1.16, 11.3.2 and 12.12.14.",
        "The `implements` links to “Gathered values are written beside their field” (s-ju5vcanbjph7mgh) and to “How a section's approval status is determined” (s-9kfdycuq34beqvs), which are now `cites` links: the rows that the node implements check those rules.",
        "The comparison of the approval status of a domain's header: no row of the tables of checks asks for it, and no rule of the Domains extension says how that status is derived.",
        "The check that every domain has a header, which impl.json maps to this node: it moved to the new node “One header for each domain” (s-8esbyvaj2yx5eqf), which implements row 11.3.1.",
      ],
      date: DATE,
    },
    stage3: "validate.ts: the status of a domain's header is no longer compared (line 99 compares it for every container); a section's status is to count the nodes in the cells of a TableRule (builtStatuses in model.ts walks only children); a header of a domain without sections is to hold no index, where reindex.ts:176-181 writes an empty one; the gathered values are to be read from `x-enumSource.gathered` (validate.ts:370-377); in a project, spec.nodes include the SpecSheriff guidelines taken from the plugin, and only the nodes of the files that the repository keeps are to be compared. The test \"refuses values gathered beside a field...\" (validate.test.ts:508) keeps s-agc6fb3vx46pc23; the tests at validate.test.ts:154, :245 and :279 are to carry it as well.",
  };
}
{
  const parts = [
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a domain only where the domain's files hold exactly one header (§s-yggv9myedprnaa7, §s-ctj5v22yn7wr7n4). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает домен, только если в файлах домена ровно один заголовок (§s-yggv9myedprnaa7, §s-ctj5v22yn7wr7n4). Файлы домена — это файлы в его папке `specs/<domain>/` (§s-zefk589ykh37b8u).",
      "Новый узел для строки 11.3.1, которую impl.json относит к узлу «Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt». «Ровно один» — по вашему решению по этой строке от 2026-11-19: заголовок, скопированный в другой документ домена, проходил проверку."),
    P("`sheriff validate` refuses any other domain. The refusal names the domain's folder and, for each header that the domain's files hold, the header's file and sid.",
      "Любой другой домен `sheriff validate` отвергает. Отказ называет папку домена и для каждого заголовка в файлах домена — файл и sid этого заголовка.",
      "Новое: код отвергает только домен без заголовка и называет его папку."),
  ];
  entries["new:tools-7-1-one-header"] = {
    from: "s-agc6fb3vx46pc23",
    location: "tools 7.1.9a (new, after \"Values built from other nodes\")",
    sidValue: SID.oneHeader,
    testsFrom: ["a domain without a header"],
    proposal: {
      title: "One header for each domain",
      ruTitle: "Один заголовок у каждого домена",
      parts,
      reason: "A domain may be divided into several documents (§s-k73czmpkazcx7mu), only one of which holds its header. So only a reading of all the domain's files shows a missing header or a second one.",
      ruReason: "Домен может быть разделён на несколько документов (§s-k73czmpkazcx7mu), и заголовок есть только в одном из них. Поэтому недостающий или второй заголовок видно, только если прочитать все файлы домена.",
      reasonChange: "Новое.",
      examples: [X(
        "A domain `requests` is divided into `specs/requests/00-requests.json` and `specs/requests/intake.json`, and its header was copied into both files. `sheriff validate` refuses the domain and names both files. Had the header been moved rather than copied, the domain would pass.",
        "Домен `requests` разделён на `specs/requests/00-requests.json` и `specs/requests/intake.json`, и его заголовок скопирован в оба файла. `sheriff validate` отвергает домен и называет оба файла. Если бы заголовок перенесли, а не скопировали, домен прошёл бы проверку.")],
      refs: [R("implements", "s-ctj5v22yn7wr7n4"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-k73czmpkazcx7mu")],
      removed: [],
      date: DATE,
    },
    stage3: "validate.ts:223-241 keeps the last header that it finds in a domain's files and refuses only a domain without one; it is to refuse a domain whose files hold two headers or more, naming the file and sid of each. The domain checks are to run only where the Domains extension is chosen: isDomain (model.ts:244) treats every part other than _guidelines, contracts, tech and _archive as a domain, `base` included. The test at validate.test.ts:279 is to be split, its first half carrying s-8esbyvaj2yx5eqf.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 12: "Outgoing links and citations" (s-qzyacnqwvaeaps4), rows 10.1.12 to 10.1.14.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6):",
      "`sheriff validate` отвергает каждое из следующего в узле спецификации в файлах, которые хранит репозиторий, в том числе в узле в ячейке `TableRule` (§s-5fewsp22mmdz7y6):",
      "Было: «`sheriff validate` разрешает цель каждой исходящей связи среди существующих sid» и «читает ссылки в каждом узле и сопоставляет их со связями узла». Теперь узел начинается с того, что отвергается, по строкам 10.1.12–10.1.14."),
    L("a link whose target is a sid that no node of the model of the specification holds (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a);",
      "связь, цель которой — sid, которого нет ни у одного узла модели спецификации (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a);",
      "Строка 10.1.12. Цель связи ищется только среди узлов спецификации — узлов, которые содержит модель спецификации: у архивного узла больше нет sid, а тип связи `supersedes` убран, по вашему решению по этой строке от 2026-11-13. Модель названа ссылкой на согласованный узел о ней, чтобы не перечислять снова, какие узлы она содержит."),
    L("a sid that the node cites without declaring a link to the node that holds that sid (§s-vwyke96ggxx79je);",
      "sid, на который узел ссылается, не объявляя связи с узлом, у которого этот sid (§s-vwyke96ggxx79je);",
      "Строка 10.1.13, первая фраза."),
    L("a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);",
      "связь `cites` с узлом, на который узел не ссылается, или с узлом, с которым узел объявляет и связь другого типа (§s-vwyke96ggxx79je);",
      "Строка 10.1.13, вторая фраза."),
    L("a citation by location (§s-whftqmshzc5wzhw).",
      "ссылка по расположению (§s-whftqmshzc5wzhw).",
      "Строка 10.1.14."),
    P("The refusal names the node by its file, its sid and its location, and names the link or the citation.",
      "Отказ называет файл, sid и расположение узла, а также связь или ссылку.",
      "Новое в тексте; так делает код."),
    P("A `§` followed by a sid and then by no lower-case letter or digit cites that sid, in text in backticks too (§s-cxtt6jvhqcey2k9). A citation of the node's own sid needs no link. A `§` followed by anything else, up to a space, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.",
      "`§`, за которым следует sid, а за ним нет строчной буквы или цифры, — ссылка на этот sid, в том числе в тексте в обратных кавычках (§s-cxtt6jvhqcey2k9). Ссылка узла на собственный sid связи не требует. `§`, за которым следует что-либо иное, до пробела, запятой, точки с запятой или закрывающей скобки, — ссылка по расположению, если только он не стоит в тексте в обратных кавычках.",
      "Как было. Добавлено, что ссылка узла на собственный sid связи не требует: правило 6.3 требует связи с каждым другим узлом. В тексте в обратных кавычках sid считается ссылкой, а расположение — нет, как в строке 10.1.14."),
    P("`sheriff validate` reads every property of the node for citations except the following, in which a citation does not count (§s-cxtt6jvhqcey2k9):",
      "При поиске ссылок `sheriff validate` читает все свойства узла, кроме следующих, в которых ссылка не учитывается (§s-cxtt6jvhqcey2k9):",
      "Было: «Оглавление заголовка и значения, собранные рядом с полем, не читаются». Теперь перечислено всё, что исключает правило 6.3, вместе с узлами в ячейках `TableRule`."),
    L("its links;", "его связей;", "Из правила 6.3."),
    L("the nodes under it, the nodes in its cells included;", "узлов под ним, в том числе узлов в его ячейках;", "Из правила 6.3; узлы в ячейках — новое."),
    L("the index of sections in a domain's header and the values gathered beside a field, which are built from other nodes.",
      "указателя разделов в заголовке домена и значений, собранных рядом с полем: они построены из других узлов.",
      "Как было."),
    P("`sheriff validate` reads the text cells of a `TableRule`, and the headings of its columns and groups, as properties of the `TableRule`.",
      "Текстовые ячейки `TableRule` и заголовки его столбцов и групп `sheriff validate` читает как свойства этого `TableRule`.",
      "Новое: узел говорит, чьи ссылки стоят в текстовых ячейках `TableRule`; так их читает и сборка новой формы (moved/report.md)."),
  ];
  entries["s-qzyacnqwvaeaps4"] = {
    location: "tools 7.1.7",
    sidValue: "s-qzyacnqwvaeaps4",
    testsFrom: ["s-qzyacnqwvaeaps4", "a link to no node", "a cites link beside a link of another type", "a node citing another by its location", "reads the citations of a node"],
    proposal: {
      title: "Outgoing links and citations",
      ruTitle: "Исходящие связи и ссылки",
      parts,
      reason: "A citation may stand in any property of a node, its decisions included. So every property is read except those that hold links, other nodes or values built from other nodes. A sid in backticks still names a node, while a location in backticks only shows what a refused citation looks like.",
      ruReason: "Ссылка может стоять в любом свойстве узла, в том числе в его решениях. Поэтому читаются все свойства, кроме тех, что содержат связи, другие узлы или значения, построенные из других узлов. Sid в обратных кавычках по-прежнему называет узел, а расположение в обратных кавычках лишь показывает, как выглядит отвергаемая ссылка.",
      reasonChange: "Было: «Узел может показать в обратных кавычках, как выглядит отвергнутая ссылка». Теперь обоснование объясняет и то, почему читаются все свойства.",
      examples: [X(
        "A node's reason shows a refused citation as `§base/3.2`, in backticks, and `sheriff validate` accepts it. The same characters without backticks are refused as a citation by location. A sid in backticks still counts as a citation, so the node must declare a link to that sid's node.",
        "Обоснование узла показывает отвергаемую ссылку как `§base/3.2`, в обратных кавычках, и `sheriff validate` это принимает. Те же символы без обратных кавычек отвергаются как ссылка по расположению. Sid в обратных кавычках всё равно считается ссылкой, поэтому узел должен объявить связь с узлом этого sid.")],
      refs: [R("implements", "s-x8usyy38qa56k6a"), R("implements", "s-vwyke96ggxx79je"), R("implements", "s-whftqmshzc5wzhw"), R("implements", "s-cxtt6jvhqcey2k9"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-w6gybeqn2ttydqx")],
      removed: [
        "The `implements` links to the main table of checks (s-jau82aq9juv9zzh) and to “Incoming links are built” (s-bpdqd9v72wg7vsz): the node implements rows 10.1.12 to 10.1.14 and “A cited node is also linked” (s-cxtt6jvhqcey2k9), which says what a citation is.",
        "Resolving a link's target among every sid that exists: an archived node holds no sid, and the link type `supersedes` is gone (s-sn6au3vcr9uy5pm).",
      ],
      date: DATE,
    },
    stage3: "validate.ts:136-139 resolves a `supersedes` link among the sids of the archive; the type is gone, and a link's target is to be looked for only among the nodes of the model, the nodes in cells included. model.ts:112 (NOT_CITING) is to set aside the nodes in the cells of a TableRule and `x-enumSource.gathered`, and to read the text cells and the headings of a TableRule. The checks are to read only the nodes of the files that the repository keeps and the nodes in their cells. The tests at validate.test.ts:211, :223 and :230 and model.test.ts:48 are to carry s-qzyacnqwvaeaps4.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 13: "The NodeKinds at the ends of a link" (s-pvnnr844f3y964m), row 10.1.15.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` accepts a link of type `term-relation` or `uses` only where it goes from a term node to another term node (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, `cites` included, only where at least one of its ends is a node other than a term node.",
      "`sheriff validate` принимает связь типа `term-relation` или `uses`, только если она идёт от узла-термина к другому узлу-термину (§s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). Связь любого другого типа, в том числе `cites`, он принимает, только если хотя бы на одном её конце узел, который не является узлом-термином.",
      "Было: «`sheriff validate` находит NodeKind узла на каждом конце каждой исходящей связи и сопоставляет его с типом связи». Теперь сказано, какие связи принимаются, по строке 10.1.15. Имя NodeKind вы убрали 2026-11-10."),
    P("`sheriff validate` refuses every other link that a node of the specification in the files that the repository keeps declares. The refusal names the node that declares the link by its file, its sid and its location, and names the link's type and its target. It says that the link is to be settled with the specification's owners.",
      "Любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, `sheriff validate` отвергает. Отказ называет файл, sid и расположение узла, который объявляет связь, а также тип связи и её цель. Он говорит, что связь нужно решить с ответственными за спецификацию.",
      "Новое в тексте; так делает код. Что отказ отсылает к ответственным, — из стоимости строки 10.1.15: «отвергается и решается с ответственными за спецификацию»."),
  ];
  entries["s-pvnnr844f3y964m"] = {
    location: "tools 7.1.8",
    sidValue: "s-pvnnr844f3y964m",
    testsFrom: ["s-pvnnr844f3y964m", "a term-relation not binding two terms"],
    proposal: {
      title: "The types of a link between terms",
      ruTitle: "Типы связи между терминами",
      parts,
      reason: "Whether two terms are bound, and how, says how the entities that they name relate, which only the specification's owners can decide (§s-9w3u3wn37wksyxd). So the refusal sends whoever wrote the link to them, rather than suggesting a type.",
      ruReason: "Связаны ли два термина и как, говорит о том, как соотносятся сущности, которые они называют, а решить это могут только ответственные за спецификацию (§s-9w3u3wn37wksyxd). Поэтому отказ отсылает автора связи к ним, а не подсказывает тип.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A term cites another term and declares a `cites` link to it. `sheriff validate` refuses that link and sends the author to the owners. They decide whether the terms are bound by a `term-relation` link, and in which ratio, or by a `uses` link.",
        "Термин ссылается на другой термин и объявляет с ним связь `cites`. `sheriff validate` отвергает эту связь и отсылает автора к ответственным. Те решают, связаны ли термины связью `term-relation`, и в каком соотношении, или связью `uses`.")],
      refs: [R("implements", "s-s79v9mmyw56hgpx"), R("cites", "s-76dutms9uv6uha2"), R("cites", "s-9w3u3wn37wksyxd")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.15 (s-s79v9mmyw56hgpx).",
        "The name NodeKind, which the owner removed on 2026-11-10 (s-vsh384ybt4w25a2).",
      ],
      date: DATE,
    },
    stage3: "validate.ts:147-151 already refuses both cases. Its message says \"the specification's owner\" and is to say \"owners\". It reads spec.nodes, which in a project include the SpecSheriff guidelines taken from the plugin, and is to read only the nodes of the files that the repository keeps. The test at validate.test.ts:236 is to carry s-pvnnr844f3y964m.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 14: "Words running in capitals" (s-e2vdhfsndy5stq9), row 10.1.17.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the node by its file, its sid and its location, the property that holds the run, and the run.",
      "`sheriff validate` отвергает каждые три и более слова подряд, набранные заглавными буквами (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). Отказ называет файл, sid и расположение узла, свойство, в котором стоят эти слова, и сами слова.",
      "Было: «`sheriff validate` читает заголовок, текст и обоснование каждого одобренного узла, а также каждого раздела и заголовка домена, ища три или более слова заглавными подряд». Теперь узел начинается с того, что отвергается и что называет отказ. Аббревиатуры не исключаются: правило 7.6.2 запрещает три слова заглавными подряд, аббревиатуры в том числе, поэтому критерий строки 10.1.17 проверяет ровно то, что требует 7.6.2 (решено 2026-11-20, файл продолжения)."),
    P("`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its status. It reads a node's title, text and reason, the text in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm). It reads a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) as it reads any other node.",
      "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, каким бы ни был его статус. Он читает заголовок, текст и обоснование узла, текст в каждом элементе его `TextRule.list` и каждую текстовую ячейку `TableRule` (§s-qeensty237e6mmm). Узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6) он читает так же, как любой другой узел.",
      "Теперь проверяется каждый узел, в том числе черновик, как требует строка 10.1.17 по вашему решению от 2026-11-13; заголовок домена отдельно не упоминается. Элементы списка и текстовые ячейки — новое: это части узла, к которым правило 7.1 относит правила о том, как пишется узел."),
    P("In what it reads:", "В том, что он читает:", "Новое в тексте."),
    L("a word set in capitals is two or more characters long, starts with a capital letter, ends with a capital letter or a digit, and holds only capital letters, digits and hyphens, of any script;",
      "слово, набранное заглавными, — это слово из двух или более знаков, которое начинается с заглавной буквы, заканчивается заглавной буквой или цифрой и состоит только из заглавных букв, цифр и дефисов, в любой письменности;",
      "Было: «каждое такое слово — из двух или более знаков». Теперь сказано и то, из чего состоит слово, как его определяет код, в том числе для любой письменности."),
    L("a run is three or more such words with only spaces or tabs between them;",
      "подряд идут такие слова, между которыми только пробелы или табуляции;",
      "Как было."),
    L("text in backticks or in double quotation marks is left out, since a quotation keeps the spelling of what it quotes (§s-7anvune6h4f6mbr).",
      "текст в обратных кавычках или в двойных кавычках не учитывается, потому что цитата сохраняет написание того, что она цитирует (§s-7anvune6h4f6mbr).",
      "Как было; добавлено почему, по правилу 7.6.1 о цитатах."),
  ];
  entries["s-e2vdhfsndy5stq9"] = {
    location: "tools 7.1.10",
    sidValue: "s-e2vdhfsndy5stq9",
    testsFrom: ["s-e2vdhfsndy5stq9", "running in capitals"],
    proposal: {
      title: "A run of words in capitals",
      ruTitle: "Слова заглавными буквами подряд",
      parts,
      reason: "A single capital letter, such as the article “A” at the start of a sentence, is ordinary capitalisation. So a word set in capitals has at least two characters. Words separated by punctuation, such as abbreviations in a list, do not form a phrase, so only spaces and tabs join a run.",
      ruReason: "Одна заглавная буква, например артикль «A» в начале предложения, — обычное написание с заглавной. Поэтому слово, набранное заглавными, состоит хотя бы из двух знаков. Слова, разделённые знаками препинания, например аббревиатуры в перечне, не образуют фразы, поэтому подряд идущими слова делают только пробелы и табуляции.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A rule's text ends with the words WITHOUT ANY EXCEPTION, written as part of its sentence. `sheriff validate` refuses the node and names that run. Two abbreviations in a row, such as REST API, pass.",
        "Текст правила заканчивается словами WITHOUT ANY EXCEPTION, написанными как часть предложения. `sheriff validate` отвергает узел и называет эти слова. Две аббревиатуры подряд, например REST API, проходят.")],
      refs: [R("implements", "s-83natrftdsmttsu"), R("cites", "s-m6upmfq64kw5h4r"), R("cites", "s-qeensty237e6mmm"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-7anvune6h4f6mbr")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.17 (s-83natrftdsmttsu).",
        "Reading only approved nodes, sections and headers: row 10.1.17 covers every sentence of the specification, drafts included (the owner, 2026-11-13).",
      ],
      date: DATE,
    },
    stage3: "validate.ts:158-172 reads only the title, text and reason of approved nodes, sections and headers; it is to read every node whatever its status, the text in the members of `TextRule.list`, the text cells of a TableRule and the nodes in its cells, and only the nodes of the files that the repository keeps. Its message is to drop \"approved\" and \"a section or a header\". The tests at validate.test.ts:251 and :263 are to carry s-e2vdhfsndy5stq9, and the first is to expect a draft refused too.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 15: "A section with a rule in it" (s-zhen42p6mnaxu7w), row 10.1.18.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp), whatever its status. It refuses any other section, naming it by its file, its sid and its location.",
      "`sheriff validate` принимает раздел спецификации в файлах, которые хранит репозиторий, только если в разделе есть правило (§s-exxuckgakfxkycp), каким бы ни был его статус. Любой другой раздел он отвергает, называя его файл, sid и расположение.",
      "Было: «`sheriff validate` читает дочерние узлы каждого раздела и каждого раздела внутри него, ища узел, который считается правилом». Теперь узел начинается с того, что принимается и что отвергается. «Каким бы ни был его статус» — так делает код."),
    P("A section contains a rule where at least one of the nodes directly under it is one of the following:",
      "В разделе есть правило, если хотя бы один из узлов непосредственно под ним — одно из следующего:",
      "Было: ссылка на правило 8.1. Что считается правилом раздела, теперь говорят правило 8.2, правило 8.6 о `TableRule` и правило 12.3a расширения RecordType, которое вы согласовали 2026-11-21. Узел перечисляет типы сам, потому что инструментам нужен полный список."),
    L("a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension, of the kind `RecordType` (§s-ktfstpv8rurznrp);",
      "узел типа `TextRule` или `TableRule` (§s-5fewsp22mmdz7y6), а если проект выбрал расширение RecordType, — типа `RecordType` (§s-ktfstpv8rurznrp);",
      "`TableRule` и RecordType названы впервые."),
    L("a term or a node of a project's own kind (§s-pctqj9wqaq8762t);",
      "термин или узел собственного типа проекта (§s-pctqj9wqaq8762t);",
      "По правилу 8.2."),
    L("a section that contains a rule.",
      "раздел, в котором есть правило.",
      "По правилу 8.2: правила вложенного раздела считаются правилами раздела."),
  ];
  entries["s-zhen42p6mnaxu7w"] = {
    location: "tools 7.1.11",
    sidValue: "s-zhen42p6mnaxu7w",
    testsFrom: ["s-zhen42p6mnaxu7w", "every section holding no rule", "as a rule of its section"],
    proposal: {
      title: "A section with a rule in it",
      ruTitle: "Раздел, в котором есть правило",
      parts,
      reason: "A section whose rules have all been moved or removed still reads as a part of the specification. Its derived status gives no sign of it. The kinds of the nodes under a section show whether it contains a rule, without reading their wording.",
      ruReason: "Раздел, все правила которого перенесены или удалены, по-прежнему выглядит частью спецификации. Его выведенный статус этого не показывает. Типы узлов под разделом показывают, есть ли в нём правило, без чтения их формулировок.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      refs: [R("implements", "s-exxuckgakfxkycp"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-pctqj9wqaq8762t")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.18 (s-exxuckgakfxkycp).",
        "The citation of “A section contains rules and requires nothing” (s-7445ahgjck2aefg) for what counts as a rule: “What is considered a rule of a section” (s-pctqj9wqaq8762t) now says it, and “A RecordType is a rule” (s-ktfstpv8rurznrp) adds the RecordType.",
      ],
      date: DATE,
    },
    stage3: "validate.ts:160 and :216-218 count any kind other than a section and a header as a rule, which matches the node. They read spec.nodes, which in a project include the SpecSheriff guidelines taken from the plugin, and are to read only the nodes of the files that the repository keeps. The tests at validate.test.ts:272 and :488 are to carry s-zhen42p6mnaxu7w.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 16: "`consumes` and `exempts` links" (s-qvgzubkrafadqgf), rows 10.1.19 and 11.3.3, split in two.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where all of the following hold:",
      "`sheriff validate` принимает связь `exempts` (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h), только если выполнено всё следующее:",
      "Было: «`sheriff validate` читает, что стоит на каждом конце каждой связи `consumes` и `exempts`». Связь `consumes` теперь проверяет строка 11.3.3 расширения Domains, поэтому её проверка вынесена в новый узел «`consumes` links». Теперь узел начинается с того, что принимается, по строке 10.1.19."),
    L("the node that declares the link is a node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
      "узел, который объявляет связь, — узел собственных guidelines проекта, которые хранятся в `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
      "Как было."),
    L("the link's target is a section or a rule, that is, a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);",
      "цель связи — раздел или правило, то есть узел типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp) либо собственного типа проекта (§s-vsh384ybt4w25a2);",
      "Было: «правило, узел собственного NodeKind проекта или раздел». Имя NodeKind вы убрали 2026-11-10. `TableRule` и RecordType — тоже правила: по правилу 8.6 и по правилу 12.3a, которое вы согласовали 2026-11-21."),
    L("the text of the node that declares the link cites the target (§s-cxtt6jvhqcey2k9).",
      "текст узла, который объявляет связь, ссылается на цель (§s-cxtt6jvhqcey2k9).",
      "Новое: вторая фраза строки 10.1.19, по вашему решению от 2026-11-13."),
    P("`sheriff validate` looks for that citation only in the text of the node. It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location, and naming the link's target.",
      "Эту ссылку `sheriff validate` ищет только в тексте узла. Любую другую связь `exempts` он отвергает, называя файл, sid и расположение узла, который её объявляет, и цель связи.",
      "Новое: как вы указали в todo строки 10.1.19, ссылка в заголовке или в обосновании не считается."),
  ];
  entries["s-qvgzubkrafadqgf"] = {
    location: "tools 7.1.12",
    sidValue: "s-qvgzubkrafadqgf",
    testsFrom: ["s-qvgzubkrafadqgf", "an exempts link from a node of the project's own guidelines", "lets an exempts link reach it"],
    proposal: {
      title: "`exempts` links",
      ruTitle: "Связи `exempts`",
      parts,
      reason: "The exempting node says in its own text why the exemption is made (§s-gf6n8ge4mke3pr2), so a citation of the target counts only there.",
      ruReason: "Освобождающий узел говорит в собственном тексте, почему сделано освобождение (§s-gf6n8ge4mke3pr2), поэтому ссылка на цель считается только там.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A rule of `project.json` exempts a rule on printed receipts, since the system prints nothing. Its text says so and cites that rule, and it declares an `exempts` link to that rule, so `sheriff validate` accepts the link. The closest mistake is to cite the rule only in the reason, and `sheriff validate` then refuses the link.",
        "Правило `project.json` освобождает правило о печатных чеках, потому что система ничего не печатает. Его текст говорит это и ссылается на то правило, а само оно объявляет с тем правилом связь `exempts`, поэтому `sheriff validate` связь принимает. Ближайшая ошибка — сослаться на правило только в обосновании: тогда `sheriff validate` связь отвергает.")],
      refs: [R("implements", "s-6u54kfn4ze29r6h"), R("cites", "s-gf6n8ge4mke3pr2"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ktfstpv8rurznrp"), R("cites", "s-vsh384ybt4w25a2"), R("cites", "s-cxtt6jvhqcey2k9")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.19 (s-6u54kfn4ze29r6h).",
        "The check of a `consumes` link: it is row 11.3.3 of the Domains extension, which the new node “`consumes` links” (s-p3n666zfjdrrw6a) implements.",
        "The citations of “The implementation of an approved rule” (s-6fw72j65jkqrfpf) and “What a link is” (s-sn6au3vcr9uy5pm): the node now cites “Exempting a rule from being implemented” (s-gf6n8ge4mke3pr2), which states what an exemption is.",
        "The name NodeKind, which the owner removed on 2026-11-10 (s-vsh384ybt4w25a2).",
      ],
      date: DATE,
    },
    stage3: "validate.ts:250-256 checks only the two ends of the link. It is to accept a TableRule and a RecordType as targets, and to refuse a link whose declaring node's text does not cite the target, as the todo of row 10.1.19 says, the test written first and seen failing. The tests at validate.test.ts:303 and :488 are to carry s-qvgzubkrafadqgf.",
  };
}
{
  const parts = [
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). It refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location, and naming the link's target.",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает связь `consumes`, только если она идёт от заголовка домена к разделу в файлах другого домена (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). Любую другую связь `consumes` он отвергает, называя файл, sid и расположение узла, который её объявляет, и цель связи.",
      "Из узла «`consumes` and `exempts` links». Было: «связь `consumes` — на заголовок домена в её начале и раздел другого домена в её конце». Теперь это отдельный узел, потому что строка 11.3.3 принадлежит таблице проверок расширения Domains, а не основной таблице проверок."),
  ];
  entries["new:tools-7-1-consumes"] = {
    from: "s-qvgzubkrafadqgf",
    location: "tools 7.1.12a (new, after \"`exempts` links\")",
    sidValue: SID.consumes,
    testsFrom: ["a consumes link that does not go from a header to a section of another domain"],
    proposal: {
      title: "`consumes` links",
      ruTitle: "Связи `consumes`",
      parts,
      reason: "A domain's header states what the domain uses (§s-yggv9myedprnaa7), so a `consumes` link from it says which domain uses the section that it names. The domain of each end is the folder of that end's file (§s-zefk589ykh37b8u).",
      ruReason: "Заголовок домена говорит, чем пользуется домен (§s-yggv9myedprnaa7), поэтому связь `consumes` от него говорит, какой домен пользуется разделом, который она называет. Домен каждого конца — папка файла этого конца (§s-zefk589ykh37b8u).",
      reasonChange: "Новое.",
      refs: [R("implements", "s-rdavpdea67hsntf"), R("cites", "s-tdm3rwsppnuh6dm"), R("cites", "s-yggv9myedprnaa7"), R("cites", "s-zefk589ykh37b8u")],
      removed: [],
      date: DATE,
    },
    stage3: "validate.ts:257-266 already refuses such a link. It is to run only where the Domains extension is chosen. The test at validate.test.ts:296 is to carry s-p3n666zfjdrrw6a.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 17: a new node for row 10.1.20a.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines declares to a node of an extension of the guidelines (§s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location, and names the link's type and its target.",
      "`sheriff validate` отвергает каждую связь, которую правило SpecSheriff guidelines объявляет с узлом расширения guidelines (§s-zyaf34chxugtjyn). Отказ называет файл, sid и расположение правила, а также тип связи и её цель.",
      "Новый узел для строки 10.1.20a, которую вы приняли 2026-11-13. Её todo требует узла описания инструментов, который её реализует, с тестом, написанным первым."),
    P("`sheriff validate` makes this check only where the repository keeps `specs/_guidelines/spec.json`, the file of the SpecSheriff guidelines (§s-zefk589ykh37b8u). It reads every node of that file other than a section, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). A node of an extension is a node of a file in `specs/_guidelines/extensions/`.",
      "Эту проверку `sheriff validate` делает, только если репозиторий хранит `specs/_guidelines/spec.json` — файл SpecSheriff guidelines (§s-zefk589ykh37b8u). Он читает каждый узел этого файла, кроме раздела, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Узел расширения — это узел файла в `specs/_guidelines/extensions/`.",
      "Новое. В проекте SpecSheriff guidelines и расширения приходят из плагина, уже проверенными там, где они написаны."),
    P("A citation of a node of an extension is refused through the link that the citation requires (§s-qzyacnqwvaeaps4).",
      "Ссылка на узел расширения отвергается через связь, которую эта ссылка требует (§s-qzyacnqwvaeaps4).",
      "Новое: отдельной проверки ссылок не нужно, потому что каждая ссылка требует связи (строка 10.1.13), а правило 1.7.3 запрещает и ссылку, и связь."),
  ];
  entries["new:tools-7-1-guidelines-to-extension"] = {
    location: "tools 7.1.12b (new, after \"`consumes` links\")",
    sidValue: SID.toExtension,
    testsFrom: ["match no test"],
    proposal: {
      title: "A link from the SpecSheriff guidelines to an extension",
      ruTitle: "Связь SpecSheriff guidelines с расширением",
      parts,
      reason: "In the repository where the SpecSheriff guidelines are written, the extensions are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check. The folder of each node's file shows whether the node belongs to the SpecSheriff guidelines or to an extension.",
      ruReason: "В репозитории, где пишутся SpecSheriff guidelines, расширения хранятся рядом с ними. Поэтому связь правила guidelines с узлом расширения разрешается и проходит все остальные проверки. Папка файла каждого узла показывает, принадлежит ли узел SpecSheriff guidelines или расширению.",
      reasonChange: "Новое.",
      refs: [R("implements", "s-zyaf34chxugtjyn"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-qzyacnqwvaeaps4")],
      removed: [],
      date: DATE,
    },
    stage3: "No code makes this check yet. Its test is written first and seen failing, as the todo of row 10.1.20a (s-zyaf34chxugtjyn) says; once the test passes, that todo is removed from the row.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 18: "`implements` and `refines` links of the appendices and a project's own guidelines" (s-yprj7d6tnvauggr),
// rows 10.1.22 to 10.1.24.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` requires each of the following nodes, other than a section, to declare the link named for it:",
      "`sheriff validate` требует, чтобы каждый из следующих узлов, кроме раздела, объявлял названную для него связь:",
      "Было: «`sheriff validate` разрешает исходящие связи `implements` и `refines` каждого узла, кроме раздела, и читает, к какой части относится узел, который называет каждая из них». Теперь сказано, какой узел какую связь и с чем должен объявить, как требует запись к строке 10.1.22 в файле продолжения."),
    L("a node of the technical appendix outside the section on the stack and the technical debt section: an `implements` link to a node of the base specification (§s-694brc6fytwxc5v);",
      "узел технического приложения вне раздела стека и раздела технического долга — связь `implements` с узлом базовой спецификации (§s-694brc6fytwxc5v);",
      "Строка 10.1.22. Описание недостатка в техническом долге больше не обязано уточнять узел базовой спецификации, по вашему решению по этой строке от 2026-11-13."),
    L("a node of the appendix of the tools: an `implements` link to a rule of the SpecSheriff guidelines or of an extension of the guidelines (§s-9c8t99cz34p28sg);",
      "узел описания инструментов — связь `implements` с правилом SpecSheriff guidelines или расширения guidelines (§s-9c8t99cz34p28sg);",
      "Строка 10.1.23. Цель может быть и правилом расширения guidelines: его правила — тоже правила ведения спецификации, и описание инструментов реализует проверки из их таблиц. Цель — правило, а не раздел, как говорит строка."),
    L("a node of the project's own guidelines: a `refines` link to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).",
      "узел собственных guidelines проекта — связь `refines` с правилом SpecSheriff guidelines или выбранного проектом расширения (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).",
      "Строка 10.1.24. Принимается только `refines`: по вашему решению от 2026-11-11 одна связь `refines` выражает и уточнение, и расширение, а собственные guidelines проекта никогда не реализуют SpecSheriff guidelines (решение от 2026-11-08). Правило об уровнях доменов больше не особый случай: это узел расширения Domains."),
    P("`sheriff validate` refuses each such node in the files that the repository keeps that lacks that link. The refusal names the node by its file, its sid and its location.",
      "`sheriff validate` отвергает каждый такой узел без этой связи в файлах, которые хранит репозиторий. Отказ называет файл, sid и расположение узла.",
      "Новое в тексте: что отвергается и что называет отказ."),
    P("`sheriff validate` tells which part a node belongs to by the path of its file (§s-zefk589ykh37b8u). It reads a node in a cell of a `TableRule` as it reads any other node (§s-5fewsp22mmdz7y6).",
      "К какой части относится узел, `sheriff validate` определяет по пути к его файлу (§s-zefk589ykh37b8u). Узел в ячейке `TableRule` он читает так же, как любой другой узел (§s-5fewsp22mmdz7y6).",
      "Новое в тексте."),
  ];
  entries["s-yprj7d6tnvauggr"] = {
    location: "tools 7.1.21",
    sidValue: "s-yprj7d6tnvauggr",
    testsFrom: ["s-yprj7d6tnvauggr", "implementing no node of the base", "neither refines nor implements"],
    proposal: {
      title: "`implements` and `refines` links of the appendices and of a project's own guidelines",
      ruTitle: "Связи `implements` и `refines` приложений и собственных guidelines проекта",
      parts,
      reason: "The type of a link says how a node builds on its target: a node of an appendix describes how its target is implemented, while a rule of a project's own guidelines refines or extends its target. One type, `refines`, records both refining and extending, since no check can tell them apart.",
      ruReason: "Тип связи говорит, как узел опирается на свою цель: узел приложения описывает, как реализуется его цель, а правило собственных guidelines проекта уточняет или расширяет свою цель. Один тип, `refines`, выражает и уточнение, и расширение, потому что никакая проверка не может их различить.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses it, since a project's own guidelines refine the SpecSheriff guidelines and never implement them. With a `refines` link in its place, the rule passes.",
        "Правило `project.json` перечисляет фикстуры тестов проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` его отвергает: собственные guidelines проекта уточняют SpecSheriff guidelines и никогда их не реализуют. Со связью `refines` вместо неё правило проходит.")],
      refs: [R("implements", "s-694brc6fytwxc5v"), R("implements", "s-9c8t99cz34p28sg"), R("implements", "s-3dashdedvu4xgfb"), R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-zefk589ykh37b8u"), R("cites", "s-5fewsp22mmdz7y6")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rows 10.1.22 to 10.1.24.",
      ],
      date: DATE,
    },
    stage3: "validate.ts:443-468 (appendices): a description of the technical debt is no longer refused for refining no node of the base specification (line 457); a rule of the appendix of the tools may also implement a node of an extension of the guidelines (line 461); a rule of the project's own guidelines must refine, not implement, a rule of spec.json or of a chosen extension, tools.json no longer counting and the rule on levels no longer a special case (line 463); a section is no target; the nodes in cells are read; the messages drop \"the base of the guidelines\". The check that a file of the technical appendix is named after a domain (lines 446-452) belongs to row 11.3.5 and another node. The tests at validate.test.ts:451, :458 and :465 are to carry s-yprj7d6tnvauggr, and the last is to expect an `implements` link refused.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Item 19: "No copy of the SpecSheriff guidelines" (s-6bmnsbskg6en4nf), row 10.1.25.
// ---------------------------------------------------------------------------------------------------------------
{
  const parts = [
    P("`sheriff validate` refuses each copy of the files common to every project, which come with the SpecSheriff tools in the plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). The refusal names each such file. A copy is any of the following files that the repository keeps:",
      "`sheriff validate` отвергает каждую копию файлов, общих для всех проектов, которые поставляются вместе с инструментами SpecSheriff в плагине (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). Отказ называет каждый такой файл. Копия — любой из следующих файлов, которые хранит репозиторий:",
      "Было: «`sheriff validate` отвергает копию SpecSheriff guidelines или их схемы вне репозитория, в котором они написаны». Теперь копией названа копия любого файла, общего для всех проектов, как их перечисляет согласованный узел «Where the files are»."),
    L("`specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;",
      "`specs/_guidelines/spec.json` и `specs/_guidelines/tools.json`;",
      "Как было."),
    L("each file in `specs/_guidelines/extensions/`;",
      "каждый файл в `specs/_guidelines/extensions/`;",
      "Новое: расширения guidelines тоже приходят из плагина, и копии их проект не делает (правило 2.5)."),
    L("each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.",
      "каждый файл в `specs/_schema/` или в папке внутри неё, кроме `specs/_schema/project.schema.json`.",
      "Как было; добавлены вложенные папки, где лежат схемы расширений."),
    P("`sheriff validate` accepts these files only in the repository where the SpecSheriff guidelines are written, which the SpecSheriff tools recognise by an environment variable (§s-zefk589ykh37b8u).",
      "Эти файлы `sheriff validate` принимает только в репозитории, где пишутся SpecSheriff guidelines; инструменты SpecSheriff узнают его по переменной окружения (§s-zefk589ykh37b8u).",
      "Новое в тексте: инструменты узнают этот репозиторий по переменной окружения `SPECSHERIFF_GUIDELINES_REPO`, по вашему решению от 2026-11-21, а не по ключу `writesSpecSheriffGuidelines`."),
  ];
  entries["s-6bmnsbskg6en4nf"] = {
    location: "tools 7.1.20",
    sidValue: "s-6bmnsbskg6en4nf",
    testsFrom: ["s-6bmnsbskg6en4nf", "a copy of them or of their schema"],
    proposal: {
      title: "Copies of the files that the plugin delivers",
      ruTitle: "Копии файлов, которые поставляет плагин",
      parts,
      reason: "A project reads these files from the plugin (§s-zefk589ykh37b8u). A copy in its repository is read by people and agents but by none of the SpecSheriff tools, so it falls behind the files in force unnoticed. A copy is found by its path, since a project keeps nothing else at these paths.",
      ruReason: "Проект читает эти файлы из плагина (§s-zefk589ykh37b8u). Копию в его репозитории читают люди и агенты, но не читает ни один инструмент SpecSheriff, поэтому она незаметно отстаёт от действующих файлов. Копия находится по пути, потому что ничего другого проект по этим путям не хранит.",
      reasonChange: "Новое: у прежнего узла не было обоснования.",
      examples: [X(
        "A project copies `node.schema.json` into `specs/_schema/` to read it beside its own extension of the schema. `sheriff validate` refuses the copy and names it. It accepts `specs/_schema/project.schema.json`, the project's own extension of the schema.",
        "Проект копирует `node.schema.json` в `specs/_schema/`, чтобы читать его рядом со своим расширением схемы. `sheriff validate` отвергает копию и называет её. `specs/_schema/project.schema.json`, собственное расширение схемы проекта, он принимает.")],
      refs: [R("implements", "s-rnbm4v8hsta6heq"), R("cites", "s-zefk589ykh37b8u")],
      removed: [
        "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.25 (s-rnbm4v8hsta6heq).",
      ],
      date: DATE,
    },
    stage3: "validate.ts:35-45 recognises the repository where the SpecSheriff guidelines are written by `writesSpecSheriffGuidelines` in sheriff.config.json, which `sheriff reindex` now removes (s-gb8s9657a65hqmv); it is to read SPECSHERIFF_GUIDELINES_REPO (s-zefk589ykh37b8u). It is to refuse the files in specs/_guidelines/extensions/ too, and its message is to name the files that the plugin delivers. The test at validate.test.ts:472 is to carry s-6bmnsbskg6en4nf.",
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// Every sid in specs/, in moved/ and in the drafts as they were before this script.
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
for (const m of backupText.matchAll(sidRe)) known.add(m[0]);
for (const [name, sid] of Object.entries(SID)) if (known.has(sid)) problems.push(`new sid ${sid} (${name}) is already in use`);

// The nodes a link may point at: the new form, the appendix of the tools, the sids the drafts give.
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
for (const sid of Object.values(SID)) targets.add(sid);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  for (const sentence of [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
