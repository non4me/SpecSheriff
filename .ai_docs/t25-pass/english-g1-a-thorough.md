### part-a.md · s-stxmhq3hgfndvn6
TRANSLATION:
**Title:** Расположение, отличающееся от вычисленного.
**Text:** `sheriff validate` отклоняет каждый узел спецификации, расположение которого (§s-kag2m9tzdnduxdx) отличается от вычисленного для него (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). В отказе указаны файл и sid узла, расположение, записанное в файле, и вычисленное расположение.
`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6).
**Reason:** Расположение сообщает читателю, где находится узел, только пока оно совпадает с вычисленным. `sheriff reindex` записывает все расположения после каждой правки, сделанной агентом (§s-477gtdrkw34dzxw). Поэтому отличающееся расположение либо написано вручную, либо осталось после перемещения узла, за которым не последовал запуск `sheriff reindex`.
TWO READINGS:
- "the files that the repository keeps": (а) файлы, которые лежат в репозитории, в отличие от полученных из плагина; (б) файлы, которые репозиторий сохраняет, то есть не удаляет. Контекст в пользу (а).
- "only while it is the computed one": "it" — (а) расположение; (б) узел. Контекст в пользу (а). Слово "only" можно на миг прочитать с "is": «где узел находится только».
- "that no `sheriff reindex` followed": (а) перемещение, после которого не запускали `sheriff reindex`; (б) узел, за которым `sheriff reindex` «не проследил». Контекст в пользу (а).
LANGUAGE:
- "the files that the repository keeps" → "the files kept in the repository" — у "keeps" с подлежащим "repository" есть оттенок «оставляет у себя»; пассив однозначен.
- "the location computed" → "the computed location" — причастие после существительного без дополнения звучит неестественно, а абзацем ниже уже стоит "the computed one".
- "left by a move of the node that no `sheriff reindex` followed" → "left behind when the node was moved and `sheriff reindex` was not run afterwards" — название команды с "no" как исчисляемое существительное и цепочка существительных; смысл сохранён.

### part-a.md · new:tools-7-1-location
TRANSLATION:
**Title:** Как вычисляется расположение узла спецификации.
**Text:** Инструменты SpecSheriff вычисляют расположение узла (§s-kag2m9tzdnduxdx) по пути его файла и его месту в спецификации. Они вычисляют его для каждого узла спецификации в файлах, которые хранит репозиторий.
Первый узел наверху файла guidelines, описания инструментов SpecSheriff (§s-a4rbry4hsu34hy8) или технического приложения (§s-tj38pvm38nepaf5) получает в качестве расположения путь этого файла внутри `specs/` без `.json` (§s-zefk589ykh37b8u). Примеры таких расположений: `_guidelines/spec`, `_guidelines/extensions/domains` и `tech/stack`. Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), заголовок домена (§s-yggv9myedprnaa7) получает в качестве расположения имя домена. Расположение любого другого узла — одно из следующего, затем косая черта и место узла:
- в файле guidelines, описания инструментов или технического приложения — расположение первого узла наверху этого файла, как в `_guidelines/spec/1.3.4`;
- в базовой спецификации (§s-5x737t9nee4zgaa) — имя папки внутри `specs/`, в которой лежит файл узла, как в `base/3.2`, `contracts/1` или `requests/2`.
Нумеруется каждый узел, кроме следующих:
- термин (§s-khqsmy6mhejkrhg), местом которого служит имя термина;
- первый узел наверху файла guidelines, описания инструментов или технического приложения;
- заголовок домена.
Место нумеруемого узла — его позиция среди нумеруемых узлов под его родителем, считая с единицы. Если родитель тоже нумеруется, перед этой позицией идут место родителя и точка, как в `3.2`.
Инструменты SpecSheriff берут нумеруемые узлы под узлом в порядке его дочерних узлов. Под `TableRule` (§s-5fewsp22mmdz7y6) узлы из его ячеек идут после его дочерних узлов: строка за строкой по его группам, а внутри строки — столбец за столбцом.
В папке базовой спецификации узлы наверху её файлов и дочерние узлы заголовка домена считаются узлами под одним родителем. Инструменты SpecSheriff берут их файл за файлом, в порядке кодовых точек путей файлов. Узлы наверху одного файла берутся в том порядке, в котором их перечисляет файл. Дочерние узлы заголовка домена занимают в этом порядке место заголовка.
В файле guidelines, описания инструментов или технического приложения каждый следующий узел наверху файла нумеруется под расположением первого узла, после дочерних узлов этого узла.
**Reason:** `sheriff reindex` записывает расположения, которые проверяет `sheriff validate` (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Поэтому обеим командам нужно одно вычисление, которое даёт каждому узлу собственное расположение, одинаковое на любой машине.
**Example 1:** Домен `requests` хранится в трёх файлах: в `specs/requests/00-requests.json` — его заголовок, в `specs/requests/intake.json` — одна секция, в `specs/requests/review.json` — другая. Расположение заголовка — `requests`, а секции — это `requests/1` и `requests/2`. Четвёртый узел второй секции — `TableRule`, `requests/2.4`, в каждой строке которого по одному узлу, поэтому узел в его третьей строке — `requests/2.4.3`. Ближайшая ошибка — нумеровать каждый файл с единицы, отчего обе секции получают расположение `requests/1`.
TWO READINGS:
- "the files that the repository keeps": (а) файлы, лежащие в репозитории; (б) файлы, которые репозиторий сохраняет, не удаляет. Контекст в пользу (а).
- "The first node at the top of a file": (а) первый из узлов верхнего уровня файла; (б) узел, записанный в самом начале файла. Дальше стоит "the nodes at the top of its files" во множественном числе, значит имеется в виду (а). То же в "the first node at the top of that file", "the first node at the top of a file" (в списке), "the nodes at the top of its files", "The nodes at the top of one file", "each further node at the top of the file".
- "its place in the specification": в первом предложении "place" читается как обычное слово, «где узел находится», то есть почти синоним самого расположения. Ниже "place" оказывается термином этого правила: номер или имя термина.
- "row by row through its groups": "groups" раньше не названы. Вероятно, это группы строк `TableRule`; читатель не знает, идёт ли порядок сначала по группам, затем по строкам.
- "take the header's place in that order": (а) встают в этом порядке на позицию, которую занимает заголовок (контекст в пользу этого); (б) получают «место» заголовка в смысле термина "place" этого правила, хотя у заголовка места нет; (в) заменяют собой заголовок.
- "in that order": (а) порядок обхода файлов по кодовым точкам (вероятнее по смыслу); (б) порядок, в котором файл перечисляет узлы (ближайший по тексту).
- "the same on every machine": (а) расположение одинаково на любой машине (контекст в пользу этого); (б) вычисление одинаково на любой машине.
- "Both therefore need": "Both" — две команды из предыдущего предложения; чтение однозначное, но словом они не названы.
- "The closest mistake": (а) ошибка, которую легче всего сделать; (б) ошибка, ближайшая к правильному решению. Сочетание не идиоматично, читатель выбирает сам.
LANGUAGE:
- "the files that the repository keeps" → "the files kept in the repository" — см. первый узел.
- "at the top of a file" → "at the top level of a file" — "at the top" читается как «в начале файла»; так же во всех шести вхождениях, перечисленных выше.
- "are considered nodes under one parent" → "are treated as nodes under one parent" — речь о том, как с ними обращаются инструменты, а не о мнении.
- "The SpecSheriff tools take the numbered nodes under a node in the order of the node's children" → "The SpecSheriff tools number the nodes under a node in the order of the node's children" — "take" без цели действия расплывчато; не уверен, что "number" точно передаёт задуманное.
- "The SpecSheriff tools take them file by file" → "The SpecSheriff tools go through them file by file" — то же "take".
- "and the sections are `requests/1` and `requests/2`" → "and the sections' locations are `requests/1` and `requests/2`" — секция не равна своему расположению.
- "The closest mistake is to number each file from one" → "The easiest mistake to make is to number each file from one" — "closest mistake" не сочетается; не уверен, что замена сохраняет смысл, если имелась в виду «ошибка, ближайшая к верному решению».

### part-a.md · s-95w92rnjuv3sst8
TRANSLATION:
**Title:** Одобренный узел спецификации без действующего одобрения.
**Text:** `sheriff validate` отклоняет каждый одобренный узел, для текущей формулировки которого нет действующего одобрения (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). В отказе узел назван по его файлу, sid и расположению (§s-kag2m9tzdnduxdx).
`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он пропускает следующие узлы, статус одобрения которых `sheriff reindex` выводит из других узлов (§s-ztseyetus7np6br):
- каждую секцию;
- каждый заголовок домена, если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu).
**Reason:** Статус одобрения узла записан в его файле, где любой может вручную поставить `approved`. Само одобрение записывается отдельно от узла, в `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb). Сравнение этих двух вещей находит статус одобрения, вписанный вручную, и статус, оставшийся `approved` после изменения формулировки.
**Example 1:** Человек вручную правит текст одобренного правила и коммитит изменение, не запустив `sheriff reindex`. `sheriff validate` отклоняет правило, так как для новой формулировки нет действующего одобрения. Если бы `sheriff reindex` был запущен, он сделал бы правило черновиком, и проверка прошла бы.
TWO READINGS:
- "a standing approval": (а) одобрение, которое остаётся в силе (контекст в пользу этого); (б) постоянное, заранее выданное одобрение, по образцу "standing order" и "standing permission".
- "the files that the repository keeps": (а) файлы, лежащие в репозитории; (б) файлы, которые репозиторий сохраняет. Контекст в пользу (а).
- "It leaves out the following nodes": (а) не проверяет эти узлы (контекст в пользу этого); (б) исключает их из отказа или отчёта.
- "each domain's header": (а) заголовок каждого домена (контекст в пользу этого); (б) каждый заголовок одного домена.
- "Comparing the two": «два» — статус одобрения в файле и запись об одобрении из двух предыдущих предложений; восстановимо, но вторая вещь названа "The approval itself", а не запись.
LANGUAGE:
- "without a standing approval" → "with no approval in force" — "standing approval" значит скорее «постоянное разрешение».
- "the files that the repository keeps" → "the files kept in the repository" — см. первый узел.
- "recorded apart from the node" → "recorded separately from the node" — "apart from" чаще значит «кроме».
- "Comparing the two finds an approval status typed by hand" → "Comparing the two reveals an approval status typed by hand" — находит не сравнение, а тот, кто сравнивает.
- "each domain's header" → "the header of each domain" — снимает второе чтение.

### part-a.md · new:tools-7-1-approval-by
TRANSLATION:
**Title:** Кого называет добавленное одобрение.
**Text:** `sheriff validate` принимает одобрение (§s-v4qus7raqnwzneb), которое коммит добавляет в `specs/_approvals.jsonl`, только если выполнены оба условия:
- его узел находится в файлах, которые хранит репозиторий;
- оно называет ответственного за этот узел (§s-6sk8uet75dmq5qz) по состоянию на этот коммит (§s-acacahc8c9estmr).
Любое другое одобрение, добавляемое коммитом, `sheriff validate` отклоняет. В отказе указаны sid и email-адрес, записанные в одобрении. Если узел есть в файлах, которые хранит репозиторий, в отказе указаны также файл узла, его расположение (§s-kag2m9tzdnduxdx) и ответственные за него.
Одобрение добавлено коммитом, если после коммита в `specs/_approvals.jsonl` больше строк, равных этому одобрению, чем в родителе коммита. Для merge-коммита родитель — его первый родитель. `sheriff validate` читает одобрения родителя в том виде, в который их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).
`sheriff validate` определяет ответственных за узел так, как их даёт модель спецификации (§s-w6gybeqn2ttydqx). Из строк, которые добавляет коммит, он проверяет только одобрения.
**Reason:** Одобрить узел могут только ответственные за него, а отозвать одобрение может кто угодно (§s-67vekyup7y8smap, §s-fpq35tf3pehgk64). Ответственные за узел могут меняться от коммита к коммиту, поэтому каждое одобрение оценивается в том коммите, который его добавляет. Тогда более поздняя смена ответственных оставляет в силе одобрения, данные до неё.
**Example 1:** Ближайшая секция над правилом называет ответственным `a@example.com`. Коммит добавляет одобрение правила от `b@example.com`, и `sheriff validate` отклоняет его, называя оба адреса. Коммит, который к тому же делает `b@example.com` ответственным за эту секцию, принимается. Ближайшая ошибка — оценивать одобрение по ответственным, записанным в родителе коммита: тогда этот второй коммит был бы отклонён.
TWO READINGS:
- "the files that the repository keeps": (а) файлы, лежащие в репозитории; (б) файлы, которые репозиторий сохраняет. Контекст в пользу (а). То же в "Where the files that the repository keeps hold the node".
- "its node": узел, к которому относится одобрение; это наиболее вероятно, но связь «одобрение — его узел» нигде не названа. Строже было бы «узел, чей sid записан в одобрении».
- "as of that commit": (а) ответственный по состоянию дерева этого коммита, то есть после его изменений (так подтверждает пример); (б) ответственный на момент коммита, то есть до его изменений.
- "An approval is added by a commit where": "where" — (а) условие «если»; (б) определение «коммитом, в котором». Смысл почти тот же, но при (б) предложение читается как описание коммита, а не определение «добавлено».
- "Of the lines that a commit adds, it checks only approvals": (а) из добавленных строк проверяются только те, что являются одобрениями (контекст в пользу этого); (б) в добавленных строках проверяется только факт одобрения и ничего больше.
- "may approve it" / "may withdraw": разрешение. "may change from one commit to the next": возможность. В соседних предложениях "may" стоит в двух разных значениях.
- "is judged in the commit that adds it": (а) оценивается по состоянию ответственных в этом коммите (контекст в пользу этого); (б) проверка выполняется в момент этого коммита.
- "`sheriff validate` refuses it": "it" — (а) одобрение (контекст в пользу этого); (б) коммит.
- "A commit that also makes": "also" — (а) коммит, который добавляет то же одобрение и вдобавок делает `b@example.com` ответственным (подразумевается); (б) другой коммит, который тоже назначает ответственного. Что этот коммит добавляет одобрение, не сказано.
- "is accepted": принимается коммит, тогда как правило говорит о принятии одобрения; читатель не знает, одно ли это и то же.
- "The closest mistake": (а) самая лёгкая ошибка; (б) ошибка, ближайшая к верному решению.
LANGUAGE:
- "the files that the repository keeps" → "the files kept in the repository" — см. первый узел (оба вхождения).
- "Where the files that the repository keeps hold the node" → "Where the node is in the files kept in the repository" — два глагола подряд ("keeps hold") читаются как "keeps hold of".
- "finds a node's owners as the model of the specification gives them" → "takes a node's owners from the model of the specification" — "finds … as … gives them" не естественная конструкция; смысл сохранён.
- "is judged in the commit that adds it" → "is judged against the owners as of the commit that adds it" — "judged in the commit" не говорит, с чем сверяют; не уверен, что замена точно совпадает с задуманным.
- "A commit that also makes `b@example.com` an owner of that section is accepted" → "A commit that adds the same approval and also makes `b@example.com` an owner of that section passes the check" — без первой части "also" не к чему отнести.
- "the owners that the commit's parent holds" → "the owners named in the commit's parent" — коммит не «держит» ответственных.
- "The closest mistake is to judge" → "The easiest mistake to make is to judge" — "closest mistake" не сочетается; не уверен, что замена сохраняет задуманный смысл.

### part-a.md · s-agc6fb3vx46pc23
TRANSLATION:
**Title:** Значения, построенные из других узлов спецификации.
**Text:** `sheriff validate` отклоняет каждый узел, в котором значение, построенное из других узлов, отличается от значения, которое записал бы `sheriff reindex` (§s-ztseyetus7np6br). Он вычисляет следующие значения:
- связи, указывающие на каждый узел (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), сравниваемые без учёта их порядка;
- статус одобрения каждой секции (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);
- если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm) — статус одобрения каждого заголовка домена (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);
- если проект выбрал расширение Domains — индекс секций в каждом заголовке домена (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);
- если проект выбрал расширение RecordType (§s-hzuzn8hbq6q9q4s) — значения, собранные рядом с каждым полем с `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).
`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). В отказе узел назван по его файлу, sid и расположению в спецификации (§s-kag2m9tzdnduxdx), и названо отличающееся значение.
**Reason:** После правки одного узла построенное из него значение остаётся устаревшим, пока не запущен `sheriff reindex`. Вычисление каждого такого значения заново находит коммит, содержащий устаревшее значение или значение, написанное вручную.
**Example 1:** В секции есть `TableRule`, в одной из ячеек которого находится узел-черновик, а все остальные узлы под секцией одобрены. `sheriff validate` вычисляет статус одобрения секции как черновик и отклоняет секцию, если в её файле она помечена одобренной. Ближайшая ошибка — считать только узлы из `children` узла, из-за чего узел в ячейке пропускается.
TWO READINGS:
- "It computes the following values": "It" — (а) `sheriff validate` (подлежащее предыдущего предложения, контекст в пользу этого); (б) `sheriff reindex` (ближайшее существительное).
- "the approval status of each domain's header": (а) статус заголовка каждого домена; (б) статус каждого заголовка домена. Контекст в пользу (а).
- "the index of sections in each domain's header": (а) индекс секций, который находится в заголовке; (б) индекс тех секций, что находятся в заголовке. Контекст в пользу (а).
- "the values gathered beside each field with `enum`": "beside" — (а) значения, записанные рядом с полем в узле; (б) значения, собранные помимо поля. "with `enum`" — (а) поле, у которого есть `enum`; (б) собранные с помощью `enum`. Контекст в пользу (а) в обоих случаях.
- "the files that the repository keeps": (а) файлы, лежащие в репозитории; (б) файлы, которые репозиторий сохраняет. Контекст в пользу (а).
- "or one written by hand": "one" — (а) значение, написанное вручную (контекст в пользу этого); (б) коммит, написанный вручную.
- "The closest mistake": (а) самая лёгкая ошибка; (б) ошибка, ближайшая к верному решению.
LANGUAGE:
- "It computes the following values" → "`sheriff validate` computes the following values" — местоимение стоит сразу после другой команды.
- "the files that the repository keeps" → "the files kept in the repository" — см. первый узел.
- "the values gathered beside each field with `enum`" → "the values gathered next to each field that has an `enum`" — "beside" в техническом тексте читается и как «помимо», "with" двусмысленно; не уверен, что "next to" точно передаёт задуманное место записи.
- "Computing every such value anew finds a commit" → "Computing every such value again reveals a commit" — "anew" книжное, а «находит» не вычисление.
- "or one written by hand" → "or a value written by hand" — снимает второе чтение.
- "The closest mistake is to count" → "The easiest mistake to make is to count" — "closest mistake" не сочетается; не уверен, что замена сохраняет задуманный смысл.

### part-a.md · new:tools-7-1-one-header
TRANSLATION:
**Title:** Один заголовок на каждый домен спецификации.
**Text:** Если проект выбрал расширение Domains (§s-tdm3rwsppnuh6dm), `sheriff validate` принимает домен, только если в файлах домена ровно один заголовок (§s-yggv9myedprnaa7, §s-ctj5v22yn7wr7n4). Файлы домена — те, что лежат в его папке `specs/<domain>/` (§s-zefk589ykh37b8u).
Любой другой домен `sheriff validate` отклоняет. В отказе указаны папка домена и, для каждого заголовка, который есть в файлах домена, файл и sid этого заголовка.
**Reason:** Домен может храниться в нескольких файлах (§s-k73czmpkazcx7mu). Поэтому только чтение их всех показывает отсутствующий заголовок или второй заголовок.
**Example 1:** Домен `requests` хранится в `specs/requests/00-requests.json` и `specs/requests/intake.json`, и тот, кто его разделил, начал и второй файл с нового заголовка. `sheriff validate` отклоняет домен и называет оба заголовка. Как только во втором файле остаются только секции, домен проходит проверку.
TWO READINGS:
- "A domain may be kept in several files": "may" — (а) разрешено хранить; (б) возможно, что хранится. Ссылка на правило говорит в пользу (а), а следующее "So" опирается на (б).
- "with a new header as well": "as well" — (а) второй файл тоже начат с заголовка, как и первый (контекст в пользу этого); (б) во втором файле заголовок добавлен вдобавок к чему-то ещё.
LANGUAGE:
- "So only a reading of all of them shows a missing header or a second one" → "So only reading all of them reveals that a header is missing or that there is a second one" — "a reading of" значит скорее «толкование», а «показать отсутствующий заголовок» нельзя.

### part-a.md · new:tools-7-1-link-target
TRANSLATION:
**Title:** Цель связи между узлами спецификации.
**Text:** `sheriff validate` принимает связь, только если её цель — sid узла модели спецификации (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). Он отклоняет любую другую связь, которую объявляет узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). В отказе узел, объявляющий связь, назван по его файлу, sid и расположению в спецификации (§s-kag2m9tzdnduxdx), и названы тип связи и её цель.
**Reason:** Пройти можно только по связи, цель которой — узел спецификации. Только такая связь встраивается в этот узел, в число указывающих на него связей (§s-bpdqd9v72wg7vsz).
**Example 1:** В правиле остаётся связь `refines` с правилом, которое более поздний коммит удалил и отправил в архив. `sheriff validate` отклоняет связь, так как ни один узел спецификации больше не имеет sid удалённого правила. Ближайшая ошибка — искать цель только среди узлов файлов, которые хранит репозиторий. Правило собственных guidelines проекта уточняет правило SpecSheriff guidelines, которые проект берёт из плагина SpecSheriff, и `sheriff validate` принимает эту связь.
TWO READINGS:
- "the files that the repository keeps": (а) файлы, лежащие в репозитории, в отличие от взятых из плагина (пример это подтверждает); (б) файлы, которые репозиторий сохраняет. То же в "the nodes of the files that the repository keeps".
- "any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included": хвост "a node in a cell … included" — (а) уточнение к «узлу, объявляющему связь» (задумано, видимо, это); (б) уточнение к «связи» или к «файлам». Глагол "declares" стоит далеко от "that", и хвост повисает после него.
- "It refuses any other link": "It" — `sheriff validate` из предыдущего предложения; чтение однозначное.
- "is built into that node": "that node" — (а) целевой узел из предыдущего предложения (контекст в пользу этого); (б) узел, объявляющий связь. Кроме того, читается так, будто в узел встраивается сама связь, а не обратная запись о ней.
- "among the links pointing at it": "it" — тот же узел; чтение зависит от предыдущего пункта.
- "a rule that a later commit removed": "later" — (а) позже, чем появилась связь (контекст в пользу этого); (б) позже неназванного момента.
- "which the project takes from the SpecSheriff plugin": "which" — (а) SpecSheriff guidelines (контекст в пользу этого); (б) правило SpecSheriff guidelines.
- "A rule of a project's own guidelines refines a rule of the SpecSheriff guidelines": (а) отдельный случай, показывающий, почему ошибка — ошибка (задумано, видимо, это); (б) общее утверждение: всякое правило собственных guidelines уточняет правило SpecSheriff guidelines. Связки вроде "For example" или "Suppose" нет.
- "accepts that link": "that link" — связь `refines`, которая в предложении названа только глаголом "refines"; раньше в предложении слова "link" нет.
- "The closest mistake": (а) самая лёгкая ошибка; (б) ошибка, ближайшая к верному решению.
LANGUAGE:
- "It refuses any other link that a node of the specification in the files that the repository keeps declares, a node in a cell of a `TableRule` included" → "It refuses any other link declared by a node of the specification in the files kept in the repository, including a node in a cell of a `TableRule`" — два вложенных "that", глагол в самом конце и оторванный хвост; смысл сохранён.
- "the nodes of the files that the repository keeps" → "the nodes in the files kept in the repository" — узлы находятся в файлах ("in", не "of"), и "keeps" см. первый узел.
- "Only such a link is built into that node, among the links pointing at it" → "Only such a link is recorded in its target, among the links pointing to that node" — "built into that node" не говорит, в какой узел; не уверен, что "recorded" равно задуманному "built".
- "A rule keeps a `refines` link to a rule" → "A rule still has a `refines` link to a rule" — "keeps" здесь значит «по-прежнему содержит», что "still has" говорит прямо.
- "A rule of a project's own guidelines refines a rule of the SpecSheriff guidelines" → "Suppose a rule of a project's own guidelines refines a rule of the SpecSheriff guidelines" — без вводного слова пример читается как общее утверждение; остаток предложения тогда надо перестроить.
- "The closest mistake is to look for" → "The easiest mistake to make is to look for" — "closest mistake" не сочетается; не уверен, что замена сохраняет задуманный смысл.