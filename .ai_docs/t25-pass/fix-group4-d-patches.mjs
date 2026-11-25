// The patches of round d of group 4, imported by fix-group4-d.mjs. Each patch changes one key of the drafts in place,
// as review-g4c-a.md to review-g4c-d.md, english-g4c-fast.md, english-g4c-thorough.md and fix-brief-group4-d.md say.
// Every edit of a string in place throws where it does not find the text it replaces.
export const SAME = "Как в согласованной формулировке.";

export function applyPatches(drafts, R, X, agreed) {
  const parts = (key) => drafts[key].proposal.parts;
  const at = (key, start) => {
    const i = parts(key).findIndex((x) => x.en.startsWith(start));
    if (i < 0) throw new Error(`${key}: no part starts with ${start}`);
    return i;
  };
  const rep = (where, s, from, to) => {
    if (typeof s !== "string" || !s.includes(from)) throw new Error(`${where}: no text ${from}`);
    return s.replace(from, to);
  };
  // Replaces text in the fields of a part: edits is {en: [[from, to], ...], ru: [...], change: [...]}.
  const edit = (key, start, edits) => {
    const i = at(key, start);
    const x = { ...parts(key)[i] };
    for (const [field, pairs] of Object.entries(edits)) for (const [from, to] of pairs) x[field] = rep(`${key} / ${start} / ${field}`, x[field], from, to);
    parts(key)[i] = x;
  };
  const set = (key, start, fields) => {
    const i = at(key, start);
    parts(key)[i] = { ...parts(key)[i], ...fields };
  };
  const field = (obj, name, from, to, where) => {
    obj[name] = rep(where, obj[name], from, to);
  };
  const addRefs = (key, ...refs) => {
    const p = drafts[key].proposal;
    for (const r of refs) if (!p.refs.some((x) => x.to === r.to)) p.refs.push(r);
  };

  // -------------------------------------------------------------------------------------------------------------
  // Item 33: s-7pk89t8z6wymmj9.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-7pk89t8z6wymmj9";
    edit(k, "Where a check that a project's own guidelines add", {
      en: [["Where the check printed nothing, it shows the check's exit status.", "Where the check printed nothing, the refusal or the report shows the check's exit status."]],
    });
    edit(k, "`sheriff validate` runs the project's own checks only once", {
      en: [
        ["runs the project's own checks only once the files", "runs the project's own checks only after the files"],
        ["It makes the rest of its checks whatever the project's own checks find.", "It makes the rest of its checks regardless of what the project's own checks find."],
      ],
    });
    edit(k, "Given the option `--strict`", {
      en: [["It does so whatever the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag to.", "It does so regardless of how the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag."]],
    });
    const p = drafts[k].proposal;
    p.reason = "Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).";
    p.ruReason = "Всякий раз, когда `sheriff validate` выполняет свои проверки SpecSheriff guidelines, он запускает и собственные проверки проекта, на тех же файлах. Поэтому такая проверка обязательна для каждого участника и не зависит от того, кто вспомнит её запустить (§s-2fau85dfyyeq66m).";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Row 10.1.37a: proposal:row-10-1-37a.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:row-10-1-37a";
    edit(k, "A check that a project's own guidelines add", { en: [["except the files that git ignores", "except for the files that git ignores"]] });
  }

  // -------------------------------------------------------------------------------------------------------------
  // Rule 10.12: proposal:s-pcnyfp7gev7syax-g4.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:s-pcnyfp7gev7syax-g4";
    edit(k, "the project's own checks (§s-2fau85dfyyeq66m) and the rest", { en: [["except those that git ignores;", "except for those that git ignores;"]] });
    edit(k, "The project's own checks and the other checks of the SpecSheriff guidelines run only once", { en: [["run only once these checks have passed", "run only after these checks have passed"]] });
    const p = drafts[k].proposal;
    field(p, "reason", "A team that needs the checks to apply to everyone runs them in CI.", "A team that needs the checks of the git hooks to apply to everyone runs them in CI.", `${k} reason`);
    field(p, "reason", "so that no formatter changes what it generates.", "so that no formatter changes what the generator writes.", `${k} reason`);
    field(p, "reason", "on files that have passed the checks of their structure.", "on files that have passed the checks on their structure.", `${k} reason`);
    field(p, "ruReason", "Команда, которой нужно, чтобы проверки действовали для всех, запускает их в CI.", "Команда, которой нужно, чтобы проверки хуков git действовали для всех, запускает их в CI.", `${k} ruReason`);
    field(p, "ruReason", "чтобы ни один форматтер не менял того, что он генерирует.", "чтобы ни один форматтер не менял того, что пишет генератор.", `${k} ruReason`);
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 34: s-nh8b2hjvzasdxmd.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-nh8b2hjvzasdxmd";
    edit(k, "the location that the model of the specification (§s-w6gybeqn2ttydqx) gives a term", {
      en: [["the location that the model of the specification (§s-w6gybeqn2ttydqx) gives a term", "the location that the model of the specification (§s-w6gybeqn2ttydqx) assigns to a term"]],
      ru: [["даёт термину", "присваивает термину"]],
    });
    edit(k, "the location that the model of the specification gives the first top-level node", {
      en: [["the location that the model of the specification gives the first top-level node", "the location that the model of the specification assigns to the first top-level node"]],
      ru: [["даёт первому узлу", "присваивает первому узлу"]],
    });
    set(k, "Text has the form of a numbered node's location", {
      change: "Новое: какой текст имеет форму расположения, — по узлу «How a node's location is computed». Код сейчас берёт начала расположений из постоянного списка и потому отвергает, например, `tech/3`, которое расположением не является; это исправляется в стадии 3.",
    });
    set(k, "`sheriff binding` treats text as a location only where the text stands alone", {
      en: "`sheriff binding` treats text as a location only where the text stands alone, not as part of a longer path or name, such as `tech/stack` within `specs/tech/stack.json`.",
      ru: "`sheriff binding` считает текст расположением, только если этот текст стоит отдельно, а не входит в более длинный путь или имя, как, например, `tech/stack` в `specs/tech/stack.json`.",
      change: "Новое: часть более длинного пути или имени расположением не считается. Перед текстом код так и делает, а после текста пока нет: например, он отвергает `base/3.2` в `base/3.2.json`; это исправляется в стадии 3.",
    });
    const p = drafts[k].proposal;
    field(p, "reason", "A node's location changes whenever the specification is reordered,", "A node's location can change whenever the specification is reordered,", `${k} reason`);
    field(p, "ruReason", "Расположение узла меняется всякий раз, когда спецификацию переупорядочивают,", "Расположение узла может измениться всякий раз, когда спецификацию переупорядочивают,", `${k} ruReason`);
    p.examples = [X(rep(`${k} example`, p.examples[0].en, "though no node is at that location now", "even though no node is at that location now"), p.examples[0].ru)];
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 35: s-m8nmfsxkcfu7cjp.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-m8nmfsxkcfu7cjp";
    edit(k, "Each refusal names the file, the line and the text refused.", { en: [["the text refused.", "the refused text."]] });
    set(k, "the sid of each SpecTag", {
      en: "the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc), including its tests, which is left to the check for a SpecTag that names no node.",
      ru: "sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы (§s-hheus6f395ynqvc), включая его тесты: такой sid оставлен проверке SpecTag, который не называет ни одного узла.",
    });
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 36: s-dbk2vyeg8z5jxna.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-dbk2vyeg8z5jxna";
    edit(k, "`sheriff binding` refuses each file that `sheriff types` generates", {
      en: [
        ["Where the repository lacks such a file, it also refuses the commit.", "Where the repository lacks such a file, `sheriff binding` also refuses the commit."],
        ["says that running `sheriff types` regenerates it.", "says that running `sheriff types` generates it."],
      ],
      ru: [
        ["Если в репозитории нет такого файла, он также отвергает коммит.", "Если в репозитории нет такого файла, `sheriff binding` также отвергает коммит."],
        ["говорит, что запуск `sheriff types` порождает его заново.", "говорит, что запуск `sheriff types` его порождает."],
      ],
    });
    set(k, "While the rule that lists one of the project's own generators", {
      en: "While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of the two commits holds also counts as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run of the generator, `sheriff binding` refuses the generator in the same way.",
      ru: "Пока правило, которое перечисляет один из собственных генераторов проекта (§s-km4x4s26kv7pjze), — черновик, `sheriff binding` отвергает каждый файл этого генератора, который различается в родительском коммите (§s-2x58az67bm6cxq2) и в коммите. Файл генератора — файл по пути, который печатает генератор, когда `sheriff binding` запускает его так, как `sheriff types` запускает генератор, правило которого одобрено (§s-y5yk7eu6h4zrjpr). Файл, который есть только в одном из двух коммитов, тоже считается различающимся. Отказ называет файл и генератор. Если `sheriff types` отверг бы такой запуск генератора, `sheriff binding` отвергает генератор так же.",
    });
    const p = drafts[k].proposal;
    p.examples = [X(
      rep(`${k} example`, p.examples[0].en, "A commit edits `src/types.ts` by hand to match the new wording.", "A developer edits `src/types.ts` by hand to match the new wording and commits it."),
      rep(`${k} example`, p.examples[0].ru, "Коммит вручную меняет `src/types.ts` под новую формулировку.", "Разработчик вручную меняет `src/types.ts` под новую формулировку и делает коммит."))];
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 37: s-txbwsthdqhvyzd2.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-txbwsthdqhvyzd2";
    edit(k, "`sheriff commit-message` refuses a commit after which", {
      en: [["The commit passes where its message states", "Such a commit passes where its message states"]],
      ru: [["Коммит проходит, если его сообщение утверждает", "Такой коммит проходит, если его сообщение утверждает"]],
    });
    const p = drafts[k].proposal;
    field(p, "reason", "Unless its tests and code follow its new wording in the same commit, an approved rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j).", "Unless the tests and code of an approved rule follow its new wording in the same commit, the rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j).", `${k} reason`);
    p.examples = [X(p.examples[0].en, rep(`${k} example`, p.examples[0].ru, "и меняет код R, но ни одного из его тестов.", "и меняет код R, но не меняет ни одного из его тестов."))];
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 38: s-jgejd5rpd9d43pd.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-jgejd5rpd9d43pd";
    edit(k, "a test of the system's code, bound to the rule", { change: [["помеченный как ожидающий неудачи", "помеченный как ожидаемо падающий"]] });
    edit(k, "it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test", {
      en: [["that is bound to the rule in the commit's parent or as the commit leaves it;", "that is bound to the rule in the commit's parent or in the code and the tests as the commit leaves them;"]],
      ru: [["привязанный к правилу в родительском коммите или в том виде, в каком его оставляет коммит;", "привязанный к правилу в родительском коммите или в коде и тестах в том виде, в каком их оставляет коммит;"]],
      change: [["в родительском коммите или в том виде, в каком его оставляет коммит.", "в родительском коммите или в коде и тестах в том виде, в каком их оставляет коммит."]],
    });
    set(k, "it makes the rule one that the system's code must implement", {
      en: "it takes the rule out of the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example by ending the rule's exemption from implementation (§s-gf6n8ge4mke3pr2) or by moving the rule out of the technical debt (§s-2r7k2aeyusgy6fw).",
      ru: "выводит правило из числа исключений из требования быть реализованным (§s-6fw72j65jkqrfpf), например прекращает освобождение правила от реализации (§s-gf6n8ge4mke3pr2) или переносит правило из технического долга (§s-2r7k2aeyusgy6fw).",
      change: "Новое: четвёртый случай, который добавляет предложение по строке 10.1.41. 20 ноября вы включили в перечень удаление связи `implements`; правило, которое коммит выводит из исключений правила 9.2, так же незаметно остаётся без кода и теста. Так бывает, когда кончается освобождение, когда правило переносят из технического долга (одобрение при этом сохраняется, правило 1.3.5) и когда собственному типу узлов становится нужна имплементация (правило 8.3). Пункт называет исключения правила 9.2, а не говорит, что правило должно быть реализовано: требование реализации зависит и от того, одобрена ли спецификация, поэтому иначе коммит, который одобряет спецификацию, включал бы каждое одобренное правило. Правило 10.6 и ваше решение от 2026-11-17 позволяют одобрить спецификацию, когда у некоторых правил ещё нет кода или теста. Пункт не отрицает того, что верно, а называет исключения, поэтому правило «A rule says what holds, not what does not hold» соблюдено.",
    });
    edit(k, "`sheriff binding` checks the approved rules of the specification", { ru: [["которые код системы реализовывать не должен", "которые код системы реализовывать не обязан"]] });
    drafts[k].stage3 += " Approving the specification takes no rule out of those exceptions, so the commit that does so includes no rule on that account (rule 10.6).";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Row 10.1.41: proposal:row-10-1-41-g4.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:row-10-1-41-g4";
    set(k, "An approved rule that the system's code", {
      ru: agreed[k].proposal.parts[0].ru,
      change: "Как в согласованной формулировке; изменён только порядок слов в первом английском предложении: сначала короткий член, с «both … and», чтобы «expected to fail and to code» не сливалось. Смысл и русский текст те же.",
    });
    set(k, "a test or code that is bound to the rule before the commit or after it changes", { en: "a test or code that is bound to the rule, before the commit or after it, changes;" });
    set(k, "the rule becomes one that the system's code must implement", {
      en: "the rule stops falling under the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example because its exemption from implementation ends (§s-gf6n8ge4mke3pr2) or because it is moved out of the technical debt (§s-2r7k2aeyusgy6fw).",
      ru: "правило перестаёт подпадать под исключения из требования быть реализованным (§s-6fw72j65jkqrfpf), например потому, что заканчивается его освобождение от реализации (§s-gf6n8ge4mke3pr2) или его переносят из технического долга (§s-2r7k2aeyusgy6fw).",
    });
    drafts[k].change = "Добавлен один пункт в перечень того, после чего одобренное правило входит в коммит: правило перестаёт подпадать под исключения из требования быть реализованным (правило 9.2), например потому, что заканчивается его освобождение от реализации (правило 9.8) или его переносят из технического долга. 20 ноября вы включили в перечень удаление связи `implements`, через которую код или тест был привязан к правилу; правило, которое перестаёт подпадать под эти исключения, так же незаметно остаётся без кода и теста. Так бывает и тогда, когда собственному типу узлов становится нужна имплементация (правило 8.3). Пункт называет исключения правила 9.2, а не говорит, что правило должно быть реализовано: требование реализации зависит и от того, одобрена ли спецификация, поэтому иначе коммит, который одобряет спецификацию, включал бы каждое одобренное правило. Правило 10.6 и ваше решение от 2026-11-17 позволяют одобрить спецификацию, когда у некоторых правил ещё нет кода или теста. Пункт не отрицает того, что верно, а называет исключения, поэтому правило «A rule says what holds, not what does not hold» соблюдено. Цена: пока спецификация одобрена, коммит, который оставляет освобождающий узел черновиком, например переформулировкой, которая ждёт ответственного, отвергается, пока у каждого правила, которое этот узел освобождает, нет кода и теста, если только новая формулировка не одобрена в том же коммите. У третьего пункта точка заменена точкой с запятой, потому что он больше не последний. Последнее предложение примера начиналось с «But not:», что не английская конструкция; теперь оно, как в других примерах, называет самую вероятную ошибку. В русском примере «R входит в коммит и проходит проверку» стало «R входит в коммит, и коммит проходит», как в английском. По замечаниям читателей перестроены, без изменения смысла и русского текста, английские предложения о привязке к коду и тесту, второй пункт перечня и одно предложение обоснования. Остальная формулировка, стоимость и обоснование — как вы согласовали 2026-11-20.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 39: s-qqs2svksmjct753.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-qqs2svksmjct753";
    edit(k, "In this check, the code means", {
      en: [["(§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code", "(§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) in the system's code"]],
      ru: [["(§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет в коде системы", "(§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), в коде системы"]],
      change: [["Слова «outside the tests» заменены на «кроме тестов».", "Слова «outside the tests» заменены на «кроме тестов». Что коммит добавляет или меняет этот код, говорит первый абзац, поэтому здесь это не повторяется."]],
    });
    edit(k, "A message contains a node's sid", { ru: [["потому что в строках после неё дифф, который git не включает", "потому что строки после неё содержат дифф, который git не включает"]] });
    const p = drafts[k].proposal;
    p.examples = [X(
      rep(`${k} example`, p.examples[0].en, "and its message contains no sid", "and the commit message contains no sid"),
      rep(`${k} example`, p.examples[0].ru, "а в его сообщении нет ни одного sid", "а в сообщении коммита нет ни одного sid"))];
    drafts[k].stage3 += " `core.commentChar` may also be `auto` or a string of several characters (its alias is `core.commentString`): messageText is to find the comment string as git does in that case, and the scissors line as that string followed by ` ------------------------ >8 ------------------------`.";
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 40: s-b6qdtghnyha3fhk.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "s-b6qdtghnyha3fhk";
    edit(k, "The pre-push hook (§s-477gtdrkw34dzxw) refuses a push", {
      en: [
        ["It runs them with the command that the project-wide settings give as their `testCommand` (§s-zefk589ykh37b8u).", "It runs the tests with the command in the `testCommand` of the project-wide settings (§s-zefk589ykh37b8u)."],
        ["Where the hook must run the tests and the project-wide settings give no `testCommand`, it refuses the push and says that `testCommand` is missing.", "Where the hook must run the tests and the project-wide settings lack a `testCommand`, it refuses the push and says so."],
      ],
      ru: [
        ["Он запускает тесты командой, которую настройки, общие для проекта, задают как `testCommand` (§s-zefk589ykh37b8u).", "Он запускает тесты командой из `testCommand` настроек, общих для проекта (§s-zefk589ykh37b8u)."],
        ["Если хук должен запустить тесты, а настройки, общие для проекта, не задают `testCommand`, он отвергает push и сообщает, что `testCommand` не задан.", "Если хук должен запустить тесты, а в настройках, общих для проекта, нет `testCommand`, он отвергает push и сообщает об этом."],
      ],
    });
    edit(k, "The pre-push hook runs the tests only where", {
      en: [["a ref that names, directly or through a tag, a commit that meets", "a ref that points, directly or through a tag, to a commit that meets"]],
      ru: [["ref, который напрямую или через тег называет коммит,", "ref, который напрямую или через тег указывает на коммит,"]],
    });
    set(k, "In the commit that a ref names", {
      en: "In the commit that a ref points to, the SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). They read each rule of `project.json` in its last approved wording as of that commit (§s-a8fn72xa782wvbk). They take each rule's `refines` links from the commit that added the approval of that wording, since an approval does not cover links (§s-5ah25f6gy99panq). Where a member of such a list has the value `push` (§s-5hb9k2e34dgn284), the project's own guidelines name a push as the moment at which the tests run.",
      ru: "В коммите, на который указывает ref, инструменты SpecSheriff ищут `push` в `TextRule.list` (§s-eferktypcj7njt5) каждого правила `project.json`, у которого есть связь `refines` (§s-sn6au3vcr9uy5pm) с правилом о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h). Каждое правило `project.json` они читают в его последней одобренной формулировке на момент этого коммита (§s-a8fn72xa782wvbk). Связи `refines` каждого правила они берут из коммита, который добавил одобрение этой формулировки, потому что одобрение не распространяется на связи (§s-5ah25f6gy99panq). Если у элемента такого списка значение `push` (§s-5hb9k2e34dgn284), собственные guidelines проекта называют push моментом запуска тестов.",
    });
    edit(k, "In the commit that a ref points to", {
      change: [["Абзац открывается словами «В коммите, который называет ref»: правило ищется в том коммите, который отправляется, а не в текущей ветке.", "Абзац открывается словами «В коммите, на который указывает ref»: правило ищется в том коммите, который отправляется, а не в текущей ветке. Связи `refines` каждого правила берутся из коммита, который добавил его последнее одобрение: одобрение не распространяется на связи (правило 1.3.5), и иначе коммит, который удаляет связь, отключил бы тесты при push без чьего-либо одобрения. Так же согласованный узел «What `sheriff types` generates» берёт связи `refines` RecordType."]],
    });
    edit(k, "Where the push creates or updates a ref and the pre-push hook runs no tests", {
      en: [["in the commit that the ref names,", "in the commit that the ref points to,"]],
      ru: [["в коммите, который называет этот ref,", "в коммите, на который указывает этот ref,"]],
    });
    addRefs(k, R("cites", "s-5ah25f6gy99panq"));
    const p = drafts[k].proposal;
    p.examples = [X(p.examples[0].en, rep(`${k} example`, p.examples[0].ru, "Он говорит, что собственные guidelines", "Хук говорит, что собственные guidelines"))];
    drafts[k].stage3 = rep(`${k} stage3`, drafts[k].stage3, "looked up in that commit and its ancestors rather than on the current branch, as s-a8fn72xa782wvbk does for sheriff types.", "looked up in that commit and its ancestors rather than on the current branch, as s-a8fn72xa782wvbk does for sheriff types, and with the refines links of each rule taken from the commit that added that approval (s-5ah25f6gy99panq), as s-a8fn72xa782wvbk takes those of a RecordType.");
  }

  // -------------------------------------------------------------------------------------------------------------
  // The proposal for new:tools-1-project.
  // -------------------------------------------------------------------------------------------------------------
  {
    const k = "proposal:new-tools-1-project-g4";
    edit(k, "Where an item above refers to a rule that refines another rule", {
      en: [["the SpecSheriff tools find that rule by its `refines` link", "the SpecSheriff tools find each such rule by its `refines` link"]],
      ru: [["инструменты SpecSheriff находят это правило по его связи `refines`", "инструменты SpecSheriff находят каждое такое правило по его связи `refines`"]],
      change: [["«a rule» вместо «the rule»: таких правил может быть несколько, как говорит следующий список.", "«a rule» вместо «the rule» и «each such rule» вместо «that rule»: таких правил может быть несколько, как говорит следующий список."]],
    });
    edit(k, "The SpecSheriff tools read the `TextRule.list` of each rule", {
      en: [["A rule that has never been approved lists nothing.", "A rule that has never been approved lists nothing. They take the `refines` links of each rule of `project.json` from the commit that added the rule's last approval to `specs/_approvals.jsonl`, since an approval does not cover links (§s-5ah25f6gy99panq). Until that commit is made, they take the links from the files of the specification."]],
      ru: [["Правило, которое ни разу не было одобрено, ничего не перечисляет.", "Правило, которое ни разу не было одобрено, ничего не перечисляет. Связи `refines` каждого правила `project.json` они берут из коммита, который добавил последнее одобрение этого правила в `specs/_approvals.jsonl`, потому что одобрение не распространяется на связи (§s-5ah25f6gy99panq). Пока этот коммит не сделан, они берут эти связи из файлов спецификации."]],
      change: [["это предложение тому не противоречит.", "это предложение тому не противоречит. Связи `refines` берутся из коммита, который добавил последнее одобрение правила: одобрение не распространяется на связи (правило 1.3.5), и иначе правило, список которого защищён, можно было бы отключить, удалив связь, по которой его находят. Так же согласованный узел «What `sheriff types` generates» берёт связи `refines` RecordType."]],
    });
    addRefs(k, R("cites", "s-5ah25f6gy99panq"));
    drafts[k].change = rep(`${k} change`, drafts[k].change, " Остальная формулировка — как вы согласовали 2026-11-21.", " Добавлено, что связи `refines` каждого правила `project.json` берутся из коммита, который добавил последнее одобрение правила, а пока этот коммит не сделан, — из файлов спецификации, потому что одобрение не распространяется на связи (правило 1.3.5); так же согласованный узел «What `sheriff types` generates» берёт связи `refines` RecordType. В абзаце после первого списка «that rule» заменено на «each such rule». Остальная формулировка — как вы согласовали 2026-11-21.");
  }
}
