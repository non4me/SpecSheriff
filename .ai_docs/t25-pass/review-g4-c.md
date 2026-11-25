# Review of group 4, input C: three drafts in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`

None of the three drafts is ready. Most of the fixes are the author's to make. Two questions only the owner can answer; they are listed at the end.

**The brief's points that fall in this input:**
- **Item 37, moving the check to `sheriff commit-message`:** the author's reading holds. The check needs the trailer, and rule 10.6 already skips checks that need a commit message.
- **Item 37, comparing by fingerprint with the last approved wording:** holds. It is the only reading that catches the usual path (rule reworded while a draft, approved later), which the owner wanted on 2026-11-19.
- **Item 38, leaving out all of `specs/_guidelines/`:** holds. The owner's ruling of 2026-10-31 on 9.2 keeps the guidelines out "where the guidelines are written as well", and rule 9.1 puts the SpecSheriff tools outside the system's code.
- **Item 39, dropping the refusal of a sid that names no node:** holds. Table 10.1 is "the complete list of the checks".

---

## `s-txbwsthdqhvyzd2`: "An approved rule whose tests or code lag behind it". **Not ready**

1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓
7.2.7 ✗ "names the trailer by which…": the first use of "trailer" has no citation.
7.3.1 ✓
7.3.2 ✗ "It says whether the rule's tests, its code or both lag, and names the trailer…": two facts in one sentence.
7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓
7.6.3 ✗ "An earlier commit reworded rule R while it was a draft": the example leaves out that R had been approved, and the refusal depends on that.
Pairing test of the reason ✓

**Оценка**
- согласованность: ✗ — без цепочки `implements` расходится с записью при согласовании строки 10.1.40 (t25-one-thought.md, строка 328: «привязан» — в смысле строки 10.1.41) и с согласованными 10.1.43a, 10.4 и s-kgqxg4gunzynwsv. С 10.1.28a, 10.6, s-2x58az67bm6cxq2, s-7gab4ptjt2khfr5 и принципами — ✓.
- целостность: ✓ — s-477gtdrkw34dzxw, s-f5rz6b7dhxejjts, impl.json и todo строки 10.1.40 названы в заметках.
- целесообразность: ✓ — 10.1.40, решения от 2026-11-19 и 2026-11-20.
- избыточность: ✗ — абзац об отпечатках повторяет определение из предыдущего абзаца (s-a8fn72xa782wvbk).
- недостаточность: ✗ — не сказано, что делать, если в родительском коммите у правила нет ни одного одобрения.

**Findings**
- **DOUBT (author can fix; the records settle it).** Without the `implements` chain, a base rule implemented through a node of the technical appendix is never checked. That node is the case in row 10.1.41's example. Add this after the paragraph on "before/after the commit":
  - EN: "Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the rule, directly or through a chain of such links, also counts as bound to the rule (§s-6fw72j65jkqrfpf)."
  - RU: «Код или тест, привязанный к узлу, у которого есть связь `implements` (§s-sn6au3vcr9uy5pm) к правилу, напрямую или через цепочку таких связей, тоже считается привязанным к правилу (§s-6fw72j65jkqrfpf).»
  - Add `cites` links to both sids. The note "No implements chain" and `stage3` change with it.
- **WORDING FIX (author).** Fixes 7.2.7 and 7.3.2.
  - EN: "It says whether the rule's tests, its code or both lag. It also names the trailer (§s-7gab4ptjt2khfr5) by which the commit message can make that statement."
  - RU: «Он говорит, отстают ли тесты правила, его код или и то и другое. Он также называет trailer (§s-7gab4ptjt2khfr5), которым сообщение коммита может это утверждать.»
