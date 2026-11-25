### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 105

- Problem: The node mixed the requirement to do only what the rules require with prohibitions and exceptions.
  Ruling: The owner: the node says one thing: whoever implements the specification does only what its rules require.
- Problem: The node did not say whether the rule extends to technical code, which implements none of the system's logic.
  Ruling: The owner: the rule does not extend to technical code, which implements none of the system's logic and is required by the technology the system is built with.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 110

1.3.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 112

- Problem: The node did not say whether an owner of a `TableRule` must approve each node in its cells separately.
  Ruling: The owner: an owner of a `TableRule` may approve the whole table at once. Doing so approves every draft node in its cells, and each of those approvals names that owner.
- Problem: The node did not say how many of a node's owners must approve it.
  Ruling: The owner: an approval by at least one of a node's owners is enough. The example shows a project's own guidelines requiring two approvals.
- Problem: The reason said that an approval means an owner's agreement, which does not hold where an agent approves a node on an owner's behalf.
  Ruling: The owner: an approval means that someone accountable for the rule has agreed to it. In the cases where an agent may approve on an owner's behalf, it means that the agent has approved the rule and reported it to that owner.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 119

1.3.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 121

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node did not say whether an approval covers a node's examples.
  Ruling: The owner: an approval covers the examples too, so a change to a node's examples makes the node a draft.
- Problem: The node did not say what the wording of a node in a cell of a `TableRule` includes.
  Ruling: The owner: that wording also includes the text cells of the node's row and the headings of its column and of its group.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 128

1.3.8

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 130

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: A reviewer had cut the reason down to saying that a section's status keeps up with its nodes. Why a section has a status at all was lost.
  Ruling: The owner: the reason says that a section's status shows at a glance the approval state of the nodes inside it, which helps where only sections are visible.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 135

1.3.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 137

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node did not say whether an agent may approve a node on an owner's behalf in a case other than those it lists.
  Ruling: The owner: the list of cases is exhaustive.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 142

1.3.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 144

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node exempted from withdrawal a rule of a project's own guidelines stating that the specification is approved.
  Ruling: The owner: that exception is removed, together with the sentence of the reason that explained it.
- Problem: The node did not say whether anyone may withdraw the approval of a node of an extension that the project has chosen.
  Ruling: The owner: the exception for the nodes of the SpecSheriff guidelines also covers the nodes of an extension that the project has chosen. The owner chose to state this in each rule it concerns, rather than in one general rule.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 151

1.3.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 153

- Problem: The node said only that a draft node is not implemented.
  Ruling: The owner: the node is replaced by one that says what a draft means for the specification as a whole, for a section and for a rule.
- Problem: It was unsettled whether the node should also say that no edit other than a change to a rule's title, text or reason changes the rule's status.
  Ruling: The owner: the node says only that a change to a rule's title, text or reason sets the rule to `draft`. It does not add that no other edit changes the status.
- Problem: The node mentioned domains, which an extension of the guidelines defines and a project may not have chosen.
  Ruling: The owner: the rules that every project shares do not name domains. The mention is removed, and the rule's meaning stays the same.
- Problem: The node made the check of SpecTags depend on whether the specification as a whole is approved.
  Ruling: The owner: while the specification as a whole is a draft, no test has to pass before a change reaches the project's shared branch. Nor do the checks then warn about code that is outside the commit and carries no SpecTag.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 162

9.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 164

- Problem: The node did not say clearly which parts of the specification the system's code implements, or why the tests belong to that code.
  Ruling: The owner: the system's code is the code implementing every part of the specification except its guidelines, not only the code written by hand. Its tests belong to it, since they are written before the code and the code must conform to them.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 167

9.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 169

- Problem: The node required every approved rule to be implemented even while the specification is a draft, which contradicted the node on what a draft means.
  Ruling: The owner: the requirement applies only if the specification's approval status is `approved`.
- Problem: The node did not say whether code or a test bound to a node that implements an approved rule counts towards that rule.
  Ruling: The owner: such code or such a test counts towards the rule, whether the node implements the rule directly or through a chain of `implements` links.
- Problem: The node spoke of rules and of nodes of a project's own kind side by side, as though a node were something other than the form in which a rule is kept.
  Ruling: The owner: the system's code must implement every approved rule, a rule of a project's own kind included, unless the rule is among the listed exceptions. A rule of a project's own kind whose nodes require no implementation in code is one of them.
- Problem: The node did not say whether the rules of an extension that the project has chosen must be implemented.
  Ruling: The owner: the rules of a chosen extension are exempt, like the rules of the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 178

9.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 180

- Problem: Two nodes, one on a test's SpecTag and one on the SpecTag of technical code, each stated part of what a SpecTag is for.
  Ruling: The owner: the two nodes become one, which states only what a SpecTag is for. A SpecTag binds a rule to the code that implements it and to the tests written for it.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 183

9.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 185

- Problem: The node said that rewriting a test's reference to its node, in another form that names the same node, changes no test.
  Ruling: The owner: a SpecTag must stay the same, not merely name the same node, so a SpecTag rewritten in another form is a change.
- Problem: Two nodes, one on binding a test to an approved rule and one on which code must name an approved node, each decided in part whether a SpecTag changes.
  Ruling: The owner: the two become one node, titled "A change to a SpecTag".
- Problem: The node did not say which edits leave a test or code unchanged.
  Ruling: The owner: while the SpecTag stays the same, renaming a test or rewording the comments in the code and the tests changes neither the test nor the code.
- Problem: The node did not say whether a change to a SpecTag changes the whole file it stands in or only part of it.
  Ruling: The owner: a change to a SpecTag is a change to the test or the code that the SpecTag binds. That is the symbol beneath it, or the whole file where the file is bound as a whole.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 194

9.6
