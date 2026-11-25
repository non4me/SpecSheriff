# T25, stage 1: the new files of the SpecSheriff guidelines, built from the agreed drafts

Built by `build-moved.mjs` on 2026-11-20. Nothing under `specs/` or `skills/` was changed.

## What was built

- `moved/specs/_guidelines/spec.json`: the present root section s-fca9eumq4jabf6n with sections 1 to 10 under it.
- `moved/specs/_guidelines/extensions/domains.json` (section 11), `recordtype.json` (section 12), `views.json` (section 13).
- `moved/specs/_schema/`: `node.schema.json` (the schema of the guidelines), `section-file.schema.json`, `archive-file.schema.json`, `extension.schema.json` (the format of an extension of the schema), and `extensions/domains.schema.json` and `extensions/recordtype.schema.json`. These files are written by hand; the build validates them and the files against them (see "Third pass").
- `moved/new-sids.json`: 99 sids assigned (location → sid).
- `moved/agreed.json`: 202 nodes (sid → date agreed).
- `moved/impl.json`: 70 nodes in cells (sid → sids of the appendix of the tools).
- `moved/present-bindings.json`: 26 kept nodes whose present `meta.code` or `meta.tests` was dropped.
- `moved/specs/_archive/guidelines.json`: the 11 present rules the output drops, each with its `archived` field.
- `moved/untranslated-todos.json` is no longer written: every Russian todo now has its English translation, taken from `todos-en.json`.

Counts, by file:

- spec: 23 sections, 101 TextRules, 2 TableRules, 53 nodes in cells
- domains: 3 sections, 8 TextRules, 1 TableRules, 6 nodes in cells
- recordtype: 1 sections, 12 TextRules, 1 TableRules, 16 nodes in cells
- views: 1 sections, 2 TextRules, 0 TableRules, 0 nodes in cells

In all: 230 nodes, the root included; 127 rules outside cells (130 drafts, of which draft 10.1 is not used); 75 nodes in cells (70 checks, 5 rules of 7.2.4). 63 checks have no reason of their own, as their rows have none.

## Decisions

- Each node is written with its keys in the order the present files use: location, sid, kind, title, status, text, refs, reason, examples, list, columns, groups, meta, children.
- Rule 7.2.4 is written as a `TableRule`, as 8.6 (s-5fewsp22mmdz7y6) and 7.5.3 (s-8bf287g7xtvytjz) require of a rule with a node in a cell. Its draft's table becomes its `columns` and one group headed null. The column keys are chosen: Principle → `principle`, Rule → `rule` (holds nodes), A typical case → `typicalCase`, The mistake closest to that case → `closestMistake`; each heading is the English one. A text cell holds the English text of its draft cell, and a node cell holds the node built from draft 7.2.4.N, without its title.
- Sections are written with `refs` [] and status "draft", and with the text that `section-purposes.json` gives under the section's number. The root keeps its present text. Only section 1 keeps a present sid; every other section and subsection has a new one.
- A section's location follows the same pattern as a rule's: `_guidelines/spec/7.2`, `_guidelines/extensions/domains/11`, `_guidelines/extensions/domains/11.1`.
- Rows of the structure in groups without a number (the rows 7.2.5 to 7.2.7, the row 11.3) are placed by their number: each node stands in the section its number names, in the order the structure lists them.
- Citations are read, as 6.3 (s-cxtt6jvhqcey2k9) says and as the present tools do, from every property of a node except its links, the nodes under it, `sections` and `gathered`. So `title` and `meta` count as well as text, reason, examples and list. A citation in a text cell of a TableRule (the "On failure" cells and the text cells of 7.2.4) belongs to the TableRule, since the cell is a property of the TableRule, not of the node in the next cell. The column head's note says the cost is part of the check's wording, so the owner may want those links on the check instead.
- The present outgoing links that are not `cites` are carried over for every node that keeps a present sid, except those from the base to an extension (see "Second pass"). This gives table 10.1 (s-jau82aq9juv9zzh, present 5.1) the present 5.1's `implements` links to the rules of the base it checked, beside the `checks` links of its rows.
- A decision from a draft or a row is appended with `type` "textual". Types found: scope 11, (none) 11, wording 1.
- A todo of a row that is a string becomes `{date: "2026-11-20", by: "agent", text}`. A todo that is already an object keeps its own date and `by`.
- The schema's choices are listed under "Third pass".
- The root section s-fca9eumq4jabf6n keeps its sid, title, text and refs; its status is written "draft", as the reindex derives it from the draft nodes under it.
- Section 1 "The foundations" keeps the sid s-5z5setyh8putqph of present section 1, which has the same number and title, and its `meta`; its text is written "" for now.
- row 10.1.19: its todo already carries date 2026-11-13 and by "the owner", which are kept rather than replaced by 2026-11-20 and "agent".
- Draft 10.1 (an old text form of the main table of checks) is not used; the TableRule comes from table-10-1.json.
- Draft 8.6, which no row of the structure lists, is placed in section 8 in number order, last.

Fields taken from the present nodes ("=X.Y") and sids kept from another location:

- 1.4.1: `title` taken from present 3.4 ("The test comes before the code")
- 11.1.3: `title` taken from present 1.38 ("A domain's specification opens with its header")

Titles of the nodes in the cells of 7.2.4, left out as 8.6 requires:

- 7.2.4.1: its title "Coined names" is left out; the "Principle" cell of its row reads the same
- 7.2.4.2: its title "What a name says" is left out; the "Principle" cell of its row reads the same
- 7.2.4.3: its title "A general word in a name" is left out; the "Principle" cell of its row reads the same
- 7.2.4.4: its title "Properties" is left out; the "Principle" cell of its row reads the same
- 7.2.4.5: its title "Relations to other entities" is left out; the "Principle" cell of its row reads the same

## Second pass

### The drafts the owner changed

- 1.3.2: its wording no longer cites s-xhcmchcngykvn2k; it cites 1.6.1 (s-m4h279nbaqkpa3t).
- 1.3.3: its wording no longer cites s-xhcmchcngykvn2k; it cites 1.6.1 (s-m4h279nbaqkpa3t).
- 1.6.1: its wording no longer cites s-xhcmchcngykvn2k.
- 7.2.7: cites SpecTag (s-8xw4mgvpexyvw5q), and no longer cites RecordType (s-7vm323mhry2enx3).

### Links from the base into an extension (rule 1.7.3, s-chk5hnzmcpeqj25)

Every link that a node of spec.json would carry over from its present node to a node of an extension file is dropped. Dropped (6):

- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-xfu2gpzddjnmgks, _guidelines/extensions/recordtype/12.7 "One source for the values of a field with `enum`", in the recordtype extension
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-z3dnru6qqdf9m6j, _guidelines/extensions/recordtype/12.6 "RecordType variants", in the recordtype extension
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-7vm323mhry2enx3, _guidelines/extensions/recordtype/12.1 "RecordType", in the recordtype extension
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-e877bnfa559tvk9, _guidelines/extensions/recordtype/12.3 "Types and RuntimeChecks are generated from the RecordTypes", in the recordtype extension
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-mt6auv3jz8m5gzh, _guidelines/extensions/recordtype/12.8 "Sids of the nodes of a project's own kind as a field's values", in the recordtype extension
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh, "The main table of checks"): the present `implements` link to s-ju5vcanbjph7mgh, _guidelines/extensions/recordtype/12.9 "Gathered values are written beside their field", in the recordtype extension

In `meta`, a citation `§s-…` is written bare, as `s-…`, where a node of spec.json cites a node of an extension, where a node of one extension cites a node of another (rule 1.7.4, s-kujguh6ceu8pfwq), or where the cited node is no longer in the output. A citation of a node of tools.json or project.json keeps its `§`, since those nodes stay. This was done in every text of `meta`: decisions, todos and comments (5):

