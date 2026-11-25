# Group 7 drafts for the review (generated 2026-11-25T12:20:52.348Z)

## Where the types and RuntimeChecks generated from the RecordTypes are written | key s-pvzms7d8kxb8dk2 | sid s-pvzms7d8kxb8dk2 | tools 17

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) only into the files that the technical appendix (§s-tj38pvm38nepaf5) lists for them.

The list of those files is the `TextRule.list` (§s-eferktypcj7njt5) of a rule in the section of the technical appendix on the stack (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). That rule is the one that has an `implements` link to the rule on generating the types and the RuntimeChecks (§s-e877bnfa559tvk9). Each member of the list is the path of a file relative to the root of the repository.

`sheriff types` reads the list in that rule's last approved wording (§s-a8fn72xa782wvbk). A rule that has never been approved lists no file. `sheriff types` takes the rule's `implements` links from where the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification.

The extension of a listed file's name determines what `sheriff types` writes into the file:

`.ts`: the types in TypeScript;

`.py`: the types in Python;

`.json`: the RuntimeChecks in JSON Schema 2020-12.

The check of generated copies refuses a list that names a file with any other ending, and any other defect that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).

The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion.

### Reason

Where the generated code goes is a choice that concerns the whole system. The section of the technical appendix on the stack makes that choice, in a list that the SpecSheriff tools read (§s-vj7ercem526zd6v).

### Examples

```json
[
  {
    "en": "The rule in the section on the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.",
    "ru": "Правило в разделе о стеке перечисляет `src/generated/records.ts` и `src/generated/records.schema.json`. `sheriff types` записывает типы RecordType в первый файл, а их RuntimeChecks — во второй. Участник команды добавляет в список `worker/records.py`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff types` ничего не записывает в `worker/records.py`. Самая вероятная ошибка — брать список из формулировки-черновика."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-hzuzn8hbq6q9q4s"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-vj7ercem526zd6v"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-dbk2vyeg8z5jxna"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  }
]
```

### The current node

Title: Where the types and RuntimeChecks generated from the RecordTypes are written

`sheriff types` writes the types and RuntimeChecks it generates from the RecordTypes into the files the project's technical appendix lists for them. Where the technical appendix defines no such list, `sheriff types` writes nothing.

The list of those files is defined in the rule that describes how the system generates its types and RuntimeChecks from its RecordTypes, as the rule on data structures requires (§s-e877bnfa559tvk9). That rule stands in the section of the technical appendix that describes the technologies the whole system is built with, the stack. Each path in the list is taken from the root of the repository.

A file's extension says what is written into it:

- `.ts`, the types in TypeScript;
- `.py`, the types in Python;
- `.json`, the RuntimeChecks in JSON Schema of draft 2020-12.

Those RuntimeChecks are run by the JSON Schema validator the technical appendix names. That validator asserts `format` rather than taking it as a note.

`sheriff binding` reads a file of types as the system's code even where the glob patterns naming where that code lives do not reach it.

Reason: Which files the generated types go to is a choice covering the whole system. Such choices are described in the stack section (§s-vj7ercem526zd6v). Defined as a list in one rule, those files are read by the tools rather than looked for in prose. The tools read the levels of the domains in the same way, from a list in the project's own guidelines.

The extension already says what a file holds. A validator taking `format` as a mere note would pass an instant that is no instant.

A project with no code yet has nowhere to write the types. Read as code, a file of types has its SpecTags read, so that each RecordType's `meta.code` names the types generated from it.

## The entry of the bindings file for a file of RuntimeChecks | key new:tools-17-bindings-entry | sid s-h5rfyy9j8nnhx62 | tools 17a (new, after “Where the types and RuntimeChecks generated from the RecordTypes are written”)

### Text

For each file of RuntimeChecks (§s-pvzms7d8kxb8dk2), `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType (§s-7vm323mhry2enx3) whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.

`sheriff types` writes that entry where the bindings file lacks it or holds a different value for that path. It leaves any other entry as it is. When it writes the entry, it names the bindings file.

