### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-vuujweu57sxsa58, Reason
TRANSLATION: Поэтому проверка, которая шла бы по связям всех типов, отклоняла бы и такие изменения, после которых никакие домены не используют друг друга по циклу.
TWO READINGS:
- "So": причина «поэтому», то есть следствие из предыдущего предложения, которого в этом отрывке нет. Или цель «чтобы». Из-за «would refuse» вероятнее «поэтому», но на что оно указывает, из отрывка не видно.
- "no domains use one another in a cycle": после изменения не остаётся ни одного цикла. Или никакие домены не образуют цикла друг с другом. Контекст favours первое.
LANGUAGE:
- "So a check that followed links" → "Otherwise, a check that followed links" — "So" в начале фразы-причины читается как разговорное «итак» или «чтобы». Если имеется в виду «без этого», нужно "Otherwise" или "Without this". Не уверен, что замена сохраняет смысл, поскольку предыдущего текста правила нет.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-gvafe6bnstwab8b, Text and Reason
TRANSLATION: Текст: `sheriff validate` отклоняет любой другой JSON-файл в `specs/tech/`, где лежит техническое приложение (§s-tj38pvm38nepaf5), и называет этот файл. Причина: раздел этого файла, который не соответствует ни одному разделу домена, содержит реализацию, которую этот читатель не найдёт.
TWO READINGS:
- "which holds the technical appendix": «которая» относится к `specs/tech/` (папка содержит приложение). Или к «JSON file» (файл содержит приложение). Вероятнее папка.
- "any other JSON file": «другой» по отношению к чему, в отрывке не названо. Скорее всего, к файлам, которые соответствуют разделам доменов (по заголовку узла).
- "that file" (в Reason): неясно, какой файл. Скорее всего, файл технического приложения для домена.
- "that reader": читатель нигде не назван. Скорее всего, тот, кто ищет реализацию домена в техническом приложении.
- "an implementation": реализация как описание или правило реализации в разделе. Или как сам код. Вероятнее описание реализации.
LANGUAGE:
- "an implementation which that reader will not find" → "an implementation that the reader will not find" — ограничительное придаточное вводится через "that", а не "which". "that reader" указывает на то, чего в тексте нет, поэтому лучше назвать читателя ("a reader of the domain").

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-uxmkwbnpgtjzkgv, Example
TRANSLATION: Одобренное правило в `project.json` уточняет правило об уровне домена и перечисляет уровни `core` и `edge`.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-3anv9qcmx8pwp2w, Text
TRANSLATION: Цепочка, которая возвращается к идентифицирующему полю, до которого она уже дошла, никогда не заканчивается.
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-c2r9jndrjbtbsv6, Text and Example
TRANSLATION: Текст: (1) Для последнего условия отказ называет также каждый другой вариант RecordType, у которого такой же `answersTo`. (2) Если вариант RecordType не выполняет первое условие, `sheriff validate` дальше проверяет его только по третьему условию, потому что каждое из остальных условий сравнивает вариант RecordType с его RecordType. (3) Если у RecordType нет `chosenBy`, то RecordType с `chosenBy`, до которых он доходит через наименьшее число связей `refines`, могут расходиться в полях, которые называет их `chosenBy`. (4) В этом случае `sheriff validate` отклоняет каждый вариант RecordType, который уточняет RecordType без `chosenBy`, потому что каждый такой вариант RecordType не выполняет первое условие. (5) Отказ называет каждый из этих RecordType с `chosenBy`. Пример: Вариант RecordType в том же разделе, что и `notification`, уточняет `notification`, называет `email` значением `channel` в своём `answersTo` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант RecordType для `notification` называет `sms` значением `channel` в своём `answersTo` и объявляет `text`.
TWO READINGS:
- "the last condition" и "the refusal" (предложение 1): условия и отказ не названы в отрывке. Скорее всего, это отказ, вызванный нарушением последнего условия.
- "the same `answersTo`": такой же, как у отклоняемого варианта (вероятно). Или такой же, как у родительского RecordType.
- "each of the other conditions" (2): остальные, кроме третьего (вероятно, судя по «only against the third»). Или остальные, кроме первого.
- "its RecordType" (2): RecordType, который уточняет этот вариант (вероятно).
- "may disagree" (3): возможность («могут расходиться»). Или разрешение («им разрешено расходиться»). Предложение 4 говорит об отказе, поэтому вероятнее возможность.
- "a `chosenBy` that it reaches" (3): по грамматике «that it reaches» относится к `chosenBy`. По смыслу оно относится к RecordTypes. Вероятен второй вариант.
- "In that case" (4): случай, когда у RecordType нет `chosenBy`. Или случай, когда ближайшие RecordType с `chosenBy` расходятся. Вероятнее второй, потому что он идёт после «may disagree». Но тогда «since each such ... fails the first condition» объясняет отказ только для этого случая.
- "refines the RecordType without a `chosenBy`" (4): «without a chosenBy» относится к RecordType (вероятно). Или к глаголу «refines».
- "that refines" (4): уточняет напрямую. Или и через цепочку `refines`, о цепочках говорит предложение 3. Из отрывка не видно.
- "accepts it" (Example): «it» — вариант RecordType (вероятно). Но возможно и `notification`.
LANGUAGE:
- "For the last condition, the refusal also names" → "Where a RecordType variant fails the last condition, the refusal also names" — "For the last condition" калькирует «для последнего условия»: не сказано, что условие нарушено. Не уверен, что замена сохраняет смысл, потому что список условий не виден.
- "checks it further only against the third condition" → "goes on to check it only against the third condition" — "checks further" неестественно. Смысл сохраняется.
- "the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links" → "the RecordTypes with a `chosenBy` that it reaches through the smallest number of `refines` links" — придаточное «that it reaches» присоединяется к `chosenBy`, а не к RecordTypes. Нужна перестройка: "the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links". Смысл тот же.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-5nf87c3e3jg9v7c, Text and Example 2
TRANSLATION: Текст: В остальных случаях частями базовой спецификации являются раздел contracts и разделы, расположение (location, §s-kag2m9tzdnduxdx) которых — `base/` и одно число после него. Раздел contracts называется `contracts` по имени своей папки, а каждая другая часть называется по своему заголовку. Пример 2: Значения этого поля — «Requests», «Users» и `contracts`, каждое с sid узла, из которого оно взято. Скорее всего, ошибка в том, чтобы принять заголовок «Contracts» за значение вместо `contracts`.
TWO READINGS:
- "Otherwise": «в остальных случаях» — условие предыдущего предложения не показано в отрывке. Скорее всего, случай, когда база не разделена на домены.
- "followed by a single number": ровно одно число (`base/3`), и ничего после. Или «хотя бы одно число». Вероятнее первое.
- "is named `contracts`, after its folder": имя взято у папки (вероятно). Или имя дано по образцу папки, а не обязательно совпадает с ней.
- "that field": поле из Example 1, который в отрывке не показан. Скорее всего, поле с `enum`.
- "each with the sid ... that it comes from": «it» — значение. Нет второго возможного антецедента, но «each with» можно понять так, что sid входит в значение. Контекст: sid идёт рядом со значением.
- "take ... as a value": принять за значение (то есть счесть) или использовать как значение. Контекст допускает оба.
LANGUAGE:
- "each other part" → "each of the other parts" — "each other" читается как взаимное местоимение «друг друга», а "every other" означает «через одного».
- "to take the title “Contracts” as a value in place of `contracts`" → "to use the title “Contracts” as a value instead of `contracts`" — "take X as" обычно значит «принимать за», что искажает смысл. Смысл сохраняется.
- "The most likely mistake" → "The most likely mistake is" — фраза верна. Исправлять не нужно, пропустите эту строку.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · new:tools-7-1-enum-values, Reason
TRANSLATION: Поэтому поле без значений или со значениями, которые нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), передало бы эту ошибку в сгенерированный код.
TWO READINGS:
- "therefore": следствие чего-то, чего в отрывке нет. Причина не видна.
- "that mistake": ошибка не названа. Скорее всего, неверные значения `enum`. Или ошибка в спецификации вообще.
- "would ... pass": условие не названо. Скорее всего, если бы `sheriff validate` принимал такое поле.
- "their source": источник значений (вероятно). Или источник поля.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5e.md · s-ezq8csd433vj6fj, Text and Example
TRANSLATION: Текст: Если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), `sheriff validate` пропускает без сообщения ссылку из одного RecordType (§s-7vm323mhry2enx3) в другой только в следующих случаях (§s-8ht2hn88cu2qwz9): Пример: Поле `user`, которое хранит только идентификатор пользователя и не ссылается на RecordType пользователя, имеет тип `string` и не имеет `identifierOf`.
TWO READINGS:
- "without a report": без сообщения об ошибке. Или вообще без какого-либо вывода, в том числе без предупреждения. Из отрывка не ясно.
- "the RecordType extension": расширение guidelines (вероятно). Или расширение схемы. Из отрывка не видно.
- "holds only a user's identifier": поле хранит только идентификатор. Или идентификатор только пользователя (не другого объекта). Вероятнее первое.
- "with no reference to the RecordType of a user": относится к полю (вероятно) или к идентификатору.
LANGUAGE:
- "lets a reference ... pass without a report" → "accepts a reference ... without reporting it" — "pass without a report" нескладно: "report" здесь не носитель действия. Не уверен, что замена точно сохраняет смысл, поскольку неясно, о чём не сообщается: об ошибке или о предупреждении.
