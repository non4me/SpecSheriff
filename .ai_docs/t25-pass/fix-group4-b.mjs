// T25, stage 2, group 4, round b: applies the findings of review-g4-a.md to review-g4-d.md and of EngStickler's readers
// (english-g4-fast.md, english-g4-thorough.md) to the drafts of items 33 to 40, as fix-brief-group4-b.md says. It
// rewrites the nine keys of round a and adds three: the new row 10.1.37a (proposal:row-10-1-37a), a proposal on rule
// 10.12 (proposal:s-pcnyfp7gev7syax-g4) and a proposal on row 10.1.41 (proposal:row-10-1-41-g4).
// It copies tools-drafts.json to tools-drafts.before-group4-b.json on its first run and rebuilds from that copy on every
// run, so two runs give the same file. It checks every draft (citations against links, the Russian citing the same sids,
// no citation by location outside backticks, link targets existing, the new sid unique, no key outside the group
// changed) before it writes. It also writes english-group4b.md, the English of every changed or new node.
import fs from "node:fs";
import path from "node:path";

const here = new URL(".", import.meta.url);
const root = path.resolve(new URL("../..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const url = new URL("tools-drafts.json", here);
const beforeUrl = new URL("tools-drafts.before-group4-b.json", here);
const backupText = fs.existsSync(beforeUrl) ? fs.readFileSync(beforeUrl, "utf8") : fs.readFileSync(url, "utf8");
const drafts = JSON.parse(backupText);
const DATE = "2026-11-24";

const render = (parts, key) => {
  const out = [];
  let n = 0;
  for (const x of parts) {
    if (x.kind === "p") {
      out.push((out.length ? "\n" : "") + x[key]);
      n = 0;
    } else if (x.kind === "ol") out.push(`${++n}. ${x[key]}`);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};
const P = (en, ru, change) => ({ kind: "p", en, ru, change });
const L = (en, ru, change) => ({ kind: "li", en, ru, change });
const O = (en, ru, change) => ({ kind: "ol", en, ru, change });
const R = (type, to) => ({ type, to });
const X = (en, ru) => ({ en, ru });
const SAME = "Как в согласованной формулировке.";

// The sid of the new row 10.1.37a, checked below to be unique across specs/, moved/ and tools-drafts.json.
const NEW_ROW = "s-vj67ztqkuhxbv7s";
const ROW = {
  r37: "s-ujm7nfxkk9j3464",
  r38: "s-u5hfbygfyqv4wmf",
  r39: "s-e84nggntkrcyumq",
  r39a: "s-dwxjxb7rw4w5yn3",
  r40: "s-ddd2e96uke4y83j",
  r41: "s-c4y63t285gg7jz7",
  r42: "s-7sk3s553ukzwtbm",
  r44: "s-aufnqn6t7y2me7a",
};

const entries = {};
const add = (key, e) => {
  entries[key] = e;
};
const keep = (key) => {
  const { location, sidValue, testsFrom } = drafts[key];
  return { location, sidValue, testsFrom };
};

// ---------------------------------------------------------------------------------------------------------------
// Item 33: "How a project's own check is run" (s-7pk89t8z6wymmj9), rows 10.1.37 and 10.1.37a.
// ---------------------------------------------------------------------------------------------------------------
add("s-7pk89t8z6wymmj9", {
  ...keep("s-7pk89t8z6wymmj9"),
  proposal: {
    title: "How a project's own check is run",
    ruTitle: "Как запускается собственная проверка проекта",
    parts: [
      P("Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that its failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.",
        "Если проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), не проходит, `sheriff validate` отвергает изменение. Если правило, которое перечисляет проверку, говорит, что о её неудаче только сообщается, `sheriff validate` вместо отказа сообщает о неудаче (§s-ujm7nfxkk9j3464). Отказ или сообщение называет проверку и показывает, что она напечатала в стандартный вывод и в стандартный поток ошибок. Если проверка ничего не напечатала, показывается код её завершения.",
        "Было: «An exit code other than zero refuses, or is reported where the rule listing the check says it reports. What the check printed is shown with it.» Узел теперь открывается тем, что отвергает команда и что называет отказ, как другие узлы проверок. Уточнено, что показывается и стандартный вывод, и поток ошибок, а если проверка ничего не напечатала — код её завершения; так код и делает сейчас."),
      P("`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only where its process exits with status zero.",
        "`sheriff validate` запускает каждую собственную проверку проекта командой, которую для неё называет `sheriff.config.json` (§s-zefk589ykh37b8u). Проверка выполняется в каталоге, в котором выполняется `sheriff validate`. При коммите этот каталог содержит то, что содержит коммит (§s-477gtdrkw34dzxw). На стандартный вход проверка получает модель спецификации в том виде, в каком её печатает `sheriff json` (§s-w6gybeqn2ttydqx). Проверка проходит, только если её процесс завершается с кодом ноль.",
        "Было: «`sheriff validate` runs each check a project's own guidelines add (§s-2fau85dfyyeq66m), by the command the settings name for it. The check runs in the directory the other checks read. The check is handed on its standard input what `sheriff model` prints.» Команда `sheriff model` теперь называется `sheriff json`, по вашему решению от 2026-11-21. Каталог назван точнее: тот, в котором выполняется `sheriff validate`; при коммите это каталог с тем, что содержит коммит (узел «The hooks»). Добавлено, когда проверка проходит."),
      P("The rule that `sheriff.config.json` names for a check lists the check as a member of its `TextRule.list` (§s-eferktypcj7njt5) whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). The rule says that the check's failure is only reported where that member is an object whose `onFailure` is `reported`. Where the rule lists no member whose value is the check's name, `sheriff validate` refuses the change, naming the check and the rule.",
        "Правило, которое `sheriff.config.json` называет для проверки, перечисляет её как элемент своего `TextRule.list` (§s-eferktypcj7njt5), значение которого (§s-5hb9k2e34dgn284) — имя проверки. Это правило `sheriff validate` читает в его последней одобренной формулировке (§s-a8fn72xa782wvbk). Правило говорит, что о неудаче проверки только сообщается, если этот элемент — объект, у которого `onFailure` равно `reported`. Если в правиле нет элемента, значение которого — имя проверки, `sheriff validate` отвергает изменение и называет проверку и правило.",
        "Новое: как правило, которое перечисляет проверку, говорит, что о неудаче проверки только сообщается. Это свойство `onFailure` элемента перечня; так его уже читает код. По вашему решению от 2026-11-04 по правилу 10.8 это решает правило, которое одобряет ответственный, а не настройки. Правило читается в последней одобренной формулировке: по правилу 1.3.2 и принципу «Nothing unapproved is implemented» правило-черновик не реализуется, а иначе любой мог бы отключить проверку, изменив правило. Отказ, если правило не перечисляет проверку, код делает уже сейчас; так же поступает согласованный узел «How a project's own code generator is run»."),
      P("`sheriff validate` runs the project's own checks only once the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before each of its other checks (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find.",
        "Собственные проверки проекта `sheriff validate` запускает, только когда файлы спецификации прошли проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), и проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7). Он запускает их до каждой из остальных своих проверок (§s-pcnyfp7gev7syax). Эти остальные проверки он выполняет, что бы ни нашли собственные проверки проекта.",
        "Новое: по правилу 10.12 собственные проверки проекта выполняются раньше проверок SpecSheriff guidelines, и каждый шаг выполняется независимо от того, что нашли предыдущие. Проверка на ключ, записанный больше одного раза, и проверка по схеме останавливают `sheriff validate`, если отвергают файл (согласованные узлы «A key written more than once in one object» и «Validation against the schema before a command works on the files»), а собственная проверка читает узлы через модель. Поэтому собственные проверки запускаются после этих двух. Правило 10.12 приводится в соответствие с этим отдельным предложением. Сейчас код запускает собственные проверки последними."),
      P("`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which it runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.",
        "`sheriff validate` отвергает изменение, если одна из собственных проверок проекта добавляет, меняет или удаляет файл в каталоге, в котором она выполняется, кроме файла, который git игнорирует (§s-vj67ztqkuhxbv7s). Отказ называет проверку и каждый такой файл.",
        "Новое: по правилу 10.12 собственные проверки проекта не меняют файлов, иначе следующие проверки читали бы не то, что содержит коммит. Эту проверку называет новая строка 10.1.37a основной таблицы проверок. Собственный инструмент проекта в git hook за то же самое отвергается уже сейчас; собственную проверку код сейчас не проверяет."),
      P("Given the option `--strict`, `sheriff validate` passes each of the project's own checks a model of the specification in which the specification is approved and its `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag to. The other checks of `sheriff validate` give the same results with or without the option.",
        "С параметром `--strict` `sheriff validate` передаёт каждой собственной проверке проекта модель спецификации, в которой спецификация одобрена, а её флаг `strict` включён (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). Так он делает, какими бы ни задавали статус одобрения и флаг записи в `sheriff.config.json` (§s-zefk589ykh37b8u). Остальные проверки `sheriff validate` с этим параметром и без него дают одинаковые результаты.",
        "Новое: согласованный узел «The settings that only an owner of the specification changes» называет `sheriff validate --strict` командой, которая показывает, что нашли бы собственные проверки проекта, если бы спецификация была одобрена, а флаг `strict` включён (правило 10.7). Здесь сказано, как эта команда это делает."),
      P("Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft). It passes them a model in which the specification is approved and the `strict` flag is as its entries set it. In the cases that the rule on the `strict` flag names (§s-q3pfzyaxvpr2zj2), `sheriff settings` runs them as `sheriff validate --strict` runs them.",
        "Прежде чем записать одобрение спецификации, `sheriff settings` запускает собственные проверки проекта (§s-chsfpkgpmfk4fft). Он передаёт им модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают его записи. В случаях, которые называет правило о флаге `strict` (§s-q3pfzyaxvpr2zj2), `sheriff settings` запускает их так, как их запускает `sheriff validate --strict`.",
        "Новое: правило 10.6 перед одобрением спецификации запускает проверки так, как если бы она была одобрена, а флаг `strict` при этом остаётся таким, каким его задают записи; так проверка строки 10.1.37 выполняется и при выключенном флаге. Случаи, когда процедура проверяет с включённым флагом, называет правило 10.7, и для них согласованный узел «The settings that only an owner of the specification changes» называет `sheriff validate --strict`."),
      P("`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).",
        "Собственные проверки проекта `sheriff validate` запускает независимо от того, одобрена спецификация или она черновик (§s-ujm7nfxkk9j3464).",
        "Новое: стоимость строки 10.1.37 не зависит от статуса спецификации. Статус одобрения и флаг `strict` проверка узнаёт из модели и может учитывать их сама."),
    ],
    reason: "`sheriff validate` runs a project's own checks wherever the checks of the SpecSheriff guidelines run, on the same files. So such a check binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).",
    ruReason: "`sheriff validate` запускает собственные проверки проекта везде, где выполняются проверки SpecSheriff guidelines, на тех же файлах. Поэтому такая проверка обязательна для каждого участника и не зависит от того, кто вспомнит её запустить (§s-2fau85dfyyeq66m).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. The check `spelling` finds a misspelt word in a node's text, prints the node's sid and exits with status 1. `sheriff validate` reports the failure, showing the sid, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.",
        "У правила, которое перечисляет собственные проверки проекта, `TextRule.list.property` — `name`, и один из его элементов — `{\"name\": \"spelling\", \"onFailure\": \"reported\"}`. Проверка `spelling` находит слово с опечаткой в тексте узла, печатает sid узла и завершается с кодом 1. `sheriff validate` сообщает о неудаче, показывая sid, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что код завершения проверки не равен нулю."),
    ],
    refs: [
      R("implements", ROW.r37),
      R("implements", NEW_ROW),
      R("implements", "s-2fau85dfyyeq66m"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-5hb9k2e34dgn284"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-7zqsstgnuc772ba"),
      R("cites", "s-xzcw3hv4hmxz7h7"),
      R("cites", "s-pcnyfp7gev7syax"),
      R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-q3pfzyaxvpr2zj2"),
      R("cites", "s-chsfpkgpmfk4fft"),
    ],
    removed: [
      "The `implements` link to the main table of checks (s-jau82aq9juv9zzh): the node implements rows 10.1.37 (s-ujm7nfxkk9j3464) and 10.1.37a (s-vj67ztqkuhxbv7s).",
    ],
    date: DATE,
  },
  stage3: "validate.ts:187-205 (projectChecks) runs the project's own checks after every other check of sheriff validate (validate.ts:178), reads the listing rule as the files hold it, and matches a member only where it is an object (validate.ts:194). It is to run them once the files have passed the check of keys written more than once and the validation against the schema, before the other checks; to read the listing rule in its last approved wording (s-a8fn72xa782wvbk) and match a member by its value as s-5hb9k2e34dgn284 defines it, a string member included; to hand each check the model as sheriff json prints it (s-w6gybeqn2ttydqx), or under `--strict` with the approval status approved and the strict flag on; and to refuse a check that adds, changes or removes a file that git does not ignore in the directory in which it runs (row 10.1.37a). cli.ts is to accept `sheriff validate --strict`, and sheriff settings is to run the own checks as this node says before it records an approval. The test at validate.test.ts:525 keeps s-7pk89t8z6wymmj9; tests for the order, for `--strict`, for a string member, for a draft listing rule and for a check that changes a file are written first, the last carrying s-vj67ztqkuhxbv7s. The todo of 2026-11-06 on a time limit for a project's own check and generator stays on the node, and so do its decisions.",
});

// The new row 10.1.37a of the main table of checks, implemented by s-7pk89t8z6wymmj9.
add("proposal:row-10-1-37a", {
  question: "None: carries out rule 10.12 (s-pcnyfp7gev7syax), whose second step runs a project's own checks, none of which changes a file, so that a row of the main table of checks states that check",
  location: "spec 10.1.37a (new row of the main table of checks, after row 10.1.37)",
  sidValue: NEW_ROW,
  kind: "cell",
  cost: { en: "refused, naming the check and each such file", ru: "отвергается с указанием проверки и каждого такого файла" },
  change: "Новая строка основной таблицы проверок после строки 10.1.37. Правило 10.12 требует, чтобы собственные проверки проекта не меняли файлов, но ни одна строка таблицы этого не проверяет, а таблица говорит о себе, что содержит полный перечень проверок; так же группа 3 добавила строки 10.1.35a и 10.1.43b. Строка охватывает только собственные проверки проекта, которые запускает `sheriff validate`. Что остальные собственные инструменты проекта второго шага правила 10.12 тоже не меняют файлов, остаётся узлу описания инструментов «The hooks». Новую строку реализует узел описания инструментов «How a project's own check is run» (s-7pk89t8z6wymmj9).",
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves every file in the directory in which it runs as it was, other than a file that git ignores",
        "Проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), оставляет каждый файл в каталоге, в котором она выполняется, таким, каким он был, кроме файла, который git игнорирует",
        "Новая строка; без точки в конце, как у других строк таблицы. Почему она нужна, сказано выше."),
    ],
    reason: null,
    ruReason: null,
    refs: [R("checks", "s-pcnyfp7gev7syax"), R("cites", "s-2fau85dfyyeq66m")],
    removed: [],
    date: DATE,
  },
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal on rule 10.12 (s-pcnyfp7gev7syax): the checks of the files' structure run before a project's own checks.
// ---------------------------------------------------------------------------------------------------------------
add("proposal:s-pcnyfp7gev7syax-g4", {
  question: "None: brings rule 10.12 into line with the agreed draft \"Validation against the schema before a command works on the files\", under which a project's own checks can run only on files that have passed the checks of their structure",
  location: "spec 10.12",
  sidValue: "s-pcnyfp7gev7syax",
  change: "Добавлен один абзац со списком. Собственные проверки проекта и остальные проверки SpecSheriff guidelines запускаются, только если прошли проверки строк 10.1.1 (объект задаёт каждому свойству одно значение) и 10.1.2 (файл соответствует своей JSON Schema), поэтому эти проверки идут раньше собственных проверок проекта. Так правило 10.12 приводится в соответствие с согласованным узлом «Validation against the schema before a command works on the files»: `sheriff validate` проверяет файлы по схеме до любой проверки, которая читает узлы, и останавливается при отказе, а собственная проверка проекта читает узлы через модель спецификации. Так же поступает согласованный узел «A key written more than once in one object». В обоснование добавлен абзац о том, зачем эти проверки идут первыми. Остальная формулировка — как вы согласовали 2026-11-18.",
  proposal: {
    title: "The order in which tools and checks run on a commit and on a push",
    ruTitle: "В каком порядке запускаются инструменты и проверки при коммите и при push",
    parts: [
      P("On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in three steps:",
        "При коммите и при push собственные инструменты проекта, инструменты SpecSheriff и проверки запускаются в три шага:",
        SAME),
      O("the tools that rewrite files: first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list, such as formatters, and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);",
        "инструменты, которые переписывают файлы: сначала такие собственные инструменты проекта, которые перечисляют собственные guidelines проекта (§s-u7tw6m8npxmv5tu), например форматтеры, а затем генераторы — и инструментов SpecSheriff, и собственные генераторы проекта (§s-km4x4s26kv7pjze);",
        SAME),
      O("the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, none of which changes a file;",
        "собственные проверки проекта (§s-2fau85dfyyeq66m) и остальные собственные инструменты проекта, которые не меняют файлов;",
        SAME),
      O("the checks of the SpecSheriff guidelines (§s-jau82aq9juv9zzh).",
        "проверки SpecSheriff guidelines (§s-jau82aq9juv9zzh).",
        SAME),
      P("After the first step, nothing changes what the commit contains. Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check passes and no tool fails.",
        "После первого шага ничто не меняет содержимого коммита. Каждый шаг запускается, что бы ни нашли предыдущие. Коммит или push проходит, только если проходят все проверки и все инструменты.",
        SAME),
      P("As an exception, the project's own checks and the other checks of the SpecSheriff guidelines run only once the following checks, which therefore run first, have passed:",
        "В виде исключения собственные проверки проекта и остальные проверки SpecSheriff guidelines запускаются, только когда прошли следующие проверки, которые поэтому выполняются первыми:",
        "Новое: согласованный узел «Validation against the schema before a command works on the files» проверяет файлы по схеме до любой проверки, которая читает узлы, и при отказе останавливает команду; собственная проверка проекта читает узлы через модель. Поэтому эти проверки идут раньше собственных проверок проекта, а прочие проверки запускаются, только если они прошли."),
      L("that each object in a file of the specification, of its archive or of its schema gives each of its properties one value (§s-d5cgda5bdsn7bzy);",
        "что каждый объект в файле спецификации, её архива или её схемы задаёт каждому своему свойству одно значение (§s-d5cgda5bdsn7bzy);",
        "Новое: проверка строки 10.1.1; при отказе она тоже останавливает `sheriff validate` (согласованный узел «A key written more than once in one object»)."),
      L("that every file of the specification complies with its JSON Schema (§s-emrfpzw2d5bgb6x).",
        "что каждый файл спецификации соответствует своей JSON Schema (§s-emrfpzw2d5bgb6x).",
        "Новое: проверка строки 10.1.2."),
      P("Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes the commit or the push is told that no SpecSheriff check ran.",
        "Там, где инструменты SpecSheriff не могут запуститься, собственные инструменты проекта всё равно запускаются. Тогда коммит или push проходит, если ни один из них не отклонил его. Тот, кто его делает, получает сообщение, что ни одна проверка SpecSheriff не запускалась.",
        SAME),
    ],
    reason: "A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository, and adopting the method must not stop them.\n\nThe order runs from the most specific to the most general. Whatever rewrites files runs first, so every check reads the commit in its final form. The checks of the SpecSheriff guidelines run last, after the project's own checks. A tool that changed the commit after the checks would let through what no check had read.\n\nThe checks that a file gives each property one value and complies with its JSON Schema come before the project's own checks, since every other check reads the nodes of the files that those checks have passed.\n\nThe generators, both those of the SpecSheriff tools and the project's own, run after the project's other tools that rewrite files, so that no formatter changes what they generate.\n\nWhere the SpecSheriff tools cannot run, as on a machine without the plugin, the project's own tools still guard the commit, and a team that needs the checks to hold for everyone runs them in CI.",
    ruReason: "Проект может запускать при коммите или push свои инструменты, например проверку того, что ничего внутреннего не попадает в публичный репозиторий, и переход на метод не должен их останавливать.\n\nПорядок идёт от частного к общему. Всё, что переписывает файлы, запускается первым, поэтому каждая проверка читает коммит в окончательном виде. Проверки guidelines запускаются последними, на том, что уже прошло проверки проекта. Инструмент, который менял бы коммит после проверок, пропустил бы то, чего не читала ни одна проверка.\n\nПроверки того, что файл задаёт каждому свойству одно значение и соответствует своей JSON Schema, идут раньше собственных проверок проекта, потому что все остальные проверки читают узлы файлов, которые эти проверки прошли.\n\nГенераторы, и инструментов SpecSheriff, и собственные генераторы проекта, запускаются после остальных собственных инструментов проекта, которые переписывают файлы, чтобы ни один форматтер не менял того, что они генерируют.\n\nТам, где инструменты SpecSheriff не могут запуститься, например на машине без плагина, собственные инструменты проекта всё равно защищают коммит, а команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.",
    reasonChange: "Добавлен третий абзац: зачем проверки строк 10.1.1 и 10.1.2 идут раньше собственных проверок проекта. Остальное — как в согласованной формулировке.",
    examples: [
      X("A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. A scan for secrets runs next, and the checks of the SpecSheriff guidelines run last, on the final files.",
        "Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. После этого запускается поиск секретов, а проверки guidelines запускаются последними, на окончательных файлах."),
    ],
    refs: [
      R("refines", "s-jau82aq9juv9zzh"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-km4x4s26kv7pjze"),
      R("cites", "s-2fau85dfyyeq66m"),
      R("cites", "s-d5cgda5bdsn7bzy"),
      R("cites", "s-emrfpzw2d5bgb6x"),
    ],
    removed: [],
    date: DATE,
  },
});

// ---------------------------------------------------------------------------------------------------------------
// Item 34: "Citing a node only by its sid" (s-nh8b2hjvzasdxmd), row 10.1.38.
// ---------------------------------------------------------------------------------------------------------------
add("s-nh8b2hjvzasdxmd", {
  ...keep("s-nh8b2hjvzasdxmd"),
  proposal: {
    title: "A node's location outside the specification",
    ruTitle: "Расположение узла за пределами спецификации",
    titleChange: "Было: «Citing a node only by its sid». Узел теперь открывается тем, что отвергает `sheriff binding`, — расположением узла в файле за пределами спецификации; заголовок говорит о том же.",
    parts: [
      P("`sheriff binding` refuses each location of a node (§s-kag2m9tzdnduxdx) written in a file that the repository keeps outside `specs/`, the folder that holds the files of the specification (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). The refusal names the file, the line and the location, and says that a node is cited by its sid (§s-9spq78kdwsxr759).",
        "`sheriff binding` отвергает каждое расположение узла (§s-kag2m9tzdnduxdx), записанное в файле, который репозиторий хранит вне `specs/`, — папки, в которой хранятся файлы спецификации (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). Отказ называет файл, строку и расположение и говорит, что узел цитируют по его sid (§s-9spq78kdwsxr759).",
        "Было: «Wherever a node is cited, a rule, a term or a node of a project's own NodeKind, it is cited by its sid, never by its location (§s-kag2m9tzdnduxdx). `sheriff binding` holds every file of the repository to this but those under `specs/`. There `sheriff validate` checks the citations in the nodes (§s-qzyacnqwvaeaps4).» Узел открывается тем, что отвергает команда и что называет отказ. Что узел цитируют по sid, теперь говорит правило «A node is cited by its sid», и узел ссылается на него. Перечень видов узлов с NodeKind убран: имя NodeKind вы убрали 2026-11-10, а расположение отвергается, какой бы узел оно ни называло. Фраза о `sheriff validate` убрана: это говорит узел «Citations and the links that match them»."),
      P("`sheriff binding` treats each of the following as a location, whatever the case of its letters:",
        "`sheriff binding` считает расположением каждое из следующего, в каком бы регистре ни были написаны его буквы:",
        "Было: «A location of a node found in a file is refused, in any case of its letters and whether or not the node exists now.» Без изменений по смыслу. Сказано, какой текст считается расположением, по узлу «How a node's location is computed»."),
      L("text in the form of a numbered node's location (§s-ygg5kpcxgzq3m7w), such as `base/3.2` or `_guidelines/spec/1.3.4`, whether or not a node is at that location now;",
        "текст в форме расположения нумерованного узла (§s-ygg5kpcxgzq3m7w), например `base/3.2` или `_guidelines/spec/1.3.4`, независимо от того, есть ли сейчас узел по этому расположению;",
        "Без изменений по смыслу: расположение отвергается, даже если узла по нему сейчас нет."),
      L("the location that the model of the specification (§s-w6gybeqn2ttydqx) gives a term (§s-khqsmy6mhejkrhg), such as `contracts/request`;",
        "расположение, которое модель спецификации (§s-w6gybeqn2ttydqx) даёт термину (§s-khqsmy6mhejkrhg), например `contracts/request`;",
        "Без изменений по смыслу: так код и делает сейчас. Расположение термина не нумеруется, поэтому оно названо отдельно; так же отвергается и термин, имя которого оканчивается цифрой."),
      L("the location that the model gives the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), such as `tech/stack`.",
        "расположение, которое модель даёт первому узлу верхнего уровня файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5), например `tech/stack`.",
        "Без изменений по смыслу: так код и делает сейчас. Расположение первого узла файла тоже не нумеруется. Расположение заголовка домена, например `requests`, — обычное слово, поэтому не считается."),
      P("Text has the form of a numbered node's location where it consists of one of the following, followed by a slash and one or more numbers separated by dots:",
        "Текст имеет форму расположения нумерованного узла, если он состоит из одного из следующего, за которым следуют косая черта и один или несколько номеров, разделённых точками:",
        "Новое: какой текст имеет форму расположения, — по узлу «How a node's location is computed»; так и делает код сейчас."),
      L("the name of a folder under `specs/` that holds files of the base specification (§s-5x737t9nee4zgaa);",
        "имя папки в `specs/`, в которой хранятся файлы базовой спецификации (§s-5x737t9nee4zgaa);",
        "Новое: так начинается расположение узла базовой спецификации, например `base/3.2`."),
      L("the location of the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix.",
        "расположение первого узла верхнего уровня файла guidelines, описания инструментов или технического приложения.",
        "Новое: так начинается расположение узла в таком файле, например `_guidelines/spec/1.3.4`."),
      P("`sheriff binding` treats text as a location only where the text stands on its own, not as part of a longer path or name, as `tech/stack` is part of `specs/tech/stack.json`.",
        "`sheriff binding` считает текст расположением, только если этот текст стоит отдельно, а не входит в более длинный путь или имя, как `tech/stack` входит в `specs/tech/stack.json`.",
        "Новое: часть более длинного пути или имени расположением не считается; так и делает код сейчас."),
      P("`sheriff binding` leaves out each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).",
        "`sheriff binding` оставляет без проверки каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).",
        "Было: «One exception: the fixtures of the tests of a check that reads citations or locations. Such a test needs a file holding a location, as the data it feeds the check. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).» Без изменений по смыслу. Зачем такому тесту файл с расположением, говорит правило 10.11, поэтому здесь это не повторяется."),
      P("`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-u5hfbygfyqv4wmf).",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-u5hfbygfyqv4wmf).",
        "Новое: стоимость строки 10.1.38 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification, a location comes with no link to the node that it names. A location left in a file would then point at another node, or at none, and no other check would notice it.",
    ruReason: "Расположение узла меняется всякий раз, когда спецификацию переупорядочивают, а его sid не меняется никогда (§s-9spq78kdwsxr759). За пределами спецификации у расположения нет связи с узлом, который оно называет. Поэтому расположение, оставленное в файле, указывало бы на другой узел или ни на какой, и ни одна другая проверка этого бы не заметила.",
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
      R("cites", "s-u7tw6m8npxmv5tu"),
    ],
    removed: drafts["s-nh8b2hjvzasdxmd"].proposal.removed,
    date: DATE,
  },
  stage3: drafts["s-nh8b2hjvzasdxmd"].stage3,
});

// ---------------------------------------------------------------------------------------------------------------
// Item 35: "A citation outside the specification" (s-m8nmfsxkcfu7cjp), row 10.1.39.
// ---------------------------------------------------------------------------------------------------------------
add("s-m8nmfsxkcfu7cjp", {
  ...keep("s-m8nmfsxkcfu7cjp"),
  proposal: {
    title: "A citation outside the specification",
    ruTitle: "Цитата за пределами спецификации",
    parts: [
      P("`sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):",
        "`sheriff citations` отвергает каждое из следующего в файлах, которые он читает (§s-e84nggntkrcyumq):",
        "Было: «`sheriff citations` resolves each sid in the code, the tests and the documents against the nodes, the archive's included. It refuses a `§` followed by a number in place of a sid, such as `§5.8`: a node is cited only by its sid.» Узел открывается тем, что отвергает команда, и говорит, что называет отказ."),
      L("a word that has the form of a sid (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);",
        "слово, которое имеет форму sid (§s-eferktypcj7njt5), если этот sid не называет ни одного узла модели спецификации (§s-w6gybeqn2ttydqx);",
        "Было: «resolves each sid … against the nodes, the archive's included». Архив больше не учитывается: у узла архива нет собственного sid (правило 2.6), как и говорит todo строки 10.1.39. sid ищется в модели спецификации, в которой есть и узлы SpecSheriff guidelines из плагина. Форму sid задаёт схема узла (правило 5.1), поэтому здесь она не повторяется."),
      L("a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).",
        "`§`, за которым сразу следует цифра, например `§5.8`: так узел цитируют по номеру, а не по его sid (§s-9spq78kdwsxr759).",
        "Без изменений по смыслу. Добавлена ссылка на правило «A node is cited by its sid»."),
      P("Each refusal names the file, the line and the text refused.",
        "Каждый отказ называет файл, строку и отвергнутый текст.",
        "Новое: что называет отказ; так код и делает сейчас."),
      P("`sheriff citations` reads every file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u). It leaves out the following:",
        "`sheriff citations` читает каждый файл, который репозиторий хранит вне `specs/` (§s-zefk589ykh37b8u). Без проверки он оставляет следующее:",
        "Было: «in the code, the tests and the documents». Строка 10.1.39 говорит о каждой цитате «в коде, тестах или документации», а правило 10.10 допускает SpecTag в любых собственных инструментах репозитория. Поэтому команда читает каждый файл вне `specs/`, как узел «A node's location outside the specification» делает для расположений, а перечень того, что она не проверяет, назван ниже (правило 7.2.6)."),
      L("the bindings file (§s-trwczfskj5zmuft), whose SpecTags the check for a SpecTag that names no node looks up (§s-36x8amvunmv2kp5);",
        "файл привязок (§s-trwczfskj5zmuft): его SpecTag ищет проверка SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5);",
        "Новое: в файле привязок есть только SpecTag, а их проверяет согласованный узел «A SpecTag that names no node», так что один SpecTag отвергается один раз."),
      L("each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu);",
        "каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu);",
        "Было: «One exception: the fixtures of the tests of a check that reads citations or locations are not read. The files are those the project's own guidelines list as fixtures (§s-6hha5en226aj8hu).» Без изменений по смыслу."),
      L("the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc) or its tests, which the check for a SpecTag that names no node looks up instead.",
        "sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы (§s-hheus6f395ynqvc) или в его тестах: такой sid вместо этой команды ищет проверка SpecTag, который не называет ни одного узла.",
        "Новое: SpecTag в коде системы и в его тестах проверяет согласованный узел «A SpecTag that names no node», поэтому эта команда их не проверяет, и один SpecTag отвергается один раз. SpecTag в собственных инструментах репозитория, которые допускает правило 10.10, проверяет эта команда."),
      P("`sheriff citations` makes this check regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq).",
        "`sheriff citations` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-e84nggntkrcyumq).",
        "Новое: стоимость строки 10.1.39 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "Outside the specification, a citation comes with no link to the node that it cites (§s-cxtt6jvhqcey2k9). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.",
    ruReason: "За пределами спецификации у цитаты нет связи с узлом, который она цитирует (§s-cxtt6jvhqcey2k9). Поэтому процитированный sid, который не называет ни одного узла, или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, yet `sheriff citations` refuses the sid in the guide, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.",
        "Руководство `docs/setup.md` цитирует `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, но `sheriff citations` отвергает этот sid в руководстве, называя руководство, строку и sid. Самая вероятная ошибка — читать только файлы, которые меняет коммит: тогда цитата проходит, пока кто-нибудь не изменит руководство."),
    ],
    refs: [
      R("implements", ROW.r39),
      R("implements", "s-6hha5en226aj8hu"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-w6gybeqn2ttydqx"),
      R("cites", "s-9spq78kdwsxr759"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-trwczfskj5zmuft"),
      R("cites", "s-36x8amvunmv2kp5"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-cxtt6jvhqcey2k9"),
    ],
    removed: drafts["s-m8nmfsxkcfu7cjp"].proposal.removed,
    date: DATE,
  },
  stage3: "binding.ts:519-537 (citationsOutside) looks sids up among the archived nodes too, and outsideFiles (binding.ts:23) reads only the files that the globs for code or for tests match and every Markdown file outside specs/. It is to stop reading the archive (the todo of row 10.1.39, which is then removed), to look sids up in the model of the specification, to read every file that the repository keeps outside specs/ other than the bindings file and the listed fixtures, and to leave the sid of a SpecTag in the system's code or its tests to s-36x8amvunmv2kp5. The placeholder sid `s-222222222222222` in skills/tools/src/reindex.ts:104, which names no node, is to be rewritten so that this check does not refuse it. The tests at binding.test.ts:191, :262 and :329 keep s-m8nmfsxkcfu7cjp, the last rewritten first without the archive; tests for a sid in a file that no glob matches, for a SpecTag naming no node in the code of a project's own check, and for a SpecTag in the system's code that this check leaves alone are written first.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 36: "Generated copies against the nodes" (s-dbk2vyeg8z5jxna), row 10.1.39a.
// ---------------------------------------------------------------------------------------------------------------
add("s-dbk2vyeg8z5jxna", {
  ...keep("s-dbk2vyeg8z5jxna"),
  proposal: {
    title: "Generated copies checked against their nodes",
    ruTitle: "Сверка порождённых копий с их узлами",
    titleChange: "Было: «Generated copies against the nodes». Добавлено «checked»: без него «against» по-английски не говорит, что копии сверяются с узлами.",
    parts: [
      P("`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). It also refuses each such file that the repository lacks. Each refusal names the file and says that running `sheriff types` regenerates it.",
        "`sheriff binding` отвергает каждый файл, который порождает `sheriff types` (§s-a8fn72xa782wvbk), если текст этого файла в репозитории, без учёта окончаний строк, отличается от того, что порождает для него `sheriff types` (§s-dwxjxb7rw4w5yn3). Он отвергает и каждый такой файл, которого в репозитории нет. Каждый отказ называет файл и говорит, что запуск `sheriff types` порождает его заново.",
        "Было: «`sheriff binding` generates in memory the copies the nodes produce, and compares them with what is committed. The copies are: … Each copy is compared with what the last commit holds instead while a node it waits for is a draft (§s-f5rz6b7dhxejjts). Each such node is reported.» По строке 10.1.39a и вашему решению от 2026-11-18 копия сравнивается с тем, что даёт последняя одобренная формулировка каждого её узла, а не с последним коммитом, пока узел — черновик. Какие файлы порождаются и как, говорит согласованный узел «What `sheriff types` generates», поэтому перечень файлов здесь не повторяется. Узел, из которого ничего не порождается, называет `sheriff types` (строка 10.1.39b), поэтому `sheriff binding` о нём больше не сообщает."),
      P("`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.",
        "`sheriff binding` порождает в памяти из последней одобренной формулировки каждого узла (§s-qyjw8xez6t6adc3) файлы, которые породил бы `sheriff types`. Ни одного из них он не записывает.",
        "Без изменений по смыслу: команда по-прежнему порождает копии в памяти. Сказано, что они порождаются из последней одобренной формулировки каждого узла (правило 10.15)."),
      P("`sheriff binding` refuses each change that a commit makes to a file of one of the project's own generators (§s-km4x4s26kv7pjze) while the rule that lists that generator is a draft. Such a file is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A change is any difference between that file as the commit leaves it and the same file in the commit's parent. The refusal names the file and the generator.",
        "`sheriff binding` отвергает каждое изменение, которое коммит вносит в файл одного из собственных генераторов проекта (§s-km4x4s26kv7pjze), пока правило, которое перечисляет этот генератор, — черновик. Такой файл — файл по пути, который печатает генератор, когда `sheriff binding` запускает его так, как `sheriff types` запускает генератор, правило которого одобрено (§s-y5yk7eu6h4zrjpr). Изменение — любое различие между этим файлом в том виде, в каком его оставляет коммит, и тем же файлом в родительском коммите. Отказ называет файл и генератор.",
        "Новое: по правилу 10.9, пока правило, которое перечисляет генератор, — черновик, код, который генератор уже написал, остаётся как есть. `sheriff types` такой генератор не запускает (согласованный узел «How a project's own code generator is run»), поэтому без этого абзаца правка его файлов вручную прошла бы. Чтобы узнать, какие это файлы, `sheriff binding` запускает генератор, но ничего не записывает; так код и делает сейчас."),
      P("`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):",
        "`sheriff binding` отвергает также каждое из следующего, и любое из них не даёт `sheriff types` записать вообще ни одного файла (§s-a8fn72xa782wvbk):",
        "Было: «It refuses:» Оставлены отказы, без которых `sheriff types` не может записать файлы: на них ссылается согласованный узел «What `sheriff types` generates»."),
      L("a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;",
        "файл в перечне файлов (§s-pvzms7d8kxb8dk2) для типов и RuntimeChecks (§s-e877bnfa559tvk9), порождаемых из RecordTypes (§s-7vm323mhry2enx3), если имя файла не оканчивается на `.ts`, `.py` или `.json`;",
        "Было: «a list of the files for the types and RuntimeChecks naming a file of another extension». «Another extension» здесь — расширение имени файла, а не расширение guidelines, поэтому сказано прямо, на что должно оканчиваться имя файла."),
      L("a file in that list whose path leads outside the repository;",
        "файл в этом перечне, путь которого ведёт за пределы репозитория;",
        "Было: «… or a path outside the repository». Без изменений по смыслу; отдельный пункт."),
      L("a second rule that lists such files in the section of the technical appendix for the stack (§s-tj38pvm38nepaf5);",
        "второе правило, которое перечисляет такие файлы, в разделе технического приложения о стеке (§s-tj38pvm38nepaf5);",
        "Было: «two rules of the stack each defining such a list». Без изменений по смыслу."),
      L("a name of a type or a definition that cannot be generated (§s-suv42g8r3ra2h6b);",
        "имя типа или определения, если это имя нельзя породить (§s-suv42g8r3ra2h6b);",
        "Было: «a name that cannot be generated». Сказано, имя чего: типа или определения (узел «What a RecordType generates»)."),
      L("a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.",
        "путь, для которого `sheriff types` породил бы разные тексты, например путь, который два собственных генератора проекта печатают с разным содержимым.",
        "Новое, по todo узла от 2026-11-06: если два генератора печатают один путь с разным содержимым, копия не может совпасть с обоими, и несовпадение не исчезло бы никогда. Отказ называет настоящую причину."),
      P("Each of these refusals names the rule, the node or the path concerned.",
        "Каждый из этих отказов называет соответствующее правило, узел или путь.",
        "Новое: что называет отказ."),
      P("`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).",
        "`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-dwxjxb7rw4w5yn3).",
        "Новое: стоимость строки 10.1.39a — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
    ruReason: "Порождённый файл, который хранится в репозитории, — часть кода системы (§s-hheus6f395ynqvc). Изменённый вручную, он реализовывал бы то, чего не одобрил ни один ответственный. Отставший от своих узлов, он реализовывал бы формулировку, которую ответственные за эти узлы уже заменили (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A commit edits `src/types.ts` by hand to match the new wording. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.",
        "RecordType переформулируют, и он становится черновиком, а типы, порождённые из него, остаются такими, какими их даёт его последняя одобренная формулировка. Коммит вручную меняет `src/types.ts` под новую формулировку. `sheriff binding` отвергает `src/types.ts`, потому что его текст отличается от того, что даёт последняя одобренная формулировка. Самая вероятная ошибка — порождать типы из формулировки-черновика: тогда изменённый файл проходит."),
    ],
    refs: [
      R("implements", ROW.r39a),
      R("implements", "s-km4x4s26kv7pjze"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-qyjw8xez6t6adc3"),
      R("cites", "s-y5yk7eu6h4zrjpr"),
      R("cites", "s-pvzms7d8kxb8dk2"),
      R("cites", "s-e877bnfa559tvk9"),
      R("cites", "s-7vm323mhry2enx3"),
      R("cites", "s-tj38pvm38nepaf5"),
      R("cites", "s-suv42g8r3ra2h6b"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-kh8qcd5kxgh9z3j"),
    ],
    removed: drafts["s-dbk2vyeg8z5jxna"].proposal.removed.filter((r) => !r.startsWith("The `implements` link to rule 10.9")),
    date: DATE,
  },
  stage3: "binding.ts:316-356 (generatedCopies, projectCopies) compares each copy with the last commit while a RecordType or a node of a project's generator waits for its approval, and reports that node. It is to compare each copy with what sheriff types generates from the last approved wordings (s-a8fn72xa782wvbk), with no fallback to the last commit and no report. While the rule that lists a project's generator is a draft, it is to run that generator only to learn its paths, and to refuse each change to a file at those paths compared with the commit's parent; projectCopies does so today for every draft node, which goes. It is to refuse a path for which sheriff types would generate different texts. types.ts:172 (two fields of type variant) goes. generators.ts:61-63 (a path outside the repository or under specs/) is replaced by the refusal of a path outside the system's code (s-y5yk7eu6h4zrjpr). The tests at binding.test.ts:338, :368 and :415 keep s-dbk2vyeg8z5jxna; the test at :352 is rewritten first for the last approved wording; tests for a path that two generators print with different content and for a hand edit of a file of a generator whose rule is a draft are written first. The test of types.test.ts that refuses a listed file of another extension and two lists of the files carries s-pvzms7d8kxb8dk2; which node it carries is settled with item 53. The decisions of the node stay on it; the todo of 2026-11-06 is removed.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 37: "A node whose tests or code lag behind it" (s-txbwsthdqhvyzd2), row 10.1.40.
// ---------------------------------------------------------------------------------------------------------------
const merge37 = [
  P("For a merge commit, `sheriff commit-message` counts only what the merge changes relative to every one of its parents, since each merged commit was checked when it was made:",
    "Для коммита слияния `sheriff commit-message` учитывает только то, что слияние меняет относительно каждого из своих родителей, потому что каждый влитый коммит был проверен, когда его делали:",
    "Новое, ответ, который рекомендует рецензент; это вопрос ответственному. По согласованному узлу «What a commit adds, changes and removes in the code and the tests» коммит слияния сравнивается с первым родителем, и тогда сообщение слияния должно было бы повторять каждый trailer влитых коммитов."),
  L("the merge changes a rule's approved wording, or adds, changes or removes a test or code, only where it does so relative to each of its parents;",
    "слияние меняет одобренную формулировку правила или добавляет, меняет или удаляет тест или код, только если оно делает это относительно каждого из своих родителей;",
    "Новое: первое следствие для коммита слияния."),
  L("code or a test is bound to a rule before the commit where it is bound in any of its parents.",
    "код или тест привязан к правилу до коммита, если он привязан хотя бы в одном из его родителей.",
    "Новое: второе следствие для коммита слияния."),
];
add("s-txbwsthdqhvyzd2", {
  ...keep("s-txbwsthdqhvyzd2"),
  proposal: {
    title: "An approved rule whose tests or code lag behind it",
    ruTitle: "Одобренное правило, тесты или код которого отстают от него",
    titleChange: "Было: «A node whose tests or code lag behind it». Проверка смотрит теперь только на одобренные правила (строка 10.1.40), а код реализует правило, а не узел (ваше решение от 2026-11-11).",
    parts: [
      P("`sheriff commit-message` refuses a commit after which the tests or the code of an approved rule lag behind that rule (§s-ddd2e96uke4y83j). The commit passes where its message states that the rule's implementation needs no change (§s-7gab4ptjt2khfr5). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It says whether the rule's tests, its code or both lag. It also names the trailer (§s-7gab4ptjt2khfr5) with which the commit message can make that statement.",
        "`sheriff commit-message` отвергает коммит, после которого тесты или код одобренного правила отстают от этого правила (§s-ddd2e96uke4y83j). Коммит проходит, если его сообщение утверждает, что реализацию правила менять не нужно (§s-7gab4ptjt2khfr5). Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он говорит, отстают ли тесты правила, его код или и то и другое. Он также называет trailer (§s-7gab4ptjt2khfr5), которым сообщение коммита может это утверждать.",
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
      P("Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound as the commit leaves the code and the tests.",
        "Код или тест привязан к правилу до коммита, если он привязан в родительском коммите. После коммита он привязан, если привязан в том виде, в каком коммит оставляет код и тесты.",
        "Новое: что значит «до коммита» и «после коммита», как в строке 10.1.41."),
      P("Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule, directly or through a chain of such links, also counts as bound to that rule (§s-6fw72j65jkqrfpf).",
        "Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с правилом, напрямую или через цепочку таких связей, тоже считается привязанным к этому правилу (§s-6fw72j65jkqrfpf).",
        "Новое: при согласовании строки 10.1.40 записано, что «привязан» значит то же, что в строке 10.1.41: напрямую или через цепочку связей `implements`. Иначе правило базовой спецификации, которое реализует узел технического приложения, никогда бы не проверялось."),
      P("A commit changes the approved wording of a rule where all of the following hold:",
        "Коммит меняет одобренную формулировку правила, если выполнено всё следующее:",
        "Новое: «формулировка одобренного правила меняется в коммите» значит, что коммит оставляет правило одобренным в формулировке, отличной от последней одобренной до коммита. Так проверка ловит и обычный путь: правило переформулировали, пока оно было черновиком, и тогда его код менять нельзя (строка 10.1.28a), а коммит, который одобряет новую формулировку, должен принести и тесты, и код. Именно этого вы и хотели 2026-11-19. Первое одобрение правила формулировку одобренного правила не меняет."),
      L("the rule is approved as the commit leaves it;",
        "правило одобрено в том виде, в каком его оставляет коммит;",
        "Новое: первое из условий."),
      L("the commit's parent holds an approval of the rule (§s-v4qus7raqnwzneb);",
        "в родительском коммите есть одобрение правила (§s-v4qus7raqnwzneb);",
        "Новое: второе из условий; правило, которое одобряют впервые, под него не подпадает."),
      L("the fingerprint of the rule's wording as the commit leaves it differs from the fingerprint that the rule's last approval in the commit's parent records.",
        "отпечаток формулировки правила в том виде, в каком её оставляет коммит, отличается от отпечатка, который записывает последнее одобрение правила в родительском коммите.",
        "Новое: третье из условий; формулировки сравниваются по отпечаткам, которые записывают одобрения."),
      P("`sheriff commit-message` reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).",
        "Одобрения родительского коммита `sheriff commit-message` читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).",
        "Новое: одобрения родительского коммита читаются так же, как в узле «Who an added approval names»."),
      ...merge37,
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
      X("The specification is approved. An earlier commit reworded the approved rule R, so R became a draft. The next commit adds the approval of the new wording and changes R's code but none of its tests. Its message has no trailer naming R. `sheriff commit-message` refuses the commit and says that R's tests lag behind it. The most likely mistake is to compare R's wording with its wording in the commit's parent. That wording is already the new one, so the lag goes unnoticed.",
        "Спецификация одобрена. Более ранний коммит переформулировал одобренное правило R, и оно стало черновиком. Следующий коммит добавляет одобрение новой формулировки и меняет код R, но ни одного из его тестов. В его сообщении нет trailer, который называет R. `sheriff commit-message` отвергает коммит и говорит, что тесты R отстают от него. Самая вероятная ошибка — сравнивать формулировку R с его формулировкой в родительском коммите. Та формулировка уже новая, поэтому отставание остаётся незамеченным."),
    ],
    refs: [
      R("implements", ROW.r40),
      R("cites", "s-7gab4ptjt2khfr5"),
      R("cites", "s-kag2m9tzdnduxdx"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-zrsc6asgmhv8tnc"),
      R("cites", "s-2x58az67bm6cxq2"),
      R("cites", "s-kgbzk2ph9e6jfb4"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-6fw72j65jkqrfpf"),
      R("cites", "s-v4qus7raqnwzneb"),
      R("cites", "s-gb8s9657a65hqmv"),
      R("cites", "s-5fewsp22mmdz7y6"),
      R("cites", "s-5z5gnu7pahr82xp"),
      R("cites", "s-qzthyh7yqvfhsa2"),
    ],
    removed: drafts["s-txbwsthdqhvyzd2"].proposal.removed,
    date: DATE,
  },
  stage3: "binding.ts:435-516 (drift) reads the history of every node and reports what lags, in a draft too. It goes, and message.ts makes the check: for each rule approved as the commit leaves the specification, it compares the fingerprint of the rule's wording with the one that its last approval in the parent records, and finds with s-2x58az67bm6cxq2 whether the commit adds, changes or removes a test or code bound to the rule in the parent or after the commit, directly or through a chain of implements links. For a merge commit, it counts only what the merge changes relative to every parent. It reads the trailers as s-7gab4ptjt2khfr5 says, refuses only while the commit leaves the specification approved, and names the trailer. The tests at binding.test.ts:285, :297 and :308 are rewritten first for sheriff commit-message and keep s-txbwsthdqhvyzd2; those at :319 and :605 go, and so does the test of s-jau82aq9juv9zzh at :272. Tests for the trailer, for a draft specification, for a wording approved after an earlier reword, for a rule implemented through an implements link and for a merge commit are written first. The todos of row 10.1.40 are removed once the check exists; the decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 38: "An approved node without code or a test" (s-jgejd5rpd9d43pd), row 10.1.41.
// ---------------------------------------------------------------------------------------------------------------
add("s-jgejd5rpd9d43pd", {
  ...keep("s-jgejd5rpd9d43pd"),
  proposal: {
    title: "An approved rule without code or a test",
    ruTitle: "Одобренное правило без кода или теста",
    titleChange: "Было: «An approved node without code or a test». Код реализует правило, а узел — лишь форма, в которой правило хранится (ваше решение от 2026-11-11).",
    parts: [
      P("`sheriff binding` refuses a commit that includes an approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf), where that rule lacks one or both of the following (§s-c4y63t285gg7jz7):",
        "`sheriff binding` отвергает коммит, который включает одобренное правило, которое должен реализовывать код системы (§s-hheus6f395ynqvc, §s-6fw72j65jkqrfpf), если у этого правила нет хотя бы одного из следующего (§s-c4y63t285gg7jz7):",
        "Было: «`sheriff binding` looks up each approved rule among the sids the SpecTags on the system's code and on its tests name. … A node lacking a symbol carrying its SpecTag, or a test carrying it, is reported, naming what it lacks.» По строке 10.1.41 и вашему решению от 2026-11-20 коммит отвергается, а не только сообщается, и проверяются только правила, которые включает коммит."),
      L("code of the system other than tests, bound to the rule (§s-kgbzk2ph9e6jfb4);",
        "кода системы помимо тестов, привязанного к правилу (§s-kgbzk2ph9e6jfb4);",
        "Было: «a symbol carrying its SpecTag». Код может быть привязан не только через символ, но и как файл, привязанный целиком (правило 1.5.2, ваше решение от 2026-11-17 по строке 10.1.41)."),
      L("a test of the system's code, bound to the rule (§s-zrsc6asgmhv8tnc), that is marked neither as skipped nor as expected to fail.",
        "теста кода системы, привязанного к правилу (§s-zrsc6asgmhv8tnc), который не помечен ни как пропускаемый, ни как ожидающий неудачи.",
        "Было: «a test carrying it … A test its framework is told to skip does not count.» Теперь не считается и тест, помеченный как ожидающий неудачи (ваше решение от 2026-11-20 по строке 10.1.41)."),
      P("The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also says whether the rule lacks code, a test or both.",
        "Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он также говорит, чего у правила нет: кода, теста или того и другого.",
        "Было: «is reported, naming what it lacks». Отказ называет то же самое, что раньше называло сообщение."),
      P("Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to an approved rule, directly or through a chain of such links, also counts as bound to that rule (§s-6fw72j65jkqrfpf).",
        "Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с одобренным правилом, напрямую или через цепочку таких связей, тоже считается привязанным к этому правилу (§s-6fw72j65jkqrfpf).",
        "Было: «A rule implementing the node through an implements link counts for it, and so, in turn, does each rule implementing such a rule.» Без изменений по смыслу; направление цепочки — от узла со связью `implements` к правилу, как вы решили 2026-11-20. Слова «правило реализует правило» убраны."),
      P("A commit includes an approved rule where it does any of the following (§s-c4y63t285gg7jz7):",
        "Коммит включает одобренное правило, если он делает что-либо из следующего (§s-c4y63t285gg7jz7):",
        "Новое: строка 10.1.41 и ваше решение от 2026-11-20. Что значит «добавляет одобрение», говорит узел «Who an added approval names», а что значит «добавляет, меняет или удаляет» — узел «What a commit adds, changes and removes in the code and the tests»."),
      L("it adds an approval of the rule (§s-75ue25v6r23jkk8);",
        "добавляет одобрение правила (§s-75ue25v6r23jkk8);",
        "Новое: первый случай строки 10.1.41."),
      L("it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that is bound to the rule in the commit's parent or as the commit leaves it;",
        "добавляет, меняет или удаляет (§s-2x58az67bm6cxq2) код или тест, привязанный к правилу в родительском коммите или в том виде, в каком его оставляет коммит;",
        "Новое: второй случай строки 10.1.41. «До коммита или после него» — в родительском коммите или в том виде, в каком его оставляет коммит."),
      L("it removes an `implements` link through which, in the commit's parent, code or a test was bound to the rule;",
        "удаляет связь `implements`, через которую в родительском коммите код или тест был привязан к правилу;",
        "Новое: третий случай строки 10.1.41."),
      L("it ends the rule's exemption from implementation (§s-gf6n8ge4mke3pr2): an `exempts` link that reached the rule is removed or no longer reaches it, or the node that declares that link becomes a draft.",
        "прекращает освобождение правила от реализации (§s-gf6n8ge4mke3pr2): связь `exempts`, которая доходила до правила, удалена или больше до него не доходит, или узел, который объявляет эту связь, становится черновиком.",
        "Новое: четвёртый случай, который добавляет предложение по строке 10.1.41. 20 ноября вы включили в перечень удаление связи `implements`; конец освобождения так же незаметно оставляет правило без кода."),
      P("`sheriff binding` checks the approved rules in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp). Of those rules, it leaves out the following, which the system's code need not implement (§s-6fw72j65jkqrfpf):",
        "`sheriff binding` проверяет одобренные правила в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp). Из этих правил он не проверяет следующие, которые код системы реализовывать не должен (§s-6fw72j65jkqrfpf):",
        "Было: «It looks up in the same way each approved node of a project's own NodeKind that needs code. A node of a project's own NodeKind needs code unless its extension declares it as needing none. Nodes of the SpecSheriff guidelines, of `project.json` and of `debt.json` are left out.» Имя NodeKind убрано (ваше решение от 2026-11-10). Какие типы узлов — правила, говорит узел о форме SpecTag; собственный тип узлов среди них, только если его узлам требуется имплементация. Исключения — по правилу 9.2. Проверяются и узлы в ячейках `TableRule`."),
      L("each node of the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
        "каждый узел собственных guidelines проекта (§s-u7tw6m8npxmv5tu), которые хранятся в `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);",
        "Было: «Nodes … of `project.json` … are left out.» Без изменений по смыслу (правило 9.2)."),
      L("in the repository where the SpecSheriff guidelines are written, each node of those guidelines, of their extensions (§s-mbmnsnxenmavu3z) and of the appendix of the tools (§s-a4rbry4hsu34hy8), all kept in `specs/_guidelines/`;",
        "в репозитории, где пишутся SpecSheriff guidelines, — каждый узел этих guidelines, их расширений (§s-mbmnsnxenmavu3z) и описания инструментов (§s-a4rbry4hsu34hy8), которые все хранятся в `specs/_guidelines/`;",
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
    reason: "Committed without code, or without a test that can fail when it is run, an approved rule would let the specification state, unnoticed, what the system does not do (§s-c4y63t285gg7jz7).",
    ruReason: "Одобренное правило, закоммиченное без кода или без теста, который может не пройти при запуске, позволило бы спецификации незаметно утверждать то, чего система не делает (§s-c4y63t285gg7jz7).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that declares R's SpecTag is marked with `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which cannot fail in any run of the tests.",
        "Спецификация одобрена. Коммит добавляет одобрение правила R, у которого есть код, а единственный тест, который объявляет SpecTag правила R, помечен `pytest.mark.skip`. `sheriff binding` отвергает коммит, называя R и говоря, что у него нет теста. Самая вероятная ошибка — засчитать пропускаемый тест, который не может не пройти ни при одном запуске тестов."),
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
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-mbmnsnxenmavu3z"),
      R("cites", "s-a4rbry4hsu34hy8"),
      R("cites", "s-2r7k2aeyusgy6fw"),
      R("cites", "s-gf6n8ge4mke3pr2"),
      R("cites", "s-33fw3ga4ctd94dq"),
      R("cites", "s-qzthyh7yqvfhsa2"),
    ],
    removed: drafts["s-jgejd5rpd9d43pd"].proposal.removed,
    date: DATE,
  },
  stage3: "binding.ts:279-313 (implementation) reports every approved TextRule and node of a project's own kind that needs code, outside specs/_guidelines/ and debt.json, counting every exempts link, in a draft too. It is to refuse, only while the commit leaves the specification approved, the rules that the commit includes: those whose approval it adds (s-75ue25v6r23jkk8), those whose bound code or tests it adds, changes or removes as s-2x58az67bm6cxq2 defines, read in the first parent and after the commit, those that lose an implements link through which code or a test was bound to them, and those whose exemption ends, because an exempts link that reached them is removed or no longer reaches them or because the node that declares it becomes a draft. It is to count every kind that s-5z5gnu7pahr82xp lists, the nodes in cells, files bound as a whole, the entries of the bindings file and the files that sheriff types writes, and an exemption only from an approved exempting node. The tests at code.test.ts:63 and :68 keep s-jgejd5rpd9d43pd. The test of s-vsh384ybt4w25a2 at binding.test.ts:388, which reads the report `not implemented`, is rewritten first for the refusal; tests for a commit that removes an implements link, for one that ends an exemption and for a draft specification are written first. The decisions of the node stay on it.",
});

// The proposal on row 10.1.41 (s-c4y63t285gg7jz7): a commit that ends an exemption includes the rule.
add("proposal:row-10-1-41-g4", {
  question: "None: closes a gap of the same kind as the removal of an `implements` link, which the owner put into the row on 2026-11-20",
  location: "spec 10.1.41",
  sidValue: ROW.r41,
  kind: "cell",
  cost: { en: "refused, naming the rule, while the specification is approved; passes while it is a draft", ru: "отклоняется с названием правила, пока спецификация одобрена; проходит, пока она черновик" },
  change: "Добавлен один пункт в перечень того, после чего одобренное правило входит в коммит: правило перестаёт быть освобождённым от реализации (правило 9.8) — связь `exempts`, которая до него доходила, удалена или больше до него не доходит, или узел, который объявляет эту связь, становится черновиком. 20 ноября вы включили в перечень удаление связи `implements`, через которую код или тест был привязан к правилу; конец освобождения так же незаметно оставляет правило без кода и теста. У третьего пункта точка заменена точкой с запятой, потому что он больше не последний. Остальная формулировка, стоимость, обоснование и пример — как вы согласовали 2026-11-20.",
  proposal: {
    title: null,
    ruTitle: null,
    parts: [
      P("An approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf) is bound to a test that is not marked as skipped or as expected to fail and to code of the system other than tests. Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule.",
        "Одобренное правило, которое код системы (§s-hheus6f395ynqvc) должен реализовывать (§s-6fw72j65jkqrfpf), привязано к тесту, не помеченному как пропускаемый или как ожидаемо падающий, и к коду системы помимо тестов. Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с одобренным правилом, напрямую или через цепочку таких связей, тоже считается привязанным к одобренному правилу.",
        SAME),
      P("The check applies only to the approved rules that a commit includes. A commit includes an approved rule if any of the following happens in that commit:",
        "Проверка относится только к одобренным правилам, которые входят в коммит. Одобренное правило входит в коммит, если в этом коммите происходит одно из следующего:",
        SAME),
      L("the rule's approval is added;", "добавляется одобрение правила;", SAME),
      L("a test or code changes that is bound to the rule before the commit or after it;", "меняется тест или код, привязанный к правилу до коммита или после него;", SAME),
      L("an `implements` link through which a test or code is bound to the rule is removed;",
        "удаляется связь `implements`, через которую тест или код привязан к правилу;",
        "Как в согласованной формулировке; точка заменена точкой с запятой, потому что пункт больше не последний."),
      L("the rule stops being exempted from implementation (§s-gf6n8ge4mke3pr2): an `exempts` link that reached it is removed or no longer reaches it, or the node that declares that link becomes a draft.",
        "правило перестаёт быть освобождённым от реализации (§s-gf6n8ge4mke3pr2): связь `exempts`, которая до него доходила, удалена или больше до него не доходит, или узел, который объявляет эту связь, становится черновиком.",
        "Новый пункт. Почему он нужен, сказано выше."),
    ],
    reason: "An approved rule committed without its test or its code would let the specification state what the system does not do, and nobody would notice. A test run does not count a skipped test, or a failing test expected to fail, as failed. So, if such a test counted, a rule whose only test is marked in either of these ways would pass this check and the test run while nothing checks the rule. While the specification is a draft, the work is focused on the specification itself, so an approved rule may still lack its test or its code.",
    ruReason: "Одобренное правило, попавшее в коммит без теста или кода, позволило бы спецификации утверждать то, чего система не делает, и никто бы этого не заметил. Прогон тестов не считает упавшим ни пропущенный тест, ни ожидаемо падающий тест, который падает. Поэтому правило, единственный тест которого помечен так, прошло бы и эту проверку, и прогон тестов, хотя правило ничем не проверяется. Пока спецификация — черновик, работа сосредоточена на самой спецификации, поэтому у одобренного правила может ещё не быть теста или кода.",
    reasonChange: SAME,
    examples: [
      X("The specification is approved. Code and a test not marked as skipped are bound to node N, which has an `implements` link to rule R. That code changes in a commit, so the commit includes R, and the commit passes. But not: the commit is refused because no SpecTag names R itself.",
        "Спецификация одобрена. Код и тест, не помеченный как пропускаемый, привязаны к узлу N, у которого есть связь `implements` с правилом R. Этот код меняется в коммите, поэтому R входит в коммит и проходит проверку. Но не так: R отклоняется, потому что ни один SpecTag не называет само правило R."),
    ],
    refs: [
      R("checks", "s-6fw72j65jkqrfpf"),
      R("checks", "s-gf6n8ge4mke3pr2"),
      R("checks", "s-sn6au3vcr9uy5pm"),
      R("checks", "s-hheus6f395ynqvc"),
    ],
    removed: [],
    date: DATE,
  },
});

// ---------------------------------------------------------------------------------------------------------------
// Item 39: "A commit message names the nodes its code implements" (s-qqs2svksmjct753), row 10.1.42.
// ---------------------------------------------------------------------------------------------------------------
add("s-qqs2svksmjct753", {
  ...keep("s-qqs2svksmjct753"),
  proposal: {
    title: "The nodes that a commit message must name",
    ruTitle: "Узлы, которые должно называть сообщение коммита",
    titleChange: "Было: «A commit message names the nodes its code implements». В прежнем заголовке «its code» можно было прочесть как «код сообщения коммита».",
    parts: [
      P("`sheriff commit-message` accepts a commit message only where it contains the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message, naming, by its file, its sid and its location (§s-kag2m9tzdnduxdx), each node whose sid the message lacks.",
        "`sheriff commit-message` принимает сообщение коммита, только если в нём есть sid каждого узла, к которому SpecTag (§s-5z5gnu7pahr82xp) привязывает код, который коммит добавляет или меняет (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). Любое другое сообщение он отвергает и называет файл, sid и расположение (§s-kag2m9tzdnduxdx) каждого узла, sid которого в сообщении нет.",
        "Было: «A commit that changes code names in its message, by sid, every node the SpecTags on its changed symbols outside the tests name. `sheriff message` refuses the message where: a node a SpecTag on a changed symbol outside the tests names is not named in it; …» Команда `sheriff message` теперь называется `sheriff commit-message` (ваше решение от 2026-11-21). Узел открывается тем, что команда принимает и отвергает, и говорит, что называет отказ."),
      P("In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.",
        "В этой проверке код — это символы (§s-kgbzk2ph9e6jfb4) и файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет в коде системы (§s-hheus6f395ynqvc), кроме тестов. Их SpecTag `sheriff commit-message` читает в том виде, в каком их оставляет коммит.",
        "Было: «changed symbols outside the tests». Теперь учитываются и файлы, привязанные целиком: SpecTag в начале файла и записи файла привязок (правило 1.5.2, ваше решение от 2026-11-17 по правилу 9.6). Слова «outside the tests» заменены на «кроме тестов». SpecTag читаются после коммита: по правилу 9.6 сообщение называет узлы, к которым SpecTag привязывает изменённый код."),
      P("A message contains a node's sid where the sid appears anywhere in the message. `sheriff commit-message` ignores each line of the message that starts with git's comment character (`core.commentChar`, by default `#`). It also ignores the scissors line that `git commit --verbose` writes, and every line after it, which hold the diff that git leaves out of the commit message.",
        "sid узла есть в сообщении, если он встречается в сообщении где угодно. `sheriff commit-message` не учитывает строки сообщения, которые начинаются с символа комментария git (`core.commentChar`, по умолчанию `#`). Он также не учитывает строку-ножницы, которую пишет `git commit --verbose`, и все строки после неё: в них дифф, который git не включает в сообщение коммита.",
        "Новое: где в сообщении ищется sid. Git передаёт хуку commit-msg сообщение до того, как убирает из него комментарии и строку-ножницы с диффом после неё; иначе SpecTag из диффа сходили бы за sid в сообщении."),
      P("For a merge commit, `sheriff commit-message` counts only the code that the merge adds or changes relative to every one of its parents. Each merged commit was checked when it was made.",
        "Для коммита слияния `sheriff commit-message` учитывает только код, который слияние добавляет или меняет относительно каждого из своих родителей. Каждый влитый коммит был проверен, когда его делали.",
        "Новое, ответ, который рекомендует рецензент; это вопрос ответственному. По согласованному узлу «What a commit adds, changes and removes in the code and the tests» коммит слияния сравнивается с первым родителем, и тогда сообщение слияния должно было бы называть каждый узел, привязанный к влитому коду, а сообщение git по умолчанию «Merge branch …» отвергалось бы."),
      P("`sheriff commit-message` makes this check regardless of whether the specification is approved or a draft (§s-7sk3s553ukzwtbm).",
        "`sheriff commit-message` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-7sk3s553ukzwtbm).",
        "Новое: стоимость строки 10.1.42 — «отвергается», без условия о статусе спецификации."),
    ],
    reason: "The SpecTags on the changed code name the nodes that it implements, so a commit message checked against them records those nodes for whoever reads the history (§s-ef93u6cnbs2sevr).",
    ruReason: "SpecTag на изменённом коде называют узлы, которые он реализует, поэтому сообщение коммита, проверенное по ним, записывает эти узлы для того, кто читает историю (§s-ef93u6cnbs2sevr).",
    reasonChange: "Новое: у одобренного узла обоснования не было.",
    examples: [
      X("A commit changes only `src/ui/texts.json`, which the bindings file binds to rule R, and its message contains no sid. `sheriff commit-message` refuses the message and names R. The most likely mistake is to read only the SpecTags placed above symbols, which lets the message pass.",
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
    removed: drafts["s-qqs2svksmjct753"].proposal.removed,
    date: DATE,
  },
  stage3: "message.ts:11-27 refuses a sid that names no node or names a header or a section, reads only the SpecTags of changed symbols (changedTags, binding.ts:105-113), and leaves out only the lines that start with `#` (messageText). Both refusals go, with the test at gates.test.ts:38. changedTags is to count the files bound as a whole and the entries of the bindings file, as s-2x58az67bm6cxq2 defines what a commit adds or changes, and for a merge commit only the code that differs from every parent. messageText is to read git's comment character from `core.commentChar` and to drop the scissors line and every line after it. The tests at gates.test.ts:19, :25 and :32, which carry s-ef93u6cnbs2sevr, are to carry s-qqs2svksmjct753; tests for a file that the bindings file binds, for a message written by `git commit --verbose` and for a merge commit are written first. The decisions of the node stay on it.",
});

// ---------------------------------------------------------------------------------------------------------------
// Item 40: "The tests, run before a push" (s-b6qdtghnyha3fhk), row 10.1.44.
// ---------------------------------------------------------------------------------------------------------------
add("s-b6qdtghnyha3fhk", {
  ...keep("s-b6qdtghnyha3fhk"),
  proposal: {
    title: "Running the tests before a push",
    ruTitle: "Запуск тестов перед push",
    titleChange: "Было: «The tests, run before a push». Причастие через запятую в английском заголовке читается как калька; новый заголовок говорит о том же — о запуске тестов перед push.",
    parts: [
      P("The pre-push hook (§s-477gtdrkw34dzxw) refuses a push where the tests of the system's code (§s-hheus6f395ynqvc) and of the project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) fail (§s-aufnqn6t7y2me7a). It runs them with the command that the project-wide settings give as their `testCommand` (§s-zefk589ykh37b8u). The tests fail where that command exits with a non-zero status. Where the hook must run the tests and the project-wide settings give no `testCommand`, it refuses the push and says that `testCommand` is missing.",
        "Хук pre-push (§s-477gtdrkw34dzxw) отвергает push, если тесты кода системы (§s-hheus6f395ynqvc) и собственных проверок (§s-2fau85dfyyeq66m) и генераторов (§s-km4x4s26kv7pjze) проекта не проходят (§s-aufnqn6t7y2me7a). Он запускает их командой, которую настройки, общие для проекта, задают как `testCommand` (§s-zefk589ykh37b8u). Тесты не проходят, если эта команда завершается с кодом, отличным от нуля. Если хук должен запустить тесты, а настройки, общие для проекта, не задают `testCommand`, он отвергает push и сообщает, что `testCommand` не задан.",
        "Было: «The pre-push hook runs the tests by the project's test command.» Узел открывается тем, что отвергает хук. Отказ, если команда тестов не задана, код делает уже сейчас; теперь это сказано."),
      P("The pre-push hook runs the tests only where the push creates or updates a ref that names, directly or through a tag, a commit that meets both of the following conditions:",
        "Хук pre-push запускает тесты, только если push создаёт или обновляет ref, который напрямую или через тег называет коммит, удовлетворяющий обоим следующим условиям:",
        "Было: «It runs no test and compares nothing where both of these hold: the push creates or updates a ref; no commit those refs name holds the specification approved (§s-j9r8z4xdrfkfs47).» Статус одобрения теперь задают записи в `sheriff.config.json` (правило 10.6), а не правило в `project.json`. По строке 10.1.44 и вашему решению от 2026-11-17 тесты запускаются при push, только если собственные guidelines проекта называют push моментом запуска тестов. Push, который только удаляет ref, тестов больше не запускает: никакое изменение не попадает в общую ветку."),
      L("the commit leaves the specification approved (§s-qzthyh7yqvfhsa2);",
        "коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2);",
        "Новое: статус одобрения — как его задают записи (правило 10.6) в коммите, который отправляет push."),
      L("the project's own guidelines (§s-u7tw6m8npxmv5tu), as that commit holds them in `project.json`, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h).",
        "собственные guidelines проекта (§s-u7tw6m8npxmv5tu) в том виде, в каком этот коммит хранит их в `project.json`, называют push моментом запуска тестов (§s-x8uzc8z44pwtd3h).",
        "Новое: строка 10.1.44 и правило «When the tests must pass»."),
      P("The SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). They read each such rule in its last approved wording as of that commit (§s-a8fn72xa782wvbk). Where a member of such a list has the value `push` (§s-5hb9k2e34dgn284), the project's own guidelines name a push as the moment at which the tests run.",
        "Инструменты SpecSheriff ищут `push` в `TextRule.list` (§s-eferktypcj7njt5) каждого правила `project.json`, у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Каждое такое правило они читают в его последней одобренной формулировке на момент этого коммита (§s-a8fn72xa782wvbk). Если у элемента такого списка значение `push` (§s-5hb9k2e34dgn284), собственные guidelines проекта называют push моментом запуска тестов.",
        "Новое: как инструменты SpecSheriff узнают, что собственные guidelines называют push. Другие значения собственных guidelines они читают так же: через правило, которое уточняет правило SpecSheriff guidelines, в его последней одобренной формулировке. Поэтому в узел «What the SpecSheriff tools read in the project's own guidelines» предлагается новый пункт. Правило-черновик не реализуется (правило 1.3.2), а иначе любой мог бы отключить тесты при push, изменив правило."),
      P("Where the push creates or updates a ref and the pre-push hook runs no tests, the hook says so. For each ref that the push creates or updates, it names the reason: in the commit that the ref names, the specification is a draft, the project's own guidelines do not name a push as the moment at which the tests run, or both.",
        "Если push создаёт или обновляет ref, а хук pre-push не запускает тестов, хук говорит об этом. Для каждого ref, который push создаёт или обновляет, он называет причину: в коммите, который называет этот ref, спецификация — черновик, собственные guidelines проекта не называют push моментом запуска тестов или и то и другое.",
        "Было: «It then says that the specification is a draft and no test ran.» Теперь причин может быть две, и хук называет действующую для каждого ref, потому что push может обновлять несколько ref с разными причинами."),
    ],
    reason: "A project whose own guidelines name a push as the moment at which the tests run relies on the pre-push hook. The hook keeps a change whose tests fail from reaching the project's shared branch (§s-x8uzc8z44pwtd3h).",
    ruReason: "Проект, собственные guidelines которого называют push моментом запуска тестов, полагается на хук pre-push. Хук не даёт изменению, тесты которого не проходят, попасть в общую ветку проекта (§s-x8uzc8z44pwtd3h).",
    reasonChange: "Было: «The working tree is compared with what the push sends only because the tests run in the working tree (§s-477gtdrkw34dzxw), so where no test runs the comparison guards nothing.» Сравнение рабочего дерева с тем, что отправляет push, описывает узел «The hooks». Обоснование теперь говорит, зачем тесты запускаются перед push.",
    examples: [
      X("A project's own guidelines state that the tests run on a shared server before a merge, and none of their rules lists `push`. The specification is approved, and the project-wide settings give a `testCommand`. A developer pushes a branch, and the pre-push hook runs no tests. It says that the project's own guidelines do not name a push as the moment at which the tests run. The most likely mistake is to run the tests because a `testCommand` is given.",
        "Собственные guidelines проекта говорят, что тесты запускаются на общем сервере перед слиянием, и ни одно их правило не перечисляет `push`. Спецификация одобрена, и настройки, общие для проекта, задают `testCommand`. Разработчик делает push ветки, а хук pre-push не запускает тестов. Он говорит, что собственные guidelines проекта не называют push моментом запуска тестов. Самая вероятная ошибка — запустить тесты потому, что `testCommand` задан."),
    ],
    refs: [
      R("implements", ROW.r44),
      R("implements", "s-x8uzc8z44pwtd3h"),
      R("cites", "s-477gtdrkw34dzxw"),
      R("cites", "s-hheus6f395ynqvc"),
      R("cites", "s-2fau85dfyyeq66m"),
      R("cites", "s-km4x4s26kv7pjze"),
      R("cites", "s-zefk589ykh37b8u"),
      R("cites", "s-qzthyh7yqvfhsa2"),
      R("cites", "s-u7tw6m8npxmv5tu"),
      R("cites", "s-eferktypcj7njt5"),
      R("cites", "s-sn6au3vcr9uy5pm"),
      R("cites", "s-a8fn72xa782wvbk"),
      R("cites", "s-5hb9k2e34dgn284"),
    ],
    removed: drafts["s-b6qdtghnyha3fhk"].proposal.removed,
    date: DATE,
  },
  stage3: "push-mode.ts reads, in each commit, the rule of project.json that approves the specification (specificationApproved). It is to read the latest entry for the approval status in that commit's sheriff.config.json, and the members of the rules of that commit's project.json that refine s-x8uzc8z44pwtd3h, each in its last approved wording as of that commit (s-a8fn72xa782wvbk). hooks/pre-push runs the tests where the push only deletes refs; it is to run them only where a created or updated ref's commit meets both conditions, and otherwise to name, for each such ref, the condition that its commit does not meet. The tests at hooks.test.ts:246 and :255 are rewritten first for the entries and the `push` member and keep s-b6qdtghnyha3fhk; tests for a project whose guidelines name no push, for a draft rule that lists `push` and for a push of two refs with different reasons are written first. The decisions of the node stay on it, the one of 2026-11-06 restated without its citation of s-xhcmchcngykvn2k, which the new form drops.",
});

// ---------------------------------------------------------------------------------------------------------------
// The proposal for "What the SpecSheriff tools read in the project's own guidelines" (new:tools-1-project).
// ---------------------------------------------------------------------------------------------------------------
{
  const base = drafts["new:tools-1-project"];
  const bp = base.proposal;
  const parts = bp.parts.map((x) => ({ kind: x.kind, en: x.en, ru: x.ru, change: SAME }));
  const find = (start) => {
    const i = parts.findIndex((x) => x.en.startsWith(start));
    if (i < 0) throw new Error(`no part starts with ${start}`);
    return i;
  };
  const levels = find("if the project has chosen the Domains extension");
  parts[levels] = {
    ...parts[levels],
    en: parts[levels].en.replace("the members of the `TextRule.list` of", "the members of the `TextRule.list` (§s-eferktypcj7njt5) of"),
    ru: parts[levels].ru.replace("элементы `TextRule.list` правила", "элементы `TextRule.list` (§s-eferktypcj7njt5) правила"),
    change: "Как в согласованной формулировке; добавлена ссылка на правило 5.1 при первом упоминании `TextRule.list` (правило 7.2.7).",
  };
  const kinds = find("the project's own kinds of node");
  parts[kinds] = {
    ...parts[kinds],
    ru: "собственные типы узлов проекта: элементы `TextRule.list` правила, которое уточняет правило о таких типах (§s-vsh384ybt4w25a2);",
    change: "Изменён только русский текст: «собственные виды узлов» → «собственные типы узлов», как вы называете их с 2026-11-10. Английский — как в согласованной формулировке.",
  };
  const checks = find("the project's own checks and generators");
  parts.splice(checks + 1, 0, {
    kind: "li",
    en: "where the tests run: the members of the `TextRule.list` of the rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), such as `push` (§s-b6qdtghnyha3fhk);",
    ru: "где запускаются тесты: элементы `TextRule.list` правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), например `push` (§s-b6qdtghnyha3fhk);",
    change: "Новый пункт: строка 10.1.44 отвергает push, только если собственные guidelines проекта называют push моментом запуска тестов, и хук pre-push читает это здесь. Значение `push`, по которому действует хук, названо со ссылкой на узел «Running the tests before a push»: иначе проект, который напишет «on every push», не узнал бы, почему хук его не учитывает.",
  });
  const refines = find("Where an item above refers to the rule that refines another rule");
  parts[refines] = {
    ...parts[refines],
    en: "Where an item above refers to a rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link (§s-sn6au3vcr9uy5pm) to that other rule, and read:",
    ru: "Если пункт выше говорит о правиле, которое уточняет другое правило, инструменты SpecSheriff находят это правило по его связи `refines` (§s-sn6au3vcr9uy5pm) с тем другим правилом и читают:",
    change: "Было: «Where an item above refers to the rule that refines another rule, the SpecSheriff tools find that rule by the `refines` link it carries» («по связи `refines`, которую оно несёт»). Узел ничего не «несёт», ни по-английски, ни по-русски (ваше правило от 2026-10-31). «a rule» вместо «the rule»: таких правил может быть несколько, как говорит следующий список. Добавлена ссылка на правило о связях (правило 7.2.7). Смысл тот же.",
  };
  parts.push({
    kind: "p",
    en: "The SpecSheriff tools read the `TextRule.list` of each rule of `project.json` in the rule's last approved wording (§s-qyjw8xez6t6adc3), since a draft rule is not implemented (§s-utvqbypzhmgndug). A rule that has never been approved lists nothing.",
    ru: "Инструменты SpecSheriff читают `TextRule.list` каждого правила `project.json` в последней одобренной формулировке этого правила (§s-qyjw8xez6t6adc3), потому что правило-черновик не реализуется (§s-utvqbypzhmgndug). Правило, которое ни разу не было одобрено, ничего не перечисляет.",
    change: "Новое: по правилу 1.3.2 и принципу «Nothing unapproved is implemented» правило-черновик не реализуется, а правило 10.15 порождает код из последней одобренной формулировки каждого узла. Если бы инструменты читали черновую формулировку, любой мог бы отключить тесты при push или собственную проверку проекта, изменив правило, которое их перечисляет. Согласованный узел «How a project's own code generator is run» по-прежнему запускает генератор, только пока перечисляющее его правило одобрено; это предложение тому не противоречит.",
  });
  add("proposal:new-tools-1-project-g4", {
    question: "None: carries out row 10.1.44, whose check depends on whether the project's own guidelines name a push as the moment at which the tests run, and rule 1.3.2, under which a draft rule is not implemented",
    base: "new:tools-1-project",
    location: base.location,
    change: "Добавлен один пункт: где запускаются тесты — элементы `TextRule.list` правила, которое уточняет правило «When the tests must pass», например `push`. Строка 10.1.44 отвергает push, только если собственные guidelines проекта называют push моментом запуска тестов, поэтому инструменты SpecSheriff должны это читать (узел «Running the tests before a push»). Добавлен абзац: каждое правило `project.json` читается в последней одобренной формулировке, а правило, которое ни разу не было одобрено, ничего не перечисляет (правило 1.3.2, правило 10.15). В абзаце после первого списка «по связи `refines`, которую оно несёт» заменено на «по его связи `refines` с тем другим правилом»: узел ничего не «несёт» (ваше правило). Добавлены ссылки при первом упоминании `TextRule.list` и связи `refines`. В русском тексте «собственные виды узлов» заменены на «собственные типы узлов», ваш термин. В обосновании «the tools» заменено на «the SpecSheriff tools», а несколько слов поправлены по замечаниям читателей. Остальная формулировка — как вы согласовали 2026-11-21.",
    proposal: {
      title: bp.title,
      ruTitle: bp.ruTitle,
      parts,
      reason: "The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project may give its own rules any titles and arrange those rules as it chooses, so the SpecSheriff tools find each value in the top node of `project.json`, through a link, or through a setting in `sheriff.config.json`.",
      ruReason: "Инструментам SpecSheriff нужны значения, которые задают только собственные guidelines проекта, например кто отвечает за спецификацию (§s-m42rsngtayk9g3g). Проект может давать своим правилам любые названия и располагать эти правила как хочет, поэтому инструменты SpecSheriff находят каждое значение в верхнем узле `project.json`, по связи или по настройке в `sheriff.config.json`.",
      reasonChange: "Было: «A project gives its own rules any titles and arranges those rules as it chooses, so the tools find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`.» Инструменты SpecSheriff названы полностью, как требует ваше правило от 2026-11-05: в спецификации они никогда не просто «инструменты». «may give» и «through» — правка английского по замечаниям читателей; смысл тот же.",
      refs: [
        ...bp.refs.slice(0, 9),
        R("implements", "s-x8uzc8z44pwtd3h"),
        ...bp.refs.slice(9),
        R("cites", "s-eferktypcj7njt5"),
        R("cites", "s-b6qdtghnyha3fhk"),
        R("cites", "s-sn6au3vcr9uy5pm"),
        R("cites", "s-qyjw8xez6t6adc3"),
        R("cites", "s-utvqbypzhmgndug"),
      ],
      removed: [],
      date: DATE,
    },
  });
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
for (const m of backupText.matchAll(sidRe)) known.add(m[0]);
if (known.has(NEW_ROW)) problems.push(`new sid ${NEW_ROW} is already in use`);

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
targets.add(NEW_ROW);
for (const sid of Object.values(ROW)) if (!targets.has(sid)) problems.push(`row ${sid} names no known node`);

const citedIn = (s) => [...s.matchAll(/§(s-[2-9a-hjkmnp-z]{15})(?![0-9a-z])/g)].map((m) => m[1]);
const locationCited = (s) => [...s.replace(/`[^`]*`/g, "").matchAll(/§(?!s-[2-9a-hjkmnp-z]{15}(?![0-9a-z]))([^\s,;)]+)/g)].map((m) => m[0]);
const longSentences = [];

for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  const isRow = e.kind === "cell";
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
  if (!isRow && (!p.reason || !p.ruReason || !p.reasonChange)) problems.push(`${key}: no reason, Russian reason or reasonChange`);
  for (const x of p.examples || []) if (!x.en || !x.ru) problems.push(`${key}: an example lacks en or ru`);
  const agreedExamples = key === "proposal:row-10-1-41-g4" || key === "proposal:s-pcnyfp7gev7syax-g4";
  if (!agreedExamples && !(p.examples || []).every((x) => /The most likely mistake is/.test(x.en) && /Самая вероятная ошибка/.test(x.ru))) problems.push(`${key}: an example without its most likely mistake`);
  for (const x of p.parts) {
    const ticks = (s) => [...s.matchAll(/`[^`]*`/g)].map((m) => m[0]).sort().join(" ");
    if (ticks(x.en) !== ticks(x.ru)) problems.push(`${key}: the code in backticks differs between the languages in: ${x.en.slice(0, 70)}…`);
  }
  const ownText = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.en).join(" ")
    : [p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join(" ");
  for (const sentence of ownText.replace(/`[^`]*`/g, "code").replace(/ \(§[^)]*\)/g, "").split(/(?<=[.;:])\s+|\n/)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > 25) longSentences.push(`${key}: ${words} words: ${sentence.slice(0, 90)}…`);
  }
  // The phrases the agreed drafts avoid, in what this round writes.
  const own = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.en).join("\n")
    : [p.title, p.text, p.reason, ...(p.examples || []).map((x) => x.en)].filter(Boolean).join("\n");
  const plain = own.replace(/SpecSheriff tools/g, "SST").replace(/appendix of the tools/g, "AOT").replace(/regardless of whether the specification is approved or a draft/g, "REGARDLESS").replace(/stands on its own/g, "ALONE").replace(/by hand/g, "MANUALLY");
  for (const bad of [/stands for/, /standing approval/, /closest mistake/i, /outside its tests/, /NodeKind/, /\bthe base of the guidelines\b/, / included\b/, /\bstands?\b/, /sign-in/, /the commit's message/, /\bthe tools\b(?! of)/, /\bdeclaredIn\b/, /\bcarr(y|ies|ied)\b/, /whether the specification is approved or a draft/, /\bdocuments\b/, /\bhands?\b/, /\bwrites it anew\b/, /\bruns no test\b/]) {
    if (bad.test(plain)) problems.push(`${key}: the English holds ${bad}`);
  }
  const ruOwn = key.startsWith("proposal:")
    ? p.parts.filter((x) => x.change !== SAME).map((x) => x.ru).join("\n")
    : [p.ruTitle, p.ruText, p.ruReason, ...(p.examples || []).map((x) => x.ru)].filter(Boolean).join("\n");
  if (/несёт|несут|несущ|владел/.test(ruOwn)) problems.push(`${key}: the Russian says «несёт» or «владелец»`);
  if (/[Рр]аунд|рецензент сказал|review-g|основн(ая|ой) сесси/.test(JSON.stringify(p.parts.map((x) => x.change)) + (p.titleChange || "") + (p.reasonChange || "") + (e.change || ""))) problems.push(`${key}: a change field tells the history of the rounds`);
  if (/агре/.test(JSON.stringify(p.parts.map((x) => x.change)))) problems.push(`${key}: a typo in a change field`);
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

// english-group4b.md: the English of every changed or new node, in the format of english-group4.md.
const intro = {
  "proposal:new-tools-1-project-g4": "A proposal: the complete new wording of the node agreed under `new:tools-1-project`. The item on where the tests run, the paragraph on the last approved wording, the sentence after the first list, the citation of `TextRule.list` in the item on levels and the reason differ from the agreed wording.",
  "proposal:s-pcnyfp7gev7syax-g4": "A proposal: the complete new wording of the agreed rule 10.12. The paragraph that opens with \"As an exception\", its list and the third paragraph of the reason are new.",
  "proposal:row-10-1-41-g4": "A proposal: the complete new wording of the agreed row 10.1.41 of the main table of checks. The last item of its list is new; its cost stays \"refused, naming the rule, while the specification is approved; passes while it is a draft\".",
  "proposal:row-10-1-37a": "A new row 10.1.37a of the main table of checks, whose cost is \"refused, naming the check and each such file\". A row has no title of its own.",
};
const md = [
  "# T25, group 4, round b: the English of every changed or new node",
  "",
  "This file holds the final English of every node of group 4 that fix-group4-b.mjs changed or added, as `tools-drafts.json` holds it after that script.",
  "Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.",
  "fix-group4-b.mjs writes this file; edit the script, not this file.",
  "",
];
for (const [key, e] of Object.entries(entries)) {
  const p = e.proposal;
  md.push(`## ${key} — ${p.title || "a row of the main table of checks"}`, "");
  if (intro[key]) md.push(intro[key], "");
  if (p.title) md.push(`**Title:** ${p.title}`, "");
  md.push("**Text:**", "", p.text, "");
  if (p.reason) md.push("**Reason:**", "", p.reason, "");
  for (const [i, x] of (p.examples || []).entries()) md.push(`**Example${(p.examples.length > 1) ? ` ${i + 1}` : ""}:**`, "", x.en, "");
}
fs.writeFileSync(new URL("english-group4b.md", here), md.join("\n"));

console.log(`wrote ${Object.keys(entries).length} keys: ${Object.keys(entries).join(", ")}`);
if (longSentences.length) console.log(`\nsentences over 25 words, citations left out, to look at:\n${longSentences.join("\n")}`);
