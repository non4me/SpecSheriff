### tools-drafts.json · s-vuujweu57sxsa58 — Reason
TRANSLATION: Поэтому проверка, которая следовала бы по связям любого типа, отклоняла бы изменения, после которых никакие домены спецификации не используют друг друга по циклу.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-gvafe6bnstwab8b — Text
TRANSLATION: `sheriff validate` отклоняет любой другой JSON-файл в `specs/tech/`, где хранится техническое приложение (§s-tj38pvm38nepaf5), и называет этот файл.
TWO READINGS:
- "which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file": (а) `sheriff validate` отклоняет файл и называет его; (б) папка `specs/tech/` хранит техническое приложение и называет этот файл. Контекст и запятая указывают на (а), но "names" стоит сразу после "holds" и читается как второе сказуемое при "which".
- "which holds": (а) техническое приложение хранит папка `specs/tech/`; (б) его хранит «любой другой JSON-файл». Контекст указывает на (а).
LANGUAGE:
- "refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file" → "refuses, and names, any other JSON file under `specs/tech/`, the folder that holds the technical appendix (§s-tj38pvm38nepaf5)" — the second verb is separated from its subject by a relative clause with its own verb, so the reader attaches "names" to "which".

### tools-drafts.json · s-gvafe6bnstwab8b — Reason
TRANSLATION: Раздел этого файла, которому не соответствует ни один раздел домена спецификации, содержит имплементацию, которую этот читатель не найдёт.
TWO READINGS:
- "that reader": указывает на читателя из первого предложения абзаца, который ищет, как имплементировано правило домена. Слово "that" можно прочесть и как противопоставление какому-то другому читателю, которого в тексте нет.
LANGUAGE:
- "which that reader will not find" → "that the reader will not find" — a native writer uses "the" for a reader already introduced, and "which that" is heavy.

### tools-drafts.json · s-uxmkwbnpgtjzkgv — Example
TRANSLATION: Одобренное правило в `project.json` уточняет правило об уровне домена спецификации и перечисляет уровни `core` и `edge`.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-3anv9qcmx8pwp2w — Text
TRANSLATION: Цепочка, которая возвращается к идентифицирующему полю, которого она уже достигала, никогда не заканчивается.
TWO READINGS:
- "never ends": (а) определение: такая цепочка считается не имеющей конца, поэтому не выполняет условие «заканчивается полем без `identifierOf`»; (б) наблюдение о поведении: обход такой цепочки не завершится, то есть инструмент зациклится. Контекст указывает на (а).
LANGUAGE:
- "A chain that comes back to an identifying field that it has already reached never ends." → "A chain never ends if it comes back to an identifying field that it has already reached." — two stacked "that" clauses put "reached never ends" together, and the reader has to re-parse to find the main verb.

### tools-drafts.json · s-c2r9jndrjbtbsv6 — Text
TRANSLATION:
- Для последнего условия отказ также называет каждый другой вариант RecordType с тем же `answersTo`.
- Если вариант RecordType не выполняет первое условие, `sheriff validate` проверяет его дальше только по третьему условию, поскольку каждое из остальных условий сравнивает вариант RecordType с его RecordType.
- Если у RecordType нет `chosenBy`, то те RecordType с `chosenBy`, до которых он доходит через наименьшее число связей `refines`, могут расходиться в полях, которые называет их `chosenBy`.
- В этом случае `sheriff validate` отклоняет каждый вариант RecordType, который уточняет RecordType без `chosenBy`, поскольку каждый такой вариант RecordType не выполняет первое условие.
- Отказ называет каждый из этих RecordType с `chosenBy`.
TWO READINGS:
- "For the last condition": (а) если вариант не выполняет последнее условие; (б) в той части отказа, которая относится к последнему условию, независимо от того, нарушено ли оно. Контекст указывает на (а). «Последнее условие» названо в списке выше, а не в этом абзаце: скорее всего, это условие о том, что `answersTo` отличается от `answersTo` каждого другого варианта.
- "the first condition" (оба вхождения), "the third condition": отсылают по номеру к списку условий в другом абзаце. Скорее всего, первое условие — связь `refines` ровно с одним RecordType, у которого есть поля, выбирающие вариант, а третье — «объявляет хотя бы одно поле».
- "checks it further": "it" — (а) вариант RecordType; (б) первое условие. Контекст указывает на (а).
- "may disagree": (а) возможность: может оказаться, что они расходятся; (б) разрешение: им разрешено расходиться. Следующее предложение ("In that case") указывает на (а), но само предложение читается и как правило, разрешающее расхождение.
- "the RecordTypes with a `chosenBy` that it reaches": "that it reaches" относится (а) к RecordType, до которых доходит RecordType без `chosenBy`; (б) к `chosenBy`, до которого он доходит. Контекст указывает на (а).
- "that refines the RecordType without a `chosenBy`": (а) уточняет тот RecordType, у которого нет `chosenBy`; (б) уточняет RecordType, сам не имея `chosenBy`. Контекст указывает на (а).
- "disagree on the fields that their `chosenBy` names": (а) их `chosenBy` называют разные поля; (б) они по-разному описывают одни и те же поля, названные в `chosenBy`. Контекст указывает на (а).
LANGUAGE:
- "For the last condition, the refusal also names" → "Where the RecordType variant fails the last condition, the refusal also names" — the elliptical "For" does not say that the condition is failed, and the neighbouring sentences use "Where … fails".
- "may disagree on the fields that their `chosenBy` names" → "can name different fields in their `chosenBy`" — "may" reads as permission in a specification, and "disagree on" is vague. The replacement keeps the meaning only if reading (а) of "disagree" is intended.
- "that refines the RecordType without a `chosenBy`" → "that refines the RecordType that has no `chosenBy`" — the prepositional phrase can attach to the verb.