- _guidelines/spec/1.3.5: §s-ju5vcanbjph7mgh in its meta.decisions.ruling names _guidelines/extensions/recordtype/12.9, a node of the recordtype extension, from the base of the guidelines; written bare, as s-ju5vcanbjph7mgh
- _guidelines/spec/10.1: §s-xfu2gpzddjnmgks in its meta.decisions.problem names _guidelines/extensions/recordtype/12.7, a node of the recordtype extension, from the base of the guidelines; written bare, as s-xfu2gpzddjnmgks
- _guidelines/spec/10.1: §s-5yvpn4zhuqmv5bq in its meta.decisions.ruling names a node no longer in the output (present 1.39 "A domain uses another domain's RecordTypes only from the sections it declares"); written bare, as s-5yvpn4zhuqmv5bq
- _guidelines/spec/10.1: §s-5yvpn4zhuqmv5bq in its meta.decisions.ruling names a node no longer in the output (present 1.39 "A domain uses another domain's RecordTypes only from the sections it declares"); written bare, as s-5yvpn4zhuqmv5bq
- _guidelines/extensions/recordtype/12.6: §s-xfwuvd3funutmsw in its meta.decisions.ruling names a node no longer in the output (present 1.32 "Where a value is declared"); written bare, as s-xfwuvd3funutmsw

### Decisions merged from decisions-out-1.json to decisions-out-4.json

333 decisions are appended to 161 nodes, after the decisions each node already held (those of its present node, then those of its draft or row). Their `type` is kept as the files give it. A decision with the same date, problem and ruling as one the node already holds would be a repeat: there is none. Decisions of the same date that share more than half of their words with one the node already holds are kept, and listed here so that they can be compared: 

- "row 11.3.2 of table-11-3", 2026-11-18: the node holds "Whether every domain's header carries an index of sections."; the file adds "One approved row required both that every domain has a header and that the header's index is what the domain's sections produce. Each requirement can hold without the other."
- "row 11.3.2 of table-11-3", 2026-11-18: the node holds "Whether every domain's header carries an index of sections."; the file adds "Whether the requirement that a domain with sections carries their index is stated in this row or in the rule on a domain's header."

- The 2 decisions under "row (unnumbered) of table-10-1" are written on both rows without a number of their own, 10.1.39a and 10.1.39b, since the key holds the decisions for both.

Locations named in these decisions, and in the decisions of the drafts and the rows, are replaced by the node's title in double quotation marks and its bare sid in parentheses. A node in a cell has no title, so its first eight words stand in quotation marks, followed by "…", with any `§` before a sid in them left out. The same form is kept inside parentheses, as in `("Independence of extensions" (s-…))`. A number is replaced where it is a location of the output and not of the present spec.json. A number that is a location of both is replaced only where the words around it fit only the output's node; it is left otherwise.

Replaced (27):

- _guidelines/spec/1.3.3, the decision of 2026-11-20, its ruling: "1.3.6" → "What an agent approves on an owner's behalf" (s-t5uw8zfxzhfdg86)
- _guidelines/spec/2.6, the decision of 2026-11-21, its ruling: "10.1.11" → "A removed node that has ever been approved…" (s-qb79dcw694x2h63)
- _guidelines/spec/9.2, the decision of 2026-11-20, its problem: "10.1.41" → "An approved rule that the system's code (s-hheus6f395ynqvc)…" (s-c4y63t285gg7jz7)
- _guidelines/spec/9.2, the decision of 2026-11-20, its ruling: "10.1.41" → "An approved rule that the system's code (s-hheus6f395ynqvc)…" (s-c4y63t285gg7jz7)
- _guidelines/spec/10.2, the decision of 2026-11-20, its ruling: "1.6.1" → "What the checks enforce, and when they run" (s-m4h279nbaqkpa3t)
- _guidelines/spec/10.2, the decision of 2026-11-20, its ruling: "10.2" → "When the checks run" (s-epaw9sgyaajzn8g)
- _guidelines/spec/10.2, the decision of 2026-11-20, its problem: "10.6" → "The specification's approval status" (s-qzthyh7yqvfhsa2)
- _guidelines/spec/10.2, the decision of 2026-11-20, its ruling: "10.2" → "When the checks run" (s-epaw9sgyaajzn8g)
- _guidelines/spec/10.2, the decision of 2026-11-20, its ruling: "10.6" → "The specification's approval status" (s-qzthyh7yqvfhsa2)
- _guidelines/spec/10.2, the decision of 2026-11-17, its ruling: "1.6.1" → "What the checks enforce, and when they run" (s-m4h279nbaqkpa3t)
- _guidelines/spec/10.2, the decision of 2026-11-18, its problem: "10.9" → "A project's own code generators" (s-km4x4s26kv7pjze)
- _guidelines/spec/10.2, the decision of 2026-11-18, its ruling: "1.7.7" → "The table of checks of an extension" (s-gpzs5fcxvp6jkrp)
- _guidelines/spec/10.5, the decision of 2026-11-20, its ruling: "1.6.1" → "What the checks enforce, and when they run" (s-m4h279nbaqkpa3t)
- _guidelines/extensions/domains/11.2.2, the decision of 2026-11-14, its problem: "11.2.3" → "The order of the domains at the same level" (s-uw9n84edf7cbe9n)
- _guidelines/extensions/domains/11.2.2, the decision of 2026-11-14, its ruling: "11.2.3" → "The order of the domains at the same level" (s-uw9n84edf7cbe9n)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-19, its problem: "12.1" → "RecordType" (s-7vm323mhry2enx3)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-19, its problem: "12.4" → "Data records conform to their RecordType" (s-wxcmpbvy9bzkfj9)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-19, its problem: "12.5" → "Guaranteed fields" (s-adhmw4gw6y82f44)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-19, its problem: "12.10" → "What a RecordType may refer to" (s-8ht2hn88cu2qwz9)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-19, its problem: "1.7.4" → "Independence of extensions" (s-kujguh6ceu8pfwq)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-09, its problem: "3.2" → "A term is defined once, in the contracts section" (s-ypa92gpcj3f5zj8)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-09, its problem: "3.3" → "What a term states" (s-khqsmy6mhejkrhg)
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-18, its ruling: "1.7.4" → "Independence of extensions" (s-kujguh6ceu8pfwq)
- _guidelines/extensions/recordtype/12.3a, the decision of 2026-11-21, its problem: "10.1.26" → "The system's implementing code (s-hheus6f395ynqvc) is bound by…" (s-k6dzuajejrw4cej)
- _guidelines/extensions/recordtype/12.6, the decision of 2026-11-18, its ruling: "1.7.4" → "Independence of extensions" (s-kujguh6ceu8pfwq)
- _guidelines/extensions/recordtype/12.7, the decision of 2026-11-18, its ruling: "12.11" → "Names of the parts of the base specification as a field's values" (s-gqavjzcmubg5pvk)
- _guidelines/extensions/recordtype/12.11, the decision of 2026-11-18, its problem: "1.7.4" → "Independence of extensions" (s-kujguh6ceu8pfwq)

Replaced by the words around them, though both numberings have the number:

- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-09, its problem: "3.2" is a location both of the output and of the present spec.json ("Code changes only as a consequence of the specification"). The words around it, "…once" repeated what the rules on terms (3.2 and 3.3) say, apart from two sentenc…", match only the output's node, so it is replaced.
- _guidelines/extensions/recordtype/12.1, the decision of 2026-11-09, its problem: "3.3" is a location both of the output and of the present spec.json ("Three records, each answering a different question"). The words around it, "…peated what the rules on terms (3.2 and 3.3) say, apart from two sentences that …", match only the output's node, so it is replaced.

