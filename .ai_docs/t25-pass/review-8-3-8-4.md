# The reviewers' reports on nodes 8.3 and 8.4 (2026-11-10), each proposed for agreement whole

## 8.3 Whether a project's own kind of node needs code: passes after the fixes, two doubts

WORDING FIX, text. «как правило» reads as "usually". RU: «реализуются и тестируются так же, как правило».

WORDING FIX, text. "each such kind" follows a sentence on nodes that need code. EN: "each of the project's own kinds of node". RU: «каждый собственный вид узлов».

WORDING FIX, reason. "Held to code" renames "need code". Sentence two exceeds 25 words. «вид» meets «разновидность»; «каждому» can attach to «требований».

EN: Most kinds of node a project adds are one more sort of requirement, so their nodes need code unless declared otherwise. A kind that needs none is an exemption, so one of the specification's owners approves the rule listing it (§s-6fw72j65jkqrfpf).

RU: Узлы большинства видов, которые добавляет проект, — это тоже требования, поэтому им нужен код, если не объявлено иное. Вид узлов, которому код не нужен, — исключение, поэтому правило, которое его перечисляет, одобряет один из ответственных за спецификацию (§s-6fw72j65jkqrfpf).

DOUBT. Nothing holds the approval the reason promises. `skills/tools/src/binding.ts:251-257` compares only the kinds' names, so `needsCode` flipped to false still passes. No check requires the listing rule. Recommended: fix the tools.

DOUBT. `needsCode` is required (`specs/_schema/extension.schema.json:44`), so "unless … declares otherwise" names a default that never applies. Recommended: the extension "declares, for each of its own kinds of node, whether its nodes need code".

TERM. kind of node; [OFT] artifact type, [29148] type attribute (2011 text); partial, since a kind also sets fields (inference). The owner chose it 2026-11-10. Keep; one line of gloss in the docs.

Not verified: tools not run; no real listing rule exists, the saloon declaring no such kind; the draft holds no links; vocabularies from the registry only.

## 8.4 A node's location: not ready, three doubts

DOUBT, moved content. No key of newform.json locates a domain's header or contracts. Only review-8-10.md drafts that node. (Already owed to part 14.)

DOUBT, base specification. `locations` in `skills/tools/src/model.ts` numbers every part but the guidelines and the appendix straight through its files. The draft omits this, and a project without the extension has only this node. Restarting per file breaks "No two nodes share a location". Agreed 1.1.2 also calls the base's sections "parts", so "the part it is in" reads two ways. Suggested: "The base specification is numbered straight through its files."

DOUBT, nested nodes. The code writes the parent's place, a dot, the number. "Its number" alone gives first children one location. Suggested: "Under a numbered parent, the number follows the parent's place and a dot."

WORDING FIX (present 1.4 excluded terms from the count): "…among the numbered nodes under the same parent." / «…среди пронумерованных узлов того же родителя.»

WORDING FIX (no subject, two thoughts): "The SpecSheriff tools compute a node's location from where the node is. Nobody writes it by hand." / «Инструменты SpecSheriff вычисляют расположение узла из того, где узел находится. Вручную его никто не пишет.»

WORDING FIX, reason (restates the text, Russian participle unfolded): "A sid says nothing of where a node is, so a reader needs a location. Computed, it can never disagree with where the node is." / «Sid ничего не говорит о том, где находится узел, поэтому читателю нужно расположение. Поскольку расположение вычисляется, оно никогда не расходится с тем, где узел находится.»

TERM. location. IBM DOORS Object Number is computed, not stored (forum source, edition unstated, unverified). Same meaning (inference). The owner chose "location" on 2026-11-05. Keep it. Cost: one line of docs.

Not verified: the tests, the saloon and IBM's documentation.

## 8.3 after the owner's title and the word «тип» (2026-11-10): passes after the fixes, two doubts

The English title renders the owner's Russian. No «вид» for a node's kind remains. The fixes are applied by fix-newform-117.mjs.

WORDING FIX, 11.4 and 13.12, Russian. «в проекте, которому нужен код» makes the project need code: «нуждающегося в коде».

WORDING FIX, 6.1, Russian. Bare «тип» follows «узел собственного типа»: «никакой другой тип связи не говорит».

