# T25, stage 2, group 4: notes on the drafts of items 33 to 40

`propose-group4.mjs` wrote nine keys into `tools-drafts.json`: eight drafts of nodes of the appendix of the tools and one proposal to change an agreed draft.
It first copied `tools-drafts.json` to `tools-drafts.before-group4.json`, and it rebuilds the group from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group4.md`.
No key outside the group differs from the copy, and the script refuses to write if one does.
`english-group4.md` holds the English of every node of the group, for EngStickler's readers.

**One question is left for the owner**, on merge commits; it is under «Вопрос ответственному» in the section on round d. Every other question that came up is settled by a rule, a ruling, an agreed node or the code, as the entries below say.

The section on round e comes first and supersedes the sections on earlier rounds wherever they differ. Each later section supersedes the earlier ones in the same way, and the superseded statements of round a are marked as such.

## Agreed

On 2026-11-24 the owner agreed to group 4 by answering «А» to the question about merge commits. The question said that an answer of A with no remark on the nodes also agrees to the whole group. agree-group4.mjs marked the twelve keys as agreed and recorded answer A as a decision of s-qqs2svksmjct753 and s-txbwsthdqhvyzd2. Round f, in fix-group4-f.mjs, made four English-only fixes before the page was published: "would pass both this check and the test run, although nothing checks the rule", "define a `testCommand`", "is treated as listing nothing" and "is listed for that purpose".

## Round e: the nits of the final review applied

`fix-group4-e.mjs` applies the nits of `review-g4d-a.md` to `review-g4d-d.md` and the readers' findings of `english-g4d-fast.md` and `english-g4d-thorough.md` that `fix-brief-group4-e.md` asks for. The patches are in `fix-group4-e-patches.mjs`, and each edit fails where it does not find the text it replaces.
The script copies `tools-drafts.json` to `tools-drafts.before-group4-e.json` on its first run and rebuilds from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group4e.md`, and the script's checks pass as in round d.
`english-group4e.md` holds only the sentences that round e changed, each under its key.

**Keys changed:** `s-7pk89t8z6wymmj9`, `proposal:row-10-1-37a`, `s-nh8b2hjvzasdxmd`, `s-m8nmfsxkcfu7cjp`, `s-dbk2vyeg8z5jxna`, `s-txbwsthdqhvyzd2`, `s-jgejd5rpd9d43pd`, `proposal:row-10-1-41-g4`, `s-qqs2svksmjct753`, `s-b6qdtghnyha3fhk` and `proposal:new-tools-1-project-g4`. The proposal on rule 10.12 is unchanged.

### The nits of the final review

- **Review d-a, A:** the `change` note of the paragraph on the refusal in s-7pk89t8z6wymmj9 now says «собственные проверки проекта оставляют файлы такими, какими они были, кроме тех, которые git игнорирует».
- **Review d-a, B:** the `question` field of row 10.1.37a now says "whose second step requires each of a project's own checks to leave the files as they were, except for those that git ignores".
- **Review d-a, C:** the reasons in round d's list of rejected findings are corrected below, under "Corrections to the notes of round d". The node does not change.
- **Review d-b, finding 1:** both `stage3` notes of items 34 and 35 say that `fixtureGlobs` is to read the rule on fixtures in its last approved wording, "with its refines links taken from the commit that added that approval (s-5ah25f6gy99panq)".
- **Review d-b, finding 2 (TERM):** recorded for the docs, under "Changes needed outside the group, found in round e".
- **Review d-c, N1:** the first merge item of s-txbwsthdqhvyzd2 reads "the merge counts as changing a rule's approved wording, or as adding, changing or removing a test or code, only where it does so relative to each of its parents;". The Russian does not change.
- **Review d-c, N2:** the reason for row 10.1.41 reads "So, if this check accepted such a test, …". The Russian does not change. The `reasonChange` and the row's `change` field now say that two English sentences of the reason are reworded.
- **Review d-c, N3:** the `stage3` note of s-qqs2svksmjct753 says that under `auto` the hook cannot repeat git's choice. messageText is therefore to treat any single character followed by ` ------------------------ >8 ------------------------` as the scissors line.
- **Review d-d, N1:** paragraph 3 of s-b6qdtghnyha3fhk takes the `refines` links "from the commit that added the rule's last approval to `specs/_approvals.jsonl`", in both languages. The proposal on `new:tools-1-project` uses the same wording.
- **Review d-d, N2:** recorded under "Changes needed outside the group, found in round e".

### The readers' findings that were applied

- **s-7pk89t8z6wymmj9:** "printed to its standard output".
- **s-nh8b2hjvzasdxmd:** "regardless of letter case", with «независимо от регистра букв»; "would point to another node, or to none".
- **s-dbk2vyeg8z5jxna:** "the section of the technical appendix … on the stack".
- **s-txbwsthdqhvyzd2:** the merge item, as review d-c's N1 says.
- **s-jgejd5rpd9d43pd:** "a mark, a call or an option that is named for that purpose in the description of the language in which the test is written". The reader's form, "the description of the language that the test is written in names …", puts a long subject before its verb, so the sentence is turned round.
- **Row 10.1.41:** "if this check accepted such a test", as review d-c's N2 says.
- **s-b6qdtghnyha3fhk, the example:** "the project-wide settings set a `testCommand`" and "because a `testCommand` is set".
- **The proposal:** "A rule that has never been approved counts as listing nothing." The Russian reads «Считается, что правило, которое ни разу не было одобрено, ничего не перечисляет.»

### The readers' findings that were not applied, and why

- **"makes this check", "the node on the form of a SpecTag" and "In this check, the code means"** (both readers): kept from the agreed drafts, as before.
- **"Generated copies"** (fast reader): kept, as review c-a's TERM recommends.
- **"binds every participant" → "applies to every participant"** (fast reader): kept. A check that binds every participant is what the reason means, and the reader was not sure about the replacement.
- **"Adopting the method must not stop them" → "keep them from running"** (fast reader): kept. "Stop" means here what "keep from running" means, and the reader was not sure about the replacement.
- **"the `testCommand` of the project-wide settings" → "the `testCommand` setting of the project-wide settings"** (fast reader): kept. The words name the key together with the settings that hold it, and "setting of the settings" would repeat itself.
- **"either … or …, or both"** (thorough reader): kept, as in rounds c and d.
- **"A test run counts neither … as failed" → "as a failure"** (fast reader): kept. "As failed" is correct, and the sentence keeps "failing" for the condition it states.
- **"R, whose code exists" → "for which code exists"** (fast reader): kept. A rule's code is the code bound to it, so "whose" is correct.
- **The remaining ambiguities**, where the context decides, as the readers say: no change.

### Corrections to the notes of round d (review d-a, C)

- **"each of which" in step 2 of rule 10.12:** "each of which" covers both items named before it, the project's own checks and the rest of the project's own tools. Round d's reason, that the checks are among the tools, argued for the wrong reading.
- **"the project's own tools still run"** in rule 10.12: the fast reader said that the context does not decide between its two readings. The text still holds. The opening sentence names the project's own tools apart from the checks. "The rest of the project's own tools" in step 2 means the tools other than those of step 1. Also, s-4mej6ccn7xu3d3p and s-7pk89t8z6wymmj9 run a project's own check only inside `sheriff validate`.

### The change fields that the owner reads

The page names no round, no reviewer and no report, so round e rewrites the `change` fields that did:
- the merge paragraphs of s-txbwsthdqhvyzd2 and s-qqs2svksmjct753 now say «Новое: ответ А на вопрос о коммитах слияния в конце страницы, который я рекомендую. Если вы выберете другой ответ, этот абзац изменится или уйдёт.»;
- the `change` and `reasonChange` fields of row 10.1.41 and of the proposal on `new:tools-1-project` no longer say «по замечаниям читателей». They say instead that the English was reworded so that it reads one way only.

### The owner's page

- `group4-assessments.json` holds the «Оценка» of each key from `review-g4d-a.md` to `review-g4d-d.md`. The lines are edited only where they named a finding, a report or a round, called the owner «владелец», or named a draft by a reviewer's letter. A line that said that a `stage3` note was incomplete now says what the corrected note says.
- `build-group4-ru.mjs` writes `group4-ru.json`: the Russian of the eight `stage3` notes, the removed passages of the eight drafts, the three locations that carry an English note, and the eight approved nodes of `tools.json` that the drafts replace.
- `gen-group4-page.mjs`, adapted from `gen-group3-page.mjs`, writes `group4-page/index.html`. It takes the question from the latest «Вопрос ответственному» in these notes. It refuses to write a page whose text names a round, a reviewer or a report, or says «владелец».
- The page lists three nodes outside the group that change only to carry out a decision: the citation in "Project-wide settings", the `checks` link of row 10.1.44 to rule 10.10, and the nodes that implement the rows of table 10.1 in `moved/impl.json`. What is deferred to a later group or to stage 3 is left out.

### Changes needed outside the group, found in round e

1. **The rule on when the tests must pass (s-x8uzc8z44pwtd3h):** it says "name where the tests run", while row 10.1.44 and both drafts say "the moment at which the tests run". Its wording is to match when the node next changes (review d-d, N2).
2. **The docs:** a sid that names no node is close to what OpenFastTrace calls an orphaned link, but only in part. OpenFastTrace means links between its specification items, while s-m8nmfsxkcfu7cjp refuses any sid in any file (review d-b, TERM).
3. **`.ai_docs/INDEX.md`:** the main session still has to add rows for `fix-group4-e.mjs`, `fix-group4-e-patches.mjs`, `english-group4e.md`, `tools-drafts.before-group4-e.json` and the page's files, besides those of rounds c and d.

## Round d: the six reports of the third review applied