Left as they are, and to be resolved by hand (0):

None.

### The archive

The archive is `moved/specs/_archive/guidelines.json`, `{schemaVersion: 1, scope: "_guidelines", section: "guidelines", nodes}`. The scope is the part the nodes come from; the section is the file's name, as in the tools' own tests of the archive. Each node is the present node with `archived: {date: "2026-11-20", reason, replacedBy}` added after its other keys, and with two things taken away. Its `sid` is dropped, since rule 2.6 (s-f2b5zvc565s242f) says that an archived node has no sid of its own. Its incoming links are dropped, since rule 6.4 (s-bpdqd9v72wg7vsz) says that an archived node holds no link pointing at it. Its outgoing links and its `meta` are kept. The archive file is validated against `archive-file.schema.json` (see "Third pass"). The sids in the headings below are the present nodes' sids, named here only so that each node can be found; the archive does not hold them.

The evidence comes from the drafts' `from` and `changes`, from the structure page and from the continuation file `.ai_docs/t25-one-thought.md`, which records the owner's rulings. No draft has a dropped rule as its `from`.

#### Present 1.10 "A decision lives on the rule it settled" (s-gqbj8849rf224qa)

- Replaced by: _guidelines/spec/1.2.4 "Everything that bears on a node is kept in that node" (s-x4zcbk5ekebd9ua).
- Reason written: "The owner removed the rule, since it repeated the rule that everything bearing on a node is kept in that node, and the schema."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 1. Outgoing links kept: 0.
- Evidence: t25-one-thought.md: "9.1, "A decision lives on the rule it settled" (current 1.10, s-gqbj8849rf224qa), is deleted on the owner's instruction since it repeated 1.2.4 and the schema … the reason of tools 5 (s-k4nqjr96ux7a5m7, with its citations) are retargeted to s-x4zcbk5ekebd9ua on the owner's behalf".
- Evidence: Draft 1.2.4 (s-x4zcbk5ekebd9ua) states the content: the decisions taken on a node are kept in that node, and none of it is kept in a separate document.

#### Present 1.15 "A member of `TextRule.list` may be an object" (s-v7vd4ydrwexsgsj)

- Replaced by: _guidelines/spec/5.1 "The structure of the specification is defined by its machine-readable schema" (s-eferktypcj7njt5).
- Reason written: "The owner removed the rule, since it only restated the schema."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 4. Outgoing links kept: 1.
- Evidence: t25-one-thought.md: "Former 8.6, A member of `TextRule.list` may be an object (current 1.15, s-v7vd4ydrwexsgsj), is deleted on the owner's instruction, since "it only restates the schema" …; at the move it goes to the archive with that reason, replaced by 5.1 (s-eferktypcj7njt5)".

#### Present 1.18 "The base specification holds no figure of one instance" (s-9hfbxv5pfnsh4kc)

- Replaced by: _guidelines/spec/1.1.4 "What the base specification states" (s-5x737t9nee4zgaa).
- Reason written: "The owner removed the rule as a duplicate of the rules on what the base specification states and on what the technical appendix describes."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 0. Outgoing links kept: 2.
- Evidence: t25-one-thought.md: "The former 4.4 (current 1.18, "no figure of one instance") is deleted by the owner as a duplicate of 1.1.4 and 1.1.5; at the move it goes to the archive, with s-5x737t9nee4zgaa as its replacement."

#### Present 1.28 "The list of a field's values in contracts may consolidate values from different domains" (s-96df5fcfqsvex9d)

- Replaced by: none named, so `replacedBy` is left out.
- Reason written: "The owner removed the values that the domains add to a field as a source of the field's values, since the contracts section now holds only fragments of a format, which refer only to other fragments."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 2. Outgoing links kept: 4.
- Evidence: Changes of draft 12.7: the source "values that the domains add" is removed by the owner's decision of 16 November, since the contracts section holds only fragments of a format; "with it go 12.14 and 12.15 (the present 1.28 and 1.29)".
- Evidence: t25-one-thought.md: "The owner's agreement to 12.7 covered the removal of 12.14 and 12.15 (the existing 1.28 and 1.29)". No replacement is named.

#### Present 1.29 "How a domain's added values find their field" (s-gzfq3x8hesj227e)

- Replaced by: none named, so `replacedBy` is left out.
- Reason written: "The owner removed the values that the domains add to a field as a source of the field's values, since the contracts section now holds only fragments of a format, which refer only to other fragments."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 2. Outgoing links kept: 1.
- Evidence: The same evidence as for 1.28: the changes of draft 12.7 and t25-one-thought.md remove 1.28 and 1.29 together. No replacement is named.

#### Present 1.32 "Where a value is declared" (s-xfwuvd3funutmsw)

- Replaced by: _guidelines/extensions/recordtype/12.7 "One source for the values of a field with `enum`" (s-xfu2gpzddjnmgks).
- Reason written: "The owner removed the rule, since the values of a field now come from the field's own list, declared with the field, or are read from the specification."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 3. Outgoing links kept: 2.
- Evidence: The coordinator's instruction of the third pass names 12.7 (s-xfu2gpzddjnmgks).
- Evidence: t25-one-thought.md: "The owner agreed on 2026-11-18 («ок») to remove 12.9 (the existing 1.32)", after the agent noted that "under the agreed 12.7 the values come from the field's own list, which is declared with the field, or from the names of the parts … or the sids of the nodes of a project's own kind, which are read from the specification".

#### Present 1.37 "An entity is declared once" (s-ce9wbaut6edfuy8)

- Replaced by: _guidelines/extensions/recordtype/12.1 "RecordType" (s-7vm323mhry2enx3).
- Reason written: "The owner found the rule a duplicate of the rules on terms. Its two remaining statements and its reason moved to the rule on RecordType."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 1. Outgoing links kept: 1.
- Evidence: t25-one-thought.md: "the owner found the node on entities (current 1.37, sid s-ce9wbaut6edfuy8) a duplicate of 3.2 and 3.3; its two statements and its reason were moved here. At the move into spec.json: 1.37 goes to the archive, with s-7vm323mhry2enx3 as its replacement, joined to it by a supersedes link".
- Evidence: Changes of draft 12.1: "the node «An entity is declared once» (the present 1.37) duplicated 3.2 and 3.3 and is removed; its two sentences … and its reason are moved here"; "the present 1.37 goes to the archive, naming this node as its replacement".

#### Present 1.39 "A domain uses another domain's RecordTypes only from the sections it declares" (s-5yvpn4zhuqmv5bq)

- Replaced by: _guidelines/extensions/recordtype/12.10 "What a RecordType may refer to" (s-8ht2hn88cu2qwz9).
- Reason written: "The owner ruled that a RecordType of one domain does not name a RecordType of another domain, so the rule on naming such RecordTypes through the sections a domain's header declares was removed."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 2. Outgoing links kept: 4.
- Evidence: t25-one-thought.md: "node 1.39 is moved to the archive with the reason for its removal and with node 12.3.5 as its replacement … Node 12.3.5 takes the place of 1.39"; 12.3.5 was then the node now numbered 12.10, "What a RecordType may refer to".
- Evidence: Changes of draft 12.10 (s-8ht2hn88cu2qwz9): "It stands in the place of the present 1.39, which goes to the archive. At the move, the archive entry of 1.39 names this node as its replacement." The structure page says the same of row 12.10.
- Evidence: Against it: an older note in the changes of draft 12.1 says that 1.39 goes to the archive naming 12.1 as its replacement, when 12.1 held 1.39's paragraphs. The agreed 12.1 no longer holds them.

