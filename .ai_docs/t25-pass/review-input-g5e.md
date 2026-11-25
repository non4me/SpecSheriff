# Group 5 drafts for the final review (generated 2026-11-24T21:34:28.460Z)

## What a RecordType variant must agree with | key s-c2r9jndrjbtbsv6 | sid s-c2r9jndrjbtbsv6 | tools 7.1.16

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` checks each RecordType variant (§s-z3dnru6qqdf9m6j) against its RecordType (§s-7vm323mhry2enx3).

`sheriff validate` treats as a RecordType variant each RecordType that names, in its `answersTo`, the values that it corresponds to. A RecordType variant's RecordType is the RecordType that has fields that select a variant and to which the RecordType variant has a `refines` link (§s-sn6au3vcr9uy5pm). The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it has no `chosenBy`, they are those named in the `chosenBy` of the RecordType that has a `chosenBy` and that it reaches through the fewest `refines` links.

The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The names of fields are compared character for character. Where no section holds a RecordType, the part of the specification that its location names (§s-kag2m9tzdnduxdx) is treated as its nearest section.

`sheriff validate` accepts a RecordType variant only where all of the following hold:

it has a `refines` link to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);

it is declared in the same section of the base specification (§s-5x737t9nee4zgaa) as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the RecordType variant is the nearest section that holds its RecordType;

it declares at least one field (§s-47q37qk27yvt3pa);

the name of each field that it declares differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType (§s-hrguxwcsdm57vxf);

the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);

each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);

its `answersTo` differs from the `answersTo` of every other RecordType variant of its RecordType (§s-5z8vjzmc3s983gk).

`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the RecordType variant fails. For the last condition, the refusal also names every other RecordType variant that has the same `answersTo`.

When `sheriff validate` validates the files against the schema of the specification, it refuses a RecordType variant whose `answersTo` gives a field more than one value (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).

Where a RecordType variant fails the first condition, `sheriff validate` checks it further only against the third condition, since each of the other conditions compares the RecordType variant with its RecordType.

Where a RecordType has no `chosenBy`, the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links may disagree on the fields that their `chosenBy` names. In that case, `sheriff validate` refuses every RecordType variant that refines the RecordType without a `chosenBy`, since each such RecordType variant fails the first condition. The refusal names each of those RecordTypes with a `chosenBy`.

`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).

### Reason

A data record holds the fields of its RecordType together with those of the RecordType variant that corresponds to the data record's values (§s-z3dnru6qqdf9m6j). Only where every RecordType variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).

### Examples

```json
[
  {
    "en": "The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines `message`, a fragment of a format that declares the field `text`. A RecordType variant in the same section as `notification` refines `notification`, names `email` as the value of `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another RecordType variant of `notification` names `sms` as the value of `channel` in its `answersTo` and declares `text`. `sheriff validate` refuses it, since `sms` is not a value of `channel` and `notification` takes `text` from `message`. The most likely mistake is to compare the names of a RecordType variant's fields only with those that `notification` declares in its own `schema`, which overlooks `text`.",
    "ru": "RecordType `notification` называет `channel` в своём `chosenBy`, и значения `channel` — `email` и `app`. Он уточняет `message` — фрагмент формата, который объявляет поле `text`. Вариант RecordType в том же разделе, что и `notification`, уточняет `notification`, называет в своём `answersTo` для `channel` значение `email` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант RecordType `notification` называет в своём `answersTo` для `channel` значение `sms` и объявляет `text`. `sheriff validate` отвергает его, потому что `sms` — не значение `channel`, а `notification` берёт `text` из `message`. Самая вероятная ошибка — сравнивать имена полей варианта RecordType только с теми, которые `notification` объявляет в своём собственном `schema`: так `text` будет пропущено."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-bmyzn6zuds6czqm"
  },
  {
    "type": "implements",
    "to": "s-vtpxwqe7ncmn5bz"
  },
  {
    "type": "implements",
    "to": "s-47q37qk27yvt3pa"
  },
  {
    "type": "implements",
    "to": "s-hrguxwcsdm57vxf"
  },
  {
    "type": "implements",
    "to": "s-swturmy7hmhfvt4"
  },
  {
    "type": "implements",
    "to": "s-27aycne77epeaq6"
  },
  {
    "type": "implements",
    "to": "s-5z8vjzmc3s983gk"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-z3dnru6qqdf9m6j"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-5nf87c3e3jg9v7c"
  },
  {
    "type": "cites",
    "to": "s-xzcw3hv4hmxz7h7"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  }
]
```

### The current node

Title: What a RecordType variant must agree with

`sheriff validate` checks that each RecordType variant agrees with the RecordType it refines, found by the variant's `refines` link:

- the fields the variant answers to are those the nearest RecordType up its `refines` links names as choosing it;
- each value it answers to is among the values of its choosing field, collected from the field's one source (§s-5nf87c3e3jg9v7c);
- the variant stands in the part of the specification where its value is declared (§s-xfwuvd3funutmsw);
- the variant declares at least one field that no RecordType up its `refines` links holds, the fields their fields of type `variant` hold included;
- at most one field of type `variant` stands along those links;
- no other variant of the same RecordType answers to the same values.

A variant failing any of these is refused.

Reason: (none)

## Where the values of a field with `enum` are collected from | key s-5nf87c3e3jg9v7c | sid s-5nf87c3e3jg9v7c | tools 7.1.18

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its source, which is exactly one of the following:

its own list, where the field's schema holds `enum`: the members of that `enum`, in their order;

the names of the parts of the base specification (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), where the field's `x-enumSource.from` is `parts`;

the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the parts of the base specification are the domains and the contracts section (§s-z6tq6a3btnvvwx7). The name of each such part is the name of its folder under `specs/` (§s-zefk589ykh37b8u), such as `contracts` or `requests`.

Otherwise, the parts of the base specification are the contracts section and the sections whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The contracts section is named `contracts`, after its folder, and each other part by its title.

`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from:

