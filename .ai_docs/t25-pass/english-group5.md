# T25, group 5: the English of every node

This file holds the final English of every node of group 5 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group5.mjs: the drafts of items 41 to 47 of the appendix of the tools, which make the checks of the tables of checks of the Domains extension and of the RecordType extension, and the node split from item 46.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
propose-group5.mjs writes this file; edit the script, not this file.

## s-vuujweu57sxsa58 — Domains that use one another in a cycle

**Title:** Domains that use one another in a cycle

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` refuses the change where the domains use one another in a cycle (§s-bncp7gtyaukur8e). The refusal names the domains of one such cycle, in the order in which each uses the next.

A domain uses another domain where its header (§s-yggv9myedprnaa7) has a `consumes` link to a section of the other domain. Only a link that the check of `consumes` links accepts is counted (§s-p3n666zfjdrrw6a). The domains use one another in a cycle where a chain of domains, each of which uses the next, leads back to its first domain.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-bncp7gtyaukur8e).

**Reason:**

Only the `consumes` links of the domains' headers state which domain uses which (§s-yggv9myedprnaa7). A node that relies on what another domain states has a link of any type to that domain's node (§s-hr7j7scmfkkjnws). So a check that followed those links would refuse domains that do not use one another.

**Example:**

The header of the domain `requests` has a `consumes` link to a section of the domain `users`. The header of `users` has such a link to a section of `requests`. `sheriff validate` refuses the change and names `requests` and `users`. In another project, only the header of `requests` has such a link, and a rule of `users` cites a rule of `requests`. There `sheriff validate` accepts both domains. The most likely mistake is to treat that citation as a use of `requests` by `users`.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Title:** Sections of the technical appendix matched to the domains

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a JSON file under `specs/tech/` only where it is one of the following (§s-zefk589ykh37b8u, §s-vghy37e3p2325ah):
- `specs/tech/stack.json` or `specs/tech/debt.json`;
- a file named after a domain, `specs/tech/<domain>.json`, where `<domain>` is the name of a domain.

`sheriff validate` refuses any other file of the technical appendix (§s-tj38pvm38nepaf5), naming the file.

In a file named after a domain, `sheriff validate` accepts each section below the file's first top-level node only where the same titles lead to a section of that domain (§s-vghy37e3p2325ah). The titles that lead to a section are those of the sections that hold it, from the top down, followed by the section's own title. `sheriff validate` refuses any other section of the file, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming its title.

The first top-level node of a file named after a domain represents the domain itself, so the titles that lead to a section of that file start below that node. Each further top-level node of the file is treated as a node under the first, as in the computation of locations (§s-ygg5kpcxgzq3m7w). In the domain, the titles that lead to a section start at a section that is a top-level node of one of the domain's files or a child of the domain's header (§s-yggv9myedprnaa7).

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-vghy37e3p2325ah).

**Reason:**

A reader looks for how a rule of a domain is implemented in the file of the technical appendix named after that domain. There the reader follows the same titles that lead to the rule in the domain (§s-vj7ercem526zd6v). A section of that file that matches no section of the domain holds an implementation that such a reader does not find.

**Example:**

The domain `requests` has a section titled “Intake”, which holds a section titled “Validation”. In `specs/tech/requests.json`, the file's first top-level node holds a section titled “Intake”, which holds a section titled “Validation”, and `sheriff validate` accepts both. Another section titled “Validation” is directly under the file's first top-level node, and `sheriff validate` refuses it. The most likely mistake is to accept that section because the domain has a section titled “Validation”, although that section is under “Intake”.

## s-uxmkwbnpgtjzkgv — The level in a domain's header

**Title:** The level in a domain's header

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts the level that a domain's header (§s-yggv9myedprnaa7) contains only where the project's own guidelines (§s-u7tw6m8npxmv5tu) list that level (§s-nkyty4dy9x2v2a4, §s-j3v4y4d3sbmdgfp). A header contains its level in its `level`.

`sheriff validate` refuses any other header that contains a level, naming the header by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the level. A header that contains no level passes this check.

The SpecSheriff tools read those levels in the last approved wording of each rule of `project.json` (§s-zefk589ykh37b8u) with a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on a domain's level (§s-nkyty4dy9x2v2a4). A draft rule is not implemented (§s-utvqbypzhmgndug), so a level that only a draft wording adds is listed only after that wording is approved.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-j3v4y4d3sbmdgfp).

**Reason:**

The diagram of the domains places each domain in the row of its level (§s-4azsb49pj6sech8). The order of the levels in their list sets the order of the rows (§s-nkyty4dy9x2v2a4). So a level outside that list has no row.

**Example:**

An approved rule of `project.json` refines the rule on a domain's level and lists `core` and `edge`. A team member adds `platform` to its list, so the rule becomes a draft. Until the new wording is approved, `sheriff validate` refuses each header that contains `platform`, naming `platform`. The most likely mistake is to read the list in the draft wording.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Title:** An identifier followed to its end

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:
- its `identifierOf` names a RecordType (§s-7vm323mhry2enx3) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);
- the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and the condition that the field fails.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain that comes back to a RecordType that it has already passed never ends.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

**Reason:**

A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

**Example:**

The RecordType `statement` has a field `account` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of `account` names its field `number`, of type `string`. That chain ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other, so their chains never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain, which accepts both of them.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Title:** What a RecordType variant must agree with

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a RecordType variant (§s-z3dnru6qqdf9m6j) only where all of the following hold:
- it has a `refines` link (§s-sn6au3vcr9uy5pm) to exactly one RecordType that has fields that select a variant (§s-bmyzn6zuds6czqm);
- it is declared in the same section of the base specification as its RecordType (§s-vtpxwqe7ncmn5bz): the nearest section that holds the variant is the nearest section that holds its RecordType;
- it declares at least one field (§s-47q37qk27yvt3pa);
- the name of each field that it declares differs from the name of every field of its RecordType (§s-hrguxwcsdm57vxf);
- the fields that its `answersTo` names are exactly the fields that select a variant of its RecordType (§s-swturmy7hmhfvt4);
- each value that its `answersTo` names for a field is one of that field's values, as the SpecSheriff tools collect them (§s-5nf87c3e3jg9v7c, §s-27aycne77epeaq6);
- its `answersTo` differs from the `answersTo` of every other variant of its RecordType (§s-5z8vjzmc3s983gk).

`sheriff validate` refuses any other RecordType variant, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also says which of the conditions above the variant fails. For the last condition, it also names each other variant with the same `answersTo`.

A variant that fails the first condition is refused for that reason alone, since each of the other conditions compares the variant with its RecordType.

A RecordType variant is a RecordType that names, in its `answersTo`, the values that it corresponds to (§s-z3dnru6qqdf9m6j). A variant's RecordType is the RecordType that has fields that select a variant and to which the variant has a `refines` link. The fields that select a variant of a RecordType are those that the RecordType names in its `chosenBy`. Where it names none, they are those that the nearest RecordType up its `refines` links names in its `chosenBy`.

The fields that a RecordType declares are the properties of its `schema` (§s-6eb92ddch7shuvu). The fields of a RecordType are those that it declares and those that it takes through `refines` from another RecordType. The names of fields are compared character for character. Where no section holds a RecordType, the part of the base specification that holds it (§s-kag2m9tzdnduxdx) is treated as its nearest section.

`sheriff validate` makes these checks regardless of whether the specification is approved or a draft (§s-bmyzn6zuds6czqm, §s-vtpxwqe7ncmn5bz, §s-47q37qk27yvt3pa, §s-hrguxwcsdm57vxf, §s-swturmy7hmhfvt4, §s-27aycne77epeaq6, §s-5z8vjzmc3s983gk).

**Reason:**

A data record holds the fields of its RecordType together with those of the variant whose values it holds (§s-z3dnru6qqdf9m6j). Only where every variant agrees with its RecordType does each data record have one set of fields that the types and RuntimeChecks generated from the RecordType can describe (§s-e877bnfa559tvk9).

**Example:**

The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email` and `app`. It refines the fragment of a format `message`, which declares the field `text`. A variant in the same section refines `notification`, names `email` for `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it. Another variant names `sms` for `channel` and declares `text`, and `sheriff validate` refuses it for both reasons. The most likely mistake is to compare the names of a variant's fields only with those that `notification` declares itself, which misses `text`.

## s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected

**Title:** Where the values of a field with `enum` are collected

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the SpecSheriff tools collect the values of a field with `enum` (§s-xfu2gpzddjnmgks) from its one source:
- its own list: the members of the field's `enum`, in their order;
- the names of the parts of the base specification (§s-gqavjzcmubg5pvk), where the field's `x-enumSource.from` is `parts`: the name of each folder under `specs/` that holds a part of the base specification (§s-zefk589ykh37b8u);
- the sids of the nodes of a project's own kind (§s-mt6auv3jz8m5gzh), where the field's `x-enumSource.from` is `kind`: the sid of each node of the base specification whose kind the field's `x-enumSource.kind` names, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

The folders that hold the parts of the base specification are `specs/contracts/` and either `specs/base/` or the folder of each domain. A value collected from the names of the parts comes from the node that its part opens with. For a domain, that node is its header (§s-yggv9myedprnaa7). For any other part, it is the first top-level node of the first of the part's files in the code-point order of their paths. A value collected from the sids comes from the node whose sid it is.

The values collected from the names of the parts or from the sids are the values gathered beside the field (§s-ju5vcanbjph7mgh). `sheriff reindex` writes each of them into the field's `x-enumSource.gathered` (§s-ztseyetus7np6br), together with the sid of the node that it comes from. It writes them in the order of those nodes: their files in the code-point order of the files' paths, and the nodes of one file in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The SpecSheriff tools collect in this way the values of each field with `enum` at any depth within a RecordType's `schema` (§s-6eb92ddch7shuvu), such as in the schema of the members of a list.

**Reason:**

`sheriff reindex` writes the gathered values beside the field (§s-ztseyetus7np6br), and `sheriff validate` compares them with what their source gives (§s-agc6fb3vx46pc23). The check of RecordType variants and the generated types also rely on a field's values (§s-c2r9jndrjbtbsv6, §s-a8fn72xa782wvbk). Collected in one way, the values are the same for each of them and on every machine.

**Example:**

In a base specification divided into domains, the RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`. The base specification is kept in `specs/contracts/`, `specs/requests/` and `specs/users/`. `sheriff reindex` writes `contracts`, `requests` and `users` into the field's `x-enumSource.gathered`. With `contracts` it writes the sid of the first top-level node of the first file of `specs/contracts/`. With each domain's name it writes the sid of that domain's header. The most likely mistake is to leave out `contracts`, which is a part of the base specification although it is not a domain.