#### Present 5.3 "Tests at a push while the specification is a draft" (s-xhcmchcngykvn2k)

- Replaced by: _guidelines/spec/1.6.1 "What the checks enforce, and when they run" (s-m4h279nbaqkpa3t).
- Reason written: "The rule moved into the rule on what the checks enforce and when they run, which now says that no test has to pass while the specification is a draft."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 3. Outgoing links kept: 1.
- Evidence: The coordinator's instruction names 1.6.1 (s-m4h279nbaqkpa3t).
- Evidence: Changes of drafts 1.3.2 and 1.3.3: the citation of the former 5.3 "is replaced by a citation of 1.6.1, where the same is now said"; changes of 1.6.1: its reason now states the ground "instead of a citation of the former 5.3, which goes to the archive".
- Evidence: An older note in t25-one-thought.md names s-utvqbypzhmgndug (1.3.2) as the replacement instead.

#### Present 6.5 "A name is quoted where the reader must reach it, a predicate where the rule must keep binding" (s-ybq7wbhkrh5pjqs)

- Replaced by: none named, so `replacedBy` is left out.
- Reason written: "The owner removed the rule, since other rules cover what it said about names."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 0. Outgoing links kept: 0.
- Evidence: t25-one-thought.md: "the node on names and descriptions was removed on the owner's instruction, covered by 1.2.2, 6.3, 7.7, 3.2, 10.4; at the move current 6.5 (s-ybq7wbhkrh5pjqs) goes to the archive". Those numbers belong to an earlier numbering of the drafts, and several nodes cover it, so no replacement is named.

#### Present 6.6 "A reason is no narrower than the rule it holds up" (s-hwnzhgw5b683fc7)

- Replaced by: none named, so `replacedBy` is left out.
- Reason written: "The owner removed the rule, since it led to reasons written paragraph by paragraph."
- Incoming links dropped, since an archived node holds none (rule 6.4, s-bpdqd9v72wg7vsz): 0. Outgoing links kept: 1.
- Evidence: t25-one-thought.md: "Current 6.6 (s-hwnzhgw5b683fc7, "no narrower than the rule") is removed on the owner's instruction, since it led to reasons written paragraph by paragraph; at the move it goes to the archive". No replacement is named.

To be decided:

- 1.32 (s-xfwuvd3funutmsw), a rule of the base, names as its replacement _guidelines/extensions/recordtype/12.7 "One source for the values of a field with `enum`" (s-xfu2gpzddjnmgks), a node of the recordtype extension. `replacedBy` is not a link, so rule 1.7.3 does not forbid it, but a project without that extension finds no replacement.
- 1.37 (s-ce9wbaut6edfuy8), a rule of the base, names as its replacement _guidelines/extensions/recordtype/12.1 "RecordType" (s-7vm323mhry2enx3), a node of the recordtype extension. `replacedBy` is not a link, so rule 1.7.3 does not forbid it, but a project without that extension finds no replacement.
- 1.39 (s-5yvpn4zhuqmv5bq), a rule of the base, names as its replacement _guidelines/extensions/recordtype/12.10 "What a RecordType may refer to" (s-8ht2hn88cu2qwz9), a node of the recordtype extension. `replacedBy` is not a link, so rule 1.7.3 does not forbid it, but a project without that extension finds no replacement.
- 1.37: the continuation file also says it is "joined to it by a supersedes link". No link of that type is written: 6.1 (s-sn6au3vcr9uy5pm) no longer lists `supersedes`.

### Lists

The drafts of 1.3.1 and 6.1 now hold lists, which the build copies as wording. Each present list, and the node that now holds a list declared in the same place:

- Present 1.5 "What a node's status says" (s-5ah25f6gy99panq): of "the values a node's status can take"; members `draft`, `approved`; declared at `#/$defs/status`.
  The node keeping its sid, _guidelines/spec/1.3.5 "What an approval covers", holds no list.
  _guidelines/spec/1.3.1 "The approval status" (s-tgrnpagrb58tya7) now holds it: of "the values the approval status can take"; members `draft`, `approved`. Its members are the same.
- Present 1.27 "One source for the values of a field of type `one of`" (s-xfu2gpzddjnmgks): of "the sources the values of a field of type one of come from"; members `its own list`, `the values the domains add`, `the names of the domains`, `the sids of a kind's nodes`; declared nowhere yet, so it is matched by its sid.
  _guidelines/extensions/recordtype/12.7 "One source for the values of a field with `enum`" (s-xfu2gpzddjnmgks) now holds it: of "the sources the values of a field with `enum` come from"; members `its own list`, `the names of the parts of the base specification`, `the sids of the nodes of one kind`. It no longer holds `the values the domains add`, `the names of the domains`, `the sids of a kind's nodes`. It adds `the names of the parts of the base specification`, `the sids of the nodes of one kind`.
- Present 2.2 "A link carries its type" (s-sn6au3vcr9uy5pm): of "the types a link between nodes of the specification can carry"; members `implements`, `refines`, `constrains`, `consumes`, `supersedes`, `exempts`, `cites`, `term-relation`, `uses`; declared at `#/$defs/ref/properties/type`.
  _guidelines/spec/6.1 "What a link is" (s-sn6au3vcr9uy5pm) now holds it: of "the types that a link between nodes of the specification can have"; members `implements`, `refines`, `constrains`, `exempts`, `checks`, `cites`, `term-relation`, `uses`. It no longer holds `consumes`, `supersedes`. It adds `checks`.

Each list of the output that is declared in the schema, compared with the enum it points to:

- _guidelines/spec/1.3.1 "The approval status": its list and the enum at `#/$defs/status` in moved/specs/_schema/node.schema.json hold the same values, in the same order (draft, approved).
- _guidelines/spec/6.1 "What a link is": its list and the enum at `#/$defs/ref/properties/type` in moved/specs/_schema/node.schema.json hold the same values, in the same order (implements, refines, constrains, exempts, checks, cites, term-relation, uses).

### Todos translated from Russian (7)

Each is added to its node's `meta.todos` as `{date: "2026-11-20", by: "agent", text}`. Where the Russian named a node by a number, the English names it by its sid, written bare: node 7.2.3 of the appendix of the tools is s-j9r8z4xdrfkfs47; "node 2.5" is the rule on the archive, s-f2b5zvc565s242f; the nodes of spec.json that hold the lists, 1.3.1 and 6.1, are s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm, and node 10 of tools.json is s-xr5xxa9cxf2mq5u. In the third pass, the todo of row 10.1.35 was changed to name 1.3.1 (s-tgrnpagrb58tya7) as the node that holds the statuses, in place of s-5ah25f6gy99panq. Its Russian in `table-10-1.json` now reads "узлы 1.3.1 и 6.1 spec.json" in place of "узлы 1.5 и 2.2 spec.json". Both numbers were changed, since 2.2 in the new numbering is a different node.

