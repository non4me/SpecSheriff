### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests
TRANSLATION:
- Коммит изменяет файл, связанный целиком, если строка этого файла меняет код (§s-u6mj5yv8ngnz79v).
- Пример: коммит переформулирует комментарий в таблице стилей, которая связана SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff читают строки таблицы стилей по грамматике CSS и пропускают комментарий, поэтому коммит оставляет таблицу стилей без изменений. Самая вероятная ошибка: посчитать любое изменение текста файла, связанного целиком (в тексте не сказано, чем посчитать), и тогда переформулированный комментарий становится изменением кода.

TWO READINGS:
- "A commit changes a file bound as a whole where a line of that file changes the code": (а) коммит считается изменением кода, связанного с файлом, если строка файла меняет код; (б) буквально: коммит меняет файл, когда строка меняет код. Это тавтология, потому что файл уже изменён, когда меняется его строка. Контекст favours (а).
- "so the commit leaves the stylesheet unchanged": (а) таблица стилей не изменена как код; (б) файл буквально не изменён. Это неверно, потому что комментарий переписан. Контекст favours (а).

LANGUAGE:
- "A commit changes a file bound as a whole where a line of that file changes the code" → "A commit counts as changing the code of a file bound as a whole if a line of that file changes the code" — "changes a file" is trivially true whenever a line changes, and the intended meaning is "changes the code bound to the file". I am not fully sure the replacement keeps the meaning.
- "leave out the comment" → "ignore the comment" — "leave out" means omit something from a list or text, not skip a comment while parsing.
- "to count any change to the text of a file bound as a whole, which makes" → "to treat any change to the text of a file bound as a whole as a change to the code, which makes" — "count" needs "as" and an object.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · new:tools-7-2-changed-line — A line that changes the code
TRANSLATION:
- Инструменты SpecSheriff решают, какие из строк, которые коммит удаляет или добавляет, меняют код (§s-9j2mmnuuwmx5ksn). Они читают каждую строку как токены языка файла в каждом из следующих файлов:
- файл, язык которого охватывает описание (§s-33fw3ga4ctd94dq);
- файл, связанный целиком (§s-kgbzk2ph9e6jfb4), имя которого заканчивается на `.yaml`, `.yml`, `.css`, `.sql`, `.sh` или `.json`.
- Такой файл, связанный целиком, они разбирают грамматикой tree-sitter его формата: YAML, CSS, SQL, Bash или JSON. Токены строки они читают так:
- пробельные символы двух строк различаются там, где язык файла придаёт пробельным символам значение, например отступ строки в Python или YAML.
- В любом другом файле каждая строка, которую коммит удаляет или добавляет, меняет код.
- Reason: изменение кода заставляет инструменты SpecSheriff снова проверить этот код по его правилам (§s-9j2mmnuuwmx5ksn). Чтение каждой строки как токенов языка её файла пропускает то, что не может изменить действие кода, например комментарии и пробельные символы, которым язык не придаёт значения.
- Example: коммит сдвигает ключ `retries` в YAML-файле, связанном целиком, на два пробела вправо, из-за чего ключ оказывается под ключом выше него. Строка содержит те же токены, что и раньше, но её отступ, которому YAML придаёт значение, отличается, поэтому строка меняет код. Самая вероятная ошибка: пропускать все пробельные символы, как в TypeScript, и тогда сдвинутый ключ проходит как неизменённый.

TWO READINGS:
- "the whitespace of the two lines differs": "the two lines" не названы раньше. Скорее всего это удалённая и добавленная строки. Пункт стоит после "as follows" (как читаются токены), но звучит как условие, при котором строка меняет код. Контекст favours условие.
- "a file whose language a description covers": "a description" без уточнения. Вероятно, это описание языка (§s-33fw3ga4ctd94dq). Другое прочтение: любое описание, в котором язык упомянут.
- "which moves the key under the key above it": (а) делает ключ вложенным в ключ выше; (б) физически переставляет ключ ниже по файлу. Контекст (YAML) favours (а).
- "bound as a whole by two more spaces": (а) "by two more spaces" относится к "indents"; (б) "связан целиком на два пробела". Прочтение (а) favoured, но порядок слов сбивает.

