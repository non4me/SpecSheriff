# T25, stage 2, group 7: notes on the drafts of items 51 to 56

## Agreed

The owner agreed to group 7 on 2026-11-25 with «А.», in answer to «Согласны с группой 7 и с вариантом А в обоих вопросах?», on the page https://claude.ai/artifact/23yUhC4mDqZzUhpvRsfXmn. agree-group7.mjs recorded it, after copying `tools-drafts.json` to `tools-drafts.before-agree-group7.json`. It was run twice and gave the same file both times.
- All eighteen keys that `group7-assessments.json` assesses are agreed on 2026-11-25, and each draft's `rulings` records the agreement.
- No draft of the group held a proposed decision, so the group's own decisions are the owner's two answers. The script wrote five entries in `meta.decisions`, and every sid that they cite was already linked, so it added no link.
- Q1, option A, a node with no title is labelled with its location and named by its sid and location: in `s-k4nqjr96ux7a5m7` and `s-rpv4fkdqqguptqd`.
- Q2, option A, `sheriff markdown` and `sheriff map` refuse to run without the Views extension and name it: in `new:tools-5-export`, `s-rpv4fkdqqguptqd` and `proposal:s-f5rz6b7dhxejjts-g7`. The decision also says that "The hooks", item 57, is to run the two commands only where the project has chosen the Views extension.
- The agreed draft "The commands that `sheriff` accepts" (`s-f5rz6b7dhxejjts`) no longer holds its `doubt` about the Views extension. That removal is the only change outside the group, and the script checks it.

The two questions below and the item on the Q2 answer under "Changes still needed outside the group" are therefore settled.

propose-group7.mjs wrote the drafts of group 7 into `tools-drafts.json`, after copying it to `tools-drafts.before-group7.json`. It also wrote `english-group7.md`, the English of every node of the group, for EngStickler's readers. The script was run twice and gave the same files both times, and no key outside the group differs from the copy.

After round f, the group holds eleven drafts of nodes of the appendix of the tools and seven proposals to change agreed drafts. Five of the eleven are new nodes: two split from tools 5, one for the diagram of the domains, and two split from tools 17, for the entry in the bindings file and for the validator of the RuntimeChecks. Two questions are left for the owner. Nine questions are recorded for the base specification.

## Round f: one sentence of item 53

fix-group7-f.mjs (copy `tools-drafts.before-group7-f.json`, run twice with the same result, no key outside the group changed) replaced one sentence of `s-pvzms7d8kxb8dk2` with the coordinator's: "The check of generated copies (§s-dbk2vyeg8z5jxna) refuses a list that names a file whose name has any other extension, as it refuses everything else that keeps `sheriff types` from writing any file at all." / «Проверка порождённых копий (§s-dbk2vyeg8z5jxna) отвергает список, в котором есть файл с любым другим расширением имени, как отвергает и всё остальное, из-за чего `sheriff types` не может записать вообще ни одного файла.» `english-group7f.md` holds that sentence alone; the page is rebuilt and not published, and the readers' other findings on round e are rejected by the coordinator.

## Round e: the readers' last findings applied

fix-group7-e.mjs applied the seven English replacements of fix-brief-group7-e.md, which come from EngStickler's two readers on `english-group7d.md`. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group7-e.json`, which is byte for byte the file that round d left. On every run it rebuilds the group's eighteen keys from that copy, with the checks of fix-group7-c.mjs. It was run twice and gave the same `tools-drafts.json` and the same `english-group7e.md` both times, and no key outside the group differs from the copy. `english-group7e.md` holds only the English sentences, and the rows of item 56's table, that round e changes.

Keys changed: `s-4npdup7mjkva69y`, `s-pvzms7d8kxb8dk2` and `new:tools-17-validator`.
- `s-4npdup7mjkva69y`: "with or without bounds" in the rows of `integer` and `number`, and "with or without bounds on how many members it holds" in the row of `array`, with «с границами или без них» and «с границами числа элементов или без них» in the Russian. "so in Python a `const` with any other value"; "the `required` of at least one member of the `allOf`"; "cannot express" in the reason. The Russian of these three already says what the new English says, so it is unchanged.
- `s-pvzms7d8kxb8dk2`: "reads the rule's `implements` links from the same place as the SpecSheriff tools read the `refines` links", with «читает там же, где инструменты SpecSheriff читают» in the Russian; "and each of the other things that keep `sheriff types` from writing any file", with «и всё остальное, из-за чего» in the Russian.
- `new:tools-17-validator`, the example: "and so this data record passes", with «и тогда эта запись данных проходит» in the Russian.
- Not applied, for the brief's reasons: "rejects", "elements", "yields", "latest approval" and "is written anew".

No `stage3`, `removed` passage or «Оценка» changed. `build-group7-ru.mjs` and `gen-group7-page.mjs` rebuilt `group7-page/index.html`. In a local browser, with every section open, the page opens dark and its four tables render. It does not scroll sideways at 1066 pixels (its content is 1051 pixels wide, and the tables fit) or at 390 pixels (its content is 390 pixels wide, and only the tables scroll, each within its frame). The page is not published.

## Round d: the final review applied

fix-group7-d.mjs applied review-g7c.md, english-g7c-fast.md and english-g7c-thorough.md, with the main session's decisions in fix-brief-group7-d.md. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group7-d.json`, which is byte for byte the file that round c left. On every run it rebuilds the group's eighteen keys from that copy, with the checks of fix-group7-c.mjs. It was run twice and gave the same `tools-drafts.json` and the same `english-group7d.md` both times, and no key outside the group differs from the copy. `english-group7d.md` holds only the English sentences, and the rows of item 56's table, that round d adds or changes.

Keys changed: `new:tools-17-validator`, `s-suv42g8r3ra2h6b`, `new:tools-5-export`, `s-rpv4fkdqqguptqd`, `s-pvzms7d8kxb8dk2` and `s-4npdup7mjkva69y`. No key was added, and no proposal changed.

### Review g7c

- `new:tools-17-validator`: finding 1 applied as worded. Its text says that the validator refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use, since under JSON Schema 2020-12 a validator that checks `format` may treat any format as always valid. Finding 2 applied: the example with `birthDate` and `"2026-02-30"`. By the main session's decision, finding 1 replaces the readers' fix to the text, and the thorough reader's reason stands. The `stage3` says what the project configures in the same words. Question 8 for the base specification now uses finding 1's words.
- `s-suv42g8r3ra2h6b`: finding 3 applied as worded: "A definition is built from the RecordType's own `schema`. In the definition, `properties` holds these fields and `required` lists the guaranteed ones."
- `s-pvzms7d8kxb8dk2`: finding 4 (the reason, "is a choice that concerns the whole system") and finding 5 ("a file whose name has any other extension, and any other fault that keeps `sheriff types` from writing any file") applied as worded.
- `s-4npdup7mjkva69y`: finding 6 applied as worded: "A field of that `TypedDict` is required where the `required` of any member of the `allOf` lists it." The `stage3` and the part's `change` say the same.
- The «Оценка» of the validator node is the reviewer's: согласованность ✗, since rule 12.3 does not require the check (question 8 for the base specification, which the main session has deferred), and недостаточность ✓ once finding 1 is applied. The «Оценка» of item 54 now also says that the definition's `properties` holds the fields taken through `refines`.

### The readers' findings

- The fast reader: "on every run" in `new:tools-5-export` and `s-suv42g8r3ra2h6b`; "from the same source as the SpecSheriff tools take the `refines` links" in `s-pvzms7d8kxb8dk2`; "with any bounds" and "with any bounds on how many members it holds" in item 56's table, «с любыми границами» in the Russian; "Therefore," twice in item 56's reason. The fast reader's reason for the validator is replaced by the thorough reader's.
- The thorough reader: "holds the domains row by row" and "It holds the domains of each row" in `s-rpv4fkdqqguptqd`, «содержит» in the Russian; in item 56, "the union of the types that the schema would give if each of its types in turn replaced the list" and "`Literal` can hold only", with the Russian to match; the validator's reason "accepts, as a date, a string that is not a valid date".
- Not applied, for the reasons that both reports give: findings that earlier rounds rejected for a reason that still holds, "remains", "types file", "under the value's key", the sentence of over seventy words in `proposal:s-gb8s9657a65hqmv-g7`, and every finding on a sentence that a proposal does not change.

### The page

`build-group7-ru.mjs` and `gen-group7-page.mjs` rebuilt `group7-page/index.html`. The Russian of the `stage3` notes of the validator node and of item 56 follows their new English. Two changes to the page itself:
- It now declares its viewport. Without that declaration a phone draws the local file 980 pixels wide, so its width at 390 pixels could not be checked.
- A table keeps a width of at least 640 pixels and scrolls within its own frame on a narrow screen, instead of breaking words in the middle.

In a local browser, with every section open, the page opens dark and its four tables render. The page does not scroll sideways at 1066 pixels (its content is 1051 pixels wide, and the tables fit without scrolling) or at 390 pixels (its content is 390 pixels wide, and only the tables scroll, each within its frame). The page is not published.

## Round c: the follow-up review applied