## new:tools-7-1-enum-values — The values and the source of a field with `enum`

A new node, split from `s-5nf87c3e3jg9v7c`, with the sid s-dk3zfkbhc3v6xbp.

**Title:** The values and the source of a field with `enum`

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `enum` (§s-xfu2gpzddjnmgks) only where both of the following hold:
- its source gives it at least one value, as the SpecSheriff tools collect its values (§s-5nf87c3e3jg9v7c, §s-buug8n5eh7tdnsv);
- where its `x-enumSource.from` is `kind`, its `x-enumSource.kind` names one of the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5, §s-hcgmz4v5avbj3nt).

`sheriff validate` refuses any other field with `enum`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and, where the field fails the second condition, the kind.

`sheriff validate` refuses a field whose own `enum` holds a value more than once when it validates the files against the schema of the specification (§s-xzcw3hv4hmxz7h7, §s-upj45kydz8727be). The schema of the RecordType extension requires each `enum` within a RecordType's `schema` (§s-6eb92ddch7shuvu) to hold each value once.

`sheriff validate` checks each field with `enum` at any depth within the `schema` of each RecordType in the files that the repository keeps. It makes these checks regardless of whether the specification is approved or a draft (§s-upj45kydz8727be, §s-buug8n5eh7tdnsv, §s-hcgmz4v5avbj3nt).

