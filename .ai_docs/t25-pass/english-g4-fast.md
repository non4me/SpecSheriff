### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-7pk89t8z6wymmj9 — How a project's own check is run
TRANSLATION: Как запускается собственная проверка проекта.

Если проверка, которую добавляют собственные guidelines проекта (§s-2fau85dfyyeq66m), не проходит, `sheriff validate` отклоняет изменение. Он только сообщает о провале там, где так сказано в правиле, перечисляющем эту проверку (§s-ujm7nfxkk9j3464). Отказ или сообщение называет проверку и показывает, что проверка вывела в стандартный вывод и в стандартный вывод ошибок. Если проверка ничего не вывела, показывается код завершения проверки.

`sheriff validate` запускает каждую такую проверку командой, которую для неё называет `sheriff.config.json` (§s-zefk589ykh37b8u). Проверка выполняется в каталоге, в котором работает `sheriff validate`. При коммите в этом каталоге лежит то, что содержит коммит (§s-477gtdrkw34dzxw). В стандартный ввод проверка получает модель спецификации в том виде, в котором её печатает `sheriff json` (§s-w6gybeqn2ttydqx). Проверка проходит, только если её процесс завершается с кодом ноль.

Правило, которое `sheriff.config.json` называет для проверки, перечисляет проверку через элемент своего `TextRule.list` (§s-eferktypcj7njt5), значение которого (§s-5hb9k2e34dgn284) равно имени проверки. О провале проверки только сообщается, если этот элемент является объектом, у которого свойство `onFailure` равно `reported`. Если в правиле нет элемента, значение которого равно имени проверки, `sheriff validate` отклоняет изменение и называет проверку и правило.

`sheriff validate` запускает собственные проверки проекта после того, как проверил файлы по схеме спецификации (§s-xzcw3hv4hmxz7h7), и до всех остальных своих проверок (§s-pcnyfp7gev7syax). Эти остальные проверки он выполняет независимо от того, что нашли собственные проверки проекта.

`sheriff validate` отклоняет изменение, если проверка добавляет, меняет или удаляет файл в каталоге, где она выполняется, кроме файла, который игнорирует git. Отказ называет проверку и каждый такой файл (§s-pcnyfp7gev7syax).

С параметром `--strict` `sheriff validate` передаёт каждой собственной проверке проекта модель, в которой спецификация одобрена и её флаг `strict` включён (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). Он делает это независимо от того, что содержат записи о статусе одобрения и о флаге. Остальные его проверки одинаковы с параметром и без него.

`sheriff validate` запускает собственные проверки проекта независимо от того, одобрена спецификация или это черновик (§s-ujm7nfxkk9j3464).

Причина: запущенная через `sheriff validate`, собственная проверка проекта выполняется везде, где выполняются проверки SpecSheriff guidelines, и читает те же файлы. Поэтому она обязывает каждого участника и не зависит от того, кто вспомнит её запустить (§s-2fau85dfyyeq66m).

Пример: в правиле, перечисляющем собственные проверки проекта, `TextRule.list.property` равно `name`, и один из элементов — `{"name": "no-secrets", "onFailure": "reported"}`. Проверка `no-secrets` находит токен в файле, печатает путь к файлу и завершается с кодом 1. `sheriff validate` сообщает о провале и показывает путь, а коммит проходит. Наиболее вероятная ошибка — отклонить коммит из-за того, что код завершения проверки не равен нулю.
TWO READINGS:
- "It only reports the failure where the rule that lists the check says so": (1) "только сообщает" — вместо отказа лишь сообщает о провале; (2) сообщает о провале только там, где так сказано в правиле. Контекст (предыдущее предложение об отказе и пример) подсказывает первое.
- "which at a commit holds what the commit contains": "which" — это каталог (вероятнее) или сам `sheriff validate`; вероятнее каталог.
- "whatever the entries for the approval status and the flag hold": "the entries" нигде выше не названы. Вероятно, это записи в `sheriff.config.json` (по другому узлу), но этого нет в тексте.
- "a model in which the specification is approved and its `strict` flag is on": "its" — это спецификации (вероятнее) или модели.
- "Its other checks are the same with or without the option.": "Its" — `sheriff validate` (вероятнее) или собственной проверки проекта. "are the same" не говорит, что именно одинаково: результат, набор проверок или способ запуска.
- "The check's failure is only reported where": "only reported" — только сообщается (не отклоняет) или сообщается только если. Контекст — первое.
- "finds a token in a file": "token" — токен доступа (по имени `no-secrets`) или лексема. Вероятнее токен доступа.
LANGUAGE:
- "the exit status zero" → "exit status 0" — с числом артикль и "the" не нужны.
- "exits with the status 1" → "exits with status 1" — лишний артикль.
- "lists the check by a member of its" → "lists the check as a member of its" — "by" здесь калька с «через элемент». Замена сохраняет смысл, если проверка идентифицируется элементом списка.
- "whose property `onFailure` is `reported`" → "whose `onFailure` property is `reported`" — обычный порядок слов.
- "every other check that it makes" → "every other check that it runs" — check не "делают", а выполняют (калька «делает проверки»).
- "It makes those other checks whatever the project's own checks find." → "It runs those other checks whatever the project's own checks find." — то же.
- "by the command that `sheriff.config.json` names for it" → "with the command that `sheriff.config.json` names for it" — "by" с командой неестественно; запуск выполняют "with" или "using".
- "which at a commit holds what the commit contains" → "which, when a commit is checked, holds what the commit contains" — "at a commit" — калька «при коммите». Замена сохраняет смысл.
- "hands each of the project's own checks a model" → "passes each of the project's own checks a model" — "hands" разговорное.
- "Run by `sheriff validate`, a project's own check runs" → "When `sheriff validate` runs it, a project's own check runs" — "Run by … runs" тавтология.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-nh8b2hjvzasdxmd — A location outside the specification
TRANSLATION: Расположение вне спецификации.

