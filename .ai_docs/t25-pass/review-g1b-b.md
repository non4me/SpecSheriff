The skill was loaded and I ran `node .claude/vt/writing-rules.mjs`. Every finding of `review-g1-b.md` on these four drafts has been dealt with: fixed in the draft, or recorded in the continuation file or in `group1-notes.md`.

## Checklist

V = Values built from other nodes (s-agc6fb3vx46pc23) · H = One header for each domain (s-8esbyvaj2yx5eqf) · C = `consumes` links (s-p3n666zfjdrrw6a) · E = `exempts` links (s-qvgzubkrafadqgf)

| Rule | V | H | C | E |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✓ | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✗ "`sheriff validate` computes the following values as `sheriff reindex` writes them": the main thought, the refusal, comes only in the second paragraph | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✓ | ✓ | ✓ | ✓ |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✓ | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ (several rows of one kind in one node, as in the agreed s-vke5hakwf3uyrjs) | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✓ | ✗ "So only a citation in the text of the exempting node shows…": justifies only the third condition and never says what the check prevents |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ | ✓ |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ |

## Оценка

**V**
- согласованность: ✓ — сравнено с 1.3.8 (s-9kfdycuq34beqvs) и его решением от 2026-11-06, 6.4 (s-bpdqd9v72wg7vsz), 11.1.4, 12.9, строками 10.1.10, 10.1.16, 11.3.2 (решения от 2026-11-18) и 12.12.14, с согласованным s-ztseyetus7np6br и прецедентом s-vke5hakwf3uyrjs.
- целостность: ✓ — пункт о статусе заголовка и пример опираются на предложения Q2 и proposal:s-ztseyetus7np6br, это указано в dependsOn. Строка 11.3.2a в impl.json и new:tools-7-1-validate названы в notes. Расположение проверяет s-stxmhq3hgfndvn6.
- целесообразность: ✓ — проблема названа: построенное значение устаревает или вписано вручную.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✓ — пробелов не найдено.

**H**
- согласованность: ✓ — 11.1.2 и его решения от 2026-11-19, 11.1.3, строка 11.3.1 («ровно один», 2026-11-19), s-zefk589ykh37b8u, new:tools-7-1-term-contracts (там тоже «папка»).
- целостность: ✓ — узел выделен из s-agc6fb3vx46pc23. Скопированный заголовок с тем же sid ловит s-vke5hakwf3uyrjs. Перенос строки 11.3.1 в impl.json указан в notes.
- целесообразность: ✓ — случай из решения от 2026-11-19.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✓ — пробелов не найдено. Вопрос о том, что заголовок должен идти первым, в notes помечен как необязательный.

**C**
- согласованность: ✗ — обоснование говорит, что другая связь показала бы «использование, которого нет ни у одного домена». Но в ошибке из собственного примера узла домен этим разделом пользуется (11.1.3). Дефект 11.1.5 («любого типа») уже записан в файл продолжения.
- целостность: ✓ — узел выделен из s-qvgzubkrafadqgf. Без расширения Domains связь `consumes` отвергает схема (файл продолжения, строка 81). Перенос строки 11.3.3 в impl.json указан в notes.
- целесообразность: ✓ — проблема названа: от этих связей зависят указатель и проверка цикла (строка 11.3.4).
- избыточность: ✓ — s-pvnnr844f3y964m и s-c4rn9fj4czk768b эту проверку не повторяют.
- недостаточность: ✓ — пробелов не найдено.

**E**
- согласованность: ✓ — 9.8 и его решения от 2026-11-11, строка 10.1.19 с решением и todo от 2026-11-13, 9.2, 8.3, 8.6, 12.3a, 6.3.
- целостность: ✓ — проверка `consumes` перенесена в s-p3n666zfjdrrw6a, цель связи проверяет s-c4rn9fj4czk768b.
- целесообразность: ✗ — обоснование не называет проблему: недопустимая связь скрыла бы правило, которое код не реализует.
- избыточность: ✗ — вывод обоснования повторяет обоснование 9.8.
- недостаточность: ✓ — пробелов не найдено.

## Findings

**V: not ready.** The author can fix it.
- **WORDING FIX** (7.2.2). Open with the refusal, as the agreed s-vke5hakwf3uyrjs and the group's "Form" decision do:
  - First sentence, EN: "`sheriff validate` refuses each node in which a value built from other nodes differs from the value that `sheriff reindex` would write (§s-ztseyetus7np6br). It computes the following values:"
  - First sentence, RU: «`sheriff validate` отвергает каждый узел, в котором значение, построенное из других узлов, отличается от значения, которое записал бы `sheriff reindex` (§s-ztseyetus7np6br). Он вычисляет следующие значения:»
  - Then cut "It refuses each node whose value in its file differs from the one computed." and its Russian.

**H: ready.** No findings.

**C: not ready.** The author can fix both points.
- **WORDING FIX** (the reason's second sentence), EN: "Any other `consumes` link would make the index or the cycle check wrong." RU: «Любая другая связь `consumes` сделала бы неверным указатель или проверку цикла.»
- **WORDING FIX** (the example, Russian only). In «с разделом домена `users`, который описывает…», «который» can attach to «домена». Replace with «с разделом домена `users`, описывающим, как пользователь входит в систему».

**E: not ready.** The author can fix both points.
- **WORDING FIX** (the reason). The link to s-6fw72j65jkqrfpf replaces the link to s-dpe5kcz4eamv39g.
  - EN: "An `exempts` link lifts the requirement that the system's code implement its target (§s-6fw72j65jkqrfpf). So a link that the rule on exempting a rule does not allow (§s-gf6n8ge4mke3pr2) would hide a rule that the system's code does not implement."
  - RU: «Связь `exempts` снимает требование, чтобы код системы реализовал её цель (§s-6fw72j65jkqrfpf). Поэтому связь, которую не допускает правило об освобождении правила от имплементации (§s-gf6n8ge4mke3pr2), скрыла бы правило, которое код системы не реализует.»
- **WORDING FIX** (the example). "so `sheriff validate` accepts the link" makes declaring the link the reason it is accepted. Write "…to it, and `sheriff validate` accepts the link." / «…, и `sheriff validate` эту связь принимает.»

**TERM:** none of the drafts introduces a new term.
- `consumes` partly matches the DDD downstream context that uses an upstream one (DDD Reference 2015, inference). The owner settled the name, so I recommend no change.
- `exempts` and the header's index have no counterpart in the registry.

**Only the owner can answer:** nothing new. V still depends on Q2 and on proposal:s-ztseyetus7np6br, which `group1-notes.md` already puts to the owner.

Files:
- D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json
- D:/SpecSheriff/.ai_docs/t25-pass/group1-notes.md
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json
- D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json
- D:/SpecSheriff/skills/tools/src/validate.ts