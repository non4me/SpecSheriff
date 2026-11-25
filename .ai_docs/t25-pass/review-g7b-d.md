# Follow-up review g7b-d: items 55 and 56, and the proposal on item 47

The report of specsheriff-rule-reviewer on review-input-g7b-d.md, 2026-11-25, as the main session saved it. Every finding of the first review was applied, but three fixes left gaps and round b added defects in the new sentences of item 56. No finding is for the owner: each can be settled from agreed nodes.

## Item 55, `s-nk8td3ez58gahc4`, "A RecordType that its variants refine": not ready

Checklist lines with ✗:
- 7.1: "Otherwise, it writes them as it writes those of any RecordType" reads as "if the RecordType has no variants", while the Russian says «Во всём остальном».
- 7.2.7: RecordType (s-7vm323mhry2enx3) is not cited at its first use.
- 7.3.2: "The variants of such a RecordType are …, each in the approved wording …" says which variants and which wording: two thoughts.
- 7.5.2: in "the approved wording from which `sheriff types` generates", "generates" has no object.

«Оценка»: согласованность ✗ (s-a8fn72xa782wvbk и принцип «Nothing unapproved is implemented»: если ни один вариант ни разу не одобрен, тип RecordType становится объединением из одного `…Other`, то есть меняется из‑за черновика); целостность ✗ (в `schema` RecordType может не быть `allOf`, и этот случай описан только в stage3; место типа `…Other` не задано); целесообразность ✓; избыточность ✓; недостаточность ✗ (те же два пробела).

Findings, all for the author:
- F1: "Otherwise," → "In all other respects," (the Russian stays).
- F2, settled by s-a8fn72xa782wvbk: replace sentences 3 and 4 with "The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes each variant in its last approved wording (§s-a8fn72xa782wvbk), in the order in which it takes the RecordTypes. It leaves out a variant that has never been approved. Where it leaves out every variant of a RecordType, it writes the RecordType's definition and type as it writes those of any RecordType." / «Варианты такого RecordType — это те варианты RecordType, чей RecordType — он, как это определяет проверка вариантов RecordType (§s-c2r9jndrjbtbsv6). `sheriff types` берёт каждый вариант в его последней одобренной формулировке (§s-a8fn72xa782wvbk), в том порядке, в каком берёт RecordType. Вариант, который ни разу не одобряли, он пропускает. Если он пропускает все варианты RecordType, он пишет определение и тип этого RecordType так же, как определение и тип любого RecordType.» Extend `stage3` to match.
- F3: after the list, add "Where the RecordType's `schema` holds no `allOf`, the definition holds an `allOf` with only these pairs." / «Если `schema` RecordType не содержит `allOf`, определение содержит `allOf` только с этими парами.»
- F4, as types.ts:212–220 already does: open the paragraph on that type with "The type for the combinations that have no variant is written right after the union." / «Тип для сочетаний, у которых нет варианта, пишется сразу после объединения.»
- F5: "For a RecordType (§s-7vm323mhry2enx3) that has…" / «Для RecordType (§s-7vm323mhry2enx3), у которого…», with a `cites` link.
- Nits:
  - "…with the sid of the variant, so that it points to the variant's definition" / «…с sid варианта, так что он указывает на определение варианта»;
  - in the Russian, «…; имя этого типа — имя типа RecordType, за которым следует `Other`»;
  - in the example, add "and the second the guaranteed field `phone`" / «, а второй — гарантированное поле `phone`», since s-c2r9jndrjbtbsv6 refuses a variant that declares no field.
- TERM: the fields that select a variant correspond to the discriminant of a TypeScript discriminated union, in part when several fields select. A gloss in the docs is enough.

## Item 56, `s-4npdup7mjkva69y`, "The type that the schema of a field gives": not ready

