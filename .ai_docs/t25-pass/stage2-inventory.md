# T25, stage 2: the inventory of the appendix of the tools

Almost every node of the appendix of the tools must change before it matches the new form of the guidelines.
The appendix, `specs/_guidelines/tools.json`, holds 62 nodes: 57 rules and 5 sections.
Of them, 53 must change, 5 may need a change, and for 4 nodes no change was found.
The review starts with the file layout, the composition of the schema and the archive without sids, as the last section proposes.

This file was written on 2026-11-20 from these sources:

- the current appendix, `specs/_guidelines/tools.json`, and the current base, `specs/_guidelines/spec.json`;
- the new form in `.ai_docs/t25-pass/moved/specs/`: `_guidelines/spec.json`, `_guidelines/extensions/{domains,recordtype,views}.json`, `_archive/guidelines.json` and `_schema/`;
- `.ai_docs/t25-pass/moved/report.md`;
- `.ai_docs/t25-pass/moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it;
- `.ai_docs/t25-one-thought.md`, the continuation file, searched for the sids of the nodes of the appendix and for references such as "tools 7.1.3" and "tools/6".

No file other than this one and `.ai_docs/INDEX.md` was changed.

## How to read this file

Each node of the appendix has one of three verdicts:

- "must change": its wording or one of its links contradicts the new form, or relies on a rule that the new form drops or moves;
- "may need a change": something in the new form may require the node to change, and the entry says what is uncertain;
- "no change found": no requirement of the new form was found that the node fails to meet, apart from the questions below.

Each link of a node is labelled with the state of its target:

- "new form, wording changed": the target is a rule of the new base with a new wording;
- "new form, reworded with the same meaning": the target's wording changed, and its meaning did not;
- "extension (Domains)", "extension (RecordType)" or "extension (Views)": the target is a node of an extension of the guidelines in the new form;
- "dropped": the target is in the archive, matched by its title and text, and the label names the replacement that `archived.replacedBy` gives;
- "appendix of the tools": the target is another node of the appendix.

The section "The targets of the links" says in one sentence what changed in the meaning of each target.
Every rule of the base that a node of the appendix links to has a new wording in the new form.
So no target is labelled as unchanged.

A citation is listed here only as a link, since every citation in `tools.json` has its link.
Some citations appear only in a node's `meta.decisions`, which record past rulings.
Those need no change unless the entry says so.

A node is named here by its title and its sid.
Its location in `tools.json` is given as well, for instance "tools 7.1.3", since the earlier notes use that form.
A row of a table of checks has no title.
It is named by its number in the new form, its sid and the start of its text.

## Questions that affect many nodes

These questions are best settled with the owner before the first node is shown.
Each answer changes the links or the wording of many nodes.

**X1. Which node a check of the appendix implements.**
Each check node of the appendix, from “A key written twice in one object” (s-7zqsstgnuc772ba) to “The tests, run before a push” (s-b6qdtghnyha3fhk), has an `implements` link to the main table of checks (s-jau82aq9juv9zzh).
In the new form, each row of that table is a node in a cell, with a sid of its own.
moved/impl.json records which node of the appendix implements which row.
The owner may want each check node to implement the rows whose checks it performs, instead of the whole table or in addition to it.
Either way, a node whose check moved to the table of checks of an extension must link to that table or to its rows.
The table of the Domains extension is s-rp2nxe3cga2p26x, and the table of the RecordType extension is s-3k8mvhq2xbn5wpz.
The nodes concerned are these:

- for the Domains extension: “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23); “`consumes` and `exempts` links” (s-qvgzubkrafadqgf); “No circular dependency between the domains” (s-vuujweu57sxsa58); “A header's level” (s-uxmkwbnpgtjzkgv); “A file of the technical appendix named after a domain” (s-gvafe6bnstwab8b);
- for the RecordType extension: “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj); “What a RecordType variant must agree with” (s-c2r9jndrjbtbsv6); “An identifier followed to its end” (s-3anv9qcmx8pwp2w); “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c);
- the part of “Sids, locations, terms and names of RecordTypes, counted” (s-vke5hakwf3uyrjs) that counts the names of RecordTypes, and the part of Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt that compares the gathered values.

**X2. The links of the hooks and of the commands to the main table of checks.**
These nodes implement the main table of checks (s-jau82aq9juv9zzh):

- “The commands” (s-f5rz6b7dhxejjts);
- “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54);
- “The hooks” (s-477gtdrkw34dzxw);
- “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p);
- “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x).

The former text of that rule said when the checks run.
That is now stated in “When the checks run” (s-epaw9sgyaajzn8g) and in “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t).
No node of the appendix implements either of them.

**X3. How the appendix says what applies only where an extension is chosen.**
A project uses an extension only if it chooses to (s-mbmnsnxenmavu3z).
Many nodes describe what belongs to an extension as if it always applied:

- a domain's header, its index, its level and its `consumes` links (Domains);
- the generation of types and RuntimeChecks from RecordTypes (RecordType);
- the readable export and the map (Views).

The owner may want one statement of how the tools load the chosen extensions, on which every such node would then rely.
No node of the appendix says how the tools find the chosen extensions or run their checks.

**X4. Renamed terms.**
Several nodes still use names that the new form replaced:

- NodeKind, which the owner removed on 2026-11-10 (the decisions of “A project's own kinds of node”, s-vsh384ybt4w25a2): in “The commands” (s-f5rz6b7dhxejjts), “The schema and a project's extension” (s-xzcw3hv4hmxz7h7), “The NodeKinds at the ends of a link” (s-pvnnr844f3y964m), “`consumes` and `exempts` links” (s-qvgzubkrafadqgf), “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c), “The SpecTags the tests carry” (s-utf4mbt7ref8g9c), “Citing a node only by its sid” (s-nh8b2hjvzasdxmd), “An approved node without code or a test” (s-jgejd5rpd9d43pd), “The review of a commit” (s-vp24dqydygztqbt) and “How an approval is recorded” (s-v4qus7raqnwzneb);
- a field of type `one of`, now a field with `enum` (s-xfu2gpzddjnmgks): in “The commands” (s-f5rz6b7dhxejjts), “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7), “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c), “How an approval is recorded” (s-v4qus7raqnwzneb) and “The type each neutral type of a field gives” (s-4npdup7mjkva69y);
- a field of type `identifier of`, now a field with `identifierOf`: in “An identifier followed to its end” (s-3anv9qcmx8pwp2w) and “The type each neutral type of a field gives” (s-4npdup7mjkva69y);
- a "required" field, now a "guaranteed" one (s-adhmw4gw6y82f44): in “What a RecordType generates” (s-suv42g8r3ra2h6b) and “A RecordType its variants refine” (s-nk8td3ez58gahc4).

CLAUDE.md lets the agent approve a purely technical renaming itself and report it in one line.
A node that also changes for another reason goes to the owner for approval.

**X5. The word "documents".**
The appendix calls the markdown files outside `specs/` "documents", in “Where the files are” (s-zefk589ykh37b8u) and “A citation outside the specification” (s-m8nmfsxkcfu7cjp).
“A part of the specification can be read on its own” (s-k73czmpkazcx7mu) calls the files of a domain "documents".
The continuation file proposes "documentation" for the first sense.
Row 10.1.39 (s-e84nggntkrcyumq) of the main table also uses "documents" in the first sense.

**X6. Incoming links from the appendix into the guidelines.**
“Incoming links are built” (s-bpdqd9v72wg7vsz) says that a node of the SpecSheriff guidelines holds only the links that point at it from the SpecSheriff guidelines.
“The guidelines and the appendix of the tools” (s-a4rbry4hsu34hy8) now puts the appendix outside the guidelines.
Read together, the two rules forbid the 152 incoming links from the appendix that the current `spec.json` holds.
Yet the reason of “The appendix of the tools implements the guidelines” (s-uxtyyen92jygth4) relies on being able to find a rule of the appendix when the rule it implements changes.
Whether the reindex still builds these links affects “The commands” (s-f5rz6b7dhxejjts) and “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23).

## Open problems in the new form that the review of the appendix will encounter

These are not wordings of the appendix, but the appendix cannot be finalised without them.

- **P1.** Row 10.1.35 (s-f5mm7tagez38ffz) and its todo names `TextRule.list.jsonSchema` and `TextRule.list.valueList`. Other parts of the new form still use `TextRule.list.declaredIn`: “How a project's own kind of node is declared and checked” (s-hhnahzmhahf8jht), the lists of “The approval status” (s-tgrnpagrb58tya7) and of “What a link is” (s-sn6au3vcr9uy5pm), and `node.schema.json` in moved/.
- **P2.** “A node's location” (s-kag2m9tzdnduxdx) does not say how a node in a cell of a `TableRule` is numbered. The new files hold temporary numbers such as 10.1.20a and 10.1.39b, which the reindex would recompute.
- **P3.** No rule of the new form states the location of a domain's header. Nor does any rule say that the contracts section is numbered continuously across its files. The former wording of A node's location stated both, and the Domains extension states neither.
- **P4.** Rows 12.12.15 (s-rpkq8y79fwg5k92) and 12.12.16 (s-hn9m9dhxaazjn3y) only report a RecordType that refers to anything outside its part. An older note in the continuation file recommended rejecting it. The agreed rows take precedence, so “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj) is to follow them.
- **P5.** Row 10.1.17 (s-83natrftdsmttsu) exempts abbreviations, while its deterministic criterion counts every word in capitals, as the tools do. The continuation file asks for this to be raised with the owner at the step that changes the SpecSheriff tools.
- **P6.** Row 10.1.26 (s-k6dzuajejrw4cej) says that each SpecTag names a rule. A generated type carries the SpecTag of its RecordType (“Where the types and RuntimeChecks generated from the RecordTypes are written”, s-pvzms7d8kxb8dk2, and “What a RecordType generates”, s-suv42g8r3ra2h6b). “What is considered a rule of a section” (s-pctqj9wqaq8762t) does not count a RecordType as a rule. Settled on 2026-11-21: the owner agreed to the new node “A RecordType is a rule” (s-ktfstpv8rurznrp) of the RecordType extension.

## The targets of the links

These are the nodes outside the appendix that the nodes of the appendix link to: 31 rules of the base, 8 nodes of the extensions and 6 dropped rules.
The last column counts the nodes of the appendix that link to each target.

### Rules of the base

| Target | In the new form | What changed in meaning | Linked from |
|---|---|---|---|
| “A todo is kept on a node it concerns” (s-t28j22vbdmmeqnh) | new form, 1.2.5, wording changed | A todo may now concern several nodes, and the requirement that every todo can be listed at once, the newest first, is gone. | 1 |
| “Only a node's owners approve it” (s-67vekyup7y8smap) | new form, 1.3.4, wording changed | Approval on an owner's behalf moved to “What an agent approves on an owner's behalf” (s-t5uw8zfxzhfdg86), owners of parts moved to “The owners” (s-6sk8uet75dmq5qz), and an owner may now approve a whole `TableRule`, which approves every draft node in its cells. | 3 |
| “What an approval covers” (s-5ah25f6gy99panq) | new form, 1.3.5, wording changed | It now says only what wording an approval covers and what an approval survives, the wording now including the examples and, for a node in a cell, the text cells of its row and the headings of its column and group. | 3 |
| “How a section's approval status is determined” (s-9kfdycuq34beqvs) | new form, 1.3.8, wording changed | It no longer mentions a domain's header, its level or its code, and the condition under which a section is approved moved to “When the status is approved” (s-9g7jj8z4yf9kq93). | 4 |
| “The test comes before the code” (s-rah8b37kytb682y) | new form, 1.4.1, wording changed | Only "the test first, then the code" remains, so a test may no longer name a term, and the rules on a test's SpecTag, on the test a commit owes and on a rewritten reference are gone from it. | 3 |
| “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) | new form, 1.5.2, wording changed | Code may now be bound by a SpecTag before a symbol, by SpecTags at the start of a file or by an entry in a bindings file at the root, and a file bound as a whole changes as a whole. | 2 |
| “The guidelines and the appendix of the tools” (s-a4rbry4hsu34hy8) | new form, 2.1, wording changed | The appendix of the tools is now a separate document outside the guidelines, the term "the base of the guidelines" is gone, and the duty of each rule of the appendix to implement a rule moved to “The appendix of the tools implements the guidelines” (s-uxtyyen92jygth4). | 1 |
| “How a project uses the SpecSheriff guidelines and their extensions” (s-bsya3febm6u64ab) | new form, 2.5, wording changed | It now covers the chosen extensions as well as the guidelines, and the composition of a project's guidelines moved to “A project's own guidelines” (s-u7tw6m8npxmv5tu). | 2 |
| “The archive” (s-f2b5zvc565s242f) | new form, 2.6, wording changed | An archived node now has no sid and names only a node of the specification as its replacement, that name is passed on to the next replacement when the replacement is archived in turn, and a restored node gets a new sid. | 1 |
| “What the technical appendix contains” (s-vj7ercem526zd6v) | new form, 4.1, wording changed | The technical appendix now has a section for each top-level section of the base specification, under that section's title, instead of a section for each domain. | 2 |
| “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) | new form, 5.1, wording changed | The schema is now composed of the schema of the guidelines, the schema of each chosen extension and the project's extension, and what the project's extension may add moved to “How a project may extend the schema” (s-xm8rz4uupb73gu5). | 3 |
| “What a link is” (s-sn6au3vcr9uy5pm) | new form, 6.1, wording changed | `consumes` (now in the Domains extension) and `supersedes` are gone, `checks` is new, and an extension or a project's own guidelines may define further types of link. | 3 |
| “Incoming links are built” (s-bpdqd9v72wg7vsz) | new form, 6.4, wording changed | It now covers only incoming links, since outgoing links and citations moved to “Outgoing links are written” (s-yku67x4mehbmv6f) and “A cited node is also linked” (s-cxtt6jvhqcey2k9), and it adds that a node of a chosen extension holds only incoming links from that extension. | 3 |
| “A section contains rules and requires nothing” (s-7445ahgjck2aefg) | new form, 8.1, wording changed | What counts as a rule of a section moved to “What is considered a rule of a section” (s-pctqj9wqaq8762t), and "one node, one rule" moved to “One node, one rule” (s-xn9crbmzadzwjvg). | 1 |
| “A project's own kinds of node” (s-vsh384ybt4w25a2) | new form, 8.3, wording changed | It now says only that a project may declare its own kinds of node and whether their nodes need code, and the name NodeKind is gone. | 1 |
| “A node's location” (s-kag2m9tzdnduxdx) | new form, 8.5, wording changed | Citing a node by its sid moved to “A node is cited by its sid” (s-9spq78kdwsxr759), and the locations of a domain's header and of the contracts files are no longer stated. | 1 |
| “What is considered the system's code” (s-hheus6f395ynqvc) | new form, 9.1, reworded with the same meaning | Reworded only; the meaning is the same. | 4 |
| “The implementation of an approved rule” (s-6fw72j65jkqrfpf) | new form, 9.2, wording changed | Approved rules must be implemented only while the specification is approved, code counts when it is bound (s-kgbzk2ph9e6jfb4) directly or through a chain of `implements` links, and exemption moved to “Exempting a rule from being implemented” (s-gf6n8ge4mke3pr2). | 2 |
| “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) | new form, 9.5, wording changed | Code outside the commit that carries no SpecTag now passes silently while the specification is a draft, passes with one warning while it is approved and the `strict` flag is off, and is refused only with the flag on. | 3 |
| “A node's lists of its code and its tests” (s-rwqzepmrt77rv35) | new form, 9.7, wording changed | The SpecSheriff tools now build `meta.code` and `meta.tests` from the SpecTags instead of people writing them by hand, and the definition of a SpecTag moved to “The SpecTag” (s-8xw4mgvpexyvw5q). | 4 |
| “The main table of checks” (s-jau82aq9juv9zzh) | new form, 10.1, wording changed | It is now a `TableRule` whose rows are nodes with sids and which lists only the checks of the SpecSheriff guidelines, and it no longer says when the checks run or that a check reads only its commit. | 45 |
| “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp) | new form, 10.3, wording changed | The refusal before an edit no longer covers a project's own check changed without a test, now also guards the entries of the approval status, of the `strict` flag and of the chosen extensions, and applies only to an edit that names its files and their content. | 7 |
| “What the reviewer is given” (s-nyh9yk22ba6g77q) | new form, 10.4, wording changed | The reviewer is now also given the commit message, the rules whose implementation the message says needs no change, and approved nodes of the technical appendix with their rules of the base, while the refusal of a review that cannot be carried out moved to s-94k7b6r5kf65udf. | 2 |
| “The specification's approval status” (s-qzthyh7yqvfhsa2) | new form, 10.6, wording changed | The specification's status is now set by entries that an owner records, the latest one deciding, instead of by a rule of `project.json`, and the approval procedure first runs the checks over the whole specification and code and asks the owner to confirm. | 5 |
| “A project's own checks join the shared ones” (s-2fau85dfyyeq66m) | new form, 10.8, wording changed | The rule no longer says that a project's check runs wherever the shared checks run, since the order is now set by The order in which tools and checks run (s-pcnyfp7gev7syax), and it now requires that the check give the same answer for the same change. | 3 |
| “A project's own code generators” (s-km4x4s26kv7pjze) | new form, 10.9, wording changed | A project's generator now writes from the approved wordings of its nodes (s-qyjw8xez6t6adc3) instead of waiting until they are all approved, and its code stays as it is while the rule that lists it is a draft. | 3 |
| “Where a SpecTag may appear” (s-sfjka4zc4rhfu67) | new form, 10.10, wording changed | It now limits where a SpecTag may appear and what it may name, and no longer requires the tests of a project's own check or generator to carry the SpecTag of the rule that lists it. | 2 |
| “The fixtures of a check's tests are left out of the checks of citations and locations” (s-6hha5en226aj8hu) | new form, 10.11, reworded with the same meaning | Reworded only; the meaning is the same. | 3 |
| “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax) | new form, 10.12, wording changed | The SpecSheriff checks now run last, after the project's tools that rewrite files, all generators, and the project's own checks and other tools, where formerly they ran first. | 3 |
| “A procedure that writes the specification is idempotent” (s-jsqxdx47wkkj7gp) | new form, 10.13, reworded with the same meaning | Reworded only; the meaning is the same. | 2 |
| “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j) | new form, 10.14, wording changed | Generated system code now follows the approved wordings of its nodes (s-qyjw8xez6t6adc3) instead of waiting for all of them to be approved, and "the specification is the set of its nodes" moved to “The specification is the set of its nodes” (s-dmdnz4cvhcjnweu). | 4 |

### Nodes of the extensions

| Target | In the new form | What changed in meaning | Linked from |
|---|---|---|---|
| “A part of the specification can be read on its own” (s-k73czmpkazcx7mu) | extension (Domains), 11.1.2 | It now applies only where the specification is divided into domains, and a large domain may be split into several documents, a section being the smallest recommended part. | 1 |
| “Links between domains” (s-hr7j7scmfkkjnws) | extension (Domains), 11.1.5 | The meaning is close to the former one, but a missing statement now goes to an existing node or a new rule, with no todo on that rule. | 2 |
| “A domain's level in the hierarchy” (s-nkyty4dy9x2v2a4) | extension (Domains), 11.2.1 | A domain's level is now optional. | 1 |
| “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9) | extension (RecordType), 12.3 | It now says only that types and RuntimeChecks are generated from the RecordTypes, since what a RecordType contains moved to “What a RecordType contains” (s-6eb92ddch7shuvu), and "what happens to a field nobody declared" is gone. | 5 |
| “RecordType variants” (s-z3dnru6qqdf9m6j) | extension (RecordType), 12.6 | A variant is now declared where its RecordType is declared, holds its fields beside the RecordType's fields without a field of type `variant`, and repeats no field name of its RecordType. | 1 |
| “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) | extension (RecordType), 12.7 | The sources are now a field's own list, the names of the parts of the base specification and the sids of the nodes of one kind, without the values the domains add or the names of the domains. | 3 |
| “Gathered values are written beside their field” (s-ju5vcanbjph7mgh) | extension (RecordType), 12.9 | It now concerns a field with `enum` instead of a field of type `one of`, and says that only the SpecSheriff tools write the gathered values. | 4 |
| “The map of the specification” (s-zu8ne3wq84zchc4) | extension (Views), 13.2 | The map now shows only titles and statuses nested as in the specification, its top-level branches are the guidelines, the appendix of the tools, the base specification and the technical appendix, and the branches for the levels of the domains are gone. | 1 |

### Dropped rules

Each is matched to its entry in the archive by its title and text.

| Target | In the new form | What changed in meaning | Linked from |
|---|---|---|---|
| “A decision lives on the rule it settled” (s-gqbj8849rf224qa) | dropped (former 1.10); the archive names “Everything that bears on a node is kept in that node” (s-x4zcbk5ekebd9ua) as its replacement | Dropped. The archive gives this reason: The owner removed the rule, since it repeated the rule that everything bearing on a node is kept in that node, and the schema. | 1 |
| “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj) | dropped (former 1.15); the archive names “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) as its replacement | Dropped. The archive gives this reason: The owner removed the rule, since it only restated the schema. | 3 |
| “How a domain's added values find their field” (s-gzfq3x8hesj227e) | dropped (former 1.29); the archive names no replacement | Dropped. The archive gives this reason: The owner removed the values that the domains add to a field as a source of the field's values, since the contracts section now holds only fragments of a format, which refer only to other fragments. | 1 |
| “Where a value is declared” (s-xfwuvd3funutmsw) | dropped (former 1.32); the archive names “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) as its replacement | Dropped. The archive gives this reason: The owner removed the rule, since the values of a field now come from the field's own list, declared with the field, or are read from the specification. | 1 |
| “A domain uses another domain's RecordTypes only from the sections it declares” (s-5yvpn4zhuqmv5bq) | dropped (former 1.39); the archive names “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) as its replacement | Dropped. The archive gives this reason: The owner ruled that a RecordType of one domain does not name a RecordType of another domain, so the rule on naming such RecordTypes through the sections a domain's header declares was removed. | 1 |
| “Tests at a push while the specification is a draft” (s-xhcmchcngykvn2k) | dropped (former 5.3); the archive names “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t) as its replacement | Dropped. The archive gives this reason: The rule moved into the rule on what the checks enforce and when they run, which now says that no test has to pass while the specification is a draft. | 1 |

## The nodes of the appendix, in document order

### “The tools” (s-qtq7t32yfqj2yzw)

Location `_guidelines/tools` (the top section of tools.json), kind `section`, status `approved`.

Links: none.

Todos and notes: none found.

**Verdict: must change.** Its text, "How the SpecSheriff tools carry out the base of the guidelines", names "the base of the guidelines", a term the owner removed from “The guidelines and the appendix of the tools” (s-a4rbry4hsu34hy8). The tools now also implement the rules of the extensions of the guidelines (s-mbmnsnxenmavu3z), which the text does not mention.

### “Where the files are” (s-zefk589ykh37b8u)

Location `_guidelines/tools/1` (tools 1), kind `TextRule`, status `approved`.

Links:

- `implements` → “A part of the specification can be read on its own” (s-k73czmpkazcx7mu): extension (Domains), 11.1.2.
- `implements` → “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5): new form, 5.1, wording changed.
- `implements` → “The archive” (s-f2b5zvc565s242f): new form, 2.6, wording changed.
- `implements` → “The guidelines and the appendix of the tools” (s-a4rbry4hsu34hy8): new form, 2.1, wording changed.
- `implements` → “Only a node's owners approve it” (s-67vekyup7y8smap): new form, 1.3.4, wording changed.
- `implements` → “A domain's level in the hierarchy” (s-nkyty4dy9x2v2a4): extension (Domains), 11.2.1.
- `implements` → “The specification's approval status” (s-qzthyh7yqvfhsa2): new form, 10.6, wording changed.
- `implements` → “What is considered the system's code” (s-hheus6f395ynqvc): new form, 9.1, reworded with the same meaning.
- `cites` → “A project's own checks join the shared ones” (s-2fau85dfyyeq66m): new form, 10.8, wording changed.
- `cites` → “A project's own code generators” (s-km4x4s26kv7pjze): new form, 10.9, wording changed.
- `cites` → “The fixtures of a check's tests are left out of the checks of citations and locations” (s-6hha5en226aj8hu): new form, 10.11, reworded with the same meaning.
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).
- `cites` → “The plugin for Codex CLI carries everything its work needs” (s-2pdy9gw2jrjvfb4): appendix of the tools (tools 15).
- `cites` → “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): appendix of the tools (tools 10).
- `cites` → “The SpecTags the tests carry” (s-utf4mbt7ref8g9c): appendix of the tools (tools 7.2.4).
- `cites` → “The schema and a project's extension” (s-xzcw3hv4hmxz7h7): appendix of the tools (tools 7.1.2).
- `cites` → “How each check is made” (s-4kd2pave7vm4hmd): appendix of the tools (tools 7).

Todos and notes:

- Note: The continuation file (the ruling of 2026-11-17 on “How code is bound to its rules”, s-kgbzk2ph9e6jfb4) names this node among those to change. The bindings file is kept next to `sheriff.config.json` at the root of the repository.
- Note: The continuation file proposes renaming "documents" (the markdown files outside `specs/`) to "documentation", since “A part of the specification can be read on its own” (s-k73czmpkazcx7mu) calls the files of a domain "documents".
- Note: The continuation file: the bare phrase "the extension" is to take its object, "the extension of the schema".

**Verdict: must change.** The schema is now composed of the schema of the guidelines, the schema of each chosen extension and the project's extension (s-eferktypcj7njt5), and the node lists neither `archive-file.schema.json`, nor the schemas of the extensions, nor the files of the extensions of the guidelines. It still finds the specification's approval in a rule of `project.json`, which “The specification's approval status” (s-qzthyh7yqvfhsa2) replaced by entries an owner records.

What else must change or be settled:

- The schema files: `archive-file.schema.json` and `_schema/extensions/<name>.schema.json` for each extension that has one, composed as moved/report.md ("Third pass") describes.
- The files of the extensions of the guidelines, `specs/_guidelines/extensions/<name>.json`, which a project reads from the plugin as it reads the guidelines (s-bsya3febm6u64ab).
- Where the entries of the specification's approval status (s-qzthyh7yqvfhsa2), of the `strict` flag (s-q3pfzyaxvpr2zj2) and of the chosen extensions (s-9ttvcwpqkehm58g) are kept, and where the bindings file is (s-kgbzk2ph9e6jfb4).
- The layout of the base: a domain under `specs/<domain>/` applies only where the Domains extension is chosen (s-h6h25ctd3yryudh), and a domain's document may be divided by section (s-k73czmpkazcx7mu).
- The technical appendix: a section for each top-level section of the base, under that section's title (s-vj7ercem526zd6v), in place of "a domain's in `<domain>.json`".
- What is found in `project.json`: the rule that approves the specification goes; the levels of the domains are optional (s-nkyty4dy9x2v2a4); the project's own guidelines now also name where the tests run (s-m4h279nbaqkpa3t), the tools that rewrite files (s-pcnyfp7gev7syax) and further formats that allow no comments (s-kgbzk2ph9e6jfb4).

### “The commands” (s-f5rz6b7dhxejjts)

Location `_guidelines/tools/2` (tools 2), kind `TextRule`, status `approved`.

Links:

- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A procedure that writes the specification is idempotent” (s-jsqxdx47wkkj7gp): new form, 10.13, reworded with the same meaning.
- `implements` → “Incoming links are built” (s-bpdqd9v72wg7vsz): new form, 6.4, wording changed.
- `implements` → “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j): new form, 10.14, wording changed.
- `implements` → “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9): extension (RecordType), 12.3.
- `implements` → “What an approval covers” (s-5ah25f6gy99panq): new form, 1.3.5, wording changed.
- `implements` → “Gathered values are written beside their field” (s-ju5vcanbjph7mgh): extension (RecordType), 12.9.
- `implements` → “A project's own checks join the shared ones” (s-2fau85dfyyeq66m): new form, 10.8, wording changed.
- `implements` → “A project's own code generators” (s-km4x4s26kv7pjze): new form, 10.9, wording changed.
- `implements` → “A todo is kept on a node it concerns” (s-t28j22vbdmmeqnh): new form, 1.2.5, wording changed.
- `implements` → “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): new form, 9.7, wording changed.
- `implements` → “How a section's approval status is determined” (s-9kfdycuq34beqvs): new form, 1.3.8, wording changed.
- `implements` → “The specification's approval status” (s-qzthyh7yqvfhsa2): new form, 10.6, wording changed.
- `cites` → “Links between domains” (s-hr7j7scmfkkjnws): extension (Domains), 11.1.5.
- `cites` → “How an approval is recorded” (s-v4qus7raqnwzneb): appendix of the tools (tools 11).
- `cites` → “How each check is made” (s-4kd2pave7vm4hmd): appendix of the tools (tools 7).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).
- `cites` → “Building the map” (s-rpv4fkdqqguptqd): appendix of the tools (tools 4).
- `cites` → “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7): appendix of the tools (tools 5).
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).
- `cites` → “Generated copies against the nodes” (s-dbk2vyeg8z5jxna): appendix of the tools (tools 7.2.8).

Todos and notes:

- On the node itself (2026-11-06, the agent): the types and RuntimeChecks are to wait also for the nodes that their gathered values come from. “Code generated from approved wordings” (s-qyjw8xez6t6adc3) replaces waiting, so this todo is to be reconsidered.
- Note: The continuation file (2026-11-18): `sheriff types` changes with “Code generated from approved wordings” (s-qyjw8xez6t6adc3). The appendix is to say where the tools find the last approved wording: an approval holds only the wording's fingerprint, so the tools look the wording up in git history.
- Note: The continuation file: the paragraph on `sheriff todos` still cites “A todo is kept on a node it concerns” (s-t28j22vbdmmeqnh), and one of the node's decisions restates the listing of todos that the owner deleted. Whether that citation and the `implements` link stay is to be settled at this node.
- Note: The continuation file: the keys that this node names bare are to be written with their object, as `declaredIn` became `TextRule.list.declaredIn`.
- Note: The continuation file (2026-11-15): `sheriff reindex` renames the property `required` of a RecordType's field to `guaranteed`.
- Note: The continuation file (2026-11-11): a rule of the appendix is to say how the lists `meta.code` and `meta.tests` are built: which command, how the code is read, and that it runs where the reindex runs.

**Verdict: must change.** `sheriff types` still holds generated code back until every node it comes from is approved, while “Code generated from approved wordings” (s-qyjw8xez6t6adc3) generates from the last approved wordings and reports the nodes that rely on a node never approved. `sheriff reindex` still adds a rule that approves the specification, which “The specification's approval status” (s-qzthyh7yqvfhsa2) removed, and it does not build `meta.code` and `meta.tests`, which “A node's lists of its code and its tests” (s-rwqzepmrt77rv35) now leaves to the tools.

What else must change or be settled:

- `sheriff reindex`: the gathered values of a field with `enum` are written into `x-enumSource.gathered` (s-ju5vcanbjph7mgh; moved/report.md, "The RecordType extension"); the index of a domain's header is built only where the Domains extension is chosen (s-2r59txnms5serdr).
- `sheriff reindex`, new migrations: the sid of an archived node is removed (s-f2b5zvc565s242f); `required` becomes `guaranteed` (s-adhmw4gw6y82f44); a RecordType's `fields` and `unknown` become its `schema` (s-6eb92ddch7shuvu); `supersedes` links go (s-sn6au3vcr9uy5pm); `declaredIn` changes as the todo of row 10.1.35 says. The migration of an empty list of a field of type `one of` goes with the source "the values the domains add" (s-xfu2gpzddjnmgks).
- `sheriff reindex` gives a sid and a location to each node in a cell of a `TableRule` (s-5fewsp22mmdz7y6), and moves on an archived node's replacement when that replacement is archived (s-f2b5zvc565s242f).
- `sheriff guide` also prints the chosen extensions, and no longer counts the appendix of the tools among the guidelines (s-a4rbry4hsu34hy8).
- `sheriff approve` may approve a whole `TableRule` (s-67vekyup7y8smap).
- Commands are needed for the new procedures: the approval of the specification with its run of the checks (s-qzthyh7yqvfhsa2), turning the `strict` flag on and off and listing what a check finds (s-q3pfzyaxvpr2zj2, s-kkbqcb9xrpaepwn), and choosing or withdrawing an extension (s-9ttvcwpqkehm58g, s-j8y62pa9hzz6nwx). Whether they belong in this node or in new nodes is open.
- The name NodeKind (question X4).

### “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54)

Location `_guidelines/tools/3` (tools 3), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `implements` → “A procedure that writes the specification is idempotent” (s-jsqxdx47wkkj7gp): new form, 10.13, reworded with the same meaning.
- `implements` → “The specification's approval status” (s-qzthyh7yqvfhsa2): new form, 10.6, wording changed.
- `cites` → “Only a node's owners approve it” (s-67vekyup7y8smap): new form, 1.3.4, wording changed.
- `cites` → “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax): new form, 10.12, wording changed.
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x): appendix of the tools (tools 16).
- `cites` → “The project's own tools in a git hook” (s-n4m5zvh96yb299p): appendix of the tools (tools 13).
- `cites` → “How an approval is recorded” (s-v4qus7raqnwzneb): appendix of the tools (tools 11).

Todos and notes:

- Note: The continuation file (2026-11-17) names this node among those to change with “How code is bound to its rules” (s-kgbzk2ph9e6jfb4).
- Note: The continuation file: the phrase "both agents" counts what a declaration in the code holds (`AGENTS` in `init.ts`); it is to be fixed when this node is reviewed.

**Verdict: must change.** `sheriff init` writes into `project.json` a draft rule "The specification is approved", and the reason explains it, while “The specification's approval status” (s-qzthyh7yqvfhsa2) records the status in entries that an owner adds. Two items of the continuation file wait for this node: the bindings file (s-kgbzk2ph9e6jfb4) and the phrase "both agents".

What else must change or be settled:

- Whether `sheriff init` writes the record of the chosen extensions (s-9ttvcwpqkehm58g), and whether `sheriff remove` removes it, is uncertain.

### “Building the map” (s-rpv4fkdqqguptqd)

Location `_guidelines/tools/4` (tools 4), kind `TextRule`, status `approved`.

Links:

- `implements` → “The map of the specification” (s-zu8ne3wq84zchc4): extension (Views), 13.2.

Todos and notes:

- Note: The continuation file (2026-11-18): this node is to order the domains as “The order of the domains at the same level” (s-uw9n84edf7cbe9n) does, and may drop the branches for the levels of the domains. `generated.ts` `outline()` and its tests change with it. "Readable export" and "mindmap" are to be spelled the same way throughout the tools, the appendix and the README.

**Verdict: must change.** It draws branches that stand for the levels of the domains, which “The map of the specification” (s-zu8ne3wq84zchc4) no longer has. That rule now fixes the top-level branches as the guidelines, the appendix of the tools, the base specification and the technical appendix.

What else must change or be settled:

- Unclear: “The map of the specification” (s-zu8ne3wq84zchc4) does not mention domains, so whether the map still orders them as “The order of the domains at the same level” (s-uw9n84edf7cbe9n) says is a question for the owner. Whether the map is built only where the Views extension is chosen (s-mbmnsnxenmavu3z) is also open (question X3).

### “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7)

Location `_guidelines/tools/5` (tools 5), kind `TextRule`, status `approved`.

Links:

- `implements` → “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j): new form, 10.14, wording changed.
- `implements` → “Gathered values are written beside their field” (s-ju5vcanbjph7mgh): extension (RecordType), 12.9.
- `cites` → “A decision lives on the rule it settled” (s-gqbj8849rf224qa): dropped (former 1.10); the archive names “Everything that bears on a node is kept in that node” (s-x4zcbk5ekebd9ua) as its replacement.
- `cites` → “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj): dropped (former 1.15); the archive names “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) as its replacement.

Todos and notes:

- Note: The continuation file (2026-11-18): this node is to implement “The human-readable export” (s-ce24ynwabt5yx8h) and stop restating it. The decision of that rule (2026-11-17) says the same.
- Note: The continuation file: the reason says that an agent reads `sheriff guide` whole, while “The goal, the reader and the scope” (s-qeensty237e6mmm) says that the reader knows the rest of the specification only in part.
- Note: The continuation file (2026-11-10): the citations of the dropped rules are retargeted to s-x4zcbk5ekebd9ua and s-eferktypcj7njt5 on the owner's behalf.

**Verdict: must change.** It cites two dropped rules, and the decision of “The human-readable export” (s-ce24ynwabt5yx8h) requires a node of the appendix to implement that rule rather than restate it. It does not say how a `TableRule` and the nodes in its cells (s-5fewsp22mmdz7y6) are written, and it still names `RecordType.fields` and fields of type `one of`.

### “The hooks” (s-477gtdrkw34dzxw)

Location `_guidelines/tools/6` (tools 6), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `implements` → “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j): new form, 10.14, wording changed.
- `cites` → “Incoming links are built” (s-bpdqd9v72wg7vsz): new form, 6.4, wording changed.
- `cites` → “What a link is” (s-sn6au3vcr9uy5pm): new form, 6.1, wording changed.
- `cites` → “Links between domains” (s-hr7j7scmfkkjnws): extension (Domains), 11.1.5.
- `cites` → “How a section's approval status is determined” (s-9kfdycuq34beqvs): new form, 1.3.8, wording changed.
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x): appendix of the tools (tools 16).
- `cites` → “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): appendix of the tools (tools 10).
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).
- `cites` → “How each check is made” (s-4kd2pave7vm4hmd): appendix of the tools (tools 7).
- `cites` → “The tests, run before a push” (s-b6qdtghnyha3fhk): appendix of the tools (tools 7.3.5).

Todos and notes:

- On the node itself (2026-10-28, the owner): the export and the map follow a change that reaches the working tree through git only at the next edit or commit; post-merge and post-checkout hooks would close that.
- Note: The continuation file (the reviewer's findings on “The specification's approval status”, s-qzthyh7yqvfhsa2, 2026-11-20): this node is to say what the checks read when the approval procedure runs them.
- Note: The continuation file: the sentence "A check reads the commit being made, because judging anything else would pass or refuse what is not being committed" leaves the main table of checks and becomes part of this node's reason. The node is to say that a check reads only its commit, the guidelines and their schema, and the history and the commit message where its row says so.
- Note: The continuation file: the reason is narrower than the rule, since the code of a project's generator also triggers the derived files.

**Verdict: must change.** The pre-push hook always runs the tests, while “When the checks run” (s-epaw9sgyaajzn8g) and “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t) run them on a push only where the project's own guidelines mention a push. The pre-commit hook runs the SpecSheriff checks before `sheriff types` and before the project's own tools, which contradicts “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax).

What else must change or be settled:

- After an edit, the checks of the tables of the chosen extensions run as well (s-epaw9sgyaajzn8g).
- The timing of `sheriff types` follows “Code generated from approved wordings” (s-qyjw8xez6t6adc3).
- The report of nodes that the reindex made a draft names a domain's header, which belongs to the Domains extension.
- Its `implements` link to the main table of checks stood for when the checks run (question X2).

### “How each check is made” (s-4kd2pave7vm4hmd)

Location `_guidelines/tools/7` (tools 7), kind `section`, status `approved`.

Links:

- `cites` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** Its text speaks of "each check the base lists (§s-jau82aq9juv9zzh)", but the checks are now also listed in the table of checks of each extension (s-gpzs5fcxvp6jkrp). "The base" of the guidelines is a term the owner removed (s-a4rbry4hsu34hy8).

### “Checks made by `sheriff validate`” (s-6uqu6vn5fnp7fwb)

Location `_guidelines/tools/7.1` (tools 7.1), kind `section`, status `approved`.

Links: none.

Todos and notes: none found.

**Verdict: no change found.** Its text names only the command. Whether section 7 is regrouped by table (the main one, Domains, RecordType) is decided at its parent, “How each check is made” (s-4kd2pave7vm4hmd).

### “A key written twice in one object” (s-7zqsstgnuc772ba)

Location `_guidelines/tools/7.1.1` (tools 7.1.1), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5): new form, 5.1, wording changed.

Todos and notes: none found.

**Verdict: no change found.** Its check, row "No object in a file ... assigns two values to one property" (s-d5cgda5bdsn7bzy), keeps its meaning. Only the target of its `implements` link is open (question X1).

### “The schema and a project's extension” (s-xzcw3hv4hmxz7h7)

Location `_guidelines/tools/7.1.2` (tools 7.1.2), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5): new form, 5.1, wording changed.
- `cites` → “The commands” (s-f5rz6b7dhxejjts): appendix of the tools (tools 2).

Todos and notes:

- Note: The continuation file: the bare phrase "the extension" is to take its object.

**Verdict: must change.** It composes the schema of the guidelines with the project's extension alone, while “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) adds the schema of each chosen extension. What an extension may add is now in “How a project may extend the schema” (s-xm8rz4uupb73gu5), which the node does not implement.

What else must change or be settled:

- The composition as moved/report.md ("Third pass") lists it: conditions joined to `$defs/node/allOf`, `linkTypes` and `$defs`, a name composed twice refused, and the archive's own schema.
- "Outside the archive, a sid a node lacks": an archived node now has no sid at all (s-f2b5zvc565s242f).
- A header's index and its status belong to the Domains extension, and NodeKind is renamed (question X4).

### “Sids, locations, terms and names of RecordTypes, counted” (s-vke5hakwf3uyrjs)

Location `_guidelines/tools/7.1.3` (tools 7.1.3), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-12 and 2026-11-13): the node counts only the sids of the nodes of the specification, stops counting locations, and says "each node of the specification".

**Verdict: must change.** An archived node no longer has a sid (s-f2b5zvc565s242f), and the main table no longer checks that no two nodes share a location, so the node counts something that no row asks for. Counting the names of RecordTypes is now row 12.12.1 (s-jh85u42agh5k73x) of the table of checks of the RecordType extension.

### “Locations computed anew” (s-stxmhq3hgfndvn6)

Location `_guidelines/tools/7.1.4` (tools 7.1.4), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file: the node is to say "each node of the specification".

**Verdict: may need a change.** “A node's location” (s-kag2m9tzdnduxdx) no longer states how a domain's header or the files of contracts are located, and it does not say how a node in a cell of a `TableRule` is numbered. It is uncertain which locations the check is to compute (open problem P2).

### “An approved node's approval” (s-95w92rnjuv3sst8)

Location `_guidelines/tools/7.1.5` (tools 7.1.5), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “What an approval covers” (s-5ah25f6gy99panq): new form, 1.3.5, wording changed.
- `cites` → “The commands” (s-f5rz6b7dhxejjts): appendix of the tools (tools 2).

Todos and notes:

- Note: The continuation file: the node is to say "each node of the specification" and to drop "a domain's header" from what the base says.

**Verdict: must change.** Row 10.1.8 (s-cey3k9xxjvkpyqz) also leaves out the nodes of the chosen extensions, which this node checks. The wording an approval covers now includes the examples and, for a node in a cell, the text cells of its row and the headings of its column and group (s-5ah25f6gy99panq).

### “A removed node and the archive” (s-j4webte36gkraju)

Location `_guidelines/tools/7.1.6` (tools 7.1.6), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-12): the node finds a removed node in the archive by its wording at the time of removal, and looks up its approvals by the sid read from the commit before the removal. "A domain's header" is to go.

**Verdict: must change.** The node looks a removed node up in the archive by its sid, but an archived node has no sid (s-f2b5zvc565s242f). The new duties of the archive are not checked: a replacement must be a node of the specification, and it is passed on to the next replacement when the replacement itself is archived.

### “Outgoing links and citations” (s-qzyacnqwvaeaps4)

Location `_guidelines/tools/7.1.7` (tools 7.1.7), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Incoming links are built” (s-bpdqd9v72wg7vsz): new form, 6.4, wording changed.

Todos and notes:

- Note: The continuation file: at the move this node gets `implements` links to “Outgoing links are written” (s-yku67x4mehbmv6f) and “A cited node is also linked” (s-cxtt6jvhqcey2k9). It is to look for a link's target only among the nodes of the specification.

**Verdict: must change.** Its link to “Incoming links are built” (s-bpdqd9v72wg7vsz) no longer covers what it checks, which is now stated in “Outgoing links are written” (s-yku67x4mehbmv6f) and “A cited node is also linked” (s-cxtt6jvhqcey2k9). It resolves targets among "the sids that exist", which included the archive, and its list of properties left unread differs from the list in “A cited node is also linked” (s-cxtt6jvhqcey2k9).

### “The NodeKinds at the ends of a link” (s-pvnnr844f3y964m)

Location `_guidelines/tools/7.1.8` (tools 7.1.8), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** It uses the name NodeKind, which the owner removed (“A project's own kinds of node”, s-vsh384ybt4w25a2, decision of 2026-11-10). Its row (s-s79v9mmyw56hgpx) now checks “Links between terms” (s-76dutms9uv6uha2), which the node may implement directly.

### “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23)

Location `_guidelines/tools/7.1.9` (tools 7.1.9), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Gathered values are written beside their field” (s-ju5vcanbjph7mgh): extension (RecordType), 12.9.
- `implements` → “How a section's approval status is determined” (s-9kfdycuq34beqvs): new form, 1.3.8, wording changed.

Todos and notes: none found.

**Verdict: must change.** Two of its four items are now checks of extensions: the index of a header (row 11.3.2, s-6n2ab7escdtspwe) and the gathered values (row 12.12.14, s-93jpnb4c96qhwbu), so its single link to the main table no longer names the tables that list them. The status of a domain's header has left “How a section's approval status is determined” (s-9kfdycuq34beqvs), and row 11.3.1 (s-ctj5v22yn7wr7n4) now requires exactly one header for each domain, which this node does not check.

### “Words running in capitals” (s-e2vdhfsndy5stq9)

Location `_guidelines/tools/7.1.10` (tools 7.1.10), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-13): the node is to read drafts too, and to drop "a domain's header". The abbreviations that row 10.1.17 exempts are still counted toward the limit of three; this is to be raised with the owner at the step that changes the SpecSheriff tools.

**Verdict: must change.** Row 10.1.17 (s-83natrftdsmttsu) now covers every sentence of the specification, while the node reads only approved nodes, sections and headers. The row exempts abbreviations, which the tools count toward the limit (open problem P5).

### “A section with a rule in it” (s-zhen42p6mnaxu7w)

Location `_guidelines/tools/7.1.11` (tools 7.1.11), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “A section contains rules and requires nothing” (s-7445ahgjck2aefg): new form, 8.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** It cites “A section contains rules and requires nothing” (s-7445ahgjck2aefg) for what counts as a rule, which is now stated in “What is considered a rule of a section” (s-pctqj9wqaq8762t). That rule says nothing of a RecordType, a `TableRule` or a node in a cell, so the node may also have to say how the tools count them.

### “`consumes` and `exempts` links” (s-qvgzubkrafadqgf)

Location `_guidelines/tools/7.1.12` (tools 7.1.12), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “The implementation of an approved rule” (s-6fw72j65jkqrfpf): new form, 9.2, wording changed.
- `cites` → “What a link is” (s-sn6au3vcr9uy5pm): new form, 6.1, wording changed.

Todos and notes:

- Row 10.1.19 (s-6u54kfn4ze29r6h), the owner, 2026-11-13: `sheriff validate` looks for `§<the target's sid>` in the text of every node that declares an `exempts` link, and refuses the node where it is missing. A citation in the title or the reason does not count. The test is written first and seen failing.
- Note: The continuation file (2026-11-13): the node checks only which nodes the link connects, still says NodeKind, and names `consumes`, which belongs to the Domains extension.