- row 10.1.20a: «На шаге инструментов: узел описания инструментов реализует эту проверку; её тест пишется первым и сначала падает.» → "In the step that changes the SpecSheriff tools, a node of the appendix of the tools implements this check. The check's test is written first, and it fails until the check is implemented."
- row 10.1.27: «На шаге инструментов: тесты ниже проверяют прежний механизм — правило-посредник и его отзыв. Их переписать под запись о статусе одобрения спецификации, вместе с 7.2.3, approve.ts, binding.ts, approvals.ts и model.ts.» → "In the step that changes the SpecSheriff tools, the tests listed for this check are rewritten. They test the former mechanism: a rule that stood for the specification's approval status, and the withdrawal of that rule's approval. They are rewritten for the entry that records the specification's approval status. Node 7.2.3 of the appendix of the tools (s-j9r8z4xdrfkfs47), approve.ts, binding.ts, approvals.ts and model.ts are changed together with them."
- row 10.1.35: «На шаге инструментов, по вашим решениям от 2026-11-13: в node.schema.json заменить `TextRule.list.declaredIn` двумя свойствами `TextRule.list` — `jsonSchema` ({file, pointer}) и `valueList` ({file, symbol}); в `binding.ts` проверять каждое значение списка по схеме в месте `pointer` (через ajv, который инструменты уже используют), а если там `enum` — ещё и отсутствие в нём лишних значений; убрать сравнение с ключами произвольного JSON-объекта (функция `declaration`); перевести на новые свойства узлы 1.3.1 и 6.1 spec.json и узел 10 tools.json; записать решение в `meta.decisions` правила о списках.» → "In the step that changes the SpecSheriff tools, the following changes are made, following the owner's rulings of 2026-11-13:
- In node.schema.json, `TextRule.list.declaredIn` is replaced by two properties of `TextRule.list`: `jsonSchema` ({file, pointer}) and `valueList` ({file, symbol}).
- `binding.ts` checks each value of a list against the schema at the location in the schema that `pointer` points to. It does so through Ajv, which the tools already use.
- Where that place holds an `enum`, `binding.ts` also checks that the `enum` contains no value that is absent from the list.
- The comparison with the keys of an arbitrary JSON object (the function `declaration`) is removed.
- The nodes s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm of spec.json and the node s-xr5xxa9cxf2mq5u of tools.json are switched to the new properties.
- The decision is recorded in the `meta.decisions` of the rule on lists."
- row 10.1.39: «На шаге инструментов: `sheriff citations` перестаёт искать sid среди узлов архива, поскольку у узла в архиве нет своего sid (узел 2.5).» → "In the step that changes the SpecSheriff tools, `sheriff citations` stops looking for sids among the archived nodes, since an archived node has no sid of its own, as s-f2b5zvc565s242f states."
- row 10.1.40: «На шаге инструментов: `sheriff binding` не сообщает об отставании правила-черновика (функция `drift` сейчас проверяет и черновики).» → "In the step that changes the SpecSheriff tools, `sheriff binding` stops reporting a draft rule whose tests or code lag behind it. At present, the function `drift` checks draft rules as well."
- row 10.1.40: «На шаге, который меняет инструменты SpecSheriff: проверка (s-txbwsthdqhvyzd2) смотрит только правила, формулировка или тесты которых меняются в коммите; сравнивает тесты и символы кода, привязанные к правилу, а не файлы целиком; читает трейлер в сообщении коммита; отклоняет коммит, пока спецификация одобрена.» → "In the step that changes the SpecSheriff tools, the check that reports a node whose tests or code lag behind it (s-txbwsthdqhvyzd2) is changed as follows:
- It looks only at the rules whose wording or tests change in the commit.
- It looks at the changes to the tests and to the symbols in the code that are bound to the rule, not at changes to whole files.
- It reads the trailer in the commit message.
- It refuses the commit only while the specification is approved."
- row 10.1.43: «На шаге инструментов: передавать ревьюеру и изменённые тесты кода системы, а не только символы вне тестов, поскольку «код» в этой проверке включает тесты; тест, который проверяет то, чего правило не говорит, — тоже дефект.» → "In the step that changes the SpecSheriff tools, the reviewer is also given the changed tests that are part of the system's code, not only the changed symbols outside the tests. In this check, "code" includes the tests. A test that checks something the rule does not say is also a defect."

## Third pass: the schema

The schema in `moved/specs/_schema/` is part of the specification (5.1, s-eferktypcj7njt5), so it now says what the agreed drafts say. Each choice below gives the draft it implements and its reason.

### The files and how they compose

- `node.schema.json` is the schema of the guidelines. It holds only what the base defines: the kinds `section`, `TextRule`, `TableRule` and `term`, and the types of link of 6.1. *Implements 5.1 (s-eferktypcj7njt5)*, which composes the schema of the guidelines with the schema of each chosen extension and with the project's extension. *Reason:* a project that chooses no extension then validates against nothing that an extension defines (1.7.1, s-mbmnsnxenmavu3z: a project uses an extension only by its own choice).
- `extensions/domains.schema.json` adds the kind `header` and the type of link `consumes`, and `extensions/recordtype.schema.json` adds the kind `RecordType`. The Views extension adds nothing to the schema, so it has no schema file. *Implements 1.7.6 (s-j8y62pa9hzz6nwx)*, by which an extension adds kinds of node, properties and types of link, and 11.1.3 (s-yggv9myedprnaa7), which defines the header and its `consumes` links. *Reason:* each extension's schema holds what that extension defines and nothing else (1.7.4, s-kujguh6ceu8pfwq).
- An extension of the guidelines is written in the same format as a project's own extension of the schema, `extension.schema.json`: `kinds`, each with `needsCode` and `schema`, `fields`, `file` and `link`. Two fields are added to that format: `linkTypes` and `$defs`. *Implements 5.2 (s-xm8rz4uupb73gu5)*, by which an extension of the schema adds kinds and properties of nodes, files and links; 8.4 (s-hhnahzmhahf8jht), which declares a kind in `kinds` with its `schema` and `needsCode`; and 6.1 (s-sn6au3vcr9uy5pm), by which an extension or a project's own guidelines may define further types of link. *Reason:* one format and one composition then serve the extensions of the guidelines and a project's own extension alike. The present tools already compose a project's extension this way.
- `header` declares `needsCode: false` and `RecordType` `needsCode: true`. *Reason:* a header, like a section, is a container whose status is built from the nodes under it and which nothing implements. The code generated from a RecordType implements it (12.3, s-e877bnfa559tvk9).
- The static list of names that an extension cannot declare now holds only the kinds of the base and the names of earlier releases. A kind, a type of link, a definition or a property already composed is refused at the composition instead. `fields` may name any kind already composed. *Reason:* the Domains and RecordType extensions declare `header` and `RecordType` in the same format, so those names cannot be refused by the format itself. A project that has chosen an extension still cannot declare that extension's kinds again.
- **The composition, which a validator performs, and the tools in stage 3:**
  1. Read `node.schema.json`, `section-file.schema.json` and `archive-file.schema.json`.
  2. For each extension the project has chosen (1.7.5, s-9ttvcwpqkehm58g), read `_schema/extensions/<name>.schema.json` where it exists, then read `specs/_schema/project.schema.json`. Validate each against `extension.schema.json`, and apply its additions:
     - each kind joins `$defs/base/properties/kind/enum`, and `{if: {properties: {kind: {const}}, required: ["kind"]}, then: schema}` joins `$defs/node/allOf`;
     - each type of link joins `$defs/ref/properties/type/enum`;
     - each definition joins `$defs`;
     - each `fields` entry joins `$defs/node/allOf` as a condition on its kind;
     - `file` joins the properties of both file schemas, and `link` the properties of `$defs/ref`.
  3. Refuse a name already composed.
  4. Give Ajv the three composed schemas, and validate each file under `specs/_archive/` against `archive-file.schema.json` and every other file against `section-file.schema.json`.

  The present `schema.ts` does most of this. Stage 3 has to make these changes to it:
  - add conditions to `$defs/node/allOf` instead of the root's `allOf`, so that a node in a cell and a node of the archive get them too;
  - read the chosen extensions' schema files;
  - add `linkTypes` and `$defs`;
  - refuse a redefined kind, type of link or definition;
  - add the archive's schema.

  A reference `#/$defs/<name>` in an extension's schema names a definition of the composed `node.schema.json`, such as `#/$defs/sid` or `#/$defs/owners`.
