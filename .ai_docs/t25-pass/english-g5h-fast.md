### D:\SpecSheriff\.ai_docs\t25-pass\english-group5h.md · s-gvafe6bnstwab8b, Text
TRANSLATION: `sheriff validate` отклоняет любой другой JSON-файл в `specs/tech/` и называет этот файл.
TWO READINGS:
- "any other JSON file": "other" than what is not stated in the sentence. It most likely means "other than the files the neighbouring rules accept". From the node's title and the earlier rule, those are `stack.json`, `debt.json` and the files named after a domain. The reader has to take this from the rule's title and from other nodes.
- "names that file": most likely the refusal gives the file's name. A weaker reading is that `sheriff validate` assigns the file a name.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5h.md · s-3anv9qcmx8pwp2w, Text
TRANSLATION: У цепочки нет конца, если она возвращается к полю, которое уже есть в ней.
TWO READINGS:
- "A chain": the sentence does not say what the chain consists of or where it starts. The reader has to take it from the rest of the node, which is not in this passage. The likeliest reading is the sequence of fields reached by following identifiers from one RecordType to the next. The same node says a RecordType reached twice is refused, which is a different unit, a RecordType and not a field.
- "it" (both times, in "if it comes back" and "already in it"): "chain" is the most likely antecedent, and the field is the other candidate. Both mentions most likely refer to the chain.
LANGUAGE: none

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5h.md · s-c2r9jndrjbtbsv6, Text (first sentence)
TRANSLATION: Если вариант RecordType не удовлетворяет последнему условию, отказ также называет каждый из остальных вариантов RecordType того же RecordType, у которых тот же `answersTo`, что и у него.
TWO READINGS:
- "the last condition": it points back to a list of conditions that is not in this passage. It most likely means the last item of the list in the node's text, "no other variant of the same RecordType answers to the same values".
- "its RecordType": either the RecordType that the variant refines (most likely), or the RecordType in whose part of the specification the variant stands.
- "as it does": "it" is the variant that fails the condition. The nearest other candidate, "its RecordType", does not fit, because the variants carry `answersTo`.
- "the same `answersTo`": either the same value of `answersTo`, or the same field named in `answersTo`. The rule's text speaks of "the same values", so the first reading is favoured.
LANGUAGE:
- "Where the RecordType variant fails" → "Where a RecordType variant fails" — no particular variant has been introduced in this passage, so the definite article suggests a variant the reader already knows. This is a stylistic fix and does not change the meaning.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5h.md · s-c2r9jndrjbtbsv6, Text (second sentence)
TRANSLATION: Если они называют разные поля, `sheriff validate` отклоняет каждый вариант RecordType, который уточняет RecordType без `chosenBy`, поскольку каждый такой вариант RecordType не удовлетворяет первому условию.
TWO READINGS:
- "they": no antecedent in this sentence. The candidates are (a) the RecordType variants of the previous sentence that share the same `answersTo`, (b) the RecordTypes up the `refines` links that name the fields choosing the variant, and (c) the `answersTo` values of those variants. The previous sentence makes (a) the nearest antecedent. But "name different fields" fits (b) better, because the first condition speaks of the fields "the nearest RecordType … names as choosing it". The context does not settle which one is meant.
- "the RecordType that has no `chosenBy`": the definite article suggests a RecordType already mentioned, but none has been. It is not clear whether this is the RecordType the variants of the previous sentence refine, or any RecordType without `chosenBy` in general.
- "the first condition": it points back to the first item of the list in the node's text, which is not in this passage. It most likely means "the fields the variant answers to are those the nearest RecordType … names as choosing it".
- "refuses every RecordType variant … since each such RecordType variant fails": it is not stated whether this concerns only the variants named in the previous sentence, or all variants of that RecordType. The wording "every … that refines" favours all of them.
LANGUAGE:
- "Where they name different fields" → name the subject, for example "Where these RecordType variants name different fields" — a pronoun without an antecedent. The replacement keeps the meaning only if reading (a) is the intended one. I am not sure it is.
- "the RecordType that has no `chosenBy`" → "a RecordType that has no `chosenBy`" — the article presumes a RecordType the reader already knows. The replacement keeps the meaning only if the rule means any such RecordType. I am not sure it does.

### D:\SpecSheriff\.ai_docs\t25-pass\english-group5h.md · new:tools-7-1-enum-values, Reason
TRANSLATION: Поэтому, если бы `sheriff validate` принимал поле, у которого нет значений или значения которого нарушают правила об их источнике (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), типы и RuntimeChecks, порождённые из значений этого поля, унаследовали бы дефект поля.
TWO READINGS:
- "So,": this opens the reason, so it points back to something before it. The only candidate is the node's text, which is not in this passage. It most likely points to the rule that `sheriff validate` accepts only such fields.
- "the types and RuntimeChecks generated from that field's values": "generated from that field's values" applies either to both the types and the RuntimeChecks (favoured), or only to the RuntimeChecks.
- "that field's": the field "that has no values, or whose values break the rules". It is the same field in both cases, so there is no real ambiguity.
LANGUAGE:
- "So, if" → "If" — a reason that begins with "So," reads as a conclusion from an earlier sentence, and there is none in the Reason field. The replacement keeps the meaning, but the link to the rule's text is lost, so check that the author does not need it.
