# Round c of fixes to the follow-on drafts

The main session's decisions on the second review (`review2-fo.md`) and on EngStickler's fast reader (`english-fo2-fast.md`). Apply them all in one pass to `tools-drafts.json`, keeping a copy of the file as `tools-drafts.before-fo-c.json`. Each key below is a `proposal:…-bq` draft unless another key is named. No draft gets a new review round after this one: the main session checks the diff itself.

Where a fix gives an English wording, use it as given and write a Russian rendering of the whole changed paragraph, as in round b. Where a decision says "decline", change nothing.

## s-yhe32vrbygjyd66 (`$ref` within a RecordType's `schema`)

Replace the reason with:

"A `$ref` that names no RecordType leaves `sheriff types` unable to generate any file (§s-suv42g8r3ra2h6b). `sheriff validate` runs on every change, so it finds such a `$ref` even in a project whose stack lists no file of types or RuntimeChecks."

Add a `cites` link to s-suv42g8r3ra2h6b. Remove the `cites` link to s-e877bnfa559tvk9 if no field of the node cites it any longer.

## s-c2r9jndrjbtbsv6 (RecordType variants)

- Remove the `cites` links to s-xfu2gpzddjnmgks and s-jau82aq9juv9zzh: no field of the node cites them.
- Replace "It also refuses there a RecordType variant" with "At the same step, it also refuses a RecordType variant".

## s-g7auhqvzzbkw644 (sections of the technical appendix matched to the base specification)

- Paragraph 0: replace "It leaves out the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, which hold the stack section and the technical debt section." with "It skips the sections of `specs/tech/stack.json` and `specs/tech/debt.json`, the files that hold the stack section and the technical debt section."
- Paragraph 1: "The path of titles of a section consists of the titles of the sections that hold it, from the top down, followed by the section's own title." The Russian: «Путь заголовков раздела — это заголовки разделов, которые его содержат, сверху вниз, а за ними заголовок самого раздела.»
- Paragraph 2, add at its end: "`sheriff validate` also skips that node itself."

## s-33fw3ga4ctd94dq (the SpecTag in a file in a described language)

