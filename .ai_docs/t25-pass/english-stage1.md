# The English that stage 1 added

## The owner's rulings, by node

### 1.1.1

- Problem: The node said only that the specification is the set of its nodes, and nothing about how the nodes relate to one another.
  Ruling: The owner: the node also says that the nodes are arranged in a structure. Where needed, a node refers to other nodes through links of various types.
- Problem: The reason was about the copies generated from the nodes, which this node no longer mentions.
  Ruling: The owner: the reason says that the structure and the links between the nodes help in understanding each node's context and dependencies.
- Problem: The text said that the nodes are "linked to one another by a structure", although the structure is not a link. It also said that a node "links to" other nodes, which suits only a strict link.
  Ruling: The owner: the nodes are "arranged in a structure", since the word "link" is kept for the links between nodes. A node "refers to" other nodes, since a link may also be a loose one.

### 1.1.2

- Problem: The item on the guidelines did not state precisely what they cover.
  Ruling: The owner: the guidelines say how the specification is kept and implemented.
- Problem: The node did not say whether the base specification may be divided, or how the technical appendix is structured if it is.
  Ruling: The owner: where needed, the base specification may be divided. If it is, the technical appendix inherits the structure of the base specification where the two overlap.
- Problem: The reason said that the base specification is divided because a specification may grow too large.
  Ruling: The owner: the division is not caused by size, so the reason does not mention size.
- Problem: The node mentioned domains, which an extension of the guidelines defines and a project may not have chosen.
  Ruling: The owner: the rules that every project shares do not name domains. The mention is removed, and the rule's meaning stays the same.

### 1.1.4

- Problem: The node was framed as a ban: its title and part of its text said what a rule of the base specification does not name.
  Ruling: The owner: the node says what a rule of the base specification states, namely the business logic and any further business information needed to understand the rule precisely. The list of what such a rule does not name is removed, as is the sentence that repeated the node on the technical appendix.
- Problem: The reason did not say that the base specification can be implemented on another stack.
  Ruling: The owner: the reason says that the system can be rebuilt on another stack, with another version of the technical appendix, without editing a single rule.
- Problem: The node barred the base specification from naming any technology, even one that is part of what the system does.
  Ruling: The owner: a technology that the system is built with is named only as an example, in parentheses. A technology that is part of what the system does, such as a protocol it speaks or a format it accepts, is named like anything else the rule states.

### 1.1.5

- Problem: The node that names the three parts of the specification was not followed by a node on each part.
  Ruling: The owner: each of the three parts is described in a node of its own, right after the node that names them. This node describes the technical appendix.
- Problem: The node did not say clearly whose needs set the level of detail in the technical appendix.
  Ruling: The owner: the technical appendix describes the implementation in as much detail as an agent needs to implement it.
- Problem: The node mentioned domains, which an extension of the guidelines defines and a project may not have chosen.
  Ruling: The owner: the rules that every project shares do not name domains. The mention is removed, and the rule's meaning stays the same.
- Problem: The reason relied on the base specification naming no technology at all, which no longer holds.
  Ruling: The owner: the reason says that the implementation of a rule has no other home, since the base specification names the technologies the system is built with only as examples.

### 1.1.3

- Problem: The title spoke of the whole specification, although the node is only about the guidelines.
  Ruling: The owner: the title names the guidelines.
- Problem: The node did not say whether a project may change the rules of the guidelines.
  Ruling: The owner: a project may extend the rules of the guidelines but cannot change them. Changed rules would stop the tools that check the format and the implementation against the guidelines from working correctly.
- Problem: The node also listed the cases in which a rule is dropped.
  Ruling: The owner: that list and its reason move to the section on how a rule is written.

### 8.1

- Problem: The node did not say plainly what a section is and what it must contain.
  Ruling: The owner: a section is a node that contains a group of rules. It contains at least one rule and is not itself a rule.
- Problem: The reason claimed that a term is named in a SpecTag, which agreed nodes contradict.
  Ruling: The owner: the reason says that a section groups rules where they need grouping, on a principle that its own text describes.

### 1.2.2

- Problem: The reason said that rules move between domains all the time as a specification grows.
  Ruling: The owner: the reason says that rules may move between the parts of the specification, and that a move changes a node's location but never its sid.
- Problem: The node did not say whether a node in the archive has a sid too.
  Ruling: The owner: the node speaks of a node of the specification, since a node in the archive has no sid.

### 8.2

- Problem: The node used the name NodeKind, which nothing in the guidelines explains.
  Ruling: The owner: the node says "a project's own kind" instead.
- Problem: The node did not say for what purpose these nodes are considered rules of a section.
  Ruling: The owner: these nodes are considered rules of a section only for the requirement that a section contains at least one rule.

### 1.2.3

- Problem: The node said that a rule's text states what must hold, which is only one case of what a text does.
  Ruling: The owner: the node is about the separate roles of a rule's text and its reason. The text states what the rule requires, and the reason says why that is required.
- Problem: The node did not say whether the description of a shortcoming in the technical debt needs a reason.
  Ruling: The owner: such a description may be an exception and carry no reason, since it states the shortcoming as it is.

### 1.2.4

- Problem: The list called deferred work "work put off".
  Ruling: The owner: the list says "todos", the name under which a node keeps such work.

### 1.2.5

- Problem: The node on todos was the only node in its section.
  Ruling: The owner: the node moves among the foundations, right after the node on what a node keeps, and its section is removed.
- Problem: The node did not say where a todo that concerns several nodes is kept.
  Ruling: The owner: such a todo is kept on one of those nodes and cites the others, so that each of them shows an incoming link.
- Problem: The reason referred to a node that required a list of all the todos.
  Ruling: The owner: that node is deleted, so the reason no longer refers to it. The reason says instead that a todo kept in a comment is missed wherever the todos are collected.

### 1.2.6

- Problem: The node mixed two rules: the direction in which changes flow, and the single source of truth about the system.
  Ruling: The owner: the node states only that the specification, and not the code, is the single source of truth about the system. The direction of change is stated in a node of its own.
- Problem: The node did not say whether part of a node's content may be kept in an artifact outside the specification, such as an interface contract that another team owns.
  Ruling: The owner: only a node of the technical appendix may name such an artifact, together with its version. The checks compare the code with that version, and adopting a new version is a change to the node.

### 1.2.7

- Problem: The node mixed the requirement to do only what the rules require with prohibitions and exceptions.
  Ruling: The owner: the node says one thing: whoever implements the specification does only what its rules require.
- Problem: The node did not say whether the rule extends to technical code, which implements none of the system's logic.
  Ruling: The owner: the rule does not extend to technical code, which implements none of the system's logic and is required by the technology the system is built with.

### 1.3.4

- Problem: The node did not say whether an owner of a `TableRule` must approve each node in its cells separately.
  Ruling: The owner: an owner of a `TableRule` may approve the whole table at once. Doing so approves every draft node in its cells, and each of those approvals names that owner.
- Problem: The node did not say how many of a node's owners must approve it.
  Ruling: The owner: an approval by at least one of a node's owners is enough. The example shows a project's own guidelines requiring two approvals.
- Problem: The reason said that an approval means an owner's agreement, which does not hold where an agent approves a node on an owner's behalf.
  Ruling: The owner: an approval means that someone accountable for the rule has agreed to it. In the cases where an agent may approve on an owner's behalf, it means that the agent has approved the rule and reported it to that owner.

### 1.3.5

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node did not say whether an approval covers a node's examples.
  Ruling: The owner: an approval covers the examples too, so a change to a node's examples makes the node a draft.
- Problem: The node did not say what the wording of a node in a cell of a `TableRule` includes.
  Ruling: The owner: that wording also includes the text cells of the node's row and the headings of its column and of its group.

### 1.3.8

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: A reviewer had cut the reason down to saying that a section's status keeps up with its nodes. Why a section has a status at all was lost.
  Ruling: The owner: the reason says that a section's status shows at a glance the approval state of the nodes inside it, which helps where only sections are visible.

### 1.3.6

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node did not say whether an agent may approve a node on an owner's behalf in a case other than those it lists.
  Ruling: The owner: the list of cases is exhaustive.

### 1.3.7

- Problem: The rules on approval were split between the foundations and another section.
  Ruling: The owner: the node moves into the subsection on approval among the foundations, and the section that held it is removed.
- Problem: The node exempted from withdrawal a rule of a project's own guidelines stating that the specification is approved.
  Ruling: The owner: that exception is removed, together with the sentence of the reason that explained it.
- Problem: The node did not say whether anyone may withdraw the approval of a node of an extension that the project has chosen.
  Ruling: The owner: the exception for the nodes of the SpecSheriff guidelines also covers the nodes of an extension that the project has chosen. The owner chose to state this in each rule it concerns, rather than in one general rule.

### 1.3.2

- Problem: The node said only that a draft node is not implemented.
  Ruling: The owner: the node is replaced by one that says what a draft means for the specification as a whole, for a section and for a rule.
- Problem: It was unsettled whether the node should also say that no edit other than a change to a rule's title, text or reason changes the rule's status.
  Ruling: The owner: the node says only that a change to a rule's title, text or reason sets the rule to `draft`. It does not add that no other edit changes the status.
- Problem: The node mentioned domains, which an extension of the guidelines defines and a project may not have chosen.
  Ruling: The owner: the rules that every project shares do not name domains. The mention is removed, and the rule's meaning stays the same.
- Problem: The node made the check of SpecTags depend on whether the specification as a whole is approved.
  Ruling: The owner: while the specification as a whole is a draft, no test has to pass before a change reaches the project's shared branch. Nor do the checks then warn about code that is outside the commit and carries no SpecTag.

