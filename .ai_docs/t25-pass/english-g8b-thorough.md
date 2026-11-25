# EngStickler's thorough reader on english-group8b.md: the report

### tools-drafts.json · s-477gtdrkw34dzxw
TRANSLATION:
**Название:** Хуки.
**Текст:** Следующие хуки запускают инструменты SpecSheriff, а вместе с ними проверки до и после правки агента, при коммите и при push (§):
- git-хуки, которые `sheriff init` записывает в `.githooks/` (§) и каждый из которых запускает инструменты SpecSheriff, хранимые плагином на машине (§):
  - `pre-commit`, который запускает собственные инструменты проекта для этого хука (§), `sheriff types` и проверки (§);
  - `commit-msg`, который запускает собственные инструменты проекта для этого хука (§), затем `sheriff commit-message`, а затем, только после того как `sheriff commit-message` прошёл, `sheriff review` (§);
  - `pre-push`, который запускает собственные инструменты проекта для этого хука (§), затем сравнивает рабочее дерево с тем, что отправляет push (§), и запускает тесты (§) только там, где это сравнение ничего не отклонило.
- хуки агента, которые объявляет плагин для Claude Code (§) и которые `sheriff init --agent codex` записывает в проект для Codex CLI (§):
  - при старте сессии — хук, который включает git-хуки (§) и поручает агенту спросить у пользователя настройки каждого runner (§);
  - перед правкой, сделанной инструментами редактирования файлов, — хук, который запускает `sheriff guard` (§);
  - после такой правки или после команды оболочки — хук, который записывает то, что генерируется из узлов спецификации, и запускает проверки (§).

При коммите хук pre-commit и хук commit-msg выписывают то, что добавлено в индекс, каждый в собственный каталог. Они запускают там `sheriff types` и проверки, с этим каталогом в качестве рабочего дерева git, относительно истории репозитория.

Каждая проверка, которую запускает хук pre-commit, хук commit-msg или хук агента после правки, читает создаваемый коммит. При коммите этот коммит — то, что добавлено в индекс. После правки это отличие рабочего дерева от последнего коммита. Кроме этого коммита, такая проверка читает только следующее:
- SpecSheriff guidelines и расширения guidelines, выбранные проектом (§), вместе со схемой guidelines и схемой каждого такого расширения, у которого она есть, в том виде, в каком они поставляются с инструментами SpecSheriff, запускающими проверку (§);
- настройки runner ревьюера в git-конфигурации пользователя, делающего коммит, — для ревью (§);
- историю репозитория и сообщение коммита — там, где так сказано в узле о том, как выполняется проверка (§).

**Причина:** Проверка читает создаваемый коммит, потому что суждение о чём-либо другом пропустило бы или отклонило бы то, что не коммитится. Хуки, которые хранит репозиторий, и хуки, которые объявляет плагин для Claude Code, запускают каждую проверку в установленный для неё момент в каждом клоне, кто бы ни вносил изменение (§).

**Пример:** Разработчик добавляет в индекс изменение правила R, а второе изменение R в индекс не добавляет. При коммите `sheriff validate` читает R в том виде, в каком оно в индексе. Наиболее вероятная ошибка — запускать проверки на рабочем дереве, так что они судят о втором изменении, которого в коммите нет.

**Todo:** Экспорт и карта догоняют изменение, попавшее в рабочее дерево через git (pull, merge, checkout), только при следующей правке агента или при следующем коммите. Хуки post-merge и post-checkout, запускающие `sheriff markdown` и `sheriff map`, устранили бы эту задержку.
TWO READINGS:
- "and with them the checks": (а) хуки запускают инструменты, а заодно с ними и проверки; (б) хуки запускают инструменты и посредством инструментов — проверки. Контекст скорее за (б), но текст читается как (а).
- "against the repository's history": (а) проверки сравнивают каталог с историей репозитория; (б) проверки работают в этом каталоге, пользуясь историей настоящего репозитория как своей. Контекст не выбирает.
- "as they are delivered with the SpecSheriff tools that run the check": (а) относится только к схемам; (б) относится ко всему пункту — к guidelines, расширениям и схемам. Контекст скорее за (б).
- "in every clone": (а) хуки запускают проверку в каждом клоне; (б) момент установлен для неё в каждом клоне. Контекст за (а).
- "The export and the map": в узле раньше не названы; вероятнее всего, экспорт в markdown и карта, которые пишут `sheriff markdown` и `sheriff map`.
LANGUAGE:
- "only where that comparison has refused nothing" → "only where that comparison has found no difference" — a comparison does not refuse, the hook does; not certain the replacement keeps the meaning if the hook can refuse for another reason.
- "each write out what is staged to a directory of its own" → "each write out what is staged to a directory of their own" — plural verb with a singular possessive.

### tools-drafts.json · new:tools-6-pre-commit
TRANSLATION:
**Название:** Хук pre-commit.
**Текст:** Хук pre-commit запускает следующее, в таком порядке (§):
- те собственные инструменты проекта для этого хука, которые собственные guidelines проекта (§) перечисляют как инструменты, переписывающие файлы (§);
- `sheriff types` (§), запускаемый на файлах в том виде, в каком они в индексе;
- остальные инструменты проекта для этого хука (§);
- `sheriff validate` (§), который сначала проверяет, нет ли ключа, записанного более одного раза (§), и проверяет по схеме (§), а собственные проверки проекта (§) запускает только после того, как обе прошли;
- `sheriff binding` (§) и `sheriff citations` (§) — только после того, как прошли проверка на ключ, записанный более одного раза, и проверка по схеме;
- там, где проект выбрал расширение Views (§), — `sheriff markdown` (§) и `sheriff map` (§), в рабочем дереве.

Хук выписывает то, что добавлено в индекс, в собственный каталог (§), как только отработали инструменты проекта, переписывающие файлы. `sheriff types` и проверки работают в этом каталоге.

Хук записывает каждый файл, который `sheriff types` записывает в рабочее дерево, не в тот каталог, на место того, что находится по тому же пути, и называет его как файл, который автору следует добавить в индекс. Поэтому проверки читают каждый такой файл в том виде, в каком он в индексе. Сам хук в индекс ничего не добавляет.

О том, что `sheriff markdown` или `sheriff map` не смог записать свои файлы, сообщается, и это не заставляет хук отклонить коммит.

**Причина:** При каждом коммите каждая проверка судит о коммите в его окончательном виде (§). Поэтому инструменты, переписывающие файлы, запускаются до проверок, а то, что генерирует хук, ждёт в рабочем дереве, пока автор не добавит это в индекс, поскольку то, что содержит коммит, выбирает его автор.

**Пример:** Разработчик правит RecordType, ответственный одобряет новую формулировку, разработчик добавляет спецификацию в индекс и делает коммит. `sheriff types` генерирует новые типы этого RecordType из узлов спецификации в индексе, а хук записывает их в рабочее дерево и называет их. `sheriff binding` отклоняет коммит, поскольку типы в индексе отличаются от того, что даёт одобренная формулировка (§). Разработчик добавляет новые типы в индекс и снова делает коммит. Наиболее вероятная ошибка — позволить проверкам читать типы, которые `sheriff types` только что записал, так что коммит проходит со старыми типами в индексе.
TWO READINGS:
- "The hook writes each file that `sheriff types` writes into the working tree, not into that directory": (а) хук записывает [каждый файл, который пишет `sheriff types`] в рабочее дерево, а не в тот каталог; (б) хук записывает куда-то каждый файл, который `sheriff types` сам пишет в рабочее дерево. Контекст за (а), но порядок слов даёт (б).
- "that directory" (в третьем абзаце): каталог назван только в предыдущем абзаце; вероятнее всего, собственный каталог хука, куда выписан индекс.
- "names it as a file for the author to stage": (а) сообщает его имя и говорит, что автору нужно добавить его в индекс; (б) объявляет его файлом, который автор вправе добавить. Контекст за (а).
LANGUAGE:
- "The hook writes each file that `sheriff types` writes into the working tree, not into that directory" → "The hook writes each file that `sheriff types` generates into the working tree and not into the hook's own directory" — two "writes" with one "into" make the sentence garden-path; not certain "generates" matches what `sheriff types` does in the hook's directory.
- "A failure of `sheriff markdown` or `sheriff map` to write its files is reported, and does not make the hook refuse the commit." → "Where `sheriff markdown` or `sheriff map` fails to write its files, the hook reports the failure and does not refuse the commit." — the passive hides who reports.

