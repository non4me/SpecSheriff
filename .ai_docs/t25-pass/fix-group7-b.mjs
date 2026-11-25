// T25, stage 2, group 7, round b: applies the first review (review-g7-a.md to review-g7-d.md) and the findings of
// EngStickler's readers (english-g7-fast.md, english-g7-thorough.md), with the main session's decisions in
// fix-brief-group7-b.md. It splits item 53, adding the node on the entry of the bindings file, and adds three proposals
// on agreed drafts. On its first run it copies tools-drafts.json to tools-drafts.before-group7-b.json; on every run it
// rebuilds the keys of the group from that copy, checks every draft as propose-group7.mjs does, and writes
// tools-drafts.json and english-group7b.md. It touches no other file.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group7-b.json", here);
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
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const NEW = "Новое.";
const AS_AGREED = "Как в согласованной формулировке.";

const SID = { bindingsEntry: "s-h5rfyy9j8nnhx62" };
const ROUND_A = [
  "s-k4nqjr96ux7a5m7", "new:tools-5-export", "new:tools-5-show", "s-rpv4fkdqqguptqd", "new:tools-4-diagram", "s-pvzms7d8kxb8dk2",
  "s-suv42g8r3ra2h6b", "s-nk8td3ez58gahc4", "s-4npdup7mjkva69y", "proposal:s-f5rz6b7dhxejjts-g7", "proposal:s-3anv9qcmx8pwp2w-g7",
  "proposal:s-ezq8csd433vj6fj-g7", "proposal:s-gb8s9657a65hqmv-g7", "proposal:s-dbk2vyeg8z5jxna-g7",
];
const entries = {};
for (const key of ROUND_A) {
  if (!drafts[key]) throw new Error(`${key}: no draft of round a in the copy`);
  entries[key] = structuredClone(drafts[key]);
}
const changed = new Set();
const parts = (key) => entries[key].proposal.parts;
const at = (key, start) => {
  const i = parts(key).findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`${key}: no part starts with: ${start}`);
  return i;
};
const rep = (key, start, ...replacement) => {
  parts(key).splice(at(key, start), 1, ...replacement);
  changed.add(key);
};
const ins = (key, afterStart, ...added) => {
  parts(key).splice(at(key, afterStart) + 1, 0, ...added);
  changed.add(key);
};
const del = (key, start) => {
  parts(key).splice(at(key, start), 1);
  changed.add(key);
};
const set = (key, fields) => {
  Object.assign(entries[key].proposal, fields);
  changed.add(key);
};
const refsAdd = (key, ...refs) => {
  for (const r of refs) if (!entries[key].proposal.refs.some((x) => x.to === r.to)) entries[key].proposal.refs.push(r);
  changed.add(key);
};
const refsDrop = (key, ...tos) => {
  entries[key].proposal.refs = entries[key].proposal.refs.filter((r) => !tos.includes(r.to));
  changed.add(key);
};

