# "A key written more than once in one object", a node of the appendix of the tools, agreed on 2026-11-22

## Title

A key written more than once in one object

## Text

`sheriff validate` refuses each key written more than once in one object, naming the file, the key and the line number of each of its values. Each such refusal adds that `sheriff reindex` merges such values wherever it can keep all of them (§s-w5wg69pvvhedsws).

`sheriff validate` finds a key written more than once by reading as text each file of the specification, of its archive (§s-f2b5zvc565s242f) and of its schema (§s-eferktypcj7njt5) that the repository keeps, the project's extension of the schema included (§s-xm8rz4uupb73gu5). It refuses each of these files whose text breaks the syntax of JSON, naming the file and the line at which reading failed.

Where `sheriff validate` refuses a key or a file, it stops before any check that reads the nodes.

## Reason

A JSON parser keeps one of the values written under a key and drops the others without a word, so only the file's text shows a key written more than once.
