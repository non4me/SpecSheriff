# Group 7 drafts for the review (generated 2026-11-25T11:46:52.518Z)

## Where the types and RuntimeChecks generated from the RecordTypes are written | key s-pvzms7d8kxb8dk2 | sid s-pvzms7d8kxb8dk2 | tools 17

### Text

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) into the files that the technical appendix lists for them. Where the technical appendix lists no such file, `sheriff types` writes no types and no RuntimeChecks.

The list of those files is the `TextRule.list` (§s-eferktypcj7njt5) of a rule in the section of the technical appendix on the stack (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). That rule is the one that has an `implements` link to the rule on generating the types and the RuntimeChecks (§s-e877bnfa559tvk9). Each member of the list is the path of a file relative to the root of the repository.

`sheriff types` reads that rule as the SpecSheriff tools read a rule of the project's own guidelines (§s-t9j29hppag2nren), with its `implements` link in place of a `refines` link. So it reads the list in the rule's last approved wording (§s-a8fn72xa782wvbk), and a rule that has never been approved lists no file.

The end of a listed file's name says what `sheriff types` writes into the file:

`.ts`: the types in TypeScript;

`.py`: the types in Python;

`.json`: the RuntimeChecks in JSON Schema 2020-12.

The check of generated copies refuses a list that names any other file, and each other defect that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).

The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion, not only as an annotation.

For each file of RuntimeChecks, `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.

`sheriff types` writes that entry where the bindings file lacks it or holds another value for that path. It changes no other entry, and names the bindings file where it writes it.

### Reason

Where the generated code goes is a choice that concerns the whole system. The section of the technical appendix on the stack makes that choice, in a list that the SpecSheriff tools read (§s-vj7ercem526zd6v). Each file that `sheriff types` writes is bound to the RecordTypes that it comes from (§s-ktfstpv8rurznrp), so the RuntimeChecks are found from each RecordType, as its types are.

### Examples

```json
[
  {
    "en": "The rule of the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. It keeps in the bindings file the entry for `src/generated/records.schema.json`, with the SpecTag of each RecordType. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.",
    "ru": "Правило стека перечисляет `src/generated/records.ts` и `src/generated/records.schema.json`. `sheriff types` записывает типы RecordType в первый файл, а их RuntimeChecks — во второй. Он ведёт в файле привязок запись для `src/generated/records.schema.json` с SpecTag каждого RecordType. Участник команды добавляет в список `worker/records.py`, и правило становится черновиком. Пока новую формулировку не одобрят, `sheriff types` ничего не записывает в `worker/records.py`. Самая вероятная ошибка — брать список из формулировки-черновика."
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
    "to": "s-suv42g8r3ra2h6b"
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

## What a RecordType generates | key s-suv42g8r3ra2h6b | sid s-suv42g8r3ra2h6b | tools 18

### Text

From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word turned to uppercase and the spaces removed.

Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).

A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.

The fields of a type and of a definition are, first, the fields of each RecordType that the RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools go through the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take no RecordType twice.

Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field has the schema that the last of them gives. A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.

A definition is the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type that the schema of a field gives says (§s-4npdup7mjkva69y). A RecordType of which RecordType variants exist generates, in addition, what the node on such a RecordType says (§s-nk8td3ez58gahc4).

In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.

In Python:

a type is written `<name> = TypedDict("<name>", {...})`;

each name that a type uses from `typing` is imported from `typing`;

a reference to another type is written as a string;

an optional field is marked `NotRequired`.

`sheriff types` cannot generate the name of a type or of a definition in each of these cases (§s-dbk2vyeg8z5jxna):

the name is not an identifier in the language of its file;

the file already uses the name, including the names that the file imports and those that its language reserves;

the name is that of the type that a `$ref` names, and no RecordType has the sid that the `$ref` names.

### Reason

Generated in one fixed way, the types and the definitions come out the same at every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.

### Examples

```json
[
  {
    "en": "The fragment of a format `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the schema that `user` gives, and then `name`. The most likely mistake is to write `street` twice, once for each RecordType, which TypeScript refuses to compile.",
    "ru": "Фрагмент формата `address` объявляет поля `city` и `street`. RecordType `user` уточняет `address` и объявляет `name` и `street`, с более узкой схемой для `street`. Тип `User` содержит `city`, затем `street` со схемой, которую даёт `user`, а затем `name`. Самая вероятная ошибка — записать `street` дважды, по разу от каждого RecordType: такой тип TypeScript не компилирует."
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

`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-pvzms7d8kxb8dk2), or holds another value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.

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

## What `sheriff reindex` changes in what an earlier release wrote | key proposal:s-gb8s9657a65hqmv-g7 | sid s-gb8s9657a65hqmv | tools 2.3 (new)

### Text

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive (§s-f2b5zvc565s242f), it makes the following changes:

a node's key `id` becomes `location`;

a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`;

the kind of node `rule` becomes `TextRule`;

the kind of node `domain` becomes `header`;

a node's status `""` becomes `draft`;

a node's status `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:

the schema holds `"type": "object"`, unless the RecordType is a RecordType variant (§s-z3dnru6qqdf9m6j);

each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);

the field's `text` becomes the property's `description`;

each field that the RecordType marks as required is listed in the schema's `required`;

a field that is required only "where it holds a value" becomes an optional property;