### 9.1

- Problem: The node did not say clearly which parts of the specification the system's code implements, or why the tests belong to that code.
  Ruling: The owner: the system's code is the code implementing every part of the specification except its guidelines, not only the code written by hand. Its tests belong to it, since they are written before the code and the code must conform to them.

### 9.2

- Problem: The node required every approved rule to be implemented even while the specification is a draft, which contradicted the node on what a draft means.
  Ruling: The owner: the requirement applies only if the specification's approval status is `approved`.
- Problem: The node did not say whether code or a test bound to a node that implements an approved rule counts towards that rule.
  Ruling: The owner: such code or such a test counts towards the rule, whether the node implements the rule directly or through a chain of `implements` links.
- Problem: The node spoke of rules and of nodes of a project's own kind side by side, as though a node were something other than the form in which a rule is kept.
  Ruling: The owner: the system's code must implement every approved rule, a rule of a project's own kind included, unless the rule is among the listed exceptions. A rule of a project's own kind whose nodes require no implementation in code is one of them.
- Problem: The node did not say whether the rules of an extension that the project has chosen must be implemented.
  Ruling: The owner: the rules of a chosen extension are exempt, like the rules of the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### 9.3

- Problem: Two nodes, one on a test's SpecTag and one on the SpecTag of technical code, each stated part of what a SpecTag is for.
  Ruling: The owner: the two nodes become one, which states only what a SpecTag is for. A SpecTag binds a rule to the code that implements it and to the tests written for it.

### 9.4

- Problem: The node said that rewriting a test's reference to its node, in another form that names the same node, changes no test.
  Ruling: The owner: a SpecTag must stay the same, not merely name the same node, so a SpecTag rewritten in another form is a change.
- Problem: Two nodes, one on binding a test to an approved rule and one on which code must name an approved node, each decided in part whether a SpecTag changes.
  Ruling: The owner: the two become one node, titled "A change to a SpecTag".
- Problem: The node did not say which edits leave a test or code unchanged.
  Ruling: The owner: while the SpecTag stays the same, renaming a test or rewording the comments in the code and the tests changes neither the test nor the code.
- Problem: The node did not say whether a change to a SpecTag changes the whole file it stands in or only part of it.
  Ruling: The owner: a change to a SpecTag is a change to the test or the code that the SpecTag binds. That is the symbol beneath it, or the whole file where the file is bound as a whole.

### 9.6

- Problem: The node made the commit its actor, stated one requirement twice with different bounds, and listed cases that restated the rule on the direction of change.
  Ruling: The owner: the node states a single requirement, on the commit message. The message names by its sid each node bound by a SpecTag to code that the commit adds or changes.
- Problem: The node spoke of a symbol, although code may also be bound to a node as a whole file.
  Ruling: The owner: the node speaks of code that a SpecTag binds, rather than of a symbol.

### 9.7

- Problem: The node required a node's lists of its code and its tests to be written by hand and to agree with the SpecTags.
  Ruling: The owner: the SpecSheriff tools build these lists from the SpecTags and rebuild them after every edit. Nobody writes them by hand.
- Problem: The node did not say which code and tests the lists name in a node of an extension that a project has chosen.
  Ruling: The owner: the lists in such a node name only the code and the tests of the repository where the guidelines are written, as in a node of the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### 9.8

- Problem: An exemption made by a link alone would hold even though no approved wording names what it exempts, since an approval does not cover links.
  Ruling: The owner: an `exempts` link is allowed only where the exempting node's text cites its target. An exemption holds only while the exempting node is approved.
- Problem: The node exempted "a rule, or a node of a project's own kind", as though a node were something other than a rule.
  Ruling: The owner: code implements a rule, and a node is only the form in which a rule is kept. So the node speaks of exempting a rule, a rule of a project's own kind included.
- Problem: A sentence requiring the exempting node's text to cite each rule or section it exempts repeated the next sentence. For a section, it also seemed to require citing every rule under it.
  Ruling: The owner: the sentence is removed.

### 1.4.1

- Problem: The node on writing a rule's test before its code also required a test to refer to its rule.
  Ruling: The owner: that requirement moves to a node of its own.

### 1.4.2

- Problem: The requirement that a test refers to its rule stood in the node on writing the test before the code.
  Ruling: The owner: a node of its own states that a test must contain a reference to a rule of the specification.

### 1.5.1

- Problem: The second paragraph said more about defects and edge cases than that they are no exception to the order.
  Ruling: The owner: the paragraph says only that a defect or an edge case is no exception to the order, so the code is not changed first. That a defect in a rule is first fixed in the rule goes without saying.

### 1.5.2

- Problem: The node on how code is bound to its rules also covered how tests are bound.
  Ruling: The owner: the node covers code only. The paragraph on tests and its reason move to the node on a test's reference to its rule.
- Problem: The node bound code to its rules only by a SpecTag before each symbol, which a file without identifiable symbols or without comments cannot carry.
  Ruling: The owner: code is bound by a SpecTag before each symbol, by SpecTags at the start of its file, or by an entry in a bindings file at the root of the repository. The formats that allow no comments are JSON and those that a project's own guidelines name.

### 1.6.1

- Problem: The node said that the checks keep the specification "holding together on its own". It did not say which rules are checked, that the checks run after each of an agent's edits, or what a failed check does.
  Ruling: The owner: the checks enforce that the specification conforms to the rules of the guidelines that the table of checks lists. They also run after each edit an agent makes, and a failed check refuses the change unless the table says otherwise.
- Problem: The node did not say when the tests must pass or where they run.
  Ruling: The owner: while the specification is approved, the tests must pass before a change reaches the project's shared branch. The project's own guidelines name where the tests run, and while the specification is a draft, no test has to pass.
- Problem: The node did not require the tests of a project's own generators to pass.
  Ruling: The owner: the tests of a project's own generators must pass too, like those of the system's code and of the project's own checks.
- Problem: The node named only the main table of checks, although an extension may have a table of checks of its own.
  Ruling: The owner: the node also names the table of checks of an extension, which refines the main table of checks.
- Problem: The node did not say which approved nodes of the technical appendix the reviewer judges, or what the reviewer judges about them.
  Ruling: The owner: the reviewer judges an approved node of the technical appendix only if it has an `implements` link to a rule of the base specification. The reviewer judges whether the node refines the rules it implements and contradicts no rule of the base specification.

### 10.14

- Problem: The node stood among the foundations, right after the node on the single source of truth.
  Ruling: The owner: the node moves to the section on the checks and the procedures, since it describes how generation works.
- Problem: The node required a generated copy that is kept to be checked against what the nodes produce, although the rules that every project shares provide for no kept copy.
  Ruling: The owner: that requirement moves to an extension of the guidelines. The node names the SpecSheriff tools as what regenerates everything generated from the nodes.
- Problem: The node treated what is generated as part of the system's code as an exception to the rule that everything generated is regenerated after every change.
  Ruling: The owner: such code is not an exception but a refinement of that rule. It is regenerated too, from the approved wordings of the nodes.

### 10.15

- Problem: It was unsettled whether the generation of code from the nodes belongs to the SpecSheriff guidelines or to an extension of them.
  Ruling: The owner: the generation of code stays in the SpecSheriff guidelines. The node moves out of the extension and stands right after the node on what is generated from the nodes.
- Problem: Generated code was regenerated only once every node it comes from was approved, so a single draft held back a whole file of types.
  Ruling: The owner: the code is generated from the last approved wording of each node. Nothing is generated from a node that has never been approved.
- Problem: The node did not say what is generated from a node whose approval has been withdrawn, or from an approved node that relies on a node never approved.
  Ruling: The owner: the part generated from a node follows its last approved wording, even after that approval is withdrawn. Nothing is generated from a node whose approved wording relies on a node never approved, and the SpecSheriff tools report that node by its sid.

### 5.1

- Problem: The node did not say in what form the schema is written, or whether JSON Schema is only one possible form.
  Ruling: The owner: the structure is defined by a machine-readable schema, and JSON Schema is named in parentheses as that schema's format, not as an example.
- Problem: Once the node stating that the schema is the only description of the structure was deleted, no node said so.
  Ruling: The owner: this node states that the schema is the only description of the structure.
- Problem: The node did not say that the schemas of the extensions a project has chosen are part of the schema.
  Ruling: The owner: the schema is that of the SpecSheriff guidelines, together with the schema of each chosen extension and the project's own extension of the schema.

### 5.2

- Problem: The node did not say whether a project's extension of the schema may add new kinds of link.
  Ruling: The owner: a project's extension of the schema may add kinds of node and properties of nodes, files and links, but not new kinds of link.
- Problem: The node did not say whether a project may change a definition in the schema of an extension it has chosen.
  Ruling: The owner: a project may not change such a definition, just as it may not change one in the schema of the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### 4.1

- Problem: The node mentioned domains and RecordType, which extensions of the guidelines define and a project may not have chosen.
  Ruling: The owner: the rules that every project shares name neither domains nor RecordType. The mentions are removed, and the rule's meaning stays the same.
- Problem: A sentence defined the base specification by what it is not.
  Ruling: The owner: the sentence is removed.
- Problem: The title stated that the technical appendix is inseparable from the base specification, while the node lists what the appendix contains.
  Ruling: The owner: the title says what the technical appendix contains. The former title becomes the first paragraph of the node on how the appendix relates to the base specification.

### 4.2

- Problem: A proposed title suggested that the technical appendix implements the base specification, although it is the code that implements it.
  Ruling: The owner: the title says how the technical appendix relates to the base specification. The appendix describes the implementation, and the code implements it.
