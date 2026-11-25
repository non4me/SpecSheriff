# T25, group 5, round d: the English sentences that changed

This file holds every English sentence of group 5 that round d changed, as `tools-drafts.json` holds it after fix-group5-d.mjs has run, under the key and the field of its node, for EngStickler's readers.
fix-group5-d.mjs writes this file; edit the script, not this file.

## s-vuujweu57sxsa58 — Domains that use one another in a cycle

**Reason:**

- A node that relies on what another domain states has a link, of whatever type, to the node of that domain that states it (§s-hr7j7scmfkkjnws).
- So a check that followed links of every type would refuse changes in which domains do not use one another.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Text:**

- `sheriff validate` refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), naming the file.
- `sheriff validate` refuses any other section below the file's first top-level node, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and giving its title.

**Reason:**

- A section of that file that matches no section of the domain holds an implementation that such a reader will not find.

## s-uxmkwbnpgtjzkgv — The level in a domain's header

**Example:**

- An approved rule in `project.json` refines the rule on a domain's level and lists `core` and `edge`.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Text:**

- A chain that reaches the identifying field of one RecordType a second time never ends.

**Example:**

- The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other RecordType, so the chains that start at those fields never end.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Text:**

- it is declared in the same section of the base specification (§s-5x737t9nee4zgaa) as its RecordType (§s-vtpxwqe7ncmn5bz):
- For the last condition, the refusal names each other RecordType variant with the same `answersTo` as well.
- Where a RecordType variant fails the first condition, `sheriff validate` checks it further only against the third condition, since each of the remaining conditions compares the RecordType variant with its RecordType.
- Where a RecordType has no `chosenBy`, and the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links name different fields in their `chosenBy`, `sheriff validate` refuses each RecordType variant that refines it for failing the first condition.
- The refusal names each of those RecordTypes.

**Example:**

- Another RecordType variant of `notification` names `sms` for `channel` in its `answersTo` and declares `text`.

## s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from

**Example 2:**

- The RecordType of an audit log entry has a field `part` whose `x-enumSource.from` is `parts`.
- That field is given the title of each of those sections, together with the sid of that section.

## new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

**Reason:**

- A field with no values, or with values that break the rules on their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass the mistake on to the generated code.

**Example:**

- The RecordType of a job log entry has a field `step` whose `x-enumSource.from` is `kind` and whose `x-enumSource.kind` is `TextRule`.

## s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system

**Text:**

- Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` leaves unreported a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):

**Example:**

- In the domain `requests`, the RecordType of a request has a field `deliveryAddress` with a `$ref` to `address`, a fragment of a format.
- `sheriff validate` reports that RecordType, naming it and the RecordType of a user, each by its sid, and lets the change pass.
- A field `user` that stores a user's identifier without such a reference has the type `string` and no `identifierOf`.
