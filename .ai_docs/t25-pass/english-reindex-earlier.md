# "What `sheriff reindex` changes in what an earlier release wrote", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

What `sheriff reindex` changes in what an earlier release wrote

## Text

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:
- a node's key `id` becomes `location`, and a node's key `rationale` becomes `reason`;
- the kinds of node `record` and `recordType` become `RecordType`, `rule` becomes `TextRule`, and `domain` becomes `header`;
- a node's status `""` becomes `draft`, and `checked` becomes `approved`;
- a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;
- a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows: each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y); the field's `text` becomes the property's `description`; each field that the RecordType marks as required is listed in the schema's `required`; a field that is required only "where it holds a value" becomes an optional property; and `unknown: "refused"` becomes `additionalProperties: false`;
- the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);
- `TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to a place in a JSON Schema;
- `TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;
- a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);
- a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys. A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.

A bare sid is a word that has the form of a sid and occurs in one of these places:
- it opens a test's name, followed by a space or by the end of the name;
- it is the only argument of the test's mark.

`sheriff reindex` also makes the following changes:
- `specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`, and the key `owner` in each of its lines becomes `by`;
- where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;
- until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification;
- that entry names the owner who last approved that rule;
- that rule is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";
- the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;
- in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, including the files of the specification.

## Reason

Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.
