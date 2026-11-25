# Group 5 drafts for review (generated 2026-11-24T20:03:26.301Z)

## What a RecordType variant must agree with | key s-c2r9jndrjbtbsv6 | sid s-c2r9jndrjbtbsv6 | tools 7.1.16

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a RecordType variant (§s-z3dnru6qqdf9m6j) only where all of the following hold:

it has a `refines` link (§s-sn6au3vcr9uy5pm) to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);

it is declared in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the variant is the nearest section that holds its RecordType;

it declares at least one field (§s-47q37qk27yvt3pa);

the name of each field that it declares differs from the name of every field of its RecordType (§s-hrguxwcsdm57vxf);

the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);

each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);

its `answersTo` differs from the `answersTo` of every other variant of its RecordType (§s-5z8vjzmc3s983gk).

`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the variant fails. For the last condition, it also names each other variant with the same `answersTo`.

A variant that fails the first condition is refused for that reason alone, since each of the other conditions compares the variant with its RecordType.

A RecordType variant is a RecordType that names, in its `answersTo`, the values that it corresponds to (§s-z3dnru6qqdf9m6j). A variant's RecordType is the RecordType that has fields that select a variant and to which the variant has a `refines` link. The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it names none, they are those that the nearest RecordType up its `refines` links names in its `chosenBy`.

The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The fields of a RecordType are those that it declares and those that it takes through `refines` from another RecordType. The names of fields are compared character for character. Where no section holds a RecordType, the part of the base specification that holds it (§s-kag2m9tzdnduxdx) is treated as its nearest section.

`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).

### Reason

A data record holds the fields of its RecordType together with those of the variant whose values it holds (§s-z3dnru6qqdf9m6j). Only where every variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).

### Examples

```json
[
  {
    "en": "The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines the fragment of a format `message`, which declares the field `text`. A variant in the same section refines `notification`, names `email` for `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another variant names `sms` for `channel` and declares `text`, and `sheriff validate` refuses it for both reasons. The most likely mistake is to compare the names of a variant's fields only with those that `notification` declares itself, which misses `text`.",
    "ru": "RecordType `notification` называет `channel` в своём `chosenBy`, и значения `channel` — `email` и `app`. Он уточняет фрагмент формата `message`, который объявляет поле `text`. Вариант в том же разделе уточняет `notification`, называет в своём `answersTo` для `channel` значение `email` и объявляет `address`, и `sheriff validate` его принимает. Другой вариант называет для `channel` значение `sms` и объявляет `text`, и `sheriff validate` отвергает его по обеим причинам. Самая вероятная ошибка — сравнивать имена полей варианта только с теми, которые `notification` объявляет сам: так `text` будет пропущено."
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
    "to": "s-5nf87c3e3jg9v7c"
  },
  {
    "type": "cites",
    "to": "s-kag2m9tzdnduxdx"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
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