WORDING FIX, 8.3 text. "Its" follows "its nodes", the kind's: "That rule's `TextRule.list.declaredIn` names that extension." / «`TextRule.list.declaredIn` этого правила называет это расширение.»

DOUBT, title. It names the subject, not whether the nodes need code. On the map it reads as where kinds are added, which is 5.2. Kept: it is the owner's.

DOUBT, reason. A part's own owners replace the specification's (agreed 1.1.6), so "one of the specification's owners" is too narrow. Recommended: "one of that rule's owners".

TERM. kind of node, «тип»: the owner's ruling stands. RecordType is itself a type, so part 14 needs «тип узла» in full (inference).

Not verified: tools and tests not run, no real listing rule read, the draft holds no links.

## 8.3, the removal of the sentence standing behind a reference, and the owner's reason (2026-11-10): passes after the fixes, two doubts

DOUBT, removal. All is held elsewhere except test-first for a project's own kinds: agreed 1.4.1 says "a rule", and 13.12 holds the order only for an agent's edits. Applied as carrying over what stood behind the reference (fix-newform-118.mjs): "The test of a node that needs code is written before its code." / «Тест узла, которому нужен код, пишется раньше его кода.»

WORDING FIX, sids. No node defines "the check of lists". Applied: "At each commit, a check compares that list with that extension (§s-jau82aq9juv9zzh)." / «При каждом коммите проверка сравнивает этот список с этим расширением (§s-jau82aq9juv9zzh).»

DOUBT, reason. 14.1.1 and the terms row reserve "extension of the guidelines" for what the plugin delivers. Of the candidates: the second sentence of A walks the text's paragraphs; its first repeats 5.2's reason, so alone it grounds 5.2; both drop "code, tools or people", the node's only explanation of "need code"; "enough" covers what a project writes, but 1.3.4 still requires an owner's approval. Proposed after the owner's first sentence (inference): "Only the project knows whether such a kind's nodes are carried out by code, by tools or by people. An extension of the schema has no owner, so a rule lists those kinds." / «Только проект знает, выполняются ли узлы такого типа кодом, инструментами или людьми. У расширения схемы нет ответственных, поэтому эти типы узлов перечисляет правило.»

WORDING FIX, candidates. EN "already describe". RU «Чтобы добавить их, достаточно».

Tools step: the comment at `skills/tools/src/binding.ts:130` and its test move to s-6fw72j65jkqrfpf.

Not verified: tools and tests not run, no real listing rule read.

## 8.3 after the owner's four comments of 2026-11-10 (fix-newform-120 to 123): passes after the fixes, four doubts

The reading of «Расширение схемы и guidelines проекта» as two things is right: agreed 14.1.1 reserves "extension of the guidelines" for what the plugin delivers. The plural is needed.

WORDING FIX, sentence 1, applied by fix-newform-124.mjs. The sid backs only the extension: "A project's extension of the schema (§s-xm8rz4uupb73gu5) and the project's own guidelines declare, …" / «Расширение схемы (§s-xm8rz4uupb73gu5) и guidelines проекта объявляют…»

WORDING FIX, paragraph 2, put to the owner. "The rule holding that declaration in the project's own guidelines names the project's extension of the schema in its `TextRule.list.declaredIn`. At each commit, a check compares that rule's list of the project's own kinds of node with that extension (§s-jau82aq9juv9zzh)." / «Правило, содержащее это объявление в собственных guidelines проекта, называет расширение схемы проекта в своём `TextRule.list.declaredIn`. При каждом коммите проверка сравнивает список собственных типов узлов в этом правиле с этим расширением (§s-jau82aq9juv9zzh).»

WORDING FIX, 11.4 and 13.12, proposal: "a node of a project's own kind whose implementation is required" / «узла собственного типа в проекте, требующего имплементации». Unlisted places follow: s-6fw72j65jkqrfpf, s-jau82aq9juv9zzh, s-jgejd5rpd9d43pd, `specs/_schema/extension.schema.json:15`.

Lost with the removed sentence. "Each kind" returns through the list's object, the check requiring the same set. "Refining this one" goes: agreed 2.3 makes each such rule refine or extend one, and no tool reads which. Optional, after "guidelines": "and refining this one" / «и уточняющее это правило».

