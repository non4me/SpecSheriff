// Applies specsheriff-rule-reviewer's first report on the second group of "The commands". The node on `sheriff types`
// is rewritten, and its paragraphs on running a project's generator become a node of their own (s-y5yk7eu6h4zrjpr). The
// node on `sheriff settings` loses `sheriff untagged` to a node of its own (s-weuyx98r7c923ab). The nodes on
// `sheriff json`, `sheriff todos` and `sheriff guide` take the reviewer's fixes. As a technical replacement, the agreed
// node that lists the commands points to the new node for `sheriff untagged` and writes "RuntimeChecks". Applies
// EngStickler's forty-ninth batch of corrections to the continuation file and INDEX.md, and updates the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-commands-b3.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const rerender = (p) => { p.text = render(p.parts, "en"); p.ruText = render(p.parts, "ru"); };
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const cites = (list) => list.map((to) => ({ type: "cites", to }));
const impl = (list) => list.map((to) => ({ type: "implements", to }));
const sids = drafts["commands:sids"];
sids.generator = "s-y5yk7eu6h4zrjpr";
sids.untagged = "s-weuyx98r7c923ab";
const review1 = "specsheriff-rule-reviewer's first report on the second group, 2026-11-22";

// `sheriff types`.
const types = drafts["new:tools-2-types"];
types.proposal = {
  ...types.proposal,
  title: "What `sheriff types` generates",
  ruTitle: "Что порождает `sheriff types`",
  parts: [
    P("`sheriff types` generates the parts of the system's code (§s-hheus6f395ynqvc) that come from the nodes (§s-qyjw8xez6t6adc3):",
      "`sheriff types` порождает те части кода системы (§s-hheus6f395ynqvc), которые получаются из узлов (§s-qyjw8xez6t6adc3):",
      "Из узла «The commands». Было: «`sheriff types` порождает следующее…»."),
    L("from the RecordTypes (§s-7vm323mhry2enx3), the types and the RuntimeChecks (§s-e877bnfa559tvk9), in the files that the technical appendix lists for them (§s-pvzms7d8kxb8dk2);",
      "из RecordType (§s-7vm323mhry2enx3) — типы и RuntimeChecks (§s-e877bnfa559tvk9), в файлах, которые для них перечисляет техническое приложение (§s-pvzms7d8kxb8dk2);", "Как было."),
    L(`the files that each of the project's own code generators prints (§s-km4x4s26kv7pjze, §${sids.generator}).`,
      `файлы, которые печатает каждый собственный генератор кода проекта (§s-km4x4s26kv7pjze, §${sids.generator}).`, "Как было; как запускается генератор, теперь описывает отдельный узел."),
    P("It generates the code of each node from the last approved wording of that node and of each node that it relies on, even where an approval has since been withdrawn.",
      "Код каждого узла он порождает из последней одобренной формулировки этого узла и каждого узла, на который тот опирается, даже если одобрение потом отозвано.",
      "Новое: по согласованному правилу 10.15 код порождается из последних одобренных формулировок. Сейчас `sheriff types` ждёт, пока одобрят каждый узел, и одна черновая RecordType задерживает все файлы."),
    P("The last approved wording of a node is the wording whose fingerprint the node's last approval records (§s-v4qus7raqnwzneb). `sheriff types` takes that wording from the files of the specification where they hold it. Otherwise it takes the wording from the latest commit of the current branch that holds it, read in the form to which `sheriff reindex` would rewrite it (§s-gb8s9657a65hqmv).",
      "Последняя одобренная формулировка узла — та, чей отпечаток записан в последнем одобрении узла (§s-v4qus7raqnwzneb). `sheriff types` берёт эту формулировку из файлов спецификации, если она там есть. Иначе он берёт её из последнего коммита текущей ветки, где она есть, прочитав её в том виде, в который её переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).",
      "Новое: одобрение хранит только отпечаток формулировки, поэтому саму формулировку инструменты ищут в истории git. Формулировку из истории мог записать прежний выпуск, поэтому она читается в нынешнем виде."),
    P("It generates code only from a node that has been approved and whose approved wording relies only on nodes that have been approved. It names by its sid each node that it leaves out because that node relies on a node that has never been approved (§s-f8fmudceuyaj942).",
      "Код он порождает только из узла, который одобряли и одобренная формулировка которого опирается только на узлы, которые одобряли. Каждый узел, который он пропускает, потому что тот опирается на ни разу не одобренный узел, он называет по sid (§s-f8fmudceuyaj942).",
      "Новое: так требует правило 10.15 и строка 10.1.39b."),
    P("`sheriff types` treats only a RecordType as relying on other nodes. A RecordType relies on each of the following RecordTypes, directly or through other RecordTypes:",
      "`sheriff types` считает опирающимся на другие узлы только RecordType. RecordType опирается на каждый из следующих RecordType, прямо или через другие RecordType:",
      "Новое: правило 10.15 говорит «опирается», но не говорит, на что опирается RecordType. Это предложение рецензента."),
    L("each RecordType that it refines;", "каждый RecordType, который он уточняет;", "Новое."),
    L("each RecordType that one of its fields refers to.", "каждый RecordType, на который ссылается одно из его полей.", "Новое."),
    P("The types and RuntimeChecks take the values gathered beside a field (§s-ju5vcanbjph7mgh) as they are when `sheriff types` runs.",
      "Типы и RuntimeChecks берут значения, собранные рядом с полем (§s-ju5vcanbjph7mgh), такими, какие они есть при запуске `sheriff types`.",
      "Новое, на ваше решение: собранные значения берутся, например, из заголовков доменов, а заголовки никто не одобряет — их статус выводится из узлов под ними. Если бы RecordType ждал их одобрения, он не породился бы никогда."),
    P("`sheriff types` writes a file only where the file is missing or holds, line endings aside, a text other than the one it generates. It names each file that it writes.",
      "`sheriff types` пишет файл, только если файла нет или в нём, без учёта концов строк, другой текст, чем тот, который он порождает. Он называет каждый файл, который пишет.", "Как было."),
    P("Where any of the following holds, `sheriff types` names each refusal and writes no file:",
      "Если выполнено что-либо из следующего, `sheriff types` называет каждый отказ и не пишет ни одного файла:", "Как было."),
    L("the check of generated copies against the nodes refuses anything that `sheriff types` would write (§s-dbk2vyeg8z5jxna);",
      "проверка порождённых копий по узлам отвергает что-либо из того, что записал бы `sheriff types` (§s-dbk2vyeg8z5jxna);", "Как было, точнее."),
    L(`a project's generator is refused (§${sids.generator}).`, `генератор проекта отвергнут (§${sids.generator}).`, "Как было; случаи отказа генератора теперь перечисляет его узел.")
  ],
  reason: "`sheriff types` regenerates the code after every edit and at every commit (§s-kh8qcd5kxgh9z3j). Each run therefore changes only what the approved wordings change, and leaves the code either wholly regenerated or untouched.",
  ruReason: "`sheriff types` порождает код заново после каждой правки и при каждом коммите (§s-kh8qcd5kxgh9z3j). Поэтому каждый запуск меняет только то, что меняют одобренные формулировки, и оставляет код либо целиком порождённым заново, либо нетронутым.",
  reasonChange: "Новое, предложено рецензентом: прежнее обоснование пересказывало абзацы узла по порядку и обоснование правила 10.15.",
  refs: [...impl(["s-qyjw8xez6t6adc3", "s-kh8qcd5kxgh9z3j", "s-e877bnfa559tvk9", "s-f8fmudceuyaj942"]), ...cites(["s-hheus6f395ynqvc", "s-7vm323mhry2enx3", "s-pvzms7d8kxb8dk2", "s-km4x4s26kv7pjze", sids.generator, "s-v4qus7raqnwzneb", "s-gb8s9657a65hqmv", "s-ju5vcanbjph7mgh", "s-dbk2vyeg8z5jxna"])]
};
rerender(types.proposal);
types.review = review1 + ": not ready; rewritten by fix-commands-b3.mjs as the reviewer proposed, back for a second review";
types.doubt = "The types and RuntimeChecks take the values gathered beside a field as they are when `sheriff types` runs, since those values come, for example, from domains' headers, which nobody approves. To be put to the owner with the node.";

