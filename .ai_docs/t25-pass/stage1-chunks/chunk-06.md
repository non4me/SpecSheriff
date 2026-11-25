### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 460

- Problem: Once a domain's level became optional, the rules of the diagram did not say where a domain without a level is placed.
  Ruling: The owner agreed that the SpecSheriff tools draw the diagram. The domains whose header contains no level are placed together in a row of their own, below the rows of the levels.
- Problem: The rules of the diagram also stated the order of the domains within a row, which the rule on the order of the domains at the same level (11.2.3) sets.
  Ruling: The owner: that item is removed, so that only 11.2.3 sets the order within a row.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 465

11.2.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 467

- Problem: By the owner's decision of 2026-11-09, the order of the domains was part of the rules of the diagram. Yet the map of the specification applies that order without the diagram's rows, and the tests of the tools check it separately.
  Ruling: The owner accepted the reviewer's proposal: the order of the domains is a rule of its own.
- Problem: The rule ordered all the domains in one sequence, although a domain's level already places it vertically on the diagram.
  Ruling: The owner: the rule orders only the domains at the same level, that is, those in one row of the diagram.
- Problem: The rule did not say how the domains in a row are placed relative to the domains they use.
  Ruling: The owner: first come, in alphabetical order, the domains that have no link to any other domain in the row. Each other domain is then placed to the right of every domain in the row that it uses, as close to them as possible. The appendix of the tools sets out the harder cases.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 474

6.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 476

- Problem: The rule did not say where a node keeps the link it declares for a citation.
  Ruling: The owner: the link is kept in the node's `refs` list, apart from the citation itself.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 479

6.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 481

- Problem: The rule said which incoming links a node of the SpecSheriff guidelines holds, but not which ones a node of an extension that the project has chosen holds.
  Ruling: The owner chose to state this qualification in each rule that it concerns. Here, a node of a chosen extension holds only the links pointing at it from that extension, as a node of the guidelines holds only those from the guidelines.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 484

10.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 486

- Problem: The node said only that the checks run at each of an agent's edits, and its title named where an agent writes rather than what the node settles.
  Ruling: The owner: the node lists the moments at which the checks run: before an agent's edit, after each of its edits, on a commit and on a push. Its title is "When the checks run".
- Problem: The tests of the system's code ran on every push, although the guidelines require only that they pass before a change reaches the project's shared branch.
  Ruling: Following the owner's ruling on 1.6.1, the tests run on a push only where the project's own guidelines name a push as the moment at which they run.
- Problem: The tests run on a push covered the system's code and the project's own checks, but not the project's own code generators (10.9).
  Ruling: The owner agreed that those tests also cover the project's own code generators.
- Problem: The checks run after an agent's edit and on a commit came only from the main table of checks.
  Ruling: Following the owner's ruling on the tables of checks of extensions (1.7.7), those checks also include the ones in the table of checks of an extension.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 495

10.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 497

- Problem: The rule did not say which edits the check before an edit can judge, although a shell command does not say in advance which files it will change.
  Ruling: The owner accepted that the refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.
- Problem: The check before an agent's edit guarded the approvals, but not the entries that set the specification's approval status or its `strict` flag.
  Ruling: The owner agreed that the SpecSheriff tools also refuse an agent's edit that changes those entries other than through the procedures that record or withdraw them.
- Problem: An agent could change the record of the extensions that the project has chosen by editing it directly.
  Ruling: The owner accepted that the SpecSheriff tools refuse such an edit too, unless it is made through the procedure that records or withdraws the choice.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 504

7.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 506

- Problem: The rules on how a node is written stated no common goal, reader or scope, so those who wrote or reviewed nodes could apply them in different ways.
  Ruling: The owner: a node of its own sets out the goal of these rules, the reader of a node, the parts of a node that the rules apply to and the terms a node may use without explaining them.
- Problem: It was unclear whether the rules on how a node is written apply to the citations in a node and to its examples.
  Ruling: The owner: citations are technical information, so these rules do not apply to them. Examples are kept in the separate `examples` property, so a rule that names only the title, the text and the reason does not apply to them either.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 511

7.2.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 513

- Problem: The rule also required a property to be stated over what the specification declares, never over what happens not to exist yet.
  Ruling: The owner: that paragraph is removed from the rule.
- Problem: The rule spoke of a rule's subject, which reads both as the grammatical subject and as the topic, and said too abstractly whom a rule binds.
  Ruling: The owner accepted a rule that distinguishes two cases. A rule that requires an action names its actor and what the actor must do, while a rule that requires a property names the thing that must have it.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 518

7.3.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 520

- Problem: The rule did not say whether a sentence relating two facts, each of which could be disputed on its own, states one thought or two.
  Ruling: The owner: a sentence that states one relation between two facts, such as a cause, a contrast or a condition, states one thought. A sentence that sets two facts side by side with no relation between them, or that states two relations, states two thoughts.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 523

7.5.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 525

- Problem: The rule that a superfluous rule is removed stood among the rules on what the specification governs, although it concerns every rule.
  Ruling: The owner: it is a rule about rules in general, so it stands as a node of its own in the section on how rules are written.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 528

1.1.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 530

- Problem: The rule on owners stood after rules that already relied on the notion of an owner.
  Ruling: The owner: the rule moves ahead of them, so that the notion of an owner is introduced before it is first used.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 533

1.3.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 535

- Problem: Rules relied on the approval status before any rule said what values it takes and what has one.
  Ruling: The owner: a node of its own introduces the approval status and what has one, ahead of the rules that use it.
- Problem: The node said that `draft` is the default status, which the schema of the nodes already states.
  Ruling: The owner: the rules of the guidelines do not name the default status, which only the schema holds.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 540

1.3.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 542

- Problem: The conditions under which the specification, a section and a rule are approved were stated in three separate rules.
  Ruling: The owner: one node states everything about when the status is approved.
- Problem: The reason said that the status `approved` claims the agreement of one of the rule's owners, although an agent may now approve a node on an owner's behalf.
  Ruling: The owner accepted that the status claims the rule's present wording was approved by one of its owners or, as 1.3.6 allows, by an agent on an owner's behalf.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 547

1.7.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 549

- Problem: Rules that not every system needs were part of the guidelines that every project shares.
  Ruling: The owner: such rules form extensions of the guidelines, which are delivered with the SpecSheriff plugin and the tools that carry them out. A project uses an extension only by its own choice.
- Problem: The node did not say whether the rules of an extension are rules of the SpecSheriff guidelines, or whether the extensions are kept together.
  Ruling: The owner accepted that the rules of an extension are not rules of the SpecSheriff guidelines. Each extension is kept apart from the others.
- Problem: Nothing said how the extensions are kept apart in the files of the guidelines.
  Ruling: The owner left this to the agent, which decided that each extension is kept in a file of its own.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 556

1.7.2
