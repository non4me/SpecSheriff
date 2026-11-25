# The first review of group 8, part d: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review`. I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/…/specsheriff-terminology-review/` instead, as the brief allows.

# Group 8 review: the plugins and their skills

All three drafts are **not ready**. The author can fix every finding except one, the last finding on the skills node, which goes to the owner. The drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`.

## 1. `s-zh2vcr3xjumppg5`, "The plugin for Claude Code": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✗ "the agent's hooks: the hook run when a session starts, the hook before an edit …, and the hook after …". Three items of one kind are inside one sentence instead of a list.
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗
  - "Each option names its default and declares no default value, so that …"
  - In the reason: "An agent takes up a skill only where it is installed, and Claude Code installs …"
  - In the reason: "… to the agent of every clone together, and the project keeps only the calls to them"
- 7.3.3 The contents of a node ✓ Every part describes the one package that Claude Code installs, and whoever builds it needs all the parts together.
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ The first list item is 48 words long, and ": the SpecSheriff guidelines, each extension … with their schemas" restates the table of s-zefk589ykh37b8u.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓ The example agrees with the text and with the agreed s-6bmnsbskg6en4nf.
- Pairing test ✓ The reason's two sentences ground the paragraphs in reverse order, not one by one.

**Оценка**
- согласованность: ✓ сравнено с 2.5 (s-bsya3febm6u64ab), 1.7.1 (s-mbmnsnxenmavu3z), proposal:s-83ev4wwesbwnhnp, согласованными s-zefk589ykh37b8u, s-tnz9zgqx8c629a7, s-7unxytshhc4md54, s-6bmnsbskg6en4nf, черновиками s-p29yawkkkgk7kxb, s-4mej6ccn7xu3d3p, s-477gtdrkw34dzxw, решениями узла 2026-10-29, 10-30, 11-02 и принципами.
- целостность: ✓ ссылки из s-7unxytshhc4md54, s-xr5xxa9cxf2mq5u, s-tnz9zgqx8c629a7, s-4mej6ccn7xu3d3p держатся; перенацеливание s-tnz9zgqx8c629a7 записано в заметках.
- целесообразность: ✓ проблема названа: каждый клон получает skills, guidelines с расширениями и инструменты одного выпуска.
- избыточность: ✗ перечень после двоеточия повторяет таблицу s-zefk589ykh37b8u и уже расходится с ней: `config.schema.json` не схема ни guidelines, ни расширения, ни описания инструментов.
- недостаточность: ✗ не назван файл marketplace (`.claude-plugin/marketplace.json`, его проверяет тест), хотя узел плагина для Codex CLI на этот файл ссылается.

**Findings**
1. **WORDING FIX** (author; 7.5.2, redundancy). Replace the first list item.
   - EN: "the SpecSheriff tools, with each file common to every project at its path in the folder of the SpecSheriff tools (§s-zefk589ykh37b8u), such as the SpecSheriff guidelines, each extension of the guidelines (§s-mbmnsnxenmavu3z) and the appendix of the tools (§s-a4rbry4hsu34hy8);"
   - RU: «инструменты SpecSheriff вместе с каждым файлом, общим для всех проектов, по его пути в папке инструментов SpecSheriff (§s-zefk589ykh37b8u), например с SpecSheriff guidelines, каждым расширением guidelines (§s-mbmnsnxenmavu3z) и описанием инструментов (§s-a4rbry4hsu34hy8);»
2. **WORDING FIX** (author; 7.2.2). Set the declared hooks out as a list.
   - EN: "The plugin declares the agent's hooks (§s-477gtdrkw34dzxw) to Claude Code:
     - the hook run when a session starts;
     - the hook run before an edit made with `Write`, `Edit` or `MultiEdit`;
     - the hook run after such an edit or after a shell command run with `Bash` or `PowerShell`."
   - RU: «Плагин объявляет Claude Code хуки агента (§s-477gtdrkw34dzxw):
     - хук при начале сессии;
     - хук перед правкой, сделанной инструментом `Write`, `Edit` или `MultiEdit`;
     - хук после такой правки или после команды оболочки, выполненной инструментом `Bash` или `PowerShell`.»
3. **WORDING FIX** (author; 7.3.2). "Names its default" reads as a contradiction of "declares no default value". In `plugin.json`, it is the option's description that names the default. The Russian also adds «всегда», which the English does not say.
   - EN: "The description of each option names the default of its setting. The option declares no default value, so that a value that Claude Code holds for it is one that the user gave."
   - RU: «Описание каждого параметра называет значение его настройки по умолчанию. Сам параметр не объявляет значения по умолчанию, чтобы значение, которое Claude Code для него хранит, было тем, что дал пользователь.»
4. **DOUBT** (author can fix; it adds a fact that the e2e test already checks). Name the marketplace file. This also removes "whose", which grammatically attaches to `extraKnownMarketplaces`.
   - EN: "… lists the plugin by the relative path of its directory, in `.claude-plugin/marketplace.json` at the root of the repository where the SpecSheriff guidelines are written." and "the marketplace under `extraKnownMarketplaces`, with the branch `release` of that repository as its source and with `autoUpdate` on;"
   - RU: «… перечисляет плагин в `.claude-plugin/marketplace.json` в корне репозитория, где пишутся SpecSheriff guidelines, по относительному пути его папки.» и «marketplace — под `extraKnownMarketplaces`, с веткой `release` этого репозитория как источником и с включённым `autoUpdate`;»
5. **WORDING FIX** (author; 7.3.2). The reason also has an ambiguous "it": the agent or the skill.
   - EN: "An agent takes up a skill only where the skill is installed. Claude Code installs, updates and enables a plugin that a project declares. So the plugin brings the skills, the SpecSheriff guidelines with their extensions and the SpecSheriff tools of one release to the agent of every clone. The project keeps only the declaration of the plugin and the calls to its tools."
   - RU: «Агент берёт skill, только если этот skill установлен. Claude Code устанавливает, обновляет и включает плагин, который объявляет проект. Поэтому плагин приносит агенту каждого клона skills, SpecSheriff guidelines с их расширениями и инструменты SpecSheriff одного выпуска. Проект хранит только объявление плагина и вызовы его инструментов.»

## 2. `s-2pdy9gw2jrjvfb4`, "The plugin for Codex CLI": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "the files common to every project" and "the agent's hooks". The sentence cites only s-zh2vcr3xjumppg5, not the nodes that define these words.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗
  - "The agent's hooks for Codex are in the project, and call the scripts …"
  - In the reason: "An agent takes up a skill only where it is installed, and Codex installs …"
  - In the reason: "So each user installs …, which brings …, while each agent updates its own plugin"
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓ The node has no example, and none is needed: the install commands already show the case.
- Pairing test ✓

**Оценка**
- согласованность: ✓ сравнено с черновиками s-n76wt2bkqdmh78x, s-4mej6ccn7xu3d3p, s-477gtdrkw34dzxw, согласованными s-zefk589ykh37b8u, s-7unxytshhc4md54, s-xr5xxa9cxf2mq5u, правилами 2.5 и 1.7.1 и решением 2026-11-02.
- целостность: ✗ список `removed` снимает ссылку `cites` на s-477gtdrkw34dzxw, а «хуки агента» в первом абзаце её требуют; входящие ссылки из s-zefk589ykh37b8u, s-4mej6ccn7xu3d3p, s-xr5xxa9cxf2mq5u держатся.
- целесообразность: ✓ Codex не ставит плагин, который объявил проект, поэтому узел говорит, как плагин ставит сам пользователь.
- избыточность: ✓ состав плагина дан ссылкой на узел плагина для Claude Code, а не повторён.
- недостаточность: ✗ «рядом с файлом» не говорит, в каком репозитории лежит `.agents/plugins/marketplace.json`; в русском «по относительному пути его папки в `.agents/…`» читается так, будто папка лежит в файле; «тот же выпуск… а каждый агент обновляет свой плагин сам» противоречит само себе.

**Findings**
1. **WORDING FIX** (author; 7.2.7). Also restore the `cites` link to s-477gtdrkw34dzxw and add one to s-zefk589ykh37b8u.
   - EN: "It holds the SpecSheriff tools, with the files common to every project (§s-zefk589ykh37b8u), and the scripts of the agent's hooks (§s-477gtdrkw34dzxw), as the plugin for Claude Code does (§s-zh2vcr3xjumppg5)."
   - RU: «Он содержит инструменты SpecSheriff вместе с файлами, общими для всех проектов (§s-zefk589ykh37b8u), и скрипты хуков агента (§s-477gtdrkw34dzxw), как и плагин для Claude Code (§s-zh2vcr3xjumppg5).»
2. **WORDING FIX** (author; 7.3.2).
   - EN: "The agent's hooks for Codex are in the project (§s-n76wt2bkqdmh78x). They call the scripts that the plugin holds."
   - RU: «Хуки агента для Codex находятся в проекте (§s-n76wt2bkqdmh78x). Они вызывают скрипты, которые содержит плагин.»
3. **WORDING FIX** (author; insufficiency). This replaces the sentence "That file is beside …".
   - EN: "The marketplace `specsheriff-marketplace` lists the plugin by the relative path of its directory, in `.agents/plugins/marketplace.json` at the root of the same repository as the marketplace for Claude Code (§s-zh2vcr3xjumppg5)."
   - RU: «Marketplace `specsheriff-marketplace` перечисляет плагин в `.agents/plugins/marketplace.json` в корне того же репозитория, что и marketplace для Claude Code (§s-zh2vcr3xjumppg5), по относительному пути его папки.»
4. **WORDING FIX** (author; 7.3.2). The purpose clause at the end of the reason is my inference.
   - EN: "An agent takes up a skill only where the skill is installed. Codex installs a plugin only for the user who adds it, so each user installs the plugin for Codex CLI. Each release of that plugin holds the same skills and SpecSheriff tools as the same release of the plugin for Claude Code, so that a project's users work by the same procedures and checks whichever agent each runs."
   - RU: «Агент берёт skill, только если этот skill установлен. Codex устанавливает плагин только для того пользователя, который его добавляет, поэтому каждый пользователь устанавливает плагин для Codex CLI. Каждый выпуск этого плагина содержит те же skills и инструменты SpecSheriff, что и тот же выпуск плагина для Claude Code, чтобы пользователи проекта работали по одним и тем же процедурам и проверкам, каким бы агентом ни пользовался каждый.»

## 3. `new:tools-15-skills` (s-kq6wmdud9c7j2k9), "The skills of the SpecSheriff plugins": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✗
  - "takes up the settings" uses no plain verb.
  - "each setting that the user has already been asked for": s-p29yawkkkgk7kxb records the asking once for each runner, not for each setting.
  - "records that the runner has been asked": the user is asked, about the runner's settings.
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✓
- 7.2.4 Naming ✓
- 7.2.4.1 Coined names ✓
- 7.2.4.2 What a name says ✓
- 7.2.4.3 A general word in a name ✓
- 7.2.4.4 Properties ✓
- 7.2.4.5 Relations to other entities ✓
- 7.2.5 Definition by negation ✓
- 7.2.6 Lists that restrict ✓
- 7.2.7 Words that take their meaning from the specification ✗ "Each SpecSheriff plugin" is used for the first time without citing either plugin node.
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✗ "`sheriff settings` in a terminal window of its own, where the session runs …, after which the skill reports what changed;". The item holds a condition and a later step.
- 7.3.3 The contents of a node ✗ `spec-init`, `spec-remove` and `spec-settings` are procedures, and each can be carried out without the others.
- 7.4.1 Counts in prose ✗ "either SpecSheriff plugin" in the reason counts the plugins.
- 7.4.2 The reason ✗ It does not say what `spec-init`'s question solves: the session start asked nothing, because `sheriff.config.json` did not yet exist. "Each skill performs its procedure through the SpecSheriff tools" is not shown for `spec`, `spec-review` or `spec-adopt`.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✗ The same list item as under 7.3.2.
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓ The example agrees with the text, including the text after fix 4.
- Pairing test ✓

**Оценка**
- согласованность: ✗ «каждую настройку, о которой уже спрашивали» расходится с s-p29yawkkkgk7kxb и с решением 2026-11-02 («the question is put once on each machine»): отметка ставится на runner; русское «уровень рассуждений» расходится с «effort» согласованного s-tnz9zgqx8c629a7. Сравнено также с 1.7.5 (s-9ttvcwpqkehm58g), s-chsfpkgpmfk4fft, s-7unxytshhc4md54 и решением 2026-11-18.
- целостность: ✗ узел не ссылается на узлы плагинов, хотя они ссылаются на него; решения 2026-11-02 и 2026-11-03 и решение 2026-11-18 о `spec-settings` не перенесены в новый узел (принцип «A rule is self-sufficient»).
- целесообразность: ✓ одно место для того, что повторяли оба узла плагинов («One statement, one home»); `spec-settings` следует решению 2026-11-18.
- избыточность: ✓ s-chsfpkgpmfk4fft и s-p29yawkkkgk7kxb процитированы, а не повторены.
- недостаточность: ✗ не сказано, когда skill может открыть окно и когда сообщает об изменениях; не сказано, что делают `spec`, `spec-review` и `spec-adopt`; не сказано, что `spec-init` спрашивает `code`, `tests` и `testCommand` (шаг 4 SKILL.md).

**Findings**
1. **WORDING FIX** (author; 7.3.3, 7.4.2). Split the node into four, as was done for "The hooks". The rule "A node is split within its section without asking" covers this.
   - **(a)** s-kq6wmdud9c7j2k9 keeps the list of the skills and the sentence of fix 5.
   - **(b)** `spec-init`, which implements s-m4h279nbaqkpa3t.
   - **(c)** `spec-remove`, with the reason the approved node gave.
   - **(d)** `spec-settings`, which implements s-9ttvcwpqkehm58g.

   New reasons:
   - (a) EN: "Each SpecSheriff plugin holds the same skills, so that the agent of each plugin follows the same procedures. No choice that costs the user tokens is made without the user, so the skills leave the session's model and effort to the user."
   - (a) RU: «Каждый плагин SpecSheriff содержит одни и те же skills, чтобы агент каждого плагина следовал одним и тем же процедурам. Ни один выбор, за который пользователь платит токенами, не делается без него, поэтому skills оставляют модель и effort сессии пользователю.»
   - (b) EN: "The session in which `spec-init` sets a project up started before the project held `sheriff.config.json`, so its session start asked for none of the reviewer's settings (§s-p29yawkkkgk7kxb). The user pays for the reviewer's first run, so `spec-init` asks before it."
   - (b) RU: «Сессия, в которой `spec-init` настраивает проект, началась до того, как в проекте появился `sheriff.config.json`, поэтому при её начале ни о какой настройке рецензента не спрашивали (§s-p29yawkkkgk7kxb). Первый прогон рецензента оплачивает пользователь, поэтому `spec-init` спрашивает до него.»
   - (d) EN: "Only an owner changes these settings, through a procedure (§s-9ttvcwpqkehm58g). The terminal program needs a desktop that the owner can see, which an owner working remotely lacks, so the skill also offers the chat."
   - (d) RU: «Эти настройки меняет только ответственный, через процедуру (§s-9ttvcwpqkehm58g). Программе в терминале нужен рабочий стол, который ответственный видит, а у ответственного, работающего удалённо, его нет, поэтому skill предлагает и чат.»
2. **WORDING FIX** (author; 7.2.7). The first sentence of (a); also add `cites` links to both plugin nodes.
   - EN: "Each SpecSheriff plugin, the plugin for Claude Code (§s-zh2vcr3xjumppg5) and the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4), holds the skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` and `spec-settings`."
   - RU: «Каждый плагин SpecSheriff — плагин для Claude Code (§s-zh2vcr3xjumppg5) и плагин для Codex CLI (§s-2pdy9gw2jrjvfb4) — содержит skills `spec`, `spec-review`, `spec-adopt`, `spec-init`, `spec-remove` и `spec-settings`.»