// How a project's own code generator is run.
drafts["new:tools-2-generator"] = {
  agreed: false,
  from: "s-f5rz6b7dhxejjts",
  location: "tools 2.6 (new)",
  sidValue: sids.generator,
  testsFrom: ["generator"],
  proposal: {
    title: "How a project's own code generator is run",
    ruTitle: "Как запускается собственный генератор кода проекта",
    parts: [
      P("`sheriff types` runs each of the project's own code generators (§s-km4x4s26kv7pjze) by the command that `sheriff.config.json` names for it. It runs a generator only while the rule that lists the generator is approved. While that rule is a draft, the files that the generator printed stay as they are.",
        "`sheriff types` запускает каждый собственный генератор кода проекта (§s-km4x4s26kv7pjze) командой, которую для него называет `sheriff.config.json`. Генератор он запускает, только пока правило, которое перечисляет этот генератор, одобрено. Пока это правило — черновик, файлы, которые генератор напечатал, остаются как есть.",
        "Из узла «The commands»; новое — генератор ждёт только одобрения правила, которое его перечисляет, как требует правило 10.9."),
      P(`On its standard input the generator is handed the model that \`sheriff json\` prints (§${sids.model}), with each node in its last approved wording (§${sids.types}). That model holds only the nodes that code may be generated from, together with each section and each domain's header.`,
        `На стандартный вход генератору передаётся модель, которую печатает \`sheriff json\` (§${sids.model}), где каждый узел — в последней одобренной формулировке (§${sids.types}). В этой модели только узлы, из которых можно порождать код, а также каждый раздел и каждый заголовок домена.`,
        "Новое: так генератор не может реализовать то, что не одобрено (правило 10.15)."),
      P("The generator prints as JSON a list that gives, for each file, its path, its content, and the sids of the nodes that the file is written from.",
        "Генератор печатает в JSON список, который для каждого файла даёт его путь, содержимое и sid узлов, из которых файл написан.", "Как было."),
      P("`sheriff types` refuses a generator in each of these cases:", "`sheriff types` отвергает генератор в каждом из этих случаев:", "Как было: так делает код сейчас."),
      L("the rule that `sheriff.config.json` names for the generator lists no generator of that name;", "правило, которое для генератора называет `sheriff.config.json`, не перечисляет генератора с таким именем;", "Как было."),
      L("the generator exits with a failure;", "генератор завершается с ошибкой;", "Как было."),
      L("the generator prints anything other than a list of that form;", "генератор печатает что-либо, кроме списка такого вида;", "Как было."),
      L("a path that the generator prints lies outside the repository, inside `.git`, or under `specs/`.", "путь, который печатает генератор, ведёт за пределы репозитория, внутрь `.git` или в `specs/`.", "Как было.")
    ],
    reason: "Handed only the approved wordings of the nodes that code may be generated from, a generator implements only what the owners have approved (§s-qyjw8xez6t6adc3). A generator is the project's own program, so `sheriff types` checks what it prints before writing anything.",
    ruReason: "Получая только одобренные формулировки узлов, из которых можно порождать код, генератор реализует только то, что одобрили ответственные (§s-qyjw8xez6t6adc3). Генератор — собственная программа проекта, поэтому `sheriff types` проверяет то, что он печатает, прежде чем что-либо писать.",
    reasonChange: "Новое.",
    refs: [...impl(["s-km4x4s26kv7pjze"]), ...cites([sids.model, sids.types, "s-qyjw8xez6t6adc3"])],
    date: "2026-11-22",
    removed: []
  },
  review: review1 + ": split out of the node on `sheriff types` as the reviewer proposed, to be reviewed a second time"
};
rerender(drafts["new:tools-2-generator"].proposal);

