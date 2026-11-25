### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · s-v4qus7raqnwzneb — How an approval is recorded, sentence 1
TRANSLATION: Последнее одобрение узла — это самая поздняя строка для sid этого узла и `fingerprint` его текущей формулировки, если эта строка является одобрением.
TWO READINGS:
- "the latest line for the node's sid and the fingerprint of its current wording": (а) самая поздняя строка, относящаяся одновременно к sid узла и к `fingerprint` его текущей формулировки; (б) последнее одобрение — это две вещи: самая поздняя строка для sid узла и, отдельно, `fingerprint` текущей формулировки. Контекст поддерживает (а): предыдущий абзац говорит "the latest line for the node's sid and that wording's fingerprint".
LANGUAGE:
- "the latest line for the node's sid and the fingerprint of its current wording" → "the latest line that holds both the node's sid and the fingerprint of its current wording" — без "both" сочинение можно разобрать как два отдельных члена сказуемого.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · s-v4qus7raqnwzneb — How an approval is recorded, sentence 2
TRANSLATION: В противном случае последнее одобрение узла — это самая поздняя из строк для sid этого узла, являющихся одобрением, независимо от того, отзывает ли это одобрение более поздняя строка.
TWO READINGS:
- "Otherwise": (а) если самая поздняя строка для текущей формулировки не является одобрением, то есть является отзывом; (б) то же, а также если для текущей формулировки нет ни одной строки. Контекст не исключает ни одного прочтения; вероятнее (б).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-11-withdraw — Withdrawing the approval of a node
TRANSLATION: Для каждого одобрения формулировки (§s-5ah25f6gy99panq) такого узла, если это одобрение действует, независимо от того, имеет ли узел эту формулировку до сих пор, команда дописывает в `specs/_approvals.jsonl` строку, которая отзывает это одобрение (§s-v4qus7raqnwzneb).
TWO READINGS:
- "each approval of a wording": (а) одно одобрение на каждую формулировку, то есть одна строка отзыва на каждую формулировку с действующим одобрением; (б) каждая строка-одобрение в файле, так что для формулировки, одобренной дважды, дописываются две строки отзыва. Контекст поддерживает (а): по узлу о записи одобрений действие одобрения определяется для формулировки, а следующее предложение говорит "the first line for each such wording".
LANGUAGE:
- "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, if that approval is in force, whether or not the node still holds that wording, the command appends" → "For each wording (§s-5ah25f6gy99panq) of such a node whose approval is in force, whether or not the node still has that wording, the command appends" — три уточнения подряд перед главным предложением, а условие "if that approval is in force" естественнее выразить определением. Не уверен, что замена сохраняет смысл, если имелось в виду прочтение (б).
- "the node still holds that wording" → "the node still has that wording" — "hold" сочетается с содержимым (ключом, свойством, строкой), а формулировка не содержимое узла.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-entries — The entries of the settings that only an owner changes
TRANSLATION: Записи настроек хранят каждое изменение, которое ответственный внёс в настройки, изменяемые только ответственным за спецификацию, причём каждое — с адресом электронной почты ответственного, который его внёс, но значение настройки задаёт только последняя запись каждого списка.
TWO READINGS:
- "an owner" рядом с "an owner of the specification": (а) оба раза речь об ответственном за спецификацию; (б) первое — любой ответственный, например за раздел, второе — только ответственный за спецификацию. Контекст поддерживает (а).
- "each with the email address": (а) каждое изменение — с адресом; (б) каждая запись — с адресом. Результат один и тот же, потому что одна запись фиксирует одно изменение.
- "its setting": (а) настройка этого списка; (б) настройка этой записи. Результат один и тот же.
LANGUAGE:
- "The entries keep every change" → "The entries record every change" — запись фиксирует изменение, а не хранит его; в соседнем абзаце того же узла стоит "the change that the entry records".
- "that an owner has made" → "that an owner of the specification has made" — два разных обозначения в одном предложении читаются как два разных лица. Замена сохраняет смысл только при прочтении (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-approve-spec — Approving the specification
TRANSLATION: Этот отказ называет то же, что в этом случае называет отказ включить флаг.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-strict — Turning the `strict` flag on, list item 1
TRANSLATION: проверка на наличие вне коммита (§s-3xx2eukc8gtd2tx) кода и тестов, которые не связывает ни один SpecTag (§s-8xw4mgvpexyvw5q): она отказала бы там, где `sheriff untagged` (§s-weuyx98r7c923ab) вывел бы хоть что-нибудь, и отказ включить флаг называет `sheriff untagged`;
TWO READINGS:
- "the check for code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds": (а) ни один SpecTag не связывает код и тесты; (б) ни один SpecTag не связывает коммит; (в) ни один SpecTag не связывает проверку. Контекст поддерживает (а), но придаточное отделено от "code and tests" словами "outside the commit" и ссылкой.
LANGUAGE:
- "code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds" → "code and tests that are outside the commit (§s-3xx2eukc8gtd2tx) and that no SpecTag (§s-8xw4mgvpexyvw5q) binds to a node" — у "bind" нет второго дополнения (с чем связывает), а придаточное стоит далеко от своего существительного. Не уверен, что "to a node" точно передаёт задуманное.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-strict — Turning the `strict` flag on, list item 2
TRANSLATION: каждая из собственных проверок проекта (§s-2fau85dfyyeq66m), любую из которых правило собственных guidelines проекта (§s-u7tw6m8npxmv5tu) может сделать строже (§s-q3pfzyaxvpr2zj2): такая проверка отказала бы там, где `sheriff validate --strict` отказал бы из-за этой проверки (§s-7pk89t8z6wymmj9), и отказ включить флаг называет `sheriff validate --strict`.
TWO READINGS:
- "may make stricter": (а) правилу разрешено сделать проверку строже; (б) возможно, что какое-то правило делает её строже. Контекст не выбирает; для смысла пункта важнее (б).
- "a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) may make stricter": (а) правило само ужесточает проверку, независимо от флага; (б) правило объявляет, что проверку ужесточает флаг `strict`. Вводное предложение списка говорит о проверках, "that the `strict` flag makes stricter", поэтому имеется в виду, вероятно, (б), но слова говорят (а).
- "such a check": (а) любая из собственных проверок проекта; (б) только та, которую правило сделало строже. Контекст поддерживает (б), но "each of the project's own checks" в начале пункта подталкивает к (а).
LANGUAGE:
- "any of which a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) may make stricter" → "that a rule of the project's own guidelines (§s-u7tw6m8npxmv5tu) makes stricter while the flag is on" — "any of which … may" оставляет неясным и модальность, и то, о каких проверках идёт речь дальше. Не уверен, что замена сохраняет смысл: она выбирает прочтения (б).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-extension-off — Withdrawing the choice of an extension, sentence 1
TRANSLATION: Ссылка в расширении схемы, принадлежащем проекту (§s-xm8rz4uupb73gu5), зависит от расширения guidelines в том случае, если эта ссылка указывает на определение, которое добавляют `$defs` схемы этого расширения guidelines (§s-xzcw3hv4hmxz7h7).
TWO READINGS:
- "the extension of the guidelines": в этом абзаце расширение не названо. Вероятнее всего, это расширение, выбор которого отзывается, названное в первом абзаце узла; читатель может также понять это как любое расширение guidelines.
LANGUAGE:
- "depends on the extension of the guidelines where the reference points to a definition that the `$defs` of the schema of that extension of the guidelines add" → "depends on an extension of the guidelines where the reference points to a definition that the `$defs` of that extension's schema add" — определённый артикль без названного в абзаце предмета, и цепочка из трёх "of". Не уверен, что "an" сохраняет смысл, если имелось в виду только отзываемое расширение.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · new:tools-2-extension-off — Withdrawing the choice of an extension, sentence 2
TRANSLATION: `fields` расширения схемы, принадлежащего проекту, зависят от расширения guidelines в том случае, если они задают условия для типа узла, который добавляют `kinds` схемы этого расширения guidelines.
TWO READINGS:
- "the extension of the guidelines": то же, что в предложении 1: расширение в абзаце не названо; вероятнее всего, это отзываемое расширение.
- "set conditions for a kind": (а) задают требования к узлам этого типа, например добавляют им свойства; (б) задают условия, при которых что-то применяется к этому типу. Остальные правила говорят о `fields` иначе: "add properties to that kind". Поэтому неясно, то же ли это действие.
LANGUAGE:
- "where they set conditions for a kind" → "where they add properties to a kind" — общее слово "conditions" без указания, условия чего. Не уверен, что замена сохраняет смысл: она верна только при прочтении (а).
- "that the `kinds` of the schema of that extension of the guidelines add" → "that the `kinds` of that extension's schema add" — цепочка из трёх "of".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it, sentence 1
TRANSLATION: Если раньше хуки репозитория запускались из другого места, то есть из `.git/hooks/` или из другой папки, на которую указывал `core.hooksPath`, `sheriff init` называет каждый найденный там хук, кроме хуков-образцов самого git.
TWO READINGS:
- "elsewhere": место, с которым сравнивают, в предложении не названо. Вероятнее всего, это «не из `.githooks/`»; эта папка названа только в других абзацах узла.
- "another folder that `core.hooksPath` pointed to": (а) любая папка, кроме `.git/hooks/`; (б) любая папка, кроме `.git/hooks/` и `.githooks/`. Контекст поддерживает (б), но слова говорят (а).
LANGUAGE:
- "previously ran from elsewhere, that is, from `.git/hooks/` or from another folder that `core.hooksPath` pointed to" → "previously ran from a folder other than `.githooks/`, that is, from `.git/hooks/` or from the folder that `core.hooksPath` pointed to" — "elsewhere" не говорит, относительно чего. Не уверен, что замена сохраняет смысл, если `core.hooksPath` мог указывать и на `.githooks/`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it, sentence 2
TRANSLATION: Он называет каждую папку `.githooks/<hook>.d/`, которую оставляет на месте, и сообщает, что собственные инструменты проекта в этой папке (§s-n4m5zvh96yb299p) больше не запускаются.
TWO READINGS: none
LANGUAGE:
- "each folder `.githooks/<hook>.d/` that it leaves in place" → "each `.githooks/<hook>.d/` folder that it leaves in place" — в английском имя стоит перед словом "folder"; порядок «папка + имя» повторяет русский.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it, sentence 3
TRANSLATION: Без слияния объединением git сообщил бы о конфликте в этом файле.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group6e.md · proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote
TRANSLATION: в том запуске, который переносит в архив или удаляет правило из `project.json`, уточняющее правило о статусе одобрения спецификации, — независимо от того, одобрено ли перенесённое или удалённое правило или является черновиком, — если в `project.json` не остаётся ни одного правила, уточняющего правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h), под верхний узел `project.json` добавляется правило-черновик о том, когда запускаются тесты, которое пишет `sheriff init` (§s-7unxytshhc4md54);
TWO READINGS:
- "whether the archived or deleted rule is approved or a draft": (а) независимо от того, одобрено правило или является черновиком; (б) косвенный вопрос «одобрено ли правило или оно черновик», который ни к чему не присоединён. Контекст поддерживает (а).
- "is left holding no rule that refines the rule on when the tests must pass": (а) не остаётся ни одного такого правила, ни одобренного, ни черновика; (б) не остаётся ни одного одобренного такого правила. Слова говорят (а).
- "which `sheriff init` writes": (а) то самое правило с тем же заголовком, текстом и причиной, какое пишет `sheriff init`; (б) правило, которое в этом проекте когда-то записал `sheriff init`. Контекст поддерживает (а).
LANGUAGE:
- "in the run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added" → "the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json` in a run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, if that run leaves `project.json` holding no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h)" — три обстоятельства подряд стоят перед подлежащим, и читатель до конца не знает, о чём пункт. Замена опускает оговорку "whether … approved or a draft", поэтому не уверен, что она сохраняет смысл; оговорку можно дать отдельным предложением.
- "in the run that archives or deletes" → "in a run that archives or deletes" — определённый артикль предполагает уже названный запуск, а здесь он вводится впервые.
- "whether the archived or deleted rule is approved or a draft" → "whether that rule was approved or a draft" — правило уже перенесено или удалено, поэтому настоящее время "is" читается с запинкой.