- Problem: The statement that the technical appendix is inseparable from the base specification served as the title of the node on what the appendix contains.
  Ruling: The owner: that statement opens this node as its first paragraph.

### 11.1.1

- Problem: The node assumed that the base specification is always divided into domains, and did not say what the contracts section is.
  Ruling: The owner: the node applies only if the base specification is divided into domains, and a specification not so divided is considered one domain. The contracts section is the part that the domains share, where their common entities and how they work together are agreed.
- Problem: The reason said that a domain describes its API in the format of RecordType, which another extension of the guidelines defines.
  Ruling: The owner: the sentence is removed, since a rule of an extension relies only on the guidelines and on the extension it belongs to.

### 11.1.2

- Problem: The node said that the parts of the specification are kept in files of their own.
  Ruling: The owner: the node speaks of documents rather than files.

### 2.1

- Problem: The node divided the guidelines into "their base" and the appendix of their tools, mirroring the division of the specification.
  Ruling: The owner: the node speaks simply of the guidelines, and the paragraph that introduced the name "the base of the guidelines" is removed.
- Problem: The node said that the guidelines name no technology, applying to them the ban meant for a project's base specification.
  Ruling: The owner: the ban on naming a technology applies only to a project's base specification, not to the guidelines. The sentence stating the ban is removed from this node.
- Problem: The node did not settle whether the appendix of the tools is part of the guidelines.
  Ruling: The owner: the appendix of the tools is a separate document and not part of the guidelines. What is checked, when, and what a failure costs stay in the rules of the guidelines.

### 2.2

- Problem: The node did not say how the appendix of the tools relates to the rules of the guidelines.
  Ruling: The owner: the appendix of the tools never contradicts the rules of the guidelines it implements. Each of its rules links to at least one of those rules.

### 2.3

- Problem: The node read as though every project must write rules of its own, and it said that a project's own rule implements the rule it builds on.
  Ruling: The owner: a project may add rules of its own where it needs them, but it need not. A project's own rule extends the rule it builds on, rather than implementing it.
- Problem: The node mentioned domains, which an extension of the guidelines defines and a project may not have chosen.
  Ruling: The owner: the rules that every project shares do not name domains. The mention is removed, and the rule's meaning stays the same.
- Problem: The item on the SpecSheriff guidelines counted the appendix of the tools as part of them, and the list did not name the extensions a project has chosen.
  Ruling: The owner: the appendix of the tools is not part of a project's guidelines, and the chosen extensions are an item of their own. A project's own rules may also refine a rule of a chosen extension.

### 2.4

- Problem: It was unsettled whether a rule shared by every project may require more than every project needs.
  Ruling: The owner: a shared rule requires only the minimum that every project needs for the rule to serve its purpose. A project's own guidelines only tighten or refine it.

### 2.5

- Problem: The node forbade every project to copy the SpecSheriff guidelines, SpecSheriff itself included, although that is where they are written.
  Ruling: The owner: SpecSheriff itself is the exception, since the guidelines are written there.
- Problem: The node did not say how a project uses the extensions it has chosen.
  Ruling: The owner: a project uses its chosen extensions as the SpecSheriff plugin holds them and makes no copy of them, as with the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### 12.2

- Problem: The node defined RecordType a second time, and did not say where a condition that involves several fields is written.
  Ruling: The owner: the node refers to the definition of RecordType and lists what a RecordType contains. A condition that involves several fields is written as a rule of its own, linked to the RecordType.
- Problem: The node said that a RecordType states whether each field is required.
  Ruling: The owner: a RecordType states whether the field's value is guaranteed, since it describes what the part of the system that outputs the data can guarantee.

### 12.4

- Problem: No rule required a part of the system to keep to its data format, so the RuntimeCheck generated from a RecordType had no rule to rest on.
  Ruling: The owner: a part of the system outputs and stores only data records that conform to their RecordType. The RuntimeCheck generated from the RecordType enforces this rule.
- Problem: The node also said that a data record with a field that its RecordType does not describe is refused.
  Ruling: The owner: the sentence is removed, since the word "conform" already implies it.
- Problem: The node spoke of a domain, a concept of the extension on domains, although the node belongs to the extension on RecordType.
  Ruling: The owner: the node speaks of a part of the system, as the node defining RecordType does. Its example begins "In a base specification divided into domains".

### 12.10

- Problem: The node did not say whether a RecordType may refer to a RecordType of another domain.
  Ruling: The owner: a RecordType refers only to RecordTypes of its own part of the system and to fragments of a format declared in the contracts section. The rules that describe one part of the system may still cite a RecordType of another part.
- Problem: It seemed that a RecordType needs an exception to refer to a data record of another domain by its identifier.
  Ruling: The owner: no exception is needed, since an identifier is stored as an ordinary value. RecordTypes of different domains are simply not linked.
- Problem: The node spoke of a domain, a concept of the extension on domains, although the node belongs to the extension on RecordType.
  Ruling: The owner: the node speaks of the part of the system that outputs a RecordType's data, and of the rules that describe one part of the system.

### 12.5

- Problem: The property "required" suggested that a RecordType decides what the parts of the system that read the data need.
  Ruling: The owner: the property is renamed "guaranteed", since a RecordType states what the part of the system that outputs the data can guarantee.
- Problem: The node stated the conditions for a guaranteed field and then, in a separate sentence, that no other field is guaranteed.
  Ruling: The owner: the first sentence says that a RecordType marks a field as guaranteed only where at least one of the conditions holds. The closing sentence is removed.
- Problem: It was unsettled who decides whether a field is needed: the part of the system that outputs the data, or a part that reads it.
  Ruling: The owner: the part of the system that reads the data decides whether it needs a field.
- Problem: The second condition said that the part of the system "forms" the field's value, which overlapped with "sets" in the first condition.
  Ruling: The owner: the second condition says "computes", for a value obtained anew whenever a data record is output or stored. The first condition covers a value that is set once and then kept.
- Problem: The node spoke of a domain and cited a node of the extension on domains, although the node belongs to the extension on RecordType.
  Ruling: The owner: the node speaks of the part of the system that outputs the data, and the citation of the node on domains is removed.

### 12.6

- Problem: By the ruling of 2026-10-31, a RecordType variant was declared in the part of the specification that declared the value selecting it. That part need not be the one that declared its RecordType.
  Ruling: The owner: a RecordType variant is declared where the RecordType it is a variant of is declared. Each variant corresponds to one combination of values of the fields that select a variant, one value for each field.
- Problem: The node spoke of domains, which another extension of the guidelines defines.
  Ruling: The owner ruled on 2026-11-16 that a rule of an extension relies only on the guidelines and on its own extension (1.7.4). So the node speaks of sections of the base specification and of parts of the system instead.
- Problem: Once a data record holds the fields of its RecordType variant alongside those of its RecordType, a field of the variant could have the same name as a field of the RecordType.
  Ruling: The owner: the name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from another RecordType through `refines`.

### 12.7

- Problem: One of the sources of the values of a field with `enum` was the values that several domains add to one RecordType.
  Ruling: The owner: the contracts section declares no RecordType except fragments of formats, so no RecordType gathers values from several domains. That source is removed, together with the two rules that governed it.
- Problem: One of the listed sources was the names of the domains, which another extension of the guidelines defines.
  Ruling: The owner chose to make that source the names of the parts of the base specification, as in 12.11.

### 12.11

- Problem: The rule made the names of the domains the values of a field, although this extension may not rely on the extension that defines domains (1.7.4).
  Ruling: The owner chose to generalise the rule: a field's values may be the names of the parts into which the base specification is divided. A part added or removed adds or removes a value.

### 3.1

- Problem: The node did not say where the contracts section stands, or whether every specification needs one.
  Ruling: The owner: the contracts section is a section of its own within the base specification. It exists only where the rules of the specification share something.
- Problem: The node held what only a specification divided into domains needs: the conventions on a domain's API, the statement that the contracts section is not a domain, a domain's RecordType and a separate document of contracts for several domains.
  Ruling: Following the owner's decision that the rules not every project needs belong in extensions of the guidelines, the node speaks only of sections. Those matters move to an extension.

### 3.2

- Problem: The first sentence of the rule was a prohibition rather than a statement of what to do.
  Ruling: The owner: the rule states what to do. Where a section needs terms of its own, they are added to the contracts section.

### 3.3

- Problem: Nothing said whether a term may state what the system does with the entity it names.
  Ruling: The owner: a term only introduces an entity, while what the system does is stated in rules. A computation is behaviour, so a rule, not the term, states how a quantity is computed.

### 12.1

- Problem: The node "An entity is declared once" repeated what the rules on terms (3.2 and 3.3) say, apart from two sentences that were stated nowhere else.
  Ruling: The owner: that node is removed, and this node replaces it, taking over those two sentences and the removed node's reason.
- Problem: It was unclear whether a RecordType describes only the data that a domain passes to others or also the data it stores, and whether a domain may have more than one RecordType for an entity.
  Ruling: The owner: a RecordType describes both the data a domain outputs and the data it keeps in its store. A domain may store data in one structure and pass on data in another, so it is not limited to one RecordType for an entity.
- Problem: By the owner's earlier ruling of that day, each domain could declare its own RecordType for the same entity.
  Ruling: The owner: a domain that takes data from another uses the RecordType of that data. It declares a RecordType of its own, with a different structure and a new name, only when it changes the structure of the data.
- Problem: The node tied a RecordType to an entity, which left unclear how many RecordTypes describe the same data and where each one is declared.
  Ruling: The owner: data in one format has one RecordType, declared in the only domain where such data first appears. A fragment of a format, such as an address, is declared in the contracts section instead, so that any domain may reuse it.