### tools-drafts.json · s-c2r9jndrjbtbsv6 — Example
TRANSLATION:
- Вариант RecordType, находящийся в том же разделе, что и `notification`, уточняет `notification`, называет `email` значением `channel` в своём `answersTo` и объявляет `address`, и `sheriff validate` его принимает.
- Другой вариант RecordType для `notification` называет `sms` значением `channel` в своём `answersTo` и объявляет `text`.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · s-5nf87c3e3jg9v7c — Text
TRANSLATION:
- В противном случае частями базовой спецификации являются раздел contracts и разделы, расположение которых (§s-kag2m9tzdnduxdx) — это `base/`, за которым следует одно число.
- Раздел contracts получает имя `contracts`, по своей папке, а каждая другая часть — по своему заголовку.
TWO READINGS:
- "Otherwise": условие, которому оно противопоставлено, стоит в предыдущем абзаце. Скорее всего, означает «если проект не выбрал расширение Domains».
- "a single number": (а) ровно одно число, например `base/3` или `base/12`, а не `base/3.1`; (б) число из одной цифры. Контекст указывает на (а).
- "each other part by its title": (а) каждая другая часть получает имя по своему заголовку; (б) при первом чтении "each other" воспринимается как «друг друга». Контекст указывает на (а).
- "is named `contracts`, after its folder, and each other part by its title": (а) именем каждой другой части служит её заголовок; (б) каждая другая часть названа в честь своего заголовка, а само имя может от него отличаться. Контекст (пример 2) указывает на (а).
LANGUAGE:
- "whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number" → "whose location (§s-kag2m9tzdnduxdx) is `base/` followed by one number" — "single number" can be read as a single digit.
- "and each other part by its title" → "and the name of every other part is its title" — "each other" reads as the reciprocal pronoun. The omitted verb "is named" also changes construction: "named `contracts`" states the name, "named by its title" states the source of the name.

### tools-drafts.json · s-5nf87c3e3jg9v7c — Example 2
TRANSLATION:
- Значения этого поля — «Requests», «Users» и `contracts`, каждое вместе с sid узла спецификации, из которого оно взято.
- Наиболее вероятная ошибка — взять в качестве значения заголовок «Contracts» вместо `contracts`.
TWO READINGS: none
LANGUAGE: none

### tools-drafts.json · new:tools-7-1-enum-values — Reason
TRANSLATION: Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), передало бы эту ошибку в сгенерированный код.
TWO READINGS:
- "that mistake": никакая ошибка ранее в абзаце не названа, предыдущее предложение говорит только о том, что типы и RuntimeChecks поля генерируются из его значений. Скорее всего, имеется в виду отсутствие значений или нарушение правил об источнике значений.
- "their source": (а) источник значений; (б) источник правил. Контекст указывает на (а).
LANGUAGE:
- "would therefore pass that mistake on to the generated code" → "would therefore make the generated code wrong" — "that mistake" has no antecedent, because the sentence describes a defective field and names no mistake. I am not sure the replacement keeps the meaning: it drops the idea that the same defect is carried over.

### tools-drafts.json · s-ezq8csd433vj6fj — Text
TRANSLATION: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` пропускает ссылку из одного RecordType (§s-7vm323mhry2enx3) на другой без сообщения только в следующих случаях (§s-8ht2hn88cu2qwz9):
TWO READINGS:
- "to another pass": (а) "pass" — глагол: позволяет ссылке на другой RecordType пройти; (б) при первом чтении "another pass" воспринимается как существительное — «другой проход». Контекст указывает на (а).
- "pass without a report": (а) `sheriff validate` ничего не сообщает о ссылке; (б) ссылка проходит проверку, а в остальных случаях не проходит. Контекст указывает на (а): ниже сказано, что о других ссылках сообщается, но изменение всё равно проходит.
LANGUAGE:
- "lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases" → "leaves a reference from one RecordType (§s-7vm323mhry2enx3) to another unreported only in the following cases" — "to another pass" is a garden path, and "pass" suggests that other references fail, although the node says the change still passes.

### tools-drafts.json · s-ezq8csd433vj6fj — Example
TRANSLATION: Поле `user`, которое содержит только идентификатор пользователя, без ссылки на RecordType пользователя, имеет тип `string` и не имеет `identifierOf`.
TWO READINGS:
- "with no reference to the RecordType of a user": (а) у поля нет ссылки на RecordType пользователя; (б) идентификатор не ссылается на RecordType пользователя. Контекст указывает на (а); смысл в обоих прочтениях почти одинаков.
LANGUAGE: none

Context was read from the English `en`, `text` and `reason` fields of D:\SpecSheriff\.ai_docs\t25-pass\tools-drafts.json, and the terms from C:\Users\PC\.claude\skills\vt\terms-ru.md. The chunk file is D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md. The rest of both examples of s-c2r9jndrjbtbsv6 and s-ezq8csd433vj6fj could not be read, so those sentences were judged on their own. «Раздел» for "section" is my rendering: the term file has no row for it.
