// T25, stage 2, group 3: drafts the new wordings of the nodes of items 27 to 32 of the order in stage2-inventory.md:
// the entries that only an owner of the specification records, the chosen extensions and the installed plugin, what a
// commit changes in the code and the tests, the code and tests of a draft rule, a node's `meta.code` and `meta.tests`,
// a list and its declaration, the list of a project's own kinds of node, and an object in a list. They implement rows
// 10.1.27, 10.1.27a, 10.1.27b, 10.1.27c, 10.1.28a, 10.1.34, 10.1.35 and 10.1.36 of the main table of checks, and rules
// 9.4 and 1.5.2. It also proposes a change to the agreed "What `sheriff reindex` writes" (proposal:s-ztseyetus7np6br),
// under the key proposal:s-ztseyetus7np6br-g3, which carries out row 10.1.34 and rule 1.5.2. Copies tools-drafts.json to tools-drafts.before-group3.json first, checks every draft (citations against
// links, the Russian citing the same sids, no citation by location outside backticks, new sids unique, link targets
// existing, no key outside the group changed), and only then writes. It also writes english-group3.md, the English of
// every node of the group, for EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of this
// group from the copy made before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group3.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";

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

// The sids of the new nodes, checked below to be unique across specs/, moved/ and tools-drafts.json.
const SID = {
  changedLine: "s-u6mj5yv8ngnz79v",
  draftRule: "s-w93jfnqynfa47pf",
  delivered: "s-mhsb6fjsq5xn6c9",
  ownKinds: "s-czxaqvaesmu3gru",
};
const S = SID;

