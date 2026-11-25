### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · s-2x58az67bm6cxq2 (lines 8–9)
TRANSLATION:
- (8) Коммит изменяет файл, связанный целиком, в том случае, если какая-либо строка этого файла изменяет код (§s-u6mj5yv8ngnz79v).
- (9) Пример: коммит переформулирует комментарий в таблице стилей, связанной SpecTag в её начале, и больше ничего в ней не меняет. Инструменты SpecSheriff читают строки таблицы стилей по грамматике CSS и пропускают комментарий, поэтому коммит оставляет таблицу стилей неизменённой. Самая вероятная ошибка — засчитывать любое изменение текста файла, связанного целиком, из-за чего переформулированный комментарий становится изменением кода.

TWO READINGS:
- "where a line of that file changes the code": (а) «если строка, которую коммит удаляет или добавляет в этом файле, изменяет код»; (б) «если какая-либо строка файла вообще изменяет код», независимо от коммита. Контекст (§s-u6mj5yv8ngnz79v) говорит за (а), но в предложении это не сказано.
- "bound by SpecTags at its start": (а) SpecTag находятся в начале таблицы стилей; (б) комментарий находится в начале таблицы стилей. Контекст говорит за (а).
- "to count any change": (а) «засчитывать любое изменение как изменение кода»; (б) «подсчитывать любые изменения». Не сказано, чем изменение считают; контекст говорит за (а).

LANGUAGE:
- "to count any change to the text of a file bound as a whole" → "to count any change to the text of a file bound as a whole as a change to the code" — у глагола "count" нет дополнения, которое говорит, чем изменение считают.
- "read the stylesheet's lines with the grammar of CSS" → "parse the stylesheet's lines with the CSS grammar" — "read with the grammar" не сочетается; не уверен, что "parse" точно сохраняет смысл, если "read" здесь выбрано как слово узла §s-u6mj5yv8ngnz79v.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · new:tools-7-2-changed-line (lines 13–20)
TRANSLATION:
- (13) Инструменты SpecSheriff решают, какие из строк, которые коммит удаляет или добавляет, изменяют код (§s-9j2mmnuuwmx5ksn). Они читают каждую строку как токены языка файла в каждом из следующих файлов:
- (14) в файле, язык которого охвачен неким описанием (§s-33fw3ga4ctd94dq);
- (15) в файле, связанном целиком (§s-kgbzk2ph9e6jfb4), имя которого оканчивается на `.yaml`, `.yml`, `.css`, `.sql`, `.sh` или `.json`.
- (16) Такой файл, связанный целиком, они разбирают по грамматике tree-sitter для его формата: YAML, CSS, SQL, Bash или JSON. Токены строки они читают следующим образом:
- (17) пробельные символы двух строк различаются там, где язык файла придаёт пробельным символам значение, как отступу строки в Python или YAML.
- (18) В любом другом файле каждая строка, которую коммит удаляет или добавляет, изменяет код.
- (19) Обоснование: изменение кода заставляет инструменты SpecSheriff заново проверить этот код по его правилам (§s-9j2mmnuuwmx5ksn). Чтение каждой строки как токенов языка её файла отбрасывает то, что не может изменить действия кода: например, комментарии и пробельные символы, которым язык не придаёт значения.
- (20) Пример: коммит сдвигает ключ `retries` в файле YAML, связанном целиком, ещё на два пробела вправо, отчего ключ перемещается под ключ, стоящий над ним. В строке те же токены, что и раньше, но её отступ, которому YAML придаёт значение, отличается, поэтому строка изменяет код. Самая вероятная ошибка — отбрасывать все пробельные символы, как в TypeScript, из-за чего перемещённый ключ сходит за неизменённый.

