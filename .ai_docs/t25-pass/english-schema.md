# "How the schema of the specification is composed", a node of the appendix of the tools, agreed on 2026-11-21

## Title

How the schema of the specification is composed

## Text

The SpecSheriff tools compose the schema of the specification (§s-eferktypcj7njt5). They start from the schema of the SpecSheriff guidelines and add the following extensions of the schema to the composed schema one at a time, in this order:
- the schema of each extension of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-9ttvcwpqkehm58g), if that extension has a schema, in the bytewise order of the extensions' names;
- the project's own extension of the schema (§s-xm8rz4uupb73gu5), if the project has one.

Each extension of the schema adds:
- each of its kinds of node to the kinds that a node may have, together with the conditions in that kind's `schema`;
- the conditions that its `fields` set for a kind of node to the conditions on every node of that kind;
- each of its types of link to the types that a link may have (§s-sn6au3vcr9uy5pm);
- each of its definitions to those of `node.schema.json`, so that a reference `#/$defs/<name>` in any extension of the schema resolves to that definition;
- the properties that it defines for a file, to those that a file of a part of the specification may hold;
- the properties that it defines for a link, to those that a link may hold.

The conditions set for a kind of node apply to every node of that kind, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

The tools accept an extension of the schema only if, when that extension is added:
- it is valid JSON;
- it conforms to `extension.schema.json` (§s-zefk589ykh37b8u);
- each kind of node, type of link and definition that it adds has a new name, unique in the schema;
- each property that it adds to a kind of node, a file or a link is new to that kind, that file or that link;
- each kind of node for which its `fields` set conditions is one that the schema already defines;
- the schema composed with it is a valid JSON Schema.

The tools refuse any other extension of the schema. They stop composing the schema at the first extension that they refuse.

## Reason

The extensions of the schema are added in a fixed order, so that the composed schema and every refusal are the same on every machine. An extension adds only new names, so that every definition of the SpecSheriff guidelines and of a chosen extension stays as the SpecSheriff guidelines or the chosen extension define it (§s-xm8rz4uupb73gu5). The project's own extension is added last, since its `fields` may set conditions for a kind that a chosen extension adds. The tools stop at a refused extension, since the extensions after it may rely on what it would have added.

## Example

A project that has chosen the RecordType extension of the guidelines declares `RecordType` in the `kinds` of its own extension of the schema. The SpecSheriff tools refuse that extension, since the schema of the RecordType extension already defines that kind of node. To add a field to every RecordType, the project declares that field in `fields`, under `RecordType`.