`sheriff types` writes a file of RuntimeChecks, and its entry, only where the file holds at least one definition.

### Reason

Each file that `sheriff types` writes is bound to the RecordTypes that it comes from (§s-ktfstpv8rurznrp), so the RuntimeChecks can be found from each RecordType, as its types can.

### Examples

```json
[
  {
    "en": "The rule in the section on the stack lists `src/generated/records.schema.json`, which holds the definitions of the RecordTypes `user` and `request`, in that order. `sheriff types` keeps in the bindings file the entry for `src/generated/records.schema.json`, whose value lists the SpecTag of `user` and then that of `request`. The most likely mistake is to leave the file of RuntimeChecks without an entry, so it is bound to no RecordType.",
    "ru": "Правило в разделе о стеке перечисляет `src/generated/records.schema.json`, который содержит определения RecordType `user` и `request`, в этом порядке. `sheriff types` ведёт в файле привязок запись для `src/generated/records.schema.json`, значение которой перечисляет SpecTag `user`, а затем SpecTag `request`. Самая вероятная ошибка — оставить файл RuntimeChecks без записи: тогда он не привязан ни к одному RecordType."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-ktfstpv8rurznrp"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-kgbzk2ph9e6jfb4"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  }
]
```

### The current node

(none: this node is new)

## What is generated from a RecordType | key s-suv42g8r3ra2h6b | sid s-suv42g8r3ra2h6b | tools 18

### Text

From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w).

The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word changed to uppercase and the spaces removed.

Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).

A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.

The fields of a type and of a definition are, first, the fields of each RecordType that the type's RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools follow the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take no RecordType twice.

Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field's schema in a definition is an `allOf` that holds their schemas in the order in which they are taken. In a type, the field has the type that the last of these schemas gives (§s-4npdup7mjkva69y). A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.

A definition is the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type given by a field's schema says (§s-4npdup7mjkva69y). Where a RecordType has RecordType variants (§s-z3dnru6qqdf9m6j), the node on such a RecordType (§s-nk8td3ez58gahc4) says what `sheriff types` generates for it and for each of its variants in place of, or in addition to, what this node says.

In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.

In Python:

a type is written `<name> = TypedDict("<name>", {...})`;

each name that a type uses from `typing` is imported from `typing`;

a reference to another type is written as a string;

an optional field is marked `NotRequired`.

`sheriff types` cannot generate the name of a type or of a definition in any of these cases (§s-dbk2vyeg8z5jxna):

the name is not an identifier in the language of its file;

the file already uses the name, including the names that the file imports and those that its language reserves;

a `$ref` names a sid that no RecordType has, so the type that the `$ref` refers to has no name.

### Reason

Generated in one fixed way, the types and the definitions come out the same at every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.

### Examples

