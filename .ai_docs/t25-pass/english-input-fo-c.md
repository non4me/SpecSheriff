# Round c of the follow-on drafts: the English paragraphs that round c added

## new:tools-7-1-term-domain

text: Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` compares the place where each term node (§s-ypa92gpcj3f5zj8) of the base specification is defined with the places of the nodes that cite it or link to it (§s-cb9rbh8q88a84xp). It refuses each of the following:
- a term node in a domain's folder, where a node outside that domain and outside the part of the technical appendix named after that domain cites the term or links to it (§s-8p52mzm3y33cf7z);
- a term node in the contracts section (§s-z6tq6a3btnvvwx7) that at least one node cites or links to, where every such node is in one domain or in the part of the technical appendix named after that domain (§s-qscrdhf6kj57gbx).

reason: The place where a term is defined follows from which nodes cite it or link to it. So only a check that reads every citation and every link in the specification can tell whether a term is in the part that needs it.

## new:tools-7-1-ref-names

reason: A `$ref` that names no RecordType leaves `sheriff types` unable to generate any file (§s-suv42g8r3ra2h6b). `sheriff validate` runs on every change, so it finds such a `$ref` even in a project whose stack lists no file of types or RuntimeChecks.

## proposal:s-c2r9jndrjbtbsv6-bq

text: When `sheriff validate` validates the files against the schema of the specification, it refuses a RecordType variant whose `answersTo` gives a field more than one value (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4). At the same step, it also refuses a RecordType variant whose `schema` holds `additionalProperties` or `unevaluatedProperties` at its top level (§s-gc7uwxtkrnpa2t9).

## proposal:s-gvafe6bnstwab8b-bq

text: Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a JSON file at any depth in `specs/tech/` only where it is one of the following (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` or `specs/tech/debt.json`;
- a file named after a domain, `specs/tech/<domain>.json`, where `<domain>` is the name of a domain.
text: `sheriff validate` refuses any other JSON file at any depth in `specs/tech/`, and names that file.

reason: A reader looks for the implementation of a domain's rules in the file of the technical appendix named after that domain (§s-vj7ercem526zd6v). A JSON file at any depth in `specs/tech/` that is named after no domain, other than the files of the stack and the technical debt, holds an implementation that the reader will not find.

## new:tools-7-1-appendix-sections

text: `sheriff validate` accepts each section of the technical appendix (§s-tj38pvm38nepaf5) only where its path of titles is also the path of titles of a section of the base specification (§s-qmmzf9nksfsa3qp, §s-ujnb23vbw3y8cne). It skips the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, the files that hold the stack section and the technical debt section (§s-vj7ercem526zd6v).
text: The path of titles of a section consists of the titles of the sections that hold it, from the top down, followed by the section's own title. In each file of the technical appendix, each top-level node after the first is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w).
text: Where a file of the technical appendix is named after a folder of the base specification (§s-5x737t9nee4zgaa), `specs/tech/<folder>.json`, its first top-level node represents that folder. So the path of titles of a section of that file starts below that node. The section of the base specification with the same path of titles is in that folder. `sheriff validate` also skips that node itself.

## proposal:new-tools-8-symbol-bq

text: In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol or, where the symbol has decorators, directly above its first decorator. That comment is:
- in TypeScript and JavaScript, the symbol's doc comment;
- in Python, one or more comment lines.
text: A JSON file is written in JSON Schema if its top-level object's `$schema` is `https://json-schema.org/draft/2020-12/schema`. In JSON Schema, whose JSON syntax allows no comments, the symbols of a file are the definitions under the `$defs` of its top-level object. A definition's SpecTags are whole lines of the string in its `$comment`, in place of a comment above the definition (§s-kgbzk2ph9e6jfb4). The `$schema` of the top-level object is considered the file's import.
text: Only the delimiters of the comment may share a SpecTag's line. In JSON Schema, a SpecTag's line is a line of the string in the `$comment`.
text: A shebang, a first line that opens with `#!`, may come before the file's first comment. In Python, where a shebang has the form of a comment, the file's first comment is the first comment after the shebang.
text: In JSON Schema, the code outside every symbol is each key of the top-level object, with its value, other than `$schema`, `$defs` and `$comment`. So a file of RuntimeChecks (§s-suv42g8r3ra2h6b) has no code outside its symbols and needs no `$comment` on its top-level object.
text: The SpecSheriff tools find the symbol that a SpecTag binds by parsing the file with tree-sitter and the grammar of the file's language. They parse each file on its own, with the parser alone and no type checker.