TWO READINGS:
- "a file whose language a description covers": не сказано, описание чего. (а) Описание языка, которое есть у инструментов; (б) любое описание, в котором язык упомянут. Скорее всего (а), по ссылке на §s-33fw3ga4ctd94dq.
- "They parse such a file bound as a whole": "They" указывает на инструменты SpecSheriff, названные в другом пункте (13). "such a file" — (а) только файл из пункта (15), с перечисленными расширениями; (б) любой файл из списка, связанный целиком. Контекст говорит за (а).
- "They read the tokens of a line as follows:": "They" снова указывает на инструменты SpecSheriff, не названные в этом пункте. Следующий за вводной фразой пункт (17) — условие, а не способ чтения токенов.
- "the two lines": в присланном тексте эти две строки нигде не названы. Скорее всего, это удалённая строка и добавленная вместо неё.
- "differs where the file's language gives whitespace a meaning": (а) «различаются в тех местах строки, где язык придаёт пробелам значение»; (б) «различаются, и при этом язык файла придаёт пробелам значение». Контекст говорит за (а).
- "moves the key under the key above it": (а) ключ становится вложенным в ключ, стоящий выше; (б) ключ перемещается ниже по тексту. Контекст говорит за (а).
- "as in TypeScript": (а) «как это правильно делается для TypeScript»; (б) «как ошибаются в TypeScript». Контекст говорит за (а).

LANGUAGE:
- "They parse such a file bound as a whole" → "They parse such a file" — "such" уже отсылает к файлу, связанному целиком; повтор читается как два разных ограничения.
- "moves the key under the key above it" → "nests the key in the key above it" — "under … above" сталкивает два пространственных слова; не уверен, что "nests" точно передаёт задуманное.
- "to leave out all whitespace, as in TypeScript" → "to leave out all whitespace, as the tools do for TypeScript" — сравнение без глагола; замена предполагает чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-9j2mmnuuwmx5ksn (lines 24–30)
TRANSLATION:
- (24) Изменение SpecTag (§s-8xw4mgvpexyvw5q) считается изменением теста или кода, который этот SpecTag связывает.
- (25) Пока SpecTag остаётся прежним, ничто из следующего не изменяет тест или код:
- (26) переименование теста;
- (27) добавление, удаление или переформулирование комментария;
- (28) изменение пробельных символов, которые в языке их файла не влияют на действия кода.
- (29) В файле, комментарии и пробельные символы которого проверки (§s-jau82aq9juv9zzh) не могут отличить от его кода, каждая правка изменяет код.
- (30) Пример: коммит меняет отступы в блоке кода на TypeScript, добавляет над ним комментарий и больше ничего не меняет, поэтому он не изменяет код. Но не так: коммит, который сдвигает ключ файла YAML дальше вправо, отчего ключ перемещается под ключ, стоящий над ним, оставляет код неизменённым.

TWO READINGS:
- "But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged.": (а) «неверно, что такой коммит оставляет код неизменённым», то есть он код изменяет; (б) «а вот этот случай — не пример: такой коммит оставляет код неизменённым», то есть утверждение читается как истинное. Буквально предложение утверждает, что код остаётся неизменённым. Контекст (узел о строке, изменяющей код) говорит за (а), но читатель легко прочтёт (б), то есть обратный смысл.
- "As long as the SpecTag stays the same": (а) условие — «при условии, что SpecTag не изменён»; (б) время — «до тех пор, пока SpecTag не изменится». Контекст говорит за (а).
- "moves the key under the key above it": (а) ключ становится вложенным; (б) ключ перемещается ниже по тексту. Контекст говорит за (а).

LANGUAGE:
- "But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged." → "By contrast, a commit that indents a key of a YAML file further, which nests the key in the key above it, changes the code." — "But not:" перед полным утвердительным предложением не английская конструкция и переворачивает смысл; замена предполагает чтение (а).
- "As long as the SpecTag stays the same" → "Provided that the SpecTag stays the same" — убирает временное чтение.
- "cannot tell from its code" → "cannot tell apart from its code" — без "apart" фраза сначала читается как «не могут узнать по его коду».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-kgbzk2ph9e6jfb4 (line 34)
TRANSLATION: SpecTag перед символом связывает этот символ и каждый символ, вложенный в него. SpecTag в начале файла и запись в файле привязок связывают файл целиком. Изменение в любом месте файла, связанного целиком, — это изменение кода, который связывают его SpecTag. Единственное исключение — правка комментария или пробельных символов, не изменяющая кода (§s-9j2mmnuuwmx5ksn).

