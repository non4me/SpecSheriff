### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 755

- Problem: The node listed the cases in which a commit is refused, so a case missing from the list, such as a review run that ends in an error, would let a commit through.
  Ruling: The owner accepted a wording by which only an answer that the SpecSheriff tools can read lets the commit through. The cases became examples.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 758

10.8

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 760

- Problem: The node used the name NodeKind, which no rule explains.
  Ruling: The owner: the node speaks of a kind of node instead.
- Problem: The node held a project's own check to everything that the rule listing the checks says of a check, citing that rule instead of stating the requirements. Read literally, this included the review and the tests, which that rule also lists.
  Ruling: The owner accepted a wording that states in plain words each requirement a project's own check meets, since a citation supports a statement but never replaces it.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 765

10.12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 767

- Problem: Where the SpecSheriff tools cannot run, the node refused every commit and push, while the appendix of the tools lets them through when the project's own tools pass.
  Ruling: The owner accepted that the project's own tools still run there and the commit or the push goes through unless one of them fails. Whoever makes it is told that no SpecSheriff check ran.
- Problem: In what order the project's own tools, the SpecSheriff tools and the checks run on a commit and on a push.
  Ruling: The owner: they run in three steps, from the particular to the general: the tools that rewrite files, then the project's own checks and its other tools, then the checks of the SpecSheriff guidelines. After the first step, nothing changes what the commit contains.
- Problem: The node did not say when a project's own code generators run.
  Ruling: The owner: they run in the first step, together with the generators of the SpecSheriff tools.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 774

10.13

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 776

- Problem: The reviewer doubted the paragraph requiring that a procedure needed only once be removed after it has run, since no tool and no check enforces it.
  Ruling: The owner accepted a wording that keeps the paragraph. Whoever writes such a procedure carries the rule out, as with other rules that no check enforces.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 779

8.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 781

- Problem: How a rule that has the form of a table is held in the specification.
  Ruling: The owner: each cell of the table holds either text or a node, and no separate kind of node stands for a row. The rows may be grouped under headings.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 784

7.5.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 786

- Problem: When a rule is to be made a `TableRule`, and when a cell is to hold a node rather than text.
  Ruling: The owner: a `TableRule`, and a node in a cell, are used only where they are needed. Elsewhere a table is written in the node's text.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 789

11.1.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 791

- Problem: The rule only allowed a link to cross a domain's boundary. Where no node of the other domain held the statement relied on, the new rule written there had to name the linking node in its `meta.todos`.
  Ruling: The owner: a node that relies on what another domain states has a link to the node of that domain that states it, of any type and to any of that domain's sections. The new rule no longer names the linking node in its `meta.todos`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 794

9.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 796

- Problem: Whether the rule on code and tests without a SpecTag moves to an extension for adopting an existing project or stays in the base.
  Ruling: The owner: it stays in the base, in the section on tests and code, next to the nodes on the SpecTag.
- Problem: The rule applied only while the specification was a draft, and the checks reported each symbol without a SpecTag.
  Ruling: The owner: the rule no longer depends on the specification being a draft. Instead of a message for each symbol, the checks give a single warning without a list, which names the command that lists such code by file and symbol.
- Problem: When the checks warn about code outside the commit that carries no SpecTag, and when they refuse the commit.
  Ruling: The owner: while the specification is a draft, the commit passes without a warning. While it is approved, the commit passes with the warning if the strict flag is off, and is refused if the flag is on.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 803

10.9

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 805

- Problem: Whether a project's own code generators belong to an extension of the guidelines on generating code from the nodes or to the guidelines themselves.
  Ruling: The owner: code generation stays in the guidelines. The rule moves next to the rule on a project's own checks, right after it.
- Problem: The node said that what a project's own generator writes waits for the approval of the rule that lists the generator, as code generated from nodes waits for their approval.
  Ruling: The owner: the generator writes its code from the approved wordings of its nodes. While the rule that lists the generator is a draft, the code the generator has already written stays as it is.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 810

13.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 812

- Problem: Where the rule on what the human-readable export shows belongs, since only the appendix of the tools described the export.
  Ruling: The owner accepted a plan by which an extension on the views of the specification states what the export shows. A node of the appendix of the tools states how the tools write it and implements this node.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 815

13.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 817

- Problem: An earlier restructuring had moved the rule on the map of the specification into the appendix of the tools.
  Ruling: The owner accepted a plan by which the rule returns to the extension on the views of the specification and keeps its sid. The node of the appendix of the tools on building the map implements it.
- Problem: The rewritten node opened by calling the map a mind map and dropped phrases of the approved wording: that the map holds no facts of its own, and why a branch opens and closes.
  Ruling: The owner: the node keeps those phrases and again opens by calling the map the specification seen from above. A mind map is named only in the example.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 822

1.7.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 824

- Problem: Once each extension had a table of checks of its own, the name "the table of checks" no longer told the tables apart.
  Ruling: The owner: the table of the SpecSheriff guidelines is "the main table of checks", and the table of an extension is "the table of checks of an extension". This node introduces the second name.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 827

head of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 829

- Problem: The node's text restated what other rules say: which checks run mechanically and when, that a check refuses unless its row says otherwise, and what each check reads.
  Ruling: The owner replaced the text with one sentence of the owner's own: the table holds the complete list of the checks that run after an edit to the specification or to the code, tests included. The reason says only why the checks stand in one table.
- Problem: Called the complete list of checks, the table contradicted the tables of checks of extensions and the rule by which a project's own guidelines add checks.
  Ruling: The owner: the table holds the complete list of the checks of the SpecSheriff guidelines.
- Problem: Once each extension had a table of checks of its own, the title "The table of checks" no longer named this table alone.
  Ruling: The owner: the table is called "the main table of checks".

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 836

row 10.1.2 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 838

- Problem: The check said only that every file matches its schema, without saying which files or which schema.
  Ruling: The owner worded the check: every file of the specification complies with its JSON Schema.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 841

row 10.1.3 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 843

- Problem: Whether the check that no two nodes share a sid covers the nodes in the archive.
  Ruling: The owner: the check covers only the nodes of the specification, since an archived node keeps no record of its former sid.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 846

row 10.1.5 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 848

- Problem: An archived node keeps the location it had when it was removed, and another node may later take that location.
  Ruling: The owner: the check covers only the nodes of the specification. It makes the check that no two nodes share a location redundant, so that check is removed.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 851

row 10.1.6 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 853

- Problem: An archived term node lies in the archive rather than in the contracts section.
  Ruling: The owner: the check covers only the term nodes of the specification.
- Problem: Where a term is defined once the base specification is divided into domains.
  Ruling: The owner agreed to the check as it applies to a base specification without domains. The extension for domains extends it: a term that several domains need is defined in the contracts section, and a term that one domain needs is defined in that domain.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 858

row 10.1.7 of table-10-1
