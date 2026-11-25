### part-b.md · s-qzyacnqwvaeaps4
TRANSLATION:
**Заголовок:** Ссылки и соответствующие им связи.
**Текст:** `sheriff validate` отклоняет каждое из перечисленного в узле спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6):
- sid, отличный от собственного sid узла, на который узел ссылается, не объявив связь, чьей целью является этот sid (§s-vwyke96ggxx79je);
- связь `cites` с узлом, на который узел не ссылается, или с узлом, с которым узел объявляет ещё и связь другого типа (§s-vwyke96ggxx79je);
- ссылку по расположению (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).

Отказ называет узел по его файлу, его sid и его расположению и называет связь или ссылку.

Знак `§`, за которым идёт sid, а после него нет ни строчной буквы, ни цифры, ссылается на этот sid, в том числе в тексте в обратных кавычках (§s-cxtt6jvhqcey2k9). Любой другой `§`, за которым идут один или несколько символов, вплоть до пробельного символа, запятой, точки с запятой или закрывающей круглой скобки, является ссылкой по расположению, если только он не находится в тексте в обратных кавычках.

`sheriff validate` читает в поисках ссылок каждое свойство узла, кроме следующих (§s-cxtt6jvhqcey2k9):
- его связей;
- узлов под ним, включая узлы в его ячейках;
- индекса разделов в заголовке домена (§s-2r59txnms5serdr) и значений, собранных в `x-enumSource.gathered` поля (§s-ju5vcanbjph7mgh), которые строятся из других узлов.

**Обоснование:** Тот, кто меняет узел, узнаёт по связям, указывающим на него, какие узлы на него опираются (§s-cxtt6jvhqcey2k9). Эти связи полны только там, где каждая ссылка, в каком бы свойстве узла она ни стояла, называет узел по его sid и ей соответствует объявленная связь.

**Пример 1:** Обоснование узла показывает отклонённую ссылку в виде `§base/3.2`, в обратных кавычках, и `sheriff validate` её принимает. Те же символы без обратных кавычек отклоняются как ссылка по расположению. Sid в обратных кавычках по-прежнему считается ссылкой, поэтому узел должен объявить связь с узлом этого sid.

TWO READINGS:
- "and then by no lower-case letter or digit": (а) после sid нет ни строчной буквы, ни цифры; (б) после sid нет строчной буквы либо стоит цифра. Контекст в пользу (а).
- "up to a whitespace character, a comma, a semicolon or a closing parenthesis": (а) ссылка — это символы до разделителя, сам разделитель в неё не входит; (б) разделитель входит в ссылку. Контекст скорее в пользу (а), но текст этого не говорит.
- "unless it is in text in backticks": «it» — (а) знак `§`; (б) вся ссылка по расположению. На практике это одно и то же, скорее (а).
- "the node" (в "reads every property of the node for citations"): узел в этом абзаце не назван. Скорее всего, это «узел спецификации в файлах, которые хранит репозиторий» из первого абзаца.
- "the index of the sections in a domain's header": (а) индекс разделов, находящийся в заголовке домена; (б) индекс тех разделов, которые находятся в заголовке домена. Контекст в пользу (а).
- "which are built from other nodes": (а) относится и к индексу, и к собранным значениям; (б) только к собранным значениям. Контекст в пользу (а).
- "A node's reason shows a refused citation as `§base/3.2`, in backticks, and `sheriff validate` accepts it": «a refused citation» — (а) обоснование приводит пример ссылки, которая была бы отклонена; (б) обоснование содержит ссылку, которую уже отклонили. «it» — (а) эту запись в обратных кавычках; (б) обоснование; (в) узел. Читатель спотыкается о «refused … accepts it»; контекст в пользу (а) и (а).
- "A sid in backticks still counts as a citation": (а) любой sid в обратных кавычках, даже без `§`, считается ссылкой; (б) `§` с sid в обратных кавычках считается ссылкой. Текст говорит (а), правило выше требует (б).

