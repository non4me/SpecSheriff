# Follow-on drafts, part B

#### proposal:new-tools-8-symbol-bq | tools 8.2 (new) | sid s-33fw3ga4ctd94dq | agreed undefined | base new:tools-8-symbol
TITLE: SpecTags in a file whose language is described / SpecTag в файле на описанном языке
  0 [p] In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol, above its decorators where it has any. That comment is:
      RU: В файле на языке, описанном в папке `languages/` инструментов SpecSheriff, SpecTag (§s-5z5gnu7pahr82xp) символа (§s-kgbzk2ph9e6jfb4) — это строки комментария непосредственно над символом, над его декораторами, если они есть. Этот комментарий:
  1 [li] in TypeScript and JavaScript, the symbol's doc comment;
      RU: в TypeScript и JavaScript — документирующий комментарий символа;
  2 [li] in Python, one or more comment lines.
      RU: в Python — одна или несколько строк комментария.
  3 [p] In JSON Schema, which allows no comments, the symbols of a file are the definitions under the `$defs` of its top-level object. A definition's SpecTags are the lines of the string in its `$comment` (§s-kgbzk2ph9e6jfb4).
      RU: В JSON Schema, где нет комментариев, символы файла — это определения в `$defs` его объекта верхнего уровня. SpecTag определения — это строки текста в его `$comment` (§s-kgbzk2ph9e6jfb4).
  4 [p] Only the delimiters of the comment may share a SpecTag's line.
      RU: Делить строку с SpecTag могут только ограничители комментария.
  5 [p] The code outside every symbol of a file, other than its imports, is bound by the SpecTags in the file's first comment (§s-kgbzk2ph9e6jfb4). That comment counts only where it comes before any code and is not directly above a symbol. In JSON Schema, those SpecTags are the lines of the `$comment` of the file's top-level object.
      RU: Код файла вне всех символов, кроме импортов, привязывают SpecTag в первом комментарии файла (§s-kgbzk2ph9e6jfb4). Этот комментарий учитывается, только если он стоит раньше любого кода и не находится непосредственно над символом. В JSON Schema такие SpecTag — это строки `$comment` объекта верхнего уровня файла.
  6 [p] Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own.
      RU: Если у первого в ряду реэкспортов, между которыми нет пустой строки, есть `@spec none`, этот SpecTag привязывает и каждый следующий реэкспорт ряда, у которого нет своего SpecTag.
  7 [p] The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They parse each file on its own, with the parser alone and no type checker.
      RU: Символ, над которым стоит SpecTag, инструменты SpecSheriff находят, разбирая файл с помощью tree-sitter и грамматики языка файла. Они разбирают каждый файл отдельно, только парсером и без проверки типов.
  8 [p] The description of each language names what counts in that language as a symbol, as an import and as a test. TypeScript, JavaScript, Python and JSON Schema are described. A JSON file is in JSON Schema where its top-level object's `$schema` is `https://json-schema.org/draft/2020-12/schema`, and the `$schema` and the `$id` of that object count as its imports.
      RU: Описание каждого языка называет, что в нём считается символом, что импортом и что тестом. Описаны TypeScript, JavaScript, Python и JSON Schema. Файл JSON написан на JSON Schema, если `$schema` его объекта верхнего уровня — `https://json-schema.org/draft/2020-12/schema`, а `$schema` и `$id` этого объекта считаются его импортами.
REASON: A SpecTag sits where a reader of the symbol's code already looks. There, a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time.
  RU: SpecTag стоит там, куда уже смотрит читатель символа. Там парсер, в отличие от поиска по тексту, определяет, какой символ привязывает SpecTag, — одинаково для одного и того же файла каждый раз.
EX0: In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function: the SpecTag is then directly above no symbol and binds nothing.
  RU: В TypeScript `/** @spec s-… */` непосредственно над `export function close()` привязывает функцию и каждый вложенный в неё символ. Самая вероятная ошибка — пустая строка между комментарием и функцией: тогда SpecTag не стоит непосредственно ни над каким символом и ничего не привязывает.
REFS: implements:s-kgbzk2ph9e6jfb4 cites:s-5z5gnu7pahr82xp
STAGE3: languages/ is to describe JSON Schema (a JSON file whose $schema is that of draft 2020-12): its symbols are the definitions under $defs, their SpecTags the lines of their $comment, and $schema and $id its imports; each description is to name what counts as an import. code.ts is to read the SpecTags of the code outside every symbol from the file's first comment where that comment precedes any code and is not directly above a symbol, and in JSON Schema from the top-level $comment. Tests for each are written first and carry this sid.

