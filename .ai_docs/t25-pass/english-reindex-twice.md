# "Keys written more than once", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

Keys written more than once

## Text

`sheriff reindex` merges the values that an object holds under a key written more than once, known as a duplicate key, folding each value into the values written before it. It does so in every file of the specification and of its archive, and in the project's extension of the schema, `specs/_schema/project.schema.json` (§s-xm8rz4uupb73gu5), before it makes any other change. Two values are merged as follows:
- two lists become one, which holds the members of the first and then the members of the second that are new to the first;
- two objects are merged key by key, the values under each key by these same rules, and each key stays where it was first written;
- two values that JSON Schema treats as equal become one.

`sheriff reindex` names every key whose values it merged, with the file and the line number of each value. It refuses any other pair of values under one key, naming the file, the key, and the line number and the value of each. Where it refuses a pair, it writes no file.

## Reason

`sheriff reindex` rewrites in full the files written by hand, so it keeps everything they hold. Each of two values written under one key expresses somebody's intent. They are kept together where both can be kept. They are refused where keeping one would drop the other, since nothing says which was meant. Every merge is named, because one of the two values may have been written to replace the other.

## Example

A node holds `"refs": [A]` and, further down, `"refs": [B, A]`: `sheriff reindex` writes `"refs": [A, B]` and names `refs` with the line numbers of both values. `sheriff reindex` refuses a node that holds `"title": "X"` and `"title": "Y"`, and writes no file.
