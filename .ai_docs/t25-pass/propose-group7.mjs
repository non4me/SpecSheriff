// T25, stage 2, group 7: drafts the new wordings of the nodes of items 51 to 56 of the order in stage2-inventory.md:
// how a node is written in Markdown (tools 5), split into that node, the node on writing the human-readable export and
// the node on printing one node; building the map (tools 4) and a new node on drawing the diagram of the domains; and
// the four nodes on what `sheriff types` generates from the RecordTypes (tools 17 to 20). It also writes five
// proposals to change agreed drafts that the group's subject brings to light.
// Copies tools-drafts.json to tools-drafts.before-group7.json first, checks every draft (citations against links, the
// Russian citing the same sids, no citation by location outside backticks, link targets existing, the new sids
// unique, no key outside the group changed), and only then writes. It also writes english-group7.md, the English of
// every node of the group, for EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of
// this group from the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group7.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-25";

const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else if (x.kind === "li2") out.push(`  - ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const L2 = (en, ru, change) => ({ kind: "li2", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const NEW = "Новое.";
const SAME = "Без изменений.";

// The sids of the new nodes of the group.
const SID = {
  export: "s-e3495enbc5h75c3",
  show: "s-2dhbqy43tcm6qj2",
  diagram: "s-jzm6qw992j3bnxt",
};

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 51: "What the export, the guide and `sheriff show` write of a node" (s-k4nqjr96ux7a5m7), tools 5, split under
// rule 7.3.3 into the node on how a node is written in Markdown, which keeps the sid, and the nodes on the two commands
// that write it: `sheriff markdown` and `sheriff show`. The agreed node on `sheriff guide` already cites this sid.
// ---------------------------------------------------------------------------------------------------------------
add("s-k4nqjr96ux7a5m7", {
  location: "tools 5",
  sidValue: "s-k4nqjr96ux7a5m7",
  testsFrom: [
    "the export writes a node with every value its file holds, each that is not text under its key as JSON",
    "the export writes each link with its type, its direction, its ratio and the sid, location and title of the node at the other end",
    "the export writes a node's children after it, each under a heading one level deeper than its parent's",
    "names every link a node makes or receives by its type, its direction, its ratio and the sid, location and title of the node at the other end",
    "writes a list whose members are objects as a table, the property it names first",
    "writes the values gathered beside a field after its JSON, each with the sid, location and title of the node it comes from",
  ],
  proposal: {
    title: "How a node is written in Markdown",
    ruTitle: "Как узел записывается в Markdown",
    titleChange: "Было: «What the export, the guide and `sheriff show` write of a node». Название называет предмет узла, а не команды, которые им пользуются: что делает каждая команда, теперь говорит её собственный узел.",
    parts: [
      P("`sheriff markdown` (§s-e3495enbc5h75c3), `sheriff show` (§s-2dhbqy43tcm6qj2) and `sheriff guide` (§s-jk8v3srrved7ram) write a node in Markdown in this order:",
        "`sheriff markdown` (§s-e3495enbc5h75c3), `sheriff show` (§s-2dhbqy43tcm6qj2) и `sheriff guide` (§s-jk8v3srrved7ram) записывают узел в Markdown в таком порядке:",
        "Было: «`sheriff export` and `sheriff show` write a node with every value its file holds for it.» Команда `sheriff export` теперь называется `sheriff markdown` (ваше решение от 2026-11-21). Что делает каждая команда, говорит её собственный узел; этот узел говорит только, как записывается узел, и называет части записи в том порядке, в каком их пишет код (show.ts)."),
      L("a heading that holds the node's location (§s-kag2m9tzdnduxdx) and its title, or only its location where the node is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and so has no title;",
        "заголовок, в котором расположение узла (§s-kag2m9tzdnduxdx) и его название, а если узел находится в ячейке `TableRule` (§s-5fewsp22mmdz7y6) и потому названия не имеет, — только расположение;",
        "Новое в тексте: так пишет заголовок код (show.ts). У узла в ячейке `TableRule` названия нет (правило 8.6), поэтому его заголовок содержит только расположение."),
      L("a line that holds the node's sid, its kind and its approval status (§s-tgrnpagrb58tya7);",
        "строка с sid узла, его типом и статусом одобрения (§s-tgrnpagrb58tya7);",
        "Новое в тексте: так пишет код."),
      L("the node's text, and then its reason;",
        "текст узла, а затем его обоснование;",
        "Новое в тексте: так пишет код."),
      L("each other value that the node's file holds for it, other than its links and the nodes under it, under the value's key: a value that is text as it is, and any other value as JSON;",
        "каждое другое значение, которое файл узла хранит для него, кроме его связей и узлов под ним, — под ключом этого значения: текстовое значение как есть, а любое другое — в виде JSON;",
        "Было: «Each of them writes as JSON, under the value's key, a value that is not text, other than the node's links and children.» Без изменений по смыслу. «Узлы под ним» — это и дочерние узлы, и узлы в ячейках `TableRule`."),
      L("the node's links, each with its type, its direction, its ratio (§s-bckzdwd35d2nefa) where it has one, and the sid, location and title of the node at the other end.",
        "связи узла, каждая со своим типом, направлением, соотношением (§s-bckzdwd35d2nefa), если оно у неё есть, и с sid, расположением и названием узла на другом конце.",
        "Было: «They write each link with its type, its direction, its ratio where it holds one, and the sid, location and title of the node at the other end.» Без изменений по смыслу; добавлена ссылка на правило о соотношении. Этого требует правило 13.1."),
      P("The following values are written in a form of their own instead:",
        "Следующие значения записываются вместо этого в особом виде:",
        "Было: «These values are written otherwise:». Без изменений по смыслу."),
      L("a `TextRule.list` (§s-eferktypcj7njt5) any of whose members is an object: its other values as JSON, and its members as a table;",
        "`TextRule.list` (§s-eferktypcj7njt5), хотя бы один элемент которого — объект: его остальные значения — в виде JSON, а его элементы — таблицей;",
        "Было: «A `TextRule.list` any of whose members is an object (§s-v7vd4ydrwexsgsj) has its other values written as JSON and its members as a table.» Без изменений по смыслу. Ссылка на удалённое правило 1.15 заменена ссылкой на правило 5.1, которое архив называет его заменой (ваше решение от 2026-11-10)."),
      L("the values gathered beside a field (§s-ju5vcanbjph7mgh), which a RecordType's `schema` (§s-6eb92ddch7shuvu) holds in the field's `x-enumSource.gathered`: as a list after the JSON of the `schema`, from which they are left out;",
        "значения, собранные рядом с полем (§s-ju5vcanbjph7mgh), которые `schema` RecordType (§s-6eb92ddch7shuvu) хранит в `x-enumSource.gathered` этого поля: списком после JSON `schema`, в который они не входят;",
        "Было: «The values gathered beside a field of type `one of` are left out of the JSON. They are written after the JSON as a list…» Поле типа `one of` теперь — поле с `enum`, а собранные значения хранятся в `x-enumSource.gathered` внутри `schema` RecordType (ваше решение от 2026-11-19 о JSON Schema)."),
      L("the `columns` and `groups` of a `TableRule`: as a table for each group of rows, under the group's heading where the group has one.",
        "`columns` и `groups` `TableRule`: таблицей для каждой группы строк, под заголовком группы, если он у неё есть.",
        "Новое: узел не говорил, как записывается `TableRule` (правило 8.6), и код писал её строки одним JSON, в котором узлы в ячейках оставались без своих связей, чего не допускает правило 13.1."),
      P("The first column of the table of a `TextRule.list` is for the property that `TextRule.list.property` names. Its other columns follow in the order in which their properties first appear. The table has a row for each member, and a member that is not an object is written in the first column alone.",
        "Первый столбец таблицы `TextRule.list` отведён свойству, которое называет `TextRule.list.property`. Остальные её столбцы идут в том порядке, в каком их свойства впервые встречаются. В таблице по строке на каждый элемент, а элемент, который не является объектом, записывается только в первом столбце.",
        "Было: «The table has a column for each property a member holds, the one the list names first and the others in the order they first appear. It has a row for each member, a primitive member in the first column alone.» Без изменений по смыслу; названо свойство списка, которое задаёт первый столбец, как его читает код (show.ts)."),
      P("The list of the values gathered beside a field is headed by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/part`. It gives each value with the sid, location and title of the node that the value comes from.",
        "Над списком значений, собранных рядом с полем, стоит JSON Pointer на схему поля внутри `schema` RecordType, например `/properties/part`. Список даёт каждое значение с sid, расположением и названием узла, из которого это значение приходит.",
        "Было: «They are written after the JSON as a list under the field's name, each with the sid, location and title of the node it comes from.» Поле может быть на любой глубине `schema`, поэтому его называет JSON Pointer, как в согласованных узлах о полях с `identifierOf` и с `enum`, а не одно имя."),
      P("A table of a `TableRule` has a column for each column of the `TableRule`, under that column's heading, and a row for each row of the group. A cell that holds text holds that text. A cell that holds a node holds the node's location and its text.",
        "Таблица `TableRule` имеет по столбцу на каждый столбец `TableRule`, под его заголовком, и по строке на каждую строку группы. Ячейка с текстом содержит этот текст. Ячейка с узлом содержит расположение этого узла и его текст.",
        "Новое: ячейка с узлом показывает и текст узла, чтобы таблицу можно было прочитать как таблицу; весь узел записывается после неё."),
      P("In a cell of these tables, a list or an object is written as JSON on one line, each line break as `<br>`, and each `|` as `\\|`.",
        "В ячейке этих таблиц список или объект записывается в виде JSON в одну строку, каждый перенос строки — как `<br>`, а каждый `|` — как `\\|`.",
        "Было: «A cell holding a list or an object holds it as JSON on one line, a `|` escaped.» Без изменений по смыслу. Новое: перенос строки записывается как `<br>`, потому что текст ячейки `TableRule` может занимать несколько строк, а строка таблицы Markdown — только одну."),
      P("A node in a cell of a `TableRule` is also written with the following, before its text, since they are part of its wording (§s-5ah25f6gy99panq):",
        "Узел в ячейке `TableRule` записывается, перед своим текстом, ещё и со следующим, потому что это входит в его формулировку (§s-5ah25f6gy99panq):",
        "Новое: по правилу 1.3.5 формулировка узла в ячейке включает текстовые ячейки его строки и заголовки его столбца и группы (ваше решение от 2026-11-14), поэтому его читатель видит их вместе с ним."),
      L("the heading of its column;",
        "заголовок его столбца;",
        NEW),
      L("the heading of its group, where the table's rows are grouped;",
        "заголовок его группы, если строки таблицы сгруппированы;",
        NEW),
      L("the text of each cell of its row that holds text, under the heading of that cell's column.",
        "текст каждой ячейки его строки, в которой находится текст, под заголовком столбца этой ячейки.",
        NEW),
      P("Where a command writes the nodes under a node, it writes them after that node. It writes them in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w), so the nodes in the cells of a `TableRule` come after its children. Each of those nodes takes a heading one level deeper than that of the node above it, down to the sixth level, the deepest that Markdown has. A top-level node of a file, and the node that `sheriff show` prints, take a heading of the first level.",
        "Если команда записывает узлы под узлом, она записывает их после этого узла. Она записывает их в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w), поэтому узлы в ячейках `TableRule` идут после её дочерних узлов. Каждый из этих узлов получает заголовок на уровень глубже, чем у узла над ним, но не глубже шестого уровня — самого глубокого, какой есть в Markdown. Узел верхнего уровня файла и узел, который печатает `sheriff show`, получают заголовок первого уровня.",
        "Было: «The export and the guide write a node's children after it, each under a heading one level deeper than its parent's. `sheriff show` writes the node alone.» Какие команды пишут узлы под узлом, говорят их собственные узлы. Новое: узлы в ячейках `TableRule` идут после дочерних узлов, в том порядке, в каком их нумерует вычисление расположений; в Markdown шесть уровней заголовков, поэтому заголовок не опускается глубже шестого уровня, — так делает код (show.ts)."),
    ],
    reason: "Every command that writes a node for a reader writes it in one form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node without opening the file (§s-ce24ynwabt5yx8h). From each sid, the reader also learns the location and title of the node that the sid names.",
    ruReason: "Каждая команда, которая записывает узел для читателя, записывает его в одном виде, поэтому читатель, знакомый с этим видом по одной команде, может читать вывод любой другой. В этом виде читатель видит всё, что файл узла хранит для этого узла, не открывая файла (§s-ce24ynwabt5yx8h). По каждому sid читатель узнаёт также расположение и название узла, который этот sid называет.",
    reasonChange: "Было: четыре абзаца, которые по порядку объясняли абзацы текста, в том числе почему агент читает `sheriff guide` целиком и почему метаданные не входят в его вывод. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Сказанное о `sheriff guide` относится к согласованному узлу об этой команде; ссылка на удалённое правило 1.10 убрана вместе с абзацем, где она стояла.",
    examples: [
      X("The main table of checks (§s-jau82aq9juv9zzh) is a `TableRule` whose column “What is checked” holds a node in each row and whose column “On failure” holds text. `sheriff show` prints the node of one of its rows under the node's location. With it, `sheriff show` prints the heading “What is checked” of the node's column and the text of its row's cell under “On failure”, such as “refused”. The most likely mistake is to print the node without the text of its row, so that its reader does not see what a failure of the check costs.",
        "Основная таблица проверок (§s-jau82aq9juv9zzh) — это `TableRule`, в столбце «What is checked» которой в каждой строке находится узел, а в столбце «On failure» — текст. `sheriff show` печатает узел одной из её строк под расположением этого узла. Вместе с ним `sheriff show` печатает заголовок «What is checked» столбца этого узла и текст ячейки его строки под «On failure», например «refused». Самая вероятная ошибка — напечатать узел без текста его строки: тогда его читатель не видит, чего стоит неудача проверки."),
    ],
    refs: [
      R("implements", "s-ce24ynwabt5yx8h"),
      R("cites", SID.export),
      R("cites", SID.show),
      R("cites", "s-jk8v3srrved7ram"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-tgrnpagrb58tya7"),
      R("cites", "s-bckzdwd35d2nefa"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-ju5vcanbjph7mgh"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-5ah25f6gy99panq"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-jau82aq9juv9zzh"),
    ],
    removed: [
      "The `implements` link to “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j): the node on writing the export (s-e3495enbc5h75c3) implements that rule, since `sheriff markdown` writes the export anew at every run.",
      "The `implements` link to “Gathered values are written beside their field” (s-ju5vcanbjph7mgh), which becomes a `cites` link: `sheriff reindex` writes the gathered values (s-ztseyetus7np6br), and this node only shows them.",
      "The `cites` links to the dropped rules s-gqbj8849rf224qa and s-v7vd4ydrwexsgsj: the paragraph of the reason that cited the first is gone, and a `TextRule.list` is now cited through rule 5.1 (s-eferktypcj7njt5), which the archive names as the replacement of the second.",
      "“`sheriff guide` writes each node of the guidelines as the export does, except its metadata”: the agreed node on `sheriff guide` (s-jk8v3srrved7ram) states it.",
      "“`sheriff show` writes the node alone”: the node on printing one node (s-2dhbqy43tcm6qj2) states it.",
    ],
    date: DATE,
  },
  stage3: "show.ts nodeMarkdown: write a node in a cell with the heading of its column, the heading of its group and the text cells of its row, before its text, and with its location alone as its heading; write the columns and groups of a TableRule as a table for each group, a node's cell holding its location and its text, and the nodes in its cells after its children, in the order of the computation of locations; write the values in x-enumSource.gathered, at any depth of a RecordType's schema, after the JSON of the schema under the field's JSON Pointer, in place of fieldsWithGathered on RecordType.fields; write a line break in a cell as <br>. Tests for a TableRule, a node in a cell and the gathered values of a field nested in a schema are written first. The tests named in testsFrom keep this sid; the test “sheriff guide writes each node of the guidelines as the export does, except its metadata” moves to s-jk8v3srrved7ram, and “shows a node alone, without the nodes under it” to s-2dhbqy43tcm6qj2.",
});