**Verdict: must change.** Row 10.1.19 (s-6u54kfn4ze29r6h) now also requires that the text of the exempting node cite the target (s-gf6n8ge4mke3pr2), which the node does not check. Its half on `consumes` is now row 11.3.3 (s-rdavpdea67hsntf) of the Domains extension.

### “No circular dependency between the domains” (s-vuujweu57sxsa58)

Location `_guidelines/tools/7.1.13` (tools 7.1.13), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** Its check is now row 11.3.4 (s-bncp7gtyaukur8e) of the table of checks of the Domains extension (s-rp2nxe3cga2p26x), so its `implements` link to the main table names a table that no longer lists it. No change to its wording was found.

### “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj)

Location `_guidelines/tools/7.1.14` (tools 7.1.14), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A domain uses another domain's RecordTypes only from the sections it declares” (s-5yvpn4zhuqmv5bq): dropped (former 1.39); the archive names “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) as its replacement.

Todos and notes:

- Note: The continuation file (2026-11-14): `sheriff validate` holds no such check, and nothing in `skills/tools/src` cites this node or s-5yvpn4zhuqmv5bq. The node was to stop checking `consumes` links against RecordTypes and to examine field types nested in other field types. That note recommended refusing; the agreed rows 12.12.15 and 12.12.16 say "reported by the node's sid".