`sheriff binding` отклоняет каждое расположение узла (§s-kag2m9tzdnduxdx), записанное в файле, который репозиторий хранит вне `specs/` — папки, где лежат файлы спецификации (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). Отказ называет файл, строку и расположение и сообщает, что узел цитируется по его sid (§s-9spq78kdwsxr759).

`sheriff binding` принимает за расположение каждое из следующего, независимо от регистра букв:
- текст в форме расположения нумерованного узла (§s-ygg5kpcxgzq3m7w), например `base/3.2` или `_guidelines/spec/1.3.4`, есть ли сейчас узел по этому расположению или нет;
- расположение узла модели спецификации (§s-w6gybeqn2ttydqx), если оно содержит косую черту и не оканчивается числом, например `contracts/request` — расположение термина (§s-khqsmy6mhejkrhg).

Текст имеет форму расположения нумерованного узла, если он состоит из одного из следующего, затем косой черты и одного или нескольких чисел, разделённых точками:
- имя папки в `specs/`, где лежат файлы базовой спецификации (§s-5x737t9nee4zgaa);
- расположение первого узла верхнего уровня файла guidelines, описания инструментов SpecSheriff (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5).

Такой текст учитывается, только если стоит отдельно, а не как часть более длинного пути или имени: в `specs/tech/stack.json` `tech/stack` — часть пути и не расположение.

`sheriff binding` пропускает каждый файл, который собственные guidelines проекта указывают как фикстуру тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).