LANGUAGE:
- "and then by no lower-case letter or digit" → "and not followed by a lower-case letter or a digit" — «followed by no X or Y» читается с трудом и допускает два прочтения.
- "in whatever property of a node it stands" → "in whatever property of a node it appears" — «stands» о месте в тексте — калька с «стоит».
- "A sid in backticks still counts as a citation" → "A `§` followed by a sid still counts as a citation in backticks" — в исходной фразе пропущен знак `§`; не уверен, что замена точно передаёт задуманное.

### part-b.md · s-pvnnr844f3y964m
TRANSLATION:
**Заголовок:** Типы связей, зарезервированные для терминов.
**Текст:** `sheriff validate` принимает связь типа `term-relation` или `uses` только там, где оба её конца — узлы-термины (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). Связь любого другого типа, включая `cites`, он принимает только там, где хотя бы один её конец — узел, не являющийся узлом-термином. `sheriff validate` отклоняет всякую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он проверяет только связь, целью которой является узел модели спецификации (§s-w6gybeqn2ttydqx). Отказ называет узел, объявляющий связь, по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx) и называет тип связи и её цель. Он говорит, что связь следует уладить с ответственными за спецификацию.

**Обоснование:** То, связаны ли два термина и как именно, говорит о том, как соотносятся сущности (§s-9w3u3wn37wksyxd), которые они называют. Это решают ответственные за спецификацию, поэтому отказ направляет автора связи к ним, а не предлагает тип.

**Пример 1:** Термин ссылается на другой термин и объявляет связь `cites` с ним. `sheriff validate` отклоняет эту связь и направляет автора к ответственным. Они решают, связаны ли термины связью `term-relation` и с каким `ratio`, или же связью `uses`.

TWO READINGS:
- "every other link": (а) всякую связь, не удовлетворяющую двум условиям выше; (б) всякую связь иных типов, чем названные. Контекст в пользу (а).
- "It says that the link is to be settled with the specification's owners": «It» — (а) отказ; (б) `sheriff validate`. Контекст в пользу (а). «the link is to be settled» — (а) тип связи надо согласовать с ответственными; (б) сам вопрос о связи надо с ними уладить. Точный смысл не ясен.
- "The specification's owners decide that": «that» — (а) как соотносятся сущности; (б) связаны ли термины и как. Контекст в пользу (а).
- "Whether two terms are bound, and how, says how": «says» — (а) выражает, показывает; (б) определяет. Скорее (а).

LANGUAGE:
- "every other link that a node of the specification in the files that the repository keeps declares" → "every other link declared by a node of the specification in the files that the repository keeps" — сказуемое «declares» стоит после длинного придаточного, и «keeps declares» сбивает чтение.
- "the link is to be settled with the specification's owners" → "the type of the link is to be agreed with the specification's owners" — «settle a link» не сочетается; не уверен, что замена сохраняет смысл.
- "says how the entities" → "shows how the entities" — подлежащее «whether…» не может «say»; не уверен, не имелось ли в виду «determines».
- "that they name relate" → "that they name relate to one another" — «relate» без дополнения звучит оборванно.

### part-b.md · s-e2vdhfsndy5stq9
TRANSLATION:
**Заголовок:** Последовательность слов заглавными буквами.
**Текст:** `sheriff validate` отклоняет каждую последовательность из трёх или более слов, набранных заглавными буквами (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). Отказ называет узел по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx), свойство, содержащее эту последовательность, и саму последовательность.

`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, каков бы ни был его статус одобрения. Он читает заголовок, текст и обоснование узла, каждую строку в каждом элементе его `TextRule.list` и каждую текстовую ячейку `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). Узел в ячейке `TableRule` он читает так же, как любой другой узел.

В том, что читает `sheriff validate`, слово, набранное заглавными буквами, — это два или более символа, отвечающие каждому из условий:
- каждый из них — заглавная буква любой письменности, цифра или дефис;
- первый — заглавная буква, а последний — заглавная буква или цифра;
- непосредственно перед ними и после них не стоит ни буква, ни цифра, ни знак подчёркивания.