**Verdict: must change.** It implements the dropped rule A domain uses another domain's RecordTypes only from the sections it declares, whose successor “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) forbids such references whatever the `consumes` links say. Rows 12.12.15 (s-rpkq8y79fwg5k92) and 12.12.16 (s-hn9m9dhxaazjn3y) state the new checks, and no node of the appendix implements them.

### “A header's level” (s-uxmkwbnpgtjzkgv)

Location `_guidelines/tools/7.1.15` (tools 7.1.15), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** A domain's level is now optional (s-nkyty4dy9x2v2a4), and the check is row 11.3.6 (s-j3v4y4d3sbmdgfp) of the Domains extension, which applies only where the project's own guidelines define levels.

### “What a RecordType variant must agree with” (s-c2r9jndrjbtbsv6)

Location `_guidelines/tools/7.1.16` (tools 7.1.16), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Where a value is declared” (s-xfwuvd3funutmsw): dropped (former 1.32); the archive names “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) as its replacement.
- `cites` → “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks): extension (RecordType), 12.7.
- `cites` → “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c): appendix of the tools (tools 7.1.18).

Todos and notes:

- Note: The continuation file (2026-11-19): the node states the new check that the names of a variant's fields differ from those of its RecordType, in place of counting the fields of type `variant`. It states that a variant without a `refines` link is refused, and that a variant is declared in the same section as its RecordType.

