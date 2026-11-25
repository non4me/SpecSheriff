I loaded the skill `specsheriff-terminology-review` and ran `node .claude/vt/writing-rules.mjs`. My input holds six drafts. The four drafts on lines and binding are in reviewer A's input; I read them only as context. **None of the six is ready.**

## Checklist

Columns: **A** proposal:s-m4h279nbaqkpa3t (1.6.1) · **B** proposal:s-nyh9yk22ba6g77q-g3 (10.4) · **C** proposal:row-10-1-43b · **D** proposal:s-vp24dqydygztqbt (7.3.4) · **E** proposal:new-tools-10-verdict · **F** new:tools-7-3-review-comments

| Rule | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| 1.2.3 Text and reason | ✓ | ✓ | ✓ (no reason, like most rows) | ✓ | ✓ | ✓ |
| 7.1 Goal, reader, scope | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 Order of the text | ✓ | ✓ | ✓ | ✓ | ✗ "A verdict that passes … A verdict that refuses …": two conditions of one kind written as separate sentences | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 General word in a name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words from the specification | ✗ agreed: "the main table of checks", "the table of checks of an extension", "the base specification", "the system's code", "a project's own checks and generators" are not cited where first used | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 Title | ✓ | ✓ | ✓ (a cell has none) | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ reason: "misleads whoever reads the code next, and only reading both can show the mismatch" |
| 7.3.3 Contents of a node | ✗ agreed: the node holds requirements that can each be carried out alone (group 2's notes, item 12) | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✗ agreed: "Two things are checked mechanically" | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 Reason | ✗ agreed: see the pairing test | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 Sentence length | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 Language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capitals | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ (none needed) | ✓ | ✗ "It changes no code, its message contains no statement …, and it approves no node" gives three of the four grounds | ✓ | ✗ "the comment above `roundPrice`": under the text, the reviewer gets neither the function nor its rules |
| Pairing test | ✗ agreed: the three paragraphs of the reason ground text paragraphs 2–3, the edits sentence and the tests sentences, in order | ✓ | ✓ (no reason) | ✓ | ✓ | ✓ |

## A. proposal:s-m4h279nbaqkpa3t — not ready

- **A1 (author).** A test implements no rule; it is written from one (10.10, s-sfjka4zc4rhfu67). Fix in the new item, and the same in row C:
  - "…and with the rules that this code implements or that this test is written from;"
  - «…и с правилами, которые этот код реализует или по которым написан этот тест;»
- **A2 (author drafts; the owner agrees, since the sentences are agreed).** Items 11 and 12 of group 2's notes were deferred "for when the node next changes". It changes now, so they are due:
  - Cite at first use: "the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp)"; "the base specification (§s-5x737t9nee4zgaa)"; "the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze)". Add the `cites` links.
  - "Two things are checked mechanically:" → "The following are checked mechanically:" / «Механически проверяется следующее:».
  - Split the node under 7.3.3, and give each part a reason that is about the part as a whole. Keep this sid on the reviewer's judgements, which 10.2 cites.
  - Item 11: leave the files generated from the specification out of both judgements. Today, a commit that changes only generated files gets a review that can only pass. Its comments are also not given to the reviewer (10.4, s-rd9nftptjuz6bwv). Row C follows.

**Оценка**
- согласованность: ✗ «правила, которые этот код реализует» не подходит к комментарию в тесте (10.10). Комментарии в сгенерированном коде рецензенту не передаются (10.4, s-rd9nftptjuz6bwv). В остальном сверено с принципом в редакции от 2026-11-24, с 10.2 и со строкой 10.1.43b.
- целостность: ✗ пункты 11 и 12 заметок группы 2 стали обязательными сейчас и не выполнены.
- целесообразность: ✓ по 9.4 правка комментария больше не меняет код, и без этого суждения комментарии не проверял бы никто.
- избыточность: ✓ не найдена. Предупреждение сказано в строке 10.1.43b и здесь не повторено.
- недостаточность: ✓ не найдена.

## B. proposal:s-nyh9yk22ba6g77q-g3 — not ready

- **B1 (author).** By s-33fw3ga4ctd94dq, a symbol's doc comment sits directly above the symbol, above its decorators. By s-2x58az67bm6cxq2, a symbol's lines run from its first line to its last, decorators included. So the doc comment is not "in" the symbol. The most common edit to a comment would then bring the reviewer no rules. Fix:
  - "…binds to code or a test that the commit adds or changes, or that holds, or lies directly below, a comment that the commit adds or changes;"
  - «…привязывает к коду или тесту, добавленному или изменённому коммитом либо такому, в котором или непосредственно под которым стоит комментарий, добавленный или изменённый коммитом;»

The proposal also drops the `cites` links to s-vsh384ybt4w25a2 and s-km4x4s26kv7pjze, which no citation matches. Its `change` field does not mention this, but a change to links leaves the status as it is.

**Оценка**
- согласованность: ✓ сверено с 1.6.1 (предложение), принципом, s-rd9nftptjuz6bwv и s-kgqxg4gunzynwsv.
- целостность: ✓ сверено с s-7vpsdsy8dpqdy6r и s-vp24dqydygztqbt.
- целесообразность: ✓ коммит, меняющий только комментарий, по 9.4 кода не меняет, и прежний пункт не дал бы рецензенту правил.
- избыточность: ✓ не найдена.
- недостаточность: ✗ комментарий непосредственно над символом (s-33fw3ga4ctd94dq) не входит в строки символа (s-2x58az67bm6cxq2), поэтому правила этого символа рецензент не получает.

## C. proposal:row-10-1-43b — not ready

- **C1 (author).** Apply A1: "…that this code implements or that this test is written from" / «…которые этот код реализует или по которым написан этот тест». Apply A2's item 11 here too, if the author changes 1.6.1.

**Оценка**
- согласованность: ✗ «implements» не подходит к тесту (10.10). В остальном сверено с принципом, с последним предложением 1.6.1, со строками 10.1.43, 10.1.43a и 10.1.39b («reported by the node's sid»).
- целостность: ✓ строку реализует s-7vpsdsy8dpqdy6r; запись в impl.json учтена в заметках (п. 13).
- целесообразность: ✓ без этой строки по 1.6.1 непройденная проверка отклоняла бы коммит.
- избыточность: ✓ не найдена. Так же устроены строки 10.1.43 и 10.1.43a.
- недостаточность: ✓ не найдена.

## D. proposal:s-vp24dqydygztqbt — not ready

- **D1 (author).** The agreed sentence "In that case, it refuses the commit only where the verdict lists at least one other finding" breaks the principle. While the specification is a draft, a verdict may list a finding on a statement and one on a comment. The statement finding is set aside, the comment finding counts as "other", and the commit is refused. Fix:
  - "In that case, it refuses the commit only where the verdict also lists a finding on code or on a node that the commit approves."
  - «В этом случае он отклоняет коммит, только если вердикт перечисляет ещё и замечание о коде или об узле, который одобряется в коммите.»
- **D2 (author).** The example gives the grounds for not running the reviewer, and one is now missing. Fix:
  - "It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node."
  - «Он не меняет ни кода, ни комментариев в коде, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла.»
- Update the `change` field to describe both fixes.

**Оценка**
- согласованность: ✗ при черновике спецификации замечание о комментарии засчитывается как «другое» и отклоняет коммит. Это противоречит принципу и s-7vpsdsy8dpqdy6r.
- целостность: ✓ сверено с s-epaw9sgyaajzn8g, 10.4, s-rd9nftptjuz6bwv, s-kgqxg4gunzynwsv и s-tj38pvm38nepaf5.
- целесообразность: ✓ иначе коммит, меняющий только комментарии, не запускал бы рецензента. Цену этого ответственный принял 2026-11-24.
- избыточность: ✓ не найдена.
- недостаточность: ✗ пример называет три основания не запускать рецензента из четырёх.

## E. proposal:new-tools-10-verdict — not ready

- **E1 (author).** Split into three sentences, the text no longer says that an answer breaking either condition is not read. Only the example says so, and an example requires nothing (7.6.3). Fix the third paragraph:
  - "`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and that does one of the following:
    - passes the commit and lists only findings that belong to the judgement on comments (§s-7vpsdsy8dpqdy6r), if it lists any;
    - refuses the commit and lists at least one finding that belongs to another judgement."
  - «`sheriff review` читает вердикт только из ответа, который соответствует схеме вердикта и делает одно из следующего:
    - пропускает коммит и перечисляет только замечания, относящиеся к суждению о комментариях (§s-7vpsdsy8dpqdy6r), если перечисляет какие-либо;
    - отклоняет коммит и перечисляет хотя бы одно замечание, относящееся к другому суждению.»

**Оценка**
- согласованность: ✓ сверено с принципом, s-7vpsdsy8dpqdy6r, s-vp24dqydygztqbt и s-94k7b6r5kf65udf.
- целостность: ✓ сверено с s-xr5xxa9cxf2mq5u и s-vp24dqydygztqbt.
- целесообразность: ✓ вердикт, который пропускает коммит с замечанием о комментарии, должен читаться.
- избыточность: ✓ не найдена.
- недостаточность: ✗ текст не говорит, что ответ, нарушающий любое из двух условий, не читается.

## F. new:tools-7-3-review-comments — not ready

- **F1 (author).** A doc comment is not held by its symbol (see B1), and a comment between symbols is held by no symbol. So the reviewer gets no code for the comment above `roundPrice`, and the example contradicts the text. Replace sentence 2 of paragraph 3:
  - "Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the code that each such comment is in or directly above. That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:
    - the symbol (§s-kgbzk2ph9e6jfb4) or the test that holds the comment, or that the comment is directly above (§s-33fw3ga4ctd94dq);
    - the file that holds the comment, where the file is bound as a whole, or where the comment is neither in nor directly above a symbol or a test."
  - «Кроме того, что `sheriff review` передаёт рецензенту при каждом ревью (§s-vp24dqydygztqbt), он передаёт ему код, в котором или непосредственно над которым стоит каждый такой комментарий. Этот код состоит из следующего, каждое целиком, в том виде, в каком его оставляет коммит, с его файлом, строками и SpecTag, которые его привязывают:
    - символ (§s-kgbzk2ph9e6jfb4) или тест, в котором стоит комментарий или непосредственно над которым он стоит (§s-33fw3ga4ctd94dq);
    - файл, в котором стоит комментарий, если файл привязан целиком или если комментарий не стоит ни в символе или тесте, ни непосредственно над ними.»
  - Sending the whole file in the last case costs tokens. The author may choose the symbol that follows the comment instead.
- **F2 (author).** Replace paragraph 2 with two paragraphs. This fixes three gaps:
  - **Deleted lines:** deleting one line of a multi-line comment changes the comment, but the draft counts only added lines. This is the mistake that example 1 of s-2x58az67bm6cxq2 warns against.
  - **Generated files:** s-rd9nftptjuz6bwv and 10.4 leave them out, and this node does not.
  - **Files not read as tokens:** a comment edit in such a file, such as TOML or a Dockerfile, is a change to the code. But none of the refusal grounds in s-rd9nftptjuz6bwv concerns a comment, so nobody judges whether the comment is consistent, although the principle allows no exception. Judging it costs no extra run, since the review of the code runs anyway.

  New wording:
  - "The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc), other than in the files generated from the specification (§s-a8fn72xa782wvbk). In a file that the SpecSheriff tools read as tokens (§s-u6mj5yv8ngnz79v), the comments are those that the tools leave out. In any other file, the reviewer itself tells the comments apart from the code.

    A commit adds or changes a comment where it adds a line that holds part of the comment. It also changes a comment where it removes a line that held part of the comment and leaves the rest of the comment in place. The reviewer judges the text of a comment other than its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn)."
  - «Рецензент оценивает комментарии в коде системы (§s-hheus6f395ynqvc), кроме файлов, сгенерированных из спецификации (§s-a8fn72xa782wvbk). В файле, который инструменты SpecSheriff читают как токены (§s-u6mj5yv8ngnz79v), комментарии — это то, что инструменты при этом не учитывают. В любом другом файле рецензент сам отличает комментарии от кода.

    Коммит добавляет или меняет комментарий, если добавляет строку, в которой есть часть комментария. Коммит меняет комментарий и тогда, когда удаляет строку, в которой была часть комментария, а остальную его часть оставляет на месте. Рецензент оценивает текст комментария без его SpecTag (§s-8xw4mgvpexyvw5q), потому что изменение SpecTag — это изменение кода (§s-9j2mmnuuwmx5ksn).»
  - Add `cites` links to s-hheus6f395ynqvc, s-a8fn72xa782wvbk and s-33fw3ga4ctd94dq.
- **F3 (author).** The rule says "what holds", not what does not. Also, the verdict (tools 10.2) has a finding name the sids of its nodes, but this node does not say which. Replace paragraph 1:
  - "`sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts."
  - «`sheriff review` сообщает каждое замечание независимого рецензента (§s-m4h279nbaqkpa3t) о комментарии, который коммит добавляет или меняет (§s-td4e3rdga6azav9), только как предупреждение. Каждое такое замечание называет файл, строку и проблему, а также каждое правило, которому комментарий противоречит.»
- **F4 (author, wording fix for 7.3.2).** Split the first sentence of the reason in two:
  - "A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch."
  - «Комментарий, который больше не соответствует своему коду, вводит в заблуждение следующего читателя кода. Увидеть несоответствие может только тот, кто читает и комментарий, и код.»

**Оценка**
- согласованность: ✗ комментарии в сгенерированных файлах не исключены, хотя s-rd9nftptjuz6bwv и 10.4 их исключают. Комментарии в файлах, которые не читаются как токены, не оценивает никто, хотя принцип исключений не делает.
- целостность: ✗ комментарий непосредственно над символом (s-33fw3ga4ctd94dq) не входит в строки символа (s-2x58az67bm6cxq2). Поэтому рецензент не получает `roundPrice`, и пример расходится с текстом.
- целесообразность: ✓ комментарий, расходящийся с кодом, вводит читателя в заблуждение, а по принципу замечание о нём только предупреждает.
- избыточность: ✓ не найдена. Первое предложение абзаца 3 повторяет 1.6.1, но так же устроен согласованный s-rd9nftptjuz6bwv.
- недостаточность: ✗ удаление строки многострочного комментария не считается его изменением. Не сказано, какие sid называет замечание о комментарии.

**Terms:** no TERM finding. "Warning" has its usual meaning from compilers and linters, a report that blocks nothing (inference). Rule 9.5 (s-kkbqcb9xrpaepwn) already uses it that way.

## The two choices of the drafting agent

- **The formats named by file extension in s-u6mj5yv8ngnz79v.** This is the right home, and the choice holds. If YAML, CSS, SQL, Bash or JSON had a description, five nodes would change their meaning:
  - s-5qdjyf6t898rsd4 would no longer let such a file carry SpecTags at its start;
  - s-9rtrj24myzjvshu would allow a SpecTag only above a symbol;
  - s-33fw3ga4ctd94dq would look for symbols in such a file;
  - s-utf4mbt7ref8g9c would look for tests in it;
  - s-5hb9k2e34dgn284 would look for string literals that symbols declare.

  In other formats every edit changes the code, which is the safe default. Their comments are covered only once F2 is applied.
- **Which whitespace counts is left to the code.** An agent can implement Python and YAML from the examples. It would have to ask about whitespace between identical tokens:
  - in CSS, `a:hover` and `a :hover` select different elements;
  - in Bash, `x=1` is an assignment, but `x = 1` runs a command.

  A criterion that settles these cases: two lines change the code where their tokens, or the syntax nodes that the grammar places them in, differ. tree-sitter gives different trees in both cases (inference). The node is in reviewer A's input.

## Findings only the owner can answer

None. A2 rewords agreed sentences of 1.6.1, so they go to the owner inside the proposal, as `.claude/vt/rules.md` requires. Treat F2's part on files not read as tokens as a question for the owner only if the author decides to keep that restriction.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/review-input-g3e-b.md`, `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/group2-notes.md` (items 11 and 12), `D:/SpecSheriff/docs/principles.md`