- Problem: The node spoke of domains, which another extension of the guidelines defines.
  Ruling: The owner ruled on 2026-11-16 that a rule of an extension relies only on the guidelines and on its own extension (1.7.4). So the node speaks of parts of the system and of sections of the base specification instead, and its example names domains only as one way of dividing the base specification.
- Problem: The node did not say whether two RecordType names that differ only in letter case count as different names.
  Ruling: Following the owner's ruling of 2026-10-30, RecordType names are unique regardless of letter case.

### 11.1.3

- Problem: A domain's header had to state the domain's level.
  Ruling: The owner: the level is optional, and it is used when the domains are visualized.
- Problem: It was unclear whether two domains that notify each other through events use one another in a cycle, which the rule forbids.
  Ruling: The owner: the ban on such a cycle stays. A notification sent through an event does not make the sender a user of the receiving domain, so notifications may go in either direction.
- Problem: The header stated where the domain's code is, although SpecTags bind code to rules, not to sections or domains.
  Ruling: The owner: the header no longer states where the domain's code is.
- Problem: The header had to carry the index of the domain's sections, although a small domain may have no sections.
  Ruling: The owner: the header carries the index only where the domain has sections.

### 11.2.1

- Problem: By the ruling of 2026-10-27, every domain stood at a level, although the level serves only to draw the diagram of the links between the domains.
  Ruling: The owner: the level is optional, and a domain's header may contain one.
- Problem: The node did not define a domain's level or say how the levels are numbered.
  Ruling: The owner: a domain's level is an optional property that shows the domain's position in the hierarchy relative to the other domains. The list of levels runs from the top of the hierarchy down, and a level's number is its place in that list.

### 11.2.2

- Problem: Once a domain's level became optional, the rules of the diagram did not say where a domain without a level is placed.
  Ruling: The owner agreed that the SpecSheriff tools draw the diagram. The domains whose header contains no level are placed together in a row of their own, below the rows of the levels.
- Problem: The rules of the diagram also stated the order of the domains within a row, which the rule on the order of the domains at the same level (11.2.3) sets.
  Ruling: The owner: that item is removed, so that only 11.2.3 sets the order within a row.

### 11.2.3

- Problem: By the owner's decision of 2026-11-09, the order of the domains was part of the rules of the diagram. Yet the map of the specification applies that order without the diagram's rows, and the tests of the tools check it separately.
  Ruling: The owner accepted the reviewer's proposal: the order of the domains is a rule of its own.
- Problem: The rule ordered all the domains in one sequence, although a domain's level already places it vertically on the diagram.
  Ruling: The owner: the rule orders only the domains at the same level, that is, those in one row of the diagram.
- Problem: The rule did not say how the domains in a row are placed relative to the domains they use.
  Ruling: The owner: first come, in alphabetical order, the domains that have no link to any other domain in the row. Each other domain is then placed to the right of every domain in the row that it uses, as close to them as possible. The appendix of the tools sets out the harder cases.

### 6.3

- Problem: The rule did not say where a node keeps the link it declares for a citation.
  Ruling: The owner: the link is kept in the node's `refs` list, apart from the citation itself.

### 6.4

- Problem: The rule said which incoming links a node of the SpecSheriff guidelines holds, but not which ones a node of an extension that the project has chosen holds.
  Ruling: The owner chose to state this qualification in each rule that it concerns. Here, a node of a chosen extension holds only the links pointing at it from that extension, as a node of the guidelines holds only those from the guidelines.

### 10.2

- Problem: The node said only that the checks run at each of an agent's edits, and its title named where an agent writes rather than what the node settles.
  Ruling: The owner: the node lists the moments at which the checks run: before an agent's edit, after each of its edits, on a commit and on a push. Its title is "When the checks run".
- Problem: The tests of the system's code ran on every push, although the guidelines require only that they pass before a change reaches the project's shared branch.
  Ruling: Following the owner's ruling on 1.6.1, the tests run on a push only where the project's own guidelines name a push as the moment at which they run.
- Problem: The tests run on a push covered the system's code and the project's own checks, but not the project's own code generators (10.9).
  Ruling: The owner agreed that those tests also cover the project's own code generators.
- Problem: The checks run after an agent's edit and on a commit came only from the main table of checks.
  Ruling: Following the owner's ruling on the tables of checks of extensions (1.7.7), those checks also include the ones in the table of checks of an extension.

### 10.3

- Problem: The rule did not say which edits the check before an edit can judge, although a shell command does not say in advance which files it will change.
  Ruling: The owner accepted that the refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.
- Problem: The check before an agent's edit guarded the approvals, but not the entries that set the specification's approval status or its `strict` flag.
  Ruling: The owner agreed that the SpecSheriff tools also refuse an agent's edit that changes those entries other than through the procedures that record or withdraw them.
- Problem: An agent could change the record of the extensions that the project has chosen by editing it directly.
  Ruling: The owner accepted that the SpecSheriff tools refuse such an edit too, unless it is made through the procedure that records or withdraws the choice.

### 7.1

- Problem: The rules on how a node is written stated no common goal, reader or scope, so those who wrote or reviewed nodes could apply them in different ways.
  Ruling: The owner: a node of its own sets out the goal of these rules, the reader of a node, the parts of a node that the rules apply to and the terms a node may use without explaining them.
- Problem: It was unclear whether the rules on how a node is written apply to the citations in a node and to its examples.
  Ruling: The owner: citations are technical information, so these rules do not apply to them. Examples are kept in the separate `examples` property, so a rule that names only the title, the text and the reason does not apply to them either.

### 7.2.1

- Problem: The rule also required a property to be stated over what the specification declares, never over what happens not to exist yet.
  Ruling: The owner: that paragraph is removed from the rule.
- Problem: The rule spoke of a rule's subject, which reads both as the grammatical subject and as the topic, and said too abstractly whom a rule binds.
  Ruling: The owner accepted a rule that distinguishes two cases. A rule that requires an action names its actor and what the actor must do, while a rule that requires a property names the thing that must have it.

### 7.3.2

- Problem: The rule did not say whether a sentence relating two facts, each of which could be disputed on its own, states one thought or two.
  Ruling: The owner: a sentence that states one relation between two facts, such as a cause, a contrast or a condition, states one thought. A sentence that sets two facts side by side with no relation between them, or that states two relations, states two thoughts.

### 7.5.1

- Problem: The rule that a superfluous rule is removed stood among the rules on what the specification governs, although it concerns every rule.
  Ruling: The owner: it is a rule about rules in general, so it stands as a node of its own in the section on how rules are written.

### 1.1.6

- Problem: The rule on owners stood after rules that already relied on the notion of an owner.
  Ruling: The owner: the rule moves ahead of them, so that the notion of an owner is introduced before it is first used.

### 1.3.1

- Problem: Rules relied on the approval status before any rule said what values it takes and what has one.
  Ruling: The owner: a node of its own introduces the approval status and what has one, ahead of the rules that use it.
- Problem: The node said that `draft` is the default status, which the schema of the nodes already states.
  Ruling: The owner: the rules of the guidelines do not name the default status, which only the schema holds.

### 1.3.3

- Problem: The conditions under which the specification, a section and a rule are approved were stated in three separate rules.
  Ruling: The owner: one node states everything about when the status is approved.
- Problem: The reason said that the status `approved` claims the agreement of one of the rule's owners, although an agent may now approve a node on an owner's behalf.
  Ruling: The owner accepted that the status claims the rule's present wording was approved by one of its owners or, as 1.3.6 allows, by an agent on an owner's behalf.

### 1.7.1

- Problem: Rules that not every system needs were part of the guidelines that every project shares.
  Ruling: The owner: such rules form extensions of the guidelines, which are delivered with the SpecSheriff plugin and the tools that carry them out. A project uses an extension only by its own choice.
- Problem: The node did not say whether the rules of an extension are rules of the SpecSheriff guidelines, or whether the extensions are kept together.
  Ruling: The owner accepted that the rules of an extension are not rules of the SpecSheriff guidelines. Each extension is kept apart from the others.
- Problem: Nothing said how the extensions are kept apart in the files of the guidelines.
  Ruling: The owner left this to the agent, which decided that each extension is kept in a file of its own.

### 1.7.2

- Problem: By the owner's ruling of 2026-11-11, an extension could change a rule of the SpecSheriff guidelines through an `overrides` link, so a rule of the guidelines would not hold in every project.
  Ruling: The owner: a rule of an extension only adds a rule or refines a rule of the SpecSheriff guidelines, and it is consistent with every rule of the guidelines. An extension no longer changes a rule of the guidelines, so the `overrides` link is withdrawn.

### 1.7.3

- Problem: A rule of the SpecSheriff guidelines could rely on an extension that a project has not chosen.
  Ruling: The owner decided that the rules not every project needs belong in extensions of the guidelines. So a rule of the SpecSheriff guidelines names no particular extension, cites none of its nodes and declares no link to them.

### 1.7.4

- Problem: An earlier draft let an extension rely on another extension, keeping the rules that relied on it in a section of their own.
  Ruling: The owner: each extension relies only on the SpecSheriff guidelines and names no other extension, so any combination of extensions works. The earlier draft is withdrawn.
- Problem: The rule limited the words that a rule of an extension uses and the nodes that it cites, but not the types of the links it declares.
  Ruling: The owner accepted the reviewer's proposal: the links that such a rule declares are only of the types that the guidelines or its own extension define.

### 1.7.5