**Verdict: must change.** “RecordType variants” (s-z3dnru6qqdf9m6j) now declares a variant where its RecordType is declared and drops the field of type `variant`, so three of the node's six items no longer hold. It implements the dropped rule Where a value is declared, and its checks are now rows 12.12.4 to 12.12.10 of the RecordType extension.

### “An identifier followed to its end” (s-3anv9qcmx8pwp2w)

Location `_guidelines/tools/7.1.17` (tools 7.1.17), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks): extension (RecordType), 12.7.

Todos and notes: none found.

**Verdict: must change.** A field of type `identifier of` is now a field with the keyword `identifierOf` (rows 12.12.2, s-qpdnkejr5xzc6j3, and 12.12.3, s-cqys6wqrnfzu5ac). The check belongs to the table of the RecordType extension, not to the main table.

### “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c)

Location `_guidelines/tools/7.1.18` (tools 7.1.18), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks): extension (RecordType), 12.7.
- `implements` → “How a domain's added values find their field” (s-gzfq3x8hesj227e): dropped (former 1.29); the archive names no replacement.

Todos and notes: none found.

**Verdict: must change.** Two of its four sources, the lists the domains add and the names of the domains, are gone from “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks), which adds the names of the parts of the base (s-gqavjzcmubg5pvk) and the sids of the nodes of one kind (s-mt6auv3jz8m5gzh). Four of its six refusals concern the dropped lists, and it implements the dropped rule How a domain's added values find their field.

What else must change or be settled:

- Rows 12.12.11 to 12.12.13 name no implementing node; this node is the closest (see "Rows of the tables of checks that no node of the appendix implements").

### “An object in a list” (s-cdachayybfvg4na)

Location `_guidelines/tools/7.1.19` (tools 7.1.19), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj): dropped (former 1.15); the archive names “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) as its replacement.

Todos and notes: none found.

**Verdict: must change.** It implements the dropped rule A member of `TextRule.list` may be an object, which the archive replaces by “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5). Its row is now s-yuu4ccgch68yzxb, which names the property as `TextRule.list.property`.

### “No copy of the SpecSheriff guidelines” (s-6bmnsbskg6en4nf)

Location `_guidelines/tools/7.1.20` (tools 7.1.20), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** “How a project uses the SpecSheriff guidelines and their extensions” (s-bsya3febm6u64ab) forbids a copy of the chosen extensions too, and the node refuses only `spec.json` and `tools.json`. Whether `tools.json` still counts as a copy of the guidelines is uncertain, since the appendix of the tools is no longer part of them (s-a4rbry4hsu34hy8).

### “`implements` and `refines` links of the appendices and a project's own guidelines” (s-yprj7d6tnvauggr)

Location `_guidelines/tools/7.1.21` (tools 7.1.21), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-13): the node is to state which kind of node must implement which other kind. `validate.ts` (the function `appendices`) is to stop refusing a rule of the technical debt that refines no node of the base.

**Verdict: must change.** Its three rows changed: row 10.1.22 (s-694brc6fytwxc5v) exempts the technical debt, row 10.1.23 (s-9c8t99cz34p28sg) asks a rule of the appendix of the tools to implement a rule for keeping the specification, and row 10.1.24 (s-3dashdedvu4xgfb) admits a rule of a chosen extension as the target. The node says only that the links are resolved, not what each row requires.

### “A file of the technical appendix named after a domain” (s-gvafe6bnstwab8b)

Location `_guidelines/tools/7.1.22` (tools 7.1.22), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “What the technical appendix contains” (s-vj7ercem526zd6v): new form, 4.1, wording changed.