// ---------------------------------------------------------------------------------------------------------------
// Item 51: how a node is written in Markdown (review g7-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-k4nqjr96ux7a5m7";
  rep(k, "the node's text, and then its reason;",
    L("the node's text, and then its reason, which opens with `*Why:*`;",
      "текст узла, а затем его обоснование, которое начинается с `*Why:*`;",
      "Новое в тексте: так код отделяет обоснование от текста (show.ts), и узел говорит об этом, чтобы читатель экспорта мог отличить одно от другого."));
  rep(k, "each other value that the node's file holds for it",
    L("any other value that the node's file holds for it, except its links and the nodes under it, under the value's key: a value that is text is written as it is, and any other value is written as JSON;",
      "любое другое значение, которое файл узла хранит для него, кроме его связей и узлов под ним, — под ключом этого значения: текстовое значение записывается как есть, а любое другое — в виде JSON;",
      "Было: «Each of them writes as JSON, under the value's key, a value that is not text, other than the node's links and children.» Без изменений по смыслу. «Узлы под ним» — это и дочерние узлы, и узлы в ячейках `TableRule`."));
  ins(k, "the node's links, each with its type",
    P("`sheriff guide` leaves out each node's metadata (§s-jk8v3srrved7ram).",
      "`sheriff guide` опускает метаданные каждого узла (§s-jk8v3srrved7ram).",
      "Было: «`sheriff guide` writes each node of the guidelines as the export does, except its metadata.» Без изменений по смыслу; согласованный узел о `sheriff guide` говорит это сам, и этот узел на него ссылается."));
  rep(k, "The first column of the table of a `TextRule.list`",
    P("The first column of the table of a `TextRule.list` is for the property that `TextRule.list.property` names. Its other columns follow in the order in which their properties first appear. The table has a row for each member, and a member that is not an object is written in the first column alone.",
      "Первый столбец таблицы `TextRule.list` отведён свойству, которое называет `TextRule.list.property`. Остальные её столбцы идут в том порядке, в каком их свойства впервые встречаются. В таблице по строке на каждый элемент, а элемент, который не является объектом, записывается только в первом столбце.",
      "Было: «The table has a column for each property a member holds, the one the list names first and the others in the order they first appear. It has a row for each member, a primitive member in the first column alone.» Без изменений по смыслу; названо свойство списка, которое задаёт первый столбец, как его читает код (show.ts)."));
  ins(k, "The list of the values gathered beside a field is headed",
    P("A node in a cell of a `TableRule`, which has no title, is named in a link and in the list of gathered values by its sid and location alone.",
      "Узел в ячейке `TableRule`, у которого нет названия, в связи и в списке собранных значений назван только своим sid и расположением.",
      "Новое: у узла в ячейке `TableRule` названия нет (правило 8.6), а правило 13.1 называет узел на другом конце связи по sid, расположению и названию. Это вопрос к вам на странице группы; узел следует рекомендованному ответу."));
  rep(k, "A table of a `TableRule` has a column",
    P("A table of a `TableRule` has a column for each column of the `TableRule`, under that column's heading, and a row for each row of the group. A cell of the `TableRule` that holds text is written as that text. A cell that holds a node is written as the node's location and its text.",
      "Таблица `TableRule` имеет по столбцу на каждый столбец `TableRule`, под его заголовком, и по строке на каждую строку группы. Ячейка `TableRule` с текстом записывается этим текстом. Ячейка с узлом записывается расположением этого узла и его текстом.",
      "Новое: ячейка с узлом показывает и текст узла, чтобы таблицу можно было прочитать как таблицу; весь узел записывается после неё."));
  rep(k, "In a cell of these tables, a list or an object",
    P("In a cell of these tables:",
      "В ячейке этих таблиц:",
      "Было: «A cell holding a list or an object holds it as JSON on one line, a `|` escaped.» Без изменений по смыслу."),
    L("a list or an object is written as JSON on one line;",
      "список или объект записывается в виде JSON в одну строку;",
      AS_AGREED.replace("Как в согласованной формулировке.", "Без изменений по смыслу.")),
    L("each line break is written as `<br>`;",
      "каждый перенос строки записывается как `<br>`;",
      "Новое: текст ячейки `TableRule` может занимать несколько строк, а строка таблицы Markdown — только одну."),
    L("each `|` is written as `\\|`.",
      "каждый `|` записывается как `\\|`.",
      "Было: «a `|` escaped». Без изменений по смыслу; сказано, как именно."));
  rep(k, "A node in a cell of a `TableRule` is also written with the following",
    P("A node in a cell of a `TableRule` is also written with the following, before its text, since these are part of its wording (§s-5ah25f6gy99panq):",
      "Узел в ячейке `TableRule` записывается, перед своим текстом, ещё и со следующим, потому что это входит в его формулировку (§s-5ah25f6gy99panq):",
      "Новое: по правилу 1.3.5 формулировка узла в ячейке включает текстовые ячейки его строки и заголовки его столбца и группы (ваше решение от 2026-11-14), поэтому его читатель видит их вместе с ним."));
  rep(k, "Where a command writes the nodes under a node",
    P("Where a command writes the nodes under a node, it writes them after that node. It writes them in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w), so the nodes in the cells of a `TableRule` come after its children. Each of those nodes has a heading one level deeper than that of the node above it, capped at the sixth level, the deepest that Markdown has. A top-level node of a file, and the node that `sheriff show` prints, have a first-level heading.",
      "Если команда записывает узлы под узлом, она записывает их после этого узла. Она записывает их в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w), поэтому узлы в ячейках `TableRule` идут после её дочерних узлов. У каждого из этих узлов заголовок на уровень глубже, чем у узла над ним, но не глубже шестого уровня — самого глубокого, какой есть в Markdown. У узла верхнего уровня файла и у узла, который печатает `sheriff show`, заголовок первого уровня.",
      "Было: «The export and the guide write a node's children after it, each under a heading one level deeper than its parent's. `sheriff show` writes the node alone.» Какие команды пишут узлы под узлом, говорят их собственные узлы. Новое: узлы в ячейках `TableRule` идут после дочерних узлов, в том порядке, в каком их нумерует вычисление расположений; в Markdown шесть уровней заголовков, поэтому заголовок не опускается глубже шестого уровня, — так делает код (show.ts)."));
  set(k, {
    reason: "Every command that writes a node for a reader writes it in the same form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node, and where each of its links leads, without opening the file (§s-ce24ynwabt5yx8h).",
    ruReason: "Каждая команда, которая записывает узел для читателя, записывает его в одном и том же виде, поэтому читатель, знакомый с этим видом по одной команде, может читать вывод любой другой. В этом виде читатель видит всё, что файл узла хранит для этого узла, и то, куда ведёт каждая его связь, не открывая файла (§s-ce24ynwabt5yx8h).",
    examples: [
      X("The main table of checks (§s-jau82aq9juv9zzh) is a `TableRule` whose column “What is checked” holds a node in each row and whose column “On failure” holds text. `sheriff show` prints the node of one of its rows under the node's location. With it, `sheriff show` prints the heading “What is checked” of the node's column, the heading of its group, such as “The specification alone”, and the text of its row's cell under “On failure”, such as “refused”. The most likely mistake is to print the node without the text of its row, so its reader does not see what a failure of the check costs.",
        "Основная таблица проверок (§s-jau82aq9juv9zzh) — это `TableRule`, в столбце «What is checked» которой в каждой строке находится узел, а в столбце «On failure» — текст. `sheriff show` печатает узел одной из её строк под расположением этого узла. Вместе с ним `sheriff show` печатает заголовок «What is checked» столбца этого узла, заголовок его группы, например «The specification alone», и текст ячейки его строки под «On failure», например «refused». Самая вероятная ошибка — напечатать узел без текста его строки: тогда его читатель не видит, чего стоит неудача проверки."),
    ],
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Item 51: writing the human-readable export (review g7-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-5-export";
  rep(k, "`sheriff markdown` writes the human-readable export",
    P("`sheriff markdown` writes the human-readable export (§s-ce24ynwabt5yx8h) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run. The refusal names the Views extension.",
      "`sheriff markdown` записывает читаемый экспорт (§s-ce24ynwabt5yx8h), только если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). В любом другом проекте он отказывается работать. Отказ называет расширение Views.",
      "Новое: согласованный узел «Where the files are» даёт путь `md-version/` только проекту, который выбрал расширение Views, а по правилу 1.7.1 проект пользуется расширением, только если выбрал его. Что делает команда в другом проекте — отказывается работать или ничего не пишет и сообщает об этом, — вопрос к вам на странице группы; узел следует рекомендованному ответу."));
  rep(k, "`sheriff markdown` first removes everything",
    P("`sheriff markdown` writes the export into `md-version/` (§s-zefk589ykh37b8u) as follows:",
      "`sheriff markdown` записывает экспорт в `md-version/` (§s-zefk589ykh37b8u) так:",
      "Новое в тексте: так делает код (generated.ts). Согласованный узел «Where the files are» говорит, что git игнорирует `md-version/`; этот абзац говорит, как этого добивается команда."),
    L("it first removes everything in that folder;",
      "сначала удаляет всё, что есть в этой папке;",
      NEW),
    L("it then writes two kinds of file there: a `.gitignore` file that holds `*`, and the Markdown files.",
      "затем записывает туда файлы двух видов: файл `.gitignore` с содержимым `*` и файлы Markdown.",
      NEW),
    P("That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say.",
      "Этот файл `.gitignore` заставляет git игнорировать содержимое папки, что бы ни говорили собственные файлы игнорирования репозитория.",
      NEW));
  rep(k, "`sheriff markdown` writes one Markdown file for each file",
    P("`sheriff markdown` writes one Markdown file for each file of the specification whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx). These include the files of the SpecSheriff guidelines, of the chosen extensions and of the appendix of the tools (§s-a4rbry4hsu34hy8) that the project takes from the plugin (§s-bsya3febm6u64ab).",
      "`sheriff markdown` записывает по одному файлу Markdown на каждый файл спецификации, узлы которого содержит модель спецификации (§s-w6gybeqn2ttydqx). Среди них и файлы SpecSheriff guidelines, выбранных расширений и описания инструментов (§s-a4rbry4hsu34hy8), которые проект берёт из плагина (§s-bsya3febm6u64ab).",
      "Было: «`sheriff export` … write[s] a node with every value its file holds for it.» Команда `sheriff export` теперь называется `sheriff markdown` (ваше решение от 2026-11-21). Утверждение прежнего узла о том, что экспорт пишет по файлу на каждый файл спецификации, перенесено сюда, как требует согласование списка команд. Какие это файлы, задаёт согласованный узел о модели спецификации: код уже берёт так SpecSheriff guidelines и описание инструментов из плагина (spec-files.ts), а выбранные расширения добавлены по правилу 2.5."));
  rep(k, "The path of each Markdown file",
    P("The path of each Markdown file is the path of its source file below `specs/`, placed below `md-version/`, with `.md` in place of `.json`. For a file that the project takes from the plugin, its path below `specs/` is the one at which the repository where the SpecSheriff guidelines are written keeps that file (§s-zefk589ykh37b8u).",
      "Путь каждого файла Markdown — это путь его исходного файла внутри `specs/`, перенесённый внутрь `md-version/`, с `.md` вместо `.json`. Для файла, который проект берёт из плагина, его путь внутри `specs/` — тот, по которому этот файл хранит репозиторий, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).",
      "Новое в тексте: так делает код (generated.ts)."));
  rep(k, "Each Markdown file holds the top-level nodes",
    P("Each Markdown file holds the top-level nodes of its source file, in the order in which the file holds them. Each of them is written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), followed by all the nodes under it.",
      "Каждый файл Markdown содержит узлы верхнего уровня своего исходного файла, в том порядке, в каком их хранит этот файл. Каждый из них записан так, как узел записывается в Markdown (§s-k4nqjr96ux7a5m7), и за ним идут все узлы под ним.",
      "Было: «The export and the guide write a node's children after it, each under a heading one level deeper than its parent's.» Без изменений по смыслу; как пишутся узлы под узлом, говорит узел о записи узла в Markdown. Так выполняется требование правила 13.1 сохранять порядок и вложенность узлов."));
  set(k, {
    reason: "A person reads in the export the whole specification of the project, including the guidelines that the project takes from the plugin. The export is written anew from the nodes at every run and kept out of git, so it never becomes a second copy of the specification that a commit could change (§s-kh8qcd5kxgh9z3j).",
    ruReason: "В экспорте человек читает всю спецификацию проекта, включая guidelines, которые проект берёт из плагина. Экспорт пишется заново из узлов при каждом запуске и не попадает в git, поэтому никогда не становится второй копией спецификации, которую мог бы изменить коммит (§s-kh8qcd5kxgh9z3j).",
    examples: [
      X("A project that has chosen the Views and Domains extensions keeps `specs/_guidelines/project.json`, `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines, the files of those extensions and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/_guidelines/project.md`, `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md`, `md-version/_guidelines/extensions/domains.md`, `md-version/_guidelines/extensions/views.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export.",
        "Проект, который выбрал расширения Views и Domains, хранит `specs/_guidelines/project.json`, `specs/contracts/terms.json` и `specs/requests/intake.json`, а SpecSheriff guidelines, файлы этих расширений и описание инструментов берёт из плагина. `sheriff markdown` записывает `md-version/_guidelines/project.md`, `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md`, `md-version/_guidelines/extensions/domains.md`, `md-version/_guidelines/extensions/views.md` и `md-version/_guidelines/tools.md`. Самая вероятная ошибка — записать только файлы, которые хранит репозиторий: тогда guidelines, которым следует проект, в экспорт не попадают."),
    ],
  });
  refsDrop(k, "s-mbmnsnxenmavu3z");
  refsAdd(k, R("cites", "s-a4rbry4hsu34hy8"));
}

// ---------------------------------------------------------------------------------------------------------------
// Item 51: printing one node (review g7-a; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-5-show";
  rep(k, "`sheriff show` prints to its standard output the node whose sid",
    P("`sheriff show` prints to its standard output one node, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), without the nodes under it. The command's argument is that node's sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx).",
      "`sheriff show` печатает в свой стандартный вывод один узел так, как узел записывается в Markdown (§s-k4nqjr96ux7a5m7), без узлов под ним. Аргумент команды — sid (§s-9spq78kdwsxr759) или расположение (§s-kag2m9tzdnduxdx) этого узла.",
      "Было: «`sheriff show` writes the node alone.» и, в продолжении, «`sheriff show` finds a node by its sid or its location». Утверждение перенесено из прежнего узла, как требует согласование списка команд; как записывается узел, говорит узел о записи узла в Markdown."));
  set(k, {
    reason: "A node is read on its own (§s-x4zcbk5ekebd9ua). `sheriff show` gives a person or an agent everything that a node's file holds for that node, and where each of its links leads, so that they need not open the files of the specification.",
    ruReason: "Узел читают сам по себе (§s-x4zcbk5ekebd9ua). `sheriff show` даёт человеку или агенту всё, что файл узла хранит для этого узла, и то, куда ведёт каждая его связь, чтобы им не нужно было открывать файлы спецификации.",
    examples: [
      X("`sheriff show _guidelines/spec/8.5` prints the rule that is at that location in the same form as `sheriff show` does when it is given that rule's sid. The most likely mistake is to look the argument up among the sids alone, so a location is refused.",
        "`sheriff show _guidelines/spec/8.5` печатает правило, которое находится по этому расположению, в том же виде, что и `sheriff show`, которому дан sid этого правила. Самая вероятная ошибка — искать аргумент только среди sid: тогда расположение отвергается."),
    ],
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Item 52: building the map (review g7-b; the main session's decision 1; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-rpv4fkdqqguptqd";
  rep(k, "`sheriff map` writes the map of the specification",
    P("`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run. The refusal names the Views extension.",
      "`sheriff map` записывает карту спецификации (§s-zu8ne3wq84zchc4), только если проект выбрал расширение Views (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). В любом другом проекте он отказывается работать. Отказ называет расширение Views.",
      "Было: «`sheriff render` reads the nodes and writes into `specs/_viewer/` a web page that draws the map from them.» Команда `sheriff render` теперь называется `sheriff map` (ваше решение от 2026-11-21). Новое: согласованный узел «Where the files are» даёт путь `specs/_viewer/` только проекту, который выбрал расширение Views, а по правилу 1.7.1 проект пользуется расширением, только если выбрал его. Что делает команда в другом проекте — вопрос к вам на странице группы; узел следует рекомендованному ответу."));
  rep(k, "`sheriff map` first removes everything",
    P("`sheriff map` writes the map into `specs/_viewer/` (§s-zefk589ykh37b8u) as follows:",
      "`sheriff map` записывает карту в `specs/_viewer/` (§s-zefk589ykh37b8u) так:",
      "Было: «…writes into `specs/_viewer/` a web page that draws the map from them.» Без изменений по смыслу; названы шаги и файлы, которые пишет команда, — так делает код (generated.ts)."),
    L("it first removes everything in that folder;",
      "сначала удаляет всё, что есть в этой папке;",
      NEW),
    L("it then writes two files there: the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`.",
      "затем записывает туда два файла: веб-страницу `index.html`, которая рисует карту, и файл `.gitignore` с содержимым `*`.",
      NEW),
    P("That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say.",
      "Этот файл `.gitignore` заставляет git игнорировать содержимое папки, что бы ни говорили собственные файлы игнорирования репозитория.",
      NEW));
  rep(k, "The web page draws the map with markmap",
    P("The web page draws the map with markmap, from an outline in Markdown that `sheriff map` builds from the nodes and writes only into the page itself. The page holds markmap and every library that markmap needs, each with its licence notice. The page loads nothing from the network.",
      "Веб-страница рисует карту с помощью markmap по структуре в Markdown, которую `sheriff map` строит из узлов и записывает только в саму страницу. Страница содержит markmap и все библиотеки, которые нужны markmap, каждую с её лицензионным уведомлением. Страница ничего не загружает из сети.",
      "Было: «The web page draws it with markmap, from an outline in markdown that the command builds and keeps nowhere. … The page carries markmap and every library it needs, each with its licence notice. It loads nothing from the network.» Без изменений по смыслу; «keeps nowhere» уточнено: структура записана в саму страницу (generated.ts). Убрано «Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is»: это говорит правило 10.14."));
  rep(k, "Each of the following top-level branches of the outline",
    P("The outline has the following top-level branches, in this order. None of them represents a node. Each holds the nodes of the files listed with it:",
      "У структуры есть следующие ветви верхнего уровня, в таком порядке. Ни одна из них не представляет узла. Каждая содержит узлы файлов, перечисленных при ней:",
      "Было: ветки для contracts и для уровней доменов. По правилу 13.2 ветки верхнего уровня карты — guidelines, описание инструментов, базовая спецификация и техническое приложение, в этом порядке, а остальное на карте — только узлы, поэтому веток для contracts и для уровней доменов больше нет."));
  rep(k, "`Guidelines`: the SpecSheriff guidelines",
    L("`Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);",
      "`Guidelines`: SpecSheriff guidelines, затем каждое расширение guidelines, узлы которого входят в модель спецификации (§s-w6gybeqn2ttydqx), в порядке кодовых точек имён расширений, а затем собственные guidelines проекта (§s-u7tw6m8npxmv5tu);",
      "Новое: так ветвь guidelines показывает все guidelines, которым следует проект, в том порядке, в каком их печатает `sheriff guide`. Какие расширения в неё входят, задаёт согласованный узел о модели спецификации: в проекте — выбранные расширения, а в репозитории, где пишутся SpecSheriff guidelines, — все, которые он хранит."));
  rep(k, "`Base specification`: the files of the base specification",
    L("`Base specification`: the files of the contracts section (§s-z6tq6a3btnvvwx7) first, and then those of the other folders of the base specification (§s-5x737t9nee4zgaa);",
      "`Base specification`: сначала файлы раздела контрактов (§s-z6tq6a3btnvvwx7), а затем файлы остальных папок базовой спецификации (§s-5x737t9nee4zgaa);",
      "Новое: контракты и домены — папки базовой спецификации. Контракты идут первыми, как и на прежней карте."));
  rep(k, "The files of one folder of the base specification, and the files of the technical appendix",
    P("Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch `Base specification` takes the domains row by row, from the top row of the diagram of the domains to its row `No level`. It takes the domains of each row in the order in which the diagram places them (§s-jzm6qw992j3bnxt).",
      "Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), ветвь `Base specification` берёт домены линия за линией, от верхней линии схемы доменов до её линии `No level`. Домены каждой линии она берёт в том порядке, в каком их ставит схема (§s-jzm6qw992j3bnxt).",
      "Новое: 2026-11-14 вы согласились, что карта упорядочивает домены по тому же правилу, что и схема доменов."),
    P("The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w):",
      "Файлы одной папки базовой спецификации и файлы технического приложения берутся в порядке кодовых точек их путей. Каждый узел содержит узлы под ним так, в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w):",
      "Новое: по правилу 13.2 узлы на карте вложены так же, как в спецификации; ниже названа та вложенность, по которой вычисляются расположения узлов."));
  rep(k, "the first top-level node of a file of the guidelines",
    L("the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's other top-level nodes.",
      "первый узел верхнего уровня файла guidelines, описания инструментов или технического приложения содержит ещё и остальные узлы верхнего уровня этого файла.",
      "Новое: так же эти узлы нумерует вычисление расположений."));
  rep(k, "Each node is shown by its title.",
    P("Each node is labelled with its title. A node in a cell of a `TableRule`, which has no title, is labelled with its location (§s-kag2m9tzdnduxdx).",
      "Каждый узел подписан своим названием. Узел в ячейке `TableRule`, у которого названия нет, подписан своим расположением (§s-kag2m9tzdnduxdx).",
      "Новое: у узла в ячейке `TableRule` названия нет (правило 8.6), поэтому карта показывает его расположение; иначе такой узел был бы на карте пустой веткой. Это вопрос к вам на странице группы; узел следует рекомендованному ответу."));
  rep(k, "The outline writes each node's title or location",
    P("In the outline, `sheriff map` writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element with a border, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no border. Apart from that border, the branch of each node is drawn in the same way, whatever the node's approval status.",
      "В структуре `sheriff map` записывает название или расположение каждого узла в элементе, класс которого называет статус одобрения узла (§s-tgrnpagrb58tya7). Страница рисует этот элемент в рамке: пунктирной, если узел — черновик, и сплошной, если он одобрен. У ветви, которая не представляет узла, рамки нет. Помимо этой рамки, ветвь каждого узла рисуется одинаково, каков бы ни был статус одобрения узла.",
      "Было: «The outline writes each node's title in an element whose class names the node's status. … A branch that stands for no node, such as a level, has no frame. The branches are drawn alike, whatever the status of their nodes.» Без изменений по смыслу; убран пример ветки уровня, которой на карте больше нет, и сказано, какие ветви рисуются одинаково."));
  set(k, {
    reason: "A person opens the map wherever the repository is, often without network access. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with nothing stored between the nodes and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).",
    ruReason: "Человек открывает карту там, где находится репозиторий, часто без доступа к сети. На карте он с одного взгляда видит статус одобрения каждого узла, в каком бы размере карта ни была нарисована. Карта рисуется только из узлов, без того, что хранилось бы между узлами и страницей, поэтому она никогда не показывает структуру, которой у узлов уже нет (§s-kh8qcd5kxgh9z3j).",
    examples: [
      X("A project that has chosen the Views and Domains extensions lists the levels `core` and `services`. The domain `requests` is at the level `core`, and the domains `accounts` and `billing` are at the level `services`, where `billing` uses `accounts`. The branch `Base specification` holds the top-level node of the contracts section first, and then the headers of `requests`, `accounts` and `billing`, in that order, each with the sections of its domain under it. A `TableRule` in a section of `requests` holds the nodes in its cells under it, each labelled with its location. The most likely mistake is to take the domains in the alphabetical order of their names, which puts `accounts` before `requests`, although `requests` is in a higher row of the diagram of the domains.",
        "Проект, который выбрал расширения Views и Domains, перечисляет уровни `core` и `services`. Домен `requests` находится на уровне `core`, а домены `accounts` и `billing` — на уровне `services`, причём `billing` пользуется `accounts`. Ветвь `Base specification` содержит сначала узел верхнего уровня раздела контрактов, а затем заголовки `requests`, `accounts` и `billing`, в этом порядке, каждый с разделами своего домена под ним. `TableRule` в разделе `requests` содержит под собой узлы своих ячеек, каждый подписан своим расположением. Самая вероятная ошибка — брать домены в алфавитном порядке имён: тогда `accounts` оказывается перед `requests`, хотя `requests` стоит в более высокой линии схемы доменов."),
    ],
  });
  refsAdd(k, R("cites", "s-z6tq6a3btnvvwx7"), R("cites", "s-jzm6qw992j3bnxt"));
  entries[k].proposal.removed = [
    "“Nothing is written by hand at any step: the map is regenerated from the nodes exactly as the readable export is”: rule 10.14 (s-kh8qcd5kxgh9z3j) states it, and the node now implements that rule.",
    "The branches for contracts, for each level of the domains and for the domains with no level listed: rule 13.2 (s-zu8ne3wq84zchc4) fixes the top-level branches and shows only nodes under them. The levels are shown by the diagram of the domains (s-jzm6qw992j3bnxt), whose order of the domains the map keeps.",
  ];
  entries[k].stage3 = "cli.ts: the command render becomes map (the owner's ruling of 2026-11-21) and refuses to run, naming the Views extension, where the project has not chosen it. generated.ts outline(): the branches Guidelines, Appendix of the tools, Base specification and Technical appendix, in that order; the extensions whose nodes the model holds under Guidelines; under Base specification, contracts first, then the domains row by row in the order of s-jzm6qw992j3bnxt (domainOrder, changed to order each row alone as that node says, and the rows of the levels from the top, the row “No level” last); the branches for contracts as such, for the levels and “No level listed” go; a domain's other top-level nodes under its header; the nodes in the cells of a TableRule under it, each labelled with its location in an element bordered by its status. The test of s-zu8ne3wq84zchc4 “the map reads guidelines, contracts, a branch per level…” is rewritten first for the new branches and the order of the rows; tests for a node in a cell and for the refusal without the Views extension are written first. The tests named in testsFrom keep this sid.";
}

// ---------------------------------------------------------------------------------------------------------------
// Item 52: drawing the diagram of the domains (review g7-b; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "new:tools-4-diagram";
  rep(k, "an arrow leads from each domain to each domain that it uses",
    L("an arrow leads from each domain to each domain that it uses, that is, to any other domain that has a section to which a `consumes` link in the using domain's header points;",
      "стрелка ведёт от каждого домена к каждому домену, которым он пользуется, то есть к любому другому домену, на раздел которого указывает связь `consumes` в заголовке домена, который им пользуется;",
      "Новое: по правилу 11.1.3 связи `consumes` заголовка называют разделы других доменов, которыми домен пользуется; так правило 11.2.2 показывает, как домены взаимосвязаны."));
  rep(k, "each level that the header of at least one domain contains",
    L("each level that the project's own guidelines list (§s-t9j29hppag2nren) and that the header of at least one domain contains has a row of its own, labelled with the level's number (§s-nkyty4dy9x2v2a4) and its name, such as `2 services`;",
      "у каждого уровня, который перечислен в собственных guidelines проекта (§s-t9j29hppag2nren) и есть в заголовке хотя бы одного домена, есть своя линия, подписанная номером уровня (§s-nkyty4dy9x2v2a4) и его именем, например `2 services`;",
      "Новое: уровень показан номером и именем вместе, как вы решили 2026-11-08, когда убрали эту подробность из базы в описание инструментов."));
  del(k, "the rows of the levels follow the order");
  rep(k, "below the rows of the levels, a row labelled `No level`",
    L("below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of those levels, where there is such a domain.",
      "ниже линий уровней линия, подписанная `No level`, содержит каждый домен, в заголовке которого нет ни одного из этих уровней, если такой домен есть.",
      "Новое: по правилу 11.2.2 домены без уровня стоят в отдельной линии ниже линий уровней. Уровень, которого нет в списке, отвергает проверка «The level in a domain's header», но схема строится и до неё, поэтому такой домен тоже стоит в этой линии."));
  rep(k, "To place a domain, the SpecSheriff tools first place",
    P("To place a domain, the SpecSheriff tools:",
      "Чтобы поставить домен, инструменты SpecSheriff:",
      "Новое: правило 11.2.3 оставляет описанию инструментов, как ставить домен, который пользуется несколькими доменами линии или которым пользуются несколько доменов линии. Здесь каждый домен стоит после доменов, которыми он пользуется."),
    L("first place, in the same way, each domain of its row that it uses and that they have not yet started to place;",
      "сначала тем же способом ставят каждый домен его линии, которым он пользуется и который они ещё не начали ставить;",
      NEW),
    L("then place the domain itself, right after the domains already placed in its row.",
      "затем ставят сам домен — сразу после доменов, уже поставленных в его линии.",
      NEW),
    P("They take the domains of each row in this order (§s-uw9n84edf7cbe9n):",
      "Домены каждой линии они берут в таком порядке (§s-uw9n84edf7cbe9n):",
      NEW));
  rep(k, "last, each domain not yet placed",
    L("last, each domain not yet placed, which remains only where domains of the row use one another in a cycle (§s-bncp7gtyaukur8e).",
      "последним — каждый ещё не поставленный домен; такой домен остаётся, только если домены линии пользуются друг другом по кругу (§s-bncp7gtyaukur8e).",
      "Новое: такой круг отвергает проверка строки 11.3.4, но схема строится и до неё, поэтому порядок задан и для этого случая."));
  rep(k, "This order takes into account only the domains of the same row",
    P("This order takes into account only the domains of the same row that a domain uses. Where the steps above leave a choice between several domains, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.",
      "Этот порядок учитывает только те домены той же линии, которыми домен пользуется. Где описанные шаги оставляют выбор между несколькими доменами, инструменты SpecSheriff берут их в алфавитном порядке имён. Имена они сравнивают символ за символом, по кодовым точкам символов.",
      "Новое: правило 11.2.3 упорядочивает только домены одной линии, а где остаётся выбор, его решает алфавитный порядок имён; здесь сказано, как именно сравниваются имена, чтобы порядок был одинаковым на любой машине."));
  set(k, {
    reason: "The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This node settles them, together with how the rows are labelled, so that the same headers give the same diagram on every machine.",
    ruReason: "Правило о порядке доменов в линии оставляет свои более сложные случаи описанию инструментов (§s-uw9n84edf7cbe9n). Этот узел решает их, а также то, как подписаны линии, так что из одних и тех же заголовков на любой машине получается одна и та же схема.",
    todos: [
      {
        date: DATE,
        text: "No command of the SpecSheriff tools draws this diagram yet. The command that draws it is to be added to the SpecSheriff tools and named in this node and in the list of the commands, in the release that introduces this node.",
      },
    ],
  });
  refsDrop(k, "s-4azsb49pj6sech8");
  entries[k].proposal.refs.unshift(R("implements", "s-4azsb49pj6sech8"));
}

// ---------------------------------------------------------------------------------------------------------------
// Item 53: where the types and RuntimeChecks are written, split (review g7-c; decision 4; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-pvzms7d8kxb8dk2";
  rep(k, "Where the project has chosen the RecordType extension",
    P("Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) only into the files that the technical appendix (§s-tj38pvm38nepaf5) lists for them.",
      "Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) записывает типы и RuntimeChecks (§s-e877bnfa559tvk9), которые он генерирует из RecordType (§s-7vm323mhry2enx3), только в файлы, которые для них перечисляет техническое приложение (§s-tj38pvm38nepaf5).",
      "Было: «`sheriff types` writes the types and RuntimeChecks it generates from the RecordTypes into the files the project's technical appendix lists for them. Where the technical appendix defines no such list, `sheriff types` writes nothing.» Без изменений по смыслу: «only» говорит то же, что второе предложение. Добавлено условие о расширении RecordType: RecordType есть только в проекте, который выбрал это расширение."));
  rep(k, "`sheriff types` reads that rule as the SpecSheriff tools read",
    P("`sheriff types` reads the list in that rule's last approved wording (§s-a8fn72xa782wvbk). A rule that has never been approved lists no file. `sheriff types` takes the rule's `implements` links from where the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification.",
      "`sheriff types` читает список в последней одобренной формулировке этого правила (§s-a8fn72xa782wvbk). Правило, которое ни разу не одобряли, не перечисляет ни одного файла. Связи `implements` этого правила `sheriff types` берёт там же, где инструменты SpecSheriff берут связи `refines` правила собственных guidelines проекта (§s-t9j29hppag2nren): из коммита, который добавил последнее одобрение правила, а пока такого коммита нет — из файлов спецификации.",
      "Новое: по правилу 10.15 код системы генерируется из одобренных формулировок, а то, куда он записывается, — часть того, что генерируется. Список и связи читаются так же, как согласованный узел «What the SpecSheriff tools read in the project's own guidelines» читает каждое правило `project.json`. Код сейчас читает список таким, каким его хранит файл (types.ts)."));
  rep(k, "The end of a listed file's name says what",
    P("The extension of a listed file's name determines what `sheriff types` writes into the file:",
      "Расширение имени файла из списка определяет, что `sheriff types` записывает в этот файл:",
      "Было: «A file's extension says what is written into it:». Без изменений по смыслу."));
  rep(k, "The check of generated copies refuses a list",
    P("The check of generated copies refuses a list that names a file with any other ending, and any other defect that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).",
      "Проверка порождённых копий отвергает список, в котором есть файл с любым другим окончанием имени, и любой другой изъян, из-за которого `sheriff types` не может ничего записать (§s-dbk2vyeg8z5jxna).",
      "Новое в тексте: отказы описывает согласованный узел «Generated copies checked against their nodes», а этот узел на него ссылается, чтобы читатель знал, что бывает с другим файлом."));
  rep(k, "The JSON Schema validator that the technical appendix names",
    P("The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion.",
      "Валидатор JSON Schema, который техническое приложение называет для RuntimeChecks (§s-e877bnfa559tvk9), считает `format` утверждением.",
      "Было: «Those RuntimeChecks are run by the JSON Schema validator the technical appendix names. That validator asserts `format` rather than taking it as a note.» Без изменений по смыслу."));
  del(k, "For each file of RuntimeChecks, `sheriff types` keeps an entry");
  del(k, "`sheriff types` writes that entry where the bindings file lacks it");
  set(k, {
    reason: "Where the generated code goes is a choice that concerns the whole system. The section of the technical appendix on the stack makes that choice, in a list that the SpecSheriff tools read (§s-vj7ercem526zd6v).",
    ruReason: "Куда записывается сгенерированный код — выбор, который касается всей системы. Его делает раздел технического приложения о стеке, списком, который читают инструменты SpecSheriff (§s-vj7ercem526zd6v).",
    reasonChange: "Было: три абзаца, которые объясняли текст по порядку, в том числе что инструменты так же читают уровни доменов. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2).",
    examples: [
      X("The rule in the section on the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.",
        "Правило в разделе о стеке перечисляет `src/generated/records.ts` и `src/generated/records.schema.json`. `sheriff types` записывает типы RecordType в первый файл, а их RuntimeChecks — во второй. Участник команды добавляет в список `worker/records.py`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff types` ничего не записывает в `worker/records.py`. Самая вероятная ошибка — брать список из формулировки-черновика."),
    ],
  });
  refsDrop(k, "s-ktfstpv8rurznrp", "s-trwczfskj5zmuft", "s-kgbzk2ph9e6jfb4", "s-5z5gnu7pahr82xp", "s-suv42g8r3ra2h6b");
  refsAdd(k, R("cites", "s-tj38pvm38nepaf5"));
  entries[k].proposal.removed = [
    "“`sheriff binding` reads a file of types as the system's code even where the glob patterns naming where that code lives do not reach it.”: the agreed “Project-wide settings” (new:tools-1-settings) states that the SpecSheriff tools read the files into which `sheriff types` writes the types to find their SpecTags.",
    "The reason's sentence on the levels of the domains, which the SpecSheriff tools read from a list in the project's own guidelines: the agreed s-t9j29hppag2nren states how that list is read.",
  ];
  entries[k].stage3 = "types.ts typeFiles: read the list in the last approved wording of the rule of the stack, with its implements links taken as s-t9j29hppag2nren takes the refines links of a rule of project.json, a rule never approved listing no file; run only where the RecordType extension is chosen. A test for a draft list is written first. The test “refuses a listed file of another extension, and two rules of the stack each listing files, and then writes nothing” carries s-dbk2vyeg8z5jxna, which states those refusals. The test at binding.test.ts:379 carries the sid that stage 3 gives to “Project-wide settings”, which states that the files of types are read for SpecTags. The tests named in testsFrom keep this sid.";
}

entries["new:tools-17-bindings-entry"] = {
  location: "tools 17a (new, after “Where the types and RuntimeChecks generated from the RecordTypes are written”)",
  from: "s-pvzms7d8kxb8dk2",
  sidValue: SID.bindingsEntry,
  testsFrom: ["match no test"],
  proposal: {
    title: "The entry of the bindings file for a file of RuntimeChecks",
    ruTitle: "Запись в файле привязок для файла RuntimeChecks",
    parts: [
      P("For each file of RuntimeChecks (§s-pvzms7d8kxb8dk2), `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType (§s-7vm323mhry2enx3) whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.",
        "Для каждого файла RuntimeChecks (§s-pvzms7d8kxb8dk2) `sheriff types` ведёт запись в файле привязок (§s-trwczfskj5zmuft), потому что файл JSON не может содержать собственного SpecTag (§s-kgbzk2ph9e6jfb4). Ключ записи — путь файла. Её значение перечисляет SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) каждого RecordType (§s-7vm323mhry2enx3), определение которого содержит файл (§s-suv42g8r3ra2h6b), в порядке определений.",
        "Новое: по правилу 12.3a код, сгенерированный из RecordType, в том числе его RuntimeChecks, привязан к нему SpecTag. Файл JSON не может содержать комментарий, поэтому по правилу 1.5.2 его SpecTag хранит запись в файле привязок, а пишет её тот, кто пишет этот код, — `sheriff types`."),
      P("`sheriff types` writes that entry where the bindings file lacks it or holds a different value for that path. It leaves any other entry as it is. When it writes the entry, it names the bindings file.",
        "`sheriff types` вносит эту запись, если в файле привязок её нет или под этим путём в нём другое значение. Остальные записи он оставляет как есть. Внеся запись, он называет файл привязок.",
        NEW),
      P("`sheriff types` writes a file of RuntimeChecks, and its entry, only where the file holds at least one definition.",
        "Файл RuntimeChecks и его запись `sheriff types` записывает, только если в файле есть хотя бы одно определение.",
        "Новое: пока ни один RecordType не одобрен, запись была бы пустым списком, который отвергает проверка SpecTag на коде системы."),
    ],
    reason: "Each file that `sheriff types` writes is bound to the RecordTypes that it comes from (§s-ktfstpv8rurznrp), so the RuntimeChecks can be found from each RecordType, as its types can.",
    ruReason: "Каждый файл, который записывает `sheriff types`, привязан к тем RecordType, из которых он получен (§s-ktfstpv8rurznrp), поэтому RuntimeChecks можно найти от каждого RecordType так же, как его типы.",
    reasonChange: NEW,
    examples: [
      X("The rule in the section on the stack lists `src/generated/records.schema.json`, which holds the definitions of the RecordTypes `user` and `request`, in that order. `sheriff types` keeps in the bindings file the entry for `src/generated/records.schema.json`, whose value lists the SpecTag of `user` and then that of `request`. The most likely mistake is to leave the file of RuntimeChecks without an entry, so it is bound to no RecordType.",
        "Правило в разделе о стеке перечисляет `src/generated/records.schema.json`, который содержит определения RecordType `user` и `request`, в этом порядке. `sheriff types` ведёт в файле привязок запись для `src/generated/records.schema.json`, значение которой перечисляет SpecTag `user`, а затем SpecTag `request`. Самая вероятная ошибка — оставить файл RuntimeChecks без записи: тогда он не привязан ни к одному RecordType."),
    ],
    refs: [
      R("implements", "s-ktfstpv8rurznrp"),
      R("cites", "s-pvzms7d8kxb8dk2"),
      R("cites", "s-trwczfskj5zmuft"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-suv42g8r3ra2h6b"),
    ],
    removed: [],
    date: DATE,
  },
  stage3: "types.ts writeTypes: for each .json file in the list, write into sheriff.bindings.json the entry whose value lists the SpecTag of each RecordType whose definition the file holds, in their order, leaving the other entries as they are, and name sheriff.bindings.json where it writes it; write neither a file of RuntimeChecks nor its entry where the file would hold no definition. Tests for the entry, for an entry left by hand among the others and for a file with no definition are written first and carry this sid.",
};
changed.add("new:tools-17-bindings-entry");

// ---------------------------------------------------------------------------------------------------------------
// Item 54: what is generated from a RecordType (review g7-c; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-suv42g8r3ra2h6b";
  rep(k, "From the last approved wording of each RecordType",
    P("From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w).",
      "Из последней одобренной формулировки каждого RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk) `sheriff types` записывает тип в каждый файл типов и определение в каждый файл RuntimeChecks (§s-pvzms7d8kxb8dk2). RecordType он берёт в порядке кодовых точек путей их файлов, а внутри файла — в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).",
      parts(k)[at(k, "From the last approved wording of each RecordType")].change));
  rep(k, "The name of a RecordType's type and of its definition",
    P("The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word changed to uppercase and the spaces removed.",
      "Имя типа RecordType и его определения — это название RecordType, в котором первая буква каждого слова сделана заглавной, а пробелы убраны.",
      "Было: «Every type and definition is named by the RecordType's name with the first letter of each word raised and the spaces dropped.» Без изменений по смыслу; имя RecordType — его название, как говорит схема расширения RecordType."));
  rep(k, "The fields of a type and of a definition are",
    P("The fields of a type and of a definition are, first, the fields of each RecordType that the type's RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools follow the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take no RecordType twice.",
      "Поля типа и определения — это сначала поля каждого RecordType, до которого RecordType этого типа доходит по связям `refines` (§s-sn6au3vcr9uy5pm). За ними идут его собственные поля, которые объявляет его `schema` (§s-6eb92ddch7shuvu). Связи `refines` RecordType инструменты SpecSheriff обходят в том порядке, в каком он их перечисляет. Для каждой связи они сначала берут RecordType, до которых так же доходит связанный RecordType, а затем сам связанный RecordType. Ни один RecordType они не берут дважды.",
      parts(k)[at(k, "The fields of a type and of a definition are")].change));
  rep(k, "Each field keeps its name and the place where it first appears.",
    P("Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field's schema in a definition is an `allOf` that holds their schemas in the order in which they are taken. In a type, the field has the type that the last of these schemas gives (§s-4npdup7mjkva69y). A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.",
      "Каждое поле сохраняет своё имя и место, где оно встречается впервые. Если поле с одним и тем же именем объявляют несколько из этих RecordType, схема поля в определении — это `allOf`, который содержит их схемы в том порядке, в каком они взяты. В типе у поля тот тип, который даёт последняя из этих схем (§s-4npdup7mjkva69y). Поле гарантированное (§s-adhmw4gw6y82f44), если его перечисляет `required` в `schema` любого из этих RecordType. В типе гарантированное поле обязательное, а любое другое — необязательное.",
      "Было: «Each field keeps its name and the order its node gives it. It is required where its node says so and optional otherwise.» Без изменений по смыслу; «required» в RecordType теперь называется «guaranteed» (ваше решение от 2026-11-15), а в схеме это `required`. Новое: поле, объявленное дважды, проверяется по схемам обоих RecordType, потому что по правилу 6.1 уточняющий узел оставляет в силе каждое требование уточняемого, а `allOf` в JSON Schema так и делает; тип в TypeScript и Python берёт последнюю схему, иначе тип содержал бы два свойства с одним именем, которые TypeScript не компилирует."));
  rep(k, "A definition is the RecordType's own `schema`",
    P("A definition is the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type given by a field's schema says (§s-4npdup7mjkva69y). Where a RecordType has RecordType variants (§s-z3dnru6qqdf9m6j), the node on such a RecordType (§s-nk8td3ez58gahc4) says what `sheriff types` generates for it and for each of its variants in place of, or in addition to, what this node says.",
      "Определение — это собственная `schema` RecordType, в которой `properties` содержит эти поля, а `required` перечисляет гарантированные. Схема каждого поля в нём меняется только так, как говорит узел о типе, который даёт схема поля (§s-4npdup7mjkva69y). Если у RecordType есть варианты RecordType (§s-z3dnru6qqdf9m6j), узел о таком RecordType (§s-nk8td3ez58gahc4) говорит, что `sheriff types` генерирует для него и для каждого его варианта вместо сказанного в этом узле или в дополнение к нему.",
      "Было: «A field of type `record` refers to the type of that RecordType by its name. … Where the RecordType refuses a field nobody declared, its definition refuses any property its fields do not declare.» Теперь определение — это сама `schema` RecordType (ваше решение от 2026-11-19 о JSON Schema), поэтому и то, отвергаются ли поля, которых никто не объявлял, говорит сама `schema`; тип поля описывает узел о типе, который даёт схема поля. «A variant's own fields stand instead where the rule on RecordType variants places them» стало ссылкой на узел о RecordType с вариантами, который говорит, что заменяется, а что добавляется."));
  rep(k, "`sheriff types` cannot generate the name of a type",
    P("`sheriff types` cannot generate the name of a type or of a definition in any of these cases (§s-dbk2vyeg8z5jxna):",
      "`sheriff types` не может сгенерировать имя типа или определения ни в одном из этих случаев (§s-dbk2vyeg8z5jxna):",
      "Было: «A name cannot be generated where:». Без изменений по смыслу; ссылка ведёт на согласованный узел «Generated copies checked against their nodes», который перечисляет отказы, из-за которых `sheriff types` ничего не записывает."));
  rep(k, "the name is that of the type that a `$ref` names",
    L("a `$ref` names a sid that no RecordType has, so the type that the `$ref` refers to has no name.",
      "`$ref` называет sid, которого нет ни у одного RecordType, поэтому у типа, на который указывает `$ref`, нет имени.",
      "Новое: такой ссылке не на что указывать; прежде код отвергал RecordType, поле которого ссылалось на несуществующий RecordType (types.ts)."));
  set(k, {
    title: "What is generated from a RecordType",
    ruTitle: "Что генерируется из RecordType",
    titleChange: "Было: «What a RecordType generates». Генерирует `sheriff types`, а не RecordType, поэтому название говорит, что генерируется из RecordType.",
    ruReason: "Типы и определения, сгенерированные одним и тем же способом, получаются одинаковыми при каждом запуске и на любой машине. На это опирается проверка порождённых копий (§s-dbk2vyeg8z5jxna). Названный по своему RecordType и привязанный к нему SpecTag, который пишет `sheriff types`, каждый тип ведёт читателя назад к RecordType, из которого он получен.",
    examples: [
      X("The fragment of a format `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the type that `user` gives it, and then `name`. The definition `User` checks `street` against the schemas of both RecordTypes. The most likely mistake is to write `street` twice in the type, once for each RecordType, which TypeScript refuses to compile.",
        "Фрагмент формата `address` объявляет поля `city` и `street`. RecordType `user` уточняет `address` и объявляет `name` и `street`, с более узкой схемой для `street`. Тип `User` содержит `city`, затем `street` с типом, который даёт ему `user`, а затем `name`. Определение `User` проверяет `street` по схемам обоих RecordType. Самая вероятная ошибка — записать `street` в тип дважды, по разу от каждого RecordType: такой тип TypeScript не компилирует."),
    ],
  });
  refsAdd(k, R("cites", "s-z3dnru6qqdf9m6j"));
  entries[k].stage3 = "types.ts declarations: read each RecordType's schema (properties and required) in its last approved wording; follow its refines links in the order listed, each linked RecordType after those it reaches, no RecordType twice; keep each field at its first place, its schema in the definition an allOf of every schema declared for its name, in the order taken, and its type in TypeScript and Python that of the last of them; required as the union of the required lists; write each definition as the RecordType's own schema with $anchor set to its sid and with properties and required replaced, and each file of RuntimeChecks with $schema and $defs; keep the doc comment in TypeScript and the comment line in Python; refuse, as a name that cannot be generated, the type that a $ref names where no RecordType has its sid. The field of type variant, unknown and the Python type of a variant's object go. Tests for refines through several links, for a field declared twice (its allOf, run with Ajv 2020) and for the $anchor are written first; the tests named in testsFrom keep this sid and are rewritten for the JSON Schema form.";
}

// ---------------------------------------------------------------------------------------------------------------
// Item 55: a RecordType that its variants refine (review g7-d; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-nk8td3ez58gahc4";
  rep(k, "A RecordType of which RecordType variants exist",
    P("For a RecordType that has RecordType variants (§s-z3dnru6qqdf9m6j), `sheriff types` writes a definition and a type that also describe the fields of each variant. Otherwise, it writes them as it writes those of any RecordType (§s-suv42g8r3ra2h6b). The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6), each in the approved wording from which `sheriff types` generates (§s-a8fn72xa782wvbk). `sheriff types` takes them in the order in which it takes the RecordTypes.",
      "Для RecordType, у которого есть варианты RecordType (§s-z3dnru6qqdf9m6j), `sheriff types` пишет определение и тип, которые описывают и поля каждого варианта. Во всём остальном он пишет их так же, как определение и тип любого RecordType (§s-suv42g8r3ra2h6b). Варианты такого RecordType — это те варианты RecordType, чей RecordType — он, как это определяет проверка вариантов RecordType (§s-c2r9jndrjbtbsv6), каждый в той одобренной формулировке, из которой генерирует `sheriff types` (§s-a8fn72xa782wvbk). `sheriff types` берёт их в том порядке, в каком берёт RecordType.",
      "Было: «A RecordType that variants refine is written as the union of its members. Its variants are RecordTypes each answering to values of its choosing fields.» Что такое вариант RecordType и чей он, теперь говорит согласованный узел «What a RecordType variant must agree with», а из какой формулировки генерировать, — согласованный узел о `sheriff types`; этот узел на них ссылается. Вариант, который ни разу не одобряли, в определение и тип не входит."));
  rep(k, "In a file of RuntimeChecks, the RecordType's definition also holds `allOf`",
    P("In a file of RuntimeChecks (§s-e877bnfa559tvk9), the RecordType's definition also holds a pair of `if` and `then` for each of its variants, at the end of its `allOf`:",
      "В файле RuntimeChecks (§s-e877bnfa559tvk9) определение RecordType содержит ещё и пару `if` и `then` для каждого из его вариантов — в конце своего `allOf`:",
      "Было: «The union is written: in JSON Schema, as a definition holding `oneOf` the members». Пары `if` и `then` вместо `oneOf` с членом для прочих значений — как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19: так json-schema.org показывает поля, которые зависят от значения другого поля. Пары идут в конец `allOf`, потому что схема расширения разрешает `allOf` и в самой `schema` RecordType."));
  rep(k, "`if` is `{",
    L("`if` is `{\"properties\": {<field>: {\"const\": <value>}, …}, \"required\": [<field>, …]}`, with each field and value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names;",
      "`if` — это `{\"properties\": {<field>: {\"const\": <value>}, …}, \"required\": [<field>, …]}` с каждым полем и значением, которые называет `answersTo` варианта (§s-c2r9jndrjbtbsv6);",
      NEW));
  rep(k, "for each variant, a type whose name is that of the variant's type",
    L("for each variant, the variant's type;",
      "для каждого варианта — тип этого варианта;",
      "Было: «each variant, referred to by the name of its type». Без изменений по смыслу."));
  rep(k, "where a combination of values of the fields that select a variant has no variant",
    L("where a combination of values of the fields that select a variant has no variant, a type for the combinations that have no variant, whose name is the name of the RecordType's type followed by `Other`.",
      "если у какого-то сочетания значений полей, выбирающих вариант, нет варианта, — тип для сочетаний, у которых нет варианта, имя которого — имя типа RecordType, за которым следует `Other`.",
      "Было: «where some combination of the choosing fields' values has no variant, a member for those combinations» и «The member for those combinations is named by the RecordType's name followed by `Other`.» Без изменений по смыслу."));
  rep(k, "A combination of values holds one value of each field",
    P("The type of a variant is written as the type of any RecordType (§s-suv42g8r3ra2h6b), except that each field that selects a variant is required in it and takes only the value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names.",
      "Тип варианта пишется так же, как тип любого RecordType (§s-suv42g8r3ra2h6b), но каждое поле, выбирающее вариант, в нём обязательно и принимает только то значение, которое называет `answersTo` варианта (§s-c2r9jndrjbtbsv6).",
      "Было: «A variant holds each choosing field, required and fixed to the value it answers to. It holds its own fields: inside the RecordType's field of type `variant`…; where the RecordType has no such field, beside the RecordType's fields.» Без изменений по смыслу; поля варианта стоят рядом с полями RecordType, потому что поля типа `variant` больше нет."));
  rep(k, "The type for the other combinations holds the RecordType's fields.",
    P("The type for the combinations that have no variant holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.",
      "Тип для сочетаний, у которых нет варианта, содержит поля RecordType. Если поле, выбирающее вариант, одно, оно принимает только те значения, которым не соответствует ни один вариант. Если полей, выбирающих вариант, несколько, каждое из них принимает все свои значения.",
      "Было: «Its type gives a choosing field: where one field chooses, the values no variant answers to; where several fields choose, all its values.» Без изменений по смыслу. Убрано, что определение этого члена отвергает сочетания, которым соответствует вариант: в JSON Schema такого члена больше нет."));
  rep(k, "The union is written `export type",
    P("The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union[\"<member>\", …]` in Python. The union has the SpecTag (§s-5z5gnu7pahr82xp) of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type has the SpecTag of the variant, and the type for the combinations that have no variant has the SpecTag of the RecordType.",
      "Объединение пишется как `export type <name> = <member> | …` на TypeScript и как `<name> = Union[\"<member>\", …]` на Python. У объединения есть SpecTag (§s-5z5gnu7pahr82xp) RecordType. У каждого члена есть SpecTag того RecordType, из которого он получен: у типа варианта есть SpecTag варианта, а у типа для сочетаний, у которых нет варианта, — SpecTag RecordType.",
      "Было: «in TypeScript, as a union type; in Python, as `<name> = Union[...]`» и «The type carries a SpecTag with the RecordType's sid.» Без изменений по смыслу; сказано, какой SpecTag у каждого члена, — так пишет код."));
  set(k, {
    title: "A RecordType that its variants refine",
    ruTitle: "RecordType, который уточняют его варианты",
    titleChange: "Было: «A RecordType its variants refine». Без изменений по смыслу; добавлено «that».",
    reason: "A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). The types and RuntimeChecks generated from the RecordType describe such a data record in the form that each language has for fields that depend on the value of another field.",
    ruReason: "Запись данных содержит поля своего RecordType вместе с полями того варианта RecordType, который выбирают её значения (§s-z3dnru6qqdf9m6j). Типы и RuntimeChecks, сгенерированные из RecordType, описывают такую запись данных в той форме, которая есть в каждом языке для полей, зависящих от значения другого поля.",
    examples: [
      X("The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`, and the first declares the guaranteed field `address`. Its definition holds a pair of `if` and `then` for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so a data record whose `channel` is `email` and that has no `address` is accepted by the type.",
        "RecordType `notification` называет `channel` в своём `chosenBy`, а значения `channel` — `email`, `sms` и `app`. Его варианты с названиями «notification by email» и «notification by SMS» соответствуют `email` и `sms`, и первый объявляет гарантированное поле `address`. Его определение содержит по паре `if` и `then` для каждого из них, а его тип `Notification` — объединение `NotificationByEmail`, `NotificationBySMS` и `NotificationOther`, в котором `channel` принимает только `app`. Самая вероятная ошибка — позволить `channel` принимать в `NotificationOther` любое значение: тогда тип принимает запись данных, у которой `channel` равно `email` и нет `address`."),
    ],
  });
  refsAdd(k, R("cites", "s-a8fn72xa782wvbk"), R("cites", "s-5z5gnu7pahr82xp"));
  entries[k].stage3 = "types.ts declarations: the RecordType's definition gains a pair of if and then for each variant at the end of its allOf, which it creates where the schema holds none, in the order of the RecordTypes, then pointing to the variant's definition by its $anchor; a variant's definition holds only the fields that it adds; a variant that has never been approved is left out of the pairs and of the union, as s-a8fn72xa782wvbk leaves out a node never approved; the oneOf union and the definition of the Other member in JSON Schema go. TypeScript and Python keep the union of flat members: each variant's type as any RecordType's type, the selecting fields required and fixed; the Other member where a combination has no variant. The field of type variant goes. Tests that run the generated JSON Schema with Ajv 2020 on accepted and refused data records, as the page on RecordType and JSON Schema did, a test for a schema that already holds allOf and a test for a variant never approved are written first; the tests named in testsFrom are rewritten and keep this sid.";
}

// ---------------------------------------------------------------------------------------------------------------
// Item 56: the type that the schema of a field gives (review g7-d; decision 2; the readers).
// ---------------------------------------------------------------------------------------------------------------
{
  const k = "s-4npdup7mjkva69y";
  const enRows = [
    "| Field's schema | TypeScript | Python | Neutral type that an earlier release wrote |",
    "|---|---|---|---|",
    "| `{\"$ref\": \"#<sid>\"}` | the name of the type of the RecordType that has that sid | that name, as a string | record |",
    "| `{\"identifierOf\": \"<sid>\"}` | what the field at the end of its chain of identifiers gives (§s-3anv9qcmx8pwp2w) | what that field gives | identifier of |",
    "| `{\"const\": <its value>}` | the literal of its value | `Literal[<its value>]` | — |",
    "| `{\"enum\": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |",
    "| `{\"x-enumSource\": <its source>}` | the union of the values gathered beside it (§s-ju5vcanbjph7mgh) as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |",
    "| `{\"oneOf\": [<its members' schemas>]}` or `{\"anyOf\": [<its members' schemas>]}` | the union of the types that its members give | `Union[<the types that its members give>]` | — |",
    "| `{\"allOf\": [<its members' schemas>]}` | the intersection of the types that its members give | a `TypedDict` of its own, which holds the fields of every member | — |",
    "| `{\"type\": [<its types>]}` | the union of the types that the schema gives with each of its types in place of the list | `Union[<those types>]` | — |",
    "| `{\"type\": \"null\"}` | `null` | `None` | — |",
    "| `{\"type\": \"string\"}` | `string` | `str` | text |",
    "| `{\"type\": \"string\", \"format\": \"email\"}` | `string` | `str` | email address |",
    "| `{\"type\": \"string\", \"format\": \"date-time\"}` | `string` | `str` | instant |",
    "| `{\"type\": \"string\", \"format\": \"date\"}` | `string` | `str` | date |",
    "| `{\"type\": \"string\", \"format\": \"duration\"}` | `string` | `str` | duration |",
    "| `{\"type\": \"integer\"}`, with its bounds | `number` | `int` | whole number |",
    "| `{\"type\": \"number\"}`, with its bounds | `number` | `float` | number |",
    "| `{\"type\": \"boolean\"}` | `boolean` | `bool` | yes/no |",
    "| `{\"type\": \"array\", \"items\": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |",
    "| `{\"properties\": {<its fields>}}` | an object type written inline, its fields given as the fields of a RecordType are given (§s-suv42g8r3ra2h6b) | a `TypedDict` of its own | — |",
    "| `{\"type\": \"object\", \"additionalProperties\": <its values' schema>}` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |",
    "| `{}` | `unknown` | `Any` | any value |",
  ];
  const ruRows = [
    "| Схема поля | TypeScript | Python | Нейтральный тип, который писал прежний выпуск |",
    "|---|---|---|---|",
    "| `{\"$ref\": \"#<sid>\"}` | имя типа того RecordType, у которого этот sid | это имя, строкой | record |",
    "| `{\"identifierOf\": \"<sid>\"}` | то, что даёт поле в конце его цепочки идентификаторов (§s-3anv9qcmx8pwp2w) | то, что даёт это поле | identifier of |",
    "| `{\"const\": <its value>}` | литерал его значения | `Literal[<its value>]` | — |",
    "| `{\"enum\": [<its values>]}` | объединение его значений как литералов | `Literal[<its values>]` | one of, с собственным списком |",
    "| `{\"x-enumSource\": <its source>}` | объединение значений, собранных рядом с ним (§s-ju5vcanbjph7mgh), как литералов | `Literal[<the values gathered beside it>]` | one of, со значениями из других мест |",
    "| `{\"oneOf\": [<its members' schemas>]}` или `{\"anyOf\": [<its members' schemas>]}` | объединение типов, которые дают его элементы | `Union[<the types that its members give>]` | — |",
    "| `{\"allOf\": [<its members' schemas>]}` | пересечение типов, которые дают его элементы | собственный `TypedDict`, который содержит поля каждого элемента | — |",
    "| `{\"type\": [<its types>]}` | объединение типов, которые даёт схема, если вместо списка в ней стоит каждый из её типов | `Union[<those types>]` | — |",
    "| `{\"type\": \"null\"}` | `null` | `None` | — |",
    "| `{\"type\": \"string\"}` | `string` | `str` | text |",
    "| `{\"type\": \"string\", \"format\": \"email\"}` | `string` | `str` | email address |",
    "| `{\"type\": \"string\", \"format\": \"date-time\"}` | `string` | `str` | instant |",
    "| `{\"type\": \"string\", \"format\": \"date\"}` | `string` | `str` | date |",
    "| `{\"type\": \"string\", \"format\": \"duration\"}` | `string` | `str` | duration |",
    "| `{\"type\": \"integer\"}`, со своими границами | `number` | `int` | whole number |",
    "| `{\"type\": \"number\"}`, со своими границами | `number` | `float` | number |",
    "| `{\"type\": \"boolean\"}` | `boolean` | `bool` | yes/no |",
    "| `{\"type\": \"array\", \"items\": <its members' schema>}`, со своими границами числа элементов | `<its members' type>[]` | `list[<its members' type>]` | list of |",
    "| `{\"properties\": {<its fields>}}` | объектный тип, записанный на месте, поля которого даны так, как даны поля RecordType (§s-suv42g8r3ra2h6b) | собственный `TypedDict` | — |",
    "| `{\"type\": \"object\", \"additionalProperties\": <its values' schema>}` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |",
    "| `{}` | `unknown` | `Any` | any value |",
  ];
  rep(k, "| Field's schema |",
    P(enRows.join("\n"), ruRows.join("\n"),
      "Было: таблица со столбцами «Field's type», «JSON Schema», «TypeScript», «Python». Схема поля теперь и есть то, что было в столбце «JSON Schema», поэтому она стоит первой, а столбец нейтральных типов — последним. Строки «one of» и «identifier of» записаны словами JSON Schema и собственными словами SpecSheriff (`enum`, `x-enumSource`, `identifierOf`), строка «record» — через `$ref`, как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19. Строка для типа `variant` убрана вместе с этим типом (правило 12.6). Новое: строки для `const`, `oneOf` и `anyOf`, `allOf`, списка типов, `null` и объекта, записанного на месте: инструменты SpecSheriff дают тип везде, где TypeScript и Python могут его выразить, по вашему правилу «Maximum functionality over shortcuts». У прежнего выпуска таких типов не было, поэтому в последнем столбце у них «—»."));
  rep(k, "A field's schema falls under the first row of the table",
    P("A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets means any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. A schema that falls under no other row falls under the last, `{}`. The same table gives the type of the members of a list, of the values of a map and of the members of `oneOf`, `anyOf` and `allOf` from their schemas.",
      "Схема поля подпадает под первую строку таблицы, ключевые слова которой она содержит со значениями, которые даёт строка. В строке значение в угловых скобках означает любое значение того рода, который оно называет. Любое другое ключевое слово схемы поля, например `description`, `format` или граница, оставляет тип таким, каким его даёт строка. Схема, которая не подпадает ни под одну другую строку, подпадает под последнюю, `{}`. По той же таблице тип элементов списка, значений словаря и элементов `oneOf`, `anyOf` и `allOf` даёт их схема.",
      "Новое: схема поля — это JSON Schema, в которой могут быть и другие ключевые слова, поэтому сказано, по какой строке она даёт тип; схема, которая не подпадает ни под одну другую строку, даёт `unknown` и `Any`."));
  del(k, "The rows that give the same type");
  rep(k, "A field with `identifierOf` gives what `{}` gives",
    P("A field with `identifierOf` that fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w) gives what `{}` gives.",
      "Поле с `identifierOf`, которое не проходит проверку идентификатора, прослеженного до конца (§s-3anv9qcmx8pwp2w), даёт то же, что `{}`.",
      "Новое: такое поле отвергает проверка «An identifier followed to its end», но `sheriff types` запускается и после неудачной проверки, поэтому сказано, что он даёт в этом случае."),
    P("In Python, `Literal` holds only a string, a whole number, `true`, `false` or `null`, so a `const` with any other value gives what `{}` gives. An `allOf` gives a `TypedDict` of its own in Python only where each of its members gives an object type, and gives what `{}` gives otherwise. That `TypedDict` holds the fields of the members, in the order of the members. A field that several members declare has the type that the last of them gives, as a field that a RecordType takes through `refines` does (§s-suv42g8r3ra2h6b).",
      "На Python `Literal` содержит только строку, целое число, `true`, `false` или `null`, поэтому `const` с любым другим значением даёт то же, что `{}`. `allOf` даёт на Python собственный `TypedDict`, только если каждый его элемент даёт объектный тип, а иначе даёт то же, что `{}`. Этот `TypedDict` содержит поля элементов, в порядке элементов. У поля, которое объявляют несколько элементов, тот тип, который даёт последний из них, — так же, как у поля, которое RecordType берёт через `refines` (§s-suv42g8r3ra2h6b).",
      "Новое: так новые строки таблицы дают тип и там, где Python может выразить его только отчасти."),
    P("In Python, each object written inline and each `allOf` that gives a `TypedDict` is written as a `TypedDict` of its own, after the type that uses it and with the same SpecTag. Its name begins with the name of the type of the RecordType whose `schema` holds it. One part follows for each step from that `schema` down to it, each with its first letter changed to uppercase:",
      "На Python каждый объект, записанный на месте, и каждый `allOf`, который даёт `TypedDict`, пишется как отдельный `TypedDict` — после типа, который им пользуется, и с тем же SpecTag. Его имя начинается с имени типа того RecordType, `schema` которого его содержит. За ним идёт по одной части на каждый шаг от этой `schema` вниз до него, каждая с первой буквой, сделанной заглавной:",
      "Новое: Python не может записать объектный тип на месте, поэтому такой тип получает собственное имя, построенное по пути к нему, как прежде тип объекта поля типа `variant`."),
    L("for a field, the field's name;",
      "для поля — имя поля;",
      NEW),
    L("for the members of a list, `Item`;",
      "для элементов списка — `Item`;",
      NEW),
    L("for the values of a map, `Value`;",
      "для значений словаря — `Value`;",
      NEW),
    L("for a member of `oneOf`, `anyOf` or `allOf`, its position in the list of members, counted from one.",
      "для элемента `oneOf`, `anyOf` или `allOf` — его номер в списке элементов, считая с единицы.",
      NEW),
    P("For example, the object written inline as the field `address` of the RecordType `user` gives the `TypedDict` `UserAddress`. Such a name, too, cannot be generated in the cases that the node on what is generated from a RecordType lists (§s-suv42g8r3ra2h6b).",
      "Например, объект, записанный на месте как поле `address` RecordType `user`, даёт `TypedDict` `UserAddress`. Такое имя тоже не может быть сгенерировано в тех случаях, которые перечисляет узел о том, что генерируется из RecordType (§s-suv42g8r3ra2h6b).",
      NEW));
  rep(k, "a `$ref` whose value is `#` followed by the RecordType's sid",
    L("a `$ref` whose value is `#` followed by the other RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);",
      "`$ref`, значение которого — `#`, за которым следует sid другого RecordType; он указывает на `$anchor` определения этого RecordType (§s-suv42g8r3ra2h6b);",
      "Новое: `$ref` с `#` и sid — как на странице о RecordType и JSON Schema, которую вы приняли 2026-11-19."));
  rep(k, "an `identifierOf` whose value is the RecordType's sid.",
    L("an `identifierOf` whose value is the other RecordType's sid.",
      "`identifierOf`, значение которого — sid другого RecordType.",
      "Новое: `identifierOf` — собственное слово SpecSheriff, а не ссылка JSON Schema, поэтому его значение — sid без `#`, как везде, где спецификация называет узел: в связях и в собранных значениях."));
  rep(k, "Each value gathered beside a field",
    P("`sheriff types` takes each value gathered beside a field (§s-ju5vcanbjph7mgh) once, in the type and in the RuntimeCheck (§s-e877bnfa559tvk9) in the same way, at the place where the value first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c).",
      "`sheriff types` берёт каждое значение, собранное рядом с полем (§s-ju5vcanbjph7mgh), один раз, одинаково в тип и в RuntimeCheck (§s-e877bnfa559tvk9), на том месте, где это значение впервые появляется в `x-enumSource.gathered` этого поля (§s-5nf87c3e3jg9v7c).",
      "Было: «Where its values come from elsewhere, it gives those gathered beside it (§s-ju5vcanbjph7mgh), in this order: by the node each comes from, …; the members of one list in their order.» Порядок собранных значений теперь задаёт согласованный узел о том, откуда собираются значения поля с `enum`, и этот узел на него ссылается, а не повторяет его. Новое: каждое значение берётся один раз — два раздела с одним названием дают одно значение дважды, а в `enum` и в объединении литералов значение должно стоять один раз."));
  rep(k, "`identifierOf` is replaced, in its place",
    L("`identifierOf` is replaced, at the same position, by every keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;",
      "`identifierOf` заменяется, на том же месте, каждым ключевым словом схемы поля в конце цепочки идентификаторов, кроме `description` этой схемы;",
      "Было: «identifier of | what the field identifying that RecordType gives». Без изменений по смыслу (ваше решение от 2026-10-31); собственное описание поля сохраняется."));
  rep(k, "where that chain has no end, `identifierOf` is removed.",
    L("where the field fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w), `identifierOf` is removed.",
      "если поле не проходит проверку идентификатора, прослеженного до конца (§s-3anv9qcmx8pwp2w), `identifierOf` удаляется.",
      "Новое: так RuntimeCheck не содержит слова, которого валидатор JSON Schema не знает, а такое поле отвергает проверка «An identifier followed to its end»."));
  set(k, {
    reason: "JSON Schema is the standard for which every language has a validator. So a field's schema serves as its RuntimeCheck, which checks in the same way in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the data records of the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.",
    ruReason: "JSON Schema — стандарт, для которого валидатор есть в каждом языке. Поэтому схема поля служит его RuntimeCheck, который одинаково в каждом языке проверяет то, чего не может выразить тип на TypeScript или Python, например границу или формат. Собственный тип значения в каждом языке — тот, который его код читает без преобразования. Идентификатор имеет тип поля, которое идентифицирует записи данных названного им RecordType. Поэтому значение, которое переходит из этого поля в поле, ссылающееся на него, сохраняет свой тип и проходит тот же RuntimeCheck.",
    examples: [
      X("The `schema` of the RecordType `statement` holds `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{\"type\": \"string\", \"maxLength\": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not recognise that keyword, so it does not check that `accountId` is a string.",
        "`schema` RecordType `statement` содержит `\"accountId\": {\"identifierOf\": \"s-…\", \"description\": \"The account.\"}`, где `s-…` — sid RecordType `account`. Поле, которое идентифицирует `account`, — `number` со схемой `{\"type\": \"string\", \"maxLength\": 34}`. На TypeScript у `accountId` тип `string`, а в RuntimeChecks его схема — `{\"type\": \"string\", \"maxLength\": 34, \"description\": \"The account.\"}`. Самая вероятная ошибка — оставить `identifierOf` в RuntimeCheck: валидатор JSON Schema этого слова не знает и потому не проверяет, что `accountId` — строка."),
    ],
  });
  entries[k].stage3 = "types.ts resolve: read the field's JSON Schema and take the first row of the table that it matches, {} last; give const its literal, oneOf and anyOf the union of their members, allOf the intersection in TypeScript and a merged TypedDict in Python where every member gives an object type, a list of types the union of each, null null and None, an object written inline an inline object type in TypeScript and a TypedDict of its own in Python, named and placed as the node says, with the RecordType's SpecTag; give x-enumSource the gathered values, each once, in their order in x-enumSource.gathered; give identifierOf, a bare sid, what the identifying field at the end of the chain gives, or {} where the field fails the check of s-3anv9qcmx8pwp2w; give $ref \"#<sid>\" the name of that RecordType's type. Write each field's schema into the RuntimeChecks as the RecordType holds it, with x-enumSource replaced by enum and identifierOf by the keywords of the identifying field's schema other than its description. The tests named in testsFrom are rewritten first for the JSON Schema form and keep this sid; “gives a field of type one of the values the lists of domains declare…” becomes a test of x-enumSource; tests for each new row, for a const that Python's Literal cannot hold and for the name of a nested TypedDict are written first.";
}

// ---------------------------------------------------------------------------------------------------------------
// The proposals of round a that round b changes, and the three new proposals.
// ---------------------------------------------------------------------------------------------------------------
const fromBase = (baseKey) => {
  const base = drafts[baseKey];
  if (!base || !base.agreed) throw new Error(`${baseKey}: no agreed draft to build a proposal on`);
  return { base, parts: base.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: AS_AGREED })) };
};
const atIn = (list, start) => {
  const i = list.findIndex((x) => x.en.startsWith(start));
  if (i < 0) throw new Error(`no part starts with: ${start}`);
  return i;
};
const sidOf = (baseKey) => drafts[baseKey].sidValue ?? (/^s-[2-9a-hjkmnp-z]{15}$/.test(baseKey) ? baseKey : undefined);

