# Batch 2: main rules of sections 4–12 stop naming domains and RecordTypes

The owner's ruling (2026-11-09): a main rule, that is a rule of the guidelines outside the extensions, names no particular extension, in its text or reason, and cites none of its nodes (`newform.json`, key "13.1.3"). Domains and RecordTypes belong to the extension on domains (part 13). Where a main rule spoke of a domain, it now speaks of a section; 3.1, already agreed, says "top-level section". Working drafts are in `newform.json`, by the keys below. None of these nodes has been agreed yet, except that their wording was earlier written by the pass. What leaves a node goes to part 13 at its review.

Each line replaces the first by the second.

1. 4.1 (s-vj7ercem526zd6v), changes what it states.
   - EN text, opening: "The technical appendix is no domain and stands at no level. It stands beside the domains, as contracts does. It holds:" → "The technical appendix holds:"
   - RU: «Техническое приложение — не домен и не стоит ни на каком уровне. Оно стоит рядом с доменами, как contracts. Оно содержит:» → «Техническое приложение содержит:»
   - EN first item: "a section for each domain it implements, under that domain's name;" → "a section for each top-level section of the base specification it implements, under that section's title;"
   - RU: «раздел для каждого домена, который оно реализует, под именем этого домена;» → «раздел для каждого раздела верхнего уровня базовой спецификации, который оно реализует, под названием этого раздела;»
   - EN reason: drop its first sentence, "The appendix is no subject area of the system but the way every one of them is built, which no level can place."
   - RU: drop «Приложение — не предметная область системы, а то, как строится каждая из них, и это не может поместить ни один уровень.»
   - EN reason: "which spans the domains as the stack does" → "which spans the system as the stack does"
   - RU: «который охватывает домены, как и стек» → «который охватывает всю систему, как и стек»

2. 5.4 (s-7445ahgjck2aefg)
   - EN text: "a RecordType, a term node or a node of a project's own NodeKind" → "a term node or a node of a project's own NodeKind"
   - RU: «RecordType, узел термина или узел собственного NodeKind проекта» → «узел термина или узел собственного NodeKind проекта»
   - EN reason: "A RecordType, a term node and a node of a project's own NodeKind each state" → "A term node and a node of a project's own NodeKind each state"
   - RU: «RecordType, узел термина и узел собственного NodeKind проекта каждый сам по себе» → «Узел термина и узел собственного NodeKind проекта каждый сам по себе»
   - EN reason: drop "A RecordType states the shape of its data."
   - RU: drop «RecordType задаёт форму своих данных.»

3. 5.5 (s-kag2m9tzdnduxdx)
   - EN text: drop the item "a domain's header is located by the domain's name alone;"
   - RU: drop «заголовок домена располагается по одному имени домена;»
   - EN: "the part contracts, like a domain, is numbered" → "the part contracts is numbered"
   - RU: «часть contracts, как и домен, нумеруется» → «часть contracts нумеруется»

4. 9.1 (s-5ah25f6gy99panq)
   - EN: "The status of a section and of a domain's header is built" → "The status of a section is built"
   - RU: «Статус раздела и заголовка домена строится» → «Статус раздела строится»
   - EN: "such as `RecordType.fields`" → "such as `TextRule.list`"
   - RU: «например `RecordType.fields`» → «например `TextRule.list`»

5. 9.2 (s-fpq35tf3pehgk64)
   - EN: "a section or a domain's header, whose status is built" → "a section, whose status is built"
   - RU: «раздела или заголовка домена, статус которых строится из узлов под ними» → «раздела, статус которого строится из узлов под ним»

6. 10.2 (s-zg6bvg7jrcpu8vf), changes what it states.
   - EN title: "A domain is reviewed whole before its implementation begins" → "A top-level section is reviewed whole before its implementation begins"
   - RU title: «Домен проверяется целиком до начала его реализации» → «Раздел верхнего уровня проверяется целиком до начала его реализации»
   - EN text: "Before a domain's implementation begins, the domain is reviewed whole." → "Before the implementation of a top-level section begins, that section is reviewed whole."
   - RU: «Прежде чем начнётся реализация домена, домен проверяют целиком.» → «Прежде чем начнётся реализация раздела верхнего уровня, этот раздел проверяют целиком.»
   - EN reason: "Read whole, a domain shows" → "Read whole, a section shows"
   - RU: «Прочитанный целиком, домен показывает» → «Прочитанный целиком, раздел показывает»

7. 10.4 (s-qxpqtnbgmydusx2), reason
   - EN: "Code generated from a node, as the types and RuntimeChecks of a RecordType are (§s-e877bnfa559tvk9), is held" → "Code generated from a node is held"
   - RU: «Код, сгенерированный из узла, как типы и RuntimeChecks у RecordType (§s-e877bnfa559tvk9), каждый коммит держит» → «Код, сгенерированный из узла, каждый коммит держит»

8. 10.5 (s-8xw4mgvpexyvw5q), reason
   - EN: "A section and a domain's header require nothing" → "A section requires nothing"
   - RU: «Раздел и заголовок домена ничего не требуют» → «Раздел ничего не требует»
   - EN: "The code generated from a RecordType owes no test" → "Code generated from a node owes no test"
   - RU: «Код, сгенерированный из RecordType, теста не требует» → «Код, сгенерированный из узла, теста не требует»

9. 10.8 (s-ef93u6cnbs2sevr), text
   - EN: "The message names no domain's header and no section." → "The message names no section."
   - RU: «Сообщение не называет ни заголовка домена, ни раздела.» → «Сообщение не называет ни одного раздела.»

10. 12.12 (s-83ev4wwesbwnhnp), text
    - EN: "a section and a domain's header left out;" → "a section left out;"
    - RU: «кроме раздела и заголовка домена;» → «кроме раздела;»

11. 12.1 (s-jau82aq9juv9zzh), reason. The table's rows on domains and RecordTypes are settled at that node's review.
    - EN: drop "A RecordType named across domains outside the sections used is reported for the reason §s-5yvpn4zhuqmv5bq gives."
    - RU: drop «RecordType, названный через границу доменов вне используемых разделов, сообщается по причине, которую даёт §s-5yvpn4zhuqmv5bq.»
