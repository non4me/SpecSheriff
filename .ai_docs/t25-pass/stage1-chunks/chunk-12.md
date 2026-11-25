### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1074

- Problem: The checks of the RecordType extension stood in the main table of checks, among the checks of the SpecSheriff guidelines.
  Ruling: The owner: each extension has its own table of checks, with the same columns as the main table of checks. That table refines the main table.
- Problem: The tables of checks had no names that told the table of the SpecSheriff guidelines from the table of an extension.
  Ruling: The owner: the table of the SpecSheriff guidelines is the main table of checks. The table of an extension is the table of checks of that extension.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1079

row 12.12.1 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1081

- Problem: Whether two RecordType names that differ only in letter case count as the same name.
  Ruling: The owner: they do, so RecordType names are unique regardless of letter case.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1084

row 12.12.2 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1086

- Problem: What a field holding identifiers of other data records refers to.
  Ruling: The owner: such a field has the type of the field that identifies those data records. The RecordType of those records names that field as one of its own.
- Problem: One approved row held two requirements, each of which can be met without the other.
  Ruling: The owner: the row is split in two. This row checks the RecordType that a field with `identifierOf` refers to, and another row checks that every chain of identifiers ends.
- Problem: The row spoke of a field of type `identifier of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12. JSON Schema has no references between records, so a field refers to one by `identifierOf`, a keyword of SpecSheriff.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1093

row 12.12.3 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1095

- Problem: Whether a chain of identifiers may return to a RecordType that it has already passed.
  Ruling: The owner: it may not, since such a chain gives no type that an implementation can declare. Every chain therefore ends in a field without `identifierOf`.
- Problem: One approved row held two requirements, each of which can be met without the other.
  Ruling: The owner: the row is split in two. This row checks that every chain of identifiers ends, and another row checks the RecordType that a field with `identifierOf` refers to.
- Problem: The row spoke of a field of a type other than `identifier of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field without `identifierOf`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1102

row 12.12.5 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1104

- Problem: The row placed a RecordType variant in the part of the specification that declares the value the variant answers to.
  Ruling: The owner: following the rule on RecordType variants (s-z3dnru6qqdf9m6j), a variant is declared in the same section of the base specification as its RecordType.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1107

row 12.12.7 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1109

- Problem: Whether a field that a RecordType variant declares may have the same name as a field of its RecordType.
  Ruling: The owner: it may not, as the rule on RecordType variants (s-z3dnru6qqdf9m6j) says. No field of a variant shares its name with a field of its RecordType, including the fields taken through `refines`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1112

row 12.12.9 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1114

- Problem: The row required each value that a variant names to be one that the source of the selecting field declares. A field's values may come from several kinds of source.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so a field's values, from whatever source, stand in its `enum`. Each value that a variant names for a field is in that field's `enum`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1117

row 12.12.11 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1119

- Problem: The row spoke of a field of type `one of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field with `enum`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1122

row 12.12.12 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1124

- Problem: The row spoke of a field of type `one of`, a type that the guidelines themselves defined.
  Ruling: The owner: everything that concerns RecordTypes follows JSON Schema 2020-12, so the row speaks of a field with `enum`.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1127

row 12.12.16 of table-12-12

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1129

- Problem: No check covered the requirement that a fragment of a format refers only to other fragments of a format.
  Ruling: The owner: a row of its own checks that requirement of the rule on what a RecordType may refer to (s-8ht2hn88cu2qwz9).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1132

The text of each section

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1134

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

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1162

The todos translated from Russian

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1164

На шаге инструментов: узел описания инструментов реализует эту проверку; её тест пишется первым и сначала падает.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1166

At the step that changes the SpecSheriff tools, a node of the appendix of the tools implements this check. The check's test is written first, and it fails until the check is implemented.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1168

На шаге инструментов: тесты ниже проверяют прежний механизм — правило-посредник и его отзыв. Их переписать под запись о статусе одобрения спецификации, вместе с 7.2.3, approve.ts, binding.ts, approvals.ts и model.ts.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1170

At the step that changes the SpecSheriff tools, the tests listed for this check are rewritten. They test the former mechanism: a rule that stood for the specification's approval status, and the withdrawal of that rule's approval. They are rewritten for the entry that records the specification's approval status. Node 7.2.3 of the appendix of the tools (s-j9r8z4xdrfkfs47), approve.ts, binding.ts, approvals.ts and model.ts are changed together with them.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1172

На шаге инструментов, по вашим решениям от 2026-11-13: в node.schema.json заменить `TextRule.list.declaredIn` двумя свойствами `TextRule.list` — `jsonSchema` ({file, pointer}) и `valueList` ({file, symbol}); в `binding.ts` проверять каждое значение списка по схеме в месте `pointer` (через ajv, который инструменты уже используют), а если там `enum` — ещё и отсутствие в нём лишних значений; убрать сравнение с ключами произвольного JSON-объекта (функция `declaration`); перевести на новые свойства узлы 1.3.1 и 6.1 spec.json и узел 10 tools.json; записать решение в `meta.decisions` правила о списках.
