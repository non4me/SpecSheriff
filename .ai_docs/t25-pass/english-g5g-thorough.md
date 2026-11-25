### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · s-gvafe6bnstwab8b, Text
TRANSLATION: `sheriff validate` отклоняет любой другой JSON-файл технического приложения (§s-tj38pvm38nepaf5), лежащий в `specs/tech/`, и называет этот файл.
TWO READINGS:
- "any other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`": (а) ограничение: отклоняются только те JSON-файлы в `specs/tech/`, которые относятся к техническому приложению, а о прочих JSON-файлах там правило молчит; (б) пояснение: всякий JSON-файл в `specs/tech/` и есть файл технического приложения, отклоняется любой, кроме перечисленных. Первое предложение узла говорит просто "a JSON file under `specs/tech/`", без "of the technical appendix", поэтому читатель скорее увидит здесь более узкий круг файлов, то есть (а).
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · s-3anv9qcmx8pwp2w, Text
TRANSLATION: Цепочка никогда не заканчивается, если она возвращается к полю, которое в ней уже есть.
TWO READINGS:
- "never ends": (а) у такой цепочки нет конца, то есть она не выполняет условие «заканчивается полем без `identifierOf`»; (б) обход цепочки длится бесконечно, то есть инструмент зацикливается. Контекст (условие выше и reason со словами "has an end") склоняет к (а), но само слово "never" говорит о времени и подсказывает (б).
LANGUAGE:
- "never ends if it comes back" → "has no end if it comes back" — "never" рядом с условием читается как утверждение о времени; reason этого же узла говорит "has an end", и замена сохраняет смысл (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · s-c2r9jndrjbtbsv6, Text, предложение 1
TRANSLATION: Если RecordType variant не выполняет последнее условие, отказ также называет каждый из остальных RecordType variant того же RecordType, у которых такой же `answersTo`.
TWO READINGS:
- "the same `answersTo`": (а) такой же, как у отклонённого RecordType variant; (б) одинаковый между собой у этих остальных RecordType variant. Контекст (последнее условие сравнивает `answersTo` варианта с остальными) склоняет к (а), но предложение не говорит, с чьим `answersTo` идёт сравнение.
- "the last condition": указывает на последний пункт списка условий, который назван двумя абзацами выше, а не в этом абзаце. Скорее всего это условие о том, что `answersTo` отличается от `answersTo` любого другого RecordType variant того же RecordType.
LANGUAGE:
- "that have the same `answersTo`" → "that have the same `answersTo` as it has" — без дополнения не сказано, с чем совпадает `answersTo`; замена сохраняет смысл только при чтении (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · s-c2r9jndrjbtbsv6, Text, предложение 2
TRANSLATION: Если они так делают, `sheriff validate` отклоняет каждый RecordType variant, который уточняет (refines) тот RecordType, у которого нет `chosenBy`, поскольку каждый такой RecordType variant не выполняет первое условие.
TWO READINGS:
- "Where they do": отсылает к предыдущему предложению того же абзаца. Скорее всего значит «если RecordType с `chosenBy`, достижимые через наименьшее число связей `refines`, действительно называют в своих `chosenBy` разные поля». Но "they" можно отнести и к "the fewest `refines` links", а "do" — к "can name", то есть «если могут назвать» вместо «если называют».
- "that refines the RecordType that has no `chosenBy`": (а) у RecordType variant есть прямая связь `refines` на этот RecordType; (б) RecordType variant уточняет его прямо или через цепочку `refines`. Первое условие ("it has a `refines` link to exactly one RecordType") склоняет к (а).
- "the first condition": указывает на первый пункт списка условий, который назван несколькими абзацами выше, а не в этом абзаце. Скорее всего это условие о связи `refines` ровно с одним RecordType, у которого есть поля, выбирающие вариант.
LANGUAGE:
- "Where they do" → "Where they name different fields" — "do" после "can name" оставляет читателя решать, что именно повторяется: «называют» или «могут называть»; замена сохраняет смысл.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · s-5nf87c3e3jg9v7c, Text
TRANSLATION: Именем каждой из остальных частей служит её название (title).
TWO READINGS:
- "the other parts": отсылает к предыдущим предложениям абзаца. Скорее всего это части базовой спецификации, кроме секции contracts, то есть секции с расположением `base/` и одним числом.
- "its title": (а) title узла-секции, которая является этой частью; (б) заголовок части в каком-то ином смысле, например имя файла или папки, как у contracts в предыдущем предложении. Контекст склоняет к (а): ниже сказано "for the title of a section, that section".
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5g.md · new:tools-7-1-enum-values, Reason
TRANSLATION: Поэтому, если бы `sheriff validate` принимал поле, у которого нет значений или значения которого нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), код, сгенерированный из этого поля, унаследовал бы дефект этого поля.
TWO READINGS:
- "their source": (а) источник значений; (б) источник правил. Контекст склоняет к (а).
- "the code generated from that field": предыдущее предложение говорит, что типы и RuntimeChecks генерируются из значений поля ("from its values"), а здесь код генерируется «из поля». Читатель может понять это как (а) те же типы и RuntimeChecks или (б) какой-то иной, более широкий код. Скорее всего (а).
LANGUAGE:
- "the code generated from that field" → "the types and RuntimeChecks generated from that field's values" — предыдущее предложение называет то же самое иначе, и читатель может принять это за две разные вещи; замена сохраняет смысл, только если имеется в виду чтение (а).
