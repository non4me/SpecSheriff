### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 662

- Problem: Most reasons read as comments on the paragraphs of their rule's text.
  Ruling: The owner: a reason answers why its rule exists, what it solves and what it is for, as briefly as that answer allows. It speaks of the rule as a whole and does not go through the paragraphs of the text.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 665

7.3.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 667

- Problem: The rule on how a node's title is written was stated only among the rules for working with the owner, and nowhere in the guidelines.
  Ruling: The owner: the guidelines state that rule in a node of their own.
- Problem: The node required a title to be understood by a reader who sees nothing else.
  Ruling: The owner: a title is a short name for what the node is about and does not state the rule. Since the section already sets the topic, the title gives only what distinguishes the node within its section.
- Problem: Calling a title a short name gave the word "name" a second meaning, beside its meaning in the rule that one thing has one name.
  Ruling: The owner accepted a wording by which a title says in a few words what the node is about, and only what distinguishes it from the other nodes of its section.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 674

7.2.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 676

- Problem: Whether a definition may state only what the defined thing is not.
  Ruling: The owner: a definition by negation is not allowed. A definition states what the defined thing is.
- Problem: The node's text contained an example sentence.
  Ruling: The owner: the example goes into the node's examples, separate from its text.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 681

8.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 683

- Problem: The node used the name NodeKind, which says nothing by itself and which no rule explains.
  Ruling: The owner: the name NodeKind goes, and the node speaks of a project's own kind of node.
- Problem: The node implied a default value of `needsCode`, although the schema makes that value required.
  Ruling: The owner: the node's first sentence and its reason follow the schema, in which `needsCode` is required and has no default.
- Problem: The node said that a test is written before the code.
  Ruling: The owner: that sentence goes, since another rule sets the order of a test and the code it tests.
- Problem: The node stated both that a project may declare kinds of node of its own and how such a kind is declared and checked.
  Ruling: The owner split the node in two. This node keeps what a project may declare, and a new node states how such a kind is declared and checked.
- Problem: The node only implied that a project can create nodes of any kind it needs, so its reason had nothing to refer to.
  Ruling: The owner: the node opens by saying that a project can create nodes of any kind it needs.
- Problem: Which parts of a project declare its own kind of node, and in what words the node says what such a kind's `needsCode` decides.
  Ruling: The owner: a project's extension of the schema and the project's own guidelines may declare the project's own kind of node and state whether its nodes require an implementation in code. These are the words of the node on how such a kind is declared.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 696

8.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 698

- Problem: How a project's own kind of node is declared and checked was stated in a paragraph of the rule on a project's own kinds of node.
  Ruling: The owner: a node of its own states it, as a short account of the scheme: what is new, where and how it arises, and what is tied to what.
- Problem: Where a project's own kind of node is declared, and how the rule that lists the kind refers to that declaration.
  Ruling: The owner: a project adds the new kind of node to its JSON Schema, in the field `kinds`. A rule in the project's own guidelines lists the kind, and that rule's `TextRule.list.declaredIn` refers to the field `kinds`.
- Problem: The check compared only the names of the kinds that the JSON Schema and the project's own guidelines declare, so a changed `needsCode` passed unnoticed.
  Ruling: The owner: the check compares both the name and the `needsCode` of each new kind of node.
- Problem: What a kind's `needsCode` states.
  Ruling: The owner: `needsCode` states whether the kind's nodes require an implementation in code.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 707

7.6.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 709

- Problem: Whether a node must give examples of what its text states.
  Ruling: The owner: examples are allowed but not required. They are proposed whenever a node is written or changed.
- Problem: An example could show only a typical case of applying the rule and the mistake closest to that case.
  Ruling: The owner: in a rule of the SpecSheriff guidelines or of an extension, an example may also show how a project's own guidelines could refine or extend the rule.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 714

7.5.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 716

- Problem: The rule on keeping each sentence as short as its meaning allows was one of the owner's own rules for writing, not a rule of the guidelines.
  Ruling: The owner: the rule also becomes a rule of the guidelines, in a node of its own.
- Problem: Whether the nodes already agreed to must be rewritten at once to meet the new rule.
  Ruling: The owner: the rule applies to what is written from then on. An agreed node is brought into line with it when it is next changed.
- Problem: Read literally, the ban on replacing words with a label or an abbreviation would forbid common abbreviations, such as API, and the key `refs`, which the owner had kept as an abbreviation that misleads nobody.
  Ruling: The owner agreed that the ban covers only a label or an abbreviation that the specification does not define and that a reader may not know.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 723

10.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 725

- Problem: The specification counted as approved while a particular rule of the project's own guidelines was approved, so its approval status depended on the approval of a rule.
  Ruling: The owner: an owner approves the specification by a separate entry, with no rule in between. The approval status of a node or of a section does not affect that of the specification.
- Problem: The specification could not be approved while any symbol of the system's code, or any test, carried no SpecTag.
  Ruling: The owner: the specification's approval status no longer depends on SpecTags. The approval procedure shows the owner what the checks report and, if they report anything, records the approval only after the owner confirms it.
- Problem: What the approval procedure does while the specification's strict flag is on.
  Ruling: The owner: while the flag is on, the approval procedure refuses to record an approval in the cases that the rule on the strict flag names.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 732

10.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 734

- Problem: The owners had no means of making the checks refuse a commit while code that the commit leaves unchanged carries no SpecTag.
  Ruling: The owner: the specification has a `strict` flag at the same level as its approval status. Only an owner changes the flag, by a separate entry, and its default value, false, is set only by the schema.
- Problem: What happens when an owner turns the flag on, or approves the specification while the flag is on, and code without a SpecTag remains.
  Ruling: The owner: both procedures refuse to run, and each refusal names the command that lists that code instead of listing it.
- Problem: Whether the flag concerns only code without a SpecTag, and whether its name should say so.
  Ruling: The owner: the flag keeps the name `strict` and is general: a rule of the SpecSheriff guidelines, of an extension or of a project's own guidelines may make any check stricter while the flag is on. Both refusals then apply to every check that the flag makes stricter.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 741

10.10

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 743

- Problem: The node required every test of a project's own check or generator to carry the SpecTag of the rule that lists it, although such checks and generators are not the system's code.
  Ruling: The owner: a SpecTag appears only in the code that implements the system and in the tests of that code, so the requirements on the tests of a project's own checks go.
- Problem: Whether a SpecTag may appear outside the system's code, in a repository's own tools and their tests, such as a project's own checks and code generators.
  Ruling: The owner: it may, but there it names only a rule of the guidelines. Such a SpecTag never counts as implementing a rule of the base specification or of the technical appendix.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 748

10.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 750

- Problem: The node said that the reviewer is given the nodes that the code implements.
  Ruling: The owner: code implements rules, so the node speaks of the rules that the code implements.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 753

10.5
