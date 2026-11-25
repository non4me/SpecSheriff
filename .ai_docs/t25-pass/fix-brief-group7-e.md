# T25, stage 2, group 7: round e, the readers' last findings

EngStickler's two readers read `english-group7d.md`. Apply these replacements, English only, and keep each Russian rendering in line with its English where the Russian also changes:

1. `s-4npdup7mjkva69y`, the rows of `integer`, `number` and `array`: "with any bounds" → "with or without bounds", and "with any bounds on how many members it holds" → "with or without bounds on how many members it holds". "Any" after "with" can read as "provided it has some".
2. `s-4npdup7mjkva69y`, the sentence on `Literal`: "…so a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`" → "…so in Python a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`".
3. `s-4npdup7mjkva69y`: "where the `required` of any member of the `allOf` lists it" → "where the `required` of at least one member of the `allOf` lists it".
4. `s-4npdup7mjkva69y`, the reason: "cannot state" → "cannot express".
5. `s-pvzms7d8kxb8dk2`: "takes the rule's `implements` links from the same source as the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines" → "reads the rule's `implements` links from the same place as the SpecSheriff tools read the `refines` links of a rule of the project's own guidelines", keeping the rest of the sentence.
6. `s-pvzms7d8kxb8dk2`: "…and any other fault that keeps `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna)" → "…and each of the other things that keep `sheriff types` from writing any file (§s-dbk2vyeg8z5jxna)", since a check refuses a thing, not a fault.
7. `new:tools-17-validator`, the example: "so that this data record passes" → "and so this data record passes".

Not applied: "refuses" → "rejects" (the owner's word for what a check does); "members" → "elements" (the word that the drafts use for the members of a list); "gives" → "yields" (the word of item 56's agreed title); "last approval" → "latest approval" (the words of the agreed nodes on approvals); "is written anew" (read as meant).

Write `fix-group7-e.mjs` in the same way as the earlier rounds, run it twice, write `english-group7e.md` with only the changed sentences, add a section "Round e" to `group7-notes.md`, rebuild the page with `build-group7-ru.mjs` and `gen-group7-page.mjs`, and check it at 1066 px and 390 px. Do not publish it. The earlier constraints hold. Reply with a short report.