- Problem: Nothing said where a project records which extensions of the guidelines it uses.
  Ruling: The owner: the extensions that a project has chosen are recorded in its configuration in the repository. Only the chosen ones are recorded, since the available ones come with each release of the plugin.
- Problem: Nothing said who chooses the extensions that a project uses, or how.
  Ruling: The owner: an owner of the specification chooses them, either personally, using a utility from the SpecSheriff plugin, or through an agent working for that owner. An agent changes the choice only when that owner asks it to.

### 1.7.6

- Problem: Withdrawing the choice of an extension could leave nodes that rely on what the extension defines.
  Ruling: The owner: a chosen extension stays chosen while a node of the specification that is not part of the extension depends on it. The procedure that withdraws the choice refuses to do so while such a node exists, naming each such node.

### 4.4

- Problem: The node could be read as treating any problem or defect of the implementation as technical debt.
  Ruling: The owner: technical debt is a shortcoming in the internal quality of the system's implementation that has been accepted on purpose. A defect is not technical debt.
- Problem: Nothing said what an entry of the technical debt section is called, or whether it carries a reason as a rule does.
  Ruling: The owner: an entry is the description of a shortcoming, which need not carry a reason. Such a description may refine the nodes it concerns.

### 6.1

- Problem: The section on links did not open with what a link is. Its list of types also included `consumes`, which only domains use.
  Ruling: The owner: this node opens the section with the definition of a link. The type `consumes` moves to the extension of the guidelines that defines domains.
- Problem: No type of link let a check name the rule that it verifies.
  Ruling: The owner: a check links to the rule it verifies through a link of the type `checks`, which is written by hand.
- Problem: The type `supersedes` linked a node to an archived node, although an archived node has no sid to link to.
  Ruling: The owner accepted that the type `supersedes` is removed from the list of types of link.
- Problem: Only an extension of the guidelines could define further types of link, although a project may need a relation that the guidelines do not provide for.
  Ruling: The owner: a project's own guidelines may also define types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

### 2.6

- Problem: The node did not say when a section is deleted.
  Ruling: The owner: a section is deleted outright once no node is left in it.
- Problem: An archived node kept its sid, so anything could go on relying on a node that may be deleted from the archive at any time.
  Ruling: The owner: an archived node has no sid of its own, and its former sid is kept nowhere. A node restored from the archive returns to the specification with a new sid.
- Problem: An archived node could name as its replacement a node that was later removed in turn.
  Ruling: The owner: an archived node names as its replacement only a node of the specification. When that replacement is removed, the archived node names the replacement's own replacement instead, or none.

### 6.5

- Problem: The reason said that only a term names an entity, which no longer held once an entity became anything that the specification defines.
  Ruling: The owner: the reason drops that claim and says only that a link between two terms tells how the entities they name relate. The text has no gap and stays as it is.

### 6.6

- Problem: A ratio could take only the multiplicities `1`, `0..1`, `1..*` and `0..*`, so an exact number, such as the two teams of a match, could not be written.
  Ruling: The owner agreed that a ratio may give any multiplicity in UML notation: a whole number, or a range of whole numbers whose upper bound may be `*`.

### 7.6.1

- Problem: That a quotation matches what it quotes character for character was stated only in the reason, so it bound nobody.
  Ruling: The owner accepted moving this requirement into the text.

### 7.2.3

- Problem: The rule said that a general word carries its object, and the word "object" also reads as a JSON object in the specification.
  Ruling: The owner: a general word is used together with what it applies to, and the rule no longer speaks of an object.
- Problem: The rule did not say how close to a general word the thing it applies to must appear.
  Ruling: The owner: it appears in the same phrase as the general word, never a sentence later.
- Problem: The rule did not say which parts of a node it applies to.
  Ruling: The owner: it applies to a node's text, reason, list members and table cells, but not to its title.

### 7.2.4

- Problem: The rules on naming spoke of the things that names refer to without saying what such a thing is.
  Ruling: The owner: a name refers to an entity, and an entity is anything that the specification defines. A name means the same thing in every node that uses it.
- Problem: Several principles of naming were stated only in the spec-review skill, not in the specification.
  Ruling: The owner: those principles move into the specification, as the rows of a table in this node, each with a rule of its own and two examples that require nothing.

### 7.2.4.1

- Problem: The rule allowed a coined name only for a thing that is a procedure, an entity, a constant or a variable.
  Ruling: Following the owner's ruling of that day that a name refers to an entity, which is anything the specification defines, that condition is dropped, since it adds nothing.

### 7.2.4.4

- Problem: How a node writes a property's key was stated only in the spec-review skill. The ruling of 2026-10-28 made an exception for the keys `type` and `kind` without explaining it.
  Ruling: The owner: the specification states how a property's key is written next to the object it belongs to, so the key may be a general word. A property needs a name of its own only where it is also used apart from its object.

### 7.2.7

- Problem: That a node explains a word whose meaning the specification sets was only a personal rule of the owner, which the wording checker applied.
  Ruling: The owner: it becomes a rule of the specification, among the rules on clarity in the section on how rules are written.
- Problem: The rule did not say which words count as taking their meaning from the specification.
  Ruling: The owner: the rule covers a name that means something only within the specification, and a common word to which the specification gives a meaning other than its everyday one, such as a narrower meaning. A common word used in its everyday meaning is not covered.

### 7.4.2

- Problem: Most reasons read as comments on the paragraphs of their rule's text.
  Ruling: The owner: a reason answers why its rule exists, what it solves and what it is for, as briefly as that answer allows. It speaks of the rule as a whole and does not go through the paragraphs of the text.

### 7.3.1

- Problem: The rule on how a node's title is written was stated only among the rules for working with the owner, and nowhere in the guidelines.
  Ruling: The owner: the guidelines state that rule in a node of their own.
- Problem: The node required a title to be understood by a reader who sees nothing else.
  Ruling: The owner: a title is a short name for what the node is about and does not state the rule. Since the section already sets the topic, the title gives only what distinguishes the node within its section.
- Problem: Calling a title a short name gave the word "name" a second meaning, beside its meaning in the rule that one thing has one name.
  Ruling: The owner accepted a wording by which a title says in a few words what the node is about, and only what distinguishes it from the other nodes of its section.

### 7.2.5

- Problem: Whether a definition may state only what the defined thing is not.
  Ruling: The owner: a definition by negation is not allowed. A definition states what the defined thing is.
- Problem: The node's text contained an example sentence.
  Ruling: The owner: the example goes into the node's examples, separate from its text.

### 8.3

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

### 8.4

- Problem: How a project's own kind of node is declared and checked was stated in a paragraph of the rule on a project's own kinds of node.
  Ruling: The owner: a node of its own states it, as a short account of the scheme: what is new, where and how it arises, and what is tied to what.
- Problem: Where a project's own kind of node is declared, and how the rule that lists the kind refers to that declaration.
  Ruling: The owner: a project adds the new kind of node to its JSON Schema, in the field `kinds`. A rule in the project's own guidelines lists the kind, and that rule's `TextRule.list.declaredIn` refers to the field `kinds`.
- Problem: The check compared only the names of the kinds that the JSON Schema and the project's own guidelines declare, so a changed `needsCode` passed unnoticed.
  Ruling: The owner: the check compares both the name and the `needsCode` of each new kind of node.
- Problem: What a kind's `needsCode` states.
  Ruling: The owner: `needsCode` states whether the kind's nodes require an implementation in code.

### 7.6.3

- Problem: Whether a node must give examples of what its text states.
  Ruling: The owner: examples are allowed but not required. They are proposed whenever a node is written or changed.
- Problem: An example could show only a typical case of applying the rule and the mistake closest to that case.
  Ruling: The owner: in a rule of the SpecSheriff guidelines or of an extension, an example may also show how a project's own guidelines could refine or extend the rule.

### 7.5.2

- Problem: The rule on keeping each sentence as short as its meaning allows was one of the owner's own rules for writing, not a rule of the guidelines.
  Ruling: The owner: the rule also becomes a rule of the guidelines, in a node of its own.
- Problem: Whether the nodes already agreed to must be rewritten at once to meet the new rule.
  Ruling: The owner: the rule applies to what is written from then on. An agreed node is brought into line with it when it is next changed.
- Problem: Read literally, the ban on replacing words with a label or an abbreviation would forbid common abbreviations, such as API, and the key `refs`, which the owner had kept as an abbreviation that misleads nobody.
  Ruling: The owner agreed that the ban covers only a label or an abbreviation that the specification does not define and that a reader may not know.

### 10.6

- Problem: The specification counted as approved while a particular rule of the project's own guidelines was approved, so its approval status depended on the approval of a rule.
  Ruling: The owner: an owner approves the specification by a separate entry, with no rule in between. The approval status of a node or of a section does not affect that of the specification.
- Problem: The specification could not be approved while any symbol of the system's code, or any test, carried no SpecTag.
  Ruling: The owner: the specification's approval status no longer depends on SpecTags. The approval procedure shows the owner what the checks report and, if they report anything, records the approval only after the owner confirms it.
- Problem: What the approval procedure does while the specification's strict flag is on.
  Ruling: The owner: while the flag is on, the approval procedure refuses to record an approval in the cases that the rule on the strict flag names.

### 10.7

- Problem: The owners had no means of making the checks refuse a commit while code that the commit leaves unchanged carries no SpecTag.
  Ruling: The owner: the specification has a `strict` flag at the same level as its approval status. Only an owner changes the flag, by a separate entry, and its default value, false, is set only by the schema.
