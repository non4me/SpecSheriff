# T25, group 5, round h: the English sentences that changed

This file holds every English sentence of group 5 that round h changed, as `tools-drafts.json` holds it after fix-group5-h.mjs has run, under the key and the field of its node, for EngStickler's readers.
fix-group5-h.mjs writes this file; edit the script, not this file.

## s-gvafe6bnstwab8b — Sections of the technical appendix matched to the domains

**Text:**

- `sheriff validate` refuses any other JSON file under `specs/tech/`, and names that file.

## s-3anv9qcmx8pwp2w — An identifier followed to its end

**Text:**

- A chain has no end if it comes back to a field that is already in it.

## s-c2r9jndrjbtbsv6 — What a RecordType variant must agree with

**Text:**

- Where the RecordType variant fails the last condition, the refusal also names each of the other RecordType variants of its RecordType that have the same `answersTo` as it does.
- Where they name different fields, `sheriff validate` refuses every RecordType variant that refines the RecordType that has no `chosenBy`, since each such RecordType variant fails the first condition.

## new:tools-7-1-enum-values — Fields with `enum` that `sheriff validate` accepts

**Reason:**

- So, if `sheriff validate` accepted a field that has no values, or whose values break the rules about their source (§s-xfu2gpzddjnmgks, §s-mt6auv3jz8m5gzh), the types and RuntimeChecks generated from that field's values would inherit the field's defect.