Последовательность — это три или более слова, набранных заглавными буквами, между которыми только пробелы или табуляции. Текст в обратных кавычках, в прямых двойных кавычках или в фигурных двойных кавычках (“…”) опускается.

**Обоснование:** Проверка не понимает текста, поэтому распознаёт фразу, набранную заглавными буквами, только по её форме. Эта форма определена точно, чтобы обычное употребление заглавных букв и цитаты, сохраняющие написание цитируемого (§s-7anvune6h4f6mbr), никогда не отклонялись.

**Пример 1:** Текст правила заканчивается словами «WITHOUT ANY EXCEPTION», написанными как часть его предложения, вне обратных кавычек и кавычек. `sheriff validate` отклоняет узел и называет эту последовательность. Ближайшая ошибка — пропустить три аббревиатуры подряд, например «HTTP REST API»: `sheriff validate` отклоняет и их.

TWO READINGS:
- "The refusal names the node": узел до этого не назван. Скорее всего, это узел, в свойстве которого найдена последовательность.
- "whatever its status": «its» — (а) узла; (б) репозитория. Контекст в пользу (а).
- "two or more characters that meet each of these conditions": (а) два или более идущих подряд символа; (б) любые два или более символа, не обязательно соседние. Задумано, очевидно, (а), но текст этого не говорит.
- "is left out": (а) такой текст не читается проверкой вовсе; (б) такой текст исключается из последовательности, а слова по обе стороны от него всё равно образуют одну последовательность. Контекст скорее в пользу (а).
- "written as part of its sentence": «its» — (а) текста правила; (б) самого правила. Смысл один и тот же, но выражение неясное.
- "The closest mistake": (а) самая вероятная ошибка; (б) ошибка, ближе всего стоящая к правильному поведению. Выражение в английском не устойчивое, читатель выбирает сам.

LANGUAGE:
- "is two or more characters that meet" → "is a sequence of two or more consecutive characters that meet" — без «consecutive» символы могут быть не соседними.
- "stands immediately before or after them" → "comes immediately before or after them" — «stands» о месте символа — калька с «стоит».
- "is left out" → "is not read" — не сказано, из чего исключается текст; не уверен, что замена точно передаёт задуманное.
- "The closest mistake is to let" → "The most likely mistake is to let" — «closest mistake» не английское сочетание; не уверен, что замена сохраняет смысл.

### part-b.md · s-zhen42p6mnaxu7w
TRANSLATION:
**Заголовок:** Раздел, в котором есть правило.
**Текст:** `sheriff validate` принимает раздел спецификации в файлах, которые хранит репозиторий, только там, где раздел содержит правило (§s-exxuckgakfxkycp). Любой другой раздел он отклоняет, называя его по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx).

Раздел содержит правило там, где хотя бы один из узлов непосредственно под ним является одним из следующих:
- узлом типа `TextRule` или `TableRule` (§s-5fewsp22mmdz7y6) либо, если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s), типа `RecordType` (§s-ktfstpv8rurznrp);
- термином или узлом собственного типа в проекте (§s-pctqj9wqaq8762t);
- разделом, содержащим правило.

**Обоснование:** Раздел, все правила которого перенесены или удалены, по-прежнему выглядит частью спецификации. Его статус одобрения, который инструменты SpecSheriff выводят из узлов под ним (§s-9kfdycuq34beqvs), не показывает, что раздел не содержит ни одного правила.

**Пример 1:** Раздел содержит только вложенный раздел, последнее правило которого перенесли в другой файл. `sheriff validate` отклоняет оба раздела, поскольку ни один не содержит правила. Ближайшая ошибка — отклонить только вложенный раздел.

TWO READINGS:
- "a term or a node of a project's own kind": (а) термин либо узел собственного типа в проекте; (б) термин собственного типа либо узел собственного типа. Контекст в пользу (а).
- "The closest mistake": (а) самая вероятная ошибка; (б) ошибка, ближе всего стоящая к правильному поведению.

