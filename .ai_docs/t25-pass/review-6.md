# The reviewer's report on section 6 (2026-11-09), applied node by node at each node's turn

Passes after the fixes below.

## 6.1
- WORDING FIX (14.1.3: the last two list items belong to part 14). One item replaces them: EN `- values built from other nodes.` RU `- значений, построенных из других узлов.`
- Second reason paragraph: EN "A value built from other nodes copies what they hold. The links stay with those nodes." RU «Значение, построенное из других узлов, копирует то, что они содержат. Связи остаются у этих узлов.»
- WORDING FIX (the reason is narrower than the text). Open it with: EN "A link says how a node bears on another, so that node declares it." RU «Связь говорит, как узел относится к другому узлу, поэтому её объявляет этот узел.»
- End it with: EN "A node of the archive is no longer part of the specification. Whoever changes a node it names has nothing to miss." RU «Узел архива больше не часть спецификации. Тому, кто меняет названный им узел, нечего пропустить.»
- WORDING FIX: remove `(§s-bpdqd9v72wg7vsz)` and its link from the last sentence of the text, in both languages. After the 6.2 fix, 6.2 no longer states this.
- CUT: the reason's sentence "Quoted as code, …". Its first sentence already covers it.

## 6.2
- WORDING FIX (the sid stands in for an explanation and repeats 6.1). Second paragraph: EN "A node of the archive holds no link pointing at it. No link it declares is built into another node." RU «Узел архива не содержит связей, которые указывают на него. Ни одна из объявленных им связей не встраивается в другой узел.»
- CUT: "The end each entry names tells the direction."

## 6.3
Besides `consumes` leaving the items and `list.members`, `overrides` makes the closed list false. These must also change:
- Opening: "Every link names what it means by a type. The main rules define these types:"
- After the items: "An extension of the guidelines may define further types."
- `list.of`: "the types of link the main rules define"
- The `cites` item and its link name §s-cxtt6jvhqcey2k9.
- CUT: "Given a ratio, a use states a multiplicity nobody means." It states a mistake's cost. Also the sentence "A term that only starts a process…", which restates the `uses` item.
- DOUBT: `sheriff binding` compares `list.members` with the schema's enum of link types (skills/tools/src/binding.ts), so `consumes` must leave that enum too. No draft says where an extension declares `consumes` and `overrides`.