// `sheriff json`.
const json = drafts["new:tools-2-json"];
json.proposal.parts = [
  P("`sheriff json` prints as JSON the model of the specification of the repository where it runs.",
    "`sheriff json` печатает в JSON модель спецификации репозитория, в котором запущен.",
    "Из узла «The commands»; имя команды — по вашему решению."),
  P("The model holds each node of the files that the repository keeps, and of the SpecSheriff guidelines, the chosen extensions (§s-9ttvcwpqkehm58g) and the appendix of the tools that the project takes from the plugin. It includes each node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).",
    "Модель содержит каждый узел файлов, которые хранит репозиторий, а также SpecSheriff guidelines, выбранных расширений (§s-9ttvcwpqkehm58g) и описания инструментов, которые проект берёт из плагина. В неё входит и каждый узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).",
    "Новое: узлы выбранных расширений и узлы в ячейках; сказано, что входят и узлы из плагина."),
  P("It gives each node as its file holds it, without the nodes under it, together with:",
    "Каждый узел она даёт так, как его хранит файл, без узлов под ним, а вместе с ним:", "Как было."),
  L("the part of the specification and the file that the node is in;", "часть спецификации и файл, в которых находится узел;", "Как было."),
  L("the node above it;", "узел над ним;", "Новое в тексте: код уже так делает, и тест это проверяет."),
  L("the owners named nearest above it (§s-6sk8uet75dmq5qz).", "ответственных, названных ближе всего над ним (§s-6sk8uet75dmq5qz).", "Как было."),
  P("The model also holds the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2).",
    "Модель также содержит статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2).",
    "Новое: собственная проверка проекта, которую ужесточает флаг `strict`, должна знать и флаг, и статус.")
];
json.proposal.reason = "Handed the model rather than left to read the files, a project's check or generator finds nodes by their location, finds owners and follows links as the SpecSheriff tools do, in whatever language the project writes it. The approval status and the `strict` flag are in the model because they change what a project's check requires.";
json.proposal.ruReason = "Получая модель, а не читая файлы сама, проверка или генератор проекта находит узлы по расположению, находит ответственных и проходит по связям так же, как инструменты SpecSheriff, на каком бы языке проект её ни написал. Статус одобрения и флаг `strict` входят в модель, потому что они меняют то, что требует проверка проекта.";
json.proposal.reasonChange = "Как было в узле «The commands»; второе предложение новое.";
json.proposal.refs = [...impl(["s-2fau85dfyyeq66m", "s-km4x4s26kv7pjze"]), ...cites(["s-9ttvcwpqkehm58g", "s-5fewsp22mmdz7y6", "s-6sk8uet75dmq5qz", "s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2"])];
json.proposal.removed = ["The paragraph on how a project's check and generator are handed the model: it retold s-7pk89t8z6wymmj9 and the node on running a generator."];
rerender(json.proposal);
json.review = review1 + ": ready once its fixes were made; fix-commands-b3.mjs made them";