for a domain's name, the domain's header (§s-yggv9myedprnaa7);

for the name `contracts`, the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths;

for the title of a section, that section;

for a sid, the node whose sid it is.

`sheriff reindex` writes the values in the order of the nodes that they come from: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The SpecSheriff tools collect the values of a field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.

### Reason

A field's values are used by `sheriff reindex`, `sheriff validate`, the check of RecordType variants and `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine.

### Examples

```json
[
  {
    "en": "In a project that has chosen the Domains extension, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.",
    "ru": "В проекте, который выбрал расширение Domains, у RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Базовая спецификация хранится в `specs/contracts/`, `specs/requests/` и `specs/users/`. `sheriff reindex` записывает `contracts`, `requests` и `users` в `x-enumSource.gathered` этого поля. Вместе с `contracts` он записывает sid первого узла верхнего уровня первого файла `specs/contracts/`. Вместе с именем каждого домена он записывает sid заголовка этого домена. Самая вероятная ошибка — пропустить `contracts`: это часть базовой спецификации, хотя и не домен."
  },
  {
    "en": "In a project without the Domains extension, `specs/base/` holds the top-level sections titled “Requests” and “Users”, and `specs/contracts/` holds the section titled “Contracts”. The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The values of that field are “Requests”, “Users” and `contracts`, each with the sid of the node that it comes from. The most likely mistake is to take the title “Contracts” as a value in place of `contracts`.",
    "ru": "В проекте без расширения Domains в `specs/base/` находятся разделы верхнего уровня «Requests» и «Users», а в `specs/contracts/` — раздел «Contracts». У RecordType записи журнала аудита есть поле `part`, `x-enumSource.from` которого — `parts`. Значения этого поля — «Requests», «Users» и `contracts`, каждое вместе с sid узла, из которого оно приходит. Самая вероятная ошибка — взять значением название «Contracts» вместо `contracts`."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "implements",
    "to": "s-gqavjzcmubg5pvk"
  },
  {
    "type": "implements",
    "to": "s-mt6auv3jz8m5gzh"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-5fewsp22mmdz7y6"
  },
  {
    "type": "cites",
    "to": "s-tdm3rwsppnuh6dm"
  },
  {
    "type": "cites",
    "to": "s-z6tq6a3btnvvwx7"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-yggv9myedprnaa7"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-ju5vcanbjph7mgh"
  },
  {
    "type": "cites",
    "to": "s-ztseyetus7np6br"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-agc6fb3vx46pc23"
  },
  {
    "type": "cites",
    "to": "s-c2r9jndrjbtbsv6"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  }
]
```

### The current node

Title: Where the values of a field of type `one of` are collected

`sheriff validate` collects the values of each field of type `one of` from its one source (§s-xfu2gpzddjnmgks), which is one of these:

- its own list;
- the members of each `TextRule.list` a rule of a domain adds to it. Each such list is found through its rule's `refines` link, which leads to the RecordType of contracts holding the field. The list names that field (§s-gzfq3x8hesj227e);
- the names of the domains;
- the sids of the nodes of the NodeKind it names that stand in the base specification.

It refuses:

- a field holding no value;
- a value found in two lists that rules of domains add to the field;
- a domain's list whose rule refines no RecordType of contracts;
- a domain's list naming a field the RecordType its rule refines does not hold;
- a domain's list naming a field whose source is another;
- a NodeKind named that the schema does not hold.

Reason: (none)