`fix-group4-d.mjs` applies `review-g4c-a.md` to `review-g4c-d.md`, `english-g4c-fast.md`, `english-g4c-thorough.md` and the rulings of `fix-brief-group4-d.md`. The patches themselves are in `fix-group4-d-patches.mjs`, and each edit of a string in place fails where it does not find the text it replaces.
The script copies `tools-drafts.json` to `tools-drafts.before-group4-d.json` on its first run and rebuilds from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group4d.md`, and only the twelve keys of the group differ from the copy.
The script's checks pass, as in round c. They also find none of the wordings that round d replaced.

**Keys changed:** all twelve keys of the group. No key was added, and no title changed.

### The rulings of the brief, as carried out

1. **The `refines` links of a rule of `project.json`** (review c-d, D1). The proposal on `new:tools-1-project` gains the reviewer's sentence after "A rule that has never been approved lists nothing", split in two: "They take the `refines` links of each rule of `project.json` from the commit that added the rule's last approval to `specs/_approvals.jsonl`, since an approval does not cover links (§s-5ah25f6gy99panq). Until that commit is made, they take the links from the files of the specification."
   - Paragraph 3 of s-b6qdtghnyha3fhk takes the links the same way: "They take each rule's `refines` links from the commit that added the approval of that wording, since an approval does not cover links (§s-5ah25f6gy99panq)." On a push, every approval is already committed, so the paragraph needs no clause for the time before the commit.
   - Both drafts gain a `cites` link to s-5ah25f6gy99panq. Both `change` fields give the basis: rule 1.3.5, and the agreed s-a8fn72xa782wvbk, which takes the `refines` links of a RecordType in the same way. The `stage3` note of s-b6qdtghnyha3fhk says so too.
2. **What makes a commit include an approved rule** (review c-c, C1). Row 10.1.41 reads "the rule stops falling under the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example because …". s-jgejd5rpd9d43pd reads "it takes the rule out of the exceptions to the requirement that a rule be implemented (§s-6fw72j65jkqrfpf), for example by …". The Russian is the reviewer's, with «требования быть реализованным», as the agreed rule 9.2 has it.
   - Both `change` fields say why. Round c's wording also covered the commit that approves the specification, because rule 9.2 ties the requirement to the specification's approval status. Yet rule 10.6 and the ruling of 2026-11-17 let the owner approve the specification with rules that lack code or a test.
   - Both `change` fields also say that the item names the exceptions and negates nothing that holds, so the rule "A rule says what holds, not what does not hold" is kept.
   - The `stage3` note of s-jgejd5rpd9d43pd says that approving the specification takes no rule out of those exceptions.
3. **The question on merge commits** (review c-c, Q1). A's cost now lists two remaining risks. The second is in the reviewer's words, slightly shortened. The recommendation and its reason still come first.

### Review c-a

- **s-7pk89t8z6wymmj9, the nit on paragraph 4:** no change, as the reviewer says.
- **Rule 10.12, the fix to the notes:** added for item 57, under "Changes needed outside the group, found in round d".
- **s-dbk2vyeg8z5jxna, finding 1:** "The refusal names the file and the generator." now directly follows "A file that only one of the two commits holds also counts as different", in both languages. The sentence on refusing the generator ends the paragraph.
- **Finding 2:** "Where the repository lacks such a file, `sheriff binding` also refuses the commit", in both languages.
- **Finding 3 (TERM):** "copy" stays in the title, as the agreed rows 10.1.39a and 10.14 have it. Its gloss is recorded for the docs.

### Review c-b

- **s-nh8b2hjvzasdxmd, finding 1:** the `change` notes of the paragraphs "Text has the form of a numbered node's location" and "stands alone" take the reviewer's text. They no longer say that the code does this.
- **Finding 2:** the reason reads "A node's location can change whenever the specification is reordered", in both languages.
- **s-m8nmfsxkcfu7cjp, finding 1:** "in the system's code (§s-hheus6f395ynqvc), including its tests", in both languages.
- **Finding 2 (TERM):** no change, as the reviewer recommends.

### Review c-c

- **C1:** applied as ruling 2 says.
- **C2:** "a test or code that is bound to the rule, before the commit or after it, changes;". This also settles both readers' point about "after it changes".
- **C3:** the agreed Russian of the row's first sentence is restored. The `change` field of that sentence says that only the English word order changed. The row's `change` field lists the Russian of the example: «R входит в коммит и проходит проверку» became «R входит в коммит, и коммит проходит», as in the English.
- **B2:** «которые код системы реализовывать не обязан».
- **Q1:** applied as ruling 3 says.
- **Nits:**
  - the reason for s-txbwsthdqhvyzd2 reads "Unless the tests and code of an approved rule follow its new wording in the same commit, the rule enters the history …";
  - its Russian example reads «…но не меняет ни одного из его тестов»;
  - the `change` field of the test item of s-jgejd5rpd9d43pd says «ожидаемо падающий»;
  - the example of s-qqs2svksmjct753 says "and the commit message contains no sid". The reviewer's "the commit's message" is not used, since the nodes call it "the commit message";
  - paragraph 2 of s-qqs2svksmjct753 drops "that the commit adds or changes" in both languages, and its `change` field says that paragraph 1 already says it;
  - the Russian of the scissors line reads «потому что строки после неё содержат дифф…»;
  - the `stage3` note of s-qqs2svksmjct753 covers `core.commentChar` set to `auto` or to a string (`core.commentString`).

### Review c-d

- **F1:** "It runs the tests with the command in the `testCommand` of the project-wide settings". This wording also resolves the fast reader's doubt about "give as their `testCommand`".
- **F2:** "Where the hook must run the tests and the project-wide settings lack a `testCommand`, it refuses the push and says so." The condition now names what the settings lack, so the refusal does not repeat the key. In Russian: «…а в настройках, общих для проекта, нет `testCommand`, он отвергает push и сообщает об этом».
- **F3:** the thorough reader asked for "points to", which is git's own word for what a ref does, in place of "names". The Russian therefore reads «В коммите, на который указывает ref» and «в коммите, на который указывает этот ref». That removes the ambiguity that F3 found.
- **F4:** «Хук говорит».
- **D1:** applied as ruling 1 says.

### The other points of the brief

- **"only after … have passed"** in s-7pk89t8z6wymmj9 and in the proposal on rule 10.12. The Russian «только когда» stays, since it cannot be read as "a single time".
- **The phrases kept from groups 1 to 3** stay as in rounds b and c.

### The readers' findings that were applied

- **s-7pk89t8z6wymmj9:**
  - "the refusal or the report shows the check's exit status", since "it" could refer to the check;
  - "It makes the rest of its checks regardless of what the project's own checks find", since "makes … whatever" could read as "turns into";
  - "regardless of how the entries in `sheriff.config.json` … set the approval status and the flag";
  - the reason opens "Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files." The old "that it makes" could attach to the guidelines. "Such a check therefore binds" replaces "So such a check binds".
- **Row 10.1.37a and step 2 of rule 10.12:** "except for".
- **The reason for rule 10.12:** "the checks of the git hooks", since the paragraph had named no checks; "what the generator writes", since "it" could refer to the formatter; "the checks on their structure".
- **s-nh8b2hjvzasdxmd:** "assigns to" in both items on the model; "even though no node is at that location now"; "such as `tech/stack` within `specs/tech/stack.json`", since "as" could read as a cause.
- **s-m8nmfsxkcfu7cjp:** "the refused text".
- **s-dbk2vyeg8z5jxna:**
  - "also counts as different";
  - "such a run of the generator" for "the generator so run";
  - "generates it" for "regenerates it", which did not fit a missing file;
  - the example's "A developer edits `src/types.ts` by hand … and commits it", since a commit edits nothing by hand.
- **s-txbwsthdqhvyzd2:** "Such a commit passes".
- **s-jgejd5rpd9d43pd:** "in the code and the tests as the commit leaves them", since "it" had no clear antecedent.
- **s-b6qdtghnyha3fhk:** "points to" for a ref, in all three places.
- **The proposal:** "find each such rule", since several rules may refine the other rule. The introduction of `english-group4d.md` says "the item on the levels of the domains".

### The readers' findings that were not applied, and why

- **"makes this check" → "performs", "keeps" → "contains", "the node on the form of a SpecTag" → "defines", "the rule on …" → "that says", "In this check, the code means", "leaves out" → "skips"** (both readers): kept from the agreed drafts, as the brief says. Each is correct English.
- **"a fixture of the tests" → "for"** (both readers): kept. The agreed base specification says "fixtures of the tests" in four places, and one thing has one spelling.
- **"the technical debt" and "shortcomings in the technical debt"** (thorough reader): kept. The agreed rule 9.2 says "the descriptions of shortcomings in the technical debt".
- **"Generated copies" → "Generated files"** (fast reader): kept, as review c-a's TERM recommends.
- **"each file of that generator"** (fast reader): kept. The next sentence defines a file of the generator.
- **"name a push" → "name the push"** (thorough reader): kept. "A push" means any push, which is what the rule means.
- **"either … or …, or both"** (thorough reader): kept. It is standard English, and review b-d asked for it.
- **"the node's file, sid and location" → "its sid and its location"** (thorough reader): kept. It is review b-c's wording, and it reads one way only.
- **"not marked as skipped or as expected to fail", "if such a test counted" and "while nothing checks the rule"** in row 10.1.41 (both readers): kept. They are the row's agreed wording and correct English.
- **"each of which" in step 2 of rule 10.12** (both readers): kept. The project's own checks are themselves among its tools, as "the rest of the project's own tools" says. So "each of which" covers both, as row 10.1.37a confirms. The present tense states a requirement here, as it does throughout the guidelines.
- **"a file in the directory in which the check runs"** (thorough reader): kept. A file in a directory includes one in its subdirectories.
- **"A rule that has never been approved lists nothing" → "is read as listing nothing"** (thorough reader): kept. The reader was not sure about the replacement, and the paragraph opens with what the SpecSheriff tools read.
- **"where each member is the path of a tool"** (thorough reader): kept. It is agreed wording, and the context rules out a condition.
- **"It leaves out the following"** in s-m8nmfsxkcfu7cjp (thorough reader): kept, as in round c. The reader was not sure about the replacement.
- **"the list of the files … for the types"** (thorough reader): kept. The reader was not sure about the replacement.
- **"a test or code" → "a test or any code"** (thorough reader): kept. "Code" after "or" needs no article.
- **The remaining ambiguities**, where the context decides, as the readers say: no change.

### Вопрос ответственному

**Коммит слияния: что `sheriff commit-message` требует от его сообщения.**

Рекомендую А: для коммита слияния `sheriff commit-message` учитывает только то, что слияние меняет относительно каждого из своих родителей. Только этот вариант не заставляет повторять уже проверенное и всё же ловит то, что слияние меняет само.

По согласованному узлу «What a commit adds, changes and removes in the code and the tests» коммит слияния сравнивается со своим первым родителем. `git merge` и `git pull` запускают хук commit-msg, поэтому без особого правила сообщение слияния должно было бы называть sid каждого узла, привязанного к влитому коду, и повторять каждый trailer `Implementation-Needs-No-Change` влитых коммитов. Сообщение git по умолчанию «Merge branch …» отвергалось бы почти всегда.

- **А (рекомендую).** Для коммита слияния `sheriff commit-message` учитывает только то, что слияние меняет относительно каждого из своих родителей: каждый влитый коммит уже прошёл эти проверки, когда его делали.
  - Что видит разработчик: обычное слияние с сообщением git по умолчанию проходит. Если при разрешении конфликта он меняет код, привязанный к правилу, сообщение слияния должно назвать это правило. Если при этом отстают тесты или код одобренного правила, нужен trailer или изменение отстающих тестов или кода.
  - Цена: по абзацу в двух узлах («The nodes that a commit message must name» и «An approved rule whose tests or code lag behind it»), а в стадии 3 — сравнение с каждым родителем. Остаются два риска:
    - влитый коммит, сделанный без хуков (`git commit --no-verify`, веб-редактор или клон, где хуки не включены), при слиянии заново не проверяется, и проверки строк 10.1.40 и 10.1.42 так и не видят принесённый им код; при Б слияние проверило бы его;
    - если слияние берёт новую одобренную формулировку правила из одного родителя, а его тесты или код — из другого, проверка строки 10.1.40 этого не видит: относительно каждого родителя в отдельности слияние ничего из этого не меняет. При Б такое слияние отвергается, если прежняя формулировка — в первом родителе.
- **Б.** Оставить сравнение с первым родителем, как в согласованном узле.
  - Что видит разработчик: почти каждое слияние, которое приносит код, отвергается с сообщением по умолчанию, в том числе при `git pull`. Приходится вручную перечислять sid всех узлов влитого кода и повторять trailer влитых коммитов.
  - Цена: трение при каждом слиянии; узлы не меняются.
- **В.** Не проверять сообщение коммита слияния вообще.
  - Что видит разработчик: любое слияние проходит.
  - Цена: правка кода при разрешении конфликта проходит без имени правила в сообщении и без проверки того, что тесты и код одобренного правила не отстают. Как и при А, влитый коммит, сделанный без хуков, при слиянии не проверяется.

**What is removed if the owner does not choose A:**
- in s-qqs2svksmjct753, the paragraph "For a merge commit, `sheriff commit-message` counts only the code that the merge adds or changes relative to each of its parents, since each merged commit was checked when it was made.";
- in s-txbwsthdqhvyzd2, the paragraph "`sheriff commit-message` judges a merge commit as follows, since each merged commit was checked when it was made:" with its two items. Under option B, the sentence "For a merge commit, the parent is its first parent." returns to the end of the paragraph on "before the commit" and "after the commit". Under option C, both nodes say instead that `sheriff commit-message` makes no check of a merge commit's message, and the hooks node (item 57) runs it only on a commit with one parent;
- the `stage3` sentences on merge commits in both drafts.

### Changes needed outside the group, found in round d

1. **"The hooks" (s-477gtdrkw34dzxw), item 57.** This adds to item 1 of the changes found in round c. Review c-a's sentence: "Row 10.1.37b and the hook's refusal follow step 2 of the new rule 10.12: each of the project's own tools leaves the files in the working tree as they were, except those that git ignores." The text that round c gives for row 10.1.37b covers only what the commit contains, and the hook's present refusal (s-n4m5zvh96yb299p) covers only the staged files and the message. Neither catches a tool that changes an unstaged file or adds a new file that git does not ignore (review c-a).
2. **The docs:** "copy", in the title of s-dbk2vyeg8z5jxna and in the agreed rows 10.1.39a and 10.14, is to be glossed as "generated code kept in the repository". In SysML, "copy" links a requirement to a read-only copy of another (review c-a, TERM).
3. **`.ai_docs/INDEX.md`:** the main session still has to add rows for `fix-group4-d.mjs`, `fix-group4-d-patches.mjs`, `english-group4d.md` and `tools-drafts.before-group4-d.json`, besides those of round c.

## Round c: the six reports of the follow-up review applied

`fix-group4-c.mjs` applies `review-g4b-a.md` to `review-g4b-d.md`, `english-g4b-fast.md`, `english-g4b-thorough.md` and the rulings of `fix-brief-group4-c.md`. The patches themselves are in `fix-group4-c-patches.mjs`, which the script imports.
The script copies `tools-drafts.json` to `tools-drafts.before-group4-c.json` on its first run and rebuilds from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group4c.md`, and only the twelve keys of the group differ from the copy.
The script's checks pass:
- every citation has its link, and every `cites` link has its citation;
- the Russian cites the same sids as the English;
- every link target exists;
- the sid of row 10.1.37a, s-vj67ztqkuhxbv7s, is used nowhere in `specs/` or `moved/`, and in the drafts only by the group's keys;
- every example other than that of rule 10.12 names its most likely mistake;
- the Russian of items 34 and 35 no longer says «цитата» or «цитировать»;
- each patch that edits a string in place has found that string.