fix-group7-c.mjs applied the six reports, review-g7b-a.md to review-g7b-d.md, english-g7b-fast.md and english-g7b-thorough.md, with the main session's decisions in fix-brief-group7-c.md. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group7-c.json`, and it rebuilds the group's keys from that copy. It was run twice and gave the same `tools-drafts.json` and the same `english-group7c.md` both times; the copy is byte for byte the file that round b left, and no key outside the group differs from it. `english-group7c.md` holds the full English of every node and proposal that round c changes or adds. The new sid s-axxezge5duzemgs was generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/`, `tools-drafts.json` and every file of `.ai_docs/`; the script checks it again on every run, and `sidcheck.mjs` found every sid of `english-group7c.md` and of these notes known.

Keys changed: all seventeen keys of round b. Key added: `new:tools-17-validator` (s-axxezge5duzemgs, "The validator of the RuntimeChecks", tools 17b). Title changed: `new:tools-17-bindings-entry` is now "The entry in the bindings file for a file of RuntimeChecks". In `proposal:s-3anv9qcmx8pwp2w-g7` and `proposal:s-ezq8csd433vj6fj-g7`, only the `change` of the example changed.

### Review g7b-a: item 51 and the list of commands

- `s-k4nqjr96ux7a5m7`: finding 1 ("`sheriff guide` leaves out each node's metadata, the value of the node's `meta`") and finding 2 ("in a form of their own instead of as JSON"; "In a cell of the table of a `TextRule.list` and of a table of a `TableRule`") applied as worded, with their Russian. The fast reader's "under a heading that holds the node's location" and "Along with the node," applied in the example.
- `new:tools-5-export`: finding 3 applied: the files taken from the plugin cite s-bsya3febm6u64ab and s-zefk589ykh37b8u. The thorough reader's "In the export, a person reads the project's whole specification" opens the reason; the Russian already said that.
- `new:tools-5-show`: "prints one node to its standard output" (the fast reader). By the main session's decision on the minor point, the second paragraph ends "`sheriff show` refuses to run without an argument." The refusal is in cli.ts, which calls show.ts only with an argument.
- `proposal:s-f5rz6b7dhxejjts-g7`: finding 4 applied as worded, with `cites` links to s-m4h279nbaqkpa3t (the independent reviewer), s-hheus6f395ynqvc (the system's code), s-qyjw8xez6t6adc3 (the approved wordings), s-2fau85dfyyeq66m (a project's own check) and s-km4x4s26kv7pjze (a project's own generator). Each new citation is listed in the part's `change` and in the proposal's `change`. Finding 5 applied: «вместе с его узлом».
- Finding 6 is recorded under "Questions for the owner", Q2, and in "Changes still needed outside the group", item 12. Findings 7 and 8 are applied to Q1 and Q2 below; finding 7 is merged with review g7b-b's finding 4.

### Review g7b-b: the map and the diagram

- `s-rpv4fkdqqguptqd`: finding 1 applied as worded: the diagram is cited at its first mention. Finding 2 applied: the three sentences on the outline make a paragraph of their own, and the two sentences on what the page holds make the next paragraph. The Russian says «план» for "outline" throughout, and «структура» is left only for "structure" in the reason. Finding 3 applied: the paragraph on the branches opens with "The root of the outline, labelled `Specification`, represents no node." The thorough reader's "and `billing` uses `accounts`" applied in the example; the Russian «причём» already fits it.
- `new:tools-4-diagram`: findings 1 to 3 applied as worded, with a `cites` link to s-a4rbry4hsu34hy8. The readers' "finally" (the thorough reader) and "which is left only where" (the fast reader) applied in the last step; the Russian says «наконец».
- Finding 4 is applied to Q1 below.

### Review g7b-c: items 53 and 54, the entry in the bindings file, and three proposals

- `s-pvzms7d8kxb8dk2`: finding 1 applied: the sentence on `format` is no longer in item 53, and its `removed` field says where it went. Finding 2 applied: the new reason, with a `cites` link to s-mm2de262g3jkapu. Finding 3 applied: the rule with the list is the one that has both a `TextRule.list` and an `implements` link. The readers' "a file with any other extension" and "anything else that keeps `sheriff types` from writing" applied.
- `new:tools-17-validator` (s-axxezge5duzemgs), "The validator of the RuntimeChecks": the sentence moved unchanged, except that it cites the technical appendix (s-tj38pvm38nepaf5) at its first use in the new node, as rule 7.2.7 requires. It implements s-e877bnfa559tvk9 and is split from s-pvzms7d8kxb8dk2. Its reason is the reviewer's. It has no example: the reason already shows the failure, a date that is no date. Its `stage3` says that no code of the SpecSheriff tools carries it out, and that question 8 for the base specification decides where it finally belongs. This node is new and has not been checked by a reviewer on its own.
- `new:tools-17-bindings-entry`: finding 4 applied with the thorough reader's words: "so each RecordType's RuntimeChecks can be found starting from it, as its types can". The title is now "The entry in the bindings file for a file of RuntimeChecks" (the thorough reader). The same title, and "the entry in the bindings file", now appear in the `change`, `question` and `stage3` of `proposal:s-dbk2vyeg8z5jxna-g7`, `proposal:new-tools-1-settings-g7` and `proposal:s-vp24dqydygztqbt-g7`.
- `s-suv42g8r3ra2h6b`: finding 5 applied as worded. The fast reader's "A definition is built from the RecordType's own `schema`" and the thorough reader's "a format named `address`" applied.
- `proposal:s-vp24dqydygztqbt-g7`: finding 6 applied: the example, which is that of the agreed base, has the `change` «Как в согласованной формулировке.». The same defect was in the other proposals: the examples of `proposal:s-3anv9qcmx8pwp2w-g7`, `proposal:s-ezq8csd433vj6fj-g7` and `proposal:s-dbk2vyeg8z5jxna-g7` had no `change`, and the page would have called each of them new. The example of `proposal:s-gb8s9657a65hqmv-g7` said «Новое», although its base, `proposal:s-gb8s9657a65hqmv-g6`, already holds it. The script now marks every example copied unchanged from a proposal's base in this way. The `change` of `proposal:s-gb8s9657a65hqmv-g7` also gives item 55's title as it now reads, "A RecordType that its variants refine".

### Review g7b-d: items 55 and 56

- `s-nk8td3ez58gahc4`: F1 applied with the thorough reader's "In every other respect,", as the main session decided. F2 applied as worded; the first paragraph became two, since it would otherwise hold six sentences. The `stage3` now says that a RecordType all of whose variants are left out is written as any RecordType, and asks for a test of that case. F3 applied as a paragraph after the list of the pair. F4 opens the paragraph on the type for the combinations, whose next sentence now begins "It holds the RecordType's fields."; the `stage3` says that types.ts already writes this type right after the union. F5 applied, with a `cites` link to s-7vm323mhry2enx3. The nits applied: "so that it points to the variant's definition"; the `Other` item ends "; its name is the name of the RecordType's type followed by `Other`", in both languages; the example adds "and the second the guaranteed field `phone`". The thorough reader's "an `if` and `then` pair" applied in the text and in the example.
- The TERM point (the fields that select a variant and the discriminant of a TypeScript discriminated union) is for the docs: see "Changes still needed outside the group", item 9.
- `s-4npdup7mjkva69y`: G1 applied with its four sentences and a `cites` link to s-5z5gnu7pahr82xp. By the main session's decision on the third nit, the sentence "Such a `TypedDict` is written only if a type uses it." follows G1's first sentence. A member of an `allOf` whose fields a merged `TypedDict` holds is therefore not written, since no type uses it. G2 ("gives a `TypedDict` in Python"), G3 and G4 applied, with the readers' "gives the same type as `{}`" in all three places and "otherwise gives the same type as `{}`". The paragraph on `Literal` and `allOf` became two paragraphs: one on `Literal`, with the nit "In `Literal`, `true`, `false` and `null` are written `True`, `False` and `None`.", and one on `allOf`. G5 applied, with a `cites` link to s-7vm323mhry2enx3. The thorough reader's "stands for any value", "at the end of the field's chain of identifiers" and the fast reader's "JSON Schema is a standard with a validator in every language" applied. The `stage3` says that types.ts today names a nested `TypedDict` after the type that uses it and writes it after that type, and adds the cases of `Literal` and of a field required by any member of an `allOf`.
- The nit on item 56's title is not applied, by the main session's decision: the agreed title in `tools.json` names the type alone, and the text already says what the RuntimeCheck holds.

### The readers' findings not applied, and why

Both readers' reports list them, with the main session's reasons:
- "licence notice": the repository writes British "licence".
- "alphabetical order of their names" and "to the left of": the words of rule 11.2.3, which the owner agreed to.
- "gives" in place of "yields": the word of item 56's agreed title and its table.
- "the RecordType variants whose RecordType it is": it says exactly which variants are meant.
- "the check of an identifier followed to its end": the title of item 44, which the owner agreed to.
- "the file already uses the name, including the names that the file imports and those that its language reserves": it says what it means.
- "it names the bindings file": the owner's word for what a command reports.
- Every finding on a sentence that a proposal does not change: those sentences are agreed wordings.

### The owner's page

The page is built and not published: `group7-page/index.html`, written by gen-group7-page.mjs from `tools-drafts.json`, `group7-ru.json` (written by build-group7-ru.mjs) and `group7-assessments.json`. It is gen-group6-page.mjs adapted to group 7, with a dark background, and has eighteen sections in the order of items 51 to 56, then the seven proposals. Each section shows the node in full in English and in Russian, and each proposal stands beside the agreed wording of its base. Each rewritten node can open the approved wording that it replaces, and each split node the approved node that it comes from. Each section also shows what changed, the «Оценка» and what is bound to the node, with the Russian of its `stage3`, its `removed` passages and its todo. Three changes are added to what the page of group 6 does:
- a Markdown table, in item 56 and in the approved node it replaces, is shown as a table;
- the todo of the diagram of the domains is shown in both languages;
- an example that a proposal copies unchanged from its base is not called new.

After the nodes, the page lists the three proposals that only carry out a decision already made: the list of commands, item 44 and item 47. It ends with Q1 and Q2, each with its recommendation, options, what a person sees and costs, and with the question «Согласны с группой 7 и с вариантом А в обоих вопросах?». The page's own check found no round, no reviewer of the drafts and no report named outside the wordings, and every link within the page leads to a section of it. In a local browser, the page opens dark, the tables of item 56 are drawn as tables, the questions come last, and the page does not scroll sideways at a width of 1066 pixels; it was not looked at at a phone's width.

## Round b: the first review applied

fix-group7-b.mjs applied the six reports, review-g7-a.md to review-g7-d.md, english-g7-fast.md and english-g7-thorough.md, with the main session's decisions in fix-brief-group7-b.md. On its first run it copied `tools-drafts.json` to `tools-drafts.before-group7-b.json`, and it rebuilds the group's keys from that copy. It was run twice and gave the same file both times; no key outside the group and its new proposals differs from the copy. It wrote `english-group7b.md`, the full English of every node and proposal that round b changes or adds. The new sid s-h5rfyy9j8nnhx62 was generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/` and `tools-drafts.json`.

