# The follow-up review of group 8, part d: the report of specsheriff-rule-reviewer

The Skill tool could not load `specsheriff-terminology-review`, so I read its SKILL.md from `C:/Users/PC/.claude/skills/synced/…/specsheriff-terminology-review/` instead, as the brief allows.

# Group 8, part d, second review: the plugins and their skills

None of the six drafts is ready yet. The author can fix every finding. Three points need the owner's answer and are listed at the end.

All of the first review's findings on these drafts were applied, and so were the readers' findings. Round b introduced the following new defects:
- the split node on the skills has a reason that goes through its text one paragraph at a time;
- the `implements` link to 2.5 on `spec-remove` asserts something that does not hold;
- the `stage3` notes keep skill steps that are inconsistent with decision 4.

## 1. `s-zh2vcr3xjumppg5`, "The plugin for Claude Code": **not ready**

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
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ сравнено с 2.5 (s-bsya3febm6u64ab), 1.7.1 (s-mbmnsnxenmavu3z) и 10.3 (s-83ev4wwesbwnhnp); с согласованными s-zefk589ykh37b8u, s-tnz9zgqx8c629a7, s-7unxytshhc4md54 и s-6bmnsbskg6en4nf; с черновиками s-477gtdrkw34dzxw, s-4mej6ccn7xu3d3p и s-p29yawkkkgk7kxb; с решениями узла от 2026-10-29, 10-30, 11-02 и 11-03. plugin.json, hooks.json и session-start.sh делают то же самое.
- целостность: ✓ ссылки из s-7unxytshhc4md54, s-4mej6ccn7xu3d3p, s-xr5xxa9cxf2mq5u, s-tnz9zgqx8c629a7, s-p29yawkkkgk7kxb и s-477gtdrkw34dzxw держатся. Перенацеливание ссылки в s-tnz9zgqx8c629a7 записано в заметках, п. 10.
- целесообразность: ✓ в каждом клоне skills, guidelines с расширениями и инструменты SpecSheriff — одного выпуска.
- избыточность: ✓ хуки перечислены и в s-477gtdrkw34dzxw, но здесь добавлено, для каких инструментов Claude Code они объявлены.
- недостаточность: ✗ `reasonChange` скрывает, что часть доводов убрана, а не перенесена (1.2).

**Findings**
1.1 **WORDING FIX** (author). The sentence "The option declares no default value" is a negative statement, which the owner's rule "A rule says what holds" forbids. Replace both sentences:
- EN: "Each option names the default of its setting only in its description, so that a value that Claude Code holds for the option is one that the user gave."
- RU: «Каждый параметр называет значение своей настройки по умолчанию только в своём описании, чтобы значение, которое Claude Code хранит для этого параметра, было тем, что дал пользователь.»

1.2 **WORDING FIX** (author, in `reasonChange`). The field says that the dropped arguments moved to the node on the skills. Two of them moved nowhere: the one on the branch `release` and the one on projects that do not take up the method.
- RU: «Было: восемь абзацев, которые по порядку объясняли абзацы текста. Теперь обоснование говорит, зачем нужен узел в целом (правило 7.4.2). Доводы о skills и о `spec-init` перешли в узлы о skills; довод о значении по умолчанию стал придаточным «чтобы» в тексте. Доводы о том, почему источник marketplace — ветка `release`, и о том, что проект без метода ничем не связан, убраны как пояснения к отдельным абзацам.»

1.3 **Nits** (the context already makes the meaning clear):
- The reason's last sentence can be read as "the project keeps nothing else". Fix: "Of the plugin, the project keeps only its declaration and the calls to its tools." RU: «От плагина в проекте остаются только его объявление и вызовы его инструментов.»
- In the example, `sheriff validate` refuses a copy only in `specs/_guidelines/extensions/` (s-6bmnsbskg6en4nf). Fix: "…to keep a copy of the extension in `specs/_guidelines/extensions/`…".
- RU: «хук при начале сессии» should read «хук, который запускается при начале сессии», as in s-p29yawkkkgk7kxb and `spec-init`.

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
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓ (none needed: the install commands show the case)
- Pairing test ✓

