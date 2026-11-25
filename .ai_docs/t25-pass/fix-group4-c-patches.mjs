// The patches of round c of group 4, imported by fix-group4-c.mjs. Each patch changes one key of the drafts in place,
// as review-g4b-a.md to review-g4b-d.md, english-g4b-fast.md, english-g4b-thorough.md and fix-brief-group4-c.md say.
export const SAME = "Как в согласованной формулировке.";

export function applyPatches(drafts, R, X) {
  const parts = (key) => drafts[key].proposal.parts;
  const at = (key, start) => {
    const i = parts(key).findIndex((x) => x.en.startsWith(start));
    if (i < 0) throw new Error(`${key}: no part starts with ${start}`);
    return i;
  };
  const set = (key, start, fields) => {
    const i = at(key, start);
    parts(key)[i] = { ...parts(key)[i], ...fields };
  };
  const insertAfter = (key, start, ...added) => {
    const i = at(key, start);
    parts(key).splice(i + 1, 0, ...added);
  };
  const addRefs = (key, ...refs) => {
    const p = drafts[key].proposal;
    for (const r of refs) if (!p.refs.some((x) => x.to === r.to)) p.refs.push(r);
  };
  const P = (en, ru, change) => ({ kind: "p", en, ru, change });
  const L = (en, ru, change) => ({ kind: "li", en, ru, change });

  // -------------------------------------------------------------------------------------------------------------
  // Item 33: s-7pk89t8z6wymmj9.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-7pk89t8z6wymmj9";
    set(k, "Where a check that a project's own guidelines add", {
      en: "Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that the check's failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.",
      ru: "Если проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), не проходит, `sheriff validate` отвергает изменение. Если правило, которое перечисляет проверку, говорит, что о неудаче проверки только сообщается, `sheriff validate` вместо отказа сообщает о неудаче (§s-ujm7nfxkk9j3464). Отказ или сообщение называет проверку и показывает, что она напечатала в стандартный вывод и в стандартный поток ошибок. Если проверка ничего не напечатала, показывается код её завершения.",
    });
    set(k, "`sheriff validate` runs each of the project's own checks with the command", {
      en: parts(k)[at(k, "`sheriff validate` runs each of the project's own checks with the command")].en.replace("A check passes only where its process exits with status zero.", "A check passes only if its process exits with status zero."),
    });
    set(k, "The rule that `sheriff.config.json` names for a check", {
      en: "In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.",
      ru: "В своём `TextRule.list` (§s-eferktypcj7njt5) правило, которое `sheriff.config.json` называет для проверки, перечисляет её как элемент, значение которого (§s-5hb9k2e34dgn284) — имя проверки. Это правило `sheriff validate` читает в его последней одобренной формулировке (§s-a8fn72xa782wvbk). Если этот элемент — объект, у которого `onFailure` равно `reported`, правило говорит, что о неудаче проверки только сообщается. Если в этой формулировке в правиле нет элемента, значение которого — имя проверки, `sheriff validate` отвергает изменение. Отказ называет проверку и правило и говорит, что последняя одобренная формулировка правила эту проверку не перечисляет.",
      change: "Новое: как правило, которое перечисляет проверку, говорит, что о неудаче проверки только сообщается. Это свойство `onFailure` элемента перечня; так его уже читает код. По вашему решению от 2026-11-04 по правилу 10.8 это решает правило, которое одобряет ответственный, а не настройки. Правило читается в последней одобренной формулировке: по правилу 1.3.2 и принципу «Nothing unapproved is implemented» правило-черновик не реализуется, а иначе любой мог бы отключить проверку, изменив правило. Отказ говорит, что проверку не перечисляет последняя одобренная формулировка: иначе разработчик, который видит проверку в черновике правила, не понял бы отказа. Отказ, если правило не перечисляет проверку, код делает уже сейчас; так же поступает согласованный узел «How a project's own code generator is run».",
    });
    set(k, "`sheriff validate` runs the project's own checks only once", {
      en: "`sheriff validate` runs the project's own checks only once the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before the rest of its checks (§s-pcnyfp7gev7syax). It makes the rest of its checks whatever the project's own checks find.",
      ru: "Собственные проверки проекта `sheriff validate` запускает, только когда файлы спецификации прошли проверку на ключ, записанный больше одного раза (§s-7zqsstgnuc772ba), и проверку на соответствие своей схеме (§s-xzcw3hv4hmxz7h7). Он запускает их до остальных своих проверок (§s-pcnyfp7gev7syax). Остальные свои проверки он выполняет, что бы ни нашли собственные проверки проекта.",
    });
    set(k, "`sheriff validate` refuses the change where one of the project's own checks", {
      en: "`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which the check runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.",
      ru: "`sheriff validate` отвергает изменение, если одна из собственных проверок проекта добавляет, меняет или удаляет файл в каталоге, в котором эта проверка выполняется, кроме файла, который git игнорирует (§s-vj67ztqkuhxbv7s). Отказ называет проверку и каждый такой файл.",
    });
    set(k, "Given the option `--strict`", {
      en: "Given the option `--strict`, `sheriff validate` gives each of the project's own checks a model of the specification in which the specification is approved and the specification's `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag to. The other checks of `sheriff validate` give the same results with or without the option.",
      ru: "С параметром `--strict` `sheriff validate` передаёт каждой собственной проверке проекта модель спецификации, в которой спецификация одобрена, а флаг `strict` спецификации включён (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). Так он делает, какими бы ни задавали статус одобрения и флаг записи в `sheriff.config.json` (§s-zefk589ykh37b8u). Остальные проверки `sheriff validate` с этим параметром и без него дают одинаковые результаты.",
    });
    set(k, "Before `sheriff settings` records an approval", {
      en: "Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on, it runs the project's own checks as `sheriff validate --strict` runs them (§s-q3pfzyaxvpr2zj2).",
      ru: "Прежде чем записать одобрение спецификации, `sheriff settings` запускает собственные проверки проекта (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). Он передаёт им модель, в которой спецификация одобрена, а флаг `strict` такой, каким его задают записи в `sheriff.config.json`. Прежде чем включить флаг `strict`, `sheriff settings` запускает собственные проверки проекта так, как их запускает `sheriff validate --strict` (§s-q3pfzyaxvpr2zj2).",
      change: "Новое: правило 10.6 перед одобрением спецификации запускает проверки так, как если бы она была одобрена, а флаг `strict` при этом остаётся таким, каким его задают записи; так проверка строки 10.1.37 выполняется и при выключенном флаге. Правило 10.7 называет ещё процедуру, которая включает флаг: для неё проверки запускаются так, как их запускает `sheriff validate --strict`, который для этого случая называет и согласованный узел «The settings that only an owner of the specification changes». Одобрение при включённом флаге покрывает первое предложение абзаца.",
    });
    const p = drafts[k].proposal;
    p.reason = "`sheriff validate` runs a project's own checks together with the checks of the SpecSheriff guidelines that it makes, on the same files. So such a check binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).";
    p.ruReason = "`sheriff validate` запускает собственные проверки проекта вместе с теми проверками SpecSheriff guidelines, которые выполняет сам, на тех же файлах. Поэтому такая проверка обязательна для каждого участника и не зависит от того, кто вспомнит её запустить (§s-2fau85dfyyeq66m).";
    drafts[k].stage3 += " The refusal of a check that the rule's last approved wording does not list says so.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Row 10.1.37a: proposal:row-10-1-37a.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:row-10-1-37a";
    set(k, "A check that a project's own guidelines add", {
      en: "A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves the directory in which it runs as it was, except the files that git ignores",
      ru: "Проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), оставляет каталог, в котором она выполняется, таким, каким он был, кроме файлов, которые git игнорирует",
      change: "Новая строка; без точки в конце, как у других строк таблицы. «Каталог … таким, каким он был» охватывает и файл, который проверка создаёт. Почему строка нужна, сказано выше.",
    });
    drafts[k].cost = { en: "refused, naming the check and each file that it added, changed or removed", ru: "отвергается с указанием проверки и каждого файла, который она добавила, изменила или удалила" };
    for (const [a, b] of [
      ["требует, чтобы собственные проверки проекта не меняли файлов,", "требует, чтобы собственные проверки проекта оставляли файлы такими, какими они были,"],
      ["Что остальные собственные инструменты проекта второго шага правила 10.12 тоже не меняют файлов,", "Что остальные собственные инструменты проекта второго шага правила 10.12 тоже оставляют файлы такими, какими они были,"],
    ]) {
      if (!drafts[k].change.includes(a)) throw new Error(`${k}: the change field lacks ${a}`);
      drafts[k].change = drafts[k].change.replace(a, b);
    }
    drafts[k].change += " Строка и второй шаг правила 10.12 в предложении по этому правилу одинаково исключают файлы, которые git игнорирует. Таблице нужна и строка для отказа, которым git hook отвергает коммит, если остальные собственные инструменты проекта меняют файлы; её предложат вместе с узлом «The hooks».";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Rule 10.12: proposal:s-pcnyfp7gev7syax-g4.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:s-pcnyfp7gev7syax-g4";
    set(k, "the project's own checks (§s-2fau85dfyyeq66m) and the rest", {
      en: "the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, each of which leaves the files as they were, except those that git ignores;",
      ru: "собственные проверки проекта (§s-2fau85dfyyeq66m) и остальные собственные инструменты проекта, каждый из которых оставляет файлы такими, какими они были, кроме тех, которые git игнорирует;",
      change: "Было: «…, none of which changes a file». Исключены файлы, которые git игнорирует, как в новой строке 10.1.37a: проверка, которая пишет кэш в игнорируемую папку, — обычное дело, а игнорируемый файл никогда не попадает в коммит. Сказано в утвердительной форме.",
    });
    set(k, "As an exception", {
      en: "On a commit, as an exception to the steps above, the following checks run right after the first step:",
      ru: "При коммите, в виде исключения из описанных выше шагов, сразу после первого шага выполняются следующие проверки:",
      change: "Новое: согласованный узел «Validation against the schema before a command works on the files» проверяет файлы по схеме до любой проверки, которая читает узлы, и при отказе останавливает команду; собственная проверка проекта читает узлы через модель. Поэтому при коммите эти проверки выполняются сразу после первого шага, а прочие проверки — только если они прошли. Исключение касается коммита: на нём держатся эти два согласованных узла.",
    });
    set(k, "that each object in a file of the specification", {
      en: "the check that, in each object (§s-d5cgda5bdsn7bzy) of a file of the specification, of its archive (§s-f2b5zvc565s242f) or of its schema (§s-eferktypcj7njt5), each key is written only once;",
      ru: "проверка того, что в каждом объекте (§s-d5cgda5bdsn7bzy) файла спецификации, её архива (§s-f2b5zvc565s242f) или её схемы (§s-eferktypcj7njt5) каждый ключ записан только один раз;",
      change: "Новое: проверка строки 10.1.1; при отказе она тоже останавливает `sheriff validate` (согласованный узел «A key written more than once in one object»).",
    });
    set(k, "that every file of the specification complies", {
      en: "the check that every file of the specification complies with its JSON Schema (§s-emrfpzw2d5bgb6x).",
      ru: "проверка того, что каждый файл спецификации соответствует своей JSON Schema (§s-emrfpzw2d5bgb6x).",
    });
    insertAfter(k, "the check that every file of the specification complies", P(
      "The project's own checks and the other checks of the SpecSheriff guidelines run only once these checks have passed.",
      "Собственные проверки проекта и остальные проверки SpecSheriff guidelines запускаются, только когда эти проверки прошли.",
      "Новое: остальные проверки ждут, пока пройдут эти две; почему, сказано у абзаца перед перечнем."));
    const p = drafts[k].proposal;
    p.reason = "A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository. Adopting the method must not stop them, even where the SpecSheriff tools cannot run, for example on a machine without the plugin. A team that needs the checks to apply to everyone runs them in CI.\n\nThe order lets every check rely on what it reads. Whatever rewrites files runs before any check, so every check reads the commit in its final form. A generator runs after any formatter, so that no formatter changes what it generates. A check that reads the nodes runs only on files that have passed the checks of their structure. A tool that changed the commit after the checks would let through what no check had read.";
    p.ruReason = "Проект может запускать при коммите или push свои инструменты, например проверку того, что ничего внутреннего не попадает в публичный репозиторий. Переход на метод не должен их останавливать, даже там, где инструменты SpecSheriff не могут запуститься, например на машине без плагина. Команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.\n\nПорядок позволяет каждой проверке полагаться на то, что она читает. Всё, что переписывает файлы, запускается раньше любой проверки, поэтому каждая проверка читает коммит в окончательном виде. Генератор запускается после любого форматтера, чтобы ни один форматтер не менял того, что он генерирует. Проверка, которая читает узлы, запускается только на файлах, которые прошли проверки своей структуры. Инструмент, который менял бы коммит после проверок, пропустил бы то, чего не читала ни одна проверка.";
    p.reasonChange = "Обоснование заменено целиком. Согласованное обоснование не проходило проверку парами: его абзацы обосновывали текст по порядку, абзац за абзацем — инструменты проекта, порядок шагов, генераторы, случай, когда инструменты SpecSheriff не могут запуститься. Узел меняется, поэтому теперь он должен соответствовать правилам целиком (правило «An agreed node is brought into line with the rules when it changes, never in a sweep»). Новое обоснование говорит, зачем правило существует: инструменты проекта не останавливаются, а порядок позволяет каждой проверке полагаться на то, что она читает. «apply to everyone» — как в `docs/principles.md`. В согласованном русском было «на том, что уже прошло проверки проекта», что противоречило предложению «Каждый шаг запускается, что бы ни нашли предыдущие»; новое русское обоснование этого не говорит.";
    p.examples = [
      X("A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. Next come the checks that each key is written only once in each object and that each file complies with its JSON Schema. A scan for secrets runs after them, and the other checks of the SpecSheriff guidelines run last, on the final files.",
        "Собственные guidelines проекта перечисляют форматтер. При коммите форматтер сначала переписывает файлы коммита, а затем генераторы инструментов SpecSheriff записывают свои файлы. Дальше идут проверки того, что каждый ключ записан в каждом объекте только один раз и что каждый файл соответствует своей JSON Schema. После них запускается поиск секретов, а остальные проверки SpecSheriff guidelines запускаются последними, на окончательных файлах."),
    ];
    addRefs(k, R("cites", "s-f2b5zvc565s242f"), R("cites", "s-eferktypcj7njt5"));
    drafts[k].change = "Добавлены абзац со списком и абзац после него. При коммите собственные проверки проекта и остальные проверки SpecSheriff guidelines запускаются, только если прошли проверки строк 10.1.1 (каждый ключ записан в объекте один раз) и 10.1.2 (файл соответствует своей JSON Schema), поэтому эти проверки выполняются сразу после первого шага. Так правило 10.12 приводится в соответствие с согласованным узлом «Validation against the schema before a command works on the files»: `sheriff validate` проверяет файлы по схеме до любой проверки, которая читает узлы, и останавливается при отказе, а собственная проверка проекта читает узлы через модель спецификации. Так же поступает согласованный узел «A key written more than once in one object». Во втором шаге исключены файлы, которые git игнорирует, как в новой строке 10.1.37a. Обоснование заменено целиком, потому что согласованное не проходило проверку парами, а узел меняется и должен соответствовать правилам целиком; в нём же исправлено согласованное русское «на том, что уже прошло проверки проекта». Пример теперь называет две проверки, которые идут сразу после первого шага, и говорит, что последними идут остальные проверки. Остальная формулировка — как вы согласовали 2026-11-18.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 34: s-nh8b2hjvzasdxmd.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-nh8b2hjvzasdxmd";
    set(k, "`sheriff binding` refuses each location of a node", {
      ru: parts(k)[at(k, "`sheriff binding` refuses each location of a node")].ru.replace("и говорит, что узел цитируют по его sid", "и говорит, что на узел ссылаются по его sid"),
    });
    set(k, "`sheriff binding` treats each of the following as a location", {
      en: "`sheriff binding` treats each of the following as a location, regardless of the case of its letters:",
    });
    set(k, "`sheriff binding` treats text as a location only where the text stands on its own", {
      en: "`sheriff binding` treats text as a location only where the text stands alone, not as part of a longer path or name, as `tech/stack` is part of `specs/tech/stack.json`.",
    });
    set(k, "the location that the model gives the first top-level node", {
      en: "the location that the model of the specification gives the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), such as `tech/stack`.",
      ru: "расположение, которое модель спецификации даёт первому узлу верхнего уровня файла guidelines, описания инструментов (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5), например `tech/stack`.",
    });
    set(k, "`sheriff binding` leaves out each file", {
      ru: parts(k)[at(k, "`sheriff binding` leaves out each file")].ru.replace("тестов проверки, читающей цитаты или расположения", "тестов проверки, которая читает ссылки или расположения"),
    });
    const p = drafts[k].proposal;
    p.reason = "A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification, a location comes with no link to the node that it names. After a reordering, a location left in a file would point at another node, or at none, and no other check would notice it.";
    p.ruReason = "Расположение узла меняется всякий раз, когда спецификацию переупорядочивают, а его sid не меняется никогда (§s-9spq78kdwsxr759). За пределами спецификации у расположения нет связи с узлом, который оно называет. После переупорядочивания расположение, оставленное в файле, указывало бы на другой узел или ни на какой, и ни одна другая проверка этого бы не заметила.";
    p.examples = [
      X("A guide in `docs/` says “see `base/3.2`”. `sheriff binding` refuses `base/3.2` in that guide, naming the guide, the line and `base/3.2`, though no node is at that location now. The most likely mistake is to refuse only a location at which a node exists, which lets a location left behind by a removed node pass.",
        "Руководство в `docs/` говорит «см. `base/3.2`». `sheriff binding` отвергает `base/3.2` в этом руководстве, называя руководство, строку и `base/3.2`, хотя сейчас по этому расположению узла нет. Самая вероятная ошибка — отвергать только расположение, по которому есть узел: тогда проходит расположение, оставшееся от удалённого узла."),
    ];
    drafts[k].stage3 += " After the text, `-`, `/`, and `.` followed by a letter or a digit continue a path or a name, as they do before it: binding.ts:424 now refuses `base/3.2` inside `base/3.2.json`, `base/3.2-old` and `base/3.2/x`, and `tech/stack` inside `tech/stack-old`. fixtureGlobs (model.ts:43) reads the list of fixtures as the commit holds it; it is to read the rule in its last approved wording, as proposal:new-tools-1-project-g4 says.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 35: s-m8nmfsxkcfu7cjp.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-m8nmfsxkcfu7cjp";
    drafts[k].proposal.ruTitle = "Ссылка за пределами спецификации";
    set(k, "a `§` followed directly by a digit", {
      ru: "`§`, за которым сразу следует цифра, например `§5.8`: так на узел ссылаются по номеру, а не по его sid (§s-9spq78kdwsxr759).",
    });
    set(k, "`sheriff citations` reads every file", {
      change: "Было: «in the code, the tests and the documents». Строка 10.1.39 говорит о каждой ссылке «в коде, тестах или документации», а правило 10.10 допускает SpecTag в любых собственных инструментах репозитория. Поэтому команда читает каждый файл вне `specs/`, как узел «A node's location outside the specification» делает для расположений, а перечень того, что она не проверяет, назван ниже (правило 7.2.6).",
    });
    set(k, "the bindings file (§s-trwczfskj5zmuft)", {
      en: "the bindings file (§s-trwczfskj5zmuft), whose SpecTags (§s-5z5gnu7pahr82xp) are left to the check for a SpecTag that names no node (§s-36x8amvunmv2kp5);",
      ru: "файл привязок (§s-trwczfskj5zmuft): его SpecTag (§s-5z5gnu7pahr82xp) оставлены проверке SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5);",
    });
    insertAfter(k, "the bindings file (§s-trwczfskj5zmuft)", L(
      "each file that git treats as binary, such as an image;",
      "каждый файл, который git считает двоичным, например изображение;",
      "Новое: строка 10.1.39 говорит о коде, тестах и документации, а двоичный файл — ни то, ни другое, ни третье. В этом репозитории четыре картинки в `_promo/images/png/` содержат `§` с цифрой, и без этого пункта команда отвергала бы их."));
    set(k, "each file that the project's own guidelines", {
      ru: "каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, которая читает ссылки или расположения (§s-6hha5en226aj8hu);",
    });
    set(k, "the sid of each SpecTag", {
      en: "the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc) or its tests, which is left to the check for a SpecTag that names no node.",
      ru: "sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы (§s-hheus6f395ynqvc) или в его тестах: такой sid оставлен проверке SpecTag, который не называет ни одного узла.",
    });
    const p = drafts[k].proposal;
    p.ruReason = "За пределами спецификации у ссылки нет связи с узлом, на который она ссылается (§s-cxtt6jvhqcey2k9). Поэтому ссылка на sid, который не называет ни одного узла, или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.";
    p.examples = [
      X(p.examples[0].en,
        "Руководство `docs/setup.md` ссылается на `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, но `sheriff citations` отвергает этот sid в руководстве, называя руководство, строку и sid. Самая вероятная ошибка — читать только файлы, которые меняет коммит: тогда ссылка проходит, пока кто-нибудь не изменит руководство."),
    ];
    drafts[k].stage3 = drafts[k].stage3.replace("other than the bindings file and the listed fixtures", "other than the bindings file, the files that git treats as binary and the listed fixtures") + " fixtureGlobs (model.ts:43) reads the list of fixtures as the commit holds it; it is to read the rule in its last approved wording, as proposal:new-tools-1-project-g4 says.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 36: s-dbk2vyeg8z5jxna.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-dbk2vyeg8z5jxna";
    set(k, "`sheriff binding` refuses each file that `sheriff types` generates", {
      en: "`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, it also refuses the commit. Each refusal names the file and says that running `sheriff types` regenerates it.",
      ru: "`sheriff binding` отвергает каждый файл, который порождает `sheriff types` (§s-a8fn72xa782wvbk), если текст этого файла в репозитории, без учёта окончаний строк, отличается от того, что порождает для него `sheriff types` (§s-dwxjxb7rw4w5yn3). Если в репозитории нет такого файла, он также отвергает коммит. Каждый отказ называет файл и говорит, что запуск `sheriff types` порождает его заново.",
    });
    set(k, "`sheriff binding` refuses each change that a commit makes", {
      en: "While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of the two commits holds also differs. Where `sheriff types` would refuse the generator so run, `sheriff binding` refuses it in the same way. The refusal names the file and the generator.",
      ru: "Пока правило, которое перечисляет один из собственных генераторов проекта (§s-km4x4s26kv7pjze), — черновик, `sheriff binding` отвергает каждый файл этого генератора, который различается в родительском коммите (§s-2x58az67bm6cxq2) и в коммите. Файл генератора — файл по пути, который печатает генератор, когда `sheriff binding` запускает его так, как `sheriff types` запускает генератор, правило которого одобрено (§s-y5yk7eu6h4zrjpr). Файл, который есть только в одном из двух коммитов, тоже различается. Если `sheriff types` отверг бы генератор, запущенный так, `sheriff binding` отвергает его так же. Отказ называет файл и генератор.",
      change: "Новое: по правилу 10.9, пока правило, которое перечисляет генератор, — черновик, код, который генератор уже написал, остаётся как есть. `sheriff types` такой генератор не запускает (согласованный узел «How a project's own code generator is run»), поэтому без этого абзаца правка его файлов вручную прошла бы. Чтобы узнать, какие это файлы, `sheriff binding` запускает генератор, но ничего не записывает; так код и делает сейчас. Если генератор при таком запуске отказывает, `sheriff binding` отвергает его, иначе правка вручную прошла бы молча. Какой родитель у коммита слияния и у первого коммита, говорит узел «What a commit adds, changes and removes in the code and the tests».",
    });
    set(k, "a second rule that lists such files", {
      en: "a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack, that lists such files;",
      ru: "второе правило в разделе технического приложения (§s-tj38pvm38nepaf5) о стеке, которое перечисляет такие файлы;",
    });
    set(k, "a name of a type or a definition", {
      en: "the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);",
    });
    addRefs(k, R("cites", "s-2x58az67bm6cxq2"));
    drafts[k].stage3 = drafts[k].stage3.replace("and to refuse each change to a file at those paths compared with the commit's parent;", "to refuse each file at those paths that differs between the commit's parent and the commit, and to refuse the generator where sheriff types would refuse it so run;");
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 37: s-txbwsthdqhvyzd2.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-txbwsthdqhvyzd2";
    set(k, "Code or a test is bound to a rule before the commit", {
      en: "Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound in the code and the tests as the commit leaves them.",
      ru: "Код или тест привязан к правилу до коммита, если он привязан в родительском коммите. После коммита он привязан, если привязан в коде и тестах в том виде, в каком их оставляет коммит.",
    });
    set(k, "the fingerprint of the rule's wording", {
      en: "the fingerprint (§s-v4qus7raqnwzneb) of the rule's wording as the commit leaves it differs from the fingerprint that the rule's last approval in the commit's parent records.",
      ru: "отпечаток (§s-v4qus7raqnwzneb) формулировки правила в том виде, в каком её оставляет коммит, отличается от отпечатка, который записывает последнее одобрение правила в родительском коммите.",
    });
    set(k, "`sheriff commit-message` reads the approvals of the commit's parent", {
      en: "`sheriff commit-message` reads the approvals of the commit's parent in the form into which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).",
    });
    set(k, "For a merge commit, `sheriff commit-message` counts only what the merge changes", {
      en: "`sheriff commit-message` judges a merge commit as follows, since each merged commit was checked when it was made:",
      ru: "Коммит слияния `sheriff commit-message` оценивает следующим образом, потому что каждый влитый коммит был проверен, когда его делали:",
    });
    set(k, "code or a test is bound to a rule before the commit where it is bound in any of its parents", {
      en: "code or a test is bound to a rule before the commit where it is bound in any of the merge commit's parents.",
      ru: "код или тест привязан к правилу до коммита, если он привязан хотя бы в одном из родителей коммита слияния.",
    });
    set(k, "`sheriff commit-message` checks each approved rule in the files", {
      en: "`sheriff commit-message` checks each approved rule of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).",
      ru: "`sheriff commit-message` проверяет каждое одобренное правило спецификации в файлах, которые хранит репозиторий, в том числе узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).",
    });
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 38: s-jgejd5rpd9d43pd.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-jgejd5rpd9d43pd";
    set(k, "a test of the system's code, bound to the rule", {
      ru: "теста кода системы, привязанного к правилу (§s-zrsc6asgmhv8tnc), который не помечен ни как пропускаемый, ни как ожидаемо падающий.",
    });
    set(k, "it ends the rule's exemption from implementation", {
      en: "it makes the rule one that the system's code must implement (§s-6fw72j65jkqrfpf), for example by ending the rule's exemption from implementation (§s-gf6n8ge4mke3pr2) or by moving the rule out of the technical debt (§s-2r7k2aeyusgy6fw).",
      ru: "делает правило таким, которое код системы должен реализовывать (§s-6fw72j65jkqrfpf), например прекращает освобождение правила от реализации (§s-gf6n8ge4mke3pr2) или переносит правило из технического долга (§s-2r7k2aeyusgy6fw).",
      change: "Новое: четвёртый случай, который добавляет предложение по строке 10.1.41. 20 ноября вы включили в перечень удаление связи `implements`; правило, которое код системы теперь должен реализовывать, так же незаметно остаётся без кода и теста. Так бывает, когда кончается освобождение, когда правило переносят из технического долга (одобрение при этом сохраняется, правило 1.3.5) и когда собственному типу узлов становится нужна имплементация (правило 8.3).",
    });
    insertAfter(k, "it makes the rule one that the system's code must implement", P(
      "A rule's exemption from implementation ends where an `exempts` link that reached the rule is removed or stops reaching it, or where the node that declares that link becomes a draft (§s-gf6n8ge4mke3pr2).",
      "Освобождение правила от реализации заканчивается, если связь `exempts`, которая доходила до правила, удаляется или перестаёт до него доходить, или если узел, который объявляет эту связь, становится черновиком (§s-gf6n8ge4mke3pr2).",
      "Новое: когда кончается освобождение. По правилу 9.8 освобождение действует, только пока освобождающий узел одобрен."));
    set(k, "`sheriff binding` checks the approved rules in the files", {
      en: parts(k)[at(k, "`sheriff binding` checks the approved rules in the files")].en.replace("`sheriff binding` checks the approved rules in the files that the repository keeps", "`sheriff binding` checks the approved rules of the specification in the files that the repository keeps"),
      ru: parts(k)[at(k, "`sheriff binding` checks the approved rules in the files")].ru.replace("`sheriff binding` проверяет одобренные правила в файлах", "`sheriff binding` проверяет одобренные правила спецификации в файлах"),
    });
    set(k, "A test is marked as skipped", {
      en: "A test is marked as skipped or as expected to fail by a mark, a call or an option that the description of the test's language names for that purpose (§s-33fw3ga4ctd94dq). In TypeScript and JavaScript these include `test.skip` and `test.todo`, and in Python `pytest.mark.skip`, `pytest.mark.skipif` and `pytest.mark.xfail`.",
      ru: "Тест помечают как пропускаемый или как ожидаемо падающий пометкой, вызовом или параметром, которые описание языка теста называет для этой цели (§s-33fw3ga4ctd94dq). В TypeScript и JavaScript это, в том числе, `test.skip` и `test.todo`, а в Python — `pytest.mark.skip`, `pytest.mark.skipif` и `pytest.mark.xfail`.",
    });
    const p = drafts[k].proposal;
    p.examples = [
      X("The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that carries R's SpecTag is marked with `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which cannot fail in any run of the tests.",
        "Спецификация одобрена. Коммит добавляет одобрение правила R, у которого есть код, а единственный тест, у которого есть SpecTag правила R, помечен `pytest.mark.skip`. `sheriff binding` отвергает коммит, называя R и говоря, что у него нет теста. Самая вероятная ошибка — засчитать пропускаемый тест, который не может упасть ни при одном запуске тестов."),
    ];
    drafts[k].stage3 = drafts[k].stage3.replace("and those whose exemption ends, because an exempts link that reached them is removed or no longer reaches them or because the node that declares it becomes a draft.", "and those that the commit brings under the requirement of implementation: their exemption ends (an exempts link that reached them is removed or stops reaching them, or the node that declares it becomes a draft), they are moved out of debt.json, or their project's own kind comes to need code.");
  }

  // -------------------------------------------------------------------------------------------------------------
  // Row 10.1.41: proposal:row-10-1-41-g4.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:row-10-1-41-g4";
    set(k, "An approved rule that the system's code", {
      en: "An approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf) is bound both to code of the system other than tests and to a test that is not marked as skipped or as expected to fail. Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule.",
      ru: "Одобренное правило, которое код системы (§s-hheus6f395ynqvc) должен реализовывать (§s-6fw72j65jkqrfpf), привязано и к коду системы помимо тестов, и к тесту, не помеченному как пропускаемый или как ожидаемо падающий. Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) с одобренным правилом, напрямую или через цепочку таких связей, тоже считается привязанным к одобренному правилу.",
      change: "Как в согласованной формулировке; порядок в первом предложении изменён по замечанию читателя: сначала короткий член, с «both … and», чтобы «expected to fail and to code» не сливалось. Смысл тот же.",
    });
    set(k, "a test or code changes that is bound", {
      en: "a test or code that is bound to the rule before the commit or after it changes;",
      change: "Как в согласованной формулировке; изменён только порядок слов в английском, чтобы «code changes» не читалось как существительное. Смысл и русский текст те же.",
    });
    set(k, "the rule stops being exempted from implementation", {
      en: "the rule becomes one that the system's code must implement (§s-6fw72j65jkqrfpf), for example because its exemption from implementation ends (§s-gf6n8ge4mke3pr2) or because it is moved out of the technical debt (§s-2r7k2aeyusgy6fw).",
      ru: "правило становится таким, которое код системы должен реализовывать (§s-6fw72j65jkqrfpf), например потому, что заканчивается его освобождение от реализации (§s-gf6n8ge4mke3pr2) или его переносят из технического долга (§s-2r7k2aeyusgy6fw).",
      change: "Новый пункт. Почему он нужен, сказано выше.",
    });
    const p = drafts[k].proposal;
    p.reason = p.reason.replace("A test run does not count a skipped test, or a failing test expected to fail, as failed.", "A test run counts neither a skipped test nor a failing test that is expected to fail as failed.");
    p.reasonChange = "Как в согласованной формулировке; одно английское предложение перестроено по замечанию читателя: «A test run counts neither a skipped test nor a failing test that is expected to fail as failed». Смысл и русский текст те же.";
    p.examples = [
      X("The specification is approved. Code and a test not marked as skipped are bound to node N, which has an `implements` link to rule R. That code changes in a commit, so the commit includes R, and the commit passes. The most likely mistake is to refuse the commit because no SpecTag names R itself.",
        "Спецификация одобрена. Код и тест, не помеченный как пропускаемый, привязаны к узлу N, у которого есть связь `implements` с правилом R. Этот код меняется в коммите, поэтому R входит в коммит, и коммит проходит. Самая вероятная ошибка — отвергнуть коммит потому, что ни один SpecTag не называет само правило R."),
    ];
    addRefs(k, R("cites", "s-2r7k2aeyusgy6fw"));
    drafts[k].change = "Добавлен один пункт в перечень того, после чего одобренное правило входит в коммит: правило становится таким, которое код системы должен реализовывать (правило 9.2), например потому, что заканчивается его освобождение от реализации (правило 9.8) или его переносят из технического долга. 20 ноября вы включили в перечень удаление связи `implements`, через которую код или тест был привязан к правилу; правило, которое код системы теперь должен реализовывать, так же незаметно остаётся без кода и теста. Так бывает и тогда, когда собственному типу узлов становится нужна имплементация (правило 8.3). Цена: пока спецификация одобрена, коммит, который оставляет освобождающий узел черновиком, например переформулировкой, которая ждёт ответственного, отвергается, пока у каждого правила, которое этот узел освобождает, нет кода и теста, если только новая формулировка не одобрена в том же коммите. У третьего пункта точка заменена точкой с запятой, потому что он больше не последний. Последнее предложение примера начиналось с «But not:», что не английская конструкция; теперь оно, как в других примерах, называет самую вероятную ошибку. По замечаниям читателей перестроены, без изменения смысла и русского текста, английские предложения о привязке к коду и тесту, второй пункт перечня и одно предложение обоснования. Остальная формулировка, стоимость и обоснование — как вы согласовали 2026-11-20.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 39: s-qqs2svksmjct753.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-qqs2svksmjct753";
    set(k, "`sheriff commit-message` accepts a commit message only where", {
      en: "`sheriff commit-message` accepts a commit message only where it contains the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message. For each node whose sid the message lacks, the refusal names the node's file, sid and location (§s-kag2m9tzdnduxdx).",
      ru: "`sheriff commit-message` принимает сообщение коммита, только если в нём есть sid каждого узла, к которому SpecTag (§s-5z5gnu7pahr82xp) привязывает код, который коммит добавляет или меняет (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). Любое другое сообщение он отвергает. Для каждого узла, sid которого в сообщении нет, отказ называет файл, sid и расположение узла (§s-kag2m9tzdnduxdx).",
    });
    set(k, "A message contains a node's sid", {
      en: "A message contains a node's sid where the sid appears anywhere in the message. `sheriff commit-message` ignores each line of the message that starts with git's comment character (`core.commentChar`, by default `#`). It also ignores the scissors line that `git commit --verbose` writes and every line after it, since the lines after it hold the diff that git leaves out of the commit message.",
      ru: "sid узла есть в сообщении, если он встречается в сообщении где угодно. `sheriff commit-message` не учитывает строки сообщения, которые начинаются с символа комментария git (`core.commentChar`, по умолчанию `#`). Он также не учитывает строку-ножницы, которую пишет `git commit --verbose`, и все строки после неё, потому что в строках после неё дифф, который git не включает в сообщение коммита.",
    });
    set(k, "For a merge commit", {
      en: "For a merge commit, `sheriff commit-message` counts only the code that the merge adds or changes relative to each of its parents, since each merged commit was checked when it was made.",
      ru: "Для коммита слияния `sheriff commit-message` учитывает только код, который слияние добавляет или меняет относительно каждого из своих родителей, потому что каждый влитый коммит был проверен, когда его делали.",
    });
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 40: s-b6qdtghnyha3fhk.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-b6qdtghnyha3fhk";
    set(k, "The pre-push hook (§s-477gtdrkw34dzxw) refuses a push", {
      en: "The pre-push hook (§s-477gtdrkw34dzxw) refuses a push where any test of the system's code (§s-hheus6f395ynqvc), of the project's own checks (§s-2fau85dfyyeq66m) or of the project's own generators (§s-km4x4s26kv7pjze) fails (§s-aufnqn6t7y2me7a). It runs them with the command that the project-wide settings give as their `testCommand` (§s-zefk589ykh37b8u). The tests fail where that command exits with a non-zero status. Where the hook must run the tests and the project-wide settings give no `testCommand`, it refuses the push and says that `testCommand` is missing.",
      ru: "Хук pre-push (§s-477gtdrkw34dzxw) отвергает push, если не проходит хотя бы один тест кода системы (§s-hheus6f395ynqvc), собственных проверок (§s-2fau85dfyyeq66m) или собственных генераторов (§s-km4x4s26kv7pjze) проекта (§s-aufnqn6t7y2me7a). Он запускает тесты командой, которую настройки, общие для проекта, задают как `testCommand` (§s-zefk589ykh37b8u). Тесты не проходят, если эта команда завершается с кодом, отличным от нуля. Если хук должен запустить тесты, а настройки, общие для проекта, не задают `testCommand`, он отвергает push и сообщает, что `testCommand` не задан.",
    });
    set(k, "the project's own guidelines (§s-u7tw6m8npxmv5tu), as that commit holds them", {
      en: "the project's own guidelines (§s-u7tw6m8npxmv5tu), as of that commit, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h).",
      ru: "собственные guidelines проекта (§s-u7tw6m8npxmv5tu) на момент этого коммита называют push моментом запуска тестов (§s-x8uzc8z44pwtd3h).",
      change: "Новое: строка 10.1.44 и правило «When the tests must pass». «На момент этого коммита»: правило собственных guidelines читается в последней одобренной формулировке на момент этого коммита, которой может не быть в самом коммите.",
    });
    set(k, "The SpecSheriff tools look for `push`", {
      change: parts(k)[at(k, "The SpecSheriff tools look for `push`")].change + " Абзац открывается словами «В коммите, который называет ref»: правило ищется в том коммите, который отправляется, а не в текущей ветке.",
      en: "In the commit that a ref names, the SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). They read each such rule in its last approved wording as of that commit (§s-a8fn72xa782wvbk). Where a member of such a list has the value `push` (§s-5hb9k2e34dgn284), the project's own guidelines name a push as the moment at which the tests run.",
      ru: "В коммите, который называет ref, инструменты SpecSheriff ищут `push` в `TextRule.list` (§s-eferktypcj7njt5) каждого правила `project.json`, у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Каждое такое правило они читают в его последней одобренной формулировке на момент этого коммита (§s-a8fn72xa782wvbk). Если у элемента такого списка значение `push` (§s-5hb9k2e34dgn284), собственные guidelines проекта называют push моментом запуска тестов.",
    });
    set(k, "Where the push creates or updates a ref and the pre-push hook runs no tests", {
      en: "Where the push creates or updates a ref and the pre-push hook runs no tests, the hook says so. For each ref that the push creates or updates, it names the reason: in the commit that the ref names, either the specification is a draft or the project's own guidelines do not name a push as the moment at which the tests run, or both.",
      ru: "Если push создаёт или обновляет ref, а хук pre-push не запускает тестов, хук говорит об этом. Для каждого ref, который push создаёт или обновляет, он называет причину: в коммите, который называет этот ref, либо спецификация — черновик, либо собственные guidelines проекта не называют push моментом запуска тестов, либо и то и другое.",
    });
    drafts[k].stage3 = drafts[k].stage3.replace("each in its last approved wording as of that commit (s-a8fn72xa782wvbk).", "each in its last approved wording as of that commit (s-a8fn72xa782wvbk), looked up in that commit and its ancestors rather than on the current branch, as s-a8fn72xa782wvbk does for sheriff types.");
  }

  // -------------------------------------------------------------------------------------------------------------
  // The proposal for new:tools-1-project.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:new-tools-1-project-g4";
    set(k, "where the tests run:", {
      en: "the moment at which the tests run: the members of the `TextRule.list` of the rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), such as `push` (§s-b6qdtghnyha3fhk);",
      ru: "момент запуска тестов: элементы `TextRule.list` правила, которое уточняет правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), например `push` (§s-b6qdtghnyha3fhk);",
    });
    set(k, "the files other than JSON files whose format allows no comments", {
      en: "the files whose format allows no comments, other than JSON files: those that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);",
      ru: "файлы, формат которых не допускает комментариев, кроме файлов JSON: те, что соответствуют glob-шаблонам в `TextRule.list` правила, которое уточняет правило о привязке кода к правилам (§s-kgbzk2ph9e6jfb4);",
      change: "Как в согласованной формулировке; изменён только порядок слов: «whose format allows no comments» относилось к «JSON files», а не к файлам. Смысл тот же.",
    });
    set(k, "otherwise, the members of every rule", {
      en: "otherwise, the members of the `TextRule.list` of every rule of `project.json` that refines that other rule, in the order in which those rules appear there.",
      ru: "иначе — элементы `TextRule.list` каждого правила `project.json`, которое уточняет то другое правило, в том порядке, в каком эти правила там стоят.",
      change: "Как в согласованной формулировке; сказано, что элементы — у `TextRule.list` правила, а не у самого правила. Смысл тот же.",
    });
    set(k, "The SpecSheriff tools read the `TextRule.list` of each rule", {
      en: "The SpecSheriff tools read the `TextRule.list` of each rule of `project.json` in the rule's last approved wording (§s-a8fn72xa782wvbk, §s-qyjw8xez6t6adc3), since a draft rule is not implemented (§s-utvqbypzhmgndug). A rule that has never been approved lists nothing.",
      ru: "Инструменты SpecSheriff читают `TextRule.list` каждого правила `project.json` в последней одобренной формулировке этого правила (§s-a8fn72xa782wvbk, §s-qyjw8xez6t6adc3), потому что правило-черновик не реализуется (§s-utvqbypzhmgndug). Правило, которое ни разу не было одобрено, ничего не перечисляет.",
    });
    addRefs(k, R("cites", "s-a8fn72xa782wvbk"));
    const p = drafts[k].proposal;
    p.reasonChange = "Было: «A project gives its own rules any titles and arranges those rules as it chooses, so the tools find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`.» Инструменты SpecSheriff названы полностью, как требует ваше правило от 2026-11-05: в спецификации они никогда не просто «инструменты». «may give» и «through» — правка английского по замечаниям читателей; в русском «даёт … располагает» стало «может давать … располагать». Смысл тот же.";
    drafts[k].change = "Добавлен один пункт: момент запуска тестов — элементы `TextRule.list` правила, которое уточняет правило «When the tests must pass», например `push`. Строка 10.1.44 отвергает push, только если собственные guidelines проекта называют push моментом запуска тестов, поэтому инструменты SpecSheriff должны это читать (узел «Running the tests before a push»). Добавлен абзац: каждое правило `project.json` читается в последней одобренной формулировке (как её находят, говорит узел «What `sheriff types` generates»), а правило, которое ни разу не было одобрено, ничего не перечисляет (правило 1.3.2, правило 10.15). В абзаце после первого списка «по связи `refines`, которую оно несёт» заменено на «по его связи `refines` с тем другим правилом»: узел ничего не «несёт» (ваше правило); там же «the rule» заменено на «a rule», потому что таких правил может быть несколько. Добавлены ссылки при первом упоминании `TextRule.list` и связи `refines`. Пункт о файлах без комментариев: «the files whose format allows no comments, other than JSON files» вместо «the files other than JSON files whose format allows no comments», где придаточное относилось не к тому слову. Во втором списке сказано, что элементы — у `TextRule.list` правила. В русском тексте «собственные виды узлов» заменены на «собственные типы узлов», ваш термин. В обосновании «the tools» заменено на «the SpecSheriff tools», а несколько слов поправлены по замечаниям читателей. Остальная формулировка — как вы согласовали 2026-11-21.";
  }
}