```json
[
  {
    "en": "The fragment of a format `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the type that `user` gives it, and then `name`. The definition `User` checks `street` against the schemas of both RecordTypes. The most likely mistake is to write `street` twice in the type, once for each RecordType, which TypeScript refuses to compile.",
    "ru": "Фрагмент формата `address` объявляет поля `city` и `street`. RecordType `user` уточняет `address` и объявляет `name` и `street`, с более узкой схемой для `street`. Тип `User` содержит `city`, затем `street` с типом, который даёт ему `user`, а затем `name`. Определение `User` проверяет `street` по схемам обоих RecordType. Самая вероятная ошибка — записать `street` в тип дважды, по разу от каждого RecordType: такой тип TypeScript не компилирует."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "implements",
    "to": "s-ktfstpv8rurznrp"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-ygg5kpcxgzq3m7w"
  },
  {
    "type": "cites",
    "to": "s-5z5gnu7pahr82xp"
  },
  {
    "type": "cites",
    "to": "s-33fw3ga4ctd94dq"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
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
    "to": "s-adhmw4gw6y82f44"
  },
  {
    "type": "cites",
    "to": "s-nk8td3ez58gahc4"
  },
  {
    "type": "cites",
    "to": "s-dbk2vyeg8z5jxna"
  },
  {
    "type": "cites",
    "to": "s-z3dnru6qqdf9m6j"
  }
]
```

### The current node

Title: What a RecordType generates

From each RecordType, `sheriff types` writes a type into each file of types and a definition under `$defs` into each file of RuntimeChecks. It takes the nodes in the order the specification reads:

- its files in the code-point order of their paths;
- the nodes of each file in the order they stand.

Every type and definition is named by the RecordType's name with the first letter of each word raised and the spaces dropped. Each type carries a SpecTag with the sid of its RecordType, as a symbol of code carries one with the rule it implements (§s-5z5gnu7pahr82xp).

A type and a definition hold, in this order:

- the fields of every RecordType above the node along its `refines` links, the topmost first;
- the node's own fields.

A variant's own fields stand instead where the rule on RecordType variants places them (§s-nk8td3ez58gahc4).

Each field keeps its name and the order its node gives it. It is required where its node says so and optional otherwise.

A field of type `record` refers to the type of that RecordType by its name. The object of a field of type `variant` is written out in full. Where the RecordType refuses a field nobody declared, its definition refuses any property its fields do not declare.

A name cannot be generated where:

- it is not an identifier in the language of its file;
- the file already uses it, the names the file imports and those its language builds in included.

In TypeScript a type is written `export type <name> = {...}`.

In Python:

- a type is written `<name> = TypedDict("<name>", {...})`;
- every name a type uses is imported from `typing`;
- a reference to another type is written as a string;
- an optional field is marked `NotRequired`;
- the object of a field of type `variant` is given a type of its own.

That type of its own is named by the type it stands in followed by the field's name with its first letter raised. It carries a SpecTag with the same sid.

Reason: One name in every file lets a reader follow a RecordType from its node to each copy. A fixed order makes each file come out the same at every run, which the comparison of generated copies needs. The generator writes the SpecTag itself, so that the binding of each type to its node is made anew with the type and never kept by hand.

A RecordType that refines another holds that one's fields, as the schema of the nodes says. A field keeps the name its node gives because the code uses that name as it stands.

Only a RuntimeCheck can refuse an undeclared property. A type in TypeScript or Python cannot.

A name the file already uses would break its compilation or hide what it imports.

The functional form of `TypedDict` takes any field name, a keyword of Python included. A reference written as a string may name a type written later in the file, or the type itself. Python can name the object of a field only by a type of its own.

## Generated copies checked against their nodes | key proposal:s-dbk2vyeg8z5jxna-g7 | sid s-dbk2vyeg8z5jxna | tools 7.2.8

### Text

`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, `sheriff binding` also refuses the commit. Each refusal names the file and says that running `sheriff types` generates it.

`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-h5rfyy9j8nnhx62), or holds a different value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.

`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.

While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of these commits holds is also treated as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run of the generator, `sheriff binding` refuses the generator in the same way.

`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):

a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;

a file in that list whose path leads outside the repository;

a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack, that lists such files;

the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);

a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.

Each of these refusals names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

### Reason

A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

### Examples

```json
[
  {
    "en": "A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A developer edits `src/types.ts` by hand to match the new wording and commits it. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.",
    "ru": "RecordType переформулируют, и он становится черновиком, а типы, порождённые из него, остаются такими, какими их даёт его последняя одобренная формулировка. Разработчик вручную меняет `src/types.ts` под новую формулировку и делает коммит. `sheriff binding` отвергает `src/types.ts`, потому что его текст отличается от того, что даёт последняя одобренная формулировка. Самая вероятная ошибка — порождать типы из формулировки-черновика: тогда изменённый файл проходит."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-dwxjxb7rw4w5yn3"
  },
  {
    "type": "implements",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-qyjw8xez6t6adc3"
  },
  {
    "type": "cites",
    "to": "s-y5yk7eu6h4zrjpr"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-e877bnfa559tvk9"
  },
  {
    "type": "cites",
    "to": "s-7vm323mhry2enx3"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-suv42g8r3ra2h6b"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-kh8qcd5kxgh9z3j"
  },
  {
    "type": "cites",
    "to": "s-2x58az67bm6cxq2"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  },
  {
    "type": "cites",
    "to": "s-h5rfyy9j8nnhx62"
  }
]
```

### The wording the owner agreed to (s-dbk2vyeg8z5jxna)

Title: Generated copies checked against their nodes

`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, `sheriff binding` also refuses the commit. Each refusal names the file and says that running `sheriff types` generates it.