- Paragraph 0: replace "directly above the symbol, above its decorators where it has any" with "directly above the symbol or, where the symbol has decorators, directly above its first decorator".
- Paragraph 3: replace "A JSON file is in JSON Schema where" with "A JSON file is written in JSON Schema if". Replace "In JSON Schema, which allows no comments," with "In JSON Schema, whose JSON syntax allows no comments,". Replace the sentence that begins "In place of a comment above it" with "A definition's SpecTags are whole lines of the string in its `$comment`, in place of a comment above the definition (§s-kgbzk2ph9e6jfb4)."
- Paragraph 4: after "Only the comment's delimiters may share a line with a SpecTag." add "In JSON Schema, a SpecTag's line is a line of the string in the `$comment`." (This settles the reviewer's nit on item 5 of s-9rtrj24myzjvshu here, where the line is defined; item 5 stays as it is.)
- Paragraph 6: "A shebang, a first line that opens with `#!`, may come before the file's first comment. In Python, where a shebang has the form of a comment, the file's first comment is the first comment after the shebang."
- Paragraph 8, first sentence: "In JSON Schema, the code outside every symbol is each key of the top-level object, with its value, other than `$schema`, `$defs` and `$comment`." Keep the paragraph's second sentence.
- Paragraph 10: replace "the symbol that a SpecTag is above" with "the symbol that a SpecTag binds".
- Decline the optional example in JSON Schema: the node already has an example and is long, and item 5 of s-9rtrj24myzjvshu refuses the mistake it would warn of, naming the line.

## s-2x58az67bm6cxq2 (what a commit adds, changes and removes)

- Paragraph 5: replace the sentence that begins "A commit changes the SpecTags of a symbol, file or test where a SpecTag binds it either in the commit's parent or after the commit, but not in both" with "A commit changes the SpecTags of a symbol, file or test where at least one SpecTag binds it in the commit's parent but not after the commit, or after the commit but not in its parent." Keep the rest of the paragraph.
- Paragraph 10: replace "The exception is a SpecTag that binds" with "Neither kind includes a SpecTag that binds".

## s-rd9nftptjuz6bwv (the judgement on the code a commit changes)

Item 9: replace "names outside an `Implementation-Needs-No-Change` trailer" with "names anywhere other than in an `Implementation-Needs-No-Change` trailer".

## s-suv42g8r3ra2h6b (what is generated from a RecordType)

Delete paragraph 4, "`sheriff types` writes a file of RuntimeChecks only where the file has at least one definition." Its problem was a bindings entry without SpecTags, and that entry is removed with s-h5rfyy9j8nnhx62. Remove whatever the stage-3 note says about that sentence.

In `proposal:new-tools-17-bindings-entry-bq` (the removal of s-h5rfyy9j8nnhx62), make `change` say that the rule on writing no empty file of RuntimeChecks is dropped together with the bindings entry.

## s-j4t9vusnsajmqdw (the meta-schema of a RecordType's `schema`), key `new:tools-7-1-metaschema`

- Paragraph 0, second sentence: "The SpecSheriff tools keep that meta-schema in the file `recordtype-meta.schema.json`, in the same folder as that schema (§s-zefk589ykh37b8u). The meta-schema's `$id` is `recordtype-meta.schema.json`." Add a `cites` link to s-zefk589ykh37b8u.
- Paragraph 1: replace `urn:specsheriff:vocabulary:recordtype` with `https://github.com/non4me/SpecSheriff/vocab/recordtype`, here and in the stage-3 note. An unregistered URN namespace is not a URN (RFC 8141), and JSON Schema's own vocabularies use https URIs. Drop the paragraph's last sentence, "The meta-schema checks these keywords at any depth within a RecordType's `schema`."
- Paragraph 2: "The meta-schema's `$vocabulary` marks SpecSheriff's vocabulary as optional, with `false`. So a JSON Schema tool that takes the meta-schema as the meta-schema of a RecordType's `schema`, but does not know that vocabulary, still processes that `schema`."
- Paragraph 3: open it with "At any depth within a RecordType's `schema`, the meta-schema checks the value of each of these keywords as …", keeping the rest of its sentence.
- Reason: replace "The next version of JSON Schema is to refuse a keyword" with "The JSON Schema project has announced that its next release will refuse a keyword", keeping the rest of the sentence.

In s-zefk589ykh37b8u, add a row to the list of the files of the extension schemas, beside the row of the RecordType extension's schema, in the form that list already uses: the meta-schema of a RecordType's `schema` (§s-j4t9vusnsajmqdw), at `guidelines/_schema/extensions/recordtype-meta.schema.json` in the folder of the SpecSheriff tools and `specs/_schema/extensions/recordtype-meta.schema.json` in this repository. Add a `cites` link to s-j4t9vusnsajmqdw. This carries out decision 4.7, so record it as a `-bq` draft of s-zefk589ykh37b8u, with `base` naming the agreed key.

## s-u6mj5yv8ngnz79v (how two versions of code are compared)

Item 2: "in a file in JSON Schema (§s-33fw3ga4ctd94dq), each `$comment`, other than the SpecTags in it;". Change the stage-3 note to match: the whole `$comment` key, not only its text, is removed from the tree, except the SpecTags in it.

## s-76becsjwmasc2r2 (terms defined in a domain)

- Paragraph 0: "Where the project has chosen the Domains extension, `sheriff validate` compares the place where each term node of the base specification is defined with the places of the nodes that cite it or link to it." Keep the next sentence.
- Item 2: replace "is in the same domain or in the part of the technical appendix named after that domain" with "is in one domain or in the part of the technical appendix named after that domain".
- Reason, first sentence: replace "Where a term is defined follows from which nodes cite it or link to it." with "The place where a term is defined follows from which nodes cite it or link to it."

## s-gvafe6bnstwab8b (files of the technical appendix named after domains)

Replace "a JSON file under `specs/tech/`" with "a JSON file at any depth in `specs/tech/`" in paragraph 0, and make paragraph 3 and the reason say the same.

## s-m8nmfsxkcfu7cjp (a citation or SpecTag outside the specification)

Reason: replace "no other check would notice it" with "no other check would notice any of them".

## s-qqs2svksmjct753 (the nodes a commit message must name)

- Paragraph 1: replace "In this check, the code means" with "This check counts as code".
- Paragraph 3: replace "only the code that the merge adds or changes relative to each of its parents" with "only the code that differs from its version in every parent of the merge".

## s-nk8td3ez58gahc4 (a RecordType refined by its variants)

Reason: replace "in the form that each language has for fields that depend on the value of another field" with "with the construct that each language provides for fields that depend on the value of another field".

## Declined findings

- The reader's "values gathered beside a field" in s-f5brvuuu6xmkj6t: the phrase is used in several agreed nodes of `tools.json`, and changing it in one node would give one thing two spellings.
- The reader's two readings of "a rule of the guidelines" in s-m8nmfsxkcfu7cjp: "the guidelines" names one of the three documents of the specification, and "the project's own guidelines" names a part of it.
- The reader's "Reason: undefined" in the removal of s-h5rfyy9j8nnhx62: a removal has no wording, and the dump printed the absent field.
- Every other reading that a reader marked as settled by the context.

## When done

Report each key you changed, the copy you kept, and anything you could not apply as written.
