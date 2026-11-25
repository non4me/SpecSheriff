### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 196

- Problem: The node made the commit its actor, stated one requirement twice with different bounds, and listed cases that restated the rule on the direction of change.
  Ruling: The owner: the node states a single requirement, on the commit message. The message names by its sid each node bound by a SpecTag to code that the commit adds or changes.
- Problem: The node spoke of a symbol, although code may also be bound to a node as a whole file.
  Ruling: The owner: the node speaks of code that a SpecTag binds, rather than of a symbol.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 201

9.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 203

- Problem: The node required a node's lists of its code and its tests to be written by hand and to agree with the SpecTags.
  Ruling: The owner: the SpecSheriff tools build these lists from the SpecTags and rebuild them after every edit. Nobody writes them by hand.
- Problem: The node did not say which code and tests the lists name in a node of an extension that a project has chosen.
  Ruling: The owner: the lists in such a node name only the code and the tests of the repository where the guidelines are written, as in a node of the SpecSheriff guidelines. The owner chose to state this in each rule it concerns, rather than in one general rule.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 208

9.8

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 210

- Problem: An exemption made by a link alone would hold even though no approved wording names what it exempts, since an approval does not cover links.
  Ruling: The owner: an `exempts` link is allowed only where the exempting node's text cites its target. An exemption holds only while the exempting node is approved.
- Problem: The node exempted "a rule, or a node of a project's own kind", as though a node were something other than a rule.
  Ruling: The owner: code implements a rule, and a node is only the form in which a rule is kept. So the node speaks of exempting a rule, a rule of a project's own kind included.
- Problem: A sentence requiring the exempting node's text to cite each rule or section it exempts repeated the next sentence. For a section, it also seemed to require citing every rule under it.
  Ruling: The owner: the sentence is removed.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 217

1.4.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 219

- Problem: The node on writing a rule's test before its code also required a test to refer to its rule.
  Ruling: The owner: that requirement moves to a node of its own.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 222

1.4.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 224

- Problem: The requirement that a test refers to its rule stood in the node on writing the test before the code.
  Ruling: The owner: a node of its own states that a test must contain a reference to a rule of the specification.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 227

1.5.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 229

- Problem: The second paragraph said more about defects and edge cases than that they are no exception to the order.
  Ruling: The owner: the paragraph says only that a defect or an edge case is no exception to the order, so the code is not changed first. That a defect in a rule is first fixed in the rule goes without saying.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 232

1.5.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 234

- Problem: The node on how code is bound to its rules also covered how tests are bound.
  Ruling: The owner: the node covers code only. The paragraph on tests and its reason move to the node on a test's reference to its rule.
- Problem: The node bound code to its rules only by a SpecTag before each symbol, which a file without identifiable symbols or without comments cannot carry.
  Ruling: The owner: code is bound by a SpecTag before each symbol, by SpecTags at the start of its file, or by an entry in a bindings file at the root of the repository. The formats that allow no comments are JSON and those that a project's own guidelines name.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 239

1.6.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 241

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

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 252

10.14

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 254

- Problem: The node stood among the foundations, right after the node on the single source of truth.
  Ruling: The owner: the node moves to the section on the checks and the procedures, since it describes how generation works.
- Problem: The node required a generated copy that is kept to be checked against what the nodes produce, although the rules that every project shares provide for no kept copy.
  Ruling: The owner: that requirement moves to an extension of the guidelines. The node names the SpecSheriff tools as what regenerates everything generated from the nodes.
- Problem: The node treated what is generated as part of the system's code as an exception to the rule that everything generated is regenerated after every change.
  Ruling: The owner: such code is not an exception but a refinement of that rule. It is regenerated too, from the approved wordings of the nodes.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 261

10.15

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 263

- Problem: It was unsettled whether the generation of code from the nodes belongs to the SpecSheriff guidelines or to an extension of them.
  Ruling: The owner: the generation of code stays in the SpecSheriff guidelines. The node moves out of the extension and stands right after the node on what is generated from the nodes.
- Problem: Generated code was regenerated only once every node it comes from was approved, so a single draft held back a whole file of types.
  Ruling: The owner: the code is generated from the last approved wording of each node. Nothing is generated from a node that has never been approved.
- Problem: The node did not say what is generated from a node whose approval has been withdrawn, or from an approved node that relies on a node never approved.
  Ruling: The owner: the part generated from a node follows its last approved wording, even after that approval is withdrawn. Nothing is generated from a node whose approved wording relies on a node never approved, and the SpecSheriff tools report that node by its sid.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 270

5.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 272

- Problem: The node did not say in what form the schema is written, or whether JSON Schema is only one possible form.
  Ruling: The owner: the structure is defined by a machine-readable schema, and JSON Schema is named in parentheses as that schema's format, not as an example.
- Problem: Once the node stating that the schema is the only description of the structure was deleted, no node said so.
  Ruling: The owner: this node states that the schema is the only description of the structure.
- Problem: The node did not say that the schemas of the extensions a project has chosen are part of the schema.
  Ruling: The owner: the schema is that of the SpecSheriff guidelines, together with the schema of each chosen extension and the project's own extension of the schema.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 279

5.2