Keys changed: `s-k4nqjr96ux7a5m7`, `new:tools-5-export`, `new:tools-5-show`, `s-rpv4fkdqqguptqd`, `new:tools-4-diagram`, `s-pvzms7d8kxb8dk2`, `s-suv42g8r3ra2h6b` (title now "What is generated from a RecordType"), `s-nk8td3ez58gahc4` (title now "A RecordType that its variants refine"), `s-4npdup7mjkva69y`, `proposal:s-f5rz6b7dhxejjts-g7`, `proposal:s-ezq8csd433vj6fj-g7`, `proposal:s-dbk2vyeg8z5jxna-g7`. Keys added: `new:tools-17-bindings-entry` (s-h5rfyy9j8nnhx62, "The entry of the bindings file for a file of RuntimeChecks"), `proposal:new-tools-1-settings-g7` (base `proposal:new-tools-1-settings-g3`), `proposal:s-vp24dqydygztqbt-g7` (base `proposal:s-vp24dqydygztqbt`). Unchanged: `proposal:s-3anv9qcmx8pwp2w-g7` and `proposal:s-gb8s9657a65hqmv-g7`, which review g7-c and g7-d found ready.

### Review g7-a: item 51 and the list of commands

- `s-k4nqjr96ux7a5m7`: finding 1 applied as worded: a node in a cell is named in a link and in the list of gathered values by its sid and location alone. That is the recommended answer to the first question for the owner. Findings 2 (`sheriff guide` leaves out the metadata, citing s-jk8v3srrved7ram), 3 (the cell rules as a list), 4 (the reviewer's two sentences on the cells of a `TableRule`; the thorough reader's version of the same point is covered by them), 5 ("capped at the sixth level"), 6 (the reason, with "the same form") and 7 (the group heading “The specification alone”, a real heading of table 10.1, in the example) applied as worded. Finding 8 applied as the main session decided: "the node's text, and then its reason, which opens with `*Why:*`", the form that show.ts writes. Finding 9 (TERM) is under the docs below.
- `new:tools-5-export`: findings 1 (the citation of the appendix of the tools, s-a4rbry4hsu34hy8), 2 (the example with `project.json` and both extensions), 3 (the reason; the `cites` link to s-mbmnsnxenmavu3z goes) and 4 (the sentence on `md-version/_guidelines/spec.md` cut) applied. The paragraph on emptying the folder became a list of steps, as review g7-b's finding 4 asks of the same paragraph of the map, and the refusal was split into two sentences, as review g7-b's finding 3 asks of the map.
- `new:tools-5-show`: the first paragraph and the cut of the example's hypothetical sentence applied as worded.
- `proposal:s-f5rz6b7dhxejjts-g7`: by the main session's decision, the proposal adds at their first use the citations that rule 7.2.7 requires: RuntimeChecks (s-e877bnfa559tvk9) and RecordType (s-7vm323mhry2enx3) in the line on `sheriff types`; todo (s-t28j22vbdmmeqnh) in the line on `sheriff todos`; the specification's approval status (s-qzthyh7yqvfhsa2), the `strict` flag (s-q3pfzyaxvpr2zj2) and the extensions of the guidelines (s-mbmnsnxenmavu3z) in the line on `sheriff settings`; SpecTag (s-8xw4mgvpexyvw5q) in the line on `sheriff untagged`. Its `change` field lists each one. Where a term is the last words of a line, its citation joins the line's citation of its node in one parenthesis, as the line on `sheriff reindex` already holds several sids.
- The reviewer's question 1 is the second question for the owner; question 2 was not a question (the main session's decision).

### Review g7-b: the map and the diagram

- `s-rpv4fkdqqguptqd`: finding 1, by the owner's ruling of 2026-11-14 (t25-one-thought.md:1063), not as a question: the branch `Base specification` holds the contracts section first, then the domains row by row, from the top row of the diagram to its row `No level`, each row in the order of s-jzm6qw992j3bnxt. My round-a note called that ruling "the agent's own note"; that was wrong, and the section on item 52 below is corrected. Finding 2 is the first question for the owner; the draft keeps the recommended answer. Findings 3 to 8 applied as worded, with the readers' words that the report names. Finding 9: the example now shows the order of the rows, with a mistake that the alphabetical order makes.
- The readers on the map: "labelled with" for "shown by", "other top-level nodes" (the thorough reader over the fast reader's "remaining"), "In the outline, `sheriff map` writes…", "with a border", "often without network access", "visits them", the contracts section's own node named in the example ("the top-level node of the contracts section") and "holds the nodes in its cells under it" applied. The fast reader's question about "The branches are drawn alike" is answered in the text: "Apart from that border, the branch of each node is drawn in the same way, whatever the node's approval status." The fast reader's "saves to no file" is replaced by the reviewer's "writes only into the page itself", which also corrects the fact (generated.ts writes the outline into the page).
- `new:tools-4-diagram`: findings 1 to 7 applied as worded. In finding 2, the fast reader's "has a section to which a `consumes` link in the using domain's header points" fits inside the reviewer's sentence and is used, with "any other domain", the owner's phrase, in place of "each other domain", which can read as "one another". The fast reader's "the release that introduces this node" applied in the todo. The fast reader's "the smallest at the top" is moot: finding 7 cuts that item. The thorough reader's "as close to them as possible" concerned a sentence of the reason that finding 6 replaces.

### Review g7-c: items 53 and 54 and two proposals

- `s-pvzms7d8kxb8dk2`: finding 1 applied: paragraphs 7 and 8 moved into the new node `new:tools-17-bindings-entry` (s-h5rfyy9j8nnhx62), which implements s-ktfstpv8rurznrp, takes the reason's last sentence and an example of its own; item 53 keeps the first two sentences of its reason and implements only rule 12.3. Findings 2, 3, 4 (in the new node, with "a different value"), 7 (in the new node), 9 and 10 applied as worded. Finding 8: the sentence on `format` stays, without "not only as an annotation"; whether rule 12.3 requires it is question 8 for the base specification. The readers' "The extension of a listed file's name determines", "a file with any other ending", "any other defect" and "The rule in the section on the stack lists" applied; the thorough reader's "can be found from each RecordType, as its types can" is in the reason of the new node.
- Finding 5 is `proposal:new-tools-1-settings-g7`: the files of RuntimeChecks are among the files read for SpecTags, so that the agreed s-9rtrj24myzjvshu accepts their entry in the bindings file. Finding 6 is `proposal:s-vp24dqydygztqbt-g7`: "writes" becomes "generates", «записывает» becomes «порождает».
- `s-suv42g8r3ra2h6b`: findings 1 to 4 applied. Finding 1 is worded with the actor that review g7-d's 7.2.1 line asks for ("says what `sheriff types` generates for it and for each of its variants in place of, or in addition to, what this node says") and with the readers' "has RecordType variants". Finding 2: a field declared several times along the `refines` links is an `allOf` of their schemas in the definition, and has the type of the last in a type; the example shows it. The thorough reader's title "What is generated from a RecordType", "the type's RecordType", "the node on the type given by a field's schema" and "in any of these cases", and the fast reader's "changed to uppercase", "follow the `refines` links" and "visits them" applied.
- `proposal:s-dbk2vyeg8z5jxna-g7` cites the new node (s-h5rfyy9j8nnhx62) in place of item 53, with "a different value". The note on s-a8fn72xa782wvbk is under "Changes still needed outside the group".
- The reviewer's two questions are not put to the owner (the main session's decision): the first is question 8 for the base specification; the second is settled by agreeing to the entry and its check now.