## proposal:s-2x58az67bm6cxq2-bq

text: A commit also changes each symbol, file bound as a whole and test whose SpecTags it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, file or test where at least one SpecTag binds it in the commit's parent but not after the commit, or after the commit but not in its parent. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).
text: Neither kind includes a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.

## proposal:new-tools-7-3-review-code-bq

text: The reviewer refuses the commit where any of the following holds:
- a changed symbol or file whose SpecTags name rules does something that none of those rules states;
- a changed test checks something that the rule its SpecTag names does not state;
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names anywhere other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);
- a changed symbol or file carries a SpecTag naming a rule that it does not implement;
- a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);
- a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).

## proposal:s-suv42g8r3ra2h6b-bq

## proposal:new-tools-17-bindings-entry-bq

## proposal:s-m8nmfsxkcfu7cjp-bq

reason: Outside the specification, a citation or a SpecTag comes with no link to the node that it names (§s-cxtt6jvhqcey2k9). So a sid that names no node, a SpecTag that names anything but a rule of the guidelines (§s-sfjka4zc4rhfu67) or a number in place of a sid would mislead every reader, and no other check would notice any of them.

## new:tools-7-1-metaschema

text: Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the schema of that extension validates the `schema` of each RecordType (§s-6eb92ddch7shuvu) against a meta-schema of SpecSheriff's own, to which it refers by a `$ref`. The SpecSheriff tools keep that meta-schema in the file `recordtype-meta.schema.json`, in the same folder as that schema (§s-zefk589ykh37b8u). The meta-schema's `$id` is `recordtype-meta.schema.json`.
text: The meta-schema's `$vocabulary` declares the vocabularies of JSON Schema 2020-12 and a vocabulary of SpecSheriff's own, `https://github.com/non4me/SpecSheriff/vocab/recordtype`, which holds the keywords `identifierOf` and `enumSource` (§s-4npdup7mjkva69y, §s-5nf87c3e3jg9v7c).
text: The meta-schema's `$vocabulary` marks SpecSheriff's vocabulary as optional, with `false`. So a JSON Schema tool that takes the meta-schema as the meta-schema of a RecordType's `schema`, but does not know that vocabulary, still processes that `schema`.
text: At any depth within a RecordType's `schema`, the meta-schema checks the value of each of these keywords as the schema of the RecordType extension defines it, and every other keyword as JSON Schema 2020-12 does.

reason: The JSON Schema project has announced that its next release will refuse a keyword that no declared vocabulary defines. Declared in a vocabulary of SpecSheriff's own, `identifierOf` and `enumSource` stay valid keywords of a RecordType's `schema` without the prefix `x-`.

## proposal:new-tools-7-2-changed-line-bq

text: Where the SpecSheriff tools have a grammar for a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language. Two versions differ where their trees differ once the following are left out of both:
- each comment, other than the file's first line when that line starts with `#!`;
- in a file in JSON Schema (§s-33fw3ga4ctd94dq), each `$comment`, other than the SpecTags in it;
- in a test, the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

## proposal:s-qqs2svksmjct753-bq

text: This check counts as code the symbols (§s-kgbzk2ph9e6jfb4), the code outside every symbol that the SpecSheriff tools treat as one more symbol (§s-2x58az67bm6cxq2), and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.
text: For a merge commit, `sheriff commit-message` counts only the code that differs from its version in every parent of the merge, since each merged commit was checked when it was made.

## proposal:s-nk8td3ez58gahc4-bq

reason: A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). The types and RuntimeChecks generated from the RecordType describe such a data record with the construct that each language provides for fields that depend on the value of another field.

## proposal:s-zefk589ykh37b8u-bq (new)

| The meta-schema of a RecordType's `schema` (§s-j4t9vusnsajmqdw) | `guidelines/_schema/extensions/recordtype-meta.schema.json` | `specs/_schema/extensions/recordtype-meta.schema.json` |