3. **WORDING FIX** (author; 7.1, consistency). The text of (b) after the sentence on `sheriff init`.
   - EN: "`spec-init` then turns to the settings of the runner that `sheriff review` would run (§s-xr5xxa9cxf2mq5u). Unless the user's git configuration records that the user has been asked about that runner's settings (§s-p29yawkkkgk7kxb), `spec-init` does the following for each of those settings that the configuration lacks: [the two items, unchanged]. `spec-init` then records that the user has been asked about that runner's settings, as the hook run when a session starts does (§s-p29yawkkkgk7kxb)."
   - RU: «Затем `spec-init` переходит к настройкам runner, которого запустил бы `sheriff review` (§s-xr5xxa9cxf2mq5u). Если в конфигурации git пользователя не записано, что пользователя о настройках этого runner уже спрашивали (§s-p29yawkkkgk7kxb), `spec-init` для каждой из этих настроек, которой в конфигурации нет, делает следующее: […]. Затем `spec-init` записывает, что пользователя о настройках этого runner уже спрашивали, так же как это делает хук при начале сессии (§s-p29yawkkkgk7kxb).»
4. **WORDING FIX** (author; 7.3.2, insufficiency). The text of (d), following the proposal the owner accepted on 2026-11-18 (`t25-one-thought.md`, lines 438–447: offer the window on a machine with a graphical desktop, and report the change when the window closes).
   - EN: "`spec-settings` shows in the chat the settings that only an owner of the specification changes, as `sheriff settings` prints them (§s-chsfpkgpmfk4fft). It then offers the user the following ways to change them, and the user chooses one:
     - questions in the chat;
     - `sheriff settings` in a terminal window of its own, which the skill offers only where the machine that runs the session has a graphical desktop.

     After the questions, the skill runs `sheriff settings` with the arguments of each change that the user asks for. Once the terminal window closes, the skill reports how the settings that `sheriff settings` prints differ from those that it showed before."
   - RU: «`spec-settings` показывает в чате настройки, которые меняет только ответственный за спецификацию, так, как их печатает `sheriff settings` (§s-chsfpkgpmfk4fft). Затем он предлагает пользователю следующие способы изменить их, и пользователь выбирает один:
     - вопросы в чате;
     - `sheriff settings` в отдельном окне терминала — skill предлагает его, только если у машины, на которой работает сессия, есть графический рабочий стол.

     После вопросов skill запускает `sheriff settings` с аргументами каждого изменения, о котором просит пользователь. Когда окно терминала закрывается, skill сообщает, чем настройки, которые печатает `sheriff settings`, отличаются от тех, что он показал раньше.»
