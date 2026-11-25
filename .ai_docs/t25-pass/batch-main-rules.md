# Batch under review: the rules every project shares stop naming domains, and the extension is defined

Working drafts are in `newform.json` beside this file, by the keys given. Nothing here is written yet.

## A. Carrying out the owner's ruling, no change of meaning intended

Each line replaces the first by the second.

1. 1.1.2 (s-qmmzf9nksfsa3qp), text
   - EN: "...may be divided into parts, as sections and domains." → "...may be divided into parts, as sections."
   - RU: «…разделена на части в виде разделов и доменов.» → «…разделена на части в виде разделов.»
2. 1.1.5 (s-tj38pvm38nepaf5), text
   - EN: "how each domain is built" → "how each part of the system is built"
   - RU: «как построен каждый домен» → «как построена каждая часть системы»
3. 1.1.6 (s-6sk8uet75dmq5qz), reason
   - EN: "Owners of domains and sections divide the reading" → "Owners of sections divide the reading"
   - RU: «Ответственные за домены и разделы делят чтение» → «Ответственные за разделы делят чтение»
4. 1.3.1 (s-tgrnpagrb58tya7), text
   - EN: "The specification as a whole, a section or a domain, and a rule each have one." → "The specification as a whole, a section and a rule each have one."
   - RU: «Он есть у всей спецификации, у раздела или домена и у правила.» → «Он есть у всей спецификации, у раздела и у правила.»
5. 1.3.2 (s-utvqbypzhmgndug), text and reason
   - EN: "The specification, a section, a domain or a rule that is not approved" → "The specification, a section or a rule that is not approved"
   - RU: «Спецификация, раздел, домен или правило, которые» → «Спецификация, раздел или правило, которые»
   - EN: "For a section or a domain, the status indicates" → "For a section, the status indicates"
   - RU: «Для раздела или домена статус является» → «Для раздела статус является»
   - EN: "The status of a section or a domain shows" → "The status of a section shows"
   - RU: «Статус раздела или домена сразу показывает» → «Статус раздела сразу показывает»
   - EN: "A status of their own for sections, domains and nodes" → "A status of their own for sections and nodes"
   - RU: «Самостоятельный статус у разделов и доменов и узлов» → «Самостоятельный статус у разделов и узлов»
6. 1.3.3 (s-9g7jj8z4yf9kq93), text and reason
   - EN: "The specification, a section, a domain and a rule have" → "The specification, a section and a rule have"
   - RU: «Спецификация, раздел, домен или правило имеют» → «Спецификация, раздел или правило имеют»
   - EN: "A section or a domain is approved while" → "A section is approved while"
   - RU: «Раздел или домен одобрен, пока» → «Раздел одобрен, пока»
   - EN: "A section or a domain requires nothing of its own" → "A section requires nothing of its own"
   - RU: «Раздел или домен сам ничего не требует» → «Раздел сам ничего не требует»
7. 2.3, formerly 2.5 (s-u7tw6m8npxmv5tu), text
   - EN: "such as the specification's owners or the list of levels its domains stand at." → "such as the specification's owners."
   - RU: «например ответственные за спецификацию или список уровней, на которых стоят его домены.» → «например ответственные за спецификацию.»
8. 3.2 (s-ypa92gpcj3f5zj8), text and reason
   - EN: "Where a domain needs terms of its own" → "Where a section needs terms of its own"
   - RU: «Если домену необходимы собственные термины» → «Если разделу необходимы собственные термины»
   - EN: "Where a domain coins its own words" → "Where a section coins its own words"
   - RU: «Когда домен придумывает собственные слова» → «Когда раздел придумывает собственные слова»

## B. 3.1 (s-z6tq6a3btnvvwx7), changed in what it states

The owner ruled that contracts stay among the rules every project shares: a section of its own, and with several domains a separate document, which is for the extension to say. What this node says of a domain's API conventions, of contracts not being a domain, and of a domain describing its RecordTypes goes to the extension, and the separate document is the first change an extension makes to a shared rule.

Title
- EN: What the sections share is agreed in contracts
- RU: Общее для разделов согласуется в контрактах

Text
- EN:

  Contracts agrees what the sections of the specification share:

  - the terminology;
  - the rules that bind more than one section.

  What only one section needs, that section holds itself, except a term (§s-ypa92gpcj3f5zj8).

  Contracts exists where the rules of the specification share something, such as a term. It stands as a section of its own within the base specification. A specification with no term and nothing else shared needs none.