Todos and notes:

- Note: The continuation file: how a section's title names a file of the technical appendix is to be settled.

**Verdict: must change.** “What the technical appendix contains” (s-vj7ercem526zd6v) gives the appendix a section for each top-level section of the base, and row 11.3.5 (s-vghy37e3p2325ah) matches a section by name and place to a domain or a section of the base. The node still matches file names against the names of the domains alone.

### “How a project's own check is run” (s-7pk89t8z6wymmj9)

Location `_guidelines/tools/7.1.23` (tools 7.1.23), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A project's own checks join the shared ones” (s-2fau85dfyyeq66m): new form, 10.8, wording changed.

Todos and notes:

- On the node itself (2026-11-06, the agent): a project's own check and its generator run with no time limit; a limit is to be named, as `review.minutes` does for the reviewer, with the refusal where it is passed.

**Verdict: may need a change.** “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax) now runs the project's own checks in a step of their own, before the checks of the SpecSheriff guidelines, while this node runs them inside `sheriff validate`. Whether that satisfies the new order is uncertain.

### “Checks made by `sheriff binding`” (s-p34692nwceaxq2p)

Location `_guidelines/tools/7.2` (tools 7.2), kind `section`, status `approved`.

Links: none.

Todos and notes: none found.

**Verdict: no change found.** Its text names only the command.

### “The symbols a commit changes” (s-2x58az67bm6cxq2)

Location `_guidelines/tools/7.2.1` (tools 7.2.1), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-11): the node counts every line holding a SpecTag as changed, even where only the prose beside an unchanged SpecTag changes, and it still exempts a rename. It is also to say how adding or deleting a comment, a Python docstring, and a SpecTag moved from a test's name into its mark are counted.

**Verdict: must change.** “A change to a SpecTag” (s-9j2mmnuuwmx5ksn) no longer exempts renaming an identifier, and “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) makes any change in a file bound as a whole a change to its code, which the node does not cover. The node describes what A change to a SpecTag requires but does not implement that rule.

### “SpecTags on the system's code” (s-9rtrj24myzjvshu)

Location `_guidelines/tools/7.2.2` (tools 7.2.2), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn): new form, 9.5, wording changed.
- `implements` → “What is considered the system's code” (s-hheus6f395ynqvc): new form, 9.1, reworded with the same meaning.
- `cites` → “The symbols a commit changes” (s-2x58az67bm6cxq2): appendix of the tools (tools 7.2.1).
- `cites` → “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): appendix of the tools (tools 7.2.3).
- `cites` → “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc): appendix of the tools (tools 9).

Todos and notes:

- Note: The continuation file (2026-11-17): the node is to say which formats allow no comments, where the SpecTags of such a file are kept, and that the tools read the first comment of a file in a language they have no description for.
- Note: The continuation file: what a SpecTag on a symbol may name is to be narrowed (`binding.ts` asks only that the node exist). The appendix is to state how the tools read the SpecTags in the tests of the repository's own tools.

**Verdict: must change.** It reads SpecTags on symbols only, while “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) adds SpecTags at the start of a file and entries in the bindings file. It reports unbound unchanged code while the specification is a draft, while “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) now lets it pass silently then, and warns once or refuses while the specification is approved.

### “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47)

Location `_guidelines/tools/7.2.3` (tools 7.2.3), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “The specification's approval status” (s-qzthyh7yqvfhsa2): new form, 10.6, wording changed.
- `implements` → “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn): new form, 9.5, wording changed.
- `cites` → “The commands” (s-f5rz6b7dhxejjts): appendix of the tools (tools 2).

Todos and notes:

- Row 10.1.27 (s-pa8t49pqpwscuq7), the agent, 2026-11-20: the tests listed for this check test the former mechanism, a rule that stood for the approval status and the withdrawal of its approval. They are rewritten for the entry that records the approval status, together with this node, `approve.ts`, `binding.ts`, `approvals.ts` and `model.ts`.

**Verdict: must change.** It reads the rule that approves the specification in `project.json`, while “The specification's approval status” (s-qzthyh7yqvfhsa2) records the status in entries, which row 10.1.27 (s-pa8t49pqpwscuq7) checks. Its behaviour for a draft and an approved specification must follow “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn) and “The specification's strict flag” (s-q3pfzyaxvpr2zj2).

### “The SpecTags the tests carry” (s-utf4mbt7ref8g9c)

Location `_guidelines/tools/7.2.4` (tools 7.2.4), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Where a SpecTag may appear” (s-sfjka4zc4rhfu67): new form, 10.10, wording changed.
- `implements` → “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): new form, 9.7, wording changed.
- `implements` → “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn): new form, 9.5, wording changed.
- `cites` → “The test comes before the code” (s-rah8b37kytb682y): new form, 1.4.1, wording changed.
- `cites` → “The commands” (s-f5rz6b7dhxejjts): appendix of the tools (tools 2).
- `cites` → “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): appendix of the tools (tools 7.2.3).

Todos and notes:

- Note: The continuation file: `sheriff binding` stops accepting a test that names a term (`binding.ts:198`). The node still exempts a test whose only change puts `@spec ` before a bare sid, and `binding.ts` (`onlySpecTagged`) is to stop forgiving that form.

**Verdict: must change.** A test now names a rule only (“A test's reference to its rule”, s-nrjxfvpkq3m8hzm), and “The test comes before the code” (s-rah8b37kytb682y) no longer exempts a rewritten reference. Its last two items enforce that the tests of a project's own check carry the SpecTag of the rule listing it, which “Where a SpecTag may appear” (s-sfjka4zc4rhfu67) no longer requires and no row lists.

What else must change or be settled:

- Its behaviour for a draft specification follows “Code and tests without a SpecTag” (s-kkbqcb9xrpaepwn).

### “A node's `meta.code` and `meta.tests`” (s-t383grkn3q68dpf)

Location `_guidelines/tools/7.2.5` (tools 7.2.5), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-17): the node is to say which formats allow no comments and where the SpecTags of such a file are kept.

**Verdict: must change.** The tools now build `meta.code` and `meta.tests` themselves (s-rwqzepmrt77rv35), and in the guidelines and the extensions they list only the code and the tests of this repository. The node compares lists written by hand, and does not cover files bound by SpecTags at their start or by the bindings file (s-kgbzk2ph9e6jfb4).

### “A list and its declaration” (s-5hb9k2e34dgn284)

Location `_guidelines/tools/7.2.6` (tools 7.2.6), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj): dropped (former 1.15); the archive names “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) as its replacement.

Todos and notes:

- Row 10.1.35 (s-f5mm7tagez38ffz), the agent, 2026-11-20, from the owner's rulings of 2026-11-13: `TextRule.list.declaredIn` is replaced by `jsonSchema` ({file, pointer}) and `valueList` ({file, symbol}); `binding.ts` checks each value with Ajv against the schema at `pointer`, and an `enum` there for values absent from the list; the function `declaration` goes; the nodes s-tgrnpagrb58tya7, s-sn6au3vcr9uy5pm and s-xr5xxa9cxf2mq5u switch to the new properties.

**Verdict: must change.** It implements the dropped rule A member of `TextRule.list` may be an object, and its row 10.1.35 (s-f5mm7tagez38ffz) now checks the values against JSON Schema through `TextRule.list.jsonSchema` and `TextRule.list.valueList`. That row disagrees with “How a project's own kind of node is declared and checked” (s-hhnahzmhahf8jht) and with the schema, which keep `declaredIn` (open problem P1).

### “Citing a node only by its sid” (s-nh8b2hjvzasdxmd)

Location `_guidelines/tools/7.2.7` (tools 7.2.7), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A node's location” (s-kag2m9tzdnduxdx): new form, 8.5, wording changed.
- `implements` → “The fixtures of a check's tests are left out of the checks of citations and locations” (s-6hha5en226aj8hu): new form, 10.11, reworded with the same meaning.
- `cites` → “Outgoing links and citations” (s-qzyacnqwvaeaps4): appendix of the tools (tools 7.1.7).

Todos and notes: none found.

**Verdict: must change.** It cites “A node's location” (s-kag2m9tzdnduxdx) for citing a node by its sid, which is now stated in “A node is cited by its sid” (s-9spq78kdwsxr759). It still names NodeKind (question X4).

### “Generated copies against the nodes” (s-dbk2vyeg8z5jxna)

Location `_guidelines/tools/7.2.8` (tools 7.2.8), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A project's own code generators” (s-km4x4s26kv7pjze): new form, 10.9, wording changed.
- `cites` → “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j): new form, 10.14, wording changed.
- `cites` → “Where the types and RuntimeChecks generated from the RecordTypes are written” (s-pvzms7d8kxb8dk2): appendix of the tools (tools 17).
- `cites` → “What a RecordType generates” (s-suv42g8r3ra2h6b): appendix of the tools (tools 18).
- `cites` → “The commands” (s-f5rz6b7dhxejjts): appendix of the tools (tools 2).

Todos and notes:

- On the node itself (2026-11-06, the agent): two generators, or a generator and the list of the files for the types, may print the same path, so the mismatch never clears; a path printed twice is to be refused.
- Note: The continuation file (2026-11-18 and 2026-11-19): the node changes with “Code generated from approved wordings” (s-qyjw8xez6t6adc3), and its refusal of a RecordType with two fields of type `variant` goes.

**Verdict: must change.** Row 10.1.39a (s-dwxjxb7rw4w5yn3) compares a kept copy with what the approved wordings of its nodes produce (s-qyjw8xez6t6adc3), while the node compares it with the last commit while a node is a draft and reports that node. Its last refusal, a RecordType with two fields of type `variant`, has no ground now that “RecordType variants” (s-z3dnru6qqdf9m6j) drops that type.

### “A node whose tests or code lag behind it” (s-txbwsthdqhvyzd2)

Location `_guidelines/tools/7.2.9` (tools 7.2.9), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “The test comes before the code” (s-rah8b37kytb682y): new form, 1.4.1, wording changed.
- `cites` → “A node's `meta.code` and `meta.tests`” (s-t383grkn3q68dpf): appendix of the tools (tools 7.2.5).

Todos and notes:

- Row 10.1.40 (s-ddd2e96uke4y83j), the agent, 2026-11-20: `sheriff binding` stops reporting a draft rule whose tests or code lag behind it; the function `drift` now checks drafts too.
- Row 10.1.40 (s-ddd2e96uke4y83j), the agent, 2026-11-20: the check looks only at the rules whose wording or tests change in the commit; it compares the bound tests and symbols, not whole files; it reads the trailer of the commit message; it refuses only while the specification is approved.
- Note: The continuation file (2026-11-19 and 2026-11-20): a wording for this node is queued, to be proposed to the owner after the agreed changes to row 10.1.40, 1.3.6 and 10.4. The current behaviour reads the history of every node at every commit, against the rule that a check never reads what the commit does not hold.

**Verdict: must change.** Row 10.1.40 (s-ddd2e96uke4y83j) looks only at the approved rules whose wording or tests change in the commit, reads the trailer, compares the bound tests and symbols, and refuses while the specification is approved. The node reads the history of whole files for every node and only reports.

### “An approved node without code or a test” (s-jgejd5rpd9d43pd)

Location `_guidelines/tools/7.2.10` (tools 7.2.10), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “A project's own kinds of node” (s-vsh384ybt4w25a2): new form, 8.3, wording changed.
- `cites` → “The implementation of an approved rule” (s-6fw72j65jkqrfpf): new form, 9.2, wording changed.
- `cites` → “What a link is” (s-sn6au3vcr9uy5pm): new form, 6.1, wording changed.

Todos and notes: none found.

**Verdict: must change.** Row 10.1.41 (s-c4y63t285gg7jz7) checks only the approved rules that a commit includes, and refuses while the specification is approved, while the node checks every approved node and only reports. The exclusions now follow “The implementation of an approved rule” (s-6fw72j65jkqrfpf), an exemption holds only while the exempting node is approved (s-gf6n8ge4mke3pr2), and the node still names NodeKind.

### “Checks made by the other commands” (s-bgegrkhrgpefs69)

Location `_guidelines/tools/7.3` (tools 7.3), kind `section`, status `approved`.

Links: none.

Todos and notes: none found.

**Verdict: no change found.** Its text names the commands of the section. It changes only if a new node, such as one for the run of the checks by the approval procedure (s-qzthyh7yqvfhsa2), is placed in this section.

### “A citation outside the specification” (s-m8nmfsxkcfu7cjp)

Location `_guidelines/tools/7.3.1` (tools 7.3.1), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “The fixtures of a check's tests are left out of the checks of citations and locations” (s-6hha5en226aj8hu): new form, 10.11, reworded with the same meaning.

Todos and notes:

- Row 10.1.39 (s-e84nggntkrcyumq), the agent, 2026-11-20: `sheriff citations` stops looking for sids among the archived nodes, since an archived node has no sid of its own (s-f2b5zvc565s242f).
- Note: The continuation file: "documents" is to become "documentation" (question X5).

**Verdict: must change.** It resolves sids against the archive too, but an archived node has no sid (s-f2b5zvc565s242f), as the todo of its row says. Its word "documents" clashes with the documents of a domain in “A part of the specification can be read on its own” (s-k73czmpkazcx7mu).

### “An edit judged before it is made” (s-st6td4mua9uqt9z)

Location `_guidelines/tools/7.3.2` (tools 7.3.2), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `implements` → “Where a SpecTag may appear” (s-sfjka4zc4rhfu67): new form, 10.10, wording changed.
- `cites` → “The symbols a commit changes” (s-2x58az67bm6cxq2): appendix of the tools (tools 7.2.1).
- `cites` → “An approved node's approval” (s-95w92rnjuv3sst8): appendix of the tools (tools 7.1.5).
- `cites` → “How an approval is recorded” (s-v4qus7raqnwzneb): appendix of the tools (tools 11).

