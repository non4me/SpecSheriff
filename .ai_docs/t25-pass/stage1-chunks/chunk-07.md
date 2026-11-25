### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 558

- Problem: By the owner's ruling of 2026-11-11, an extension could change a rule of the SpecSheriff guidelines through an `overrides` link, so a rule of the guidelines would not hold in every project.
  Ruling: The owner: a rule of an extension only adds a rule or refines a rule of the SpecSheriff guidelines, and it is consistent with every rule of the guidelines. An extension no longer changes a rule of the guidelines, so the `overrides` link is withdrawn.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 561

1.7.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 563

- Problem: A rule of the SpecSheriff guidelines could rely on an extension that a project has not chosen.
  Ruling: The owner decided that the rules not every project needs belong in extensions of the guidelines. So a rule of the SpecSheriff guidelines names no particular extension, cites none of its nodes and declares no link to them.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 566

1.7.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 568

- Problem: An earlier draft let an extension rely on another extension, keeping the rules that relied on it in a section of their own.
  Ruling: The owner: each extension relies only on the SpecSheriff guidelines and names no other extension, so any combination of extensions works. The earlier draft is withdrawn.
- Problem: The rule limited the words that a rule of an extension uses and the nodes that it cites, but not the types of the links it declares.
  Ruling: The owner accepted the reviewer's proposal: the links that such a rule declares are only of the types that the guidelines or its own extension define.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 573

1.7.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 575

- Problem: Nothing said where a project records which extensions of the guidelines it uses.
  Ruling: The owner: the extensions that a project has chosen are recorded in its configuration in the repository. Only the chosen ones are recorded, since the available ones come with each release of the plugin.
- Problem: Nothing said who chooses the extensions that a project uses, or how.
  Ruling: The owner: an owner of the specification chooses them, either personally, using a utility from the SpecSheriff plugin, or through an agent working for that owner. An agent changes the choice only when that owner asks it to.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 580

1.7.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 582

- Problem: Withdrawing the choice of an extension could leave nodes that rely on what the extension defines.
  Ruling: The owner: a chosen extension stays chosen while a node of the specification that is not part of the extension depends on it. The procedure that withdraws the choice refuses to do so while such a node exists, naming each such node.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 585

4.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 587

- Problem: The node could be read as treating any problem or defect of the implementation as technical debt.
  Ruling: The owner: technical debt is a shortcoming in the internal quality of the system's implementation that has been accepted on purpose. A defect is not technical debt.
- Problem: Nothing said what an entry of the technical debt section is called, or whether it carries a reason as a rule does.
  Ruling: The owner: an entry is the description of a shortcoming, which need not carry a reason. Such a description may refine the nodes it concerns.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 592

6.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 594

- Problem: The section on links did not open with what a link is. Its list of types also included `consumes`, which only domains use.
  Ruling: The owner: this node opens the section with the definition of a link. The type `consumes` moves to the extension of the guidelines that defines domains.
- Problem: No type of link let a check name the rule that it verifies.
  Ruling: The owner: a check links to the rule it verifies through a link of the type `checks`, which is written by hand.
- Problem: The type `supersedes` linked a node to an archived node, although an archived node has no sid to link to.
  Ruling: The owner accepted that the type `supersedes` is removed from the list of types of link.
- Problem: Only an extension of the guidelines could define further types of link, although a project may need a relation that the guidelines do not provide for.
  Ruling: The owner: a project's own guidelines may also define types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 603

2.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 605

- Problem: The node did not say when a section is deleted.
  Ruling: The owner: a section is deleted outright once no node is left in it.
- Problem: An archived node kept its sid, so anything could go on relying on a node that may be deleted from the archive at any time.
  Ruling: The owner: an archived node has no sid of its own, and its former sid is kept nowhere. A node restored from the archive returns to the specification with a new sid.
- Problem: An archived node could name as its replacement a node that was later removed in turn.
  Ruling: The owner: an archived node names as its replacement only a node of the specification. When that replacement is removed, the archived node names the replacement's own replacement instead, or none.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 612

6.5

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 614

- Problem: The reason said that only a term names an entity, which no longer held once an entity became anything that the specification defines.
  Ruling: The owner: the reason drops that claim and says only that a link between two terms tells how the entities they name relate. The text has no gap and stays as it is.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 617

6.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 619

- Problem: A ratio could take only the multiplicities `1`, `0..1`, `1..*` and `0..*`, so an exact number, such as the two teams of a match, could not be written.
  Ruling: The owner agreed that a ratio may give any multiplicity in UML notation: a whole number, or a range of whole numbers whose upper bound may be `*`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 622

7.6.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 624

- Problem: That a quotation matches what it quotes character for character was stated only in the reason, so it bound nobody.
  Ruling: The owner accepted moving this requirement into the text.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 627

7.2.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 629

- Problem: The rule said that a general word carries its object, and the word "object" also reads as a JSON object in the specification.
  Ruling: The owner: a general word is used together with what it applies to, and the rule no longer speaks of an object.
- Problem: The rule did not say how close to a general word the thing it applies to must appear.
  Ruling: The owner: it appears in the same phrase as the general word, never a sentence later.
- Problem: The rule did not say which parts of a node it applies to.
  Ruling: The owner: it applies to a node's text, reason, list members and table cells, but not to its title.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 636

7.2.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 638

- Problem: The rules on naming spoke of the things that names refer to without saying what such a thing is.
  Ruling: The owner: a name refers to an entity, and an entity is anything that the specification defines. A name means the same thing in every node that uses it.
- Problem: Several principles of naming were stated only in the spec-review skill, not in the specification.
  Ruling: The owner: those principles move into the specification, as the rows of a table in this node, each with a rule of its own and two examples that require nothing.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 643

7.2.4.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 645

- Problem: The rule allowed a coined name only for a thing that is a procedure, an entity, a constant or a variable.
  Ruling: Following the owner's ruling of that day that a name refers to an entity, which is anything the specification defines, that condition is dropped, since it adds nothing.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 648

7.2.4.4

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 650

- Problem: How a node writes a property's key was stated only in the spec-review skill. The ruling of 2026-10-28 made an exception for the keys `type` and `kind` without explaining it.
  Ruling: The owner: the specification states how a property's key is written next to the object it belongs to, so the key may be a general word. A property needs a name of its own only where it is also used apart from its object.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 653

7.2.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 655

- Problem: That a node explains a word whose meaning the specification sets was only a personal rule of the owner, which the wording checker applied.
  Ruling: The owner: it becomes a rule of the specification, among the rules on clarity in the section on how rules are written.
- Problem: The rule did not say which words count as taking their meaning from the specification.
  Ruling: The owner: the rule covers a name that means something only within the specification, and a common word to which the specification gives a meaning other than its everyday one, such as a narrower meaning. A common word used in its everyday meaning is not covered.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 660

7.4.2