**Оценка**
- согласованность: ✓ сравнено с 2.5 и 1.7.1; с s-n76wt2bkqdmh78x, s-4mej6ccn7xu3d3p, s-zefk589ykh37b8u и s-xr5xxa9cxf2mq5u; с решением 2026-11-02; с обоими файлами marketplace.
- целостность: ✓ ссылки из s-n76wt2bkqdmh78x, s-4mej6ccn7xu3d3p, s-xr5xxa9cxf2mq5u и s-7unxytshhc4md54 держатся.
- целесообразность: ✓ Codex не ставит плагин, который объявляет проект.
- избыточность: ✗ третье предложение обоснования повторяет первое предложение обоснования s-kq6wmdud9c7j2k9 (снимается находкой 3.1).
- недостаточность: ✗ ни этот узел, ни s-n76wt2bkqdmh78x больше не говорят, почему плагин не объявляет хуков (2.2).

**Findings**
2.1 **WORDING FIX** (author). Same rule as 1.1. Replace "The plugin declares no hooks to Codex. The agent's hooks for Codex are in the project (§s-n76wt2bkqdmh78x)." with:
- EN: "The agent's hooks for Codex are only in the project (§s-n76wt2bkqdmh78x)."
- RU: «Хуки агента для Codex находятся только в проекте (§s-n76wt2bkqdmh78x).»

2.2 **DOUBT** (the author checks; the owner may need to answer). The approved reason, "Codex admits no plugin carrying hooks into its public directory", has been dropped here and from s-n76wt2bkqdmh78x, and `reasonChange` does not say so.
- Codex's documentation now describes hooks bundled in a plugin, and Codex reviews them again whenever a bundled script changes.
- Whether its public directory admits such a plugin is unverified.
- If the old reason still holds, put it back in the reason of s-n76wt2bkqdmh78x.
- If it no longer holds, add a todo to this node: whether the agent's hooks for Codex move into the plugin (for the owner, after stage 2).
- In either case, `reasonChange` names what was dropped.

2.3 **Nit**. "the same repository as the marketplace for Claude Code" could be "the repository where the SpecSheriff guidelines are written", which is how node 1 names it.

## 3. `new:tools-15-skills` (s-kq6wmdud9c7j2k9), "The skills of the SpecSheriff plugins": **not ready**

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
- 7.2.7 Words that take their meaning from the specification ✗ `spec`, `spec-review` and `spec-adopt` are named, and nothing explains them (question 3).
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓ (the list gives the scope of "the skills" in the second paragraph)
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ see the pairing test.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✗ "Each SpecSheriff plugin holds the same skills, so that…" grounds paragraph 1, and "No choice that costs the user tokens…" grounds paragraph 2, one by one and in order.

**Оценка**
- согласованность: ✓ решения 2026-11-02, 11-03 и 11-18. Принцип «Nothing unapproved is implemented» не выполнен для трёх skills — это вопрос 3.
- целостность: ✗ связь implements с 2.5 не держится: согласованный 2.5 ничего не говорит о skills (5.3). Часть теста о модели не передана этому узлу (3.2).
- целесообразность: ✓ список skills теперь в одном месте.
- избыточность: ✗ обоснование повторяет s-2pdy9gw2jrjvfb4 (3.1).
- недостаточность: ✗ `spec`, `spec-review` и `spec-adopt` ничем не объяснены (вопрос 3).

**Findings**
3.1 **WORDING FIX** (author). Replace the reason:
- EN: "The skills give the agent of each SpecSheriff plugin the same procedures, at a cost that only the user who pays for the session chooses."
- RU: «Skills дают агенту каждого плагина SpecSheriff одни и те же процедуры, по цене, которую выбирает только пользователь, оплачивающий сессию.»

3.2 **WORDING FIX** (author, `stage3`). The test at plugin.test.ts:261 checks every SKILL.md for a model or an effort. `spec-init`'s `stage3` moves that whole test to `spec-init`. Add to this node's `stage3`: "The part of the test 'spec-init offers each setting …; the skills set no model and no effort' that checks every SKILL.md for a model or an effort moves here and carries this sid."

## 4. `new:tools-15-spec-init` (s-ttsc8tpnu46q53s), "The skill `spec-init`": **not ready**

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
- 7.2.7 Words that take their meaning from the specification ✓
- 7.3.1 The title ✓
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓ (steps of one procedure)
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✗ It speaks only of the reviewer's settings, and says nothing on why the skill asks for the code, the tests and the test command.
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓ (an example is proposed in 4.4)
- Pairing test ✓