**Keys changed:** all twelve keys of the group: `s-7pk89t8z6wymmj9`, `proposal:row-10-1-37a`, `proposal:s-pcnyfp7gev7syax-g4`, `s-nh8b2hjvzasdxmd`, `s-m8nmfsxkcfu7cjp`, `s-dbk2vyeg8z5jxna`, `s-txbwsthdqhvyzd2`, `s-jgejd5rpd9d43pd`, `proposal:row-10-1-41-g4`, `s-qqs2svksmjct753`, `s-b6qdtghnyha3fhk` and `proposal:new-tools-1-project-g4`. No key was added, and no title changed.

### The rulings of the brief, as carried out

1. **The reason for rule 10.12.** Review b-a's candidate replaces all four paragraphs of the agreed reason, with "apply to everyone", as `docs/principles.md` has it. Its Russian replaces the agreed Russian, which said «на том, что уже прошло проверки проекта» and so contradicted "Each step runs regardless of what the earlier steps found". The proposal's `reasonChange` and `change` say why the agreed reason failed the pairing test. Its paragraphs justified the text one paragraph at a time: the project's tools, the order of the steps, the generators, and the case where the SpecSheriff tools cannot run. The new reason says why the rule exists: a project's own tools keep running, and the order lets every check rely on what it reads.
2. **Files that git ignores.** Step 2 of rule 10.12 now reads "the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, each of which leaves the files as they were, except those that git ignores;". The wording is positive and matches row 10.1.37a. The row now reads, as review b-a proposed, "… leaves the directory in which it runs as it was, except the files that git ignores", with the cost "refused, naming the check and each file that it added, changed or removed". Both `change` fields record it.
3. **Row 10.1.37b** is not added; it is recorded for item 57 under "Changes needed outside the group, found in round c".
4. **Rules that become ones that the system's code must implement.** The fourth item of row 10.1.41 takes review b-c's general wording in positive form: "the rule becomes one that the system's code must implement (§s-6fw72j65jkqrfpf), for example because its exemption from implementation ends (§s-gf6n8ge4mke3pr2) or because it is moved out of the technical debt (§s-2r7k2aeyusgy6fw)."
   - The reviewer's "stops being one of the rules to which the requirement … does not apply" says the same with a double negative. The rule "A rule says what holds, not what does not hold" asks for the positive form. The new item also repeats the words of the row's first sentence, "An approved rule that the system's code must implement".
   - The row gains a `cites` link to s-2r7k2aeyusgy6fw.
   - s-jgejd5rpd9d43pd has the matching item in its own words: "it makes the rule one that the system's code must implement (§s-6fw72j65jkqrfpf), for example by ending the rule's exemption from implementation (§s-gf6n8ge4mke3pr2) or by moving the rule out of the technical debt (§s-2r7k2aeyusgy6fw)." A paragraph after that list says when an exemption ends, with "stops reaching it" and «удаляется или перестаёт до него доходить».
   - Review b-c's cost note C2 is in the row's `change` field.
   - Both `change` fields also name a third way in which this happens: a project's own kind of node comes to need code (rule 8.3).
5. **The question on merge commits.** The question below puts the recommendation and its reason first. Under A, what the developer sees covers lagging tests or code. A's cost names the risk that remains, in a wording merged from reviews b-b, b-c and b-d. The same risk is added to C's cost, since C does not check the merged commits either. The drafts keep answer A, in review b-c's wordings A1 (s-txbwsthdqhvyzd2) and D2 (s-qqs2svksmjct753).

### Review b-a