### tools-drafts.json · new:tools-6-push-compare
TRANSLATION:
**Название:** Рабочее дерево, сравниваемое с тем, что отправляет push.
**Текст:** Перед push, для которого он запускает тесты (§), хук pre-push сравнивает рабочее дерево с каждым коммитом, о котором судят тесты: с каждым коммитом, на который push создаёт или обновляет ссылку (ref), напрямую или через тег, и который удовлетворяет условиям, при которых запускаются тесты.

Хук отклоняет push там, где для какого-либо файла верно одно из следующего, и называет каждый такой файл:
- файл различается в рабочем дереве и в таком коммите;
- файл есть только в одном из них, включая файл в рабочем дереве, который git не отслеживает.

Хук не учитывает файлы, которые git игнорирует. Там, где он не отклоняет push, он запускает тесты в рабочем дереве.

**Причина:** Тесты запускаются в рабочем дереве, которое содержит то, что каждый checkout устанавливает или собирает для себя, поэтому они судят об отправляемом коммите только там, где рабочее дерево содержит то же, что и этот коммит.

**Пример:** Разработчик коммитит изменение и оставляет правку в `src/a.ts` незакоммиченной. Спецификация одобрена, и собственные guidelines проекта называют push моментом, в который запускаются тесты. Хук pre-push отклоняет push и называет `src/a.ts`. Наиболее вероятная ошибка — запускать тесты в рабочем дереве как есть, так что они проходят или падают из-за правки, которой в отправляемом коммите нет.
TWO READINGS:
- "Before a push for which it runs the tests": (а) перед push, при котором хук в итоге запускает тесты; (б) перед push, при котором тесты должны запускаться по условиям. Контекст за (б), так как после сравнения хук может тесты и не запустить.
- "they judge a pushed commit only where": (а) тесты запускаются только в таком случае; (б) их результат относится к коммиту только в таком случае. Контекст за (б).
- "each checkout": (а) каждая рабочая копия; (б) каждое выполнение `git checkout`. Контекст скорее за (а).
LANGUAGE:
- "Before a push for which it runs the tests" → "Before a push for which the tests are to run" — the hook has not yet decided to run them; not certain this is the intended condition.
- "each commit to which the push creates or updates a ref" → "each commit that a ref created or updated by the push points to" — one "updates a ref", not "updates a ref to a commit".
- "the file is in only one of them, including a file in the working tree that git does not track" → "the file is in only one of the two, even where it is a file in the working tree that git does not track" — "including a file" has nothing to attach to.

### tools-drafts.json · new:tools-6-hooks-on
TRANSLATION:
**Название:** Включение git-хуков при старте сессии.
**Текст:** В репозитории, в корне которого есть `sheriff.config.json`, хук агента, запускаемый при старте сессии (§), делает с настройкой git `core.hooksPath` следующее:
- там, где она не задана, хук задаёт ей значение `.githooks` в git-конфигурации репозитория и сообщает об этом;
- там, где она указывает на другой каталог, хук сообщает, что git-хуки, которые пишет `sheriff init` (§), не запускаются.

Хук также называет каждый git-хук в `.githooks/` в любом из следующих случаев:
- индекс git содержит этот git-хук без режима исполняемого файла;
- в системе, файлы которой хранят бит исполняемости, у файла git-хука нет этого бита.

Для каждого такого git-хука хук агента говорит, как сделать этот git-хук исполняемым в каждой системе: `chmod +x <hook>` и `git update-index --chmod=+x <hook>`, затем коммит. Он оставляет режим каждого файла и индекс git как есть. Он не учитывает собственные инструменты проекта в `.githooks/<hook>.d/` (§).

**Причина:** В клоне, где git не запускает git-хуки, при коммите не запускается ни одна проверка. Git-хук, который git не запускает, не может сообщить, что его пропустили, тогда как хук, запускаемый при старте сессии, достигает каждого клона. Хук, запускаемый при старте сессии, оставляет запись режима git-хука автору следующего коммита, поскольку то, что содержит коммит, выбирает его автор.

**Пример:** В репозитории, настроенном в Windows, git-хуки закоммичены без режима исполняемого файла. Разработчик клонирует его в Linux и начинает сессию. Хук, запускаемый при старте сессии, называет каждый git-хук и говорит, как сделать его исполняемым. Наиболее вероятная ошибка — сделать git-хуки исполняемыми в рабочем дереве, не сообщив об этом, что оставляет индекс прежним, так что каждый из остальных клонов по-прежнему получает git-хуки, которые git пропускает.
TWO READINGS:
- "says how to make the git hook executable on every system": (а) в каждой системе сообщает, как сделать хук исполняемым; (б) сообщает, как сделать хук исполняемым для всех систем. Контекст за (б).
- "It leaves the mode of each file and git's index as they are. It leaves out": "It" — хук агента или git-хук из предыдущего предложения. Контекст за хук агента.
- "reaches every clone": (а) запускается в каждом клоне; (б) может изменить каждый клон. Контекст за (а).
LANGUAGE:
- "the agent's hook run when a session starts (§s-477gtdrkw34dzxw) does the following" → "the agent's hook that runs when a session starts (§s-477gtdrkw34dzxw) does the following" — "hook run" reads as a noun phrase before the reader reaches the real verb.
- "while the hook run when a session starts reaches every clone" → "while the hook that runs when a session starts runs in every clone" — same garden path; "reaches" does not go with a hook. Not certain "runs in" is the intended sense.
- "The hook run when a session starts leaves recording a git hook's mode to the author of the next commit" → "The hook that runs when a session starts leaves it to the author of the next commit to record a git hook's mode" — same garden path, and "leaves recording" misreads as "stops recording".
- "The hook run when a session starts names each git hook" → "The hook that runs when a session starts names each git hook" — "starts names" garden path.
- "git's index holds that git hook without the executable mode" → "git's index records that git hook as not executable" — a file has an executable bit, not "the executable mode".
- "on a system whose files keep the executable bit" → "on a file system that records the executable bit" — it is the file system that supports the bit; not certain "file system" is as wide as "system".

### tools-drafts.json · new:tools-6-reviewer-settings
TRANSLATION:
**Название:** Настройки каждого runner при старте сессии.
**Текст:** В Claude Code хук, запускаемый при старте сессии, записывает в git-конфигурацию пользователя, командой `git config --global`, каждую настройку runner `claude` (§), которую пользователь задал как опцию плагина для Claude Code (§). Он делает это в любом репозитории, где в конфигурации нет этой настройки или в ней другое значение.

Затем, в репозитории, в корне которого есть `sheriff.config.json`, хук агента, запускаемый при старте сессии (§), в Claude Code или в Codex CLI, называет каждую настройку того runner, который `sheriff review` запустил бы там при коммите (§), если в git-конфигурации пользователя этой настройки нет.

Этот runner — тот, который называет `review.runner` в `sheriff.config.json`, а иначе runner того агента, инструменты SpecSheriff плагина которого git-хуки взяли бы там (§). Вместе с каждой настройкой хук называет значение по умолчанию, которое `sheriff review` берёт для неё. Он просит агента сделать следующее:
- предложить пользователю каждое значение по умолчанию, чтобы тот подтвердил или заменил его;
- записать командой `git config --global` значение, которое пользователь даст в ответ, даже если оно совпадает со значением по умолчанию.

