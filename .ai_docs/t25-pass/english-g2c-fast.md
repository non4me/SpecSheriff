### english-group2-changed-c.md · s-vp24dqydygztqbt (The review of a commit)
TRANSLATION:
- Если после коммита спецификация остаётся черновиком, `sheriff review` не принимает во внимание ни одного finding об утверждении, что реализация правила не требует изменений (§s-kgqxg4gunzynwsv).
- За каждый запуск reviewer платит пользователь, который делает коммит (§s-tnz9zgqx8c629a7). Поэтому `sheriff review` запускает reviewer только на коммите, которому нужно одно из его суждений.

TWO READINGS:
- "one of its judgements": "its" может быть reviewer (одно из суждений reviewer) или `sheriff review` (одно из суждений команды). Контекст предпочитает reviewer.
- "disregards each finding": (а) finding не влияет на отказ, но, возможно, показывается; (б) finding вообще не выдаётся. Контекст не решает. Другой узел говорит, что коммит при этом проходит проверку "silently", так что вероятнее (б).

LANGUAGE:
- "needs one of its judgements" → "calls for one of the reviewer's judgements" — слово "needs" с подлежащим "commit" звучит как калька. Замена также снимает неясность "its". Смысл сохраняется.

### english-group2-changed-c.md · new:tools-7-3-review-code (The judgement on the code that a commit changes)
TRANSLATION:
- Это каждое из следующего, целиком, в том виде, в каком его оставляет коммит, с его файлом, его строками и SpecTag (§s-8xw4mgvpexyvw5q), которые его связывают:
- изменённый код, кроме тестов, не содержит чего-то, что требует правило, названное в SpecTag на этом коде или названное в сообщении коммита где-либо, кроме трейлера `Implementation-Needs-No-Change` (§s-7gab4ptjt2khfr5);

TWO READINGS:
- "That is each of the following": слово "That" не названо раньше в этом фрагменте. Скорее всего оно указывает на то, что даётся reviewer для этого суждения, то есть на код, который меняет коммит.
- "in full": (а) файл целиком; (б) символ целиком. Из контекста не следует.
- "its lines": (а) все строки элемента; (б) только изменённые строки. "In full" склоняет к (а).
- "as the commit leaves it": "it" — каждый элемент списка, то есть его состояние после коммита.
- "leaves out something required by a rule": (а) код не реализует то, что требует правило; (б) код пропускает часть, которая в нём уже должна была быть. Контекст склоняет к (а).
- "anywhere other than in": правило названо в любом месте сообщения, кроме трейлера. Это ясно, но по-английски тяжело.

LANGUAGE:
- "That is each of the following" → "The reviewer is given each of the following" — "That is each of" не выглядит как естественное начало перечисления. Замена предполагает, что подразумевалось "reviewer получает"; я в этом не уверен.
- "the changed code other than tests" → "changed code other than tests" — артикль не нужен в начале пункта списка. Это не уточняется ссылкой на конкретный код.
- "the commit's message" → "the commit message" — обычное сочетание.
- "anywhere other than in an `Implementation-Needs-No-Change` trailer" → "outside an `Implementation-Needs-No-Change` trailer" — сочетание "anywhere other than in" тяжёлое и необычное. Смысл тот же.
- "leaves out something required by a rule" → "omits something that a rule requires" — "leaves out" вместе с "something required by" звучит неуклюже. Смысл сохраняется.

### english-group2-changed-c.md · new:tools-7-3-review-statement (The judgement on a statement that a rule's implementation needs no change)
TRANSLATION:
- `sheriff review` отказывает коммиту по такому finding только тогда, когда коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2).
- Если коммит оставляет её черновиком, он проходит эту проверку молча.
- Reviewer судит утверждение о каждом правиле, которое называет такой трейлер, при любом статусе одобрения спецификации.

TWO READINGS:
- "such a finding": ссылается на finding этого суждения (вероятно, что утверждение неверно). Само finding в абзаце не названо.
- "approved": (а) вся спецификация целиком одобрена, то есть ни одного черновика; (б) одобрены изменённые узлы. Контекст ("the specification's approval status") склоняет к (а).
- "leaves it a draft": "it" — вероятно, "the specification", а не "the commit".
- "passes this check silently": (а) без какого-либо вывода; (б) finding есть, но коммит не отклоняется. Контекст предпочитает (б), потому что reviewer всё же судит утверждение.
- "this check": не названа. Вероятнее всего это проверка суждения о таком утверждении.
- "such a trailer": в абзаце не назван. Скорее всего это трейлер `Implementation-Needs-No-Change`.
- "the statement about each rule": (а) по одному утверждению на правило; (б) одно утверждение обо всех правилах. Склоняет к (а).