**Reason:**

The types and RuntimeChecks generated for a field accept only the field's values (§s-e877bnfa559tvk9). So a field that has no value, or whose source names a kind that no node can have, admits no data record.

**Example:**

The RecordType of a step of a job has a field `chapter` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`. `sheriff validate` refuses the field and names `TextRule`. Once the field names `chapter`, a kind that the project's extension of the schema adds, and the base specification holds a node of that kind, the field passes. The most likely mistake is to accept `TextRule`, since the schema of the SpecSheriff guidelines defines that kind.

## s-ezq8csd433vj6fj — A RecordType that refers outside its part of the system

**Title:** A RecordType that refers outside its part of the system

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):
- from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of the same part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming it by its sid and naming the RecordType that it refers to (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:
- a schema within its `schema` (§s-6eb92ddch7shuvu), at any depth, holds a `$ref` that points to that RecordType or an `identifierOf` that names it (§s-qpdnkejr5xzc6j3);
- it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType of the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes that no such section holds are treated as belonging to one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

**Reason:**

A RecordType that refers to the RecordType of another part of the system changes whenever that part changes that RecordType, though nothing in its own part has changed (§s-8ht2hn88cu2qwz9). A field with `identifierOf` is such a reference too, since it takes its type from the RecordType that it names (§s-6eb92ddch7shuvu).

**Example:**

In the domain `requests`, the RecordType of a request has a field `address` with a `$ref` to the fragment of a format `address`. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports the RecordType of a request by its sid, names the RecordType of a user, and lets the change pass. The most likely mistake is to leave the field `user` unreported because it holds only an identifier. The domain `requests` can keep a user's identifier in a field of type `string`, which refers to no RecordType.