Хук обращается с этой просьбой один раз для каждого runner на каждой машине. Обратившись, хук задаёт `specsheriff.review.claudeAsked` или `specsheriff.review.codexAsked` значение `true` в git-конфигурации пользователя. Пока этот ключ равен `true`, хук не спрашивает о настройках этого runner.

**Причина:** Запуск ревьюера оплачивает пользователь, делающий коммит, поэтому он и выбирает настройки ревьюера (§), один раз, как только агент может спросить. Git-хуки запускают ревьюера вне агента, поэтому читают эти настройки из git-конфигурации пользователя, куда хук, запускаемый при старте сессии, записывает и опции, о которых Claude Code спросил пользователя.

**Пример:** Пользователь устанавливает плагин для Codex CLI и открывает репозиторий, настроенный командой `sheriff init --agent codex`. Хук, запускаемый при старте сессии, называет `specsheriff.review.codexModel` и `specsheriff.review.codexEffort` с их значениями по умолчанию, и агент спрашивает о них пользователя. Пользователь подтверждает effort и называет модель, и агент записывает оба значения. Наиболее вероятная ошибка — записать значения по умолчанию, не спросив, так что пользователь платит за настройки, которых не выбирал.
TWO READINGS:
- "It does so in any repository, where the configuration lacks the setting or holds a different value.": (а) в любом репозитории, и притом всякий раз, когда в конфигурации нет настройки или значение другое; (б) только в таком репозитории, в конфигурации которого нет настройки. "the configuration" — git-конфигурация пользователя или репозитория. Контекст за (а) и за конфигурацию пользователя.
- "That runner": назван только в предыдущем абзаце; вероятнее всего, runner, который запустил бы `sheriff review`.
- "this request": названа только в предыдущем абзаце; вероятнее всего, просьба к агенту предложить значения по умолчанию и записать ответ.
- "once for each runner on each machine": ключ пишется в git-конфигурацию пользователя, поэтому читается и как «на каждой машине», и как «для каждого пользователя машины». Текст говорит первое.
- "the hook does not ask about that runner's settings": (а) хук не просит агента спросить; (б) хук сам не спрашивает пользователя. Контекст за (а).
- "the agent writes both": (а) оба значения; (б) обе настройки. По смыслу одно и то же, но "both" стоит после "the effort" и "a model", а не после названий настроек.
LANGUAGE:
- "the hook run when a session starts writes into the user's git configuration" → "the hook that runs when a session starts writes into the user's git configuration" — "hook run" reads as a noun phrase; "starts writes" garden path.
- "the agent's hook run when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI, names each setting" → "the agent's hook that runs when a session starts (§s-477gtdrkw34dzxw), in Claude Code or in Codex CLI, names each setting" — same garden path.
- "where the hook run when a session starts also writes the options" → "where the hook that runs when a session starts also writes the options" — same garden path.
- "The hook run when a session starts names `specsheriff.review.codexModel`" → "The hook that runs when a session starts names `specsheriff.review.codexModel`" — same garden path.
- "It does so in any repository, where the configuration lacks the setting or holds a different value." → "It does so in any repository, whenever the user's git configuration lacks the setting or holds a different value." — the comma makes "where" describe the repository; not certain "the user's git configuration" is the one meant.
- "the default that `sheriff review` takes for it" → "the default that `sheriff review` uses for it" — a program uses a default.
- "the runner of the agent whose plugin's SpecSheriff tools the git hooks would take there" → "the runner of the agent from whose plugin the git hooks would take the SpecSheriff tools there" — the stacked possessives are hard to parse.

### tools-drafts.json · new:tools-6-after-edit
TRANSLATION:
**Название:** Хук агента после правки.
**Текст:** После правки агента, сделанной инструментами редактирования файлов, или после команды оболочки, которую запускает агент, хук агента (§) запускает инструменты SpecSheriff там, где верно одно из следующего:
- последний коммит или рабочее дерево, за исключением файлов, которые git игнорирует, отличается от того, что хук записал в git-каталоге клона, когда проверки запускались в последний раз;
- ничего не записано.

Там, где ничего не записано, хук считает каждый файл отличающимся.

Там, где он их запускает, хук запускает следующее, в таком порядке:
- `sheriff reindex` (§) — если среди отличающихся файлов есть `sheriff.config.json`, файл в `specs/` или файл, который инструменты SpecSheriff читают в поисках SpecTag (§);
- `sheriff markdown` (§) и `sheriff map` (§) — если проект выбрал расширение Views (§) и при этом либо среди отличающихся файлов есть `sheriff.config.json` или файл в `specs/`, либо `sheriff reindex` записал какой-то файл;
- `sheriff types` (§) — если среди отличающихся файлов есть `sheriff.config.json`, файл в `specs/` или код собственного генератора проекта (§), либо если `sheriff reindex` записал какой-то файл;
- `sheriff validate` (§), `sheriff binding` (§) и `sheriff citations` (§).

Там, где `sheriff reindex` что-либо отклоняет, например пару значений под одним ключом (§) или файл, который отклоняет схема (§), хук останавливается после него. Затем он записывает последний коммит и рабочее дерево в том виде, в каком они в этот момент.

Хук передаёт агенту отказы `sheriff reindex`, `sheriff types` и проверок и называет каждый узел спецификации, который `sheriff reindex` делает draft. Он передаёт их Claude Code, завершаясь с кодом 2 и записывая их в свой стандартный поток ошибок. Он передаёт их Codex в ответе, который пишут хуки агента для Codex CLI (§).

Сбой `sheriff markdown` или `sheriff map` при записи файлов передаётся агенту и не останавливает хук.

Когда проверки заканчиваются, отклонили они что-либо или нет, хук записывает последний коммит и рабочее дерево в том виде, в каком они были, когда начался `sheriff validate`. Поэтому файл, изменённый во время работы проверок, проверяется при следующем запуске.

**Причина:** Проверки запускаются там, где работает агент, чтобы ошибка обнаруживалась при той правке, которая её вносит (§). Они запускаются только там, где что-то изменилось с их последнего запуска, чтобы сессия, которая только читает репозиторий через оболочку, не задерживалась.

**Пример:** Агент, написавший тест правила R, добавляет SpecTag правила R к функции в новом файле `src/order.ts`. Хук запускает `sheriff reindex`, который добавляет `src/order.ts` в `meta.code` правила R, и проверки затем принимают этот список. Наиболее вероятная ошибка — запускать `sheriff reindex` только там, где изменился файл в `specs/`, так что `sheriff binding` отклоняет `meta.code` правила R после правки одного лишь кода (§).
TWO READINGS:
- "Where it runs them": "them" названо двумя абзацами выше; вероятнее всего, инструменты SpecSheriff.
- "the last commit or the working tree, other than the files that git ignores, differs": оговорка об игнорируемых файлах относится (а) только к рабочему дереву или (б) и к последнему коммиту. Контекст за (а).
- "the hook stops after it": "it" — `sheriff reindex` или сам отказ. Контекст за `sheriff reindex`.
- "It hands them to Claude Code": "them" — (а) только отказы; (б) отказы и названия узлов, ставших draft. Контекст скорее за (б).
- "names each node that `sheriff reindex` makes a draft": (а) каждый узел, статус которого `sheriff reindex` меняет на draft; (б) каждый узел, который `sheriff reindex` создаёт как draft. Контекст за (а).
- "the test of rule R": (а) единственный тест правила; (б) один из тестов. Текст говорит (а).
LANGUAGE:
- "Where it runs them, the hook runs the following" → "Where the hook runs the SpecSheriff tools, it runs the following" — the pronoun's noun is two paragraphs back.
- "a pair of values under one key" → "a key written more than once" — the other nodes use that wording for the same defect; not certain the two are the same defect.
- "a file that the schema refuses" → "a file that fails validation against the schema" — a schema does not refuse.
- "A failure of `sheriff markdown` or `sheriff map` to write its files is handed to the agent, and does not stop the hook." → "Where `sheriff markdown` or `sheriff map` fails to write its files, the hook reports the failure to the agent and does not stop." — a failure is reported, not handed.
- "the answer that the agent's hooks for Codex CLI write" → "the response that the agent's hooks for Codex CLI write" — a hook's output to its harness is a response.