- **s-7pk89t8z6wymmj9, finding 1:** the paragraph on `sheriff settings` takes the reviewer's wording. It names rule 10.6 (§s-qzthyh7yqvfhsa2) for an approval of the specification. It also names the procedure that turns the `strict` flag on (§s-q3pfzyaxvpr2zj2), for which the checks run as `sheriff validate --strict` runs them.
- **Finding 2:** the reason opens "`sheriff validate` runs a project's own checks together with the checks of the SpecSheriff guidelines that it makes, on the same files." The commit-msg and pre-push hooks run no `sheriff validate`, so the old "wherever the checks of the SpecSheriff guidelines run" claimed too much.
- **Finding 3:** the refusal of a check that the rule does not list applies to the rule's last approved wording and says so. A developer who sees the check in a draft of the rule then understands the refusal. The `stage3` note says so too.
- **Rule 10.12, finding 1:** the exception applies on a commit, and those checks run right after the first step. The paragraph now names the two checks first. This keeps the sentence short, and "the other checks" then points back to them rather than forward. The paragraph reads "On a commit, as an exception to the steps above, the following checks run right after the first step:", followed by the list and by "The project's own checks and the other checks of the SpecSheriff guidelines run only once these checks have passed." The meaning is that of finding 1.
- **Finding 2:** the first item cites the archive (§s-f2b5zvc565s242f) and the schema (§s-eferktypcj7njt5), with `cites` links. The item also says "each key is written only once", which settles the readers' doubt about "gives each of its properties one value".
- **Finding 3:** the example names the two checks that come right after the first step and says that the other checks of the SpecSheriff guidelines run last. The `change` field lists it.
- **Finding 4** is recorded for item 57. The exception applies only on a commit. It therefore asks nothing of the pre-push hook, which runs neither of the two checks (review b-a's note on the push).
- **s-dbk2vyeg8z5jxna, finding 1:** paragraph 3 takes the reviewer's wording. It opens "While the rule that lists one of the project's own generators … is a draft". It compares each file of the generator between the commit's parent (§s-2x58az67bm6cxq2, a new `cites` link) and the commit. A file that only one of the two commits holds also counts as different.
- **Finding 2:** the sentence "Where `sheriff types` would refuse the generator so run, `sheriff binding` refuses it in the same way." is added, and the `stage3` note says so.
- **TERM** is recorded for the docs: "last approved wording" and the "baseline" of ISO/IEC/IEEE 29148 and IREB.

### Review b-b

- **A1:** "the model of the specification" in the item on the first top-level node of a file.
- **A2 and B4:** the Russian of items 34 and 35 says «ссылка» and «ссылаться», as the agreed rules 1.2.2 and 10.11 and rows 10.1.38 and 10.1.39 do. This covers the title «Ссылка за пределами спецификации», the reason, the example, the items on fixtures, the item on `§` followed by a digit, and the quotation «о каждой ссылке» in a `change` field.
- **A3:** the `stage3` note of item 34 says that `-`, `/`, and `.` followed by a letter or a digit continue a path or a name after the text, as they do before it.
- **A4:** item 34 has the reviewer's new example.
- **B1:** `sheriff citations` leaves out each file that git treats as binary, such as an image, since row 10.1.39 covers code, tests and documentation only. Four pictures in `_promo/images/png/` hold `§` followed by a digit: `1-how-it-works.png`, `2-what-stops-bad-code.png`, `card-6-1-one-language.png` and `card-6-10-what-no-rule-requires.png`. The item's `change` field and the `stage3` note say so.
- **B2:** the item on the bindings file says that its SpecTags (§s-5z5gnu7pahr82xp) "are left to the check for a SpecTag that names no node". The item on the sid of a SpecTag uses the same words.
- **B3:** the notes on the citation in "Project-wide settings" are corrected in the sections on round a. The citation must point to s-t383grkn3q68dpf, "A node's `meta.code` and `meta.tests`", whose stage-3 note reads those files to find SpecTags. Since round b's option B, s-m8nmfsxkcfu7cjp reads every file outside `specs/` and uses none of those patterns.
- **B5:** the `stage3` notes of items 34 and 35 say that `fixtureGlobs` (`model.ts:43`) must read the rule on fixtures in its last approved wording.

### Review b-c

- **A1 and D2:** the merge paragraphs take the reviewer's wordings, as ruling 5 says.
- **A2:** "fingerprint" in the third condition of s-txbwsthdqhvyzd2 cites s-v4qus7raqnwzneb.
- **B1 to B3:** the Russian of s-jgejd5rpd9d43pd says «удаляется или перестаёт до него доходить», «который не может упасть ни при одном запуске тестов» and «ни как ожидаемо падающий».
- **C1 and C2:** applied as ruling 4 says.
- **D1:** the refusal in s-qqs2svksmjct753 takes two sentences, in the reviewer's words: "It refuses any other message. For each node whose sid the message lacks, the refusal names the node's file, sid and location (§s-kag2m9tzdnduxdx)."

### Review b-d

- **WF1:** condition 2 of s-b6qdtghnyha3fhk reads "as of that commit", and paragraph 3 opens "In the commit that a ref names, …". Both `change` fields say so. The `stage3` note says that the wording is looked up in the pushed commit and its ancestors, not on the current branch.
- **WF2:** the paragraph of the proposal on the last approved wording cites §s-a8fn72xa782wvbk together with §s-qyjw8xez6t6adc3, with a `cites` link.
- **WF3:** the proposal's `reasonChange` adds that «даёт … располагает» became «может давать … располагать» in the Russian, and its `change` field lists "the rule" → "a rule".

### The other points of the brief

- **The sentence on files without comments** in the proposal reads "the files whose format allows no comments, other than JSON files", with the Russian to match. The `change` field lists it.
- **The example of row 10.1.41** ends "The most likely mistake is to refuse the commit because no SpecTag names R itself."
- **The example of s-jgejd5rpd9d43pd:** the test "carries" R's SpecTag.
- **The phrases kept from groups 1 to 3** stay as in round b: "makes this check", "leaves out", "the node on the form of a SpecTag", "A rule here is", "In this check, the code means" and "the files that the repository keeps".

### The readers' findings that were applied

- **s-7pk89t8z6wymmj9:**
  - "gives … a model" for "passes … a model", since "pass" next to "checks" reads as passing them;
  - "the `strict` flag has the value that the entries in `sheriff.config.json` set" and "the specification's `strict` flag";
  - "only if its process exits";
  - "before the rest of its checks", since "each of its other checks" included the two checks named just before;
  - "the check's failure" for "its failure";
  - "In its `TextRule.list`" opens the sentence, so "whose value" can attach only to the member.
- **Row 10.1.37a:** "except the files that git ignores"; the cost names each file that the check added, changed or removed, rather than "each such file".
- **Rule 10.12:** each item opens with "the check that". The new reason and example no longer have "The checks that a file gives…", "the files that those checks have passed", "hold for everyone" or "from the most specific to the most general".
- **Item 34:** "regardless of the case of its letters"; "stands alone" for "stands on its own"; "After a reordering, a location left in a file would point at another node".
- **Item 35:** "whose SpecTags … are left to the check" and "which is left to the check", in place of "looks up".
- **Item 36:** "Where the repository lacks such a file, it also refuses the commit"; "a second rule, in the section of the technical appendix … for the stack, that lists such files"; "the name of a type or of a definition, where that name cannot be generated".
- **Item 37:** "in the form into which `sheriff reindex` would rewrite them"; "bound in the code and the tests as the commit leaves them"; "each approved rule of the specification".
- **Item 38:** "the description of the test's language"; "carries"; "the approved rules of the specification".
- **Row 10.1.41:** "bound both to code of the system other than tests and to a test that…"; "a test or code that is bound to the rule before the commit or after it changes"; "A test run counts neither a skipped test nor a failing test that is expected to fail as failed."; the example's last sentence. These change neither the meaning nor the Russian, and the `change` fields say so.
- **Item 40:** "any test of the system's code, of the project's own checks or of the project's own generators fails"; the sentence on the reason as "either … or … or both".
- **The proposal:**
  - "the members of the `TextRule.list` of every rule";
  - "the moment at which the tests run" for "where the tests run". Round b kept "where", since rule s-x8uzc8z44pwtd3h requires the project's own guidelines to "name where the tests run". But item 40 says "the moment at which the tests run" throughout, and the item in the proposal now uses the same words, so that one thing has one name;
  - the introduction of `english-group4c.md` names "the paragraph that opens with "Where an item above refers to a rule"" instead of "the sentence after the first list".

### The readers' findings that were not applied, and why

- **"makes this check", "leaves out", "the node on the form of a SpecTag", "the rule on …", "In this check, the code means" and "the files that the repository keeps"** (both readers): kept from the agreed drafts of groups 1 to 3, as the brief says. Each is correct English.
- **"a commit that includes an approved rule"** (both readers): kept. The agreed row 10.1.41 defines "includes" by the list that follows it.
- **"the technical debt"** (fast reader): kept. The technical debt is a section, `specs/tech/debt.json`, so the article is right.
- **"Generated copies" in the title of item 36** (fast reader): kept. The reader was not sure about "Generated files", and the node checks copies against the nodes they are generated from.
- **"a failing test expected to fail" → "a test expected to fail"** (fast reader): kept. An xfail test that passes is reported separately from one that fails, so "failing" states a needed condition.
- **"refuses each such file that the repository lacks" → "reports"** (thorough reader): not applied, since a missing file causes the commit to be refused. The sentence is reworded instead.
- **"such fixtures" and "such kinds" → "those …"** (fast reader, the proposal): kept. They are agreed phrases, and "such" here means "of the kind just named", which is correct.
- **"may give its own rules any titles" → "any titles it chooses"** (thorough reader): kept. "any titles" is complete, and "as it chooses" completes the sentence.
- **"nothing internal reaches a public repository"** (fast reader): kept from review b-a's candidate reason; it is natural English.
- **"the other checks of the SpecSheriff guidelines"** (thorough reader, "other" pointing forward): settled by the new order of rule 10.12, in which the two checks are named first.
- **The remaining ambiguities:** no change. In each of them the reader found the intended reading the likelier one, and the context rules out the other, as with "these include" in item 38 and "that commit" in condition 2 of item 40.

### Вопрос ответственному

(Superseded in round d: the current text of the question, and the list of what is removed if the owner does not choose A, are in the section on round d.)

### Changes needed outside the group, found in round c

1. **"The hooks" (s-477gtdrkw34dzxw), item 57:**
   - Table 10.1 needs a row for the refusal that s-n4m5zvh96yb299p describes, because the table's head says that it lists every check. Review b-a proposed the text "Each of the project's own tools that runs on a commit after the tools that rewrite files (§s-pcnyfp7gev7syax) leaves what the commit contains as it was", with the cost "refused, naming the tool". It would be row 10.1.37b, and a node outside group 4 would implement it, so it is not added now (ruling 3).
   - The pre-commit hook must not run `sheriff binding` and `sheriff citations` once `sheriff validate` refuses a key or a file (review b-a, finding 4 on rule 10.12). Today `skills/tools/hooks/pre-commit` runs them whatever `sheriff validate` finds, and `sheriff binding` does not check for a key written more than once.
   - The exception in rule 10.12 applies only on a commit. So the pre-push hook, which runs neither of the two checks, needs no change for it.
2. **The docs:** "last approved wording" corresponds only in part to the "baseline" of ISO/IEC/IEEE 29148 and of IREB. SpecSheriff keeps one for each node, and it moves with each approval (review b-a, TERM).
3. **"Project-wide settings":** the citation for the glob patterns of a project's own check or generator is to point to s-t383grkn3q68dpf, not s-m8nmfsxkcfu7cjp (review b-b, B3). Item 2 of "Changes still to be made to nodes and files outside the group" is corrected accordingly.
4. **`.ai_docs/INDEX.md`:** the main session still has to add rows for `fix-group4-c.mjs`, `fix-group4-c-patches.mjs`, `english-group4c.md` and `tools-drafts.before-group4-c.json`.

## Round b: the six reports applied

`fix-group4-b.mjs` applies `review-g4-a.md` to `review-g4-d.md`, `english-g4-fast.md` and `english-g4-thorough.md`, and the rulings of `fix-brief-group4-b.md`.
It copies `tools-drafts.json` to `tools-drafts.before-group4-b.json` on its first run and rebuilds from that copy on every run.
Two runs gave identical `tools-drafts.json` and `english-group4b.md`, and only the twelve keys of the group differ from the copy.
The script's checks pass: every citation has its link, the Russian cites the same sids as the English, every link target exists, and the new sid is unique across `specs/`, `moved/` and the drafts.

**Keys changed:** `s-7pk89t8z6wymmj9`, `s-nh8b2hjvzasdxmd`, `s-m8nmfsxkcfu7cjp`, `s-dbk2vyeg8z5jxna`, `s-txbwsthdqhvyzd2`, `s-jgejd5rpd9d43pd`, `s-qqs2svksmjct753`, `s-b6qdtghnyha3fhk` and `proposal:new-tools-1-project-g4`.

**Keys added:**
- `proposal:row-10-1-37a` — a new row 10.1.37a of the main table of checks, sid s-vj67ztqkuhxbv7s, implemented by s-7pk89t8z6wymmj9;
- `proposal:s-pcnyfp7gev7syax-g4` — a complete new wording of rule 10.12;
- `proposal:row-10-1-41-g4` — a complete new wording of row 10.1.41.

**Titles changed in this round:** item 34 is "A node's location outside the specification" (review b, 5); item 36 is "Generated copies checked against their nodes" (the readers); item 40 is "Running the tests before a push", in Russian «Запуск тестов перед push» (review d, 6, and the readers).

### The rulings of the brief, as carried out

1. **When a project's own checks run** (review a, 1 and 2). The agreed `new:tools-7-1-validate` validates the files before any check that reads their nodes and stops when the schema refuses a file. The agreed s-7zqsstgnuc772ba also stops `sheriff validate` ("Where `sheriff validate` refuses a key or a file, it stops before it runs any check that reads the nodes"), so both are named. s-7pk89t8z6wymmj9 keeps the order, in review a's words, with a link to s-7zqsstgnuc772ba. `proposal:s-pcnyfp7gev7syax-g4` adds one paragraph and its list to rule 10.12: the project's own checks and the other checks of the SpecSheriff guidelines run only once the checks of rows 10.1.1 and 10.1.2 have passed, which therefore run first. The paragraph opens with "As an exception", so the agreed sentence "Each step runs regardless of what the earlier steps found" stays as it is. A third paragraph of the reason says why those checks come first. Every other sentence is as agreed; the Russian is taken from `newform.json`. The words "run only once … have passed" are used rather than "run only on files that have passed": a refusal by either check stops `sheriff validate` and `sheriff binding` altogether, not only for the file refused.
2. **The refusal of a check that changes a file** (review a, 3). `proposal:row-10-1-37a` adds row 10.1.37a after row 10.1.37, in the format of group 3's rows 10.1.35a and 10.1.43b: "A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves every file in the directory in which it runs as it was, other than a file that git ignores", cost "refused, naming the check and each such file", with a `checks` link to rule 10.12. s-7pk89t8z6wymmj9 implements it and cites it in its paragraph on the refusal.
3. **The files of a project's generator whose listing rule is a draft** (review a, 1 on s-dbk2vyeg8z5jxna). s-dbk2vyeg8z5jxna refuses each change that a commit makes to such a file, compared with the commit's parent (rule 10.9). It learns the generator's paths by running it as `sheriff types` runs a generator whose rule is approved, and writes nothing, as the code does today. The node implements rule 10.9 again. Review a's finding 3 (the defect in the agreed s-a8fn72xa782wvbk) is recorded below as a change outside the group.
4. **Which wording of a rule of `project.json` the SpecSheriff tools read** (review d, the doubt). `proposal:new-tools-1-project-g4` gains the paragraph: "The SpecSheriff tools read the `TextRule.list` of each rule of `project.json` in the rule's last approved wording (§s-qyjw8xez6t6adc3), since a draft rule is not implemented (§s-utvqbypzhmgndug). A rule that has never been approved lists nothing." It speaks of the lists only, so the item on the `exempts` links, which are no part of a wording (rule 1.3.5), is not affected. It does not contradict the agreed "How a project's own code generator is run", which still runs a generator only while its rule is approved: the sentence says which wording is read, and that node adds a condition on the rule's status. s-7pk89t8z6wymmj9 reads the rule that lists a check in its last approved wording (§s-a8fn72xa782wvbk), and s-b6qdtghnyha3fhk reads the rules that list `push` in their last approved wording as of the commit concerned. **A check that `sheriff.config.json` names and that only a draft wording of its rule lists is refused as unlisted; it takes effect once an owner approves that wording.**
5. **The files that `sheriff citations` reads** (review b, 5): option B. s-m8nmfsxkcfu7cjp reads every file that the repository keeps outside `specs/`, and one list says what it leaves out: the bindings file, the listed fixtures, and the sid of a SpecTag in the system's code or its tests. The list of files read is gone (rule 7.2.6). Stage 3: the placeholder sid `s-222222222222222` in `skills/tools/src/reindex.ts:104` must be rewritten, since this check would refuse it.
6. **A commit that ends an exemption** (review c, question 2). `proposal:row-10-1-41-g4` adds one item to row 10.1.41: "the rule stops being exempted from implementation (§s-gf6n8ge4mke3pr2): an `exempts` link that reached it is removed or no longer reaches it, or the node that declares that link becomes a draft." The row already has a `checks` link to s-gf6n8ge4mke3pr2, which serves the new citation. The third item's full stop becomes a semicolon; the rest, the cost, the reason and the example are as agreed, the Russian taken from `table-10-1.json`. s-jgejd5rpd9d43pd has the same item.
7. **Merge commits** (review c, question 1): the one question for the owner, below. s-qqs2svksmjct753 and s-txbwsthdqhvyzd2 carry the answer that the reviewer recommends: for a merge commit, `sheriff commit-message` counts only what the merge changes relative to every one of its parents, since each merged commit was checked when it was made. s-2x58az67bm6cxq2 and every other check are unchanged.

### The other points of the brief

- **The `implements` chain in s-txbwsthdqhvyzd2** (review c, DOUBT): added in review c's words. The record of the agreement of row 10.1.40 (`t25-one-thought.md`, the paragraph after the row's reason) says that "bound to the rule" has the meaning that row 10.1.41 gives it, directly or through a chain of `implements` links. Round a's note "No `implements` chain" is superseded.
- **The scissors line and `core.commentChar`** in s-qqs2svksmjct753 (review c, DOUBT): added in review c's words, with "ignores" for "leaves out" (the readers). git passes the commit-msg hook the message before it removes the comments and the scissors line, as the brief says.
- **Review d's CUT** of the first condition of s-b6qdtghnyha3fhk ("the commit leaves the specification approved (§s-qzthyh7yqvfhsa2);"), **the per-ref reason** (fix 5) and **the Russian title**: applied. The Russian title renders the new English title and keeps "run" («Запуск тестов»), which was review d's point.
- **Review d's DOUBT** on the first `TextRule.list` in the item on levels: the citation of s-eferktypcj7njt5 is added in the proposal, and its `change` field says so.
- **The example of s-7pk89t8z6wymmj9** uses the check `spelling` (review a, 7).
- **Review a's finding 6** (the approval procedure with the `strict` flag off), settled from s-chsfpkgpmfk4fft and rules 10.6 and 10.7: before `sheriff settings` records an approval of the specification, it runs the project's own checks with a model in which the specification is approved and the flag is as its entries set it. In the cases that rule 10.7 names, it runs them as `sheriff validate --strict` does, which the agreed s-chsfpkgpmfk4fft already names for those cases.