- Problem: What happens when an owner turns the flag on, or approves the specification while the flag is on, and code without a SpecTag remains.
  Ruling: The owner: both procedures refuse to run, and each refusal names the command that lists that code instead of listing it.
- Problem: Whether the flag concerns only code without a SpecTag, and whether its name should say so.
  Ruling: The owner: the flag keeps the name `strict` and is general: a rule of the SpecSheriff guidelines, of an extension or of a project's own guidelines may make any check stricter while the flag is on. Both refusals then apply to every check that the flag makes stricter.

### 10.10

- Problem: The node required every test of a project's own check or generator to carry the SpecTag of the rule that lists it, although such checks and generators are not the system's code.
  Ruling: The owner: a SpecTag appears only in the code that implements the system and in the tests of that code, so the requirements on the tests of a project's own checks go.
- Problem: Whether a SpecTag may appear outside the system's code, in a repository's own tools and their tests, such as a project's own checks and code generators.
  Ruling: The owner: it may, but there it names only a rule of the guidelines. Such a SpecTag never counts as implementing a rule of the base specification or of the technical appendix.

### 10.4

- Problem: The node said that the reviewer is given the nodes that the code implements.
  Ruling: The owner: code implements rules, so the node speaks of the rules that the code implements.

### 10.5

- Problem: The node listed the cases in which a commit is refused, so a case missing from the list, such as a review run that ends in an error, would let a commit through.
  Ruling: The owner accepted a wording by which only an answer that the SpecSheriff tools can read lets the commit through. The cases became examples.

### 10.8

- Problem: The node used the name NodeKind, which no rule explains.
  Ruling: The owner: the node speaks of a kind of node instead.
- Problem: The node held a project's own check to everything that the rule listing the checks says of a check, citing that rule instead of stating the requirements. Read literally, this included the review and the tests, which that rule also lists.
  Ruling: The owner accepted a wording that states in plain words each requirement a project's own check meets, since a citation supports a statement but never replaces it.

### 10.12

- Problem: Where the SpecSheriff tools cannot run, the node refused every commit and push, while the appendix of the tools lets them through when the project's own tools pass.
  Ruling: The owner accepted that the project's own tools still run there and the commit or the push goes through unless one of them fails. Whoever makes it is told that no SpecSheriff check ran.
- Problem: In what order the project's own tools, the SpecSheriff tools and the checks run on a commit and on a push.
  Ruling: The owner: they run in three steps, from the particular to the general: the tools that rewrite files, then the project's own checks and its other tools, then the checks of the SpecSheriff guidelines. After the first step, nothing changes what the commit contains.
- Problem: The node did not say when a project's own code generators run.
  Ruling: The owner: they run in the first step, together with the generators of the SpecSheriff tools.

### 10.13

- Problem: The reviewer doubted the paragraph requiring that a procedure needed only once be removed after it has run, since no tool and no check enforces it.
  Ruling: The owner accepted a wording that keeps the paragraph. Whoever writes such a procedure carries the rule out, as with other rules that no check enforces.

### 8.6

- Problem: How a rule that has the form of a table is held in the specification.
  Ruling: The owner: each cell of the table holds either text or a node, and no separate kind of node stands for a row. The rows may be grouped under headings.

### 7.5.3

- Problem: When a rule is to be made a `TableRule`, and when a cell is to hold a node rather than text.
  Ruling: The owner: a `TableRule`, and a node in a cell, are used only where they are needed. Elsewhere a table is written in the node's text.

### 11.1.5

- Problem: The rule only allowed a link to cross a domain's boundary. Where no node of the other domain held the statement relied on, the new rule written there had to name the linking node in its `meta.todos`.
  Ruling: The owner: a node that relies on what another domain states has a link to the node of that domain that states it, of any type and to any of that domain's sections. The new rule no longer names the linking node in its `meta.todos`.

### 9.5

- Problem: Whether the rule on code and tests without a SpecTag moves to an extension for adopting an existing project or stays in the base.
  Ruling: The owner: it stays in the base, in the section on tests and code, next to the nodes on the SpecTag.
- Problem: The rule applied only while the specification was a draft, and the checks reported each symbol without a SpecTag.
  Ruling: The owner: the rule no longer depends on the specification being a draft. Instead of a message for each symbol, the checks give a single warning without a list, which names the command that lists such code by file and symbol.
- Problem: When the checks warn about code outside the commit that carries no SpecTag, and when they refuse the commit.
  Ruling: The owner: while the specification is a draft, the commit passes without a warning. While it is approved, the commit passes with the warning if the strict flag is off, and is refused if the flag is on.

### 10.9

- Problem: Whether a project's own code generators belong to an extension of the guidelines on generating code from the nodes or to the guidelines themselves.
  Ruling: The owner: code generation stays in the guidelines. The rule moves next to the rule on a project's own checks, right after it.
- Problem: The node said that what a project's own generator writes waits for the approval of the rule that lists the generator, as code generated from nodes waits for their approval.
  Ruling: The owner: the generator writes its code from the approved wordings of its nodes. While the rule that lists the generator is a draft, the code the generator has already written stays as it is.

### 13.1

- Problem: Where the rule on what the human-readable export shows belongs, since only the appendix of the tools described the export.
  Ruling: The owner accepted a plan by which an extension on the views of the specification states what the export shows. A node of the appendix of the tools states how the tools write it and implements this node.

### 13.2

- Problem: An earlier restructuring had moved the rule on the map of the specification into the appendix of the tools.
  Ruling: The owner accepted a plan by which the rule returns to the extension on the views of the specification and keeps its sid. The node of the appendix of the tools on building the map implements it.
- Problem: The rewritten node opened by calling the map a mind map and dropped phrases of the approved wording: that the map holds no facts of its own, and why a branch opens and closes.
  Ruling: The owner: the node keeps those phrases and again opens by calling the map the specification seen from above. A mind map is named only in the example.

### 1.7.7

- Problem: Once each extension had a table of checks of its own, the name "the table of checks" no longer told the tables apart.
  Ruling: The owner: the table of the SpecSheriff guidelines is "the main table of checks", and the table of an extension is "the table of checks of an extension". This node introduces the second name.

### head of table-10-1

- Problem: The node's text restated what other rules say: which checks run mechanically and when, that a check refuses unless its row says otherwise, and what each check reads.
  Ruling: The owner replaced the text with one sentence of the owner's own: the table holds the complete list of the checks that run after an edit to the specification or to the code, tests included. The reason says only why the checks stand in one table.
- Problem: Called the complete list of checks, the table contradicted the tables of checks of extensions and the rule by which a project's own guidelines add checks.
  Ruling: The owner: the table holds the complete list of the checks of the SpecSheriff guidelines.
- Problem: Once each extension had a table of checks of its own, the title "The table of checks" no longer named this table alone.
  Ruling: The owner: the table is called "the main table of checks".

### row 10.1.2 of table-10-1

- Problem: The check said only that every file matches its schema, without saying which files or which schema.
  Ruling: The owner worded the check: every file of the specification complies with its JSON Schema.

### row 10.1.3 of table-10-1

- Problem: Whether the check that no two nodes share a sid covers the nodes in the archive.
  Ruling: The owner: the check covers only the nodes of the specification, since an archived node keeps no record of its former sid.

### row 10.1.5 of table-10-1

- Problem: An archived node keeps the location it had when it was removed, and another node may later take that location.
  Ruling: The owner: the check covers only the nodes of the specification. It makes the check that no two nodes share a location redundant, so that check is removed.

### row 10.1.6 of table-10-1

- Problem: An archived term node lies in the archive rather than in the contracts section.
  Ruling: The owner: the check covers only the term nodes of the specification.
- Problem: Where a term is defined once the base specification is divided into domains.
  Ruling: The owner agreed to the check as it applies to a base specification without domains. The extension for domains extends it: a term that several domains need is defined in the contracts section, and a term that one domain needs is defined in that domain.

### row 10.1.7 of table-10-1

- Problem: Applied to the archive, the check would forbid a new term to take the name of a term that has been removed.
  Ruling: The owner: the check covers only the term nodes of the specification, so a new term may take the name of an archived one.

### row 10.1.8 of table-10-1

- Problem: The check required an approval of every node outside the SpecSheriff guidelines, including the nodes of the extensions of the guidelines that the project has chosen.
  Ruling: The owner: the check also leaves out the nodes of the extensions that the project has chosen.

### row 10.1.9 of table-10-1

- Problem: The check treated the commit as the one that acts, and covered every approval rather than those that the commit adds.
  Ruling: The owner: only the approvals that a commit adds are checked, each against the owners that its node has as of that commit.

### row 10.1.11 of table-10-1

- Problem: The check stated its rule and its exceptions in one sentence, and said that a removed node that has ever been approved is in the archive.
  Ruling: The owner: the main rule comes first and the exceptions follow separately. Such a node is placed in the archive with the reason for its removal.

### row 10.1.12 of table-10-1

- Problem: The check said only that every link names a node, although an archived node keeps no sid and the link type `supersedes` had been removed.
  Ruling: The owner: every link names a node of the specification by its sid.

### row 10.1.17 of table-10-1

- Problem: The check covered only approved nodes, sections and domain headers, and allowed capitals only in a name quoted from the code.
  Ruling: The owner: no sentence of the specification, drafts included, is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers.

### row 10.1.19 of table-10-1

- Problem: The check covered only which nodes an `exempts` link connects, although the rule on exempting a rule from being implemented also requires a citation in the text.
  Ruling: The owner: the check also requires that the text of a node declaring an `exempts` link cite the node that the link names.

### row 10.1.20a of table-10-1