### Review g7-d: items 55 and 56 and two proposals

- `s-nk8td3ez58gahc4`: findings 1 to 9 applied as worded, with the readers' "that has RecordType variants", "the combinations that have no variant", the SpecTag sentence with its verbs, "is accepted by the type" and ", so a data record". "In every other respect" became "Otherwise", since the owner's English avoids "every other". The thorough reader's own first sentence is replaced by the reviewer's finding 1. The title is "A RecordType that its variants refine". Finding 10 is in `stage3`: a variant never approved is left out, and the pairs go at the end of an existing `allOf`. Finding 11 (TERM) is under the docs.
- `s-4npdup7mjkva69y`: findings 1 to 4 applied as worded, with the readers' "at the same position", "every keyword", "the other RecordType's sid", "in the same way" and "does not recognise". Finding 5, by the main session's decision, adds rows for `const`, `oneOf` and `anyOf`, `allOf`, a list of types and an object written inline, each with "—" as the neutral type. I also added a row for `{"type": "null"}`, which TypeScript (`null`) and Python (`None`) can express and which a list of types such as `["string", "null"]` needs, as the same decision ("every schema that TypeScript and Python can express") asks. The node says that a schema that falls under no other row falls under `{}`, that Python's `Literal` holds only some values, when an `allOf` gives a `TypedDict` in Python, and how a nested `TypedDict` is named: the RecordType's type name followed by one part per step, the field's name, `Item` for a list's members, `Value` for a map's values, and a member's position for `oneOf`, `anyOf` and `allOf`, so the field `address` of `user` gives `UserAddress`. It has the RecordType's SpecTag, as the Python type of a variant's object had. Finding 6 (TERM) is under the docs.
- `proposal:s-ezq8csd433vj6fj-g7`: the shorter sentence applied as worded.

### The readers' findings not applied, and why

- The findings that both reports list under "Not applied" are not applied, for the reasons given there: agreed wordings that the proposals do not change, the words of rules 12.9 and 11.2.3, and the owner's phrases.
- No finding of this round only asked for more context around a sentence whose earlier sentences or citations already give it, so none was rejected for that reason.

## The keys

| Item | Key | Title | Implements |
|---|---|---|---|
| 51 | `s-k4nqjr96ux7a5m7` | How a node is written in Markdown | 13.1 (s-ce24ynwabt5yx8h) |
| 51 | `new:tools-5-export` (s-e3495enbc5h75c3) | Writing the human-readable export | 13.1, 10.14 (s-kh8qcd5kxgh9z3j) |
| 51 | `new:tools-5-show` (s-2dhbqy43tcm6qj2) | Printing one node | 2.1 (s-a4rbry4hsu34hy8) |
| 52 | `s-rpv4fkdqqguptqd` | Building the map | 13.2 (s-zu8ne3wq84zchc4), 10.14 |
| 52 | `new:tools-4-diagram` (s-jzm6qw992j3bnxt) | Drawing the diagram of the domains | 11.2.2 (s-4azsb49pj6sech8), 11.2.3 (s-uw9n84edf7cbe9n) |
| 53 | `s-pvzms7d8kxb8dk2` | Where the types and RuntimeChecks generated from the RecordTypes are written | 12.3 (s-e877bnfa559tvk9) |
| 53 | `new:tools-17-bindings-entry` (s-h5rfyy9j8nnhx62) | The entry in the bindings file for a file of RuntimeChecks | 12.3a (s-ktfstpv8rurznrp) |
| 53 | `new:tools-17-validator` (s-axxezge5duzemgs) | The validator of the RuntimeChecks | 12.3 |
| 54 | `s-suv42g8r3ra2h6b` | What is generated from a RecordType | 12.3, 12.3a |
| 55 | `s-nk8td3ez58gahc4` | A RecordType that its variants refine | 12.3 |
| 56 | `s-4npdup7mjkva69y` | The type that the schema of a field gives | 12.3 |
| — | `proposal:s-f5rz6b7dhxejjts-g7` | The commands that `sheriff` accepts | (base `s-f5rz6b7dhxejjts`) |
| — | `proposal:s-3anv9qcmx8pwp2w-g7` | An identifier followed to its end | (base `s-3anv9qcmx8pwp2w`) |
| — | `proposal:s-ezq8csd433vj6fj-g7` | A RecordType that refers to a RecordType outside its part of the system | (base `s-ezq8csd433vj6fj`) |
| — | `proposal:s-gb8s9657a65hqmv-g7` | What `sheriff reindex` changes in what an earlier release wrote | (base `proposal:s-gb8s9657a65hqmv-g6`) |
| — | `proposal:s-dbk2vyeg8z5jxna-g7` | Generated copies checked against their nodes | (base `s-dbk2vyeg8z5jxna`) |
| — | `proposal:new-tools-1-settings-g7` | Project-wide settings | (base `proposal:new-tools-1-settings-g3`; round b) |
| — | `proposal:s-vp24dqydygztqbt-g7` | The review of a commit | (base `proposal:s-vp24dqydygztqbt`; round b) |

The locations are tools 4 (the map), 4a (the diagram, new), 5 (writing a node in Markdown), 5a (the export, new), 5b (printing one node, new), 17 to 20 unchanged, 17a (the entry in the bindings file, new in round b) and 17b (the validator of the RuntimeChecks, new in round c). The new sids were generated with the alphabet of rule 1.2.2 and checked against `specs/`, `moved/` and `tools-drafts.json`; the script checks them again on every run. Every other sid in the drafts was checked against the same files by a script (`sidcheck.mjs` in the session's scratchpad).

## Decisions that apply to the whole group

- **No row of a table of checks.** Every node of the group describes a procedure: what a command writes or prints, or what `sheriff types` generates. None makes a check of a row, so none says "regardless of whether the specification is approved or a draft". The refusals of `sheriff markdown` and `sheriff map` in a project without the Views extension are refusals to run, not checks of a change. `moved/impl.json` needs no entry for the group.
- **Implements.** Each node implements the rule of the base or of an extension whose requirement it carries out (rule 2.2). A node that only describes a command, as `sheriff show` does, implements rule 2.1, as the agreed nodes on the list of commands and on `sheriff guide` do.
- **Renamed commands.** `sheriff export` is `sheriff markdown` and `sheriff render` is `sheriff map` in every draft, as the owner ruled on 2026-11-21. The script refuses either old name in the English of a draft.
- **X4 renames.** "A field of type `one of`" is "a field with `enum`", the gathered values are in `x-enumSource.gathered`, "required" is "guaranteed" where it means the property of a RecordType's field, and the type `variant` is gone (the owner's rulings of 2026-11-15 and 2026-11-19).
- **Citations at first use (rule 7.2.7)**: location (8.5), `TableRule` (8.6), approval status (1.3.1), ratio (6.6), `TextRule.list` (5.1), gathered values (12.9), a RecordType's `schema` (12.2), the wording of a node in a cell (1.3.5), the computation of locations (s-ygg5kpcxgzq3m7w), the Views extension (13), choosing an extension (1.7.5), the model of the specification (s-w6gybeqn2ttydqx), the Domains extension (11), a domain's header (11.1.3), a level (11.2.1), the levels that the project's own guidelines list (s-t9j29hppag2nren), the RecordType extension (12), RuntimeChecks (12.3), RecordType (12.1), RecordType variants (12.6), guaranteed (12.5), the bindings file (s-trwczfskj5zmuft), SpecTag (s-5z5gnu7pahr82xp), `refines` (6.1).
- **Words.** "refuses to run", "printed to its standard output" (as "prints to its standard output"), "points to", "is treated as", "the SpecSheriff tools", never "the tools" alone, no "carries", "stands", "counts as" or "only once". A node's title is «название» in Russian, since the same nodes speak of headings («заголовок») and of a domain's header («заголовок домена»). A row of the diagram is «линия», as rules 11.2.2 and 11.2.3 render it.
- **Kept links.** No decision of a node of the group cites a sid with `§`, so no `cites` link is kept for a decision alone. A proposal keeps every `cites` link that its agreed base keeps.

## The changes owed to group 7 by groups 1 to 6, and how they were made