LANGUAGE:
- "The closest mistake is to refuse" → "The most likely mistake is to refuse" — «closest mistake» не английское сочетание; не уверен, что замена сохраняет смысл.

### part-b.md · s-qvgzubkrafadqgf
TRANSLATION:
**Заголовок:** Связи `exempts`.
**Текст:** `sheriff validate` принимает связь `exempts` (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) только там, где выполняется всё перечисленное:
- узел, объявляющий связь, — узел собственных guidelines проекта, хранящихся в `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);
- цель связи — раздел или правило, причём правило — это узел типа `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) или `RecordType` (§s-ktfstpv8rurznrp) либо собственного типа в проекте (§s-vsh384ybt4w25a2);
- текст узла, объявляющего связь, ссылается на цель (§s-cxtt6jvhqcey2k9).

Любую другую связь `exempts` `sheriff validate` отклоняет, называя объявляющий её узел по его файлу, его sid и его расположению в спецификации (§s-kag2m9tzdnduxdx) и называя цель связи.

**Обоснование:** Связь `exempts` снимает требование, чтобы код системы реализовывал её цель (§s-6fw72j65jkqrfpf). Поэтому связь, которую не допускает правило об освобождении правила (§s-gf6n8ge4mke3pr2), скрыла бы правило, которое код системы не реализует.

**Пример 1:** Правило из `project.json` освобождает правило стека, выбирающее язык программирования, поскольку ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила говорит об этом и ссылается на это правило стека. Освобождающее правило также объявляет связь `exempts` с ним, и `sheriff validate` принимает связь. Ближайшая ошибка — сослаться на правило стека только в обосновании, и тогда `sheriff validate` отклоняет связь.

TWO READINGS:
- "kept in `specs/_guidelines/project.json`": (а) там хранятся собственные guidelines проекта; (б) там хранится узел. Смысл совпадает, контекст в пользу (а).
- "the rule of the stack that chooses the programming language": (а) правило, которое выбирает язык программирования; (б) стек, который выбирает язык программирования. Контекст в пользу (а).
- "says so": (а) говорит, что ни один символ не может реализовать этот выбор; (б) говорит, что правило освобождает правило стека. Скорее (б) вместе с причиной, но текст не уточняет.
- "declares an `exempts` link to it": «it» — (а) правило стека; (б) текст освобождающего правила. Контекст в пользу (а).
- "The closest mistake": (а) самая вероятная ошибка; (б) ошибка, ближе всего стоящая к правильному поведению.

LANGUAGE:
- "the rule of the stack that chooses the programming language" → "the rule in the section on the stack that chooses the programming language" — «rule of the stack» читается как правило, принадлежащее стеку; узел s-yprj7d6tnvauggr называет это место «the section on the stack».
- "cites that rule of the stack" → "cites that rule" — то же сочетание.
- "to cite the rule of the stack only in the reason" → "to cite that rule only in the reason" — то же сочетание.
- "no symbol of the code" → "no symbol in the code" — символ находится «in the code».
- "The closest mistake is to cite" → "The most likely mistake is to cite" — «closest mistake» не английское сочетание; не уверен, что замена сохраняет смысл.

### part-b.md · new:tools-7-1-consumes
TRANSLATION:
**Заголовок:** Связи `consumes`.
**Текст:** Там, где проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает связь `consumes` только там, где она идёт от заголовка домена к разделу в файлах другого домена спецификации (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). Файлы домена — те, что лежат в его папке `specs/<domain>/` (§s-zefk589ykh37b8u).

Любую другую связь `consumes` `sheriff validate` отклоняет, называя объявляющий её узел по его файлу, его sid и его расположению в спецификации (§s-kag2m9tzdnduxdx) и называя цель связи.