- The build composes the schemas in exactly this way and validates each file against the schema composed for it, and again against the guidelines with every extension.

### The node

- An ordinary node requires a `sid` and a `title`; a node in a cell requires a `sid` and refuses a `title`; a node of the archive refuses a `sid` and holds no nodes under it. All three share `$defs/node`, which no longer requires a `sid`. *Implements 8.6 (s-5fewsp22mmdz7y6)* for the cell and 2.6 (s-f2b5zvc565s242f) for the archive.
- `archived` is no longer a property of every node. It is defined and required only in `archive-file.schema.json`, so a node of the specification that holds it is refused. *Implements 2.6.* *Reason:* the present schema could not tell the archive apart and left that check to `validate`; the archive's own schema can.
- A node of the archive refuses a link pointing at it. *Implements 6.4 (s-bpdqd9v72wg7vsz).* It keeps a `title` where it has one, but does not require it, since a node archived from a cell has none. It refuses `children`, since 2.6 deletes a section outright and archives only rules.
- `TextRule.list.field` is removed. No agreed draft or row names it. Draft 8.4 names `TextRule.list.members`, `TextRule.list.property` and `TextRule.list.declaredIn`, which are kept.

### Links

- The types of link of the base are exactly the members of 6.1's list (s-sn6au3vcr9uy5pm), in its order: implements, refines, constrains, exempts, checks, cites, term-relation, uses. `supersedes` is removed, which the owner ruled on 2026-11-12. `consumes` moves to the Domains extension (11.1.3, s-yggv9myedprnaa7). 6.1's `declaredIn` points at `#/$defs/ref/properties/type`, and the build compares the two (see "Lists").
- `ratio` takes the notation of 6.6 (s-bckzdwd35d2nefa): `^(0|[1-9][0-9]*)(\.\.(0|[1-9][0-9]*|\*))?:(0|[1-9][0-9]*)(\.\.(0|[1-9][0-9]*|\*))?$`. Each end is a whole number written without a leading zero, or a range of such numbers whose upper bound may be `*`. *Reason:* the pattern cannot compare the two bounds of a range, so `validate` has to check that the lower bound is not greater than the upper one (stage 3).

### The Domains extension

- `level` is optional. *Implements 11.1.3 (s-yggv9myedprnaa7)* ("its level (optional, used when the domains are visualized)"), 11.2.1 (s-nkyty4dy9x2v2a4) ("A domain's header may contain one of the levels that the specification's owners list in the project's own guidelines") and 11.2.2 (s-4azsb49pj6sech8) ("domains whose header contains no level are all placed in a single row of their own").
- `code` is dropped. No agreed draft or row requires a header to say where the domain's code is. A search of the English wording of every draft and every live row of the three tables, for "header" near "code" or "directory", for "a domain's code" and for "where its code", finds nothing.
- `sections`, the index, is optional. *Implements 11.1.3* ("Where the domain has sections, the header also carries their index") and 11.1.4 (s-2r59txnms5serdr). The present tools give a header an empty index for validation, which still validates.
- `owners` stays. *Implements 11.1.3* ("its owners, where it names them").

### The RecordType extension

- `RecordType.schema` is a JSON Schema 2020-12 object, as before. `chosenBy`, `answersTo` and `identifiedBy` stay. *Implements 12.2 (s-6eb92ddch7shuvu) and 12.6 (s-z3dnru6qqdf9m6j).*
- The source of a field's values that are not its own list is written in the keyword `x-enumSource`, beside the field's other keywords:
  - `{"from": "parts"}` for the names of the parts of the base specification (12.11, s-gqavjzcmubg5pvk);
  - `{"from": "kind", "kind": "<kind>"}` for the sids of the nodes of one of the project's own kinds (12.8, s-mt6auv3jz8m5gzh).

  The gathered values are written in the same keyword, as `"gathered": [{"value", "sid"}]`, each with the sid of the node it comes from (12.9, s-ju5vcanbjph7mgh). A field's own list stays its `enum`. *Implements 12.7 (s-xfu2gpzddjnmgks)*, whose list names the three sources.
  - *Reason for one keyword:* the source and the values gathered from it are read together, by the reader and by the generator, and the tools rewrite the gathered values whenever the source changes.
  - *Reason for the name:* the 2020-12 meta-schema admits an unknown keyword, and the prefix `x-` keeps it clear of any keyword a later release of JSON Schema defines.
- `recordFormat` checks every schema within a RecordType's schema, at any depth. A field holding both `enum` and `x-enumSource` is refused, since its values would come from two sources (12.7: "exactly one of the sources"). A field whose `enum` repeats a value is refused (12.7: "Each value is declared once"). The 2020-12 meta-schema does not require unique values in `enum`.
- **For stage 3:**
  - Generating types and runtime checks (12.3) must register `x-enumSource` with Ajv as a keyword of its own, or strip it, and must take the gathered values as the field's `enum`.
  - `sheriff reindex` must write the gathered values into `x-enumSource.gathered` (12.9), and `validate` must refuse gathered values that the source does not produce.
  - The check of table 12.12 that "a field whose values are the sids of the nodes of a project's own kind names a kind that exists" reads `x-enumSource.kind`.

### What the schema still leaves to the tools

- In a ratio, that the lower bound of a range is not greater than the upper one (6.6).
- That a node of the archive names as its replacement a node of the specification (2.6).
- How the tools recognise an archived node now that it has no sid. `validate` matches a removed node to its archive entry by sid, and so does the check that a node ever approved is archived when it is removed; both must change in stage 3. The todo of row 10.1.39 names one such change, to `sheriff citations`.
- That `fields` in an extension name a kind already composed, and that no name is composed twice.
- 12.7's list has no `declaredIn`. Its members correspond to `enum`, `x-enumSource.from: "parts"` and `x-enumSource.from: "kind"`, and the owner may give it a `declaredIn` that points at `#/$defs/enumSource/properties/from` in `extensions/recordtype.schema.json`.

## Problems

### Sids that occur twice

None.

### Citations and links whose target is not in the output

None.

Links that lead to tools.json or project.json, which exist but are not in the output:

- _guidelines/spec/10.1: its `cites` link to s-txbwsthdqhvyzd2 (cited in meta.decisions) leads to tools.json

### Links from the base of the guidelines to an extension, or between extensions

These may contradict 1.7.3 (s-chk5hnzmcpeqj25) and 1.7.4.

None.

### Present links dropped because their target is not in the output

- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-ce9wbaut6edfuy8 (present 1.37 "An entity is declared once") is dropped, its target not being in the output
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-96df5fcfqsvex9d (present 1.28 "The list of a field's values in contracts may consolidate values from different domains") is dropped, its target not being in the output
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-gzfq3x8hesj227e (present 1.29 "How a domain's added values find their field") is dropped, its target not being in the output
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-xfwuvd3funutmsw (present 1.32 "Where a value is declared") is dropped, its target not being in the output
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-v7vd4ydrwexsgsj (present 1.15 "A member of `TextRule.list` may be an object") is dropped, its target not being in the output
- _guidelines/spec/10.1 (s-jau82aq9juv9zzh): the present `implements` link to s-5yvpn4zhuqmv5bq (present 1.39 "A domain uses another domain's RecordTypes only from the sections it declares") is dropped, its target not being in the output

### Citations that are also typed links (only the typed link is written)