- Problem: No check enforced the requirement that a rule of the SpecSheriff guidelines declares no link to a node of an extension of the guidelines.
  Ruling: The owner accepted a new check that enforces it.

### row 10.1.22 of table-10-1

- Problem: The check required every rule of the technical debt section to refine a node of the base specification, although the rule on technical debt lets a description of a defect refine a node without requiring it to.
  Ruling: The owner: that requirement goes from the check.

### row 10.1.24 of table-10-1

- Problem: The check said that a rule of a project's own guidelines refines or implements a rule of the SpecSheriff guidelines, although a project's own guidelines never implement them.
  Ruling: The owner: each rule of a project's own guidelines refines or extends a rule of the SpecSheriff guidelines.
- Problem: The check named only the SpecSheriff guidelines, though a project's own guidelines may also refine a rule of an extension that the project has chosen.
  Ruling: The owner: a rule of a project's own guidelines may refine or extend a rule of an extension that the project has chosen.

### row 10.1.25a of table-10-1

- Problem: Whether the reviewer's check of a node of the technical appendix approved in a commit refuses the commit while the specification is still a draft.
  Ruling: The owner: it always refuses the commit, since a node that contradicts the base specification is a defect even in a draft specification.

### row 10.1.26 of table-10-1

- Problem: Whether this row checks the SpecTags of the tests as well as those of the code, and which row checks where a SpecTag stands.
  Ruling: The owner: this row checks only the system's implementing code, including where its SpecTags stand. The tests are checked by a row of their own.
- Problem: For code that the commit leaves unchanged, the cost of a failure differed from the rule on code and tests without a SpecTag (s-kkbqcb9xrpaepwn).
  Ruling: The owner: for such code, the result is what that rule says.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### row 10.1.26a of table-10-1

- Problem: Which row checks the SpecTags of the tests, and where a test's SpecTag stands.
  Ruling: The owner: a row of its own checks the tests. A test's SpecTag stands where the appendix of the tools prescribes for the test's language.
- Problem: Whether the check covers every test, the tests of a project's own checks included.
  Ruling: The owner: the check covers only the tests of the system's code. A project's own checks are not part of the system's code, and only the system's code and its tests carry SpecTags.
- Problem: For a test that the commit leaves unchanged, the cost of a failure differed from the rule on code and tests without a SpecTag (s-kkbqcb9xrpaepwn).
  Ruling: The owner: for such a test, the result is what that rule says.

### row 10.1.26b of table-10-1

- Problem: An entry in the bindings file could go on naming a file that had been moved or renamed.
  Ruling: The owner: on every commit, the checks make sure that each file named in the bindings file exists. So a moved or renamed file is caught.

### row 10.1.27 of table-10-1

- Problem: The row checked a commit that withdrew the approval of a rule approving the specification. The specification's approval status is now recorded in entries made by its owners, with no such rule (s-qzthyh7yqvfhsa2).
  Ruling: The owner: each new entry on the approval status names one of the specification's owners, and no commit removes or changes such an entry. So nobody changes the status by deleting or editing the latest entry.

### row 10.1.27a of table-10-1

- Problem: Nothing checked who records the entries that set the specification's `strict` flag (s-q3pfzyaxvpr2zj2).
  Ruling: The owner: these entries are checked in the same way as the entries recording the specification's approval status.

### row 10.1.27b of table-10-1

- Problem: Nothing checked who records the choice of an extension of the guidelines, or the withdrawal of that choice (s-9ttvcwpqkehm58g).
  Ruling: The owner: these entries are checked in the same way as the entries that set the specification's `strict` flag.

### row 10.1.27c of table-10-1

- Problem: A project could choose an extension that the installed release of the SpecSheriff plugin does not deliver.
  Ruling: The owner: a project chooses only among the extensions that the SpecSheriff plugin delivers (s-mbmnsnxenmavu3z). The checks make sure that the installed release delivers every extension the project has chosen.

### row 10.1.28 of table-10-1

- Problem: The row checked both that every SpecTag names a node that exists and that a SpecTag on changed code names an approved node.
  Ruling: The owner: the check is split. This row checks only that the rule a SpecTag names exists, and a row of its own checks that a draft rule is not implemented.

### row 10.1.28a of table-10-1

- Problem: No row checked, from the side of the rule, that a draft rule is not implemented. Other rows held only parts of that requirement.
  Ruling: The owner: a row of its own checks that no commit adds or changes code or a test bound to a draft rule. The rule on what a draft means (s-utvqbypzhmgndug) requires this.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### row 10.1.34 of table-10-1

- Problem: The row said only that `meta.code` and `meta.tests` are what the SpecTags produce, without saying what these lists hold.
  Ruling: The owner: `meta.code` refers to every code file that a SpecTag naming the node binds. `meta.tests` refers to every test file holding a test with such a SpecTag, and neither list refers to any other file.
- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### row 10.1.35 of table-10-1

- Problem: A single property, `declaredIn`, named the place where a list's values are declared, whether in code, in a schema or in the settings.
  Ruling: The owner: `declaredIn` is replaced by two properties of the list, `jsonSchema` and `valueList`.
- Problem: A JSON Schema describes the format of values rather than listing them, so it cannot be matched with a list value for value.
  Ruling: The owner: the check goes from the list to the schema. Each listed value must be valid against the schema, and an exact enumeration (`enum`) in the schema lists nothing beyond the rule's list.

### row 10.1.39 of table-10-1

- Problem: Whether a citation by sid means only the form `§<sid>` or also a SpecTag.
  Ruling: The owner: both a SpecTag and `§<sid>` name a node by its sid, and the row covers both forms.

### row (unnumbered) of table-10-1

- Problem: Whether the row stays in the main table of checks, since generating code from the nodes was to be taken out of the SpecSheriff guidelines.
  Ruling: The owner: generating code from the nodes returns to the SpecSheriff guidelines, so the row stays in the main table of checks.
- Problem: The row was worded in terms of what the nodes produce at present and of generated code that waits for a draft node.
  Ruling: The owner: the row follows the rule that code is generated only from the nodes' approved wordings (s-qyjw8xez6t6adc3). Nothing is generated from a node that has never been approved.

### row 10.1.40 of table-10-1

- Problem: The row reported any rule whose tests or code lagged behind its text anywhere in the history of the repository.
  Ruling: The owner: the check looks only at the approved rules that change in a commit. Where a rule's wording changes, its tests and code change in the same commit, and where its tests change, its code does.
- Problem: A change to a rule's wording does not always need a change to its tests or its code.
  Ruling: The owner: instead of those changes, the commit message may state that the rule's implementation needs no change.
- Problem: A lag behind an approved rule was only reported, never refused.
  Ruling: The owner: while the specification is approved, such a commit is refused, naming the rule.
- Problem: Whether a lag behind an approved rule is reported while the specification is a draft.
  Ruling: The owner: while the specification is a draft, the checks that new code is bound to its rules still run. Every check of whether the implementation is complete stays silent, so this row passes.

### row 10.1.41 of table-10-1

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

### row 10.1.42 of table-10-1

- Problem: The row spoke of symbols, but code is also bound by SpecTags at the start of a file or by an entry in the bindings file.
  Ruling: The owner: the row speaks of the code that a SpecTag binds, not of a symbol. This follows the rule on how code is bound to its rules (s-kgbzk2ph9e6jfb4).

### row 10.1.43 of table-10-1

- Problem: Whether the row should also say how the review of the changed code is made.
  Ruling: The owner: the row says only what is checked. How the SpecSheriff tools make the check is stated in the appendix of the tools (s-vp24dqydygztqbt).

### row 10.1.43a of table-10-1

- Problem: A commit could leave a rule's tests and code behind its new wording merely by stating that the rule's implementation needs no change.
  Ruling: The owner: the reviewer judges whether that statement is true. A false statement costs what the lag it hides would cost, since the statement replaces the changes that would otherwise be required.
- Problem: Whether a false statement is reported while the specification is a draft.
  Ruling: The owner: while the specification is a draft, the checks that new code is bound to its rules still run. Every check of whether the implementation is complete stays silent, so this row passes.

### row 10.1.44 of table-10-1

- Problem: The row refused a push whose tests failed while the specification was approved, whether or not the project runs its tests at a push.
  Ruling: The owner: a push is refused only where the project's own guidelines name a push as the moment at which the tests run (s-m4h279nbaqkpa3t).
- Problem: Whether the row still covers the tests of a project's own generators.
  Ruling: The owner: the SpecSheriff guidelines again provide for a project's own code generators (s-km4x4s26kv7pjze), so the row covers their tests.

### head of table-11-3

- Problem: The checks of the Domains extension stood in the main table of checks, among the checks of the SpecSheriff guidelines.
  Ruling: The owner: each extension has its own table of checks, with the same columns as the main table of checks. That table refines the main table.
- Problem: The tables of checks had no names that told the table of the SpecSheriff guidelines from the table of an extension.
  Ruling: The owner: the table of the SpecSheriff guidelines is the main table of checks. The table of an extension is the table of checks of that extension.

### row 11.3.1 of table-11-3

- Problem: One approved row required both that every domain has a header and that the header's index is what the domain's sections produce. Each requirement can hold without the other.
  Ruling: The owner: the row is split in two. This row checks the header, and another row checks the index.
- Problem: A header copied into another document of a domain split across several documents passed the check.
  Ruling: The owner: every domain has exactly one header.

### row 11.3.2 of table-11-3

- Problem: One approved row required both that every domain has a header and that the header's index is what the domain's sections produce. Each requirement can hold without the other.
  Ruling: The owner: the row is split in two. This row checks the index, and another row checks that every domain has a header.
