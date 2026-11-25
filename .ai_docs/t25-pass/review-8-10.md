# The reviewer's report on sections 8 to 10 (2026-11-10), applied section by section

**Verdict: not ready.** Every finding has ready text. Sections 1 to 7 need no change except the list noted at 10.1. For 8.3, 8.4 and 10.3 I give English only, as you asked.

## 8.1: SPLIT
Keep the sid, the title and text paragraph 1. Paragraph 2 goes to the new node.

**CUT paragraph 3.** Agreed 2.5 deletes the section, and `sheriff validate` refuses a link naming no node.

**WORDING FIX, reason.** Paragraph 2 contradicts agreed 3.3 and draft 11.5, since no test names a term.
- EN: A requirement written into a section's text is a rule nobody can cite, name in a SpecTag or check on its own.
- RU: Требование, записанное в текст раздела, — это правило, на которое никто не может сослаться, которое нельзя назвать в SpecTag и нельзя проверить отдельно.

**New node after 8.1.** It takes tools 7.1.11 and the decisions of 2026-10-30 and 11-04. "No section" is what `validate.ts` counts, so RecordTypes stay covered and the old doubt closes.
- Title EN: A section is never empty
- Title RU: Раздел не бывает пустым
- Text EN: A section holds at least one node that is no section, directly or through the sections inside it.
- Text RU: Раздел содержит хотя бы один узел, не являющийся разделом: прямо или через разделы внутри него.
- Reason EN: A section with no such node states a responsibility nothing in the code answers to.
- Reason RU: Раздел без такого узла заявляет ответственность, которой ничто в коде не отвечает.

**TERM:** container; [C4] container, a running application or data store; false friend, weakened by "of rules". Keep it and gloss it in the docs. Cost: one line of docs (inference).

## 8.2: WORDING FIX, CUT, MOVE TO PART 14
- Title EN: A node's location
- Title RU: Расположение узла

Text EN:

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. A term takes no number. Its place is the term's name.

The node at the top of a file of the guidelines or of the technical appendix is located by the part's name and the file's. Each such file numbers its nodes under its top node's location.

The location is computed from where the node is and is never written by hand.

Text RU:

Расположение узла называет, где он находится в спецификации: часть, в которой он находится, а за ней его место в ней. Место узла — его номер среди узлов того же родителя. Термин номера не получает. Его место — имя термина.

Узел на вершине файла guidelines или технического приложения располагается по имени части и имени файла. Каждый такой файл нумерует свои узлы под расположением своего верхнего узла.

Расположение вычисляется из того, где узел находится, и никогда не пишется вручную.

- Reason EN: A location tells a reader where a node is. Computed, it can never disagree with where the node is.
- Reason RU: Расположение говорит читателю, где находится узел. Вычисляемое, оно никогда не расходится с тем, где узел находится.

"Nothing cites…" is agreed 1.2.2, so tools 7.2.7 implements 1.2.2 instead.

**New node 14.2.x,** `refines` this one. The two tests naming a header and contracts move to it.
- Title EN: The location of a node of a domain or of contracts
- Title RU: Расположение узла домена или contracts

Text EN:

Where the base specification is divided into domains, each domain and contracts count as parts for a node's location (§s-kag2m9tzdnduxdx). Each numbers its nodes under its name, straight through its files. Beside this:

- a domain's header is located by the domain's name alone;
- the node at the top of a file of contracts is located by the name contracts and the file's.

Text RU:

Если базовая спецификация разделена на домены, каждый домен и contracts считаются частями для расположения узла (§s-kag2m9tzdnduxdx). Каждая из них нумерует свои узлы под своим именем сквозь все свои файлы. Кроме того:

- заголовок домена располагается только по имени домена;
- узел на вершине файла contracts располагается по имени contracts и имени файла.

