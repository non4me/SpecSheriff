# "Duplicate sids, terms and names of RecordTypes", a node of the appendix of the tools, agreed on 2026-11-22

## Title

Duplicate sids, terms and names of RecordTypes

## Text

`sheriff validate` refuses each of the following, naming the file and the location (§s-kag2m9tzdnduxdx) of every node that holds it:
- a sid that more than one node of the specification holds, a node in a cell of a `TableRule` included (§s-5fewsp22mmdz7y6, §s-vsu97qk96ugyh2t);
- a term (§s-ypa92gpcj3f5zj8) that more than one term node of the specification names, regardless of letter case (§s-bfzm4w6xveq8fbx);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), a name that more than one RecordType (§s-7vm323mhry2enx3) has, regardless of letter case (§s-jh85u42agh5k73x).

## Reason

Nodes that hold the same sid, term or name of a RecordType may be kept in different files, so only reading every node of the specification finds each repetition.

## Example

A cell of a `TableRule` holds a node whose sid was copied from a rule in another file. `sheriff validate` refuses that sid and names both nodes. The closest mistake is to compare only the nodes outside cells, which misses this repetition.