#### proposal:s-2x58az67bm6cxq2-bq | tools 7.2.1 | sid s-2x58az67bm6cxq2 | agreed undefined | base s-2x58az67bm6cxq2
TITLE: What a commit adds, changes and removes in the code and the tests / Что коммит добавляет, меняет и удаляет в коде и тестах
  0 [p] The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path. A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, however git is configured on the machine.
      RU: Инструменты SpecSheriff находят, что коммит добавляет, меняет и удаляет в коде системы (§s-hheus6f395ynqvc), в том числе в его тестах. Они сравнивают каждый файл в том виде, в каком его оставляет коммит, с тем же файлом в родительском коммите. Для коммита слияния родитель — его первый родитель. Первый коммит репозитория сравнивается с пустым репозиторием. Файл, который коммит перемещает или переименовывает, сравнивается с файлом по его прежнему пути. Строка, которую коммит добавляет или удаляет, — это строка, которую git показывает добавленной или удалённой, когда сравнивает две версии файла алгоритмом Майерса, принятым в git по умолчанию, при любых настройках git на машине.
  1 [p] A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.
      RU: Коммит меняет только те символы (§s-kgbzk2ph9e6jfb4), файлы, привязанные целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), и тесты (§s-zrsc6asgmhv8tnc), которые есть и в родительском коммите, и в самом коммите. Каждый из них, который есть только в коммите, он добавляет. Каждый, который есть только в родительском коммите, он удаляет.
  2 [p] A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test extends from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.
      RU: Коммит меняет символ, тест или файл, привязанный целиком, если две его версии различаются (§s-u6mj5yv8ngnz79v). Символ или тест занимает строки от своей первой до последней, включая его декораторы. Поэтому изменение во вложенном символе меняет и каждый символ, в который он вложен.
  3 [p] In a file whose language a description covers (§s-33fw3ga4ctd94dq), the code outside every symbol, other than imports, is treated as one more symbol of that file. A finding names that symbol by the file alone.
      RU: В файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), код вне всех символов, кроме импортов, считается ещё одним символом этого файла. Находка называет этот символ только по файлу.
  4 [p] A symbol or a test in the commit's parent is the same as the one with the same name, nested in symbols with the same names, in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
      RU: Символ или тест в родительском коммите — тот, что с тем же именем и вложен в символы с теми же именами, в файле в том виде, в каком его оставляет коммит. Тест, который коммит переименовывает, сохраняя его SpecTag и больше ничего в нём не меняя, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
  5 [p] A commit also changes each symbol, file bound as a whole and test whose SpecTags it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).
      RU: Коммит меняет также каждый символ, файл, привязанный целиком, и тест, SpecTag которых он меняет (§s-9j2mmnuuwmx5ksn). Коммит меняет SpecTag символа, файла или теста, если SpecTag привязывает его либо в родительском коммите, либо после коммита, но не в обоих случаях. Два SpecTag одинаковы, только если одинаковы их тексты, в том числе текст после `@spec none` (§s-5z5gnu7pahr82xp).
  6 [p] A commit adds an entry of the bindings file (§s-trwczfskj5zmuft) where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.
      RU: Коммит добавляет запись файла привязок (§s-trwczfskj5zmuft), если в родительском коммите нет записи для того же файла. Он меняет запись, SpecTag которой отличаются от SpecTag записи того же файла в родительском коммите.
  7 [p] A commit adds or changes each SpecTag of the following kinds:
      RU: Коммит добавляет или меняет каждый SpecTag следующих видов:
  8 [li] a SpecTag on a line that the commit adds;
      RU: SpecTag на строке, которую коммит добавляет;
  9 [li] a SpecTag in an entry that the commit adds or changes.
      RU: SpecTag в записи, которую коммит добавляет или меняет.
  10 [p] The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.
      RU: Исключение — SpecTag, который привязывает тот же символ, файл или тест с тем же текстом, что и в родительском коммите.
  11 [p] A commit leaves unchanged each symbol, file bound as a whole and test that it leaves in the repository and neither adds nor changes.
      RU: Коммит оставляет неизменными каждый символ, файл, привязанный целиком, и тест, которые он оставляет в репозитории и не добавляет и не меняет.
REASON: The checks of a commit judge code and tests according to whether the commit adds, changes, removes or leaves them unchanged. A single definition of each of these lets every check judge the same code and tests in the same way.
  RU: Проверки коммита оценивают код и тесты в зависимости от того, добавляет ли их коммит, меняет, удаляет или оставляет неизменными. Единое определение каждого из этих случаев позволяет каждой проверке одинаково оценивать одни и те же код и тесты.
EX0: A commit deletes the line `log(id);` inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent contains that line, so the two versions produce different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.
  RU: Коммит удаляет строку `log(id);` внутри функции `close` и больше ничего в ней не меняет. Версия `close` в родительском коммите содержит эту строку, поэтому две версии дают разные синтаксические деревья, и коммит меняет `close`. Самая вероятная ошибка — смотреть только на строки, которые коммит добавляет: тогда изменение, сделанное удалением строк, пропускается.
EX1: A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools parse both versions with the grammar of CSS and leave the comment out of both trees. The trees are the same, so the commit does not change the stylesheet's code. The most likely mistake is to count any change to the text of a file bound as a whole as a change to its code.
  RU: Коммит меняет формулировку комментария в таблице стилей, привязанной SpecTag в начале файла, и больше ничего в ней не меняет. Инструменты SpecSheriff разбирают обе версии грамматикой CSS и исключают комментарий из обоих деревьев. Деревья одинаковы, поэтому коммит не меняет кода таблицы стилей. Самая вероятная ошибка — считать любое изменение текста файла, привязанного целиком, изменением его кода.
