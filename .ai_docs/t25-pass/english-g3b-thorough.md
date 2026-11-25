### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · s-j9r8z4xdrfkfs47
TRANSLATION: после коммита первые записи (entries) для этой настройки — это все те записи, которые содержит для неё родитель коммита, без изменений и в том же порядке;
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · new:tools-7-1-extensions-delivered
TRANSLATION:
1. К ним также относится `sheriff guard`, который проверяет правку агента до того, как она сделана (§s-st6td4mua9uqt9z).
2. Наиболее вероятная ошибка — составить схему без недостающего расширения guidelines: тогда команда примет на этой машине узел спецификации, который проверки этого расширения отклонили бы.
TWO READINGS:
- "They also include": (а) «команды, читающие выбранные расширения, включают также `sheriff guard`»; (б) «`sheriff validate`, `sheriff binding` и `sheriff reindex` включают также `sheriff guard`», потому что это ближайшее множественное число в предыдущем предложении. Контекст указывает на (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · s-2x58az67bm6cxq2
TRANSLATION:
1. Коммит изменяет символ (§s-kgbzk2ph9e6jfb4) или тест (§s-zrsc6asgmhv8tnc) там, где одна из его строк изменяет код (§s-u6mj5yv8ngnz79v).
2. Тест также является тем же самым там, где коммит изменяет только его имя вне его SpecTag (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn). (Примечание в скобках: предложение рецензента, к которому добавлена ссылка на SpecTag при первом его упоминании.)
3. Коммит изменяет файл, связанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), там, где он изменяет что-либо в тексте файла, включая комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).
4. Единое определение этих изменений позволяет каждой проверке оценивать одни и те же.
TWO READINGS:
- "one of its lines": (а) «одна из строк символа или теста»; (б) «одна из строк коммита», то есть строка, которую коммит добавляет или удаляет. Следующее предложение ("A symbol's lines run from…") указывает на (а), но подлежащее предложения — коммит, поэтому (б) читается первым.
- "is also the same": (а) «тест родителя и тест после коммита считаются одним и тем же тестом»; (б) «тест остаётся неизменённым». То, с чем тест «тот же», в этом предложении не названо. Предыдущее предложение ("is the same as the one of the same name") указывает на (а).
- "changes only its name outside its SpecTag": (а) «коммит не меняет в тесте ничего, кроме имени»; (б) «из имени коммит меняет только часть вне SpecTag, а тело теста тоже может меняться». Контекст не выбирает между ними.
- "those changes": существительное "changes" раньше не названо. Скорее всего, оно означает «то, что коммит добавляет, изменяет или удаляет» из предыдущего предложения, то есть включает добавления и удаления, а не только изменения.
LANGUAGE:
- "is also the same where" → "also counts as the same test where" — у "the same" нет дополнения, и читатель не знает, с чем тест совпадает. Замена сохраняет смысл только при прочтении (а).
- "lets every check judge the same ones" → "lets every check judge the same changes" — "the same ones" в конце предложения звучит неестественно.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · new:tools-7-2-changed-line
TRANSLATION: Чтение строк как токенов их языка исключает то, что не может повлиять на то, что делает код, например комментарии и пробельные символы между токенами.
TWO READINGS: none
LANGUAGE:
- "the tokens of their language" → "the tokens of the file's language" — язык есть у файла, а не у строк; текст узла сам пишет "the tokens of the file's language".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · new:tools-7-2-draft-rule
TRANSLATION: Он (`sheriff binding`) берёт статус одобрения правила из спецификации в том виде, в каком её оставляет коммит.
TWO READINGS:
- "the rule's": правило в этом абзаце раньше не названо. Скорее всего, это черновое правило, которое называет SpecTag (первый абзац узла). Возможно и прочтение «любое правило, названное в SpecTag, прочитанном в родителе или после коммита».
- "as the commit leaves it": (а) «спецификация, какой её оставляет коммит»; (б) «статус одобрения, каким его оставляет коммит». На практике это одно и то же; грамматика указывает на (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · s-t383grkn3q68dpf
TRANSLATION: Наиболее вероятная ошибка — учитывать только SpecTag, размещённые над символами: тогда `sheriff binding` отклонил бы этот `meta.code` за то, что в нём назван `src/texts.json`.
TWO READINGS:
- "count only the SpecTags": (а) «учитывать только SpecTag над символами»; (б) «подсчитывать только SpecTag над символами». Контекст указывает на (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · s-5hb9k2e34dgn284
TRANSLATION:
1. Там, где файл, место или символ, на которые указывает список, не удаётся найти, отказ называет его.
2. Для элемента списка, который является объектом, значением служит значение того его свойства, которое названо в `TextRule.list.property`.
3. Сравнение их при каждом коммите удерживает значения, которые принимает система, в соответствии с теми, которые указывает правило.
4. Его `TextRule.list.jsonSchema` указывает на `#/properties/state` в `schema/request.schema.json`, и схема в этом месте содержит `"enum": ["open", "done", "cancelled", "held"]`.
TWO READINGS:
- "the refusal names it": (а) «отказ называет то, что не найдено: файл, место или символ»; (б) «отказ называет список». Контекст указывает на (а).
- "the place": слово общего значения без объекта: «место в схеме» (JSON-указатель) или «место в файле». Первый пункт списка в узле ("the schema at the place to which that property points") указывает на место в схеме.
- "Comparing them": (а) «сравнение списка правила со схемой или кодом»; (б) «сравнение значений». Контекст указывает на (а).
LANGUAGE:
- "the value of its property that `TextRule.list.property` names" → "the value of the property named by `TextRule.list.property`" — сочетание притяжательного "its" с ограничительным придаточным ("its property that … names") носитель не напишет; принадлежность свойства элементу списка понятна из "For a member that is an object".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · new:tools-7-2-own-kinds
TRANSLATION:
1. Сравнение этих двух удерживает каждый тип узла и то, требуется ли имплементация его узлов в коде, в соответствии с тем, что одобрил ответственный.
2. Тогда правило говорило бы, что узлы типа `procedure` не требуют кода, тогда как схема говорит, что требуют.
TWO READINGS:
- "the two": (а) «расширение схемы и правило»; (б) «объявление типа и его перечисление в правиле». Смысл близок; контекст указывает на (а).
- "keeps each kind, and whether its nodes require an implementation in code, in line with": до слов "in line with" читается как «сохраняет каждый тип узла»; только конец предложения даёт «удерживает в соответствии».
- "The rule would then say": (а) буквально: «при такой ошибке правило стало бы говорить, что узлы не требуют кода», то есть слова правила — следствие ошибки; (б) «при такой ошибке коммит прошёл бы, хотя правило говорит одно, а схема другое». Текст говорит (а). Пример требует (б), потому что правило говорит это и без ошибки.
- "the schema": (а) «расширение схемы проекта»; (б) «базовая схема». Пример указывает на (а).
LANGUAGE:
- "keeps each kind, and whether its nodes require an implementation in code, in line with" → "keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with" — существительное и придаточное с "whether" соединены как однородные дополнения, и читатель спотыкается. Не уверен, что замена сохраняет смысл точно: она вводит слово "declaration".
- "The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do." → "The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do." — сослагательное "would then say" относит следствие ошибки к словам правила, а не к пропущенному расхождению. Замена сохраняет смысл только при прочтении (б).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · s-cdachayybfvg4na
TRANSLATION: Значение элемента списка, который является объектом, — это значение того его свойства, которое названо в `TextRule.list.property`.
TWO READINGS: none
LANGUAGE:
- "the value of its property that `TextRule.list.property` names" → "the value of the property of that member named by `TextRule.list.property`" — притяжательное "its" с ограничительным придаточным ("its property that … names") носитель не напишет.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed.md · proposal:s-9j2mmnuuwmx5ksn
TRANSLATION: Переименование теста или изменение формулировки комментариев в тестах или в коде, связанном SpecTag перед каждым символом (§s-kgbzk2ph9e6jfb4), не изменяет ни тест, ни код, пока SpecTag остаётся прежним.
TWO READINGS:
- "bound by a SpecTag before each symbol": (а) «код, который связан SpecTag, стоящими перед каждым символом», в отличие от файла, связанного целиком; (б) «комментарии, стоящие перед каждым символом»; (в) определение относится и к тестам: «тесты или код, связанные SpecTag перед каждым символом». Противопоставление файлу, связанному целиком, в узле s-2x58az67bm6cxq2 указывает на (а).
- "the SpecTag stays the same": не сказано, чей SpecTag: теста, символа, над которым стоит комментарий, или любой SpecTag в затронутом месте. Скорее всего, это SpecTag того теста или символа, который затронут правкой.
- "changes neither the test nor the code": "the test" отсылает к "a test" из "Renaming a test", но между ними стоит "the tests" во множественном числе. Неясно, идёт ли речь о переименованном тесте или о тесте, в котором изменён комментарий. Скорее всего, об обоих.
LANGUAGE:
- "the comments in the tests or in code" → "the comments in a test or in code" — число и артикль расходятся с "Renaming a test" и "neither the test".
- "in code bound by a SpecTag before each symbol" → "in code whose symbols are each bound by a SpecTag placed before the symbol" — один SpecTag ("a SpecTag") не может стоять перед каждым символом ("each symbol"). Замена сохраняет смысл только при прочтении (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3.md · proposal:s-9j2mmnuuwmx5ksn (the section in full; the second sentence of the text is reported above)
TRANSLATION:
Заголовок: Изменение SpecTag.
Текст, первое предложение: Изменение SpecTag считается изменением теста или кода, который этот SpecTag связывает с узлом.
Обоснование: Тесты и код, которые изменяются, заново проверяются на соответствие правилам, названным в их SpecTag. Это правило проводит границу между правкой теста или кода, которая может повлиять на эту проверку, и правкой, которая не может.
TWO READINGS:
- "an edit to a test or code that can affect that check": (а) «правка, которая может повлиять на проверку»; (б) «тест или код, которые могут повлиять на проверку». Слово "one" в конце ("and one that cannot") указывает на (а).
- "This rule": (а) «этот узел»; (б) одно из "the rules their SpecTags name" из предыдущего предложения. Контекст указывает на (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3.md · proposal:s-hhnahzmhahf8jht (the section in full)
TRANSLATION:
Заголовок: Как объявляется и проверяется собственный тип узлов проекта.
Текст: Проект добавляет новый тип узла в свою JSON Schema, в поле `kinds` (§s-xm8rz4uupb73gu5). Через свой `schema` новый тип узла может добавлять собственные поля сверх тех, которые схема SpecSheriff guidelines задаёт для каждого узла. `needsCode` типа узла говорит, требуется ли имплементация его узлов в коде.
Правило в собственных guidelines проекта уточняет правило о собственных типах узлов проекта (§s-vsh384ybt4w25a2). `TextRule.list.members` этого правила содержит каждый добавленный тип узла с его `needsCode`. `TextRule.list.property` этого правила называет ключ, в котором находится имя типа узла.
При каждом коммите проверка удостоверяется, что JSON Schema и собственные guidelines проекта согласуются в имени и `needsCode` каждого нового типа узла (§s-jau82aq9juv9zzh).
Обоснование: Только проект знает, выполняются ли узлы добавленного им типа кодом, инструментами или людьми. Расширение схемы никто не одобряет, поэтому эти типы перечисляет правило.
TWO READINGS:
- "A project adds a new kind of node to its JSON Schema": (а) «каждый проект добавляет новый тип узла»; (б) «проект, которому нужен новый тип узла, добавляет его именно туда». Контекст указывает на (б).
- "its JSON Schema": (а) «расширение схемы проекта», которое обоснование называет "an extension of the schema"; (б) «схема проекта в целом» или стандарт JSON Schema. Текст нигде не говорит, что "its JSON Schema" и "an extension of the schema" — одно и то же. Контекст указывает на (а).
- "the JSON Schema and the project's own guidelines agree": то же, что выше: определённый артикль читается как стандарт JSON Schema или как единственная схема, а не как расширение схемы проекта.
- "may add fields of its own": (а) разрешение: «типу разрешено добавлять поля»; (б) возможность: «тип, возможно, добавляет поля». Контекст указывает на (а).
- "a new kind of node may add": (а) «любой собственный тип узлов проекта»; (б) «тип, который добавляется сейчас». Контекст указывает на (а).
- "each new kind of node": (а) «каждый собственный тип узлов проекта, когда бы он ни был добавлен»; (б) «каждый тип, добавленный данным коммитом». Слова "At each commit" подталкивают к (б); узел new:tools-7-2-own-kinds указывает на (а).
- "A rule in the project's own guidelines refines": (а) «ровно одно правило»; (б) «хотя бы одно правило». Узел new:tools-7-2-own-kinds говорит о "the rules … that refine", то есть о нескольких.
- "That rule's `TextRule.list.members`": (а) «уточняющее правило в собственных guidelines проекта»; (б) «правило о собственных типах узлов проекта», названное в предыдущем предложении последним. Контекст указывает на (а).
- "That rule's `TextRule.list.property`": те же два прочтения, что и в предыдущей строке; контекст указывает на (а).
- "so a rule lists those kinds": причинная связь неполна. Читатель должен сам достроить «правило, которое одобряет ответственный»; без этого неясно, почему из «никто не одобряет расширение схемы» следует «типы перечисляет правило».
LANGUAGE:
- "beyond those the schema of the SpecSheriff guidelines sets for every node" → "beyond those that the schema of the SpecSheriff guidelines defines for every node" — схема поля "defines", а не "sets"; эти слова не сочетаются.
- "each new kind of node" → "each kind of node that the project has added" — "new" не говорит, относительно чего тип новый. Замена сохраняет смысл только при прочтении (а).
- "That rule's `TextRule.list.members` holds" → "The refining rule's `TextRule.list.members` holds" — "That rule" после предложения с двумя правилами не выбирает ни одно из них. Замена сохраняет смысл только при прочтении (а).
- "That rule's `TextRule.list.property` names" → "The refining rule's `TextRule.list.property` names" — та же причина.
- "are carried out by code, by tools or by people" → "are implemented by code, by tools or by people" — узел не "carry out"; выполняют или реализуют то, что он требует. Не уверен, что "implemented" подходит к "by people" так же точно.
