### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-d.md · s-2x58az67bm6cxq2 — sentence 1
TRANSLATION: Тест, который коммит переименовывает, сохраняя его SpecTag и ничего больше в нём не меняя, тоже остаётся тем же тестом (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
TWO READINGS:
- "also stays the same test": "also" ("тоже") has nothing in the sentence to be parallel to. Reading 1: a renamed test is the same test, just like some other thing named earlier, such as a symbol whose name has changed. Reading 2: besides being renamed, the test also stays the same test. The sentence names no such parallel, so the first reading is the likelier, but it can't be checked from this text.
- "changing nothing else in it": "it" is most likely the test. The commit is the subject of the relative clause, so "in it" could also be taken as the commit, but that makes no sense.
LANGUAGE:
- "also stays the same test" → "remains the same test" — "also" has no counterpart in the sentence. If a parallel with another case was meant, the sentence has to name it. I'm not sure the replacement keeps the author's meaning.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-d.md · s-2x58az67bm6cxq2 — sentence 2
TRANSLATION: Коммит изменяет файл, привязанный целиком, если он изменяет любую часть текста файла, включая комментарий или пробельные символы (§s-kgbzk2ph9e6jfb4).
TWO READINGS:
- "bound as a whole": it is not said what the file is bound to. Reading 1: the file is bound to a node as a single unit, and no symbol inside it is bound separately. This is the likelier reading, since the node cited is about symbols. Reading 2: the whole file is bound, as opposed to part of it, which is nearly the same.
- "including a comment or whitespace": it could mean that a change to a comment or to whitespace also counts as a change to the file. It could also mean that the part of the text is a comment or whitespace. In practice these come to the same thing.
LANGUAGE:
- "A commit changes a file bound as a whole where the commit changes" → "A commit changes a file bound as a whole if it changes" — "where" used as "if" is unusual here. The sentence also says the same thing twice: a commit changes a file where the commit changes part of it. The author may have meant "counts as changing", in the sense of the binding check. I'm not sure the replacement keeps that meaning.
- "bound as a whole" → "bound to a node as a whole" — "bound" is missing its object.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-d.md · new:tools-7-2-draft-rule
TRANSLATION: Из спецификации в том виде, в каком её оставляет коммит, `sheriff binding` берёт статус одобрения каждого правила, которое называют эти SpecTag.
TWO READINGS:
- "those SpecTags": there is no antecedent in the sentence. The title says "The code and the tests of a draft rule", so the likeliest referent is the SpecTags on that code and those tests. The node text before this sentence may name them, but I don't have it.
- "as the commit leaves it": "it" is the specification, so this means the specification after the commit.
- "takes": it means reads. The sentence doesn't say what the tool does with the status once it has it.
LANGUAGE:
- "those SpecTags" → "the SpecTags on that code and those tests" — the phrase points back to something not named in the sentence, and the guidelines forbid that. I am not sure the replacement matches the preceding text of the node.
- "that those SpecTags name" → "that the SpecTags name" — the "that ... those" pair is clumsy. This is minor.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-d.md · s-5hb9k2e34dgn284 — sentence 1
TRANSLATION: Если не удаётся найти файл, место или символ, на которые указывает список, отказ называет то, что найти не удалось.
TWO READINGS:
- "the file, the place or the symbol": "the place" is vague. It could be a location in the file, or a place in the schema or the settings. Rule 7.2.6 says the list is compared with a declaration "in the code, the schema or the settings", so "place" most likely means a declaration in the schema or the settings, but it could also mean a position inside the file.
- "Where ... cannot be found": it could mean that any one of the three is missing. It could also mean that all three are missing. "the one that cannot be found" shows the first reading is the intended one.
- "the refusal": no refusal has been named in the passage. It most likely means the refusal of `sheriff binding`, and so of the commit.
- "the one that cannot be found": "the one" is whichever of the three was not found.
LANGUAGE:
- "to which the list points" → "that the list names" — rule 7.2.6 uses "the declaration the list names". Here "points to" is used for the same relation. The two verbs make a reader think they are two different relations. I'm fairly sure the meaning is kept.
- "the refusal names the one that cannot be found" → "the refusal names which of them cannot be found" — "the one" next to a list of three alternatives is clumsy. I'm not sure the replacement keeps the meaning, because the original may name the missing element itself and not just say which kind it is.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group3-changed-d.md · s-5hb9k2e34dgn284 — sentence 2
TRANSLATION: Для члена списка, являющегося объектом, его значение — это значение свойства, которое называет `TextRule.list.property`.
TWO READINGS:
- "its value": "its" is most likely the member. It could also be the list, but "For a member" at the start rules that out. The sentence doesn't say what "value" means here. Reading 1: the value that is compared with the declaration, which fits rule 7.2.6, where "A member that is an object is compared by the property the list names". Reading 2: some other value, such as the value the member contributes to the check. Reading 1 is likelier.
- "names": `TextRule.list.property` holds the name of the property. It doesn't contain the property itself.
LANGUAGE:
- "its value is the value of the property" → "it is compared by the value of the property" — "its value is the value of ..." is circular, and "value" is not defined. I am not sure the replacement keeps the meaning, because the author may have meant some other value than the one compared.
- "For a member that is an object" → "For a member that is an object, its value" — this is acceptable. The pronoun "its" has to be tied to the member, so a short rewrite would be "the member's value".