// The rows of the main table of checks that the group implements.
const ROW = {
  r27: "s-pa8t49pqpwscuq7",
  r27a: "s-y5w6xwvwh857azx",
  r27b: "s-dxzq5rd6eeteza4",
  r27c: "s-j5qmmdq4m26mdvw",
  r28a: "s-wpadgy2budcxa3v",
  r34: "s-tqdmk6jakx97wra",
  r35: "s-f5mm7tagez38ffz",
  r36: "s-yuu4ccgch68yzxb",
};

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 27: "From a draft to an approved specification, and back" (s-j9r8z4xdrfkfs47), now rows 10.1.27, 10.1.27a and
// 10.1.27b: the entries for the settings that only an owner of the specification changes.
// ---------------------------------------------------------------------------------------------------------------
add("s-j9r8z4xdrfkfs47", {
  location: "tools 7.2.3",
  sidValue: "s-j9r8z4xdrfkfs47",
  testsFrom: [
    "counts a withdrawal of the rule's approval of whichever wording, by one of the specification's owners as the commit holds them",
    "reads the specification before the commit as an earlier release wrote it, checked standing for approved",
  ],
  proposal: {
    title: "Entries that only an owner of the specification records",
    ruTitle: "Записи, которые вносит только ответственный за спецификацию",
    titleChange: "Было: «From a draft to an approved specification, and back». Узел больше не проверяет переход спецификации из черновика в одобренную по правилу в `project.json`: по правилу 10.6 статус одобрения задают записи ответственного. Теперь узел проверяет записи всех трёх настроек, которые меняет только ответственный, как требуют строки 10.1.27, 10.1.27a и 10.1.27b.",
    parts: [
      P("`sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) for a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), provided that both of the following hold:",
        "`sheriff binding` принимает изменение, которое коммит вносит в записи в `sheriff.config.json` (§s-zefk589ykh37b8u) для настройки, которую меняет только ответственный за спецификацию (§s-chsfpkgpmfk4fft), при условии, что выполнено и то и другое:",
        "Было: «`sheriff binding` следит за переходом спецификации из черновика в одобренную и обратно; он читает правило, которое одобряет спецификацию, в `project.json`». По вашему решению по строке 10.1.27 от 2026-11-13 статус одобрения задают записи, которые делает ответственный, и ни один коммит не удаляет и не меняет такую запись. По вашим решениям по строкам 10.1.27a (2026-11-17) и 10.1.27b (2026-11-18) так же проверяются записи флага `strict` и записи о выборе расширения и его отзыве. Поэтому один узел проверяет записи всех трёх настроек. Узел начинается с того, что принимается, и сразу за этим говорит, что отвергается, как согласованный узел «Who an added approval names»."),
      L("after the commit, the first entries for that setting are those that the commit's parent holds, unchanged and in the same order;",
        "после коммита первыми записями для этой настройки остаются записи, которые содержит родительский коммит, неизменными и в том же порядке;",
        "Новое: так проверка находит запись, которую коммит удаляет, меняет или переставляет. Порядок важен, потому что настройку определяет только последняя запись (правила 10.6 и 10.7): запись, вставленная перед прежними или переставленная, изменила бы настройку так же, как удалённая. Новая запись поэтому может только следовать за прежними."),
      L("each entry that follows them names an owner of the specification (§s-6sk8uet75dmq5qz).",
        "каждая запись, которая следует за ними, называет ответственного за спецификацию (§s-6sk8uet75dmq5qz).",
        "Новое: строки 10.1.27, 10.1.27a и 10.1.27b. Запись называет человека по адресу электронной почты, как её записывает `sheriff settings` (согласованный узел «The settings that only an owner of the specification changes»)."),
      P("`sheriff binding` refuses every other change to the entries for a setting that only an owner of the specification changes. The refusal names the setting and each entry concerned. Where an entry names a person who is not an owner of the specification, the refusal also names the specification's owners.",
        "Любое другое изменение записей для настройки, которую меняет только ответственный за спецификацию, `sheriff binding` отвергает. Отказ называет настройку и каждую затронутую запись. Если запись называет человека, который не является ответственным за спецификацию, отказ называет также ответственных за спецификацию.",
        "Было: отвергался коммит, который возвращает спецификацию в черновик без отзыва одобрения правила одним из ответственных. Теперь — что отвергается и что называет отказ."),
      P("The settings that only an owner of the specification changes are the following:",
        "Настройки, которые меняет только ответственный за спецификацию, — это:",
        "Новое: какие это настройки, словами согласованного узла `sheriff settings`, чтобы читателю не нужно было открывать этот узел."),
      L("the specification's approval status (§s-qzthyh7yqvfhsa2);",
        "статус одобрения спецификации (§s-qzthyh7yqvfhsa2);",
        "Пункт списка настроек; см. абзац выше."),
      L("its `strict` flag (§s-q3pfzyaxvpr2zj2);",
        "её флаг `strict` (§s-q3pfzyaxvpr2zj2);",
        "Пункт списка настроек."),
      L("the extensions of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-9ttvcwpqkehm58g).",
        "расширения guidelines (§s-mbmnsnxenmavu3z), которые выбрал проект (§s-9ttvcwpqkehm58g).",
        "Пункт списка настроек."),
      P("`sheriff binding` reads the entries of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv). For a merge commit, the parent is its first parent. `sheriff binding` takes the specification's owners from `project.json` as the commit leaves it.",
        "Записи родительского коммита `sheriff binding` читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv). Для коммита слияния родитель — его первый родитель. Ответственных за спецификацию `sheriff binding` берёт из `project.json` в том виде, в каком его оставляет коммит.",
        "Было: «Спецификацию до коммита он берёт такой, какой её содержит первый родитель коммита, прочитанной так, как её переписал бы `sheriff reindex` (§s-f5rz6b7dhxejjts)». Ссылка теперь ведёт на согласованный узел о том, что `sheriff reindex` меняет в написанном прежним выпуском: он заменяет правило, одобрявшее спецификацию, записью, и эта запись поэтому считается записью родителя, а не новой (как записано в файле продолжения). Ответственные — на момент коммита, как говорят строки, и как в согласованном узле «Who an added approval names». Предложение «у коммита без родителя спецификация до него — черновик» убрано: у такого коммита нет записей родителя, и каждая его запись — новая."),
      P("`sheriff binding` makes this check whether the specification is approved or a draft (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).",
        "Новое: в столбце «On failure» строк 10.1.27, 10.1.27a и 10.1.27b стоит «refused» без условий. Код и тесты без SpecTag за пределами коммита, которые узел раньше сообщал, пока спецификация — черновик, теперь обрабатывает согласованный узел «Code and tests outside the commit that no SpecTag binds» (группа 2)."),
    ],
    reason: "A setting that only an owner of the specification changes is decided by its latest entry, which only an owner records (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g). An entry recorded in another person's name, or an earlier entry removed, edited or moved, would change such a setting without an act of an owner.",
    ruReason: "Настройку, которую меняет только ответственный за спецификацию, определяет её последняя запись, а такую запись вносит только ответственный (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g). Запись от имени другого человека или удалённая, исправленная либо переставленная прежняя запись изменили бы такую настройку без действия ответственного.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "The latest entry for the specification's approval status approves the specification, and the entry before it returned the specification to draft. A person deletes the latest entry by hand, so that the specification would be a draft again. `sheriff binding` refuses the commit, since the first entries for that setting are no longer those of the commit's parent. The most likely mistake is to check only the added entries, which lets the commit return the specification to draft without an owner's entry.",
      "Последняя запись о статусе одобрения спецификации одобряет её, а запись перед ней возвращала спецификацию в черновик. Человек вручную удаляет последнюю запись, чтобы спецификация снова стала черновиком. `sheriff binding` отвергает коммит, потому что первыми записями для этой настройки больше не являются записи родительского коммита. Самая вероятная ошибка — проверять только добавленные записи: тогда коммит возвращает спецификацию в черновик без записи ответственного.")],
    refs: [R("implements", ROW.r27), R("implements", ROW.r27a), R("implements", ROW.r27b),
      R("cites", "s-zefk589ykh37b8u"), R("cites", "s-chsfpkgpmfk4fft"), R("cites", "s-6sk8uet75dmq5qz"),
      R("cites", "s-qzthyh7yqvfhsa2"), R("cites", "s-q3pfzyaxvpr2zj2"), R("cites", "s-mbmnsnxenmavu3z"),
      R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-gb8s9657a65hqmv")],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rows 10.1.27, 10.1.27a and 10.1.27b.",
      "The `implements` link to “The specification's approval status” (s-qzthyh7yqvfhsa2): the node implements row 10.1.27, which checks that rule, and cites the rule.",
      "The `implements` link to “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) and the paragraphs on a symbol and a test that carry no SpecTag: they moved to “Code and tests outside the commit that no SpecTag binds” (s-3xx2eukc8gtd2tx), agreed with group 2.",
      "The rule that approves the specification in `project.json`, and the withdrawal of that rule's approval: the owner replaced both with entries in `sheriff.config.json` on 2026-11-13 (rule 10.6, row 10.1.27).",
      "The citation of “The commands” (s-f5rz6b7dhxejjts): the node cites “What `sheriff reindex` changes in what an earlier release wrote” (s-gb8s9657a65hqmv) instead, as the continuation file records.",
      "“Where the commit has no parent, it takes the specification before the commit as a draft”: a commit with no parent holds no entry of a parent, so each of its entries is one that follows them.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:138-162 reads the rule of project.json that approves the specification (model.ts: approvalRule, statusNow, APPROVAL_RULE) and refuses a commit that puts it back to draft without a withdrawal of that rule's approval. It is to compare instead, for the approval status, the strict flag and the chosen extensions, the entries in sheriff.config.json with those of the commit's first parent, read as sheriff reindex would rewrite them: the parent's entries are to be, unchanged and in the same order, the first entries for each setting, and each later entry is to name an owner of the specification as project.json names the owners after the commit. config.ts (KEYS) is to accept these entries, and config.schema.json, still to be added to moved/specs/_schema/, is to describe them. The branch on APPROVAL_RULE in approvals.ts:111-114 goes. The tests at binding.test.ts:500 and :513 are rewritten first for the entries and carry s-j9r8z4xdrfkfs47. The tests at :464 and :596 go: approving the specification while code carries no SpecTag is settled by sheriff settings (s-chsfpkgpmfk4fft) and rule 10.6. The test at :444 went to s-3xx2eukc8gtd2tx with group 2.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 28: row 10.1.27c, the chosen extensions and the installed plugin. Rows 10.1.27a and 10.1.27b are implemented by
// s-j9r8z4xdrfkfs47 above.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-7-1-extensions-delivered", {
  location: "tools 7.1.2a (new, after \"How the schema of the specification is composed\")",
  sidValue: S.delivered,
  testsFrom: [],
  proposal: {
    title: "The chosen extensions and the installed plugin",
    ruTitle: "Выбранные расширения и установленный плагин",
    parts: [
      P("A command of the SpecSheriff tools that reads the chosen extensions of the guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g) runs only where the installed SpecSheriff plugin delivers each of them (§" + ROW.r27c + "). Where the plugin lacks one of them, the command names each missing extension and the version of the SpecSheriff tools in the plugin, and stops. `sheriff reindex` then leaves every file unchanged.",
        "Команда инструментов SpecSheriff, которая читает выбранные расширения guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g), выполняется, только если установленный плагин SpecSheriff поставляет каждое из них (§" + ROW.r27c + "). Если плагину недостаёт одного из них, команда называет каждое недостающее расширение и версию инструментов SpecSheriff в плагине и останавливается. `sheriff reindex` при этом оставляет все файлы неизменными.",
        "Новое: строка 10.1.27c. По вашему решению по ней от 2026-11-18 проект выбирает только среди расширений, которые поставляет плагин, а проверки следят, чтобы установленный выпуск поставлял каждое выбранное расширение. Согласованный узел `sheriff settings` уже не даёт записать выбор расширения, которого плагин не поставляет; этот узел ловит случай, когда выбор записан, а плагин на машине его не поставляет: более ранний выпуск плагина у участника команды или правка `sheriff.config.json` вручную. Останавливается каждая команда, которая читает выбранные расширения: без файла расширения она не может работать по его правилам. Версия названа, чтобы человек знал, что нужно обновить плагин."),
      P("The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which compose the schema of the specification with the schema of each chosen extension (§s-xzcw3hv4hmxz7h7). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).",
        "Среди команд, которые читают выбранные расширения, — `sheriff validate`, `sheriff binding` и `sheriff reindex`, которые составляют схему спецификации со схемой каждого выбранного расширения (§s-xzcw3hv4hmxz7h7). Плагин поставляет расширение, если файл расширения находится по пути, указанному для каждого расширения guidelines (§s-zefk589ykh37b8u).",
        "Новое: какие команды — прежде всего те, что проверяют коммит, так что при отсутствии расширения коммит отвергается, как требует строка. Что значит «поставляет», сказано через согласованный узел «Where the files are», который даёт путь к файлу каждого расширения и в папке инструментов, и в репозитории, где пишутся SpecSheriff guidelines."),
      P("Each command that reads the chosen extensions makes this check whether the specification is approved or a draft (§" + ROW.r27c + ").",
        "Каждая команда, которая читает выбранные расширения, выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§" + ROW.r27c + ").",
        "Новое: в столбце «On failure» строки 10.1.27c стоит «refused, naming the extension» без условий."),
    ],
    reason: "Without an extension's file, the SpecSheriff tools can neither compose the schema that the extension adds nor run the checks of its table (§s-gpzs5fcxvp6jkrp). A command that ran without the file would accept on one machine what the same command refuses on a machine whose plugin delivers the extension.",
    ruReason: "Без файла расширения инструменты SpecSheriff не могут ни составить схему, которую добавляет расширение, ни выполнить проверки его таблицы (§s-gpzs5fcxvp6jkrp). Команда, выполненная без этого файла, принимала бы на одной машине то, что та же команда отвергает на машине, где плагин поставляет расширение.",
    reasonChange: "Новое.",
    examples: [X(
      "A project chooses an extension that a new release of the SpecSheriff plugin delivers. A team member's machine still has an earlier release, which does not deliver it. On that machine, `sheriff validate` names the extension and the earlier release's version, and stops, so the git hook refuses the commit. The most likely mistake is to compose the schema without the missing extension, which accepts on that machine a node that the extension's checks would refuse.",
      "Проект выбирает расширение, которое поставляет новый выпуск плагина SpecSheriff. На машине одного из участников команды всё ещё стоит более ранний выпуск, который его не поставляет. На этой машине `sheriff validate` называет расширение и версию более раннего выпуска и останавливается, поэтому git hook отвергает коммит. Самая вероятная ошибка — составить схему без недостающего расширения: тогда на этой машине принимается узел, который отвергли бы проверки расширения.")],
    refs: [R("implements", ROW.r27c), R("cites", "s-mbmnsnxenmavu3z"), R("cites", "s-9ttvcwpqkehm58g"), R("cites", "s-xzcw3hv4hmxz7h7"),
      R("cites", "s-zefk589ykh37b8u"), R("cites", "s-gpzs5fcxvp6jkrp")],
    removed: [],
    date: DATE,
  },
  stage3: "No code reads the extensions that a project has chosen. Each command that reads them is to check first that the file of each chosen extension is at its path in the folder of the SpecSheriff tools (guidelines/extensions/<name>.json), or, in the repository where the SpecSheriff guidelines are written, at specs/_guidelines/extensions/<name>.json; otherwise it is to name each missing extension and the version that sheriff --version prints, and to exit with a refusal, sheriff reindex writing nothing. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 29: "The symbols a commit changes" (s-2x58az67bm6cxq2), now what a commit adds, changes and removes in the code
// and the tests (rules 9.4 and 1.5.2), split in two: the units that a commit changes, and a line that changes the code.
// Row 10.1.28a moves to a node of its own, "The code and the tests of a draft rule".
// ---------------------------------------------------------------------------------------------------------------
add("s-2x58az67bm6cxq2", {
  location: "tools 7.2.1",
  sidValue: "s-2x58az67bm6cxq2",
  testsFrom: [
    "counts a change to a tag as a change to the symbol's code",
    "counts a test whose only change is its sid as a test the commit changes",
  ],
  proposal: {
    title: "The code and the tests that a commit changes",
    ruTitle: "Код и тесты, которые меняет коммит",
    titleChange: "Было: «The symbols a commit changes». Узел говорит теперь не только о символах, но и о тестах, о файлах, привязанных целиком, и о SpecTag, как просили заметки группы 2 (пункт 2).",
    parts: [
      P("The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. A file that the commit moves or renames is compared with the file at its earlier path.",
        "Инструменты SpecSheriff находят, что коммит добавляет, меняет и удаляет в коде системы (§s-hheus6f395ynqvc), в том числе в его тестах. Они сравнивают каждый файл в том виде, в каком его оставляет коммит, с тем же файлом в родительском коммите. Для коммита слияния родитель — его первый родитель. Файл, который коммит перемещает или переименовывает, сравнивается с файлом по его прежнему пути.",
        "Было: «`sheriff binding` находит, какие символы кода системы вне его тестов меняет коммит». Действующее лицо — инструменты SpecSheriff: на этот узел опираются `sheriff binding`, `sheriff review` и `sheriff commit-message`. Узел охватывает и тесты: согласованные узлы группы 2 ссылаются на него, говоря о тестах, которые коммит добавляет, меняет или оставляет неизменными. Слова «вне его тестов» убраны, как вы просили 2026-11-20. С чем сравнивается файл — так же, как в согласованном узле «Who an added approval names»."),
      P("The commit changes a symbol (§s-kgbzk2ph9e6jfb4) or a test (§s-zrsc6asgmhv8tnc) where one of its lines changes the code (§" + S.changedLine + "). A symbol's lines run from its first line to its last, including its decorators. A line that changes the code changes every symbol and every test that holds it, so a change in a nested symbol also changes each symbol that encloses it.",
        "Коммит меняет символ (§s-kgbzk2ph9e6jfb4) или тест (§s-zrsc6asgmhv8tnc), если одна из его строк меняет код (§" + S.changedLine + "). Строки символа идут от его первой строки до последней, включая его декораторы. Строка, которая меняет код, меняет каждый символ и каждый тест, в которых она находится, поэтому изменение во вложенном символе меняет и каждый символ, в который он вложен.",
        "Было: «Изменённая строка засчитывается символу, в котором она стоит. Изменение в любом месте символа — изменение всего символа». Какая строка меняет код, теперь говорит отдельный узел «A line that changes the code»: по правилу 7.3.3 это отдельное требование, и по вашему решению по правилу 9.4 от 2026-11-11 описание инструментов должно точно сказать, как они читают изменение. Вложенный символ: по правилу 1.5.2 SpecTag над символом привязывает и вложенные в него символы."),
      P("A line that the commit removes is read in the commit's parent. A line that it adds is read in the file as the commit leaves it. A symbol or a test of the parent is the same as the one of the same name in the file as the commit leaves it. Of the symbols and the tests that a commit changes, it adds those that the commit's parent does not hold. It removes those that the commit's parent holds and the file as the commit leaves it does not.",
        "Строка, которую коммит удаляет, читается в родительском коммите. Строка, которую он добавляет, читается в файле в том виде, в каком его оставляет коммит. Символ или тест родителя — тот же, что символ или тест с тем же именем в файле в том виде, в каком его оставляет коммит. Из символов и тестов, которые меняет коммит, он добавляет те, которых нет в родительском коммите. Он удаляет те, которые есть в родительском коммите, но которых нет в файле в том виде, в каком его оставляет коммит.",
        "Новое: так удаление строк внутри символа меняет этот символ, а удаление символа целиком учитывается как удаление. Что коммит удаляет, нужно узлу «The code and the tests of a draft rule» (строка 10.1.28a) и строке 10.1.41, по вашему решению по которой от 2026-11-20 коммит включает правило, если меняется код или тест, привязанный к нему до коммита или после него."),
      P("The commit changes a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) where it changes any of the file's text, including a comment or spacing (§s-kgbzk2ph9e6jfb4). The commit adds such a file where the commit's parent holds no file at its path. It removes such a file where it does not leave the file in the repository.",
        "Коммит меняет файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), если меняет любую часть текста файла, в том числе комментарий или пробелы (§s-kgbzk2ph9e6jfb4). Коммит добавляет такой файл, если в родительском коммите нет файла по его пути. Он удаляет такой файл, если не оставляет его в репозитории.",
        "Новое: по правилу 1.5.2 (ваше решение от 2026-11-17) изменение в любом месте файла, привязанного целиком, — изменение кода, который привязывают его SpecTag. В таком файле — это файлы на языке, для которого нет описания, и файлы без комментариев — инструменты SpecSheriff не могут отличить комментарий от кода, поэтому изменение комментария тоже считается изменением. Изъятие правила 9.4 для комментариев действует там, где инструменты различают комментарии: в файлах, привязанных по символам."),
      P("A commit also changes each symbol, file bound as a whole and test whose SpecTags (§s-8xw4mgvpexyvw5q) it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).",
        "Коммит меняет также каждый символ, файл, привязанный целиком, и тест, SpecTag (§s-8xw4mgvpexyvw5q) которых он меняет (§s-9j2mmnuuwmx5ksn). Коммит меняет SpecTag символа, файла или теста, если SpecTag привязывает его либо в родительском коммите, либо после коммита, но не в обоих случаях. Два SpecTag одинаковы, только если одинаковы их тексты, в том числе текст после `@spec none` (§s-5z5gnu7pahr82xp).",
        "Было: «Строка, содержащая SpecTag, до коммита или после него, засчитывается символу, который этот SpecTag помечает». По правилу 9.4 и вашему решению по нему от 2026-11-10 SpecTag должен оставаться тем же, поэтому изменение SpecTag определяется по его тексту, а не по строке: переформатированный комментарий вокруг неизменённого SpecTag ничего не меняет. "),
      P("The SpecTags of a file that the bindings file (§s-trwczfskj5zmuft) binds are those that the file's entry holds. A commit adds an entry of the bindings file where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.",
        "SpecTag файла, который привязывает файл привязок (§s-trwczfskj5zmuft), — это те, которые содержит запись этого файла. Коммит добавляет запись файла привязок, если в родительском коммите нет записи для того же файла. Он меняет запись, SpecTag которой отличаются от SpecTag записи того же файла в родительском коммите.",
        "Новое, по заметкам группы 2 (пункт 2): изменение записи в файле привязок — изменение SpecTag этого файла и поэтому его кода (правило 9.4). Согласованный узел «SpecTags on the system's code other than tests» отвергает запись, которую коммит добавляет или меняет, если она не для файла кода без комментариев; этот абзац говорит, какие записи коммит добавляет или меняет."),
      P("A commit adds or changes each SpecTag on a line that it adds, and each SpecTag in an entry that it adds or changes. The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.",
        "Коммит добавляет или меняет каждый SpecTag на строке, которую он добавляет, и каждый SpecTag в записи, которую он добавляет или меняет. Исключение — SpecTag, который привязывает тот же символ, файл или тест с тем же текстом, что и в родительском коммите.",
        "Новое: согласованный узел «SpecTags on the system's code other than tests» отвергает SpecTag, который коммит добавляет или меняет, в том числе SpecTag не на своём месте, который ничего не привязывает. Это предложение говорит, какие SpecTag коммит добавляет или меняет; переформатированный комментарий вокруг прежнего SpecTag его не добавляет и не меняет."),
      P("A commit leaves unchanged each symbol, file bound as a whole and test that it leaves in the repository and neither adds nor changes.",
        "Коммит оставляет неизменными каждый символ, файл, привязанный целиком, и тест, которые он оставляет в репозитории и не добавляет и не меняет.",
        "Новое: на «оставляет неизменным» ссылается согласованный узел «Code and tests outside the commit that no SpecTag binds»."),
    ],
    reason: "Each check of a commit judges only what the commit adds, changes or removes. One account of what that is lets every check judge the same changes, each with the whole of the code that its SpecTags bind (§s-9j2mmnuuwmx5ksn).",
    ruReason: "Каждая проверка коммита оценивает только то, что коммит добавляет, меняет или удаляет. Единое определение этого позволяет каждой проверке оценивать одни и те же изменения, каждое — вместе со всем кодом, который привязывают его SpecTag (§s-9j2mmnuuwmx5ksn).",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [
      X("A commit deletes one line inside the function `close` and changes nothing else in it. The deleted line is read in the commit's parent, where it is in `close`, so the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.",
        "Коммит удаляет одну строку внутри функции `close` и больше ничего в ней не меняет. Удалённая строка читается в родительском коммите, где она находится в `close`, поэтому коммит меняет `close`. Самая вероятная ошибка — смотреть только на строки, которые коммит добавляет: тогда изменение, сделанное удалением строк, пропускается."),
      X("A commit rewords a comment in a stylesheet bound by SpecTags at its start. The commit changes the stylesheet, since any change to the text of a file bound as a whole counts. The most likely mistake is to leave the comment out, as the SpecSheriff tools do in a file whose language a description covers.",
        "Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла. Коммит меняет таблицу стилей, потому что засчитывается любое изменение текста файла, привязанного целиком. Самая вероятная ошибка — не учитывать комментарий, как это делают инструменты SpecSheriff в файле на языке, для которого есть описание."),
    ],
    refs: [R("implements", "s-9j2mmnuuwmx5ksn"), R("implements", "s-kgbzk2ph9e6jfb4"), R("cites", "s-hheus6f395ynqvc"), R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", S.changedLine), R("cites", "s-5qdjyf6t898rsd4"), R("cites", "s-trwczfskj5zmuft"), R("cites", "s-8xw4mgvpexyvw5q"),
      R("cites", "s-5z5gnu7pahr82xp")],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rules 9.4 and 1.5.2, and row 10.1.28a is implemented by “The code and the tests of a draft rule” (" + S.draftRule + ").",
      "“A line holding a SpecTag, before the commit or after it, counts for the symbol the SpecTag marks”: a SpecTag now counts by its text (rule 9.4 and its ruling of 2026-11-10), so a reformatted comment around an unchanged SpecTag changes nothing.",
      "The exemption of a line that differs only “in an identifier the commit renames throughout”: the owner removed that exemption from rule 9.4 on 2026-11-11.",
      "The exemption of a line that differs only “in a comment” and “in the sid a citation names”: “A line that changes the code” (" + S.changedLine + ") leaves out comments, and a cited sid is part of a comment.",
      "“of the system's code outside its tests”: the node covers the tests too, and the phrase is not used (.claude/vt/rules.md).",
    ],
    date: DATE,
  },
  stage3: "binding.ts:68-102 (readCommit) counts a line holding `@spec` as changed (diff.ts:146 and :160) and maps a removed line to the symbol of the same name. It is to count a change to the SpecTags of a symbol, a file or a test only where their texts differ, so that reformatting a comment around an unchanged SpecTag changes nothing. It is to read the files bound as a whole (SpecTags at the start, entries of sheriff.bindings.json), counting any change of their text and an entry's SpecTags as the file's. It is to tell what a commit removes, for " + S.draftRule + " and for row 10.1.41. The tests at binding.test.ts:89 and :108 are to carry s-2x58az67bm6cxq2. New tests for a file bound as a whole, an entry of the bindings file, deleted lines and a reformatted comment around a SpecTag are written first. At the move, the decisions of 2026-11-06 stay on the node.",
});

add("new:tools-7-2-changed-line", {
  from: "s-2x58az67bm6cxq2",
  location: "tools 7.2.1a (new, after \"The code and the tests that a commit changes\")",
  sidValue: S.changedLine,
  testsFrom: [
    "counts as unchanged a symbol whose lines differ only in a comment, a citation's sid or a name renamed throughout",
    "counts as changed a symbol where a name is replaced but the old one is still spelled",
    "counts as changed a line whose text after // or # stands inside a string",
    "counts as changed a Python line moved out of its block by its indentation alone",
    "counts as unchanged a symbol whose only change is a line inside a comment of several lines",
  ],
  proposal: {
    title: "A line that changes the code",
    ruTitle: "Строка, которая меняет код",
    parts: [
      P("In a file whose language a description covers (§s-33fw3ga4ctd94dq), the SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language, leaving out comments and reading each string literal as one token. In a test (§s-zrsc6asgmhv8tnc), they also leave out the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).",
        "В файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), инструменты SpecSheriff решают, какие из строк, которые коммит удаляет или добавляет, меняют код (§s-9j2mmnuuwmx5ksn). Они читают каждую строку как токены языка файла, опуская комментарии и читая каждый строковый литерал как один токен. В тесте (§s-zrsc6asgmhv8tnc) они опускают также название теста, кроме его SpecTag (§s-8xw4mgvpexyvw5q).",
        "Новое: узел вынесен из «The code and the tests that a commit changes». По вашему решению по правилу 9.4 от 2026-11-11 описание инструментов точно говорит, как они читают изменение: пробелы внутри строки не считаются. Комментарии опускаются, потому что по правилу 9.4 переформулировка комментариев не меняет ни тест, ни код; с ними опускается и sid цитаты в комментарии. Строковый литерал — один токен, поэтому изменение текста строки, в том числе пробелов в ней, меняет код. Название теста опускается, потому что по правилу 9.4 переименование теста при прежнем SpecTag его не меняет. Строка документации Python — строковый литерал, а не комментарий, поэтому её изменение меняет код."),
      P("The SpecSheriff tools compare each run of consecutive lines that the commit removes with the run of lines that it adds in its place. They leave out of both runs each line that holds no token, such as a blank line or a line that holds only a comment.",
        "Инструменты SpecSheriff сравнивают каждую серию идущих подряд строк, которые коммит удаляет, с серией строк, которые он добавляет на их место. Из обеих серий они опускают каждую строку без токенов, например пустую строку или строку, в которой есть только комментарий.",
        "Новое: сейчас код сравнивает все удалённые строки файла со всеми добавленными, через границы мест изменения; сравнение внутри каждого места изменения не может сопоставить строки из разных мест. Строка без токенов не меняет код: так добавление или удаление строки комментария ничего не меняет, как и сейчас."),
      P("Where the two runs hold the same number of lines, the SpecSheriff tools pair the lines in order. Both lines of a pair change the code where either of the following holds:",
        "Если в обеих сериях одинаковое число строк, инструменты SpecSheriff составляют из строк пары по порядку. Обе строки пары меняют код, если выполнено одно из следующего:",
        "Было в коде (diff.ts), но не в тексте узла."),
      L("the tokens of the two lines differ;",
        "токены двух строк различаются;",
        "Новое в тексте. Переименование идентификатора меняет токены и поэтому меняет код: вы убрали это изъятие из правила 9.4 2026-11-11 (переименование может изменить то, что система показывает вовне)."),
      L("in Python, the indentation of the two lines differs.",
        "в Python различается отступ двух строк.",
        "Было в коде (diff.ts); по вашему решению по правилу 9.4 от 2026-11-11 отступ строки Python считается, потому что он определяет блок, в котором стоит строка."),
      P("Where the two runs hold different numbers of lines, every line of both runs changes the code.",
        "Если в двух сериях разное число строк, каждая строка обеих серий меняет код.",
        "Было в коде (diff.ts), но не в тексте узла."),
    ],
    reason: "A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Read as the tokens of its language, a line changes the code only where the change can alter what the code does. The same change then counts the same way on every machine.",
    ruReason: "Изменение кода заставляет инструменты SpecSheriff снова сверить этот код с его правилами (§s-9j2mmnuuwmx5ksn). Если читать строку как токены её языка, она меняет код, только если изменение может изменить то, что делает код. Тогда одно и то же изменение засчитывается одинаково на любой машине.",
    reasonChange: "Новое.",
    examples: [
      X("A commit changes the line `return total; // in cents` to `return total;  // the total in cents`. The two lines hold the same tokens, so neither of them changes the code. The most likely mistake is to compare the lines as text, which counts a reworded comment as a change to the code.",
        "Коммит меняет строку `return total; // in cents` на `return total;  // the total in cents`. В обеих строках одни и те же токены, поэтому ни одна из них не меняет код. Самая вероятная ошибка — сравнивать строки как текст: тогда переформулированный комментарий засчитывается как изменение кода."),
      X("A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. Its lines hold the same tokens, so the commit leaves the test unchanged. The most likely mistake is to read the test's name as a token, which counts the renamed test as changed.",
        "Коммит переименовывает тест `@spec s-… refuses an empty name` в `@spec s-… refuses a blank name` и больше ничего в нём не меняет. В его строках те же токены, поэтому коммит оставляет тест неизменным. Самая вероятная ошибка — читать название теста как токен: тогда переименованный тест засчитывается как изменённый."),
    ],
    refs: [R("implements", "s-9j2mmnuuwmx5ksn"), R("cites", "s-33fw3ga4ctd94dq"), R("cites", "s-zrsc6asgmhv8tnc"), R("cites", "s-8xw4mgvpexyvw5q")],
    removed: [],
    date: DATE,
  },
  stage3: "diff.ts:130-190 (codeChanges) pairs all the removed lines of a file with all its added lines; it is to pair them within each run that git's comparison replaces. It forgives a name renamed throughout (diff.ts:176-188); that goes, and the test at binding.test.ts:42 is rewritten first to count the rename. diff.ts:146 and :160 count every line holding `@spec` as changed; they go, since s-2x58az67bm6cxq2 counts a change to a SpecTag by its text. binding.ts:42-51 (testLines) counts any line of a test as changed; a test is to be read as code is, with its name outside its SpecTag left out, and testLines goes, as s-utf4mbt7ref8g9c also says. normalize (diff.ts:78) strips `//`, `/*…*/` and `#` in a file that no description covers; it is no longer used there, since such a file is bound as a whole and every change to it counts. The tests at binding.test.ts:42, :49, :56, :69 and :79 are to carry " + S.changedLine + "; a test for a renamed test is written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 29, continued: row 10.1.28a, a node of its own.
// ---------------------------------------------------------------------------------------------------------------
add("new:tools-7-2-draft-rule", {
  from: "s-2x58az67bm6cxq2",
  location: "tools 7.2.2c (new, after \"Code and tests outside the commit that no SpecTag binds\")",
  sidValue: S.draftRule,
  testsFrom: [
    "refuses a tag naming no node, and a tag naming a draft node on a symbol a commit changes",
    "lets a symbol the commit leaves unchanged keep a tag naming a draft node",
    "refuses a test carrying no sid or the sid of no node, and a test a commit changes carrying a draft node's sid",
  ],
  proposal: {
    title: "The code and the tests of a draft rule",
    ruTitle: "Код и тесты правила-черновика",
    parts: [
      P("`sheriff binding` refuses a commit that adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that a SpecTag (§s-8xw4mgvpexyvw5q) naming a draft rule binds (§" + ROW.r28a + "). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names the symbol, the file or the test, with its file and its line.",
        "`sheriff binding` отвергает коммит, который добавляет, меняет или удаляет (§s-2x58az67bm6cxq2) код или тест, привязанный SpecTag (§s-8xw4mgvpexyvw5q), который называет правило-черновик (§" + ROW.r28a + "). Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он называет также символ, файл или тест с его файлом и строкой.",
        "Новое: строку 10.1.28a прежде относили к узлу «The symbols a commit changes», а проверку делали узлы «SpecTags on the system's code» и «The SpecTags the tests carry». По заметкам группы 2 (пункт 2) проверка — одна для кода и тестов, в узле своём. По вашему решению по строке от 2026-11-13 она проверяет, что ни один коммит не добавляет и не меняет код или тест, привязанный к правилу-черновику; по решению от 2026-11-17 — код, который привязывает SpecTag, а не только символ. Удаление тоже отвергается: по принципу «Nothing unapproved is implemented» и правилу 1.3.2 правило-черновик не реализуется, а удаление его кода меняет то, что делает система, так же, как изменение. Строка 10.1.41, по вашему решению от 2026-11-20, тоже считает код, привязанный к правилу до коммита."),
      P("`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. It reads whether a rule is a draft in the specification as the commit leaves it. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).",
        "`sheriff binding` читает SpecTag и в родительском коммите, и в том виде, в каком коммит оставляет код и тесты. Черновик ли правило, он читает в спецификации в том виде, в каком её оставляет коммит. Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).",
        "Новое: SpecTag родительского коммита читаются, чтобы отвергался и коммит, который удаляет код правила-черновика или переносит его SpecTag на другое правило. Статус правила — после коммита: коммит, который вместе с кодом удаляет и само правило, не отвергается, а коммит, который одобряет правило, можно сделать вместе с его кодом. Что считается правилом, говорит согласованный узел «The form of a SpecTag»; SpecTag, который называет узел, не являющийся правилом, отвергают узлы группы 2."),
      P("`sheriff binding` makes this check whether the specification is approved or a draft (§s-utvqbypzhmgndug, §" + ROW.r28a + ").",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-utvqbypzhmgndug, §" + ROW.r28a + ").",
        "Новое: правило 1.3.2 говорит, что правило-черновик не реализуется, без условия о статусе спецификации, а в столбце «On failure» строки 10.1.28a стоит «refused» без условий. По вашему решению от 2026-11-20 (строка 10.1.40) проверки привязки нового кода к правилам выполняются и в черновике."),
    ],
    reason: "A draft rule may still be incomplete or wrong, so code or a test written, changed or removed for it would follow a wording that no owner has approved (§s-utvqbypzhmgndug).",
    ruReason: "Правило-черновик может быть ещё неполным или неверным, поэтому код или тест, написанный, изменённый или удалённый для него, следовал бы формулировке, которую не одобрил ни один ответственный (§s-utvqbypzhmgndug).",
    reasonChange: "Новое.",
    examples: [X(
      "A rule that a function implements is reworded and becomes a draft. Before an owner approves the new wording, a commit deletes the function. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to read the SpecTags only as the commit leaves the code, which lets the deletion pass, since no SpecTag naming the rule is left.",
      "Правило, которое реализует функция, переформулируют, и оно становится черновиком. До того как ответственный одобрит новую формулировку, коммит удаляет функцию. `sheriff binding` отвергает коммит и называет правило. Самая вероятная ошибка — читать SpecTag только в том виде, в каком коммит оставляет код: тогда удаление проходит, потому что SpecTag, называющего правило, не остаётся.")],
    refs: [R("implements", ROW.r28a), R("cites", "s-2x58az67bm6cxq2"), R("cites", "s-8xw4mgvpexyvw5q"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-5z5gnu7pahr82xp"), R("cites", "s-utvqbypzhmgndug")],
    removed: [],
    date: DATE,
  },
  stage3: "binding.ts:180 and :205 refuse the SpecTag of a draft node on a changed symbol or test, as the commit leaves the code only. They are to read the SpecTags of the commit's parent too, to count what the commit removes (s-2x58az67bm6cxq2), to count files bound as a whole and the entries of the bindings file, and to refuse only where the node is a rule of a kind that s-5z5gnu7pahr82xp lists and is a draft as the commit leaves the specification. The draft parts of the tests at binding.test.ts:29 and :101, and the test at :36, are to carry " + S.draftRule + ". Tests for a deleted symbol and for a SpecTag moved off a draft rule are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 30: "A node's `meta.code` and `meta.tests`" (s-t383grkn3q68dpf), row 10.1.34.
// ---------------------------------------------------------------------------------------------------------------
add("s-t383grkn3q68dpf", {
  location: "tools 7.2.5",
  sidValue: "s-t383grkn3q68dpf",
  testsFrom: [
    "refuses a node's lists of code and tests that the tags and the tests' sids do not produce",
  ],
  proposal: {
    title: "A node's `meta.code` and `meta.tests`",
    ruTitle: "`meta.code` и `meta.tests` узла",
    parts: [
      P("`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that the SpecTags (§s-8xw4mgvpexyvw5q) produce as the commit leaves the code and the tests (§" + ROW.r34 + "). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives the list that the SpecTags produce.",
        "`sheriff binding` отвергает каждый узел, `meta.code` или `meta.tests` (§s-rwqzepmrt77rv35) которого отличается от списка, который дают SpecTag (§s-8xw4mgvpexyvw5q) в том виде, в каком коммит оставляет код и тесты (§" + ROW.r34 + "). Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и приводит список, который дают SpecTag.",
        "Было: «`sheriff binding` собирает SpecTag кода и тестов по всему репозиторию и сравнивает их с `meta.code` и `meta.tests` каждого узла». Теперь узел начинается с того, что отвергается и что называет отказ, и реализует строку 10.1.34."),
      P("For a node, the SpecTags that name it produce the following lists:",
        "Для узла SpecTag, которые его называют, дают следующие списки:",
        "Новое: по вашему решению по строке 10.1.34 от 2026-11-13 `meta.code` ссылается на каждый файл кода, который привязывает SpecTag, называющий узел, и ни на какой другой, а `meta.tests` — на каждый файл тестов с тестом с таким SpecTag."),
      L("`meta.code`: an entry naming only the file, for each file of the system's code (§s-hheus6f395ynqvc) other than tests that holds code that such a SpecTag binds;",
        "`meta.code`: запись, которая называет только файл, для каждого файла кода системы (§s-hheus6f395ynqvc) помимо тестов, в котором есть код, привязанный таким SpecTag;",
        "Новое: запись называет только файл. Согласованный узел «What `sheriff reindex` writes» пишет в `meta.code` только файлы, а по вашему решению по строке 10.1.34 от 2026-11-17 строка говорит о коде, который привязывает SpecTag, а не о символе. Поэтому сравнение символов, которые называет запись, уходит (из кода и из схемы)."),
      L("`meta.tests`: each test of the system's code that declares such a SpecTag (§s-zrsc6asgmhv8tnc), by its file and its name.",
        "`meta.tests`: каждый тест кода системы, который объявляет такой SpecTag (§s-zrsc6asgmhv8tnc), по его файлу и названию.",
        "Новое: так, как его пишет согласованный узел «What `sheriff reindex` writes»."),
      P("A SpecTag binds code in a file where it is placed in one of the following places:",
        "SpecTag привязывает код в файле, если он находится в одном из следующих мест:",
        "Новое: по заметкам группы 2 (пункт 6) засчитываются файлы, привязанные целиком, и записи файла привязок. Вопрос из файла продолжения (2026-11-17) — в каких форматах нет комментариев и где хранятся SpecTag такого файла — решили согласованные узлы о файле привязок и о том, что инструменты читают в guidelines проекта."),
      L("above a symbol of the file (§s-33fw3ga4ctd94dq);",
        "над символом файла (§s-33fw3ga4ctd94dq);",
        "Пункт списка мест."),
      L("at the start of the file (§s-5qdjyf6t898rsd4);",
        "в начале файла (§s-5qdjyf6t898rsd4);",
        "Пункт списка мест."),
      L("in the file's entry in the bindings file (§s-trwczfskj5zmuft).",
        "в записи этого файла в файле привязок (§s-trwczfskj5zmuft).",
        "Пункт списка мест."),
      P("`sheriff binding` compares each list regardless of the order of its entries. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check whether the specification is approved or a draft (§" + ROW.r34 + ").",
        "`sheriff binding` сравнивает каждый список без учёта порядка его записей. Он проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Эту проверку он выполняет независимо от того, одобрена спецификация или она черновик (§" + ROW.r34 + ").",
        "Новое: какие узлы проверяются, — так же, как в узлах группы 1. Узлы SpecSheriff guidelines и расширений, которые проект берёт из плагина, в эти файлы не входят: по правилу 9.7 их списки называют код и тесты репозитория, где пишутся guidelines. В столбце «On failure» строки 10.1.34 стоит «refused» без условий."),
    ],
    reason: "`sheriff reindex` writes a node's `meta.code` and `meta.tests` from the SpecTags (§s-ztseyetus7np6br), but a person may edit them by hand or commit without running it. A list that differs from the SpecTags would show a reader code or tests that do not implement the node, or would hide some that do.",
    ruReason: "`sheriff reindex` пишет `meta.code` и `meta.tests` узла по SpecTag (§s-ztseyetus7np6br), но человек может изменить их вручную или сделать коммит, не запустив его. Список, который отличается от SpecTag, показал бы читателю код или тесты, которые не реализуют узел, или скрыл бы те, которые реализуют.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to count only the SpecTags placed above symbols, which would refuse that `meta.code` for naming `src/texts.json`.",
      "Правило R реализуют функция `render` в `src/page.ts` и файл `src/texts.json`, который файл привязок привязывает к R. `meta.code` правила R называет оба файла, и `sheriff binding` его принимает. Самая вероятная ошибка — считать только SpecTag над символами: тогда этот `meta.code` был бы отвергнут за то, что называет `src/texts.json`.")],
    refs: [R("implements", ROW.r34), R("cites", "s-rwqzepmrt77rv35"), R("cites", "s-8xw4mgvpexyvw5q"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-hheus6f395ynqvc"), R("cites", "s-zrsc6asgmhv8tnc"), R("cites", "s-33fw3ga4ctd94dq"), R("cites", "s-5qdjyf6t898rsd4"),
      R("cites", "s-trwczfskj5zmuft"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-ztseyetus7np6br")],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.34.",
      "The comparison of the symbols that an entry of `meta.code` names: `meta.code` names files (row 10.1.34; “What `sheriff reindex` writes”).",
    ],
    date: DATE,
  },
  stage3: "binding.ts:215-254 builds the lists only from the SpecTags above symbols, and compares the symbols that an entry of meta.code names (binding.ts:240-249). It is to count the SpecTags at the start of a file and the entries of sheriff.bindings.json, and to drop the comparison of symbols; node.schema.json is to drop `symbols` from meta.code. It is to judge the nodes of the files that the repository keeps, including those in cells; judgedHere reads writesSpecSheriffGuidelines, which goes. reindex.ts is to build meta.code the same way (proposal:s-ztseyetus7np6br-g3). The test at binding.test.ts:125 is to carry s-t383grkn3q68dpf; the tests at :132 and :138 go with the comparison of symbols.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 31: "A list and its declaration" (s-5hb9k2e34dgn284), row 10.1.35, split in two: the list against its JSON
// Schema or its symbol, and the list of a project's own kinds of node against the project's extension of the schema.
// ---------------------------------------------------------------------------------------------------------------
add("s-5hb9k2e34dgn284", {
  location: "tools 7.2.6",
  sidValue: "s-5hb9k2e34dgn284",
  testsFrom: [
    "compares a list whose members are objects by the property it names, and a JSON object by its keys",
    "refuses a list its declaration in the code or in a schema does not match",
  ],
  proposal: {
    title: "A list and its declaration",
    ruTitle: "Список и его объявление",
    parts: [
      P("`sheriff binding` accepts a `TextRule.list` (§s-eferktypcj7njt5) only where each of the following holds (§" + ROW.r35 + "):",
        "`sheriff binding` принимает `TextRule.list` (§s-eferktypcj7njt5), только если выполнено каждое из следующего (§" + ROW.r35 + "):",
        "Было: «`sheriff binding` сравнивает элементы каждого списка узла с объявлением, которое список называет в коде, схеме или настройках». По вашим решениям по строке 10.1.35 от 2026-11-13 `TextRule.list.declaredIn` заменяют два свойства списка, `jsonSchema` и `valueList`, а проверка идёт от списка к схеме. Согласованный узел о том, что `sheriff reindex` меняет в написанном прежним выпуском (2026-11-21), переписывает `declaredIn` в эти свойства. Так решена открытая проблема P1: узлы, где ещё стоит `declaredIn`, получают техническую замену (см. заметки)."),
      L("where the list has a `TextRule.list.jsonSchema`, each of its values is valid, under JSON Schema 2020-12, against the schema at the place to which that property points;",
        "если у списка есть `TextRule.list.jsonSchema`, каждое его значение корректно, по JSON Schema 2020-12, относительно схемы в том месте, на которое указывает это свойство;",
        "Новое: первое предложение строки 10.1.35. JSON Schema описывает формат значений, а не перечисляет их, поэтому каждое значение проверяется по схеме (ваше решение от 2026-11-13). Версия — 2020-12, по которой инструменты уже проверяют файлы спецификации."),
      L("where the schema at that place holds the keyword `enum`, each value of that `enum` is one of the list's values;",
        "если схема в этом месте содержит ключевое слово `enum`, каждое значение этого `enum` — одно из значений списка;",
        "Новое: второе предложение строки 10.1.35, сказанное утвердительно."),
      L("where the list has a `TextRule.list.valueList`, the symbol (§s-kgbzk2ph9e6jfb4) to which that property points declares exactly the list's values.",
        "если у списка есть `TextRule.list.valueList`, символ (§s-kgbzk2ph9e6jfb4), на который указывает это свойство, объявляет ровно значения списка.",
        "Новое: третье предложение строки 10.1.35."),
      P("`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file, the place or the symbol cannot be found, the refusal names it.",
        "`sheriff binding` отвергает любой другой `TextRule.list`, называя файл, sid и расположение узла (§s-kag2m9tzdnduxdx) и каждое затронутое значение. Если файл, место или символ не найдены, отказ называет их.",
        "Новое: что называет отказ."),
      P("Each member of a list gives one of its values. For a member that is an object, the value is that member's property that `TextRule.list.property` names. A member that lacks that property is refused only by the check of an object in a list (§s-cdachayybfvg4na).",
        "Каждый элемент списка даёт одно из его значений. Для элемента, который является объектом, значение — то его свойство, которое называет `TextRule.list.property`. Элемент без этого свойства отвергает только проверка объекта в списке (§s-cdachayybfvg4na).",
        "Как было: «Элемент, который является объектом, сравнивается по свойству, которое называет список». Элемент без этого свойства отвергает только узел «An object in a list», чтобы одно нарушение отвергалось один раз."),
      P("A symbol declares the text of each string literal within its lines, as the SpecSheriff tools read a file whose language a description covers (§s-33fw3ga4ctd94dq). A value of the list matches such a literal where the value, written as text, is the literal's text.",
        "Символ объявляет текст каждого строкового литерала в своих строках, как инструменты SpecSheriff читают файл на языке, для которого есть описание (§s-33fw3ga4ctd94dq). Значение списка совпадает с таким литералом, если значение, записанное как текст, — текст этого литерала.",
        "Было в коде (binding.ts, функция `declaration`), но не в тексте узла. Сравнение с ключами JSON-объекта уходит, как говорит todo строки 10.1.35."),
      P("`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A list of a rule that refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) is checked only by the node on such lists (§" + S.ownKinds + "). `sheriff binding` makes this check whether the specification is approved or a draft (§" + ROW.r35 + ").",
        "`sheriff binding` проверяет список каждого узла спецификации в файлах, которые хранит репозиторий, в том числе узла в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Список правила, которое уточняет правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2), проверяет только узел о таких списках (§" + S.ownKinds + "). `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§" + ROW.r35 + ").",
        "Новое: какие узлы проверяются, — так же, как в узлах группы 1. Список собственных типов узлов проверяет отдельный узел: поле `kinds` расширения схемы — не JSON-схема, и проверка по схеме не могла бы сравнить `needsCode`, которое по вашему решению по правилу 8.4 от 2026-11-10 сравнивается вместе с именем. В столбце «On failure» строки 10.1.35 стоит «refused» без условий."),
    ],
    reason: "A rule's list and the schema or the code that declares the same values are written separately, so either can gain or lose a value unnoticed. Comparing them at every commit holds the values that the system accepts to those that the rule states.",
    ruReason: "Список правила и схема или код, которые объявляют те же значения, пишутся отдельно, поэтому в любом из них значение может незаметно появиться или пропасть. Сравнение при каждом коммите удерживает значения, которые принимает система, в границах тех, что утверждает правило.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A rule lists the states of a request: `open`, `done` and `cancelled`. Its `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, which holds `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` refuses the list and names `held`, a value of the `enum` that the list does not hold. The most likely mistake is to check only that each value of the list is valid against the schema. All three are, so a state that the schema accepts and the rule does not state would pass.",
      "Правило перечисляет состояния запроса: `open`, `done` и `cancelled`. Его `TextRule.list.jsonSchema` указывает на `#/properties/state` в `schema/request.schema.json`, где есть `\"enum\": [\"open\", \"done\", \"cancelled\", \"held\"]`. `sheriff binding` отвергает список и называет `held` — значение `enum`, которого нет в списке. Самая вероятная ошибка — проверять только, что каждое значение списка корректно относительно схемы. Это верно для всех трёх, поэтому состояние, которое схема принимает, а правило не утверждает, прошло бы.")],
    refs: [R("implements", ROW.r35), R("cites", "s-eferktypcj7njt5"), R("cites", "s-kgbzk2ph9e6jfb4"), R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-cdachayybfvg4na"), R("cites", "s-33fw3ga4ctd94dq"), R("cites", "s-5fewsp22mmdz7y6"), R("cites", "s-vsh384ybt4w25a2"),
      R("cites", S.ownKinds)],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.35.",
      "The `implements` link to the dropped “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj), which the archive replaces by s-eferktypcj7njt5: the node implements row 10.1.35, which checks that rule, and cites it.",
      "“the declaration the list names in the code, the schema or the settings”: `TextRule.list.declaredIn` is replaced by `TextRule.list.jsonSchema` and `TextRule.list.valueList` (the owner's rulings of 2026-11-13 on row 10.1.35), and the comparison with the keys of a JSON object goes (the row's todo).",
    ],
    date: DATE,
  },
  stage3: "binding.ts:255-262 and the function declaration (binding.ts:391-407) read TextRule.list.declaredIn and compare the members as text with an enum, an array or the keys of an object. They are to read jsonSchema and valueList, which node.schema.json is to define (the todo of row 10.1.35). Each value is to be validated with Ajv 2020 against the schema at the pointer, with the file's references resolved, and a value of an enum there that the list does not hold is to be refused. The string literals of the symbol that valueList names are to be compared with the values as text. A member that lacks its property is to be left to s-cdachayybfvg4na, and the lists of the rules that refine s-vsh384ybt4w25a2 to " + S.ownKinds + ". Only the nodes of the files that the repository keeps are to be judged, including those in cells. The comparison with the keys of an object goes. The tests at binding.test.ts:144 (now s-xqs2e24mx5253ye) and :406 are rewritten first for jsonSchema and valueList and carry s-5hb9k2e34dgn284.",
});

add("new:tools-7-2-own-kinds", {
  from: "s-5hb9k2e34dgn284",
  location: "tools 7.2.6a (new, after \"A list and its declaration\")",
  sidValue: S.ownKinds,
  testsFrom: [],
  proposal: {
    title: "The list of a project's own kinds of node",
    ruTitle: "Список собственных типов узлов проекта",
    parts: [
      P("`sheriff binding` accepts the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5) only where each of the following holds (§s-hhnahzmhahf8jht, §" + ROW.r35 + "):",
        "`sheriff binding` принимает типы узлов, которые расширение схемы проекта добавляет в своём поле `kinds` (§s-xm8rz4uupb73gu5), только если выполнено каждое из следующего (§s-hhnahzmhahf8jht, §" + ROW.r35 + "):",
        "Новое: узел вынесен из «A list and its declaration» и реализует строку 10.1.35 для собственных типов узлов проекта, о которых говорит согласованное правило 8.4. По вашему решению по правилу 8.4 от 2026-11-10 проверка сравнивает и имя, и `needsCode` каждого нового типа; файл продолжения записал, что сейчас код сравнивает только имена. Списки находятся по связи `refines`, как их читает согласованный узел «What the SpecSheriff tools read in the project's own guidelines»: элементы всех таких правил, взятые вместе."),
      L("taken together, the lists of the rules that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) hold exactly one member for each of those kinds;",
        "списки правил, которые уточняют правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2), вместе содержат ровно один элемент для каждого из этих типов;",
        "Новое. Тип, для которого нет ни одного правила со списком, тоже отвергается: правила 8.3 и 8.4 требуют правила, которое перечисляет тип."),
      L("each such member gives its kind the same `needsCode` as the field `kinds` gives it;",
        "каждый такой элемент даёт своему типу тот же `needsCode`, что и поле `kinds`;",
        "Новое: сравниваются и имя, и `needsCode`, по решению от 2026-11-10."),
      L("each member of those lists names one of those kinds.",
        "каждый элемент этих списков называет один из этих типов.",
        "Новое."),
      P("`sheriff binding` refuses a commit after which a kind or a member fails one of the conditions above. The refusal names each such kind or member and, for a member, the rule that lists it by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
        "`sheriff binding` отвергает коммит, после которого тип или элемент не выполняет одно из условий выше. Отказ называет каждый такой тип или элемент, а для элемента — также файл, sid и расположение правила, которое его перечисляет (§s-kag2m9tzdnduxdx).",
        "Новое: что называет отказ."),
      P("A member names a kind by its property that `TextRule.list.property` names (§s-cdachayybfvg4na), and gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` makes this check whether the specification is approved or a draft (§" + ROW.r35 + ").",
        "Элемент называет тип своим свойством, которое называет `TextRule.list.property` (§s-cdachayybfvg4na), и даёт `needsCode` типа своим свойством `needsCode`. `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§" + ROW.r35 + ").",
        "Новое: так элементы описывает правило 8.4. В столбце «On failure» строки 10.1.35 стоит «refused» без условий."),
    ],
    reason: "A project's own kind of node is declared in the extension of the schema, which nobody approves, and listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two holds each kind, and whether its nodes require an implementation in code, to what an owner has approved.",
    ruReason: "Собственный тип узлов проекта объявляется в расширении схемы, которое никто не одобряет, и перечисляется в правиле, которое одобряет ответственный (§s-hhnahzmhahf8jht). Сравнение того и другого удерживает каждый тип, а также то, требуется ли его узлам имплементация в коде, в границах одобренного ответственным.",
    reasonChange: "Новое.",
    examples: [X(
      "The project's extension of the schema adds the kind `procedure` with `needsCode: true`, and the rule that lists the project's own kinds lists `procedure` with `needsCode: false`. `sheriff binding` refuses the commit and names `procedure`. The most likely mistake is to compare only the names of the kinds. The rule would then say that the nodes of `procedure` require no code, while the schema says that they do.",
      "Расширение схемы проекта добавляет тип `procedure` с `needsCode: true`, а правило, которое перечисляет собственные типы проекта, перечисляет `procedure` с `needsCode: false`. `sheriff binding` отвергает коммит и называет `procedure`. Самая вероятная ошибка — сравнивать только имена типов. Тогда правило говорило бы, что узлам `procedure` код не требуется, а схема — что требуется.")],
    refs: [R("implements", ROW.r35), R("implements", "s-hhnahzmhahf8jht"), R("cites", "s-xm8rz4uupb73gu5"), R("cites", "s-vsh384ybt4w25a2"),
      R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-cdachayybfvg4na")],
    removed: [],
    date: DATE,
  },
  stage3: "No check compares a project's own kinds: binding.ts:255-262 compares, through declaredIn, the names that the extension declares in `kinds` with a list's members, and never needsCode. It is to compare the members of the lists of the rules of project.json that refine s-vsh384ybt4w25a2, taken together, with the kinds of specs/_schema/project.schema.json, name by name and needsCode by needsCode, and to refuse a kind that no member lists. Its tests are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 32: "An object in a list" (s-cdachayybfvg4na), row 10.1.36.
// ---------------------------------------------------------------------------------------------------------------
add("s-cdachayybfvg4na", {
  location: "tools 7.1.19",
  sidValue: "s-cdachayybfvg4na",
  testsFrom: [
    "refuses a member of a list that is an object lacking the property the list names",
  ],
  proposal: {
    title: "An object in a list",
    ruTitle: "Объект в списке",
    parts: [
      P("`sheriff validate` accepts a member of a `TextRule.list` (§s-eferktypcj7njt5) that is an object only where `TextRule.list.property` names a property and the member holds that property (§" + ROW.r36 + "). It refuses any other such member. The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the member's position in the list and, where the list names one, the property.",
        "`sheriff validate` принимает элемент `TextRule.list` (§s-eferktypcj7njt5), который является объектом, только если `TextRule.list.property` называет свойство и у элемента есть это свойство (§" + ROW.r36 + "). Любой другой такой элемент он отвергает. Отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx), место элемента в списке и, если список называет свойство, это свойство.",
        "Было: «`sheriff validate` читает каждый элемент `TextRule.list`, который является объектом, на свойство, которое называет список (§s-v7vd4ydrwexsgsj). Элемент без него отвергается». Ссылка вела на исключённое правило; узел реализует строку 10.1.36. Список, который не называет свойства, при элементе-объекте отвергается и сейчас (validate.ts) — теперь это сказано в тексте."),
      P("`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check whether the specification is approved or a draft (§" + ROW.r36 + ").",
        "`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Эту проверку он выполняет независимо от того, одобрена спецификация или она черновик (§" + ROW.r36 + ").",
        "Новое: какие узлы проверяются, — так же, как в узлах группы 1. В столбце «On failure» строки 10.1.36 стоит «refused» без условий."),
    ],
    reason: "The value of a member that is an object is its property that `TextRule.list.property` names. The list's declaration is compared with that value (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.",
    ruReason: "Значение элемента, который является объектом, — его свойство, которое называет `TextRule.list.property`. С этим значением сравнивается объявление списка (§s-5hb9k2e34dgn284), поэтому у элемента без этого свойства нет значения для сравнения.",
    reasonChange: "Новое: у прежнего узла не было обоснования.",
    examples: [X(
      "A rule lists the kinds of account as objects, and its `TextRule.list.property` is `name`. One member is `{\"title\": \"savings\"}`. `sheriff validate` refuses that member and names `name`. The most likely mistake is to take the member's only property as its value.",
      "Правило перечисляет виды счетов как объекты, и его `TextRule.list.property` — `name`. Один из элементов — `{\"title\": \"savings\"}`. `sheriff validate` отвергает этот элемент и называет `name`. Самая вероятная ошибка — считать значением элемента его единственное свойство.")],
    refs: [R("implements", ROW.r36), R("cites", "s-eferktypcj7njt5"), R("cites", "s-kag2m9tzdnduxdx"), R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-5hb9k2e34dgn284")],
    removed: [
      "The `implements` links to the main table of checks (s-jau82aq9juv9zzh) and to the dropped “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj): the node implements row 10.1.36.",
    ],
    date: DATE,
  },
  stage3: "validate.ts:298-307 (objectsInLists) refuses as this node says, but judges every node of spec.nodes, the nodes taken from the plugin included and the nodes in the cells of a TableRule left out; its comment cites s-v7vd4ydrwexsgsj, a dropped rule. It is to judge the nodes of the files that the repository keeps, including those in cells, and to cite s-cdachayybfvg4na. The test at validate.test.ts:501 keeps its SpecTag.",
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal for the agreed "What `sheriff reindex` writes" (s-ztseyetus7np6br), agreed in group 1 under the key
// proposal:s-ztseyetus7np6br, which stays untouched. Only its item on `meta.code` and `meta.tests` changes, so that
// `meta.code` also names a file bound by SpecTags at its start or by its entry in the bindings file (row 10.1.34, rule
// 1.5.2), as s-t383grkn3q68dpf checks. The changed item held two thoughts in one sentence, so it is split in two.
// ---------------------------------------------------------------------------------------------------------------
const SAME = "Как в согласованной формулировке (группа 1).";
const agreedWrites = JSON.parse(JSON.stringify(drafts["proposal:s-ztseyetus7np6br"]));
const metaAt = agreedWrites.proposal.parts.findIndex((x) => x.en.startsWith("the lists `meta.code` and `meta.tests` of each node"));
if (metaAt < 0) throw new Error("the agreed item on meta.code was not found in proposal:s-ztseyetus7np6br");
const writesParts = agreedWrites.proposal.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: SAME }));
writesParts.splice(metaAt, 1,
  L("the list `meta.code` of each node (§s-rwqzepmrt77rv35), naming each code file that holds code bound by a SpecTag naming the node, including a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);",
    "список `meta.code` каждого узла (§s-rwqzepmrt77rv35), который называет каждый файл кода, где есть код, привязанный SpecTag, который называет этот узел, в том числе файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);",
    "Было: «списки `meta.code` и `meta.tests` каждого узла, построенные по SpecTag, которые связывают с узлом код и тесты (§s-rwqzepmrt77rv35): `meta.code` называет каждый файл кода, в котором есть символ, связанный таким SpecTag, а `meta.tests` — каждый такой тест по его файлу и имени». По строке 10.1.34 (s-tqdmk6jakx97wra; ваше решение от 2026-11-17) `meta.code` ссылается на каждый файл кода, который привязывает SpecTag, называющий узел. По правилу 1.5.2 (s-kgbzk2ph9e6jfb4) код привязывается не только SpecTag над символом, но и SpecTag в начале файла и записью в файле привязок; их определяют согласованные узлы группы 2 «SpecTags at the start of a file» (s-5qdjyf6t898rsd4) и «The bindings file» (s-trwczfskj5zmuft), и оба способа привязывают файл целиком. Пункт разделён на два: с этим добавлением одно предложение держало бы две мысли — о `meta.code` и о `meta.tests` (правило 7.3.2)."),
  L("the list `meta.tests` of each node, naming each test that a SpecTag naming the node binds, by its file and its name;",
    "список `meta.tests` каждого узла, который называет каждый тест, привязанный SpecTag, который называет этот узел, по его файлу и имени;",
    "Вынесено из прежнего пункта о `meta.code` и `meta.tests` в отдельный пункт; смысл прежний."));
add("proposal:s-ztseyetus7np6br-g3", {
  question: "None: carries out row 10.1.34 and rule 1.5.2",
  base: "proposal:s-ztseyetus7np6br",
  change: "Изменён только пункт о `meta.code` и `meta.tests`. Было: «`meta.code` называет каждый файл кода, в котором есть символ, связанный таким SpecTag». Строка 10.1.34 (s-tqdmk6jakx97wra; ваше решение от 2026-11-17) требует, чтобы `meta.code` ссылался на каждый файл кода, который привязывает SpecTag, называющий узел: строка говорит о коде, который привязывает SpecTag, а не о символе. По правилу 1.5.2 (s-kgbzk2ph9e6jfb4) код привязывают SpecTag над символом, SpecTag в начале файла и запись в файле привязок; последние два способа определяют согласованные узлы группы 2 «SpecTags at the start of a file» (s-5qdjyf6t898rsd4) и «The bindings file» (s-trwczfskj5zmuft). Прежний пункт не называл файл, привязанный целиком, и `sheriff binding` по узлу «A node's `meta.code` and `meta.tests`» (группа 3) отвергал бы то, что пишет `sheriff reindex`. Пункт разделён на два, о `meta.code` и о `meta.tests`, потому что с добавлением одно предложение держало бы две мысли (правило 7.3.2). Остальная формулировка — как вы согласовали в группе 1.",
  location: agreedWrites.location,
  sidValue: "s-ztseyetus7np6br",
  proposal: {
    title: agreedWrites.proposal.title,
    ruTitle: agreedWrites.proposal.ruTitle,
    parts: writesParts,
    reason: agreedWrites.proposal.reason,
    ruReason: agreedWrites.proposal.ruReason,
    reasonChange: SAME,
    refs: [...agreedWrites.proposal.refs, R("cites", "s-5qdjyf6t898rsd4"), R("cites", "s-trwczfskj5zmuft")],
    removed: [],
    date: DATE,
  },
  stage3: "reindex.ts builds meta.code only from the SpecTags above symbols. It is to name also each file bound by SpecTags at its start and each file that an entry of sheriff.bindings.json binds, with an entry naming only the file, as s-t383grkn3q68dpf checks. Its tests are written first.",
});

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
if (new Set(Object.values(SID)).size !== Object.values(SID).length) problems.push("two new nodes share a sid");

// The nodes a link may point at: the new form, the appendix of the tools, the sids the drafts give.
const targets = new Set();
const tools = JSON.parse(fs.readFileSync(path.join(root, "specs/_guidelines/tools.json"), "utf8"));
const collect = (data) => {
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.sid === "string") targets.add(n.sid);
    (n.children || []).forEach(walk);
    for (const g of n.groups || []) for (const r of g.rows || []) for (const c of Object.values(r.cells || {})) if (c && c.node) walk(c.node);
  };
  data.nodes.forEach(walk);
};
const moved = path.join(root, ".ai_docs/t25-pass/moved/specs/_guidelines");
collect(JSON.parse(fs.readFileSync(path.join(moved, "spec.json"), "utf8")));
for (const f of fs.readdirSync(path.join(moved, "extensions"))) collect(JSON.parse(fs.readFileSync(path.join(moved, "extensions", f), "utf8")));
collect(tools);
for (const d of Object.values(drafts)) if (d && typeof d.sidValue === "string") targets.add(d.sidValue);
for (const sid of Object.values(drafts["commands:sids"] || {})) targets.add(sid);
for (const sid of Object.values(SID)) targets.add(sid);
for (const sid of Object.values(ROW)) if (!targets.has(sid)) problems.push(`row ${sid} names no known node`);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  p.text = render(p.parts, "en");
  p.ruText = render(p.parts, "ru");
  const en = [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const ru = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  const cited = new Set(citedIn(en));
  const linked = new Map();
  for (const r of p.refs) {
    if (!targets.has(r.to)) problems.push(`${key}: link to ${r.to}, which names no known node`);
    if (linked.has(r.to)) problems.push(`${key}: two links to ${r.to}`);
    if (r.to === e.sidValue) problems.push(`${key}: a link to itself`);
    linked.set(r.to, r.type);
  }
  for (const s of cited) if (!linked.has(s) && s !== e.sidValue) problems.push(`${key}: cites ${s} without a link`);
  for (const [to, type] of linked) if (type === "cites" && !cited.has(to)) problems.push(`${key}: cites link to ${to} without a citation`);
  const ruCited = new Set(citedIn(ru));
  for (const s of cited) if (!ruCited.has(s)) problems.push(`${key}: the Russian lacks the citation of ${s}`);
  for (const s of ruCited) if (!cited.has(s)) problems.push(`${key}: the Russian cites ${s}, the English does not`);
  for (const t of [en, ru]) for (const c of locationCited(t)) problems.push(`${key}: a citation by location outside backticks: ${c}`);
  for (const x of p.parts) if (!x.en || !x.ru || !x.change) problems.push(`${key}: a part lacks en, ru or change`);
  if (!p.reason || !p.ruReason || !p.reasonChange) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  if (!(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const sentence of [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ").replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
}
// The phrases the agreed drafts avoid.
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const en = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.en).join("\n")
    : [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/]) {
    if (bad.test(en.replace(/SpecSheriff tools/g, "SST"))) problems.push(`${key}: the English holds ${bad}`);
  }
  const ruAll = [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ/.test(ruAll)) problems.push(`${key}: the Russian says «несёт»`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) drafts[key] = e;
// No key outside the group may differ from the copy.
for (const key of new Set([...Object.keys(before), ...Object.keys(drafts)])) {
  if (key in entries) continue;
  if (JSON.stringify(before[key]) !== JSON.stringify(drafts[key])) {
    console.error(`a key outside the group differs from the copy: ${key}`);
    process.exit(1);
  }
}
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// english-group3.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 3: the English of every node",
  "",
  "This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group3.mjs: the drafts of items 27 to 32 of the appendix of the tools, and the proposal for the agreed \"What `sheriff reindex` writes\".",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group3.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.base) md.push(`A proposal: the complete new wording of the node agreed under \`${e.base}\`. Only the items on \`meta.code\` and \`meta.tests\` differ from it.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group3.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