// 1. The list of commands: the citations that rule 7.2.7 requires, at their first use.
{
  const k = "proposal:s-f5rz6b7dhxejjts-g7";
  rep(k, "`sheriff types`:",
    L("`sheriff types`: generates parts of the system's code from the approved wordings of the nodes, for example the types and RuntimeChecks (§s-e877bnfa559tvk9) for the RecordTypes (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk);",
      "`sheriff types` — порождает части кода системы из одобренных формулировок узлов, например типы и RuntimeChecks (§s-e877bnfa559tvk9) для RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk);",
      "Ссылки по правилу 7.2.7 там, где узел впервые называет RuntimeChecks (правило 12.3) и RecordType (правило 12.1). Остальное — как в согласованной формулировке."));
  rep(k, "`sheriff todos`:",
    L("`sheriff todos`: prints every todo (§s-t28j22vbdmmeqnh) of the specification together with its node (§s-fprt8xysafzjqv9);",
      "`sheriff todos` — печатает каждый todo (§s-t28j22vbdmmeqnh) из спецификации вместе с её узлом (§s-fprt8xysafzjqv9);",
      "Ссылка по правилу 7.2.7 там, где узел впервые называет todo (правило 1.2.5). Остальное — как в согласованной формулировке."));
  rep(k, "`sheriff settings`:",
    L("`sheriff settings`: shows and changes the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-chsfpkgpmfk4fft);",
      "`sheriff settings` — показывает и меняет статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения guidelines (§s-mbmnsnxenmavu3z, §s-chsfpkgpmfk4fft);",
      "Ссылки по правилу 7.2.7 там, где узел впервые называет статус одобрения спецификации (правило 10.6), флаг `strict` (правило 10.7) и расширения guidelines (правило 1.7.1). Остальное — как в согласованной формулировке."));
  rep(k, "`sheriff untagged`:",
    L("`sheriff untagged`: lists the symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q), each with its file (§s-weuyx98r7c923ab);",
      "`sheriff untagged` — перечисляет символы кода системы, у которых нет SpecTag (§s-8xw4mgvpexyvw5q), каждый с его файлом (§s-weuyx98r7c923ab);",
      "Ссылка по правилу 7.2.7 там, где узел впервые называет SpecTag (правило 9.3). Остальное — как в согласованной формулировке."));
  refsAdd(k, R("cites", "s-e877bnfa559tvk9"), R("cites", "s-7vm323mhry2enx3"), R("cites", "s-t28j22vbdmmeqnh"), R("cites", "s-qzthyh7yqvfhsa2"), R("cites", "s-q3pfzyaxvpr2zj2"), R("cites", "s-mbmnsnxenmavu3z"), R("cites", "s-8xw4mgvpexyvw5q"));
  entries[k].change = "Технически: строки о `sheriff show` и `sheriff markdown` ссылаются теперь на новые узлы этих команд, «Printing one node» и «Writing the human-readable export», на которые группа разделила узел о том, что экспорт, руководство и `sheriff show` пишут об узле. Ссылка на прежний узел, который теперь говорит только, как узел записывается в Markdown, из этого узла ушла. По правилу 7.2.7 добавлены ссылки там, где узел впервые называет: RuntimeChecks (правило 12.3) и RecordType (правило 12.1) — в строке о `sheriff types`; todo (правило 1.2.5) — в строке о `sheriff todos`; статус одобрения спецификации (правило 10.6), флаг `strict` (правило 10.7) и расширения guidelines (правило 1.7.1) — в строке о `sheriff settings`; SpecTag (правило 9.3) — в строке о `sheriff untagged`. Остальная формулировка — как вы согласовали.";
  entries[k].question = "None: a technical replacement that follows the split of “What the export, the guide and `sheriff show` write of a node” (item 51), and the citations that rule 7.2.7 requires in the sentences that the owner agreed to, as the owner's rule “An agreed node is brought into line with the rules when it changes, never in a sweep” asks";
}