The reason fits: "a rule lists those kinds" matches paragraph 2, and "carried out" also covers tools and people.

DOUBT, "its". It can mean the project or the kind; each node is what gets implemented (`skills/tools/src/binding.ts:293`). Proposed: "whether the implementation of its nodes is required" / «требуется ли имплементация его узлов».

DOUBT, implementing node. Agreed 4.2 lets a node implement a node, and 8.3 no longer cites the definition; the tools demand a tagged symbol and a test (`binding.ts:298-302`). Proposed after sentence 1: "A kind's `needsCode` holds the extension's declaration. Implementation means code and a test carrying the node's SpecTag (§s-6fw72j65jkqrfpf)." / «`needsCode` типа узлов содержит объявление расширения. Имплементация — это код и тест с SpecTag этого узла (§s-6fw72j65jkqrfpf).» The key then stays (inference).

DOUBT, test first. Only 13.12 holds the order, for an agent's edit. 1.4.1 says "When a rule is implemented", agreed 8.2 counts these nodes as rules only for a section's minimum, and 11.4 requires a test without an order. `skills/tools/src/guard.ts:146` takes only `TextRule`, so the tools miss even 13.12. Proposal, touching agreed 1.4.1: "So it is with a node of a project's own kind whose implementation is required." / «Так же и с узлом собственного типа в проекте, требующим имплементации.»

DOUBT, two declarers. Each can hold without the other, so by 7.5 they are two thoughts, in over 25 words. They can disagree: the check compares kinds' names (`binding.ts:399`), and the tools read the extension alone (`schema.ts:37`). Recommended: the check compares the value too. To split: sentence 1 keeps "declares" for the extension, followed by "The project's own guidelines declare the same." / «Guidelines проекта объявляют то же самое.»

TERM. implementation: [OFT] needed coverage (impl, utest), partial, since 8.3 declares by kind. Node-to-node `implements` is nearer [29148] derived requirement (inference). Keep, with a gloss. «реализ…» stays.

Not verified: tools and tests not run; what the owner meant.

## 8.3 and the new 8.4 after the owner's split (2026-11-10): pass after the fixes, applied by fix-newform-126.mjs

WORDING FIX, 8.4 sentence 2: "becomes a permitted value of a node's `kind`." / «становится допустимым значением `kind` узла.»

DOUBT, 8.4 last paragraph, applied since it made the draft false: it contradicted s-6fw72j65jkqrfpf (approved nodes only, an implementing rule's SpecTag counts, exemption). It repeats that node, but the scheme needs the link.

DOUBT, `TextRule.list.property`, applied: `skills/tools/src/validate.ts:304` requires it of a list of objects. The file's path stays in the appendix, by the decision of 2026-10-27 on s-eferktypcj7njt5.

DOUBT, 8.3, applied as carrying out the owner's ruling: the sentence presupposed the project's own kinds and never declared them. Opening: "A project can create nodes of any kind it needs." / «Проект может создавать узлы любого нужного ему типа.»

DOUBT, the check, for the owner. Approving the rule holds names only, so a changed `needsCode` reaches no approval. If values are compared (`binding.ts:255` changes): "At each commit, a check compares the names and the `needsCode` values in that list with those under the extension's `kinds` (§s-jau82aq9juv9zzh)." / «При каждом коммите проверка сравнивает имена и значения `needsCode` в этом списке с теми, что записаны в `kinds` расширения (§s-jau82aq9juv9zzh).»

At the move. To 8.4: 13.12, s-6fw72j65jkqrfpf, s-nyh9yk22ba6g77q, s-jgejd5rpd9d43pd; 11.5 and 6.1 stay on 8.3. `skills/tools/test/unit/binding.test.ts:378` goes to 8.4, `model.test.ts:158` to s-kag2m9tzdnduxdx, `validate.test.ts:488` to s-pctqj9wqaq8762t.

TERM. kind of node: [OFT] artifact type, partial, since a kind also fixes a node's fields (inference). Keep, glossed in the docs.

Not verified: tools and tests not run; no real listing rule tried.