### Review a: `s-7pk89t8z6wymmj9`

1. The order: settled by the brief's ruling 1, above.
2. Paragraph 4: replaced by review a's wording, with a link to s-7zqsstgnuc772ba. The checklist's 7.2.3 finding ("validated the files": of what?) goes with it.
3. The row for the refusal: settled by ruling 2.
4. Pointing words: "each of the project's own checks" in paragraph 2 and "one of the project's own checks" in the paragraph on the refusal, as review a gives them.
5. The sentence on the directory: split as review a gives it, with "On a commit" for "At a commit" (the readers).
6. The approval procedure: settled as the brief says, above.
7. The example: `spelling`, a node's sid, as review a gives it.

### Review a: `s-dbk2vyeg8z5jxna`

1. The files of a generator whose listing rule is a draft: ruling 3.
2. "would write": paragraphs 1 and 2 in review a's words, and "for which … would generate" in the last item. Paragraph 2 keeps the sentence "It writes none of them."
3. The defect in s-a8fn72xa782wvbk: recorded below.
4. General words: "the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3)", with a link to s-7vm323mhry2enx3; "a name of a type or a definition that cannot be generated".
5. The misplaced clause: "a second rule that lists such files in the section of the technical appendix for the stack".
6. "Each of these refusals names the rule, the node or the path concerned."
7. The reason: review a's wording, with "Lagging behind its nodes" for "Left behind its nodes" (the readers) and "the owners of those nodes" for "its owners", since a file has no owners. A link to s-hheus6f395ynqvc is added.

### Review b: `s-nh8b2hjvzasdxmd`