- **WORDING FIX + CUT (author).** Row 10.1.40's "an approved rule… changes" settles that a first approval is not such a change. Replace both paragraphs, from "A commit changes the approved wording…" to "…(§s-gb8s9657a65hqmv)":
  - EN: "A commit changes the approved wording of a rule where all of the following hold:
    - the rule is approved as the commit leaves it;
    - the commit's parent holds an approval of the rule (§s-v4qus7raqnwzneb);
    - the fingerprint of the rule's wording as the commit leaves it differs from the fingerprint that the rule's last approval in the commit's parent records.

    `sheriff commit-message` reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv)."
  - RU: «Коммит меняет одобренную формулировку правила, если выполнено всё следующее:
    - правило одобрено в том виде, в каком его оставляет коммит;
    - в родительском коммите есть одобрение правила (§s-v4qus7raqnwzneb);
    - отпечаток формулировки правила в том виде, в каком её оставляет коммит, отличается от отпечатка, который записывает последнее одобрение правила в родительском коммите.

    Одобрения родительского коммита `sheriff commit-message` читает в том виде, в какой их переписал бы `sheriff reindex` (§s-gb8s9657a65hqmv).»
  - Drop the citation of s-a8fn72xa782wvbk and its link.
- **WORDING FIX (example, author).**
  - EN: "An earlier commit reworded the approved rule R, so R became a draft."
  - RU: «Более ранний коммит переформулировал одобренное правило R, и оно стало черновиком.»
- **TERM.** "lag behind" corresponds to OpenFastTrace's "outdated" coverage, a partial fit. OpenFastTrace marks coverage outdated when an item's revision is raised; here a commit changes a rule's wording without its tests and code. Keep the word and gloss it in the docs; this costs nothing in the node.

---

## `s-jgejd5rpd9d43pd`: "An approved rule without code or a test". **Not ready**

1.2.3 ✓
7.1 ✗ "lacks either of the following": it can also be read as "lacks both".
7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓
7.2.7 ✗ "the project's own guidelines", "their extensions", "the appendix of the tools": none cites the node that defines it.
7.3.1 ✓
7.3.2 ✗ "names the rule … (§s-kag2m9tzdnduxdx), and says whether it lacks code, a test or both": two facts in one sentence.
7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ — 10.1.41, 9.1, 9.2 (решение от 2026-10-31), 9.8, 2.1, 1.7.1, s-5z5gnu7pahr82xp, s-75ue25v6r23jkk8, s-2x58az67bm6cxq2, s-zefk589ykh37b8u.
- целостность: ✓ — дополнение к s-33fw3ga4ctd94dq и impl.json названы в заметках.
- целесообразность: ✓ — 10.1.41.
- избыточность: ✓.
- недостаточность: ✗ — коммит, который прекращает освобождение (удаляет связь `exempts` или оставляет освобождающий узел черновиком), не «включает» освобождённые правила, и они незаметно остаются без кода. Это вопрос владельцу.

**Findings**
- **WORDING FIX (author).**
  - EN: "where that rule lacks one or both of the following"
  - RU: «если у этого правила нет хотя бы одного из следующего»
- **WORDING FIX (author).**
  - EN: "The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also says whether the rule lacks code, a test or both."
  - RU: «Отказ называет файл, sid и расположение правила (§s-kag2m9tzdnduxdx). Он также говорит, чего у правила нет: кода, теста или того и другого.»
- **WORDING FIX (author).** "as the rule on implementing an approved rule says" leaves the direction of the chain to the reference. The owner ruled the direction on 2026-11-20. Replace the sentence with the same EN and RU sentence as in the first draft's chain fix.
- **WORDING FIX (author).** Fixes 7.2.7.
  - First item: "each node of the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);"
  - Second item: "…of their extensions (§s-mbmnsnxenmavu3z) and of the appendix of the tools (§s-a4rbry4hsu34hy8), all kept in `specs/_guidelines/`;"
  - Put the same sids after the matching Russian words, and add the links.
- **TERM.** This check is what OpenFastTrace calls coverage in `impl` and `utest`, a partial fit: SpecSheriff also refuses a skipped test. Gloss it in the docs.

