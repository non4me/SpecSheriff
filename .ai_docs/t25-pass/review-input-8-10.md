# Nodes of sections 8, 9, 10 as they will stand (generated 2026-11-10T00:41:02.440Z)

A node with a draft takes it from newform.json. A node moving unchanged takes the present node of spec.json.

## 8.1 | drafted | from present 1.3 | s-7445ahgjck2aefg

Title: A section holds rules and requires nothing
Russian title: Раздел содержит правила и ничего не требует

Text:
A section is a container of rules. Its text states what the section is responsible for. The text requires nothing, since every requirement is a rule.

A section holds at least one rule, where:

- a term node or a node of a project's own NodeKind (§s-vsh384ybt4w25a2) counts as one;
- the rules of the sections inside it count as its own.

A section whose rules have all gone is deleted. Every link and citation naming it is moved to the node that now holds its matter, or removed.

Reason:
A requirement written into a section's text is a rule nobody can cite, name in a SpecTag or check on its own. A section with no rule states a responsibility nothing in the code answers to.

A term node and a node of a project's own NodeKind each state on their own what must hold, as a rule does. A term states what its word means in every rule that uses it. A node of a project's own NodeKind states what its NodeKind is declared for. Each is cited by its sid and named by SpecTags, so a section holding one holds a requirement.

Russian text:
Раздел — это контейнер правил. Его текст говорит, за что раздел отвечает. Текст ничего не требует, поскольку каждое требование — это правило.

Раздел содержит хотя бы одно правило, при этом:

- узел термина или узел собственного NodeKind проекта (§s-vsh384ybt4w25a2) считается правилом;
- правила разделов внутри него считаются его собственными.

Раздел, все правила которого ушли, удаляется. Каждая связь и каждая ссылка, называющая его, переносится на узел, который теперь держит его предмет, или удаляется.

Russian reason:
Требование, записанное в текст раздела, — это правило, на которое никто не может сослаться, которое нельзя назвать в SpecTag и нельзя проверить отдельно. Раздел без правил заявляет ответственность, которой ничто в коде не отвечает.

Узел термина и узел собственного NodeKind проекта каждый сам по себе говорит, что должно выполняться, как и правило. Термин говорит, что его слово значит в каждом правиле, которое его использует. Узел собственного NodeKind проекта говорит то, для чего объявлен его NodeKind. На каждый ссылаются по sid и его называют SpecTag, поэтому раздел, содержащий такой узел, содержит требование.

What changed against the present node:
- Заголовок: «A section holds rules» — вторая половина нынешнего заголовка 1.3, а «and requires nothing» — новые слова, из абзаца 2 его текста.
- Текст — абзацы 2–4 нынешнего 1.3, обоснование — его абзацы 2–3, дословно.
- Сохраняет sid 1.3: на часть о разделах указывают почти все ссылки на 1.3.
- По вашему решению основные правила не называют домены и RecordType.

## 8.2 | drafted | from present 1.4 | s-kag2m9tzdnduxdx

Title: A node's location names where it is in the specification
Russian title: Расположение узла называет, где он находится в спецификации

Text:
A node's location names where it is in the specification: the part it is in, followed by its place there. A term's place is the term's name. Any other node's place is its number among the nodes under the same parent that are not terms. Beside this:

- the node at the top of a file of the guidelines, of the technical appendix or of contracts is located by the part's name and the file's;
- each file of the guidelines and of the appendix numbers its nodes under its top node's location;
- the part contracts is numbered under the part's name straight through its files.

The location is computed from where the node is, never written by hand. Nothing cites a node by its location.

Reason:
The location stays where a person reads, computed so that it can never disagree with where the node is. A location changes whenever its node moves, so a citation by it would break (§s-9spq78kdwsxr759).

Russian text:
Расположение узла называет, где он находится в спецификации: часть, в которой он находится, а за ней его место в ней. Место термина — имя термина. Место любого другого узла — его номер среди узлов того же родителя, которые не являются терминами. Кроме того:

- узел на вершине файла guidelines, технического приложения или contracts располагается по имени части и имени файла;
- каждый файл guidelines и приложения нумерует свои узлы под расположением своего верхнего узла;
- часть contracts нумеруется под именем части сквозь все свои файлы.