**Оценка**
- согласованность: ✗ `stage3` оставляет шаги SKILL.md, которые расходятся с узлом или которых не требует ни один узел (4.3).
- целостность: ✓ s-7unxytshhc4md54 (`code` и `tests` пусты, `testCommand` нет), «Project-wide settings», s-b6qdtghnyha3fhk, s-p29yawkkkgk7kxb, s-tnz9zgqx8c629a7.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ обоснование неполно (4.1); нет примера (4.4).

**Findings**
4.1 **WORDING FIX** (author). Put this sentence before the reason:
- EN: "Where the project keeps its code and its tests, which command runs the tests and which settings the reviewer runs with are for the user to decide."
- RU: «Где проект хранит свой код и свои тесты, какая команда запускает тесты и с какими настройками работает рецензент — решать пользователю.»

4.2 **Nit**. The citation of s-7unxytshhc4md54 backs "lacks", not "writes each answer there". Move it: "…that `sheriff.config.json` lacks (§s-7unxytshhc4md54), and writes each answer there:". In the Russian, move it the same way.

4.3 **WORDING FIX** (author, `stage3` of `spec-init` and of `spec-remove`). Under decision 4 the node wins over SKILL.md, but `stage3` keeps steps that contradict the node or that no agreed node requires:
- Step 4 asks for the code, the tests and the test command every time. The node asks only for what the config lacks.
- Step 5 takes "this plugin's runner". The node takes the runner that `sheriff review` would run. With both plugins installed, that is the runner of the higher release (s-4mej6ccn7xu3d3p).
- Steps 1 and 3 of `spec-init`, and steps 1, 3 and 4 of `spec-remove`, are required by no agreed node. Step 4 of `spec-remove` is the commit, the same case as step 7 of `spec-init`, which decision 4 removes.

The fix:
- `spec-init` `stage3`: replace "keeps steps 1 to 5" with "keeps steps 2, 4 and 5; step 4 asks only for what `sheriff.config.json` lacks, and step 5 finds the runner as the hook run when a session starts finds it (s-p29yawkkkgk7kxb). Steps 1 and 3 go, since no agreed node requires them; `sheriff init` names a missing email address itself (s-7unxytshhc4md54)."
- `spec-remove` `stage3`: replace "None in SKILL.md." with "SKILL.md keeps steps 2 and 5. Steps 1, 3 and 4 go, since no agreed node requires them, as with `spec-init`."

If the author wants to keep the confirmation before `sheriff remove`, the node of `spec-remove` has to state it instead.

4.4 **DOUBT** (an example):
- EN: "The user answers that the code is in `src/`, the tests are in `test/`, and `npm test` runs them. `spec-init` writes `src/**` and `test/**` as the glob patterns and `npm test` as the command. The most likely mistake is to write `src` and `test`, which match no file inside those folders."
- RU: «Пользователь отвечает, что код лежит в `src/`, тесты — в `test/`, а запускает их `npm test`. `spec-init` записывает glob-шаблоны `src/**` и `test/**` и команду `npm test`. Самая вероятная ошибка — записать `src` и `test`: им не соответствует ни один файл внутри этих папок.»

## 5. `new:tools-15-spec-remove` (s-jn3rauw6a8zeefn), "The skill `spec-remove`": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✗ "the plugin" does not say which one, where a machine holds both plugins.
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
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✗ связь implements с 2.5 расходится с записью в t25-one-thought.md: в базе нет правила об удалении метода (5.2). `stage3` оставляет коммит (4.3).
- целостность: ✓ s-7unxytshhc4md54.
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ не сказано, какой плагин удалить (5.1).

**Findings**
5.1 **WORDING FIX** (author):
- EN: "…and then offers to remove its own plugin from the machine."
- RU: «…и затем предлагает удалить с машины свой плагин.»

5.2 **DOUBT** (the author records it; the owner answers after stage 2). The `implements` link to 2.5 does not hold. The agreed 2.5 is about using the guidelines and extensions that the plugin holds, and names no skill. t25-one-thought.md already records that no base rule requires a way to remove the method. The node on the skills (and its sentence on the model) has the same gap.

Add to "Questions for the base specification" in group8-notes.md: "2. No rule of the base names the skills of the SpecSheriff plugins, or says that they leave the session's model and reasoning effort to the user. None requires a way to take the method out of a project. s-kq6wmdud9c7j2k9 and s-jn3rauw6a8zeefn link to 2.5 until such a rule exists."

