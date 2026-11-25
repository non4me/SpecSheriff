// T25, stage 2, group 4: drafts the new wordings of the nodes of items 33 to 40 of the order in stage2-inventory.md:
// how a project's own check is run, a location outside the specification, a citation outside the specification, the
// generated copies against the nodes, an approved rule whose tests or code lag behind it, an approved rule without code
// or a test, the nodes that a commit message must name, and the tests run before a push. They implement rows 10.1.37,
// 10.1.38, 10.1.39, 10.1.39a, 10.1.40, 10.1.41, 10.1.42 and 10.1.44 of the main table of checks. Row 10.1.39b is
// implemented by the agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk), so no node is written for it. The
// script also proposes a change to the agreed "What the SpecSheriff tools read in the project's own guidelines"
// (new:tools-1-project), under the key proposal:new-tools-1-project-g4, which item 40 needs.
// Copies tools-drafts.json to tools-drafts.before-group4.json first, checks every draft (citations against links, the
// Russian citing the same sids, no citation by location outside backticks, link targets existing, no key outside the
// group changed), and only then writes. It also writes english-group4.md, the English of every node of the group, for
// EngStickler's readers. It touches no other file. Run again, it rebuilds the keys of this group from the copy made
// before its first run.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group4.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";

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
const SAME = "Как в согласованной формулировке.";

// The rows of the main table of checks that the group implements.
const ROW = {
  r37: "s-ujm7nfxkk9j3464",
  r38: "s-u5hfbygfyqv4wmf",
  r39: "s-e84nggntkrcyumq",
  r39a: "s-dwxjxb7rw4w5yn3",
  r39b: "s-f8fmudceuyaj942",
  r40: "s-ddd2e96uke4y83j",
  r41: "s-c4y63t285gg7jz7",
  r42: "s-7sk3s553ukzwtbm",
  r44: "s-aufnqn6t7y2me7a",
};

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};