Расположение вычисляется из того, где узел находится, и никогда не пишется вручную. Ничто не ссылается на узел по его расположению.

Russian reason:
Расположение остаётся там, где читает человек, и вычисляется так, чтобы никогда не расходиться с тем, где узел находится. Расположение меняется всякий раз, когда узел переносят, поэтому ссылка по нему сломалась бы (§s-9spq78kdwsxr759).

What changed against the present node:
- Заголовок — вторая половина нынешнего заголовка 1.4.
- Текст — абзацы 2–3 нынешнего 1.4, дословно, кроме «Its location» → «A node's location»: подлежащее теперь в этом узле.
- Обоснование — абзац 2 нынешнего 1.4 и новая фраза: почему ничто не ссылается по расположению, со ссылкой на 1.2.2.
- Сохраняет sid 1.4: на расположение указывают ссылки и все четыре теста.
- По вашему решению основные правила не называют домены и RecordType.

## 8.3 | moves unchanged | from present 1.23 | s-vsh384ybt4w25a2

Title: A project's own NodeKind is numbered, counted and implemented as a rule is
Russian title: Собственный NodeKind проекта нумеруется, считается и реализуется как правило

Text:
The nodes of a project's own NodeKind, declared in the extension of the schema (§s-eferktypcj7njt5), are held as rules are in these respects:

- they are numbered as rules are (§s-kag2m9tzdnduxdx);
- they count as rules of the section they stand in (§s-7445ahgjck2aefg);
- unless the extension declares that they need no code, they are implemented and tested as a rule is (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).

A declaration that they need no code exempts them from being implemented (§s-6fw72j65jkqrfpf).

A rule of the project's own guidelines, refining this one, lists each such NodeKind with whether its nodes need code. Its `TextRule.list` names the extension as its declaration, in `declaredIn`. The check of lists compares the list with that declaration (§s-jau82aq9juv9zzh).

Reason:
A project needs NodeKinds the SpecSheriff guidelines cannot foresee. Most of them are one more sort of requirement. So a NodeKind is held as a rule is unless declared otherwise. No check then meets a node whose duties nobody stated.

A NodeKind whose nodes need no code is exempted once, for all its nodes. Listed in a rule of the project's own guidelines, such a NodeKind is approved by one of the specification's owners, as every exemption is (§s-6fw72j65jkqrfpf).

Russian text:
(none yet)

Russian reason:
(none yet)

## 8.4 | moves unchanged | from present 1.15 | s-v7vd4ydrwexsgsj

Title: A member of `TextRule.list` may be an object
Russian title: Элемент TextRule.list может быть объектом

Text:
Each member of `TextRule.list` is a primitive value or an object. In an object, the property the list names holds the member's value. The object's other properties hold what is stated of that value, each of them a primitive value, a list or an object.

Reason:
What is stated of a value, held in that value's own object, is never taken for what is stated of another. The named property stays where the value is declared. So the members are read, and compared with their declaration, the same whatever else they hold.

Russian text:
(none yet)

Russian reason:
(none yet)

## 9.1 | drafted | from present 1.10 | s-gqbj8849rf224qa

Title: A decision lives on the rule it settled
Russian title: Решение хранится в правиле, по которому принято

Text:
A decision records what was settled about a rule. It is kept in that rule's `meta.decisions`. A decision usually changes the rule's wording. A procedural one changes none.

Reason:
A decision is not specification but the history of one rule. It is read beside that rule. A procedural decision would otherwise leave no trace, because nothing in the wording shows it.

The number of decisions on one rule also measures how well it was written. A rule that keeps collecting them was written badly.

Russian text:
Решение записывает то, что было решено о правиле. Оно хранится в `meta.decisions` этого правила. Решение обычно меняет формулировку правила. Процедурное решение не меняет никакой.

Russian reason:
Решение — не спецификация, а история одного правила. Его читают рядом с этим правилом. Иначе процедурное решение не оставило бы следа, потому что в формулировке ничто его не показывает.

Число решений по одному правилу также измеряет, насколько хорошо оно написано. Правило, которое продолжает их собирать, написано плохо.

What changed against the present node:
- Убрано «never as a document of its own»: это держит 1.2.4. Остальное — нынешний 1.10, дословно.

## 9.2 | drafted | from present 1.11 | s-t28j22vbdmmeqnh