`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.

While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of the two commits holds also counts as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run of the generator, `sheriff binding` refuses the generator in the same way.

`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):

a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;

a file in that list whose path leads outside the repository;

a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack, that lists such files;

the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);

a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.

Each of these refusals names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

Reason: A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

## Project-wide settings | key proposal:new-tools-1-settings-g7 | sid undefined | tools 2 (new, after "Where the files are")

### Text

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:

the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;

for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);

the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);

the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);

the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:

the files that match the glob patterns for code or for tests in `sheriff.config.json`;

the files into which `sheriff types` writes the types and the RuntimeChecks (§s-pvzms7d8kxb8dk2);

the bindings file (§s-trwczfskj5zmuft).

A file that matches both a pattern for code and a pattern for tests is read as a test.

### Reason

A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-q3pfzyaxvpr2zj2"
  },
  {
    "type": "implements",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "implements",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-utf4mbt7ref8g9c"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-477gtdrkw34dzxw"
  },
  {
    "type": "cites",
    "to": "s-xr5xxa9cxf2mq5u"
  },
  {
    "type": "cites",
    "to": "s-8xw4mgvpexyvw5q"
  },
  {
    "type": "cites",
    "to": "s-pvzms7d8kxb8dk2"
  },
  {
    "type": "cites",
    "to": "s-trwczfskj5zmuft"
  }
]
```

### The wording the owner agreed to (proposal:new-tools-1-settings-g3)

Title: Project-wide settings

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:

the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;

for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);

the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);

the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);

the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:

the files that match the glob patterns for code or for tests in `sheriff.config.json`;

the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2);

the bindings file (§s-trwczfskj5zmuft).

A file that matches both a pattern for code and a pattern for tests is read as a test.

Reason: A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.

## The review of a commit | key proposal:s-vp24dqydygztqbt-g7 | sid s-vp24dqydygztqbt | tools 7.3.4

### Text

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` generates (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

### Reason

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

### Examples

```json
[
  {
    "en": "A commit changes only the wording of a draft rule. It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.",
    "ru": "Коммит меняет только формулировку правила-черновика. Он не меняет ни кода, ни комментариев в коде, его сообщение не содержит утверждения, что реализацию правила менять не нужно, и он не одобряет ни одного узла. Поэтому `sheriff review` не запускает рецензента, и коммит проходит ревью. Самая вероятная ошибка — запускать рецензента при каждом коммите: тогда тот, кто делает коммит, платит за запуск, которому нечего судить.",
    "change": "Было: «It changes no code, …». Добавлено «and no comment in the code»: суждение о комментарии — четвёртое основание запустить рецензента."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "implements",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "cites",
    "to": "s-68ds99w8wd67aae"
  },
  {
    "type": "cites",
    "to": "s-rd9nftptjuz6bwv"
  },
  {
    "type": "cites",
    "to": "s-kgqxg4gunzynwsv"
  },
  {
    "type": "cites",
    "to": "s-tj38pvm38nepaf5"
  },
  {
    "type": "cites",
    "to": "s-4bwa4zepd4nwcv8"
  },
  {
    "type": "cites",
    "to": "s-a8fn72xa782wvbk"
  },
  {
    "type": "cites",
    "to": "s-tnz9zgqx8c629a7"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  },
  {
    "type": "cites",
    "to": "s-7vpsdsy8dpqdy6r"
  }
]
```

### The wording the owner agreed to (proposal:s-vp24dqydygztqbt)

Title: The review of a commit

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):

the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);

the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);

the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);

the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

Reason: Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.
