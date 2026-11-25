# T25, group 5, round f: the English sentences that changed

This file holds every English sentence of group 5 that round f changed, as `tools-drafts.json` holds it after fix-group5-f.mjs has run, under the key and the field of its node, for EngStickler's readers.
fix-group5-f.mjs writes this file; edit the script, not this file.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Text:**

- `sheriff validate` refuses every other JSON file of the technical appendix (§s-tj38pvm38nepaf5) under `specs/tech/`, and names that file.

**Reason:**

- A section of that file that matches no section of the domain holds an implementation that the reader will not find.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Text:**

- A chain never ends if it comes back to an identifying field that it has already reached.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Text:**

- Where the RecordType variant fails the last condition, the refusal also names every other RecordType variant that has the same `answersTo`.
- Where a RecordType has no `chosenBy`, the RecordTypes that have a `chosenBy` and that it reaches through the fewest `refines` links can name different fields in their `chosenBy`.
- In that case, `sheriff validate` refuses every RecordType variant that refines the RecordType that has no `chosenBy`, since each such RecordType variant fails the first condition.

## s-5nf87c3e3jg9v7c — Where the values of a field with `enum` are collected from

**Text:**

- The contracts section is named `contracts`, after its folder.
- Each of the other parts is named by its title.

**Example 2:**

- The most likely mistake is to use the title “Contracts” as a value in place of `contracts`.

## new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

**Reason:**

- So the generated code would inherit the defect of a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh).

## s-ezq8csd433vj6fj — A RecordType that refers to a RecordType outside its part of the system

**Text:**

- Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):