- Problem: Whether the requirement that a domain with sections carries their index is stated in this row or in the rule on a domain's header.
  Ruling: The owner: the rule on a domain's header (s-yggv9myedprnaa7) states the requirement, and this row only checks it. The rows of the main table of checks do the same.

### row 11.3.4 of table-11-3

- Problem: It was not settled through which links the domains use one another in a cycle.
  Ruling: The owner: only through the `consumes` links of the domains' headers. The links between rules cross the boundaries of domains freely and do not count.

### head of table-12-12

- Problem: The checks of the RecordType extension stood in the main table of checks, among the checks of the SpecSheriff guidelines.
  Ruling: The owner: each extension has its own table of checks, with the same columns as the main table of checks. That table refines the main table.
- Problem: The tables of checks had no names that told the table of the SpecSheriff guidelines from the table of an extension.
  Ruling: The owner: the table of the SpecSheriff guidelines is the main table of checks. The table of an extension is the table of checks of that extension.

### row 12.12.1 of table-12-12

- Problem: Whether two RecordType names that differ only in letter case count as the same name.
  Ruling: The owner: they do, so RecordType names are unique regardless of letter case.

### row 12.12.2 of table-12-12

- Problem: What a field holding identifiers of other data records refers to.
  Ruling: The owner: such a field has the type of the field that identifies those data records. The RecordType of those records names that field as one of its own.
- Problem: One approved row held two requirements, each of which can be met without the other.
  Ruling: The owner: the row is split in two. This row checks the RecordType that a field with `identifierOf` refers to, and another row checks that every chain of identifiers ends.
- Problem: The row spoke of a field of type `identifier of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12. JSON Schema has no references between records, so a field refers to one by `identifierOf`, a keyword of SpecSheriff.

### row 12.12.3 of table-12-12

- Problem: Whether a chain of identifiers may return to a RecordType that it has already passed.
  Ruling: The owner: it may not, since such a chain gives no type that an implementation can declare. Every chain therefore ends in a field without `identifierOf`.
- Problem: One approved row held two requirements, each of which can be met without the other.
  Ruling: The owner: the row is split in two. This row checks that every chain of identifiers ends, and another row checks the RecordType that a field with `identifierOf` refers to.
- Problem: The row spoke of a field of a type other than `identifier of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field without `identifierOf`.

### row 12.12.5 of table-12-12

- Problem: The row placed a RecordType variant in the part of the specification that declares the value the variant answers to.
  Ruling: The owner: following the rule on RecordType variants (s-z3dnru6qqdf9m6j), a variant is declared in the same section of the base specification as its RecordType.

### row 12.12.7 of table-12-12

- Problem: Whether a field that a RecordType variant declares may have the same name as a field of its RecordType.
  Ruling: The owner: it may not, as the rule on RecordType variants (s-z3dnru6qqdf9m6j) says. No field of a variant shares its name with a field of its RecordType, including the fields taken through `refines`.

### row 12.12.9 of table-12-12

- Problem: The row required each value that a variant names to be one that the source of the selecting field declares. A field's values may come from several kinds of source.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so a field's values, from whatever source, stand in its `enum`. Each value that a variant names for a field is in that field's `enum`.

### row 12.12.11 of table-12-12

- Problem: The row spoke of a field of type `one of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field with `enum`.

### row 12.12.12 of table-12-12

- Problem: The row spoke of a field of type `one of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field with `enum`.

### row 12.12.16 of table-12-12

- Problem: No check covered the requirement that a fragment of a format refers only to other fragments of a format.
  Ruling: The owner: a row of its own checks that requirement of the rule on what a RecordType may refer to (s-8ht2hn88cu2qwz9).

## The text of each section

- 1: The principles that every other rule of the guidelines refines, in the order of a change: the node, the rule, its approval, its test and its code, with the checks holding the whole path together.
- 2: The parts that the specification consists of.
- 3: What the parts of the specification share.
- 4: How the system is built, beside what the base specification says.
- 5: What defines the structure of the specification, and what a project may add to it.
- 6: How one node of the specification relates to another.
- 7: How a node of the specification is written.
- 8: The kinds of node and where each kind is kept.
- 9: How a test checks a rule and how the code implements it, in the order in which they are written.
- 10: How a change to the specification or the code is checked, and how a procedure that writes the specification behaves.
- 11: An extension of the guidelines: the division of the base specification into domains, and the hierarchy of the domains.
- 12: An extension of the guidelines: the format of the data that one part of the system passes to another or keeps in its store. It does not require domains, and its rules name none.
- 13: An extension of the guidelines: further documentation generated from the nodes, such as the readable export, the mindmap and the diagrams. Its rules say what each view shows. How the SpecSheriff tools build a view is described in the appendix of the tools.
- 1.1: What the specification is and what it consists of.
- 1.2: What a rule is and what it holds.
- 1.3: What the approval status is and who changes it.
- 1.4: Where the implementation of a rule starts.
- 1.5: How the code follows the rule.
- 1.6: What holds the whole path from a node to the code.
- 1.7: What holds for any extension of the guidelines, and why any combination of extensions works.
- 7.2: Each sentence and each word can be read in only one way.
- 7.3: One thought in a sentence and one requirement in a node.
- 7.4: Each statement is made in one place and is not repeated.
- 7.5: No needless rule, sentence or word.
- 7.6: The language of a node, its capital letters and its examples.
- 11.1: What a domain is and how it describes itself.
- 11.2: The place of each domain in the hierarchy of domains, and the diagram that shows that hierarchy.

## The todos translated from Russian

### На шаге инструментов: узел описания инструментов реализует эту проверку; её тест пишется первым и сначала падает.

At the step that changes the SpecSheriff tools, a node of the appendix of the tools implements this check. The check's test is written first, and it fails until the check is implemented.

### На шаге инструментов: тесты ниже проверяют прежний механизм — правило-посредник и его отзыв. Их переписать под запись о статусе одобрения спецификации, вместе с 7.2.3, approve.ts, binding.ts, approvals.ts и model.ts.

At the step that changes the SpecSheriff tools, the tests listed for this check are rewritten. They test the former mechanism: a rule that stood for the specification's approval status, and the withdrawal of that rule's approval. They are rewritten for the entry that records the specification's approval status. Node 7.2.3 of the appendix of the tools (s-j9r8z4xdrfkfs47), approve.ts, binding.ts, approvals.ts and model.ts are changed together with them.

### На шаге инструментов, по вашим решениям от 2026-11-13: в node.schema.json заменить `TextRule.list.declaredIn` двумя свойствами `TextRule.list` — `jsonSchema` ({file, pointer}) и `valueList` ({file, symbol}); в `binding.ts` проверять каждое значение списка по схеме в месте `pointer` (через ajv, который инструменты уже используют), а если там `enum` — ещё и отсутствие в нём лишних значений; убрать сравнение с ключами произвольного JSON-объекта (функция `declaration`); перевести на новые свойства узлы 1.3.1 и 6.1 spec.json и узел 10 tools.json; записать решение в `meta.decisions` правила о списках.

At the step that changes the SpecSheriff tools, the following is done, by the owner's rulings of 2026-11-13:
- In node.schema.json, `TextRule.list.declaredIn` is replaced by two properties of `TextRule.list`: `jsonSchema` ({file, pointer}) and `valueList` ({file, symbol}).
- `binding.ts` checks each value of a list against the schema at the place that `pointer` names. It does so through Ajv, which the tools already use.
- Where that place holds an `enum`, `binding.ts` also checks that the `enum` holds no value missing from the list.
- The comparison with the keys of an arbitrary JSON object (the function `declaration`) is removed.
- The nodes s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm of spec.json and the node s-xr5xxa9cxf2mq5u of tools.json are moved to the new properties.
- The decision is recorded in the `meta.decisions` of the rule on lists.

### На шаге инструментов: `sheriff citations` перестаёт искать sid среди узлов архива, поскольку у узла в архиве нет своего sid (узел 2.5).

At the step that changes the SpecSheriff tools, `sheriff citations` stops looking for sids among the nodes of the archive. A node in the archive has no sid of its own (s-f2b5zvc565s242f).

### На шаге инструментов: `sheriff binding` не сообщает об отставании правила-черновика (функция `drift` сейчас проверяет и черновики).

At the step that changes the SpecSheriff tools, `sheriff binding` stops reporting a draft rule whose tests or code lag behind it. At present, the function `drift` checks draft rules as well.

### На шаге, который меняет инструменты SpecSheriff: проверка (s-txbwsthdqhvyzd2) смотрит только правила, формулировка или тесты которых меняются в коммите; сравнивает тесты и символы кода, привязанные к правилу, а не файлы целиком; читает трейлер в сообщении коммита; отклоняет коммит, пока спецификация одобрена.

At the step that changes the SpecSheriff tools, the check (s-txbwsthdqhvyzd2) is changed as follows:
- It looks only at the rules whose wording or tests change in the commit.
- It compares the tests and the symbols of the code that are bound to the rule, not whole files.
- It reads the trailer in the commit message.
- It refuses the commit while the specification is approved.

### На шаге инструментов: передавать ревьюеру и изменённые тесты кода системы, а не только символы вне тестов, поскольку «код» в этой проверке включает тесты; тест, который проверяет то, чего правило не говорит, — тоже дефект.

At the step that changes the SpecSheriff tools, the reviewer is also given the changed tests of the system's code, not only the changed symbols outside the tests. In this check, "code" includes the tests. A test that checks something the rule does not say is a defect as well.

## The restored lists

- 1.3.1: the values the approval status can take
- 6.1: the types a link between nodes of the specification can carry