// `sheriff todos`.
const todos = drafts["new:tools-2-todos"];
todos.proposal.ruTitle = "Перечень todo";
todos.proposal.parts = [
  P("`sheriff todos` prints as text every item of `meta.todos` (§s-t28j22vbdmmeqnh) of the nodes in the files that the repository keeps.",
    "`sheriff todos` печатает текстом каждый элемент `meta.todos` (§s-t28j22vbdmmeqnh) узлов в файлах, которые хранит репозиторий.",
    "Из узла «The commands». Было: и узлы guidelines из плагина. Теперь только файлы, которые хранит репозиторий: todo из guidelines плагина проект выполнить не может."),
  P("The items are listed newest first, and the items of one day by the path of their file in code-point order, then in the order of their nodes in that file. Each item is printed with its date, its author, what is to be done, and the sid, the location and the title of its node.",
    "Элементы идут от новых к старым, а элементы одного дня — по пути их файла в порядке кодовых точек, затем в порядке их узлов в этом файле. Каждый элемент печатается с датой, автором, тем, что нужно сделать, и sid, расположением и заголовком его узла.",
    "Как было; порядок внутри дня теперь задан явно.")
];
todos.proposal.ruReason = "Todo хранится в узле, которого он касается (§s-t28j22vbdmmeqnh), поэтому его находят там, где этот узел. Собранные вместе, todo показывают всю отложенную работу сразу, начиная с последней.";
rerender(todos.proposal);
todos.review = review1 + ": ready once its fixes were made; fix-commands-b3.mjs made them";

