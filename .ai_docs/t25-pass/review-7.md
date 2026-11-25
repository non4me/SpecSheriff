# The reviewer's report on section 7 (2026-11-09), applied node by node at each node's turn

Numbers here are those before the section was reordered. Before -> after: 7.1->7.1, 7.4->7.2, 7.2->7.3, 7.3->7.4, 7.6->7.5, 7.7->7.6, 7.5->7.7, 7.14->7.8, 7.8->7.9, 7.13->7.10, 7.12->7.11, 7.15->7.12, 7.10->7.13, 7.9->7.14, 7.11->7.15.

**Verdict: passes after the fixes below.** The doubts go to the owner at each node's turn.

- This runs past the 300-word cap because you asked for fifteen nodes with wordings in two languages.
- 7.1, 7.8–7.10 and 7.12–7.15 are approved text moved unchanged. They are reworded here only because you asked, and each still needs the owner's word.
- No Russian body exists for 7.1, 7.6–7.10 or 7.12–7.15. `D:\SpecSheriff\.ai_docs\t25-pass\full-ru.json` holds only 6.12 of section 6, so the Russian below covers changed words only.

**7.1**
- WORDING FIX: §s-bsya3febm6u64ab becomes 2.4, which says only that a project makes no copy. "Never changes them" is agreed 1.1.3, so move the citation and its link to §s-efe2cmw9asrbt2g.
- CUT (reason): "English is also the language…likeliest to share." and "Standing apart…what the node states."

**7.2**
- WORDING FIX (agreed 4.4 and 1.2.3 no longer speak of a rule of the debt or a problem). Text, last paragraph: EN "The description of a shortcoming in the technical debt names its subject the same way and states what that subject does while the shortcoming stands (§s-2r7k2aeyusgy6fw)." RU «Описание недостатка в техническом долге называет свой субъект так же и говорит, что этот субъект делает, пока недостаток существует (§s-2r7k2aeyusgy6fw).»
- WORDING FIX. Reason, last paragraph: EN "A description of a shortcoming states on purpose what is, not what must be (§s-2r7k2aeyusgy6fw)." RU «Описание недостатка намеренно говорит о том, что есть, а не о том, что должно быть (§s-2r7k2aeyusgy6fw).»
- WORDING FIX. Reason, first paragraph: EN "A requirement with nobody to hold it is one nobody can be found to have broken." RU «Требование, которое некому соблюдать, никому нельзя вменить в нарушение.»
- Russian: «связывает» reads as the defined «связь». Use «субъект, который оно обязывает» and «что никого ни к чему не обязывает».
- TERM: "gradeable" against "verifiable", [29148] 2011 characteristic (2018 unverified). Same meaning (inference). Drop the word, as above. Cost: none.

**7.3**
- WORDING FIX (the title repeats the sentence, and "property" has no object).
  - Title: EN "A rule does not depend on what is missing today" RU «Правило не зависит от того, чего сегодня нет».
  - Text, before "So not": EN "A rule states a property of what the specification declares. It never makes that property depend on what happens not to exist yet." RU «Правило утверждает свойство того, что объявляет спецификация. Оно никогда не ставит это свойство в зависимость от того, чего пока просто нет.»