5. **WORDING FIX / CUT** (author). The rule "A rule says what holds" asks for the positive form, and "effort" is the agreed Russian word (s-tnz9zgqx8c629a7).
   - EN: "The skills, and any agent that they start, work at the model and the reasoning effort that the user has chosen in the session."
   - RU: «Skills и любой агент, которого они запускают, работают с моделью и effort, которые пользователь выбрал в сессии.»
6. **DOUBT** (author can fix). Add to `stage3` the following:
   - copy onto the new nodes the decisions of 2026-11-02 (the part on `spec-init` and the skills' model) and of 2026-11-03 (the names of the skills);
   - record the owner's ruling of 2026-11-18 on `spec-settings`;
   - split the combined test "…spec-init runs sheriff init, and spec-remove sheriff remove…" in both plugin nodes, which still names both moved skills.
7. **DOUBT** (only the owner can answer, because it decides scope). No node says what `spec`, `spec-review` and `spec-adopt` do. `spec-init`'s SKILL.md also does three things that no node states:
   - it asks for `code`, `tests` and `testCommand`;
   - it offers to approve the specification, which no longer matches the agreed s-7unxytshhc4md54;
   - it commits.

   So the plugins ship procedures that no owner approved, against the principle "Nothing unapproved is implemented". I recommend adding one sentence to (b) now, since the agreed s-7unxytshhc4md54 leaves these values to be set, and a todo for the three other skills.
   - EN: "`spec-init` then asks the user where the system's code and its tests are kept and which command runs the tests, and writes the answers into `sheriff.config.json`."
   - RU: «Затем `spec-init` спрашивает пользователя, где хранятся код системы и её тесты и какая команда запускает тесты, и записывает ответы в `sheriff.config.json`.»

**TERM:** none. "plugin", "marketplace", "skill", "hook" and "option" are the agents' own vocabulary, as the code shows: `userConfig`, `extraKnownMarketplaces`, `enabledPlugins` (unverified against the current docs). No vocabulary in the skill's registry names how agent plugins are distributed (inference).

## Points to look at in this input
- **The skills moved into one node, with `spec-settings` added.** Moving them holds, under "One statement, one home", the rulings of 2026-11-18 and group 6, item 10. Keeping them in one node does not hold: rule 7.3.3 settles it, and the rules let the author split the node without asking.
- **The four questions for the base specification.** None of them blocks these three drafts. Questions 1 and 2 concern s-4mej6ccn7xu3d3p and the pre-commit hook. Questions 3 and 4 concern the guard, which the plugin for Claude Code only declares.
- **The split of "The hooks".** The plugin nodes' citations of s-477gtdrkw34dzxw still hold, because that node still lists the agent's hooks.

## The question only the owner can answer
1. Skills node, finding 7: whether the node states `spec-init`'s other steps now (recommended: add the sentence on `code`, `tests` and `testCommand`) and records a todo for describing `spec`, `spec-review` and `spec-adopt`.

## The main session's decisions

`s-zh2vcr3xjumppg5`:
- 1.1: applied.
- 1.2: applied.
- 1.3: applied, and the drafting agent checks in `plugin.json` that the description names the default.
- 1.4: applied.
- 1.5, the reason: applied, with "of one release" kept for all three things that the plugin brings.

`s-2pdy9gw2jrjvfb4`:
- 2.1: applied, with both `cites` links.
- 2.2: applied.
- 2.3: applied. It replaces the thorough reader's change to "That file is beside …".
- 2.4, the reason: applied. It replaces the thorough reader's change.

`new:tools-15-skills`:
- 1, the split into four nodes: applied, under rule 7.3.3 and the rule "A node is split within its section without asking". Each new node gets a new sid, checked to be unique. In the reasons, "the hook run when a session starts" replaces "the session start".
- 2: applied.
- 3: applied.
- 4, `spec-settings` as the owner ruled on 2026-11-18: applied.
- 5: applied, with "run with the model and the reasoning effort that the user has chosen in the session". The Russian text keeps the word «effort».
- 6, `stage3`: applied.
- 7, the skills that no node describes: put to the owner on the page of group 8, as question 3. Option A, recommended: the node of `spec-init` states each step that an agreed node requires of it, such as asking where the code and the tests are kept and which command runs the tests. `stage3` brings `spec-init`'s SKILL.md into line with the agreed s-7unxytshhc4md54, so that the skill no longer offers to approve the specification. The node keeps the step of committing only if an agreed node requires it. A todo on s-kq6wmdud9c7j2k9 records that `spec`, `spec-review` and `spec-adopt` are to be described, and a task after T25 describes them, with its own estimate. Option B: group 8 describes those three skills now, which adds three or more nodes and at least one more round of review.

The points to look at: the reviewer's readings stand.