// `sheriff guide`.
const guide = drafts["new:tools-2-guide"];
guide.proposal.parts = [
  P("`sheriff guide` prints the guidelines that the project follows, each node with its links and without its metadata (§s-k4nqjr96ux7a5m7):",
    "`sheriff guide` печатает guidelines, которым следует проект, каждый узел со связями и без метаданных (§s-k4nqjr96ux7a5m7):",
    "Из узла «The commands». Было: «каждый узел guidelines — базы, описания инструментов и собственных guidelines проекта»."),
  L("the SpecSheriff guidelines;", "SpecSheriff guidelines;", "Как было."),
  L("each extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g);", "каждое расширение guidelines, которое выбрал проект (§s-9ttvcwpqkehm58g);", "Новое: правило 1.7.5."),
  L("the project's own guidelines (§s-u7tw6m8npxmv5tu).", "собственные guidelines проекта (§s-u7tw6m8npxmv5tu).", "Как было."),
  P("For each other extension that the plugin delivers, it prints the extension's name and what the extension is for.",
    "О каждом другом расширении, которое поставляет плагин, он печатает его имя и назначение.", "Новое."),
  P("After the guidelines, it prints the appendix of the tools, under a heading that says it is no part of them (§s-a4rbry4hsu34hy8).",
    "После guidelines он печатает описание инструментов под заголовком, который говорит, что оно в них не входит (§s-a4rbry4hsu34hy8).",
    "Предлагаю, вопреки согласованному плану: синтаксис SpecTag и команды описаны только в описании инструментов, а skill `spec` велит агенту сначала прочитать то, что печатает `sheriff guide`."),
  P("It also prints how many nodes each part of the specification holds and how many of them are approved, counted when it runs. It prints whether the specification is approved (§s-qzthyh7yqvfhsa2) and whether its `strict` flag is on (§s-q3pfzyaxvpr2zj2).",
    "Он также печатает, сколько узлов в каждой части спецификации и сколько из них одобрено, подсчитав это при запуске. Он печатает, одобрена ли спецификация (§s-qzthyh7yqvfhsa2) и включён ли её флаг `strict` (§s-q3pfzyaxvpr2zj2).",
    "Как было; новое — флаг `strict`, от которого зависит, отвергается ли коммит.")
];
guide.proposal.reason = "An agent reads the guidelines before it works on the specification. Printed by one command, they are exactly the rules that the project follows, whatever release and extensions it uses. The appendix of the tools follows them because it holds what an agent needs to apply them with the SpecSheriff tools, such as the syntax of the SpecTag.";
guide.proposal.ruReason = "Агент читает guidelines, прежде чем работать со спецификацией. Напечатанные одной командой, они — ровно те правила, которым следует проект, каким бы ни был его выпуск и выбранные расширения. Описание инструментов идёт за ними, потому что в нём то, что нужно агенту, чтобы применять их с инструментами SpecSheriff, например синтаксис SpecTag.";
guide.proposal.refs = [...impl(["s-a4rbry4hsu34hy8", "s-9ttvcwpqkehm58g"]), ...cites(["s-k4nqjr96ux7a5m7", "s-u7tw6m8npxmv5tu", "s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2"])];
rerender(guide.proposal);
guide.review = review1 + ": ready once its fixes were made, and the reviewer shares the doubt about the appendix of the tools; fix-commands-b3.mjs made the fixes";
guide.doubt = "The node proposes, against the plan that the owner agreed to, that `sheriff guide` print the appendix of the tools after the guidelines. To be put to the owner with the node.";