- _guidelines/spec/10.1: cites s-kkbqcb9xrpaepwn (cited in a text cell, meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-rah8b37kytb682y (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-a4rbry4hsu34hy8 (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-bpdqd9v72wg7vsz (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-qzthyh7yqvfhsa2 (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-sfjka4zc4rhfu67 (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1: cites s-6hha5en226aj8hu (cited in meta.decisions) and also has a `implements` link to it; only the `implements` link is written
- _guidelines/spec/10.1.20a: cites s-chk5hnzmcpeqj25 (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.25a: cites s-t5uw8zfxzhfdg86 (cited in reason) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.26: cites s-hheus6f395ynqvc (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.26: cites s-kgbzk2ph9e6jfb4 (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.37: cites s-2fau85dfyyeq66m (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.38: cites s-6hha5en226aj8hu (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.41: cites s-hheus6f395ynqvc (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.41: cites s-6fw72j65jkqrfpf (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.1.41: cites s-sn6au3vcr9uy5pm (cited in text) and also has a `checks` link to it; only the `checks` link is written
- _guidelines/spec/10.6: cites s-kkbqcb9xrpaepwn (cited in meta.decisions) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/spec/10.8: cites s-jau82aq9juv9zzh (cited in text) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/spec/10.12: cites s-jau82aq9juv9zzh (cited in text) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/extensions/recordtype/12.3a: cites s-dpe5kcz4eamv39g (cited in text) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/extensions/recordtype/12.5: cites s-e877bnfa559tvk9 (cited in reason) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/extensions/recordtype/12.7: cites s-e877bnfa559tvk9 (cited in reason) and also has a `refines` link to it; only the `refines` link is written
- _guidelines/extensions/recordtype/12.9: cites s-xfu2gpzddjnmgks (cited in text) and also has a `refines` link to it; only the `refines` link is written

### Entries of a draft's `cites` that its wording does not cite

None.

### Self-citations

None.

### Present rules of spec.json not in the output (11)

The brief expected fifteen, but the list it gives (1.10, 1.15, 1.18, 1.27 to 1.33 except those kept by 12.7, 12.8, 12.9 and 12.11, 1.37, 1.39, 5.3, 6.5, 6.6) names eleven rules, and these are exactly the eleven below.

- present 1.10 s-gqbj8849rf224qa "A decision lives on the rule it settled"
- present 1.15 s-v7vd4ydrwexsgsj "A member of `TextRule.list` may be an object"
- present 1.18 s-9hfbxv5pfnsh4kc "The base specification holds no figure of one instance"
- present 1.28 s-96df5fcfqsvex9d "The list of a field's values in contracts may consolidate values from different domains"
- present 1.29 s-gzfq3x8hesj227e "How a domain's added values find their field"
- present 1.32 s-xfwuvd3funutmsw "Where a value is declared"
- present 1.37 s-ce9wbaut6edfuy8 "An entity is declared once"
- present 1.39 s-5yvpn4zhuqmv5bq "A domain uses another domain's RecordTypes only from the sections it declares"
- present 5.3 s-xhcmchcngykvn2k "Tests at a push while the specification is a draft"
- present 6.5 s-ybq7wbhkrh5pjqs "A name is quoted where the reader must reach it, a predicate where the rule must keep binding"
- present 6.6 s-hwnzhgw5b683fc7 "A reason is no narrower than the rule it holds up"

Present sections not in the output, deleted as sections are:

- present 2 s-8ah4pd7zk4xceav "Links"
- present 3 s-h6g868gb8ctkrt6 "Code"
- present 4 s-g7hunhd3wq3hake "The map"
- present 5 s-hqz28vdq2a29ure "The checks and the procedures"
- present 6 s-3w8puyqn2ramsre "How a rule is written"

Tests and code bound to those rules, which lose their target:

None.

### Links in tools.json whose target is not in the output (8)

- tools 5 s-k4nqjr96ux7a5m7 "What the export, the guide and `sheriff show` write of a node": `cites` → s-gqbj8849rf224qa (present 1.10 "A decision lives on the rule it settled")
- tools 5 s-k4nqjr96ux7a5m7 "What the export, the guide and `sheriff show` write of a node": `cites` → s-v7vd4ydrwexsgsj (present 1.15 "A member of `TextRule.list` may be an object")
- tools 7.1.14 s-ezq8csd433vj6fj "A used domain's RecordType, only from the declared sections": `implements` → s-5yvpn4zhuqmv5bq (present 1.39 "A domain uses another domain's RecordTypes only from the sections it declares")
- tools 7.1.16 s-c2r9jndrjbtbsv6 "What a RecordType variant must agree with": `implements` → s-xfwuvd3funutmsw (present 1.32 "Where a value is declared")
- tools 7.1.18 s-5nf87c3e3jg9v7c "Where the values of a field of type `one of` are collected": `implements` → s-gzfq3x8hesj227e (present 1.29 "How a domain's added values find their field")
- tools 7.1.19 s-cdachayybfvg4na "An object in a list": `implements` → s-v7vd4ydrwexsgsj (present 1.15 "A member of `TextRule.list` may be an object")
- tools 7.2.6 s-5hb9k2e34dgn284 "A list and its declaration": `implements` → s-v7vd4ydrwexsgsj (present 1.15 "A member of `TextRule.list` may be an object")
- tools 7.3.5 s-b6qdtghnyha3fhk "The tests, run before a push": `implements` → s-xhcmchcngykvn2k (present 5.3 "Tests at a push while the specification is a draft")

### Wording copied word for word?

Title, text, reason, examples and list of every output node were compared with its draft, row or table head.

No difference.

### What the drafts and the rows lack

- decisions-out-5.json: the key "1.6.1" occurs in two files; both lists are merged
- decisions-out-5.json: the key "7.2.7" occurs in two files; both lists are merged
- decisions-out-5.json: the key "6.4" occurs in two files; both lists are merged
- decisions-out-5.json: the key "row 10.1.39 of table-10-1" occurs in two files; both lists are merged
- decisions-out-5.json: the key "2.6" occurs in two files; both lists are merged
- 1.7.4: no `sidValue` and `sid` is "new"; given the new sid s-kujguh6ceu8pfwq
- 1.7.7: `examples` is a string, not an array; written as an array holding that one string
- 2.4: no `sidValue` and `sid` is "new"; given the new sid s-m42rsngtayk9g3g
- 12.3a: no `sidValue` and `sid` is "new"; given the new sid s-ktfstpv8rurznrp
- 12.7: no `sidValue`; keeps s-xfu2gpzddjnmgks, the sid of present 1.27, its `from`
- 12.8: no `sidValue`; keeps s-mt6auv3jz8m5gzh, the sid of present 1.31, its `from`
- 12.9: no `sidValue`; keeps s-ju5vcanbjph7mgh, the sid of present 1.33, its `from`
- 12.11: no `sidValue`; keeps s-gqavjzcmubg5pvk, the sid of present 1.30, its `from`

The present lists that the drafts of 1.3.5 and 6.1 no longer hold are compared under "Second pass" above.

Rows numbered here because they had no number:

- table 10.1: the row after 10.1.39 without a number (`n` 60: "Every copy of the system's code generated from the nodes and kept in the reposit…") numbered 10.1.39a
- table 10.1: the row after 10.1.39 without a number (`n` 61: "A node from which nothing is generated, because its approved wording relies on a…") numbered 10.1.39b

Nodes in cells whose row names no implementing node of the appendix of the tools:

- _guidelines/spec/10.1.20a (row 10.1.20a): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.26b (row 10.1.26b): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.27a (row 10.1.27a): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.27b (row 10.1.27b): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.27c (row 10.1.27c): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.39a (row 10.1.39a): its row names no node of the appendix of the tools that implements it
- _guidelines/spec/10.1.39b (row 10.1.39b): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.11 (row 12.12.11): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.12 (row 12.12.12): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.13 (row 12.12.13): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.14 (row 12.12.14): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.15 (row 12.12.15): its row names no node of the appendix of the tools that implements it
- _guidelines/extensions/recordtype/12.12.16 (row 12.12.16): its row names no node of the appendix of the tools that implements it

Todos of rows left out because they are written in Russian (kept in `untranslated-todos.json`):

None.

Agreed dates missing:

None.

## Validation

Ajv 2020 with `strict: false` and `allErrors`, as the tools run it. Each file is validated against the schema composed for it, and again against the guidelines with every extension.

- _schema/extensions/domains.schema.json against extension.schema.json: valid
- _schema/extensions/recordtype.schema.json against extension.schema.json: valid
- moved spec.json, against the schema of the guidelines alone (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- moved extensions/domains.json, against the guidelines with Domains (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- moved extensions/recordtype.json, against the guidelines with RecordType (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- moved extensions/views.json, against the schema of the guidelines alone (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- moved _archive/guidelines.json, against the schema of the guidelines alone (archive-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- present tools.json (unchanged), against the schema of the guidelines alone (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- present project.json (unchanged), against the schema of the guidelines alone (section-file.schema.json): valid; against the guidelines with every extension: valid; formatted as JSON.stringify(data, null, 2) + "\n" with LF
- _schema/node.schema.json: formatted as required
- _schema/section-file.schema.json: formatted as required
- _schema/archive-file.schema.json: formatted as required
- _schema/extension.schema.json: formatted as required
- _schema/extensions/domains.schema.json: formatted as required
- _schema/extensions/recordtype.schema.json: formatted as required
- case "a TableRule whose cell holds a node without a title" (the schema of the guidelines alone, section-file): admitted, as it should be
- case "a TableRule whose cell holds a node with a title" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a TableRule whose cell holds a node without a sid" (the schema of the guidelines alone, section-file): refused, as it should be
- case "an ordinary node without a title" (the schema of the guidelines alone, section-file): refused, as it should be
- case "an ordinary node without a sid" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a node in a cell with a field nobody declared" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a TextRule with `columns`" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a TableRule without `groups`" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a node with an empty example" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a list with `field`" (the schema of the guidelines alone, section-file): refused, as it should be
- case "an ordinary node with `archived`" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a `checks` link" (the schema of the guidelines alone, section-file): admitted, as it should be
- case "a `supersedes` link" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a `consumes` link, without Domains" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a `consumes` link, with Domains" (the guidelines with Domains, section-file): admitted, as it should be
- case "a ratio 1:0..*" (the schema of the guidelines alone, section-file): admitted, as it should be
- case "a ratio 0..*:2" (the schema of the guidelines alone, section-file): admitted, as it should be
- case "a ratio 1..3:1" (the schema of the guidelines alone, section-file): admitted, as it should be
- case "a ratio 1..N:1, the present notation" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a ratio 01:1" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a decision of type "scope"" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a header, without Domains" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a header without a level, with Domains" (the guidelines with Domains, section-file): admitted, as it should be
- case "a header with a level and an index, with Domains" (the guidelines with Domains, section-file): admitted, as it should be
- case "a header with `code`, with Domains" (the guidelines with Domains, section-file): refused, as it should be
- case "a header with a level, with every extension" (the guidelines with every extension, section-file): admitted, as it should be
- case "a RecordType, without RecordType" (the schema of the guidelines alone, section-file): refused, as it should be
- case "a RecordType with a JSON Schema" (the guidelines with RecordType, section-file): admitted, as it should be
- case "a RecordType without `schema`" (the guidelines with RecordType, section-file): refused, as it should be
- case "a RecordType whose `schema` is no JSON Schema" (the guidelines with RecordType, section-file): refused, as it should be
- case "a RecordType with `fields`" (the guidelines with RecordType, section-file): refused, as it should be
- case "a field whose enum repeats a value" (the guidelines with RecordType, section-file): refused, as it should be
- case "a field with values from the parts and their gathered values" (the guidelines with RecordType, section-file): admitted, as it should be
- case "a field with values from the nodes of a kind" (the guidelines with RecordType, section-file): admitted, as it should be
- case "a field with values from a kind that names none" (the guidelines with RecordType, section-file): refused, as it should be
- case "a field with both an enum and x-enumSource" (the guidelines with RecordType, section-file): refused, as it should be
- case "a nested field with both, inside items" (the guidelines with RecordType, section-file): refused, as it should be
- case "a gathered value without its sid" (the guidelines with RecordType, section-file): refused, as it should be
- case "a RecordType variant with answersTo" (the guidelines with RecordType, section-file): admitted, as it should be
- case "an archived node without a sid" (the schema of the guidelines alone, archive-file): admitted, as it should be
- case "an archived node with a sid" (the schema of the guidelines alone, archive-file): refused, as it should be
- case "an archived node without `archived`" (the schema of the guidelines alone, archive-file): refused, as it should be
- case "an archived node with a link pointing at it" (the schema of the guidelines alone, archive-file): refused, as it should be
- case "an archived node with a link of its own" (the schema of the guidelines alone, archive-file): admitted, as it should be
- case "an archived node with nodes under it" (the schema of the guidelines alone, archive-file): refused, as it should be
- case "an archived node replaced by another" (the schema of the guidelines alone, archive-file): admitted, as it should be
- case "an archived RecordType, with RecordType" (the guidelines with RecordType, archive-file): admitted, as it should be

At Ajv's default strictness, the composition with every extension logs 27 warnings, against 22 for the present schema. Warnings at a path where the present schema logs none:

- strict mode: use allowUnionTypes to allow union type keyword at "node.schema.json#/$defs/list/properties/members/items" (strictTypes)
- strict mode: missing type "object" for keyword "required" at "node.schema.json#/allOf/3/then" (strictTypes)
- strict mode: missing type "object" for keyword "required" at "node.schema.json#/allOf/4/if" (strictTypes)
- strict mode: missing type "object" for keyword "required" at "node.schema.json#/allOf/5/if" (strictTypes)
- strict mode: missing type "object" for keyword "properties" at "node.schema.json#/allOf/5/if" (strictTypes)
- strict mode: missing type "object" for keyword "required" at "node.schema.json#/allOf/5/then" (strictTypes)
- strict mode: missing type "object" for keyword "properties" at "node.schema.json#/allOf/5/then" (strictTypes)
- strict mode: missing type "object" for keyword "properties" at "node.schema.json#" (strictTypes)
- strict mode: missing type "array" for keyword "uniqueItems" at "node.schema.json#/properties/enum" (strictTypes)
- strict mode: missing type "object" for keyword "additionalProperties" at "node.schema.json#/properties/properties" (strictTypes)
- strict mode: missing type "object" for keyword "additionalProperties" at "node.schema.json#/properties/patternProperties" (strictTypes)
- strict mode: missing type "object" for keyword "additionalProperties" at "node.schema.json#/properties/dependentSchemas" (strictTypes)
- strict mode: missing type "object" for keyword "additionalProperties" at "node.schema.json#/properties/%24defs" (strictTypes)
- strict mode: missing type "array" for keyword "items" at "node.schema.json#/properties/prefixItems" (strictTypes)
- strict mode: missing type "array" for keyword "items" at "node.schema.json#/properties/allOf" (strictTypes)
- strict mode: missing type "array" for keyword "items" at "node.schema.json#/properties/anyOf" (strictTypes)
- strict mode: missing type "array" for keyword "items" at "node.schema.json#/properties/oneOf" (strictTypes)
- strict mode: missing type "array" for keyword "items" at "archive-file.schema.json#/properties/refs" (strictTypes)
- strict mode: missing type "object" for keyword "required" at "archive-file.schema.json#/properties/refs/items/not" (strictTypes)