- RU:

  Контракты согласуют то, что у разделов спецификации общее:

  - терминологию;
  - правила, которые связывают больше одного раздела.

  То, что нужно только одному разделу, этот раздел держит сам, кроме термина (§s-ypa92gpcj3f5zj8).

  Контракты существуют там, где правила спецификации имеют что-то общее, например термин. Они являются отдельным разделом внутри базовой спецификации. Спецификации, в которой нет ни терминов, ни другого общего, они не нужны.

Reason
- EN:

  Sections that coin their own words stop understanding one another.

  Holding in contracts only what binds more than one section keeps contracts from answering for what a single section defines.

  Contracts exists only to agree what the parts of a specification share, so a specification with nothing shared has nothing to put in it.

- RU:

  Разделы, которые придумывают собственные слова, перестают понимать друг друга.

  Если держать в контрактах только то, что связывает больше одного раздела, контракты не отвечают за то, что определяет отдельный раздел.

  Контракты нужны только затем, чтобы согласовать общее для частей спецификации, поэтому спецификации, в которой общего нет, нечего в них вносить.

## C. New nodes, heading a new part of the guidelines on extensions

The owner's rulings: "extension of the guidelines" is the name; an extension is shipped with the plugin and brings the tools that carry it out; a project takes it only by its own choice; a rule every project shares names no extension in its text or reason, since an extension may vanish or be a draft, while links built by the tools are allowed; an extension may change a shared rule through a link of a type of its own, shown among the rule's incoming links as `exempts` is; a project's own guidelines may not, since a project cannot be sure of working tools. "Base rules of the guidelines" is not said, since the owner ruled out "the base of the guidelines" (it reads as the base specification); the agreed phrase is "the rules every project shares".

### C1. What an extension of the guidelines is

- EN text:

  An extension of the guidelines is a named set of rules beyond those every project shares. It is delivered with the SpecSheriff plugin, together with the tools that carry its rules out.

  A project uses an extension only by its own choice. It makes that choice by using what the extension describes.

- EN reason: Not every system needs every rule. Rules a project does not use only lengthen what its agent reads, so they are kept apart from the rules every project shares.
- RU title: Что такое расширение guidelines
- RU text:

  Расширение guidelines — это именованный набор правил сверх тех, что общие для всех проектов. Оно поставляется вместе с плагином SpecSheriff и с инструментами, которые выполняют его правила.

  Проект использует расширение только по своему выбору. Этот выбор он делает, используя то, что расширение описывает.

- RU reason: Не каждой системе нужны все правила. Правила, которыми проект не пользуется, только удлиняют то, что читает его агент, поэтому они отделены от правил, общих для всех проектов.

### C2. An extension may change a rule every project shares

- EN text:

  An extension may change a rule every project shares, where it needs to. Its node then holds a link of type `amends` to that rule. The tools show that link among the rule's incoming links.

  A project's own guidelines hold no such link.

- EN reason: An extension brings the tools that follow the change, so they keep working. A project cannot be sure of that, so it only refines or extends. The link lets whoever reads the changed rule see that it holds otherwise where the extension is used.
- RU title: Расширение может изменить правило, общее для всех проектов
- RU text:

  Расширение может изменить правило, общее для всех проектов, если это необходимо. Тогда его узел содержит связь типа `amends` к этому правилу. Инструменты показывают эту связь среди входящих связей правила.

  Собственные guidelines проекта такой связи не содержат.

- RU reason: Расширение приносит инструменты, которые следуют за изменением, поэтому они продолжают работать. Проект не может быть в этом уверен, поэтому он только уточняет или расширяет. Связь позволяет тому, кто читает изменённое правило, увидеть, что там, где используется расширение, оно действует иначе.

### C3. A rule every project shares names no extension

- EN text: The text and the reason of a rule every project shares name no extension and cite none of its nodes. The incoming links from an extension are built by the tools.
- EN reason: An extension may disappear or stand as a draft, so a rule depending on it in words would be left wrong. Links built by the tools follow what exists.
- RU title: Правило, общее для всех проектов, не называет расширений
- RU text: Текст и обоснование правила, общего для всех проектов, не называют расширений и не цитируют их узлы. Входящие связи от расширения строят инструменты.
- RU reason: Расширение может исчезнуть или быть черновиком, поэтому правило, которое зависит от него на словах, оказалось бы неверным. Связи, которые строят инструменты, следуют за тем, что есть.

## D. A new sentence of the principles

In `docs/principles.md`, section "Three documents, changing at three rates", after "...they hardly change over the project's life.":

- EN: Whatever prescribes how the system is organised belongs to the extensions of the guidelines, which a project uses only by its own choice.