### tools-drafts.json · s-st6td4mua9uqt9z
TRANSLATION:
**Название:** О правке судят до того, как она сделана.
**Текст:** `sheriff guard` отклоняет каждую из следующих правок агента (§):
- правку, после которой узел спецификации, который она добавляет, или узел, формулировку (§) или статус одобрения (§) которого она меняет, одобрен, тогда как никакое одобрение формулировки этого узла не действует (§);
- правку, которая добавляет или меняет код, связанный с правилом (§), кроме тестов, тогда как ни у одного теста кода системы (§) не объявлен SpecTag этого правила (§);
- правку файла `specs/_approvals.jsonl`, что бы она ни меняла;
- правку, которая добавляет, меняет или удаляет элемент одного из списков `approvalStatus`, `strict` и `extensions` в `sheriff.config.json` (§).

Отказ называет каждый такой узел по его файлу, sid и расположению (§), а каждое такое правило — по его sid и расположению. Там, где тест называет такое правило только голым sid (§), отказ называет также `sheriff reindex`, который записывает SpecTag теста.

Для правки `specs/_approvals.jsonl` отказ называет `sheriff approve`, который записывает одобрение и его отзыв (§). Для правки элемента одного из тех списков он называет список и `sheriff settings` (§).

Пока в установленном плагине SpecSheriff нет расширения, выбранного проектом, `sheriff guard` отклоняет каждую правку и называет каждое отсутствующее расширение и версию инструментов SpecSheriff в плагине (§).

`sheriff guard` судит о правке, сделанной инструментами Claude Code `Write`, `Edit` или `MultiEdit`, и о патче, который применяет `apply_patch` в Codex (§). Он читает правку, как её описывает harness агента, со своего стандартного ввода. Он строит каждый файл таким, каким его оставила бы правка, не записывая его на диск. Там, где правка, сделанная `Edit` или `MultiEdit`, не применилась бы, например где она называет текст, которого в файле нет, `sheriff guard` даёт инструменту самому отклонить её.

`sheriff guard` судит об узлах в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§). Он не учитывает узлы, статус одобрения которых выводится из других узлов, например раздел (§). Файл спецификации, который после правки не был бы корректным JSON, он оставляет проверкам после правки (§).

`sheriff guard` находит код, который правка добавляет или меняет, тем же способом, каким он находит то, что добавляет или меняет коммит (§), сравнивая каждый файл как он есть с файлом, каким его оставила бы правка. Тест, у которого объявлен SpecTag правила, он ищет среди тестов рабочего дерева, каким его оставила бы правка.

`sheriff guard` читает списки `sheriff.config.json` из файла как он есть и каким его оставила бы правка. Отсутствующий или не являющийся корректным JSON `sheriff.config.json` читается как не содержащий ни одного из этих списков.

Там, где он отклоняет правку, `sheriff guard` записывает отказ в свой стандартный поток ошибок и завершается с кодом 2. `sheriff guard` отклоняет эти правки независимо от того, одобрена спецификация или является draft.

**Причина:** `sheriff guard` судит о каждом файле, каким его оставила бы правка, чтобы правка, которую запрещает правило о правке агента, отклонялась до того, как что-либо записано (§). Он судит только о том, что правка добавляет или меняет, чтобы то, что правка оставляет как было, никогда не задерживало правку.

**Пример:** Ответственный просит агента одобрить спецификацию, и агент пытается добавить элемент в `approvalStatus` в `sheriff.config.json` своим инструментом редактирования. `sheriff guard` отклоняет правку и называет `approvalStatus` и `sheriff settings`, и агент запускает `sheriff settings status approved`. Наиболее вероятная ошибка — судить только о файлах в `specs/`, так что элемент записывается без `sheriff settings`, который проверяет, что записывающий является ответственным.
TWO READINGS:
- "a node that it adds, or a node whose wording (§s-5ah25f6gy99panq) or approval status (§s-tgrnpagrb58tya7) it changes": "it" — правка или `sheriff guard`. Контекст за правку.
- "is approved while no approval": (а) имеет статус `approved`; (б) получает одобрение в ходе этой правки. Контекст за (а).
- "other than tests": относится (а) к коду — «код, кроме тестов»; (б) к правилу. Контекст за (а).
- "those lists": названы двумя абзацами выше; вероятнее всего, `approvalStatus`, `strict` и `extensions`.
- "it names the list": "it" — отказ или `sheriff approve` из предыдущего предложения. Контекст за отказ.
- "from its standard input": ввод `sheriff guard` или ввод harness. Контекст за `sheriff guard`.
- "lets the tool refuse it": (а) пропускает правку, чтобы её отклонил сам инструмент; (б) разрешает инструменту отклонить. Контекст за (а).
- "the files that the repository keeps": (а) файлы, отслеживаемые git; (б) файлы спецификации, хранящиеся в репозитории. Контекст не выбирает.
- "in the same way as it finds what a commit adds or changes": "it" читается как `sheriff guard`, то есть `sheriff guard` сам разбирает и коммиты; другое чтение — так, как это делают инструменты SpecSheriff при коммите.
- "the rule's SpecTag": правило в этом абзаце не названо; вероятнее всего, правило, с которым связан добавляемый или меняемый код.
- "these edits": названы только в первом абзаце; вероятнее всего, четыре вида правок из первого списка, но возможно и «каждую правку» из абзаца об отсутствующем расширении.
LANGUAGE:
- "is approved while no approval of that node's wording is in force" → "has the status `approved` while no approval of that node's wording is in force" — "is approved" reads as an action.
- "For an edit to an entry of one of those lists, it names the list" → "For an edit to an entry of `approvalStatus`, `strict` or `extensions`, the refusal names the list" — the lists are two paragraphs back.
- "in the same way as it finds what a commit adds or changes" → "in the same way as the SpecSheriff tools find what a commit adds or changes" — "it" makes `sheriff guard` the one that examines commits; not certain which was meant.
- "a test that declares the rule's SpecTag" → "a test that declares the SpecTag of the rule to which that code is bound" — "the rule" is not named in this paragraph.
- "`sheriff guard` refuses these edits regardless of" → "`sheriff guard` refuses each of the edits listed above regardless of" — "these" has no noun in its paragraph; not certain the edits refused for a missing extension are meant to be included.

### tools-drafts.json · s-n76wt2bkqdmh78x
TRANSLATION:
**Название:** Хуки агента для Codex CLI.
**Текст:** Хуки агента для Codex находятся в файле проекта `.codex/hooks.json`, куда их записывает `sheriff init --agent codex` (§). Это следующие хуки:
- один при старте сессии;
- один перед правкой, сделанной через `apply_patch`;
- один после такой правки или после команды оболочки.

Каждый хук только ищет плагин для Codex CLI (§) в кеше Codex (§) и вызывает скрипт плагина для этого хука: `hooks/session-start.sh`, `hooks/guard.sh` или `hooks/after-edit.sh`. Там, где хук не находит плагина, он ничего не делает.

Каждый скрипт запускает то, что список хуков даёт для его хука (§). В репозитории без `sheriff.config.json` в корне скрипты ничего не делают.

Скрипты отвечают Codex текстом JSON, записанным в их стандартный вывод, и завершаются с кодом 0:
- перед правкой, которую `sheriff guard` (§) отклоняет: `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": <отказ>}}`;
- после правки или команды оболочки, по которой хуку есть что передать агенту (§): `{"decision": "block", "reason": <то, что он передаёт агенту>}`.

Скрипт читает из файла `agent` в папке инструментов SpecSheriff плагина (§), что он обслуживает Codex.

Перед правкой `sheriff guard` делает следующее:
- читает каждый файл, который патч добавляет, обновляет, удаляет или перемещает, по пути, который даёт патч, относительно каталога, в котором работает сессия;
- применяет патч к этим файлам в памяти, считая перемещённый файл удалённым по старому пути и добавленным по новому;
- судит о каждом из этих файлов так же, как судит о правке, сделанной инструментами редактирования файлов (§).