// ---------------------------------------------------------------------------------------------------------------
// Item 33: "How a project's own check is run" (s-7pk89t8z6wymmj9), row 10.1.37.
// ---------------------------------------------------------------------------------------------------------------
add("s-7pk89t8z6wymmj9", {
  location: "tools 7.1.23",
  sidValue: "s-7pk89t8z6wymmj9",
  testsFrom: ["runs each of the project's own checks on the model"],
  proposal: {
    title: "How a project's own check is run",
    ruTitle: "Как запускается собственная проверка проекта",
    parts: [
      P("Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. It only reports the failure where the rule that lists the check says so (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.",
        "Если проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), не проходит, `sheriff validate` отвергает изменение. Он только сообщает о том, что проверка не прошла, если так говорит правило, которое её перечисляет (§s-ujm7nfxkk9j3464). Отказ или сообщение называет проверку и показывает, что она напечатала в стандартный вывод и в стандартный поток ошибок. Если проверка ничего не напечатала, показывается код её завершения.",
        "Было: «An exit code other than zero refuses, or is reported where the rule listing the check says it reports. What the check printed is shown with it.» Узел теперь открывается тем, что отвергает команда и что называет отказ, как другие узлы проверок. Уточнено, что показывается и стандартный вывод, и поток ошибок, а если проверка ничего не напечатала — код её завершения; так код и делает сейчас."),
      P("`sheriff validate` runs each such check by the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs, which at a commit holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only where its process ends with the exit status zero.",
        "`sheriff validate` запускает каждую такую проверку командой, которую для неё называет `sheriff.config.json` (§s-zefk589ykh37b8u). Проверка выполняется в каталоге, в котором выполняется `sheriff validate` и который при коммите содержит то, что содержит коммит (§s-477gtdrkw34dzxw). На стандартный вход проверка получает модель спецификации в том виде, в каком её печатает `sheriff json` (§s-w6gybeqn2ttydqx). Проверка проходит, только если её процесс завершается с кодом ноль.",
        "Было: «`sheriff validate` runs each check a project's own guidelines add (§s-2fau85dfyyeq66m), by the command the settings name for it. The check runs in the directory the other checks read. The check is handed on its standard input what `sheriff model` prints.» Команда `sheriff model` теперь называется `sheriff json`, по вашему решению от 2026-11-21. Каталог назван точнее: тот, в котором выполняется `sheriff validate`; при коммите это каталог с тем, что содержит коммит (узел «The hooks»). Добавлено, когда проверка проходит."),
      P("The rule that `sheriff.config.json` names for a check lists the check by a member of its `TextRule.list` (§s-eferktypcj7njt5) whose value (§s-5hb9k2e34dgn284) is the check's name. The check's failure is only reported where that member is an object whose property `onFailure` is `reported`. Where the rule lists no member whose value is the check's name, `sheriff validate` refuses the change, naming the check and the rule.",
        "Правило, которое `sheriff.config.json` называет для проверки, перечисляет её элементом своего `TextRule.list` (§s-eferktypcj7njt5), значение которого (§s-5hb9k2e34dgn284) — имя проверки. О том, что проверка не прошла, только сообщается, если этот элемент — объект, свойство `onFailure` которого равно `reported`. Если в правиле нет элемента, значение которого — имя проверки, `sheriff validate` отвергает изменение и называет проверку и правило.",
        "Новое: как правило, которое перечисляет проверку, говорит, что о неудаче проверки только сообщается. Это свойство `onFailure` элемента перечня; так его уже читает код. По вашему решению от 2026-11-04 по правилу 10.8 это решает правило, которое одобряет ответственный, а не настройки. Отказ, если правило не перечисляет проверку, код делает уже сейчас; так же поступает согласованный узел «How a project's own code generator is run»."),
      P("`sheriff validate` runs the project's own checks after it has validated the files against the schema of the specification (§s-xzcw3hv4hmxz7h7) and before every other check that it makes (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find.",
        "Собственные проверки проекта `sheriff validate` запускает после того, как проверил файлы на соответствие схеме спецификации (§s-xzcw3hv4hmxz7h7), и до всех остальных своих проверок (§s-pcnyfp7gev7syax). Эти остальные проверки он выполняет, что бы ни нашли собственные проверки проекта.",
        "Новое: по правилу 10.12 собственные проверки проекта выполняются раньше проверок SpecSheriff guidelines, и каждый шаг выполняется независимо от того, что нашли предыдущие. Собственная проверка получает модель спецификации, поэтому она выполняется после проверки файлов по схеме: согласованный узел «Validation against the schema before a command works on the files» требует этой проверки до любой проверки, которая читает узлы. Сейчас код запускает собственные проверки последними."),
      P("`sheriff validate` refuses the change where a check adds, changes or removes a file in the directory in which it runs, other than a file that git ignores. The refusal names the check and each such file (§s-pcnyfp7gev7syax).",
        "`sheriff validate` отвергает изменение, если проверка добавляет, меняет или удаляет файл в каталоге, в котором она выполняется, кроме файла, который git игнорирует. Отказ называет проверку и каждый такой файл (§s-pcnyfp7gev7syax).",
        "Новое: по правилу 10.12 собственные проверки проекта не меняют файлов, иначе следующие проверки читали бы не то, что содержит коммит. Собственный инструмент проекта в git hook за то же самое отвергается уже сейчас; собственную проверку код сейчас не проверяет."),
      P("Given the option `--strict`, `sheriff validate` hands each of the project's own checks a model in which the specification is approved and its `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries for the approval status and the flag hold. Its other checks are the same with or without the option.",
        "С параметром `--strict` `sheriff validate` передаёт каждой собственной проверке проекта модель, в которой спецификация одобрена, а её флаг `strict` включён (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). Так он делает, что бы ни содержали записи о статусе одобрения и о флаге. Остальные его проверки с этим параметром и без него одинаковы.",
        "Новое: согласованный узел «The settings that only an owner of the specification changes» называет `sheriff validate --strict` командой, которая показывает, что нашли бы собственные проверки проекта, если бы спецификация была одобрена, а флаг `strict` включён (правило 10.7). Здесь сказано, как эта команда это делает."),
      P("`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).",
        "Собственные проверки проекта `sheriff validate` запускает независимо от того, одобрена спецификация или она черновик (§s-ujm7nfxkk9j3464).",
        "Новое: стоимость строки 10.1.37 не зависит от статуса спецификации. Статус одобрения и флаг `strict` проверка узнаёт из модели и может учитывать их сама."),
    ],
    reason: "Run by `sheriff validate`, a project's own check runs wherever the checks of the SpecSheriff guidelines run and reads the same files. So it binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).",
    ruReason: "Собственная проверка проекта, которую запускает `sheriff validate`, выполняется везде, где выполняются проверки SpecSheriff guidelines, и читает те же файлы. Поэтому она обязательна для каждого участника и не зависит от того, кто вспомнит её запустить (§s-2fau85dfyyeq66m).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{\"name\": \"no-secrets\", \"onFailure\": \"reported\"}`. The check `no-secrets` finds a token in a file, prints the file's path and exits with the status 1. `sheriff validate` reports the failure, showing the path, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.",
        "У правила, которое перечисляет собственные проверки проекта, `TextRule.list.property` — `name`, и один из его элементов — `{\"name\": \"no-secrets\", \"onFailure\": \"reported\"}`. Проверка `no-secrets` находит токен в файле, печатает путь к файлу и завершается с кодом 1. `sheriff validate` сообщает о неудаче, показывая путь, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что код завершения проверки не равен нулю."),
    ],
    refs: [
      R("implements", ROW.r37),
      R("implements", "s-2fau85dfyyeq66m"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-5hb9k2e34dgn284"),
      R("cites", "s-xzcw3hv4hmxz7h7"),
      R("cites", "s-pcnyfp7gev7syax"),
      R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-q3pfzyaxvpr2zj2"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.37 (s-ujm7nfxkk9j3464).",
    ],
    date: DATE,
  },
  stage3: "validate.ts:187-205 (projectChecks) runs the project's own checks after every other check of sheriff validate (validate.ts:178) and matches a member only where it is an object (validate.ts:194). It is to run them after the validation against the schema and before the other checks, to match a member by its value as s-5hb9k2e34dgn284 defines it, a string member included, to hand each check the model as sheriff json prints it (s-w6gybeqn2ttydqx), or under `--strict` with the approval status approved and the strict flag on, and to refuse a check that adds, changes or removes a file that git does not ignore in the directory in which it runs. cli.ts is to accept `sheriff validate --strict`. The test at validate.test.ts:525 keeps s-7pk89t8z6wymmj9; tests for the order, for `--strict`, for a string member and for a check that changes a file are written first. The todo of 2026-11-06 on a time limit for a project's own check and generator stays on the node, and so do its decisions.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 34: "Citing a node only by its sid" (s-nh8b2hjvzasdxmd), row 10.1.38.
// ---------------------------------------------------------------------------------------------------------------
add("s-nh8b2hjvzasdxmd", {
  location: "tools 7.2.7",
  sidValue: "s-nh8b2hjvzasdxmd",
  testsFrom: ["refuses a location in the files of the tools too"],
  proposal: {
    title: "A location outside the specification",
    ruTitle: "Расположение узла за пределами спецификации",
    titleChange: "Было: «Citing a node only by its sid». Узел теперь открывается тем, что отвергает `sheriff binding`, — расположением узла в файле за пределами спецификации. Новый заголовок говорит о том же и перекликается с заголовком соседнего узла «A citation outside the specification».",
    parts: [
      P("`sheriff binding` refuses each location of a node (§s-kag2m9tzdnduxdx) written in a file that the repository keeps outside `specs/`, the folder that holds the files of the specification (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). The refusal names the file, the line and the location, and says that a node is cited by its sid (§s-9spq78kdwsxr759).",
        "`sheriff binding` отвергает каждое расположение узла (§s-kag2m9tzdnduxdx), записанное в файле, который репозиторий хранит вне `specs/`, — папки, в которой хранятся файлы спецификации (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). Отказ называет файл, строку и расположение и говорит, что узел цитируют по его sid (§s-9spq78kdwsxr759).",
        "Было: «Wherever a node is cited, a rule, a term or a node of a project's own NodeKind, it is cited by its sid, never by its location (§s-kag2m9tzdnduxdx). `sheriff binding` holds every file of the repository to this but those under `specs/`. There `sheriff validate` checks the citations in the nodes (§s-qzyacnqwvaeaps4).» Узел открывается тем, что отвергает команда и что называет отказ. Что узел цитируют по sid, теперь говорит правило «A node is cited by its sid», и узел ссылается на него. Перечень видов узлов с NodeKind убран: имя NodeKind вы убрали 2026-11-10, а расположение отвергается, какой бы узел оно ни называло. Фраза о `sheriff validate` убрана: это говорит узел «Citations and the links that match them»."),
      P("`sheriff binding` takes as a location each of the following, whatever the case of its letters:",
        "`sheriff binding` считает расположением каждое из следующего, в каком бы регистре ни были написаны его буквы:",
        "Было: «A location of a node found in a file is refused, in any case of its letters and whether or not the node exists now.» Без изменений по смыслу. Сказано, какой текст считается расположением, по узлу «How a node's location is computed»."),
      L("text in the form of a numbered node's location (§s-ygg5kpcxgzq3m7w), such as `base/3.2` or `_guidelines/spec/1.3.4`, whether or not a node is at that location now;",
        "текст в форме расположения нумерованного узла (§s-ygg5kpcxgzq3m7w), например `base/3.2` или `_guidelines/spec/1.3.4`, независимо от того, есть ли сейчас узел по этому расположению;",
        "Без изменений по смыслу: расположение отвергается, даже если узла по нему сейчас нет."),
      L("a location of a node of the model of the specification (§s-w6gybeqn2ttydqx) where the location holds a slash and ends in no number, such as `contracts/request`, the location of a term (§s-khqsmy6mhejkrhg).",
        "расположение узла модели спецификации (§s-w6gybeqn2ttydqx), если это расположение содержит косую черту и не оканчивается номером, например `contracts/request` — расположение термина (§s-khqsmy6mhejkrhg).",
        "Без изменений по смыслу: так код и делает сейчас. Расположение без косой черты, например `requests` у заголовка домена, — обычное слово, поэтому не считается."),
      P("Text has the form of a numbered node's location where it consists of one of the following, a slash and one or more numbers separated by dots:",
        "Текст имеет форму расположения нумерованного узла, если он состоит из одного из следующего, косой черты и одного или нескольких номеров, разделённых точками:",
        "Новое: какой текст имеет форму расположения, — по узлу «How a node's location is computed»; так и делает код сейчас."),
      L("the name of a folder under `specs/` that holds files of the base specification (§s-5x737t9nee4zgaa);",
        "имя папки в `specs/`, в которой хранятся файлы базовой спецификации (§s-5x737t9nee4zgaa);",
        "Новое: так начинается расположение узла базовой спецификации, например `base/3.2`."),
      L("the location of the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5).",
        "расположение первого узла верхнего уровня файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5).",
        "Новое: так начинается расположение узла в таком файле, например `_guidelines/spec/1.3.4`."),
      P("Such text counts only on its own, not as part of a longer path or name: in `specs/tech/stack.json`, `tech/stack` is part of a path and is no location.",
        "Такой текст считается, только если он стоит отдельно, а не входит в более длинный путь или имя: в `specs/tech/stack.json` текст `tech/stack` — часть пути, а не расположение.",
        "Новое: часть более длинного пути или имени расположением не считается; так и делает код сейчас."),
      P("`sheriff binding` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).",
        "`sheriff binding` не проверяет файлы, которые собственные guidelines проекта перечисляют как fixtures тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).",
        "Было: «One exception: the fixtures of the tests of a check that reads citations or locations. Such a test needs a file holding a location, as the data it feeds the check. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).» Без изменений по смыслу. Зачем такому тесту файл с расположением, говорит правило 10.11, поэтому здесь это не повторяется."),
      P("`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-u5hfbygfyqv4wmf).",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-u5hfbygfyqv4wmf).",
        "Новое: стоимость строки 10.1.38 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification no link backs a location, so a location left in a file would point at another node, or at none, without any check noticing.",
    ruReason: "Расположение узла меняется всякий раз, когда спецификацию переупорядочивают, а его sid не меняется никогда (§s-9spq78kdwsxr759). За пределами спецификации расположение не подкреплено связью, поэтому расположение, оставленное в файле, указывало бы на другой узел или ни на какой, и ни одна проверка этого бы не заметила.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("A guide in `docs/` says “see `base/3.2`”. `sheriff binding` refuses that line and names `base/3.2`, though no node is at that location now. The most likely mistake is to refuse only a location at which a node exists, which lets a location left behind by a removed node pass.",
        "Руководство в `docs/` говорит «см. `base/3.2`». `sheriff binding` отвергает эту строку и называет `base/3.2`, хотя сейчас по этому расположению узла нет. Самая вероятная ошибка — отвергать только расположение, по которому есть узел: тогда проходит расположение, оставшееся от удалённого узла."),
    ],
    refs: [
      R("implements", ROW.r38),
      R("implements", "s-6hha5en226aj8hu"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-9spq78kdwsxr759"),
      R("cites", "s-ygg5kpcxgzq3m7w"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-khqsmy6mhejkrhg"),
      R("cites", "s-5x737t9nee4zgaa"),
      R("cites", "s-a4rbry4hsu34hy8"),
      R("cites", "s-tj38pvm38nepaf5"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.38 (s-u5hfbygfyqv4wmf).",
      "The `implements` link to rule 8.5 (s-kag2m9tzdnduxdx), now a citation: citing a node by its sid is stated in rule 1.2.2 (s-9spq78kdwsxr759), which row 10.1.38 checks.",
      "“a rule, a term or a node of a project's own NodeKind”: the name NodeKind is removed (the owner, 2026-11-10), and a location is refused whatever node it names.",
      "“There `sheriff validate` checks the citations in the nodes (§s-qzyacnqwvaeaps4)”, with its citation: “Citations and the links that match them” (s-qzyacnqwvaeaps4) states what `sheriff validate` checks.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:410-432 (keptOutside, locationsOutside) reads every file outside specs/ and builds the beginnings of the numbered locations from the parts of the files (partOf) and a fixed list. They are to be taken as s-ygg5kpcxgzq3m7w computes locations: each folder under specs/ that holds files of the base specification, and the location of the first top-level node of each file of the guidelines, of the appendix of the tools and of the technical appendix in the model, including `_guidelines/extensions/<name>` and the files that the plugin delivers. The tests at binding.test.ts:153 and :159, which carry s-jau82aq9juv9zzh, are to carry s-nh8b2hjvzasdxmd, and the test at :178 keeps it; a test for a location of the new form, such as `tech/stack/2`, is written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 35: "A citation outside the specification" (s-m8nmfsxkcfu7cjp), row 10.1.39.
// ---------------------------------------------------------------------------------------------------------------
add("s-m8nmfsxkcfu7cjp", {
  location: "tools 7.3.1",
  sidValue: "s-m8nmfsxkcfu7cjp",
  testsFrom: ["leaves out of the citations the files", "reads the tests and the documents of the tools", "refuses a sid in the code, the tests or the documents"],
  proposal: {
    title: "A citation outside the specification",
    ruTitle: "Цитата за пределами спецификации",
    parts: [
      P("`sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):",
        "`sheriff citations` отвергает каждое из следующего в файлах, которые он читает (§s-e84nggntkrcyumq):",
        "Было: «`sheriff citations` resolves each sid in the code, the tests and the documents against the nodes, the archive's included. It refuses a `§` followed by a number in place of a sid, such as `§5.8`: a node is cited only by its sid.» Узел открывается тем, что отвергает команда, и говорит, что называет отказ."),
      L("a word that has the form of a sid, `s-` followed by 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);",
        "слово, которое имеет форму sid — `s-` и 15 символов из `23456789abcdefghjkmnpqrstuvwxyz` (§s-eferktypcj7njt5), — если этот sid не называет ни одного узла модели спецификации (§s-w6gybeqn2ttydqx);",
        "Было: «resolves each sid … against the nodes, the archive's included». Архив больше не учитывается: у узла архива нет собственного sid (правило 2.6), как и говорит todo строки 10.1.39. sid ищется в модели спецификации, в которой есть и узлы SpecSheriff guidelines из плагина. Сказано, какое слово имеет форму sid: так его задаёт схема узла."),
      L("a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).",
        "`§`, за которым сразу следует цифра, например `§5.8`: так узел цитируют по номеру, а не по его sid (§s-9spq78kdwsxr759).",
        "Без изменений по смыслу. Добавлена ссылка на правило «A node is cited by its sid»."),
      P("Each refusal names the file, the line and the text refused.",
        "Каждый отказ называет файл, строку и отвергнутый текст.",
        "Новое: что называет отказ; так код и делает сейчас."),
      P("`sheriff citations` reads the following files:",
        "`sheriff citations` читает следующие файлы:",
        "Было: «in the code, the tests and the documents». Сказано, какие это файлы. Слово «documents» заменено на «documentation», как вы решили для строки 10.1.39 2026-11-20: «документ» — это файл части спецификации (правило 11.1.2)."),
      L("the system's code (§s-hheus6f395ynqvc) and its tests: the files that the glob patterns for code or for tests in `sheriff.config.json` match (§s-zefk589ykh37b8u), and the files that `sheriff types` writes (§s-a8fn72xa782wvbk);",
        "код системы (§s-hheus6f395ynqvc) и его тесты: файлы, которым соответствуют glob-шаблоны кода или тестов в `sheriff.config.json` (§s-zefk589ykh37b8u), и файлы, которые записывает `sheriff types` (§s-a8fn72xa782wvbk);",
        "Новое: код системы и его тесты — так, как их определяют настройки; файлы, которые записывает `sheriff types`, — тоже код системы (правило 9.1)."),
      L("the code and the tests of each of the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the files that the glob patterns given for them in `sheriff.config.json` match;",
        "код и тесты каждой собственной проверки и каждого собственного генератора проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): файлы, которым соответствуют glob-шаблоны, заданные для них в `sheriff.config.json`;",
        "Новое: по правилу 10.10 SpecTag может стоять и в собственных инструментах репозитория, таких как собственные проверки и генераторы проекта, поэтому команда читает и их файлы."),
      L("the documentation: each Markdown file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u).",
        "документацию: каждый файл Markdown, который репозиторий хранит вне `specs/` (§s-zefk589ykh37b8u).",
        "Было: «the documents». Документация — каждый файл Markdown вне `specs/`, как её определяет согласованный узел «Where the files are»."),
      P("In the files that it reads, `sheriff citations` checks each word that has the form of a sid, except the sid of a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code or its tests. The check of a SpecTag that names no node checks the sid of such a SpecTag (§s-36x8amvunmv2kp5).",
        "В файлах, которые он читает, `sheriff citations` проверяет каждое слово, которое имеет форму sid, кроме sid в SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы или в его тестах. sid такого SpecTag проверяет проверка SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5).",
        "Новое: SpecTag в коде системы и в его тестах проверяет согласованный узел «A SpecTag that names no node», поэтому эта команда их не проверяет, и один SpecTag отвергается один раз. SpecTag в собственных инструментах репозитория, которые допускает правило 10.10, проверяет эта команда."),
      P("`sheriff citations` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).",
        "`sheriff citations` не проверяет файлы, которые собственные guidelines проекта перечисляют как fixtures тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).",
        "Было: «One exception: the fixtures of the tests of a check that reads citations or locations are not read. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).» Без изменений по смыслу."),
      P("`sheriff citations` makes this check regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq).",
        "`sheriff citations` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-e84nggntkrcyumq).",
        "Новое: стоимость строки 10.1.39 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "Outside the specification no link backs a citation (§s-9spq78kdwsxr759). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.",
    ruReason: "За пределами спецификации цитата не подкреплена связью (§s-9spq78kdwsxr759). Поэтому процитированный sid, который не называет ни одного узла, или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, and `sheriff citations` refuses it, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.",
        "Руководство `docs/setup.md` цитирует `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, и `sheriff citations` отвергает его, называя руководство, строку и sid. Самая вероятная ошибка — читать только файлы, которые меняет коммит: тогда цитата проходит, пока кто-нибудь не изменит руководство."),
    ],
    refs: [
      R("implements", ROW.r39),
      R("implements", "s-6hha5en226aj8hu"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-9spq78kdwsxr759"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-2fau85dfyyeq66m"),
      R("cites", "s-km4x4s26kv7pjze"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-36x8amvunmv2kp5"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.39 (s-e84nggntkrcyumq).",
      "“the archive's included”: an archived node has no sid of its own (rule 2.6, s-f2b5zvc565s242f), as the todo of row 10.1.39 says.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:519-537 (citationsOutside) looks sids up among the archived nodes too, and outsideFiles (binding.ts:23) reads the files that the globs for code or for tests match and every Markdown file outside specs/. It is to stop reading the archive (the todo of row 10.1.39, which is then removed), to look sids up in the model of the specification, to read also the files that sheriff types writes and the files that the globs of each of the project's own checks and generators match, and to leave the sid of a SpecTag in the system's code or its tests to s-36x8amvunmv2kp5. The tests at binding.test.ts:191, :262 and :329 keep s-m8nmfsxkcfu7cjp, the last rewritten first without the archive; a test for a SpecTag naming no node in the code of a project's own check, and one for a SpecTag in the system's code that this check leaves alone, are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 36: "Generated copies against the nodes" (s-dbk2vyeg8z5jxna), row 10.1.39a. Row 10.1.39b is implemented by the
// agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk), which names each node that it leaves out.
// ---------------------------------------------------------------------------------------------------------------
add("s-dbk2vyeg8z5jxna", {
  location: "tools 7.2.8",
  sidValue: "s-dbk2vyeg8z5jxna",
  testsFrom: ["passes the generated copies", "refuses a name that cannot be generated", "compares the files a project's own generator prints"],
  proposal: {
    title: "Generated copies against the nodes",
    ruTitle: "Порождённые копии в сравнении с узлами",
    parts: [
      P("`sheriff binding` refuses each file that `sheriff types` writes (§s-a8fn72xa782wvbk) where the file's text in the repository differs from what `sheriff types` would write, line endings aside (§s-dwxjxb7rw4w5yn3). It also refuses each such file that the repository lacks. Each refusal names the file and says that `sheriff types` writes it anew.",
        "`sheriff binding` отвергает каждый файл, который записывает `sheriff types` (§s-a8fn72xa782wvbk), если текст этого файла в репозитории, без учёта окончаний строк, отличается от того, что записал бы `sheriff types` (§s-dwxjxb7rw4w5yn3). Он отвергает и каждый такой файл, которого в репозитории нет. Каждый отказ называет файл и говорит, что `sheriff types` записывает его заново.",
        "Было: «`sheriff binding` generates in memory the copies the nodes produce, and compares them with what is committed. The copies are: … Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts). Each such node is reported.» По строке 10.1.39a и вашему решению от 2026-11-18 копия сравнивается с тем, что дают одобренные формулировки её узлов, а не с последним коммитом, пока узел — черновик. Какие файлы порождаются и как, говорит согласованный узел «What `sheriff types` generates», поэтому перечень файлов здесь не повторяется. Узел, из которого ничего не порождается, называет `sheriff types` (строка 10.1.39b), поэтому `sheriff binding` о нём больше не сообщает."),
      P("`sheriff binding` generates in memory, from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), the files that `sheriff types` would write, and writes none of them.",
        "`sheriff binding` порождает в памяти из одобренных формулировок узлов (§s-qyjw8xez6t6adc3) файлы, которые записал бы `sheriff types`, и не записывает ни одного из них.",
        "Без изменений по смыслу: команда по-прежнему порождает копии в памяти. Сказано, что они порождаются из одобренных формулировок (правило 10.15)."),
      P("`sheriff binding` also refuses each of the following, which keeps `sheriff types` from writing any file (§s-a8fn72xa782wvbk):",
        "`sheriff binding` отвергает также каждое из следующего, что не даёт `sheriff types` записать ни одного файла (§s-a8fn72xa782wvbk):",
        "Было: «It refuses:» Оставлены отказы, без которых `sheriff types` не может записать файлы: на них ссылается согласованный узел «What `sheriff types` generates»."),
      L("a file in the list of the files for the types and the RuntimeChecks (§s-e877bnfa559tvk9, §s-pvzms7d8kxb8dk2) whose name ends in none of `.ts`, `.py` and `.json`;",
        "файл в перечне файлов для типов и RuntimeChecks (§s-e877bnfa559tvk9, §s-pvzms7d8kxb8dk2), имя которого не оканчивается ни на `.ts`, ни на `.py`, ни на `.json`;",
        "Было: «a list of the files for the types and RuntimeChecks naming a file of another extension». «Another extension» здесь — расширение имени файла, а не расширение guidelines, поэтому сказано прямо, на что должно оканчиваться имя файла."),
      L("a file in that list whose path leads outside the repository;",
        "файл в этом перечне, путь которого ведёт за пределы репозитория;",
        "Было: «… or a path outside the repository». Без изменений по смыслу; отдельный пункт."),
      L("a second rule in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack that lists such files;",
        "второе правило в разделе технического приложения (§s-tj38pvm38nepaf5) о стеке, которое перечисляет такие файлы;",
        "Было: «two rules of the stack each defining such a list». Без изменений по смыслу."),
      L("a name that cannot be generated (§s-suv42g8r3ra2h6b);",
        "имя, которое нельзя породить (§s-suv42g8r3ra2h6b);",
        "Без изменений."),
      L("a path to which `sheriff types` would write different texts, such as a path that two of the project's own generators (§s-km4x4s26kv7pjze) print with different content.",
        "путь, по которому `sheriff types` записал бы разные тексты, например путь, который два собственных генератора проекта (§s-km4x4s26kv7pjze) печатают с разным содержимым.",
        "Новое, по todo узла от 2026-11-06: если два генератора печатают один путь с разным содержимым, копия не может совпасть с обоими, и несовпадение не исчезло бы никогда. Отказ называет настоящую причину."),
      P("The refusal names the rule, the node or the path concerned.",
        "Отказ называет соответствующее правило, узел или путь.",
        "Новое: что называет отказ."),
      P("`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-dwxjxb7rw4w5yn3).",
        "Новое: стоимость строки 10.1.39a — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "A generated file kept in the repository is part of the system's code. A copy edited by hand or left behind its nodes would implement what no owner has approved (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
    ruReason: "Порождённый файл, который хранится в репозитории, — часть кода системы. Копия, изменённая вручную или отставшая от своих узлов, реализовывала бы то, чего не одобрил ни один ответственный (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A commit edits `src/types.ts` by hand to match the new wording. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.",
        "RecordType переформулируют, и он становится черновиком, а типы, порождённые из него, остаются такими, какими их даёт его последняя одобренная формулировка. Коммит вручную меняет `src/types.ts` под новую формулировку. `sheriff binding` отвергает `src/types.ts`, потому что его текст отличается от того, что даёт последняя одобренная формулировка. Самая вероятная ошибка — порождать типы из формулировки-черновика: тогда изменённый файл проходит."),
    ],
    refs: [
      R("implements", ROW.r39a),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-qyjw8xez6t6adc3"),
      R("cites", "s-pvzms7d8kxb8dk2"),
      R("cites", "s-suv42g8r3ra2h6b"),
      R("cites", "s-km4x4s26kv7pjze"),
      R("cites", "s-kh8qcd5kxgh9z3j"),
      R("cites", "s-e877bnfa559tvk9"),
      R("cites", "s-tj38pvm38nepaf5"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.39a (s-dwxjxb7rw4w5yn3).",
      "The `implements` link to rule 10.9 (s-km4x4s26kv7pjze), now a citation: the agreed “How a project's own code generator is run” (s-y5yk7eu6h4zrjpr) implements that rule.",
      "“Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts). Each such node is reported.”, with the citation of s-f5rz6b7dhxejjts: by row 10.1.39a and the owner's ruling of 2026-11-18, a copy is compared with what the approved wordings of its nodes produce (s-qyjw8xez6t6adc3); the node from which nothing is generated is named by `sheriff types` (s-a8fn72xa782wvbk), which implements row 10.1.39b.",
      "The list of the copies (the files for the types and RuntimeChecks, and the files of the project's own generators): what `sheriff types` writes is stated in s-a8fn72xa782wvbk.",
      "“a path a project's generator prints outside the repository or under `specs/`”: the agreed s-y5yk7eu6h4zrjpr refuses a path outside the system's code.",
      "“a RecordType holding two fields of type `variant`, its inherited ones counted”: the type `variant` is gone (rule 12.6, s-z3dnru6qqdf9m6j).",
      "The todo of 2026-11-06 on a path printed twice: the last refusal carries it out.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:316-356 (generatedCopies, projectCopies) compares each copy with the last commit while a RecordType or a node of a project's generator waits for its approval, and reports that node. It is to compare each copy with what sheriff types writes from the last approved wordings (s-a8fn72xa782wvbk), with no fallback to the last commit and no report, and to refuse a path to which sheriff types would write different texts. types.ts:172 (two fields of type variant) goes. generators.ts:61-63 (a path outside the repository or under specs/) is replaced by the refusal of a path outside the system's code (s-y5yk7eu6h4zrjpr). The tests at binding.test.ts:338, :368 and :415 keep s-dbk2vyeg8z5jxna; the test at :352 is rewritten first for the last approved wording; a test for a path that two generators print with different content is written first. The test of types.test.ts that refuses a listed file of another extension and two lists of the files carries s-pvzms7d8kxb8dk2; which node it carries is settled with item 53. The decisions of the node stay on it; the todo of 2026-11-06 is removed.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 37: "A node whose tests or code lag behind it" (s-txbwsthdqhvyzd2), row 10.1.40. It needs the commit message,
// so `sheriff commit-message` makes the check and the node moves to the section on the other commands.
// ---------------------------------------------------------------------------------------------------------------
add("s-txbwsthdqhvyzd2", {
  location: "tools 7.3.3a (moved from tools 7.2.9, after “The nodes that a commit message must name”)",
  sidValue: "s-txbwsthdqhvyzd2",
  testsFrom: ["reports a node whose tests and code lag behind its text", "reports a node whose code has not caught up with its tests", "counts the changes one commit makes as made at once"],
  proposal: {
    title: "An approved rule whose tests or code lag behind it",
    ruTitle: "Одобренное правило, тесты или код которого отстают от него",
    titleChange: "Было: «A node whose tests or code lag behind it». Проверка смотрит теперь только на одобренные правила (строка 10.1.40), а код реализует правило, а не узел (ваше решение от 2026-11-11).",
    parts: [
      P("`sheriff commit-message` refuses a commit after which the tests or the code of an approved rule lag behind that rule (§s-ddd2e96uke4y83j). The commit passes where its message states that the rule's implementation needs no change (§s-7gab4ptjt2khfr5). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It says whether the rule's tests, its code or both lag, and names the trailer by which the commit message can make that statement.",
        "`sheriff commit-message` отвергает коммит, после которого тесты или код одобренного правила отстают от этого правила (§s-ddd2e96uke4y83j). Коммит проходит, если его сообщение утверждает, что реализацию правила менять не нужно (§s-7gab4ptjt2khfr5). Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он говорит, отстают ли тесты правила, его код или и то и другое, и называет trailer, которым сообщение коммита может это утверждать.",
        "Было: «`sheriff binding` reports a node whose tests or code lag behind it, by the order rule, test, code. … The node is reported by its sid, naming what lags. The change is not refused.» По строке 10.1.40 и вашим решениям от 2026-11-19 коммит теперь отвергается, а сообщение коммита может вместо изменений утверждать, что реализацию менять не нужно. Это утверждение — trailer сообщения коммита, поэтому проверку выполняет `sheriff commit-message`, который читает сообщение, и узел перенесён в раздел о других командах. Отказ называет и этот trailer."),
      P("The tests of an approved rule lag behind it where all of the following hold:",
        "Тесты одобренного правила отстают от него, если выполнено всё следующее:",
        "Было: «its text changed later than every file of its tests: the tests lag». История коммитов больше не читается: проверка смотрит только на коммит, как вы решили 2026-11-19, и на тесты, привязанные к правилу, а не на целые файлы (todo строки 10.1.40)."),
      L("the commit changes the rule's approved wording;",
        "коммит меняет одобренную формулировку правила;",
        "Новое: что значит «формулировка меняется в коммите», сказано ниже."),
      L("a test of the system's code (§s-hheus6f395ynqvc) is bound to the rule before the commit (§s-zrsc6asgmhv8tnc);",
        "до коммита к правилу привязан тест кода системы (§s-hheus6f395ynqvc, §s-zrsc6asgmhv8tnc);",
        "Новое: строка 10.1.40 говорит о тестах, «уже привязанных» к правилу, то есть привязанных до коммита."),
      L("the commit adds, changes or removes no test that is bound to the rule before or after the commit (§s-2x58az67bm6cxq2).",
        "коммит не добавляет, не меняет и не удаляет ни одного теста, привязанного к правилу до коммита или после него (§s-2x58az67bm6cxq2).",
        "Новое: добавить, изменить или удалить тест правила — значит изменить тесты правила (узел «What a commit adds, changes and removes in the code and the tests»)."),
      P("The code of an approved rule lags behind it where all of the following hold:",
        "Код одобренного правила отстаёт от него, если выполнено всё следующее:",
        "Было: «its text changed later than every file of its code: the code lags; its tests changed later than every file of its code: the code may not have caught up with its tests». По строке 10.1.40 код должен измениться в том же коммите, что и формулировка или тесты."),
      L("the commit changes the rule's approved wording, or adds, changes or removes a test that is bound to the rule before or after the commit;",
        "коммит меняет одобренную формулировку правила или добавляет, меняет или удаляет тест, привязанный к правилу до коммита или после него;",
        "Новое: обе причины, по которым код должен измениться, по строке 10.1.40."),
      L("code of the system other than tests is bound to the rule before the commit (§s-kgbzk2ph9e6jfb4);",
        "до коммита к правилу привязан код системы помимо тестов (§s-kgbzk2ph9e6jfb4);",
        "Новое: строка 10.1.40 говорит о коде, «уже привязанном» к правилу, то есть привязанном до коммита."),
      L("the commit adds, changes or removes no such code that is bound to the rule before or after the commit.",
        "коммит не добавляет, не меняет и не удаляет такого кода, привязанного к правилу до коммита или после него.",
        "Новое: код считается по символам и файлам, привязанным целиком, а не по целым файлам (todo строки 10.1.40)."),
      P("Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound as the commit leaves the code and the tests. For a merge commit, the parent is its first parent.",
        "Код или тест привязан к правилу до коммита, если он привязан в родительском коммите. После коммита он привязан, если привязан в том виде, в каком коммит оставляет код и тесты. Для коммита слияния родитель — его первый родитель.",
        "Новое: что значит «до коммита» и «после коммита», как в строке 10.1.41."),
      P("A commit changes the approved wording of a rule where both of the following hold:",
        "Коммит меняет одобренную формулировку правила, если выполнено и то и другое:",
        "Новое: «формулировка одобренного правила меняется в коммите» значит, что коммит оставляет правило одобренным в формулировке, отличной от последней одобренной до коммита. Так проверка ловит и обычный путь: правило переформулировали, пока оно было черновиком, и тогда его код менять нельзя (строка 10.1.28a), а коммит, который одобряет новую формулировку, должен принести и тесты, и код. Именно этого вы и хотели 2026-11-19."),
      L("the rule is approved as the commit leaves it;",
        "правило одобрено в том виде, в каком его оставляет коммит;",
        "Новое: первое из двух условий."),
      L("its wording then differs from its last approved wording in the commit's parent (§s-a8fn72xa782wvbk).",
        "его формулировка тогда отличается от его последней одобренной формулировки в родительском коммите (§s-a8fn72xa782wvbk).",
        "Новое: второе из двух условий. Последнюю одобренную формулировку определяет согласованный узел «What `sheriff types` generates»."),
      P("For each approved rule, `sheriff commit-message` compares the fingerprint of the rule's wording as the commit leaves it with the fingerprint that the rule's last approval in the commit's parent records (§s-v4qus7raqnwzneb). It reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).",
        "Для каждого одобренного правила `sheriff commit-message` сравнивает отпечаток формулировки правила в том виде, в каком её оставляет коммит, с отпечатком, который записывает последнее одобрение правила в родительском коммите (§s-v4qus7raqnwzneb). Одобрения родительского коммита он читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).",
        "Новое: формулировки сравниваются по отпечаткам, которые записывают одобрения; одобрения родительского коммита читаются так же, как в узле «Who an added approval names»."),
      P("`sheriff commit-message` checks each approved rule in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).",
        "`sheriff commit-message` проверяет каждое одобренное правило в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).",
        "Новое: какие правила проверяются. Узлы SpecSheriff guidelines, которые проект берёт из плагина, в проекте не одобряются, поэтому коммит проекта не меняет их одобренную формулировку."),
      P("`sheriff commit-message` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Where the commit leaves the specification a draft, the check passes and reports nothing.",
        "`sheriff commit-message` выполняет эту проверку, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Если коммит оставляет спецификацию черновиком, проверка проходит и ни о чём не сообщает.",
        "Было: о каждом узле сообщалось, в том числе пока спецификация — черновик. По строке 10.1.40 и вашему решению от 2026-11-20, пока спецификация — черновик, проверка молчит."),
    ],
    reason: "Unless its tests and code follow its new wording in the same commit, an approved rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j). Only the commit message can state that they need no change, so `sheriff commit-message`, which reads the message, makes the check.",
    ruReason: "Если тесты и код одобренного правила не следуют за его новой формулировкой в том же коммите, правило попадает в историю с тестами и кодом, написанными для его прежней формулировки (§s-ddd2e96uke4y83j). Что их менять не нужно, может утверждать только сообщение коммита, поэтому проверку выполняет `sheriff commit-message`, который читает сообщение.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The specification is approved. An earlier commit reworded rule R while it was a draft. The next commit adds the approval of the new wording and changes R's code but none of its tests. Its message has no trailer naming R. `sheriff commit-message` refuses the commit and says that R's tests lag behind it. The most likely mistake is to compare R's wording with its wording in the commit's parent. That wording is already the new one, so the lag passes.",
        "Спецификация одобрена. Более ранний коммит переформулировал правило R, пока оно было черновиком. Следующий коммит добавляет одобрение новой формулировки и меняет код R, но ни одного из его тестов. В его сообщении нет trailer, который называет R. `sheriff commit-message` отвергает коммит и говорит, что тесты R отстают от него. Самая вероятная ошибка — сравнивать формулировку R с его формулировкой в родительском коммите. Та формулировка уже новая, поэтому отставание проходит."),
    ],
    refs: [
      R("implements", ROW.r40),
      R("cites", "s-7gab4ptjt2khfr5"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", "s-2x58az67bm6cxq2"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-gb8s9657a65hqmv"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-qzthyh7yqvfhsa2"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.40 (s-ddd2e96uke4y83j).",
      "Reading the history of the repository for every node at every commit, and comparing whole files: the check looks only at the commit (the owner's ruling of 2026-11-19 on row 10.1.40) and at the tests and the code bound to the rule (the todo of row 10.1.40).",
      "The references to the files of `meta.code` and `meta.tests`, with the citation of s-t383grkn3q68dpf: the check reads the SpecTags.",
      "“a commit whose only change to a file of tests puts `@spec ` before bare sids (§s-rah8b37kytb682y) does not count as changing that file”, with the citation of s-rah8b37kytb682y: under rule 9.4 (s-9j2mmnuuwmx5ksn), a change to a SpecTag changes the test.",
      "“a renamed file is followed under its earlier names too”: no history is read, and s-2x58az67bm6cxq2 compares a moved or renamed file with the file at its earlier path.",
      "“The change is not refused”: by row 10.1.40, the commit is refused while the specification is approved.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:435-516 (drift) reads the history of every node and reports what lags, in a draft too. It goes, and message.ts makes the check: for each rule approved as the commit leaves the specification, it compares the fingerprint of the rule's wording with the one that its last approval in the first parent records, and finds with s-2x58az67bm6cxq2 whether the commit adds, changes or removes a test or code bound to the rule in the parent or after the commit. It reads the trailers as s-7gab4ptjt2khfr5 says, refuses only while the commit leaves the specification approved, and names the trailer. The tests at binding.test.ts:285, :297 and :308 are rewritten first for sheriff commit-message and keep s-txbwsthdqhvyzd2; those at :319 and :605 go, and so does the test of s-jau82aq9juv9zzh at :272. Tests for the trailer, for a draft specification and for a wording approved after an earlier reword are written first. The todos of row 10.1.40 are removed once the check exists; the decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 38: "An approved node without code or a test" (s-jgejd5rpd9d43pd), row 10.1.41.
// ---------------------------------------------------------------------------------------------------------------
add("s-jgejd5rpd9d43pd", {
  location: "tools 7.2.10",
  sidValue: "s-jgejd5rpd9d43pd",
  testsFrom: ["reads a TypeScript test its framework is told to skip", "reads a Python test marked to be skipped or expected to fail"],
  proposal: {
    title: "An approved rule without code or a test",
    ruTitle: "Одобренное правило без кода или теста",
    titleChange: "Было: «An approved node without code or a test». Код реализует правило, а узел — лишь форма, в которой правило хранится (ваше решение от 2026-11-11).",
    parts: [
      P("`sheriff binding` refuses a commit that includes an approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf), where that rule lacks either of the following (§s-c4y63t285gg7jz7):",
        "`sheriff binding` отвергает коммит, который включает одобренное правило, которое должен реализовывать код системы (§s-hheus6f395ynqvc, §s-6fw72j65jkqrfpf), если у этого правила нет одного из следующего (§s-c4y63t285gg7jz7):",
        "Было: «`sheriff binding` looks up each approved rule among the sids the SpecTags on the system's code and on its tests name. … A node lacking a symbol carrying its SpecTag, or a test carrying it, is reported, naming what it lacks.» По строке 10.1.41 и вашему решению от 2026-11-20 коммит отвергается, а не только сообщается, и проверяются только правила, которые включает коммит."),
      L("code of the system other than tests, bound to the rule (§s-kgbzk2ph9e6jfb4);",
        "кода системы помимо тестов, привязанного к правилу (§s-kgbzk2ph9e6jfb4);",
        "Было: «a symbol carrying its SpecTag». Код может быть привязан не только через символ, но и как файл, привязанный целиком (правило 1.5.2, ваше решение от 2026-11-17 по строке 10.1.41)."),
      L("a test of the system's code, bound to the rule (§s-zrsc6asgmhv8tnc), that is marked neither as skipped nor as expected to fail.",
        "теста кода системы, привязанного к правилу (§s-zrsc6asgmhv8tnc), который не помечен ни как пропускаемый, ни как ожидающий неудачи.",
        "Было: «a test carrying it … A test its framework is told to skip does not count.» Теперь не считается и тест, помеченный как ожидающий неудачи (ваше решение от 2026-11-20 по строке 10.1.41)."),
      P("The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and says whether it lacks code, a test or both.",
        "Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx) и говорит, чего у правила нет: кода, теста или того и другого.",
        "Было: «is reported, naming what it lacks». Отказ называет то же самое, что раньше называло сообщение."),
      P("Code or a test counts as bound to an approved rule as the rule on implementing an approved rule says, including through a chain of `implements` links (§s-6fw72j65jkqrfpf, §s-sn6au3vcr9uy5pm).",
        "Код или тест считается привязанным к одобренному правилу так, как говорит правило о реализации одобренного правила, в том числе через цепочку связей `implements` (§s-6fw72j65jkqrfpf, §s-sn6au3vcr9uy5pm).",
        "Было: «A rule implementing the node through an implements link counts for it, and so, in turn, does each rule implementing such a rule.» Без изменений по смыслу; как засчитывается цепочка связей, говорит правило 9.2, на которое узел ссылается. Слова «правило реализует правило» убраны, как вы решили 2026-11-20."),
      P("A commit includes an approved rule where it does any of the following (§s-c4y63t285gg7jz7):",
        "Коммит включает одобренное правило, если он делает что-либо из следующего (§s-c4y63t285gg7jz7):",
        "Новое: строка 10.1.41 и ваше решение от 2026-11-20. Что значит «добавляет одобрение», говорит узел «Who an added approval names», а что значит «добавляет, меняет или удаляет» — узел «What a commit adds, changes and removes in the code and the tests»."),
      L("it adds an approval of the rule (§s-75ue25v6r23jkk8);",
        "добавляет одобрение правила (§s-75ue25v6r23jkk8);",
        "Новое: первый случай строки 10.1.41."),
      L("it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that is bound to the rule in the commit's parent or as the commit leaves it;",
        "добавляет, меняет или удаляет (§s-2x58az67bm6cxq2) код или тест, привязанный к правилу в родительском коммите или в том виде, в каком его оставляет коммит;",
        "Новое: второй случай строки 10.1.41. «До коммита или после него» — в родительском коммите или в том виде, в каком его оставляет коммит."),
      L("it removes an `implements` link through which, in the commit's parent, code or a test was bound to the rule.",
        "удаляет связь `implements`, через которую в родительском коммите код или тест был привязан к правилу.",
        "Новое: третий случай строки 10.1.41."),
      P("`sheriff binding` checks the approved rules in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp). Of those rules, it leaves out the following, which the system's code need not implement (§s-6fw72j65jkqrfpf):",
        "`sheriff binding` проверяет одобренные правила в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp). Из этих правил он не проверяет следующие, которые код системы реализовывать не должен (§s-6fw72j65jkqrfpf):",
        "Было: «It looks up in the same way each approved node of a project's own NodeKind that needs code. A node of a project's own NodeKind needs code unless its extension declares it as needing none. Nodes of the SpecSheriff guidelines, of `project.json` and of `debt.json` are left out.» Имя NodeKind убрано (ваше решение от 2026-11-10). Какие типы узлов — правила, говорит узел о форме SpecTag; собственный тип узлов среди них, только если его узлам требуется имплементация. Исключения — по правилу 9.2. Проверяются и узлы в ячейках `TableRule`."),
      L("each node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
        "каждый узел собственных guidelines проекта, которые хранятся в `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
        "Было: «Nodes … of `project.json` … are left out.» Без изменений по смыслу (правило 9.2)."),
      L("in the repository where the SpecSheriff guidelines are written, each node of those guidelines, of their extensions and of the appendix of the tools, all kept in `specs/_guidelines/`;",
        "в репозитории, где пишутся SpecSheriff guidelines, — каждый узел этих guidelines, их расширений и описания инструментов, которые все хранятся в `specs/_guidelines/`;",
        "Было: «Nodes of the SpecSheriff guidelines … are left out.» Без изменений по смыслу. В проекте этих узлов нет среди файлов, которые хранит репозиторий: проект берёт их из плагина. SpecSheriff guidelines и расширения исключает правило 9.2; описание инструментов реализуют инструменты SpecSheriff, а они не код системы (правило 9.1)."),
      L("each node in `specs/tech/debt.json`, which holds the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);",
        "каждый узел в `specs/tech/debt.json`, где хранятся описания недостатков в техническом долге (§s-2r7k2aeyusgy6fw);",
        "Без изменений по смыслу."),
      L("each rule that an `exempts` link reaches, directly or through a section above the rule at any depth, where the node that declares the link is approved (§s-gf6n8ge4mke3pr2).",
        "каждое правило, до которого доходит связь `exempts`, напрямую или через раздел над правилом на любой глубине, если узел, который объявляет эту связь, одобрен (§s-gf6n8ge4mke3pr2).",
        "Было: «It is not reported where an exempts link to it or to a section it stands under exempts it.» По правилу 9.8 и вашему решению от 2026-11-11 освобождение действует, только пока одобрен узел, который его объявляет."),
      P("A test is marked as skipped or as expected to fail by a mark, a call or an option that the description of its language names for that purpose (§s-33fw3ga4ctd94dq). In TypeScript and JavaScript these include `test.skip` and `test.todo`, and in Python `pytest.mark.skip`, `pytest.mark.skipif` and `pytest.mark.xfail`.",
        "Тест помечают как пропускаемый или как ожидающий неудачи пометкой, вызовом или параметром, которые описание его языка называет для этой цели (§s-33fw3ga4ctd94dq). В TypeScript и JavaScript это, в том числе, `test.skip` и `test.todo`, а в Python — `pytest.mark.skip`, `pytest.mark.skipif` и `pytest.mark.xfail`.",
        "Было: «A test its framework is told to skip does not count.» Сказано, откуда инструменты SpecSheriff знают такие пометки: их называет описание языка, как код и делает сейчас."),
      P("`sheriff binding` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Where the commit leaves the specification a draft, the check passes and reports nothing.",
        "`sheriff binding` выполняет эту проверку, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Если коммит оставляет спецификацию черновиком, проверка проходит и ни о чём не сообщает.",
        "Новое: по строке 10.1.41 и вашему решению от 2026-11-20 коммит отвергается, пока спецификация одобрена, а пока она черновик, ни о чём не сообщается."),
    ],
    reason: "Committed without code, or without a test that a run can fail, an approved rule would let the specification state what the system does not do, unnoticed (§s-c4y63t285gg7jz7).",
    ruReason: "Одобренное правило, закоммиченное без кода или без теста, который при запуске может не пройти, позволило бы спецификации незаметно утверждать то, чего система не делает (§s-c4y63t285gg7jz7).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that declares R's SpecTag is marked `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which no run of the tests can fail.",
        "Спецификация одобрена. Коммит добавляет одобрение правила R, у которого есть код, а единственный тест, который объявляет SpecTag правила R, помечен `pytest.mark.skip`. `sheriff binding` отвергает коммит, называя R и говоря, что у него нет теста. Самая вероятная ошибка — засчитать пропускаемый тест, который не провалит ни один запуск тестов."),
    ],
    refs: [
      R("implements", ROW.r41),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-6fw72j65jkqrfpf"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-75ue25v6r23jkk8"),
      R("cites", "s-2x58az67bm6cxq2"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-2r7k2aeyusgy6fw"),
      R("cites", "s-gf6n8ge4mke3pr2"),
      R("cites", "s-33fw3ga4ctd94dq"),
      R("cites", "s-qzthyh7yqvfhsa2"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.41 (s-c4y63t285gg7jz7).",
      "The `implements` link to rule 8.3 (s-vsh384ybt4w25a2): which kinds of node are rules, a project's own kind included only where its nodes require code, is stated in s-5z5gnu7pahr82xp.",
      "“NodeKind”: the name is removed (the owner, 2026-11-10).",
      "“is reported”: by row 10.1.41, the commit is refused while the specification is approved, and nothing is reported while it is a draft.",
    ],
    date: DATE,
  },
  stage3: "binding.ts:279-313 (implementation) reports every approved TextRule and node of a project's own kind that needs code, outside specs/_guidelines/ and debt.json, counting every exempts link, in a draft too. It is to refuse, only while the commit leaves the specification approved, the rules that the commit includes: those whose approval it adds (s-75ue25v6r23jkk8), those whose bound code or tests it adds, changes or removes as s-2x58az67bm6cxq2 defines, read in the first parent and after the commit, and those that lose an implements link through which code or a test was bound to them. It is to count every kind that s-5z5gnu7pahr82xp lists, the nodes in cells, files bound as a whole, the entries of the bindings file and the files that sheriff types writes, and an exemption only from an approved exempting node. The tests at code.test.ts:63 and :68 keep s-jgejd5rpd9d43pd. The test of s-vsh384ybt4w25a2 at binding.test.ts:388, which reads the report `not implemented`, is rewritten first for the refusal; tests for a commit that removes an implements link and for a draft specification are written first. The decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 39: "A commit message names the nodes its code implements" (s-qqs2svksmjct753), row 10.1.42.
// ---------------------------------------------------------------------------------------------------------------
add("s-qqs2svksmjct753", {
  location: "tools 7.3.3",
  sidValue: "s-qqs2svksmjct753",
  testsFrom: [],
  proposal: {
    title: "The nodes that a commit message must name",
    ruTitle: "Узлы, которые должно называть сообщение коммита",
    titleChange: "Было: «A commit message names the nodes its code implements». В прежнем заголовке «its code» можно было прочесть как «код сообщения коммита».",
    parts: [
      P("`sheriff commit-message` accepts a commit message only where it gives the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message, naming each node whose sid the message lacks by its file, its sid and its location (§s-kag2m9tzdnduxdx).",
        "`sheriff commit-message` принимает сообщение коммита, только если в нём есть sid каждого узла, к которому SpecTag (§s-5z5gnu7pahr82xp) привязывает код, который коммит добавляет или меняет (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). Любое другое сообщение он отвергает и называет файл, sid и расположение каждого узла, sid которого в сообщении нет (§s-kag2m9tzdnduxdx).",
        "Было: «A commit that changes code names in its message, by sid, every node the SpecTags on its changed symbols outside the tests name. `sheriff message` refuses the message where: a node a SpecTag on a changed symbol outside the tests names is not named in it; …» Команда `sheriff message` теперь называется `sheriff commit-message` (ваше решение от 2026-11-21). Узел открывается тем, что команда принимает и отвергает, и говорит, что называет отказ."),
      P("In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.",
        "В этой проверке код — это символы (§s-kgbzk2ph9e6jfb4) и файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет в коде системы (§s-hheus6f395ynqvc), кроме тестов. Их SpecTag `sheriff commit-message` читает в том виде, в каком их оставляет коммит.",
        "Было: «changed symbols outside the tests». Теперь учитываются и файлы, привязанные целиком: SpecTag в начале файла и записи файла привязок (правило 1.5.2, ваше решение от 2026-11-17 по правилу 9.6). Слова «outside the tests» заменены на «кроме тестов». SpecTag читаются после коммита: по правилу 9.6 сообщение называет узлы, к которым SpecTag привязывает изменённый код."),
      P("A message gives a node's sid where the sid appears anywhere in the message. The lines that start with `#` are left out, since git treats them as comments.",
        "sid узла есть в сообщении, если он встречается в сообщении где угодно. Строки, которые начинаются с `#`, не учитываются, потому что git считает их комментариями.",
        "Новое: где в сообщении ищется sid; так код и делает сейчас."),
      P("`sheriff commit-message` makes this check regardless of whether the specification is approved or a draft (§s-7sk3s553ukzwtbm).",
        "`sheriff commit-message` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-7sk3s553ukzwtbm).",
        "Новое: стоимость строки 10.1.42 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "The commit message records, for whoever reads the history, which nodes the changed code implements (§s-ef93u6cnbs2sevr), and the SpecTags on that code name exactly those nodes.",
    ruReason: "Сообщение коммита записывает для того, кто читает историю, какие узлы реализует изменённый код (§s-ef93u6cnbs2sevr), а SpecTag на этом коде называют именно эти узлы.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("A commit changes only `src/ui/texts.json`, which the bindings file binds to rule R, and its message gives no sid. `sheriff commit-message` refuses the message and names R. The most likely mistake is to read only the SpecTags placed above symbols, which lets the message pass.",
        "Коммит меняет только `src/ui/texts.json`, который файл привязок привязывает к правилу R, а в его сообщении нет ни одного sid. `sheriff commit-message` отвергает сообщение и называет R. Самая вероятная ошибка — читать только SpecTag над символами: тогда сообщение проходит."),
    ],
    refs: [
      R("implements", ROW.r42),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-2x58az67bm6cxq2"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-5qdjyf6t898rsd4"),
      R("cites", "s-trwczfskj5zmuft"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-ef93u6cnbs2sevr"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.42 (s-7sk3s553ukzwtbm).",
      "“a sid in it names a domain's header or a section, which no code implements”: the owner removed that requirement from rule 9.6 on 2026-11-11.",
      "“a sid in it names no node”: no row of the main table of checks, which lists every check of the SpecSheriff guidelines, requires it, and the refusal kept a commit that removes a node from naming it. A mistyped sid of a node whose code the commit changes still leaves that node unnamed, which this check refuses.",
    ],
    date: DATE,
  },
  stage3: "message.ts:11-27 refuses a sid that names no node or names a header or a section, and reads only the SpecTags of changed symbols (changedTags, binding.ts:105-113). Both refusals go, with the test at gates.test.ts:38; changedTags is to count the files bound as a whole and the entries of the bindings file, as s-2x58az67bm6cxq2 defines what a commit adds or changes. The tests at gates.test.ts:19, :25 and :32, which carry s-ef93u6cnbs2sevr, are to carry s-qqs2svksmjct753; a test for a file that the bindings file binds is written first. The decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 40: "The tests, run before a push" (s-b6qdtghnyha3fhk), row 10.1.44.
// ---------------------------------------------------------------------------------------------------------------
add("s-b6qdtghnyha3fhk", {
  location: "tools 7.3.5",
  sidValue: "s-b6qdtghnyha3fhk",
  testsFrom: ["in draft mode the pre-push hook runs no test", "the pre-push hook runs the tests where a commit the push sends"],
  proposal: {
    title: "The tests, run before a push",
    ruTitle: "Тесты перед push",
    parts: [
      P("The pre-push hook (§s-477gtdrkw34dzxw) refuses a push where the tests of the system's code and of the project's own checks and generators fail (§s-aufnqn6t7y2me7a). It runs them by the command that `sheriff.config.json` gives as its `testCommand` (§s-zefk589ykh37b8u). The tests fail where that command ends with an exit status other than zero. Where the hook must run the tests and `sheriff.config.json` gives no `testCommand`, it refuses the push and says so.",
        "Хук pre-push (§s-477gtdrkw34dzxw) отвергает push, если тесты кода системы и собственных проверок и генераторов проекта не проходят (§s-aufnqn6t7y2me7a). Он запускает их командой, которую `sheriff.config.json` задаёт как свой `testCommand` (§s-zefk589ykh37b8u). Тесты не проходят, если эта команда завершается с кодом, отличным от нуля. Если хук должен запустить тесты, а `sheriff.config.json` не задаёт `testCommand`, он отвергает push и говорит об этом.",
        "Было: «The pre-push hook runs the tests by the project's test command.» Узел открывается тем, что отвергает хук. Отказ, если команда тестов не задана, код делает уже сейчас; теперь это сказано."),
      P("The pre-push hook runs the tests only where the push creates or updates a ref whose commit meets both of the following conditions:",
        "Хук pre-push запускает тесты, только если push создаёт или обновляет ref, коммит которого удовлетворяет обоим следующим условиям:",
        "Было: «It runs no test and compares nothing where both of these hold: the push creates or updates a ref; no commit those refs name holds the specification approved (§s-j9r8z4xdrfkfs47).» Статус одобрения теперь задают записи в `sheriff.config.json` (правило 10.6), а не правило в `project.json`. По строке 10.1.44 и вашему решению от 2026-11-17 тесты запускаются при push, только если собственные guidelines проекта называют push моментом запуска тестов. Push, который только удаляет ref, тестов больше не запускает: никакое изменение не попадает в общую ветку."),
      L("the commit leaves the specification approved: the latest entry for the specification's approval status in that commit's `sheriff.config.json` approves it (§s-qzthyh7yqvfhsa2);",
        "коммит оставляет спецификацию одобренной: последняя запись о статусе одобрения спецификации в `sheriff.config.json` этого коммита одобряет её (§s-qzthyh7yqvfhsa2);",
        "Новое: статус одобрения — по последней записи (правило 10.6), как его хранит коммит, который отправляет push."),
      L("the project's own guidelines (§s-u7tw6m8npxmv5tu), as that commit holds them in `project.json`, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h).",
        "собственные guidelines проекта (§s-u7tw6m8npxmv5tu) в том виде, в каком этот коммит хранит их в `project.json`, называют push моментом запуска тестов (§s-x8uzc8z44pwtd3h).",
        "Новое: строка 10.1.44 и правило «When the tests must pass»."),
      P("The commit of a ref is the commit that the ref names, directly or through a tag. The project's own guidelines name a push as the moment at which the tests run where a rule that refines the rule on when the tests must pass lists `push`. A rule lists `push` where its `TextRule.list` (§s-eferktypcj7njt5) has a member whose value is `push` (§s-5hb9k2e34dgn284).",
        "Коммит ref — это коммит, который ref называет напрямую или через тег. Собственные guidelines проекта называют push моментом запуска тестов, если правило, которое уточняет правило о том, когда тесты должны проходить, перечисляет `push`. Правило перечисляет `push`, если в его `TextRule.list` (§s-eferktypcj7njt5) есть элемент со значением `push` (§s-5hb9k2e34dgn284).",
        "Новое: как инструменты SpecSheriff узнают, что собственные guidelines называют push. Другие значения собственных guidelines они читают так же: через правило, которое уточняет правило SpecSheriff guidelines. Поэтому в узел «What the SpecSheriff tools read in the project's own guidelines» предлагается новый пункт."),
      P("Where the push creates or updates a ref and the pre-push hook runs no test, the hook says so and names the reason: the specification is a draft, the project's own guidelines do not name a push as the moment at which the tests run, or both.",
        "Если push создаёт или обновляет ref, а хук pre-push не запускает тестов, хук говорит об этом и называет причину: спецификация — черновик, собственные guidelines проекта не называют push моментом запуска тестов или и то и другое.",
        "Было: «It then says that the specification is a draft and no test ran.» Теперь причин может быть две, и хук называет действующую."),
    ],
    reason: "A project whose own guidelines name a push as the moment at which the tests run relies on the pre-push hook. The hook keeps a change whose tests fail from reaching the project's shared branch (§s-x8uzc8z44pwtd3h).",
    ruReason: "Проект, собственные guidelines которого называют push моментом запуска тестов, полагается на хук pre-push. Хук не даёт изменению, тесты которого не проходят, попасть в общую ветку проекта (§s-x8uzc8z44pwtd3h).",
    reasonChange: "Было: «The working tree is compared with what the push sends only because the tests run in the working tree (§s-477gtdrkw34dzxw), so where no test runs the comparison guards nothing.» Сравнение рабочего дерева с тем, что отправляет push, описывает узел «The hooks». Обоснование теперь говорит, зачем тесты запускаются перед push.",
    examples: [
      X("A project's own guidelines state that the tests run on a shared server before a merge, and none of their rules lists `push`. The specification is approved, and `sheriff.config.json` gives a `testCommand`. A developer pushes a branch, and the pre-push hook runs no test and says that the project's own guidelines do not name a push. The most likely mistake is to run the tests because a `testCommand` is given.",
        "Собственные guidelines проекта говорят, что тесты запускаются на общем сервере перед слиянием, и ни одно их правило не перечисляет `push`. Спецификация одобрена, и `sheriff.config.json` задаёт `testCommand`. Разработчик делает push ветки, а хук pre-push не запускает тестов и говорит, что собственные guidelines проекта не называют push. Самая вероятная ошибка — запустить тесты потому, что `testCommand` задан."),
    ],
    refs: [
      R("implements", ROW.r44),
      R("implements", "s-x8uzc8z44pwtd3h"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-5hb9k2e34dgn284"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements row 10.1.44 (s-aufnqn6t7y2me7a).",
      "The `implements` link to “Tests at a push while the specification is a draft” (s-xhcmchcngykvn2k): that rule is in the archive; row 10.1.44 and “When the tests must pass” (s-x8uzc8z44pwtd3h) replace it.",
      "The citation of s-j9r8z4xdrfkfs47 for whether a commit holds the specification approved: the entries in `sheriff.config.json` now set the approval status (rule 10.6, s-qzthyh7yqvfhsa2).",
      "“compares nothing”, and the reason about the comparison: “The hooks” (s-477gtdrkw34dzxw) compares the working tree only before a push that runs the tests.",
      "Running the tests where the push only deletes refs: such a push brings no change to the shared branch.",
    ],
    date: DATE,
  },
  stage3: "push-mode.ts reads, in each commit, the rule of project.json that approves the specification (specificationApproved). It is to read the latest entry for the approval status in that commit's sheriff.config.json, and the members of the rules of that commit's project.json that refine s-x8uzc8z44pwtd3h. hooks/pre-push runs the tests where the push only deletes refs; it is to run them only where a created or updated ref's commit meets both conditions, and otherwise to name the condition that no such commit meets. The tests at hooks.test.ts:246 and :255 are rewritten first for the entries and the `push` member and keep s-b6qdtghnyha3fhk; a test for a project whose guidelines name no push is written first. The decisions of the node stay on it, the one of 2026-11-06 restated without its citation of s-xhcmchcngykvn2k, which the new form drops.",
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal for the agreed "What the SpecSheriff tools read in the project's own guidelines" (new:tools-1-project):
// one item for where the tests run, which item 40 reads.
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["new:tools-1-project"];
  const bp = base.proposal;
  const parts = bp.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: SAME }));
  // The Russian of the item on the project's own kinds uses «виды», where the owner's word is «тип узлов».
  const kinds = parts.findIndex((x) => x.en.startsWith("the project's own kinds of node"));
  parts[kinds] = {
    ...parts[kinds],
    ru: "собственные типы узлов проекта: элементы `TextRule.list` правила, которое уточняет правило о таких типах (§s-vsh384ybt4w25a2);",
    change: "Изменён только русский текст: «собственные виды узлов» → «собственные типы узлов», как вы называете их с 2026-11-10. Английский — как в согласованной формулировке.",
  };
  const checks = parts.findIndex((x) => x.en.startsWith("the project's own checks and generators"));
  parts.splice(checks + 1, 0, {
    kind: "li",
    en: "where the tests run: the members of the `TextRule.list` of the rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h);",
    ru: "где запускаются тесты: элементы `TextRule.list` правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h);",
    change: "Новый пункт: строка 10.1.44 отвергает push, только если собственные guidelines проекта называют push моментом запуска тестов, и хук pre-push читает это здесь (узел «The tests, run before a push»).",
  });
  const refines = parts.findIndex((x) => x.en.startsWith("Where an item above refers to the rule that refines another rule"));
  parts[refines] = {
    ...parts[refines],
    en: "Where an item above refers to the rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link to that other rule, and read:",
    ru: "Если пункт выше говорит о правиле, которое уточняет другое правило, инструменты SpecSheriff находят это правило по его связи `refines` с тем другим правилом и читают:",
    change: "Было: «by the `refines` link it carries» («по связи `refines`, которую оно несёт»). Узел ничего не «несёт», ни по-английски, ни по-русски (ваше правило от 2026-10-31); смысл тот же.",
  };
  add("proposal:new-tools-1-project-g4", {
    question: "None: carries out row 10.1.44, whose check depends on whether the project's own guidelines name a push as the moment at which the tests run",
    base: "new:tools-1-project",
    location: base.location,
    change: "Добавлен один пункт: где запускаются тесты — элементы `TextRule.list` правила, которое уточняет правило «When the tests must pass». Строка 10.1.44 отвергает push, только если собственные guidelines проекта называют push моментом запуска тестов, поэтому инструменты SpecSheriff должны это читать (узел «The tests, run before a push»). В абзаце после первого списка «по связи `refines`, которую оно несёт» заменено на «по его связи `refines` с тем другим правилом»: узел ничего не «несёт» (ваше правило). В русском тексте «собственные виды узлов» заменены на «собственные типы узлов», ваш термин. В обосновании «the tools» заменено на «the SpecSheriff tools». Остальная формулировка — как вы согласовали 2026-11-21.",
    proposal: {
      title: bp.title,
      ruTitle: bp.ruTitle,
      parts,
      reason: bp.reason.replace("so the tools find", "so the SpecSheriff tools find"),
      ruReason: bp.ruReason.replace("поэтому инструменты находят", "поэтому инструменты SpecSheriff находят"),
      reasonChange: "Было: «so the tools find each value». Инструменты SpecSheriff названы полностью, как требует ваше правило от 2026-11-05: в спецификации они никогда не просто «инструменты». Смысл тот же.",
      refs: [...bp.refs.slice(0, 9), R("implements", "s-x8uzc8z44pwtd3h"), ...bp.refs.slice(9)],
      removed: [],
      date: DATE,
    },
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Checks, then the writes.
// ---------------------------------------------------------------------------------------------------------------
const problems = [];

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
for (const sid of Object.values(ROW)) if (!targets.has(sid)) problems.push(`row ${sid} names no known node`);
for (const key of Object.keys(entries)) if (!key.startsWith("proposal:") && !tools.nodes.some(function has(n) { return n.sid === key || (n.children || []).some(has); })) problems.push(`${key}: no such node in tools.json`);

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
  // Each part of each paragraph says the same in both languages as far as code goes: the same text in backticks.
  for (const x of p.parts) {
    const ticks = (s) => [...s.matchAll(/`[^`]*`/g)].map((m) => m[0]).sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  }
  const ownText = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.en).join(" ")
    : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").split(/(?<=[.;:])\s+|\n/)) {
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
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/]) {
    const plain = en.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS");
    if (bad.test(plain)) problems.push(`${key}: the English holds ${bad}`);
  }
  const ruAll = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.ru).join("\n")
    : [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].join("\n");
  if (/несёт|несут|несущ|владел/.test(ruAll)) problems.push(`${key}: the Russian says «несёт» or «владелец»`);
  if (/[Рр]аунд|рецензент сказал|review-g/.test(JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + p.reasonChange)) problems.push(`${key}: a change field tells the history of the rounds`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const before = JSON.parse(backupText);
if (!fs.existsSync(beforeUrl)) fs.writeFileSync(beforeUrl, backupText);
for (const [key, e] of Object.entries(entries)) {
  // A draft of an existing node keeps the fields the drafts hold for it that this script does not write, such as a
  // review; the agreed drafts are never among them.
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

// english-group4.md: the English of every node of the group, for EngStickler's readers.
const md = [
  "# T25, group 4: the English of every node",
  "",
  "This file holds the final English of every node of group 4 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group4.mjs: the drafts of items 33 to 40 of the appendix of the tools, and the proposal for the agreed \"What the SpecSheriff tools read in the project's own guidelines\".",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "propose-group4.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title}`, "");
  if (e.base) md.push(`A proposal: the complete new wording of the node agreed under \`${e.base}\`. Only the item on where the tests run, the sentence after the first list and the words "the SpecSheriff tools" in the reason differ from it.`, "");
  md.push(`**Title:** ${p.title}`, "", "**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group4.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} drafts: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, to look at:\n${longSentences.join("\n")}`);