- Reason EN: A domain is divided into files only to fit a context window (§s-k73czmpkazcx7mu). It stays one part, so its nodes are numbered in one sequence.
- Reason RU: Домен делят на файлы только для того, чтобы он помещался в контекстное окно (§s-k73czmpkazcx7mu). Он остаётся одной частью, поэтому его узлы нумеруются одной последовательностью.

**DOUBT:** the earlier report wanted `overrides`. I recommend `refines`, since the main rule's general form now fits a domain.

## 8.3: WORDING FIX, CUT
Numbering and counting now follow from 8.1 and 8.2. Implementation is held by 11.4, 11.5 and 11.9. The numbering and counting tests move to those nodes.

Title: Whether a project's own NodeKind needs code

Text:

The nodes of a project's own NodeKind need code unless the project's extension of the schema (§s-xm8rz4uupb73gu5) declares otherwise. Nodes that need code are implemented and tested as a rule is (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).

A rule of the project's own guidelines, refining this one, lists each such NodeKind with whether its nodes need code. Its `TextRule.list.declaredIn` names that extension. The check of lists compares the list with it (§s-jau82aq9juv9zzh).

Reason: Most NodeKinds a project adds are one more sort of requirement, so each is held to code unless declared otherwise. Listed in a rule of the project's own guidelines, a NodeKind that needs no code is approved by one of the specification's owners, as every exemption is (§s-6fw72j65jkqrfpf).

## 8.4: DELETE
Agreed 5.1 makes the schema the only description of the structure, and `$defs.list.members` says this already. Tools 7.1.19 and 7.2.6, tools 5 and the comment in `validate.ts` are retargeted to 5.1.

**DOUBT:** if the owner keeps it, write `TextRule.list.property` for "the property the list names". I recommend deleting.

## 9.1: DELETE
Agreed 1.2.4 holds where a decision is kept. The schema's `decisions` comment holds what one records and what a procedural one is. `CLAUDE.md` and tools 5 move to s-x4zcbk5ekebd9ua.

**DOUBT:** if kept, CUT reason paragraph 2 (RU: «Число решений… написано плохо.»), which grounds nothing the rule requires. I recommend deleting.

**TERM:** decision; [ADR]; partial, since an ADR is its own record. Keep it and gloss it in the docs. Cost: one line of docs (inference).

## 9.2: WORDING FIX, CUT
Key 4.4 replaces "problem" and "default implementation". The item's fields are the schema's.

Text EN:

A todo is work put off that concerns one node. It is kept as an item of that node's `meta.todos`. It is never kept in a comment on the node. A todo is removed once it is done or given up.

An accepted shortcoming in the system's implementation is described in the technical debt instead (§s-2r7k2aeyusgy6fw).

Text RU:

Todo — это отложенная работа, касающаяся одного узла. Она хранится как элемент `meta.todos` этого узла. Она никогда не хранится в комментарии к узлу. Todo удаляется, когда работа сделана или от неё отказались.

Осознанно принятый недостаток реализации системы описывается вместо этого в техническом долге (§s-2r7k2aeyusgy6fw).

- Reason EN: Read beside its node, a todo shows whoever opens the node what still waits on it. Kept in a comment, it is missed by the listing of every todo (§s-5z7d52ykd6bzctg).
- Reason RU: Прочитанное рядом со своим узлом, todo показывает тому, кто открывает узел, что в нём ещё ждёт. Хранимое в комментарии, оно выпадает из списка всех todo (§s-5z7d52ykd6bzctg).

## 9.3: WORDING FIX
The rule had no subject. Tools 2 must implement this node.
- Title EN: The listing of every todo
- Title RU: Список всех todo
- Text EN: The SpecSheriff tools list every todo of the specification in one listing, the newest first, each with its node.
- Text RU: Инструменты SpecSheriff выводят все todo спецификации одним списком, новые первыми, каждый со своим узлом.
- Reason EN: Listed together, the todos show what waits across the specification. The newest come first because nobody has weighed them yet.
- Reason RU: Собранные вместе, todo показывают, что ждёт по всей спецификации. Новые идут первыми, потому что их ещё никто не взвешивал.