`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или это черновик (§s-u5hfbygfyqv4wmf).

Причина: расположение узла меняется при каждой перестановке в спецификации, а его sid не меняется никогда (§s-9spq78kdwsxr759). Вне спецификации расположение ничем не подкреплено, поэтому расположение, оставленное в файле, указывало бы на другой узел или ни на какой, и ни одна проверка этого не заметила бы.

Пример: руководство в `docs/` говорит «см. `base/3.2`». `sheriff binding` отклоняет эту строку и называет `base/3.2`, хотя сейчас узла по этому расположению нет. Наиболее вероятная ошибка — отклонять только расположение, по которому узел существует: тогда расположение, оставшееся от удалённого узла, пройдёт.
TWO READINGS:
- "A location outside the specification" (заголовок): расположение узла, указанное вне спецификации (по тексту узла), или место, лежащее вне спецификации. Верно первое.
- "one of the following, a slash and one or more numbers separated by dots": либо «один из пунктов списка, затем косая черта и числа» (по смыслу так), либо «один из пунктов, а также косая черта и числа» (в любом порядке). Синтаксис допускает оба; контекст и примеры — первое.
- "of a file of the guidelines, of the appendix of the tools or of the technical appendix": «первый узел верхнего уровня файла (guidelines | описание инструментов | техническое приложение)» (вероятнее) или три разных объекта с общим "first top-level node".
- "no link backs a location": что значит "backs", не ясно: «ничто не поддерживает актуальность расположения» (вероятно, имеется в виду, что reindex не обновляет расположение вне спецификации) или «ничто не подтверждает его».
LANGUAGE:
- "takes as a location each of the following, whatever the case of its letters" → "treats each of the following as a location, regardless of letter case" — калька «принимает за расположение»; «регистр букв» передаётся как "letter case".
- "holds a slash and ends in no number" → "contains a slash and does not end in a number" — "holds" и "ends in no" неестественны.
- "one of the following, a slash and one or more numbers separated by dots" → "one of the following, followed by a slash and one or more numbers separated by dots" — без "followed by" фраза читается как перечисление.
- "counts only on its own" → "is treated as a location only when it stands alone" — "counts" здесь калька «учитывается».
- "is no location" → "is not a location" — "no" перед существительным в такой роли ненормально.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-m8nmfsxkcfu7cjp — A citation outside the specification
TRANSLATION: Цитата вне спецификации.

`sheriff citations` отклоняет каждое из следующего в файлах, которые он читает (§s-e84nggntkrcyumq):
- слово, имеющее форму sid: `s-` и 15 символов из `23456789abcdefghjkmnpqrstuvwxyz` (§s-eferktypcj7njt5), если этот sid не называет ни один узел модели спецификации (§s-w6gybeqn2ttydqx);
- `§`, сразу за которым идёт цифра, например `§5.8`; это цитирует узел по номеру, а не по sid (§s-9spq78kdwsxr759).

Каждый отказ называет файл, строку и отклонённый текст.

`sheriff citations` читает следующие файлы:
- код системы (§s-hheus6f395ynqvc) и её тесты: файлы, подходящие под glob-шаблоны для кода или для тестов в `sheriff.config.json` (§s-zefk589ykh37b8u), и файлы, которые пишет `sheriff types` (§s-a8fn72xa782wvbk);
- код и тесты каждой собственной проверки и каждого генератора проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): файлы, подходящие под заданные для них в `sheriff.config.json` glob-шаблоны;
- документацию: каждый файл Markdown, который репозиторий хранит вне `specs/` (§s-zefk589ykh37b8u).

В читаемых файлах `sheriff citations` проверяет каждое слово, имеющее форму sid, кроме sid SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы или в её тестах. Проверка SpecTag, не называющего ни одного узла, проверяет sid такого SpecTag (§s-36x8amvunmv2kp5).

`sheriff citations` пропускает каждый файл, который собственные guidelines проекта указывают как фикстуру тестов проверки, читающей цитаты или расположения (§s-6hha5en226aj8hu).

`sheriff citations` выполняет эту проверку независимо от того, одобрена спецификация или это черновик (§s-e84nggntkrcyumq).

Причина: вне спецификации цитата ничем не подкреплена (§s-9spq78kdwsxr759). Поэтому процитированный sid, не называющий ни одного узла, или номер вместо sid вводил бы в заблуждение каждого читателя, и ни одна другая проверка этого не заметила бы.

Пример: руководство `docs/setup.md` цитирует `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, и `sheriff citations` его отклоняет, называя руководство, строку и sid. Наиболее вероятная ошибка — читать только файлы, которые меняет коммит: тогда цитата пройдёт, пока кто-нибудь не изменит руководство.
TWO READINGS:
- "The check of a SpecTag that names no node checks the sid of such a SpecTag": «the check of a SpecTag …» — это отдельная проверка (другой узел, §s-36x8…), и она проверяет sid; либо это проверка в самом `sheriff citations`. Контекст (ссылка на другой узел) — первое. "such a SpecTag" — SpecTag, который не называет узел (вероятнее), или любой SpecTag. Предложение читается как тавтология.
- "in the system's code or its tests": "its" — кода системы или самой системы; вероятно, системы.
- "no other check would notice it": "it" — вероятно, «заведомо неверная цитата» (sid без узла или номер).
- "`sheriff citations` refuses it": "it" — коммит (вероятнее) или файл-руководство.
- "no link backs a citation": см. выше — "backs" неясно.
LANGUAGE:
- "makes this check regardless of whether the specification is approved or a draft" → "performs this check regardless of whether the specification is approved or a draft" — check "делают" только в русском; по-английски "perform/run".
- "no link backs a citation" → "no link keeps a citation up to date" — "backs" не употребляется так; замена сохраняет смысл только если имелось в виду «поддерживает актуальность», в этом я не уверен.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-dbk2vyeg8z5jxna — Generated copies against the nodes
TRANSLATION: Сгенерированные копии против узлов.

`sheriff binding` отклоняет каждый файл, который пишет `sheriff types` (§s-a8fn72xa782wvbk), если текст файла в репозитории отличается от того, что написал бы `sheriff types`, не считая окончаний строк (§s-dwxjxb7rw4w5yn3). Он отклоняет также каждый такой файл, которого в репозитории нет. Каждый отказ называет файл и сообщает, что `sheriff types` пишет его заново.

`sheriff binding` генерирует в памяти, из одобренных формулировок узлов (§s-qyjw8xez6t6adc3), файлы, которые написал бы `sheriff types`, и ни одного из них не записывает.