REFS: implements:s-9j2mmnuuwmx5ksn implements:s-kgbzk2ph9e6jfb4 cites:s-hheus6f395ynqvc cites:s-zrsc6asgmhv8tnc cites:s-u6mj5yv8ngnz79v cites:s-5qdjyf6t898rsd4 cites:s-trwczfskj5zmuft cites:s-5z5gnu7pahr82xp cites:s-8xw4mgvpexyvw5q cites:s-33fw3ga4ctd94dq
STAGE3: binding.ts (readCommit) is to compare the code outside every symbol of a file, imports aside, between the two versions as it compares a symbol. A test is written first and carries this sid.

#### proposal:s-weuyx98r7c923ab-bq | tools 2.11 | sid s-weuyx98r7c923ab | agreed undefined | base proposal:s-weuyx98r7c923ab
TITLE: The list of code that no SpecTag binds / Перечень кода, который не привязывает ни один SpecTag
  0 [p] `sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-3xx2eukc8gtd2tx), including the tests. The check for such code names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn).
      RU: `sheriff untagged` перечисляет по файлам и символам код системы (§s-hheus6f395ynqvc), включая тесты, который не привязывает ни один SpecTag (§s-8xw4mgvpexyvw5q, §s-3xx2eukc8gtd2tx). Проверка такого кода называет эту команду в своём предупреждении и отказе (§s-kkbqcb9xrpaepwn).
  1 [p] `sheriff untagged` lists the code outside every symbol of a file, which the SpecSheriff tools treat as a symbol (§s-2x58az67bm6cxq2), under the file's name alone.
      RU: Код файла вне всех символов, который инструменты SpecSheriff считают символом (§s-2x58az67bm6cxq2), `sheriff untagged` перечисляет только под именем файла.
REASON: In one warning, the check covers all the code that no SpecTag binds, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn). `sheriff untagged` lists that code symbol by symbol for whoever has to bind each symbol to the rules it implements.
  RU: Проверка сообщает обо всём коде, который не привязан ни одним SpecTag, одним предупреждением, чтобы оно не заслоняло другие находки (§s-kkbqcb9xrpaepwn). `sheriff untagged` перечисляет этот код символ за символом для того, кому нужно связать его с его правилами.
EX0: An old function carries the SpecTag `@spec s-…`, which names a section, and no other SpecTag. `sheriff untagged` lists the function with its file, since that SpecTag binds nothing. The most likely mistake is to list only code that carries no SpecTag at all, so that the function is missing from the list that the warning points to.
  RU: У старой функции есть SpecTag `@spec s-…`, который называет раздел, и больше никакого SpecTag. `sheriff untagged` перечисляет эту функцию с её файлом, потому что этот SpecTag ничего не привязывает. Самая вероятная ошибка — перечислять только код, у которого нет SpecTag совсем: тогда функции нет в перечне, на который указывает предупреждение.
REFS: implements:s-kkbqcb9xrpaepwn cites:s-hheus6f395ynqvc cites:s-8xw4mgvpexyvw5q cites:s-3xx2eukc8gtd2tx cites:s-2x58az67bm6cxq2
STAGE3: sheriff untagged is to list the code outside every symbol of a file that no SpecTag binds, under the file's name. A test is written first and carries this sid.

#### proposal:s-9rtrj24myzjvshu-bq | tools 7.2.2 | sid s-9rtrj24myzjvshu | agreed undefined | base s-9rtrj24myzjvshu
TITLE: SpecTags on the system's code other than tests / SpecTag в коде системы помимо тестов
  0 [p] `sheriff binding` refuses each of the following that the commit adds or changes (§s-2x58az67bm6cxq2) in the system's code (§s-hheus6f395ynqvc), other than tests, or in the bindings file (§s-trwczfskj5zmuft), whether the specification is approved or a draft (§s-k6dzuajejrw4cej):
      RU: `sheriff binding` отвергает каждое из следующего, что коммит добавляет или меняет (§s-2x58az67bm6cxq2) в коде системы (§s-hheus6f395ynqvc), помимо тестов, или в файле привязок (§s-trwczfskj5zmuft), независимо от того, одобрена спецификация или она черновик (§s-k6dzuajejrw4cej):
  1 [li] a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;
      RU: символ (§s-kgbzk2ph9e6jfb4), который не привязывает ни один SpecTag (§s-5z5gnu7pahr82xp);
  2 [li] in a file whose language a description covers, the code outside every symbol, other than imports (§s-2x58az67bm6cxq2), that no SpecTag binds;
      RU: в файле на языке, для которого есть описание, код вне всех символов, кроме импортов (§s-2x58az67bm6cxq2), который не привязывает ни один SpecTag;
  3 [li] a file that is to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and that no SpecTag binds;
      RU: файл, который должен быть привязан целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), но который не привязывает ни один SpecTag;
  4 [li] in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment, or in JSON Schema in any `$comment`, other than one that holds the SpecTags of a symbol or of the code outside every symbol;
      RU: в файле на языке, для которого есть описание (§s-33fw3ga4ctd94dq), SpecTag в любом комментарии, а в JSON Schema — в любом `$comment`, кроме тех, что содержат SpecTag символа или кода вне всех символов;
  5 [li] in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;
      RU: в таком файле SpecTag, который делит строку с чем-либо, кроме ограничителей комментария;
  6 [li] in a file to be bound by SpecTags at its start (§s-5qdjyf6t898rsd4), a SpecTag on a line after that start;
      RU: в файле, который должен быть привязан SpecTag в начале (§s-5qdjyf6t898rsd4), SpecTag на строке после этого начала;
  7 [li] where a SpecTag may be placed, text that begins with `@spec` but matches none of the forms of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;
      RU: там, где может стоять SpecTag, текст, который начинается с `@spec`, но не имеет ни одной из форм SpecTag (§s-5z5gnu7pahr82xp), например `@spec none` без текста после него;
  8 [li] an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, whose format allows comments, or whose language a description covers;
      RU: запись в файле привязок (§s-trwczfskj5zmuft) для файла, который не относится к коду системы помимо тестов, формат которого допускает комментарии или для языка которого есть описание;
  9 [li] a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);
      RU: SpecTag, sid которого называет узел модели спецификации (§s-w6gybeqn2ttydqx), не являющийся правилом (§s-5z5gnu7pahr82xp);
  10 [li] a SpecTag on code that carries `@spec none` together with another SpecTag.
      RU: SpecTag кода, у которого есть `@spec none` вместе с другим SpecTag.
  11 [p] The refusal names the file and, where it concerns a symbol or a line, that symbol or line.
      RU: Отказ называет файл, а если он касается символа или строки — этот символ или строку.
  12 [p] A SpecTag or an entry of a kind that this list refuses binds nothing. Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx).
      RU: SpecTag или запись того вида, который отвергает этот список, ничего не привязывает. Код, который коммит оставляет неизменным и который не привязывает ни один SpecTag, обрабатывает проверка кода и тестов за пределами коммита (§s-3xx2eukc8gtd2tx).
REASON: A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code that it is meant to bind is then as unbound as code with no SpecTag.
  RU: SpecTag, который нельзя отнести к одному символу или одному файлу или который называет узел, который никакой код не может реализовать, ничего не привязывает. Код, который он должен привязывать, тогда так же не привязан, как код без SpecTag.
EX0: A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.
  RU: Коммит добавляет функцию, у которой есть `/** @spec s-… */`, sid которого — sid раздела, где лежат правила, которые реализует функция. `sheriff binding` отвергает этот SpecTag, потому что раздел не требует ничего, что мог бы реализовать код. Самая вероятная ошибка — принять SpecTag, потому что его узел существует: тогда функция не привязана ни к одному правилу.
REFS: implements:s-k6dzuajejrw4cej cites:s-hheus6f395ynqvc cites:s-2x58az67bm6cxq2 cites:s-kgbzk2ph9e6jfb4 cites:s-33fw3ga4ctd94dq cites:s-5z5gnu7pahr82xp cites:s-5qdjyf6t898rsd4 cites:s-trwczfskj5zmuft cites:s-w6gybeqn2ttydqx cites:s-3xx2eukc8gtd2tx
STAGE3: binding.ts is to refuse, in what the commit adds or changes, code outside every symbol that no SpecTag binds, to accept the SpecTags of that code in the file's first comment and in the top-level $comment of a file in JSON Schema, to accept a definition's SpecTags in its $comment, and to refuse an entry in sheriff.bindings.json for a file whose language a description covers. Tests for each are written first and carry this sid.

#### proposal:new-tools-7-3-review-code-bq | tools 7.3.4a (new, after "The review of a commit") | sid s-rd9nftptjuz6bwv | agreed undefined | base proposal:new-tools-7-3-review-code
TITLE: The judgement on the code that a commit changes / Суждение о коде, изменённом коммитом
  0 [p] `sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.
      RU: `sheriff review` отклоняет коммит, если независимый рецензент (§s-m4h279nbaqkpa3t) отклоняет его из-за дефекта в коде, который коммит добавляет или меняет (§s-zn4vrdpnv9bch62). Каждое замечание называет правило, которого оно касается, файл и строку.
  1 [p] The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests, outside the files generated from the specification (§s-qyjw8xez6t6adc3). Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code outside the files generated from the specification. That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
      RU: Рецензент судит изменённый код при каждом коммите, который добавляет или меняет код системы (§s-hheus6f395ynqvc), в том числе его тесты, вне файлов, сгенерированных из спецификации (§s-qyjw8xez6t6adc3). Помимо того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт рецензенту изменённый код вне файлов, сгенерированных из спецификации. Этот код состоит из следующего, каждое целиком в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag (§s-8xw4mgvpexyvw5q), которые его привязывают:
  2 [li] each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);
      RU: каждый символ (§s-kgbzk2ph9e6jfb4), код которого коммит добавляет или меняет (§s-2x58az67bm6cxq2);
  3 [li] each file that the commit adds or changes and that is bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);
      RU: каждый файл, привязанный целиком (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft), который коммит добавляет или меняет;
  4 [li] each test that the commit adds or changes.
      RU: каждый тест, который коммит добавляет или меняет.
  5 [p] The code outside every symbol of a file, which the SpecSheriff tools treat as a symbol (§s-2x58az67bm6cxq2), is given in the same way.
      RU: Код файла вне всех символов, который инструменты SpecSheriff считают символом (§s-2x58az67bm6cxq2), передаётся так же.
  6 [p] The reviewer refuses the commit where any of the following holds:
      RU: Рецензент отклоняет коммит, если выполнено что-либо из следующего:
  7 [li] a changed symbol or file whose SpecTags name rules does something that none of those rules states;
      RU: изменённый символ или файл, SpecTag которого называют правила, делает то, чего не утверждает ни одно из этих правил;
  8 [li] a changed test checks something that the rule its SpecTag names does not state;
      RU: изменённый тест проверяет то, чего не утверждает правило, которое называет его SpecTag;
  9 [li] the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names outside an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);
      RU: изменённый код помимо тестов упускает то, чего требует правило, которое называет SpecTag на этом коде или которое сообщение коммита называет иначе, чем в trailer `Implementation-Needs-No-Change` (§s-7gab4ptjt2khfr5);
  10 [li] a changed symbol or file carries a SpecTag naming a rule that it does not implement;
      RU: у изменённого символа или файла есть SpecTag, который называет правило, которое этот символ или файл не реализует;
  11 [li] a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);
      RU: у изменённого символа или файла есть `@spec none` (§s-5z5gnu7pahr82xp), но он реализует логику системы (§s-2jcmb9xe9d64t2t);
  12 [li] a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).
      RU: у изменённого символа или файла есть `@spec none`, текст которого не говорит, чего от него требует технология, на которой построена система (§s-5z5gnu7pahr82xp).
  13 [p] A finding on code that carries `@spec none` names the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4) as the rule that it concerns.
      RU: Замечание о коде, у которого есть `@spec none`, называет правилом, которого оно касается, правило о том, как код привязывается к своим правилам (§s-kgbzk2ph9e6jfb4).