`sheriff guard` отклоняет весь патч в любом из следующих случаев:
- он отклоняет один из файлов патча;
- он не может прочитать или применить патч.

**Причина:** Хуки агента для Codex подчиняют агента, работающего в Codex, тем же проверкам, до и после каждой правки, что и агента в Claude Code. Codex запускает хук проекта только после того, как его пользователь выразил доверие хуку в том виде, в каком тот написан. Поэтому хуку, который только находит плагин и вызывает его скрипты, не требуется новое доверие, когда релиз плагина меняет то, что делают скрипты.

**Пример:** Патч добавляет `src/new.ts` и меняет `specs/_approvals.jsonl`. `sheriff guard` отклоняет патч, а `hooks/guard.sh` записывает запрет в виде JSON с отказом в `permissionDecisionReason`, поэтому Codex не применяет ни одной части патча. Наиболее вероятная ошибка — записать отказ в стандартный вывод простым текстом, который Codex игнорирует перед вызовом инструмента, так что патч применяется.
TWO READINGS:
- "Each hook only looks up the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4) in Codex's cache (§s-4mej6ccn7xu3d3p), and calls": (а) хук делает только два действия — ищет и вызывает; (б) хук только ищет, а кроме того вызывает. Контекст за (а).
- "that it serves Codex": (а) скрипт узнаёт из файла `agent`, что он обслуживает Codex; (б) определение к инструментам — «инструменты, которые он подаёт Codex». Контекст за (а), порядок слов допускает (б).
- "The scripts answer Codex with JSON written to their standard output, and exit with code 0:": двоеточие вводит (а) два случая, в которых скрипты так отвечают; (б) полный перечень всего, что скрипты выводят. Контекст за (а).
- "the hook has something to hand the agent": "the hook" — хук из `.codex/hooks.json` или его скрипт. Контекст не выбирает.
- "which Codex ignores before a tool's call": (а) Codex игнорирует простой текст в хуке перед вызовом инструмента; (б) Codex перестаёт учитывать вывод до того, как вызовет инструмент. Контекст за (а).
LANGUAGE:
- "Each hook only looks up the plugin for Codex CLI" → "Each hook does only two things: it looks up the plugin for Codex CLI" (with "and calls" following) — "only" appears to limit "looks up" alone.
- "A script reads from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u) that it serves Codex." → "A script learns that it serves Codex from the file `agent` in the folder of the plugin's SpecSheriff tools (§s-xr5xxa9cxf2mq5u)." — "that it serves Codex" attaches to "tools".
- "the directory in which the session works" → "the session's working directory" — the standard term.
- "needs no new trust" → "does not have to be trusted again" — "new trust" is not something a hook needs.
- "before a tool's call" → "before a tool call" — the fixed term is "tool call".
- "each file that the patch adds" → "each file that the patch names" — "the patch" is first mentioned here with a definite article, and a file that a patch adds cannot be read; not certain "names" keeps the meaning.

### tools-drafts.json · s-4mej6ccn7xu3d3p
TRANSLATION:
**Название:** Git-хук запускает инструменты SpecSheriff, которые плагин хранит на машине.
**Текст:** При старте сессии плагин для Claude Code (§) копирует инструменты SpecSheriff, которые он содержит, в свой каталог данных, если только в каталоге данных уже нет копии того же релиза. Каталог данных — `<plugins>/data/specsheriff-specsheriff-marketplace/`. `<plugins>` — это `CLAUDE_CODE_PLUGIN_CACHE_DIR`, если эта переменная задана, и `~/.claude/plugins` в противном случае.

Плагин для Codex CLI (§) копии не хранит. Его инструменты SpecSheriff находятся в его каталоге в кеше Codex, `<Codex home>/plugins/cache/specsheriff-marketplace/specsheriff/<version>/tools/`. `<Codex home>` — это `CODEX_HOME`, если эта переменная задана, и `~/.codex` в противном случае.

`~` — домашний каталог пользователя, в Windows это каталог профиля пользователя.

Каждый git-хук, который пишет `sheriff init` (§), делает следующее:
- ищет инструменты SpecSheriff любого из двух плагинов;
- вызывает скрипт для этого хука в их `hooks/`;
- там, где инструменты SpecSheriff не могут работать, запускает собственные инструменты проекта для этого хука (§) и выдаёт уведомление.

Там, где хук находит инструменты SpecSheriff обоих плагинов, он берёт те, чей файл `release` начинается с более высокой версии, при сравнении как семантических версий. Там, где их версии равны, он берёт любые.

Скрипт для хука запускает то, что список хуков даёт для этого хука (§), включая собственные инструменты проекта для этого хука.

Инструменты SpecSheriff не могут работать там, где хук не находит инструментов ни одного из плагинов, или там, где Node.js отсутствует или старше версии, которую называет поле `engines` их `package.json`. В обоих случаях хук запускает собственные инструменты проекта для этого хука и пропускает коммит или push, если ни один из них не завершился сбоем (§). Хуки pre-commit и pre-push тогда сообщают, что инструменты SpecSheriff не выполнили ни одной проверки, и почему: на машине нет инструментов SpecSheriff ни одного плагина, либо Node.js отсутствует или старше той версии, которую хуки называют.

Хук, запускаемый при старте сессии (§), называет каждый из следующих хуков, который содержит то, что записал более ранний релиз `sheriff init`:
- каждый git-хук в `.githooks/`;
- каждый из хуков агента для Codex в `.codex/hooks.json`.

Для каждого такого хука он сообщает, что повторный запуск `sheriff init` заменяет этот хук.

**Причина:** Git-хук, однажды записанный в проект, находит инструменты SpecSheriff, где бы и от какого бы плагина машина их ни хранила, так что проверки не отстают от каждого релиза плагина без какого-либо изменения в проекте. Там, где эти инструменты не могут работать, собственные инструменты проекта продолжают охранять коммит и push, как требует правило о порядке инструментов и проверок (§).

**Пример:** У пользователя оба плагина: плагин для Claude Code релиза 0.7.0 и плагин для Codex CLI релиза 0.6.0. Каждый git-хук запускает инструменты SpecSheriff 0.7.0 из каталога данных плагина для Claude Code, даже когда коммит делается из Codex. Наиболее вероятная ошибка — брать инструменты того агента, который работает, так что коммит, сделанный из Codex, проверяется более ранним релизом.
TWO READINGS:
- "it looks up the SpecSheriff tools of either plugin": (а) ищет инструменты каждого из двух плагинов; (б) ищет инструменты какого-нибудь одного. Контекст за (а), так как следующий абзац говорит о найденных обоих.
- "in their `hooks/`": "their" — инструментов SpecSheriff или плагинов. Контекст за инструменты.
- "unless one of them fails": "them" — собственные инструменты проекта или «коммит или push». Контекст за инструменты.
- "that version, which the hooks name": (а) хуки называют эту версию в сообщении; (б) версия, которую задают сами хуки. Контекст за (а).
- "the `engines` field of their `package.json`": в случае, когда инструменты не найдены, "their" не к чему отнести; вероятнее всего, `package.json` инструментов SpecSheriff.
- "names each of the following hooks that holds what an earlier release of `sheriff init` wrote": (а) хук, в котором всё ещё содержимое от более раннего релиза; (б) хук, который содержит в себе, среди прочего, написанное более ранним релизом. Контекст за (а).
LANGUAGE:
- "The hook run when a session starts (§s-477gtdrkw34dzxw) names each of the following hooks" → "The hook that runs when a session starts (§s-477gtdrkw34dzxw) names each of the following hooks" — "hook run" reads as a noun phrase.
- "it looks up the SpecSheriff tools of either plugin" → "it looks for the SpecSheriff tools of each plugin" — "either" reads as "one or the other"; not certain "each" is meant.
- "gives a notice" → "prints a notice" — a program prints or shows a notice.
- "wherever, and from whichever plugin, a machine keeps them" → "wherever a machine keeps them and whichever plugin they come from" — "keeps them from whichever plugin" does not parse.
- "it takes either" → "it takes either set" — "either" needs its noun after "those".