// `sheriff settings`.
const settings = drafts["new:tools-2-settings"];
settings.proposal.parts = [
  P("`sheriff settings` shows and changes the settings that only an owner of the specification changes: the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2), and the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g).",
    "`sheriff settings` показывает и меняет настройки, которые меняет только ответственный за спецификацию: статус одобрения спецификации (§s-qzthyh7yqvfhsa2), её флаг `strict` (§s-q3pfzyaxvpr2zj2) и выбранные проектом расширения guidelines (§s-9ttvcwpqkehm58g).",
    "Новое: по вашему решению от 18 ноября эти настройки меняет программа в терминале."),
  P("Run in a terminal with no arguments, it shows these settings and every extension that the plugin delivers. It then lets the person who runs it change each of them. Run without a terminal and with no arguments, it prints them.",
    "Запущенная в терминале без аргументов, она показывает эти настройки и каждое расширение, которое поставляет плагин. Затем она даёт тому, кто её запустил, изменить каждую из них. Запущенная без терминала и без аргументов, она их печатает.",
    "Новое. Печать без терминала — чтобы агент мог прочитать настройки."),
  P("Run with one of the following arguments, it makes that one change:", "Запущенная с одним из следующих аргументов, она делает только это изменение:", "Новое."),
  L("`status approved` or `status draft`, for the specification's approval status;", "`status approved` или `status draft` — для статуса одобрения спецификации;", "Новое: каждый аргумент — настройка и её значение, как предложил рецензент."),
  L("`strict on` or `strict off`, for the `strict` flag;", "`strict on` или `strict off` — для флага `strict`;", "Новое."),
  L("`extension <name> on` or `extension <name> off`, for the choice of an extension.", "`extension <имя> on` или `extension <имя> off` — для выбора расширения.", "Новое."),
  P("It records each change as an entry in `sheriff.config.json` that names the person who made the change, by the email address that git is configured with. It records a change only when that person is an owner of the specification (§s-6sk8uet75dmq5qz), and refuses it otherwise.",
    "Каждое изменение она записывает в `sheriff.config.json` записью, которая называет того, кто сделал изменение, по адресу электронной почты, заданному в git. Она записывает изменение, только если этот человек — ответственный за спецификацию (§s-6sk8uet75dmq5qz), а иначе отвергает его.",
    "Новое: так требуют правила 10.6, 10.7 и 1.7.5."),
  P("It records or refuses each change as the rules on these settings require (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Without a terminal, the owner confirms an approval that those rules require to be confirmed by adding `--confirm` to `status approved`.",
    "Каждое изменение она записывает или отвергает так, как требуют правила об этих настройках (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-j8y62pa9hzz6nwx). Без терминала ответственный подтверждает одобрение, которое эти правила требуют подтвердить, добавив `--confirm` к `status approved`.",
    "Новое: заменяет три абзаца, которые пересказывали правила 10.6, 10.7 и 1.7.6."),
  P("It records the choice of an extension only where the plugin delivers that extension (§s-j5qmmdq4m26mdvw).",
    "Выбор расширения она записывает, только если плагин поставляет это расширение (§s-j5qmmdq4m26mdvw).", "Новое: так требует строка 10.1.27c."),
  P("A refusal caused by the `strict` flag names, for each check that would refuse, the command that lists what that check finds:",
    "Отказ из-за флага `strict` называет для каждой проверки, которая отвергла бы изменение, команду, перечисляющую то, что эта проверка находит:", "Новое: так требует правило 10.7."),
  L(`\`sheriff untagged\`, for the check of code without a SpecTag (§${sids.untagged});`, `\`sheriff untagged\` — для проверки кода без SpecTag (§${sids.untagged});`, "Новое."),
  L("for a project's own check, the command that `sheriff.config.json` names for it (§s-7pk89t8z6wymmj9).", "для собственной проверки проекта — команду, которую для неё называет `sheriff.config.json` (§s-7pk89t8z6wymmj9).", "Новое.")
];
settings.proposal.reason = "One program shows these settings together, so that an owner sees the project's state in one place. The same program takes each change as an argument, so that an agent working for that owner makes the change under the same checks.";
settings.proposal.ruReason = "Одна программа показывает эти настройки вместе, чтобы ответственный видел состояние проекта в одном месте. Та же программа принимает каждое изменение аргументом, чтобы агент, работающий на этого ответственного, делал его с теми же проверками.";
settings.proposal.refs = [...impl(["s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-j8y62pa9hzz6nwx"]), ...cites(["s-6sk8uet75dmq5qz", "s-j5qmmdq4m26mdvw", sids.untagged, "s-7pk89t8z6wymmj9"])];
rerender(settings.proposal);
settings.review = review1 + ": not ready; split and rewritten by fix-commands-b3.mjs as the reviewer proposed, back for a second review";
delete settings.doubt;
settings.resolved = "The reviewer agreed that the node needs no command for a check that a rule of an extension or of a project's own guidelines makes stricter: the tools carry out such a rule only through the project's own check (s-2fau85dfyyeq66m), which the node covers.";