LANGUAGE:
- "refuses a commit on such a finding" → "refuses a commit because of such a finding" — "on a finding" звучит неестественно в таком значении. Смысл сохраняется.
- "whatever the specification's approval status" → "regardless of the specification's approval status" — это нормальная форма для технического текста.

### english-group2-changed-c.md · new:tools-7-3-review-appendix (The judgement on a node of the technical appendix that a commit approves)
TRANSLATION:
- `sheriff review` отказывает коммиту по такому finding при любом статусе одобрения спецификации (§s-qzthyh7yqvfhsa2).
- В правиле о том, что получает reviewer (§s-nyh9yk22ba6g77q), раздел верхнего уровня базовой спецификации — это раздел, чьё расположение (§s-kag2m9tzdnduxdx) состоит из названия части, косой черты и одного числа, например `base/3` или `requests/2`.

TWO READINGS:
- "such a finding": в абзаце не названо. Вероятно, это finding, что узел технического приложения не уточняет правила базовой спецификации или противоречит им.
- "the name of a part": (а) часть спецификации, то есть файл или домен; (б) часть проекта. Склоняет к (а).
- "In the rule ... a top-level section ... is": (а) определение действует только в этом правиле; (б) определение общее, а в правиле лишь применяется. Склоняет к (а).

LANGUAGE:
- "is a section whose location" → "means a section whose location" — определение лучше вводить словом "means". Это ограничивает действие определения одним правилом, как, видимо, и задумано.
- "In the rule on what the reviewer is given" → "In the rule on what the reviewer is given," — запятая уже есть. Замены здесь нет, но "a top-level section ... is" требует кавычек вокруг определяемого понятия: "a top-level section of the base specification".

### english-group2-changed-c.md · new:tools-10-verdict (The reviewer's verdict)
TRANSLATION:
- Каждое finding также называет суждение, к которому оно относится (§s-vp24dqydygztqbt).
- Вердикт, смысл которого `sheriff review` пришлось бы угадывать, например pass, в котором перечислено finding, позволил бы `sheriff review` решать судьбу коммита вместо независимого reviewer (§s-m4h279nbaqkpa3t).

TWO READINGS:
- "also": в дополнение к чему — в этом фрагменте не сказано. Вероятно, к тексту finding.
- "decide the commit": (а) решить, пропустить коммит или отказать ему; (б) решить, нужно ли ему ревью. Склоняет к (а).

LANGUAGE:
- "decide the commit" → "decide the outcome for the commit" — глагол "decide" с прямым дополнением "the commit" не употребляется так. Замена предполагает смысл (а); я не уверен, что имелось в виду именно это.

### english-group2-changed-c.md · new:tools-10-start (How a runner is started)
TRANSLATION:
- с отключёнными инструментами, насколько это позволяют его параметры командной строки;

TWO READINGS:
- "its tools": (а) собственные инструменты runner, например доступ к файлам и оболочке; (б) инструменты SpecSheriff. Контекст склоняет к (а).
- "its command-line options": параметры runner. Другого значения нет.

LANGUAGE:
- none

### english-group2-changed-c.md · new:tools-10-codex (The runner `codex`)
TRANSLATION:
- У Codex нет способа запускаться без собственного «home» и инструментов, поэтому runner ограничивает и то и другое.

TWO READINGS:
- "its own home": (а) домашний каталог с конфигурацией (вроде `~/.codex`); (б) любой домашний каталог пользователя. Склоняет к (а). Одно слово "home" без уточнения неоднозначно.
- "restricts both": "restricts" — (а) ограничивает доступ к ним; (б) подменяет их. Склоняет к (а).
- "Codex" и "the runner": Codex — программа, runner — то, что её запускает.

LANGUAGE:
- "its own home" → "its own home directory" — слово "home" без "directory" не называет предмет.
- "run without its own home and tools" → "run without using its own home directory and tools" — "run without a home" — калька. Не уверен, что замена сохраняет смысл: возможно, имелось в виду "run without loading".