### tools-drafts.json · s-n4m5zvh96yb299p
TRANSLATION:
**Название:** Собственные инструменты проекта в git-хуке.
**Текст:** Собственные инструменты проекта для git-хука — это файлы непосредственно в `.githooks/<hook>.d/`, первая строка которых называет их интерпретатор. Каждый git-хук, который пишет `sheriff init` (§), запускает только эти файлы и называет любой другой файл там.

Первая строка называет интерпретатор там, где она начинается с `#!`, за которым следуют путь и не более одного аргумента. Возврат каретки, которым заканчивается строка, не учитывается.

Там, где хук запускает инструменты SpecSheriff (§), он запускает собственные инструменты проекта в точках, которые задаёт порядок этого хука (§):
- сначала те, которые собственные guidelines проекта перечисляют как инструменты, переписывающие файлы (§), в порядке этого списка;
- позже остальные инструменты, в порядке байтов их имён.

Хук называет каждый путь в списке инструментов проекта, переписывающих файлы, по которому он ничего не запускает, если этот путь указывает в его собственную папку, `.githooks/<hook>.d/`.

Там, где инструменты SpecSheriff не могут работать (§), хук запускает все собственные инструменты проекта для этого хука в порядке байтов их имён.

Хук запускает каждый из собственных инструментов проекта следующим образом:
- из корня рабочего дерева, интерпретатором, который называет первая строка инструмента, в окружении, которое git даёт хуку, так что инструмент читает рабочее дерево и индекс git;
- с аргументами, которые git передаёт хуку, и с копией стандартного ввода, который git передаёт хуку.

Каждый из собственных инструментов проекта запускается независимо от того, что находят остальные. Хук завершается сбоем там, где один из них завершается с кодом, отличным от нуля.

Там, где хук запускает инструменты SpecSheriff, он также отклоняет коммит или push, независимо от того, одобрена спецификация или является draft, если один из собственных инструментов проекта, запускаемых после инструментов, переписывающих файлы, делает что-либо из следующего (§):
- добавляет, меняет или удаляет файл рабочего дерева, кроме файла, который git игнорирует;
- меняет то, что добавлено в индекс;
- меняет сообщение коммита.

Хук называет каждый инструмент, из-за которого он завершается сбоем, и каждый файл, который такой инструмент добавил, изменил или удалил.

Собственные инструменты проекта для git-хука относятся к собственным инструментам репозитория (§).

**Причина:** Собственные инструменты проекта охраняют то, чего не охраняют проверки SpecSheriff, например сканирование на секреты, поэтому они запускаются на каждой машине, что бы там ни могли инструменты SpecSheriff. Они запускаются в том порядке, в каком запускаются инструменты и проверки (§), чтобы ни один из них не менял то, что проверка уже прочитала. Инструмент распознаётся по первой строке, а не по биту исполняемости, поскольку файл, закоммиченный из системы без этого бита, теряет его.

**Пример:** В `.githooks/pre-commit.d/` лежат `scan` и `tidy`, и собственные guidelines проекта перечисляют `pre-commit.d/tidy` как инструмент, переписывающий файлы. При коммите `tidy` запускается первым и добавляет в индекс файлы, которые он переписывает. `scan` запускается после `sheriff types`, и хук отклоняет коммит там, где `scan` меняет какой-либо файл, который git не игнорирует. Наиболее вероятная ошибка — запускать оба в порядке байтов их имён, так что `scan` читает файлы до того, как `tidy` их переписал.
TWO READINGS:
- "runs only those files": (а) из файлов в этой папке запускает только их; (б) хук вообще не запускает ничего, кроме этих файлов. Контекст за (а).
- "names any other file there": (а) сообщает имя каждого другого файла; (б) даёт имя. Контекст за (а).
- "The hook names each path in the project's list of tools that rewrite files for which it runs nothing": "for which" относится (а) к пути; (б) к файлам. Контекст за (а).
- "into its own folder": папка хука или папка самого пути. Контекст за папку хука.
- "the order of that hook": (а) порядок шагов внутри этого хука; (б) место хука среди других хуков. Контекст за (а).
- "The hook fails where one of them exits with a code other than zero": (а) хук завершается сбоем после того, как отработали все инструменты; (б) сразу на первом таком инструменте. Предыдущее предложение за (а).
- "such as a scan for secrets": пример (а) того, что охраняют инструменты; (б) самого инструмента. По смыслу (б), по грамматике (а).
LANGUAGE:
- "runs only those files, and names any other file there" → "runs only those of the files there, and names every other file there" — as written the hook runs nothing else at all.
- "The hook names each path in the project's list of tools that rewrite files for which it runs nothing, where that path points into its own folder, `.githooks/<hook>.d/`." → "Where a path in the project's list of tools that rewrite files points into the hook's own folder, `.githooks/<hook>.d/`, and the hook runs nothing for that path, the hook names the path." — "for which" attaches to "files" and "its" to "path".
- "it also refuses the commit or the push, regardless of whether the specification is approved or a draft, where one of the project's own tools" → "it also refuses the commit or the push, regardless of whether the specification is approved or a draft, if one of the project's own tools" — two "where" clauses in one sentence, the second a condition.
- "guard what the checks of SpecSheriff do not, such as a scan for secrets" → "check what the SpecSheriff checks do not, for example by scanning for secrets" — a scan is not something that is guarded; "the checks of SpecSheriff" is a word-for-word genitive.
- "A carriage return that ends the line is left out." → "A carriage return that ends the line is ignored." — "left out" needs something to be left out of.

### tools-drafts.json · proposal:row-10-1-37b
TRANSLATION:
Новая строка основной таблицы проверок. Её цена сбоя: «отклонено, с указанием инструмента и каждого файла, который он добавил, изменил или удалил».
**Текст:** Собственный инструмент проекта, кроме проверки, которую добавляют собственные guidelines проекта (§), запускаемый при коммите или push после инструментов, переписывающих файлы (§), оставляет рабочее дерево, кроме файлов, которые git игнорирует, то, что добавлено в индекс, и сообщение коммита такими, какими они были.
TWO READINGS:
- "leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were": (а) оставляет прежними три вещи — рабочее дерево без игнорируемых файлов, индекс и сообщение коммита; (б) оставляет прежним рабочее дерево, за исключением трёх вещей — игнорируемых файлов, индекса и сообщения коммита. Контекст за (а), но перечень через запятые читается и как (б), что переворачивает смысл.
- "that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves": (а) «инструмент, который запускается после переписывающих инструментов, оставляет»; (б) на первом чтении «файлы… оставляет». Верно (а).
- "its cost on failure" / "each file that it added": "it" — инструмент; другого чтения нет, но "Its cost" относится к строке, названной в предыдущем предложении.
LANGUAGE:
- "leaves the working tree, other than the files that git ignores, what is staged and the commit message as they were" → "leaves three things as they were: the working tree apart from the files that git ignores, what is staged, and the commit message" — the exception reads as the first of three listed exceptions.
- "that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves" → "that runs on a commit or a push after the tools that rewrite files (§s-pcnyfp7gev7syax), leaves" restructured as above — "files leaves" garden path between a long subject and its verb; not certain a comma alone is enough.

### tools-drafts.json · s-zh2vcr3xjumppg5
TRANSLATION:
**Название:** Плагин для Claude Code.
**Текст:** Плагин для Claude Code, `specsheriff`, содержит следующее:
- skills плагинов SpecSheriff (§);
- инструменты SpecSheriff, причём каждый файл, общий для всех проектов, лежит по своему пути в папке инструментов SpecSheriff (§), например SpecSheriff guidelines, каждое расширение guidelines (§) и описание инструментов SpecSheriff (§);
- скрипты хуков агента (§).

