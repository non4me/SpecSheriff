I ran the checklist script, and the skill was already loaded. I compared the four drafts with the new form of the guidelines, the agreed drafts, the continuation file and `validate.ts`.

## Checklist

V = Values built from other nodes (s-agc6fb3vx46pc23) · H = One header for each domain (s-8esbyvaj2yx5eqf) · C = `consumes` links (s-p3n666zfjdrrw6a) · E = `exempts` links (s-qvgzubkrafadqgf)

| Rule | V | H | C | E |
|---|---|---|---|---|
| 1.2.3 A rule is made of its text and its reason | ✓ | ✓ | ✗ the reason holds a definition the check relies on: "The domain of each end is the folder of that end's file" | ✓ |
| 7.1 The goal, the reader and the scope | ✓ | ✓ | ✓ | ✓ |
| 7.2.1 Who must act | ✓ | ✓ | ✓ | ✓ |
| 7.2.2 The order of the text | ✓ | ✓ | ✓ | ✓ |
| 7.2.3 General words | ✓ | ✓ | ✓ | ✓ |
| 7.2.4 Naming | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.1 Coined names | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.2 What a name says | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.3 A general word in a name | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.4 Properties | ✓ | ✓ | ✓ | ✓ |
| 7.2.4.5 Relations to other entities | ✓ | ✓ | ✓ | ✓ |
| 7.2.5 Definition by negation | ✓ | ✓ | ✓ | ✓ |
| 7.2.6 Lists that restrict | ✓ | ✓ | ✓ | ✓ |
| 7.2.7 Words that take their meaning from the specification | ✗ "its location" has no citation | ✓ | ✗ "its location" has no citation; "the files of another domain" is explained only in the reason | ✗ "its location" has no citation |
| 7.3.1 The title | ✓ | ✓ | ✓ | ✓ |
| 7.3.2 Thoughts and sentences | ✓ | ✗ "A domain may be divided into several documents (§…), only one of which holds its header" sets two facts side by side | ✓ | ✓ |
| 7.3.3 The contents of a node | ✓ | ✓ | ✓ | ✓ |
| 7.4.1 Counts in prose | ✓ | ✓ | ✓ | ✓ |
| 7.4.2 The reason | ✓ | ✓ | ✗ "A domain's header states what the domain uses…, so a `consumes` link from it says which domain uses the section" retells 11.1.3 and does not say what the check solves | ✗ "so a citation of the target counts only there" covers one detail, and the "so" does not follow |
| 7.5.1 Superfluous rules | ✓ | ✓ | ✓ | ✓ |
| 7.5.2 The length of a sentence | ✓ | ✓ | ✓ | ✓ |
| 7.5.3 Rules as tables | ✓ | ✓ | ✓ | ✓ |
| 7.6.1 The language of the specification | ✓ | ✓ | ✓ | ✓ |
| 7.6.2 Capital letters | ✓ | ✓ | ✓ | ✓ |
| 7.6.3 Examples | ✓ | ✓ | ✓ (none) | ✗ "a rule on printed receipts, since the system prints nothing" is not a typical case: such a rule is removed (7.5.1), not exempted |
| Pairing test of the reason | ✓ | ✓ | ✓ | ✓ |

## Оценка

**V, Values built from other nodes**
- согласованность: ✓ — сравнено с 6.4 (s-bpdqd9v72wg7vsz), 1.3.8 (s-9kfdycuq34beqvs) и решением от 2026-11-06, 8.6, 11.1.3, 11.1.4, 12.9, строками 10.1.10, 10.1.16, 11.3.2, 12.12.14 и с s-ztseyetus7np6br. Противоречий нет.
- целостность: ✗ — статус одобрения заголовка домена пишет `sheriff reindex` (s-ztseyetus7np6br). Сравнивать его не будет ни этот узел, ни s-95w92rnjuv3sst8. Оговорки об узлах в ячейках и об указателе задают вычисление, которое первая фраза отдаёт s-ztseyetus7np6br, а в том узле их нет.
- целесообразность: ✓ — проблема названа: построенное значение устаревает после правки или пишется вручную.
- избыточность: ✗ — оговорка «заголовок содержит его, только если у домена есть разделы» повторяет 11.1.3 и строку 11.3.2.
- недостаточность: ✗ — среди проверяемых узлов не названы узлы в ячейках `TableRule`, хотя пример как раз о строке таблицы. «Называет значение» не говорит, какое. У «расположения» нет ссылки.

**H, One header for each domain**
- согласованность: ✓ — 11.1.2 и решения от 2026-11-19, 11.1.3, строка 11.3.1 («ровно один», 2026-11-19), s-zefk589ykh37b8u.
- целостность: ✓ — проверка вынесена из s-agc6fb3vx46pc23. В impl.json строку 11.3.1 нужно перевести на новый узел.
- целесообразность: ✓ — случай из решения от 2026-11-19.
- избыточность: ✓ — повторов не найдено.
- недостаточность: ✓ — для применения правила ничего не упущено (сравнено с 11.1.2, 11.1.3, s-zefk589ykh37b8u).