TWO READINGS:
- "SpecTags at the start of a file, and an entry in the bindings file, bind the whole file": (а) каждое из двух средств само по себе связывает файл целиком; (б) файл связан целиком, только когда есть и то, и другое. Контекст говорит за (а).
- "an edit to a comment or to whitespace that changes no code": (а) «правка (комментария или пробелов), которая не изменяет кода»; (б) «правка комментария либо правка таких пробелов, которые не изменяют кода»: условие относится только к пробелам. Отсылка к §s-9j2mmnuuwmx5ksn допускает оба чтения.
- "the code its SpecTags bind": у файла, связанного только записью в файле привязок, своих SpecTag нет. Читатель не поймёт, относится ли предложение к такому файлу.

LANGUAGE:
- "SpecTags at the start of a file, and an entry in the bindings file, bind the whole file" → "SpecTags at the start of a file bind the whole file, and so does an entry in the bindings file" — "and" с общим сказуемым читается как совместное условие; замена предполагает чтение (а).

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-m4h279nbaqkpa3t (lines 38–43)
TRANSLATION:
- (38) при каждом коммите, который добавляет или изменяет комментарий в коде или в тесте: согласуется ли каждый такой комментарий с кодом, который он описывает, и с правилами, которые этот код реализует;
- (39) Обоснование: каждая проверка, кроме review, бинарна, поэтому отказ не требует ничьего суждения. Проверку, которая иногда отказывает по причине, которую никто не может воспроизвести, обходят при первой возможности и больше ей не доверяют. Для review нужен reviewer, потому что никакой скрипт не может решить, делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли реализация правила не требует изменений и согласуется ли узел технического приложения с базовой спецификацией.
- (41) Когда проверка запускается после каждой правки агента, она находит ошибку там, где ошибка сделана. Порядок, в котором пишутся тест и код, виден только от правки к правке, поскольку коммит содержит тест и код вместе.
- (43) При коммите тесты не запускаются, поскольку набор тестов выполняется дольше, чем кто-либо должен ждать коммита. Изменение, которым ещё не поделились, никого не вводит в заблуждение, поэтому его тесты могут подождать, пока им не поделятся. Где они запускаются, решает проект, поскольку некоторые наборы тестов выполняются часами или требуют того, чего нет на машине разработчика. Пока спецификация — черновик, работа сосредоточена на самой спецификации, поэтому ни один тест не обязан проходить.

TWO READINGS:
- "Run after each of an agent's edits, a check finds a mistake where it is made.": "Run" сначала читается как повелительное «Запускайте…»; на деле это причастие — «будучи запущенной». "where it is made": (а) «в том месте, где ошибка сделана»; (б) «в тот момент, когда ошибка сделана». Контекст говорит за (б).
- "whether a comment agrees with the code and its rules": "its" — (а) правила кода; (б) правила комментария. Контекст говорит за (а).
- "Where they run is the project's choice": "they" — тесты, названные двумя предложениями раньше; ближайшее множественное — нет, поэтому читается однозначно, но "Where" — (а) место (машина разработчика, CI); (б) этап процесса. Контекст допускает оба.
- "no test has to pass": (а) «ни один тест не обязан проходить»; (б) «тесты не должны проходить». Контекст говорит за (а).

LANGUAGE:
- "the rules that this code implements" → "the rules that that code implements" или "the rules which that code implements" — на только что названное английский указывает словом "that"; "this code" читается как «код, о котором идёт речь здесь, в правиле».
- "Run after each of an agent's edits, a check finds a mistake where it is made." → "A check that runs after each of an agent's edits finds a mistake at the moment it is made." — причастный оборот в начале читается как приказ; замена предполагает чтение (б).
- "takes longer than anyone should wait for a commit" → "takes longer than anyone should have to wait for a commit" — "should wait" говорит «следует ждать», а не «вынужден ждать».

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-nyh9yk22ba6g77q-g3 (lines 47–48)
TRANSLATION:
- (47) формулировка каждого правила, которое SpecTag (§s-8xw4mgvpexyvw5q) связывает с кодом или тестом, который коммит добавляет или изменяет либо в котором коммит добавляет или изменяет комментарий;
- (48) Обоснование: reviewer выносит суждения, которые не может вынести ни одна детерминированная проверка: делает ли код только то, что говорят его правила, согласуется ли комментарий с кодом и его правилами, действительно ли реализация правила не требует изменений и согласуется ли одобренный узел технического приложения с базовой спецификацией. Он может судить только по тому, что ему показано. Когда ему показано то, что нужно для каждого суждения, и ничего из того, что имел в виду автор изменения, он судит только по правилам.