Плагин объявляет Claude Code хуки агента (§):
- хук, запускаемый при старте сессии;
- хук, запускаемый перед правкой, сделанной через `Write`, `Edit` или `MultiEdit`;
- хук, запускаемый после такой правки или после команды оболочки, запущенной через `Bash` или `PowerShell`.

Плагин объявляет каждую настройку runner `claude` (§) как одну из своих опций. Claude Code спрашивает у пользователя эти опции, когда включает плагин. Описание каждой опции называет значение по умолчанию её настройки. Опция не объявляет значения по умолчанию, так что значение, которое Claude Code хранит для неё, — это значение, которое дал пользователь.

В репозитории без `sheriff.config.json` в корне хуки плагина делают только следующее:
- поддерживают копию инструментов SpecSheriff, принадлежащую плагину, в актуальном состоянии (§);
- записывают настройки, которые пользователь дал как опции плагина (§).

Marketplace `specsheriff-marketplace` перечисляет плагин по относительному пути его каталога, в `.claude-plugin/marketplace.json` в корне репозитория, где пишутся SpecSheriff guidelines. Проект объявляет и то и другое в `.claude/settings.json` (§):
- marketplace — в `extraKnownMarketplaces`, с веткой `release` этого репозитория в качестве источника и с включённым `autoUpdate`;
- плагин — в `enabledPlugins`.

Каждая машина запускает тот релиз, который содержит её копия плагина, пока Claude Code не обновит эту копию.

Skills плагина и хуки агента запускают `sheriff` из инструментов SpecSheriff в плагине, как `node "${CLAUDE_PLUGIN_ROOT}/tools/dist/cli.js"`.

**Причина:** Агент берётся за skill только там, где этот skill установлен. Claude Code устанавливает, обновляет и включает плагин, который объявляет проект. Поэтому плагин доставляет skills, SpecSheriff guidelines с их расширениями и инструменты SpecSheriff, все одного релиза, агенту в каждом клоне. Проект хранит только объявление плагина и вызовы его инструментов.

**Пример:** Проект выбирает расширение RecordType. На каждой машине, где Claude Code обновил плагин до релиза, поставляющего это расширение, инструменты SpecSheriff находят расширение по пути `guidelines/extensions/recordtype.json` в своей папке. Наиболее вероятная ошибка — хранить копию расширения в проекте, что `sheriff validate` отклоняет (§).
TWO READINGS:
- "such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools": примеры (а) файлов, общих для всех проектов; (б) инструментов SpecSheriff или их папки. Контекст за (а), но "such as" стоит после "the folder of the SpecSheriff tools".
- "The option declares no default value": (а) ни одна опция не объявляет значения по умолчанию; (б) какая-то одна определённая опция. Контекст за (а).
- "A project declares both": "both" — marketplace и плагин; раскрывается списком ниже, но на первом чтении может быть понято как «оба файла».
- "An agent takes up a skill": (а) агент начинает пользоваться skill; (б) агент принимает, перенимает skill. Контекст за (а).
- "which `sheriff validate` refuses": (а) отклоняет хранение копии, то есть проект; (б) отклоняет саму копию. Различие невелико.
LANGUAGE:
- "the SpecSheriff tools, with each file common to every project at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u), such as the SpecSheriff guidelines" → "the SpecSheriff tools, with each file common to every project, such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8), at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u)" — the examples stand far from the noun they illustrate.
- "The option declares no default value" → "No option declares a default value" — "The option" has no single option to refer to.
- "An agent takes up a skill only where the skill is installed." → "An agent can use a skill only where the skill is installed." — "take up" means to begin a pastime or to accept an offer; not certain "can use" is the intended strength.
- "all of one release" → "all from the same release" — "of one release" is not idiomatic here.

### tools-drafts.json · s-2pdy9gw2jrjvfb4
TRANSLATION:
**Название:** Плагин для Codex CLI.
**Текст:** Плагин для Codex CLI, `specsheriff`, содержит skills плагинов SpecSheriff (§). Он содержит инструменты SpecSheriff, с файлами, общими для всех проектов (§), и скрипты хуков агента (§), как и плагин для Claude Code (§).

Плагин не объявляет Codex никаких хуков. Хуки агента для Codex находятся в проекте (§). Они вызывают скрипты, которые содержит плагин.

Marketplace `specsheriff-marketplace` перечисляет плагин по относительному пути его каталога, в `.agents/plugins/marketplace.json` в корне того же репозитория, что и marketplace для Claude Code (§).

Руководство практика, `README.md` плагина, даёт команды, которые устанавливают плагин на машину:
- `codex plugin marketplace add non4me/SpecSheriff@release`;
- `codex plugin add specsheriff@specsheriff-marketplace`.

Skills плагина запускают `sheriff` из инструментов SpecSheriff в плагине, как `node <plugin>/tools/dist/cli.js`. Skill берёт `<plugin>` из пути своего `SKILL.md`, `<plugin>/skills/<skill>/SKILL.md`.

**Причина:** Агент берётся за skill только там, где этот skill установлен. Codex устанавливает плагин только для того пользователя, который его добавляет, поэтому каждый пользователь устанавливает плагин для Codex CLI. Каждый релиз этого плагина содержит те же skills и инструменты SpecSheriff, что и тот же релиз плагина для Claude Code, так что пользователи проекта работают по одним и тем же процедурам и проверкам, каким бы агентом каждый ни пользовался.
TWO READINGS:
- "so each user installs the plugin for Codex CLI": (а) каждый пользователь должен установить плагин сам; (б) каждый пользователь его устанавливает, как факт. Контекст за (а).
- "as the plugin for Claude Code does": относится (а) ко всему предложению — и инструменты, и скрипты; (б) только к скриптам хуков. Контекст за (а).
- "the same repository as the marketplace for Claude Code": (а) тот же репозиторий, в котором лежит marketplace для Claude Code; (б) репозиторий, совпадающий с marketplace. Контекст за (а).
- "An agent takes up a skill": как в узле о плагине для Claude Code — «начинает пользоваться» или «перенимает». Контекст за первое.
LANGUAGE:
- "so each user installs the plugin for Codex CLI" → "so each user has to install the plugin for Codex CLI" — the bare present reads as a fact, not a consequence the user must act on; not certain an obligation is meant.
- "An agent takes up a skill only where the skill is installed." → "An agent can use a skill only where the skill is installed." — same as in the node on the plugin for Claude Code.
- "A skill takes `<plugin>` from the path of its `SKILL.md`" → "A skill derives `<plugin>` from the path of its `SKILL.md`" — a value is derived from a path.
- "work by the same procedures and checks" → "follow the same procedures and are held to the same checks" — one does not "work by" checks.
- "at the root of the same repository as the marketplace for Claude Code" → "at the root of the repository that also holds the marketplace for Claude Code" — the ellipsis compares a repository with a marketplace.

### tools-drafts.json · new:tools-15-skills
TRANSLATION:
**Название:** Skills плагинов SpecSheriff.
**Текст:** Каждый плагин SpecSheriff, плагин для Claude Code (§) и плагин для Codex CLI (§), содержит skills `spec`, `spec-review`, `spec-adopt`, `spec-init` (§), `spec-remove` (§) и `spec-settings` (§).

Skills и любой агент, которого они запускают, работают с той моделью и тем reasoning effort, которые пользователь выбрал в сессии.

**Причина:** Каждый плагин SpecSheriff содержит одни и те же skills, чтобы агент каждого плагина следовал одним и тем же процедурам. Никакой выбор, стоящий пользователю токенов, не делается без пользователя, поэтому skills оставляют модель и reasoning effort сессии на усмотрение пользователя.