## 10.1: WORDING FIX, CUT
Paragraph 1 repeats 1.3.1 and 1.3.3, and the reason repeats 1.3.3. "Status" needs its object, and "where it stands" is against the owner's correction of 2026-11-05. The `TextRule.list` of values moves to 1.3.1, which states them, as 10.4 allows.
- Title EN: Which changes make an approved node a draft
- Title RU: Какие изменения делают одобренный узел черновиком

Text EN:

An approval covers a node's present wording. That wording is its title, text and reason, and the values its NodeKind adds beside them, such as `TextRule.list`.

Any change to that wording makes the node a draft until one of its owners approves the wording it then holds. A change made by an owner is no exception.

The approval status stays as it is through a change to:

- the node's links or its metadata;
- who its owners are;
- what is built into it from other nodes;
- where it is in the specification.

This rule does not apply to a section, whose approval status is built from the nodes under it (§s-9kfdycuq34beqvs).

Text RU:

Одобрение покрывает нынешнюю формулировку узла. Эта формулировка — его заголовок, текст и обоснование, а также значения, которые его NodeKind добавляет к ним, например `TextRule.list`.

Любое изменение этой формулировки делает узел черновиком, пока один из его ответственных не одобрит формулировку, которую узел тогда содержит. Изменение, сделанное самим ответственным, не исключение.

Статус одобрения остаётся прежним при изменении:

- связей узла или его метаданных;
- того, кто его ответственные;
- того, что встроено в него из других узлов;
- того, где он находится в спецификации.

Это правило не относится к разделу: его статус одобрения строится из узлов под ним (§s-9kfdycuq34beqvs).

- Reason EN: An approval says an owner agreed to what the node states, so it cannot outlive a change to those words. Everything else about a node changes as the specification grows around it and takes back nothing that was agreed.
- Reason RU: Одобрение говорит, что ответственный согласился с тем, что говорит узел, поэтому оно не может пережить изменение этих слов. Всё остальное в узле меняется по мере того, как спецификация растёт вокруг него, и не отменяет ничего из согласованного.

## 10.2: WORDING FIX, CUT
The section bullet is empty, since nobody approves a section (1.3.3). "Takes" becomes agreed 2.4's "uses". A rule does not approve anything.

Text EN:

Anyone may withdraw the approval of a node, except that of:

- a node of the SpecSheriff guidelines a project uses (§s-bsya3febm6u64ab);
- the rule of the project's own guidelines stating that the specification is approved (§s-qzthyh7yqvfhsa2).

A withdrawal makes the node a draft. It names whoever made it.

Text RU:

Одобрение узла может отозвать кто угодно, кроме одобрения:

- узла SpecSheriff guidelines, которые использует проект (§s-bsya3febm6u64ab);
- правила собственных guidelines проекта, которое говорит, что спецификация одобрена (§s-qzthyh7yqvfhsa2).

Отзыв делает узел черновиком. Он называет того, кто его сделал.

- Reason EN: A withdrawal gives no agreement in anyone's name, so whoever finds an approved rule wrong can stop further code for it (§s-utvqbypzhmgndug) without waiting for its owners. The name on it tells the owners whom to ask. The SpecSheriff guidelines are approved where they are written (§s-bsya3febm6u64ab), and the specification's approval is its owners' choice (§s-qzthyh7yqvfhsa2), so neither is anyone's to withdraw.
- Reason RU: Отзыв ни от чьего имени не даёт согласия, поэтому тот, кто считает одобренное правило неверным, может остановить дальнейший код для него (§s-utvqbypzhmgndug), не дожидаясь его ответственных. Имя в отзыве говорит ответственным, кого спросить. SpecSheriff guidelines одобрены там, где написаны (§s-bsya3febm6u64ab), а одобрение спецификации — выбор её ответственных (§s-qzthyh7yqvfhsa2), поэтому ни то ни другое не может отозвать кто угодно.

## 10.3: MOVE TO PART 14, CUT
"Nobody approves a section" is 1.3.3.