- **Group 2's notes, item 9:** a RuntimeCheck written as a JSON file is bound by an entry in the bindings file, which `sheriff types` writes. Done in item 53, and `proposal:s-dbk2vyeg8z5jxna-g7` has `sheriff binding` compare that entry with what `sheriff types` writes.
- **Group 4's notes, item 36's stage 3:** the test of types.test.ts that refuses a listed file of another extension and two lists of files carries s-dbk2vyeg8z5jxna, the node that states those refusals. Recorded in item 53's `stage3`.
- **Group 5's notes, item 2:** item 56 states the forms in which a RecordType's `schema` names another RecordType: a `$ref` whose value is `#` and the RecordType's sid, and an `identifierOf` whose value is the RecordType's sid. Items 44 and 47 now cite item 56, in `proposal:s-3anv9qcmx8pwp2w-g7` and `proposal:s-ezq8csd433vj6fj-g7`, each a technical replacement. Item 56 cites s-5nf87c3e3jg9v7c for the order of the gathered values instead of restating it.
- **Group 5's notes, items 3, 10 and 15:** each is a question that only table 12.12 or the RecordType extension can settle, so each is under "Questions for the base specification". Item 15's first case does not arise in what `sheriff types` generates; see item 55 below.
- **The continuation file (2026-11-21), the paragraph on the agreed list of commands:** whether `sheriff markdown` and `sheriff map` write files only in a project that has chosen the Views extension is settled in items 51 and 52 (see below). What item 57 must say is under "Changes still needed outside the group". The two statements that the node on the export carries over from the old node went into the node of the command that each concerns: "the export writes one file for each file of the specification" into `new:tools-5-export`, and "`sheriff show` finds a node by its sid or its location" into `new:tools-5-show`. Rule 7.3.3 keeps each command in a node of its own (see item 51).
- **The continuation file (2026-11-18):** "Building the map" is to stop drawing the branches of the levels, and s-k4nqjr96ux7a5m7 is to implement 13.1 and stop restating it. Both done. The same note said the map is "to order the domains as 11.2.3 does"; item 52 settles that otherwise, as said below.
- **The inventory:** item 51's node no longer cites the dropped rules s-gqbj8849rf224qa and s-v7vd4ydrwexsgsj, and now says how a `TableRule` and the nodes in its cells are written. Item 53 no longer calls rule 12.3 "the rule on data structures". Item 54 uses "guaranteed" and drops the choice of each node about undeclared fields. Item 56 drops the rows for `one of`, `identifier of` and `variant` as neutral types of a field and names the keywords of JSON Schema 2020-12 and SpecSheriff's own vocabulary.

## The drafts

### Item 51: `s-k4nqjr96ux7a5m7` — "How a node is written in Markdown"

Split under rule 7.3.3 and the rule "A node is split within its section without asking". The old node held how a node is written, what `sheriff export` writes and what `sheriff show` prints. How a node is written is needed by three commands, and each command's own requirements can be carried out without the others'. So the sid stays with how a node is written, which the agreed node on `sheriff guide` (s-jk8v3srrved7ram) already cites for that, and the two commands each get a node of their own. The agreed list of commands is changed to cite the new nodes (`proposal:s-f5rz6b7dhxejjts-g7`).

How the questions were settled:
- **What it implements.** Rule 13.1: every value that the node's file holds, and each link with the sid, location and title of the node at its other end. The `implements` link to 10.14 went to the export, which is what is regenerated; the one to 12.9 became a `cites` link, since `sheriff reindex` writes the gathered values (s-ztseyetus7np6br) and this node only shows them.
- **The order of the parts of a node** is the one in which show.ts writes them: heading, line with the sid, kind and status, text, reason, other values, links.
- **A `TableRule`** (the inventory: "It does not say how a `TableRule` and the nodes in its cells are written"). Rule 13.1 requires every node with its links. The code writes the rows as one JSON value, in which a node in a cell has none of its links. So the table is written as a Markdown table per group, as the owner ruled on 2026-11-05 for a list of objects ("columns being a way of showing data"). A cell that holds a node holds the node's location and its text, so that the table reads as a table. Each node in a cell is then written in full after the TableRule's children, in the order of the computation of locations (s-ygg5kpcxgzq3m7w).
- **A node in a cell** is written with the heading of its column, the heading of its group and the text cells of its row, since rule 1.3.5 makes them part of its wording (the owner, 2026-11-14). The example shows the consequence for `sheriff show`.
- **Line breaks in a cell** are written as `<br>`, since a row of a Markdown table is one line and a cell of a TableRule may hold several.
- **The gathered values** are now in `x-enumSource.gathered`, possibly nested in a RecordType's `schema`; the list is headed by the JSON Pointer to the field's schema, the form that the agreed items 44 and 46b use to name a field.
- **Heading levels.** Markdown has six levels, and show.ts already stops at the sixth; the node says so.
- **The reason** was four paragraphs that followed the text, and one cited the dropped rule 1.10. It now says why one form is shared.

Stage 3: see the draft's `stage3`. In short: TableRule as tables with its cell nodes after its children; a cell node with its column, group and row's text cells, and its location alone as its heading; the gathered values of `x-enumSource.gathered` at any depth; `<br>` in cells. Tests move: “sheriff guide writes each node of the guidelines as the export does, except its metadata” to s-jk8v3srrved7ram, and “shows a node alone, without the nodes under it” to s-2dhbqy43tcm6qj2.

### Item 51: `new:tools-5-export` (s-e3495enbc5h75c3) — "Writing the human-readable export"

Location tools 5a, new. Split from s-k4nqjr96ux7a5m7.

How the questions were settled:
- **Only where the Views extension is chosen.** The agreed "Where the files are" (s-zefk589ykh37b8u) gives the paths of the map and the export only "if the project has chosen the Views extension", and rule 1.7.1 says that a project uses an extension only by its own choice. So `sheriff markdown` writes the export only there, and in any other project refuses to run and names the extension. A refusal rather than a silent run was chosen because a person who runs the command in such a project learns why nothing is written. Settled by those two agreed nodes; no question for the owner.
- **Which files.** One Markdown file for each file of the specification whose nodes the agreed model of the specification (s-w6gybeqn2ttydqx) holds. That covers the files that the repository keeps, and the SpecSheriff guidelines, the chosen extensions and the appendix of the tools that a project takes from the plugin; the code takes `spec.json` and `tools.json` from the plugin today and no extension yet. In the repository where the SpecSheriff guidelines are written, every extension file it keeps is exported. The archive is not part of the specification and is not exported, as today.
- **The path** below `md-version/`, and for a file taken from the plugin the path at which the repository where the guidelines are written keeps it, as generated.ts does.
- **Emptying the folder and its `.gitignore`.** generated.ts does both; "Where the files are" says only that git ignores the folder.

Stage 3: `export` becomes `markdown`, refuses without the Views extension, and also exports the chosen extensions. The test “exports every file of the specification to markdown, each node with its sid, text and reason” moves from s-kh8qcd5kxgh9z3j to this sid.

### Item 51: `new:tools-5-show` (s-2dhbqy43tcm6qj2) — "Printing one node"

Location tools 5b, new. Split from s-k4nqjr96ux7a5m7.

How the questions were settled:
- **What it implements.** Rule 2.1, which says that the appendix describes the toolset's commands; the agreed nodes on the list of commands and on `sheriff guide` implement it in the same way. The reason cites rule 1.2.4, "A node is read on its own".
- **Which nodes it finds.** Those of the model of the specification, nodes in cells included; the code does not find a node in a cell yet. A key that names no node is refused and named, as the code does.

Stage 3: find a node in a cell; the three tests named in `testsFrom` carry this sid.

### Item 52: `s-rpv4fkdqqguptqd` — "Building the map"

Location tools 4, title unchanged.

How the questions were settled:
- **Only where the Views extension is chosen**, as for the export, and for the same reasons.
- **The branches.** Rule 13.2 fixes the top-level branches (the guidelines, the appendix of the tools, the base specification, the technical appendix) and says that the map shows only titles and statuses of nodes, nested as in the specification. So the branches for contracts and for the levels of the domains go: a branch for a level represents no node. The levels are shown by the diagram of the domains.
- **The order of the domains on the map** (corrected in round b). On 2026-11-14 the owner agreed that "the map orders its domains by the same rule" as the diagram of the domains (t25-one-thought.md:1063); round a wrongly read that as the agent's own note. So the branch `Base specification` holds the contracts section first, then the domains row by row, from the top row of the diagram to its row `No level`, each row in the order of s-jzm6qw992j3bnxt. Rule 13.2 cannot name domains (rule 1.7.4), so the appendix states this order.
- **Nesting.** As the computation of locations nests the nodes: a domain's header holds the other top-level nodes of its folder, a TableRule the nodes in its cells, and the first top-level node of a file of the guidelines, of the appendix or of the technical appendix the file's further top-level nodes.
- **A node in a cell**, which has no title, is shown by its location. Rule 13.2 says that the map shows "only the title and the approval status of each node", which leaves such a node with nothing to show; see "Questions for the base specification".
- **The Guidelines branch** takes the extensions whose files the model holds, in the code-point order of their names, between the SpecSheriff guidelines and the project's own guidelines, the order in which `sheriff guide` prints them.
- **The reason** was three paragraphs that followed the text; it is now two sentences on why the map exists in this form. The licence notices are kept in the text.

Stage 3: `render` becomes `map` and refuses without the Views extension; outline() as the `stage3` field says. The test of s-zu8ne3wq84zchc4 on the branches is rewritten first.