`unknown: "refused"` becomes `unevaluatedProperties: false`, and a RecordType variant loses its `unknown`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` (§s-eferktypcj7njt5) is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys.

The name of a kind of node is also changed in each of these places:

the source of a field's values, where those values are the sids of that kind's nodes;

the `fields` of the project's extension of the schema, where the name is the key under which those `fields` add properties to that kind.

A bare sid is a word that has the form of a sid and meets one of these conditions:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of a test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;

the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with `owner` renamed to `by`, are appended to it, and `specs/_confirmations.jsonl` is removed;

where `sheriff.config.json` holds no entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification (§s-d3nkw9b6mn98vuw);

the entry that approves the specification names the owner who last approved the rule that the entry replaces;

the rule that the entry replaces is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the reason "The specification's approval status is recorded in `sheriff.config.json`" if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);

in a run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left with no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has not chosen that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

When `sheriff reindex` adds the draft rule on when the tests run, it names that rule, since the SpecSheriff tools read the rule only after an owner approves it (§s-t9j29hppag2nren).

A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).

`sheriff reindex` names each file that it rewrites because an earlier release wrote or read that file differently, including the files of the specification.

### Reason

Each file and each test of a project follows the form used by the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them in a different form rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

### Examples

```json
[
  {
    "en": "In a project that an earlier release set up, the only rule of `project.json` is an approved rule that refines the rule on the specification's approval status. `sheriff reindex` replaces that rule with an entry that approves the specification and, in the same run, adds the draft rule on when the tests run. The most likely mistake is to add that draft rule again in a later run, after the project has deleted it.",
    "ru": "В проекте, который настроил прежний выпуск, единственное правило `project.json` — одобренное правило, которое уточняет правило о статусе одобрения спецификации. `sheriff reindex` заменяет это правило записью, которая одобряет спецификацию, и в том же запуске добавляет черновик правила о том, когда запускаются тесты. Самая вероятная ошибка — добавить этот черновик снова в одном из следующих запусков, после того как проект его удалил.",
    "change": "Новое: у согласованной формулировки примеров не было. Пример показывает запуск, в котором добавляется черновик правила о том, когда запускаются тесты, и ошибку — добавить его снова, после того как проект его удалил."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "implements",
    "to": "s-jsqxdx47wkkj7gp"
  },
  {
    "type": "implements",
    "to": "s-qzthyh7yqvfhsa2"
  },
  {
    "type": "implements",
    "to": "s-f2b5zvc565s242f"
  },
  {
    "type": "implements",
    "to": "s-5ah25f6gy99panq"
  },
  {
    "type": "cites",
    "to": "s-w5wg69pvvhedsws"
  },
  {
    "type": "cites",
    "to": "s-6eb92ddch7shuvu"
  },
  {
    "type": "cites",
    "to": "s-xfu2gpzddjnmgks"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-zefk589ykh37b8u"
  },
  {
    "type": "cites",
    "to": "s-9ttvcwpqkehm58g"
  },
  {
    "type": "cites",
    "to": "s-v4qus7raqnwzneb"
  },
  {
    "type": "cites",
    "to": "s-4npdup7mjkva69y"
  },
  {
    "type": "cites",
    "to": "s-bpdqd9v72wg7vsz"
  },
  {
    "type": "cites",
    "to": "s-xm8rz4uupb73gu5"
  },
  {
    "type": "cites",
    "to": "s-mbmnsnxenmavu3z"
  },
  {
    "type": "cites",
    "to": "s-x8uzc8z44pwtd3h"
  },
  {
    "type": "cites",
    "to": "s-7unxytshhc4md54"
  },
  {
    "type": "cites",
    "to": "s-t9j29hppag2nren"
  },
  {
    "type": "cites",
    "to": "s-f5brvuuu6xmkj6t"
  },
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
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
    "to": "s-eferktypcj7njt5"
  },
  {
    "type": "cites",
    "to": "s-d3nkw9b6mn98vuw"
  },
  {
    "type": "cites",
    "to": "s-z3dnru6qqdf9m6j"
  }
]
```

### The wording the owner agreed to (proposal:s-gb8s9657a65hqmv-g6)

Title: What `sheriff reindex` changes in what an earlier release wrote

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive (§s-f2b5zvc565s242f), it makes the following changes:

a node's key `id` becomes `location`;

a node's key `rationale` becomes `reason`;

the kinds of node `record` and `recordType` become `RecordType`;

the kind of node `rule` becomes `TextRule`;

the kind of node `domain` becomes `header`;

a node's status `""` becomes `draft`;

a node's status `checked` becomes `approved`;

a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;

a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:

each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);

the field's `text` becomes the property's `description`;

each field that the RecordType marks as required is listed in the schema's `required`;

a field that is required only "where it holds a value" becomes an optional property;

`unknown: "refused"` becomes `additionalProperties: false`;

the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);

`TextRule.list.declaredIn` (§s-eferktypcj7njt5) is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);

`TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;

`TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;

a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);

a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys.

The name of a kind of node is also changed in each of these places:

the source of a field's values, where those values are the sids of that kind's nodes;

the `fields` of the project's extension of the schema, where the name is the key under which those `fields` add properties to that kind.

A bare sid is a word that has the form of a sid and meets one of these conditions:

it opens a test's name, followed by a space or by the end of the name;

it is the only argument of a test's mark.

`sheriff reindex` also makes the following changes:

`specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;

the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;

where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with `owner` renamed to `by`, are appended to it, and `specs/_confirmations.jsonl` is removed;

where `sheriff.config.json` holds no entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification (§s-d3nkw9b6mn98vuw);

the entry that approves the specification names the owner who last approved the rule that the entry replaces;

the rule that the entry replaces is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";

where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the reason "The specification's approval status is recorded in `sheriff.config.json`" if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);

in a run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left with no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;

the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;

in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has not chosen that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

When `sheriff reindex` adds the draft rule on when the tests run, it names that rule, since the SpecSheriff tools read the rule only after an owner approves it (§s-t9j29hppag2nren).

A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).

`sheriff reindex` names each file that it rewrites because an earlier release wrote or read that file differently, including the files of the specification.

Reason: Each file and each test of a project follows the form used by the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them in a different form rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.