// 2. Item 47: one shorter sentence (review g7-d).
{
  const k = "proposal:s-ezq8csd433vj6fj-g7";
  rep(k, "its `schema` (§s-6eb92ddch7shuvu) holds, at any depth",
    L("its `schema` (§s-6eb92ddch7shuvu) names that RecordType at any depth, by a `$ref` or by an `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);",
      "его `schema` (§s-6eb92ddch7shuvu) на любой глубине называет тот RecordType через `$ref` или через `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);",
      "Было: «its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);». Без изменений по смыслу: добавлена ссылка на узел «The type that the schema of a field gives», который теперь задаёт, в каком виде `$ref` и `identifierOf` называют RecordType."));
  entries[k].change = "Технически: пункт о ссылке через `schema` сокращён и ссылается на узел «The type that the schema of a field gives», который теперь задаёт, в каком виде `$ref` и `identifierOf` называют RecordType. Остальная формулировка — как вы согласовали.";
}

// 3. Generated copies: the entry of the bindings file is now described by the node split from item 53.
{
  const k = "proposal:s-dbk2vyeg8z5jxna-g7";
  rep(k, "`sheriff binding` also refuses the bindings file",
    P("`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-h5rfyy9j8nnhx62), or holds a different value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.",
      "`sheriff binding` отвергает и файл привязок (§s-trwczfskj5zmuft), если в нём нет записи, которую `sheriff types` пишет для файла RuntimeChecks (§s-h5rfyy9j8nnhx62), или если под путём этого файла в нём другое значение. Отказ называет файл RuntimeChecks и говорит, что запуск `sheriff types` пишет его запись.",
      "Новое: узел «The entry of the bindings file for a file of RuntimeChecks» теперь велит `sheriff types` вести в файле привязок запись для каждого файла RuntimeChecks, потому что файл JSON не может содержать SpecTag. Эта запись тоже порождается из узлов, и без этого абзаца её правка вручную прошла бы."));
  refsAdd(k, R("cites", SID.bindingsEntry));
  entries[k].change = "Добавлен абзац: `sheriff binding` отвергает файл привязок, если в нём нет записи, которую `sheriff types` пишет для файла RuntimeChecks, или если под путём этого файла другое значение. Почему: узел «The entry of the bindings file for a file of RuntimeChecks» теперь велит `sheriff types` вести такую запись (файл JSON не может содержать SpecTag), а строка 10.1.39a требует, чтобы всё сгенерированное совпадало с тем, что дают одобренные формулировки. Только английский: «also counts as different» стало «is also treated as different», потому что «counts» вы оставляете для счёта. Остальная формулировка — как вы согласовали.";
}