TWO READINGS:
- "or in which the commit adds or changes a comment": "in which" — (а) «код или тест, в котором коммит добавляет комментарий»; (б) «правило, в котором коммит добавляет комментарий». Контекст говорит за (а).
- "code or a test that the commit adds or changes": придаточное относится (а) и к коду, и к тесту; (б) только к тесту. Контекст говорит за (а).
- "whether a comment agrees with the code and its rules": "its" — (а) правила кода; (б) правила комментария. Контекст говорит за (а).

LANGUAGE:
- "binds to code or a test that the commit adds or changes, or in which the commit adds or changes a comment" → "binds to code or to a test, where the commit adds or changes that code or test or adds or changes a comment in it" — два придаточных с разными союзными словами при двух существительных; не уверен, что замена не слишком тяжела, но она снимает оба чтения.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:row-10-1-43b (lines 52–53)
TRANSLATION:
- (52) Каждый комментарий, который коммит добавляет или изменяет в коде или в тесте, согласуется с кодом, который он описывает, и с правилами, которые этот код реализует
- (53) При неудаче: сообщается как предупреждение, с указанием файла и строки комментария

TWO READINGS:
- "the code that it describes": "it" — (а) комментарий; (б) коммит. Контекст говорит за (а).

LANGUAGE:
- "the rules that this code implements" → "the rules that that code implements" — на только что названное указывают словом "that".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:s-vp24dqydygztqbt (line 57)
TRANSLATION: суждение о каждом комментарии, который коммит добавляет или изменяет (§s-7vpsdsy8dpqdy6r);
TWO READINGS: none
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · proposal:new-tools-10-verdict (lines 61–63)
TRANSLATION:
- (61) `sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта. Вердикт, пропускающий коммит, не перечисляет никаких замечаний, кроме замечаний к комментариям (§s-7vpsdsy8dpqdy6r). Вердикт, отказывающий коммиту, перечисляет хотя бы одно замечание, которое относится не к комментарию.
- (62) Обоснование: вердикт, смысл которого `sheriff review` пришлось бы угадывать, например пропуск с замечанием к коду, позволил бы `sheriff review` решать исход коммита вместо независимого reviewer (§s-m4h279nbaqkpa3t).
- (63) Пример: runner отвечает вердиктом, который пропускает коммит и перечисляет одно замечание к коду. Этот ответ — не вердикт, который `sheriff review` может прочитать, поэтому `sheriff review` отказывает коммиту. Самая вероятная ошибка — пропустить коммит и отбросить замечание, что означает решить за reviewer, что он имел в виду.

TWO READINGS:
- "deciding for the reviewer what it meant": "it" — (а) reviewer; (б) замечание или вердикт. Контекст говорит за (а). "for the reviewer" — (а) «вместо reviewer»; (б) «в пользу reviewer». Контекст говорит за (а).
- "The runner answers with a verdict" и следом "That answer is not a verdict that `sheriff review` can read": первое предложение называет ответ вердиктом, второе говорит, что это не вердикт. Читатель не поймёт, вердикт это или нет. Скорее всего, имеется в виду «ответ, который выглядит как вердикт».
- "a finding on code" / "findings on comments": "on" — (а) «замечание к коду / к комментарию»; (б) «замечание, записанное в коде / в комментарии». Контекст говорит за (а).

LANGUAGE:
- "a pass that lists a finding on code" → "a verdict that passes the commit and lists a finding about code" — "a pass" как существительное для вердикта нигде не введено; "finding on" двусмысленно.
- "no finding other than findings on comments" → "no finding other than findings about comments" — то же "on".
- "one finding that is not on a comment" → "one finding that is not about a comment" — то же "on".
- "lists one finding on code" → "lists one finding about code" — то же "on".
- "deciding for the reviewer what it meant" → "deciding in the reviewer's place what the reviewer meant" — снимает оба чтения "for" и "it".

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-e.md · new:tools-7-3-review-comments (lines 67–74)
TRANSLATION:
- (67) `sheriff review` сообщает как предупреждение о каждом замечании независимого reviewer (§s-m4h279nbaqkpa3t) к комментарию, который коммит добавляет или изменяет (§s-td4e3rdga6azav9). Из-за такого замечания он не отказывает ни одному коммиту. Каждое такое замечание называет файл, строку и проблему.
- (68) Reviewer оценивает комментарии, которые инструменты SpecSheriff пропускают, когда читают строку кода (§s-u6mj5yv8ngnz79v). Коммит добавляет или изменяет такой комментарий в том случае, если он добавляет строку, содержащую часть комментария. Reviewer оценивает текст комментария, кроме его SpecTag (§s-8xw4mgvpexyvw5q), поскольку изменение SpecTag — это изменение кода (§s-9j2mmnuuwmx5ksn).
- (69) Reviewer выносит это суждение при каждом коммите, который добавляет или изменяет такой комментарий, включая коммит, не изменяющий кода. Помимо того, что `sheriff review` даёт reviewer при каждом review (§s-vp24dqydygztqbt), он даёт reviewer каждый символ (§s-kgbzk2ph9e6jfb4), тест или файл, связанный целиком, в котором есть такой комментарий. Каждый из них даётся полностью, в том виде, в каком его оставляет коммит, с его файлом, его строками и SpecTag, которые его связывают.
- (70) Reviewer находит проблему в комментарии, если выполняется хотя бы одно из следующего:
- (71) комментарий утверждает то, чего код, который он описывает, не делает;
- (72) комментарий противоречит правилу, которое называет SpecTag у этого кода.
- (73) Обоснование: комментарий, который больше не соответствует своему коду, вводит в заблуждение того, кто следующим читает код, и только чтение обоих может показать несоответствие. Комментарий не изменяет того, что делает система, поэтому проблема в нём заслуживает предупреждения, но не отказа коммиту.
- (74) Пример: коммит изменяет только комментарий над `roundPrice`, который теперь говорит, что функция округляет половины вверх, тогда как функция округляет их до ближайшего чётного числа. `sheriff review` сообщает о замечании reviewer как о предупреждении и пропускает коммит. Самая вероятная ошибка — отказать коммиту, как при дефекте в коде.

TWO READINGS:
- "the text of a comment other than its SpecTags": (а) «текст комментария, за исключением SpecTag в нём»; (б) «текст такого комментария, который сам не является SpecTag». Контекст говорит за (а).
- "where it adds a line that holds part of the comment": "it" — (а) коммит; (б) комментарий. Контекст говорит за (а). "where" здесь значит «если», а не место.
- "it gives the reviewer each symbol": "it" — (а) `sheriff review`; (б) reviewer или review. Контекст говорит за (а).
- "each symbol (§s-kgbzk2ph9e6jfb4), test or file bound as a whole that holds such a comment": "that holds such a comment" относится (а) ко всем трём: символу, тесту, файлу; (б) только к файлу. Контекст говорит за (а).
- "The reviewer finds a problem with a comment where either of the following holds": (а) правило о том, когда комментарий считается проблемным; (б) описание того, что reviewer фактически обнаруживает. Контекст говорит за (а).
- "the comment above `roundPrice`, which now says": "which" — (а) комментарий; (б) `roundPrice`. Контекст говорит за (а).
- "The reviewer makes this judgement": "this judgement" указывает на суждение, названное в другом пункте (68), в самом пункте (69) оно не названо. Скорее всего, это оценка комментариев.
- "with its file, its lines": для файла, связанного целиком, "its file" читается как «файл этого файла». Скорее всего, имеется в виду путь к файлу и номера строк.

LANGUAGE:
- "The reviewer judges the text of a comment other than its SpecTags" → "The reviewer judges the text of a comment, except its SpecTags" — "other than" можно отнести к "comment".
- "A commit adds or changes such a comment where it adds a line" → "A commit adds or changes such a comment when the commit adds a line" — "where" в значении условия и "it" с двумя возможными антецедентами.
- "The reviewer finds a problem with a comment where either of the following holds" → "A comment has a problem when either of the following holds" — определение записано как действие reviewer; не уверен, что замена сохраняет задуманного субъекта.
- "with its file, its lines" → "with the path of its file, its line numbers" — не уверен, что имеется в виду именно путь и номера строк.
- "as for a defect in the code" → "as it would be refused for a defect in the code" — сравнение без глагола; "as for" сначала читается как «что касается».