REASON: A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be judged only by reading it.
  RU: SpecTag показывает только, какое правило должен реализовывать код. Делает ли код только то, что говорит это правило, в том числе в неизменённых строках рядом с изменением, можно узнать, только прочитав его.
EX0: A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names says anything about the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email goes unnoticed.
  RU: Коммит меняет одну строку функции `close`, SpecTag которой называет правило: счёт можно закрыть, только если его баланс равен нулю. Неизменённая строка той же функции ещё и отправляет владельцу счёта письмо. Рецензент получает функцию целиком и находит, что о письме не говорит ни одно правило, которое называет её SpecTag. `sheriff review` отклоняет коммит, называя правило и эту строку. Самая вероятная ошибка — передать рецензенту только изменённую строку: тогда письмо проходит незамеченным.
REFS: implements:s-zn4vrdpnv9bch62 cites:s-m4h279nbaqkpa3t cites:s-hheus6f395ynqvc cites:s-vp24dqydygztqbt cites:s-8xw4mgvpexyvw5q cites:s-kgbzk2ph9e6jfb4 cites:s-2x58az67bm6cxq2 cites:s-7gab4ptjt2khfr5 cites:s-5z5gnu7pahr82xp cites:s-2jcmb9xe9d64t2t cites:s-5qdjyf6t898rsd4 cites:s-trwczfskj5zmuft cites:s-qyjw8xez6t6adc3
STAGE3: review.ts is to give the reviewer the code outside every symbol of a file where the commit adds or changes it, with the SpecTags at the file's start. A test is written first and carries this sid.