**Обоснование:** Индекс в заголовке домена и проверка на цикл, в котором домены используют друг друга, оба узнают из связей `consumes`, какой домен использует какой раздел (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Любая другая связь `consumes` сделала бы индекс или проверку на цикл неверными.

**Пример 1:** Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, описывающим, как пользователь входит в систему, и `sheriff validate` принимает связь. Ближайшая ошибка — направить связь на то правило в этом разделе, на которое домен опирается, и тогда `sheriff validate` отклоняет связь.

TWO READINGS:
- "the section of the domain `users` that describes how a user signs in": (а) раздел описывает вход; (б) домен описывает вход. Контекст в пользу (а).
- "the rule in that section that the domain relies on": (а) правило, на которое опирается домен; (б) раздел, на который опирается домен. Контекст в пользу (а). «the domain» — (а) `requests`; (б) `users`. Контекст в пользу (а), но домен не назван.
- "The closest mistake": (а) самая вероятная ошибка; (б) ошибка, ближе всего стоящая к правильному поведению.

LANGUAGE:
- "both learn from the `consumes` links which domain uses which section" → "both take from the `consumes` links which domain uses which section" — индекс не может «learn»; не уверен, что замена точно передаёт задуманное (возможно, «are both built from»).
- "The closest mistake is to point" → "The most likely mistake is to point" — «closest mistake» не английское сочетание; не уверен, что замена сохраняет смысл.

### part-b.md · new:tools-7-1-guidelines-to-extension
TRANSLATION:
**Заголовок:** Связь от SpecSheriff guidelines к расширению.
**Текст:** `sheriff validate` отклоняет каждую связь, которую правило SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) объявляет с узлом расширения guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). Отказ называет правило по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx) и называет тип связи и её цель. Эту проверку `sheriff validate` выполняет только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u). Там он читает каждый узел `specs/_guidelines/spec.json`, кроме раздела, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).

**Обоснование:** В репозитории, где пишутся SpecSheriff guidelines, расширения хранятся рядом с ними. Поэтому связь от правила guidelines к узлу расширения разрешается и проходит все остальные проверки.

**Пример 1:** Правило из `spec.json` ссылается на правило расширения и объявляет связь `cites`, которой требует эта ссылка. `sheriff validate` отклоняет эту связь.

TWO READINGS:
- "the link's type and its target": «its» — (а) связи; (б) типа. Контекст в пользу (а).
- "a rule of the SpecSheriff guidelines" против "every node of `specs/_guidelines/spec.json` other than a section": (а) «правило» означает любой узел, кроме раздела; (б) проверяются только узлы-правила, а читаются все. Контекст в пользу (а), но текст этого не говорит.

LANGUAGE: none

### part-b.md · s-yprj7d6tnvauggr
TRANSLATION:
**Заголовок:** Связи `implements` и `refines` приложений и собственных guidelines проекта.
**Текст:** В файлах, которые хранит репозиторий, `sheriff validate` отклоняет каждый из следующих узлов, кроме раздела, если у узла нет связи, названной для него:
- узел технического приложения (§s-tj38pvm38nepaf5) вне раздела о стеке (§s-vj7ercem526zd6v) и раздела технического долга (§s-2r7k2aeyusgy6fw): связь `implements` (§s-sn6au3vcr9uy5pm) с узлом базовой спецификации (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);
- узел описания инструментов SpecSheriff (§s-a4rbry4hsu34hy8): связь `implements` с правилом SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) или расширения guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);
- узел собственных guidelines проекта (§s-u7tw6m8npxmv5tu): связь `refines` (§s-sn6au3vcr9uy5pm) с правилом SpecSheriff guidelines или расширения, которое выбрал проект (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).

Отказ называет узел по его файлу, его sid и его расположению (§s-kag2m9tzdnduxdx).

`sheriff validate` определяет, к какой части спецификации принадлежит узел, по пути его файла (§s-zefk589ykh37b8u). Узел в ячейке `TableRule` он проверяет так же, как любой другой узел (§s-5fewsp22mmdz7y6).

**Обоснование:** Узел, связанный с правилом, на котором он основан, находится всякий раз, когда это правило меняется. Только читатель может судить, согласуются ли они по-прежнему.