### Item 52: `new:tools-4-diagram` (s-jzm6qw992j3bnxt) — "Drawing the diagram of the domains"

Location tools 4a, new. It implements rules 11.2.2 and 11.2.3 together: the order within a row cannot be applied without the rows, and the rows cannot be drawn without the order (rule 7.3.3).

How the questions were settled:
- **Which command.** The brief asks the node to state what the SpecSheriff tools must do "whichever task builds it". So the node's actor is "the SpecSheriff tools", as in the agreed s-5nf87c3e3jg9v7c, and a todo on the node records that no command draws the diagram yet. See "The diagram of the domains in the release of T25" below.
- **What "connected" means.** An arrow from each domain to each domain to a section of which a `consumes` link of its header points (rule 11.1.3; the agreement of 2026-11-14 recorded in the continuation file, "Node 12.2.3 … defines what 'connected' means").
- **Row labels.** A level is shown as its number and its name together: the owner's ruling of 2026-11-08, which took that detail out of the base for the appendix of the tools (tasks.md, T29). The row of the domains without a level is labelled `No level`.
- **Which levels have rows.** Each level that at least one header contains; rule 11.2.2 places domains in rows and requires no empty row.
- **A level outside the list.** Row 11.3.6 refuses it, but the diagram is drawn before the check, so such a domain goes into the row `No level`, as the current map does.
- **The harder cases of the order** (11.2.3 leaves them to the appendix). A domain is placed after each domain of its row that it uses, each placed in the same way first, which is the depth-first procedure of `domainOrder` in model.ts, restricted to one row and with the unlinked domains first, as 11.2.3 requires. The domains that only a cycle leaves come last in alphabetical order, since row 11.3.4 refuses a cycle anyway.
- **Alphabetical order** is defined by the code points of the names' characters, so that it is the same on every machine. Domain names are folder names, in practice lowercase.

Stage 3: model.ts domainOrder orders each row alone; the command, rows, labels and arrows come with T29 or stage 3; the two tests of s-uw9n84edf7cbe9n are rewritten for one row and carry this sid.

### Item 53: `s-pvzms7d8kxb8dk2` — "Where the types and RuntimeChecks generated from the RecordTypes are written"

Location tools 17, title unchanged.