1. The citation of s-u7tw6m8npxmv5tu and «оставляет без проверки каждый файл»: applied.
2. "Such text": replaced by "`sheriff binding` treats text as a location only where the text stands on its own, not as part of a longer path or name, as `tech/stack` is part of `specs/tech/stack.json`." "treats … as" replaces "takes … as" (the readers). The example is turned into a statement ("as `tech/stack` is part of"), since "such as `tech/stack`" could be read as an example of a location.
3. The positive form: applied, as two items, one for a term and one for the first top-level node of a file, each "the location that the model of the specification gives", so that no sentence is over 30 words. The citations of s-a4rbry4hsu34hy8 and s-tj38pvm38nepaf5 move to the new item. A term whose name ends in a digit is now caught, as the code does.
4. "followed by": applied.
5. The title: "A node's location outside the specification".
6. "no other check would notice it": applied, and "no link backs a location" (the readers' doubt) became "a location comes with no link to the node that it names".

### Review b: `s-m8nmfsxkcfu7cjp`

1. One list of what is left out: applied, with the bindings file as its first item (ruling 5), "the check for a SpecTag" (the readers), and a link to s-u7tw6m8npxmv5tu.
2. The cut of the sid's pattern: applied; the citation of the schema (s-eferktypcj7njt5) stays after "the form of a sid".
3. The reason cites s-cxtt6jvhqcey2k9, and "no link backs a citation" became "a citation comes with no link to the node that it cites".
4. The example: "yet `sheriff citations` refuses the sid in the guide", as review b gives it.
5. The files read: ruling 5. The links to s-a8fn72xa782wvbk, s-2fau85dfyyeq66m and s-km4x4s26kv7pjze go with the list.

### Review c: `s-txbwsthdqhvyzd2`

- The chain: applied (above).
- 7.2.7 and 7.3.2: the refusal's sentence is split, and the trailer cites s-7gab4ptjt2khfr5; "with which" replaces "by which" (the readers).
- WORDING FIX + CUT: the two paragraphs are replaced by review c's list of three conditions and its sentence on the parent's approvals. The citation of s-a8fn72xa782wvbk goes. A first approval is no change, by the second condition.
- The example: "An earlier commit reworded the approved rule R, so R became a draft"; "so the lag goes unnoticed" replaces "so the lag passes" (the readers).
- The merge paragraph replaces the sentence "For a merge commit, the parent is its first parent." (ruling 7).
- TERM ("lag behind" and OpenFastTrace's "outdated"): no change in the node; a gloss in the docs, recorded below.

### Review c: `s-jgejd5rpd9d43pd`

- "lacks one or both of the following": applied.
- The refusal's sentence: split as review c gives it.
- The chain: review c's sentence, with "an approved rule … that rule" so that "the rule" does not point back to the paragraph before.
- 7.2.7: the citations of s-u7tw6m8npxmv5tu, s-mbmnsnxenmavu3z and s-a4rbry4hsu34hy8 are added, with their links.
- The exemption: ruling 6.
- TERM (OpenFastTrace's `impl` and `utest` coverage): a gloss in the docs, recorded below.

### Review c: `s-qqs2svksmjct753`

- The scissors line: applied (above).
- The reason: review c's wording.
- The merge commit: ruling 7.

### Review d: `s-b6qdtghnyha3fhk`

- WORDING FIX 1: the citations of s-hheus6f395ynqvc, s-2fau85dfyyeq66m and s-km4x4s26kv7pjze, with links.
- WORDING FIX 2: "with the command that the project-wide settings give as their `testCommand`" and "says that `testCommand` is missing".
- WORDING FIX 3: the lead names the ref and its commit; "The commit of a ref is …" is deleted.
- WORDING FIX 4: review d's text, with a link to s-sn6au3vcr9uy5pm, plus the sentence of ruling 4 on the last approved wording.
- WORDING FIX 5: the reason for each ref; `stage3` names it.
- CUT: applied. WORDING FIX 6: see the other points above.
- The readers: "exits with a non-zero status", "runs no tests", and the example's "do not name a push as the moment at which the tests run".
- Review d's note for item 57, whether to compare the working tree with the commit of a ref that does not meet the conditions, is recorded below.

### Review d: `proposal:new-tools-1-project-g4`

- WORDING FIX 1: "by its `refines` link (§s-sn6au3vcr9uy5pm) to that other rule".
- DOUBT: the citation of `TextRule.list` in the item on levels.
- WORDING FIX 2: "such as `push` (§s-b6qdtghnyha3fhk)" in the new item.
- DOUBT (owner): settled by ruling 4.
- The readers: "a rule that refines another rule" for "the rule", "may give" and "through a link, or through a setting" in the reason. Each is listed in the `change` and `reasonChange` fields.

### The readers' findings that were not applied, and why

- **"makes this check" → "performs this check"** (both readers, every node): kept, as the agreed drafts of groups 1 to 3 have it ("`sheriff binding` makes this check regardless of whether …"). It is correct English.
- **"leaves out" → "skips"** (thorough reader, items 34 and 35): kept, as the agreed drafts have it (for example s-95w92rnjuv3sst8, "It leaves out the following nodes").
- **"the node on the form of a SpecTag" and "A rule here is …"** (both readers, items 37 and 38): kept, as the agreed s-w93jfnqynfa47pf has them; "a node on X" for a node about X is correct English.
- **"In this check, the code means" → "\"code\" means"** (thorough reader, item 39): kept, as the agreed s-8wp7xm7g3u8gscq has it.
- **"where the tests run" → "when the tests run"** (both readers, the proposal): kept. The rule that the item refines (s-x8uzc8z44pwtd3h) says that the project's own guidelines "name where the tests run, such as on every push or on a shared server before a merge", which covers both a place and a moment.
- **"reaches" → "applies to"** (fast reader, item 38): kept. An `exempts` link reaches a rule directly or through a section above it (rule 9.8); "applies to" would lose that path, and the reader was not sure about the replacement.
- **"the files other than JSON files whose format allows no comments"** (both readers, the proposal): an agreed sentence that the proposal does not change. Both readers found the intended reading the likelier one, and the item on JSON files just before it rules out the other.
- **The Russian «помечен `pytest.mark.skip`»** stays as it is; only the English gains "with".

### Вопрос ответственному

(Superseded in round c: the current text of the question, and the list of what goes if the owner does not choose A, are in the section on round c.)

### Changes outside the group found in round b

1. **The agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk)**, a defect to be fixed when that node next changes (review a, 3 on s-dbk2vyeg8z5jxna): read literally, "the check of generated copies against the nodes refuses anything that `sheriff types` would write" keeps `sheriff types` from ever rewriting a stale file, since the comparison refuses that very file. The clause means the refusals that keep generation from being possible, which s-dbk2vyeg8z5jxna lists after "any one of which keeps `sheriff types` from writing any file at all". To be recorded in the continuation file.
2. **`moved/impl.json`:** the new row 10.1.37a (s-vj67ztqkuhxbv7s) → s-7pk89t8z6wymmj9.
3. **`table-10-1.json` and the page of table 10.1:** the new row 10.1.37a after row 10.1.37, and the new wording of row 10.1.41, once the owner agrees to them; `newform.json` and `moved/` take the new wording of rule 10.12.
4. **"The hooks" (s-477gtdrkw34dzxw), item 57:**
   - the project's own tools of the second step of rule 10.12, other than the project's own checks, also change no file; the hook already refuses a tool in `.githooks/<hook>.d/` that changes the staged files, and the node is to say so;
   - whether the pre-push hook compares the working tree with the commit of a ref that does not meet the conditions of s-b6qdtghnyha3fhk (review d);
   - for option C of the question above, `sheriff commit-message` runs only on a commit with one parent.
5. **The approval procedure (s-chsfpkgpmfk4fft), item 48:** rule 10.6 runs row 10.1.39b before an approval, and `sheriff types` writes files, so the procedure is to obtain that report without writing anything (review a's inference).
6. **The docs** (the reviewers' TERM notes; no node changes): "lag behind" corresponds partly to OpenFastTrace's "outdated" coverage; row 10.1.41's check corresponds partly to its `impl` and `utest` coverage, while SpecSheriff also refuses a skipped test; "fixture" matches the xUnit "test fixture" only in part.
7. **`.ai_docs/INDEX.md`:** the main session still has to add rows for `fix-group4-b.mjs`, `english-group4b.md` and `tools-drafts.before-group4-b.json`.

## Decisions that apply to the whole group

- **Rows.** Each node implements the rows whose checks it makes, and none implements the main table of checks (X1, as in groups 1 to 3).
- **Row 10.1.39b has no node of its own.** The agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk) already names each node that it leaves out because that node relies on a node that has never been approved, and it has an `implements` link to row 10.1.39b (s-f8fmudceuyaj942). A second node would state the same thing twice ("one check, one node"). `moved/impl.json` is to map row 10.1.39b to s-a8fn72xa782wvbk.
- **Form.** Each node opens with what its command refuses or accepts, and says what the refusal names.
- **Draft or approved.** Each node says whether its check runs while the specification is a draft and cites its row: rows 10.1.37, 10.1.38, 10.1.39, 10.1.39a and 10.1.42 refuse with no condition; rows 10.1.40 and 10.1.41 refuse only while the commit leaves the specification approved and report nothing in a draft (the ruling of 2026-11-20); row 10.1.44 runs the tests only while the commit that a push sends leaves the specification approved. Each node reads the approval status as the commit leaves it, as the agreed s-3xx2eukc8gtd2tx does.
- **Which nodes are checked.** "Each approved rule in the files that the repository keeps, including a node in a cell of a `TableRule`", and "a rule" as the node on the form of a SpecTag (s-5z5gnu7pahr82xp) lists the kinds, as in group 3.
- **Citations at first use (rule 7.2.7).** Location (8.5), the model of the specification (s-w6gybeqn2ttydqx), `TextRule.list` (5.1), the value of a member (s-5hb9k2e34dgn284), approval status (10.6), the `strict` flag (10.7), the project's own guidelines (2.3), the system's code (9.1), symbol (1.5.2), test (s-zrsc6asgmhv8tnc), a file bound as a whole (s-5qdjyf6t898rsd4, s-trwczfskj5zmuft), what a commit adds, changes or removes (s-2x58az67bm6cxq2), the documentation (s-zefk589ykh37b8u), base specification (1.1.4), technical appendix (1.1.5), appendix of the tools (2.1), term (3.3), RuntimeChecks (12.3), the description of a language (s-33fw3ga4ctd94dq), the last approved wording (s-a8fn72xa782wvbk), the fingerprint (s-v4qus7raqnwzneb), the trailer (s-7gab4ptjt2khfr5), the pre-push hook (s-477gtdrkw34dzxw).
- **Agreed drafts without a sid.** "Project-wide settings", "What the SpecSheriff tools read in the project's own guidelines" and "Validation against the schema before a command works on the files" have no sid yet. Where a draft relies on one of them, it cites the nearest node with a sid, as group 3 did: s-zefk589ykh37b8u for `sheriff.config.json` and `project.json`, and s-xzcw3hv4hmxz7h7 for the validation against the schema.
- **Words.** "refuses", "including X", "code other than tests", "regardless of whether the specification is approved or a draft", "the SpecSheriff tools", never "the tools" alone, and no "carries" or "stands". In Russian: «отвергает», «ответственный», «статус одобрения», «у X есть SpecTag», «тип узлов», «отпечаток» for a fingerprint as the agreed s-a8fn72xa782wvbk renders it, and «слияние» for a merge as the agreed s-x8uzc8z44pwtd3h renders it. «trailer», «push», «ref» and «guidelines» stay in English.
- **`removed` and `stage3`** are in English, as in group 3; the page of the group needs their Russian (`group4-ru.json`), which the main session builds.

## The drafts

### Item 33: `s-7pk89t8z6wymmj9` — "How a project's own check is run" (row 10.1.37)

Location tools 7.1.23, unchanged. Implements row 10.1.37 (s-ujm7nfxkk9j3464) and rule 10.8 (s-2fau85dfyyeq66m).

How the questions were settled:
- **The order of rule 10.12.** Rule 10.12 runs the project's own checks before the checks of the SpecSheriff guidelines, while the approved node runs them inside `sheriff validate`. The agreed `sheriff settings` (s-chsfpkgpmfk4fft) names `sheriff validate --strict` as the command for a project's own checks, so `sheriff validate` keeps running them. It now runs them first, before its other checks, and makes those whatever the own checks find, as rule 10.12 requires of each step. They run after the validation against the schema, since the agreed "Validation against the schema before a command works on the files" requires it before any check that reads the nodes, and an own check reads the model. The hooks are to run `sheriff validate` before `sheriff binding` and `sheriff citations` (item 57, below).
- **How the rule that lists a check says that its failure is only reported.** By the property `onFailure` of the member, with the value `reported`, as the code reads it (validate.ts:202). The ruling of 2026-11-04 on rule 10.8 puts that choice in the rule, which an owner approves, and not in the settings. A member is matched by its value as s-5hb9k2e34dgn284 defines it, which covers a member that is a string.
- **A check that changes a file is refused.** Rule 10.12 says that the project's own checks change no file, and that nothing changes what the commit contains after its first step. The project's own tools in a git hook are already refused for changing the staged files; a project's own check was not held to it.
- **`--strict`.** The agreed `sheriff settings` names `sheriff validate --strict` as the command that lists what a project's own check finds as if the specification were approved and its `strict` flag on (rule 10.7). The node says how: the model that the checks receive says so. The other checks of `sheriff validate` do not depend on the flag, so they are the same with or without it.
- **Rule 10.7's second example** (an own check that refuses while the flag is on and only reports otherwise) needs no new property: a check reads the flag from the model, so a project lists two members, one `reported` that fails only while the flag is off and one refused that fails only while it is on.
- **Draft or approved.** Row 10.1.37's cost has no condition, so the checks run in a draft too. A check that should behave differently in a draft reads the approval status from the model, which the agreed s-w6gybeqn2ttydqx puts there for this reason.
- **The todo of 2026-11-06 on a time limit** for a project's own check and generator stays on the node. It is deferred work; the agreed "How a project's own code generator is run" has no limit either, and adding one needs a new setting in the agreed "Project-wide settings".
- **Group 2's item 8** (the agreed "Project-wide settings" cites s-utf4mbt7ref8g9c for the glob patterns of the code and the tests of a project's own check or generator, which that node no longer reads) is settled as a technical replacement: the citation is to point to s-t383grkn3q68dpf, "A node's `meta.code` and `meta.tests`", whose stage-3 note reads those files to find SpecTags. The patterns are also read by `sheriff reindex` (s-gb8s9657a65hqmv). (Corrected in round c: this note named s-m8nmfsxkcfu7cjp, which since round b reads every file outside `specs/` and uses none of those patterns.)

Stage 3: see the draft's `stage3`. In short: run the own checks after the schema and before the other checks, match string members, hand the model as `sheriff json` prints it, add `--strict`, refuse a check that changes a file.

### Item 34: `s-nh8b2hjvzasdxmd` — "A location outside the specification" (row 10.1.38)

Location tools 7.2.7, unchanged; the title was "Citing a node only by its sid". Implements row 10.1.38 (s-u5hfbygfyqv4wmf) and rule 10.11 (s-6hha5en226aj8hu).

How the questions were settled:
- **Citing by sid** is now stated in rule 1.2.2 (s-9spq78kdwsxr759), which the row checks, so the `implements` link to rule 8.5 became a citation of 8.5 for "location".
- **NodeKind** is gone (X4); a location is refused whatever node it names.
- **What text is a location** follows "How a node's location is computed" (s-ygg5kpcxgzq3m7w): a numbered location, whether or not a node is there now, and an unnumbered location of a node that holds a slash, such as a term's. A domain header's location, such as `requests`, is an ordinary word and is left out, as the code does.
- **"Other than the specification"** in row 10.1.38 is read as outside `specs/`. Under "Where the files are", `specs/` holds the specification and the files that belong to it: the archive, the approvals and the project's extension of the schema. Citations inside the nodes are rows 10.1.13 and 10.1.14's.
- **The command** stays `sheriff binding`, as in the code and in the agreed section "Checks made by `sheriff binding`".
- The sentence on what `sheriff validate` checks in the nodes is removed: it stated what s-qzyacnqwvaeaps4 states.

Stage 3: compute the beginnings of numbered locations as s-ygg5kpcxgzq3m7w does, including the files of the extensions and of the plugin; move the tests at binding.test.ts:153 and :159 to s-nh8b2hjvzasdxmd.

### Item 35: `s-m8nmfsxkcfu7cjp` — "A citation outside the specification" (row 10.1.39)

Location tools 7.3.1, unchanged. Implements row 10.1.39 (s-e84nggntkrcyumq) and rule 10.11.

How the questions were settled:
- **The archive** is no longer read: an archived node has no sid (rule 2.6), as row 10.1.39's todo says.
- **"documents"** became "the documentation", by the owner's ruling of 2026-11-20 on row 10.1.39 (X5); "Where the files are" defines it.
- **One refusal per SpecTag** (group 2's item 3). The agreed "A SpecTag that names no node" (s-36x8amvunmv2kp5) checks the SpecTags in the system's code, its tests and the bindings file, so this node leaves those to it. It checks the SpecTags in the code and the tests of the project's own checks and generators, which rule 10.10 allows, and every other sid.
- **(Superseded in round b: `sheriff citations` now reads every file outside `specs/`.)** **The files read**: the files that the globs for code and for tests match, the files that `sheriff types` writes (the system's code, rule 9.1), the files that the globs of each project's own check and generator match, and the documentation. The bindings file is not read, since it holds only SpecTags, which s-36x8amvunmv2kp5 checks.
- **The form of a sid** is the schema's pattern, `s-` and 15 characters from `23456789abcdefghjkmnpqrstuvwxyz`, as `node.schema.json` gives it.
- **The model of the specification** is where a sid is looked up, so a citation of a rule of the SpecSheriff guidelines from the plugin passes, as with s-36x8amvunmv2kp5.

Stage 3: stop reading the archive, look sids up in the model, read the files of `sheriff types` and of the project's own checks and generators, leave the SpecTags of the system's code to s-36x8amvunmv2kp5.

### Item 36: `s-dbk2vyeg8z5jxna` — "Generated copies against the nodes" (row 10.1.39a)

Location tools 7.2.8, unchanged. Implements row 10.1.39a (s-dwxjxb7rw4w5yn3).

How the questions were settled:
- **The comparison** is with what `sheriff types` writes from the approved wordings (row 10.1.39a and the owner's ruling of 2026-11-18), no longer with the last commit while a node is a draft.
- **Row 10.1.39b** is implemented by s-a8fn72xa782wvbk (see above). `sheriff binding` no longer reports the node, so it is not named twice in a hook.
- **The refusals stay in this node**, since the agreed s-a8fn72xa782wvbk relies on them: `sheriff types` writes no file where "the check of generated copies against the nodes refuses anything that `sheriff types` would write (§s-dbk2vyeg8z5jxna)".
- **"A file of another extension"** meant a file-name extension, so the node now says that the file's name ends in none of `.ts`, `.py` and `.json`; the code checks that (types.ts:64).
- **Dropped refusals**: a path that a generator prints outside the repository or under `specs/`, now the agreed s-y5yk7eu6h4zrjpr's refusal of a path outside the system's code; a RecordType with two fields of type `variant`, a type that rule 12.6 drops.
- **New refusal**: a path to which `sheriff types` would write different texts. It carries out the node's todo of 2026-11-06: two generators that print one path with different content would make a copy that never matches, and the refusal names the cause. The todo is removed.
- The `implements` link to rule 10.9 became a citation: the agreed s-y5yk7eu6h4zrjpr implements that rule.

Stage 3: compare with what `sheriff types` writes, drop the fallback to the last commit and the report, refuse a path with different texts, drop types.ts:172. Which node the types.test.ts test of the list's refusals carries is for item 53.

### Item 37: `s-txbwsthdqhvyzd2` — "An approved rule whose tests or code lag behind it" (row 10.1.40)

Moved from tools 7.2.9 to tools 7.3.3a, after item 39; the title was "A node whose tests or code lag behind it". Implements row 10.1.40 (s-ddd2e96uke4y83j).

How the questions were settled:
- **The command is `sheriff commit-message`**, and the node moves to the section on the other commands. The check reads the trailer of s-7gab4ptjt2khfr5, so it needs the commit message; rule 10.2 runs such a check on a commit and not after an agent's edit (group 2's item 4). The agreed list of commands says that `sheriff commit-message` "checks a commit's message against the code that the commit changes", which covers checking a trailer against the changes; see the changes outside the group.
- **"The wording of an approved rule changes in a commit"** means that the commit leaves the rule approved in a wording other than its last approved wording before the commit, compared by fingerprint. Comparing with the wording in the commit's parent would miss the usual path: a rule reworded while it was a draft, whose code row 10.1.28a then keeps unchanged, and approved in a later commit. The owner ruled on 2026-11-19 that the commit that approves a new wording brings the rule's tests and code with it (the continuation file, the paragraph "Work stopping").
- **"Already bound"** means bound in the commit's parent; a change is an addition, a change or a removal as s-2x58az67bm6cxq2 defines them, which also carries out the row's todo (tests and symbols, not whole files).
- **(Superseded in round b: the chain counts, by the record of the agreement of row 10.1.40.)** **No `implements` chain.** The row says "bound", which rule 9.3 defines by SpecTags; rule 9.2 and row 10.1.41 state the chain where they mean it. A node of the technical appendix that implements the rule has its own tests and code, checked when its own wording changes.
- **The system's code only**, including its tests: the row checks rules 1.5.1 and 1.4.1, which govern the system's code.
- **Draft**: the check passes and reports nothing (the ruling of 2026-11-20), which also carries out the row's first todo.
- **The refusal names the trailer**, as the agreed s-utf4mbt7ref8g9c's refusal names `sheriff reindex`, so that whoever commits knows how to state that the implementation needs no change; the reviewer judges that statement (s-kgqxg4gunzynwsv).
- **The exception for a commit that only puts `@spec ` before bare sids** goes: under rule 9.4, a change to a SpecTag changes the test. Group 2's item 20 already records the consequence for the migration.

Stage 3: `drift` goes from binding.ts; message.ts makes the check with fingerprints, s-2x58az67bm6cxq2 and the trailers. The hooks lose the report after an edit.

### Item 38: `s-jgejd5rpd9d43pd` — "An approved rule without code or a test" (row 10.1.41)

Location tools 7.2.10, unchanged; the title was "An approved node without code or a test". Implements row 10.1.41 (s-c4y63t285gg7jz7).

How the questions were settled:
- **Which rules a commit includes** follows the row, with "an added approval" from s-75ue25v6r23jkk8 and "adds, changes or removes" from s-2x58az67bm6cxq2 (group 3's item 9).
- **The exceptions of rule 9.2** are said through the files that hold them: `project.json`, `debt.json` and, only in the repository where the SpecSheriff guidelines are written, the guidelines, their extensions and the appendix of the tools under `specs/_guidelines/`. In a project, the last three are not among the files that the repository keeps. Rule 9.2 does not name the appendix of the tools, which only this repository keeps and which the SpecSheriff tools implement, and those are not the system's code (rule 9.1). The code leaves out all of `specs/_guidelines/` today. The rule "What only this repository does stays out of the SpecSheriff guidelines" keeps rule 9.2 as it is.
- **A project's own kinds** are rules only where their nodes need code, as s-5z5gnu7pahr82xp says, so the `implements` link to rule 8.3 is dropped.
- **An exemption** holds only while the exempting node is approved (rule 9.8, the ruling of 2026-11-11).
- **A skipped test, or one expected to fail**, is recognised by the marks, calls and options that the description of its language names; the code does so already (code.ts, `skips`). The agreed s-33fw3ga4ctd94dq says that the description names what counts as a symbol and as a test; see the changes outside the group.
- **Draft**: the check passes and reports nothing (the ruling of 2026-11-20).

Stage 3: refuse only the rules that the commit includes, while the commit leaves the specification approved; count every kind of rule, nodes in cells, files bound as a whole, bindings entries and generated files; count an exemption only from an approved node.

### Item 39: `s-qqs2svksmjct753` — "The nodes that a commit message must name" (row 10.1.42)

Location tools 7.3.3, unchanged; the title was "A commit message names the nodes its code implements", where "its code" could be read as the message's code. Implements row 10.1.42 (s-7sk3s553ukzwtbm).

How the questions were settled:
- **Files bound as a whole and entries of the bindings file** count (group 2's item 5; rule 1.5.2).
- **The refusal of a header or a section** goes, by the owner's ruling of 2026-11-11 on rule 9.6, which removed that paragraph.
- **The refusal of a sid that names no node** goes. No row of the main table of checks requires it, and the table lists every check of the SpecSheriff guidelines; under "What no rule requires is not proposed", it is not kept. It also kept a commit that removes a node from naming that node. A mistyped sid of a node whose code the commit changes still leaves that node unnamed, which the check refuses; a mistyped trailer leaves row 10.1.40's rule unnamed, which item 37 refuses.
- **The SpecTags are read as the commit leaves the code.** Rule 9.6 speaks of the node to which a SpecTag binds the changed code, and on 2026-11-11 the owner did not accept a requirement to name the node of a removed SpecTag.
- **Comment lines** starting with `#` are left out, as the code does.

Stage 3: drop both refusals and the test at gates.test.ts:38; count files bound as a whole and bindings entries; move the tests of message.ts from s-ef93u6cnbs2sevr to s-qqs2svksmjct753.

### Item 40: `s-b6qdtghnyha3fhk` — "The tests, run before a push" (row 10.1.44)

Location tools 7.3.5, unchanged. Implements row 10.1.44 (s-aufnqn6t7y2me7a) and "When the tests must pass" (s-x8uzc8z44pwtd3h), in place of the archived s-xhcmchcngykvn2k.

How the questions were settled:
- **The approval status** is read from the entries in each commit's `sheriff.config.json` (rule 10.6), no longer from s-j9r8z4xdrfkfs47 (group 3's item 7).
- **Whether the project's own guidelines name a push** is read by the SpecSheriff tools. The continuation file left the question to this review, in its follow-up on `project.json`. Row 10.1.44 refuses a push only where the project's own guidelines name a push, so the hook must know it. The agreed "What the SpecSheriff tools read in the project's own guidelines" reads every such value from the members of a rule that refines the rule concerned. So a rule refining s-x8uzc8z44pwtd3h lists `push`, and that node gains an item: `proposal:new-tools-1-project-g4`.
- **A push that only deletes refs** no longer runs the tests: no change reaches the shared branch, and s-x8uzc8z44pwtd3h requires the tests only before a change does. The code runs them today.
- **A missing `testCommand`** refuses the push where the tests must run, as the code does.
- **Where no test runs**, the hook names the reason, as the approved node says for a draft.
- **The comparison of the working tree** stays in "The hooks" (s-477gtdrkw34dzxw), which makes it only before a push that runs the tests; the old reason, which was about that comparison, is replaced.

Stage 3: push-mode.ts reads the entries and the `push` member; the pre-push hook skips a push that only deletes refs and names the reason when it runs no test. The decision of 2026-11-06 is restated without its citation of s-xhcmchcngykvn2k.

## The proposal

### `proposal:new-tools-1-project-g4` — "What the SpecSheriff tools read in the project's own guidelines"

Base: `new:tools-1-project`, agreed on 2026-11-21, with no later proposal over it. The new wording adds one item, "where the tests run", which item 40 needs, and an `implements` link to s-x8uzc8z44pwtd3h. Three agreed sentences are brought into line in the same proposal:
- "by the `refines` link it carries" became "by its `refines` link to that other rule", since a node carries nothing (`.claude/vt/rules.md`, "A reference backs a statement and never makes it");
- "so the tools find" in the reason became "so the SpecSheriff tools find" (`.claude/vt/rules.md`, "Git's operations keep git's names, and the SpecSheriff tools are never just 'the tools'");
- in Russian only, «собственные виды узлов» became «собственные типы узлов», the owner's term.

## Changes still to be made to nodes and files outside the group

1. **"The hooks" (s-477gtdrkw34dzxw), item 57:**
   - at a commit, `sheriff validate` runs before `sheriff binding` and `sheriff citations`, so that the project's own checks run before the other checks of the SpecSheriff guidelines (rule 10.12, item 33);
   - after an agent's edit, the report of a node whose tests or code lag goes; `.githooks/commit-msg` runs `sheriff commit-message`, which now also makes the check of row 10.1.40 (item 37), and the node names `sheriff commit-message` in place of `sheriff message`;
   - the pre-push hook runs the tests as item 40 says; the comparison of the working tree stays there.
2. **"Project-wide settings" (`proposal:new-tools-1-settings-g3`), a technical replacement for stage 3:** in the item on a project's own checks and generators, §s-utf4mbt7ref8g9c becomes §s-t383grkn3q68dpf, "A node's `meta.code` and `meta.tests`", whose stage-3 note reads the files of their code and tests to find SpecTags (group 2's item 8). Only a sid changes. (Corrected in round c: the target was s-m8nmfsxkcfu7cjp, which since round b uses none of those patterns.)
3. **"The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts):** `sheriff commit-message` "checks a commit's message against the code that the commit changes". It now also checks a trailer of the message against the tests and the code that the commit changes (item 37). The wording still holds; if the node next changes for another reason, "against the code and the tests that the commit changes" would describe it exactly.
4. **"How a symbol carries its SpecTags" (s-33fw3ga4ctd94dq):** it says that the description of each language names what counts as a symbol and as a test. Item 38 also relies on the description naming the marks, calls and options of a skipped test or of one expected to fail. The sentence does not say "only", so nothing contradicts; the addition is to be made when that node next changes.
5. **Table 10.1:**
   - no row checks rule 10.10's requirement that a SpecTag outside the system's code names only a rule of the guidelines; item 35 checks only that such a SpecTag names a node. To be raised when the table is next reviewed;
   - row 10.1.44 keeps a `checks` link to rule 10.10 (s-sfjka4zc4rhfu67), left from the requirements on the tests of a project's own checks that the owner removed on 2026-11-13. Group 3 already records the change of its other `checks` link to s-x8uzc8z44pwtd3h;
   - the todos of rows 10.1.39 and 10.1.40 are removed in stage 3, once the checks exist.
6. **`moved/impl.json`:**
   - row 10.1.39 (s-e84nggntkrcyumq) → s-m8nmfsxkcfu7cjp only, dropping s-nh8b2hjvzasdxmd;
   - row 10.1.39a (s-dwxjxb7rw4w5yn3) → s-dbk2vyeg8z5jxna (now `[]`);
   - row 10.1.39b (s-f8fmudceuyaj942) → s-a8fn72xa782wvbk (now `[]`);
   - row 10.1.40 (s-ddd2e96uke4y83j) → s-txbwsthdqhvyzd2 and s-7gab4ptjt2khfr5 (group 2's item 18 adds the second);
   - row 10.1.42 (s-7sk3s553ukzwtbm) → s-qqs2svksmjct753 only, dropping s-2x58az67bm6cxq2, which no longer implements the table;
   - rows 10.1.37, 10.1.38, 10.1.41 and 10.1.44 keep their nodes.
7. **`config.schema.json`**, still to be added to `moved/specs/_schema/`, is to describe `testCommand` and, for each project's own check and generator, `rule`, `name`, `command`, `code` and `tests`.
8. **The page of group 4** needs the Russian of the `removed` and `stage3` fields (`group4-ru.json`), as for group 3.
9. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session still has to add rows for `propose-group4.mjs`, `group4-notes.md`, `english-group4.md` and `tools-drafts.before-group4.json`.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`.
