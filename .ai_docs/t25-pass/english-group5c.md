# T25, group 5, round c: the English of every changed node

This file holds the English of every node of group 5 that round c changed, as `tools-drafts.json` holds it after fix-group5-c.mjs has run.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
fix-group5-c.mjs writes this file; edit the script, not this file.

## s-vuujweu57sxsa58 — Domains that use one another in a cycle

**Title:** Domains that use one another in a cycle

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` refuses a change after which domains use one another in a cycle (§s-bncp7gtyaukur8e). The refusal names the domains of one such cycle, in the order in which each uses the next.

One domain uses another where the header of the first (§s-yggv9myedprnaa7) has a `consumes` link to a section of the second. Domains use one another in a cycle where a chain of domains, each of which uses the next, leads back to the domain that it starts from.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-bncp7gtyaukur8e).

**Reason:**

Only the `consumes` links of the domains' headers state which domain uses which (§s-yggv9myedprnaa7). A node that relies on what another domain states links to the node of that domain that states it, by a link of any type (§s-hr7j7scmfkkjnws). So a check that followed links of every type would refuse domains that do not use one another.

**Example:**

The header of the domain `requests` has a `consumes` link to a section of the domain `users`. The header of `users` has such a link to a section of `requests`. `sheriff validate` refuses the change and names `requests` and `users`. In another project, only the header of `requests` has a `consumes` link to a section of `users`, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts the change. The most likely mistake is to treat that citation as a use of `requests` by `users`.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Title:** Sections of the technical appendix matched to the domains

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a JSON file under `specs/tech/` only where it is one of the following (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` or `specs/tech/debt.json`;
- a file named after a domain, `specs/tech/<domain>.json`, where `<domain>` is the name of a domain.

`sheriff validate` refuses any other file of the technical appendix (§s-tj38pvm38nepaf5), naming the file.

In a file named after a domain, `sheriff validate` accepts each section below the file's first top-level node only where the titles that lead to it also lead to a section of that domain (§s-vghy37e3p2325ah). The titles that lead to a section are those of the sections that hold it, from the top down, followed by the section's own title. `sheriff validate` refuses any other section of the file, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title.

The first top-level node of a file named after a domain represents the domain itself, so the titles that lead to a section of that file start below that node. Each further top-level node of the file is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w). In the domain, the titles that lead to a section start with the title of a section that is a top-level node of one of the domain's files or a child of the domain's header (§s-yggv9myedprnaa7).

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-vghy37e3p2325ah).

**Reason:**

To find how a rule of a domain is implemented, a reader looks in the file of the technical appendix named after that domain. There the reader follows the same titles that lead to the rule in the domain (§s-vj7ercem526zd6v). A section of that file that matches no section of the domain holds an implementation that such a reader does not find.

**Example:**

The domain `requests` has a section titled “Intake”, which holds a section titled “Validation”. In `specs/tech/requests.json`, the file's first top-level node holds a section titled “Intake”, which holds a section titled “Validation”, and `sheriff validate` accepts both. Another section titled “Validation” is directly under the file's first top-level node, and `sheriff validate` refuses it. The most likely mistake is to accept that section because the domain has a section titled “Validation”, although the domain's section is under “Intake”.

## s-uxmkwbnpgtjzkgv — The level in a domain's header

**Title:** The level in a domain's header

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a domain's header (§s-yggv9myedprnaa7) that contains a level only where the project's own guidelines (§s-u7tw6m8npxmv5tu) list that level (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). A header contains a level as the value of its property `level`.

`sheriff validate` refuses any other header that contains a level, naming the header by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the level. A header that contains no level passes this check.

As with every list in the project's own guidelines, the SpecSheriff tools read the levels in the last approved wording (§s-a8fn72xa782wvbk) of each rule that lists them (§s-t9j29hppag2nren). So a level that only a draft wording adds is accepted only after that wording is approved.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-j3v4y4d3sbmdgfp).

**Reason:**

The diagram of the domains places each domain in the row of its level (§s-4azsb49pj6sech8). The order of the levels in the list of levels sets the order of the rows (§s-nkyty4dy9x2v2a4). So a level outside that list has no row.

**Example:**

An approved rule of `project.json` refines the rule on a domain's level and lists `core` and `edge`. `sheriff validate` accepts each header that contains `core` or `edge`, and each header that contains no level. A team member adds `platform` to that rule's list, so the rule becomes a draft. Until the new wording is approved, `sheriff validate` refuses each header that contains `platform`, naming `platform`. The most likely mistake is to take the list from the draft wording.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Title:** An identifier followed to its end

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:
- its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);
- the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and each condition that the field fails. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain that goes to the identifying field of the same RecordType a second time never ends.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

**Reason:**