Title: A todo lives on the node it concerns
Russian title: Todo хранится в узле, которого касается

Text:
Work put off that concerns one node is kept as an item of that node's `meta.todos`. It is never kept in a comment on the node. A problem of the default implementation set aside is a rule of the technical debt instead (§s-2r7k2aeyusgy6fw).

An item holds the day the work was put off, who its author is and what is to be done. An item is removed once it is done or given up.

Reason:
Work put off is read beside the node it concerns, as a decision is, so whoever opens the node sees what still waits on it. Kept in a comment, it is missed by the listing of every item (§s-5z7d52ykd6bzctg).

An item's date orders the listing (§s-5z7d52ykd6bzctg). Its author tells the reader whom to ask. An item left once done or given up shows work waiting that no longer waits.

Russian text:
Отложенная работа, касающаяся одного узла, хранится как элемент `meta.todos` этого узла. Она никогда не хранится в комментарии к узлу. Отложенная проблема реализации по умолчанию — это вместо этого правило технического долга (§s-2r7k2aeyusgy6fw).

Элемент содержит день, когда работа была отложена, кто является автором и что нужно сделать. Элемент удаляется, когда работа сделана или от неё отказались.

Russian reason:
Отложенную работу читают рядом с узлом, которого она касается, как и решение, поэтому тот, кто открывает узел, видит, что в нём ещё ждёт. Хранимую в комментарии, её упустил бы список всех элементов (§s-5z7d52ykd6bzctg).

Дата элемента задаёт порядок списка (§s-5z7d52ykd6bzctg). Его автор подсказывает читателю, кого спросить. Элемент, оставленный после того, как работа сделана или от неё отказались, показывает ждущую работу, которая больше не ждёт.

What changed against the present node:
- Заголовок: «work put off» назван todo, по вашему решению, как и в 1.2.4.
- Текст — абзацы 1–2 нынешнего 1.11, без «or in a document of its own»: это держит 1.2.4. Абзац 3 уходит в 5.10.
- Обоснование: «Kept in a comment or a document, it is missed by the listing» → «Kept in a comment, it is missed by the listing of every item (§5.10)». К «An item's date orders the listing» добавлена ссылка на 5.10. Остальное дословно.

## 9.3 | drafted | from present 1.11 | s-5z7d52ykd6bzctg

Title: Every todo can be listed at once, the newest first
Russian title: Все todo можно вывести одним списком, новые сверху

Text:
Every item of `meta.todos` across the specification can be listed at once, the newest first, each with the node it stands on.

Reason:
Listed together, the items show what waits across the specification. The newest stand first: each older item was weighed at every listing since, a new one at none.

Russian text:
Все элементы `meta.todos` по всей спецификации можно вывести одним списком, новые первыми, каждый с узлом, на котором он стоит.

Russian reason:
Собранные вместе, элементы показывают, что ждёт по всей спецификации. Новые стоят первыми: каждый более старый элемент взвешивали при каждом выводе списка с тех пор, а новый — ни разу.

What changed against the present node:
- Заголовок: «work put off» назван todo, по вашему решению, как и в 1.2.4.
- Заголовок новый.
- Текст — абзац 3 нынешнего 1.11, обоснование — абзац 3 его обоснования, дословно.

## 10.1 | drafted | from present 1.5 | s-5ah25f6gy99panq

Title: What a node's status says
Russian title: Что говорит статус узла

Text:
A node's status is `draft` or `approved`. The status of a section is built from the nodes under it (§s-9kfdycuq34beqvs). What follows holds of every other node.

A node is approved when one of its owners (§s-67vekyup7y8smap) approved its present wording. That wording is its title, text and reason, and the values its NodeKind adds beside them, such as `TextRule.list`. Otherwise the node is a draft.

Any change to that wording, an owner's own included, makes the node a draft until one of its owners approves the wording it then holds. So does a withdrawal of its approval (§s-fpq35tf3pehgk64).

The status stays as it is through a change to:

- the node's links or its metadata;
- who its owners are;
- what is built into it from other nodes;
- where it stands.

Reason:
An approved status claims that one of the node's owners agreed to what it now states. A status that survived a rewrite would certify words nobody approved. A draft node asks for no code (§s-utvqbypzhmgndug). It tells its owners that it waits for their approval.