---

## `s-qqs2svksmjct753`: "The nodes that a commit message must name". **Not ready**

1.2.3 ✓ · 7.1 ✓ · 7.2.1 ✓ · 7.2.2 ✓ · 7.2.3 ✓ · 7.2.4 ✓ · 7.2.4.1 ✓ · 7.2.4.2 ✓ · 7.2.4.3 ✓ · 7.2.4.4 ✓ · 7.2.4.5 ✓ · 7.2.5 ✓ · 7.2.6 ✓ · 7.2.7 ✓ · 7.3.1 ✓
7.3.2 ✗ reason "…the changed code implements (§s-ef93u6cnbs2sevr), and the SpecTags on that code name exactly those nodes": two facts with no stated relation.
7.3.3 ✓ · 7.4.1 ✓ · 7.4.2 ✓ · 7.5.1 ✓ · 7.5.2 ✓ · 7.5.3 ✓ · 7.6.1 ✓ · 7.6.2 ✓ · 7.6.3 ✓ · Pairing test of the reason ✓

**Оценка**
- согласованность: ✓ — 10.1.42, 9.6 (решения от 2026-11-11 и 2026-11-17), s-2x58az67bm6cxq2, s-5qdjyf6t898rsd4, s-trwczfskj5zmuft, s-36x8amvunmv2kp5, 10.1.
- целостность: ✓ — s-f5rz6b7dhxejjts, s-477gtdrkw34dzxw и impl.json названы.
- целесообразность: ✓.
- избыточность: ✓.
- недостаточность: ✗ — (1) дифф, который `git commit --verbose` пишет после строки-ножниц, считается частью сообщения, и SpecTag из диффа сходят за sid в сообщении; (2) коммит слияния — вопрос владельцу.

**Findings**
- **DOUBT (author can fix).** With `git commit --verbose`, git writes the diff below a scissors line, and the diff lines do not start with `#`. git's documentation says this. That the commit-msg hook receives the diff before git cuts it is my inference: I could not run a probe, because a hook blocked `git commit` in a scratch repository. If the hook does receive it, the SpecTags in the diff pass the check. The code (`message.ts`, `messageText`) has the same gap. Replace "The lines that start with `#` are left out, since git treats them as comments.":
  - EN: "`sheriff commit-message` leaves out each line of the message that starts with git's comment character (`core.commentChar`, by default `#`). It also leaves out the scissors line that `git commit --verbose` writes and every line after it, which hold the diff that git leaves out of the commit message."
  - RU: «`sheriff commit-message` не учитывает строки сообщения, которые начинаются с символа комментария git (`core.commentChar`, по умолчанию `#`). Он также не учитывает строку-ножницы, которую пишет `git commit --verbose`, и все строки после неё: в них дифф, который git не включает в сообщение коммита.»
- **WORDING FIX (reason, author).**
  - EN: "The SpecTags on the changed code name the nodes that it implements, so a commit message checked against them records those nodes for whoever reads the history (§s-ef93u6cnbs2sevr)."
  - RU: «SpecTag на изменённом коде называют узлы, которые он реализует, поэтому сообщение коммита, проверенное по ним, записывает эти узлы для того, кто читает историю (§s-ef93u6cnbs2sevr).»

---

## Questions only the owner can answer

1. **Merge commits (first and third drafts).** `git merge` and `git pull` run the commit-msg hook, and a merge is compared with its first parent (s-2x58az67bm6cxq2). So a merge's message must name every node bound to the code it brings in, and must repeat each trailer from the merged branch. Git's default message "Merge branch …" is then refused. My recommendation (inference): count for a merge only the code that differs from every parent, since the merged commits already name the rest.
2. **Exemptions (second draft).** Should a commit that ends an exemption also include the rules it exempted? Row 10.1.41's list of what a commit includes, agreed on 2026-11-20, leaves this case out.