- WORDING FIX and CUT (7.10 leaves out a mistake's cost). Whole reason: EN "A property resting on what does not exist yet is true when it is written and silently false afterwards." RU «Свойство, зависящее от того, чего пока нет, верно, когда его пишут, и незаметно становится ложным потом.»

**7.4**
- WORDING FIX (the move lost "describes the system" from 1.13, so item 1 now condemns every rule of the base).
  - Title: EN "Which rules have no place in the specification" RU «Каким правилам нет места в спецификации».
  - Text: EN "A rule describes the system or governs how the specification is kept and implemented. A rule is removed where it:\n\n- does neither;\n- states the obvious." RU «Правило либо описывает систему, либо регулирует то, как спецификация ведётся и реализуется. Правило удаляют, если оно:\n\n- не делает ни того, ни другого;\n- утверждает очевидное.»
  - "Removed" is the word of 2.5 and 7.11.
- WORDING FIX. Reason, first paragraph, in place of its first sentence: EN "A rule that does neither decides nothing." RU «Правило, которое не делает ни того, ни другого, ничего не решает.»
- CUT (reason): "An agent that has never read…not by prohibitions." It answers an objection nobody raised, and "model" is bare.
- DOUBT: the paragraph on prohibitions grounds nothing in the text, and "It needs no rule saying so" (present 6.12) now stands nowhere. I recommend a third item: EN "- forbids what no rule requires." RU «- запрещает то, чего не требует ни одно правило.»
- DOUBT: "obvious" to whom? [29148] language criteria avoid subjective words (2011; 2018 unverified). A testable form would be EN "states what a reader would do without it" RU «утверждает то, что читатель сделал бы и без него».

**7.5**
- DOUBT: an exception is a qualification (7.6), so 7.7 already keeps it in the rule's node. Their reasons nearly coincide. I recommend deleting 7.5.
- WORDING FIX, if kept (main thought first, purpose clause out): EN "An exception to a rule is written into that rule. An exception is a case the rule's words would cover and must not." RU «Исключение из правила записывают в само это правило. Исключение — это случай, который слова правила охватывали бы, но охватывать не должны.»

**7.6**
- DOUBT (split, no word changed): by 7.7's test, paragraph 1 and paragraphs 2–3 are carried out apart.
  - Titles: "One thought to a sentence" «Одна мысль в предложении» and "A node's text opens with its main thought" «Текст узла начинается с главной мысли».
  - The sid stays with the second, which 7.7 cites.
  - The owner approved it as one node in this task, so the choice is theirs.

**7.7** nothing.

**7.8**
- WORDING FIX.
  - Title: EN "The name and the description of what a rule binds" RU «Имя и описание того, о чём говорит правило».
  - Text, before "So not": EN "A rule that binds a named thing quotes the name where the reader must find the definition that owns it. It describes the thing by what it is where the rule must keep binding if that name changes." RU «Правило, которое говорит об именованной вещи, приводит её имя там, где читателю нужно найти определение этого имени. Оно описывает вещь по тому, что она собой представляет, там, где правило должно действовать и после смены имени.»
  - Reason: EN "A sentence written against a name stops binding when the name changes, and nothing reports it. A description keeps binding whatever the thing is called, but does not lead the reader to the definition." RU «Предложение, написанное об имени, перестаёт действовать, когда имя меняется, и ничто об этом не сообщает. Описание действует, как бы вещь ни называлась, но не приводит читателя к определению.»
- TERM: "predicate" is not in the registry; its logic sense is (unverified). No fit a plain reader relies on (inference). Replace it as above. Cost: this node only.

**7.9**
- WORDING FIX: "what the reason carries" becomes "what the reason covers", RU «до того, что покрывает обоснование».
- CUT (reason): "A reviewer cannot defend what the node never said."

**7.10**
- WORDING FIX: "as a rule in its first sentence" reads as "in the form of a rule". Use "usually in its first sentence", RU «обычно в первом предложении». "A reason carries" becomes "A reason holds", RU «обоснование содержит».
- DOUBT: "usually" does not say when the ground may come later. Dropping it makes the rule stricter.

**7.11**
- WORDING FIX (no subject). Text: EN "Whoever revises a rule checks its reason first. Where that reason no longer holds, they remove the rule and do not reword it." RU «Тот, кто пересматривает правило, сначала проверяет его обоснование. Если обоснование больше не держится, он удаляет правило, а не переформулирует его.»
- WORDING FIX (the reason did not ground "first"). Reason: EN "A rule whose reason no longer holds requires what nothing grounds. Rewording would keep that requirement, so the reason is checked before any rewording." RU «Правило, обоснование которого больше не держится, требует того, что ничем не обосновано. Переформулировка сохранила бы это требование, поэтому обоснование проверяют до любой переформулировки.»
- DOUBT: if another ground now holds, the text still removes the rule.

**7.12**
- WORDING FIX (bare "set" and "model", against 7.14), second paragraph: EN "Where the number matters, whatever holds those things produces it. So not “contracts holds 45 nodes”, which was true for one day, but the figure counted off the specification's nodes each time it is shown." RU «Где число важно, его выдаёт то, что эти вещи хранит. Поэтому не «в contracts 45 узлов», что было верно один день, а число, подсчитанное по узлам спецификации каждый раз, когда его показывают.»
- CUT (reason): EN "A count is a second copy of a fact. It goes stale silently, because a number that is merely out of date looks exactly like a number that is right." RU «Количество — это вторая копия факта. Она устаревает незаметно, потому что просто устаревшее число выглядит точно так же, как верное.»

**7.13**
- WORDING FIX. Title: EN "What a restricting list names is chosen by which mistake would go unnoticed" RU «Что называет ограничивающий список, выбирают по тому, какая ошибка осталась бы незамеченной».

**7.14**
- WORDING FIX (ruling 14.1.3): "— a term, a field —", RU «— термин, поле —».
- Split, no other word changed: paragraph 3 and reason paragraph 2 become "A name the specification defines carries its object" «Имя, определённое спецификацией, несёт свой объект».
- DOUBT: the decision of 2026-10-28 exempts the schema's `type` and `kind`. By 7.5 that exception belongs in the text.

**7.15**
- CUT (reason): paragraph 2, "A style spreads by imitation…".

**The section**
- **Order:** it does not hold. I propose 7.1, 7.4, 7.2, 7.3, 7.6, 7.7, 7.5, 7.14, 7.8, 7.13, 7.12, 7.15, 7.10, 7.9, 7.11.
  - Whether a rule belongs comes before how it is worded.
  - 7.6 introduces qualifications, and 7.5's exception is one.
  - 7.14 is the general case of 7.8.
  - The rules on a reason stand together, and 7.10 says what a reason is.
- **Stated twice:** 7.5, as above.
- **Missing** (each a DOUBT for the owner):
  - "It needs no rule saying so" (see 7.4).
  - A definition by negation is not accepted. Its home is 3.3 or this section.
  - A title names the node's matter. That stands only in `.claude/vt/rules.md`, and 7.6 covers only the first sentence.
  - Examples name what any system has. That stands only in decisions and in `CLAUDE.md`.
- **No subject:** 7.4 and 7.5 name none either, against 7.2. The form "Whoever…" of agreed 1.2.6 is available.