#### proposal:s-suv42g8r3ra2h6b-bq | tools 18 | sid s-suv42g8r3ra2h6b | agreed undefined | base s-suv42g8r3ra2h6b
TITLE: What is generated from a RecordType / Что генерируется из RecordType
  0 [p] From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w).
      RU: Из последней одобренной формулировки каждого RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk) `sheriff types` записывает тип в каждый файл типов и определение в каждый файл RuntimeChecks (§s-pvzms7d8kxb8dk2). RecordType он берёт в порядке кодовых точек путей их файлов, а внутри файла — в том порядке, в каком их обходит вычисление расположений (§s-ygg5kpcxgzq3m7w).
  1 [p] The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word changed to uppercase and the spaces removed.
      RU: Имя типа RecordType и его определения — это название RecordType, в котором первая буква каждого слова сделана заглавной, а пробелы убраны.
  2 [p] Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has that SpecTag as the first line of its `$comment`, before any text of the `$comment` of the RecordType's `schema`. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).
      RU: У каждого типа есть SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) с sid его RecordType (§s-ktfstpv8rurznrp) в комментарии прямо над ним (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` на TypeScript и `# @spec <sid>` на Python. У каждого определения этот SpecTag — первая строка его `$comment`, перед любым текстом `$comment` из `schema` RecordType. У каждого определения `$anchor` — это sid его RecordType, по которому на него указывает `$ref` в другом определении (§s-4npdup7mjkva69y).
  3 [p] A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.
      RU: Файл RuntimeChecks содержит один документ JSON Schema, у которого `$schema` — `https://json-schema.org/draft/2020-12/schema`, а `$defs` содержит каждое определение под его именем.
  4 [p] The fields of a type and of a definition are, first, the fields of each RecordType that the type's RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools follow the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take each RecordType only the first time that they reach it.
      RU: Поля типа и определения — это сначала поля каждого RecordType, до которого RecordType этого типа доходит по связям `refines` (§s-sn6au3vcr9uy5pm). За ними идут его собственные поля, которые объявляет его `schema` (§s-6eb92ddch7shuvu). Связи `refines` RecordType инструменты SpecSheriff обходят в том порядке, в каком он их перечисляет. Для каждой связи они сначала берут RecordType, до которых так же доходит связанный RecordType, а затем сам связанный RecordType. Каждый RecordType они берут, только когда доходят до него впервые.
  5 [p] Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field's schema in a definition is an `allOf` that holds their schemas in the order in which they are taken. In a type, the field has the type that the last of these schemas gives (§s-4npdup7mjkva69y). A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.
      RU: Каждое поле сохраняет своё имя и место, где оно встречается впервые. Если поле с одним и тем же именем объявляют несколько из этих RecordType, схема поля в определении — это `allOf`, который содержит их схемы в том порядке, в каком они взяты. В типе у поля тот тип, который даёт последняя из этих схем (§s-4npdup7mjkva69y). Поле гарантированное (§s-adhmw4gw6y82f44), если его перечисляет `required` в `schema` любого из этих RecordType. В типе гарантированное поле обязательное, а любое другое — необязательное.
  6 [p] A definition is built from the RecordType's own `schema`. In the definition, `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type given by a field's schema says (§s-4npdup7mjkva69y). Where a RecordType has RecordType variants (§s-z3dnru6qqdf9m6j), the node on such a RecordType (§s-nk8td3ez58gahc4) says what `sheriff types` generates for it and for each of its variants in place of, or in addition to, what this node says.
      RU: Определение строится из собственной `schema` RecordType. В определении `properties` содержит эти поля, а `required` перечисляет гарантированные. Схема каждого поля в нём меняется только так, как говорит узел о типе, который даёт схема поля (§s-4npdup7mjkva69y). Если у RecordType есть варианты RecordType (§s-z3dnru6qqdf9m6j), узел о таком RecordType (§s-nk8td3ez58gahc4) говорит, что `sheriff types` генерирует для него и для каждого его варианта вместо сказанного в этом узле или в дополнение к нему.
  7 [p] In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.
      RU: На TypeScript тип пишется как `export type <name> = {...}`, с `?` после имени каждого необязательного поля.
  8 [p] In Python:
      RU: На Python:
  9 [li] a type is written `<name> = TypedDict("<name>", {...})`;
      RU: тип пишется как `<name> = TypedDict("<name>", {...})`;
  10 [li] each name that a type uses from `typing` is imported from `typing`;
      RU: каждое имя из `typing`, которым пользуется тип, импортируется из `typing`;
  11 [li] a reference to another type is written as a string;
      RU: ссылка на другой тип пишется строкой;
  12 [li] an optional field is marked `NotRequired`.
      RU: необязательное поле отмечено `NotRequired`.
  13 [p] `sheriff types` cannot generate the name of a type or of a definition in any of these cases (§s-dbk2vyeg8z5jxna):
      RU: `sheriff types` не может сгенерировать имя типа или определения ни в одном из этих случаев (§s-dbk2vyeg8z5jxna):
  14 [li] the name is not an identifier in the language of its file;
      RU: имя не является идентификатором в языке своего файла;
  15 [li] the file already uses the name, including the names that the file imports and those that its language reserves;
      RU: файл уже пользуется этим именем, в том числе именами, которые файл импортирует, и теми, которые резервирует его язык;
  16 [li] a `$ref` names a sid that no RecordType has, so the type that the `$ref` refers to has no name.
      RU: `$ref` называет sid, которого нет ни у одного RecordType, поэтому у типа, на который указывает `$ref`, нет имени.
REASON: Generated in one fixed way, the types and the definitions come out the same on every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.
  RU: Типы и определения, сгенерированные одним и тем же способом, получаются одинаковыми при каждом запуске и на любой машине. На это опирается проверка порождённых копий (§s-dbk2vyeg8z5jxna). Названный по своему RecordType и привязанный к нему SpecTag, который пишет `sheriff types`, каждый тип ведёт читателя назад к RecordType, из которого он получен.
EX0: The fragment of a format named `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the type that `user` gives it, and then `name`. The definition `User` checks `street` against the schemas of both RecordTypes. The most likely mistake is to write `street` twice in the type, once for each RecordType, which TypeScript refuses to compile.
  RU: Фрагмент формата с именем `address` объявляет поля `city` и `street`. RecordType `user` уточняет `address` и объявляет `name` и `street`, с более узкой схемой для `street`. Тип `User` содержит `city`, затем `street` с типом, который даёт ему `user`, а затем `name`. Определение `User` проверяет `street` по схемам обоих RecordType. Самая вероятная ошибка — записать `street` в тип дважды, по разу от каждого RecordType: такой тип TypeScript не компилирует.
REFS: implements:s-e877bnfa559tvk9 implements:s-ktfstpv8rurznrp cites:s-7vm323mhry2enx3 cites:s-a8fn72xa782wvbk cites:s-pvzms7d8kxb8dk2 cites:s-ygg5kpcxgzq3m7w cites:s-5z5gnu7pahr82xp cites:s-33fw3ga4ctd94dq cites:s-4npdup7mjkva69y cites:s-sn6au3vcr9uy5pm cites:s-6eb92ddch7shuvu cites:s-adhmw4gw6y82f44 cites:s-nk8td3ez58gahc4 cites:s-dbk2vyeg8z5jxna cites:s-z3dnru6qqdf9m6j
STAGE3: types.ts is to write each definition's $comment with the SpecTag of its RecordType as its first line, followed by the text of the $comment of the RecordType's schema, if any, and to write no entry in sheriff.bindings.json. A test is written first and carries this sid.

#### proposal:s-dbk2vyeg8z5jxna-bq | tools 7.2.8 | sid s-dbk2vyeg8z5jxna | agreed undefined | base proposal:s-dbk2vyeg8z5jxna-g7
TITLE: Generated copies checked against their nodes / Сверка порождённых копий с их узлами
  0 [p] `sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, `sheriff binding` also refuses the commit. Each refusal names the file and says that running `sheriff types` generates it.
      RU: `sheriff binding` отвергает каждый файл, который порождает `sheriff types` (§s-a8fn72xa782wvbk), если текст этого файла в репозитории, без учёта окончаний строк, отличается от того, что порождает для него `sheriff types` (§s-dwxjxb7rw4w5yn3). Если в репозитории нет такого файла, `sheriff binding` также отвергает коммит. Каждый отказ называет файл и говорит, что запуск `sheriff types` его порождает.
  1 [p] `sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.
      RU: `sheriff binding` порождает в памяти из последней одобренной формулировки каждого узла (§s-qyjw8xez6t6adc3) файлы, которые породил бы `sheriff types`. Ни одного из них он не записывает.
  2 [p] While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of these commits holds is also treated as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run of the generator, `sheriff binding` refuses the generator in the same way.
      RU: Пока правило, которое перечисляет один из собственных генераторов проекта (§s-km4x4s26kv7pjze), — черновик, `sheriff binding` отвергает каждый файл этого генератора, который различается в родительском коммите (§s-2x58az67bm6cxq2) и в коммите. Файл генератора — файл по пути, который печатает генератор, когда `sheriff binding` запускает его так, как `sheriff types` запускает генератор, правило которого одобрено (§s-y5yk7eu6h4zrjpr). Файл, который есть только в одном из двух коммитов, тоже считается различающимся. Отказ называет файл и генератор. Если `sheriff types` отверг бы такой запуск генератора, `sheriff binding` отвергает генератор так же.
  3 [p] `sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):
      RU: `sheriff binding` отвергает также каждое из следующего, и любое из них не даёт `sheriff types` записать вообще ни одного файла (§s-a8fn72xa782wvbk):
  4 [li] a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;
      RU: файл в перечне файлов (§s-pvzms7d8kxb8dk2) для типов и RuntimeChecks (§s-e877bnfa559tvk9), порождаемых из RecordTypes (§s-7vm323mhry2enx3), если имя файла не оканчивается на `.ts`, `.py` или `.json`;
  5 [li] a file in that list whose path leads outside the repository;
      RU: файл в этом перечне, путь которого ведёт за пределы репозитория;
  6 [li] a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack, that lists such files;
      RU: второе правило в разделе технического приложения (§s-tj38pvm38nepaf5) о стеке, которое перечисляет такие файлы;
  7 [li] the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);
      RU: имя типа или определения, если это имя нельзя породить (§s-suv42g8r3ra2h6b);
  8 [li] a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.
      RU: путь, для которого `sheriff types` породил бы разные тексты, например путь, который два собственных генератора проекта печатают с разным содержимым.
  9 [p] Each of these refusals names the rule, the node or the path concerned.
      RU: Каждый из этих отказов называет соответствующее правило, узел или путь.
  10 [p] `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).
      RU: `sheriff binding` выполняет эту проверку независимо от того, одобрена спецификация или она черновик (§s-dwxjxb7rw4w5yn3).
REASON: A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).
  RU: Порождённый файл, который хранится в репозитории, — часть кода системы (§s-hheus6f395ynqvc). Изменённый вручную, он реализовывал бы то, чего не одобрил ни один ответственный. Отставший от своих узлов, он реализовывал бы формулировку, которую ответственные за эти узлы уже заменили (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).
EX0: A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A developer edits `src/types.ts` by hand to match the new wording and commits it. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.
  RU: RecordType переформулируют, и он становится черновиком, а типы, порождённые из него, остаются такими, какими их даёт его последняя одобренная формулировка. Разработчик вручную меняет `src/types.ts` под новую формулировку и делает коммит. `sheriff binding` отвергает `src/types.ts`, потому что его текст отличается от того, что даёт последняя одобренная формулировка. Самая вероятная ошибка — порождать типы из формулировки-черновика: тогда изменённый файл проходит.
REFS: implements:s-dwxjxb7rw4w5yn3 implements:s-km4x4s26kv7pjze cites:s-a8fn72xa782wvbk cites:s-qyjw8xez6t6adc3 cites:s-y5yk7eu6h4zrjpr cites:s-pvzms7d8kxb8dk2 cites:s-e877bnfa559tvk9 cites:s-7vm323mhry2enx3 cites:s-tj38pvm38nepaf5 cites:s-suv42g8r3ra2h6b cites:s-hheus6f395ynqvc cites:s-kh8qcd5kxgh9z3j cites:s-2x58az67bm6cxq2
STAGE3: binding.ts generatedCopies is not to compare an entry of sheriff.bindings.json for a file of RuntimeChecks; the agreed draft's note on that comparison lapses.

#### proposal:new-tools-17-bindings-entry-bq | tools 17a (new, after “Where the types and RuntimeChecks generated from the RecordTypes are written”) | sid s-h5rfyy9j8nnhx62 | agreed undefined | base new:tools-17-bindings-entry
TITLE: The entry in the bindings file for a file of RuntimeChecks / Запись в файле привязок для файла RuntimeChecks
REASON: undefined
  RU: undefined
REFS: 
STAGE3: types.ts writes no entry in sheriff.bindings.json for a file of RuntimeChecks; the tests of this node are not written.

#### proposal:s-m8nmfsxkcfu7cjp-bq | tools 7.3.1 | sid s-m8nmfsxkcfu7cjp | agreed undefined | base s-m8nmfsxkcfu7cjp
TITLE: A citation or a SpecTag outside the specification / Ссылка или SpecTag за пределами спецификации
  0 [p] `sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):
      RU: `sheriff citations` отвергает каждое из следующего в файлах, которые он читает (§s-e84nggntkrcyumq):
  1 [li] a word that has the form of a sid (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);
      RU: слово, которое имеет форму sid (§s-eferktypcj7njt5), если этот sid не называет ни одного узла модели спецификации (§s-w6gybeqn2ttydqx);
  2 [li] a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).
      RU: `§`, за которым сразу следует цифра, например `§5.8`: так на узел ссылаются по номеру, а не по его sid (§s-9spq78kdwsxr759).
  3 [p] Each refusal names the file, the line and the refused text.
      RU: Каждый отказ называет файл, строку и отвергнутый текст.
  4 [p] `sheriff citations` also refuses a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) outside the system's code (§s-hheus6f395ynqvc) whose sid names a node that is not a rule of the guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2). The refusal names the file, the line and the SpecTag.
      RU: `sheriff citations` отвергает также SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) вне кода системы (§s-hheus6f395ynqvc), sid которого называет узел, не являющийся правилом guidelines (§s-sfjka4zc4rhfu67, §s-69pwmwyrk6efag2). Отказ называет файл, строку и этот SpecTag.
  5 [p] `sheriff citations` reads every file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u). It leaves out the following:
      RU: `sheriff citations` читает каждый файл, который репозиторий хранит вне `specs/` (§s-zefk589ykh37b8u). Без проверки он оставляет следующее:
  6 [li] the bindings file (§s-trwczfskj5zmuft), whose SpecTags (§s-5z5gnu7pahr82xp) are left to the check for a SpecTag that names no node (§s-36x8amvunmv2kp5);
      RU: файл привязок (§s-trwczfskj5zmuft): его SpecTag (§s-5z5gnu7pahr82xp) оставлены проверке SpecTag, который не называет ни одного узла (§s-36x8amvunmv2kp5);
  7 [li] each file that git treats as binary, such as an image;
      RU: каждый файл, который git считает двоичным, например изображение;
  8 [li] each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu);
      RU: каждый файл, который собственные guidelines проекта (§s-u7tw6m8npxmv5tu) перечисляют как fixture тестов проверки, которая читает ссылки или расположения (§s-6hha5en226aj8hu);
  9 [li] the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc), including its tests, which is left to the check for a SpecTag that names no node.
      RU: sid каждого SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) в коде системы (§s-hheus6f395ynqvc), включая его тесты: такой sid оставлен проверке SpecTag, который не называет ни одного узла.
  10 [p] `sheriff citations` makes these checks regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq, §s-69pwmwyrk6efag2).
      RU: `sheriff citations` выполняет эти проверки независимо от того, одобрена спецификация или она черновик (§s-e84nggntkrcyumq, §s-69pwmwyrk6efag2).