`sheriff binding` отклоняет также каждое из следующего, что мешает `sheriff types` записать какой-либо файл (§s-a8fn72xa782wvbk):
- файл в списке файлов для типов и RuntimeChecks (§s-e877bnfa559tvk9, §s-pvzms7d8kxb8dk2), имя которого не оканчивается ни на `.ts`, ни на `.py`, ни на `.json`;
- файл в этом списке, путь которого ведёт за пределы репозитория;
- второе правило в разделе технического приложения (§s-tj38pvm38nepaf5) для стека, перечисляющее такие файлы;
- имя, которое нельзя сгенерировать (§s-suv42g8r3ra2h6b);
- путь, по которому `sheriff types` записал бы разные тексты, например путь, который два собственных генератора проекта (§s-km4x4s26kv7pjze) печатают с разным содержимым.

Отказ называет соответствующее правило, узел или путь.

`sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или это черновик (§s-dwxjxb7rw4w5yn3).

Причина: сгенерированный файл, хранимый в репозитории, — часть кода системы. Копия, правленая вручную или отставшая от своих узлов, реализовала бы то, что ни один ответственный не одобрил (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

Пример: RecordType переформулирован и стал черновиком, а сгенерированные из него типы остаются такими, как их даёт его последняя одобренная формулировка. Коммит правит `src/types.ts` вручную под новую формулировку. `sheriff binding` отклоняет `src/types.ts`, так как текст отличается от того, что даёт последняя одобренная формулировка. Наиболее вероятная ошибка — генерировать типы по формулировке-черновику: тогда правленый файл пройдёт.
TWO READINGS:
- "says that `sheriff types` writes it anew": (1) констатирует факт: `sheriff types` пишет его заново; (2) предписывает: чтобы исправить, запусти `sheriff types`. По контексту (отказ) вероятнее (2), но текст говорит (1).
- "which keeps `sheriff types` from writing any file": "which" — каждое из перечисленных условий (вероятнее) или сам отказ.
- "for the stack that lists such files": «правило для стека, которое перечисляет такие файлы» (вероятнее), «раздел, перечисляющий такие файлы» или «стек, который перечисляет такие файлы».
- "a name that cannot be generated": чьё имя (типа, файла, RuntimeCheck), не сказано; либо имя, из которого нельзя получить допустимый идентификатор, либо имя, для которого не может быть сгенерирован код.
- "The refusal names the rule, the node or the path concerned.": называет все три или то из них, которое касается ошибки (вероятнее).
LANGUAGE:
- "Generated copies against the nodes" → "Generated copies checked against their nodes" — "against" без причастия — калька «сверка с узлами».
- "whose name ends in none of `.ts`, `.py` and `.json`" → "whose name ends in none of `.ts`, `.py` or `.json`" — после "none of" союз "or".
- "left behind its nodes" → "left behind by its nodes" — переходная конструкция в тексте неверная; замена сохраняет смысл (копия отстала от узлов).
- "makes this check regardless of whether" → "performs this check regardless of whether" — калька «делает проверку».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-txbwsthdqhvyzd2 — An approved rule whose tests or code lag behind it
TRANSLATION: Одобренное правило, чьи тесты или код отстают от него.

`sheriff commit-message` отклоняет коммит, после которого тесты или код одобренного правила отстают от этого правила (§s-ddd2e96uke4y83j). Коммит проходит, если в его сообщении заявлено, что реализации правила не нужно изменение (§s-7gab4ptjt2khfr5). Отказ называет правило по его файлу, sid и расположению (§s-kag2m9tzdnduxdx). Он сообщает, отстают ли тесты правила, его код или и то и другое, и называет trailer, которым сообщение коммита может сделать это заявление.

Тесты одобренного правила отстают от него, если выполнено всё следующее:
- коммит меняет одобренную формулировку правила;
- тест кода системы (§s-hheus6f395ynqvc) связан с правилом до коммита (§s-zrsc6asgmhv8tnc);
- коммит не добавляет, не меняет и не удаляет ни одного теста, связанного с правилом до или после коммита (§s-2x58az67bm6cxq2).

Код одобренного правила отстаёт от него, если выполнено всё следующее:
- коммит меняет одобренную формулировку правила либо добавляет, меняет или удаляет тест, связанный с правилом до или после коммита;
- код системы, кроме тестов, связан с правилом до коммита (§s-kgbzk2ph9e6jfb4);
- коммит не добавляет, не меняет и не удаляет такого кода, связанного с правилом до или после коммита.

Код или тест связан с правилом до коммита, если он связан в родителе коммита. Он связан после коммита, если связан в том виде, в каком коммит оставляет код и тесты. Для коммита слияния родитель — его первый родитель.

Коммит меняет одобренную формулировку правила, если выполнено оба условия:
- правило одобрено в том виде, в каком его оставляет коммит;
- его формулировка тогда отличается от его последней одобренной формулировки в родителе коммита (§s-a8fn72xa782wvbk).

Для каждого одобренного правила `sheriff commit-message` сравнивает `fingerprint` формулировки правила в том виде, в каком её оставляет коммит, с `fingerprint`, который записывает последнее одобрение правила в родителе коммита (§s-v4qus7raqnwzneb). Одобрения родителя коммита он читает в той форме, в которую их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).

`sheriff commit-message` проверяет каждое одобренное правило в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp).

`sheriff commit-message` выполняет эту проверку, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Если коммит оставляет спецификацию черновиком, проверка проходит и ничего не сообщает.

Причина: если тесты и код не следуют новой формулировке правила в том же коммите, одобренное правило попадает в историю с тестами и кодом, написанными под прежнюю формулировку (§s-ddd2e96uke4y83j). Заявить, что им не нужно изменение, может только сообщение коммита, поэтому проверку выполняет `sheriff commit-message`, читающий сообщение.

Пример: спецификация одобрена. Более ранний коммит переформулировал правило R, пока оно было черновиком. Следующий коммит добавляет одобрение новой формулировки и меняет код R, но ни одного из его тестов. В сообщении нет trailer с R. `sheriff commit-message` отклоняет коммит и сообщает, что тесты R отстают. Наиболее вероятная ошибка — сравнивать формулировку R с её формулировкой в родителе коммита. Та формулировка уже новая, поэтому отставание проходит.
TWO READINGS:
- "The commit passes where its message states that the rule's implementation needs no change": «its» — коммита (вероятнее). «the rule's implementation» — тесты и код вместе. Заявление касается этого правила, а не любого.
- "its wording then differs from its last approved wording in the commit's parent": "then" — после коммита; "in the commit's parent" относится либо к последней одобренной формулировке (вероятнее), либо к формулировке "then".
- "while it was a draft": "it" — правило R (вероятнее) или спецификация; предыдущее предложение «The specification is approved» делает второе грамматически допустимым.
- "so the lag passes": «отставание проходит» — отставание остаётся незамеченным (вероятно); «passes» — не «проходит проверку» в прямом смысле, поскольку проходит коммит.
- "the node on the form of a SpecTag": узел, который описывает формат (синтаксис) SpecTag (вероятнее), или узел, перечисляющий типы по форме SpecTag.
- "Unless its tests and code follow its new wording": "its" — правила.
LANGUAGE:
- "the node on the form of a SpecTag" → "the node that defines the form of a SpecTag" — "on" в значении «о» (калька с русского). Уверенности в точной замене нет: возможно "the node that sets out the syntax of a SpecTag".
- "A rule here is a node of one of the kinds" → "In this check, a rule is a node of one of the kinds" — "here" вместо привязки к проверке — калька «правило здесь».
- "so the lag passes" → "so the lag goes unnoticed" — "passes" для «отставания» не употребляется; замена сохраняет смысл, если имелось в виду «не замечено».
- "makes this check only where" → "performs this check only where" и "makes the check" → "performs the check" — калька «делает проверку».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-jgejd5rpd9d43pd — An approved rule without code or a test
TRANSLATION: Одобренное правило без кода или теста.

`sheriff binding` отклоняет коммит, который включает одобренное правило, которое должен реализовывать код системы (§s-hheus6f395ynqvc, §s-6fw72j65jkqrfpf), если у этого правила нет чего-либо из следующего (§s-c4y63t285gg7jz7):
- код системы, кроме тестов, связанный с правилом (§s-kgbzk2ph9e6jfb4);
- тест кода системы, связанный с правилом (§s-zrsc6asgmhv8tnc), не помеченный ни как пропускаемый, ни как ожидаемо падающий.

Отказ называет правило по его файлу, sid и расположению (§s-kag2m9tzdnduxdx) и сообщает, чего правилу не хватает: кода, теста или обоего.

Код или тест считается связанным с одобренным правилом так, как это говорит правило о реализации одобренного правила, включая цепочку связей `implements` (§s-6fw72j65jkqrfpf, §s-sn6au3vcr9uy5pm).

Коммит включает одобренное правило, если выполняет что-либо из следующего (§s-c4y63t285gg7jz7):
- добавляет одобрение правила (§s-75ue25v6r23jkk8);
- добавляет, меняет или удаляет (§s-2x58az67bm6cxq2) код или тест, связанный с правилом в родителе коммита или в том виде, в каком его оставляет коммит;
- удаляет связь `implements`, через которую в родителе коммита код или тест был связан с правилом.

`sheriff binding` проверяет одобренные правила в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Правило здесь — узел одного из типов, которые перечисляет узел о форме SpecTag (§s-5z5gnu7pahr82xp). Из этих правил он пропускает следующие, которые код системы не обязан реализовывать (§s-6fw72j65jkqrfpf):
- каждый узел собственных guidelines проекта, хранимый в `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);
- в репозитории, где пишутся SpecSheriff guidelines, каждый узел этих guidelines, их расширений и описания инструментов, все хранятся в `specs/_guidelines/`;
- каждый узел в `specs/tech/debt.json`, где лежат описания недостатков технического долга (§s-2r7k2aeyusgy6fw);
- каждое правило, до которого доходит связь `exempts`, прямо или через раздел над правилом на любой глубине, если узел, объявляющий связь, одобрен (§s-gf6n8ge4mke3pr2).

