# T25, group 5, round e: the English sentences that changed

This file holds every English sentence of group 5 that round e changed, as `tools-drafts.json` holds it after fix-group5-e.mjs has run, under the key and the field of its node, for EngStickler's readers.
fix-group5-e.mjs writes this file; edit the script, not this file.

## s-vuujweu57sxsa58 — Domains that use one another in a cycle

**Reason:**

- So a check that followed links of every type would refuse changes after which no domains use one another in a cycle.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Text:**

- `sheriff validate` refuses any other JSON file under `specs/tech/`, which holds the technical appendix (§s-tj38pvm38nepaf5), and names that file.

**Reason:**

- A section of that file that matches no section of the domain holds an implementation which that reader will not find.

## s-uxmkwbnpgtjzkgv — The level in a domain's header

**Example:**

- An approved rule in `project.json` refines the rule about a domain's level and lists the levels `core` and `edge`.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Text:**

- A chain that comes back to an identifying field that it has already reached never ends.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Text:**

- For the last condition, the refusal also names every other RecordType variant that has the same `answersTo`.
- Where a RecordType variant fails the first condition, `sheriff validate` checks it further only against the third condition, since each of the other conditions compares the RecordType variant with its RecordType.
- Where a RecordType has no `chosenBy`, the RecordTypes with a `chosenBy` that it reaches through the fewest `refines` links may disagree on the fields that their `chosenBy` names.
- In that case, `sheriff validate` refuses every RecordType variant that refines the RecordType without a `chosenBy`, since each such RecordType variant fails the first condition.
- The refusal names each of those RecordTypes with a `chosenBy`.

**Example:**

- A RecordType variant in the same section as `notification` refines `notification`, names `email` as the value of `channel` in its `answersTo` and declares `address`, and `sheriff validate` accepts it.
- Another RecordType variant of `notification` names `sms` as the value of `channel` in its `answersTo` and declares `text`.

## s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from

**Text:**

- Otherwise, the parts of the base specification are the contracts section and the sections whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number.
- The contracts section is named `contracts`, after its folder, and each other part by its title.

**Example 2:**

- The values of that field are “Requests”, “Users” and `contracts`, each with the sid of the node that it comes from.
- The most likely mistake is to take the title “Contracts” as a value in place of `contracts`.

## new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

**Reason:**

- A field with no values, or with values that break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), would therefore pass that mistake on to the generated code.

## s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system

**Text:**

- Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` lets a reference from one RecordType (§s-7vm323mhry2enx3) to another pass without a report only in the following cases (§s-8ht2hn88cu2qwz9):

**Example:**

- A field `user` that holds only a user's identifier, with no reference to the RecordType of a user, has the type `string` and no `identifierOf`.