LANGUAGE:
- "They read each line as the tokens of the file's language in each of the following files:" → "In each of the following kinds of file, they read each line as a sequence of tokens of the file's language:" — the items are kinds of file, not files, and "as the tokens" with the definite article is unidiomatic.
- "They read the tokens of a line as follows:" → no replacement that surely keeps the meaning — the lead-in promises a way of reading tokens, but the item that follows states a condition ("the whitespace of the two lines differs where…") and is a full sentence with a full stop.
- "the whitespace of the two lines differs" → "the whitespace of the removed line and of the added line differs" — "the two lines" has no antecedent. This is a guess at the meaning.
- "leaves out what cannot alter what the code does" → "ignores what cannot alter what the code does" — "leave out" means omit, not skip when reading.
- "gives whitespace a meaning" → "gives meaning to whitespace" — the indefinite article is odd. A close alternative is "treats whitespace as significant".
- "to which YAML gives a meaning" → "to which YAML gives meaning" — same reason.
- "leave out all whitespace" → "ignore all whitespace" — same reason as above.
- "indents the key `retries` in a YAML file bound as a whole by two more spaces" → "indents the key `retries` by two more spaces in a YAML file bound as a whole" — the modifier is misplaced.
- "moves the key under the key above it" → "nests the key under the key above it" — "moves" is vague, and "nests" says what YAML indentation does.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-9j2mmnuuwmx5ksn — A change to a SpecTag
TRANSLATION:
- Изменение SpecTag (§s-8xw4mgvpexyvw5q) считается изменением теста или кода, который этот SpecTag связывает.
- Пока SpecTag остаётся прежним, ничто из следующего не меняет тест или код:
- переименование теста;
- добавление, удаление или переформулирование комментария;
- изменение пробельных символов, которое, на языке их файла, не влияет на действие кода.
- В файле, в котором проверки (§s-jau82aq9juv9zzh) не могут отличить комментарии и пробельные символы от кода, любая правка меняет код.
- Example: коммит заново расставляет отступы в блоке кода на TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому он не меняет код. Но не так: коммит, который сдвигает ключ YAML-файла дальше вправо, отчего ключ оказывается под ключом выше него, оставляет код неизменным.

TWO READINGS:
- "none of the following changes the test or the code": (а) ничто из этого не считается изменением теста или кода; (б) буквально не меняет. Переименование теста всё же меняет тест. Контекст favours (а).
- "the test or the code that the SpecTag binds": (а) SpecTag связывает и тест, и код; (б) "that…" относится только к "the code". Прочтение (а) favoured.
- "so it changes no code": "it" — коммит или блок кода. Контекст favours коммит.
- "But not: a commit that indents a key … leaves the code unchanged": (а) отрицается всё утверждение: такой коммит НЕ оставляет код неизменным, то есть меняет его; (б) "не" относится только к примеру: этот коммит не относится к предыдущему случаю, а меняет ли он код, не сказано. Контекст favours (а).

LANGUAGE:
- "But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged." → "By contrast, a commit that indents a key of a YAML file further, which nests the key under the key above it, changes the code." — "But not:" is a construction copied from Russian, and the scope of the negation is unclear. I am fairly sure the replacement keeps the intended meaning.
- "which moves the key under the key above it" → "which nests the key under the key above it" — "moves" is vague.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules
TRANSLATION: SpecTag перед символом связывает этот символ и каждый символ, вложенный в него. SpecTag в начале файла и запись в bindings file связывают файл целиком. Изменение в любом месте файла, связанного целиком, есть изменение кода, который связывают его SpecTag. Единственное исключение — правка комментария или пробельных символов, которая не меняет код (§s-9j2mmnuuwmx5ksn).

TWO READINGS:
- "the bindings file": нет антецедента в тексте. Это, вероятно, файл проекта, в котором перечислены привязки файлов целиком. Предыдущее упоминание не названо.
- "the code its SpecTags bind": "its SpecTags" — SpecTag файла. Но файл может быть связан записью в bindings file, где SpecTag нет. (а) код, связанный SpecTag файла; (б) весь код файла, как бы он ни был связан. Контекст favours (б).
- "an edit to a comment or to whitespace that changes no code": (а) "that changes no code" относится к обоим, к комментарию и к пробельным символам; (б) только к "whitespace". Прочтение (а) favoured.

LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-m4h279nbaqkpa3t — What the checks enforce, and when they run
TRANSLATION:
- при каждом коммите, который добавляет или изменяет комментарий в коде или в тесте: согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует;
- Reason: каждая проверка, кроме review, двоичная, поэтому для отказа не требуется ничьего суждения. Проверка, которая иногда отказывает по причине, которую никто не может воспроизвести, обходится при первой возможности и ей больше никогда не доверяют. Review нужен reviewer, потому что ни один скрипт не может решить, делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли реализации правила не нужно изменений и согласуется ли узел технического приложения с base specification.

