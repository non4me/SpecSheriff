### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1174

At the step that changes the SpecSheriff tools, the following is done, by the owner's rulings of 2026-11-13:
- In node.schema.json, `TextRule.list.declaredIn` is replaced by two properties of `TextRule.list`: `jsonSchema` ({file, pointer}) and `valueList` ({file, symbol}).
- `binding.ts` checks each value of a list against the schema at the place that `pointer` names. It does so through Ajv, which the tools already use.
- Where that place holds an `enum`, `binding.ts` also checks that the `enum` holds no value missing from the list.
- The comparison with the keys of an arbitrary JSON object (the function `declaration`) is removed.
- The nodes s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm of spec.json and the node s-xr5xxa9cxf2mq5u of tools.json are moved to the new properties.
- The decision is recorded in the `meta.decisions` of the rule on lists.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1182

На шаге инструментов: `sheriff citations` перестаёт искать sid среди узлов архива, поскольку у узла в архиве нет своего sid (узел 2.5).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1184

At the step that changes the SpecSheriff tools, `sheriff citations` stops looking for sids among the nodes of the archive. A node in the archive has no sid of its own (s-f2b5zvc565s242f).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1186

На шаге инструментов: `sheriff binding` не сообщает об отставании правила-черновика (функция `drift` сейчас проверяет и черновики).

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1188

At the step that changes the SpecSheriff tools, `sheriff binding` stops reporting a draft rule whose tests or code lag behind it. At present, the function `drift` checks draft rules as well.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1190

На шаге, который меняет инструменты SpecSheriff: проверка (s-txbwsthdqhvyzd2) смотрит только правила, формулировка или тесты которых меняются в коммите; сравнивает тесты и символы кода, привязанные к правилу, а не файлы целиком; читает трейлер в сообщении коммита; отклоняет коммит, пока спецификация одобрена.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1192

At the step that changes the SpecSheriff tools, the check (s-txbwsthdqhvyzd2) is changed as follows:
- It looks only at the rules whose wording or tests change in the commit.
- It compares the tests and the symbols of the code that are bound to the rule, not whole files.
- It reads the trailer in the commit message.
- It refuses the commit while the specification is approved.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1198

На шаге инструментов: передавать ревьюеру и изменённые тесты кода системы, а не только символы вне тестов, поскольку «код» в этой проверке включает тесты; тест, который проверяет то, чего правило не говорит, — тоже дефект.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1200

At the step that changes the SpecSheriff tools, the reviewer is also given the changed tests of the system's code, not only the changed symbols outside the tests. In this check, "code" includes the tests. A test that checks something the rule does not say is a defect as well.

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1202

The restored lists

### D:\SpecSheriff\.ai_docs\t25-pass\english-stage1.md · line 1204

- 1.3.1: the values the approval status can take
- 6.1: the types a link between nodes of the specification can carry
