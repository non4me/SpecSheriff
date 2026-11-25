# Group 5 drafts for review (generated 2026-11-24T20:03:26.175Z)

## Domains that use one another in a cycle | key s-vuujweu57sxsa58 | sid s-vuujweu57sxsa58 | tools 7.1.13

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` refuses the change where the domains use one another in a cycle (§s-bncp7gtyaukur8e). The refusal names the domains of one such cycle, in the order in which each uses the next.

A domain uses another domain where its header (§s-yggv9myedprnaa7) has a `consumes` link to a section of the other domain. Only a link that the check of `consumes` links accepts is counted (§s-p3n666zfjdrrw6a). The domains use one another in a cycle where a chain of domains, each of which uses the next, leads back to its first domain.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-bncp7gtyaukur8e).

### Reason

Only the `consumes` links of the domains' headers state which domain uses which (§s-yggv9myedprnaa7). A node that relies on what another domain states has a link of any type to that domain's node (§s-hr7j7scmfkkjnws). So a check that followed those links would refuse domains that do not use one another.

### Examples

```json
[
  {
    "en": "The header of the domain `requests` has a `consumes` link to a section of the domain `users`. The header of `users` has such a link to a section of `requests`. `sheriff validate` refuses the change and names `requests` and `users`. In another project, only the header of `requests` has such a link, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts both domains. The most likely mistake is to treat that citation as a use of `requests` by `users`.",
    "ru": "У заголовка домена `requests` есть связь `consumes` с разделом домена `users`. У заголовка `users` есть такая связь с разделом `requests`. `sheriff validate` отвергает изменение и называет `requests` и `users`. В другом проекте такая связь есть только у заголовка `requests`, а правило `users` ссылается на правило `requests`. Там `sheriff validate` принимает оба домена. Самая вероятная ошибка — считать эту ссылку тем, что `users` использует `requests`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-bncp7gtyaukur8e"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-p3n666zfjdrrw6a"
  },
  {
    "type": "cites",
    "to": "s-hr7j7scmfkkjnws"
  }
]
```

### The current node

Title: No circular dependency between the domains

`sheriff validate` walks the domains along the `consumes` links, from each domain's header to the domains whose sections it names. Where the walk comes back to a domain it has already passed, the check refuses the change. It names the domains along that circle.

Reason: (none)

## Sections of the technical appendix matched to the domains | key s-gvafe6bnstwab8b | sid s-gvafe6bnstwab8b | tools 7.1.22

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a JSON file under `specs/tech/` only where it is one of the following (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):

`specs/tech/stack.json` or `specs/tech/debt.json`;

a file named after a domain, `specs/tech/<domain>.json`, where `<domain>` is the name of a domain.

`sheriff validate` refuses any other file of the technical appendix (§s-tj38pvm38nepaf5), naming the file.

In a file named after a domain, `sheriff validate` accepts each section below the file's first top-level node only where the same titles lead to a section of that domain (§s-vghy37e3p2325ah). The titles that lead to a section are those of the sections that hold it, from the top down, followed by the section's own title. `sheriff validate` refuses any other section of the file, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title.

The first top-level node of a file named after a domain represents the domain itself, so the titles that lead to a section of that file start below that node. Each further top-level node of the file is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w). In the domain, the titles that lead to a section start at a section that is a top-level node of one of the domain's files or a child of the domain's header (§s-yggv9myedprnaa7).

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-vghy37e3p2325ah).

### Reason

A reader looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain. There the reader follows the same titles that lead to the rule in the domain (§s-vj7ercem526zd6v). A section of that file that matches no section of the domain holds an implementation that such a reader does not find.

### Examples

```json
[
  {
    "en": "The domain `requests` has a section titled “Intake”, which holds a section titled “Validation”. In `specs/tech/requests.json`, the file's first top-level node holds a section titled “Intake”, which holds a section titled “Validation”, and `sheriff validate` accepts both. Another section titled “Validation” is directly under the file's first top-level node, and `sheriff validate` refuses it. The most likely mistake is to accept that section because the domain has a section titled “Validation”, although that section is under “Intake”.",
    "ru": "У домена `requests` есть раздел «Intake», который содержит раздел «Validation». В `specs/tech/requests.json` первый узел верхнего уровня файла содержит раздел «Intake», а тот — раздел «Validation», и `sheriff validate` принимает оба. Ещё один раздел «Validation» находится прямо под первым узлом верхнего уровня файла, и `sheriff validate` его отвергает. Самая вероятная ошибка — принять этот раздел потому, что в домене есть раздел «Validation», хотя тот находится под «Intake»."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-vghy37e3p2325ah"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-vj7ercem526zd6v"
  }
]
```

### The current node

Title: A file of the technical appendix named after a domain

`sheriff validate` looks up among the domains the name of each file of the technical appendix but `stack.json` and `debt.json`.

Reason: (none)

## The level in a domain's header | key s-uxmkwbnpgtjzkgv | sid s-uxmkwbnpgtjzkgv | tools 7.1.15

### Text

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts the level that a domain's header (§s-yggv9myedprnaa7) contains only where the project's own guidelines (§s-u7tw6m8npxmv5tu) list that level (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). A header contains its level in its `level`.

`sheriff validate` refuses any other header that contains a level, naming the header by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the level. A header that contains no level passes this check.

The SpecSheriff tools read those levels in the last approved wording of each rule of `project.json` (§s-zefk589ykh37b8u) with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on a domain's level (§s-nkyty4dy9x2v2a4). A draft rule is not implemented (§s-utvqbypzhmgndug), so a level that only a draft wording adds is listed only after that wording is approved.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-j3v4y4d3sbmdgfp).

### Reason

The diagram of the domains places each domain in the row of its level (§s-4azsb49pj6sech8). The order of the levels in their list sets the order of the rows (§s-nkyty4dy9x2v2a4). So a level outside that list has no row.

### Examples

```json
[
  {
    "en": "An approved rule of `project.json` refines the rule on a domain's level and lists `core` and `edge`. A team member adds `platform` to its list, so the rule becomes a draft. Until the new wording is approved, `sheriff validate` refuses each header that contains `platform`, naming `platform`. The most likely mistake is to read the list in the draft wording.",
    "ru": "Одобренное правило `project.json` уточняет правило об уровне домена и перечисляет `core` и `edge`. Участник команды добавляет в его перечень `platform`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff validate` отвергает каждый заголовок, который содержит `platform`, и называет `platform`. Самая вероятная ошибка — читать перечень в формулировке-черновике."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-j3v4y4d3sbmdgfp"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  },
  {
    "type": "cites",
    "to": "s-nkyty4dy9x2v2a4"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-utvqbypzhmgndug"
  },
  {
    "type": "cites",
    "to": "s-4azsb49pj6sech8"
  }
]
```

### The current node

Title: A header's level

`sheriff validate` looks up the level each header names in the list the project's own guidelines hold.

Reason: (none)
