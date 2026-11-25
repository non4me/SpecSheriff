### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 979

- Problem: A single property, `declaredIn`, named the place where a list's values are declared, whether in code, in a schema or in the settings.
  Ruling: The owner: `declaredIn` is replaced by two properties of the list, `jsonSchema` and `valueList`.
- Problem: A JSON Schema describes the format of values rather than listing them, so it cannot be matched with a list value for value.
  Ruling: The owner: the check goes from the list to the schema. Each listed value must be valid against the schema, and an exact enumeration (`enum`) in the schema lists nothing beyond the rule's list.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 984

row 10.1.39 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 986

- Problem: Whether a citation by sid means only the form `§<sid>` or also a SpecTag.
  Ruling: The owner: both a SpecTag and `§<sid>` name a node by its sid, and the row covers both forms.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 989

row (unnumbered) of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 991

- Problem: Whether the row stays in the main table of checks, since generating code from the nodes was to be taken out of the SpecSheriff guidelines.
  Ruling: The owner: generating code from the nodes returns to the SpecSheriff guidelines, so the row stays in the main table of checks.
- Problem: The row was worded in terms of what the nodes produce at present and of generated code that waits for a draft node.
  Ruling: The owner: the row follows the rule that code is generated only from the nodes' approved wordings (s-qyjw8xez6t6adc3). Nothing is generated from a node that has never been approved.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 996

row 10.1.40 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 998

- Problem: The row reported any rule whose tests or code lagged behind its text anywhere in the history of the repository.
  Ruling: The owner: the check looks only at the approved rules that change in a commit. Where a rule's wording changes, its tests and code change in the same commit, and where its tests change, its code does.
- Problem: A change to a rule's wording does not always need a change to its tests or its code.
  Ruling: The owner: instead of those changes, the commit message may state that the rule's implementation needs no change.
- Problem: A lag behind an approved rule was only reported, never refused.
  Ruling: The owner: while the specification is approved, such a commit is refused, naming the rule.
- Problem: Whether a lag behind an approved rule is reported while the specification is a draft.
  Ruling: The owner: while the specification is a draft, the checks that new code is bound to its rules still run. Every check of whether the implementation is complete stays silent, so this row passes.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1007

row 10.1.41 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1009

- Problem: A proposed wording dropped a provision of the approved wording: code or a test bound to a rule implementing the approved rule counts for it.
  Ruling: The owner: the provision stays, as in the approved wording and in the rule on the implementation of an approved rule (s-6fw72j65jkqrfpf).
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).
- Problem: The reason proposed for the row said that an approved rule lacking its test or its code is only reported.
  Ruling: The owner: while the specification is approved, a commit that includes such a rule is refused, naming the rule. While the specification is a draft, the commit passes and nothing is reported.
- Problem: Whether the row keeps its proviso that the test is not marked as skipped.
  Ruling: The owner: the proviso stays and also covers a test marked as expected to fail. The row's reason explains it: a test run never counts such a test as failed.
- Problem: The row did not say in which direction an `implements` link makes code or a test count for the approved rule.
  Ruling: The owner: code or a test counts for the approved rule if it is bound to a node with an `implements` link to that rule. A chain of such links counts as well, but nothing counts in the opposite direction.
- Problem: The row applied to every approved rule, whatever a commit changed.
  Ruling: The owner: the check applies only to the approved rules that a commit includes. The row lists the changes that make a commit include a rule.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1022

row 10.1.42 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1024

- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1027

row 10.1.43 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1029

- Problem: Whether the row should also say how the review of the changed code is made.
  Ruling: The owner: the row says only what is checked. How the SpecSheriff tools make the check is stated in the appendix of the tools (s-vp24dqydygztqbt).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1032

row 10.1.43a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1034

- Problem: A commit could leave a rule's tests and code behind its new wording merely by stating that the rule's implementation needs no change.
  Ruling: The owner: the reviewer judges whether that statement is true. A false statement costs what the lag it hides would cost, since the statement replaces the changes that would otherwise be required.
- Problem: Whether a false statement is reported while the specification is a draft.
  Ruling: The owner: while the specification is a draft, the checks that new code is bound to its rules still run. Every check of whether the implementation is complete stays silent, so this row passes.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1039

row 10.1.44 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1041

- Problem: The row refused a push whose tests failed while the specification was approved, whether or not the project runs its tests at a push.
  Ruling: The owner: a push is refused only where the project's own guidelines name a push as the moment at which the tests run (s-m4h279nbaqkpa3t).
- Problem: Whether the row still covers the tests of a project's own generators.
  Ruling: The owner: the SpecSheriff guidelines again provide for a project's own code generators (s-km4x4s26kv7pjze), so the row covers their tests.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1046

head of table-11-3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1048

- Problem: The checks of the Domains extension stood in the main table of checks, among the checks of the SpecSheriff guidelines.
  Ruling: The owner: each extension has its own table of checks, with the same columns as the main table of checks. That table refines the main table.
- Problem: The tables of checks had no names that told the table of the SpecSheriff guidelines from the table of an extension.
  Ruling: The owner: the table of the SpecSheriff guidelines is the main table of checks. The table of an extension is the table of checks of that extension.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1053

row 11.3.1 of table-11-3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1055

- Problem: One approved row required both that every domain has a header and that the header's index is what the domain's sections produce. Each requirement can hold without the other.
  Ruling: The owner: the row is split in two. This row checks the header, and another row checks the index.
- Problem: A header copied into another document of a domain split across several documents passed the check.
  Ruling: The owner: every domain has exactly one header.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1060

row 11.3.2 of table-11-3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1062

- Problem: One approved row required both that every domain has a header and that the header's index is what the domain's sections produce. Each requirement can hold without the other.
  Ruling: The owner: the row is split in two. This row checks the index, and another row checks that every domain has a header.
- Problem: Whether the requirement that a domain with sections carries their index is stated in this row or in the rule on a domain's header.
  Ruling: The owner: the rule on a domain's header (s-yggv9myedprnaa7) states the requirement, and this row only checks it. The rows of the main table of checks do the same.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1067

row 11.3.4 of table-11-3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1069

- Problem: It was not settled through which links the domains use one another in a cycle.
  Ruling: The owner: only through the `consumes` links of the domains' headers. The links between rules cross the boundaries of domains freely and do not count.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1072

head of table-12-12