Тест помечен как пропускаемый или как ожидаемо падающий меткой, вызовом или параметром, которые описание его языка называет для этой цели (§s-33fw3ga4ctd94dq). В TypeScript и JavaScript к ним относятся `test.skip` и `test.todo`, в Python — `pytest.mark.skip`, `pytest.mark.skipif` и `pytest.mark.xfail`.

`sheriff binding` выполняет эту проверку, только если коммит оставляет спецификацию одобренной (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Если коммит оставляет спецификацию черновиком, проверка проходит и ничего не сообщает.

Причина: будь одобренное правило закоммичено без кода или без теста, который запуск может провалить, спецификация могла бы незаметно утверждать то, чего система не делает (§s-c4y63t285gg7jz7).

Пример: спецификация одобрена. Коммит добавляет одобрение правила R, код которого существует, а единственный тест с SpecTag R помечен `pytest.mark.skip`. `sheriff binding` отклоняет коммит, называя R и сообщая, что тут не хватает теста. Наиболее вероятная ошибка — засчитать пропускаемый тест, который не может провалить ни один запуск тестов.
TWO READINGS:
- "each rule that an `exempts` link reaches, directly or through a section above the rule at any depth": «at any depth» относится к разделу над правилом (вероятнее) или к самому достижению. «reaches» — связь указывает на правило или освобождает его; вероятно, второе.
- "that the description of its language names for that purpose": «its» — теста (вероятнее) или метки; «the description» — описание языка где-то в описании инструментов, в этом тексте не назван.
- "which the system's code need not implement": «which» — «те из них, которые» (вероятнее) или все перечисленные.
- "In TypeScript and JavaScript these include": «these» — метки, вызовы или параметры (вероятно, все три типа).
- "lacks either of the following": «either» — что-либо одно из двух (вероятно; затем «или то и другое»).
- "the node on the form of a SpecTag": см. выше.
- "A commit adds the approval of rule R, whose code exists": «whose code exists» — у R есть код (вероятнее).
LANGUAGE:
- "A rule here is a node of one of the kinds" → "In this check, a rule is a node of one of the kinds" — калька «правило здесь».
- "the node on the form of a SpecTag" → "the node that defines the form of a SpecTag" — "on" в значении «о»; возможно "the node that sets out the syntax of a SpecTag".
- "a test that a run can fail" → "a test that can fail when the tests are run" — "a run can fail" странно; замена сохраняет смысл.
- "reaches" → "applies to" — связь не «достигает» правила; не уверен, что это точный смысл.
- "makes this check only where" → "performs this check only where" — калька «делает проверку».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-qqs2svksmjct753 — The nodes that a commit message must name
TRANSLATION: Узлы, которые должно называть сообщение коммита.

`sheriff commit-message` принимает сообщение коммита, только если в нём указан sid каждого узла, с которым SpecTag связывает код, добавляемый или меняемый коммитом (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). Любое другое сообщение он отклоняет, называя каждый узел, чьего sid нет в сообщении, по его файлу, sid и расположению (§s-kag2m9tzdnduxdx).

В этой проверке код означает символы (§s-kgbzk2ph9e6jfb4) и файлы, связанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), которые коммит добавляет или меняет в коде системы (§s-hheus6f395ynqvc), кроме тестов. `sheriff commit-message` читает их SpecTag в том виде, в каком их оставляет коммит.