This does not block the drafts: changing a link leaves a node's approval status as it is (s-5ah25f6gy99panq).

## 6. `new:tools-15-spec-settings` (s-h343yq2mua648eg), "The skill `spec-settings`": **not ready**

**Checklist**
- 1.2.3 A rule is made of its text and its reason ✓
- 7.1 The goal, the reader and the scope ✓
- 7.2.1 Who must act ✓
- 7.2.2 The order of the text ✓
- 7.2.3 General words ✗ In the reason, "The terminal program" describes what the text names as `sheriff settings`.
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
- 7.3.2 Thoughts and sentences ✓
- 7.3.3 The contents of a node ✓
- 7.4.1 Counts in prose ✓
- 7.4.2 The reason ✓
- 7.5.1 Superfluous rules ✓
- 7.5.2 The length of a sentence ✓
- 7.5.3 Rules as tables ✓
- 7.6.1 The language of the specification ✓
- 7.6.2 Capital letters ✓
- 7.6.3 Examples ✓
- Pairing test ✓

**Оценка**
- согласованность: ✓ решение 2026-11-18, s-chsfpkgpmfk4fft, 1.7.5.
- целостность: ✗ ссылка в обосновании на 1.7.5 покрывает только расширения, а под «these settings» здесь ещё статус одобрения и флаг `strict` (6.1).
- целесообразность: ✓
- избыточность: ✓
- недостаточность: ✗ условие о песочнице Codex есть только в `stage3`, а в тексте его нет (6.2).

**Findings**
6.1 **WORDING FIX** (author). Replace the reason:
- EN: "Only an owner changes these settings, through a procedure (§s-chsfpkgpmfk4fft). `sheriff settings` in a terminal window needs a desktop that the owner can see, which an owner working remotely lacks, so the skill also offers the chat."
- RU: «Эти настройки меняет только ответственный, через процедуру (§s-chsfpkgpmfk4fft). Для `sheriff settings` в окне терминала нужен рабочий стол, который ответственный видит, а у ответственного, работающего удалённо, его нет, поэтому skill предлагает и чат.»

6.2 **DOUBT** (author; this changes what the rule states). If Codex's sandbox blocks the window, `stage3` changes the behaviour, so the rule would have to change after approval. Replace the second list item:
- EN: "`sheriff settings` in a separate terminal window, which the skill offers only where it can open such a window on the graphical desktop of the machine that runs the session."
- RU: «`sheriff settings` в отдельном окне терминала — skill предлагает его, только если может открыть такое окно на графическом рабочем столе машины, на которой работает сессия.»

6.3 **Nits** (the meaning is already clear):
- "…and the user chooses one:" could read "It then asks the user to choose one of the following ways to change them:". RU: «Затем он просит пользователя выбрать один из следующих способов изменить их:».
- Put the window first, since the owner agreed on 2026-11-18 that it is the main interface.

## Question 3, as group8-notes.md states it

Questions 1 and 2 concern drafts outside my input, so I did not check them.

The basis given for recommendation A is the principle "Nothing unapproved is implemented", which A leaves unmet. Replace it: "Describing three skills is a task of its own. B adds three or more nodes and another round of review before the owner sees group 8. The gap is not new: the approved nodes do not describe these skills either."

Add to what a person sees under A:
- the node on the skills names `spec`, `spec-review` and `spec-adopt` without explaining them, against rule 7.2.7;
- `spec-init` and `spec-remove` no longer commit, ask for confirmation, or show how a file left as it was differs (4.3).

Add to A's cost: in this release the principle stays unmet for those three skills.

## The base questions

The four base questions do not block any of these drafts. Finding 5.2 adds a new base question, which does not block the drafts either. TERM: nothing new; the "runner" gloss is already recorded (notes, item 11).

## Findings only the owner can answer
1. Question 3, already on the page, worded as above.
2. Finding 5.2, after stage 2: a base rule naming the skills of the plugins and a way to remove the method.
3. Finding 2.2, if the check shows that Codex now admits plugins with hooks: whether the agent's hooks for Codex move into the plugin, after stage 2.

Sources:
- [Codex hooks (developers.openai.com, redirects)](https://developers.openai.com/codex/hooks)
- [Codex hooks (learn.chatgpt.com)](https://learn.chatgpt.com/docs/hooks)

## The main session's decisions

They are in fix-brief-group8-c.md, which holds the decisions on all six reports of the follow-up review.