Todos and notes:

- Note: The continuation file: `guard.ts` refuses nothing under the former item on a project's own check changed without a test, though this node says it does. It checks the item on code without a test only for a `TextRule`, not for a rule of a project's own kind.

**Verdict: must change.** “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp) dropped the item on a project's own check changed without a test, which this node still lists, and it added the entries of the approval status, of the `strict` flag and of the chosen extensions to what only a procedure may change. The refusal of code without a test must also cover a rule of a project's own kind.

### “A commit message names the nodes its code implements” (s-qqs2svksmjct753)

Location `_guidelines/tools/7.3.3` (tools 7.3.3), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.

Todos and notes:

- Note: The continuation file (2026-11-11): `message.ts` stops refusing a section or a header in a message, and the third test of s-ef93u6cnbs2sevr goes; this node's refusal of a header or a section goes with them.

**Verdict: must change.** “The nodes a commit message names” (s-ef93u6cnbs2sevr) no longer forbids naming a section or a header, which this node still refuses. The node does not implement that rule, and it does not count code bound as a whole file (s-kgbzk2ph9e6jfb4).

### “The review of a commit” (s-vp24dqydygztqbt)

Location `_guidelines/tools/7.3.4` (tools 7.3.4), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “What the reviewer is given” (s-nyh9yk22ba6g77q): new form, 10.4, wording changed.
- `implements` → “How code is bound to its rules” (s-kgbzk2ph9e6jfb4): new form, 1.5.2, wording changed.
- `cites` → “What is considered the system's code” (s-hheus6f395ynqvc): new form, 9.1, reworded with the same meaning.
- `cites` → “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): appendix of the tools (tools 10).
- `cites` → “The symbols a commit changes” (s-2x58az67bm6cxq2): appendix of the tools (tools 7.2.1).

Todos and notes:

- Row 10.1.43 (s-zn4vrdpnv9bch62), the agent, 2026-11-20: the reviewer is also given the changed tests that are part of the system's code, since "code" in that check includes the tests, and a test that checks what the rule does not say is a defect too.
- Note: The continuation file (2026-11-17): the node changes with “How code is bound to its rules” (s-kgbzk2ph9e6jfb4). Whether the reviewer refuses a SpecTag that names no node and does not say what the technology requires is to be settled (doubt D2).

**Verdict: must change.** “What the reviewer is given” (s-nyh9yk22ba6g77q) adds two judgements and their input: the rules whose implementation the message says needs no change (row 10.1.43a, s-nudrdn5xvcg262k), and approved nodes of the technical appendix with their rules of the base (row 10.1.25a, s-4p9amamvp2bry7b). The node runs the review only on a commit that changes code, and gives the reviewer `RecordType.fields`, which is now a RecordType's `schema`.

### “The tests, run before a push” (s-b6qdtghnyha3fhk)

Location `_guidelines/tools/7.3.5` (tools 7.3.5), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “Tests at a push while the specification is a draft” (s-xhcmchcngykvn2k): dropped (former 5.3); the archive names “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t) as its replacement.
- `cites` → “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): appendix of the tools (tools 7.2.3).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).

Todos and notes: none found.

**Verdict: must change.** It implements the dropped rule Tests at a push while the specification is a draft, which the archive replaces by “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t). Under that rule and “When the checks run” (s-epaw9sgyaajzn8g), the tests run on a push only where the project's own guidelines mention a push, and the approval status is read from entries (s-qzthyh7yqvfhsa2).

### “The SpecTag, and how a symbol carries it” (s-5z5gnu7pahr82xp)

Location `_guidelines/tools/8` (tools 8), kind `TextRule`, status `approved`.

Links:

- `implements` → “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): new form, 9.7, wording changed.
- `implements` → “How code is bound to its rules” (s-kgbzk2ph9e6jfb4): new form, 1.5.2, wording changed.
- `cites` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc): appendix of the tools (tools 9).

Todos and notes:

- Note: The continuation file: at the move, this node's link to s-rwqzepmrt77rv35 is retargeted to “The SpecTag” (s-8xw4mgvpexyvw5q), and the decision of 2026-10-27 of the former 3.3 is recorded here and in “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc).
- Note: The continuation file (2026-11-17): the node is to say which formats allow no comments, where the SpecTags of such a file are kept, and that the tools read the first comment of a file in a language they have no description for.
- Note: The continuation file (doubt D2): "the reason it carries none" may become "what the technology the system is built with requires of it".

**Verdict: must change.** “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) adds SpecTags at the start of a file and entries in the bindings file, while this node knows only a SpecTag above a symbol. Its link to “A node's lists of its code and its tests” (s-rwqzepmrt77rv35) no longer reaches the definition of a SpecTag, which is now “The SpecTag” (s-8xw4mgvpexyvw5q).

### “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc)

Location `_guidelines/tools/9` (tools 9), kind `TextRule`, status `approved`.

Links:

- `implements` → “A node's lists of its code and its tests” (s-rwqzepmrt77rv35): new form, 9.7, wording changed.
- `implements` → “The test comes before the code” (s-rah8b37kytb682y): new form, 1.4.1, wording changed.

Todos and notes:

- Note: The continuation file: its `implements` link to s-rwqzepmrt77rv35 is retargeted to “The SpecTag” (s-8xw4mgvpexyvw5q).

**Verdict: must change.** Where a test's reference stands is now required by “A test's reference to its rule” (s-nrjxfvpkq3m8hzm) and “The SpecTag” (s-8xw4mgvpexyvw5q), not by its two current targets. A test now names a rule, not any node, while its title says "the node it is written from".

### “Who runs the reviewer” (s-xr5xxa9cxf2mq5u)

Location `_guidelines/tools/10` (tools 10), kind `TextRule`, status `approved`.

Links:

- `implements` → “What the reviewer is given” (s-nyh9yk22ba6g77q): new form, 10.4, wording changed.
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “The plugin for Codex CLI carries everything its work needs” (s-2pdy9gw2jrjvfb4): appendix of the tools (tools 15).

Todos and notes:

- On the node itself (2026-10-27, the owner): describe the Gemini CLI as a runner, then any service speaking the OpenAI-compatible API.
- On the node itself (2026-11-06, the agent): on Windows the time limit ends Node and leaves the native Codex running; the whole tree of processes is to be ended.
- Row 10.1.35 (s-f5mm7tagez38ffz), the agent, 2026-11-20: this node's `TextRule.list` switches to the new properties `jsonSchema` and `valueList`.

**Verdict: must change.** It cites “What the reviewer is given” (s-nyh9yk22ba6g77q) for an answer that cannot be read, which is now in “A commit whose review cannot be carried out is refused” (s-94k7b6r5kf65udf). Its list must follow the todo of row 10.1.35.

What else must change or be settled:

- Unclear: whether the verdict's schema must change for the two new judgements of “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t).

### “How an approval is recorded” (s-v4qus7raqnwzneb)

Location `_guidelines/tools/11` (tools 11), kind `TextRule`, status `approved`.

Links:

- `implements` → “Only a node's owners approve it” (s-67vekyup7y8smap): new form, 1.3.4, wording changed.
- `implements` → “What an approval covers” (s-5ah25f6gy99panq): new form, 1.3.5, wording changed.
- `implements` → “The specification's approval status” (s-qzthyh7yqvfhsa2): new form, 10.6, wording changed.
- `cites` → “How a section's approval status is determined” (s-9kfdycuq34beqvs): new form, 1.3.8, wording changed.
- `cites` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).

Todos and notes:

- Note: The continuation file (2026-11-18): the appendix is to say where the tools find the last approved wording, since an approval holds only its fingerprint.

**Verdict: must change.** It refuses the rule that approves the specification unless an owner approves it, while “The specification's approval status” (s-qzthyh7yqvfhsa2) has no such rule and records the status in entries. Its fingerprint must also cover the examples and, for a node in a cell, the text cells of its row and the headings of its column and group (s-5ah25f6gy99panq).

What else must change or be settled:

- The entries of “The specification's strict flag” (s-q3pfzyaxvpr2zj2) are recorded in the same way, and the node describes neither kind of entry.
- An owner may approve a whole `TableRule`, which approves every draft node in its cells (s-67vekyup7y8smap).
- A withdrawal is also refused for a node of a chosen extension, as “Who may withdraw a node's approval” (s-fpq35tf3pehgk64) says, and the node should implement that rule.
- The paragraph that keeps an empty list of a field of type `one of` in the fingerprint, and NodeKind (question X4).

### “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p)

Location `_guidelines/tools/12` (tools 12), kind `TextRule`, status `approved`.

Links:

- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `implements` → “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax): new form, 10.12, wording changed.
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).
- `cites` → “The plugin for Codex CLI carries everything its work needs” (s-2pdy9gw2jrjvfb4): appendix of the tools (tools 15).
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).
- `cites` → “The project's own tools in a git hook” (s-n4m5zvh96yb299p): appendix of the tools (tools 13).

Todos and notes: none found.

**Verdict: may need a change.** “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax) lets a commit through, with a notice, wherever the SpecSheriff tools cannot run, while this node refuses where Node.js is missing or too old. Whether "cannot run" covers that case is uncertain, since the owner's decision of 2026-11-14 on that rule concerned tools that are not found.

### “The project's own tools in a git hook” (s-n4m5zvh96yb299p)

Location `_guidelines/tools/13` (tools 13), kind `TextRule`, status `approved`.

Links:

- `implements` → “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax): new form, 10.12, wording changed.
- `cites` → “What is considered the system's code” (s-hheus6f395ynqvc): new form, 9.1, reworded with the same meaning.
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).

Todos and notes: none found.

**Verdict: must change.** It runs the project's own tools after the SpecSheriff checks, while “The order in which tools and checks run on a commit and on a push” (s-pcnyfp7gev7syax) runs the SpecSheriff checks last, after the tools that rewrite files, the generators and the project's checks. It fails a hook where a project's tool changes the staged files, which that rule allows in its first step, and the rule takes the tools that rewrite files from the project's own guidelines, not from `.githooks/<hook>.d/`.

### “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5)

Location `_guidelines/tools/14` (tools 14), kind `TextRule`, status `approved`.

Links:

- `implements` → “How a project uses the SpecSheriff guidelines and their extensions” (s-bsya3febm6u64ab): new form, 2.5, wording changed.
- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).
- `cites` → “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): appendix of the tools (tools 10).

Todos and notes: none found.

**Verdict: must change.** The plugin must deliver the extensions of the guidelines with their schemas and the tools that implement their rules (s-mbmnsnxenmavu3z, s-bsya3febm6u64ab), and the utility with which an owner chooses them (s-9ttvcwpqkehm58g). The node lists neither.

### “The plugin for Codex CLI carries everything its work needs” (s-2pdy9gw2jrjvfb4)

Location `_guidelines/tools/15` (tools 15), kind `TextRule`, status `approved`.

Links:

- `implements` → “How a project uses the SpecSheriff guidelines and their extensions” (s-bsya3febm6u64ab): new form, 2.5, wording changed.
- `cites` → “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x): appendix of the tools (tools 16).
- `cites` → “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5): appendix of the tools (tools 14).
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).
- `cites` → “Who runs the reviewer” (s-xr5xxa9cxf2mq5u): appendix of the tools (tools 10).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).

Todos and notes: none found.

**Verdict: must change.** The plugin must deliver the extensions of the guidelines with their schemas and the tools that implement their rules (s-mbmnsnxenmavu3z, s-bsya3febm6u64ab), and the utility with which an owner chooses them (s-9ttvcwpqkehm58g). The node lists neither.

### “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x)

Location `_guidelines/tools/16` (tools 16), kind `TextRule`, status `approved`.

Links:

- `implements` → “An agent's edit is checked before it is made” (s-83ev4wwesbwnhnp): new form, 10.3, wording changed.
- `implements` → “The main table of checks” (s-jau82aq9juv9zzh): new form, 10.1, wording changed.
- `cites` → “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54): appendix of the tools (tools 3).
- `cites` → “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p): appendix of the tools (tools 12).
- `cites` → “The hooks” (s-477gtdrkw34dzxw): appendix of the tools (tools 6).
- `cites` → “An edit judged before it is made” (s-st6td4mua9uqt9z): appendix of the tools (tools 7.3.2).

Todos and notes: none found.

**Verdict: may need a change.** Nothing in the new form contradicts its text, which defers to “The hooks” (s-477gtdrkw34dzxw) and “An edit judged before it is made” (s-st6td4mua9uqt9z). Its `implements` link to the main table stood for when the checks run, which “When the checks run” (s-epaw9sgyaajzn8g) now states (question X2).

### “Where the types and RuntimeChecks generated from the RecordTypes are written” (s-pvzms7d8kxb8dk2)

Location `_guidelines/tools/17` (tools 17), kind `TextRule`, status `approved`.

Links:

- `implements` → “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9): extension (RecordType), 12.3.
- `cites` → “What the technical appendix contains” (s-vj7ercem526zd6v): new form, 4.1, wording changed.

Todos and notes: none found.

**Verdict: may need a change.** It calls “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9) "the rule on data structures", which that rule no longer is, since what a RecordType contains moved to “What a RecordType contains” (s-6eb92ddch7shuvu). Two points are uncertain: whether `sheriff types` writes anything where the RecordType extension is not chosen (question X3), and whether a SpecTag on a generated type that names a RecordType meets row 10.1.26, which says that a SpecTag names a rule (open problem P6).