Сообщение указывает sid узла, если sid встречается в сообщении где угодно. Строки, начинающиеся с `#`, исключаются, так как git считает их комментариями.

`sheriff commit-message` выполняет эту проверку независимо от того, одобрена спецификация или это черновик (§s-7sk3s553ukzwtbm).

Причина: сообщение коммита фиксирует для того, кто читает историю, какие узлы реализует изменённый код (§s-ef93u6cnbs2sevr), а SpecTag на этом коде называют именно эти узлы.

Пример: коммит меняет только `src/ui/texts.json`, который файл привязок связывает с правилом R, и в его сообщении нет sid. `sheriff commit-message` отклоняет сообщение и называет R. Наиболее вероятная ошибка — читать только SpecTag над символами: тогда сообщение пройдёт.
TWO READINGS:
- "reads their SpecTags as the commit leaves them": «them» (второе) — SpecTag (вероятнее: SpecTag в том виде, в каком их оставляет коммит) или символы и файлы.
- "the bindings file": файл привязок — не определён ни в этом тексте, ни выше; вероятнее, файл, который связывает целый файл с узлом без SpecTag в нём.
- "naming each node whose sid the message lacks by its file, its sid and its location": «by» — называет узел по этим трём признакам (вероятнее); «its» — узла.
- "which nodes the changed code implements, and the SpecTags on that code name exactly those nodes": «exactly those» — SpecTag называют ровно те же узлы (вероятнее), а не «только эти».
LANGUAGE:
- "gives the sid of each node" → "contains the sid of each node" — "give" не употребляется так; «A message gives a node's sid where…» → "A message contains a node's sid where the sid appears anywhere in the message" (см. также ниже).
- "A message gives a node's sid where the sid appears anywhere in the message." → "A message contains a node's sid when the sid appears anywhere in the message." — "gives" странно; "where" допустимо.
- "makes this check regardless of whether" → "performs this check regardless of whether" — калька «делает проверку».
- "In this check, the code means" → "In this check, code means" — артикль перед "code" в общем смысле лишний; замена сохраняет смысл.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-b6qdtghnyha3fhk — The tests, run before a push
TRANSLATION: Тесты, запускаемые перед push.

