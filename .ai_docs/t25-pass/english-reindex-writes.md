# "What `sheriff reindex` writes", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

What `sheriff reindex` writes

## Text

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:
- a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);
- the location of each node (§s-kag2m9tzdnduxdx);
- the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);
- the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;
- the approval status of each section (§s-9kfdycuq34beqvs) and of each domain's header (§s-yggv9myedprnaa7), each derived from the nodes under that section or header;
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the index of the sections in each domain's header (§s-2r59txnms5serdr);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order that the file already has them.

## Reason

What the SpecSheriff tools can compute from the specification, the code and the tests, the tools write themselves, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).
