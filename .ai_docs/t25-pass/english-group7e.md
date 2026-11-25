# T25, group 7, round e: the English sentences that round e changes

This file holds only the English sentences, and the rows of a table, that round e adds or changes in the drafts of group 7, as `tools-drafts.json` holds them after fix-group7-e.mjs. Each is given under the key of its draft in `tools-drafts.json` and the title of that draft, with the part of the node that holds it.
fix-group7-e.mjs writes this file; edit the script, not this file.

## s-pvzms7d8kxb8dk2 — Where the types and RuntimeChecks generated from the RecordTypes are written

- Text: `sheriff types` reads the rule's `implements` links from the same place as the SpecSheriff tools read the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification.
- Text: The check of generated copies refuses a list that names a file whose name has any other extension, and each of the other things that keep `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna).

## s-4npdup7mjkva69y — The type that the schema of a field gives

- Text: | `{"type": "integer"}`, with or without bounds | `number` | `int` | whole number |
- Text: | `{"type": "number"}`, with or without bounds | `number` | `float` | number |
- Text: | `{"type": "array", "items": <its members' schema>}`, with or without bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
- Text: In Python, `Literal` can hold only a string, a whole number, `true`, `false` or `null`, so in Python a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`.
- Text: A field of that `TypedDict` is required where the `required` of at least one member of the `allOf` lists it.
- Reason: Therefore, a field's schema serves as its RuntimeCheck, which checks in the same way in every language what a type in TypeScript or Python cannot express, such as a bound or a format.

## new:tools-17-validator — The validator of the RuntimeChecks

- Example: The most likely mistake is to keep the validator's default setting, under which `format` is only an annotation, and so this data record passes.