A change of owners changes who reads a part, not what a rule states. An owner leaving, or a node moving, takes back nothing that was agreed. Links, metadata and what is built from other nodes are not what an owner approved. They change as the specification grows around a rule.

Russian text:
Статус узла — `draft` или `approved`. Статус раздела строится из узлов под ним (§s-9kfdycuq34beqvs). Сказанное ниже относится ко всякому другому узлу.

Узел одобрен, когда один из его ответственных (§s-67vekyup7y8smap) одобрил его нынешнюю формулировку. Эта формулировка — его заголовок, текст и обоснование, а также значения, которые его NodeKind добавляет к ним, например `TextRule.list`. Иначе узел — черновик.

Любое изменение этой формулировки, в том числе сделанное самим ответственным, делает узел черновиком, пока один из его ответственных не одобрит формулировку, которую узел тогда содержит. То же делает отзыв его одобрения (§s-fpq35tf3pehgk64).

Статус остаётся прежним при изменении:

- связей узла или его метаданных;
- того, кто его ответственные;
- того, что встроено в него из других узлов;
- того, где он стоит.

Russian reason:
Статус approved утверждает, что один из ответственных за узел согласился с тем, что узел теперь говорит. Статус, переживший переписывание, удостоверял бы слова, которых никто не одобрял. Узел-черновик не требует кода (§s-utvqbypzhmgndug). Он сообщает своим ответственным, что ждёт их одобрения.

Смена ответственных меняет то, кто читает часть, а не то, что говорит правило. Уход ответственного или перенос узла не отменяет ничего из согласованного. Связи, метаданные и то, что построено из других узлов, — не то, что одобрял ответственный. Они меняются по мере того, как спецификация растёт вокруг правила.

What changed against the present node:
- Заголовок нынешнего 1.5, дословно.
- Текст — абзацы 1–3 и 5 нынешнего 1.5, дословно, кроме одного места: из абзаца 3 фраза «A withdrawal names whoever made it» уходит в 9.2, а к фразе об отзыве добавлена ссылка на 9.2.
- Обоснование — абзацы 1–2 нынешнего обоснования, дословно.
- Список значений статуса (`draft`, `approved`) остаётся в этом узле.
- Сохраняет sid 1.5: на эту часть указывают оба теста статуса, отказ правки в 12.12, 1.3.4, которое её уточняет, и обоснование записи одобрения в tools.json.
- По вашему решению основные правила не называют домены и RecordType.

## 10.2 | drafted | from present 1.5 | s-fpq35tf3pehgk64

Title: Who may withdraw a node's approval
Russian title: Кто может отозвать одобрение узла

Text:
Anyone may withdraw the approval of a node, except that of:

- a section, whose status is built from the nodes under it (§s-9kfdycuq34beqvs);
- a node of the SpecSheriff guidelines a project takes (§s-bsya3febm6u64ab);
- the rule that approves the specification (§s-qzthyh7yqvfhsa2).

A withdrawal names whoever made it.

Reason:
A withdrawal gives no agreement in anyone's name. It only makes a node a draft, as a change to its wording by anyone does. So whoever finds an approved rule wrong can keep any further change to its code or its tests from being committed (§s-utvqbypzhmgndug) without waiting for its owners. The withdrawal names whoever made it, which tells the owners whom to ask.

A project takes the SpecSheriff guidelines as they were approved where they are written (§s-bsya3febm6u64ab), so their approval is not the project's to withdraw. Whether the rule that approves the specification is approved decides how strictly the checks hold all code and tests. That is the specification's owners' choice (§s-qzthyh7yqvfhsa2).

Russian text:
Одобрение узла может отозвать кто угодно, кроме одобрения:

- раздела, статус которого строится из узлов под ним (§s-9kfdycuq34beqvs);
- узла SpecSheriff guidelines, которые берёт проект (§s-bsya3febm6u64ab);
- правила, которое одобряет спецификацию (§s-qzthyh7yqvfhsa2).

Отзыв называет того, кто его сделал.