// 4. "Project-wide settings": the files of RuntimeChecks are read for SpecTags, so that their entry in the bindings
// file is accepted (review g7-c, finding 5).
{
  const { base, parts: ps } = fromBase("proposal:new-tools-1-settings-g3");
  ps[atIn(ps, "the files into which `sheriff types` writes the types")] = L(
    "the files into which `sheriff types` writes the types and the RuntimeChecks (§s-pvzms7d8kxb8dk2);",
    "файлы, в которые `sheriff types` записывает типы и RuntimeChecks (§s-pvzms7d8kxb8dk2);",
    "Было: «the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2);». Добавлены файлы RuntimeChecks: `sheriff types` теперь ведёт для каждого из них запись в файле привязок, а согласованный узел «SpecTags on the system's code other than tests» отвергает запись для файла, который не входит в код системы. Так, в saloon шаблон кода — `src/**/*.ts`, а стек перечисляет `src/generated/checks.json`.");
  entries["proposal:new-tools-1-settings-g7"] = {
    question: "None: the files of RuntimeChecks are read for SpecTags, so that the entry of the bindings file that `sheriff types` now writes for each of them (item 53) is accepted",
    base: "proposal:new-tools-1-settings-g3",
    location: base.location,
    sidValue: sidOf("proposal:new-tools-1-settings-g3"),
    change: "В перечне файлов, которые инструменты SpecSheriff читают, чтобы найти SpecTag, к файлам типов добавлены файлы RuntimeChecks, которые пишет `sheriff types`. Почему: `sheriff types` теперь ведёт для каждого файла RuntimeChecks запись в файле привязок (узел «The entry of the bindings file for a file of RuntimeChecks»), а согласованный узел «SpecTags on the system's code other than tests» отвергает запись для файла вне кода системы; в saloon файл RuntimeChecks лежит вне шаблона кода. Остальная формулировка — как вы согласовали.",
    proposal: {
      title: base.proposal.title,
      ruTitle: base.proposal.ruTitle,
      parts: ps,
      reason: base.proposal.reason,
      ruReason: base.proposal.ruReason,
      reasonChange: AS_AGREED,
      refs: base.proposal.refs.map((r) => ({ ...r })),
      removed: [],
      date: DATE,
    },
    stage3: "config.ts and binding.ts read the files of RuntimeChecks that the stack lists, as they read the files of types, so that the entry of the bindings file for such a file is accepted; a test for a file of RuntimeChecks outside the glob patterns of code is written first.",
  };
  changed.add("proposal:new-tools-1-settings-g7");
}