### english-group2-changed-c.md · new:tools-10-settings (The settings of each runner)
TRANSLATION:
- Они записывают настройку в git-конфигурацию пользователя только со значением, которое этот пользователь даёт в ответ.
- С этого момента каждое ревью, выполненное с runner `claude` на этой машине, идёт с этой моделью, в том числе после обновления плагина или его удаления и повторной установки.

TWO READINGS:
- "They": в абзаце не названо. Вероятно, skills или plugin, которые спрашивают пользователя. Может быть и "the settings".
- "in reply": ответ на вопрос, заданный пользователю. Сам вопрос в абзаце не назван.
- "that model": модель названа вне абзаца. Вероятно, модель, которую пользователь выбрал в ответе.
- "From then on": с момента записи настройки.
- "updated, or removed and installed again": (а) два случая: обновили; удалили и снова установили. (б) обновили или удалили, и в обоих случаях установили заново. Склоняет к (а).

LANGUAGE:
- "the runner `claude`" — без замены: "reviews made with the runner" читается нормально.

### english-group2-changed-c.md · s-9rtrj24myzjvshu (SpecTags on the system's code other than tests)
TRANSLATION:
- там, где может быть SpecTag, текст, который начинается с `@spec`, но не имеет ни одной из форм SpecTag (§s-5z5gnu7pahr82xp), например `@spec none` без текста после него;
- Отказ называет файл и, если он касается символа или строки, этот символ или эту строку.

TWO READINGS:
- "may stand": (а) разрешено; (б) возможно. Склоняет к (а): там, где SpecTag допустим.
- "a text that opens with": (а) комментарий; (б) любой фрагмент текста. Склоняет к (а): рядом сказано "where a SpecTag may stand", то есть в комментарии.
- "The refusal": отказ, названный раньше в узле, вне этого фрагмента. Вероятно, отказ команды `sheriff binding`.
- "where it concerns": "it" — отказ.
- "the forms of a SpecTag": (а) допустимые синтаксические варианты записи; (б) виды SpecTag, например с sid и `none`. Склоняет к (а).

LANGUAGE:
- "may stand" → "is allowed" — "stand" здесь калька (в проекте уже решено говорить "is", а не "stands", о положении узла). Замена "where a SpecTag is allowed" сохраняет смысл (а). Если имелось в виду (б), замена неверна.
- "a text that opens with" → "text that begins with" — "a text" без определения читается как законченное произведение. Лучше "text" или "a comment".
- "has none of the forms" → "matches none of the forms" — к форме запись "соответствует", а не "имеет".

### english-group2-changed-c.md · new:tools-7-2-rule-test (A test for each rule whose code a commit changes)
TRANSLATION:
- `sheriff binding` принимает коммит, который добавляет или меняет код, связанный с правилом (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp), только там, где тест кода системы (§s-hheus6f395ynqvc) объявляет SpecTag этого правила (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg).
- В этой проверке «код» означает символы (§s-kgbzk2ph9e6jfb4) и файлы, связанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет (§s-2x58az67bm6cxq2), кроме тестов.
- В этой проверке тест учитывается независимо от того, меняет ли его коммит.
- Тест, помеченный как пропускаемый или как ожидающий падения, тоже учитывается.

TWO READINGS:
- "a test of the system's code": (а) тест, который проверяет код системы; (б) тест, который сам является частью кода системы. Склоняет к (а).
- "only where": (а) только если такой тест существует в проекте; (б) только если он добавлен этим же коммитом. Второе исключено следующим предложением.
- "other than tests": (а) относится к "the code", то есть к символам и файлам; (б) относится к тому, что коммит добавляет или меняет. По смыслу совпадают. Склоняет к (а).
- "declares that rule's SpecTag": "that rule" — правило, с которым связан код.

LANGUAGE:
- "declares that rule's SpecTag" → "carries that rule's SpecTag" — "declares" — не обычный глагол для связи теста с SpecTag; в других узлах метода используется "carries". Возможно, "declares" выбран намеренно. Смысл сохраняется.
- "the code means the symbols" → ""code" means the symbols" — определяемое слово лучше брать в кавычки, чтобы не читать "the code" как конкретный код.