// `sheriff untagged`.
drafts["new:tools-2-untagged"] = {
  agreed: false,
  from: "s-f5rz6b7dhxejjts",
  location: "tools 2.11 (new)",
  sidValue: sids.untagged,
  testsFrom: ["match no test"],
  proposal: {
    title: "The list of the code that carries no SpecTag",
    ruTitle: "Перечень кода без SpecTag",
    parts: [
      P("`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that carries no SpecTag (§s-8xw4mgvpexyvw5q). The check of code without a SpecTag names this command in its warning and its refusal (§s-kkbqcb9xrpaepwn).",
        "`sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), у которого нет SpecTag (§s-8xw4mgvpexyvw5q). Проверка кода без SpecTag называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).",
        "Новое: правила 9.5 и 10.7 требуют команду, которая перечисляет код без SpecTag. Сейчас такой команды нет.")
    ],
    reason: "The check reports such code in a single warning, so that it does not bury the other findings. An author who wants to bind that code to its rules finds it, symbol by symbol, with this command.",
    ruReason: "Проверка сообщает о таком коде одним предупреждением, чтобы оно не заслоняло другие находки. Автор, который хочет связать этот код с его правилами, находит его, символ за символом, этой командой.",
    reasonChange: "Новое.",
    refs: [...impl(["s-kkbqcb9xrpaepwn"]), ...cites(["s-hheus6f395ynqvc", "s-8xw4mgvpexyvw5q"])],
    date: "2026-11-22",
    removed: []
  },
  review: review1 + ": split out of the node on `sheriff settings` as the reviewer proposed, to be reviewed a second time"
};
rerender(drafts["new:tools-2-untagged"].proposal);