How the questions were settled:
- **Only where the RecordType extension is chosen**, as every node of group 5 on RecordTypes opens.
- **How the rule that lists the files is found**: by its `implements` link to rule 12.3 in `specs/tech/stack.json`, as types.ts does.
- **Which wording of that rule.** The last approved one. Rule 10.15 generates the system's code from approved wordings, and where the code is written is part of what is generated; the agreed s-t9j29hppag2nren reads each rule of `project.json` the same way. The node cites that node rather than restating how links are taken. The code reads the rule as the file holds it; stage 3 changes that.
- **The refusals of the list** stay in the agreed s-dbk2vyeg8z5jxna, which this node cites.
- **The validator and `format`.** Kept from the approved node, with "annotation", the word of JSON Schema 2020-12, in place of "note". It is a requirement on the validator that the technical appendix names, which the RuntimeChecks rely on.
- **The entry in the bindings file** (group 2's item 9). A JSON file allows no comment (rule 1.5.2; the agreed s-trwczfskj5zmuft), so its SpecTags are in an entry in the bindings file; whoever writes code binds it, and `sheriff types` writes this code. The entry holds the SpecTag of each RecordType whose definition the file holds, in their order. See "Questions for the base specification" for its cost.
- **Dropped:** the sentence that `sheriff binding` reads a file of types as code, which the agreed "Project-wide settings" now states.

Stage 3: see `stage3`.

### Item 54: `s-suv42g8r3ra2h6b` — "What a RecordType generates"

Location tools 18, title unchanged.

How the questions were settled:
- **From which wording**: the last approved one, as the agreed s-a8fn72xa782wvbk says.
- **Order**: files in code-point order, nodes in the order of the computation of locations, which also takes a RecordType in a cell.
- **`$anchor`** is the RecordType's sid, as the page on RecordType and JSON Schema that the owner accepted on 2026-11-19 shows; a `$ref` points to it.
- **The file of RuntimeChecks** holds one document with `$schema` and `$defs`, as types.ts writes it.
- **Fields taken through `refines`.** A RecordType may refine several RecordTypes, such as a fragment of a format and another RecordType (rule 12.10), so the node defines the order: the links in the order listed, each linked RecordType after those it reaches, none twice. The old node assumed one chain.
- **A field declared twice** along that chain keeps its first place and takes the schema of the last declaration, the node's own schema being the most precise (`refines`, rule 6.1). Otherwise the type would hold two properties of one name, which TypeScript does not compile. No rule refuses such a field; see the base questions on rows 12.12.6 and 12.12.7 for the case of a variant.
- **A definition is the RecordType's own `schema`** with `properties` and `required` widened by the chain. Whether undeclared properties are refused is now said by the `schema` itself (`unevaluatedProperties`), so the old sentence on it goes, as the continuation file asked on 2026-11-14 for nodes 18 and 19.
- **A `$ref` that names no RecordType.** No row of table 12.12 refuses it (group 5's item 3). The type that it names has no name to generate, so the node lists it among the names that cannot be generated, which s-dbk2vyeg8z5jxna refuses; the old types.ts refused it too. This covers a file of types only; see the base questions.
- **The Python type of a variant's object** goes with the type `variant`.

Stage 3: see `stage3`.

### Item 55: `s-nk8td3ez58gahc4` — "A RecordType its variants refine"

Location tools 19, title unchanged (it is still true: the variants refine their RecordType).

How the questions were settled:
- **JSON Schema**: pairs of `if` and `then` in `allOf`, each `then` a `$ref` to the variant's definition by its anchor, as the page that the owner accepted on 2026-11-19 shows. No `oneOf` and no definition for the other combinations: a data record that matches no `if` holds only the RecordType's fields.
- **A variant's definition** holds only the fields that it adds: those that it declares and those it takes through `refines` from RecordTypes other than its RecordType and what its RecordType reaches. This covers a variant that also refines a fragment of a format (group 5's item 15, second case).
- **Which variants a RecordType has**: those whose RecordType it is, as the agreed check of variants (s-c2r9jndrjbtbsv6) determines. A RecordType `B` that refines `A` does not take `A`'s variants, since rule 12.6 makes a variant the variant of one RecordType and the agreed item 45 picks exactly one. So group 5's first case, where a variant of `A` and a variant of `B` both declare `address`, gives two separate definitions, not one data record with two `address` fields.
- **TypeScript and Python** keep the union of flat members with the member `…Other`, as the page says ("плоское размеченное объединение").
- **SpecTags** of the union and of each member, as types.ts writes them.
- **The values of a selecting field** are those that s-5nf87c3e3jg9v7c collects, as item 45 uses them.

Stage 3: see `stage3`.

### Item 56: `s-4npdup7mjkva69y` — "The type that the schema of a field gives"

Location tools 20. The title was "The type each neutral type of a field gives".

How the questions were settled:
- **The table now starts from the field's schema.** The owner ruled on 2026-11-19 that a field's type is written with the keywords of JSON Schema "with the same meaning as now". So the rows are the former neutral types, each written as its JSON Schema, and the last column keeps the neutral type's name, which the agreed migration (s-gb8s9657a65hqmv) cites this node for.
- **Which row a schema falls under**: the first whose keywords it holds; `{}` is last and so takes any other schema, which gives `unknown` and `Any`. Other keywords, such as `description`, `format` or a bound, do not change the type. A sentence says why rows that give the same type are listed apart.
- **The forms in which a RecordType's `schema` names another RecordType** (group 5's item 2): `$ref` with `#` and the sid, as the accepted page shows; `identifierOf` with the bare sid. `identifierOf` is SpecSheriff's own keyword, not a JSON Schema reference, and the specification names a node by its bare sid in links and in the gathered values. Group 5's item 7 asks stage 3 to declare `identifierOf` in the schema; its value is now known.
- **The gathered values**: each once, at its first place in `x-enumSource.gathered`, whose order s-5nf87c3e3jg9v7c sets (group 5's item 2, second point). "Each once" because two sections with the same title give a value twice under answer A of group 5, and an `enum` and a union of literals hold a value once; the old code deduplicated too.
- **The RuntimeChecks** are the field's schema as the RecordType writes it, with SpecSheriff's own keywords replaced: `x-enumSource` by `enum`, and `identifierOf` by the identifying field's schema without its `description`. moved/report.md asks for this ("must register `x-enumSource` with Ajv, or strip it, and must take the gathered values as the field's `enum`").
- **A chain of identifiers without an end** gives what `{}` gives; the check of item 44 refuses it, but `sheriff types` runs after a failed check at a commit.
- **A `$ref` of any other form** falls under `{}` and is written into the RuntimeChecks as it is; see the base questions.

Stage 3: see `stage3`.

## The proposals

Each is one complete new wording of an agreed draft, built from it by the script; each part that does not change keeps its agreed wording and the `change` "Как в согласованной формулировке.".

- **`proposal:s-f5rz6b7dhxejjts-g7`**, "The commands that `sheriff` accepts": the lines on `sheriff show` and `sheriff markdown` cite the new nodes of item 51 instead of s-k4nqjr96ux7a5m7. A technical replacement that follows the split.
- **`proposal:s-3anv9qcmx8pwp2w-g7`**, item 44: "its `identifierOf` names a RecordType" becomes "its `identifierOf` holds the sid of a RecordType", citing item 56. A technical replacement that group 5's item 2 asks for.
- **`proposal:s-ezq8csd433vj6fj-g7`**, item 47: the item on a reference through the `schema` cites item 56 for the forms of `$ref` and `identifierOf`. A technical replacement that group 5's item 2 asks for.
- **`proposal:s-gb8s9657a65hqmv-g7`**, "What `sheriff reindex` changes in what an earlier release wrote": `unknown: "refused"` becomes `unevaluatedProperties: false`, not `additionalProperties: false`, and a RecordType variant loses its `unknown`. Item 55 adds a variant's fields through `if` and `then`, which `additionalProperties` does not see, so every data record of a variant would be refused. The page that the owner accepted on 2026-11-19 maps `unknown: refused` to `unevaluatedProperties: false`, and says that a variant does not write it. The proposal also has the schema of each RecordType other than a variant hold `"type": "object"`: the RuntimeCheck is now the `schema` itself, and the earlier release generated that keyword. A defect that the group's subject brings to light (the brief's first lesson).
- **`proposal:s-dbk2vyeg8z5jxna-g7`**, "Generated copies checked against their nodes": `sheriff binding` also refuses a bindings file that lacks the entry that `sheriff types` writes for a file of RuntimeChecks, or holds another value for it. Row 10.1.39a requires that all that is generated match the approved wordings, and the entry is generated. The proposal also brings one agreed sentence into line with the owner's words: "also counts as different" becomes "is also treated as different", English only.

Added in round b:
- **`proposal:new-tools-1-settings-g7`**, "Project-wide settings": the files into which `sheriff types` writes the types and the RuntimeChecks are read for SpecTags, so that the agreed s-9rtrj24myzjvshu accepts the entry in the bindings file for a file of RuntimeChecks outside the glob patterns of code (review g7-c, finding 5).
- **`proposal:s-vp24dqydygztqbt-g7`**, "The review of a commit": the files that the review leaves out are those that `sheriff types` generates, not those that it writes, so that entries of the bindings file written by hand stay in the reviewer's view (review g7-c, finding 6).
- `proposal:s-f5rz6b7dhxejjts-g7` also adds the citations that rule 7.2.7 requires in its agreed sentences; `proposal:s-dbk2vyeg8z5jxna-g7` cites the new node on the entry in the bindings file.

## Questions for the owner

Both questions are asked on the page of group 7. The drafts assume the recommended answer to each.

### Q1. How a node that has no title is shown and named

A node in a cell of a `TableRule` has no title (rule 8.6). Rule 13.1 says that the export and `sheriff show` name the node at the other end of a link by its sid, location and title, and rule 13.2 says that the map shows each node's title. Neither says what happens with a node that has none.

**Recommendation: A**, which rests on rule 8.5: a node's location names where it is in the specification and is computed for every node, a node in a cell included (s-ygg5kpcxgzq3m7w).
- **A. By its location.** On the map such a node is labelled with its location, such as `_guidelines/spec/10.1.26`. In the export and in `sheriff show`, its heading holds its location alone, and a link or a gathered value names it by its sid and location. What a person sees: a short label that leads straight to the node; the label says nothing of what the row checks until the node is opened. Cost: none beyond the drafts; the map's branch for a table with many rows is a list of locations.
- **B. By the heading of its column and the text of its row**, as rule 8.6 says that its column and its row name it. On the map and in a link, such a node is named by, for example, “What is checked: refused”. What a person sees: in a table of checks, the same label, such as “What is checked: refused”, on every row with the same cost, so those rows cannot be told apart; in other tables, a label built from the row's text cells, often long. Cost: different nodes get the same label, so a link or a branch of the map does not show which row it leads to; the label has to be cut to a length and built from cells that change, so the same node is named differently as its row changes; a link's name and the map's label have to be defined for every kind of column.

Under either answer, rules 13.1 and 13.2 are to say it after stage 2 (question 9 for the base specification). Under B, these sentences change: in `s-k4nqjr96ux7a5m7`, the item on the heading ("or only its location where the node is in a cell…") and the paragraph "A node in a cell of a `TableRule`, which has no title, is named in a link and in the list of gathered values by its sid and location alone"; in `s-rpv4fkdqqguptqd`, the paragraph "Each node is labelled with its title…" and the example's "each labelled with its location"; and the cell of a node in a table of a `TableRule` in `s-k4nqjr96ux7a5m7` could then drop the location.

### Q2. `sheriff markdown` and `sheriff map` in a project that has not chosen the Views extension

The agreed list of commands records this as open. "Where the files are" and rule 1.7.1 settle only that nothing is written there.

**Recommendation: A**, which rests on rule 1.7.1 (a project uses an extension only by its own choice) and, by analogy, on the agreed "The chosen extensions and the installed plugin" (s-mhsb6fjsq5xn6c9). That node makes the SpecSheriff tools refuse to run where an extension that the project has chosen is missing from the plugin; it says nothing of a project that has chosen no extension.
- **A. The command refuses to run and names the Views extension.** What a person sees, running the command by hand: an error that says the project has not chosen the Views extension, and the command ends with a failure. Cost: a script that runs the command in such a project fails, so a project has to choose the extension or stop running it.
- **B. The command writes nothing, prints a notice that names the Views extension, and ends successfully.** What a person sees: the same notice, but the command reports success. Cost: a script or a person who misses the notice believes that the export or the map was written.

Once the owner answers Q2, the answer goes into the `meta.decisions` of the agreed draft "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts), the base of `proposal:s-f5rz6b7dhxejjts-g7`. The doubt about the Views extension that this draft records in its `doubt` field is then removed. The main session makes that change when the owner answers; this round does not touch the agreed draft.

Under either answer, the hooks run the two commands only where the project has chosen the Views extension (item 57). Under B, these sentences change: in `new:tools-5-export` and in `s-rpv4fkdqqguptqd`, "In any other project, it refuses to run. The refusal names the Views extension." becomes "In any other project, it writes nothing, prints that the project has not chosen the Views extension, and ends successfully."

## Questions for the base specification

For the main session to record under "Found and owed" (the owner's rule "One part at a time"). Each draft follows the base as it stands.

1. **A `$ref` that points to no RecordType** (group 5's item 3). No row of table 12.12 checks that a `$ref` within a RecordType's `schema` has the form `#<sid>` and names a RecordType. Item 54 refuses such a `$ref` at `sheriff types` and `sheriff binding` only where the stack lists a file of types; where it lists only a `.json` file, or none, the reference passes, and the RuntimeCheck then fails to compile in the project. Recommendation: a row of table 12.12, refused, for a `$ref` within a RecordType's `schema` that does not name a RecordType in the form that item 56 gives. That row would also cover a `$ref` of another form, such as `#/$defs/x`, which does not resolve once the definition stands under the `$defs` of the file of RuntimeChecks.
2. **One convention for SpecSheriff's own keywords within a `schema`** (group 5's item 10). Only `identifierOf` and `x-enumSource` stand inside a RecordType's `schema`. `identifiedBy`, `chosenBy` and `answersTo` are properties of the RecordType node beside its `schema`, like its title, so no prefix concerns them. Option A: `x-identifierOf`, OpenAPI's prefix for extensions, which keeps `x-enumSource` and changes rows 12.12.2 and 12.12.3, items 44, 47 and 56, and the migration. Option B: `enumSource`, declared through JSON Schema's `$vocabulary`, the mechanism that the accepted page names ("JSON Schema 2020-12 даёт для этого стандартный механизм — собственный словарь ($vocabulary)"); it changes the schema of the RecordType extension and the agreed s-ztseyetus7np6br, s-5nf87c3e3jg9v7c, s-dk3zfkbhc3v6xbp and s-gb8s9657a65hqmv, and items 51 and 56. Recommendation: B, since it follows JSON Schema first, as the owner's rule "A decision about a data structure is weighed against JSON Schema first" asks, and the page that the owner accepted.
3. **Rows 12.12.6 and 12.12.7 and the fields that a variant takes through `refines`** (group 5's item 15). Under item 55, a variant adds both the fields that it declares and those that it takes from a fragment of a format. Row 12.12.7 compares only the declared ones with its RecordType's fields, and row 12.12.6 counts only those. So a variant whose fragment holds a field of its RecordType's name passes, and item 54 then keeps one of the two schemas; a variant that adds fields only through a fragment is refused. Recommendation: both rows read "declares or takes through `refines` from a RecordType other than its RecordType". The first case of item 15 does not arise (see item 55).
4. **A RecordType variant whose `schema` holds `additionalProperties` or `unevaluatedProperties`.** Inside `then`, such a keyword refuses the fields of the variant's RecordType, so every data record of the variant is refused. No rule or row says that a variant leaves that to its RecordType, which the accepted page says. Recommendation: rule 12.6 says it, and a row of table 12.12 refuses such a variant.
5. **A node in a cell of a `TableRule` on the map.** Round b made this the first question for the owner (Q1); question 9 below records the change to the base that the answer calls for.
6. **The binding of a file of RuntimeChecks** (rule 1.5.2). A JSON file is bound as a whole, so the file of RuntimeChecks is bound to every RecordType that it defines. Any change to one RecordType's RuntimeCheck then changes the code of all of them, and the commit message must name every one of them (s-qqs2svksmjct753). Recommendation: let the SpecSheriff tools bind each definition of a file of RuntimeChecks that they write by a SpecTag in its `$comment`, JSON Schema's keyword for comments, so that each definition is bound on its own as a symbol is. The alternative, a file of RuntimeChecks per RecordType, would change the agreed list of files and its refusals.
7. **`"type": "object"` in a RecordType's `schema`.** The migration writes it, but nothing requires a hand-written RecordType to have it, and without it the RuntimeCheck accepts a value that is not an object. Recommendation: a row of table 12.12, or a sentence of rule 12.2, requiring it of a RecordType that is not a variant.
8. **Whether rule 12.3 requires a validator that checks `format`** (review g7-c, finding 8; added in round b; reworded in round d by review g7c, finding 1). The node "The validator of the RuntimeChecks" (s-axxezge5duzemgs) requires of the project's validator what rule 12.3 does not require, and no SpecSheriff tool carries the requirement out or checks it; rule 12.3 leaves that validator to the technical appendix. Under JSON Schema 2020-12 (Validation, §7.2.1), checking `format` is off by default, and a validator that has it on may still treat any format as always valid. A schema can demand the check only through the format-assertion vocabulary in a meta-schema of its own. Recommendation: a sentence of rule 12.3 that the JSON Schema validator that the technical appendix names for the RuntimeChecks refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use. Until then, the node "The validator of the RuntimeChecks", which round c moved out of item 53, holds that requirement in these words; the answer to this question decides where that node finally belongs.
9. **Rules 13.1 and 13.2 and a node that has no title** (added in round b). Whatever the owner answers to Q1, rule 13.1 (what the export shows of the node at the other end of a link) and rule 13.2 (what the map shows of each node) are to say how a node in a cell of a `TableRule` is shown and named, after stage 2.

## The diagram of the domains in the release of T25

- **Today**, no command of the SpecSheriff tools draws the diagram. Only the owner's personal viewer, `.claude/vt/viewer/` (serve.mjs and page.html), outside git and outside the plugin, draws one. As the continuation file records (2026-11-14), it places a domain without a level in the top row and orders the domains by name alone. `domainOrder` in model.ts orders all the domains in one sequence by every `consumes` link, and the map uses it today.
- **What the release lacks** to carry out rules 11.2.2 and 11.2.3: a command in the plugin that draws the diagram, with a row for each level labelled by its number and name, the row `No level`, an arrow for each use, and the order of item 52 within each row; that command in the agreed list of commands (s-f5rz6b7dhxejjts) and, if it writes a file, a row of "Where the files are"; `domainOrder` changed to order one row; and tests for all of it. The continuation file already says (2026-11-14) that "the result of T29 must ship in the same release as these nodes"; the rule "A release carries out every rule it contains" requires it. The todo on the node records it in the specification.

## Changes still needed outside the group

1. **"The hooks" (s-477gtdrkw34dzxw), item 57:**
   - The hooks run `sheriff markdown` and `sheriff map`, not `sheriff export` and `sheriff render`, and run them only where the project has chosen the Views extension. Elsewhere both commands refuse to run (items 51 and 52), and the hooks would report that refusal after every edit.
   - After an edit and at a commit, the hooks are to run `sheriff markdown` and `sheriff map` as they now run the old commands; a failure to write them still stops nothing.
   - Whether the hooks redraw the diagram of the domains after an edit is to be settled with the command that draws it (T29).
   - `sheriff types` now also writes `sheriff.bindings.json` (item 53). The pre-commit hook copies each file that `sheriff types` writes into the working tree and stages none, so the bindings file is among them; `proposal:s-dbk2vyeg8z5jxna-g7` refuses a commit whose entry lags, so the developer stages it.
2. **The schema in moved/** (not a node; for stage 3): `extensions/recordtype.schema.json` is to declare `identifierOf`, whose value is a sid (item 56; group 5's item 7). The `$comment` of `schema` says "whether its value is guaranteed (required)", which still holds.
3. **This repository and the saloon, stage 3:** a project keeps the export and the map only where it has chosen the Views extension, so `sheriff.config.json` of this repository is to choose it, by an owner's entry; the owner's manual run in the continuation file (`$S export` and `$S render`) becomes `$S markdown` and `$S map`. In this repository, every extension file it keeps is exported and mapped, through the model of the specification.
4. **The agreed "The review of a commit" (s-vp24dqydygztqbt):** done in round b by `proposal:s-vp24dqydygztqbt-g7` ("generates" in place of "writes"). The agreed "Project-wide settings" is changed by `proposal:new-tools-1-settings-g7`, so that the entry in the bindings file for a file of RuntimeChecks is accepted.
4a. **The agreed "What `sheriff types` generates" (s-a8fn72xa782wvbk), for "Found and owed"** (review g7-c): read literally, "If any of the following is true, `sheriff types` names each refusal and writes no file: the check of generated copies against the nodes refuses anything that `sheriff types` would write" would keep `sheriff types` from writing a missing entry in the bindings file, as it already keeps it from rewriting a file that differs. It is to say that a refusal for a copy that differs or is missing does not stop `sheriff types` from writing that copy, the next time that node changes.
5. **The agreed "The commands that `sheriff` accepts":** when the command that draws the diagram is added, it is to be listed there (see the todo on s-jzm6qw992j3bnxt).
6. **The docs and the skills, stage 3:** `sheriff export` and `sheriff render` are renamed wherever named (the continuation file already records this); the guide of the plugin says that the export and the map need the Views extension.
7. **The page of group 7:** built in round c (see "Round c: the follow-up review applied", "The owner's page"); it is to be looked at in a browser and published by the main session.
8. **`.ai_docs/INDEX.md`:** the brief forbade touching it. The main session still has to add rows for `propose-group7.mjs`, `group7-notes.md`, `english-group7.md`, `tools-drafts.before-group7.json` and `briefs/t25-group7-brief.md`, and, for round b, `fix-group7-b.mjs`, `english-group7b.md` and `tools-drafts.before-group7-b.json`, and, for round c, `fix-group7-c.mjs`, `english-group7c.md`, `tools-drafts.before-group7-c.json`, `build-group7-ru.mjs`, `group7-ru.json`, `group7-assessments.json`, `gen-group7-page.mjs` and `group7-page/index.html`, and, for round d, `fix-group7-d.mjs`, `english-group7d.md` and `tools-drafts.before-group7-d.json`, and, for round e, `fix-group7-e.mjs`, `english-group7e.md` and `tools-drafts.before-group7-e.json`.
9. **The docs (TERM notes, no node changes):** the human-readable export corresponds to a generated documentation site, and fits ISO/IEC/IEEE 42010's "view" only in part (review g7-a); the diagram of the domains to a layered (Sugiyama-style) dependency diagram, whose in-row ordering heuristic is here a depth-first placement; `x-enumSource` and `identifierOf` to a JSON Schema vocabulary; the union of flat types to TypeScript's discriminated union, fully with one selecting field and in part with several (review g7-d), and the fields that select a variant to that union's discriminant (review g7b-d); a `$ref` of `#` and a sid to JSON Schema 2020-12's plain-name `$anchor`, which must start with a letter, as a sid does (review g7-d).
10. **Round b, the hooks (item 57):** unchanged by round b, apart from the second question for the owner: under either answer, the hooks run `sheriff markdown` and `sheriff map` only where the project has chosen the Views extension.
11. **Round b, the saloon:** its code glob is `src/**/*.ts` and its stack lists `src/generated/checks.json` (review g7-c); with `proposal:new-tools-1-settings-g7`, the SpecSheriff tools read that file for SpecTags, and its entry in the bindings file is accepted.
12. **The agreed "The commands that `sheriff` accepts" (s-f5rz6b7dhxejjts), once the owner answers Q2** (review g7b-a, finding 6): the answer goes into the `meta.decisions` of that agreed draft, and its `doubt` field, the doubt about the Views extension, is removed. The main session records this in the continuation file and makes the change when the owner answers.
13. **The new node "The validator of the RuntimeChecks" (s-axxezge5duzemgs)**: the final review (review-g7c.md) checked it in round d and found every checklist line ✓. Its text and example now are the reviewer's, and its reason is the thorough reader's. Its «Оценка» keeps согласованность ✗ until question 8 for the base specification is answered.

## What was not touched

Nothing under `specs/`; no node outside the group, in `specs/` or in the drafts, except through the seven proposals; `.ai_docs/INDEX.md`, `tasks.md` and `t25-one-thought.md`.