Запущенная после каждой правки агента, проверка находит ошибку там, где она сделана. Порядок, в котором написаны тест и код, виден только по правкам, одной за другой, потому что коммит содержит тест и код вместе.

Тесты не запускаются при коммите, потому что набор тестов выполняется дольше, чем кто-либо должен ждать коммита. Изменение, которым ещё не поделились, никого не вводит в заблуждение, поэтому его тесты могут подождать, пока им не поделятся. Где они запускаются, решает проект, потому что некоторые наборы идут часами или нуждаются в том, чего нет на машине разработчика. Пока спецификация — черновик, работа сосредоточена на самой спецификации, поэтому ни один тест не обязан проходить.

TWO READINGS:
- "the review": в абзаце не названо ранее. Скорее всего это проверка коммита независимым reviewer. Другое прочтение: любая проверка человеком.
- "the code and its rules" (в "agrees with the code and its rules"): "its" — правила кода или правила комментария. Прочтение «правила кода» favoured.
- "A change not yet shared … until it is shared": "shared" не определено. (а) отправлено в общий репозиторий (push); (б) показано другим. Прочтение (а) favoured.
- "While the specification is a draft": (а) вся спецификация в стадии черновика, то есть узлы со статусом draft; (б) этап проекта, когда спецификацию ещё пишут. Прочтение (б) favoured.

LANGUAGE:
- "Every check but the review is binary" → "Every check except the review by the independent reviewer passes or fails with no judgement involved" — "binary" is jargon here, and "the review" has no antecedent. I am not sure the replacement keeps the meaning exactly.
- "The order in which the test and the code are written can be seen only edit by edit" → "The order in which the test and the code are written is visible only edit by edit" — "can be seen" is acceptable, so this is a low-priority change.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-nyh9yk22ba6g77q-g3 — What the reviewer is given
TRANSLATION:
- формулировка каждого правила, которое SpecTag (§s-8xw4mgvpexyvw5q) связывает с кодом или тестом, которые коммит добавляет или изменяет, или в котором коммит добавляет или изменяет комментарий;
- Reason: reviewer выносит суждения, которые не может вынести никакая детерминированная проверка: делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли реализации правила не нужно изменений и согласуется ли одобренный узел технического приложения с base specification. Судить он может только по тому, что ему показано. Когда ему показано то, что нужно для каждого суждения, и ничего из того, что имел в виду автор изменения, он судит только по правилам.

TWO READINGS:
- "in which the commit adds or changes a comment": "which" — правило (комментарий в правиле?) или код или тест. Контекст favours код или тест.
- "code or a test that the commit adds or changes": (а) "that…" относится к "code" и к "a test"; (б) только к "a test". Прочтение (а) favoured.
- "it judges by the rules alone": (а) судит по правилам, а не по замыслу автора; (б) судит только по правилам и без кода и комментария. Прочтение (б) противоречит остальному тексту, которому reviewer показывают и код, и комментарии. Контекст favours (а).

LANGUAGE:
- "and nothing of what the author of the change meant" → "and nothing about what the author of the change meant" — "nothing of" is a copy of the Russian "ничего из".
- "Shown what each judgement needs, and nothing of what … it judges by the rules alone" → "Given what each judgement needs, and nothing about what the author of the change meant, it judges by the rules alone" — "shown" is acceptable, but "given" matches the heading ("What the reviewer is given"). Low priority.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:row-10-1-43b — a new row of the main table of checks
TRANSLATION:
- Каждый комментарий, который коммит добавляет или изменяет в коде или в тесте, согласуется с кодом, который он описывает, и с правилами, которые этот код реализует.
- При отказе: сообщается как предупреждение, с указанием файла и строки комментария.

TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-vp24dqydygztqbt — The review of a commit
TRANSLATION:
- суждение о каждом комментарии, который коммит добавляет или изменяет (§s-7vpsdsy8dpqdy6r);

TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:new-tools-10-verdict — The reviewer's verdict
TRANSLATION:
- `sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта. Вердикт, пропускающий коммит, не перечисляет ни одного finding, кроме finding о комментариях (§s-7vpsdsy8dpqdy6r). Вердикт, отказывающий коммиту, перечисляет не менее одного finding, которое не о комментарии.
- Reason: вердикт, смысл которого `sheriff review` пришлось бы угадывать, например «проход», перечисляющий finding о коде, позволил бы `sheriff review` решать исход коммита вместо независимого reviewer (§s-m4h279nbaqkpa3t).
- Example: runner отвечает вердиктом, который пропускает коммит и перечисляет одно finding о коде. Такой ответ не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отказывает коммиту. Самая вероятная ошибка: пропустить коммит и отбросить finding, а это значит решить за reviewer, что он имел в виду.

TWO READINGS:
- "a pass that lists a finding on code": "pass" — вердикт, который пропускает (passing verdict), или «проход» (одна прогонка фазы, house term "pass"). Контекст favours вердикт.
- "The runner": не названо ранее в этом фрагменте. Вероятно, это программа, которая запускает reviewer и возвращает его ответ.

LANGUAGE:
- "such as a pass that lists a finding on code" → "such as a passing verdict that lists a finding on code" — "a pass" as a noun for a verdict is unclear, and it collides with the house term "pass".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes
TRANSLATION:
- `sheriff review` сообщает как предупреждение каждое finding независимого reviewer (§s-m4h279nbaqkpa3t) о комментарии, который коммит добавляет или изменяет (§s-td4e3rdga6azav9). Из-за такого finding он не отказывает ни одному коммиту. Каждое такое finding называет файл, строку и проблему.
- Reviewer судит комментарии, которые инструменты SpecSheriff пропускают, когда читают строку кода (§s-u6mj5yv8ngnz79v). Коммит добавляет или изменяет такой комментарий там, где он добавляет строку, содержащую часть комментария. Reviewer судит текст комментария, кроме его SpecTag (§s-8xw4mgvpexyvw5q), поскольку изменение SpecTag есть изменение кода (§s-9j2mmnuuwmx5ksn).
- Reviewer выносит это суждение при каждом коммите, который добавляет или изменяет такой комментарий, в том числе при коммите, который не меняет код. Кроме того, что `sheriff review` даёт reviewer при каждом review (§s-vp24dqydygztqbt), он даёт reviewer каждый символ (§s-kgbzk2ph9e6jfb4), тест или файл, связанный целиком, который содержит такой комментарий. Каждый даётся целиком, в том виде, в каком его оставляет коммит, вместе с файлом, строками и SpecTag, которые его связывают.
- Reviewer находит проблему с комментарием, когда выполняется любое из следующего:
- комментарий утверждает то, чего описываемый им код не делает;
- комментарий противоречит правилу, которое называет SpecTag на этом коде.
- Reason: комментарий, который больше не соответствует своему коду, вводит в заблуждение того, кто читает код следующим, а несоответствие может показать только чтение обоих. Комментарий не меняет того, что делает система, поэтому проблема с ним заслуживает предупреждения, но не отказанного коммита.
- Example: коммит меняет только комментарий над `roundPrice`, который теперь говорит, что функция округляет половины вверх, тогда как функция округляет их до ближайшего чётного числа. `sheriff review` сообщает finding reviewer как предупреждение и пропускает коммит. Самая вероятная ошибка: отказать коммиту, как при дефекте в коде.

TWO READINGS:
- "It refuses no commit because of such a finding": "It" — `sheriff review` или reviewer. Контекст favours `sheriff review`, потому что reviewer ничего не отклоняет.
- "this judgement": ссылается на суждение о комментариях из предыдущего абзаца, а не названо в том же абзаце. Это суждение о том, соответствует ли комментарий коду и правилам.
- "it gives the reviewer each symbol": "it" — `sheriff review` или reviewer. Контекст favours `sheriff review`.
- "only reading both can show the mismatch": (а) только чтение обоих (комментария и кода) может показать несоответствие, то есть иначе оно не видно; (б) «одно лишь чтение» показывает несоответствие, без запуска кода. Контекст favours (а).
- "which now says that the function rounds halves up": "which" — комментарий или `roundPrice`. Контекст ("says") favours комментарий.
- "such a comment where it adds a line that holds part of the comment": "it" — коммит. Прочтение favoured.

LANGUAGE:
- "leave out when they read a line of code" → "ignore when they read a line of code" — "leave out" means omit.
- "only reading both can show the mismatch" → "the mismatch can be found only by reading both" — the gerund subject with "only" reads as "mere reading".
- "worth a warning but not a refused commit" → "warrants a warning, but not a refusal of the commit" — "a refused commit" is unidiomatic here, and "worth" is colloquial.
- "as for a defect in the code" → "as it would for a defect in the code" — the elliptical "as for" reads as "regarding".
