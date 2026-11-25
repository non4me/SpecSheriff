# "Validation of a file of the archive", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

Validation of a file of the archive

## Text

`sheriff validate` and `sheriff reindex` validate each file of the archive only against `archive-file.schema.json` (§s-zefk589ykh37b8u). They do so at the same points at which they validate the files of the specification. `sheriff reindex` does so after it has changed what an earlier release wrote (§s-f5rz6b7dhxejjts).

The only things that schema requires of a node of the archive are the following:
- it has a location (§s-kag2m9tzdnduxdx) and a kind;
- it has an `archived` field that holds the date of the removal and the reason for it, and may also hold the sid of the node that replaced it (§s-f2b5zvc565s242f);
- it holds no sid, no node under it and no link pointing at it (§s-bpdqd9v72wg7vsz).

The schema admits every other property of the node in any form.

Where the schema refuses a file of the archive, `sheriff validate` and `sheriff reindex` name that file, with every refusal in it. Each of these commands then stops, and `sheriff reindex` leaves every file unchanged.

## Reason

Each SpecSheriff tool that reads the archive relies on the structure of the nodes it reads. A schema limited to that structure checks it while admitting a node that an earlier release archived.