Title: How a section's approval status is built

Text:

A section's approval status is built from the nodes under it that are no section. It is `approved` where every one of them is approved, and `draft` otherwise.

The SpecSheriff tools build it anew after every change to the specification. Nobody writes it by hand.

Reason: Built from the nodes under it and anew after every change, the status never falls behind those nodes (§s-kh8qcd5kxgh9z3j).

**New node 14.2.x,** `refines` this one.

Title: The approval status of a domain's header

Text: The approval status of a domain's header is built as a section's is (§s-9kfdycuq34beqvs), from every node of the domain but the header itself. Nobody approves a header itself, nor its level and where its code is.

Reason: What a header states, the nodes of its domain state, so its own words leave an owner nothing to agree to. Its level is one the specification's owners approved in a rule, and where its code is says where to look.

## 10.4: CUT, WORDING FIX
**CUT** "The owner may withdraw it." (RU: «Ответственный может его отозвать.»). 10.2 holds this, and the sentence reads as narrower than "anyone".

- Reason EN: A change that only states what an owner approved, or changes no meaning, leaves the owners nothing to choose, so showing it again would only spend their attention. The agent's report lets the owner withdraw the approval where the change was more than that (§s-fpq35tf3pehgk64).
- Reason RU: Изменение, которое лишь говорит то, что ответственный уже одобрил, или не меняет смысла, не оставляет ответственным выбора, поэтому показ его снова только потратил бы их внимание. Сообщение агента позволяет ответственному отозвать одобрение, если изменение было не только таким (§s-fpq35tf3pehgk64).

## Section 10 consolidated by a fresh reviewer (2026-11-10), applied by fix-newform-142.mjs

The fixes above hold with the day's rulings: "NodeKind" became "the node's kind", «тип узла»; 10.1 says "until the wording it then holds is approved", since 1.3.4 lets an agent approve in an owner's name; 10.1's reason is new, "A node requires only what its wording states…", the old one repeating 1.3.2 and 1.3.3; 10.2's reason says "stop any further change to its code", a test being implied; 10.3 says "every node under it, at any depth", as `builtStatuses` in model.ts takes; 10.4's title approves a wording, not a change, its Russian «один из ответственных за узел», its reason adds "An agent working for an owner already acts in their name."

Still for the owner. 10.2: the bare "except" does not say who may withdraw the approval of the rule stating that the specification is approved; adding ", whose approval only the specification's owners withdraw" would repeat 5.4, so the reviewer does not recommend it. 10.1: "what is built into it from other nodes" covers in the main rules only links and location, already listed; it is kept, naming no extension (inference).

Owed to part 14, a new node 14.2.x refining 10.3: «Статус одобрения заголовка домена» / "The approval status of a domain's header": «Статус одобрения заголовка домена строится так же, как статус раздела (§s-9kfdycuq34beqvs), из всех узлов домена, кроме самого заголовка. Сам заголовок, его уровень и то, где находится его код, никто не одобряет.» Reason: «То, что говорит заголовок, говорят узлы его домена, поэтому его собственные слова не оставляют ответственному ничего, с чем соглашаться. Его уровень — один из тех, что ответственные за спецификацию одобрили в правиле, а то, где его код, говорит, где искать.»

At the move: the `TextRule.list` of the values of a node's status moves from s-5ah25f6gy99panq to agreed 1.3.1, in the owner's name, reported in one line; 10.1 drops the `cites` links whose citations went.

TERM. "approved": partial to the [IREB] requirements baseline and the [29148] baseline, since an approval lapses at any change of wording; the owner's name of 2026-11-06, a gloss in the docs.

## 1.3.5 and 1.3.6 after the move into 1.3 (2026-11-10): pass after the fixes, applied by fix-newform-144.mjs; order by fix-newform-145.mjs