add("new:tools-5-export", {
  location: "tools 5a (new, after “How a node is written in Markdown”)",
  from: "s-k4nqjr96ux7a5m7",
  sidValue: SID.export,
  testsFrom: ["exports every file of the specification to markdown, each node with its sid, text and reason"],
  proposal: {
    title: "Writing the human-readable export",
    ruTitle: "Запись читаемого экспорта",
    parts: [
      P("`sheriff markdown` writes the human-readable export (§s-ce24ynwabt5yx8h) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.",
        "`sheriff markdown` записывает читаемый экспорт (§s-ce24ynwabt5yx8h), только если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). В любом другом проекте он отказывается работать, и отказ называет расширение Views.",
        "Новое: согласованный узел «Where the files are» даёт путь `md-version/` только проекту, который выбрал расширение Views, а по правилу 1.7.1 проект пользуется расширением, только если выбрал его. Так решён вопрос, оставленный при согласовании списка команд: пишут ли `sheriff markdown` и `sheriff map` файлы в проекте без расширения Views."),
      P("`sheriff markdown` first removes everything in `md-version/` (§s-zefk589ykh37b8u). It then writes there a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.",
        "Сначала `sheriff markdown` удаляет всё, что есть в `md-version/` (§s-zefk589ykh37b8u). Затем он записывает туда файл `.gitignore` с содержимым `*`. Этот файл заставляет git игнорировать содержимое папки, что бы ни говорили собственные файлы игнорирования репозитория.",
        "Новое в тексте: так делает код (generated.ts). Согласованный узел «Where the files are» говорит, что git игнорирует `md-version/`; этот абзац говорит, как этого добивается команда."),
      P("`sheriff markdown` writes one Markdown file for each file of the specification whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx). These include the files of the SpecSheriff guidelines, of the chosen extensions and of the appendix of the tools that the project takes from the plugin (§s-bsya3febm6u64ab).",
        "`sheriff markdown` записывает по одному файлу Markdown на каждый файл спецификации, узлы которого содержит модель спецификации (§s-w6gybeqn2ttydqx). Среди них и файлы SpecSheriff guidelines, выбранных расширений и описания инструментов, которые проект берёт из плагина (§s-bsya3febm6u64ab).",
        "Было: «`sheriff export` … write[s] a node with every value its file holds for it.» Команда `sheriff export` теперь называется `sheriff markdown` (ваше решение от 2026-11-21). Утверждение прежнего узла о том, что экспорт пишет по файлу на каждый файл спецификации, перенесено сюда, как требует согласование списка команд. Какие это файлы, задаёт согласованный узел о модели спецификации: код уже берёт так SpecSheriff guidelines и описание инструментов из плагина (spec-files.ts), а выбранные расширения добавлены по правилу 2.5."),
      P("The path of each Markdown file is the path of its file below `specs/`, placed below `md-version/`, with `.md` in place of `.json`. For a file that the project takes from the plugin, its path below `specs/` is the one at which the repository where the SpecSheriff guidelines are written keeps that file (§s-zefk589ykh37b8u). So the SpecSheriff guidelines are exported to `md-version/_guidelines/spec.md`.",
        "Путь каждого файла Markdown — это путь его файла внутри `specs/`, перенесённый внутрь `md-version/`, с `.md` вместо `.json`. Для файла, который проект берёт из плагина, его путь внутри `specs/` — тот, по которому этот файл хранит репозиторий, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u). Поэтому SpecSheriff guidelines экспортируются в `md-version/_guidelines/spec.md`.",
        "Новое в тексте: так делает код (generated.ts)."),
      P("Each Markdown file holds the top-level nodes of its file in their order. Each of them is written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), followed by all the nodes under it.",
        "Каждый файл Markdown содержит узлы верхнего уровня своего файла в их порядке. Каждый из них записан так, как узел записывается в Markdown (§s-k4nqjr96ux7a5m7), и за ним идут все узлы под ним.",
        "Было: «The export and the guide write a node's children after it, each under a heading one level deeper than its parent's.» Без изменений по смыслу; как пишутся узлы под узлом, говорит узел о записи узла в Markdown. Так выполняется требование правила 13.1 сохранять порядок и вложенность узлов."),
    ],
    reason: "The export is written anew from the nodes at every run, so it shows the specification as the nodes state it (§s-kh8qcd5kxgh9z3j). Kept out of git, it never becomes a second copy of the specification that a commit could change. A project gets the export only where it has chosen the Views extension, since a project uses an extension only by its own choice (§s-mbmnsnxenmavu3z).",
    ruReason: "Экспорт при каждом запуске пишется заново из узлов, поэтому он показывает спецификацию такой, какой её задают узлы (§s-kh8qcd5kxgh9z3j). Не попадая в git, он никогда не становится второй копией спецификации, которую мог бы изменить коммит. Проект получает экспорт, только если выбрал расширение Views, потому что проект пользуется расширением только по своему выбору (§s-mbmnsnxenmavu3z).",
    reasonChange: NEW,
    examples: [
      X("A project that has chosen the Views and Domains extensions keeps `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export.",
        "Проект, который выбрал расширения Views и Domains, хранит `specs/contracts/terms.json` и `specs/requests/intake.json`, а SpecSheriff guidelines и описание инструментов берёт из плагина. `sheriff markdown` записывает `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md` и `md-version/_guidelines/tools.md`. Самая вероятная ошибка — записать только файлы, которые хранит репозиторий: тогда guidelines, которым следует проект, в экспорт не попадают."),
    ],
    refs: [
      R("implements", "s-ce24ynwabt5yx8h"),
      R("implements", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-qgg6sfawtmwvrbb"),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-bsya3febm6u64ab"),
      R("cites", "s-k4nqjr96ux7a5m7"),
      R("cites", "s-mbmnsnxenmavu3z"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "cli.ts: the command export becomes markdown (the owner's ruling of 2026-11-21) and refuses to run, naming the Views extension, where the project has not chosen it. generated.ts exportMarkdown already empties md-version/, writes its .gitignore and one file per file of the specification; it is also to write the files of the chosen extensions that the project takes from the plugin, which spec-files.ts withTaken does not load yet. The test “exports every file of the specification to markdown, each node with its sid, text and reason” moves from s-kh8qcd5kxgh9z3j to this sid; tests for the refusal without the Views extension and for a chosen extension are written first. The e2e test at commands.test.ts:85 runs sheriff markdown and sheriff map in a project that has chosen the Views extension.",
});

add("new:tools-5-show", {
  location: "tools 5b (new, after “Writing the human-readable export”)",
  from: "s-k4nqjr96ux7a5m7",
  sidValue: SID.show,
  testsFrom: [
    "shows a node alone, without the nodes under it",
    "shows a node found by its location the same as by its sid",
    "refuses a key no node holds",
  ],
  proposal: {
    title: "Printing one node",
    ruTitle: "Печать одного узла",
    parts: [
      P("`sheriff show` prints to its standard output the node whose sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx) is the command's argument, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7). It prints the node alone, without the nodes under it.",
        "`sheriff show` печатает в свой стандартный вывод узел, sid (§s-9spq78kdwsxr759) или расположение (§s-kag2m9tzdnduxdx) которого — аргумент команды, записанный так, как узел записывается в Markdown (§s-k4nqjr96ux7a5m7). Он печатает один этот узел, без узлов под ним.",
        "Было: «`sheriff show` writes the node alone.» и, в продолжении, «`sheriff show` finds a node by its sid or its location». Утверждение перенесено из прежнего узла, как требует согласование списка команд; как записывается узел, говорит узел о записи узла в Markdown."),
      P("`sheriff show` looks for the node among the nodes that the model of the specification holds (§s-w6gybeqn2ttydqx), including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). Where none of them has that sid or that location, `sheriff show` refuses the argument and names it.",
        "`sheriff show` ищет узел среди узлов, которые содержит модель спецификации (§s-w6gybeqn2ttydqx), в том числе среди узлов в ячейках `TableRule` (§s-5fewsp22mmdz7y6). Если ни у одного из них нет такого sid или такого расположения, `sheriff show` отвергает аргумент и называет его.",
        "Новое в тексте: так делает код (show.ts). Среди узлов модели есть и узлы SpecSheriff guidelines, выбранных расширений и описания инструментов, которые проект берёт из плагина; узлов в ячейках код пока не находит."),
    ],
    reason: "A node is read on its own (§s-x4zcbk5ekebd9ua). `sheriff show` gives a person or an agent everything that the node's file holds for one node, and where each of its links leads, without opening the files of the specification.",
    ruReason: "Узел читают сам по себе (§s-x4zcbk5ekebd9ua). `sheriff show` даёт человеку или агенту всё, что файл узла хранит для одного узла, и то, куда ведёт каждая его связь, без открытия файлов спецификации.",
    reasonChange: "Было: «A person or an agent reads one node through `sheriff show`.» Без изменений по смыслу; добавлена ссылка на правило 1.2.4, по которому узел читают сам по себе.",
    examples: [
      X("`sheriff show _guidelines/spec/8.5` prints the rule on a node's location in the same form as `sheriff show` with that rule's sid does. The rule's children, if it had any, would not be printed. The most likely mistake is to look the argument up among the sids alone, so that a location is refused.",
        "`sheriff show _guidelines/spec/8.5` печатает правило о расположении узла в том же виде, что и `sheriff show` с sid этого правила. Дочерние узлы правила, будь они у него, напечатаны не были бы. Самая вероятная ошибка — искать аргумент только среди sid: тогда расположение отвергается."),
    ],
    refs: [
      R("implements", "s-a4rbry4hsu34hy8"),
      R("cites", "s-9spq78kdwsxr759"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-k4nqjr96ux7a5m7"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-x4zcbk5ekebd9ua"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "show.ts show already finds a node by its sid or its location and refuses a key that no node holds; it is to find a node in a cell of a TableRule too, which spec.nodes does not hold today. The tests named in testsFrom carry this sid: the first now carries s-k4nqjr96ux7a5m7, the other two s-f5rz6b7dhxejjts. A test for a node in a cell is written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 52: "Building the map" (s-rpv4fkdqqguptqd), tools 4, and a new node for the diagram of the domains and the order
// of the domains in a row of that diagram (s-4azsb49pj6sech8, s-uw9n84edf7cbe9n), which rule 7.3.3 keeps together.
// ---------------------------------------------------------------------------------------------------------------
add("s-rpv4fkdqqguptqd", {
  location: "tools 4",
  sidValue: "s-rpv4fkdqqguptqd",
  testsFrom: [
    "writes the map as a web page that draws it with markmap from an outline it holds no file of",
    "the map's page carries markmap and every library it needs, each with its licence notice, and loads nothing from the network",
    "the map's page reads a title as text, so that no title makes it load anything",
    "draws each node's title in a frame, dotted for a draft and solid for an approved node, a branch standing for no node without one",
  ],
  proposal: {
    title: "Building the map",
    ruTitle: "Построение карты",
    parts: [
      P("`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.",
        "`sheriff map` записывает карту спецификации (§s-zu8ne3wq84zchc4), только если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). В любом другом проекте он отказывается работать, и отказ называет расширение Views.",
        "Было: «`sheriff render` reads the nodes and writes into `specs/_viewer/` a web page that draws the map from them.» Команда `sheriff render` теперь называется `sheriff map` (ваше решение от 2026-11-21). Новое: согласованный узел «Where the files are» даёт путь `specs/_viewer/` только проекту, который выбрал расширение Views, а по правилу 1.7.1 проект пользуется расширением, только если выбрал его."),
      P("`sheriff map` first removes everything in `specs/_viewer/` (§s-zefk589ykh37b8u). It then writes there the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.",
        "Сначала `sheriff map` удаляет всё, что есть в `specs/_viewer/` (§s-zefk589ykh37b8u). Затем он записывает туда веб-страницу `index.html`, которая рисует карту, и файл `.gitignore` с содержимым `*`. Этот файл заставляет git игнорировать содержимое папки, что бы ни говорили собственные файлы игнорирования репозитория.",
        "Было: «…writes into `specs/_viewer/` a web page that draws the map from them.» Без изменений по смыслу; названы файлы, которые пишет команда, и сказано, как она добивается того, чтобы git их игнорировал, — так делает код (generated.ts)."),
      P("The web page draws the map with markmap, from an outline in Markdown that `sheriff map` builds from the nodes and keeps in no file. The page holds markmap and every library that markmap needs, each with its licence notice, and loads nothing from the network.",
        "Веб-страница рисует карту с помощью markmap по плану в Markdown, который `sheriff map` строит из узлов и не хранит ни в каком файле. Страница содержит markmap и все библиотеки, которые нужны markmap, каждую с её лицензионным уведомлением, и ничего не загружает из сети.",
        "Было: «The web page draws it with markmap, from an outline in markdown that the command builds and keeps nowhere. … The page carries markmap and every library it needs, each with its licence notice. It loads nothing from the network.» Без изменений по смыслу. Убрано «Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is»: это говорит правило 10.14."),
      P("Each of the following top-level branches of the outline represents no node. They come in this order, and each holds the top-level nodes of the files named with it:",
        "Каждая из следующих веток верхнего уровня плана не представляет никакого узла. Они идут в таком порядке, и каждая содержит узлы верхнего уровня файлов, названных рядом с ней:",
        "Было: ветки для contracts и для уровней доменов. По правилу 13.2 ветки верхнего уровня карты — guidelines, описание инструментов, базовая спецификация и техническое приложение, в этом порядке, а остальное на карте — только узлы, поэтому веток для contracts и для уровней доменов больше нет."),
      L("`Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose file the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);",
        "`Guidelines`: SpecSheriff guidelines, затем каждое расширение guidelines, файл которого содержит модель спецификации (§s-w6gybeqn2ttydqx), в порядке кодовых точек имён расширений, а затем собственные guidelines проекта (§s-u7tw6m8npxmv5tu);",
        "Новое: так ветка guidelines показывает все guidelines, которым следует проект, в том порядке, в каком их печатает `sheriff guide`. Какие расширения в неё входят, задаёт согласованный узел о модели спецификации: в проекте — выбранные расширения, а в репозитории, где пишутся SpecSheriff guidelines, — все, которые он хранит."),
      L("`Appendix of the tools`: the appendix of the tools (§s-a4rbry4hsu34hy8);",
        "`Appendix of the tools`: описание инструментов (§s-a4rbry4hsu34hy8);",
        "Новое: прежде описание инструментов было внутри ветки guidelines, а по правилу 2.1 оно не входит в guidelines."),
      L("`Base specification`: the files of the base specification (§s-5x737t9nee4zgaa), folder by folder in the code-point order of the folders' names;",
        "`Base specification`: файлы базовой спецификации (§s-5x737t9nee4zgaa), папка за папкой в порядке кодовых точек имён папок;",
        "Новое: контракты и домены — папки базовой спецификации; порядок папок — порядок путей их файлов, по которому инструменты SpecSheriff везде обходят файлы. Правило 11.2.3 упорядочивает домены только внутри линии схемы доменов, а на карте линий нет."),
      L("`Technical appendix`: the files of the technical appendix (§s-tj38pvm38nepaf5).",
        "`Technical appendix`: файлы технического приложения (§s-tj38pvm38nepaf5).",
        "Было: «Technical appendix», последняя ветка. Без изменений по смыслу."),
      P("The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w):",
        "Файлы одной папки базовой спецификации и файлы технического приложения берутся в порядке кодовых точек их путей. Каждый узел содержит узлы под ним так, в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w):",
        "Новое: по правилу 13.2 узлы на карте вложены так же, как в спецификации; ниже названа та вложенность, по которой вычисляются расположения узлов."),
      L("a node holds its children, and a `TableRule` (§s-5fewsp22mmdz7y6) also holds the nodes in its cells;",
        "узел содержит свои дочерние узлы, а `TableRule` (§s-5fewsp22mmdz7y6) — ещё и узлы в своих ячейках;",
        "Новое: узлы в ячейках `TableRule` — тоже узлы со статусом одобрения, поэтому они есть на карте; код их сейчас не показывает."),
      L("where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) also holds the other top-level nodes of its folder;",
        "если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена (§s-yggv9myedprnaa7) содержит ещё и остальные узлы верхнего уровня своей папки;",
        "Было: под заголовком домена — все узлы его файлов. Без изменений по смыслу; так же их нумерует вычисление расположений."),
      L("the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's further top-level nodes.",
        "первый узел верхнего уровня файла guidelines, описания инструментов или технического приложения содержит ещё и остальные узлы верхнего уровня этого файла.",
        "Новое: так же эти узлы нумерует вычисление расположений."),
      P("Each node is shown by its title. A node in a cell of a `TableRule`, which has no title, is shown by its location (§s-kag2m9tzdnduxdx).",
        "Каждый узел показан своим названием. Узел в ячейке `TableRule`, у которого названия нет, показан своим расположением (§s-kag2m9tzdnduxdx).",
        "Новое: у узла в ячейке `TableRule` названия нет (правило 8.6), поэтому карта показывает его расположение; иначе такой узел был бы на карте пустой веткой."),
      P("The outline writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element in a frame, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no frame. The branches are drawn alike, whatever the approval status of their nodes.",
        "План записывает название или расположение каждого узла в элементе, класс которого называет статус одобрения узла (§s-tgrnpagrb58tya7). Страница рисует этот элемент в рамке: пунктирной, если узел — черновик, и сплошной, если он одобрен. У ветки, которая не представляет никакого узла, рамки нет. Ветки рисуются одинаково, каков бы ни был статус одобрения их узлов.",
        "Было: «The outline writes each node's title in an element whose class names the node's status. … A branch that stands for no node, such as a level, has no frame. The branches are drawn alike, whatever the status of their nodes.» Без изменений по смыслу; убран пример ветки уровня, которой на карте больше нет."),
    ],
    reason: "A person opens the map wherever the repository is, often without a network. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with no format kept between them and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).",
    ruReason: "Человек открывает карту там, где находится репозиторий, часто без сети. На карте он с одного взгляда видит статус одобрения каждого узла, в каком бы размере карта ни была нарисована. Карта рисуется только из узлов, без формата, хранимого между ними и страницей, поэтому она никогда не показывает структуру, которой у узлов уже нет (§s-kh8qcd5kxgh9z3j).",
    reasonChange: "Было: три абзаца, которые объясняли текст по порядку. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Довод о лицензиях убран: лицензионное уведомление требует сама лицензия библиотеки.",
    examples: [
      X("In a project that has chosen the Views and Domains extensions, the branch `Base specification` first holds the section of the contracts section. It then holds the header of the domain `accounts`, with the sections of `accounts` under it, and then the header of the domain `requests`, with its sections. A `TableRule` in a section of `requests` holds under it the nodes in its cells, each shown by its location. The most likely mistake is to draw a branch for each level of the domains, which represents no node.",
        "В проекте, который выбрал расширения Views и Domains, ветка `Base specification` сначала содержит раздел контрактов. Затем она содержит заголовок домена `accounts` с разделами `accounts` под ним, а затем заголовок домена `requests` с его разделами. `TableRule` в разделе `requests` содержит под собой узлы своих ячеек, каждый показан своим расположением. Самая вероятная ошибка — нарисовать ветку для каждого уровня доменов, которая не представляет никакого узла."),
    ],
    refs: [
      R("implements", "s-zu8ne3wq84zchc4"),
      R("implements", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-qgg6sfawtmwvrbb"),
      R("cites", "s-9ttvcwpqkehm58g"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-a4rbry4hsu34hy8"),
      R("cites", "s-5x737t9nee4zgaa"),
      R("cites", "s-tj38pvm38nepaf5"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-tgrnpagrb58tya7"),
    ],
    removed: [
      "“Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is”: rule 10.14 (s-kh8qcd5kxgh9z3j) states it, and the node now implements that rule.",
      "The branches for contracts, for each level of the domains and for the domains with no level listed: rule 13.2 (s-zu8ne3wq84zchc4) fixes the top-level branches and shows only nodes under them. The levels are shown by the diagram of the domains (s-jzm6qw992j3bnxt).",
    ],
    date: DATE,
  },
  stage3: "cli.ts: the command render becomes map (the owner's ruling of 2026-11-21) and refuses to run, naming the Views extension, where the project has not chosen it. generated.ts outline(): the branches Guidelines, Appendix of the tools, Base specification and Technical appendix, in that order; the chosen extensions under Guidelines; the branches for contracts, the levels and “No level listed” go, and domainOrder is no longer used by the map; the folders of the base specification in the code-point order of their names; a domain's other top-level nodes under its header; the nodes in the cells of a TableRule under it, each shown by its location in an element framed by its status. The test of s-zu8ne3wq84zchc4 “the map reads guidelines, contracts, a branch per level…” is rewritten first for the new branches; tests for a node in a cell and for the refusal without the Views extension are written first. The tests named in testsFrom keep this sid.",
});

add("new:tools-4-diagram", {
  location: "tools 4a (new, after “Building the map”)",
  sidValue: SID.diagram,
  testsFrom: [
    "orders the domains each after every domain it uses, the order of their names deciding a tie",
    "puts a domain as close as possible before the first domain that uses it",
  ],
  proposal: {
    title: "Drawing the diagram of the domains",
    ruTitle: "Построение схемы доменов",
    parts: [
      P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the SpecSheriff tools draw the diagram of the domains (§s-4azsb49pj6sech8) from the headers of the domains (§s-yggv9myedprnaa7) as follows:",
        "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), инструменты SpecSheriff строят схему доменов (§s-4azsb49pj6sech8) из заголовков доменов (§s-yggv9myedprnaa7) так:",
        NEW),
      L("each domain is drawn once, labelled with its name, which is the name of its folder under `specs/` (§s-zefk589ykh37b8u);",
        "каждый домен нарисован один раз и подписан своим именем — именем своей папки внутри `specs/` (§s-zefk589ykh37b8u);",
        NEW),
      L("an arrow leads from each domain to each domain that it uses: each other domain to a section of which a `consumes` link of its header points;",
        "стрелка ведёт от каждого домена к каждому домену, которым он пользуется: к каждому другому домену, на раздел которого указывает связь `consumes` его заголовка;",
        "Новое: по правилу 11.1.3 связи `consumes` заголовка называют разделы других доменов, которыми домен пользуется; так правило 11.2.2 показывает, как домены взаимосвязаны."),
      L("each level that the header of at least one domain contains has a row of its own, labelled with the level's number and its name, such as `2 services`;",
        "у каждого уровня, который содержит заголовок хотя бы одного домена, есть своя линия, подписанная номером и именем уровня, например `2 services`;",
        "Новое: уровень показан номером и именем вместе, как вы решили 2026-11-08, когда убрали эту подробность из базы в описание инструментов."),
      L("the rows of the levels follow the order of the levels' numbers from the top (§s-nkyty4dy9x2v2a4);",
        "линии уровней идут сверху в порядке номеров уровней (§s-nkyty4dy9x2v2a4);",
        "Новое: так требует правило 11.2.2."),
      L("below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of the levels that the project's own guidelines list (§s-t9j29hppag2nren), where there is such a domain.",
        "ниже линий уровней линия, подписанная `No level`, содержит каждый домен, заголовок которого не содержит ни одного из уровней, перечисленных в собственных guidelines проекта (§s-t9j29hppag2nren), если такой домен есть.",
        "Новое: по правилу 11.2.2 домены без уровня стоят в отдельной линии ниже линий уровней. Уровень, которого нет в списке, отвергает проверка «The level in a domain's header», но схема строится и до неё, поэтому такой домен тоже стоит в этой линии."),
      P("To place a domain, the SpecSheriff tools first place each domain of its row that it uses and that they have not yet started to place, each in the same way. They then place the domain itself. They take the domains of each row in this order (§s-uw9n84edf7cbe9n):",
        "Чтобы поставить домен, инструменты SpecSheriff сначала ставят каждый домен его линии, которым он пользуется и который они ещё не начали ставить, каждый тем же способом. Затем они ставят сам домен. Домены каждой линии они берут в таком порядке (§s-uw9n84edf7cbe9n):",
        "Новое: правило 11.2.3 оставляет описанию инструментов, как ставить домен, который пользуется несколькими доменами линии или которым пользуются несколько доменов линии. Здесь каждый домен стоит сразу после доменов, которыми он пользуется."),
      L("first, each domain that uses no domain of the row and that no domain of the row uses;",
        "сначала — каждый домен, который не пользуется ни одним доменом линии и которым не пользуется ни один домен линии;",
        "Новое: так требует правило 11.2.3."),
      L("then, each domain that no domain of the row uses and that uses a domain of the row;",
        "затем — каждый домен, которым не пользуется ни один домен линии и который сам пользуется доменом линии;",
        "Новое: с каждым таким доменом ставятся и все домены линии, которыми он пользуется прямо или через другие домены."),
      L("last, each domain not yet placed, which only domains that use one another in a cycle leave (§s-bncp7gtyaukur8e).",
        "последним — каждый ещё не поставленный домен; такие остаются, только если домены пользуются друг другом по кругу (§s-bncp7gtyaukur8e).",
        "Новое: такой круг отвергает проверка строки 11.3.4, но схема строится и до неё, поэтому порядок задан и для этого случая."),
      P("This order takes into account only the domains of the same row that a domain uses. Where several domains are to be taken at once, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.",
        "Этот порядок учитывает только те домены той же линии, которыми домен пользуется. Где на очереди сразу несколько доменов, инструменты SpecSheriff берут их в алфавитном порядке имён. Имена они сравнивают символ за символом, по кодовым точкам символов.",
        "Новое: правило 11.2.3 упорядочивает только домены одной линии, а где остаётся выбор, его решает алфавитный порядок имён; здесь сказано, как именно сравниваются имена, чтобы порядок был одинаковым на любой машине."),
    ],
    reason: "Drawn from the headers alone, the diagram always shows the hierarchy of the domains as the headers state it (§s-4azsb49pj6sech8). The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This procedure settles them by placing each domain right after the domains that it uses, in the same way on every machine.",
    ruReason: "Схема, построенная только из заголовков, всегда показывает иерархию доменов такой, какой её задают заголовки (§s-4azsb49pj6sech8). Правило о порядке доменов в линии оставляет свои более сложные случаи описанию инструментов (§s-uw9n84edf7cbe9n). Эта процедура решает их: она ставит каждый домен сразу после доменов, которыми он пользуется, одинаково на любой машине.",
    reasonChange: NEW,
    examples: [
      X("The domains `a`, `b`, `c`, `d` and `e` are at the same level. `a` uses `b` and `c`, `c` uses `d`, and `e` has no link to any domain of the row. The row is `e`, `b`, `d`, `c`, `a`: `e` comes first, and `a` comes after `b` and after `c`, which comes after `d`. The most likely mistake is to place `a` right after `b`, the first domain that it uses, which puts `a` to the left of `c`, which it also uses.",
        "Домены `a`, `b`, `c`, `d` и `e` одного уровня. `a` пользуется `b` и `c`, `c` пользуется `d`, а у `e` нет связи ни с одним доменом линии. Линия: `e`, `b`, `d`, `c`, `a`: `e` идёт первым, а `a` идёт после `b` и после `c`, который идёт после `d`. Самая вероятная ошибка — поставить `a` сразу после `b`, первого домена, которым он пользуется: тогда `a` оказывается левее `c`, которым он тоже пользуется."),
    ],
    todos: [
      {
        date: DATE,
        text: "No command of the SpecSheriff tools draws this diagram yet. The command that draws it is to be added to the SpecSheriff tools and named in this node and in the list of the commands, in the release that brings this node.",
      },
    ],
    refs: [
      R("implements", "s-4azsb49pj6sech8"),
      R("implements", "s-uw9n84edf7cbe9n"),
      R("cites", "s-tdm3rwsppnuh6dm"),
      R("cites", "s-yggv9myedprnaa7"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-nkyty4dy9x2v2a4"),
      R("cites", "s-t9j29hppag2nren"),
      R("cites", "s-bncp7gtyaukur8e"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "No command of the SpecSheriff tools draws the diagram today: only the owner's viewer, outside git and outside the plugin, draws one. The command that draws it (task T29 or stage 3) is to draw a row for each level that a header contains, labelled with its number and name, the row “No level” below them, and an arrow for each use. model.ts domainOrder orders all the domains in one sequence by every consumes link; it is to order each row alone as the node says: the unlinked domains first, then each domain that no domain of the row uses, with the domains it uses placed before it, and last the domains that only a cycle leaves, in alphabetical order. The two tests of generated.test.ts that carry s-uw9n84edf7cbe9n are rewritten first for one row and carry this sid; tests for the rows, their labels and the arrows are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Items 53 to 56: what `sheriff types` generates from the RecordTypes (tools 17 to 20).
// ---------------------------------------------------------------------------------------------------------------
add("s-pvzms7d8kxb8dk2", {
  location: "tools 17",
  sidValue: "s-pvzms7d8kxb8dk2",
  testsFrom: [
    "writes nothing where the technical appendix lists no files for the types",
    "writes each file the stack's rule lists, its extension saying what goes into it",
    "takes the list from a rule of the stack only",
  ],
  proposal: {
    title: "Where the types and RuntimeChecks generated from the RecordTypes are written",
    ruTitle: "Куда записываются типы и RuntimeChecks, сгенерированные из RecordType",
    parts: [
      P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) into the files that the technical appendix lists for them. Where the technical appendix lists no such file, `sheriff types` writes no types and no RuntimeChecks.",
        "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) записывает типы и RuntimeChecks (§s-e877bnfa559tvk9), которые он генерирует из RecordType (§s-7vm323mhry2enx3), в файлы, которые для них перечисляет техническое приложение. Если техническое приложение не перечисляет ни одного такого файла, `sheriff types` не записывает ни типов, ни RuntimeChecks.",
        "Было: «`sheriff types` writes the types and RuntimeChecks it generates from the RecordTypes into the files the project's technical appendix lists for them. Where the technical appendix defines no such list, `sheriff types` writes nothing.» Без изменений по смыслу. Добавлено условие о расширении RecordType: RecordType есть только в проекте, который выбрал это расширение. «Writes nothing» стало «no types and no RuntimeChecks»: `sheriff types` ещё запускает собственные генераторы проекта."),
      P("The list of those files is the `TextRule.list` (§s-eferktypcj7njt5) of a rule in the section of the technical appendix on the stack (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). That rule is the one that has an `implements` link to the rule on generating the types and the RuntimeChecks (§s-e877bnfa559tvk9). Each member of the list is the path of a file relative to the root of the repository.",
        "Список этих файлов — это `TextRule.list` (§s-eferktypcj7njt5) правила в разделе технического приложения о стеке (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). Это то правило, у которого есть связь `implements` с правилом о генерации типов и RuntimeChecks (§s-e877bnfa559tvk9). Каждый элемент списка — путь файла относительно корня репозитория.",
        "Было: «The list of those files is defined in the rule that describes how the system generates its types and RuntimeChecks from its RecordTypes, as the rule on data structures requires (§s-e877bnfa559tvk9). That rule stands in the section of the technical appendix that describes the technologies the whole system is built with, the stack. Each path in the list is taken from the root of the repository.» Без изменений по смыслу. Правило 12.3 больше не правило о структурах данных, поэтому оно названо по тому, что оно говорит; сказано, как инструменты SpecSheriff находят правило со списком — по связи `implements`, как делает код (types.ts)."),
      P("`sheriff types` reads that rule as the SpecSheriff tools read a rule of the project's own guidelines (§s-t9j29hppag2nren), with its `implements` link in place of a `refines` link. So it reads the list in the rule's last approved wording (§s-a8fn72xa782wvbk), and a rule that has never been approved lists no file.",
        "`sheriff types` читает это правило так же, как инструменты SpecSheriff читают правило собственных guidelines проекта (§s-t9j29hppag2nren), — со связью `implements` вместо связи `refines`. Поэтому список он читает в последней одобренной формулировке правила (§s-a8fn72xa782wvbk), а правило, которое ни разу не одобряли, не перечисляет ни одного файла.",
        "Новое: по правилу 10.15 код системы генерируется из одобренных формулировок, а то, куда он записывается, — часть того, что генерируется. Список читается так же, как согласованный узел «What the SpecSheriff tools read in the project's own guidelines» читает каждое правило `project.json`. Код сейчас читает список таким, каким его хранит файл (types.ts)."),
      P("The end of a listed file's name says what `sheriff types` writes into the file:",
        "Окончание имени файла из списка говорит, что `sheriff types` записывает в этот файл:",
        "Было: «A file's extension says what is written into it:». Без изменений по смыслу. «Extension» здесь — расширение имени файла, а не расширение guidelines, поэтому сказано прямо: окончание имени."),
      L("`.ts`: the types in TypeScript;",
        "`.ts` — типы на TypeScript;",
        SAME),
      L("`.py`: the types in Python;",
        "`.py` — типы на Python;",
        SAME),
      L("`.json`: the RuntimeChecks in JSON Schema 2020-12.",
        "`.json` — RuntimeChecks на JSON Schema 2020-12.",
        "Было: «the RuntimeChecks in JSON Schema of draft 2020-12». Без изменений по смыслу."),
      P("The check of generated copies refuses a list that names any other file, and each other defect that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).",
        "Проверка сгенерированных копий отвергает список, в котором есть любой другой файл, и любой другой изъян, из-за которого `sheriff types` не может ничего записать (§s-dbk2vyeg8z5jxna).",
        "Новое в тексте: отказы описывает согласованный узел «Generated copies checked against their nodes», а этот узел на него ссылается, чтобы читатель знал, что бывает с другим файлом."),
      P("The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion, not only as an annotation.",
        "Валидатор JSON Schema, который техническое приложение называет для RuntimeChecks (§s-e877bnfa559tvk9), считает `format` утверждением, а не только аннотацией.",
        "Было: «Those RuntimeChecks are run by the JSON Schema validator the technical appendix names. That validator asserts `format` rather than taking it as a note.» Без изменений по смыслу; вместо «note» — слово JSON Schema 2020-12 «annotation»."),
      P("For each file of RuntimeChecks, `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.",
        "Для каждого файла RuntimeChecks `sheriff types` ведёт запись в файле привязок (§s-trwczfskj5zmuft), потому что файл JSON не может содержать собственного SpecTag (§s-kgbzk2ph9e6jfb4). Ключ записи — путь файла. Её значение перечисляет SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) каждого RecordType, определение которого содержит файл (§s-suv42g8r3ra2h6b), в порядке определений.",
        "Новое: по правилу 12.3a код, сгенерированный из RecordType, в том числе его RuntimeChecks, привязан к нему SpecTag. Файл JSON не может содержать комментарий, поэтому по правилу 1.5.2 его SpecTag хранит запись в файле привязок, а пишет её тот, кто пишет этот код, — `sheriff types`."),
      P("`sheriff types` writes that entry where the bindings file lacks it or holds another value for that path. It changes no other entry, and names the bindings file where it writes it.",
        "`sheriff types` записывает эту запись, если в файле привязок её нет или под этим путём в нём другое значение. Других записей он не меняет и называет файл привязок, если записывает его.",
        NEW),
    ],
    reason: "Where the generated code goes is a choice that concerns the whole system. The section of the technical appendix on the stack makes that choice, in a list that the SpecSheriff tools read (§s-vj7ercem526zd6v). Each file that `sheriff types` writes is bound to the RecordTypes that it comes from (§s-ktfstpv8rurznrp), so the RuntimeChecks are found from each RecordType, as its types are.",
    ruReason: "Куда записывается сгенерированный код — выбор, который касается всей системы. Его делает раздел технического приложения о стеке, списком, который читают инструменты SpecSheriff (§s-vj7ercem526zd6v). Каждый файл, который записывает `sheriff types`, привязан к тем RecordType, из которых он получен (§s-ktfstpv8rurznrp), поэтому RuntimeChecks находятся от каждого RecordType так же, как его типы.",
    reasonChange: "Было: три абзаца, которые объясняли текст по порядку, в том числе что инструменты так же читают уровни доменов. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2).",
    examples: [
      X("The rule of the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. It keeps in the bindings file the entry for `src/generated/records.schema.json`, with the SpecTag of each RecordType. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.",
        "Правило стека перечисляет `src/generated/records.ts` и `src/generated/records.schema.json`. `sheriff types` записывает типы RecordType в первый файл, а их RuntimeChecks — во второй. Он ведёт в файле привязок запись для `src/generated/records.schema.json` с SpecTag каждого RecordType. Участник команды добавляет в список `worker/records.py`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff types` ничего не записывает в `worker/records.py`. Самая вероятная ошибка — брать список из формулировки-черновика."),
    ],
    refs: [
      R("implements", "s-e877bnfa559tvk9"),
      R("implements", "s-ktfstpv8rurznrp"),
      R("cites", "s-hzuzn8hbq6q9q4s"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-vj7ercem526zd6v"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-t9j29hppag2nren"),
      R("cites", "s-dbk2vyeg8z5jxna"),
      R("cites", "s-trwczfskj5zmuft"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-suv42g8r3ra2h6b"),
    ],
    removed: [
      "“`sheriff binding` reads a file of types as the system's code even where the glob patterns naming where that code lives do not reach it.”: the agreed “Project-wide settings” (new:tools-1-settings) states that the SpecSheriff tools read the files into which `sheriff types` writes the types to find their SpecTags.",
      "The reason's sentence on the levels of the domains, which the SpecSheriff tools read from a list in the project's own guidelines: the agreed s-t9j29hppag2nren states how that list is read.",
    ],
    date: DATE,
  },
  stage3: "types.ts typeFiles: read the list in the last approved wording of the rule of the stack, with its implements link taken as s-t9j29hppag2nren takes the refines links of a rule of project.json, a rule never approved listing no file; run only where the RecordType extension is chosen; for each .json file, write into sheriff.bindings.json the entry whose value lists the SpecTag of each RecordType whose definition the file holds, in their order, leave the other entries as they are, and name sheriff.bindings.json where it is written. Tests for a draft list and for the entry of the bindings file are written first. The test “refuses a listed file of another extension, and two rules of the stack each listing files, and then writes nothing” carries s-dbk2vyeg8z5jxna, which states those refusals. The test at binding.test.ts:379 carries the sid that stage 3 gives to “Project-wide settings”, which now states that the files of types are read for SpecTags. The tests named in testsFrom keep this sid.",
});

add("s-suv42g8r3ra2h6b", {
  location: "tools 18",
  sidValue: "s-suv42g8r3ra2h6b",
  testsFrom: [
    "writes each RecordType as a type tagged with its sid and a definition under $defs, in each language",
    "takes the files in the code-point order of their paths and the nodes in the order they stand",
    "holds the fields of every RecordType up the refines links first, the topmost first",
    "refers to a RecordType by the name of its type, in Python as a string, and the files compile and run",
    "cannot generate a name that is no identifier in its file's language, or that the file already uses",
  ],
  proposal: {
    title: "What a RecordType generates",
    ruTitle: "Что генерируется из RecordType",
    parts: [
      P("From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).",
        "Из последней одобренной формулировки каждого RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk) `sheriff types` записывает тип в каждый файл типов и определение в каждый файл RuntimeChecks (§s-pvzms7d8kxb8dk2). RecordType он берёт в порядке кодовых точек путей их файлов, а внутри файла — в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).",
        "Было: «From each RecordType, `sheriff types` writes a type into each file of types and a definition under `$defs` into each file of RuntimeChecks. It takes the nodes in the order the specification reads: its files in the code-point order of their paths; the nodes of each file in the order they stand.» Без изменений по смыслу. Сказано, из какой формулировки (согласованный узел «What `sheriff types` generates»); порядок узлов в файле назван так же, как в согласованном узле о значениях поля с `enum`, — по вычислению расположений, которое учитывает и узлы в ячейках `TableRule`."),
      P("The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word turned to uppercase and the spaces removed.",
        "Имя типа RecordType и его определения — это название RecordType, в котором первая буква каждого слова сделана заглавной, а пробелы убраны.",
        "Было: «Every type and definition is named by the RecordType's name with the first letter of each word raised and the spaces dropped.» Без изменений по смыслу; имя RecordType — его название, как говорит схема расширения RecordType."),
      P("Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).",
        "У каждого типа есть SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) с sid его RecordType (§s-ktfstpv8rurznrp) в комментарии прямо над ним (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` на TypeScript и `# @spec <sid>` на Python. У каждого определения `$anchor` — это sid его RecordType, по которому на него указывает `$ref` в другом определении (§s-4npdup7mjkva69y).",
        "Было: «Each type carries a SpecTag with the sid of its RecordType, as a symbol of code carries one with the rule it implements (§s-5z5gnu7pahr82xp).» Без изменений по смыслу; сказано, как именно пишется комментарий на каждом языке, — так пишет код. Новое: `$anchor` определения — sid его RecordType, как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19; по нему на RecordType указывает `$ref`."),
      P("A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.",
        "Файл RuntimeChecks содержит один документ JSON Schema, у которого `$schema` — `https://json-schema.org/draft/2020-12/schema`, а `$defs` содержит каждое определение под его именем.",
        "Было: «…a definition under `$defs` into each file of RuntimeChecks». Без изменений по смыслу; так пишет код (types.ts)."),
      P("The fields of a type and of a definition are, first, the fields of each RecordType that the RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools go through the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take no RecordType twice.",
        "Поля типа и определения — это сначала поля каждого RecordType, до которого RecordType доходит по связям `refines` (§s-sn6au3vcr9uy5pm). За ними идут его собственные поля, которые объявляет его `schema` (§s-6eb92ddch7shuvu). Связи `refines` RecordType инструменты SpecSheriff обходят в том порядке, в каком он их перечисляет. Для каждой связи они сначала берут RecordType, до которых так же доходит связанный RecordType, а затем сам связанный RecordType. Ни один RecordType они не берут дважды.",
        "Было: «A type and a definition hold, in this order: the fields of every RecordType above the node along its `refines` links, the topmost first; the node's own fields.» Без изменений по смыслу. Новое: RecordType может уточнять несколько RecordType, например фрагмент формата и другой RecordType (правило 12.10), поэтому сказано, в каком порядке обходятся связи."),
      P("Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field has the schema that the last of them gives. A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.",
        "Каждое поле сохраняет своё имя и место, где оно встречается впервые. Если поле с одним и тем же именем объявляют несколько из этих RecordType, у поля та схема, которую даёт последний из них. Поле гарантированное (§s-adhmw4gw6y82f44), если его перечисляет `required` в `schema` любого из этих RecordType. В типе гарантированное поле обязательное, а любое другое — необязательное.",
        "Было: «Each field keeps its name and the order its node gives it. It is required where its node says so and optional otherwise.» Без изменений по смыслу; «required» в RecordType теперь называется «guaranteed» (ваше решение от 2026-11-15), а в схеме это `required`. Новое: что происходит с полем, которое объявлено дважды, — иначе тип содержал бы два свойства с одним именем, которые TypeScript не компилирует."),
      P("A definition is the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type that the schema of a field gives says (§s-4npdup7mjkva69y). A RecordType of which RecordType variants exist generates, in addition, what the node on such a RecordType says (§s-nk8td3ez58gahc4).",
        "Определение — это собственная `schema` RecordType, в которой `properties` содержит эти поля, а `required` перечисляет гарантированные. Схема каждого поля в нём меняется только так, как говорит узел о типе, который даёт схема поля (§s-4npdup7mjkva69y). RecordType, у которого есть варианты RecordType, генерирует ещё и то, что говорит узел о таком RecordType (§s-nk8td3ez58gahc4).",
        "Было: «A field of type `record` refers to the type of that RecordType by its name. … Where the RecordType refuses a field nobody declared, its definition refuses any property its fields do not declare.» Теперь определение — это сама `schema` RecordType (ваше решение от 2026-11-19 о JSON Schema), поэтому и то, отвергаются ли поля, которых никто не объявлял, говорит сама `schema`; тип поля описывает узел о типе, который даёт схема поля. «A variant's own fields stand instead where the rule on RecordType variants places them» стало ссылкой на узел о RecordType с вариантами."),
      P("In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.",
        "На TypeScript тип пишется как `export type <name> = {...}`, с `?` после имени каждого необязательного поля.",
        "Было: «In TypeScript a type is written `export type <name> = {...}`.» Без изменений по смыслу; сказано, как отмечено необязательное поле, — так пишет код."),
      P("In Python:",
        "На Python:",
        SAME),
      L("a type is written `<name> = TypedDict(\"<name>\", {...})`;",
        "тип пишется как `<name> = TypedDict(\"<name>\", {...})`;",
        SAME),
      L("each name that a type uses from `typing` is imported from `typing`;",
        "каждое имя из `typing`, которым пользуется тип, импортируется из `typing`;",
        "Было: «every name a type uses is imported from `typing`». Без изменений по смыслу: встроенные имена Python, такие как `str`, не импортируются, — так делает код."),
      L("a reference to another type is written as a string;",
        "ссылка на другой тип пишется строкой;",
        SAME),
      L("an optional field is marked `NotRequired`.",
        "необязательное поле отмечено `NotRequired`.",
        SAME),
      P("`sheriff types` cannot generate the name of a type or of a definition in each of these cases (§s-dbk2vyeg8z5jxna):",
        "`sheriff types` не может сгенерировать имя типа или определения в каждом из этих случаев (§s-dbk2vyeg8z5jxna):",
        "Было: «A name cannot be generated where:». Без изменений по смыслу; ссылка ведёт на согласованный узел «Generated copies checked against their nodes», который перечисляет отказы, из-за которых `sheriff types` ничего не записывает."),
      L("the name is not an identifier in the language of its file;",
        "имя не является идентификатором в языке своего файла;",
        SAME),
      L("the file already uses the name, including the names that the file imports and those that its language reserves;",
        "файл уже пользуется этим именем, в том числе именами, которые файл импортирует, и теми, которые резервирует его язык;",
        "Было: «the file already uses it, the names the file imports and those its language builds in included». Без изменений по смыслу."),
      L("the name is that of the type that a `$ref` names, and no RecordType has the sid that the `$ref` names.",
        "это имя типа, который называет `$ref`, а sid, который называет `$ref`, нет ни у одного RecordType.",
        "Новое: такой ссылке не на что указывать; прежде код отвергал RecordType, поле которого ссылалось на несуществующий RecordType (types.ts)."),
    ],
    reason: "Generated in one fixed way, the types and the definitions come out the same at every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.",
    ruReason: "Типы и определения, сгенерированные одним и тем же способом, получаются одинаковыми при каждом запуске и на любой машине. На это опирается проверка сгенерированных копий (§s-dbk2vyeg8z5jxna). Названный по своему RecordType и привязанный к нему SpecTag, который пишет `sheriff types`, каждый тип ведёт читателя назад к RecordType, из которого он получен.",
    reasonChange: "Было: пять абзацев, которые объясняли текст по порядку. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2); доводы о `TypedDict`, о ссылках строкой и об именах, которые уже есть в файле, объясняли форму кода, которая следует из самих языков.",
    examples: [
      X("The fragment of a format `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the schema that `user` gives, and then `name`. The most likely mistake is to write `street` twice, once for each RecordType, which TypeScript refuses to compile.",
        "Фрагмент формата `address` объявляет поля `city` и `street`. RecordType `user` уточняет `address` и объявляет `name` и `street`, с более узкой схемой для `street`. Тип `User` содержит `city`, затем `street` со схемой, которую даёт `user`, а затем `name`. Самая вероятная ошибка — записать `street` дважды, по разу от каждого RecordType: такой тип TypeScript не компилирует."),
    ],
    refs: [
      R("implements", "s-e877bnfa559tvk9"),
      R("implements", "s-ktfstpv8rurznrp"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-pvzms7d8kxb8dk2"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-33fw3ga4ctd94dq"),
      R("cites", "s-4npdup7mjkva69y"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-adhmw4gw6y82f44"),
      R("cites", "s-nk8td3ez58gahc4"),
      R("cites", "s-dbk2vyeg8z5jxna"),
    ],
    removed: [
      "“The object of a field of type `variant` is written out in full.” and, for Python, “the object of a field of type `variant` is given a type of its own”, with the sentences on how that type is named and tagged: rule 12.6 (s-z3dnru6qqdf9m6j) drops the type `variant` (the owner's ruling of 2026-11-19).",
      "“Where the RecordType refuses a field nobody declared, its definition refuses any property its fields do not declare.”: a definition is now the RecordType's own `schema`, whose keywords say whether such a property is refused.",
      "“A field of type `record` refers to the type of that RecordType by its name.”: the node on the type that the schema of a field gives (s-4npdup7mjkva69y) states what a `$ref` gives.",
    ],
    date: DATE,
  },
  stage3: "types.ts declarations: read each RecordType's schema (properties and required) in its last approved wording; follow its refines links in the order listed, each linked RecordType after those it reaches, no RecordType twice; keep each field at its first place with the schema of its last declaration, required as the union of the required lists; write each definition as the RecordType's own schema with $anchor set to its sid and with properties and required replaced, and each file of RuntimeChecks with $schema and $defs; keep the doc comment in TypeScript and the comment line in Python; refuse, as a name that cannot be generated, the type that a $ref names where no RecordType has its sid. The field of type variant, unknown and the Python type of a variant's object go. Tests for refines through several links, for a field declared twice and for the $anchor are written first; the tests named in testsFrom keep this sid and are rewritten for the JSON Schema form.",
});

add("s-nk8td3ez58gahc4", {
  location: "tools 19",
  sidValue: "s-nk8td3ez58gahc4",
  testsFrom: [
    "writes a RecordType its variants refine as the union of each variant and a member for the values no variant answers to",
    "lets exactly one member hold each payment, in every language",
    "sets a variant's own fields beside the RecordType's where it has no field of type variant, and leaves out the member nobody needs",
    "gives the other member every value of each choosing field where several choose, and refuses only the combinations a variant answers to",
    "follows each node on a property nobody declared, and leaves out a field of type variant whose object would hold nothing",
  ],
  proposal: {
    title: "A RecordType its variants refine",
    ruTitle: "RecordType, который уточняют его варианты",
    parts: [
      P("A RecordType of which RecordType variants exist (§s-z3dnru6qqdf9m6j) generates, besides what any RecordType generates (§s-suv42g8r3ra2h6b), what this node says. Its variants are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes them in the order in which it takes the RecordTypes.",
        "RecordType, у которого есть варианты RecordType (§s-z3dnru6qqdf9m6j), генерирует, помимо того, что генерирует любой RecordType (§s-suv42g8r3ra2h6b), то, что говорит этот узел. Его варианты — это те варианты RecordType, чей RecordType — он, как это определяет проверка вариантов RecordType (§s-c2r9jndrjbtbsv6). `sheriff types` берёт их в том порядке, в каком берёт RecordType.",
        "Было: «A RecordType that variants refine is written as the union of its members. Its variants are RecordTypes each answering to values of its choosing fields.» Что такое вариант RecordType и чей он, теперь говорит согласованный узел «What a RecordType variant must agree with», поэтому этот узел на него ссылается."),
      P("In a file of RuntimeChecks, the RecordType's definition also holds `allOf`, with a pair of `if` and `then` for each of its variants:",
        "В файле RuntimeChecks определение RecordType содержит ещё и `allOf` с парой `if` и `then` для каждого из его вариантов:",
        "Было: «The union is written: in JSON Schema, as a definition holding `oneOf` the members». Пары `if` и `then` вместо `oneOf` с членом для прочих значений — как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19: так json-schema.org показывает поля, которые зависят от значения другого поля."),
      L("`if` is `{\"properties\": {<field>: {\"const\": <value>}, …}, \"required\": [<field>, …]}`, with each field and value that the variant's `answersTo` names;",
        "`if` — это `{\"properties\": {<field>: {\"const\": <value>}, …}, \"required\": [<field>, …]}` с каждым полем и значением, которые называет `answersTo` варианта;",
        NEW),
      L("`then` is `{\"$ref\": \"#<sid>\"}`, with the sid of the variant, which points to the variant's definition.",
        "`then` — это `{\"$ref\": \"#<sid>\"}` с sid варианта, который указывает на определение варианта.",
        NEW),
      P("A variant's definition is written as the definition of any RecordType, except that it holds only the fields that the variant adds to its RecordType. These are the fields that the variant declares and the fields of each RecordType that it reaches through `refines` links (§s-sn6au3vcr9uy5pm), other than its RecordType and the RecordTypes that its RecordType reaches.",
        "Определение варианта пишется так же, как определение любого RecordType, но содержит только те поля, которые вариант добавляет к своему RecordType. Это поля, которые объявляет вариант, и поля каждого RecordType, до которого он доходит по связям `refines` (§s-sn6au3vcr9uy5pm), кроме его RecordType и тех RecordType, до которых доходит его RecordType.",
        "Было: «A variant holds … its own fields: inside the RecordType's field of type `variant`…; where the RecordType has no such field, beside the RecordType's fields.» Поле типа `variant` убрано (ваше решение от 2026-11-19): поля варианта добавляет к полям RecordType пара `if` и `then`, поэтому в определении варианта — только его собственные поля."),
      P("In a file of types, the RecordType's type is the union of the following members, each a type of its own:",
        "В файле типов тип RecordType — это объединение следующих членов, каждый из которых — отдельный тип:",
        "Было: «Its members are:». Без изменений по смыслу: TypeScript и Python получают плоское размеченное объединение, как на странице о RecordType и JSON Schema."),
      L("for each variant, a type whose name is that of the variant's type (§s-suv42g8r3ra2h6b);",
        "для каждого варианта — тип, имя которого — имя типа варианта (§s-suv42g8r3ra2h6b);",
        "Было: «each variant, referred to by the name of its type». Без изменений по смыслу."),
      L("where a combination of values of the fields that select a variant has no variant, a type for the other combinations, whose name is the name of the RecordType's type followed by `Other`.",
        "если у какого-то сочетания значений полей, выбирающих вариант, нет варианта, — тип для прочих сочетаний, имя которого — имя типа RecordType, за которым следует `Other`.",
        "Было: «where some combination of the choosing fields' values has no variant, a member for those combinations» и «The member for those combinations is named by the RecordType's name followed by `Other`.» Без изменений по смыслу."),
      P("A combination of values holds one value of each field that selects a variant. The type of a variant holds the RecordType's fields, followed by the fields that the variant adds. In it, each field that selects a variant is required and takes only the value that the variant's `answersTo` names.",
        "Сочетание значений содержит по одному значению каждого поля, выбирающего вариант. Тип варианта содержит поля RecordType, а за ними — поля, которые добавляет вариант. В нём каждое поле, выбирающее вариант, обязательно и принимает только то значение, которое называет `answersTo` варианта.",
        "Было: «A variant holds each choosing field, required and fixed to the value it answers to. It holds its own fields: inside the RecordType's field of type `variant`…; where the RecordType has no such field, beside the RecordType's fields.» Без изменений по смыслу; поля варианта стоят рядом с полями RecordType, потому что поля типа `variant` больше нет."),
      P("The type for the other combinations holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.",
        "Тип для прочих сочетаний содержит поля RecordType. Если поле, выбирающее вариант, одно, оно принимает только те значения, которым не соответствует ни один вариант. Если полей, выбирающих вариант, несколько, каждое из них принимает все свои значения.",
        "Было: «Its type gives a choosing field: where one field chooses, the values no variant answers to; where several fields choose, all its values.» Без изменений по смыслу. Убрано, что определение этого члена отвергает сочетания, которым соответствует вариант: в JSON Schema такого члена больше нет."),
      P("The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union[\"<member>\", …]` in Python. The union has the SpecTag of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type that of the variant, and the type for the other combinations that of the RecordType.",
        "Объединение пишется как `export type <name> = <member> | …` на TypeScript и как `<name> = Union[\"<member>\", …]` на Python. У объединения есть SpecTag RecordType. У каждого члена есть SpecTag того RecordType, из которого он получен: у типа варианта — SpecTag варианта, а у типа для прочих сочетаний — SpecTag RecordType.",
        "Было: «in TypeScript, as a union type; in Python, as `<name> = Union[...]`» и «The type carries a SpecTag with the RecordType's sid.» Без изменений по смыслу; сказано, какой SpecTag у каждого члена, — так пишет код."),
      P("The values of a field that selects a variant are those that the SpecSheriff tools collect for it (§s-5nf87c3e3jg9v7c).",
        "Значения поля, которое выбирает вариант, — это значения, которые собирают для него инструменты SpecSheriff (§s-5nf87c3e3jg9v7c).",
        "Новое: значения выбирающего поля берутся так же, как их берёт проверка вариантов, — из согласованного узла о том, откуда собираются значения поля с `enum`."),
    ],
    reason: "A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). JSON Schema states this with pairs of `if` and `then`. TypeScript and Python state it with a union of flat types, which the values of the fields that select a variant tell apart.",
    ruReason: "Запись данных содержит поля своего RecordType вместе с полями того варианта RecordType, который выбирают её значения (§s-z3dnru6qqdf9m6j). JSON Schema выражает это парами `if` и `then`. TypeScript и Python выражают это объединением плоских типов, которые различают значения полей, выбирающих вариант.",
    reasonChange: "Было: четыре абзаца, которые объясняли текст по порядку. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Член для прочих значений в JSON Schema больше не нужен: если ни одно `if` не срабатывает, поля, которых RecordType не описывает, отвергает его собственная `schema`.",
    examples: [
      X("The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`. Its definition holds a pair of `if` and `then` for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so that a data record whose `channel` is `email` and that has no `address` passes the type.",
        "RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email`, `sms` и `app`. Его варианты с названиями «notification by email» и «notification by SMS» соответствуют `email` и `sms`. Его определение содержит по паре `if` и `then` для каждого из них, а его тип `Notification` — объединение `NotificationByEmail`, `NotificationBySMS` и `NotificationOther`, в котором `channel` принимает только `app`. Самая вероятная ошибка — позволить `channel` принимать в `NotificationOther` любое значение: тогда запись данных, у которой `channel` равно `email` и нет `address`, проходит проверку типа."),
    ],
    refs: [
      R("implements", "s-e877bnfa559tvk9"),
      R("cites", "s-z3dnru6qqdf9m6j"),
      R("cites", "s-suv42g8r3ra2h6b"),
      R("cites", "s-c2r9jndrjbtbsv6"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-5nf87c3e3jg9v7c"),
    ],
    removed: [
      "The union in JSON Schema as a definition holding `oneOf` its members, and the definition of the member for the other combinations, which refused every combination that a variant answers to: the RecordType's definition holds pairs of `if` and `then` instead (the owner's ruling of 2026-11-19).",
      "The paragraphs on a field of type `variant`, and on each node deciding whether a property nobody declared is refused: rule 12.6 (s-z3dnru6qqdf9m6j) drops the type `variant`, and a definition is now the RecordType's own `schema`.",
    ],
    date: DATE,
  },
  stage3: "types.ts declarations: the RecordType's definition gains allOf with a pair of if and then for each variant, in the order of the RecordTypes, then pointing to the variant's definition by its $anchor; a variant's definition holds only the fields that it adds; the oneOf union and the definition of the Other member in JSON Schema go. TypeScript and Python keep the union of flat members: each variant's type with the RecordType's fields, the selecting fields required and fixed, then the variant's fields; the Other member where a combination has no variant. The field of type variant goes. Tests that run the generated JSON Schema with Ajv 2020 on accepted and refused data records, as the page on RecordType and JSON Schema did, are written first; the tests named in testsFrom are rewritten and keep this sid.",
});

add("s-4npdup7mjkva69y", {
  location: "tools 20",
  sidValue: "s-4npdup7mjkva69y",
  testsFrom: [
    "gives each neutral type the type its table names, in each language",
    "bounds how many members a list holds in the runtime checks alone",
    "gives a field of type one of the values the lists of domains declare for it, in the order the specification reads",
    "gives an identifier the type of the field identifying the RecordType it names",
  ],
  proposal: {
    title: "The type that the schema of a field gives",
    ruTitle: "Тип, который даёт схема поля",
    titleChange: "Было: «The type each neutral type of a field gives». Тип поля теперь записывается словами JSON Schema (ваше решение от 2026-11-19), поэтому тип в файле типов даёт схема поля, а нейтральный тип остаётся только как то, что вместо неё писал прежний выпуск.",
    parts: [
      P("Within a RecordType's `schema` (§s-6eb92ddch7shuvu), the schema of each field gives, in TypeScript and in Python, the type that the table below names. The last column of the table names the neutral type that an earlier release of the SpecSheriff tools wrote in place of each schema (§s-gb8s9657a65hqmv).",
        "Внутри `schema` RecordType (§s-6eb92ddch7shuvu) схема каждого поля даёт на TypeScript и на Python тот тип, который называет таблица ниже. Последний столбец таблицы называет нейтральный тип, который прежний выпуск инструментов SpecSheriff писал вместо каждой схемы (§s-gb8s9657a65hqmv).",
        "Было: «Each neutral type a field may have gives what the table below says, in a file of RuntimeChecks and in a file of types.» Тип поля теперь — его схема JSON Schema, поэтому таблица идёт от схемы поля. Нейтральные типы остались в последнем столбце: по ним согласованный узел о записанном прежним выпуском переписывает поля RecordType в `schema`."),
      P("| Field's schema | TypeScript | Python | Neutral type that an earlier release wrote |\n|---|---|---|---|\n| `{\"$ref\": \"#<sid>\"}` | the name of the type of the RecordType that has that sid | that name, as a string | record |\n| `{\"identifierOf\": \"<sid>\"}` | what the field at the end of its chain of identifiers gives (§s-3anv9qcmx8pwp2w) | what that field gives | identifier of |\n| `{\"enum\": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |\n| `{\"x-enumSource\": <its source>}` | the union of the values gathered beside it as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |\n| `{\"type\": \"string\"}` | `string` | `str` | text |\n| `{\"type\": \"string\", \"format\": \"email\"}` | `string` | `str` | email address |\n| `{\"type\": \"string\", \"format\": \"date-time\"}` | `string` | `str` | instant |\n| `{\"type\": \"string\", \"format\": \"date\"}` | `string` | `str` | date |\n| `{\"type\": \"string\", \"format\": \"duration\"}` | `string` | `str` | duration |\n| `{\"type\": \"integer\"}`, with its bounds | `number` | `int` | whole number |\n| `{\"type\": \"number\"}`, with its bounds | `number` | `float` | number |\n| `{\"type\": \"boolean\"}` | `boolean` | `bool` | yes/no |\n| `{\"type\": \"array\", \"items\": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |\n| `{\"type\": \"object\", \"additionalProperties\": <its values' schema>}`, with no `properties` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |\n| `{}` | `unknown` | `Any` | any value |",
        "| Схема поля | TypeScript | Python | Нейтральный тип, который писал прежний выпуск |\n|---|---|---|---|\n| `{\"$ref\": \"#<sid>\"}` | имя типа того RecordType, у которого этот sid | это имя, строкой | record |\n| `{\"identifierOf\": \"<sid>\"}` | то, что даёт поле в конце его цепочки идентификаторов (§s-3anv9qcmx8pwp2w) | то, что даёт это поле | identifier of |\n| `{\"enum\": [<its values>]}` | объединение его значений как литералов | `Literal[<its values>]` | one of, с собственным списком |\n| `{\"x-enumSource\": <its source>}` | объединение значений, собранных рядом с ним, как литералов | `Literal[<the values gathered beside it>]` | one of, со значениями из других мест |\n| `{\"type\": \"string\"}` | `string` | `str` | text |\n| `{\"type\": \"string\", \"format\": \"email\"}` | `string` | `str` | email address |\n| `{\"type\": \"string\", \"format\": \"date-time\"}` | `string` | `str` | instant |\n| `{\"type\": \"string\", \"format\": \"date\"}` | `string` | `str` | date |\n| `{\"type\": \"string\", \"format\": \"duration\"}` | `string` | `str` | duration |\n| `{\"type\": \"integer\"}`, со своими границами | `number` | `int` | whole number |\n| `{\"type\": \"number\"}`, со своими границами | `number` | `float` | number |\n| `{\"type\": \"boolean\"}` | `boolean` | `bool` | yes/no |\n| `{\"type\": \"array\", \"items\": <its members' schema>}`, со своими границами числа элементов | `<its members' type>[]` | `list[<its members' type>]` | list of |\n| `{\"type\": \"object\", \"additionalProperties\": <its values' schema>}`, без `properties` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |\n| `{}` | `unknown` | `Any` | any value |",
        "Было: таблица со столбцами «Field's type», «JSON Schema», «TypeScript», «Python». Схема поля теперь и есть то, что было в столбце «JSON Schema», поэтому она стоит первой, а столбец нейтральных типов — последним. Строки «one of» и «identifier of» записаны словами JSON Schema и собственными словами SpecSheriff (`enum`, `x-enumSource`, `identifierOf`), строка «record» — через `$ref`, как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19. Строка для типа `variant` убрана вместе с этим типом (правило 12.6). Типы на TypeScript и Python — те же, что прежде."),
      P("A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets means any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. The same table gives the type of the members of a list and of the values of a map from their schemas.",
        "Схема поля подпадает под первую строку таблицы, ключевые слова которой она содержит со значениями, которые даёт строка. В строке значение в угловых скобках означает любое значение того рода, который оно называет. Любое другое ключевое слово схемы поля, например `description`, `format` или граница, оставляет тип таким, каким его даёт строка. По той же таблице тип элементов списка и значений словаря даёт их схема.",
        "Новое: схема поля — это JSON Schema, в которой могут быть и другие ключевые слова, поэтому сказано, по какой строке она даёт тип. Последняя строка, `{}`, подходит любой схеме, поэтому схема, которая не подпадает ни под одну другую строку, даёт `unknown` и `Any`."),
      P("The rows that give the same type, such as those whose schema holds `{\"type\": \"string\"}`, are listed apart because an earlier release wrote each of them as a neutral type of its own.",
        "Строки, которые дают один и тот же тип, например те, схема которых содержит `{\"type\": \"string\"}`, перечислены отдельно, потому что прежний выпуск писал каждую из них как отдельный нейтральный тип.",
        "Новое: иначе строки с `format` выглядели бы лишними, ведь схема, которая содержит `format`, подпадает уже под строку «text»."),
      P("A field with `identifierOf` gives what `{}` gives where its chain of identifiers has no end.",
        "Поле с `identifierOf` даёт то же, что `{}`, если у его цепочки идентификаторов нет конца.",
        "Новое: такую цепочку отвергает проверка «An identifier followed to its end», но `sheriff types` запускается и после неудачной проверки, поэтому сказано, что он даёт в этом случае."),
      P("A RecordType's `schema` names another RecordType only in the following forms:",
        "`schema` RecordType называет другой RecordType только в следующих видах:",
        "Новое: ни один узел не говорил, в каком виде `schema` RecordType называет другой RecordType, а на это опираются согласованные узлы «An identifier followed to its end» и «A RecordType that refers to a RecordType outside its part of the system»."),
      L("a `$ref` whose value is `#` followed by the RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);",
        "`$ref`, значение которого — `#`, за которым следует sid RecordType; он указывает на `$anchor` определения этого RecordType (§s-suv42g8r3ra2h6b);",
        "Новое: `$ref` с `#` и sid — как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19."),
      L("an `identifierOf` whose value is the RecordType's sid.",
        "`identifierOf`, значение которого — sid RecordType.",
        "Новое: `identifierOf` — собственное слово SpecSheriff, а не ссылка JSON Schema, поэтому его значение — sid без `#`, как везде, где спецификация называет узел: в связях и в собранных значениях."),
      P("Each value gathered beside a field (§s-ju5vcanbjph7mgh) is taken once, at the place where it first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c). The types and the RuntimeChecks take the values alike.",
        "Каждое значение, собранное рядом с полем (§s-ju5vcanbjph7mgh), берётся один раз, на том месте, где оно впервые появляется в `x-enumSource.gathered` этого поля (§s-5nf87c3e3jg9v7c). Типы и RuntimeChecks берут значения одинаково.",
        "Было: «Where its values come from elsewhere, it gives those gathered beside it (§s-ju5vcanbjph7mgh), in this order: by the node each comes from, …; the members of one list in their order.» Порядок собранных значений теперь задаёт согласованный узел о том, откуда собираются значения поля с `enum`, и этот узел на него ссылается, а не повторяет его. Новое: каждое значение берётся один раз — два раздела с одним названием дают одно значение дважды, а в `enum` и в объединении литералов значение должно стоять один раз."),
      P("In a file of RuntimeChecks, `sheriff types` writes each field's schema as the RecordType's `schema` holds it, with the following changes at any depth:",
        "В файле RuntimeChecks `sheriff types` пишет схему каждого поля так, как её содержит `schema` RecordType, со следующими изменениями на любой глубине:",
        "Было: столбец «JSON Schema» таблицы. Теперь схема поля и есть его RuntimeCheck, поэтому сказано только, что `sheriff types` в ней меняет: собственные слова SpecSheriff, которых не знает валидатор JSON Schema."),
      L("`x-enumSource` is replaced by `enum`, which holds the values gathered beside the field;",
        "`x-enumSource` заменяется на `enum`, который содержит значения, собранные рядом с полем;",
        "Было: «one of | `{\"enum\": [<its values>]}`». Без изменений по смыслу."),
      L("`identifierOf` is replaced, in its place, by each keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;",
        "`identifierOf` заменяется, на своём месте, каждым ключевым словом схемы поля в конце цепочки идентификаторов, кроме `description` этой схемы;",
        "Было: «identifier of | what the field identifying that RecordType gives». Без изменений по смыслу (ваше решение от 2026-10-31); собственное описание поля сохраняется."),
      L("where that chain has no end, `identifierOf` is removed.",
        "если у этой цепочки нет конца, `identifierOf` удаляется.",
        "Новое: так RuntimeCheck не содержит слова, которого валидатор JSON Schema не знает, а цепочку без конца отвергает проверка «An identifier followed to its end»."),
    ],
    reason: "JSON Schema is the standard for which every language has a validator. So a field's schema serves as its RuntimeCheck, which checks alike in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.",
    ruReason: "JSON Schema — стандарт, для которого валидатор есть в каждом языке. Поэтому схема поля служит его RuntimeCheck, который одинаково в каждом языке проверяет то, чего не может выразить тип на TypeScript или Python, например границу или формат. Собственный тип значения в каждом языке — тот, который его код читает без преобразования. Идентификатор имеет тип поля, которое идентифицирует названный им RecordType. Поэтому значение, которое переходит из этого поля в поле, ссылающееся на него, сохраняет свой тип и проходит тот же RuntimeCheck.",
    reasonChange: "Было: пять абзацев, которые объясняли текст по порядку. Сохранены доводы о JSON Schema, о собственном типе каждого языка, о границах и об идентификаторе (ваше решение от 2026-10-31). Довод о том, что генератор не собирает значения заново, ушёл вместе с абзацем о порядке значений, который теперь задаёт узел о сборе значений.",
    examples: [
      X("The `schema` of the RecordType `statement` holds `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{\"type\": \"string\", \"maxLength\": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not know that keyword, so it does not check that `accountId` is a string.",
        "`schema` RecordType `statement` содержит `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, где `s-…` — sid RecordType `account`. Поле, которое идентифицирует `account`, — `number` со схемой `{\"type\": \"string\", \"maxLength\": 34}`. На TypeScript у `accountId` тип `string`, а в RuntimeChecks его схема — `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. Самая вероятная ошибка — оставить `identifierOf` в RuntimeCheck: валидатор JSON Schema этого слова не знает и потому не проверяет, что `accountId` — строка."),
    ],
    refs: [
      R("implements", "s-e877bnfa559tvk9"),
      R("cites", "s-6eb92ddch7shuvu"),
      R("cites", "s-gb8s9657a65hqmv"),
      R("cites", "s-3anv9qcmx8pwp2w"),
      R("cites", "s-suv42g8r3ra2h6b"),
      R("cites", "s-ju5vcanbjph7mgh"),
      R("cites", "s-5nf87c3e3jg9v7c"),
    ],
    removed: [
      "The row for the type `variant`: rule 12.6 (s-z3dnru6qqdf9m6j) drops that type (the owner's ruling of 2026-11-19).",
      "The order of the gathered values (“by the node each comes from, the files of the specification in the code-point order of their paths and the nodes of a file in the order they stand; the members of one list in their order”): s-5nf87c3e3jg9v7c states it where `sheriff reindex` writes the values, and this node cites it.",
      "The `cites` link to “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23): the paragraph of the reason that cited it is gone.",
    ],
    date: DATE,
  },
  stage3: "types.ts resolve: read the field's JSON Schema and take the first row of the table that it matches, {} last; give x-enumSource the gathered values, each once, in their order in x-enumSource.gathered; give identifierOf, a bare sid, what the identifying field at the end of the chain gives, or {} where the chain has no end; give $ref \"#<sid>\" the name of that RecordType's type. Write each field's schema into the RuntimeChecks as the RecordType holds it, with x-enumSource replaced by enum and identifierOf by the keywords of the identifying field's schema other than its description. The tests named in testsFrom are rewritten first for the JSON Schema form and keep this sid; “gives a field of type one of the values the lists of domains declare…” becomes a test of x-enumSource.",
});

// ---------------------------------------------------------------------------------------------------------------
// Proposals on agreed drafts that the subject of the group brings to light. Each is one complete new wording, built
// from the agreed draft named in `base`: every part that does not change keeps its agreed wording, and its `change`
// says so.
// ---------------------------------------------------------------------------------------------------------------
const AS_AGREED = "Как в согласованной формулировке.";
const fromBase = (baseKey) => {
  const base = drafts[baseKey];
  if (!base || !base.agreed) throw new Error(`${baseKey}: no agreed draft to build a proposal on`);
  return { base, parts: base.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: AS_AGREED })) };
};
const at = (parts, start) => {
  const i = parts.findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`no part starts with: ${start}`);
  return i;
};
const sidOf = (baseKey) => drafts[baseKey].sidValue ?? baseKey;
const proposalOf = (base, parts, extra = {}) => ({
  title: base.proposal.title,
  ruTitle: base.proposal.ruTitle,
  parts,
  reason: base.proposal.reason,
  ruReason: base.proposal.ruReason,
  reasonChange: AS_AGREED,
  ...(base.proposal.examples ? { examples: base.proposal.examples.map((x) => ({ ...x })) } : {}),
  removed: [],
  date: DATE,
  ...extra,
});

// 1. "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts): the lines on `sheriff show` and `sheriff markdown` cite
// the nodes of those commands, which item 51 splits from s-k4nqjr96ux7a5m7.
{
  const { base, parts } = fromBase("s-f5rz6b7dhxejjts");
  const show = at(parts, "`sheriff show`:");
  parts[show] = { ...parts[show], en: parts[show].en.replace("s-k4nqjr96ux7a5m7", SID.show), ru: parts[show].ru.replace("s-k4nqjr96ux7a5m7", SID.show), change: "Технически: ссылка ведёт теперь на узел «Printing one node», который описывает `sheriff show`; прежний узел о записи узла разделён в этой группе." };
  const markdown = at(parts, "`sheriff markdown`:");
  parts[markdown] = { ...parts[markdown], en: parts[markdown].en.replace("s-k4nqjr96ux7a5m7", SID.export), ru: parts[markdown].ru.replace("s-k4nqjr96ux7a5m7", SID.export), change: "Технически: ссылка ведёт теперь на узел «Writing the human-readable export», который описывает `sheriff markdown`; прежний узел о записи узла разделён в этой группе." };
  const refs = base.proposal.refs.filter((r) => !(r.type === "cites" && r.to === "s-k4nqjr96ux7a5m7")).map((r) => ({ ...r }));
  refs.push(R("cites", SID.show), R("cites", SID.export));
  add("proposal:s-f5rz6b7dhxejjts-g7", {
    question: "None: a technical replacement that follows the split of “What the export, the guide and `sheriff show` write of a node” (item 51)",
    base: "s-f5rz6b7dhxejjts",
    location: base.location,
    sidValue: sidOf("s-f5rz6b7dhxejjts"),
    change: "Технически: строки о `sheriff show` и `sheriff markdown` ссылаются теперь на новые узлы этих команд, «Printing one node» и «Writing the human-readable export», на которые группа разделила узел о том, что экспорт, руководство и `sheriff show` пишут об узле. Ссылка на прежний узел, который теперь говорит только, как узел записывается в Markdown, из этого узла ушла. Остальная формулировка — как вы согласовали.",
    proposal: proposalOf(base, parts, { refs }),
    stage3: "None beyond the citations: the code of the commands follows the nodes that the two lines now cite.",
  });
}

// 2. "An identifier followed to its end" (s-3anv9qcmx8pwp2w): the form in which `identifierOf` names a RecordType,
// which item 56 now states (group 5's notes, item 2).
{
  const { base, parts } = fromBase("s-3anv9qcmx8pwp2w");
  const i = at(parts, "its `identifierOf` names a RecordType");
  parts[i] = L(
    "its `identifierOf` holds the sid of a RecordType (§s-7vm323mhry2enx3, §s-4npdup7mjkva69y) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);",
    "его `identifierOf` содержит sid RecordType (§s-7vm323mhry2enx3, §s-4npdup7mjkva69y), который в своём `identifiedBy` называет одно из своих полей полем, идентифицирующим его записи данных (§s-6eb92ddch7shuvu);",
    "Было: «its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that …». Без изменений по смыслу: сказано, в каком виде `identifierOf` называет RecordType, со ссылкой на узел «The type that the schema of a field gives», который этот вид задаёт.");
  const refs = base.proposal.refs.map((r) => ({ ...r }));
  refs.push(R("cites", "s-4npdup7mjkva69y"));
  add("proposal:s-3anv9qcmx8pwp2w-g7", {
    question: "None: a technical replacement; the node now cites item 56 for the form of `identifierOf`, as group 5's notes ask",
    base: "s-3anv9qcmx8pwp2w",
    location: base.location,
    sidValue: sidOf("s-3anv9qcmx8pwp2w"),
    change: "Технически: в первом условии сказано, что `identifierOf` содержит sid RecordType, со ссылкой на узел «The type that the schema of a field gives», который теперь задаёт этот вид. Остальная формулировка — как вы согласовали.",
    proposal: proposalOf(base, parts, { refs, reasonChange: AS_AGREED }),
    stage3: "validate.ts reads the value of identifierOf as a bare sid, as s-4npdup7mjkva69y says; the rest is in the agreed draft's stage3.",
  });
}

// 3. "A RecordType that refers to a RecordType outside its part of the system" (s-ezq8csd433vj6fj): the forms in which
// `$ref` and `identifierOf` name a RecordType, which item 56 now states (group 5's notes, item 2).
{
  const { base, parts } = fromBase("s-ezq8csd433vj6fj");
  const i = at(parts, "its `schema` (§s-6eb92ddch7shuvu) holds, at any depth");
  parts[i] = L(
    "its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it, in the forms in which a RecordType's `schema` names another RecordType (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);",
    "его `schema` (§s-6eb92ddch7shuvu) на любой глубине содержит `$ref`, который указывает на тот RecordType, или `identifierOf`, который его называет, в тех видах, в каких `schema` RecordType называет другой RecordType (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);",
    "Было: «… a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);». Без изменений по смыслу: добавлена ссылка на узел «The type that the schema of a field gives», который теперь задаёт, в каком виде `$ref` и `identifierOf` называют RecordType.");
  const refs = base.proposal.refs.map((r) => ({ ...r }));
  refs.push(R("cites", "s-4npdup7mjkva69y"));
  add("proposal:s-ezq8csd433vj6fj-g7", {
    question: "None: a technical replacement; the node now cites item 56 for the forms of `$ref` and `identifierOf`, as group 5's notes ask",
    base: "s-ezq8csd433vj6fj",
    location: base.location,
    sidValue: sidOf("s-ezq8csd433vj6fj"),
    change: "Технически: в пункте о ссылке через `schema` добавлена ссылка на узел «The type that the schema of a field gives», который теперь задаёт, в каком виде `$ref` и `identifierOf` называют RecordType. Остальная формулировка — как вы согласовали.",
    proposal: proposalOf(base, parts, { refs }),
    stage3: "validate.ts recognises a $ref of the form \"#<sid>\" and an identifierOf holding a bare sid, as s-4npdup7mjkva69y says; the rest is in the agreed draft's stage3.",
  });
}

// 4. "What `sheriff reindex` changes in what an earlier release wrote" (proposal:s-gb8s9657a65hqmv-g6): `unknown:
// "refused"` becomes `unevaluatedProperties: false`, which the pairs of `if` and `then` of item 55 need, and each
// RecordType other than a variant gets `"type": "object"`, which the RuntimeCheck now takes from the `schema` itself.
{
  const { base, parts } = fromBase("proposal:s-gb8s9657a65hqmv-g6");
  const first = at(parts, "each field becomes a property whose schema is the one given for the field's neutral type");
  parts.splice(first, 0, L2(
    "the schema holds `\"type\": \"object\"`, unless the RecordType is a RecordType variant (§s-z3dnru6qqdf9m6j);",
    "схема содержит `\"type\": \"object\"`, если RecordType не является вариантом RecordType (§s-z3dnru6qqdf9m6j);",
    "Новое: прежний выпуск генерировал для RecordType `\"type\": \"object\"` (types.ts), а теперь RuntimeCheck — это сама `schema` (узел «The type that the schema of a field gives»), поэтому без этого слова RuntimeCheck пропускал бы данные, которые вовсе не объект. Схема варианта применяется внутри определения его RecordType, где это уже проверено."));
  const unknown = at(parts, "`unknown: \"refused\"` becomes `additionalProperties: false`");
  parts[unknown] = L2(
    "`unknown: \"refused\"` becomes `unevaluatedProperties: false`, and a RecordType variant loses its `unknown`;",
    "`unknown: \"refused\"` становится `unevaluatedProperties: false`, а вариант RecordType теряет свой `unknown`;",
    "Было: «`unknown: \"refused\"` becomes `additionalProperties: false`;». `additionalProperties` видит только свойства своей схемы, поэтому отвергал бы поля варианта RecordType, которые добавляет к записи пара `if` и `then` (узел «A RecordType its variants refine»), а `unevaluatedProperties` их видит. Так и было на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19: «unknown: refused → unevaluatedProperties: false», и вариант этого слова не пишет — поля, которых никто не объявлял, отвергает его RecordType.");
  const refs = base.proposal.refs.map((r) => ({ ...r }));
  refs.push(R("cites", "s-z3dnru6qqdf9m6j"));
  add("proposal:s-gb8s9657a65hqmv-g7", {
    question: "None: carries out the mapping of `unknown` that the owner accepted with the page on RecordType and JSON Schema on 2026-11-19, which the pairs of `if` and `then` of item 55 need",
    base: "proposal:s-gb8s9657a65hqmv-g6",
    location: base.location,
    sidValue: sidOf("proposal:s-gb8s9657a65hqmv-g6"),
    change: "`unknown: \"refused\"` становится `unevaluatedProperties: false`, а не `additionalProperties: false`, и у варианта RecordType `unknown` убирается. Почему: поля варианта добавляет к записи данных пара `if` и `then` в определении его RecordType (узел «A RecordType its variants refine»); `additionalProperties: false` эти поля не видит и отверг бы каждую запись варианта, а `unevaluatedProperties: false` их видит. Так было и на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19. Добавлено: схема RecordType, который не является вариантом, содержит `\"type\": \"object\"`, потому что RuntimeCheck теперь — сама `schema`, а прежний выпуск это слово генерировал. Остальная формулировка — как вы согласовали.",
    proposal: proposalOf(base, parts, { refs }),
    stage3: "reindex.ts, where it rewrites a RecordType's fields and unknown as its schema, is to write \"type\": \"object\" first for a RecordType without answersTo, unevaluatedProperties: false for unknown: \"refused\", and nothing for the unknown of a RecordType variant. Tests for a RecordType with variants whose rewritten schema Ajv 2020 accepts for each variant's data record are written first.",
  });
}

// 5. "Generated copies checked against their nodes" (s-dbk2vyeg8z5jxna): the entry of the bindings file that `sheriff
// types` writes for a file of RuntimeChecks (item 53) is generated from the nodes too, so row 10.1.39a covers it.
{
  const { base, parts } = fromBase("s-dbk2vyeg8z5jxna");
  const i = at(parts, "`sheriff binding` refuses each file that `sheriff types` generates");
  parts.splice(i + 1, 0, P(
    "`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-pvzms7d8kxb8dk2), or holds another value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.",
    "`sheriff binding` отвергает и файл привязок (§s-trwczfskj5zmuft), если в нём нет записи, которую `sheriff types` пишет для файла RuntimeChecks (§s-pvzms7d8kxb8dk2), или если под путём этого файла в нём другое значение. Отказ называет файл RuntimeChecks и говорит, что запуск `sheriff types` пишет его запись.",
    "Новое: узел «Where the types and RuntimeChecks generated from the RecordTypes are written» теперь велит `sheriff types` вести в файле привязок запись для каждого файла RuntimeChecks, потому что файл JSON не может содержать SpecTag. Эта запись тоже порождается из узлов, и без этого абзаца её правка вручную прошла бы."));
  const generator = at(parts, "While the rule that lists one of the project's own generators");
  parts[generator] = {
    ...parts[generator],
    en: parts[generator].en.replace("A file that only one of the two commits holds also counts as different.", "A file that only one of these commits holds is also treated as different."),
    change: "Только английский: «A file that only one of the two commits holds also counts as different» стало «A file that only one of these commits holds is also treated as different», потому что «counts» вы оставляете для счёта. Русский текст и смысл не меняются.",
  };
  if (!parts[generator].en.includes("is also treated as different")) throw new Error("the sentence on a file that only one commit holds was not found");
  const refs = base.proposal.refs.map((r) => ({ ...r }));
  refs.push(R("cites", "s-trwczfskj5zmuft"));
  add("proposal:s-dbk2vyeg8z5jxna-g7", {
    question: "None: the entry of the bindings file that `sheriff types` now writes (item 53) is generated from the nodes, so the node of row 10.1.39a also compares it",
    base: "s-dbk2vyeg8z5jxna",
    location: base.location,
    sidValue: sidOf("s-dbk2vyeg8z5jxna"),
    change: "Добавлен абзац: `sheriff binding` отвергает файл привязок, если в нём нет записи, которую `sheriff types` пишет для файла RuntimeChecks, или если под путём этого файла другое значение. Почему: узел «Where the types and RuntimeChecks generated from the RecordTypes are written» теперь велит `sheriff types` вести такую запись (файл JSON не может содержать SpecTag), а строка 10.1.39a требует, чтобы всё сгенерированное совпадало с тем, что дают одобренные формулировки. Остальная формулировка — как вы согласовали.",
    proposal: proposalOf(base, parts, { refs }),
    stage3: "binding.ts generatedCopies is also to compare, for each .json file in the list of the files of the types and RuntimeChecks, its entry in sheriff.bindings.json with what sheriff types writes, and to refuse a missing or different entry, naming the file of RuntimeChecks. A test is written first and carries this sid.",
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

// The nodes a link may point to: the new form, the appendix of the tools, the sids the drafts give.
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const toolsNodes = new Map();
const collect = (data, into) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") {
      targets.add(n.sid);
      if (into) into.set(n.sid, n);
    }
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools, toolsNodes);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const e of Object.values(entries)) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (sidOf(e.base) !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}

// The new sids: of the right form and held by nothing in specs/, moved/ or the drafts before this script.
{
  const texts = [backupText];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.jsonl?$/.test(f.name)) texts.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(root, "specs"));
  walk(path.join(root, ".ai_docs/t25-pass/moved"));
  const all = texts.join("\n");
  for (const sid of Object.values(SID)) {
    if (!/^s-[2-9a-hjkmnp-z]{15}$/.test(sid)) problems.push(`the new sid ${sid} is not of the form of a sid`);
    if (all.includes(sid)) problems.push(`the new sid ${sid} is already held`);
  }
  if (new Set(Object.values(SID)).size !== Object.values(SID).length) problems.push("two new nodes share a sid");
}

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  if (p.titleChange === undefined) delete p.titleChange;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  // A `cites` link that a decision of the node still cites stays (the brief, "Citations"). A proposal keeps the links
  // that its agreed base keeps for the decisions, which are the base's `cites` links that the base's wording does not
  // cite; the decisions of a node that an agreed draft split were settled when that draft was agreed.
  let citedByDecisions;
  if (key.startsWith("proposal:")) {
    const bp = drafts[e.base].proposal;
    const baseEn = [bp.title, render(bp.parts, "en"), bp.reason, ...(bp.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
    const baseCited = new Set(citedIn(baseEn));
    citedByDecisions = new Set(bp.refs.filter((r) => r.type === "cites" && !baseCited.has(r.to)).map((r) => r.to));
  } else {
    citedByDecisions = new Set(citedIn(JSON.stringify(toolsNodes.get(e.sidValue)?.meta?.decisions ?? [])));
  }
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to) && !citedByDecisions.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  for (const s of citedByDecisions) if (!linked.has(s)) problems.push(`${key}: a decision cites ${s}, and the draft drops the link`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
  // A part that keeps its agreed wording is checked when the owner agreed to it, not here.
  for (const x of p.parts) if (x.change !== AS_AGREED && ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (!key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}
// The phrases the agreed drafts avoid. The proposal on the migration names `declaredIn` as the name an earlier release
// wrote, and item 56 names the neutral types that an earlier release wrote, `one of` and `identifier of` among them.
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/];
  if (key !== "proposal:s-gb8s9657a65hqmv-g7") bad.push(/\bdeclaredIn\b/);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/Appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  for (const b of bad) if (b.test(plain)) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  if (/[Рр]аунд|рецензент|review-g|\bround\b|групп[аыеу] [1-7]/.test(changes)) problems.push(`${key}: a change field tells the history of the rounds or names a group`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  if (before[key]?.agreed) {
    console.error(`${key} is an agreed draft, which this script must not change`);
    process.exit(1);
  }
  drafts[key] = e;
}
// No key outside the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group7.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 7: the English of every node",
  "",
  "This file holds the final English of every node of group 7 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group7.mjs: the drafts of items 51 to 56 of the appendix of the tools, which describe how a node is written in Markdown, the human-readable export, printing one node, the map, the diagram of the domains, and what `sheriff types` generates from the RecordTypes. It also holds the five proposals of the group, each a complete new wording of an agreed draft that the group's subject brings to light.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group7.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("new:")) md.push(`A new node, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed draft \`${e.base}\`, the node ${e.sidValue}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
  for (const t of p.todos || []) md.push(`**Todo (${t.date}):** ${t.text}`, "");
}
fs.writeFileSync(new URL("english-group7.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