Хук pre-push (§s-477gtdrkw34dzxw) отклоняет push, если тесты кода системы и собственных проверок и генераторов проекта не проходят (§s-aufnqn6t7y2me7a). Он запускает их командой, которую `sheriff.config.json` задаёт как `testCommand` (§s-zefk589ykh37b8u). Тесты не проходят, если эта команда завершается с кодом, отличным от нуля. Если хук должен запустить тесты, а `sheriff.config.json` не задаёт `testCommand`, он отклоняет push и сообщает об этом.

Хук pre-push запускает тесты, только если push создаёт или обновляет ref, чей коммит удовлетворяет обоим условиям:
- коммит оставляет спецификацию одобренной: последняя запись о статусе одобрения спецификации в `sheriff.config.json` этого коммита одобряет её (§s-qzthyh7yqvfhsa2);
- собственные guidelines проекта (§s-u7tw6m8npxmv5tu), в том виде, в каком коммит хранит их в `project.json`, называют push моментом, когда запускаются тесты (§s-x8uzc8z44pwtd3h).

Коммит ref — это коммит, который ref называет, прямо или через тег. Собственные guidelines проекта называют push моментом запуска тестов, если правило, уточняющее правило о том, когда тесты должны проходить, перечисляет `push`. Правило перечисляет `push`, если в его `TextRule.list` (§s-eferktypcj7njt5) есть элемент, значение которого равно `push` (§s-5hb9k2e34dgn284).

Если push создаёт или обновляет ref, а хук pre-push не запускает ни одного теста, хук сообщает об этом и называет причину: спецификация — черновик, собственные guidelines проекта не называют push моментом запуска тестов или и то и другое.

Причина: проект, чьи собственные guidelines называют push моментом запуска тестов, полагается на хук pre-push. Хук не даёт изменению, чьи тесты не проходят, попасть в общую ветку проекта (§s-x8uzc8z44pwtd3h).

Пример: собственные guidelines проекта говорят, что тесты запускаются на общем сервере перед слиянием, и ни одно их правило не перечисляет `push`. Спецификация одобрена, и `sheriff.config.json` задаёт `testCommand`. Разработчик делает push ветки, хук pre-push не запускает тестов и сообщает, что собственные guidelines проекта не называют push. Наиболее вероятная ошибка — запустить тесты на том основании, что `testCommand` задан.
TWO READINGS:
- "the latest entry for the specification's approval status in that commit's `sheriff.config.json` approves it": «approves it» — запись устанавливает статус «одобрена» (вероятнее) либо запись «одобряет» как действие ответственного; «it» — спецификацию.
- "The tests, run before a push" (заголовок): «тесты, которые запускаются перед push» (вероятнее) или «тесты, запущенные до push» как результат.
- "and says that the project's own guidelines do not name a push" (в примере): фраза неполная; вероятно, «не называют push моментом запуска тестов».
- "a push as the moment at which the tests run": «момент» — момент push как событие.
LANGUAGE:
- "The tests, run before a push" → "Running the tests before a push" — запятая и причастие в заголовке выглядят как калька; название-фраза, а не существительное с причастием. Замена сохраняет смысл.
- "It runs them by the command that `sheriff.config.json` gives as its `testCommand`" → "It runs them with the command that `sheriff.config.json` sets as its `testCommand`" — "by the command" и "gives as" калькируют «командой … задаёт».
- "approves it" → "sets it to approved" — "approves" по отношению к записи в файле может значить действие ответственного. Замена сохраняет смысл только если запись просто хранит статус.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group4.md · s-q:proposal:new-tools-1-project-g4 — What the SpecSheriff tools read in the project's own guidelines
(Heading as it appears in the file: proposal:new-tools-1-project-g4)