1.3.5 no longer repeats 1.3.3: "The wording an approval covers is a node's title, text and reason, and the fields the node's kind adds beside them, such as `TextRule.list`. A change to any of these makes the node a draft, even where one of the node's owners makes it." Its list speaks of the approval, which a section never has: "An approval stands through a change to:". 1.3.6: "other than a section, at any depth"; the Russian reason unfolded.

Order within 1.3: 1.3.5 what an approval covers, 1.3.6 an agent approves in an owner's name (it relies on the wording 1.3.5 defines), 1.3.7 who may withdraw, 1.3.8 how a section's status is built, the most particular.

DOUBT for the owner, on 1.3.8. `builtStatuses` (model.ts:205) skips only sections and headers, at any depth. Agreed 8.2 counts terms and a project's own kinds as rules only for 8.1's requirement, so under agreed 1.3.3 a section holding only draft terms holds no rule and is approved by default, while 1.3.8 and the tools make it a draft (inference). 1.3.8 could add: "Each of those nodes counts as a rule of the section for its approval status." / «Каждый из этих узлов считается правилом раздела для его статуса одобрения.»

Lost by the move, owed elsewhere: the status of a domain's header and that nobody approves a header's level or where its code is (part 13, model.ts:225 builds it); the status `TextRule.list` meant for 1.3.1, which changes its wording and so is approved in the owner's name by 1.3.6 and reported.

TERM. "approval": partial to the [29148] 2018 baseline; keep, a gloss in the docs.

## Section 9 consolidated by a fresh reviewer (2026-11-10), 9.2 and 9.3 applied by fix-newform-148.mjs

9.1: delete, put to the owner. Lost: nothing of the text (agreed 1.2.4 keeps decisions on their node, every node; the schema's `decisions` comment says what one records and that a procedural one changes no wording; "usually" requires nothing); of the reason, only that the number of decisions measures how well a rule was written, which no rule relies on. Its 2026-11-07 decision and two approval lines go with it; while the specification is a draft it is deleted, not archived. CLAUDE.md line 88 and the reason of tools 5 (s-k4nqjr96ux7a5m7, with its `cites`) retarget to s-x4zcbk5ekebd9ua, in the owner's name by 1.3.6. No code comment or test names it. If kept, the second reason paragraph is cut.

9.2: technical debt worded as agreed 4.4 ("internal quality"); the item's fields cut, the schema holding them (5.1); the reason keeps why a finished todo goes. DOUBT: where put-off work goes when it concerns several nodes. Tools 2 (s-f5rz6b7dhxejjts) moves its `implements` link and its citation on `sheriff todos` to s-5z7d52ykd6bzctg. Agreed 1.2.4 lists "its todos" too, so 9.2's first sentences partly repeat it (seen when applying, for the owner at 9.2).

9.3: subject named, as `sheriff todos` in show.ts does (the archive left out by 2.5, the guidelines included by 1.1.2).

TERM. decision: [ADR] partial; todo: [29148] TBD, partial; a gloss each.

## Order and repetition
Put section 10 before section 9, since approval is more general than where a todo is kept. Section 9 becomes "Work put off" if 9.1 goes. Inside 8: section, non-empty section, NodeKind, location. Inside 10: 10.1, 10.3, 10.4, 10.2, because approving comes before withdrawing. Section 10's purpose line still says how a node leaves the specification, which agreed 2.5 now holds.

Stated twice, and removed by the fixes above:
- 1.3.1 and 1.3.3 with 10.1, and 1.3.3 with 10.3
- 2.5 with 8.1
- 1.2.2 with 8.2
- 1.2.4 with 9.1
- 5.1 with 8.4
- 11.4, 11.5 and 11.9 with 8.3

One sentence stays in both 1.3.3 and 10.3 on purpose: 1.3.3 speaks of rules only, and 10.3 covers every node.

The "what changed" lists still carry old numbers: 5.10 in 9.2, 9.2 in 10.1, 9.1 in 10.2. The list in 10.2 also still names the domain's header.

The replacement texts you asked for take this report past the reviewer's limit of 300 words.