**C, `consumes` links**
- согласованность: ✗ — согласованный 11.1.5 (s-hr7j7scmfkkjnws) разрешает связи между доменами «любого типа». Буквально это включает `consumes` от правила, а этот узел такую связь отвергает (как и строка 11.3.3).
- целостность: ✓ — вынесено из s-qvgzubkrafadqgf. На эти связи опираются указатель (s-2r59txnms5serdr) и строка 11.3.4 (s-bncp7gtyaukur8e).
- целесообразность: ✗ — обоснование не называет проблему.
- избыточность: ✗ — первая фраза обоснования повторяет 11.1.3.
- недостаточность: ✗ — «файлы другого домена» определены только в обосновании. Из текста не видно, относится ли к домену раздел в `specs/tech/<domain>.json`. У «расположения» нет ссылки.

**E, `exempts` links**
- согласованность: ✓ — 9.8 (s-gf6n8ge4mke3pr2), строка 10.1.19 с решением и todo от 2026-11-13, 8.2 (термин — правило только для раздела), 8.3, 8.6, 12.3a, 9.2.
- целостность: ✓ — часть о `consumes` перенесена в s-p3n666zfjdrrw6a.
- целесообразность: ✓ — освобождение без одобренной формулировки (решение 2026-11-11).
- избыточность: ✗ — фраза «ищет эту ссылку только в тексте узла» повторяет третий пункт списка.
- недостаточность: ✗ — у «расположения» нет ссылки. Из-за «то есть» раздел читается как узел одного из перечисленных типов.

## V: Values built from other nodes

**Verdict:** passes after the fixes below. The first DOUBT goes to the owner before the node is approved.

**DOUBT (owner): the approval status of a domain's header.**
- The agreed s-ztseyetus7np6br writes this status, and the sibling draft s-95w92rnjuv3sst8 says `sheriff reindex` derives it. The Domains schema says it "is built", like a section's. The owner ruled on 2026-11-06 that it is built and only shown.
- After this draft, nothing compares it. A header that someone marks approved by hand would pass every check. Today `validate.ts:99` refuses it.
- The node's own reason applies to this value word for word.
- Recommended: show the owner the owed rule and row (notes, item 2) before this node, and add the list item to this node.

**WORDING FIX:** the opening says "for each node", but three of the items name a section, a header or a field. Cell nodes are missing from what is checked, although the example is about one. "names the value" is unclear.
- Opening: "`sheriff validate` computes the following values as `sheriff reindex` writes them (§s-ztseyetus7np6br):" / «`sheriff validate` вычисляет следующие значения так, как их пишет `sheriff reindex` (§s-ztseyetus7np6br):»
- The items get "each": the links pointing at each node; the approval status of each section; the index of sections in each domain's header; beside each field with `enum`. In Russian: «каждый узел / каждого раздела / заголовке каждого домена / каждым полем».
- Closing: "`sheriff validate` checks each node of the specification in the files that the repository keeps, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6). It refuses each node whose value in its file differs from the one computed. The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and says which of these values differs." / «`sheriff validate` проверяет каждый узел спецификации в файлах, которые хранит репозиторий, включая узел в ячейке `TableRule` (§s-5fewsp22mmdz7y6). Он отвергает каждый узел, значение которого в его файле отличается от вычисленного. Отказ называет файл, sid и расположение узла в спецификации (§s-kag2m9tzdnduxdx) и говорит, какое из этих значений отличается.»

**DOUBT (agent drafts it, owner sees it as a proposal):** move the clauses "with the nodes in the cells… counted" and "which the header holds only where…" into s-ztseyetus7np6br, which is changing anyway (items 2 and 3), and cut them here. Otherwise `reindex` built from its own node and `validate` would disagree.

**WORDING FIX (example):** the current case can happen only in this repository. A better case is the mistake the code makes today:
- EN: "A section holds a `TableRule`, one cell of which holds a draft node, and every other node under the section is approved. `sheriff validate` computes the section's approval status as draft, and refuses the section if its file marks it approved. The closest mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell."
- RU: «Раздел содержит `TableRule`, в одной из ячеек которой — узел-черновик, а все остальные узлы под разделом одобрены. `sheriff validate` вычисляет статус одобрения раздела как «черновик» и отвергает раздел, если его файл отмечает раздел одобренным. Ближайшая ошибка — считать только узлы из `children` узла: так узел в ячейке пропускается.»

## H: One header for each domain

**Verdict:** passes after the fixes below.

**CUT (reason):**
- EN: "A domain may be kept in several files (§s-k73czmpkazcx7mu). So only a reading of all of them shows a missing header or a second one."
- RU: «Домен может храниться в нескольких файлах (§s-k73czmpkazcx7mu). Поэтому недостающий или второй заголовок видно, только если прочитать их все.»

**WORDING FIX (example):** a copied header keeps its sid, so s-vke5hakwf3uyrjs would refuse it too. The example should show what only this check catches:
- EN: "The domain `requests` is kept in `specs/requests/00-requests.json` and `specs/requests/intake.json`, and whoever split it opened the second file with a new header as well. `sheriff validate` refuses the domain and names both headers. Once the second file holds only sections, the domain passes."
- RU: «Домен `requests` хранится в `specs/requests/00-requests.json` и `specs/requests/intake.json`, и тот, кто его разделил, открыл второй файл ещё одним, новым заголовком. `sheriff validate` отвергает домен и называет оба заголовка. Когда во втором файле остаются только разделы, домен проходит проверку.»

