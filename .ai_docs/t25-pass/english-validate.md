# "Validation against the schema before a command works on the files", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

Validation against the schema before a command works on the files

## Text

`sheriff validate`, `sheriff binding` and `sheriff reindex` validate each file of a part of the specification, if the repository keeps that file (§s-emrfpzw2d5bgb6x). The schema they use is `section-file.schema.json`, composed with the extensions of the schema (§s-xzcw3hv4hmxz7h7). They validate the files at these points:
- `sheriff validate`, before any check that reads their nodes;
- `sheriff binding`, before it checks anything;
- `sheriff reindex`, before it computes anything.

Before that validation, `sheriff reindex` merges each key written twice and changes what an earlier release wrote (§s-f5rz6b7dhxejjts). It excludes from the validation only what it writes itself:
- the links pointing at a node;
- the sid that it gives a node;
- every location (§s-kag2m9tzdnduxdx);
- the approval status of a section (§s-9kfdycuq34beqvs) and of a domain's header (§s-yggv9myedprnaa7);
- the index of the sections in a domain's header (§s-2r59txnms5serdr);
- the values gathered beside a field (§s-ju5vcanbjph7mgh).

Where the SpecSheriff tools refuse an extension of the schema (§s-xzcw3hv4hmxz7h7), or the schema refuses a file, `sheriff validate`, `sheriff binding` and `sheriff reindex` name that extension or each such file, with every refusal in it. Each of these commands then stops, and `sheriff reindex` leaves every file unchanged.

## Reason

Each command relies on the structure that the schema defines for a file. Only validation against the schema shows where a file departs from that structure and what is wrong there. `sheriff reindex` builds each file from all the files, so writing only some of them would leave the files inconsistent with one another.

A key written twice is merged first, since a file read without the merge holds only its last value. What an earlier release wrote is changed first, since the schema refuses its old names. What `sheriff reindex` writes itself is excluded from the validation, since a node written by hand receives it only when `sheriff reindex` runs.