**Todo:** `spec`, `spec-review` и `spec-adopt` должны быть описаны в собственных узлах спецификации, чего пока не делает ни один узел. Это делает задача после T25.
TWO READINGS:
- "which no node does yet": (а) ни один узел их пока не описывает; (б) ни один узел пока не описан в собственном узле. Контекст за (а).
- "A task after T25 does it": "it" — описание этих skills; "does" — (а) сделает в будущем; (б) делает сейчас. Контекст за (а). "T25" в узле не объяснено.
- "the agent of each plugin": (а) агент, для которого сделан плагин; (б) агент, которого запускает плагин. Контекст за (а).
- "made without the user": (а) без согласия пользователя; (б) в отсутствие пользователя. Контекст за (а).
LANGUAGE:
- "which no node does yet" → "and no node describes them yet" — "which" has no clause to stand for.
- "A task after T25 does it." → "A task that follows T25 will add those nodes." — present tense for a future action, and "it" has no noun; "T25" is a label from the writer's notes that the reader of the node may not know.
- "is made without the user" → "is made without the user's consent" — a choice is made without someone's consent or knowledge; not certain "consent" is the exact sense.
- "the agent of each plugin" → "the agent that each plugin is written for" — a plugin does not have an agent.

### tools-drafts.json · new:tools-15-spec-init
TRANSLATION:
**Название:** Skill `spec-init`.
**Текст:** `spec-init` запускает `sheriff init` (§), с опцией `--agent codex` в плагине для Codex CLI (§).

Затем `spec-init` спрашивает у пользователя каждое из следующего, чего нет в `sheriff.config.json`, и записывает туда каждый ответ (§):
- glob-шаблоны, которым соответствуют файлы с кодом системы (§);
- glob-шаблоны, которым соответствуют файлы с её тестами;
- команду, которая запускает тесты (§).

Затем `spec-init` переходит к настройкам того runner, который запустил бы `sheriff review` (§). Если только в git-конфигурации пользователя не записано, что пользователя уже спрашивали о настройках этого runner (§), `spec-init` делает следующее для каждой из тех настроек, которых в конфигурации нет:
- предлагает пользователю значение настройки по умолчанию, чтобы тот подтвердил или заменил его;
- записывает ответ пользователя командой `git config --global`.

Затем `spec-init` записывает, что пользователя спросили о настройках этого runner, как это делает хук, запускаемый при старте сессии (§).

**Причина:** Сессия, в которой `spec-init` настраивает проект, началась до того, как в проекте появился `sheriff.config.json`, поэтому хук, запускаемый при старте сессии, в этой сессии не спросил ни одной настройки ревьюера (§). Первый запуск ревьюера оплачивает пользователь, поэтому `spec-init` спрашивает до него.
TWO READINGS:
- "`spec-init` then records that the user has been asked about that runner's settings": (а) записывает всегда, даже если это уже записано и вопросов не было; (б) записывает только после того, как спросил. Текст говорит (а). "that runner" назван только в предыдущем абзаце; вероятнее всего, runner, который запустил бы `sheriff review`.
- "the configuration lacks": git-конфигурация пользователя или `sheriff.config.json` из второго абзаца. Контекст за git-конфигурацию пользователя.
- "the files holding its tests": "its" — системы или кода системы. Различие невелико.
- "asks before it": "it" — первый запуск ревьюера или пользователь. Контекст за первый запуск.
LANGUAGE:
- "as the hook run when a session starts does (§s-p29yawkkkgk7kxb)" → "as the hook that runs when a session starts does (§s-p29yawkkkgk7kxb)" — "starts does" garden path after "hook run".
- "so the hook run when a session starts asked for none of the reviewer's settings" → "so the hook that runs when a session starts asked for none of the reviewer's settings" — same garden path.
- "for each of those settings that the configuration lacks" → "for each of those settings that the user's git configuration lacks" — "the configuration" could be `sheriff.config.json`.
- "so `spec-init` asks before it" → "so `spec-init` asks before that run" — "it" stands two clauses from its noun.

### tools-drafts.json · new:tools-15-spec-remove
TRANSLATION:
**Название:** Skill `spec-remove`.
**Текст:** `spec-remove` запускает `sheriff remove` (§), а затем предлагает удалить плагин с машины.

**Причина:** Плагин установлен для своего пользователя на машине, за пределами какого-либо одного проекта. Поэтому `spec-remove` предлагает удалить плагин и оставляет этот выбор пользователю.
TWO READINGS:
- "beyond any one project": (а) не для одного проекта, а для всех проектов пользователя; (б) вне каталога проекта. Контекст за (а).
- "offers to remove the plugin": (а) предлагает пользователю, чтобы skill удалил плагин; (б) предлагает пользователю удалить плагин самому. Контекст не выбирает.
LANGUAGE:
- "installed for its user on the machine, beyond any one project" → "installed for its user on the machine, not for any one project" — "beyond" does not express "independently of"; not certain the replacement keeps the nuance.

### tools-drafts.json · new:tools-15-spec-settings
TRANSLATION:
**Название:** Skill `spec-settings`.
**Текст:** `spec-settings` показывает в чате настройки, которые меняет только ответственный за спецификацию, в том виде, в каком их печатает `sheriff settings` (§). Затем он предлагает пользователю следующие способы изменить их, и пользователь выбирает один:
- вопросы в чате;
- `sheriff settings` в отдельном окне терминала, что skill предлагает только там, где у машины, на которой идёт сессия, есть графический рабочий стол.

После вопросов skill запускает `sheriff settings` с аргументами каждого изменения, о котором просит пользователь. Как только окно терминала закрывается, skill сообщает, чем настройки, которые печатает `sheriff settings`, отличаются от тех, что он показал раньше.

**Причина:** Только ответственный меняет эти настройки, посредством процедуры (§). Терминальной программе нужен рабочий стол, который ответственный может видеть, а у ответственного, работающего удалённо, его нет, поэтому skill предлагает также чат.

**Пример:** Ответственный работает из браузера через Remote Control и просит агента выбрать расширение Views. `spec-settings` предлагает вопросы в чате или отдельное окно терминала, и ответственный выбирает чат. Skill запускает `sheriff settings extension views on`. Наиболее вероятная ошибка — открыть окно, не спросив, на рабочем столе, которого ответственный не видит.
TWO READINGS:
- "the settings that only an owner of the specification changes": (а) настройки, которые вправе менять только ответственный; (б) настройки, которые фактически меняет только ответственный. Контекст за (а).
- "After the questions, the skill runs" и "Once the terminal window closes, the skill reports": (а) два варианта, по одному на каждый выбранный способ; (б) два последовательных шага одного хода. Контекст за (а), но текст не говорит «в первом случае» и «во втором».
- "from those that it showed before": "it" — skill или `sheriff settings`. Контекст за skill.
- "these settings" (в причине): названы только в тексте узла; вероятнее всего, настройки, которые меняет только ответственный.
- "through a procedure": (а) через определённую процедуру, описанную в цитируемом узле; (б) через какую-нибудь процедуру. Контекст за (а).
- "also offers the chat": (а) предлагает чат в дополнение к окну; (б) предлагает чат всегда. Различие невелико.
- "the Views extension" после "to choose": (а) выбрать расширение в смысле метода — включить его для проекта; (б) выбрать из списка. Контекст за (а).
LANGUAGE:
- "the settings that only an owner of the specification changes" → "the settings that only an owner of the specification may change" — the bare present states a habit, not a permission.
- "Only an owner changes these settings, through a procedure" → "Only an owner may change the settings that `spec-settings` shows, and only through the procedure set for that" — "these" has no noun in the reason, and "a procedure" names none; not certain a single set procedure is meant.
- "After the questions, the skill runs" → "Where the user chooses the questions, the skill then runs" — as written the two sentences read as consecutive steps.
- "Once the terminal window closes, the skill reports" → "Where the user chooses the terminal window, the skill reports, once the window closes," — same reason.
- "which an owner working remotely lacks" → "which an owner who works remotely does not have" — "lacks a desktop that the owner can see" doubles back on "the owner".

## The main session's decisions

They are in fix-brief-group8-c.md, which holds the decisions on all six reports of the follow-up review.