A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType that holds the field (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

**Example:**

The RecordType `statement` has a field `accountId` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of the RecordType `account` names its field `number`, of type `string`. The chain that starts at `accountId` ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other, so the chains that start at those fields never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain and so accept both fields.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Title:** What a RecordType variant must agree with

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` checks each RecordType variant (§s-z3dnru6qqdf9m6j) against its RecordType (§s-7vm323mhry2enx3).

`sheriff validate` treats as a RecordType variant each RecordType that names, in its `answersTo`, the values that it corresponds to. A RecordType variant's RecordType is the RecordType that has fields that select a variant and to which the RecordType variant has a `refines` link (§s-sn6au3vcr9uy5pm). The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it has no `chosenBy`, they are those named in the `chosenBy` of the RecordType that has a `chosenBy` and that it reaches through the fewest `refines` links.

The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The names of fields are compared character for character. Where no section holds a RecordType, the part of the specification that its location names (§s-kag2m9tzdnduxdx) is treated as its nearest section.

`sheriff validate` accepts a RecordType variant only where all of the following hold:
- it has a `refines` link to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);
- it is declared in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the RecordType variant is the nearest section that holds its RecordType;
- it declares at least one field (§s-47q37qk27yvt3pa);
- the name of each field that it declares differs from the name of every field that its RecordType declares or takes through `refines` from another RecordType (§s-hrguxwcsdm57vxf);
- the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);
- each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- its `answersTo` differs from the `answersTo` of every other RecordType variant of its RecordType (§s-5z8vjzmc3s983gk).

`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the RecordType variant fails. For the last condition, it also names each other RecordType variant with the same `answersTo`.

When `sheriff validate` validates the files against the schema of the specification, it refuses a RecordType variant whose `answersTo` gives a field more than one value (§s-xzcw3hv4hmxz7h7, §s-swturmy7hmhfvt4).

Where a RecordType variant fails the first condition, `sheriff validate` checks it further only against the third, since each of the remaining conditions compares the RecordType variant with its RecordType.

Where a RecordType has no `chosenBy`, and two RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in theirs, `sheriff validate` refuses, under the first condition, each RecordType variant that refines it. The refusal names both of those RecordTypes.

`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).

**Reason:**

A data record holds the fields of its RecordType together with those of the RecordType variant that corresponds to the data record's values (§s-z3dnru6qqdf9m6j). Only where every RecordType variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).

**Example:**

The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines `message`, a fragment of a format that declares the field `text`. A RecordType variant in the same section as `notification` refines `notification`, names `email` for `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another RecordType variant of `notification` names `sms` for `channel` and declares `text`. `sheriff validate` refuses it, since `sms` is not a value of `channel` and `notification` takes `text` from `message`. The most likely mistake is to compare the names of a RecordType variant's fields only with those that `notification` declares in its own `schema`, which overlooks `text`.

## s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from

**Title:** Where the values of a field with `enum` are collected from

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its source, which is exactly one of the following:
- its own list, where the field's schema holds `enum`: the members of that `enum`, in their order;
- the names of the parts of the base specification (§s-gqavjzcmubg5pvk, §s-5x737t9nee4zgaa), where the field's `x-enumSource.from` is `parts`;
- the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the parts of the base specification are the domains and the contracts section (§s-z6tq6a3btnvvwx7). The name of each such part is the name of its folder under `specs/` (§s-zefk589ykh37b8u), such as `contracts` or `requests`.

Otherwise, the parts of the base specification are the sections whose location (§s-kag2m9tzdnduxdx) is `base/` or `contracts/` followed by a single number. The name of each such part is the title of its section.

`sheriff reindex` writes each value collected from the names of the parts or from the sids into the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh, §s-ztseyetus7np6br), together with the sid of the node that the value comes from:
- for a domain's name, the domain's header (§s-yggv9myedprnaa7);
- for the name `contracts`, the first top-level node of the first file of `specs/contracts/` in the code-point order of the files' paths;
- for the title of a section, that section;
- for a sid, the node whose sid it is.

`sheriff reindex` writes the values in the order of the nodes that they come from: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The SpecSheriff tools collect the values of a field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.

**Reason:**

A field's values are used by `sheriff reindex`, `sheriff validate`, the check of RecordType variants and `sheriff types` (§s-ztseyetus7np6br, §s-agc6fb3vx46pc23, §s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in a single way, they are the same for each of these uses and on every machine.

**Example 1:**

In a project that has chosen the Domains extension, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.

**Example 2:**

In a project without the Domains extension, `specs/base/` holds the top-level sections titled “Requests” and “Users”, and `specs/contracts/` holds the section titled “Contracts”. The field `part` of the RecordType of an audit log entry, whose `x-enumSource.from` is `parts`, gets the title of each of those sections, each with the sid of its section. The most likely mistake is to give the field the names of the folders, `base` and `contracts`.

## new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

A new node, split from `s-5nf87c3e3jg9v7c`, with the sid s-dk3zfkbhc3v6xbp.

**Title:** Fields with `enum` that `sheriff validate` accepts

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `enum` (§s-xfu2gpzddjnmgks) only where both of the following hold:
- its source gives it at least one value when the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- where its `x-enumSource.from` is `kind`, its `x-enumSource.kind` names one of the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

`sheriff validate` refuses any other field with `enum`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field, each condition that the field fails and, where the field fails the condition on the kind, the kind. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

When `sheriff validate` validates the files against the schema of the specification, it refuses a field whose own `enum` holds a value more than once (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value only once.

`sheriff validate` checks each field with `enum` at any depth within the `schema` of each RecordType in the files that the repository keeps. It makes these checks regardless of whether the specification is approved or a draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).

**Reason:**

The types and RuntimeChecks of a field are generated from its values (§s-e877bnfa559tvk9). A field with no value, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass its mistake on to the generated code.

**Example:**

The RecordType of an entry of the job log has a field `step` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once `x-enumSource.kind` names `jobStep`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule` because the schema of the SpecSheriff guidelines defines it.

## s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system

**Title:** A RecordType that refers to a RecordType outside its part of the system

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` leaves a reference from one RecordType (§s-7vm323mhry2enx3) to another unreported only in the following cases (§s-8ht2hn88cu2qwz9):
- from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of its own part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:
- its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);
- it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType in the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

**Reason:**

A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads a RecordType's whole `schema` and all its `refines` links finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).

**Example:**

In the domain `requests`, the RecordType of a request has a field `address` with a `$ref` to `address`, a fragment of a format. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports the RecordType of a request, naming it and the RecordType of a user, each by its sid, and lets the change pass. The most likely mistake is to leave the reference in the field `user` unreported because that field holds only an identifier. To store a user's identifier without such a reference, the field `user` would have the type `string` and no `identifierOf`.