Russian reason:
Отзыв ни от чьего имени не даёт согласия. Он только делает узел черновиком, как это делает изменение его формулировки кем угодно. Поэтому тот, кто считает одобренное правило неверным, может не дать закоммитить дальнейшие изменения его кода или его тестов (§s-utvqbypzhmgndug), не дожидаясь его ответственных. Отзыв называет того, кто его сделал, и это говорит ответственным, кого спросить.

Проект берёт SpecSheriff guidelines такими, какими они одобрены там, где написаны (§s-bsya3febm6u64ab), поэтому отзывать их одобрение не дело проекта. От того, одобрено ли правило, которое одобряет спецификацию, зависит, насколько строго проверки держат весь код и тесты. Это выбор ответственных за спецификацию (§s-qzthyh7yqvfhsa2).

What changed against the present node:
- Заголовок новый.
- Текст — абзац 4 нынешнего 1.5 и последняя фраза его абзаца 3, дословно, и новый первый пункт списка: раздел и заголовок домена. В нынешнем 1.5 их исключала фраза «What follows holds of every other node», которая остаётся в 9.1.
- Обоснование — абзацы 3–4 нынешнего обоснования, дословно.
- Новый sid. Сюда переходит решение от 2026-10-31 о том, кто может отозвать одобрение. Описание записи одобрения в tools.json (11) получит связь implements и с этим узлом.
- По вашему решению основные правила не называют домены и RecordType.

## 10.3 | moves unchanged | from present 1.6 | s-9kfdycuq34beqvs

Title: The status of a section and of a domain's header
Russian title: Статус раздела и заголовка домена

Text:
The status of a section is built from the nodes under it that are no section. It is `approved` where every one of them is approved, and `draft` otherwise. The status of a domain's header is built the same way from every node of the domain but the header itself.

Nobody approves a section or a header itself, nor a header's level and where its code is.

The status is built anew after every change to the specification. It is never written by hand.

Reason:
A section and a domain's header require nothing (§s-7445ahgjck2aefg, §s-ef93u6cnbs2sevr). What they state, the nodes under them state, so their own words leave an owner nothing to agree to.

A header's level is one of those the project's own guidelines list (§s-nkyty4dy9x2v2a4). The levels are listed in a rule the specification's owners approve. Where a header's code is says where to look, not what must hold.

Built from the nodes under it, the status shows at a glance which parts of the specification wait for their owners. Built anew after every change, it never falls behind those nodes (§s-kh8qcd5kxgh9z3j).

Russian text:
(none yet)

Russian reason:
(none yet)

## 10.4 | drafted | from present 1.7 | s-t5uw8zfxzhfdg86

Title: An agent approves, in an owner's name, a change that states nothing new
Russian title: Агент одобряет от имени ответственного изменение, которое не говорит ничего нового

Text:
An agent working for one of a node's owners approves the node in that owner's name where its wording changes only:

- to state what one of its owners approved in another node;
- by a replacement that changes no meaning, such as a renamed term or path.

The agent reports each such approval to that owner. The owner may withdraw it.

Reason:
A node whose wording only states what one of its owners approved in another node asks nothing its owners have not agreed to. A replacement that changes no meaning states nothing new. Shown again, either would spend the owners' attention on no choice.

An agent working for an owner already acts in that owner's name. It reports to them as it works. The report lets the owner see that the change was only that. Where it was not, the owner can withdraw the approval.

Russian text:
Агент, работающий на одного из ответственных за узел, одобряет узел от имени этого ответственного, если формулировка узла меняется только так:

- чтобы сказать то, что один из его ответственных одобрил в другом узле;
- заменой, которая не меняет смысла, например переименованием термина или пути.

Агент сообщает этому ответственному о каждом таком одобрении. Ответственный может его отозвать.

Russian reason:
Узел, формулировка которого лишь говорит то, что один из его ответственных одобрил в другом узле, не спрашивает ничего, с чем его ответственные не согласились. Замена, которая не меняет смысла, не говорит ничего нового. Показанное снова, и то и другое потратило бы внимание ответственных там, где нечего выбирать.

Агент, работающий на ответственного, уже действует от его имени. Он сообщает ответственному о своей работе по ходу. Сообщение позволяет ответственному увидеть, что изменение было только таким. Если оно было не таким, ответственный может отозвать одобрение.

What changed against the present node:
- Текст — абзацы 3–4 нынешнего 1.7, обоснование — его абзацы 3–4, дословно.
