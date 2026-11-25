# Node 12.3a of the RecordType extension, agreed on 2026-11-21

## Title

A RecordType is a rule

## Text

A RecordType (§s-7vm323mhry2enx3) is a rule of the section that declares it. Its fields (§s-6eb92ddch7shuvu) state what it requires. The description of what it is for serves as its reason (§s-dpe5kcz4eamv39g).

The code generated from it, such as its types and RuntimeChecks (§s-e877bnfa559tvk9), is bound to it by SpecTags (§s-8xw4mgvpexyvw5q). At least one test bound to it checks that a part of the system refuses to output or store a data record that violates it (§s-wxcmpbvy9bzkfj9).

## Reason

A RecordType states a requirement on the data that a part of the system outputs and stores, and the checks require bound code and a passing test only of a rule (§s-6fw72j65jkqrfpf). Were a RecordType not a rule, nothing would reveal a generated RuntimeCheck that no part of the system calls. The description of what its data is for already says why the data must have these fields, so a reason of its own would repeat it.

## Example

The RecordType of a request is declared in the section that describes how a user submits a request to an operator. The types and the RuntimeCheck generated from it carry its SpecTag. A test that carries its SpecTag tries to store a request without the time at which it was submitted, and expects the part of the system that stores requests to refuse it. The code that stores requests carries the SpecTag of the rule on submitting a request.

## Example

The fragment of a format for an address is declared in the contracts section, and its field for the city is guaranteed. A test that carries the fragment's SpecTag tries to store a request whose address has no city, and expects the part of the system that stores requests to refuse it.
