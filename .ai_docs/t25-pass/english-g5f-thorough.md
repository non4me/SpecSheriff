### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-gvafe6bnstwab8b — Text
TRANSLATION: `sheriff validate` отклоняет каждый другой файл JSON технического приложения (§s-tj38pvm38nepaf5) в `specs/tech/` и называет этот файл.
TWO READINGS:
- "every other JSON file": (а) «каждый из остальных файлов JSON», то есть любой, кроме перечисленных выше; (б) «каждый второй файл JSON», через один. Контекст требует (а), но идиома «every other» по умолчанию значит (б).
- "JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`": (а) «of the technical appendix» лишь поясняет, и отклоняется любой остальной файл JSON в `specs/tech/`; (б) оно ограничивает, и отклоняются только те остальные файлы, которые относятся к техническому приложению, а о прочих файлах JSON в этой папке ничего не сказано. Первый абзац узла («accepts a JSON file under `specs/tech/` only where…») говорит в пользу (а).
LANGUAGE:
- "refuses every other JSON file" → "refuses any other JSON file" — «every other» читается как «каждый второй»; в соседних узлах та же мысль записана как «refuses any other field», «refuses any other header».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-gvafe6bnstwab8b — Reason
TRANSLATION: Раздел этого файла, которому не соответствует ни один раздел домена, содержит реализацию, которую читатель не найдёт.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-3anv9qcmx8pwp2w — Text
TRANSLATION: Цепочка никогда не заканчивается, если она возвращается к идентифицирующему полю, которого уже достигала.
TWO READINGS:
- "an identifying field that it has already reached": (а) только поле, к которому цепочка уже перешла на одном из шагов; (б) также поле, с которого цепочка началась. По тексту узла цепочка «starts at a field», а не «reaches» его, поэтому буквально верно (а). Тогда возврат к начальному полю этим предложением не покрыт.
- "an identifying field": термин в узле не вводится; выше сказано «the field that identifies the data records of the RecordType». Скорее всего, имеется в виду то же самое: «поле, идентифицирующее записи данных RecordType».
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-c2r9jndrjbtbsv6 — Text
TRANSLATION:
- Если вариант RecordType не выполняет последнее условие, в отказе также названы все остальные варианты RecordType, у которых такой же `answersTo`.
- Если у RecordType нет `chosenBy`, те RecordType, у которых есть `chosenBy` и до которых он доходит через наименьшее число связей `refines`, могут называть в своих `chosenBy` разные поля.
- В этом случае `sheriff validate` отклоняет каждый вариант RecordType, который уточняет RecordType без `chosenBy`, поскольку каждый такой вариант RecordType не выполняет первое условие.
TWO READINGS:
- "every other RecordType variant that has the same `answersTo`": (а) «каждый из остальных вариантов RecordType»; (б) «каждый второй». Контекст требует (а).
- "every other RecordType variant that has the same `answersTo`": (а) остальные варианты того же RecordType; (б) любые варианты RecordType в спецификации с таким же `answersTo`. Само условие сказано про «every other RecordType variant of its RecordType», поэтому вероятнее (а), но здесь «of its RecordType» опущено.
- "can name different fields": (а) возможность — «бывает, что называют разные поля»; (б) разрешение — «им разрешено называть разные поля». Контекст говорит за (а).
- "different fields": (а) разные между собой, то есть несколько равноудалённых RecordType называют разные поля; (б) не те поля, что называет что-то другое. Контекст говорит за (а). То, что таких равноудалённых RecordType может быть несколько, прямо не сказано, читатель выводит это сам.
- "In that case": (а) «если они действительно называют разные поля»; (б) «если у RecordType нет `chosenBy`». Предыдущее предложение говорит только «can», то есть называет возможность, а не случай. При (б) отклоняются все варианты любого RecordType без `chosenBy`. Задумано, вероятно, (а).
- "that refines the RecordType that has no `chosenBy`": (а) имеет прямую связь `refines` с этим RecordType; (б) уточняет его также через цепочку связей `refines`. Текст не различает.
- "the first condition": отсылает к списку условий в другом, более раннем абзаце узла. Скорее всего, это «it has a `refines` link to exactly one RecordType that has fields that select a variant».
- "the last condition": отсылает к тому же списку. Скорее всего, это «its `answersTo` differs from the `answersTo` of every other RecordType variant of its RecordType».
LANGUAGE:
- "every other RecordType variant that has the same `answersTo`" → "each of the other RecordType variants of its RecordType that have the same `answersTo`" — «every other» читается как «каждый второй», и не сказано, среди каких вариантов. Замена сохраняет смысл, только если верно чтение (а) из второй строки выше.
- "can name different fields in their `chosenBy`" → "may name fields in their `chosenBy` that differ from one RecordType to another" — «different» без «from what» и «can» в описании возможного случая. Не уверен, что замена точно передаёт задуманное.
- "In that case" → "Where they do" — после «can» слово «case» ни на что определённое не указывает. Замена сохраняет смысл, только если верно чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-5nf87c3e3jg9v7c — Text
TRANSLATION:
- Раздел контрактов носит имя `contracts` — по своей папке.
- Каждая из остальных частей названа своим заголовком.
TWO READINGS:
- "is named by its title": (а) её именем служит её заголовок; (б) на неё ссылаются, указывая её заголовок; (в) «named by» как указание на того, кто дал имя. Контекст говорит за (а): предыдущее предложение даёт имя раздела контрактов.
LANGUAGE:
- "Each of the other parts is named by its title." → "The name of each of the other parts is its title." — «named by X» в английском обозначает того, кто дал имя. Рядом стоит «named `contracts`, after its folder» с другой конструкцией, и читатель ищет между ними разницу.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-5nf87c3e3jg9v7c — Example 2
TRANSLATION: Самая вероятная ошибка — использовать в качестве значения заголовок «Contracts» вместо `contracts`.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · new:tools-7-1-enum-values — Reason
TRANSLATION: Поэтому сгенерированный код унаследовал бы дефект поля, у которого нет значений или значения которого нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).
TWO READINGS:
- "would inherit": условие, при котором это случилось бы, не названо. Скорее всего, подразумевается «если бы `sheriff validate` принял такое поле». Без условия «would» можно прочитать и как утверждение о том, что обычно происходит.
- "the defect of a field that has no values": (а) дефект, который есть у такого поля; (б) дефект, состоящий в самом существовании такого поля. Смысл близкий, контекст говорит за (а).
LANGUAGE:
- "So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source" → "So, if such a field were accepted, the code generated from a field that has no values, or whose values break the rules about their source, would inherit that defect" — у «would» нет условия, и «the generated code» не привязан к полю, о котором идёт речь. Не уверен, что добавленное условие совпадает с задуманным.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5f.md · s-ezq8csd433vj6fj — Text
TRANSLATION: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` ничего не сообщает о ссылке одного RecordType (§s-7vm323mhry2enx3) на другой только в следующих случаях (§s-8ht2hn88cu2qwz9):
TWO READINGS:
- "stays silent about": (а) не выдаёт сообщения о ссылке; (б) не отклоняет ссылку. Дальше в узле стоит «reports each RecordType… The change still passes», что говорит за (а).
LANGUAGE:
- "stays silent about a reference" → "reports nothing about a reference" — остальной узел пользуется глаголом «reports», и прямое отрицание того же глагола снимает чтение (б). Смысл сохраняется при чтении (а).
