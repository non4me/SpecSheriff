# T25, group 7, round d: the English sentences that round d changes

This file holds only the English sentences, and the rows of a table, that round d adds or changes in the drafts of group 7, as `tools-drafts.json` holds them after fix-group7-d.mjs. Each is given under the key of its draft in `tools-drafts.json` and the title of that draft, with the part of the node that holds it.
fix-group7-d.mjs writes this file; edit the script, not this file.

## new:tools-5-export — Writing the human-readable export

- Reason: The export is written anew from the nodes on every run and kept out of git, so it never becomes a second copy of the specification that a commit could change (§s-kh8qcd5kxgh9z3j).

## s-rpv4fkdqqguptqd — Building the map

- Text: Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch `Base specification` holds the domains row by row, from the top row of the diagram of the domains (§s-jzm6qw992j3bnxt) to its row `No level`.
- Text: It holds the domains of each row in the order in which the diagram places them.

## s-pvzms7d8kxb8dk2 — Where the types and RuntimeChecks generated from the RecordTypes are written

- Text: `sheriff types` takes the rule's `implements` links from the same source as the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification.
- Text: The check of generated copies refuses a list that names a file whose name has any other extension, and any other fault that keeps `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna).
- Reason: Where the generated code goes is a choice that concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu).

## s-suv42g8r3ra2h6b — What is generated from a RecordType

- Text: A definition is built from the RecordType's own `schema`.
- Text: In the definition, `properties` holds these fields and `required` lists the guaranteed ones.
- Reason: Generated in one fixed way, the types and the definitions come out the same on every run and on every machine.

## s-4npdup7mjkva69y — The type that the schema of a field gives

- Text: | `{"type": [<its types>]}` | the union of the types that the schema would give if each of its types in turn replaced the list | `Union[<those types>]` | — |
- Text: | `{"type": "integer"}`, with any bounds | `number` | `int` | whole number |
- Text: | `{"type": "number"}`, with any bounds | `number` | `float` | number |
- Text: | `{"type": "array", "items": <its members' schema>}`, with any bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
- Text: In Python, `Literal` can hold only a string, a whole number, `true`, `false` or `null`, so a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`.
- Text: A field of that `TypedDict` is required where the `required` of any member of the `allOf` lists it.
- Reason: Therefore, a field's schema serves as its RuntimeCheck, which checks in the same way in every language what a type in TypeScript or Python cannot state, such as a bound or a format.
- Reason: Therefore, a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.

## new:tools-17-validator — The validator of the RuntimeChecks

- Text: The JSON Schema validator that the technical appendix (§s-tj38pvm38nepaf5) names for the RuntimeChecks (§s-e877bnfa559tvk9) refuses each value that does not match the `format` of its schema, for every format that the RuntimeChecks use.
- Reason: A validator that treats `format` only as an annotation accepts, as a date, a string that is not a valid date.
- Example: The RecordType `user` has the field `birthDate` with the schema `{"type": "string", "format": "date"}`.
- Example: The validator refuses a data record whose `birthDate` is `"2026-02-30"`.
- Example: The most likely mistake is to keep the validator's default setting, under which `format` is only an annotation, so that this data record passes.