TRANSLATION: Что инструменты SpecSheriff читают в собственных guidelines проекта.

Предложение: полная новая формулировка узла, согласованного под `new:tools-1-project`. От неё отличаются только пункт о том, где запускаются тесты, предложение после первого списка и слова «the SpecSheriff tools» в причине.

Инструменты SpecSheriff читают следующее в собственных guidelines проекта (§s-u7tw6m8npxmv5tu), хранимых в `project.json` (§s-zefk589ykh37b8u):
- ответственных за спецификацию (§s-6sk8uet75dmq5qz): тех, кого называет узел верхнего уровня `project.json`;
- если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), уровни доменов: элементы `TextRule.list` правила, уточняющего правило об уровне домена (§s-nkyty4dy9x2v2a4);
- фикстуры тестов: файлы, подходящие под glob-шаблоны в `TextRule.list` каждого правила, уточняющего правило о таких фикстурах (§s-6hha5en226aj8hu);
- собственные типы узлов проекта: элементы `TextRule.list` правила, уточняющего правило о таких типах (§s-vsh384ybt4w25a2);
- собственные проверки и генераторы проекта (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): элементы `TextRule.list` правила, которое `sheriff.config.json` называет для каждой такой проверки или генератора;
- где запускаются тесты: элементы `TextRule.list` правила, уточняющего правило о том, когда тесты должны проходить (§s-x8uzc8z44pwtd3h);
- собственные инструменты проекта, переписывающие файлы: элементы `TextRule.list` правила, уточняющего правило о порядке запуска инструментов и проверок (§s-pcnyfp7gev7syax), где каждый элемент — путь к инструменту относительно `.githooks/`, например `pre-commit.d/format` (§s-n4m5zvh96yb299p);
- файлы, кроме файлов JSON, формат которых не допускает комментариев: те, что подходят под glob-шаблоны в `TextRule.list` правила, уточняющего правило о том, как код привязывается к своим правилам (§s-kgbzk2ph9e6jfb4);
- связи `exempts` узлов `project.json` (§s-gf6n8ge4mke3pr2).

Если пункт выше ссылается на правило, уточняющее другое правило, инструменты SpecSheriff находят это правило по его связи `refines` с другим правилом и читают:
- ничего, если ни одно правило `project.json` не уточняет это другое правило;
- иначе элементы каждого правила `project.json`, уточняющего это другое правило, в том порядке, в каком эти правила там идут.

Причина: инструментам SpecSheriff нужны значения, которые задают только собственные guidelines проекта, например кто отвечает за спецификацию (§s-m42rsngtayk9g3g). Проект даёт своим правилам любые заголовки и располагает правила как хочет, поэтому инструменты SpecSheriff находят каждое значение в узле верхнего уровня `project.json`, по связи или по настройке в `sheriff.config.json`.
TWO READINGS:
- "the files other than JSON files whose format allows no comments": «whose format» — формат файлов, не являющихся JSON (вероятнее), или формат JSON-файлов («JSON не допускает комментариев»). Второе читается как «файлы, отличные от JSON-файлов, формат которых…».
- "the node agreed under `new:tools-1-project`": «agreed under» — согласованный под ключом (вероятнее) или в рамках задачи с этим именем.
- "differ from it": «it» — узел, согласованный под этим ключом (вероятнее).
- "the sentence after the first list": первый список — перечень чтения выше; предложение — «Where an item above refers…» — вероятно.
- "find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`": три способа (узел верхнего уровня, связь, настройка) — вероятнее; либо «в узле верхнего уровня — по связи либо по настройке».
- "refers to the rule that refines another rule": «the rule» — единственное правило (по артиклю), но дальше «every rule … that refines» допускает несколько правил.
- "in the order in which those rules appear there": «there» — в `project.json` (вероятнее).
LANGUAGE:
- "refers to the rule that refines another rule" → "refers to a rule that refines another rule" — определённый артикль подразумевает одно правило, тогда как ниже сказано "every rule".
- "A project gives its own rules any titles" → "A project may give its own rules any titles it likes" — "gives … any titles" звучит как калька; замена сохраняет смысл (свобода выбора заголовков).
- "by a link, or by a setting in `sheriff.config.json`" → "through a link, or through a setting in `sheriff.config.json`" — "by" с «связью» неестественно; параллелизм в перечислении нарушен.