// The agreed node that lists the commands: a technical replacement.
const list = drafts["s-f5rz6b7dhxejjts"].proposal;
const fixList = (start, pairs, key) => { const x = list.parts.find((y) => y.en.startsWith(start)); for (const [a, b] of pairs) x[key] = swap(x[key], a, b); };
fixList("`sheriff types`:", [["the types and runtime checks for the RecordTypes", "the types and RuntimeChecks for the RecordTypes"]], "en");
fixList("`sheriff types`:", [["типы и проверки во время работы для RecordType", "типы и RuntimeChecks для RecordType"]], "ru");
fixList("`sheriff todos`:", [["каждую задачу на потом", "каждый todo"]], "ru");
fixList("`sheriff untagged`:", [["(§s-chsfpkgpmfk4fft)", `(§${sids.untagged})`]], "en");
fixList("`sheriff untagged`:", [["(§s-chsfpkgpmfk4fft)", `(§${sids.untagged})`]], "ru");
rerender(list);
if (!list.refs.some((r) => r.to === sids.untagged)) list.refs.push({ type: "cites", to: sids.untagged });
drafts["s-f5rz6b7dhxejjts"].technical = [...(drafts["s-f5rz6b7dhxejjts"].technical ?? []), "2026-11-22: `sheriff untagged` points to its own node, and \"runtime checks\" is written \"RuntimeChecks\" (fix-commands-b3.mjs)."];
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
const start = t.indexOf("- propose-commands-b.mjs drafted the nodes of the second group");
const end = t.indexOf("\n\nStage 1 was");
if (start < 0 || end < start) throw new Error("continuation: the second group's paragraph not found");
t = t.slice(0, start) + `- propose-commands-b.mjs drafted the nodes of the second group, which describe \`sheriff types\`, \`sheriff json\`, \`sheriff todos\`, \`sheriff guide\`, and \`sheriff settings\` together with \`sheriff untagged\`; tools-drafts.before-commands-b.json is a copy of the drafts made before that script ran. fix-commands-b2.mjs revised them before review.
- specsheriff-rule-reviewer's first report on the second group found the nodes on \`sheriff json\`, \`sheriff todos\` and \`sheriff guide\` ready once its fixes were made, and the nodes on \`sheriff types\` and \`sheriff settings\` not ready. fix-commands-b3.mjs applied the report; tools-drafts.before-commands-b3.json is a copy of the drafts made before that script ran:
  - The node on \`sheriff types\` is now titled "What \`sheriff types\` generates". In it, only a RecordType relies on other nodes: on each RecordType that it refines or that one of its fields refers to. The types and RuntimeChecks take the values gathered beside a field as they are when \`sheriff types\` runs, since those values come, for example, from domains' headers, which nobody approves; this is put to the owner with the node. The node also says where the last approved wording of a node is found: in the files of the specification, or else in the latest commit of the current branch that holds it.
  - A new node, "How a project's own code generator is run" (s-y5yk7eu6h4zrjpr), takes the paragraphs on running a generator. The generator is handed a model built from the last approved wordings, which holds only the nodes that code may be generated from.
  - The model that \`sheriff json\` prints also holds the nodes taken from the plugin, the specification's approval status and its \`strict\` flag.
  - \`sheriff todos\` lists only the todos in the files that the repository keeps.
  - The node on \`sheriff guide\` proposes that \`sheriff guide\` print the appendix of the tools after the guidelines, under a heading that says it is no part of them. This departs from the plan that the owner agreed to, so it is put to the owner with the node. \`sheriff guide\` also prints whether the \`strict\` flag is on.
  - The node on \`sheriff settings\` takes the arguments \`status approved|draft\`, \`strict on|off\` and \`extension <name> on|off\`, and \`--confirm\` for an approval confirmed without a terminal. A new node, "The list of the code that carries no SpecTag" (s-weuyx98r7c923ab), describes \`sheriff untagged\`. As a technical replacement, the agreed node that lists the commands now points to that node for \`sheriff untagged\`, and writes "RuntimeChecks".
  The nodes on \`sheriff types\`, on running a generator, on \`sheriff settings\` and on \`sheriff untagged\` have been passed to specsheriff-rule-reviewer for a second review. Meanwhile the nodes that passed are shown to the owner one at a time, starting with the node on \`sheriff json\`.
- The reviewer also found changes that other nodes need, to be made when the review reaches them. "Generated copies against the nodes" (s-dbk2vyeg8z5jxna) still compares a waiting copy with the last commit, cites s-f5rz6b7dhxejjts, and refuses a RecordType with two fields of type \`variant\`. "How a project's own check is run" (s-7pk89t8z6wymmj9) names \`sheriff model\`, which a technical replacement changes to \`sheriff json\`. The skill \`spec\` of both plugins says what \`sheriff guide\` prints, and the tests at generated.test.ts:278 and commands.test.ts:85 check it; they change in stage 3.` + t.slice(end);
for (const [from, to] of [
  ["agree-reindex-earlier.mjs marked its draft as agreed", "agree-reindex-earlier.mjs marked that node's draft as agreed"],
  ["On 2026-11-21 the owner agreed to it («ок»), with the example and with the merge in the project's extension of the schema. agree-reindex-twice.mjs marked its draft as agreed",
    "On 2026-11-21 the owner agreed to the node («ок»), including the example and the merge in the project's extension of the schema. agree-reindex-twice.mjs marked the node's draft as agreed"],
  ["as its text always meant", "which is what its text has always said"]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = s.replaceAll("is tools-drafts.json as it was before that script ran", "is a copy of tools-drafts.json made before that script ran");
s = swap(s, "(tools-drafts.before-commands-b.json is tools-drafts.json before it ran)", "(tools-drafts.before-commands-b.json is a copy of tools-drafts.json made before that script ran)");
s = swap(s, "(tools-drafts.before-commands-b2.json is tools-drafts.json before it ran).",
  "(tools-drafts.before-commands-b2.json is a copy of tools-drafts.json made before that script ran). fix-commands-b3.mjs applies specsheriff-rule-reviewer's first report on that group and adds the nodes on running a generator and on `sheriff untagged` (tools-drafts.before-commands-b3.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● вторая группа: черновики sheriff types, json, todos, guide, settings и untagged у рецензента",
  "- ● «Модель спецификации» (sheriff json): показан вам\n- ○ «Перечень todo» (sheriff todos), «Guidelines, напечатанные в одном месте» (sheriff guide)\n- ○ у рецензента второй раз: «Что порождает sheriff types», «Как запускается генератор проекта», «Настройки» (sheriff settings), «Перечень кода без SpecTag» (sheriff untagged)");
o = swap(o, "\n\n## ○ Затем:", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Согласие с узлом «Модель спецификации»\n- что входит в модель, которую печатает sheriff json\n\n### ○ Вопросы, которые придут с узлами\n- sheriff types: собранные значения берутся такими, какие они есть при запуске\n- sheriff guide: печатать ли описание инструментов после guidelines\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(json.proposal.text + "\n\nREASON: " + json.proposal.reason + `\n\nupdated at ${now}`);