### “What a RecordType generates” (s-suv42g8r3ra2h6b)

Location `_guidelines/tools/18` (tools 18), kind `TextRule`, status `approved`.

Links:

- `implements` → “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9): extension (RecordType), 12.3.
- `cites` → “The SpecTag, and how a symbol carries it” (s-5z5gnu7pahr82xp): appendix of the tools (tools 8).
- `cites` → “A RecordType its variants refine” (s-nk8td3ez58gahc4): appendix of the tools (tools 19).

Todos and notes:

- Note: The continuation file (2026-11-15 and 2026-11-19): "required" becomes "guaranteed"; the generated RuntimeCheck refuses a field nobody declared; the generated JSON Schema uses pairs of `if` and `then`, `$anchor` set to the sid, and `unevaluatedProperties`.

**Verdict: must change.** A RecordType now holds a JSON Schema in its `schema` (s-6eb92ddch7shuvu, the owner's ruling that RecordType follows JSON Schema 2020-12), with no field of type `variant` and no choice of what happens to an undeclared field. A field is now "guaranteed" (s-adhmw4gw6y82f44), not "required".

### “A RecordType its variants refine” (s-nk8td3ez58gahc4)

Location `_guidelines/tools/19` (tools 19), kind `TextRule`, status `approved`.

Links:

- `implements` → “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9): extension (RecordType), 12.3.
- `cites` → “RecordType variants” (s-z3dnru6qqdf9m6j): extension (RecordType), 12.6.

Todos and notes:

- Note: The continuation file (2026-11-19): TypeScript and Python get flat discriminated unions; the JSON Schema uses pairs of `if` and `then`.

**Verdict: must change.** “RecordType variants” (s-z3dnru6qqdf9m6j) puts a variant's fields beside its RecordType's fields, without a field of type `variant`, and the generated schema uses pairs of `if` and `then` instead of `oneOf` with a member for the other values. The node also uses "required", and lets each node decide how undeclared properties are treated, which the JSON Schema ruling removes.

### “The type each neutral type of a field gives” (s-4npdup7mjkva69y)

Location `_guidelines/tools/20` (tools 20), kind `TextRule`, status `approved`.

Links:

- `implements` → “Types and RuntimeChecks are generated from the RecordTypes” (s-e877bnfa559tvk9): extension (RecordType), 12.3.
- `cites` → “Gathered values are written beside their field” (s-ju5vcanbjph7mgh): extension (RecordType), 12.9.
- `cites` → “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23): appendix of the tools (tools 7.1.9).

Todos and notes:

- Note: The continuation file (2026-11-19): the rule on the neutral types is to name the keywords of JSON Schema 2020-12 and SpecSheriff's own vocabulary; the node has a row for the type `variant`.

**Verdict: must change.** A field's type is now written with the keywords of “JSON Schema” (s-6eb92ddch7shuvu), so the table of neutral types and its rows for `one of`, `identifier of` and `variant` no longer describe what a RecordType holds. The gathered values are now read from `x-enumSource` beside a field with `enum` (s-ju5vcanbjph7mgh).

## Checks and procedures of the new form that no node of the appendix implements

### Rows of the tables of checks that no node of the appendix implements

moved/report.md names 13 rows whose drafts name no implementing node of the appendix.
The last column names the node of the appendix that comes closest, where there is one.

| Row | What it checks | Rule it checks | Closest node of the appendix |
|---|---|---|---|
| 10.1.20a (s-zyaf34chxugtjyn) | A rule of the SpecSheriff guidelines declares no link to a node of an extension | “A rule of the SpecSheriff guidelines names no particular extension” (s-chk5hnzmcpeqj25) | None. The row's todo asks for a new node, with its test written first. |
| 10.1.26b (s-ffkv5qnqvet7bga) | Each entry in the bindings file names a file that exists | “How code is bound to its rules” (s-kgbzk2ph9e6jfb4) | None. No node of the appendix mentions the bindings file. |
| 10.1.27a (s-y5w6xwvwh857azx) | Each new entry that sets the `strict` flag names an owner, and no commit removes or changes such an entry | “The specification's strict flag” (s-q3pfzyaxvpr2zj2) | None. “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47) checks the former approval mechanism only. |
| 10.1.27b (s-dxzq5rd6eeteza4) | Each new entry that records the choice of an extension, or its withdrawal, names an owner, and no commit removes or changes such an entry | “Configuring extensions” (s-9ttvcwpqkehm58g) | None. |
| 10.1.27c (s-j5qmmdq4m26mdvw) | The installed release of the plugin delivers every extension that the project has chosen | “Configuring extensions” (s-9ttvcwpqkehm58g), “What an extension of the guidelines is” (s-mbmnsnxenmavu3z) | None. |
| 10.1.39a (s-dwxjxb7rw4w5yn3) | Every stored copy of generated system code is exactly what the approved wordings of its nodes produce | “Code generated from approved wordings” (s-qyjw8xez6t6adc3), “What is generated from the nodes is regenerated and never edited” (s-kh8qcd5kxgh9z3j) | “Generated copies against the nodes” (s-dbk2vyeg8z5jxna), which compares with the former, waiting copy. |
| 10.1.39b (s-f8fmudceuyaj942) | A node from which nothing is generated, because its approved wording relies on a node never approved, is reported | “Code generated from approved wordings” (s-qyjw8xez6t6adc3) | “The commands” (s-f5rz6b7dhxejjts) and “Generated copies against the nodes” (s-dbk2vyeg8z5jxna), which report the nodes that the former mechanism waits for. |
| 12.12.11 (s-upj45kydz8727be) | Each value of a field with `enum` is declared once | “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) | “The schema and a project's extension” (s-xzcw3hv4hmxz7h7): the composed schema of the RecordType extension rejects a duplicate value (moved/report.md, "The RecordType extension"). |
| 12.12.12 (s-buug8n5eh7tdnsv) | Every field with `enum` holds at least one value from its source | “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) | “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c), which rejects a field that holds no value. |
| 12.12.13 (s-hcgmz4v5avbj3nt) | A field whose values are sids of a project's own kind names a kind that exists | “Sids of the nodes of a project's own kind as a field's values” (s-mt6auv3jz8m5gzh) | “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c), which rejects a kind that the schema does not define. The check reads `x-enumSource.kind` (moved/report.md). |
| 12.12.14 (s-93jpnb4c96qhwbu) | The values gathered beside a field are exactly what their source produces | “Gathered values are written beside their field” (s-ju5vcanbjph7mgh) | “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23). |
| 12.12.15 (s-rpkq8y79fwg5k92) | A RecordType refers only to the RecordTypes of its own part and to fragments of a format in the contracts section; reported | “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) | “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj), which implements the dropped rule. The continuation file found no code for that check. |
| 12.12.16 (s-hn9m9dhxaazjn3y) | A fragment of a format refers only to other fragments; reported | “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) | None. |

### Rules that a node of the appendix should implement, but none does

Each of these rules requires something of the tools, and no node of the appendix has an `implements` link to it.

| Rule | What it requires of the tools | Closest node of the appendix |
|---|---|---|
| “Configuring extensions” (s-9ttvcwpqkehm58g) | A utility in the plugin with which an owner chooses the extensions, and a record of the choice in the repository's configuration | None. `t25-pass/settings-prototype.mjs` is a prototype of such a command, `sheriff settings`. |
| “An extension that a node depends on stays chosen” (s-j8y62pa9hzz6nwx) | A procedure that withdraws the choice of an extension, which refuses while a node depends on it and names each such node | None. |
| “What an extension of the guidelines is” (s-mbmnsnxenmavu3z) | Each extension is delivered with the plugin, together with the tools that implement its rules | The plugins (s-zh2vcr3xjumppg5, s-2pdy9gw2jrjvfb4) implement s-bsya3febm6u64ab, but list no extension. |
| “The table of checks of an extension” (s-gpzs5fcxvp6jkrp) | The tools run the checks of the table of each chosen extension | “How each check is made” (s-4kd2pave7vm4hmd), a section, names only the main table. |
| “The specification's strict flag” (s-q3pfzyaxvpr2zj2) | Entries that turn the flag on and off; procedures that refuse to turn it on, or to approve the specification, while a stricter check would refuse; the command that lists what such a check finds | None. The continuation file adds that a commit that changes the flag is judged by the flag's value after the commit. |
| “Code generated from approved wordings” (s-qyjw8xez6t6adc3) | Generation from the last approved wording of each node, which the tools find in git history, and the report of a node that relies on a node never approved | “The commands” (s-f5rz6b7dhxejjts) and “Generated copies against the nodes” (s-dbk2vyeg8z5jxna), which describe the former waiting behaviour. |
| “When the checks run” (s-epaw9sgyaajzn8g) | The moments at which the checks run, among them the run before the specification is approved, and the tests on a push only where the project's own guidelines mention a push | “The hooks” (s-477gtdrkw34dzxw), which implements the main table of checks instead (question X2). |
| “A commit whose review cannot be carried out is refused” (s-94k7b6r5kf65udf) | The refusal of every commit that needs a judgement and gets no answer that the tools can read | “Who runs the reviewer” (s-xr5xxa9cxf2mq5u), which cites “What the reviewer is given” (s-nyh9yk22ba6g77q) for it. |
| “How a project may extend the schema” (s-xm8rz4uupb73gu5) | What a project's extension may add, and that it changes no definition of the schema of the guidelines or of a chosen extension | “The schema and a project's extension” (s-xzcw3hv4hmxz7h7), which implements only s-eferktypcj7njt5. |
| “A change to a SpecTag” (s-9j2mmnuuwmx5ksn) | What counts as a change to a test or to code | “The symbols a commit changes” (s-2x58az67bm6cxq2), which implements only the main table. |
| “The nodes a commit message names” (s-ef93u6cnbs2sevr) | The check of row 10.1.42 (s-7sk3s553ukzwtbm) | “A commit message names the nodes its code implements” (s-qqs2svksmjct753), which implements only the main table. |
| “Exempting a rule from being implemented” (s-gf6n8ge4mke3pr2) | The citation of the target in the text of the exempting node; an exemption that holds only while the exempting node is approved | “`consumes` and `exempts` links” (s-qvgzubkrafadqgf) and “An approved node without code or a test” (s-jgejd5rpd9d43pd), which cite s-6fw72j65jkqrfpf in their decisions. |
| “The SpecTag” (s-8xw4mgvpexyvw5q) | The form of a SpecTag | “The SpecTag, and how a symbol carries it” (s-5z5gnu7pahr82xp), which implements s-rwqzepmrt77rv35 instead. |
| “A test's reference to its rule” (s-nrjxfvpkq3m8hzm) | Where a test carries its SpecTag, which row 10.1.26a (s-ay6wntm2dxcgpnp) checks | “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc), which implements s-rah8b37kytb682y and s-rwqzepmrt77rv35 instead. |
| “Who may withdraw a node's approval” (s-fpq35tf3pehgk64) | The refusal to withdraw the approval of a node of the guidelines or of a chosen extension | “How an approval is recorded” (s-v4qus7raqnwzneb), which implements s-5ah25f6gy99panq for it. |
| “Outgoing links are written” (s-yku67x4mehbmv6f), “A cited node is also linked” (s-cxtt6jvhqcey2k9) | The checks of rows 10.1.12 to 10.1.14 | “Outgoing links and citations” (s-qzyacnqwvaeaps4), which implements s-bpdqd9v72wg7vsz instead. |
| “How a ratio is written” (s-bckzdwd35d2nefa) | The lower bound of a range is not greater than the upper one, which the schema cannot check (moved/report.md); no row of a table checks it either | None. |
| “A rule may be a table” (s-5fewsp22mmdz7y6) | How the tools read, number, fingerprint, export and show a `TableRule` and the nodes in its cells | None. |
| “The archive” (s-f2b5zvc565s242f) | An archived node's replacement is passed on to the next replacement when that replacement is archived, and a restored node gets a new sid | “Where the files are” (s-zefk589ykh37b8u), which implements the rule only for where the archive is kept. |
| “A domain's header carries the index built from its sections” (s-2r59txnms5serdr) | The index lists each section's sid, title and text, and the domains that use it | “The commands” (s-f5rz6b7dhxejjts), which builds the index without a link to this rule. |
| “The diagram of the domains” (s-4azsb49pj6sech8) | The tools draw a diagram of the domains | None. The continuation file says that only the owner's personal viewer draws it, and that task T29 is to ship it with these rules. |
| “The order of the domains at the same level” (s-uw9n84edf7cbe9n) | The rule leaves it to the appendix to say how the tools place a domain that uses several domains of a row, or that several of them use | None. The continuation file says that `domainOrder` in `model.ts` orders the domains differently. |
| “Sids of the nodes of a project's own kind as a field's values” (s-mt6auv3jz8m5gzh), “Names of the parts of the base specification as a field's values” (s-gqavjzcmubg5pvk) | Reading these values from the specification | “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c), which still refers to the names of the domains. |
| “What a RecordType may refer to” (s-8ht2hn88cu2qwz9) | The checks of rows 12.12.15 and 12.12.16 | “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj), which implements the dropped rule. |
| “The human-readable export” (s-ce24ynwabt5yx8h) | What the export holds; its decision of 2026-11-17 asks a node of the appendix to implement it | “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7). |
| “What an agent approves on an owner's behalf” (s-t5uw8zfxzhfdg86) | Unclear: whether `sheriff approve` records an approval that an agent makes on an owner's behalf differently from the owner's own | “How an approval is recorded” (s-v4qus7raqnwzneb). |

## The 8 links in tools.json to dropped rules