Checklist lines with ✗:
- 7.1: "after the type that uses it": several types use the same nested `TypedDict`.
- 7.2.3: "each of its members gives an object type" does not name `TypedDict`.
- 7.2.7: "with the same SpecTag" has no citation and no link; RecordType (s-7vm323mhry2enx3) is not cited at its first use.
- 7.3.2: "…is written as a `TypedDict` of its own, after the type that uses it and with the same SpecTag" states three facts.

«Оценка»: согласованность ✗ (s-suv42g8r3ra2h6b: поля RecordType входят и в типы его вариантов и уточняющих RecordType, поэтому вложенный `TypedDict` с именем по владельцу пишется несколько раз, а s-suv42g8r3ra2h6b и s-dbk2vyeg8z5jxna отвергают такое имя); целостность ✓; целесообразность ✓ (`#<sid>` — допустимый `$anchor` по JSON Schema 2020-12, §8.2.2); избыточность ✓; недостаточность ✗ (для `allOf` не сказано, обязательно ли поле, которое объявляют несколько элементов; не определено, что даёт на Python `enum`, значение которого `Literal` не принимает).

Findings, all for the author:
- G1: replace the first sentence of the paragraph on the nested `TypedDict` with "In Python, each object written inline and each `allOf` that gives a `TypedDict` is written as a `TypedDict` of its own. It is written once, after every type that `sheriff types` writes for the RecordType whose `schema` holds it. It has the SpecTag (§s-5z5gnu7pahr82xp) of that RecordType. Its name begins with the name of that RecordType's type." / «На Python каждый объект, записанный на месте, и каждый `allOf`, который даёт `TypedDict`, пишется как отдельный `TypedDict`. Он пишется один раз — после всех типов, которые `sheriff types` пишет для того RecordType, `schema` которого его содержит. У него SpecTag (§s-5z5gnu7pahr82xp) этого RecordType. Его имя начинается с имени типа этого RecordType.», with a `cites` link. `stage3` says that types.ts today names this type after the type that uses it.
- G2: "gives an object type" → "gives a `TypedDict` in Python" / «даёт на Python `TypedDict`».
- G3: after the sentence on the last member, add "Such a field is required where the `required` of any of these members lists it." / «Такое поле обязательно, если его перечисляет `required` хотя бы одного из этих элементов.»
- G4: "…so a `const` with any other value, or an `enum` that holds any other value, gives what `{}` gives." / «…поэтому `const` с любым другим значением или `enum`, который содержит любое другое значение, даёт то же, что `{}`.» PEP 586 rules out floats, lists and dicts in `Literal`. With the readers' wording, "gives the same type as `{}`".
- G5: "(§s-7vm323mhry2enx3, §s-6eb92ddch7shuvu)" at the first use of RecordType, with a `cites` link.
- Nits:
  - the title could be "The type and the RuntimeCheck that the schema of a field gives" / «Тип и RuntimeCheck, которые даёт схема поля»;
  - add "In `Literal`, `true`, `false` and `null` are written `True`, `False` and `None`." / «В `Literal` значения `true`, `false` и `null` пишутся как `True`, `False` и `None`.»;
  - the members of a merged `allOf` that are inline objects also become `TypedDict`s that no type uses.

## Item 47, `proposal:s-ezq8csd433vj6fj-g7`: ready

Every checklist line ✓, every criterion ✓, no finding.

## Points to look at

`$ref` and `identifierOf` hold; no check of a row in items 55 and 56; no question for the base specification blocks these drafts; both questions for the owner are built as the brief asks.

## The main session's decisions

- F1 to F5 and G1 to G5 are applied as worded, with the readers' words where `english-g7b-fast.md` and `english-g7b-thorough.md` say so. For F1 the thorough reader's "In every other respect," is used.
- The nits are applied too, except the title of item 56: the agreed title of the node in `tools.json` names the type alone, and the text already says what the RuntimeCheck holds. The third nit (`allOf` members that no type uses) is settled by writing a nested `TypedDict` only where a type uses it; the author states it in the node.