REASON: Outside the specification, a citation comes with no link to the node that it cites (§s-cxtt6jvhqcey2k9). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.
  RU: За пределами спецификации у ссылки нет связи с узлом, на который она ссылается (§s-cxtt6jvhqcey2k9). Поэтому ссылка на sid, который не называет ни одного узла, или номер вместо sid вводили бы в заблуждение каждого читателя, и ни одна другая проверка этого бы не заметила.
EX0: The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, yet `sheriff citations` refuses the sid in the guide, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.
  RU: Руководство `docs/setup.md` ссылается на `§s-…` — sid правила, которое удаляет более поздний коммит. Этот коммит не меняет ни одного файла вне `specs/`, но `sheriff citations` отвергает этот sid в руководстве, называя руководство, строку и sid. Самая вероятная ошибка — читать только файлы, которые меняет коммит: тогда ссылка проходит, пока кто-нибудь не изменит руководство.
REFS: implements:s-e84nggntkrcyumq implements:s-6hha5en226aj8hu cites:s-eferktypcj7njt5 cites:s-w6gybeqn2ttydqx cites:s-9spq78kdwsxr759 cites:s-zefk589ykh37b8u cites:s-trwczfskj5zmuft cites:s-36x8amvunmv2kp5 cites:s-u7tw6m8npxmv5tu cites:s-5z5gnu7pahr82xp cites:s-hheus6f395ynqvc cites:s-cxtt6jvhqcey2k9 implements:s-69pwmwyrk6efag2 cites:s-sfjka4zc4rhfu67
STAGE3: binding.ts (citationsOutside) is to refuse, in a file outside the system's code, a SpecTag whose sid names a node that is not a rule of the guidelines. A test is written first and carries this sid.