moved/report.md lists these links.
The sid of each dropped rule is its current sid, which the archive no longer holds.

| Node of the appendix | Link | Dropped rule | Replacement that the archive names | What the link should point to instead |
|---|---|---|---|---|
| “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7) | `cites`, in the reason | “A decision lives on the rule it settled” (s-gqbj8849rf224qa) | “Everything that bears on a node is kept in that node” (s-x4zcbk5ekebd9ua) | s-x4zcbk5ekebd9ua. The continuation file records that the owner was told of this retargeting on 2026-11-10. |
| “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7) | `cites`, in the text | “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj) | “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) | s-eferktypcj7njt5, as the continuation file records. |
| “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj) | `implements` | “A domain uses another domain's RecordTypes only from the sections it declares” (s-5yvpn4zhuqmv5bq) | “What a RecordType may refer to” (s-8ht2hn88cu2qwz9), RecordType extension | s-8ht2hn88cu2qwz9, or the rows 12.12.15 and 12.12.16 that check it. The node's own check is replaced, so the node must be rewritten or archived. |
| “What a RecordType variant must agree with” (s-c2r9jndrjbtbsv6) | `implements` | “Where a value is declared” (s-xfwuvd3funutmsw) | “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks), RecordType extension | “RecordType variants” (s-z3dnru6qqdf9m6j), whose row 12.12.5 (s-vtpxwqe7ncmn5bz) replaces the item that used this link. The archive's replacement, s-xfu2gpzddjnmgks, fits only the check of the values, row 12.12.9 (s-27aycne77epeaq6). |
| “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c) | `implements` | “How a domain's added values find their field” (s-gzfq3x8hesj227e) | None | No target: the source it described is gone. The node keeps its link to s-xfu2gpzddjnmgks and may gain links to s-mt6auv3jz8m5gzh and s-gqavjzcmubg5pvk. |
| “An object in a list” (s-cdachayybfvg4na) | `implements` | “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj) | “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) | s-eferktypcj7njt5, which row 10.1.36 (s-yuu4ccgch68yzxb) checks. |
| “A list and its declaration” (s-5hb9k2e34dgn284) | `implements` | “A member of `TextRule.list` may be an object” (s-v7vd4ydrwexsgsj) | “The structure of the specification is defined by its machine-readable schema” (s-eferktypcj7njt5) | s-eferktypcj7njt5 and “How a project's own kind of node is declared and checked” (s-hhnahzmhahf8jht), the two rules that row 10.1.35 (s-f5mm7tagez38ffz) checks. |
| “The tests, run before a push” (s-b6qdtghnyha3fhk) | `implements` | “Tests at a push while the specification is a draft” (s-xhcmchcngykvn2k) | “What the checks enforce, and when they run” (s-m4h279nbaqkpa3t) | s-m4h279nbaqkpa3t, and also “When the checks run” (s-epaw9sgyaajzn8g), which mentions pushes. |

## What moved/report.md leaves to stage 2 or to the tools

- The archive names a node of an extension as the replacement of three rules of the base: Where a value is declared, An entity is declared once, and A domain uses another domain's RecordTypes only from the sections it declares. A project without that extension has no replacement ("To be decided").
- The continuation file wanted a `supersedes` link from the archived rule An entity is declared once. None is written, since “What a link is” (s-sn6au3vcr9uy5pm) no longer has that type.
- `schema.ts` must compose the schemas as the report lists: conditions on `$defs/node/allOf`, the schema files of the chosen extensions, `linkTypes` and `$defs`, the refusal of a redefined name, and the archive's schema.
- The composition must refuse a `fields` entry that names a kind not yet composed, and any name composed twice.
- The generation of types and RuntimeChecks must register `x-enumSource` with Ajv, or strip it, and must take the gathered values as the field's `enum`.
- `sheriff reindex` must write the gathered values into `x-enumSource.gathered`.
- `sheriff validate` must refuse gathered values that their source does not produce.
- The check of row 12.12.13 (s-hcgmz4v5avbj3nt) reads `x-enumSource.kind`.
- `sheriff validate` must check that the lower bound of a ratio's range is not greater than its upper bound (s-bckzdwd35d2nefa).
- `sheriff validate` must check that an archived node names a node of the specification as its replacement (s-f2b5zvc565s242f).
- The tools must recognise an archived node without a sid. Today `sheriff validate` matches a removed node to its archive entry by sid, and so does the check that a node ever approved is archived.
- The list of “One source for the values of a field with `enum`” (s-xfu2gpzddjnmgks) has no `declaredIn`. The owner may give it one that points to `#/$defs/enumSource/properties/from` in `extensions/recordtype.schema.json`.
- `TextRule.list.field` and a header's `code` are gone from the schema. Any tool that reads them must stop reading them.
- A citation in a text cell of a `TableRule` counts as a citation of the `TableRule`. The owner may want such links on the node in the next cell, which would change how the tools read citations.
- The 13 rows without an implementing node and the 8 links to dropped rules, listed above.
- moved/present-bindings.json lists 26 kept nodes whose `meta.code` or `meta.tests` the build dropped. Under “A node's lists of its code and its tests” (s-rwqzepmrt77rv35), the tools rebuild them in stage 3.
- moved/agreed.json lists the 201 nodes that the owner agreed to. Their approvals are recorded in stage 3, once the tools compute the new fingerprint (s-5ah25f6gy99panq).
- A decision of the main table of checks cites s-txbwsthdqhvyzd2, a node of the appendix. That node keeps its sid when it is rewritten, so the link stays valid.
- At Ajv's default strictness, the composition with every extension logs 27 warnings, compared with 22 for the current schema. The tools run Ajv with `strict: false`.

## Proposed order of the review

The order has three steps.
First come the nodes that every other change depends on.
Then come the checks, in the order of the first row of the main table of checks that each implements, followed by the checks of the tables of the extensions.
Last come the procedures and the hooks.
A new node that the inventory asks for is reviewed where its row or rule falls.

Before the first node, the questions X1 to X6 and the problems P1 to P3 are put to the owner.

**The foundation**

1. “Where the files are” (s-zefk589ykh37b8u), tools 1.
2. “The schema and a project's extension” (s-xzcw3hv4hmxz7h7), tools 7.1.2.
3. “A removed node and the archive” (s-j4webte36gkraju), tools 7.1.6.
4. “The commands” (s-f5rz6b7dhxejjts), tools 2. Its paragraphs on `sheriff types` may be revisited after Generated copies against the nodes.
5. “The tools” (s-qtq7t32yfqj2yzw), the section at the top of the appendix.
6. “How each check is made” (s-4kd2pave7vm4hmd), tools 7. Its sections “Checks made by `sheriff validate`” (s-6uqu6vn5fnp7fwb), “Checks made by `sheriff binding`” (s-p34692nwceaxq2p) and “Checks made by the other commands” (s-bgegrkhrgpefs69) are approved together with it.

**The checks of the main table of checks**

7. “A key written twice in one object” (s-7zqsstgnuc772ba): row 10.1.1.
8. “Sids, locations, terms and names of RecordTypes, counted” (s-vke5hakwf3uyrjs): rows 10.1.3, 10.1.6, 10.1.7 and 12.12.1.
9. “Locations computed anew” (s-stxmhq3hgfndvn6): row 10.1.5.
10. “An approved node's approval” (s-95w92rnjuv3sst8): rows 10.1.8 and 10.1.9.
11. “Indexes, incoming links, gathered values and the statuses of sections and headers, rebuilt” (s-agc6fb3vx46pc23): rows 10.1.10 and 10.1.16, and rows 11.3.1, 11.3.2 and 12.12.14.
12. “Outgoing links and citations” (s-qzyacnqwvaeaps4): rows 10.1.12 to 10.1.14.
13. “The NodeKinds at the ends of a link” (s-pvnnr844f3y964m): row 10.1.15.
14. “Words running in capitals” (s-e2vdhfsndy5stq9): row 10.1.17.
15. “A section with a rule in it” (s-zhen42p6mnaxu7w): row 10.1.18.
16. “`consumes` and `exempts` links” (s-qvgzubkrafadqgf): row 10.1.19, and row 11.3.3.
17. A new node for row 10.1.20a (s-zyaf34chxugtjyn).
18. “`implements` and `refines` links of the appendices and a project's own guidelines” (s-yprj7d6tnvauggr): rows 10.1.22 to 10.1.24.
19. “No copy of the SpecSheriff guidelines” (s-6bmnsbskg6en4nf): row 10.1.25.
20. “The review of a commit” (s-vp24dqydygztqbt): rows 10.1.25a, 10.1.43 and 10.1.43a.
21. “Who runs the reviewer” (s-xr5xxa9cxf2mq5u), tools 10, which the review relies on.
22. “The SpecTag, and how a symbol carries it” (s-5z5gnu7pahr82xp), tools 8, which row 10.1.26 relies on.
23. “SpecTags on the system's code” (s-9rtrj24myzjvshu): rows 10.1.26 and 10.1.28.
24. “How a test declares the node it is written from” (s-zrsc6asgmhv8tnc), tools 9: row 10.1.26a.
25. “The SpecTags the tests carry” (s-utf4mbt7ref8g9c): rows 10.1.26a and 10.1.31.
26. A node for row 10.1.26b (s-ffkv5qnqvet7bga), the bindings file: a new node or part of an existing one.
27. “From a draft to an approved specification, and back” (s-j9r8z4xdrfkfs47): row 10.1.27.
28. Nodes for rows 10.1.27a (s-y5w6xwvwh857azx), 10.1.27b (s-dxzq5rd6eeteza4) and 10.1.27c (s-j5qmmdq4m26mdvw).
29. “The symbols a commit changes” (s-2x58az67bm6cxq2): row 10.1.28a.
30. “A node's `meta.code` and `meta.tests`” (s-t383grkn3q68dpf): row 10.1.34.
31. “A list and its declaration” (s-5hb9k2e34dgn284): row 10.1.35.
32. “An object in a list” (s-cdachayybfvg4na): row 10.1.36.
33. “How a project's own check is run” (s-7pk89t8z6wymmj9): row 10.1.37.
34. “Citing a node only by its sid” (s-nh8b2hjvzasdxmd): row 10.1.38.
35. “A citation outside the specification” (s-m8nmfsxkcfu7cjp): row 10.1.39.
36. “Generated copies against the nodes” (s-dbk2vyeg8z5jxna): row 10.1.39a, with a node for row 10.1.39b (s-f8fmudceuyaj942).
37. “A node whose tests or code lag behind it” (s-txbwsthdqhvyzd2): row 10.1.40.
38. “An approved node without code or a test” (s-jgejd5rpd9d43pd): row 10.1.41.
39. “A commit message names the nodes its code implements” (s-qqs2svksmjct753): row 10.1.42.
40. “The tests, run before a push” (s-b6qdtghnyha3fhk): row 10.1.44.

**The checks of the tables of the extensions**

41. “No circular dependency between the domains” (s-vuujweu57sxsa58): row 11.3.4.
42. “A file of the technical appendix named after a domain” (s-gvafe6bnstwab8b): row 11.3.5.
43. “A header's level” (s-uxmkwbnpgtjzkgv): row 11.3.6.
44. “An identifier followed to its end” (s-3anv9qcmx8pwp2w): rows 12.12.2 and 12.12.3.
45. “What a RecordType variant must agree with” (s-c2r9jndrjbtbsv6): rows 12.12.4 to 12.12.10.
46. “Where the values of a field of type `one of` are collected” (s-5nf87c3e3jg9v7c): rows 12.12.11 to 12.12.13.
47. “A used domain's RecordType, only from the declared sections” (s-ezq8csd433vj6fj): rows 12.12.15 and 12.12.16.

**The procedures**

48. “How an approval is recorded” (s-v4qus7raqnwzneb), tools 11, with nodes for the approval procedure (s-qzthyh7yqvfhsa2) and the `strict` flag (s-q3pfzyaxvpr2zj2).
49. Nodes for choosing and withdrawing extensions (s-9ttvcwpqkehm58g, s-j8y62pa9hzz6nwx).
50. “Setting a repository up and taking SpecSheriff out of it” (s-7unxytshhc4md54), tools 3.
51. “What the export, the guide and `sheriff show` write of a node” (s-k4nqjr96ux7a5m7), tools 5.
52. “Building the map” (s-rpv4fkdqqguptqd), tools 4, with nodes for the diagram of the domains and the order of the domains (s-4azsb49pj6sech8, s-uw9n84edf7cbe9n).
53. “Where the types and RuntimeChecks generated from the RecordTypes are written” (s-pvzms7d8kxb8dk2), tools 17.
54. “What a RecordType generates” (s-suv42g8r3ra2h6b), tools 18.
55. “A RecordType its variants refine” (s-nk8td3ez58gahc4), tools 19.
56. “The type each neutral type of a field gives” (s-4npdup7mjkva69y), tools 20.

**The hooks and the plugins**

57. “The hooks” (s-477gtdrkw34dzxw), tools 6.
58. “An edit judged before it is made” (s-st6td4mua9uqt9z), tools 7.3.2.
59. “The agent's hooks for Codex CLI” (s-n76wt2bkqdmh78x), tools 16.
60. “A git hook runs the SpecSheriff tools a plugin keeps on the machine” (s-4mej6ccn7xu3d3p), tools 12.
61. “The project's own tools in a git hook” (s-n4m5zvh96yb299p), tools 13.
62. “The plugin for Claude Code carries everything its work needs” (s-zh2vcr3xjumppg5), tools 14.
63. “The plugin for Codex CLI carries everything its work needs” (s-2pdy9gw2jrjvfb4), tools 15.
