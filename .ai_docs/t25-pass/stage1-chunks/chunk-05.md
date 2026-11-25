### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 376

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

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 387

12.6

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 389

- Problem: By the ruling of 2026-10-31, a RecordType variant was declared in the part of the specification that declared the value selecting it. That part need not be the one that declared its RecordType.
  Ruling: The owner: a RecordType variant is declared where the RecordType it is a variant of is declared. Each variant corresponds to one combination of values of the fields that select a variant, one value for each field.
- Problem: The node spoke of domains, which another extension of the guidelines defines.
  Ruling: The owner ruled on 2026-11-16 that a rule of an extension relies only on the guidelines and on its own extension (1.7.4). So the node speaks of sections of the base specification and of parts of the system instead.
- Problem: Once a data record holds the fields of its RecordType variant alongside those of its RecordType, a field of the variant could have the same name as a field of the RecordType.
  Ruling: The owner: the name of each field that a RecordType variant declares differs from the name of every field that its RecordType declares or takes from another RecordType through `refines`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 396

12.7

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 398

- Problem: One of the sources of the values of a field with `enum` was the values that several domains add to one RecordType.
  Ruling: The owner: the contracts section declares no RecordType except fragments of formats, so no RecordType gathers values from several domains. That source is removed, together with the two rules that governed it.
- Problem: One of the listed sources was the names of the domains, which another extension of the guidelines defines.
  Ruling: The owner chose to make that source the names of the parts of the base specification, as in 12.11.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 403

12.11

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 405

- Problem: The rule made the names of the domains the values of a field, although this extension may not rely on the extension that defines domains (1.7.4).
  Ruling: The owner chose to generalise the rule: a field's values may be the names of the parts into which the base specification is divided. A part added or removed adds or removes a value.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 408

3.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 410

- Problem: The node did not say where the contracts section stands, or whether every specification needs one.
  Ruling: The owner: the contracts section is a section of its own within the base specification. It exists only where the rules of the specification share something.
- Problem: The node held what only a specification divided into domains needs: the conventions on a domain's API, the statement that the contracts section is not a domain, a domain's RecordType and a separate document of contracts for several domains.
  Ruling: Following the owner's decision that the rules not every project needs belong in extensions of the guidelines, the node speaks only of sections. Those matters move to an extension.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 415

3.2

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 417

- Problem: The first sentence of the rule was a prohibition rather than a statement of what to do.
  Ruling: The owner: the rule states what to do. Where a section needs terms of its own, they are added to the contracts section.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 420

3.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 422

- Problem: Nothing said whether a term may state what the system does with the entity it names.
  Ruling: The owner: a term only introduces an entity, while what the system does is stated in rules. A computation is behaviour, so a rule, not the term, states how a quantity is computed.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 425

12.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 427

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

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 440

11.1.3

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 442

- Problem: A domain's header had to state the domain's level.
  Ruling: The owner: the level is optional, and it is used when the domains are visualized.
- Problem: It was unclear whether two domains that notify each other through events use one another in a cycle, which the rule forbids.
  Ruling: The owner: the ban on such a cycle stays. A notification sent through an event does not make the sender a user of the receiving domain, so notifications may go in either direction.
- Problem: The header stated where the domain's code is, although SpecTags bind code to rules, not to sections or domains.
  Ruling: The owner: the header no longer states where the domain's code is.
- Problem: The header had to carry the index of the domain's sections, although a small domain may have no sections.
  Ruling: The owner: the header carries the index only where the domain has sections.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 451

11.2.1

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 453

- Problem: By the ruling of 2026-10-27, every domain stood at a level, although the level serves only to draw the diagram of the links between the domains.
  Ruling: The owner: the level is optional, and a domain's header may contain one.
- Problem: The node did not define a domain's level or say how the levels are numbered.
  Ruling: The owner: a domain's level is an optional property that shows the domain's position in the hierarchy relative to the other domains. The list of levels runs from the top of the hierarchy down, and a level's number is its place in that list.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 458

11.2.2