// 5. "The review of a commit": the files that `sheriff types` generates, not those that it writes (review g7-c,
// finding 6).
{
  const { base, parts: ps } = fromBase("proposal:s-vp24dqydygztqbt");
  const i = atIn(ps, "Where `sheriff review` asks for a verdict");
  ps[i] = {
    ...ps[i],
    en: ps[i].en.replace("are the files that `sheriff types` writes (§s-a8fn72xa782wvbk)", "are the files that `sheriff types` generates (§s-a8fn72xa782wvbk)"),
    ru: ps[i].ru.replace("это файлы, которые записывает `sheriff types` (§s-a8fn72xa782wvbk)", "это файлы, которые порождает `sheriff types` (§s-a8fn72xa782wvbk)"),
    change: "Было: «…are the files that `sheriff types` writes (§s-a8fn72xa782wvbk)». Теперь `sheriff types` пишет и запись в файл привязок, поэтому «writes» скрыло бы от рецензента записи, сделанные вручную; «generates» называет только порождённые файлы, которые перечисляет согласованный узел о `sheriff types`.",
  };
  if (!ps[i].en.includes("`sheriff types` generates (§s-a8fn72xa782wvbk)") || !ps[i].ru.includes("порождает `sheriff types`")) throw new Error("the sentence on the generated files was not found");
  entries["proposal:s-vp24dqydygztqbt-g7"] = {
    question: "None: `sheriff types` now also writes an entry into the bindings file (item 53), so the files that the review leaves out are those that `sheriff types` generates",
    base: "proposal:s-vp24dqydygztqbt",
    location: base.location,
    sidValue: sidOf("proposal:s-vp24dqydygztqbt"),
    change: "«the files that `sheriff types` writes» стало «the files that `sheriff types` generates», «записывает» — «порождает». Почему: `sheriff types` теперь пишет и запись в файл привязок (узел «The entry of the bindings file for a file of RuntimeChecks»), и прежние слова исключили бы из изменения коммита весь файл привязок, в том числе записи, сделанные вручную. Остальная формулировка — как вы согласовали.",
    proposal: {
      title: base.proposal.title,
      ruTitle: base.proposal.ruTitle,
      parts: ps,
      reason: base.proposal.reason,
      ruReason: base.proposal.ruReason,
      reasonChange: AS_AGREED,
      ...(base.proposal.examples ? { examples: base.proposal.examples.map((x) => ({ ...x })) } : {}),
      refs: base.proposal.refs.map((r) => ({ ...r })),
      removed: [],
      date: DATE,
    },
    stage3: "review.ts leaves out of the commit's change only the files that sheriff types generates, not sheriff.bindings.json; a test with an entry of the bindings file changed by hand is written first.",
  };
  changed.add("proposal:s-vp24dqydygztqbt-g7");
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];
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
for (const e of Object.values(entries)) if (e.sidValue) targets.add(e.sidValue);
for (const [key, e] of Object.entries(entries)) {
  if (key.startsWith("new:")) {
    if (e.from && !toolsNodes.has(e.from)) problems.push(`${key}: no node of tools.json it is split from`);
  } else if (key.startsWith("proposal:")) {
    if (!drafts[e.base]?.agreed) problems.push(`${key}: its base ${e.base} is no agreed draft`);
    if (sidOf(e.base) !== e.sidValue) problems.push(`${key}: its sid differs from that of its base`);
  } else if (!toolsNodes.has(key)) problems.push(`${key}: no such node in tools.json`);
}
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
}
const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const ticks = (s) => [...new Set([...s.matchAll(/`[^`]*`/g)].map((m) => m[0]))].sort().join(" ");
const longSentences = [];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
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
  for (const x of p.parts) if (x.change !== AS_AGREED && ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  for (const x of p.examples || []) if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in an example`);
  if (!key.startsWith("proposal:") && !e.testsFrom) problems.push(`${key}: no testsFrom`);
  if (!e.stage3) problems.push(`${key}: no stage3`);
  if (changed.has(key)) {
    const ownText = [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
    for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
      const words = sentence.split(/\s+/).filter(Boolean).length;
      if (words > 30) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
    }
  }
  const bad = [/stands for/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bcounts? as\b/, /\bpoints? at\b/, /\bonly once\b/, /type `one of`/, /`identifier of`/, /\bevery other\b/, /\bboth agents\b/, /\bthe two\b/, /sheriff export/, /sheriff render/, /\beach other\b/];
  if (key !== "proposal:s-gb8s9657a65hqmv-g7") bad.push(/\bdeclaredIn\b/);
  const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/Appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
  // The agreed sentences of a proposal's base are checked when the owner agreed to them.
  const own = key.startsWith("proposal:") ? p.parts.filter((x) => x.change !== AS_AGREED).map((x) => x.en).join("\n") : plain;
  for (const b of bad) if (b.test(own.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT"))) problems.push(`${key}: the English holds ${b}`);
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел|NodeKind/.test(ruAll)) problems.push(`${key}: the Russian says «несёт», «владелец» or NodeKind`);
  const changes = JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || "");
  // The node on the review of a commit names its own subject, the reviewer of a commit.
  const history = key === "proposal:s-vp24dqydygztqbt-g7" ? /[Рр]аунд|review-g|\bround\b|групп[аыеу] [1-7]/ : /[Рр]аунд|рецензент|review-g|\bround\b|групп[аыеу] [1-7]/;
  if (history.test(changes)) problems.push(`${key}: a change field tells the history of the rounds or names a group`);
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
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

const md = [
  "# T25, group 7, round b: the English of every node that round b changes",
  "",
  "This file holds the final English of every node and proposal of group 7 that round b changes or adds, as `tools-drafts.json` holds it after fix-group7-b.mjs, each in full: the drafts of items 51 to 56 of the appendix of the tools, the new node split from item 53 on the entry of the bindings file, and the proposals to change agreed drafts.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group7-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  if (!changed.has(key)) continue;
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.from) md.push(`A new node, split from \`${e.from}\`, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("new:")) md.push(`A new node, with the sid ${e.sidValue}.`, "");
  else if (key.startsWith("proposal:")) md.push(`A proposal: the complete new wording of the agreed draft \`${e.base}\`${e.sidValue ? `, the node ${e.sidValue}` : ""}.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
  for (const t of p.todos || []) md.push(`**Todo (${t.date}):** ${t.text}`, "");
}
fs.writeFileSync(new URL("english-group7b.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts; changed in round b: ${[...changed].join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 30 words, to look at:\n${longSentences.join("\n")}`);