**Пример 1:** Правило из `project.json` перечисляет тестовые фикстуры проекта и объявляет связь `implements` с правилом о таких фикстурах. `sheriff validate` отклоняет правило, поскольку оно не объявляет связи `refines`. Со связью `refines` на её месте правило проходит.

TWO READINGS:
- "the link named for it": (а) связь, указанная для этого узла в списке ниже; (б) связь, названная в честь узла. Контекст в пользу (а).
- "outside the section on the stack (§s-vj7ercem526zd6v) and the technical debt section": (а) вне обоих разделов; (б) узел вне раздела о стеке, а также узел раздела технического долга. Контекст в пользу (а).
- "tells which part of the specification a node belongs to": (а) определяет; (б) сообщает. Контекст в пользу (а).
- "is found whenever that rule changes": (а) его можно найти при изменении правила; (б) его кто-то или что-то автоматически находит при каждом изменении. Не ясно.
- "Only a reader": не сказано, читатель чего. Скорее всего, это человек или агент, читающий оба узла, в противоположность инструменту.
- "`sheriff validate` refuses the rule, since it declares no `refines` link": «the rule» — (а) правило из `project.json`; (б) правило о фикстурах, названное последним. Контекст в пользу (а).
- "in its place": «its» — (а) на месте связи `implements`; (б) на месте правила. Контекст в пользу (а).

LANGUAGE:
- "the link named for it" → "the link that the list below requires of it" — «named for» значит также «названный в честь».
- "tells which part of the specification a node belongs to by the path" → "determines which part of the specification a node belongs to from the path" — «tells» читается и как «сообщает».
- "is found whenever that rule changes" → "can be found whenever that rule changes" — действительный смысл — возможность; не уверен, что замена сохраняет задуманное.
- "refuses the rule, since it declares" → "refuses the rule of `project.json`, since it declares" — в предыдущем предложении названы два правила.

### part-b.md · s-6bmnsbskg6en4nf
TRANSLATION:
**Заголовок:** Копии файлов, которые поставляет плагин SpecSheriff.
**Текст:** `sheriff validate` отклоняет каждую копию файлов, которые общие для всех проектов и поставляются с инструментами SpecSheriff в плагине SpecSheriff (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). Такой файл он принимает только в репозитории, где пишутся SpecSheriff guidelines (§s-zefk589ykh37b8u).

Копия — это любой из следующих файлов, которые хранит репозиторий:
- `specs/_guidelines/spec.json` и `specs/_guidelines/tools.json`;
- каждый файл в `specs/_guidelines/extensions/`;
- каждый файл в `specs/_schema/` или в папке под ней, кроме `specs/_schema/project.schema.json`.

Отказ называет каждую копию. Пока репозиторий хранит копию, `sheriff validate` выполняет только проверку на копии.

**Обоснование:** В проекте инструменты SpecSheriff читают файлы, общие для всех проектов, из плагина SpecSheriff (§s-zefk589ykh37b8u). Копию в репозитории проекта читают люди и агенты, но ни один из инструментов SpecSheriff. Поэтому она незаметно отстаёт от действующих файлов.

**Пример 1:** Проект копирует `node.schema.json` в `specs/_schema/`, чтобы читать его рядом с собственным расширением схемы. `sheriff validate` отклоняет копию и называет её. Он принимает `specs/_schema/project.schema.json`, собственное расширение схемы проекта.

TWO READINGS:
- "each copy of the files": (а) каждую копию любого из этих файлов; (б) каждую копию всего набора файлов. Контекст в пользу (а).
- "While the repository keeps a copy": (а) до тех пор, пока; (б) в то время как, хотя. Контекст в пользу (а).
- "to read it beside its own extension of the schema": первое «it» — файл `node.schema.json`; «its» — (а) проекта; (б) файла. Контекст в пользу (а).

LANGUAGE:
- "each copy of the files that are common" → "each copy of a file that is common" — копия делается с одного файла, а множественное число допускает прочтение «копия всего набора»; при замене изменится согласование «come» → «comes».
- "While the repository keeps a copy" → "As long as the repository keeps a copy" — «while» читается и как противопоставление.