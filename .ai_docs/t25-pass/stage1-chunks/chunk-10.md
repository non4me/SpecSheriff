### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 860

- Problem: Applied to the archive, the check would forbid a new term to take the name of a term that has been removed.
  Ruling: The owner: the check covers only the term nodes of the specification, so a new term may take the name of an archived one.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 863

row 10.1.8 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 865

- Problem: The check required an approval of every node outside the SpecSheriff guidelines, including the nodes of the extensions of the guidelines that the project has chosen.
  Ruling: The owner: the check also leaves out the nodes of the extensions that the project has chosen.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 868

row 10.1.9 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 870

- Problem: The check treated the commit as the one that acts, and covered every approval rather than those that the commit adds.
  Ruling: The owner: only the approvals that a commit adds are checked, each against the owners that its node has as of that commit.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 873

row 10.1.11 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 875

- Problem: The check stated its rule and its exceptions in one sentence, and said that a removed node that has ever been approved is in the archive.
  Ruling: The owner: the main rule comes first and the exceptions follow separately. Such a node is placed in the archive with the reason for its removal.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 878

row 10.1.12 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 880

- Problem: The check said only that every link names a node, although an archived node keeps no sid and the link type `supersedes` had been removed.
  Ruling: The owner: every link names a node of the specification by its sid.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 883

row 10.1.17 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 885

- Problem: The check covered only approved nodes, sections and domain headers, and allowed capitals only in a name quoted from the code.
  Ruling: The owner: no sentence of the specification, drafts included, is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 888

row 10.1.19 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 890

- Problem: The check covered only which nodes an `exempts` link connects, although the rule on exempting a rule from being implemented also requires a citation in the text.
  Ruling: The owner: the check also requires that the text of a node declaring an `exempts` link cite the node that the link names.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 893

row 10.1.20a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 895

- Problem: No check enforced the requirement that a rule of the SpecSheriff guidelines declares no link to a node of an extension of the guidelines.
  Ruling: The owner accepted a new check that enforces it.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 898

row 10.1.22 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 900

- Problem: The check required every rule of the technical debt section to refine a node of the base specification, although the rule on technical debt lets a description of a defect refine a node without requiring it to.
  Ruling: The owner: that requirement goes from the check.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 903

row 10.1.24 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 905

- Problem: The check said that a rule of a project's own guidelines refines or implements a rule of the SpecSheriff guidelines, although a project's own guidelines never implement them.
  Ruling: The owner: each rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines.
- Problem: The check named only the SpecSheriff guidelines, though a project's own guidelines may also refine a rule of an extension that the project has chosen.
  Ruling: The owner: a rule of a project's own guidelines may refine or extend a rule of an extension that the project has chosen.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 910

row 10.1.25a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 912

- Problem: Whether the reviewer's check of a node of the technical appendix approved in a commit refuses the commit while the specification is still a draft.
  Ruling: The owner: it always refuses the commit, since a node that contradicts the base specification is a defect even in a draft specification.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 915

row 10.1.26 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 917

- Problem: Whether this row checks the SpecTags of the tests as well as those of the code, and which row checks where a SpecTag stands.
  Ruling: The owner: this row checks only the system's implementing code, including where its SpecTags stand. The tests are checked by a row of their own.
- Problem: For code that the commit leaves unchanged, the cost of a failure differed from the rule on code and tests without a SpecTag (s-kkbqcb9xrpaepwn).
  Ruling: The owner: for such code, the result is what that rule says.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 924

row 10.1.26a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 926

- Problem: Which row checks the SpecTags of the tests, and where a test's SpecTag stands.
  Ruling: The owner: a row of its own checks the tests. A test's SpecTag stands where the appendix of the tools prescribes for the test's language.
- Problem: Whether the check covers every test, the tests of a project's own checks included.
  Ruling: The owner: the check covers only the tests of the system's code. A project's own checks are not part of the system's code, and only the system's code and its tests carry SpecTags.
- Problem: For a test that the commit leaves unchanged, the cost of a failure differed from the rule on code and tests without a SpecTag (s-kkbqcb9xrpaepwn).
  Ruling: The owner: for such a test, the result is what that rule says.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 933

row 10.1.26b of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 935

- Problem: An entry in the bindings file could go on naming a file that had been moved or renamed.
  Ruling: The owner: on every commit, the checks make sure that each file named in the bindings file exists. So a moved or renamed file is caught.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 938

row 10.1.27 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 940

- Problem: The row checked a commit that withdrew the approval of a rule approving the specification. The specification's approval status is now recorded in entries made by its owners, with no such rule (s-qzthyh7yqvfhsa2).
  Ruling: The owner: each new entry on the approval status names one of the specification's owners, and no commit removes or changes such an entry. So nobody changes the status by deleting or editing the latest entry.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 943

row 10.1.27a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 945

- Problem: Nothing checked who records the entries that set the specification's `strict` flag (s-q3pfzyaxvpr2zj2).
  Ruling: The owner: these entries are checked in the same way as the entries recording the specification's approval status.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 948

row 10.1.27b of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 950

- Problem: Nothing checked who records the choice of an extension of the guidelines, or the withdrawal of that choice (s-9ttvcwpqkehm58g).
  Ruling: The owner: these entries are checked in the same way as the entries that set the specification's `strict` flag.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 953

row 10.1.27c of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 955

- Problem: A project could choose an extension that the installed release of the SpecSheriff plugin does not deliver.
  Ruling: The owner: a project chooses only among the extensions that the SpecSheriff plugin delivers (s-mbmnsnxenmavu3z). The checks make sure that the installed release delivers every extension the project has chosen.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 958

row 10.1.28 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 960

- Problem: The row checked both that every SpecTag names a node that exists and that a SpecTag on changed code names an approved node.
  Ruling: The owner: the check is split. This row checks only that the rule a SpecTag names exists, and a row of its own checks that a draft rule is not implemented.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 963

row 10.1.28a of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 965

- Problem: No row checked, from the side of the rule, that a draft rule is not implemented. Other rows held only parts of that requirement.
  Ruling: The owner: a row of its own checks that no commit adds or changes code or a test bound to a draft rule. The rule on what a draft means (s-utvqbypzhmgndug) requires this.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 970

row 10.1.34 of table-10-1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 972

- Problem: The row said only that `meta.code` and `meta.tests` are what the SpecTags produce, without saying what these lists hold.
  Ruling: The owner: `meta.code` refers to every code file that a SpecTag naming the node binds. `meta.tests` refers to every test file holding a test with such a SpecTag, and neither list refers to any other file.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 977

row 10.1.35 of table-10-1