**DOUBT (owner, minor):** 11.1.3 says a domain's specification "opens with its header". No row checks that the header comes first among the domain's files. Raise it only if the owner wants this checked.

## C: `consumes` links

**Verdict:** passes after the fixes below.

**WORDING FIX:**
- After the first sentence, add the sibling node's wording: "A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u)." / «Файлы домена — это файлы в его папке `specs/<domain>/` (§s-zefk589ykh37b8u).»
- Write "its location in the specification (§s-kag2m9tzdnduxdx)" / «расположение в спецификации». The same fix applies to E.

**WORDING FIX (reason), adding `cites` links to s-2r59txnms5serdr and s-bncp7gtyaukur8e:**
- EN: "The index in a domain's header, and the check for a cycle in which domains use one another, both learn from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would show a use that no domain makes."
- RU: «Указатель в заголовке домена и проверка цикла, в котором домены пользуются друг другом, узнают из связей `consumes`, какой домен каким разделом пользуется (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Любая другая связь `consumes` показала бы использование, которого нет ни у одного домена.»

**DOUBT (proposed example):**
- EN: "The header of the domain `requests` declares a `consumes` link to the section of the domain `users` that describes how a user signs in, and `sheriff validate` accepts the link. The closest mistake is to point the link at the rule in that section that the domain relies on, and `sheriff validate` then refuses the link."
- RU: «Заголовок домена `requests` объявляет связь `consumes` с разделом домена `users`, который описывает, как пользователь входит в систему, и `sheriff validate` эту связь принимает. Ближайшая ошибка — направить связь на то правило этого раздела, на которое опирается домен: тогда `sheriff validate` связь отвергает.»

**Agent, not this node:** record the 11.1.5 "any type" defect in the continuation file.

## E: `exempts` links

**Verdict:** passes after the fixes below.

**WORDING FIX (reason), adding a `cites` link to s-dpe5kcz4eamv39g:**
- EN: "A node states what it requires in its text, while its reason requires nothing (§s-dpe5kcz4eamv39g). So only a citation in the text of the exempting node shows that its approved wording names what it exempts (§s-gf6n8ge4mke3pr2)."
- RU: «Узел формулирует, чего он требует, в своём тексте, а его обоснование ничего не требует (§s-dpe5kcz4eamv39g). Поэтому только ссылка в тексте освобождающего узла показывает, что его одобренная формулировка называет то, что он освобождает (§s-gf6n8ge4mke3pr2).»

**CUT:** "`sheriff validate` looks for that citation only in the text of the node." / «Эту ссылку `sheriff validate` ищет только в тексте узла.»

**WORDING FIX (second list item):**
- EN: "the link's target is a section or a rule, a rule being a node of the kind `TextRule`, `TableRule` (§…) or `RecordType` (§…), or of a project's own kind (§…);"
- RU, using the rendering from terms-ru.md: «цель связи — раздел или правило; правилом здесь считается узел типа `TextRule`, `TableRule` (§…) или `RecordType` (§…) либо узел собственного типа в проекте (§…);»

**WORDING FIX (example):**
- EN: "A rule of `project.json` exempts the rule of the stack that chooses the programming language, since no symbol of the code can implement that choice. The exempting rule's text says so and cites that rule of the stack. The exempting rule also declares an `exempts` link to it, so `sheriff validate` accepts the link. The closest mistake is to cite the rule of the stack only in the reason, and `sheriff validate` then refuses the link."
- RU: «Правило `project.json` освобождает от имплементации правило стека, выбирающее язык программирования, потому что ни один символ в коде не может реализовать этот выбор. Текст освобождающего правила говорит это и ссылается на правило стека. Освобождающее правило также объявляет с ним связь `exempts`, поэтому `sheriff validate` связь принимает. Ближайшая ошибка — сослаться на правило стека только в обосновании: тогда `sheriff validate` связь отвергает.»

## Terms (all four)

**TERM:** none of the drafts introduces a new term.
- `consumes` is close to the [DDD] downstream context that depends on an upstream one (DDD Reference 2015). The fit is partial, since the link names a section rather than a whole context (inference).
- The name was settled earlier, so I recommend no change. A gloss belongs in the docs only.
- In Russian, the agreed s-ztseyetus7np6br says «оглавление» where row 11.3.2 says «указатель». Bring them to one word when s-ztseyetus7np6br next changes.

## Who settles what

- **Needs the owner:** the header-status question (V). The changed wording of s-ztseyetus7np6br, shown as a proposal (V). Whether the header must open the domain (H, minor).
- **The agent settles:** every other WORDING FIX and CUT, the proposed example for C, the citation of "location" in V, C and E, impl.json, and the record about 11.1.5.

Files: `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/extensions/domains.json`, `D:/SpecSheriff/skills/tools/src/validate.ts`